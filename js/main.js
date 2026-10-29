// Synchronize UI buttons and inputs to restored state
function syncUiToState() {
  // 1. Chapter tree active state & expand parent details
  const activeChapter = state.chapterFilter || 'all';
  document.querySelectorAll('.chapter-tree-btn').forEach(btn => {
    const isAct = btn.getAttribute('data-chapter') === activeChapter;
    btn.classList.toggle('is-active', isAct);
    if (isAct) {
      const parentCard = btn.closest('.nav-grade-card');
      if (parentCard) parentCard.open = true;
    }
  });

  // 2. Type filter buttons
  document.querySelectorAll('.filter-type-btn').forEach(btn => {
    const isAct = btn.getAttribute('data-type') === state.typeFilter;
    btn.className = isAct
      ? 'filter-type-btn px-3 py-1 rounded-md bg-blue-600 text-white font-medium'
      : 'filter-type-btn px-3 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200';
  });

  // 3. Diff filter buttons
  document.querySelectorAll('.filter-diff-btn').forEach(btn => {
    const isAct = btn.getAttribute('data-diff') === state.diffFilter;
    btn.className = isAct
      ? 'filter-diff-btn px-3 py-1 rounded-md bg-blue-600 text-white font-medium'
      : 'filter-diff-btn px-3 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200';
  });

  // 4. Search input
  const searchEl = document.getElementById('searchInput');
  if (searchEl && state.searchKeyword) {
    searchEl.value = state.searchKeyword;
  }

  // 5. Paper view mode
  const studentBtn = document.getElementById('viewModeStudent');
  const teacherBtn = document.getElementById('viewModeTeacher');
  if (studentBtn && teacherBtn) {
    const isTeacher = state.paperViewMode === 'teacher';
    studentBtn.className = isTeacher ? 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900' : 'px-3 py-1 rounded-md bg-white text-blue-700 font-semibold shadow-xs';
    teacherBtn.className = isTeacher ? 'px-3 py-1 rounded-md bg-white text-blue-700 font-semibold shadow-xs' : 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900';
  }

  // 6. Paper layout mode
  const layoutSingle = document.getElementById('btnLayoutSingle');
  const layoutDouble = document.getElementById('btnLayoutDouble');
  if (layoutSingle && layoutDouble) {
    layoutSingle.className = state.isDoubleColumn ? 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900' : 'px-3 py-1 rounded-md bg-white text-blue-700 font-semibold shadow-xs';
    layoutDouble.className = state.isDoubleColumn ? 'px-3 py-1 rounded-md bg-white text-blue-700 font-semibold shadow-xs' : 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900';
  }
}

// ==========================================
// 1. 自动清除旧弹窗（彻底根治共存问题）
// ==========================================
function purgeOldModals() {
  const oldModalIds = ['quickGuideModal', 'onboardingModal', 'onboardingCard', 'guideModalCard'];
  oldModalIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
}
purgeOldModals();

// ==========================================
// 2. 极简“手把手”聚光灯漫游引擎 (言简意赅)
// ==========================================
class HandInHandTour {
  constructor() {
    this.currentStep = 0;
    this.steps = [
      {
        target: '#typeFilters',
        title: '1. 筛选题目',
        desc: '按题型、难度或左侧知识点快速找题。',
        actionBefore: () => {
          switchView('bank');
          closeDrawerGlobal();
        }
      },
      {
        target: '#btnSelectAll',
        title: '2. 加入试卷',
        desc: '点击题目下方的【加入试卷】或直接【全选入篮】。',
        actionBefore: () => {
          switchView('bank');
          closeDrawerGlobal();
        }
      },
      {
        target: '#btnOpenBasket',
        title: '3. 查看试题篮',
        desc: '点击此处打开抽屉，核对或删减已选题。',
        actionBefore: () => {
          switchView('bank');
          closeDrawerGlobal();
        }
      },
      {
        target: '#btnDrawerGoPaper',
        title: '4. 生成试卷',
        desc: '核对好题目后，点此自动完成试卷排版。',
        actionBefore: () => {
          switchView('bank');
          openDrawerGlobal();
        }
      },
      {
        target: '#btnPrintPaper',
        title: '5. 导出与打印',
        desc: '支持一键打印、另存为 PDF 或导出 Word。',
        actionBefore: () => {
          closeDrawerGlobal();
          switchView('paper');
        }
      }
    ];

    this.createDom();
    this.bindEvents();
  }

  createDom() {
    this.spotlight = document.createElement('div');
    this.spotlight.id = 'tourSpotlight';
    this.spotlight.style.cssText = `
      position: fixed;
      z-index: 9998;
      border-radius: 8px;
      box-shadow: 0 0 0 9999px rgba(15, 23, 42, 0.72);
      border: 2px solid #3b82f6;
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      display: none;
    `;

    this.popover = document.createElement('div');
    this.popover.id = 'tourPopover';
    this.popover.style.cssText = `
      position: fixed;
      z-index: 9999;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      padding: 14px 16px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: none;
      font-family: system-ui, -apple-system, sans-serif;
      box-sizing: border-box;
    `;

    document.body.appendChild(this.spotlight);
    document.body.appendChild(this.popover);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      if (this.spotlight.style.display === 'block') {
        this.positionToTarget();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (this.spotlight.style.display === 'block') {
        if (e.key === 'Escape') this.stop();
        if (e.key === 'ArrowRight') this.next();
        if (e.key === 'ArrowLeft') this.prev();
      }
    });
  }

  start() {
    purgeOldModals();
    this.currentStep = 0;
    this.showStep();
  }

  stop() {
    this.spotlight.style.display = 'none';
    this.popover.style.display = 'none';
    localStorage.setItem('math_exam_tour_done', 'true');
  }

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.showStep();
    } else {
      this.stop();
    }
  }

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep();
    }
  }

  showStep() {
    purgeOldModals();
    const step = this.steps[this.currentStep];
    if (step.actionBefore) {
      step.actionBefore();
    }

    setTimeout(() => {
      const el = document.querySelector(step.target);
      if (!el) {
        if (this.currentStep < this.steps.length - 1) this.next();
        return;
      }

      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.positionToTarget(el);

      const isLast = this.currentStep === this.steps.length - 1;
      this.popover.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-size: 11px; font-weight: 700; color: #2563eb;">${this.currentStep + 1} / ${this.steps.length}</span>
          <button id="tourBtnClose" style="background: transparent; border: none; font-size: 15px; color: #94a3b8; cursor: pointer; padding: 2px 4px; line-height: 1;">✕</button>
        </div>
        <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">${step.title}</h4>
        <p style="font-size: 12px; color: #475569; line-height: 1.45; margin: 0 0 12px 0;">${step.desc}</p>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <button id="tourBtnSkip" style="font-size: 11px; color: #64748b; background: transparent; border: none; cursor: pointer; padding: 2px 4px;">跳过</button>
          <div style="display: flex; gap: 6px;">
            ${this.currentStep > 0 ? '<button id="tourBtnPrev" style="padding: 4px 10px; font-size: 11px; color: #475569; background: #f1f5f9; border-radius: 6px; border: none; cursor: pointer;">上一步</button>' : ''}
            <button id="tourBtnNext" style="padding: 4px 12px; font-size: 11px; font-weight: 600; color: #ffffff; background: ${isLast ? '#059669' : '#2563eb'}; border-radius: 6px; border: none; cursor: pointer;">
              ${isLast ? '完成' : '下一步 👉'}
            </button>
          </div>
        </div>
      `;

      document.getElementById('tourBtnClose').onclick = () => this.stop();
      document.getElementById('tourBtnSkip').onclick = () => this.stop();
      document.getElementById('tourBtnNext').onclick = () => this.next();
      const prevBtn = document.getElementById('tourBtnPrev');
      if (prevBtn) prevBtn.onclick = () => this.prev();

      this.spotlight.style.display = 'block';
      this.popover.style.display = 'block';
    }, 120);
  }

  positionToTarget(targetEl) {
    const el = targetEl || document.querySelector(this.steps[this.currentStep].target);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const pad = window.innerWidth < 640 ? 4 : 6;

    this.spotlight.style.top = `${Math.max(0, rect.top - pad)}px`;
    this.spotlight.style.left = `${Math.max(0, rect.left - pad)}px`;
    this.spotlight.style.width = `${Math.min(window.innerWidth, rect.width + pad * 2)}px`;
    this.spotlight.style.height = `${rect.height + pad * 2}px`;

    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      this.popover.style.width = 'auto';
      this.popover.style.left = '12px';
      this.popover.style.right = '12px';
      this.popover.style.bottom = '16px';
      this.popover.style.top = 'auto';
    } else {
      const popWidth = 280;
      const popHeight = 130;
      let top = rect.bottom + 10;
      let left = rect.left + (rect.width / 2) - (popWidth / 2);

      if (top + popHeight > window.innerHeight - 10) {
        top = Math.max(10, rect.top - popHeight - 10);
      }
      if (left + popWidth > window.innerWidth - 14) {
        left = window.innerWidth - popWidth - 14;
      }
      if (left < 14) {
        left = 14;
      }

      this.popover.style.width = `${popWidth}px`;
      this.popover.style.left = `${left}px`;
      this.popover.style.top = `${top}px`;
      this.popover.style.bottom = 'auto';
      this.popover.style.right = 'auto';
    }
  }
}

let tourInstance = null;
function openDrawerGlobal() {
  const drawer = document.getElementById('basketDrawer');
  const overlay = document.getElementById('basketDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    renderBasketDrawer();
  }
}
function closeDrawerGlobal() {
  const drawer = document.getElementById('basketDrawer');
  const overlay = document.getElementById('basketDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  }
}

// ==========================================
// 3. 核心交互事件绑定
// ==========================================
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

  // 返回按钮
  const backBtn = document.getElementById('btnBackToBank');
  if (backBtn) backBtn.addEventListener('click', () => switchView('bank'));

  // Drawer Open/Close
  document.getElementById('btnOpenBasket').addEventListener('click', openDrawerGlobal);
  document.getElementById('btnCloseBasket').addEventListener('click', closeDrawerGlobal);
  document.getElementById('basketDrawerOverlay').addEventListener('click', closeDrawerGlobal);
  document.getElementById('btnDrawerGoPaper').addEventListener('click', () => {
    closeDrawerGlobal();
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

  // Chapter filter
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

  // Select All
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

  // Filters: Type & Difficulty
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

  // Search
  let searchDebounceTimer = null;
      document.getElementById('searchInput').addEventListener('input', (e) => {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => {
          state.searchKeyword = e.target.value.trim();
          state.currentPage = 1;
          saveUiPreferences();
          renderQuestionList();
        }, 300);
      });

  // 教师解析模式（精简复选框交互）
  const teacherToggle = document.getElementById('toggleTeacherMode');
  if (teacherToggle) {
    teacherToggle.addEventListener('change', (e) => {
      state.paperViewMode = e.target.checked ? 'teacher' : 'student';
      renderPaper();
    });
  }

  // 单双栏排版切换
  const layoutSingle = document.getElementById('btnLayoutSingle');
  const layoutDouble = document.getElementById('btnLayoutDouble');
  if (layoutSingle && layoutDouble) {
    layoutSingle.addEventListener('click', () => {
      state.isDoubleColumn = false;
      layoutSingle.className = 'px-2.5 py-1 rounded-md bg-white text-blue-700 font-semibold shadow-xs';
      layoutDouble.className = 'px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900';
      renderPaper();
    });
    layoutDouble.addEventListener('click', () => {
      state.isDoubleColumn = true;
      layoutDouble.className = 'px-2.5 py-1 rounded-md bg-white text-blue-700 font-semibold shadow-xs';
      layoutSingle.className = 'px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900';
      renderPaper();
    });
  }

  // 打印与 Word 导出
  document.getElementById('btnPrintPaper').addEventListener('click', () => {
    window.print();
  });
  document.getElementById('btnExportWord').addEventListener('click', exportWordDoc);

  // 引导按钮
  const guideBtn = document.getElementById('btnOpenGuide') || document.getElementById('openGuideBtn');
  if (guideBtn) {
    guideBtn.addEventListener('click', () => {
      if (tourInstance) tourInstance.start();
    });
  }
}

// ==========================================
// 4. 应用自启动与初始化
// ==========================================
let appBootstrapped = false;
function bootstrapApp() {
  if (appBootstrapped) return;
  if (!document.getElementById('questionList')) return;
  appBootstrapped = true;

  purgeOldModals();
  buildChapterNavigation();
  initEvents();
  syncUiToState();
  updateStats();
  renderQuestionList();
  renderBasketDrawer();
  switchView(state.currentView);
  setTimeout(renderMath, 80);

  // Restore scroll position if saved
  if (state.savedScrollY > 0) {
    setTimeout(() => {
      window.scrollTo({ top: state.savedScrollY, behavior: 'auto' });
    }, 120);
  }

  // Periodic and beforeunload scroll position tracking
  let scrollSaveTimer = null;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollSaveTimer);
    scrollSaveTimer = setTimeout(saveUiPreferences, 250);
  }, { passive: true });
  window.addEventListener('beforeunload', saveUiPreferences);

  tourInstance = new HandInHandTour();

  if (!localStorage.getItem('math_exam_tour_done')) {
    setTimeout(() => {
      tourInstance.start();
    }, 450);
  }
}

bootstrapApp();
document.addEventListener('DOMContentLoaded', bootstrapApp);
window.addEventListener('load', () => {
  bootstrapApp();
  renderMath();
});
