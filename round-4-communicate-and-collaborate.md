# Round 4: Communicate and Collaborate

**Date:** Apr 10, 2026 | **Time:** 3:00-4:00pm PDT | **Interviewer:** Will Cohen

---

## Morning-of Checklist
- [ ] Review your STAR/SAO stories (especially conflict resolution and cross-team collaboration)
- [ ] Review Riot's 5 core values — especially "Thrive Together" and "Stay Hungry; Stay Humble"
- [ ] Think of a good remote/distributed collaboration story
- [ ] Remember: Will is based in NYC (Riot is mostly LA) — distributed team stories will resonate

---

## Know Your Interviewer

- **Role:** At Riot Games, based in New York (most of Riot is in LA)
- **Background:** Macalester College (2005-2009). Limited public information available.
- **What this means for you:** Being remote/distributed himself, Will may especially value stories about cross-timezone collaboration, async communication, and working effectively with distributed teams. Focus on communication, conflict resolution, and teamwork.

---

## What This Round Tests

Alignment with **"Thrive Together"**. Can you work effectively with others? Handle conflict? Give and receive feedback? Communicate clearly across disciplines?

---

## Behavioral Interview Framework

Riot uses **S.A.O. (Setting, Action, Outcome)** — their version of STAR.

**Template for each story:**
- **Setting** (15%): Brief context — what was the situation, who was involved
- **Action** (60%): What specifically did YOU do, step by step
- **Outcome** (25%): What happened, what was the measurable impact, what did you learn

---

## STAR/SAO Stories to Prepare (have 3-4 ready)

### Theme 1: Navigating disagreement
- A time you and a coworker disagreed on a technical approach. How did you resolve it?
- Key: Show you listen, consider other perspectives, and find common ground

#### Example Story Outline (adapt with your own experience)
- **Setting:** You and a senior frontend engineer disagreed on state management for a new dashboard feature. They wanted to use Redux for everything; you believed a lighter approach (React context + local state) was better for this scope. The team was split and the sprint was starting.
- **Action:** You scheduled a 30-minute call (not Slack — tone matters for disagreements). You opened by saying "I want to understand your reasoning first" and genuinely listened. They had a fair point about consistency across the codebase. You then shared your concern: Redux boilerplate would slow delivery and the feature was self-contained. You proposed a compromise — use React context now with a clear interface boundary so migration to Redux later would be trivial. You wrote up both approaches in a short doc with trade-offs and let the tech lead make the final call.
- **Outcome:** The team went with your compromise. The feature shipped on time. Six months later, when the dashboard grew, the migration to Redux took less than a day because of the clean interface. The senior engineer later told you they appreciated how you handled it.

#### What Will is listening for
- **Active listening** — did you genuinely try to understand the other person's viewpoint before pushing your own?
- **Separating ego from ideas** — can you disagree without making it personal?
- **Constructive resolution** — did you find a path forward that respected both perspectives?
- **Learning orientation** — did you take something away from the disagreement?

#### Red flags to avoid
- **"I was right and they were wrong"** — even if true, this signals low collaboration skills
- **Skipping to the resolution** — Will wants to hear HOW you navigated the tension, not just that it worked out
- **Being vague about what you actually said** — "We talked it out" is not enough. What words did you use? What was your approach?
- **Picking a trivial disagreement** — tabs vs. spaces does not count. Pick something with real stakes.

#### Phrases that work well
- "Before I shared my perspective, I wanted to make sure I understood theirs..."
- "I realized we were actually optimizing for different things — they cared about X, I cared about Y..."
- "I suggested we write down the trade-offs so the conversation stayed objective..."
- "Even though we went with my approach, I incorporated their concern by..."

---

### Theme 2: Cross-team collaboration
- Working with designers, PMs, or other engineering teams
- How you bridged communication gaps between technical and non-technical people
- Bonus: stories about remote/distributed collaboration

#### Example Story Outline (adapt with your own experience)
- **Setting:** You were building a new player-facing feature (e.g., a live event page) and the design team was in a different office/timezone. The designer had a vision that involved complex animations on scroll, but the PM needed the feature live in three weeks. The design spec kept evolving because feedback was async and slow.
- **Action:** You set up a shared Figma-to-code review cadence — a 20-minute sync twice a week where you screen-shared your in-progress build next to the design comp. This eliminated days of back-and-forth over Slack. When the animation scope threatened the deadline, you created a "launch version vs. enhanced version" proposal: ship with CSS transitions first, add the richer animations in a fast-follow. You translated the technical constraints into language the designer understood — "This animation requires a library that adds 40kb to the bundle and two extra days of testing" rather than just saying "it's too complex."
- **Outcome:** The feature launched on time with clean animations that the designer was proud of. The enhanced animations shipped two weeks later. The twice-weekly sync became a team standard for future projects.

#### What Will is listening for
- **Translation ability** — can you talk to non-engineers without dumbing things down or being condescending?
- **Proactive communication structure** — did you create process to prevent problems, not just react to them?
- **Empathy for other disciplines** — do you respect what designers/PMs bring to the table?
- **Remote/async awareness** — did you adapt your communication for distributed work? (This will resonate strongly with Will.)

#### Red flags to avoid
- **Blaming other teams** — "Design kept changing their mind" sounds like finger-pointing
- **Positioning yourself as the hero who saved everyone** — collaboration means shared success
- **Not mentioning how you adapted your communication style** — the whole point is that you can flex
- **Forgetting to mention the tools/processes** — Slack, Figma, Notion, standups, etc. show you think about communication infrastructure

#### Phrases that work well
- "I realized the disconnect was partly a communication format problem, not a people problem..."
- "I set up a lightweight process to keep us aligned without adding meetings for the sake of meetings..."
- "I made sure to over-communicate context in async messages since we couldn't just tap someone on the shoulder..."
- "I learned that the designer's pushback was actually protecting the user experience, so I found a way to honor that within our constraints..."

---

### Theme 3: Giving difficult feedback
- A time you had to tell someone their approach wasn't working
- How you did it respectfully and what happened

#### Example Story Outline (adapt with your own experience)
- **Setting:** A mid-level engineer on your team was writing React components with deeply nested prop-drilling and no tests. Their PRs were getting approved because the team was moving fast, but the code was becoming hard to maintain. You were not their manager, but you were the most senior frontend person reviewing their code.
- **Action:** You did not call them out in a PR comment for the whole team to see. Instead, you asked for a 1:1 ("Hey, I'd love to pair on component patterns — I've been thinking about how we structure things and want your input too"). In the conversation, you opened by acknowledging what they were doing well — they shipped fast and their UI logic was solid. Then you shared your concern specifically: "I've noticed a pattern where we're passing props four or five levels deep, and I think it's going to cost us when we need to refactor. Can I show you a pattern I've found helpful?" You pair-coded a refactor together so it felt collaborative, not punitive.
- **Outcome:** They started using context and custom hooks in their next PR. Over the following month, the team's codebase quality improved measurably — PR review time dropped because components were easier to understand. The engineer later thanked you and said they appreciated that you did it privately and made it a learning opportunity, not a criticism.

#### What Will is listening for
- **Courage to speak up** — did you address the issue or avoid it?
- **Kindness in delivery** — did you protect the person's dignity?
- **Specificity** — did you give actionable feedback with concrete examples, not vague "you need to improve"?
- **Follow-through** — did you help them improve, or just point out the problem and walk away?

#### Red flags to avoid
- **"I told them they were doing it wrong"** — blunt delivery without empathy is a red flag at Riot
- **Giving feedback only in public channels** (PR comments, team meetings) — shows low emotional intelligence
- **Being vague about what the feedback actually was** — "I told them to do better" tells Will nothing
- **Not having a positive outcome** — if the story ends with "they didn't change and it was frustrating," pick a different story

#### Phrases that work well
- "I wanted to have the conversation privately because I cared about their growth, not about being right publicly..."
- "I started by acknowledging what they were doing well, because it was genuine — they were fast and creative..."
- "I framed it as 'here's a pattern I've found helpful' rather than 'you're doing this wrong'..."
- "I offered to pair on it so the feedback came with support, not just criticism..."

---

### Theme 4: Receiving feedback and growing
- A time you got critical feedback. How did you respond?
- Show humility and growth mindset (maps to "Stay Hungry; Stay Humble")

#### Example Story Outline (adapt with your own experience)
- **Setting:** After launching a feature, your tech lead pulled you aside and told you that while your code quality was strong, your communication during the project had been a problem. You had gone heads-down for a week without updating the team, and the PM had escalated to the tech lead because they did not know the status. You felt defensive because you had been productive that week.
- **Action:** Your first instinct was to explain why you had gone quiet (you were in deep focus). But instead of getting defensive, you said: "Thank you for telling me. I can see how that was frustrating for the PM." You asked a follow-up question: "What would ideal communication have looked like to you?" The tech lead said a simple daily one-liner in the team channel would have been enough. You committed to doing async daily updates. You also reflected honestly and realized your "heads-down mode" was partially avoidance — you had been stuck on a bug and did not want to admit it.
- **Outcome:** You started posting brief daily updates. Within a month, the PM specifically called out in a retro how much communication had improved. More importantly, you learned that vulnerability (saying "I'm stuck") actually builds more trust than silence. You carried that lesson forward and started encouraging the same openness on your team.

#### What Will is listening for
- **Genuine humility** — did you actually internalize the feedback or just perform acceptance?
- **Emotional maturity** — can you sit with discomfort and not get defensive?
- **Concrete behavior change** — what did you do differently going forward?
- **Self-awareness** — do you understand WHY you reacted the way you did?

#### Red flags to avoid
- **"I already knew that"** — if you already knew, why weren't you doing it?
- **Deflecting blame** — "Well, the PM should have asked me directly" shifts responsibility
- **Picking feedback that was trivial** — "Someone told me my code comments were too short" is not a meaningful growth story
- **No evidence of lasting change** — if you can't point to a behavior you changed permanently, the story falls flat

#### Phrases that work well
- "My first reaction was defensive, honestly. But I took a beat and really listened..."
- "I asked them to tell me more because I wanted to understand the full picture..."
- "Looking back, I realized the feedback was actually pointing at something deeper..."
- "That experience fundamentally changed how I approach [X]. Now I always..."

---

### Theme 5: Working through ambiguity
- A time requirements were unclear or changing
- How you aligned the team and moved forward

#### Example Story Outline (adapt with your own experience)
- **Setting:** You were assigned to build a new internal tool (e.g., a content management dashboard) but the product requirements were a one-page doc with bullet points and no designs. The PM was stretched across three projects and could not give you more detail. The deadline was fixed because it was tied to a content launch.
- **Action:** Instead of waiting for perfect requirements (which were never coming), you broke the ambiguity into pieces. You identified the three things you DID know for certain and the five things that were unclear. You wrote up the unknowns as specific yes-or-no questions and sent them to the PM in a numbered list so they could respond quickly. For the parts where nobody had answers yet, you made reasonable assumptions and documented them: "I'm assuming X unless told otherwise." You built the first version as a thin vertical slice — one complete user flow — and demoed it to the PM after three days. That demo surfaced most of the remaining requirements faster than any written spec could.
- **Outcome:** The tool launched on time. The PM said the numbered-questions approach was the most helpful thing anyone had done for them that quarter because it respected their limited time. You turned this into a lightweight template your team used for future ambiguous projects.

#### What Will is listening for
- **Comfort with ambiguity** — did you freeze, complain, or move forward?
- **Structure creation** — did you bring order to chaos without needing someone to hand it to you?
- **Bias to action** — did you build something to learn, rather than waiting to have everything figured out?
- **Stakeholder empathy** — did you make it easy for busy people to help you?

#### Red flags to avoid
- **"I waited for the PM to clarify"** — passivity is the opposite of what they want to hear
- **"I just figured it out on my own"** — going fully solo without checking assumptions is reckless, not heroic
- **Blaming the PM or process** — "The requirements were terrible" is finger-pointing
- **Not mentioning how you managed risk** — building without requirements is fine IF you had a plan for when assumptions were wrong

#### Phrases that work well
- "I knew perfect clarity wasn't coming, so I focused on reducing the uncertainty to specific questions..."
- "I documented my assumptions explicitly so the team could correct me early rather than late..."
- "I built the smallest thing that would teach us the most..."
- "I made it easy for the PM to give input by structuring my questions as yes-or-no decisions..."

---

## Sample Questions

### "Tell me about a time you had a conflict with a teammate. How did you handle it?"

- **Why they ask this:** They want to know if you escalate, avoid, or resolve. Conflict is inevitable at any company. Riot needs people who address it directly but with respect. This question maps directly to "Thrive Together."
- **Suggested answer framework:**
  1. Name the conflict clearly (not vaguely) — what was at stake?
  2. Describe your emotional state honestly — "I was frustrated because..."
  3. Explain the specific step you took to address it (private conversation, written proposal, etc.)
  4. Show that you genuinely considered their perspective
  5. Land on the resolution AND what you learned about working with others
- **What a good answer sounds like:** "A colleague and I disagreed on how to implement authentication for a new feature. I felt strongly about using JWTs, and they wanted session-based auth. Instead of debating in Slack, I asked to hop on a call. I started by asking them to walk me through their reasoning. Turns out their concern was about token revocation — a real problem I hadn't fully considered. We landed on JWTs with a short expiry and a refresh token pattern, which addressed both our concerns. I learned that disagreements often mean I'm missing context, not that the other person is wrong."
- **What a bad answer sounds like:** "A teammate wanted to do it their way but I knew it wouldn't scale. I explained why my approach was better and eventually they agreed. It was fine." (This shows no curiosity, no empathy, and positions you as the one who was right.)

---

### "Describe a project where you had to collaborate across teams"

- **Why they ask this:** Web engineers at Riot work with game teams, design, platform, and infrastructure. They need to know you can operate outside your silo. Will, being remote from LA HQ, probably values this even more.
- **Suggested answer framework:**
  1. Set the scene: what teams were involved and why the collaboration was necessary
  2. Name the communication challenges (different priorities, different vocabularies, timezone gaps)
  3. Describe the specific actions YOU took to bridge gaps (not what "we" generally did)
  4. Highlight a moment where your communication approach prevented or solved a problem
  5. End with the project outcome and what the collaboration produced
- **What a good answer sounds like:** "I worked on a feature that required our frontend team to integrate with the backend team's new API and match the design team's updated brand guidelines — three teams, three different timelines. I created a shared channel and a weekly 15-minute sync where each team gave a one-sentence status. When the API team's schema changed mid-sprint, I caught it in our sync before it broke anything and proposed a compatibility layer so we didn't block the design implementation. The feature launched on schedule and the sync format got adopted by two other project teams."
- **What a bad answer sounds like:** "I worked on a big project with lots of teams. We had meetings and kept everyone updated. It went well." (No specificity, no evidence of YOUR contribution, no real challenge described.)

---

### "How do you handle it when you disagree with your manager's decision?"

- **Why they ask this:** This is a trap question if you're not careful. They're testing whether you (a) blindly comply, (b) go rogue, or (c) push back respectfully and then commit. Option C is the answer. Riot values "Challenge every convention" but also "Thrive Together" — you need both.
- **Suggested answer framework:**
  1. Name a real decision you disagreed with (not something trivial)
  2. Describe how you raised your concern (privately, with data, respectfully)
  3. Show that you listened to their reasoning and genuinely considered it
  4. Explain what happened — either you were convinced, they were, or you disagreed and committed anyway
  5. Reflect on what you learned about influence and trust
- **What a good answer sounds like:** "My manager decided to deprioritize automated testing for a quarter to ship features faster. I disagreed because I'd seen tech debt compound. I asked for 15 minutes to share my concern. I showed data: our bug count had increased 30% in the last two months, and each bug took an average of 4 hours to fix. My manager acknowledged the data but said the business pressure was real and we needed the features. I said, 'I understand. What if we commit to a minimum bar — unit tests for critical paths only?' They agreed to that compromise. It wasn't everything I wanted, but it prevented the worst regressions and I respected the decision."
- **What a bad answer sounds like:** "I disagreed with my manager so I just did what they said. You have to pick your battles." (Shows passivity.) OR: "I disagreed and went ahead with my approach anyway because I knew I was right." (Shows insubordination.)

---

### "Tell me about a time you received tough feedback"

- **Why they ask this:** This directly maps to "Stay Hungry; Stay Humble." They want to see if you can be vulnerable, non-defensive, and genuinely learn. This is one of the strongest signals for culture fit at Riot.
- **Suggested answer framework:**
  1. Set the scene: who gave you the feedback and what was it about?
  2. Be honest about your initial reaction (defensiveness is human — acknowledging it shows self-awareness)
  3. Describe what you did with the feedback — what concrete action did you take?
  4. Show the lasting change — this is the most important part
  5. Express genuine gratitude for the feedback (if authentic)
- **What a good answer sounds like:** "My tech lead told me that I was writing overly clever code — my abstractions were elegant but hard for the rest of the team to understand and modify. My first reaction was 'but it's good code.' Then I looked at our PR review data and saw that my PRs had the most review comments and took the longest to merge. She was right. I started optimizing for readability over cleverness. I even adopted a personal rule: if I have to explain a pattern in a PR description, it's probably too complex. Six months later, my PRs were merging faster and I was getting positive feedback from junior engineers who said my code was easy to learn from."
- **What a bad answer sounds like:** "Someone told me I needed to communicate more. I started sending more messages. It was fine." (No emotional depth, no real change described, no self-reflection.)

---

### "How do you explain complex technical concepts to non-technical stakeholders?"

- **Why they ask this:** Web engineers at Riot ship player-facing products. You'll need to communicate with producers, designers, marketers, and leadership. They want to know if you can translate without being condescending.
- **Suggested answer framework:**
  1. Give a specific example (do not answer hypothetically)
  2. Describe the concept you needed to explain and who the audience was
  3. Show your translation technique — analogy, visual, simplified mental model
  4. Prove it worked: the stakeholder made a good decision or took appropriate action based on your explanation
- **What a good answer sounds like:** "Our PM asked why a page was loading slowly and whether we should prioritize fixing it. Instead of explaining bundle splitting and render-blocking JavaScript, I said: 'Imagine our page is a restaurant. Right now, the kitchen is trying to cook every dish on the menu before serving anything. We need to let it serve the appetizers while the entrees are still cooking. That's what code splitting does.' The PM immediately understood the priority and gave us two sprints to implement it. Loading time dropped from 4 seconds to 1.2 seconds."
- **What a bad answer sounds like:** "I just simplify things. I don't use jargon. I keep it high level." (No example, no evidence it works, too generic.)

---

### "Describe a time when a project wasn't going well. What did you do?"

- **Why they ask this:** They want to see how you behave under stress and whether you take ownership or wait for someone else to fix things. This tests leadership without authority.
- **Suggested answer framework:**
  1. Describe the project and what specifically was going wrong (missed deadlines, scope creep, team conflict, technical blockers)
  2. Explain at what point you decided to act (early intervention shows awareness)
  3. Describe the specific action: did you raise it to the team? Propose a new plan? Cut scope? Ask for help?
  4. Show the outcome — it does not have to be a fairy-tale ending, but you need to show improvement
  5. Reflect on what you'd do differently or what you learned about project health signals
- **What a good answer sounds like:** "We were three weeks into a six-week project and had only completed about 20% of the work. I pulled up our task board and mapped what was left against our remaining time — it didn't add up. Instead of waiting for the next sprint retro, I brought it up in our standup: 'I think we need to talk about scope. Here's what I'm seeing.' I proposed cutting two non-critical features and shipping them in a v2. The PM pushed back initially, but when I showed the timeline math, they agreed. We shipped the core feature on time, and the cut features shipped three weeks later. The main thing I learned was to track progress against the deadline early, not just track tasks."
- **What a bad answer sounds like:** "The project was behind so we all worked overtime to finish it." (No analysis, no leadership, just brute force.)

---

### "How do you stay aligned with teammates in different time zones?" (Relevant to Will's remote context)

- **Why they ask this:** Will works remotely from NYC while most of Riot is in LA. This is practically a question about his own daily reality. A strong answer here will resonate personally with him.
- **Suggested answer framework:**
  1. Describe your actual experience working across timezones (if you have it)
  2. Name specific practices: async standups, recorded demos, written decision logs, overlap-hour scheduling
  3. Show that you understand the failure modes of distributed work (decisions made without remote people, context lost in translation, isolation)
  4. Emphasize that you treat async communication as a skill, not a compromise
- **What a good answer sounds like:** "When I worked with a backend team three hours ahead of us, our overlap was only 10am-2pm. I learned to front-load collaboration into that window and protect it fiercely — no solo focus work during overlap hours. For everything else, I wrote detailed Slack updates at end-of-day with three things: what I did, what's blocked, and what I need from them. I also started recording five-minute Loom videos for anything visual because screenshots lose context. The biggest lesson was that writing things down isn't overhead — it's the actual work of distributed collaboration."
- **What a bad answer sounds like:** "We just used Slack a lot and had meetings when we could." (No strategy, no awareness of the unique challenges.)

---

## Strategy

### Never badmouth anyone.
Even if someone was clearly wrong, frame it as a learning experience.

- **Why this matters so much:** Riot's culture is team-first. If you badmouth a former colleague, Will immediately wonders what you'll say about your Riot teammates when things get hard. It signals that you externalize blame rather than own your role in situations.
- **Deeper guidance:** The trick is not to lie or pretend everyone was great. You can absolutely describe a difficult person or situation — just frame it through what you learned and how you navigated it. "They had a very different communication style than I was used to" is fine. "They were a terrible communicator" is not.
- **Emotional intelligence tip:** If you describe a conflict, briefly acknowledge the other person's perspective. Even one sentence — "I think they were under a lot of pressure from their leadership" — shows you can empathize even when frustrated.
- **Distributed/remote angle:** When telling stories about remote friction (miscommunication over Slack, decisions made without you, etc.), resist the urge to blame the format. Will lives this every day. Instead, show how you adapted the process to work better.
- **Example:** Instead of "My PM never gave clear requirements," say "The requirements were evolving, which is common in our fast-moving environment, so I built a habit of confirming scope in writing before starting work."

---

### Show emotional intelligence.
"I noticed they were frustrated, so I..."

- **Why this matters so much:** Riot builds products for passionate gamers. The work is emotional. They need people who can read a room, sense when a teammate is struggling, and respond with care — not just people who write good code.
- **Deeper guidance:** Emotional intelligence in interviews is demonstrated through three things: (1) naming emotions accurately ("I could tell they were frustrated" vs. "they were being difficult"), (2) describing your internal reaction honestly ("My first instinct was to push back"), and (3) choosing a thoughtful response ("But I paused and asked what was really going on").
- **Emotional intelligence tip:** The most powerful EQ signal is describing a moment where you paused before reacting. "I wanted to fire back immediately, but instead I took a breath and asked a question." This single pattern — noticing your reaction and choosing a different response — is what separates great behavioral answers from average ones.
- **Distributed/remote angle:** Remote work makes emotional intelligence harder because you lose body language and tone. Show that you're aware of this. "I noticed their Slack messages had gotten shorter and more abrupt, which in my experience usually means someone is overwhelmed, so I reached out privately." This kind of observation across digital channels will resonate with Will.
- **Example:** "During a tense code review, I noticed the author had stopped responding to comments. Instead of pinging them again, I sent a private message: 'Hey, I want to make sure my feedback is landing the right way — can we hop on a quick call?' Turns out they felt attacked by the volume of comments. We resolved it in five minutes on a call."

---

### Emphasize "we" over "I" where appropriate — Riot values team success.

- **Why this matters so much:** "Thrive Together" is not just a poster on the wall. Riot genuinely evaluates whether you think in terms of team outcomes or personal glory. Using "we" signals that you see yourself as part of something bigger.
- **Deeper guidance:** The nuance is that you still need to show YOUR contribution. The balance is: use "we" when describing team efforts and outcomes, and "I" when describing your specific actions. "We shipped the feature on time" + "I identified the performance bottleneck and proposed the caching solution" = perfect balance.
- **Emotional intelligence tip:** When you catch yourself saying "I did everything," stop and credit someone. "I designed the component architecture, and my colleague did excellent work building out the test suite." This costs you nothing and signals generosity.
- **Distributed/remote angle:** When telling remote collaboration stories, "we" language is especially powerful because it shows you see remote teammates as full team members, not peripheral participants. "We made the decision together even though half the team was async" signals inclusive collaboration.
- **Example of good balance:** "Our team was tasked with rebuilding the navigation. I led the technical design and proposed a component-based approach. My teammate Sarah built the accessibility layer, which honestly made it twice as good as my original plan. We shipped it with zero accessibility issues, which was a first for us."

---

### Be authentic. Riot interviewers can smell rehearsed corporate answers. Be genuine.

- **Why this matters so much:** Riot's culture is rooted in being real. They make games for passionate people and they want passionate, genuine people on the team. A polished, corporate-sounding answer ("I leveraged cross-functional synergies to drive alignment") will make Will tune out instantly.
- **Deeper guidance:** Authenticity means three things in an interview: (1) admitting when something was hard or when you messed up, (2) showing genuine enthusiasm rather than rehearsed excitement, and (3) speaking in your natural voice, not "interview voice." If you normally say "that sucked" instead of "that was suboptimal," say what you'd normally say (within reason).
- **Emotional intelligence tip:** One of the strongest authenticity signals is laughing at yourself. If you have a story where you made a mistake, a brief moment of "Yeah, I definitely could have handled that better" with a slight laugh shows you're secure enough to be self-deprecating. This builds instant rapport.
- **Distributed/remote angle:** Authenticity over video call requires a bit more effort because the format is inherently less natural. Make sure to look at the camera occasionally (not just the screen), react visibly when Will says something interesting, and don't be afraid of brief pauses to think. Silence is better than filler words.
- **Example of authentic vs. rehearsed:**
  - **Rehearsed:** "I proactively facilitated a cross-team alignment session to resolve the impediment."
  - **Authentic:** "I realized nobody was talking to each other, so I set up a quick call and said, 'Hey, I think we're building different things.' Turns out we were. Thirty minutes saved us two weeks."

---

## Quick Reference: Do's and Don'ts

| Don't | Do Instead | Why | Example |
|-------|-----------|-----|---------|
| Badmouth a coworker or manager | Frame conflicts as learning experiences | **Will immediately imagines you badmouthing future Riot teammates.** It signals blame externalization and low emotional maturity. Even if the person was genuinely difficult, your job in the interview is to show how you navigated it, not to prove they were wrong. | **Don't:** "My manager was really disorganized and it made the whole project chaotic." **Do:** "My manager was juggling a lot, so I started sending weekly priority summaries to make sure we stayed aligned." |
| Say "I" for everything | Use "we" for team efforts, "I" for your specific contributions | **Riot's "Thrive Together" value means they're screening for lone wolves.** If every story is "I did this, I did that," Will will wonder whether you'll actually collaborate at Riot. The balance is showing your individual contribution within a team context. | **Don't:** "I redesigned the whole frontend and shipped it." **Do:** "I proposed the new architecture and our team rebuilt it together. I personally owned the state management layer." |
| Sound rehearsed or corporate | Be conversational and genuine | **Riot's culture is anti-corporate on purpose.** They make games. They want humans, not consultants. If your answer sounds like it came from a LinkedIn post, you'll lose Will in the first sentence. Speak the way you'd talk to a smart friend. | **Don't:** "I leveraged stakeholder alignment to drive cross-functional outcomes." **Do:** "I got everyone in a room and said, 'We're not on the same page. Let's fix that before we write more code.'" |
| Skip the outcome | Always land the story with measurable results | **Without an outcome, your story is just an anecdote.** Will needs to evaluate your impact, and impact requires results. Numbers are best (30% faster, 2 weeks saved, zero bugs), but qualitative outcomes work too (team adopted the process, designer praised the collaboration). | **Don't:** "We resolved the conflict and moved forward." **Do:** "After we aligned, we shipped on time and the page load dropped from 3s to 800ms. The PM mentioned it in the quarterly review as a highlight." |
| Avoid talking about failures | Own them — show what you learned | **Avoiding failure stories signals insecurity or low self-awareness.** Riot values "Stay Hungry; Stay Humble," which means they actively WANT to hear about failures — but only if you grew from them. A well-told failure story is more impressive than a polished success story. | **Don't:** "Honestly, I can't think of a time I really failed." **Do:** "I shipped a feature without writing integration tests because I was confident in the unit tests. It broke in production. After that, I became the team's biggest advocate for end-to-end testing. I set up our Cypress pipeline and it caught three critical bugs in the next quarter." |

---

## My Stories Mapped to This Round

### Quick-Reference: Which Story for Which Question?

| Question / Theme | Primary Story | Backup Story |
|---|---|---|
| Conflict with a teammate | Advocating Unconventional Approach (#6) | Siding with User (#8) |
| Collaborate across teams | Daily Log Form (#9) | CMS Constraints (#3) |
| Disagree with manager's decision | Risky Path vs Safe Path (#7) | Advocating Unconventional (#6) |
| Received tough feedback | Daily Log Form (#9) | Untrustworthy Data (#4) |
| Explain technical concepts to non-technical people | Advocating Unconventional (#6) | Risky Path (#7) |
| Project wasn't going well | Untrustworthy Data (#4) | Real-Time Progress (#2) |
| Stay aligned across time zones / remote | Daily Log Form (#9) | Real-Time Progress (#2) |
| Theme: Navigating disagreement | Advocating Unconventional (#6) | Risky Path (#7) |
| Theme: Cross-team collaboration | Daily Log Form (#9) | CMS Constraints (#3) |
| Theme: Giving difficult feedback | Advocating Unconventional (#6) | Risky Path (#7) |
| Theme: Receiving feedback and growing | Daily Log Form (#9) | Untrustworthy Data (#4) |
| Theme: Working through ambiguity | Untrustworthy Data (#4) | Reverse-Engineering API (#5) |

> **Tip:** Story #9 (Daily Log Form) and #6 (Advocating Unconventional) are your strongest for this round. #9 shows iterative collaboration with end users. #6 shows respectful disagreement and meeting someone where they are.

---

### Story Reframes (Will-Friendly — Focus on Communication & Collaboration)

#### Story #6: Navigating Disagreement by Listening First
**Best for:** "Conflict with a teammate" | "Disagree with manager" | "Explain technical concepts to non-technical people" | "Giving feedback"

**Setting:** I was building an invoice processing system for a restaurant owner. I believed a newer, smarter approach would save time long-term, but the owner expected the conventional method — it was familiar, predictable, and what they'd seen before. They were skeptical of my idea and thought it sounded expensive and risky.

**Action:** Instead of arguing for my approach, I started by asking the owner what mattered most to them. They told me: cost, accuracy, and not depending on something they couldn't understand. Those became my guiding criteria — not my technical preference. I put together a simple side-by-side comparison using their real data, focused entirely on the things they told me they cared about. I didn't dismiss their preferred approach — I acknowledged where it works well and showed specifically where it breaks down at their scale. When I addressed their concern about the new approach feeling like a "black box," I built in a review layer so they always had visibility and final say on edge cases. I framed the whole conversation as "here are two options with honest tradeoffs" and let them make the call.

**Outcome:** They agreed to a one-week trial. After seeing it handle a completely new vendor's documents without any setup, they were sold. The real lesson wasn't about the technology — it was about communication. I didn't convince them by being right. I convinced them by showing I understood what they valued and by making it safe for them to try something new. If they had said no, I would have built exactly what they asked for — and tracked the results so we could revisit later with real data.

> **Follow-up ready:** *"How do you handle disagreements in general?"* — I separate the *what* from the *who*. It's not my idea vs. their idea — it's which approach best serves the goal. I present evidence, listen to concerns, and let the best reasoning win.

---

#### Story #9: Iterating with End Users Until It Actually Works
**Best for:** "Cross-team collaboration" | "Received tough feedback" | "Stay aligned remotely" | "Going above and beyond"

**Setting:** At Chris N Eddy's, the restaurant managers needed to submit daily closing logs — cash counts, inventory levels, prep completion, bathroom checks. Before I got involved, this was all done through texts and phone calls to the owner. Nothing was consistent, things got lost, and the owner couldn't spot trends across locations.

**Action:** I built a first version of a digital form and shared it with the managers. It didn't land. The form had too many fields, the layout was hard to use on their phones — which is what they'd be filling it out on at the end of a busy shift — and some inputs required typing when quick taps would've been better. Instead of guessing what to fix, I went directly to the managers — the people who'd use this every single night. Over several rounds of feedback, I simplified fields, replaced text inputs with dropdowns and checkboxes, made the layout mobile-first, and shortened the link so they could bookmark it easily. Each time I made changes, I checked back: "Is this easier? What's still annoying?" I kept iterating until they told me it felt fast and natural.

**Outcome:** Every manager now uses the form daily. The owner gets consistent, structured data across all locations — no more digging through texts. The key lesson for me was about collaboration: the people who use a tool every day know more about what it should feel like than the person who builds it. My job wasn't to design the "right" form in isolation — it was to keep showing up, listening, and adjusting. "V1 shipped" wasn't done. Done was when the managers actually used it without friction.

> **Follow-up ready:** *"How did you handle the negative feedback on v1?"* — I didn't take it personally. The managers weren't being difficult — they were telling me what "done" actually looks like. That feedback was the most useful input I got on the whole project.

---

#### Story #7: Communicating Risk Honestly Instead of Selling the Upside
**Best for:** "Disagree with manager" | "Explain technical concepts" | "Project tradeoffs"

**Setting:** The restaurant owner needed daily financial reports from a platform that had no way to export data automatically. The only option was to manually log in and download reports every day — dozens of downloads per week across multiple locations. I found a way to fully automate it, but the automated path was fragile — it depended on unofficial access that could break without warning.

**Action:** I didn't just pick my preferred option. I laid out both paths to the owner with full honesty. I said: "Option A means you download reports manually every day — it always works but costs you 20 minutes. Option B means full automation, but it could break if the platform changes something on their end." Then I explained exactly what I'd build to manage the risk — automatic error detection, alerts if something breaks, and keeping the manual process as a fallback. I was transparent that I was recommending the riskier path, and I explained *why* the daily time savings justified the risk. I let the owner decide with all the information on the table.

**Outcome:** They chose automation, and it's been running reliably multiple times a day. The lesson I took away is about communication more than engineering: people trust you more when you're honest about downsides than when you only sell the upside. When I present options now, I always include what could go wrong — not to scare people, but because informed decisions are better decisions.

---

#### Story #4: Owning a Mistake and Redesigning Around It
**Best for:** "Project wasn't going well" | "Received tough feedback" | "Working through ambiguity"

**Setting:** The restaurant dashboard pulled financial data from delivery platforms. I built a straightforward daily sync — fetch today's numbers, store them, done. But the owner started noticing the numbers on my dashboard didn't match the platform reports. After investigating, I discovered that delivery platforms quietly adjust records days after the original transaction — chargebacks, fee corrections, refund adjustments. My original design didn't account for this, and the dashboard was silently accumulating errors. The owner makes real business decisions from this data, so this wasn't a minor bug — it was a trust problem.

**Action:** I could have patched it with a quick fix, but the root cause was a flawed assumption in my original design. I owned that. I told the owner: "The numbers have been slightly off because I didn't account for how these platforms retroactively change data. Here's how I'm going to fix it." I redesigned the sync to automatically re-check and correct the last three days of records on every run. I also made the system resilient so that one bad record couldn't take down the entire sync. The key communication decision was being upfront about the mistake rather than quietly fixing it — the owner's trust was more important than my ego.

**Outcome:** The owner now trusts the dashboard completely and makes staffing and menu decisions from it. Being transparent about the mistake actually strengthened our working relationship. They told me they appreciated the honesty. The lesson: when something goes wrong, the fastest way to rebuild trust is to explain what happened, take responsibility, and show the fix — not to hide it and hope nobody notices.

> **Follow-up ready:** *"How did you feel about telling the owner about the mistake?"* — Honestly, a little uncomfortable. Nobody likes admitting they got something wrong. But I've learned that the short-term discomfort of owning a mistake is way better than the long-term damage of lost trust when someone discovers it on their own.

---

#### Story #8: Catching Yourself and Changing Course
**Best for:** "Received tough feedback" | "Changed your mind" | "Self-awareness"

**Setting:** The dashboard's data sync took about two minutes. It worked perfectly — every record synced correctly. But the owner kept clicking the sync button again and again, thinking it was broken, because there was no feedback during the wait. My first instinct was to dismiss it: "The system works fine. They just need to be patient."

**Action:** But I caught myself. That's the kind of thinking that makes engineers build things that are technically correct but frustrating to use. Instead of trusting my assumption, I asked the owner directly: "What would make you feel confident that this is working?" Their answer surprised me — they didn't want technical details about what was happening behind the scenes. They wanted to know which store was being updated and roughly how far along it was. That completely changed what I built. If I hadn't asked, I would have built a generic progress bar showing technical steps. Instead, I built exactly what they told me they needed.

**Outcome:** The re-clicking stopped completely. The owner said the dashboard "feels faster" even though the actual sync time didn't change. The meta-lesson is about self-awareness: I almost let my engineering perspective override the user's reality. The moment I caught that instinct and chose to ask instead of assume was the moment the solution became right. I try to watch for that impulse now in every project — "am I solving the problem, or am I solving what I *think* the problem is?"

---

### Top 20 Questions for This Round

| # | Question | Best Story | Key Point to Hit |
|---|---|---|---|
| 1 | Conflict with a teammate — how did you handle it? | #6 Unconventional Approach | Listened to their concerns first, built case around their values |
| 2 | Collaborate across teams or disciplines | #9 Daily Log Form | Iterated directly with non-technical end users over multiple rounds |
| 3 | Disagree with your manager's decision | #7 Risky Path | Presented both options honestly, let them decide with full info |
| 4 | Received tough feedback — how did you respond? | #9 Daily Log Form (v1 failed) | Took the feedback, didn't take it personally, iterated |
| 5 | Explain technical concepts to non-technical people | #6 Unconventional Approach | Framed as cost/accuracy/control, not technical details |
| 6 | Project wasn't going well — what did you do? | #4 Untrustworthy Data | Owned the flaw in my design, was transparent, redesigned |
| 7 | Stay aligned across time zones / remote work | #9 Daily Log Form | Async feedback loops, checking back after each change |
| 8 | Give difficult feedback to someone | #6 Unconventional Approach | Framed as "here are two options" not "you're wrong" |
| 9 | Describe your communication style | All stories | "I listen first, present options honestly, and let the best reasoning win" |
| 10 | Time you had to persuade someone | #6 Unconventional Approach | Met them where they were, addressed their priorities not mine |
| 11 | How do you handle working with someone whose style is very different from yours? | #9 Daily Log Form | Adapted my approach to match how managers work (mobile, end of shift, quick taps) |
| 12 | Tell me about a time you made a mistake in communication | #4 Untrustworthy Data | Didn't surface the data accuracy issue soon enough — learned to be upfront faster |
| 13 | How do you build trust with new teammates or stakeholders? | #7 Risky Path | Being honest about downsides, not just selling the upside |
| 14 | Describe a time you had to say "I don't know" or "I was wrong" | #8 Siding with User | Caught myself dismissing a UX issue, admitted my instinct was wrong |
| 15 | How do you keep stakeholders updated on progress? | #2 Real-Time Progress | Built live updates; for people, I believe in proactive status over silence |
| 16 | Tell me about a time you helped someone else grow or succeed | #9 Daily Log Form | Empowered managers to give structured input — elevated their voice in the business |
| 17 | How do you handle ambiguity in requirements? | #4 Untrustworthy Data / #5 Reverse-Eng | Started building, discovered the real requirements through real data |
| 18 | Describe a time you had to adapt your communication for a different audience | #6 Unconventional Approach | Same recommendation, completely different framing for a non-technical owner |
| 19 | What's your approach when someone pushes back on your idea? | #6 Unconventional Approach | "What if they said no? I'd build their way and track data for a future conversation" |
| 20 | Tell me about a time you dropped the ball. What did you learn? | #4 Untrustworthy Data | Original sync design was flawed, owned it, told the owner, redesigned from scratch |

---

### 60-Second Cheat Sheet (Last-Minute Review)

**My core narrative for this round (recruiter flagged: support the team/leadership, teamwork):**
- **I support the team by making others' jobs easier.** I built the daily log form so managers could contribute structured data. I laid out options clearly so the owner could make informed decisions. I don't just do my work — I make the people around me more effective.
- **I support leadership by being honest and trustworthy.** When the data was wrong, I told the owner directly. When the risky path had downsides, I didn't hide them. Leaders can only make good decisions when the people around them give straight information.
- **I listen before I advocate.** In every disagreement, I start by understanding what the other person values — then I build my case around their priorities, not mine.
- **I treat feedback as the most useful input, not criticism.** When the daily log form v1 failed, when the dashboard numbers were wrong, when the user kept re-clicking — each one taught me something I couldn't have figured out alone.

**If you blank on a question, start with:** "That reminds me of a project where I was building tools for a restaurant owner..." — then pick whichever story fits the theme.

**Remember for Will specifically:**
- He's remote (NYC, Riot is mostly LA) — distributed/async communication stories will resonate
- Show you think about *how* you communicate, not just *what* you communicate
- "We" for team outcomes, "I" for your specific actions
