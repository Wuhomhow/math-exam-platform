// 题典网「共享小节级标准目录」配置与查询服务 (curriculum-catalog.js)
// 已接入章节：七年级 第1–5章 + 八年级 第14–18章 + 九年级 第25、27、29章（全部13个含Pxx核心章）
// 核心原则：
// 1. 原始题目唯一保存在 questions.js 中（不修改、不复制 questions.js）。
// 2. 与 question-procedures.js、question-catalog-map.js 联动，动态计算每小节的 3 档定位标签：
//    - procedural_featured（程序性精选，双板块展示）
//    - procedural_bank（程序性扩充，仅题库展示）
//    - comprehensive（综合拓展，仅题库展示）
(function () {
  const CURRICULUM_CATALOG = [
    {
      id: 'g7_c4',
      grade: '初一',
      procGrade: '七年级',
      semester: '上册',
      chapterGroup: '第四章 整式的加减',
      aliases: ['第四章 整式的加减法', '第四章 整式的加减'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g7_c4_s1_1',
          code: '4.1.1',
          title: '4.1.1 单项式',
          procedureIds: ['P34'],
          fallback: false
        },
        {
          id: 'g7_c4_s1_2',
          code: '4.1.2',
          title: '4.1.2 多项式',
          procedureIds: ['P47', 'P48'],
          fallback: false
        },
        {
          id: 'g7_c4_s2_1',
          code: '4.2.1',
          title: '4.2.1 合并同类项',
          procedureIds: ['P49', 'P51'],
          fallback: false
        },
        {
          id: 'g7_c4_s2_2',
          code: '4.2.2',
          title: '4.2.2 去括号',
          procedureIds: ['P28', 'P50'],
          fallback: false
        },
        {
          id: 'g7_c4_s2_3',
          code: '4.2.3',
          title: '4.2.3 整式加减的应用',
          procedureIds: ['P45'],
          fallback: false
        },
        {
          id: 'g7_c4_fallback',
          code: '4.综合',
          title: '第四章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g8_c15',
      grade: '初二',
      procGrade: '八年级',
      semester: '上册',
      chapterGroup: '第十五章 轴对称',
      aliases: ['第15章 等腰三角形', '第十五章 轴对称'],
      // 成品试卷区继续保留这 3 套成品卷，同时也在第十五章标准小节内可按知识点检索
      includeFinishedPapers: [
        '15.8等边对等角',
        '15.9三线合一',
        '初二上册 成品卷：将军饮马'
      ],
      sections: [
        {
          id: 'g8_c15_s1_1',
          code: '15.1.1',
          title: '15.1.1 轴对称及其性质',
          procedureIds: ['P118'],
          fallback: false
        },
        {
          id: 'g8_c15_s1_2',
          code: '15.1.2',
          title: '15.1.2 线段的垂直平分线',
          procedureIds: ['P41'],
          fallback: false
        },
        {
          id: 'g8_c15_s2',
          code: '15.2',
          title: '15.2 画轴对称的图形',
          procedureIds: ['P119'],
          fallback: false
        },
        {
          id: 'g8_c15_s3_1',
          code: '15.3.1–15.3.2',
          title: '15.3.1–15.3.2 等腰三角形的性质与判定',
          procedureIds: ['P37', 'P10'],
          fallback: false
        },
        {
          id: 'g8_c15_s3_3',
          code: '15.3.3–15.3.5',
          title: '15.3.3–15.3.5 等边三角形与 30° 直角三角形',
          procedureIds: ['P38'],
          fallback: false
        },
        {
          id: 'g8_c15_s4',
          code: '15.4',
          title: '15.4 最短路径问题（将军饮马）',
          procedureIds: ['P120'],
          fallback: false
        },
        {
          id: 'g8_c15_fallback',
          code: '15.综合',
          title: '第十五章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g8_c14',
      grade: '初二',
      procGrade: '八年级',
      semester: '上册',
      chapterGroup: '第十四章 全等三角形',
      aliases: ['第14章 全等三角形', '第十四章 全等三角形'],
      // 成品试卷区继续保留这 6 套成品卷，同时在第十四章标准小节内可按知识点检索
      includeFinishedPapers: [
        '14.2全等三角形性质',
        '14.3三角形全等的判定（SAS）',
        '14.4三角形全等的判定（ASA）',
        '14.5三角形全等的判定（AAS）',
        '14.6三角形全等的判定（SSS）',
        '14.7 角平分线'
      ],
      sections: [
        {
          id: 'g8_c14_s2',
          code: '14.1–14.2',
          title: '14.1–14.2 全等三角形的性质',
          procedureIds: ['P42'],
          fallback: false
        },
        {
          id: 'g8_c14_s3',
          code: '14.3–14.6',
          title: '14.3–14.6 全等三角形的判定（SAS/ASA/AAS/SSS）',
          procedureIds: ['P43'],
          fallback: false
        },
        {
          id: 'g8_c14_s7',
          code: '14.7',
          title: '14.7 角的平分线',
          procedureIds: ['P44'],
          fallback: false
        },
        {
          id: 'g8_c14_fallback',
          code: '14.综合',
          title: '第十四章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g8_c16',
      grade: '初二',
      procGrade: '八年级',
      semester: '上册',
      chapterGroup: '第十六章 整式的乘法',
      aliases: ['第16章 幂的运算', '第十六章 整式的乘法'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g8_c16_s1',
          code: '16.1',
          title: '16.1 幂的运算',
          procedureIds: ['P30'],
          fallback: false
        },
        {
          id: 'g8_c16_s2',
          code: '16.2',
          title: '16.2 整式的乘法与除法',
          procedureIds: ['P27', 'P121', 'P107', 'P108'],
          fallback: false
        },
        {
          id: 'g8_c16_s3_1',
          code: '16.3.1',
          title: '16.3.1 平方差公式',
          procedureIds: ['P26'],
          fallback: false
        },
        {
          id: 'g8_c16_s3_2',
          code: '16.3.2',
          title: '16.3.2 完全平方公式',
          procedureIds: ['P23'],
          fallback: false
        },
        {
          id: 'g8_c16_fallback',
          code: '16.综合',
          title: '第十六章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g8_c17',
      grade: '初二',
      procGrade: '八年级',
      semester: '上册',
      chapterGroup: '第十七章 因式分解',
      aliases: ['第17章 因式分解', '第十七章 因式分解'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g8_c17_s1',
          code: '17.1',
          title: '17.1 用提公因式法分解因式',
          procedureIds: ['P24'],
          fallback: false
        },
        {
          id: 'g8_c17_s2',
          code: '17.2',
          title: '17.2 用公式法分解因式',
          procedureIds: ['P25'],
          fallback: false
        },
        {
          id: 'g8_c17_s3',
          code: '17.3',
          title: '17.3 十字相乘法与拓展',
          procedureIds: [],
          fallback: false
        },
        {
          id: 'g8_c17_fallback',
          code: '17.综合',
          title: '第十七章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g8_c18',
      grade: '初二',
      procGrade: '八年级',
      semester: '上册',
      chapterGroup: '第十八章 分式',
      aliases: ['第18章 分式', '第十八章 分式'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g8_c18_s1',
          code: '18.1',
          title: '18.1 分式及其基本性质',
          procedureIds: ['P31'],
          fallback: false
        },
        {
          id: 'g8_c18_s2',
          code: '18.2',
          title: '18.2 分式的乘除与乘方',
          procedureIds: ['P35'],
          fallback: false
        },
        {
          id: 'g8_c18_s3',
          code: '18.3',
          title: '18.3 分式的加减与混合运算',
          procedureIds: ['P36'],
          fallback: false
        },
        {
          id: 'g8_c18_s4',
          code: '18.4',
          title: '18.4 整数指数幂',
          procedureIds: ['P109', 'P110'],
          fallback: false
        },
        {
          id: 'g8_c18_s5',
          code: '18.5',
          title: '18.5 分式方程',
          procedureIds: ['P111', 'P112'],
          fallback: false
        },
        {
          id: 'g8_c18_fallback',
          code: '18.综合',
          title: '第十八章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g7_c1',
      grade: '初一',
      procGrade: '七年级',
      semester: '上册',
      chapterGroup: '第一章 有理数',
      aliases: ['第一章 有理数', '第1章 有理数'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g7_c1_s1',
          code: '1.1',
          title: '1.1 正数和负数',
          procedureIds: ['P94'],
          fallback: false
        },
        {
          id: 'g7_c1_s2_1',
          code: '1.2.1–1.2.3',
          title: '1.2.1–1.2.3 有理数概念与数轴',
          procedureIds: ['P95', 'P96', 'P97'],
          fallback: false
        },
        {
          id: 'g7_c1_s2_4',
          code: '1.2.4',
          title: '1.2.4 相反数与符号化简',
          procedureIds: ['P98', 'P99'],
          fallback: false
        },
        {
          id: 'g7_c1_s2_5',
          code: '1.2.5–1.2.6',
          title: '1.2.5–1.2.6 绝对值与有理数大小比较',
          procedureIds: ['P54', 'P55', 'P56', 'P33'],
          fallback: false
        },
        {
          id: 'g7_c1_fallback',
          code: '1.综合',
          title: '第一章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g7_c2',
      grade: '初一',
      procGrade: '七年级',
      semester: '上册',
      chapterGroup: '第二章 有理数的运算',
      aliases: ['第二章 有理数的运算', '第2章 有理数的运算'],
      // 成品试卷区继续保留这 4 套成品卷，同时在第二章标准小节内可按知识点检索
      includeFinishedPapers: [
        '2.3.1 有理数的加法',
        '2.3.2 有理数的减法',
        '2.3.2 科学记数法',
        '第二章单元测试'
      ],
      sections: [
        {
          id: 'g7_c2_s1',
          code: '2.1',
          title: '2.1 有理数的加减法',
          procedureIds: ['P102', 'P103', 'P39'],
          fallback: false
        },
        {
          id: 'g7_c2_s2',
          code: '2.2',
          title: '2.2 有理数的乘除法',
          procedureIds: ['P40', 'P104', 'P105'],
          fallback: false
        },
        {
          id: 'g7_c2_s3_1',
          code: '2.3.1',
          title: '2.3.1 有理数的乘方与混合运算',
          procedureIds: ['P106', 'P32'],
          fallback: false
        },
        {
          id: 'g7_c2_s3_2',
          code: '2.3.2–2.3.3',
          title: '2.3.2–2.3.3 科学记数法与近似数',
          procedureIds: ['P100', 'P101'],
          fallback: false
        },
        {
          id: 'g7_c2_fallback',
          code: '2.综合',
          title: '第二章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g7_c3',
      grade: '初一',
      procGrade: '七年级',
      semester: '上册',
      chapterGroup: '第三章 代数式',
      aliases: ['第三章 代数式', '第3章 代数式'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g7_c3_s1_1',
          code: '3.1.1',
          title: '3.1.1 代数式的概念与规范书写',
          procedureIds: ['P04'],
          fallback: false
        },
        {
          id: 'g7_c3_s1_2',
          code: '3.1.2',
          title: '3.1.2 列代数式与规律探究',
          procedureIds: ['P05', 'P06'],
          fallback: false
        },
        {
          id: 'g7_c3_s1_3',
          code: '3.1.3',
          title: '3.1.3 正（反）比例关系',
          procedureIds: ['P46', 'P07'],
          fallback: false
        },
        {
          id: 'g7_c3_s2',
          code: '3.2',
          title: '3.2 代数式的值',
          procedureIds: ['P08', 'P09'],
          fallback: false
        },
        {
          id: 'g7_c3_fallback',
          code: '3.综合',
          title: '第三章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g7_c5',
      grade: '初一',
      procGrade: '七年级',
      semester: '上册',
      chapterGroup: '第五章 一元一次方程',
      aliases: ['第五章 一元一次方程', '第5章 一元一次方程'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g7_c5_s1',
          code: '5.1',
          title: '5.1 方程与等式的性质',
          procedureIds: ['P29'],
          fallback: false
        },
        {
          id: 'g7_c5_s2',
          code: '5.2',
          title: '5.2 解一元一次方程',
          procedureIds: ['P22'],
          fallback: false
        },
        {
          id: 'g7_c5_s3',
          code: '5.3',
          title: '5.3 实际问题与一元一次方程',
          procedureIds: [],
          fallback: false
        },
        {
          id: 'g7_c5_fallback',
          code: '5.综合',
          title: '第五章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g9_c25',
      grade: '初三',
      procGrade: '九年级',
      semester: '上册',
      chapterGroup: '第二十五章 一元二次方程',
      aliases: ['第25章 一元二次方程', '第二十五章 一元二次方程'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g9_c25_s1',
          code: '25.1',
          title: '25.1 一元二次方程概念与一般式',
          procedureIds: ['P19'],
          fallback: false
        },
        {
          id: 'g9_c25_s2',
          code: '25.2',
          title: '25.2 一元二次方程的解及其应用',
          procedureIds: ['P20'],
          fallback: false
        },
        {
          id: 'g9_c25_s3',
          code: '25.3',
          title: '25.3 直接开平方法',
          procedureIds: ['P01'],
          fallback: false
        },
        {
          id: 'g9_c25_s4',
          code: '25.4',
          title: '25.4 配方法及应用',
          procedureIds: ['P02', 'P03'],
          fallback: false
        },
        {
          id: 'g9_c25_s5',
          code: '25.5',
          title: '25.5 一元二次方程的根的判别式',
          procedureIds: ['P16'],
          fallback: false
        },
        {
          id: 'g9_c25_s6',
          code: '25.6',
          title: '25.6 公式法解一元二次方程',
          procedureIds: ['P17'],
          fallback: false
        },
        {
          id: 'g9_c25_s7',
          code: '25.7',
          title: '25.7 因式分解法解一元二次方程',
          procedureIds: ['P18'],
          fallback: false
        },
        {
          id: 'g9_c25_s8',
          code: '25.8',
          title: '25.8 一元二次方程的根与系数的关系',
          procedureIds: ['P21'],
          fallback: false
        },
        {
          id: 'g9_c25_s9',
          code: '25.9–25.10',
          title: '25.9–25.10 一元二次方程的实际与几何应用',
          procedureIds: ['P92', 'P93'],
          fallback: false
        },
        {
          id: 'g9_c25_fallback',
          code: '25.综合',
          title: '第二十五章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g9_c26',
      grade: '初三',
      procGrade: '九年级',
      semester: '上册',
      chapterGroup: '第二十六章 二次函数',
      aliases: ['第26章 二次函数', '第二十六章 二次函数'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g9_c26_s1',
          code: '26.1',
          title: '26.1 二次函数的概念',
          procedureIds: ['P67'],
          fallback: false
        },
        {
          id: 'g9_c26_s2_1',
          code: '26.2.1',
          title: '26.2.1 y=ax² 的图象和性质',
          procedureIds: ['P68'],
          fallback: false
        },
        {
          id: 'g9_c26_s2_2',
          code: '26.2.2',
          title: '26.2.2 y=a(x-h)²+k 的图象与平移',
          procedureIds: ['P69', 'P70'],
          fallback: false
        },
        {
          id: 'g9_c26_s2_3',
          code: '26.2.3',
          title: '26.2.3 y=ax²+bx+c 的图象、性质与最值',
          procedureIds: ['P71', 'P72', 'P73'],
          fallback: false
        },
        {
          id: 'g9_c26_s2_4',
          code: '26.2.4',
          title: '26.2.4 待定系数法求二次函数解析式',
          procedureIds: ['P74'],
          fallback: false
        },
        {
          id: 'g9_c26_s3',
          code: '26.3',
          title: '26.3 二次函数与一元二次方程',
          procedureIds: ['P75', 'P76', 'P77'],
          fallback: false
        },
        {
          id: 'g9_c26_s4',
          code: '26.4',
          title: '26.4 实际问题与二次函数',
          procedureIds: ['P78', 'P79', 'P80'],
          fallback: false
        },
        {
          id: 'g9_c26_fallback',
          code: '26.综合',
          title: '第二十六章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g9_c27',
      grade: '初三',
      procGrade: '九年级',
      semester: '上册',
      chapterGroup: '第二十七章 反比例函数',
      aliases: ['第27章 反比例函数', '第二十七章 反比例函数'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g9_c27_s1',
          code: '27.1',
          title: '27.1 反比例函数的概念与待定系数法',
          procedureIds: ['P11', 'P58', 'P12'],
          fallback: false
        },
        {
          id: 'g9_c27_s2_1',
          code: '27.2.1',
          title: '27.2.1 反比例函数的图象和性质',
          procedureIds: ['P57', 'P13', 'P14', 'P59', 'P60'],
          fallback: false
        },
        {
          id: 'g9_c27_s2_k',
          code: '27.2.k',
          title: '27.2 反比例函数中 k 的几何意义',
          procedureIds: ['P61', 'P62'],
          fallback: false
        },
        {
          id: 'g9_c27_s2_2',
          code: '27.2.2',
          title: '27.2.2 反比例函数与一次函数的综合',
          procedureIds: ['P15', 'P63', 'P64', 'P65'],
          fallback: false
        },
        {
          id: 'g9_c27_s3',
          code: '27.3',
          title: '27.3 实际问题与反比例函数',
          procedureIds: ['P66'],
          fallback: false
        },
        {
          id: 'g9_c27_fallback',
          code: '27.综合',
          title: '第二十七章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    },
    {
      id: 'g9_c29',
      grade: '初三',
      procGrade: '九年级',
      semester: '上册',
      chapterGroup: '第二十九章 圆',
      aliases: ['第29章 圆', '第二十九章 圆'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g9_c29_s1_1',
          code: '29.1.1',
          title: '29.1.1 圆的有关概念与点圆位置关系',
          procedureIds: ['P52', 'P53'],
          fallback: false
        },
        {
          id: 'g9_c29_s1_2',
          code: '29.1.2',
          title: '29.1.2 过三点的圆',
          procedureIds: ['P81', 'P82'],
          fallback: false
        },
        {
          id: 'g9_c29_s2_1',
          code: '29.2.1',
          title: '29.2.1 垂直于弦的直径',
          procedureIds: ['P83', 'P84'],
          fallback: false
        },
        {
          id: 'g9_c29_s2_2',
          code: '29.2.2',
          title: '29.2.2 圆心角',
          procedureIds: ['P85'],
          fallback: false
        },
        {
          id: 'g9_c29_s2_3',
          code: '29.2.3',
          title: '29.2.3 圆周角',
          procedureIds: ['P86', 'P87', 'P88'],
          fallback: false
        },
        {
          id: 'g9_c29_s3',
          code: '29.3',
          title: '29.3 弧长和扇形面积',
          procedureIds: ['P89', 'P90', 'P91'],
          fallback: false
        },
        {
          id: 'g9_c29_fallback',
          code: '29.综合',
          title: '第二十九章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    }
,
    {
      id: 'g9_c30',
      grade: '初三',
      procGrade: '九年级',
      semester: '上册',
      chapterGroup: '第三十章 直线与圆的位置关系',
      aliases: ['第30章 直线与圆的位置关系', '第三十章 直线与圆的位置关系'],
      includeFinishedPapers: [],
      sections: [
        {
          id: 'g9_c30_s1_1',
          code: '30.1.1',
          title: '30.1.1 直线与圆相离、相切、相交',
          procedureIds: ['P113'],
          fallback: false
        },
        {
          id: 'g9_c30_s1_2',
          code: '30.1.2',
          title: '30.1.2 圆的切线',
          procedureIds: ['P114', 'P115'],
          fallback: false
        },
        {
          id: 'g9_c30_s2',
          code: '30.2',
          title: '30.2 三角形的内切圆',
          procedureIds: ['P116'],
          fallback: false
        },
        {
          id: 'g9_c30_s3',
          code: '30.3',
          title: '30.3 正多边形与圆',
          procedureIds: ['P117'],
          fallback: false
        },
        {
          id: 'g9_c30_fallback',
          code: '30.综合',
          title: '第三十章 综合与待细化',
          procedureIds: [],
          fallback: true
        }
      ]
    }
  ];

  const PEDAGOGY_TAG_META = {
    procedural_featured: {
      label: '程序性精选',
      badgeClass: 'bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4]'
    },
    procedural_bank: {
      label: '程序性扩充',
      badgeClass: 'bg-sky-50 text-sky-700 border border-sky-200'
    },
    comprehensive: {
      label: '综合拓展',
      badgeClass: 'bg-amber-50 text-amber-800 border border-amber-200'
    }
  };

  function getBank() {
    return Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK : [];
  }

  function getCatalogMap() {
    return (window.QUESTION_CATALOG_MAP && typeof window.QUESTION_CATALOG_MAP === 'object')
      ? window.QUESTION_CATALOG_MAP
      : {};
  }

  function isQuestionInPilotChapter(q, pilotChapter) {
    if (!q || !pilotChapter) return false;
    const ch = String(q.chapter || '').trim();
    if (Array.isArray(pilotChapter.includeFinishedPapers) && pilotChapter.includeFinishedPapers.includes(ch)) {
      return true;
    }
    if (typeof inferAcademicLocation === 'function' && typeof getChapterGroup === 'function') {
      const loc = inferAcademicLocation(ch);
      if (loc.grade !== pilotChapter.grade) return false;
      const grp = getChapterGroup(loc.grade, ch);
      return grp === pilotChapter.chapterGroup || (pilotChapter.aliases || []).includes(grp);
    }
    return false;
  }

  // 构建单个试点章的小节索引（带缓存，按题库长度与映射数失效）
  const chapterIndexCache = new Map();

  function buildChapterIndex(pilotChapter) {
    const bank = getBank();
    const mapObj = getCatalogMap();
    const cacheKey = `${pilotChapter.id}::${bank.length}::${Object.keys(mapObj).length}`;
    if (chapterIndexCache.has(cacheKey)) return chapterIndexCache.get(cacheKey);

    const bankById = new Map(bank.map(q => [q.id, q]));
    const procSvc = window.ProceduralKnowledgeService;

    // 1. 收集该章每个小节的题目列表与标签（优先级：procedural_featured > procedural_bank > comprehensive）
    const sectionItemMaps = new Map();
    pilotChapter.sections.forEach(sec => sectionItemMaps.set(sec.id, new Map()));

    const allAssignedIds = new Set();

    const validSectionIds = new Set(pilotChapter.sections.map(s => s.id));

    // Step A: 先注入各小节绑定的 Pxx 题目（包含 featured 和 bank_only）；若题目已在 QUESTION_CATALOG_MAP 显式归属本章其他小节，则不跨小节重复/前置注入
    pilotChapter.sections.forEach(sec => {
      const itemMap = sectionItemMaps.get(sec.id);
      (sec.procedureIds || []).forEach(pid => {
        if (!procSvc || typeof procSvc.getQuestionCollectionByProcedure !== 'function') return;
        const col = procSvc.getQuestionCollectionByProcedure(pid, { includeBankOnly: true });
        if (!col || !Array.isArray(col.items)) return;
        col.items.forEach(it => {
          const q = it.question || bankById.get(it.questionId);
          if (!q) return;
          const explicitMap = mapObj[q.id];
          if (explicitMap && validSectionIds.has(explicitMap.sectionId) && explicitMap.sectionId !== sec.id) {
            return;
          }
          const tag = it.visibility === 'bank_only' ? 'procedural_bank' : 'procedural_featured';
          const existing = itemMap.get(q.id);
          if (!existing) {
            itemMap.set(q.id, { question: q, pedagogyTag: tag, procedureIds: [pid] });
          } else {
            if (!existing.procedureIds.includes(pid)) existing.procedureIds.push(pid);
            // 优先级：procedural_featured 高于 procedural_bank
            if (tag === 'procedural_featured') existing.pedagogyTag = 'procedural_featured';
          }
          allAssignedIds.add(q.id);
        });
      });
    });

    // Step B: 注入 QUESTION_CATALOG_MAP 中显式映射到该章各小节的未关联题目
    Object.keys(mapObj).forEach(qid => {
      const entry = mapObj[qid];
      if (!entry || !validSectionIds.has(entry.sectionId)) return;
      const q = bankById.get(qid);
      if (!q) return;
      const itemMap = sectionItemMaps.get(entry.sectionId);
      if (!itemMap.has(qid)) {
        const tag = entry.pedagogyTag === 'procedural_bank' ? 'procedural_bank' : 'comprehensive';
        itemMap.set(qid, { question: q, pedagogyTag: tag, procedureIds: [] });
      }
      allAssignedIds.add(qid);
    });

    // Step C: 兜底收容——本章原库中既未进 Pxx、也未在 QUESTION_CATALOG_MAP 显式映射的题，自动归入 fallback 小节
    const fallbackSec = pilotChapter.sections.find(s => s.fallback);
    if (fallbackSec) {
      const fbMap = sectionItemMaps.get(fallbackSec.id);
      bank.forEach(q => {
        if (!isQuestionInPilotChapter(q, pilotChapter)) return;
        if (!allAssignedIds.has(q.id)) {
          fbMap.set(q.id, { question: q, pedagogyTag: 'comprehensive', procedureIds: [] });
          allAssignedIds.add(q.id);
        }
      });
    }

    // 整理输出结构
    const sectionData = new Map();
    const chapterUniqueIds = new Set();

    pilotChapter.sections.forEach(sec => {
      const items = Array.from(sectionItemMaps.get(sec.id).values());
      const counts = { all: items.length, procedural_featured: 0, procedural_bank: 0, comprehensive: 0 };
      const tagByQuestionId = new Map();
      items.forEach(it => {
        chapterUniqueIds.add(it.question.id);
        tagByQuestionId.set(it.question.id, it.pedagogyTag);
        if (counts[it.pedagogyTag] !== undefined) counts[it.pedagogyTag]++;
      });
      sectionData.set(sec.id, {
        section: sec,
        chapter: pilotChapter,
        items,
        counts,
        tagByQuestionId
      });
    });

    const result = {
      chapter: pilotChapter,
      totalUniqueQuestions: chapterUniqueIds.size,
      uniqueQuestionIds: chapterUniqueIds,
      sectionData
    };
    chapterIndexCache.set(cacheKey, result);
    return result;
  }

  const CurriculumCatalogService = {
    getPilotChapters() {
      return CURRICULUM_CATALOG;
    },

    getPilotChapter(grade, chapterGroup) {
      return CURRICULUM_CATALOG.find(c =>
        c.grade === grade && (c.chapterGroup === chapterGroup || (c.aliases || []).includes(chapterGroup))
      ) || null;
    },

    getSectionById(sectionId) {
      for (const ch of CURRICULUM_CATALOG) {
        const sec = ch.sections.find(s => s.id === sectionId);
        if (sec) return { section: sec, chapter: ch };
      }
      return null;
    },

    getChapterSummary(grade, chapterGroup) {
      const pilot = this.getPilotChapter(grade, chapterGroup);
      if (!pilot) return null;
      const idx = buildChapterIndex(pilot);
      return {
        chapter: pilot,
        totalUniqueQuestions: idx.totalUniqueQuestions,
        sections: pilot.sections.map(sec => {
          const sd = idx.sectionData.get(sec.id);
          return {
            ...sec,
            count: sd ? sd.counts.all : 0,
            counts: sd ? sd.counts : { all: 0, procedural_featured: 0, procedural_bank: 0, comprehensive: 0 }
          };
        })
      };
    },

    getSectionItems(sectionId) {
      const found = this.getSectionById(sectionId);
      if (!found) return null;
      const idx = buildChapterIndex(found.chapter);
      return idx.sectionData.get(sectionId) || null;
    },

    getPedagogyTagMeta(tag) {
      return PEDAGOGY_TAG_META[tag] || null;
    },

    renderPedagogyBadgeHtml(tag) {
      const meta = PEDAGOGY_TAG_META[tag];
      if (!meta) return '';
      return `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${meta.badgeClass}">${meta.label}</span>`;
    },

    clearCache() {
      chapterIndexCache.clear();
    }
  };

  window.CURRICULUM_CATALOG = CURRICULUM_CATALOG;
  window.CurriculumCatalogService = CurriculumCatalogService;
})();
