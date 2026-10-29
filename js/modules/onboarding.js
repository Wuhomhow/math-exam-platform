/**
 * 组卷平台新手引导卡片模块
 */
const guideSteps = [
  {
    step: 1,
    title: "第一步：题库检索与筛选",
    desc: "使用顶部筛选栏，按知识点（如函数、几何）、题型（单选、解答题）及难度快速缩小范围，精准匹配题目。",
    icon: `<div class="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-4">🔍</div>`,
    tip: "💡 提示：支持输入关键字搜索题干内容。"
  },
  {
    step: 2,
    title: "第二步：公式预览与加入试卷",
    desc: "所有题目均由 KaTeX 实时排版数学公式。浏览满意后，点击卡片上的【加入试题篮】。",
    icon: `<div class="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl mb-4">➕</div>`,
    tip: "💡 提示：右下角悬浮窗会实时更新已选总题数与满分统计。"
  },
  {
    step: 3,
    title: "第三步：试题篮调整与分值分配",
    desc: "打开试题篮，你可以上下调整题目排序、移除不合适试题，并为每道题设置对应分值。",
    icon: `<div class="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-3xl mb-4">🧺</div>`,
    tip: "💡 提示：系统会自动计算试卷总分，无需手动核对。"
  },
  {
    step: 4,
    title: "第四步：试卷信息与排版预览",
    desc: "点击【试卷预览】，设定学校名称、考试标题、密封线及注意事项，体验所见即所得的 A4 打印级效果。",
    icon: `<div class="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mb-4">📄</div>`,
    tip: "💡 提示：支持预览标准解答步骤与得分点。"
  },
  {
    step: 5,
    title: "第五步：一键导出与高清打印",
    desc: "点击【导出试卷】，可一键生成规范格式的 PDF 或直接调用打印机，支持单独导出“学生卷”与“解析卷”。",
    icon: `<div class="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mb-4">🖨️</div>`,
    tip: "💡 恭喜！你已掌握完整流程，马上开始组装你的第一份试卷吧！"
  }
];

export class OnboardingGuide {
  constructor() {
    this.currentStep = 0;
    this.modal = document.getElementById("onboardingModal");
    this.card = document.getElementById("onboardingCard");
    this.contentBox = document.getElementById("guideStepContent");
    this.dotsBox = document.getElementById("guideStepDots");
    this.prevBtn = document.getElementById("prevGuideBtn");
    this.nextBtn = document.getElementById("nextGuideBtn");
    this.closeBtn = document.getElementById("closeGuideBtn");
    this.neverShowCheck = document.getElementById("neverShowAgain");

    if (!this.modal) return;
    this.init();
  }

  init() {
    this.renderDots();
    this.bindEvents();

    const hasSeenGuide = localStorage.getItem("math_exam_guide_dismissed");
    if (!hasSeenGuide) {
      this.open();
    }
  }

  renderDots() {
    this.dotsBox.innerHTML = guideSteps.map((_, i) => `
      <div class="h-1.5 rounded-full transition-all duration-300 ${i === this.currentStep ? 'w-6 bg-blue-600' : 'w-2 bg-gray-200'}"></div>
    `).join("");
  }

  renderStep() {
    const data = guideSteps[this.currentStep];
    this.contentBox.innerHTML = `
      ${data.icon}
      <h4 class="text-lg font-bold text-gray-800 mb-2">${data.title}</h4>
      <p class="text-sm text-gray-600 max-w-sm mb-3 leading-relaxed">${data.desc}</p>
      <span class="text-xs text-blue-700 bg-blue-50 px-3 py-1 rounded-full font-medium">${data.tip}</span>
    `;

    this.prevBtn.disabled = this.currentStep === 0;
    if (this.currentStep === guideSteps.length - 1) {
      this.nextBtn.textContent = "立即开始组卷";
      this.nextBtn.className = "px-5 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition";
    } else {
      this.nextBtn.textContent = "下一步";
      this.nextBtn.className = "px-5 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition";
    }

    this.renderDots();
  }

  open() {
    this.currentStep = 0;
    this.renderStep();
    this.modal.classList.remove("hidden");
    requestAnimationFrame(() => {
      this.card.classList.remove("scale-95");
      this.card.classList.add("scale-100");
    });
  }

  close() {
    if (this.neverShowCheck && this.neverShowCheck.checked) {
      localStorage.setItem("math_exam_guide_dismissed", "true");
    }
    this.card.classList.remove("scale-100");
    this.card.classList.add("scale-95");
    setTimeout(() => {
      this.modal.classList.add("hidden");
    }, 200);
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.renderStep();
      }
    });

    this.nextBtn.addEventListener("click", () => {
      if (this.currentStep < guideSteps.length - 1) {
        this.currentStep++;
        this.renderStep();
      } else {
        this.close();
      }
    });

    this.closeBtn.addEventListener("click", () => this.close());

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.modal.classList.contains("hidden")) {
        this.close();
      }
    });
  }
}
