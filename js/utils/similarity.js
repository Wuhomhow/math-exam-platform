// ============================================================
// 举一反三 · 相似题认知匹配引擎 (Conditional & Procedural Knowledge Engine)
// 基于教育心理学：条件性知识（情境触发策略） + 程序性知识（解题步骤链） + 陈述性知识（基础考点）
// ============================================================

(function() {
  // 1. 学科大领域划分（防止跨学段不合理串题，同时允许同领域跨章节深度关联）
  function getQuestionDomain(q) {
    const ch = String(q.chapter || '');
    if (ch.startsWith('六年级')) {
      if (ch.includes('圆') || ch.includes('扇形')) return 'g6_circle';
      if (ch.includes('比') && !ch.includes('比例')) return 'g6_ratio';
      if (ch.includes('百分数')) return 'g6_percent';
      if (ch.includes('位置') || ch.includes('方向')) return 'g6_direction';
      return 'g6_fraction';
    }
    if (/^(2\.|第二章)/.test(ch)) return 'g7_rational';
    if (/^(3\.|第三章|4\.|第四章|16\.)/.test(ch)) return 'algebra_poly';
    if (/^(13\.|14\.|15\.)/.test(ch)) return 'g8_geometry';
    if (ch.startsWith('25.')) return 'g9_quadratic';
    if (ch.startsWith('26.')) return 'g9_parabola';
    if (ch.startsWith('27.')) return 'g9_inverse';
    return 'general_math';
  }

  // 2. 条件性知识模式库（Conditional Knowledge: "When & Why" 情境识别与策略触发）
  const CONDITIONAL_ARCHETYPES = [
    {
      id: 'irrelevant_const',
      name: '无关与定值问题',
      triggerDesc: '识别“与某字母无关/不含某项/恒为定值”情境 → 触发合并同类项后令目标字母系数为0',
      pattern: /无关|不含.{0,8}项|始终为.{0,6}定值|定值/
    },
    {
      id: 'error_reverse',
      name: '错解还原逆推',
      triggerDesc: '识别“看错符号/抄错系数/错将乘法当加法”情境 → 触发由错误结果逆推原式，再代入正确法则重算',
      pattern: /看错|抄错|漏抄|错将|误将|当成|做成了/
    },
    {
      id: 'new_definition',
      name: '新定义与自定义运算',
      triggerDesc: '识别自定义符号（⊕、⊗、行列式、框图规则）情境 → 触发按新运算法则映射为标准代数式化简',
      pattern: /新定义|定义.{0,6}运算|规定.{0,8}运算|vmatrix|行列式|\\otimes|\\oplus|★|☆|◎|※|表示.{0,15}那么/
    },
    {
      id: 'undetermined_coeff',
      name: '待定系数与恒等比较',
      triggerDesc: '识别多项式恒等或已知展开式特定项系数情境 → 触发展开后按同次幂对应系数相等建立方程',
      pattern: /恒成立|已知.{0,15}展开|乘积中不含|对比.{0,6}系数|墨迹|污损|ch16_2_3_4/
    },
    {
      id: 'holistic_subst',
      name: '整体代入与逆用公式',
      triggerDesc: '识别已知代数式关系无法单求字母或高次幂情境 → 触发逆用幂/乘方法则或添括号构造整体替换',
      pattern: /整体代入|整体思想|逆用|逆运算|已知式子的值/
    },
    {
      id: 'geo_area_algebra',
      name: '图形割补与几何面积建模',
      triggerDesc: '识别几何图形（阴影面积、拼图、边框小路、折纸盒）情境 → 触发用代数式表示边长并利用和差法建模',
      pattern: /阴影部分.{0,6}面积|长方形.{0,15}面积|正方形.{0,15}面积|花园|小路|硬纸片|折.{0,5}盒|玩具配件|表面积|梯形.{0,12}三角形/
    },
    {
      id: 'pattern_calendar',
      name: '日历数阵与规律探索',
      triggerDesc: '识别日历框图、数表排布或递推序列情境 → 触发设基准未知数表达相邻项关系或归纳第n项通式',
      pattern: /日历|规律|第n个|密码/
    },
    {
      id: 'completing_square_minmax',
      name: '配方法与非负性最值',
      triggerDesc: '识别二次代数式求极值或平方和为零情境 → 触发完全平方配方与偶次方非负性（≥0）推导',
      pattern: /配方法|最小值|最大值|非负性|偶次方/
    },
    {
      id: 'scientific_approx',
      name: '科学记数法与近似数位',
      triggerDesc: '识别大数表示或精确度判断情境 → 触发科学记数法标准形式 $a\\times 10^n$ 或精确数位还原',
      pattern: /科学记数法|近似数|精确到/
    },
    {
      id: 'number_line_abs',
      name: '数轴判断与绝对值化简',
      triggerDesc: '识别数轴点位或绝对值化简情境 → 触发由数轴位置判定正负号并去绝对值符号',
      pattern: /数轴|绝对值/
    },
    {
      id: 'triangle_congruence',
      name: '全等三角形判定与性质综合',
      triggerDesc: '识别线段或角相等证明情境 → 触发寻找对应边角条件证明三角形全等（SAS/ASA/AAS/SSS/HL）',
      pattern: /全等|SAS|ASA|AAS|SSS|\\cong/
    },
    {
      id: 'bisector_property',
      name: '角平分线与垂直平分线定理',
      triggerDesc: '识别角平分线或中垂线情境 → 触发点到角两边距离相等或到线段两端点距离相等转化线段',
      pattern: /角平分线|垂直平分线|三线合一/
    },
    {
      id: 'isosceles_30deg',
      name: '等腰/等边与含30°直角三角形',
      triggerDesc: '识别等腰、等边或30°特殊直角三角形情境 → 触发等边对等角、等角对等边或30°所对直角边为斜边一半',
      pattern: /等腰三角形|等边三角形|等边对等角|等角对等边|30\^\\circ|30°/
    },
    {
      id: 'quadratic_def_root',
      name: '一元二次方程定义与根的代入',
      triggerDesc: '识别一元二次方程概念或已知根求值情境 → 触发最高次为2且二次项系数非0或将根代入方程整体降次',
      pattern: /一元二次方程|方程的解|方程的一个根|直接开平方/
    },
    {
      id: 'unit_one_fraction',
      name: '单位“1”与分数/百分率建模',
      triggerDesc: '识别分率、比多比少或按比分配情境 → 触发锁定单位“1”建立乘除量率对应或份数转化',
      pattern: /单位“1”|几分之几|百分率|出勤率|增长率|合格率|按比分配/
    }
  ];

  // 3. 程序性知识步骤库（Procedural Knowledge: "How to do" 解题动作与步骤序列）
  const PROCEDURAL_STEPS = [
    { id: 'expand_bracket', name: '分配律展开去括号', pattern: /去括号|展开|分配律|单项式乘|多项式乘/ },
    { id: 'combine_like', name: '合并同类项化简', pattern: /合并同类项|化简|整理得/ },
    { id: 'power_exponent', name: '幂的乘方与积的乘方运算', pattern: /积的乘方|幂的乘方|同底数幂/ },
    { id: 'zero_coeff_eq', name: '令目标项系数为0列方程', pattern: /系数为0|系数等于0|=0.*解得|无关.*=0/ },
    { id: 'holistic_transform', name: '代数式恒等变形与整体替换', pattern: /整体|代入.*原式|变形为/ },
    { id: 'system_equations', name: '建立方程（组）求解参数', pattern: /方程组|联立|解得.*=/ },
    { id: 'subst_eval', name: '代入数值计算求值', pattern: /当.*=.*时|代入.*得/ },
    { id: 'geo_angle_segment', name: '几何角度与线段和差推导', pattern: /三角形内角和|外角|平分|垂直|平行/ },
    { id: 'congruence_proof', name: '全等三角形判定与对应边角转化', pattern: /在\\triangle.*和\\triangle|≌|\\cong/ },
    { id: 'complete_square', name: '配方转化为完全平方式', pattern: /配方|完全平方式|\\ge 0/ },
    { id: 'rational_mixed', name: '有理数符号判定与混合运算', pattern: /有理数.*加法|有理数.*减法|有理数.*乘法|有理数.*乘方/ },
    { id: 'fraction_ratio_calc', name: '分率乘除与比值化简运算', pattern: /分数乘|分数除|化简比|比值/ }
  ];

  // 缓存每道题的认知特征画像、领域分组索引与相似题结果
  let profileMap = null;
  let domainMap = null;
  let similarCache = new Map();

  function parseKnowledgeSet(q) {
    const raw = String(q.knowledge || '');
    return new Set(raw.split('、').map(s => s.trim()).filter(Boolean));
  }

  function buildQuestionProfile(q) {
    const fullText = `${q.id || ''} ${q.knowledge || ''} ${q.stem || ''} ${q.analysis || ''} ${q.detail || ''}`;
    const kSet = parseKnowledgeSet(q);

    const conds = [];
    for (const arch of CONDITIONAL_ARCHETYPES) {
      if (arch.pattern.test(fullText)) {
        conds.push(arch);
      }
    }

    const procs = [];
    for (const step of PROCEDURAL_STEPS) {
      if (step.pattern.test(fullText)) {
        procs.push(step.name);
      }
    }

    // 若未命中特定动作正则，从考点提取兜底操作描述
    if (procs.length === 0 && kSet.size > 0) {
      procs.push(...Array.from(kSet).slice(0, 2));
    }

    return {
      id: q.id,
      domain: getQuestionDomain(q),
      chapter: String(q.chapter || ''),
      chapterPrefix: String(q.chapter || '').slice(0, 4),
      kSet,
      condIds: new Set(conds.map(c => c.id)),
      condList: conds,
      procSet: new Set(procs),
      procList: procs
    };
  }

  function ensureProfilesInitialized() {
    if (profileMap && profileMap.size === QUESTION_BANK.length) return;
    profileMap = new Map();
    domainMap = new Map();
    similarCache.clear();
    for (const q of QUESTION_BANK) {
      const prof = buildQuestionProfile(q);
      profileMap.set(q.id, prof);
      if (!domainMap.has(prof.domain)) domainMap.set(prof.domain, []);
      domainMap.get(prof.domain).push(q);
    }
  }

  function jaccardSimilarity(setA, setB) {
    if (!setA.size && !setB.size) return 0;
    let inter = 0;
    for (const item of setA) {
      if (setB.has(item)) inter++;
    }
    const union = setA.size + setB.size - inter;
    return union === 0 ? 0 : inter / union;
  }

  // 计算两道题的「条件性 + 程序性」综合相似度（返回 score 0~1 及匹配诊断信息）
  function computeCognitiveSimilarity(q1, q2) {
    if (!q1 || !q2 || q1.id === q2.id) return null;
    const p1 = profileMap ? profileMap.get(q1.id) : null;
    const p2 = profileMap ? profileMap.get(q2.id) : null;
    if (!p1 || !p2 || p1.domain !== p2.domain) return null;

    // 1. 条件性知识交集
    const sharedConds = p1.condList.filter(c => p2.condIds.has(c.id));
    const condSim = jaccardSimilarity(p1.condIds, p2.condIds);

    // 2. 程序性知识重合度
    const sharedProcs = p1.procList.filter(pr => p2.procSet.has(pr));
    const procSim = p1.procSet.size && p2.procSet.size
      ? jaccardSimilarity(p1.procSet, p2.procSet)
      : 0.5;

    // 3. 基础考点重合度
    const kSim = jaccardSimilarity(p1.kSet, p2.kSet);

    let score = 0;
    let matchType = '';
    let condLabel = '';
    let triggerDesc = '';
    const procLabel = (sharedProcs.length ? sharedProcs : p2.procList).slice(0, 3).join(' → ') || '标准法则运算';

    // 情形 A：双方命中相同的【条件性知识（问题情境与解题策略）】
    if (sharedConds.length > 0) {
      // 如果其中一题有其他核心条件（如一题是“日历规律”，另一题只是普通“图形面积”），要求条件高度吻合
      const primaryMatch = p1.condList[0].id === p2.condList[0].id;
      const baseChapterBonus = p1.chapter === p2.chapter ? 0.85 : (p1.chapterPrefix === p2.chapterPrefix ? 0.65 : 0.45);
      score = 0.50 * condSim + 0.35 * procSim + 0.15 * Math.max(kSim, baseChapterBonus);

      if (condSim === 1.0 && (sharedProcs.length >= 1 || kSim >= 0.3)) {
        score = Math.max(score, 0.86 + 0.09 * procSim + 0.05 * kSim);
      } else if (primaryMatch && sharedProcs.length >= 1) {
        score = Math.max(score, 0.82 + 0.10 * procSim + 0.05 * kSim);
      }

      matchType = 'conditional_procedural';
      condLabel = sharedConds.map(c => c.name).join(' · ');
      triggerDesc = sharedConds[0].triggerDesc;
    }
    // 情形 B：一方属于特殊情境策略题（如无关定值、错解还原、新定义、图形割补），另一方只是普通计算题 → 严格隔离，避免误推！
    else if ((p1.condIds.size > 0 && p2.condIds.size === 0) || (p1.condIds.size === 0 && p2.condIds.size > 0)) {
      return null;
    }
    // 情形 C：双方属于不同特殊情境策略 → 不匹配
    else if (p1.condIds.size > 0 && p2.condIds.size > 0 && sharedConds.length === 0) {
      return null;
    }
    // 情形 D：常规标准程序性运算题（双方均无特殊情境陷阱，纯粹比拼【程序性步骤链】+【基础考点】）
    else {
      score = 0.45 * procSim + 0.55 * kSim;
      if (kSim >= 0.80 && procSim >= 0.50) {
        score = Math.max(score, 0.85 + 0.15 * Math.min(procSim, kSim));
      }
      matchType = 'procedural';
      condLabel = '标准法则直算型';
      triggerDesc = `直接识别代数/几何基本结构 → 执行「${procLabel}」`;
    }

    score = Math.min(1.0, score);
    if (score < 0.80) return null;

    return {
      question: q2,
      score,
      similarityPercent: Math.round(score * 100),
      matchType,
      condLabel,
      triggerDesc,
      procLabel,
      sameChapter: p1.chapter === p2.chapter,
      sameSectionGroup: p1.chapterPrefix === p2.chapterPrefix,
      sameType: q1.type === q2.type
    };
  }

  // 获取指定题目的相似题列表（按领域索引高速匹配，默认最多返回 3 道）
  function getSimilarQuestionsFor(questionId, maxCount = 3) {
    if (!questionId || typeof QUESTION_BANK === 'undefined') return [];
    ensureProfilesInitialized();

    if (similarCache.has(questionId)) {
      return similarCache.get(questionId).slice(0, maxCount);
    }

    const p1 = profileMap.get(questionId);
    if (!p1) return [];

    const candidatePool = domainMap.get(p1.domain) || [];
    const targetQ = candidatePool.find(q => q.id === questionId) || QUESTION_BANK.find(q => q.id === questionId);
    if (!targetQ) return [];

    const matches = [];
    for (const candidate of candidatePool) {
      if (candidate.id === questionId) continue;
      // 跳过题干几乎一模一样的意外重复题
      if (candidate.stem && targetQ.stem && candidate.stem.trim() === targetQ.stem.trim()) continue;

      const res = computeCognitiveSimilarity(targetQ, candidate);
      if (res && res.score >= 0.80) {
        matches.push(res);
      }
    }

    // 排序优先级：
    // 1. 认知同构度得分（四舍五入到百分位）
    // 2. 同大章/单元优先（如 16.2 整式乘法内部互推优先）
    // 3. 同小节优先
    // 4. 题型互补与同题型平衡
    matches.sort((a, b) => {
      const scoreDiff = Math.round(b.score * 100) - Math.round(a.score * 100);
      if (scoreDiff !== 0) return scoreDiff;
      if (a.sameSectionGroup !== b.sameSectionGroup) return b.sameSectionGroup ? 1 : -1;
      if (a.sameChapter !== b.sameChapter) return b.sameChapter ? 1 : -1;
      if (a.sameType !== b.sameType) return b.sameType ? 1 : -1;
      return 0;
    });

    similarCache.set(questionId, matches);
    return matches.slice(0, maxCount);
  }

  // 获取单道题的认知策略画像（用于弹窗顶部展示原题的「条件性知识 + 程序性知识」解析）
  function getQuestionCognitiveProfile(questionId) {
    ensureProfilesInitialized();
    const p = profileMap.get(questionId);
    if (!p) return null;
    const hasSpecialCond = p.condList.length > 0;
    return {
      condTitle: hasSpecialCond ? p.condList.map(c => c.name).join(' · ') : '标准法则应用型',
      condTrigger: hasSpecialCond
        ? p.condList[0].triggerDesc
        : `识别标准题型特征 → 直接调用对应法则按步骤求解`,
      procChain: p.procList.join(' → ') || '法则展开 → 化简求解'
    };
  }

  // 暴露全局接口
  window.getSimilarQuestionsFor = getSimilarQuestionsFor;
  window.getQuestionCognitiveProfile = getQuestionCognitiveProfile;
})();
