// 题典网「程序性知识」独立模块视图控制器 (procedural-view.js)
// 包含三个层级：
// 1. 程序性知识首页（统一浏览入口、搜索、年级/学科筛选）
// 2. 章节下的程序性知识列表（按年级/章节分类浏览集合卡片，不堆砌过多操作细节）
// 3. 单项程序性知识详情页（基本信息、步骤清单式核心操作、适用条件/前置知识/易错边界、典型例题步骤映射、关联题目集合与前后知识/图谱跳转）
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

  const ProceduralState = {
    subView: 'home',          // 'home' | 'detail'
    selectedProcedureId: 'P01',
    searchKeyword: '',
    gradeFilter: 'all',       // 'all' | '九年级'
    subjectFilter: 'all',     // 'all' | '数学'
    chapterFilter: 'all'      // 'all' | '25.3 直接开平方法' | '25.4 配方法'
  };

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
          ProceduralState.gradeFilter = e.target.value;
          ProceduralState.subView = 'home';
          this.render();
        });
      }

      const subjectSelect = document.getElementById('procFilterSubject');
      if (subjectSelect && !subjectSelect.dataset.bound) {
        subjectSelect.dataset.bound = '1';
        subjectSelect.addEventListener('change', (e) => {
          ProceduralState.subjectFilter = e.target.value;
          ProceduralState.subView = 'home';
          this.render();
        });
      }

      const resetBtn = document.getElementById('btnProcResetFilters');
      if (resetBtn && !resetBtn.dataset.bound) {
        resetBtn.dataset.bound = '1';
        resetBtn.addEventListener('click', () => {
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
      ProceduralState.subView = 'home';
      if (chapter !== undefined) {
        ProceduralState.chapterFilter = chapter;
      }
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    openDetail(procedureId) {
      const proc = window.ProceduralKnowledgeService?.getProcedureById(procedureId);
      if (!proc) return;
      ProceduralState.selectedProcedureId = procedureId;
      ProceduralState.subView = 'detail';
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Jump to the existing Question Bank detail view for a specific question and auto-expand its full answer/analysis
    openQuestionInBankDetail(questionId, chapter) {
      if (typeof switchView === 'function') {
        switchView('bank');
      }
      state.chapterFilter = chapter || 'all';
      state.typeFilter = 'all';
      state.diffFilter = 'all';
      state.searchKeyword = '';
      state.currentPage = 1;

      // Locate which page the question is on within its chapter so it is immediately visible
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
        detailContainer.classList.add('hidden');
        homeContainer.classList.remove('hidden');
        this.renderHomeView();
      }

      if (typeof renderMath === 'function') {
        renderMath();
      }
    },

    // =========================================================================
    // 层级 1 & 2：程序性知识首页 & 年级/章节下的程序性知识集合列表
    // =========================================================================
    renderHomeView() {
      const chapterNavEl = document.getElementById('procChapterSidebar');
      const listContainer = document.getElementById('procCollectionListContainer');
      const summaryCountEl = document.getElementById('procSummaryCountBadge');
      if (!chapterNavEl || !listContainer) return;

      const allCols = (window.ProceduralKnowledgeService?.getAllCollections() || []).filter(
        c => c.procedure.status === 'published' || c.procedure.status === 'reviewed'
      );
      const filteredCols = this.getFilteredCollections();

      if (summaryCountEl) {
        const totalQs = filteredCols.reduce((s, c) => s + c.totalQuestions, 0);
        summaryCountEl.textContent = `${filteredCols.length} 个集合 · ${totalQs} 道关联题`;
      }

      // Build Grade -> Chapter Group -> Section hierarchy from confirmed data
      const chapterCounts = new Map();
      allCols.forEach(c => {
        const ch = c.procedure.chapter;
        chapterCounts.set(ch, (chapterCounts.get(ch) || 0) + 1);
      });

      const isAllChap = ProceduralState.chapterFilter === 'all';
      let sidebarHtml = `
        <button type="button" class="proc-chap-btn chapter-tree-btn ${isAllChap ? 'is-active' : ''} w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold mb-2.5" data-proc-chap="all">
          <span>全部程序性知识集合</span>
          <span class="text-xs font-bold">${allCols.length}</span>
        </button>
        <div class="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <div class="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
            <span>九年级 · 第二十五章 一元二次方程</span>
            <span class="text-[11px] text-slate-500 font-semibold">${allCols.length} 集</span>
          </div>
          <div class="p-2 space-y-1">
            ${Array.from(chapterCounts.entries()).map(([chapName, cnt]) => {
              const active = ProceduralState.chapterFilter === chapName;
              return `
                <button type="button" class="proc-chap-btn nav-topic-button chapter-tree-btn ${active ? 'is-active' : ''}" data-proc-chap="${escapeHtml(chapName)}">
                  <span class="nav-topic-label">${escapeHtml(chapName)}</span>
                  <span class="nav-topic-count">${cnt}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
      chapterNavEl.innerHTML = sidebarHtml;

      chapterNavEl.querySelectorAll('.proc-chap-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          ProceduralState.chapterFilter = btn.getAttribute('data-proc-chap') || 'all';
          this.renderHomeView();
          if (typeof renderMath === 'function') renderMath();
        });
      });

      // Render Collection Cards (clean, scannable, without dumping detailed steps on the home page)
      if (filteredCols.length === 0) {
        listContainer.innerHTML = `
          <div class="ui-card py-14 text-center text-slate-400 text-xs">
            未找到匹配的程序性知识集合，请尝试调整搜索词或筛选条件。
          </div>
        `;
        return;
      }

      listContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${filteredCols.map(col => {
            const p = col.procedure;
            return `
              <div class="proc-collection-card ui-card p-5 hover:border-[#0F766E] cursor-pointer transition flex flex-col justify-between group" data-open-proc="${escapeHtml(p.id)}">
                <div class="space-y-2.5">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span class="px-2 py-0.5 rounded bg-[#0F766E] text-white font-bold">${escapeHtml(p.id)}</span>
                      <span class="px-2 py-0.5 rounded bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1] font-medium">${escapeHtml(p.grade)}</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${escapeHtml(p.subject)}</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600">${escapeHtml(p.chapter)}</span>
                    </div>
                    <span class="px-2.5 py-0.5 rounded-full bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] text-xs font-bold shrink-0">
                      ${col.totalQuestions} 题
                    </span>
                  </div>

                  <h3 class="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition">
                    ${escapeHtml(p.name)}
                  </h3>

                  <p class="text-xs text-slate-600 leading-relaxed">
                    ${renderMathText(p.description)}
                  </p>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-slate-400">包含 ${(p.steps || []).length} 个标准操作步骤 · 已审核通过</span>
                  <span class="text-[#0F766E] font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>查看步骤与题目集合</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      listContainer.querySelectorAll('[data-open-proc]').forEach(card => {
        card.addEventListener('click', () => {
          const pid = card.getAttribute('data-open-proc');
          this.openDetail(pid);
        });
      });
    },

    // =========================================================================
    // 层级 3：单项程序性知识详情页
    // 4.1 页面基本信息 | 4.2 步骤清单式核心操作 | 4.3 适用条件/前置知识/易错边界
    // 4.4 典型例题 | 4.5 关联题目集合 | 4.6 前后知识关联与题目图谱跳转
    // =========================================================================
    renderDetailView(container) {
      const col = window.ProceduralKnowledgeService?.getQuestionCollectionByProcedure(ProceduralState.selectedProcedureId);
      if (!col) {
        ProceduralState.subView = 'home';
        this.render();
        return;
      }

      const p = col.procedure;
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

      // 4.2 Core Operations Step List HTML
      const stepsHtml = (p.steps || []).map((st, idx) => {
        const stepNum = st.step || (idx + 1);
        return `
          <div class="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3.5">
            <div class="w-8 h-8 rounded-lg bg-[#0F766E] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              ${stepNum}
            </div>
            <div class="flex-1 min-w-0 space-y-1.5">
              <div class="text-sm font-bold text-slate-900">
                步骤 ${stepNum}：${escapeHtml(st.title)}
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

      // 4.3 Applicability, Prerequisites & Pitfalls HTML
      const applicabilityHtml = (p.applicability || []).map(item => `
        <li class="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
          <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0"></span>
          <span>${renderMathText(item)}</span>
        </li>
      `).join('');

      const prereqListHtml = (p.prerequisites || []).map(pr => {
        if (pr.id) {
          return `
            <li class="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
              <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0"></span>
              <div>
                <span>依赖程序性知识：</span>
                <button type="button" class="text-[#0F766E] font-semibold hover:underline" data-nav-proc="${escapeHtml(pr.id)}">
                  ${escapeHtml(pr.id)} · ${escapeHtml(pr.name)}
                </button>
              </div>
            </li>
          `;
        }
        return `
          <li class="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
            <span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
            <span>${renderMathText(pr.name)}</span>
          </li>
        `;
      }).join('');

      const pitfallsHtml = (p.pitfalls || []).map(pf => `
        <li class="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
          <span>${renderMathText(pf)}</span>
        </li>
      `).join('');

      // 4.4 Typical Example Question HTML (only rendered when valid exampleQuestionId exists in QUESTION_BANK)
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
            <div class="font-bold text-[#115E59]">${escapeHtml(m.title)}</div>
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
                在题库详情中查看原题 &rarr;
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

      // 4.5 Associated Questions List HTML (ordered strictly by sortOrder)
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

      container.innerHTML = `
        <!-- Breadcrumb & Back Navigation -->
        <div class="ui-card px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex flex-wrap items-center gap-1.5 text-slate-500">
            <button type="button" id="btnProcBackHome" class="text-[#0F766E] font-semibold hover:underline">程序性知识首页</button>
            <span>/</span>
            <button type="button" id="btnProcBackChap" class="hover:text-[#0F766E] hover:underline" data-chap="${escapeHtml(p.chapter)}">${escapeHtml(p.grade)} · ${escapeHtml(p.chapter)}</button>
            <span>/</span>
            <span class="font-bold text-slate-800">${escapeHtml(p.name)}</span>
          </div>
          <button type="button" id="btnProcReturnBtn" class="btn-secondary px-3 py-1 rounded-lg text-xs font-medium">
            &larr; 返回程序性知识列表
          </button>
        </div>

        <!-- 4.1 Basic Information Header -->
        <section class="ui-card p-5 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex flex-wrap items-center gap-2 text-xs">
              <span class="px-2.5 py-0.5 rounded bg-[#0F766E] text-white font-bold">${escapeHtml(p.id)}</span>
              <span class="px-2.5 py-0.5 rounded bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1] font-semibold">${escapeHtml(p.grade)}</span>
              <span class="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${escapeHtml(p.subject)}</span>
              <span class="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${escapeHtml(p.chapterGroup)} · ${escapeHtml(p.chapter)}</span>
            </div>
            <span class="px-3 py-1 rounded-full bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] text-xs font-bold">
              关联题目：${col.totalQuestions} 题
            </span>
          </div>

          <h2 class="text-lg sm:text-xl font-bold text-slate-900">${escapeHtml(p.name)}</h2>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${renderMathText(p.description)}</p>
        </section>

        <!-- 4.2 Core Operations: Step-by-Step Checklist (Visual Focus) -->
        <section class="ui-card p-5 space-y-3.5 border-[#99F6E4] bg-gradient-to-b from-[#F0FDFA]/50 to-white">
          <div class="flex items-center justify-between pb-2 border-b border-teal-100">
            <div>
              <h3 class="text-base font-bold text-slate-900">核心操作（步骤清单）</h3>
              <p class="text-xs text-slate-500 mt-0.5">按实际解题执行顺序排列的可复用操作步骤</p>
            </div>
            <span class="text-xs font-semibold text-[#0F766E] bg-white px-2.5 py-1 rounded-lg border border-[#CCFBF1]">共 ${(p.steps || []).length} 步</span>
          </div>
          <div class="space-y-3">
            ${stepsHtml}
          </div>
        </section>

        <!-- 4.3 Applicability, Prerequisites & Pitfalls -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="ui-card p-4 space-y-2.5">
            <h4 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#0F766E]"></span>
              <span>适用条件</span>
            </h4>
            <ul class="space-y-2">
              ${applicabilityHtml}
            </ul>
          </div>

          <div class="ui-card p-4 space-y-2.5">
            <h4 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-slate-500"></span>
              <span>前置知识</span>
            </h4>
            <ul class="space-y-2">
              ${prereqListHtml}
            </ul>
          </div>

          <div class="ui-card p-4 space-y-2.5">
            <h4 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>易错边界</span>
            </h4>
            <ul class="space-y-2">
              ${pitfallsHtml}
            </ul>
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
                  ${escapeHtml(pr.id)} · ${escapeHtml(pr.name)}
                </button>
              `).join('') : '<span class="text-slate-400">无直接前置程序性知识</span>'}
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-slate-500 font-semibold">后续关联程序性知识：</span>
              ${subseqProcs.length > 0 ? subseqProcs.map(sp => `
                <button type="button" class="px-2.5 py-1 rounded-lg bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] font-semibold hover:bg-[#CCFBF1]/60 transition" data-nav-proc="${escapeHtml(sp.id)}">
                  ${escapeHtml(sp.id)} · ${escapeHtml(sp.name)}
                </button>
              `).join('') : relatedProcs.length > 0 ? relatedProcs.map(rp => `
                <button type="button" class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-semibold hover:border-[#0F766E] hover:text-[#0F766E] transition" data-nav-proc="${escapeHtml(rp.id)}">
                  同源操作对比：${escapeHtml(rp.id)} · ${escapeHtml(rp.name)}
                </button>
              `).join('') : '<span class="text-slate-400">暂无后续直接关联集合</span>'}
            </div>
          </div>

          <button type="button" id="btnProcGoKnowledgeGraph" class="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5" data-graph-node="${escapeHtml(p.graphNodeId || 'kp_g9_qe_solve')}">
            <span>🕸️</span>
            <span>查看题目图谱</span>
          </button>
        </section>

        <!-- 4.5 Associated Question Collection -->
        <section class="space-y-3">
          <div class="ui-card p-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 class="text-sm sm:text-base font-bold text-slate-900">
                关联题目集合（共 ${col.totalQuestions} 题 · 按内部学习顺序 1 → ${col.totalQuestions} 排列）
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

      // Bind detail view events
      container.querySelector('#btnProcBackHome')?.addEventListener('click', () => this.openHome('all'));
      container.querySelector('#btnProcReturnBtn')?.addEventListener('click', () => this.openHome());
      container.querySelector('#btnProcBackChap')?.addEventListener('click', (e) => {
        const ch = e.currentTarget.getAttribute('data-chap');
        this.openHome(ch || 'all');
      });

      container.querySelectorAll('[data-nav-proc]').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-nav-proc');
          if (targetId) this.openDetail(targetId);
        });
      });

      container.querySelector('#btnProcGoKnowledgeGraph')?.addEventListener('click', (e) => {
        const nodeId = e.currentTarget.getAttribute('data-graph-node') || 'kp_g9_qe_solve';
        if (typeof window.jumpToKnowledgeGraphNode === 'function') {
          window.jumpToKnowledgeGraphNode(nodeId);
        }
      });

      container.querySelector('#btnProcAddAllToBasket')?.addEventListener('click', () => {
        col.items.forEach(it => state.selectedIds.add(it.question.id));
        if (typeof updateStats === 'function') updateStats();
        if (typeof renderBasketDrawer === 'function') renderBasketDrawer();
        this.renderDetailView(container);
        if (typeof renderMath === 'function') renderMath();
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
        });
      });

      container.querySelectorAll('.btn-proc-toggle-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-id');
          if (typeof toggleCartItem === 'function') toggleCartItem(qid);
          this.renderDetailView(container);
          if (typeof renderMath === 'function') renderMath();
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
