## Interview Intel

Three high-signal patterns that separate good answers from great ones in Fernando's round. These aren't in the framework or the walkthroughs — they're the *language* and *depth* that impress. Read this section the morning of the interview.

---

### Data Flow Narrative

When Fernando asks *"how does data get from your API to the screen?"*, he's not fishing for "we use fetch." He wants a narrative that shows you understand the full chain of responsibility — fetching strategy, component boundaries, and the four render states.

**The strong answer walks five layers:**

1. **Fetching strategy** — React Query (or SWR, or Apollo) for server state, with stale-while-revalidate so cached data shows instantly while fresh data loads in the background. Request deduplication and background refresh are free wins you don't reinvent.

2. **Component boundaries** — a *container* component owns the data fetch and owns the loading/error state. *Presentational* components take data as props and stay pure. That split makes presentational components trivially reusable and testable with mock props, and means any loading/error/empty handling lives in exactly one place.

3. **Loading state** — skeleton screens, not spinners. Skeletons preserve layout so the page doesn't jump when real data arrives. The eye stays anchored where it was, and perceived load time drops.

4. **Error state** — a meaningful message with a retry action, not "Something went wrong." Log to observability so on-call can see it before the user reports it.

5. **Empty state** — a friendly CTA, not a blank screen. Empty is a legitimate state, not an accident.

**Say:** *"I'd pull server state into a React Query hook at the route level, pass it down to presentational components as props, and handle loading, error, empty, and success as four distinct render branches. The goal is that if any stage breaks, the user sees something useful — never a white screen, never a frozen spinner."*

**Player-first close:** *"The four-state discipline means a player opening the match page during Worlds always sees the app responding — even if our stats pipeline is throwing errors, they get a retry button, not a dead screen."*

---

### Auth Deep Dive

"Design a login" is never about the `POST /auth/login`. It's about everything that happens *after* you get the token — and Fernando will probe on token storage, mid-session expiry, and the security tradeoffs between localStorage and HttpOnly cookies.

**What Fernando probes and what the impressive answer is:**

1. **Where does the token live?** → `HttpOnly` `Secure` `SameSite=Lax` cookies, **not** `localStorage`. XSS can read `localStorage`; JavaScript literally cannot read an `HttpOnly` cookie. Even a compromised third-party script on your page cannot exfiltrate a properly-configured session cookie.

2. **What happens when the token expires mid-session?** → The **JWT + silent refresh** pattern. Two tokens:
   - **Access token** — short-lived (15 min). Sent on every request via cookie. Expires fast so the blast radius of a theft is minimized.
   - **Refresh token** — longer-lived (7-30 days). Stored in a separate HttpOnly cookie. Only ever sent to `/auth/refresh`.

   A fetch interceptor watches for `401 Unauthorized`. On 401, it calls `/auth/refresh`, gets a new access token, then retries the original request. **The user never sees their session die mid-action.** They stay on the page, the UI doesn't flicker, nothing is lost. If refresh also fails, *then* they're kicked to login.

3. **The localStorage vs HttpOnly tradeoff** — this is a tradeoff question, not a right-answer question, and Fernando wants to hear you reason about it:
   - **localStorage:** XSS-vulnerable (any compromised script can read it), but CSRF-proof (you have to explicitly attach it to requests).
   - **HttpOnly cookies:** XSS-proof (JS can't read them), but CSRF-exposed (browsers send them automatically). Defense: `SameSite=Lax` blocks most cross-site POSTs, plus a **double-submit CSRF token** on state-changing requests.
   - **Industry consensus:** in a browser context, XSS is the higher-frequency threat, so `HttpOnly + CSRF defense` wins over `localStorage`. The JWT + silent refresh pattern sits on top of the HttpOnly foundation.

**Say:** *"I'd store tokens in HttpOnly Secure SameSite=Lax cookies — a short-lived access token and a longer-lived refresh token. A fetch interceptor handles 401s transparently: it calls `/auth/refresh`, retries the original request, and only redirects to login if refresh also fails. The user never sees their session die mid-action."*

**Player-first close:** *"The silent refresh means a player who queued for a match and then left the page open for an hour can come back and click around without getting punted to a login screen. Their session recovers silently. That's a trust win every single time it works."*

---

### Player-First Framing

The language Riot's interviewers respond to: **every technical decision justified in terms of player experience**, not in terms of engineering elegance. Fernando doesn't need convincing that code splitting is good — he needs to see that you think about *why* it matters to a player holding a phone on mobile data during Worlds.

**The rule of thumb:** start with the technical reason, then finish the sentence with *"…which means for the player, [X]."* Every design decision can be reframed this way.

**Translation table — engineer-speak → player-first:**

| You could say… | Say this instead |
|---|---|
| "Skeleton screens avoid layout shift." | "Skeletons preserve layout so the match card doesn't jump when stats arrive — the player's eye stays where they were looking instead of hunting for the score again." |
| "We debounce search input 300 ms." | "300 ms of debounce so searching a pro's name during Worlds feels instant for a fast typist — no stutter storm, the card just pops up." |
| "React Query gives us stale-while-revalidate." | "Cached match data shows the moment a player opens the page; fresh data syncs in the background. Perceived load time is zero." |
| "We batch WebSocket updates at 60fps." | "Gold diff can fire 100 times per second during a teamfight. Batching at 60fps means the chart stays smooth instead of stuttering and yanking the player out of the moment." |
| "Code splitting by route." | "A player opening the team page downloads 80 KB, not 800 KB. On mobile data during a tournament, that's the difference between 'it loaded' and 'forget it.'" |
| "HttpOnly cookies prevent XSS token theft." | "If a third-party script on our page is ever compromised, a player's session can't be stolen. Their account stays theirs — full stop." |
| "We virtualize the chat list." | "Twitch-style chat at 10k users scrolls at 60fps on a mid-range phone instead of locking up. Players can actually participate in the hype instead of watching their battery die." |
| "Cursor pagination for the live leaderboard." | "Rankings stay stable while the leaderboard updates mid-match. A player watching rank 47 doesn't see them suddenly 'jump' to rank 51 because two other players were inserted above — they only move when they actually lose ground." |

**The one-sentence formula:**

> *"The reason I picked [technique] is that it [player-experience outcome]. The technical win is the side effect."*

**Say:** *"Whenever I make a design call in this interview, I want to close the loop back to the player. Code-splitting isn't there because it's elegant — it's there because a player on 4G in Rio shouldn't wait six seconds to see the bracket. Every decision I make, I'm asking: what does this feel like when you're the one holding the phone?"*

**The meta-signal:** when you frame every technical choice this way, Fernando isn't just hearing "this candidate knows the tech." He's hearing "this candidate thinks like someone we'd trust with a feature that touches 100 million players." That's the gap between good and great.
