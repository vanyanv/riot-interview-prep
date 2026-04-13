# Riot Games FE Interview — Web Research Sources & Dead Ends

> **Purpose:** plain reference doc compiled from deep web research on 2026-04-12 for the 2026-04-13 Riot SWE (Web) Frontend System Design round. NOT integrated into the active-recall study site — open this file once to browse sources manually, then return to [study.html](../study.html) for practice.

## TL;DR — Honest bottom line

**Zero verbatim "design X" FE system design prompts are publicly retrievable** for Riot Games onsite rounds. Blind posts (the most likely source) are Next.js client-rendered, so WebFetch can only see skeleton loaders. Glassdoor returns HTTP 403 to automated requests. The intel below is everything that *was* retrievable.

---

## 1. Primary sources (verified, real Riot Games)

### github.com/RiotGamesMinions/frontend_test
Verified real Riot Games org. Three take-home prompts, vanilla JS, no third-party libs, README says "shouldn't take longer than a few hours."

1. **Image Rotator** — cycle Katarina skins every 3 seconds with correct title/description per frame. Bonus for inter-slide animation.
2. **Tabbed Content** — functional tabbed container, click to swap content.
3. **Text Search** — count occurrences of a word or phrase; "words can be contained within multiple levels of HTML elements, and phrases may cross those HTML element boundaries." (The cross-boundary clause is the subtle correctness trap — `innerHTML.match` is wrong because it embeds tag markup; walk DOM text nodes via TreeWalker.)

**These are take-homes, NOT onsite FE system design.** But they're the only primary-source signal on what Riot considers a "good" FE submission: vanilla-JS fluency, creativity, catching subtle constraints.

### Riot's official interview process page
- Corporate careers page describes the general loop but not specific FE system design prompts.

### League Client FE JD (and similar senior FE postings)
- Verbatim phrase: *"build outstanding system designs to serve millions of players reliably."* This is the scale-framing Riot explicitly wants to hear.

---

## 2. Blind URLs — open these MANUALLY in a browser

WebFetch can't scrape these because they're Next.js client-rendered. Open in a real browser, ideally logged in.

- `teamblind.com/post/Riot-Games-Front-End-Engineer-Interview-Help-dKbE463i`
- `teamblind.com/post/riot-games-onsite-tips-yszlcqdc`
- `teamblind.com/post/Riot-Games-on-site-interview-process-JTYYuXZc`
- Search Blind for: `Riot games broad and deep tech interview`
- Search Blind for: `Riot games senior frontend onsite`
- Search Blind for: `Riot games SWE web interview`

**What to look for when you open them:**
- Specific "design X" prompts quoted by candidates
- Round duration and format breakdown
- Interviewer name mentions (corroborate Fernando Micalli)
- Debugging scenarios reported from the final 15 min
- Tool mentions (Draw.io, Excalidraw, etc.)
- Anything about the lunch interview format

---

## 3. Prepfully (Riot SWE SD question bank — backend-skewed)

Prepfully crowd-sourced question summaries from Riot candidates. **Not tagged FE specifically**, but surfaced on Web-role prep pages:

- Develop a micro-posting service similar to Twitter
- Build a distributed system to manage time-series data
- Design a recommendation system for finding friends on social networks
- Design a platform for real-time monitoring of cloud infrastructure
- **Design a rate limiter** (canonical Riot backend SD prompt, repeated across summaries)

**Signal:** Riot's SD bank skews backend even for Web roles. On an "FE system design" prompt, be ready to draw the backend pipeline first (queue → processor → hot store → fan-out gateway → client), then zoom into the client.

---

## 4. Round format / logistics (highest-confidence Blind intel)

From the "Riot games onsite tips" Blind thread (via search-snippet summaries that surfaced repeatedly):

- **5 hours total, fully virtual** post-COVID
- **2 behavioral interviews** (culture weighted heavily per every source)
- **1 evaluated lunch** (informal but still a signal)
- **1 coding + depth-of-engineering round** (often a take-home review if a take-home was submitted)
- **1 systems design round** ← target round
- Video: Google Meet, 1-on-1 or 2-on-1 panel
- Tool: **Draw.io / Diagrams.net** confirmed

**Deep tech round verbatim definition** (from Blind "Riot games broad and deep tech interview"):
> "The deep tech interview typically involves a system design question that may not be in-depth (no diagrams required), but rather a high-level discussion about what microservices might be needed, what microservices are, and what types of protocols would be used. Additionally, you may be asked to write code on what classes you might use in an OOP language, and in the last 15 minutes, there may be a question on how you would debug a live issue."

**Translation for FE:** conversational depth > whiteboard diagrams. Expect to sketch component interfaces / hooks / store slices in code mid-round. Last ~15 min is a live-debug scenario — prep ONE frontend prod-bug story in SAO format.

---

## 5. Critical disambiguation — do NOT prep these

### github.com/tryriot/frontend-interview-challenge
**NOT Riot Games.** `tryriot.com` is an HR-software company. Its challenge (Vue 3 + Tailwind employees table matching a Figma Community spec) has nothing to do with Riot Games. AI summarizers frequently conflate them due to the name collision.

### github.com/riot/riot
**NOT Riot Games.** This is Riot.js, a micro-UI library. Unrelated.

### "Riot frontend challenge" search results
The Figma Community file with this name is tied to tryriot.com, not Riot Games.

---

## 6. Sources searched — yielded content

- `github.com/RiotGamesMinions/frontend_test` (via gh API + raw files) ✓
- Prepfully Riot pages 1–4 ✓
- InterviewQuery Riot SWE guide ✓
- Riot's own interview process page ✓
- jointaro (one 2025 OA-stage experience) ✓
- Riot senior FE job descriptions (League Client, ESports Platform) ✓

## 7. Sources searched — DEAD ENDS (don't re-do these)

- **Glassdoor** all pages → HTTP 403 to WebFetch on every attempt
- **Blind** all posts → Next.js JS-rendered, only skeleton visible to scrapers
- **Nodeflair** Riot FE page → 403
- **Reddit** direct `site:reddit.com "Riot Games" "frontend" "system design"` searches → zero results for the specific combo
- **hellointerview.com** → Riot not covered
- **exponent.com** → Riot not covered
- **interviewing.io** → Riot not covered
- **LeetCode discuss** → no Riot FE system design threads surfaced

---

## 8. Evaluation signals (synthesized from all sources)

From the take-home README tone, senior FE JDs, and Blind snippets:

1. **Vanilla-JS fluency** — take-home bans libraries; expect "how does React batch this" over framework trivia
2. **Creativity / finesse** on open-ended prompts (README explicit)
3. **Catching subtle prompt constraints** (text-search cross-boundary is the canonical example)
4. **Full-system literacy on FE rounds** — backend first, then client
5. **Scale framing for "millions of players"** (verbatim from League Client JD)
6. **Trade-off articulation out loud** ("why X over Y")
7. **Cross-functional collab** embedded in the design (designer wants X, API can't, how handle?)
8. **Live-debug / observability story** for the final ~15 min

---

## 9. Prep checklist for tomorrow

- [ ] Open the 4 Blind URLs above manually in a browser tonight — extract any verbatim prompts
- [ ] Run the 3 RiotGamesMinions problems timed (~30–45 min each) in vanilla JS — focus on the text-search cross-boundary trap
- [ ] Prep ONE frontend prod-bug story in SAO format (hydration mismatch / CDN invalidation / listener leak / bundle regression / async race)
- [ ] Have [Draw.io](https://app.diagrams.net) open in a second tab before the call
- [ ] Re-read the 7 walkthroughs in [frontend-system-design-prep.md](../frontend-system-design-prep.md) — they're your framework scaffolding
- [ ] Practice the player-first reframe: every technical decision ends with *"which means for the player, X"*
- [ ] Rehearse narrating backend first when a prompt has any backend smell
