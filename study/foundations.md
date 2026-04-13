## Building Blocks: The 15 Primitives

System design feels infinite because of how it's *taught* — a million example systems, each with a unique-looking diagram. It isn't. The entire field is maybe **15 building blocks** rearranged. Senior engineers don't memorize systems, they compose primitives. Learn these 15 and every "design X" question becomes *"which blocks do I need and how do they connect?"*

This section introduces all 15 in three chunks. For each block: **what it is** in one line, and **when you reach for it** in one line. That's all you need — the rest is practice composing them.

---

### Compute & Routing

These are the blocks that take a request from the user and get it to a place where real work can happen. Every web system has all four of these, even if some are rolled into one service.

**1. Client (browser / mobile app)**
- **What it is:** The user's device running your code — React app, mobile shell, CLI, whatever is talking to your API.
- **When you reach for it:** Always. The question is *how much* logic lives here vs on the server. Thin client = server renders everything, client just displays. Thick client = SPA holds state, server is pure API.

**2. CDN (Content Delivery Network)**
- **What it is:** A global fleet of edge servers that cache static content close to users. Cloudflare, Fastly, CloudFront.
- **When you reach for it:** Any static asset (JS bundle, CSS, images, fonts), any public content that doesn't change per user, and any endpoint you want to protect from DDoS or bot traffic. **Never** for personalized or authenticated responses — you'll leak one user's data to another.

**3. Load Balancer**
- **What it is:** A traffic cop in front of N identical servers. Spreads requests, health-checks servers, removes dead ones from rotation.
- **When you reach for it:** The moment you have more than one server. L4 (TCP) is fast and dumb; L7 (HTTP) can route by path, header, or cookie — needed for things like WebSocket sticky routing or canary deploys.

**4. Stateless API server**
- **What it is:** A server process that holds **no memory** of previous requests. Every request carries everything it needs (auth token, params, body). Any server can handle any request.
- **When you reach for it:** The default for every HTTP API. Statelessness is what lets you run 2, 20, or 200 servers behind a load balancer without sticky sessions. If a server dies mid-traffic, the load balancer just sends the next request elsewhere and the user never notices.

**Soundbite:** *"Client hits the CDN for static stuff, load balancer for dynamic. Load balancer fans out to a fleet of stateless API servers. Any server can handle any request because state lives downstream — not in server RAM. That's the horizontal-scaling foundation."*

---

### State

The previous four blocks move requests around. These three blocks are where information actually **lives**. Getting the split right is the single most important architecture decision in most systems.

**5. Database (Postgres, MySQL)**
- **What it is:** The durable, transactional, authoritative home of your data. Structured, queryable, survives restarts.
- **When you reach for it:** Anything that must survive forever and must be consistent — users, orders, posts, comments, permissions. This is the source of truth. Everything else is a cache or derivation of what's in the DB.

**6. Cache (Redis)**
- **What it is:** An in-memory key-value store with microsecond reads. Optionally persistent, but designed to be wipeable.
- **When you reach for it:** Anything you need *fast* and can *afford to lose*. Session storage, rate-limit counters, leaderboards (sorted sets), hot query results, recently-viewed lists, pub/sub channels. Also the hot cache in front of Postgres when reads dominate. Rule of thumb: **Postgres is the filing cabinet, Redis is the sticky note on your monitor.**

**7. Object storage (S3, GCS, R2)**
- **What it is:** Durable, cheap, effectively infinite storage for files. Images, videos, uploads, logs, backups.
- **When you reach for it:** Anything bigger than a row — user avatars, match replay videos, CMS uploads, CSV exports. Never put blobs in your relational DB; store them in S3 and keep the URL in Postgres.

**Soundbite:** *"Postgres for durable truth. Redis for speed and ephemeral state. S3 for blobs. Frontends never talk to Postgres directly — they talk to an API which reads from cache first, falls back to the database, and serves file URLs that point at object storage."*

---

### Async & Real-time

The previous seven blocks cover the classic synchronous request/response path. These remaining eight handle everything that breaks that pattern — async work, live updates, search, security, observability.

**8. Message queue (Kafka, SQS, RabbitMQ)**
- **What it is:** A durable buffer between producers and consumers. Producer drops a message, consumer picks it up later. Decouples the two in time.
- **When you reach for it:** Any work that doesn't need to block the user — sending emails, generating exports, processing uploads, fan-out to multiple services. Also a load shock absorber: if traffic spikes, the queue fills, consumers drain it at their own pace instead of crashing the DB.

**9. Pub/sub (Redis Pub/Sub, Kafka topics, PostgreSQL LISTEN/NOTIFY)**
- **What it is:** One event → many subscribers. Unlike a queue (where each message goes to exactly one consumer), a pub/sub message fans out to everyone listening.
- **When you reach for it:** Broadcasting live events to many clients — "match just ended, tell all 10,000 viewers," "new chat message, tell every user in the room." Usually paired with a WebSocket gateway that translates a pub/sub event into WebSocket pushes.

**10. WebSocket gateway**
- **What it is:** A dedicated server that holds long-lived bidirectional connections to clients. Unlike stateless API servers, this one **is** stateful — it has to remember which connection belongs to which user.
- **When you reach for it:** True real-time features — live chat, multiplayer state sync, live scoreboards, collaborative editing. Keep it isolated from your stateless API tier so one doesn't drag the other down. Subscribe it to a pub/sub topic and let the message queue feed it events.

**11. Search index (Elasticsearch, Algolia, OpenSearch)**
- **What it is:** A specialized read-only store that supports full-text search, fuzzy matching, faceting, and ranking. Much faster than `LIKE '%foo%'` on Postgres.
- **When you reach for it:** Any search that goes beyond exact ID lookup — product search, user search, content search. Built from an async pipeline that consumes DB change events and indexes them.

**12. Auth service**
- **What it is:** The system that issues tokens, verifies credentials, manages sessions, and enforces access. Sometimes its own service, sometimes part of the API tier.
- **When you reach for it:** Every app. The interesting question is what it returns — a self-verifying JWT (fast, stateless, hard to revoke) or an opaque session token backed by Redis (one hop per request, easy to revoke). Most real systems use both: short-lived JWT for the hot path, Redis-backed refresh tokens for the lifecycle.

**13. Rate limiter**
- **What it is:** A counter-and-throttle that caps how fast a given user or IP can hit an endpoint. Usually Redis-backed with a sliding or fixed window.
- **When you reach for it:** Login and auth endpoints (credential stuffing defense), write endpoints (abuse), expensive endpoints (cost control), any public API. Run it at the **edge** (CDN) when you can — origin-side rate limiting still costs you bandwidth.

**14. Monitoring (logs, metrics, traces)**
- **What it is:** Observability — Datadog, Grafana, Sentry, OpenTelemetry. Records what's happening so you can debug production without reading the user's mind.
- **When you reach for it:** From day one. Metrics for dashboards and alerts, structured logs for forensics, traces for tracking a single request across multiple services. You can't fix what you can't see.

**15. Background workers**
- **What it is:** Long-running processes that consume the message queue and do the actual async work — email sending, thumbnail generation, scheduled jobs, data pipelines.
- **When you reach for it:** Paired with a queue. If a task might take more than a few hundred milliseconds, or could fail and need retrying, or could be delayed without hurting the user — it belongs on a background worker, not in the hot request path.

**Soundbite:** *"Queue for async work, pub/sub for fan-out, WebSocket gateway for live clients, search index for anything beyond exact lookup, auth service for identity, rate limiter at the edge, monitoring everywhere, background workers draining the queue. Every real-time or scale feature is a recombination of these."*

---

## The 7 Themes of Frontend System Design

Backend system design has the 15 blocks above. Frontend system design is **even narrower** — seven recurring themes show up in almost every frontend interview question at a front-end-leaning shop like Riot. Once you can name them, every question becomes *"which of these themes does this question care about most, and what are the options I'd weigh?"*

Like the 15 blocks, this list is a **scope-shrinker**. The field only looks infinite when you don't know its boundaries.

---

### Structure & Communication

**Theme 1 — Client structure**

*The question:* How is the client itself built? Component tree, state layers, routing, data fetching.

*What interviewers want to hear:* a clean split between **page/route components** (know about data), **presentational components** (take props, stay pure), and **shared primitives**. State has layers — server state (React Query / SWR), client/UI state (Zustand / Redux / context), URL state (router), and persistent state (localStorage, IndexedDB). Know which layer each piece of state belongs to and why.

*Riot-relevant example:* A match page has server state (match data), client state (which tab is open), URL state (match ID, selected round), and persistent state (favorite teams). Four different layers, four different tools.

**Theme 2 — Client ↔ API communication**

*The question:* How does the client actually talk to the backend? What's the contract, what's the format, what's the transport?

*Options:*
- **REST** — simple, cacheable, well-understood. Default for CRUD.
- **GraphQL** — one endpoint, client picks fields, great when the frontend needs flexibility. Heavier to operate.
- **gRPC / tRPC** — typed contracts. Great for internal tools, less common for public APIs.
- **WebSocket / SSE / long polling** — for real-time. See Theme 5.
- **Optimistic updates** — write to local state first, reconcile when the server responds. Makes the UI feel instant at the cost of handling the "server rejected it" case.

*What interviewers want to hear:* you don't default to REST mindlessly. You justify the choice in terms of what the UI needs — "I'd use React Query on top of REST here because the data is mostly cacheable and we get stale-while-revalidate for free" beats "I'd use REST because REST."

**Soundbite:** *"Client structure is how the pieces nest and where state lives. Communication is how those pieces pull and push data. Get these two right and the rest of the interview is tradeoffs on top."*

---

### Resilience

**Theme 3 — Caching layers**

*The question:* Where does a given piece of data live, and how stale can it be?

*The layers, from fastest to slowest:*
1. **React Query cache / memory** — same session, instant
2. **Service worker / IndexedDB** — persists across sessions, survives reload
3. **CDN edge cache** — same region, ~20ms
4. **Server-side cache (Redis)** — same datacenter, ~1ms from origin
5. **Database** — source of truth, slowest

Each layer has a **TTL** and an **invalidation strategy**. The interview-interesting part is *how do you keep them in sync* — cache-aside, write-through, write-behind, event-driven invalidation. Also: **what do you NEVER cache on a shared layer?** Personalized data. Ever. That's a data-leak vulnerability waiting to happen.

**Theme 4 — Auth, errors, retries, offline**

*The question:* What happens when things go wrong? Because in production, they will.

*The four states every data-driven view must handle:*
- **Loading** — skeleton, not spinner. Preserves layout.
- **Error** — meaningful message + retry button. Log to observability.
- **Empty** — friendly CTA, not a blank screen.
- **Success** — the happy path.

*Auth flow specifics:* short-lived access token + refresh token rotation, fetch interceptor for silent 401 → refresh → retry, a single in-flight refresh promise so concurrent 401s don't all hit `/refresh`. Log out on refresh failure.

*Offline strategy:* service worker caches shell + last-known data, queues writes to replay on reconnect, UI shows an "offline" indicator so users know why actions aren't syncing.

**Soundbite:** *"Caching is about keeping the UI fast; resilience is about keeping it honest. Four render states per view, silent refresh for auth, and an offline story for any long-session experience."*

---

### Real-time & Scale

**Theme 5 — Real-time strategies**

*The question:* How do you push updates to a connected client?

*The four options and when to pick each:*

| Transport | Direction | Good for | Bad for |
|---|---|---|---|
| **Polling** | Client asks repeatedly | Simple dashboards, low-frequency updates | Anything frequent (wastes bandwidth and server CPU) |
| **Long polling** | Client holds open request until server has data | Legacy systems that can't do WS | Modern apps with better options |
| **SSE (Server-Sent Events)** | One-way server → client over HTTP | Feeds, notifications, live stats | Bidirectional chat |
| **WebSockets** | Full duplex | Chat, multiplayer, collaborative editing | Overkill when SSE would do |

Rule of thumb: start with **polling** if the frequency is "every few seconds or slower," move to **SSE** for one-way streams, move to **WebSocket** only when the client also needs to push messages back. Operational cost increases left-to-right.

**Theme 6 — Frontend scaling**

*The question:* How does the frontend itself scale — globally, across devices, over time?

*The tools:*
- **Code splitting** — route-level `React.lazy()` so the user only downloads the page they're on.
- **Lazy loading** — images, components, fonts below the fold.
- **CDN** — static assets at the edge. Non-negotiable at Riot scale.
- **Image optimization** — responsive `srcset`, AVIF/WebP, correct dimensions. Images dominate bundle weight.
- **Bundle analysis** — know what's in your JS bundle. Delete unused dependencies. Prefer small libraries.
- **Prefetch / preload** — hint the browser about what's next. `<link rel="prefetch">` for likely-next routes.

The player on a 3G phone in Brazil is the benchmark, not you on fiber in Santa Monica.

**Theme 7 — Failure handling**

*The question:* When a downstream service is broken, does the whole app die?

*The tools:*
- **Graceful degradation** — match stats service is down? Show match metadata anyway with "stats unavailable" banner. Don't crash the page.
- **Feature flags** — kill switches to disable broken features without a deploy.
- **Circuit breakers on the client** — stop hammering a failing endpoint, back off exponentially.
- **Retry with backoff** — network blips are the rule, not the exception.
- **Isolation** — one slow API should not freeze the rest of the UI. Each data source gets its own loading/error state.

**Soundbite:** *"Real-time is a transport question — pick the cheapest one that meets the refresh rate. Frontend scaling is about respecting the worst device on the worst network. Failure handling is about every feature failing independently instead of taking the whole app down."*

---

## Statelessness & the Decision Dictionary

This is the capstone. Statelessness is the single principle that ties the 15 blocks and the 7 themes together — it's *why* the architecture looks the way it does. Once you understand it, you stop memorizing and start reasoning.

The Decision Dictionary is the flip side: a direct lookup from "here's what this feature needs" to "here are the blocks that give you that." It's what lets you *start* a system design answer instead of freezing.

---

### The Statelessness Principle

**What "stateless" actually means**

A stateless server holds **no memory between requests**. Every request carries everything the server needs — auth token, params, body — and any server in the fleet can handle any request. The server RAM is empty between calls.

The word "stateless" is misleading because *the system* has state. The **database** has state. **Redis** has state. The **client** has state. What's stateless is the **server process in the middle**.

```
[Client]  ← state (JWT, UI, cached data)
   │
   ▼
[Load balancer]
   │
   ├─▶ [API server 1]  ┐
   ├─▶ [API server 2]  │  ← stateless, identical, disposable
   └─▶ [API server 3]  ┘
         │
         ▼
   [Redis] [Postgres] [S3]   ← state lives here
```

**Why it matters (the 5 things statelessness buys you)**

1. **Horizontal scaling.** Add servers to handle load. Any request to any server. No coordination. This is the single biggest unlock of modern web architecture.

2. **Fault tolerance.** A server crashes — the load balancer routes around it. Users don't notice. Without statelessness, a crash loses every in-flight session on that machine.

3. **Simpler reasoning.** Debug one request in isolation. No "well it depends what happened 3 requests ago on that server."

4. **Cache-friendly.** Same request → same response (given same DB state). CDNs, HTTP caches, memoization all assume this.

5. **Easier deploys.** Kill an old server, start a new one. No session-draining dance.

**Where statelessness breaks down (and what you do about it)**

Some things *require* state — auth sessions, WebSocket connections, rate limiters. The rule is: **push the state to a shared layer** (Redis, DB, JWT in the request itself) so the API server process stays disposable.

- **Auth:** JWT in the request = stateless. Session ID in a cookie, looked up in Redis = *effectively* stateless (any server can do the lookup).
- **WebSockets:** Inherently stateful. Solve it by running a **separate WebSocket gateway** and keeping the main API tier stateless.
- **Rate limits:** Counters in Redis, keyed by user. Any API server reads/writes the same counter.

**Soundbite:** *"Statelessness isn't about having no state — it's about keeping state out of server RAM. The client holds UI state, Redis holds hot state, Postgres holds durable state, and the API servers in the middle are cattle: identical, disposable, and safe to kill. That's what lets me run 2 servers or 200 without changing a line of code."*

---

### The Decision Dictionary

Stop asking *"what's the right architecture for X?"* Start asking *"what does this feature need, and which block gives me that?"*

This table is the answer-key. Memorize it and you can start any system design answer in 5 seconds instead of 5 minutes.

| The feature needs... | Reach for... | Why |
|---|---|---|
| Real-time updates, one-way | **SSE** | Simpler than WebSockets, built on HTTP, survives proxies |
| Real-time updates, two-way | **WebSocket gateway** | Only transport with full duplex |
| Fast global static delivery | **CDN** | Edge-cached close to users, zero origin load |
| Protection from abuse / DDoS | **CDN + rate limiter at edge** | Blocks attackers before they touch your servers |
| Survive a server crash | **Stateless API + load balancer** | Any server can take over; no session loss |
| Handle a traffic spike without dying | **Message queue** | Buffers the spike; workers drain it at steady rate |
| Sub-millisecond reads of hot data | **Redis** | In-memory, no disk seek |
| Durable, transactional writes | **Postgres** | ACID, source of truth |
| Store a user avatar / video / upload | **S3 / object storage** | Never put blobs in your relational DB |
| Search across millions of records | **Search index (Elasticsearch)** | `LIKE '%foo%'` on Postgres falls over at scale |
| Instantly revoke a session | **Server-side session in Redis** (or token blocklist) | JWTs alone can't be revoked before expiry |
| Cheap, fast, stateless auth verification | **JWT (RS256)** | Verify by signature, no DB lookup per request |
| Send the same event to 10,000 clients | **Pub/sub + WebSocket gateway** | One publish, many subscribers |
| Do slow work (email, export, thumbnail) | **Queue + background workers** | Don't block the user's request |
| See what's happening in production | **Monitoring (logs + metrics + traces)** | You can't fix what you can't see |
| Keep recent items, counters, rate-limits | **Redis** | TTL and counters are native |
| Cache a DB query for 60 seconds | **Redis (cache-aside)** | Read from Redis first, fall through to Postgres on miss |
| Avoid coupling two services in time | **Message queue** | Producer writes, consumer reads later, neither blocks |
| Keep a feed fresh for every user | **Queue fan-out + pre-computed feed in Redis** | Don't recompute on every read |
| A user's profile page that's auth-gated but mostly static | **CDN + edge JWT verification** | Cache the HTML, verify auth at the edge, skip origin |

**How to use this in the interview**

You will hear a prompt like: *"Design a leaderboard for a live esports tournament with millions of concurrent viewers."* Instead of panicking, scan the dictionary:

- *"Millions concurrent"* → stateless API + load balancer + CDN
- *"Live leaderboard"* → Redis sorted set (built-in `ZADD` / `ZRANGE`)
- *"Updates as matches happen"* → event queue from match service → pub/sub → WebSocket gateway to clients
- *"Survives a spike during finals"* → CDN absorbs static, queue buffers events, Redis handles the hot reads
- *"Historic leaderboards"* → Postgres for durable storage, Redis for the live one

**That's your answer, and you built it in 30 seconds from the dictionary.** Everything after that is justifying tradeoffs, which is what the interview is actually testing.

**Soundbite:** *"I treat system design as a composition problem, not a memorization problem. I start from what the feature needs — real-time? durable? fast globally? auth-sensitive? — and reach for the block that's purpose-built for that need. The 15 blocks are my vocabulary; the decision table is my sentence structure."*

**Player-first close:** *"The reason this matters for players is that every one of these blocks maps to a failure they don't want to experience. CDN means their page loads in Jakarta as fast as in LA. Stateless API means a server crash doesn't log them out. Queue means a traffic spike during Worlds doesn't cause a 500. Redis leaderboard means the scores update in under a second. The architecture IS the player experience — they're the same decision, viewed from two angles."*
