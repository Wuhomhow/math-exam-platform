// 题典网「共享小节级标准目录」配置与查询服务 (curriculum-catalog.js)
// 首批试点：七年级 第四章 整式的加减 + 八年级 第十五章 轴对称
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
          procedureIds: [],
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
          procedureIds: [],
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
          procedureIds: [],
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

    // Step A: 先注入各小节绑定的 Pxx 题目（包含 featured 和 bank_only）
    pilotChapter.sections.forEach(sec => {
      const itemMap = sectionItemMaps.get(sec.id);
      (sec.procedureIds || []).forEach(pid => {
        if (!procSvc || typeof procSvc.getQuestionCollectionByProcedure !== 'function') return;
        const col = procSvc.getQuestionCollectionByProcedure(pid, { includeBankOnly: true });
        if (!col || !Array.isArray(col.items)) return;
        col.items.forEach(it => {
          const q = it.question || bankById.get(it.questionId);
          if (!q) return;
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
    const validSectionIds = new Set(pilotChapter.sections.map(s => s.id));
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
