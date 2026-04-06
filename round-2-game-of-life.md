# Round 2: Game of Life

**Date:** Apr 8, 2026 | **Time:** 3:00-4:00pm PDT | **Interviewer:** Jacob Williams

---

## Morning-of Checklist
- [ ] Re-read your `life.ts` code
- [ ] Practice your code walkthrough (aim for 5-7 min)
- [ ] Have code editor open with `life.ts` ready
- [ ] Remember: Jacob values clear communication and solid reasoning over clever tricks

---

## Know Your Interviewer

- **Role:** Principal Software Engineer (progressed Senior -> Staff -> Principal)
- **Background:** B.S. in Psychology/Neuroscience from Yale — self-taught engineer. Co-founded two startups (Spylight, Tastiii) as CTO.
- **Stack:** Web development, Ruby on Rails, JavaScript, jQuery, CSS
- **What this means for you:** Jacob came from a non-traditional background and taught himself engineering, then became a CTO, then Principal at Riot. He values problem-solving ability over pedigree. He'll appreciate clear communication and solid reasoning over clever tricks. As a web engineer, he'll care about code quality and design decisions.

---

## What This Round Tests

Your coding ability, design decisions, and ability to present/discuss technical work. Riot's format: **you build Game of Life beforehand, then present and discuss your implementation live.**

---

## Your Implementation: `life.ts` — Know It Cold

### Architecture (walk through in this order)

1. **Input parsing** (lines 55-63): Read Life 1.06 format from stdin, skip header, parse coordinates into `Set<string>`
2. **Neighbor counting** (lines 18-36): For each alive cell, increment counts for all 8 neighbors using offset table
3. **Next generation** (lines 38-53): Apply Conway's rules — birth (3 neighbors), survival (2 neighbors on alive cell), death (everything else)
4. **Simulation loop** (lines 66-70): Run 10 generations
5. **Output** (lines 73-76): Print in Life 1.06 format

### Key Design Decisions — Be Ready to Explain

| Decision | Why | Tradeoff |
|----------|-----|----------|
| `Set<string>` for alive cells | O(1) lookup, sparse representation for infinite grid | String hashing is slower than native; concatenation overhead |
| `BigInt` for coordinates | Problem requires 64-bit signed integers (-2^63 to 2^63-1) | Slower arithmetic than regular numbers |
| String keys (`"x,y"`) | JS Sets/Maps use reference equality for objects, so strings are needed for value-based lookup | Memory overhead from string allocation |
| Sparse representation | Grid is effectively infinite — can't allocate a 2D array | Must iterate alive cells, not grid positions |
| Pre-computed neighbor offsets | Avoid recalculating 8 directions each time | Minor — just cleaner code |

#### Deep Dive: `Set<string>` for alive cells
- **What O(1) lookup means in plain English:** When you need to ask "is this cell alive?", the Set gives you the answer instantly no matter how many cells exist. It's like looking up a word in a dictionary by flipping straight to the page, rather than reading every page from the start. Without O(1) lookup, checking whether a cell is alive would require scanning the entire list of alive cells every single time — and you do this check *constantly* during neighbor counting.
- **What sparse representation means:** Instead of creating a gigantic grid and marking most of it as "dead," you only store the cells that are alive. Imagine tracking which seats in a stadium have people in them. You wouldn't create a spreadsheet with 80,000 rows and mark 79,500 as "empty." You'd just keep a list of the occupied seats. That's what a sparse representation does.
- **The tradeoff:** String hashing (`"123,456"`) is slower than hashing a raw number because JavaScript has to process each character. And you're creating a new string every time you build a key. In a hot loop processing millions of cells, this adds up. But for the problem's scale, it's perfectly fine.
- **How to say it to Jacob:** "I used a Set of strings because the grid is infinite — I can't allocate a 2D array for 64-bit coordinates. The Set gives me constant-time lookups for neighbor checks. The tradeoff is that string keys have some overhead compared to numeric hashing, but for this problem size it's the right balance of simplicity and performance."

#### Deep Dive: `BigInt` for coordinates
- **Why regular numbers don't work:** JavaScript's `Number` type uses 64-bit floating point, which can only represent integers exactly up to 2^53. The problem requires coordinates up to 2^63 — that's roughly 10 billion times larger. If you used regular numbers, coordinates near the edges of the grid would lose precision. Imagine a GPS that works fine in your city but starts rounding to the nearest mile when you go overseas — same idea.
- **The cost:** `BigInt` math in V8 is roughly 10-100x slower than regular number math. Every addition, subtraction, and comparison is more expensive. It's like doing arithmetic with Roman numerals instead of regular digits — you get the right answer, but it takes longer.
- **How to say it to Jacob:** "The spec says coordinates can be 64-bit signed integers, which goes beyond what JavaScript's Number type can represent exactly. BigInt handles arbitrary precision, so no coordinates get silently truncated. It's slower, but correctness matters more here — you don't want cells drifting to wrong positions because of floating-point rounding."

#### Deep Dive: String keys (`"x,y"`)
- **The real problem:** In JavaScript, if you create two objects `{x: 1, y: 2}` and `{x: 1, y: 2}`, they are *different objects* even though they have the same values. So `Set.has({x: 1, y: 2})` would always return false — it's comparing memory addresses, not contents. It's like having two identical house keys cut from the same mold — they open the same door, but they're physically different keys.
- **Strings solve this:** The string `"1,2"` is always equal to another string `"1,2"` in JavaScript. Strings are compared by value, not by reference. So converting coordinates to strings gives you value-based equality for free.
- **The alternative:** You could write a custom hash function that turns `(x, y)` into a unique number, then use a Map. This is faster but adds complexity and potential bugs (hash collisions). For a take-home exercise, the string approach is the right call — clear, correct, and simple.
- **How to say it to Jacob:** "JavaScript's Set uses reference equality for objects, so I can't just store `{x, y}` pairs — two different objects with the same coordinates would be treated as different entries. Converting to `'x,y'` strings gives me value-based comparison. It's a bit more memory than a custom hash, but it's dead simple and bug-free."

#### Deep Dive: Sparse representation
- **Why you can't use a 2D array:** The coordinate space spans from -2^63 to 2^63-1. That's roughly 18 quintillion values on each axis. If you tried to allocate a 2D array to cover even a fraction of this, you'd need more memory than exists on Earth. Even a 1,000x1,000 array would only cover a tiny speck of the possible space.
- **How sparse representation works:** You only store the cells that are alive. The "grid" is implicit — there's no data structure representing empty space. To find neighbors, you compute the 8 neighboring coordinates mathematically and check if they exist in your Set. It's like a phone book that only lists people who actually have phones, not every possible phone number.
- **How to say it to Jacob:** "The grid is effectively infinite since it uses 64-bit coordinates, so I went with a sparse representation — just a Set of alive cells. There's no background grid; dead cells simply don't exist in memory. The tradeoff is that you can't do things like 'iterate over all cells in a region,' but for Game of Life you never need to — you only care about alive cells and their immediate neighbors."

#### Deep Dive: Pre-computed neighbor offsets
- **What this means:** Instead of writing out 8 separate coordinate calculations (x-1/y-1, x-1/y, x-1/y+1, x/y-1, etc.) inside the loop, you store the 8 direction offsets in an array once and loop over them. It's a minor code organization choice, not a performance optimization.
- **Why it matters to mention:** It shows you think about code readability. A reviewer scanning your code sees a clean loop over offsets instead of 8 hardcoded additions. It's easier to verify correctness — "are all 8 directions covered?" is obvious when they're in a table.
- **How to say it to Jacob:** "I pulled the 8 neighbor offsets into a constant array. It doesn't really change performance — it's just cleaner to read and harder to accidentally miss a direction."

---

### Known Issues to Acknowledge Proactively

**Why bring these up yourself:** Jacob is a Principal engineer — he *will* notice these issues. If you mention them first, it shows self-awareness and code maturity. If he spots them and you haven't mentioned them, it looks like you missed them. Think of it like a job interview where they ask "what's your weakness" — having a real, thoughtful answer is way better than being caught off guard.

#### 1. Output bug (line 75)
- **The issue:** `console.log(cell.replace(',', ' '), '\n')` passes `'\n'` as a second argument to `console.log`, which prints a literal newline *after* the one `console.log` already adds. So every line of output has a blank line after it.
- **Why it matters:** The output won't match the expected Life 1.06 format. Any automated grading or diffing would flag this. It's a small bug, but it's the kind of thing that shows attention to detail — or lack thereof.
- **The fix:** Just remove the `'\n'` argument: `console.log(cell.replace(',', ' '))`. `console.log` already appends a newline.
- **How to bring it up:** "One thing I noticed after submitting — there's a bug on line 75 where I'm passing an extra newline to console.log. It adds a blank line between each coordinate in the output. Easy fix, just remove the second argument. I should have caught it in testing."

#### 2. No input validation
- **The issue:** The code assumes the input is a well-formed Life 1.06 file. If someone passes garbage input, malformed coordinates, or a different file format, the code will either crash with an unhelpful error or silently produce wrong results.
- **Why it matters:** In production code, you never trust input. Even internal tools get fed unexpected data — someone copies the wrong file, a pipeline sends stale data, a format changes. Defensive parsing is a sign of engineering maturity.
- **The fix:** Add checks for: (1) the `#Life 1.06` header on the first line, (2) each subsequent line being exactly two space-separated integers, (3) coordinate values being within the 64-bit signed integer range. Throw clear error messages: "Expected Life 1.06 header, got: [whatever]" so the user knows exactly what went wrong.
- **How to bring it up:** "I didn't add input validation, which I'd definitely do in production code. I'd check for the Life 1.06 header, validate that each line has exactly two integers, and give clear error messages on bad input. For a take-home exercise I focused on the algorithm, but in real code that's a must."

#### 3. Hardcoded generations
- **The issue:** `GENERATIONS = 10` is baked into the code. If someone wants to run 100 or 1,000 generations, they'd have to edit the source file.
- **Why it matters:** It's a usability issue and a code-flexibility issue. Hardcoded values like this are a code smell — they make the program rigid and harder to use in different contexts (testing, scripting, experimentation).
- **The fix:** Accept it as a command-line argument with a sensible default: `const generations = parseInt(process.argv[2]) || 10;`. That way `ts-node life.ts < input.txt` still runs 10 generations, but `ts-node life.ts 100 < input.txt` runs 100. Even simpler, you could accept it as a flag: `--generations 100`.
- **How to bring it up:** "The generation count is hardcoded to 10 right now. In practice I'd accept it as a CLI argument with 10 as the default. It's a small thing, but it makes the tool more flexible for testing and experimentation."

---

## Potential Follow-Up Questions & Answers

### "Why not use a 2D array?"

**What Jacob is really testing:** Do you understand the constraints of the problem, and can you justify your data structure choice with reasoning rather than just habit?

- **The plain-language answer:** The coordinate space goes from negative 9 quintillion to positive 9 quintillion on each axis. You literally cannot create an array that large — there isn't enough memory on any computer that exists. Even if coordinates happened to be small in a given input, you'd be making an assumption the spec doesn't guarantee. A sparse Set only stores what's alive, so memory scales with the number of living cells, not the size of the universe they live in.
- **Analogy:** It's like tracking stars in the Milky Way. You wouldn't build a 3D grid of the entire galaxy and mark each cube as "star" or "empty." You'd keep a list of star positions. The galaxy is mostly empty space — and so is a Game of Life grid.
- **How to say it conversationally:** "The coordinate space uses 64-bit signed integers, so it's astronomically large — you can't allocate an array anywhere near that size. The sparse approach means I only pay for cells that are actually alive. For a pattern with 1,000 living cells in a universe of quintillions of possible positions, that's a huge win."

### "How would you optimize this?"

**What Jacob is really testing:** Can you think critically about performance bottlenecks, and do you know about algorithmic improvements beyond the naive approach? He's not expecting you to have implemented these — he wants to see that you know where the performance ceilings are and what the landscape of solutions looks like.

Several options, from simplest to most advanced:

- **Avoid string keys:** Right now, every neighbor check builds a string like `"123,456"`. String creation and hashing is expensive in a tight loop. Instead, you could write a hash function that combines two BigInts into a single numeric key and use a custom hash map. This eliminates thousands of string allocations per generation.
  - **Think of it like:** Instead of writing someone's full address on an envelope every time you want to check if they're home, you assign each house a short numeric code.
  - **How to say it:** "The biggest low-hanging fruit is eliminating string keys. Every neighbor check currently allocates a new string, which is expensive in a hot loop. A custom hash function mapping coordinate pairs to numeric keys would cut allocation overhead significantly."

- **Track changed regions:** Most cells don't change between generations. If a region of the grid was stable last generation and no cell near it changed, it'll be stable again. You can keep a "dirty set" of cells that changed and only recompute their neighborhoods.
  - **Think of it like:** When you proofread a document, you don't re-read pages you haven't edited. You go straight to the parts that changed.
  - **How to say it:** "You could track which cells changed each generation and only recompute neighborhoods around those cells. Most of the grid is stable most of the time, so this avoids a ton of redundant work."

- **Bitwise/SIMD:** For dense regions where most cells are alive, pack 64 cells into a single 64-bit integer and use bitwise operations to compute the next generation for all 64 at once. This is how high-performance Game of Life implementations work.
  - **Think of it like:** Instead of counting coins one by one, you weigh the whole stack and divide by the weight of one coin.
  - **How to say it:** "For dense patterns, you can pack cell states into bits and use bitwise operations to process 64 cells at once. It's a lot more complex to implement, but the throughput increase is dramatic."

- **HashLife algorithm:** The most advanced approach. It uses a quadtree to recursively divide the grid and memoizes the result of evolving each sub-pattern. If the same 8x8 block appears in multiple places (or across multiple generations), you only compute it once. For patterns with any regularity, this gives exponential speedups — you can compute generation 2^60 almost instantly if the pattern is periodic.
  - **Think of it like:** If you're computing compound interest for 100 years, you don't multiply one year at a time. You notice that doubling the time period just means squaring the result, so you can skip ahead exponentially. HashLife does the same thing for spatial patterns.
  - **How to say it:** "The gold standard for Game of Life is HashLife — it's a quadtree-based algorithm that memoizes repeating sub-patterns. If any part of the grid repeats across space or time, it caches the result and skips ahead. For patterns with regularity, it can compute trillions of generations in seconds. I didn't implement it here because it's a significant complexity jump, but it's what I'd reach for if performance mattered at scale."

### "What's the time/space complexity?"

**What Jacob is really testing:** Can you analyze your own code's complexity correctly and communicate it clearly? This is bread-and-butter CS fundamentals.

- **Time — the plain-language version:** For each generation, you look at every alive cell and count neighbors for all 8 surrounding positions. So if you have N alive cells, you do roughly 8N operations per generation — which simplifies to O(N). Run that for G generations and you get O(G x N) total. The key insight: cost scales with the number of *alive* cells, not the size of the grid. A glider on a 2^63 grid costs the same as a glider on a 100x100 grid.
- **Space — the plain-language version:** You store the alive cells in a Set (N entries) and a neighbor-count Map during each generation step. The Map can have up to ~8N entries (each alive cell contributes counts to 8 neighbors). So total space is O(N). After each generation, the old Set and Map get garbage collected.
- **How to say it conversationally:** "Time is O(N) per generation where N is alive cells — each cell touches 8 neighbors, so it's really O(8N), which is just O(N). Space is also O(N) — the Set of alive cells plus a temporary neighbor count Map that's at most 8x the alive cell count. Everything scales with the living population, not the grid size."

### "How would you add a visualization?"

**What Jacob is really testing:** Can you think beyond the algorithm into the web platform? As a Web SWE, he wants to see that you know the browser APIs and can think about user experience, rendering performance, and architecture.

- **The plain-language answer:** Use the Canvas API to draw each living cell as a filled rectangle. On each generation, clear the canvas and redraw. Use `requestAnimationFrame` for smooth 60fps animation — it syncs your drawing with the browser's refresh cycle so you don't get janky updates or wasted frames.
- **For large patterns:** You can't draw millions of cells at once. Implement a viewport — only render cells visible on screen. Add pan (click and drag) and zoom (scroll wheel) so the user can navigate. This is exactly how Google Maps works — you only render the tiles you can see.
- **For really heavy patterns:** Move the simulation to a Web Worker so it doesn't block the main thread. The UI stays responsive (pan, zoom, pause, play) while the Worker crunches the next generation in the background. Use `OffscreenCanvas` if you want the Worker to handle rendering too, or just post the cell data back to the main thread for drawing.
- **WebGL for extreme scale:** If Canvas 2D becomes the bottleneck (tens of thousands of draw calls), switch to WebGL. You can render each cell as a point sprite or instance a quad — the GPU can draw millions of cells per frame. Overkill for most patterns, but it's the right answer for "what if you had a million live cells?"
- **How to say it conversationally:** "I'd use Canvas 2D for rendering — draw each cell as a filled rectangle, clear and redraw each generation. requestAnimationFrame gives smooth animation. For large patterns, I'd add viewport culling and pan/zoom so you're only drawing what's on screen. If the simulation gets heavy, I'd move it to a Web Worker so the UI stays responsive. And if we're talking about huge populations, WebGL can render millions of cells per frame by leveraging the GPU."

### "How would you support different rule sets?"

**What Jacob is really testing:** Can you identify the right abstraction boundary and make code flexible without overcomplicating it? This is about software design instincts.

- **The plain-language answer:** Conway's Game of Life uses specific rules — a dead cell is born if it has exactly 3 alive neighbors, a living cell survives if it has 2 or 3 neighbors, and dies otherwise. But these numbers (3 for birth, 2 and 3 for survival) are just configuration. There's a whole universe of "Life-like" automata with different rules — "HighLife" uses birth on 3 or 6, "Day & Night" uses birth on 3/6/7/8 and survival on 3/4/6/7/8. Each one produces wildly different behaviors.
- **The fix:** Extract the rules into a config object: `{ birth: [3], survival: [2, 3] }`. The `nextGeneration` function checks `rules.birth.includes(count)` instead of `count === 3`. That's it — one tiny change and your engine supports hundreds of different rule sets.
- **Analogy:** It's like a board game where the rules say "roll 6 to win." If you hardcode "6" everywhere, you can only play one game. If you make the winning number a setting, suddenly you can play any variant without rewriting the game.
- **How to say it conversationally:** "The birth and survival conditions are really just parameters. I'd pull them into a config object like `{ birth: [3], survival: [2, 3] }` and check against that instead of hardcoding the numbers. The core algorithm — counting neighbors and applying rules — stays identical. It's a small refactor that opens up the whole family of Life-like automata."

### "How would you handle this at scale — billions of cells?"

**What Jacob is really testing:** Can you think about distributed systems and real-world engineering constraints? This is a "zoom out" question — he wants to see if you can move from algorithmic thinking to systems thinking.

- **The plain-language answer:** A single machine can't hold billions of cells in memory or process them fast enough. You need to split the work across multiple machines.
- **Partition the grid into chunks:** Divide the coordinate space into rectangular regions, assign each to a different machine (or Web Worker on a single machine). Each chunk processes its own cells. The tricky part: cells on the boundary of a chunk need neighbor data from adjacent chunks, so you have to communicate boundary data between chunks each generation. This is called a "ghost cell" or "halo exchange" pattern — each chunk shares a 1-cell-wide border with its neighbors.
  - **Think of it like:** Dividing a jigsaw puzzle among friends. Each person works their section, but where pieces meet, you have to coordinate to make sure the edges line up.
- **Use HashLife for regularity:** Many interesting Game of Life patterns are highly regular — gliders, oscillators, spaceships. HashLife exploits this by memoizing sub-patterns, potentially skipping billions of generations in seconds.
- **Stream output:** With billions of cells, you can't build the full output in memory and then print it. Write coordinates to a file or stream as you go — process a chunk, output its cells, move to the next chunk.
- **How to say it conversationally:** "At billions of cells, you need to distribute the work. I'd partition the grid into chunks that can be processed in parallel — the main coordination cost is exchanging boundary cells between adjacent chunks each generation. For patterns with repetition, HashLife can skip huge numbers of generations by caching sub-patterns. And the output needs to be streamed, not built in memory."

### "What if coordinates didn't need BigInt?"

**What Jacob is really testing:** Do you understand the performance implications of your choices, and can you identify which ones you'd change given different constraints?

- **The plain-language answer:** If coordinates fit in regular JavaScript numbers (integers up to 2^53), you'd drop BigInt entirely and see a massive performance improvement. BigInt arithmetic in V8 is roughly 10-100x slower than regular number arithmetic because it's not a primitive CPU operation — V8 has to do multi-precision math in software. Every addition, comparison, and hash computation gets faster. For a simulation running millions of operations per generation, that's the difference between "takes 1 second" and "takes 10-100 seconds."
- **What else changes:** Without BigInt, your string keys get shorter and cheaper to create. Or better yet, you could use a single number as a key by combining x and y via bit shifting: `key = x * MAX_COORD + y`. This avoids string allocation entirely and gives you the fastest possible hash lookups.
- **Analogy:** BigInt is like using a cargo truck to deliver a letter. It can handle any size package, but it's slow and expensive to operate. If you know the package is always small, switch to a bicycle — same destination, fraction of the cost.
- **How to say it conversationally:** "Dropping BigInt would be a huge performance win — easily 10x or more. Regular number arithmetic is a native CPU operation, while BigInt has to go through V8's software implementation. I'd also be able to use numeric keys instead of strings, which eliminates string allocation overhead in the hot loop. I used BigInt because the spec required 64-bit coordinates, but if the problem only needed 32-bit or 53-bit range, I'd absolutely use regular numbers."

---

## How to Present

**Pacing and timing:** You have roughly 60 minutes. Plan for 5-7 minutes of code walkthrough, leaving 50+ minutes for discussion. Jacob will drive the conversation after your initial presentation — the walkthrough is your opening act, not the main show. Rushing through all your code in 15 minutes is worse than covering the highlights in 5 minutes and having a great conversation.

### 1. Start with the problem (30-60 seconds)
- **What to say:** "The task was to implement Conway's Game of Life on an infinite grid with 64-bit signed integer coordinates, reading from and writing to the Life 1.06 format."
- **Why this matters:** It shows you understood the problem before diving into code. Jacob wants to know that you read the spec carefully — especially the 64-bit coordinate requirement, because that drives your biggest design decisions.
- **Specific phrases:** "The key constraint that shaped my design was the 64-bit coordinate space — that immediately ruled out any array-based approach and pushed me toward a sparse representation."

### 2. Explain your approach at a high level before showing code (1-2 minutes)
- **What to say:** Before scrolling through any code, give Jacob the 30-second mental model. "I represent the grid as a Set of alive cell coordinates. Each generation, I count neighbors for all cells adjacent to any alive cell, then apply Conway's rules to decide what lives and what dies."
- **Why high-level first:** Jacob is a Principal engineer who reads code all day. He doesn't need you to explain syntax. He needs to understand your *approach* so that when he sees the code, it confirms what he already expects. If you jump straight into code, he's trying to reverse-engineer your design from implementation details — that's harder for both of you.
- **Specific phrases:** "Let me give you the bird's-eye view first, then we'll look at the code..." or "At a high level, the approach is..."

### 3. Walk through the code function by function, not line by line (3-4 minutes)
- **What to do:** Follow the architecture order from above — input parsing, neighbor counting, next generation, simulation loop, output. For each function, explain *what* it does and *why*, not how each line works.
- **What NOT to do:** Don't read code aloud. Don't explain what `for` loops do. Don't narrate syntax. Jacob can read. Focus on the *decisions* embedded in the code.
- **If Jacob interrupts with a question mid-walkthrough:** Stop and answer it fully. Don't say "I'll get to that later." His question tells you what he's interested in — follow his lead. You can always come back to the walkthrough, but his curiosity in the moment is more valuable than your planned order.
- **Specific phrases:** "This function is responsible for..." or "The interesting part here is the design choice to..."

### 4. Call out tradeoffs proactively (weave throughout)
- **What to do:** When you get to a design decision, name the tradeoff before Jacob asks. "I chose strings as Set keys because JavaScript's Set compares objects by reference, not value. The downside is string allocation overhead in the hot loop — a custom hash would be faster but more complex."
- **Why this matters:** Naming tradeoffs unprompted is the single strongest signal of engineering seniority. Junior engineers defend their choices. Senior engineers acknowledge the costs. Principal engineers (like Jacob) live in tradeoff-land all day — when you speak that language, you're speaking his language.
- **Specific phrases:** "The tradeoff here is..." or "I deliberately chose X over Y because..." or "If I had more time, I'd revisit this decision because..."

### 5. Mention what you'd improve (1-2 minutes)
- **What to say:** After the walkthrough, proactively mention 2-3 things you'd change. Lead with the output bug (shows you actually tested and reflected), then mention input validation and the hardcoded generation count.
- **Why this matters:** Every codebase has issues. Jacob knows your code isn't perfect — he wants to see that *you* know it too. Self-awareness is a maturity signal. A candidate who says "I'd improve X, Y, and Z" is more impressive than one who claims their code is great.
- **Specific phrases:** "If I were to iterate on this, there are a few things I'd change..." or "I noticed after submitting that..." or "In production, I'd definitely add..."

### 6. Keep it conversational — don't lecture, discuss
- **What this means in practice:** Pause after making a point. Make eye contact (if on video). Ask if Jacob has questions before moving on. If he nods, move on. If he looks curious, invite the question: "Happy to go deeper on any of this."
- **If you get stumped or draw a blank:** Don't panic or ramble. Say "That's a great question — let me think about that for a second." Take 5-10 seconds of silence. Jacob will respect honest thinking time far more than a rushed, half-baked answer. If you're truly stuck, say "I don't have a great answer for that off the top of my head, but my instinct is..." and share your directional thinking. Saying "I'm not sure, but here's how I'd approach figuring it out" is a completely valid answer from a Principal-level interviewer's perspective.
- **If Jacob challenges your approach:** Don't get defensive. Say "That's a fair point" or "I hadn't thought about it that way." Then either explain your reasoning ("I went with X because...") or agree and build on it ("You're right, and if I were to redo it, I'd probably..."). Jacob is testing how you handle feedback, not whether your code is perfect.
- **Specific phrases to have ready:**
  - "That's a really good question..."
  - "I think the tradeoff there is..."
  - "I'm not sure about the specifics, but my intuition is..."
  - "That's something I'd want to benchmark before deciding..."
  - "You're right — if I had more time, I'd..."
