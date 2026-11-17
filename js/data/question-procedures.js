// 题典网「题目与程序性知识关联及动态集合服务」数据层 (question-procedures.js)
// 核心原则：
// 1. 原始题目数据仍然是题库的唯一题目来源（不复制或修改 questions.js）。
// 2. 关联记录包含 questionId、procedureId、sortOrder（及兼容字段 order）、partId、role、status。
// 3. 题目集合完全由关联数据动态生成并按 sortOrder 稳定排序。
// 4. 内容已通过人工审核，状态统一标记为 published。
(function () {
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  const QUESTION_PROCEDURES = [
    // =========================================================================
    // P01：利用直接开平方法解一元二次方程（共 18 道样本题，严格按学习顺序 sortOrder 1~18 排列）
    // =========================================================================
    {
      questionId: 'quad25_3_7',
      procedureId: 'P01',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '移项得 x² = 25，对等式两边直接开平方得 x = ±5。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_8',
      procedureId: 'P01',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '先移项得 4x² = 1，再将 x² 系数化为 1 得 x² = 1/4，最后直接开平方得 x₁ = -1/2, x₂ = 1/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_2',
      procedureId: 'P01',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '对整体平方 (x + 1)² = 16 直接利用平方根定义得 x + 1 = 4 或 x + 1 = -4，解得 x = 3 或 -5。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_1',
      procedureId: 'P01',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '先两边同除以 2 化简得 (x - 2)² = 4，再直接开平方得 x - 2 = ±2，解得 x₁ = 4, x₂ = 0。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_10',
      procedureId: 'P01',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '移项得 3x² = 27，两边同除以 3 得 x² = 9，直接开平方得 x = ±3。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_3',
      procedureId: 'P01',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '移项得 (x + 1)² = 9，两边开平方得 x + 1 = ±3，解得 x₁ = 2, x₂ = -4。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_4',
      procedureId: 'P01',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '移项得 (2x + 1)² = 4，两边开平方得 2x + 1 = ±2，解得 x₁ = 1/2, x₂ = -3/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_12',
      procedureId: 'P01',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '两边同乘 3 得 (x + 3)² = 3，直接开平方得 x + 3 = ±√3，解得 x₁ = -3 + √3, x₂ = -3 - √3。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_13',
      procedureId: 'P01',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '先移项得 (1/4)(2x + 3)² = 4，系数化为 1 得 (2x + 3)² = 16，开平方得 2x + 3 = ±4，解得 x₁ = 1/2, x₂ = -7/2。',
      status: 'published'
    },

    // quad25_3_5（多小问题目：共 3 个小问）
    {
      questionId: 'quad25_3_5',
      procedureId: 'P01',
      partId: '(1)',
      sortOrder: 10,
      order: 10,
      partOrder: 1,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(1)问：2x² - 32 = 0 移项并除以 2 得 x² = 16，直接开平方得 x = ±4。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_5',
      procedureId: 'P01',
      partId: '(2)',
      sortOrder: 10,
      order: 10,
      partOrder: 2,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(2)问：81x² - 1 = 0 移项并除以 81 得 x² = 1/81，直接开平方得 x = ±1/9。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_5',
      procedureId: 'P01',
      partId: '(3)',
      sortOrder: 10,
      order: 10,
      partOrder: 3,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(3)问：4x² - 32 = 0 移项并除以 4 得 x² = 8，直接开平方并化简二次根式得 x = ±2√2。',
      status: 'published'
    },

    {
      questionId: 'quad25_3_6',
      procedureId: 'P01',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '由 (x + 1)² = 9 直接开平方并移项得 x = -1 ± 3，解得 x₁ = -4, x₂ = 2。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_9',
      procedureId: 'P01',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '移项得 (x - 1)² = 49，开平方得 x - 1 = ±7，分情况解得 x = 8 或 x = -6。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_11',
      procedureId: 'P01',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '由 (3x - 2)² = 64 直接开平方得 3x - 2 = ±8，分别解两个一元一次方程得 x₁ = 10/3, x₂ = -2。',
      status: 'published'
    },

    // quad25_3_14（多小问题目：仅第(4)问进入 sortOrder=14 的“平方相等转化为一次方程”进阶位置）
    {
      questionId: 'quad25_3_14',
      procedureId: 'P01',
      partId: '(4)',
      sortOrder: 14,
      order: 14,
      partOrder: 4,
      inCollectionOrder: true,
      role: 'primary',
      subType: 'P01_C2_equal_squares_to_linear',
      operationSummary: '第(4)问（平方相等进阶位置）：对 (2x + 3)² = (3x + 2)² 两边开平方，转化为 2x + 3 = 3x + 2 或 2x + 3 = -3x - 2，解得 x₁ = 1, x₂ = -1。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_14',
      procedureId: 'P01',
      partId: '(1)',
      sortOrder: 14,
      order: 14,
      partOrder: 1,
      inCollectionOrder: false,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(1)问（基础完全平方式直接开方）：对 (x - 1)² = 49 直接开平方得 x - 1 = ±7，解得 x₁ = 8, x₂ = -6。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_14',
      procedureId: 'P01',
      partId: '(2)',
      sortOrder: 14,
      order: 14,
      partOrder: 2,
      inCollectionOrder: false,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(2)问（含系数整体平方式直接开方）：对 (2y - 3)² = 16 直接开平方得 2y - 3 = ±4，解得 y₁ = 7/2, y₂ = -1/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_14',
      procedureId: 'P01',
      partId: '(3)',
      sortOrder: 14,
      order: 14,
      partOrder: 3,
      inCollectionOrder: false,
      role: 'secondary',
      subType: 'P01_C1_with_trinomial_square_factoring',
      operationSummary: '第(3)问（先逆用完全平方公式整理再直接开方）：先将左边 x² + 4x + 4 整理为 (x + 2)² = 16，再开平方得 x + 2 = ±4，解得 x₁ = 2, x₂ = -6。',
      status: 'published'
    },

    {
      questionId: 'quad25_3_16',
      procedureId: 'P01',
      partId: null,
      sortOrder: 15,
      order: 15,
      role: 'primary',
      subType: 'P01_C2_equal_squares_to_linear',
      operationSummary: '对 (3x + 2)² = (5 - 2x)² 两边开平方，转化为 3x + 2 = 5 - 2x 或 3x + 2 = 2x - 5，解得 x₁ = 3/5, x₂ = -7。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_17',
      procedureId: 'P01',
      partId: null,
      sortOrder: 16,
      order: 16,
      role: 'primary',
      subType: 'P01_C2_equal_squares_to_linear',
      operationSummary: '对 (x - 2)² = (2x - 1)² 两边开平方得 x - 2 = ±(2x - 1)，转化为两个一次方程解得 x₁ = -1, x₂ = 1。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_18',
      procedureId: 'P01',
      partId: null,
      sortOrder: 17,
      order: 17,
      role: 'primary',
      subType: 'P01_C2_equal_squares_to_linear',
      operationSummary: '对带系数的平方相等方程 (3x - 1)² = 4(2x + 3)² 两边开平方得 3x - 1 = ±2(2x + 3)，转化为两个一次方程解得 x₁ = -5/7, x₂ = -7。',
      status: 'published'
    },

    // quad25_3_15（多小问题目：四个小问归入 P01，位于 P01 集合末尾 sortOrder=18）
    {
      questionId: 'quad25_3_15',
      procedureId: 'P01',
      partId: '(1)',
      sortOrder: 18,
      order: 18,
      partOrder: 1,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(1)问：3(x + 1)² = 1/3 两边除以 3 得 (x + 1)² = 1/9，开平方得 x + 1 = ±1/3，解得 x₁ = -2/3, x₂ = -4/3。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_15',
      procedureId: 'P01',
      partId: '(2)',
      sortOrder: 18,
      order: 18,
      partOrder: 2,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(2)问：(3x + 2)² = 25 直接开平方得 3x + 2 = ±5，解得 x₁ = 1, x₂ = -7/3。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_15',
      procedureId: 'P01',
      partId: '(3)',
      sortOrder: 18,
      order: 18,
      partOrder: 3,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(3)问：(x + 1)² - 4 = 0 移项得 (x + 1)² = 4，开平方得 x + 1 = ±2，解得 x₁ = 1, x₂ = -3。',
      status: 'published'
    },
    {
      questionId: 'quad25_3_15',
      procedureId: 'P01',
      partId: '(4)',
      sortOrder: 18,
      order: 18,
      partOrder: 4,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(4)问：(2 - x)² - 9 = 0 移项得 (2 - x)² = 9，开平方得 2 - x = ±3，解得 x₁ = -1, x₂ = 5。',
      status: 'published'
    },

    // =========================================================================
    // P02：利用配方法解一元二次方程（共 6 道样本题，严格按 sortOrder 1~6 排列）
    // =========================================================================
    {
      questionId: 'quad25_4_1',
      procedureId: 'P02',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P02_complete_square_transform',
      operationSummary: '将 x² + 6x - 7 = 0 移项得 x² + 6x = 7，两边同加 9 配成完全平方形式 (x + 3)² = 16。',
      status: 'published'
    },
    {
      questionId: 'quad25_4_2',
      procedureId: 'P02',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P02_complete_square_transform',
      operationSummary: '将 x² + 10x - 24 = 0 移项得 x² + 10x = 24，两边同加 25 配成完全平方形式 (x + 5)² = 49。',
      status: 'published'
    },
    {
      questionId: 'quad25_4_3',
      procedureId: 'P02',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P02_complete_square_param',
      operationSummary: '将 x² - 6x - 5 = 0 移项并两边同加 9 化为 (x - 3)² = 14，比对 (x + a)² = b 确定参数 b = 14。',
      status: 'published'
    },
    {
      questionId: 'quad25_4_4',
      procedureId: 'P02',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P02_complete_square_param',
      operationSummary: '将 x² - 8x - 5 = 0 移项并两边同加 16 化为 (x - 4)² = 21，比对 (x + a)² = b 确定参数 a = -4, b = 21。',
      status: 'published'
    },
    {
      questionId: 'quad25_4_8',
      procedureId: 'P02',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P02_complete_square_param',
      operationSummary: '将一般式 x² - 4x + 3 = 0 移项并两边同加 4 配方转化为 (x - 2)² = 1，从而确定 a = -2, b = 1。',
      status: 'published'
    },

    // quad25_4_5（多小问题目：共 2 个小问）
    {
      questionId: 'quad25_4_5',
      procedureId: 'P02',
      partId: '(1)',
      sortOrder: 6,
      order: 6,
      partOrder: 1,
      role: 'primary',
      subType: 'P02_complete_square_solve',
      operationSummary: '第(1)问：x² + 4x - 2 = 0 移项得 x² + 4x = 2，两边加 4 配成 (x + 2)² = 6，再开平方得 x₁ = -2 + √6, x₂ = -2 - √6。',
      status: 'published'
    },
    {
      questionId: 'quad25_4_5',
      procedureId: 'P02',
      partId: '(2)',
      sortOrder: 6,
      order: 6,
      partOrder: 2,
      role: 'primary',
      subType: 'P02_expand_then_complete_square_solve',
      operationSummary: '第(2)问：先将 (t + 3)(t - 1) = 12 左边展开并移项整理得 t² + 2t = 15，两边加 1 配成 (t + 1)² = 16，再开平方得 t₁ = 3, t₂ = -5。',
      status: 'published'
    },

    // =========================================================================
    // P03：利用配方法求代数式的最值（共 5 道样本题，严格按 sortOrder 1~5 排列）
    // =========================================================================
    {
      questionId: 'quad25_4_7',
      procedureId: 'P03',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P03_monic_quadratic_range',
      operationSummary: '将代数式 a² - 4a + 7 拆项配方为 (a - 2)² + 3，利用平方非负性得其值 ≥ 3，判定不可能为 2.8。',
      status: 'published'
    },
    {
      questionId: 'quad25_4_10',
      procedureId: 'P03',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P03_non_monic_quadratic_min',
      operationSummary: '提取二次项系数 8 并在括号内加减 9/16，将 8x² - 12x + 5 配成 8(x - 3/4)² + 1/2 ≥ 1/2，确定当 x = 3/4 时取最小值 1/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_4_6',
      procedureId: 'P03',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P03_substitution_then_complete_square',
      operationSummary: '由 m - n = 3 得 m = n + 3，代入 m(n + 1) 展开得 n² + 4n + 3，配方得 (n + 2)² - 1 ≥ -1，从而确定可能取值为 -1。',
      status: 'published'
    },
    {
      questionId: 'quad25_4_9',
      procedureId: 'P03',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P03_substitution_negative_leading_max',
      operationSummary: '由 a + 2b = 20 得 a = 20 - 2b，代入 ab 得 -2b² + 20b，提取 -2 配方得 -2(b - 5)² + 50 ≤ 50，确定最大值为 50。',
      status: 'published'
    },
    {
      questionId: 'quad25_4_11',
      procedureId: 'P03',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P03_bivariate_independent_complete_square',
      operationSummary: '将 4x² + 2y² - 4y - 4x + 15 的常数项 15 拆分为 1 + 2 + 12，分组配方为 (2x - 1)² + 2(y - 1)² + 12 ≥ 12，确定最小值为 12。',
      status: 'published'
    }
,

    // =========================================================================
    // P04：识别代数式与判断规范书写（共 19 道关联题）
    // =========================================================================
    {
      questionId: 'ch3_1_1_1',
      procedureId: 'P04',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P04_identify_algebraic_expr',
      operationSummary: '逐一排查7个式子中的关系符号，剔除等式 S=ab/2 与不等式 x+y>4，识别出5个代数式。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_2',
      procedureId: 'P04',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P04_identify_algebraic_expr',
      operationSummary: '剔除等式 x+y=2 及不等式 a≠1、x≤3，识别出①0、②a、④x-5、⑤2a 共4个代数式。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_3',
      procedureId: 'P04',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P04_identify_algebraic_expr',
      operationSummary: '在9个式子中剔除含“=”或“<”的②⑤⑧⑨，统计出①③④⑥⑦共5个代数式。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_5',
      procedureId: 'P04',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P04_identify_algebraic_expr',
      operationSummary: '排除等式 a=4、s=100t+5 与不等式 2-b>6，统计出其余5个代数式。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_6',
      procedureId: 'P04',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P04_identify_algebraic_expr',
      operationSummary: '排除 s=1/2ab、m+3=2、2/3>5/7，识别出4个代数式。',
      status: 'published'
    },
    {
      questionId: 'g7_2_16',
      procedureId: 'P04',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P04_identify_algebraic_expr',
      operationSummary: '排除不等式 m+s<2 与等式 S=ab，统计出 n-3、a²b³、1+80%t、-xy 共4个代数式。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_8',
      procedureId: 'P04',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P04_identify_algebraic_expr',
      operationSummary: '仅③ab=ba 含等号不是代数式，其余7个式子（含单独的数、字母及运算式）均为代数式。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_4',
      procedureId: 'P04',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P04_identify_algebraic_expr',
      operationSummary: '排除含等号和不等号的②③⑥，选出属于代数式的序号①④⑤（含常数 π）。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_7',
      procedureId: 'P04',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P04_identify_algebraic_expr',
      operationSummary: '在8个式子中排除等式③与不等式⑦⑧，得出代数式共有5个。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_12',
      procedureId: 'P04',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P04_writing_convention',
      operationSummary: '检查乘号省略、带分数化假分数与除号改分数线，判定 xy 符合书写规范。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_25',
      procedureId: 'P04',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P04_writing_convention',
      operationSummary: '排查除号、数字与字母相乘顺序及带分数系数，选出符合代数式书写格式的选项。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_4',
      procedureId: 'P04',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P04_writing_convention',
      operationSummary: '检查系数 -1 省略 1、带分数化假分数、除号写分数线，判定 6/5y 书写规范。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_10',
      procedureId: 'P04',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P04_writing_convention',
      operationSummary: '检查带分数 2又1/2ab 与系数 -1a²b 的规范性，选出书写规范的2个单项式。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_13',
      procedureId: 'P04',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P04_writing_convention',
      operationSummary: '检查带分数、除号及数字因数在字母前的规则，判定仅 2m/n 符合书写要求。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_14',
      procedureId: 'P04',
      partId: null,
      sortOrder: 15,
      order: 15,
      role: 'primary',
      subType: 'P04_writing_convention',
      operationSummary: '纠正 x÷y 与 1又1/3a 的书写错误，选出格式正确的序号③④。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_11',
      procedureId: 'P04',
      partId: null,
      sortOrder: 16,
      order: 16,
      role: 'primary',
      subType: 'P04_writing_convention',
      operationSummary: '结合带分数化假分数及和差代数式带单位需加括号（(m-2)米）的规则，判定①④符合要求。',
      status: 'published'
    },
    {
      questionId: 'g7_2_18',
      procedureId: 'P04',
      partId: null,
      sortOrder: 17,
      order: 17,
      role: 'primary',
      subType: 'P04_writing_convention',
      operationSummary: '逐一检查6个式子中的乘号省略、除号转分数线与带分数系数，统计出3个规范式子。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_9',
      procedureId: 'P04',
      partId: null,
      sortOrder: 18,
      order: 18,
      role: 'primary',
      subType: 'P04_writing_convention',
      operationSummary: '综合检查6个式子的带分数、乘号、除号及单位括号规范，得出符合要求的有③④。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_12',
      procedureId: 'P04',
      partId: null,
      sortOrder: 19,
      order: 19,
      role: 'primary',
      subType: 'P04_writing_convention',
      operationSummary: '反向排查不符合书写要求的式子（带分数系数、数与数相乘用圆点、出现除号），统计出共3个。',
      status: 'published'
    },

    // =========================================================================
    // P05：根据数量关系列代数式（共 51 道关联题）
    // =========================================================================
    {
      questionId: 'alg_oct30_2',
      procedureId: 'P05',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P05_text_to_expr',
      operationSummary: '按“a的平方的1/3倍”与“b的平方”求差，列出代数式 (1/3)a² - b²。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_2',
      procedureId: 'P05',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P05_text_to_expr',
      operationSummary: '先表示 a、b 的平方和 a²+b² 与积的2倍 2ab，再求差得 a²+b²-2ab。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_1',
      procedureId: 'P05',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P05_expr_meaning',
      operationSummary: '根据运算先后顺序，将 2b² - a 准确叙述为“b的平方的2倍与a的差”。',
      status: 'published'
    },
    {
      questionId: 'g7_2_20',
      procedureId: 'P05',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P05_expr_meaning',
      operationSummary: '区分“平方和的2倍”、“和的平方”与“x的平方与y的平方的2倍的和”，辨析 x²+2y² 的意义。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_3',
      procedureId: 'P05',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P05_expr_meaning',
      operationSummary: '逐项比对代数式与文字语言叙述的运算顺序，找出将“平方和”误述为“和的平方”的错误项。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_12',
      procedureId: 'P05',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P05_text_to_expr',
      operationSummary: '辨析“倒数与y的差”、“与y的平方的差”、“和的倒数”及“倒数的和”，找出列式错误项。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_10',
      procedureId: 'P05',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P05_text_to_expr',
      operationSummary: '综合检查两位数表示(10a+b)、差的倒数、奇偶数表示及三个连续整数表示的正确性。',
      status: 'published'
    },
    {
      questionId: 'g7_2_34',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 8,
      order: 8,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_text_to_expr',
      operationSummary: '第(1)问：先写 n 的3倍为 3n，再写 m 与 3n 的差得 m - 3n。',
      status: 'published'
    },
    {
      questionId: 'g7_2_34',
      procedureId: 'P05',
      partId: '(2)',
      sortOrder: 8,
      order: 8,
      partOrder: 2,
      role: 'primary',
      subType: 'P05_text_to_expr',
      operationSummary: '第(2)问：先写 x 的倒数为 1/x，再加 5 得 1/x + 5。',
      status: 'published'
    },
    {
      questionId: 'g7_2_34',
      procedureId: 'P05',
      partId: '(3)',
      sortOrder: 8,
      order: 8,
      partOrder: 3,
      role: 'primary',
      subType: 'P05_text_to_expr',
      operationSummary: '第(3)问：a与b两数差的平方写为 (a-b)²，加上它们积的2倍得 (a-b)² + 2ab。',
      status: 'published'
    },
    {
      questionId: 'g7_2_29',
      procedureId: 'P05',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P05_real_meaning',
      operationSummary: '结合单价与数量（或速度与时间）模型，为代数式 6m 赋予合理的实际生活意义。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_22',
      procedureId: 'P05',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P05_real_meaning',
      operationSummary: '辨析 4a 的实际意义，指出十位数字为4、个位为a的两位数应为 40+a 而非 4a。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_23',
      procedureId: 'P05',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P05_real_meaning',
      operationSummary: '辨析 3a 的实际意义，指出十位数字3、个位数字a的两位数应表示为 30+a。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_21',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 12,
      order: 12,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_real_meaning',
      operationSummary: '第(1)问：结合梨子每斤6元的单价，解释 50-6a 表示“50元买a斤梨子后剩余的钱数”。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_15',
      procedureId: 'P05',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '根据大串每根5个、小串每根3个，累加列出 m 根大串和 n 根小串所需山楂总数 5m + 3n。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_16',
      procedureId: 'P05',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '由 a 辆17座车满座人数 17a 减去空出的3个座位，列出师生人数 (17a - 3) 人。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_33',
      procedureId: 'P05',
      partId: null,
      sortOrder: 15,
      order: 15,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '用6千克苹果总价 6m 元减去微信余额 40 元，列出还差的钱数 (6m - 40) 元。',
      status: 'published'
    },
    {
      questionId: 'g7_2_28',
      procedureId: 'P05',
      partId: null,
      sortOrder: 16,
      order: 16,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '利用顺水速度 = 静水速度 + 水流速度 = a+3，乘航行时间2小时得距离 (2a + 6) 千米。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_18',
      procedureId: 'P05',
      partId: null,
      sortOrder: 17,
      order: 17,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '进价 a 元先提价 30% 得 (1+0.3)a，再降价 20% 乘 (1-0.2)，化简得最终售价 1.04a 元。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_17',
      procedureId: 'P05',
      partId: null,
      sortOrder: 18,
      order: 18,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '分段计算前3天费用 0.5×3 与超3天费用 0.7(x-3)，合并化简得 y = 0.7x - 0.6。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_19',
      procedureId: 'P05',
      partId: null,
      sortOrder: 19,
      order: 19,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '用混合糖果总价 (3m+18n) 除以总千克数 (n+3)，列出平均单价 (3m+18n)/(n+3)。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_20',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 20,
      order: 20,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '第(1)问：甲乙速度和为 (a+b) 千米/时，乘2小时列出共行路程 (2a + 2b) 千米。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_20',
      procedureId: 'P05',
      partId: '(2)',
      sortOrder: 20,
      order: 20,
      partOrder: 2,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '第(2)问：用总路程 s 减去3小时共行路程 3(a+b)，列出相距路程 (s - 3a - 3b) 千米。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_20',
      procedureId: 'P05',
      partId: '(3)',
      sortOrder: 20,
      order: 20,
      partOrder: 3,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '第(3)问：根据4小时正好相遇，写出路程数量关系式 s = 4a + 4b。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_30',
      procedureId: 'P05',
      partId: null,
      sortOrder: 21,
      order: 21,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '逐步用含 x 的代数式跟踪三步扑克牌张数转移，发现最终 B 手中牌数消去 x 恒为 15。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_6',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 22,
      order: 22,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '第(1)问：根据路程单价与按车速折算的时间单价，列出 m 千米时 T3 出行总费用 1.6m + 0.6m = 2.2m 元。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_21',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 23,
      order: 23,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '第(1)问：分别按 A 公司（教师全价学生半价）和 B 公司（全员六折）收费规则列出含 a 的费用代数式。',
      status: 'published'
    },
    {
      questionId: 'g7_2_15',
      procedureId: 'P05',
      partId: '(2)①',
      sortOrder: 24,
      order: 24,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '第(2)①问：用含 a 的代数式分别表示降价后每套利润 (40-10a) 元、日销量 (200+100a) 套及日总利润。',
      status: 'published'
    },
    {
      questionId: 'g7_2_39',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 25,
      order: 25,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '第(1)问：按方案一全场九折计算30套西服与 x 条领带总价，化简得 18900 + 54x。',
      status: 'published'
    },
    {
      questionId: 'g7_2_39',
      procedureId: 'P05',
      partId: '(2)',
      sortOrder: 25,
      order: 25,
      partOrder: 2,
      role: 'primary',
      subType: 'P05_real_word_problem',
      operationSummary: '第(2)问：按方案二买30套西服送30条领带，仅对多出的 (x-30) 条领带计费，化简得 19200 + 60x。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_18',
      procedureId: 'P05',
      partId: null,
      sortOrder: 26,
      order: 26,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '逐项列出线段和、长方形周长 2(3+a) 与面积，选出能用 2a+6 表示的几何图形。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_7',
      procedureId: 'P05',
      partId: null,
      sortOrder: 27,
      order: 27,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '分别列出三角形周长、长方体体积、长方形周长与多边形周长，选出能用 2(a+6) 表示的图形。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_4',
      procedureId: 'P05',
      partId: null,
      sortOrder: 28,
      order: 28,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '将18个正方形面积 18m² 与8个等边三角形面积 8×(1/2)mn 相加，化简得印章表面积 18m² + 4mn。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_6',
      procedureId: 'P05',
      partId: null,
      sortOrder: 29,
      order: 29,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '长20米、宽10米空地四面留宽 x 米小路，内部菜地长宽分别为 (20-2x) 与 (10-2x)，相乘得面积。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_9',
      procedureId: 'P05',
      partId: null,
      sortOrder: 30,
      order: 30,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '运用多种割补方式（横竖分割相加、大长方形减缺角）列 L 形截面面积代数式并判断正误。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_11',
      procedureId: 'P05',
      partId: null,
      sortOrder: 31,
      order: 31,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '将上部半圆面积 (1/2)πx²、下部两个长方形面积 2yz 与正方形面积 y² 相加列出窗户总面积。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_13',
      procedureId: 'P05',
      partId: null,
      sortOrder: 32,
      order: 32,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '扣除正方体8个顶点重复计数，用 12(m-2) + 8 化简得出正方体12条棱上的小球总数 12m - 16。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_14',
      procedureId: 'P05',
      partId: null,
      sortOrder: 33,
      order: 33,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '用正方形面积 a² 减去两个直角三角形面积 (1/2)a² 与 (1/2)×4b，得阴影面积 (1/2)a² - 2b。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_15',
      procedureId: 'P05',
      partId: null,
      sortOrder: 34,
      order: 34,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '用长方形 ABCD 面积减去周围三个直角三角形面积并化简，用含 x 的代数式表示阴影面积。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_5',
      procedureId: 'P05',
      partId: null,
      sortOrder: 35,
      order: 35,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '先列出阴影部分面积代数式 a²/2 - bc/2，再按清代数学符号规则转化为对应记号。',
      status: 'published'
    },
    {
      questionId: 'g7_2_22',
      procedureId: 'P05',
      partId: null,
      sortOrder: 36,
      order: 36,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '用外圆面积减内圆面积得圆环底面积 π(R² - r²)，再乘钢管长度 a 列出体积公式。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_16',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 37,
      order: 37,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：将长方形、正方形、三角形面积相加再减去圆的面积，列出阴影部分面积代数式。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_16',
      procedureId: 'P05',
      partId: '(2)',
      sortOrder: 37,
      order: 37,
      partOrder: 2,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(2)问：逆向拆解代数式 x² + (1/2)xy - (1/4)πx² 的各项几何意义，设计组合图形。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_17',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 38,
      order: 38,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：分别用割补差法与长方形长乘宽表示剪拼前后的面积 S₁ = a² - b² 与 S₂ = (a+b)(a-b)。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_17',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 39,
      order: 39,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：根据长方体箱子两个方向的打包带走线，列出并化简总长 l₁ = 4a+2b+180 与 l₂ = 2a+4b+180。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_7',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 40,
      order: 40,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：由长方形宽 AB=5 减去 AE=x，用代数式表示线段 BE = 5 - x。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_7',
      procedureId: 'P05',
      partId: '(2)',
      sortOrder: 40,
      order: 40,
      partOrder: 2,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(2)问：用长方形总面积减去两个空白直角三角形面积，化简得出阴影面积 3x + 15。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_13',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 41,
      order: 41,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：将两段半圆弯道合为一个整圆周长 2πr，加上两段直道 2l，列出跑道周长 2πr + 2l。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_26',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 42,
      order: 42,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：用长方形面积 ab 减去两个剪去的小直角三角形面积，得 S = ab - (3/2)a - c。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_27',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 43,
      order: 43,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '前半问：用长方形面积减整圆面积得阴影面积 S = 2a - π，用两长边加圆周长列出周长 l = 2π + 2a。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_28',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 44,
      order: 44,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：利用容斥原理（或平移拼合）从长方形面积中减去两条小路并加上重叠正方形，得 (ab - a - b + 1)。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_29',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 45,
      order: 45,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：四个顶点扇形合为一个半径为 a 的整圆，用长方形面积减圆面积得 S = 2ab - πa²。',
      status: 'published'
    },
    {
      questionId: 'g7_2_6',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 46,
      order: 46,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：利用T形石板路宽为 1m、总面积为 31m²，用含 x 的代数式表示 EF = (x-1)/2 与 BE = 31-x。',
      status: 'published'
    },
    {
      questionId: 'g7_2_8',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 47,
      order: 47,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：用大正方形面积 a² 减去小长方形面积 xy 和两个小直角三角形面积 xy，得 a² - 2xy。',
      status: 'published'
    },
    {
      questionId: 'g7_2_9',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 48,
      order: 48,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：将下部4个小正方形面积 4a² 与上部半圆面积 (1/2)πa² 相加表示窗户面积。',
      status: 'published'
    },
    {
      questionId: 'g7_2_9',
      procedureId: 'P05',
      partId: '(2)',
      sortOrder: 48,
      order: 48,
      partOrder: 2,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(2)问：统计下部窗框 15 条长为 a 的线段与上部半圆弧长 πa，列出材料总长 15a + πa。',
      status: 'published'
    },
    {
      questionId: 'g7_2_10',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 49,
      order: 49,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：将直径为 a 的半圆面积 (1/8)πa² 与长方形面积 2ab 相加表示所需玻璃面积。',
      status: 'published'
    },
    {
      questionId: 'g7_2_10',
      procedureId: 'P05',
      partId: '(2)',
      sortOrder: 49,
      order: 49,
      partOrder: 2,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(2)问：累加竖框 6b、横框 3a 与半圆弧长 (1/2)πa，列出所需铝合金总长。',
      status: 'published'
    },
    {
      questionId: 'g7_2_12',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 50,
      order: 50,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：扣除通道宽度后，用含 a 的代数式表示单个停车区长 (62-2a)m 与宽 (9 - 1/2a)m。',
      status: 'published'
    },
    {
      questionId: 'g7_2_37',
      procedureId: 'P05',
      partId: '(1)',
      sortOrder: 51,
      order: 51,
      partOrder: 1,
      role: 'primary',
      subType: 'P05_geometry_expr',
      operationSummary: '第(1)问：将3个长方形、2个正方形和3个四分之一圆的面积相加，列出字母“E”的面积 3ab + 2b² + (3/4)πb²。',
      status: 'published'
    },

    // =========================================================================
    // P06：从数字与图形规律中归纳代数式（共 18 道关联题）
    // =========================================================================
    {
      questionId: 'ch3_1_2_8',
      procedureId: 'P06',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P06_arithmetic_pattern',
      operationSummary: '第一排 a 个座位，后一排比前一排多2个，第 n 排比第一排多 (n-1) 个2，归纳得 a + 2(n-1)。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_18',
      procedureId: 'P06',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P06_arithmetic_pattern',
      operationSummary: '列出搭1~4个三角形需 3, 5, 7, 9 根牙签，拆解为 2n + 1 归纳出搭 n 个三角形所需牙签数。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_19',
      procedureId: 'P06',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P06_arithmetic_pattern',
      operationSummary: '由前3个图案小正方形个数 4, 7, 10 每次增加3，拆解为 4 + 3(n-1) 归纳得 3n + 1。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_20',
      procedureId: 'P06',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P06_arithmetic_pattern',
      operationSummary: '由前4个图案棋子数 2, 5, 8, 11 每次增加3，拆解为 2 + 3(n-1) 归纳得 3n - 1。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_32',
      procedureId: 'P06',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P06_arithmetic_pattern',
      operationSummary: '由前4个小彩旗棋子数 4, 7, 10, 13 归纳出第 n 个图形为 3n + 1，代入 n=76 算得 229 枚。',
      status: 'published'
    },
    {
      questionId: 'g7_2_27',
      procedureId: 'P06',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P06_arithmetic_pattern',
      operationSummary: '由前3个图形三角形个数 2, 8, 14（公差6）归纳出 2 + 6(n-1)，代入 n=8 算得 44 个。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_24',
      procedureId: 'P06',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P06_arithmetic_pattern',
      operationSummary: '1个圆环长8cm，每多扣1个增加 (8-2)=6cm，归纳出 x 个圆环长 y = 6x + 2，代入 x=99 得 596。',
      status: 'published'
    },
    {
      questionId: 'g7_2_11',
      procedureId: 'P06',
      partId: '(1)',
      sortOrder: 8,
      order: 8,
      partOrder: 1,
      role: 'primary',
      subType: 'P06_arithmetic_pattern',
      operationSummary: '第(1)问：观察剪切图得出剪2次分成7段、剪3次分成10段。',
      status: 'published'
    },
    {
      questionId: 'g7_2_11',
      procedureId: 'P06',
      partId: '(2)',
      sortOrder: 8,
      order: 8,
      partOrder: 2,
      role: 'primary',
      subType: 'P06_arithmetic_pattern',
      operationSummary: '第(2)问：由 4=3×1+1、7=3×2+1、10=3×3+1 归纳出剪 a 次分成段数 b = 3a + 1。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_21',
      procedureId: 'P06',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P06_quadratic_pattern',
      operationSummary: '将前4个图形梅花数 5, 8, 13, 20 拆解为 1²+4, 2²+4, 3²+4, 4²+4，归纳出第 n 个图形为 (n² + 4) 朵。',
      status: 'published'
    },
    {
      questionId: 'g7_2_23',
      procedureId: 'P06',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P06_equation_pattern',
      operationSummary: '将等式序列 9-1=8, 16-4=12, 25-9=16 改写为 3²-1²=4×1+4, 4²-2²=4×2+4，归纳出 (n+2)² - n² = 4n + 4。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_22',
      procedureId: 'P06',
      partId: '(1)',
      sortOrder: 11,
      order: 11,
      partOrder: 1,
      role: 'primary',
      subType: 'P06_point_array_pattern',
      operationSummary: '第(1)问：由三角形点阵前5行点数 1, 3, 5, 7, 9（连续奇数），算得第6行11个、第10行19个，第 n 行 (2n-1) 个。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_22',
      procedureId: 'P06',
      partId: '(2)',
      sortOrder: 11,
      order: 11,
      partOrder: 2,
      role: 'primary',
      subType: 'P06_point_array_pattern',
      operationSummary: '第(2)问：由前 n 行连续奇数之和 1+3+5+…+(2n-1) 归纳得 n²，并由 n²=75 无正整数解判定不可能为75。',
      status: 'published'
    },
    {
      questionId: 'g7_2_0',
      procedureId: 'P06',
      partId: '(1)',
      sortOrder: 12,
      order: 12,
      partOrder: 1,
      role: 'primary',
      subType: 'P06_point_array_pattern',
      operationSummary: '第(1)问：观察堆砌小钢管横截面，依次算出 n=1,2,3,4 时钢管总数为 3, 9, 18, 30。',
      status: 'published'
    },
    {
      questionId: 'g7_2_0',
      procedureId: 'P06',
      partId: '(2)',
      sortOrder: 12,
      order: 12,
      partOrder: 2,
      role: 'primary',
      subType: 'P06_point_array_pattern',
      operationSummary: '第(2)问：提炼第 n 个图钢管总数规律 3×(1+2+…+n) = 3n(n+1)/2，代入 n=25 求得总数。',
      status: 'published'
    },
    {
      questionId: 'g7_2_13',
      procedureId: 'P06',
      partId: '(1)',
      sortOrder: 13,
      order: 13,
      partOrder: 1,
      role: 'primary',
      subType: 'P06_sum_pattern',
      operationSummary: '第(1)问：根据长方形拼图规律 2(1+2+…+n)，计算第7个图形正方形纸片数为 2×(1+2+…+7) = 56。',
      status: 'published'
    },
    {
      questionId: 'g7_2_13',
      procedureId: 'P06',
      partId: '(2)',
      sortOrder: 13,
      order: 13,
      partOrder: 2,
      role: 'primary',
      subType: 'P06_sum_pattern',
      operationSummary: '第(2)问：利用长方形长宽（n 与 n+1）归纳连续偶数和公式 2+4+6+…+2n = n(n+1)。',
      status: 'published'
    },
    {
      questionId: 'g7_2_13',
      procedureId: 'P06',
      partId: '(3)',
      sortOrder: 13,
      order: 13,
      partOrder: 3,
      role: 'primary',
      subType: 'P06_sum_pattern',
      operationSummary: '第(3)问：应用归纳出的公式 n(n+1) 分别计算从2到600的和以及从202到600的分段和。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_23',
      procedureId: 'P06',
      partId: '(1)',
      sortOrder: 14,
      order: 14,
      partOrder: 1,
      role: 'primary',
      subType: 'P06_sum_pattern',
      operationSummary: '第(1)问：通过两个相同三角形点阵倒放拼成 n 行 (n+1) 列的平行四边形，推导 1+2+…+n = n(n+1)/2。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_23',
      procedureId: 'P06',
      partId: '(2)',
      sortOrder: 14,
      order: 14,
      partOrder: 2,
      role: 'primary',
      subType: 'P06_sum_pattern',
      operationSummary: '第(2)问：观察正方形图块与立方和算式的对应规律，归纳出 1³+2³+…+n³ = [n(n+1)/2]²。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_23',
      procedureId: 'P06',
      partId: '(3)',
      sortOrder: 14,
      order: 14,
      partOrder: 3,
      role: 'primary',
      subType: 'P06_sum_pattern',
      operationSummary: '第(3)问：将归纳出的立方和与自然数和公式代入 n=100 的分式中约分求值，得 5050。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_22',
      procedureId: 'P06',
      partId: '(1)',
      sortOrder: 15,
      order: 15,
      partOrder: 1,
      role: 'primary',
      subType: 'P06_geometric_series_pattern',
      operationSummary: '第(1)问：结合正方形每次分割一半的面积剩余模型，归纳出 1/2 + 1/4 + … + 1/2¹⁰ = 1 - 1/2¹⁰。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_22',
      procedureId: 'P06',
      partId: '(2)',
      sortOrder: 15,
      order: 15,
      partOrder: 2,
      role: 'primary',
      subType: 'P06_geometric_series_pattern',
      operationSummary: '第(2)问：运用错位相减法（2S - S）消去中间项，严格证明并归纳出 1/2 + … + 1/2ⁿ = 1 - 1/2ⁿ。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_22',
      procedureId: 'P06',
      partId: '(3)',
      sortOrder: 15,
      order: 15,
      partOrder: 3,
      role: 'primary',
      subType: 'P06_geometric_series_pattern',
      operationSummary: '第(3)问：利用前 n 项和减去前 10 项和，求出 (1/2)¹¹ + … + (1/2)ⁿ = 1/2¹⁰ - 1/2ⁿ。',
      status: 'published'
    },
    {
      questionId: 'g7_2_14',
      procedureId: 'P06',
      partId: '(2)',
      sortOrder: 16,
      order: 16,
      partOrder: 1,
      role: 'primary',
      subType: 'P06_table_pattern',
      operationSummary: '第(2)问：统计4条直线分割圆面的最多交点数 x=6 与最多平面区域数 y=11。',
      status: 'published'
    },
    {
      questionId: 'g7_2_14',
      procedureId: 'P06',
      partId: '(3)',
      sortOrder: 16,
      order: 16,
      partOrder: 2,
      role: 'primary',
      subType: 'P06_table_pattern',
      operationSummary: '第(3)问：对比表中 m, n, t 四组数据（2-1-0=1, 4-2-1=1, 7-3-3=1, 11-4-6=1），归纳出数量关系 t - m - n = 1。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_1',
      procedureId: 'P06',
      partId: null,
      sortOrder: 17,
      order: 17,
      role: 'primary',
      subType: 'P06_periodic_sequence_pattern',
      operationSummary: '计算递推绝对值序列前几项 0, -1, -1, -2, -2, -3, -3…，归纳出奇偶下标与数值的对应规律求 a₂₀₂₅。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_23',
      procedureId: 'P06',
      partId: null,
      sortOrder: 18,
      order: 18,
      role: 'primary',
      subType: 'P06_periodic_sequence_pattern',
      operationSummary: '按差倒数公式依次算出 a₁=-1/3, a₂=3/4, a₃=4, a₄=-1/3，发现每3项一循环，利用 2025÷3 余数求值。',
      status: 'published'
    },

    // =========================================================================
    // P07：判断与表示正、反比例关系（共 21 道关联题）
    // =========================================================================
    {
      questionId: 'ch3_1_3_1',
      procedureId: 'P07',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '逐一检验4组变量的比值或乘积，判定三角形面积一定时底边与高乘积一定，成反比例关系。',
      status: 'published'
    },
    {
      questionId: 'g7_2_30',
      procedureId: 'P07',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '检验单价一定、等腰三角形周长一定、三角形面积一定、圆周长与半径四组关系，选出成反比例的③。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_4',
      procedureId: 'P07',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '分别检验比值一定（正比例）与乘积一定（反比例），判断铺地面积与块数、速度与时间等4个说法的正误。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_5',
      procedureId: 'P07',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '由圆锥体积一定底面积乘高一定、三角形面积一定底乘高一定，选出成反比例关系的①②。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_6',
      procedureId: 'P07',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '识别“被减数 - 差 = 减数（差一定）”不是乘积一定，选出不成反比例关系的选项。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_9',
      procedureId: 'P07',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '对比总价一定时单价×数量=定值（反比例）与路程÷时间=定值（正比例）、正方形面积=边长²，选出反比例项。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_10',
      procedureId: 'P07',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '结合相反数、倒数、绝对值性质，并根据面积一定底×高=定值、互为倒数 ab=1（乘积一定）判定成反比例关系。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_11',
      procedureId: 'P07',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '识别总钱数一定时买苹果金额与买香蕉金额是“和一定”而非“乘积一定”，选出不成反比例的选项。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_12',
      procedureId: 'P07',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '根据百米赛跑路程（100米）一定，平均速度×跑步时间=100（乘积一定），选出体现反比例关系的选项。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_13',
      procedureId: 'P07',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '写出四个选项的函数/等式关系，识别 V=25h 比值一定为正比例关系，不是反比例关系。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_14',
      procedureId: 'P07',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '区分路程一定速度×时间（反比例）、长方体体积一定底面积×高（反比例）与总费用一定两项费用之和。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_19',
      procedureId: 'P07',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '检验四个选项是否满足 x·y=k（定值），选出100米短跑中平均速度与时间成反比例关系的选项。',
      status: 'published'
    },
    {
      questionId: 'g7_2_17',
      procedureId: 'P07',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '由 S=(1/2)ah 知三角形面积一定时底边与高乘积为 2S（定值），判定成反比例关系。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_3',
      procedureId: 'P07',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P07_proportion_equation',
      operationSummary: '根据杠杆原理“阻力×阻力臂 = 动力×动力臂”得 lF = 1100×0.5 = 550，变形为 F = 550/l 并判定反比例关系。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_7',
      procedureId: 'P07',
      partId: null,
      sortOrder: 15,
      order: 15,
      role: 'primary',
      subType: 'P07_proportion_calc',
      operationSummary: '由 x, y 成反比例得乘积恒定 xy = 4×6 = 24，代入 x=3 算得 y = 8。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_8',
      procedureId: 'P07',
      partId: null,
      sortOrder: 16,
      order: 16,
      role: 'primary',
      subType: 'P07_proportion_calc',
      operationSummary: '由表中 x=2.5, y=4 算得反比例乘积定值 k = 10，代入 (5/8)m = 10 解得 m = 16。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_2',
      procedureId: 'P07',
      partId: null,
      sortOrder: 17,
      order: 17,
      role: 'primary',
      subType: 'P07_proportion_calc',
      operationSummary: '由 U=IR 知电压 U 恒定时 R 与 I 成反比例；代入 R=100, I=2.2 得 U=220，再代入 I=2.5 求得 R=88。',
      status: 'published'
    },
    {
      questionId: 'op_oct30_13',
      procedureId: 'P07',
      partId: '(1)',
      sortOrder: 18,
      order: 18,
      partOrder: 1,
      role: 'primary',
      subType: 'P07_proportion_calc',
      operationSummary: '第(1)问：由甲每天看15页、8天看完算得总页数 120 页，再除以乙、丙每天页数补全表格（6天、4天）。',
      status: 'published'
    },
    {
      questionId: 'op_oct30_13',
      procedureId: 'P07',
      partId: '(2)',
      sortOrder: 18,
      order: 18,
      partOrder: 2,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '第(2)问：指出书的总页数不变，每天看的页数×看完所需天数=总页数（定值），故成反比例关系。',
      status: 'published'
    },
    {
      questionId: 'op_oct30_13',
      procedureId: 'P07',
      partId: '(3)',
      sortOrder: 18,
      order: 18,
      partOrder: 3,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '第(3)问：指出已看页数+剩下页数=总页数（和一定而非乘积一定），故不成反比例关系。',
      status: 'published'
    },
    {
      questionId: 'g7_2_35',
      procedureId: 'P07',
      partId: '(1)',
      sortOrder: 19,
      order: 19,
      partOrder: 1,
      role: 'primary',
      subType: 'P07_proportion_equation',
      operationSummary: '第(1)问：由长方形周长 2(x+y)=10 整理得出相邻两边关系式 y = 5 - x。',
      status: 'published'
    },
    {
      questionId: 'g7_2_35',
      procedureId: 'P07',
      partId: '(2)',
      sortOrder: 19,
      order: 19,
      partOrder: 2,
      role: 'primary',
      subType: 'P07_proportion_equation',
      operationSummary: '第(2)问：由长方形面积 xy=10 整理得出相邻两边关系式 y = 10/x。',
      status: 'published'
    },
    {
      questionId: 'g7_2_35',
      procedureId: 'P07',
      partId: '(3)',
      sortOrder: 19,
      order: 19,
      partOrder: 3,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '第(3)问：对比周长一定（x+y=定值，和一定不成反比例）与面积一定（xy=定值，乘积一定成反比例）。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_5',
      procedureId: 'P07',
      partId: '(1)',
      sortOrder: 20,
      order: 20,
      partOrder: 1,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '第(1)问：列出 y=5x，由比值 y/x=5（定值）判定山楂总数 y 与串数 x 成正比例关系。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_5',
      procedureId: 'P07',
      partId: '(2)',
      sortOrder: 20,
      order: 20,
      partOrder: 2,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '第(2)问：列出 m=200/n（即 mn=200，乘积一定），判定每串个数 m 与总串数 n 成反比例关系。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_15',
      procedureId: 'P07',
      partId: '(1)',
      sortOrder: 21,
      order: 21,
      partOrder: 1,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '第(1)问：每周产量为 7m，生产总量 y=mt 与时间 t 比值为定值 m，判定成正比例关系。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_3_15',
      procedureId: 'P07',
      partId: '(3)①',
      sortOrder: 21,
      order: 21,
      partOrder: 2,
      role: 'primary',
      subType: 'P07_identify_proportion',
      operationSummary: '第(3)①问：由完成剩余70000个产品所需时间 t = 70000/(am) 知 t·a = 70000/m（定值），判定 t 与 a 成反比例。',
      status: 'published'
    },

    // =========================================================================
    // P08：代入字母数值求代数式的值（共 48 道关联题）
    // =========================================================================
    {
      questionId: 'g7_2_19',
      procedureId: 'P08',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P08_direct_substitution',
      operationSummary: '直接将 x=1, y=2 代入 4x - 3y + 1，计算 4×1 - 3×2 + 1 得 -1。',
      status: 'published'
    },
    {
      questionId: 'g7_2_32',
      procedureId: 'P08',
      partId: '(1)',
      sortOrder: 2,
      order: 2,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_direct_substitution',
      operationSummary: '第(1)问：将 a=6, b=-2 加括号代入 2a² - b，算得 2×6² - (-2) = 74。',
      status: 'published'
    },
    {
      questionId: 'g7_2_32',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 2,
      order: 2,
      partOrder: 2,
      role: 'primary',
      subType: 'P08_direct_substitution',
      operationSummary: '第(2)问：将 a=6, b=-2 加括号代入 a² + b² + 2ab，算得 36 + 4 - 24 = 16。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_11',
      procedureId: 'P08',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P08_simplify_then_substitute',
      operationSummary: '先去括号合并同类项化简为 y² - xy，再将 x=-1, y=2 加括号代入算得 2² - (-1)×2 = 6。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_9',
      procedureId: 'P08',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P08_solve_letter_then_substitute',
      operationSummary: '先由单项式次数为4及同类项定义求出 m=2, n=0，再代入 nᵐ 算得 0² = 0。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_1',
      procedureId: 'P08',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P08_nonnegative_then_substitute',
      operationSummary: '由绝对值非负性 |x-2|+|2y-6|=0 得 x=2, y=3，代入 y - x 算得 1。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_8',
      procedureId: 'P08',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P08_nonnegative_then_substitute',
      operationSummary: '由偶次方与绝对值非负性 (x-3)²+|y-5|=0 得 x=3, y=5，代入 x - y 算得 -2。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_35',
      procedureId: 'P08',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P08_nonnegative_then_substitute',
      operationSummary: '由平方式与算术平方根非负性 (m-4)²+√(n+5)=0 得 m=4, n=-5，代入 (m+n)² 算得 1。',
      status: 'published'
    },
    {
      questionId: 'g7_2_25',
      procedureId: 'P08',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P08_special_number_then_substitute',
      operationSummary: '由最小正整数、距原点为2的负数、最大负整数确定 a=1, b=-2, c=-1，代入 a+b-c 算得 0。',
      status: 'published'
    },
    {
      questionId: 'g7_2_26',
      procedureId: 'P08',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P08_solve_letter_then_substitute',
      operationSummary: '利用三阶幻方每行、列、对角线三数之和相等求出 x=2, y=-2，代入 xy 算得 -4。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_10',
      procedureId: 'P08',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P08_abs_case_then_substitute',
      operationSummary: '由相反数得 x=-3，由 |y|=4 及 x+y<0 筛选出 y=-4，代入 x - y 算得 -3 - (-4) = 1。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_2',
      procedureId: 'P08',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P08_abs_case_then_substitute',
      operationSummary: '由 |a|=4, |b|=6 且 a>b 确定 a=±4, b=-6，分两种情况代入 a+b 算得 -2 或 -10。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_16',
      procedureId: 'P08',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P08_abs_case_then_substitute',
      operationSummary: '由 |x|=3, |y|=2 及 |x+y|=x+y≥0 确定 x=3, y=±2，分情况代入 x-y 算得 1 或 5。',
      status: 'published'
    },
    {
      questionId: 'op_oct30_21',
      procedureId: 'P08',
      partId: '(1)',
      sortOrder: 13,
      order: 13,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_abs_case_then_substitute',
      operationSummary: '第(1)问：由 |a|=5, |b|=3 且 a<0, b>0 确定 a=-5, b=3，代入 a-b 算得 -8。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_5',
      procedureId: 'P08',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P08_solve_letter_then_substitute',
      operationSummary: '由 2025 个 ±1 的和为 25 算出含 1025 个 1 和 1000 个 -1，分别代入 (xᵢ-1)² 求和得 4000。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_7',
      procedureId: 'P08',
      partId: null,
      sortOrder: 15,
      order: 15,
      role: 'primary',
      subType: 'P08_new_operation_substitute',
      operationSummary: '对照新运算定义 x⊗y = xy/(x+y)，将 x=2, y=-3 代入公式算得 (-6)/(-1) = 6。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_9',
      procedureId: 'P08',
      partId: null,
      sortOrder: 16,
      order: 16,
      role: 'primary',
      subType: 'P08_new_operation_substitute',
      operationSummary: '对照新运算定义 a⊙b = a(a+b)+1，将 a=3, b=-2 代入算得 3×(3-2)+1 = 4。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_15',
      procedureId: 'P08',
      partId: '(1)',
      sortOrder: 17,
      order: 17,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_flowchart_substitute',
      operationSummary: '第(1)问：将 a=b 代入验证输出是否为 0，并检验 a>b 与 a<b 时的符号，选出符合流程图的②a-b。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_15',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 17,
      order: 17,
      partOrder: 2,
      role: 'primary',
      subType: 'P08_flowchart_substitute',
      operationSummary: '第(2)问：由给定算例归纳出流程图分支表达式 A 为 |a|+|b|，B 为 -||a|-|b||。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_15',
      procedureId: 'P08',
      partId: '(3)',
      sortOrder: 17,
      order: 17,
      partOrder: 3,
      role: 'primary',
      subType: 'P08_flowchart_substitute',
      operationSummary: '第(3)问：根据 -1<2024 选择对应分支代入算得 (-1)※2024 = -2023，并逆推 2024※x=2025 解得 x=±1。',
      status: 'published'
    },
    {
      questionId: 'g7_2_33',
      procedureId: 'P08',
      partId: '(1)',
      sortOrder: 18,
      order: 18,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_flowchart_substitute',
      operationSummary: '第(1)问：根据输出代数式 2(x+1)² 的运算顺序，写出数值转换机的三步操作：+1、平方、×2。',
      status: 'published'
    },
    {
      questionId: 'g7_2_33',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 18,
      order: 18,
      partOrder: 2,
      role: 'primary',
      subType: 'P08_flowchart_substitute',
      operationSummary: '第(2)问：将 x=-4 代入 2(x+1)²，算得 2×(-3)² = 18。',
      status: 'published'
    },
    {
      questionId: 'g7_2_33',
      procedureId: 'P08',
      partId: '(3)',
      sortOrder: 18,
      order: 18,
      partOrder: 3,
      role: 'primary',
      subType: 'P08_flowchart_substitute',
      operationSummary: '第(3)问：将输出 y=13 代入图(a)关系式 (3x²-1)/2 = 13，逆向解得输入值 x = ±3。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_31',
      procedureId: 'P08',
      partId: '(1)',
      sortOrder: 19,
      order: 19,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_direct_substitution',
      operationSummary: '第(1)问：用 -x 替换 x 检验式子值是相等还是互为相反数，辨识出偶代数式①③与奇代数式②。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_31',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 19,
      order: 19,
      partOrder: 2,
      role: 'primary',
      subType: 'P08_direct_substitution',
      operationSummary: '第(2)问：分别将 x=2 与 x=-2 代入 -x³+x，算得整式的值分别为 -6 与 6。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_31',
      procedureId: 'P08',
      partId: '(3)',
      sortOrder: 19,
      order: 19,
      partOrder: 3,
      role: 'primary',
      subType: 'P08_direct_substitution',
      operationSummary: '第(3)问：利用奇代数式在相反数处取值互为相反数相互抵消、偶代数式取值加倍的性质，代入计算9个值之和。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_6',
      procedureId: 'P08',
      partId: null,
      sortOrder: 20,
      order: 20,
      role: 'primary',
      subType: 'P08_flowchart_periodic_substitute',
      operationSummary: '从 x=7 开始按奇偶分支逐次代入计算，发现从第2次起按“6,3,8,4,2,1”每6次一循环，求得第2025次输出为 8。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_14',
      procedureId: 'P08',
      partId: null,
      sortOrder: 21,
      order: 21,
      role: 'primary',
      subType: 'P08_flowchart_periodic_substitute',
      operationSummary: '按程序框图从 a=6 起逐次代入计算输出序列，定位循环周期后求出第 2024 次输出的结果。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_34',
      procedureId: 'P08',
      partId: null,
      sortOrder: 22,
      order: 22,
      role: 'primary',
      subType: 'P08_flowchart_periodic_substitute',
      operationSummary: '从 x=14 起按奇偶分支代入计算，发现从第3次起按“5,8,4,2,1”循环，求得第 2025 次输出为 4。',
      status: 'published'
    },
    {
      questionId: 'g7_2_24',
      procedureId: 'P08',
      partId: null,
      sortOrder: 23,
      order: 23,
      role: 'primary',
      subType: 'P08_flowchart_periodic_substitute',
      operationSummary: '从 x=16 起逐次代入程序框图，找出“4,2,1,6,3,8”6次循环周期，求得第 2022 次输出为 8。',
      status: 'published'
    },
    {
      questionId: 'g7_2_2',
      procedureId: 'P08',
      partId: null,
      sortOrder: 24,
      order: 24,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '将体重 m=64、身高 h=1.6 代入体质指数公式 BMI = m/h² 算得 25，对照标准表判定为偏胖。',
      status: 'published'
    },
    {
      questionId: 'g7_2_5',
      procedureId: 'P08',
      partId: null,
      sortOrder: 25,
      order: 25,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '将圆半径 r=7 代入经验公式 r = 0.14/d，解得小明的步差 d = 0.02 米。',
      status: 'published'
    },
    {
      questionId: 'g7_2_7',
      procedureId: 'P08',
      partId: null,
      sortOrder: 26,
      order: 26,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '根据包裹重量 x=4 千克匹配 1<x≤5 分段计费公式 10+4(x-1)，代入 x=4 算得运费 22 元。',
      status: 'published'
    },
    {
      questionId: 'g7_2_1',
      procedureId: 'P08',
      partId: null,
      sortOrder: 27,
      order: 27,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '先将表中 c=0, f=32 代入 f=1.8c+a 求出常数 a=32，再代入 c=100 算得 b = 212。',
      status: 'published'
    },
    {
      questionId: 'g7_2_3',
      procedureId: 'P08',
      partId: null,
      sortOrder: 28,
      order: 28,
      role: 'primary',
      subType: 'P08_special_value_substitute',
      operationSummary: '赋值令 x=1 代入二项展开式 (2x+1)⁵，直接求出各项系数之和 a₅+a₄+a₃+a₂+a₁+a₀ = 3⁵ = 243。',
      status: 'published'
    },
    {
      questionId: 'g7_2_4',
      procedureId: 'P08',
      partId: null,
      sortOrder: 29,
      order: 29,
      role: 'primary',
      subType: 'P08_special_value_substitute',
      operationSummary: '先令 x=0 代入 (1-2x)⁷ 得 a₀=1，再令 x=1 得 a₀+a₁+…+a₇=-1，两式相减求出 a₁+…+a₇ = -2。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_5',
      procedureId: 'P08',
      partId: '(3)',
      sortOrder: 30,
      order: 30,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(3)问：先列出每串山楂数 (a-c)/b，再代入 a=220, b=36, c=4 算得每串 6 个。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_7',
      procedureId: 'P08',
      partId: '(3)',
      sortOrder: 31,
      order: 31,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(3)问：将 x=4 代入第(2)问求出的阴影面积代数式 3x+15，算得面积为 27。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_13',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 32,
      order: 32,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(2)问：将 l=84, r=37, π≈3.14 代入跑道周长公式 2πr+2l，计算并取整得 400m。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_21',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 33,
      order: 33,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(2)问：将学生数 a=20 分别代入 A、B 两家研学公司费用代数式算出具体金额并比大小。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_26',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 34,
      order: 34,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_nonnegative_then_substitute',
      operationSummary: '第(2)问：由 |a-6|+|b-4|+(c-3)²=0 解出 a=6, b=4, c=3，代入面积式 ab-(3/2)a-c 算得 S=12。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_27',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 35,
      order: 35,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '后半问：将 a=3.2, π=3.14 代入阴影面积 S=2a-π 与周长 l=2π+2a，分别算出 S=3.26, l=12.68。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_28',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 36,
      order: 36,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_nonnegative_then_substitute',
      operationSummary: '第(2)问：由 (a-4)²+|b-3|=0 求出 a=4, b=3，代入空白面积式 ab-a-b+1 算得 6cm²。',
      status: 'published'
    },
    {
      questionId: 'alg_oct30_29',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 37,
      order: 37,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(2)问：将 a=1.5, b=6, π=3.1 代入草坪面积式 2ab - πa²，算得结果约为 11.0 平方米。',
      status: 'published'
    },
    {
      questionId: 'g7_2_6',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 38,
      order: 38,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(2)问：将 x=18 代入两侧蔬菜总面积式 2·[(x-1)/2]·(31-x)，算得面积为 221m²。',
      status: 'published'
    },
    {
      questionId: 'g7_2_8',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 39,
      order: 39,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_nonnegative_then_substitute',
      operationSummary: '第(2)问：由 |x-8|+(y-5)²=0 求出 x=8, y=5，与 a=20 一并代入 a²-2xy 算得面积为 320。',
      status: 'published'
    },
    {
      questionId: 'g7_2_9',
      procedureId: 'P08',
      partId: '(3)',
      sortOrder: 40,
      order: 40,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(3)问：将 a=40, π=3 代入窗户材料总长式 15a + πa，算得总长度为 720cm。',
      status: 'published'
    },
    {
      questionId: 'g7_2_10',
      procedureId: 'P08',
      partId: '(3)',
      sortOrder: 41,
      order: 41,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(3)问：将 a=4, b=3/2, π=3 代入算出单扇玻璃与铝合金用量，进而算出甲、乙两品牌10扇总费用并比选。',
      status: 'published'
    },
    {
      questionId: 'g7_2_11',
      procedureId: 'P08',
      partId: '(3)',
      sortOrder: 42,
      order: 42,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(3)问：将剪切次数 a=20 代入规律式 b = 3a + 1，算得铁丝被分成 61 段。',
      status: 'published'
    },
    {
      questionId: 'g7_2_12',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 43,
      order: 43,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(2)问：将通道宽 a=6 代入停车区长宽代数式算出长50m、宽6m，求得4个区域总面积为 1200m²。',
      status: 'published'
    },
    {
      questionId: 'g7_2_15',
      procedureId: 'P08',
      partId: '(2)②',
      sortOrder: 44,
      order: 44,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(2)②问：将 a=0,1,2,3,4 依次代入日利润代数式 (200+100a)(40-10a) 测算对比，确定 a=1 时获最大利润 9000 元。',
      status: 'published'
    },
    {
      questionId: 'g7_2_37',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 45,
      order: 45,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(2)问：将 a=30, b=16, π=3 代入字母“E”面积式算得平方厘米数，换算为平方米后乘单价加加工费得 46 元。',
      status: 'published'
    },
    {
      questionId: 'g7_2_39',
      procedureId: 'P08',
      partId: '(3)',
      sortOrder: 46,
      order: 46,
      partOrder: 1,
      role: 'primary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(3)问：将 x=40 分别代入方案一 (18900+54x) 与方案二 (19200+60x) 算出总价，比较得出方案一更合算。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_1_21',
      procedureId: 'P08',
      partId: '(2)',
      sortOrder: 47,
      order: 47,
      partOrder: 1,
      role: 'secondary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(2)问：代入葡萄单价8元、苹果单价9元，按 (43 - 2×8) ÷ 9 计算最多还能买 3 斤苹果。',
      status: 'published'
    },
    {
      questionId: 'ch3_1_2_17',
      procedureId: 'P08',
      partId: '(3)',
      sortOrder: 48,
      order: 48,
      partOrder: 1,
      role: 'secondary',
      subType: 'P08_formula_substitute',
      operationSummary: '第(3)问：将 a=2025, b=2024 代入第(2)问平方差公式 a²-b²=(a+b)(a-b)，算得 4049×1 = 4049。',
      status: 'published'
    },

    // =========================================================================
    // P09：利用整体代入法求代数式的值（共 13 道关联题）
    // =========================================================================
    {
      questionId: 'ch3_2_1_3',
      procedureId: 'P09',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P09_reciprocal_zero_overall',
      operationSummary: '由 a, b 互为倒数提炼整体 ab=1，结合绝对值最小的数 c=0，整体代入 2ab - 3c 算得 2。',
      status: 'published'
    },
    {
      questionId: 'op_oct30_46',
      procedureId: 'P09',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P09_opposite_reciprocal_overall',
      operationSummary: '由互为相反数与互为倒数提炼整体 a+b=0、cd=1，结合 x=-2 整体代入 x-(a+b+cd)+(a+b)/cd 算得 -3。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_10',
      procedureId: 'P09',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P09_opposite_reciprocal_overall',
      operationSummary: '提炼整体 m+n=0、ab=1，结合 |x|=2 得 x²=4，整体代入 (m+n)/(2022x) + 2024ab - (1/4)x² 算得 2023。',
      status: 'published'
    },
    {
      questionId: 'op_oct30_26',
      procedureId: 'P09',
      partId: '(1)',
      sortOrder: 4,
      order: 4,
      partOrder: 1,
      role: 'primary',
      subType: 'P09_opposite_reciprocal_overall',
      operationSummary: '第(1)问：根据相反数、倒数与绝对值定义直接提炼核心整体 a+b=0, cd=1 及 x=±3。',
      status: 'published'
    },
    {
      questionId: 'op_oct30_26',
      procedureId: 'P09',
      partId: '(2)',
      sortOrder: 4,
      order: 4,
      partOrder: 2,
      role: 'primary',
      subType: 'P09_opposite_reciprocal_overall',
      operationSummary: '第(2)问：将 a+b=0, cd=1 整体代入 2x - cd + 3(a+b)，分 x=3 与 x=-3 两种情况算得 5 或 -7。',
      status: 'published'
    },
    {
      questionId: 'op_oct30_21',
      procedureId: 'P09',
      partId: '(2)',
      sortOrder: 5,
      order: 5,
      partOrder: 1,
      role: 'primary',
      subType: 'P09_opposite_reciprocal_overall',
      operationSummary: '第(2)问：提炼整体 cd=1, m+n=0 及 x=-1, |b|=3，分 a=5 与 a=-5 整体代入求得 ±5/3。',
      status: 'published'
    },
    {
      questionId: 'g7_2_36',
      procedureId: 'P09',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P09_opposite_reciprocal_overall',
      operationSummary: '提炼整体 a+b=0, cd=1 及 x=±3 (x²=9), y=-1，整体代入 (a+b)/x + x² - cd + y²⁰²⁶ 算得 9。',
      status: 'published'
    },
    {
      questionId: 'g7_2_21',
      procedureId: 'P09',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P09_factor_overall_substitute',
      operationSummary: '将目标式 12 - 2x + 4y 提取公因数 -2 变形为 -2(x - 2y) + 12，将已知整体 x - 2y = 3 代入算得 6。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_11',
      procedureId: 'P09',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P09_regroup_overall_substitute',
      operationSummary: '将 (n+x) - (m-y) 去括号重排为 -(m-n) + (x+y)，把已知整体 m-n=100、x+y=-1 代入算得 -101。',
      status: 'published'
    },
    {
      questionId: 'g7_2_40',
      procedureId: 'P09',
      partId: '(1)',
      sortOrder: 9,
      order: 9,
      partOrder: 1,
      role: 'primary',
      subType: 'P09_polynomial_overall_substitute',
      operationSummary: '第(1)问：由 x²-x-1=0 移项提炼整体 x²-x=1，整体代入 x²-x+2023 算得 2024。',
      status: 'published'
    },
    {
      questionId: 'g7_2_40',
      procedureId: 'P09',
      partId: '(2)',
      sortOrder: 9,
      order: 9,
      partOrder: 2,
      role: 'primary',
      subType: 'P09_factor_overall_substitute',
      operationSummary: '第(2)问：将 2(a+b)-4a-4b+30 合并变形为 -2(a+b)+30，将 a+b=3 整体代入算得 24。',
      status: 'published'
    },
    {
      questionId: 'g7_2_40',
      procedureId: 'P09',
      partId: '(3)',
      sortOrder: 9,
      order: 9,
      partOrder: 3,
      role: 'primary',
      subType: 'P09_split_overall_substitute',
      operationSummary: '第(3)问：将 a²+2b²+6ab 拆项配组为 (a²+2ab) + 2(b²+2ab)，将已知两个整体 20 与 15 代入算得 50。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_4',
      procedureId: 'P09',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P09_odd_symmetry_overall',
      operationSummary: '由 x=2 时 px³+qx+1=2012 提炼整体 8p+2q=2011；当 x=-2 时化为 -(8p+2q)+1，整体代入得 -2010。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_12',
      procedureId: 'P09',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P09_odd_symmetry_overall',
      operationSummary: '由 x=2 时 ax³+bx+1=2025 提炼整体 8a+2b=2024；当 x=-2 时 ax³+bx+3 = -(8a+2b)+3，整体代入得 -2021。',
      status: 'published'
    },
    {
      questionId: 'g7_2_31',
      procedureId: 'P09',
      partId: '(1)',
      sortOrder: 12,
      order: 12,
      partOrder: 1,
      role: 'primary',
      subType: 'P09_odd_symmetry_overall',
      operationSummary: '第(1)问：将 x=0 代入 f(x)=ax⁵+bx³+3x+c=f(0)=-1，直接求出常数项 c = -1。',
      status: 'published'
    },
    {
      questionId: 'g7_2_31',
      procedureId: 'P09',
      partId: '(2)',
      sortOrder: 12,
      order: 12,
      partOrder: 2,
      role: 'primary',
      subType: 'P09_odd_symmetry_overall',
      operationSummary: '第(2)问：由 f(2)=32a+8b+5=9 提炼整体 32a+8b=4（或 8a+2b=1），代入 f(-2)=-(32a+8b)-7 算得 -11。',
      status: 'published'
    },
    {
      questionId: 'ch3_2_1_14',
      procedureId: 'P09',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P09_ratio_k_overall',
      operationSummary: '设连比 x/2 = y/3 = z/4 = k，用 x=2k, y=3k, z=4k 整体代换分子分母并约去 k，算得 7/4。',
      status: 'published'
    },

    // =========================================================================
    // P10：利用等腰三角形“三线合一”求解与构造辅助线（共 11 道关联题）
    // =========================================================================
    {
        "questionId": "ch15_9_1",
        "procedureId": "P10",
        "partId": null,
        "sortOrder": 1,
        "order": 1,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "在等腰三角形中锁定两腰与底边，运用“三线合一”进行垂直、线段平分与角度互余转化（原题考点：等腰三角形“三线合一”性质与应用）。",
        "status": "published"
    },
    {
        "questionId": "ch15_9_2",
        "procedureId": "P10",
        "partId": null,
        "sortOrder": 2,
        "order": 2,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "在等腰三角形中锁定两腰与底边，运用“三线合一”进行垂直、线段平分与角度互余转化（原题考点：等腰三角形“三线合一”性质与应用）。",
        "status": "published"
    },
    {
        "questionId": "ch15_9_3",
        "procedureId": "P10",
        "partId": null,
        "sortOrder": 3,
        "order": 3,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "在等腰三角形中锁定两腰与底边，运用“三线合一”进行垂直、线段平分与角度互余转化（原题考点：等腰三角形“三线合一”性质与应用）。",
        "status": "published"
    },
    {
        "questionId": "ch15_9_4",
        "procedureId": "P10",
        "partId": null,
        "sortOrder": 4,
        "order": 4,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "在等腰三角形中锁定两腰与底边，运用“三线合一”进行垂直、线段平分与角度互余转化（原题考点：等腰三角形“三线合一”性质与应用）。",
        "status": "published"
    },
    {
        "questionId": "ch15_9_5",
        "procedureId": "P10",
        "partId": null,
        "sortOrder": 5,
        "order": 5,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "在等腰三角形中锁定两腰与底边，运用“三线合一”进行垂直、线段平分与角度互余转化（原题考点：等腰三角形“三线合一”性质与应用）。",
        "status": "published"
    },
    {
        "questionId": "ch15_9_6",
        "procedureId": "P10",
        "partId": null,
        "sortOrder": 6,
        "order": 6,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "在等腰三角形中锁定两腰与底边，运用“三线合一”进行垂直、线段平分与角度互余转化（原题考点：等腰三角形“三线合一”性质与应用）。",
        "status": "published"
    },
    {
        "questionId": "ch15_9_7",
        "procedureId": "P10",
        "partId": "(1)",
        "sortOrder": 7,
        "order": 7,
        "partOrder": 1,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "第(1)问：在等腰三角形中利用“三线合一”导出底边垂线、底边中点或顶角平分线关系完成求解与证明。",
        "status": "published"
    },
    {
        "questionId": "ch15_9_7",
        "procedureId": "P10",
        "partId": "(2)",
        "sortOrder": 7,
        "order": 7,
        "partOrder": 2,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "第(2)问：在等腰三角形中利用“三线合一”导出底边垂线、底边中点或顶角平分线关系完成求解与证明。",
        "status": "published"
    },
    {
        "questionId": "ch15_9_8",
        "procedureId": "P10",
        "partId": "(1)",
        "sortOrder": 8,
        "order": 8,
        "partOrder": 1,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "第(1)问：在等腰三角形中利用“三线合一”导出底边垂线、底边中点或顶角平分线关系完成求解与证明。",
        "status": "published"
    },
    {
        "questionId": "ch15_9_8",
        "procedureId": "P10",
        "partId": "(2)",
        "sortOrder": 8,
        "order": 8,
        "partOrder": 2,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "第(2)问：在等腰三角形中利用“三线合一”导出底边垂线、底边中点或顶角平分线关系完成求解与证明。",
        "status": "published"
    },
    {
        "questionId": "ch15_3_3_3",
        "procedureId": "P10",
        "partId": null,
        "sortOrder": 9,
        "order": 9,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "在等腰三角形中锁定两腰与底边，运用“三线合一”进行垂直、线段平分与角度互余转化（原题考点：三线合一、等边三角形的性质）。",
        "status": "published"
    },
    {
        "questionId": "ch15_3_5_2",
        "procedureId": "P10",
        "partId": null,
        "sortOrder": 10,
        "order": 10,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "在等腰三角形中锁定两腰与底边，运用“三线合一”进行垂直、线段平分与角度互余转化（原题考点：三线合一、含30度角的直角三角形）。",
        "status": "published"
    },
    {
        "questionId": "ch15_3_5_8",
        "procedureId": "P10",
        "partId": null,
        "sortOrder": 11,
        "order": 11,
        "role": "primary",
        "subType": "P10_isosceles_three_lines_in_one",
        "operationSummary": "在等腰三角形中锁定两腰与底边，运用“三线合一”进行垂直、线段平分与角度互余转化（原题考点：三线合一、三角形内角和定理的应用、含30度角的直角三角形）。",
        "status": "published"
    },

    // =========================================================================
    // P11：识别反比例函数与由定义求参数（共 11 道关联题，严格按学习顺序 sortOrder 1~11 排列）
    // =========================================================================
    {
      questionId: 'ch27_1_hw_q2',
      procedureId: 'P11',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P11_identify_standard_form',
      operationSummary: '排除正比例函数 y=x/3、分母为一次多项式 y=3/(2x+1) 及二次式 y=x²/2，识别 y=3/(2x) 符合反比例函数标准形式（k=3/2）。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q5',
      procedureId: 'P11',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P11_identify_standard_form',
      operationSummary: '排除正比例函数 ①y=√3x 与分母为 x² 的 ④y=k/x²，识别出符合 y=k/x 形式的 ②y=π/x 与 ③y=1/x。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q2',
      procedureId: 'P11',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P11_identify_three_forms',
      operationSummary: '对照分式 y=k/x、负指数 y=kx⁻¹ 与乘积 xy=k 三种标准形式，在7个式子中识别出 ②y=3/x、③y=x⁻¹、⑤xy=11 共3个反比例函数。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_hw_q5',
      procedureId: 'P11',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P11_identify_three_forms',
      operationSummary: '逐一核对7个函数的结构与自变量次数，选出负指数形式 ②y=2x⁻¹、分式形式 ④y=1/(2x) 与乘积形式 ⑥xy=-1。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q8',
      procedureId: 'P11',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P11_identify_and_explain',
      operationSummary: '按自变量 x 的指数是否为 -1、分母是否为单项式 x 及是否含额外常数加减项，逐一判定6个函数是否为反比例函数并说明理由。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_hw_q8',
      procedureId: 'P11',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P11_identify_and_explain',
      operationSummary: '对照 y=k/x 与 y=kx⁻¹ 标准形式，判定（2）y=2x⁻¹、（4）y=-4/x 是反比例函数，其余4个因次数非 -1、分母为 2x-1 或含常数 -5 而排除。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_hw_q6',
      procedureId: 'P11',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P11_param_exponent_only',
      operationSummary: '将 y=x⁻³ᵃ 对照 y=kx⁻¹（系数 k=1≠0），令自变量 x 的指数 -3a = -1，解得 a = 1/3。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q3',
      procedureId: 'P11',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P11_param_exponent_and_coeff',
      operationSummary: '由 y=(m-2)x³⁻ᵐ² 是反比例函数，令指数 3-m²=-1 解得 m=±2，结合比例系数 m-2≠0 舍去 m=2，定解为 m=-2。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q6',
      procedureId: 'P11',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P11_param_exponent_and_coeff',
      operationSummary: '由 y=(k-2)xᵏ²⁻⁵ 是反比例函数，令指数 k²-5=-1 得 k=±2，结合系数 k-2≠0 排除 k=2，定解为 k=-2。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_hw_q9',
      procedureId: 'P11',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P11_param_abs_and_coeff',
      operationSummary: '由 y=(m+1)x^|2m|-3 是反比例函数，令 |2m|-3=-1 解得 m=±1，结合系数 m+1≠0 舍去 m=-1，求得 m=1。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_hw_q3',
      procedureId: 'P11',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P11_param_exponent_and_coeff',
      operationSummary: '由 y=(m+√3)(m-√2)xᵐ²⁻³ 是反比例函数，令指数 m²-3=-1 得 m=±√2，结合系数 (m+√3)(m-√2)≠0 舍去 √2，定解为 m=-√2。',
      status: 'published'
    },

    // =========================================================================
    // P12：用待定系数法求反比例函数解析式（共 16 道关联题，严格按学习顺序 sortOrder 1~16 排列）
    // =========================================================================
    {
      questionId: 'ch27_1_hw_q12',
      procedureId: 'P12',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P12_find_y_from_x',
      operationSummary: '将 x=2 直接代入已知反比例函数 y=3/x，算得对应的函数值 y=3/2。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q10',
      procedureId: 'P12',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P12_find_y_from_x',
      operationSummary: '将点 P(-2,n) 的横坐标 x=-2 代入 y=-10/x，算得纵坐标 n = -10/(-2) = 5。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q11',
      procedureId: 'P12',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P12_find_y_from_x',
      operationSummary: '将点 A(2,m) 代入反比例函数 y=-2/x，算得 m = -2/2 = -1。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q12',
      procedureId: 'P12',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P12_find_y_from_x',
      operationSummary: '将点 (-2,n) 代入反比例函数 y=2/x，算得 n = 2/(-2) = -1。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q13',
      procedureId: 'P12',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P12_find_x_from_y',
      operationSummary: '将 y=6 代入反比例函数 y=12/x（或由 xy=12），算得自变量 x = 12/6 = 2。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_hw_q11',
      procedureId: 'P12',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P12_find_x_from_y',
      operationSummary: '利用点 (m,-3) 在 y=6/x 上满足横纵坐标之积等于 6，列 -3m=6 解得 m=-2。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_hw_q13',
      procedureId: 'P12',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P12_find_x_from_y',
      operationSummary: '利用点 A(a,-4) 在 y=8/x 上满足横纵坐标之积等于 8，列 -4a=8 解得 a=-2。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_hw_q10',
      procedureId: 'P12',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P12_verify_point_on_curve',
      operationSummary: '检验四个选项点的横、纵坐标乘积是否等于 k=10，由 2×5=10 判定图象一定经过点 (2,5)。',
      status: 'published'
    },
    {
      questionId: 'g9_wy_mid_3',
      procedureId: 'P12',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P12_verify_point_on_curve',
      operationSummary: '检验各选项横、纵坐标乘积是否等于比例系数 k=2，由 1×2=2 确定点 A 的坐标可能为 (1,2)。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q1',
      procedureId: 'P12',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P12_find_k_from_point',
      operationSummary: '将图象上点 A(1,3) 的横、纵坐标相乘，直接求出比例系数 k = 1×3 = 3。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q1',
      procedureId: 'P12',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P12_find_expr_from_point',
      operationSummary: '由 y=k/x 经过点 (1,-2) 算得 k = 1×(-2) = -2，回代写出反比例函数表达式 y=-2/x。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q5',
      procedureId: 'P12',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P12_find_expr_from_point',
      operationSummary: '设解析式为 y=k/x，将点 (-2,3) 代入得 k = (-2)×3 = -6，写出函数表达式 y=-6/x。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q2',
      procedureId: 'P12',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P12_two_points_equal_product',
      operationSummary: '先由点 A(1,2) 算得 k = 1×2 = 2，再将点 B(-1,m) 代入 -1·m = 2 求得 m = -2。',
      status: 'published'
    },
    {
      questionId: 'ch27_test_q1',
      procedureId: 'P12',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P12_two_points_equal_product',
      operationSummary: '先由已知点 (2,-3) 算得横纵坐标乘积 k = 2×(-3) = -6，再检验各选项乘积，选出乘积同为 -6 的点 (-2,3)。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q15',
      procedureId: 'P12',
      partId: '(1)',
      sortOrder: 15,
      order: 15,
      partOrder: 1,
      role: 'primary',
      subType: 'P12_extract_k',
      operationSummary: '第(1)问：将 y=-5/(3x) 化为标准形式 y=(-5/3)/x，读取比例系数 k = -5/3。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q15',
      procedureId: 'P12',
      partId: '(2)',
      sortOrder: 15,
      order: 15,
      partOrder: 2,
      role: 'primary',
      subType: 'P12_find_y_from_x',
      operationSummary: '第(2)问：将 x=-10 代入 y=-5/(3x)，算得函数值 y = -5/[3×(-10)] = 1/6。',
      status: 'published'
    },
    {
      questionId: 'ch27_1_q15',
      procedureId: 'P12',
      partId: '(3)',
      sortOrder: 15,
      order: 15,
      partOrder: 3,
      role: 'primary',
      subType: 'P12_find_x_from_y',
      operationSummary: '第(3)问：将 y=5/2 代入 y=-5/(3x)，解得自变量 x = -2/3。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q3',
      procedureId: 'P12',
      partId: '(1)',
      sortOrder: 16,
      order: 16,
      partOrder: 1,
      role: 'primary',
      subType: 'P12_find_expr_from_point',
      operationSummary: '第(1)问：将点 (2,-3) 代入 y=k/x 算得 k = 2×(-3) = -6，写出表达式 y=-6/x。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q3',
      procedureId: 'P12',
      partId: '(2)',
      sortOrder: 16,
      order: 16,
      partOrder: 2,
      role: 'primary',
      subType: 'P12_verify_point_on_curve',
      operationSummary: '第(2)问：将 x=1 代入 y=-6/x 得 y=-6≠6（或检验 1×6≠-6），判定点 (1,6) 不在图象上。',
      status: 'published'
    },

    // =========================================================================
    // P13：由比例系数 k 判断反比例函数象限与增减性（共 25 道关联题，严格按学习顺序 sortOrder 1~25 排列）
    // =========================================================================
    {
      questionId: 'ch27_2_1_ex_q7',
      procedureId: 'P13',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P13_direct_quadrant_from_k',
      operationSummary: '提取反比例函数 y=10/x 的比例系数 k=10>0，直接判定双曲线位于第一、第三象限。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_ex_q1',
      procedureId: 'P13',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P13_direct_quadrant_from_k',
      operationSummary: '提取反比例函数 y=-1/x 的比例系数 k=-1<0，判定双曲线位于第二、四象限，选出对应大致图象。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_ex_q3',
      procedureId: 'P13',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P13_direct_quadrant_from_k',
      operationSummary: '由 y=-2/x 中 k=-2<0 判定其图象位于第二、四象限，而 y=2/x (k=2>0) 位于第一、三象限，从而识别图(1)为 y=-2/x。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_ex_q9',
      procedureId: 'P13',
      partId: '(1)',
      sortOrder: 4,
      order: 4,
      partOrder: 1,
      role: 'primary',
      subType: 'P13_direct_quadrant_from_k',
      operationSummary: '第(1)问：提取 y=3/x 的比例系数 k=3>0，判定其图象位于第一、三象限。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_ex_q9',
      procedureId: 'P13',
      partId: '(2)',
      sortOrder: 4,
      order: 4,
      partOrder: 2,
      role: 'primary',
      subType: 'P13_direct_quadrant_from_k',
      operationSummary: '第(2)问：提取 y=-1/x 的比例系数 k=-1<0，判定其图象位于第二、四象限。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_q10',
      procedureId: 'P13',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P13_nonnegative_k_quadrant',
      operationSummary: '利用偶次方非负性 k²≥0 判定分子比例系数 k²+1>0 恒成立，得出 y=(k²+1)/x 的图象位于第一、三象限。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_ex_q8',
      procedureId: 'P13',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P13_nonnegative_k_quadrant',
      operationSummary: '由实数平方非负性知比例系数 k²+1≥1>0，直接判定双曲线位于第一、三象限。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q2',
      procedureId: 'P13',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P13_direct_monotonicity_from_k',
      operationSummary: '提取 y=-8/x 的比例系数 k=-8<0，直接得出在第二象限内 y 随 x 的增大而增大。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q5',
      procedureId: 'P13',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P13_direct_monotonicity_from_k',
      operationSummary: '由已知比例系数 k>0，直接得出在第三象限内 y 随 x 的增大而减小。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q4',
      procedureId: 'P13',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P13_direct_monotonicity_from_k',
      operationSummary: '由双曲线 (x<0) 分支位于第三象限判定 k>0，得出在该象限内随着 x 值的增大，y 值减小。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_prop_q2',
      procedureId: 'P13',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P13_monotonicity_domain_condition',
      operationSummary: '核对“k>0 且限定在同一象限（x<0）”两个条件，排除未限定象限的 A、B 与 k=-1<0 的 C，选出 y=1/x (x<0)。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_ex_q5',
      procedureId: 'P13',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P13_inverse_param_from_quadrant',
      operationSummary: '由反比例函数图象在第一、三象限推出比例系数 k>0，任取正数 k=1 写出解析式 y=1/x。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_ex_q11',
      procedureId: 'P13',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P13_inverse_param_from_quadrant',
      operationSummary: '由 y=(k+1)/x 的图象位于第一、三象限列出不等式 k+1>0，解得 k>-1，赋予符合条件的值 k=1。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_q11',
      procedureId: 'P13',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P13_inverse_param_from_quadrant',
      operationSummary: '由 y=(m-1)/x 的图象在第二、四象限内列出不等式 m-1<0，移项解得参数范围 m<1。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_q6',
      procedureId: 'P13',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P13_inverse_param_from_quadrant',
      operationSummary: '由 y=(k-1)/x 位于第二、四象限列 k-1<0 解得 k<1，在四个选项中筛选出满足 k<1 的值 0。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_ex_q10',
      procedureId: 'P13',
      partId: null,
      sortOrder: 15,
      order: 15,
      role: 'primary',
      subType: 'P13_inverse_param_from_quadrant',
      operationSummary: '由 y=(4-k)/x 位于第二、四象限列出不等式 4-k<0，解得 k>4，从选项中选出 k=5。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_ex_q12',
      procedureId: 'P13',
      partId: null,
      sortOrder: 16,
      order: 16,
      role: 'primary',
      subType: 'P13_inverse_param_from_quadrant',
      operationSummary: '由 y=(3m+4)/x 的图象位于第二、四象限列出不等式 3m+4<0，移项并除以 3 解得 m < -4/3。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q8',
      procedureId: 'P13',
      partId: null,
      sortOrder: 17,
      order: 17,
      role: 'primary',
      subType: 'P13_inverse_param_from_monotonicity',
      operationSummary: '由 y=m/x 在 x>0 时 y 随 x 增大而增大推出比例系数 m<0，写出符合条件的负数值 m=-1。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q7',
      procedureId: 'P13',
      partId: null,
      sortOrder: 18,
      order: 18,
      role: 'primary',
      subType: 'P13_inverse_param_from_monotonicity',
      operationSummary: '由 y=(k-1)/x 在任意一支上 y 随 x 增大而减小列出 k-1>0，解得 k>1，选出符合条件的 k=2。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q7',
      procedureId: 'P13',
      partId: null,
      sortOrder: 19,
      order: 19,
      role: 'primary',
      subType: 'P13_inverse_param_from_monotonicity',
      operationSummary: '由同在 x>0 分支上的两点 A(2,y₁)、B(4,y₂) 满足 2<4 且 y₁>y₂，判定该分支单调递减，推出 k>0 并取 k=1。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q3',
      procedureId: 'P13',
      partId: null,
      sortOrder: 20,
      order: 20,
      role: 'primary',
      subType: 'P13_inverse_param_from_monotonicity',
      operationSummary: '由当 x₁>x₂>0 时 y₁<y₂ 知第一象限内 y 随 x 增大而减小，列出不等式 m+1>0，解得 m>-1。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_prop_q3',
      procedureId: 'P13',
      partId: null,
      sortOrder: 21,
      order: 21,
      role: 'primary',
      subType: 'P13_inverse_param_from_monotonicity',
      operationSummary: '两点 (-2,m)、(-1,n) 横坐标满足 -2<-1<0（同在 x<0 分支），由 m<n 知 y 随 x 增大而增大，推出 k<0 并选出 k=-2。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_prop_q9',
      procedureId: 'P13',
      partId: '(1)',
      sortOrder: 22,
      order: 22,
      partOrder: 1,
      role: 'primary',
      subType: 'P13_direct_quadrant_from_k',
      operationSummary: '第(1)问：将 k=2 代入得比例系数 k-3 = -1 < 0，判定双曲线位于第二、第四象限。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_prop_q9',
      procedureId: 'P13',
      partId: '(2)',
      sortOrder: 22,
      order: 22,
      partOrder: 2,
      role: 'primary',
      subType: 'P13_inverse_param_from_monotonicity',
      operationSummary: '第(2)问：由当 x>0 时 y 随 x 增大而增大列出比例系数不等式 k-3<0，解得 k<3。',
      status: 'published'
    },
    {
      questionId: 'ch27_test_q17',
      procedureId: 'P13',
      partId: '(1)',
      sortOrder: 23,
      order: 23,
      partOrder: 1,
      role: 'primary',
      subType: 'P13_inverse_param_from_quadrant',
      operationSummary: '第(1)问：由 y=(2a+6)/x 的图象位于第二、四象限列出不等式 2a+6<0，移项除以 2 解得 a<-3。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q9',
      procedureId: 'P13',
      partId: '(1)',
      sortOrder: 24,
      order: 24,
      partOrder: 1,
      role: 'primary',
      subType: 'P13_inverse_param_from_monotonicity',
      operationSummary: '第(1)问：由 y=(3-m)/x 在每个象限内 y 随 x 增大而减小列出 3-m>0，解得 m<3。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q9',
      procedureId: 'P13',
      partId: '(1)',
      sortOrder: 25,
      order: 25,
      partOrder: 1,
      role: 'primary',
      subType: 'P13_inverse_param_from_monotonicity',
      operationSummary: '第(1)问：由 y=(k-1)/x 在每一支上 y 随 x 增大而增大列出 k-1<0，解得 k<1。',
      status: 'published'
    },

    // =========================================================================
    // P14：利用反比例函数增减性与象限分布比较函数值大小（共 12 道关联题，严格按学习顺序 sortOrder 1~12 排列）
    // =========================================================================
    {
      questionId: 'ch27_2_2_ex_q11',
      procedureId: 'P14',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P14_same_quadrant_compare',
      operationSummary: '由 y=4/x 中 k=4>0 知第一象限内 y 随 x 增大而减小，因 0<2<3，直接得出 y₁ > y₂。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q4',
      procedureId: 'P14',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P14_same_quadrant_compare',
      operationSummary: '由 y=-4/x 中 k=-4<0 知第二象限内 y 随 x 增大而增大，因 -2<-1<0，直接得出 y₁ < y₂。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q10',
      procedureId: 'P14',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P14_same_quadrant_compare',
      operationSummary: '由 y=7/x 中 k=7>0 知第一象限内 y 随 x 增大而减小，结合三点横坐标 0<1<4<7，排出 a > b > c。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q8',
      procedureId: 'P14',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P14_cross_quadrant_sign_compare',
      operationSummary: '由 y=-1/x 中 k=-1<0 知图象在第二、四象限，当 x₁<0<x₂ 时点 (x₁,y₁) 在第二象限 (y₁>0)、(x₂,y₂) 在第四象限 (y₂<0)，故 y₁ > y₂。',
      status: 'published'
    },
    {
      questionId: 'g9_wy_mid_7',
      procedureId: 'P14',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P14_cross_and_same_quadrant_order',
      operationSummary: '在 y=-4/x (k=-4<0) 中，先按横坐标正负判定 C(2,y₃) 在第四象限 y₃<0、A(-4,y₁) 与 B(-2,y₂) 在第二象限 y₁,y₂>0，再由 -4<-2<0 递增排出 y₃ < y₁ < y₂。',
      status: 'published'
    },
    {
      questionId: 'ch27_test_q5',
      procedureId: 'P14',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P14_cross_and_same_quadrant_order',
      operationSummary: '在 y=-3/x (k=-3<0) 中，先由 -10<0 判定 y₁>0，再对同在第四象限的 B(1,y₂)、C(5,y₃) 按单调递增由 1<5 得出 y₂<y₃<0，汇总得 y₂ < y₃ < y₁。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_prop_q8',
      procedureId: 'P14',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P14_abstract_x_cross_quadrant_order',
      operationSummary: '先由 -(m²+1)<0 判定双曲线在第二、四象限且每象限内递增；再由 x₁<0<x₂<x₃ 知 y₁>0 且 y₂<y₃<0，排出 y₂ < y₃ < y₁。',
      status: 'published'
    },
    {
      questionId: 'ch27_test_q17',
      procedureId: 'P14',
      partId: '(2)',
      sortOrder: 8,
      order: 8,
      partOrder: 1,
      role: 'primary',
      subType: 'P14_same_quadrant_compare',
      operationSummary: '第(2)问：当 a=1 时比例系数 2a+6=8>0，第三象限内 y 随 x 增大而减小，由 -4<-1<0 得出 y₁ > y₂。',
      status: 'published'
    },
    {
      questionId: 'ch27_test_q9',
      procedureId: 'P14',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P14_parametric_x_compare',
      operationSummary: '在 y=-3/x (k=-3<0) 中，当 m<-1 时 m < m+1 < 0，A(m,y₁)、B(m+1,y₂) 同在第二象限，由第二象限内 y 随 x 增大而增大判定 y₁ < y₂。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_prop_q4',
      procedureId: 'P14',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P14_parametric_x_compare',
      operationSummary: '在 y=-2/x (k=-2<0) 中，当 -1<m<0 时 m-1 < m < 0 < m+1，A、B 在第二象限得 0<y₁<y₂，C 在第四象限得 y₃<0，故 y₃ < 0 < y₁ < y₂。',
      status: 'published'
    },
    {
      questionId: 'ch27_test_q8',
      procedureId: 'P14',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P14_parametric_x_compare',
      operationSummary: '在 y=k/x (k<0，每象限内递增) 中，因横坐标 a-2 < a+1 却有 y₁ > y₂，判定两点必跨象限（P 在第二象限、Q 在第四象限），列 a-2<0<a+1 得 -1<a<2。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_1_prop_q9',
      procedureId: 'P14',
      partId: '(3)',
      sortOrder: 12,
      order: 12,
      partOrder: 1,
      role: 'primary',
      subType: 'P14_cross_quadrant_sign_compare',
      operationSummary: '第(3)问：点 (-1,m) 与 (2,n) 横坐标异号分处不同象限，分 k>3（k-3>0 时 m<0<n 即 m<n）与 k<3（k-3<0 时 m>0>n 即 m>n）讨论。',
      status: 'published'
    },

    // =========================================================================
    // P15：利用反比例函数中心对称性求正比例交点坐标与对称式的值（共 7 道关联题，严格按 sortOrder 1~7 排列）
    // =========================================================================
    {
      questionId: 'ch27_2_2_ex_q13',
      procedureId: 'P15',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P15_symmetric_intersection_coords',
      operationSummary: '过原点的直线与双曲线 y=k/x 均关于原点中心对称，由交点 A(2,5) 横、纵坐标同时取相反数，直接写出另一交点 B(-2,-5)。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q10',
      procedureId: 'P15',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P15_symmetric_intersection_coords',
      operationSummary: '利用双曲线 y=k₁/x 与正比例直线 y=k₂x 的交点 A、B 关于原点对称，由 A(1,2) 直接得出 B(-1,-2)。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q12',
      procedureId: 'P15',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P15_symmetric_coords_sum_zero',
      operationSummary: '双曲线 y=k/x 上两点 (x₁,y₁) 与 (3,y₂) 满足 y₁+y₂=0（纵坐标互为相反数），由关于原点中心对称知横坐标也互为相反数，得 x₁=-3。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_hw_q13',
      procedureId: 'P15',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P15_complete_coord_then_symmetry',
      operationSummary: '先将交点 (-1,m) 代入 y=4/x 算得 m=-4（即交点为 (-1,-4)），再由正比例函数与双曲线交点关于原点对称得出另一交点为 (1,4)。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_q1',
      procedureId: 'P15',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P15_symmetric_algebraic_eval',
      operationSummary: '由两交点关于原点对称得 x₂=-x₁, y₂=-y₁，代入 2x₁y₂-5x₂y₁ 化为 -2x₁y₁+5x₁y₁=3x₁y₁，结合 x₁y₁=√3 算得 3√3。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_q3',
      procedureId: 'P15',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P15_symmetric_algebraic_eval',
      operationSummary: '由交点关于原点对称得 x₂=-x₁, y₂=-y₁，代入 2x₁y₂+3x₂y₁ 化为 -2x₁y₁-3x₁y₁=-5x₁y₁，结合 x₁y₁=4 算得 -20。',
      status: 'published'
    },
    {
      questionId: 'ch27_2_2_ex_q15',
      procedureId: 'P15',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P15_symmetric_param_solve_k',
      operationSummary: '利用过原点直线与双曲线两交点 A(m,n)、B(m-2,n-8) 关于原点对称，列 m+(m-2)=0、n+(n-8)=0 解得 m=1, n=4，进而算得 k=mn=4。',
      status: 'published'
    }    ,
    // =========================================================================
    // P16：利用根的判别式判断一元二次方程根的情况与求参数（共 27 道关联题，严格按学习顺序 sortOrder 1~27 排列）
    // =========================================================================
    {
      questionId: 'quad25_5_11',
      procedureId: 'P16',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P16_standard_form_and_discriminant',
      operationSummary: '先将 x²=3x-1 移项化为一般式 x²-3x+1=0 确定 a=1, b=-3, c=1，再代入 Δ=(-3)²-4×1×1=5。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_2',
      procedureId: 'P16',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P16_numeric_discriminant_classify',
      operationSummary: '提取 3x²-4x-4=0 的系数 a=3, b=-4, c=-4，算得 Δ=(-4)²-4×3×(-4)=64>0，判定有两个不相等的实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_12',
      procedureId: 'P16',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P16_numeric_discriminant_classify',
      operationSummary: '提取 x²-4x+4=0 的系数 a=1, b=-4, c=4，算得 Δ=(-4)²-4×1×4=0，判定有两个相等的实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_5',
      procedureId: 'P16',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P16_numeric_discriminant_classify',
      operationSummary: '将 2x²+5=7x 移项化为 2x²-7x+5=0，算得 Δ=(-7)²-4×2×5=9>0，判定有两个不相等的实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_6',
      procedureId: 'P16',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P16_numeric_discriminant_classify',
      operationSummary: '提取 x²+3x+1=0 的系数算得 Δ=3²-4×1×1=5>0，判定方程有实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_21',
      procedureId: 'P16',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P16_numeric_discriminant_classify',
      operationSummary: '逐一计算四个选项的判别式，由 x²-4x+8=0 中 Δ=(-4)²-4×1×8=-16<0 判定其没有实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_24',
      procedureId: 'P16',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P16_numeric_discriminant_classify',
      operationSummary: '分别计算四个方程的判别式 Δ（20>0、0、24>0、-7<0），依次判定各自实数根的情况。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_27',
      procedureId: 'P16',
      partId: '(1)',
      sortOrder: 8,
      order: 8,
      partOrder: 1,
      role: 'primary',
      subType: 'P16_numeric_discriminant_classify',
      operationSummary: '第(1)问：在 -x²-3x+1=0 中算得 Δ=(-3)²-4×(-1)×1=13>0，判定有两个不相等的实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_27',
      procedureId: 'P16',
      partId: '(2)',
      sortOrder: 8,
      order: 8,
      partOrder: 2,
      role: 'primary',
      subType: 'P16_numeric_discriminant_classify',
      operationSummary: '第(2)问：在 2x²-(7/2)x+1/4=0 中算得 Δ=(-7/2)²-4×2×(1/4)=41/4>0，判定有两个不相等的实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_27',
      procedureId: 'P16',
      partId: '(3)',
      sortOrder: 8,
      order: 8,
      partOrder: 3,
      role: 'primary',
      subType: 'P16_numeric_discriminant_classify',
      operationSummary: '第(3)问：将 4x²+5=4√5x 移项化为 4x²-4√5x+5=0，算得 Δ=(-4√5)²-4×4×5=0，判定有两个相等的实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_27',
      procedureId: 'P16',
      partId: '(4)',
      sortOrder: 8,
      order: 8,
      partOrder: 4,
      role: 'primary',
      subType: 'P16_numeric_discriminant_classify',
      operationSummary: '第(4)问：将 -3x²+√3x=2 移项化为 -3x²+√3x-2=0，算得 Δ=(√3)²-4×(-3)×(-2)=-21<0，判定没有实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_1',
      procedureId: 'P16',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P16_parametric_discriminant_proof',
      operationSummary: '在 x²+mx-1=0 中算得 Δ=m²-4×1×(-1)=m²+4，由偶次方非负性 m²≥0 知 m²+4>0，判定有两个不相等的实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_20',
      procedureId: 'P16',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P16_parametric_discriminant_proof',
      operationSummary: '分别表示四个含参方程的判别式，由 x²+mx-3=0 中 Δ=m²+12>0 恒成立判定其一定有两个不相等的实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_9',
      procedureId: 'P16',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P16_parametric_discriminant_proof',
      operationSummary: '计算 Δ=(2m)²-4(2m-1)=4m²-8m+4=4(m-1)²，由平方非负性 4(m-1)²≥0 证明方程总有两个实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_18',
      procedureId: 'P16',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P16_parametric_discriminant_proof',
      operationSummary: '计算 Δ=(k+4)²-4(k+3)=k²+4k+4=(k+2)²≥0 恒成立，证明无论 k 取何值方程总有实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_3',
      procedureId: 'P16',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P16_inverse_param_monic',
      operationSummary: '由 x²+2x-m=0 有两个不相等实数根列 Δ=2²-4×1×(-m)=4+4m>0，解得 m>-1。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_14',
      procedureId: 'P16',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P16_inverse_param_monic',
      operationSummary: '由 x²-2x-m=0 有两个不相等实数根列 Δ=(-2)²-4×1×(-m)=4+4m>0，解得 m>-1。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_13',
      procedureId: 'P16',
      partId: null,
      sortOrder: 15,
      order: 15,
      role: 'primary',
      subType: 'P16_inverse_param_monic',
      operationSummary: '由 x²-3x+m=0 有两个不相等实数根列 Δ=(-3)²-4m>0 得 m<9/4，从选项中选出符合条件的 m=-3。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_4',
      procedureId: 'P16',
      partId: null,
      sortOrder: 16,
      order: 16,
      role: 'primary',
      subType: 'P16_inverse_param_monic',
      operationSummary: '由 x²-4x+k+2=0 没有实数根列 Δ=(-4)²-4(k+2)<0 得 k>2，从选项中选出符合条件的 k=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_19',
      procedureId: 'P16',
      partId: null,
      sortOrder: 17,
      order: 17,
      role: 'primary',
      subType: 'P16_inverse_param_monic',
      operationSummary: '由 x²+2mx+m²-m-1=0 有两个不相等实数根列 Δ=(2m)²-4(m²-m-1)=4m+4>0，解得 m>-1。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_22',
      procedureId: 'P16',
      partId: null,
      sortOrder: 18,
      order: 18,
      role: 'primary',
      subType: 'P16_inverse_param_with_leading_coeff',
      operationSummary: '由一元二次方程 ax²+2x+1=0 有两个相等实数根，列 Δ=2²-4a=0 且 a≠0，解得 a=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_8',
      procedureId: 'P16',
      partId: null,
      sortOrder: 19,
      order: 19,
      role: 'primary',
      subType: 'P16_inverse_param_with_leading_coeff',
      operationSummary: '由一元二次方程 (m-2)x²+2x+1=0 有两个相等实数根，列 Δ=2²-4(m-2)=0 且 m-2≠0，解得 m=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_7',
      procedureId: 'P16',
      partId: null,
      sortOrder: 20,
      order: 20,
      role: 'primary',
      subType: 'P16_inverse_param_with_leading_coeff',
      operationSummary: '由一元二次方程 (a-1)x²+2x+1=0 有实数根，列 Δ=4-4(a-1)≥0 且 a-1≠0 得 a≤2 且 a≠1，取 a=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_16',
      procedureId: 'P16',
      partId: null,
      sortOrder: 21,
      order: 21,
      role: 'primary',
      subType: 'P16_inverse_param_with_leading_coeff',
      operationSummary: '先将 mx²+1=2x 移项化为 mx²-2x+1=0，由有两个不相等实根列 Δ=(-2)²-4m>0 且 m≠0，得 m<1 且 m≠0。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_17',
      procedureId: 'P16',
      partId: null,
      sortOrder: 22,
      order: 22,
      role: 'primary',
      subType: 'P16_inverse_param_with_leading_coeff',
      operationSummary: '由 kx²-6x+3=0 有两个不相等实根列 Δ=(-6)²-12k>0 且 k≠0，解得 k<3 且 k≠0。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_25',
      procedureId: 'P16',
      partId: null,
      sortOrder: 23,
      order: 23,
      role: 'primary',
      subType: 'P16_inverse_param_with_leading_coeff',
      operationSummary: '由 kx²-4x-1=0 有两个不相等实根列 Δ=(-4)²-4k(-1)=16+4k>0 且 k≠0，解得 k>-4 且 k≠0。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_26',
      procedureId: 'P16',
      partId: null,
      sortOrder: 24,
      order: 24,
      role: 'primary',
      subType: 'P16_inverse_param_with_leading_coeff',
      operationSummary: '由一元二次方程 (a+1)x²-2x-1=0 有两个不相等实根列 Δ=4+4(a+1)>0 且 a+1≠0 得 a>-2 且 a≠-1，取最小整数 0。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_10',
      procedureId: 'P16',
      partId: null,
      sortOrder: 25,
      order: 25,
      role: 'primary',
      subType: 'P16_inverse_param_general_equation',
      operationSummary: '分 a-1=0（化为 -2x+1=0 有实根）与 a-1≠0 且 Δ=4-4(a-1)≥0（得 a≤2 且 a≠1）两种情况，综合得 a≤2。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_23',
      procedureId: 'P16',
      partId: null,
      sortOrder: 26,
      order: 26,
      role: 'primary',
      subType: 'P16_inverse_param_general_equation',
      operationSummary: '分 m-2=0（一次方程 -2x+1=0 有实根）与 m-2≠0 且 Δ=4-4(m-2)≥0 两种情况合并，得出 m≤3。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_28',
      procedureId: 'P16',
      partId: '(1)',
      sortOrder: 27,
      order: 27,
      partOrder: 1,
      role: 'primary',
      subType: 'P16_inverse_param_with_leading_coeff',
      operationSummary: '第(1)问：算得 Δ=[-2(2m+1)]²-4m(4m-1)=20m+4，令 20m+4=0 且 m≠0 解得 m=-1/5。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_28',
      procedureId: 'P16',
      partId: '(2)',
      sortOrder: 27,
      order: 27,
      partOrder: 2,
      role: 'primary',
      subType: 'P16_inverse_param_with_leading_coeff',
      operationSummary: '第(2)问：由有两个不相等实数根列 Δ=20m+4>0 且二次项系数 m≠0，解得 m>-1/5 且 m≠0。',
      status: 'published'
    },
    {
      questionId: 'quad25_5_28',
      procedureId: 'P16',
      partId: '(3)',
      sortOrder: 27,
      order: 27,
      partOrder: 3,
      role: 'primary',
      subType: 'P16_inverse_param_with_leading_coeff',
      operationSummary: '第(3)问：由无实数根列 Δ=20m+4<0（此时 m≠0 自动满足），解得 m<-1/5。',
      status: 'published'
    }
    ,
    // =========================================================================
    // P17：利用公式法解一元二次方程（共 14 道关联题，严格按学习顺序 sortOrder 1~14 排列）
    // =========================================================================
    {
      questionId: 'quad25_6_1',
      procedureId: 'P17',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P17_standard_form_extract_abc',
      operationSummary: '将 2x²-4=3x 移项化为一般形式 2x²-3x-4=0，提取各项系数 a=2, b=-3, c=-4。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_5',
      procedureId: 'P17',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P17_standard_form_extract_abc',
      operationSummary: '将 -4x²+3=5x 移项化为一般形式 -4x²-5x+3=0，连同正负号确定 a=-4, b=-5, c=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_8',
      procedureId: 'P17',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P17_formula_structure',
      operationSummary: '直接写出当 Δ=b²-4ac≥0 时一元二次方程 ax²+bx+c=0 (a≠0) 的求根公式 x=(-b±√(b²-4ac))/(2a)。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_6',
      procedureId: 'P17',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P17_reverse_match_equation',
      operationSummary: '对照求根公式 x=(-b±√(b²-4ac))/(2a) 从算式中读出 a=2, b=3, c=-1，还原方程为 2x²+3x-1=0。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_10',
      procedureId: 'P17',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P17_reverse_match_equation',
      operationSummary: '对照求根公式从分母 2×3、分子 -2 及根号内 -4×3×(-1) 读出 a=3, b=2, c=-1，还原方程 3x²+2x-1=0。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_11',
      procedureId: 'P17',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P17_reverse_match_equation',
      operationSummary: '对照求根公式从分子 1=-(-1)、分母 2×3 及根号内 -4×3×(-5) 读出 a=3, b=-1, c=-5，得 3x²-x-5=0。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_12',
      procedureId: 'P17',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P17_reverse_match_equation',
      operationSummary: '对照求根公式读出 a=5, b=3, c=-2，还原对应的一元二次方程为 5x²+3x-2=0。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_7',
      procedureId: 'P17',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P17_reverse_match_equation',
      operationSummary: '将根号内 +4×3×1 改写为 -4×3×(-1)，对照求根公式读出 a=3, b=9, c=-1，还原方程 3x²+9x-1=0。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_3',
      procedureId: 'P17',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P17_reverse_match_equation',
      operationSummary: '对照求根公式读出 a=3, b=-2, c=-1（或成比例），代入计算 a+b-c = 3+(-2)-(-1) = 2。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_13',
      procedureId: 'P17',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P17_full_formula_solve',
      operationSummary: '按求根公式流程图依次填入 b=-11、Δ=(-11)²-4×3×10=1>0，代入公式算得 x=(11±1)/6，解出 x₁=2, x₂=5/3。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_2',
      procedureId: 'P17',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P17_full_formula_solve',
      operationSummary: '将 4x²-12x=3 化为 4x²-12x-3=0，算得 Δ=(-12)²-4×4×(-3)=192，代入求根公式化简约分得 x=(3±2√3)/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_4',
      procedureId: 'P17',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P17_full_formula_solve',
      operationSummary: '在 x²+4x+2=0 中确定 a=1, b=4, c=2，算得 Δ=4²-4×1×2=8>0，代入求根公式化简得 x=-2±√2。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_9',
      procedureId: 'P17',
      partId: '(1)',
      sortOrder: 13,
      order: 13,
      partOrder: 1,
      role: 'primary',
      subType: 'P17_full_formula_solve',
      operationSummary: '第(1)问：去括号移项化为 3x²+2x-4=0，算得 Δ=4-4×3×(-4)=52>0，代入求根公式化简得 x=(-1±√13)/3。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_9',
      procedureId: 'P17',
      partId: '(2)',
      sortOrder: 13,
      order: 13,
      partOrder: 2,
      role: 'primary',
      subType: 'P17_full_formula_solve',
      operationSummary: '第(2)问：移项合并化为 x²+4x-8=0，算得 Δ=16-4×1×(-8)=48>0，代入求根公式化简得 x=-2±2√3。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_14',
      procedureId: 'P17',
      partId: '(1)',
      sortOrder: 14,
      order: 14,
      partOrder: 1,
      role: 'primary',
      subType: 'P17_error_analysis_and_solve',
      operationSummary: '第(1)问：检查移项化一般式步骤，指出将 3x²-5x=2 移项写成 3x²-5x+2=0 未变号，从第一步开始出错。',
      status: 'published'
    },
    {
      questionId: 'quad25_6_14',
      procedureId: 'P17',
      partId: '(2)',
      sortOrder: 14,
      order: 14,
      partOrder: 2,
      role: 'primary',
      subType: 'P17_error_analysis_and_solve',
      operationSummary: '第(2)问：化为 3x²-5x-2=0 (a=3,b=-5,c=-2)，算得 Δ=49>0，代入 x=(5±7)/6 解得 x₁=2, x₂=-1/3。',
      status: 'published'
    }
    ,
    // =========================================================================
    // P18：利用因式分解法解一元二次方程（共 41 道关联题，严格按学习顺序 sortOrder 1~41 排列）
    // =========================================================================
    {
      questionId: 'quad25_7_9',
      procedureId: 'P18',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P18_zero_product_direct',
      operationSummary: '直接利用两因式乘积为 0 的性质，由 x(x-1)=0 转化为 x=0 或 x-1=0，解得 x₁=0, x₂=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_17',
      procedureId: 'P18',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P18_zero_product_direct',
      operationSummary: '由 x(x-6)=0 直接降次为 x=0 或 x-6=0，解得 x₁=0, x₂=6。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_30',
      procedureId: 'P18',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P18_zero_product_direct',
      operationSummary: '由 x(x+2)=0 直接降次为 x=0 或 x+2=0，解得 x₁=0, x₂=-2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_29',
      procedureId: 'P18',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P18_zero_product_direct',
      operationSummary: '由 (x-1)(x+2)=0 直接降次为 x-1=0 或 x+2=0，解得 x₁=1, x₂=-2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_22',
      procedureId: 'P18',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P18_zero_product_direct',
      operationSummary: '由 (x-3)(x-9)=0 直接降次为 x-3=0 或 x-9=0，解得 x₁=3, x₂=9。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_16',
      procedureId: 'P18',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '对 x²-5x=0 左边提取公因式 x 得 x(x-5)=0，降次解得 x₁=0, x₂=5。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_34',
      procedureId: 'P18',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '对 x²-3x=0 左边提取公因式 x 得 x(x-3)=0，降次解得 x₁=0, x₂=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_6',
      procedureId: 'P18',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '先将 x²=4x 移项得 x²-4x=0，再提取公因式 x 得 x(x-4)=0，解得 x₁=0, x₂=4。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_18',
      procedureId: 'P18',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '先将 x²=2x 移项得 x²-2x=0，提取公因式 x 得 x(x-2)=0，解得 x₁=0, x₂=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_20',
      procedureId: 'P18',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '先将 x²=x 移项得 x²-x=0，提取公因式 x 得 x(x-1)=0，解得 x₁=0, x₂=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_31',
      procedureId: 'P18',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '对比甲（两边同除以 x 漏掉 x=0）、乙（移项提取公因式 x(x-2)=0）解法，判定乙同学完全正确。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_4',
      procedureId: 'P18',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '将 x(x-1)=x 移项并提取公因式 x 得 x(x-2)=0，解得 x₁=0, x₂=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_35',
      procedureId: 'P18',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '将 x(x-2)=x 移项整理得 x(x-3)=0，降次解得 x₁=0, x₂=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_8',
      procedureId: 'P18',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '将 x²=x(2x-1) 移项提取公因式 x 得 x(x-2x+1)=0 即 x(1-x)=0，解得 x₁=0, x₂=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_27',
      procedureId: 'P18',
      partId: '(1)',
      sortOrder: 15,
      order: 15,
      partOrder: 1,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '第(1)问：对 3x²-6x=0 提取公因式 3x 得 3x(x-2)=0，解得 x₁=0, x₂=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_27',
      procedureId: 'P18',
      partId: '(2)',
      sortOrder: 15,
      order: 15,
      partOrder: 2,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '第(2)问：对 x(2x+3)-4x=0 提取公因式 x 并合并括号内同类项得 x(2x-1)=0，解得 x₁=0, x₂=1/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_23',
      procedureId: 'P18',
      partId: null,
      sortOrder: 16,
      order: 16,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '将 x(x-5)=x-5 移项得 x(x-5)-(x-5)=0，提取整体公因式 (x-5) 得 (x-5)(x-1)=0，解得 x₁=5, x₂=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_38',
      procedureId: 'P18',
      partId: null,
      sortOrder: 17,
      order: 17,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '将 2x(x-1)=3(x-1) 移项得 2x(x-1)-3(x-1)=0，提取 (x-1) 得 (x-1)(2x-3)=0，解得 x₁=1, x₂=3/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_37',
      procedureId: 'P18',
      partId: null,
      sortOrder: 18,
      order: 18,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '将 (3x+1)(2x-5)=-2(2x-5) 移项并提取 (2x-5) 得 (2x-5)(3x+3)=0，解得 x₁=-1, x₂=5/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_3',
      procedureId: 'P18',
      partId: null,
      sortOrder: 19,
      order: 19,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '利用 3-x=-(x-3) 将 x(x-3)=3-x 移项化为 x(x-3)+(x-3)=0，提取 (x-3) 得 (x-3)(x+1)=0，解得 x₁=-1, x₂=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_42',
      procedureId: 'P18',
      partId: null,
      sortOrder: 20,
      order: 20,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '将 x(x+2)=2+x 移项得 x(x+2)-(x+2)=0，提取 (x+2) 得 (x+2)(x-1)=0，解得 x₁=-2, x₂=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_21',
      procedureId: 'P18',
      partId: null,
      sortOrder: 21,
      order: 21,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '先将左边分解为 x(x+5)=3(x+5)，再移项提取 (x+5) 得 (x+5)(x-3)=0，解得 x₁=-5, x₂=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_10',
      procedureId: 'P18',
      partId: null,
      sortOrder: 22,
      order: 22,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '将 x-1=(x-1)(2x+3) 移项提取 (x-1) 得 (x-1)(1-2x-3)=0 即 (x-1)(-2x-2)=0，解得 x₁=1, x₂=-1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_14',
      procedureId: 'P18',
      partId: null,
      sortOrder: 23,
      order: 23,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '将 -4x-6 变形为 -2(2x+3)，对 x(2x+3)-2(2x+3)=0 提取 (2x+3) 得 (2x+3)(x-2)=0，解得 x₁=-3/2, x₂=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_15',
      procedureId: 'P18',
      partId: null,
      sortOrder: 24,
      order: 24,
      role: 'primary',
      subType: 'P18_error_analysis_binomial',
      operationSummary: '辨析解 6(x-1)=(x-1)² 的过程：嘉嘉同除以 (x-1) 漏根错，淇淇提取 (x-1) 后去括号未变号写成 (6-x-1) 错，故两人都错。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_32',
      procedureId: 'P18',
      partId: null,
      sortOrder: 25,
      order: 25,
      role: 'primary',
      subType: 'P18_error_analysis_binomial',
      operationSummary: '检查解 5x(3x-2)=2(2-3x) 的步骤：第二步 -2(2-3x) 应化为 +2(3x-2)，第三步提取 (3x-2) 误写为 (5x-2) 出错。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_28',
      procedureId: 'P18',
      partId: null,
      sortOrder: 26,
      order: 26,
      role: 'primary',
      subType: 'P18_error_analysis_binomial',
      operationSummary: '指出两边不能同除以可能为 0 的 (x-4)，并移项提取 (x-4) 得 (x-4)(x-1)=0，正确解出 x₁=1, x₂=4。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_41',
      procedureId: 'P18',
      partId: '(1)',
      sortOrder: 27,
      order: 27,
      partOrder: 1,
      role: 'primary',
      subType: 'P18_error_analysis_binomial',
      operationSummary: '第(1)问：判定小明（两边同除以 x-1 漏根）与小强（提取 x-1 后去括号未变号）解法均错误（×，×）。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_41',
      procedureId: 'P18',
      partId: '(2)',
      sortOrder: 27,
      order: 27,
      partOrder: 2,
      role: 'primary',
      subType: 'P18_error_analysis_binomial',
      operationSummary: '第(2)问：移项得 2(x-1)-(x-1)²=0，提取 (x-1) 得 (x-1)(2-x+1)=0，解得 x₁=1, x₂=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_33',
      procedureId: 'P18',
      partId: null,
      sortOrder: 28,
      order: 28,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '检验四个方程可否因式分解：①x(x-1)=0、②(x-1/2)²=0、④(3x+2+4)(3x+2-4)=0 均可，③Δ<0 不可，共 3 个。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_2',
      procedureId: 'P18',
      partId: null,
      sortOrder: 29,
      order: 29,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '利用完全平方公式将 x²+2x+1=0 分解为 (x+1)²=0，解得 x₁=x₂=-1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_7',
      procedureId: 'P18',
      partId: null,
      sortOrder: 30,
      order: 30,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '利用完全平方公式将 x²-6x+9=0 分解为 (x-3)²=0，解得 x₁=x₂=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_11',
      procedureId: 'P18',
      partId: '(1)',
      sortOrder: 31,
      order: 31,
      partOrder: 1,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '第(1)问：对 x²-6x=0 提取公因式 x 得 x(x-6)=0，解得 x₁=0, x₂=6。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_11',
      procedureId: 'P18',
      partId: '(2)',
      sortOrder: 31,
      order: 31,
      partOrder: 2,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '第(2)问：对 2x²-8x+8=0 先提 2 再用完全平方公式化为 2(x-2)²=0，解得 x₁=x₂=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_36',
      procedureId: 'P18',
      partId: null,
      sortOrder: 32,
      order: 32,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '用十字相乘法将 x²-2x-3=0 分解为 (x-3)(x+1)=0，降次解得 x₁=3, x₂=-1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_13',
      procedureId: 'P18',
      partId: null,
      sortOrder: 33,
      order: 33,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '用十字相乘法将 x²-4x+3=0 分解为 (x-1)(x-3)=0，降次解得 x₁=1, x₂=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_24',
      procedureId: 'P18',
      partId: null,
      sortOrder: 34,
      order: 34,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '用十字相乘法将 x²+6x-7=0 分解为 (x+7)(x-1)=0，降次解得 x₁=-7, x₂=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_5',
      procedureId: 'P18',
      partId: null,
      sortOrder: 35,
      order: 35,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '先将 x²-x=56 移项得 x²-x-56=0，再用十字相乘法分解为 (x-8)(x+7)=0，解得 x=-7 或 x=8。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_12',
      procedureId: 'P18',
      partId: '(1)',
      sortOrder: 36,
      order: 36,
      partOrder: 1,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '第(1)问：将 x²=3x 移项得 x²-3x=0，提取 x 得 x(x-3)=0，解得 x₁=0, x₂=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_12',
      procedureId: 'P18',
      partId: '(2)',
      sortOrder: 36,
      order: 36,
      partOrder: 2,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '第(2)问：用十字相乘法将 x²-4x-5=0 分解为 (x-5)(x+1)=0，解得 x₁=-1, x₂=5。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_26',
      procedureId: 'P18',
      partId: '(1)',
      sortOrder: 37,
      order: 37,
      partOrder: 1,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '第(1)问：将 x²=6x 移项提取公因式 x 得 x(x-6)=0，解得 x₁=0, x₂=6。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_26',
      procedureId: 'P18',
      partId: '(2)',
      sortOrder: 37,
      order: 37,
      partOrder: 2,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '第(2)问：用十字相乘法将 x²-5x+6=0 分解为 (x-2)(x-3)=0，解得 x₁=2, x₂=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_40',
      procedureId: 'P18',
      partId: '(1)',
      sortOrder: 38,
      order: 38,
      partOrder: 1,
      role: 'primary',
      subType: 'P18_extract_monomial_x',
      operationSummary: '第(1)问：对 x²-4x=0 提取公因式 x 得 x(x-4)=0，解得 x₁=0, x₂=4。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_40',
      procedureId: 'P18',
      partId: '(2)',
      sortOrder: 38,
      order: 38,
      partOrder: 2,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '第(2)问：用十字相乘法将 x²+6x+5=0 分解为 (x+1)(x+5)=0，解得 x₁=-1, x₂=-5。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_25',
      procedureId: 'P18',
      partId: '(1)',
      sortOrder: 39,
      order: 39,
      partOrder: 1,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '第(1)问：用十字相乘法将 x²-4x-5=0 分解为 (x-5)(x+1)=0，解得 x₁=5, x₂=-1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_25',
      procedureId: 'P18',
      partId: '(2)',
      sortOrder: 39,
      order: 39,
      partOrder: 2,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '第(2)问：将 5x(x-2)=3(x-2) 移项并提取 (x-2) 得 (x-2)(5x-3)=0，解得 x₁=2, x₂=3/5。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_39',
      procedureId: 'P18',
      partId: '(1)',
      sortOrder: 40,
      order: 40,
      partOrder: 1,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '第(1)问：用十字相乘法将 x²+12x+27=0 分解为 (x+3)(x+9)=0，解得 x₁=-3, x₂=-9。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_39',
      procedureId: 'P18',
      partId: '(2)',
      sortOrder: 40,
      order: 40,
      partOrder: 2,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '第(2)问：将 (2x-1)²=2(2x-1) 移项提取 (2x-1) 得 (2x-1)(2x-3)=0，解得 x₁=1/2, x₂=3/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_43',
      procedureId: 'P18',
      partId: '(1)',
      sortOrder: 41,
      order: 41,
      partOrder: 1,
      role: 'primary',
      subType: 'P18_trinomial_factoring',
      operationSummary: '第(1)问：用十字相乘法将 x²+2x-3=0 分解为 (x+3)(x-1)=0，解得 x₁=-3, x₂=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_7_43',
      procedureId: 'P18',
      partId: '(2)',
      sortOrder: 41,
      order: 41,
      partOrder: 2,
      role: 'primary',
      subType: 'P18_extract_binomial_factor',
      operationSummary: '第(2)问：将 2(x+3)²=x(x+3) 移项提取 (x+3) 得 (x+3)(x+6)=0，解得 x₁=-3, x₂=-6。',
      status: 'published'
    }    ,
    // =========================================================================
    // P19：识别一元二次方程、化一般形式与由定义求参数（共 25 道关联题，严格按学习顺序 sortOrder 1~25 排列）
    // =========================================================================
    {
      questionId: 'quad25_1_1',
      procedureId: 'P19',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P19_identify_quadratic_equation',
      operationSummary: '排除一次方程 x+1=0、二元方程 x+y²=0 与分式方程 1/x+x=1，识别出 x²-2x+1=0 是一元二次方程。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_2',
      procedureId: 'P19',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P19_identify_quadratic_equation',
      operationSummary: '排除含两个未知数的 2x-3y=5、x²+4=5y 及分式方程 2/x²-3=x，识别出 x²-4x-4=0 属于一元二次方程。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_6',
      procedureId: 'P19',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P19_identify_quadratic_equation',
      operationSummary: '排除二元方程 ②2x²-3xy+4=0 与分式方程 ③x²-1/x=4，识别出 ①3x²+x=20 与 ④x²=0 是一元二次方程。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_8',
      procedureId: 'P19',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P19_identify_quadratic_equation',
      operationSummary: '排除二元方程、分式方程及展开后 x² 抵消的 (x+1)(x+3)=x²-1，识别出 x²=4 是一元二次方程。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_4',
      procedureId: 'P19',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P19_identify_quadratic_equation',
      operationSummary: '排除未说明 a≠0 的 ax²+bx+c=0、分式方程及根式方程，将 3(x-9)²-(x+1)²=1 展开为 2x²-56x+241=0 判定为一元二次方程。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_5',
      procedureId: 'P19',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P19_identify_quadratic_equation',
      operationSummary: '排除分式方程、展开后 2x² 抵消的 (x+2)(2x-1)=2x² 及未限定 a≠0 的 ax²+bx+c=0，判定 √2x²-1=0 一定是一元二次方程。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_3',
      procedureId: 'P19',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P19_identify_quadratic_equation',
      operationSummary: '逐一检验 6 个方程，排除分式方程(2)、二元方程(3)、三次方程(4)及展开后 6x² 抵消的(5)，确定(1)和(6)是一元二次方程。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_7',
      procedureId: 'P19',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P19_identify_quadratic_equation',
      operationSummary: '在 6 个方程中排除未限定 a≠0 的②、分式方程③、二元方程⑤及 x² 抵消的⑥，统计出①x²-2x-1=0 和④-x²=0 共 2 个一元二次方程。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_9',
      procedureId: 'P19',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P19_identify_quadratic_equation',
      operationSummary: '排除分式方程②、二元方程③、x² 抵消的④及 m 可能为 0 的⑤，由 m²+1≥1≠0 判定 ①⑥ 一定是一元二次方程。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_10',
      procedureId: 'P19',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '将 3x²-2=4x 移项化为一般形式 3x²-4x-2=0，连同负号读取一次项系数为 -4。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_13',
      procedureId: 'P19',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '将 4x²+x=5 移项化为一般形式 4x²+x-5=0，提取各项系数 a=4, b=1, c=-5。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_14',
      procedureId: 'P19',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '将 2x²-5=6x 移项化为常数项为 -5 的一般形式 2x²-6x-5=0，读取一次项系数为 -6。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_11',
      procedureId: 'P19',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '将 (1-x)(x+3)=1 展开移项得 -x²-2x+2=0，两边同乘 -1 化为标准一般形式 x²+2x-2=0。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_16',
      procedureId: 'P19',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '将 x(x-6)=6x+25 去括号移项合并为 x²-12x-25=0，对照 x²-mx+n=0 确定 m=12, n=-25。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_17',
      procedureId: 'P19',
      partId: null,
      sortOrder: 15,
      order: 15,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '将 (x+3)²-3x=5x² 展开移项化为二次项系数为 4 的一般式 4x²-3x-9=0，得出一次项系数为 -3。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_15',
      procedureId: 'P19',
      partId: '(1)',
      sortOrder: 16,
      order: 16,
      partOrder: 1,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '第(1)问：将 5x-8=3x² 移项化为一般形式 3x²-5x+8=0，指出二次项系数 3、一次项系数 -5、常数项 8。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_15',
      procedureId: 'P19',
      partId: '(2)',
      sortOrder: 16,
      order: 16,
      partOrder: 2,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '第(2)问：将 2x(x-1)=3(x+5)+3 去括号移项化为 2x²-5x-18=0，指出二次项系数 2、一次项系数 -5、常数项 -18。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_18',
      procedureId: 'P19',
      partId: '(1)',
      sortOrder: 17,
      order: 17,
      partOrder: 1,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '第(1)问：将 3x²=5x-1 移项化为 3x²-5x+1=0，写出二次项系数 3、一次项系数 -5、常数项 1。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_18',
      procedureId: 'P19',
      partId: '(2)',
      sortOrder: 17,
      order: 17,
      partOrder: 2,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '第(2)问：将 (x-3)²=x+3 展开移项化为 x²-7x+6=0，写出二次项系数 1、一次项系数 -7、常数项 6。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_18',
      procedureId: 'P19',
      partId: '(3)',
      sortOrder: 17,
      order: 17,
      partOrder: 3,
      role: 'primary',
      subType: 'P19_general_form_and_coeffs',
      operationSummary: '第(3)问：将 (2x-1)(x+5)=6x 展开移项化为 2x²+3x-5=0，写出二次项系数 2、一次项系数 3、常数项 -5。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_19',
      procedureId: 'P19',
      partId: null,
      sortOrder: 18,
      order: 18,
      role: 'primary',
      subType: 'P19_param_leading_coeff_nonzero',
      operationSummary: '由 (k-2)x²+3x-1=0 是关于 x 的一元二次方程，直接令二次项系数 k-2≠0，得出 k≠2。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_22',
      procedureId: 'P19',
      partId: null,
      sortOrder: 19,
      order: 19,
      role: 'primary',
      subType: 'P19_param_degree_and_coeff',
      operationSummary: '在一元二次方程中令 x 的最高次项指数 m²-2=2 得 m=±2，结合系数 m-2≠0 舍去 2，定解为 m=-2。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_24',
      procedureId: 'P19',
      partId: null,
      sortOrder: 20,
      order: 20,
      role: 'primary',
      subType: 'P19_param_degree_and_coeff',
      operationSummary: '在一元二次方程中令 x 的最高次项指数 m²-7=2 得 m=±3，结合二次项系数 m-3≠0 舍去 3，求得 m=-3。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_20',
      procedureId: 'P19',
      partId: null,
      sortOrder: 21,
      order: 21,
      role: 'primary',
      subType: 'P19_param_degree_and_coeff',
      operationSummary: '在一元二次方程中令 x 的最高次项指数 |a|-1=2 得 a=±3，结合 a-3≠0 舍去 3，得 a=-3。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_21',
      procedureId: 'P19',
      partId: null,
      sortOrder: 22,
      order: 22,
      role: 'primary',
      subType: 'P19_param_degree_and_coeff',
      operationSummary: '在一元二次方程中令 x 的最高次项指数 |m|+1=2 得 m=±1，结合 m+1≠0 舍去 -1，得 m=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_23',
      procedureId: 'P19',
      partId: null,
      sortOrder: 23,
      order: 23,
      role: 'primary',
      subType: 'P19_param_degree_and_coeff',
      operationSummary: '在一元二次方程中令 x 的最高次项指数 |m-1|=2 解得 m=3 或 m=-1，结合 m-3≠0 舍去 3，得 m=-1。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_27',
      procedureId: 'P19',
      partId: null,
      sortOrder: 24,
      order: 24,
      role: 'primary',
      subType: 'P19_param_degree_and_coeff',
      operationSummary: '在一元二次方程中令 x 的最高次项指数 |m|-3=2 得 m=±5，结合 m+5≠0 舍去 -5，求得 m=5。',
      status: 'published'
    },
    {
      questionId: 'quad25_1_26',
      procedureId: 'P19',
      partId: null,
      sortOrder: 25,
      order: 25,
      role: 'primary',
      subType: 'P19_param_degree_and_coeff',
      operationSummary: '在一元二次方程中令 x 的最高次项指数 |k|-2=2 得 k=±4，检验 k-2≠0 均成立，故 k=4 或 -4。',
      status: 'published'
    },

    // =========================================================================
    // P20：利用一元二次方程的根的定义代入求参数与整体降次求值（共 15 道关联题，严格按学习顺序 sortOrder 1~15 排列）
    // =========================================================================
    {
      questionId: 'quad25_2_1',
      procedureId: 'P20',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P20_coeff_relation_identify_root',
      operationSummary: '将已知等式 9a+3b+c=0 改写为 a·3²+b·3+c=0，对照 ax²+bx+c=0 直接判定方程有一个根为 x=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_2',
      procedureId: 'P20',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P20_coeff_relation_identify_root',
      operationSummary: '将 4a+2b+c=0 改写为 a·2²+b·2+c=0，对照方程 ax²+bx+c=0 直接判定必有一个根为 2。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_5',
      procedureId: 'P20',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P20_coeff_relation_identify_root',
      operationSummary: '将 4a-2b+c=0 改写为 a·(-2)²+b·(-2)+c=0，对照 ax²+bx+c=0 直接判定方程必有根 x=-2。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_3',
      procedureId: 'P20',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P20_coeff_relation_identify_root',
      operationSummary: '由 9a+3b+c=0 与 9a-3b+c=0 分别识别出当 x=3 与 x=-3 时 ax²+bx+c=0 成立，确定两根为 x₁=3, x₂=-3。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_7',
      procedureId: 'P20',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P20_substitute_root_find_param',
      operationSummary: '将已知根 x=1 代入 x²+mx-3=0 得 1+m-3=0，解得 m=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_8',
      procedureId: 'P20',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P20_substitute_root_find_param',
      operationSummary: '将 x=1 代入 x²+mx+2=0 得 1+m+2=0，移项解得 m=-3。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_10',
      procedureId: 'P20',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P20_substitute_root_find_param',
      operationSummary: '将根 x=2 代入方程 x²-3x+c=0 得 2²-3×2+c=0，解得 c=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_9',
      procedureId: 'P20',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P20_substitute_root_find_param',
      operationSummary: '将 x=-1 代入 -2x²-ax+a²=0 整理得 a²+a-2=0，解得 a=-2 或 a=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_11',
      procedureId: 'P20',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P20_substitute_root_check_leading',
      operationSummary: '将 x=1 代入一元二次方程 (a-2)x²-2x+1=0 得 a-2-2+1=0，解得 a=3（且满足 a-2≠0）。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_12',
      procedureId: 'P20',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P20_substitute_root_check_leading',
      operationSummary: '将 x=1/2 代入 (a-1)x²+x+a²-1=0 整理得 4a²+a-3=0，解得 a=-1 或 a=3/4（均满足二次项系数 a-1≠0）。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_14',
      procedureId: 'P20',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P20_substitute_root_check_leading',
      operationSummary: '将 x=0 代入一元二次方程 (k+2)x²+3x+k²-4=0 得 k²-4=0 即 k=±2，结合二次项系数 k+2≠0 舍去 -2，得 k=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_15',
      procedureId: 'P20',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P20_substitute_root_check_leading',
      operationSummary: '将 x=0 代入一元二次方程 (m+1)x²+x+m²-1=0 得 m²-1=0 即 m=±1，结合二次项系数 m+1≠0 舍去 -1，得 m=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_13',
      procedureId: 'P20',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P20_overall_degree_reduction',
      operationSummary: '将 x=2 代入 x²-4mx+m²=0 并移项提炼出核心整体 m²-8m=-4，整体代入 m(m-8)-1=m²-8m-1 算得 -5。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_16',
      procedureId: 'P20',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P20_overall_degree_reduction',
      operationSummary: '将 x=m 代入 x²-3x-2=0 移项提炼整体 m²-3m=2，将 2m²-6m-2023 变形为 2(m²-3m)-2023，整体代入算得 -2019。',
      status: 'published'
    },
    {
      questionId: 'quad25_2_17',
      procedureId: 'P20',
      partId: null,
      sortOrder: 15,
      order: 15,
      role: 'primary',
      subType: 'P20_overall_degree_reduction',
      operationSummary: '将根 m, n 分别代入 x²+2026x-2027=0 提炼出 m²+2026m=2027 与 n²+2026n=2027，整体代入两个括号算得 1×2028=2028。',
      status: 'published'
    },

    // =========================================================================
    // P21：利用一元二次方程根与系数的关系（韦达定理）求对称式的值与参数（共 43 道关联题，严格按学习顺序 sortOrder 1~43 排列）
    // =========================================================================
    {
      questionId: 'quad25_8_8',
      procedureId: 'P21',
      partId: null,
      sortOrder: 1,
      order: 1,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '在 x²+5x+3=0 中提取 a=1, b=5，由韦达定理直接写出 x₁+x₂ = -b/a = -5。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_17',
      procedureId: 'P21',
      partId: null,
      sortOrder: 2,
      order: 2,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '在 x²+2x-1=0 中提取 a=1, b=2，由韦达定理得 x₁+x₂ = -2/1 = -2。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_25',
      procedureId: 'P21',
      partId: null,
      sortOrder: 3,
      order: 3,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '在 x²-2026x+2025=0 中提取 a=1, b=-2026，由韦达定理得 x₁+x₂ = -(-2026)/1 = 2026。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_4',
      procedureId: 'P21',
      partId: null,
      sortOrder: 4,
      order: 4,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '在非首一方程 2x²+4x-1=0 中提取 a=2, b=4，由韦达定理得 x₁+x₂ = -4/2 = -2。',
      status: 'published'
    },
    {
      questionId: 'g9_jz_mid_q3',
      procedureId: 'P21',
      partId: null,
      sortOrder: 5,
      order: 5,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '在 x²-2x-3=0 中提取 a=1, c=-3，由韦达定理直接得出两根之积 ab = c/a = -3。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_7',
      procedureId: 'P21',
      partId: null,
      sortOrder: 6,
      order: 6,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '先将 x²+2x=2026 移项化为一般式 x²+2x-2026=0，再由韦达定理得出 m+n = -2。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_10',
      procedureId: 'P21',
      partId: null,
      sortOrder: 7,
      order: 7,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '先将 x²+x=4 移项化为一般式 x²+x-4=0，再由韦达定理得出两根之积 x₁·x₂ = -4。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_16',
      procedureId: 'P21',
      partId: null,
      sortOrder: 8,
      order: 8,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '先将 x²=x+3 移项化为一般式 x²-x-3=0 (a=1,c=-3)，再由韦达定理得 x₁x₂ = -3。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_2',
      procedureId: 'P21',
      partId: null,
      sortOrder: 9,
      order: 9,
      role: 'primary',
      subType: 'P21_one_root_find_other',
      operationSummary: '由 x²+mx-6=0 的两根之积 x₁x₂=-6 及一根为 3，直接算得另一根为 -6÷3 = -2。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_14',
      procedureId: 'P21',
      partId: null,
      sortOrder: 10,
      order: 10,
      role: 'primary',
      subType: 'P21_one_root_find_other',
      operationSummary: '由两根 x₁=-2, x₂=4 结合韦达定理得 -m=-2+4=2（m=-2）、n=(-2)×4=-8，相加得 m+n=-10。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_21',
      procedureId: 'P21',
      partId: null,
      sortOrder: 11,
      order: 11,
      role: 'primary',
      subType: 'P21_linear_comb_eval',
      operationSummary: '由 x²-5x+6=0 得 m+n=5, mn=6，整体代入 mn+m+n 算得 6+5=11。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_23',
      procedureId: 'P21',
      partId: null,
      sortOrder: 12,
      order: 12,
      role: 'primary',
      subType: 'P21_linear_comb_eval',
      operationSummary: '由 x²-3x+1=0 得 x₁+x₂=3, x₁x₂=1，整体代入 x₁+x₂-x₁x₂ 算得 3-1=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_3',
      procedureId: 'P21',
      partId: null,
      sortOrder: 13,
      order: 13,
      role: 'primary',
      subType: 'P21_linear_comb_eval',
      operationSummary: '由 x²+5x-4=0 得 x₁+x₂=-5, x₁x₂=-4，整体代入 x₁+x₂-2x₁x₂ 算得 -5-2×(-4)=3。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_32',
      procedureId: 'P21',
      partId: null,
      sortOrder: 14,
      order: 14,
      role: 'primary',
      subType: 'P21_linear_comb_eval',
      operationSummary: '由 x²+2x-5=0 得 x₁+x₂=-2, x₁x₂=-5，将原式变形为 2(x₁+x₂)-x₁x₂ 整体代入算得 2×(-2)-(-5)=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_37',
      procedureId: 'P21',
      partId: null,
      sortOrder: 15,
      order: 15,
      role: 'primary',
      subType: 'P21_linear_comb_eval',
      operationSummary: '由 x²-2x-4=0 得 α+β=2, αβ=-4，整体代入 αβ+2(α+β)+1 算得 -4+2×2+1=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_6',
      procedureId: 'P21',
      partId: null,
      sortOrder: 16,
      order: 16,
      role: 'primary',
      subType: 'P21_linear_comb_eval',
      operationSummary: '由 x²-4x-5=0 得 a+b=4, ab=-5，整体代入 ab/(a+b) 算得 -5/4。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_11',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 17,
      order: 17,
      partOrder: 1,
      role: 'primary',
      subType: 'P21_one_root_find_other',
      operationSummary: '第(1)问：将根 x=-3 代入 x²+mx-6=0（或利用韦达定理），解得 m=1。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_11',
      procedureId: 'P21',
      partId: '(2)',
      sortOrder: 17,
      order: 17,
      partOrder: 2,
      role: 'primary',
      subType: 'P21_linear_comb_eval',
      operationSummary: '第(2)问：由 x²+x-6=0 得 x₁+x₂=-1, x₁x₂=-6，代入 x₁+x₂-2x₁x₂ 算得 -1-2×(-6)=11。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_9',
      procedureId: 'P21',
      partId: null,
      sortOrder: 18,
      order: 18,
      role: 'primary',
      subType: 'P21_reciprocal_sum_eval',
      operationSummary: '由 x²-4x-5=0 得 m+n=4, mn=-5，将 1/m+1/n 通分为 (m+n)/(mn) 代入算得 -4/5。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_22',
      procedureId: 'P21',
      partId: null,
      sortOrder: 19,
      order: 19,
      role: 'primary',
      subType: 'P21_reciprocal_sum_eval',
      operationSummary: '由 x²-4x-1=0 得 a+b=4, ab=-1，将 1/a+1/b 通分为 (a+b)/(ab) 代入算得 -4。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_24',
      procedureId: 'P21',
      partId: null,
      sortOrder: 20,
      order: 20,
      role: 'primary',
      subType: 'P21_reciprocal_sum_eval',
      operationSummary: '由 x²-5x-6=0 得 a+b=5, ab=-6，通分 1/a+1/b=(a+b)/(ab) 代入算得 -5/6。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_5',
      procedureId: 'P21',
      partId: null,
      sortOrder: 21,
      order: 21,
      role: 'primary',
      subType: 'P21_reciprocal_sum_eval',
      operationSummary: '由 2x²+4x-3=0 得 x₁+x₂=-2, x₁x₂=-3/2，通分 1/x₁+1/x₂=(x₁+x₂)/(x₁x₂) 代入算得 4/3。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_33',
      procedureId: 'P21',
      partId: null,
      sortOrder: 22,
      order: 22,
      role: 'primary',
      subType: 'P21_reciprocal_sum_eval',
      operationSummary: '由 3x²+2x-1=0 得 x₁+x₂=-2/3, x₁x₂=-1/3，通分 1/x₁+1/x₂=(x₁+x₂)/(x₁x₂) 代入算得 2。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_38',
      procedureId: 'P21',
      partId: null,
      sortOrder: 23,
      order: 23,
      role: 'primary',
      subType: 'P21_reciprocal_sum_eval',
      operationSummary: '将满足 m²-5m=1, n²-5n=1 (m≠n) 的 m, n 视为方程 x²-5x-1=0 的两根，得 m+n=5, mn=-1，通分求得 1/m+1/n=-5。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_12',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 24,
      order: 24,
      partOrder: 1,
      role: 'primary',
      subType: 'P21_one_root_find_other',
      operationSummary: '第(1)问：将根 x=1 代入 3x²-18x+m=0，解得 m=15。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_12',
      procedureId: 'P21',
      partId: '(2)',
      sortOrder: 24,
      order: 24,
      partOrder: 2,
      role: 'primary',
      subType: 'P21_reciprocal_sum_eval',
      operationSummary: '第(2)问：由 3x²-18x+15=0 得 x₁+x₂=6, x₁x₂=5，通分求得 1/x₁+1/x₂=(x₁+x₂)/(x₁x₂)=6/5。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_36',
      procedureId: 'P21',
      partId: null,
      sortOrder: 25,
      order: 25,
      role: 'primary',
      subType: 'P21_product_expand_eval',
      operationSummary: '由 x²-2024x+1=0 得 a+b=2024, ab=1，将 (a+1)(b+1) 展开为 ab+(a+b)+1 代入算得 2026。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_40',
      procedureId: 'P21',
      partId: null,
      sortOrder: 26,
      order: 26,
      role: 'primary',
      subType: 'P21_product_expand_eval',
      operationSummary: '由 x²+2x-2024=0 得 x₁+x₂=-2, x₁x₂=-2024，将 (x₁-1)(x₂-1) 展开为 x₁x₂-(x₁+x₂)+1 代入算得 -2021。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_34',
      procedureId: 'P21',
      partId: null,
      sortOrder: 27,
      order: 27,
      role: 'primary',
      subType: 'P21_product_expand_eval',
      operationSummary: '由 3x²+2x-6=0 得 x₁+x₂=-2/3, x₁x₂=-2，展开 (x₁+1)(x₂+1)=x₁x₂+(x₁+x₂)+1 代入算得 -5/3。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_26',
      procedureId: 'P21',
      partId: null,
      sortOrder: 28,
      order: 28,
      role: 'primary',
      subType: 'P21_product_expand_eval',
      operationSummary: '由 2x²-3x-5=0 得 x₁+x₂=3/2, x₁x₂=-5/2，将 (1+1/x₁)(1+1/x₂) 展开通分为 1+(x₁+x₂+1)/(x₁x₂) 代入算得 0。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_41',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 29,
      order: 29,
      partOrder: 1,
      role: 'primary',
      subType: 'P21_product_expand_eval',
      operationSummary: '第(1)问：由 2x²-9x+3=0 得 x₁+x₂=9/2, x₁x₂=3/2，展开 (x₁+1)(x₂+1)=x₁x₂+(x₁+x₂)+1 代入算得 7。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_41',
      procedureId: 'P21',
      partId: '(2)',
      sortOrder: 29,
      order: 29,
      partOrder: 2,
      role: 'primary',
      subType: 'P21_quadratic_symmetric_eval',
      operationSummary: '第(2)问：将 x₁²-x₁x₂+x₂² 配方变形为 (x₁+x₂)²-3x₁x₂，代入 (9/2)²-3×(3/2) 算得 63/4。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_28',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 30,
      order: 30,
      partOrder: 1,
      role: 'primary',
      subType: 'P21_quadratic_symmetric_eval',
      operationSummary: '第(1)问：由 2x²+6x-3=0 得 x₁+x₂=-3, x₁x₂=-3/2，代入 (x₁-x₂)²=(x₁+x₂)²-4x₁x₂ 算得 15。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_28',
      procedureId: 'P21',
      partId: '(2)',
      sortOrder: 30,
      order: 30,
      partOrder: 2,
      role: 'primary',
      subType: 'P21_quadratic_symmetric_eval',
      operationSummary: '第(2)问：通分变形 x₂/x₁+x₁/x₂=[(x₁+x₂)²-2x₁x₂]/(x₁x₂)，代入 (-3)²-2×(-3/2) 除以 -3/2 算得 -8。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_18',
      procedureId: 'P21',
      partId: null,
      sortOrder: 31,
      order: 31,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '由 x²+3x+c=0 得 m+n=-3, mn=c，代入 m+n=3mn 得 -3=3c，解得 c=-1（此时 Δ=9+4=13>0）。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_19',
      procedureId: 'P21',
      partId: null,
      sortOrder: 32,
      order: 32,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '由 x₁+x₂=-(2m-1)=7 解得 m=-3，代入检验方程 x²-7x+9=0 的 Δ=49-36=13>0 成立，定解 m=-3。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_39',
      procedureId: 'P21',
      partId: null,
      sortOrder: 33,
      order: 33,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '由 2x²-kx+3=0 得 x₁+x₂=k/2, x₁x₂=3/2，代入 1/x₁+1/x₂=(x₁+x₂)/(x₁x₂)=k/3=4 解得 k=12。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_31',
      procedureId: 'P21',
      partId: null,
      sortOrder: 34,
      order: 34,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '结合 x₁+x₂=6 与 x₁=2x₂ 解出 x₂=2, x₁=4，再由两根之积 m=x₁x₂=4×2 求得 m=8。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_35',
      procedureId: 'P21',
      partId: null,
      sortOrder: 35,
      order: 35,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '由 2a+b=0 得 b=-2a，故 x₁+x₂=-b/a=2；联立 x₁=3x₂ 解得 x₂=1/2, x₁=3/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_13',
      procedureId: 'P21',
      partId: null,
      sortOrder: 36,
      order: 36,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '由 x²-2kx+k-1=0 得 x₁+x₂=2k, x₁x₂=k-1，代入 x₁+x₂-x₁x₂=5 解得 k=4，并检验 Δ=52>0 成立。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_29',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 37,
      order: 37,
      partOrder: 1,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '第(1)问：将不相等实数 x₁, x₂ 视为方程 x²+3x+5k=0 的两根，由韦达定理得 x₁+x₂=-3。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_29',
      procedureId: 'P21',
      partId: '(2)',
      sortOrder: 37,
      order: 37,
      partOrder: 2,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '第(2)问：由两数异号得 x₁x₂=5k<0（此时 Δ=9-20k>0 恒成立），解得 k<0。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_30',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 38,
      order: 38,
      partOrder: 1,
      role: 'secondary',
      subType: 'P21_discriminant_and_vieta',
      operationSummary: '第(1)问：调用 P16 计算 Δ=[-(m+4)]²-4(2m-1)=m²+20>0，证明方程总有两个不相等的实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_30',
      procedureId: 'P21',
      partId: '(2)',
      sortOrder: 38,
      order: 38,
      partOrder: 2,
      role: 'primary',
      subType: 'P21_linear_comb_eval',
      operationSummary: '第(2)问：当 m=1 时由韦达定理得 x₁+x₂=m+4=5, x₁x₂=2m-1=1，代入 x₁+x₂+3x₁x₂ 算得 8。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_15',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 39,
      order: 39,
      partOrder: 1,
      role: 'secondary',
      subType: 'P21_discriminant_and_vieta',
      operationSummary: '第(1)问：由有两个实数根列 Δ=(-2m)²-4(m²-m)=4m≥0，解得 m≥0。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_15',
      procedureId: 'P21',
      partId: '(2)',
      sortOrder: 39,
      order: 39,
      partOrder: 2,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '第(2)问：由 x₁+x₂=2m, x₁x₂=m²-m 代入 1/x₁+1/x₂=(x₁+x₂)/(x₁x₂)=1，解得 m=3（满足 m≥0 且 m²-m≠0）。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_43',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 40,
      order: 40,
      partOrder: 1,
      role: 'secondary',
      subType: 'P21_discriminant_and_vieta',
      operationSummary: '第(1)问：由方程有实数根列 Δ=[-(2m-1)]²-4m²=-4m+1≥0，解得 m≤1/4。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_43',
      procedureId: 'P21',
      partId: '(2)',
      sortOrder: 40,
      order: 40,
      partOrder: 2,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '第(2)问：由 x₁+x₂=2m-1, x₁x₂=m² 代入 x₁+x₂=2-x₁x₂ 解得 m=1 或 m=-3，结合 m≤1/4 舍去 1，定解 m=-3。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_42',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 41,
      order: 41,
      partOrder: 1,
      role: 'secondary',
      subType: 'P21_discriminant_and_vieta',
      operationSummary: '第(1)问：分 k=0（一次方程有实根）与 k≠0 且 Δ=[-(2k+1)]²-4k(k+3)≥0 讨论，综合得 k≤1/8。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_42',
      procedureId: 'P21',
      partId: '(2)',
      sortOrder: 41,
      order: 41,
      partOrder: 2,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '第(2)问：由 x₁+x₂=(2k+1)/k, x₁x₂=(k+3)/k 代入 1/x₁+1/x₂=(2k+1)/(k+3)=-1，解得 k=-4/3（满足 k≤1/8 且 k≠0）。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_44',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 42,
      order: 42,
      partOrder: 1,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '第(1)问：在 2x²-5x-1=0 中提取 a=2, b=-5, c=-1，写出 x₁+x₂=5/2, x₁x₂=-1/2。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_44',
      procedureId: 'P21',
      partId: '(2)①',
      sortOrder: 42,
      order: 42,
      partOrder: 2,
      role: 'secondary',
      subType: 'P21_discriminant_and_vieta',
      operationSummary: '第(2)①问：计算 Δ=[-(2k+1)]²-4(k²/2-2)=2k²+4k+9=2(k+1)²+7>0，证明恒有两个不相等实数根。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_44',
      procedureId: 'P21',
      partId: '(2)②',
      sortOrder: 42,
      order: 42,
      partOrder: 3,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '第(2)②问：由 x₁+x₂=2k+1, x₁x₂=k²/2-2 代入 x₁+x₂=2x₁x₂+5 得 k²-2k=0，解得 k=0 或 k=2。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_45',
      procedureId: 'P21',
      partId: '(1)',
      sortOrder: 43,
      order: 43,
      partOrder: 1,
      role: 'primary',
      subType: 'P21_direct_sum_product',
      operationSummary: '第(1)问：在 x²-6x-15=0 中由韦达定理直接写出 x₁+x₂=6, x₁·x₂=-15。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_45',
      procedureId: 'P21',
      partId: '(2)',
      sortOrder: 43,
      order: 43,
      partOrder: 2,
      role: 'primary',
      subType: 'P21_reciprocal_sum_eval',
      operationSummary: '第(2)问：由 2x²-4x+1=0 得 x₁+x₂=2, x₁x₂=1/2，通分求得 1/x₁+1/x₂=(x₁+x₂)/(x₁x₂)=4。',
      status: 'published'
    },
    {
      questionId: 'quad25_8_45',
      procedureId: 'P21',
      partId: '(3)',
      sortOrder: 43,
      order: 43,
      partOrder: 3,
      role: 'primary',
      subType: 'P21_vieta_solve_param',
      operationSummary: '第(3)问：由 x₁+x₂=2m+1, x₁x₂=m²+1 代入 x₁+x₂=x₁x₂-3 解得 m=3 或 m=-1，结合 Δ=4m-3≥0 舍去 -1，定解 m=3。',
      status: 'published'
    }
  ];

  function getQuestionBankSource() {
    if (Array.isArray(window.QUESTION_BANK) && window.QUESTION_BANK.length > 0) {
      return window.QUESTION_BANK;
    }
    if (typeof initialQuestions !== 'undefined' && Array.isArray(initialQuestions)) {
      return initialQuestions;
    }
    return [];
  }

  const ProceduralKnowledgeService = {
    getAllProcedures() {
      const list = Array.isArray(window.PROCEDURAL_KNOWLEDGE) ? window.PROCEDURAL_KNOWLEDGE : [];
      // Dynamically attach ordered questionIds from QUESTION_PROCEDURES without duplicating question objects
      return list.map(proc => {
        const seen = new Set();
        const orderedRecords = QUESTION_PROCEDURES
          .filter(r => r.procedureId === proc.id)
          .slice()
          .sort((a, b) => ((a.sortOrder ?? a.order ?? 0) - (b.sortOrder ?? b.order ?? 0)) || a.questionId.localeCompare(b.questionId, 'en'));
        const qIds = [];
        orderedRecords.forEach(r => {
          if (!seen.has(r.questionId)) {
            seen.add(r.questionId);
            qIds.push(r.questionId);
          }
        });
        proc.questionIds = qIds;
        return proc;
      });
    },

    getProcedureById(procedureId) {
      return this.getAllProcedures().find(p => p.id === procedureId) || null;
    },

    getProceduresForQuestion(questionId, partId = undefined) {
      const records = QUESTION_PROCEDURES.filter(r => {
        if (r.questionId !== questionId) return false;
        if (partId !== undefined && r.partId !== partId) return false;
        return true;
      });
      return records
        .slice()
        .sort((a, b) => (a.partOrder || 0) - (b.partOrder || 0) || ((a.sortOrder ?? a.order ?? 0) - (b.sortOrder ?? b.order ?? 0)))
        .map(r => ({
          ...r,
          procedure: this.getProcedureById(r.procedureId)
        }));
    },

    getQuestionCollectionByProcedure(procedureId) {
      const proc = this.getProcedureById(procedureId);
      if (!proc) return null;

      const bank = getQuestionBankSource();
      const questionMap = new Map(bank.map(q => [q.id, q]));

      const rawRecords = QUESTION_PROCEDURES.filter(r => r.procedureId === procedureId);

      const groupedByQuestion = new Map();
      rawRecords.forEach(record => {
        const q = questionMap.get(record.questionId);
        if (!q) return;
        const sortOrd = record.sortOrder ?? record.order ?? 999;

        if (!groupedByQuestion.has(record.questionId)) {
          groupedByQuestion.set(record.questionId, {
            questionId: record.questionId,
            procedureId: procedureId,
            sortOrder: sortOrd,
            order: sortOrd,
            primaryPartId: record.inCollectionOrder ? record.partId : null,
            role: record.role,
            status: record.status,
            question: q,
            parts: []
          });
        }

        const group = groupedByQuestion.get(record.questionId);
        if (typeof sortOrd === 'number' && sortOrd < group.sortOrder) {
          group.sortOrder = sortOrd;
          group.order = sortOrd;
        }
        if (record.inCollectionOrder && record.partId) {
          group.primaryPartId = record.partId;
        }
        group.parts.push({
          partId: record.partId,
          partOrder: record.partOrder || 1,
          role: record.role,
          subType: record.subType || null,
          inCollectionOrder: record.inCollectionOrder !== false,
          operationSummary: record.operationSummary || '',
          notes: record.notes || null,
          status: record.status
        });
      });

      const items = Array.from(groupedByQuestion.values()).sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
        return a.questionId.localeCompare(b.questionId, 'en');
      });

      items.forEach(item => {
        item.parts.sort((a, b) => (a.partOrder || 0) - (b.partOrder || 0));
      });

      return {
        procedure: proc,
        totalQuestions: items.length,
        questionIds: items.map(it => it.questionId),
        items: items
      };
    },

    getAllCollections() {
      return this.getAllProcedures().map(proc => this.getQuestionCollectionByProcedure(proc.id)).filter(Boolean);
    },

    validateData() {
      const errors = [];
      const warnings = [];

      const procedures = this.getAllProcedures();
      const procIds = new Set();
      const requiredProcFields = ['id', 'name', 'grade', 'subject', 'chapter', 'description', 'applicability', 'prerequisites', 'steps', 'pitfalls', 'status'];

      procedures.forEach((p, idx) => {
        requiredProcFields.forEach(f => {
          if (p[f] === undefined || p[f] === null || p[f] === '') {
            errors.push(`PROCEDURAL_KNOWLEDGE[${idx}] 缺少必填字段: ${f}`);
          }
        });
        if (procIds.has(p.id)) {
          errors.push(`PROCEDURAL_KNOWLEDGE 存在重复 ID: ${p.id}`);
        }
        procIds.add(p.id);
      });

      const bank = getQuestionBankSource();
      const validQuestionIds = new Set(bank.map(q => q.id));

      procedures.forEach((p, idx) => {
        if (p.exampleQuestionId && !validQuestionIds.has(p.exampleQuestionId)) {
          errors.push(`PROCEDURAL_KNOWLEDGE[${idx}] 的典型例题 ID 不存在: ${p.exampleQuestionId}`);
        }
      });

      const requiredAssocFields = ['questionId', 'procedureId', 'sortOrder', 'role', 'status'];
      const seenAssocKeys = new Set();
      const distinctQuestionIds = new Set();

      QUESTION_PROCEDURES.forEach((r, idx) => {
        requiredAssocFields.forEach(f => {
          if (r[f] === undefined) {
            errors.push(`QUESTION_PROCEDURES[${idx}] 缺少必填字段: ${f}`);
          }
        });

        if (!validQuestionIds.has(r.questionId)) {
          errors.push(`QUESTION_PROCEDURES[${idx}] 引用了不存在的 questionId: ${r.questionId}`);
        } else {
          distinctQuestionIds.add(r.questionId);
        }

        if (!procIds.has(r.procedureId)) {
          errors.push(`QUESTION_PROCEDURES[${idx}] 引用了不存在的 procedureId: ${r.procedureId}`);
        }

        const sortVal = r.sortOrder ?? r.order;
        if (typeof sortVal !== 'number' || !Number.isFinite(sortVal)) {
          errors.push(`QUESTION_PROCEDURES[${idx}] 的 sortOrder 字段不是有效数字: ${sortVal}`);
        }

        const dedupKey = `${r.questionId}::${r.procedureId}::${r.partId === null ? '__WHOLE__' : r.partId}`;
        if (seenAssocKeys.has(dedupKey)) {
          errors.push(`QUESTION_PROCEDURES 存在重复关联记录: ${dedupKey}`);
        }
        seenAssocKeys.add(dedupKey);
      });

      procedures.forEach(p => {
        const col = this.getQuestionCollectionByProcedure(p.id);
        const orderMap = new Map();
        (col?.items || []).forEach(item => {
          if (orderMap.has(item.sortOrder)) {
            errors.push(`集合 ${p.id} 中存在相同 sortOrder (${item.sortOrder}) 的不同题目: ${orderMap.get(item.sortOrder)} 与 ${item.questionId}`);
          }
          orderMap.set(item.sortOrder, item.questionId);
        });
      });

      return {
        valid: errors.length === 0,
        totalProcedures: procedures.length,
        totalAssociationRecords: QUESTION_PROCEDURES.length,
        totalDistinctQuestions: distinctQuestionIds.size,
        collectionsSummary: this.getAllCollections().map(c => ({
          procedureId: c.procedure.id,
          name: c.procedure.name,
          count: c.totalQuestions,
          questionIds: c.questionIds
        })),
        errors,
        warnings
      };
    }
  };

  // Compact badge inside Question Bank / Graph question cards to jump to the independent Procedural Knowledge Detail Page
  window.renderQuestionProceduralTagsHtml = function (questionId) {
    const records = ProceduralKnowledgeService.getProceduresForQuestion(questionId);
    if (!records || records.length === 0) return '';

    const byProc = new Map();
    records.forEach(r => {
      if (!r.procedure) return;
      if (!byProc.has(r.procedureId)) {
        byProc.set(r.procedureId, { procedure: r.procedure, sortOrder: r.sortOrder ?? r.order, parts: [] });
      }
      if (r.partId) byProc.get(r.procedureId).parts.push(r.partId);
    });

    const pills = Array.from(byProc.values()).map(({ procedure, sortOrder, parts }) => {
      const partText = parts.length > 0 ? ` · 小问${parts.join('')}` : '';
      return `
        <button type="button" class="btn-jump-to-proc inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#CCFBF1] transition" data-jump-proc="${escapeHtml(procedure.id)}" title="点击进入程序性知识详情页：${escapeHtml(procedure.name)}">
          <span class="px-1 rounded bg-[#0F766E] text-white text-[10px] font-bold">${escapeHtml(procedure.id)}</span>
          <span>${escapeHtml(procedure.name)}</span>
          <span class="text-[10px] text-[#115E59] opacity-80">[#${sortOrder}${escapeHtml(partText)}]</span>
        </button>
      `;
    }).join('');

    return `
      <div data-html2canvas-ignore="true" class="mt-2 pt-2 border-t border-dashed border-slate-200/80 flex flex-wrap items-center gap-1.5 text-xs">
        <span class="text-[11px] text-slate-400 font-medium flex items-center gap-1">
          <svg class="w-3.5 h-3.5 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
          <span>程序性知识：</span>
        </span>
        ${pills}
      </div>
    `;
  };

  window.jumpToProceduralCollection = function (procedureId) {
    if (!ProceduralKnowledgeService.getProcedureById(procedureId)) return;
    if (window.ProceduralView && typeof window.ProceduralView.openDetailFromExternal === 'function') {
      window.ProceduralView.openDetailFromExternal(procedureId);
      return;
    }
    if (typeof switchView === 'function') {
      switchView('procedural');
    }
    if (window.ProceduralView && typeof window.ProceduralView.openDetail === 'function') {
      window.ProceduralView.openDetail(procedureId);
    }
  };

  window.QUESTION_PROCEDURES = QUESTION_PROCEDURES;
  window.ProceduralKnowledgeService = ProceduralKnowledgeService;
})();
