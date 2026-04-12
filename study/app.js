/* ============================================================
   app.js — Alpine root component for the study site
   ============================================================ */

const STORAGE_KEY = 'fsd-study-state';
const MD_SOURCE = 'frontend-system-design-prep.md';
const QUESTIONS_SOURCE = 'study/questions.json';

const FRAMEWORK_STEPS = [
  { name: 'Clarify Requirements', time: '3-5 min', hint: 'Functional + non-functional. Who, what, scope, scale, latency, a11y, i18n.' },
  { name: 'High-Level Architecture', time: '5-7 min', hint: 'Client → CDN → LB → App → DB. Cache, queue, WebSocket gateway.' },
  { name: 'Component Architecture', time: '5-7 min', hint: 'Pages → regions → leaf components. Shared primitives.' },
  { name: 'State Design', time: '5-7 min', hint: 'Server/Client/URL/Persistent/Real-time. Where each lives and why.' },
  { name: 'API Contract', time: '3-5 min', hint: 'REST or GraphQL. Endpoints/queries, error shape, pagination.' },
  { name: 'Data Flow Walkthrough', time: '3-5 min', hint: 'Pick one critical flow: click → handler → state → API → cache → render.' },
  { name: 'Performance & Scale', time: '3-5 min', hint: 'Loading, runtime, network, real-time. What matters at Worlds scale.' },
  { name: 'Edge Cases & Errors', time: '2-3 min', hint: 'Loading, error, empty, offline, auth expiry, race conditions, a11y, i18n.' },
];

function studyApp() {
  return {
    // --------- Config ---------
    sections: window.SECTION_METADATA,
    frameworkSteps: FRAMEWORK_STEPS,

    // --------- View state ---------
    view: 'section',            // 'section' | 'mistakes'
    currentSectionId: null,
    currentSectionHTML: '',
    currentDrillReferenceHTML: '',
    currentTab: 'quiz',
    mdCache: {},                // sectionId -> rendered HTML
    drillRefCache: {},          // sectionId -> rendered reference HTML
    questionsBySection: {},     // sectionId -> { mcq, recall, scenarios, drill }
    loaded: false,

    // --------- Quiz state ---------
    quizIdx: 0,
    quizScore: 0,
    quizPick: null,
    quizAnswered: false,

    // --------- Recall state ---------
    recallIdx: 0,
    recallAnswer: '',
    recallRevealed: false,

    // --------- Scenario state ---------
    scenarioIdx: 0,
    scenarioAnswer: '',
    scenarioRevealed: false,

    // --------- Drill state ---------
    drillNotes: ['', '', '', '', '', '', '', ''],
    drillRevealed: false,
    timerSecs: 35 * 60,
    timerRunning: false,
    timerInterval: null,

    // --------- Chunk / SQ3R state ---------
    currentChunkIdx: 0,
    chunkStage: 'question',    // 'question' | 'reading' | 'recite' | 'complete'
    priorAnswer: '',
    currentChunkHTML: '',
    chunkReciteIdx: 0,
    chunkReciteAnswer: '',
    chunkReciteRevealed: false,

    // --------- Mistakes state ---------
    mistakeFilter: 'session',
    sessionStartTs: Date.now(),
    retestActive: false,
    retestQueue: [],
    retestIdx: 0,
    retestAnswer: '',
    retestFeedback: false,

    // --------- Persistent state ---------
    state: {
      sections: {},
      mistakes: [],
      drills: {},
      streak: { current: 0, lastDate: '' },
      settings: {},
    },

    // ========================================================
    // Init
    // ========================================================
    async init() {
      this.loadState();
      this.updateStreak();

      // Load markdown + questions in parallel
      const [mdText, questionsJson] = await Promise.all([
        fetch(MD_SOURCE).then(r => r.text()).catch(() => ''),
        fetch(QUESTIONS_SOURCE).then(r => r.ok ? r.json() : ({})).catch(() => ({})),
      ]);

      this.fullMd = mdText;
      this.mdSources = { [MD_SOURCE]: mdText };
      this.questionsBySection = questionsJson.sections || {};
      this.loaded = true;

      // Pre-fetch any alternate source files referenced by sections
      const altFiles = Array.from(new Set(this.sections.filter(s => s.sourceFile).map(s => s.sourceFile)));
      await Promise.all(altFiles.map(async f => {
        try {
          const r = await fetch(f);
          if (r.ok) this.mdSources[f] = await r.text();
        } catch (e) { /* ignore */ }
      }));

      // Determine initial section: URL hash wins, else resume, else first
      // Hash format: #section-id OR #section-id/chunk-id OR #section-id/chunk-id/stage
      const parsed = this.parseHash(window.location.hash);
      const hashSection = parsed.sectionId ? this.sections.find(s => s.id === parsed.sectionId) : null;
      if (hashSection) {
        await this.goToSection(hashSection.id);
        if (parsed.chunkId && this.isChunkedSection()) {
          const chunkIdx = this.currentSection.chunks.findIndex(c => c.id === parsed.chunkId);
          if (chunkIdx >= 0) {
            await this.goToChunk(chunkIdx, { stage: parsed.stage || 'question' });
            // Belt-and-suspenders: force the stage after all awaits settle
            if (parsed.stage) {
              this.chunkStage = parsed.stage;
              this.persistChunkState();
            }
          }
        }
        // Late-tick enforcement in case Alpine flushed stale reactive state
        setTimeout(() => {
          if (parsed.stage && this.chunkStage !== parsed.stage) {
            this.chunkStage = parsed.stage;
          }
        }, 50);
      } else {
        this.goToSection(this.findResumeSection());
      }

      // Keyboard shortcuts
      window.addEventListener('keydown', (e) => this.handleKeydown(e));

      // Hashchange navigation
      window.addEventListener('hashchange', () => {
        const p = this.parseHash(window.location.hash);
        const s = p.sectionId ? this.sections.find(x => x.id === p.sectionId) : null;
        if (s && s.id !== this.currentSectionId) this.goToSection(s.id);
      });
    },

    // ========================================================
    // Computed / helpers
    // ========================================================

    parseHash(hash) {
      const clean = (hash || '').replace(/^#/, '');
      if (!clean) return { sectionId: null, chunkId: null, stage: null };
      const parts = clean.split('/');
      return { sectionId: parts[0] || null, chunkId: parts[1] || null, stage: parts[2] || null };
    },

    get sectionGroups() {
      const groups = {};
      for (const s of this.sections) {
        if (!groups[s.group]) groups[s.group] = [];
        groups[s.group].push(s);
      }
      return Object.keys(groups).map(label => ({ label, sections: groups[label] }));
    },

    get currentSection() {
      return this.sections.find(s => s.id === this.currentSectionId);
    },

    findResumeSection() {
      for (const s of this.sections) {
        const st = this.state.sections[s.id];
        if (!st || st.status !== 'tested') return s.id;
      }
      return this.sections[0].id;
    },

    statusIcon(sectionId) {
      const st = this.state.sections[sectionId];
      if (!st || !st.status || st.status === 'unseen') return '○';
      if (st.status === 'reading') return '◐';
      return '●';
    },

    studiedCount() {
      return Object.values(this.state.sections).filter(s => s.status === 'tested').length;
    },

    overallProgress() {
      if (!this.sections.length) return 0;
      return Math.round((this.studiedCount() / this.sections.length) * 100);
    },

    sectionTitle(sectionId) {
      const s = this.sections.find(x => x.id === sectionId);
      return s ? s.title : sectionId;
    },

    hasContent(kind) {
      const q = this.questionsBySection[this.currentSectionId];
      if (!q) return false;
      if (kind === 'drill') return !!(this.currentSection?.drill && q.drill);
      return Array.isArray(q[kind]) && q[kind].length > 0;
    },

    contentCount(kind) {
      const q = this.questionsBySection[this.currentSectionId];
      return q && Array.isArray(q[kind]) ? q[kind].length : 0;
    },

    // -------- Chunked walkthroughs --------

    isChunkedSection() {
      return Array.isArray(this.currentSection?.chunks) && this.currentSection.chunks.length > 0;
    },

    currentChunkMeta() {
      if (!this.isChunkedSection()) return null;
      return this.currentSection.chunks[this.currentChunkIdx];
    },

    currentChunkContent() {
      if (!this.isChunkedSection()) return null;
      const q = this.questionsBySection[this.currentSectionId];
      if (!q || !q.chunks) return null;
      const chunkMeta = this.currentChunkMeta();
      return q.chunks[chunkMeta.id] || null;
    },

    currentChunkReciteItems() {
      const c = this.currentChunkContent();
      return c && Array.isArray(c.recite) ? c.recite : [];
    },

    completedChunkIds() {
      const st = this.state.sections[this.currentSectionId];
      return st && Array.isArray(st.completedChunks) ? st.completedChunks : [];
    },

    isChunkComplete(chunkId) {
      return this.completedChunkIds().includes(chunkId);
    },

    allChunksComplete() {
      if (!this.isChunkedSection()) return true;
      const total = this.currentSection.chunks.length;
      return this.completedChunkIds().length >= total;
    },

    chunkProgressPct() {
      if (!this.isChunkedSection()) return 100;
      const total = this.currentSection.chunks.length;
      return Math.round((this.completedChunkIds().length / total) * 100);
    },

    testRegionUnlocked() {
      // Framework / FAQ: always unlocked. Walkthroughs: unlocked only after all chunks done.
      return !this.isChunkedSection() || this.allChunksComplete();
    },

    hasAnyTestContent() {
      return this.hasContent('mcq') || this.hasContent('recall') || this.hasContent('scenarios') || this.hasContent('drill');
    },

    showTestRegion() {
      return this.hasAnyTestContent() && this.testRegionUnlocked();
    },

    showLockedHint() {
      return this.hasAnyTestContent() && this.isChunkedSection() && !this.testRegionUnlocked();
    },

    async goToChunk(idx, { stage = 'question' } = {}) {
      if (!this.isChunkedSection()) return;
      const chunks = this.currentSection.chunks;
      if (idx < 0 || idx >= chunks.length) return;
      this.currentChunkIdx = idx;
      this.chunkStage = stage;
      this.chunkReciteIdx = 0;
      this.chunkReciteAnswer = '';
      this.chunkReciteRevealed = false;
      // Load persisted priorAnswer
      const st = this.state.sections[this.currentSectionId] || {};
      const priors = st.priorAnswers || {};
      const chunkId = chunks[idx].id;
      this.priorAnswer = priors[chunkId] || '';
      // Render the chunk's markdown
      await this.renderChunk();
      this.persistChunkState();
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },

    async renderChunk() {
      const meta = this.currentChunkMeta();
      if (!meta) { this.currentChunkHTML = ''; return; }
      const cacheKey = `${this.currentSectionId}::${meta.id}`;
      if (this.mdCache[cacheKey]) {
        this.currentChunkHTML = this.mdCache[cacheKey];
      } else {
        const section = this.currentSection;
        const srcMd = this.sourceForSection(section);
        const slice = window.sliceWalkthroughChunk(srcMd, section.sourceHeading, meta.sourceSubheading);
        const stripped = slice.replace(/^#{2,4}[^\n]+\n/, '');
        const rawHTML = marked.parse(stripped, { breaks: false, gfm: true });
        const transformed = window.transformHTML(rawHTML);
        this.mdCache[cacheKey] = transformed;
        this.currentChunkHTML = transformed;
      }
      this.$nextTick(() => { if (window.Prism) window.Prism.highlightAll(); });
    },

    advanceStage() {
      if (this.chunkStage === 'question') {
        // persist the prior answer
        const st = this.state.sections[this.currentSectionId] || {};
        const priors = { ...(st.priorAnswers || {}) };
        priors[this.currentChunkMeta().id] = this.priorAnswer;
        this.state.sections[this.currentSectionId] = { ...st, priorAnswers: priors };
        this.saveState();
        this.chunkStage = 'reading';
      } else if (this.chunkStage === 'reading') {
        if (this.currentChunkReciteItems().length > 0) {
          this.chunkStage = 'recite';
          this.chunkReciteIdx = 0;
          this.chunkReciteAnswer = '';
          this.chunkReciteRevealed = false;
        } else {
          this.markChunkComplete();
          this.advanceAfterChunk();
        }
      }
      this.persistChunkState();
    },

    revealChunkRecite() {
      this.chunkReciteRevealed = true;
    },

    rateChunkRecite(rating) {
      const items = this.currentChunkReciteItems();
      const item = items[this.chunkReciteIdx];
      if (rating === 'miss' || rating === 'partial') {
        this.logMistake({
          type: 'recall',
          section: this.currentSectionId,
          question: item.q,
          yourAnswer: this.chunkReciteAnswer || '(empty)',
          correctAnswer: item.model,
          explanation: (item.keyPoints || []).join('; '),
        });
      }
      this.chunkReciteIdx++;
      this.chunkReciteAnswer = '';
      this.chunkReciteRevealed = false;
      if (this.chunkReciteIdx >= items.length) {
        this.markChunkComplete();
        this.advanceAfterChunk();
      }
      this.persistChunkState();
    },

    markChunkComplete() {
      const chunkId = this.currentChunkMeta().id;
      const st = this.state.sections[this.currentSectionId] || {};
      const done = Array.isArray(st.completedChunks) ? [...st.completedChunks] : [];
      if (!done.includes(chunkId)) done.push(chunkId);
      this.state.sections[this.currentSectionId] = { ...st, completedChunks: done, lastSeen: Date.now() };
      this.saveState();
    },

    advanceAfterChunk() {
      const chunks = this.currentSection.chunks;
      if (this.currentChunkIdx < chunks.length - 1) {
        this.goToChunk(this.currentChunkIdx + 1, { stage: 'question' });
      } else {
        // Last chunk — show completion card, test region unlocks
        this.chunkStage = 'complete';
        const st = this.state.sections[this.currentSectionId] || {};
        this.state.sections[this.currentSectionId] = { ...st, status: 'tested', lastSeen: Date.now() };
        this.saveState();
        this.persistChunkState();
      }
    },

    nextChunk() {
      if (this.currentChunkIdx < this.currentSection.chunks.length - 1) {
        this.goToChunk(this.currentChunkIdx + 1, { stage: 'question' });
      }
    },

    prevChunk() {
      if (this.currentChunkIdx > 0) {
        this.goToChunk(this.currentChunkIdx - 1, { stage: 'question' });
      }
    },

    persistChunkState() {
      const st = this.state.sections[this.currentSectionId] || {};
      this.state.sections[this.currentSectionId] = {
        ...st,
        currentChunkIdx: this.currentChunkIdx,
        chunkStage: this.chunkStage,
      };
      this.saveState();
    },

    // ========================================================
    // Section navigation
    // ========================================================

    async goToSection(sectionId) {
      this.view = 'section';
      this.currentSectionId = sectionId;
      if (window.location.hash.replace(/^#/, '') !== sectionId) {
        history.replaceState(null, '', '#' + sectionId);
      }

      // Pick the first available tab for this section
      const preferred = ['quiz', 'recall', 'scenarios', 'drill'];
      this.currentTab = preferred.find(t => this.hasContent(t === 'quiz' ? 'mcq' : t)) || 'quiz';
      this.resetTestState();

      // Mark as at least "reading"
      const st = this.state.sections[sectionId] || { status: 'unseen' };
      if (st.status === 'unseen') {
        this.state.sections[sectionId] = { ...st, status: 'reading', lastSeen: Date.now() };
        this.saveState();
      }

      // Load persisted drill notes if any
      const drillState = this.state.drills[sectionId];
      if (drillState && drillState.notes) {
        this.drillNotes = [...drillState.notes];
        this.timerSecs = drillState.timerSecs || 35 * 60;
      } else {
        this.drillNotes = ['', '', '', '', '', '', '', ''];
        this.timerSecs = 35 * 60;
      }
      this.drillRevealed = false;
      this.pauseTimer();

      // Chunked walkthrough vs linear section
      if (this.isChunkedSection()) {
        // Resume at last chunk or start at 0
        const sectionState = this.state.sections[sectionId] || {};
        const totalChunks = this.currentSection.chunks.length;
        const completedCount = (sectionState.completedChunks || []).length;
        let startIdx;
        let startStage;
        if (completedCount >= totalChunks) {
          startIdx = totalChunks - 1;
          startStage = 'complete';
        } else {
          startIdx = Math.min(sectionState.currentChunkIdx || 0, totalChunks - 1);
          startStage = sectionState.chunkStage || 'question';
          // If stage is 'complete' but not all chunks done, reset to 'question' on current chunk
          if (startStage === 'complete' && completedCount < totalChunks) startStage = 'question';
        }
        await this.goToChunk(startIdx, { stage: startStage });
      } else {
        await this.renderSection(sectionId);
        this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
      }
    },

    sourceForSection(section) {
      if (section && section.sourceFile && this.mdSources && this.mdSources[section.sourceFile]) {
        return this.mdSources[section.sourceFile];
      }
      return this.fullMd || '';
    },

    async renderSection(sectionId) {
      if (this.mdCache[sectionId]) {
        this.currentSectionHTML = this.mdCache[sectionId];
      } else {
        const section = this.sections.find(s => s.id === sectionId);
        const srcMd = this.sourceForSection(section);
        if (!section || !srcMd) {
          this.currentSectionHTML = '<p>Loading…</p>';
          return;
        }
        const slice = window.sliceMarkdownBySection(srcMd, section.sourceHeading);
        // Strip the first heading (we show our own banner)
        const withoutFirstHeading = slice.replace(/^#{2,4}[^\n]+\n/, '');
        const rawHTML = marked.parse(withoutFirstHeading, { breaks: false, gfm: true });
        const transformed = window.transformHTML(rawHTML);
        this.mdCache[sectionId] = transformed;
        this.currentSectionHTML = transformed;
      }

      // Drill reference
      const section = this.sections.find(s => s.id === sectionId);
      if (section && section.drill) {
        if (this.drillRefCache[sectionId]) {
          this.currentDrillReferenceHTML = this.drillRefCache[sectionId];
        } else {
          const slice = window.sliceMarkdownBySection(this.fullMd, section.drill.sourceHeading);
          const noFirst = slice.replace(/^#{2,4}[^\n]+\n/, '');
          this.currentDrillReferenceHTML = marked.parse(noFirst, { breaks: false, gfm: true });
          this.drillRefCache[sectionId] = this.currentDrillReferenceHTML;
        }
      } else {
        this.currentDrillReferenceHTML = '';
      }

      // Prism re-highlight on next tick
      this.$nextTick(() => {
        if (window.Prism) window.Prism.highlightAll();
      });
    },

    nextSection() {
      const idx = this.sections.findIndex(s => s.id === this.currentSectionId);
      if (idx >= 0 && idx < this.sections.length - 1) {
        this.goToSection(this.sections[idx + 1].id);
      }
    },

    prevSection() {
      const idx = this.sections.findIndex(s => s.id === this.currentSectionId);
      if (idx > 0) this.goToSection(this.sections[idx - 1].id);
    },

    hasNextSection() {
      const idx = this.sections.findIndex(s => s.id === this.currentSectionId);
      return idx < this.sections.length - 1;
    },

    markStudied() {
      const st = this.state.sections[this.currentSectionId] || {};
      this.state.sections[this.currentSectionId] = { ...st, status: 'tested', lastSeen: Date.now() };
      this.saveState();
    },

    // ========================================================
    // Quiz
    // ========================================================

    quizItems() {
      const q = this.questionsBySection[this.currentSectionId];
      return q && q.mcq ? q.mcq : [];
    },

    answerQuiz(optIdx) {
      if (this.quizAnswered) return;
      this.quizPick = optIdx;
      this.quizAnswered = true;
      const item = this.quizItems()[this.quizIdx];
      if (optIdx === item.correct) {
        this.quizScore++;
      } else {
        this.logMistake({
          type: 'quiz',
          section: this.currentSectionId,
          question: item.q,
          yourAnswer: item.options[optIdx],
          correctAnswer: item.options[item.correct],
          explanation: item.explanation,
        });
      }
    },

    nextQuiz() {
      this.quizIdx++;
      this.quizPick = null;
      this.quizAnswered = false;
      if (this.quizIdx >= this.quizItems().length) {
        this.checkSectionTested();
      }
    },

    resetQuiz() {
      this.quizIdx = 0;
      this.quizScore = 0;
      this.quizPick = null;
      this.quizAnswered = false;
    },

    // ========================================================
    // Recall
    // ========================================================

    recallItems() {
      const q = this.questionsBySection[this.currentSectionId];
      return q && q.recall ? q.recall : [];
    },

    revealRecall() {
      this.recallRevealed = true;
    },

    rateRecall(rating) {
      const item = this.recallItems()[this.recallIdx];
      if (rating === 'miss' || rating === 'partial') {
        this.logMistake({
          type: 'recall',
          section: this.currentSectionId,
          question: item.q,
          yourAnswer: this.recallAnswer || '(empty)',
          correctAnswer: item.model,
          explanation: (item.keyPoints || []).join('; '),
        });
      }
      this.recallIdx++;
      this.recallAnswer = '';
      this.recallRevealed = false;
      if (this.recallIdx >= this.recallItems().length) {
        this.checkSectionTested();
      }
    },

    resetRecall() {
      this.recallIdx = 0;
      this.recallAnswer = '';
      this.recallRevealed = false;
    },

    // ========================================================
    // Scenarios
    // ========================================================

    scenarioItems() {
      const q = this.questionsBySection[this.currentSectionId];
      return q && q.scenarios ? q.scenarios : [];
    },

    revealScenario() {
      this.scenarioRevealed = true;
    },

    rateScenario(rating) {
      const item = this.scenarioItems()[this.scenarioIdx];
      if (rating === 'miss' || rating === 'partial') {
        this.logMistake({
          type: 'scenario',
          section: this.currentSectionId,
          question: item.q,
          yourAnswer: this.scenarioAnswer || '(empty)',
          correctAnswer: item.model,
          explanation: (item.keyPoints || []).join('; '),
        });
      }
      this.scenarioIdx++;
      this.scenarioAnswer = '';
      this.scenarioRevealed = false;
      if (this.scenarioIdx >= this.scenarioItems().length) {
        this.checkSectionTested();
      }
    },

    resetScenarios() {
      this.scenarioIdx = 0;
      this.scenarioAnswer = '';
      this.scenarioRevealed = false;
    },

    // ========================================================
    // Drill
    // ========================================================

    formatTimer(secs) {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    },

    toggleTimer() {
      if (this.timerRunning) this.pauseTimer();
      else this.startTimer();
    },

    startTimer() {
      this.timerRunning = true;
      this.timerInterval = setInterval(() => {
        if (this.timerSecs > 0) {
          this.timerSecs--;
          if (this.timerSecs % 5 === 0) this.persistDrill();
        } else {
          this.pauseTimer();
        }
      }, 1000);
    },

    pauseTimer() {
      this.timerRunning = false;
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },

    resetTimer() {
      this.pauseTimer();
      this.timerSecs = 35 * 60;
      this.persistDrill();
    },

    persistDrill() {
      if (!this.currentSectionId) return;
      this.state.drills[this.currentSectionId] = {
        notes: [...this.drillNotes],
        timerSecs: this.timerSecs,
        lastUpdate: Date.now(),
      };
      this.saveState();
    },

    // ========================================================
    // Section progress helper
    // ========================================================

    resetTestState() {
      // Don't reset indices — let them pick up where left off
    },

    checkSectionTested() {
      // Mark as tested once at least one test type has been completed
      const st = this.state.sections[this.currentSectionId] || {};
      if (st.status !== 'tested') {
        this.state.sections[this.currentSectionId] = { ...st, status: 'tested', lastSeen: Date.now() };
        this.saveState();
      }
    },

    // ========================================================
    // Mistakes
    // ========================================================

    logMistake(m) {
      const entry = {
        id: `${m.type}-${m.section}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        ...m,
        timestamp: Date.now(),
        retryCount: 0,
        correctStreak: 0,
      };
      this.state.mistakes.push(entry);
      this.saveState();
    },

    filteredMistakes() {
      const dayStart = new Date(); dayStart.setHours(0, 0, 0, 0);
      return this.state.mistakes.filter(m => {
        if (this.mistakeFilter === 'session') return m.timestamp >= this.sessionStartTs;
        if (this.mistakeFilter === 'today') return m.timestamp >= dayStart.getTime();
        return true;
      }).sort((a, b) => b.timestamp - a.timestamp);
    },

    weakSections() {
      const counts = {};
      for (const m of this.filteredMistakes()) {
        counts[m.section] = (counts[m.section] || 0) + 1;
      }
      const max = Math.max(1, ...Object.values(counts));
      return Object.keys(counts)
        .map(id => ({ id, title: this.sectionTitle(id), count: counts[id], pct: (counts[id] / max) * 100 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);
    },

    timeAgo(ts) {
      const diff = Date.now() - ts;
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return 'just now';
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}h ago`;
      const days = Math.floor(hrs / 24);
      return `${days}d ago`;
    },

    openMistakes() {
      this.view = 'mistakes';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    closeMistakes() {
      this.view = 'section';
    },

    startRetestMistakes() {
      const items = this.filteredMistakes();
      if (items.length === 0) return;
      // Shuffle
      this.retestQueue = [...items].sort(() => Math.random() - 0.5);
      this.retestIdx = 0;
      this.retestAnswer = '';
      this.retestFeedback = false;
      this.retestActive = true;
    },

    submitRetest(pickedOpt) {
      const item = this.retestQueue[this.retestIdx];
      this.retestAnswer = pickedOpt;
      this.retestFeedback = true;
      const correct = pickedOpt === item.correctAnswer;
      this.applyRetestResult(item, correct);
    },

    revealRetest() {
      this.retestFeedback = true;
    },

    rateRetest(rating) {
      const item = this.retestQueue[this.retestIdx];
      const correct = rating === 'nailed';
      this.applyRetestResult(item, correct);
      this.advanceRetest();
    },

    applyRetestResult(item, correct) {
      const mistake = this.state.mistakes.find(x => x.id === item.id);
      if (!mistake) return;
      mistake.retryCount = (mistake.retryCount || 0) + 1;
      if (correct) {
        mistake.correctStreak = (mistake.correctStreak || 0) + 1;
        if (mistake.correctStreak >= 2) {
          // Auto-clear
          this.state.mistakes = this.state.mistakes.filter(x => x.id !== item.id);
        }
      } else {
        mistake.correctStreak = 0;
      }
      this.saveState();

      // For MCQ retests we auto-advance after brief delay
      if (item.type === 'quiz') {
        setTimeout(() => this.advanceRetest(), 1200);
      }
    },

    advanceRetest() {
      this.retestIdx++;
      this.retestAnswer = '';
      this.retestFeedback = false;
      if (this.retestIdx >= this.retestQueue.length) {
        this.retestActive = false;
      }
    },

    // ========================================================
    // Streak
    // ========================================================

    updateStreak() {
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (this.state.streak.lastDate === today) return;
      if (this.state.streak.lastDate === yesterday) {
        this.state.streak.current++;
      } else {
        this.state.streak.current = 1;
      }
      this.state.streak.lastDate = today;
      this.saveState();
    },

    // ========================================================
    // Storage
    // ========================================================

    loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          this.state = { ...this.state, ...parsed };
          if (!this.state.sections) this.state.sections = {};
          if (!this.state.mistakes) this.state.mistakes = [];
          if (!this.state.drills) this.state.drills = {};
          if (!this.state.streak) this.state.streak = { current: 0, lastDate: '' };
        }
      } catch (e) {
        console.warn('Failed to load state', e);
      }
    },

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn('Failed to save state', e);
      }
    },

    // ========================================================
    // Keyboard shortcuts
    // ========================================================

    handleKeydown(e) {
      // Skip when focused inside text inputs
      const tag = document.activeElement?.tagName;
      if (tag === 'TEXTAREA' || tag === 'INPUT') return;

      if (this.view !== 'section') return;

      if (e.key === 'j') { this.nextSection(); }
      else if (e.key === 'k') { this.prevSection(); }
      else if (e.key === '1') { if (this.hasContent('mcq')) this.currentTab = 'quiz'; }
      else if (e.key === '2') { if (this.hasContent('recall')) this.currentTab = 'recall'; }
      else if (e.key === '3') { if (this.hasContent('scenarios')) this.currentTab = 'scenarios'; }
      else if (e.key === '4') { if (this.hasContent('drill')) this.currentTab = 'drill'; }
    },
  };
}

window.studyApp = studyApp;
