# Riot Games Interview — Overview & Shared Prep

## Schedule

| Day | Time (PDT) | Round | Interviewer | Type |
|-----|-----------|-------|-------------|------|
| Apr 8 | 1:00-2:00pm | Innovative Problem Solving | Alex Vejnoska | Technical/Creative |
| Apr 8 | 3:00-4:00pm | Game of Life | Jacob Williams | Coding Presentation |
| Apr 10 | 2:00-3:00pm | Player and Mission Focus | Teresa Triliegi | Behavioral |
| Apr 10 | 3:00-4:00pm | Communicate and Collaborate | Will Cohen | Behavioral |
| Apr 13 | 2:00-3:00pm | Deep Tech | Fernando Micalli | Technical |

**Google Meet (all rounds):** https://meet.google.com/gtt-tsuz-ing

---

## What Could Be Tested & What to Worry About

### Round 1: Innovative Problem Solving (Apr 8 — Alex Vejnoska, UX Design Lead)
**Likely format:** Open-ended design/UX problem, NOT a coding interview
**Could be tested:**
- Designing a player-facing feature from scratch (e.g., Pick'Em, champion select redesign)
- Frontend architecture decisions with UX tradeoffs
- Creative problem solving for a real problem the Esports team faces
- Page load optimization or performance with a UX lens

**Worry about:** Jumping into technical details before understanding the user/player. Alex is a UX design leader — lead with "who is this for?" and "what does the player experience look like?" before "how do we build it."

**Full study guide:** See [round-1-innovative-problem-solving.md](round-1-innovative-problem-solving.md)

---

### Round 2: Game of Life (Apr 8 — Jacob Williams)
**Likely format:** Walkthrough and discussion of your take-home submission
**Could be tested:**
- Why you made specific design decisions in your code
- How you'd extend or refactor it (new features, scale, edge cases)
- Code quality, readability, TypeScript patterns
- Testing approach and how you'd improve it

**Worry about:** Not being able to explain your own code fluently. Practice walking through it out loud before the interview.

---

### Round 3: Player and Mission Focus (Apr 10 — Teresa Triliegi)
**Likely format:** Behavioral — STAR/SAO stories
**Could be tested:**
- Times you put the user/customer first, even when it was hard
- Prioritization and saying no to stakeholders
- Empathy and player-centric thinking
- How you handle competing priorities across teams

**Worry about:** Generic answers that don't show genuine player empathy. Every story should connect back to impact on the end user.

---

### Round 4: Communicate and Collaborate (Apr 10 — Will Cohen)
**Likely format:** Behavioral — STAR/SAO stories
**Could be tested:**
- Conflict resolution with teammates or cross-functional partners
- Giving and receiving feedback
- Working with designers, PMs, or non-engineers
- Communicating technical decisions to non-technical people

**Worry about:** Coming across as a "lone wolf." Use "we" over "I," show humility, and emphasize how you made the team better — not just yourself.

---

### Round 5: Deep Tech (Apr 13 — Fernando Micalli, Principal Engineer)
**Likely format:** Deep technical discussion, possibly whiteboard/system design
**Could be tested:**
- Node.js internals (event loop phases, process load balancing — Fernando's specialty)
- GraphQL architecture and the N+1 problem
- System design: real-time esports dashboard, rate limiter, scaling to millions of users
- Browser rendering pipeline, React internals, web performance
- "What happens when you type a URL" deep dive
- Serverless patterns, cold starts, Lambda optimization

**Worry about:** Surface-level answers. Fernando is a principal engineer who built the Esports API — he will go deep. Don't just say "use Redis for caching," explain eviction policies, cache stampede prevention, and tradeoffs.

---

### Overall: What Should Keep You Up at Night
1. **Culture rounds carry equal or greater weight than technical rounds** — technically strong candidates get rejected on behavioral. Don't under-prep rounds 3 and 4.
2. **"Why Riot?" will come up in almost every round** — have a specific, genuine answer ready.
3. **Gaming passion is expected** — be ready for questions about specific games, champions, or what you'd improve about Riot's products.
4. **Energy management on Apr 8** — you have two back-to-back rounds with a 1-hour gap. Stay hydrated, take a real break between them.

---

## Riot's 5 Core Values (Memorize These)

1. **Player Experience First** — Listen, learn, engage with players. Every decision centers on them.
2. **Dare to Dream** — Seek unique perspectives, experiment, embrace failure as part of the journey.
3. **Thrive Together** — Respect and invest in each other, succeed as one team.
4. **Execute with Excellence** — Ambitious goals, measure against results, iterate.
5. **Stay Hungry; Stay Humble** — Celebrate wins, learn from failures, keep evolving.

---

## Riot's Tech Stack (Know This Cold)

### Web Engineering
- **Frontend:** React, TypeScript, CSS-in-JS
- **Frameworks:** Next.js, Astro, SvelteKit (actively exploring/adopting)
- **State Management:** Redux
- **Backend (web services):** Node.js with Koa framework, GraphQL
- **Hosting/PaaS:** Netlify, Vercel

### Platform-Wide
- **Backend services:** Java and Go are the two primary languages
- **Infrastructure:** Fully on AWS (migrated from on-prem, closed last data center)
- **Orchestration:** Amazon EKS (Kubernetes) — 246 clusters managed with Terraform + Karpenter
- **Evolution:** Bare metal -> Docker/rCluster -> Mesos (Admiral) -> Amazon EKS

### Key Engineering Initiatives
- **AWS Full Migration** — Closed their last data center, saving ~$10M/year in infrastructure costs
- **EKS at Scale** — 246 Kubernetes clusters, reduced infrastructure provisioning time by 90%
- **League Client** — Uses Chromium Embedded Framework (CEF) with HTML5/JS — web tech powering a desktop app
- **Esports API** — Built with GraphQL + Serverless + Node.js + Lambda, handles massive traffic spikes during live events like Worlds
- **React SSR** — Published patterns for server-side rendering with React, Koa, and Redux on their tech blog

### Web Teams You'd Likely Join
- **Riot Web Ecosystem** — Account creation, game discovery, player portal (the gateway for millions of players)
- **Esports Platform & Experiences** — LoLEsports.com, ValorantEsports.com, Pick'Em, and related properties

---

## Things to Reference in Interviews (Show You've Done Homework)

Use these naturally in conversation — don't force them, but drop them when relevant:

1. "I read your tech blog series on running online services and was impressed by the evolution from rCluster to EKS across 246 clusters"
2. "I noticed the web teams use React with TypeScript and are exploring frameworks like Next.js and Astro — I have experience with [your relevant framework]"
3. "The League Client architecture using CEF with HTML5/JS is a fascinating approach to bridging web tech and desktop"
4. "I saw the Esports Platform handles real-time data at massive scale during events like Worlds — I'd love to work on problems like that"
5. "Your move to AWS and the infrastructure cost savings through EKS adoption shows strong engineering discipline"
6. "I appreciate that Riot uses S.A.O. — Setting, Action, Outcome — it keeps things focused"

---

## General Interview Tips

### Before Each Round
- Have water nearby
- Have a notepad for jotting down questions
- Test your camera/mic
- **"Why Riot?"** gets asked in nearly every round — have a specific answer ready, not just "I like games"

### During Each Round
- **Ask clarifying questions** before answering
- **Think out loud** during technical rounds
- **Use STAR/SAO method** for behavioral rounds (Setting/Situation, Action, Outcome/Result)
- **Prepare 2-3 questions** for each interviewer about their team/work

### Questions to Ask Interviewers
- "What's the most interesting technical challenge your team has faced recently?"
- "How does your team balance innovation with shipping on time?"
- "What does a typical day look like for a web engineer on your team?"
- "How does Riot's player-first philosophy show up in your team's daily work?"
- "What's something you wish you knew before joining Riot?"

---

## Prep Week Checklist (Now through Apr 7)

- [ ] Memorize Riot's 5 core values
- [ ] Write out 6-8 STAR/SAO stories (covering all behavioral themes)
- [ ] Practice explaining your Game of Life implementation out loud (record yourself)
- [ ] Review web fundamentals: browser rendering, event loop, HTTP/2, caching
- [ ] Study Node.js internals: event loop phases, process load balancing, streams
- [ ] Study GraphQL: schema design, resolvers, DataLoader, N+1 problem
- [ ] Practice 2-3 system design problems (rate limiter, esports API, real-time dashboard)
- [ ] Fix the output bug in `life.ts` (line 75)
- [ ] Play Riot's games if you don't already — at minimum try Valorant or League
- [ ] Read Riot's tech blog: technology.riotgames.com (especially React SSR and Running Online Services posts)
- [ ] Practice with Draw.io/Diagrams.net (used for system design interviews)
