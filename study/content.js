/* ============================================================
   content.js — section metadata, highlight term list, transforms
   ============================================================ */

const SECTION_METADATA = [
  // ---------- Foundations ----------
  {
    id: 'foundations-building-blocks',
    group: 'Foundations',
    navTitle: 'The 15 Building Blocks',
    eyebrow: 'FOUNDATIONS · MENTAL MODEL',
    title: 'The 15 Building Blocks of System Design',
    sourceHeading: 'Building Blocks: The 15 Primitives',
    sourceFile: 'study/foundations.md',
    readTimeMin: 8,
    interviewerSignal: 'You compose primitives instead of memorizing systems',
    chunks: [
      { id: 'compute-routing', label: 'Compute & Routing', sourceSubheading: 'Compute & Routing', readTimeMin: 3 },
      { id: 'state', label: 'State', sourceSubheading: 'State', readTimeMin: 2 },
      { id: 'async-realtime', label: 'Async & Real-time', sourceSubheading: 'Async & Real-time', readTimeMin: 3 },
    ],
  },
  {
    id: 'foundations-7-themes',
    group: 'Foundations',
    navTitle: 'The 7 Frontend Themes',
    eyebrow: 'FOUNDATIONS · META-FRAMEWORK',
    title: 'The 7 Themes of Frontend System Design',
    sourceHeading: 'The 7 Themes of Frontend System Design',
    sourceFile: 'study/foundations.md',
    readTimeMin: 7,
    interviewerSignal: 'You use a consistent lens across every frontend problem',
    chunks: [
      { id: 'structure-communication', label: 'Structure & Communication', sourceSubheading: 'Structure & Communication', readTimeMin: 3 },
      { id: 'resilience', label: 'Resilience', sourceSubheading: 'Resilience', readTimeMin: 2 },
      { id: 'realtime-scale', label: 'Real-time & Scale', sourceSubheading: 'Real-time & Scale', readTimeMin: 2 },
    ],
  },
  {
    id: 'foundations-statelessness',
    group: 'Foundations',
    navTitle: 'Statelessness & Decisions',
    eyebrow: 'FOUNDATIONS · PRINCIPLE',
    title: 'Statelessness & the Decision Dictionary',
    sourceHeading: 'Statelessness & the Decision Dictionary',
    sourceFile: 'study/foundations.md',
    readTimeMin: 6,
    interviewerSignal: 'You can start any system design answer in 30 seconds',
    chunks: [
      { id: 'statelessness-principle', label: 'The Statelessness Principle', sourceSubheading: 'The Statelessness Principle', readTimeMin: 3 },
      { id: 'decision-dictionary', label: 'The Decision Dictionary', sourceSubheading: 'The Decision Dictionary', readTimeMin: 3 },
    ],
  },

  // ---------- Framework ----------
  {
    id: 'framework-step-1',
    group: 'Framework',
    navTitle: '1. Clarify Requirements',
    eyebrow: 'FRAMEWORK · STEP 1',
    title: 'Clarify Requirements',
    sourceHeading: 'Step 1: Clarify Requirements',
    readTimeMin: 4,
    interviewerSignal: 'You scope the problem before solving it',
  },
  {
    id: 'framework-step-2',
    group: 'Framework',
    navTitle: '2. High-Level Architecture',
    eyebrow: 'FRAMEWORK · STEP 2',
    title: 'High-Level Architecture',
    sourceHeading: 'Step 2: High-Level Architecture',
    readTimeMin: 7,
    interviewerSignal: 'You see the full system, not just the frontend',
  },
  {
    id: 'framework-step-3',
    group: 'Framework',
    navTitle: '3. Component Architecture',
    eyebrow: 'FRAMEWORK · STEP 3',
    title: 'Component Architecture',
    sourceHeading: 'Step 3: Component Architecture',
    readTimeMin: 6,
    interviewerSignal: 'You decompose UI into reusable, testable units',
  },
  {
    id: 'framework-step-4',
    group: 'Framework',
    navTitle: '4. State Design',
    eyebrow: 'FRAMEWORK · STEP 4',
    title: 'State Design',
    sourceHeading: 'Step 4: State Design',
    readTimeMin: 8,
    interviewerSignal: 'The core of frontend system design — Fernando bait',
  },
  {
    id: 'framework-step-5',
    group: 'Framework',
    navTitle: '5. API Contract',
    eyebrow: 'FRAMEWORK · STEP 5',
    title: 'API Contract',
    sourceHeading: 'Step 5: API Contract',
    readTimeMin: 5,
    interviewerSignal: 'You think in terms of what the frontend actually needs',
  },
  {
    id: 'framework-step-6',
    group: 'Framework',
    navTitle: '6. Data Flow',
    eyebrow: 'FRAMEWORK · STEP 6',
    title: 'Data Flow Walkthrough',
    sourceHeading: 'Step 6: Data Flow Walkthrough',
    readTimeMin: 5,
    interviewerSignal: 'You can trace cause-and-effect through the system',
  },
  {
    id: 'framework-step-7',
    group: 'Framework',
    navTitle: '7. Performance & Scale',
    eyebrow: 'FRAMEWORK · STEP 7',
    title: 'Performance & Scale',
    sourceHeading: 'Step 7: Performance & Scale',
    readTimeMin: 6,
    interviewerSignal: 'You understand performance at Riot scale — Fernando bait',
  },
  {
    id: 'framework-step-8',
    group: 'Framework',
    navTitle: '8. Edge Cases',
    eyebrow: 'FRAMEWORK · STEP 8',
    title: 'Edge Cases & Error Handling',
    sourceHeading: 'Step 8: Edge Cases & Error Handling',
    readTimeMin: 4,
    interviewerSignal: 'You think about unhappy paths — senior-level signal',
  },

  // ---------- Walkthroughs ----------
  {
    id: 'walkthrough-1-login',
    group: 'Walkthroughs',
    navTitle: 'WT1 · Login/Auth',
    eyebrow: 'WALKTHROUGH 1',
    title: 'Login/Auth System for a Gaming Platform',
    sourceHeading: 'Walkthrough 1: Login/Auth System for a Gaming Platform',
    readTimeMin: 10,
    interviewerSignal: 'Most common prompt — auth is Fernando\'s go-to test',
    drill: {
      prompt: 'Design the login experience for a gaming platform like Riot\'s — support email/password, social (Google/Apple/Discord), SSO across LoL/Valorant/TFT, MFA, and password reset.',
      sourceHeading: 'Walkthrough 1: Login/Auth System for a Gaming Platform',
    },
    chunks: [
      { id: 'requirements', label: 'Requirements', sourceSubheading: 'Requirements', readTimeMin: 3 },
      { id: 'architecture', label: 'Architecture', sourceSubheading: 'System Architecture', readTimeMin: 3 },
      { id: 'components', label: 'Component Tree', sourceSubheading: 'Component Tree', readTimeMin: 3 },
      { id: 'state', label: 'State Design', sourceSubheading: 'State Design', readTimeMin: 3 },
      { id: 'api', label: 'API Contract', sourceSubheading: 'API Contract', readTimeMin: 3 },
      { id: 'data-flow', label: 'Data Flow', sourceSubheading: 'Data Flow — Login with Email', readTimeMin: 3 },
      { id: 'performance', label: 'Performance', sourceSubheading: 'Performance', readTimeMin: 2 },
      { id: 'edge-cases', label: 'Edge Cases', sourceSubheading: 'Edge Cases', readTimeMin: 2 },
    ],
  },
  {
    id: 'walkthrough-2-match',
    group: 'Walkthroughs',
    navTitle: 'WT2 · Match Viewing',
    eyebrow: 'WALKTHROUGH 2',
    title: 'Esports Match Viewing App',
    sourceHeading: 'Walkthrough 2: Esports Match Viewing App',
    readTimeMin: 12,
    interviewerSignal: 'Real-time data + video — hits every axis',
    drill: {
      prompt: 'Design an esports match viewing app with live video, real-time stats overlay, chat, and schedule browsing for millions of viewers during Worlds.',
      sourceHeading: 'Walkthrough 2: Esports Match Viewing App',
    },
    chunks: [
      { id: 'requirements', label: 'Requirements', sourceSubheading: 'Requirements', readTimeMin: 3 },
      { id: 'architecture', label: 'Architecture', sourceSubheading: 'System Architecture', readTimeMin: 4 },
      { id: 'components', label: 'Component Tree', sourceSubheading: 'Component Tree', readTimeMin: 3 },
      { id: 'state', label: 'State Design', sourceSubheading: 'State Design', readTimeMin: 3 },
      { id: 'api', label: 'API Contract', sourceSubheading: 'API Contract', readTimeMin: 3 },
      { id: 'data-flow', label: 'Data Flow', sourceSubheading: 'Data Flow — Live Match Stats Update', readTimeMin: 3 },
      { id: 'performance', label: 'Performance', sourceSubheading: 'Performance', readTimeMin: 2 },
      { id: 'edge-cases', label: 'Edge Cases', sourceSubheading: 'Edge Cases', readTimeMin: 2 },
    ],
  },
  {
    id: 'walkthrough-3-dashboard',
    group: 'Walkthroughs',
    navTitle: 'WT3 · Real-Time Dashboard',
    eyebrow: 'WALKTHROUGH 3',
    title: 'Real-Time Esports Dashboard',
    sourceHeading: 'Walkthrough 3: Real-Time Esports Dashboard',
    readTimeMin: 10,
    interviewerSignal: 'Fernando\'s specialty — high-frequency updates at scale',
    drill: {
      prompt: 'Design a real-time esports dashboard showing live gold diff, kills, objectives, and player positions updating multiple times per second during a live match.',
      sourceHeading: 'Walkthrough 3: Real-Time Esports Dashboard',
    },
    chunks: [
      { id: 'requirements', label: 'Requirements', sourceSubheading: 'Requirements', readTimeMin: 3 },
      { id: 'architecture', label: 'Architecture', sourceSubheading: 'System Architecture', readTimeMin: 3 },
      { id: 'components', label: 'Component Tree', sourceSubheading: 'Component Tree', readTimeMin: 3 },
      { id: 'state', label: 'State Design', sourceSubheading: 'State Design', readTimeMin: 4 },
      { id: 'data-flow', label: 'Data Flow', sourceSubheading: 'Data Flow — Gold Diff Update Arrives', readTimeMin: 3 },
      { id: 'performance', label: 'Performance', sourceSubheading: 'Performance', readTimeMin: 3 },
      { id: 'edge-cases', label: 'Edge Cases', sourceSubheading: 'Edge Cases & Degradation Strategy', readTimeMin: 3 },
    ],
  },
  {
    id: 'walkthrough-4-pickem',
    group: 'Walkthroughs',
    navTitle: 'WT4 · Pick\'Em',
    eyebrow: 'WALKTHROUGH 4',
    title: 'Pick\'Em Predictions App',
    sourceHeading: 'Walkthrough 4: Pick\'Em Predictions App',
    readTimeMin: 9,
    interviewerSignal: 'CRUD with optimistic UI and consistency constraints',
    drill: {
      prompt: 'Design a Pick\'Em predictions app where users predict match outcomes, lock in picks before games start, and see a live leaderboard during the tournament.',
      sourceHeading: 'Walkthrough 4: Pick\'Em Predictions App',
    },
    chunks: [
      { id: 'requirements', label: 'Requirements', sourceSubheading: 'Requirements', readTimeMin: 3 },
      { id: 'architecture', label: 'Architecture', sourceSubheading: 'System Architecture', readTimeMin: 3 },
      { id: 'components', label: 'Component Tree', sourceSubheading: 'Component Tree', readTimeMin: 3 },
      { id: 'state', label: 'State Design', sourceSubheading: 'State Design', readTimeMin: 3 },
      { id: 'api', label: 'API Contract', sourceSubheading: 'API Contract', readTimeMin: 3 },
      { id: 'data-flow', label: 'Data Flow', sourceSubheading: 'Data Flow — Making a Prediction', readTimeMin: 3 },
      { id: 'performance', label: 'Performance', sourceSubheading: 'Performance', readTimeMin: 2 },
      { id: 'edge-cases', label: 'Edge Cases', sourceSubheading: 'Edge Cases', readTimeMin: 2 },
    ],
  },
  {
    id: 'walkthrough-5-search',
    group: 'Walkthroughs',
    navTitle: 'WT5 · Search',
    eyebrow: 'WALKTHROUGH 5',
    title: 'Search/Browse Experience',
    sourceHeading: 'Walkthrough 5: Search/Browse Experience for Esports Content',
    readTimeMin: 9,
    interviewerSignal: 'Debouncing, cancellation, URL state, pagination',
    drill: {
      prompt: 'Design a search and browse experience for esports content — players, teams, matches, highlights — with autocomplete, filters, and deep linking.',
      sourceHeading: 'Walkthrough 5: Search/Browse Experience for Esports Content',
    },
    chunks: [
      { id: 'requirements', label: 'Requirements', sourceSubheading: 'Requirements', readTimeMin: 3 },
      { id: 'architecture', label: 'Architecture', sourceSubheading: 'System Architecture', readTimeMin: 3 },
      { id: 'components', label: 'Component Tree', sourceSubheading: 'Component Tree', readTimeMin: 3 },
      { id: 'state', label: 'State Design', sourceSubheading: 'State Design', readTimeMin: 4 },
      { id: 'data-flow', label: 'Data Flow', sourceSubheading: 'Data Flow — User Types a Search Query', readTimeMin: 3 },
      { id: 'performance', label: 'Performance', sourceSubheading: 'Performance', readTimeMin: 2 },
      { id: 'edge-cases', label: 'Edge Cases', sourceSubheading: 'Edge Cases', readTimeMin: 2 },
    ],
  },
  {
    id: 'walkthrough-6-settings',
    group: 'Walkthroughs',
    navTitle: 'WT6 · Settings',
    eyebrow: 'WALKTHROUGH 6',
    title: 'Settings / Profile Page',
    sourceHeading: 'Walkthrough 6: Settings / Profile Page',
    readTimeMin: 8,
    interviewerSignal: 'Forms, optimistic updates, validation, dirty state',
    drill: {
      prompt: 'Design a settings/profile page where users edit account info, notification preferences, connected accounts, and privacy settings — with optimistic updates and change confirmation.',
      sourceHeading: 'Walkthrough 6: Settings / Profile Page',
    },
    chunks: [
      { id: 'requirements', label: 'Requirements', sourceSubheading: 'Requirements', readTimeMin: 3 },
      { id: 'architecture', label: 'Architecture', sourceSubheading: 'System Architecture', readTimeMin: 2 },
      { id: 'components', label: 'Component Tree', sourceSubheading: 'Component Tree', readTimeMin: 3 },
      { id: 'state', label: 'State Design', sourceSubheading: 'State Design', readTimeMin: 3 },
      { id: 'api', label: 'API Contract', sourceSubheading: 'API Contract', readTimeMin: 3 },
      { id: 'data-flow', label: 'Data Flow', sourceSubheading: 'Data Flow — Optimistic Notification Toggle', readTimeMin: 3 },
      { id: 'performance', label: 'Performance', sourceSubheading: 'Performance', readTimeMin: 2 },
      { id: 'edge-cases', label: 'Edge Cases', sourceSubheading: 'Edge Cases', readTimeMin: 2 },
    ],
  },
  {
    id: 'walkthrough-7-cms',
    group: 'Walkthroughs',
    navTitle: 'WT7 · CMS Dashboard',
    eyebrow: 'WALKTHROUGH 7',
    title: 'Content Management Dashboard',
    sourceHeading: 'Walkthrough 7: Content Management Dashboard',
    readTimeMin: 11,
    interviewerSignal: 'Rich editing, autosave, collaboration, role-based access',
    drill: {
      prompt: 'Design a CMS dashboard for the editorial team to create, edit, and publish articles/videos — with rich text editing, autosave, preview, and scheduled publishing.',
      sourceHeading: 'Walkthrough 7: Content Management Dashboard',
    },
    chunks: [
      { id: 'requirements', label: 'Requirements', sourceSubheading: 'Requirements', readTimeMin: 3 },
      { id: 'architecture', label: 'Architecture', sourceSubheading: 'System Architecture', readTimeMin: 4 },
      { id: 'components', label: 'Component Tree', sourceSubheading: 'Component Tree', readTimeMin: 4 },
      { id: 'state', label: 'State Design', sourceSubheading: 'State Design', readTimeMin: 3 },
      { id: 'api', label: 'API Contract', sourceSubheading: 'API Contract', readTimeMin: 4 },
      { id: 'data-flow', label: 'Data Flow', sourceSubheading: 'Data Flow — Editing and Publishing an Article', readTimeMin: 3 },
      { id: 'performance', label: 'Performance', sourceSubheading: 'Performance', readTimeMin: 2 },
      { id: 'edge-cases', label: 'Edge Cases', sourceSubheading: 'Edge Cases', readTimeMin: 2 },
    ],
  },

  // ---------- Reference ----------
  {
    id: 'interview-intel',
    group: 'Reference',
    navTitle: '🎯 Interview Intel',
    eyebrow: 'REFERENCE · HIGH SIGNAL',
    title: 'Interview Intel — What Fernando Wants to Hear',
    sourceHeading: 'Interview Intel',
    sourceFile: 'study/interview-intel.md',
    readTimeMin: 8,
    interviewerSignal: 'The 3 high-signal answers that separate good from great at Riot',
    chunks: [
      { id: 'data-flow-narrative', label: 'Data Flow Narrative', sourceSubheading: 'Data Flow Narrative', readTimeMin: 3 },
      { id: 'auth-deep-dive', label: 'Auth Deep Dive', sourceSubheading: 'Auth Deep Dive', readTimeMin: 3 },
      { id: 'player-first-framing', label: 'Player-First Framing', sourceSubheading: 'Player-First Framing', readTimeMin: 2 },
    ],
  },
  {
    id: 'reference-round-format',
    group: 'Reference',
    navTitle: 'Round Format Intel',
    eyebrow: 'REFERENCE · FORMAT',
    title: 'Round Format Intel — Which Shape Is This Round?',
    sourceHeading: 'Round Format Intel',
    sourceFile: 'study/interview-intel.md',
    readTimeMin: 5,
    interviewerSignal: 'Know which of three formats you\'re in before you start answering',
    chunks: [
      { id: 'three-formats', label: 'Three Formats', sourceSubheading: 'The Three Formats', readTimeMin: 2 },
      { id: 'detect-format', label: 'Detect in 60s', sourceSubheading: 'How to Detect the Format in the First 60 Seconds', readTimeMin: 1 },
      { id: 'universal-rule', label: 'Universal Rule', sourceSubheading: 'The Universal Rule', readTimeMin: 1 },
    ],
  },
  {
    id: 'reference-fernando-faq',
    group: 'Reference',
    navTitle: 'Fernando FAQ',
    eyebrow: 'REFERENCE',
    title: 'What Fernando Might Ask',
    sourceHeading: 'Quick Reference: What Fernando Might Ask',
    readTimeMin: 5,
    interviewerSignal: 'Quick-hit curveball questions — be ready',
  },
];

// ============================================================
// Highlight terms — interview-critical phrases wrapped in <mark>
// Sorted longest-first so multi-word terms match before substrings.
// ============================================================

const HIGHLIGHT_TERMS = [
  // Riot-specific interview intel (web-research additions)
  { term: 'RiotGamesMinions/frontend_test', def: 'The only primary-source FE artifact from Riot Games — three take-home prompts (Image Rotator, Tabbed Content, Text Search) in vanilla JS with no third-party libs. Take-home, not onsite SD.' },
  { term: 'cross-boundary text search', def: 'The subtle trap in Riot\'s text-search take-home — phrases can cross HTML element boundaries, so innerHTML.match is wrong. Walk DOM text nodes via TreeWalker instead.' },
  { term: 'Draw.io', def: 'Riot\'s confirmed diagramming tool during virtual system design rounds on Google Meet. Have it open in a second tab before the call.' },
  { term: 'tryriot.com', def: 'NOT Riot Games — an unrelated HR-software company whose frontend-interview-challenge gets conflated with Riot Games by AI summarizers. Do not prep this as Riot intel.' },
  { term: 'deep tech round', def: 'Riot\'s system-design interview style: high-level discussion (no tidy diagrams required) of microservices, protocols, and OOP classes, with a live-debug scenario in the final ~15 minutes.' },
  { term: 'live-debug scenario', def: 'Expected in the final ~15 min of Riot\'s deep tech round — prep one SAO-format frontend prod-bug story (hydration mismatch, CDN invalidation, listener leak, bundle regression, async race).' },

  // Security
  { term: 'HttpOnly Secure cookies', def: 'Cookies JavaScript can\'t read (HttpOnly) and that only travel over HTTPS (Secure) — prevents XSS token theft.' },
  { term: 'HttpOnly cookies', def: 'Cookies inaccessible to JavaScript — protects auth tokens from XSS attacks.' },
  { term: 'SameSite=Lax', def: 'Cookie attribute that blocks cookies on cross-site POSTs — CSRF defense.' },
  { term: 'PKCE', def: 'Proof Key for Code Exchange — OAuth flow for SPAs that prevents authorization code interception.' },
  { term: 'CSRF protection', def: 'Defense against cross-site request forgery — via SameSite cookies or CSRF tokens.' },
  { term: 'credential stuffing', def: 'Attacker uses leaked credentials from one site on another — mitigated with rate limiting and MFA.' },
  { term: 'rate limiting', def: 'Caps requests per IP/user over a time window — defends against brute force and abuse.' },
  { term: 'content security policy', def: 'HTTP header that restricts what resources pages can load — defense against XSS and data injection.' },

  // State
  { term: 'stale-while-revalidate', def: 'Show cached data instantly, fetch fresh data in background, update when it arrives — React Query default behavior.' },
  { term: 'optimistic updates', def: 'Update the UI immediately before the server confirms — roll back on error. Feels instant.' },
  { term: 'React Query cache', def: 'Per-query client cache with TTL, invalidation, background refresh, and request deduplication.' },
  { term: 'Apollo cache', def: 'Normalized client-side cache for GraphQL data keyed by type+id.' },
  { term: 'server state', def: 'Data owned by the server — user profile, lists, anything fetched. Belongs in React Query/SWR/Apollo, not global stores.' },
  { term: 'client state', def: 'UI-only state like toggles, form inputs, selected tab — lives in useState or Context.' },
  { term: 'URL state', def: 'State stored in the URL (search params, route params) — makes views shareable and bookmarkable.' },
  { term: 'persistent state', def: 'Survives page close — localStorage, cookies, or IndexedDB.' },
  { term: 'global store', def: 'A shared in-memory store like Redux or Zustand — avoid unless you truly have cross-cutting state.' },
  { term: 'cache invalidation', def: 'Marking cached data as stale so it gets refetched — one of the two hard problems in CS.' },

  // Architecture
  { term: 'stateless servers', def: 'App servers that hold no per-user state — session data goes in Redis, enabling horizontal scaling.' },
  { term: 'horizontal scaling', def: 'Scale by adding more servers rather than a bigger one. Requires stateless servers.' },
  { term: 'load balancer', def: 'Distributes incoming requests across multiple app servers — often Nginx or a cloud LB.' },
  { term: 'sticky sessions', def: 'Routes a user to the same server each time — required for in-memory session state, avoided via Redis.' },
  { term: 'message queue', def: 'Decouples producers from consumers — Kafka/RabbitMQ. Critical for real-time pipelines.' },
  { term: 'pub/sub', def: 'Publish/subscribe messaging — Redis Pub/Sub or Kafka topics for fan-out.' },
  { term: 'WebSocket gateway', def: 'Dedicated service for persistent WebSocket connections, separate from stateless app servers.' },
  { term: 'CDN', def: 'Content Delivery Network — edge caches for static assets and cacheable API responses.' },
  { term: 'edge caching', def: 'Cache responses at CDN POPs close to users — sub-50ms TTFB globally.' },
  { term: 'microservices', def: 'Small, independently deployable services — trade operational complexity for team autonomy.' },
  { term: 'BFF', def: 'Backend For Frontend — a thin service per client that aggregates downstream calls into the shape the frontend needs.' },

  // APIs
  { term: 'GraphQL subscriptions', def: 'Persistent queries that push updates from server to client — backed by WebSocket.' },
  { term: 'persisted queries', def: 'Send a query hash instead of the full query text — smaller payload, CDN-cacheable.' },
  { term: 'cursor-based pagination', def: 'Pagination using an opaque cursor from the last item — stable for real-time lists where items shift.' },
  { term: 'offset pagination', def: 'page=N&limit=M — simple but breaks when items are inserted/removed between requests.' },
  { term: 'REST', def: 'Resource-oriented HTTP API — simple, cache-friendly via HTTP semantics, less flexible than GraphQL.' },
  { term: 'GraphQL', def: 'Query language letting clients request exactly the data shape they need in one request.' },
  { term: 'N+1 problem', def: 'Fetching N items then making N extra calls for each one\'s relations — fixed with dataloaders or proper joins.' },

  // Performance
  { term: 'code splitting', def: 'Split JS bundles per-route with React.lazy() + Suspense so users only download what they see.' },
  { term: 'tree-shaking', def: 'Build-time removal of unused code from bundles — requires ES modules.' },
  { term: 'lazy loading', def: 'Defer loading until needed — images below the fold, routes, components.' },
  { term: 'virtualization', def: 'Render only visible items in long lists — react-window or @tanstack/virtual. Essential for 1000+ items.' },
  { term: 'React.memo', def: 'Memoize component render based on prop equality — use where expensive renders repeat.' },
  { term: 'useMemo', def: 'Memoize expensive computations across renders — avoid overusing, it has overhead.' },
  { term: 'debounce', def: 'Wait for N ms of inactivity before firing — prevents 50 API calls per keystroke in search.' },
  { term: 'throttle', def: 'Fire at most once per N ms — used for scroll/resize handlers.' },
  { term: 'requestAnimationFrame', def: 'Schedule work for the next frame — batch UI updates at 60fps for smooth real-time rendering.' },
  { term: 'Web Workers', def: 'Run CPU-heavy JS off the main thread — keeps UI responsive during parsing/compute.' },
  { term: 'service workers', def: 'Proxy between app and network — enable offline support, push, and precaching.' },
  { term: 'bundle size budget', def: 'Hard cap on JS/CSS bytes shipped — enforced in CI.' },
  { term: 'critical CSS', def: 'The minimal CSS needed for above-the-fold content, inlined in HTML for first paint.' },
  { term: 'preload', def: '<link rel="preload"> tells the browser to fetch a resource early without executing it.' },
  { term: 'prefetch', def: '<link rel="prefetch"> tells the browser to fetch a resource for future navigation.' },

  // Real-time
  { term: 'WebSocket', def: 'Full-duplex persistent connection — ideal for bidirectional real-time data.' },
  { term: 'Server-Sent Events', def: 'HTTP-based one-way server-to-client stream — simpler than WebSocket, auto-reconnects.' },
  { term: 'SSE fallback', def: 'Use Server-Sent Events when WebSocket is blocked by corporate proxies.' },
  { term: 'exponential backoff', def: 'Retry with increasing delays — 1s, 2s, 4s, 8s... — avoids thundering herd on reconnect.' },
  { term: 'reconnection', def: 'Re-establishing a dropped WebSocket — must handle with backoff and state resync.' },

  // Error handling
  { term: 'loading states', def: 'Visible feedback that data is being fetched — skeleton screens beat spinners.' },
  { term: 'skeleton screens', def: 'Gray placeholder shapes that preview the layout while data loads — feels faster than spinners.' },
  { term: 'error boundaries', def: 'React components that catch render errors in their subtree — prevents whole-app crashes.' },
  { term: 'AbortController', def: 'Web API for cancelling fetch requests — essential for stale request cancellation.' },
  { term: 'race conditions', def: 'Two async operations finishing out of order — fix with request IDs or AbortController.' },
  { term: 'aria-live', def: 'ARIA attribute that announces dynamic content updates to screen readers — essential for real-time UI.' },

  // Gaming-specific
  { term: 'gold diff', def: 'League of Legends stat — the gold advantage one team has over the other. High-frequency real-time metric.' },
  { term: 'Worlds', def: 'League of Legends World Championship — Riot\'s largest annual tournament with millions of concurrent viewers.' },
  { term: 'Valorant', def: 'Riot\'s tactical FPS — separate auth/profile but same shared account system as League.' },
];

// Sort longest-first so "HttpOnly Secure cookies" matches before "HttpOnly cookies"
HIGHLIGHT_TERMS.sort((a, b) => b.term.length - a.term.length);

// ============================================================
// Markdown transforms
// ============================================================

/**
 * Slice the full markdown doc into a section by heading text.
 * Returns markdown between `## heading` (or `### heading`) and the next
 * heading of the same or higher level.
 */
function sliceMarkdownBySection(fullMd, sourceHeading) {
  const lines = fullMd.split('\n');
  let startIdx = -1;
  let startLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{2,4})\s+(.+?)\s*$/);
    if (m && m[2].includes(sourceHeading)) {
      startIdx = i;
      startLevel = m[1].length;
      break;
    }
  }

  if (startIdx === -1) return '';

  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,4})\s+/);
    if (m && m[1].length <= startLevel) {
      endIdx = i;
      break;
    }
  }

  return lines.slice(startIdx, endIdx).join('\n');
}

/**
 * Post-process the rendered HTML from marked.js to apply our visual transforms.
 * - Replace **Say:** paragraphs with .say-callout blocks
 * - Wrap "Key principles" bullets as pull-quotes (optional, subtle)
 * - Add <mark data-def="..."> around interview-critical terms (skip inside code)
 */
function transformHTML(html) {
  const container = document.createElement('div');
  container.innerHTML = html;

  // --- Transform "Say:" paragraphs ---
  const paragraphs = Array.from(container.querySelectorAll('p'));
  paragraphs.forEach(p => {
    const firstStrong = p.querySelector('strong');
    if (firstStrong && /^Say:/i.test(firstStrong.textContent.trim())) {
      // Remove the "Say:" strong, keep the italic quote body
      firstStrong.remove();
      const div = document.createElement('div');
      div.className = 'say-callout';
      div.innerHTML = p.innerHTML.replace(/^[:\s"]*/, '').replace(/[:\s]*$/, '');
      p.replaceWith(div);
    }
  });

  // --- Highlight terms ---
  highlightTermsInNode(container);

  return container.innerHTML;
}

/**
 * Walk text nodes, wrapping known terms in <mark data-def="...">.
 * Skips code/pre/mark/a nodes to avoid polluting code or breaking links.
 * Handles multiple matches per text node by rebuilding the node in one pass.
 */
function highlightTermsInNode(root) {
  const SKIP = new Set(['CODE', 'PRE', 'MARK', 'A', 'SCRIPT', 'STYLE']);

  function processTextNode(textNode) {
    const text = textNode.textContent;
    if (!text || text.length < 3) return;
    const lower = text.toLowerCase();

    // Collect all non-overlapping matches (greedy longest-first due to pre-sort)
    const matches = [];
    const claimed = new Array(text.length).fill(false);
    for (const { term, def } of HIGHLIGHT_TERMS) {
      const needle = term.toLowerCase();
      let from = 0;
      while (from < lower.length) {
        const idx = lower.indexOf(needle, from);
        if (idx === -1) break;
        // Only accept if region is unclaimed
        let free = true;
        for (let k = idx; k < idx + needle.length; k++) {
          if (claimed[k]) { free = false; break; }
        }
        if (free) {
          // Also require a word boundary on each side to avoid "CDN" matching "ACDNP"
          const before = idx === 0 ? ' ' : text[idx - 1];
          const after = idx + needle.length >= text.length ? ' ' : text[idx + needle.length];
          const isWordChar = c => /[A-Za-z0-9_]/.test(c);
          const startOK = !isWordChar(before) || !isWordChar(text[idx]);
          const endOK = !isWordChar(after) || !isWordChar(text[idx + needle.length - 1]);
          if (startOK && endOK) {
            matches.push({ idx, len: needle.length, def });
            for (let k = idx; k < idx + needle.length; k++) claimed[k] = true;
          }
        }
        from = idx + needle.length;
      }
    }

    if (matches.length === 0) return;
    matches.sort((a, b) => a.idx - b.idx);

    // Build fragment: interleave plain text and <mark> elements
    const frag = document.createDocumentFragment();
    let cursor = 0;
    for (const m of matches) {
      if (m.idx > cursor) {
        frag.appendChild(document.createTextNode(text.slice(cursor, m.idx)));
      }
      const markEl = document.createElement('mark');
      markEl.setAttribute('data-def', m.def);
      markEl.textContent = text.slice(m.idx, m.idx + m.len);
      frag.appendChild(markEl);
      cursor = m.idx + m.len;
    }
    if (cursor < text.length) {
      frag.appendChild(document.createTextNode(text.slice(cursor)));
    }

    textNode.parentNode.replaceChild(frag, textNode);
  }

  function walk(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (SKIP.has(node.nodeName)) return;
      // Snapshot children so mutation doesn't break iteration
      const children = Array.from(node.childNodes);
      for (const child of children) walk(child);
    } else if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node);
    }
  }

  walk(root);
}

/**
 * Slice a sub-section (level 3/4 heading) out of a walkthrough's range.
 * First finds the walkthrough by its heading, then within that range looks
 * for a heading that includes `subheading`. Returns the markdown from that
 * subheading until the next same-or-higher level heading (or the end of
 * the walkthrough, whichever comes first).
 */
function sliceWalkthroughChunk(fullMd, walkthroughHeading, subheading) {
  const lines = fullMd.split('\n');
  let wtStart = -1;
  let wtLevel = 0;

  // Find walkthrough start
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{2,4})\s+(.+?)\s*$/);
    if (m && m[2].includes(walkthroughHeading)) {
      wtStart = i;
      wtLevel = m[1].length;
      break;
    }
  }
  if (wtStart === -1) return '';

  // Find walkthrough end (next same-or-higher heading)
  let wtEnd = lines.length;
  for (let i = wtStart + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,4})\s+/);
    if (m && m[1].length <= wtLevel) { wtEnd = i; break; }
  }

  // Find subheading within walkthrough range
  let subStart = -1;
  let subLevel = 0;
  for (let i = wtStart + 1; i < wtEnd; i++) {
    const m = lines[i].match(/^(#{2,4})\s+(.+?)\s*$/);
    if (m && m[1].length > wtLevel && m[2].includes(subheading)) {
      subStart = i;
      subLevel = m[1].length;
      break;
    }
  }
  if (subStart === -1) return '';

  // Find sub-section end (next heading at same or higher level, within walkthrough)
  let subEnd = wtEnd;
  for (let i = subStart + 1; i < wtEnd; i++) {
    const m = lines[i].match(/^(#{1,4})\s+/);
    if (m && m[1].length <= subLevel) { subEnd = i; break; }
  }

  return lines.slice(subStart, subEnd).join('\n');
}

// Expose globally (no modules since we're not using a build)
window.SECTION_METADATA = SECTION_METADATA;
window.HIGHLIGHT_TERMS = HIGHLIGHT_TERMS;
window.sliceMarkdownBySection = sliceMarkdownBySection;
window.sliceWalkthroughChunk = sliceWalkthroughChunk;
window.transformHTML = transformHTML;
