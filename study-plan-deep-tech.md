# 3-Day Study Plan: Deep Tech Round

**Interview:** Sunday Apr 13, 2:00-3:00pm PDT | **Interviewer:** Fernando Micalli
**Format:** Frontend-leaning system design — "how to design applications" (login flows, viewing an app, etc.)
**Tools:** Have [Draw.io](https://app.diagrams.net/) open during the interview

---

## Day 1: Thursday Apr 10 — Foundation + Framework

**Goal:** Internalize the 8-step framework and the core deep tech topics so you can recall them without notes.

---

### Block 1: The Framework (2 hours)

Read through **Part 1** of `frontend-system-design-prep.md` (Steps 1-8). Don't just read — after each step, close the doc and explain it out loud from memory.

**After reading, test yourself:**

- [ ] Can you list all 8 steps in order without looking?
- [ ] Can you explain what each step covers in one sentence?
- [ ] Do you know the time budget for each step? (should total ~35 min)

**Write the 8 steps on a sticky note and put it on your monitor:**
1. Requirements (3-5 min)
2. High-level architecture (5-7 min)
3. Components (5-7 min)
4. State design (5-7 min)
5. API contract (3-5 min)
6. Data flow walkthrough (3-5 min)
7. Performance & scale (3-5 min)
8. Edge cases (2-3 min)

---

### Block 2: Practice Walkthrough 1 — Login/Auth (1 hour)

Set a **40-minute timer**. Open Draw.io. Pretend Fernando just asked:

> *"Design the login experience for a gaming platform."*

Walk through it out loud using the 8-step framework. Draw diagrams as you go. Don't look at your notes — this is a test of what you've absorbed.

**After the timer:** Open the Login/Auth walkthrough in `frontend-system-design-prep.md` and compare. Note what you missed.

**Key points you MUST hit (check yourself):**
- [ ] HttpOnly cookies for auth tokens (not localStorage) — explain why
- [ ] PKCE flow for SPA OAuth — explain why a public client can't keep secrets
- [ ] Token refresh flow with request queue
- [ ] SSO across Riot properties via shared auth domain
- [ ] Multi-tab logout via `BroadcastChannel` or `storage` event
- [ ] Rate limiting on login endpoint + how frontend handles 429s

---

### Block 3: Deep Tech Fundamentals (1 hour)

Study these three sections in `round-5-deep-tech.md`. Read each one, then immediately explain it out loud without looking:

**1. Browser Rendering Pipeline (20 min)**
Read the section, then answer out loud:
- What are the 5 stages? (DOM -> CSSOM -> Render tree -> Layout -> Paint -> Composite)
- Why does `<script>` block parsing?
- What's layout thrashing and how do you avoid it?
- How do `transform` and `opacity` animations avoid reflow?

**2. Event Loop (20 min)**
Read the section, then answer out loud:
- Microtasks vs macrotasks — which drains first?
- What does `requestAnimationFrame` do and when does it fire?
- What's a long task and why does it matter for INP?
- What's `IntersectionObserver` and why is it better than scroll events?

**3. React Fiber (20 min)**
Read the section, then answer out loud:
- What problem did Fiber solve? (old reconciler was synchronous, couldn't be interrupted)
- What's in a fiber node?
- How does diffing achieve O(n) instead of O(n^3)?
- Why do keys matter in lists?
- What does `startTransition` do?

---

### Block 4: Quick-Fire Verbal Drills (30 min)

Set a **2-minute timer** for each. Explain out loud as if Fernando asked. No notes.

1. "What's the difference between `display: none` and `visibility: hidden`?"
2. "How does React's reconciliation algorithm work?"
3. "What is a closure? Give me an example."
4. "Explain the difference between `Promise.all` and `Promise.allSettled`."
5. "What's the critical rendering path and how do you optimize it?"
6. "What are Core Web Vitals? Name them and their targets."
7. "What's the difference between `var`, `let`, and `const`?"
8. "How does prototypal inheritance work in JavaScript?"
9. "What does `this` refer to in JavaScript? How is it determined?"
10. "What's tree shaking and why does it require ES modules?"

**Grade yourself:** If you stumbled on any, put a star next to it — revisit tomorrow.

---

### Day 1 Total: ~4.5 hours

---

## Day 2: Friday Apr 11 — Deep Dives + Practice

**Goal:** Master Fernando's specialty topics (Node.js, GraphQL, Serverless) and do another timed walkthrough.

---

### Block 1: Node.js Internals — Fernando's Specialty (1.5 hours)

These are the topics Fernando is most likely to go deep on. Study in `round-5-deep-tech.md`:

**1. Node.js Event Loop (30 min)**
- Learn the 6 phases: Timers -> Pending -> Idle/Prepare -> Poll -> Check -> Close
- Understand where `process.nextTick()` fits (between phases, can starve I/O)
- Know the `setTimeout(0)` vs `setImmediate()` answer — inside I/O callback, `setImmediate` fires first

**Verbal drill:** Explain the Node.js event loop phases as if drawing on a whiteboard. Include where microtasks and `process.nextTick` fit.

**2. Process Load Balancing (20 min) — Fernando gave a talk on this!**
- Cluster module: round-robin, no shared state, fork workers per CPU
- Nginx reverse proxy: least-connections, SSL termination, better observability
- iptables: kernel-level DNAT, fastest but worst DX
- Know the tradeoff spectrum: iptables (fastest) -> Nginx (balanced) -> Cluster (easiest)

**Verbal drill:** "Walk me through Node.js process load balancing strategies." — Do this one twice. Fernando literally gave a BrazilJS talk on this.

**3. Streams & Backpressure (20 min)**
- Readable, Writable, Transform, Duplex
- Backpressure: when `write()` returns `false`, stop reading, wait for `drain`
- `pipeline()` over `.pipe()` — handles errors and cleanup

**4. Worker Threads vs Child Processes (10 min)**
- Worker threads: shared memory via `SharedArrayBuffer`, lighter, same process
- Child processes: separate V8, IPC communication, better isolation

**5. Memory Management & V8 GC (10 min)**
- Young generation (Scavenge — fast, frequent) vs old generation (Mark-Sweep-Compact)
- Common leaks: event listener accumulation, closures, unbounded caches, forgotten timers
- Profiling: `--inspect` + Chrome DevTools heap snapshots

---

### Block 2: GraphQL, Serverless & Networking (1.5 hours)

**1. GraphQL (30 min)**
- Schema, Resolvers, DataLoader (N+1 problem)
- GraphQL vs REST tradeoffs (know when to use each)
- Subscriptions for real-time data

**Verbal drill:** "Why would you choose GraphQL over REST for an esports API?"

**2. Serverless / Lambda (20 min)**
- Cold starts: causes, mitigation (provisioned concurrency, smaller bundles, keep-warm)
- Connection pooling with RDS Proxy
- Fan-out pattern, Step Functions
- Lambda optimization: memory/CPU tradeoff, bundle size

**Verbal drill:** "How would you handle cold starts in a serverless architecture during a live event?"

**3. HTTP/1.1 vs HTTP/2 vs HTTP/3 (15 min)**
- Key difference: HTTP/2 multiplexes over TCP (still has TCP head-of-line blocking), HTTP/3 uses QUIC (UDP-based, per-stream flow control)
- QUIC: 0-1 RTT connection setup, survives network changes

**4. WebSockets vs SSE vs Long Polling (10 min)**
- WebSocket: bidirectional, own protocol, manual reconnect
- SSE: server->client only, HTTP, auto-reconnect built in
- Long polling: fallback, repeated HTTP requests

**5. Caching Layers (15 min)**
- Browser cache (Cache-Control, ETag), Service Worker, CDN, Redis, eviction policies
- Cache stampede prevention: lock/mutex, early refresh, stale-while-revalidate

**6. Auth: OAuth 2.0, JWT, Sessions, CORS, CSRF (10 min)**
- PKCE for SPAs, JWT tradeoffs, SameSite cookies for CSRF

---

### Block 3: Practice Walkthrough — Match Viewing or Dashboard (1 hour)

Pick one you haven't practiced yet. Set a **40-minute timer**. Open Draw.io.

**Option A — Match Viewing:**
> *"Design an application for viewing esports matches — live and VODs."*

**Option B — Real-Time Dashboard:**
> *"Design a real-time dashboard showing live esports stats and leaderboards."*

Walk through it out loud. Draw diagrams. Don't look at notes.

After the timer: compare with the walkthrough in `frontend-system-design-prep.md`. Note gaps.

**Key things Fernando will care about in a real-time design:**
- [ ] WebSocket vs SSE decision and why
- [ ] Batching UI updates with `requestAnimationFrame` (don't re-render every message)
- [ ] Graceful degradation tiers (WebSocket down -> polling -> cached data -> offline)
- [ ] CDN strategy for different data types (static vs semi-static vs live)
- [ ] Connection management at scale (subscription tiers, not subscribing to everything)

---

### Block 4: "What happens when you type a URL" (30 min)

This is the most classic deep tech question. Practice it end-to-end out loud:

1. **DNS:** Browser cache -> OS cache -> recursive resolver -> root -> TLD -> authoritative
2. **TCP:** 3-way handshake (SYN, SYN-ACK, ACK)
3. **TLS:** 1.3 handshake (1 RTT), key exchange, certificate verification
4. **HTTP:** Request (GET, headers), response (status, headers, body). Mention HTTP/2 multiplexing.
5. **Parsing:** HTML parser builds DOM incrementally (preload scanner!), CSS -> CSSOM, JS blocks parsing unless async/defer
6. **Rendering:** DOM + CSSOM -> Render tree -> Layout -> Paint -> Composite
7. **Optimizations at each layer:** Brotli compression, critical CSS, code splitting, lazy loading, service workers

**Target:** Be able to walk through this in 5-7 minutes, going deep at each layer.

---

### Day 2 Total: ~4.5 hours

---

## Day 3: Saturday Apr 12 — Mock Interview + Polish

**Goal:** Simulate the real interview, fill gaps, and build confidence.

---

### Block 1: Cold Mock Interview (1 hour)

This is your dress rehearsal. Set a **45-minute timer**. Open Draw.io. No notes allowed.

**Pick ONE of these prompts (randomly, don't cherry-pick):**

1. *"Design a Pick'Em predictions app for an esports tournament."* (Walkthrough 4)
2. *"Design a content management dashboard for managing game content."* (Walkthrough 5 — new)
3. *"Design a chat application for a gaming community."* (no walkthrough — tests your framework)

If you picked #3, use the 8-step framework from memory. This tests whether you can apply the framework to an unfamiliar problem.

**After:** Grade yourself:
- [ ] Did I clarify requirements before designing? (Step 1)
- [ ] Did I draw a high-level architecture diagram? (Step 2)
- [ ] Did I break down the component tree? (Step 3)
- [ ] Did I explain where state lives and why? (Step 4)
- [ ] Did I define the API contract? (Step 5)
- [ ] Did I walk through a critical data flow end-to-end? (Step 6)
- [ ] Did I discuss performance at scale? (Step 7)
- [ ] Did I cover edge cases and error handling? (Step 8)
- [ ] Did I stay within the time budget?
- [ ] Did I use Draw.io effectively?

---

### Block 2: Review Weak Spots (1 hour)

Go back to anything you starred on Day 1 or struggled with on Day 2. Focus on:

- Topics where you couldn't explain without notes
- Walkthrough sections you missed
- Concepts you understand but can't articulate clearly

**Common weak spots to double-check:**
- [ ] Can you explain backpressure in Node.js streams?
- [ ] Can you draw the Node.js event loop phases from memory?
- [ ] Can you explain the N+1 problem in GraphQL and how DataLoader solves it?
- [ ] Can you explain why QUIC was created? (TCP head-of-line blocking)
- [ ] Can you explain cache stampede and 3 prevention strategies?

---

### Block 3: JS/TS Deep Knowledge + Practice Questions (1 hour)

**30 min: Review JS/TS section in `round-5-deep-tech.md`**
- Closures, prototypal inheritance, `this` binding
- Promise internals (microtask-based), `Promise.all` vs `allSettled` vs `race` vs `any`
- TypeScript: generics, conditional types, mapped types, type narrowing
- WeakMap/WeakSet, Proxy/Reflect, module systems (CJS vs ESM)

**30 min: Outline answers to all 10 practice questions**

Go through the 10 practice questions at the bottom of `round-5-deep-tech.md`. For each one, write a 3-5 bullet point outline of your answer. Don't write full sentences — just key points you'd hit.

1. What happens when you type a URL...
2. Design a rate limiter
3. React Fiber architecture
4. Node.js process load balancing (Fernando's talk!)
5. GraphQL API for massive traffic spikes
6. Node.js event loop phases
7. Browser/V8 garbage collection
8. Debug a web performance issue
9. HTTP/2 vs HTTP/3 / QUIC
10. Cold starts in serverless

---

### Block 4: Browse lolesports.com (30 min)

Open [lolesports.com](https://lolesports.com) and explore. Fernando built this. Understanding the product helps you ground your answers in his reality.

**Look for:**
- How the schedule/bracket is structured (tournaments > stages > matches)
- What the live match viewing experience looks like
- How VODs are organized
- The data model: teams, players, matches, tournaments, leagues
- Any GraphQL requests in DevTools Network tab (filter by "graphql")

**Take notes on anything you notice** — mentioning specific features of lolesports.com in the interview shows you've done homework.

---

### Block 5: Review Practice Questions Out Loud (30 min)

Pick **3 of the 10 practice questions** and answer them out loud with a 5-minute timer each. Prioritize:
- #4: Node.js load balancing (Fernando's talk topic)
- #5: GraphQL API at scale (Fernando's actual project)
- #6: Node.js event loop (Fernando's expertise)

---

### Day 3 Total: ~4 hours

---

## Sunday Apr 13 — Morning-of Checklist

**2-3 hours before the interview:**

- [ ] Review your sticky note with the 8 steps
- [ ] Re-read the **Strategy** section at the bottom of `round-5-deep-tech.md` (4 key principles)
- [ ] Quick verbal drill: explain the Node.js event loop in 3 minutes
- [ ] Quick verbal drill: explain React Fiber in 2 minutes
- [ ] Quick verbal drill: "What happens when you type a URL" in 5 minutes
- [ ] Open Draw.io and draw one quick architecture diagram to warm up
- [ ] Open lolesports.com in a tab for quick reference

**30 minutes before:**
- [ ] Close everything except the Google Meet link, Draw.io, and a blank notes doc
- [ ] Deep breath — you've prepared thoroughly
- [ ] Remember: Fernando wants to see you **think out loud** and **go deep**
- [ ] If you don't know something, say so honestly and reason through it
- [ ] Start every answer by clarifying requirements — don't jump to the solution

**Remember Fernando:**
- Principal Engineer, Esports Platform
- Built the Esports API: GraphQL + Serverless (Lambda) + Node.js
- BrazilJS 2015 talk on Node.js process load balancing
- 15 years at UOL scaling to 1.5M simultaneous users
- Cares about: performance at scale, deep technical understanding, honest reasoning

**Your superpower:** You have a systematic 8-step framework. Most candidates ramble. You'll be structured, thorough, and go deep at each layer. That's what impresses a Principal Engineer.

---

## Quick Reference: What the Recruiter Said

> "The interview will cover how to design applications — things like login flows, viewing an app."

This maps directly to:
- **Walkthrough 1:** Login/Auth system
- **Walkthrough 2:** Match viewing app
- **Walkthrough 5:** Content management dashboard (viewing/managing an app)
- **The 8-step framework** works for any "design an application" question
