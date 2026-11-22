// 题典网「程序性知识」独立模块视图控制器 (procedural-view.js)
// 包含三个层级 + 60fps 网课级互动演算白板引擎（配方法样板 P03）：
// 1. 程序性知识首页（统一浏览入口、搜索、年级/学科筛选）
// 2. 章节下的程序性知识列表（按年级/章节分类浏览集合卡片）
// 3. 单项程序性知识详情页（基本信息、步骤清单式核心操作 + [动态演示] 60fps 互动白板、适用条件/前置知识/易错边界、典型例题步骤映射、关联题目集合与前后知识/图谱跳转）
// 4. 关联题目详情查看（点击任意关联题目可进入原题详情页并定位展开标准解答）
(function () {
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function renderMathText(str) {
    if (typeof formatMathHtml === 'function') {
      return formatMathHtml(str);
    }
    return escapeHtml(str);
  }

  function clamp01(v) {
    return v < 0 ? 0 : (v > 1 ? 1 : v);
  }

  function easeOutCubic(x) {
    const t = clamp01(x);
    return 1 - Math.pow(1 - t, 3);
  }

  function formatTimeSec(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    const tenths = Math.floor((Math.max(0, sec) % 1) * 10);
    return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}.${tenths}`;
  }

  const ProceduralState = {
    subView: 'home',          // 'home' | 'detail'
    selectedProcedureId: 'P01',
    searchKeyword: '',
    gradeFilter: 'all',
    subjectFilter: 'all',
    chapterFilter: 'all',
    // 60fps 网课互动白板时间轴状态
    dynamicDemoOpen: false,
    dynamicStep: 1,
    currentTime: 0.0,
    targetStopTime: 6.5,
    playbackRate: 1.0,
    isPlaying: false,
    isContinuousMode: false,
    rafId: null,
    lastFrameTs: 0,
    activeTimelineRenderFn: null,
    practiceVisible: false,
    // 详情页内部访问历史栈与跨模块返回挂起快照
    detailHistoryStack: [],
    suspendedDetailSnapshot: null,
    expandedAnalysisIds: [],
    prac1SelectedKey: null,
    prac2InputX: '',
    prac2InputMin: '',
    prac2Submitted: false
  };

  function stopDynamicPlayback() {
    if (ProceduralState.rafId) {
      cancelAnimationFrame(ProceduralState.rafId);
      ProceduralState.rafId = null;
    }
    ProceduralState.isPlaying = false;
    ProceduralState.lastFrameTs = 0;
    const playBtnText = document.getElementById('procDynPlayBtnText');
    const playBtnIcon = document.getElementById('procDynPlayBtnIcon');
    if (playBtnText) playBtnText.textContent = ProceduralState.isContinuousMode ? '继续连播' : '连续播放';
    if (playBtnIcon) playBtnIcon.textContent = '▶';
  }

  function resetDynamicDemoState(keepOpen = false) {
    stopDynamicPlayback();
    ProceduralState.dynamicDemoOpen = Boolean(keepOpen);
    ProceduralState.dynamicStep = 1;
    ProceduralState.currentTime = 0.0;
    ProceduralState.targetStopTime = 6.5;
    ProceduralState.playbackRate = 1.0;
    ProceduralState.isContinuousMode = false;
    ProceduralState.practiceVisible = false;
    ProceduralState.expandedAnalysisIds = [];
    ProceduralState.prac1SelectedKey = null;
    ProceduralState.prac2InputX = '';
    ProceduralState.prac2InputMin = '';
    ProceduralState.prac2Submitted = false;
  }

  function captureCurrentDetailSnapshot() {
    if (!ProceduralState.selectedProcedureId) return null;
    const inputXEl = document.getElementById('prac2InputX');
    const inputMinEl = document.getElementById('prac2InputMin');
    return {
      procedureId: ProceduralState.selectedProcedureId,
      scrollY: typeof window.scrollY === 'number' ? window.scrollY : (window.pageYOffset || 0),
      dynamicDemoOpen: Boolean(ProceduralState.dynamicDemoOpen),
      dynamicStep: ProceduralState.dynamicStep || 1,
      currentTime: Number(ProceduralState.currentTime || 0.0),
      targetStopTime: Number(ProceduralState.targetStopTime || 6.5),
      playbackRate: Number(ProceduralState.playbackRate || 1.0),
      isContinuousMode: Boolean(ProceduralState.isContinuousMode),
      practiceVisible: Boolean(ProceduralState.practiceVisible),
      expandedAnalysisIds: Array.isArray(ProceduralState.expandedAnalysisIds)
        ? [...ProceduralState.expandedAnalysisIds]
        : [],
      prac1SelectedKey: ProceduralState.prac1SelectedKey || null,
      prac2InputX: inputXEl ? inputXEl.value : (ProceduralState.prac2InputX || ''),
      prac2InputMin: inputMinEl ? inputMinEl.value : (ProceduralState.prac2InputMin || ''),
      prac2Submitted: Boolean(ProceduralState.prac2Submitted)
    };
  }

  function pushDetailHistorySnapshot(snapshot, targetProcedureId) {
    if (!snapshot || !snapshot.procedureId) return;
    if (snapshot.procedureId === targetProcedureId) return;
    const stack = ProceduralState.detailHistoryStack;
    // 若目标知识已在历史栈中，截断回环，避免产生 P15 -> P12 -> P15 死循环重复记录
    const existingTargetIdx = stack.findIndex(item => item.procedureId === targetProcedureId);
    if (existingTargetIdx !== -1) {
      stack.length = existingTargetIdx;
    }
    if (stack.length > 0 && stack[stack.length - 1].procedureId === snapshot.procedureId) {
      stack[stack.length - 1] = snapshot;
    } else {
      stack.push(snapshot);
    }
    if (stack.length > 20) {
      stack.shift();
    }
  }

  // 页面隐藏或切换标签页时自动暂停 60fps 时间轴
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && ProceduralState.isPlaying) {
      stopDynamicPlayback();
    }
  });

  window.addEventListener('resize', () => {
    if (ProceduralState.dynamicDemoOpen && typeof ProceduralState.activeTimelineRenderFn === 'function') {
      ProceduralState.activeTimelineRenderFn(ProceduralState.currentTime);
    }
  });

  ['navBankBtn', 'navGraphBtn', 'navPaperBtn', 'mobileNavBank', 'mobileNavGraph', 'mobileNavPaper'].forEach(btnId => {
    document.getElementById(btnId)?.addEventListener('click', () => {
      stopDynamicPlayback();
    });
  });

  const ProceduralView = {
    init() {
      this.bindHomeEvents();
      this.render();
    },

    bindHomeEvents() {
      const searchInput = document.getElementById('procSearchInput');
      if (searchInput && !searchInput.dataset.bound) {
        searchInput.dataset.bound = '1';
        let timer = null;
        searchInput.addEventListener('input', (e) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            stopDynamicPlayback();
            ProceduralState.detailHistoryStack = [];
            ProceduralState.suspendedDetailSnapshot = null;
            ProceduralState.searchKeyword = e.target.value.trim();
            if (ProceduralState.subView !== 'home') {
              ProceduralState.subView = 'home';
            }
            this.render();
          }, 150);
        });
      }

      const gradeSelect = document.getElementById('procFilterGrade');
      if (gradeSelect && !gradeSelect.dataset.bound) {
        gradeSelect.dataset.bound = '1';
        gradeSelect.addEventListener('change', (e) => {
          stopDynamicPlayback();
          ProceduralState.detailHistoryStack = [];
          ProceduralState.suspendedDetailSnapshot = null;
          ProceduralState.gradeFilter = e.target.value;
          ProceduralState.subView = 'home';
          this.render();
        });
      }

      const subjectSelect = document.getElementById('procFilterSubject');
      if (subjectSelect && !subjectSelect.dataset.bound) {
        subjectSelect.dataset.bound = '1';
        subjectSelect.addEventListener('change', (e) => {
          stopDynamicPlayback();
          ProceduralState.detailHistoryStack = [];
          ProceduralState.suspendedDetailSnapshot = null;
          ProceduralState.subjectFilter = e.target.value;
          ProceduralState.subView = 'home';
          this.render();
        });
      }

      const resetBtn = document.getElementById('btnProcResetFilters');
      if (resetBtn && !resetBtn.dataset.bound) {
        resetBtn.dataset.bound = '1';
        resetBtn.addEventListener('click', () => {
          stopDynamicPlayback();
          ProceduralState.detailHistoryStack = [];
          ProceduralState.suspendedDetailSnapshot = null;
          ProceduralState.searchKeyword = '';
          ProceduralState.gradeFilter = 'all';
          ProceduralState.subjectFilter = 'all';
          ProceduralState.chapterFilter = 'all';
          if (searchInput) searchInput.value = '';
          if (gradeSelect) gradeSelect.value = 'all';
          if (subjectSelect) subjectSelect.value = 'all';
          this.render();
        });
      }
    },

    openHome(chapter = undefined) {
      resetDynamicDemoState(false);
      ProceduralState.detailHistoryStack = [];
      ProceduralState.suspendedDetailSnapshot = null;
      ProceduralState.subView = 'home';
      if (chapter !== undefined) {
        ProceduralState.chapterFilter = chapter;
      }
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    openDetail(procedureId, autoOpenDemo = false, options = {}) {
      const proc = window.ProceduralKnowledgeService?.getProcedureById(procedureId);
      if (!proc) return;
      const { recordHistory = false, clearHistory = false } = options;

      if (clearHistory) {
        ProceduralState.detailHistoryStack = [];
      } else if (
        recordHistory &&
        ProceduralState.subView === 'detail' &&
        ProceduralState.selectedProcedureId &&
        ProceduralState.selectedProcedureId !== procedureId
      ) {
        const snap = captureCurrentDetailSnapshot();
        pushDetailHistorySnapshot(snap, procedureId);
      }

      ProceduralState.suspendedDetailSnapshot = null;
      resetDynamicDemoState(Boolean(autoOpenDemo));
      ProceduralState.selectedProcedureId = procedureId;
      ProceduralState.subView = 'detail';
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    restoreDetailSnapshot(snapshot) {
      if (!snapshot || !snapshot.procedureId) return false;
      const proc = window.ProceduralKnowledgeService?.getProcedureById(snapshot.procedureId);
      if (!proc) return false;

      stopDynamicPlayback();
      ProceduralState.selectedProcedureId = snapshot.procedureId;
      ProceduralState.subView = 'detail';
      ProceduralState.dynamicDemoOpen = Boolean(snapshot.dynamicDemoOpen);
      ProceduralState.dynamicStep = snapshot.dynamicStep || 1;
      ProceduralState.currentTime = Number(snapshot.currentTime || 0.0);
      ProceduralState.targetStopTime = Number(snapshot.targetStopTime || 6.5);
      ProceduralState.playbackRate = Number(snapshot.playbackRate || 1.0);
      ProceduralState.isContinuousMode = Boolean(snapshot.isContinuousMode);
      ProceduralState.isPlaying = false;
      ProceduralState.practiceVisible = Boolean(snapshot.practiceVisible);
      ProceduralState.expandedAnalysisIds = Array.isArray(snapshot.expandedAnalysisIds)
        ? [...snapshot.expandedAnalysisIds]
        : [];
      ProceduralState.prac1SelectedKey = snapshot.prac1SelectedKey || null;
      ProceduralState.prac2InputX = snapshot.prac2InputX || '';
      ProceduralState.prac2InputMin = snapshot.prac2InputMin || '';
      ProceduralState.prac2Submitted = Boolean(snapshot.prac2Submitted);

      this.render();

      const detailContainer = document.getElementById('procDetailSection');
      if (detailContainer) {
        if (ProceduralState.expandedAnalysisIds.length > 0) {
          ProceduralState.expandedAnalysisIds.forEach(qid => {
            const panel = document.getElementById(`proc_q_analysis_${qid}`);
            const btn = detailContainer.querySelector(`.btn-proc-toggle-analysis[data-id="${qid}"]`);
            const txt = btn?.querySelector('.analysis-btn-text');
            if (panel) panel.classList.remove('hidden');
            if (txt) txt.textContent = '收起标准解答';
          });
        }

        if (ProceduralState.prac1SelectedKey) {
          const optBtn = detailContainer.querySelector(`.prac1-opt-btn[data-opt-key="${ProceduralState.prac1SelectedKey}"]`);
          if (optBtn) optBtn.click();
        }
        const inputXEl = detailContainer.querySelector('#prac2InputX');
        const inputMinEl = detailContainer.querySelector('#prac2InputMin');
        if (inputXEl && ProceduralState.prac2InputX !== '') inputXEl.value = ProceduralState.prac2InputX;
        if (inputMinEl && ProceduralState.prac2InputMin !== '') inputMinEl.value = ProceduralState.prac2InputMin;
        if (ProceduralState.prac2Submitted) {
          const submitBtn = detailContainer.querySelector('#btnPrac2Submit');
          if (submitBtn) submitBtn.click();
        }
      }

      const syncWhiteboardAndScroll = () => {
        if (ProceduralState.dynamicDemoOpen && typeof ProceduralState.activeTimelineRenderFn === 'function') {
          ProceduralState.activeTimelineRenderFn(ProceduralState.currentTime);
          const playBtnText = document.getElementById('procDynPlayBtnText');
          const playBtnIcon = document.getElementById('procDynPlayBtnIcon');
          if (playBtnText) {
            playBtnText.textContent = ProceduralState.currentTime > 0.05 ? '继续播放' : '开始演示';
          }
          if (playBtnIcon) {
            playBtnIcon.textContent = '▶';
          }
        }
        const targetScrollY = Math.max(0, Number(snapshot.scrollY || 0));
        window.scrollTo({ top: targetScrollY, behavior: 'auto' });
      };

      syncWhiteboardAndScroll();
      requestAnimationFrame(syncWhiteboardAndScroll);
      return true;
    },

    goBackDetail() {
      if (!Array.isArray(ProceduralState.detailHistoryStack) || ProceduralState.detailHistoryStack.length === 0) {
        return false;
      }
      const prevSnapshot = ProceduralState.detailHistoryStack.pop();
      ProceduralState.suspendedDetailSnapshot = null;
      return this.restoreDetailSnapshot(prevSnapshot);
    },

    suspendCurrentDetailState() {
      if (ProceduralState.subView === 'detail' && ProceduralState.selectedProcedureId) {
        stopDynamicPlayback();
        ProceduralState.suspendedDetailSnapshot = captureCurrentDetailSnapshot();
      }
    },

    hasSuspendedDetailSnapshot() {
      return Boolean(ProceduralState.suspendedDetailSnapshot && ProceduralState.suspendedDetailSnapshot.procedureId);
    },

    resumeSuspendedDetail() {
      if (!this.hasSuspendedDetailSnapshot()) return false;
      const snap = ProceduralState.suspendedDetailSnapshot;
      ProceduralState.suspendedDetailSnapshot = null;
      return this.restoreDetailSnapshot(snap);
    },

    openDetailFromExternal(procedureId) {
      const proc = window.ProceduralKnowledgeService?.getProcedureById(procedureId);
      if (!proc) return;

      if (this.hasSuspendedDetailSnapshot()) {
        const snap = ProceduralState.suspendedDetailSnapshot;
        if (snap.procedureId === procedureId) {
          if (typeof switchView === 'function' && window.state && window.state.currentView !== 'procedural') {
            switchView('procedural');
          } else {
            this.resumeSuspendedDetail();
          }
          return;
        }
        ProceduralState.suspendedDetailSnapshot = null;
        pushDetailHistorySnapshot(snap, procedureId);
      } else if (
        ProceduralState.subView === 'detail' &&
        ProceduralState.selectedProcedureId &&
        ProceduralState.selectedProcedureId !== procedureId
      ) {
        pushDetailHistorySnapshot(captureCurrentDetailSnapshot(), procedureId);
      }

      if (typeof switchView === 'function' && window.state && window.state.currentView !== 'procedural') {
        switchView('procedural');
      }
      this.openDetail(procedureId, false, { recordHistory: false, clearHistory: false });
    },

    openQuestionInBankDetail(questionId, chapter) {
      this.suspendCurrentDetailState();
      if (typeof switchView === 'function') {
        switchView('bank');
      }
      state.chapterFilter = chapter || 'all';
      state.typeFilter = 'all';
      state.diffFilter = 'all';
      state.searchKeyword = '';
      state.currentPage = 1;

      const pool = (window.QUESTION_BANK || []).filter(q => state.chapterFilter === 'all' ? true : q.chapter === state.chapterFilter);
      const qIdx = pool.findIndex(q => q.id === questionId);
      const pageSize = state.pageSize || 15;
      if (qIdx >= 0) {
        state.currentPage = Math.floor(qIdx / pageSize) + 1;
      }

      if (typeof syncUiToState === 'function') syncUiToState();
      if (typeof saveUiPreferences === 'function') saveUiPreferences();
      if (typeof renderQuestionList === 'function') renderQuestionList();

      setTimeout(() => {
        const card = document.querySelector(`#questionList .question-card[data-id="${questionId}"]`);
        if (card) {
          const panel = document.getElementById(`analysis_${questionId}`);
          const toggleBtn = card.querySelector('.btn-toggle-analysis');
          if (panel && panel.classList.contains('hidden') && toggleBtn) {
            toggleBtn.click();
          }
          card.classList.add('ring-2', 'ring-[#0F766E]');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => card.classList.remove('ring-2', 'ring-[#0F766E]'), 2600);
        }
      }, 80);
    },

    getFilteredCollections() {
      const allCols = window.ProceduralKnowledgeService?.getAllCollections() || [];
      return allCols.filter(col => {
        const p = col.procedure;
        if (p.status !== 'published' && p.status !== 'reviewed') return false;
        if (ProceduralState.gradeFilter !== 'all' && p.grade !== ProceduralState.gradeFilter) return false;
        if (ProceduralState.subjectFilter !== 'all' && p.subject !== ProceduralState.subjectFilter) return false;
        if (ProceduralState.chapterFilter !== 'all' && p.chapter !== ProceduralState.chapterFilter) return false;
        if (ProceduralState.searchKeyword) {
          const kw = ProceduralState.searchKeyword.toLowerCase();
          const nameMatch = (p.name || '').toLowerCase().includes(kw) || (p.id || '').toLowerCase().includes(kw);
          const descMatch = (p.description || '').toLowerCase().includes(kw);
          const chapMatch = (p.chapter || '').toLowerCase().includes(kw) || (p.chapterGroup || '').toLowerCase().includes(kw);
          const stepMatch = Array.isArray(p.steps) && p.steps.some(st =>
            (st.title || '').toLowerCase().includes(kw) ||
            (st.description || '').toLowerCase().includes(kw) ||
            (st.example || '').toLowerCase().includes(kw)
          );
          const appMatch = Array.isArray(p.applicability) && p.applicability.some(a => String(a).toLowerCase().includes(kw));
          if (!nameMatch && !descMatch && !chapMatch && !stepMatch && !appMatch) return false;
        }
        return true;
      });
    },

    render() {
      const homeContainer = document.getElementById('procHomeSection');
      const detailContainer = document.getElementById('procDetailSection');
      if (!homeContainer || !detailContainer) return;

      if (ProceduralState.subView === 'detail') {
        homeContainer.classList.add('hidden');
        detailContainer.classList.remove('hidden');
        this.renderDetailView(detailContainer);
      } else {
        stopDynamicPlayback();
        detailContainer.classList.add('hidden');
        homeContainer.classList.remove('hidden');
        this.renderHomeView();
      }

      if (typeof renderMath === 'function') {
        renderMath();
      }
    },

    renderHomeView() {
      const chapterNavEl = document.getElementById('procChapterSidebar');
      const listContainer = document.getElementById('procCollectionListContainer');
      if (!chapterNavEl || !listContainer) return;

      const allCols = (window.ProceduralKnowledgeService?.getAllCollections() || []).filter(
        c => c.procedure.status === 'published' || c.procedure.status === 'reviewed'
      );
      const filteredCols = this.getFilteredCollections();

      const gradeDisplayMap = {
        '七年级': { title: '初一（七年级）', semester: '上册' },
        '八年级': { title: '初二（八年级）', semester: '上册' },
        '九年级': { title: '初三（九年级）', semester: '上册' }
      };
      const gradeOrder = ['七年级', '八年级', '九年级'];

      const byGrade = new Map();
      allCols.forEach(c => {
        const g = c.procedure.grade || '九年级';
        if (!byGrade.has(g)) byGrade.set(g, []);
        byGrade.get(g).push(c);
      });

      const isAllChap = ProceduralState.chapterFilter === 'all';
      const gradeCardsHtml = gradeOrder
        .filter(g => byGrade.has(g))
        .map(g => {
          const gCols = byGrade.get(g);
          const gMeta = gradeDisplayMap[g] || { title: g, semester: '全册' };
          const byGroup = new Map();
          gCols.forEach(c => {
            const grp = c.procedure.chapterGroup || c.procedure.chapter || '未分组章节';
            if (!byGroup.has(grp)) byGroup.set(grp, []);
            byGroup.get(grp).push(c);
          });

          const groupCardsHtml = Array.from(byGroup.entries()).map(([grpName, grpCols]) => {
            const secCounts = new Map();
            grpCols.forEach(c => {
              const ch = c.procedure.chapter;
              secCounts.set(ch, (secCounts.get(ch) || 0) + 1);
            });
            return `
              <details class="nav-chapter-group-card mb-2" open>
                <summary>
                  <span>${escapeHtml(grpName)}</span>
                  <span class="nav-chapter-group-badge">${secCounts.size} 节 · ${grpCols.length} 项</span>
                </summary>
                <div class="nav-chapter-group-content space-y-1">
                  ${Array.from(secCounts.entries()).map(([chapName, cnt]) => {
                    const active = ProceduralState.chapterFilter === chapName;
                    return `
                      <button type="button" class="proc-chap-btn chapter-tree-btn nav-topic-button ${active ? 'is-active' : ''}" data-proc-chap="${escapeHtml(chapName)}">
                        <span class="nav-topic-label">${escapeHtml(chapName)}</span>
                        <span class="nav-topic-count">${cnt}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
              </details>
            `;
          }).join('');

          return `
            <details class="nav-grade-card" open>
              <summary>
                <span>${escapeHtml(gMeta.title)}</span>
                <span class="text-xs font-semibold text-slate-500">${gCols.length} 项</span>
              </summary>
              <div class="nav-grade-content">
                <div class="mb-2 last:mb-0">
                  <div class="nav-semester-label">
                    <span>${escapeHtml(gMeta.semester)}</span>
                    <span>${gCols.length} 项</span>
                  </div>
                  <div class="space-y-1">
                    ${groupCardsHtml}
                  </div>
                </div>
              </div>
            </details>
          `;
        }).join('');

      chapterNavEl.innerHTML = `
        <button type="button" class="proc-chap-btn chapter-tree-btn ${isAllChap ? 'is-active' : ''} w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold" data-proc-chap="all">
          <span>全部程序性知识</span>
          <span class="text-xs font-bold">${allCols.length} 项</span>
        </button>

        <div class="space-y-3">
          ${gradeCardsHtml}
        </div>
      `;

      chapterNavEl.querySelectorAll('.proc-chap-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          ProceduralState.chapterFilter = btn.getAttribute('data-proc-chap') || 'all';
          this.renderHomeView();
          if (typeof renderMath === 'function') renderMath();
        });
      });

      if (filteredCols.length === 0) {
        listContainer.innerHTML = `
          <div class="ui-card py-14 text-center text-slate-400 text-xs">
            未找到匹配的程序性知识，请尝试调整搜索词或筛选条件。
          </div>
        `;
        return;
      }

      const renderProcCardHtml = (col) => {
        const p = col.procedure;
        const hasDynDemo = Boolean(window.PROCEDURAL_DYNAMIC_DEMOS && window.PROCEDURAL_DYNAMIC_DEMOS[p.id]);
        return `
          <div class="proc-collection-card ui-card p-5 hover:border-[#0F766E] hover:shadow-sm cursor-pointer transition-all duration-150 flex flex-col justify-between group" data-open-proc="${escapeHtml(p.id)}">
            <div class="space-y-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="flex flex-wrap items-center gap-1.5 text-xs">
                  <span class="px-2 py-0.5 rounded bg-[#0F766E] text-white font-bold tracking-wide">${escapeHtml(p.id)}</span>
                  <span class="px-2 py-0.5 rounded bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1] font-medium">${escapeHtml(p.grade)}</span>
                  <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">${escapeHtml(p.chapter)}</span>
                  ${hasDynDemo ? `<span class="px-2 py-0.5 rounded bg-teal-50 text-[#0F766E] border border-[#99F6E4] font-semibold">▶ 动态演示</span>` : ''}
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="px-2 py-0.5 rounded-full bg-teal-50 text-[#0F766E] text-[11px] font-semibold">${col.totalQuestions} 题</span>
                  <svg class="w-4 h-4 text-slate-300 group-hover:text-[#0F766E] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>

              <h3 class="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors pt-0.5">
                ${renderMathText(p.name)}
              </h3>

              <p class="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                ${renderMathText(p.description)}
              </p>
            </div>
          </div>
        `;
      };

      const groupedList = new Map();
      filteredCols.forEach(col => {
        const g = col.procedure.grade || '其他';
        const grp = col.procedure.chapterGroup || col.procedure.chapter || '未分组章节';
        const key = `${g}__${grp}`;
        if (!groupedList.has(key)) {
          groupedList.set(key, { grade: g, chapterGroup: grp, items: [] });
        }
        groupedList.get(key).items.push(col);
      });

      if (groupedList.size > 1) {
        listContainer.innerHTML = `
          <div class="space-y-6">
            ${Array.from(groupedList.values()).map(group => `
              <section class="space-y-3">
                <div class="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/80">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1] text-xs font-bold">${escapeHtml(group.grade)}</span>
                    <h3 class="text-sm sm:text-base font-bold text-slate-800">${escapeHtml(group.chapterGroup)}</h3>
                  </div>
                  <span class="text-xs font-semibold text-slate-500">${group.items.length} 项</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  ${group.items.map(renderProcCardHtml).join('')}
                </div>
              </section>
            `).join('')}
          </div>
        `;
      } else {
        listContainer.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${filteredCols.map(renderProcCardHtml).join('')}
          </div>
        `;
      }

      listContainer.querySelectorAll('[data-open-proc]').forEach(card => {
        card.addEventListener('click', () => {
          const pid = card.getAttribute('data-open-proc');
          this.openDetail(pid, false, { clearHistory: true });
        });
      });
    },

    // =========================================================================
    // 60fps 网课级互动演算白板（单一视觉焦点画布 + 逐项 Token 书写 + 真实 DOM 坐标 SVG 弧线批注 + 同步字幕）
    // =========================================================================
    buildDynamicTeachingModuleHtml(demoData) {
      if (!demoData) return '';
      const totalSteps = demoData.steps.length;
      const curStep = ProceduralState.dynamicStep || 1;
      const prac1 = demoData.practices.practice1;
      const prac2 = demoData.practices.practice2;

      // 预先渲染主白板的 8 行算式与每一个独立 Token（初始化时一次性完成 KaTeX 渲染，播放期间 0 重排）
      const boardRowsHtml = (demoData.boardRows || []).map(row => {
        const tokensHtml = row.tokens.map(tk => `
          <span class="proc-wb-token" id="proc_tk_${escapeHtml(tk.id)}" data-token-id="${escapeHtml(tk.id)}" data-appear-at="${tk.appearAt}" data-dur="${tk.dur || 0.4}" style="opacity:0; transform:translateY(8px) scale(0.94);">
            ${renderMathText(tk.math)}
          </span>
        `).join('');

        return `
          <div class="proc-wb-row ${row.isConclusion ? 'is-row-conclusion' : ''}" id="proc_${escapeHtml(row.rowId)}" data-row-appear="${row.appearAt}" style="opacity:0; pointer-events:none;">
            <div class="text-base sm:text-[18px] font-semibold text-slate-900 leading-relaxed flex flex-wrap items-baseline gap-x-0.5">
              ${tokensHtml}
            </div>
            <span class="proc-wb-row-badge px-2 py-0.5 rounded text-[11px] font-semibold bg-white text-slate-500 border border-slate-200 shrink-0">
              ${escapeHtml(row.stepBadge)}
            </span>
          </div>
        `;
      }).join('');

      // 预先渲染右侧「同步草稿演算浮窗」卡片（同一时间最多只浮现当前正在演算的 1 张卡片）
      const scratchpadCardsHtml = (demoData.scratchpadCards || []).map(sp => {
        const spTokensHtml = sp.tokens.map(tk => `
          <div class="proc-wb-token block py-0.5 text-sm sm:text-base font-bold text-slate-900" id="proc_tk_${escapeHtml(tk.id)}" data-token-id="${escapeHtml(tk.id)}" data-appear-at="${tk.appearAt}" data-dur="${tk.dur || 0.4}" style="opacity:0; transform:translateY(6px);">
            ${renderMathText(tk.math)}
          </div>
        `).join('');

        return `
          <div class="proc-wb-scratchpad-card hidden space-y-2" id="proc_${escapeHtml(sp.id)}" data-show-start="${sp.showStart}" data-show-end="${sp.showEnd}">
            <div class="flex items-center justify-between pb-1.5 border-b border-teal-100">
              <span class="text-xs font-bold text-[#0F766E] inline-flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#0F766E]"></span>
                <span>${escapeHtml(sp.title)}</span>
              </span>
              <span class="px-1.5 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E] text-[10px] font-bold">草稿演算</span>
            </div>
            <div class="space-y-1 pl-1">
              ${spTokensHtml}
            </div>
            <div class="pt-1.5 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              ${renderMathText(sp.note)}
            </div>
          </div>
        `;
      }).join('');

      // 预先渲染讲师同步字幕（每条字幕独立完成 KaTeX 渲染，播放时按时间区间切换显隐）
      const subtitlesHtml = (demoData.subtitles || []).map((sub, idx) => `
        <span class="proc-wb-sub-item ${idx === 0 ? 'inline' : 'hidden'}" data-sub-idx="${idx}" data-t-start="${sub.tStart}" data-t-end="${sub.tEnd}" data-focus-token="${escapeHtml(sub.focusToken || '')}">
          ${renderMathText(sub.text)}
        </span>
      `).join('');

      // 预先渲染底部 C. 原理解释区的 5 条步骤核心原理
      const stepExplanationsHtml = demoData.steps.map(st => `
        <span class="proc-wb-step-exp ${st.step === curStep ? 'inline' : 'hidden'}" data-exp-step="${st.step}">
          ${renderMathText(st.explanation)}
        </span>
      `).join('');

      return `
        <div id="procDynamicDemoModule" class="${ProceduralState.dynamicDemoOpen ? 'block' : 'hidden'} space-y-3.5 pt-1">
          <!-- A. 学习进度与五步章节导航区 -->
          <div class="p-4 rounded-xl bg-white border border-[#99F6E4] space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">网课互动白板</span>
                <h4 class="text-sm sm:text-base font-bold text-slate-900">${renderMathText(demoData.title)}</h4>
                <span class="text-xs text-slate-500">示例题：${renderMathText(demoData.exampleTitle)}</span>
              </div>
              <button type="button" id="btnProcCloseDynamicDemo" class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1">
                <span>← 返回核心操作</span>
              </button>
            </div>

            <div class="space-y-2 pt-1 border-t border-slate-100">
              <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span id="procDynStepStatusText" class="font-bold text-[#0F766E]">
                  ${renderMathText(`当前进度：第 ${curStep} / ${totalSteps} 步 · ${demoData.steps[curStep - 1].name}`)}
                </span>
                <span id="procDynBeatLabelText" class="text-slate-500 font-medium">正在书写：1.1 观察原式</span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                ${demoData.steps.map(st => {
                  const isAct = st.step === curStep;
                  return `
                    <button type="button" class="proc-dyn-step-tab px-2.5 py-2 rounded-lg border text-left text-xs transition-all flex items-center gap-2 ${
                      isAct
                        ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-[#F0FDFA] hover:border-[#99F6E4]'
                    }" data-step="${st.step}">
                      <span class="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        isAct ? 'bg-white text-[#0F766E]' : 'bg-white text-slate-600 border border-slate-200'
                      }">${st.step}</span>
                      <span class="truncate">${renderMathText(st.name)}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- B-Top. 60fps 视频级时间轴与播放控制栏（置顶于白板正上方，进入即可直观控制与拖拽进度） -->
          <div class="p-3.5 rounded-xl bg-white border border-[#99F6E4] shadow-sm space-y-2.5">
            <!-- 可自由拖拽的毫秒级时间轴滑块 -->
            <div class="flex items-center gap-3">
              <span id="procTimeCurrentLabel" class="text-xs font-mono font-bold text-[#0F766E] w-14 shrink-0">00:00.0</span>
              <div class="relative flex-1 flex items-center">
                <input type="range" id="procTimelineRange" class="proc-timeline-range" min="0" max="${demoData.totalDuration}" step="0.05" value="0">
              </div>
              <span class="text-xs font-mono text-slate-400 w-14 text-right shrink-0">${formatTimeSec(demoData.totalDuration)}</span>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button type="button" id="btnProcDynPlayPause" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5">
                  <span id="procDynPlayBtnIcon">▶</span>
                  <span id="procDynPlayBtnText">开始演示</span>
                </button>
                <button type="button" id="btnProcDynPrev" class="proc-dyn-ctrl-btn btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold" ${curStep <= 1 ? 'disabled' : ''}>
                  ← 上一步
                </button>
                <button type="button" id="btnProcDynNext" class="proc-dyn-ctrl-btn btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold" ${curStep >= totalSteps ? 'disabled' : ''}>
                  下一步 →
                </button>
                <button type="button" id="btnProcDynPrevBeat" class="proc-dyn-ctrl-btn btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-medium" title="跳转到上一个关键节点">
                  ◀ 上一个关键节点
                </button>
                <button type="button" id="btnProcDynNextBeat" class="proc-dyn-ctrl-btn btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-medium" title="跳转到下一个关键节点">
                  下一个关键节点 ▶
                </button>
                <button type="button" id="btnProcDynReplayStep" class="btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-medium" title="从头重播当前步骤的板书过程">
                  ↻ 重播本步
                </button>
                <button type="button" id="btnProcDynRestart" class="btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-medium" title="回到开头静止状态">
                  ↺ 回到开头
                </button>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <!-- 倍速切换 -->
                <div class="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
                  ${[0.75, 1.0, 1.5].map(rate => `
                    <button type="button" class="proc-speed-btn px-2 py-1 rounded-md font-semibold transition ${
                      ProceduralState.playbackRate === rate ? 'bg-[#0F766E] text-white' : 'text-slate-600 hover:text-[#0F766E]'
                    }" data-rate="${rate}">${rate}x</button>
                  `).join('')}
                </div>

                <button type="button" id="btnProcDynGoPractice" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1">
                  <span>✎ 进入跟做练习</span>
                </button>
              </div>
            </div>
          </div>

          <!-- B. 单一视觉焦点「网课互动演算白板」 -->
          <div id="procWhiteboardStage" class="proc-wb-stage proc-wb-grid-bg p-4 space-y-3">
            <!-- SVG 实时几何手写批注层（基于真实 DOM 坐标动态绘制弧线箭头与底部花括号） -->
            <svg id="procBoardSvgOverlay" class="proc-wb-svg-overlay" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="procArrowTeal" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0F766E"></path>
                </marker>
                <marker id="procArrowAmber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#D97706"></path>
                </marker>
              </defs>
              <g id="procSvgDynamicGroup"></g>
            </svg>

            <!-- KaTeX 批注标签悬浮层（预渲染规范分式，高清不裁剪） -->
            <div id="procBoardLabelLayer" class="proc-wb-label-layer"></div>

            <!-- 讲师激光笔/手写笔焦点光标 -->
            <div id="procTeacherPen" class="proc-teacher-pen" style="left: 48px; top: 48px; opacity: 0;"></div>

            <!-- 白板顶部状态栏 -->
            <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-teal-100/80 relative z-10">
              <div class="flex items-center gap-2 text-xs">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0F766E]"></span>
                <span class="font-bold text-slate-800">例题板书推演区：${renderMathText(demoData.exampleTitle)}</span>
              </div>
              <div class="flex items-center gap-3 text-[11px] text-slate-500">
                <span class="inline-flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-[#0F766E]"></span>
                  <span>青绿圈点：当前视线焦点</span>
                </span>
                <span class="inline-flex items-center gap-1">
                  <span class="w-2.5 h-2.5 rounded-sm bg-[#FEF3C7] border border-[#FCD34D]"></span>
                  <span>琥珀高亮：正在变形的数</span>
                </span>
              </div>
            </div>

            <!-- 白板核心内容：左侧主等式逐项书写区 + 右侧同步草稿浮窗 -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start relative z-10 min-h-[280px]">
              <!-- 主等式板书区 -->
              <div class="lg:col-span-8 space-y-2.5" id="procWbMainEquations">
                ${boardRowsHtml}
              </div>

              <!-- 右侧动态几何图形（若有）与同步草稿演算区 -->
              <div class="lg:col-span-4 lg:sticky lg:top-4 space-y-2.5">
                ${demoData.geometryDiagram ? `
                  <div class="p-3.5 rounded-xl bg-white border border-[#99F6E4] shadow-sm space-y-2">
                    <div class="flex items-center justify-between pb-1.5 border-b border-teal-100">
                      <span class="text-xs font-bold text-[#0F766E] inline-flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-[#0F766E]"></span>
                        <span>${escapeHtml(demoData.geometryDiagram.title || '动态几何图形')}</span>
                      </span>
                      <span class="px-1.5 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E] text-[10px] font-bold">实时几何联动</span>
                    </div>
                    <div class="flex justify-center items-center bg-[#F8FAFC] rounded-lg p-2 border border-slate-100">
                      ${demoData.geometryDiagram.svgHtml}
                    </div>
                    ${demoData.geometryDiagram.caption ? `<div class="text-[11px] text-slate-500 text-center leading-relaxed">${escapeHtml(demoData.geometryDiagram.caption)}</div>` : ''}
                  </div>
                ` : ''}
                ${scratchpadCardsHtml}
                <div id="procScratchpadIdleHint" class="p-3.5 rounded-xl border border-dashed border-slate-200 bg-white/60 text-xs text-slate-400 text-center">
                  ${escapeHtml(demoData.scratchpadIdleHint || '旁白草稿演算区（当步骤涉及辅助运算时在此同步展开）')}
                </div>
              </div>
            </div>

            <!-- 底部：讲师同步讲解字幕栏（像看网课视频一样逐句引导视线） -->
            <div class="proc-wb-subtitle-bar flex items-center gap-3 relative z-10">
              <span class="px-2 py-0.5 rounded bg-white/20 text-white text-[11px] font-bold shrink-0">讲师讲解</span>
              <div class="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                ${subtitlesHtml}
              </div>
            </div>
          </div>

          <!-- C. 原理解释区 -->
          <div class="p-3.5 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] flex items-start gap-2.5">
            <span class="px-2 py-0.5 rounded bg-[#115E59] text-white text-[11px] font-bold shrink-0 mt-0.5">本步核心原理</span>
            <p class="text-xs sm:text-sm text-[#115E59] font-medium leading-relaxed">
              ${stepExplanationsHtml}
            </p>
          </div>

          <!-- 六、跟做练习模块 -->
          <div id="procDynPracticeSection" class="${ProceduralState.practiceVisible ? 'block' : 'hidden'} p-5 rounded-xl bg-white border-2 border-[#0F766E] space-y-5">
            <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">跟着操作</span>
                <h4 class="text-sm sm:text-base font-bold text-slate-900">${renderMathText(demoData.practiceSectionTitle || `${demoData.title}关键动作跟做练习`)}</h4>
              </div>
              <span class="text-xs text-slate-500">${escapeHtml(demoData.practiceSectionSub || '完成以下两道关键操作练习，检验是否掌握核心解题动作')}</span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
              <!-- 练习一 -->
              <div class="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs sm:text-sm font-bold text-slate-900">${escapeHtml(prac1.title)}</span>
                  <button type="button" id="btnPrac1Reset" class="text-xs text-[#0F766E] hover:underline font-medium">重新作答</button>
                </div>

                <div class="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5 text-xs sm:text-sm text-slate-800">
                  <div>${escapeHtml(prac1.givenLabel || '已知：')}${renderMathText(prac1.givenFormula)}</div>
                  ${prac1.extractedFormula ? `<div>${escapeHtml(prac1.extractedLabel || '整理变形后：')}${renderMathText(prac1.extractedFormula)}</div>` : ''}
                  <div class="font-bold text-slate-900 pt-1">${renderMathText(prac1.questionText)}</div>
                </div>

                <div class="space-y-2" id="prac1OptionsList">
                  ${prac1.options.map(opt => `
                    <button type="button" class="prac1-opt-btn w-full text-left px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-[#F0FDFA] hover:border-[#99F6E4] text-xs sm:text-sm text-slate-800 transition flex items-center justify-between" data-opt-key="${opt.key}">
                      <span>${renderMathText(opt.text)}</span>
                      <span class="prac1-opt-indicator text-xs font-bold text-slate-400">选择</span>
                    </button>
                  `).join('')}
                </div>

                <div id="prac1FeedbackCorrect" class="hidden p-3.5 rounded-lg bg-[#F0FDFA] border border-[#0F766E] space-y-1.5 text-xs sm:text-sm text-[#115E59]">
                  <div class="font-bold text-[#0F766E]">✓ ${escapeHtml(prac1.correctFeedback.title)}</div>
                  <div class="pl-3 border-l-2 border-[#0F766E] space-y-1 font-semibold text-slate-900">
                    ${prac1.correctFeedback.calcLines.map(line => `<div>${renderMathText(line)}</div>`).join('')}
                  </div>
                  <div class="text-xs text-slate-700 pt-0.5">${renderMathText(prac1.correctFeedback.summary)}</div>
                </div>

                <div id="prac1FeedbackWrong" class="hidden p-3.5 rounded-lg bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-900 space-y-1">
                  <div class="font-bold">${escapeHtml(prac1.wrongTitle || '提示：请留意当前步骤的核心法则')}</div>
                  <div>${renderMathText(prac1.wrongFeedback)}</div>
                </div>
              </div>

              <!-- 练习二 -->
              <div class="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs sm:text-sm font-bold text-slate-900">${escapeHtml(prac2.title)}</span>
                  <button type="button" id="btnPrac2Reset" class="text-xs text-[#0F766E] hover:underline font-medium">重新作答</button>
                </div>

                <div class="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5 text-xs sm:text-sm text-slate-800">
                  <div>${escapeHtml(prac2.givenLabel || '给出条件：')}${renderMathText(prac2.givenFormula)}</div>
                  <div class="font-bold text-slate-900 pt-1">${renderMathText(prac2.questionText)}</div>
                </div>

                <div class="p-3.5 rounded-lg bg-white border border-slate-200 space-y-3 text-xs sm:text-sm">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-slate-700 font-medium">${renderMathText(prac2.input1Prefix || '当 $x =$')}</span>
                    <input type="text" id="prac2InputX" placeholder="${escapeHtml(prac2.input1Placeholder || '如 -2')}" class="w-24 px-2.5 py-1.5 rounded-lg border border-slate-200 text-center font-bold text-sm">
                    <span class="text-slate-700 font-medium">${renderMathText(prac2.input2Prefix || '时，取得最小值')}</span>
                    <input type="text" id="prac2InputMin" placeholder="${escapeHtml(prac2.input2Placeholder || '如 -5')}" class="w-24 px-2.5 py-1.5 rounded-lg border border-slate-200 text-center font-bold text-sm">
                    ${prac2.input2Suffix ? `<span class="text-xs text-slate-400">${escapeHtml(prac2.input2Suffix)}</span>` : ''}
                  </div>

                  <div class="flex flex-wrap items-center gap-2 pt-1">
                    <button type="button" id="btnPrac2Submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-semibold">
                      提交检验
                    </button>
                    <span class="text-xs text-slate-400">可输入数值后点击「提交检验」</span>
                  </div>
                </div>

                <div id="prac2FeedbackCorrect" class="hidden p-3.5 rounded-lg bg-[#F0FDFA] border border-[#0F766E] space-y-1.5 text-xs sm:text-sm text-[#115E59]">
                  <div class="font-bold text-[#0F766E]">✓ 回答正确！${renderMathText(prac2.correctFeedback)}</div>
                  <div class="text-xs text-slate-700 leading-relaxed">${renderMathText(prac2.correctDetail)}</div>
                </div>

                <div id="prac2FeedbackWrong" class="hidden p-3.5 rounded-lg bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-900 space-y-1">
                  <div class="font-bold">提示：请再检查一下</div>
                  <div id="prac2WrongHintText">${renderMathText(prac2.wrongFeedback)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    bindDynamicTeachingEvents(container, demoData) {
      if (!demoData) return;
      const totalSteps = demoData.steps.length;
      const totalDuration = demoData.totalDuration || 32.0;
      const staticChecklistEl = container.querySelector('#procStaticStepsList');
      const dynModuleEl = container.querySelector('#procDynamicDemoModule');
      const openBtn = container.querySelector('#btnOpenDynamicDemo');
      const closeBtn = container.querySelector('#btnProcCloseDynamicDemo');
      const wbStage = container.querySelector('#procWhiteboardStage');
      const svgGroup = container.querySelector('#procSvgDynamicGroup');
      const labelLayer = container.querySelector('#procBoardLabelLayer');
      const teacherPen = container.querySelector('#procTeacherPen');
      const timelineRange = container.querySelector('#procTimelineRange');
      const timeCurrentLabel = container.querySelector('#procTimeCurrentLabel');

      // 预渲染 SVG 批注标签与微动作提示的 KaTeX HTML（保证分式规范展示且 60fps 零重排）
      const annPillElsMap = new Map();
      if (labelLayer) {
        labelLayer.innerHTML = '';
        (demoData.svgAnnotations || []).forEach(ann => {
          if (!ann.label) return;
          const pillEl = document.createElement('div');
          const isBrace = ann.type === 'under-brace';
          pillEl.className = 'proc-svg-label-pill';
          pillEl.style.backgroundColor = isBrace ? '#F0FDFA' : '#FFFFFF';
          pillEl.style.border = `1.2px solid ${ann.color}`;
          pillEl.style.color = ann.color;
          pillEl.style.opacity = '0';
          pillEl.style.display = 'none';
          pillEl.innerHTML = renderMathText(ann.label);
          labelLayer.appendChild(pillEl);
          annPillElsMap.set(ann.id, pillEl);
        });
      }

      const beatHtmlCache = new Map();
      (demoData.microBeats || []).forEach(b => {
        beatHtmlCache.set(b.label, renderMathText(`当前焦点：${b.label}`));
      });
      let lastBeatRendered = '';

      const stepStatusHtmlCache = new Map();
      (demoData.steps || []).forEach(st => {
        stepStatusHtmlCache.set(st.step, renderMathText(`当前进度：第 ${st.step} / ${totalSteps} 步 · ${st.name}`));
      });
      let lastStepStatusRendered = -1;

      // 缓存所有 Token 与行节点引用，保证 60fps 帧循环内零 DOM 查询开销
      const tokenElsMap = new Map();
      container.querySelectorAll('.proc-wb-token').forEach(el => {
        const tid = el.getAttribute('data-token-id');
        if (tid) {
          tokenElsMap.set(tid, {
            el,
            appearAt: parseFloat(el.getAttribute('data-appear-at') || '0'),
            dur: parseFloat(el.getAttribute('data-dur') || '0.4')
          });
        }
      });

      const rowElsList = Array.from(container.querySelectorAll('.proc-wb-row')).map(el => ({
        el,
        appearAt: parseFloat(el.getAttribute('data-row-appear') || '0')
      }));

      const scratchpadList = Array.from(container.querySelectorAll('.proc-wb-scratchpad-card')).map(el => ({
        el,
        showStart: parseFloat(el.getAttribute('data-show-start') || '0'),
        showEnd: parseFloat(el.getAttribute('data-show-end') || '0')
      }));
      const scratchpadIdleHint = container.querySelector('#procScratchpadIdleHint');

      const subtitleList = Array.from(container.querySelectorAll('.proc-wb-sub-item')).map(el => ({
        el,
        tStart: parseFloat(el.getAttribute('data-t-start') || '0'),
        tEnd: parseFloat(el.getAttribute('data-t-end') || '0'),
        focusToken: el.getAttribute('data-focus-token') || ''
      }));

      const geoAnimList = Array.from(container.querySelectorAll('.proc-geo-anim')).map(el => ({
        el,
        appearAt: parseFloat(el.getAttribute('data-appear-at') || '0'),
        dur: parseFloat(el.getAttribute('data-dur') || '0.5'),
        dashLen: parseFloat(el.getAttribute('data-dash-len') || '0')
      }));

      // 根据给定时间戳 t 定位所属教学步骤 (1..totalSteps)
      const getStepAtTime = (t) => {
        for (let i = demoData.steps.length - 1; i >= 0; i--) {
          const st = demoData.steps[i];
          if (t > st.tStart + 0.01) {
            return st.step;
          }
          if (Math.abs(t - st.tStart) <= 0.01) {
            // 当单步播放刚好到达上一步终点（与下一步起点重合）或处于恢复静止状态时，保持在原步骤
            if (
              i > 0 &&
              !ProceduralState.isContinuousMode &&
              (Math.abs(ProceduralState.targetStopTime - st.tStart) <= 0.05 ||
                (!ProceduralState.isPlaying && ProceduralState.dynamicStep === demoData.steps[i - 1].step))
            ) {
              return demoData.steps[i - 1].step;
            }
            return st.step;
          }
        }
        return 1;
      };

      // 计算某个 Token 相对于白板容器的像素几何矩形
      const getTokenRectInStage = (tokenId) => {
        const item = tokenElsMap.get(tokenId);
        if (!item || !wbStage) return null;
        const stageRect = wbStage.getBoundingClientRect();
        const tkRect = item.el.getBoundingClientRect();
        if (tkRect.width === 0 && tkRect.height === 0) return null;
        return {
          left: tkRect.left - stageRect.left,
          right: tkRect.right - stageRect.left,
          top: tkRect.top - stageRect.top,
          bottom: tkRect.bottom - stageRect.top,
          cx: (tkRect.left + tkRect.right) / 2 - stageRect.left,
          cy: (tkRect.top + tkRect.bottom) / 2 - stageRect.top,
          width: tkRect.width,
          height: tkRect.height
        };
      };

      // 实时绘制 SVG 手写弧线箭头与底部花括号，并定位预渲染的 KaTeX 分式标签悬浮层
      const renderSvgAnnotationsAt = (t) => {
        if (!svgGroup) return;
        const activeMarkup = [];
        const visibleLabelIds = new Set();

        (demoData.svgAnnotations || []).forEach(ann => {
          if (t < ann.tStart || t > ann.tEnd) return;
          const drawP = easeOutCubic((t - ann.tStart) / Math.max(0.1, ann.tDrawEnd - ann.tStart));
          let alpha = 1;
          if (t > ann.tFadeStart) {
            alpha = 1 - clamp01((t - ann.tFadeStart) / Math.max(0.1, ann.tEnd - ann.tFadeStart));
          }

          const pillEl = annPillElsMap.get(ann.id);

          if (ann.type === 'arrow') {
            const rFrom = getTokenRectInStage(ann.fromToken);
            const rTo = getTokenRectInStage(ann.toToken);
            if (!rFrom || !rTo) return;

            const isSameRow = Math.abs(rFrom.cy - rTo.cy) < 22;
            const isCrossCol = Math.abs(rFrom.cx - rTo.cx) > 160;
            let x1, y1, x2, y2, mx, my;

            if (isSameRow && !isCrossCol) {
              x1 = rFrom.cx;
              y1 = rFrom.top - 2;
              x2 = rTo.cx;
              y2 = rTo.top - 3;
              mx = (x1 + x2) / 2;
              my = Math.min(y1, y2) - Math.abs(ann.curveOffset || 24);
            } else if (isCrossCol) {
              const goingRight = rTo.cx > rFrom.cx;
              x1 = goingRight ? rFrom.right + 4 : rFrom.left - 4;
              y1 = rFrom.cy;
              x2 = goingRight ? rTo.left - 4 : rTo.right + 4;
              y2 = rTo.cy;
              mx = (x1 + x2) / 2;
              my = Math.min(y1, y2) - Math.abs(ann.curveOffset || 26);
            } else {
              x1 = rFrom.cx;
              y1 = rFrom.bottom + 2;
              x2 = rTo.cx;
              y2 = rTo.top - 4;
              mx = (x1 + x2) / 2 + (ann.curveOffset || 0);
              my = (y1 + y2) / 2 - Math.abs(ann.curveOffset || 20) * 0.25;
            }

            const approxLen = Math.hypot(x2 - x1, y2 - y1) * 1.35 + 40;
            const dashOffset = approxLen * (1 - drawP);
            const markerId = ann.color === '#D97706' ? 'url(#procArrowAmber)' : 'url(#procArrowTeal)';
            const labelX = (x1 + 2 * mx + x2) / 4;
            const labelY = isSameRow ? ((y1 + 2 * my + y2) / 4 - 10) : ((y1 + 2 * my + y2) / 4);

            activeMarkup.push(`
              <g opacity="${alpha.toFixed(2)}">
                <path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"
                      fill="none" stroke="${ann.color}" stroke-width="2.2" stroke-linecap="round"
                      stroke-dasharray="${approxLen.toFixed(1)}" stroke-dashoffset="${dashOffset.toFixed(1)}"
                      marker-end="${drawP > 0.85 ? markerId : ''}" />
              </g>
            `);

            if (pillEl && drawP > 0.35) {
              visibleLabelIds.add(ann.id);
              pillEl.style.display = 'block';
              pillEl.style.left = `${labelX.toFixed(1)}px`;
              pillEl.style.top = `${labelY.toFixed(1)}px`;
              pillEl.style.opacity = (alpha * clamp01((drawP - 0.35) * 2)).toFixed(2);
            }
          } else if (ann.type === 'under-brace') {
            const rStart = getTokenRectInStage(ann.startToken);
            const rEnd = getTokenRectInStage(ann.endToken);
            if (!rStart || !rEnd) return;

            const x1 = Math.min(rStart.left, rEnd.left) - 1;
            const x2 = Math.max(rStart.right, rEnd.right) + 1;
            const y = Math.max(rStart.bottom, rEnd.bottom) + 2;
            const midX = (x1 + x2) / 2;
            const approxLen = (x2 - x1) + 32;
            const dashOffset = approxLen * (1 - drawP);

            activeMarkup.push(`
              <g opacity="${alpha.toFixed(2)}">
                <path d="M ${x1.toFixed(1)} ${y.toFixed(1)} Q ${x1.toFixed(1)} ${(y + 6).toFixed(1)} ${(x1 + 7).toFixed(1)} ${(y + 6).toFixed(1)} L ${(midX - 5).toFixed(1)} ${(y + 6).toFixed(1)} L ${midX.toFixed(1)} ${(y + 11).toFixed(1)} L ${(midX + 5).toFixed(1)} ${(y + 6).toFixed(1)} L ${(x2 - 7).toFixed(1)} ${(y + 6).toFixed(1)} Q ${x2.toFixed(1)} ${(y + 6).toFixed(1)} ${x2.toFixed(1)} ${y.toFixed(1)}"
                      fill="none" stroke="${ann.color}" stroke-width="2" stroke-linecap="round"
                      stroke-dasharray="${approxLen.toFixed(1)}" stroke-dashoffset="${dashOffset.toFixed(1)}" />
              </g>
            `);

            if (pillEl && drawP > 0.4) {
              visibleLabelIds.add(ann.id);
              pillEl.style.display = 'block';
              pillEl.style.left = `${midX.toFixed(1)}px`;
              pillEl.style.top = `${(y + 27).toFixed(1)}px`;
              pillEl.style.opacity = (alpha * clamp01((drawP - 0.4) * 2)).toFixed(2);
            }
          }
        });

        annPillElsMap.forEach((pillEl, id) => {
          if (!visibleLabelIds.has(id)) {
            pillEl.style.display = 'none';
            pillEl.style.opacity = '0';
          }
        });

        svgGroup.innerHTML = activeMarkup.join('');
      };

      // 核心 60fps 渲染函数：根据当前精确秒数 t 同步更新所有视觉层
      const renderTimelineAt = (rawTime) => {
        const t = Math.max(0, Math.min(totalDuration, rawTime));
        ProceduralState.currentTime = t;
        const step = getStepAtTime(t);
        ProceduralState.dynamicStep = step;

        // 1. 更新时间轴滑块与时间读数
        if (timelineRange && document.activeElement !== timelineRange) {
          timelineRange.value = String(t);
        }
        if (timeCurrentLabel) {
          timeCurrentLabel.textContent = formatTimeSec(t);
        }

        // 2. 更新顶部步骤状态与微动作节点提示
        const stepObj = demoData.steps[step - 1];
        const statusText = container.querySelector('#procDynStepStatusText');
        if (statusText && stepObj && lastStepStatusRendered !== step) {
          lastStepStatusRendered = step;
          statusText.innerHTML = stepStatusHtmlCache.get(step) || renderMathText(`当前进度：第 ${step} / ${totalSteps} 步 · ${stepObj.name}`);
        }

        let currentBeat = demoData.microBeats[0];
        for (const b of demoData.microBeats) {
          if (t >= b.time - 0.6) currentBeat = b;
        }
        const beatLabelText = container.querySelector('#procDynBeatLabelText');
        if (beatLabelText && currentBeat && lastBeatRendered !== currentBeat.label) {
          lastBeatRendered = currentBeat.label;
          beatLabelText.innerHTML = beatHtmlCache.get(currentBeat.label) || escapeHtml(`当前焦点：${currentBeat.label}`);
        }

        // 3. 更新顶部 5 个步骤按钮与底部原理解释显隐
        container.querySelectorAll('.proc-dyn-step-tab').forEach(tab => {
          const sNum = Number(tab.getAttribute('data-step'));
          const isAct = sNum === step;
          tab.className = `proc-dyn-step-tab px-2.5 py-2 rounded-lg border text-left text-xs transition-all flex items-center gap-2 ${
            isAct
              ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-[#F0FDFA] hover:border-[#99F6E4]'
          }`;
          const badge = tab.querySelector('span:first-child');
          if (badge) {
            badge.className = `w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
              isAct ? 'bg-white text-[#0F766E]' : 'bg-white text-slate-600 border border-slate-200'
            }`;
          }
        });

        container.querySelectorAll('.proc-wb-step-exp').forEach(expEl => {
          const sNum = Number(expEl.getAttribute('data-exp-step'));
          expEl.classList.toggle('inline', sNum === step);
          expEl.classList.toggle('hidden', sNum !== step);
        });

        // 4. 更新主白板各行显隐与当前激活行
        let latestActiveRow = null;
        rowElsList.forEach(rItem => {
          const visible = t >= rItem.appearAt;
          rItem.el.style.opacity = visible ? '1' : '0';
          rItem.el.style.pointerEvents = visible ? 'auto' : 'none';
          rItem.el.classList.remove('is-row-active');
          if (visible) latestActiveRow = rItem.el;
        });
        if (latestActiveRow && !latestActiveRow.classList.contains('is-row-conclusion')) {
          latestActiveRow.classList.add('is-row-active');
        }

        // 5. 更新右侧同步草稿演算浮窗（同一时刻只展示当前时间窗口内的草稿卡）
        let anyScratchpadShown = false;
        scratchpadList.forEach(spItem => {
          const show = t >= spItem.showStart && t <= spItem.showEnd;
          spItem.el.classList.toggle('hidden', !show);
          if (show) anyScratchpadShown = true;
        });
        if (scratchpadIdleHint) {
          scratchpadIdleHint.classList.toggle('hidden', anyScratchpadShown);
        }

        // 6. 计算当前时间点下的 Token 高亮集合
        const activeHlMap = new Map();
        (demoData.tokenHighlights || []).forEach(hl => {
          if (t >= hl.tStart && t <= hl.tEnd) {
            activeHlMap.set(hl.tokenId, hl.color);
          }
        });

        // 7. 逐个 Token 插值更新书写透明度、位移与高亮样式，并记录正在书写的最新 Token
        let writingTokenId = null;
        tokenElsMap.forEach((tkItem, tid) => {
          const p = easeOutCubic((t - tkItem.appearAt) / Math.max(0.08, tkItem.dur));
          tkItem.el.style.opacity = p.toFixed(3);
          const ty = (1 - p) * 7;
          const sc = 0.94 + 0.06 * p;
          tkItem.el.style.transform = `translateY(${ty.toFixed(2)}px) scale(${sc.toFixed(3)})`;

          if (t >= tkItem.appearAt && t <= tkItem.appearAt + tkItem.dur + 0.15) {
            writingTokenId = tid;
          }

          const hlColor = activeHlMap.get(tid);
          tkItem.el.classList.toggle('is-hl-teal', hlColor === 'teal');
          tkItem.el.classList.toggle('is-hl-amber', hlColor === 'amber');
          tkItem.el.classList.toggle('is-hl-rose', hlColor === 'rose');
        });

        // 8. 更新底部同步讲师字幕与激光笔追踪坐标
        let activeFocusToken = writingTokenId;
        subtitleList.forEach((subItem, idx) => {
          const isCur = (t >= subItem.tStart && t < subItem.tEnd) || (idx === subtitleList.length - 1 && t >= subItem.tStart);
          subItem.el.classList.toggle('inline', isCur);
          subItem.el.classList.toggle('hidden', !isCur);
          if (isCur && !activeFocusToken && subItem.focusToken) {
            activeFocusToken = subItem.focusToken;
          }
        });

        if (teacherPen && activeFocusToken) {
          const rect = getTokenRectInStage(activeFocusToken);
          if (rect) {
            teacherPen.style.opacity = '1';
            teacherPen.style.left = `${(rect.right - 2).toFixed(1)}px`;
            teacherPen.style.top = `${(rect.bottom - 2).toFixed(1)}px`;
          } else {
            teacherPen.style.opacity = '0';
          }
        } else if (teacherPen) {
          teacherPen.style.opacity = '0';
        }

        // 9. 更新 SVG 几何手写批注层与右侧动态几何图形层
        renderSvgAnnotationsAt(t);
        geoAnimList.forEach(gItem => {
          const p = easeOutCubic((t - gItem.appearAt) / Math.max(0.08, gItem.dur));
          gItem.el.style.opacity = p.toFixed(3);
          if (gItem.dashLen > 0) {
            gItem.el.style.strokeDasharray = String(gItem.dashLen);
            gItem.el.style.strokeDashoffset = (gItem.dashLen * (1 - p)).toFixed(1);
          }
        });

        // 10. 更新上一步/下一步与关键节点按钮状态
        const prevBtn = container.querySelector('#btnProcDynPrev');
        const nextBtn = container.querySelector('#btnProcDynNext');
        if (prevBtn) prevBtn.disabled = step <= 1;
        if (nextBtn) nextBtn.disabled = step >= totalSteps;

        const beats = demoData.microBeats || [];
        const prevBeatBtn = container.querySelector('#btnProcDynPrevBeat');
        const nextBeatBtn = container.querySelector('#btnProcDynNextBeat');
        if (prevBeatBtn) {
          const hasPrevBeat = beats.some(b => b.time < t - 0.15);
          prevBeatBtn.disabled = !hasPrevBeat;
        }
        if (nextBeatBtn) {
          const hasNextBeat = beats.some(b => b.time > t + 0.15);
          nextBeatBtn.disabled = !hasNextBeat;
        }
      };

      ProceduralState.activeTimelineRenderFn = renderTimelineAt;

      // 启动 60fps 时间轴播放（播放至 targetStopTime 自动平滑停住）
      const playTimelineTo = (startTime, stopTime, isContinuous = false) => {
        stopDynamicPlayback();
        ProceduralState.currentTime = startTime;
        ProceduralState.targetStopTime = stopTime;
        ProceduralState.isContinuousMode = isContinuous;
        ProceduralState.isPlaying = true;
        ProceduralState.lastFrameTs = performance.now();

        const playBtnText = document.getElementById('procDynPlayBtnText');
        const playBtnIcon = document.getElementById('procDynPlayBtnIcon');
        if (playBtnText) playBtnText.textContent = '暂停';
        if (playBtnIcon) playBtnIcon.textContent = '⏸';

        renderTimelineAt(startTime);

        const tick = (now) => {
          if (!ProceduralState.isPlaying) return;
          const dt = Math.min(0.06, Math.max(0, (now - ProceduralState.lastFrameTs) / 1000));
          ProceduralState.lastFrameTs = now;
          const nextT = ProceduralState.currentTime + dt * (ProceduralState.playbackRate || 1.0);

          if (nextT >= ProceduralState.targetStopTime) {
            renderTimelineAt(ProceduralState.targetStopTime);
            stopDynamicPlayback();
            return;
          }

          renderTimelineAt(nextT);
          ProceduralState.rafId = requestAnimationFrame(tick);
        };

        ProceduralState.rafId = requestAnimationFrame(tick);
      };

      // 播放指定步骤（如第 1 步：从 0.0s 流畅演播到 6.5s 后自动暂停）
      const playSingleStep = (stepNum) => {
        const sIdx = Math.max(0, Math.min(totalSteps - 1, stepNum - 1));
        const stObj = demoData.steps[sIdx];
        ProceduralState.dynamicStep = stObj.step;
        playTimelineTo(stObj.tStart, stObj.tEnd, false);
      };

      const toggleDemoMode = (open) => {
        ProceduralState.dynamicDemoOpen = open;
        stopDynamicPlayback();
        if (dynModuleEl) dynModuleEl.classList.toggle('hidden', !open);
        if (staticChecklistEl) staticChecklistEl.classList.toggle('hidden', open);
        if (openBtn) {
          openBtn.innerHTML = open
            ? '<span>返回核心操作</span>'
            : '<span>▶ 动态演示</span>';
        }
        if (open) {
          // 进入动态演示时不自动播放第一步，停在 0 秒静止帧由用户决定何时开始
          ProceduralState.currentTime = 0.0;
          ProceduralState.dynamicStep = 1;
          ProceduralState.targetStopTime = demoData.steps[0]?.tEnd || 6.5;
          renderTimelineAt(0.0);
          const playBtnText = document.getElementById('procDynPlayBtnText');
          if (playBtnText) playBtnText.textContent = '开始演示';
          requestAnimationFrame(() => {
            renderTimelineAt(0.0);
          });
        }
      };

      openBtn?.addEventListener('click', () => {
        toggleDemoMode(!ProceduralState.dynamicDemoOpen);
      });

      closeBtn?.addEventListener('click', () => {
        toggleDemoMode(false);
      });

      // 点击顶部步骤标签：播放对应步骤区间
      container.querySelectorAll('.proc-dyn-step-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const s = Number(tab.getAttribute('data-step')) || 1;
          playSingleStep(s);
        });
      });

      // 拖拽时间轴滑块：实时 60fps 预览任意时刻帧
      timelineRange?.addEventListener('input', (e) => {
        stopDynamicPlayback();
        const val = parseFloat(e.target.value || '0');
        renderTimelineAt(val);
      });

      // 上一步：直接回到上一步并从上一步起始位置开始播放
      container.querySelector('#btnProcDynPrev')?.addEventListener('click', () => {
        const curStep = ProceduralState.dynamicStep || getStepAtTime(ProceduralState.currentTime);
        if (curStep <= 1) return;
        playSingleStep(curStep - 1);
      });

      // 下一步：无论当前步骤是否播放完毕，直接进入下一步并从下一步起始位置开始播放
      container.querySelector('#btnProcDynNext')?.addEventListener('click', () => {
        const curStep = ProceduralState.dynamicStep || getStepAtTime(ProceduralState.currentTime);
        if (curStep >= totalSteps) return;
        playSingleStep(curStep + 1);
      });

      // 上一个关键节点 / 下一个关键节点（按 microBeats 关键时间戳步进定格）
      container.querySelector('#btnProcDynPrevBeat')?.addEventListener('click', () => {
        stopDynamicPlayback();
        const beats = demoData.microBeats || [];
        if (beats.length === 0) return;
        let targetBeat = null;
        for (let i = beats.length - 1; i >= 0; i--) {
          if (beats[i].time < ProceduralState.currentTime - 0.15) {
            targetBeat = beats[i];
            break;
          }
        }
        if (!targetBeat) return;
        ProceduralState.dynamicStep = targetBeat.step || getStepAtTime(targetBeat.time);
        ProceduralState.targetStopTime = demoData.steps[Math.max(0, ProceduralState.dynamicStep - 1)]?.tEnd || totalDuration;
        renderTimelineAt(targetBeat.time);
      });

      container.querySelector('#btnProcDynNextBeat')?.addEventListener('click', () => {
        stopDynamicPlayback();
        const beats = demoData.microBeats || [];
        if (beats.length === 0) return;
        let targetBeat = null;
        for (let i = 0; i < beats.length; i++) {
          if (beats[i].time > ProceduralState.currentTime + 0.15) {
            targetBeat = beats[i];
            break;
          }
        }
        if (!targetBeat) return;
        ProceduralState.dynamicStep = targetBeat.step || getStepAtTime(targetBeat.time);
        ProceduralState.targetStopTime = demoData.steps[Math.max(0, ProceduralState.dynamicStep - 1)]?.tEnd || totalDuration;
        renderTimelineAt(targetBeat.time);
      });

      // 开始演示 / 连续播放 / 暂停
      container.querySelector('#btnProcDynPlayPause')?.addEventListener('click', () => {
        if (ProceduralState.isPlaying) {
          stopDynamicPlayback();
        } else {
          const startT = ProceduralState.currentTime >= totalDuration - 0.2 ? 0 : ProceduralState.currentTime;
          playTimelineTo(startT, totalDuration, true);
        }
      });

      // 重播本步
      container.querySelector('#btnProcDynReplayStep')?.addEventListener('click', () => {
        const curStep = ProceduralState.dynamicStep || getStepAtTime(ProceduralState.currentTime);
        playSingleStep(curStep);
      });

      // 回到开头静止状态
      container.querySelector('#btnProcDynRestart')?.addEventListener('click', () => {
        stopDynamicPlayback();
        ProceduralState.dynamicStep = 1;
        ProceduralState.targetStopTime = demoData.steps[0]?.tEnd || 6.5;
        renderTimelineAt(0.0);
        const playBtnText = document.getElementById('procDynPlayBtnText');
        if (playBtnText) playBtnText.textContent = '开始演示';
      });

      // 倍速切换 (0.75x / 1.0x / 1.5x)
      container.querySelectorAll('.proc-speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const rate = parseFloat(btn.getAttribute('data-rate') || '1.0');
          ProceduralState.playbackRate = rate;
          container.querySelectorAll('.proc-speed-btn').forEach(b => {
            const r = parseFloat(b.getAttribute('data-rate') || '1.0');
            b.className = `proc-speed-btn px-2 py-1 rounded-md font-semibold transition ${
              r === rate ? 'bg-[#0F766E] text-white' : 'text-slate-600 hover:text-[#0F766E]'
            }`;
          });
        });
      });

      container.querySelector('#btnProcDynGoPractice')?.addEventListener('click', () => {
        stopDynamicPlayback();
        ProceduralState.practiceVisible = true;
        const pracSection = container.querySelector('#procDynPracticeSection');
        if (pracSection) {
          pracSection.classList.remove('hidden');
          pracSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });

      // 练习一交互：判断配方操作
      const prac1CorrectEl = container.querySelector('#prac1FeedbackCorrect');
      const prac1WrongEl = container.querySelector('#prac1FeedbackWrong');
      const prac1Btns = container.querySelectorAll('.prac1-opt-btn');

      prac1Btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-opt-key');
          const optObj = demoData.practices.practice1.options.find(o => o.key === key);
          if (!optObj) return;
          ProceduralState.prac1SelectedKey = key;

          prac1Btns.forEach(b => {
            const bKey = b.getAttribute('data-opt-key');
            const ind = b.querySelector('.prac1-opt-indicator');
            if (bKey === key) {
              if (optObj.isCorrect) {
                b.className = 'prac1-opt-btn w-full text-left px-3.5 py-2.5 rounded-lg border-2 border-[#0F766E] bg-[#F0FDFA] text-xs sm:text-sm text-[#115E59] font-bold transition flex items-center justify-between';
                if (ind) { ind.textContent = '✓ 正确'; ind.className = 'prac1-opt-indicator text-xs font-bold text-[#0F766E]'; }
              } else {
                b.className = 'prac1-opt-btn w-full text-left px-3.5 py-2.5 rounded-lg border-2 border-amber-400 bg-amber-50 text-xs sm:text-sm text-amber-900 font-semibold transition flex items-center justify-between';
                if (ind) { ind.textContent = '请再试一次'; ind.className = 'prac1-opt-indicator text-xs font-bold text-amber-700'; }
              }
            } else {
              b.className = 'prac1-opt-btn w-full text-left px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-[#F0FDFA] hover:border-[#99F6E4] text-xs sm:text-sm text-slate-800 transition flex items-center justify-between';
              if (ind) { ind.textContent = '选择'; ind.className = 'prac1-opt-indicator text-xs font-bold text-slate-400'; }
            }
          });

          if (optObj.isCorrect) {
            prac1CorrectEl?.classList.remove('hidden');
            prac1WrongEl?.classList.add('hidden');
          } else {
            prac1WrongEl?.classList.remove('hidden');
            prac1CorrectEl?.classList.add('hidden');
          }
        });
      });

      container.querySelector('#btnPrac1Reset')?.addEventListener('click', () => {
        ProceduralState.prac1SelectedKey = null;
        prac1CorrectEl?.classList.add('hidden');
        prac1WrongEl?.classList.add('hidden');
        prac1Btns.forEach(b => {
          const ind = b.querySelector('.prac1-opt-indicator');
          b.className = 'prac1-opt-btn w-full text-left px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-[#F0FDFA] hover:border-[#99F6E4] text-xs sm:text-sm text-slate-800 transition flex items-center justify-between';
          if (ind) { ind.textContent = '选择'; ind.className = 'prac1-opt-indicator text-xs font-bold text-slate-400'; }
        });
      });

      // 练习二交互：判断最值
      const inputX = container.querySelector('#prac2InputX');
      const inputMin = container.querySelector('#prac2InputMin');
      const prac2CorrectEl = container.querySelector('#prac2FeedbackCorrect');
      const prac2WrongEl = container.querySelector('#prac2FeedbackWrong');
      const prac2WrongHintText = container.querySelector('#prac2WrongHintText');

      const normalizeNumStr = (val) => String(val || '').trim().replace(/[−﹣－]/g, '-').replace(/^\+/, '');

      inputX?.addEventListener('input', () => {
        ProceduralState.prac2InputX = inputX.value;
      });
      inputMin?.addEventListener('input', () => {
        ProceduralState.prac2InputMin = inputMin.value;
      });

      const checkPrac2 = () => {
        ProceduralState.prac2InputX = inputX?.value || '';
        ProceduralState.prac2InputMin = inputMin?.value || '';
        ProceduralState.prac2Submitted = true;
        const xVal = normalizeNumStr(inputX?.value);
        const minVal = normalizeNumStr(inputMin?.value);
        const p2Cfg = demoData.practices.practice2;
        const expX = p2Cfg.expectedX;
        const expMin = p2Cfg.expectedMin;
        const isMatch = (xVal === expX && minVal === expMin) ||
          (Boolean(p2Cfg.allowOrderSwap) && xVal === expMin && minVal === expX);

        if (isMatch) {
          prac2CorrectEl?.classList.remove('hidden');
          prac2WrongEl?.classList.add('hidden');
        } else {
          prac2CorrectEl?.classList.add('hidden');
          prac2WrongEl?.classList.remove('hidden');
          if (prac2WrongHintText) {
            let customHint = '';
            if (Array.isArray(p2Cfg.specificWrongHints)) {
              for (const rule of p2Cfg.specificWrongHints) {
                if (rule.checkType === 'firstVal' && xVal === rule.val) { customHint = rule.hint; break; }
                if (rule.checkType === 'secondVal' && minVal === rule.val) { customHint = rule.hint; break; }
                if (rule.checkType === 'sameVal' && xVal === rule.val && (minVal === rule.val || !minVal)) { customHint = rule.hint; break; }
                if (rule.checkType === 'anyVal' && (xVal === rule.val || minVal === rule.val)) { customHint = rule.hint; break; }
              }
            }
            prac2WrongHintText.innerHTML = renderMathText(customHint || p2Cfg.wrongFeedback);
          }
        }
      };

      container.querySelector('#btnPrac2Submit')?.addEventListener('click', checkPrac2);
      inputX?.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkPrac2(); });
      inputMin?.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkPrac2(); });

      container.querySelector('#btnPrac2Reset')?.addEventListener('click', () => {
        if (inputX) inputX.value = '';
        if (inputMin) inputMin.value = '';
        ProceduralState.prac2InputX = '';
        ProceduralState.prac2InputMin = '';
        ProceduralState.prac2Submitted = false;
        prac2CorrectEl?.classList.add('hidden');
        prac2WrongEl?.classList.add('hidden');
      });

      if (ProceduralState.dynamicDemoOpen) {
        renderTimelineAt(ProceduralState.currentTime || 0.0);
        const playBtnText = document.getElementById('procDynPlayBtnText');
        if (playBtnText && !ProceduralState.isPlaying) {
          playBtnText.textContent = ProceduralState.currentTime > 0.05 ? '继续播放' : '开始演示';
        }
        requestAnimationFrame(() => {
          renderTimelineAt(ProceduralState.currentTime || 0.0);
          const btnText = document.getElementById('procDynPlayBtnText');
          if (btnText && !ProceduralState.isPlaying) {
            btnText.textContent = ProceduralState.currentTime > 0.05 ? '继续播放' : '开始演示';
          }
        });
      }
    },

    // =========================================================================
    // 层级 3：单项程序性知识详情页
    // =========================================================================
    renderDetailView(container) {
      const col = window.ProceduralKnowledgeService?.getQuestionCollectionByProcedure(ProceduralState.selectedProcedureId);
      if (!col) {
        ProceduralState.subView = 'home';
        this.render();
        return;
      }

      const p = col.procedure;
      const demoData = window.PROCEDURAL_DYNAMIC_DEMOS ? window.PROCEDURAL_DYNAMIC_DEMOS[p.id] : null;
      const bank = window.QUESTION_BANK || [];
      const qMap = new Map(bank.map(q => [q.id, q]));
      const exampleQ = p.exampleQuestionId ? qMap.get(p.exampleQuestionId) : null;

      const prereqProcs = (p.prerequisiteProcedureIds || [])
        .map(id => window.ProceduralKnowledgeService.getProcedureById(id))
        .filter(Boolean);
      const subseqProcs = (p.subsequentProcedureIds || [])
        .map(id => window.ProceduralKnowledgeService.getProcedureById(id))
        .filter(Boolean);
      const relatedProcs = (p.relatedProcedureIds || [])
        .map(id => window.ProceduralKnowledgeService.getProcedureById(id))
        .filter(Boolean);

      const stepsHtml = (p.steps || []).map((st, idx) => {
        const stepNum = st.step || (idx + 1);
        return `
          <div class="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3.5">
            <div class="w-8 h-8 rounded-lg bg-[#0F766E] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              ${stepNum}
            </div>
            <div class="flex-1 min-w-0 space-y-1.5">
              <div class="text-sm font-bold text-slate-900">
                步骤 ${stepNum}：${renderMathText(st.title)}
              </div>
              <div class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ${renderMathText(st.description)}
              </div>
              ${st.formula || st.example ? `
                <div class="pt-1.5 mt-1.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-slate-600 bg-slate-50/80 px-3 py-2 rounded-lg">
                  ${st.formula ? `<div><span class="font-semibold text-[#115E59]">表达式：</span>${renderMathText(st.formula)}</div>` : ''}
                  ${st.formula && st.example ? `<span class="hidden sm:inline text-slate-300">|</span>` : ''}
                  ${st.example ? `<div><span class="font-semibold text-slate-700">示例：</span>${renderMathText(st.example)}</div>` : ''}
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');

      const applicabilityHtml = (p.applicability || []).map(item => `
        <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-2 shrink-0"></span>
          <span>${renderMathText(item)}</span>
        </li>
      `).join('');

      const prereqListHtml = (p.prerequisites || []).map(pr => {
        if (pr.id) {
          return `
            <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-2 shrink-0"></span>
              <div>
                <span>依赖程序性知识：</span>
                <button type="button" class="text-[#0F766E] font-semibold hover:underline" data-nav-proc="${escapeHtml(pr.id)}">
                  ${escapeHtml(pr.id)} · ${renderMathText(pr.name)}
                </button>
              </div>
            </li>
          `;
        }
        return `
          <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></span>
            <span>${renderMathText(pr.name)}</span>
          </li>
        `;
      }).join('');

      const pitfallsHtml = (p.pitfalls || []).map(item => `
        <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
          <span>${renderMathText(item)}</span>
        </li>
      `).join('');

      let exampleSectionHtml = '';
      if (exampleQ) {
        const exOptionsHtml = (exampleQ.options && exampleQ.options.length > 0) ? `
          <div class="q-options-grid grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2.5 text-sm text-slate-800">
            ${exampleQ.options.map(opt => `<div class="answer-option ${typeof getOptionLayoutClass === 'function' ? getOptionLayoutClass(opt) : ''}">${renderMathText(opt)}</div>`).join('')}
          </div>
        ` : '';
        const exImgHtml = exampleQ.image ? `<div class="my-1.5"><img src="${exampleQ.image}" class="max-h-40 max-w-xs h-auto rounded object-contain"></div>` : '';
        const stepMapHtml = (p.exampleStepMapping || []).map(m => `
          <div class="p-2.5 rounded-lg bg-[#F0FDFA]/70 border border-[#CCFBF1] text-xs space-y-0.5">
            <div class="font-bold text-[#115E59]">${renderMathText(m.title)}</div>
            <div class="text-slate-700 leading-relaxed">${renderMathText(m.detail)}</div>
          </div>
        `).join('');

        exampleSectionHtml = `
          <section class="ui-card p-5 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] text-xs font-bold">典型例题</span>
                <h4 class="text-sm sm:text-base font-bold text-slate-900">核心操作步骤示范（原题 ID：${escapeHtml(exampleQ.id)}）</h4>
              </div>
              <button type="button" class="btn-secondary px-3 py-1 rounded-lg text-xs font-medium" data-open-bank-q="${escapeHtml(exampleQ.id)}" data-open-bank-chap="${escapeHtml(exampleQ.chapter)}">
                查看原题
              </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              <div class="lg:col-span-7 space-y-3">
                <div class="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                  <div class="flex flex-wrap items-center gap-2 text-xs">
                    <span class="q-meta-chapter">${escapeHtml(exampleQ.chapter)}</span>
                    <span class="q-meta-type">${escapeHtml(exampleQ.typeName)}</span>
                    <span class="${typeof getDifficultyBadgeClass === 'function' ? getDifficultyBadgeClass(exampleQ.difficulty) : 'q-meta-diff'}">${escapeHtml(exampleQ.difficulty)}</span>
                  </div>
                  <div class="text-sm text-slate-900 leading-relaxed">${renderMathText(exampleQ.stem)}</div>
                  ${exImgHtml}
                  ${exOptionsHtml}
                </div>

                <div class="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
                  ${typeof window.renderQuestionAnalysisBoxHtml === 'function' ? window.renderQuestionAnalysisBoxHtml(exampleQ) : ''}
                </div>
              </div>

              <div class="lg:col-span-5 space-y-2">
                <div class="text-xs font-bold text-slate-800 mb-1">与核心操作步骤的对应关系：</div>
                ${stepMapHtml}
              </div>
            </div>
          </section>
        `;
      }

      const questionsListHtml = col.items.map((item, idx) => {
        const q = item.question;
        const seqNum = idx + 1;
        const isSelected = state.selectedIds.has(q.id);
        const diffColor = typeof getDifficultyBadgeClass === 'function' ? getDifficultyBadgeClass(q.difficulty) : 'q-meta-diff';

        const optionsHtml = (q.options && q.options.length > 0) ? `
          <div class="q-options-grid grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm text-slate-800">
            ${q.options.map(opt => `<div class="answer-option ${typeof getOptionLayoutClass === 'function' ? getOptionLayoutClass(opt) : ''}">${renderMathText(opt)}</div>`).join('')}
          </div>
        ` : '';
        const imgHtml = q.image ? `<div class="my-1.5"><img src="${q.image}" class="max-h-40 max-w-xs h-auto rounded object-contain"></div>` : '';

        const hasSubparts = item.parts.some(pt => pt.partId !== null);
        const partsSummaryHtml = hasSubparts
          ? `<div class="mt-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1 text-xs text-slate-600">
              ${item.parts.map(pt => `
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="font-bold text-[#0F766E]">小问 ${escapeHtml(pt.partId || '')}</span>
                  ${pt.inCollectionOrder && pt.partId ? '<span class="px-1.5 py-0.2 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] text-[10px] font-semibold">当前进阶排序锚点</span>' : ''}
                  <span>${escapeHtml(pt.operationSummary)}</span>
                </div>
              `).join('')}
            </div>`
          : '';

        return `
          <div class="question-card ${isSelected ? 'is-selected' : ''}" data-id="${escapeHtml(q.id)}">
            <div class="q-card-header flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">学习顺序 #${seqNum}</span>
                <span class="text-xs font-semibold text-slate-500">题目编号：${escapeHtml(q.id)}</span>
                <span class="q-meta-chapter">${escapeHtml(q.chapter)}</span>
                <span class="q-meta-type">${escapeHtml(q.typeName)}</span>
                <span class="${diffColor}">${escapeHtml(q.difficulty)}</span>
              </div>
              <div class="q-meta-kp">
                <span>原题考点：</span><span class="q-meta-kp-text">${escapeHtml(q.knowledge)}</span>
              </div>
            </div>

            <div class="q-card-body text-sm leading-relaxed text-slate-900">
              <div class="q-stem-content">${renderMathText(q.stem)}</div>
              ${imgHtml}
              ${optionsHtml}
              ${partsSummaryHtml}
            </div>

            <div id="proc_q_analysis_${escapeHtml(q.id)}" class="hidden q-analysis-panel text-xs space-y-1.5">
              ${typeof window.renderQuestionAnalysisBoxHtml === 'function' ? window.renderQuestionAnalysisBoxHtml(q) : ''}
            </div>

            <div class="q-card-footer flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-2 text-xs">
                <button type="button" class="btn-proc-toggle-analysis q-aux-btn" data-id="${escapeHtml(q.id)}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  <span class="analysis-btn-text">查看标准解答</span>
                </button>
                <button type="button" class="q-aux-btn text-[#0F766E] font-semibold" data-open-bank-q="${escapeHtml(q.id)}" data-open-bank-chap="${escapeHtml(q.chapter)}">
                  <span>进入原题详情页 &rarr;</span>
                </button>
              </div>

              <button type="button" class="btn-proc-toggle-cart btn-toggle-cart ${isSelected ? 'is-remove' : ''} px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5" data-id="${escapeHtml(q.id)}">
                ${isSelected ? `
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>已加入试题篮</span>
                ` : `
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  <span>加入试题篮</span>
                `}
              </button>
            </div>
          </div>
        `;
      }).join('');

      const prevHistorySnap = Array.isArray(ProceduralState.detailHistoryStack) && ProceduralState.detailHistoryStack.length > 0
        ? ProceduralState.detailHistoryStack[ProceduralState.detailHistoryStack.length - 1]
        : null;
      const prevProcObj = prevHistorySnap
        ? window.ProceduralKnowledgeService?.getProcedureById(prevHistorySnap.procedureId)
        : null;

      container.innerHTML = `
        <!-- Breadcrumb Navigation -->
        <div class="ui-card px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex flex-wrap items-center gap-1.5 text-slate-500">
            <button type="button" id="btnProcBackHome" class="text-[#0F766E] font-semibold hover:underline">程序性知识首页</button>
            <span>/</span>
            <button type="button" id="btnProcBackChap" class="hover:text-[#0F766E] hover:underline" data-chap="${escapeHtml(p.chapter)}">${escapeHtml(p.chapter)}</button>
            <span>/</span>
            <span class="font-bold text-slate-800">${renderMathText(p.name)}</span>
          </div>
          ${prevHistorySnap ? `
            <button type="button" id="btnProcBackPrevKnowledge" class="px-3 py-1 rounded-lg bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] font-semibold hover:bg-[#CCFBF1]/60 transition inline-flex items-center gap-1.5" title="返回上一个浏览的程序性知识并恢复学习位置">
              <span>← 返回上一个知识：${escapeHtml(prevHistorySnap.procedureId)}</span>
              ${prevProcObj ? `<span class="hidden sm:inline text-slate-500 font-normal">· ${renderMathText(prevProcObj.name)}</span>` : ''}
            </button>
          ` : ''}
        </div>

        <!-- 4.1 Basic Information Header -->
        <section class="ui-card p-5 space-y-2">
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="px-2.5 py-0.5 rounded bg-[#0F766E] text-white font-bold">${escapeHtml(p.id)}</span>
            <span class="px-2.5 py-0.5 rounded bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1] font-semibold">${escapeHtml(p.grade)}</span>
            <span class="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${escapeHtml(p.chapter)}</span>
          </div>

          <h2 class="text-lg sm:text-xl font-bold text-slate-900">${renderMathText(p.name)}</h2>
          ${p.description ? `<p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${renderMathText(p.description)}</p>` : ''}
        </section>

        <!-- 4.2 Core Operations: Step-by-Step Checklist + [动态演示] Module -->
        <section class="ui-card p-5 space-y-3.5 border-[#99F6E4] bg-gradient-to-b from-[#F0FDFA]/50 to-white">
          <div class="pb-2.5 border-b border-teal-100 flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <h3 class="text-base font-bold text-slate-900">核心操作</h3>
              ${demoData ? `<span class="text-xs text-slate-500">（点击右侧「动态演示」可打开网课级互动白板，观看逐项书写与几何批注推演）</span>` : ''}
            </div>
            ${demoData ? `
              <button type="button" id="btnOpenDynamicDemo" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5">
                <span>${ProceduralState.dynamicDemoOpen ? '返回核心操作' : '▶ 动态演示'}</span>
              </button>
            ` : ''}
          </div>

          <div id="procStaticStepsList" class="${ProceduralState.dynamicDemoOpen && demoData ? 'hidden' : 'block'} space-y-3">
            ${stepsHtml}
          </div>

          ${demoData ? this.buildDynamicTeachingModuleHtml(demoData) : ''}
        </section>

        <!-- 4.3 Applicability, Prerequisites & Pitfalls -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <div class="ui-card p-5 space-y-3 flex flex-col">
            <div class="pb-2.5 border-b border-slate-100 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#0F766E]"></span>
              <h4 class="text-sm sm:text-base font-bold text-slate-900">适用条件</h4>
            </div>
            <ul class="space-y-2.5 flex-1">
              ${applicabilityHtml}
            </ul>
          </div>

          <div class="ui-card p-5 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="pb-2.5 border-b border-slate-100 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                <h4 class="text-sm sm:text-base font-bold text-slate-900">前置知识</h4>
              </div>
              <ul class="space-y-2.5">
                ${prereqListHtml}
              </ul>
            </div>

            ${pitfallsHtml ? `
              <div class="pt-3 border-t border-slate-100 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                  <h5 class="text-xs sm:text-sm font-bold text-slate-800">易错点与边界提醒</h5>
                </div>
                <ul class="space-y-1.5">
                  ${pitfallsHtml}
                </ul>
              </div>
            ` : ''}
          </div>
        </section>

        <!-- 4.4 Typical Example Question -->
        ${exampleSectionHtml}

        <!-- 4.6 Before/After Procedural Links & Jump to Knowledge Graph -->
        <section class="ui-card p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-slate-500 font-semibold">前置程序性知识：</span>
              ${prereqProcs.length > 0 ? prereqProcs.map(pr => `
                <button type="button" class="px-2.5 py-1 rounded-lg bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] font-semibold hover:bg-[#CCFBF1]/60 transition" data-nav-proc="${escapeHtml(pr.id)}">
                  ${escapeHtml(pr.id)} · ${renderMathText(pr.name)}
                </button>
              `).join('') : '<span class="text-slate-400">无直接前置程序性知识</span>'}
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-slate-500 font-semibold">后续关联程序性知识：</span>
              ${subseqProcs.length > 0 ? subseqProcs.map(sp => `
                <button type="button" class="px-2.5 py-1 rounded-lg bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] font-semibold hover:bg-[#CCFBF1]/60 transition" data-nav-proc="${escapeHtml(sp.id)}">
                  ${escapeHtml(sp.id)} · ${renderMathText(sp.name)}
                </button>
              `).join('') : relatedProcs.length > 0 ? relatedProcs.map(rp => `
                <button type="button" class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-semibold hover:border-[#0F766E] hover:text-[#0F766E] transition" data-nav-proc="${escapeHtml(rp.id)}">
                  同源操作对比：${escapeHtml(rp.id)} · ${renderMathText(rp.name)}
                </button>
              `).join('') : '<span class="text-slate-400">暂无后续直接关联集合</span>'}
            </div>
          </div>

          <button type="button" id="btnProcGoKnowledgeGraph" class="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5" data-graph-node="${escapeHtml(p.graphNodeId || 'cnm_225')}">
            <span>🕸️</span>
            <span>查看题目图谱</span>
          </button>
        </section>

        <!-- 4.5 Associated Question Collection -->
        <section class="space-y-3">
          <div class="ui-card p-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 class="text-sm sm:text-base font-bold text-slate-900">
                关联题目集合（共 ${col.totalQuestions} 题 · 按内部学习顺序 ${col.totalQuestions > 0 ? `1 → ${col.totalQuestions}` : '0'} 排列）
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">全部题目直接引用题库原始记录，点击「进入原题详情页」可在题库中查看完整原题与相似变式</p>
            </div>
            <button type="button" id="btnProcAddAllToBasket" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold">
              + 将本集合全部选入试题篮
            </button>
          </div>

          <div class="space-y-3" id="procDetailQuestionList">
            ${questionsListHtml}
          </div>
        </section>
      `;

      if (demoData) {
        this.bindDynamicTeachingEvents(container, demoData);
      }

      container.querySelector('#btnProcBackHome')?.addEventListener('click', () => this.openHome('all'));
      container.querySelector('#btnProcBackChap')?.addEventListener('click', (e) => {
        const ch = e.currentTarget.getAttribute('data-chap');
        this.openHome(ch || 'all');
      });
      container.querySelector('#btnProcBackPrevKnowledge')?.addEventListener('click', () => {
        this.goBackDetail();
      });

      container.querySelectorAll('[data-nav-proc]').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-nav-proc');
          if (targetId) this.openDetail(targetId, false, { recordHistory: true });
        });
      });

      container.querySelector('#btnProcGoKnowledgeGraph')?.addEventListener('click', (e) => {
        this.suspendCurrentDetailState();
        const nodeId = e.currentTarget.getAttribute('data-graph-node') || 'cnm_225';
        if (typeof window.jumpToKnowledgeGraphNode === 'function') {
          window.jumpToKnowledgeGraphNode(nodeId);
        }
      });

      container.querySelector('#btnProcAddAllToBasket')?.addEventListener('click', () => {
        const snap = captureCurrentDetailSnapshot();
        col.items.forEach(it => state.selectedIds.add(it.question.id));
        if (typeof updateStats === 'function') updateStats();
        if (typeof renderBasketDrawer === 'function') renderBasketDrawer();
        if (snap) {
          this.restoreDetailSnapshot(snap);
        } else {
          this.renderDetailView(container);
          if (typeof renderMath === 'function') renderMath();
        }
        if (typeof showToast === 'function') {
          showToast(`已将「${p.name}」集合的 ${col.totalQuestions} 道题目加入试题篮！`, 'success');
        }
      });

      container.querySelectorAll('.btn-proc-toggle-analysis').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-id');
          const panel = document.getElementById(`proc_q_analysis_${qid}`);
          const txt = btn.querySelector('.analysis-btn-text');
          if (!panel) return;
          const isHidden = panel.classList.contains('hidden');
          panel.classList.toggle('hidden', !isHidden);
          if (txt) txt.textContent = isHidden ? '收起标准解答' : '查看标准解答';
          if (qid) {
            if (isHidden) {
              if (!ProceduralState.expandedAnalysisIds.includes(qid)) {
                ProceduralState.expandedAnalysisIds.push(qid);
              }
            } else {
              ProceduralState.expandedAnalysisIds = ProceduralState.expandedAnalysisIds.filter(id => id !== qid);
            }
          }
        });
      });

      container.querySelectorAll('.btn-proc-toggle-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-id');
          const snap = captureCurrentDetailSnapshot();
          if (typeof toggleCartItem === 'function') toggleCartItem(qid);
          if (snap) {
            this.restoreDetailSnapshot(snap);
          } else {
            this.renderDetailView(container);
            if (typeof renderMath === 'function') renderMath();
          }
        });
      });

      container.querySelectorAll('[data-open-bank-q]').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-open-bank-q');
          const chap = btn.getAttribute('data-open-bank-chap');
          if (qid) this.openQuestionInBankDetail(qid, chap);
        });
      });
    }
  };

  window.ProceduralState = ProceduralState;
  window.ProceduralView = ProceduralView;
})();
