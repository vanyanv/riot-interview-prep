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
