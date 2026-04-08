# Round 1: Innovative Problem Solving

**Date:** Apr 8, 2026 | **Time:** 1:00-2:00pm PDT | **Interviewer:** Alex Vejnoska

---

## Morning-of Checklist
- [ ] Practice a creative problem-solving scenario out loud
- [ ] Think through 2-3 game-related design problems
- [ ] Remember: Alex is UX-focused — blend technical and player-experience thinking

---

## Know Your Interviewer

- **Role:** Senior Manager, UX Design — Esports R&D team
- **Background:** UX, software, and product design leadership. USC grad.
- **Philosophy:** "Working for your team" rather than the other way around. Focuses on keeping teams happy, creative, and on schedule.
- **What this means for you:** Alex is a design leader, not a pure engineer. He will value user-centered thinking and player experience in your solutions. Esports references will resonate with him.

---

## What This Round Tests

Creative thinking, novel approaches, ability to reason through unfamiliar problems. Maps to **"Dare to Dream"** value. They care about your thought process more than the answer.

### What to Expect
- Open-ended problems with no single correct answer
- Possibly designing a system or feature from scratch
- Could be a real problem the team faces
- May involve constraints that rule out obvious solutions
- Given Alex's UX background, expect questions that blend technical and user experience thinking

---

## How to Approach Any Problem

1. **Clarify** — Ask questions before jumping in. "What are the constraints?" "Who is this for?" "What does success look like?"
2. **Think out loud** — Narrate your reasoning. "My first instinct is X, but that won't work because Y, so let me consider Z..."
3. **Start simple** — Propose the simplest solution first, then iterate. "The brute force approach would be... but we can optimize by..."
4. **Explore tradeoffs** — "We could do A which gives us speed but costs memory, or B which is slower but more maintainable"
5. **Connect to player impact** — Always tie back to how this affects the player experience. Alex will care about this.
6. **Be willing to pivot** — If they hint your approach has issues, don't dig in. Adapt.

---

## Things to Study

### UX Design Fundamentals

- **User-centered design process:** Empathize → Define → Ideate → Prototype → Test
  - **Empathize:** Understand who the user is and what they're struggling with. For Riot, this means thinking like a player — what frustrates them? What delights them? Example: before redesigning champion select, you'd want to know *why* players dodge (autofill, troll picks, bad comps).
  - **Define:** Turn your empathy into a clear problem statement. Not "champion select is broken" but "players dodge 15% of games because they feel trapped in a role they didn't want."
  - **Ideate:** Brainstorm many solutions without judging them yet. Wild ideas are welcome — some of the best features come from "that's crazy but what if..."
  - **Prototype:** Build the simplest version to test your idea. Could be a sketch, a wireframe, or a clickable mockup. The point is speed, not polish.
  - **Test:** Put it in front of real users and watch what happens. What confused them? What did they love? Feed this back into the loop.
  - **In the interview:** You won't do all 5 steps, but *naming* them shows Alex you think like a designer. Start any problem with "First, I'd want to understand the player's perspective..."

- **Information architecture:** How you organize and label things so users find what they need without thinking.
  - Think of it like a library — books exist, but without a catalog system, nobody finds anything. Same with apps.
  - **Card sorting:** Give users a pile of features/pages on cards, ask them to group them. Reveals how *players* think about categories (which is often different from how *engineers* organize code).
  - **Tree testing:** Give users a site map and a task ("find your match history") — can they navigate to it? If not, your structure is wrong.
  - **Riot example:** On LoLEsports.com, how do you organize content? By game? By region? By date? By team? The answer depends on what players actually look for — not what's easiest to build.

- **Interaction design patterns:** The building blocks of how users interact with your UI.
  - **Affordances:** Visual cues that tell users what something does. A button looks clickable. A slider looks draggable. If users can't tell what to do, the design failed — not the user.
  - **Feedback loops:** Every action should have a visible response. Click a button → it animates. Submit a pick → you see a confirmation. Without feedback, users click again and again, thinking it's broken.
  - **Progressive disclosure:** Don't show everything at once. Show the basics first, let users drill deeper if they want. Think of how League shows a champion's abilities — you see the icons first, hover for details, click for full numbers.
  - **Skeleton screens:** Instead of a spinner while loading, show the *shape* of the content (gray boxes where text/images will be). This feels faster even though it isn't — the user's brain starts processing the layout early. YouTube and Facebook do this.
  - **Optimistic UI:** Show the result of an action *before* the server confirms it. When you "like" a post, the heart turns red instantly — it doesn't wait 200ms for the server. If the server fails, you roll it back. Makes the app feel snappy.

- **Accessibility basics:** Designing so everyone can use your product, including people with disabilities.
  - **WCAG's 4 principles (POUR):** Perceivable (can they see/hear it?), Operable (can they use it with keyboard/screen reader?), Understandable (is it clear?), Robust (does it work across devices/assistive tech?).
  - **ARIA roles:** HTML attributes that tell screen readers what an element is. A `<div>` that acts like a button needs `role="button"` so a blind user knows they can click it.
  - **Keyboard navigation:** Every interactive element must be reachable with Tab and activatable with Enter/Space. Many gamers have motor disabilities and rely on keyboard-only navigation.
  - **Color contrast:** Text needs at least 4.5:1 contrast ratio against its background. Don't rely on color alone to convey meaning (red = bad, green = good) — use icons or labels too, since ~8% of men are colorblind.
  - **Why this matters in the interview:** Mentioning accessibility unprompted shows Alex you think beyond the "happy path" user. It's a maturity signal.

- **Mobile-first design:** Design for the smallest screen first, then scale up.
  - **Why mobile-first:** It forces you to prioritize. On a phone, you can't show everything — so you figure out what *actually* matters. Then on desktop, you have room to add nice-to-haves.
  - **Responsive vs adaptive:** Responsive = one layout that fluidly adjusts (CSS media queries, flexbox, grid). Adaptive = different layouts served for different screen sizes. Responsive is the modern standard.
  - **Touch targets:** Fingers are imprecise. Buttons need to be at least 48x48px with spacing between them. Nothing is more frustrating than tapping "Cancel" when you meant "Confirm."
  - **Thumb zones:** On a phone, the bottom-center of the screen is easiest to reach with one hand. Put primary actions there. Top corners are hardest — don't put important buttons there.
  - **Riot example:** Millions of esports fans check scores on their phones during live events. If Pick'Em is painful on mobile, they'll just stop using it.

---

### Frontend Design Patterns (UX-Relevant)

- **Component-driven design:** Building UIs from small, reusable pieces that snap together.
  - **Atomic design** is a mental model with 5 levels:
    - **Atoms:** The smallest pieces — a button, an input field, a label, an icon.
    - **Molecules:** A few atoms combined into a functional unit — a search bar (input + button), a stat card (icon + number + label).
    - **Organisms:** Groups of molecules forming a distinct section — a navigation header, a leaderboard table, a match card with teams/scores/time.
    - **Templates:** Page-level layouts with placeholder content — "the esports match page has a header organism, a live stats organism, and a chat organism arranged like this."
    - **Pages:** Templates filled with real data — the actual Worlds Finals page with real teams and scores.
  - **Design systems:** A shared library of components with consistent styling, spacing, and behavior. Riot almost certainly has one for their web properties. Mentioning this shows you think about consistency at scale.
  - **Why it matters:** When Alex asks you to design a feature, thinking in components shows you can break a big problem into manageable, reusable pieces.

- **State management for UX:** Every screen in your app has 4 states. Most developers only build the first one.
  - **Ideal state:** Everything loaded, data looks good, happy path. This is what mockups usually show.
  - **Loading state:** Data is being fetched. Show skeleton screens or spinners. *Never* show a blank screen — users will think it's broken.
  - **Error state:** Something went wrong. Don't just say "Error." Say *what* happened and *what they can do* — "Couldn't load match results. Check your connection and try again."
  - **Empty state:** No data exists yet. Don't show a blank table. Show a friendly message — "No picks yet! Make your predictions before the match starts."
  - **Optimistic updates:** When a user makes a pick in Pick'Em, show it immediately in the UI. Send the request to the server in the background. If it fails, show a gentle error and revert. The user never waits for a spinner on a simple action.

- **Animations & micro-interactions:** Motion that serves a purpose, not just decoration.
  - **Guide attention:** When new content appears, a subtle fade-in tells the user "look here." A score update that just *appears* is easy to miss — one that briefly flashes or slides in gets noticed.
  - **Show relationships:** When you expand a panel, an animation from closed→open shows the user where the content came from. Without it, content just *appears* and feels disorienting.
  - **Provide feedback:** A button that depresses on click, a toggle that slides, a checkmark that pops in after a successful save — these confirm "your action worked."
  - **CSS transitions vs JS animations:** CSS transitions are great for simple state changes (hover, open/close). JS animations (via `requestAnimationFrame`) are for complex, multi-step, or physics-based animations. CSS is cheaper on performance.
  - **Reduced motion:** Some users get motion sickness from animations. Always respect `prefers-reduced-motion` in CSS — replace animations with instant state changes. This is both an accessibility and a quality signal.

- **Real-time UI patterns:** Showing live data that changes while the user is watching.
  - **The core challenge:** Data on the server changes constantly (scores, picks, stats), but the user's screen is static until you update it.
  - **WebSockets:** A persistent connection between browser and server. Server pushes updates instantly. Best for truly real-time needs like live match scores. Downside: each user holds an open connection, which is expensive at scale.
  - **Server-Sent Events (SSE):** Like WebSockets but one-way (server → client only). Simpler, auto-reconnects, works over regular HTTP. Good for live feeds where the user just watches.
  - **Polling:** The simplest approach — check the server every N seconds. Less "real-time" but way simpler to build and scale. Good enough for leaderboards that update every 30 seconds.
  - **Handling stale data:** Always show *when* data was last updated. "Updated 5 seconds ago" builds trust. If the connection drops, show "Live updates paused — reconnecting..." instead of silently showing old data.
  - **Riot example:** During Worlds, millions of users watch live stats. You can't open a WebSocket for each one — you'd use a CDN with short TTLs, SSE for engaged users, and polling as a fallback.

- **Offline/degraded experience:** What happens when things go wrong — because they will during a live event with millions of users.
  - **Graceful degradation:** Start with the full experience, then peel away features as conditions worsen. Connection slow? Disable live chat but keep scores. Connection gone? Show cached data with a banner saying "You're offline — showing last known results."
  - **Progressive enhancement:** The opposite approach — start with the basics that work everywhere, then *add* features for capable browsers/connections. A leaderboard should work as a plain HTML table first, then get live updates and animations if the connection supports it.
  - **Service workers:** A script that sits between your app and the network. It can cache pages/data so the app loads even offline. It can queue failed requests and retry when the connection returns. Think of it as a smart proxy in the browser.
  - **The Riot scenario:** Imagine Pick'Em during Worlds finals. Millions of users. Some on spotty stadium Wi-Fi, some on 3G in another country. Your feature *must* work on a bad connection — not just a perfect one. Always design for the worst case first.

---

### Player Experience & Gaming UX

- **Gamification patterns:** Using game-like mechanics in non-game contexts to drive engagement.
  - **Progress bars:** Show users how far they've come and how far they have to go. "You've predicted 7/10 matches" is more motivating than just a list. The closer you are to completion, the more compelled you feel to finish (the "goal gradient effect").
  - **Achievement systems:** Reward specific behaviors with visible badges/icons. "Oracle: predicted 5 upsets correctly." Achievements give players secondary goals beyond the main activity and reasons to come back.
  - **Streak rewards:** "You've made picks for 5 days in a row!" Streaks create a fear of breaking the chain that keeps users returning daily. Duolingo mastered this.
  - **Social proof:** "3 of your friends also picked T1 to win." People follow what others do — especially friends. This reduces decision anxiety and makes the experience feel social even when you're alone.

- **Competitive UX:** Displaying competition in a way that motivates rather than discourages.
  - **Leaderboard design:** A global leaderboard showing rank #847,231 is demoralizing. Instead: show your rank among friends, show your percentile ("Top 12%!"), or show a local leaderboard (top 50 around your rank). Make every player feel like they're competing with peers, not with the entire world.
  - **Celebration moments:** When a player ranks up or gets a prediction right, *make it feel special.* A brief animation, a sound effect, a confetti burst. These micro-moments of joy are what players remember and share. League's rank-up animation is a great example.
  - **Rank-up animations:** Show clear progression — the badge changes, the border gets fancier, the color shifts. Visual rank identity is deeply motivating. Players screenshot their rank and share it.
  - **Softening losses:** Don't rub it in when predictions are wrong. "Close! 60% of players also got this wrong" feels better than a red X. Show what you got right alongside what you got wrong.

- **Live event UX:** Designing for the unique chaos of real-time events with huge audiences.
  - **Traffic spikes:** During Worlds, traffic can spike 10-100x normal in seconds (first blood, upset win, pentakill). The UI must handle this — CDN caching, rate limiting on non-critical updates, pre-rendering static content.
  - **Countdown timers:** Build anticipation. "Match starts in 3:42." But handle timezone differences gracefully — always show the user's local time, not PDT.
  - **Real-time bracket updates:** As matches finish, brackets update live. Use animations to show what changed — highlight the winning team moving forward. Don't just refresh the page.
  - **Spoiler prevention:** Some fans watch VODs hours later. Offer a "spoiler-free mode" that hides results until the user chooses to reveal them. This is a huge quality-of-life feature that shows you think about *all* types of viewers.

- **Social features:** Making the experience feel shared and connected.
  - **Friend activity feeds:** "Sarah just predicted Cloud9 to win" — seeing friends' activity creates conversation starters and friendly competition. Keep it lightweight, not intrusive.
  - **Party/group formation:** Let friends create Pick'Em groups with their own private leaderboard. Small groups are more engaging than global competition because you actually know the people you're competing against.
  - **Sharing results:** Make it dead simple to share predictions or results to social media/Discord. Pre-format the image/card so it looks good when shared. Every share is free marketing for the product.
  - **Spectator mode:** Let friends watch each other's live predictions or reactions. Even passive social presence ("Sarah is also watching this match") makes the experience less lonely.

- **Onboarding flows:** A player's first experience determines whether they come back.
  - **First-time user experience:** The first 60 seconds are critical. Don't dump a tutorial on them. Let them *do* something immediately — "Pick who you think wins this match" is better than "Read these 5 rules first."
  - **Progressive tutorials:** Teach one thing at a time, in context. When they encounter the leaderboard for the first time, *then* explain how scoring works. Not before.
  - **Reducing time-to-value:** How fast can a new user get to the "aha moment"? For Pick'Em, that moment is seeing your first prediction result. Make the path from signup → first pick → first result as short as possible.
  - **Don't gate content behind registration:** Let users browse predictions, see leaderboards, explore the event *before* asking them to create an account. Once they're hooked, they'll sign up willingly.

---

### Creative Problem-Solving Techniques

- **"How Might We" framing:** The single most useful technique for this interview.
  - Instead of stating problems ("players dodge champion select"), reframe them as opportunities: "How might we make champion select feel worth staying in, even when you don't get your preferred role?"
  - The format naturally invites creative thinking. "How might we..." assumes a solution exists and invites exploration.
  - **In the interview:** When Alex presents a problem, rephrase it as a "How Might We" out loud. It shows structured thinking and buys you time to think. "So if I understand correctly, the question is: how might we [restate the problem as an opportunity]?"

- **Constraint-driven thinking:** When the obvious solution is off the table, constraints become your best creative tool.
  - Example: "We can't use penalties to reduce dodging" → Now you're forced to think about *positive* incentives, UX improvements, or systemic changes. The constraint eliminated the lazy answer and pushed you toward innovation.
  - **Try "What if we couldn't...":** Take your first idea and remove it. What's left? Often the second or third idea is more creative and interesting.
  - **In the interview:** If Alex adds constraints ("assume we can't change the client"), don't panic. Say "That's actually interesting because it forces us to think about..." and use the constraint as a springboard.

- **Diverge then converge:** The two-phase creative process.
  - **Diverge (5 minutes):** Generate as many ideas as possible. No filtering, no "that won't work." Quantity over quality. Write them all down. Wild ideas are welcome — "what if we let players bet their LP on predictions?" is worth saying out loud even if it's impractical.
  - **Converge (remaining time):** Now evaluate. Which ideas are feasible? Which have the biggest player impact? Which align with Riot's values? Pick 1-2 and go deep.
  - **In the interview:** Literally say "Let me brainstorm a few ideas before diving deep on one." List 3-5 ideas quickly, then say "I think option X is most promising because... let me explore that." Alex will love seeing both breadth and depth of thinking.

- **Thinking in tradeoffs:** Every design decision has a cost. Showing you see both sides is more impressive than picking one.
  - **Common tradeoff pairs:** Speed vs. quality, simplicity vs. power, engagement vs. fairness, short-term excitement vs. long-term retention, personalization vs. privacy.
  - **How to articulate:** "We could do A, which gives us [benefit] but costs us [drawback]. Or B, which [opposite tradeoff]. I'd lean toward A because [reasoning], but it depends on [what we prioritize]."
  - **In the interview:** When you propose a solution, immediately follow up with "The tradeoff here is..." before Alex even asks. It shows you think critically, not just optimistically.

- **Second-order effects:** What happens *after* your solution ships? Think one step ahead.
  - **First-order:** "We add a role-swap feature to champion select so autofilled players can trade roles."
  - **Second-order:** "But now players might *expect* swaps and get even more frustrated when nobody swaps with them. We might also see people queuing as unpopular roles knowing they can swap."
  - **Third-order:** "So we might need to limit swaps per day, or only offer swaps when there's a willing partner, to prevent gaming the system."
  - **In the interview:** After proposing a solution, say "One thing I'd watch out for is... if we do X, players might respond by doing Y, which means we'd also need to think about Z." This is senior-level thinking and will stand out.

---

### Esports-Specific Knowledge (Alex's Domain)

- **Esports viewer experience:** What separates great esports viewing from "just watching a stream."
  - **Stats overlays:** Real-time gold difference, player KDAs, objective timers displayed on top of the broadcast. Good overlays enhance understanding without cluttering the view. Think about casual viewers vs. hardcore fans — maybe toggle-able detail levels.
  - **Multi-POV (point of view):** Let viewers choose whose perspective to watch — their favorite player's POV, a specific lane, or the broadcast view. YouTube does this for some esports. The challenge is syncing audio/commentary across POVs.
  - **Interactive predictions:** "Who will get first blood? Vote now!" Mid-match predictions keep passive viewers engaged. Show results live — "72% predicted T1" creates a shared social moment even among strangers.
  - **Second screen experience:** Many fans watch the broadcast on TV/monitor and use their phone for stats, chat, or predictions simultaneously. Design the mobile experience to *complement* viewing, not compete with it.

- **Pick'Em / fantasy systems:** Alex's team likely works on or near these products.
  - **Bracket predictions:** Users predict match winners before a tournament. Simple to understand, deeply engaging. The key is making the *act of picking* feel fun — not just a form you fill out.
  - **Scoring systems:** Points for correct predictions, bonus for upsets, multipliers for later rounds (semifinals/finals worth more). The scoring system shapes behavior — if upsets are worth more, users take more risks, which is more exciting.
  - **Tiebreakers:** When users tie on points, what breaks the tie? Prediction confidence? Time of submission? Number of correct upsets? This matters more than you'd think — friends comparing scores will argue about tiebreakers.
  - **Engagement after elimination:** If a user's bracket is busted after day 2, why do they keep playing? Solutions: partial scoring (points per correct pick, not just overall), a "second chance" bracket, daily predictions alongside the main bracket.

- **Worlds/major event UX challenges:** The Super Bowl of esports — everything must be perfect under extreme load.
  - **Multi-region:** Worlds has fans in Korea, NA, EU, China, SEA, and more. Content must be translated, times localized, and regional preferences respected (e.g., different social platforms for sharing in different regions).
  - **Multi-timezone:** A match at 2pm PDT is 6am in Korea the next day. Always show times in the user's local timezone. Offer "add to calendar" buttons. Send notifications relative to the user's timezone, not the event's.
  - **Multi-language:** Not just translating text — cultural adaptation. Humor, idioms, and references that work in English might not work in Korean or Portuguese. Layout must handle text expansion (German text is ~30% longer than English).
  - **Spoiler prevention:** Some fans can't watch live and want to watch VODs later. A "spoiler-free" toggle that hides all results, scores, and social chatter is a beloved feature. Even the *length* of a VOD can be a spoiler (short VOD = stomp), so pad all VODs to the same length.

- **Know Riot's esports products:** Spend 15 minutes browsing these before the interview.
  - **LoLEsports.com:** The hub for League of Legends esports — schedules, standings, VODs, news. Notice how they handle live vs. upcoming vs. completed matches. How's the mobile experience?
  - **ValorantEsports.com:** Same concept for Valorant. Compare the two — what's consistent, what's different, what could be better?
  - **Pick'Em:** Riot's bracket prediction game for Worlds. Look at how predictions are made, how scoring works, the social/sharing features. Think about what you'd improve — Alex might literally ask this.
  - **Having a specific opinion** like "I noticed Pick'Em doesn't show friends' picks until after you've locked in yours, which is smart because it prevents copying — but it also removes the social discussion before locking in. I wonder if there's a middle ground" will blow Alex away. It shows you've done homework *and* you think critically about UX decisions.

---

## Practice Scenarios

### 1. Matchmaking System for a Competitive Game
**Think about:** skill rating (Elo/Glicko/TrueSkill), queue times vs match quality tradeoff, fairness across party sizes, smurfing detection, regional routing, player frustration when waiting too long

### 2. Real-Time Toxic Chat Detection
**Think about:** ML inference latency budget, false positive cost (muting innocent players) vs false negative cost (toxic players slip through), context-dependent language, multi-language support, appeal systems, player trust

### 3. Deploying an Update to 100 Million Players Without Downtime
**Think about:** canary deployments, feature flags, blue-green deploys, regional rollouts, rollback strategy, client version compatibility, CDN cache invalidation

### 4. Page Load Optimization (2s -> 500ms)
**Think about:** critical rendering path analysis, code splitting, lazy loading, image optimization, CDN placement, server-side rendering, bundle analysis, Core Web Vitals

### 5. Pick'Em Experience for Worlds (Esports-specific — relevant to Alex's team)
**Think about:** millions of concurrent predictions, real-time leaderboards, social sharing, live event data feeds, graceful degradation under load, mobile-first UX

### 6. Redesign Champion Select to Reduce Dodging
**Think about:** why players dodge (autofilled, bad comps, troll picks), UX interventions (role swap UI, intent system), incentives vs penalties, data to measure success — blends UX and technical thinking

---

## Strategy

- **Don't rush to solve.** Spend 30% of time understanding the problem.
- **Show your creative side.** Riot values innovation — propose unconventional ideas even if you then refine them.
- **Connect to player impact.** "This matters because players would experience..."
- **Think about UX.** Given Alex's background, consider the user journey, not just the technical architecture.
- **Demonstrate structured thinking.** Break the problem down visibly: requirements -> constraints -> approach -> tradeoffs -> iteration.

---

## My Stories (S.A.O. Format)

Use these to answer behavioral questions about innovative problem solving. Each story is ~3 minutes to deliver. Practice transitions: "That reminds me of a time when..." or "I faced something similar when building..."

---

### Story 1: AI-Powered Invoice Pipeline
**Project:** Restaurant Dashboard | **Theme:** Unconventional solution where standard approaches fail

**Setting:** I was building a restaurant management dashboard for a multi-location owner. They receive dozens of vendor invoices (Sysco, US Foods, etc.) via email as PDF attachments. Each invoice needs to be matched to the correct store for cost tracking. The standard approach — building per-vendor parsing templates with regex — would mean maintaining dozens of brittle templates that break whenever a vendor updates their PDF layout. With 5+ vendors and frequent format changes, this wasn't sustainable.

**Action:** Instead of rule-based parsing, I used GPT-4o's vision API to extract structured data from arbitrary PDF formats in a single prompt — zero templates needed. I sent the base64-encoded PDF to the vision model with a carefully engineered prompt that handles vendor-specific SKU patterns, categorizes items (Meat, Produce, Dairy, etc.), and validates math (extended price = quantity x unit price). Then I built a fuzzy address matching system using Levenshtein distance to auto-assign invoices to the correct store. Before comparison, addresses go through a normalization pipeline — expanding abbreviations ("St" → "Street"), stripping unit numbers, standardizing formats. I designed a confidence-tiered system: >=0.85 similarity auto-assigns, 0.70-0.85 flags for human review, below 0.70 requires manual assignment.

**Outcome:** Reduced manual data entry by about 80%. The AI approach handles any vendor format without maintenance — when a new vendor starts sending invoices, it just works. The tiered confidence system balances automation with accuracy — the owner only reviews edge cases, not every invoice. The trade-off I considered was AI extraction cost (~$0.01-0.05/invoice) vs. engineering time maintaining regex templates. At their volume, the AI cost is negligible compared to the hours saved.

> **Prepared follow-ups:**
> - *What would you do differently?* Add a feedback loop — when owners correct a match, store the correction to improve future matching thresholds per vendor.
> - *Trade-offs?* Auto-assign threshold was a key decision. Too low (0.70) and you get wrong matches; too high (0.95) and too many go to manual review. I landed on 0.85 after testing against real invoices.

---

### Story 2: Real-Time Progress Streaming for Long Operations
**Project:** Restaurant Dashboard | **Theme:** Creative UX solution for a technical constraint

**Setting:** The dashboard syncs financial data from multiple external APIs — a POS analytics platform, Yelp, and email inboxes. The main sync involves 5 sequential phases across all stores and can take up to 120 seconds on Vercel's serverless platform. When the owner clicked "Sync," they'd see nothing for 2 minutes — no feedback, no progress, just a spinner. They kept clicking it again thinking it was broken. The obvious solution — polling a separate status endpoint — would add infrastructure complexity and still feel sluggish with gaps between polls.

**Action:** I built a content-negotiation pattern where the same endpoint serves either JSON or Server-Sent Events based on the request's `Accept` header. When the browser connects with `EventSource`, it receives real-time progress events showing the current phase name, percentage, and record counts. Cron jobs hit the same endpoint without the SSE header and get a simple JSON response. This meant zero code duplication — one sync function, two delivery modes. I also designed a custom worker pool that exploits JavaScript's single-threaded model — a shared index variable distributes tasks across concurrent workers without needing locks or mutexes, while maintaining result ordering. Each phase runs with configurable concurrency (3-5 workers) to balance throughput against API rate limits.

**Outcome:** Users now see live progress: "Syncing menu items (45%)... Store 3/5..." instead of staring at a spinner. The dual-mode endpoint keeps the codebase simple — same sync logic for automated cron jobs and user-triggered syncs. When I talked to the restaurant owner about what they wanted to see during sync, they said they cared about knowing *which store* was being processed, not technical details — so that's what the progress events show. It turned a frustrating 2-minute wait into an informative experience.

> **Prepared follow-ups:**
> - *What would you do differently?* At larger scale (20+ stores), I'd move to a job queue like Inngest with webhook callbacks instead of fitting everything in one serverless invocation.
> - *How did you involve others?* Talked directly to the end user about what information matters during sync — their input changed what I displayed.

---

### Story 3: Turning a Flat CMS into a Dynamic Visualization Engine
**Project:** Ryddo E-Bikes Storefront | **Theme:** Embracing constraints creatively instead of fighting them

**Setting:** I was building a headless e-commerce storefront for an electric bikes brand. The product pages needed interactive performance comparison visualizations — animated metrics like power, range, and speed overlaid on product images with pulsing wheel graphics. The challenge was that all product data lived in BigCommerce's CMS, which only supports flat key-value custom fields — no nested objects, no arrays, no rich data structures. The obvious solution was building a separate API or database for the visualization configs, but that would add infrastructure complexity and — more importantly — break the content team's workflow. They managed everything through BigCommerce's admin UI and didn't want a new tool.

**Action:** Instead of fighting the CMS limitation, I embraced it. I designed a pipe-delimited encoding scheme that packs complex visualization configs — wheel position, radius, colors with alpha channels, pulse speed, metric bar layouts, image overlay offsets — into BigCommerce custom field values. I built a 450-line data transformer that parses these encoded strings into fully typed TypeScript objects. The transformer supports two format versions simultaneously for backward compatibility, so we could migrate data gradually without breaking production. I also added intelligent image matching — the transformer matches performance metrics to the correct product image by parsing alt text descriptors, with a fallback chain: exact match, then partial match, then first image as default. Edge cases like RGBA color values (which contain commas inside a comma-delimited format) required careful defensive parsing.

**Outcome:** The content team manages all visualization data directly in BigCommerce's admin UI they already know — no new tools, no separate database, no deployment needed to update product visuals. Engineers get fully typed configuration objects with IDE autocomplete. The dual-format backward compatibility meant zero downtime during the migration. The key insight was: instead of adding infrastructure to solve a data modeling problem, I absorbed the complexity into code — which is testable, version-controlled, and doesn't add ops burden.

> **Prepared follow-ups:**
> - *What would you do differently?* I considered using a JSON string in a single custom field instead of pipe-delimited — simpler parsing, but BigCommerce has character limits on custom fields that made this risky for complex configs.
> - *Trade-offs?* Encoding complexity vs. infrastructure simplicity. Code complexity is manageable (tests, types, versioning). Infrastructure complexity is ongoing (hosting, monitoring, content team training).

---

### Story 4: Designing for Data You Can't Trust
**Project:** Restaurant Dashboard | **Theme:** Navigating ambiguity; designing for the real world

**Setting:** The dashboard aggregates financial data from delivery platforms — DoorDash, UberEats, Grubhub. I initially built a straightforward daily sync: fetch today's data, store it, done. But the restaurant owner started noticing discrepancies between my dashboard and the platform reports. After investigating, I discovered that delivery platforms retroactively adjust financial data — chargebacks, refund corrections, and fee adjustments can silently modify records days after the original transaction. A sync that only fetches "today's data" was silently accumulating errors. The owner makes real business decisions based on this data — menu changes, staffing levels — so accuracy wasn't optional.

**Action:** I redesigned the entire sync system around the assumption that data is unreliable. Every sync operation uses compound unique constraints (like `storeId + date + platform + paymentMethod`) with upsert semantics — it inserts on first sync and overwrites on re-sync. I built a 3-day lookback window that re-fetches and overwrites recent data on every sync run, catching retroactive adjustments automatically. I specifically chose upsert over "insert-ignore" because stale data is worse than slightly higher write costs. Batch transactions (groups of 50 records) provide isolation — if one batch fails due to a bad record, others still commit successfully. The whole system is idempotent: you can trigger a sync twice and get exactly the same result.

**Outcome:** Financial reports stay accurate even when platforms adjust data retroactively. The owner now trusts the numbers enough to make real business decisions from the dashboard instead of manually checking each platform's native reports. The idempotency also simplified error recovery — if a sync partially fails, you just re-run it. No cleanup, no manual fixes. The insight I took away: when you're integrating with systems you don't control, design for the data to be wrong — it will be.

> **Prepared follow-ups:**
> - *What would you do differently?* Add a changelog view so the owner can see *what* changed on re-sync — "DoorDash adjusted Tuesday's revenue by -$45 (chargeback)." This builds even more trust.
> - *How did you discover this?* Real-world debugging. The numbers didn't match. I traced it to retroactive platform adjustments that my original sync design didn't account for.

---

### Story 5: Reverse-Engineering an Undocumented API to Replace Manual CSV Exports
**Project:** Restaurant Dashboard | **Theme:** Resourcefulness; finding a better path when the obvious one is a dead end

**Setting:** The restaurant owner needed daily financial analytics from Otter, their POS and delivery aggregation platform. Otter has no public API documentation. The only way to get data out was through their web dashboard — manually clicking "Export CSV" for each store, each date range, each report type, then uploading those files somewhere for processing. For a multi-location owner checking data daily, this meant dozens of manual CSV exports per week. I initially started building CSV parsing logic, but realized this would always require a human in the loop — someone had to log in and click export. That's not a dashboard, that's a chore.

**Action:** I opened Chrome DevTools while using Otter's dashboard and watched the network requests. I discovered that their CSV export button was hitting internal REST endpoints that returned structured JSON — the CSV was just a client-side transformation. The endpoints used a flexible query language with columns, groupBy dimensions, filters, and scopes. I captured the JWT from the login response and found it worked as a Bearer token against these endpoints. From there, I reverse-engineered the query structure through trial and error — some `groupBy` combinations work for daily summaries but return 500 errors for menu items (had to discover this empirically, no docs). I also found undocumented named filters like `all_valid_orders` and `excludeFacilitiesWithDataIssues` by inspecting what Otter's own frontend sends. For auth, I built a three-tier system: a static JWT for production, an in-memory cached token with 1-hour expiration buffer, and an auto-login fallback using email/password. I even wrote a Playwright script that automates browser login to refresh the JWT (needed because Otter uses Cloudflare bot detection that blocks simple HTTP login attempts).

**Outcome:** What was a manual, daily chore became a fully automated pipeline running on a cron schedule every 6 hours. Five sync phases pull financial summaries, menu performance, modifier data, and customer ratings — all without anyone touching the Otter UI. The system syncs 3 days of lookback data on each run to catch retroactive adjustments. The reverse-engineering approach saved weeks compared to CSV parsing — no file handling, no upload workflows, no human in the loop. The key insight: when a platform doesn't offer an API, their frontend *is* the API documentation.

> **Prepared follow-ups:**
> - *What would you do differently?* This approach is inherently fragile — Otter could change their internal endpoints at any time. I'd add monitoring that alerts if the sync starts failing, and keep the CSV fallback as a manual backup. Ideally I'd push for an official API partnership.
> - *Trade-offs?* Speed of delivery vs. long-term stability. Using undocumented endpoints is a calculated risk — it works today and saves enormous time, but I built retry logic (exponential backoff on 403s) and the Playwright token refresh as guardrails.
> - *How did you handle the API quirks?* Pure trial and error. I wrote test scripts that tried different `groupBy` combinations and logged which ones returned data vs. 500 errors. Documented everything in an architecture cheat sheet so future me (or anyone) doesn't have to re-discover it.

---

## Conflict Resolution & Decision Making Stories (S.A.O. Format)

These adapt your existing stories to answer questions like "Tell me about a time you disagreed with someone," "Describe a tough decision you made," or "How do you handle pushback?" The key phrase to keep in your back pocket: **"I wanted to understand their perspective before advocating for mine."**

---

### Story 6: Advocating for an Unconventional Approach
**Project:** Restaurant Dashboard (Invoice Pipeline) | **Theme:** Navigating stakeholder skepticism when proposing a non-obvious solution

**Setting:** I was building an invoice processing system for a multi-location restaurant owner. They received dozens of vendor invoices as PDFs and needed structured data extracted for cost tracking. The owner's expectation — and the conventional approach — was to build per-vendor parsing templates using regex. It's the "safe" choice: well-understood, no external dependencies, predictable costs. But I saw a problem: with 5+ vendors who frequently change their PDF layouts, we'd be maintaining dozens of brittle templates indefinitely. I believed an AI vision-based approach was fundamentally better, but the owner was skeptical — it sounded expensive, unpredictable, and like over-engineering.

**Action:** Instead of pushing my preference, I first made sure I fully understood the owner's concerns. They cared about three things: cost, accuracy, and not being dependent on something they didn't understand. So I built my case around *their* priorities, not mine. I showed the math: AI extraction costs ~$0.01-0.05 per invoice, while engineering time to maintain regex templates would cost far more at their volume. I ran both approaches on the same set of real invoices and showed the accuracy comparison side by side. And I addressed the "black box" concern by building a confidence-tiered system — high confidence auto-assigns, medium flags for review, low requires manual input — so the owner always has visibility and control. I didn't dismiss the regex approach; I acknowledged it works well for single-vendor systems, then showed why it breaks down at their scale.

**Outcome:** The owner agreed to try the AI approach with a one-week pilot. After seeing it handle a brand-new vendor's invoices without any configuration, they were convinced. The key lesson: when you're proposing something unconventional, don't just argue that your way is better — show the other person that you understand what they value, then demonstrate how your approach serves those same values. I didn't "win" an argument; I helped the owner make an informed decision by meeting them where they were.

> **Prepared follow-ups:**
> - *What if they had said no?* I would have built the regex approach. It's their system, their money. But I would have documented the maintenance cost over time so we could revisit the decision with real data later.
> - *How do you handle disagreements in general?* I try to separate the *what* from the *who*. It's not my idea vs. their idea — it's which approach best serves the goal. I present evidence, listen to concerns, and let the best reasoning win.

---

### Story 7: Choosing the Risky Path Over the Safe One
**Project:** Restaurant Dashboard (Otter Integration) | **Theme:** Making a judgment call with incomplete information and communicating risk honestly

**Setting:** The restaurant owner needed daily financial data from Otter, their POS platform. Otter has no public API. The safe, obvious path was building CSV parsing — the owner could manually export reports and upload them. It would work, it's predictable, and there's zero risk of breaking. But it required a human in the loop every single day. I discovered through DevTools that Otter's frontend hits internal REST endpoints returning structured JSON — essentially an undocumented API. I could automate everything, but it meant depending on endpoints that could change without notice. This was a genuine tension: the reliable-but-manual path vs. the automated-but-fragile path.

**Action:** I didn't just pick the risky path and hope for the best. I laid out both options to the owner honestly, including the downsides of my preferred approach. I said: "Option A means you export CSVs every day — it always works but costs you 20 minutes daily. Option B means full automation, but Otter could break it at any time by changing their internal API." Then I explained what I'd build to mitigate the risk: a three-tier auth system with automatic JWT refresh, exponential backoff on failures, monitoring alerts if syncs start failing, and keeping the CSV parsing as a manual fallback. I was transparent that I was recommending the riskier path, and I explained *why* — the daily time savings compounded, and the mitigation layers made the risk manageable. I let the owner make the final call with full information.

**Outcome:** The owner chose automation. It's been running on a 6-hour cron schedule, syncing financial data across all stores without anyone touching the Otter UI. The lesson I took away: when you're advocating for a risky approach, don't downplay the risk — own it, show your mitigation plan, and let the decision-maker decide. People trust you more when you're honest about downsides than when you only sell the upside.

> **Prepared follow-ups:**
> - *What if it breaks tomorrow?* The monitoring alerts me, and the CSV fallback exists. I'd also re-evaluate whether to push for an official API partnership at that point.
> - *Do you tend to prefer the risky path?* Not always — I prefer the path that best serves the user's actual needs. In this case, daily manual exports was a real friction point. If the automation only saved 2 minutes a week, I'd have gone with CSV.

---

### Story 8: Siding with the User Over Engineering Assumptions
**Project:** Restaurant Dashboard (Sync Progress) | **Theme:** Resolving a tension between "technically correct" and "actually good"

**Setting:** The dashboard's data sync took up to 120 seconds across multiple API calls. From an engineering perspective, the system worked perfectly — it synced all data correctly and reliably. But the owner kept clicking the sync button multiple times, thinking it was broken, because there was no progress feedback — just a spinner for 2 minutes. When I mentioned this as a problem worth solving, my initial instinct was to dismiss it: "It works fine, the user just needs to be patient." But I caught myself — that's an engineering-centric perspective that ignores the user's actual experience.

**Action:** I decided to investigate the user's perspective before assuming I knew the answer. I talked to the restaurant owner and asked what they wanted to see during sync. Their answer surprised me — they didn't care about technical details like "fetching API page 3 of 7." They wanted to know *which store* was being processed and roughly how far along it was. That reframed the problem: it wasn't about adding a progress bar for engineering completeness, it was about giving the user the specific information that would make them trust the process. I built a Server-Sent Events system that streams phase names and store progress in real time, using a content-negotiation pattern so the same endpoint serves both interactive users (SSE) and automated cron jobs (JSON) without code duplication.

**Outcome:** The owner went from repeatedly clicking sync to calmly watching progress: "Syncing Store 3/5... menu items (45%)..." The re-clicking stopped completely. The broader lesson: "it works" and "it's good" are different things. Technical correctness doesn't mean the experience is right. When there's a gap between what engineering says and what the user does, I've learned to trust the user's behavior — it's the most honest feedback you'll get. And taking 10 minutes to *ask* the user what they actually needed saved me from building the wrong solution.

> **Prepared follow-ups:**
> - *How do you decide when user feedback should override technical judgment?* When the user is struggling with something that technically works, the UX is the bug — even if the code is correct. I always ask: "Would I be comfortable if my mom had to use this?" If not, it's worth fixing.
> - *What if the user asks for something technically impractical?* I listen first, then explain the constraint honestly and propose an alternative that addresses their underlying need. Usually they don't care about the specific solution — they care about the problem being solved.
