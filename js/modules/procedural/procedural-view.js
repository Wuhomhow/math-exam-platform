// 题典网「程序性知识」独立模块视图控制器 (procedural-view.js)
// 双栏直达动态演示工作台架构：
// 1. 左侧章节目录（仅到小节层级）+ 年级筛选联动 + 带清空按钮的搜索框 + 移动端抽屉
// 2. 右侧直达工作台：吸顶工具条（教材小节号、返回上一知识点、锚点）+ 同小节多知识点 Tab + 前置知识（已做可跳/未做置灰）+ 默认展开 60fps 互动演算白板 + 跟着操作 + 关联题目（题型筛选、分批展开、右侧原题抽屉预览）
// 3. URL Hash 路由（#/procedural/<id>）与 localStorage 上次浏览记忆
(function () {
  const LAST_PROC_STORAGE_KEY = 'math_exam_last_procedural_id';
  const RELATED_PAGE_SIZE = 8;

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function renderMathText(str) {
    if (typeof formatMathHtml === 'function') {
      return formatMathHtml(str);
    }
    return escapeHtml(str);
  }

  // AI 逐字流式演示速度参数：板书慢写（约 4–5 字/秒），底部讲解快出（约 12 字/秒，不干等）
  const STREAM_BASE_FLOW_SCALE = 0.65;
  const STREAM_CHARS_PER_SEC = 4.5;
  const SUBTITLE_CHARS_PER_SEC = 18;

  // 将含 $...$ 公式的文本安全拆分为「单字 + 完整公式原子」流式单元（KaTeX 一次性预渲染，播放期零重排）
  function renderStreamUnitsHtml(str, mode = 'board') {
    const raw = String(str || '');
    if (!raw) return '';
    const parts = raw.split(/(\$[^$]+\$)/g);
    const isSub = mode === 'subtitle';
    const initStyle = isSub ? 'display:none; opacity:0;' : 'opacity:0;';
    const out = [];
    for (const seg of parts) {
      if (!seg) continue;
      if (seg.length >= 2 && seg.startsWith('$') && seg.endsWith('$')) {
        out.push(`<span class="proc-stream-unit is-math-unit" data-w="2.4" style="${initStyle}">${renderMathText(seg)}</span>`);
      } else {
        for (const ch of Array.from(seg)) {
          if (ch === '\n') {
            out.push('<br>');
          } else {
            const w = /\s/.test(ch) ? '0.3' : '1';
            out.push(`<span class="proc-stream-unit" data-w="${w}" style="${initStyle}">${escapeHtml(ch)}</span>`);
          }
        }
      }
    }
    if (isSub) {
      out.push('<span class="proc-stream-cursor hidden" aria-hidden="true"></span>');
    }
    return out.join('');
  }

  function extractSectionCode(chapterStr) {
    const raw = String(chapterStr || '').trim();
    const m = raw.match(/^([0-9]+(?:\.[0-9]+)*(?:[–—-][0-9]+(?:\.[0-9]+)*)?)/);
    return m ? m[1] : raw;
  }

  // 80 个程序性知识与「题目图谱」三级核心考点的精准对齐映射表
  const PROC_TO_GRAPH_NODE_ID = {
    // 七年级
    P54: 'cnm_007', P55: 'cnm_008', P56: 'cnm_008', P33: 'cnm_009',
    P39: 'cnm_013', P40: 'cnm_018', P32: 'cnm_021',
    P04: 'cnm_026', P05: 'cnm_027', P06: 'cnm_030', P46: 'cnm_028', P07: 'cnm_028', P08: 'cnm_029', P09: 'cnm_029',
    P34: 'cnm_031', P47: 'cnm_032', P48: 'cnm_032', P49: 'cnm_033', P51: 'cnm_034', P28: 'cnm_035', P50: 'cnm_036', P45: 'cnm_038',
    P29: 'cnm_040', P22: 'cnm_043',
    // 八年级
    P42: 'cnm_121', P43: 'cnm_126', P44: 'cnm_128',
    P41: 'cnm_133', P37: 'cnm_137', P10: 'cnm_137', P38: 'cnm_139',
    P30: 'cnm_143', P27: 'cnm_145', P26: 'cnm_147', P23: 'cnm_148',
    P24: 'cnm_151', P25: 'cnm_154',
    P31: 'cnm_157', P35: 'cnm_160', P36: 'cnm_162',
    // 九年级
    P19: 'cnm_219', P20: 'cnm_219', P01: 'cnm_220', P02: 'cnm_221', P03: 'cnm_221', P16: 'cnm_223', P17: 'cnm_222', P18: 'cnm_224', P21: 'cnm_226',
    P67: 'cnm_229', P68: 'cnm_230', P69: 'cnm_231', P70: 'cnm_231',
    P71: 'cnm_232', P72: 'cnm_232', P73: 'cnm_235', P74: 'cnm_233',
    P75: 'cnm_234', P76: 'cnm_234', P77: 'cnm_234',
    P78: 'cnm_236', P79: 'cnm_236', P80: 'cnm_236',
    P81: 'cnm_265', P82: 'cnm_265',
    P83: 'cnm_251', P84: 'cnm_251',
    P85: 'cnm_252',
    P86: 'cnm_253', P87: 'cnm_254', P88: 'cnm_255',
    P89: 'cnm_256', P90: 'cnm_257', P91: 'cnm_258',
    P11: 'cnm_237', P58: 'cnm_237', P12: 'cnm_240',
    P57: 'cnm_238', P13: 'cnm_238', P14: 'cnm_238', P59: 'cnm_238', P60: 'cnm_238',
    P61: 'cnm_239', P62: 'cnm_239',
    P15: 'cnm_241', P63: 'cnm_241', P64: 'cnm_241', P65: 'cnm_241',
    P66: 'cnm_242',
    P52: 'cnm_250', P53: 'cnm_259'
  };

  let _graphNodeOrderCache = null;
  function getGraphNodeOrderIndex(nodeId) {
    if (!_graphNodeOrderCache) {
      _graphNodeOrderCache = new Map();
      const rawNodes = Array.isArray(window.KNOWLEDGE_NODES) ? window.KNOWLEDGE_NODES : [];
      rawNodes.forEach((n, idx) => {
        if (n && n.id) _graphNodeOrderCache.set(n.id, idx);
      });
    }
    return _graphNodeOrderCache.has(nodeId) ? _graphNodeOrderCache.get(nodeId) : 99999;
  }

  function getGraphAlignment(proc) {
    if (!proc) return { nodeId: '', nodeName: '', chapterId: '', chapterName: '', chapterOrder: 99999, nodeOrder: 99999 };
    if (window.GraphData && !window.GraphData.initialized) {
      window.GraphData.init();
    }
    let nodeId = PROC_TO_GRAPH_NODE_ID[proc.id] || '';
    if (!nodeId && window.GraphData && proc.exampleQuestionId) {
      const primaryNode = window.GraphData.getPrimaryKnowledgeNode(proc.exampleQuestionId);
      if (primaryNode) nodeId = primaryNode.id;
    }
    const kpNode = (nodeId && window.GraphData) ? window.GraphData.getNode(nodeId) : null;
    const parentMod = (kpNode && window.GraphData) ? window.GraphData.getParent(kpNode.id) : null;
    if (kpNode) {
      return {
        nodeId: kpNode.id,
        nodeName: kpNode.name,
        chapterId: parentMod ? parentMod.id : (proc.chapterGroup || ''),
        chapterName: parentMod ? parentMod.name : (proc.chapterGroup || proc.chapter || '未分组章节'),
        chapterOrder: parentMod ? getGraphNodeOrderIndex(parentMod.id) : 99999,
        nodeOrder: getGraphNodeOrderIndex(kpNode.id)
      };
    }
    return {
      nodeId: proc.chapter || proc.id,
      nodeName: proc.chapter || proc.name,
      chapterId: proc.chapterGroup || '',
      chapterName: proc.chapterGroup || proc.chapter || '未分组章节',
      chapterOrder: 99999,
      nodeOrder: 99999
    };
  }

  function normalizeQuestionType(q) {
    if (!q) return 'calc';
    if (q.type === 'choice' || q.type === 'blank' || q.type === 'judge' || q.type === 'calc') return q.type;
    if (q.type === 'answer' || q.type === 'solution') return 'calc';
    if (q.typeName === '单选题') return 'choice';
    if (q.typeName === '填空题') return 'blank';
    if (q.typeName === '判断题') return 'judge';
    return 'calc';
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

  function getPublishedCollections() {
    return (window.ProceduralKnowledgeService?.getAllCollections() || []).filter(
      c => c.procedure && (c.procedure.status === 'published' || c.procedure.status === 'reviewed')
    );
  }

  function getPublishedProcedureById(id) {
    if (!id) return null;
    const p = window.ProceduralKnowledgeService?.getProcedureById(id);
    if (!p) return null;
    if (p.status !== 'published' && p.status !== 'reviewed') return null;
    return p;
  }

  function parseProceduralHash() {
    const h = String(window.location.hash || '');
    const m = h.match(/^#\/procedural(?:\/([^/?#]+))?$/);
    if (!m) return null;
    return { matched: true, procedureId: m[1] ? decodeURIComponent(m[1]) : null };
  }

  const ProceduralState = {
    subView: 'detail', // 双栏工作台常驻直达详情
    selectedProcedureId: '',
    searchKeyword: '',
    gradeFilter: 'all',
    subjectFilter: 'all',
    chapterFilter: 'all',
    // 60fps 网课互动白板时间轴状态（默认展开）
    dynamicDemoOpen: true,
    dynamicStep: 1,
    currentTime: 0.0,
    targetStopTime: 6.5,
    playbackRate: 1.0,
    isPlaying: false,
    isContinuousMode: false,
    rafId: null,
    lastFrameTs: 0,
    activeTimelineRenderFn: null,
    practiceVisible: true,
    // 关联题目筛选、展开与原题抽屉状态
    relatedTypeFilter: 'all',
    relatedExpanded: false,
    previewQuestionId: null,
    // 详情页内部访问历史栈与跨模块返回挂起快照
    detailHistoryStack: [],
    suspendedDetailSnapshot: null,
    expandedAnalysisIds: [],
    prac1SelectedKey: null,
    prac2InputX: '',
    prac2InputMin: '',
    prac2Submitted: false,
    _suppressHashChange: false
  };

  function saveLastProcedureId(pid) {
    if (!pid) return;
    try {
      localStorage.setItem(LAST_PROC_STORAGE_KEY, pid);
    } catch (_) {}
  }

  function loadLastProcedureId() {
    try {
      return localStorage.getItem(LAST_PROC_STORAGE_KEY) || '';
    } catch (_) {
      return '';
    }
  }

  function syncHashToProcedure(pid) {
    if (!pid) return;
    if (window.state && window.state.currentView !== 'procedural') return;
    const targetHash = `#/procedural/${encodeURIComponent(pid)}`;
    if (window.location.hash === targetHash) return;
    ProceduralState._suppressHashChange = true;
    try {
      window.location.hash = targetHash;
    } finally {
      setTimeout(() => {
        ProceduralState._suppressHashChange = false;
      }, 0);
    }
  }

  function resolveInitialProcedureId() {
    const hashInfo = parseProceduralHash();
    if (hashInfo && hashInfo.procedureId && getPublishedProcedureById(hashInfo.procedureId)) {
      return hashInfo.procedureId;
    }
    const savedId = loadLastProcedureId();
    if (savedId && getPublishedProcedureById(savedId)) {
      return savedId;
    }
    const allCols = getPublishedCollections();
    return allCols.length > 0 ? allCols[0].procedure.id : '';
  }

  function stopDynamicPlayback() {
    if (ProceduralState.rafId) {
      cancelAnimationFrame(ProceduralState.rafId);
      ProceduralState.rafId = null;
    }
    ProceduralState.isPlaying = false;
    ProceduralState.lastFrameTs = 0;
    const playBtnText = document.getElementById('procDynPlayBtnText');
    const playBtnIcon = document.getElementById('procDynPlayBtnIcon');
    if (playBtnText) {
      if (ProceduralState.currentTime <= 0.05) {
        playBtnText.textContent = '开始';
      } else {
        playBtnText.textContent = '继续播放';
      }
    }
    if (playBtnIcon) playBtnIcon.textContent = '▶';
  }

  function resetDynamicDemoState(keepOpen = true) {
    stopDynamicPlayback();
    ProceduralState.dynamicDemoOpen = Boolean(keepOpen);
    ProceduralState.dynamicStep = 1;
    ProceduralState.currentTime = 0.0;
    ProceduralState.targetStopTime = 6.5;
    ProceduralState.playbackRate = 1.0;
    ProceduralState.isContinuousMode = false;
    ProceduralState.practiceVisible = true;
    ProceduralState.relatedTypeFilter = 'all';
    ProceduralState.relatedExpanded = false;
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
      dynamicDemoOpen: true,
      dynamicStep: ProceduralState.dynamicStep || 1,
      currentTime: Number(ProceduralState.currentTime || 0.0),
      targetStopTime: Number(ProceduralState.targetStopTime || 6.5),
      playbackRate: Number(ProceduralState.playbackRate || 1.0),
      isContinuousMode: Boolean(ProceduralState.isContinuousMode),
      practiceVisible: true,
      relatedTypeFilter: ProceduralState.relatedTypeFilter || 'all',
      relatedExpanded: Boolean(ProceduralState.relatedExpanded),
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

  // =========================================================================
  // 原题侧边抽屉（Drawer）与悬浮返回顶部按钮（延迟单例挂载到 body）
  // =========================================================================
  function ensureQuestionDrawerDom() {
    if (document.getElementById('procQuestionDrawer')) return;
    const wrapper = document.createElement('div');
    wrapper.id = 'procQuestionDrawerRoot';
    wrapper.className = 'no-print';
    wrapper.innerHTML = `
      <div id="procQuestionDrawerOverlay" class="fixed inset-0 bg-slate-900/45 z-50 hidden transition-opacity"></div>
      <aside id="procQuestionDrawer" class="fixed top-0 right-0 bottom-0 w-full sm:max-w-xl bg-white z-50 border-l border-slate-200 shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col">
        <div class="px-5 py-3.5 border-b border-slate-200 bg-[#F0FDFA] flex items-center justify-between gap-2 shrink-0">
          <div class="flex items-center gap-2 min-w-0">
            <span class="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold shrink-0">原题预览</span>
            <h3 id="procDrawerTitle" class="text-sm font-bold text-slate-900 truncate">题目详情与解析</h3>
          </div>
          <button type="button" id="btnProcCloseQuestionDrawer" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/80 transition" aria-label="关闭原题抽屉" title="关闭 (Esc)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div id="procDrawerBody" class="flex-1 overflow-y-auto p-5 space-y-4"></div>
        <div id="procDrawerFooter" class="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2 shrink-0"></div>
      </aside>
      <button type="button" id="btnProcScrollTop" class="hidden fixed bottom-6 right-6 z-30 px-3 py-2 rounded-full bg-white border border-slate-200 shadow-md text-xs font-bold text-[#0F766E] hover:bg-[#F0FDFA] hover:border-[#99F6E4] transition flex items-center gap-1" title="返回顶部">
        <span>↑</span>
        <span>顶部</span>
      </button>
    `;
    document.body.appendChild(wrapper);

    document.getElementById('procQuestionDrawerOverlay')?.addEventListener('click', () => ProceduralView.closeQuestionDrawer());
    document.getElementById('btnProcCloseQuestionDrawer')?.addEventListener('click', () => ProceduralView.closeQuestionDrawer());
    document.getElementById('btnProcScrollTop')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const drawer = document.getElementById('procQuestionDrawer');
        if (drawer && !drawer.classList.contains('translate-x-full')) {
          ProceduralView.closeQuestionDrawer();
        }
        ProceduralView.closeMobileSidebar();
      }
    });

    window.addEventListener('scroll', () => {
      const topBtn = document.getElementById('btnProcScrollTop');
      if (!topBtn) return;
      const isProcView = !document.getElementById('viewProceduralKnowledge')?.classList.contains('hidden');
      const show = isProcView && (window.scrollY || window.pageYOffset || 0) > 400;
      topBtn.classList.toggle('hidden', !show);
    }, { passive: true });
  }

  const ProceduralView = {
    init() {
      ensureQuestionDrawerDom();
      this.bindSidebarEvents();
      this.bindHashRouting();
      const initialId = resolveInitialProcedureId();
      if (initialId) {
        ProceduralState.selectedProcedureId = initialId;
        ProceduralState.subView = 'detail';
        ProceduralState.dynamicDemoOpen = true;
      }
      this.render();
    },

    bindHashRouting() {
      if (window.__procHashBound) return;
      window.__procHashBound = true;
      window.addEventListener('hashchange', () => {
        if (ProceduralState._suppressHashChange) return;
        const hashInfo = parseProceduralHash();
        if (!hashInfo) return;
        const targetId = (hashInfo.procedureId && getPublishedProcedureById(hashInfo.procedureId))
          ? hashInfo.procedureId
          : resolveInitialProcedureId();
        if (!targetId) return;

        if (typeof switchView === 'function' && window.state && window.state.currentView !== 'procedural') {
          ProceduralState.selectedProcedureId = targetId;
          ProceduralState.suspendedDetailSnapshot = null;
          switchView('procedural');
          return;
        }
        if (targetId !== ProceduralState.selectedProcedureId) {
          this.openDetail(targetId, true, { recordHistory: false, skipHashSync: true });
        }
      });
    },

    openMobileSidebar() {
      const panel = document.getElementById('procSidebarPanel');
      const overlay = document.getElementById('procSidebarDrawerOverlay');
      if (panel) panel.classList.add('is-mobile-open');
      if (overlay) overlay.classList.remove('hidden');
    },

    closeMobileSidebar() {
      const panel = document.getElementById('procSidebarPanel');
      const overlay = document.getElementById('procSidebarDrawerOverlay');
      if (panel) panel.classList.remove('is-mobile-open');
      if (overlay) overlay.classList.add('hidden');
    },

    bindSidebarEvents() {
      const searchInput = document.getElementById('procSearchInput');
      const clearBtn = document.getElementById('btnProcClearSearch');

      const syncClearBtn = () => {
        if (!clearBtn || !searchInput) return;
        clearBtn.classList.toggle('hidden', !searchInput.value);
      };

      if (searchInput && !searchInput.dataset.bound) {
        searchInput.dataset.bound = '1';
        let timer = null;
        searchInput.addEventListener('input', (e) => {
          syncClearBtn();
          clearTimeout(timer);
          timer = setTimeout(() => {
            ProceduralState.searchKeyword = e.target.value.trim();
            this.renderSidebar();
          }, 150);
        });
      }

      if (clearBtn && !clearBtn.dataset.bound) {
        clearBtn.dataset.bound = '1';
        clearBtn.addEventListener('click', () => {
          ProceduralState.searchKeyword = '';
          if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
          }
          syncClearBtn();
          this.renderSidebar();
        });
      }

      const gradePills = document.getElementById('procGradePills');
      if (gradePills && !gradePills.dataset.bound) {
        gradePills.dataset.bound = '1';
        gradePills.querySelectorAll('.proc-grade-pill').forEach(btn => {
          btn.addEventListener('click', () => {
            ProceduralState.gradeFilter = btn.getAttribute('data-grade') || 'all';
            ProceduralState.chapterFilter = 'all';
            gradePills.querySelectorAll('.proc-grade-pill').forEach(b => {
              b.classList.toggle('is-active', (b.getAttribute('data-grade') || 'all') === ProceduralState.gradeFilter);
            });
            this.renderSidebar();
          });
        });
      }

      document.getElementById('btnProcMobileDrawerOpen')?.addEventListener('click', () => this.openMobileSidebar());
      document.getElementById('btnProcMobileDrawerClose')?.addEventListener('click', () => this.closeMobileSidebar());
      document.getElementById('procSidebarDrawerOverlay')?.addEventListener('click', () => this.closeMobileSidebar());
    },

    resetFilters() {
      ProceduralState.searchKeyword = '';
      ProceduralState.gradeFilter = 'all';
      ProceduralState.subjectFilter = 'all';
      ProceduralState.chapterFilter = 'all';
      const searchInput = document.getElementById('procSearchInput');
      const clearBtn = document.getElementById('btnProcClearSearch');
      if (searchInput) searchInput.value = '';
      if (clearBtn) clearBtn.classList.add('hidden');
      document.querySelectorAll('#procGradePills .proc-grade-pill').forEach(b => {
        b.classList.toggle('is-active', b.getAttribute('data-grade') === 'all');
      });
      this.renderSidebar();
    },

    openHome(chapter = undefined) {
      // 兼容旧调用：定位到该章节第 1 个知识点并直达工作台
      const allCols = getPublishedCollections();
      if (chapter && chapter !== 'all') {
        const match = allCols.find(c => c.procedure.chapter === chapter);
        if (match) {
          this.openDetail(match.procedure.id, true, { clearHistory: false });
          return;
        }
      }
      const fallbackId = resolveInitialProcedureId();
      if (fallbackId) this.openDetail(fallbackId, true, { clearHistory: false });
    },

    openDetail(procedureId, autoOpenDemo = true, options = {}) {
      const proc = getPublishedProcedureById(procedureId);
      if (!proc) return;
      const { recordHistory = false, clearHistory = false, skipHashSync = false, keepScroll = false } = options;

      if (clearHistory) {
        ProceduralState.detailHistoryStack = [];
      } else if (
        recordHistory &&
        ProceduralState.selectedProcedureId &&
        ProceduralState.selectedProcedureId !== procedureId
      ) {
        const snap = captureCurrentDetailSnapshot();
        pushDetailHistorySnapshot(snap, procedureId);
      }

      ProceduralState.suspendedDetailSnapshot = null;
      resetDynamicDemoState(true);
      ProceduralState.selectedProcedureId = procedureId;
      ProceduralState.subView = 'detail';
      saveLastProcedureId(procedureId);
      if (!skipHashSync) {
        syncHashToProcedure(procedureId);
      }
      this.closeQuestionDrawer();
      this.render();
      if (!keepScroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    restoreDetailSnapshot(snapshot) {
      if (!snapshot || !snapshot.procedureId) return false;
      const proc = getPublishedProcedureById(snapshot.procedureId);
      if (!proc) return false;

      stopDynamicPlayback();
      ProceduralState.selectedProcedureId = snapshot.procedureId;
      ProceduralState.subView = 'detail';
      ProceduralState.dynamicDemoOpen = true;
      ProceduralState.dynamicStep = snapshot.dynamicStep || 1;
      ProceduralState.currentTime = Number(snapshot.currentTime || 0.0);
      ProceduralState.targetStopTime = Number(snapshot.targetStopTime || 6.5);
      ProceduralState.playbackRate = Number(snapshot.playbackRate || 1.0);
      ProceduralState.isContinuousMode = Boolean(snapshot.isContinuousMode);
      ProceduralState.isPlaying = false;
      ProceduralState.practiceVisible = true;
      ProceduralState.relatedTypeFilter = snapshot.relatedTypeFilter || 'all';
      ProceduralState.relatedExpanded = Boolean(snapshot.relatedExpanded);
      ProceduralState.expandedAnalysisIds = Array.isArray(snapshot.expandedAnalysisIds)
        ? [...snapshot.expandedAnalysisIds]
        : [];
      ProceduralState.prac1SelectedKey = snapshot.prac1SelectedKey || null;
      ProceduralState.prac2InputX = snapshot.prac2InputX || '';
      ProceduralState.prac2InputMin = snapshot.prac2InputMin || '';
      ProceduralState.prac2Submitted = Boolean(snapshot.prac2Submitted);

      saveLastProcedureId(snapshot.procedureId);
      syncHashToProcedure(snapshot.procedureId);
      this.render();

      const detailContainer = document.getElementById('procDetailSection');
      if (detailContainer) {
        if (ProceduralState.expandedAnalysisIds.length > 0) {
          ProceduralState.expandedAnalysisIds.forEach(qid => {
            const panel = document.getElementById(`proc_q_analysis_${qid}`);
            const btn = detailContainer.querySelector(`.btn-proc-toggle-analysis[data-id="${qid}"]`);
            const txt = btn?.querySelector('.analysis-btn-text');
            if (panel) panel.classList.remove('hidden');
            if (txt) txt.textContent = '收起答案';
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
        if (typeof ProceduralState.activeTimelineRenderFn === 'function') {
          ProceduralState.activeTimelineRenderFn(ProceduralState.currentTime);
          const playBtnText = document.getElementById('procDynPlayBtnText');
          const playBtnIcon = document.getElementById('procDynPlayBtnIcon');
          if (playBtnText) {
            playBtnText.textContent = ProceduralState.currentTime > 0.05 ? '继续播放' : '开始';
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
      if (ProceduralState.selectedProcedureId) {
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
      const proc = getPublishedProcedureById(procedureId);
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
        ProceduralState.selectedProcedureId &&
        ProceduralState.selectedProcedureId !== procedureId
      ) {
        pushDetailHistorySnapshot(captureCurrentDetailSnapshot(), procedureId);
      }

      if (typeof switchView === 'function' && window.state && window.state.currentView !== 'procedural') {
        ProceduralState.selectedProcedureId = procedureId;
        switchView('procedural');
      }
      this.openDetail(procedureId, true, { recordHistory: false, clearHistory: false });
    },

    openQuestionDrawer(questionId) {
      ensureQuestionDrawerDom();
      const q = (window.QUESTION_BANK || []).find(item => item.id === questionId);
      if (!q) return;
      ProceduralState.previewQuestionId = questionId;

      const drawer = document.getElementById('procQuestionDrawer');
      const overlay = document.getElementById('procQuestionDrawerOverlay');
      const titleEl = document.getElementById('procDrawerTitle');
      const bodyEl = document.getElementById('procDrawerBody');
      const footerEl = document.getElementById('procDrawerFooter');
      if (!drawer || !overlay || !bodyEl || !footerEl) return;

      const isSelected = state.selectedIds.has(q.id);
      const diffColor = typeof getDifficultyBadgeClass === 'function' ? getDifficultyBadgeClass(q.difficulty) : 'q-meta-diff';
      const optionsHtml = (q.options && q.options.length > 0) ? `
        <div class="q-options-grid grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm text-slate-800">
          ${q.options.map(opt => `<div class="answer-option ${typeof getOptionLayoutClass === 'function' ? getOptionLayoutClass(opt) : ''}">${renderMathText(opt)}</div>`).join('')}
        </div>
      ` : '';
      const imgHtml = q.image ? `<div class="my-2"><img src="${q.image}" class="max-h-52 max-w-full h-auto rounded object-contain border border-slate-100"></div>` : '';

      if (titleEl) {
        titleEl.textContent = `${q.chapter || ''} · ${q.typeName || '原题'}`;
      }

      bodyEl.innerHTML = `
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <span class="q-meta-chapter">${escapeHtml(q.chapter)}</span>
          <span class="q-meta-type">${escapeHtml(q.typeName)}</span>
          <span class="${diffColor}">${escapeHtml(q.difficulty)}</span>
          <span class="text-slate-400">编号：${escapeHtml(q.id)}</span>
        </div>

        ${(window.GraphData ? window.GraphData.getDisplayKnowledgeName(q) : q.knowledge) ? `
          <div class="text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
            <span class="font-semibold text-slate-600">考点：</span>${escapeHtml(window.GraphData ? window.GraphData.getDisplayKnowledgeName(q) : q.knowledge)}
          </div>
        ` : ''}

        <div class="p-4 rounded-xl bg-white border border-slate-200 text-sm leading-relaxed text-slate-900 space-y-2">
          <div class="q-stem-content">${renderMathText(q.stem)}</div>
          ${imgHtml}
          ${optionsHtml}
        </div>

        <div class="q-analysis-panel text-sm space-y-2">
          ${typeof window.renderQuestionAnalysisBoxHtml === 'function' ? window.renderQuestionAnalysisBoxHtml(q) : `
            <div class="flex items-baseline gap-2 font-bold text-slate-900">
              <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E] shrink-0"></span>
              <span class="whitespace-nowrap shrink-0">参考答案：</span>
              <span class="text-[#0F766E] font-semibold text-sm">${renderMathText(q.answer)}</span>
            </div>
            ${q.analysis ? `<div class="text-slate-600"><b class="text-slate-800">【分析】</b>${renderMathText(q.analysis)}</div>` : ''}
            ${q.detail && q.detail !== '略' ? `<div class="text-slate-700 pt-1.5 border-t border-slate-200/70 leading-relaxed"><b class="text-slate-800">【详解】</b>${renderMathText(q.detail)}</div>` : ''}
          `}
        </div>
      `;

      footerEl.innerHTML = `
        <button type="button" id="btnProcDrawerLocateBank" class="btn-secondary px-3.5 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5">
          <span>在题库选题中定位 &rarr;</span>
        </button>
        <button type="button" id="btnProcDrawerToggleCart" class="btn-toggle-cart ${isSelected ? 'is-remove' : ''} px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5">
          ${isSelected ? `
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span>已加入试题篮</span>
          ` : `
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            <span>加入试题篮</span>
          `}
        </button>
      `;

      footerEl.querySelector('#btnProcDrawerLocateBank')?.addEventListener('click', () => {
        this.closeQuestionDrawer();
        this.openQuestionInBankDetail(q.id, q.chapter);
      });

      footerEl.querySelector('#btnProcDrawerToggleCart')?.addEventListener('click', () => {
        if (typeof toggleCartItem === 'function') toggleCartItem(q.id);
        this.openQuestionDrawer(q.id);
        this.renderRelatedQuestionsBlock();
      });

      overlay.classList.remove('hidden');
      drawer.classList.remove('translate-x-full');
      if (typeof renderMath === 'function') renderMath();
    },

    closeQuestionDrawer() {
      const drawer = document.getElementById('procQuestionDrawer');
      const overlay = document.getElementById('procQuestionDrawerOverlay');
      if (drawer) drawer.classList.add('translate-x-full');
      if (overlay) overlay.classList.add('hidden');
      ProceduralState.previewQuestionId = null;
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
      const allCols = getPublishedCollections();
      return allCols.filter(col => {
        const p = col.procedure;
        if (ProceduralState.gradeFilter !== 'all' && p.grade !== ProceduralState.gradeFilter) return false;
        if (ProceduralState.subjectFilter !== 'all' && p.subject !== ProceduralState.subjectFilter) return false;
        if (ProceduralState.searchKeyword) {
          const kw = ProceduralState.searchKeyword.toLowerCase();
          const align = getGraphAlignment(p);
          const nameMatch = (p.name || '').toLowerCase().includes(kw);
          const graphMatch = (align.nodeName || '').toLowerCase().includes(kw) || (align.chapterName || '').toLowerCase().includes(kw);
          const descMatch = (p.description || '').toLowerCase().includes(kw);
          const chapMatch = (p.chapter || '').toLowerCase().includes(kw) || (p.chapterGroup || '').toLowerCase().includes(kw);
          const secCodeMatch = extractSectionCode(p.chapter).toLowerCase().includes(kw);
          const stepMatch = Array.isArray(p.steps) && p.steps.some(st =>
            (st.title || '').toLowerCase().includes(kw) ||
            (st.description || '').toLowerCase().includes(kw)
          );
          if (!nameMatch && !graphMatch && !descMatch && !chapMatch && !secCodeMatch && !stepMatch) return false;
        }
        return true;
      });
    },

    render() {
      const detailContainer = document.getElementById('procDetailSection');
      if (!detailContainer) return;

      if (!ProceduralState.selectedProcedureId || !getPublishedProcedureById(ProceduralState.selectedProcedureId)) {
        ProceduralState.selectedProcedureId = resolveInitialProcedureId();
      }
      if (ProceduralState.selectedProcedureId) {
        saveLastProcedureId(ProceduralState.selectedProcedureId);
        syncHashToProcedure(ProceduralState.selectedProcedureId);
      }

      this.renderSidebar();
      this.renderDetailView(detailContainer);

      if (typeof renderMath === 'function') {
        renderMath();
      }
    },

    // =========================================================================
    // 左侧章节目录（与「题目图谱」二级章节 -> 三级核心考点完全对齐）
    // =========================================================================
    renderSidebar() {
      const chapterNavEl = document.getElementById('procChapterSidebar');
      const totalBadgeEl = document.getElementById('procSidebarTotalBadge');
      const mobileBadgeEl = document.getElementById('procMobileActiveSectionBadge');
      if (!chapterNavEl) return;

      const currentProc = getPublishedProcedureById(ProceduralState.selectedProcedureId);
      const currentAlign = currentProc ? getGraphAlignment(currentProc) : null;
      const currentNodeId = currentAlign ? currentAlign.nodeId : '';
      if (mobileBadgeEl && currentAlign) {
        mobileBadgeEl.textContent = currentAlign.nodeName || currentProc.name;
      }

      const filteredCols = this.getFilteredCollections();
      if (totalBadgeEl) {
        totalBadgeEl.textContent = `${filteredCols.length} 项`;
      }

      if (filteredCols.length === 0) {
        chapterNavEl.innerHTML = `
          <div class="py-10 px-3 text-center space-y-3">
            <p class="text-xs text-slate-400 leading-relaxed">未找到匹配的章节或知识点，请调整年级或搜索词。</p>
            <button type="button" id="btnProcResetFilters" class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F766E]">
              重置全部筛选
            </button>
          </div>
        `;
        chapterNavEl.querySelector('#btnProcResetFilters')?.addEventListener('click', () => this.resetFilters());
        return;
      }

      const gradeDisplayMap = {
        '七年级': { title: '初一（七年级）', semester: '上册' },
        '八年级': { title: '初二（八年级）', semester: '上册' },
        '九年级': { title: '初三（九年级）', semester: '上册' }
      };
      const gradeOrder = ['七年级', '八年级', '九年级'];

      const byGrade = new Map();
      filteredCols.forEach(c => {
        const g = c.procedure.grade || '九年级';
        if (!byGrade.has(g)) byGrade.set(g, []);
        byGrade.get(g).push(c);
      });

      const isSearching = Boolean(ProceduralState.searchKeyword);

      const gradeCardsHtml = gradeOrder
        .filter(g => byGrade.has(g))
        .map(g => {
          const gCols = byGrade.get(g);
          const gMeta = gradeDisplayMap[g] || { title: g, semester: '全册' };
          const byChapter = new Map();
          gCols.forEach(c => {
            const align = getGraphAlignment(c.procedure);
            const chKey = align.chapterName;
            if (!byChapter.has(chKey)) {
              byChapter.set(chKey, { name: chKey, order: align.chapterOrder, nodes: new Map() });
            }
            const chObj = byChapter.get(chKey);
            if (!chObj.nodes.has(align.nodeId)) {
              chObj.nodes.set(align.nodeId, { id: align.nodeId, name: align.nodeName, order: align.nodeOrder, procs: [] });
            }
            chObj.nodes.get(align.nodeId).procs.push(c.procedure);
          });

          const orderedChapters = Array.from(byChapter.values()).sort((a, b) => a.order - b.order);
          const gradeHasActive = gCols.some(c => getGraphAlignment(c.procedure).nodeId === currentNodeId);
          const shouldOpenGrade = isSearching || ProceduralState.gradeFilter !== 'all' || gradeHasActive || g === '七年级';

          const groupCardsHtml = orderedChapters.map(chObj => {
            const orderedNodes = Array.from(chObj.nodes.values()).sort((a, b) => a.order - b.order);
            const groupHasActive = orderedNodes.some(nd => nd.id === currentNodeId);
            const shouldOpenGroup = isSearching || groupHasActive || ProceduralState.gradeFilter !== 'all';

            return `
              <details class="nav-chapter-group-card mb-2" ${shouldOpenGroup ? 'open' : ''}>
                <summary>
                  <span>${escapeHtml(chObj.name)}</span>
                  <span class="nav-chapter-group-badge">${orderedNodes.length} 考点</span>
                </summary>
                <div class="nav-chapter-group-content space-y-1">
                  ${orderedNodes.map(nd => {
                    const active = nd.id === currentNodeId;
                    const firstPid = nd.procs[0]?.id || '';
                    return `
                      <button type="button" class="proc-sec-btn chapter-tree-btn nav-topic-button ${active ? 'is-active' : ''}" data-proc-section="${escapeHtml(nd.id)}" data-first-pid="${escapeHtml(firstPid)}" title="${escapeHtml(nd.name)}">
                        <span class="nav-topic-label">${escapeHtml(nd.name)}</span>
                        ${nd.procs.length > 1 ? `<span class="nav-topic-count" title="该考点包含 ${nd.procs.length} 个程序性知识">${nd.procs.length}</span>` : ''}
                      </button>
                    `;
                  }).join('')}
                </div>
              </details>
            `;
          }).join('');

          return `
            <details class="nav-grade-card" ${shouldOpenGrade ? 'open' : ''}>
              <summary>
                <span>${escapeHtml(gMeta.title)}</span>
                <span class="text-xs font-semibold text-slate-500">${gCols.length} 项</span>
              </summary>
              <div class="nav-grade-content">
                <div class="space-y-1">
                  ${groupCardsHtml}
                </div>
              </div>
            </details>
          `;
        }).join('');

      chapterNavEl.innerHTML = `<div class="space-y-2.5">${gradeCardsHtml}</div>`;

      chapterNavEl.querySelectorAll('.proc-sec-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const firstPid = btn.getAttribute('data-first-pid');
          if (!firstPid) return;
          this.closeMobileSidebar();
          if (firstPid === ProceduralState.selectedProcedureId) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          this.openDetail(firstPid, true, { recordHistory: true });
        });
      });

      // 确保当前激活小节滚动到目录可视区
      const activeBtn = chapterNavEl.querySelector('.proc-sec-btn.is-active');
      if (activeBtn) {
        requestAnimationFrame(() => {
          activeBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        });
      }
    },

    // =========================================================================
    // 60fps 网课级互动演算白板（默认直接展开，含单步精准停止与防重叠排版）
    // =========================================================================
    buildDynamicTeachingModuleHtml(demoData) {
      if (!demoData) return '';
      const totalSteps = demoData.steps.length;
      const curStep = ProceduralState.dynamicStep || 1;
      const prac1 = demoData.practices.practice1;
      const prac2 = demoData.practices.practice2;

      const totalDur = demoData.totalDuration || 30.0;
      const allRows = demoData.boardRows || [];
      const findStepEndAfter = (tVal) => {
        const st = (demoData.steps || []).find(s => tVal >= s.tStart - 0.05 && tVal < s.tEnd - 0.05);
        return st ? st.tEnd : totalDur;
      };

      const boardRowsHtml = allRows.map((row, rIdx) => {
        const nextRowAppear = rIdx + 1 < allRows.length ? allRows[rIdx + 1].appearAt : totalDur;
        const tokensHtml = (row.tokens || []).map((tk, tIdx) => {
          const nextTk = row.tokens[tIdx + 1];
          const stepEnd = findStepEndAfter(tk.appearAt);
          const boundEnd = nextTk
            ? nextTk.appearAt
            : Math.min(nextRowAppear > tk.appearAt + 0.2 ? nextRowAppear : totalDur, stepEnd);
          const maxWin = Math.max(tk.dur || 0.4, boundEnd - tk.appearAt - 0.35);
          return `
            <span class="proc-wb-token" id="proc_tk_${escapeHtml(tk.id)}" data-token-id="${escapeHtml(tk.id)}" data-appear-at="${tk.appearAt}" data-dur="${tk.dur || 0.4}" data-stream-window="${maxWin.toFixed(2)}">
              ${renderStreamUnitsHtml(tk.math, 'board')}
            </span>
          `;
        }).join('');

        return `
          <div class="proc-wb-row ${row.isConclusion ? 'is-row-conclusion' : ''}" id="proc_${escapeHtml(row.rowId)}" data-row-appear="${row.appearAt}" style="opacity:0; pointer-events:none;">
            <div class="proc-wb-row-expr text-base sm:text-[17px] font-semibold text-slate-900 leading-relaxed flex flex-wrap items-baseline gap-x-0.5">
              ${tokensHtml}
            </div>
            <span class="proc-wb-row-badge px-2 py-0.5 rounded text-[11px] font-semibold bg-white text-slate-500 border border-slate-200">
              ${escapeHtml(row.stepBadge)}
            </span>
          </div>
        `;
      }).join('');

      const scratchpadCardsHtml = (demoData.scratchpadCards || []).map(sp => {
        const spTokens = sp.tokens || [];
        const spTokensHtml = spTokens.map((tk, tIdx) => {
          const nextTk = spTokens[tIdx + 1];
          const boundEnd = nextTk ? nextTk.appearAt : (sp.showEnd || totalDur);
          const maxWin = Math.max(tk.dur || 0.4, boundEnd - tk.appearAt - 0.35);
          return `
            <div class="proc-wb-token block py-0.5 text-sm sm:text-base font-bold text-slate-900" id="proc_tk_${escapeHtml(tk.id)}" data-token-id="${escapeHtml(tk.id)}" data-appear-at="${tk.appearAt}" data-dur="${tk.dur || 0.4}" data-stream-window="${maxWin.toFixed(2)}">
              ${renderStreamUnitsHtml(tk.math, 'board')}
            </div>
          `;
        }).join('');

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

      const subtitlesHtml = (demoData.subtitles || []).map((sub, idx) => `
        <span class="proc-wb-sub-item ${idx === 0 ? 'inline' : 'hidden'}" data-sub-idx="${idx}" data-t-start="${sub.tStart}" data-t-end="${sub.tEnd}" data-focus-token="${escapeHtml(sub.focusToken || '')}">
          ${renderStreamUnitsHtml(sub.text, 'subtitle')}
        </span>
      `).join('');

      const stepExplanationsHtml = demoData.steps.map(st => `
        <span class="proc-wb-step-exp ${st.step === curStep ? 'inline' : 'hidden'}" data-exp-step="${st.step}">
          ${renderMathText(st.explanation)}
        </span>
      `).join('');

      return `
        <div id="procDynamicDemoModule" class="space-y-3.5">
          <!-- A. 学习进度与可横滑步骤导航区 -->
          <div class="p-4 rounded-xl bg-white border border-[#99F6E4] space-y-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">动态演示</span>
              <span class="text-xs sm:text-sm font-semibold text-slate-700">示例题：${renderMathText(demoData.exampleTitle)}</span>
            </div>

            <div class="pt-1.5 border-t border-slate-100">
              <div class="proc-step-tabs-scroll" id="procStepTabsContainer">
                ${demoData.steps.map(st => {
                  const isAct = st.step === curStep;
                  return `
                    <button type="button" class="proc-dyn-step-tab shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg border text-left text-xs transition-all flex items-center gap-1.5 ${
                      isAct
                        ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-[#F0FDFA] hover:border-[#99F6E4]'
                    }" data-step="${st.step}" title="${escapeHtml(st.name)}">
                      <span class="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        isAct ? 'bg-white text-[#0F766E]' : 'bg-white text-slate-600 border border-slate-200'
                      }">${st.step}</span>
                      <span>${renderMathText(st.name)}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- B-Top. 60fps 视频级时间轴与播放控制栏 -->
          <div class="p-3.5 rounded-xl bg-white border border-[#99F6E4] shadow-sm space-y-2.5">
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
                  <span id="procDynPlayBtnText">开始</span>
                </button>
                <button type="button" id="btnProcDynPrev" class="proc-dyn-ctrl-btn btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold" disabled>
                  ← 上一步
                </button>
                <button type="button" id="btnProcDynNext" class="proc-dyn-ctrl-btn btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold">
                  下一步 →
                </button>
                <button type="button" id="btnProcDynPrevBeat" class="proc-dyn-ctrl-btn btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-medium" title="跳转到上一个关键节点">
                  ◀ 上一节点
                </button>
                <button type="button" id="btnProcDynNextBeat" class="proc-dyn-ctrl-btn btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-medium" title="跳转到下一个关键节点">
                  下一节点 ▶
                </button>
                <button type="button" id="btnProcDynReplayStep" class="btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-medium" title="重播当前步骤">
                  ↻ 重播本步
                </button>
                <button type="button" id="btnProcDynRestart" class="btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-medium" title="回到开头">
                  ↺ 开头
                </button>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <div class="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
                  ${[0.5, 0.75, 1.0].map(rate => `
                    <button type="button" class="proc-speed-btn px-2 py-1 rounded-md font-semibold transition ${
                      ProceduralState.playbackRate === rate ? 'bg-[#0F766E] text-white' : 'text-slate-600 hover:text-[#0F766E]'
                    }" data-rate="${rate}">${rate}x</button>
                  `).join('')}
                </div>

                <button type="button" id="btnProcDynGoPractice" class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-bold text-[#0F766E] inline-flex items-center gap-1">
                  <span>✎ 跟着操作</span>
                </button>
              </div>
            </div>
          </div>

          <!-- B. 单一视觉焦点「网课互动演算白板」 -->
          <div id="procWhiteboardStage" class="proc-wb-stage proc-wb-grid-bg p-4 space-y-3">
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

            <div id="procBoardLabelLayer" class="proc-wb-label-layer"></div>
            <div id="procTeacherPen" class="proc-teacher-pen" style="left: 48px; top: 48px; opacity: 0;"></div>

            <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-teal-100/80 relative z-10">
              <div class="flex items-center gap-2 text-xs">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0F766E]"></span>
                <span class="font-bold text-slate-800">${renderMathText(demoData.exampleTitle)}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start relative z-10 min-h-[240px]">
              <div class="xl:col-span-8 space-y-2.5 relative" id="procWbMainEquations">
                <div id="procWbIdlePlaceholder" class="min-h-[140px] rounded-xl border border-dashed border-teal-200/80 bg-white/75"></div>
                ${boardRowsHtml}
              </div>

              <div class="xl:col-span-4 xl:sticky xl:top-4 space-y-2.5">
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
                <div id="procScratchpadIdleHint" class="min-h-[52px] p-3.5 rounded-xl border border-dashed border-slate-200 bg-white/60"></div>
              </div>
            </div>

            <div class="proc-wb-subtitle-bar flex items-center gap-3 relative z-10">
              <span class="px-2 py-0.5 rounded bg-white/20 text-white text-[11px] font-bold shrink-0">讲解</span>
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

          <!-- 跟着操作（默认展示在动态演示下方） -->
          <section id="procDynPracticeSection" class="scroll-mt-20 p-5 rounded-xl bg-white border border-[#99F6E4] space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">跟着操作</span>
                <h4 class="text-sm sm:text-base font-bold text-slate-900">${renderMathText(String(demoData.practiceSectionTitle || demoData.title || '').replace(/(?:关键动作)?跟做练习$/, ''))}</h4>
              </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
              <!-- 练习一 -->
              <div class="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs sm:text-sm font-bold text-slate-900">${escapeHtml(prac1.title)}</span>
                  <button type="button" id="btnPrac1Reset" class="text-xs text-[#0F766E] hover:underline font-medium">重新作答</button>
                </div>

                <div class="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5 text-xs sm:text-sm text-slate-800">
                  ${prac1.givenFormula ? `<div>${escapeHtml(prac1.givenLabel !== undefined ? prac1.givenLabel : '已知：')}${renderMathText(prac1.givenFormula)}</div>` : ''}
                  ${prac1.extractedFormula ? `<div>${escapeHtml(prac1.extractedLabel !== undefined ? prac1.extractedLabel : '整理变形后：')}${renderMathText(prac1.extractedFormula)}</div>` : ''}
                  ${prac1.questionText ? `<div class="font-bold text-slate-900 pt-1">${renderMathText(prac1.questionText)}</div>` : ''}
                </div>

                <div class="space-y-2" id="prac1OptionsList">
                  ${prac1.options.map(opt => `
                    <button type="button" class="prac1-opt-btn w-full text-left px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-[#F0FDFA] hover:border-[#99F6E4] text-xs sm:text-sm text-slate-800 transition flex items-center justify-between" data-opt-key="${opt.key}">
                      <span>${renderMathText(opt.text)}</span>
                      <span class="prac1-opt-indicator text-xs font-bold text-slate-400"></span>
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
                  ${prac2.givenFormula ? `<div>${escapeHtml(prac2.givenLabel !== undefined ? prac2.givenLabel : '给出条件：')}${renderMathText(prac2.givenFormula)}</div>` : ''}
                  ${prac2.questionText ? `<div class="font-bold text-slate-900 pt-1">${renderMathText(prac2.questionText)}</div>` : ''}
                </div>

                <div class="p-3.5 rounded-lg bg-white border border-slate-200 space-y-3 text-xs sm:text-sm">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-slate-700 font-medium">${renderMathText(prac2.input1Prefix !== undefined ? prac2.input1Prefix : '当 $x =$')}</span>
                    <input type="text" id="prac2InputX" class="w-24 px-2.5 py-1.5 rounded-lg border border-slate-200 text-center font-bold text-sm">
                    ${prac2.singleInput
                      ? (prac2.input1Suffix ? `<span class="text-slate-700 font-medium">${renderMathText(prac2.input1Suffix)}</span>` : '')
                      : `<span class="text-slate-700 font-medium">${renderMathText(prac2.input2Prefix || '时，取得最小值')}</span>
                    <input type="text" id="prac2InputMin" class="w-24 px-2.5 py-1.5 rounded-lg border border-slate-200 text-center font-bold text-sm">
                    ${prac2.input2Suffix ? `<span class="text-xs text-slate-400">${escapeHtml(prac2.input2Suffix)}</span>` : ''}`}
                  </div>

                  <div class="flex flex-wrap items-center gap-2 pt-1">
                    <button type="button" id="btnPrac2Submit" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-semibold">
                      提交检验
                    </button>
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
          </section>
        </div>
      `;
    },

    bindDynamicTeachingEvents(container, demoData) {
      if (!demoData) return;
      const totalSteps = demoData.steps.length;
      const totalDuration = demoData.totalDuration || 32.0;
      const wbStage = container.querySelector('#procWhiteboardStage');
      const svgGroup = container.querySelector('#procSvgDynamicGroup');
      const labelLayer = container.querySelector('#procBoardLabelLayer');
      const teacherPen = container.querySelector('#procTeacherPen');
      const timelineRange = container.querySelector('#procTimelineRange');
      const timeCurrentLabel = container.querySelector('#procTimeCurrentLabel');
      const idlePlaceholder = container.querySelector('#procWbIdlePlaceholder');

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



      const buildUnitSchedule = (rootEl) => {
        const units = [];
        let acc = 0;
        rootEl.querySelectorAll('.proc-stream-unit').forEach(uEl => {
          const w = parseFloat(uEl.getAttribute('data-w') || '1') || 1;
          units.push({ el: uEl, startW: acc, endW: acc + w });
          acc += w;
        });
        return { units, totalWeight: Math.max(1, acc) };
      };

      const tokenElsMap = new Map();
      container.querySelectorAll('.proc-wb-token').forEach(el => {
        const tid = el.getAttribute('data-token-id');
        if (tid) {
          const appearAt = parseFloat(el.getAttribute('data-appear-at') || '0');
          const rawDur = parseFloat(el.getAttribute('data-dur') || '0.4');
          const maxWin = parseFloat(el.getAttribute('data-stream-window') || String(rawDur));
          const { units, totalWeight } = buildUnitSchedule(el);
          const idealDur = units.length > 1
            ? Math.max(rawDur, totalWeight / STREAM_CHARS_PER_SEC)
            : Math.max(rawDur, 0.55);
          const streamDur = Math.min(idealDur, Math.max(rawDur, maxWin));
          tokenElsMap.set(tid, {
            el,
            appearAt,
            dur: rawDur,
            streamDur,
            units,
            totalWeight
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

      const subtitleList = Array.from(container.querySelectorAll('.proc-wb-sub-item')).map(el => {
        const tStart = parseFloat(el.getAttribute('data-t-start') || '0');
        const tEnd = parseFloat(el.getAttribute('data-t-end') || '0');
        const { units, totalWeight } = buildUnitSchedule(el);
        const win = Math.max(0.6, tEnd - tStart);
        const idealDur = totalWeight / SUBTITLE_CHARS_PER_SEC;
        const typeDur = Math.min(Math.max(0.45, idealDur), Math.min(win * 0.52, 3.6));
        return {
          el,
          tStart,
          tEnd,
          typeDur,
          units,
          totalWeight,
          cursorEl: el.querySelector('.proc-stream-cursor'),
          focusToken: el.getAttribute('data-focus-token') || ''
        };
      });

      const geoAnimList = Array.from(container.querySelectorAll('.proc-geo-anim')).map(el => ({
        el,
        appearAt: parseFloat(el.getAttribute('data-appear-at') || '0'),
        dur: parseFloat(el.getAttribute('data-dur') || '0.5'),
        dashLen: parseFloat(el.getAttribute('data-dash-len') || '0')
      }));

      const getStepAtTime = (t) => {
        if (t <= 0.02) return 1;
        for (let i = demoData.steps.length - 1; i >= 0; i--) {
          const st = demoData.steps[i];
          if (t > st.tStart + 0.01) {
            return st.step;
          }
          if (Math.abs(t - st.tStart) <= 0.01) {
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

      const renderSvgAnnotationsAt = (t) => {
        if (!svgGroup) return;
        const activeMarkup = [];
        const visibleLabelIds = new Set();
        const stageWidth = wbStage ? wbStage.getBoundingClientRect().width : 800;

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
            const rawLabelX = (x1 + 2 * mx + x2) / 4;
            const clampedLabelX = Math.max(64, Math.min(stageWidth - 64, rawLabelX));
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
              pillEl.style.left = `${clampedLabelX.toFixed(1)}px`;
              pillEl.style.top = `${Math.max(18, labelY).toFixed(1)}px`;
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
            const clampedMidX = Math.max(64, Math.min(stageWidth - 64, midX));
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
              pillEl.style.left = `${clampedMidX.toFixed(1)}px`;
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

      const renderTimelineAt = (rawTime, forceRefreshStepUI = false) => {
        const t = Math.max(0, Math.min(totalDuration, rawTime));
        ProceduralState.currentTime = t;
        const step = getStepAtTime(t);
        ProceduralState.dynamicStep = step;

        if (idlePlaceholder) {
          idlePlaceholder.classList.toggle('hidden', t > 0.02);
        }

        if (timelineRange && document.activeElement !== timelineRange) {
          timelineRange.value = String(t);
        }
        if (timeCurrentLabel) {
          timeCurrentLabel.textContent = formatTimeSec(t);
        }



        container.querySelectorAll('.proc-dyn-step-tab').forEach(tab => {
          const sNum = Number(tab.getAttribute('data-step'));
          const isAct = sNum === step;
          tab.className = `proc-dyn-step-tab shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg border text-left text-xs transition-all flex items-center gap-1.5 ${
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
          if (isAct && forceRefreshStepUI) {
            tab.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
          }
        });

        container.querySelectorAll('.proc-wb-step-exp').forEach(expEl => {
          const sNum = Number(expEl.getAttribute('data-exp-step'));
          expEl.classList.toggle('inline', sNum === step);
          expEl.classList.toggle('hidden', sNum !== step);
        });

        let latestActiveRow = null;
        rowElsList.forEach(rItem => {
          const isIdle = t <= 0.02;
          rItem.el.classList.toggle('hidden', isIdle);
          const visible = !isIdle && t >= rItem.appearAt;
          rItem.el.style.opacity = visible ? '1' : '0';
          rItem.el.style.pointerEvents = visible ? 'auto' : 'none';
          rItem.el.classList.remove('is-row-active');
          if (visible) latestActiveRow = rItem.el;
        });
        if (latestActiveRow && !latestActiveRow.classList.contains('is-row-conclusion')) {
          latestActiveRow.classList.add('is-row-active');
        }

        let anyScratchpadShown = false;
        scratchpadList.forEach(spItem => {
          const show = t > 0.02 && t >= spItem.showStart && t <= spItem.showEnd;
          spItem.el.classList.toggle('hidden', !show);
          if (show) anyScratchpadShown = true;
        });
        if (scratchpadIdleHint) {
          scratchpadIdleHint.classList.toggle('hidden', anyScratchpadShown);
        }

        const activeHlMap = new Map();
        (demoData.tokenHighlights || []).forEach(hl => {
          if (t >= hl.tStart && t <= hl.tEnd) {
            activeHlMap.set(hl.tokenId, hl.color);
          }
        });

        let writingTokenId = null;
        let activeWritingUnitEl = null;
        tokenElsMap.forEach((tkItem, tid) => {
          const dur = Math.max(0.12, tkItem.streamDur || tkItem.dur || 0.4);
          const progress = t <= 0.02 ? 0 : clamp01((t - tkItem.appearAt) / dur);
          const isStarted = t > 0.02 && t >= tkItem.appearAt;
          const curW = progress * tkItem.totalWeight;
          let lastVisibleUnit = null;

          if (tkItem.units && tkItem.units.length > 0) {
            for (let i = 0; i < tkItem.units.length; i++) {
              const u = tkItem.units[i];
              if (!isStarted || curW <= u.startW) {
                u.el.style.opacity = '0';
              } else if (curW >= u.endW || progress >= 0.999) {
                u.el.style.opacity = '1';
                lastVisibleUnit = u.el;
              } else {
                const up = easeOutCubic((curW - u.startW) / Math.max(0.05, u.endW - u.startW));
                u.el.style.opacity = up.toFixed(3);
                lastVisibleUnit = u.el;
              }
            }
          } else {
            tkItem.el.style.opacity = easeOutCubic(progress).toFixed(3);
          }

          if (isStarted && t <= tkItem.appearAt + dur + 0.15) {
            writingTokenId = tid;
            if (lastVisibleUnit) activeWritingUnitEl = lastVisibleUnit;
          }

          const hlColor = activeHlMap.get(tid);
          tkItem.el.classList.toggle('is-hl-teal', isStarted && hlColor === 'teal');
          tkItem.el.classList.toggle('is-hl-amber', isStarted && hlColor === 'amber');
          tkItem.el.classList.toggle('is-hl-rose', isStarted && hlColor === 'rose');
        });

        let activeFocusToken = writingTokenId;
        subtitleList.forEach((subItem, idx) => {
          const isCur = (t >= subItem.tStart && t < subItem.tEnd) || (idx === subtitleList.length - 1 && t >= subItem.tStart);
          subItem.el.classList.toggle('inline', isCur);
          subItem.el.classList.toggle('hidden', !isCur);
          if (isCur) {
            const subProgress = t <= 0.02 ? 1 : clamp01((t - subItem.tStart) / Math.max(0.2, subItem.typeDur));
            const subW = subProgress * subItem.totalWeight;
            let lastShownSubEl = null;
            for (let i = 0; i < subItem.units.length; i++) {
              const u = subItem.units[i];
              if (t <= 0.02 || subProgress >= 0.999 || subW >= u.endW) {
                u.el.style.display = u.el.classList.contains('is-math-unit') ? 'inline-block' : 'inline';
                u.el.style.opacity = '1';
                lastShownSubEl = u.el;
              } else if (subW > u.startW) {
                const up = easeOutCubic((subW - u.startW) / Math.max(0.05, u.endW - u.startW));
                u.el.style.display = u.el.classList.contains('is-math-unit') ? 'inline-block' : 'inline';
                u.el.style.opacity = up.toFixed(3);
                lastShownSubEl = u.el;
              } else {
                u.el.style.display = 'none';
                u.el.style.opacity = '0';
              }
            }
            if (subItem.cursorEl) {
              const showCursor = t > 0.02 && subProgress > 0 && subProgress < 0.995 && ProceduralState.isPlaying;
              subItem.cursorEl.classList.toggle('hidden', !showCursor);
              if (showCursor && lastShownSubEl && lastShownSubEl.nextSibling !== subItem.cursorEl) {
                lastShownSubEl.insertAdjacentElement('afterend', subItem.cursorEl);
              }
            }
            if (!activeFocusToken && subItem.focusToken) {
              activeFocusToken = subItem.focusToken;
            }
          } else if (subItem.cursorEl) {
            subItem.cursorEl.classList.add('hidden');
          }
        });

        if (teacherPen && t > 0.02) {
          let penRect = null;
          if (activeWritingUnitEl && wbStage) {
            const stRect = wbStage.getBoundingClientRect();
            const uRect = activeWritingUnitEl.getBoundingClientRect();
            if (uRect.width > 0 || uRect.height > 0) {
              penRect = { right: uRect.right - stRect.left, bottom: uRect.bottom - stRect.top };
            }
          }
          if (!penRect && activeFocusToken) {
            penRect = getTokenRectInStage(activeFocusToken);
          }
          if (penRect) {
            teacherPen.style.opacity = '1';
            teacherPen.style.left = `${(penRect.right - 1).toFixed(1)}px`;
            teacherPen.style.top = `${(penRect.bottom - 2).toFixed(1)}px`;
          } else {
            teacherPen.style.opacity = '0';
          }
        } else if (teacherPen) {
          teacherPen.style.opacity = '0';
        }

        renderSvgAnnotationsAt(t);
        geoAnimList.forEach(gItem => {
          const p = t <= 0.02 ? 0 : easeOutCubic((t - gItem.appearAt) / Math.max(0.08, gItem.dur));
          gItem.el.style.opacity = p.toFixed(3);
          if (gItem.dashLen > 0) {
            gItem.el.style.strokeDasharray = String(gItem.dashLen);
            gItem.el.style.strokeDashoffset = (gItem.dashLen * (1 - p)).toFixed(1);
          }
        });

        // 更新上一步/下一步按钮状态：在 00:00.0 时允许点「下一步 →」进入第 1 步
        const prevBtn = container.querySelector('#btnProcDynPrev');
        const nextBtn = container.querySelector('#btnProcDynNext');
        if (prevBtn) prevBtn.disabled = t <= 0.05 || step <= 1;
        if (nextBtn) nextBtn.disabled = step >= totalSteps && t >= (demoData.steps[totalSteps - 1]?.tEnd || totalDuration) - 0.1;

        const beats = demoData.microBeats || [];
        const prevBeatBtn = container.querySelector('#btnProcDynPrevBeat');
        const nextBeatBtn = container.querySelector('#btnProcDynNextBeat');
        if (prevBeatBtn) {
          prevBeatBtn.disabled = !beats.some(b => b.time < t - 0.15);
        }
        if (nextBeatBtn) {
          nextBeatBtn.disabled = !beats.some(b => b.time > t + 0.15);
        }
      };

      ProceduralState.activeTimelineRenderFn = renderTimelineAt;

      // 启动 60fps 时间轴播放（连续播放或单步播放至 targetStopTime 自动停住）
      const playTimelineTo = (startTime, stopTime, isContinuous = false) => {
        stopDynamicPlayback();
        ProceduralState.currentTime = startTime;
        ProceduralState.targetStopTime = stopTime;
        ProceduralState.isContinuousMode = Boolean(isContinuous);
        ProceduralState.isPlaying = true;
        ProceduralState.lastFrameTs = performance.now();

        const playBtnText = document.getElementById('procDynPlayBtnText');
        const playBtnIcon = document.getElementById('procDynPlayBtnIcon');
        if (isContinuous) {
          if (playBtnText) playBtnText.textContent = '暂停';
          if (playBtnIcon) playBtnIcon.textContent = '⏸';
        } else {
          // 单步推进时不把主播放按钮变成“暂停”，避免让用户误以为进入了连续播放
          if (playBtnText) playBtnText.textContent = '继续播放';
          if (playBtnIcon) playBtnIcon.textContent = '▶';
        }

        renderTimelineAt(startTime, true);

        const tick = (now) => {
          if (!ProceduralState.isPlaying) return;
          const dt = Math.min(0.06, Math.max(0, (now - ProceduralState.lastFrameTs) / 1000));
          ProceduralState.lastFrameTs = now;
          const nextT = ProceduralState.currentTime + dt * (ProceduralState.playbackRate || 1.0) * STREAM_BASE_FLOW_SCALE;

          if (nextT >= ProceduralState.targetStopTime) {
            renderTimelineAt(ProceduralState.targetStopTime, true);
            ProceduralState.isContinuousMode = false;
            stopDynamicPlayback();
            return;
          }

          renderTimelineAt(nextT);
          ProceduralState.rafId = requestAnimationFrame(tick);
        };

        ProceduralState.rafId = requestAnimationFrame(tick);
      };

      // 单步推进指定步骤：平滑演播该步骤后严格停在该步结尾（不自动连播）
      const playSingleStep = (stepNum) => {
        const sIdx = Math.max(0, Math.min(totalSteps - 1, stepNum - 1));
        const stObj = demoData.steps[sIdx];
        ProceduralState.dynamicStep = stObj.step;
        playTimelineTo(stObj.tStart, stObj.tEnd, false);
      };

      // 点击顶部步骤标签：单步推演该步并停在该步结尾
      container.querySelectorAll('.proc-dyn-step-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const s = Number(tab.getAttribute('data-step')) || 1;
          playSingleStep(s);
        });
      });

      // 拖拽时间轴滑块
      timelineRange?.addEventListener('input', (e) => {
        stopDynamicPlayback();
        const val = parseFloat(e.target.value || '0');
        renderTimelineAt(val, true);
      });

      // 上一步：回到上一步单步演播并停住
      container.querySelector('#btnProcDynPrev')?.addEventListener('click', () => {
        const curStep = ProceduralState.dynamicStep || getStepAtTime(ProceduralState.currentTime);
        if (curStep <= 1) return;
        playSingleStep(curStep - 1);
      });

      // 下一步：在 00:00.0 初始态点下一步先推演第 1 步并停住；之后依次单步推进到下一步并停住
      container.querySelector('#btnProcDynNext')?.addEventListener('click', () => {
        if (ProceduralState.currentTime <= 0.05) {
          playSingleStep(1);
          return;
        }
        const curStep = ProceduralState.dynamicStep || getStepAtTime(ProceduralState.currentTime);
        if (curStep >= totalSteps) return;
        playSingleStep(curStep + 1);
      });

      // 上一节点 / 下一节点
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
        renderTimelineAt(targetBeat.time, true);
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
        renderTimelineAt(targetBeat.time, true);
      });

      // 开始演示 / 连续播放 / 暂停（唯一连续播放入口）
      container.querySelector('#btnProcDynPlayPause')?.addEventListener('click', () => {
        if (ProceduralState.isPlaying && ProceduralState.isContinuousMode) {
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

      // 回到开头
      container.querySelector('#btnProcDynRestart')?.addEventListener('click', () => {
        stopDynamicPlayback();
        ProceduralState.dynamicStep = 1;
        ProceduralState.targetStopTime = demoData.steps[0]?.tEnd || 6.5;
        renderTimelineAt(0.0, true);
        const playBtnText = document.getElementById('procDynPlayBtnText');
        if (playBtnText) playBtnText.textContent = '开始';
      });

      // 倍速切换
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
        const pracSection = container.querySelector('#procDynPracticeSection');
        if (pracSection) {
          pracSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });

      // 练习一交互
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
              if (ind) { ind.textContent = ''; ind.className = 'prac1-opt-indicator text-xs font-bold text-slate-400'; }
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
          if (ind) { ind.textContent = ''; ind.className = 'prac1-opt-indicator text-xs font-bold text-slate-400'; }
        });
      });

      // 练习二交互
      const inputX = container.querySelector('#prac2InputX');
      const inputMin = container.querySelector('#prac2InputMin');
      const prac2CorrectEl = container.querySelector('#prac2FeedbackCorrect');
      const prac2WrongEl = container.querySelector('#prac2FeedbackWrong');
      const prac2WrongHintText = container.querySelector('#prac2WrongHintText');

      const normalizeNumStr = (val) => String(val || '').trim().replace(/[−﹣－]/g, '-').replace(/＜/g, '<').replace(/＞/g, '>').replace(/＝/g, '=').replace(/^\+/, '');

      inputX?.addEventListener('input', () => { ProceduralState.prac2InputX = inputX.value; });
      inputMin?.addEventListener('input', () => { ProceduralState.prac2InputMin = inputMin.value; });

      const checkPrac2 = () => {
        ProceduralState.prac2InputX = inputX?.value || '';
        ProceduralState.prac2InputMin = inputMin?.value || '';
        ProceduralState.prac2Submitted = true;
        const xVal = normalizeNumStr(inputX?.value);
        const minVal = normalizeNumStr(inputMin?.value);
        const p2Cfg = demoData.practices.practice2;
        const expX = p2Cfg.expectedX;
        const expMin = p2Cfg.expectedMin;
        const isMatch = p2Cfg.singleInput
          ? (xVal === expX)
          : ((xVal === expX && minVal === expMin) ||
            (Boolean(p2Cfg.allowOrderSwap) && xVal === expMin && minVal === expX));

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

      // 默认展开初始化到当前时间帧（首次为 00:00.0）
      renderTimelineAt(ProceduralState.currentTime || 0.0, true);
      requestAnimationFrame(() => {
        renderTimelineAt(ProceduralState.currentTime || 0.0, true);
      });
    },

    // =========================================================================
    // 关联题目区块独立渲染（支持题型筛选、默认 8 题展开、加入试题篮后局部刷新不重置白板）
    // =========================================================================
    renderRelatedQuestionsBlock() {
      const blockEl = document.getElementById('procRelatedQuestionsBlock');
      if (!blockEl) return;
      const col = window.ProceduralKnowledgeService?.getQuestionCollectionByProcedure(ProceduralState.selectedProcedureId);
      if (!col) return;

      const allItems = col.items || [];
      const typeCounts = { all: allItems.length, choice: 0, blank: 0, judge: 0, calc: 0 };
      allItems.forEach(it => {
        const t = normalizeQuestionType(it.question);
        if (typeCounts[t] !== undefined) typeCounts[t]++;
      });

      const activeType = ProceduralState.relatedTypeFilter || 'all';
      const filteredItems = activeType === 'all'
        ? allItems
        : allItems.filter(it => normalizeQuestionType(it.question) === activeType);

      const visibleItems = ProceduralState.relatedExpanded
        ? filteredItems
        : filteredItems.slice(0, RELATED_PAGE_SIZE);

      const typeLabelMap = [
        { key: 'all', label: '全部' },
        { key: 'choice', label: '单选题' },
        { key: 'blank', label: '填空题' },
        { key: 'judge', label: '判断题' },
        { key: 'calc', label: '解答题' }
      ];

      const filterPillsHtml = typeLabelMap
        .filter(t => t.key === 'all' || typeCounts[t.key] > 0)
        .map(t => `
          <button type="button" class="proc-q-filter-pill ${activeType === t.key ? 'is-active' : ''}" data-rel-type="${t.key}">
            ${t.label} (${typeCounts[t.key]})
          </button>
        `).join('');

      const cardsHtml = visibleItems.map((item) => {
        const q = item.question;
        const seqNum = allItems.indexOf(item) + 1;
        const isSelected = state.selectedIds.has(q.id);
        const diffColor = typeof getDifficultyBadgeClass === 'function' ? getDifficultyBadgeClass(q.difficulty) : 'q-meta-diff';
        const isAnalysisOpen = ProceduralState.expandedAnalysisIds.includes(q.id);

        const optionsHtml = (q.options && q.options.length > 0) ? `
          <div class="q-options-grid grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm text-slate-800">
            ${q.options.map(opt => `<div class="answer-option ${typeof getOptionLayoutClass === 'function' ? getOptionLayoutClass(opt) : ''}">${renderMathText(opt)}</div>`).join('')}
          </div>
        ` : '';
        const imgHtml = q.image ? `<div class="my-1.5"><img src="${q.image}" class="max-h-40 max-w-xs h-auto rounded object-contain"></div>` : '';

        return `
          <div class="question-card ${isSelected ? 'is-selected' : ''}" data-id="${escapeHtml(q.id)}">
            <div class="q-card-header flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">#${seqNum}</span>
                <span class="q-meta-chapter">${renderMathText(col.procedure.name)}</span>
                <span class="q-meta-type">${escapeHtml(q.typeName)}</span>
                <span class="${diffColor}">${escapeHtml(q.difficulty)}</span>
              </div>
              <div class="q-meta-kp">
                <span>考点：</span><span class="q-meta-kp-text">${escapeHtml(window.GraphData ? window.GraphData.getDisplayKnowledgeName(q) : (q.knowledge || ''))}</span>
              </div>
            </div>

            <div class="q-card-body text-sm leading-relaxed text-slate-900">
              <div class="q-stem-content">${renderMathText(q.stem)}</div>
              ${imgHtml}
              ${optionsHtml}
            </div>

            <div id="proc_q_analysis_${escapeHtml(q.id)}" class="${isAnalysisOpen ? '' : 'hidden'} q-analysis-panel text-sm space-y-1.5">
              ${typeof window.renderQuestionAnalysisBoxHtml === 'function' ? window.renderQuestionAnalysisBoxHtml(q) : ''}
            </div>

            <div class="q-card-footer flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-2 text-xs">
                <button type="button" class="btn-proc-toggle-analysis q-aux-btn" data-id="${escapeHtml(q.id)}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  <span class="analysis-btn-text">${isAnalysisOpen ? '收起答案' : '查看答案'}</span>
                </button>
                <button type="button" class="btn-proc-preview-drawer q-aux-btn text-[#0F766E] font-semibold" data-preview-q="${escapeHtml(q.id)}">
                  <span>详情</span>
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

      const remainingCount = filteredItems.length - visibleItems.length;
      const expandFooterHtml = filteredItems.length > RELATED_PAGE_SIZE ? `
        <div class="pt-1 text-center">
          <button type="button" id="btnProcToggleExpandRelated" class="btn-secondary px-5 py-2 rounded-lg text-xs font-semibold text-[#0F766E]">
            ${ProceduralState.relatedExpanded ? `收起至前 ${RELATED_PAGE_SIZE} 题` : `展开剩余 ${remainingCount} 题（共 ${filteredItems.length} 题）`}
          </button>
        </div>
      ` : '';

      blockEl.innerHTML = `
        <div class="ui-card p-4 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 class="text-sm sm:text-base font-bold text-slate-900">
                关联题目
              </h3>
            </div>
            <button type="button" id="btnProcAddAllToBasket" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold">
              + 全部选入试题篮
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            ${filterPillsHtml}
          </div>
        </div>

        <div class="space-y-3" id="procDetailQuestionList">
          ${cardsHtml || '<div class="ui-card py-10 text-center text-xs text-slate-400">当前题型下暂无关联题目</div>'}
        </div>
        ${expandFooterHtml}
      `;

      blockEl.querySelectorAll('[data-rel-type]').forEach(btn => {
        btn.addEventListener('click', () => {
          ProceduralState.relatedTypeFilter = btn.getAttribute('data-rel-type') || 'all';
          ProceduralState.relatedExpanded = false;
          this.renderRelatedQuestionsBlock();
        });
      });

      blockEl.querySelector('#btnProcToggleExpandRelated')?.addEventListener('click', () => {
        ProceduralState.relatedExpanded = !ProceduralState.relatedExpanded;
        this.renderRelatedQuestionsBlock();
      });

      blockEl.querySelector('#btnProcAddAllToBasket')?.addEventListener('click', () => {
        allItems.forEach(it => state.selectedIds.add(it.question.id));
        if (typeof updateStats === 'function') updateStats();
        if (typeof renderBasketDrawer === 'function') renderBasketDrawer();
        this.renderRelatedQuestionsBlock();
        if (typeof showToast === 'function') {
          showToast(`已将「${col.procedure.name}」的 ${col.totalQuestions} 道题目加入试题篮！`, 'success');
        }
      });

      blockEl.querySelectorAll('.btn-proc-toggle-analysis').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-id');
          const panel = document.getElementById(`proc_q_analysis_${qid}`);
          const txt = btn.querySelector('.analysis-btn-text');
          if (!panel) return;
          const isHidden = panel.classList.contains('hidden');
          panel.classList.toggle('hidden', !isHidden);
          if (txt) txt.textContent = isHidden ? '收起答案' : '查看答案';
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

      blockEl.querySelectorAll('.btn-proc-preview-drawer').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-preview-q');
          if (qid) this.openQuestionDrawer(qid);
        });
      });

      blockEl.querySelectorAll('.btn-proc-toggle-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-id');
          if (typeof toggleCartItem === 'function') toggleCartItem(qid);
          this.renderRelatedQuestionsBlock();
        });
      });

      if (typeof renderMath === 'function') renderMath();
    },

    // =========================================================================
    // 右侧直达动态演示工作台
    // =========================================================================
    renderDetailView(container) {
      const col = window.ProceduralKnowledgeService?.getQuestionCollectionByProcedure(ProceduralState.selectedProcedureId);
      if (!col) {
        container.innerHTML = `<div class="ui-card py-14 text-center text-xs text-slate-400">暂无可展示的程序性知识</div>`;
        return;
      }

      const p = col.procedure;
      const curAlign = getGraphAlignment(p);
      const demoData = window.PROCEDURAL_DYNAMIC_DEMOS ? window.PROCEDURAL_DYNAMIC_DEMOS[p.id] : null;

      // 查找同一图谱考点下的全部已发布程序性知识（若 >= 2 个则顶部渲染 Tab 切换）
      const sameSectionProcs = getPublishedCollections()
        .map(c => c.procedure)
        .filter(item => getGraphAlignment(item).nodeId === curAlign.nodeId);

      const sectionTabsHtml = sameSectionProcs.length > 1 ? `
        <div class="pt-2.5 border-t border-slate-100">
          <div class="proc-section-tabs-scroll">
            ${sameSectionProcs.map((sp, idx) => {
              const isAct = sp.id === p.id;
              return `
                <button type="button" class="proc-sec-tab shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg border text-xs transition flex items-center gap-1.5 ${
                  isAct
                    ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-[#F0FDFA] hover:border-[#99F6E4]'
                }" data-switch-proc="${escapeHtml(sp.id)}">
                  <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isAct ? 'bg-white text-[#0F766E]' : 'bg-white text-slate-500 border border-slate-200'
                  }">${idx + 1}</span>
                  <span>${renderMathText(sp.name)}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // 历史返回按钮（展示图谱考点名称）
      const prevHistorySnap = Array.isArray(ProceduralState.detailHistoryStack) && ProceduralState.detailHistoryStack.length > 0
        ? ProceduralState.detailHistoryStack[ProceduralState.detailHistoryStack.length - 1]
        : null;
      const prevProcObj = prevHistorySnap ? getPublishedProcedureById(prevHistorySnap.procedureId) : null;
      const prevAlign = prevProcObj ? getGraphAlignment(prevProcObj) : null;

      // 前置知识区块（位于动态演示之上，按知识点逐行排列：已做可跳转，未做保留灰色）
      const prereqs = Array.isArray(p.prerequisites) ? p.prerequisites : [];
      const prereqRowsHtml = prereqs.map(pr => {
        const linkedProc = pr.id ? getPublishedProcedureById(pr.id) : null;
        if (linkedProc) {
          const targetNodeName = getGraphAlignment(linkedProc).nodeName;
          return `
            <button type="button" class="proc-prereq-row is-clickable" data-nav-proc="${escapeHtml(linkedProc.id)}" title="点击直达该前置知识的动态演示">
              <span class="flex items-center gap-2 min-w-0">
                <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E] shrink-0"></span>
                <span class="font-medium truncate">${renderMathText(pr.name || linkedProc.name)}</span>
              </span>
              <span class="inline-flex items-center gap-1.5 shrink-0 text-xs font-semibold text-[#0F766E]">
                <span class="px-1.5 py-0.5 rounded bg-white/90 border border-[#99F6E4] text-[11px]">${escapeHtml(targetNodeName)}</span>
                <span>&rarr;</span>
              </span>
            </button>
          `;
        }
        return `
          <div class="proc-prereq-row is-disabled" aria-disabled="true">
            <span class="flex items-center gap-2 min-w-0">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
              <span class="truncate">${renderMathText(pr.name)}</span>
            </span>
            <span class="shrink-0 text-[11px] text-slate-400">待补充</span>
          </div>
        `;
      }).join('');

      const prereqSectionHtml = prereqs.length > 0 ? `
        <section class="ui-card p-4 space-y-2">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#0F766E]"></span>
              <h3 class="text-xs sm:text-sm font-bold text-slate-800">前置知识</h3>
            </div>
          </div>
          <div class="space-y-1.5">
            ${prereqRowsHtml}
          </div>
        </section>
      ` : '';

      container.innerHTML = `
        <!-- 右侧吸顶工具条（含返回上一知识点、图谱考点标识与同考点 Tab） -->
        <div class="proc-sticky-header ui-card px-4 py-3 space-y-2.5 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0 flex-1">
              ${prevProcObj ? `
                <button type="button" id="btnProcBackPrevKnowledge" class="shrink-0 px-2.5 py-1 rounded-lg bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] text-xs font-semibold hover:bg-[#CCFBF1]/60 transition inline-flex items-center gap-1" title="返回上一个浏览的知识点：${escapeHtml(prevProcObj.name)}">
                  <span>← 返回</span>
                  <span class="hidden sm:inline">${escapeHtml(prevAlign ? prevAlign.nodeName : prevProcObj.name)}</span>
                </button>
              ` : ''}
              <span class="shrink-0 px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">${escapeHtml(curAlign.nodeName)}</span>
              <span class="shrink-0 px-2 py-0.5 rounded bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1] text-xs font-semibold">${escapeHtml(p.grade)}</span>
              <h2 class="text-sm sm:text-base font-bold text-slate-900 truncate" title="${escapeHtml(p.name)}">${renderMathText(p.name)}</h2>
            </div>
          </div>

          ${p.description ? `<p class="text-xs text-slate-500 leading-relaxed">${renderMathText(p.description)}</p>` : ''}
          ${sectionTabsHtml}
        </div>

        <!-- 区块 1：前置知识（位于动态演示之上，逐行排列） -->
        ${prereqSectionHtml}

        <!-- 区块 2 & 3：默认展开的动态演示白板 + 跟着操作 -->
        <section id="procDemoAnchor" class="scroll-mt-36">
          ${demoData ? this.buildDynamicTeachingModuleHtml(demoData) : `
            <div class="ui-card p-5 space-y-4">
              <div class="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">核心操作步骤</span>
                  <h3 class="text-sm font-bold text-slate-900">${renderMathText(p.name)}</h3>
                </div>
                <span class="text-[11px] text-slate-400">标准程序性操作指引</span>
              </div>
              ${Array.isArray(p.steps) && p.steps.length > 0 ? `
                <ol class="space-y-2.5">
                  ${p.steps.map(st => `
                    <li class="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="w-5 h-5 rounded-full bg-[#0F766E] text-white text-[11px] font-bold flex items-center justify-center shrink-0">${escapeHtml(st.step)}</span>
                        <span class="text-xs sm:text-sm font-bold text-slate-900">${renderMathText(st.title)}</span>
                      </div>
                      ${st.description ? `<p class="text-xs text-slate-600 leading-relaxed pl-7">${renderMathText(st.description)}</p>` : ''}
                      ${st.formula ? `<div class="text-xs text-[#0F766E] font-medium pl-7">${renderMathText(st.formula)}</div>` : ''}
                    </li>
                  `).join('')}
                </ol>
              ` : ''}
              ${Array.isArray(p.pitfalls) && p.pitfalls.length > 0 ? `
                <div class="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                  <div class="text-xs font-bold text-amber-900">教学强调与易错提醒</div>
                  <ul class="list-disc pl-5 space-y-1 text-xs text-amber-900/90 leading-relaxed">
                    ${p.pitfalls.map(pf => `<li>${renderMathText(pf)}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          `}
        </section>

        <!-- 区块 4：关联题目（题型筛选 + 分批展开 + 原题抽屉） -->
        <section id="procRelatedQuestionsBlock" class="scroll-mt-36 space-y-3"></section>
      `;

      if (demoData) {
        this.bindDynamicTeachingEvents(container, demoData);
      }

      this.renderRelatedQuestionsBlock();

      // 绑定吸顶工具条事件
      container.querySelector('#btnProcBackPrevKnowledge')?.addEventListener('click', () => {
        this.goBackDetail();
      });

      container.querySelectorAll('.proc-sec-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-switch-proc');
          if (targetId && targetId !== ProceduralState.selectedProcedureId) {
            this.openDetail(targetId, true, { recordHistory: true });
          }
        });
      });

      container.querySelectorAll('[data-nav-proc]').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-nav-proc');
          if (targetId) this.openDetail(targetId, true, { recordHistory: true });
        });
      });
    }
  };

  window.ProceduralState = ProceduralState;
  window.ProceduralView = ProceduralView;
})();
