// 题典网「程序性知识」动态教学模块数据层 (procedural-dynamic-demos.js)
// 包含：
// - P01 利用直接开平方法解一元二次方程
// - P02 利用配方法解一元二次方程
// - P03 利用配方法求代数式的最值
// 统一采用「60fps 连续时间轴 + 逐项 Token 书写 + 真实 DOM 坐标 SVG 动态几何批注 + 同步讲师字幕 + 跟做练习」架构
(function () {
  const PROCEDURAL_DYNAMIC_DEMOS = {
    // =========================================================================
    // P01：利用直接开平方法解一元二次方程
    // =========================================================================
    P01: {
      procedureId: 'P01',
      title: '利用直接开平方法解一元二次方程',
      exampleTitle: '解方程 $\\frac{1}{4}(2x + 3)^{2} - 1 = 3$',
      exampleFormula: '$\\frac{1}{4}(2x + 3)^{2} - 1 = 3$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（当步骤涉及常数合并、系数化 1、开平方或解一次方程时在此同步展开）',
      practiceSectionTitle: '直接开平方法关键动作跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握直接开平方法降次求根',

      steps: [
        {
          step: 1,
          name: '移常数项并合并',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '先将左边的常数项 $-1$ 移到等号右边变为 $+1$，合并同类项得 $\\frac{1}{4}(2x + 3)^{2} = 4$。'
        },
        {
          step: 2,
          name: '平方项系数化为 1',
          tStart: 5.8,
          tEnd: 11.5,
          explanation: '在等式两边同时乘以 $4$，消去完全平方式前面的系数 $\\frac{1}{4}$，化为标准形式 $(2x + 3)^{2} = 16$。'
        },
        {
          step: 3,
          name: '两边直接开平方降次',
          tStart: 11.5,
          tEnd: 17.5,
          explanation: '因为右边常数 $16 \\gt 0$，根据平方根的意义对两边同时开平方，降次得 $2x + 3 = \\pm 4$（注意正负两个平方根）。'
        },
        {
          step: 4,
          name: '拆分为两个一次方程',
          tStart: 17.5,
          tEnd: 23.2,
          explanation: '按正号 $+4$ 与负号 $-4$，将等式拆分为两个独立的一元一次方程：$2x + 3 = 4$ 或 $2x + 3 = -4$。'
        },
        {
          step: 5,
          name: '分别求解得出两根',
          tStart: 23.2,
          tEnd: 30.0,
          explanation: '分别解两个一元一次方程，移项、系数化为 $1$，解得 $x_{1} = \\frac{1}{2}$，$x_{2} = -\\frac{7}{2}$。'
        }
      ],

      microBeats: [
        { time: 0.6, step: 1, label: '1.1 观察原方程结构' },
        { time: 2.2, step: 1, label: '1.2 将常数项 $-1$ 移项变号为 $+1$' },
        { time: 4.5, step: 1, label: '1.3 合并右边常数得 $4$' },
        { time: 7.2, step: 2, label: '2.1 定位平方项前的系数 $\\frac{1}{4}$' },
        { time: 9.8, step: 2, label: '2.2 等式两边同乘 $4$ 得 $(2x + 3)^{2} = 16$' },
        { time: 13.0, step: 3, label: '3.1 检验右边 $16 \\gt 0$ 并开平方' },
        { time: 15.8, step: 3, label: '3.2 降次写出 $2x + 3 = \\pm 4$' },
        { time: 19.5, step: 4, label: '4.1 按 $+4$ 与 $-4$ 拆成两个一次方程' },
        { time: 25.5, step: 5, label: '5.1 分别移项得 $2x = 1$ 或 $2x = -7$' },
        { time: 28.8, step: 5, label: '5.2 解得 $x_{1} = \\frac{1}{2}$，$x_{2} = -\\frac{7}{2}$' }
      ],

      boardRows: [
        {
          rowId: 'p1_row_0',
          stepBadge: '原方程',
          appearAt: 0.0,
          tokens: [
            { id: 'p1_r0_coef', math: '$\\frac{1}{4}$', appearAt: 0.0, dur: 0.01 },
            { id: 'p1_r0_sq', math: '$(2x + 3)^{2}$', appearAt: 0.0, dur: 0.01 },
            { id: 'p1_r0_m1', math: '$- 1$', appearAt: 0.0, dur: 0.01 },
            { id: 'p1_r0_eq', math: '$=$', appearAt: 0.0, dur: 0.01 },
            { id: 'p1_r0_3', math: '$3$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p1_row_1',
          stepBadge: '第 1 步 ① · 移常数项',
          appearAt: 1.8,
          tokens: [
            { id: 'p1_r1_coef', math: '$\\frac{1}{4}$', appearAt: 1.85, dur: 0.30 },
            { id: 'p1_r1_sq', math: '$(2x + 3)^{2}$', appearAt: 2.05, dur: 0.30 },
            { id: 'p1_r1_eq', math: '$=$', appearAt: 2.25, dur: 0.25 },
            { id: 'p1_r1_3', math: '$3$', appearAt: 2.45, dur: 0.25 },
            { id: 'p1_r1_p1', math: '$+ 1$', appearAt: 2.75, dur: 0.40 }
          ]
        },
        {
          rowId: 'p1_row_2',
          stepBadge: '第 1 步 ② · 合并常数',
          appearAt: 3.9,
          tokens: [
            { id: 'p1_r2_coef', math: '$\\frac{1}{4}$', appearAt: 3.95, dur: 0.30 },
            { id: 'p1_r2_sq', math: '$(2x + 3)^{2}$', appearAt: 4.15, dur: 0.30 },
            { id: 'p1_r2_eq', math: '$=$', appearAt: 4.35, dur: 0.25 },
            { id: 'p1_r2_4', math: '$4$', appearAt: 4.60, dur: 0.40 }
          ]
        },
        {
          rowId: 'p1_row_3',
          stepBadge: '第 2 步 · 系数化为 1',
          appearAt: 8.6,
          tokens: [
            { id: 'p1_r3_sq', math: '$(2x + 3)^{2}$', appearAt: 8.70, dur: 0.40 },
            { id: 'p1_r3_eq', math: '$=$', appearAt: 9.10, dur: 0.30 },
            { id: 'p1_r3_16', math: '$16$', appearAt: 9.45, dur: 0.45 }
          ]
        },
        {
          rowId: 'p1_row_4',
          stepBadge: '第 3 步 · 开平方降次',
          appearAt: 14.5,
          tokens: [
            { id: 'p1_r4_lhs', math: '$2x + 3$', appearAt: 14.60, dur: 0.40 },
            { id: 'p1_r4_eq', math: '$=$', appearAt: 15.00, dur: 0.30 },
            { id: 'p1_r4_pm4', math: '$\\pm 4$', appearAt: 15.35, dur: 0.50 }
          ]
        },
        {
          rowId: 'p1_row_5',
          stepBadge: '第 4 步 · 拆分一次方程',
          appearAt: 18.8,
          tokens: [
            { id: 'p1_r5_eq1', math: '$2x + 3 = 4$', appearAt: 18.90, dur: 0.45 },
            { id: 'p1_r5_or', math: '或', appearAt: 19.60, dur: 0.30 },
            { id: 'p1_r5_eq2', math: '$2x + 3 = -4$', appearAt: 20.00, dur: 0.45 }
          ]
        },
        {
          rowId: 'p1_row_6',
          stepBadge: '第 5 步 ① · 移项整理',
          appearAt: 24.4,
          tokens: [
            { id: 'p1_r6_eq1', math: '$2x = 1$', appearAt: 24.50, dur: 0.40 },
            { id: 'p1_r6_or', math: '或', appearAt: 25.10, dur: 0.30 },
            { id: 'p1_r6_eq2', math: '$2x = -7$', appearAt: 25.50, dur: 0.40 }
          ]
        },
        {
          rowId: 'p1_row_7',
          stepBadge: '最终结论',
          appearAt: 27.6,
          isConclusion: true,
          tokens: [
            { id: 'p1_r7_conc', math: '$\\therefore x_{1} = \\frac{1}{2}$，$x_{2} = -\\frac{7}{2}$。', appearAt: 27.70, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p1_sp_step2',
          title: '草稿演算 · 第 2 步：等式两边同乘 4',
          showStart: 6.0,
          showEnd: 11.4,
          tokens: [
            { id: 'p1_sp2_t1', math: '左边：$\\frac{1}{4}(2x + 3)^{2} \\times 4 = (2x + 3)^{2}$', appearAt: 6.5, dur: 0.45 },
            { id: 'p1_sp2_t2', math: '右边：$4 \\times 4 = 16$', appearAt: 7.5, dur: 0.45 }
          ],
          note: '将平方项前面的系数化为 $1$，切勿先把 $(2x + 3)^{2}$ 盲目展开'
        },
        {
          id: 'p1_sp_step3',
          title: '草稿演算 · 第 3 步：平方根的意义',
          showStart: 11.7,
          showEnd: 17.4,
          tokens: [
            { id: 'p1_sp3_t1', math: '$\\because (\\pm 4)^{2} = 16$', appearAt: 12.2, dur: 0.45 },
            { id: 'p1_sp3_t2', math: '$\\therefore \\pm\\sqrt{16} = \\pm 4$', appearAt: 13.2, dur: 0.45 }
          ],
          note: '易错提醒：正数 $16$ 有两个互为相反数的平方根，$+4$ 和 $-4$ 缺一不可'
        },
        {
          id: 'p1_sp_step5',
          title: '草稿演算 · 第 5 步：分别解两个一次方程',
          showStart: 23.4,
          showEnd: 29.8,
          tokens: [
            { id: 'p1_sp5_t1', math: '① $2x + 3 = 4 \\implies 2x = 1 \\implies x_{1} = \\frac{1}{2}$', appearAt: 23.8, dur: 0.45 },
            { id: 'p1_sp5_t2', math: '② $2x + 3 = -4 \\implies 2x = -7 \\implies x_{2} = -\\frac{7}{2}$', appearAt: 26.0, dur: 0.45 }
          ],
          note: '把二次方程降次拆解为两个一元一次方程后，按常规移项、除以系数 $2$ 即可'
        }
      ],

      tokenHighlights: [
        // Step 1
        { tokenId: 'p1_r0_m1', tStart: 0.8, tEnd: 2.9, color: 'amber' },
        { tokenId: 'p1_r1_p1', tStart: 2.75, tEnd: 4.0, color: 'amber' },
        { tokenId: 'p1_r2_4', tStart: 4.6, tEnd: 5.7, color: 'teal' },
        // Step 2
        { tokenId: 'p1_r2_coef', tStart: 5.9, tEnd: 8.8, color: 'amber' },
        { tokenId: 'p1_sp2_t1', tStart: 6.5, tEnd: 8.5, color: 'teal' },
        { tokenId: 'p1_sp2_t2', tStart: 7.5, tEnd: 9.8, color: 'amber' },
        { tokenId: 'p1_r3_sq', tStart: 8.7, tEnd: 11.4, color: 'teal' },
        { tokenId: 'p1_r3_16', tStart: 9.45, tEnd: 11.4, color: 'amber' },
        // Step 3
        { tokenId: 'p1_r3_sq', tStart: 11.6, tEnd: 14.6, color: 'teal' },
        { tokenId: 'p1_r3_16', tStart: 11.6, tEnd: 14.6, color: 'amber' },
        { tokenId: 'p1_sp3_t2', tStart: 13.2, tEnd: 16.0, color: 'amber' },
        { tokenId: 'p1_r4_lhs', tStart: 14.6, tEnd: 17.4, color: 'teal' },
        { tokenId: 'p1_r4_pm4', tStart: 15.35, tEnd: 17.4, color: 'amber' },
        // Step 4
        { tokenId: 'p1_r4_pm4', tStart: 17.6, tEnd: 20.5, color: 'amber' },
        { tokenId: 'p1_r5_eq1', tStart: 18.9, tEnd: 23.0, color: 'teal' },
        { tokenId: 'p1_r5_eq2', tStart: 20.0, tEnd: 23.0, color: 'rose' },
        // Step 5
        { tokenId: 'p1_r6_eq1', tStart: 24.5, tEnd: 27.5, color: 'teal' },
        { tokenId: 'p1_r6_eq2', tStart: 25.5, tEnd: 27.5, color: 'rose' },
        { tokenId: 'p1_sp5_t1', tStart: 23.8, tEnd: 27.8, color: 'teal' },
        { tokenId: 'p1_sp5_t2', tStart: 26.0, tEnd: 28.5, color: 'rose' }
      ],

      svgAnnotations: [
        {
          id: 'p1_svg_s1_move1',
          type: 'arrow',
          fromToken: 'p1_r0_m1',
          toToken: 'p1_r1_p1',
          label: '移项变号 $+1$',
          color: '#D97706',
          curveOffset: 30,
          tStart: 1.2,
          tDrawEnd: 2.1,
          tFadeStart: 3.3,
          tEnd: 3.7
        },
        {
          id: 'p1_svg_s1_brace_add',
          type: 'under-brace',
          startToken: 'p1_r1_3',
          endToken: 'p1_r1_p1',
          label: '$3 + 1 = 4$',
          color: '#0F766E',
          tStart: 3.1,
          tDrawEnd: 3.6,
          tFadeStart: 3.75,
          tEnd: 3.95
        },
        {
          id: 'p1_svg_s2_mult4',
          type: 'arrow',
          fromToken: 'p1_r2_4',
          toToken: 'p1_r3_16',
          label: '两边同乘 $4$',
          color: '#D97706',
          curveOffset: 34,
          tStart: 7.6,
          tDrawEnd: 8.5,
          tFadeStart: 10.6,
          tEnd: 11.2
        },
        {
          id: 'p1_svg_s3_sqrt',
          type: 'under-brace',
          startToken: 'p1_r3_sq',
          endToken: 'p1_r3_16',
          label: '两边开平方：$\\pm\\sqrt{16} = \\pm 4$',
          color: '#0F766E',
          tStart: 12.2,
          tDrawEnd: 13.1,
          tFadeStart: 14.0,
          tEnd: 14.4
        },
        {
          id: 'p1_svg_s4_split',
          type: 'arrow',
          fromToken: 'p1_r4_pm4',
          toToken: 'p1_r5_eq2',
          label: '拆为 $+4$ 与 $-4$',
          color: '#D97706',
          curveOffset: 28,
          tStart: 17.8,
          tDrawEnd: 18.7,
          tFadeStart: 21.8,
          tEnd: 22.5
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 1.2, text: '来看典型例题：用直接开平方法解方程 $\\frac{1}{4}(2x + 3)^{2} - 1 = 3$。观察发现左边含有平方整体 $(2x + 3)^{2}$。', focusToken: 'p1_r0_sq' },
        { tStart: 1.2, tEnd: 3.8, text: '第一步移常数项：把左边的常数项 $-1$ 移到等号右边，注意移项要变号为 $+1$。', focusToken: 'p1_r1_p1' },
        { tStart: 3.8, tEnd: 5.8, text: '合并等号右边的常数 $3 + 1 = 4$，得到 $\\frac{1}{4}(2x + 3)^{2} = 4$。', focusToken: 'p1_r2_4' },
        { tStart: 5.8, tEnd: 8.5, text: '第二步将平方项系数化为 $1$：左边平方项前有系数 $\\frac{1}{4}$，我们在等式两边同时乘以 $4$。', focusToken: 'p1_r2_coef' },
        { tStart: 8.5, tEnd: 11.5, text: '左边约去 $\\frac{1}{4}$ 只剩 $(2x + 3)^{2}$，右边 $4 \\times 4 = 16$，整理成标准形式 $(2x + 3)^{2} = 16$。', focusToken: 'p1_r3_16' },
        { tStart: 11.5, tEnd: 14.4, text: '第三步直接开平方降次：因为右边 $16 \\gt 0$，根据平方根的意义对等式两边同时开平方。', focusToken: 'p1_sp3_t2' },
        { tStart: 14.4, tEnd: 17.5, text: '左边开方得 $2x + 3$，右边得 $\\pm 4$。切记正数有两个平方根，千万不能漏掉负号！', focusToken: 'p1_r4_pm4' },
        { tStart: 17.5, tEnd: 23.2, text: '第四步拆分方程：把 $2x + 3 = \\pm 4$ 按正负号拆成两个一元一次方程：$2x + 3 = 4$ 或 $2x + 3 = -4$。', focusToken: 'p1_r5_eq2' },
        { tStart: 23.2, tEnd: 27.5, text: '第五步分别求解：将两个方程中的 $+3$ 移到右边减 $3$，得到 $2x = 1$ 或 $2x = -7$。', focusToken: 'p1_r6_eq2' },
        { tStart: 27.5, tEnd: 30.0, text: '两边同除以 $2$，得出原方程的两个实数根为 $x_{1} = \\frac{1}{2}$，$x_{2} = -\\frac{7}{2}$。求解完成！', focusToken: 'p1_r7_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：判断直接开平方降次操作',
          givenLabel: '已知方程：',
          givenFormula: '$3(x - 1)^{2} = 12$',
          extractedLabel: '两边同除以 3 整理后：',
          extractedFormula: '$(x - 1)^{2} = 4$',
          questionText: '下一步对等式两边直接开平方，正确的变形结果是？',
          options: [
            { key: 'A', text: 'A. $x - 1 = \\pm 2$', isCorrect: true },
            { key: 'B', text: 'B. $x - 1 = 2$', isCorrect: false },
            { key: 'C', text: 'C. $x^{2} - 2x + 1 = 4$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！正数 4 的平方根有两个（互为相反数）：',
            calcLines: [
              '$x - 1 = \\pm\\sqrt{4} = \\pm 2$',
              '$x - 1 = 2 \\quad\\text{或}\\quad x - 1 = -2$'
            ],
            summary: '由此可进一步解得 $x_{1} = 3$，$x_{2} = -1$。'
          },
          wrongTitle: '提示：请回顾平方根的意义',
          wrongFeedback: '已有完全平方结构 $(x - 1)^{2} = 4$ 时无需展开括号，且正数 $4$ 的平方根是 $\\pm 2$（不能漏掉 $-2$），请再试一次。'
        },
        practice2: {
          title: '练习二：用直接开平方法求方程的两根',
          givenLabel: '给出标准平方形式：',
          givenFormula: '$(x - 3)^{2} = 16$',
          questionText: '开平方降次后，这个方程的两个实数根分别是多少？',
          input1Prefix: '$x_{1} =$',
          input1Placeholder: '如 7',
          input2Prefix: '，$x_{2} =$',
          input2Placeholder: '如 -1',
          input2Suffix: '（两根顺序可互换）',
          expectedX: '7',
          expectedMin: '-1',
          allowOrderSwap: true,
          correctFeedback: '方程的两个实数根为 $x_{1} = 7$，$x_{2} = -1$。',
          correctDetail: '两边开平方得 $x - 3 = \\pm 4$，即 $x - 3 = 4$ 或 $x - 3 = -4$，解得 $x_{1} = 7$，$x_{2} = -1$。',
          wrongFeedback: '请先写出 $x - 3 = \\pm 4$，再分别计算 $x = 3 + 4$ 与 $x = 3 - 4$ 的值。',
          specificWrongHints: [
            {
              checkType: 'sameVal',
              val: '7',
              hint: '你求出了正平方根对应的 $x = 7$，但别忘了 $x - 3 = -4$ 还会得出另一个根，请补充完整。'
            },
            {
              checkType: 'anyVal',
              val: '1',
              hint: '注意第二个方程是 $x - 3 = -4$，移项后 $x = -4 + 3 = -1$ 而不是 $1$，请检查符号。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P02：利用配方法解一元二次方程
    // =========================================================================
    P02: {
      procedureId: 'P02',
      title: '利用配方法解一元二次方程',
      exampleTitle: '将方程 $x^{2} - 8x - 5 = 0$ 配成 $(x + a)^{2} = b$ 并求解',
      exampleFormula: '$x^{2} - 8x - 5 = 0$',
      totalDuration: 31.0,
      scratchpadIdleHint: '旁白草稿演算区（当步骤涉及计算一次项系数一半的平方、比对参数 a/b 时在此同步展开）',
      practiceSectionTitle: '配方法解方程关键动作跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握等式两边同加配方常数与化为完全平方形式',

      steps: [
        {
          step: 1,
          name: '移常数项到等号右边',
          tStart: 0.0,
          tEnd: 5.5,
          explanation: '将方程中的常数项 $-5$ 移到等号右边变为 $+5$，使左边仅保留二次项与一次项 $x^{2} - 8x = 5$。'
        },
        {
          step: 2,
          name: '算一次项系数一半的平方',
          tStart: 5.5,
          tEnd: 11.5,
          explanation: '取一次项系数 $-8$ 的一半得 $-4$，再平方得 $(-4)^{2} = 16$，确定需要配入等式两边的常数。'
        },
        {
          step: 3,
          name: '等式两边同时加上 16',
          tStart: 11.5,
          tEnd: 17.5,
          explanation: '在等号左边和右边同时加上 $16$，得到 $x^{2} - 8x + 16 = 5 + 16$，保证等式平衡。'
        },
        {
          step: 4,
          name: '写成完全平方 $(x + a)^{2} = b$',
          tStart: 17.5,
          tEnd: 24.5,
          explanation: '左边逆用完全平方公式化为 $(x - 4)^{2}$，右边合并为 $21$，即 $(x - 4)^{2} = 21$（对照得 $a = -4$，$b = 21$）。'
        },
        {
          step: 5,
          name: '调用直接开平方法求根',
          tStart: 24.5,
          tEnd: 31.0,
          explanation: '因为右边 $21 \\gt 0$，调用直接开平方法（P01）两边开平方得 $x - 4 = \\pm\\sqrt{21}$，解得 $x_{1} = 4 + \\sqrt{21}$，$x_{2} = 4 - \\sqrt{21}$。'
        }
      ],

      microBeats: [
        { time: 0.6, step: 1, label: '1.1 观察原方程 $x^{2} - 8x - 5 = 0$' },
        { time: 2.5, step: 1, label: '1.2 将常数项 $-5$ 移到等号右边变为 $5$' },
        { time: 7.0, step: 2, label: '2.1 提取一次项系数 $-8$ 并除以 $2$ 得 $-4$' },
        { time: 10.0, step: 2, label: '2.2 计算平方 $(-4)^{2} = 16$' },
        { time: 13.5, step: 3, label: '3.1 等号左边加上 $+16$' },
        { time: 15.5, step: 3, label: '3.2 等号右边同步加上 $+16$' },
        { time: 19.5, step: 4, label: '4.1 左边合为 $(x - 4)^{2}$，右边合为 $21$' },
        { time: 22.5, step: 4, label: '4.2 对照 $(x + a)^{2} = b$ 得 $a = -4，b = 21$' },
        { time: 26.5, step: 5, label: '5.1 两边开平方得 $x - 4 = \\pm\\sqrt{21}$' },
        { time: 29.5, step: 5, label: '5.2 移项得出两根 $4 \\pm \\sqrt{21}$' }
      ],

      boardRows: [
        {
          rowId: 'p2_row_0',
          stepBadge: '原方程',
          appearAt: 0.0,
          tokens: [
            { id: 'p2_r0_x2', math: '$x^{2}$', appearAt: 0.0, dur: 0.01 },
            { id: 'p2_r0_m8x', math: '$- 8x$', appearAt: 0.0, dur: 0.01 },
            { id: 'p2_r0_m5', math: '$- 5$', appearAt: 0.0, dur: 0.01 },
            { id: 'p2_r0_eq0', math: '$= 0$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p2_row_1',
          stepBadge: '第 1 步 · 移常数项',
          appearAt: 2.0,
          tokens: [
            { id: 'p2_r1_x2', math: '$x^{2}$', appearAt: 2.05, dur: 0.30 },
            { id: 'p2_r1_m8', math: '$- 8$', appearAt: 2.30, dur: 0.35 },
            { id: 'p2_r1_x', math: '$x$', appearAt: 2.55, dur: 0.25 },
            { id: 'p2_r1_eq', math: '$=$', appearAt: 2.80, dur: 0.25 },
            { id: 'p2_r1_5', math: '$5$', appearAt: 3.10, dur: 0.45 }
          ]
        },
        {
          rowId: 'p2_row_2',
          stepBadge: '第 3 步 · 两边同加 16',
          appearAt: 12.4,
          tokens: [
            { id: 'p2_r2_x2m8x', math: '$x^{2} - 8x$', appearAt: 12.50, dur: 0.35 },
            { id: 'p2_r2_addL', math: '$+ 16$', appearAt: 13.30, dur: 0.50 },
            { id: 'p2_r2_eq', math: '$=$', appearAt: 14.10, dur: 0.30 },
            { id: 'p2_r2_5', math: '$5$', appearAt: 14.45, dur: 0.30 },
            { id: 'p2_r2_addR', math: '$+ 16$', appearAt: 15.10, dur: 0.50 }
          ]
        },
        {
          rowId: 'p2_row_3',
          stepBadge: '第 4 步 · 写成完全平方',
          appearAt: 19.2,
          tokens: [
            { id: 'p2_r3_sq', math: '$(x - 4)^{2}$', appearAt: 19.30, dur: 0.50 },
            { id: 'p2_r3_eq', math: '$=$', appearAt: 19.90, dur: 0.30 },
            { id: 'p2_r3_21', math: '$21$', appearAt: 20.30, dur: 0.45 }
          ]
        },
        {
          rowId: 'p2_row_4',
          stepBadge: '第 5 步 ① · 直接开平方',
          appearAt: 25.8,
          tokens: [
            { id: 'p2_r4_lhs', math: '$x - 4$', appearAt: 25.90, dur: 0.40 },
            { id: 'p2_r4_eq', math: '$=$', appearAt: 26.35, dur: 0.30 },
            { id: 'p2_r4_pm', math: '$\\pm\\sqrt{21}$', appearAt: 26.70, dur: 0.50 }
          ]
        },
        {
          rowId: 'p2_row_5',
          stepBadge: '最终结论',
          appearAt: 28.5,
          isConclusion: true,
          tokens: [
            { id: 'p2_r5_conc', math: '$\\therefore a = -4，b = 21$；方程的根为 $x_{1} = 4 + \\sqrt{21}，x_{2} = 4 - \\sqrt{21}$。', appearAt: 28.60, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p2_sp_step2',
          title: '草稿演算 · 第 2 步：一次项系数一半的平方',
          showStart: 5.7,
          showEnd: 17.3,
          tokens: [
            { id: 'p2_sp2_t1', math: '一次项系数：$-8$', appearAt: 6.2, dur: 0.40 },
            { id: 'p2_sp2_t2', math: '取一半：$-8 \\div 2 = -4$', appearAt: 7.4, dur: 0.45 },
            { id: 'p2_sp2_t3', math: '再平方：$(-4)^{2} = 16$', appearAt: 9.2, dur: 0.50 }
          ],
          note: '算出的 $-4$ 是下一步完全平方式 $(x - 4)^{2}$ 中的常数项，$16$ 是等式两边要同加的数'
        },
        {
          id: 'p2_sp_step4',
          title: '草稿演算 · 第 4 步：比对参数 a 与 b',
          showStart: 20.8,
          showEnd: 24.4,
          tokens: [
            { id: 'p2_sp4_t1', math: '配方结果：$(x - 4)^{2} = 21$', appearAt: 21.1, dur: 0.40 },
            { id: 'p2_sp4_t2', math: '对照目标：$(x + a)^{2} = b$', appearAt: 21.8, dur: 0.40 },
            { id: 'p2_sp4_t3', math: '$\\implies a = -4，\\quad b = 21$', appearAt: 22.5, dur: 0.45 }
          ],
          note: '注意 $(x - 4)^{2} = [x + (-4)]^{2}$，因此 $a = -4$（连同负号），切勿误写为 $4$'
        }
      ],

      tokenHighlights: [
        // Step 1
        { tokenId: 'p2_r0_m5', tStart: 0.8, tEnd: 3.0, color: 'amber' },
        { tokenId: 'p2_r1_5', tStart: 3.1, tEnd: 5.4, color: 'amber' },
        // Step 2
        { tokenId: 'p2_r1_m8', tStart: 5.7, tEnd: 11.4, color: 'teal' },
        { tokenId: 'p2_sp2_t2', tStart: 7.4, tEnd: 9.2, color: 'teal' },
        { tokenId: 'p2_sp2_t3', tStart: 9.2, tEnd: 11.4, color: 'amber' },
        // Step 3
        { tokenId: 'p2_sp2_t3', tStart: 11.6, tEnd: 16.5, color: 'amber' },
        { tokenId: 'p2_r2_addL', tStart: 13.3, tEnd: 17.4, color: 'amber' },
        { tokenId: 'p2_r2_addR', tStart: 15.1, tEnd: 17.4, color: 'amber' },
        // Step 4
        { tokenId: 'p2_r2_x2m8x', tStart: 17.6, tEnd: 19.5, color: 'teal' },
        { tokenId: 'p2_r2_addL', tStart: 17.6, tEnd: 19.5, color: 'teal' },
        { tokenId: 'p2_r3_sq', tStart: 19.3, tEnd: 24.4, color: 'teal' },
        { tokenId: 'p2_r3_21', tStart: 20.3, tEnd: 24.4, color: 'amber' },
        { tokenId: 'p2_sp4_t3', tStart: 22.5, tEnd: 24.4, color: 'teal' },
        // Step 5
        { tokenId: 'p2_r3_sq', tStart: 24.6, tEnd: 26.2, color: 'teal' },
        { tokenId: 'p2_r4_pm', tStart: 26.7, tEnd: 28.5, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p2_svg_s1_move5',
          type: 'arrow',
          fromToken: 'p2_r0_m5',
          toToken: 'p2_r1_5',
          label: '移项变号 $+5$',
          color: '#D97706',
          curveOffset: 30,
          tStart: 1.2,
          tDrawEnd: 2.2,
          tFadeStart: 4.5,
          tEnd: 5.2
        },
        {
          id: 'p2_svg_s2_pick8',
          type: 'arrow',
          fromToken: 'p2_r1_m8',
          toToken: 'p2_sp2_t1',
          label: '提取一次项系数 $-8$',
          color: '#0F766E',
          curveOffset: -24,
          tStart: 5.8,
          tDrawEnd: 6.6,
          tFadeStart: 10.6,
          tEnd: 11.2
        },
        {
          id: 'p2_svg_s3_add_both',
          type: 'arrow',
          fromToken: 'p2_r2_addL',
          toToken: 'p2_r2_addR',
          label: '等式两边同步 $+16$',
          color: '#D97706',
          curveOffset: -28,
          tStart: 13.8,
          tDrawEnd: 15.0,
          tFadeStart: 16.6,
          tEnd: 17.2
        },
        {
          id: 'p2_svg_s4_brace_lhs',
          type: 'under-brace',
          startToken: 'p2_r2_x2m8x',
          endToken: 'p2_r2_addL',
          label: '$x^{2} - 2 \\cdot x \\cdot 4 + 4^{2} = (x - 4)^{2}$',
          color: '#0F766E',
          tStart: 17.7,
          tDrawEnd: 18.4,
          tFadeStart: 18.8,
          tEnd: 19.15
        },
        {
          id: 'p2_svg_s5_sqrt',
          type: 'under-brace',
          startToken: 'p2_r3_sq',
          endToken: 'p2_r3_21',
          label: '两边开平方：$x - 4 = \\pm\\sqrt{21}$',
          color: '#0F766E',
          tStart: 24.6,
          tDrawEnd: 25.2,
          tFadeStart: 25.45,
          tEnd: 25.75
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 1.2, text: '来看典型例题：将方程 $x^{2} - 8x - 5 = 0$ 配成 $(x + a)^{2} = b$ 的形式并求解。', focusToken: 'p2_r0_m8x' },
        { tStart: 1.2, tEnd: 5.5, text: '第一步移常数项：将左边的常数项 $-5$ 移到等号右边，变号为 $+5$，使左边只留二次项与一次项 $x^{2} - 8x = 5$。', focusToken: 'p2_r1_5' },
        { tStart: 5.5, tEnd: 8.8, text: '第二步确定配方常数：提取一次项系数 $-8$，先除以 $2$ 得到一次项系数的一半 $-4$。', focusToken: 'p2_sp2_t2' },
        { tStart: 8.8, tEnd: 11.5, text: '再将 $-4$ 平方，计算出 $(-4)^{2} = 16$。这就是要在方程两边同时添加的配方常数。', focusToken: 'p2_sp2_t3' },
        { tStart: 11.5, tEnd: 14.5, text: '第三步等式两边同加 $16$：先在等号左边加上 $+16$，凑成完全平方式所需的三项。', focusToken: 'p2_r2_addL' },
        { tStart: 14.5, tEnd: 17.5, text: '关键易错点：这是解方程（不是代数式变形），左边加了 $16$，等号右边也必须同时加上 $+16$ 才能保持等式成立！', focusToken: 'p2_r2_addR' },
        { tStart: 17.5, tEnd: 20.8, text: '第四步写成完全平方形式：左边逆用完全平方公式化为 $(x - 4)^{2}$，右边 $5 + 16$ 合并为 $21$。', focusToken: 'p2_r3_sq' },
        { tStart: 20.8, tEnd: 24.5, text: '将 $(x - 4)^{2} = 21$ 与 $(x + a)^{2} = b$ 比对，注意括号内是减 $4$，所以 $a = -4$，$b = 21$。', focusToken: 'p2_sp4_t3' },
        { tStart: 24.5, tEnd: 28.0, text: '第五步直接开平方求根：因为右边 $21 \\gt 0$，调用 P01 直接开平方法，两边开方得 $x - 4 = \\pm\\sqrt{21}$。', focusToken: 'p2_r4_pm' },
        { tStart: 28.0, tEnd: 31.0, text: '将 $-4$ 移项到右边，解得原方程的两个根为 $x_{1} = 4 + \\sqrt{21}$，$x_{2} = 4 - \\sqrt{21}$。推导完成！', focusToken: 'p2_r5_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：判断方程两边的配方操作',
          givenLabel: '已知方程：',
          givenFormula: '$x^{2} - 6x - 2 = 0$',
          extractedLabel: '移常数项后：',
          extractedFormula: '$x^{2} - 6x = 2$',
          questionText: '下一步应该在等式两边怎样操作？',
          options: [
            { key: 'A', text: 'A. 在等号左边和右边同时加上 $(-3)^{2} = 9$。', isCorrect: true },
            { key: 'B', text: 'B. 只在等号左边加上 $9$，右边保持 $2$ 不变。', isCorrect: false },
            { key: 'C', text: 'C. 在等号左边和右边同时加上 $(-6)^{2} = 36$。', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！方程配方必须在等式两边同时加上一次项系数一半的平方：',
            calcLines: [
              '$(-6 \\div 2)^{2} = (-3)^{2} = 9$',
              '$x^{2} - 6x + 9 = 2 + 9$'
            ],
            summary: '整理后即可得到完全平方形式 $(x - 3)^{2} = 11$。'
          },
          wrongTitle: '提示：请留意等式平衡与一次项系数的一半',
          wrongFeedback: '一次项系数为 $-6$，一半的平方为 $(-3)^{2} = 9$，且等式左边和右边必须同时加上 $9$，请再试一次。'
        },
        practice2: {
          title: '练习二：确定配方后的参数 a 与 b',
          givenLabel: '给出两边同加 9 后的等式：',
          givenFormula: '$x^{2} - 6x + 9 = 2 + 9$',
          questionText: '将其化为 $(x + a)^{2} = b$ 的形式，常数 $a$ 和 $b$ 分别是多少？',
          input1Prefix: '常数 $a =$',
          input1Placeholder: '如 -3',
          input2Prefix: '，常数 $b =$',
          input2Placeholder: '如 11',
          input2Suffix: '',
          expectedX: '-3',
          expectedMin: '11',
          allowOrderSwap: false,
          correctFeedback: '当配成 $(x + a)^{2} = b$ 时，$a = -3$，$b = 11$。',
          correctDetail: '左边 $x^{2} - 6x + 9 = (x - 3)^{2}$，右边 $2 + 9 = 11$，对照 $(x + a)^{2} = b$ 可得 $a = -3$，$b = 11$。',
          wrongFeedback: '请观察左边 $x^{2} - 6x + 9$ 可写成 $(x - 3)^{2}$，对照 $(x + a)^{2}$ 时注意 $a$ 的正负号，右边合并 $2 + 9$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '3',
              hint: '注意左边是 $(x - 3)^{2} = [x + (-3)]^{2}$，对照 $(x + a)^{2}$ 时 $a$ 应当等于 $-3$ 而不是 $3$。'
            },
            {
              checkType: 'secondVal',
              val: '2',
              hint: '注意等号右边也加上了 $9$，因此 $b = 2 + 9 = 11$ 而不是 $2$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P03：利用配方法求代数式的最值
    // =========================================================================
    P03: {
      procedureId: 'P03',
      title: '配方法求二次三项式的最值',
      exampleTitle: '求二次三项式 $y = 8x^{2} - 12x + 5$ 的最小值',
      exampleFormula: '$y = 8x^{2} - 12x + 5$',
      totalDuration: 32.0,
      scratchpadIdleHint: '旁白草稿演算区（当步骤涉及系数相除、除以 2、平方或通分时在此同步展开）',
      practiceSectionTitle: '配方法求最值关键动作跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握配方法求最值',

      steps: [
        {
          step: 1,
          name: '提取二次项系数',
          tStart: 0.0,
          tEnd: 6.5,
          explanation: '先提取二次项系数 $8$，使括号内二次项的系数变为 $1$。'
        },
        {
          step: 2,
          name: '确定一次项系数的一半',
          tStart: 6.5,
          tEnd: 12.0,
          explanation: '配方法的关键是取括号内一次项系数的一半：$-\\frac{3}{2} \\div 2 = -\\frac{3}{4}$。'
        },
        {
          step: 3,
          name: '将所得结果平方',
          tStart: 12.0,
          tEnd: 17.0,
          explanation: '将一次项系数的一半平方，得到需要配入括号的常数：$\\left(-\\frac{3}{4}\\right)^{2} = \\frac{9}{16}$。'
        },
        {
          step: 4,
          name: '添加并减去相同的数',
          tStart: 17.0,
          tEnd: 26.5,
          explanation: '加上一个数的同时减去相同的数保证原式不变，再将前三项合为完全平方式、常数项移出括号合并。'
        },
        {
          step: 5,
          name: '利用完全平方的非负性求最值',
          tStart: 26.5,
          tEnd: 32.0,
          explanation: '利用偶次方非负性 $\\left(x - \\frac{3}{4}\\right)^{2} \\ge 0$ 且二次项系数 $8 \\gt 0$，得出当 $x = \\frac{3}{4}$ 时取得最小值 $\\frac{1}{2}$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 观察原式' },
        { time: 2.0, step: 1, label: '1.2 定位二次项系数 $8$' },
        { time: 3.8, step: 1, label: '1.3 一次项系数 $-12 \\div 8$' },
        { time: 6.2, step: 1, label: '1.4 写出提系数后算式' },
        { time: 7.8, step: 2, label: '2.1 锁定括号内一次项系数 $-\\frac{3}{2}$' },
        { time: 11.5, step: 2, label: '2.2 计算除以 $2$ 得 $-\\frac{3}{4}$' },
        { time: 13.5, step: 3, label: '3.1 对 $-\\frac{3}{4}$ 整体取平方' },
        { time: 16.5, step: 3, label: '3.2 算出配方常数 $\\frac{9}{16}$' },
        { time: 19.2, step: 4, label: '4.1 括号内同加 $+\\frac{9}{16}$ 同减 $-\\frac{9}{16}$' },
        { time: 21.6, step: 4, label: '4.2 前三项合并为 $\\left(x - \\frac{3}{4}\\right)^{2}$' },
        { time: 23.8, step: 4, label: '4.3 尾项 $-\\frac{9}{16}$ 乘系数 $8$ 移出括号' },
        { time: 25.8, step: 4, label: '4.4 合并括号外常数得 $+\\frac{1}{2}$' },
        { time: 27.8, step: 5, label: '5.1 平方项非负性 $\\left(x - \\frac{3}{4}\\right)^{2} \\ge 0$' },
        { time: 29.6, step: 5, label: '5.2 乘正系数 $8$ 推导 $y \\ge \\frac{1}{2}$' },
        { time: 31.8, step: 5, label: '5.3 得出最小值 $\\frac{1}{2}$ 与 $x = \\frac{3}{4}$' }
      ],

      boardRows: [
        {
          rowId: 'row_0',
          stepBadge: '原式',
          appearAt: 0.0,
          tokens: [
            { id: 'r0_y', math: '$y =$', appearAt: 0.0, dur: 0.01 },
            { id: 'r0_8', math: '$8$', appearAt: 0.0, dur: 0.01 },
            { id: 'r0_x2', math: '$x^{2}$', appearAt: 0.0, dur: 0.01 },
            { id: 'r0_m12', math: '$- 12$', appearAt: 0.0, dur: 0.01 },
            { id: 'r0_x', math: '$x$', appearAt: 0.0, dur: 0.01 },
            { id: 'r0_p5', math: '$+ 5$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'row_1',
          stepBadge: '第 1 步 · 提系数',
          appearAt: 2.2,
          tokens: [
            { id: 'r1_eq', math: '$=$', appearAt: 2.3, dur: 0.35 },
            { id: 'r1_8', math: '$8$', appearAt: 2.6, dur: 0.40 },
            { id: 'r1_lp', math: '$\\Big($', appearAt: 3.0, dur: 0.35 },
            { id: 'r1_x2', math: '$x^{2}$', appearAt: 3.3, dur: 0.35 },
            { id: 'r1_m32', math: '$- \\frac{3}{2}$', appearAt: 4.5, dur: 0.50 },
            { id: 'r1_x', math: '$x$', appearAt: 4.9, dur: 0.35 },
            { id: 'r1_rp', math: '$\\Big)$', appearAt: 5.3, dur: 0.35 },
            { id: 'r1_p5', math: '$+ 5$', appearAt: 5.6, dur: 0.40 }
          ]
        },
        {
          rowId: 'row_2',
          stepBadge: '第 4 步 ① · 同加同减',
          appearAt: 17.2,
          tokens: [
            { id: 'r2_eq', math: '$=$', appearAt: 17.3, dur: 0.30 },
            { id: 'r2_8', math: '$8$', appearAt: 17.5, dur: 0.30 },
            { id: 'r2_lp', math: '$\\Big($', appearAt: 17.7, dur: 0.30 },
            { id: 'r2_x2m32x', math: '$x^{2} - \\frac{3}{2}x$', appearAt: 17.9, dur: 0.35 },
            { id: 'r2_add', math: '$+ \\frac{9}{16}$', appearAt: 18.4, dur: 0.45 },
            { id: 'r2_sub', math: '$- \\frac{9}{16}$', appearAt: 18.9, dur: 0.45 },
            { id: 'r2_rp', math: '$\\Big)$', appearAt: 19.3, dur: 0.30 },
            { id: 'r2_p5', math: '$+ 5$', appearAt: 19.5, dur: 0.30 }
          ]
        },
        {
          rowId: 'row_3',
          stepBadge: '第 4 步 ② · 配完全平方',
          appearAt: 21.0,
          tokens: [
            { id: 'r3_eq', math: '$=$', appearAt: 21.05, dur: 0.25 },
            { id: 'r3_8', math: '$8$', appearAt: 21.25, dur: 0.25 },
            { id: 'r3_lb', math: '$\\Big[$', appearAt: 21.45, dur: 0.25 },
            { id: 'r3_sq', math: '$\\left(x - \\frac{3}{4}\\right)^{2}$', appearAt: 21.65, dur: 0.45 },
            { id: 'r3_sub', math: '$- \\frac{9}{16}$', appearAt: 22.05, dur: 0.30 },
            { id: 'r3_rb', math: '$\\Big]$', appearAt: 22.25, dur: 0.25 },
            { id: 'r3_p5', math: '$+ 5$', appearAt: 22.40, dur: 0.25 }
          ]
        },
        {
          rowId: 'row_4',
          stepBadge: '第 4 步 ③ · 移出括号',
          appearAt: 22.9,
          tokens: [
            { id: 'r4_eq', math: '$=$', appearAt: 22.95, dur: 0.25 },
            { id: 'r4_8', math: '$8$', appearAt: 23.15, dur: 0.25 },
            { id: 'r4_sq', math: '$\\left(x - \\frac{3}{4}\\right)^{2}$', appearAt: 23.35, dur: 0.30 },
            { id: 'r4_mult', math: '$- 8 \\times \\frac{9}{16}$', appearAt: 23.65, dur: 0.40 },
            { id: 'r4_p5', math: '$+ 5$', appearAt: 24.00, dur: 0.30 }
          ]
        },
        {
          rowId: 'row_5',
          stepBadge: '第 4 步 ④ · 化为顶点式',
          appearAt: 25.4,
          tokens: [
            { id: 'r5_eq', math: '$=$', appearAt: 25.45, dur: 0.25 },
            { id: 'r5_8', math: '$8$', appearAt: 25.65, dur: 0.25 },
            { id: 'r5_sq', math: '$\\left(x - \\frac{3}{4}\\right)^{2}$', appearAt: 25.85, dur: 0.35 },
            { id: 'r5_half', math: '$+ \\frac{1}{2}$', appearAt: 26.15, dur: 0.40 }
          ]
        },
        {
          rowId: 'row_6',
          stepBadge: '第 5 步 · 非负性推导',
          appearAt: 27.9,
          tokens: [
            { id: 'r6_bec', math: '$\\because \\left(x - \\frac{3}{4}\\right)^{2} \\ge 0$', appearAt: 27.95, dur: 0.45 },
            { id: 'r6_and8', math: '，且 $8 \\gt 0$', appearAt: 28.60, dur: 0.40 },
            { id: 'r6_imp1', math: '$\\implies 8\\left(x - \\frac{3}{4}\\right)^{2} \\ge 0$', appearAt: 29.15, dur: 0.45 },
            { id: 'r6_imp2', math: '$\\implies y \\ge \\frac{1}{2}$', appearAt: 29.75, dur: 0.45 }
          ]
        },
        {
          rowId: 'row_7',
          stepBadge: '最终结论',
          appearAt: 30.4,
          isConclusion: true,
          tokens: [
            { id: 'r7_conc', math: '$\\therefore$ 当 $x = \\frac{3}{4}$ 时，$y$ 取得最小值 $\\frac{1}{2}$。', appearAt: 30.45, dur: 0.55 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'sp_step1',
          title: '草稿演算 · 一次项除以 8',
          showStart: 3.1,
          showEnd: 6.4,
          tokens: [
            { id: 'sp1_t1', math: '$-12 \\div 8$', appearAt: 3.3, dur: 0.40 },
            { id: 'sp1_t2', math: '$= -\\frac{12}{8}$', appearAt: 3.7, dur: 0.40 },
            { id: 'sp1_t3', math: '$= -\\frac{3}{2}$', appearAt: 4.1, dur: 0.40 }
          ],
          note: '提取 8 后，括号内一次项系数由 $-12$ 变为 $-\\frac{3}{2}$'
        },
        {
          id: 'sp_step2',
          title: '草稿演算 · 第 2 步：取一次项系数的一半',
          showStart: 6.6,
          showEnd: 17.0,
          tokens: [
            { id: 'sp2_t1', math: '一次项系数：$-\\frac{3}{2}$', appearAt: 7.2, dur: 0.45 },
            { id: 'sp2_t2', math: '$\\implies -\\frac{3}{2} \\div 2$', appearAt: 8.6, dur: 0.45 },
            { id: 'sp2_t3', math: '$= -\\frac{3}{2} \\times \\frac{1}{2}$', appearAt: 9.5, dur: 0.45 },
            { id: 'sp2_t4', math: '$= -\\frac{3}{4}$', appearAt: 10.4, dur: 0.50 }
          ],
          note: '记住 $-\\frac{3}{4}$：它既是下一步要平方的数，也是完全平方式中的常数项'
        },
        {
          id: 'sp_step3',
          title: '草稿演算 · 第 3 步：将一半的结果平方',
          showStart: 12.1,
          showEnd: 19.8,
          tokens: [
            { id: 'sp3_t1', math: '$\\left(-\\frac{3}{4}\\right)^{2}$', appearAt: 12.8, dur: 0.45 },
            { id: 'sp3_t2', math: '$= \\left(-\\frac{3}{4}\\right) \\times \\left(-\\frac{3}{4}\\right)$', appearAt: 13.8, dur: 0.45 },
            { id: 'sp3_t3', math: '$= +\\frac{9}{16}$', appearAt: 14.9, dur: 0.50 }
          ],
          note: '得到需要在括号内部「同加同减」的配方常数 $\\frac{9}{16}$'
        },
        {
          id: 'sp_step4_const',
          title: '草稿演算 · 括号外常数项通分合并',
          showStart: 24.0,
          showEnd: 26.5,
          tokens: [
            { id: 'sp4_t1', math: '$-8 \\times \\frac{9}{16} + 5$', appearAt: 24.15, dur: 0.30 },
            { id: 'sp4_t2', math: '$= -\\frac{9}{2} + \\frac{10}{2}$', appearAt: 24.55, dur: 0.35 },
            { id: 'sp4_t3', math: '$= +\\frac{1}{2}$', appearAt: 24.95, dur: 0.35 }
          ],
          note: '注意 $-8 \\times \\frac{9}{16}$ 约分后为 $-\\frac{9}{2}$，加上 $5$ 得 $+\\frac{1}{2}$'
        }
      ],

      tokenHighlights: [
        // Step 1
        { tokenId: 'r0_8', tStart: 1.2, tEnd: 3.2, color: 'teal' },
        { tokenId: 'r1_8', tStart: 2.5, tEnd: 3.5, color: 'teal' },
        { tokenId: 'r0_m12', tStart: 3.2, tEnd: 5.2, color: 'amber' },
        { tokenId: 'sp1_t3', tStart: 4.1, tEnd: 5.5, color: 'amber' },
        { tokenId: 'r1_m32', tStart: 4.5, tEnd: 6.4, color: 'amber' },
        // Step 2
        { tokenId: 'r1_m32', tStart: 6.6, tEnd: 11.8, color: 'teal' },
        { tokenId: 'sp2_t1', tStart: 7.2, tEnd: 8.8, color: 'teal' },
        { tokenId: 'sp2_t4', tStart: 10.4, tEnd: 12.0, color: 'amber' },
        // Step 3
        { tokenId: 'sp2_t4', tStart: 12.1, tEnd: 13.8, color: 'teal' },
        { tokenId: 'sp3_t1', tStart: 12.8, tEnd: 14.8, color: 'teal' },
        { tokenId: 'sp3_t3', tStart: 14.9, tEnd: 17.0, color: 'amber' },
        // Step 4
        { tokenId: 'sp3_t3', tStart: 17.1, tEnd: 19.2, color: 'amber' },
        { tokenId: 'r2_add', tStart: 18.4, tEnd: 19.8, color: 'amber' },
        { tokenId: 'r2_sub', tStart: 18.9, tEnd: 19.8, color: 'rose' },
        { tokenId: 'r2_x2m32x', tStart: 19.8, tEnd: 21.3, color: 'teal' },
        { tokenId: 'r2_add', tStart: 19.8, tEnd: 21.3, color: 'teal' },
        { tokenId: 'r3_sq', tStart: 21.65, tEnd: 22.6, color: 'teal' },
        { tokenId: 'r3_8', tStart: 22.5, tEnd: 23.8, color: 'amber' },
        { tokenId: 'r3_sub', tStart: 22.5, tEnd: 23.8, color: 'rose' },
        { tokenId: 'r4_mult', tStart: 23.65, tEnd: 25.3, color: 'amber' },
        { tokenId: 'sp4_t3', tStart: 24.95, tEnd: 26.3, color: 'teal' },
        { tokenId: 'r5_half', tStart: 26.15, tEnd: 26.8, color: 'teal' },
        // Step 5
        { tokenId: 'r5_sq', tStart: 26.7, tEnd: 28.4, color: 'teal' },
        { tokenId: 'r6_bec', tStart: 27.95, tEnd: 29.0, color: 'teal' },
        { tokenId: 'r5_8', tStart: 28.5, tEnd: 29.6, color: 'amber' },
        { tokenId: 'r6_imp2', tStart: 29.75, tEnd: 30.8, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'svg_s1_factor8',
          type: 'arrow',
          fromToken: 'r0_8',
          toToken: 'r1_8',
          label: '提公因式 8',
          color: '#0F766E',
          curveOffset: -36,
          tStart: 1.5,
          tDrawEnd: 2.5,
          tFadeStart: 3.3,
          tEnd: 3.6
        },
        {
          id: 'svg_s1_div8',
          type: 'arrow',
          fromToken: 'r0_m12',
          toToken: 'r1_m32',
          label: '$\\div 8 = -\\frac{3}{2}$',
          color: '#D97706',
          curveOffset: 38,
          tStart: 3.5,
          tDrawEnd: 4.4,
          tFadeStart: 5.7,
          tEnd: 6.2
        },
        {
          id: 'svg_s2_pick_half',
          type: 'arrow',
          fromToken: 'r1_m32',
          toToken: 'sp2_t1',
          label: '取一次项系数',
          color: '#0F766E',
          curveOffset: -24,
          tStart: 6.8,
          tDrawEnd: 7.6,
          tFadeStart: 11.2,
          tEnd: 11.8
        },
        {
          id: 'svg_s3_square',
          type: 'arrow',
          fromToken: 'sp2_t4',
          toToken: 'sp3_t1',
          label: '平方',
          color: '#0F766E',
          curveOffset: 24,
          tStart: 12.2,
          tDrawEnd: 13.0,
          tFadeStart: 16.2,
          tEnd: 16.8
        },
        {
          id: 'svg_s4_inject',
          type: 'arrow',
          fromToken: 'sp3_t3',
          toToken: 'r2_add',
          label: '配入括号内',
          color: '#D97706',
          curveOffset: -28,
          tStart: 17.8,
          tDrawEnd: 18.6,
          tFadeStart: 19.4,
          tEnd: 19.7
        },
        {
          id: 'svg_s4_brace_trinomial',
          type: 'under-brace',
          startToken: 'r2_x2m32x',
          endToken: 'r2_add',
          label: '$a^{2} - 2ab + b^{2} = \\left(x - \\frac{3}{4}\\right)^{2}$',
          color: '#0F766E',
          tStart: 19.7,
          tDrawEnd: 20.3,
          tFadeStart: 20.8,
          tEnd: 21.1
        },
        {
          id: 'svg_s4_dist_8',
          type: 'arrow',
          fromToken: 'r3_8',
          toToken: 'r3_sub',
          label: '$\\times 8$ 移出括号',
          color: '#D97706',
          curveOffset: -24,
          tStart: 22.4,
          tDrawEnd: 23.0,
          tFadeStart: 23.6,
          tEnd: 23.9
        },
        {
          id: 'svg_s4_brace_const',
          type: 'under-brace',
          startToken: 'r4_mult',
          endToken: 'r4_p5',
          label: '$-\\frac{9}{2} + \\frac{10}{2} = +\\frac{1}{2}$',
          color: '#0F766E',
          tStart: 24.1,
          tDrawEnd: 24.7,
          tFadeStart: 25.1,
          tEnd: 25.4
        },
        {
          id: 'svg_s5_brace_nonneg',
          type: 'under-brace',
          startToken: 'r5_sq',
          endToken: 'r5_sq',
          label: '平方项恒 $\\ge 0$',
          color: '#0F766E',
          tStart: 26.6,
          tDrawEnd: 27.1,
          tFadeStart: 27.6,
          tEnd: 27.9
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 1.2, text: '来看示例题：求二次三项式 $y = 8x^{2} - 12x + 5$ 的最小值。先把原式写在黑板上。', focusToken: 'r0_x2' },
        { tStart: 1.2, tEnd: 3.1, text: '第一步提取二次项系数：先观察二次项系数的 $8$，我们要将前两项中的 $8$ 提取到括号外。', focusToken: 'r0_8' },
        { tStart: 3.1, tEnd: 4.5, text: '注意一次项系数是 $-12$，提取 $8$ 就相当于用 $-12 \\div 8$，约分后得到 $-\\frac{3}{2}$。', focusToken: 'sp1_t3' },
        { tStart: 4.5, tEnd: 6.5, text: '把 $-\\frac{3}{2}x$ 写进括号里，常数项 $+5$ 留在括号外，括号内二次项系数就化为 $1$ 了。', focusToken: 'r1_m32' },
        { tStart: 6.5, tEnd: 8.5, text: '第二步确定一次项系数的一半：把目光聚焦到括号内部，一次项系数是 $-\\frac{3}{2}$（别漏掉负号）。', focusToken: 'r1_m32' },
        { tStart: 8.5, tEnd: 12.0, text: '将 $-\\frac{3}{2}$ 除以 $2$，也就是乘 $\\frac{1}{2}$，算出一次项系数的一半等于 $-\\frac{3}{4}$。', focusToken: 'sp2_t4' },
        { tStart: 12.0, tEnd: 14.8, text: '第三步将所得结果平方：对刚才算出的 $-\\frac{3}{4}$ 整体取平方，即 $\\left(-\\frac{3}{4}\\right)^{2}$。', focusToken: 'sp3_t1' },
        { tStart: 14.8, tEnd: 17.0, text: '负数的平方是正数，分子分母分别平方，得到需要配入括号的常数 $+\\frac{9}{16}$。', focusToken: 'sp3_t3' },
        { tStart: 17.0, tEnd: 19.7, text: '第四步同加同减：在括号里加上 $+\\frac{9}{16}$，同时立刻减去 $-\\frac{9}{16}$，一加一减抵消，保证原式恒等。', focusToken: 'r2_sub' },
        { tStart: 19.7, tEnd: 22.3, text: '观察括号内前三项 $x^{2} - \\frac{3}{2}x + \\frac{9}{16}$，正好构成完全平方式 $\\left(x - \\frac{3}{4}\\right)^{2}$。', focusToken: 'r3_sq' },
        { tStart: 22.3, tEnd: 24.1, text: '关键易错点：把括号里多余的 $-\\frac{9}{16}$ 移出括号时，必须乘上括号前面的系数 $8$，写成 $-8 \\times \\frac{9}{16}$！', focusToken: 'r4_mult' },
        { tStart: 24.1, tEnd: 26.5, text: '合并括号外常数项：$-8 \\times \\frac{9}{16} + 5 = -\\frac{9}{2} + \\frac{10}{2} = +\\frac{1}{2}$，得到标准顶点式。', focusToken: 'r5_half' },
        { tStart: 26.5, tEnd: 28.5, text: '第五步求最值：因为任何实数的偶次方都大于或等于 $0$，所以 $\\left(x - \\frac{3}{4}\\right)^{2} \\ge 0$。', focusToken: 'r6_bec' },
        { tStart: 28.5, tEnd: 30.3, text: '又因为二次项系数 $8 \\gt 0$，乘正数不等号方向不变，两边再加上 $\\frac{1}{2}$，得出 $y \\ge \\frac{1}{2}$。', focusToken: 'r6_imp2' },
        { tStart: 30.3, tEnd: 32.0, text: '当平方项为 $0$、即 $x = \\frac{3}{4}$ 时，等号成立，$y$ 取得最小值 $\\frac{1}{2}$。推导完成！', focusToken: 'r7_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：判断配方操作',
          givenLabel: '已知：',
          givenFormula: '$y = 2x^{2} + 8x + 3$',
          extractedLabel: '提取二次项系数后：',
          extractedFormula: '$y = 2(x^{2} + 4x) + 3$',
          questionText: '下一步应该怎样操作？',
          options: [
            { key: 'A', text: 'A. 将 $4$ 除以 $2$，再将结果平方。', isCorrect: true },
            { key: 'B', text: 'B. 将 $4$ 直接平方。', isCorrect: false },
            { key: 'C', text: 'C. 将 $2$ 除以 $2$，再将结果平方。', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！配方法应取括号内一次项系数的一半再平方：',
            calcLines: [
              '$4 \\div 2 = 2$',
              '$2^{2} = 4$'
            ],
            summary: '因此在括号内同时加上并减去 $4$，即 $y = 2(x^{2} + 4x + 4 - 4) + 3$。'
          },
          wrongTitle: '提示：请留意括号内的一次项系数',
          wrongFeedback: '请留意括号 $(x^{2} + 4x)$ 内部的一次项系数，配方法需要先取括号内一次项系数的一半再平方，请再试一次。'
        },
        practice2: {
          title: '练习二：判断最值',
          givenLabel: '给出配方结果：',
          givenFormula: '$y = 2(x + 2)^{2} - 5$',
          questionText: '这个二次三项式的最小值是多少？在什么情况下取得？',
          input1Prefix: '当 $x =$',
          input1Placeholder: '如 -2',
          input2Prefix: '时，取得最小值',
          input2Placeholder: '如 -5',
          input2Suffix: '',
          expectedX: '-2',
          expectedMin: '-5',
          allowOrderSwap: false,
          correctFeedback: '当 $x = -2$ 时，取得最小值 $-5$。',
          correctDetail: '因为 $(x + 2)^{2} \\ge 0$ 且系数 $2 \\gt 0$，当 $x + 2 = 0$（即 $x = -2$）时，$(x + 2)^{2} = 0$，此时 $y$ 取得最小值 $-5$。',
          wrongFeedback: '请观察完全平方式 $(x + 2)^{2}$：当 $x$ 取何值时括号内为 $0$？此时剩余的常数项是多少？请调整后重试。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '2',
              hint: '注意括号内是 $(x + 2)^{2}$，要使 $x + 2 = 0$，$x$ 应当等于 $-2$ 而不是 $2$，请修改后再试。'
            },
            {
              checkType: 'secondVal',
              val: '5',
              hint: '注意括号外的常数项是 $-5$（带负号），请检查最小值的正负号后再试。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P04：识别代数式与判断规范书写
    // =========================================================================
    P04: {
      procedureId: 'P04',
      title: '识别代数式与判断规范书写',
      exampleTitle: '辨析并规范书写：① $S = ab$；② $a^{4}$；③ $1\\frac{1}{2}x$；④ $m - 2$ 米；⑤ $a \\div 5$',
      exampleFormula: '① $S = ab$；② $a^{4}$；③ $1\\frac{1}{2}x$；④ $m - 2$ 米；⑤ $a \\div 5$',
      totalDuration: 31.0,
      scratchpadIdleHint: '旁白草稿演算区（在此同步展示初中数学代数式书写的五项核心规范准则）',
      practiceSectionTitle: '代数式识别与规范书写跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握代数式的识别与五项书写规范',

      steps: [
        {
          step: 1,
          name: '排查关系符号',
          tStart: 0.0,
          tEnd: 6.2,
          explanation: '凡含有等号或不等号（$=、\\neq、\\gt、\\lt、\\ge、\\le$）的式子均为等式或不等式，不属于代数式；故 ① $S = ab$ 不是代数式。'
        },
        {
          step: 2,
          name: '检查乘号与乘方规范',
          tStart: 6.2,
          tEnd: 11.8,
          explanation: '数字与字母、字母与字母相乘应省略乘号且数字在前，相同字母相乘写成幂的形式；故 ② $a^{4}$ 符合规范。'
        },
        {
          step: 3,
          name: '带分数系数化假分数',
          tStart: 11.8,
          tEnd: 18.2,
          explanation: '字母前面的带分数系数必须化为假分数（防止误读为加号）：③ $1\\frac{1}{2}x$ 不规范，应改为 $\\frac{3}{2}x$。'
        },
        {
          step: 4,
          name: '和差代数式带单位加括号',
          tStart: 18.2,
          tEnd: 24.6,
          explanation: '代数式最外层为加减运算（和或差）且后带单位时，必须整体加括号：④ $m - 2$ 米不规范，应改为 $(m - 2)$ 米。'
        },
        {
          step: 5,
          name: '除号改写为分数线',
          tStart: 24.6,
          tEnd: 31.0,
          explanation: '代数式中出现除法运算时，除号“$\\div$”必须改写为分数线形式：⑤ $a \\div 5$ 应改为 $\\frac{a}{5}$。'
        }
      ],

      microBeats: [
        { time: 0.6, step: 1, label: '1.1 观察五个待检式子' },
        { time: 2.5, step: 1, label: '1.2 排查 ① $S = ab$ 中的等号 $=$' },
        { time: 7.5, step: 2, label: '2.1 核对 ② $a^{4}$ 乘方书写规范' },
        { time: 13.5, step: 3, label: '3.1 发现 ③ $1\\frac{1}{2}x$ 含带分数系数' },
        { time: 16.0, step: 3, label: '3.2 将带分数化为假分数 $\\frac{3}{2}x$' },
        { time: 19.8, step: 4, label: '4.1 发现 ④ $m - 2$ 米为差的形式带单位' },
        { time: 22.2, step: 4, label: '4.2 整体加括号改写为 $(m - 2)$ 米' },
        { time: 26.0, step: 5, label: '5.1 将 ⑤ $a \\div 5$ 改写为分数线 $\\frac{a}{5}$' },
        { time: 29.2, step: 5, label: '5.2 汇总代数式识别与规范判断结论' }
      ],

      boardRows: [
        {
          rowId: 'p4_row_0',
          stepBadge: '待检式子',
          appearAt: 0.0,
          tokens: [
            { id: 'p4_r0_1', math: '① $S = ab$', appearAt: 0.0, dur: 0.01 },
            { id: 'p4_r0_2', math: '② $a^{4}$', appearAt: 0.0, dur: 0.01 },
            { id: 'p4_r0_3', math: '③ $1\\frac{1}{2}x$', appearAt: 0.0, dur: 0.01 },
            { id: 'p4_r0_4', math: '④ $m - 2$ 米', appearAt: 0.0, dur: 0.01 },
            { id: 'p4_r0_5', math: '⑤ $a \\div 5$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p4_row_1',
          stepBadge: '第 1 步 · 排查关系符',
          appearAt: 1.6,
          tokens: [
            { id: 'p4_r1_item', math: '检查 ① $S = ab$：', appearAt: 1.7, dur: 0.35 },
            { id: 'p4_r1_rel', math: '含关系符号 $=$', appearAt: 2.3, dur: 0.40 },
            { id: 'p4_r1_res', math: '$\\implies$ 是等式（不是代数式）', appearAt: 3.1, dur: 0.45 }
          ]
        },
        {
          rowId: 'p4_row_2',
          stepBadge: '第 2 步 · 乘方与乘号',
          appearAt: 6.8,
          tokens: [
            { id: 'p4_r2_item', math: '检查 ② $a^{4}$：', appearAt: 6.9, dur: 0.35 },
            { id: 'p4_r2_rule', math: '相同字母相乘写成幂', appearAt: 7.5, dur: 0.40 },
            { id: 'p4_r2_res', math: '$\\implies$ 代数式，且书写规范 ✓', appearAt: 8.3, dur: 0.45 }
          ]
        },
        {
          rowId: 'p4_row_3',
          stepBadge: '第 3 步 · 带分数化假分数',
          appearAt: 12.6,
          tokens: [
            { id: 'p4_r3_item', math: '检查 ③ $1\\frac{1}{2}x$：', appearAt: 12.7, dur: 0.35 },
            { id: 'p4_r3_err', math: '带分数系数不规范', appearAt: 13.4, dur: 0.40 },
            { id: 'p4_r3_fix', math: '$\\implies$ 应化为假分数 $\\frac{3}{2}x$', appearAt: 15.2, dur: 0.50 }
          ]
        },
        {
          rowId: 'p4_row_4',
          stepBadge: '第 4 步 · 单位加括号',
          appearAt: 19.0,
          tokens: [
            { id: 'p4_r4_item', math: '检查 ④ $m - 2$ 米：', appearAt: 19.1, dur: 0.35 },
            { id: 'p4_r4_err', math: '差的形式带单位漏括号', appearAt: 19.8, dur: 0.40 },
            { id: 'p4_r4_fix', math: '$\\implies$ 应写为 $(m - 2)$ 米', appearAt: 21.5, dur: 0.50 }
          ]
        },
        {
          rowId: 'p4_row_5',
          stepBadge: '第 5 步 · 除号改分数线',
          appearAt: 25.2,
          tokens: [
            { id: 'p4_r5_item', math: '检查 ⑤ $a \\div 5$：', appearAt: 25.3, dur: 0.35 },
            { id: 'p4_r5_err', math: '含除号 $\\div$ 不规范', appearAt: 25.9, dur: 0.40 },
            { id: 'p4_r5_fix', math: '$\\implies$ 应改写为 $\\frac{a}{5}$', appearAt: 26.8, dur: 0.50 }
          ]
        },
        {
          rowId: 'p4_row_6',
          stepBadge: '最终结论',
          appearAt: 28.5,
          isConclusion: true,
          tokens: [
            { id: 'p4_r6_conc', math: '$\\therefore$ 属于代数式的有 ②③④⑤；完全符合书写规范的仅有 ② $a^{4}$。', appearAt: 28.6, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p4_sp_step1',
          title: '核心准则 1 · 什么是代数式？',
          showStart: 0.8,
          showEnd: 6.1,
          tokens: [
            { id: 'p4_sp1_t1', math: '仅含数、字母与运算符号（$+、-、\\times、\\div$、乘方）', appearAt: 1.2, dur: 0.40 },
            { id: 'p4_sp1_t2', math: '禁含关系符号：$=、\\neq、\\gt、\\lt、\\ge、\\le$', appearAt: 2.6, dur: 0.45 }
          ],
          note: '单独的一个数（如 $0, \\pi$）或一个字母（如 $a$）也是代数式'
        },
        {
          id: 'p4_sp_step2',
          title: '核心准则 2 · 乘号与系数 ±1 规范',
          showStart: 6.3,
          showEnd: 11.7,
          tokens: [
            { id: 'p4_sp2_t1', math: '数与字母相乘：$m \\times 4 \\to 4m$（数字在前）', appearAt: 6.8, dur: 0.40 },
            { id: 'p4_sp2_t2', math: '系数为 $\\pm 1$：$1a \\to a$，$-1a \\to -a$（省去 $1$）', appearAt: 8.2, dur: 0.45 }
          ],
          note: '相同字母相乘必须写成乘方幂的形式，如 $a \\cdot a \\cdot a \\cdot a = a^{4}$'
        },
        {
          id: 'p4_sp_step3',
          title: '核心准则 3 · 带分数必须化假分数',
          showStart: 12.0,
          showEnd: 18.1,
          tokens: [
            { id: 'p4_sp3_t1', math: '$1\\frac{1}{2} = \\frac{1 \\times 2 + 1}{2} = \\frac{3}{2}$', appearAt: 13.8, dur: 0.45 },
            { id: 'p4_sp3_t2', math: '$\\therefore 1\\frac{1}{2}x \\to \\frac{3}{2}x$', appearAt: 15.0, dur: 0.45 }
          ],
          note: '省略乘号后，带分数 $1\\frac{1}{2}$ 极易被误认为是 $1 \\times \\frac{1}{2}$，故必须化为假分数'
        },
        {
          id: 'p4_sp_step45',
          title: '核心准则 4 & 5 · 单位括号与分数线',
          showStart: 18.4,
          showEnd: 30.8,
          tokens: [
            { id: 'p4_sp4_t1', math: '和差带单位：$m - 2\\text{ 米} \\to (m - 2)\\text{ 米}$', appearAt: 19.6, dur: 0.45 },
            { id: 'p4_sp4_t2', math: '除法变分数线：$a \\div 5 \\to \\frac{a}{5}$', appearAt: 25.6, dur: 0.45 }
          ],
          note: '若最外层是乘积或分式（如 $3x$ 米、$\\frac{a}{5}$ 米），则不需要加括号'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p4_r0_1', tStart: 1.0, tEnd: 5.8, color: 'rose' },
        { tokenId: 'p4_r1_rel', tStart: 2.3, tEnd: 5.8, color: 'rose' },
        { tokenId: 'p4_r0_2', tStart: 6.3, tEnd: 11.5, color: 'teal' },
        { tokenId: 'p4_r2_res', tStart: 8.3, tEnd: 11.5, color: 'teal' },
        { tokenId: 'p4_r0_3', tStart: 12.0, tEnd: 18.0, color: 'amber' },
        { tokenId: 'p4_r3_fix', tStart: 15.2, tEnd: 18.0, color: 'teal' },
        { tokenId: 'p4_r0_4', tStart: 18.4, tEnd: 24.4, color: 'amber' },
        { tokenId: 'p4_r4_fix', tStart: 21.5, tEnd: 24.4, color: 'teal' },
        { tokenId: 'p4_r0_5', tStart: 24.8, tEnd: 28.2, color: 'amber' },
        { tokenId: 'p4_r5_fix', tStart: 26.8, tEnd: 28.4, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p4_svg_s1',
          type: 'arrow',
          fromToken: 'p4_r0_1',
          toToken: 'p4_r1_rel',
          label: '含等号 $=$ 排除',
          color: '#D97706',
          curveOffset: -24,
          tStart: 1.8,
          tDrawEnd: 2.6,
          tFadeStart: 5.2,
          tEnd: 5.8
        },
        {
          id: 'p4_svg_s3',
          type: 'arrow',
          fromToken: 'p4_r3_err',
          toToken: 'p4_r3_fix',
          label: '$1\\frac{1}{2} = \\frac{3}{2}$',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 14.2,
          tDrawEnd: 15.1,
          tFadeStart: 17.3,
          tEnd: 17.9
        },
        {
          id: 'p4_svg_s4',
          type: 'arrow',
          fromToken: 'p4_r4_err',
          toToken: 'p4_r4_fix',
          label: '整体加括号',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 20.6,
          tDrawEnd: 21.4,
          tFadeStart: 23.8,
          tEnd: 24.3
        },
        {
          id: 'p4_svg_s5',
          type: 'arrow',
          fromToken: 'p4_r5_err',
          toToken: 'p4_r5_fix',
          label: '除号改分数线',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 26.1,
          tDrawEnd: 26.8,
          tFadeStart: 28.0,
          tEnd: 28.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 1.5, text: '来看代数式识别与规范书写例题：屏幕上给出了 ① 到 ⑤ 五个式子，我们逐一排查。', focusToken: 'p4_r0_1' },
        { tStart: 1.5, tEnd: 6.2, text: '第一步排查关系符号：① $S = ab$ 中含有等号 $=$，它是表示相等关系的等式，不属于代数式！', focusToken: 'p4_r1_rel' },
        { tStart: 6.2, tEnd: 11.8, text: '第二步检查乘方与乘号：② $a^{4}$ 不含关系符号，且相同字母相乘写成了幂的形式，完全符合代数式书写规范。', focusToken: 'p4_r2_res' },
        { tStart: 11.8, tEnd: 15.0, text: '第三步检查带分数系数：③ $1\\frac{1}{2}x$ 的系数是带分数，省略乘号后容易与加法或乘法混淆。', focusToken: 'p4_r3_err' },
        { tStart: 15.0, tEnd: 18.2, text: '因此带分数系数必须化为假分数，将 $1\\frac{1}{2}$ 化为 $\\frac{3}{2}$，规范写法应为 $\\frac{3}{2}x$。', focusToken: 'p4_r3_fix' },
        { tStart: 18.2, tEnd: 24.6, text: '第四步检查单位括号：④ $m - 2$ 米的最外层是减法（差的形式），后面带单位“米”时，必须用括号括起来写成 $(m - 2)$ 米。', focusToken: 'p4_r4_fix' },
        { tStart: 24.6, tEnd: 28.4, text: '第五步检查除号：⑤ $a \\div 5$ 中出现了除号 $\\div$，在代数式中必须改写为分数线形式 $\\frac{a}{5}$。', focusToken: 'p4_r5_fix' },
        { tStart: 28.4, tEnd: 31.0, text: '综上：属于代数式的有 ②③④⑤，而原式书写完全规范的只有 ② $a^{4}$。辨析完成！', focusToken: 'p4_r6_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：判断代数式书写规范',
          givenLabel: '给出四个代数式：',
          givenFormula: '① $-1ab$；② $2\\frac{1}{3}m$；③ $\\frac{3x^{2}}{4}$；④ $x + 3$ 元',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '其中完全符合初中数学代数式书写规范的是哪一个？',
          options: [
            { key: 'A', text: 'A. ③ $\\frac{3x^{2}}{4}$', isCorrect: true },
            { key: 'B', text: 'B. ② $2\\frac{1}{3}m$', isCorrect: false },
            { key: 'C', text: 'C. ① $-1ab$ 与 ④ $x + 3$ 元', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！其余三项的规范改写如下：',
            calcLines: [
              '① $-1ab \\to -ab$（系数 $-1$ 中的 $1$ 必须省略）',
              '② $2\\frac{1}{3}m \\to \\frac{7}{3}m$（带分数必须化为假分数）',
              '④ $x + 3\\text{ 元} \\to (x + 3)\\text{ 元}$（和差带单位必须加括号）'
            ],
            summary: '只有 ③ $\\frac{3x^{2}}{4}$ 用分数线表示除法且数字系数在前，完全符合规范。'
          },
          wrongTitle: '提示：请对照五项书写规范逐一排查',
          wrongFeedback: '注意系数为 $-1$ 时应省去 $1$、带分数系数须化为假分数、和差后带单位须加括号，请再试一次。'
        },
        practice2: {
          title: '练习二：将带分数系数化为规范假分数',
          givenLabel: '给出不规范代数式：',
          givenFormula: '$2\\frac{3}{4}x$',
          questionText: '将其规范改写为假分数系数 $\\frac{p}{q}x$ 的形式，分子 $p$ 与分母 $q$ 分别是多少？',
          input1Prefix: '分子 $p =$',
          input1Placeholder: '如 11',
          input2Prefix: '，分母 $q =$',
          input2Placeholder: '如 4',
          input2Suffix: '',
          expectedX: '11',
          expectedMin: '4',
          allowOrderSwap: false,
          correctFeedback: '规范写法为 $\\frac{11}{4}x$（分子 $p = 11$，分母 $q = 4$）。',
          correctDetail: '将带分数化为假分数：$2\\frac{3}{4} = \\frac{2 \\times 4 + 3}{4} = \\frac{11}{4}$，故规范书写为 $\\frac{11}{4}x$。',
          wrongFeedback: '请按“整数部分 $\\times$ 分母 $+$ 分子”计算假分数的分子：$2 \\times 4 + 3$，分母保持 $4$ 不变。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '6',
              hint: '注意不是 $2 \\times 3 = 6$，而是整数部分 $2$ 乘分母 $4$ 再加分子 $3$：$2 \\times 4 + 3 = 11$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P10：利用等腰三角形“三线合一”求解与构造辅助线
    // =========================================================================
    P10: {
      procedureId: 'P10',
      title: '利用等腰三角形“三线合一”求解与构造辅助线',
      exampleTitle: '在 $\\triangle ABC$ 中，$AB = AC = 5$，$D$ 是底边 $BC$ 中点，$BC = 6$，$\\angle BAC = 74^{\\circ}$，求 $\\angle BAD$、$\\angle ADB$ 与 $AD$',
      exampleFormula: '$AB = AC = 5，BD = CD，BC = 6，\\angle BAC = 74^{\\circ}$',
      totalDuration: 31.0,
      scratchpadIdleHint: '旁白草稿演算区（配合上方动态几何图形，同步展示三线合一结论与勾股计算）',
      practiceSectionTitle: '等腰三角形“三线合一”关键动作跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握三线合一的前提核对与边角转化',

      // 右侧实时几何联动 SVG 图形（随 60fps 时间轴同步高亮两腰、绘制中线 AD、标注直角符号与等分弧）
      geometryDiagram: {
        title: '动态几何图形 · 等腰 △ABC 三线合一',
        caption: '随推演进度实时绘制两腰标记、底边中线 AD、顶角平分弧与底边直角符号',
        svgHtml: `
          <svg viewBox="0 0 260 185" class="w-full max-w-[260px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <!-- Step 5 直角三角形 Rt△ABD 浅青绿高亮底色 -->
            <polygon class="proc-geo-anim" data-appear-at="24.6" data-dur="0.6" points="130,26 34,154 130,154" fill="rgba(15, 118, 110, 0.10)" style="opacity:0;" />

            <!-- 基础三角形底边 BC -->
            <line x1="34" y1="154" x2="226" y2="154" stroke="#334155" stroke-width="2.2" stroke-linecap="round" />
            <!-- 基础两腰 AB, AC -->
            <line x1="130" y1="26" x2="34" y2="154" stroke="#334155" stroke-width="2.2" stroke-linecap="round" />
            <line x1="130" y1="26" x2="226" y2="154" stroke="#334155" stroke-width="2.2" stroke-linecap="round" />

            <!-- Step 1：高亮相等两腰 AB = AC = 5 及等腰短线标记 -->
            <g class="proc-geo-anim" data-appear-at="1.2" data-dur="0.5" style="opacity:0;">
              <line x1="130" y1="26" x2="34" y2="154" stroke="#0F766E" stroke-width="3.2" stroke-linecap="round" />
              <line x1="130" y1="26" x2="226" y2="154" stroke="#0F766E" stroke-width="3.2" stroke-linecap="round" />
              <!-- AB 腰上的单刻线 -->
              <line x1="76" y1="86" x2="88" y2="95" stroke="#0F766E" stroke-width="2.2" />
              <!-- AC 腰上的单刻线 -->
              <line x1="184" y1="86" x2="172" y2="95" stroke="#0F766E" stroke-width="2.2" />
              <text x="60" y="84" fill="#0F766E" font-size="12" font-weight="700">5</text>
              <text x="192" y="84" fill="#0F766E" font-size="12" font-weight="700">5</text>
            </g>

            <!-- Step 2：底边中点 D、等分双刻线 BD=CD=3 与动态连接中线 AD -->
            <g class="proc-geo-anim" data-appear-at="6.3" data-dur="0.5" style="opacity:0;">
              <circle cx="130" cy="154" r="3.5" fill="#D97706" />
              <text x="125" y="173" fill="#B45309" font-size="12" font-weight="700">D</text>
              <!-- BD 双刻线 -->
              <line x1="79" y1="148" x2="79" y2="160" stroke="#D97706" stroke-width="2" />
              <line x1="84" y1="148" x2="84" y2="160" stroke="#D97706" stroke-width="2" />
              <!-- CD 双刻线 -->
              <line x1="176" y1="148" x2="176" y2="160" stroke="#D97706" stroke-width="2" />
              <line x1="181" y1="148" x2="181" y2="160" stroke="#D97706" stroke-width="2" />
              <text x="76" y="143" fill="#B45309" font-size="11" font-weight="700">3</text>
              <text x="174" y="143" fill="#B45309" font-size="11" font-weight="700">3</text>
            </g>

            <line class="proc-geo-anim" data-appear-at="7.4" data-dur="0.7" data-dash-len="130" x1="130" y1="26" x2="130" y2="154" stroke="#D97706" stroke-width="2.5" stroke-dasharray="130" stroke-dashoffset="130" style="opacity:0;" />

            <!-- Step 3：顶角平分线双弧标记 ∠BAD = ∠CAD = 37° -->
            <g class="proc-geo-anim" data-appear-at="13.0" data-dur="0.5" style="opacity:0;">
              <path d="M 115 46 A 25 25 0 0 0 130 51" fill="none" stroke="#0F766E" stroke-width="2" />
              <path d="M 130 55 A 29 29 0 0 0 147 49" fill="none" stroke="#0F766E" stroke-width="2" />
              <text x="90" y="62" fill="#0F766E" font-size="10" font-weight="700">37°</text>
              <text x="145" y="62" fill="#0F766E" font-size="10" font-weight="700">37°</text>
            </g>

            <!-- Step 4：底边高线垂直符号 AD ⊥ BC -->
            <g class="proc-geo-anim" data-appear-at="19.2" data-dur="0.5" style="opacity:0;">
              <polyline points="118,154 118,142 130,142" fill="none" stroke="#BE123C" stroke-width="2" />
              <text x="95" y="138" fill="#BE123C" font-size="10" font-weight="700">90°</text>
            </g>

            <!-- Step 5：高 AD = 4 长度标注 -->
            <g class="proc-geo-anim" data-appear-at="26.2" data-dur="0.5" style="opacity:0;">
              <rect x="135" y="88" width="44" height="18" rx="4" fill="#F0FDFA" stroke="#0F766E" stroke-width="1.2" />
              <text x="157" y="100" text-anchor="middle" fill="#0F766E" font-size="11" font-weight="700">AD=4</text>
            </g>

            <!-- 顶点 A, B, C 标签 -->
            <circle cx="130" cy="26" r="3" fill="#0F172A" />
            <circle cx="34" cy="154" r="3" fill="#0F172A" />
            <circle cx="226" cy="154" r="3" fill="#0F172A" />
            <text x="125" y="16" fill="#0F172A" font-size="13" font-weight="700">A</text>
            <text x="18" y="162" fill="#0F172A" font-size="13" font-weight="700">B</text>
            <text x="232" y="162" fill="#0F172A" font-size="13" font-weight="700">C</text>
          </svg>
        `
      },

      steps: [
        {
          step: 1,
          name: '锁定两腰与底边',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '在 $\\triangle ABC$ 中确认相等的两腰 $AB = AC = 5$，明确顶角顶点为 $A$，对应的底边为 $BC$（仅底边上的三线重合）。'
        },
        {
          step: 2,
          name: '识别底边上的已知一线',
          tStart: 6.0,
          tEnd: 12.2,
          explanation: '点 $D$ 是底边 $BC$ 的中点，即 $AD$ 是底边上的中线，由此先得出 $BD = CD = \\frac{1}{2}BC = 3$。'
        },
        {
          step: 3,
          name: '导出顶角平分线求角度',
          tStart: 12.2,
          tEnd: 18.5,
          explanation: '由等腰三角形“三线合一”，底边上的中线 $AD$ 也是顶角 $\\angle BAC$ 的平分线，故 $\\angle BAD = \\frac{1}{2}\\angle BAC = 37^{\\circ}$。'
        },
        {
          step: 4,
          name: '导出底边上的高得直角',
          tStart: 18.5,
          tEnd: 24.5,
          explanation: '由“三线合一”，底边上的中线 $AD$ 也是底边 $BC$ 上的高，故 $AD \\perp BC$，$\\angle ADB = \\angle ADC = 90^{\\circ}$。'
        },
        {
          step: 5,
          name: '在 Rt△ABD 中求高 AD',
          tStart: 24.5,
          tEnd: 31.0,
          explanation: '在 $\\text{Rt}\\triangle ABD$ 中，已知斜边 $AB = 5$、直角边 $BD = 3$，由勾股定理得 $AD = \\sqrt{5^{2} - 3^{2}} = 4$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 观察等腰 $\\triangle ABC$ 已知条件' },
        { time: 2.5, step: 1, label: '1.2 锁定两腰 $AB = AC = 5$ 与底边 $BC$' },
        { time: 7.5, step: 2, label: '2.1 识别 $D$ 为 $BC$ 中点（连接中线 $AD$）' },
        { time: 10.2, step: 2, label: '2.2 算出 $BD = CD = \\frac{1}{2}BC = 3$' },
        { time: 14.0, step: 3, label: '3.1 三线合一导出 $AD$ 平分 $\\angle BAC$' },
        { time: 16.5, step: 3, label: '3.2 算出 $\\angle BAD = \\frac{1}{2} \\times 74^{\\circ} = 37^{\\circ}$' },
        { time: 20.0, step: 4, label: '4.1 三线合一导出 $AD \\perp BC$（$\\angle ADB = 90^{\\circ}$）' },
        { time: 26.5, step: 5, label: '5.1 在 $\\text{Rt}\\triangle ABD$ 中用勾股定理算 $AD = 4$' },
        { time: 29.5, step: 5, label: '5.2 汇总角度与线段长度结论' }
      ],

      boardRows: [
        {
          rowId: 'p10_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p10_r0_1', math: '在 $\\triangle ABC$ 中，', appearAt: 0.0, dur: 0.01 },
            { id: 'p10_r0_abac', math: '$AB = AC = 5$', appearAt: 0.0, dur: 0.01 },
            { id: 'p10_r0_bc', math: '，$BC = 6$', appearAt: 0.0, dur: 0.01 },
            { id: 'p10_r0_mid', math: '，$D$ 为 $BC$ 中点', appearAt: 0.0, dur: 0.01 },
            { id: 'p10_r0_ang', math: '，$\\angle BAC = 74^{\\circ}$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p10_row_1',
          stepBadge: '第 1 步 · 锁定腰与底',
          appearAt: 1.5,
          tokens: [
            { id: 'p10_r1_bec', math: '$\\because AB = AC = 5$', appearAt: 1.6, dur: 0.40 },
            { id: 'p10_r1_imp', math: '$\\implies A$ 为顶角顶点，$BC$ 为底边', appearAt: 2.3, dur: 0.45 }
          ]
        },
        {
          rowId: 'p10_row_2',
          stepBadge: '第 2 步 · 识别一线（中线）',
          appearAt: 6.6,
          tokens: [
            { id: 'p10_r2_mid', math: '$\\because D$ 是底边 $BC$ 的中点', appearAt: 6.7, dur: 0.40 },
            { id: 'p10_r2_bd', math: '$\\implies BD = CD = \\frac{1}{2}BC = \\frac{1}{2} \\times 6 = 3$', appearAt: 8.2, dur: 0.50 }
          ]
        },
        {
          rowId: 'p10_row_3',
          stepBadge: '第 3 步 · 导出角平分线',
          appearAt: 12.8,
          tokens: [
            { id: 'p10_r3_rule', math: '由“三线合一”得 $AD$ 平分 $\\angle BAC$', appearAt: 12.9, dur: 0.45 },
            { id: 'p10_r3_val', math: '$\\implies \\angle BAD = \\frac{1}{2}\\angle BAC = \\frac{1}{2} \\times 74^{\\circ} = 37^{\\circ}$', appearAt: 14.5, dur: 0.50 }
          ]
        },
        {
          rowId: 'p10_row_4',
          stepBadge: '第 4 步 · 导出底边高线',
          appearAt: 19.0,
          tokens: [
            { id: 'p10_r4_rule', math: '由“三线合一”得 $AD \\perp BC$', appearAt: 19.1, dur: 0.45 },
            { id: 'p10_r4_val', math: '$\\implies \\angle ADB = \\angle ADC = 90^{\\circ}$', appearAt: 20.5, dur: 0.50 }
          ]
        },
        {
          rowId: 'p10_row_5',
          stepBadge: '第 5 步 · 勾股定理求高',
          appearAt: 25.0,
          tokens: [
            { id: 'p10_r5_rt', math: '在 $\\text{Rt}\\triangle ABD$ 中，', appearAt: 25.1, dur: 0.35 },
            { id: 'p10_r5_ad', math: '$AD = \\sqrt{AB^{2} - BD^{2}} = \\sqrt{5^{2} - 3^{2}} = 4$', appearAt: 25.8, dur: 0.50 }
          ]
        },
        {
          rowId: 'p10_row_6',
          stepBadge: '最终结论',
          appearAt: 28.5,
          isConclusion: true,
          tokens: [
            { id: 'p10_r6_conc', math: '$\\therefore \\angle BAD = 37^{\\circ}$，$\\angle ADB = 90^{\\circ}$，$AD = 4$。', appearAt: 28.6, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p10_sp_1',
          title: '草稿提示 · “三线合一”知一推二',
          showStart: 12.4,
          showEnd: 24.4,
          tokens: [
            { id: 'p10_sp1_t1', math: '前提：等腰 $\\triangle ABC$ 中 $AB = AC$', appearAt: 12.8, dur: 0.40 },
            { id: 'p10_sp1_t2', math: '已知一线：$D$ 为底边 $BC$ 中点（中线）', appearAt: 13.6, dur: 0.40 },
            { id: 'p10_sp1_t3', math: '$\\implies$ ① 顶角平分线：$\\angle BAD = \\angle CAD$', appearAt: 14.4, dur: 0.45 },
            { id: 'p10_sp1_t4', math: '$\\implies$ ② 底边上的高：$AD \\perp BC$', appearAt: 19.3, dur: 0.45 }
          ],
          note: '切记：只有底边 $BC$ 上的中线、高线与顶角平分线重合，腰上的线不满足三线合一'
        },
        {
          id: 'p10_sp_2',
          title: '草稿演算 · 直角三角形勾股计算',
          showStart: 24.6,
          showEnd: 30.8,
          tokens: [
            { id: 'p10_sp2_t1', math: '斜边 $AB = 5$，直角边 $BD = 3$', appearAt: 25.0, dur: 0.40 },
            { id: 'p10_sp2_t2', math: '$AD = \\sqrt{25 - 9} = \\sqrt{16} = 4$', appearAt: 26.0, dur: 0.45 }
          ],
          note: '若图中没有现成的底边中线或高线，常过顶角顶点 $A$ 作 $AD \\perp BC$ 构造直角三角形'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p10_r0_abac', tStart: 1.0, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p10_r1_bec', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p10_r0_mid', tStart: 6.2, tEnd: 12.0, color: 'amber' },
        { tokenId: 'p10_r2_bd', tStart: 8.2, tEnd: 12.0, color: 'amber' },
        { tokenId: 'p10_r0_ang', tStart: 12.4, tEnd: 18.2, color: 'teal' },
        { tokenId: 'p10_r3_val', tStart: 14.5, tEnd: 18.2, color: 'teal' },
        { tokenId: 'p10_r4_val', tStart: 20.5, tEnd: 24.3, color: 'rose' },
        { tokenId: 'p10_r5_ad', tStart: 25.8, tEnd: 28.4, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p10_svg_s2',
          type: 'arrow',
          fromToken: 'p10_r0_bc',
          toToken: 'p10_r2_bd',
          label: '中点平分底边 $\\frac{1}{2} \\times 6 = 3$',
          color: '#D97706',
          curveOffset: 30,
          tStart: 7.4,
          tDrawEnd: 8.3,
          tFadeStart: 11.2,
          tEnd: 11.8
        },
        {
          id: 'p10_svg_s3',
          type: 'arrow',
          fromToken: 'p10_r2_mid',
          toToken: 'p10_r3_rule',
          label: '三线合一 · 推角平分线',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 12.3,
          tDrawEnd: 13.2,
          tFadeStart: 17.5,
          tEnd: 18.2
        },
        {
          id: 'p10_svg_s4',
          type: 'arrow',
          fromToken: 'p10_r2_mid',
          toToken: 'p10_r4_rule',
          label: '三线合一 · 推底边垂直',
          color: '#D97706',
          curveOffset: -28,
          tStart: 18.6,
          tDrawEnd: 19.5,
          tFadeStart: 23.6,
          tEnd: 24.2
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 1.5, text: '来看等腰三角形“三线合一”典型例题：在 $\\triangle ABC$ 中，$AB = AC = 5$，$BC = 6$，$D$ 是底边 $BC$ 的中点，$\\angle BAC = 74^{\\circ}$。', focusToken: 'p10_r0_abac' },
        { tStart: 1.5, tEnd: 6.0, text: '第一步锁定两腰与底边：先看右侧几何图，高亮相等的两腰 $AB = AC = 5$，确定 $A$ 是顶角顶点、$BC$ 是底边。', focusToken: 'p10_r1_imp' },
        { tStart: 6.0, tEnd: 12.2, text: '第二步识别底边上的一线：已知点 $D$ 是底边 $BC$ 的中点，连接 $AD$，则 $AD$ 是底边中线，且 $BD = CD = \\frac{1}{2}BC = 3$。', focusToken: 'p10_r2_bd' },
        { tStart: 12.2, tEnd: 18.5, text: '第三步导出顶角平分线：由“三线合一”，底边中线 $AD$ 同时平分顶角 $\\angle BAC$，故 $\\angle BAD = \\frac{1}{2} \\times 74^{\\circ} = 37^{\\circ}$。', focusToken: 'p10_r3_val' },
        { tStart: 18.5, tEnd: 24.5, text: '第四步导出底边上的高：由“三线合一”，$AD$ 同时垂直于底边 $BC$，因此在点 $D$ 处标出直角符号，$\\angle ADB = 90^{\\circ}$。', focusToken: 'p10_r4_val' },
        { tStart: 24.5, tEnd: 28.4, text: '第五步在直角三角形中求线段：在 $\\text{Rt}\\triangle ABD$ 中，斜边 $AB = 5$、直角边 $BD = 3$，由勾股定理算出高 $AD = 4$。', focusToken: 'p10_r5_ad' },
        { tStart: 28.4, tEnd: 31.0, text: '汇总得出 $\\angle BAD = 37^{\\circ}$，$\\angle ADB = 90^{\\circ}$，$AD = 4$。边角转化完成！', focusToken: 'p10_r6_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：判断“三线合一”导出的结论',
          givenLabel: '已知条件：',
          givenFormula: '在 $\\triangle ABC$ 中，$AB = AC = 10$，$BC = 12$',
          extractedLabel: '底边上的一线：',
          extractedFormula: '$AD$ 平分顶角 $\\angle BAC$ 交 $BC$ 于点 $D$',
          questionText: '根据等腰三角形“三线合一”性质，下列直接导出的结论哪一项正确？',
          options: [
            { key: 'A', text: 'A. $AD \\perp BC$（$\\angle ADB = 90^{\\circ}$），且 $BD = CD = 6$。', isCorrect: true },
            { key: 'B', text: 'B. $AD \\perp AB$，且 $BD = 10$。', isCorrect: false },
            { key: 'C', text: 'C. $AD = BC = 12$。', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！顶角平分线、底边上的中线、底边上的高三线重合：',
            calcLines: [
              '$AD \\perp BC \\implies \\angle ADB = \\angle ADC = 90^{\\circ}$',
              '$BD = CD = \\frac{1}{2}BC = \\frac{1}{2} \\times 12 = 6$'
            ],
            summary: '再在 $\\text{Rt}\\triangle ABD$ 中用勾股定理即可算出高 $AD = \\sqrt{10^{2} - 6^{2}} = 8$。'
          },
          wrongTitle: '提示：请确认哪条边是底边',
          wrongFeedback: '因为 $AB = AC$，所以 $BC$ 是底边，顶角平分线 $AD$ 垂直且平分的是底边 $BC$，请再试一次。'
        },
        practice2: {
          title: '练习二：利用“三线合一”求线段与角度',
          givenLabel: '给出等腰三角形条件：',
          givenFormula: '在 $\\triangle ABC$ 中，$AB = AC$，$AD \\perp BC$ 于点 $D$，$BC = 10$，$\\angle B = 55^{\\circ}$',
          questionText: '由“三线合一”与直角三角形两锐角互余，$BD$ 的长和 $\\angle BAD$ 的度数分别是多少？',
          input1Prefix: '$BD =$',
          input1Placeholder: '如 5',
          input2Prefix: '，$\\angle BAD =$',
          input2Placeholder: '如 35',
          input2Suffix: '°（只填数字）',
          expectedX: '5',
          expectedMin: '35',
          allowOrderSwap: false,
          correctFeedback: '$BD = 5$，$\\angle BAD = 35^{\\circ}$。',
          correctDetail: '由 $AB = AC$ 且 $AD \\perp BC$（三线合一），得 $BD = \\frac{1}{2}BC = 5$；在 $\\text{Rt}\\triangle ABD$ 中，$\\angle BAD = 90^{\\circ} - \\angle B = 90^{\\circ} - 55^{\\circ} = 35^{\\circ}$。',
          wrongFeedback: '请先由 $AD$ 平分底边 $BC$ 算出 $BD = \\frac{1}{2} \\times 10$，再在 $\\text{Rt}\\triangle ABD$ 中利用 $90^{\\circ} - 55^{\\circ}$ 算出 $\\angle BAD$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '10',
              hint: '注意 $D$ 是底边 $BC$ 的中点，$BD$ 是 $BC$ 的一半，即 $10 \\div 2 = 5$。'
            },
            {
              checkType: 'secondVal',
              val: '55',
              hint: '注意 $\\angle B = 55^{\\circ}$，在 $\\text{Rt}\\triangle ABD$ 中 $\\angle BAD$ 与 $\\angle B$ 互余，应为 $90^{\\circ} - 55^{\\circ} = 35^{\\circ}$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P05：根据数量关系列代数式
    // =========================================================================
    P05: {
      procedureId: 'P05',
      title: '根据数量关系列代数式',
      exampleTitle: '将 $3$ 千克单价 $m$ 元的甲糖与 $n$ 千克单价 $18$ 元的乙糖混合，求混合什锦糖的平均单价',
      exampleFormula: '甲糖：$3\\text{ kg} \\times m\\text{ 元/kg}$；乙糖：$n\\text{ kg} \\times 18\\text{ 元/kg}$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示混合问题核心公式与“先读先算”添括号准则）',
      practiceSectionTitle: '根据数量关系列代数式跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握运算先后顺序与整体加括号法则',

      steps: [
        {
          step: 1,
          name: '分别表示两种糖果的总价',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '由“总价 $=$ 单价 $\\times$ 数量”，甲糖总价为 $3m$ 元，乙糖总价为 $18n$ 元。'
        },
        {
          step: 2,
          name: '求出混合后的总金额与总质量',
          tStart: 6.0,
          tEnd: 12.2,
          explanation: '混合后什锦糖的总金额为 $(3m + 18n)$ 元，混合后的总质量为 $(n + 3)$ 千克。'
        },
        {
          step: 3,
          name: '确立平均单价数量关系',
          tStart: 12.2,
          tEnd: 18.2,
          explanation: '混合什锦糖的平均单价等于“混合总金额 $\\div$ 混合总质量”。'
        },
        {
          step: 4,
          name: '对先算的加法整体添括号相除',
          tStart: 18.2,
          tEnd: 24.2,
          explanation: '因为要先算加法求和、再算除法，必须给总金额与总质量分别加上括号：$(3m + 18n) \\div (n + 3)$。'
        },
        {
          step: 5,
          name: '按规范将除号写为分数线',
          tStart: 24.2,
          tEnd: 30.0,
          explanation: '调用代数式书写规范（P04），用分数线代替除号并省去分子分母外层括号，得 $\\frac{3m + 18n}{n + 3}$ 元/千克。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 梳理甲、乙两种糖果的单价与质量' },
        { time: 3.0, step: 1, label: '1.2 写出甲糖总价 $3m$ 元、乙糖总价 $18n$ 元' },
        { time: 7.5, step: 2, label: '2.1 求和得混合总金额 $(3m + 18n)$ 元' },
        { time: 10.0, step: 2, label: '2.2 求和得混合总质量 $(n + 3)$ 千克' },
        { time: 14.0, step: 3, label: '3.1 建立平均单价 $=$ 总金额 $\\div$ 总质量' },
        { time: 20.0, step: 4, label: '4.1 先加后除添括号：$(3m + 18n) \\div (n + 3)$' },
        { time: 26.5, step: 5, label: '5.1 化为规范分式 $\\frac{3m + 18n}{n + 3}$' }
      ],

      boardRows: [
        {
          rowId: 'p5_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p5_r0_a', math: '甲糖：$3$ 千克，单价 $m$ 元/千克；', appearAt: 0.0, dur: 0.01 },
            { id: 'p5_r0_b', math: '乙糖：$n$ 千克，单价 $18$ 元/千克', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p5_row_1',
          stepBadge: '第 1 步 · 单项总价',
          appearAt: 1.5,
          tokens: [
            { id: 'p5_r1_costA', math: '甲糖总价 $= 3m$（元），', appearAt: 1.6, dur: 0.40 },
            { id: 'p5_r1_costB', math: '乙糖总价 $= 18n$（元）', appearAt: 2.8, dur: 0.40 }
          ]
        },
        {
          rowId: 'p5_row_2',
          stepBadge: '第 2 步 · 混合总量',
          appearAt: 6.4,
          tokens: [
            { id: 'p5_r2_sumCost', math: '混合总金额 $= (3m + 18n)$ 元，', appearAt: 6.5, dur: 0.45 },
            { id: 'p5_r2_sumMass', math: '混合总质量 $= (n + 3)$ 千克', appearAt: 9.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p5_row_3',
          stepBadge: '第 3 步 · 数量关系',
          appearAt: 12.8,
          tokens: [
            { id: 'p5_r3_rel', math: '混合平均单价 $=$ 混合总金额 $\\div$ 混合总质量', appearAt: 12.9, dur: 0.50 }
          ]
        },
        {
          rowId: 'p5_row_4',
          stepBadge: '第 4 步 · 整体相除',
          appearAt: 18.8,
          tokens: [
            { id: 'p5_r4_eq', math: '$=$', appearAt: 18.9, dur: 0.25 },
            { id: 'p5_r4_num', math: '$(3m + 18n)$', appearAt: 19.3, dur: 0.45 },
            { id: 'p5_r4_div', math: '$\\div$', appearAt: 20.1, dur: 0.30 },
            { id: 'p5_r4_den', math: '$(n + 3)$', appearAt: 20.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p5_row_5',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p5_r5_conc', math: '$\\therefore$ 混合什锦糖的平均单价为 $\\frac{3m + 18n}{n + 3}$ 元/千克。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p5_sp_1',
          title: '草稿演算 · 基本商业数量关系',
          showStart: 0.8,
          showEnd: 12.0,
          tokens: [
            { id: 'p5_sp1_t1', math: '单项总价 $=$ 单价 $\\times$ 数量', appearAt: 1.2, dur: 0.40 },
            { id: 'p5_sp1_t2', math: '混合总金额 $=$ 甲糖总价 $+$ 乙糖总价', appearAt: 6.6, dur: 0.40 },
            { id: 'p5_sp1_t3', math: '混合总质量 $=$ 甲糖质量 $+$ 乙糖质量', appearAt: 9.2, dur: 0.40 }
          ],
          note: '切勿把平均单价直接算成 $(m + 18) \\div 2$，必须用总金额除以总质量'
        },
        {
          id: 'p5_sp_2',
          title: '草稿提示 · “先读先算”添括号原则',
          showStart: 12.5,
          showEnd: 29.8,
          tokens: [
            { id: 'p5_sp2_t1', math: '若不加括号：$3m + 18n \\div n + 3$（会先算 $18n \\div n$）', appearAt: 18.6, dur: 0.45 },
            { id: 'p5_sp2_t2', math: '改写分数线：分数线自带括号作用 $\\to \\frac{3m + 18n}{n + 3}$', appearAt: 24.8, dur: 0.45 }
          ],
          note: '当加减法的结果作为被除数或除数时，用分数线表示既规范又不会弄错运算顺序'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p5_r1_costA', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p5_r1_costB', tStart: 2.8, tEnd: 5.8, color: 'amber' },
        { tokenId: 'p5_r2_sumCost', tStart: 6.5, tEnd: 12.0, color: 'teal' },
        { tokenId: 'p5_r2_sumMass', tStart: 9.0, tEnd: 12.0, color: 'amber' },
        { tokenId: 'p5_r4_num', tStart: 19.3, tEnd: 24.0, color: 'teal' },
        { tokenId: 'p5_r4_den', tStart: 20.6, tEnd: 24.0, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p5_svg_s2_cost',
          type: 'arrow',
          fromToken: 'p5_r1_costA',
          toToken: 'p5_r2_sumCost',
          label: '两项总价相加',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 6.2,
          tDrawEnd: 7.1,
          tFadeStart: 11.2,
          tEnd: 11.8
        },
        {
          id: 'p5_svg_s4_div',
          type: 'under-brace',
          startToken: 'p5_r4_num',
          endToken: 'p5_r4_den',
          label: '除号改分数线 $\\frac{3m + 18n}{n + 3}$',
          color: '#0F766E',
          tStart: 21.5,
          tDrawEnd: 22.4,
          tFadeStart: 24.3,
          tEnd: 24.8
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '第一步提取单项总价：$3$ 千克单价 $m$ 元的甲糖总价为 $3m$ 元，$n$ 千克单价 $18$ 元的乙糖总价为 $18n$ 元。', focusToken: 'p5_r1_costB' },
        { tStart: 6.0, tEnd: 12.2, text: '第二步求混合总量：将两种糖果的总价相加得混合总金额 $(3m + 18n)$ 元，质量相加得混合总质量 $(n + 3)$ 千克。', focusToken: 'p5_r2_sumMass' },
        { tStart: 12.2, tEnd: 18.2, text: '第三步确立等量关系：混合什锦糖的平均单价等于“混合总金额 $\\div$ 混合总质量”。', focusToken: 'p5_r3_rel' },
        { tStart: 18.2, tEnd: 24.2, text: '第四步整体相除：因为要先算加法求和再相除，必须把 $(3m + 18n)$ 与 $(n + 3)$ 分别加上括号作为整体。', focusToken: 'p5_r4_den' },
        { tStart: 24.2, tEnd: 30.0, text: '第五步规范化为分式：用分数线代替除号，得到每千克什锦糖的平均单价为 $\\frac{3m + 18n}{n + 3}$ 元。', focusToken: 'p5_r5_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：辨析“先读先算”与括号位置',
          givenLabel: '文字叙述：',
          givenFormula: '“$a$ 与 $b$ 两数差的平方”与“$a, b$ 两数的平方差”',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '这两个文字叙述对应的正确代数式分别是？',
          options: [
            { key: 'A', text: 'A. $(a - b)^{2}$ 与 $a^{2} - b^{2}$', isCorrect: true },
            { key: 'B', text: 'B. $a^{2} - b^{2}$ 与 $(a - b)^{2}$', isCorrect: false },
            { key: 'C', text: 'C. $a - b^{2}$ 与 $a^{2} - b^{2}$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！按“先读先算”原则断句：',
            calcLines: [
              '“$a$ 与 $b$ 差的平方”：先算差 $(a - b)$，再整体平方 $\\to (a - b)^{2}$',
              '“$a, b$ 两数的平方差”：先分别算平方 $a^{2}, b^{2}$，再求差 $\\to a^{2} - b^{2}$'
            ],
            summary: '读题时抓住最后一个“的”字前面的运算作为内层整体即可准确判断括号。'
          },
          wrongTitle: '提示：请按“先读先算”原则断句',
          wrongFeedback: '“差的平方”是先求差再平方（需加括号），“平方差”是先平方再求差，请再试一次。'
        },
        practice2: {
          title: '练习二：阶梯计费问题列代数式并化简',
          givenLabel: '实际情境：',
          givenFormula: '租书前 $3$ 天共收基础费 $5$ 元，超过 $3$ 天的部分每天收 $2$ 元',
          questionText: '若租书 $x$ 天（$x \\gt 3$），总费用列出 $5 + 2(x - 3)$ 并化简为 $px - q$ 元后，$p$ 和 $q$ 分别是多少？',
          input1Prefix: '一次项系数 $p =$',
          input1Placeholder: '如 2',
          input2Prefix: '，常数项 $q =$',
          input2Placeholder: '如 1',
          input2Suffix: '（使化简结果为 px - q）',
          expectedX: '2',
          expectedMin: '1',
          allowOrderSwap: false,
          correctFeedback: '化简结果为 $(2x - 1)$ 元（即 $p = 2$，$q = 1$）。',
          correctDetail: '超过 $3$ 天的天数为 $(x - 3)$ 天，总费用为 $5 + 2(x - 3) = 5 + 2x - 6 = 2x - 1$。',
          wrongFeedback: '请展开 $5 + 2(x - 3) = 5 + 2x - 6$，合并常数项 $5 - 6 = -1$，对照 $px - q$ 填写。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '-1',
              hint: '式子已写为 $px - q$（带减号），由 $2x - 1$ 对照 $px - q$ 可知 $q = 1$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P06：从数字与图形规律中归纳代数式
    // =========================================================================
    P06: {
      procedureId: 'P06',
      title: '从数字与图形规律中归纳代数式',
      exampleTitle: '用棋子按规律摆图案：第 $1$ 个有 $2$ 颗，第 $2$ 个有 $5$ 颗，第 $3$ 个有 $8$ 颗，第 $4$ 个有 $11$ 颗，求第 $n$ 个图案的棋子数',
      exampleFormula: '$a_{1} = 2，a_{2} = 5，a_{3} = 8，a_{4} = 11 \\implies a_{n} = ?$',
      totalDuration: 31.0,
      scratchpadIdleHint: '旁白草稿演算区（配合上方动态棋子增量图，展示固定量与变化量的分离）',
      practiceSectionTitle: '数字与图形规律归纳跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握“首项 + 公差 × (n - 1)”规律归纳与回代验证',

      geometryDiagram: {
        title: '动态图形规律 · 棋子增量拆解',
        caption: '青绿圆点为固定首项 2 颗，琥珀圆点为每增加 1 个图案新增的 3 颗棋子',
        svgHtml: `
          <svg viewBox="0 0 260 155" class="w-full max-w-[260px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <!-- n=1 (2颗) -->
            <g>
              <text x="28" y="22" text-anchor="middle" fill="#334155" font-size="11" font-weight="700">n=1</text>
              <circle cx="20" cy="42" r="5.5" fill="#0F766E" />
              <circle cx="36" cy="42" r="5.5" fill="#0F766E" />
              <text x="28" y="142" text-anchor="middle" fill="#0F766E" font-size="11" font-weight="700">2</text>
            </g>
            <!-- n=2 (2+3=5颗) -->
            <g class="proc-geo-anim" data-appear-at="1.4" data-dur="0.5" style="opacity:0;">
              <text x="88" y="22" text-anchor="middle" fill="#334155" font-size="11" font-weight="700">n=2</text>
              <circle cx="80" cy="42" r="5.5" fill="#0F766E" />
              <circle cx="96" cy="42" r="5.5" fill="#0F766E" />
              <circle cx="72" cy="64" r="5.5" fill="#D97706" />
              <circle cx="88" cy="64" r="5.5" fill="#D97706" />
              <circle cx="104" cy="64" r="5.5" fill="#D97706" />
              <text x="88" y="142" text-anchor="middle" fill="#B45309" font-size="11" font-weight="700">2+3×1</text>
            </g>
            <!-- n=3 (2+3×2=8颗) -->
            <g class="proc-geo-anim" data-appear-at="2.2" data-dur="0.5" style="opacity:0;">
              <text x="154" y="22" text-anchor="middle" fill="#334155" font-size="11" font-weight="700">n=3</text>
              <circle cx="146" cy="42" r="5.5" fill="#0F766E" />
              <circle cx="162" cy="42" r="5.5" fill="#0F766E" />
              <circle cx="138" cy="64" r="5.5" fill="#D97706" />
              <circle cx="154" cy="64" r="5.5" fill="#D97706" />
              <circle cx="170" cy="64" r="5.5" fill="#D97706" />
              <circle cx="138" cy="86" r="5.5" fill="#D97706" />
              <circle cx="154" cy="86" r="5.5" fill="#D97706" />
              <circle cx="170" cy="86" r="5.5" fill="#D97706" />
              <text x="154" y="142" text-anchor="middle" fill="#B45309" font-size="11" font-weight="700">2+3×2</text>
            </g>
            <!-- n=4 (2+3×3=11颗) -->
            <g class="proc-geo-anim" data-appear-at="3.0" data-dur="0.5" style="opacity:0;">
              <text x="222" y="22" text-anchor="middle" fill="#334155" font-size="11" font-weight="700">n=4</text>
              <circle cx="214" cy="42" r="5.5" fill="#0F766E" />
              <circle cx="230" cy="42" r="5.5" fill="#0F766E" />
              <circle cx="206" cy="64" r="5.5" fill="#D97706" />
              <circle cx="222" cy="64" r="5.5" fill="#D97706" />
              <circle cx="238" cy="64" r="5.5" fill="#D97706" />
              <circle cx="206" cy="86" r="5.5" fill="#D97706" />
              <circle cx="222" cy="86" r="5.5" fill="#D97706" />
              <circle cx="238" cy="86" r="5.5" fill="#D97706" />
              <circle cx="206" cy="108" r="5.5" fill="#D97706" />
              <circle cx="222" cy="108" r="5.5" fill="#D97706" />
              <circle cx="238" cy="108" r="5.5" fill="#D97706" />
              <text x="222" y="142" text-anchor="middle" fill="#B45309" font-size="11" font-weight="700">2+3×3</text>
            </g>
          </svg>
        `
      },

      steps: [
        {
          step: 1,
          name: '列出前四项并求相邻增量',
          tStart: 0.0,
          tEnd: 6.2,
          explanation: '统计前 $4$ 个图案的棋子数分别为 $2, 5, 8, 11$，发现后一个图案总比前一个图案多 $3$ 颗（等差增量 $d = 3$）。'
        },
        {
          step: 2,
          name: '改写为“固定首项 + 增量倍数”',
          tStart: 6.2,
          tEnd: 13.0,
          explanation: '将前四项统一拆解为：$a_{1} = 2 + 3 \\times 0$，$a_{2} = 2 + 3 \\times 1$，$a_{3} = 2 + 3 \\times 2$，$a_{4} = 2 + 3 \\times 3$。'
        },
        {
          step: 3,
          name: '用 (n - 1) 替换变化倍数',
          tStart: 13.0,
          tEnd: 19.2,
          explanation: '观察发现第 $n$ 个图案中 $3$ 的倍数比序号 $n$ 少 $1$（即为 $n - 1$），写出第 $n$ 项表达式 $2 + 3(n - 1)$。'
        },
        {
          step: 4,
          name: '去括号合并化简通项式',
          tStart: 19.2,
          tEnd: 25.0,
          explanation: '利用乘法分配律展开 $2 + 3n - 3$，合并同类项化简为最简代数式 $(3n - 1)$。'
        },
        {
          step: 5,
          name: '代入 n = 1, 2 回代验证',
          tStart: 25.0,
          tEnd: 31.0,
          explanation: '将 $n = 1, 2, 4$ 代入 $3n - 1$ 检验：$3 \\times 1 - 1 = 2$，$3 \\times 4 - 1 = 11$，与已知完全吻合。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 列出前四项 $2, 5, 8, 11$' },
        { time: 3.5, step: 1, label: '1.2 计算相邻两项差值 $\\Delta = +3$' },
        { time: 8.5, step: 2, label: '2.1 拆解为 $2 + 3 \\times 0$ 至 $2 + 3 \\times 3$' },
        { time: 15.0, step: 3, label: '3.1 归纳第 $n$ 项为 $2 + 3(n - 1)$' },
        { time: 21.0, step: 4, label: '4.1 去括号化简得 $3n - 1$' },
        { time: 27.5, step: 5, label: '5.1 代入 $n = 1, 4$ 回代验算' }
      ],

      boardRows: [
        {
          rowId: 'p6_row_0',
          stepBadge: '前 4 项数据',
          appearAt: 0.0,
          tokens: [
            { id: 'p6_r0_1', math: '$n=1 \\to 2$；', appearAt: 0.0, dur: 0.01 },
            { id: 'p6_r0_2', math: '$n=2 \\to 5$；', appearAt: 1.4, dur: 0.35 },
            { id: 'p6_r0_3', math: '$n=3 \\to 8$；', appearAt: 2.2, dur: 0.35 },
            { id: 'p6_r0_4', math: '$n=4 \\to 11$', appearAt: 3.0, dur: 0.35 }
          ]
        },
        {
          rowId: 'p6_row_1',
          stepBadge: '第 1 步 · 找固定增量',
          appearAt: 3.8,
          tokens: [
            { id: 'p6_r1_diff', math: '相邻两项差值：$5 - 2 = 3$，$8 - 5 = 3$，$11 - 8 = 3$（每次固定增加 $3$ 颗）', appearAt: 3.9, dur: 0.45 }
          ]
        },
        {
          rowId: 'p6_row_2',
          stepBadge: '第 2 步 · 改写统一结构',
          appearAt: 6.6,
          tokens: [
            { id: 'p6_r2_1', math: '$a_{1} = 2 + 3 \\times 0$，', appearAt: 6.7, dur: 0.35 },
            { id: 'p6_r2_2', math: '$a_{2} = 2 + 3 \\times 1$，', appearAt: 7.8, dur: 0.35 },
            { id: 'p6_r2_3', math: '$a_{3} = 2 + 3 \\times 2$，', appearAt: 8.9, dur: 0.35 },
            { id: 'p6_r2_4', math: '$a_{4} = 2 + 3 \\times 3$', appearAt: 10.0, dur: 0.35 }
          ]
        },
        {
          rowId: 'p6_row_3',
          stepBadge: '第 3 步 · 归纳第 n 项',
          appearAt: 13.5,
          tokens: [
            { id: 'p6_r3_an', math: '第 $n$ 个图案：$a_{n} =$', appearAt: 13.6, dur: 0.35 },
            { id: 'p6_r3_fix', math: '$2$', appearAt: 14.3, dur: 0.35 },
            { id: 'p6_r3_var', math: '$+ 3(n - 1)$', appearAt: 15.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p6_row_4',
          stepBadge: '第 4 步 · 去括号化简',
          appearAt: 19.6,
          tokens: [
            { id: 'p6_r4_exp', math: '$= 2 + 3n - 3$', appearAt: 19.7, dur: 0.40 },
            { id: 'p6_r4_sim', math: '$= 3n - 1$', appearAt: 21.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p6_row_5',
          stepBadge: '第 5 步 · 回代验证',
          appearAt: 25.4,
          tokens: [
            { id: 'p6_r5_chk', math: '验证：当 $n=1$ 时 $3 \\times 1 - 1 = 2$ ✓；当 $n=4$ 时 $3 \\times 4 - 1 = 11$ ✓', appearAt: 25.5, dur: 0.50 }
          ]
        },
        {
          rowId: 'p6_row_6',
          stepBadge: '最终结论',
          appearAt: 28.4,
          isConclusion: true,
          tokens: [
            { id: 'p6_r6_conc', math: '$\\therefore$ 第 $n$ 个图案需要 $(3n - 1)$ 颗棋子。', appearAt: 28.5, dur: 0.55 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p6_sp_1',
          title: '草稿提示 · 为什么是 (n - 1) 而不是 n？',
          showStart: 13.2,
          showEnd: 24.8,
          tokens: [
            { id: 'p6_sp1_t1', math: '第 $1$ 个图案：首项 $2$，增加了 $0$ 次 $3$', appearAt: 13.6, dur: 0.40 },
            { id: 'p6_sp1_t2', math: '第 $2$ 个图案：首项 $2$，增加了 $1$ 次 $3$', appearAt: 14.5, dur: 0.40 },
            { id: 'p6_sp1_t3', math: '第 $n$ 个图案：首项 $2$，增加了 $(n - 1)$ 次 $3$', appearAt: 15.4, dur: 0.45 }
          ],
          note: '切勿盲目写成“首项 $+ 3n = 2 + 3n$”，否则当 $n = 1$ 时等于 $5$，与首项 $2$ 矛盾'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p6_r1_diff', tStart: 3.9, tEnd: 6.1, color: 'amber' },
        { tokenId: 'p6_r2_4', tStart: 10.0, tEnd: 12.8, color: 'amber' },
        { tokenId: 'p6_r3_fix', tStart: 14.3, tEnd: 19.0, color: 'teal' },
        { tokenId: 'p6_r3_var', tStart: 15.0, tEnd: 19.0, color: 'amber' },
        { tokenId: 'p6_r4_sim', tStart: 21.2, tEnd: 25.0, color: 'teal' },
        { tokenId: 'p6_r5_chk', tStart: 25.5, tEnd: 28.2, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p6_svg_s3',
          type: 'arrow',
          fromToken: 'p6_r2_4',
          toToken: 'p6_r3_var',
          label: '序号 $4 \\to$ 乘 $(4-1)$',
          color: '#D97706',
          curveOffset: 28,
          tStart: 13.8,
          tDrawEnd: 14.8,
          tFadeStart: 18.2,
          tEnd: 18.8
        },
        {
          id: 'p6_svg_s4',
          type: 'under-brace',
          startToken: 'p6_r4_exp',
          endToken: 'p6_r4_sim',
          label: '合并常数 $2 - 3 = -1$',
          color: '#0F766E',
          tStart: 20.5,
          tDrawEnd: 21.3,
          tFadeStart: 24.2,
          tEnd: 24.8
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.2, text: '第一步列出前四项并观察增量：前 $4$ 个图案棋子数为 $2, 5, 8, 11$，每往后一个图案都固定增加 $3$ 颗棋子。', focusToken: 'p6_r1_diff' },
        { tStart: 6.2, tEnd: 13.0, text: '第二步改写为统一结构：以第 $1$ 项的 $2$ 颗为固定基数，前四项依次写成 $2 + 3 \\times 0$、$2 + 3 \\times 1$、$2 + 3 \\times 2$、$2 + 3 \\times 3$。', focusToken: 'p6_r2_4' },
        { tStart: 13.0, tEnd: 19.2, text: '第三步分离固定量与变化量：第 $n$ 个图案比第 $1$ 个图案多增加了 $(n - 1)$ 次 $3$，所以表达式为 $2 + 3(n - 1)$。', focusToken: 'p6_r3_var' },
        { tStart: 19.2, tEnd: 25.0, text: '第四步去括号合并同类项：$2 + 3(n - 1) = 2 + 3n - 3 = 3n - 1$。', focusToken: 'p6_r4_sim' },
        { tStart: 25.0, tEnd: 31.0, text: '第五步回代验证：将 $n = 1$ 和 $n = 4$ 代入 $3n - 1$，分别得 $2$ 和 $11$，验证无误！', focusToken: 'p6_r6_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：用火柴棒摆正方形规律归纳',
          givenLabel: '已知规律：',
          givenFormula: '摆第 $1$ 个正方形用 $4$ 根，第 $2$ 个用 $7$ 根，第 $3$ 个用 $10$ 根',
          extractedLabel: '相邻增量：',
          extractedFormula: '每多摆 $1$ 个正方形，固定增加 $3$ 根火柴棒',
          questionText: '摆第 $n$ 个图形需要多少根火柴棒？',
          options: [
            { key: 'A', text: 'A. $4 + 3(n - 1) = 3n + 1$', isCorrect: true },
            { key: 'B', text: 'B. $4 + 3n$', isCorrect: false },
            { key: 'C', text: 'C. $4n$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！首项 4 加上 (n - 1) 个公差 3：',
            calcLines: [
              '$a_{n} = 4 + 3(n - 1) = 4 + 3n - 3 = 3n + 1$',
              '验证：当 $n = 1$ 时，$3 \\times 1 + 1 = 4$；当 $n = 2$ 时，$3 \\times 2 + 1 = 7$'
            ],
            summary: '等差型规律通项公式始终满足“公差 $\\times n + ($首项 $-$ 公差$)$”。'
          },
          wrongTitle: '提示：请将 n = 1 代入选项验证',
          wrongFeedback: '当 $n = 1$ 时结果应等于首项 $4$（若选 $4 + 3n$，当 $n = 1$ 时等于 $7 \\neq 4$），请再试一次。'
        },
        practice2: {
          title: '练习二：归纳等差数列通项并求第 10 项',
          givenLabel: '按规律排列的一列数：',
          givenFormula: '$5，9，13，17，\\dots$',
          questionText: '若第 $n$ 个数表示为 $4n + c$，则常数 $c$ 是多少？第 $10$ 个数是多少？',
          input1Prefix: '常数 $c =$',
          input1Placeholder: '如 1',
          input2Prefix: '，第 $10$ 个数 $=$',
          input2Placeholder: '如 41',
          input2Suffix: '',
          expectedX: '1',
          expectedMin: '41',
          allowOrderSwap: false,
          correctFeedback: '通项为 $4n + 1$（$c = 1$），第 $10$ 个数为 $41$。',
          correctDetail: '首项为 $5$，公差为 $4$，故 $a_{n} = 5 + 4(n - 1) = 4n + 1$（得 $c = 1$）；当 $n = 10$ 时，$4 \\times 10 + 1 = 41$。',
          wrongFeedback: '将 $n = 1$ 代入 $4n + c = 5$ 即可求出 $c$，再将 $n = 10$ 代入 $4n + c$ 求出第 $10$ 个数。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '5',
              hint: '注意首项是 $5$，当 $n = 1$ 时 $4 \\times 1 + c = 5$，所以 $c = 1$ 而不是 $5$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P07：判断与表示正、反比例关系
    // =========================================================================
    P07: {
      procedureId: 'P07',
      title: '判断与表示正、反比例关系',
      exampleTitle: '已知 $x$ 与 $y$ 成反比例关系，当 $x = 2.5$ 时 $y = 4$；求当 $y = \\frac{5}{8}$ 时对应 $x = m$ 的值',
      exampleFormula: '$x, y$ 成反比例：$(2.5, 4) \\to (m, \\frac{5}{8})$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步对比正比例“比值一定”与反比例“乘积一定”判定准则）',
      practiceSectionTitle: '正、反比例关系判定与求解跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握比值/乘积定值检验与利用定值 k 求未知量',

      steps: [
        {
          step: 1,
          name: '确立反比例“乘积一定”关系式',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '因为两个相关联的量 $x$ 和 $y$ 成反比例关系，所以它们的乘积为非零定值 $k$，即 $x \\cdot y = k$。'
        },
        {
          step: 2,
          name: '代入已知对应值求出定值 k',
          tStart: 6.0,
          tEnd: 12.2,
          explanation: '将已知的一组对应值 $x = 2.5，y = 4$ 代入 $x \\cdot y = k$，算出定值 $k = 2.5 \\times 4 = 10$。'
        },
        {
          step: 3,
          name: '写出完整的反比例乘积等式',
          tStart: 12.2,
          tEnd: 17.5,
          explanation: '将 $k = 10$ 回代，确定这两个变量在任意对应状态下都满足 $xy = 10$。'
        },
        {
          step: 4,
          name: '代入另一组条件列出关于 m 的方程',
          tStart: 17.5,
          tEnd: 23.5,
          explanation: '将 $x = m，y = \\frac{5}{8}$ 代入 $xy = 10$，得到方程 $\\frac{5}{8}m = 10$。'
        },
        {
          step: 5,
          name: '系数化为 1 解出未知数 m',
          tStart: 23.5,
          tEnd: 30.0,
          explanation: '方程两边同时乘以 $\\frac{8}{5}$（或除以 $\\frac{5}{8}$），解得 $m = 10 \\times \\frac{8}{5} = 16$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 由反比例关系建立 $x \\cdot y = k$' },
        { time: 7.5, step: 2, label: '2.1 代入 $x = 2.5, y = 4$ 算得 $k = 10$' },
        { time: 14.0, step: 3, label: '3.1 确立定值等式 $xy = 10$' },
        { time: 19.5, step: 4, label: '4.1 代入 $x = m, y = \\frac{5}{8}$ 得 $\\frac{5}{8}m = 10$' },
        { time: 26.0, step: 5, label: '5.1 计算 $m = 10 \\div \\frac{5}{8} = 16$' }
      ],

      boardRows: [
        {
          rowId: 'p7_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p7_r0_cond', math: '已知 $x, y$ 成反比例关系：', appearAt: 0.0, dur: 0.01 },
            { id: 'p7_r0_p1', math: '当 $x = 2.5$ 时 $y = 4$；', appearAt: 0.0, dur: 0.01 },
            { id: 'p7_r0_p2', math: '当 $y = \\frac{5}{8}$ 时 $x = m$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p7_row_1',
          stepBadge: '第 1 步 · 建立乘积关系',
          appearAt: 1.5,
          tokens: [
            { id: 'p7_r1_rel', math: '$\\because x$ 与 $y$ 成反比例关系 $\\implies x \\cdot y = k$（定值）', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p7_row_2',
          stepBadge: '第 2 步 · 求出定值 k',
          appearAt: 6.5,
          tokens: [
            { id: 'p7_r2_sub', math: '代入 $x = 2.5, y = 4$：', appearAt: 6.6, dur: 0.35 },
            { id: 'p7_r2_k', math: '$k = 2.5 \\times 4 = 10$', appearAt: 7.4, dur: 0.45 }
          ]
        },
        {
          rowId: 'p7_row_3',
          stepBadge: '第 3 步 · 确定关系式',
          appearAt: 12.6,
          tokens: [
            { id: 'p7_r3_eq', math: '$\\therefore$ 关系式为 $xy = 10$', appearAt: 12.7, dur: 0.45 }
          ]
        },
        {
          rowId: 'p7_row_4',
          stepBadge: '第 4 步 · 代入目标组',
          appearAt: 18.0,
          tokens: [
            { id: 'p7_r4_sub', math: '当 $x = m，y = \\frac{5}{8}$ 时：', appearAt: 18.1, dur: 0.35 },
            { id: 'p7_r4_eq', math: '$\\frac{5}{8}m = 10$', appearAt: 19.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p7_row_5',
          stepBadge: '最终结论',
          appearAt: 24.2,
          isConclusion: true,
          tokens: [
            { id: 'p7_r5_conc', math: '$\\therefore m = 10 \\div \\frac{5}{8} = 10 \\times \\frac{8}{5} = 16$。', appearAt: 24.3, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p7_sp_1',
          title: '核心对比 · 正比例 vs 反比例 vs 不成比例',
          showStart: 0.8,
          showEnd: 17.2,
          tokens: [
            { id: 'p7_sp1_t1', math: '① 比值一定 $\\frac{y}{x} = k \\implies$ 正比例', appearAt: 1.2, dur: 0.40 },
            { id: 'p7_sp1_t2', math: '② 乘积一定 $x \\cdot y = k \\implies$ 反比例', appearAt: 2.0, dur: 0.40 },
            { id: 'p7_sp1_t3', math: '③ 和差一定 $x + y = k$ 或含平方 $\\implies$ 不成比例', appearAt: 3.0, dur: 0.40 }
          ],
          note: '易错提醒：长方形周长一定时，“长 + 宽 = 周长的一半”（和一定），故不成反比例'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p7_r1_rel', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p7_r0_p1', tStart: 6.1, tEnd: 11.8, color: 'amber' },
        { tokenId: 'p7_r2_k', tStart: 7.4, tEnd: 12.0, color: 'teal' },
        { tokenId: 'p7_r3_eq', tStart: 12.7, tEnd: 17.3, color: 'teal' },
        { tokenId: 'p7_r0_p2', tStart: 17.6, tEnd: 23.2, color: 'amber' },
        { tokenId: 'p7_r4_eq', tStart: 19.0, tEnd: 23.8, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p7_svg_s2',
          type: 'arrow',
          fromToken: 'p7_r0_p1',
          toToken: 'p7_r2_k',
          label: '$2.5 \\times 4 = 10$',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 6.8,
          tDrawEnd: 7.6,
          tFadeStart: 11.4,
          tEnd: 12.0
        },
        {
          id: 'p7_svg_s4',
          type: 'arrow',
          fromToken: 'p7_r3_eq',
          toToken: 'p7_r4_eq',
          label: '代入 $xy = 10$',
          color: '#D97706',
          curveOffset: -26,
          tStart: 18.2,
          tDrawEnd: 19.0,
          tFadeStart: 22.8,
          tEnd: 23.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '第一步建立数量关系：已知 $x$ 与 $y$ 成反比例关系，因此它们的乘积恒等于非零定值 $k$，即 $x \\cdot y = k$。', focusToken: 'p7_r1_rel' },
        { tStart: 6.0, tEnd: 12.2, text: '第二步求出定值 $k$：将已知的一组对应值 $x = 2.5, y = 4$ 代入，算得 $k = 2.5 \\times 4 = 10$。', focusToken: 'p7_r2_k' },
        { tStart: 12.2, tEnd: 17.5, text: '第三步确定关系式：不论 $x, y$ 如何变化，只要在这组反比例关系中，始终满足 $xy = 10$。', focusToken: 'p7_r3_eq' },
        { tStart: 17.5, tEnd: 23.5, text: '第四步代入目标组：将 $x = m, y = \\frac{5}{8}$ 代入 $xy = 10$，得到方程 $\\frac{5}{8}m = 10$。', focusToken: 'p7_r4_eq' },
        { tStart: 23.5, tEnd: 30.0, text: '第五步解出未知数：两边同时除以 $\\frac{5}{8}$（即乘 $\\frac{8}{5}$），算出 $m = 16$。', focusToken: 'p7_r5_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：辨析正比例、反比例与不成比例',
          givenLabel: '给出三个常见情境：',
          givenFormula: '① 路程一定时的速度 $v$ 与时间 $t$；② 总页数一定时的已看页数与未看页数；③ 圆的面积 $S$ 与半径 $r$',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '其中两个变量成反比例关系的是哪一个？',
          options: [
            { key: 'A', text: 'A. 只有 ①（满足 $v \\cdot t = s$ 定值）', isCorrect: true },
            { key: 'B', text: 'B. ① 和 ②', isCorrect: false },
            { key: 'C', text: 'C. ③（$S = \\pi r^{2}$）', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！必须满足“乘积为定值”才是反比例关系：',
            calcLines: [
              '① $v \\cdot t = s$（乘积一定）$\\implies$ 成反比例关系 ✓',
              '② 已看 $+$ 未看 $=$ 总页数（和一定）$\\implies$ 不成比例',
              '③ $\\frac{S}{r} = \\pi r$（随 $r$ 变化，非定值）$\\implies$ $S$ 与 $r$ 不成正/反比例'
            ],
            summary: '判断比例关系时，务必先写出等量关系式再看是“乘积一定”还是“比值一定”。'
          },
          wrongTitle: '提示：请区分“乘积一定”与“和一定”',
          wrongFeedback: '已看页数与未看页数之和一定（不是乘积一定），圆面积与半径平方成正比但与半径不成比例，请再试一次。'
        },
        practice2: {
          title: '练习二：利用反比例定值求未知量',
          givenLabel: '已知条件：',
          givenFormula: '变量 $x$ 与 $y$ 成反比例关系，且当 $x = 6$ 时，$y = -4$',
          questionText: '它们的乘积定值 $k$ 是多少？当 $x = -8$ 时，对应的 $y$ 值是多少？',
          input1Prefix: '定值 $k =$',
          input1Placeholder: '如 -24',
          input2Prefix: '，当 $x = -8$ 时 $y =$',
          input2Placeholder: '如 3',
          input2Suffix: '',
          expectedX: '-24',
          expectedMin: '3',
          allowOrderSwap: false,
          correctFeedback: '定值 $k = -24$，当 $x = -8$ 时 $y = 3$。',
          correctDetail: '由 $k = xy = 6 \\times (-4) = -24$ 得 $xy = -24$；当 $x = -8$ 时，$-8y = -24 \\implies y = 3$。',
          wrongFeedback: '先由 $k = 6 \\times (-4)$ 算出定值 $k$（注意负号），再由 $(-8) \\times y = k$ 算出 $y$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '24',
              hint: '注意 $6 \\times (-4)$ 异号相乘得负数，$k$ 应当等于 $-24$。'
            },
            {
              checkType: 'secondVal',
              val: '-3',
              hint: '注意 $(-24) \\div (-8)$ 同号相除得正数，$y$ 应当等于 $3$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P08：代入字母数值求代数式的值
    // =========================================================================
    P08: {
      procedureId: 'P08',
      title: '代入字母数值求代数式的值',
      exampleTitle: '已知 $|x - 2| + (y + 3)^{2} = 0$，求代数式 $x^{2} - 2xy + y^{2}$ 的值',
      exampleFormula: '$|x - 2| + (y + 3)^{2} = 0 \\implies x^{2} - 2xy + y^{2} = ?$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示“0+0=0”非负性模型与负数代入加括号准则）',
      practiceSectionTitle: '代入字母数值求代数式的值跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握非负性求字母值与负数加括号乘方',

      steps: [
        {
          step: 1,
          name: '由非负性求出字母 x, y 的值',
          tStart: 0.0,
          tEnd: 6.5,
          explanation: '因为 $|x - 2| \\ge 0$ 且 $(y + 3)^{2} \\ge 0$，两个非负数之和为 $0$，则每一项必为 $0$，解得 $x = 2，y = -3$。'
        },
        {
          step: 2,
          name: '写出“当……时”准备代入',
          tStart: 6.5,
          tEnd: 11.5,
          explanation: '规范写出“当 $x = 2，y = -3$ 时”，准备将字母替换为对应数值。'
        },
        {
          step: 3,
          name: '恢复乘号并为负数加括号代入',
          tStart: 11.5,
          tEnd: 18.2,
          explanation: '将 $x = 2，y = -3$ 代入原式：省略的乘号恢复为“$\\times$”，负数 $-3$ 参与乘法和乘方时必须加上括号！'
        },
        {
          step: 4,
          name: '先算乘方，再算乘法',
          tStart: 18.2,
          tEnd: 24.5,
          explanation: '按有理数混合运算顺序：先算乘方 $2^{2} = 4$、$(-3)^{2} = 9$，再算中间乘法 $-2 \\times 2 \\times (-3) = +12$。'
        },
        {
          step: 5,
          name: '最后算加减得出结果',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '将各项计算结果相加：$4 + 12 + 9 = 25$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 识别绝对值与偶次方非负性' },
        { time: 3.5, step: 1, label: '1.2 令 $x - 2 = 0, y + 3 = 0$ 得 $x = 2, y = -3$' },
        { time: 8.0, step: 2, label: '2.1 对号入座准备替换字母' },
        { time: 14.0, step: 3, label: '3.1 恢复乘号并为 $-3$ 加上括号' },
        { time: 20.5, step: 4, label: '4.1 先算乘方 $4, 9$ 与乘法 $+12$' },
        { time: 26.5, step: 5, label: '5.1 相加得出最终结果 $25$' }
      ],

      boardRows: [
        {
          rowId: 'p8_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p8_r0_cond', math: '已知 $|x - 2| + (y + 3)^{2} = 0$，', appearAt: 0.0, dur: 0.01 },
            { id: 'p8_r0_target', math: '求 $x^{2} - 2xy + y^{2}$ 的值', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p8_row_1',
          stepBadge: '第 1 步 · 非负性求值',
          appearAt: 1.5,
          tokens: [
            { id: 'p8_r1_nonneg', math: '$\\because |x - 2| \\ge 0，(y + 3)^{2} \\ge 0$', appearAt: 1.6, dur: 0.40 },
            { id: 'p8_r1_zero', math: '$\\implies x - 2 = 0，y + 3 = 0$', appearAt: 2.8, dur: 0.40 },
            { id: 'p8_r1_xy', math: '$\\implies x = 2，y = -3$', appearAt: 4.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p8_row_2',
          stepBadge: '第 2 & 3 步 · 加括号代入',
          appearAt: 7.2,
          tokens: [
            { id: 'p8_r2_when', math: '当 $x = 2，y = -3$ 时，原式 $=$', appearAt: 7.3, dur: 0.45 },
            { id: 'p8_r2_t1', math: '$2^{2}$', appearAt: 12.0, dur: 0.40 },
            { id: 'p8_r2_t2', math: '$- 2 \\times 2 \\times (-3)$', appearAt: 13.2, dur: 0.50 },
            { id: 'p8_r2_t3', math: '$+ (-3)^{2}$', appearAt: 14.8, dur: 0.50 }
          ]
        },
        {
          rowId: 'p8_row_3',
          stepBadge: '第 4 步 · 先乘方再乘除',
          appearAt: 18.8,
          tokens: [
            { id: 'p8_r3_eq', math: '$=$', appearAt: 18.9, dur: 0.25 },
            { id: 'p8_r3_4', math: '$4$', appearAt: 19.3, dur: 0.35 },
            { id: 'p8_r3_12', math: '$+ 12$', appearAt: 20.4, dur: 0.45 },
            { id: 'p8_r3_9', math: '$+ 9$', appearAt: 21.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p8_row_4',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p8_r4_conc', math: '$= 25$。$\\quad\\therefore$ 代数式的值为 $25$。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p8_sp_1',
          title: '草稿演算 · “0 + 0 = 0”非负性模型',
          showStart: 0.8,
          showEnd: 6.4,
          tokens: [
            { id: 'p8_sp1_t1', math: '若 $|A| + B^{2} = 0$', appearAt: 1.2, dur: 0.40 },
            { id: 'p8_sp1_t2', math: '则必有 $A = 0$ 且 $B = 0$', appearAt: 2.2, dur: 0.40 }
          ],
          note: '初中阶段三大非负数：绝对值 $|A| \\ge 0$、偶次方 $B^{2} \\ge 0$、算术平方根 $\\sqrt{C} \\ge 0$'
        },
        {
          id: 'p8_sp_2',
          title: '草稿警示 · 负数乘方必须加括号！',
          showStart: 11.6,
          showEnd: 24.4,
          tokens: [
            { id: 'p8_sp2_t1', math: '正确：当 $y = -3$ 时，$y^{2} = (-3)^{2} = +9$', appearAt: 12.2, dur: 0.45 },
            { id: 'p8_sp2_t2', math: '错误：漏括号写成 $-3^{2} = -9$（变成了 $3^{2}$ 的相反数）', appearAt: 15.6, dur: 0.45 }
          ],
          note: '同理，恢复乘号时 $-2xy = -2 \\times 2 \\times (-3) = +12$（负负得正）'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p8_r1_xy', tStart: 4.0, tEnd: 6.4, color: 'teal' },
        { tokenId: 'p8_r2_t2', tStart: 13.2, tEnd: 18.0, color: 'amber' },
        { tokenId: 'p8_r2_t3', tStart: 14.8, tEnd: 18.0, color: 'rose' },
        { tokenId: 'p8_r3_12', tStart: 20.4, tEnd: 24.2, color: 'amber' },
        { tokenId: 'p8_r3_9', tStart: 21.6, tEnd: 24.2, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p8_svg_s3',
          type: 'arrow',
          fromToken: 'p8_r1_xy',
          toToken: 'p8_r2_t3',
          label: '负数 $-3$ 加括号代入',
          color: '#D97706',
          curveOffset: 30,
          tStart: 13.8,
          tDrawEnd: 14.8,
          tFadeStart: 17.2,
          tEnd: 17.8
        },
        {
          id: 'p8_svg_s4',
          type: 'under-brace',
          startToken: 'p8_r2_t2',
          endToken: 'p8_r2_t3',
          label: '负负得正：$+12 + 9$',
          color: '#0F766E',
          tStart: 19.8,
          tDrawEnd: 20.6,
          tFadeStart: 23.6,
          tEnd: 24.2
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.5, text: '第一步利用非负性求字母值：绝对值 $|x - 2|$ 与平方项 $(y + 3)^{2}$ 都大于或等于 $0$，和为 $0$ 说明两者都等于 $0$，解得 $x = 2，y = -3$。', focusToken: 'p8_r1_xy' },
        { tStart: 6.5, tEnd: 11.5, text: '第二步准备代入：先写出“当 $x = 2，y = -3$ 时”，对号入座替换代数式中的字母。', focusToken: 'p8_r2_when' },
        { tStart: 11.5, tEnd: 18.2, text: '第三步恢复乘号并加括号：把 $-2xy$ 写成 $-2 \\times 2 \\times (-3)$，把 $y^{2}$ 写成 $(-3)^{2}$。负数代入乘方千万不能漏掉括号！', focusToken: 'p8_r2_t3' },
        { tStart: 18.2, tEnd: 24.5, text: '第四步先算乘方再算乘除：$2^{2} = 4$，$-2 \\times 2 \\times (-3) = +12$，$(-3)^{2} = +9$。', focusToken: 'p8_r3_9' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步相加得出结果：$4 + 12 + 9 = 25$。求解完成！', focusToken: 'p8_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：判断负数与分数代入的规范写法',
          givenLabel: '已知条件：',
          givenFormula: '当 $a = -2，b = \\frac{1}{3}$ 时，代入代数式 $a^{2} - 3b^{2}$',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '下列代入后的算式中，书写完全正确的是哪一项？',
          options: [
            { key: 'A', text: 'A. $(-2)^{2} - 3 \\times \\left(\\frac{1}{3}\\right)^{2}$', isCorrect: true },
            { key: 'B', text: 'B. $-2^{2} - 3 \\times \\frac{1}{3}^{2}$', isCorrect: false },
            { key: 'C', text: 'C. $(-2)^{2} - 3\\frac{1}{3}^{2}$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！负数与分数参与乘方时都必须加括号，且恢复乘号：',
            calcLines: [
              '$(-2)^{2} = 4，\\quad \\left(\\frac{1}{3}\\right)^{2} = \\frac{1}{9}$',
              '原式 $= 4 - 3 \\times \\frac{1}{9} = 4 - \\frac{1}{3} = \\frac{11}{3}$'
            ],
            summary: '牢记“一恢复（乘号）、二添括（负数与分数乘方）”可避免绝大多数代入错误。'
          },
          wrongTitle: '提示：请检查负数、分数乘方的括号与乘号',
          wrongFeedback: '负数 $-2$ 和分数 $\\frac{1}{3}$ 平方时都必须加括号，且 $3$ 与 $\\left(\\frac{1}{3}\\right)^{2}$ 之间要恢复乘号 $\\times$，请再试一次。'
        },
        practice2: {
          title: '练习二：由非负性求字母值并代入计算',
          givenLabel: '给出非负性等式：',
          givenFormula: '$|a + 1| + (b - 4)^{2} = 0$',
          questionText: '先求出 $a$ 的值，再代入求代数式 $a^{2} + 2b$ 的值分别是多少？',
          input1Prefix: '$a =$',
          input1Placeholder: '如 -1',
          input2Prefix: '，$a^{2} + 2b =$',
          input2Placeholder: '如 9',
          input2Suffix: '',
          expectedX: '-1',
          expectedMin: '9',
          allowOrderSwap: false,
          correctFeedback: '$a = -1$，$a^{2} + 2b = 9$。',
          correctDetail: '由 $a + 1 = 0，b - 4 = 0$ 得 $a = -1，b = 4$；代入得 $(-1)^{2} + 2 \\times 4 = 1 + 8 = 9$。',
          wrongFeedback: '先由 $a + 1 = 0$ 解出 $a = -1$，由 $b - 4 = 0$ 解出 $b = 4$，再计算 $(-1)^{2} + 2 \\times 4$。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '7',
              hint: '注意 $a = -1$ 时，$a^{2} = (-1)^{2} = +1$ 而不是 $-1$，故 $1 + 8 = 9$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P09：利用整体代入法求代数式的值
    // =========================================================================
    P09: {
      procedureId: 'P09',
      title: '利用整体代入法求代数式的值',
      exampleTitle: '已知 $x - 2y = 3$，求代数式 $12 - 2x + 4y$ 的值',
      exampleFormula: '已知整体：$x - 2y = 3 \\implies 12 - 2x + 4y = ?$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示系数倍数观察与提取负因数添括号变号法则）',
      practiceSectionTitle: '整体代入法求代数式的值跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握提取公因数构造已知整体与整体替换',

      steps: [
        {
          step: 1,
          name: '锁定已知的“核心整体”数值',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '从已知条件中提炼出字母组合整体 $x - 2y = 3$（无需单独求出 $x, y$ 各自的值）。'
        },
        {
          step: 2,
          name: '观察目标式与已知整体的系数倍数',
          tStart: 5.8,
          tEnd: 12.0,
          explanation: '对比目标式中的含字母项 $-2x + 4y$ 与已知整体 $x - 2y$：系数 $-2$ 与 $1$、$+4$ 与 $-2$ 恰好成 $-2$ 倍关系。'
        },
        {
          step: 3,
          name: '提取公因数 -2 添括号构造整体',
          tStart: 12.0,
          tEnd: 18.8,
          explanation: '对 $-2x + 4y$ 提取公因数 $-2$，注意括号内各项都要变号，变形为 $12 - 2(x - 2y)$。'
        },
        {
          step: 4,
          name: '将核心整体替换为常数 3',
          tStart: 18.8,
          tEnd: 24.5,
          explanation: '把括号内的整体 $(x - 2y)$ 直接替换为已知数值 $3$，原式化为 $12 - 2 \\times 3$。'
        },
        {
          step: 5,
          name: '执行有理数运算得出最终结果',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '先算乘法 $2 \\times 3 = 6$，再算减法 $12 - 6 = 6$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 锁定已知整体 $x - 2y = 3$' },
        { time: 7.5, step: 2, label: '2.1 发现 $-2x + 4y$ 是 $(x - 2y)$ 的 $-2$ 倍' },
        { time: 14.2, step: 3, label: '3.1 提取 $-2$ 添括号得 $12 - 2(x - 2y)$' },
        { time: 20.5, step: 4, label: '4.1 将 $(x - 2y)$ 整体替换为 $3$' },
        { time: 26.5, step: 5, label: '5.1 计算 $12 - 2 \\times 3 = 6$' }
      ],

      boardRows: [
        {
          rowId: 'p9_row_0',
          stepBadge: '已知与目标',
          appearAt: 0.0,
          tokens: [
            { id: 'p9_r0_known', math: '已知：$x - 2y = 3$；', appearAt: 0.0, dur: 0.01 },
            { id: 'p9_r0_target', math: '求：$12 - 2x + 4y$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p9_row_1',
          stepBadge: '第 1 & 2 步 · 对比系数',
          appearAt: 6.2,
          tokens: [
            { id: 'p9_r1_ start', math: '原式 $= 12$', appearAt: 6.3, dur: 0.35 },
            { id: 'p9_r1_vars', math: '$- 2x + 4y$', appearAt: 6.9, dur: 0.45 }
          ]
        },
        {
          rowId: 'p9_row_2',
          stepBadge: '第 3 步 · 提取 -2 构造整体',
          appearAt: 12.6,
          tokens: [
            { id: 'p9_r2_12', math: '$= 12$', appearAt: 12.7, dur: 0.30 },
            { id: 'p9_r2_m2', math: '$- 2$', appearAt: 13.2, dur: 0.35 },
            { id: 'p9_r2_grp', math: '$(x - 2y)$', appearAt: 13.8, dur: 0.50 }
          ]
        },
        {
          rowId: 'p9_row_3',
          stepBadge: '第 4 步 · 整体代入数值',
          appearAt: 19.2,
          tokens: [
            { id: 'p9_r3_12', math: '$= 12 - 2 \\times$', appearAt: 19.3, dur: 0.35 },
            { id: 'p9_r3_val', math: '$3$', appearAt: 19.9, dur: 0.45 }
          ]
        },
        {
          rowId: 'p9_row_4',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p9_r4_conc', math: '$= 12 - 6 = 6$。$\\quad\\therefore 12 - 2x + 4y$ 的值为 $6$。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p9_sp_1',
          title: '草稿演算 · 提取负因数添括号法则',
          showStart: 6.0,
          showEnd: 18.6,
          tokens: [
            { id: 'p9_sp1_t1', math: '目标含字母项：$-2x + 4y$', appearAt: 6.6, dur: 0.40 },
            { id: 'p9_sp1_t2', math: '提取 $-2$：$(-2x) \\div (-2) = x$，$(+4y) \\div (-2) = -2y$', appearAt: 12.8, dur: 0.45 },
            { id: 'p9_sp1_t3', math: '$\\implies -2(x - 2y)$（注意括号内是 $-2y$ 而非 $+2y$）', appearAt: 14.5, dur: 0.45 }
          ],
          note: '检验方法：把 $-2(x - 2y)$ 重新去括号展开得 $-2x + 4y$，与原式一致'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p9_r0_known', tStart: 0.8, tEnd: 5.7, color: 'teal' },
        { tokenId: 'p9_r1_vars', tStart: 6.9, tEnd: 12.2, color: 'amber' },
        { tokenId: 'p9_r2_m2', tStart: 13.2, tEnd: 18.5, color: 'amber' },
        { tokenId: 'p9_r2_grp', tStart: 13.8, tEnd: 18.5, color: 'teal' },
        { tokenId: 'p9_r3_val', tStart: 19.9, tEnd: 24.4, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p9_svg_s3',
          type: 'under-brace',
          startToken: 'p9_r1_vars',
          endToken: 'p9_r1_vars',
          label: '提取 $-2$ 得 $-2(x - 2y)$',
          color: '#D97706',
          tStart: 8.5,
          tDrawEnd: 9.4,
          tFadeStart: 11.8,
          tEnd: 12.4
        },
        {
          id: 'p9_svg_s4',
          type: 'arrow',
          fromToken: 'p9_r0_known',
          toToken: 'p9_r3_val',
          label: '整体替换 $x - 2y = 3$',
          color: '#0F766E',
          curveOffset: 34,
          tStart: 19.0,
          tDrawEnd: 19.8,
          tFadeStart: 23.6,
          tEnd: 24.2
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步锁定核心整体：已知条件给出 $x - 2y = 3$，只有一个方程含两个未知数，我们把 $(x - 2y)$ 看作一个整体。', focusToken: 'p9_r0_known' },
        { tStart: 5.8, tEnd: 12.0, text: '第二步观察系数倍数：目标式中的 $-2x + 4y$ 与已知整体 $x - 2y$ 对比，系数恰好是已知整体的 $-2$ 倍。', focusToken: 'p9_r1_vars' },
        { tStart: 12.0, tEnd: 18.8, text: '第三步提取公因数构造整体：对 $-2x + 4y$ 提取公因数 $-2$，注意 $+4y$ 除以 $-2$ 变为 $-2y$，得到 $12 - 2(x - 2y)$。', focusToken: 'p9_r2_grp' },
        { tStart: 18.8, tEnd: 24.5, text: '第四步整体代入：把括号里的 $(x - 2y)$ 直接替换为常数 $3$，得到 $12 - 2 \\times 3$。', focusToken: 'p9_r3_val' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步计算结果：$12 - 6 = 6$。无需解出单个字母即可快速求值！', focusToken: 'p9_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：提取公因数构造已知整体',
          givenLabel: '已知条件：',
          givenFormula: '$a^{2} + 2a = 1$',
          extractedLabel: '目标代数式：',
          extractedFormula: '$3a^{2} + 6a - 5$',
          questionText: '将目标代数式变形构造出 $(a^{2} + 2a)$ 整体，正确的变形是？',
          options: [
            { key: 'A', text: 'A. $3(a^{2} + 2a) - 5$', isCorrect: true },
            { key: 'B', text: 'B. $3(a^{2} + 6a) - 5$', isCorrect: false },
            { key: 'C', text: 'C. $3(a^{2} + 2a - 5)$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！前两项提取公因数 3 即可构造已知整体：',
            calcLines: [
              '$3a^{2} + 6a - 5 = 3(a^{2} + 2a) - 5$',
              '将 $a^{2} + 2a = 1$ 整体代入：$3 \\times 1 - 5 = -2$'
            ],
            summary: '提取公因数时只对含字母的目标项提取，常数项 $-5$ 留在括号外。'
          },
          wrongTitle: '提示：请检查前两项与已知整体的倍数关系',
          wrongFeedback: '$3a^{2} + 6a$ 提取 $3$ 后括号内应为 $(a^{2} + 2a)$，且常数项 $-5$ 不在括号内，请再试一次。'
        },
        practice2: {
          title: '练习二：用整体代入法求值',
          givenLabel: '已知条件：',
          givenFormula: '$2m - n = 4$',
          questionText: '将目标代数式 $10 - 6m + 3n$ 变形为 $10 - k(2m - n)$ 后，系数 $k$ 和最终求得的值分别是多少？',
          input1Prefix: '提取系数 $k =$',
          input1Placeholder: '如 3',
          input2Prefix: '，代数式的值 $=$',
          input2Placeholder: '如 -2',
          input2Suffix: '',
          expectedX: '3',
          expectedMin: '-2',
          allowOrderSwap: false,
          correctFeedback: '变形为 $10 - 3(2m - n)$（$k = 3$），代入得 $10 - 3 \\times 4 = -2$。',
          correctDetail: '因为 $-6m + 3n = -3(2m - n)$，所以 $k = 3$；将 $2m - n = 4$ 代入得 $10 - 3 \\times 4 = 10 - 12 = -2$。',
          wrongFeedback: '观察 $-6m + 3n = -3(2m - n)$ 可得 $k = 3$，再计算 $10 - 3 \\times 4$。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '2',
              hint: '注意是 $10 - 12 = -2$（小减大为负数），请检查结果的负号。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P11：识别反比例函数与由定义求参数
    // =========================================================================
    P11: {
      procedureId: 'P11',
      title: '识别反比例函数与由定义求参数',
      exampleTitle: '已知函数 $y = (m - 2)x^{3 - m^{2}}$ 是 $y$ 关于 $x$ 的反比例函数，求参数 $m$ 的值',
      exampleFormula: '$y = (m - 2)x^{3 - m^{2}} \\iff y = kx^{-1}\\ (k \\neq 0)$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示反比例函数三种标准形式与“指数=-1 且 系数≠0”双重条件）',
      practiceSectionTitle: '反比例函数定义与求参跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握三种标准形式辨析与含参双条件舍增根',

      steps: [
        {
          step: 1,
          name: '对照负指数标准形式 $y = kx^{-1}$',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '将 $y = (m - 2)x^{3 - m^{2}}$ 对照反比例函数负整数指数幂标准形式 $y = kx^{-1}\\ (k \\neq 0)$，识别出比例系数为 $(m - 2)$，自变量 $x$ 的指数为 $(3 - m^{2})$。'
        },
        {
          step: 2,
          name: '列出指数等于 -1 与系数不为 0 双条件',
          tStart: 6.0,
          tEnd: 12.2,
          explanation: '根据反比例函数定义，必须同时满足两个条件：① 自变量 $x$ 的次数等于 $-1$（即 $3 - m^{2} = -1$）；② 比例系数不等于 $0$（即 $m - 2 \\neq 0$）。'
        },
        {
          step: 3,
          name: '由指数方程解出 m 的候选值',
          tStart: 12.2,
          tEnd: 18.2,
          explanation: '解方程 $3 - m^{2} = -1$，移项得 $m^{2} = 4$，开平方得 $m_{1} = 2$ 或 $m_{2} = -2$。'
        },
        {
          step: 4,
          name: '检验比例系数 k ≠ 0 排除增根',
          tStart: 18.2,
          tEnd: 24.5,
          explanation: '由比例系数限制条件 $m - 2 \\neq 0$ 可知 $m \\neq 2$，因此必须将使系数为 $0$ 的 $m = 2$ 舍去！'
        },
        {
          step: 5,
          name: '确定参数最终值并验证解析式',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '保留唯一定解 $m = -2$（此时函数为 $y = -4x^{-1} = -\\frac{4}{x}$，完全符合反比例函数定义）。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 对照负指数形式 $y = kx^{-1}$' },
        { time: 7.5, step: 2, label: '2.1 建立 $3 - m^{2} = -1$ 且 $m - 2 \\neq 0$' },
        { time: 14.0, step: 3, label: '3.1 解 $m^{2} = 4$ 得 $m = \\pm 2$' },
        { time: 20.0, step: 4, label: '4.1 由 $m - 2 \\neq 0$ 舍去 $m = 2$' },
        { time: 26.5, step: 5, label: '5.1 定解 $m = -2$' }
      ],

      boardRows: [
        {
          rowId: 'p11_row_0',
          stepBadge: '已知函数',
          appearAt: 0.0,
          tokens: [
            { id: 'p11_r0_y', math: '$y =$', appearAt: 0.0, dur: 0.01 },
            { id: 'p11_r0_coef', math: '$(m - 2)$', appearAt: 0.0, dur: 0.01 },
            { id: 'p11_r0_exp', math: '$x^{3 - m^{2}}$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p11_row_1',
          stepBadge: '第 1 步 · 对照标准式',
          appearAt: 1.5,
          tokens: [
            { id: 'p11_r1_std', math: '对照 $y = kx^{-1}\\ (k \\neq 0)$：', appearAt: 1.6, dur: 0.40 },
            { id: 'p11_r1_part', math: '比例系数 $k = m - 2$，指数 $= 3 - m^{2}$', appearAt: 2.3, dur: 0.45 }
          ]
        },
        {
          rowId: 'p11_row_2',
          stepBadge: '第 2 步 · 列双重条件',
          appearAt: 6.4,
          tokens: [
            { id: 'p11_r2_c1', math: '① 指数条件：$3 - m^{2} = -1$；', appearAt: 6.5, dur: 0.45 },
            { id: 'p11_r2_c2', math: '② 系数条件：$m - 2 \\neq 0$', appearAt: 8.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p11_row_3',
          stepBadge: '第 3 步 · 解指数方程',
          appearAt: 12.6,
          tokens: [
            { id: 'p11_r3_s1', math: '由 ① 得 $m^{2} = 4$', appearAt: 12.7, dur: 0.40 },
            { id: 'p11_r3_s2', math: '$\\implies m = 2$ 或 $m = -2$', appearAt: 14.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p11_row_4',
          stepBadge: '第 4 步 · 检验舍增根',
          appearAt: 18.6,
          tokens: [
            { id: 'p11_r4_chk', math: '由 ② 得 $m \\neq 2$', appearAt: 18.7, dur: 0.40 },
            { id: 'p11_r4_drop', math: '$\\implies$ 舍去 $m = 2$', appearAt: 20.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p11_row_5',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p11_r5_conc', math: '$\\therefore$ 参数 $m$ 的值为 $-2$（此时 $y = -\\frac{4}{x}$）。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p11_sp_1',
          title: '草稿提示 · 反比例函数的三种等价标准形式',
          showStart: 0.8,
          showEnd: 12.0,
          tokens: [
            { id: 'p11_sp1_t1', math: '① 分式形式：$y = \\frac{k}{x}\\ (k \\neq 0)$', appearAt: 1.2, dur: 0.40 },
            { id: 'p11_sp1_t2', math: '② 乘积形式：$xy = k\\ (k \\neq 0)$', appearAt: 2.0, dur: 0.40 },
            { id: 'p11_sp1_t3', math: '③ 负指数形式：$y = kx^{-1}\\ (k \\neq 0)$', appearAt: 2.8, dur: 0.40 }
          ],
          note: '无论哪种形式，比例系数 $k \\neq 0$ 都是必不可少的隐含前提'
        },
        {
          id: 'p11_sp_2',
          title: '草稿警示 · 为什么必须舍去 m = 2？',
          showStart: 18.2,
          showEnd: 29.8,
          tokens: [
            { id: 'p11_sp2_t1', math: '若 $m = 2$，则系数 $m - 2 = 0$', appearAt: 18.8, dur: 0.40 },
            { id: 'p11_sp2_t2', math: '此时 $y = 0 \\cdot x^{-1} = 0$（变成了常函数，不再是反比例函数）', appearAt: 20.2, dur: 0.45 }
          ],
          note: '含参反比例函数求值题 90% 的易错点都是忘记检验系数 $k \\neq 0$'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p11_r0_coef', tStart: 1.2, tEnd: 5.8, color: 'amber' },
        { tokenId: 'p11_r0_exp', tStart: 1.2, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p11_r2_c1', tStart: 6.5, tEnd: 12.0, color: 'teal' },
        { tokenId: 'p11_r2_c2', tStart: 8.5, tEnd: 12.0, color: 'amber' },
        { tokenId: 'p11_r3_s2', tStart: 14.2, tEnd: 18.0, color: 'teal' },
        { tokenId: 'p11_r4_drop', tStart: 20.0, tEnd: 24.4, color: 'rose' }
      ],

      svgAnnotations: [
        {
          id: 'p11_svg_s2',
          type: 'arrow',
          fromToken: 'p11_r0_exp',
          toToken: 'p11_r2_c1',
          label: '令 $x$ 的次数等于 $-1$',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 6.2,
          tDrawEnd: 7.0,
          tFadeStart: 11.4,
          tEnd: 12.0
        },
        {
          id: 'p11_svg_s4',
          type: 'arrow',
          fromToken: 'p11_r2_c2',
          toToken: 'p11_r4_drop',
          label: '系数不为 $0$ 排除 $m=2$',
          color: '#D97706',
          curveOffset: 32,
          tStart: 18.8,
          tDrawEnd: 19.8,
          tFadeStart: 23.6,
          tEnd: 24.2
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '第一步对照标准形式：将 $y = (m - 2)x^{3 - m^{2}}$ 对照负指数形式 $y = kx^{-1}$，比例系数为 $(m - 2)$，$x$ 的指数为 $3 - m^{2}$。', focusToken: 'p11_r1_part' },
        { tStart: 6.0, tEnd: 12.2, text: '第二步列出双重条件：反比例函数要求 $x$ 的指数等于 $-1$，同时比例系数 $m - 2$ 绝不能等于 $0$！', focusToken: 'p11_r2_c2' },
        { tStart: 12.2, tEnd: 18.2, text: '第三步解指数方程：由 $3 - m^{2} = -1$ 得 $m^{2} = 4$，开平方解得 $m = 2$ 或 $m = -2$。', focusToken: 'p11_r3_s2' },
        { tStart: 18.2, tEnd: 24.5, text: '第四步检验比例系数：由 $m - 2 \\neq 0$ 知 $m \\neq 2$，必须把使系数为 $0$ 的增根 $m = 2$ 舍去。', focusToken: 'p11_r4_drop' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步锁定最终答案：参数 $m$ 的值为 $-2$。', focusToken: 'p11_r5_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：识别反比例函数与提取比例系数 k',
          givenLabel: '给出四个函数关系式：',
          givenFormula: '① $y = -\\frac{5}{3x}$；② $y = \\frac{2}{x + 1}$；③ $y = \\frac{8}{x} - 1$；④ $y = \\frac{x}{3}$',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '其中属于 $y$ 关于 $x$ 的反比例函数的是哪一个？其比例系数 $k$ 是多少？',
          options: [
            { key: 'A', text: 'A. ① $y = -\\frac{5}{3x}$，比例系数 $k = -\\frac{5}{3}$', isCorrect: true },
            { key: 'B', text: 'B. ① $y = -\\frac{5}{3x}$，比例系数 $k = -5$', isCorrect: false },
            { key: 'C', text: 'C. ② 与 ③ 都是反比例函数', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！注意分母含常数倍数时的比例系数提取：',
            calcLines: [
              '$y = -\\frac{5}{3x} = \\frac{-\\frac{5}{3}}{x} \\implies$ 是反比例函数，且 $k = -\\frac{5}{3}$',
              '② 分母是 $x + 1$，③ 外层有 $-1$，④ 是正比例函数（$k = \\frac{1}{3}$）'
            ],
            summary: '形如 $y = \\frac{a}{bx}$ 的反比例函数，比例系数是 $\\frac{a}{b}$ 而不是 $a$。'
          },
          wrongTitle: '提示：请将解析式变形为 y = k/x 的标准形式',
          wrongFeedback: '在 $y = -\\frac{5}{3x}$ 中，分母的 $3$ 属于系数的一部分，即 $y = \\frac{-5/3}{x}$，请再试一次。'
        },
        practice2: {
          title: '练习二：利用反比例函数定义求参数',
          givenLabel: '已知条件：',
          givenFormula: '函数 $y = (m + 3)x^{m^{2} - 10}$ 是反比例函数',
          questionText: '令指数 $m^{2} - 10 = -1$ 时，$m^{2}$ 等于多少？排除使系数为 $0$ 的值后，$m$ 最终等于多少？',
          input1Prefix: '$m^{2} =$',
          input1Placeholder: '如 9',
          input2Prefix: '，最终定解 $m =$',
          input2Placeholder: '如 3',
          input2Suffix: '',
          expectedX: '9',
          expectedMin: '3',
          allowOrderSwap: false,
          correctFeedback: '$m^{2} = 9$，排除 $m = -3$ 后最终定解 $m = 3$。',
          correctDetail: '由 $m^{2} - 10 = -1$ 得 $m^{2} = 9 \\implies m = \\pm 3$；又因比例系数 $m + 3 \\neq 0 \\implies m \\neq -3$，故 $m = 3$。',
          wrongFeedback: '先由 $m^{2} - 10 = -1$ 算出 $m^{2} = 9$（得 $m = \\pm 3$），再由 $m + 3 \\neq 0$ 舍去 $-3$。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '-3',
              hint: '若 $m = -3$，则比例系数 $m + 3 = 0$，函数不再是反比例函数，必须舍去 $-3$ 取 $m = 3$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P12：用待定系数法求反比例函数解析式
    // =========================================================================
    P12: {
      procedureId: 'P12',
      title: '用待定系数法求反比例函数解析式',
      exampleTitle: '已知反比例函数图象经过点 $A(-2, 5)$，求其解析式，并求图象上点 $P(4, n)$ 的纵坐标 $n$',
      exampleFormula: '过点 $A(-2, 5) \\implies y = \\frac{k}{x} \\implies P(4, n)$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示双曲线上任意一点横纵坐标乘积恒等于 k 的核心性质）',
      practiceSectionTitle: '待定系数法求反比例函数解析式跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握 k = xy 快速求解析式与判点求坐标',

      steps: [
        {
          step: 1,
          name: '设反比例函数标准解析式',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '设反比例函数的解析式为 $y = \\frac{k}{x}\\ (k \\neq 0)$，图象上任意一点的坐标都满足乘积关系 $x \\cdot y = k$。'
        },
        {
          step: 2,
          name: '代入已知点坐标求出比例系数 k',
          tStart: 5.8,
          tEnd: 12.0,
          explanation: '将双曲线上已知点 $A(-2, 5)$ 的横、纵坐标相乘，算得 $k = (-2) \\times 5 = -10$（注意负号）。'
        },
        {
          step: 3,
          name: '回代 k 写出完整函数解析式',
          tStart: 12.0,
          tEnd: 17.8,
          explanation: '将 $k = -10$ 代回所设解析式，得到反比例函数解析式为 $y = -\\frac{10}{x}$。'
        },
        {
          step: 4,
          name: '将待求点 P(4, n) 代入解析式',
          tStart: 17.8,
          tEnd: 23.8,
          explanation: '因为点 $P(4, n)$ 也在这个反比例函数图象上，将 $x = 4, y = n$ 代入得 $n = -\\frac{10}{4}$（或 $4n = -10$）。'
        },
        {
          step: 5,
          name: '约分化简求出未知坐标 n',
          tStart: 23.8,
          tEnd: 30.0,
          explanation: '约分化简得 $n = -\\frac{5}{2}$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 设解析式 $y = \\frac{k}{x}\\ (k \\neq 0)$' },
        { time: 7.5, step: 2, label: '2.1 代入 $A(-2, 5)$ 算得 $k = (-2) \\times 5 = -10$' },
        { time: 14.0, step: 3, label: '3.1 写出解析式 $y = -\\frac{10}{x}$' },
        { time: 19.5, step: 4, label: '4.1 代入 $P(4, n)$ 得 $n = -\\frac{10}{4}$' },
        { time: 26.0, step: 5, label: '5.1 化简得出 $n = -\\frac{5}{2}$' }
      ],

      boardRows: [
        {
          rowId: 'p12_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p12_r0_a', math: '双曲线过点 $A(-2, 5)$，', appearAt: 0.0, dur: 0.01 },
            { id: 'p12_r0_p', math: '求解析式及图象上点 $P(4, n)$ 的纵坐标 $n$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p12_row_1',
          stepBadge: '第 1 步 · 设解析式',
          appearAt: 1.5,
          tokens: [
            { id: 'p12_r1_set', math: '设反比例函数解析式为 $y = \\frac{k}{x}\\ (k \\neq 0)$，即 $xy = k$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p12_row_2',
          stepBadge: '第 2 步 · 坐标相乘求 k',
          appearAt: 6.2,
          tokens: [
            { id: 'p12_r2_sub', math: '把 $A(-2, 5)$ 代入：', appearAt: 6.3, dur: 0.35 },
            { id: 'p12_r2_k', math: '$k = (-2) \\times 5 = -10$', appearAt: 7.1, dur: 0.45 }
          ]
        },
        {
          rowId: 'p12_row_3',
          stepBadge: '第 3 步 · 写出解析式',
          appearAt: 12.4,
          tokens: [
            { id: 'p12_r3_func', math: '$\\therefore$ 反比例函数解析式为 $y = -\\frac{10}{x}$', appearAt: 12.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p12_row_4',
          stepBadge: '第 4 步 · 代入求坐标',
          appearAt: 18.2,
          tokens: [
            { id: 'p12_r4_sub', math: '把 $P(4, n)$ 代入 $y = -\\frac{10}{x}$：', appearAt: 18.3, dur: 0.35 },
            { id: 'p12_r4_eq', math: '$n = -\\frac{10}{4} = -\\frac{5}{2}$', appearAt: 19.2, dur: 0.50 }
          ]
        },
        {
          rowId: 'p12_row_5',
          stepBadge: '最终结论',
          appearAt: 24.4,
          isConclusion: true,
          tokens: [
            { id: 'p12_r5_conc', math: '$\\therefore$ 解析式为 $y = -\\frac{10}{x}$，点 $P$ 的纵坐标 $n = -\\frac{5}{2}$。', appearAt: 24.5, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p12_sp_1',
          title: '草稿秒杀技巧 · 横纵坐标之积恒等于 k',
          showStart: 5.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p12_sp1_t1', math: '同一双曲线上任意两点 $(x_{1}, y_{1}), (x_{2}, y_{2})$：', appearAt: 6.4, dur: 0.40 },
            { id: 'p12_sp1_t2', math: '恒有 $x_{1}y_{1} = x_{2}y_{2} = k$', appearAt: 7.4, dur: 0.45 },
            { id: 'p12_sp1_t3', math: '本题：$(-2) \\times 5 = 4 \\times n = -10 \\implies n = -\\frac{5}{2}$', appearAt: 18.6, dur: 0.45 }
          ],
          note: '判断一个点是否在反比例函数图象上，只需看它的横、纵坐标乘积是否等于 $k$'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p12_r0_a', tStart: 5.8, tEnd: 11.8, color: 'amber' },
        { tokenId: 'p12_r2_k', tStart: 7.1, tEnd: 11.8, color: 'teal' },
        { tokenId: 'p12_r3_func', tStart: 12.5, tEnd: 17.6, color: 'teal' },
        { tokenId: 'p12_r4_eq', tStart: 19.2, tEnd: 24.2, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p12_svg_s2',
          type: 'arrow',
          fromToken: 'p12_r0_a',
          toToken: 'p12_r2_k',
          label: '横纵坐标相乘 $k = x_{0}y_{0}$',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 6.4,
          tDrawEnd: 7.2,
          tFadeStart: 11.2,
          tEnd: 11.8
        },
        {
          id: 'p12_svg_s4',
          type: 'arrow',
          fromToken: 'p12_r3_func',
          toToken: 'p12_r4_eq',
          label: '代入 $x = 4$',
          color: '#D97706',
          curveOffset: 28,
          tStart: 18.4,
          tDrawEnd: 19.2,
          tFadeStart: 23.2,
          tEnd: 23.8
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步设出标准解析式：设反比例函数为 $y = \\frac{k}{x}\\ (k \\neq 0)$，图象上点的横纵坐标乘积满足 $xy = k$。', focusToken: 'p12_r1_set' },
        { tStart: 5.8, tEnd: 12.0, text: '第二步求比例系数 $k$：把已知点 $A(-2, 5)$ 的横纵坐标直接相乘，得 $k = (-2) \\times 5 = -10$。', focusToken: 'p12_r2_k' },
        { tStart: 12.0, tEnd: 17.8, text: '第三步写出解析式：将 $k = -10$ 回代，得到反比例函数解析式为 $y = -\\frac{10}{x}$。', focusToken: 'p12_r3_func' },
        { tStart: 17.8, tEnd: 23.8, text: '第四步代入待求点：把点 $P(4, n)$ 的横坐标 $x = 4$ 代入解析式，得 $n = -\\frac{10}{4}$。', focusToken: 'p12_r4_eq' },
        { tStart: 23.8, tEnd: 30.0, text: '第五步化简结果：约分得 $n = -\\frac{5}{2}$。', focusToken: 'p12_r5_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：检验哪个点在反比例函数图象上',
          givenLabel: '已知反比例函数：',
          givenFormula: '$y = -\\frac{6}{x}$（即图象上点的坐标满足 $xy = -6$）',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '下列四个点中，哪一个点在该反比例函数的图象上？',
          options: [
            { key: 'A', text: 'A. $(2, -3)$', isCorrect: true },
            { key: 'B', text: 'B. $(1, 6)$', isCorrect: false },
            { key: 'C', text: 'C. $(-2, -3)$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！只需检验横、纵坐标之积是否等于 -6：',
            calcLines: [
              'A. $2 \\times (-3) = -6 = k \\implies$ 在图象上 ✓',
              'B. $1 \\times 6 = 6 \\neq -6$；C. $(-2) \\times (-3) = 6 \\neq -6$'
            ],
            summary: '利用 $xy = k$ 口算横纵坐标乘积是判点最快且最稳的方法。'
          },
          wrongTitle: '提示：请计算各点横坐标与纵坐标的乘积',
          wrongFeedback: '只有横、纵坐标相乘等于 $-6$ 的点才在 $y = -\\frac{6}{x}$ 的图象上，注意正负号，请再试一次。'
        },
        practice2: {
          title: '练习二：由已知点求 k 与未知点坐标',
          givenLabel: '已知条件：',
          givenFormula: '反比例函数 $y = \\frac{k}{x}$ 的图象经过点 $(3, -4)$，且经过点 $(-2, m)$',
          questionText: '比例系数 $k$ 的值是多少？点 $(-2, m)$ 中的纵坐标 $m$ 是多少？',
          input1Prefix: '$k =$',
          input1Placeholder: '如 -12',
          input2Prefix: '，$m =$',
          input2Placeholder: '如 6',
          input2Suffix: '',
          expectedX: '-12',
          expectedMin: '6',
          allowOrderSwap: false,
          correctFeedback: '$k = -12$，$m = 6$。',
          correctDetail: '由 $k = 3 \\times (-4) = -12$；又因 $(-2) \\times m = -12$，解得 $m = 6$。',
          wrongFeedback: '先算 $k = 3 \\times (-4)$，再由 $(-2) \\times m = k$ 解出 $m$。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '-6',
              hint: '注意 $(-12) \\div (-2)$ 同号相除得正数，所以 $m = 6$ 而不是 $-6$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P13：由比例系数 k 判断反比例函数象限与增减性
    // =========================================================================
    P13: {
      procedureId: 'P13',
      title: '由比例系数 $k$ 判断反比例函数象限与增减性',
      exampleTitle: '已知反比例函数 $y = \\frac{4 - k}{x}$ 的图象位于第二、四象限，求 $k$ 的取值范围及各象限内的增减性',
      exampleFormula: '$y = \\frac{4 - k}{x}$ 位于二、四象限 $\\iff 4 - k \\lt 0$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（配合上方双曲线象限动态图，展示 k 的正负与象限、单调性的充要对应）',
      practiceSectionTitle: '反比例函数象限与增减性判定跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握比例系数正负与象限、各象限内单调性的双向互推',

      geometryDiagram: {
        title: '动态函数图象 · 双曲线象限与增减性',
        caption: '比例系数 < 0 时双曲线位于第二、四象限，在每个象限内 y 随 x 增大而增大（向右上方上升）',
        svgHtml: `
          <svg viewBox="0 0 260 175" class="w-full max-w-[260px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <!-- 坐标轴 -->
            <line x1="20" y1="88" x2="240" y2="88" stroke="#64748B" stroke-width="1.5" />
            <line x1="130" y1="12" x2="130" y2="164" stroke="#64748B" stroke-width="1.5" />
            <polygon points="240,88 233,84 233,92" fill="#64748B" />
            <polygon points="130,12 126,19 134,19" fill="#64748B" />
            <text x="234" y="102" fill="#475569" font-size="11" font-weight="700">x</text>
            <text x="137" y="20" fill="#475569" font-size="11" font-weight="700">y</text>
            <text x="118" y="101" fill="#64748B" font-size="10">O</text>

            <!-- 象限标签 -->
            <text x="185" y="32" fill="#94A3B8" font-size="10" font-weight="600">第一象限</text>
            <text x="42" y="32" fill="#0F766E" font-size="10" font-weight="700">第二象限</text>
            <text x="42" y="156" fill="#94A3B8" font-size="10" font-weight="600">第三象限</text>
            <text x="185" y="156" fill="#0F766E" font-size="10" font-weight="700">第四象限</text>

            <!-- 第二象限分支 (x < 0, y > 0, 随 x 增大而增大) -->
            <path class="proc-geo-anim" data-appear-at="6.2" data-dur="0.8" data-dash-len="150"
                  d="M 35 76 Q 95 72 118 18" fill="none" stroke="#0F766E" stroke-width="2.8" stroke-linecap="round"
                  stroke-dasharray="150" stroke-dashoffset="150" style="opacity:0;" />
            <!-- 第四象限分支 (x > 0, y < 0, 随 x 增大而增大) -->
            <path class="proc-geo-anim" data-appear-at="6.8" data-dur="0.8" data-dash-len="150"
                  d="M 142 158 Q 165 104 225 100" fill="none" stroke="#0F766E" stroke-width="2.8" stroke-linecap="round"
                  stroke-dasharray="150" stroke-dashoffset="150" style="opacity:0;" />

            <!-- 单调递增趋势指示箭头 -->
            <g class="proc-geo-anim" data-appear-at="13.0" data-dur="0.5" style="opacity:0;">
              <text x="64" y="54" fill="#D97706" font-size="10" font-weight="700">y随x增大而增大 ↗</text>
              <text x="156" y="132" fill="#D97706" font-size="10" font-weight="700">y随x增大而增大 ↗</text>
            </g>
          </svg>
        `
      },

      steps: [
        {
          step: 1,
          name: '提取分子上的含参比例系数',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '将函数 $y = \\frac{4 - k}{x}$ 对照标准形式 $y = \\frac{A}{x}$，完整提取分子上的比例系数整体 $A = 4 - k$。'
        },
        {
          step: 2,
          name: '由所在象限建立比例系数不等式',
          tStart: 5.8,
          tEnd: 12.2,
          explanation: '因为双曲线位于第二、第四象限，根据符号法则可知比例系数必小于 $0$，列出不等式 $4 - k \\lt 0$。'
        },
        {
          step: 3,
          name: '判定各象限内的增减性',
          tStart: 12.2,
          tEnd: 18.2,
          explanation: '当比例系数小于 $0$ 时，在每一个象限内（第二象限或第四象限内），函数值 $y$ 随自变量 $x$ 的增大而增大。'
        },
        {
          step: 4,
          name: '解一元一次不等式求参数范围',
          tStart: 18.2,
          tEnd: 24.5,
          explanation: '解不等式 $4 - k \\lt 0$：移项得 $-k \\lt -4$，两边同除以 $-1$（注意乘除负数不等号方向改变），得 $k \\gt 4$。'
        },
        {
          step: 5,
          name: '汇总参数范围与单调性结论',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '得出最终结论：参数 $k$ 的取值范围为 $k \\gt 4$，且在每个象限内 $y$ 随 $x$ 的增大而增大。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 提取分子比例系数 $4 - k$' },
        { time: 7.5, step: 2, label: '2.1 由二、四象限列不等式 $4 - k \\lt 0$' },
        { time: 14.0, step: 3, label: '3.1 判定每象限内 $y$ 随 $x$ 增大而增大' },
        { time: 20.0, step: 4, label: '4.1 移项变号解得 $k \\gt 4$' },
        { time: 26.5, step: 5, label: '5.1 汇总结论 $k \\gt 4$' }
      ],

      boardRows: [
        {
          rowId: 'p13_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p13_r0_func', math: '反比例函数 $y = \\frac{4 - k}{x}$', appearAt: 0.0, dur: 0.01 },
            { id: 'p13_r0_quad', math: '的图象位于第二、四象限', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p13_row_1',
          stepBadge: '第 1 步 · 提取比例系数',
          appearAt: 1.5,
          tokens: [
            { id: 'p13_r1_ext', math: '对照 $y = \\frac{A}{x}$：分子上的比例系数为 $A = 4 - k$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p13_row_2',
          stepBadge: '第 2 步 · 象限对应符号',
          appearAt: 6.2,
          tokens: [
            { id: 'p13_r2_quad', math: '$\\because$ 图象位于第二、四象限', appearAt: 6.3, dur: 0.40 },
            { id: 'p13_r2_ineq', math: '$\\implies 4 - k \\lt 0$', appearAt: 7.4, dur: 0.45 }
          ]
        },
        {
          rowId: 'p13_row_3',
          stepBadge: '第 3 步 · 判定增减性',
          appearAt: 12.6,
          tokens: [
            { id: 'p13_r3_mono', math: '且在每一个象限内，$y$ 随 $x$ 的增大而增大', appearAt: 12.7, dur: 0.45 }
          ]
        },
        {
          rowId: 'p13_row_4',
          stepBadge: '第 4 步 · 解不等式求参',
          appearAt: 18.6,
          tokens: [
            { id: 'p13_r4_s1', math: '由 $4 - k \\lt 0 \\implies -k \\lt -4$', appearAt: 18.7, dur: 0.40 },
            { id: 'p13_r4_s2', math: '$\\implies k \\gt 4$（除以 $-1$ 不等号反向）', appearAt: 20.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p13_row_5',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p13_r5_conc', math: '$\\therefore k \\gt 4$，且在每个象限内 $y$ 随 $x$ 的增大而增大。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p13_sp_1',
          title: '核心法则 · 比例系数正负 ⇔ 象限与单调性',
          showStart: 5.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p13_sp1_t1', math: '当系数 $\\gt 0 \\iff$ 一、三象限，每象限内 $y$ 随 $x$ 增大而减小', appearAt: 6.4, dur: 0.45 },
            { id: 'p13_sp1_t2', math: '当系数 $\\lt 0 \\iff$ 二、四象限，每象限内 $y$ 随 $x$ 增大而增大', appearAt: 7.8, dur: 0.45 }
          ],
          note: '必须强调“在每一个象限内”，不能说在整个定义域上单调递增或递减'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p13_r1_ext', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p13_r2_ineq', tStart: 7.4, tEnd: 12.0, color: 'amber' },
        { tokenId: 'p13_r3_mono', tStart: 12.7, tEnd: 18.0, color: 'teal' },
        { tokenId: 'p13_r4_s2', tStart: 20.2, tEnd: 24.4, color: 'rose' }
      ],

      svgAnnotations: [
        {
          id: 'p13_svg_s2',
          type: 'arrow',
          fromToken: 'p13_r0_quad',
          toToken: 'p13_r2_ineq',
          label: '二、四象限 $\\implies$ 系数 $\\lt 0$',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 6.6,
          tDrawEnd: 7.4,
          tFadeStart: 11.4,
          tEnd: 12.0
        },
        {
          id: 'p13_svg_s4',
          type: 'arrow',
          fromToken: 'p13_r4_s1',
          toToken: 'p13_r4_s2',
          label: '同除以 $-1$ 变号',
          color: '#D97706',
          curveOffset: -26,
          tStart: 19.3,
          tDrawEnd: 20.1,
          tFadeStart: 23.6,
          tEnd: 24.2
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步提取比例系数：在 $y = \\frac{4 - k}{x}$ 中，分子上的含参式 $(4 - k)$ 就是比例系数整体。', focusToken: 'p13_r1_ext' },
        { tStart: 5.8, tEnd: 12.2, text: '第二步由象限列不等式：已知双曲线位于第二、第四象限，说明比例系数小于 $0$，即 $4 - k \\lt 0$。', focusToken: 'p13_r2_ineq' },
        { tStart: 12.2, tEnd: 18.2, text: '第三步判定单调性：观察右侧动态图象，在第二、第四象限的每一支上，曲线都向右上方上升，即 $y$ 随 $x$ 的增大而增大。', focusToken: 'p13_r3_mono' },
        { tStart: 18.2, tEnd: 24.5, text: '第四步解不等式：由 $4 - k \\lt 0$ 移项得 $-k \\lt -4$，两边同除以 $-1$ 时不等号反向，解得 $k \\gt 4$。', focusToken: 'p13_r4_s2' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步得出结论：$k \\gt 4$，且在每个象限内 $y$ 随 $x$ 的增大而增大。', focusToken: 'p13_r5_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：含偶次方比例系数的象限与增减性判定',
          givenLabel: '已知反比例函数：',
          givenFormula: '$y = \\frac{m^{2} + 1}{x}$（其中 $m$ 为任意实数）',
          extractedLabel: '分子非负性分析：',
          extractedFormula: '因为 $m^{2} \\ge 0$，所以比例系数 $m^{2} + 1 \\ge 1 \\gt 0$',
          questionText: '关于该函数图象的性质，下列说法正确的是？',
          options: [
            { key: 'A', text: 'A. 位于第一、三象限，且在每个象限内 $y$ 随 $x$ 的增大而减小。', isCorrect: true },
            { key: 'B', text: 'B. 位于第一、三象限，且在整个定义域上 $y$ 随 $x$ 的增大而减小。', isCorrect: false },
            { key: 'C', text: 'C. 位于第二、四象限，且在每个象限内 $y$ 随 $x$ 的增大而增大。', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！比例系数恒正，且单调性必须限定在“每个象限内”：',
            calcLines: [
              '$m^{2} + 1 \\gt 0 \\implies$ 图象必在第一、第三象限',
              '在每一个象限内，$y$ 随 $x$ 的增大而减小'
            ],
            summary: '反比例函数的两支在原点处断开，绝不能遗漏“在每一个象限内”这一前提。'
          },
          wrongTitle: '提示：请留意比例系数正负与“在每个象限内”的前提',
          wrongFeedback: '$m^{2} + 1 \\gt 0$ 对应第一、三象限，且必须在“每一个象限内”单调递减（跨象限不满足递减），请再试一次。'
        },
        practice2: {
          title: '练习二：由增减性逆向求参数范围',
          givenLabel: '已知条件：',
          givenFormula: '反比例函数 $y = \\frac{2m - 6}{x}$ 在每一个象限内，$y$ 随 $x$ 的增大而减小',
          questionText: '由此可知 $2m - 6 \\gt 0$，解得 $m \\gt a$。若从 $\\{1, 2, 3, 5\\}$ 中选一个符合条件的 $m$，则临界值 $a$ 与所选的 $m$ 分别是多少？',
          input1Prefix: '临界值 $a =$',
          input1Placeholder: '如 3',
          input2Prefix: '，符合条件的 $m =$',
          input2Placeholder: '如 5',
          input2Suffix: '',
          expectedX: '3',
          expectedMin: '5',
          allowOrderSwap: false,
          correctFeedback: '由 $2m - 6 \\gt 0$ 得 $m \\gt 3$（$a = 3$），在候选集中只有 $m = 5$ 符合条件。',
          correctDetail: '在每个象限内 $y$ 随 $x$ 增大而减小 $\\implies 2m - 6 \\gt 0 \\implies 2m \\gt 6 \\implies m \\gt 3$，故选 $m = 5$。',
          wrongFeedback: '解不等式 $2m - 6 \\gt 0$ 得 $m \\gt 3$，因此在 $\\{1, 2, 3, 5\\}$ 中只有大于 $3$ 的数符合要求。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '3',
              hint: '注意当 $m = 3$ 时，$2m - 6 = 0$，必须严格大于 $3$，所以只能选 $5$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P14：利用反比例函数增减性与象限分布比较函数值大小
    // =========================================================================
    P14: {
      procedureId: 'P14',
      title: '利用反比例函数增减性与象限分布比较函数值大小',
      exampleTitle: '已知点 $A(-10, y_{1})$、$B(1, y_{2})$、$C(5, y_{3})$ 都在反比例函数 $y = -\\frac{3}{x}$ 的图象上，比较 $y_{1}, y_{2}, y_{3}$ 的大小',
      exampleFormula: '$y = -\\frac{3}{x}：A(-10, y_{1})，B(1, y_{2})，C(5, y_{3})$',
      totalDuration: 31.0,
      scratchpadIdleHint: '旁白草稿演算区（配合上方双曲线三点分布图，展示“先跨象限判正负、再同象限比单调”法则）',
      practiceSectionTitle: '反比例函数值大小比较跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握跨象限比正负与同象限用单调性（或代入法）排序',

      geometryDiagram: {
        title: '动态函数图象 · 双曲线三点分布图',
        caption: '点 A 在第二象限（y₁ > 0），点 B、C 同在第四象限（y₂ < y₃ < 0）',
        svgHtml: `
          <svg viewBox="0 0 260 175" class="w-full max-w-[260px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <!-- 坐标轴 -->
            <line x1="20" y1="88" x2="240" y2="88" stroke="#64748B" stroke-width="1.5" />
            <line x1="130" y1="12" x2="130" y2="164" stroke="#64748B" stroke-width="1.5" />
            <text x="234" y="102" fill="#475569" font-size="11" font-weight="700">x</text>
            <text x="137" y="20" fill="#475569" font-size="11" font-weight="700">y</text>
            <text x="118" y="101" fill="#64748B" font-size="10">O</text>

            <!-- 双曲线 y = -3/x (二、四象限) -->
            <path d="M 30 78 Q 95 72 118 18" fill="none" stroke="#94A3B8" stroke-width="2" />
            <path d="M 142 158 Q 165 104 225 98" fill="none" stroke="#94A3B8" stroke-width="2" />

            <!-- Step 2：点 A(-10, y1) 在第二象限 (y1 > 0) -->
            <g class="proc-geo-anim" data-appear-at="6.5" data-dur="0.5" style="opacity:0;">
              <circle cx="48" cy="74" r="4" fill="#0F766E" />
              <line x1="48" y1="74" x2="48" y2="88" stroke="#0F766E" stroke-width="1.2" stroke-dasharray="3 2" />
              <text x="28" y="65" fill="#0F766E" font-size="10" font-weight="700">A(-10, y₁&gt;0)</text>
            </g>

            <!-- Step 3：点 B(1, y2) 与 C(5, y3) 在第四象限 (y2 < y3 < 0) -->
            <g class="proc-geo-anim" data-appear-at="13.0" data-dur="0.5" style="opacity:0;">
              <circle cx="148" cy="145" r="4" fill="#BE123C" />
              <line x1="148" y1="88" x2="148" y2="145" stroke="#BE123C" stroke-width="1.2" stroke-dasharray="3 2" />
              <text x="154" y="152" fill="#BE123C" font-size="10" font-weight="700">B(1, y₂)</text>

              <circle cx="202" cy="103" r="4" fill="#D97706" />
              <line x1="202" y1="88" x2="202" y2="103" stroke="#D97706" stroke-width="1.2" stroke-dasharray="3 2" />
              <text x="186" y="120" fill="#B45309" font-size="10" font-weight="700">C(5, y₃)</text>
            </g>
          </svg>
        `
      },

      steps: [
        {
          step: 1,
          name: '由 k 的正负确定象限与单调性',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '在 $y = -\\frac{3}{x}$ 中，比例系数 $k = -3 \\lt 0$，故双曲线位于第二、第四象限，且在每个象限内 $y$ 随 $x$ 的增大而增大。'
        },
        {
          step: 2,
          name: '按横坐标正负跨象限判函数值正负',
          tStart: 6.0,
          tEnd: 12.5,
          explanation: '点 $A(-10, y_{1})$ 的横坐标 $-10 \\lt 0$，位于第二象限，故 $y_{1} \\gt 0$；点 $B(1, y_{2}), C(5, y_{3})$ 的横坐标均 $\\gt 0$，位于第四象限，故 $y_{2} \\lt 0, y_{3} \\lt 0$。'
        },
        {
          step: 3,
          name: '正数大于负数，先锁定最大值 y₁',
          tStart: 12.5,
          tEnd: 18.0,
          explanation: '因为 $y_{1}$ 是正数，而 $y_{2}, y_{3}$ 都是负数，正数永远大于负数，所以 $y_{1}$ 最大！'
        },
        {
          step: 4,
          name: '同一象限内利用单调性比较 y₂ 与 y₃',
          tStart: 18.0,
          tEnd: 24.8,
          explanation: '点 $B(1, y_{2})$ 与 $C(5, y_{3})$ 同在第四象限，第四象限内 $y$ 随 $x$ 增大而增大，由 $1 \\lt 5$ 得 $y_{2} \\lt y_{3} \\lt 0$。'
        },
        {
          step: 5,
          name: '汇总完整大小关系（并可用代入法验算）',
          tStart: 24.8,
          tEnd: 31.0,
          explanation: '综合跨象限与同象限比较结果，得 $y_{2} \\lt y_{3} \\lt y_{1}$（代入验算：$y_{2} = -3, y_{3} = -\\frac{3}{5}, y_{1} = \\frac{3}{10}$，完全一致）。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 判定 $k = -3 \\lt 0$（二、四象限，每象限递增）' },
        { time: 7.5, step: 2, label: '2.1 点 $A(-10, y_{1})$ 在第二象限得 $y_{1} \\gt 0$' },
        { time: 14.0, step: 3, label: '3.1 点 $B, C$ 在第四象限得 $y_{2} \\lt 0, y_{3} \\lt 0$' },
        { time: 20.0, step: 4, label: '4.1 第四象限内由 $1 \\lt 5$ 得 $y_{2} \\lt y_{3} \\lt 0$' },
        { time: 27.0, step: 5, label: '5.1 汇总得出 $y_{2} \\lt y_{3} \\lt y_{1}$' }
      ],

      boardRows: [
        {
          rowId: 'p14_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p14_r0_func', math: '在 $y = -\\frac{3}{x}$ 上：', appearAt: 0.0, dur: 0.01 },
            { id: 'p14_r0_pts', math: '$A(-10, y_{1})$，$B(1, y_{2})$，$C(5, y_{3})$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p14_row_1',
          stepBadge: '第 1 步 · 象限与单调性',
          appearAt: 1.5,
          tokens: [
            { id: 'p14_r1_k', math: '$\\because k = -3 \\lt 0 \\implies$ 图象在二、四象限，每象限内 $y$ 随 $x$ 增大而增大', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p14_row_2',
          stepBadge: '第 2 & 3 步 · 跨象限判正负',
          appearAt: 6.4,
          tokens: [
            { id: 'p14_r2_a', math: '$\\because -10 \\lt 0 \\implies A$ 在第二象限，$y_{1} \\gt 0$；', appearAt: 6.5, dur: 0.45 },
            { id: 'p14_r2_bc', math: '$1 \\gt 0, 5 \\gt 0 \\implies B, C$ 在第四象限，$y_{2} \\lt 0, y_{3} \\lt 0$', appearAt: 12.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p14_row_3',
          stepBadge: '第 4 步 · 同象限比大小',
          appearAt: 18.4,
          tokens: [
            { id: 'p14_r3_same', math: '在第四象限内，由 $0 \\lt 1 \\lt 5$', appearAt: 18.5, dur: 0.40 },
            { id: 'p14_r3_ord', math: '$\\implies y_{2} \\lt y_{3} \\lt 0$', appearAt: 19.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p14_row_4',
          stepBadge: '最终结论',
          appearAt: 25.2,
          isConclusion: true,
          tokens: [
            { id: 'p14_r4_conc', math: '$\\therefore y_{2} \\lt y_{3} \\lt y_{1}$。', appearAt: 25.3, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p14_sp_1',
          title: '草稿验算法 · 直接代入横坐标算具体值',
          showStart: 18.2,
          showEnd: 30.8,
          tokens: [
            { id: 'p14_sp1_t1', math: '$y_{1} = -\\frac{3}{-10} = +\\frac{3}{10} = 0.3$', appearAt: 18.8, dur: 0.40 },
            { id: 'p14_sp1_t2', math: '$y_{2} = -\\frac{3}{1} = -3$', appearAt: 20.0, dur: 0.40 },
            { id: 'p14_sp1_t3', math: '$y_{3} = -\\frac{3}{5} = -0.6$', appearAt: 21.2, dur: 0.40 },
            { id: 'p14_sp1_t4', math: '$\\because -3 \\lt -0.6 \\lt 0.3 \\implies y_{2} \\lt y_{3} \\lt y_{1}$', appearAt: 25.4, dur: 0.45 }
          ],
          note: '当横坐标是具体数字（或可赋特殊值）时，直接代入算出数值能 100% 避免跨象限排序出错'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p14_r1_k', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p14_r2_a', tStart: 6.5, tEnd: 12.4, color: 'teal' },
        { tokenId: 'p14_r2_bc', tStart: 12.8, tEnd: 17.8, color: 'amber' },
        { tokenId: 'p14_r3_ord', tStart: 19.8, tEnd: 24.6, color: 'rose' }
      ],

      svgAnnotations: [
        {
          id: 'p14_svg_s2',
          type: 'arrow',
          fromToken: 'p14_r0_pts',
          toToken: 'p14_r2_a',
          label: '以 $x = 0$ 为界分组',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 6.2,
          tDrawEnd: 7.0,
          tFadeStart: 11.8,
          tEnd: 12.4
        },
        {
          id: 'p14_svg_s4',
          type: 'arrow',
          fromToken: 'p14_r2_bc',
          toToken: 'p14_r3_ord',
          label: '第四象限内单调递增',
          color: '#D97706',
          curveOffset: 28,
          tStart: 18.6,
          tDrawEnd: 19.5,
          tFadeStart: 24.0,
          tEnd: 24.6
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '第一步判定比例系数：在 $y = -\\frac{3}{x}$ 中，$k = -3 \\lt 0$，图象位于第二、第四象限，在每个象限内 $y$ 随 $x$ 增大而增大。', focusToken: 'p14_r1_k' },
        { tStart: 6.0, tEnd: 12.5, text: '第二步跨象限判正负：千万不能把 $-10 \\lt 1 \\lt 5$ 直接套单调性！先看点 $A(-10, y_{1})$，因 $-10 \\lt 0$ 在第二象限，故 $y_{1} \\gt 0$。', focusToken: 'p14_r2_a' },
        { tStart: 12.5, tEnd: 18.0, text: '第三步看点 $B(1, y_{2})$ 和 $C(5, y_{3})$：横坐标都大于 $0$，同在第四象限，故 $y_{2}, y_{3}$ 都是负数，所以正数 $y_{1}$ 最大！', focusToken: 'p14_r2_bc' },
        { tStart: 18.0, tEnd: 24.8, text: '第四步同象限比单调：在第四象限内 $y$ 随 $x$ 增大而增大，因为 $1 \\lt 5$，所以 $y_{2} \\lt y_{3} \\lt 0$。', focusToken: 'p14_r3_ord' },
        { tStart: 24.8, tEnd: 31.0, text: '第五步汇总排序：得出 $y_{2} \\lt y_{3} \\lt y_{1}$（也可用右侧草稿板的代入法直接验算）。', focusToken: 'p14_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：抽象不等条件下的跨象限函数值比较',
          givenLabel: '已知反比例函数：',
          givenFormula: '$y = \\frac{6}{x}$（其中 $k = 6 \\gt 0$，位于第一、三象限，每象限内递减）',
          extractedLabel: '图象上三点横坐标关系：',
          extractedFormula: '$x_{1} \\lt x_{2} \\lt 0 \\lt x_{3}$',
          questionText: '对应的函数值 $y_{1}, y_{2}, y_{3}$ 的大小关系是？',
          options: [
            { key: 'A', text: 'A. $y_{2} \\lt y_{1} \\lt 0 \\lt y_{3}$（即 $y_{2} \\lt y_{1} \\lt y_{3}$）', isCorrect: true },
            { key: 'B', text: 'B. $y_{3} \\lt y_{2} \\lt y_{1}$', isCorrect: false },
            { key: 'C', text: 'C. $y_{1} \\lt y_{2} \\lt y_{3}$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！先跨象限判正负，再在第三象限内用递减性质（或特殊值法）：',
            calcLines: [
              '$x_{3} \\gt 0 \\implies$ 在第一象限，$y_{3} \\gt 0$（最大）',
              '$x_{1} \\lt x_{2} \\lt 0 \\implies$ 同在第三象限（递减），故 $y_{2} \\lt y_{1} \\lt 0$',
              '特殊值验证：令 $x_{1}=-2, x_{2}=-1, x_{3}=1 \\implies y_{1}=-3, y_{2}=-6, y_{3}=6$'
            ],
            summary: '遇到 $x_{1} \\lt x_{2} \\lt 0 \\lt x_{3}$ 类抽象题，赋特殊值代入能瞬间得出准确顺序。'
          },
          wrongTitle: '提示：请先以 0 为界区分正负，或赋特殊值 x₁=-2, x₂=-1, x₃=1 代入',
          wrongFeedback: '$k = 6 \\gt 0$ 时，$x_{3} \\gt 0$ 对应的 $y_{3} \\gt 0$ 最大；而在第三象限内 $y$ 随 $x$ 增大而减小，故 $x_{1} \\lt x_{2} \\lt 0 \\implies y_{2} \\lt y_{1} \\lt 0$，请再试一次。'
        },
        practice2: {
          title: '练习二：代入计算比较反比例函数值',
          givenLabel: '已知条件：',
          givenFormula: '点 $A(-2, y_{1})$ 与点 $B(4, y_{2})$ 在反比例函数 $y = \\frac{8}{x}$ 的图象上',
          questionText: '请分别算出 $y_{1}$ 和 $y_{2}$ 的具体数值（从而確認 $y_{1} \\lt y_{2}$）：',
          input1Prefix: '$y_{1} =$',
          input1Placeholder: '如 -4',
          input2Prefix: '，$y_{2} =$',
          input2Placeholder: '如 2',
          input2Suffix: '',
          expectedX: '-4',
          expectedMin: '2',
          allowOrderSwap: false,
          correctFeedback: '$y_{1} = -4$，$y_{2} = 2$（故 $y_{1} \\lt y_{2}$）。',
          correctDetail: '将 $x = -2$ 代入得 $y_{1} = \\frac{8}{-2} = -4$；将 $x = 4$ 代入得 $y_{2} = \\frac{8}{4} = 2$。',
          wrongFeedback: '分别计算 $y_{1} = 8 \\div (-2)$ 与 $y_{2} = 8 \\div 4$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '4',
              hint: '注意 $x = -2$ 带负号，$8 \\div (-2) = -4$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P15：利用反比例函数中心对称性求正比例交点坐标与对称式的值
    // =========================================================================
    P15: {
      procedureId: 'P15',
      title: '利用反比例函数中心对称性求正比例交点坐标与对称式的值',
      exampleTitle: '已知正比例函数 $y = kx$ 与反比例函数 $y = \\frac{\\sqrt{3}}{x}$ 交于 $A(x_{1}, y_{1})$、$B(x_{2}, y_{2})$ 两点，求 $2x_{1}y_{2} - 5x_{2}y_{1}$ 的值',
      exampleFormula: '$y = kx$ 与 $y = \\frac{\\sqrt{3}}{x}$ 交于 $A(x_{1}, y_{1}), B(x_{2}, y_{2})$',
      totalDuration: 31.0,
      scratchpadIdleHint: '旁白草稿演算区（配合上方中心对称交点图，展示 x₂=-x₁, y₂=-y₁ 消元化归为 x₁y₁=k₁）',
      practiceSectionTitle: '反比例函数中心对称交点跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握关于原点对称交点坐标互为相反数与对称代数式化简',

      geometryDiagram: {
        title: '动态函数图象 · 原点中心对称交点',
        caption: '过原点的直线与双曲线均关于原点对称，两交点 A(x₁, y₁) 与 B(-x₁, -y₁) 关于原点对称',
        svgHtml: `
          <svg viewBox="0 0 260 175" class="w-full max-w-[260px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <!-- 坐标轴 -->
            <line x1="20" y1="88" x2="240" y2="88" stroke="#64748B" stroke-width="1.5" />
            <line x1="130" y1="12" x2="130" y2="164" stroke="#64748B" stroke-width="1.5" />
            <text x="234" y="102" fill="#475569" font-size="11" font-weight="700">x</text>
            <text x="137" y="20" fill="#475569" font-size="11" font-weight="700">y</text>
            <circle cx="130" cy="88" r="3" fill="#0F172A" />
            <text x="117" y="101" fill="#0F172A" font-size="10" font-weight="700">O</text>

            <!-- 双曲线 y = k1/x (一、三象限) -->
            <path d="M 142 18 Q 162 70 225 76" fill="none" stroke="#0F766E" stroke-width="2.4" />
            <path d="M 35 100 Q 98 106 118 158" fill="none" stroke="#0F766E" stroke-width="2.4" />

            <!-- 过原点的正比例直线 y = kx -->
            <line class="proc-geo-anim" data-appear-at="1.2" data-dur="0.6" data-dash-len="210"
                  x1="46" y1="144" x2="214" y2="32" stroke="#D97706" stroke-width="2.2"
                  stroke-dasharray="210" stroke-dashoffset="210" style="opacity:0;" />

            <!-- 交点 A 与 B (关于原点对称) -->
            <g class="proc-geo-anim" data-appear-at="6.4" data-dur="0.5" style="opacity:0;">
              <circle cx="172" cy="60" r="4" fill="#BE123C" />
              <text x="176" y="54" fill="#BE123C" font-size="10" font-weight="700">A(x₁, y₁)</text>

              <circle cx="88" cy="116" r="4" fill="#BE123C" />
              <text x="26" y="132" fill="#BE123C" font-size="10" font-weight="700">B(-x₁, -y₁)</text>
            </g>
          </svg>
        `
      },

      steps: [
        {
          step: 1,
          name: '确认中心对称结构与定值 $x_{1}y_{1}$',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '正比例函数 $y = kx$（过原点）与双曲线 $y = \\frac{\\sqrt{3}}{x}$ 均关于原点中心对称，且双曲线上点 $A$ 满足 $x_{1}y_{1} = \\sqrt{3}$。'
        },
        {
          step: 2,
          name: '写出两交点坐标的相反数关系',
          tStart: 6.0,
          tEnd: 12.2,
          explanation: '因为两个交点 $A(x_{1}, y_{1})$ 与 $B(x_{2}, y_{2})$ 关于原点 $(0, 0)$ 对称，所以 $x_{2} = -x_{1}$，$y_{2} = -y_{1}$。'
        },
        {
          step: 3,
          name: '将 $x_{2} = -x_{1}, y_{2} = -y_{1}$ 代入目标式',
          tStart: 12.2,
          tEnd: 18.8,
          explanation: '把目标式中的 $x_{2}, y_{2}$ 全部替换为 $-x_{1}, -y_{1}$，得 $2x_{1}(-y_{1}) - 5(-x_{1})y_{1}$。'
        },
        {
          step: 4,
          name: '确定符号并合并同类项',
          tStart: 18.8,
          tEnd: 24.8,
          explanation: '化简符号得 $-2x_{1}y_{1} + 5x_{1}y_{1}$，合并同类项得 $3x_{1}y_{1}$。'
        },
        {
          step: 5,
          name: '整体代入 $x_{1}y_{1} = \\sqrt{3}$ 得出结果',
          tStart: 24.8,
          tEnd: 31.0,
          explanation: '将步骤 1 的双曲线定值 $x_{1}y_{1} = \\sqrt{3}$ 整体代入 $3x_{1}y_{1}$，算出最终结果为 $3\\sqrt{3}$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 确认双曲线定值 $x_{1}y_{1} = \\sqrt{3}$' },
        { time: 7.5, step: 2, label: '2.1 由关于原点对称得 $x_{2} = -x_{1}, y_{2} = -y_{1}$' },
        { time: 14.0, step: 3, label: '3.1 代入目标式消去 $x_{2}, y_{2}$' },
        { time: 20.5, step: 4, label: '4.1 合并同类项得 $3x_{1}y_{1}$' },
        { time: 27.0, step: 5, label: '5.1 代入 $x_{1}y_{1} = \\sqrt{3}$ 得 $3\\sqrt{3}$' }
      ],

      boardRows: [
        {
          rowId: 'p15_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p15_r0_cond', math: '$y = kx$ 与 $y = \\frac{\\sqrt{3}}{x}$ 交于 $A(x_{1}, y_{1}), B(x_{2}, y_{2})$，', appearAt: 0.0, dur: 0.01 },
            { id: 'p15_r0_target', math: '求 $2x_{1}y_{2} - 5x_{2}y_{1}$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p15_row_1',
          stepBadge: '第 1 步 · 乘积定值',
          appearAt: 1.5,
          tokens: [
            { id: 'p15_r1_prod', math: '$\\because$ 点 $A(x_{1}, y_{1})$ 在 $y = \\frac{\\sqrt{3}}{x}$ 上 $\\implies x_{1}y_{1} = \\sqrt{3}$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p15_row_2',
          stepBadge: '第 2 步 · 原点对称关系',
          appearAt: 6.4,
          tokens: [
            { id: 'p15_r2_sym', math: '$\\because A, B$ 关于原点对称', appearAt: 6.5, dur: 0.40 },
            { id: 'p15_r2_opp', math: '$\\implies x_{2} = -x_{1}，\\quad y_{2} = -y_{1}$', appearAt: 7.4, dur: 0.45 }
          ]
        },
        {
          rowId: 'p15_row_3',
          stepBadge: '第 3 步 · 消元代换',
          appearAt: 12.6,
          tokens: [
            { id: 'p15_r3_start', math: '原式 $=$', appearAt: 12.7, dur: 0.30 },
            { id: 'p15_r3_t1', math: '$2x_{1}(-y_{1})$', appearAt: 13.3, dur: 0.45 },
            { id: 'p15_r3_t2', math: '$- 5(-x_{1})y_{1}$', appearAt: 14.3, dur: 0.45 }
          ]
        },
        {
          rowId: 'p15_row_4',
          stepBadge: '第 4 步 · 合并同类项',
          appearAt: 19.2,
          tokens: [
            { id: 'p15_r4_exp', math: '$= -2x_{1}y_{1} + 5x_{1}y_{1}$', appearAt: 19.3, dur: 0.45 },
            { id: 'p15_r4_sim', math: '$= 3x_{1}y_{1}$', appearAt: 20.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p15_row_5',
          stepBadge: '最终结论',
          appearAt: 25.2,
          isConclusion: true,
          tokens: [
            { id: 'p15_r5_conc', math: '$= 3\\sqrt{3}$。$\\quad\\therefore 2x_{1}y_{2} - 5x_{2}y_{1}$ 的值为 $3\\sqrt{3}$。', appearAt: 25.3, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p15_sp_1',
          title: '草稿速记 · 交叉坐标乘积公式',
          showStart: 12.4,
          showEnd: 30.8,
          tokens: [
            { id: 'p15_sp1_t1', math: '同点乘积：$x_{1}y_{1} = x_{2}y_{2} = k_{1}$', appearAt: 12.8, dur: 0.40 },
            { id: 'p15_sp1_t2', math: '交叉乘积：$x_{1}y_{2} = x_{1}(-y_{1}) = -k_{1}$', appearAt: 13.8, dur: 0.45 },
            { id: 'p15_sp1_t3', math: '交叉乘积：$x_{2}y_{1} = (-x_{1})y_{1} = -k_{1}$', appearAt: 14.8, dur: 0.45 }
          ],
          note: '记住“同号下标积为 $+k_{1}$，异号交叉积为 $-k_{1}$”，可直接在 3 秒内口算任意对称式'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p15_r1_prod', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p15_r2_opp', tStart: 7.4, tEnd: 12.0, color: 'amber' },
        { tokenId: 'p15_r3_t1', tStart: 13.3, tEnd: 18.6, color: 'amber' },
        { tokenId: 'p15_r3_t2', tStart: 14.3, tEnd: 18.6, color: 'rose' },
        { tokenId: 'p15_r4_sim', tStart: 20.6, tEnd: 24.6, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p15_svg_s3',
          type: 'arrow',
          fromToken: 'p15_r2_opp',
          toToken: 'p15_r3_t2',
          label: '代入 $x_{2}=-x_{1}, y_{2}=-y_{1}$',
          color: '#D97706',
          curveOffset: 30,
          tStart: 12.8,
          tDrawEnd: 13.8,
          tFadeStart: 17.8,
          tEnd: 18.5
        },
        {
          id: 'p15_svg_s5',
          type: 'arrow',
          fromToken: 'p15_r1_prod',
          toToken: 'p15_r4_sim',
          label: '代入 $x_{1}y_{1} = \\sqrt{3}$',
          color: '#0F766E',
          curveOffset: -32,
          tStart: 21.5,
          tDrawEnd: 22.5,
          tFadeStart: 24.4,
          tEnd: 25.0
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '第一步确认中心对称与乘积定值：正比例函数 $y = kx$ 与双曲线 $y = \\frac{\\sqrt{3}}{x}$ 均关于原点对称，且 $x_{1}y_{1} = \\sqrt{3}$。', focusToken: 'p15_r1_prod' },
        { tStart: 6.0, tEnd: 12.2, text: '第二步写出相反数关系：两交点 $A(x_{1}, y_{1})$ 与 $B(x_{2}, y_{2})$ 关于原点对称，横纵坐标互为相反数，即 $x_{2} = -x_{1}, y_{2} = -y_{1}$。', focusToken: 'p15_r2_opp' },
        { tStart: 12.2, tEnd: 18.8, text: '第三步消元代换：把 $y_{2} = -y_{1}$ 和 $x_{2} = -x_{1}$ 代入目标式，得到 $2x_{1}(-y_{1}) - 5(-x_{1})y_{1}$。', focusToken: 'p15_r3_t2' },
        { tStart: 18.8, tEnd: 24.8, text: '第四步合并同类项：注意负负得正，$-2x_{1}y_{1} + 5x_{1}y_{1}$ 合并后等于 $3x_{1}y_{1}$。', focusToken: 'p15_r4_sim' },
        { tStart: 24.8, tEnd: 31.0, text: '第五步整体代入定值：将 $x_{1}y_{1} = \\sqrt{3}$ 代入 $3x_{1}y_{1}$，得出最终结果为 $3\\sqrt{3}$！', focusToken: 'p15_r5_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：利用原点中心对称直接求另一交点坐标',
          givenLabel: '已知条件：',
          givenFormula: '正比例函数 $y = 2x$ 与反比例函数 $y = \\frac{8}{x}$ 的图象相交于 $A, B$ 两点',
          extractedLabel: '其中一个交点坐标：',
          extractedFormula: '点 $A$ 的坐标为 $(2, 4)$',
          questionText: '不解方程组，直接写出另一个交点 $B$ 的坐标是？',
          options: [
            { key: 'A', text: 'A. $(-2, -4)$', isCorrect: true },
            { key: 'B', text: 'B. $(-2, 4)$', isCorrect: false },
            { key: 'C', text: 'C. $(-4, -2)$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！关于原点对称的两点横、纵坐标均互为相反数：',
            calcLines: [
              '$A(x_{1}, y_{1}) = (2, 4) \\implies B(-x_{1}, -y_{1}) = (-2, -4)$'
            ],
            summary: '过原点的直线与双曲线的交点一定成对关于原点中心对称。'
          },
          wrongTitle: '提示：请回顾关于原点对称的坐标特征',
          wrongFeedback: '点 $(x, y)$ 关于原点对称的点是 $(-x, -y)$（横、纵坐标同时变号，且不对调位置），请再试一次。'
        },
        practice2: {
          title: '练习二：求关于原点对称交点的代数式的值',
          givenLabel: '已知条件：',
          givenFormula: '正比例函数 $y = kx$ 与反比例函数 $y = \\frac{6}{x}$ 交于 $A(x_{1}, y_{1}), B(x_{2}, y_{2})$ 两点',
          questionText: '此时同点乘积 $x_{1}y_{1}$ 与交叉乘积代数式 $3x_{1}y_{2} - x_{2}y_{1}$ 的值分别是多少？',
          input1Prefix: '$x_{1}y_{1} =$',
          input1Placeholder: '如 6',
          input2Prefix: '，$3x_{1}y_{2} - x_{2}y_{1} =$',
          input2Placeholder: '如 -12',
          input2Suffix: '',
          expectedX: '6',
          expectedMin: '-12',
          allowOrderSwap: false,
          correctFeedback: '$x_{1}y_{1} = 6$，$3x_{1}y_{2} - x_{2}y_{1} = -12$。',
          correctDetail: '由 $y = \\frac{6}{x}$ 得 $x_{1}y_{1} = 6$；又因 $x_{2} = -x_{1}, y_{2} = -y_{1}$，故 $3x_{1}(-y_{1}) - (-x_{1})y_{1} = -3x_{1}y_{1} + x_{1}y_{1} = -2x_{1}y_{1} = -2 \\times 6 = -12$。',
          wrongFeedback: '先由 $y = \\frac{6}{x}$ 得 $x_{1}y_{1} = 6$，再将 $x_{1}y_{2} = -6, x_{2}y_{1} = -6$ 代入 $3x_{1}y_{2} - x_{2}y_{1}$ 计算。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '12',
              hint: '注意 $3x_{1}(-y_{1}) - (-x_{1})y_{1} = -3x_{1}y_{1} + x_{1}y_{1} = -2x_{1}y_{1} = -12$（带负号）。'
            }
          ]
        }
      }
    }    ,
    // =========================================================================
    // P16：利用根的判别式判断一元二次方程根的情况与求参数
    // =========================================================================
    P16: {
      procedureId: 'P16',
      title: '利用根的判别式判断一元二次方程根的情况与求参数',
      exampleTitle: '关于 $x$ 的方程 $kx^{2} - 6x + 3 = 0$ 有两个不相等的实数根，求 $k$ 的取值范围',
      exampleFormula: '$kx^{2} - 6x + 3 = 0$ 有两个不相等的实数根',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示判别式 Δ 三种符号对应法则与二次项系数 a≠0 双重约束）',
      practiceSectionTitle: '根的判别式判断与求参跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握一般式系数提取、判别式计算与含参双重条件',

      steps: [
        {
          step: 1,
          name: '提取系数并核对二次项系数不为 0',
          tStart: 0.0,
          tEnd: 6.2,
          explanation: '方程 $kx^{2} - 6x + 3 = 0$ 已是一般形式，提取 $a = k，b = -6，c = 3$；因为方程有两个不相等的实数根，必为一元二次方程，故二次项系数 $k \\neq 0$。'
        },
        {
          step: 2,
          name: '代入计算根的判别式 $\\Delta = b^{2} - 4ac$',
          tStart: 6.2,
          tEnd: 12.5,
          explanation: '将 $a = k，b = -6，c = 3$ 代入判别式公式，得 $\\Delta = (-6)^{2} - 4 \\times k \\times 3 = 36 - 12k$。'
        },
        {
          step: 3,
          name: '由有两个不相等实根建立 $\\Delta \\gt 0$',
          tStart: 12.5,
          tEnd: 18.5,
          explanation: '因为方程有两个不相等的实数根，所以判别式严格大于 $0$，列出不等式 $36 - 12k \\gt 0$。'
        },
        {
          step: 4,
          name: '解一元一次不等式求出 $k$ 的范围',
          tStart: 18.5,
          tEnd: 24.5,
          explanation: '解不等式 $36 - 12k \\gt 0$：移项得 $-12k \\gt -36$，两边同除以 $-12$（不等号反向），得 $k \\lt 3$。'
        },
        {
          step: 5,
          name: '联立 $k \\neq 0$ 写出最终取值范围',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '综合步骤 1 的 $k \\neq 0$ 与步骤 4 的 $k \\lt 3$，得出 $k$ 的最终取值范围为 $k \\lt 3$ 且 $k \\neq 0$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 提取 $a = k, b = -6, c = 3$ 并确立 $k \\neq 0$' },
        { time: 7.5, step: 2, label: '2.1 计算 $\\Delta = (-6)^{2} - 4 \\cdot k \\cdot 3 = 36 - 12k$' },
        { time: 14.0, step: 3, label: '3.1 两个不相等实根 $\\implies 36 - 12k \\gt 0$' },
        { time: 20.0, step: 4, label: '4.1 解不等式得 $k \\lt 3$' },
        { time: 26.5, step: 5, label: '5.1 合并双重条件得 $k \\lt 3$ 且 $k \\neq 0$' }
      ],

      boardRows: [
        {
          rowId: 'p16_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p16_r0_eq', math: '关于 $x$ 的方程 $kx^{2} - 6x + 3 = 0$', appearAt: 0.0, dur: 0.01 },
            { id: 'p16_r0_cond', math: '有两个不相等的实数根', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p16_row_1',
          stepBadge: '第 1 步 · 提系数与限制',
          appearAt: 1.5,
          tokens: [
            { id: 'p16_r1_abc', math: '提取系数：$a = k，b = -6，c = 3$；', appearAt: 1.6, dur: 0.40 },
            { id: 'p16_r1_k0', math: '且二次项系数 $k \\neq 0$', appearAt: 2.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p16_row_2',
          stepBadge: '第 2 步 · 计算判别式',
          appearAt: 6.6,
          tokens: [
            { id: 'p16_r2_del', math: '$\\Delta = b^{2} - 4ac = (-6)^{2} - 4 \\times k \\times 3$', appearAt: 6.7, dur: 0.45 },
            { id: 'p16_r2_res', math: '$= 36 - 12k$', appearAt: 8.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p16_row_3',
          stepBadge: '第 3 & 4 步 · 列式求解',
          appearAt: 13.0,
          tokens: [
            { id: 'p16_r3_ineq', math: '由题意得 $\\Delta = 36 - 12k \\gt 0$', appearAt: 13.1, dur: 0.45 },
            { id: 'p16_r3_sol', math: '$\\implies -12k \\gt -36 \\implies k \\lt 3$', appearAt: 19.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p16_row_4',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p16_r4_conc', math: '$\\therefore k$ 的取值范围是 $k \\lt 3$ 且 $k \\neq 0$。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p16_sp_1',
          title: '核心法则 · 判别式 Δ 与实数根的对应关系',
          showStart: 6.2,
          showEnd: 29.8,
          tokens: [
            { id: 'p16_sp1_t1', math: '① $\\Delta \\gt 0 \\iff$ 有两个不相等的实数根', appearAt: 6.8, dur: 0.40 },
            { id: 'p16_sp1_t2', math: '② $\\Delta = 0 \\iff$ 有两个相等的实数根', appearAt: 7.8, dur: 0.40 },
            { id: 'p16_sp1_t3', math: '③ $\\Delta \\lt 0 \\iff$ 没有实数根（$\\Delta \\ge 0 \\iff$ 有实数根）', appearAt: 8.8, dur: 0.40 }
          ],
          note: '易错警示：当二次项系数含参且方程有两个实数根时，千万不能漏掉二次项系数不为 0！'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p16_r1_k0', tStart: 2.8, tEnd: 6.0, color: 'rose' },
        { tokenId: 'p16_r2_res', tStart: 8.2, tEnd: 12.3, color: 'teal' },
        { tokenId: 'p16_r3_ineq', tStart: 13.1, tEnd: 18.4, color: 'amber' },
        { tokenId: 'p16_r3_sol', tStart: 19.0, tEnd: 24.4, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p16_svg_s1',
          type: 'arrow',
          fromToken: 'p16_r0_cond',
          toToken: 'p16_r1_k0',
          label: '有两个实根 $\\implies k \\neq 0$',
          color: '#BE123C',
          curveOffset: 28,
          tStart: 2.2,
          tDrawEnd: 3.0,
          tFadeStart: 5.4,
          tEnd: 6.0
        },
        {
          id: 'p16_svg_s3',
          type: 'arrow',
          fromToken: 'p16_r2_res',
          toToken: 'p16_r3_ineq',
          label: '令 $\\Delta \\gt 0$',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 12.8,
          tDrawEnd: 13.6,
          tFadeStart: 17.6,
          tEnd: 18.2
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.2, text: '第一步提取系数并核对限制条件：在 $kx^{2} - 6x + 3 = 0$ 中，$a = k, b = -6, c = 3$；因为有两个不相等的实数根，必为一元二次方程，故 $k \\neq 0$。', focusToken: 'p16_r1_k0' },
        { tStart: 6.2, tEnd: 12.5, text: '第二步计算根的判别式：$\\Delta = b^{2} - 4ac = (-6)^{2} - 4 \\times k \\times 3 = 36 - 12k$。', focusToken: 'p16_r2_res' },
        { tStart: 12.5, tEnd: 18.5, text: '第三步建立判别式不等式：有两个不相等的实数根对应 $\\Delta \\gt 0$，即 $36 - 12k \\gt 0$。', focusToken: 'p16_r3_ineq' },
        { tStart: 18.5, tEnd: 24.5, text: '第四步解不等式：移项得 $-12k \\gt -36$，两边同除以 $-12$ 不等号反向，解得 $k \\lt 3$。', focusToken: 'p16_r3_sol' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步合并双重条件：结合第一步的 $k \\neq 0$，得出最终范围为 $k \\lt 3$ 且 $k \\neq 0$！', focusToken: 'p16_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：先化一般式再算根的判别式',
          givenLabel: '已知一元二次方程：',
          givenFormula: '$x^{2} = 3x - 1$',
          extractedLabel: '移项化为一般形式：',
          extractedFormula: '$x^{2} - 3x + 1 = 0\\ (a = 1, b = -3, c = 1)$',
          questionText: '计算该方程根的判别式 $\\Delta = b^{2} - 4ac$，正确的算式与结果是？',
          options: [
            { key: 'A', text: 'A. $(-3)^{2} - 4 \\times 1 \\times 1 = 5 \\gt 0$（有两个不相等的实数根）', isCorrect: true },
            { key: 'B', text: 'B. $(-3)^{2} - 4 \\times 1 \\times (-1) = 13$', isCorrect: false },
            { key: 'C', text: 'C. $3^{2} + 4 \\times 1 \\times (-1) = 5$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！必须先移项化为右边为 0 的一般形式再提取 a, b, c：',
            calcLines: [
              '$x^{2} - 3x + 1 = 0 \\implies a = 1,\\ b = -3,\\ c = 1$',
              '$\\Delta = (-3)^{2} - 4 \\times 1 \\times 1 = 9 - 4 = 5 \\gt 0$'
            ],
            summary: '切勿在未移项时直接把等号右边的 $-1$ 当作 $c$。'
          },
          wrongTitle: '提示：请先移项将等号右边化为 0',
          wrongFeedback: '将 $3x - 1$ 移到左边后常数项变为 $+1$（而非 $-1$），故 $\\Delta = (-3)^{2} - 4 \\times 1 \\times 1 = 5$，请再试一次。'
        },
        practice2: {
          title: '练习二：由有两个相等的实数根求参数',
          givenLabel: '已知条件：',
          givenFormula: '关于 $x$ 的一元二次方程 $(m - 2)x^{2} + 2x + 1 = 0$ 有两个相等的实数根',
          questionText: '此时判别式 $\\Delta = b^{2} - 4ac$ 等于多少？解出的参数 $m$ 的值是多少？',
          input1Prefix: '$\\Delta =$',
          input1Placeholder: '如 0',
          input2Prefix: '，$m =$',
          input2Placeholder: '如 3',
          input2Suffix: '',
          expectedX: '0',
          expectedMin: '3',
          allowOrderSwap: false,
          correctFeedback: '$\\Delta = 0$，$m = 3$。',
          correctDetail: '有两个相等的实数根 $\\implies \\Delta = 2^{2} - 4(m - 2)\\times 1 = 0$，解得 $m = 3$（且满足 $m - 2 \\neq 0$）。',
          wrongFeedback: '有两个相等的实数根时判别式 $\\Delta = 0$，由 $4 - 4(m - 2) = 0$ 即可解出 $m$。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '2',
              hint: '若 $m = 2$，则二次项系数 $m - 2 = 0$，方程不再是一元二次方程；由 $4 - 4(m - 2) = 0$ 得 $m - 2 = 1 \\implies m = 3$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P17：利用公式法解一元二次方程
    // =========================================================================
    P17: {
      procedureId: 'P17',
      title: '利用公式法解一元二次方程',
      exampleTitle: '用公式法解一元二次方程 $3x^{2} - 5x = 2$',
      exampleFormula: '$3x^{2} - 5x = 2 \\implies x = \\frac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示移项变号提取 a,b,c、判别式计算与求根公式分子 -b 符号）',
      practiceSectionTitle: '公式法解一元二次方程跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握求根公式结构逆推与完整公式法求解',

      steps: [
        {
          step: 1,
          name: '移项化为一般形式，确定 $a, b, c$',
          tStart: 0.0,
          tEnd: 6.2,
          explanation: '将右边的常数 $2$ 移到左边变号为 $-2$，化为一般形式 $3x^{2} - 5x - 2 = 0$，连同符号确定 $a = 3，b = -5，c = -2$。'
        },
        {
          step: 2,
          name: '计算根的判别式 $\\Delta = b^{2} - 4ac$',
          tStart: 6.2,
          tEnd: 12.5,
          explanation: '加括号代入计算判别式：$\\Delta = (-5)^{2} - 4 \\times 3 \\times (-2) = 25 + 24 = 49 \\gt 0$，确认方程有两个不相等的实数根。'
        },
        {
          step: 3,
          name: '代入求根公式 $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$',
          tStart: 12.5,
          tEnd: 19.0,
          explanation: '将 $a = 3, b = -5, \\Delta = 49$ 代入求根公式，注意分子 $-b = -(-5) = 5$，分母 $2a = 2 \\times 3 = 6$，得 $x = \\frac{5 \\pm \\sqrt{49}}{6}$。'
        },
        {
          step: 4,
          name: '化简算术平方根 $\\sqrt{\\Delta}$',
          tStart: 19.0,
          tEnd: 24.5,
          explanation: '化简 $\\sqrt{49} = 7$，得到 $x = \\frac{5 \\pm 7}{6}$。'
        },
        {
          step: 5,
          name: '分正负号约分算出两个根 $x_{1}, x_{2}$',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '当取加号时 $x_{1} = \\frac{5 + 7}{6} = 2$；当取减号时 $x_{2} = \\frac{5 - 7}{6} = -\\frac{1}{3}$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 移项变号得 $3x^{2} - 5x - 2 = 0$（$a=3, b=-5, c=-2$）' },
        { time: 7.5, step: 2, label: '2.1 算得 $\\Delta = (-5)^{2} - 4 \\times 3 \\times (-2) = 49 \\gt 0$' },
        { time: 14.0, step: 3, label: '3.1 代入求根公式 $x = \\frac{-(-5) \\pm \\sqrt{49}}{2 \\times 3}$' },
        { time: 20.5, step: 4, label: '4.1 化简得 $x = \\frac{5 \\pm 7}{6}$' },
        { time: 26.5, step: 5, label: '5.1 分别约分解得 $x_{1} = 2，x_{2} = -\\frac{1}{3}$' }
      ],

      boardRows: [
        {
          rowId: 'p17_row_0',
          stepBadge: '原方程',
          appearAt: 0.0,
          tokens: [
            { id: 'p17_r0_eq', math: '用公式法解方程：$3x^{2} - 5x = 2$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p17_row_1',
          stepBadge: '第 1 步 · 化一般式提系数',
          appearAt: 1.5,
          tokens: [
            { id: 'p17_r1_std', math: '移项化为一般形式：$3x^{2} - 5x - 2 = 0$，', appearAt: 1.6, dur: 0.40 },
            { id: 'p17_r1_abc', math: '这里 $a = 3，b = -5，c = -2$', appearAt: 2.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p17_row_2',
          stepBadge: '第 2 步 · 算判别式 Δ',
          appearAt: 6.6,
          tokens: [
            { id: 'p17_r2_del', math: '$\\because \\Delta = b^{2} - 4ac = (-5)^{2} - 4 \\times 3 \\times (-2)$', appearAt: 6.7, dur: 0.45 },
            { id: 'p17_r2_val', math: '$= 25 + 24 = 49 \\gt 0$', appearAt: 8.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p17_row_3',
          stepBadge: '第 3 & 4 步 · 代入求根公式',
          appearAt: 13.0,
          tokens: [
            { id: 'p17_r3_sub', math: '$\\therefore x = \\frac{-(-5) \\pm \\sqrt{49}}{2 \\times 3}$', appearAt: 13.1, dur: 0.45 },
            { id: 'p17_r3_sim', math: '$= \\frac{5 \\pm 7}{6}$', appearAt: 19.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p17_row_4',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p17_r4_conc', math: '$\\therefore x_{1} = \\frac{5 + 7}{6} = 2$，$x_{2} = \\frac{5 - 7}{6} = -\\frac{1}{3}$。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p17_sp_1',
          title: '草稿警示 · 求根公式三大高频易错点',
          showStart: 6.2,
          showEnd: 29.8,
          tokens: [
            { id: 'p17_sp1_t1', math: '① 移项变号：$3x^{2}-5x=2 \\to 3x^{2}-5x-2=0$（$c=-2$ 而非 $2$）', appearAt: 6.8, dur: 0.40 },
            { id: 'p17_sp1_t2', math: '② 分子 $-b$：当 $b=-5$ 时，$-b = -(-5) = +5$', appearAt: 13.2, dur: 0.45 },
            { id: 'p17_sp1_t3', math: '③ 分母 $2a$：分母是 $2 \\times 3 = 6$（切勿漏乘 $2$）', appearAt: 14.5, dur: 0.45 }
          ],
          note: '若由求根公式逆推方程，分子上的首项是 $-b$（需取相反数才是 $b$），分母是 $2a$'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p17_r1_abc', tStart: 2.8, tEnd: 6.0, color: 'amber' },
        { tokenId: 'p17_r2_val', tStart: 8.2, tEnd: 12.3, color: 'teal' },
        { tokenId: 'p17_r3_sub', tStart: 13.1, tEnd: 18.8, color: 'amber' },
        { tokenId: 'p17_r3_sim', tStart: 19.5, tEnd: 24.4, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p17_svg_s2',
          type: 'arrow',
          fromToken: 'p17_r1_abc',
          toToken: 'p17_r2_val',
          label: '负负得正：$25 + 24 = 49$',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 6.8,
          tDrawEnd: 7.6,
          tFadeStart: 11.4,
          tEnd: 12.0
        },
        {
          id: 'p17_svg_s3',
          type: 'arrow',
          fromToken: 'p17_r2_val',
          toToken: 'p17_r3_sub',
          label: '代入 $\\sqrt{\\Delta} = \\sqrt{49} = 7$',
          color: '#D97706',
          curveOffset: -26,
          tStart: 13.2,
          tDrawEnd: 14.0,
          tFadeStart: 18.0,
          tEnd: 18.6
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.2, text: '第一步移项化为一般形式：将等号右边的 $2$ 移到左边变号为 $-2$，得 $3x^{2} - 5x - 2 = 0$，确定 $a = 3, b = -5, c = -2$。', focusToken: 'p17_r1_abc' },
        { tStart: 6.2, tEnd: 12.5, text: '第二步计算判别式：$\\Delta = (-5)^{2} - 4 \\times 3 \\times (-2) = 25 + 24 = 49 \\gt 0$。', focusToken: 'p17_r2_val' },
        { tStart: 12.5, tEnd: 19.0, text: '第三步代入求根公式：因为 $b = -5$，所以分子 $-b = -(-5) = 5$，分母 $2a = 2 \\times 3 = 6$。', focusToken: 'p17_r3_sub' },
        { tStart: 19.0, tEnd: 24.5, text: '第四步开方化简：$\\sqrt{49} = 7$，算式化为 $x = \\frac{5 \\pm 7}{6}$。', focusToken: 'p17_r3_sim' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步分别约分定解：取加号得 $x_{1} = \\frac{12}{6} = 2$，取减号得 $x_{2} = \\frac{-2}{6} = -\\frac{1}{3}$。', focusToken: 'p17_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：由代入后的求根公式逆推原一元二次方程',
          givenLabel: '已知某方程用求根公式计算根的算式为：',
          givenFormula: '$x = \\frac{-3 \\pm \\sqrt{3^{2} - 4 \\times 2 \\times (-1)}}{2 \\times 2}$',
          extractedLabel: '对照求根公式结构：',
          extractedFormula: '$x = \\frac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}$',
          questionText: '该算式对应的一元二次方程一般形式是？',
          options: [
            { key: 'A', text: 'A. $2x^{2} + 3x - 1 = 0\\ (a = 2, b = 3, c = -1)$', isCorrect: true },
            { key: 'B', text: 'B. $2x^{2} - 3x - 1 = 0$', isCorrect: false },
            { key: 'C', text: 'C. $2x^{2} + 3x + 1 = 0$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！从分母、分子与根号内三处精确核对系数：',
            calcLines: [
              '分母 $2a = 2 \\times 2 \\implies a = 2$',
              '分子 $-b = -3 \\implies b = 3$（注意 $-b$ 是 $-3$，故 $b = +3$）',
              '根号内 $-4ac = -4 \\times 2 \\times (-1) \\implies c = -1$'
            ],
            summary: '还原一般形式即为 $2x^{2} + 3x - 1 = 0$。'
          },
          wrongTitle: '提示：请注意求根公式分子第一项是 -b',
          wrongFeedback: '当分子第一项为 $-3$ 时，对照 $-b = -3$ 可知 $b = +3$（而非 $-3$），且根号内最后一项为 $-1$ 即 $c = -1$，请再试一次。'
        },
        practice2: {
          title: '练习二：移项化一般式并提取系数 a, b, c 与 Δ',
          givenLabel: '已知一元二次方程：',
          givenFormula: '$2x^{2} - 4 = 3x$',
          questionText: '将其化为 $2x^{2} + bx + c = 0$（其中 $a = 2$）后，一次项系数 $b$ 和判别式 $\\Delta = b^{2} - 4ac$ 的值分别是多少？',
          input1Prefix: '$b =$',
          input1Placeholder: '如 -3',
          input2Prefix: '，$\\Delta =$',
          input2Placeholder: '如 41',
          input2Suffix: '',
          expectedX: '-3',
          expectedMin: '41',
          allowOrderSwap: false,
          correctFeedback: '$b = -3$，$\\Delta = 41$。',
          correctDetail: '移项得 $2x^{2} - 3x - 4 = 0$，故 $a = 2, b = -3, c = -4$；判别式 $\\Delta = (-3)^{2} - 4 \\times 2 \\times (-4) = 9 + 32 = 41$。',
          wrongFeedback: '将 $3x$ 移到左边变号得 $b = -3$（常数项 $c = -4$），再计算 $(-3)^{2} - 4 \\times 2 \\times (-4)$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '3',
              hint: '注意 $3x$ 在等号右边，移到等号左边后要变号为 $-3x$，因此 $b = -3$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P18：利用因式分解法解一元二次方程
    // =========================================================================
    P18: {
      procedureId: 'P18',
      title: '利用因式分解法解一元二次方程',
      exampleTitle: '用因式分解法解方程 $5x(x - 2) = 3(x - 2)$',
      exampleFormula: '$5x(x - 2) = 3(x - 2) \\implies (x - 2)(5x - 3) = 0$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示“严禁两边同除以含 x 因式防漏根”与整体提公因式法则）',
      practiceSectionTitle: '因式分解法解一元二次方程跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握移项提整体公因式防漏根与十字相乘法降次求解',

      steps: [
        {
          step: 1,
          name: '移项使等号右边化为 0（防漏根）',
          tStart: 0.0,
          tEnd: 6.2,
          explanation: '观察发现等号两边都含有括号因式 $(x - 2)$，切勿两边同除以 $(x - 2)$！应将右边的 $3(x - 2)$ 整体移到左边，得 $5x(x - 2) - 3(x - 2) = 0$。'
        },
        {
          step: 2,
          name: '提取公共的括号整体因式 $(x - 2)$',
          tStart: 6.2,
          tEnd: 13.0,
          explanation: '将 $(x - 2)$ 看作一个整体公因式提取出来，剩余的系数 $5x$ 与 $-3$ 放进第二个括号，分解为 $(x - 2)(5x - 3) = 0$。'
        },
        {
          step: 3,
          name: '利用 $A \\cdot B = 0$ 性质降次拆分方程',
          tStart: 13.0,
          tEnd: 19.0,
          explanation: '依据两因式乘积为 $0$ 则至少有一因式为 $0$，转化为两个一元一次方程：$x - 2 = 0$ 或 $5x - 3 = 0$。'
        },
        {
          step: 4,
          name: '分别求解两个一元一次方程',
          tStart: 19.0,
          tEnd: 24.8,
          explanation: '由 $x - 2 = 0$ 解得 $x_{1} = 2$；由 $5x - 3 = 0$ 移项除以 $5$ 解得 $x_{2} = \\frac{3}{5}$。'
        },
        {
          step: 5,
          name: '汇总原方程的两个实数根',
          tStart: 24.8,
          tEnd: 30.0,
          explanation: '写出最终结论：$x_{1} = 2，x_{2} = \\frac{3}{5}$（完整保留了使公因式为 $0$ 的根 $x = 2$）。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 整体移项得 $5x(x - 2) - 3(x - 2) = 0$' },
        { time: 7.5, step: 2, label: '2.1 提取整体公因式 $(x - 2)$ 得 $(x - 2)(5x - 3) = 0$' },
        { time: 14.2, step: 3, label: '3.1 降次拆分为 $x - 2 = 0$ 或 $5x - 3 = 0$' },
        { time: 20.5, step: 4, label: '4.1 分别解一次方程得 $x_{1} = 2, x_{2} = \\frac{3}{5}$' },
        { time: 26.5, step: 5, label: '5.1 汇总两根结论' }
      ],

      boardRows: [
        {
          rowId: 'p18_row_0',
          stepBadge: '原方程',
          appearAt: 0.0,
          tokens: [
            { id: 'p18_r0_lhs', math: '$5x(x - 2)$', appearAt: 0.0, dur: 0.01 },
            { id: 'p18_r0_eq', math: '$=$', appearAt: 0.0, dur: 0.01 },
            { id: 'p18_r0_rhs', math: '$3(x - 2)$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p18_row_1',
          stepBadge: '第 1 步 · 移项右边化 0',
          appearAt: 1.5,
          tokens: [
            { id: 'p18_r1_t1', math: '移项，得 $5x(x - 2)$', appearAt: 1.6, dur: 0.40 },
            { id: 'p18_r1_t2', math: '$- 3(x - 2) = 0$', appearAt: 2.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p18_row_2',
          stepBadge: '第 2 步 · 提整体公因式',
          appearAt: 6.6,
          tokens: [
            { id: 'p18_r2_fac1', math: '因式分解，得 $(x - 2)$', appearAt: 6.7, dur: 0.45 },
            { id: 'p18_r2_fac2', math: '$(5x - 3) = 0$', appearAt: 7.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p18_row_3',
          stepBadge: '第 3 步 · 降次拆为一次方程',
          appearAt: 13.4,
          tokens: [
            { id: 'p18_r3_eq1', math: '$\\therefore x - 2 = 0$', appearAt: 13.5, dur: 0.40 },
            { id: 'p18_r3_or', math: '或', appearAt: 14.2, dur: 0.25 },
            { id: 'p18_r3_eq2', math: '$5x - 3 = 0$', appearAt: 14.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p18_row_4',
          stepBadge: '最终结论',
          appearAt: 20.0,
          isConclusion: true,
          tokens: [
            { id: 'p18_r4_conc', math: '解得 $x_{1} = 2$，$x_{2} = \\frac{3}{5}$。', appearAt: 20.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p18_sp_1',
          title: '草稿警示 · 为什么绝对不能两边同除以 (x - 2)？',
          showStart: 0.8,
          showEnd: 18.8,
          tokens: [
            { id: 'p18_sp1_t1', math: '错误做法：两边同除以 $(x - 2)$ 得 $5x = 3 \\implies x = \\frac{3}{5}$', appearAt: 1.4, dur: 0.45 },
            { id: 'p18_sp1_t2', math: '错因：当 $x = 2$ 时，$x - 2 = 0$，等式两边不能除以 $0$！', appearAt: 3.0, dur: 0.45 },
            { id: 'p18_sp1_t3', math: '正确口诀：“先移项使右边为 $0$，再提公因式，绝不约含 $x$ 项”', appearAt: 7.0, dur: 0.45 }
          ],
          note: '同理，解 $x^{2} = 2x$ 时也必须先移项化为 $x^{2} - 2x = 0 \\implies x(x - 2) = 0$，防止漏掉 $x = 0$'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p18_r0_rhs', tStart: 0.8, tEnd: 5.8, color: 'amber' },
        { tokenId: 'p18_r1_t2', tStart: 2.5, tEnd: 6.0, color: 'amber' },
        { tokenId: 'p18_r2_fac1', tStart: 6.7, tEnd: 12.8, color: 'teal' },
        { tokenId: 'p18_r2_fac2', tStart: 7.8, tEnd: 12.8, color: 'amber' },
        { tokenId: 'p18_r3_eq1', tStart: 13.5, tEnd: 19.5, color: 'teal' },
        { tokenId: 'p18_r3_eq2', tStart: 14.6, tEnd: 19.5, color: 'rose' }
      ],

      svgAnnotations: [
        {
          id: 'p18_svg_s1',
          type: 'arrow',
          fromToken: 'p18_r0_rhs',
          toToken: 'p18_r1_t2',
          label: '整体移项变号',
          color: '#D97706',
          curveOffset: 28,
          tStart: 1.8,
          tDrawEnd: 2.6,
          tFadeStart: 5.4,
          tEnd: 6.0
        },
        {
          id: 'p18_svg_s2',
          type: 'under-brace',
          startToken: 'p18_r1_t1',
          endToken: 'p18_r1_t2',
          label: '提取公因式 $(x - 2)$',
          color: '#0F766E',
          tStart: 6.4,
          tDrawEnd: 7.2,
          tFadeStart: 12.0,
          tEnd: 12.6
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.2, text: '第一步移项使右边为 $0$：千万不能在两边直接约去 $(x - 2)$！先把右边的 $3(x - 2)$ 整体移到左边，得 $5x(x - 2) - 3(x - 2) = 0$。', focusToken: 'p18_r1_t2' },
        { tStart: 6.2, tEnd: 13.0, text: '第二步提取整体公因式：把 $(x - 2)$ 整体提出来，剩下的 $5x$ 和 $-3$ 组合成第二个因式，得到 $(x - 2)(5x - 3) = 0$。', focusToken: 'p18_r2_fac2' },
        { tStart: 13.0, tEnd: 19.0, text: '第三步降次拆分：两个因式相乘等于 $0$，则 $x - 2 = 0$ 或 $5x - 3 = 0$。', focusToken: 'p18_r3_eq2' },
        { tStart: 19.0, tEnd: 30.0, text: '第四步分别解两个一次方程：得出原方程的两个根为 $x_{1} = 2，x_{2} = \\frac{3}{5}$。求解完成！', focusToken: 'p18_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：提取括号公因式并注意去括号变号',
          givenLabel: '已知方程：',
          givenFormula: '$2(x - 1) = (x - 1)^{2}$',
          extractedLabel: '第一步移项使右边为 0：',
          extractedFormula: '$2(x - 1) - (x - 1)^{2} = 0$',
          questionText: '下一步提取公因式 $(x - 1)$ 后，正确的因式分解结果与方程的根是？',
          options: [
            { key: 'A', text: 'A. $(x - 1)(2 - x + 1) = 0$，解得 $x_{1} = 1，x_{2} = 3$', isCorrect: true },
            { key: 'B', text: 'B. $(x - 1)(2 - x - 1) = 0$，解得 $x_{1} = x_{2} = 1$', isCorrect: false },
            { key: 'C', text: 'C. 两边同除以 $(x - 1)$ 得 $x - 1 = 2$，解得 $x = 3$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！提取 (x - 1) 后，括号内减去 (x - 1) 必须变号：',
            calcLines: [
              '$(x - 1)[2 - (x - 1)] = (x - 1)(2 - x + 1) = (x - 1)(3 - x) = 0$',
              '$x - 1 = 0\\text{ 或 }3 - x = 0 \\implies x_{1} = 1,\\ x_{2} = 3$'
            ],
            summary: '提取公因式后，被减项 $(x - 1)$ 前面有负号，去小括号时 $-1$ 必须变号为 $+1$。'
          },
          wrongTitle: '提示：请检查提取 (x - 1) 后剩余项的去括号符号',
          wrongFeedback: '提取 $(x - 1)$ 后第二个括号内是 $2 - (x - 1) = 2 - x + 1$（而非 $2 - x - 1$），且不可两边同除以 $(x - 1)$，请再试一次。'
        },
        practice2: {
          title: '练习二：用十字相乘法分解因式解方程',
          givenLabel: '给出二次三项式方程：',
          givenFormula: '$x^{2} - 4x - 5 = 0$',
          questionText: '因式分解为 $(x - 5)(x + 1) = 0$ 后，这个方程的两个实数根分别是多少？',
          input1Prefix: '$x_{1} =$',
          input1Placeholder: '如 5',
          input2Prefix: '，$x_{2} =$',
          input2Placeholder: '如 -1',
          input2Suffix: '（两根顺序可互换）',
          expectedX: '5',
          expectedMin: '-1',
          allowOrderSwap: true,
          correctFeedback: '方程的两个实数根为 $x_{1} = 5$，$x_{2} = -1$。',
          correctDetail: '由 $(x - 5)(x + 1) = 0$ 得 $x - 5 = 0$ 或 $x + 1 = 0$，解得 $x_{1} = 5，x_{2} = -1$。',
          wrongFeedback: '令每个一次因式分别为 $0$：由 $x - 5 = 0$ 与 $x + 1 = 0$ 分别求出 $x$ 的值。',
          specificWrongHints: [
            {
              checkType: 'anyVal',
              val: '-5',
              hint: '注意因式是 $(x - 5)$，令 $x - 5 = 0$ 解得 $x = 5$（而非 $-5$），不要把因式中的常数符号直接当作根的符号。'
            }
          ]
        }
      }
    }    ,
    // =========================================================================
    // P19：识别一元二次方程、化一般形式与由定义求参数
    // =========================================================================
    P19: {
      procedureId: 'P19',
      title: '识别一元二次方程、化一般形式与由定义求参数',
      exampleTitle: '关于 $x$ 的方程 $(m - 2)x^{m^{2} - 2} - 5x - 1 = 0$ 是一元二次方程，求参数 $m$ 的值',
      exampleFormula: '$(m - 2)x^{m^{2} - 2} - 5x - 1 = 0 \\iff ax^{2} + bx + c = 0\\ (a \\neq 0)$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示一元二次方程三要素、一般式提取系数与“最高次指数=2 且 二次项系数≠0”双条件）',
      practiceSectionTitle: '一元二次方程概念、一般式与求参跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握化一般形式提取系数与含参定义双重条件',

      steps: [
        {
          step: 1,
          name: '对照一般形式提取最高次项系数与指数',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '将 $(m - 2)x^{m^{2} - 2} - 5x - 1 = 0$ 对照一般形式 $ax^{2} + bx + c = 0\\ (a \\neq 0)$，识别出最高次项系数为 $(m - 2)$，未知数 $x$ 的指数为 $(m^{2} - 2)$。'
        },
        {
          step: 2,
          name: '列出“指数等于 2 且 二次项系数不为 0”双条件',
          tStart: 6.0,
          tEnd: 12.2,
          explanation: '根据一元二次方程定义，必须同时满足两个条件：① 未知数最高次数等于 $2$（即 $m^{2} - 2 = 2$）；② 二次项系数不等于 $0$（即 $m - 2 \\neq 0$）。'
        },
        {
          step: 3,
          name: '由最高次项指数方程解出候选值',
          tStart: 12.2,
          tEnd: 18.2,
          explanation: '解指数方程 $m^{2} - 2 = 2$：移项得 $m^{2} = 4$，开平方解得候选值 $m_{1} = 2$ 或 $m_{2} = -2$。'
        },
        {
          step: 4,
          name: '检验二次项系数 $a \\neq 0$ 舍去增根',
          tStart: 18.2,
          tEnd: 24.5,
          explanation: '由二次项系数限制条件 $m - 2 \\neq 0$ 可知 $m \\neq 2$，故必须将使二次项消失的增根 $m = 2$ 舍去！'
        },
        {
          step: 5,
          name: '确定参数最终值并回代验证',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '保留唯一定解 $m = -2$（此时原方程为 $-4x^{2} - 5x - 1 = 0$，是一元二次方程）。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 识别系数 $(m - 2)$ 与指数 $(m^{2} - 2)$' },
        { time: 7.5, step: 2, label: '2.1 建立 $m^{2} - 2 = 2$ 且 $m - 2 \\neq 0$' },
        { time: 14.0, step: 3, label: '3.1 解 $m^{2} = 4$ 得 $m = \\pm 2$' },
        { time: 20.0, step: 4, label: '4.1 由 $m - 2 \\neq 0$ 舍去 $m = 2$' },
        { time: 26.5, step: 5, label: '5.1 定解 $m = -2$' }
      ],

      boardRows: [
        {
          rowId: 'p19_row_0',
          stepBadge: '已知方程',
          appearAt: 0.0,
          tokens: [
            { id: 'p19_r0_coef', math: '$(m - 2)$', appearAt: 0.0, dur: 0.01 },
            { id: 'p19_r0_exp', math: '$x^{m^{2} - 2}$', appearAt: 0.0, dur: 0.01 },
            { id: 'p19_r0_rest', math: '$- 5x - 1 = 0$ 是一元二次方程', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p19_row_1',
          stepBadge: '第 1 步 · 对照一般式',
          appearAt: 1.5,
          tokens: [
            { id: 'p19_r1_std', math: '对照 $ax^{2} + bx + c = 0\\ (a \\neq 0)$：', appearAt: 1.6, dur: 0.40 },
            { id: 'p19_r1_part', math: '二次项系数 $a = m - 2$，最高次指数 $= m^{2} - 2$', appearAt: 2.3, dur: 0.45 }
          ]
        },
        {
          rowId: 'p19_row_2',
          stepBadge: '第 2 步 · 列双重条件',
          appearAt: 6.4,
          tokens: [
            { id: 'p19_r2_c1', math: '① 次数条件：$m^{2} - 2 = 2$；', appearAt: 6.5, dur: 0.45 },
            { id: 'p19_r2_c2', math: '② 系数条件：$m - 2 \\neq 0$', appearAt: 8.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p19_row_3',
          stepBadge: '第 3 步 · 解指数方程',
          appearAt: 12.6,
          tokens: [
            { id: 'p19_r3_s1', math: '由 ① 得 $m^{2} = 4$', appearAt: 12.7, dur: 0.40 },
            { id: 'p19_r3_s2', math: '$\\implies m = 2$ 或 $m = -2$', appearAt: 14.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p19_row_4',
          stepBadge: '第 4 步 · 检验舍增根',
          appearAt: 18.6,
          tokens: [
            { id: 'p19_r4_chk', math: '由 ② 得 $m \\neq 2$', appearAt: 18.7, dur: 0.40 },
            { id: 'p19_r4_drop', math: '$\\implies$ 舍去 $m = 2$', appearAt: 20.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p19_row_5',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p19_r5_conc', math: '$\\therefore m$ 的值为 $-2$。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p19_sp_1',
          title: '核心准则 · 一元二次方程判定三要素与一般式',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p19_sp1_t1', math: '① 整式方程（分母、根号内不含未知数）', appearAt: 1.2, dur: 0.40 },
            { id: 'p19_sp1_t2', math: '② 只含一个未知数，且整理后最高次数为 $2$', appearAt: 2.2, dur: 0.40 },
            { id: 'p19_sp1_t3', math: '③ 二次项系数 $a \\neq 0$（展开后 $x^{2}$ 不抵消）', appearAt: 8.8, dur: 0.40 }
          ],
          note: '若 $m = 2$，则二次项系数 $m - 2 = 0$，原方程退化为一元一次方程 $-5x - 1 = 0$'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p19_r0_coef', tStart: 1.2, tEnd: 5.8, color: 'amber' },
        { tokenId: 'p19_r0_exp', tStart: 1.2, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p19_r2_c1', tStart: 6.5, tEnd: 12.0, color: 'teal' },
        { tokenId: 'p19_r2_c2', tStart: 8.5, tEnd: 12.0, color: 'amber' },
        { tokenId: 'p19_r3_s2', tStart: 14.2, tEnd: 18.0, color: 'teal' },
        { tokenId: 'p19_r4_drop', tStart: 20.0, tEnd: 24.4, color: 'rose' }
      ],

      svgAnnotations: [
        {
          id: 'p19_svg_s2',
          type: 'arrow',
          fromToken: 'p19_r0_exp',
          toToken: 'p19_r2_c1',
          label: '令最高次数等于 $2$',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 6.2,
          tDrawEnd: 7.0,
          tFadeStart: 11.4,
          tEnd: 12.0
        },
        {
          id: 'p19_svg_s4',
          type: 'arrow',
          fromToken: 'p19_r2_c2',
          toToken: 'p19_r4_drop',
          label: '二次项系数不为 $0$',
          color: '#BE123C',
          curveOffset: 32,
          tStart: 18.8,
          tDrawEnd: 19.8,
          tFadeStart: 23.6,
          tEnd: 24.2
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '第一步对照一般形式：在 $(m - 2)x^{m^{2} - 2} - 5x - 1 = 0$ 中，最高次项系数为 $(m - 2)$，指数为 $(m^{2} - 2)$。', focusToken: 'p19_r1_part' },
        { tStart: 6.0, tEnd: 12.2, text: '第二步列出定义双重条件：既要满足最高次项指数 $m^{2} - 2 = 2$，又要满足二次项系数 $m - 2 \\neq 0$。', focusToken: 'p19_r2_c2' },
        { tStart: 12.2, tEnd: 18.2, text: '第三步解指数方程：由 $m^{2} - 2 = 2$ 得 $m^{2} = 4$，解得 $m = 2$ 或 $m = -2$。', focusToken: 'p19_r3_s2' },
        { tStart: 18.2, tEnd: 24.5, text: '第四步检验二次项系数：因为 $m - 2 \\neq 0$ 即 $m \\neq 2$，必须舍去使二次项消失的 $m = 2$。', focusToken: 'p19_r4_drop' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步得出最终结论：$m = -2$！', focusToken: 'p19_r5_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：化为一元二次方程一般形式并提取系数',
          givenLabel: '已知一元二次方程：',
          givenFormula: '$x(x - 6) = 6x + 25$',
          extractedLabel: '去括号展开：',
          extractedFormula: '$x^{2} - 6x = 6x + 25$',
          questionText: '将其移项合并化为一般形式 $ax^{2} + bx + c = 0\\ (a = 1)$ 后，一次项系数 $b$ 和常数项 $c$ 分别是？',
          options: [
            { key: 'A', text: 'A. 一般式为 $x^{2} - 12x - 25 = 0$，其中 $b = -12，c = -25$', isCorrect: true },
            { key: 'B', text: 'B. 一般式为 $x^{2} - 25 = 0$，其中 $b = 0，c = -25$', isCorrect: false },
            { key: 'C', text: 'C. 一般式为 $x^{2} - 12x + 25 = 0$，其中 $b = -12，c = 25$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！移项必须变号，且连同各项前面的正负号提取系数：',
            calcLines: [
              '$x^{2} - 6x - 6x - 25 = 0 \\implies x^{2} - 12x - 25 = 0$',
              '$a = 1，\\ b = -12，\\ c = -25$'
            ],
            summary: '右边的 $+6x$ 移到左边变为 $-6x$，与原有的 $-6x$ 合并为 $-12x$（切勿误以为抵消）。'
          },
          wrongTitle: '提示：请注意移项变号后同类项的合并',
          wrongFeedback: '把右边的 $6x + 25$ 移到左边要变号为 $-6x - 25$，合并得 $x^{2} - 12x - 25 = 0$，请再试一次。'
        },
        practice2: {
          title: '练习二：利用一元二次方程定义求参数',
          givenLabel: '已知条件：',
          givenFormula: '关于 $x$ 的方程 $(a - 3)x^{|a| - 1} - x = 5$ 是一元二次方程',
          questionText: '由最高次项指数 $|a| - 1 = 2$ 可得 $|a|$ 等于多少？排除使二次项系数为 $0$ 的值后，$a$ 最终等于多少？',
          input1Prefix: '$|a| =$',
          input1Placeholder: '如 3',
          input2Prefix: '，最终定解 $a =$',
          input2Placeholder: '如 -3',
          input2Suffix: '',
          expectedX: '3',
          expectedMin: '-3',
          allowOrderSwap: false,
          correctFeedback: '$|a| = 3$，最终定解 $a = -3$。',
          correctDetail: '由 $|a| - 1 = 2$ 得 $|a| = 3 \\implies a = \\pm 3$；又因二次项系数 $a - 3 \\neq 0 \\implies a \\neq 3$，故 $a = -3$。',
          wrongFeedback: '先由 $|a| - 1 = 2$ 得 $|a| = 3$，再由 $a - 3 \\neq 0$ 舍去 $a = 3$。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '3',
              hint: '当 $a = 3$ 时，二次项系数 $a - 3 = 0$，方程不再是一元二次方程，必须舍去 $3$ 取 $a = -3$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P20：利用一元二次方程的根的定义代入求参数与整体降次求值
    // =========================================================================
    P20: {
      procedureId: 'P20',
      title: '利用一元二次方程的根的定义代入求参数与整体降次求值',
      exampleTitle: '已知 $m$ 是方程 $x^{2} - 3x - 2 = 0$ 的一个根，求代数式 $2m^{2} - 6m - 2023$ 的值',
      exampleFormula: '$m$ 是 $x^{2} - 3x - 2 = 0$ 的根 $\\implies m^{2} - 3m = 2 \\implies 2m^{2} - 6m - 2023 = ?$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示“见根代入得等式、移项提炼降次整体、提取公因数整体代换”三步法）',
      practiceSectionTitle: '方程根的定义代入与整体降次跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握含根为 0 的参数检验与整体降次求值',

      steps: [
        {
          step: 1,
          name: '将已知根 $x = m$ 代入原方程得等式',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '根据方程根的定义，因为 $m$ 是方程 $x^{2} - 3x - 2 = 0$ 的一个根，把 $x = m$ 代入原方程，得到等式 $m^{2} - 3m - 2 = 0$。'
        },
        {
          step: 2,
          name: '移项提炼降次核心整体 $m^{2} - 3m$',
          tStart: 6.0,
          tEnd: 12.2,
          explanation: '不解出无理数 $m$，而是将常数项 $-2$ 移到等号右边，直接提炼出核心整体 $m^{2} - 3m = 2$。'
        },
        {
          step: 3,
          name: '观察目标代数式与核心整体的倍数关系',
          tStart: 12.2,
          tEnd: 18.2,
          explanation: '观察所求代数式 $2m^{2} - 6m - 2023$ 的前两项 $2m^{2} - 6m$，其系数恰好是已知整体 $(m^{2} - 3m)$ 的 $2$ 倍。'
        },
        {
          step: 4,
          name: '提取公因数 2 构造整体并代换降次',
          tStart: 18.2,
          tEnd: 24.5,
          explanation: '对前两项提取公因数 $2$ 变形为 $2(m^{2} - 3m) - 2023$，将 $m^{2} - 3m = 2$ 整体代入，化为 $2 \\times 2 - 2023$。'
        },
        {
          step: 5,
          name: '计算有理数加减得出最终结果',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '计算 $4 - 2023 = -2019$，得出代数式的最终值为 $-2019$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 将 $x = m$ 代入得 $m^{2} - 3m - 2 = 0$' },
        { time: 7.5, step: 2, label: '2.1 移项提炼整体 $m^{2} - 3m = 2$' },
        { time: 14.0, step: 3, label: '3.1 发现 $2m^{2} - 6m = 2(m^{2} - 3m)$' },
        { time: 20.0, step: 4, label: '4.1 整体代入得 $2 \\times 2 - 2023$' },
        { time: 26.5, step: 5, label: '5.1 计算得出 $-2019$' }
      ],

      boardRows: [
        {
          rowId: 'p20_row_0',
          stepBadge: '已知与目标',
          appearAt: 0.0,
          tokens: [
            { id: 'p20_r0_cond', math: '已知 $m$ 是 $x^{2} - 3x - 2 = 0$ 的一个根，', appearAt: 0.0, dur: 0.01 },
            { id: 'p20_r0_target', math: '求 $2m^{2} - 6m - 2023$ 的值', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p20_row_1',
          stepBadge: '第 1 步 · 见根代入',
          appearAt: 1.5,
          tokens: [
            { id: 'p20_r1_sub', math: '把 $x = m$ 代入方程，得 $m^{2} - 3m - 2 = 0$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p20_row_2',
          stepBadge: '第 2 步 · 提炼整体',
          appearAt: 6.4,
          tokens: [
            { id: 'p20_r2_whole', math: '移项，得核心整体：$m^{2} - 3m = 2$', appearAt: 6.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p20_row_3',
          stepBadge: '第 3 & 4 步 · 构造并代换',
          appearAt: 12.8,
          tokens: [
            { id: 'p20_r3_fac', math: '原式 $= 2(m^{2} - 3m) - 2023$', appearAt: 12.9, dur: 0.45 },
            { id: 'p20_r3_rep', math: '$= 2 \\times 2 - 2023$', appearAt: 19.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p20_row_4',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p20_r4_conc', math: '$= 4 - 2023 = -2019$。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p20_sp_1',
          title: '核心技巧 · 方程的根三大常见考法',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p20_sp1_t1', math: '① 系数等式逆推根：$9a+3b+c=0 \\implies$ 必有根 $x=3$', appearAt: 1.4, dur: 0.40 },
            { id: 'p20_sp1_t2', math: '② 已知一根为 $0$：常数项 $=0$，且二次项系数 $a \\neq 0$', appearAt: 6.8, dur: 0.40 },
            { id: 'p20_sp1_t3', math: '③ 字母根求代数式：代入移项得 $am^{2}+bm=-c$ 整体降次', appearAt: 13.2, dur: 0.45 }
          ],
          note: '切勿用求根公式解出 $m = \\frac{3 \\pm \\sqrt{17}}{2}$ 再代入平方，整体代换只需两步口算'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p20_r1_sub', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p20_r2_whole', tStart: 6.5, tEnd: 12.0, color: 'amber' },
        { tokenId: 'p20_r3_fac', tStart: 12.9, tEnd: 18.8, color: 'teal' },
        { tokenId: 'p20_r3_rep', tStart: 19.0, tEnd: 24.4, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p20_svg_s2',
          type: 'arrow',
          fromToken: 'p20_r1_sub',
          toToken: 'p20_r2_whole',
          label: '常数项 $-2$ 移到右边',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 6.2,
          tDrawEnd: 7.0,
          tFadeStart: 11.4,
          tEnd: 12.0
        },
        {
          id: 'p20_svg_s4',
          type: 'arrow',
          fromToken: 'p20_r2_whole',
          toToken: 'p20_r3_rep',
          label: '整体替换 $m^{2} - 3m = 2$',
          color: '#D97706',
          curveOffset: 30,
          tStart: 18.6,
          tDrawEnd: 19.4,
          tFadeStart: 23.6,
          tEnd: 24.2
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '第一步见根代入：因为 $m$ 是方程 $x^{2} - 3x - 2 = 0$ 的一个根，把 $x = m$ 代入得 $m^{2} - 3m - 2 = 0$。', focusToken: 'p20_r1_sub' },
        { tStart: 6.0, tEnd: 12.2, text: '第二步移项提炼整体：不用解出 $m$ 的具体值，直接把 $-2$ 移到右边，得到核心整体 $m^{2} - 3m = 2$。', focusToken: 'p20_r2_whole' },
        { tStart: 12.2, tEnd: 18.2, text: '第三步构造已知整体：将目标式 $2m^{2} - 6m - 2023$ 的前两项提取公因数 $2$，变形为 $2(m^{2} - 3m) - 2023$。', focusToken: 'p20_r3_fac' },
        { tStart: 18.2, tEnd: 24.5, text: '第四步整体代换降次：把括号里的 $(m^{2} - 3m)$ 直接替换为常数 $2$，得到 $2 \\times 2 - 2023$。', focusToken: 'p20_r3_rep' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步算出结果：$4 - 2023 = -2019$！', focusToken: 'p20_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：已知一元二次方程有一个根为 0 求参数（含二次项系数检验）',
          givenLabel: '已知条件：',
          givenFormula: '关于 $x$ 的一元二次方程 $(k + 2)x^{2} + 3x + k^{2} - 4 = 0$ 的一个根为 $0$',
          extractedLabel: '将 $x = 0$ 代入方程：',
          extractedFormula: '$k^{2} - 4 = 0 \\implies k = 2\\text{ 或 }k = -2$',
          questionText: '结合“关于 $x$ 的一元二次方程”这一前提，参数 $k$ 的正确值是？',
          options: [
            { key: 'A', text: 'A. $k = 2$（因为 $k + 2 \\neq 0$，必须舍去 $k = -2$）', isCorrect: true },
            { key: 'B', text: 'B. $k = 2$ 或 $k = -2$', isCorrect: false },
            { key: 'C', text: 'C. $k = -2$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！代入求参后必须检验二次项系数不为 0：',
            calcLines: [
              '将 $x = 0$ 代入得常数项 $k^{2} - 4 = 0 \\implies k = \\pm 2$',
              '又因二次项系数 $k + 2 \\neq 0 \\implies k \\neq -2$，故 $k = 2$'
            ],
            summary: '凡题干指明“一元二次方程”且二次项含参，最后一步务必核对二次项系数 $\\neq 0$。'
          },
          wrongTitle: '提示：请检查当 k = -2 时二次项系数的值',
          wrongFeedback: '当 $k = -2$ 时，二次项系数 $k + 2 = 0$，原方程不再是一元二次方程，故须舍去 $-2$，请再试一次。'
        },
        practice2: {
          title: '练习二：由系数关系式逆推特解与整体降次求值',
          givenLabel: '已知条件：',
          givenFormula: '① 方程 $ax^{2} + bx + c = 0$ 满足 $4a - 2b + c = 0$；② $m$ 是 $x^{2} - 4x + 1 = 0$ 的根',
          questionText: '由 ① 可知方程 $ax^{2} + bx + c = 0$ 必有一个根 $x_{0}$ 是多少？由 ② 可知代数式 $3m^{2} - 12m + 10$ 的值是多少？',
          input1Prefix: '必有根 $x_{0} =$',
          input1Placeholder: '如 -2',
          input2Prefix: '，$3m^{2} - 12m + 10 =$',
          input2Placeholder: '如 7',
          input2Suffix: '',
          expectedX: '-2',
          expectedMin: '7',
          allowOrderSwap: false,
          correctFeedback: '必有根 $x_{0} = -2$，代数式 $3m^{2} - 12m + 10 = 7$。',
          correctDetail: '① $4a - 2b + c = a(-2)^{2} + b(-2) + c = 0$，故必有根 $x_{0} = -2$；② 由 $m^{2} - 4m + 1 = 0$ 得 $m^{2} - 4m = -1$，故 $3(m^{2} - 4m) + 10 = 3 \\times (-1) + 10 = 7$。',
          wrongFeedback: '① 注意 $-2b = b \\cdot (-2)$，故 $x_{0} = -2$；② 由 $m^{2} - 4m = -1$ 代入 $3(m^{2} - 4m) + 10$ 计算。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '2',
              hint: '注意已知等式中间是 $-2b$，当 $x = -2$ 时才是 $4a - 2b + c = 0$，所以必有根是 $-2$ 而不是 $2$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P21：利用一元二次方程根与系数的关系（韦达定理）求对称式的值与参数
    // =========================================================================
    P21: {
      procedureId: 'P21',
      title: '利用一元二次方程根与系数的关系（韦达定理）求对称式的值与参数',
      exampleTitle: '已知 $x_{1}, x_{2}$ 是关于 $x$ 的方程 $x^{2} - 2kx + k - 1 = 0$ 的两个不相等的实数根，且 $x_{1} + x_{2} - x_{1}x_{2} = 5$，求 $k$ 的值',
      exampleFormula: '$x^{2} - 2kx + k - 1 = 0：x_{1} + x_{2} = -\\frac{b}{a}，x_{1}x_{2} = \\frac{c}{a}$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示韦达定理基本公式、四大高频对称式变形与判别式 Δ≥0 验根法则）',
      practiceSectionTitle: '根与系数的关系（韦达定理）跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握对称式恒等变形求值与含参韦达定理验根',

      steps: [
        {
          step: 1,
          name: '确认一般形式并提取系数 $a, b, c$',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '方程 $x^{2} - 2kx + k - 1 = 0$ 已是一般形式，提取二次项系数 $a = 1$、一次项系数 $b = -2k$、常数项 $c = k - 1$。'
        },
        {
          step: 2,
          name: '由韦达定理写出 $x_{1} + x_{2}$ 与 $x_{1}x_{2}$',
          tStart: 5.8,
          tEnd: 12.2,
          explanation: '根据根与系数的关系，写出两根之和 $x_{1} + x_{2} = -\\frac{b}{a} = -\\frac{-2k}{1} = 2k$，两根之积 $x_{1}x_{2} = \\frac{c}{a} = k - 1$。'
        },
        {
          step: 3,
          name: '整体代入已知关系式建立关于 $k$ 的方程',
          tStart: 12.2,
          tEnd: 18.2,
          explanation: '将 $x_{1} + x_{2} = 2k$ 与 $x_{1}x_{2} = k - 1$ 代入 $x_{1} + x_{2} - x_{1}x_{2} = 5$（注意给多项式 $k - 1$ 加括号），得 $2k - (k - 1) = 5$。'
        },
        {
          step: 4,
          name: '去括号解出参数 $k$ 的值',
          tStart: 18.2,
          tEnd: 24.0,
          explanation: '去括号得 $2k - k + 1 = 5$，合并移项解得 $k = 4$。'
        },
        {
          step: 5,
          name: '代入原方程检验根的判别式 $\\Delta \\gt 0$',
          tStart: 24.0,
          tEnd: 30.0,
          explanation: '当 $k = 4$ 时，原方程为 $x^{2} - 8x + 3 = 0$，检验判别式 $\\Delta = (-8)^{2} - 4 \\times 1 \\times 3 = 52 \\gt 0$ 满足有两个不相等实根，定解 $k = 4$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 提取系数 $a = 1, b = -2k, c = k - 1$' },
        { time: 7.5, step: 2, label: '2.1 写出 $x_{1} + x_{2} = 2k$，$x_{1}x_{2} = k - 1$' },
        { time: 14.0, step: 3, label: '3.1 整体代入得 $2k - (k - 1) = 5$' },
        { time: 20.0, step: 4, label: '4.1 去括号解得 $k = 4$' },
        { time: 26.0, step: 5, label: '5.1 检验 $\\Delta = 52 \\gt 0$ 符合题意' }
      ],

      boardRows: [
        {
          rowId: 'p21_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p21_r0_eq', math: '方程 $x^{2} - 2kx + k - 1 = 0$ 有两不相等实根 $x_{1}, x_{2}$，', appearAt: 0.0, dur: 0.01 },
            { id: 'p21_r0_rel', math: '且 $x_{1} + x_{2} - x_{1}x_{2} = 5$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p21_row_1',
          stepBadge: '第 1 & 2 步 · 韦达定理',
          appearAt: 1.5,
          tokens: [
            { id: 'p21_r1_sum', math: '由根与系数的关系得：$x_{1} + x_{2} = -\\frac{-2k}{1} = 2k$，', appearAt: 1.6, dur: 0.45 },
            { id: 'p21_r1_prod', math: '$x_{1}x_{2} = \\frac{k - 1}{1} = k - 1$', appearAt: 6.4, dur: 0.45 }
          ]
        },
        {
          rowId: 'p21_row_2',
          stepBadge: '第 3 步 · 整体代入关系式',
          appearAt: 12.6,
          tokens: [
            { id: 'p21_r2_sub', math: '代入 $x_{1} + x_{2} - x_{1}x_{2} = 5$，得 $2k - (k - 1) = 5$', appearAt: 12.7, dur: 0.45 }
          ]
        },
        {
          rowId: 'p21_row_3',
          stepBadge: '第 4 步 · 解出参数 k',
          appearAt: 18.6,
          tokens: [
            { id: 'p21_r3_sol', math: '去括号得 $2k - k + 1 = 5 \\implies k = 4$', appearAt: 18.7, dur: 0.45 }
          ]
        },
        {
          rowId: 'p21_row_4',
          stepBadge: '第 5 步 · 检验 Δ > 0',
          appearAt: 24.4,
          isConclusion: true,
          tokens: [
            { id: 'p21_r4_conc', math: '检验：当 $k = 4$ 时，$\\Delta = (-8)^{2} - 4 \\times 3 = 52 \\gt 0$ 成立，$\\therefore k = 4$。', appearAt: 24.5, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p21_sp_1',
          title: '必备工具箱 · 韦达定理四大高频对称式恒等变形',
          showStart: 5.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p21_sp1_t1', math: '① 倒数和：$\\frac{1}{x_{1}} + \\frac{1}{x_{2}} = \\frac{x_{1} + x_{2}}{x_{1}x_{2}}$', appearAt: 6.4, dur: 0.40 },
            { id: 'p21_sp1_t2', math: '② 括号积：$(x_{1} + 1)(x_{2} + 1) = x_{1}x_{2} + (x_{1} + x_{2}) + 1$', appearAt: 7.4, dur: 0.40 },
            { id: 'p21_sp1_t3', math: '③ 平方和：$x_{1}^{2} + x_{2}^{2} = (x_{1} + x_{2})^{2} - 2x_{1}x_{2}$', appearAt: 8.4, dur: 0.40 },
            { id: 'p21_sp1_t4', math: '④ 差平方：$(x_{1} - x_{2})^{2} = (x_{1} + x_{2})^{2} - 4x_{1}x_{2}$', appearAt: 9.4, dur: 0.40 }
          ],
          note: '易错提醒：两根之和是 $-\\frac{b}{a}$（带负号），且含参求值后必须检验 $\\Delta \\ge 0$'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p21_r1_sum', tStart: 1.6, tEnd: 6.2, color: 'teal' },
        { tokenId: 'p21_r1_prod', tStart: 6.4, tEnd: 12.0, color: 'amber' },
        { tokenId: 'p21_r2_sub', tStart: 12.7, tEnd: 18.0, color: 'amber' },
        { tokenId: 'p21_r3_sol', tStart: 18.7, tEnd: 23.8, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p21_svg_s3',
          type: 'arrow',
          fromToken: 'p21_r1_prod',
          toToken: 'p21_r2_sub',
          label: '加括号代入 $-(k - 1)$',
          color: '#D97706',
          curveOffset: 28,
          tStart: 12.4,
          tDrawEnd: 13.2,
          tFadeStart: 17.4,
          tEnd: 18.0
        },
        {
          id: 'p21_svg_s5',
          type: 'arrow',
          fromToken: 'p21_r3_sol',
          toToken: 'p21_r4_conc',
          label: '回代检验 $\\Delta \\gt 0$',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 24.0,
          tDrawEnd: 24.8,
          tFadeStart: 28.8,
          tEnd: 29.5
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步提取系数并写两根之和：在 $x^{2} - 2kx + k - 1 = 0$ 中，$b = -2k$，故 $x_{1} + x_{2} = -\\frac{-2k}{1} = 2k$（注意负负得正）。', focusToken: 'p21_r1_sum' },
        { tStart: 5.8, tEnd: 12.2, text: '第二步写两根之积：常数项 $c = k - 1$，故 $x_{1}x_{2} = \\frac{k - 1}{1} = k - 1$。', focusToken: 'p21_r1_prod' },
        { tStart: 12.2, tEnd: 18.2, text: '第三步整体代入关系式：把 $2k$ 和 $k - 1$ 代入 $x_{1} + x_{2} - x_{1}x_{2} = 5$，注意减去 $(k - 1)$ 要加括号！', focusToken: 'p21_r2_sub' },
        { tStart: 18.2, tEnd: 24.0, text: '第四步解方程：去括号得 $2k - k + 1 = 5$，解得 $k = 4$。', focusToken: 'p21_r3_sol' },
        { tStart: 24.0, tEnd: 30.0, text: '第五步检验判别式：当 $k = 4$ 时，$\\Delta = (-8)^{2} - 4 \\times 3 = 52 \\gt 0$ 满足有两个不相等的实数根，故 $k = 4$！', focusToken: 'p21_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：利用韦达定理求倒数和对称式的值',
          givenLabel: '已知条件：',
          givenFormula: '设 $x_{1}, x_{2}$ 是方程 $2x^{2} + 4x - 3 = 0$ 的两个实数根',
          extractedLabel: '由韦达定理写出两根之和与两根之积：',
          extractedFormula: '$x_{1} + x_{2} = -\\frac{4}{2} = -2，\\quad x_{1}x_{2} = -\\frac{3}{2}$',
          questionText: '将 $\\frac{1}{x_{1}} + \\frac{1}{x_{2}}$ 通分变形并代入求值，正确的结果是？',
          options: [
            { key: 'A', text: 'A. $\\frac{x_{1} + x_{2}}{x_{1}x_{2}} = \\frac{-2}{-\\frac{3}{2}} = \\frac{4}{3}$', isCorrect: true },
            { key: 'B', text: 'B. $\\frac{x_{1} + x_{2}}{x_{1}x_{2}} = -\\frac{4}{3}$', isCorrect: false },
            { key: 'C', text: 'C. $\\frac{1}{x_{1} + x_{2}} = -\\frac{1}{2}$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！异分母分式相加先通分，再整体代入：',
            calcLines: [
              '$\\frac{1}{x_{1}} + \\frac{1}{x_{2}} = \\frac{x_{2} + x_{1}}{x_{1}x_{2}} = \\frac{-2}{-\\frac{3}{2}} = (-2) \\times \\left(-\\frac{2}{3}\\right) = \\frac{4}{3}$'
            ],
            summary: '注意二次项系数 $a = 2 \\neq 1$，算两根之和与积时切勿忘记除以 $2$。'
          },
          wrongTitle: '提示：请先通分为 (x₁ + x₂)/(x₁x₂) 并注意同号相除得正',
          wrongFeedback: '通分得 $\\frac{x_{1} + x_{2}}{x_{1}x_{2}}$，将 $-2$ 与 $-\\frac{3}{2}$ 代入相除（同号得正）得 $\\frac{4}{3}$，请再试一次。'
        },
        practice2: {
          title: '练习二：利用韦达定理与完全平方变形求值',
          givenLabel: '已知条件：',
          givenFormula: '$x_{1}, x_{2}$ 是一元二次方程 $x^{2} - 3x - 1 = 0$ 的两个实数根',
          questionText: '由韦达定理可知两根之和 $x_{1} + x_{2}$ 是多少？平方和 $x_{1}^{2} + x_{2}^{2} = (x_{1} + x_{2})^{2} - 2x_{1}x_{2}$ 的值是多少？',
          input1Prefix: '$x_{1} + x_{2} =$',
          input1Placeholder: '如 3',
          input2Prefix: '，$x_{1}^{2} + x_{2}^{2} =$',
          input2Placeholder: '如 11',
          input2Suffix: '',
          expectedX: '3',
          expectedMin: '11',
          allowOrderSwap: false,
          correctFeedback: '$x_{1} + x_{2} = 3$，$x_{1}^{2} + x_{2}^{2} = 11$。',
          correctDetail: '由 $x^{2} - 3x - 1 = 0$ 得 $x_{1} + x_{2} = 3$，$x_{1}x_{2} = -1$；故 $x_{1}^{2} + x_{2}^{2} = (x_{1} + x_{2})^{2} - 2x_{1}x_{2} = 3^{2} - 2 \\times (-1) = 9 + 2 = 11$。',
          wrongFeedback: '先由 $x_{1} + x_{2} = -\\frac{-3}{1} = 3$、$x_{1}x_{2} = -1$，再代入 $3^{2} - 2 \\times (-1)$ 计算。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '-3',
              hint: '注意韦达定理公式是 $x_{1} + x_{2} = -\\frac{b}{a}$，因为 $b = -3$，所以 $-\\frac{-3}{1} = +3$。'
            },
            {
              checkType: 'secondVal',
              val: '7',
              hint: '注意 $x_{1}x_{2} = -1$（带负号），所以 $-2x_{1}x_{2} = -2 \\times (-1) = +2$，$9 + 2 = 11$ 而不是 $9 - 2 = 7$。'
            }
          ]
        }
      }
    }    ,
    // =========================================================================
    // P22：利用去括号、移项与合并同类项解一元一次方程
    // =========================================================================
    P22: {
      procedureId: 'P22',
      title: '利用去括号、移项与合并同类项解一元一次方程',
      exampleTitle: '解一元一次方程 $6 - 2(x - 3) = x$',
      exampleFormula: '$6 - 2(x - 3) = x \\implies -3x = -12 \\implies x = 4$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示负因数去括号变号、跨等号移项变号与系数化为 1 三大法则）',
      practiceSectionTitle: '解一元一次方程关键动作跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握负号去括号、移项变号与系数化为 1',

      steps: [
        {
          step: 1,
          name: '运用乘法分配律去括号（注意负负得正）',
          tStart: 0.0,
          tEnd: 6.2,
          explanation: '观察左边括号前的因数是 $-2$，用 $-2$ 分别乘以括号内的 $x$ 和 $-3$，注意 $(-2) \\times (-3) = +6$（变号），去括号得 $6 - 2x + 6 = x$。'
        },
        {
          step: 2,
          name: '将未知数项移到左边、常数项移到右边',
          tStart: 6.2,
          tEnd: 12.8,
          explanation: '把等号右边的 $+x$ 移到左边变为 $-x$，把等号左边的两个常数 $+6$ 移到右边变为 $-6 - 6$，得到 $-2x - x = -6 - 6$。'
        },
        {
          step: 3,
          name: '合并等号左右两边的同类项',
          tStart: 12.8,
          tEnd: 18.8,
          explanation: '左边合并同类项 $(-2 - 1)x = -3x$，右边合并常数 $-6 - 6 = -12$，化为最简形式 $-3x = -12$。'
        },
        {
          step: 4,
          name: '等式两边同除以未知数系数 -3',
          tStart: 18.8,
          tEnd: 24.5,
          explanation: '在 $-3x = -12$ 两边同时除以未知数系数 $-3$，将 $x$ 的系数化为 $1$，即 $x = \\frac{-12}{-3}$。'
        },
        {
          step: 5,
          name: '同号相除得正，写出方程的解',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '根据同号两数相除得正，计算 $\\frac{-12}{-3} = 4$，得出方程的解为 $x = 4$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 用 $-2$ 乘遍 $(x - 3)$ 得 $6 - 2x + 6 = x$' },
        { time: 7.5, step: 2, label: '2.1 跨等号移项变号得 $-2x - x = -6 - 6$' },
        { time: 14.0, step: 3, label: '3.1 合并同类项化为 $-3x = -12$' },
        { time: 20.0, step: 4, label: '4.1 两边同除以系数 $-3$' },
        { time: 26.0, step: 5, label: '5.1 得出方程的解 $x = 4$' }
      ],

      boardRows: [
        {
          rowId: 'p22_row_0',
          stepBadge: '原方程',
          appearAt: 0.0,
          tokens: [
            { id: 'p22_r0_6', math: '$6$', appearAt: 0.0, dur: 0.01 },
            { id: 'p22_r0_m2', math: '$- 2(x - 3)$', appearAt: 0.0, dur: 0.01 },
            { id: 'p22_r0_eqx', math: '$= x$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p22_row_1',
          stepBadge: '第 1 步 · 去括号',
          appearAt: 1.5,
          tokens: [
            { id: 'p22_r1_6', math: '去括号，得 $6 - 2x$', appearAt: 1.6, dur: 0.40 },
            { id: 'p22_r1_p6', math: '$+ 6$', appearAt: 2.5, dur: 0.45 },
            { id: 'p22_r1_eqx', math: '$= x$', appearAt: 3.1, dur: 0.35 }
          ]
        },
        {
          rowId: 'p22_row_2',
          stepBadge: '第 2 步 · 移项变号',
          appearAt: 6.6,
          tokens: [
            { id: 'p22_r2_lhs', math: '移项，得 $-2x - x$', appearAt: 6.7, dur: 0.45 },
            { id: 'p22_r2_rhs', math: '$= -6 - 6$', appearAt: 7.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p22_row_3',
          stepBadge: '第 3 步 · 合并同类项',
          appearAt: 13.2,
          tokens: [
            { id: 'p22_r3_comb', math: '合并同类项，得 $-3x = -12$', appearAt: 13.3, dur: 0.50 }
          ]
        },
        {
          rowId: 'p22_row_4',
          stepBadge: '第 4 & 5 步 · 系数化为 1',
          appearAt: 19.2,
          isConclusion: true,
          tokens: [
            { id: 'p22_r4_div', math: '系数化为 $1$，得 $x = \\frac{-12}{-3} = 4$。', appearAt: 19.3, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p22_sp_1',
          title: '草稿警示 · 解一元一次方程三大高频易错点',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p22_sp1_t1', math: '① 负号去括号：$-2(x - 3) = -2x + 6$（切勿写成 $-2x - 6$ 或 $-2x - 3$）', appearAt: 1.4, dur: 0.45 },
            { id: 'p22_sp1_t2', math: '② 跨等号移项：过等号必须变号，不过等号不变号', appearAt: 6.8, dur: 0.45 },
            { id: 'p22_sp1_t3', math: '③ 系数化为 $1$：$ax = b \\implies x = \\frac{b}{a}$（未知数系数 $a$ 作分母）', appearAt: 19.4, dur: 0.45 }
          ],
          note: '算完后可口头回代检验：左边 $= 6 - 2 \\times (4 - 3) = 4 =$ 右边，100% 确认无误'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p22_r0_m2', tStart: 0.8, tEnd: 5.8, color: 'amber' },
        { tokenId: 'p22_r1_p6', tStart: 2.5, tEnd: 6.0, color: 'rose' },
        { tokenId: 'p22_r2_lhs', tStart: 6.7, tEnd: 12.5, color: 'teal' },
        { tokenId: 'p22_r2_rhs', tStart: 7.8, tEnd: 12.5, color: 'amber' },
        { tokenId: 'p22_r3_comb', tStart: 13.3, tEnd: 18.6, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p22_svg_s1',
          type: 'arrow',
          fromToken: 'p22_r0_m2',
          toToken: 'p22_r1_p6',
          label: '$(-2) \\times (-3) = +6$',
          color: '#BE123C',
          curveOffset: 28,
          tStart: 1.8,
          tDrawEnd: 2.6,
          tFadeStart: 5.4,
          tEnd: 6.0
        },
        {
          id: 'p22_svg_s2',
          type: 'arrow',
          fromToken: 'p22_r1_eqx',
          toToken: 'p22_r2_lhs',
          label: '跨等号移项变号',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 6.8,
          tDrawEnd: 7.6,
          tFadeStart: 11.8,
          tEnd: 12.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.2, text: '第一步去括号：括号前是 $-2$，乘进括号时两项都要乘且都要变号，$(-2) \\times (-3) = +6$，得 $6 - 2x + 6 = x$。', focusToken: 'p22_r1_p6' },
        { tStart: 6.2, tEnd: 12.8, text: '第二步移项：把右边的 $x$ 移到左边变号为 $-x$，左边的两个 $+6$ 移到右边变号为 $-6 - 6$。', focusToken: 'p22_r2_rhs' },
        { tStart: 12.8, tEnd: 18.8, text: '第三步合并同类项：左边 $-2x - x = -3x$，右边 $-6 - 6 = -12$，化为 $-3x = -12$。', focusToken: 'p22_r3_comb' },
        { tStart: 18.8, tEnd: 30.0, text: '第四步系数化为 $1$：等式两边同除以 $-3$，同号相除得正，解得 $x = 4$！', focusToken: 'p22_r4_div' }
      ],

      practices: {
        practice1: {
          title: '练习一：辨析移项与系数化为 1 的正确变形',
          givenLabel: '给出四个方程的变形过程：',
          givenFormula: '① $3x + 6 = 0 \\to x = 2$；② $x + 7 = 5 - 3x \\to 4x = -2$；③ $4x = -2 \\to x = -2$',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '其中变形完全正确的是哪一个？若继续解 $4x = -2$，正确的解是？',
          options: [
            { key: 'A', text: 'A. ② 正确；由 $4x = -2$ 两边同除以 $4$ 得 $x = -\\frac{1}{2}$', isCorrect: true },
            { key: 'B', text: 'B. ② 和 ③ 都正确，解为 $x = -2$', isCorrect: false },
            { key: 'C', text: 'C. ① 正确，解为 $x = 2$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！移项要变号，系数化为 1 时必须除以未知数的系数：',
            calcLines: [
              '② $x + 7 = 5 - 3x \\implies x + 3x = 5 - 7 \\implies 4x = -2$ ✓',
              '系数化为 $1$：$x = \\frac{-2}{4} = -\\frac{1}{2}$（切勿用 $4 \\div (-2)$ 得 $-2$）'
            ],
            summary: '在 $ax = b$ 中，永远是用等号右边的 $b$ 除以未知数系数 $a$。'
          },
          wrongTitle: '提示：请检查移项符号与除法中的除数',
          wrongFeedback: '① 移项应为 $3x = -6 \\implies x = -2$；③ 在 $4x = -2$ 两边应同除以 $4$ 得 $x = -\\frac{1}{2}$，请再试一次。'
        },
        practice2: {
          title: '练习二：去括号解一元一次方程',
          givenLabel: '已知一元一次方程：',
          givenFormula: '$3(x - 2) = 4 - 2x$',
          questionText: '去括号、移项并合并为 $ax = 10$ 时，系数 $a$ 是多少？最终解出的 $x$ 是多少？',
          input1Prefix: '合并后系数 $a =$',
          input1Placeholder: '如 5',
          input2Prefix: '，方程的解 $x =$',
          input2Placeholder: '如 2',
          input2Suffix: '',
          expectedX: '5',
          expectedMin: '2',
          allowOrderSwap: false,
          correctFeedback: '合并为 $5x = 10$（$a = 5$），解得 $x = 2$。',
          correctDetail: '去括号得 $3x - 6 = 4 - 2x$，移项得 $3x + 2x = 4 + 6$，合并得 $5x = 10$（故 $a = 5$），解得 $x = 2$。',
          wrongFeedback: '去括号得 $3x - 6 = 4 - 2x$，将 $-2x$ 移到左边变为 $+2x$，将 $-6$ 移到右边变为 $+6$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '1',
              hint: '注意右边的 $-2x$ 移到左边要变号为 $+2x$，所以左边是 $3x + 2x = 5x$ 而不是 $3x - 2x = 1x$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P23：运用完全平方公式展开整式与恒等变形求值
    // =========================================================================
    P23: {
      procedureId: 'P23',
      title: '运用完全平方公式展开整式与恒等变形求值',
      exampleTitle: '已知 $a^{2} - 3a - 7 = 0$，求代数式 $(a - 1)^{2} + a(a - 4) - 2$ 的值',
      exampleFormula: '$a^{2} - 3a = 7 \\implies (a - 1)^{2} + a(a - 4) - 2 = ?$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示完全平方展开口诀、完全平方式判别与“知二求二”对称变形公式）',
      practiceSectionTitle: '完全平方公式展开与变形求值跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握完全平方式参数求解与完全平方恒等变形',

      steps: [
        {
          step: 1,
          name: '由已知方程移项提炼整体 $a^{2} - 3a = 7$',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '由已知 $a^{2} - 3a - 7 = 0$，将常数项 $-7$ 移到等号右边，提炼出核心整体 $a^{2} - 3a = 7$。'
        },
        {
          step: 2,
          name: '按完全平方公式展开 $(a - 1)^{2}$ 与单项式乘法',
          tStart: 5.8,
          tEnd: 12.5,
          explanation: '按“首平方、尾平方，首尾两倍中间放”将 $(a - 1)^{2}$ 展开为 $a^{2} - 2a + 1$，同时将 $a(a - 4)$ 展开为 $a^{2} - 4a$。'
        },
        {
          step: 3,
          name: '合并同类项化为最简多项式',
          tStart: 12.5,
          tEnd: 18.5,
          explanation: '合并二次项 $a^{2} + a^{2} = 2a^{2}$、一次项 $-2a - 4a = -6a$、常数项 $1 - 2 = -1$，化简为 $2a^{2} - 6a - 1$。'
        },
        {
          step: 4,
          name: '提取公因数 2 构造已知整体 $(a^{2} - 3a)$',
          tStart: 18.5,
          tEnd: 24.5,
          explanation: '对前两项 $2a^{2} - 6a$ 提取公因数 $2$，变形为 $2(a^{2} - 3a) - 1$。'
        },
        {
          step: 5,
          name: '整体代入 $a^{2} - 3a = 7$ 算出结果',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '将 $a^{2} - 3a = 7$ 整体代入得 $2 \\times 7 - 1 = 13$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 移项提炼整体 $a^{2} - 3a = 7$' },
        { time: 7.5, step: 2, label: '2.1 展开 $(a - 1)^{2} = a^{2} - 2a + 1$ 与 $a(a - 4) = a^{2} - 4a$' },
        { time: 14.0, step: 3, label: '3.1 合并同类项得 $2a^{2} - 6a - 1$' },
        { time: 20.0, step: 4, label: '4.1 提取 $2$ 构造 $2(a^{2} - 3a) - 1$' },
        { time: 26.0, step: 5, label: '5.1 整体代入得 $2 \\times 7 - 1 = 13$' }
      ],

      boardRows: [
        {
          rowId: 'p23_row_0',
          stepBadge: '已知与目标',
          appearAt: 0.0,
          tokens: [
            { id: 'p23_r0_cond', math: '已知 $a^{2} - 3a - 7 = 0$，', appearAt: 0.0, dur: 0.01 },
            { id: 'p23_r0_target', math: '求 $(a - 1)^{2} + a(a - 4) - 2$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p23_row_1',
          stepBadge: '第 1 步 · 提炼整体',
          appearAt: 1.5,
          tokens: [
            { id: 'p23_r1_whole', math: '由已知移项，得 $a^{2} - 3a = 7$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p23_row_2',
          stepBadge: '第 2 步 · 公式展开',
          appearAt: 6.2,
          tokens: [
            { id: 'p23_r2_sq', math: '原式 $= (a^{2} - 2a + 1)$', appearAt: 6.3, dur: 0.45 },
            { id: 'p23_r2_rest', math: '$+ (a^{2} - 4a) - 2$', appearAt: 7.4, dur: 0.45 }
          ]
        },
        {
          rowId: 'p23_row_3',
          stepBadge: '第 3 & 4 步 · 合并与提系数',
          appearAt: 13.0,
          tokens: [
            { id: 'p23_r3_comb', math: '$= 2a^{2} - 6a - 1$', appearAt: 13.1, dur: 0.45 },
            { id: 'p23_r3_fac', math: '$= 2(a^{2} - 3a) - 1$', appearAt: 19.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p23_row_4',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p23_r4_conc', math: '$= 2 \\times 7 - 1 = 13$。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p23_sp_1',
          title: '核心工具箱 · 完全平方公式正向展开与“知二求二”变形',
          showStart: 5.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p23_sp1_t1', math: '① 标准展开：$(A \\pm B)^{2} = A^{2} \\pm 2AB + B^{2}$（尾平方恒为正）', appearAt: 6.4, dur: 0.40 },
            { id: 'p23_sp1_t2', math: '② 求平方和：$a^{2} + b^{2} = (a + b)^{2} - 2ab = (a - b)^{2} + 2ab$', appearAt: 7.4, dur: 0.40 },
            { id: 'p23_sp1_t3', math: '③ 倒数平方和：$x^{2} + \\frac{1}{x^{2}} = \\left(x \\pm \\frac{1}{x}\\right)^{2} \\mp 2$', appearAt: 8.4, dur: 0.40 }
          ],
          note: '易错提醒：$(a - 1)^{2}$ 展开是三项 $a^{2} - 2a + 1$，千万不能漏掉中间项 $-2a$！'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p23_r1_whole', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p23_r2_sq', tStart: 6.3, tEnd: 12.2, color: 'amber' },
        { tokenId: 'p23_r3_comb', tStart: 13.1, tEnd: 18.4, color: 'teal' },
        { tokenId: 'p23_r3_fac', tStart: 19.0, tEnd: 24.4, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p23_svg_s2',
          type: 'arrow',
          fromToken: 'p23_r0_target',
          toToken: 'p23_r2_sq',
          label: '首平方、尾平方、首尾两倍中间放',
          color: '#D97706',
          curveOffset: 28,
          tStart: 6.2,
          tDrawEnd: 7.0,
          tFadeStart: 11.6,
          tEnd: 12.2
        },
        {
          id: 'p23_svg_s5',
          type: 'arrow',
          fromToken: 'p23_r1_whole',
          toToken: 'p23_r3_fac',
          label: '整体代入 $a^{2} - 3a = 7$',
          color: '#0F766E',
          curveOffset: -28,
          tStart: 19.4,
          tDrawEnd: 20.2,
          tFadeStart: 24.0,
          tEnd: 24.6
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步提炼已知整体：由 $a^{2} - 3a - 7 = 0$ 移项得 $a^{2} - 3a = 7$。', focusToken: 'p23_r1_whole' },
        { tStart: 5.8, tEnd: 12.5, text: '第二步运用完全平方公式展开：$(a - 1)^{2} = a^{2} - 2a + 1$，加上 $a(a - 4) = a^{2} - 4a$，再减 $2$。', focusToken: 'p23_r2_sq' },
        { tStart: 12.5, tEnd: 18.5, text: '第三步合并同类项：$a^{2} + a^{2} = 2a^{2}$，$-2a - 4a = -6a$，$1 - 2 = -1$，化简得 $2a^{2} - 6a - 1$。', focusToken: 'p23_r3_comb' },
        { tStart: 18.5, tEnd: 24.5, text: '第四步提取公因数构造整体：前两项提取 $2$ 得 $2(a^{2} - 3a) - 1$。', focusToken: 'p23_r3_fac' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步整体代入：把 $a^{2} - 3a = 7$ 代入得 $2 \\times 7 - 1 = 13$！', focusToken: 'p23_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：由完全平方式结构特征求未知常数',
          givenLabel: '已知二次三项式：',
          givenFormula: '$9x^{2} + 12x + m$ 是一个完全平方式',
          extractedLabel: '拆解首项平方与中间两倍乘积：',
          extractedFormula: '$(3x)^{2} + 2 \\cdot (3x) \\cdot 2 + m$',
          questionText: '对照完全平方公式 $A^{2} + 2AB + B^{2}$，常数 $m$ 的值是？',
          options: [
            { key: 'A', text: 'A. $m = 2^{2} = 4$', isCorrect: true },
            { key: 'B', text: 'B. $m = 2$', isCorrect: false },
            { key: 'C', text: 'C. $m = 6^{2} = 36$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！先由首平方确定 A = 3x，再由中间项 2AB = 12x 确定 B = 2：',
            calcLines: [
              '$A = 3x，\\quad 2 \\cdot (3x) \\cdot B = 12x \\implies B = 2$',
              '$m = B^{2} = 2^{2} = 4 \\implies 9x^{2} + 12x + 4 = (3x + 2)^{2}$'
            ],
            summary: '当二次项系数不为 $1$ 时，不能直接取一次项系数 $12$ 的一半平方，而要先除以首项底数 $3$。'
          },
          wrongTitle: '提示：请注意首项是 (3x)² 而不是 x²',
          wrongFeedback: '首项 $9x^{2} = (3x)^{2}$，中间项 $12x = 2 \\cdot (3x) \\cdot 2$，故尾项 $B = 2$，$m = 2^{2} = 4$，请再试一次。'
        },
        practice2: {
          title: '练习二：利用完全平方公式求倒数平方和',
          givenLabel: '已知条件：',
          givenFormula: '$x - \\frac{1}{x} = 1$',
          questionText: '将等式两边同时平方得 $\\left(x - \\frac{1}{x}\\right)^{2} = x^{2} - 2 + \\frac{1}{x^{2}} = 1$，由此可求出 $x^{2} + \\frac{1}{x^{2}}$ 与 $x^{4} + \\frac{1}{x^{4}}$ 的值分别是多少？',
          input1Prefix: '$x^{2} + \\frac{1}{x^{2}} =$',
          input1Placeholder: '如 3',
          input2Prefix: '，$x^{4} + \\frac{1}{x^{4}} =$',
          input2Placeholder: '如 7',
          input2Suffix: '',
          expectedX: '3',
          expectedMin: '7',
          allowOrderSwap: false,
          correctFeedback: '$x^{2} + \\frac{1}{x^{2}} = 3$，$x^{4} + \\frac{1}{x^{4}} = 7$。',
          correctDetail: '① 由 $x^{2} - 2 + \\frac{1}{x^{2}} = 1$ 移项得 $x^{2} + \\frac{1}{x^{2}} = 1 + 2 = 3$；② 再两边平方得 $x^{4} + 2 + \\frac{1}{x^{4}} = 3^{2} = 9 \\implies x^{4} + \\frac{1}{x^{4}} = 9 - 2 = 7$。',
          wrongFeedback: '注意第一次平方中间项是 $-2$（移项 $+2$ 得 $3$），第二次对 $x^{2} + \\frac{1}{x^{2}} = 3$ 平方中间项是 $+2$（移项 $-2$ 得 $9 - 2 = 7$）。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '9',
              hint: '注意 $\\left(x^{2} + \\frac{1}{x^{2}}\\right)^{2} = x^{4} + 2 + \\frac{1}{x^{4}} = 9$，还需要减去中间的常数 $2$，所以 $x^{4} + \\frac{1}{x^{4}} = 7$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P24：用提公因式法分解因式（含提取多项式整体公因式）
    // =========================================================================
    P24: {
      procedureId: 'P24',
      title: '用提公因式法分解因式（含提取多项式整体公因式）',
      exampleTitle: '把多项式 $m^{2}(a - 2) + m(2 - a)$ 分解因式',
      exampleFormula: '$m^{2}(a - 2) + m(2 - a) \\implies m(a - 2)(m - 1)$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示相反数底数变号准则、三步定公因式与“某项等于公因式时保留 ±1”法则）',
      practiceSectionTitle: '提公因式法分解因式跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握首项负号提取、末项保留 1 与多项式公因式提取',

      steps: [
        {
          step: 1,
          name: '识别互为相反数的括号因式 $(a - 2)$ 与 $(2 - a)$',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '观察两项中的括号因式 $(a - 2)$ 与 $(2 - a)$ 互为相反数，利用 $2 - a = -(a - 2)$，将第二项变形为 $-m(a - 2)$。'
        },
        {
          step: 2,
          name: '统一底数写出变形后的多项式',
          tStart: 6.0,
          tEnd: 12.0,
          explanation: '原多项式转化为 $m^{2}(a - 2) - m(a - 2)$，此时两项都含有相同的括号因式 $(a - 2)$。'
        },
        {
          step: 3,
          name: '按“最低次幂”确定最大公因式 $m(a - 2)$',
          tStart: 12.0,
          tEnd: 18.0,
          explanation: '字母 $m$ 在两项中的最低次幂为 $m^{1} = m$，公共括号因式为 $(a - 2)$，故应一并提出最大公因式 $m(a - 2)$。'
        },
        {
          step: 4,
          name: '用各项除以公因式写出剩余括号（末项保留 -1）',
          tStart: 18.0,
          tEnd: 24.5,
          explanation: '第一项 $m^{2}(a - 2) \\div [m(a - 2)] = m$；第二项 $-m(a - 2) \\div [m(a - 2)] = -1$（切勿漏写 $-1$），组合得 $m(a - 2)(m - 1)$。'
        },
        {
          step: 5,
          name: '检查各因式不能再分解，确认最终结果',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '检查三个因式 $m$、$(a - 2)$、$(m - 1)$ 均已不能再分解，因式分解完成。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 识别 $2 - a = -(a - 2)$' },
        { time: 7.5, step: 2, label: '2.1 统一括号底数得 $m^{2}(a - 2) - m(a - 2)$' },
        { time: 14.0, step: 3, label: '3.1 确定最大公因式 $m(a - 2)$' },
        { time: 20.0, step: 4, label: '4.1 提取公因式得 $m(a - 2)(m - 1)$（保留 $-1$）' },
        { time: 26.5, step: 5, label: '5.1 检查分解彻底' }
      ],

      boardRows: [
        {
          rowId: 'p24_row_0',
          stepBadge: '原多项式',
          appearAt: 0.0,
          tokens: [
            { id: 'p24_r0_t1', math: '$m^{2}(a - 2)$', appearAt: 0.0, dur: 0.01 },
            { id: 'p24_r0_t2', math: '$+ m(2 - a)$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p24_row_1',
          stepBadge: '第 1 & 2 步 · 统一相反数底数',
          appearAt: 1.5,
          tokens: [
            { id: 'p24_r1_t1', math: '$= m^{2}(a - 2)$', appearAt: 1.6, dur: 0.40 },
            { id: 'p24_r1_t2', math: '$- m(a - 2)$', appearAt: 2.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p24_row_2',
          stepBadge: '第 3 步 · 锁定最大公因式',
          appearAt: 12.4,
          tokens: [
            { id: 'p24_r2_gcf', math: '各项最大公因式为：$m(a - 2)$', appearAt: 12.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p24_row_3',
          stepBadge: '最终结论',
          appearAt: 18.6,
          isConclusion: true,
          tokens: [
            { id: 'p24_r3_conc', math: '$= m(a - 2)(m - 1)$。', appearAt: 18.7, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p24_sp_1',
          title: '核心法则 · 互为相反数底数奇偶次幂变号规律',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p24_sp1_t1', math: '① 奇次幂变号：$(b - a)^{2k+1} = -(a - b)^{2k+1}$（如 $2 - a = -(a - 2)$）', appearAt: 1.4, dur: 0.40 },
            { id: 'p24_sp1_t2', math: '② 偶次幂不变号：$(b - a)^{2k} = (a - b)^{2k}$（如 $(n - m)^{2} = (m - n)^{2}$）', appearAt: 2.6, dur: 0.40 },
            { id: 'p24_sp1_t3', math: '③ 整项提走留 $1$：$-m(a - 2) \\div [m(a - 2)] = -1$（绝不能漏掉 $-1$）', appearAt: 18.4, dur: 0.45 }
          ],
          note: '提取公因式时要把单项式公因式 $m$ 和多项式公因式 $(a - 2)$ 一次性全部提出来'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p24_r0_t2', tStart: 0.8, tEnd: 5.8, color: 'amber' },
        { tokenId: 'p24_r1_t2', tStart: 2.5, tEnd: 11.8, color: 'rose' },
        { tokenId: 'p24_r2_gcf', tStart: 12.5, tEnd: 18.2, color: 'teal' },
        { tokenId: 'p24_r3_conc', tStart: 18.7, tEnd: 25.0, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p24_svg_s1',
          type: 'arrow',
          fromToken: 'p24_r0_t2',
          toToken: 'p24_r1_t2',
          label: '$2 - a = -(a - 2)$',
          color: '#BE123C',
          curveOffset: 28,
          tStart: 1.8,
          tDrawEnd: 2.6,
          tFadeStart: 5.4,
          tEnd: 6.0
        },
        {
          id: 'p24_svg_s4',
          type: 'under-brace',
          startToken: 'p24_r1_t1',
          endToken: 'p24_r1_t2',
          label: '提取公因式 $m(a - 2)$',
          color: '#0F766E',
          tStart: 12.8,
          tDrawEnd: 13.6,
          tFadeStart: 17.8,
          tEnd: 18.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '第一步统一互为相反数的括号底数：将第二项中的 $(2 - a)$ 改写为 $-(a - 2)$，正负号相乘变为减号。', focusToken: 'p24_r1_t2' },
        { tStart: 6.0, tEnd: 12.0, text: '第二步观察公共部分：变形后为 $m^{2}(a - 2) - m(a - 2)$。', focusToken: 'p24_r1_t1' },
        { tStart: 12.0, tEnd: 18.0, text: '第三步确定最大公因式：字母 $m$ 取最低次幂 $m$，括号因式取 $(a - 2)$，合起来最大公因式是 $m(a - 2)$。', focusToken: 'p24_r2_gcf' },
        { tStart: 18.0, tEnd: 30.0, text: '第四步提取公因式：第一项剩 $m$，第二项被整体提走后必须保留商 $-1$，得出最终结果 $m(a - 2)(m - 1)$！', focusToken: 'p24_r3_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：首项为负且末项等于公因式的提公因式分解',
          givenLabel: '已知多项式：',
          givenFormula: '$-4a^{3}b^{3} + 6a^{2}b - 2ab$',
          extractedLabel: '确定带负号的最大公因式：',
          extractedFormula: '系数取 $-2$，相同字母取最低次幂 $ab \\implies$ 公因式为 $-2ab$',
          questionText: '提取公因式 $-2ab$ 后，正确的因式分解结果是？',
          options: [
            { key: 'A', text: 'A. $-2ab(2a^{2}b^{2} - 3a + 1)$', isCorrect: true },
            { key: 'B', text: 'B. $-2ab(2a^{2}b^{2} - 3a)$', isCorrect: false },
            { key: 'C', text: 'C. $-2ab(2a^{2}b^{2} + 3a - 1)$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！提负号括号内全变号，且末项除以自身商为 +1：',
            calcLines: [
              '$(-4a^{3}b^{3}) \\div (-2ab) = 2a^{2}b^{2}$',
              '$(+6a^{2}b) \\div (-2ab) = -3a$，$(-2ab) \\div (-2ab) = +1$'
            ],
            summary: '原多项式有 $3$ 项，提取单项式公因式后括号内也必须有 $3$ 项，绝不能漏掉末尾的 $+1$。'
          },
          wrongTitle: '提示：请检查括号内的项数与变号情况',
          wrongFeedback: '提出 $-2ab$ 后，括号内三项符号由“负、正、负”变为“正、负、正”，且末项 $-2ab \\div (-2ab) = +1$ 不能漏写，请再试一次。'
        },
        practice2: {
          title: '练习二：提取公因式后整体代入求值',
          givenLabel: '已知条件：',
          givenFormula: '$mn = 5，\\quad m - n = -3$',
          questionText: '求代数式 $m^{2}n - mn^{2} + 5$ 的值：先将前两项因式分解为 $mn(m - n)$，则前两项的值与整个代数式的值分别是多少？',
          input1Prefix: '$m^{2}n - mn^{2} =$',
          input1Placeholder: '如 -15',
          input2Prefix: '，$m^{2}n - mn^{2} + 5 =$',
          input2Placeholder: '如 -10',
          input2Suffix: '',
          expectedX: '-15',
          expectedMin: '-10',
          allowOrderSwap: false,
          correctFeedback: '$m^{2}n - mn^{2} = -15$，$m^{2}n - mn^{2} + 5 = -10$。',
          correctDetail: '前两项提取公因式 $mn$ 得 $m^{2}n - mn^{2} = mn(m - n) = 5 \\times (-3) = -15$；加上 $5$ 得 $-15 + 5 = -10$。',
          wrongFeedback: '先算 $mn(m - n) = 5 \\times (-3) = -15$，再算 $-15 + 5$。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '-20',
              hint: '注意是 $-15 + 5 = -10$ 而不是 $-15 - 5 = -20$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P25：用公式法（平方差公式与完全平方公式）及先提后套分解因式
    // =========================================================================
    P25: {
      procedureId: 'P25',
      title: '用公式法（平方差公式与完全平方公式）及先提后套分解因式',
      exampleTitle: '把下列各式彻底分解因式：(1) $2x^{2} - 12x + 18$；(2) $(a^{2} + 4)^{2} - 16a^{2}$',
      exampleFormula: '一提（公因式） $\\to$ 二套（平方差/完全平方） $\\to$ 三检查（分解到底）',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示“一提、二套、三检查”因式分解黄金三步法与常见高次连环分解结构）',
      practiceSectionTitle: '公式法与先提后套因式分解跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握“先提公因式再套公式”与“连续多次分解到底”',

      steps: [
        {
          step: 1,
          name: '第(1)题“一提”：提取各项公因式 2',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '观察 $2x^{2} - 12x + 18$，三项系数 $2, -12, 18$ 有最大公约数 $2$，先调用 P24 提取公因式 $2$，得 $2(x^{2} - 6x + 9)$。'
        },
        {
          step: 2,
          name: '第(1)题“二套”：括号内三项套完全平方公式',
          tStart: 6.0,
          tEnd: 12.0,
          explanation: '括号内 $x^{2} - 6x + 9 = x^{2} - 2 \\cdot x \\cdot 3 + 3^{2}$ 符合完全平方式，套用完全平方公式分解为 $2(x - 3)^{2}$。'
        },
        {
          step: 3,
          name: '第(2)题外层“套平方差公式”',
          tStart: 12.0,
          tEnd: 18.2,
          explanation: '观察 $(a^{2} + 4)^{2} - 16a^{2}$，将 $16a^{2}$ 写为 $(4a)^{2}$，构成两项平方差 $A^{2} - B^{2}$，先分解为 $(a^{2} + 4 + 4a)(a^{2} + 4 - 4a)$。'
        },
        {
          step: 4,
          name: '第(2)题“三检查”：识别两个括号仍为完全平方式',
          tStart: 18.2,
          tEnd: 24.5,
          explanation: '按降幂排列两个括号为 $(a^{2} + 4a + 4)(a^{2} - 4a + 4)$，检查发现它们分别是 $(a + 2)^{2}$ 和 $(a - 2)^{2}$，还能继续分解！'
        },
        {
          step: 5,
          name: '继续套用完全平方公式分解到底',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '将两个因式继续用完全平方公式分解，得到彻底分解结果 $(a + 2)^{2}(a - 2)^{2}$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 (1) 先提公因式 $2$ 得 $2(x^{2} - 6x + 9)$' },
        { time: 7.5, step: 2, label: '2.1 (1) 套完全平方公式得 $2(x - 3)^{2}$' },
        { time: 14.0, step: 3, label: '3.1 (2) 先套平方差得 $(a^{2} + 4 + 4a)(a^{2} + 4 - 4a)$' },
        { time: 20.0, step: 4, label: '4.1 (2) 检查两个三项式均为完全平方式' },
        { time: 26.0, step: 5, label: '5.1 (2) 继续分解到底得 $(a + 2)^{2}(a - 2)^{2}$' }
      ],

      boardRows: [
        {
          rowId: 'p25_row_0',
          stepBadge: '例题 (1) · 一提公因式',
          appearAt: 0.0,
          tokens: [
            { id: 'p25_r0_orig', math: '(1) $2x^{2} - 12x + 18$', appearAt: 0.0, dur: 0.01 },
            { id: 'p25_r0_ext', math: '$= 2(x^{2} - 6x + 9)$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p25_row_1',
          stepBadge: '例题 (1) · 二套完全平方',
          appearAt: 6.4,
          tokens: [
            { id: 'p25_r1_res', math: '$= 2(x - 3)^{2}$', appearAt: 6.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p25_row_2',
          stepBadge: '例题 (2) · 先套平方差',
          appearAt: 12.4,
          tokens: [
            { id: 'p25_r2_orig', math: '(2) $(a^{2} + 4)^{2} - 16a^{2} = (a^{2} + 4)^{2} - (4a)^{2}$', appearAt: 12.5, dur: 0.45 },
            { id: 'p25_r2_diff', math: '$= (a^{2} + 4a + 4)(a^{2} - 4a + 4)$', appearAt: 14.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p25_row_3',
          stepBadge: '例题 (2) · 三检查分解到底',
          appearAt: 24.4,
          isConclusion: true,
          tokens: [
            { id: 'p25_r3_conc', math: '$= (a + 2)^{2}(a - 2)^{2}$。', appearAt: 24.5, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p25_sp_1',
          title: '核心口诀 · 因式分解“一提、二套、三检查”',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p25_sp1_t1', math: '① 一提：有公因式先提公因式，首项为负先提负号', appearAt: 1.4, dur: 0.40 },
            { id: 'p25_sp1_t2', math: '② 二套：两项异号平方套平方差，三项套完全平方', appearAt: 6.8, dur: 0.40 },
            { id: 'p25_sp1_t3', math: '③ 三检查：高次因式（如 $x^{4}-y^{4}$）必须连续分解到底', appearAt: 18.6, dur: 0.45 }
          ],
          note: '切记：在实数范围内，两项同号的平方和（如 $x^{2} + 4$、$a^{2} + b^{2}$）不能再分解'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p25_r0_ext', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p25_r1_res', tStart: 6.5, tEnd: 11.8, color: 'amber' },
        { tokenId: 'p25_r2_diff', tStart: 14.2, tEnd: 24.0, color: 'amber' },
        { tokenId: 'p25_r3_conc', tStart: 24.5, tEnd: 29.5, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p25_svg_s2',
          type: 'arrow',
          fromToken: 'p25_r0_ext',
          toToken: 'p25_r1_res',
          label: '$x^{2} - 6x + 9 = (x - 3)^{2}$',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 6.2,
          tDrawEnd: 7.0,
          tFadeStart: 11.2,
          tEnd: 11.8
        },
        {
          id: 'p25_svg_s5',
          type: 'arrow',
          fromToken: 'p25_r2_diff',
          toToken: 'p25_r3_conc',
          label: '两个三项式继续用完全平方分解',
          color: '#D97706',
          curveOffset: -26,
          tStart: 24.0,
          tDrawEnd: 24.8,
          tFadeStart: 28.8,
          tEnd: 29.5
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '先看第(1)题 $2x^{2} - 12x + 18$：牢记“一提二套”，先提取各项公因式 $2$，得 $2(x^{2} - 6x + 9)$。', focusToken: 'p25_r0_ext' },
        { tStart: 6.0, tEnd: 12.0, text: '括号内是三项式 $x^{2} - 6x + 9$，套用完全平方公式化为 $2(x - 3)^{2}$。', focusToken: 'p25_r1_res' },
        { tStart: 12.0, tEnd: 18.2, text: '再看第(2)题 $(a^{2} + 4)^{2} - 16a^{2}$：把 $16a^{2}$ 看作 $(4a)^{2}$，先用平方差公式分解为 $(a^{2} + 4a + 4)(a^{2} - 4a + 4)$。', focusToken: 'p25_r2_diff' },
        { tStart: 18.2, tEnd: 24.5, text: '关键第三步“检查彻底性”：观察发现两个括号里的二次三项式都符合完全平方式！', focusToken: 'p25_r2_diff' },
        { tStart: 24.5, tEnd: 30.0, text: '继续套用完全平方公式分解到底，得出最终结果 $(a + 2)^{2}(a - 2)^{2}$！', focusToken: 'p25_r3_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：先提公因式再用平方差公式彻底分解',
          givenLabel: '已知多项式：',
          givenFormula: '$2(a - 1)^{2} - 8$',
          extractedLabel: '第一步提取公因式 2：',
          extractedFormula: '$2[(a - 1)^{2} - 4] = 2[(a - 1)^{2} - 2^{2}]$',
          questionText: '下一步对中括号内套用平方差公式并化简，最终彻底分解的结果是？',
          options: [
            { key: 'A', text: 'A. $2(a + 1)(a - 3)$', isCorrect: true },
            { key: 'B', text: 'B. $2[(a - 1)^{2} - 4]$', isCorrect: false },
            { key: 'C', text: 'C. $(2a + 2)(a - 3)$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！一提公因式 2，二套平方差公式，三合并括号内常数：',
            calcLines: [
              '$2[(a - 1) + 2][(a - 1) - 2] = 2(a + 1)(a - 3)$'
            ],
            summary: 'B 项未继续用平方差公式分解，C 项未把系数公因数 $2$ 单独提到括号外。'
          },
          wrongTitle: '提示：请对 [(a - 1)² - 2²] 继续用平方差公式并保留前面的系数 2',
          wrongFeedback: '由 $(a - 1)^{2} - 2^{2} = (a - 1 + 2)(a - 1 - 2) = (a + 1)(a - 3)$，前面乘公因式 $2$ 得 $2(a + 1)(a - 3)$，请再试一次。'
        },
        practice2: {
          title: '练习二：高次多项式连续两次套用平方差公式',
          givenLabel: '已知四次多项式：',
          givenFormula: '$16 - b^{4}$',
          questionText: '第一次用平方差公式得 $(4 + b^{2})(4 - b^{2})$，其中 $4 - b^{2}$ 还能继续分解为 $(p + b)(p - b)$；若当 $b = 1$ 时该多项式的值是多少？请分别填写正数 $p$ 与当 $b = 1$ 时的值：',
          input1Prefix: '正数 $p =$',
          input1Placeholder: '如 2',
          input2Prefix: '，当 $b = 1$ 时原式 $=$',
          input2Placeholder: '如 15',
          input2Suffix: '',
          expectedX: '2',
          expectedMin: '15',
          allowOrderSwap: false,
          correctFeedback: '彻底分解为 $(4 + b^{2})(2 + b)(2 - b)$（$p = 2$），当 $b = 1$ 时原式值为 $15$。',
          correctDetail: '因为 $4 - b^{2} = 2^{2} - b^{2} = (2 + b)(2 - b)$，所以 $p = 2$；当 $b = 1$ 时，$16 - 1^{4} = 15$。',
          wrongFeedback: '注意 $4 = 2^{2}$，故 $4 - b^{2} = (2 + b)(2 - b)$，得 $p = 2$；再算 $16 - 1^{4} = 15$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '4',
              hint: '注意 $4 - b^{2} = 2^{2} - b^{2}$，开平方后常数是 $2$ 而不是 $4$。'
            }
          ]
        }
      }
    }
    ,
    // =========================================================================
    // P26：运用平方差公式展开整式与简便运算
    // =========================================================================
    P26: {
      procedureId: 'P26',
      title: '运用平方差公式展开整式与简便运算',
      exampleTitle: '利用平方差公式计算：(1) $(a + 2)(a - 2)(a^{2} + 4)$；(2) $(5x + 6y)(5x - 6y) - (6x + 5y)(6x - 5y)$',
      exampleFormula: '$(a + b)(a - b) = a^{2} - b^{2}$（相同项平方 $-$ 相反项平方）',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示“相同项 a 与相反项 b 识别”、“含系数项整体平方”与“减号后乘积加括号”三大准则）',
      practiceSectionTitle: '平方差公式展开与巧算跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握负项打头的平方差识别与大数平方差简便计算',

      steps: [
        {
          step: 1,
          name: '第(1)题：定位前两因式的相同项与相反项',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '观察 $(a + 2)(a - 2)(a^{2} + 4)$ 的前两个因式 $(a + 2)(a - 2)$，其中相同项为 $a$、相反项为 $2$，套用平方差公式得 $(a^{2} - 4)$。'
        },
        {
          step: 2,
          name: '第(1)题：连续第二次套用平方差公式',
          tStart: 6.0,
          tEnd: 12.0,
          explanation: '前两因式的积 $(a^{2} - 4)$ 与第三个因式 $(a^{2} + 4)$ 再次构成平方差结构（相同项为 $a^{2}$，相反项为 $4$），套用公式得 $(a^{2})^{2} - 4^{2} = a^{4} - 16$。'
        },
        {
          step: 3,
          name: '第(2)题：两组平方差分别加括号展开',
          tStart: 12.0,
          tEnd: 18.5,
          explanation: '对 $(5x + 6y)(5x - 6y)$ 和 $(6x + 5y)(6x - 5y)$ 分别套用平方差公式（系数与字母同时平方），并在减号后保留括号：$(25x^{2} - 36y^{2}) - (36x^{2} - 25y^{2})$。'
        },
        {
          step: 4,
          name: '第(2)题：去括号变号',
          tStart: 18.5,
          tEnd: 24.5,
          explanation: '去掉第二个括号，括号前是负号，括号内两项均变号，得 $25x^{2} - 36y^{2} - 36x^{2} + 25y^{2}$。'
        },
        {
          step: 5,
          name: '第(2)题：合并同类项得出最简结果',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '将同类项分别合并：$(25 - 36)x^{2} + (-36 + 25)y^{2} = -11x^{2} - 11y^{2}$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 (1) 先算 $(a + 2)(a - 2) = a^{2} - 4$' },
        { time: 7.5, step: 2, label: '2.1 (1) 连续套平方差得 $(a^{2} - 4)(a^{2} + 4) = a^{4} - 16$' },
        { time: 14.0, step: 3, label: '3.1 (2) 两组加括号展开得 $(25x^{2} - 36y^{2}) - (36x^{2} - 25y^{2})$' },
        { time: 20.0, step: 4, label: '4.1 (2) 去括号变号得 $25x^{2} - 36y^{2} - 36x^{2} + 25y^{2}$' },
        { time: 26.0, step: 5, label: '5.1 (2) 合并同类项得 $-11x^{2} - 11y^{2}$' }
      ],

      boardRows: [
        {
          rowId: 'p26_row_0',
          stepBadge: '例题 (1) · 第一次平方差',
          appearAt: 0.0,
          tokens: [
            { id: 'p26_r0_orig', math: '(1) $(a + 2)(a - 2)(a^{2} + 4)$', appearAt: 0.0, dur: 0.01 },
            { id: 'p26_r0_step1', math: '$= (a^{2} - 4)(a^{2} + 4)$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p26_row_1',
          stepBadge: '例题 (1) · 第二次平方差',
          appearAt: 6.4,
          tokens: [
            { id: 'p26_r1_res', math: '$= (a^{2})^{2} - 4^{2} = a^{4} - 16$', appearAt: 6.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p26_row_2',
          stepBadge: '例题 (2) · 加括号展开',
          appearAt: 12.4,
          tokens: [
            { id: 'p26_r2_orig', math: '(2) 原式 $= [(5x)^{2} - (6y)^{2}] - [(6x)^{2} - (5y)^{2}]$', appearAt: 12.5, dur: 0.45 },
            { id: 'p26_r2_exp', math: '$= (25x^{2} - 36y^{2}) - (36x^{2} - 25y^{2})$', appearAt: 14.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p26_row_3',
          stepBadge: '例题 (2) · 去括号与合并',
          appearAt: 19.0,
          isConclusion: true,
          tokens: [
            { id: 'p26_r3_rem', math: '$= 25x^{2} - 36y^{2} - 36x^{2} + 25y^{2}$', appearAt: 19.1, dur: 0.45 },
            { id: 'p26_r3_conc', math: '$= -11x^{2} - 11y^{2}$。', appearAt: 25.0, dur: 0.55 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p26_sp_1',
          title: '核心口诀 · 平方差公式三大防错铁律',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p26_sp1_t1', math: '① 认准符号：相同项的平方 $-$ 相反项的平方', appearAt: 1.4, dur: 0.40 },
            { id: 'p26_sp1_t2', math: '② 系数同平方：$(5x)^{2} = 25x^{2}$（切勿漏平方写成 $5x^{2}$）', appearAt: 12.8, dur: 0.40 },
            { id: 'p26_sp1_t3', math: '③ 减号加括号：$-(36x^{2} - 25y^{2}) = -36x^{2} + 25y^{2}$', appearAt: 18.8, dur: 0.45 }
          ],
          note: '面对形如 $(-a + 2)(-a - 2)$ 的式子，相同项是 $-a$，相反项是 $2$，结果为 $(-a)^{2} - 2^{2} = a^{2} - 4$'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p26_r0_step1', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p26_r1_res', tStart: 6.5, tEnd: 11.8, color: 'amber' },
        { tokenId: 'p26_r2_exp', tStart: 14.2, tEnd: 18.4, color: 'amber' },
        { tokenId: 'p26_r3_rem', tStart: 19.1, tEnd: 24.4, color: 'rose' },
        { tokenId: 'p26_r3_conc', tStart: 25.0, tEnd: 29.5, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p26_svg_s2',
          type: 'arrow',
          fromToken: 'p26_r0_step1',
          toToken: 'p26_r1_res',
          label: '再次触发平方差公式',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 6.2,
          tDrawEnd: 7.0,
          tFadeStart: 11.2,
          tEnd: 11.8
        },
        {
          id: 'p26_svg_s4',
          type: 'arrow',
          fromToken: 'p26_r2_exp',
          toToken: 'p26_r3_rem',
          label: '减号去括号：$-25y^{2} \\to +25y^{2}$',
          color: '#BE123C',
          curveOffset: -26,
          tStart: 18.8,
          tDrawEnd: 19.6,
          tFadeStart: 23.8,
          tEnd: 24.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '先看第(1)题：前两个因式 $(a + 2)(a - 2)$ 构成平方差，相同项为 $a$、相反项为 $2$，相乘得 $(a^{2} - 4)$。', focusToken: 'p26_r0_step1' },
        { tStart: 6.0, tEnd: 12.0, text: '接着 $(a^{2} - 4)$ 与 $(a^{2} + 4)$ 再次构成平方差，连续套用公式得 $(a^{2})^{2} - 4^{2} = a^{4} - 16$。', focusToken: 'p26_r1_res' },
        { tStart: 12.0, tEnd: 18.5, text: '再看第(2)题：两组乘积分别套用平方差公式，注意把系数 $5$ 和 $6$ 一并平方，且减号后面的结果必须先加括号！', focusToken: 'p26_r2_exp' },
        { tStart: 18.5, tEnd: 24.5, text: '去括号时，括号前是减号，所以 $-25y^{2}$ 变号为 $+25y^{2}$，得 $25x^{2} - 36y^{2} - 36x^{2} + 25y^{2}$。', focusToken: 'p26_r3_rem' },
        { tStart: 24.5, tEnd: 30.0, text: '最后合并同类项，得出最简结果 $-11x^{2} - 11y^{2}$！', focusToken: 'p26_r3_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：识别含负号项的平方差公式展开',
          givenLabel: '已知整式乘法算式：',
          givenFormula: '$(-a + 2)(-a - 2)$',
          extractedLabel: '对比两括号内各项的符号：',
          extractedFormula: '第一项均为 $-a$（符号相同），第二项为 $+2$ 与 $-2$（符号相反）',
          questionText: '运用平方差公式“相同项的平方 $-$ 相反项的平方”展开，正确的结果是？',
          options: [
            { key: 'A', text: 'A. $(-a)^{2} - 2^{2} = a^{2} - 4$', isCorrect: true },
            { key: 'B', text: 'B. $2^{2} - a^{2} = 4 - a^{2}$', isCorrect: false },
            { key: 'C', text: 'C. $-a^{2} - 4$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！判断谁减谁只看符号，不看正负号本身：',
            calcLines: [
              '相同项 $A = -a \\implies A^{2} = (-a)^{2} = a^{2}$',
              '相反项 $B = 2 \\implies B^{2} = 2^{2} = 4 \\implies A^{2} - B^{2} = a^{2} - 4$'
            ],
            summary: '无论相同项前面带正号还是负号，平方之后都是正的被减项。'
          },
          wrongTitle: '提示：请找出两个括号里符号完全相同的那一项',
          wrongFeedback: '两个括号里 $-a$ 的符号相同（都是负号），所以相同项是 $-a$，它的平方 $(-a)^{2} = a^{2}$ 是被减数，请再试一次。'
        },
        practice2: {
          title: '练习二：利用平方差公式进行大数简便运算与整体求值',
          givenLabel: '给出两个算式：',
          givenFormula: '① $1186^{2} - 1185 \\times 1187$；② 已知 $3m + n = 6，3m - n = 4$，求 $9m^{2} - n^{2}$',
          questionText: '在 ① 中将 $1185 \\times 1187$ 化为 $(1186 - 1)(1186 + 1)$ 后算得的结果是多少？在 ② 中 $9m^{2} - n^{2}$ 的值是多少？',
          input1Prefix: '① 的结果 $=$',
          input1Placeholder: '如 1',
          input2Prefix: '，② $9m^{2} - n^{2} =$',
          input2Placeholder: '如 24',
          input2Suffix: '',
          expectedX: '1',
          expectedMin: '24',
          allowOrderSwap: false,
          correctFeedback: '① 的结果为 $1$，② $9m^{2} - n^{2} = 24$。',
          correctDetail: '① $1186^{2} - (1186^{2} - 1^{2}) = 1186^{2} - 1186^{2} + 1 = 1$；② $9m^{2} - n^{2} = (3m + n)(3m - n) = 6 \\times 4 = 24$。',
          wrongFeedback: '① 注意去括号 $1186^{2} - (1186^{2} - 1) = +1$；② 利用 $9m^{2} - n^{2} = (3m + n)(3m - n)$ 将 $6$ 和 $4$ 相乘。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '-1',
              hint: '注意是 $1186^{2} - (1186^{2} - 1)$，去括号后 $-(-1) = +1$ 而不是 $-1$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P27：运用单项式与多项式乘法法则展开整式
    // =========================================================================
    P27: {
      procedureId: 'P27',
      title: '运用单项式与多项式乘法法则展开整式',
      exampleTitle: '计算整式乘法：$x(x^{2} + x - 1) - (2x^{2} - 1)(x - 4)$',
      exampleFormula: '$m(a + b + c) = ma + mb + mc$；$(a + b)(p + q) = ap + aq + bp + bq$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示“系数相乘、同底数幂指数相加”、“逐项遍乘不漏项”与“减号后乘积先加括号”）',
      practiceSectionTitle: '整式乘法展开与化简跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握负单项式乘多项式与多项式乘多项式展开合并',

      steps: [
        {
          step: 1,
          name: '用单项式 $x$ 乘遍第一组括号内三项',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '根据单项式乘多项式法则（乘法分配律），用 $x$ 分别乘 $x^{2}$、$+x$、$-1$，同底数幂指数相加得 $x^{3} + x^{2} - x$。'
        },
        {
          step: 2,
          name: '将减号后的多项式乘多项式放在括号内逐项展开',
          tStart: 6.0,
          tEnd: 13.0,
          explanation: '因为前面是减号，先写“$-($”，在括号内用 $2x^{2}$ 和 $-1$ 分别遍乘 $(x - 4)$ 的两项，得 $-(2x^{3} - 8x^{2} - x + 4)$。'
        },
        {
          step: 3,
          name: '按去括号法则去掉减号后的括号',
          tStart: 13.0,
          tEnd: 19.0,
          explanation: '去掉括号和前面的减号，括号内四项全部改变符号，化为 $x^{3} + x^{2} - x - 2x^{3} + 8x^{2} + x - 4$。'
        },
        {
          step: 4,
          name: '按同次幂分组识别同类项',
          tStart: 19.0,
          tEnd: 24.5,
          explanation: '找出三次项 $(x^{3} - 2x^{3})$、二次项 $(x^{2} + 8x^{2})$、一次项 $(-x + x)$ 与常数项 $-4$。'
        },
        {
          step: 5,
          name: '合并同类项写出最简多项式',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '系数相加合并：三次项得 $-x^{3}$，二次项得 $+9x^{2}$，一次项正负抵消为 $0$，最终结果为 $-x^{3} + 9x^{2} - 4$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 展开 $x(x^{2} + x - 1) = x^{3} + x^{2} - x$' },
        { time: 7.5, step: 2, label: '2.1 加括号展开 $-(2x^{2} - 1)(x - 4) = -(2x^{3} - 8x^{2} - x + 4)$' },
        { time: 14.2, step: 3, label: '3.1 去括号变号得 $x^{3} + x^{2} - x - 2x^{3} + 8x^{2} + x - 4$' },
        { time: 20.5, step: 4, label: '4.1 识别同类项（$-x$ 与 $+x$ 抵消）' },
        { time: 26.5, step: 5, label: '5.1 合并得出 $-x^{3} + 9x^{2} - 4$' }
      ],

      boardRows: [
        {
          rowId: 'p27_row_0',
          stepBadge: '原算式',
          appearAt: 0.0,
          tokens: [
            { id: 'p27_r0_p1', math: '$x(x^{2} + x - 1)$', appearAt: 0.0, dur: 0.01 },
            { id: 'p27_r0_p2', math: '$- (2x^{2} - 1)(x - 4)$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p27_row_1',
          stepBadge: '第 1 & 2 步 · 分配律展开（保留括号）',
          appearAt: 1.5,
          tokens: [
            { id: 'p27_r1_p1', math: '$= x^{3} + x^{2} - x$', appearAt: 1.6, dur: 0.45 },
            { id: 'p27_r1_p2', math: '$- (2x^{3} - 8x^{2} - x + 4)$', appearAt: 6.5, dur: 0.50 }
          ]
        },
        {
          rowId: 'p27_row_2',
          stepBadge: '第 3 步 · 去括号变号',
          appearAt: 13.4,
          tokens: [
            { id: 'p27_r2_rem', math: '$= x^{3} + x^{2} - x - 2x^{3} + 8x^{2} + x - 4$', appearAt: 13.5, dur: 0.50 }
          ]
        },
        {
          rowId: 'p27_row_3',
          stepBadge: '最终结论',
          appearAt: 24.8,
          isConclusion: true,
          tokens: [
            { id: 'p27_r3_conc', math: '$= -x^{3} + 9x^{2} - 4$。', appearAt: 24.9, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p27_sp_1',
          title: '草稿演算 · 多项式乘多项式“四次握手”明细',
          showStart: 5.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p27_sp1_t1', math: '① $2x^{2} \\cdot x = 2x^{3}$；② $2x^{2} \\cdot (-4) = -8x^{2}$', appearAt: 6.4, dur: 0.40 },
            { id: 'p27_sp1_t2', math: '③ $(-1) \\cdot x = -x$；④ $(-1) \\cdot (-4) = +4$', appearAt: 7.6, dur: 0.40 },
            { id: 'p27_sp1_t3', math: '易错点：前面有“$-$”号，必须先套括号 $-(2x^{3} - 8x^{2} - x + 4)$！', appearAt: 13.6, dur: 0.45 }
          ],
          note: '二项式乘二项式在合并同类项前共有 $2 \\times 2 = 4$ 项，逐项核对可确保不漏项'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p27_r0_p1', tStart: 0.8, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p27_r1_p1', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p27_r0_p2', tStart: 6.0, tEnd: 12.8, color: 'amber' },
        { tokenId: 'p27_r1_p2', tStart: 6.5, tEnd: 12.8, color: 'amber' },
        { tokenId: 'p27_r2_rem', tStart: 13.5, tEnd: 24.4, color: 'rose' },
        { tokenId: 'p27_r3_conc', tStart: 24.9, tEnd: 29.5, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p27_svg_s2',
          type: 'arrow',
          fromToken: 'p27_r0_p2',
          toToken: 'p27_r1_p2',
          label: '减号后乘积先加括号',
          color: '#D97706',
          curveOffset: 28,
          tStart: 6.2,
          tDrawEnd: 7.0,
          tFadeStart: 12.0,
          tEnd: 12.6
        },
        {
          id: 'p27_svg_s3',
          type: 'arrow',
          fromToken: 'p27_r1_p2',
          toToken: 'p27_r2_rem',
          label: '去括号四项全变号',
          color: '#BE123C',
          curveOffset: -26,
          tStart: 13.2,
          tDrawEnd: 14.0,
          tFadeStart: 18.2,
          tEnd: 18.8
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '第一步展开单项式乘多项式：用 $x$ 乘遍 $(x^{2} + x - 1)$ 的每一项，指数相加得 $x^{3} + x^{2} - x$。', focusToken: 'p27_r1_p1' },
        { tStart: 6.0, tEnd: 13.0, text: '第二步展开多项式乘多项式：注意前面是减号，必须先把乘积放在括号内，展开得 $-(2x^{3} - 8x^{2} - x + 4)$。', focusToken: 'p27_r1_p2' },
        { tStart: 13.0, tEnd: 19.0, text: '第三步去括号变号：去掉括号和前面的减号，括号内四项全部变号，得到 $-2x^{3} + 8x^{2} + x - 4$。', focusToken: 'p27_r2_rem' },
        { tStart: 19.0, tEnd: 30.0, text: '第四步合并同类项：$x^{3} - 2x^{3} = -x^{3}$，$x^{2} + 8x^{2} = +9x^{2}$，$-x$ 与 $+x$ 抵消，最终结果为 $-x^{3} + 9x^{2} - 4$！', focusToken: 'p27_r3_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：负单项式乘以多项式的符号与指数法则',
          givenLabel: '已知整式乘法算式：',
          givenFormula: '$(-3x) \\cdot (2x^{2} - 5x - 1)$',
          extractedLabel: '按乘法分配律拆解：',
          extractedFormula: '$(-3x) \\cdot 2x^{2} + (-3x) \\cdot (-5x) + (-3x) \\cdot (-1)$',
          questionText: '逐项计算系数相乘与同底数幂指数相加，正确的展开结果是？',
          options: [
            { key: 'A', text: 'A. $-6x^{3} + 15x^{2} + 3x$', isCorrect: true },
            { key: 'B', text: 'B. $-6x^{3} - 15x^{2} - 3x$', isCorrect: false },
            { key: 'C', text: 'C. $-6x^{2} + 15x^{2} - 1$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！负单项式乘进括号时，括号内每一项符号都要改变：',
            calcLines: [
              '$(-3x) \\cdot 2x^{2} = -6x^{1+2} = -6x^{3}$',
              '$(-3x) \\cdot (-5x) = +15x^{1+1} = +15x^{2}$',
              '$(-3x) \\cdot (-1) = +3x$（切勿漏乘末项 $-1$）'
            ],
            summary: '单项式乘三项式，展开后必定也是三项。'
          },
          wrongTitle: '提示：请检查负负得正与末项是否漏乘',
          wrongFeedback: '$(-3x)$ 乘以 $-5x$ 和 $-1$ 时同号相乘得正（$+15x^{2}$ 和 $+3x$），且 $x \\cdot x^{2} = x^{3}$，请再试一次。'
        },
        practice2: {
          title: '练习二：多项式乘多项式展开合并',
          givenLabel: '已知二项式乘二项式：',
          givenFormula: '$(2x - y)(x - 2y)$',
          questionText: '将其展开并合并中间同类项，化为 $2x^{2} + kxy + my^{2}$ 的形式，系数 $k$ 和 $m$ 分别是多少？',
          input1Prefix: '$xy$ 项系数 $k =$',
          input1Placeholder: '如 -5',
          input2Prefix: '，$y^{2}$ 项系数 $m =$',
          input2Placeholder: '如 2',
          input2Suffix: '',
          expectedX: '-5',
          expectedMin: '2',
          allowOrderSwap: false,
          correctFeedback: '展开合并结果为 $2x^{2} - 5xy + 2y^{2}$（$k = -5$，$m = 2$）。',
          correctDetail: '$(2x - y)(x - 2y) = 2x^{2} - 4xy - xy + 2y^{2} = 2x^{2} - 5xy + 2y^{2}$，故 $k = -5，m = 2$。',
          wrongFeedback: '逐项相乘得 $2x^{2} - 4xy - xy + 2y^{2}$，合并中间两项 $(-4 - 1)xy = -5xy$，末项 $(-y) \\cdot (-2y) = +2y^{2}$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '-3',
              hint: '注意中间两项是 $-4xy$ 和 $-xy$（同为负号），相加应为 $(-4) + (-1) = -5$ 而不是 $-3$。'
            },
            {
              checkType: 'secondVal',
              val: '-2',
              hint: '注意末项是 $(-y) \\times (-2y)$，同号相乘得正，系数 $m = 2$ 而不是 $-2$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P28：运用去括号与合并同类项法则进行整式加减及无关型求值
    // =========================================================================
    P28: {
      procedureId: 'P28',
      title: '运用去括号与合并同类项法则进行整式加减及无关型求值',
      exampleTitle: '计算整式加减：$\\left(\\frac{1}{3}x^{2} - 1 + 3x\\right) - 4\\left(x - x^{2} + \\frac{1}{2}\\right)$',
      exampleFormula: '$a - k(b - c + d) = a - kb + kc - kd$；$mx^{a}y^{b} + nx^{a}y^{b} = (m + n)x^{a}y^{b}$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示“两相同两无关”同类项准则、负系数去括号法则与“无关型令系数=0”求参技巧）',
      practiceSectionTitle: '整式加减去括号与无关型求值跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握负因数去括号合并与“与字母取值无关”求参数',

      steps: [
        {
          step: 1,
          name: '去掉第一个括号（括号前为正，各项不变号）',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '第一个括号 $\\left(\\frac{1}{3}x^{2} - 1 + 3x\\right)$ 前面没有负号，直接去掉括号，各项保持原符号不变：$\\frac{1}{3}x^{2} - 1 + 3x$。'
        },
        {
          step: 2,
          name: '将负系数 -4 乘遍第二个括号内每一项并变号',
          tStart: 5.8,
          tEnd: 12.8,
          explanation: '第二个括号前是 $-4$，用 $-4$ 分别乘以 $x$、$-x^{2}$、$+\\frac{1}{2}$，得 $-4x + 4x^{2} - 2$（注意 $(-4) \\times (-x^{2}) = +4x^{2}$，$(-4) \\times \\frac{1}{2} = -2$）。'
        },
        {
          step: 3,
          name: '按同类项定义将相同次数的项分组',
          tStart: 12.8,
          tEnd: 19.0,
          explanation: '将所含字母相同且指数也相同的项归为一组：二次项 $\\left(\\frac{1}{3}x^{2} + 4x^{2}\\right)$，一次项 $(3x - 4x)$，常数项 $(-1 - 2)$。'
        },
        {
          step: 4,
          name: '把各组同类项的系数相加，字母和指数不变',
          tStart: 19.0,
          tEnd: 24.8,
          explanation: '二次项系数 $\\frac{1}{3} + 4 = \\frac{13}{3}$，一次项系数 $3 - 4 = -1$，常数项 $-1 - 2 = -3$。'
        },
        {
          step: 5,
          name: '按降幂排列写出最简整式结果',
          tStart: 24.8,
          tEnd: 30.0,
          explanation: '写出最终合并结果：$\\frac{13}{3}x^{2} - x - 3$（系数 $-1$ 中的 $1$ 省略不写）。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 去第一括号得 $\\frac{1}{3}x^{2} - 1 + 3x$' },
        { time: 7.5, step: 2, label: '2.1 将 $-4$ 分配进第二括号得 $-4x + 4x^{2} - 2$' },
        { time: 14.2, step: 3, label: '3.1 按二次项、一次项、常数项分组同类项' },
        { time: 20.5, step: 4, label: '4.1 系数相加：$\\frac{1}{3} + 4 = \\frac{13}{3}$，$3 - 4 = -1$，$-1 - 2 = -3$' },
        { time: 26.5, step: 5, label: '5.1 得出最简结果 $\\frac{13}{3}x^{2} - x - 3$' }
      ],

      boardRows: [
        {
          rowId: 'p28_row_0',
          stepBadge: '原算式',
          appearAt: 0.0,
          tokens: [
            { id: 'p28_r0_p1', math: '$\\left(\\frac{1}{3}x^{2} - 1 + 3x\\right)$', appearAt: 0.0, dur: 0.01 },
            { id: 'p28_r0_p2', math: '$- 4\\left(x - x^{2} + \\frac{1}{2}\\right)$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p28_row_1',
          stepBadge: '第 1 & 2 步 · 去括号',
          appearAt: 1.5,
          tokens: [
            { id: 'p28_r1_p1', math: '$= \\frac{1}{3}x^{2} - 1 + 3x$', appearAt: 1.6, dur: 0.45 },
            { id: 'p28_r1_p2', math: '$- 4x + 4x^{2} - 2$', appearAt: 6.4, dur: 0.50 }
          ]
        },
        {
          rowId: 'p28_row_2',
          stepBadge: '第 3 & 4 步 · 同类项分组',
          appearAt: 13.4,
          tokens: [
            { id: 'p28_r2_g2', math: '$= \\left(\\frac{1}{3} + 4\\right)x^{2}$', appearAt: 13.5, dur: 0.45 },
            { id: 'p28_r2_g1', math: '$+ (3 - 4)x$', appearAt: 14.4, dur: 0.40 },
            { id: 'p28_r2_g0', math: '$+ (-1 - 2)$', appearAt: 15.2, dur: 0.40 }
          ]
        },
        {
          rowId: 'p28_row_3',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p28_r3_conc', math: '$= \\frac{13}{3}x^{2} - x - 3$。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p28_sp_1',
          title: '核心准则 · 同类项“两相同、两无关”与无关型求参',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p28_sp1_t1', math: '① 两相同：所含字母相同，且相同字母的指数也相同', appearAt: 1.4, dur: 0.40 },
            { id: 'p28_sp1_t2', math: '② 负系数去括号：$-4\\left(x - x^{2} + \\frac{1}{2}\\right) = -4x + 4x^{2} - 2$', appearAt: 6.8, dur: 0.45 },
            { id: 'p28_sp1_t3', math: '③ 与 $x$ 的取值无关（或不含某项）$\\implies$ 合并后含 $x$ 项系数 $= 0$', appearAt: 19.2, dur: 0.45 }
          ],
          note: '几个常数项（如 $-1$ 与 $-2$）也是同类项；字母顺序不同但对应指数相同的项（如 $-2x^{2}y$ 与 $2yx^{2}$）也是同类项'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p28_r0_p2', tStart: 5.8, tEnd: 12.5, color: 'amber' },
        { tokenId: 'p28_r1_p2', tStart: 6.4, tEnd: 12.5, color: 'rose' },
        { tokenId: 'p28_r2_g2', tStart: 13.5, tEnd: 24.4, color: 'teal' },
        { tokenId: 'p28_r2_g1', tStart: 14.4, tEnd: 24.4, color: 'amber' },
        { tokenId: 'p28_r3_conc', tStart: 25.1, tEnd: 29.5, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p28_svg_s2',
          type: 'arrow',
          fromToken: 'p28_r0_p2',
          toToken: 'p28_r1_p2',
          label: '$-4$ 乘遍三项并全变号',
          color: '#BE123C',
          curveOffset: 28,
          tStart: 6.2,
          tDrawEnd: 7.0,
          tFadeStart: 11.8,
          tEnd: 12.4
        },
        {
          id: 'p28_svg_s4',
          type: 'under-brace',
          startToken: 'p28_r2_g2',
          endToken: 'p28_r2_g0',
          label: '系数相加，字母和指数不变',
          color: '#0F766E',
          tStart: 19.2,
          tDrawEnd: 20.0,
          tFadeStart: 24.0,
          tEnd: 24.6
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步去掉第一个括号：括号前是正号，直接去括号得 $\\frac{1}{3}x^{2} - 1 + 3x$。', focusToken: 'p28_r1_p1' },
        { tStart: 5.8, tEnd: 12.8, text: '第二步去掉带负系数的括号：用 $-4$ 乘遍括号内三项，注意负负得正、正负得负，得 $-4x + 4x^{2} - 2$。', focusToken: 'p28_r1_p2' },
        { tStart: 12.8, tEnd: 19.0, text: '第三步同类项分组：将二次项、一次项和常数项分别归类，准备把系数相加。', focusToken: 'p28_r2_g2' },
        { tStart: 19.0, tEnd: 30.0, text: '第四步合并同类项：$\\frac{1}{3} + 4 = \\frac{13}{3}$，$3 - 4 = -1$，$-1 - 2 = -3$，得出最简结果 $\\frac{13}{3}x^{2} - x - 3$！', focusToken: 'p28_r3_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：由同类项定义求指数参数',
          givenLabel: '已知条件：',
          givenFormula: '单项式 $3x^{n}y^{3}$ 与 $-\\frac{1}{2}x^{2}y^{m}$ 的和仍是单项式（即二者是同类项）',
          extractedLabel: '对照同类项“相同字母的指数相同”：',
          extractedFormula: '$x$ 的指数分别为 $n$ 与 $2$；$y$ 的指数分别为 $3$ 与 $m$',
          questionText: '由此求出的 $m, n$ 及 $m + n$ 的值是？',
          options: [
            { key: 'A', text: 'A. $n = 2，m = 3$，故 $m + n = 5$', isCorrect: true },
            { key: 'B', text: 'B. $n = 3，m = -\\frac{1}{2}$，故 $m + n = \\frac{5}{2}$', isCorrect: false },
            { key: 'C', text: 'C. $n = 3，m = 2$，故 $m + n = 5$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！两个单项式的和仍是单项式，说明它们必为同类项：',
            calcLines: [
              '相同字母 $x$ 的指数相等：$n = 2$',
              '相同字母 $y$ 的指数相等：$m = 3 \\implies m + n = 3 + 2 = 5$'
            ],
            summary: '同类项的判定与前面的数字系数（$3$ 和 $-\\frac{1}{2}$）完全无关。'
          },
          wrongTitle: '提示：请将相同字母的指数一一对应相等',
          wrongFeedback: '在 $3x^{n}y^{3}$ 与 $-\\frac{1}{2}x^{2}y^{m}$ 中，$x$ 的指数对应相等得 $n = 2$，$y$ 的指数对应相等得 $m = 3$，请再试一次。'
        },
        practice2: {
          title: '练习二：整式加减“与字母 x 的取值无关”求参数',
          givenLabel: '已知合并同类项后的多项式为：',
          givenFormula: '$(1 - b)x^{2} + (a + 3)x - 7y + 3 + b$',
          questionText: '若该多项式的值与字母 $x$ 的取值无关，则含 $x^{2}$ 和 $x$ 项的系数均为 $0$，解出的 $a$ 和 $b$ 分别是多少？',
          input1Prefix: '$a =$',
          input1Placeholder: '如 -3',
          input2Prefix: '，$b =$',
          input2Placeholder: '如 1',
          input2Suffix: '',
          expectedX: '-3',
          expectedMin: '1',
          allowOrderSwap: false,
          correctFeedback: '$a = -3$，$b = 1$。',
          correctDetail: '因为值与 $x$ 的取值无关，令 $x^{2}$ 的系数 $1 - b = 0$ 得 $b = 1$；令 $x$ 的系数 $a + 3 = 0$ 得 $a = -3$。',
          wrongFeedback: '直接令 $x$ 的一次项系数 $a + 3 = 0$ 求出 $a$，令 $x^{2}$ 的系数 $1 - b = 0$ 求出 $b$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '3',
              hint: '注意一次项系数是 $(a + 3)$，令 $a + 3 = 0$ 解得 $a = -3$ 而不是 $3$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P29：识别一元一次方程与运用等式的性质变形求解
    // =========================================================================
    P29: {
      procedureId: 'P29',
      title: '识别一元一次方程与运用等式的性质变形求解',
      exampleTitle: '严格运用等式的性质解方程：$5x - 8 = 3x - 6$',
      exampleFormula: '性质 1：$a = b \\implies a \\pm c = b \\pm c$；性质 2：$a = b, c \\neq 0 \\implies \\frac{a}{c} = \\frac{b}{c}$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示一元一次方程定义双重条件与等式性质 2“除数 c≠0”铁律）',
      practiceSectionTitle: '一元一次方程定义与等式性质跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握等式两边同除以含字母因式的合法性辨析与含参定义求解',

      steps: [
        {
          step: 1,
          name: '运用等式的性质 1：两边同加 8 消去左边的常数项',
          tStart: 0.0,
          tEnd: 6.2,
          explanation: '为了消去等号左边的 $-8$，根据等式的性质 1，在等式两边同时加上 $8$，得 $5x - 8 + 8 = 3x - 6 + 8$，化简为 $5x = 3x + 2$。'
        },
        {
          step: 2,
          name: '再次运用等式的性质 1：两边同减 3x 消去右边的未知数项',
          tStart: 6.2,
          tEnd: 12.8,
          explanation: '为了消去等号右边的 $3x$，根据等式的性质 1，在等式两边同时减去 $3x$，得 $5x - 3x = 3x + 2 - 3x$。'
        },
        {
          step: 3,
          name: '合并同类项化为 $ax = b$ 的标准形式',
          tStart: 12.8,
          tEnd: 18.5,
          explanation: '合并同类项，左边 $5x - 3x = 2x$，右边剩常数 $2$，方程化为 $2x = 2$。'
        },
        {
          step: 4,
          name: '运用等式的性质 2：两边同除以非零系数 2',
          tStart: 18.5,
          tEnd: 24.5,
          explanation: '根据等式的性质 2，在等式 $2x = 2$ 两边同时除以非零数 $2$，得 $\\frac{2x}{2} = \\frac{2}{2}$。'
        },
        {
          step: 5,
          name: '化简得出方程的解并代入检验',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '化简得出 $x = 1$（代入原方程检验：左边 $= 5 \\times 1 - 8 = -3$，右边 $= 3 \\times 1 - 6 = -3$，左边 $=$ 右边）。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 性质 1：两边同加 $8$ 得 $5x = 3x + 2$' },
        { time: 7.5, step: 2, label: '2.1 性质 1：两边同减 $3x$ 得 $5x - 3x = 2$' },
        { time: 14.0, step: 3, label: '3.1 合并同类项得 $2x = 2$' },
        { time: 20.0, step: 4, label: '4.1 性质 2：两边同除以 $2$' },
        { time: 26.0, step: 5, label: '5.1 解得 $x = 1$ 并检验左边 $=$ 右边' }
      ],

      boardRows: [
        {
          rowId: 'p29_row_0',
          stepBadge: '原方程',
          appearAt: 0.0,
          tokens: [
            { id: 'p29_r0_eq', math: '用等式的性质解方程：$5x - 8 = 3x - 6$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p29_row_1',
          stepBadge: '第 1 步 · 等式性质 1（同加 8）',
          appearAt: 1.5,
          tokens: [
            { id: 'p29_r1_add', math: '两边同加 $8$：$5x - 8 + 8 = 3x - 6 + 8$', appearAt: 1.6, dur: 0.45 },
            { id: 'p29_r1_res', math: '$\\implies 5x = 3x + 2$', appearAt: 3.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p29_row_2',
          stepBadge: '第 2 & 3 步 · 等式性质 1（同减 3x）',
          appearAt: 6.6,
          tokens: [
            { id: 'p29_r2_sub', math: '两边同减 $3x$：$5x - 3x = 3x + 2 - 3x$', appearAt: 6.7, dur: 0.45 },
            { id: 'p29_r2_res', math: '$\\implies 2x = 2$', appearAt: 13.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p29_row_3',
          stepBadge: '第 4 & 5 步 · 等式性质 2（同除以 2）',
          appearAt: 19.0,
          isConclusion: true,
          tokens: [
            { id: 'p29_r3_div', math: '两边同除以 $2$：$\\frac{2x}{2} = \\frac{2}{2}$', appearAt: 19.1, dur: 0.45 },
            { id: 'p29_r3_conc', math: '$\\implies x = 1$。', appearAt: 24.8, dur: 0.55 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p29_sp_1',
          title: '核心铁律 · 一元一次方程定义与等式性质 2 除数限制',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p29_sp1_t1', math: '① 一元一次方程：整式、一元、未知数次数 $= 1$ 且一次项系数 $\\neq 0$', appearAt: 1.4, dur: 0.40 },
            { id: 'p29_sp1_t2', math: '② 等式性质 2 陷阱：若 $ac = bc$，必须有 $c \\neq 0$ 才能得出 $a = b$！', appearAt: 6.8, dur: 0.45 },
            { id: 'p29_sp1_t3', math: '③ 恒非零除数：$\\frac{x}{a^{2} + 1} = \\frac{y}{a^{2} + 1}$ 恒合法（因 $a^{2} + 1 \\ge 1 \\neq 0$）', appearAt: 19.2, dur: 0.45 }
          ],
          note: '解方程中的“移项”本质上就是等式的性质 1（两边同加减），“系数化为 1”本质上就是等式的性质 2（两边同除以非零系数）'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p29_r1_add', tStart: 1.6, tEnd: 5.8, color: 'amber' },
        { tokenId: 'p29_r1_res', tStart: 3.0, tEnd: 6.0, color: 'teal' },
        { tokenId: 'p29_r2_sub', tStart: 6.7, tEnd: 12.6, color: 'amber' },
        { tokenId: 'p29_r2_res', tStart: 13.2, tEnd: 18.4, color: 'teal' },
        { tokenId: 'p29_r3_div', tStart: 19.1, tEnd: 24.4, color: 'amber' },
        { tokenId: 'p29_r3_conc', tStart: 24.8, tEnd: 29.5, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p29_svg_s1',
          type: 'arrow',
          fromToken: 'p29_r0_eq',
          toToken: 'p29_r1_res',
          label: '性质 1：两边同加 $8$',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 1.8,
          tDrawEnd: 2.6,
          tFadeStart: 5.4,
          tEnd: 6.0
        },
        {
          id: 'p29_svg_s4',
          type: 'arrow',
          fromToken: 'p29_r2_res',
          toToken: 'p29_r3_div',
          label: '性质 2：两边同除以 $2 \\neq 0$',
          color: '#D97706',
          curveOffset: -26,
          tStart: 18.8,
          tDrawEnd: 19.6,
          tFadeStart: 23.8,
          tEnd: 24.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.2, text: '第一步运用等式的性质 1：在方程 $5x - 8 = 3x - 6$ 两边同时加上 $8$，消去左边的 $-8$，得 $5x = 3x + 2$。', focusToken: 'p29_r1_res' },
        { tStart: 6.2, tEnd: 12.8, text: '第二步继续运用等式的性质 1：在等式两边同时减去 $3x$，消去右边的未知数项 $3x$。', focusToken: 'p29_r2_sub' },
        { tStart: 12.8, tEnd: 18.5, text: '第三步合并同类项：$5x - 3x = 2x$，方程化为 $2x = 2$。', focusToken: 'p29_r2_res' },
        { tStart: 18.5, tEnd: 30.0, text: '第四步运用等式的性质 2：在等式两边同时除以非零系数 $2$，解得 $x = 1$！', focusToken: 'p29_r3_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：辨析等式的性质 2 中“除数不为 0”的前提',
          givenLabel: '给出四个等式变形命题：',
          givenFormula: '① 若 $a = b$，则 $\\frac{a}{c} = \\frac{b}{c}$；② 若 $a^{2} = 2a$，则 $a = 2$；③ 若 $x = y$，则 $\\frac{x}{a^{2} + 1} = \\frac{y}{a^{2} + 1}$',
          extractedLabel: '核对除数是否可能为 0：',
          extractedFormula: '① 中 $c$ 可能为 $0$；② 中 $a$ 可能为 $0$；③ 中 $a^{2} + 1 \\ge 1 \\neq 0$',
          questionText: '其中一定成立的等式变形是哪一个？',
          options: [
            { key: 'A', text: 'A. 只有 ③（因为对任意实数 $a$，分母 $a^{2} + 1 \\ge 1 \\neq 0$ 恒成立）', isCorrect: true },
            { key: 'B', text: 'B. ①、②、③ 都一定成立', isCorrect: false },
            { key: 'C', text: 'C. ② 和 ③ 一定成立', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！在等式两边同除以一个式子前，必须确认它绝不为 0：',
            calcLines: [
              '① 未说明 $c \\neq 0$，当 $c = 0$ 时无意义',
              '② 当 $a = 0$ 时 $a^{2} = 2a$ 也成立，不能直接两边同除以 $a$',
              '③ 因为 $a^{2} \\ge 0 \\implies a^{2} + 1 \\ge 1 \\gt 0$，除数恒不为 $0$ ✓'
            ],
            summary: '凡是两边同除以单独的字母或一次式，未注明不为 $0$ 的一律判定为错误。'
          },
          wrongTitle: '提示：请检查每个变形中的除数有没有可能等于 0',
          wrongFeedback: '在 ① 和 ② 中，除数 $c$ 和 $a$ 都有可能等于 $0$；只有 ③ 的除数 $a^{2} + 1 \\ge 1$ 永远不为 $0$，请再试一次。'
        },
        practice2: {
          title: '练习二：由一元一次方程的定义求参数',
          givenLabel: '已知条件：',
          givenFormula: '关于 $x$ 的方程 $(m + 1)x^{|m|} + 3 = 0$ 是一元一次方程',
          questionText: '由未知数次数 $|m| = 1$ 且一次项系数 $m + 1 \\neq 0$，解出的参数 $m$ 的值以及 $m - 1$ 的值分别是多少？',
          input1Prefix: '$m =$',
          input1Placeholder: '如 1',
          input2Prefix: '，$m - 1 =$',
          input2Placeholder: '如 0',
          input2Suffix: '',
          expectedX: '1',
          expectedMin: '0',
          allowOrderSwap: false,
          correctFeedback: '$m = 1$，$m - 1 = 0$。',
          correctDetail: '由 $|m| = 1$ 得 $m = \\pm 1$；又因一次项系数 $m + 1 \\neq 0 \\implies m \\neq -1$，故 $m = 1$，从而 $m - 1 = 0$。',
          wrongFeedback: '由 $|m| = 1$ 得 $m = 1$ 或 $-1$，结合一次项系数 $m + 1 \\neq 0$ 舍去 $m = -1$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '-1',
              hint: '若 $m = -1$，则一次项系数 $m + 1 = 0$，未知数 $x$ 消失，不再是一元一次方程，必须舍去 $-1$ 取 $m = 1$。'
            }
          ]
        }
      }
    }
    ,
    // =========================================================================
    // P30：运用同底数幂乘法、幂的乘方与积的乘方法则运算
    // =========================================================================
    P30: {
      procedureId: 'P30',
      title: '运用同底数幂乘法、幂的乘方与积的乘方法则运算',
      exampleTitle: '计算：(1) $(-2a^{2})^{3} + 3a^{3} \\cdot a^{3}$；(2) 已知 $a^{m} = 2$，$a^{n} = 3$，求 $a^{2m+n}$ 的值',
      exampleFormula: '正向：$(ab)^{n} = a^{n}b^{n}$，$a^{m}\\cdot a^{n} = a^{m+n}$；逆向：$a^{2m+n} = (a^{m})^{2}\\cdot a^{n}$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示幂的三大运算法则正逆向对照与“数字系数同步乘方”易错提醒）',
      practiceSectionTitle: '幂的运算正逆向法则跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握同底数幂乘法、积的乘方与逆用幂法则求值',

      steps: [
        {
          step: 1,
          name: '第(1)题先算积的乘方与幂的乘方',
          tStart: 0.0,
          tEnd: 6.2,
          explanation: '对 $(-2a^{2})^{3}$ 运用积的乘方，把数字系数 $-2$ 与字母幂 $a^{2}$ 分别立方：$(-2)^{3} \\cdot (a^{2})^{3} = -8a^{6}$（指数相乘 $2 \\times 3 = 6$）。'
        },
        {
          step: 2,
          name: '第(1)题再算同底数幂乘法并合并同类项',
          tStart: 6.2,
          tEnd: 12.5,
          explanation: '对 $3a^{3} \\cdot a^{3}$ 运用同底数幂乘法，底数不变指数相加得 $3a^{3+3} = 3a^{6}$；最后合并同类项 $-8a^{6} + 3a^{6} = -5a^{6}$（只合并系数，指数不变）。'
        },
        {
          step: 3,
          name: '第(2)题逆用同底数幂乘法拆解指数加法',
          tStart: 12.5,
          tEnd: 18.5,
          explanation: '观察目标 $a^{2m+n}$ 的指数含有加法 $2m + n$，逆用同底数幂乘法法则 $a^{p+q} = a^{p} \\cdot a^{q}$，拆分为 $a^{2m} \\cdot a^{n}$。'
        },
        {
          step: 4,
          name: '第(2)题逆用幂的乘方构造已知底数 $a^{m}$',
          tStart: 18.5,
          tEnd: 24.5,
          explanation: '对 $a^{2m}$ 逆用幂的乘方法则 $a^{km} = (a^{m})^{k}$，改写为 $(a^{m})^{2}$，于是 $a^{2m+n} = (a^{m})^{2} \\cdot a^{n}$。'
        },
        {
          step: 5,
          name: '整体代入 $a^{m} = 2$，$a^{n} = 3$ 算出结果',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '将已知 $a^{m} = 2$，$a^{n} = 3$ 整体代入得 $2^{2} \\times 3 = 4 \\times 3 = 12$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 算 $(-2a^{2})^{3} = (-2)^{3} \\cdot (a^{2})^{3} = -8a^{6}$' },
        { time: 7.5, step: 2, label: '2.1 算 $3a^{3} \\cdot a^{3} = 3a^{6}$ 并合并得 $-5a^{6}$' },
        { time: 14.0, step: 3, label: '3.1 逆用同底数幂乘法拆为 $a^{2m} \\cdot a^{n}$' },
        { time: 20.0, step: 4, label: '4.1 逆用幂的乘方化为 $(a^{m})^{2} \\cdot a^{n}$' },
        { time: 26.0, step: 5, label: '5.1 代入 $2^{2} \\times 3 = 12$' }
      ],

      boardRows: [
        {
          rowId: 'p30_row_0',
          stepBadge: '第(1)题 · 积的乘方与幂的乘方',
          appearAt: 0.0,
          tokens: [
            { id: 'p30_r0_orig', math: '(1) $(-2a^{2})^{3} + 3a^{3} \\cdot a^{3}$', appearAt: 0.0, dur: 0.01 },
            { id: 'p30_r0_s1', math: '$= (-2)^{3}(a^{2})^{3} + 3a^{3+3}$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p30_row_1',
          stepBadge: '第(1)题 · 合并同类项',
          appearAt: 6.4,
          tokens: [
            { id: 'p30_r1_s2', math: '$= -8a^{6} + 3a^{6}$', appearAt: 6.5, dur: 0.45 },
            { id: 'p30_r1_res', math: '$= -5a^{6}$', appearAt: 8.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p30_row_2',
          stepBadge: '第(2)题 · 逆用幂法则拆解',
          appearAt: 12.8,
          tokens: [
            { id: 'p30_r2_split', math: '(2) $a^{2m+n} = a^{2m} \\cdot a^{n}$', appearAt: 12.9, dur: 0.45 },
            { id: 'p30_r2_pow', math: '$= (a^{m})^{2} \\cdot a^{n}$', appearAt: 18.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p30_row_3',
          stepBadge: '最终结论',
          appearAt: 24.8,
          isConclusion: true,
          tokens: [
            { id: 'p30_r3_conc', math: '$= 2^{2} \\times 3 = 4 \\times 3 = 12$。', appearAt: 24.9, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p30_sp_1',
          title: '核心对照 · 幂的三大法则正逆向与同类项区分',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p30_sp1_t1', math: '① 同底数幂乘法：$a^{m} \\cdot a^{n} = a^{m+n}$（指数相加）', appearAt: 1.4, dur: 0.40 },
            { id: 'p30_sp1_t2', math: '② 幂的乘方：$(a^{m})^{n} = a^{mn}$（指数相乘）', appearAt: 2.6, dur: 0.40 },
            { id: 'p30_sp1_t3', math: '③ 积的乘方：$(ab)^{n} = a^{n}b^{n}$（每个因式都乘方）', appearAt: 3.8, dur: 0.40 },
            { id: 'p30_sp1_t4', math: '④ 合并同类项：$-8a^{6} + 3a^{6} = -5a^{6}$（指数绝不变）', appearAt: 7.4, dur: 0.40 }
          ],
          note: '高频易错：计算 $(-2a^{2})^{3}$ 时，数字系数 $-2$ 也要立方得 $-8$，切勿写成 $-2a^{6}$ 或 $-6a^{6}$'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p30_r0_s1', tStart: 1.6, tEnd: 6.0, color: 'amber' },
        { tokenId: 'p30_r1_res', tStart: 8.5, tEnd: 12.4, color: 'teal' },
        { tokenId: 'p30_r2_split', tStart: 12.9, tEnd: 18.4, color: 'teal' },
        { tokenId: 'p30_r2_pow', tStart: 18.8, tEnd: 24.4, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p30_svg_s1',
          type: 'arrow',
          fromToken: 'p30_r0_orig',
          toToken: 'p30_r0_s1',
          label: '$-2$ 与 $a^{2}$ 分别立方',
          color: '#D97706',
          curveOffset: 28,
          tStart: 1.8,
          tDrawEnd: 2.6,
          tFadeStart: 5.4,
          tEnd: 6.0
        },
        {
          id: 'p30_svg_s4',
          type: 'arrow',
          fromToken: 'p30_r2_split',
          toToken: 'p30_r2_pow',
          label: '逆用幂的乘方 $a^{2m} = (a^{m})^{2}$',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 18.6,
          tDrawEnd: 19.4,
          tFadeStart: 23.8,
          tEnd: 24.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.2, text: '看第(1)题第一步：先算 $(-2a^{2})^{3}$，数字系数 $-2$ 立方得 $-8$，字母幂 $(a^{2})^{3}$ 指数相乘得 $a^{6}$，结果为 $-8a^{6}$。', focusToken: 'p30_r0_s1' },
        { tStart: 6.2, tEnd: 12.5, text: '第二步算同底数幂乘法 $3a^{3} \\cdot a^{3} = 3a^{6}$，再合并同类项 $-8a^{6} + 3a^{6} = -5a^{6}$（合并同类项时指数不变）。', focusToken: 'p30_r1_res' },
        { tStart: 12.5, tEnd: 18.5, text: '看第(2)题第一步：指数 $2m + n$ 是加法，逆用同底数幂乘法拆分为 $a^{2m} \\cdot a^{n}$。', focusToken: 'p30_r2_split' },
        { tStart: 18.5, tEnd: 24.5, text: '第二步对 $a^{2m}$ 逆用幂的乘方，写成 $(a^{m})^{2}$，得到 $(a^{m})^{2} \\cdot a^{n}$。', focusToken: 'p30_r2_pow' },
        { tStart: 24.5, tEnd: 30.0, text: '最后把 $a^{m} = 2$，$a^{n} = 3$ 整体代入，算出 $2^{2} \\times 3 = 12$！', focusToken: 'p30_r3_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：辨析幂的运算与合并同类项',
          givenLabel: '给出三个幂的运算式：',
          givenFormula: '① $a^{2} \\cdot a^{3} = a^{6}$；② $(-3x^{2})^{2} = 9x^{4}$；③ $a^{3} + a^{3} = a^{6}$',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '其中运算完全正确的是哪一个？',
          options: [
            { key: 'A', text: 'A. ② $(-3x^{2})^{2} = (-3)^{2} \\cdot (x^{2})^{2} = 9x^{4}$', isCorrect: true },
            { key: 'B', text: 'B. ① $a^{2} \\cdot a^{3} = a^{6}$', isCorrect: false },
            { key: 'C', text: 'C. ③ $a^{3} + a^{3} = a^{6}$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！准确区分“指数相加、指数相乘、指数不变”：',
            calcLines: [
              '① 同底数幂乘法指数相加：$a^{2} \\cdot a^{3} = a^{2+3} = a^{5}$',
              '② 积的乘方：$(-3)^{2}(x^{2})^{2} = 9x^{4}$ ✓',
              '③ 合并同类项指数不变：$a^{3} + a^{3} = 2a^{3}$'
            ],
            summary: '记住口诀：“同底乘，指相加；幂乘方，指相乘；同类加，指不变”。'
          },
          wrongTitle: '提示：请区分同底数幂乘法、幂的乘方与合并同类项的指数规则',
          wrongFeedback: '同底数幂乘法是指数相加（$a^{2} \\cdot a^{3} = a^{5}$），合并同类项是指数不变（$a^{3} + a^{3} = 2a^{3}$），请再试一次。'
        },
        practice2: {
          title: '练习二：逆用幂的运算法则求值',
          givenLabel: '已知条件：',
          givenFormula: '$x^{a} = 3，\\quad x^{b} = 2$',
          questionText: '逆用幂的运算法则，分别求出 $x^{a+b}$ 和 $x^{2a+b}$ 的值是多少？',
          input1Prefix: '$x^{a+b} =$',
          input1Placeholder: '如 6',
          input2Prefix: '，$x^{2a+b} =$',
          input2Placeholder: '如 18',
          input2Suffix: '',
          expectedX: '6',
          expectedMin: '18',
          allowOrderSwap: false,
          correctFeedback: '$x^{a+b} = 6$，$x^{2a+b} = 18$。',
          correctDetail: '由 $x^{a+b} = x^{a} \\cdot x^{b} = 3 \\times 2 = 6$；$x^{2a+b} = (x^{a})^{2} \\cdot x^{b} = 3^{2} \\times 2 = 9 \\times 2 = 18$。',
          wrongFeedback: '注意 $x^{a+b} = x^{a} \\cdot x^{b}$（相乘而非相加），$x^{2a+b} = (x^{a})^{2} \\cdot x^{b}$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '5',
              hint: '指数相加对应同底数幂相乘，因此 $x^{a+b} = 3 \\times 2 = 6$（不是 $3 + 2 = 5$）。'
            },
            {
              checkType: 'secondVal',
              val: '12',
              hint: '注意 $x^{2a} = (x^{a})^{2} = 3^{2} = 9$（不是 $2 \\times 3 = 6$），故 $9 \\times 2 = 18$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P31：判定分式有意义/值为0条件及运用分式基本性质约分通分
    // =========================================================================
    P31: {
      procedureId: 'P31',
      title: '判定分式有意义/值为0条件及运用分式基本性质约分通分',
      exampleTitle: '已知关于 $x$ 的分式 $\\frac{x^{2}-1}{(x+1)(x-3)}$：(1) 何时无意义；(2) 何时有意义；(3) 何时值为 $0$',
      exampleFormula: '有意义 $\\iff B \\neq 0$；值为 $0 \\iff A = 0$ 且 $B \\neq 0$（必先看原分母！）',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示“有意义/无意义/值为0”判定准则与约分前保留原分母约束）',
      practiceSectionTitle: '分式意义条件与约分通分跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握分式值为 0 的双重检验与因式分解约分',

      steps: [
        {
          step: 1,
          name: '锁定原分式的分子 $A$ 与分母 $B$（切勿先约分）',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '识别原分式分子 $A = x^{2} - 1$，分母 $B = (x + 1)(x - 3)$。判定分式有/无意义或值为 $0$ 时，必须直接对原分母检验，绝不能先约去 $(x + 1)$！'
        },
        {
          step: 2,
          name: '第(1)问：令原分母 $B = 0$ 求无意义条件',
          tStart: 5.8,
          tEnd: 11.8,
          explanation: '分式无意义当且仅当分母等于 $0$：令 $(x + 1)(x - 3) = 0$，得 $x + 1 = 0$ 或 $x - 3 = 0$，即 $x = -1$ 或 $x = 3$。'
        },
        {
          step: 3,
          name: '第(2)问：令原分母 $B \\neq 0$ 求有意义条件',
          tStart: 11.8,
          tEnd: 17.5,
          explanation: '分式有意义当且仅当分母不为 $0$：$(x + 1)(x - 3) \\neq 0$，两个因式均不能为 $0$，即 $x \\neq -1$ 且 $x \\neq 3$（注意用“且”连接）。'
        },
        {
          step: 4,
          name: '第(3)问 ①：令分子 $A = 0$ 解出候选值',
          tStart: 17.5,
          tEnd: 23.5,
          explanation: '要使分式值为 $0$，先令分子 $x^{2} - 1 = 0$，分解为 $(x + 1)(x - 1) = 0$，解得两个候选值 $x = 1$ 或 $x = -1$。'
        },
        {
          step: 5,
          name: '第(3)问 ②：联立分母 $B \\neq 0$ 舍去增根定解',
          tStart: 23.5,
          tEnd: 30.0,
          explanation: '将候选值代入原分母检验：当 $x = -1$ 时分母为 $0$（分式无意义），必须舍去！当 $x = 1$ 时分母 $2 \\times (-2) = -4 \\neq 0$，故 $x = 1$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 锁定原分子 $x^{2} - 1$ 与原分母 $(x + 1)(x - 3)$' },
        { time: 7.2, step: 2, label: '2.1 令分母 $= 0$ 得无意义条件 $x = -1$ 或 $x = 3$' },
        { time: 13.2, step: 3, label: '3.1 令分母 $\\neq 0$ 得有意义条件 $x \\neq -1$ 且 $x \\neq 3$' },
        { time: 19.0, step: 4, label: '4.1 令分子 $x^{2} - 1 = 0$ 得候选值 $x = \\pm 1$' },
        { time: 25.5, step: 5, label: '5.1 结合 $x \\neq -1$ 舍去 $-1$，定解 $x = 1$' }
      ],

      boardRows: [
        {
          rowId: 'p31_row_0',
          stepBadge: '原分式',
          appearAt: 0.0,
          tokens: [
            { id: 'p31_r0_frac', math: '分式 $\\frac{x^{2} - 1}{(x + 1)(x - 3)}$：', appearAt: 0.0, dur: 0.01 },
            { id: 'p31_r0_ab', math: '分子 $A = x^{2} - 1$，分母 $B = (x + 1)(x - 3)$', appearAt: 1.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p31_row_1',
          stepBadge: '第(1)问 · 无意义条件',
          appearAt: 6.2,
          tokens: [
            { id: 'p31_r1_zero', math: '令 $(x + 1)(x - 3) = 0$', appearAt: 6.3, dur: 0.45 },
            { id: 'p31_r1_res', math: '$\\implies x = -1$ 或 $x = 3$ 时无意义', appearAt: 7.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p31_row_2',
          stepBadge: '第(2)问 · 有意义条件',
          appearAt: 12.2,
          tokens: [
            { id: 'p31_r2_neq', math: '令 $(x + 1)(x - 3) \\neq 0$', appearAt: 12.3, dur: 0.45 },
            { id: 'p31_r2_res', math: '$\\implies x \\neq -1$ 且 $x \\neq 3$ 时有意义', appearAt: 13.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p31_row_3',
          stepBadge: '第(3)问 · 分子为 0 且分母不为 0',
          appearAt: 18.0,
          tokens: [
            { id: 'p31_r3_num', math: '由 $x^{2} - 1 = 0$ 得 $x = 1$ 或 $x = -1$；', appearAt: 18.1, dur: 0.45 },
            { id: 'p31_r3_drop', math: '又 $x \\neq -1$ 且 $x \\neq 3 \\implies$ 舍去 $x = -1$', appearAt: 23.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p31_row_4',
          stepBadge: '最终结论',
          appearAt: 26.2,
          isConclusion: true,
          tokens: [
            { id: 'p31_r4_conc', math: '$\\therefore$ 当 $x = 1$ 时，分式的值等于 $0$。', appearAt: 26.3, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p31_sp_1',
          title: '核心法则 · 分式意义判定与约分基本性质',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p31_sp1_t1', math: '① 无意义：$B = 0$（连接词用“或”）', appearAt: 6.4, dur: 0.40 },
            { id: 'p31_sp1_t2', math: '② 有意义：$B \\neq 0$（连接词用“且”）', appearAt: 12.6, dur: 0.40 },
            { id: 'p31_sp1_t3', math: '③ 值为 $0$：$A = 0$ 且 $B \\neq 0$（必检原分母！）', appearAt: 18.4, dur: 0.40 },
            { id: 'p31_sp1_t4', math: '④ 约分化简：$\\frac{(x+1)(x-1)}{(x+1)(x-3)} = \\frac{x-1}{x-3}$（先分解再约公因式）', appearAt: 24.4, dur: 0.45 }
          ],
          note: '切记：在有意义前提下才能约去公因式 $(x + 1)$，判定定义域和值为 0 时必须看未约分的原分母'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p31_r0_ab', tStart: 1.2, tEnd: 5.6, color: 'teal' },
        { tokenId: 'p31_r1_res', tStart: 7.8, tEnd: 11.6, color: 'amber' },
        { tokenId: 'p31_r2_res', tStart: 13.8, tEnd: 17.4, color: 'teal' },
        { tokenId: 'p31_r3_drop', tStart: 23.8, tEnd: 26.2, color: 'rose' }
      ],

      svgAnnotations: [
        {
          id: 'p31_svg_s2',
          type: 'arrow',
          fromToken: 'p31_r0_ab',
          toToken: 'p31_r1_zero',
          label: '直接看原分母，不先约分',
          color: '#D97706',
          curveOffset: 28,
          tStart: 6.0,
          tDrawEnd: 6.8,
          tFadeStart: 11.0,
          tEnd: 11.6
        },
        {
          id: 'p31_svg_s5',
          type: 'arrow',
          fromToken: 'p31_r2_res',
          toToken: 'p31_r3_drop',
          label: '分母不为 $0$ 排除 $x = -1$',
          color: '#BE123C',
          curveOffset: 30,
          tStart: 23.6,
          tDrawEnd: 24.4,
          tFadeStart: 28.4,
          tEnd: 29.0
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步锁定原分子 $x^{2} - 1$ 和原分母 $(x + 1)(x - 3)$，切记判定分式有无意义之前绝对不能先约分！', focusToken: 'p31_r0_ab' },
        { tStart: 5.8, tEnd: 11.8, text: '看第(1)问：令原分母 $(x + 1)(x - 3) = 0$，解得 $x = -1$ 或 $x = 3$ 时分式无意义。', focusToken: 'p31_r1_res' },
        { tStart: 11.8, tEnd: 17.5, text: '看第(2)问：分式有意义要求两个分母因式都不能为 $0$，即 $x \\neq -1$ 且 $x \\neq 3$（注意连接词是“且”）。', focusToken: 'p31_r2_res' },
        { tStart: 17.5, tEnd: 23.5, text: '看第(3)问：先令分子 $x^{2} - 1 = 0$，得到两个候选值 $x = 1$ 或 $x = -1$。', focusToken: 'p31_r3_num' },
        { tStart: 23.5, tEnd: 30.0, text: '再联立原分母不为 $0$ 的条件，排除使分母为 $0$ 的 $x = -1$，最终定解当 $x = 1$ 时分式的值等于 $0$！', focusToken: 'p31_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：运用分式基本性质因式分解约分',
          givenLabel: '已知分式：',
          givenFormula: '$\\frac{x^{2} - 4}{x^{2} - 4x + 4}$',
          extractedLabel: '分子、分母分别因式分解：',
          extractedFormula: '分子 $(x + 2)(x - 2)$，分母 $(x - 2)^{2}$',
          questionText: '约去分子与分母的公因式 $(x - 2)$ 后，最简分式结果是？',
          options: [
            { key: 'A', text: 'A. $\\frac{x + 2}{x - 2}$', isCorrect: true },
            { key: 'B', text: 'B. $\\frac{1}{x - 2}$', isCorrect: false },
            { key: 'C', text: 'C. $\\frac{-4}{-4x + 4}$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！多项式分式约分必须“先因式分解，再约去公因式”：',
            calcLines: [
              '$\\frac{x^{2} - 4}{x^{2} - 4x + 4} = \\frac{(x + 2)(x - 2)}{(x - 2)^{2}} = \\frac{x + 2}{x - 2}$'
            ],
            summary: '切勿直接划掉分子分母中的单独项 $x^{2}$，只能约去乘积形式的公因式。'
          },
          wrongTitle: '提示：只能约去因式分解后的公因式',
          wrongFeedback: '分子分解为 $(x + 2)(x - 2)$、分母分解为 $(x - 2)^{2}$，约去一个公因式 $(x - 2)$ 得 $\\frac{x + 2}{x - 2}$，请再试一次。'
        },
        practice2: {
          title: '练习二：判定分式值为 0 的条件',
          givenLabel: '已知分式：',
          givenFormula: '$\\frac{|x| - 2}{x + 2}$',
          questionText: '当分式无意义时，$x$ 等于多少？当分式的值等于 $0$ 时，$x$ 等于多少？',
          input1Prefix: '无意义时 $x =$',
          input1Placeholder: '如 -2',
          input2Prefix: '，值为 $0$ 时 $x =$',
          input2Placeholder: '如 2',
          input2Suffix: '',
          expectedX: '-2',
          expectedMin: '2',
          allowOrderSwap: false,
          correctFeedback: '分式无意义时 $x = -2$，值为 $0$ 时 $x = 2$。',
          correctDetail: '令分母 $x + 2 = 0$ 得 $x = -2$ 时无意义；令分子 $|x| - 2 = 0$ 得 $x = \\pm 2$，结合 $x \\neq -2$ 舍去 $-2$，故 $x = 2$。',
          wrongFeedback: '令分母 $x + 2 = 0$ 求无意义条件；令 $|x| - 2 = 0$ 得 $\\pm 2$ 后，记得排除使分母为 $0$ 的值。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '-2',
              hint: '当 $x = -2$ 时分母 $x + 2 = 0$，分式无意义，故值为 $0$ 时只能取 $x = 2$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P32：运用有理数乘方符号法则与混合运算顺序计算
    // =========================================================================
    P32: {
      procedureId: 'P32',
      title: '运用有理数乘方符号法则与混合运算顺序计算',
      exampleTitle: '计算：$-1^{2025} + (2 - 0.5) \\div (-3)^{2} \\times (-4) + |-1|$',
      exampleFormula: '先算乘方与括号内 $\\to$ 除法转乘倒数从左到右 $\\to$ 最后算加减',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示 $-a^{n}$ 与 $(-a)^{n}$ 的核心辨析及乘除同级从左到右法则）',
      practiceSectionTitle: '有理数乘方与混合运算跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握带括号与不带括号乘方符号辨析及完整混合运算顺序',

      steps: [
        {
          step: 1,
          name: '辨析乘方底数符号，先算乘方、绝对值与括号内',
          tStart: 0.0,
          tEnd: 6.5,
          explanation: '$-1^{2025}$ 的底数是 $1$（不是 $-1$），故 $-1^{2025} = -1$；$(-3)^{2} = 9$；$|-1| = 1$；同时括号内 $2 - 0.5 = 1.5 = \\frac{3}{2}$。'
        },
        {
          step: 2,
          name: '将化简结果回代原式',
          tStart: 6.5,
          tEnd: 12.0,
          explanation: '把第一步各项结果代回，原式转化为 $-1 + \\frac{3}{2} \\div 9 \\times (-4) + 1$。'
        },
        {
          step: 3,
          name: '除法转乘倒数，乘除同级从左到右计算',
          tStart: 12.0,
          tEnd: 19.0,
          explanation: '切勿先算 $9 \\times (-4)$！应将除以 $9$ 转化为乘以 $\\frac{1}{9}$，统一连乘：$\\frac{3}{2} \\times \\frac{1}{9} \\times (-4)$。'
        },
        {
          step: 4,
          name: '先定乘积负号，再约分算出中间项',
          tStart: 19.0,
          tEnd: 24.5,
          explanation: '三个因数中只有 $1$ 个负因数（奇数个），积为负；约分得 $-\\frac{3 \\times 4}{2 \\times 9} = -\\frac{2}{3}$，原式化为 $-1 - \\frac{2}{3} + 1$。'
        },
        {
          step: 5,
          name: '巧用相反数抵消算加减得结果',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '观察首尾 $-1$ 与 $+1$ 互为相反数，相加为 $0$，直接得出最终结果为 $-\\frac{2}{3}$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 算 $-1^{2025} = -1$，$(-3)^{2} = 9$，$|-1| = 1$，$2 - 0.5 = \\frac{3}{2}$' },
        { time: 7.5, step: 2, label: '2.1 回代得 $-1 + \\frac{3}{2} \\div 9 \\times (-4) + 1$' },
        { time: 14.0, step: 3, label: '3.1 除法转乘倒数：$\\frac{3}{2} \\times \\frac{1}{9} \\times (-4)$' },
        { time: 20.5, step: 4, label: '4.1 定符号并约分得 $-\\frac{2}{3}$' },
        { time: 26.0, step: 5, label: '5.1 $-1 + 1 = 0$ 抵消，得最终结果 $-\\frac{2}{3}$' }
      ],

      boardRows: [
        {
          rowId: 'p32_row_0',
          stepBadge: '原式',
          appearAt: 0.0,
          tokens: [
            { id: 'p32_r0_p1', math: '$-1^{2025}$', appearAt: 0.0, dur: 0.01 },
            { id: 'p32_r0_p2', math: '$+ (2 - 0.5) \\div (-3)^{2} \\times (-4)$', appearAt: 0.0, dur: 0.01 },
            { id: 'p32_r0_p3', math: '$+ |-1|$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p32_row_1',
          stepBadge: '第 1 & 2 步 · 算乘方、绝对值与括号',
          appearAt: 1.5,
          tokens: [
            { id: 'p32_r1_m1', math: '$= -1$', appearAt: 1.6, dur: 0.40 },
            { id: 'p32_r1_mid', math: '$+ \\frac{3}{2} \\div 9 \\times (-4)$', appearAt: 3.0, dur: 0.45 },
            { id: 'p32_r1_p1', math: '$+ 1$', appearAt: 4.5, dur: 0.35 }
          ]
        },
        {
          rowId: 'p32_row_2',
          stepBadge: '第 3 步 · 除法转乘倒数',
          appearAt: 12.4,
          tokens: [
            { id: 'p32_r2_t1', math: '$= -1 +$', appearAt: 12.5, dur: 0.35 },
            { id: 'p32_r2_mul', math: '$\\frac{3}{2} \\times \\frac{1}{9} \\times (-4)$', appearAt: 13.4, dur: 0.45 },
            { id: 'p32_r2_t3', math: '$+ 1$', appearAt: 14.5, dur: 0.35 }
          ]
        },
        {
          rowId: 'p32_row_3',
          stepBadge: '第 4 步 · 约分算乘除',
          appearAt: 19.2,
          tokens: [
            { id: 'p32_r3_val', math: '$= -1 - \\frac{2}{3} + 1$', appearAt: 19.3, dur: 0.45 }
          ]
        },
        {
          rowId: 'p32_row_4',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p32_r4_conc', math: '$= -\\frac{2}{3}$。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p32_sp_1',
          title: '草稿警示 · 乘方底数符号与运算顺序两大高频陷阱',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p32_sp1_t1', math: '① $-1^{2024} = -1$（底数是 $1$，负号在乘方外）', appearAt: 1.4, dur: 0.40 },
            { id: 'p32_sp1_t2', math: '② $(-1)^{2024} = +1$（底数是 $-1$，偶次幂为正）', appearAt: 2.6, dur: 0.40 },
            { id: 'p32_sp1_t3', math: '③ 乘除同级：$\\frac{3}{2} \\div 9 \\times (-4) = \\frac{3}{2} \\times \\frac{1}{9} \\times (-4)$（绝不先算 $9 \\times (-4)$）', appearAt: 12.8, dur: 0.45 }
          ],
          note: '算完乘除后，若遇互为相反数的项（如 $-1$ 与 $+1$），先结合抵消为 $0$ 可大幅简化计算'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p32_r0_p1', tStart: 0.8, tEnd: 6.2, color: 'rose' },
        { tokenId: 'p32_r1_mid', tStart: 6.6, tEnd: 11.8, color: 'amber' },
        { tokenId: 'p32_r2_mul', tStart: 13.4, tEnd: 18.8, color: 'teal' },
        { tokenId: 'p32_r3_val', tStart: 19.3, tEnd: 24.4, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p32_svg_s1',
          type: 'arrow',
          fromToken: 'p32_r0_p1',
          toToken: 'p32_r1_m1',
          label: '底数是 $1$，结果为 $-1$',
          color: '#BE123C',
          curveOffset: -26,
          tStart: 1.4,
          tDrawEnd: 2.2,
          tFadeStart: 5.6,
          tEnd: 6.2
        },
        {
          id: 'p32_svg_s3',
          type: 'arrow',
          fromToken: 'p32_r1_mid',
          toToken: 'p32_r2_mul',
          label: '除以 $9$ 转乘 $\\frac{1}{9}$',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 12.6,
          tDrawEnd: 13.4,
          tFadeStart: 18.0,
          tEnd: 18.6
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.5, text: '第一步先算乘方、绝对值与括号内：$-1^{2025} = -1$，$(-3)^{2} = 9$，$|-1| = 1$，$2 - 0.5 = \\frac{3}{2}$。', focusToken: 'p32_r1_mid' },
        { tStart: 6.5, tEnd: 12.0, text: '第二步回代原式，得到 $-1 + \\frac{3}{2} \\div 9 \\times (-4) + 1$。', focusToken: 'p32_r1_mid' },
        { tStart: 12.0, tEnd: 19.0, text: '第三步处理乘除同级运算：千万不能先算 $9 \\times (-4)$，要把除以 $9$ 转化为乘以倒数 $\\frac{1}{9}$！', focusToken: 'p32_r2_mul' },
        { tStart: 19.0, tEnd: 24.5, text: '第四步定符号并约分：$\\frac{3}{2} \\times \\frac{1}{9} \\times (-4) = -\\frac{2}{3}$，原式化为 $-1 - \\frac{2}{3} + 1$。', focusToken: 'p32_r3_val' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步算加减：$-1$ 与 $+1$ 互为相反数直接抵消为 $0$，得出最终结果 $-\\frac{2}{3}$！', focusToken: 'p32_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：辨析 $-a^{n}$ 与 $(-a)^{n}$ 的符号结果',
          givenLabel: '给出三组乘方算式：',
          givenFormula: '① $-2^{4}$；② $(-2)^{4}$；③ $-3^{2} + (-3)^{2}$',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '这三个算式的计算结果依次是？',
          options: [
            { key: 'A', text: 'A. ① $-16$；② $16$；③ $0$', isCorrect: true },
            { key: 'B', text: 'B. ① $16$；② $16$；③ $18$', isCorrect: false },
            { key: 'C', text: 'C. ① $-8$；② $8$；③ $0$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！准确判断负号是否在括号内是乘方计算的关键：',
            calcLines: [
              '① $-2^{4} = -(2 \\times 2 \\times 2 \\times 2) = -16$（底数是 $2$）',
              '② $(-2)^{4} = +16$（底数是 $-2$，偶次幂为正）',
              '③ $-3^{2} + (-3)^{2} = -9 + 9 = 0$'
            ],
            summary: '无括号时负号不参与乘方，有括号时负号随底数一起参与乘方。'
          },
          wrongTitle: '提示：请注意负号在括号内外的区别，以及乘方不是底数乘指数',
          wrongFeedback: '$-2^{4}$ 表示 $2^{4}$ 的相反数即 $-16$，而 $(-2)^{4} = +16$；同样 $-3^{2} = -9$ 而 $(-3)^{2} = +9$，请再试一次。'
        },
        practice2: {
          title: '练习二：按顺序计算有理数乘方混合运算',
          givenLabel: '计算算式：',
          givenFormula: '$-2^{2} + (-3)^{2} \\times 2 - 12 \\div (-3)$',
          questionText: '先算出第一项 $-2^{2}$ 的值，再按运算顺序算出整个算式的最终结果分别是多少？',
          input1Prefix: '$-2^{2} =$',
          input1Placeholder: '如 -4',
          input2Prefix: '，最终结果 $=$',
          input2Placeholder: '如 18',
          input2Suffix: '',
          expectedX: '-4',
          expectedMin: '18',
          allowOrderSwap: false,
          correctFeedback: '$-2^{2} = -4$，整个算式的最终结果为 $18$。',
          correctDetail: '原式 $= -4 + 9 \\times 2 - (-4) = -4 + 18 + 4 = 18$。',
          wrongFeedback: '先算乘方 $-2^{2} = -4$，$(-3)^{2} = 9$；再算乘除 $9 \\times 2 = 18$，$12 \\div (-3) = -4$；最后算 $-4 + 18 - (-4)$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '4',
              hint: '注意 $-2^{2}$ 没有括号，表示 $2^{2}$ 的相反数，等于 $-4$ 而不是 $4$。'
            },
            {
              checkType: 'secondVal',
              val: '10',
              hint: '注意最后一项是 $-12 \\div (-3) = -(-4) = +4$，故 $-4 + 18 + 4 = 18$ 而不是 $10$。'
            }
          ]
        }
      }
    },

    // =========================================================================
    // P33：运用绝对值的性质、非负性求值及比较有理数大小
    // =========================================================================
    P33: {
      procedureId: 'P33',
      title: '运用绝对值的性质、非负性求值及比较有理数大小',
      exampleTitle: '比较各组数的大小：(1) $-7$ 和 $2$；(2) $-\\frac{9}{7}$ 和 $-\\frac{6}{5}$；(3) $-|-5.7|$ 和 $|-2.9|$；(4) $-\\frac{1}{2}$、$-\\frac{1}{3}$、$\\frac{1}{4}$',
      exampleFormula: '先去绝对值化简 $\\to$ 正数 $> 0 >$ 负数 $\\to$ 两负数绝对值大的反而小',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示绝对值去符号法则、两负数通分比大小与非负性模型）',
      practiceSectionTitle: '绝对值性质与有理数大小比较跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握“两负数绝对值大的反而小”与绝对值非负性求值',

      steps: [
        {
          step: 1,
          name: '第(1)组异号比较：正数大于负数',
          tStart: 0.0,
          tEnd: 5.5,
          explanation: '$-7$ 是负数，$2$ 是正数，由“正数大于 $0$，大于一切负数”，直接得出 $-7 \\lt 2$。'
        },
        {
          step: 2,
          name: '第(3)组先去绝对值化简，再比较正负',
          tStart: 5.5,
          tEnd: 11.5,
          explanation: '遇到含多重符号和绝对值的数先化简：$-|-5.7| = -5.7$，$|-2.9| = 2.9$。因为 $-5.7 \\lt 2.9$，故 $-|-5.7| \\lt |-2.9|$（结论写原数）。'
        },
        {
          step: 3,
          name: '第(2)组两负数先分别求绝对值并通分',
          tStart: 11.5,
          tEnd: 18.0,
          explanation: '比较 $-\\frac{9}{7}$ 与 $-\\frac{6}{5}$ 时，先分别取绝对值并通分：$\\left|-\\frac{9}{7}\\right| = \\frac{9}{7} = \\frac{45}{35}$，$\\left|-\\frac{6}{5}\\right| = \\frac{6}{5} = \\frac{42}{35}$。'
        },
        {
          step: 4,
          name: '第(2)组用“两个负数，绝对值大的反而小”定结论',
          tStart: 18.0,
          tEnd: 24.0,
          explanation: '因为绝对值 $\\frac{45}{35} \\gt \\frac{42}{35}$，两个负数比较大小时绝对值大的反而小，所以 $-\\frac{9}{7} \\lt -\\frac{6}{5}$。'
        },
        {
          step: 5,
          name: '第(4)组多有理数分组排序',
          tStart: 24.0,
          tEnd: 30.0,
          explanation: '正数 $\\frac{1}{4}$ 最大；两负数 $-\\frac{1}{2}$ 与 $-\\frac{1}{3}$ 比较绝对值 $\\frac{1}{2} \\gt \\frac{1}{3}$，故 $-\\frac{1}{2} \\lt -\\frac{1}{3} \\lt \\frac{1}{4}$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 异号直接判定 $-7 \\lt 2$' },
        { time: 7.0, step: 2, label: '2.1 化简 $-|-5.7| = -5.7$，$|-2.9| = 2.9$ 得前者小于后者' },
        { time: 13.5, step: 3, label: '3.1 通分比较绝对值：$\\frac{45}{35} \\gt \\frac{42}{35}$' },
        { time: 19.5, step: 4, label: '4.1 绝对值大的反而小：$-\\frac{9}{7} \\lt -\\frac{6}{5}$' },
        { time: 26.0, step: 5, label: '5.1 汇总第(4)组排序：$-\\frac{1}{2} \\lt -\\frac{1}{3} \\lt \\frac{1}{4}$' }
      ],

      boardRows: [
        {
          rowId: 'p33_row_0',
          stepBadge: '第(1)组 · 异号比较',
          appearAt: 0.0,
          tokens: [
            { id: 'p33_r0_1', math: '(1) 负数小于正数 $\\implies -7 \\lt 2$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p33_row_1',
          stepBadge: '第(3)组 · 先化简再比较',
          appearAt: 5.8,
          tokens: [
            { id: 'p33_r1_sim', math: '(3) $-|-5.7| = -5.7$，$|-2.9| = 2.9$', appearAt: 5.9, dur: 0.45 },
            { id: 'p33_r1_res', math: '$\\implies -|-5.7| \\lt |-2.9|$', appearAt: 8.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p33_row_2',
          stepBadge: '第(2)组 ① · 通分比绝对值',
          appearAt: 12.0,
          tokens: [
            { id: 'p33_r2_abs', math: '(2) $\\left|-\\frac{9}{7}\\right| = \\frac{45}{35}$， $\\left|-\\frac{6}{5}\\right| = \\frac{42}{35}$', appearAt: 12.1, dur: 0.45 },
            { id: 'p33_r2_gt', math: '，$\\because \\frac{45}{35} \\gt \\frac{42}{35}$', appearAt: 14.5, dur: 0.40 }
          ]
        },
        {
          rowId: 'p33_row_3',
          stepBadge: '第(2)组 ② · 绝对值大的反而小',
          appearAt: 18.4,
          tokens: [
            { id: 'p33_r3_res', math: '$\\therefore -\\frac{9}{7} \\lt -\\frac{6}{5}$', appearAt: 18.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p33_row_4',
          stepBadge: '第(4)组 · 最终排序',
          appearAt: 24.5,
          isConclusion: true,
          tokens: [
            { id: 'p33_r4_conc', math: '(4) $\\because \\frac{1}{2} \\gt \\frac{1}{3} \\implies -\\frac{1}{2} \\lt -\\frac{1}{3} \\lt \\frac{1}{4}$。', appearAt: 24.6, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p33_sp_1',
          title: '核心法则 · 绝对值三大高频用法',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p33_sp1_t1', math: '① 去绝对值：$|a| = a\\ (a \\ge 0)$，$|a| = -a\\ (a \\lt 0)$', appearAt: 1.4, dur: 0.40 },
            { id: 'p33_sp1_t2', math: '② 非负性：若 $|A| + |B| = 0$，则 $A = 0$ 且 $B = 0$', appearAt: 6.4, dur: 0.40 },
            { id: 'p33_sp1_t3', math: '③ 比较两负数：先算绝对值通分，绝对值大的反而小', appearAt: 12.6, dur: 0.45 }
          ],
          note: '书写规范：化简完 $-|-5.7| = -5.7$ 后，最终不等式结论仍要写回原数 $-|-5.7| \\lt |-2.9|$'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p33_r1_sim', tStart: 5.9, tEnd: 11.4, color: 'amber' },
        { tokenId: 'p33_r2_abs', tStart: 12.1, tEnd: 17.8, color: 'teal' },
        { tokenId: 'p33_r3_res', tStart: 18.5, tEnd: 23.8, color: 'rose' },
        { tokenId: 'p33_r4_conc', tStart: 24.6, tEnd: 29.5, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p33_svg_s2',
          type: 'arrow',
          fromToken: 'p33_r1_sim',
          toToken: 'p33_r1_res',
          label: '写回原数下结论',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 7.4,
          tDrawEnd: 8.2,
          tFadeStart: 11.0,
          tEnd: 11.5
        },
        {
          id: 'p33_svg_s4',
          type: 'arrow',
          fromToken: 'p33_r2_gt',
          toToken: 'p33_r3_res',
          label: '两负数不等号反向',
          color: '#BE123C',
          curveOffset: -26,
          tStart: 18.2,
          tDrawEnd: 19.0,
          tFadeStart: 23.2,
          tEnd: 23.8
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.5, text: '看第(1)组：$-7$ 是负数，$2$ 是正数，正数大于一切负数，所以 $-7 \\lt 2$。', focusToken: 'p33_r0_1' },
        { tStart: 5.5, tEnd: 11.5, text: '看第(3)组：先去绝对值符号，$-|-5.7| = -5.7$，$|-2.9| = 2.9$，负数小于正数，写回原数得 $-|-5.7| \\lt |-2.9|$。', focusToken: 'p33_r1_res' },
        { tStart: 11.5, tEnd: 18.0, text: '看第(2)组：两个负分数比较，先求绝对值并通分：$\\frac{9}{7} = \\frac{45}{35}$，$\\frac{6}{5} = \\frac{42}{35}$。', focusToken: 'p33_r2_abs' },
        { tStart: 18.0, tEnd: 24.0, text: '因为 $\\frac{45}{35} \\gt \\frac{42}{35}$，根据“两个负数，绝对值大的反而小”，得出 $-\\frac{9}{7} \\lt -\\frac{6}{5}$！', focusToken: 'p33_r3_res' },
        { tStart: 24.0, tEnd: 30.0, text: '看第(4)组：正数 $\\frac{1}{4}$ 最大，两个负数由 $\\frac{1}{2} \\gt \\frac{1}{3}$ 得 $-\\frac{1}{2} \\lt -\\frac{1}{3}$，排成 $-\\frac{1}{2} \\lt -\\frac{1}{3} \\lt \\frac{1}{4}$。', focusToken: 'p33_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：两个负有理数与含绝对值数的大小比较',
          givenLabel: '比较下列各组有理数的大小：',
          givenFormula: '① $-\\frac{3}{4}$ 与 $-\\frac{2}{3}$；② $-(-3)$ 与 $-|-3|$',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '下列比较结果完全正确的是？',
          options: [
            { key: 'A', text: 'A. $-\\frac{3}{4} \\lt -\\frac{2}{3}$，且 $-(-3) \\gt -|-3|$', isCorrect: true },
            { key: 'B', text: 'B. $-\\frac{3}{4} \\gt -\\frac{2}{3}$，且 $-(-3) \\gt -|-3|$', isCorrect: false },
            { key: 'C', text: 'C. $-\\frac{3}{4} \\lt -\\frac{2}{3}$，且 $-(-3) = -|-3|$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！先通分比绝对值，多重符号先化简：',
            calcLines: [
              '① $\\left|-\\frac{3}{4}\\right| = \\frac{9}{12} \\gt \\left|-\\frac{2}{3}\\right| = \\frac{8}{12} \\implies -\\frac{3}{4} \\lt -\\frac{2}{3}$',
              '② $-(-3) = +3$，$-|-3| = -3 \\implies -(-3) \\gt -|-3|$'
            ],
            summary: '两个负数比较时，绝对值更大的那个数在数轴上更靠左，反而更小。'
          },
          wrongTitle: '提示：请先通分比较绝对值，并把 -(-3) 和 -|-3| 化简为具体数字',
          wrongFeedback: '因为 $\\frac{3}{4} = \\frac{9}{12} \\gt \\frac{8}{12} = \\frac{2}{3}$，所以 $-\\frac{3}{4} \\lt -\\frac{2}{3}$；且 $-(-3) = 3 \\gt -3 = -|-3|$，请再试一次。'
        },
        practice2: {
          title: '练习二：利用绝对值非负性“0 + 0 = 0”求值',
          givenLabel: '已知非负性等式：',
          givenFormula: '$|x - 3| + |y + 2| = 0$',
          questionText: '由绝对值非负性可分别求出 $x$ 的值和 $x + y$ 的值是多少？',
          input1Prefix: '$x =$',
          input1Placeholder: '如 3',
          input2Prefix: '，$x + y =$',
          input2Placeholder: '如 1',
          input2Suffix: '',
          expectedX: '3',
          expectedMin: '1',
          allowOrderSwap: false,
          correctFeedback: '$x = 3$，$x + y = 1$。',
          correctDetail: '因为 $|x - 3| \\ge 0$ 且 $|y + 2| \\ge 0$，和为 $0$ 则 $x - 3 = 0$ 且 $y + 2 = 0$，解得 $x = 3，y = -2$，故 $x + y = 3 + (-2) = 1$。',
          wrongFeedback: '分别令 $x - 3 = 0$ 和 $y + 2 = 0$ 求出 $x = 3，y = -2$，再计算 $3 + (-2)$。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '5',
              hint: '注意由 $y + 2 = 0$ 解得 $y = -2$（不是 $+2$），因此 $x + y = 3 + (-2) = 1$。'
            }
          ]
        }
      }
    }
    ,
    // =========================================================================
    // P34：识别单项式与多项式、确定系数次数项数及由次数项数求参数
    // =========================================================================
    P34: {
      procedureId: 'P34',
      title: '识别单项式与多项式、确定系数次数项数及由次数项数求参数',
      exampleTitle: '对于多项式 $(n - 1)x^{m+2} - 3x^{2} + 2x$（$m > -2$ 的整数）：(1) 若 $n = 2$ 且为三次三项式，求 $m$；(2) 若为五次三项式，求 $m, n$ 满足的条件',
      exampleFormula: '几次几项式 $\\iff$ 最高次项指数 $=$ 目标次数，且最高次项系数 $\\neq 0$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示单项式/多项式次数与系数辨析及“次数=目标且系数≠0”双重条件）',
      practiceSectionTitle: '单项式、多项式概念与次数求参跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握含 π 单项式系数次数提取与多项式次数项数求参',

      steps: [
        {
          step: 1,
          name: '拆解多项式各项与已知次数',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '把多项式 $(n - 1)x^{m+2} - 3x^{2} + 2x$ 拆分为三项：$(n - 1)x^{m+2}$、$-3x^{2}$、$+2x$。后两项的次数分别为 $2$ 和 $1$，且项数已有 $2$ 项。'
        },
        {
          step: 2,
          name: '第(1)问 ①：代入 $n = 2$ 核对首项系数不为 $0$',
          tStart: 5.8,
          tEnd: 11.5,
          explanation: '当 $n = 2$ 时，首项系数 $n - 1 = 2 - 1 = 1 \\neq 0$，多项式化为 $x^{m+2} - 3x^{2} + 2x$，保证首项存在且不会与后两项重复合并。'
        },
        {
          step: 3,
          name: '第(1)问 ②：由“三次三项式”令首项指数等于 $3$',
          tStart: 11.5,
          tEnd: 17.5,
          explanation: '因为后两项次数最高仅为 $2$，要使整个多项式为三次三项式，首项次数必须等于 $3$：列方程 $m + 2 = 3$，解得 $m = 1$。'
        },
        {
          step: 4,
          name: '第(2)问 ①：由“五次三项式”建立双重条件',
          tStart: 17.5,
          tEnd: 23.8,
          explanation: '要使 $(n - 1)x^{m+2} - 3x^{2} + 2x$ 为五次三项式，必须同时满足：① 首项次数等于 $5$（$m + 2 = 5$）；② 首项系数不能为 $0$（$n - 1 \\neq 0$），否则五次项消失变为二次二项式！'
        },
        {
          step: 5,
          name: '第(2)问 ②：分别求解并汇总最终结论',
          tStart: 23.8,
          tEnd: 30.0,
          explanation: '由 $m + 2 = 5$ 解得 $m = 3$，由 $n - 1 \\neq 0$ 得 $n \\neq 1$；综上：(1) $m = 1$；(2) $m = 3$ 且 $n \\neq 1$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 拆分三项并标出后两项次数 $2, 1$' },
        { time: 7.2, step: 2, label: '2.1 代入 $n = 2$ 得首项系数 $1 \\neq 0$' },
        { time: 13.0, step: 3, label: '3.1 令 $m + 2 = 3$ 解得 $m = 1$' },
        { time: 19.2, step: 4, label: '4.1 建立双重条件 $m + 2 = 5$ 且 $n - 1 \\neq 0$' },
        { time: 25.8, step: 5, label: '5.1 解得 $m = 3$ 且 $n \\neq 1$' }
      ],

      boardRows: [
        {
          rowId: 'p34_row_0',
          stepBadge: '原多项式',
          appearAt: 0.0,
          tokens: [
            { id: 'p34_r0_t1', math: '$(n - 1)x^{m+2}$', appearAt: 0.0, dur: 0.01 },
            { id: 'p34_r0_t2', math: '$- 3x^{2} + 2x$', appearAt: 0.0, dur: 0.01 },
            { id: 'p34_r0_note', math: '（后两项次数分别为 $2$、$1$）', appearAt: 1.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p34_row_1',
          stepBadge: '第(1)问 · 代入 n = 2 核系数',
          appearAt: 6.2,
          tokens: [
            { id: 'p34_r1_sub', math: '当 $n = 2$ 时，原式 $= x^{m+2} - 3x^{2} + 2x$', appearAt: 6.3, dur: 0.45 }
          ]
        },
        {
          rowId: 'p34_row_2',
          stepBadge: '第(1)问 · 三次三项式求 m',
          appearAt: 12.0,
          tokens: [
            { id: 'p34_r2_eq', math: '由三次三项式得 $m + 2 = 3$', appearAt: 12.1, dur: 0.45 },
            { id: 'p34_r2_res', math: '$\\implies m = 1$', appearAt: 13.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p34_row_3',
          stepBadge: '第(2)问 · 五次三项式双重条件',
          appearAt: 18.0,
          tokens: [
            { id: 'p34_r3_c1', math: '① 次数条件：$m + 2 = 5$；', appearAt: 18.1, dur: 0.45 },
            { id: 'p34_r3_c2', math: '② 系数条件：$n - 1 \\neq 0$', appearAt: 20.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p34_row_4',
          stepBadge: '最终结论',
          appearAt: 24.4,
          isConclusion: true,
          tokens: [
            { id: 'p34_r4_conc', math: '$\\therefore$ (1) $m = 1$；(2) $m = 3$ 且 $n \\neq 1$。', appearAt: 24.5, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p34_sp_1',
          title: '核心准则 · 整式分类与系数次数三大易错点',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p34_sp1_t1', math: '① 查分母：分母含字母（如 $\\frac{1}{x}$）不是整式；分母为数字或 $\\pi$ 是整式', appearAt: 1.4, dur: 0.40 },
            { id: 'p34_sp1_t2', math: '② 看 $\\pi$ 与数字幂：$\\frac{3\\pi x^{2}y^{3}}{5}$ 系数 $\\frac{3\\pi}{5}$、次数 $5$；$2^{3}x^{2}y$ 次数 $3$', appearAt: 6.8, dur: 0.40 },
            { id: 'p34_sp1_t3', math: '③ 含参求值：最高次项“指数 $=$ 目标次数”且“系数 $\\neq 0$”缺一不可', appearAt: 18.4, dur: 0.45 }
          ],
          note: '若 $n = 1$，则首项 $(1 - 1)x^{5} = 0$，原多项式退化为 $-3x^{2} + 2x$（二次二项式），不再是五次三项式'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p34_r0_t1', tStart: 0.8, tEnd: 5.6, color: 'amber' },
        { tokenId: 'p34_r2_res', tStart: 13.8, tEnd: 17.4, color: 'teal' },
        { tokenId: 'p34_r3_c1', tStart: 18.1, tEnd: 24.0, color: 'teal' },
        { tokenId: 'p34_r3_c2', tStart: 20.0, tEnd: 24.0, color: 'rose' }
      ],

      svgAnnotations: [
        {
          id: 'p34_svg_s3',
          type: 'arrow',
          fromToken: 'p34_r1_sub',
          toToken: 'p34_r2_eq',
          label: '最高次项指数 $= 3$',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 12.0,
          tDrawEnd: 12.8,
          tFadeStart: 16.8,
          tEnd: 17.4
        },
        {
          id: 'p34_svg_s4',
          type: 'arrow',
          fromToken: 'p34_r0_t1',
          toToken: 'p34_r3_c2',
          label: '防五次项消失：$n - 1 \\neq 0$',
          color: '#BE123C',
          curveOffset: -28,
          tStart: 19.6,
          tDrawEnd: 20.4,
          tFadeStart: 23.6,
          tEnd: 24.2
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步拆解多项式：后两项 $-3x^{2}$ 与 $+2x$ 的次数分别是 $2$ 和 $1$，因此三次或五次都只能由首项 $(n - 1)x^{m+2}$ 来决定。', focusToken: 'p34_r0_t1' },
        { tStart: 5.8, tEnd: 11.5, text: '看第(1)问：把 $n = 2$ 代入，首项系数 $2 - 1 = 1 \\neq 0$，原式变为 $x^{m+2} - 3x^{2} + 2x$。', focusToken: 'p34_r1_sub' },
        { tStart: 11.5, tEnd: 17.5, text: '因为是三次三项式，首项指数必须等于 $3$，即 $m + 2 = 3$，解得 $m = 1$。', focusToken: 'p34_r2_res' },
        { tStart: 17.5, tEnd: 23.8, text: '看第(2)问：要成为五次三项式，除了令首项指数 $m + 2 = 5$，还必须保证首项系数 $n - 1 \\neq 0$，否则五次项就会消失！', focusToken: 'p34_r3_c2' },
        { tStart: 23.8, tEnd: 30.0, text: '联立解得 $m = 3$ 且 $n \\neq 1$。整式次数与项数求参完成！', focusToken: 'p34_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：识别整式与确定含 $\\pi$ 单项式的系数和次数',
          givenLabel: '给出三个判断：',
          givenFormula: '① $-\\frac{2\\pi x^{2}y^{3}}{3}$ 的系数是 $-\\frac{2\\pi}{3}$，次数是 $5$；② $2^{3}x^{2}y$ 的次数是 $6$；③ $\\frac{1}{x} + 1$ 是多项式',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '以上说法中完全正确的是哪一项？',
          options: [
            { key: 'A', text: 'A. 只有 ① 正确', isCorrect: true },
            { key: 'B', text: 'B. ① 和 ② 正确', isCorrect: false },
            { key: 'C', text: 'C. ① 和 ③ 正确', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！准确把握常数 π、数字指数与分母字母三项规则：',
            calcLines: [
              '① $\\pi$ 是常数计入系数 $-\\frac{2\\pi}{3}$，字母指数和 $2 + 3 = 5$ ✓',
              '② $2^{3}x^{2}y$ 只算字母指数和 $2 + 1 = 3$（不算数字的指数 $3$）',
              '③ $\\frac{1}{x} + 1$ 分母含字母 $x$，不是整式也不是多项式'
            ],
            summary: '记住“$\\pi$ 算系数不算次，数字幂次不算次，分母含字母非整式”。'
          },
          wrongTitle: '提示：请核对数字指数与分母是否含字母',
          wrongFeedback: '$2^{3}x^{2}y$ 的次数只计算字母 $x, y$ 的指数和（$2+1=3$），而 $\\frac{1}{x}+1$ 分母含字母不是整式，请再试一次。'
        },
        practice2: {
          title: '练习二：由多项式的项数、次数与常数项提取及求参',
          givenLabel: '已知多项式：',
          givenFormula: '$-3x^{2}y^{m-1} + x^{3}y - 3x^{4} - 1$ 是五次四项式',
          questionText: '该多项式的常数项是多少？由最高次项为五次解出的参数 $m$ 的值是多少？',
          input1Prefix: '常数项 $=$',
          input1Placeholder: '如 -1',
          input2Prefix: '，参数 $m =$',
          input2Placeholder: '如 4',
          input2Suffix: '',
          expectedX: '-1',
          expectedMin: '4',
          allowOrderSwap: false,
          correctFeedback: '常数项为 $-1$，参数 $m = 4$。',
          correctDetail: '常数项须连同前面负号写为 $-1$；后三项次数为 $4, 4, 0$，故首项次数为 $5$，列 $2 + (m - 1) = 5$ 解得 $m = 4$。',
          wrongFeedback: '注意常数项要带前面的负号 $-1$，首项 $-3x^{2}y^{m-1}$ 的次数是 $2 + (m - 1) = 5$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '1',
              hint: '多项式的每一项都要连同它前面的符号，因此常数项是 $-1$ 而不是 $1$。'
            },
            {
              checkType: 'secondVal',
              val: '6',
              hint: '首项同时含有 $x^{2}$ 与 $y^{m-1}$，总次数是 $2 + (m - 1) = 5$，解得 $m = 4$（别忘了 $x$ 的次数 $2$）。'
            }
          ]
        }
      }
    }
    ,
    // =========================================================================
    // P35：运用分式乘除与乘方法则化简求值
    // =========================================================================
    P35: {
      procedureId: 'P35',
      title: '运用分式乘除与乘方法则化简求值',
      exampleTitle: '先化简，再求值：$\\frac{a+1}{a-2} \\cdot \\frac{a^{2}-4}{a^{2}+2a+1} \\div \\frac{1}{a^{2}-1}$，其中 $a^{2} + a = 1$',
      exampleFormula: '除法转乘倒数 $\\to$ 多项式彻底因式分解 $\\to$ 约去公因式 $\\to$ 整体代入',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示分式乘除与乘方法则、三大因式分解公式与整体代入技巧）',
      practiceSectionTitle: '分式乘除与乘方化简跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握分式乘方符号系数规则与因式分解约分',

      steps: [
        {
          step: 1,
          name: '按从左到右顺序将除法转化为乘以倒数',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '将末尾的 $\\div \\frac{1}{a^{2}-1}$ 转化为乘以它的倒数 $(a^{2}-1)$，把原式统一为连乘形式：$\\frac{a+1}{a-2} \\cdot \\frac{a^{2}-4}{a^{2}+2a+1} \\cdot (a^{2}-1)$。'
        },
        {
          step: 2,
          name: '将所有可分解的多项式彻底因式分解',
          tStart: 5.8,
          tEnd: 12.2,
          explanation: '分别套用平方差公式与完全平方公式：$a^{2}-4=(a+2)(a-2)$，$a^{2}+2a+1=(a+1)^{2}$，$a^{2}-1=(a+1)(a-1)$。'
        },
        {
          step: 3,
          name: '约去分子与分母中的全部公因式',
          tStart: 12.2,
          tEnd: 18.5,
          explanation: '分子中的 $(a-2)$ 与分母的 $(a-2)$ 约去，分子中的两个 $(a+1)$ 与分母的 $(a+1)^{2}$ 恰好全部约去，剩余整式乘积 $(a+2)(a-1)$。'
        },
        {
          step: 4,
          name: '展开整式乘积构造已知整体 $a^{2} + a$',
          tStart: 18.5,
          tEnd: 24.5,
          explanation: '按多项式乘多项式展开 $(a+2)(a-1) = a^{2} - a + 2a - 2 = a^{2} + a - 2$，恰好出现已知条件中的整体 $a^{2} + a$。'
        },
        {
          step: 5,
          name: '将 $a^{2} + a = 1$ 整体代入得出最终结果',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '无需解出无理数 $a$，直接将 $a^{2} + a = 1$ 整体代入 $a^{2} + a - 2$，算得 $1 - 2 = -1$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 除法转乘倒数 $\\cdot (a^{2}-1)$' },
        { time: 7.2, step: 2, label: '2.1 分解 $a^{2}-4$、$(a+1)^{2}$、$(a+1)(a-1)$' },
        { time: 13.8, step: 3, label: '3.1 约去 $(a-2)$ 与 $(a+1)^{2}$ 得 $(a+2)(a-1)$' },
        { time: 20.0, step: 4, label: '4.1 展开合并得 $a^{2}+a-2$' },
        { time: 26.0, step: 5, label: '5.1 整体代入 $a^{2}+a=1$ 得 $-1$' }
      ],

      boardRows: [
        {
          rowId: 'p35_row_0',
          stepBadge: '原式',
          appearAt: 0.0,
          tokens: [
            { id: 'p35_r0_1', math: '$\\frac{a+1}{a-2} \\cdot \\frac{a^{2}-4}{a^{2}+2a+1}$', appearAt: 0.0, dur: 0.01 },
            { id: 'p35_r0_div', math: '$\\div \\frac{1}{a^{2}-1}$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p35_row_1',
          stepBadge: '第 1 步 · 除法转乘倒数',
          appearAt: 1.5,
          tokens: [
            { id: 'p35_r1_mul', math: '$= \\frac{a+1}{a-2} \\cdot \\frac{a^{2}-4}{a^{2}+2a+1} \\cdot (a^{2}-1)$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p35_row_2',
          stepBadge: '第 2 步 · 彻底因式分解',
          appearAt: 6.2,
          tokens: [
            { id: 'p35_r2_fac', math: '$= \\frac{a+1}{a-2} \\cdot \\frac{(a+2)(a-2)}{(a+1)^{2}} \\cdot (a+1)(a-1)$', appearAt: 6.3, dur: 0.50 }
          ]
        },
        {
          rowId: 'p35_row_3',
          stepBadge: '第 3 & 4 步 · 约分并展开',
          appearAt: 12.6,
          tokens: [
            { id: 'p35_r3_can', math: '$= (a+2)(a-1)$', appearAt: 12.7, dur: 0.45 },
            { id: 'p35_r3_exp', math: '$= a^{2} + a - 2$', appearAt: 18.8, dur: 0.45 }
          ]
        },
        {
          rowId: 'p35_row_4',
          stepBadge: '最终结论',
          appearAt: 24.8,
          isConclusion: true,
          tokens: [
            { id: 'p35_r4_conc', math: '当 $a^{2}+a=1$ 时，原式 $= 1 - 2 = -1$。', appearAt: 24.9, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p35_sp_1',
          title: '草稿演算 · 分式乘除与乘方核心流程',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p35_sp1_t1', math: '① 遇乘方先乘方：$\\left(\\frac{A}{B}\\right)^{n} = \\frac{A^{n}}{B^{n}}$（系数符号同步乘方）', appearAt: 1.4, dur: 0.40 },
            { id: 'p35_sp1_t2', math: '② 除法转乘倒数：同级运算必须从左到右，整式分母看作 $1$', appearAt: 2.6, dur: 0.40 },
            { id: 'p35_sp1_t3', math: '③ 分解再约分：$a^{2}-4=(a+2)(a-2)$，$(a+1)^{2}$ 约去两个 $(a+1)$', appearAt: 6.8, dur: 0.45 }
          ],
          note: '切勿在约分前把多项式展开，应当先彻底因式分解再约去公因式'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p35_r0_div', tStart: 0.8, tEnd: 5.6, color: 'amber' },
        { tokenId: 'p35_r2_fac', tStart: 6.3, tEnd: 12.0, color: 'teal' },
        { tokenId: 'p35_r3_can', tStart: 12.7, tEnd: 18.4, color: 'amber' },
        { tokenId: 'p35_r3_exp', tStart: 18.8, tEnd: 24.4, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p35_svg_s1',
          type: 'arrow',
          fromToken: 'p35_r0_div',
          toToken: 'p35_r1_mul',
          label: '除以倒数转乘法',
          color: '#D97706',
          curveOffset: 28,
          tStart: 1.4,
          tDrawEnd: 2.2,
          tFadeStart: 5.2,
          tEnd: 5.8
        },
        {
          id: 'p35_svg_s3',
          type: 'arrow',
          fromToken: 'p35_r2_fac',
          toToken: 'p35_r3_can',
          label: '约去 $(a-2)$ 与 $(a+1)^{2}$',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 12.4,
          tDrawEnd: 13.2,
          tFadeStart: 17.8,
          tEnd: 18.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步除法转乘法：把 $\\div \\frac{1}{a^{2}-1}$ 转化为乘以倒数 $(a^{2}-1)$，统一为连乘形式。', focusToken: 'p35_r1_mul' },
        { tStart: 5.8, tEnd: 12.2, text: '第二步因式分解：$a^{2}-4=(a+2)(a-2)$，$a^{2}+2a+1=(a+1)^{2}$，$a^{2}-1=(a+1)(a-1)$。', focusToken: 'p35_r2_fac' },
        { tStart: 12.2, tEnd: 18.5, text: '第三步约去公因式：分子分母约去 $(a-2)$ 和两个 $(a+1)$，化简为 $(a+2)(a-1)$。', focusToken: 'p35_r3_can' },
        { tStart: 18.5, tEnd: 24.5, text: '第四步展开构造整体：$(a+2)(a-1) = a^{2} + a - 2$。', focusToken: 'p35_r3_exp' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步整体代入：把已知 $a^{2} + a = 1$ 代入，得出 $1 - 2 = -1$！', focusToken: 'p35_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：辨析分式乘方与乘除同级运算顺序',
          givenLabel: '计算下列两式：',
          givenFormula: '① $\\left(-\\frac{2c}{3a^{2}b}\\right)^{2}$；② $\\frac{x-y}{x+y} \\div (y-x) \\cdot \\frac{1}{x-y}$',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '关于这两个算式的正确化简结果是？',
          options: [
            { key: 'A', text: 'A. ① $\\frac{4c^{2}}{9a^{4}b^{2}}$；② $-\\frac{1}{x^{2}-y^{2}}$（即 $\\frac{1}{y^{2}-x^{2}}$）', isCorrect: true },
            { key: 'B', text: 'B. ① $-\\frac{4c^{2}}{9a^{4}b^{2}}$；② $\\frac{1}{x+y}$', isCorrect: false },
            { key: 'C', text: 'C. ① $\\frac{2c^{2}}{3a^{4}b^{2}}$；② $-\\frac{1}{x^{2}-y^{2}}$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！乘方时系数与负号同步平方，乘除混合须从左到右转乘法：',
            calcLines: [
              '① $(-2)^{2}=4$，$3^{2}=9$，故得 $\\frac{4c^{2}}{9a^{4}b^{2}}$',
              '② $\\frac{x-y}{x+y} \\cdot \\frac{1}{-(x-y)} \\cdot \\frac{1}{x-y} = -\\frac{1}{(x+y)(x-y)} = \\frac{1}{y^{2}-x^{2}}$'
            ],
            summary: '切勿把 ② 中后两项 $(y-x) \\cdot \\frac{1}{x-y}$ 先相乘。'
          },
          wrongTitle: '提示：请检查负号平方符号及乘除从左到右顺序',
          wrongFeedback: '① 负数的平方为正且系数 $2, 3$ 均须平方；② 应依次转为连乘 $\\frac{x-y}{x+y} \\cdot \\frac{1}{y-x} \\cdot \\frac{1}{x-y}$，请再试一次。'
        },
        practice2: {
          title: '练习二：分式乘方化简并整体求值',
          givenLabel: '已知等式：',
          givenFormula: '$\\left(\\frac{a^{2}}{b}\\right)^{2} \\div \\left(\\frac{a}{b^{2}}\\right)^{2} = 3$',
          questionText: '先将左边乘方并除法转乘法化简为 $a^{p}b^{q} = 3$，由此可得 $a^{2}b^{2}$ 与 $a^{4}b^{4}$ 的值分别是多少？',
          input1Prefix: '$a^{2}b^{2} =$',
          input1Placeholder: '如 3',
          input2Prefix: '，$a^{4}b^{4} =$',
          input2Placeholder: '如 9',
          input2Suffix: '',
          expectedX: '3',
          expectedMin: '9',
          allowOrderSwap: false,
          correctFeedback: '$a^{2}b^{2} = 3$，$a^{4}b^{4} = 9$。',
          correctDetail: '左边 $= \\frac{a^{4}}{b^{2}} \\cdot \\frac{b^{4}}{a^{2}} = a^{2}b^{2} = 3$；两边平方得 $a^{4}b^{4} = (a^{2}b^{2})^{2} = 3^{2} = 9$。',
          wrongFeedback: '先算 $\\frac{a^{4}}{b^{2}} \\div \\frac{a^{2}}{b^{4}} = \\frac{a^{4}}{b^{2}} \\cdot \\frac{b^{4}}{a^{2}} = a^{2}b^{2} = 3$，再将 $a^{2}b^{2}$ 平方。',
          specificWrongHints: [
            {
              checkType: 'secondVal',
              val: '6',
              hint: '注意 $a^{4}b^{4} = (a^{2}b^{2})^{2} = 3^{2} = 9$，不是 $3 \\times 2 = 6$。'
            }
          ]
        }
      }
    },
    // =========================================================================
    // P36：运用分式加减与混合运算法则化简求值
    // =========================================================================
    P36: {
      procedureId: 'P36',
      title: '运用分式加减与混合运算法则化简求值',
      exampleTitle: '先化简，再求值：$\\left(\\frac{x+3}{x^{2}-x} - \\frac{x}{x^{2}-2x+1}\\right) \\div \\frac{2x-3}{x}$，其中 $x$ 满足 $x^{2} - 2x - 3 = 0$',
      exampleFormula: '分解分母定公分母 $\\to$ 括号内通分合并 $\\to$ 除法转乘约分 $\\to$ 检验定义域代入',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示异分母通分、保留分母与原式定义域检验三大铁律）',
      practiceSectionTitle: '分式加减与混合运算化简跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握异分母通分减法加括号与混合化简验根求值',

      steps: [
        {
          step: 1,
          name: '分解括号内两分母，确定最简公分母',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '将括号内两分母因式分解：$x^{2}-x = x(x-1)$，$x^{2}-2x+1 = (x-1)^{2}$；取各因式最高次幂之积，得最简公分母 $x(x-1)^{2}$。'
        },
        {
          step: 2,
          name: '括号内通分，分子相减并合并同类项',
          tStart: 5.8,
          tEnd: 12.5,
          explanation: '第一项分子分母同乘 $(x-1)$，第二项同乘 $x$，保留公分母并合并分子：$(x+3)(x-1) - x^{2} = (x^{2}+2x-3) - x^{2} = 2x - 3$。'
        },
        {
          step: 3,
          name: '括号外除法转为乘以倒数并约分',
          tStart: 12.5,
          tEnd: 18.8,
          explanation: '将 $\\div \\frac{2x-3}{x}$ 转化为 $\\cdot \\frac{x}{2x-3}$，约去分子分母中的公因式 $x$ 与 $(2x-3)$，得最简分式 $\\frac{1}{(x-1)^{2}} = \\frac{1}{x^{2}-2x+1}$。'
        },
        {
          step: 4,
          name: '核对原式有意义条件并由方程提炼整体',
          tStart: 18.8,
          tEnd: 24.5,
          explanation: '原式要求 $x \\neq 0, 1, \\frac{3}{2}$。由 $x^{2}-2x-3=0$ 得 $(x-3)(x+1)=0$（$x=3$ 或 $-1$ 均使原式有意义），且直接提炼整体 $x^{2} - 2x = 3$。'
        },
        {
          step: 5,
          name: '整体代入 $x^{2} - 2x = 3$ 算出最终结果',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '将 $x^{2} - 2x = 3$ 代入 $\\frac{1}{x^{2}-2x+1}$，算得 $\\frac{1}{3+1} = \\frac{1}{4}$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 分解分母得最简公分母 $x(x-1)^{2}$' },
        { time: 7.5, step: 2, label: '2.1 通分合并分子得 $\\frac{2x-3}{x(x-1)^{2}}$' },
        { time: 14.0, step: 3, label: '3.1 乘倒数 $\\frac{x}{2x-3}$ 约分得 $\\frac{1}{(x-1)^{2}}$' },
        { time: 20.5, step: 4, label: '4.1 校验 $x=3,-1$ 有意义并提炼 $x^{2}-2x=3$' },
        { time: 26.0, step: 5, label: '5.1 整体代入得 $\\frac{1}{3+1} = \\frac{1}{4}$' }
      ],

      boardRows: [
        {
          rowId: 'p36_row_0',
          stepBadge: '原式',
          appearAt: 0.0,
          tokens: [
            { id: 'p36_r0_1', math: '$\\left(\\frac{x+3}{x^{2}-x} - \\frac{x}{x^{2}-2x+1}\\right)$', appearAt: 0.0, dur: 0.01 },
            { id: 'p36_r0_div', math: '$\\div \\frac{2x-3}{x}$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p36_row_1',
          stepBadge: '第 1 步 · 分解分母定公分母',
          appearAt: 1.5,
          tokens: [
            { id: 'p36_r1_fac', math: '$= \\left[\\frac{x+3}{x(x-1)} - \\frac{x}{(x-1)^{2}}\\right] \\cdot \\frac{x}{2x-3}$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p36_row_2',
          stepBadge: '第 2 步 · 括号内通分合并',
          appearAt: 6.2,
          tokens: [
            { id: 'p36_r2_com', math: '$= \\frac{(x+3)(x-1) - x^{2}}{x(x-1)^{2}} \\cdot \\frac{x}{2x-3}$', appearAt: 6.3, dur: 0.45 },
            { id: 'p36_r2_sim', math: '$= \\frac{2x-3}{x(x-1)^{2}} \\cdot \\frac{x}{2x-3}$', appearAt: 9.2, dur: 0.45 }
          ]
        },
        {
          rowId: 'p36_row_3',
          stepBadge: '第 3 步 · 约分化简',
          appearAt: 13.0,
          tokens: [
            { id: 'p36_r3_res', math: '$= \\frac{1}{(x-1)^{2}} = \\frac{1}{x^{2}-2x+1}$', appearAt: 13.1, dur: 0.50 }
          ]
        },
        {
          rowId: 'p36_row_4',
          stepBadge: '最终结论',
          appearAt: 24.8,
          isConclusion: true,
          tokens: [
            { id: 'p36_r4_conc', math: '由 $x^{2}-2x=3$（$x=3$ 或 $-1$ 均有效），原式 $= \\frac{1}{3+1} = \\frac{1}{4}$。', appearAt: 24.9, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p36_sp_1',
          title: '草稿警示 · 分式加减混合运算三大铁律',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p36_sp1_t1', math: '① 化简留分母：通分后绝不能像解方程那样去掉公分母', appearAt: 1.4, dur: 0.40 },
            { id: 'p36_sp1_t2', math: '② 减式加括号：$(x^{2}+2x-3) - x^{2} = 2x - 3$，注意分子符号', appearAt: 6.8, dur: 0.40 },
            { id: 'p36_sp1_t3', math: '③ 代值查原式：须排除 $x=0$、$x=1$ 及除式分子 $2x-3=0$（$x=\\frac{3}{2}$）', appearAt: 19.2, dur: 0.45 }
          ],
          note: '若自选数值求值，必须同时检验原分式的所有分母及除式的分子均不为 0'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p36_r1_fac', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p36_r2_com', tStart: 6.3, tEnd: 9.0, color: 'amber' },
        { tokenId: 'p36_r2_sim', tStart: 9.2, tEnd: 12.8, color: 'teal' },
        { tokenId: 'p36_r3_res', tStart: 13.1, tEnd: 18.6, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p36_svg_s2',
          type: 'arrow',
          fromToken: 'p36_r1_fac',
          toToken: 'p36_r2_com',
          label: '最简公分母 $x(x-1)^{2}$',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 6.0,
          tDrawEnd: 6.8,
          tFadeStart: 11.4,
          tEnd: 12.0
        },
        {
          id: 'p36_svg_s3',
          type: 'arrow',
          fromToken: 'p36_r2_sim',
          toToken: 'p36_r3_res',
          label: '约去 $x$ 与 $(2x-3)$',
          color: '#D97706',
          curveOffset: -26,
          tStart: 12.8,
          tDrawEnd: 13.6,
          tFadeStart: 18.0,
          tEnd: 18.6
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步分解括号内两分母：$x^{2}-x=x(x-1)$，$x^{2}-2x+1=(x-1)^{2}$，最简公分母为 $x(x-1)^{2}$。', focusToken: 'p36_r1_fac' },
        { tStart: 5.8, tEnd: 12.5, text: '第二步括号内通分合并分子：$(x+3)(x-1) - x^{2} = x^{2}+2x-3-x^{2} = 2x - 3$，得到 $\\frac{2x-3}{x(x-1)^{2}}$。', focusToken: 'p36_r2_sim' },
        { tStart: 12.5, tEnd: 18.8, text: '第三步除法转乘倒数 $\\frac{x}{2x-3}$，约去公因式 $x$ 与 $(2x-3)$，化简为 $\\frac{1}{(x-1)^{2}}$。', focusToken: 'p36_r3_res' },
        { tStart: 18.8, tEnd: 24.5, text: '第四步检验原式有意义条件：$x$ 不能取 $0, 1, \\frac{3}{2}$；由 $x^{2}-2x-3=0$ 得 $x=3$ 或 $-1$ 均合法，且 $x^{2}-2x=3$。', focusToken: 'p36_r3_res' },
        { tStart: 24.5, tEnd: 30.0, text: '第五步整体代入：把 $x^{2}-2x=3$ 代入 $\\frac{1}{x^{2}-2x+1}$，得出最终结果 $\\frac{1}{4}$！', focusToken: 'p36_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：同分母/相反数分母分式减法（注意加括号与变号）',
          givenLabel: '计算分式减法：',
          givenFormula: '$\\frac{3}{a^{2}-9} - \\frac{a}{9-a^{2}}$',
          extractedLabel: '利用 $9 - a^{2} = -(a^{2} - 9)$ 统一分母：',
          extractedFormula: '$\\frac{3}{a^{2}-9} + \\frac{a}{a^{2}-9} = \\frac{a+3}{(a+3)(a-3)}$',
          questionText: '约分化简后的最简结果是？',
          options: [
            { key: 'A', text: 'A. $\\frac{1}{a - 3}$', isCorrect: true },
            { key: 'B', text: 'B. $\\frac{1}{a + 3}$', isCorrect: false },
            { key: 'C', text: 'C. $\\frac{3 - a}{a^{2} - 9} = -\\frac{1}{a + 3}$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！互为相反数分母先变号转为同分母，合并后再约分：',
            calcLines: [
              '$\\frac{3}{a^{2}-9} - \\frac{a}{-(a^{2}-9)} = \\frac{3 + a}{(a+3)(a-3)} = \\frac{1}{a-3}$'
            ],
            summary: '减号遇分母提取负号变为加号，切勿漏变中间的运算符号。'
          },
          wrongTitle: '提示：请注意把 9 - a² 改写为 -(a² - 9) 后中间减号变为加号',
          wrongFeedback: '$- \\frac{a}{9-a^{2}} = + \\frac{a}{a^{2}-9}$，合并得 $\\frac{a+3}{(a+3)(a-3)} = \\frac{1}{a-3}$，请再试一次。'
        },
        practice2: {
          title: '练习二：分式混合化简并按有意义条件选值代入',
          givenLabel: '已知原式与化简结果：',
          givenFormula: '原式 $\\left(1 - \\frac{1}{a+1}\\right) \\div \\frac{a^{3}}{a^{2}+2a+1}$ 化简得 $\\frac{a+1}{a^{2}}$',
          questionText: '若从 $\\{-1, 0, 1\\}$ 中选一个使原式有意义的整数 $a$ 代入求值，唯一可以取的 $a$ 是多少？代入后的值是多少？',
          input1Prefix: '唯一可取的 $a =$',
          input1Placeholder: '如 1',
          input2Prefix: '，代入后的值 $=$',
          input2Placeholder: '如 2',
          input2Suffix: '',
          expectedX: '1',
          expectedMin: '2',
          allowOrderSwap: false,
          correctFeedback: '唯一可取的 $a = 1$，代入得 $\\frac{1+1}{1^{2}} = 2$。',
          correctDetail: '原式要求 $a+1 \\neq 0$（$a \\neq -1$）且除式分子 $a^{3} \\neq 0$（$a \\neq 0$），故只能取 $a = 1$，代入 $\\frac{a+1}{a^{2}}$ 得 $2$。',
          wrongFeedback: '先排除使原分母 $a+1=0$ 的 $-1$ 与使除式 $a^{3}=0$ 的 $0$，再将唯一合法值 $a=1$ 代入 $\\frac{a+1}{a^{2}}$。',
          specificWrongHints: [
            {
              checkType: 'firstVal',
              val: '-1',
              hint: '当 $a = -1$ 时，原分母 $a+1=0$ 且 $a^{2}+2a+1=0$，分式无意义，不能取 $-1$。'
            },
            {
              checkType: 'firstVal',
              val: '0',
              hint: '当 $a = 0$ 时，除式分子 $a^{3}=0$（除数为 $0$），原式无意义，不能取 $0$。'
            }
          ]
        }
      }
    }
    ,
    // =========================================================================
    // P37：运用等腰三角形“等边对等角”与“等角对等边”进行边角转化及判定
    // =========================================================================
    P37: {
      procedureId: 'P37',
      title: '运用等腰三角形“等边对等角”与“等角对等边”进行边角转化及判定',
      exampleTitle: '在 $\\triangle ABC$ 中，$AB = AC$，$\\angle A = 36^{\\circ}$，$BD$ 平分 $\\angle ABC$ 交 $AC$ 于点 $D$，求图中等腰三角形的个数',
      exampleFormula: '$AB = AC \\iff \\angle B = \\angle C$（等边对等角 $\\leftrightarrow$ 等角对等边）',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（配合上方动态几何图形，同步展示等边对等角求角与等角对等边判定等腰）',
      practiceSectionTitle: '等腰三角形性质与判定跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握“等边对等角”求角与“角平分线 + 平行线”导等腰',

      geometryDiagram: {
        title: '动态几何图形 · 36° 黄金等腰三角形',
        caption: '随推演进度高亮两腰 AB=AC、底角 72°、角平分线 BD（36°/36°）及两个子等腰三角形',
        svgHtml: `
          <svg viewBox="0 0 260 185" class="w-full max-w-[260px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <!-- Step 4 子等腰三角形 △ABD 与 △BCD 底色 -->
            <polygon class="proc-geo-anim" data-appear-at="13.5" data-dur="0.6" points="130,22 72,158 166,106" fill="rgba(15, 118, 110, 0.10)" style="opacity:0;" />
            <polygon class="proc-geo-anim" data-appear-at="19.5" data-dur="0.6" points="72,158 188,158 166,106" fill="rgba(217, 119, 6, 0.12)" style="opacity:0;" />

            <!-- 基础 △ABC -->
            <line x1="130" y1="22" x2="72" y2="158" stroke="#334155" stroke-width="2.2" />
            <line x1="130" y1="22" x2="188" y2="158" stroke="#334155" stroke-width="2.2" />
            <line x1="72" y1="158" x2="188" y2="158" stroke="#334155" stroke-width="2.2" />

            <!-- Step 1：高亮 AB = AC 及顶角 36° -->
            <g class="proc-geo-anim" data-appear-at="1.2" data-dur="0.5" style="opacity:0;">
              <line x1="130" y1="22" x2="72" y2="158" stroke="#0F766E" stroke-width="3" />
              <line x1="130" y1="22" x2="188" y2="158" stroke="#0F766E" stroke-width="3" />
              <text x="121" y="54" fill="#0F766E" font-size="11" font-weight="700">36°</text>
              <text x="164" y="150" fill="#0F766E" font-size="10" font-weight="700">72°</text>
            </g>

            <!-- Step 2：绘制角平分线 BD 及 36°/36° -->
            <line class="proc-geo-anim" data-appear-at="6.5" data-dur="0.6" data-dash-len="120" x1="72" y1="158" x2="166" y2="106" stroke="#D97706" stroke-width="2.4" stroke-dasharray="120" stroke-dashoffset="120" style="opacity:0;" />
            <g class="proc-geo-anim" data-appear-at="7.4" data-dur="0.5" style="opacity:0;">
              <circle cx="166" cy="106" r="3.5" fill="#D97706" />
              <text x="174" y="106" fill="#B45309" font-size="12" font-weight="700">D</text>
              <text x="84" y="135" fill="#B45309" font-size="10" font-weight="700">36°</text>
              <text x="103" y="152" fill="#B45309" font-size="10" font-weight="700">36°</text>
            </g>

            <!-- Step 3：外角 ∠BDC = 72° -->
            <g class="proc-geo-anim" data-appear-at="18.8" data-dur="0.5" style="opacity:0;">
              <text x="142" y="134" fill="#BE123C" font-size="10" font-weight="700">72°</text>
            </g>

            <!-- 顶点 A, B, C -->
            <circle cx="130" cy="22" r="3" fill="#0F172A" />
            <circle cx="72" cy="158" r="3" fill="#0F172A" />
            <circle cx="188" cy="158" r="3" fill="#0F172A" />
            <text x="125" y="14" fill="#0F172A" font-size="13" font-weight="700">A</text>
            <text x="56" y="164" fill="#0F172A" font-size="13" font-weight="700">B</text>
            <text x="194" y="164" fill="#0F172A" font-size="13" font-weight="700">C</text>
          </svg>
        `
      },

      steps: [
        {
          step: 1,
          name: '由 $AB = AC$ 用“等边对等角”求两底角',
          tStart: 0.0,
          tEnd: 6.0,
          explanation: '在 $\\triangle ABC$ 中，由 $AB = AC$ 得 $\\triangle ABC$ 是第 $1$ 个等腰三角形；由等边对等角与内角和得 $\\angle ABC = \\angle C = \\frac{180^{\\circ} - 36^{\\circ}}{2} = 72^{\\circ}$。'
        },
        {
          step: 2,
          name: '由角平分线 $BD$ 算出两个 $36^{\\circ}$ 分角',
          tStart: 6.0,
          tEnd: 12.0,
          explanation: '因为 $BD$ 平分 $\\angle ABC$，所以 $\\angle ABD = \\angle DBC = \\frac{1}{2} \\times 72^{\\circ} = 36^{\\circ}$。'
        },
        {
          step: 3,
          name: '在 $\\triangle ABD$ 中用“等角对等边”判第 $2$ 个等腰',
          tStart: 12.0,
          tEnd: 18.0,
          explanation: '在 $\\triangle ABD$ 中，发现 $\\angle A = \\angle ABD = 36^{\\circ}$，根据“等角对等边”得 $DA = DB$，故 $\\triangle ABD$ 是第 $2$ 个等腰三角形。'
        },
        {
          step: 4,
          name: '由外角定理与“等角对等边”判第 $3$ 个等腰',
          tStart: 18.0,
          tEnd: 24.5,
          explanation: '在 $\\triangle BCD$ 中，由外角定理得 $\\angle BDC = \\angle A + \\angle ABD = 36^{\\circ} + 36^{\\circ} = 72^{\\circ}$；因 $\\angle BDC = \\angle C = 72^{\\circ}$，由“等角对等边”得 $BD = BC$，故 $\\triangle BCD$ 是第 $3$ 个等腰三角形。'
        },
        {
          step: 5,
          name: '汇总全部等腰三角形（切勿遗漏原大三角形）',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '综上，图中共有 $\\triangle ABC$、$\\triangle ABD$、$\\triangle BCD$ 共 $3$ 个等腰三角形。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 由 $AB = AC$ 算两底角 $\\angle ABC = \\angle C = 72^{\\circ}$' },
        { time: 7.2, step: 2, label: '2.1 角平分线得 $\\angle ABD = \\angle DBC = 36^{\\circ}$' },
        { time: 13.5, step: 3, label: '3.1 $\\angle A = \\angle ABD = 36^{\\circ} \\implies \\triangle ABD$ 等腰' },
        { time: 19.5, step: 4, label: '4.1 $\\angle BDC = \\angle C = 72^{\\circ} \\implies \\triangle BCD$ 等腰' },
        { time: 26.0, step: 5, label: '5.1 汇总共 $3$ 个等腰三角形' }
      ],

      boardRows: [
        {
          rowId: 'p37_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p37_r0_cond', math: '在 $\\triangle ABC$ 中，$AB = AC$，$\\angle A = 36^{\\circ}$，$BD$ 平分 $\\angle ABC$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p37_row_1',
          stepBadge: '第 1 步 · 等边对等角',
          appearAt: 1.5,
          tokens: [
            { id: 'p37_r1_ang', math: '$\\because AB = AC \\implies \\angle ABC = \\angle C = \\frac{180^{\\circ} - 36^{\\circ}}{2} = 72^{\\circ}$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p37_row_2',
          stepBadge: '第 2 & 3 步 · 判 △ABD 等腰',
          appearAt: 6.4,
          tokens: [
            { id: 'p37_r2_bis', math: '$\\because BD$ 平分 $\\angle ABC \\implies \\angle ABD = \\angle DBC = 36^{\\circ}$；', appearAt: 6.5, dur: 0.45 },
            { id: 'p37_r2_iso', math: '$\\angle A = \\angle ABD \\implies DA = DB$（$\\triangle ABD$ 等腰）', appearAt: 12.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p37_row_3',
          stepBadge: '第 4 步 · 外角与判 △BCD 等腰',
          appearAt: 18.4,
          tokens: [
            { id: 'p37_r3_ext', math: '$\\angle BDC = \\angle A + \\angle ABD = 72^{\\circ} = \\angle C$', appearAt: 18.5, dur: 0.45 },
            { id: 'p37_r3_iso', math: '$\\implies BD = BC$（$\\triangle BCD$ 等腰）', appearAt: 20.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p37_row_4',
          stepBadge: '最终结论',
          appearAt: 25.0,
          isConclusion: true,
          tokens: [
            { id: 'p37_r4_conc', math: '$\\therefore$ 共有 $\\triangle ABC$、$\\triangle ABD$、$\\triangle BCD$ 共 $3$ 个等腰三角形。', appearAt: 25.1, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p37_sp_1',
          title: '核心模型 · “角平分线 + 平行线 ⇒ 等腰三角形”',
          showStart: 6.0,
          showEnd: 29.8,
          tokens: [
            { id: 'p37_sp1_t1', math: '① 等边对等角：同三角形内 $AB = AC \\implies \\angle B = \\angle C$', appearAt: 6.4, dur: 0.40 },
            { id: 'p37_sp1_t2', math: '② 等角对等边：同三角形内 $\\angle B = \\angle C \\implies AB = AC$', appearAt: 12.6, dur: 0.40 },
            { id: 'p37_sp1_t3', math: '③ 黄金组合：角平分线 $+$ 平行线 $\\implies$ 内错角相等 $\\implies$ 等腰', appearAt: 18.8, dur: 0.45 }
          ],
          note: '统计等腰三角形个数时，千万不要漏掉原本的大等腰三角形 $\\triangle ABC$'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p37_r1_ang', tStart: 1.6, tEnd: 5.8, color: 'teal' },
        { tokenId: 'p37_r2_bis', tStart: 6.5, tEnd: 11.8, color: 'amber' },
        { tokenId: 'p37_r2_iso', tStart: 12.6, tEnd: 17.8, color: 'teal' },
        { tokenId: 'p37_r3_iso', tStart: 20.5, tEnd: 24.4, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p37_svg_s3',
          type: 'arrow',
          fromToken: 'p37_r2_bis',
          toToken: 'p37_r2_iso',
          label: '等角对等边',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 12.2,
          tDrawEnd: 13.0,
          tFadeStart: 17.2,
          tEnd: 17.8
        },
        {
          id: 'p37_svg_s4',
          type: 'arrow',
          fromToken: 'p37_r3_ext',
          toToken: 'p37_r3_iso',
          label: '等角对等边',
          color: '#D97706',
          curveOffset: -26,
          tStart: 19.6,
          tDrawEnd: 20.4,
          tFadeStart: 23.8,
          tEnd: 24.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 6.0, text: '第一步用等边对等角：在 $\\triangle ABC$ 中，$AB = AC$ 且顶角 $\\angle A = 36^{\\circ}$，故两底角 $\\angle ABC = \\angle C = 72^{\\circ}$。', focusToken: 'p37_r1_ang' },
        { tStart: 6.0, tEnd: 12.0, text: '第二步画角平分线 $BD$：将 $72^{\\circ}$ 平分为两个 $36^{\\circ}$ 的角，即 $\\angle ABD = \\angle DBC = 36^{\\circ}$。', focusToken: 'p37_r2_bis' },
        { tStart: 12.0, tEnd: 18.0, text: '第三步看 $\\triangle ABD$：$\\angle A = \\angle ABD = 36^{\\circ}$，由等角对等边得 $DA = DB$，这是第 $2$ 个等腰三角形。', focusToken: 'p37_r2_iso' },
        { tStart: 18.0, tEnd: 24.5, text: '第四步看 $\\triangle BCD$：外角 $\\angle BDC = 36^{\\circ} + 36^{\\circ} = 72^{\\circ} = \\angle C$，由等角对等边得 $BD = BC$，这是第 $3$ 个等腰三角形。', focusToken: 'p37_r3_iso' },
        { tStart: 24.5, tEnd: 30.0, text: '综上，连同原本的大 $\\triangle ABC$，图中共有 $3$ 个等腰三角形！', focusToken: 'p37_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：“角平分线 + 平行线 ⇒ 等腰三角形”线段转化',
          givenLabel: '已知条件：',
          givenFormula: '在 $\\triangle ABC$ 中，$\\angle ABC$ 与 $\\angle ACB$ 的平分线交于点 $O$，过 $O$ 作 $EF \\parallel BC$ 交 $AB, AC$ 于 $E, F$',
          extractedLabel: '由“角平分线 + 平行线”导出：',
          extractedFormula: '$\\angle EBO = \\angle EOB \\implies EO = BE$；$\\angle FCO = \\angle FOC \\implies FO = CF$',
          questionText: '若 $BE = 5$，$CF = 3$，则线段 $EF$ 的长等于多少？',
          options: [
            { key: 'A', text: 'A. $EF = EO + FO = BE + CF = 8$', isCorrect: true },
            { key: 'B', text: 'B. $EF = BE - CF = 2$', isCorrect: false },
            { key: 'C', text: 'C. $EF = 4$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！两次运用“等角对等边”将折线转化为直线段之和：',
            calcLines: [
              '$EO = BE = 5，\\quad FO = CF = 3$',
              '$EF = EO + FO = 5 + 3 = 8$'
            ],
            summary: '记住“角平分线 + 平行线”必出等腰三角形，即可快速完成线段等量代换。'
          },
          wrongTitle: '提示：请用等角对等边把 EO 和 FO 分别代换为 BE 和 CF',
          wrongFeedback: '点 $O$ 在线段 $EF$ 上，因此 $EF = EO + FO = BE + CF = 5 + 3 = 8$，请再试一次。'
        },
        practice2: {
          title: '练习二：利用“等边对等角”求等腰三角形内角',
          givenLabel: '已知条件：',
          givenFormula: '在等腰 $\\triangle ABC$ 中，$AB = AC$',
          questionText: '若顶角 $\\angle A = 50^{\\circ}$，则底角 $\\angle B$ 是多少度？若另一等腰三角形底角为 $40^{\\circ}$，则其顶角是多少度？',
          input1Prefix: '底角 $\\angle B =$',
          input1Placeholder: '如 65',
          input2Prefix: '°，另一顶角 $=$',
          input2Placeholder: '如 100',
          input2Suffix: '°（只填数字）',
          expectedX: '65',
          expectedMin: '100',
          allowOrderSwap: false,
          correctFeedback: '底角 $\\angle B = 65^{\\circ}$，另一等腰三角形顶角为 $100^{\\circ}$。',
          correctDetail: '① $\\angle B = \\frac{180^{\\circ} - 50^{\\circ}}{2} = 65^{\\circ}$；② 顶角 $= 180^{\\circ} - 2 \\times 40^{\\circ} = 100^{\\circ}$。',
          wrongFeedback: '按“底角 $= (180^{\\circ} - \\text{顶角}) \\div 2$”与“顶角 $= 180^{\\circ} - 2 \\times \\text{底角}$”计算。',
          specificWrongHints: []
        }
      }
    },
    // =========================================================================
    // P38：运用等边三角形性质判定及含 30° 角直角三角形性质求解
    // =========================================================================
    P38: {
      procedureId: 'P38',
      title: '运用等边三角形性质判定及含 $30^{\\circ}$ 角直角三角形性质求解',
      exampleTitle: '如图，等边 $\\triangle ABC$ 中，点 $D$ 是 $AC$ 的中点，$DE \\perp BC$ 于点 $E$，若 $CE = 3$，求 $AB$ 的长',
      exampleFormula: '等边 $\\triangle \\implies \\angle C = 60^{\\circ}$；$\\text{Rt}\\triangle CDE$ 中 $\\angle CDE = 30^{\\circ} \\implies CD = 2CE$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（配合上方动态几何图，同步展示等边三角形 60° 与 30° 直角三角形倍半联动）',
      practiceSectionTitle: '等边三角形与含 30° 角直角三角形跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握等边三角形判定条件与 30° 对边为斜边一半的应用',

      geometryDiagram: {
        title: '动态几何图形 · 等边 △ABC 与 Rt△CDE',
        caption: '随推演进度标注 ∠C=60°、垂线 DE⊥BC、∠CDE=30° 及 CD=2CE=6、AC=AB=12',
        svgHtml: `
          <svg viewBox="0 0 260 185" class="w-full max-w-[260px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <!-- Step 2 Rt△CDE 高亮底色 -->
            <polygon class="proc-geo-anim" data-appear-at="6.4" data-dur="0.6" points="175,90 175,158 214,158" fill="rgba(217, 119, 6, 0.14)" style="opacity:0;" />

            <!-- 等边 △ABC -->
            <line x1="130" y1="22" x2="46" y2="158" stroke="#334155" stroke-width="2.2" />
            <line x1="130" y1="22" x2="214" y2="158" stroke="#334155" stroke-width="2.2" />
            <line x1="46" y1="158" x2="214" y2="158" stroke="#334155" stroke-width="2.2" />

            <!-- Step 1：标注等边三边相等与 ∠C = 60° -->
            <g class="proc-geo-anim" data-appear-at="1.2" data-dur="0.5" style="opacity:0;">
              <line x1="130" y1="22" x2="46" y2="158" stroke="#0F766E" stroke-width="3" />
              <line x1="130" y1="22" x2="214" y2="158" stroke="#0F766E" stroke-width="3" />
              <text x="188" y="151" fill="#0F766E" font-size="10" font-weight="700">60°</text>
            </g>

            <!-- Step 2：中点 D 与垂线 DE ⊥ BC 及 30° 角 -->
            <line class="proc-geo-anim" data-appear-at="6.2" data-dur="0.6" data-dash-len="70" x1="175" y1="90" x2="175" y2="158" stroke="#D97706" stroke-width="2.4" stroke-dasharray="70" stroke-dashoffset="70" style="opacity:0;" />
            <g class="proc-geo-anim" data-appear-at="7.0" data-dur="0.5" style="opacity:0;">
              <circle cx="175" cy="90" r="3.5" fill="#D97706" />
              <text x="182" y="88" fill="#B45309" font-size="12" font-weight="700">D</text>
              <text x="170" y="174" fill="#B45309" font-size="12" font-weight="700">E</text>
              <polyline points="175,148 185,148 185,158" fill="none" stroke="#BE123C" stroke-width="1.8" />
              <text x="178" y="114" fill="#BE123C" font-size="10" font-weight="700">30°</text>
              <text x="190" y="172" fill="#B45309" font-size="11" font-weight="700">3</text>
            </g>

            <!-- Step 3 & 4：CD=6 与 AB=12 标注 -->
            <g class="proc-geo-anim" data-appear-at="13.5" data-dur="0.5" style="opacity:0;">
              <text x="200" y="122" fill="#BE123C" font-size="11" font-weight="700">CD=6</text>
            </g>
            <g class="proc-geo-anim" data-appear-at="20.0" data-dur="0.5" style="opacity:0;">
              <rect x="38" y="76" width="46" height="18" rx="4" fill="#F0FDFA" stroke="#0F766E" stroke-width="1.2" />
              <text x="61" y="89" text-anchor="middle" fill="#0F766E" font-size="11" font-weight="700">AB=12</text>
            </g>

            <!-- 顶点 A, B, C -->
            <circle cx="130" cy="22" r="3" fill="#0F172A" />
            <circle cx="46" cy="158" r="3" fill="#0F172A" />
            <circle cx="214" cy="158" r="3" fill="#0F172A" />
            <text x="125" y="14" fill="#0F172A" font-size="13" font-weight="700">A</text>
            <text x="30" y="164" fill="#0F172A" font-size="13" font-weight="700">B</text>
            <text x="220" y="164" fill="#0F172A" font-size="13" font-weight="700">C</text>
          </svg>
        `
      },

      steps: [
        {
          step: 1,
          name: '由等边三角形性质标出 $AB = AC$ 与 $\\angle C = 60^{\\circ}$',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '因为 $\\triangle ABC$ 是等边三角形，所以三边相等 $AB = AC = BC$，且每个内角均为 $60^{\\circ}$，即 $\\angle C = 60^{\\circ}$。'
        },
        {
          step: 2,
          name: '在 $\\text{Rt}\\triangle CDE$ 中由两锐角互余求 $\\angle CDE = 30^{\\circ}$',
          tStart: 5.8,
          tEnd: 12.2,
          explanation: '因为 $DE \\perp BC$，所以 $\\angle DEC = 90^{\\circ}$；在 $\\text{Rt}\\triangle CDE$ 中，$\\angle CDE = 90^{\\circ} - \\angle C = 90^{\\circ} - 60^{\\circ} = 30^{\\circ}$。'
        },
        {
          step: 3,
          name: '用“$30^{\\circ}$ 对边等于斜边一半”求出 $CD = 6$',
          tStart: 12.2,
          tEnd: 18.8,
          explanation: '在 $\\text{Rt}\\triangle CDE$ 中，$\\angle CDE = 30^{\\circ}$ 所对的直角边是 $CE = 3$，斜边是 $CD$，故 $CD = 2CE = 2 \\times 3 = 6$。'
        },
        {
          step: 4,
          name: '由中点 $D$ 求出边长 $AC = 2CD = 12$',
          tStart: 18.8,
          tEnd: 24.5,
          explanation: '因为点 $D$ 是 $AC$ 的中点，所以 $AC = 2CD = 2 \\times 6 = 12$。'
        },
        {
          step: 5,
          name: '由等边三角形三边相等得出 $AB = 12$',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '因为等边三角形三边相等 $AB = AC$，所以 $AB = 12$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 等边 $\\triangle ABC \\implies AB = AC$，$\\angle C = 60^{\\circ}$' },
        { time: 7.2, step: 2, label: '2.1 在 $\\text{Rt}\\triangle CDE$ 中算得 $\\angle CDE = 30^{\\circ}$' },
        { time: 13.8, step: 3, label: '3.1 $30^{\\circ}$ 对边 $CE = 3 \\implies$ 斜边 $CD = 6$' },
        { time: 20.0, step: 4, label: '4.1 $D$ 为 $AC$ 中点 $\\implies AC = 2CD = 12$' },
        { time: 26.0, step: 5, label: '5.1 等边三边相等得 $AB = 12$' }
      ],

      boardRows: [
        {
          rowId: 'p38_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p38_r0_cond', math: '等边 $\\triangle ABC$ 中，$D$ 为 $AC$ 中点，$DE \\perp BC$，$CE = 3$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p38_row_1',
          stepBadge: '第 1 步 · 等边三角形性质',
          appearAt: 1.5,
          tokens: [
            { id: 'p38_r1_prop', math: '$\\because \\triangle ABC$ 是等边三角形 $\\implies AB = AC$，$\\angle C = 60^{\\circ}$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p38_row_2',
          stepBadge: '第 2 步 · 导出 30° 锐角',
          appearAt: 6.2,
          tokens: [
            { id: 'p38_r2_rt', math: '$\\because DE \\perp BC \\implies \\angle DEC = 90^{\\circ}$，', appearAt: 6.3, dur: 0.40 },
            { id: 'p38_r2_30', math: '$\\angle CDE = 90^{\\circ} - 60^{\\circ} = 30^{\\circ}$', appearAt: 8.0, dur: 0.45 }
          ]
        },
        {
          rowId: 'p38_row_3',
          stepBadge: '第 3 步 · 30° 性质求斜边',
          appearAt: 12.6,
          tokens: [
            { id: 'p38_r3_cd', math: '在 $\\text{Rt}\\triangle CDE$ 中，$CD = 2CE = 2 \\times 3 = 6$', appearAt: 12.7, dur: 0.45 }
          ]
        },
        {
          rowId: 'p38_row_4',
          stepBadge: '最终结论',
          appearAt: 19.2,
          isConclusion: true,
          tokens: [
            { id: 'p38_r4_conc', math: '$\\because D$ 为 $AC$ 中点，$\\therefore AB = AC = 2CD = 12$。', appearAt: 19.3, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p38_sp_1',
          title: '核心定理 · 等边判定与 30° 直角三角形倍半法则',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p38_sp1_t1', math: '① 等边判定：三边相等 / 三个角为 $60^{\\circ}$ / 含 $60^{\\circ}$ 角的等腰三角形', appearAt: 1.4, dur: 0.40 },
            { id: 'p38_sp1_t2', math: '② $30^{\\circ}$ 性质：$\\text{Rt}\\triangle$ 中，$30^{\\circ}$ 所对直角边 $= \\frac{1}{2} \\times$ 斜边', appearAt: 12.8, dur: 0.45 }
          ],
          note: '切记：$30^{\\circ}$ 倍半关系必须同时满足“直角三角形”与“$30^{\\circ}$ 对边 vs 斜边”两个前提'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p38_r1_prop', tStart: 1.6, tEnd: 5.6, color: 'teal' },
        { tokenId: 'p38_r2_30', tStart: 8.0, tEnd: 12.0, color: 'rose' },
        { tokenId: 'p38_r3_cd', tStart: 12.7, tEnd: 18.6, color: 'amber' }
      ],

      svgAnnotations: [
        {
          id: 'p38_svg_s2',
          type: 'arrow',
          fromToken: 'p38_r1_prop',
          toToken: 'p38_r2_30',
          label: '直角三角形两锐角互余',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 7.4,
          tDrawEnd: 8.2,
          tFadeStart: 11.4,
          tEnd: 12.0
        },
        {
          id: 'p38_svg_s3',
          type: 'arrow',
          fromToken: 'p38_r2_30',
          toToken: 'p38_r3_cd',
          label: '$30^{\\circ}$ 对边 $= \\frac{1}{2}$ 斜边',
          color: '#BE123C',
          curveOffset: -26,
          tStart: 12.4,
          tDrawEnd: 13.2,
          tFadeStart: 18.0,
          tEnd: 18.6
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步标出等边三角形隐含条件：三边相等 $AB = AC = BC$，且 $\\angle C = 60^{\\circ}$。', focusToken: 'p38_r1_prop' },
        { tStart: 5.8, tEnd: 12.2, text: '第二步看直角三角形 $\\text{Rt}\\triangle CDE$：因为 $DE \\perp BC$，由两锐角互余得 $\\angle CDE = 90^{\\circ} - 60^{\\circ} = 30^{\\circ}$。', focusToken: 'p38_r2_30' },
        { tStart: 12.2, tEnd: 18.8, text: '第三步用 $30^{\\circ}$ 直角三角形性质：$30^{\\circ}$ 角所对的直角边 $CE = 3$ 等于斜边 $CD$ 的一半，故 $CD = 6$。', focusToken: 'p38_r3_cd' },
        { tStart: 18.8, tEnd: 30.0, text: '最后由 $D$ 是 $AC$ 中点得 $AC = 2CD = 12$，又因等边三角形 $AB = AC$，故 $AB = 12$！', focusToken: 'p38_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：辨析等边三角形的判定条件',
          givenLabel: '给出四个三角形条件：',
          givenFormula: '① 有两个角为 $60^{\\circ}$；② 三个外角都相等；③ 一边上的高也是这边上的中线；④ 有一个角为 $60^{\\circ}$ 的等腰三角形',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '其中一定能判定为等边三角形的条件共有几个？',
          options: [
            { key: 'A', text: 'A. $3$ 个（①②④ 均能判定，③ 只能判定为等腰三角形）', isCorrect: true },
            { key: 'B', text: 'B. $4$ 个（全部都能判定）', isCorrect: false },
            { key: 'C', text: 'C. $2$ 个（只有 ①④）', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！准确区分等腰与等边三角形的判定条件：',
            calcLines: [
              '① 两角 $60^{\\circ} \\implies$ 第三角 $60^{\\circ}$ ✓；② 三外角相等 $\\implies$ 三内角相等 ✓',
              '③ 一边高与中线重合仅能推出两腰相等（等腰三角形），不能推出等边',
              '④ 含 $60^{\\circ}$ 角的等腰三角形必为等边三角形 ✓'
            ],
            summary: '无论 $60^{\\circ}$ 是等腰三角形的顶角还是底角，都能唯一推出它是等边三角形。'
          },
          wrongTitle: '提示：请检查条件 ② 与 ③ 的推导结论',
          wrongFeedback: '三个外角都相等则三个内角都为 $60^{\\circ}$（等边）；但一边上的高也是中线只能证出该三角形是等腰三角形，请再试一次。'
        },
        practice2: {
          title: '练习二：含 30° 角直角三角形倍半计算',
          givenLabel: '已知条件：',
          givenFormula: '在 $\\text{Rt}\\triangle ABC$ 中，$\\angle C = 90^{\\circ}$，$\\angle B = 30^{\\circ}$，$AC = 5$',
          questionText: '则另一锐角 $\\angle A$ 是多少度？斜边 $AB$ 的长是多少？',
          input1Prefix: '$\\angle A =$',
          input1Placeholder: '如 60',
          input2Prefix: '°，斜边 $AB =$',
          input2Placeholder: '如 10',
          input2Suffix: '',
          expectedX: '60',
          expectedMin: '10',
          allowOrderSwap: false,
          correctFeedback: '$\\angle A = 60^{\\circ}$，斜边 $AB = 10$。',
          correctDetail: '由直角三角形两锐角互余得 $\\angle A = 90^{\\circ} - 30^{\\circ} = 60^{\\circ}$；由 $30^{\\circ}$ 对边 $AC = 5$ 得斜边 $AB = 2AC = 10$。',
          wrongFeedback: '由 $\\angle A = 90^{\\circ} - 30^{\\circ}$ 求角度，由斜边 $= 2 \\times 30^{\\circ}$ 所对直角边 $AC$ 求 $AB$。',
          specificWrongHints: []
        }
      }
    }
    ,
    // =========================================================================
    // P39：运用有理数加减法则与运算律进行加减混合运算
    // =========================================================================
    P39: {
      procedureId: 'P39',
      title: '运用有理数加减法则与运算律进行加减混合运算',
      exampleTitle: '计算：(1) $14 - (-12) + (-25) - 17$；(2) $\\left(-3\\frac{2}{3}\\right) - \\left(-2\\frac{3}{4}\\right) + 3\\frac{2}{3} - (+5.75)$',
      exampleFormula: '减法转加相反数 $\\to$ 省略括号和加号 $\\to$ 同号/相反数/凑整分组',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示双重符号化简口诀与四大分组结合巧算策略）',
      practiceSectionTitle: '有理数加减混合运算跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握省略括号变形与交换律带符号分组巧算',

      steps: [
        {
          step: 1,
          name: '第(1)题化简双重符号，写成省略括号的代数和',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '按“同号得正、异号得负”化简：$-(-12) = +12$，$+(-25) = -25$，将原式改写为 $14 + 12 - 25 - 17$。'
        },
        {
          step: 2,
          name: '第(1)题正负同号分组结合，先定符号再算绝对值',
          tStart: 5.8,
          tEnd: 12.2,
          explanation: '将正数与负数分别同号结合：$(14 + 12) + (-25 - 17) = 26 - 42$；异号相加取较大绝对值的负号，$-(42 - 26) = -16$。'
        },
        {
          step: 3,
          name: '第(2)题化简符号并把带分数 $2\\frac{3}{4}$ 化为小数 $2.75$',
          tStart: 12.2,
          tEnd: 18.2,
          explanation: '先去双重符号并统一小数：$-(-2\\frac{3}{4}) = +2.75$，$-(+5.75) = -5.75$，原式化为 $-3\\frac{2}{3} + 2.75 + 3\\frac{2}{3} - 5.75$。'
        },
        {
          step: 4,
          name: '第(2)题带符号交换位置，相反数与小数凑整分组',
          tStart: 18.2,
          tEnd: 24.5,
          explanation: '运用加法交换律与结合律（连同前面符号一起移动）：$\\left(-3\\frac{2}{3} + 3\\frac{2}{3}\\right) + (2.75 - 5.75)$。'
        },
        {
          step: 5,
          name: '相反数抵消为 $0$，算出最终结果 $-3$',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '第一组互为相反数相加得 $0$，第二组 $2.75 - 5.75 = -3$，最终结果为 $-3$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 (1) 省略括号化为 $14 + 12 - 25 - 17$' },
        { time: 7.5, step: 2, label: '2.1 (1) 同号结合得 $26 - 42 = -16$' },
        { time: 14.0, step: 3, label: '3.1 (2) 化简符号并化小数得 $-3\\frac{2}{3} + 2.75 + 3\\frac{2}{3} - 5.75$' },
        { time: 20.0, step: 4, label: '4.1 (2) 相反数与凑整分组结合' },
        { time: 26.0, step: 5, label: '5.1 (2) 算出 $0 - 3 = -3$' }
      ],

      boardRows: [
        {
          rowId: 'p39_row_0',
          stepBadge: '第(1)题 · 省略括号',
          appearAt: 0.0,
          tokens: [
            { id: 'p39_r0_1', math: '(1) $14 - (-12) + (-25) - 17$', appearAt: 0.0, dur: 0.01 },
            { id: 'p39_r0_2', math: '$= 14 + 12 - 25 - 17$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p39_row_1',
          stepBadge: '第(1)题 · 同号结合',
          appearAt: 6.2,
          tokens: [
            { id: 'p39_r1_grp', math: '$= (14 + 12) + (-25 - 17) = 26 - 42 = -16$', appearAt: 6.3, dur: 0.50 }
          ]
        },
        {
          rowId: 'p39_row_2',
          stepBadge: '第(2)题 · 去符号化小数',
          appearAt: 12.6,
          tokens: [
            { id: 'p39_r2_1', math: '(2) $= -3\\frac{2}{3} + 2.75 + 3\\frac{2}{3} - 5.75$', appearAt: 12.7, dur: 0.50 }
          ]
        },
        {
          rowId: 'p39_row_3',
          stepBadge: '第(2)题 · 分组结合',
          appearAt: 18.6,
          tokens: [
            { id: 'p39_r3_grp', math: '$= \\left(-3\\frac{2}{3} + 3\\frac{2}{3}\\right) + (2.75 - 5.75)$', appearAt: 18.7, dur: 0.50 }
          ]
        },
        {
          rowId: 'p39_row_4',
          stepBadge: '最终结论',
          appearAt: 24.8,
          isConclusion: true,
          tokens: [
            { id: 'p39_r4_conc', math: '$= 0 + (-3) = -3$。', appearAt: 24.9, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p39_sp_1',
          title: '核心口诀 · 减法转加法与四大分组巧算策略',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p39_sp1_t1', math: '① 双重符号：同号得正 $-(-a)=+a$，异号得负 $+(-a)=-a$', appearAt: 1.4, dur: 0.40 },
            { id: 'p39_sp1_t2', math: '② 优先分组：相反数抵消 $\\to$ 小数凑整 $\\to$ 同分母 $\\to$ 同号结合', appearAt: 18.8, dur: 0.45 }
          ],
          note: '切记：交换加数位置时，每个数必须连同它前面的正负号一起搬家'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p39_r0_2', tStart: 1.6, tEnd: 5.6, color: 'amber' },
        { tokenId: 'p39_r1_grp', tStart: 6.3, tEnd: 12.0, color: 'teal' },
        { tokenId: 'p39_r2_1', tStart: 12.7, tEnd: 18.0, color: 'amber' },
        { tokenId: 'p39_r3_grp', tStart: 18.7, tEnd: 24.4, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p39_svg_s1',
          type: 'arrow',
          fromToken: 'p39_r0_1',
          toToken: 'p39_r0_2',
          label: '$-(-12)=+12$，省略括号',
          color: '#D97706',
          curveOffset: 28,
          tStart: 1.4,
          tDrawEnd: 2.2,
          tFadeStart: 5.2,
          tEnd: 5.8
        },
        {
          id: 'p39_svg_s4',
          type: 'arrow',
          fromToken: 'p39_r2_1',
          toToken: 'p39_r3_grp',
          label: '相反数抵消 $+$ 小数凑整',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 18.4,
          tDrawEnd: 19.2,
          tFadeStart: 23.8,
          tEnd: 24.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '看第(1)题第一步：把 $-(-12)$ 化为 $+12$，把 $+(-25)$ 化为 $-25$，省略括号得 $14 + 12 - 25 - 17$。', focusToken: 'p39_r0_2' },
        { tStart: 5.8, tEnd: 12.2, text: '第二步同号结合：正数 $14+12=26$，负数 $-25-17=-42$，异号相加取负号得 $-16$。', focusToken: 'p39_r1_grp' },
        { tStart: 12.2, tEnd: 18.2, text: '看第(2)题：先化简双重符号，并把 $2\\frac{3}{4}$ 化为小数 $2.75$，得到 $-3\\frac{2}{3} + 2.75 + 3\\frac{2}{3} - 5.75$。', focusToken: 'p39_r2_1' },
        { tStart: 18.2, tEnd: 24.5, text: '把互为相反数的 $-3\\frac{2}{3}$ 与 $+3\\frac{2}{3}$ 结合，把同小数尾数的 $2.75$ 与 $-5.75$ 结合。', focusToken: 'p39_r3_grp' },
        { tStart: 24.5, tEnd: 30.0, text: '相反数抵消得 $0$，$2.75 - 5.75 = -3$，得出最终结果 $-3$！', focusToken: 'p39_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：把有理数加减算式写成省略括号和加号的形式',
          givenLabel: '已知算式：',
          givenFormula: '$-3 + (-5) - (-9) + (-6)$',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '将其规范改写为省略括号和加号的和的形式，正确的是？',
          options: [
            { key: 'A', text: 'A. $-3 - 5 + 9 - 6$', isCorrect: true },
            { key: 'B', text: 'B. $-3 + 5 - 9 - 6$', isCorrect: false },
            { key: 'C', text: 'C. $-3 - 5 - 9 - 6$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！按“同号得正、异号得负”逐项化简双重符号：',
            calcLines: [
              '$+(-5) = -5$，$-(-9) = +9$，$+(-6) = -6$',
              '原式 $= -3 - 5 + 9 - 6 = (-3 - 5 - 6) + 9 = -14 + 9 = -5$'
            ],
            summary: '减去一个负数等于加上它的相反数（负负得正）。'
          },
          wrongTitle: '提示：请核对 -(-9) 化简后的符号',
          wrongFeedback: '$-(-9)$ 是两个负号相逢（同号得正），化简为 $+9$，请再试一次。'
        },
        practice2: {
          title: '练习二：运用运算律分组计算有理数加减',
          givenLabel: '计算算式：',
          givenFormula: '$(-13) + (+12) + (-7) + (+18)$',
          questionText: '若按同号结合为 $[(-13)+(-7)] + (12+18)$，则负数组之和与整个算式的最终结果分别是多少？',
          input1Prefix: '负数组之和 $=$',
          input1Placeholder: '如 -20',
          input2Prefix: '，最终结果 $=$',
          input2Placeholder: '如 10',
          input2Suffix: '',
          expectedX: '-20',
          expectedMin: '10',
          allowOrderSwap: false,
          correctFeedback: '负数组之和为 $-20$，最终结果为 $10$。',
          correctDetail: '$(-13) + (-7) = -20$，$12 + 18 = 30$，最终 $-20 + 30 = 10$。',
          wrongFeedback: '同号两负数 $(-13)+(-7) = -20$，正数 $12+18 = 30$，再算 $-20 + 30$。',
          specificWrongHints: []
        }
      }
    },
    // =========================================================================
    // P40：运用有理数乘除法法则、倒数及乘法运算律计算
    // =========================================================================
    P40: {
      procedureId: 'P40',
      title: '运用有理数乘除法法则、倒数及乘法运算律计算',
      exampleTitle: '计算：(1) $\\left(\\frac{1}{8} - \\frac{1}{3} + \\frac{1}{6}\\right) \\times 24$；(2) $(-13) \\times \\frac{2}{3} - 0.34 \\times \\frac{5}{7} + \\frac{1}{3} \\times (-13) - \\frac{2}{7} \\times 0.34$',
      exampleFormula: '正向分配律去分母：$a(b+c)=ab+ac$；逆向分配律凑整：$ab+ac=a(b+c)$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（同步展示乘法正逆向分配律与“除法转乘倒数、奇负偶正”法则）',
      practiceSectionTitle: '有理数乘除与分配律巧算跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握同级乘除顺序与带负号乘法分配律',

      steps: [
        {
          step: 1,
          name: '第(1)题识别公倍数，正向应用乘法分配律',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '观察括号内分母 $8, 3, 6$ 都是 $24$ 的约数，不必通分，直接用 $24$ 乘遍括号内每一项：$\\frac{1}{8}\\times 24 - \\frac{1}{3}\\times 24 + \\frac{1}{6}\\times 24$。'
        },
        {
          step: 2,
          name: '第(1)题分别约分并合并加减得 $-1$',
          tStart: 5.8,
          tEnd: 11.8,
          explanation: '各项约分得整数 $3 - 8 + 4$，按加减合并得 $7 - 8 = -1$。'
        },
        {
          step: 3,
          name: '第(2)题锁定两组公共因数 $-13$ 与 $-0.34$',
          tStart: 11.8,
          tEnd: 18.2,
          explanation: '观察四项乘积：第 $1, 3$ 项都含公共因数 $(-13)$，第 $2, 4$ 项都含公共因数 $(-0.34)$，先带符号分组排列。'
        },
        {
          step: 4,
          name: '第(2)题逆向应用乘法分配律提取公因数',
          tStart: 18.2,
          tEnd: 24.5,
          explanation: '逆用分配律得 $(-13)\\times\\left(\\frac{2}{3} + \\frac{1}{3}\\right) - 0.34\\times\\left(\\frac{5}{7} + \\frac{2}{7}\\right)$（注意提出 $-0.34$ 后括号内两项均为正）。'
        },
        {
          step: 5,
          name: '括号内凑整为 $1$，口算得出最终结果 $-13.34$',
          tStart: 24.5,
          tEnd: 30.0,
          explanation: '两括号内分别为 $\\frac{3}{3} = 1$ 与 $\\frac{7}{7} = 1$，化为 $-13 \\times 1 - 0.34 \\times 1 = -13.34$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 (1) 用 $24$ 正向分配乘遍三项' },
        { time: 7.2, step: 2, label: '2.1 (1) 约分得 $3 - 8 + 4 = -1$' },
        { time: 13.5, step: 3, label: '3.1 (2) 识别公共因数 $-13$ 与 $-0.34$' },
        { time: 19.8, step: 4, label: '4.1 (2) 逆向提取公因数凑整 $1$' },
        { time: 26.0, step: 5, label: '5.1 (2) 合并得 $-13 - 0.34 = -13.34$' }
      ],

      boardRows: [
        {
          rowId: 'p40_row_0',
          stepBadge: '第(1)题 · 正向分配律',
          appearAt: 0.0,
          tokens: [
            { id: 'p40_r0_1', math: '(1) $\\left(\\frac{1}{8} - \\frac{1}{3} + \\frac{1}{6}\\right) \\times 24$', appearAt: 0.0, dur: 0.01 },
            { id: 'p40_r0_2', math: '$= \\frac{1}{8}\\times 24 - \\frac{1}{3}\\times 24 + \\frac{1}{6}\\times 24$', appearAt: 1.6, dur: 0.45 }
          ]
        },
        {
          rowId: 'p40_row_1',
          stepBadge: '第(1)题 · 约分合并',
          appearAt: 6.2,
          tokens: [
            { id: 'p40_r1_res', math: '$= 3 - 8 + 4 = -1$', appearAt: 6.3, dur: 0.45 }
          ]
        },
        {
          rowId: 'p40_row_2',
          stepBadge: '第(2)题 · 分组找公因数',
          appearAt: 12.2,
          tokens: [
            { id: 'p40_r2_grp', math: '(2) $= \\left[(-13)\\times\\frac{2}{3} + \\frac{1}{3}\\times(-13)\\right] + \\left(-0.34\\times\\frac{5}{7} - \\frac{2}{7}\\times 0.34\\right)$', appearAt: 12.3, dur: 0.50 }
          ]
        },
        {
          rowId: 'p40_row_3',
          stepBadge: '第(2)题 · 逆向分配律',
          appearAt: 18.6,
          tokens: [
            { id: 'p40_r3_fac', math: '$= (-13)\\times\\left(\\frac{2}{3} + \\frac{1}{3}\\right) - 0.34\\times\\left(\\frac{5}{7} + \\frac{2}{7}\\right)$', appearAt: 18.7, dur: 0.50 }
          ]
        },
        {
          rowId: 'p40_row_4',
          stepBadge: '最终结论',
          appearAt: 24.8,
          isConclusion: true,
          tokens: [
            { id: 'p40_r4_conc', math: '$= -13 \\times 1 - 0.34 \\times 1 = -13.34$。', appearAt: 24.9, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p40_sp_1',
          title: '草稿警示 · 有理数乘除三大铁律',
          showStart: 0.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p40_sp1_t1', math: '① 除法转乘倒数：$3 \\div 2 \\times \\left(-\\frac{1}{2}\\right) = 3 \\times \\frac{1}{2} \\times \\left(-\\frac{1}{2}\\right) = -\\frac{3}{4}$', appearAt: 1.4, dur: 0.40 },
            { id: 'p40_sp1_t2', math: '② 奇负偶正：先数负因数个数定符号，再约分算绝对值', appearAt: 6.8, dur: 0.40 },
            { id: 'p40_sp1_t3', math: '③ 负因数提公因式：$-0.34\\times\\frac{5}{7} - \\frac{2}{7}\\times 0.34 = -0.34\\times\\left(\\frac{5}{7}+\\frac{2}{7}\\right)$', appearAt: 18.8, dur: 0.45 }
          ],
          note: '特别提醒：乘法有分配律，但除法没有左分配律（如 $12 \\div (\\frac{1}{2} - \\frac{1}{3})$ 必须先算括号内）'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p40_r0_2', tStart: 1.6, tEnd: 5.6, color: 'amber' },
        { tokenId: 'p40_r1_res', tStart: 6.3, tEnd: 11.6, color: 'teal' },
        { tokenId: 'p40_r2_grp', tStart: 12.3, tEnd: 18.0, color: 'amber' },
        { tokenId: 'p40_r3_fac', tStart: 18.7, tEnd: 24.4, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p40_svg_s1',
          type: 'arrow',
          fromToken: 'p40_r0_1',
          toToken: 'p40_r0_2',
          label: '正向分配约去分母',
          color: '#D97706',
          curveOffset: 28,
          tStart: 1.4,
          tDrawEnd: 2.2,
          tFadeStart: 5.2,
          tEnd: 5.8
        },
        {
          id: 'p40_svg_s4',
          type: 'arrow',
          fromToken: 'p40_r2_grp',
          toToken: 'p40_r3_fac',
          label: '逆向提公因数凑整 $1$',
          color: '#0F766E',
          curveOffset: -26,
          tStart: 18.4,
          tDrawEnd: 19.2,
          tFadeStart: 23.8,
          tEnd: 24.4
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '看第(1)题：括号外是 $24$，正好是 $8, 3, 6$ 的公倍数，直接正向应用乘法分配律把 $24$ 乘遍三项。', focusToken: 'p40_r0_2' },
        { tStart: 5.8, tEnd: 11.8, text: '分别约分得 $3 - 8 + 4$，口算得出 $-1$！', focusToken: 'p40_r1_res' },
        { tStart: 11.8, tEnd: 18.2, text: '看第(2)题：前、后四项分别含有公共因数 $-13$ 和 $-0.34$，先带符号重新分组。', focusToken: 'p40_r2_grp' },
        { tStart: 18.2, tEnd: 24.5, text: '逆向应用乘法分配律提取 $-13$ 和 $-0.34$，注意提取负号后第二组括号内为 $\\frac{5}{7} + \\frac{2}{7}$。', focusToken: 'p40_r3_fac' },
        { tStart: 24.5, tEnd: 30.0, text: '两个括号都恰好凑整等于 $1$，算出最终结果 $-13 - 0.34 = -13.34$！', focusToken: 'p40_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：乘除同级运算顺序与倒数转化',
          givenLabel: '计算算式：',
          givenFormula: '$3 \\div 2 \\times \\left(-\\frac{1}{2}\\right)$',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '按从左到右顺序将除法转为乘倒数计算，正确结果是？',
          options: [
            { key: 'A', text: 'A. $3 \\times \\frac{1}{2} \\times \\left(-\\frac{1}{2}\\right) = -\\frac{3}{4}$', isCorrect: true },
            { key: 'B', text: 'B. $3 \\div (-1) = -3$', isCorrect: false },
            { key: 'C', text: 'C. $\\frac{3}{4}$', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！乘除同级运算必须从左到右先转连乘再定符号：',
            calcLines: [
              '$3 \\div 2 \\times \\left(-\\frac{1}{2}\\right) = 3 \\times \\frac{1}{2} \\times \\left(-\\frac{1}{2}\\right) = -\\frac{3}{4}$'
            ],
            summary: '切勿跳步先算后面的 $2 \\times \\left(-\\frac{1}{2}\\right)$。'
          },
          wrongTitle: '提示：请从左到右把 ÷ 2 改为 × 1/2 再相乘',
          wrongFeedback: '乘除同级运算不能先算后面的乘法，应先化为 $3 \\times \\frac{1}{2} \\times \\left(-\\frac{1}{2}\\right) = -\\frac{3}{4}$，请再试一次。'
        },
        practice2: {
          title: '练习二：带负号正向应用乘法分配律',
          givenLabel: '计算算式：',
          givenFormula: '$\\left(\\frac{2}{3} - \\frac{5}{6} + \\frac{1}{12} - \\frac{7}{8}\\right) \\times (-24)$',
          questionText: '用 $-24$ 乘遍括号内四项，第一项 $\\frac{2}{3} \\times (-24)$ 等于多少？四项合并后的最终结果是多少？',
          input1Prefix: '第一项 $=$',
          input1Placeholder: '如 -16',
          input2Prefix: '，最终结果 $=$',
          input2Placeholder: '如 23',
          input2Suffix: '',
          expectedX: '-16',
          expectedMin: '23',
          allowOrderSwap: false,
          correctFeedback: '第一项为 $-16$，四项合并得 $-16 + 20 - 2 + 21 = 23$。',
          correctDetail: '原式 $= \\frac{2}{3}\\times(-24) - \\frac{5}{6}\\times(-24) + \\frac{1}{12}\\times(-24) - \\frac{7}{8}\\times(-24) = -16 + 20 - 2 + 21 = 23$。',
          wrongFeedback: '注意乘以负数 $-24$ 后每一项都要变号：$-16 + 20 - 2 + 21$。',
          specificWrongHints: []
        }
      }
    }
    ,
    // =========================================================================
    // P41：运用线段垂直平分线的性质与判定进行线段转化、周长计算及尺规作图识别
    // =========================================================================
    P41: {
      procedureId: 'P41',
      title: '运用线段垂直平分线的性质与判定进行线段转化、周长计算及尺规作图识别',
      exampleTitle: '如图，在 $\\triangle ABC$ 中，$AB = AC$，$\\angle A = 40^{\\circ}$，$AB$ 的垂直平分线 $MN$ 交 $AC$ 于点 $D$，求 $\\angle DBC$ 的度数',
      exampleFormula: '$MN$ 垂直平分 $AB \\implies DA = DB \\implies \\angle ABD = \\angle A = 40^{\\circ}$',
      totalDuration: 30.0,
      scratchpadIdleHint: '旁白草稿演算区（配合上方动态几何图，同步展示“见中垂线连两端点得等腰”与周长化折为直法则）',
      practiceSectionTitle: '线段垂直平分线性质与判定跟做练习',
      practiceSectionSub: '完成以下两道关键操作练习，检验是否掌握垂直平分线“化折为直”算周长与判定定理',

      geometryDiagram: {
        title: '动态几何图形 · 线段 AB 垂直平分线 MN',
        caption: '随推演进度绘制中垂线 MN、连接 DB 构造等腰 △DAB（DA=DB），再作差求 ∠DBC=30°',
        svgHtml: `
          <svg viewBox="0 0 260 185" class="w-full max-w-[260px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <!-- Step 2 等腰 △DAB 浅青绿高亮底色 -->
            <polygon class="proc-geo-anim" data-appear-at="7.0" data-dur="0.6" points="130,22 68,158 164,96" fill="rgba(15, 118, 110, 0.10)" style="opacity:0;" />

            <!-- 基础 △ABC -->
            <line x1="130" y1="22" x2="68" y2="158" stroke="#334155" stroke-width="2.2" />
            <line x1="130" y1="22" x2="192" y2="158" stroke="#334155" stroke-width="2.2" />
            <line x1="68" y1="158" x2="192" y2="158" stroke="#334155" stroke-width="2.2" />

            <!-- Step 1：AB 的垂直平分线 MN (过 AB 中点 (99,90) 与 D(164,96)) -->
            <line class="proc-geo-anim" data-appear-at="1.2" data-dur="0.6" data-dash-len="140" x1="64" y1="74" x2="188" y2="112" stroke="#D97706" stroke-width="2.2" stroke-dasharray="140" stroke-dashoffset="140" style="opacity:0;" />
            <g class="proc-geo-anim" data-appear-at="2.0" data-dur="0.5" style="opacity:0;">
              <circle cx="99" cy="90" r="3" fill="#D97706" />
              <circle cx="164" cy="96" r="3.5" fill="#D97706" />
              <text x="54" y="72" fill="#B45309" font-size="11" font-weight="700">M</text>
              <text x="190" y="116" fill="#B45309" font-size="11" font-weight="700">N</text>
              <text x="172" y="92" fill="#B45309" font-size="12" font-weight="700">D</text>
              <text x="121" y="52" fill="#0F766E" font-size="11" font-weight="700">40°</text>
            </g>

            <!-- Step 2：连接 DB 高亮 DA = DB -->
            <line class="proc-geo-anim" data-appear-at="6.4" data-dur="0.6" data-dash-len="120" x1="68" y1="158" x2="164" y2="96" stroke="#0F766E" stroke-width="2.8" stroke-dasharray="120" stroke-dashoffset="120" style="opacity:0;" />
            <line class="proc-geo-anim" data-appear-at="6.8" data-dur="0.4" x1="130" y1="22" x2="164" y2="96" stroke="#0F766E" stroke-width="2.8" style="opacity:0;" />

            <!-- Step 3 & 4：∠ABD=40° 与 ∠DBC=30° 标注 -->
            <g class="proc-geo-anim" data-appear-at="13.0" data-dur="0.5" style="opacity:0;">
              <text x="80" y="135" fill="#0F766E" font-size="10" font-weight="700">40°</text>
            </g>
            <g class="proc-geo-anim" data-appear-at="20.0" data-dur="0.5" style="opacity:0;">
              <text x="102" y="152" fill="#BE123C" font-size="11" font-weight="700">30°</text>
            </g>

            <!-- 顶点 A, B, C -->
            <circle cx="130" cy="22" r="3" fill="#0F172A" />
            <circle cx="68" cy="158" r="3" fill="#0F172A" />
            <circle cx="192" cy="158" r="3" fill="#0F172A" />
            <text x="125" y="14" fill="#0F172A" font-size="13" font-weight="700">A</text>
            <text x="52" y="164" fill="#0F172A" font-size="13" font-weight="700">B</text>
            <text x="198" y="164" fill="#0F172A" font-size="13" font-weight="700">C</text>
          </svg>
        `
      },

      steps: [
        {
          step: 1,
          name: '锁定 $AB$ 的垂直平分线 $MN$ 与交点 $D$',
          tStart: 0.0,
          tEnd: 5.8,
          explanation: '识别直线 $MN$ 是线段 $AB$ 的垂直平分线，且点 $D$ 是 $MN$ 与 $AC$ 的交点（即点 $D$ 在 $AB$ 的垂直平分线上）。'
        },
        {
          step: 2,
          name: '连接 $DB$，由垂直平分线性质得 $DA = DB$',
          tStart: 5.8,
          tEnd: 12.0,
          explanation: '根据“线段垂直平分线上的点与这条线段两个端点的距离相等”，连接 $DB$ 立即得到 $DA = DB$，构造出等腰 $\\triangle DAB$。'
        },
        {
          step: 3,
          name: '在等腰 $\\triangle DAB$ 中由等边对等角得 $\\angle ABD = 40^{\\circ}$',
          tStart: 12.0,
          tEnd: 18.2,
          explanation: '在 $\\triangle DAB$ 中，因为 $DA = DB$，由等边对等角得 $\\angle ABD = \\angle A = 40^{\\circ}$。'
        },
        {
          step: 4,
          name: '在等腰 $\\triangle ABC$ 中算出大底角 $\\angle ABC = 70^{\\circ}$',
          tStart: 18.2,
          tEnd: 24.2,
          explanation: '在 $\\triangle ABC$ 中，因为 $AB = AC$ 且顶角 $\\angle A = 40^{\\circ}$，由等边对等角与内角和得 $\\angle ABC = \\frac{180^{\\circ} - 40^{\\circ}}{2} = 70^{\\circ}$。'
        },
        {
          step: 5,
          name: '两角相减求出目标角 $\\angle DBC = 30^{\\circ}$',
          tStart: 24.2,
          tEnd: 30.0,
          explanation: '由角的和差关系 $\\angle DBC = \\angle ABC - \\angle ABD = 70^{\\circ} - 40^{\\circ} = 30^{\\circ}$。'
        }
      ],

      microBeats: [
        { time: 0.8, step: 1, label: '1.1 锁定 $AB$ 的垂直平分线 $MN$ 及点 $D$' },
        { time: 7.2, step: 2, label: '2.1 连接 $DB$，由性质定理得 $DA = DB$' },
        { time: 13.5, step: 3, label: '3.1 等边对等角得 $\\angle ABD = \\angle A = 40^{\\circ}$' },
        { time: 19.5, step: 4, label: '4.1 由 $AB = AC$ 算大底角 $\\angle ABC = 70^{\\circ}$' },
        { time: 26.0, step: 5, label: '5.1 相减得 $\\angle DBC = 70^{\\circ} - 40^{\\circ} = 30^{\\circ}$' }
      ],

      boardRows: [
        {
          rowId: 'p41_row_0',
          stepBadge: '已知条件',
          appearAt: 0.0,
          tokens: [
            { id: 'p41_r0_cond', math: '在 $\\triangle ABC$ 中，$AB = AC$，$\\angle A = 40^{\\circ}$，$MN$ 垂直平分 $AB$ 交 $AC$ 于 $D$', appearAt: 0.0, dur: 0.01 }
          ]
        },
        {
          rowId: 'p41_row_1',
          stepBadge: '第 1 & 2 步 · 中垂线性质',
          appearAt: 6.2,
          tokens: [
            { id: 'p41_r1_eq', math: '$\\because MN$ 垂直平分 $AB \\implies DA = DB$', appearAt: 6.3, dur: 0.45 }
          ]
        },
        {
          rowId: 'p41_row_2',
          stepBadge: '第 3 步 · 等边对等角',
          appearAt: 12.4,
          tokens: [
            { id: 'p41_r2_ang', math: '$\\implies \\angle ABD = \\angle A = 40^{\\circ}$', appearAt: 12.5, dur: 0.45 }
          ]
        },
        {
          rowId: 'p41_row_3',
          stepBadge: '第 4 步 · 求大底角',
          appearAt: 18.6,
          tokens: [
            { id: 'p41_r3_abc', math: '$\\because AB = AC \\implies \\angle ABC = \\frac{180^{\\circ} - 40^{\\circ}}{2} = 70^{\\circ}$', appearAt: 18.7, dur: 0.50 }
          ]
        },
        {
          rowId: 'p41_row_4',
          stepBadge: '最终结论',
          appearAt: 24.6,
          isConclusion: true,
          tokens: [
            { id: 'p41_r4_conc', math: '$\\therefore \\angle DBC = \\angle ABC - \\angle ABD = 70^{\\circ} - 40^{\\circ} = 30^{\\circ}$。', appearAt: 24.7, dur: 0.60 }
          ]
        }
      ],

      scratchpadCards: [
        {
          id: 'p41_sp_1',
          title: '高频转化 · 垂直平分线“化折为直”算周长',
          showStart: 5.8,
          showEnd: 29.8,
          tokens: [
            { id: 'p41_sp1_t1', math: '① 单中垂线：$DA = DB \\implies C_{\\triangle BCD} = BC + CD + DA = BC + AC$', appearAt: 6.4, dur: 0.45 },
            { id: 'p41_sp1_t2', math: '② 判定定理：必须有两点满足 $AC=AD, BC=BD$ 才能定垂直平分线', appearAt: 18.8, dur: 0.45 }
          ],
          note: '看到尺规作图“分别以两端点为圆心、大于一半长为半径画弧交于两点连线”，立刻识别为垂直平分线'
        }
      ],

      tokenHighlights: [
        { tokenId: 'p41_r1_eq', tStart: 6.3, tEnd: 12.0, color: 'teal' },
        { tokenId: 'p41_r2_ang', tStart: 12.5, tEnd: 18.2, color: 'amber' },
        { tokenId: 'p41_r3_abc', tStart: 18.7, tEnd: 24.2, color: 'teal' }
      ],

      svgAnnotations: [
        {
          id: 'p41_svg_s2',
          type: 'arrow',
          fromToken: 'p41_r1_eq',
          toToken: 'p41_r2_ang',
          label: '等边对等角',
          color: '#0F766E',
          curveOffset: 28,
          tStart: 12.2,
          tDrawEnd: 13.0,
          tFadeStart: 17.6,
          tEnd: 18.2
        },
        {
          id: 'p41_svg_s5',
          type: 'arrow',
          fromToken: 'p41_r3_abc',
          toToken: 'p41_r4_conc',
          label: '$70^{\\circ} - 40^{\\circ} = 30^{\\circ}$',
          color: '#BE123C',
          curveOffset: -26,
          tStart: 24.2,
          tDrawEnd: 25.0,
          tFadeStart: 28.8,
          tEnd: 29.5
        }
      ],

      subtitles: [
        { tStart: 0.0, tEnd: 5.8, text: '第一步锁定垂直平分线：直线 $MN$ 垂直平分线段 $AB$，点 $D$ 是 $MN$ 与 $AC$ 的交点。', focusToken: 'p41_r0_cond' },
        { tStart: 5.8, tEnd: 12.0, text: '第二步连两端点用性质：连接 $DB$，由垂直平分线上的点到两端点距离相等，得 $DA = DB$。', focusToken: 'p41_r1_eq' },
        { tStart: 12.0, tEnd: 18.2, text: '第三步等边对等角：在等腰 $\\triangle DAB$ 中，由 $DA = DB$ 直接得出 $\\angle ABD = \\angle A = 40^{\\circ}$。', focusToken: 'p41_r2_ang' },
        { tStart: 18.2, tEnd: 24.2, text: '第四步求大底角：在等腰 $\\triangle ABC$ 中，由 $AB = AC$ 得 $\\angle ABC = (180^{\\circ} - 40^{\\circ}) \\div 2 = 70^{\\circ}$。', focusToken: 'p41_r3_abc' },
        { tStart: 24.2, tEnd: 30.0, text: '最后两角相减：$\\angle DBC = 70^{\\circ} - 40^{\\circ} = 30^{\\circ}$！', focusToken: 'p41_r4_conc' }
      ],

      practices: {
        practice1: {
          title: '练习一：识别到三顶点距离相等的点',
          givenLabel: '实际选址问题：',
          givenFormula: '要在 $\\triangle ABC$ 内部修建一座物流中心，使其到 $A, B, C$ 三个城镇的距离相等',
          extractedLabel: '',
          extractedFormula: '',
          questionText: '该物流中心应建在 $\\triangle ABC$ 的什么位置？',
          options: [
            { key: 'A', text: 'A. 三条边垂直平分线的交点处', isCorrect: true },
            { key: 'B', text: 'B. 三个内角平分线的交点处', isCorrect: false },
            { key: 'C', text: 'C. 三条中线的交点处', isCorrect: false }
          ],
          correctFeedback: {
            title: '回答正确！准确区分“到顶点等距”与“到三边等距”：',
            calcLines: [
              '到线段两端点距离相等 $\\implies$ 垂直平分线（外心）',
              '到角两边距离相等 $\\implies$ 角平分线（内心）'
            ],
            summary: '三边垂直平分线的交点到三个顶点的距离相等。'
          },
          wrongTitle: '提示：请区分“到三个顶点距离相等”与“到三条边距离相等”',
          wrongFeedback: '垂直平分线的性质是到两端点（顶点）距离相等，角平分线才是到两边距离相等，请再试一次。'
        },
        practice2: {
          title: '练习二：垂直平分线“化折为直”算周长与反求边长',
          givenLabel: '已知条件：',
          givenFormula: '在 $\\triangle ABC$ 中，$BC$ 的垂直平分线交 $AC$ 于点 $D$，交 $BC$ 于点 $E$。若 $AB = 6$，$AC = 8$，$BE = 4$',
          questionText: '由垂直平分线性质转化后，$\\triangle ABD$ 的周长是多少？整个 $\\triangle ABC$ 的周长是多少？',
          input1Prefix: '$C_{\\triangle ABD} =$',
          input1Placeholder: '如 14',
          input2Prefix: '，$C_{\\triangle ABC} =$',
          input2Placeholder: '如 22',
          input2Suffix: '',
          expectedX: '14',
          expectedMin: '22',
          allowOrderSwap: false,
          correctFeedback: '$C_{\\triangle ABD} = 14$，$C_{\\triangle ABC} = 22$。',
          correctDetail: '由 $DB = DC$ 得 $C_{\\triangle ABD} = AB + AD + DC = AB + AC = 6 + 8 = 14$；由中点 $E$ 得 $BC = 2BE = 8$，故 $C_{\\triangle ABC} = 14 + 8 = 22$。',
          wrongFeedback: '先由 $DB = DC$ 将 $\\triangle ABD$ 周长转化为 $AB + AC$，再加上 $BC = 2BE$ 得大三角形周长。',
          specificWrongHints: []
        }
      }
    }
  };

  window.PROCEDURAL_DYNAMIC_DEMOS = PROCEDURAL_DYNAMIC_DEMOS;
})();
