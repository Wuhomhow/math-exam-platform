    // Setup Event Handlers
    function initEvents() {
      document.addEventListener('pointerup', () => {
        let changed = false;
        document.querySelectorAll('.answer-space-resizable').forEach(element => {
          const id = element.getAttribute('data-question-id');
          const height = Math.round(element.getBoundingClientRect().height);
          if (id && height >= 56 && height <= 600 && state.answerSpaceHeights[id] !== height) {
            state.answerSpaceHeights[id] = height;
            changed = true;
          }
        });
        if (changed) saveAnswerSpaceHeights();
      });
      // Navigation
      document.getElementById('navBankBtn').addEventListener('click', () => switchView('bank'));
      document.getElementById('navPaperBtn').addEventListener('click', () => switchView('paper'));

      document.getElementById('mobileNavBank').addEventListener('click', () => switchView('bank'));
      document.getElementById('mobileNavPaper').addEventListener('click', () => switchView('paper'));

      document.getElementById('btnBackToBank').addEventListener('click', () => switchView('bank'));

      // Drawer Open/Close
      const drawer = document.getElementById('basketDrawer');
      const overlay = document.getElementById('basketDrawerOverlay');
      const openDrawer = () => {
        drawer.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        renderBasketDrawer();
      };
      const closeDrawer = () => {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('hidden');
      };

      document.getElementById('btnOpenBasket').addEventListener('click', openDrawer);
      document.getElementById('btnCloseBasket').addEventListener('click', closeDrawer);
      overlay.addEventListener('click', closeDrawer);
      document.getElementById('btnDrawerGoPaper').addEventListener('click', () => {
        closeDrawer();
        switchView('paper');
      });

      // Clear Basket
      const clearBasket = () => {
        state.selectedIds.clear();
        updateStats();
        renderQuestionList();
        renderBasketDrawer();
        showToast('试题篮已清空', 'info');
      };
      document.getElementById('btnClearBasket').addEventListener('click', clearBasket);
      document.getElementById('btnClearBasketDrawer').addEventListener('click', clearBasket);

      // Helper: set active chapter filter and sync the sidebar
      function applyChapterFilter(chapVal) {
        state.chapterFilter = chapVal;
        document.querySelectorAll('.chapter-tree-btn').forEach(b => {
          b.classList.toggle('is-active', b.getAttribute('data-chapter') === chapVal);
        });
        renderQuestionList();
      }

      document.querySelectorAll('.filter-chapter-btn').forEach(btn => {
        btn.addEventListener('click', () => applyChapterFilter(btn.getAttribute('data-chapter')));
      });
      document.querySelectorAll('.chapter-tree-btn').forEach(btn => {
        btn.addEventListener('click', () => applyChapterFilter(btn.getAttribute('data-chapter')));
      });

      // Select All currently filtered questions
      document.getElementById('btnSelectAll').addEventListener('click', () => {
        const currentPool = QUESTION_BANK.filter(q => {
          if (state.chapterFilter !== 'all') {
            if (state.chapterFilter === '2.3') {
              if (!q.chapter.startsWith('2.3')) return false;
            } else if (q.chapter !== state.chapterFilter) return false;
          }
          if (state.typeFilter !== 'all' && q.type !== state.typeFilter) return false;
          if (state.diffFilter !== 'all' && q.difficulty !== state.diffFilter) return false;
          return true;
        });
        currentPool.forEach(q => state.selectedIds.add(q.id));
        updateStats();
        renderQuestionList();
        renderBasketDrawer();
        showToast(`已将当前筛选的 ${currentPool.length} 道题目全部加入试题篮！`, 'success');
      });

      // Filter: Type
      document.querySelectorAll('.filter-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-type-btn').forEach(b => {
            b.className = 'filter-type-btn px-3 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200';
          });
          btn.className = 'filter-type-btn px-3 py-1 rounded-md bg-blue-600 text-white font-medium';
          state.typeFilter = btn.getAttribute('data-type');
          renderQuestionList();
        });
      });

      // Filter: Difficulty
      document.querySelectorAll('.filter-diff-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-diff-btn').forEach(b => {
            b.className = 'filter-diff-btn px-3 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200';
          });
          btn.className = 'filter-diff-btn px-3 py-1 rounded-md bg-blue-600 text-white font-medium';
          state.diffFilter = btn.getAttribute('data-diff');
          renderQuestionList();
        });
      });


      // Search input
      document.getElementById('searchInput').addEventListener('input', (e) => {
        state.searchKeyword = e.target.value.trim();
        renderQuestionList();
      });

      // Paper view modes
      const studentBtn = document.getElementById('viewModeStudent');
      const teacherBtn = document.getElementById('viewModeTeacher');
      studentBtn.addEventListener('click', () => {
        state.paperViewMode = 'student';
        studentBtn.className = 'px-3 py-1 rounded-md bg-white text-blue-700 font-semibold shadow-xs';
        teacherBtn.className = 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900';
        renderPaper();
      });
      teacherBtn.addEventListener('click', () => {
        state.paperViewMode = 'teacher';
        teacherBtn.className = 'px-3 py-1 rounded-md bg-white text-blue-700 font-semibold shadow-xs';
        studentBtn.className = 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900';
        renderPaper();
      });

      // Layout columns
      const layoutSingle = document.getElementById('btnLayoutSingle');
      const layoutDouble = document.getElementById('btnLayoutDouble');
      layoutSingle.addEventListener('click', () => {
        state.isDoubleColumn = false;
        layoutSingle.className = 'px-3 py-1 rounded-md bg-white text-blue-700 font-semibold shadow-xs';
        layoutDouble.className = 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900';
        renderPaper();
      });
      layoutDouble.addEventListener('click', () => {
        state.isDoubleColumn = true;
        layoutDouble.className = 'px-3 py-1 rounded-md bg-white text-blue-700 font-semibold shadow-xs';
        layoutSingle.className = 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900';
        renderPaper();
      });

      // Print and Word export
      document.getElementById('btnPrintPaper').addEventListener('click', () => {
        window.print();
      });
      document.getElementById('btnExportWord').addEventListener('click', exportWordDoc);
    }

    // App Initialization (runs immediately since script is at end of body, with fallbacks)
    let appBootstrapped = false;
    function bootstrapApp() {
      if (appBootstrapped) return;
      if (!document.getElementById('questionList')) return;
      appBootstrapped = true;
      buildChapterNavigation();
      initEvents();
      updateStats();
      renderQuestionList();
      renderBasketDrawer();
      switchView(state.currentView);
      setTimeout(renderMath, 80);
    }
    bootstrapApp();
    document.addEventListener('DOMContentLoaded', bootstrapApp);
    window.addEventListener('load', () => {
      bootstrapApp();
      renderMath();
    });
