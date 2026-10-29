    // Build a unified grade -> semester -> imported-topic navigation from question data.
    function escapeNavText(value) {
      return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    }

    function inferAcademicLocation(chapter) {
      const value = String(chapter || '').trim();
      const legacyGrade7 = /^[123]\./.test(value);
      if (legacyGrade7) {
        return { grade: '初一', semester: '上册', label: value };
      }
      if (/^(13|14|15|16)\./.test(value)) {
        return { grade: '初二', semester: '上册', label: value };
      }

      const m = value.match(/^(初一|初二|初三|高一|高二|高三|七年级|八年级|九年级)\s*(上册|下册)\s*(.*)$/);
      if (m) {
        const gradeMap = { '七年级': '初一', '八年级': '初二', '九年级': '初三' };
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
        '初一': { '上册': 'bg-teal-100 text-teal-800', '下册': 'bg-cyan-100 text-cyan-800' },
        '初二': { '上册': 'bg-indigo-100 text-indigo-800', '下册': 'bg-violet-100 text-violet-800' },
        '初三': { '上册': 'bg-amber-100 text-amber-800', '下册': 'bg-orange-100 text-orange-800' },
        '高一': { '上册': 'bg-rose-100 text-rose-800', '下册': 'bg-pink-100 text-pink-800' },
        '高二': { '上册': 'bg-emerald-100 text-emerald-800', '下册': 'bg-green-100 text-green-800' },
        '高三': { '上册': 'bg-sky-100 text-sky-800', '下册': 'bg-blue-100 text-blue-800' }
      };
      return gradeSemesterColors[grade]?.[semester] || 'bg-slate-100 text-slate-700';
    }

    function buildChapterNavigation() {
      const container = document.getElementById('chapterNavigationTree');
      if (!container) return;

      const gradeOrder = ['初一', '初二', '初三', '高一', '高二', '高三', '其他年级'];
      const semesterOrder = ['上册', '下册', '未分类'];
      const gradeMap = new Map();

      QUESTION_BANK.forEach((question, order) => {
        const chapter = String(question.chapter || '未命名专题');
        const location = inferAcademicLocation(chapter);
        if (!gradeMap.has(location.grade)) gradeMap.set(location.grade, new Map());
        const semesterMap = gradeMap.get(location.grade);
        if (!semesterMap.has(location.semester)) semesterMap.set(location.semester, new Map());
        const chapterMap = semesterMap.get(location.semester);
        if (!chapterMap.has(chapter)) {
          chapterMap.set(chapter, { label: location.label, count: 0, firstOrder: order });
        }
        chapterMap.get(chapter).count++;
      });

      const orderedGrades = [...gradeMap.keys()].sort((a, b) => {
        const ai = gradeOrder.indexOf(a) < 0 ? 999 : gradeOrder.indexOf(a);
        const bi = gradeOrder.indexOf(b) < 0 ? 999 : gradeOrder.indexOf(b);
        return ai - bi || a.localeCompare(b, 'zh-CN');
      });

      container.innerHTML = orderedGrades.map(grade => {
        const semesters = gradeMap.get(grade);
        const gradeTotal = [...semesters.values()].reduce((sum, chapterMap) =>
          sum + [...chapterMap.values()].reduce((acc, chapter) => acc + chapter.count, 0), 0);
        const orderedSemesters = [...semesters.keys()].sort((a, b) => {
          const ai = semesterOrder.indexOf(a) < 0 ? 999 : semesterOrder.indexOf(a);
          const bi = semesterOrder.indexOf(b) < 0 ? 999 : semesterOrder.indexOf(b);
          return ai - bi || a.localeCompare(b, 'zh-CN');
        });

        const semesterHtml = orderedSemesters.map(semester => {
          const chapterMap = semesters.get(semester);
          const chapters = [...chapterMap.entries()].sort((a, b) => a[1].firstOrder - b[1].firstOrder);
          const semesterTotal = chapters.reduce((sum, entry) => sum + entry[1].count, 0);
          const topicsHtml = chapters.map(([chapter, meta]) => `
            <button type="button" class="chapter-tree-btn nav-topic-button" data-chapter="${escapeNavText(chapter)}">
              <span class="nav-topic-label">${escapeNavText(meta.label)}</span>
              <span class="nav-topic-count">${meta.count}</span>
            </button>
          `).join('');
          return `
            <div class="mb-2 last:mb-0">
              <div class="nav-semester-label"><span>${escapeNavText(semester)}</span><span>${semesterTotal} 题</span></div>
              <div class="space-y-1">${topicsHtml}</div>
            </div>
          `;
        }).join('');

        return `
          <details class="nav-grade-card" open>
            <summary><span>${escapeNavText(grade)}</span><span class="text-xs font-semibold text-slate-500">${gradeTotal} 题</span></summary>
            <div class="nav-grade-content">${semesterHtml}</div>
          </details>
        `;
      }).join('');
    }

    // Restore the basket on this browser; keep the built-in selection for first-time visitors.
    const BASKET_STORAGE_KEY = 'mathQuestionBank:selectedIds:v1';
    const ANSWER_SPACE_STORAGE_KEY = 'mathQuestionBank:answerSpaceHeights:v1';
    const LAST_VIEW_STORAGE_KEY = 'mathQuestionBank:lastView:v1';

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
      isDoubleColumn: false,
      quizAnswers: {},
      quizSubmitted: false,
      quizStartTime: null,
      quizTimerInterval: null,
    };
    restoreBasketFromStorage();
    restoreAnswerSpaceHeights();
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
      const questionById = new Map(QUESTION_BANK.map(question => [question.id, question]));
      const index = orderedIds.indexOf(id);
      const movingType = questionById.get(id)?.type;
      if (index < 0 || !movingType) return;
      const sameTypePositions = orderedIds
        .map((questionId, position) => questionById.get(questionId)?.type === movingType ? position : -1)
        .filter(position => position >= 0);
      const typePosition = sameTypePositions.indexOf(index);
      const targetTypePosition = typePosition + offset;
      if (targetTypePosition < 0 || targetTypePosition >= sameTypePositions.length) return;
      const targetIndex = sameTypePositions[targetTypePosition];
      [orderedIds[index], orderedIds[targetIndex]] = [orderedIds[targetIndex], orderedIds[index]];
      state.selectedIds = new Set(orderedIds);
      updateStats();
      renderBasketDrawer();
      renderQuestionList();
      if (state.currentView === 'paper') renderPaper();
    }

    // Helper: Toast notification
