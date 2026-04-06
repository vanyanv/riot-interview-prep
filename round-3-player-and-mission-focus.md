# Round 3: Player and Mission Focus

**Date:** Apr 10, 2026 | **Time:** 2:00-3:00pm PDT | **Interviewer:** Teresa Triliegi

---

## Morning-of Checklist
- [ ] Review your STAR/SAO stories
- [ ] Review Riot's 5 core values one more time
- [ ] Prepare your "Why Riot?" answer
- [ ] Remember: Teresa is HR tech — keep stories relatable, focus on outcomes and people

---

## Know Your Interviewer

- **Role:** Director, People Technology and Systems (previously Director, HRIS & HR Operations)
- **Background:** Deep HRIS/HR technology career. Progressed from Analyst -> Manager -> Director across Sutter Health, The Cheesecake Factory, and Riot.
- **What this means for you:** Teresa is not an engineer — she leads HR technology. She will evaluate whether you genuinely care about end users and align with Riot's mission. Keep stories relatable and focused on outcomes and people, not technical heroics. Her own career shows steady growth from analyst to director — she likely values dedication and continuous improvement.

---

## What This Round Tests

Alignment with **"Player Experience First"** and **"Execute with Excellence"**. Do you genuinely care about end users? Do you make decisions with the player in mind?

---

## Behavioral Interview Framework

Riot uses **S.A.O. (Setting, Action, Outcome)** — their version of STAR. Same structure, different naming.

**Template for each story:**
- **Setting** (15%): Brief context — what was the situation, who was involved
- **Action** (60%): What specifically did YOU do, step by step
- **Outcome** (25%): What happened, what was the measurable impact, what did you learn

---

## STAR/SAO Stories to Prepare (have 3-4 ready)

### Theme 1: Advocating for the user when it wasn't popular
- A time you pushed back on a feature/decision because it would hurt the user experience
- How you gathered user feedback to influence a technical decision

**Example story outline (adapt with your own experience):**
- **Setting:** Your team is building a new checkout flow for an e-commerce platform. Product management wants to add three upsell modals before order confirmation to boost average order value. The deadline is two weeks out. You notice the mockups feel pushy and will slow users down.
- **Action:** You pull session-replay data showing that users already abandon at a rate of 40% on the current checkout. You put together a short summary — no jargon, just screenshots and the abandonment numbers — and present it in the next sprint planning meeting. You propose a compromise: one non-blocking upsell banner instead of three modals, A/B tested against the original plan. When the PM pushes back, you stay calm and frame it around revenue risk: "If we increase abandonment by even 5%, the upsell revenue won't offset what we lose."
- **Outcome:** The team agrees to A/B test both versions. The single-banner version converts 12% better overall because fewer users drop out. Product management adopts the lighter approach, and you establish a precedent for data-backed UX decisions on your team.

**What Teresa is listening for:**
- **Genuine empathy** — did you actually care about the users, or were you just being contrarian?
- **How you handle disagreement** — did you stay respectful and collaborative, or did you make it adversarial?
- **Evidence over opinion** — did you bring data or user feedback, not just personal preference?
- **Outcome for the user** — did the user actually end up better off because of your advocacy?

**Red flags to avoid:**
- **Making yourself the hero and everyone else the villain.** "The PM was totally wrong and I had to save the project" sounds arrogant. Frame it as a team arriving at a better outcome together.
- **Being vague about what you actually did.** "I raised concerns" is not enough. Teresa wants to hear the specific steps you took.
- **No measurable outcome.** If you cannot point to a result — even a qualitative one like improved user feedback — the story feels unfinished.
- **Sounding like you always know better.** Healthy pushback is good. Being the person who fights every decision is not.

**Phrases that work well:**
- "I noticed something that didn't feel right from the user's perspective, so I dug into the data to see if my instinct was correct."
- "I wanted to make sure we weren't optimizing for one metric at the expense of the overall experience."
- "I framed it around what we'd lose, not just what I thought was wrong — that made it easier for the team to hear."
- "In the end, the team made the call together. I just made sure the user's perspective was part of the conversation."

---

### Theme 2: Going beyond requirements for the user
- A time you noticed something wasn't great for users and fixed it without being asked
- Building something that wasn't in the spec because users needed it

**Example story outline (adapt with your own experience):**
- **Setting:** You are working on a web dashboard for internal users (or external customers). The spec calls for a data table with filtering. During development, you notice that when the table has more than a few hundred rows, the page becomes sluggish and the loading spinner gives users no sense of progress. Nobody filed a bug about it because the test data set was small, but you know real users will have thousands of rows.
- **Action:** You bring it up in standup — "I think this is going to be a problem in production." You spend an afternoon implementing virtualized rendering so only visible rows are in the DOM, and you replace the generic spinner with a skeleton loader that shows the table shape while data loads. You also add a small toast message: "Loaded 2,340 records" so users know the load is complete. None of this was in the ticket.
- **Outcome:** After launch, support tickets related to "the page is frozen" drop to near zero. A user in the feedback channel writes "the new dashboard feels so much faster." Your tech lead starts using your approach as a pattern for other data-heavy pages.

**What Teresa is listening for:**
- **Proactive ownership** — you saw a problem before users complained and took initiative
- **User awareness** — you were thinking about the real-world usage, not just the spec on paper
- **Good judgment** — you didn't go rogue for a month; it was a proportional effort that added clear value
- **Communication** — you told your team what you were doing and why, rather than silently going off-script

**Red flags to avoid:**
- **Scope creep disguised as user advocacy.** If your "going beyond" story is really about spending three weeks on something nobody asked for while your main work slipped, that is a negative signal. Keep the story proportional.
- **Not explaining why you did it.** "I just like making things nice" is not compelling. Connect it to a user problem you observed.
- **Taking credit for a team effort.** If others helped, say so. Teresa will notice if you only use "I" for wins and "we" for problems.

**Phrases that work well:**
- "It wasn't in the ticket, but I could see it was going to be a real pain point once actual users hit it."
- "I kept the scope small — about half a day of work — because I wanted to make sure it didn't slow down the main deliverable."
- "I flagged it with my lead first so we were aligned, then went ahead and built it."
- "The feedback we got afterward confirmed it was the right call."

---

### Theme 3: Using data to improve player/user experience
- A time you used metrics, A/B tests, or user research to make a decision
- How you measured whether a change actually helped users

**Example story outline (adapt with your own experience):**
- **Setting:** Your team launches a redesigned navigation for a web app. The design looks cleaner, but after launch you notice that engagement with a key feature (for example, a settings page or a search tool) drops by 15%. The design team is confident the new layout is better. You are not so sure.
- **Action:** You set up event tracking on the navigation items to see exactly where users click and where they drop off. You run a usability session with five users (or review session replays if you don't have access to live users). You discover that the feature link moved from a top-level menu item to a nested dropdown, and most users simply cannot find it anymore. You compile a one-page summary with a heatmap screenshot, the engagement numbers, and a proposed fix: move the link back to the top level but keep the new visual design. You present it to the design lead and PM.
- **Outcome:** The team ships the fix within a week. Engagement with that feature recovers and actually exceeds the old baseline by 8%, because the new visual design is genuinely better — the problem was only the navigation placement. You establish a team norm of checking key engagement metrics for 72 hours after any navigation change.

**What Teresa is listening for:**
- **Curiosity** — did you notice the problem and want to understand it, rather than shrugging it off?
- **Rigor** — did you actually look at data, not just guess?
- **Collaboration** — did you bring people along (design, PM) rather than just declaring the answer?
- **Learning** — did the experience change how your team works going forward?

**Red flags to avoid:**
- **Drowning the story in numbers.** Teresa is not an engineer. One or two clear metrics are enough. "Engagement dropped 15%, we fixed the nav, engagement recovered to 8% above baseline" is perfect. Don't rattle off p-values or statistical test names.
- **Taking a combative tone toward the design team.** This story should feel like collaboration, not "I proved them wrong."
- **No follow-through.** If your story ends at "I found the data" but you never acted on it, it is incomplete.

**Phrases that work well:**
- "The numbers told a clear story, but I wanted to understand the why behind them before jumping to solutions."
- "I put together a simple summary so everyone — not just the engineers — could see what was happening."
- "We made the change together, and then I made sure we tracked it afterward to confirm it actually worked."
- "That experience changed how our team approaches launches — we now have a checklist for post-launch metric monitoring."

---

### Theme 4: Handling competing priorities (speed vs quality)
- A time you had to balance shipping fast with shipping a great experience
- How you made tradeoffs and communicated them

**Example story outline (adapt with your own experience):**
- **Setting:** A major marketing campaign is launching in one week and your team needs to ship a new landing page with interactive elements (for example, an animated product showcase or a live event countdown). The full design includes complex animations and a custom video player. There is no way to build everything at full quality in one week.
- **Action:** You sit down with the PM and designer and break the page into "must-have" and "nice-to-have." You propose shipping a polished version of the core content — clean layout, fast load time, mobile-responsive, working CTA buttons — and deferring the custom video player to a fast-follow the next week. You are transparent about why: "If we rush the video player, it will probably break on Safari and older devices, and that's a worse experience than not having it at all." You document the plan and the follow-up timeline so everyone is aligned.
- **Outcome:** The page launches on time. It performs well — strong click-through rate, no major bugs. The custom video player ships five days later, fully tested. The PM later says the phased approach was the right call because the first version already drove the campaign results they needed.

**What Teresa is listening for:**
- **Maturity in tradeoff-making** — can you articulate why you chose what you chose, not just that you "cut scope"?
- **Communication** — did you bring stakeholders into the decision, or did you unilaterally decide what to cut?
- **User-centered reasoning** — was your tradeoff framed around user experience, not just engineering convenience?
- **Follow-through** — did you actually deliver the deferred work, or did "fast-follow" become "never"?

**Red flags to avoid:**
- **"We just cut corners to ship on time."** This makes it sound like you sacrificed quality without thinking. Teresa wants to hear that you were deliberate.
- **Blaming the timeline.** "Management gave us an impossible deadline" is not a good look. Focus on how you handled it, not whose fault it was.
- **No user framing.** If your tradeoff reasoning is purely technical ("we didn't have time to refactor"), reframe it: "We prioritized the parts users would interact with most."

**Phrases that work well:**
- "I wanted to make sure that whatever we shipped felt complete, even if it wasn't everything we'd planned."
- "I laid out the options with the tradeoffs for each, and we made the call as a team."
- "My guiding question was: what will the user actually experience on launch day? That's what I wanted to protect."
- "We shipped the rest the following week, so nothing got lost — it was a sequence decision, not a cut decision."

---

## Sample Questions

### "Tell me about a time you put the user first, even when it was difficult"

**Why they ask this:** This is the core "Player Experience First" question. They want to know if user advocacy is something you actually do under pressure, not just something you believe in abstractly. The "even when it was difficult" qualifier is key — they want to see that you held your ground when there was a cost to doing so (time, political capital, personal effort).

**Suggested answer framework:**
1. **Name the tension** — what made it difficult? (deadline, disagreement with a stakeholder, extra work)
2. **Describe what you did** — specific actions, not just "I advocated for the user"
3. **Explain the cost you accepted** — what did it take? (extra hours, a hard conversation, pushing back on a leader)
4. **Land on the user outcome** — what was better for the user because of what you did?

**What a good answer sounds like:**
"We were about to ship a feature that technically worked but had a confusing error message when users hit an edge case. I pushed to delay by two days so we could rewrite the error handling to actually guide users to a fix. My lead was hesitant because we were already behind, but I showed that this edge case would affect about 20% of users. We made the time, and support tickets for that flow dropped significantly after launch."

**What a bad answer sounds like:**
"I always put the user first. Whenever I'm building something, I think about the user experience and try to make it as good as possible. I think that's really important, especially at a company like Riot."
- This is all belief, no evidence. There is no story, no difficulty, no specific action.

---

### "Describe a time you used data to improve a user experience"

**Why they ask this:** They want to see that you make decisions based on evidence, not gut feeling alone. At Riot's scale, even small UX changes affect millions of players, so a culture of measurement matters. They are also testing whether you can explain data-driven work in accessible terms.

**Suggested answer framework:**
1. **What did you observe?** — what made you think something needed to improve?
2. **What data did you collect or look at?** — keep this simple and concrete
3. **What action did you take based on the data?**
4. **What was the measurable result?**

**What a good answer sounds like:**
"After we redesigned our onboarding flow, I noticed completion rates dropped from 70% to 55%. I added step-by-step tracking to see where users were dropping off and found that 80% of the drop happened on one screen where we were asking for too much information at once. I proposed splitting it into two shorter steps. After the change, completion went back up to 75% — higher than before the redesign."

**What a bad answer sounds like:**
"I looked at our analytics dashboard regularly and whenever I saw something off, I'd flag it to the team. I think data is really important for making good decisions."
- Too vague. No specific situation, no specific data point, no specific result.

---

### "How do you decide what's 'good enough' vs what needs more polish?"

**Why they ask this:** This tests your judgment and maturity. Perfectionism that delays shipping is bad. Shipping sloppy work is also bad. They want to see that you have a framework for making this call, not just instinct.

**Suggested answer framework:**
1. **Name your criteria** — what factors do you weigh? (user impact, visibility, reversibility, deadline)
2. **Give a specific example** — a time you shipped "good enough" AND a time you pushed for more polish
3. **Explain the reasoning for each** — what made you decide differently in each case?

**What a good answer sounds like:**
"I ask myself two questions: will the user notice, and is it easy to fix later? For our recent dashboard redesign, I shipped with a slightly imperfect animation because users wouldn't notice the difference and we could tweak it in the next sprint. But for the same project, I insisted on getting the data accuracy right before launch, because showing users wrong numbers would destroy trust and that's hard to recover from. The animation was cosmetic and reversible. The data accuracy was foundational and not reversible."

**What a bad answer sounds like:**
"I'm a perfectionist, so I always try to make everything as polished as possible. I don't like shipping anything I'm not proud of."
- Sounds nice but signals inability to make tradeoffs. Every real project requires them.

---

### "Tell me about a product decision you disagreed with. What did you do?"

**Why they ask this:** They are testing your ability to disagree constructively and then commit. Riot values strong opinions loosely held. They want to see that you can voice disagreement respectfully, back it up with reasoning, AND still execute fully if the decision goes the other way.

**Suggested answer framework:**
1. **What was the decision and why did you disagree?**
2. **How did you express your disagreement?** (privately? with data? respectfully?)
3. **What happened?** — did they change course, or did you disagree and commit?
4. **What was the outcome?** — and what did you learn?

**What a good answer sounds like:**
"The team decided to build a custom component library from scratch instead of extending an existing open-source one. I thought it was going to take much longer than estimated and slow down feature work. I wrote up a comparison showing the timeline and maintenance costs for each approach, and shared it with my lead. After discussion, the team still chose to build custom — the reasons were around long-term brand consistency. I committed fully to that direction and ended up owning two of the core components. Looking back, the custom library did take longer to build, but it gave us exactly the flexibility we needed for later projects, so I understand why the call was made."

**What a bad answer sounds like:**
"I disagreed with a decision once, but I just went along with it because I didn't want to cause problems."
- Shows passivity. Also: "I disagreed and I was proven right in the end" with a smug tone signals you hold grudges instead of committing.

---

### "What's a product you love and why? What would you change about it?"

**Why they ask this:** This is a product-sense question disguised as a casual one. They are testing whether you think critically about user experience in your daily life, not just at work. If you can, reference a Riot game — but only if your answer is genuine and specific.

**Suggested answer framework:**
1. **Name the product and why you love it** — be specific about what makes the experience great
2. **Identify one thing you would change** — show critical thinking, not just praise
3. **Explain your reasoning** — frame the change around user impact

**What a good answer sounds like:**
"I love how League of Legends handles its champion select — the flow of banning, picking, and swapping feels like a mini-game in itself and builds anticipation before the match even starts. One thing I'd change is the post-match stats screen. Right now it's dense and hard to scan quickly. I'd love to see a summary view that highlights your personal best moments from the game — like 'your highest damage combo' or 'most wards placed in one match' — because that would make the end screen feel rewarding even after a loss, and it would help players learn without needing to dig through numbers."

**What a bad answer sounds like:**
"I love Riot's games. They're all really well made. I can't really think of anything I'd change — you guys do a great job."
- Flattery without substance. Also shows lack of critical thinking, which is the opposite of what they want.

---

### "Why Riot?" (Gets asked in nearly every round — have a specific answer, not just "I like games")

**Why they ask this:** Every company asks this, but at Riot it carries extra weight because their culture is built around genuine passion for players and games. They want to know your "Why Riot" is specific to Riot, not interchangeable with any other game company or tech company.

**Suggested answer framework:**
1. **Personal connection** — what is your actual relationship with Riot's products or mission?
2. **Specific observation** — name something specific about Riot that you admire (a blog post, a design decision, how they handled a community issue, their tech stack, their approach to a problem)
3. **Why now, why this role** — what about this specific opportunity fits where you are in your career?

**What a good answer sounds like:**
"I've been playing League since season 4, so I've watched Riot evolve the game over years — and what stands out is how seriously you take player feedback. The way the team handled the item system rework, rolling it out, listening to the backlash, and iterating publicly, showed me this is a company that actually closes the loop with its users. As a web engineer, I want to work somewhere that level of craft and user obsession extends to every surface, not just the game client. And specifically for this role, building web experiences that millions of players interact with — that's the kind of scale and impact I'm looking for at this stage of my career."

**What a bad answer sounds like:**
"I've always been a gamer and Riot makes great games. I think it would be really cool to work on games and I've heard the culture is awesome."
- Generic. Could be said about any game company. No specificity, no personal depth.

---

## Strategy

### Be specific
- **What this means:** Instead of saying "I always care about users," tell a story with names, dates, numbers, and outcomes. Specificity is what separates a genuine answer from a rehearsed one.
- **Deeper guidance:** Before the interview, write down 2-3 numbers for each of your stories. These could be user counts, percentage improvements, time saved, support tickets reduced, or even qualitative things like "three users in our beta group specifically mentioned this improvement." Numbers make stories real and memorable.
- **How to connect to player impact for Teresa:** Teresa thinks in terms of systems and people outcomes, not code. Instead of "I optimized the React rendering pipeline," say "I made the page load noticeably faster for users — we measured a 40% improvement in load time, which meant fewer people gave up and left before the page finished loading." She understands business outcomes and human experiences, so translate your technical work into those terms.
- **Example:** Instead of "I refactored the state management layer," try: "Our users were seeing stale data — like, they'd update their profile and it wouldn't show the change for several seconds. I reworked how we handled data updates so changes appeared instantly. It sounds small, but it eliminated a confusing experience that was generating about 10 support tickets a week."

### Show gaming awareness
- **What this means:** If you play Riot's games (or any games), draw on that experience to show you understand what it feels like to be a player, not just a developer.
- **Deeper guidance:** You do not need to be a hardcore ranked player. What matters is showing that you think about games the way a developer thinks about products — noticing the design choices, understanding why something feels good or frustrating, having opinions about how things could improve. If you play League, Valorant, TFT, or any Riot game, think of one specific moment where the experience was great and one where it was frustrating. Be ready to talk about both.
- **How to connect for Teresa:** Teresa may or may not be a gamer herself, but she understands Riot's mission deeply. Frame gaming awareness as user empathy: "As a player, I've experienced the frustration of [X], so I understand on a personal level why getting the user experience right matters at Riot."
- **Example:** "When I play Valorant, I notice how the UI never gets in the way of the action — the buy menu is fast, the scoreboard is clean, the loading screen gives you useful info. That kind of restraint in UI design is something I really admire and want to contribute to."

### Connect technical decisions to player impact
- **What this means:** Every technical choice you make has a downstream effect on the person using the product. In this interview, always complete the sentence: "I did [technical thing] **because it meant [user outcome]**."
- **Deeper guidance:** Practice the "so that" bridge. Take any technical accomplishment and add "so that users could..." to the end. If you cannot complete that sentence, the story might not be right for this round. Examples:
  - "I implemented lazy loading **so that** the page loaded in under 2 seconds even on slow connections, which meant players in regions with slower internet had the same experience as everyone else."
  - "I built a component library **so that** we could ship new features faster, which meant players got improvements weeks earlier than they otherwise would have."
  - "I set up error monitoring **so that** we could catch and fix broken experiences before users reported them, which meant fewer players ever hit a dead end."
- **How to connect for Teresa:** She will appreciate the cause-and-effect framing because it shows business thinking, not just engineering thinking. You are demonstrating that you understand why the work matters, not just how it works.

### Keep it relatable for a non-engineer
- **What this means:** Teresa leads HR technology. She is technical enough to understand systems and workflows, but she is not going to know what a virtual DOM is or why your Redux architecture matters. Speak in outcomes, not implementation details.
- **Deeper guidance:** Use the "explain it to a smart friend who doesn't code" test. If your story requires the listener to know what React, GraphQL, or CI/CD means, rephrase it. Here are some translations:
  - Instead of "I optimized our webpack bundle" say "I made the page load much faster"
  - Instead of "I wrote unit tests for the component" say "I added safeguards so that future changes wouldn't accidentally break the experience"
  - Instead of "I migrated from REST to GraphQL" say "I redesigned how our app requests data so it loads only what's needed, making everything faster"
  - Instead of "I set up a CI/CD pipeline" say "I automated our release process so we could ship improvements to users multiple times a day instead of once a week"
- **How to connect for Teresa:** Think about it from her world. She manages HR technology — tools that employees use daily. She understands "the tool was slow and people were frustrated, so we made it faster and people were happier." That is the level of narrative she will connect with. Technical detail is fine in small doses to show competence, but the story arc should always be: problem felt by humans, action taken, improvement experienced by humans.
- **Specific tip:** If you catch yourself going deep into technical detail, pause and say: "To put that simply..." or "What that meant for the user was..." This shows self-awareness and communication skill, both of which Teresa will value.

---

## Quick Reference: Do's and Don'ts

| Don't | Do Instead | Why | Example |
|-------|-----------|-----|---------|
| "I always put users first" (vague) | Specific story with measurable outcome | **Vague claims are meaningless without evidence.** Anyone can say they care about users. A specific story with a real outcome proves it. Teresa has heard hundreds of candidates say "I'm user-focused" — the ones who stand out are the ones who prove it with a real example. | **Don't:** "I'm really passionate about user experience." **Do:** "When we launched the new dashboard, I noticed 30% of users couldn't find the search feature. I moved it to the top nav and usage went up 45% in two weeks." |
| Use heavy technical jargon | Explain impact in human terms | **Teresa is not an engineer, and jargon creates distance.** When you use terms she does not know, she cannot evaluate your story properly. Worse, it can come across as showing off rather than communicating. The goal is for her to understand and remember your story, which means it needs to be told in her language. | **Don't:** "I refactored the HOC pattern to use custom hooks with memoized selectors to prevent unnecessary re-renders in our SSR pipeline." **Do:** "The page was slow because it was doing a lot of unnecessary work behind the scenes. I cleaned up how it processes information, and load time dropped by 60%. Users noticed immediately." |
| Give a generic "Why Riot?" | Reference specific products, blog posts, or player experiences | **Generic answers signal that you are applying broadly and Riot is just another option.** Riot's culture places enormous value on passion for games and players. If your "Why Riot" could be copy-pasted into an application at any other game company, it will not land. Specificity shows you have actually engaged with Riot as a company, not just as a brand. | **Don't:** "I love games and Riot makes the best ones. The culture seems amazing." **Do:** "I read the engineering blog post about how the League client team rebuilt the champion select experience, and the way they talked about balancing performance with visual fidelity really resonated with how I think about web development." |
| Sound rehearsed | Be conversational and genuine | **Rehearsed answers feel performative, and Teresa's job is to assess authenticity.** If your answer sounds like you memorized a script, it raises a flag: is this person genuine, or are they just good at interviews? The fix is not to be unprepared — it is to prepare your stories but deliver them naturally, as if you are telling a friend about something interesting that happened at work. Pause, think, vary your pacing. | **Don't:** (speaking rapidly in a single rehearsed block) "In my previous role I identified a user pain point, gathered data, proposed a solution, and delivered a 30% improvement in engagement." **Do:** (conversational pace) "So this was about six months ago... we had just launched a new feature, and I was looking at the analytics and something felt off. The numbers were way lower than we expected. So I started digging in..." |
