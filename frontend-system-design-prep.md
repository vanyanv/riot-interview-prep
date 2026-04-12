# Frontend-Leaning System Design Prep

**For:** Deep Tech Round — Apr 13, 2026 | **Interviewer:** Fernando Micalli

This doc is a practice companion for system design questions with a frontend focus. The framework covers both **high-level backend/infrastructure architecture** and **deep frontend design** — because even in a frontend-leaning interview, you're expected to show you understand the full system. Use the framework in Part 1 for any question, then rehearse the walkthroughs in Part 2 out loud.

**Tools:** Have [Draw.io/Diagrams.net](https://app.diagrams.net/) open — Riot uses it for system design interviews.

---

## Part 1: The Framework

Use this 8-step method for any system design question. Each step includes what to say out loud.

---

### Step 1: Clarify Requirements (3-5 minutes)

Don't start designing. Ask questions first. Fernando wants to see that you scope the problem before solving it.

**Say:** *"Before I start designing, I'd like to ask a few questions to make sure I'm building the right thing."*

**Functional requirements — ask:**
- Who is the user? (Players, admins, API consumers, content team?)
- What are the core user flows? (What can they do? What's the happy path?)
- What are we NOT building? (Scope boundaries — "Is admin/moderation in scope?")
- What platforms? (Web only? Mobile web? Native? Desktop?)

**Non-functional requirements — ask:**
- Scale: How many concurrent users? (Hundreds? Millions during Worlds?)
- Latency: Real-time? Near-real-time? Eventual consistency OK?
- Offline: Does it need to work without a connection?
- Accessibility: WCAG compliance level?
- Internationalization: Multi-language? Multi-region?

**Say:** *"Let me summarize what I'm hearing — we need [X] for [Y users] that handles [Z scale]. The core flows are [A, B, C]. Out of scope: [D]. Does that sound right?"*

**Write down** the requirements on the shared drawing surface. This becomes your contract for the rest of the discussion.

---

### Step 2: High-Level Architecture (5-7 minutes)

Before zooming into frontend components, zoom out. Draw the full system on the shared surface. This shows Fernando you understand how the frontend fits into the bigger picture.

**Say:** *"Before I dive into the frontend, let me sketch the high-level architecture so we're aligned on how the pieces fit together."*

**Draw a box diagram:**
```
┌─────────┐     ┌─────┐     ┌──────────────┐     ┌───────────┐     ┌────────────┐
│  Client  │────▶│ CDN │────▶│ Load Balancer│────▶│ App Server│────▶│  Database  │
│ (Browser)│     │     │     │   (Nginx)    │     │ (Node/Go) │     │(Postgres/  │
└─────────┘     └─────┘     └──────────────┘     └─────┬─────┘     │ MongoDB)   │
                                                       │           └────────────┘
                                                       │
                                                 ┌─────▼─────┐     ┌────────────┐
                                                 │   Cache    │     │  Message   │
                                                 │  (Redis)   │     │   Queue    │
                                                 └───────────┘     │  (Kafka)   │
                                                                    └────────────┘
```

**What to cover:**
- **CDN:** Static assets (JS bundles, images, fonts) served from edge. For a Riot-scale app, also cache API responses for public data (match results, team info).
- **Load balancer:** Distributes traffic. Mention sticky sessions if using WebSockets (or better: use a separate WebSocket gateway).
- **App servers:** Stateless — any server can handle any request. Horizontally scalable.
- **Database:** SQL (Postgres) for relational data (users, predictions, match records). NoSQL (MongoDB/DynamoDB) for flexible schemas (game events, player stats). Choose based on query patterns, not hype.
- **Cache (Redis):** Session store, hot data (live scores, leaderboards), rate limiting counters. Mention TTLs and invalidation strategy.
- **Message queue (Kafka/RabbitMQ):** Decouple services. Game events → Kafka → processing pipeline → WebSocket server → clients. Critical for real-time features.
- **WebSocket gateway:** Separate from app servers. Handles persistent connections. Subscribes to Redis Pub/Sub or Kafka topics, pushes to clients.

**Key principles to say out loud:**
- *"I'd keep the app servers stateless so we can scale horizontally. Session state goes in Redis, not in-memory."*
- *"For real-time features, I'd use a dedicated WebSocket gateway that subscribes to a message queue — this decouples the game event pipeline from client connections."*
- *"Static assets go on a CDN with hashed filenames and long cache TTLs. API responses for immutable data (completed matches) can also be CDN-cached."*

**Say:** *"Now that we have the high-level picture, let me zoom into the frontend architecture."*

---

### Step 3: Component Architecture (5-7 minutes)

Break the UI into a component tree. Draw it in Draw.io.

**Say:** *"Let me start by breaking this down into the major UI components and how they nest."*

**How to think about it:**
- Start with the **page/route level** — what are the top-level views?
- Break each view into **regions** — header, sidebar, main content, footer
- Break regions into **components** — each with a single responsibility
- Identify **shared components** — things reused across views (buttons, modals, cards)

**Draw:** A simple tree diagram. Example:
```
App
├── Layout (header, nav, footer)
├── Routes
│   ├── /login → LoginPage
│   │   ├── LoginForm
│   │   ├── OAuthButtons
│   │   └── ErrorBanner
│   ├── /matches → MatchListPage
│   │   ├── SearchBar
│   │   ├── FilterPanel
│   │   └── MatchCard[]
│   └── /match/:id → MatchDetailPage
│       ├── VideoPlayer
│       ├── StatsOverlay
│       └── ChatPanel
└── Shared
    ├── Button, Input, Modal
    ├── LoadingSkeleton
    └── ErrorBoundary
```

**Say:** *"I'm using a component-driven approach — atomic design principles. These leaf components are reusable, the page-level components compose them. Let me talk about where state lives."*

---

### Step 4: State Design (5-7 minutes)

This is the core of frontend system design. Where does state live, and why?

**Say:** *"Let me think about the different categories of state in this system and where each should live."*

**State categories:**

| Category | Examples | Where it lives | Why |
|----------|----------|----------------|-----|
| **Server state** | Match data, user profile, teams | React Query / SWR / Apollo cache | Needs caching, invalidation, background refresh. Don't reinvent this. |
| **Client state** | UI toggles, form inputs, selected tab | Component state (`useState`) or Context | Local to the UI, doesn't need persistence. |
| **URL state** | Current route, search query, filters, page number | URL (React Router / `useSearchParams`) | Shareable, bookmarkable, survives refresh. |
| **Persistent state** | Auth tokens, user preferences, theme | `localStorage` / cookies | Survives page close. Cookies for auth (HttpOnly, Secure). |
| **Real-time state** | Live scores, chat messages, connection status | WebSocket/SSE + local state or store | Pushed from server, needs reconciliation with cached data. |

**Key principles to state out loud:**
- *"Server state goes in a data-fetching library — React Query gives us caching, background refetch, stale-while-revalidate, and request deduplication for free."*
- *"Anything the user should be able to share via URL goes in the URL — search queries, filters, pagination."*
- *"Auth tokens go in HttpOnly cookies, not localStorage — prevents XSS from stealing them."*
- *"I'd avoid a global store like Redux unless we have truly global cross-cutting state. For most apps, React Query + Context + URL state covers it."*

**Draw:** A diagram showing data flow between state stores:
```
URL ←→ Router ←→ Components ←→ React Query Cache ←→ API
                      ↕                                  ↕
               Local State (useState)            WebSocket/SSE
                      ↕
              localStorage/cookies
```

---

### Step 5: API Contract (3-5 minutes)

Define the interface between frontend and backend. Don't design the backend — design what the frontend needs.

**Say:** *"Let me define the API contract from the frontend's perspective — what data do we need, and in what shape?"*

**For REST:**
```
GET    /api/matches?status=live&page=1&limit=20
GET    /api/matches/:id
POST   /api/auth/login   { email, password }
POST   /api/predictions   { matchId, teamId }
```

**For GraphQL (Fernando's preference):**
```graphql
query GetMatch($id: ID!) {
  match(id: $id) {
    id
    status
    teams { name, logo }
    score { team1, team2 }
    games { ... }
  }
}

subscription OnMatchUpdate($matchId: ID!) {
  matchUpdated(matchId: $matchId) {
    score
    status
    liveStats { goldDiff, kills }
  }
}
```

**Things to mention:**
- *"I'd lean toward GraphQL here because [multiple clients need different data shapes / the data is deeply nested / Fernando's team uses it]. But for simpler CRUD, REST with proper caching headers is fine."*
- *"For real-time data, I'd use GraphQL subscriptions backed by WebSocket, with SSE as a fallback."*
- Pagination: cursor-based for real-time lists (items shift), offset-based for static lists
- Error responses: standardized shape `{ error: { code, message, field? } }`

---

### Step 6: Data Flow Walkthrough (3-5 minutes)

Pick the most important user flow and trace data from click to screen.

**Say:** *"Let me walk through the most critical user flow end-to-end."*

**Template for any flow:**
1. **User action** → (click, type, navigate)
2. **Event handler** → (what component handles it)
3. **State update** → (optimistic? loading state?)
4. **API call** → (what's the request, what library fires it)
5. **Cache update** → (React Query invalidation, Apollo cache update)
6. **Re-render** → (what components re-render, how is loading/error handled)
7. **Side effects** → (URL update, analytics, notifications)

**Example — User submits a prediction:**
1. User clicks "Predict T1" on the MatchCard
2. `PredictionButton.onClick` fires
3. **Optimistic update:** immediately show "T1 selected" in the UI (don't wait for server)
4. `mutation.mutate({ matchId, teamId })` fires via React Query
5. On success: invalidate `['predictions', matchId]` query, show success toast
6. On error: **roll back** optimistic update, show error banner with retry
7. Update URL if needed (e.g., `?predicted=true` for sharing)

**Draw:** A sequence diagram or numbered flow on the drawing tool.

---

### Step 7: Performance & Scale (3-5 minutes)

Fernando cares deeply about performance at scale. This is where you differentiate yourself.

**Say:** *"Let me talk about how this performs at scale — during something like Worlds with millions of concurrent users."*

**Checklist — mention what's relevant:**

**Loading performance:**
- Code splitting by route — `React.lazy()` + `Suspense`
- Preload critical resources — `<link rel="preload">`
- Image optimization — responsive `srcset`, WebP/AVIF, lazy loading below fold
- Critical CSS inlined, rest loaded async
- Bundle size budget — tree-shake, no full lodash imports

**Runtime performance:**
- Virtualize long lists — `react-window` or `@tanstack/virtual` for 1000+ items
- Memoize expensive renders — `React.memo`, `useMemo`, `useCallback` where it matters (not everywhere)
- Debounce search inputs — 300ms debounce before firing API calls
- Web Workers for CPU-heavy work — parsing, data transformation off main thread

**Network performance:**
- React Query's stale-while-revalidate — show cached data instantly, refresh in background
- Persisted GraphQL queries — convert to GET, cacheable by CDN
- CDN for static assets with hashed filenames + long `max-age`
- Prefetch next likely route data on hover/focus

**Real-time performance (if applicable):**
- Connection management — single WebSocket, multiplex channels
- Throttle UI updates — don't re-render on every WebSocket message, batch at 60fps with `requestAnimationFrame`
- Reconnection with exponential backoff
- Show connection status to user

**Say:** *"The key insight at Worlds scale is that most data can be cached aggressively — team logos, player photos, completed match results don't change. Only live match state needs real-time delivery. So I'd structure caching in tiers..."*

---

### Step 8: Edge Cases & Error Handling (2-3 minutes)

Show you think about the unhappy paths. This is senior-level thinking.

**Say:** *"Let me cover the edge cases and failure modes."*

**Universal edge cases:**
- **Loading states:** Skeleton screens (not spinners) for every data-dependent view
- **Error states:** Meaningful error messages with retry actions, not just "Something went wrong"
- **Empty states:** Friendly messages with CTAs, not blank screens
- **Offline/degraded:** Show cached data + "You're offline" banner. Queue mutations for retry.
- **Auth expiry:** Intercept 401s globally, attempt token refresh, redirect to login only if refresh fails
- **Race conditions:** Cancel stale requests on navigation (`AbortController`), cancel stale search queries on new input
- **Accessibility:** Keyboard navigation, screen reader announcements for live updates (`aria-live`), focus management on route changes
- **Internationalization:** Text expansion (German is ~30% longer than English), RTL layout support, timezone-aware dates

**Say:** *"I always design for four states per view: loading, success, error, and empty. And for a live event app, I'd add a fifth: degraded — where the real-time connection is lost but we fall back to polling."*

---

### Framework Summary — Your Cheat Sheet

| Step | Time | Key output |
|------|------|------------|
| 1. Requirements | 3-5 min | Written list of functional + non-functional requirements |
| 2. High-level architecture | 5-7 min | System box diagram (CDN, servers, DB, cache, queues) |
| 3. Components | 5-7 min | Component tree diagram |
| 4. State | 5-7 min | State category table + data flow diagram |
| 5. API | 3-5 min | Endpoint/query definitions |
| 6. Data flow | 3-5 min | End-to-end walkthrough of the critical path |
| 7. Performance | 3-5 min | Scale-relevant optimizations |
| 8. Edge cases | 2-3 min | Error handling, loading, offline, a11y |
| **Total** | **~35 min** | Fits a 45-60 min interview with room for Q&A |

---

## Part 2: Practice Walkthroughs

---

## Walkthrough 1: Login/Auth System for a Gaming Platform

*"Design the login experience for a gaming platform like Riot's."*

---

### Requirements

**Functional:**
- Login with email/password
- Login with social providers (Google, Apple, Discord)
- SSO across multiple game properties (LoL, Valorant, TFT, LoL Esports)
- "Remember me" / stay logged in
- Multi-factor authentication (MFA) — TOTP or SMS
- Password reset flow
- Session management — view/revoke active sessions
- Age gate for regions that require it (COPPA, GDPR)

**Non-functional:**
- Latency: Login should feel instant (<500ms perceived)
- Security: Resistant to XSS, CSRF, credential stuffing, brute force
- Scale: Millions of accounts, spikes during game launches/events
- Accessibility: Full keyboard navigation, screen reader support
- i18n: Multi-language login pages (30+ languages for Riot)

---

### System Architecture

```
┌──────────┐    ┌─────┐    ┌────────┐    ┌──────────────┐    ┌──────────┐
│  Client  │───▶│ CDN │───▶│  Load  │───▶│  Auth Service│───▶│ User DB  │
│ (Browser)│    │     │    │Balancer│    │  (Node/Go)   │    │(Postgres)│
└──────────┘    └─────┘    └────────┘    └──────┬───────┘    └──────────┘
                                                │
                                          ┌─────▼─────┐    ┌────────────┐
                                          │   Redis    │    │  OAuth     │
                                          │(sessions,  │    │ Providers  │
                                          │ rate limit)│    │(Google,etc)│
                                          └───────────┘    └────────────┘
```

- **Auth service:** Stateless app servers behind a load balancer. Handles login, token issuance, token refresh, MFA verification. Horizontally scalable.
- **User DB (Postgres):** Users table (id, email, password_hash, mfa_secret), sessions table (id, user_id, device, ip, created_at, expires_at). Relational because we need strong consistency for auth — no eventual consistency for "is this user logged in."
- **Redis:** Three uses — (1) session store for fast token validation, (2) rate limiting counters (login attempts per IP/email), (3) short-lived MFA session tokens. TTLs handle expiry automatically.
- **Rate limiter:** Sits in front of the auth service (or as middleware). Limits by IP (e.g., 10 login attempts/min) and by account (e.g., 5 failed attempts → temporary lock). Uses Redis counters with sliding window.
- **OAuth providers:** External — Google, Apple, Discord. Auth service handles the PKCE flow and token exchange.

**Say:** *"The auth system needs to be its own service — it's shared across all Riot properties (LoL, Valorant, TFT). A dedicated auth service on a shared domain like auth.riotgames.com means each game property doesn't need its own auth implementation."*

---

### Component Tree

```
App
├── AuthProvider (Context — holds auth state, provides login/logout)
├── Routes
│   ├── /login → LoginPage
│   │   ├── LoginTabs (email | social)
│   │   ├── EmailLoginForm
│   │   │   ├── Input (email)
│   │   │   ├── Input (password, with show/hide toggle)
│   │   │   ├── RememberMeCheckbox
│   │   │   ├── ForgotPasswordLink
│   │   │   └── SubmitButton (with loading state)
│   │   ├── SocialLoginButtons
│   │   │   ├── GoogleButton
│   │   │   ├── AppleButton
│   │   │   └── DiscordButton
│   │   ├── ErrorBanner (wrong password, account locked, etc.)
│   │   └── AgeGate (conditional, region-based)
│   ├── /login/mfa → MFAPage
│   │   ├── TOTPInput (6-digit code)
│   │   ├── SMSCodeInput
│   │   └── BackupCodeInput
│   ├── /forgot-password → ForgotPasswordPage
│   │   ├── EmailInput
│   │   └── SuccessMessage ("Check your email")
│   ├── /reset-password/:token → ResetPasswordPage
│   │   ├── NewPasswordInput (with strength indicator)
│   │   └── ConfirmPasswordInput
│   └── /settings/sessions → SessionManagementPage
│       └── SessionList
│           └── SessionCard (device, location, last active, revoke button)
└── Shared
    ├── ProtectedRoute (redirects to /login if not authenticated)
    └── AuthInterceptor (handles 401s, token refresh)
```

---

### State Design

| State | Location | Why |
|-------|----------|-----|
| Auth status (logged in/out, user object) | `AuthContext` + React Query | Global — every component may need it. React Query handles the `/me` fetch + caching. |
| Login form inputs | `useState` in `EmailLoginForm` | Local to the form, no need to lift. |
| Auth tokens (access + refresh) | HttpOnly Secure cookies | **Never localStorage** — prevents XSS theft. HttpOnly means JS can't read them. Secure means HTTPS only. SameSite=Lax for CSRF protection. |
| "Remember me" preference | Cookie expiry duration | Remember me = long-lived refresh token (30 days). Without = session cookie (expires on browser close). |
| MFA step (which step of the flow) | URL or local state | If URL-based (`/login/mfa`), user can refresh without losing progress. |
| Login error messages | Local state in form component | Ephemeral, clears on retry. |
| Redirect target (where to go after login) | URL query param `?redirect=/matches` | Survives the OAuth redirect dance. |

**Say:** *"The critical security decision here is storing tokens in HttpOnly cookies, not localStorage. Even if an attacker finds an XSS vulnerability, they can't exfiltrate the tokens because JavaScript can't read HttpOnly cookies. The trade-off is that the backend needs to set the cookies, and the frontend uses `credentials: 'include'` on fetch requests."*

---

### API Contract

```
POST /api/auth/login
  Body: { email, password, rememberMe }
  Response: Sets HttpOnly cookies (access_token, refresh_token)
            Returns: { user: { id, name, avatar }, requiresMfa: boolean }

POST /api/auth/mfa/verify
  Body: { code, type: 'totp' | 'sms' | 'backup' }
  Response: Sets HttpOnly cookies
            Returns: { user: { id, name, avatar } }

POST /api/auth/oauth/:provider
  Redirects to provider's OAuth page
  Callback: /api/auth/oauth/:provider/callback?code=...
  Response: Sets HttpOnly cookies, redirects to ?redirect param

POST /api/auth/refresh
  Cookie: refresh_token (sent automatically)
  Response: Sets new access_token cookie

POST /api/auth/logout
  Response: Clears cookies, invalidates refresh token server-side

GET /api/auth/me
  Response: { user: { id, name, avatar, email } } or 401

GET /api/auth/sessions
  Response: { sessions: [{ id, device, ip, location, lastActive, current }] }

DELETE /api/auth/sessions/:id
  Response: 204 (revokes that session)
```

**OAuth flow (PKCE for SPA):**
1. Frontend generates `code_verifier` (random string) and `code_challenge` (SHA256 hash)
2. Redirect to provider with `code_challenge`
3. Provider redirects back with `authorization_code`
4. Frontend sends `code` + `code_verifier` to backend
5. Backend exchanges with provider, sets cookies, returns user

**Say:** *"I'm using PKCE because this is a public client — a SPA can't keep secrets. The code_verifier proves that the same client that started the OAuth flow is the one finishing it, preventing authorization code interception attacks."*

---

### Data Flow — Login with Email

1. User types email + password, clicks "Log In"
2. `EmailLoginForm.onSubmit` fires — sets `isLoading: true`, disables button
3. Sends `POST /api/auth/login` with `credentials: 'include'`
4. **If success + no MFA:** Server sets cookies, returns user. `AuthContext` updates. Router redirects to `?redirect` param or `/home`.
5. **If success + MFA required:** Server returns `{ requiresMfa: true, mfaSessionToken }`. Navigate to `/login/mfa`.
6. **If error (wrong password):** Show error banner. Increment attempt counter. After 5 attempts, show CAPTCHA or temporary lockout message.
7. **If error (account locked):** Show "Account locked. Check email for unlock link."
8. **If network error:** Show "Connection failed. Please try again." with retry button.

**Token refresh flow (background):**
- React Query fetches `/api/auth/me` on app load
- If 401 → interceptor calls `POST /api/auth/refresh`
- If refresh succeeds → retry original request with new token
- If refresh fails → clear auth state, redirect to `/login?redirect=current_path`
- Use a request queue: while refreshing, queue all other requests, replay after refresh completes

---

### Performance

- **Code split auth pages** — users on the main app don't download login code
- **Prefetch the post-login page** while the login request is in-flight: `router.prefetch('/home')`
- **Optimistic redirect** — navigate immediately after login succeeds, let `/api/auth/me` confirm in background
- **Social login button loading** — show buttons immediately with SDK loading in background, not after SDK loads
- **Rate limiting on login endpoint** — backend concern, but frontend should handle 429s gracefully (show "Too many attempts, try again in X seconds")

---

### Edge Cases

- **Password managers:** Ensure form fields have proper `name`, `autocomplete` attributes (`autocomplete="username"`, `autocomplete="current-password"`)
- **Multiple tabs:** If user logs out in one tab, other tabs should detect it (listen for `storage` event on a shared key, or use `BroadcastChannel`)
- **OAuth popup blocked:** Fall back to redirect-based OAuth if popup is blocked
- **Token race condition:** Multiple 401s trigger multiple refresh calls — use a singleton promise so only one refresh request fires, others wait for it
- **SSO across games:** After login on lolesports.com, visiting valorantesports.com should already be logged in. This requires a shared auth domain (e.g., `auth.riotgames.com`) that sets cookies on the parent domain.
- **CSRF:** SameSite=Lax cookies + check `Origin` header on the server. For non-GET requests from other origins, require a CSRF token.

**Say to Fernando:** *"The most interesting architectural decision here is how SSO works across Riot properties. I'd use a shared auth service on a parent domain — say `auth.riotgames.com` — that issues tokens scoped to the Riot ecosystem. Each game property validates tokens against this shared service. The cookies would be set on `.riotgames.com` so they're sent to any subdomain."*

---

## Walkthrough 2: Esports Match Viewing App

*"Design an application for viewing esports matches — live and VODs."*

---

### Requirements

**Functional:**
- Watch live matches with video stream
- Real-time stats overlay (gold diff, kills, objectives, player builds)
- Live chat alongside the stream
- VOD library — browse and watch past matches
- Spoiler-free mode — hide results until user opts in
- Multi-POV / multi-stream selection
- Picture-in-picture support
- Clip creation — mark and share moments

**Non-functional:**
- Scale: Millions of concurrent viewers during Worlds finals
- Latency: Stats overlay should be within 2-3 seconds of the broadcast
- Mobile: Full experience on mobile web (touch controls, responsive layout)
- Bandwidth: Adaptive bitrate for variable connections
- Offline: VODs should support download for offline viewing (stretch goal)

---

### System Architecture

```
┌──────────┐    ┌─────┐    ┌────────┐    ┌──────────────┐    ┌──────────┐
│  Client  │───▶│ CDN │───▶│  Load  │───▶│  API Server  │───▶│ Match DB │
│ (Browser)│    │(VODs│    │Balancer│    │  (Node/Go)   │    │(Postgres)│
│          │    │+HLS)│    └────────┘    └──────┬───────┘    └──────────┘
└────┬─────┘    └─────┘                        │
     │                                    ┌────▼────┐
     │    ┌──────────┐    ┌─────────┐    │  Redis  │
     └───▶│WebSocket │◀──▶│  Kafka  │◀───│(pub/sub)│
          │ Gateway  │    │         │    └─────────┘
          └──────────┘    └────┬────┘
                               │
                         ┌─────▼──────┐    ┌──────────────┐
                         │  Event     │◀───│ Game Server  │
                         │ Processor  │    │ (live data)  │
                         └────────────┘    └──────────────┘
```

- **Game data pipeline:** Game server → Kafka → event processor (enriches with metadata) → Redis Pub/Sub → WebSocket gateway → clients. This decouples the game server from client-facing infrastructure.
- **Video delivery:** Live streams via HLS/DASH — video is transcoded into multiple bitrates by a transcoding service, segments are pushed to CDN origin. CDN edge servers deliver segments to viewers. For Worlds-scale (millions of concurrent viewers), the CDN does the heavy lifting.
- **VOD storage:** Completed match recordings stored in object storage (S3), served via CDN. Metadata (teams, tournament, timestamps) in Postgres.
- **WebSocket gateway:** Dedicated service for persistent connections — separate from API servers. Subscribes to Redis Pub/Sub channels. Can scale independently based on connection count (not CPU/request load).
- **CDN tiers:** (1) Static assets — hashed filenames, long cache TTL. (2) VODs — cached at edge, immutable after creation. (3) Live HLS segments — short TTL (2-6 seconds), edge-cached for fan-out.

**Say:** *"The key architectural insight is separating the live data pipeline from the API servers. Live match stats flow through Kafka → event processor → Redis Pub/Sub → WebSocket gateway. This pipeline can scale independently from the REST/GraphQL API that serves match history and VOD metadata."*

---

### Component Tree

```
App
├── Routes
│   ├── /live → LiveMatchesPage
│   │   ├── FeaturedMatch (hero — largest match)
│   │   └── MatchGrid (other live matches)
│   │       └── MatchCard (team logos, score, status)
│   │
│   ├── /match/:id/live → LiveMatchPage
│   │   ├── VideoSection
│   │   │   ├── VideoPlayer (HLS/DASH adaptive stream)
│   │   │   ├── StreamSelector (broadcast, player POV, map view)
│   │   │   └── PiPButton
│   │   ├── StatsPanel (collapsible on mobile)
│   │   │   ├── Scoreboard (team scores, game count)
│   │   │   ├── GoldDiffGraph (live updating chart)
│   │   │   ├── PlayerStatsTable (KDA, CS, items)
│   │   │   └── ObjectiveTimeline (dragons, barons, towers)
│   │   ├── ChatPanel (collapsible)
│   │   │   ├── ChatMessageList (virtualized)
│   │   │   ├── ChatInput
│   │   │   └── ChatModeration (report, block)
│   │   └── ClipButton → ClipCreator modal
│   │
│   ├── /vods → VODLibraryPage
│   │   ├── SearchBar
│   │   ├── FilterPanel (tournament, team, date)
│   │   └── VODGrid
│   │       └── VODCard (thumbnail, teams, duration, spoiler blur)
│   │
│   └── /match/:id/vod → VODPlayerPage
│       ├── VideoPlayer (with seek, speed controls)
│       ├── StatsTimeline (scrub to any point, see stats at that time)
│       └── GameSelector (for best-of series)
│
├── SpoilerGuard (Context — wraps app, controls spoiler visibility)
└── ConnectionStatus (shows "Live updates paused — reconnecting...")
```

---

### State Design

| State | Location | Why |
|-------|----------|-----|
| Live match data (scores, stats) | WebSocket → local state + React Query for initial load | WebSocket pushes updates; React Query handles initial fetch and fallback. |
| Video player state (playing, volume, quality, current time) | `useRef` + local state in VideoPlayer | Local to the player, no need to share. `useRef` for the player instance. |
| Selected stream/POV | URL param `?pov=faker` | Shareable — "watch Faker's POV" link. |
| Chat messages | Local state (ring buffer — keep last 500) | Don't store thousands of messages in memory. Old ones scroll off. |
| Spoiler-free mode | `localStorage` + `SpoilerGuardContext` | Persists across sessions. Context makes it available everywhere. |
| Connection status (connected/reconnecting/offline) | Context or Zustand atom | Multiple components need to show/react to connection state. |
| VOD filters (tournament, team, date) | URL search params | Bookmarkable, shareable filter states. |

**Say:** *"For real-time data, I'd use a hybrid approach. React Query fetches the initial match state, then a WebSocket subscription pushes deltas. If the WebSocket disconnects, React Query's background refetch kicks in as a polling fallback. The user always has data — it just might be a few seconds stale during reconnection."*

---

### API Contract

```graphql
# Initial match load
query GetLiveMatch($id: ID!) {
  match(id: $id) {
    id, status, teams { name, logo, score }
    currentGame {
      goldDiff, kills, towers, dragons
      players {
        name, champion, kda, cs, items, gold
      }
    }
    streams { label, url, type }
  }
}

# Real-time updates (WebSocket)
subscription OnMatchUpdate($matchId: ID!) {
  matchUpdated(matchId: $matchId) {
    type  # SCORE_UPDATE, KILL, OBJECTIVE, GOLD_TICK, GAME_END
    payload  # varies by type
    timestamp
  }
}

# VOD library
query GetVODs($filter: VODFilter, $cursor: String, $limit: Int) {
  vods(filter: $filter, after: $cursor, first: $limit) {
    edges {
      node { id, teams, tournament, date, duration, thumbnailUrl, games }
    }
    pageInfo { hasNextPage, endCursor }
  }
}

# Chat (separate WebSocket channel)
subscription OnChatMessage($matchId: ID!) {
  chatMessage(matchId: $matchId) {
    id, author { name, badge }, text, timestamp
  }
}

mutation SendChatMessage($matchId: ID!, $text: String!) {
  sendChatMessage(matchId: $matchId, text: $text) { id }
}
```

---

### Data Flow — Live Match Stats Update

1. Game server emits event (e.g., "Player Faker got a kill")
2. Event goes through Kafka → processing service → enriches with player/team metadata
3. Processing service publishes to Redis Pub/Sub channel `match:123:updates`
4. WebSocket server (subscribed to Redis channel) pushes event to all connected clients
5. Client receives `{ type: 'KILL', payload: { killer: 'Faker', victim: 'Chovy', ... }, timestamp }`
6. `useMatchSubscription` hook dispatches event to reducer
7. Reducer updates local match state (increment kill count, update KDA)
8. React re-renders only the affected components (kill feed, scoreboard, player stats row)
9. GoldDiffGraph appends new data point, CSS transition animates the line

**Throttling:** WebSocket messages arrive at high frequency during teamfights. Batch state updates using `requestAnimationFrame`:
```js
const pendingUpdates = useRef([]);

useEffect(() => {
  socket.onmessage = (event) => {
    pendingUpdates.current.push(JSON.parse(event.data));
  };
  
  const flush = () => {
    if (pendingUpdates.current.length > 0) {
      dispatch({ type: 'BATCH_UPDATE', events: pendingUpdates.current });
      pendingUpdates.current = [];
    }
    rafId = requestAnimationFrame(flush);
  };
  let rafId = requestAnimationFrame(flush);
  return () => cancelAnimationFrame(rafId);
}, []);
```

**Say:** *"The key insight is that we don't re-render on every WebSocket message — during a teamfight, we might get 10 events per second. Instead, we batch them into animation frames. The user perceives smooth 60fps updates, and we avoid React reconciliation thrashing."*

---

### Performance

- **Video:** HLS with adaptive bitrate (hls.js library). Start at medium quality, adapt based on bandwidth. Preload next segment.
- **Stats overlay:** Lightweight — no heavy charting library. Canvas or SVG for the gold diff graph. CSS transforms for animations (GPU-composited).
- **Chat:** Virtualized list (`react-window`) — only render visible messages. Ring buffer caps memory at 500 messages.
- **Code split:** VOD pages split from live pages. Chat panel lazy-loaded (heavy dependency).
- **Image optimization:** Team logos as SVG sprites (one request, infinitely scalable). Player photos as WebP with fallback.
- **CDN:** Static assets + completed match data on CDN. Live data bypasses CDN entirely.
- **Service Worker:** Cache team logos, champion icons, and app shell. VOD metadata can be cached with stale-while-revalidate.

---

### Edge Cases

- **Spoiler-free mode:** When enabled, blur all scores, hide match results in VOD list, pad VOD durations to a uniform length (short VOD = stomp is a spoiler). User clicks "Reveal" to see results.
- **Stream delay:** Stats might be 5-10 seconds ahead of the video. Option: buffer stats and release them on a delay matching the stream latency.
- **Chat spam:** Rate limit client-side (1 message per 2 seconds). Show "slow mode" indicator. Optimistic render of own messages, but don't render other users' messages until they clear moderation.
- **PiP (Picture-in-Picture):** Use the `document.pictureInPictureEnabled` API. When PiP is active, keep the stats panel visible in the main page.
- **Mobile layout:** On small screens, stack video on top, stats below. Chat in a bottom sheet (swipe up to open). Use `matchMedia` or container queries.
- **Multiple concurrent matches:** User watching 2 matches in split-screen. Each has its own WebSocket subscription. Coordinate connection management to avoid opening too many sockets.

**Say to Fernando:** *"The hardest UX challenge here is the spoiler problem for VODs. Even the duration of a video can be a spoiler — a 25-minute VOD is obviously a stomp. I'd pad all VODs to the maximum possible length, and in spoiler-free mode, hide the scrub bar's total time. This is a small detail but it's exactly the kind of thing that earns player trust."*

---

## Walkthrough 3: Real-Time Esports Dashboard

*"Design a real-time dashboard showing live esports stats and leaderboards."*

---

### Requirements

**Functional:**
- Live match scoreboard — all ongoing matches with real-time scores
- Detailed stats for a selected match — gold diff, kills, objectives, player stats
- Tournament leaderboard — standings updated after each match
- Event ticker — play-by-play feed of notable events across all matches
- Notification system — alerts for upsets, pentakills, match completions

**Non-functional:**
- Scale: 2M+ concurrent users during Worlds
- Latency: Updates within 2-3 seconds of in-game events
- Resilience: Must degrade gracefully under load — stale data is better than no data
- Mobile-first: Most users on phones during live events

---

### System Architecture

The architecture is similar to the Match Viewing app (same game data pipeline), but the dashboard consumes data differently — it subscribes to summaries for *all* live matches, plus detail for *one* selected match.

- **Same pipeline:** Game server → Kafka → event processor → Redis Pub/Sub → WebSocket gateway → client
- **Two subscription tiers:** (1) `all-matches-summary` channel — lightweight updates (scores, status) for every live match. (2) `match:{id}:detail` channel — full stats for the selected match. This keeps bandwidth manageable.
- **Leaderboard service:** Reads completed match results from Postgres, computes standings, caches in Redis. Updated after each match ends (not real-time). API serves from Redis cache with 60s TTL.
- **Redis sorted sets:** Ideal for leaderboards — `ZADD` to insert/update, `ZRANGE` to fetch ranked results, `ZRANK` to get a user's position. O(log N) operations.

---

### Component Tree

```
DashboardPage
├── ConnectionIndicator (green dot / "Live" / "Reconnecting...")
├── MatchSidebar (list of all live matches, click to select)
│   └── MatchSummaryCard (teams, score, status — mini view)
├── MainPanel
│   ├── MatchHeader (selected match — teams, series score, game time)
│   ├── StatsGrid (responsive grid of stat cards)
│   │   ├── GoldDiffCard (live chart)
│   │   ├── KillScoreCard
│   │   ├── ObjectiveCard (dragons/barons with icons)
│   │   └── PlayerComparisonCard (matchup stats)
│   └── EventTicker (scrolling feed of events)
│       └── EventItem (icon, description, timestamp)
├── LeaderboardPanel (collapsible, or separate tab on mobile)
│   └── StandingsTable (team, W/L, game diff, streak)
└── NotificationToast (slides in for major events)
```

---

### State Design

| State | Location | Why |
|-------|----------|-----|
| All live match summaries | React Query (initial) + WebSocket (updates) | Need both: RQ for initial load + cache, WS for real-time deltas. |
| Selected match ID | URL param `?match=123` | Shareable — "look at this match" link. |
| Detailed stats for selected match | React Query + WebSocket scoped to selected match | Subscribe only to the match being viewed. Unsubscribe on deselection. |
| Leaderboard standings | React Query with 60s polling | Standings change after matches end, not during. Polling is fine. |
| Event ticker items | Local state (ring buffer, last 100) | Stream of events, old ones are irrelevant. |
| Notification preferences | `localStorage` + Context | User chooses which notifications to see. |

**WebSocket subscription management:**
```
On mount: Subscribe to "all-matches-summary" channel
On select match: Subscribe to "match:123:detail" channel
On deselect match: Unsubscribe from "match:123:detail"
On unmount: Unsubscribe all
```

**Say:** *"I'm being deliberate about WebSocket subscriptions — subscribing to everything would flood the client. The summary channel sends minimal data (scores, status) for all matches. The detail channel sends full stats but only for the match you're looking at. This keeps bandwidth manageable."*

---

### Data Flow — Gold Diff Update Arrives

1. WebSocket receives `{ type: 'GOLD_TICK', matchId: 123, payload: { goldDiff: 2350, timestamp: '14:32' } }`
2. `useMatchSubscription(123)` hook receives the message
3. Hook appends to gold history array in state (via `useReducer`)
4. `GoldDiffCard` re-renders — only this card, not the whole dashboard (React.memo on other cards)
5. Chart appends new data point — CSS transition smoothly extends the line
6. If gold diff crosses a threshold (e.g., >5000), trigger `NotificationToast`

**Reconciliation with cached data:**
- On reconnect after a disconnection, fetch full state via React Query: `GET /api/matches/123/state`
- Replace local real-time state with fresh server state
- Resume WebSocket subscription from that point

---

### Performance

- **Selective re-renders:** Each stat card is `React.memo` wrapped. Only the card receiving new data re-renders. Parent `StatsGrid` doesn't re-render.
- **Chart rendering:** Canvas-based chart (not SVG/DOM-based like D3 or Recharts). Canvas handles thousands of data points without DOM overhead. Redraw on `requestAnimationFrame`.
- **Virtualized event ticker:** Only render visible events. New events prepend at top, old ones fall off the bottom of the virtual list.
- **WebSocket message compression:** Use `permessage-deflate` extension on the WebSocket connection. Significantly reduces payload size for JSON messages (typically 50-80% depending on content).
- **Stale-while-revalidate everywhere:** React Query serves cached leaderboard immediately, refetches in background. User never sees a loading spinner on navigation.
- **Responsive images:** Team logos as a single SVG sprite sheet. No individual image requests.

---

### Edge Cases & Degradation Strategy

**Degradation tiers (most important!):**

| Tier | Condition | User experience |
|------|-----------|-----------------|
| **Full** | WebSocket connected, all services healthy | Real-time updates, all features |
| **Degraded (WebSocket down)** | WebSocket disconnected, API healthy | Show "Live updates paused" banner. Fall back to polling API every 10 seconds. Data is slightly stale but present. |
| **Degraded (API slow)** | API response >3 seconds | Show cached data with "Last updated 30s ago" timestamp. Don't show loading spinners over existing data. |
| **Minimal (API down)** | API returning 5xx | Show last cached data with "Having trouble connecting — showing last known data" banner. Retry with exponential backoff. |
| **Offline** | No network | Service Worker serves cached app shell + last known data. All live features disabled. |

**Say to Fernando:** *"The most important architectural decision for a live event dashboard isn't the happy path — it's the degradation strategy. During Worlds, if our WebSocket servers are overwhelmed, we need the frontend to gracefully degrade to polling without the user noticing a jarring change. I'd implement this as a connection manager that automatically switches transport strategies based on connection health, and every component shows the best data it has — even if it's 30 seconds stale."*

---

## Walkthrough 4: Pick'Em Predictions App

*"Design a bracket prediction experience for an esports tournament."*

---

### Requirements

**Functional:**
- Browse tournament bracket
- Make predictions for upcoming matches (pick a winner)
- Lock predictions before match start time
- View friends' predictions
- Private group leaderboards
- Global leaderboard with percentile ranking
- Share predictions / results to social media
- Live results — see how your predictions are doing as matches play

**Non-functional:**
- Scale: 10M+ total users, 1M+ concurrent during Worlds
- Lock timing: Predictions must lock reliably before match start — no grace period exploits
- Mobile-first: Most predictions made on phones
- Engagement: Drive return visits (streaks, notifications)

---

### System Architecture

```
┌──────────┐    ┌─────┐    ┌────────┐    ┌──────────────┐    ┌──────────┐
│  Client  │───▶│ CDN │───▶│  Load  │───▶│ Predictions  │───▶│Postgres  │
│ (Browser)│    │     │    │Balancer│    │   Service    │    │(picks,   │
└──────────┘    └─────┘    └────────┘    └──────┬───────┘    │brackets) │
                                                │           └──────────┘
                                          ┌─────▼─────┐
                                          │   Redis    │
                                          │(leaderboard│
                                          │ sorted set,│
                                          │ lock cache)│
                                          └───────────┘
```

- **Predictions DB (Postgres):** `predictions` table (user_id, match_id, predicted_team_id, locked_at, correct, points). Relational — need transactions for "lock all predictions atomically before match start."
- **Lock enforcement:** A scheduled job or event-driven trigger checks `match.start_time` and flips `match.status` to `LOCKED`. The predictions service rejects any writes after lock. **Server is the authority** — the client countdown is cosmetic.
- **Leaderboard (Redis sorted sets):** After each match result, a background worker recalculates points and updates Redis sorted set via `ZADD`. `ZREVRANGE` for top N, `ZREVRANK` for a user's position, `ZSCORE` for points. This gives O(log N) reads for any leaderboard query.
- **Social features:** Friends' predictions are only queryable after *your* predictions are locked — enforced at the API layer, not just the UI. Group leaderboards are filtered sorted sets.

**Say:** *"The leaderboard is a classic Redis sorted set problem. ZADD for inserts, ZREVRANGE for the top 100, ZREVRANK for 'where am I?' — all O(log N). For 10M users, that's about 23 operations to find your rank. Postgres would need a full table scan or a materialized view for the same query."*

---

### Component Tree

```
App
├── Routes
│   ├── /pickem → BracketPage
│   │   ├── TournamentHeader (event name, dates, user's score)
│   │   ├── BracketView (visual bracket — SVG or CSS grid)
│   │   │   └── MatchNode (per match in bracket)
│   │   │       ├── TeamOption (clickable to predict)
│   │   │       ├── LockIndicator (open/locked/completed)
│   │   │       └── ResultBadge (correct ✓ / wrong ✗)
│   │   ├── PredictionSummary (sidebar — your picks, points earned)
│   │   └── LockCountdown (time until predictions lock)
│   │
│   ├── /pickem/leaderboard → LeaderboardPage
│   │   ├── TabBar (Global | Friends | My Group)
│   │   ├── MyRankCard (your rank, points, percentile)
│   │   └── LeaderboardTable (virtualized for global)
│   │       └── LeaderboardRow (rank, avatar, name, points)
│   │
│   ├── /pickem/group/:id → GroupPage
│   │   ├── GroupHeader (name, invite link)
│   │   ├── GroupLeaderboard
│   │   └── InviteButton (share link)
│   │
│   └── /pickem/share → SharePage
│       └── ShareCard (pre-formatted prediction image)
│
└── PredictionSync (background — queues + retries prediction submissions)
```

---

### State Design

| State | Location | Why |
|-------|----------|-----|
| Tournament bracket data | React Query (`['bracket', tournamentId]`) | Cacheable. Changes infrequently (only when matches complete). |
| User's predictions | React Query (`['predictions', userId]`) + optimistic mutations | Server is source of truth. Optimistic updates for snappy UX. |
| Prediction form state (unsaved picks) | Local component state | Ephemeral until submitted. Could also use `useReducer` for the bracket. |
| Selected leaderboard tab | URL param `?tab=friends` | Shareable link. |
| Lock countdown timer | `useEffect` with `setInterval` | Ticks down client-side. Server enforces actual lock time. |
| Group invite code | URL path `/group/:id` | Shareable. |
| Friends' predictions | React Query (fetched only after user has locked their own picks) | Prevents copying — you can't see friends' picks until you've submitted yours. |

**Critical: Lock timing**

The lock time is enforced **server-side**, not client-side. The client shows a countdown, but the server rejects any prediction submitted after the lock time. The client countdown is cosmetic — it shows "Predictions locked" slightly early (~5 seconds buffer) to prevent frustration from failed last-second submissions.

```
Client shows: "Locks in 0:05" → "Locked" (at T-5s)
Server accepts: predictions until T+0s exactly
```

**Say:** *"Never trust the client for timing enforcement. The lock countdown is a UX tool — the server is the authority. I'd even add a 5-second buffer on the client side so users don't submit at the last second and get a confusing rejection."*

---

### API Contract

```graphql
query GetBracket($tournamentId: ID!) {
  tournament(id: $tournamentId) {
    stages {
      name  # "Group Stage", "Quarterfinals", etc.
      matches {
        id, team1 { name, logo }, team2 { name, logo }
        status  # UPCOMING, LOCKED, IN_PROGRESS, COMPLETED
        lockTime, startTime
        result { winner, score }
      }
    }
  }
}

query GetMyPredictions($tournamentId: ID!) {
  myPredictions(tournamentId: $tournamentId) {
    matchId, predictedTeamId, correct, pointsEarned
  }
}

mutation SubmitPrediction($matchId: ID!, $teamId: ID!) {
  submitPrediction(matchId: $matchId, teamId: $teamId) {
    matchId, predictedTeamId, lockedAt
  }
}

# Batch submit — submit all picks at once
mutation SubmitPredictions($predictions: [PredictionInput!]!) {
  submitPredictions(predictions: $predictions) {
    submitted, failed { matchId, reason }
  }
}

query GetLeaderboard($scope: LeaderboardScope!, $cursor: String) {
  leaderboard(scope: $scope, after: $cursor, first: 50) {
    myRank { rank, points, percentile }
    edges {
      node { rank, user { name, avatar }, points }
    }
    pageInfo { hasNextPage, endCursor }
  }
}
```

---

### Data Flow — Making a Prediction

1. User taps a team on a MatchNode in the bracket
2. **Optimistic update:** Immediately highlight the selected team. Show a subtle "Saving..." indicator.
3. Fire `submitPrediction` mutation
4. **On success:** Update React Query cache for predictions. Show brief "Saved ✓" feedback (toast or checkmark animation). The optimistic state matches reality — no visual change.
5. **On failure:** Revert the optimistic update (unhighlight team). Show error: "Couldn't save your pick — tap to retry."
6. **Offline:** Queue the prediction in `localStorage`. Show "Saved locally — will sync when online." `PredictionSync` component uses `navigator.onLine` and `online` event to replay queued mutations when connectivity returns.

**Batch submit pattern:** Users might make many picks rapidly. Debounce and batch: if the user makes 5 picks within 2 seconds, send one `submitPredictions` mutation with all 5.

---

### Performance

- **Bracket rendering:** SVG for the bracket visualization (scales cleanly, animates well). Pre-render bracket layout at build time for known tournament structures. Only dynamic data is predictions + results.
- **Leaderboard virtualization:** Global leaderboard could be millions of rows. Only render what's visible. Show "Jump to my rank" button. Around-me view: show 25 ranks above and below the user.
- **Share card:** Generate the shareable image server-side (or using `html2canvas` client-side). Pre-format for Twitter/Discord/Instagram aspect ratios.
- **Cache tournament data aggressively:** Bracket structure doesn't change. Cache indefinitely. Results update every few hours (when matches end). Use WebSocket push or 60s polling for result updates.

---

### Edge Cases

- **Time zone handling:** Lock times displayed in user's local timezone. "Locks at 2:00 PM your time" not "2:00 PM PDT."
- **Late match start:** Match delayed but predictions already locked. Server can extend lock time — client polls for updated lock times.
- **Tiebreakers:** When users tie on points, show tiebreaker criteria (prediction confidence, time of submission, number of correct upsets). Display this in the leaderboard tooltip.
- **Engagement after elimination:** If a user's bracket is busted, they still need reasons to return. Daily predictions (predict today's matches for bonus points), per-match predictions alongside the main bracket, and "second chance" brackets keep engagement.
- **Social visibility timing:** Friends' predictions are only visible AFTER you've locked yours — prevents copying. Server enforces this, not just the UI.

**Say to Fernando:** *"The most interesting design challenge in Pick'Em is engagement after bracket death. Once a user's bracket is busted — and most brackets bust by day 3 — they need a reason to come back. I'd layer on per-match daily predictions with a separate points track. This way, even if your bracket is toast, you can still climb the leaderboard by predicting individual matches well. It's two games in one: long-term bracket + short-term daily picks."*

---

## Walkthrough 5: Search/Browse Experience for Esports Content

*"Design a search and browse experience for finding esports matches, players, teams, and articles."*

---

### Requirements

**Functional:**
- Full-text search across matches, players, teams, tournaments, articles
- Filter by: content type, date range, tournament, team, region
- Sort by: relevance, date, popularity
- Recent searches + trending searches
- Search suggestions / autocomplete
- URL-persisted search state (shareable search links)

**Non-functional:**
- Latency: Autocomplete results in <200ms
- Scale: Thousands of matches, hundreds of teams/players
- Mobile: Full-featured search on mobile
- SEO: Search result pages should be crawlable

---

### System Architecture

```
┌──────────┐    ┌─────┐    ┌────────┐    ┌──────────────┐    ┌───────────────┐
│  Client  │───▶│ CDN │───▶│  Load  │───▶│  Search API  │───▶│ Elasticsearch │
│ (Browser)│    │     │    │Balancer│    │  (Node/Go)   │    │  (full-text)  │
└──────────┘    └─────┘    └────────┘    └──────┬───────┘    └───────────────┘
                                                │                    ▲
                                          ┌─────▼─────┐    ┌────────┴───────┐
                                          │   Redis    │    │ Indexing       │
                                          │(suggestion │    │ Pipeline       │
                                          │ cache,     │    │(Kafka → index) │
                                          │ trending)  │    └────────────────┘
                                          └───────────┘
```

- **Elasticsearch:** Powers full-text search across matches, players, teams, articles. Supports fuzzy matching, relevance scoring, faceted filtering, and autocomplete via completion suggesters.
- **Indexing pipeline:** When new content is created (match completed, article published, player transferred), an event flows through Kafka to an indexing service that updates Elasticsearch. This keeps the search index eventually consistent with the source-of-truth databases.
- **Redis caching:** (1) Autocomplete suggestions cached with short TTL (~60s). (2) Trending searches computed hourly from search logs, cached in Redis. (3) Popular query results cached to reduce Elasticsearch load.
- **SSR for SEO:** Search result pages server-rendered (Next.js or similar) so Google can crawl them. The initial HTML contains the first page of results.

**Say:** *"The search architecture follows the standard pattern — Elasticsearch for the search engine, with an async indexing pipeline from the source databases. The key decision is what to index and how to weight relevance. For an esports site, I'd boost recent content, live matches, and exact name matches."*

---

### Component Tree

```
SearchPage
├── SearchHeader
│   ├── SearchInput (with debounce)
│   │   ├── ClearButton
│   │   └── VoiceSearchButton (stretch)
│   └── SearchSuggestions (dropdown — recent, trending, autocomplete)
│       └── SuggestionItem (icon + text + type badge)
├── FilterBar
│   ├── FilterChip[] (active filters shown as removable chips)
│   └── FilterDrawer (expandable — content type, date, tournament, team, region)
│       └── FilterGroup (checkbox list or date picker per filter type)
├── SortDropdown (Relevance | Date | Popularity)
├── ResultsSection
│   ├── ResultCount ("247 results for 'T1'")
│   ├── ResultTabs (All | Matches | Players | Teams | Articles)
│   └── ResultList
│       ├── MatchResult (teams, score, tournament, date)
│       ├── PlayerResult (name, team, role, headshot)
│       ├── TeamResult (name, logo, region, roster)
│       └── ArticleResult (title, excerpt, thumbnail, date)
├── Pagination (or infinite scroll with "Load more")
└── EmptyState ("No results for 'xyz'. Try adjusting your filters.")
```

---

### State Design

| State | Location | Why |
|-------|----------|-----|
| Search query | URL `?q=T1` | Shareable, bookmarkable, survives refresh. |
| Active filters | URL `?q=T1&type=match&region=LCK` | Same — all filter state in URL. |
| Sort order | URL `?sort=date` | Same. |
| Current page / cursor | URL `?page=2` or `?cursor=abc` | Same. |
| Search results | React Query keyed by full URL params | Automatic caching. Navigating back to a previous search is instant (cache hit). |
| Search suggestions | React Query with short TTL (`['suggestions', inputValue]`) | Cache recent suggestions briefly. |
| Recent searches | `localStorage` (last 10 unique queries) | Persists across sessions. |
| Filter drawer open/closed | Local state | Ephemeral UI state. |

**URL as single source of truth:**
All search state lives in the URL. Components read from URL (via `useSearchParams`) and write to URL (via `setSearchParams`). React Query uses the URL params as the query key. This means:
- Back/forward navigation works perfectly
- Sharing a URL reproduces the exact search
- React Query caches results per unique URL

```js
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('q') || '';
const type = searchParams.get('type') || 'all';
const sort = searchParams.get('sort') || 'relevance';

const { data, isLoading } = useQuery({
  queryKey: ['search', query, type, sort, page],
  queryFn: () => searchAPI({ q: query, type, sort, page }),
  enabled: query.length > 0,
  staleTime: 60_000,  // results fresh for 60s
});
```

---

### Data Flow — User Types a Search Query

1. User types "T" into SearchInput
2. **Debounce (300ms):** Don't fire API call yet
3. **Immediate:** Show recent searches containing "T" from localStorage
4. User types "T1" — debounce timer resets
5. After 300ms of no typing, fire suggestions query: `GET /api/search/suggest?q=T1`
6. Show suggestions dropdown: "T1 (Team)", "T1 vs Gen.G (Match)", "T1 Worlds 2025 (Article)"
7. User presses Enter or clicks a suggestion
8. **URL update:** `setSearchParams({ q: 'T1', type: 'all', sort: 'relevance' })`
9. URL change triggers React Query refetch: `GET /api/search?q=T1&type=all&sort=relevance&page=1`
10. Show skeleton loading state (content-shaped placeholders)
11. Results arrive → render ResultList
12. Save "T1" to recent searches in localStorage

**Key: AbortController for stale requests**
```js
const queryFn = async ({ signal }) => {
  const res = await fetch(`/api/search?${params}`, { signal });
  return res.json();
};
```
React Query automatically passes an `AbortController` signal. If the user changes the search before results arrive, the old request is aborted. No race conditions.

---

### Performance

- **Debounced search:** 300ms debounce on typing. Prevents firing API calls on every keystroke.
- **Stale-while-revalidate:** Previous search results stay visible while new ones load. No blank screen between searches.
- **Result caching:** React Query caches results by query key. Navigating back to a previous search is instant.
- **Prefetch on hover:** When user hovers over a result, prefetch the detail page data. Click feels instant.
- **Pagination vs infinite scroll:** Use pagination for SEO (each page is a distinct URL) + user mental model ("I'm on page 3 of 10"). Use infinite scroll for mobile (better touch UX). Can detect with `matchMedia` and switch strategy.
- **SSR for search pages:** Server-render the initial search results page for SEO. Google indexes search result pages.
- **Image lazy loading:** Team logos and player headshots below the fold use `loading="lazy"`.

---

### Edge Cases

- **Empty query:** Show trending searches + popular content. Don't show "No results."
- **No results:** Show helpful suggestions: "No results for 'xyz'. Did you mean 'abc'?" Check spelling. Suggest removing filters.
- **Long queries:** Truncate display, but search the full query. URL encode properly.
- **Special characters:** Escape `&`, `=`, `#` in URL params. Handle CJK characters (Korean team names, Japanese player names).
- **Filter combinations that return zero results:** Show which filters are limiting results. "247 results for 'T1' → 0 results with 'Region: LEC' filter. Remove filter?"
- **Search abuse:** Rate limit suggestions endpoint. Don't expose suggestions for abusive queries.
- **Keyboard navigation:** Arrow keys navigate suggestions dropdown. Enter selects. Escape closes dropdown. Tab moves to next UI element (not next suggestion).

**Say to Fernando:** *"The key architecture decision is making the URL the single source of truth for all search state. This means sharing a search URL gives the recipient the exact same view — same query, same filters, same sort, same page. It also means React Query can cache by URL, so hitting back from a result returns to the cached search instantly. And it's free SEO — each search URL is crawlable."*

---

## Walkthrough 6: Settings / Profile Page

*"Design a settings and profile management page for a gaming platform."*

---

### Requirements

**Functional:**
- Edit profile: display name, avatar, bio, linked social accounts
- Account settings: email, password change, MFA setup
- Notification preferences: email, push, in-app — per category
- Privacy settings: profile visibility, data sharing preferences
- Language / region preferences
- Connected accounts: Link/unlink Discord, Twitch, Google
- Danger zone: deactivate account, download data (GDPR), delete account

**Non-functional:**
- Latency: Saves should feel instant (optimistic)
- Validation: Real-time field validation
- Security: Re-authenticate before sensitive changes (password, email, MFA)
- Accessibility: Full keyboard + screen reader support
- Mobile: Fully functional on mobile

---

### System Architecture

Settings is standard CRUD — no complex backend architecture needed. Key backend considerations:

- **Same auth service** from Walkthrough 1 handles password changes, MFA setup, and session management.
- **User DB (Postgres):** Profile data, notification preferences, privacy settings — all in the users schema. Standard UPDATE operations.
- **Avatar upload:** Client uploads to a presigned S3/GCS URL (avoids routing large files through app servers). A background worker generates thumbnails (multiple sizes). CDN serves the final images.
- **GDPR data export:** Async job — hits multiple databases/services to compile user data. Queued via a job system (Sidekiq, Bull, or a message queue). Exports stored temporarily in S3, download link emailed to user. Link expires in 48 hours.
- **Account deletion:** Soft delete with 30-day grace period. Scheduled job permanently deletes after 30 days. Must cascade across all services (auth, predictions, chat history, etc.).

---

### Component Tree

```
SettingsPage
├── SettingsNav (sidebar on desktop, tabs on mobile)
│   ├── NavItem: Profile
│   ├── NavItem: Account
│   ├── NavItem: Notifications
│   ├── NavItem: Privacy
│   ├── NavItem: Connections
│   └── NavItem: Danger Zone
├── Routes (nested)
│   ├── /settings/profile → ProfileSection
│   │   ├── AvatarUploader (drag-drop, crop, preview)
│   │   ├── DisplayNameInput (with availability check)
│   │   ├── BioTextarea (character counter)
│   │   └── SaveButton (with success/error feedback)
│   ├── /settings/account → AccountSection
│   │   ├── EmailChangeForm (requires current password)
│   │   ├── PasswordChangeForm (current + new + confirm)
│   │   ├── MFASetupWizard (multi-step: choose method → scan QR → verify code)
│   │   └── ActiveSessionsList (same as auth walkthrough)
│   ├── /settings/notifications → NotificationsSection
│   │   └── NotificationGrid
│   │       └── NotificationRow (category × channel matrix of toggles)
│   ├── /settings/privacy → PrivacySection
│   │   ├── ProfileVisibilitySelect (public/friends/private)
│   │   ├── DataSharingToggles
│   │   └── CookiePreferences
│   ├── /settings/connections → ConnectionsSection
│   │   └── ConnectionCard (Discord, Twitch, Google — link/unlink)
│   └── /settings/danger → DangerZoneSection
│       ├── DeactivateAccountButton (requires confirmation modal)
│       ├── DownloadDataButton (triggers async job, emails download link)
│       └── DeleteAccountButton (requires typing "DELETE" + password)
└── UnsavedChangesGuard (prompt on navigation if form is dirty)
```

---

### State Design

| State | Location | Why |
|-------|----------|-----|
| User settings data | React Query (`['settings']`) | Single source of truth from server. |
| Form state (in-progress edits) | `react-hook-form` per section | Tracks dirty fields, validation errors, touched state. Doesn't pollute server state. |
| Notification preference matrix | React Query + optimistic toggle mutations | Toggle → optimistic update → mutate → on error: roll back. |
| Active settings tab | URL `/settings/profile` | Deep linkable. |
| Unsaved changes flag | Derived from form dirty state | `useBlocker` (React Router) prevents navigation if dirty. |
| Avatar upload state | Local state in AvatarUploader | Upload progress, preview URL, crop coordinates. |
| MFA setup wizard step | Local state or URL | If URL, user can refresh without losing progress. |

**Form pattern — save strategies:**

| Strategy | When to use | UX |
|----------|-------------|-----|
| **Auto-save (debounced)** | Notification toggles, simple preferences | Toggle flips instantly. Debounce 1s. Subtle "Saved" indicator. |
| **Explicit save button** | Profile edits, text fields | User controls when to save. Button shows dirty state ("Save changes" vs "Saved"). |
| **Multi-step with confirmation** | Password change, MFA, account deletion | Wizard flow. Confirm at the end. |

**Say:** *"I'd use different save strategies for different types of settings. Toggle-style preferences like notifications auto-save — nobody wants to flip 10 toggles and then hunt for a save button. But text fields like display name use an explicit save button because the user needs to review their changes before committing. And dangerous actions like password change use a multi-step flow with re-authentication."*

---

### API Contract

```graphql
query GetSettings {
  me {
    profile { displayName, avatar, bio }
    account { email, mfaEnabled, mfaMethod }
    notifications { category, email, push, inApp }
    privacy { profileVisibility, dataSharing }
    connections { provider, username, linked }
  }
}

mutation UpdateProfile($input: ProfileInput!) {
  updateProfile(input: $input) { displayName, avatar, bio }
}

mutation ChangeEmail($newEmail: String!, $currentPassword: String!) {
  changeEmail(newEmail: $newEmail, currentPassword: $currentPassword) {
    success, verificationSent
  }
}

mutation ChangePassword($current: String!, $new: String!) {
  changePassword(currentPassword: $current, newPassword: $new) {
    success
  }
}

mutation UpdateNotificationPreference($category: String!, $channel: String!, $enabled: Boolean!) {
  updateNotificationPreference(category: $category, channel: $channel, enabled: $enabled) {
    category, channel, enabled
  }
}

mutation UploadAvatar($file: Upload!) {
  uploadAvatar(file: $file) { url, thumbnailUrl }
}

# Async — returns job ID. Poll for completion or wait for email.
mutation RequestDataExport {
  requestDataExport { jobId, estimatedMinutes }
}

mutation DeleteAccount($confirmation: String!, $password: String!) {
  deleteAccount(confirmation: $confirmation, password: $password) {
    success, deletionDate  # 30-day grace period
  }
}
```

---

### Data Flow — Optimistic Notification Toggle

1. User toggles "Email notifications for Match Results" ON
2. **Optimistic update:** Immediately flip the toggle UI to ON
3. Fire `updateNotificationPreference` mutation
4. **On success:** Nothing visible changes — optimistic state matches server. Show subtle "Saved" text.
5. **On error:** Flip toggle back to OFF. Show toast: "Couldn't save. Tap to retry."

**Implementation with React Query:**
```js
const mutation = useMutation({
  mutationFn: updateNotificationPreference,
  onMutate: async (newPref) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['settings']);
    // Snapshot previous value
    const prev = queryClient.getQueryData(['settings']);
    // Optimistically update
    queryClient.setQueryData(['settings'], (old) => ({
      ...old,
      notifications: old.notifications.map(n =>
        n.category === newPref.category
          ? { ...n, [newPref.channel]: newPref.enabled }
          : n
      ),
    }));
    return { prev };
  },
  onError: (err, vars, context) => {
    // Roll back
    queryClient.setQueryData(['settings'], context.prev);
    toast.error('Could not save preference');
  },
});
```

---

### Performance

- **Code split each settings section:** User visiting profile settings doesn't download notification or danger zone code.
- **Avatar upload:** Compress client-side before upload (use `canvas.toBlob` to resize to max 500x500). Show upload progress bar. Preview using `URL.createObjectURL` — instant, no server round-trip for preview.
- **Display name availability check:** Debounce 500ms. Cache results for 60s. Show inline status: checking... / available ✓ / taken ✗.
- **Notification grid:** If there are many categories (10+), virtualize rows. Unlikely to be needed but worth mentioning for a gaming platform with many notification types.

---

### Edge Cases

- **Unsaved changes guard:** `useBlocker` (React Router v6.4+) or `beforeunload` event. Show "You have unsaved changes. Leave anyway?" modal. Disable for auto-save sections.
- **Concurrent edits:** If user has settings open in two tabs and changes name in one, the other tab should reflect the change. Options: React Query `refetchOnFocus`, or `BroadcastChannel`.
- **Avatar crop:** Use a library like `react-easy-crop`. Crop coordinates sent to server — server does the final crop and generates multiple sizes (thumbnail, profile, og:image).
- **Password strength:** Client-side strength meter (zxcvbn library — checks against common passwords, keyboard patterns, dictionary words). Server also validates.
- **Account deletion grace period:** 30 days to change your mind. Show a banner: "Your account is scheduled for deletion on [date]. Cancel deletion." Scheduled deletion runs as a backend cron job.
- **GDPR data export:** Async job. Could take minutes for users with years of data. Show progress, email download link when ready. Download link expires in 48 hours.
- **Re-authentication for sensitive actions:** Password change, email change, and account deletion require entering current password. MFA code required if MFA is enabled. Session token alone is not sufficient.

**Say to Fernando:** *"The interesting challenge here is handling the different save patterns cohesively. Auto-save for toggles, explicit save for text, wizard for dangerous actions — three different patterns on one page. I'd standardize the feedback mechanism: every save, regardless of pattern, uses the same toast/inline notification system. The user always knows whether their change was saved, pending, or failed, regardless of which section they're in."*

---

## Walkthrough 7: Content Management Dashboard

*"Design an internal dashboard for managing game or esports content — articles, schedules, featured content."*

This is the "design an app for viewing/managing content" scenario the recruiter described. It's a classic CRUD application with some interesting frontend challenges.

---

### Requirements

**Functional:**
- View, create, edit, and publish content (articles, match schedules, featured banners)
- Content workflow: Draft → Review → Published (with approval gates)
- Rich text editor for articles (headings, images, embeds, code blocks)
- Media library — upload and manage images/videos
- Role-based access: Editor, Reviewer, Publisher, Admin
- Content calendar — visual timeline of scheduled publications
- Preview mode — see content as it will appear on the live site
- Audit log — who changed what, when
- Bulk operations — publish/unpublish/delete multiple items

**Non-functional:**
- Latency: CRUD operations should feel instant (optimistic updates)
- Concurrent editing: Handle two editors working on the same article
- Autosave: Don't lose work — save drafts automatically
- Search: Find content quickly across hundreds/thousands of items
- Responsive: Usable on tablets (editors sometimes work from events)

---

### System Architecture

```
┌──────────┐    ┌────────┐    ┌──────────────┐    ┌──────────┐
│  Client  │───▶│  Load  │───▶│  CMS API     │───▶│ Postgres │
│ (Browser)│    │Balancer│    │  (Node/Go)   │    │(content, │
└────┬─────┘    └────────┘    └──────┬───────┘    │ users,   │
     │                               │            │ audit)   │
     │                         ┌─────▼─────┐     └──────────┘
     │                         │   Redis    │
     │                         │(session,   │     ┌──────────┐
     │                         │ locks,     │     │   S3     │
     │                         │ cache)     │     │ (media)  │
     │                         └───────────┘     └──────────┘
     │
     │    ┌──────────────┐
     └───▶│  CDN (media  │
          │  + previews) │
          └──────────────┘
```

- **CMS API:** Standard CRUD service. Handles content operations, role checks, workflow transitions. Stateless, horizontally scalable.
- **Postgres:** Content table (id, title, body_json, status, author_id, created_at, updated_at, published_at, version). Audit log table (content_id, user_id, action, diff, timestamp). Users/roles tables.
- **Redis:** (1) Distributed locks for concurrent editing — prevent two editors saving at the same time. (2) Session cache. (3) Content list cache with short TTL.
- **S3 + CDN:** Media uploads go to S3 via presigned URLs. CDN serves media. Preview builds stored as static files in S3.
- **No Kafka/WebSocket needed:** This is an internal tool with low user count. Polling or simple refetch is fine for updates.

**Say:** *"This is an internal tool — maybe 50-100 users, not millions. So I'd keep the architecture simple. No WebSocket, no message queues. Standard REST/GraphQL API with Postgres. The complexity is in the frontend: rich text editing, content workflows, and concurrent editing."*

---

### Component Tree

```
App
├── AuthProvider (role-based — Editor, Reviewer, Publisher, Admin)
├── Layout
│   ├── Sidebar
│   │   ├── NavItem: Dashboard (overview / stats)
│   │   ├── NavItem: Content (list + CRUD)
│   │   ├── NavItem: Media Library
│   │   ├── NavItem: Calendar
│   │   └── NavItem: Settings (Admin only)
│   └── MainContent (routed)
│
├── Routes
│   ├── / → DashboardPage
│   │   ├── StatsCards (published today, in review, drafts)
│   │   ├── RecentActivity (audit log feed)
│   │   └── MyDrafts (quick access to user's WIP)
│   │
│   ├── /content → ContentListPage
│   │   ├── SearchBar (full-text search)
│   │   ├── FilterBar (status, author, date, type)
│   │   ├── BulkActionBar (shown when items selected)
│   │   └── ContentTable
│   │       └── ContentRow (title, status badge, author, date, actions)
│   │
│   ├── /content/new → ContentEditorPage
│   │   ├── EditorToolbar (bold, italic, heading, image, embed)
│   │   ├── TitleInput
│   │   ├── RichTextEditor (TipTap or Slate.js — JSON-based content)
│   │   ├── MetadataPanel (sidebar — tags, category, SEO, featured image)
│   │   ├── StatusBar (Draft | "Autosaved 30s ago" | "John is also editing")
│   │   └── ActionBar
│   │       ├── SaveDraftButton
│   │       ├── SubmitForReviewButton (Editor role)
│   │       ├── PublishButton (Publisher role only)
│   │       └── PreviewButton (opens preview in new tab)
│   │
│   ├── /content/:id/edit → ContentEditorPage (same component, edit mode)
│   │
│   ├── /media → MediaLibraryPage
│   │   ├── UploadDropzone (drag-and-drop, multi-file)
│   │   ├── MediaGrid (thumbnail previews)
│   │   └── MediaDetail (sidebar — filename, dimensions, usage, delete)
│   │
│   └── /calendar → CalendarPage
│       └── CalendarGrid (month/week view with content items on scheduled dates)
│
└── Shared
    ├── RoleGate ({ role, children }) — hides UI based on user role
    ├── ConfirmModal — for destructive actions
    └── Toast — success/error feedback
```

---

### State Design

| State | Location | Why |
|-------|----------|-----|
| Content list + filters | React Query (`['content', filters]`) + URL params | Server data. URL params for shareable filtered views. |
| Content editor document | Local state (TipTap/Slate internal state) | Rich text editors manage their own state. |
| Autosave status | Local state (idle/saving/saved/error) | UI feedback only. |
| Unsaved changes flag | Derived from editor dirty state | Prevent navigation. `useBlocker` + `beforeunload`. |
| Selected items (for bulk ops) | Local state (`Set<id>`) | Ephemeral — clears on navigation. |
| Current user + role | `AuthContext` | Drives role-based UI visibility. |
| Media library selections | Local state | Ephemeral. |
| Editing lock (who's editing) | Server-side (Redis) + polled via React Query | Prevents concurrent save conflicts. |

**Content document storage:**
The rich text editor stores content as a JSON AST (not HTML). This is important because:
- JSON is easier to validate, migrate, and transform server-side
- You can render the same content to HTML (web), AMP (mobile), email, or RSS
- Version diffs are meaningful (structured data, not string diffs)

```json
{
  "type": "doc",
  "content": [
    { "type": "heading", "attrs": { "level": 1 }, "content": [{ "type": "text", "text": "Worlds 2025 Preview" }] },
    { "type": "paragraph", "content": [{ "type": "text", "text": "The biggest tournament of the year..." }] },
    { "type": "image", "attrs": { "src": "https://cdn.example.com/worlds.webp", "alt": "Worlds 2025 logo" } }
  ]
}
```

**Say:** *"I'd store content as a JSON document tree, not raw HTML. This gives us structured data we can validate, diff for version history, and render to different formats. TipTap uses ProseMirror under the hood which stores documents as exactly this kind of JSON tree."*

---

### API Contract

```graphql
query GetContentList($filter: ContentFilter, $page: Int, $limit: Int) {
  contentList(filter: $filter, page: $page, limit: $limit) {
    items {
      id, title, status, author { name, avatar }
      updatedAt, publishedAt, type
    }
    totalCount, pageCount
  }
}

query GetContent($id: ID!) {
  content(id: $id) {
    id, title, body, status, version
    author { name }, updatedAt
    metadata { tags, category, seoTitle, seoDescription, featuredImage }
    editLock { lockedBy { name }, lockedAt, expiresAt }
  }
}

mutation SaveDraft($id: ID, $input: ContentInput!) {
  saveDraft(id: $id, input: $input) {
    id, version, updatedAt
  }
}

mutation SubmitForReview($id: ID!) {
  submitForReview(id: $id) { id, status }
}

mutation Publish($id: ID!) {
  publish(id: $id) { id, status, publishedAt }
}

mutation AcquireEditLock($id: ID!) {
  acquireEditLock(id: $id) {
    success, lock { lockedBy { name }, expiresAt }
  }
}

mutation ReleaseEditLock($id: ID!) {
  releaseEditLock(id: $id) { success }
}

# Media
mutation GetUploadUrl($filename: String!, $contentType: String!) {
  getUploadUrl(filename: $filename, contentType: $contentType) {
    uploadUrl, publicUrl
  }
}
```

---

### Data Flow — Editing and Publishing an Article

**Opening the editor:**
1. User clicks "Edit" on an article
2. `AcquireEditLock` mutation fires — server checks if anyone else has the lock
3. **If locked by another user:** Show "John is currently editing. Open in read-only mode?" with option to request the lock
4. **If available:** Lock acquired (Redis key with 5-min TTL, refreshed by heartbeat). Navigate to editor
5. Load content via `GetContent` query. Populate TipTap editor

**Autosave flow:**
1. User types in the editor
2. After 5 seconds of inactivity (debounce), fire `SaveDraft` mutation with current document JSON
3. StatusBar shows "Saving..." → "Saved at 2:34 PM"
4. If save fails (network error): StatusBar shows "Save failed — retrying..." Queue retry with exponential backoff
5. **Version conflict:** If server version > client version (someone else saved), show conflict resolution UI

**Publishing flow:**
1. Editor clicks "Submit for Review" → status changes to `IN_REVIEW`
2. Reviewer sees it in their queue, reviews content
3. Reviewer clicks "Approve" → status changes to `APPROVED`
4. Publisher clicks "Publish" → status changes to `PUBLISHED`, `publishedAt` set
5. CDN cache invalidated for the content page. Content appears on the live site

**Lock heartbeat:**
```js
useEffect(() => {
  const interval = setInterval(() => {
    renewEditLock(contentId);  // Refreshes the Redis TTL
  }, 2 * 60 * 1000);  // Every 2 minutes
  
  return () => {
    clearInterval(interval);
    releaseEditLock(contentId);  // Release on unmount
  };
}, [contentId]);

// Also release on tab close
useEffect(() => {
  const handleUnload = () => releaseEditLock(contentId);
  window.addEventListener('beforeunload', handleUnload);
  return () => window.removeEventListener('beforeunload', handleUnload);
}, [contentId]);
```

---

### Performance

- **Rich text editor:** TipTap/Slate are heavy dependencies. Lazy-load the editor component — the content list page doesn't need it. `const Editor = React.lazy(() => import('./RichTextEditor'))`
- **Content table:** Server-side pagination (not loading all content at once). 25 items per page. Sort and filter server-side.
- **Media library:** Virtualized grid for large media collections. Thumbnails generated server-side (different sizes). Lazy-load images below the fold.
- **Autosave:** Debounce saves (5s after last keystroke). Only send the document if it actually changed (diff check). Send only the delta if the editor supports it (TipTap/Yjs does).
- **Preview:** Generate preview as a static page on save. Open in a new tab via a preview URL. Cache with short TTL.
- **Code split by route:** Dashboard, content list, editor, media library, and calendar are all separate chunks.

---

### Edge Cases

- **Concurrent editing:** Pessimistic locking (lock per document) is simplest for an internal tool. If you need real-time collaboration (Google Docs style), use CRDTs via Yjs + TipTap. For 50-100 users, pessimistic locking is fine.
- **Autosave + navigation:** If the user navigates away with unsaved changes, autosave fires immediately before `beforeunload`. Fallback: store latest state in `localStorage` and offer "Restore unsaved changes?" on next visit.
- **Lock expiry:** If an editor walks away and the lock expires (5-min TTL with no heartbeat), another editor can take the lock. The first editor returns and tries to save — server rejects with "Lock expired. Your changes may conflict." Show a diff and let them merge.
- **Large media uploads:** Show progress bar. Allow cancellation. Resume uploads with tus protocol for large files. Validate file type and size client-side before upload.
- **Content versioning:** Every save creates a new version. Show version history with diffs. Allow rollback to any previous version.
- **Bulk operations:** "Unpublish 50 articles" — fire as a batch mutation. Show progress bar. Handle partial failures: "47 of 50 unpublished. 3 failed (in use by homepage)."
- **Permissions in UI:** Use `RoleGate` component to hide buttons the user can't use. But **always enforce on the server** — the UI is cosmetic, the server is the authority. An Editor who inspects the DOM and finds the Publish button's mutation endpoint should still get a 403.

**Say to Fernando:** *"The interesting challenge in a CMS is balancing simplicity with power. Most content editors aren't engineers — they need a simple, forgiving interface. Autosave, undo, version history, and conflict prevention are all about making the tool safe to use. You should never lose work, and you should always be able to go back. I'd invest heavily in the autosave and versioning infrastructure because that's what earns trust from the content team."*

---

## Quick Reference: What Fernando Might Ask

If you get a question not covered above, use the framework from Part 1. Here's how to start any question:

| Question | Your opening move |
|----------|-------------------|
| "Design a login flow" | Clarify: SSO? Social login? MFA? → Walk through auth patterns |
| "Design a viewing experience for [X]" | Clarify: Live or recorded? Real-time data? → Video + stats + chat architecture |
| "Design a dashboard for [X]" | Clarify: Real-time? How many concurrent? → WebSocket/SSE + degradation strategy |
| "Design a form/wizard for [X]" | Clarify: How many steps? Validation needs? → Form state + optimistic saves |
| "Design a search for [X]" | Clarify: Full-text? Faceted? Autocomplete? → URL state + debounce + caching |
| "Design an admin panel for [X]" | Clarify: CRUD? Roles? Audit log? → Table + filters + permission model |
| "How would you make [X] performant?" | Ask about metrics → Code split + cache + virtualize + measure |
| "How would you handle [X] at scale?" | Ask about traffic patterns → CDN + caching tiers + degradation strategy |
| "Walk me through the backend" | Start with box diagram → stateless app servers, DB choice (SQL vs NoSQL), Redis caching, message queues for async |
| "How would you store this data?" | Ask about query patterns → Postgres for relational, Redis sorted sets for leaderboards, Elasticsearch for search, S3 for blobs |

**Fernando's favorite follow-ups (based on his background):**
- *"What happens under heavy load?"* → Degradation strategy, caching tiers, CDN
- *"How does the data get from the game server to the user's screen?"* → Event pipeline: game server → Kafka → processor → Redis → WebSocket → UI
- *"What about cold starts?"* → Provisioned concurrency, bundle size optimization, lazy module loading
- *"How would you test this?"* → Unit tests for components, integration tests for data flows, E2E for critical paths, load tests with k6
- *"What would you change if this needed to support 10x users?"* → More aggressive caching, edge compute, connection pooling, sharding

---

## Study Checklist

- [ ] Practice walking through each scenario out loud (time yourself — aim for 30-35 min per walkthrough with the new architecture step)
- [ ] Open Draw.io and practice drawing: **system architecture box diagrams**, component trees, data flow diagrams
- [ ] Review the framework steps until they're automatic — you shouldn't need to think about "what's next"
- [ ] Browse [lolesports.com](https://lolesports.com) and [valorantesports.com](https://valorantesports.com) — notice the UX patterns they use
- [ ] Review your existing [round-5-deep-tech.md](round-5-deep-tech.md) for the deep technical details behind these patterns (event loop, React internals, WebSocket vs SSE, caching layers, etc.)
- [ ] Practice answering Fernando's follow-up questions from the table above
