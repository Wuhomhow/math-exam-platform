// ==========================================
// 1. 新手引导卡片配置与业务逻辑
// ==========================================
const guideSteps = [
  {
    title: "第一步：挑选试题",
    icon: "🔍",
    desc: "在左侧【题库目录】切换章节，或在顶部筛选单选题、填空题、解答题及难度，也可以在搜索框输入考点关键词快速检索。",
    tip: "💡 支持按难度标签与题干公式快速定位目标题目"
  },
  {
    title: "第二步：加入试题篮",
    icon: "➕",
    desc: "每道试题均已通过 KaTeX 渲染出清晰的数学公式。确认题目符合要求后，点击题卡下方的【加入试卷】或顶部【本页全选入篮】。",
    tip: "💡 试题入篮后，右上角试题篮红色角标会实时更新题数"
  },
  {
    title: "第三步：检查试题篮",
    icon: "🧺",
    desc: "点击右上角【试题篮】按钮展开抽屉，在此可核对所选题目的数量，确认无误后点击【生成排版试卷 →】。",
    tip: "💡 若需重新挑选，也可以在抽屉中随时清空或移除单题"
  },
  {
    title: "第四步：试卷排版与预览",
    icon: "📄",
    desc: "进入预览视图后，支持自由切换【学生作答卷 / 教师答案解析卷】，并可在【A4 标准单栏】与【A4/A3 双栏排版】之间一键切换。",
    tip: "💡 所见即所得，排版效果与最终打印效果完全一致"
  },
  {
    title: "第五步：一键导出与打印",
    icon: "🖨️",
    desc: "预览满意后，点击【导出 Word (.doc)】可直接下载可编辑文档；点击【打印 / 另存为 PDF】即可调用打印机或保存为高清试卷 PDF！",
    tip: "🎉 全流程已掌握！点击下方按钮开始组装你的第一份试卷吧！"
  }
];

let guideCurrentStep = 0;

function renderGuideStep() {
  const contentBody = document.getElementById("guideContentBody") || document.getElementById("guideStepContent");
  const dots = document.querySelectorAll(".guide-dot");
  const prevBtn = document.getElementById("guidePrevBtn") || document.getElementById("prevGuideBtn");
  const nextBtn = document.getElementById("guideNextBtn") || document.getElementById("nextGuideBtn");
  if (!contentBody) return;

  const s = guideSteps[guideCurrentStep];
  contentBody.innerHTML = `
    <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-3 shadow-inner mx-auto">
      ${s.icon}
    </div>
    <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-2">${s.title}</h4>
    <p class="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed mb-3 mx-auto">${s.desc}</p>
    <div class="inline-block text-xs text-blue-700 bg-blue-50/80 border border-blue-100 px-3 py-1.5 rounded-full font-medium">
      ${s.tip}
    </div>
  `;

  dots.forEach((dot, index) => {
    if (index === guideCurrentStep) {
      dot.className = "guide-dot h-1.5 rounded-full transition-all duration-300 w-6 bg-blue-600";
    } else {
      dot.className = "guide-dot h-1.5 rounded-full transition-all duration-300 w-2 bg-slate-200";
    }
  });

  if (prevBtn) {
    prevBtn.style.display = guideCurrentStep > 0 ? "inline-block" : "none";
  }
  if (nextBtn) {
    if (guideCurrentStep === guideSteps.length - 1) {
      nextBtn.textContent = "开始使用";
      nextBtn.className = "px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition";
    } else {
      nextBtn.textContent = "下一步";
      nextBtn.className = "px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition";
    }
  }
}

function openOnboardingGuide() {
  const modal = document.getElementById("quickGuideModal") || document.getElementById("onboardingModal");
  if (!modal) return;
  guideCurrentStep = 0;
  renderGuideStep();
  modal.style.display = "flex";
  modal.classList.remove("hidden");
}

function closeOnboardingGuide() {
  const modal = document.getElementById("quickGuideModal") || document.getElementById("onboardingModal");
  const noRepeatCheck = document.getElementById("guideNoRepeat") || document.getElementById("neverShowAgain");
  if (modal) {
    modal.style.display = "none";
    modal.classList.add("hidden");
  }
  if (noRepeatCheck && noRepeatCheck.checked) {
    localStorage.setItem("math_exam_guide_dismissed", "true");
  }
}

function initOnboardingGuide() {
  const modal = document.getElementById("quickGuideModal") || document.getElementById("onboardingModal");
  if (!modal) return;

  const nextBtn = document.getElementById("guideNextBtn") || document.getElementById("nextGuideBtn");
  const prevBtn = document.getElementById("guidePrevBtn") || document.getElementById("prevGuideBtn");
  const closeX = document.getElementById("closeGuideX") || document.getElementById("closeGuideBtn");
  const openBtn = document.getElementById("btnOpenGuide") || document.getElementById("openGuideBtn");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (guideCurrentStep < guideSteps.length - 1) {
        guideCurrentStep++;
        renderGuideStep();
      } else {
        closeOnboardingGuide();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (guideCurrentStep > 0) {
        guideCurrentStep--;
        renderGuideStep();
      }
    });
  }

  if (closeX) closeX.addEventListener("click", closeOnboardingGuide);
  if (openBtn) openBtn.addEventListener("click", openOnboardingGuide);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeOnboardingGuide();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeOnboardingGuide();
    }
  });

  // 首次访问自动唤起
  if (!localStorage.getItem("math_exam_guide_dismissed")) {
    setTimeout(openOnboardingGuide, 450);
  }
}

// ==========================================
// 2. 平台核心事件绑定
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

  // Guide Button Trigger
  const guideBtn = document.getElementById('btnOpenGuide') || document.getElementById('openGuideBtn');
  if (guideBtn) {
    guideBtn.addEventListener('click', openOnboardingGuide);
  }
}

// ==========================================
// 3. 应用自启动与初始化
// ==========================================
let appBootstrapped = false;
function bootstrapApp() {
  if (appBootstrapped) return;
  if (!document.getElementById('questionList')) return;
  appBootstrapped = true;
  buildChapterNavigation();
  initEvents();
  initOnboardingGuide();
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
