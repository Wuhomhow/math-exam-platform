function renderFallbackAnalysisBoxHtml(q) {
    const analysis = (q.analysis || '').trim();
    const detail = (q.detail || '').trim();
    const hasAnalysis = Boolean(analysis && analysis !== '略');
    const hasDetail = Boolean(detail && detail !== '略');

    return `
        <div class="flex items-center space-x-2 font-bold text-slate-900">
            <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>
            <span>参考答案：</span>
            <span class="text-[#0F766E] font-semibold text-sm tracking-wide">${formatMathHtml(q.answer)}</span>
        </div>
        ${hasAnalysis ? `<div class="text-slate-600"><b class="text-slate-800">【分析】</b>${formatMathHtml(analysis)}</div>` : ''}
        ${hasDetail ? `<div class="text-slate-700 ${hasAnalysis ? 'pt-1.5 border-t border-slate-200/70 ' : ''}leading-relaxed"><b class="text-slate-800">【详解】</b>${formatMathHtml(detail)}</div>` : ''}
    `;
}
function getPreviewExplanation(q) {
    const detail = (q.detail || '').trim();
    if (detail && detail !== '略') return detail;
    const analysis = (q.analysis || '').trim();
    if (analysis && analysis !== '略') return analysis;
    return '';
}

function renderPreviewExplanationLine(q) {
    const exp = getPreviewExplanation(q);
    return exp ? `<div><b>【解析】</b>${formatMathHtml(exp)}</div>` : '';
}
function getDifficultyBadgeClass(diff) {
      switch (diff) {
        case '容易':
          return 'q-meta-diff is-easy';
        case '较易':
          return 'q-meta-diff is-fair';
        case '适中':
        case '中等':
          return 'q-meta-diff is-medium';
        case '较难':
          return 'q-meta-diff is-hard';
        case '困难':
          return 'q-meta-diff is-extreme';
        default:
          return 'q-meta-diff';
      }
    }
    // On-demand lazy module loader with caching (keeps initial page load light)
    const _lazyScriptCache = new Map();
    function loadScriptAssetOnce(src) {
      if (_lazyScriptCache.has(src)) return _lazyScriptCache.get(src);
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing && existing.dataset.loaded === 'true') {
        const done = Promise.resolve();
        _lazyScriptCache.set(src, done);
        return done;
      }
      const promise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => {
          script.dataset.loaded = 'true';
          resolve();
        };
        script.onerror = () => {
          _lazyScriptCache.delete(src);
          if (script.parentNode) script.parentNode.removeChild(script);
          reject(new Error(`Failed to load module: ${src}`));
        };
        document.body.appendChild(script);
      });
      _lazyScriptCache.set(src, promise);
      return promise;
    }

    let _graphModulesPromise = null;
    function ensureGraphModulesLoaded() {
      if (window.GraphFilter && window._graphModulesInitialized) return Promise.resolve();
      if (_graphModulesPromise) return _graphModulesPromise;
      _graphModulesPromise = (async () => {
        await loadScriptAssetOnce('js/modules/knowledge-graph/graph-filter.js');
        await loadScriptAssetOnce('js/modules/knowledge-graph/graph-tree.js');
        await loadScriptAssetOnce('js/modules/knowledge-graph/graph-network.js');
        if (!window._graphModulesInitialized) {
          if (window.GraphData && !window._graphDataInitialized) {
            window.GraphData.init();
            window._graphDataInitialized = true;
          }
          if (window.GraphFilter) window.GraphFilter.init();
          if (window.GraphDetail) window.GraphDetail.bindQuestionFilterBar();
          window._graphModulesInitialized = true;
        }
      })().catch((err) => {
        _graphModulesPromise = null;
        console.error(err);
        if (typeof showToast === 'function') showToast('知识图谱模块加载失败，请重试', 'warn');
        throw err;
      });
      return _graphModulesPromise;
    }
    window.ensureGraphModulesLoaded = ensureGraphModulesLoaded;

    let _proceduralModulesPromise = null;
    function ensureProceduralModulesLoaded() {
      if (window.ProceduralView && window._proceduralModulesInitialized) return Promise.resolve();
      if (_proceduralModulesPromise) return _proceduralModulesPromise;
      _proceduralModulesPromise = (async () => {
        await loadScriptAssetOnce('js/data/procedural-dynamic-demos.js');
        await loadScriptAssetOnce('js/modules/procedural/procedural-view.js');
        if (!window._proceduralModulesInitialized && window.ProceduralView) {
          window.ProceduralView.init();
          window._proceduralModulesInitialized = true;
        }
      })().catch((err) => {
        _proceduralModulesPromise = null;
        console.error(err);
        if (typeof showToast === 'function') showToast('程序性知识模块加载失败，请重试', 'warn');
        throw err;
      });
      return _proceduralModulesPromise;
    }
    window.ensureProceduralModulesLoaded = ensureProceduralModulesLoaded;

    let _docxExportPromise = null;
    function ensureDocxExportLoaded() {
      if (typeof window.exportWordDoc === 'function' || typeof exportWordDoc === 'function') return Promise.resolve();
      if (_docxExportPromise) return _docxExportPromise;
      _docxExportPromise = loadScriptAssetOnce('js/modules/docx-export.js').catch((err) => {
        _docxExportPromise = null;
        console.error(err);
        if (typeof showToast === 'function') showToast('Word 导出模块加载失败，请重试', 'warn');
        throw err;
      });
      return _docxExportPromise;
    }
    window.ensureDocxExportLoaded = ensureDocxExportLoaded;

    // Switch Main Views (题库 / 题目图谱 / 程序性知识 / 试卷预览)
    function switchView(viewName) {
      if (viewName !== 'paper' && viewName !== 'graph' && viewName !== 'procedural') viewName = 'bank';
      const prevView = state.currentView;
      if (prevView === 'procedural' && viewName !== 'procedural' && window.ProceduralView && typeof window.ProceduralView.suspendCurrentDetailState === 'function') {
        window.ProceduralView.suspendCurrentDetailState();
      }
      state.currentView = viewName;
      try {
        localStorage.setItem(LAST_VIEW_STORAGE_KEY, viewName);
      } catch (error) {
        // The current view still switches normally if browser storage is unavailable.
      }
      document.getElementById('viewQuestionBank')?.classList.toggle('hidden', viewName !== 'bank');
      document.getElementById('viewKnowledgeGraph')?.classList.toggle('hidden', viewName !== 'graph');
      document.getElementById('viewProceduralKnowledge')?.classList.toggle('hidden', viewName !== 'procedural');
      document.getElementById('viewPaperPreview')?.classList.toggle('hidden', viewName !== 'paper');

      const bankBtn = document.getElementById('navBankBtn');
      const graphBtn = document.getElementById('navGraphBtn');
      const procBtn = document.getElementById('navProceduralBtn');
      const paperBtn = document.getElementById('navPaperBtn');
      if (bankBtn) bankBtn.classList.toggle('is-active', viewName === 'bank');
      if (graphBtn) graphBtn.classList.toggle('is-active', viewName === 'graph');
      if (procBtn) procBtn.classList.toggle('is-active', viewName === 'procedural');
      if (paperBtn) paperBtn.classList.toggle('is-active', viewName === 'paper');

      const mobileBankBtn = document.getElementById('mobileNavBank');
      const mobileGraphBtn = document.getElementById('mobileNavGraph');
      const mobileProcBtn = document.getElementById('mobileNavProcedural');
      const mobilePaperBtn = document.getElementById('mobileNavPaper');
      if (mobileBankBtn) mobileBankBtn.classList.toggle('is-active', viewName === 'bank');
      if (mobileGraphBtn) mobileGraphBtn.classList.toggle('is-active', viewName === 'graph');
      if (mobileProcBtn) mobileProcBtn.classList.toggle('is-active', viewName === 'procedural');
      if (mobilePaperBtn) mobilePaperBtn.classList.toggle('is-active', viewName === 'paper');

      saveUiPreferences();
      if (viewName === 'paper') renderPaper();
      if (viewName === 'graph') {
        if (window.GraphFilter && window._graphModulesInitialized) {
          window.GraphFilter.refreshAllViews({ keepNetworkTransform: true });
        } else {
          ensureGraphModulesLoaded().then(() => {
            if (state.currentView === 'graph' && window.GraphFilter) {
              window.GraphFilter.refreshAllViews({ keepNetworkTransform: true });
              setTimeout(renderMath, 50);
            }
          }).catch(() => {});
        }
      }
      let restoredProceduralScroll = false;
      if (viewName === 'procedural') {
        if (window.ProceduralView && window._proceduralModulesInitialized) {
          if (typeof window.ProceduralView.hasSuspendedDetailSnapshot === 'function' && window.ProceduralView.hasSuspendedDetailSnapshot()) {
            restoredProceduralScroll = Boolean(window.ProceduralView.resumeSuspendedDetail());
          } else {
            window.ProceduralView.render();
          }
        } else {
          ensureProceduralModulesLoaded().then(() => {
            if (state.currentView === 'procedural' && window.ProceduralView) {
              window.ProceduralView.render();
              setTimeout(renderMath, 50);
            }
          }).catch(() => {});
        }
      }
      if (!restoredProceduralScroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setTimeout(renderMath, 50);
    }
    function normalizeDifficulty(diff) {
      if (diff === '适中') return '中等';
      if (diff === '困难') return '较难';
      return diff || '';
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

    function getDisplayKnowledgeName(q) {
      if (!q) return '';
      if (window.GraphData && typeof window.GraphData.getDisplayKnowledgeName === 'function') {
        return window.GraphData.getDisplayKnowledgeName(q);
      }
      return String(q.knowledge || '').trim();
    }

    let _pedagogyTagCache = null;
    function getQuestionPedagogyTag(questionId) {
      if (!_pedagogyTagCache) {
        _pedagogyTagCache = new Map();
        const catalogMap = (window.QUESTION_CATALOG_MAP && typeof window.QUESTION_CATALOG_MAP === 'object')
          ? window.QUESTION_CATALOG_MAP
          : {};
        Object.keys(catalogMap).forEach(qid => {
          const entry = catalogMap[qid];
          if (entry && (entry.pedagogyTag === 'procedural_bank' || entry.pedagogyTag === 'comprehensive')) {
            _pedagogyTagCache.set(qid, entry.pedagogyTag);
          }
        });
        const qps = Array.isArray(window.QUESTION_PROCEDURES) ? window.QUESTION_PROCEDURES : [];
        qps.forEach(r => {
          if (!r || !r.questionId) return;
          if (r.visibility === 'bank_only') {
            if (_pedagogyTagCache.get(r.questionId) !== 'procedural_featured') {
              _pedagogyTagCache.set(r.questionId, 'procedural_bank');
            }
          } else {
            _pedagogyTagCache.set(r.questionId, 'procedural_featured');
          }
        });
      }
      if (_pedagogyTagCache.has(questionId)) {
        return _pedagogyTagCache.get(questionId);
      }
      // 尚未在 QUESTION_PROCEDURES 或 QUESTION_CATALOG_MAP 显式标注的题：
      // 仅含单个图谱知识点且无综合考查属性 → 程序性扩充；否则 → 综合拓展
      if (window.GraphData) {
        const entries = window.GraphData.getKnowledgeForQuestion(questionId) || [];
        const hasCompRole = entries.some(e => e.role === 'comprehensive');
        if (entries.length === 1 && !hasCompRole) {
          const q = window.GraphData.questionById ? window.GraphData.questionById.get(questionId) : null;
          const rawKp = String((q && q.knowledge) || '').trim();
          const rawParts = rawKp ? rawKp.split(/[、；;，,]/).map(s => s.trim()).filter(Boolean) : [];
          const isSynth = /综合|压轴|探究|动点|折叠|割补|存在性|新定义/.test(rawKp);
          if (!isSynth && rawParts.length <= 1) {
            _pedagogyTagCache.set(questionId, 'procedural_bank');
            return 'procedural_bank';
          }
        }
      }
      _pedagogyTagCache.set(questionId, 'comprehensive');
      return 'comprehensive';
    }

    function getKpSectionData(kpId) {
      if (!window.GraphData) return null;
      const qs = window.GraphData.getPrimaryQuestionsForNode(kpId, true);
      const counts = { all: qs.length, procedural_featured: 0, procedural_bank: 0, comprehensive: 0 };
      const tagByQuestionId = new Map();
      const items = qs.map(q => {
        const tag = getQuestionPedagogyTag(q.id);
        tagByQuestionId.set(q.id, tag);
        if (counts[tag] !== undefined) counts[tag]++;
        return { question: q, pedagogyTag: tag };
      });
      return { items, counts, tagByQuestionId };
    }

    function matchesSearchKeyword(q, keyword) {
      if (!keyword) return true;
      const kw = String(keyword).trim().toLowerCase();
      if (!kw) return true;
      const matchStem = String(q.stem || '').toLowerCase().includes(kw);
      const matchGraphKp = getDisplayKnowledgeName(q).toLowerCase().includes(kw);
      const matchKp = String(q.knowledge || '').toLowerCase().includes(kw);
      const matchAnswer = String(q.answer || '').toLowerCase().includes(kw);
      const matchChap = String(q.chapter || '').toLowerCase().includes(kw);
      return matchStem || matchGraphKp || matchKp || matchAnswer || matchChap;
    }

    function getCurrentFilteredQuestions() {
      const isKpFilter = typeof state.chapterFilter === 'string' && state.chapterFilter.startsWith('kp:');
      if (isKpFilter && window.GraphData) {
        const kpData = getKpSectionData(state.chapterFilter.slice(3));
        const items = kpData ? kpData.items : [];
        return items.filter(it => {
          const q = it && it.question;
          if (!q) return false;
          if (state.pedagogyFilter && state.pedagogyFilter !== 'all' && it.pedagogyTag !== state.pedagogyFilter) return false;
          if (state.typeFilter !== 'all' && normalizeQuestionType(q) !== state.typeFilter) return false;
          if (state.diffFilter !== 'all' && normalizeDifficulty(q.difficulty) !== state.diffFilter) return false;
          if (state.searchKeyword && !matchesSearchKeyword(q, state.searchKeyword)) return false;
          return true;
        }).map(it => it.question);
      }

      const isSectionFilter = typeof state.chapterFilter === 'string' && state.chapterFilter.startsWith('section:');
      if (isSectionFilter && window.CurriculumCatalogService) {
        const secId = state.chapterFilter.slice(8);
        const secData = window.CurriculumCatalogService.getSectionItems(secId);
        const items = secData ? secData.items : [];
        return items.filter(it => {
          const q = it && it.question;
          if (!q) return false;
          if (state.pedagogyFilter && state.pedagogyFilter !== 'all' && it.pedagogyTag !== state.pedagogyFilter) return false;
          if (state.typeFilter !== 'all' && normalizeQuestionType(q) !== state.typeFilter) return false;
          if (state.diffFilter !== 'all' && normalizeDifficulty(q.difficulty) !== state.diffFilter) return false;
          if (state.searchKeyword && !matchesSearchKeyword(q, state.searchKeyword)) return false;
          return true;
        }).map(it => it.question);
      }

      const isProcFilter = typeof state.chapterFilter === 'string' && state.chapterFilter.startsWith('proc:');
      const activeProcId = isProcFilter ? state.chapterFilter.slice(5) : null;
      const activeProcCollection = (activeProcId && window.ProceduralKnowledgeService)
        ? window.ProceduralKnowledgeService.getQuestionCollectionByProcedure(activeProcId)
        : null;

      if (isProcFilter) {
        const orderedList = activeProcCollection ? activeProcCollection.items.map(it => it.question) : [];
        return orderedList.filter(q => {
          if (!q) return false;
          if (state.typeFilter !== 'all' && normalizeQuestionType(q) !== state.typeFilter) return false;
          if (state.diffFilter !== 'all' && normalizeDifficulty(q.difficulty) !== state.diffFilter) return false;
          if (state.searchKeyword && !matchesSearchKeyword(q, state.searchKeyword)) return false;
          return true;
        });
      }
      if (typeof state.chapterFilter === 'string' && state.chapterFilter.startsWith('custom:')) {
        const paper = typeof getCustomPaperById === 'function' ? getCustomPaperById(state.chapterFilter.slice(7)) : null;
        if (paper) {
          const byId = new Map(QUESTION_BANK.map(q => [q.id, q]));
          return paper.questionIds.map(id => byId.get(id)).filter(q => {
            if (!q) return false;
            if (state.typeFilter !== 'all' && normalizeQuestionType(q) !== state.typeFilter) return false;
            if (state.diffFilter !== 'all' && normalizeDifficulty(q.difficulty) !== state.diffFilter) return false;
            if (state.searchKeyword && !matchesSearchKeyword(q, state.searchKeyword)) return false;
            return true;
          });
        }
      }
      return QUESTION_BANK.filter(q => {
        if (state.chapterFilter !== 'all') {
          if (state.chapterFilter === '2.3') {
            if (!String(q.chapter || '').startsWith('2.3')) return false;
          } else if (q.chapter !== state.chapterFilter) {
            return false;
          }
        }
        if (state.typeFilter !== 'all' && normalizeQuestionType(q) !== state.typeFilter) return false;
        if (state.diffFilter !== 'all' && normalizeDifficulty(q.difficulty) !== state.diffFilter) return false;
        if (state.searchKeyword && !matchesSearchKeyword(q, state.searchKeyword)) return false;
        return true;
      });
    }

    function getCurrentPageQuestions() {
      const isProcFilter = typeof state.chapterFilter === 'string' && state.chapterFilter.startsWith('proc:');
      const filtered = getCurrentFilteredQuestions();
      const totalCount = filtered.length;
      const pageSize = isProcFilter ? 20 : (state.pageSize || 15);
      const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
      if (state.currentPage > totalPages) state.currentPage = totalPages;
      if (state.currentPage < 1) state.currentPage = 1;
      const startIndex = (state.currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, totalCount);
      return {
        isProcFilter,
        filtered,
        totalCount,
        pageSize,
        totalPages,
        startIndex,
        endIndex,
        pageQuestions: filtered.slice(startIndex, endIndex)
      };
    }

    // Render Question Bank Cards
    function renderQuestionList() {
      const container = document.getElementById('questionList');
      const emptyState = document.getElementById('emptyQuestionState');

      // Dynamically update type & difficulty filter counts based on selected chapter
      const allQuestionCountEl = document.getElementById('allQuestionCount');
      if (allQuestionCountEl) allQuestionCountEl.textContent = `${QUESTION_BANK.length} 题`;
      const isKpFilter = typeof state.chapterFilter === 'string' && state.chapterFilter.startsWith('kp:');
      const isSectionFilter = typeof state.chapterFilter === 'string' && state.chapterFilter.startsWith('section:');
      const hasPedagogyCatalog = isKpFilter || isSectionFilter;
      const activeSectionData = isKpFilter
        ? getKpSectionData(state.chapterFilter.slice(3))
        : ((isSectionFilter && window.CurriculumCatalogService)
            ? window.CurriculumCatalogService.getSectionItems(state.chapterFilter.slice(8))
            : null);
      const pedagogyRowEl = document.getElementById('pedagogyFilterRow');
      if (pedagogyRowEl) {
        pedagogyRowEl.classList.toggle('hidden', !hasPedagogyCatalog);
      }
      if (hasPedagogyCatalog && activeSectionData) {
        const pedLabels = {
          all: '全部',
          procedural_featured: '程序性精选',
          procedural_bank: '程序性扩充',
          comprehensive: '综合拓展'
        };
        document.querySelectorAll('.filter-pedagogy-btn').forEach(b => {
          const key = b.getAttribute('data-pedagogy');
          if (pedLabels[key]) {
            const cnt = activeSectionData.counts[key] !== undefined ? activeSectionData.counts[key] : 0;
            b.textContent = `${pedLabels[key]} (${cnt})`;
          }
          b.classList.toggle('is-active', key === (state.pedagogyFilter || 'all'));
        });
      }

      const isProcFilter = typeof state.chapterFilter === 'string' && state.chapterFilter.startsWith('proc:');
      const activeProcId = isProcFilter ? state.chapterFilter.slice(5) : null;
      const activeProcCollection = (activeProcId && window.ProceduralKnowledgeService)
        ? window.ProceduralKnowledgeService.getQuestionCollectionByProcedure(activeProcId)
        : null;

      const chapPool = hasPedagogyCatalog
        ? (activeSectionData
            ? activeSectionData.items
                .filter(it => !state.pedagogyFilter || state.pedagogyFilter === 'all' || it.pedagogyTag === state.pedagogyFilter)
                .map(it => it.question)
            : [])
        : isProcFilter
          ? (activeProcCollection ? activeProcCollection.items.map(it => it.question) : [])
          : QUESTION_BANK.filter(q => {
              if (state.chapterFilter === 'all') return true;
              if (state.chapterFilter === '2.3') return String(q.chapter || '').startsWith('2.3');
              if (state.chapterFilter.startsWith('custom:')) {
                const paper = typeof getCustomPaperById === 'function' ? getCustomPaperById(state.chapterFilter.slice(7)) : null;
                return paper ? paper.questionIds.includes(q.id) : false;
              }
              return q.chapter === state.chapterFilter;
            });
      const typeMap = { all: chapPool.length, choice: 0, blank: 0, judge: 0, calc: 0 };
      const diffMap = { all: chapPool.length, '容易': 0, '较易': 0, '中等': 0, '较难': 0 };
      chapPool.forEach(q => {
        const qt = normalizeQuestionType(q);
        q.type = qt;
        if (typeMap[qt] !== undefined) typeMap[qt]++;
        const d = normalizeDifficulty(q.difficulty);
        if (diffMap[d] !== undefined) diffMap[d]++;
      });
      const typeLabels = { all: '全部', choice: '单选题', blank: '填空题', judge: '判断题', calc: '解答题' };
      document.querySelectorAll('.filter-type-btn').forEach(b => {
        const t = b.getAttribute('data-type');
        if (typeLabels[t]) b.textContent = `${typeLabels[t]} (${typeMap[t]})`;
      });
      const diffLabels = { all: '全部', '容易': '容易', '较易': '较易', '中等': '中等', '较难': '较难' };
      document.querySelectorAll('.filter-diff-btn').forEach(b => {
        const d = b.getAttribute('data-diff');
        if (diffLabels[d]) b.textContent = `${diffLabels[d]} (${diffMap[d] !== undefined ? diffMap[d] : 0})`;
      });

      const { filtered, totalPages, startIndex, pageQuestions } = getCurrentPageQuestions();
      const pagEl = document.getElementById('questionPagination');
      const procBannerHtml = (isProcFilter && typeof window.renderProceduralCollectionBannerHtml === 'function')
        ? window.renderProceduralCollectionBannerHtml(activeProcId)
        : '';

      if (filtered.length === 0) {
        container.innerHTML = procBannerHtml;
        emptyState.classList.remove('hidden');
        if (pagEl) pagEl.classList.add('hidden');
        container.querySelectorAll('[data-proc-col]').forEach(btn => {
          btn.addEventListener('click', () => {
            if (typeof window.jumpToProceduralCollection === 'function') {
              window.jumpToProceduralCollection(btn.getAttribute('data-proc-col'));
            }
          });
        });
        return;
      }
      emptyState.classList.add('hidden');

      // Render pagination toolbar
      if (pagEl) {
        if (totalPages <= 1) {
          pagEl.classList.add('hidden');
        } else {
          pagEl.classList.remove('hidden');
          let pageBtnsHtml = '';
          const maxVisiblePages = 5;
          let startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
          let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
          if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
          }

          if (startPage > 1) {
            pageBtnsHtml += `<button class="page-nav-btn px-2.5 py-1 rounded font-medium" data-page="1">1</button>`;
            if (startPage > 2) pageBtnsHtml += `<span class="px-1 text-slate-400">...</span>`;
          }

          for (let p = startPage; p <= endPage; p++) {
            const isActive = p === state.currentPage;
            pageBtnsHtml += `<button class="page-nav-btn px-2.5 py-1 rounded font-medium ${isActive ? 'is-active' : ''}" data-page="${p}">${p}</button>`;
          }

          if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageBtnsHtml += `<span class="px-1 text-slate-400">...</span>`;
            pageBtnsHtml += `<button class="page-nav-btn px-2.5 py-1 rounded font-medium" data-page="${totalPages}">${totalPages}</button>`;
          }

          pagEl.innerHTML = `
            <div class="flex items-center space-x-1.5">
              <button id="btnPrevPage" class="px-2.5 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none font-medium flex items-center space-x-1" ${state.currentPage <= 1 ? 'disabled' : ''}>
                <span>&larr;</span><span>上一页</span>
              </button>
              <div class="flex items-center space-x-1">
                ${pageBtnsHtml}
              </div>
              <button id="btnNextPage" class="px-2.5 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none font-medium flex items-center space-x-1" ${state.currentPage >= totalPages ? 'disabled' : ''}>
                <span>下一页</span><span>&rarr;</span>
              </button>
            </div>
          `;

          // Event listeners for pagination
          pagEl.querySelectorAll('.page-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const p = parseInt(btn.getAttribute('data-page'), 10);
              if (p && p !== state.currentPage) {
                state.currentPage = p;
                saveUiPreferences();
                renderQuestionList();
                window.scrollTo({ top: Math.max(0, document.getElementById('viewQuestionBank').offsetTop - 60), behavior: 'smooth' });
              }
            });
          });

          pagEl.querySelector('#btnPrevPage')?.addEventListener('click', () => {
            if (state.currentPage > 1) {
              state.currentPage--;
              saveUiPreferences();
              renderQuestionList();
              window.scrollTo({ top: Math.max(0, document.getElementById('viewQuestionBank').offsetTop - 60), behavior: 'smooth' });
            }
          });

          pagEl.querySelector('#btnNextPage')?.addEventListener('click', () => {
            if (state.currentPage < totalPages) {
              state.currentPage++;
              saveUiPreferences();
              renderQuestionList();
              window.scrollTo({ top: Math.max(0, document.getElementById('viewQuestionBank').offsetTop - 60), behavior: 'smooth' });
            }
          });
        }
      }

      container.innerHTML = procBannerHtml + pageQuestions.map((q, pageIdx) => {
        const qNumber = startIndex + pageIdx + 1;
        const isSelected = state.selectedIds.has(q.id);
        const diffColor = getDifficultyBadgeClass(q.difficulty);
        
        let optionsHtml = '';
        if (q.options && q.options.length > 0) {
          optionsHtml = `
            <div class="q-options-grid grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2.5 text-sm text-slate-800">
              ${q.options.map(opt => `<div class="answer-option ${getOptionLayoutClass(opt)}">${formatMathHtml(opt)}</div>`).join('')}
            </div>
          `;
        }

        const imgHtml = q.image ? `<div class="my-1.5"><img src="${q.image}" class="max-h-40 max-w-xs h-auto rounded object-contain"></div>` : '';

        // 举一反三按钮：轻量级秒开，点击后由 openSimilarQuestionsModal 按需毫秒级即时检索
        const similarBtnHtml = `
          <button class="btn-open-similar q-aux-btn" data-id="${q.id}" data-number="${qNumber}">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <span>举一反三</span>
          </button>
        `;

        const pedagogyTag = (hasPedagogyCatalog && activeSectionData) ? activeSectionData.tagByQuestionId.get(q.id) : null;
        const pedagogyBadgeHtml = (pedagogyTag && window.CurriculumCatalogService)
          ? window.CurriculumCatalogService.renderPedagogyBadgeHtml(pedagogyTag)
          : '';

        return `
          <div class="question-card ${isSelected ? 'is-selected' : ''}" data-id="${q.id}">
            <!-- Header Row -->
            <div class="q-card-header flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="q-meta-num">第 ${qNumber} 题</span>
                <span class="q-meta-chapter">${getChapterDisplayLabel(q.chapter)}</span>
                ${pedagogyBadgeHtml}
                <span class="q-meta-type">${q.typeName}</span>
                <span class="${diffColor}">${q.difficulty}</span>
              </div>
              <div class="q-meta-kp">
                <span>考点：</span><span class="q-meta-kp-text">${getDisplayKnowledgeName(q)}</span>
              </div>
            </div>

            <!-- Stem & Options -->
            <div class="q-card-body text-sm leading-relaxed text-slate-900">
              <div class="q-stem-content">${formatMathHtml(q.stem)}</div>
              ${imgHtml}
              ${optionsHtml}
            </div>

            <!-- Analysis Accordion Drawer -->
            <div id="analysis_${q.id}" class="hidden q-analysis-panel text-sm space-y-1.5">
              ${typeof window.renderQuestionAnalysisBoxHtml === 'function' ? window.renderQuestionAnalysisBoxHtml(q) : renderFallbackAnalysisBoxHtml(q)}
            </div>

            <!-- Bottom Actions -->
            <div data-html2canvas-ignore="true" class="q-card-footer flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-1 sm:gap-2 text-xs">
                <button class="btn-toggle-analysis q-aux-btn" data-id="${q.id}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  <span class="analysis-btn-text">查看答案解析</span>
                </button>
                <button class="btn-screenshot-question q-aux-btn" data-id="${q.id}" data-number="${qNumber}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
                  <span class="screenshot-btn-text">截图复制</span>
                </button>
                ${similarBtnHtml}
              </div>

              <!-- Cart Toggle Button -->
              <button class="btn-toggle-cart ${isSelected ? 'is-remove' : ''} px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5" data-id="${q.id}">
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

      // Double-clicking a question card toggles its existing answer/analysis panel.
      container.querySelectorAll('.question-card').forEach(card => {
        card.addEventListener('dblclick', event => {
          if (event.target.closest('button, a, input, select, textarea')) return;
          card.querySelector('.btn-toggle-analysis')?.click();
        });
      });

      // Attach event listeners
      container.querySelectorAll('.btn-toggle-analysis').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const panel = document.getElementById(`analysis_${id}`);
          const textSpan = btn.querySelector('.analysis-btn-text');
          const isHidden = panel.classList.contains('hidden');
          panel.classList.toggle('hidden', !isHidden);
          textSpan.textContent = isHidden ? '收起答案解析' : '查看答案解析';
        });
      });

      container.querySelectorAll('.btn-screenshot-question').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.question-card');
          const qNum = btn.getAttribute('data-number') || '';
          if (card) captureQuestionCard(card, btn, qNum);
        });
      });

      container.querySelectorAll('.btn-open-similar').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const qNum = btn.getAttribute('data-number') || '';
          openSimilarQuestionsModal(id, qNum);
        });
      });

      container.querySelectorAll('.btn-toggle-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          toggleCartItem(id);
        });
      });

      container.querySelectorAll('[data-jump-graph-node]').forEach(btn => {
        btn.addEventListener('click', () => {
          const nid = btn.getAttribute('data-jump-graph-node');
          if (typeof window.jumpToKnowledgeGraphNode === 'function') {
            window.jumpToKnowledgeGraphNode(nid);
          }
        });
      });

      container.querySelectorAll('[data-jump-proc], [data-proc-col]').forEach(btn => {
        btn.addEventListener('click', () => {
          const pid = btn.getAttribute('data-jump-proc') || btn.getAttribute('data-proc-col');
          if (pid && typeof window.jumpToProceduralCollection === 'function') {
            window.jumpToProceduralCollection(pid);
          }
        });
      });

      renderMath();
    }

    // Open Similar Questions Modal ("举一反三")
    let currentSimilarOriginId = null;
    let currentSimilarOriginNumber = '';

    function openSimilarQuestionsModal(questionId, qNumber = '') {
      const modal = document.getElementById('similarQuestionsModal');
      if (!modal) return;
      const originQ = QUESTION_BANK.find(q => q.id === questionId);
      if (!originQ) return;

      currentSimilarOriginId = questionId;
      currentSimilarOriginNumber = qNumber || originQ.number || '';

      const similarItems = typeof window.getSimilarQuestionsFor === 'function'
        ? window.getSimilarQuestionsFor(questionId, 3)
        : [];
      if (similarItems.length === 0) {
        if (typeof showToast === 'function') showToast('当前题目暂无使用完全相同程序性知识的变式题', 'info');
        return;
      }

      const cogProfile = typeof window.getQuestionCognitiveProfile === 'function'
        ? window.getQuestionCognitiveProfile(questionId)
        : null;

      // Update Header
      const titleEl = document.getElementById('similarModalTitle');
      const badgeEl = document.getElementById('similarModalCountBadge');
      if (titleEl) {
        titleEl.textContent = `举一反三 · 第 ${currentSimilarOriginNumber} 题相似变式`;
      }
      if (badgeEl) {
        badgeEl.textContent = `${similarItems.length} 题`;
      }

      // Render Origin Cognitive Banner (精简考法摘要，去掉长段说明)
      const bannerEl = document.getElementById('similarModalOriginBanner');
      if (bannerEl && cogProfile) {
        bannerEl.innerHTML = `
          <span class="font-medium text-slate-500">原题考法：</span>
          <span class="px-2.5 py-0.5 rounded-full bg-white text-[#0F766E] font-semibold border border-[#CCFBF1]">${cogProfile.condTitle}</span>
          <span class="text-slate-300">|</span>
          <span class="text-slate-600 truncate">${cogProfile.procChain}</span>
        `;
      }

      // Render Similar Question Cards
      renderSimilarModalCards(similarItems, originQ);

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      renderMath();
    }

    function renderSimilarModalCards(similarItems, originQ) {
      const bodyEl = document.getElementById('similarModalBody');
      if (!bodyEl) return;

      bodyEl.innerHTML = similarItems.map((item, idx) => {
        const sq = item.question;
        const isSelected = state.selectedIds.has(sq.id);
        const diffColor = getDifficultyBadgeClass(sq.difficulty);

        let optionsHtml = '';
        if (sq.options && sq.options.length > 0) {
          optionsHtml = `
            <div class="q-options-grid grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2.5 text-sm text-slate-800">
              ${sq.options.map(opt => `<div class="answer-option ${getOptionLayoutClass(opt)}">${formatMathHtml(opt)}</div>`).join('')}
            </div>
          `;
        }

        const imgHtml = sq.image ? `<div class="my-1.5"><img src="${sq.image}" class="max-h-40 max-w-xs h-auto rounded object-contain"></div>` : '';

        return `
          <div class="similar-question-card ${isSelected ? 'is-selected' : ''}" data-id="${sq.id}">
            <!-- Card Top Meta -->
            <div class="q-card-header flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="q-meta-num">变式 ${idx + 1}</span>
                <span class="q-meta-chapter">相似度 ${item.similarityPercent}%</span>
                <span class="q-meta-type">${sq.typeName}</span>
                <span class="q-meta-type">${getChapterDisplayLabel(sq.chapter)}</span>
                <span class="${diffColor}">${sq.difficulty}</span>
              </div>
              <div class="q-meta-kp">
                <span>考点：</span><span class="q-meta-kp-text">${getDisplayKnowledgeName(sq)}</span>
              </div>
            </div>

            <!-- Question Stem & Options -->
            <div class="q-card-body text-sm leading-relaxed text-slate-900">
              <div class="q-stem-content">${formatMathHtml(sq.stem)}</div>
              ${imgHtml}
              ${optionsHtml}
            </div>

            <!-- Analysis Accordion -->
            <div id="sim_analysis_${sq.id}" class="hidden q-analysis-panel text-sm space-y-1.5">
             ${typeof window.renderQuestionAnalysisBoxHtml === 'function' ? window.renderQuestionAnalysisBoxHtml(sq) : renderFallbackAnalysisBoxHtml(sq)}
            </div>

            <!-- Card Footer Actions -->
            <div data-html2canvas-ignore="true" class="q-card-footer flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-1 sm:gap-2 text-xs">
                <button class="btn-sim-toggle-analysis q-aux-btn" data-id="${sq.id}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  <span class="sim-analysis-btn-text">查看答案解析</span>
                </button>
                <button class="btn-sim-screenshot q-aux-btn" data-id="${sq.id}" data-label="变式 ${idx + 1}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
                  <span class="screenshot-btn-text">截图复制</span>
                </button>
              </div>

              <div class="flex items-center space-x-2">
                <button class="btn-sim-toggle-cart ${isSelected ? 'is-remove' : ''} px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5" data-id="${sq.id}">
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
          </div>
        `;
      }).join('');

      // Attach listeners inside modal
      bodyEl.querySelectorAll('.btn-sim-toggle-analysis').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const panel = document.getElementById(`sim_analysis_${id}`);
          const textSpan = btn.querySelector('.sim-analysis-btn-text');
          if (!panel) return;
          const isHidden = panel.classList.contains('hidden');
          panel.classList.toggle('hidden', !isHidden);
          if (textSpan) textSpan.textContent = isHidden ? '收起答案解析' : '查看答案解析';
        });
      });

      bodyEl.querySelectorAll('.btn-sim-screenshot').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.similar-question-card');
          const label = btn.getAttribute('data-label') || '变式题';
          if (!card) return;
          const hasAnalysis = !card.querySelector('.q-analysis-panel')?.classList.contains('hidden');
          captureElementScreenshot(card, btn, {
            label,
            fileName: `${label.replace(/\s+/g, '')}截图${hasAnalysis ? '_含解析' : ''}.png`,
            modeLabel: hasAnalysis ? '（含答案解析）' : ''
          });
        });
      });

      bodyEl.querySelectorAll('.btn-sim-toggle-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          toggleCartItem(id);
          // Re-render modal buttons to reflect updated cart state
          if (currentSimilarOriginId) {
            const originQ = QUESTION_BANK.find(q => q.id === currentSimilarOriginId);
            const similarItems = window.getSimilarQuestionsFor(currentSimilarOriginId, 3);
            if (originQ && similarItems.length) {
              renderSimilarModalCards(similarItems, originQ);
              renderMath();
            }
          }
        });
      });
    }

    function closeSimilarQuestionsModal() {
      const modal = document.getElementById('similarQuestionsModal');
      if (!modal) return;
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      currentSimilarOriginId = null;
    }

    // Bind global modal close events once
    (function initSimilarModalEvents() {
      document.addEventListener('click', (e) => {
        const modal = document.getElementById('similarQuestionsModal');
        if (!modal || modal.classList.contains('hidden')) return;
        if (e.target === modal || e.target.closest('#closeSimilarModalBtn') || e.target.closest('#closeSimilarModalFooterBtn')) {
          closeSimilarQuestionsModal();
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const modal = document.getElementById('similarQuestionsModal');
          if (modal && !modal.classList.contains('hidden')) {
            closeSimilarQuestionsModal();
          }
        }
      });
    })();

    // Inline any local images on the card on demand (direct fetch/canvas first, Base64 chunks only as fallback)
    async function inlineCardImagesWithBase64(rootEl) {
      if (!rootEl) return;
      const imgs = Array.from(rootEl.querySelectorAll('img'));
      if (imgs.length === 0) return;

      const isFileProtocol = typeof location !== 'undefined' && location.protocol === 'file:';
      window.IMAGE_BASE64_MAP = window.IMAGE_BASE64_MAP || {};

      function lookupBase64Map(rawSrc) {
        const map = window.IMAGE_BASE64_MAP || {};
        const cleanKey = rawSrc.replace(/^\.?\//, '').split('?')[0].split('#')[0];
        const baseName = cleanKey.split('/').pop();
        return map[cleanKey] || map[rawSrc] || (baseName ? map[`assets/images/${baseName}`] : null) || null;
      }

      const unresolvedImgs = [];

      await Promise.all(imgs.map(async (img) => {
        const rawSrc = img.getAttribute('src') || '';
        if (!rawSrc || rawSrc.startsWith('data:')) return;

        // 1. Wait for original image element to finish loading if not yet complete
        if (!img.complete) {
          await new Promise(res => {
            img.addEventListener('load', res, { once: true });
            img.addEventListener('error', res, { once: true });
            setTimeout(res, 3000);
          });
        }

        let dataUrl = lookupBase64Map(rawSrc);

        // 2. Direct fetch of this single image first (avoids 95MB Base64 chunks on http/https)
        if (!dataUrl && !isFileProtocol) {
          try {
            const resp = await fetch(img.src || rawSrc);
            if (resp.ok) {
              const blob = await resp.blob();
              dataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = () => resolve(null);
                reader.readAsDataURL(blob);
              });
              if (dataUrl) {
                const cleanKey = rawSrc.replace(/^\.?\//, '').split('?')[0].split('#')[0];
                window.IMAGE_BASE64_MAP[cleanKey] = dataUrl;
              }
            }
          } catch (_) {}
        }

        // 3. Fallback: draw loaded <img> onto an offscreen canvas to extract data URL
        if (!dataUrl && img.complete && img.naturalWidth > 0) {
          try {
            const c = document.createElement('canvas');
            c.width = img.naturalWidth;
            c.height = img.naturalHeight;
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0);
            dataUrl = c.toDataURL('image/png');
          } catch (_) {}
        }

        if (!dataUrl) {
          unresolvedImgs.push({ img, rawSrc });
          return;
        }

        if (img.getAttribute('src') !== dataUrl) {
          await new Promise(res => {
            img.onload = res;
            img.onerror = res;
            img.setAttribute('src', dataUrl);
            setTimeout(res, 1500);
          });
        }
        if (typeof img.decode === 'function') {
          try { await img.decode(); } catch (_) {}
        }
      }));

      // 4. Only load Base64 chunks if some images still could not be inlined (e.g. file:// protocol)
      if (unresolvedImgs.length > 0) {
        if (typeof window.ensureImageBase64Loaded !== 'function' && typeof window.ensureDocxExportLoaded === 'function') {
          try { await window.ensureDocxExportLoaded(); } catch (_) {}
        }
        if (typeof window.ensureImageBase64Loaded === 'function') {
          try { await window.ensureImageBase64Loaded(); } catch (_) {}
        }
        await Promise.all(unresolvedImgs.map(async ({ img, rawSrc }) => {
          const dataUrl = lookupBase64Map(rawSrc);
          if (dataUrl && img.getAttribute('src') !== dataUrl) {
            await new Promise(res => {
              img.onload = res;
              img.onerror = res;
              img.setAttribute('src', dataUrl);
              setTimeout(res, 1500);
            });
          }
          if (typeof img.decode === 'function') {
            try { await img.decode(); } catch (_) {}
          }
        }));
      }
    }

    const SCREENSHOT_IGNORE_SELECTOR = '[data-html2canvas-ignore], .katex-mathml, .q-card-footer, .proc-teacher-pen, .proc-stream-cursor';

    // Create an offscreen clean clone with ignored elements removed BEFORE measuring or capturing,
    // so the screenshot wraps tightly around actual content with no bottom blank space
    function createCleanScreenshotClone(targetEl, options = {}) {
      const origRect = targetEl.getBoundingClientRect();
      const width = Math.ceil(origRect.width);
      const extraSelectors = Array.isArray(options.extraIgnoreSelectors) ? options.extraIgnoreSelectors : [];
      const ignoreSelector = [SCREENSHOT_IGNORE_SELECTOR, ...extraSelectors].filter(Boolean).join(', ');

      const host = document.createElement('div');
      host.setAttribute('data-screenshot-clone-host', 'true');
      host.style.cssText = [
        'position: fixed',
        'left: -99999px',
        'top: 0',
        `width: ${width}px`,
        'margin: 0',
        'padding: 0',
        'pointer-events: none',
        'z-index: -1',
        'background: transparent'
      ].join(';');

      const clone = targetEl.cloneNode(true);
      clone.querySelectorAll(ignoreSelector).forEach(el => el.remove());

      clone.style.margin = '0';
      clone.style.width = `${width}px`;
      clone.style.height = 'auto';
      clone.style.minHeight = '0';
      clone.style.maxHeight = 'none';
      clone.style.overflow = 'visible';
      clone.style.transform = 'none';
      clone.style.boxShadow = 'none';
      clone.style.boxSizing = 'border-box';
      if (options.padding) {
        clone.style.padding = options.padding;
      }
      if (options.backgroundColor) {
        clone.style.backgroundColor = options.backgroundColor;
      }

      host.appendChild(clone);
      document.body.appendChild(host);

      const measuredHeight = Math.ceil(clone.getBoundingClientRect().height);

      return {
        host,
        clone,
        width,
        height: measuredHeight > 0 ? measuredHeight : Math.ceil(origRect.height),
        ignoreSelector,
        cleanup: () => {
          if (host.parentNode) host.parentNode.removeChild(host);
        }
      };
    }

    // Zero-dependency native SVG foreignObject -> Canvas renderer (fallback if CDN libraries fail)
    async function renderCardViaNativeSvg(targetEl, scale = 2.5, options = {}) {
      await inlineCardImagesWithBase64(targetEl);
      const bgColor = options.backgroundColor || '#ffffff';
      const { clone, width, height, cleanup } = createCleanScreenshotClone(targetEl, options);

      try {
        const cloneRect = clone.getBoundingClientRect();

        // Explicitly lock rendered dimensions on cloned images so SVG foreignObject never collapses them
        const cloneImgs = Array.from(clone.querySelectorAll('img'));
        cloneImgs.forEach((cImg) => {
          const r = cImg.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) {
            cImg.setAttribute('width', Math.round(r.width));
            cImg.setAttribute('height', Math.round(r.height));
            cImg.style.width = Math.round(r.width) + 'px';
            cImg.style.height = Math.round(r.height) + 'px';
          }
        });

        // Pre-compute visible image overlays relative to the trimmed clone before removing host
        const visibleCloneImgs = cloneImgs.map((cImg) => {
          const r = cImg.getBoundingClientRect();
          const style = window.getComputedStyle(cImg);
          const visible = r.width > 0 && r.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && !cImg.closest('.hidden, [data-html2canvas-ignore], .q-card-footer');
          if (!visible) return null;
          return {
            src: cImg.getAttribute('src') || cImg.src,
            x: r.left - cloneRect.left,
            y: r.top - cloneRect.top,
            width: r.width,
            height: r.height
          };
        }).filter(Boolean);

        clone.style.height = height + 'px';
        if (!clone.style.backgroundColor) clone.style.backgroundColor = bgColor;
        clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

        // Collect all active document stylesheets to embed into SVG
        let cssRulesText = '';
        try {
          for (const sheet of document.styleSheets) {
            try {
              const rules = sheet.cssRules || sheet.rules;
              if (rules) {
                for (const rule of rules) {
                  cssRulesText += rule.cssText + '\n';
                }
              }
            } catch (_) {}
          }
        } catch (_) {}

        // Extra CSS patch for fraction lines and SVG alignment
        cssRulesText += `
          * { box-sizing: border-box; }
          .katex .frac-line {
            display: block !important;
            min-height: 1.5px !important;
            height: 1.5px !important;
            background-color: currentColor !important;
            border: none !important;
            margin: 2px 0 !important;
          }
          .katex .sqrt > .sqrt-line {
            display: block !important;
            min-height: 1.5px !important;
            height: 1.5px !important;
            background-color: currentColor !important;
            border: none !important;
          }
        `;

        const serialized = new XMLSerializer().serializeToString(clone);
        const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><style type="text/css"><![CDATA[${cssRulesText}]]></style></defs><foreignObject width="100%" height="100%">${serialized}</foreignObject></svg>`;
        const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);

        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = svgDataUrl;
        });

        const canvas = document.createElement('canvas');
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        ctx.restore();

        // Explicitly composite all visible card images onto the 2D canvas as well
        for (const item of visibleCloneImgs) {
          if (!item.src) continue;
          await new Promise(resolve => {
            const im = new Image();
            im.onload = () => {
              try {
                const x = Math.round(item.x * scale);
                const y = Math.round(item.y * scale);
                const w = Math.round(item.width * scale);
                const h = Math.round(item.height * scale);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(x, y, w, h);
                ctx.drawImage(im, x, y, w, h);
              } catch (_) {}
              resolve();
            };
            im.onerror = () => resolve();
            im.src = item.src;
          });
        }

        return await new Promise((resolve, reject) => {
          canvas.toBlob(b => b ? resolve(b) : reject(new Error('Native SVG canvas toBlob failed')), 'image/png');
        });
      } finally {
        cleanup();
      }
    }

    // Load backup screenshot CDN on demand only when primary CDN failed
    function loadFallbackScriptOnce(globalName, fallbackUrl) {
      if (!fallbackUrl || window[globalName]) return Promise.resolve();
      if (window._fallbackScriptPromises && window._fallbackScriptPromises[globalName]) {
        return window._fallbackScriptPromises[globalName];
      }
      window._fallbackScriptPromises = window._fallbackScriptPromises || {};
      window._fallbackScriptPromises[globalName] = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = fallbackUrl;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        setTimeout(resolve, 6000);
        document.head.appendChild(script);
      });
      return window._fallbackScriptPromises[globalName];
    }

    async function ensureScreenshotEnginesReady() {
      const checks = [
        { name: 'htmlToImage', selector: 'script[data-fallback-lib="htmlToImage"]' },
        { name: 'html2canvas', selector: 'script[data-fallback-lib="html2canvas"]' }
      ];
      await Promise.all(checks.map(item => {
        if (window[item.name]) return Promise.resolve();
        const tag = document.querySelector(item.selector);
        const fallbackUrl = tag ? tag.getAttribute('data-fallback-src') : '';
        return loadFallbackScriptOnce(item.name, fallbackUrl);
      }));
    }

    // Generate PNG Blob of any card/panel across 3 fallback engines (html-to-image primary)
    async function generateQuestionCardBlob(targetEl, options = {}) {
      await ensureScreenshotEnginesReady();
      // Ensure all images in the element are inlined as base64 data URIs and fully decoded before capture
      await inlineCardImagesWithBase64(targetEl);

      // Give the browser a layout frame to settle image dimensions if any src was updated
      await new Promise(res => requestAnimationFrame(() => requestAnimationFrame(res)));

      // Pre-warm fonts to avoid KaTeX font blanking
      if (document.fonts && document.fonts.ready) {
        try { await document.fonts.ready; } catch (_) {}
      }

      const bgColor = options.backgroundColor || '#ffffff';
      const extraSelectors = Array.isArray(options.extraIgnoreSelectors) ? options.extraIgnoreSelectors : [];
      const filterFn = (node) => {
        if (!node) return true;
        if (node.hasAttribute && (node.hasAttribute('data-html2canvas-ignore') || node.getAttribute('data-html2canvas-ignore') === 'true')) return false;
        if (node.classList && (node.classList.contains('katex-mathml') || node.classList.contains('q-card-footer') || node.classList.contains('proc-teacher-pen') || node.classList.contains('proc-stream-cursor'))) return false;
        if (extraSelectors.length > 0 && typeof node.matches === 'function') {
          for (const sel of extraSelectors) {
            try { if (node.matches(sel)) return false; } catch (_) {}
          }
        }
        return true;
      };

      // Build an offscreen clean clone with footer & ignored elements already stripped so measured height has zero bottom blank space
      const { clone, width, height: initialHeight, ignoreSelector, cleanup } = createCleanScreenshotClone(targetEl, options);

      try {
        await new Promise(res => requestAnimationFrame(res));
        const cloneRect = clone.getBoundingClientRect();
        const targetHeight = Math.ceil(cloneRect.height) || initialHeight;

        // Cap scale slightly for very tall full-paper captures to avoid exceeding browser canvas pixel limits
        const baseDpr = Math.max(window.devicePixelRatio || 2, 2.5);
        const dpr = targetHeight > 3200 ? Math.min(baseDpr, 1.8) : baseDpr;

        // Pre-compute rendered rects & base64 data URLs of all visible images inside the trimmed clone
        // so we can composite them directly onto the 2D canvas if SVG foreignObject omits external/base64 <img> tags (WebKit/Safari quirk)
        const imageOverlays = Array.from(clone.querySelectorAll('img')).map(img => {
          const r = img.getBoundingClientRect();
          const style = window.getComputedStyle(img);
          const visible = r.width > 0 && r.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && !img.closest('.hidden, [data-html2canvas-ignore], .q-card-footer');
          if (!visible) return null;
          return {
            src: img.getAttribute('src') || img.src,
            x: r.left - cloneRect.left,
            y: r.top - cloneRect.top,
            width: r.width,
            height: r.height
          };
        }).filter(Boolean);

        // Helper: explicitly stamp all card images onto a rendered canvas and return a PNG Blob
        async function compositeImagesAndToBlob(baseCanvas) {
          if (imageOverlays.length > 0) {
            const ctx = baseCanvas.getContext('2d');
            await Promise.all(imageOverlays.map(item => new Promise(resolve => {
              if (!item.src) return resolve();
              const im = new Image();
              im.onload = () => {
                try {
                  // Clear white behind the image rect first so transparent PNGs look crisp and never double-blend
                  ctx.fillStyle = '#ffffff';
                  ctx.fillRect(
                    Math.round(item.x * dpr),
                    Math.round(item.y * dpr),
                    Math.round(item.width * dpr),
                    Math.round(item.height * dpr)
                  );
                  ctx.drawImage(
                    im,
                    Math.round(item.x * dpr),
                    Math.round(item.y * dpr),
                    Math.round(item.width * dpr),
                    Math.round(item.height * dpr)
                  );
                } catch (_) {}
                resolve();
              };
              im.onerror = () => resolve();
              im.src = item.src;
            })));
          }
          return await new Promise((resolve, reject) => {
            baseCanvas.toBlob(b => b ? resolve(b) : reject(new Error('Canvas toBlob returned null')), 'image/png');
          });
        }

        // Engine 1: html-to-image -> toCanvas on trimmed clone + direct 2D image compositing (100% pixel-perfect KaTeX + guaranteed images on Safari/Chrome)
        if (typeof window.htmlToImage === 'object' && typeof window.htmlToImage.toCanvas === 'function') {
          const htiStyle = {
            margin: '0',
            width: `${width}px`,
            height: `${targetHeight}px`,
            minHeight: '0',
            transform: 'none',
            boxShadow: 'none'
          };
          if (options.padding) htiStyle.padding = options.padding;
          try {
            // Warm up font cache first to prevent blank glyphs on KaTeX WebFonts
            try {
              await window.htmlToImage.toCanvas(clone, {
                backgroundColor: bgColor,
                width,
                height: targetHeight,
                pixelRatio: 1,
                cacheBust: false,
                filter: filterFn
              });
            } catch (_) {}

            const canvas = await window.htmlToImage.toCanvas(clone, {
              backgroundColor: bgColor,
              width,
              height: targetHeight,
              pixelRatio: dpr,
              cacheBust: false,
              filter: filterFn,
              style: htiStyle
            });
            if (canvas) {
              const blob = await compositeImagesAndToBlob(canvas);
              if (blob) return blob;
            }
          } catch (err1) {
            console.warn('Engine 1 (html-to-image with fonts) failed, trying skipFonts:', err1);
            try {
              const canvas = await window.htmlToImage.toCanvas(clone, {
                backgroundColor: bgColor,
                width,
                height: targetHeight,
                pixelRatio: dpr,
                skipFonts: true,
                cacheBust: false,
                filter: filterFn,
                style: htiStyle
              });
              if (canvas) {
                const blob = await compositeImagesAndToBlob(canvas);
                if (blob) return blob;
              }
            } catch (err1b) {
              console.warn('Engine 1b (html-to-image skipFonts) failed, falling back to Engine 2:', err1b);
            }
          }
        }

        // Engine 2: html2canvas with explicit trimmed height, KaTeX CSS repair + direct 2D image compositing
        if (typeof window.html2canvas === 'function') {
          try {
            const canvas = await window.html2canvas(targetEl, {
              scale: dpr,
              width,
              height: targetHeight,
              backgroundColor: bgColor,
              useCORS: true,
              allowTaint: true,
              logging: false,
              imageTimeout: 8000,
              onclone: (clonedDoc, clonedTarget) => {
                clonedDoc.querySelectorAll('[data-screenshot-clone-host]').forEach(el => el.remove());
                if (clonedTarget) {
                  clonedTarget.querySelectorAll(ignoreSelector).forEach(el => el.remove());
                  clonedTarget.style.height = 'auto';
                  clonedTarget.style.minHeight = '0';
                  clonedTarget.style.maxHeight = 'none';
                  clonedTarget.style.boxShadow = 'none';
                  if (options.padding) clonedTarget.style.padding = options.padding;
                }
                const fixStyle = clonedDoc.createElement('style');
                fixStyle.textContent = `
                  img { display: inline-block !important; }
                  /* KaTeX horizontal line and radical fixes for html2canvas */
                  .katex .frac-line {
                    display: block !important;
                    min-height: 1.5px !important;
                    height: 1.5px !important;
                    background-color: currentColor !important;
                    border: none !important;
                    margin: 2px 0 !important;
                  }
                  .katex .sqrt > .sqrt-line {
                    display: block !important;
                    min-height: 1.5px !important;
                    height: 1.5px !important;
                    background-color: currentColor !important;
                    border: none !important;
                  }
                  .katex .sqrt > .sqrt-sign {
                    display: inline-block !important;
                    vertical-align: baseline !important;
                  }
                  .katex .sqrt > .sqrt-sign svg {
                    display: inline-block !important;
                    vertical-align: baseline !important;
                  }
                  .katex .vlist-t, .katex .vlist-r {
                    display: inline-table !important;
                    vertical-align: middle !important;
                  }
                `;
                clonedDoc.head.appendChild(fixStyle);
              },
              ignoreElements: (el) => {
                if (!el || !el.classList) return false;
                return el.classList.contains('katex-mathml') || el.hasAttribute('data-html2canvas-ignore') || el.classList.contains('q-card-footer') || el.classList.contains('proc-teacher-pen') || el.classList.contains('proc-stream-cursor');
              }
            });
            if (canvas) {
              const blob = await compositeImagesAndToBlob(canvas);
              if (blob) return blob;
            }
          } catch (err2) {
            console.warn('Engine 2 (html2canvas) failed, falling back to Engine 3:', err2);
          }
        }
      } finally {
        cleanup();
      }

      // Engine 3: Zero-dependency native SVG foreignObject renderer
      return await renderCardViaNativeSvg(targetEl, Math.max(window.devicePixelRatio || 2, 2.5), options);
    }

    // Show interactive screenshot preview modal with 1-click clipboard copy
    function showScreenshotPreviewModal(blob, titleText, fileName) {
      const old = document.getElementById('screenshotPreviewModal');
      if (old) old.remove();

      const safeTitle = titleText || '高清截图预览';
      const safeFileName = fileName || '题典网截图.png';
      const url = URL.createObjectURL(blob);
      const modal = document.createElement('div');
      modal.id = 'screenshotPreviewModal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 no-print';
      modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
          <div class="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div class="text-sm font-bold text-slate-800">${safeTitle}</div>
            <button id="closeScreenshotModalBtn" class="text-slate-400 hover:text-slate-600 text-lg leading-none px-2 py-1">✕</button>
          </div>
          <div class="p-5 max-h-[70vh] overflow-y-auto bg-slate-100/60 flex justify-center">
            <img src="${url}" alt="${safeTitle}" class="max-w-full h-auto rounded-lg shadow-sm border border-slate-200 bg-white">
          </div>
          <div class="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>提示：点击右侧【复制到剪贴板】或在图片上右键选择【复制图片】</span>
            <div class="flex items-center gap-2">
              <button id="copyModalImageBtn" class="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-semibold text-slate-700 transition flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                <span>复制到剪贴板</span>
              </button>
              <a href="${url}" download="${safeFileName}" class="btn-primary px-3.5 py-1.5 rounded-lg font-semibold transition">下载保存图片</a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const close = () => {
        modal.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      };
      modal.querySelector('#closeScreenshotModalBtn')?.addEventListener('click', close);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
      });

      // Direct user gesture clipboard copy inside modal
      modal.querySelector('#copyModalImageBtn')?.addEventListener('click', async () => {
        const copyBtn = modal.querySelector('#copyModalImageBtn');
        try {
          if (navigator.clipboard && typeof window.ClipboardItem !== 'undefined') {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            showToast('已复制高清截图到剪贴板！可直接粘贴至微信或文档', 'success');
            if (copyBtn) copyBtn.innerHTML = '<span>✓ 已复制</span>';
          } else {
            showToast('当前浏览器限制剪贴板，请直接右键图片选择“复制图片”', 'info');
          }
        } catch (clipErr) {
          console.warn('Modal manual copy failed:', clipErr);
          showToast('复制受限，请在图片上右键选择【复制图片】', 'info');
        }
      });
    }

    // Universal screenshot-and-copy helper for any question card, whiteboard, practice card, drawer, or exam paper
    async function captureElementScreenshot(targetEl, btnEl, options = {}) {
      if (!targetEl) return;
      if (btnEl && btnEl.disabled) return;
      const textSpan = btnEl ? btnEl.querySelector('.screenshot-btn-text') : null;
      const origText = textSpan ? textSpan.textContent : '截图复制';
      if (btnEl) btnEl.disabled = true;
      if (textSpan) textSpan.textContent = '截图中...';

      const label = options.label || '内容';
      const modeLabel = options.modeLabel || '';
      const fileName = options.fileName || `${label.replace(/[\\/:*?"<>|\s]+/g, '')}截图.png`;

      try {
        // Start generating the Blob promise immediately (preserves user gesture in Safari/WebKit)
        const blobPromise = generateQuestionCardBlob(targetEl, options);

        let copied = false;

        // 1. Try writing Promise<Blob> synchronously while user gesture is active (Safari & modern Chromium)
        if (navigator.clipboard && typeof window.ClipboardItem !== 'undefined') {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blobPromise })
            ]);
            copied = true;
          } catch (syncClipErr) {
            console.warn('Sync Promise ClipboardItem write failed, trying resolved Blob write:', syncClipErr);
          }
        }

        const blob = await blobPromise;

        // 2. If sync Promise write didn't succeed, try writing the resolved Blob directly
        if (!copied && navigator.clipboard && typeof window.ClipboardItem !== 'undefined') {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            copied = true;
          } catch (resolvedClipErr) {
            console.warn('Resolved Blob ClipboardItem write failed:', resolvedClipErr);
          }
        }

        if (copied) {
          showToast(`${label}高清截图${modeLabel}已成功复制到剪贴板！可直接粘贴`, 'success');
        } else {
          // If browser blocks clipboard API (e.g. strict file:// restriction), open preview modal for 1-click right-click copy & download
          showScreenshotPreviewModal(blob, `${label}高清截图预览`, fileName);
          showToast(`已生成${label}高清截图，右键图片即可复制或下载！`, 'info');
        }
      } catch (err) {
        console.error('Screenshot capture failed:', err);
        showToast(`截图失败：${err && err.message ? err.message : '请刷新页面后重试'}`, 'warn');
      } finally {
        if (btnEl) btnEl.disabled = false;
        if (textSpan) textSpan.textContent = origText;
      }
    }
    window.captureElementScreenshot = captureElementScreenshot;

    // Capture Question Card as PNG and Copy to Clipboard (used by Question Bank, Knowledge Graph & Procedural Views)
    async function captureQuestionCard(cardEl, btnEl, qNumber) {
      if (!cardEl) return;
      const analysisEl = cardEl.querySelector('.q-analysis-panel, [id^="analysis_"], [id^="graph_analysis_"], [id^="sim_analysis_"], [id^="proc_q_analysis_"]');
      const hasAnalysis = Boolean(analysisEl && !analysisEl.classList.contains('hidden'));
      const numText = String(qNumber || '').trim();
      const label = numText ? `第 ${numText} 题` : '题目';
      return captureElementScreenshot(cardEl, btnEl, {
        label,
        modeLabel: hasAnalysis ? '（含答案解析）' : '',
        fileName: `${label.replace(/\s+/g, '')}截图${hasAnalysis ? '_含解析' : ''}.png`
      });
    }
    window.captureQuestionCard = captureQuestionCard;

    // Toggle Cart Item
    function toggleCartItem(id) {
      if (state.selectedIds.has(id)) {
        state.selectedIds.delete(id);
        showToast('已从试题篮移出 1 题', 'warn');
      } else {
        state.selectedIds.add(id);
        showToast('已成功加入试题篮', 'success');
      }
      updateStats();
      renderQuestionList();
      renderBasketDrawer();
    }

    // Update Basket & Header Badges
    function updateStats() {
      saveBasketToStorage();
      const count = state.selectedIds.size;
      document.getElementById('basketBadge').textContent = count;
      document.getElementById('drawerCount').textContent = count;
      document.getElementById('drawerSummaryCount').textContent = count;

    }

    // Render Drawer Content
    function renderBasketDrawer() {
      const container = document.getElementById('basketItemsList');
      if (state.selectedIds.size === 0) {
        container.innerHTML = `
          <div class="py-12 text-center text-slate-400 text-xs">
            <svg class="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            试题篮为空，赶快从左侧添加题目吧
          </div>
        `;
        return;
      }

      const selectedQuestions = getSelectedQuestions();
      const isAddedOrder = state.paperOrderMode === 'added';
      container.innerHTML = selectedQuestions.map((q, index) => {
        const sameTypeQuestions = selectedQuestions.filter(item => item.type === q.type);
        const typePosition = sameTypeQuestions.findIndex(item => item.id === q.id);
        const isFirst = isAddedOrder ? index === 0 : typePosition === 0;
        const isLast = isAddedOrder ? index === selectedQuestions.length - 1 : typePosition === sameTypeQuestions.length - 1;
        const chapShort = String(q.chapter || "").replace(/^(?:六年级|小学六年级|初一|初二|初三|高一|高二|高三)?\s*(?:上册|下册)?\s*[0-9.]*\s*/, "").slice(0, 6) || q.chapter;
        const chapBadgeCls = getGradeSemesterTagClass(q.chapter);
        return `
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center space-x-1.5">
              <span class="px-1.5 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] text-[11px] font-bold">#${index + 1}</span>
              <span class="px-1.5 py-0.5 rounded text-[11px] font-medium ${chapBadgeCls}">${chapShort}</span>
              <span class="font-bold text-slate-800">第 ${q.number} 题 (${q.typeName})</span>
            </div>
            <div class="flex items-center gap-1">
              <button class="drawer-move-btn text-slate-500 hover:text-teal-700 p-1 disabled:opacity-30" data-id="${q.id}" data-offset="-1" aria-label="上移题目" title="上移" ${isFirst ? 'disabled' : ''}>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m-7 7 7-7 7 7"></path></svg>
              </button>
              <button class="drawer-move-btn text-slate-500 hover:text-teal-700 p-1 disabled:opacity-30" data-id="${q.id}" data-offset="1" aria-label="下移题目" title="下移" ${isLast ? 'disabled' : ''}>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m7-7-7 7-7-7"></path></svg>
              </button>
              <button class="drawer-remove-btn text-slate-400 hover:text-red-600 p-1 ml-1" data-id="${q.id}" title="移出">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
          <div class="text-xs text-slate-600 line-clamp-2">${stripHtmlPreserveMath(q.stem)}</div>
        </div>
      `;
      }).join('');

      // Reorder questions in the basket; the Set order is also the stored paper order.
      container.querySelectorAll('.drawer-move-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          moveSelectedQuestion(btn.getAttribute('data-id'), Number(btn.getAttribute('data-offset')));
        });
      });

      // Remove button
      container.querySelectorAll('.drawer-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          toggleCartItem(id);
        });
      });
      renderMath();
    }

    // Render Paper View
    function renderPaper() {
      const container = document.getElementById('paperContentContainer');
      const isTeacher = state.paperViewMode === 'teacher';
      const isDouble = state.isDoubleColumn;
      const isAddedOrder = state.paperOrderMode === 'added';

      const selected = getSelectedQuestions();
      if (selected.length === 0) {
        container.innerHTML = `
          <div class="py-16 text-center text-slate-400">
            试题篮中暂无题目，请先在题库中选择题目。
          </div>
        `;
        return;
      }

      let html = '';

      if (isAddedOrder) {
        html += `
          <div class="question-part">
            <div class="${isDouble ? 'grid grid-cols-2 gap-x-8 gap-y-4' : 'space-y-5'}">
              ${selected.map((q, index) => {
                const idx = index + 1;
                const imgHtml = q.image ? `<div class="my-1.5"><img src="${q.image}" class="max-h-32 max-w-[200px] h-auto object-contain"></div>` : '';
                const optsHtml = (q.type === 'choice' && q.options && q.options.length > 0) ? `
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-3 text-sm">
                    ${q.options.map(opt => `<div class="answer-option ${getOptionLayoutClass(opt)}">${formatMathHtml(opt)}</div>`).join('')}
                  </div>
                ` : '';

                let bottomHtml = '';
                if (q.type === 'calc') {
                  bottomHtml = isTeacher ? `
                    <div class="mt-3 p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-sans space-y-1.5">
                      <div><b>【参考答案与解析】</b></div>
                      <div class="leading-relaxed pl-2 border-l-2 border-[#0F766E]">${formatMathHtml(getPreviewExplanation(q) || q.answer || '')}</div>
                    </div>
                  ` : `
                    <!-- Student Answer Blank Box -->
                    <div class="answer-space-resizable border border-dashed border-slate-200 rounded mt-3 p-2 pr-4 text-xs text-slate-300 flex items-end justify-start" data-question-id="${q.id}" title="拖动答题框底边调整高度" style="height:${state.answerSpaceHeights[q.id] || 112}px">
                      请在此空白区域内书写解题过程与答案
                    </div>
                  `;
                } else if (isTeacher) {
                  bottomHtml = `
                    <div class="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-sans space-y-1">
                      <div><b>【答案】</b><span class="text-[#0F766E] font-bold">${formatMathHtml(q.answer)}</span></div>
                      ${renderPreviewExplanationLine(q)}
                    </div>
                  `;
                }

                return `
                  <div class="question-item group relative text-sm leading-relaxed mb-4" data-paper-q-idx="${idx}">
                    <button type="button" data-html2canvas-ignore="true" class="btn-paper-q-screenshot no-print opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity absolute -top-1 right-0 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/95 border border-slate-200 text-[11px] font-sans font-medium text-slate-600 hover:text-[#0F766E] hover:border-[#99F6E4] hover:bg-[#F0FDFA] shadow-sm" data-paper-q-idx="${idx}" title="单独截图复制第 ${idx} 题">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
                      <span class="screenshot-btn-text">截图复制</span>
                    </button>
                    <div>
                      <span class="font-bold mr-1">${idx}.</span><span>${formatMathHtml(q.stem)}</span>
                      ${imgHtml}
                      ${optsHtml}
                      ${bottomHtml}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;

        container.innerHTML = html;
        bindPaperQuestionScreenshots(container, isTeacher);
        renderMath();
        return;
      }

      // Group by Part
      const choices = selected.filter(q => q.type === 'choice');
      const blanks = selected.filter(q => q.type === 'blank');
      const judges = selected.filter(q => q.type === 'judge');
      const calcs = selected.filter(q => q.type === 'calc');

      const renderPaperQScreenshotBtn = (idx) => `
        <button type="button" data-html2canvas-ignore="true" class="btn-paper-q-screenshot no-print opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity absolute -top-1 right-0 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/95 border border-slate-200 text-[11px] font-sans font-medium text-slate-600 hover:text-[#0F766E] hover:border-[#99F6E4] hover:bg-[#F0FDFA] shadow-sm" data-paper-q-idx="${idx}" title="单独截图复制第 ${idx} 题">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
          <span class="screenshot-btn-text">截图复制</span>
        </button>
      `;

      // Part 1: Choice
      if (choices.length > 0) {
        let questionIndex = 1;
        html += `
          <div class="question-part">
            <h3 class="font-bold text-base border-b border-slate-900 pb-1 mb-4 flex items-center justify-between">
              <span>一、选择题（本大题共 ${choices.length} 小题，在每小题列出的选项中，选出符合题目的一项）</span>
            </h3>
            <div class="${isDouble ? 'grid grid-cols-2 gap-x-8 gap-y-4' : 'space-y-4'}">
              ${choices.map(q => {
                const idx = questionIndex++;
                const imgHtml = q.image ? `<div class="my-1.5"><img src="${q.image}" class="max-h-32 max-w-[200px] h-auto object-contain"></div>` : '';
                const optsHtml = q.options ? `
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-3 text-sm">
                    ${q.options.map(opt => `<div class="answer-option ${getOptionLayoutClass(opt)}">${formatMathHtml(opt)}</div>`).join('')}
                  </div>
                ` : '';
                const teacherHtml = isTeacher ? `
                  <div class="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-sans space-y-1">
                    <div><b>【答案】</b><span class="text-[#0F766E] font-bold">${formatMathHtml(q.answer)}</span></div>
                    ${renderPreviewExplanationLine(q)}
                  </div>
                ` : '';

                return `
                  <div class="question-item group relative text-sm leading-relaxed mb-4" data-paper-q-idx="${idx}">
                    ${renderPaperQScreenshotBtn(idx)}
                    <div>
                      <span class="font-bold mr-1">${idx}.</span><span>${formatMathHtml(q.stem)}</span>
                      ${imgHtml}
                      ${optsHtml}
                      ${teacherHtml}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }

      // Part 2: Blank continues after the selected choice questions.
      if (blanks.length > 0) {
        let questionIndex = choices.length + 1;
        html += `
          <div class="question-part mt-6 pt-4 border-t border-slate-300">
            <h3 class="font-bold text-base border-b border-slate-900 pb-1 mb-4 flex items-center justify-between">
              <span>二、填空题（本大题共 ${blanks.length} 小题）</span>
            </h3>
            <div class="${isDouble ? 'grid grid-cols-2 gap-x-8 gap-y-4' : 'space-y-4'}">
              ${blanks.map(q => {
                const idx = questionIndex++;
                const teacherHtml = isTeacher ? `
                  <div class="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-sans space-y-1">
                    <div><b>【答案】</b><span class="text-[#0F766E] font-bold">${formatMathHtml(q.answer)}</span></div>
                    ${renderPreviewExplanationLine(q)}
                  </div>
                ` : '';

                return `
                  <div class="question-item group relative text-sm leading-relaxed mb-4" data-paper-q-idx="${idx}">
                    ${renderPaperQScreenshotBtn(idx)}
                    <div>
                      <span class="font-bold mr-1">${idx}.</span><span>${formatMathHtml(q.stem)}</span>
                      ${teacherHtml}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }

      // Part 3: Judge
      if (judges.length > 0) {
        let questionIndex = choices.length + blanks.length + 1;
        html += `
          <div class="question-part mt-6 pt-4 border-t border-slate-300">
            <h3 class="font-bold text-base border-b border-slate-900 pb-1 mb-4 flex items-center justify-between">
              <span>三、判断题（本大题共 ${judges.length} 小题，请判断正误）</span>
            </h3>
            <div class="${isDouble ? 'grid grid-cols-2 gap-x-8 gap-y-4' : 'space-y-4'}">
              ${judges.map(q => {
                const idx = questionIndex++;
                const teacherHtml = isTeacher ? `
                  <div class="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-sans space-y-1">
                    <div><b>【答案】</b><span class="text-[#0F766E] font-bold">${formatMathHtml(q.answer)}</span></div>
                    ${renderPreviewExplanationLine(q)}
                  </div>
                ` : '';

                return `
                  <div class="question-item group relative text-sm leading-relaxed mb-4" data-paper-q-idx="${idx}">
                    ${renderPaperQScreenshotBtn(idx)}
                    <div>
                      <span class="font-bold mr-1">${idx}.</span><span>${formatMathHtml(q.stem)}</span>
                      ${teacherHtml}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }

      // Part 4: Calc / Answer
if (calcs.length > 0) {
  let questionIndex = choices.length + blanks.length + judges.length + 1;
        html += `
          <div class="question-part mt-6 pt-4 border-t border-slate-300">
            <h3 class="font-bold text-base border-b border-slate-900 pb-1 mb-4 flex items-center justify-between">
              <span>四、解答题（本大题共 ${calcs.length} 小题。解答应写出文字说明、演算步骤或推证过程）</span>
            </h3>
            <div class="space-y-6">
              ${calcs.map(q => {
                const idx = questionIndex++;
                const teacherHtml = isTeacher ? `
                  <div class="mt-3 p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-sans space-y-1.5">
                    <div><b>【参考答案与解析】</b></div>
                    <div class="leading-relaxed pl-2 border-l-2 border-[#0F766E]">${formatMathHtml(getPreviewExplanation(q) || q.answer || '')}</div>
                  </div>
                ` : `
                  <!-- Student Answer Blank Box -->
                  <div class="answer-space-resizable border border-dashed border-slate-200 rounded mt-3 p-2 pr-4 text-xs text-slate-300 flex items-end justify-start" data-question-id="${q.id}" title="拖动答题框底边调整高度" style="height:${state.answerSpaceHeights[q.id] || 112}px">
                    请在此空白区域内书写解题过程与答案
                  </div>
                `;

                return `
                  <div class="question-item group relative text-sm leading-relaxed" data-paper-q-idx="${idx}">
                    ${renderPaperQScreenshotBtn(idx)}
                    <div>
                      <span class="font-bold mr-1">${idx}.</span><span>${formatMathHtml(q.stem)}</span>
                      ${teacherHtml}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }

      container.innerHTML = html;
      bindPaperQuestionScreenshots(container, isTeacher);
      renderMath();
    }

    function bindPaperQuestionScreenshots(container, isTeacher) {
      if (!container) return;
      container.querySelectorAll('.btn-paper-q-screenshot').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const itemEl = btn.closest('.question-item');
          const idx = btn.getAttribute('data-paper-q-idx') || '';
          if (!itemEl) return;
          captureElementScreenshot(itemEl, btn, {
            label: idx ? `试卷第 ${idx} 题` : '试卷题目',
            modeLabel: isTeacher ? '（含答案解析）' : '',
            fileName: `试卷第${idx || ''}题截图${isTeacher ? '_含解析' : ''}.png`,
            padding: '14px 18px',
            backgroundColor: '#ffffff'
          });
        });
      });
    }
