// ==========================================
// 1. 自动清除旧弹窗（彻底根治两个弹窗共存问题）
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
// 2. 响应式“手把手”聚光灯漫游引擎 (全屏幕适配)
// ==========================================
class HandInHandTour {
  constructor() {
    this.currentStep = 0;
    this.steps = [
      {
        target: '#typeFilters',
        title: '👉 第一步：按需筛选题目',
        desc: '在此处点击题型（单选、填空、解答），或在左侧目录选择知识点，页面会实时筛选题目。',
        tip: '💡 也可以在搜索框输入考点或公式关键词搜索',
        actionBefore: () => {
          switchView('bank');
          closeDrawerGlobal();
        }
      },
      {
        target: '#btnSelectAll',
        title: '👉 第二步：将题目加入试题篮',
        desc: '公式均由 KaTeX 高清渲染。确认题目无误后，可以点击每道题下方的【加入试卷】，也可以点这里【本页全选入篮】。',
        tip: '💡 选中的题目会自动放进你的试题篮',
        actionBefore: () => {
          switchView('bank');
          closeDrawerGlobal();
        }
      },
      {
        target: '#btnOpenBasket',
        title: '👉 第三步：打开试题篮核对',
        desc: '右上角红色角标会显示当前挑选的题目数。点击这个按钮即可展开右侧试题篮抽屉。',
        tip: '💡 随时可以查看、删除或清空已选题目',
        actionBefore: () => {
          switchView('bank');
          closeDrawerGlobal();
        }
      },
      {
        target: '#btnDrawerGoPaper',
        title: '👉 第四步：生成排版试卷',
        desc: '核对好题目后，直接点击这个按钮！系统会自动将所有题目排版为标准化试卷。',
        tip: '💡 自动为你调整大题序号与格式',
        actionBefore: () => {
          switchView('bank');
          openDrawerGlobal();
        }
      },
      {
        target: '#btnPrintPaper',
        title: '👉 第五步：一键导出与打印',
        desc: '已自动切换到试卷排版预览！你可以切换【学生卷/教师解析卷】，点击这里直接【打印 / 另存为 PDF】，或者点击左侧【导出 Word】！',
        tip: '🎉 太棒了！全套流程已亲身体验完毕，现在开始组装你的第一套试卷吧！',
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
    // 聚光灯遮罩框
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

    // 响应式提示气泡框
    this.popover = document.createElement('div');
    this.popover.id = 'tourPopover';
    this.popover.style.cssText = `
      position: fixed;
      z-index: 9999;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      padding: 16px 18px;
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

    // 稍微延迟 100ms 等待抽屉滑动或标签页切换渲染完成
    setTimeout(() => {
      const el = document.querySelector(step.target);
      if (!el) {
        if (this.currentStep < this.steps.length - 1) this.next();
        return;
      }

      // 保证目标元素滚入视野上三分之一区域，防止在移动端被底栏遮挡
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.positionToTarget(el);

      const isLast = this.currentStep === this.steps.length - 1;
      this.popover.innerHTML = `
        <div style="display: flex; items-center: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 11px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 2px 8px; border-radius: 999px;">
            教程 ${this.currentStep + 1} / ${this.steps.length}
          </span>
          <button id="tourBtnClose" style="background: transparent; border: none; font-size: 16px; color: #94a3b8; cursor: pointer; padding: 2px 4px; line-height: 1;">✕</button>
        </div>
        <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">${step.title}</h4>
        <p style="font-size: 12px; color: #475569; line-height: 1.5; margin: 0 0 8px 0;">${step.desc}</p>
        <div style="font-size: 11px; color: #1e40af; background: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 8px; border-radius: 8px; margin-bottom: 12px;">
          ${step.tip}
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <button id="tourBtnSkip" style="font-size: 11px; color: #64748b; background: transparent; border: none; cursor: pointer; padding: 4px;">跳过</button>
          <div style="display: flex; gap: 6px;">
            ${this.currentStep > 0 ? '<button id="tourBtnPrev" style="padding: 5px 10px; font-size: 11px; color: #475569; background: #f1f5f9; border-radius: 6px; border: none; cursor: pointer;">上一步</button>' : ''}
            <button id="tourBtnNext" style="padding: 5px 12px; font-size: 11px; font-weight: 600; color: #ffffff; background: ${isLast ? '#059669' : '#2563eb'}; border-radius: 6px; border: none; cursor: pointer;">
              ${isLast ? '完成教程' : '下一步 👉'}
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

    // 定位聚光灯高亮框
    this.spotlight.style.top = `${Math.max(0, rect.top - pad)}px`;
    this.spotlight.style.left = `${Math.max(0, rect.left - pad)}px`;
    this.spotlight.style.width = `${Math.min(window.innerWidth, rect.width + pad * 2)}px`;
    this.spotlight.style.height = `${rect.height + pad * 2}px`;

    // 智能屏幕宽度适配
    const isMobile = window.innerWidth < 640;

    if (isMobile) {
      // 移动端：吸附屏幕底部，留出上半部看清楚高亮元素
      this.popover.style.width = 'auto';
      this.popover.style.left = '14px';
      this.popover.style.right = '14px';
      this.popover.style.bottom = '16px';
      this.popover.style.top = 'auto';
    } else {
      // 桌面端：智能判断放在下方还是上方
      const popWidth = 330;
      const popHeight = 210;
      let top = rect.bottom + 12;
      let left = rect.left + (rect.width / 2) - (popWidth / 2);

      // 若下方空间不足，则翻转到上方
      if (top + popHeight > window.innerHeight - 10) {
        top = Math.max(10, rect.top - popHeight - 12);
      }
      // 左右防溢出
      if (left + popWidth > window.innerWidth - 16) {
        left = window.innerWidth - popWidth - 16;
      }
      if (left < 16) {
        left = 16;
      }

      this.popover.style.width = `${popWidth}px`;
      this.popover.style.left = `${left}px`;
      this.popover.style.top = `${top}px`;
      this.popover.style.bottom = 'auto';
      this.popover.style.right = 'auto';
    }
  }
}

// 供漫游模块调用的全局抽屉控制
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

  document.getElementById('btnBackToBank').addEventListener('click', () => switchView('bank'));

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

  // Guide Button Trigger
  const guideBtn = document.getElementById('btnOpenGuide') || document.getElementById('openGuideBtn');
  if (guideBtn) {
    guideBtn.addEventListener('click', () => {
      if (tourInstance) tourInstance.start();
    });
  }
}

// ==========================================
// 4. 应用自启动与手把手新手引导触发
// ==========================================
let appBootstrapped = false;
function bootstrapApp() {
  if (appBootstrapped) return;
  if (!document.getElementById('questionList')) return;
  appBootstrapped = true;

  purgeOldModals();
  buildChapterNavigation();
  initEvents();
  updateStats();
  renderQuestionList();
  renderBasketDrawer();
  switchView(state.currentView);
  setTimeout(renderMath, 80);

  // 初始化手把手漫游实例
  tourInstance = new HandInHandTour();

  // 首次访问时，延迟 450ms 自动开启聚光灯手把手教学
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
