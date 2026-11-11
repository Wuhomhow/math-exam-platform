// 题典网「程序性知识」定义数据层 (procedural-knowledge.js)
// 核心关系：题目 → 程序性知识 → 题目集合（集合由关联数据动态生成，不复制独立题目清单）
(function () {
  const PROCEDURAL_KNOWLEDGE = [
    {
      id: 'P01',
      name: '利用直接开平方法解一元二次方程',
      purpose: '求解可化为平方等于非负数形式或两边平方相等形式的一元二次方程，得出方程的实数根。',
      conditions: [
        '方程形如 x² = p (p ≥ 0) 或 ax² + c = 0（缺少一次项，且 -c/a ≥ 0）',
        '方程含有整体平方结构，形如 (mx + n)² = p (p ≥ 0) 或 a(mx + n)² + c = d',
        '方程两边均为平方结构（或常数倍平方结构），形如 (ax + b)² = (cx + d)² 或 m(ax + b)² = n(cx + d)² (m, n > 0)'
      ],
      procedure: [
        {
          step: 1,
          action: '变形归类',
          detail: '通过移项、两边同除以平方项系数，将方程化为“完全平方等于非负数” (mx + n)² = p (p ≥ 0) 或“两边平方相等” (ax + b)² = [k(cx + d)]² 的标准目标形式。'
        },
        {
          step: 2,
          action: '开平方降次（分两种情况）',
          cases: [
            {
              caseId: 'P01_C1',
              name: '完全平方形式直接开平方',
              operation: '利用平方根的意义，对 (mx + n)² = p (p ≥ 0) 两边直接开平方，转化为 mx + n = ±√p。'
            },
            {
              caseId: 'P01_C2',
              name: '平方相等转化为两个一次方程',
              operation: '对 (ax + b)² = (cx + d)² 两边开平方，利用平方相等两数相等或互为相反数，转化为 ax + b = cx + d 或 ax + b = -(cx + d) 两个一元一次方程。'
            }
          ]
        },
        {
          step: 3,
          action: '求解一次方程定根',
          detail: '分别求解所得的两个一元一次方程，写出原一元二次方程的两个根 x₁, x₂。'
        }
      ],
      prerequisites: [
        {
          name: '平方根的意义与算术平方根计算',
          type: 'concept_and_skill',
          masteryStatus: 'unverified'
        },
        {
          name: '等式的性质（移项、系数化为1）与一元一次方程求解',
          type: 'basic_operation',
          masteryStatus: 'unverified'
        },
        {
          name: '二次根式的初步化简（如 √8 = 2√2）',
          type: 'basic_operation',
          masteryStatus: 'unverified'
        }
      ],
      grade: ['九年级', '初三'],
      chapter: '25.3 直接开平方法',
      status: 'pending_review'
    },
    {
      id: 'P02',
      name: '利用配方法解一元二次方程',
      purpose: '通过在方程两边同时添加适当的数，将二次三项式转化为完全平方形式 (x + a)² = b，进而确定配方参数或求解一元二次方程。',
      conditions: [
        '方程为一般形式或展开后可化为 x² + px + q = 0（或二次项系数化为1后的二次方程），含有一次项且不便直接开平方',
        '题目要求将二次方程配成 (x + a)² = b 的形式并确定常数 a、b 的值，或要求用配方法求出方程的根'
      ],
      procedure: [
        {
          step: 1,
          action: '整理与移项',
          detail: '若方程带有括号乘积（如 (t+3)(t-1)=12），先展开并合并同类项；将常数项移到等号右边，使左边保留二次项与一次项 x² + px = -q。'
        },
        {
          step: 2,
          action: '两边同加一次项系数一半的平方',
          detail: '在方程两边同时加上 (p/2)²，使左边凑成完全平方式 x² + px + (p/2)² = -q + (p/2)²。'
        },
        {
          step: 3,
          action: '写成完全平方形式并求解或定参',
          detail: '将方程整理为 (x + p/2)² = b 的形式：若题目仅求配方形式或参数 a、b，则直接比对得出结论；若题目要求解方程，则当 b ≥ 0 时调用 P01（直接开平方法）求出 x₁, x₂。'
        }
      ],
      prerequisites: [
        {
          id: 'P01',
          name: '利用直接开平方法解一元二次方程',
          type: 'procedural_knowledge',
          masteryStatus: 'unverified'
        },
        {
          name: '完全平方公式 a² ± 2ab + b² = (a ± b)² 的逆用',
          type: 'concept_and_skill',
          masteryStatus: 'unverified'
        },
        {
          name: '整式乘法展开、移项与有理数加减运算',
          type: 'basic_operation',
          masteryStatus: 'unverified'
        }
      ],
      relatedNote: '与 P03 共享核心配方变形操作，但 P02 作用于等式两边（方程求解与配方定参），而 P03 作用于代数式内部恒等变形（利用平方非负性求最值），二者目标不同，保留为两个独立集合。',
      grade: ['九年级', '初三'],
      chapter: '25.4 配方法',
      status: 'pending_review'
    },
    {
      id: 'P03',
      name: '利用配方法求代数式的最值',
      purpose: '通过代数式恒等配方将二次代数式转化为 a(x + m)² + k（或双变量完全平方和加常数）的形式，利用偶次方非负性确定代数式的取值范围、最大值或最小值。',
      conditions: [
        '目标是求二次三项式 ax² + bx + c 的最大值、最小值或判断其不可能取到的数值',
        '已知两个变量的一次等量关系（如 m - n = 3 或 a + 2b = 20），求双变量乘积代换后的二次代数式最值或可能值',
        '含有两个独立变量的二次多项式（如 4x² + 2y² - 4y - 4x + 15）求最值'
      ],
      procedure: [
        {
          step: 1,
          action: '消元或分组准备',
          detail: '若含两个变量且有一次等式约束，先用一个变量表示另一个变量并代入目标式化为单变量二次式；若为双变量独立二次式，则按变量分别分组；若二次项系数 a ≠ 1，先对二次项和一次项提取公因式 a。'
        },
        {
          step: 2,
          action: '代数式内加减配凑完全平方式',
          detail: '在括号内加上并减去一次项系数一半的平方（或将常数项拆分为完全平方所需常数与剩余常数），化为 a(x + m)² + k 或 (ax + m)² + b(cy + n)² + k 的恒等形式。'
        },
        {
          step: 3,
          action: '利用平方非负性判定范围与最值',
          detail: '依据实数平方非负性 (x + m)² ≥ 0：当 a > 0 时，a(x + m)² + k ≥ k，得出最小值 k；当 a < 0 时，a(x + m)² + k ≤ k，得出最大值 k，并据此得出取值范围或排除不可能的选项。'
        }
      ],
      prerequisites: [
        {
          name: '完全平方公式 a² ± 2ab + b² = (a ± b)² 的逆用與拆项添项恒等变形',
          type: 'concept_and_skill',
          masteryStatus: 'unverified'
        },
        {
          name: '偶次方（完全平方式）的非负性：(A)² ≥ 0',
          type: 'concept_and_skill',
          masteryStatus: 'unverified'
        },
        {
          name: '代入消元、提取公因式与不等式基本性质',
          type: 'basic_operation',
          masteryStatus: 'unverified'
        }
      ],
      relatedNote: '与 P02 均使用配方技巧，但 P03 属于代数式恒等变形（不能在等式两边同加，必须加减同一数或拆常数项），且最终依赖平方非负性定最值，故与 P02 分为两个集合。',
      grade: ['九年级', '初三'],
      chapter: '25.4 配方法',
      status: 'pending_review'
    }
  ];

  window.PROCEDURAL_KNOWLEDGE = PROCEDURAL_KNOWLEDGE;
})();
