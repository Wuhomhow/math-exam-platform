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
      if (bankBtn && paperBtn) {
        bankBtn.classList.toggle('is-active', viewName === 'bank');
        paperBtn.classList.toggle('is-active', viewName === 'paper');
      }

      const mobileBankBtn = document.getElementById('mobileNavBank');
      const mobilePaperBtn = document.getElementById('mobileNavPaper');
      if (mobileBankBtn && mobilePaperBtn) {
        mobileBankBtn.classList.toggle('is-active', viewName === 'bank');
        mobilePaperBtn.classList.toggle('is-active', viewName === 'paper');
      }

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
        if (state.chapterFilter.startsWith('custom:')) {
          const paper = typeof getCustomPaperById === 'function' ? getCustomPaperById(state.chapterFilter.slice(7)) : null;
          return paper ? paper.questionIds.includes(q.id) : false;
        }
        return q.chapter === state.chapterFilter;
      });
      const normalizeQuestionType = (q) => {
        if (!q) return 'calc';
        if (q.type === 'choice' || q.type === 'blank' || q.type === 'judge' || q.type === 'calc') return q.type;
        if (q.type === 'answer' || q.type === 'solution') return 'calc';
        if (q.typeName === '单选题') return 'choice';
        if (q.typeName === '填空题') return 'blank';
        if (q.typeName === '判断题') return 'judge';
        return 'calc';
      };
      const typeMap = { all: chapPool.length, choice: 0, blank: 0, judge: 0, calc: 0 };
      const diffMap = { all: chapPool.length, '容易': 0, '较易': 0, '中等': 0, '较难': 0 };
      chapPool.forEach(q => {
        const qt = normalizeQuestionType(q);
        q.type = qt;
        if (typeMap[qt] !== undefined) typeMap[qt]++;
        const d = q.difficulty === '适中' ? '中等' : q.difficulty;
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

      function getCurrentFilteredQuestions() {
        if (state.chapterFilter.startsWith('custom:')) {
          const paper = typeof getCustomPaperById === 'function' ? getCustomPaperById(state.chapterFilter.slice(7)) : null;
          if (paper) {
            const byId = new Map(QUESTION_BANK.map(q => [q.id, q]));
            return paper.questionIds.map(id => byId.get(id)).filter(q => {
              if (!q) return false;
              if (state.typeFilter !== 'all' && normalizeQuestionType(q) !== state.typeFilter) return false;
              if (state.diffFilter !== 'all' && (q.difficulty === '适中' ? '中等' : q.difficulty) !== state.diffFilter) return false;
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
        }
        return QUESTION_BANK.filter(q => {
          if (state.chapterFilter !== 'all') {
            if (state.chapterFilter === '2.3') {
              if (!q.chapter.startsWith('2.3')) return false;
            } else if (q.chapter !== state.chapterFilter) {
              return false;
            }
          }
          if (state.typeFilter !== 'all' && normalizeQuestionType(q) !== state.typeFilter) return false;
          if (state.diffFilter !== 'all' && (q.difficulty === '适中' ? '中等' : q.difficulty) !== state.diffFilter) return false;
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

      container.innerHTML = pageQuestions.map((q, pageIdx) => {
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

        return `
          <div class="question-card ${isSelected ? 'is-selected' : ''}" data-id="${q.id}">
            <!-- Header Row -->
            <div class="q-card-header flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="q-meta-num">第 ${qNumber} 题</span>
                <span class="q-meta-chapter">${getChapterDisplayLabel(q.chapter)}</span>
                <span class="q-meta-type">${q.typeName}</span>
                <span class="${diffColor}">${q.difficulty}</span>
              </div>
              <div class="q-meta-kp">
                <span>考点：</span><span class="q-meta-kp-text">${q.knowledge}</span>
              </div>
            </div>

            <!-- Stem & Options -->
            <div class="q-card-body text-sm leading-relaxed text-slate-900">
              <div class="q-stem-content">${formatMathHtml(q.stem)}</div>
              ${imgHtml}
              ${optionsHtml}
            </div>

            <!-- Analysis Accordion Drawer -->
            <div id="analysis_${q.id}" class="hidden q-analysis-panel text-xs space-y-1.5">
              <div class="flex items-center space-x-2 font-bold text-slate-900">
                <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>
                <span>参考答案：</span>
                <span class="text-[#0F766E] font-semibold text-base tracking-wide">${formatMathHtml(q.answer)}</span>
              </div>
              <div class="text-slate-600"><b class="text-slate-800">【分析】</b>${formatMathHtml(q.analysis)}</div>
              <div class="text-slate-700 pt-1.5 border-t border-slate-200/70 leading-relaxed"><b class="text-slate-800">【详解】</b>${formatMathHtml(q.detail)}</div>
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
      if (similarItems.length === 0) return;

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
                <span>考点：</span><span class="q-meta-kp-text">${sq.knowledge}</span>
              </div>
            </div>

            <!-- Question Stem & Options -->
            <div class="q-card-body text-sm leading-relaxed text-slate-900">
              <div class="q-stem-content">${formatMathHtml(sq.stem)}</div>
              ${imgHtml}
              ${optionsHtml}
            </div>

            <!-- Analysis Accordion -->
            <div id="sim_analysis_${sq.id}" class="hidden q-analysis-panel text-xs space-y-1.5">
              <div class="flex items-center space-x-2 font-bold text-slate-900">
                <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>
                <span>参考答案：</span>
                <span class="text-[#0F766E] font-semibold text-base tracking-wide">${formatMathHtml(sq.answer)}</span>
              </div>
              <div class="text-slate-600"><b class="text-slate-800">【分析】</b>${formatMathHtml(sq.analysis)}</div>
              <div class="text-slate-700 pt-1.5 border-t border-slate-200/70 leading-relaxed"><b class="text-slate-800">【详解】</b>${formatMathHtml(sq.detail)}</div>
            </div>

            <!-- Card Footer Actions -->
            <div class="q-card-footer flex flex-wrap items-center justify-between gap-2">
              <button class="btn-sim-toggle-analysis q-aux-btn" data-id="${sq.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                <span class="sim-analysis-btn-text">查看答案解析</span>
              </button>

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

    // Inline any local images on the card using window.IMAGE_BASE64_MAP or live canvas/fetch fallback so screenshots never lose images
    async function inlineCardImagesWithBase64(rootEl) {
      if (!rootEl) return;
      if (typeof window.ensureImageBase64Loaded === 'function' && (!window.IMAGE_BASE64_MAP || Object.keys(window.IMAGE_BASE64_MAP).length === 0)) {
        try { await window.ensureImageBase64Loaded(); } catch (_) {}
      }
      const map = window.IMAGE_BASE64_MAP || {};
      const imgs = Array.from(rootEl.querySelectorAll('img'));

      await Promise.all(imgs.map(async (img) => {
        const rawSrc = img.getAttribute('src') || '';
        if (!rawSrc) return;

        // 1. Wait for original image element to finish loading if not yet complete
        if (!img.complete) {
          await new Promise(res => {
            img.addEventListener('load', res, { once: true });
            img.addEventListener('error', res, { once: true });
            setTimeout(res, 3000);
          });
        }

        let dataUrl = rawSrc.startsWith('data:') ? rawSrc : null;

        // 2. Lookup in prebuilt base64 map (by relative path, raw path, or filename)
        if (!dataUrl) {
          const cleanKey = rawSrc.replace(/^\.?\//, '').split('?')[0].split('#')[0];
          const baseName = cleanKey.split('/').pop();
          if (map[cleanKey]) {
            dataUrl = map[cleanKey];
          } else if (map[rawSrc]) {
            dataUrl = map[rawSrc];
          } else if (baseName && map[`assets/images/${baseName}`]) {
            dataUrl = map[`assets/images/${baseName}`];
          }
        }

        // 3. Fallback: fetch local image and convert to data URL (works on http/https or permissive local)
        if (!dataUrl) {
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
            }
          } catch (_) {}
        }

        // 4. Fallback: draw loaded <img> onto an offscreen canvas to extract data URL
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

        // 5. Apply dataUrl and wait for browser to decode the updated image
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

    // Zero-dependency native SVG foreignObject -> Canvas renderer (fallback if CDN libraries fail)
    async function renderCardViaNativeSvg(cardEl, scale = 2.5) {
      await inlineCardImagesWithBase64(cardEl);
      const rect = cardEl.getBoundingClientRect();
      const width = Math.ceil(rect.width);
      const height = Math.ceil(rect.height);

      const clone = cardEl.cloneNode(true);
      clone.querySelectorAll('[data-html2canvas-ignore], .katex-mathml, .q-card-footer').forEach(el => el.remove());

      // Explicitly lock rendered dimensions on cloned images so SVG foreignObject never collapses them
      const origImgs = Array.from(cardEl.querySelectorAll('img'));
      const cloneImgs = Array.from(clone.querySelectorAll('img'));
      cloneImgs.forEach((cImg, idx) => {
        const oImg = origImgs[idx];
        if (oImg) {
          const r = oImg.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) {
            cImg.setAttribute('width', Math.round(r.width));
            cImg.setAttribute('height', Math.round(r.height));
            cImg.style.width = Math.round(r.width) + 'px';
            cImg.style.height = Math.round(r.height) + 'px';
          }
        }
      });

      clone.style.margin = '0';
      clone.style.width = width + 'px';
      clone.style.height = height + 'px';
      clone.style.backgroundColor = '#ffffff';
      clone.style.boxSizing = 'border-box';
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
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      ctx.restore();

      // Explicitly composite all visible card images onto the 2D canvas as well
      const origCardImgs = Array.from(cardEl.querySelectorAll('img'));
      for (const oImg of origCardImgs) {
        const r = oImg.getBoundingClientRect();
        const style = window.getComputedStyle(oImg);
        const visible = r.width > 0 && r.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && !oImg.closest('.hidden, [data-html2canvas-ignore], .q-card-footer');
        if (!visible) continue;
        const src = oImg.getAttribute('src') || oImg.src;
        if (!src) continue;
        await new Promise(resolve => {
          const im = new Image();
          im.onload = () => {
            try {
              const x = Math.round((r.left - rect.left) * scale);
              const y = Math.round((r.top - rect.top) * scale);
              const w = Math.round(r.width * scale);
              const h = Math.round(r.height * scale);
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(x, y, w, h);
              ctx.drawImage(im, x, y, w, h);
            } catch (_) {}
            resolve();
          };
          im.onerror = () => resolve();
          im.src = src;
        });
      }

      return await new Promise((resolve, reject) => {
        canvas.toBlob(b => b ? resolve(b) : reject(new Error('Native SVG canvas toBlob failed')), 'image/png');
      });
    }

    // Generate PNG Blob of Question Card across 3 fallback engines (html-to-image primary)
    async function generateQuestionCardBlob(cardEl) {
      // Ensure all images in the card are inlined as base64 data URIs and fully decoded before capture
      await inlineCardImagesWithBase64(cardEl);

      // Give the browser a layout frame to settle image dimensions if any src was updated
      await new Promise(res => requestAnimationFrame(() => requestAnimationFrame(res)));

      // Pre-warm fonts to avoid KaTeX font blanking
      if (document.fonts && document.fonts.ready) {
        try { await document.fonts.ready; } catch (_) {}
      }

      // High-DPI Retina scaling for ultra-crisp formulas
      const dpr = Math.max(window.devicePixelRatio || 2, 2.5);

      const filterFn = (node) => {
        if (!node) return true;
        if (node.hasAttribute && (node.hasAttribute('data-html2canvas-ignore') || node.getAttribute('data-html2canvas-ignore') === 'true')) return false;
        if (node.classList && (node.classList.contains('katex-mathml') || node.classList.contains('q-card-footer'))) return false;
        return true;
      };

      // Pre-compute rendered rects & base64 data URLs of all visible images inside cardEl
      // so we can composite them directly onto the 2D canvas if SVG foreignObject omits external/base64 <img> tags (WebKit/Safari quirk)
      const cardRect = cardEl.getBoundingClientRect();
      const imageOverlays = Array.from(cardEl.querySelectorAll('img')).map(img => {
        const r = img.getBoundingClientRect();
        const style = window.getComputedStyle(img);
        const visible = r.width > 0 && r.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && !img.closest('.hidden, [data-html2canvas-ignore], .q-card-footer');
        if (!visible) return null;
        return {
          src: img.getAttribute('src') || img.src,
          x: r.left - cardRect.left,
          y: r.top - cardRect.top,
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

      // Engine 1: html-to-image -> toCanvas + direct 2D image compositing (100% pixel-perfect KaTeX + guaranteed images on Safari/Chrome)
      if (typeof window.htmlToImage === 'object' && typeof window.htmlToImage.toCanvas === 'function') {
        try {
          // Warm up font cache first to prevent blank glyphs on KaTeX WebFonts
          try {
            await window.htmlToImage.toCanvas(cardEl, {
              backgroundColor: '#ffffff',
              pixelRatio: 1,
              cacheBust: false,
              filter: filterFn
            });
          } catch (_) {}

          const canvas = await window.htmlToImage.toCanvas(cardEl, {
            backgroundColor: '#ffffff',
            pixelRatio: dpr,
            cacheBust: false,
            filter: filterFn,
            style: {
              margin: '0',
              transform: 'none',
              boxShadow: 'none'
            }
          });
          if (canvas) {
            const blob = await compositeImagesAndToBlob(canvas);
            if (blob) return blob;
          }
        } catch (err1) {
          console.warn('Engine 1 (html-to-image with fonts) failed, trying skipFonts:', err1);
          try {
            const canvas = await window.htmlToImage.toCanvas(cardEl, {
              backgroundColor: '#ffffff',
              pixelRatio: dpr,
              skipFonts: true,
              cacheBust: false,
              filter: filterFn,
              style: {
                margin: '0',
                transform: 'none',
                boxShadow: 'none'
              }
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

      // Engine 2: html2canvas with explicit KaTeX CSS repair + direct 2D image compositing
      if (typeof window.html2canvas === 'function') {
        try {
          const canvas = await window.html2canvas(cardEl, {
            scale: dpr,
            backgroundColor: '#ffffff',
            useCORS: true,
            allowTaint: true,
            logging: false,
            imageTimeout: 8000,
            onclone: (clonedDoc) => {
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
              return el.classList.contains('katex-mathml') || el.hasAttribute('data-html2canvas-ignore') || el.classList.contains('q-card-footer');
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

      // Engine 3: Zero-dependency native SVG foreignObject renderer
      return await renderCardViaNativeSvg(cardEl, dpr);
    }

    // Show interactive screenshot preview modal with 1-click clipboard copy
    function showScreenshotPreviewModal(blob, qNumber, hasAnalysis) {
      const old = document.getElementById('screenshotPreviewModal');
      if (old) old.remove();

      const url = URL.createObjectURL(blob);
      const modal = document.createElement('div');
      modal.id = 'screenshotPreviewModal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 no-print';
      modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
          <div class="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div class="text-sm font-bold text-slate-800">第 ${qNumber} 题高清截图预览</div>
            <button id="closeScreenshotModalBtn" class="text-slate-400 hover:text-slate-600 text-lg leading-none px-2 py-1">✕</button>
          </div>
          <div class="p-5 max-h-[70vh] overflow-y-auto bg-slate-100/60 flex justify-center">
            <img src="${url}" alt="第 ${qNumber} 题截图" class="max-w-full h-auto rounded-lg shadow-sm border border-slate-200 bg-white">
          </div>
          <div class="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>提示：点击右侧【复制到剪贴板】或在图片上右键选择【复制图片】</span>
            <div class="flex items-center gap-2">
              <button id="copyModalImageBtn" class="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-semibold text-slate-700 transition flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                <span>复制到剪贴板</span>
              </button>
              <a href="${url}" download="第${qNumber}题截图${hasAnalysis ? '_含解析' : ''}.png" class="btn-primary px-3.5 py-1.5 rounded-lg font-semibold transition">下载保存图片</a>
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

    // Capture Question Card as PNG and Copy to Clipboard
    async function captureQuestionCard(cardEl, btnEl, qNumber) {
      if (btnEl.disabled) return;
      const textSpan = btnEl.querySelector('.screenshot-btn-text');
      const origText = textSpan ? textSpan.textContent : '截图复制';
      btnEl.disabled = true;
      if (textSpan) textSpan.textContent = '截图中...';

      try {
        const hasAnalysis = !cardEl.querySelector('[id^="analysis_"]')?.classList.contains('hidden');
        const modeLabel = hasAnalysis ? '（含答案解析）' : '';

        // Start generating the Blob promise immediately (preserves user gesture in Safari/WebKit)
        const blobPromise = generateQuestionCardBlob(cardEl);

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
          showToast(`第 ${qNumber} 题高清截图${modeLabel}已成功复制到剪贴板！可直接粘贴`, 'success');
        } else {
          // If browser blocks clipboard API (e.g. strict file:// restriction), open preview modal for 1-click right-click copy & download
          showScreenshotPreviewModal(blob, qNumber, hasAnalysis);
          showToast(`已生成第 ${qNumber} 题高清截图，右键图片即可复制或下载！`, 'info');
        }
      } catch (err) {
        console.error('Screenshot capture failed:', err);
        showToast(`截图失败：${err && err.message ? err.message : '请刷新页面后重试'}`, 'warn');
      } finally {
        btnEl.disabled = false;
        if (textSpan) textSpan.textContent = origText;
      }
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
                      <div class="leading-relaxed pl-2 border-l-2 border-[#0F766E]">${formatMathHtml(q.detail)}</div>
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
                      <div><b>【解析】</b>${formatMathHtml(q.detail)}</div>
                    </div>
                  `;
                }

                return `
                  <div class="question-item text-sm leading-relaxed mb-4">
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
        renderMath();
        return;
      }

      // Group by Part
      const choices = selected.filter(q => q.type === 'choice');
      const blanks = selected.filter(q => q.type === 'blank');
      const judges = selected.filter(q => q.type === 'judge');
      const calcs = selected.filter(q => q.type === 'calc');

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
                    <div><b>【答案】</b><span class="text-[#0F766E] font-bold">${formatMathHtml(q.answer)}</span></div>
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
                    <div class="leading-relaxed pl-2 border-l-2 border-[#0F766E]">${formatMathHtml(q.detail)}</div>
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
