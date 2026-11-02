    // Build a unified grade -> semester -> imported-topic navigation from question data.
    function escapeNavText(value) {
      return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    }

    function inferAcademicLocation(chapter) {
      const value = String(chapter || '').trim();
      const legacyGrade7 = /^[123456]\./.test(value) || /第[一二三四五六]章/.test(value);
      if (legacyGrade7) {
        return { grade: '初一', semester: '上册', label: value };
      }
      if (/^(13|14|15|16)\./.test(value)) {
        return { grade: '初二', semester: '上册', label: value };
      }
      if (/^25\./.test(value)) {
        return { grade: '初三', semester: '上册', label: value };
      }

      const m = value.match(/^(六年级|小学六年级|初一|初二|初三|高一|高二|高三|七年级|八年级|九年级)\s*(上册|下册)\s*(.*)$/);
      if (m) {
        const gradeMap = { '小学六年级': '六年级', '七年级': '初一', '八年级': '初二', '九年级': '初三' };
        return {
          grade: gradeMap[m[1]] || m[1],
          semester: m[2],
          label: (m[3] || value).trim()
        };
      }

      // Keep any future imported topic visible instead of silently dropping it.
      return { grade: '其他年级', semester: '未分类', label: value || '未命名专题' };
    }

    function getGradeSemesterTagClass(chapter) {
      const { grade, semester } = inferAcademicLocation(chapter);
      const gradeSemesterColors = {
        '六年级': { '上册': 'bg-orange-100 text-orange-800', '下册': 'bg-amber-100 text-amber-800' },
        '初一': { '上册': 'bg-teal-100 text-teal-800', '下册': 'bg-cyan-100 text-cyan-800' },
        '初二': { '上册': 'bg-indigo-100 text-indigo-800', '下册': 'bg-violet-100 text-violet-800' },
        '初三': { '上册': 'bg-amber-100 text-amber-800', '下册': 'bg-orange-100 text-orange-800' },
        '高一': { '上册': 'bg-rose-100 text-rose-800', '下册': 'bg-pink-100 text-pink-800' },
        '高二': { '上册': 'bg-emerald-100 text-emerald-800', '下册': 'bg-green-100 text-green-800' },
        '高三': { '上册': 'bg-sky-100 text-sky-800', '下册': 'bg-blue-100 text-blue-800' }
      };
      return gradeSemesterColors[grade]?.[semester] || 'bg-slate-100 text-slate-700';
    }

    function getChapterDisplayLabel(chapter) {
      const loc = inferAcademicLocation(chapter);
      return loc?.label || chapter;
    }

    const FINISHED_PAPER_CHAPTERS = new Set([
      // 初一成品卷
      '2.3.1 有理数的加法',
      '2.3.2 有理数的减法',
      '2.3.2 科学记数法',
      '第二章单元测试',
      // 初二成品卷
      '13.1三角形单元测试卷',
      '14.2全等三角形性质',
      '14.3三角形全等的判定（SAS）',
      '14.4三角形全等的判定（ASA）',
      '14.5三角形全等的判定（AAS）',
      '14.6三角形全等的判定（SSS）',
      '14.7 角平分线',
      '15.8等边对等角',
      '15.9三线合一'
    ]);

    function isFinishedPaperChapter(chapter) {
      return FINISHED_PAPER_CHAPTERS.has(String(chapter || '').trim());
    }

    // 自定义成品试卷配置（原题库索引模式：零重复题目、保留原知识点）
    window.CUSTOM_FINISHED_PAPERS = [
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
      if (grade === '初一') {
        if (ch.startsWith('2.') || ch.includes('第二章')) return '第二章 有理数的运算';
        if (ch.startsWith('3.') || ch.includes('第三章')) return '第三章 代数式';
        if (ch.startsWith('4.') || ch.includes('第四章')) return '第四章 整式的加减法';
      } else if (grade === '初二') {
        if (ch.startsWith('15.') || ch.includes('第十五')) return '第15章 等腰三角形';
        if (ch.startsWith('16.') || ch.includes('第十六')) return '第16章 幂的运算';
      } else if (grade === '初三') {
        if (ch.startsWith('25.') || ch.includes('第二十五')) return '第25章 一元二次方程';
      }
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
              standalone: new Map()
            });
          }
          const semEntry = gradeEntry.semesters.get(location.semester);
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
              ${allFinishedList.map(([chapter, meta]) => `
                <button type="button" class="chapter-tree-btn nav-topic-button" data-chapter="${escapeNavText(chapter)}">
                  <span class="nav-topic-label">${escapeNavText(meta.label)}</span>
                  <span class="nav-topic-count">${meta.count}</span>
                </button>
              `).join('')}
            </div>
          </details>
        ` : '';

        const orderedSemesters = [...semesters.keys()].sort((a, b) => {
          const ai = semesterOrder.indexOf(a) < 0 ? 999 : semesterOrder.indexOf(a);
          const bi = semesterOrder.indexOf(b) < 0 ? 999 : semesterOrder.indexOf(b);
          return ai - bi || a.localeCompare(b, 'zh-CN');
        });

        const semesterHtml = orderedSemesters.map(semester => {
          const semEntry = semesters.get(semester);
          const groupList = [...semEntry.groups.entries()].sort((a, b) => a[1].firstOrder - b[1].firstOrder);
          const standaloneList = [...semEntry.standalone.entries()].sort((a, b) => a[1].firstOrder - b[1].firstOrder);

          let semesterTotal = 0;
          for (const [, grp] of groupList) {
            for (const [, c] of grp.chapters) semesterTotal += c.count;
          }
          for (const [, c] of standaloneList) semesterTotal += c.count;

          const groupsHtml = groupList.map(([grpTitle, grpInfo]) => {
            const chapList = [...grpInfo.chapters.entries()].sort((a, b) => a[1].firstOrder - b[1].firstOrder);
            const grpTotal = chapList.reduce((acc, entry) => acc + entry[1].count, 0);
            return `
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
          }).join('');

          const standaloneHtml = standaloneList.map(([chapter, meta]) => `
            <button type="button" class="chapter-tree-btn nav-topic-button" data-chapter="${escapeNavText(chapter)}">
              <span class="nav-topic-label">${escapeNavText(meta.label)}</span>
              <span class="nav-topic-count">${meta.count}</span>
            </button>
          `).join('');

          return `
            <div class="mb-2 last:mb-0">
              <div class="nav-semester-label"><span>${escapeNavText(semester)}</span><span>${semesterTotal} 题</span></div>
              ${groupsHtml}
              ${standaloneHtml ? `<div class="space-y-1">${standaloneHtml}</div>` : ''}
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
    const BASKET_STORAGE_KEY = 'mathQuestionBank:selectedIds:v1';
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
        'add_1', 'add_2', 'add_5', 'add_6', 'add_20', 'add_4', 'add_22', 'add_10', 'add_45',
        'sub_48', 'sub_49', 'sub_60', 'sub_64', 'sub_72', 'sub_47', 'sub_54', 'sub_58', 'sub_92',
        'exp_1', 'exp_6', 'exp_8', 'exp_15'
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
