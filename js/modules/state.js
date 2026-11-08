    // Build a unified grade -> semester -> imported-topic navigation from question data.
    function escapeNavText(value) {
      return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    }

    function inferAcademicLocation(chapter) {
      const value = String(chapter || '').trim();

      const m = value.match(/^(六年级|小学六年级|初一|初二|初三|高一|高二|高三|七年级|八年级|九年级)\s*(上册|下册)?\s*(.*)$/);
      if (m) {
        const gradeMap = { '小学六年级': '六年级', '七年级': '初一', '八年级': '初二', '九年级': '初三' };
        return {
          grade: gradeMap[m[1]] || m[1],
          semester: m[2] || '上册',
          label: (m[3] || value).trim()
        };
      }

      if (/^(13|14|15|16|17|18)\./.test(value) || /^第十[三四五六七八]章/.test(value)) {
        return { grade: '初二', semester: '上册', label: value };
      }
      if (/^(25|26|27)\./.test(value) || /^第二十[五六七]章/.test(value)) {
        return { grade: '初三', semester: '上册', label: value };
      }

      const legacyGrade7 = /^[123456]\./.test(value) || /^第[一二三四五六]章/.test(value);
      if (legacyGrade7) {
        return { grade: '初一', semester: '上册', label: value };
      }

      // Keep any future imported topic visible instead of silently dropping it.
      return { grade: '其他年级', semester: '未分类', label: value || '未命名专题' };
    }

    function getGradeSemesterTagClass(chapter) {
      const { grade, semester } = inferAcademicLocation(chapter);
      const gradeSemesterColors = {
        '六年级': { '上册': 'bg-orange-50 text-orange-800 border border-orange-200', '下册': 'bg-amber-50 text-amber-800 border border-amber-200' },
        '初一': { '上册': 'bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1]', '下册': 'bg-teal-50 text-teal-800 border border-teal-200' },
        '初二': { '上册': 'bg-slate-100 text-slate-700 border border-slate-200', '下册': 'bg-slate-100 text-slate-700 border border-slate-200' },
        '初三': { '上册': 'bg-amber-50 text-amber-800 border border-amber-200', '下册': 'bg-orange-50 text-orange-800 border border-orange-200' },
        '高一': { '上册': 'bg-rose-50 text-rose-800 border border-rose-200', '下册': 'bg-pink-50 text-pink-800 border border-pink-200' },
        '高二': { '上册': 'bg-emerald-50 text-emerald-800 border border-emerald-200', '下册': 'bg-green-50 text-green-800 border border-green-200' },
        '高三': { '上册': 'bg-teal-50 text-teal-800 border border-teal-200', '下册': 'bg-teal-50 text-teal-800 border border-teal-200' }
      };
      return gradeSemesterColors[grade]?.[semester] || 'bg-slate-100 text-slate-700 border border-slate-200';
    }

    function getChapterDisplayLabel(chapter) {
      const loc = inferAcademicLocation(chapter);
      return loc?.label || chapter;
    }

    const FINISHED_PAPER_CHAPTERS = new Set([
      // 六年级成品卷
      '六年级上册 第一章 确定位置单元测试（A卷）',
      '六年级上册 第一章 确定位置单元测试（B卷）',
      // 初一成品卷
      '2.3.1 有理数的加法',
      '2.3.2 有理数的减法',
      '2.3.2 科学记数法',
      '第二章单元测试',
      '初一上册 广东珠海市文园中学2026-2027学年七年级上学期11月期中数学试题',
      // 初二成品卷
      '13.1三角形单元测试卷',
      '14.2全等三角形性质',
      '14.3三角形全等的判定（SAS）',
      '14.4三角形全等的判定（ASA）',
      '14.5三角形全等的判定（AAS）',
      '14.6三角形全等的判定（SSS）',
      '14.7 角平分线',
      '15.8等边对等角',
      '15.9三线合一',
      '初二上册 广东珠海市文园中学2026-2027学年上学期 八年级数学期中试卷',
      '初二上册 成品卷：将军饮马',
      // 初三成品卷
      '初三上册 广东珠海市文园中学2026-2027学年九年级上学期数学期中试卷'
    ]);

    function isFinishedPaperChapter(chapter) {
      return FINISHED_PAPER_CHAPTERS.has(String(chapter || '').trim());
    }

    // 自定义成品试卷配置（原题库索引模式：零重复题目、保留原知识点）
    window.CUSTOM_FINISHED_PAPERS = [
      {
        id: 'algebra_part1_foundation_paper',
        title: '初一代数式前半部分（基础与巩固·34题）',
        grade: '初一',
        semester: '上册',
        questionIds: [
          'ch3_1_1_1', 'ch3_1_1_2', 'ch3_1_1_12', 'ch3_1_1_13',
          'ch3_1_2_1', 'ch3_1_2_2', 'ch3_1_2_6', 'ch3_1_3_3', 'ch3_1_3_4', 'ch3_2_1_1',
          'alg_oct30_20', 'ch3_1_3_10', 'ch3_2_1_5', 'alg_oct30_10',
          'ch3_1_1_4', 'ch3_1_2_11', 'ch3_1_2_12', 'ch3_1_3_1', 'ch3_1_3_2', 'ch3_2_1_7', 'ch3_2_1_8',
          'alg_oct30_9', 'ch3_1_2_20', 'alg_oct30_24',
          'ch3_1_1_18', 'ch3_1_1_20', 'alg_oct30_7', 'alg_oct30_13', 'g7_2_9',
          'ch3_1_2_16', 'alg_oct30_17', 'op_oct30_13', 'ch3_2_1_14', 'alg_oct30_11'
        ]
      },
      {
        id: 'algebra_part1_paper',
        title: '初一代数式前半部分（中等与中上强化·34题）',
        grade: '初一',
        semester: '上册',
        questionIds: [
          'alg_oct30_9', 'alg_oct30_20', 'ch3_1_2_16', 'ch3_1_2_17', 'ch3_1_2_20',
          'ch3_1_2_21', 'ch3_1_2_23', 'alg_oct30_6', 'alg_oct30_15', 'alg_oct30_17',
          'alg_oct30_21', 'alg_oct30_24', 'alg_oct30_27', 'alg_oct30_30', 'alg_oct30_32',
          'ch3_1_3_10', 'ch3_1_3_15', 'op_oct30_13', 'alg_oct30_5', 'ch3_2_1_5',
          'ch3_2_1_6', 'ch3_2_1_14', 'ch3_2_1_15', 'op_oct30_21', 'op_oct30_26',
          'alg_oct30_1', 'alg_oct30_10', 'alg_oct30_11', 'alg_oct30_14', 'alg_oct30_16',
          'alg_oct30_22', 'alg_oct30_31', 'alg_oct30_34', 'g7_2_40'
        ]
      },
      {
        id: 'div_pow_paper',
        title: '有理数除法和乘方',
        grade: '初一',
        semester: '上册',
        questionIds: [
          'div_2', 'div_3', 'div_4', 'div_8', 'div_10', 'div_11',
          'op_oct30_3', 'op_oct30_34', 'op_oct30_43',
          'exp_1', 'exp_2', 'exp_3', 'exp_4', 'exp_8', 'exp_10', 'exp_13', 'exp_14',
          'op_oct30_28', 'op_oct30_29',
          'mix_2', 'mix_6', 'mix_9', 'mix_11', 'mix_12', 'mix_13', 'mix_14',
          'op_oct30_10', 'op_oct30_17', 'op_oct30_22', 'op_oct30_50'
        ]
      }
    ];

    function getCustomPaperById(id) {
      return (window.CUSTOM_FINISHED_PAPERS || []).find(p => p.id === id);
    }

    function getChapterGroup(grade, chapter) {
      const ch = String(chapter || '').trim();
      if (grade === '六年级') {
        const loc = inferAcademicLocation(ch);
        const label = String(loc.label || ch).trim();
        if (
          label.includes('圆') ||
          (label.includes('扇形') && !label.includes('统计图')) ||
          label.startsWith('4.') ||
          label.includes('第四章')
        ) {
          return '第四章 圆';
        }
        if (
          label.startsWith('7.') ||
          label.includes('第七章') ||
          label.includes('负数')
        ) {
          return '第七章 生活中的负数';
        }
      } else if (grade === '初一') {
        if (ch.startsWith('2.') || ch.includes('第二章')) return '第二章 有理数的运算';
        if (ch.startsWith('3.') || ch.includes('第三章')) return '第三章 代数式';
        if (ch.startsWith('4.') || ch.includes('第四章')) return '第四章 整式的加减法';
        if (ch.startsWith('5.') || ch.includes('第五章')) return '第五章 一元一次方程';
      } else if (grade === '初二') {
        if (ch.startsWith('15.') || ch.includes('第十五')) return '第15章 等腰三角形';
        if (ch.startsWith('16.') || ch.includes('第十六')) return '第16章 幂的运算';
        if (ch.startsWith('17.') || ch.includes('第十七')) return '第17章 因式分解';
        if (ch.startsWith('18.') || ch.includes('第十八')) return '第18章 分式';
      } else if (grade === '初三') {
        if (ch.startsWith('25.') || ch.includes('第二十五')) return '第25章 一元二次方程';
        if (ch.startsWith('26.') || ch.includes('第二十六')) return '第26章 二次函数';
        if (ch.startsWith('27.') || ch.includes('第二十七')) return '第27章 反比例函数';
      }
      return null;
    }

    function getChapterParent(grade, chapter) {
      return null;
    }

    function buildChapterNavigation() {
      const container = document.getElementById('chapterNavigationTree');
      if (!container) return;

      const gradeOrder = ['六年级', '初一', '初二', '初三', '高一', '高二', '高三', '其他年级'];
      const semesterOrder = ['上册', '下册', '未分类'];
      const gradeMap = new Map();

      QUESTION_BANK.forEach((question, order) => {
        const chapter = String(question.chapter || '未命名专题');
        const location = inferAcademicLocation(chapter);
        if (!gradeMap.has(location.grade)) {
          gradeMap.set(location.grade, {
            finishedPapers: new Map(),
            semesters: new Map()
          });
        }
        const gradeEntry = gradeMap.get(location.grade);
        if (isFinishedPaperChapter(chapter)) {
          if (!gradeEntry.finishedPapers.has(chapter)) {
            gradeEntry.finishedPapers.set(chapter, { label: location.label, count: 0, firstOrder: order });
          }
          gradeEntry.finishedPapers.get(chapter).count++;
        } else {
          if (!gradeEntry.semesters.has(location.semester)) {
            gradeEntry.semesters.set(location.semester, {
              groups: new Map(),
              standalone: new Map(),
              children: new Map()
            });
          }
          const semEntry = gradeEntry.semesters.get(location.semester);
          const parentChapter = getChapterParent(location.grade, chapter);
          if (parentChapter) {
            if (!semEntry.children.has(parentChapter)) semEntry.children.set(parentChapter, new Map());
            const childMap = semEntry.children.get(parentChapter);
            if (!childMap.has(chapter)) {
              childMap.set(chapter, { label: location.label, count: 0, firstOrder: order });
            }
            childMap.get(chapter).count++;
          } else {
            const grp = getChapterGroup(location.grade, chapter);
            if (grp) {
              if (!semEntry.groups.has(grp)) {
                semEntry.groups.set(grp, { chapters: new Map(), firstOrder: order });
              }
              const grpInfo = semEntry.groups.get(grp);
              if (!grpInfo.chapters.has(chapter)) {
                grpInfo.chapters.set(chapter, { label: location.label, count: 0, firstOrder: order });
              }
              grpInfo.chapters.get(chapter).count++;
            } else {
              if (!semEntry.standalone.has(chapter)) {
                semEntry.standalone.set(chapter, { label: location.label, count: 0, firstOrder: order });
              }
              semEntry.standalone.get(chapter).count++;
            }
          }
        }
      });

      const orderedGrades = [...gradeMap.keys()].sort((a, b) => {
        const ai = gradeOrder.indexOf(a) < 0 ? 999 : gradeOrder.indexOf(a);
        const bi = gradeOrder.indexOf(b) < 0 ? 999 : gradeOrder.indexOf(b);
        return ai - bi || a.localeCompare(b, 'zh-CN');
      });

      container.innerHTML = orderedGrades.map(grade => {
        const { finishedPapers, semesters } = gradeMap.get(grade);
        const finishedList = [...finishedPapers.entries()].sort((a, b) => a[1].firstOrder - b[1].firstOrder);

        // Custom finished papers for this grade
        const gradeCustomPapers = (window.CUSTOM_FINISHED_PAPERS || []).filter(p => p.grade === grade);
        const customPapersList = gradeCustomPapers.map(p => [
          `custom:${p.id}`,
          { label: p.title, count: p.questionIds.length }
        ]);

        const allFinishedList = [...customPapersList, ...finishedList];
        const finishedTotal = allFinishedList.reduce((sum, entry) => sum + entry[1].count, 0);

        let regularTotal = 0;
        for (const [, semEntry] of semesters) {
          for (const [, grp] of semEntry.groups) {
            for (const [, c] of grp.chapters) regularTotal += c.count;
          }
          for (const [, c] of semEntry.standalone) regularTotal += c.count;
          for (const [, childMap] of semEntry.children) {
            for (const [, c] of childMap) regularTotal += c.count;
          }
        }
        const gradeTotal = finishedTotal + regularTotal;

        const finishedHtml = allFinishedList.length > 0 ? `
          <details class="nav-finished-paper-card mb-2.5">
            <summary>
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-teal-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <span>成品试卷</span>
              </span>
              <span class="nav-finished-badge">${allFinishedList.length} 卷 · ${finishedTotal} 题</span>
            </summary>
            <div class="nav-finished-paper-content space-y-1">
              ${allFinishedList.map(([chapter, meta], idx) => {
                const cleanLabel = meta.label.replace(/^[0-9.]+\s*/, '').trim();
                const displayTitle = `${idx + 1}. ${cleanLabel}`;
                return `
                <button type="button" class="chapter-tree-btn nav-topic-button" data-chapter="${escapeNavText(chapter)}">
                  <span class="nav-topic-label">${escapeNavText(displayTitle)}</span>
                  <span class="nav-topic-count">${meta.count}</span>
                </button>
              `;}).join('')}
            </div>
          </details>
        ` : '';

        const orderedSemesters = [...semesters.keys()].sort((a, b) => {
          const ai = semesterOrder.indexOf(a) < 0 ? 999 : semesterOrder.indexOf(a);
          const bi = semesterOrder.indexOf(b) < 0 ? 999 : semesterOrder.indexOf(b);
          return ai - bi || a.localeCompare(b, 'zh-CN');
        });

        function getChapterSortKey(str) {
          const s = String(str || '').trim();
          const numM = s.match(/^(\d+)(?:\.(\d+))?/);
          if (numM) {
            return parseInt(numM[1], 10) * 100 + (numM[2] ? parseInt(numM[2], 10) : 0);
          }
          const cnNums = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 };
          const cnM = s.match(/^第([一二三四五六七八九十0-9]+)章/);
          if (cnM) {
            const raw = cnM[1];
            if (/^\d+$/.test(raw)) return parseInt(raw, 10) * 100;
            if (raw.startsWith('十')) {
              const unit = cnNums[raw.slice(1)] || 0;
              return (10 + unit) * 100;
            }
            if (raw.includes('十')) {
              const parts = raw.split('十');
              const tens = cnNums[parts[0]] || 1;
              const unit = cnNums[parts[1]] || 0;
              return (tens * 10 + unit) * 100;
            }
            return (cnNums[raw] || 99) * 100;
          }
          return 9999;
        }

        const semesterHtml = orderedSemesters.map(semester => {
          const semEntry = semesters.get(semester);

          let semesterTotal = 0;
          for (const [, grp] of semEntry.groups) {
            for (const [, c] of grp.chapters) semesterTotal += c.count;
          }
          for (const [, c] of semEntry.standalone) semesterTotal += c.count;
          for (const [, childMap] of semEntry.children) {
            for (const [, c] of childMap) semesterTotal += c.count;
          }

          const items = [];

          for (const [grpTitle, grpInfo] of semEntry.groups) {
            const chapList = [...grpInfo.chapters.entries()].sort((a, b) => a[0].localeCompare(b[0], 'zh-CN', { numeric: true }));
            const grpTotal = chapList.reduce((acc, entry) => acc + entry[1].count, 0);
            const html = `
              <details class="nav-chapter-group-card mb-2">
                <summary>
                  <span>${escapeNavText(grpTitle)}</span>
                  <span class="nav-chapter-group-badge">${chapList.length} 节 · ${grpTotal} 题</span>
                </summary>
                <div class="nav-chapter-group-content space-y-1">
                  ${chapList.map(([chapter, meta]) => `
                    <button type="button" class="chapter-tree-btn nav-topic-button" data-chapter="${escapeNavText(chapter)}">
                      <span class="nav-topic-label">${escapeNavText(meta.label)}</span>
                      <span class="nav-topic-count">${meta.count}</span>
                    </button>
                  `).join('')}
                </div>
              </details>
            `;
            items.push({
              sortKey: getChapterSortKey(grpTitle),
              firstOrder: grpInfo.firstOrder,
              html: html
            });
          }

          for (const [chapter, meta] of semEntry.standalone) {
            const childMap = semEntry.children.get(chapter);
            const childList = childMap
              ? [...childMap.entries()].sort((a, b) => a[1].firstOrder - b[1].firstOrder)
              : [];
            const childrenHtml = childList.length ? `
              <div class="nav-topic-children">
                ${childList.map(([childChapter, childMeta]) => `
                  <button type="button" class="chapter-tree-btn nav-topic-button nav-topic-child-button" data-chapter="${escapeNavText(childChapter)}">
                    <span class="nav-topic-label">${escapeNavText(childMeta.label)}</span>
                    <span class="nav-topic-count">${childMeta.count}</span>
                  </button>
                `).join('')}
              </div>
            ` : '';
            const html = `
              <div class="nav-topic-parent-block mb-1">
                <button type="button" class="chapter-tree-btn nav-topic-button" data-chapter="${escapeNavText(chapter)}">
                  <span class="nav-topic-label">${escapeNavText(meta.label)}</span>
                  <span class="nav-topic-count">${meta.count}</span>
                </button>
                ${childrenHtml}
              </div>
            `;
            items.push({
              sortKey: getChapterSortKey(meta.label || chapter),
              firstOrder: meta.firstOrder,
              html: html
            });
          }

          items.sort((a, b) => {
            if (a.sortKey !== 9999 || b.sortKey !== 9999) {
              if (a.sortKey !== b.sortKey) return a.sortKey - b.sortKey;
            }
            return a.firstOrder - b.firstOrder;
          });

          return `
            <div class="mb-2 last:mb-0">
              <div class="nav-semester-label"><span>${escapeNavText(semester)}</span><span>${semesterTotal} 题</span></div>
              <div class="space-y-1">${items.map(it => it.html).join('')}</div>
            </div>
          `;
        }).join('');

        return `
          <details class="nav-grade-card" open>
            <summary><span>${escapeNavText(grade)}</span><span class="text-xs font-semibold text-slate-500">${gradeTotal} 题</span></summary>
            <div class="nav-grade-content">${finishedHtml}${semesterHtml}</div>
          </details>
        `;
      }).join('');
    }

    // Restore the basket on this browser; keep the built-in selection for first-time visitors.
    const BASKET_STORAGE_KEY = 'mathQuestionBank:selectedIds:v3';
    const ANSWER_SPACE_STORAGE_KEY = 'mathQuestionBank:answerSpaceHeights:v1';
    const LAST_VIEW_STORAGE_KEY = 'mathQuestionBank:lastView:v1';
    const UI_PREFS_STORAGE_KEY = 'mathQuestionBank:uiPreferences:v2';

    function saveUiPreferences() {
      try {
        const prefs = {
          currentView: state.currentView,
          chapterFilter: state.chapterFilter,
          typeFilter: state.typeFilter,
          diffFilter: state.diffFilter,
          searchKeyword: state.searchKeyword || '',
          currentPage: state.currentPage || 1,
          paperViewMode: state.paperViewMode,
          paperOrderMode: state.paperOrderMode || 'added',
          isDoubleColumn: Boolean(state.isDoubleColumn),
          scrollY: Math.round(window.scrollY || 0)
        };
        localStorage.setItem(UI_PREFS_STORAGE_KEY, JSON.stringify(prefs));
        localStorage.setItem(LAST_VIEW_STORAGE_KEY, state.currentView);
      } catch (error) {
        // Continue if storage is restricted
      }
    }

    function restoreUiPreferences() {
      try {
        const saved = localStorage.getItem(UI_PREFS_STORAGE_KEY);
        if (!saved) return;
        const p = JSON.parse(saved);
        if (!p || typeof p !== 'object') return;
        if (p.currentView === 'bank' || p.currentView === 'paper') state.currentView = p.currentView;
        if (typeof p.chapterFilter === 'string') state.chapterFilter = p.chapterFilter;
        if (typeof p.typeFilter === 'string') state.typeFilter = p.typeFilter;
        if (typeof p.diffFilter === 'string') state.diffFilter = p.diffFilter;
        if (typeof p.searchKeyword === 'string') state.searchKeyword = p.searchKeyword;
        if (Number.isInteger(p.currentPage) && p.currentPage >= 1) state.currentPage = p.currentPage;
        if (p.paperViewMode === 'student' || p.paperViewMode === 'teacher') state.paperViewMode = p.paperViewMode;
        if (p.paperOrderMode === 'added' || p.paperOrderMode === 'type') state.paperOrderMode = p.paperOrderMode;
        if (typeof p.isDoubleColumn === 'boolean') state.isDoubleColumn = p.isDoubleColumn;
        if (Number.isFinite(p.scrollY)) state.savedScrollY = Math.max(0, p.scrollY);
      } catch (error) {
        // Keep defaults if storage read fails
      }
    }

    function restoreBasketFromStorage() {
      try {
        const saved = localStorage.getItem(BASKET_STORAGE_KEY);
        if (saved === null) return;
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) return;
        const validIds = new Set(QUESTION_BANK.map(question => question.id));
        state.selectedIds = new Set(parsed.filter(id => typeof id === 'string' && validIds.has(id)));
      } catch (error) {
        // Storage can be unavailable for local files or private browsing; keep the in-memory basket.
      }
    }

    function saveBasketToStorage() {
      try {
        localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify([...state.selectedIds]));
      } catch (error) {
        // The basket remains usable for this session if browser storage is blocked or full.
      }
    }

    function restoreAnswerSpaceHeights() {
      try {
        const saved = localStorage.getItem(ANSWER_SPACE_STORAGE_KEY);
        if (saved === null) return;
        const parsed = JSON.parse(saved);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return;
        state.answerSpaceHeights = Object.fromEntries(
          Object.entries(parsed).filter(([, height]) => Number.isFinite(height) && height >= 56 && height <= 600)
        );
      } catch (error) {
        // Keep default answer-space sizes if browser storage is unavailable.
      }
    }

    function saveAnswerSpaceHeights() {
      try {
        localStorage.setItem(ANSWER_SPACE_STORAGE_KEY, JSON.stringify(state.answerSpaceHeights));
      } catch (error) {
        // Resizing remains available for the current page if storage is blocked or full.
      }
    }

    // Application State
    const state = {
      currentView: 'bank', // 'bank' | 'paper' | 'quiz'
      selectedIds: new Set([
        'ch3_1_1_1', 'ch3_1_1_2', 'ch3_1_1_12', 'ch3_1_1_13',
        'ch3_1_2_1', 'ch3_1_2_2', 'ch3_1_2_6', 'ch3_1_3_3', 'ch3_1_3_4', 'ch3_2_1_1',
        'alg_oct30_20', 'ch3_1_3_10', 'ch3_2_1_5', 'alg_oct30_10',
        'ch3_1_1_4', 'ch3_1_2_11', 'ch3_1_2_12', 'ch3_1_3_1', 'ch3_1_3_2', 'ch3_2_1_7', 'ch3_2_1_8',
        'alg_oct30_9', 'ch3_1_2_20', 'alg_oct30_24',
        'ch3_1_1_18', 'ch3_1_1_20', 'alg_oct30_7', 'alg_oct30_13', 'g7_2_9',
        'ch3_1_2_16', 'alg_oct30_17', 'op_oct30_13', 'ch3_2_1_14', 'alg_oct30_11'
      ]),
      answerSpaceHeights: {},
      chapterFilter: 'all',
      typeFilter: 'all',
      diffFilter: 'all',
      searchKeyword: '',
      paperViewMode: 'student', // 'student' | 'teacher'
      paperOrderMode: 'added', // 'added' | 'type'
      isDoubleColumn: false,
      currentPage: 1,
      pageSize: 15,
      quizAnswers: {},
      quizSubmitted: false,
      quizStartTime: null,
      quizTimerInterval: null,
    };
    restoreBasketFromStorage();
    restoreAnswerSpaceHeights();
    restoreUiPreferences();
    try {
      const lastView = localStorage.getItem(LAST_VIEW_STORAGE_KEY);
      if (lastView === 'bank' || lastView === 'paper') state.currentView = lastView;
    } catch (error) {
      // Open the default question bank when browser storage is unavailable.
    }

    function getSelectedQuestions() {
      const byId = new Map(QUESTION_BANK.map(question => [question.id, question]));
      return [...state.selectedIds].map(id => byId.get(id)).filter(Boolean);
    }

    function moveSelectedQuestion(id, offset) {
      const orderedIds = [...state.selectedIds];
      const index = orderedIds.indexOf(id);
      if (index < 0) return;
      let targetIndex = -1;
      if (state.paperOrderMode === 'added') {
        targetIndex = index + offset;
        if (targetIndex < 0 || targetIndex >= orderedIds.length) return;
      } else {
        const questionById = new Map(QUESTION_BANK.map(question => [question.id, question]));
        const movingType = questionById.get(id)?.type;
        if (!movingType) return;
        const sameTypePositions = orderedIds
          .map((questionId, position) => questionById.get(questionId)?.type === movingType ? position : -1)
          .filter(position => position >= 0);
        const typePosition = sameTypePositions.indexOf(index);
        const targetTypePosition = typePosition + offset;
        if (targetTypePosition < 0 || targetTypePosition >= sameTypePositions.length) return;
        targetIndex = sameTypePositions[targetTypePosition];
      }
      [orderedIds[index], orderedIds[targetIndex]] = [orderedIds[targetIndex], orderedIds[index]];
      state.selectedIds = new Set(orderedIds);
      updateStats();
      renderBasketDrawer();
      renderQuestionList();
      if (state.currentView === 'paper') renderPaper();
    }

    // Helper: Toast notification
