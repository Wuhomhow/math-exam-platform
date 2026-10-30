    // Switch Main Views (题库 / 试卷预览)
    function switchView(viewName) {
      if (viewName !== 'paper') viewName = 'bank';
      state.currentView = viewName;
      try {
        localStorage.setItem(LAST_VIEW_STORAGE_KEY, viewName);
      } catch (error) {
        // The current view still switches normally if browser storage is unavailable.
      }
      document.getElementById('viewQuestionBank').classList.toggle('hidden', viewName !== 'bank');
      document.getElementById('viewPaperPreview').classList.toggle('hidden', viewName !== 'paper');

      const bankBtn = document.getElementById('navBankBtn');
      const paperBtn = document.getElementById('navPaperBtn');
      bankBtn.className = viewName === 'bank'
        ? 'nav-tab px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-white text-blue-700 shadow-sm'
        : 'nav-tab px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-white transition-all';
      paperBtn.className = viewName === 'paper'
        ? 'nav-tab px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-white text-blue-700 shadow-sm'
        : 'nav-tab px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-white transition-all';

      const mobileBankBtn = document.getElementById('mobileNavBank');
      const mobilePaperBtn = document.getElementById('mobileNavPaper');
      mobileBankBtn.className = viewName === 'bank'
        ? 'flex-1 py-2 rounded-lg text-center text-sm font-semibold text-blue-700 bg-white shadow-sm transition-all'
        : 'flex-1 py-2 rounded-lg text-center text-sm font-medium text-slate-600 transition-all';
      mobilePaperBtn.className = viewName === 'paper'
        ? 'flex-1 py-2 rounded-lg text-center text-sm font-semibold text-blue-700 bg-white shadow-sm transition-all'
        : 'flex-1 py-2 rounded-lg text-center text-sm font-medium text-slate-600 transition-all';

      saveUiPreferences();
      if (viewName === 'paper') renderPaper();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(renderMath, 50);
    }
    // Render Question Bank Cards
    function renderQuestionList() {
      const container = document.getElementById('questionList');
      const emptyState = document.getElementById('emptyQuestionState');

      // Dynamically update type & difficulty filter counts based on selected chapter
      const allQuestionCountEl = document.getElementById('allQuestionCount');
      if (allQuestionCountEl) allQuestionCountEl.textContent = `${QUESTION_BANK.length} 题`;
      const chapPool = QUESTION_BANK.filter(q => {
        if (state.chapterFilter === 'all') return true;
        if (state.chapterFilter === '2.3') return q.chapter.startsWith('2.3');
        return q.chapter === state.chapterFilter;
      });
      const typeMap = { all: chapPool.length, choice: 0, blank: 0, calc: 0 };
      const diffMap = { all: chapPool.length, '容易': 0, '中等': 0, '较难': 0 };
      chapPool.forEach(q => {
        if (typeMap[q.type] !== undefined) typeMap[q.type]++;
        if (diffMap[q.difficulty] !== undefined) diffMap[q.difficulty]++;
      });
      const typeLabels = { all: '全部', choice: '单选题', blank: '填空题', calc: '解答题' };
      document.querySelectorAll('.filter-type-btn').forEach(b => {
        const t = b.getAttribute('data-type');
        if (typeLabels[t]) b.textContent = `${typeLabels[t]} (${typeMap[t]})`;
      });
      const diffLabels = { all: '全部', '容易': '容易', '中等': '中等', '较难': '较难' };
      document.querySelectorAll('.filter-diff-btn').forEach(b => {
        const d = b.getAttribute('data-diff');
        if (diffLabels[d]) b.textContent = `${diffLabels[d]} (${diffMap[d]})`;
      });

      function getCurrentFilteredQuestions() {
        return QUESTION_BANK.filter(q => {
          if (state.chapterFilter !== 'all') {
            if (state.chapterFilter === '2.3') {
              if (!q.chapter.startsWith('2.3')) return false;
            } else if (q.chapter !== state.chapterFilter) {
              return false;
            }
          }
          if (state.typeFilter !== 'all' && q.type !== state.typeFilter) return false;
          if (state.diffFilter !== 'all' && q.difficulty !== state.diffFilter) return false;
          if (state.searchKeyword) {
            const kw = state.searchKeyword.toLowerCase();
            const matchStem = q.stem.toLowerCase().includes(kw);
            const matchKp = q.knowledge.toLowerCase().includes(kw);
            const matchAnswer = q.answer.toLowerCase().includes(kw);
            const matchChap = q.chapter.toLowerCase().includes(kw);
            if (!matchStem && !matchKp && !matchAnswer && !matchChap) return false;
          }
          return true;
        });
      }
      const filtered = getCurrentFilteredQuestions();
      const pagEl = document.getElementById('questionPagination');

      if (filtered.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        if (pagEl) pagEl.classList.add('hidden');
        return;
      }
      emptyState.classList.add('hidden');

      // Pagination calculations
      const totalCount = filtered.length;
      const pageSize = state.pageSize || 15;
      const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
      if (state.currentPage > totalPages) state.currentPage = totalPages;
      if (state.currentPage < 1) state.currentPage = 1;
      const startIndex = (state.currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, totalCount);
      const pageQuestions = filtered.slice(startIndex, endIndex);

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
            pageBtnsHtml += `<button class="page-nav-btn px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700" data-page="1">1</button>`;
            if (startPage > 2) pageBtnsHtml += `<span class="px-1 text-slate-400">...</span>`;
          }

          for (let p = startPage; p <= endPage; p++) {
            const isActive = p === state.currentPage;
            pageBtnsHtml += `<button class="page-nav-btn px-2.5 py-1 rounded font-medium transition ${
              isActive ? 'bg-blue-600 text-white shadow-xs' : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
            }" data-page="${p}">${p}</button>`;
          }

          if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageBtnsHtml += `<span class="px-1 text-slate-400">...</span>`;
            pageBtnsHtml += `<button class="page-nav-btn px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700" data-page="${totalPages}">${totalPages}</button>`;
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

      container.innerHTML = pageQuestions.map(q => {
        const isSelected = state.selectedIds.has(q.id);
        const diffColor = q.difficulty === '容易' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
                          q.difficulty === '中等' ? 'text-amber-600 bg-amber-50 border-amber-200' :
                          'text-rose-600 bg-rose-50 border-rose-200';
        
        let optionsHtml = '';
        if (q.options && q.options.length > 0) {
          optionsHtml = `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-3 pt-2 text-sm text-slate-800">
              ${q.options.map(opt => `<div class="answer-option ${getOptionLayoutClass(opt)} p-2 bg-slate-50 rounded border border-slate-100 hover:border-blue-200">${formatMathHtml(opt)}</div>`).join('')}
            </div>
          `;
        }

        const imgHtml = q.image ? `<div class="my-3"><img src="${q.image}" class="max-w-md h-auto border border-slate-200 rounded p-1 bg-white"></div>` : '';

        return `
          <div class="bg-white rounded-xl border ${isSelected ? 'border-blue-300 ring-1 ring-blue-100 shadow-sm' : 'border-slate-200'} p-5 transition-all hover:shadow-md question-card" data-id="${q.id}">
            <!-- Header Row -->
            <div class="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-bold text-slate-900 text-sm">第 ${q.number} 题</span>
                <span class="text-xs px-2 py-0.5 rounded font-medium ${getGradeSemesterTagClass(q.chapter)}">${q.chapter}</span>
                <span class="text-xs px-2 py-0.5 rounded font-medium bg-blue-100 text-blue-700">${q.typeName}</span>
                <span class="text-xs px-2 py-0.5 rounded font-medium border ${diffColor}">难度：${q.difficulty}</span>
              </div>
              <div class="text-xs text-slate-400">
                考点：<span class="text-slate-600 font-medium">${q.knowledge}</span>
              </div>
            </div>

            <!-- Stem -->
            <div class="pt-3 text-sm leading-relaxed text-slate-900">
              ${formatMathHtml(q.stem)}
              ${imgHtml}
              ${optionsHtml}
            </div>

            <!-- Analysis Accordion Drawer -->
            <div id="analysis_${q.id}" class="hidden mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div class="flex items-center space-x-2 font-bold text-slate-900">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>参考答案：</span>
                <span class="text-blue-700 font-mono text-sm">${formatMathHtml(q.answer)}</span>
              </div>
              <div class="text-slate-600"><b class="text-slate-800">【分析】</b>${formatMathHtml(q.analysis)}</div>
              <div class="text-slate-700 pt-1 border-t border-slate-200/60 leading-relaxed"><b class="text-slate-800">【详解】</b>${formatMathHtml(q.detail)}</div>
            </div>

            <!-- Bottom Actions -->
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div class="flex items-center space-x-3 text-xs">
                <button class="btn-toggle-analysis text-slate-500 hover:text-blue-600 flex items-center space-x-1" data-id="${q.id}">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  <span class="analysis-btn-text">查看答案解析</span>
                </button>
              </div>

              <!-- Cart Toggle Button -->
              <button class="btn-toggle-cart px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                isSelected ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              }" data-id="${q.id}">
                ${isSelected ? `
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                  <span>移出试题篮</span>
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

      container.querySelectorAll('.btn-toggle-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          toggleCartItem(id);
        });
      });

      renderMath();
    }

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
      container.innerHTML = selectedQuestions.map((q, index) => {
        const sameTypeQuestions = selectedQuestions.filter(item => item.type === q.type);
        const typePosition = sameTypeQuestions.findIndex(item => item.id === q.id);
        const chapShort = String(q.chapter || "").replace(/^[0-9.]+\s*/, "").slice(0, 6) || q.chapter;
        const chapBadgeCls = getGradeSemesterTagClass(q.chapter);
        return `
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center space-x-1.5">
              <span class="px-1.5 py-0.5 rounded text-[11px] font-medium ${chapBadgeCls}">${chapShort}</span>
              <span class="font-bold text-slate-800">第 ${q.number} 题 (${q.typeName})</span>
            </div>
            <div class="flex items-center gap-1">
              <button class="drawer-move-btn text-slate-500 hover:text-teal-700 p-1 disabled:opacity-30" data-id="${q.id}" data-offset="-1" aria-label="上移题目" title="上移" ${typePosition === 0 ? 'disabled' : ''}>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m-7 7 7-7 7 7"></path></svg>
              </button>
              <button class="drawer-move-btn text-slate-500 hover:text-teal-700 p-1 disabled:opacity-30" data-id="${q.id}" data-offset="1" aria-label="下移题目" title="下移" ${typePosition === sameTypeQuestions.length - 1 ? 'disabled' : ''}>
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

      const selected = getSelectedQuestions();
      if (selected.length === 0) {
        container.innerHTML = `
          <div class="py-16 text-center text-slate-400">
            试题篮中暂无题目，请先在题库中选择题目。
          </div>
        `;
        return;
      }

      // Group by Part
      const choices = selected.filter(q => q.type === 'choice');
      const blanks = selected.filter(q => q.type === 'blank');
      const calcs = selected.filter(q => q.type === 'calc');

      let html = '';

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
                const imgHtml = q.image ? `<div class="my-2"><img src="${q.image}" class="max-w-xs h-auto"></div>` : '';
                const optsHtml = q.options ? `
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-3 text-sm">
                    ${q.options.map(opt => `<div class="answer-option ${getOptionLayoutClass(opt)}">${formatMathHtml(opt)}</div>`).join('')}
                  </div>
                ` : '';
                const teacherHtml = isTeacher ? `
                  <div class="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-sans space-y-1">
                    <div><b>【答案】</b><span class="text-blue-700 font-bold">${formatMathHtml(q.answer)}</span></div>
                    <div><b>【解析】</b>${formatMathHtml(q.detail)}</div>
                  </div>
                ` : '';

                return `
                  <div class="question-item text-sm leading-relaxed mb-4">
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
                    <div><b>【答案】</b><span class="text-blue-700 font-bold">${formatMathHtml(q.answer)}</span></div>
                    <div><b>【解析】</b>${formatMathHtml(q.detail)}</div>
                  </div>
                ` : '';

                return `
                  <div class="question-item text-sm leading-relaxed mb-4">
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

      // Part 3: Calc / Answer
if (calcs.length > 0) {
  let questionIndex = choices.length + blanks.length + 1;
        html += `
          <div class="question-part mt-6 pt-4 border-t border-slate-300">
            <h3 class="font-bold text-base border-b border-slate-900 pb-1 mb-4 flex items-center justify-between">
              <span>三、解答题（本大题共 ${calcs.length} 小题。解答应写出文字说明、演算步骤或推证过程）</span>
            </h3>
            <div class="space-y-6">
              ${calcs.map(q => {
                const idx = questionIndex++;
                const teacherHtml = isTeacher ? `
                  <div class="mt-3 p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-sans space-y-1.5">
                    <div><b>【参考答案与解析】</b></div>
                    <div class="leading-relaxed pl-2 border-l-2 border-blue-400">${formatMathHtml(q.detail)}</div>
                  </div>
                ` : `
                  <!-- Student Answer Blank Box -->
                  <div class="answer-space-resizable border border-dashed border-slate-200 rounded mt-3 p-2 pr-4 text-xs text-slate-300 flex items-end justify-start" data-question-id="${q.id}" title="拖动答题框底边调整高度" style="height:${state.answerSpaceHeights[q.id] || 112}px">
                    请在此空白区域内书写解题过程与答案
                  </div>
                `;

                return `
                  <div class="question-item text-sm leading-relaxed">
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
      renderMath();
    }
