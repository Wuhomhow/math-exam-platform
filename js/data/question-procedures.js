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
