// 题典网「程序性知识」定义数据层 (procedural-knowledge.js)
// 核心关系：题目 → 程序性知识 → 题目集合（原始题目数据唯一保存在题库中，集合由关联数据动态生成）
(function () {
  const PROCEDURAL_KNOWLEDGE = [
    {
      id: 'P01',
      name: '利用直接开平方法解一元二次方程',
      grade: '九年级',
      subject: '数学',
      chapterGroup: '第二十五章 一元二次方程',
      chapter: '25.3 直接开平方法',
      description: '将一元二次方程整理转化为“平方等于非负数”或“两边平方相等”的形式，利用平方根的意义降次转化为两个一元一次方程求解。',
      purpose: '将方程转化为平方等于非负数的形式，再利用平方根的意义求解。',
      applicability: [
        '方程缺少一次项，形如 $x^{2}=p\\ (p\\ge 0)$ 或 $ax^{2}+c=0$（移项除以系数后右侧非负）。',
        '方程左边为含未知数一次式的完全平方，形如 $(mx+n)^{2}=p\\ (p\\ge 0)$ 或 $a(mx+n)^{2}+b=c$。',
        '方程两边均为完全平方式（或平方的常数倍），形如 $(ax+b)^{2}=(cx+d)^{2}$ 或 $m(ax+b)^{2}=n(cx+d)^{2}\\ (m,n>0)$。'
      ],
      conditions: [
        '方程缺少一次项，形如 $x^{2}=p\\ (p\\ge 0)$ 或 $ax^{2}+c=0$',
        '方程含有整体完全平方式，形如 $(mx+n)^{2}=p\\ (p\\ge 0)$ 或 $a(mx+n)^{2}+b=c$',
        '方程两边均为平方相等结构，形如 $(ax+b)^{2}=(cx+d)^{2}$ 或 $(ax+b)^{2}=k^{2}(cx+d)^{2}$'
      ],
      steps: [
        {
          step: 1,
          title: '移项与系数化为1，整理成标准平方形式',
          description: '将常数项移至等号右边，若平方项前有非1系数，在等式两边同时除以该系数，将方程化为 $(mx+n)^{2}=p\\ (p\\ge 0)$ 或两边平方相等 $(ax+b)^{2}=[k(cx+d)]^{2}$ 的形式。',
          formula: '$a(mx+n)^{2}+c=0 \\implies (mx+n)^{2}=-\\frac{c}{a}\\ (-\\frac{c}{a}\\ge 0)$',
          example: '如 $2(x-2)^{2}=8$，两边同除以 $2$ 得 $(x-2)^{2}=4$。'
        },
        {
          step: 2,
          title: '利用平方根意义开平方降次（分两种情况执行）',
          description: '情况一（完全平方形式直接开平方）：对 $(mx+n)^{2}=p\\ (p\\ge 0)$ 两边同时开平方，转化为 $mx+n=\\pm\\sqrt{p}$；情况二（平方相等转化为两个一次方程）：对 $(ax+b)^{2}=(cx+d)^{2}$ 两边开平方，利用两数平方相等则两数相等或互为相反数，转化为 $ax+b=cx+d$ 或 $ax+b=-(cx+d)$。',
          formula: '$(mx+n)^{2}=p \\implies mx+n=\\pm\\sqrt{p}$；$(A)^{2}=(B)^{2} \\implies A=B\\text{ 或 }A=-B$',
          example: '如 $(x-2)^{2}=4 \\implies x-2=\\pm 2$；又如 $(2x+3)^{2}=(3x+2)^{2} \\implies 2x+3=3x+2$ 或 $2x+3=-(3x+2)$。'
        },
        {
          step: 3,
          title: '拆分为两个一元一次方程并分别求解',
          description: '按正负号将降次后的等式拆成两个独立的一元一次方程，分别执行移项、合并同类项与系数化为1，写出原方程的两个实数根 $x_{1},x_{2}$。',
          formula: '$x_{1}=\\frac{-n+\\sqrt{p}}{m},\\quad x_{2}=\\frac{-n-\\sqrt{p}}{m}$',
          example: '由 $x-2=2$ 或 $x-2=-2$，解得 $x_{1}=4,x_{2}=0$。'
        }
      ],
      procedure: [
        {
          step: 1,
          action: '移项与系数化为1，整理成标准平方形式',
          detail: '将常数项移至等号右边，若平方项前有非1系数，在等式两边同时除以该系数，化为 (mx+n)²=p (p≥0) 或 (ax+b)²=[k(cx+d)]²。'
        },
        {
          step: 2,
          action: '利用平方根意义开平方降次',
          detail: '完全平方形式直接开平方得 mx+n=±√p；平方相等形式转化为 ax+b=cx+d 或 ax+b=-(cx+d) 两个一次方程。'
        },
        {
          step: 3,
          action: '拆分为两个一元一次方程并分别求解',
          detail: '分别解两个一元一次方程，得出 x₁, x₂。'
        }
      ],
      prerequisites: [
        {
          id: null,
          name: '平方根的意义：正数有两个互为相反数的平方根，0的平方根是0，负数没有实数平方根',
          type: 'concept'
        },
        {
          id: null,
          name: '一元一次方程的移项、合并同类项与系数化为1',
          type: 'operation'
        },
        {
          id: null,
          name: '最简二次根式的化简（如 $\\sqrt{8}=2\\sqrt{2}$）',
          type: 'operation'
        }
      ],
      prerequisiteProcedureIds: [],
      subsequentProcedureIds: ['P02'],
      relatedProcedureIds: [],
      pitfalls: [
        '开平方时漏掉负根（只写算术平方根 $+\\sqrt{p}$，漏掉 $-\\sqrt{p}$），导致少算一个根。',
        '面对 $(mx+n)^{2}=p$ 时盲目将左边展开成一般式，反而破坏了已有的完全平方结构。',
        '处理两边平方相等 $m(ax+b)^{2}=n(cx+d)^{2}$ 时，忘记对平方项前的系数 $m,n$ 一并开平方（如 $(3x-1)^{2}=4(2x+3)^{2}$ 开方后右侧系数应为 $\\pm 2(2x+3)$ 而非 $\\pm 4(2x+3)$）。',
        '当整理后右侧常数 $p<0$ 时，未判断出实数范围内无解而强行开平方。'
      ],
      exampleQuestionId: 'quad25_3_13',
      exampleStepMapping: [
        {
          step: 1,
          title: '对应步骤 1（移项与系数化为1，整理成标准平方形式）',
          detail: '先将常数项移至等号右边得 $\\frac{1}{4}(2x+3)^{2}=4$，再将等式两边同乘 $4$（系数化为 $1$），整理为标准完全平方式 $(2x+3)^{2}=16$。'
        },
        {
          step: 2,
          title: '对应步骤 2（利用平方根意义开平方降次）',
          detail: '对 $(2x+3)^{2}=16$ 两边直接开平方，转化为 $2x+3=\\pm 4$。'
        },
        {
          step: 3,
          title: '对应步骤 3（拆分为两个一元一次方程并分别求解）',
          detail: '由 $2x+3=4$ 或 $2x+3=-4$，分别移项、系数化为 $1$，解得 $x_{1}=\\frac{1}{2},\\ x_{2}=-\\frac{7}{2}$。'
        }
      ],
      graphNodeId: 'kp_g9_qe_solve',
      status: 'published'
    },
    {
      id: 'P02',
      name: '利用配方法解一元二次方程',
      grade: '九年级',
      subject: '数学',
      chapterGroup: '第二十五章 一元二次方程',
      chapter: '25.4 配方法',
      description: '通过在方程两边同时添加一次项系数一半的平方，将二次三项式转化为完全平方式 $(x+a)^{2}=b$，进而确定配方参数或开平方求根。',
      purpose: '通过在方程两边同时添加适当的数，将二次三项式转化为完全平方形式，并进一步求解或确定参数。',
      applicability: [
        '一元二次方程含有一次项（形如 $x^{2}+px+q=0$ 或展开整理后为此形式），无法直接开平方。',
        '题目要求将二次方程通过配方变形为 $(x+a)^{2}=b$ 的形式，或求配方后的常数 $a,b$。',
        '二次项系数化为 $1$ 后，一次项系数为偶数或便于配成完全平方式求解的一元二次方程。'
      ],
      conditions: [
        '方程含有一次项，形如 $x^{2}+px+q=0$ 或含括号乘积展开后的一元二次方程',
        '题目要求将方程配成 $(x+a)^{2}=b$ 的形式并确定参数 $a,b$，或要求用配方法解方程'
      ],
      steps: [
        {
          step: 1,
          title: '展开整理并移常数项',
          description: '若方程含括号乘积（如 $(t+3)(t-1)=12$），先展开并合并同类项；若二次项系数不为 $1$ 则两边同除以二次项系数，并将常数项移到等号右边，使左边仅保留二次项与一次项 $x^{2}+px=-q$。',
          formula: '$x^{2}+px+q=0 \\implies x^{2}+px=-q$',
          example: '如 $x^{2}+6x-7=0$，移项得 $x^{2}+6x=7$。'
        },
        {
          step: 2,
          title: '等式两边同时加上一次项系数一半的平方',
          description: '取一次项系数 $p$ 的一半 $\\frac{p}{2}$，计算其平方 $(\\frac{p}{2})^{2}$，在等号左边和右边同时加上 $(\\frac{p}{2})^{2}$。',
          formula: '$x^{2}+px+\\left(\\frac{p}{2}\\right)^{2}=-q+\\left(\\frac{p}{2}\\right)^{2}$',
          example: '一次项系数为 $6$，一半的平方为 $3^{2}=9$，两边同加 $9$ 得 $x^{2}+6x+9=7+9$。'
        },
        {
          step: 3,
          title: '左边写成完全平方形式并合并右边常数',
          description: '逆用完全平方公式将左边化为 $(x+\\frac{p}{2})^{2}$，右边计算合并为常数 $b$，得到 $(x+a)^{2}=b$。若题目求配方形式或参数 $a,b$，到此直接比对作答。',
          formula: '$\\left(x+\\frac{p}{2}\\right)^{2}=\\frac{p^{2}-4q}{4}$',
          example: '整理得 $(x+3)^{2}=16$（或如 $x^{2}-8x-5=0 \\implies (x-4)^{2}=21$，得 $a=-4,b=21$）。'
        },
        {
          step: 4,
          title: '调用直接开平方法（P01）求根',
          description: '若题目要求解出方程的根，则在右侧 $b\\ge 0$ 时，调用前置程序性知识 P01（直接开平方法），两边开平方得 $x+a=\\pm\\sqrt{b}$，解出 $x_{1},x_{2}$。',
          formula: '$x+a=\\pm\\sqrt{b} \\implies x_{1}=-a+\\sqrt{b},\\quad x_{2}=-a-\\sqrt{b}$',
          example: '如 $(x+2)^{2}=6 \\implies x+2=\\pm\\sqrt{6} \\implies x_{1}=-2+\\sqrt{6},x_{2}=-2-\\sqrt{6}$。'
        }
      ],
      procedure: [
        {
          step: 1,
          action: '展开整理并移常数项',
          detail: '将常数项移到等号右边，左边保留二次项与一次项 x²+px=-q。'
        },
        {
          step: 2,
          action: '等式两边同时加上一次项系数一半的平方',
          detail: '在方程两边同时加上 (p/2)²。'
        },
        {
          step: 3,
          action: '写成完全平方形式 (x+a)²=b',
          detail: '逆用完全平方公式将左边写为 (x+p/2)²，右边合并常数，据此确定配方参数 a, b。'
        },
        {
          step: 4,
          action: '调用直接开平方法（P01）求根',
          detail: '当 b≥0 时，两边开平方解出方程的两个根 x₁, x₂。'
        }
      ],
      prerequisites: [
        {
          id: 'P01',
          name: '利用直接开平方法解一元二次方程',
          type: 'procedural_knowledge'
        },
        {
          id: null,
          name: '完全平方公式 $a^{2}\\pm 2ab+b^{2}=(a\\pm b)^{2}$ 的逆用',
          type: 'concept'
        },
        {
          id: null,
          name: '整式乘法展开、移项与有理数运算',
          type: 'operation'
        }
      ],
      prerequisiteProcedureIds: ['P01'],
      subsequentProcedureIds: [],
      relatedProcedureIds: ['P03'],
      pitfalls: [
        '配方时只在等号左边加上 $(\\frac{p}{2})^{2}$，忘记在等号右边同时加上同一个数，导致等式失衡。',
        '移项时忘记改变常数项符号（例如把 $x^{2}-6x-5=0$ 移项错写成 $x^{2}-6x=-5$）。',
        '写成完全平方式 $(x+a)^{2}$ 时弄错一次项符号（当一次项为 $-8x$ 时，括号内应为 $(x-4)^{2}$，$a=-4$ 而非 $4$）。'
      ],
      exampleQuestionId: 'quad25_4_4',
      exampleStepMapping: [
        {
          step: 1,
          title: '对应步骤 1（移常数项）',
          detail: '将方程 $x^{2}-8x-5=0$ 中的常数项移到等号右边，得 $x^{2}-8x=5$。'
        },
        {
          step: 2,
          title: '对应步骤 2（两边同加一次项系数一半的平方）',
          detail: '一次项系数为 $-8$，一半的平方为 $(-4)^{2}=16$，在等式两边同时加 $16$，得 $x^{2}-8x+16=5+16$。'
        },
        {
          step: 3,
          title: '对应步骤 3（写成完全平方形式并确定参数）',
          detail: '左边逆用完全平方公式化为 $(x-4)^{2}$，右边合并得 $21$，即 $(x-4)^{2}=21$，对照 $(x+a)^{2}=b$ 得 $a=-4,\\ b=21$。'
        }
      ],
      graphNodeId: 'kp_g9_qe_solve',
      status: 'published'
    },
    {
      id: 'P03',
      name: '利用配方法求代数式的最值',
      grade: '九年级',
      subject: '数学',
      chapterGroup: '第二十五章 一元二次方程',
      chapter: '25.4 配方法',
      description: '通过拆项添项将代数式恒等变形为 $a(x+m)^{2}+k$ 的形式，利用平方非负性 $(x+m)^{2}\\ge 0$ 确定代数式的取值范围或最值。',
      purpose: '将代数式配成完全平方形式，利用平方非负性确定取值范围或最值。',
      applicability: [
        '求单变量二次三项式 $ax^{2}+bx+c$ 的最大值、最小值或判断其不可能取到的数值。',
        '已知两个变量的一次等式关系（如 $m-n=3$ 或 $a+2b=20$），消元转化为单变量二次式求最值或取值范围。',
        '求含两个独立变量的二次多项式（如 $4x^{2}+2y^{2}-4y-4x+15$）的最值。'
      ],
      conditions: [
        '求二次代数式 $ax^{2}+bx+c$ 的最大值、最小值或取值范围',
        '双变量含一次等量约束（如 $m-n=3$、$a+2b=20$）消元后求乘积代数式最值',
        '多变量独立二次多项式分组配方求最值'
      ],
      steps: [
        {
          step: 1,
          title: '消元代入或按变量分组，提取二次项系数',
          description: '若含两个变量且有一次等式约束，先用一个变量表示另一个变量并代入目标代数式展开；若含多个独立变量则按同一变量分组；若二次项系数 $a\\neq 1$，先对二次项与一次项提取公因式 $a$。',
          formula: '$ax^{2}+bx+c = a\\left(x^{2}+\\frac{b}{a}x\\right)+c$',
          example: '如 $8x^{2}-12x+5 = 8(x^{2}-\\frac{3}{2}x)+5$；又如由 $a+2b=20$ 得 $a=20-2b$，代入 $ab=-2b^{2}+20b=-2(b^{2}-10b)$。'
        },
        {
          step: 2,
          title: '在代数式内部拆项或添项配成完全平方式',
          description: '在括号内加上并同时减去一次项系数一半的平方（或将常数项拆分为完全平方所需常数与剩余常数），保持代数式恒等变形，整理为 $a(x+m)^{2}+k$ 的形式。',
          formula: '$a\\left(x^{2}+\\frac{b}{a}x+\\left(\\frac{b}{2a}\\right)^{2}-\\left(\\frac{b}{2a}\\right)^{2}\\right)+c = a\\left(x+\\frac{b}{2a}\\right)^{2}+k$',
          example: '如 $8(x^{2}-\\frac{3}{2}x+\\frac{9}{16}-\\frac{9}{16})+5 = 8(x-\\frac{3}{4})^{2}+\\frac{1}{2}$。'
        },
        {
          step: 3,
          title: '利用完全平方式非负性判定取值范围与最值',
          description: '利用实数平方非负性 $(x+m)^{2}\\ge 0$：当 $a>0$ 时，$a(x+m)^{2}+k\\ge k$，故当 $x=-m$ 时取得最小值 $k$；当 $a<0$ 时，$a(x+m)^{2}+k\\le k$，故当 $x=-m$ 时取得最大值 $k$。',
          formula: '若 $a>0$，则 $a(x+m)^{2}+k\\ge k\\ (\\text{最小值 }k)$；若 $a<0$，则 $a(x+m)^{2}+k\\le k\\ (\\text{最大值 }k)$',
          example: '因 $(x-\\frac{3}{4})^{2}\\ge 0$，故 $8(x-\\frac{3}{4})^{2}+\\frac{1}{2}\\ge \\frac{1}{2}$，当 $x=\\frac{3}{4}$ 时最小值为 $\\frac{1}{2}$。'
        }
      ],
      procedure: [
        {
          step: 1,
          action: '消元代入或按变量分组，提取二次项系数',
          detail: '有等式约束时先代入消元，二次项系数不为1时对前两项提取二次项系数 a。'
        },
        {
          step: 2,
          action: '在代数式内部拆项或添项配成完全平方式',
          detail: '通过拆常数项或加减同一个数，将代数式恒等变形为 a(x+m)²+k。'
        },
        {
          step: 3,
          action: '利用完全平方式非负性判定取值范围与最值',
          detail: '由 (x+m)²≥0 结合系数 a 的正负，得出代数式的最小值或最大值。'
        }
      ],
      prerequisites: [
        {
          id: null,
          name: '完全平方公式 $a^{2}\\pm 2ab+b^{2}=(a\\pm b)^{2}$ 的逆用与代数式恒等变形（添项拆项）',
          type: 'concept'
        },
        {
          id: null,
          name: '实数偶次方的非负性：对于任意实数 $A$，恒有 $A^{2}\\ge 0$',
          type: 'concept'
        },
        {
          id: null,
          name: '代入消元法、提取公因式与不等式的基本性质（乘负数不等号反向）',
          type: 'operation'
        }
      ],
      prerequisiteProcedureIds: [],
      subsequentProcedureIds: [],
      relatedProcedureIds: ['P02'],
      pitfalls: [
        '将代数式恒等配方误当作方程求解，擅自把代数式令为 $0$ 并在两边同加或直接除以二次项系数，改变了原代数式的值。',
        '当二次项系数 $a\\neq 1$（如 $8x^{2}-12x+5$ 或 $-2b^{2}+20b$）时，将括号内减去的常数移出括号外忘记乘以括号前的系数 $a$。',
        '当二次项系数 $a<0$（如 $-2(b-5)^{2}+50$）时，忽略了非负数乘以负数后 $\\le 0$，误将最大值判断成最小值。'
      ],
      exampleQuestionId: 'quad25_4_10',
      exampleStepMapping: [
        {
          step: 1,
          title: '对应步骤 1（提取二次项系数）',
          detail: '对代数式 $8x^{2}-12x+5$ 的二次项与一次项提取公因式 $8$，得 $8(x^{2}-\\frac{3}{2}x)+5$。'
        },
        {
          step: 2,
          title: '对应步骤 2（括号内添项减项恒等配方）',
          detail: '在括号内加上并减去 $(\\frac{3}{4})^{2}=\\frac{9}{16}$，得 $8(x^{2}-\\frac{3}{2}x+\\frac{9}{16}-\\frac{9}{16})+5 = 8(x-\\frac{3}{4})^{2}-8\\times\\frac{9}{16}+5 = 8(x-\\frac{3}{4})^{2}+\\frac{1}{2}$。'
        },
        {
          step: 3,
          title: '对应步骤 3（由平方非负性得出最小值）',
          detail: '因为对任意实数 $x$ 都有 $(x-\\frac{3}{4})^{2}\\ge 0$，所以 $8(x-\\frac{3}{4})^{2}+\\frac{1}{2}\\ge \\frac{1}{2}$，当 $x=\\frac{3}{4}$ 时取最小值 $\\frac{1}{2}$。'
        }
      ],
      graphNodeId: 'kp_g9_qe_solve',
      status: 'published'
    }
  ];

  window.PROCEDURAL_KNOWLEDGE = PROCEDURAL_KNOWLEDGE;
})();
