// 题典网「题目与程序性知识关联及动态集合服务」数据层 (question-procedures.js)
// 核心原则：
// 1. 题目原始数据只保存一份（不修改 questions.js）。
// 2. 多小问题目支持关联到具体小问（partId），并依据现有标准答案（detail/analysis）记录实际解题操作。
// 3. 排序字段（order）保存在题目关联数据中，题目集合由关联数据动态生成，不复制独立题目清单。
// 4. 自动分析结果统一标记为 pending_review（待审核）。
(function () {
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  const QUESTION_PROCEDURES = [
    // =========================================================================
    // P01：利用直接开平方法解一元二次方程（共 18 道样本题，严格按教学进阶顺序 1~18 排列）
    // 第一阶段（order 1~13, 18）：完全平方形式直接开平方（含移项、系数化为1、整体平方式）
    // 第二阶段（order 14~17）：平方相等转化为两个一次方程（其中 quad25_3_14 仅第(4)问进入此进阶位置）
    // =========================================================================
    {
      questionId: 'quad25_3_7',
      procedureId: 'P01',
      partId: null,
      order: 1,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '移项得 x² = 25，对等式两边直接开平方得 x = ±5。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_8',
      procedureId: 'P01',
      partId: null,
      order: 2,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '先移项得 4x² = 1，再将 x² 系数化为 1 得 x² = 1/4，最后直接开平方得 x₁ = -1/2, x₂ = 1/2。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_2',
      procedureId: 'P01',
      partId: null,
      order: 3,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '对整体平方 (x + 1)² = 16 直接利用平方根定义得 x + 1 = 4 或 x + 1 = -4，解得 x = 3 或 -5。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_1',
      procedureId: 'P01',
      partId: null,
      order: 4,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '先两边同除以 2 化简得 (x - 2)² = 4，再直接开平方得 x - 2 = ±2，解得 x₁ = 4, x₂ = 0。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_10',
      procedureId: 'P01',
      partId: null,
      order: 5,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '移项得 3x² = 27，两边同除以 3 得 x² = 9，直接开平方得 x = ±3。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_3',
      procedureId: 'P01',
      partId: null,
      order: 6,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '移项得 (x + 1)² = 9，两边开平方得 x + 1 = ±3，解得 x₁ = 2, x₂ = -4。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_4',
      procedureId: 'P01',
      partId: null,
      order: 7,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '移项得 (2x + 1)² = 4，两边开平方得 2x + 1 = ±2，解得 x₁ = 1/2, x₂ = -3/2。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_12',
      procedureId: 'P01',
      partId: null,
      order: 8,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '两边同乘 3 得 (x + 3)² = 3，直接开平方得 x + 3 = ±√3，解得 x₁ = -3 + √3, x₂ = -3 - √3。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_13',
      procedureId: 'P01',
      partId: null,
      order: 9,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '先移项得 (1/4)(2x + 3)² = 4，系数化为 1 得 (2x + 3)² = 16，开平方得 2x + 3 = ±4，解得 x₁ = 1/2, x₂ = -7/2。',
      status: 'pending_review'
    },

    // quad25_3_5（多小问题目：共 3 个小问，标准答案均采用“移项→系数化为1→完全平方形式直接开平方”）
    {
      questionId: 'quad25_3_5',
      procedureId: 'P01',
      partId: '(1)',
      order: 10,
      partOrder: 1,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(1)问：2x² - 32 = 0 移项并除以 2 得 x² = 16，直接开平方得 x = ±4。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_5',
      procedureId: 'P01',
      partId: '(2)',
      order: 10,
      partOrder: 2,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(2)问：81x² - 1 = 0 移项并除以 81 得 x² = 1/81，直接开平方得 x = ±1/9。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_5',
      procedureId: 'P01',
      partId: '(3)',
      order: 10,
      partOrder: 3,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(3)问：4x² - 32 = 0 移项并除以 4 得 x² = 8，直接开平方并化简二次根式得 x = ±2√2。',
      status: 'pending_review'
    },

    {
      questionId: 'quad25_3_6',
      procedureId: 'P01',
      partId: null,
      order: 11,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '由 (x + 1)² = 9 直接开平方并移项得 x = -1 ± 3，解得 x₁ = -4, x₂ = 2。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_9',
      procedureId: 'P01',
      partId: null,
      order: 12,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '移项得 (x - 1)² = 49，开平方得 x - 1 = ±7，分情况解得 x = 8 或 x = -6。',
      notes: '原题标准答案 detail 中曾存在排版笔误，此处按标准答案操作归入 P01。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_11',
      procedureId: 'P01',
      partId: null,
      order: 13,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '由 (3x - 2)² = 64 直接开平方得 3x - 2 = ±8，分别解两个一元一次方程得 x₁ = 10/3, x₂ = -2。',
      status: 'pending_review'
    },

    // quad25_3_14（多小问题目：按各小问实际标准答案操作分别关联，仅第(4)问进入 order=14 的“平方相等转化为一次方程”进阶位置）
    {
      questionId: 'quad25_3_14',
      procedureId: 'P01',
      partId: '(4)',
      order: 14,
      partOrder: 4,
      inCollectionOrder: true,
      role: 'primary',
      subType: 'P01_C2_equal_squares_to_linear',
      operationSummary: '第(4)问（平方相等进阶位置）：对 (2x + 3)² = (3x + 2)² 两边开平方，转化为 2x + 3 = 3x + 2 或 2x + 3 = -3x - 2，解得 x₁ = 1, x₂ = -1。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_14',
      procedureId: 'P01',
      partId: '(1)',
      order: 14,
      partOrder: 1,
      inCollectionOrder: false,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(1)问（基础完全平方式直接开方）：对 (x - 1)² = 49 直接开平方得 x - 1 = ±7，解得 x₁ = 8, x₂ = -6。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_14',
      procedureId: 'P01',
      partId: '(2)',
      order: 14,
      partOrder: 2,
      inCollectionOrder: false,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(2)问（含系数整体平方式直接开方）：对 (2y - 3)² = 16 直接开平方得 2y - 3 = ±4，解得 y₁ = 7/2, y₂ = -1/2。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_14',
      procedureId: 'P01',
      partId: '(3)',
      order: 14,
      partOrder: 3,
      inCollectionOrder: false,
      role: 'secondary',
      subType: 'P01_C1_with_trinomial_square_factoring',
      operationSummary: '第(3)问（先逆用完全平方公式整理再直接开方）：标准答案先将左边 x² + 4x + 4 整理为 (x + 2)² = 16，再开平方得 x + 2 = ±4，解得 x₁ = 2, x₂ = -6。',
      notes: '第(3)问并非直接给出完全平方式，而是先逆用完全平方公式将二次三项式整理为 (x+2)² 后再执行 P01_C1，不归入平方相等进阶，单独记录子问操作并标记待审核。',
      status: 'pending_review'
    },

    {
      questionId: 'quad25_3_16',
      procedureId: 'P01',
      partId: null,
      order: 15,
      role: 'primary',
      subType: 'P01_C2_equal_squares_to_linear',
      operationSummary: '对 (3x + 2)² = (5 - 2x)² 两边开平方，转化为 3x + 2 = 5 - 2x 或 3x + 2 = 2x - 5，解得 x₁ = 3/5, x₂ = -7。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_17',
      procedureId: 'P01',
      partId: null,
      order: 16,
      role: 'primary',
      subType: 'P01_C2_equal_squares_to_linear',
      operationSummary: '对 (x - 2)² = (2x - 1)² 两边开平方得 x - 2 = ±(2x - 1)，转化为两个一次方程解得 x₁ = -1, x₂ = 1。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_18',
      procedureId: 'P01',
      partId: null,
      order: 17,
      role: 'primary',
      subType: 'P01_C2_equal_squares_to_linear',
      operationSummary: '对带系数的平方相等方程 (3x - 1)² = 4(2x + 3)² 两边开平方得 3x - 1 = ±2(2x + 3)，转化为两个一次方程解得 x₁ = -5/7, x₂ = -7。',
      status: 'pending_review'
    },

    // quad25_3_15（多小问题目：四个小问暂归 P01，位于 P01 集合末尾 order=18 综合巩固位置）
    {
      questionId: 'quad25_3_15',
      procedureId: 'P01',
      partId: '(1)',
      order: 18,
      partOrder: 1,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(1)问：3(x + 1)² = 1/3 两边除以 3 得 (x + 1)² = 1/9，开平方得 x + 1 = ±1/3，解得 x₁ = -2/3, x₂ = -4/3。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_15',
      procedureId: 'P01',
      partId: '(2)',
      order: 18,
      partOrder: 2,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(2)问：(3x + 2)² = 25 直接开平方得 3x + 2 = ±5，解得 x₁ = 1, x₂ = -7/3。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_15',
      procedureId: 'P01',
      partId: '(3)',
      order: 18,
      partOrder: 3,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(3)问：(x + 1)² - 4 = 0 移项得 (x + 1)² = 4，开平方得 x + 1 = ±2，解得 x₁ = 1, x₂ = -3。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_3_15',
      procedureId: 'P01',
      partId: '(4)',
      order: 18,
      partOrder: 4,
      role: 'primary',
      subType: 'P01_C1_direct_square_root',
      operationSummary: '第(4)问：(2 - x)² - 9 = 0 移项得 (2 - x)² = 9，开平方得 2 - x = ±3，解得 x₁ = -1, x₂ = 5。',
      status: 'pending_review'
    },

    // =========================================================================
    // P02：利用配方法解一元二次方程（共 6 道样本题，严格按 order 1~6 排列）
    // =========================================================================
    {
      questionId: 'quad25_4_1',
      procedureId: 'P02',
      partId: null,
      order: 1,
      role: 'primary',
      subType: 'P02_complete_square_transform',
      operationSummary: '将 x² + 6x - 7 = 0 移项得 x² + 6x = 7，两边同加 9 配成完全平方形式 (x + 3)² = 16。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_4_2',
      procedureId: 'P02',
      partId: null,
      order: 2,
      role: 'primary',
      subType: 'P02_complete_square_transform',
      operationSummary: '将 x² + 10x - 24 = 0 移项得 x² + 10x = 24，两边同加 25 配成完全平方形式 (x + 5)² = 49。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_4_3',
      procedureId: 'P02',
      partId: null,
      order: 3,
      role: 'primary',
      subType: 'P02_complete_square_param',
      operationSummary: '将 x² - 6x - 5 = 0 移项并两边同加 9 化为 (x - 3)² = 14，比对 (x + a)² = b 确定参数 b = 14。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_4_4',
      procedureId: 'P02',
      partId: null,
      order: 4,
      role: 'primary',
      subType: 'P02_complete_square_param',
      operationSummary: '将 x² - 8x - 5 = 0 移项并两边同加 16 化为 (x - 4)² = 21，比对 (x + a)² = b 确定参数 a = -4, b = 21。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_4_8',
      procedureId: 'P02',
      partId: null,
      order: 5,
      role: 'primary',
      subType: 'P02_complete_square_param',
      operationSummary: '标准答案将一般式 x² - 4x + 3 = 0 移项并两边同加 4 配方转化为 (x - 2)² = 1，从而确定 a = -2, b = 1。',
      status: 'pending_review'
    },

    // quad25_4_5（多小问题目：共 2 个小问，均使用配方法转化为完全平方式后调用 P01 开平方求根）
    {
      questionId: 'quad25_4_5',
      procedureId: 'P02',
      partId: '(1)',
      order: 6,
      partOrder: 1,
      role: 'primary',
      subType: 'P02_complete_square_solve',
      operationSummary: '第(1)问：x² + 4x - 2 = 0 移项得 x² + 4x = 2，两边加 4 配成 (x + 2)² = 6，再开平方得 x₁ = -2 + √6, x₂ = -2 - √6。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_4_5',
      procedureId: 'P02',
      partId: '(2)',
      order: 6,
      partOrder: 2,
      role: 'primary',
      subType: 'P02_expand_then_complete_square_solve',
      operationSummary: '第(2)问：先将 (t + 3)(t - 1) = 12 左边展开并移项整理得 t² + 2t = 15，两边加 1 配成 (t + 1)² = 16，再开平方得 t₁ = 3, t₂ = -5。',
      status: 'pending_review'
    },

    // =========================================================================
    // P03：利用配方法求代数式的最值（共 5 道样本题，严格按 order 1~5 排列）
    // =========================================================================
    {
      questionId: 'quad25_4_7',
      procedureId: 'P03',
      partId: null,
      order: 1,
      role: 'primary',
      subType: 'P03_monic_quadratic_range',
      operationSummary: '将代数式 a² - 4a + 7 拆项配方为 (a - 2)² + 3，利用平方非负性得其值 ≥ 3，判定不可能为 2.8。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_4_10',
      procedureId: 'P03',
      partId: null,
      order: 2,
      role: 'primary',
      subType: 'P03_non_monic_quadratic_min',
      operationSummary: '提取二次项系数 8 并在括号内加减 9/16，将 8x² - 12x + 5 配成 8(x - 3/4)² + 1/2 ≥ 1/2，确定当 x = 3/4 时取最小值 1/2。',
      notes: '原题 answer 字段中两个空答案连写为“$\\frac{3}{4}\\frac{1}{2}$”，按规则不擅自修改原题库。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_4_6',
      procedureId: 'P03',
      partId: null,
      order: 3,
      role: 'primary',
      subType: 'P03_substitution_then_complete_square',
      operationSummary: '由 m - n = 3 得 m = n + 3，代入 m(n + 1) 展开得 n² + 4n + 3，配方得 (n + 2)² - 1 ≥ -1，从而确定可能取值为 -1。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_4_9',
      procedureId: 'P03',
      partId: null,
      order: 4,
      role: 'primary',
      subType: 'P03_substitution_negative_leading_max',
      operationSummary: '由 a + 2b = 20 得 a = 20 - 2b，代入 ab 得 -2b² + 20b，提取 -2 配方得 -2(b - 5)² + 50 ≤ 50，确定最大值为 50。',
      status: 'pending_review'
    },
    {
      questionId: 'quad25_4_11',
      procedureId: 'P03',
      partId: null,
      order: 5,
      role: 'primary',
      subType: 'P03_bivariate_independent_complete_square',
      operationSummary: '将 4x² + 2y² - 4y - 4x + 15 的常数项 15 拆分为 1 + 2 + 12，分组配方为 (2x - 1)² + 2(y - 1)² + 12 ≥ 12，确定最小值为 12。',
      status: 'pending_review'
    }
  ];

  // ===========================================================================
  // 程序性知识与动态题目集合服务 (ProceduralKnowledgeService)
  // ===========================================================================
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
      return Array.isArray(window.PROCEDURAL_KNOWLEDGE) ? window.PROCEDURAL_KNOWLEDGE : [];
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
        .sort((a, b) => (a.partOrder || 0) - (b.partOrder || 0) || (a.order || 0) - (b.order || 0))
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

        if (!groupedByQuestion.has(record.questionId)) {
          groupedByQuestion.set(record.questionId, {
            questionId: record.questionId,
            procedureId: procedureId,
            order: record.order,
            primaryPartId: record.inCollectionOrder ? record.partId : null,
            role: record.role,
            status: record.status,
            question: q,
            parts: []
          });
        }

        const group = groupedByQuestion.get(record.questionId);
        if (typeof record.order === 'number' && record.order < group.order) {
          group.order = record.order;
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
        if (a.order !== b.order) return a.order - b.order;
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
      const requiredProcFields = ['id', 'name', 'purpose', 'conditions', 'procedure', 'prerequisites', 'status'];

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

      const requiredAssocFields = ['questionId', 'procedureId', 'partId', 'order', 'role', 'status'];
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

        if (typeof r.order !== 'number' || !Number.isFinite(r.order)) {
          errors.push(`QUESTION_PROCEDURES[${idx}] 的 order 字段不是有效数字: ${r.order}`);
        }

        const dedupKey = `${r.questionId}::${r.procedureId}::${r.partId === null ? '__WHOLE__' : r.partId}`;
        if (seenAssocKeys.has(dedupKey)) {
          errors.push(`QUESTION_PROCEDURES 存在重复关联记录: ${dedupKey}`);
        }
        seenAssocKeys.add(dedupKey);

        if (r.notes) {
          warnings.push(`${r.questionId}${r.partId || ''}: ${r.notes}`);
        }
      });

      procedures.forEach(p => {
        const col = this.getQuestionCollectionByProcedure(p.id);
        const orderMap = new Map();
        (col?.items || []).forEach(item => {
          if (orderMap.has(item.order)) {
            errors.push(`集合 ${p.id} 中存在相同 order (${item.order}) 的不同题目: ${orderMap.get(item.order)} 与 ${item.questionId}`);
          }
          orderMap.set(item.order, item.questionId);
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

  // Render procedural knowledge tags & sub-question operation breakdown inside a question card
  window.renderQuestionProceduralTagsHtml = function (questionId) {
    const records = ProceduralKnowledgeService.getProceduresForQuestion(questionId);
    if (!records || records.length === 0) return '';

    const first = records[0];
    const proc = first.procedure;
    if (!proc) return '';

    const hasSubparts = records.some(r => r.partId !== null);
    const partsHtml = hasSubparts
      ? `<div class="mt-1.5 space-y-1 pl-2 border-l-2 border-teal-200/80 text-[11px] text-slate-600">
          ${records.map(r => {
            const advBadge = r.inCollectionOrder === true && r.partId
              ? `<span class="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold">集合进阶定位小问</span>`
              : r.role === 'secondary'
              ? `<span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">次要关联/含变形依赖</span>`
              : '';
            return `<div class="flex flex-wrap items-center gap-1.5">
              <span class="font-semibold text-[#0F766E]">小问 ${escapeHtml(r.partId || '')}</span>
              ${advBadge}
              <span>${escapeHtml(r.operationSummary)}</span>
            </div>`;
          }).join('')}
        </div>`
      : `<div class="mt-1 text-[11px] text-slate-600 pl-2 border-l-2 border-teal-200/80">
          <span class="font-semibold text-slate-700">解题操作拆解：</span>${escapeHtml(first.operationSummary)}
        </div>`;

    return `
      <div data-html2canvas-ignore="true" class="mt-2.5 pt-2 border-t border-dashed border-teal-200/70 text-xs">
        <div class="flex flex-wrap items-center justify-between gap-1.5">
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="text-[11px] text-[#0F766E] font-bold flex items-center gap-1">
              <span>⚡ 程序性知识：</span>
            </span>
            <button type="button" class="btn-jump-to-proc inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#99F6E4] transition" data-jump-proc="${escapeHtml(proc.id)}" title="点击查看「${escapeHtml(proc.id)} ${escapeHtml(proc.name)}」完整题目集合">
              <span class="px-1 rounded bg-[#0F766E] text-white text-[10px] font-bold">${escapeHtml(proc.id)}</span>
              <span>${escapeHtml(proc.name)}</span>
              <span class="text-[10px] text-teal-700 font-bold">· 集合排序 #${first.order}</span>
            </button>
          </div>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">待审核</span>
        </div>
        ${partsHtml}
      </div>
    `;
  };

  // Render Procedural Knowledge Collection Header Banner in Question Bank / Graph View
  window.renderProceduralCollectionBannerHtml = function (procedureId) {
    const col = ProceduralKnowledgeService.getQuestionCollectionByProcedure(procedureId);
    if (!col) return '';
    const p = col.procedure;
    const allCols = ProceduralKnowledgeService.getAllCollections();

    const switcherHtml = allCols.map(c => {
      const isAct = c.procedure.id === p.id;
      return `
        <button type="button" class="btn-switch-proc-col px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${isAct ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-white text-slate-700 border-slate-200 hover:border-[#0F766E] hover:text-[#0F766E]'}" data-proc-col="${escapeHtml(c.procedure.id)}">
          <span>${escapeHtml(c.procedure.id)} · ${escapeHtml(c.procedure.name)}</span>
          <span class="ml-1 text-[11px] ${isAct ? 'text-teal-100' : 'text-slate-400'}">(${c.totalQuestions}题)</span>
        </button>
      `;
    }).join('');

    const stepsHtml = (p.procedure || []).map(st => {
      const casesHtml = Array.isArray(st.cases)
        ? `<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
            ${st.cases.map(cs => `
              <div class="p-2 rounded-lg bg-white border border-teal-100 text-[11px]">
                <div class="font-bold text-[#0F766E]">• ${escapeHtml(cs.name)}</div>
                <div class="text-slate-600 mt-0.5">${escapeHtml(cs.operation)}</div>
              </div>
            `).join('')}
          </div>`
        : '';
      return `
        <div class="text-xs text-slate-700">
          <div><span class="font-bold text-[#0F766E]">步骤 ${st.step}（${escapeHtml(st.action)}）：</span>${escapeHtml(st.detail || '')}</div>
          ${casesHtml}
        </div>
      `;
    }).join('');

    const prereqHtml = (p.prerequisites || []).map(pr => `
      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50/80 text-amber-900 border border-amber-200 text-[11px]">
        <span>${escapeHtml(pr.id ? `${pr.id} ${pr.name}` : pr.name)}</span>
        <span class="text-[10px] text-amber-600">[前置未验证]</span>
      </span>
    `).join('');

    return `
      <div class="ui-card p-4 bg-gradient-to-br from-[#F0FDFA] to-white border-[#99F6E4] space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-teal-100">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">⚡ 程序性知识题目集合</span>
            <span class="text-xs text-slate-500">第一批样本（共 29 题 · 动态聚合生成）</span>
          </div>
          <div class="flex flex-wrap items-center gap-1.5">
            ${switcherHtml}
          </div>
        </div>

        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm sm:text-base font-bold text-slate-900">${escapeHtml(p.id)}：${escapeHtml(p.name)}</h3>
              <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">状态：待审核 (pending_review)</span>
              <span class="px-2.5 py-0.5 rounded-full bg-[#0F766E] text-white text-xs font-bold">${col.totalQuestions} 道样本题（已按进阶顺序 1→${col.totalQuestions} 排列）</span>
            </div>
            <p class="text-xs text-slate-600 mt-1"><b>核心目标：</b>${escapeHtml(p.purpose)}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
          <div class="p-3 rounded-xl bg-white/90 border border-slate-200/80 space-y-1.5">
            <div class="font-bold text-slate-800">🎯 适用条件（Conditions）</div>
            <ul class="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
              ${(p.conditions || []).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
            </ul>
          </div>
          <div class="p-3 rounded-xl bg-white/90 border border-slate-200/80 space-y-1.5">
            <div class="font-bold text-slate-800">🛠️ 可复用解题程序（Procedure）</div>
            <div class="space-y-1.5">${stepsHtml}</div>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="text-slate-500 font-semibold">⏪ 前置依赖：</span>
            ${prereqHtml}
          </div>
          ${p.relatedNote ? `<div class="text-[11px] text-slate-500">${escapeHtml(p.relatedNote)}</div>` : ''}
        </div>
      </div>
    `;
  };

  window.jumpToProceduralCollection = function (procedureId) {
    if (!ProceduralKnowledgeService.getProcedureById(procedureId)) return;
    if (typeof switchView === 'function' && state.currentView !== 'bank') {
      switchView('bank');
    }
    state.chapterFilter = `proc:${procedureId}`;
    state.currentPage = 1;
    if (typeof saveUiPreferences === 'function') saveUiPreferences();
    if (typeof syncUiToState === 'function') syncUiToState();
    if (typeof renderQuestionList === 'function') renderQuestionList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof showToast === 'function') {
      const p = ProceduralKnowledgeService.getProcedureById(procedureId);
      showToast(`已切换至程序性知识集合：${p.id} ${p.name}`, 'info');
    }
  };

  window.QUESTION_PROCEDURES = QUESTION_PROCEDURES;
  window.ProceduralKnowledgeService = ProceduralKnowledgeService;
})();
