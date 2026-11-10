// 题典网「题目图谱」全局状态、搜索与多维筛选模块 (graph-filter.js)
(function () {
  const GRAPH_STATE_KEY = 'mathQuestionBank:graphState:v1';

  const GraphState = {
    viewMode: 'tree',         // 'tree' | 'network'
    userRoleMode: 'teacher',  // 'teacher' | 'student'
    selectedNodeId: 'kp_g9_qf_graph_prop',
    expandedIds: new Set(['domain_algebra', 'domain_geometry', 'domain_stats', 'domain_synthesis']),
    searchQuery: '',
    gradeFilter: 'all',       // 'all' | '六年级' | '七年级' | '八年级' | '九年级'
    semesterFilter: 'all',    // 'all' | '上册' | '下册'
    domainFilter: 'all',      // 'all' | '数与代数' | '图形与几何' | '统计与概率' | '综合与实践'
    onlyReviewedQuestions: false,
    networkHopDepth: 1,       // 1 = direct neighbors, 2 = extended 2-hop neighbors
    activeRelationEdge: null, // { source, target, relation, description }
    // Detail panel question filters
    qTypeFilter: 'all',       // 'all' | 'choice' | 'blank' | 'calc'
    qDiffFilter: 'all',       // 'all' | '容易' | '较易' | '中等' | '较难'
    qRoleFilter: 'all',       // 'all' | 'primary' | 'secondary' | 'comprehensive'
    qPage: 1,
    qPageSize: 8,

    loadPersisted() {
      try {
        const raw = localStorage.getItem(GRAPH_STATE_KEY);
        if (!raw) return;
        const p = JSON.parse(raw);
        if (!p || typeof p !== 'object') return;
        if (p.viewMode === 'tree' || p.viewMode === 'network') this.viewMode = p.viewMode;
        if (p.userRoleMode === 'teacher' || p.userRoleMode === 'student') this.userRoleMode = p.userRoleMode;
        if (typeof p.selectedNodeId === 'string' && window.GraphData?.getNode(p.selectedNodeId)) {
          this.selectedNodeId = p.selectedNodeId;
        }
        if (Array.isArray(p.expandedIds)) {
          this.expandedIds = new Set(p.expandedIds);
        }
        if (typeof p.gradeFilter === 'string') this.gradeFilter = p.gradeFilter;
        if (typeof p.semesterFilter === 'string') this.semesterFilter = p.semesterFilter;
        if (typeof p.domainFilter === 'string') this.domainFilter = p.domainFilter;
        if (typeof p.onlyReviewedQuestions === 'boolean') this.onlyReviewedQuestions = p.onlyReviewedQuestions;
      } catch (_) {}
    },

    savePersisted() {
      try {
        const payload = {
          viewMode: this.viewMode,
          userRoleMode: this.userRoleMode,
          selectedNodeId: this.selectedNodeId,
          expandedIds: Array.from(this.expandedIds),
          gradeFilter: this.gradeFilter,
          semesterFilter: this.semesterFilter,
          domainFilter: this.domainFilter,
          onlyReviewedQuestions: this.onlyReviewedQuestions
        };
        localStorage.setItem(GRAPH_STATE_KEY, JSON.stringify(payload));
      } catch (_) {}
    }
  };

  const GraphFilter = {
    init() {
      if (window.GraphData) window.GraphData.init();
      GraphState.loadPersisted();
      // Ensure selectedNodeId and its ancestors are expanded
      if (GraphState.selectedNodeId) {
        const ancestors = window.GraphData.getAncestors(GraphState.selectedNodeId);
        ancestors.forEach(a => GraphState.expandedIds.add(a.id));
      }
      this.bindFilterEvents();
      this.syncToolbarUi();
    },

    // Check if a single node matches current filter criteria (or if any of its descendants match)
    nodeMatchesLeafCriteria(node) {
      if (!node) return false;

      // 1. Grade filter
      if (GraphState.gradeFilter !== 'all') {
        const grades = Array.isArray(node.grade) ? node.grade : [];
        if (!grades.includes(GraphState.gradeFilter)) return false;
      }

      // 2. Semester filter
      if (GraphState.semesterFilter !== 'all') {
        const sems = Array.isArray(node.semester) ? node.semester : ['上册'];
        if (!sems.includes(GraphState.semesterFilter)) return false;
      }

      // 3. Domain filter
      if (GraphState.domainFilter !== 'all') {
        if (node.domain !== GraphState.domainFilter) return false;
      }

      // 4. Only with reviewed questions
      if (GraphState.onlyReviewedQuestions) {
        const qList = window.GraphData.getQuestionsForNode(node.id, true);
        if (!qList || qList.length === 0) return false;
      }

      // 5. Keyword search
      if (GraphState.searchQuery) {
        const kw = GraphState.searchQuery.toLowerCase();
        const nameMatch = (node.name || '').toLowerCase().includes(kw);
        const chapMatch = (node.chapter || '').toLowerCase().includes(kw);
        const descMatch = (node.description || '').toLowerCase().includes(kw);
        const tagMatch = Array.isArray(node.tags) && node.tags.some(t => String(t).toLowerCase().includes(kw));
        if (!nameMatch && !chapMatch && !descMatch && !tagMatch) return false;
      }

      return true;
    },

    nodeOrDescendantMatches(node) {
      if (!node) return false;
      if (node.level === 3) {
        return this.nodeMatchesLeafCriteria(node);
      }
      const children = window.GraphData.getChildren(node.id);
      if (children.some(ch => this.nodeOrDescendantMatches(ch))) {
        return true;
      }
      return this.nodeMatchesLeafCriteria(node);
    },

    // Search matching nodes for dropdown/instant search results
    searchNodes(query) {
      const kw = String(query || '').trim().toLowerCase();
      if (!kw) return [];
      const all = window.GraphData.allNodes || [];
      return all
        .filter(n => {
          const nameMatch = (n.name || '').toLowerCase().includes(kw);
          const chapMatch = (n.chapter || '').toLowerCase().includes(kw);
          const tagMatch = Array.isArray(n.tags) && n.tags.some(t => String(t).toLowerCase().includes(kw));
          return nameMatch || chapMatch || tagMatch;
        })
        .sort((a, b) => (b.level || 0) - (a.level || 0))
        .slice(0, 12);
    },

    selectNode(nodeId, options = {}) {
      const node = window.GraphData.getNode(nodeId);
      if (!node) return;
      GraphState.selectedNodeId = nodeId;
      GraphState.activeRelationEdge = null;
      GraphState.qPage = 1;

      // Expand all ancestors so tree shows selected node
      const ancestors = window.GraphData.getAncestors(nodeId);
      ancestors.forEach(a => GraphState.expandedIds.add(a.id));
      if (node.level < 3) {
        GraphState.expandedIds.add(node.id);
      }

      GraphState.savePersisted();
      this.refreshAllViews(options);
    },

    setViewMode(mode) {
      if (mode !== 'tree' && mode !== 'network') return;
      GraphState.viewMode = mode;
      GraphState.savePersisted();
      this.syncToolbarUi();
      this.refreshAllViews({ keepNetworkTransform: false });
    },

    setUserRoleMode(roleMode) {
      if (roleMode !== 'teacher' && roleMode !== 'student') return;
      GraphState.userRoleMode = roleMode;
      GraphState.savePersisted();
      this.syncToolbarUi();
      this.refreshAllViews({ keepNetworkTransform: true });
      if (typeof showToast === 'function') {
        showToast(roleMode === 'teacher' ? '已切换至【教师模式】：侧重考点分布与组卷选题' : '已切换至【学生模式】：侧重前置基础与学习路径', 'info');
      }
    },

    syncToolbarUi() {
      const treeBtn = document.getElementById('btnGraphViewTree');
      const netBtn = document.getElementById('btnGraphViewNetwork');
      if (treeBtn && netBtn) {
        treeBtn.classList.toggle('is-active', GraphState.viewMode === 'tree');
        netBtn.classList.toggle('is-active', GraphState.viewMode === 'network');
      }

      const teacherModeBtn = document.getElementById('btnGraphRoleTeacher');
      const studentModeBtn = document.getElementById('btnGraphRoleStudent');
      if (teacherModeBtn && studentModeBtn) {
        teacherModeBtn.classList.toggle('is-active', GraphState.userRoleMode === 'teacher');
        studentModeBtn.classList.toggle('is-active', GraphState.userRoleMode === 'student');
      }

      const treePanel = document.getElementById('graphMainTreeContainer');
      const netPanel = document.getElementById('graphMainNetworkContainer');
      if (treePanel && netPanel) {
        treePanel.classList.toggle('hidden', GraphState.viewMode !== 'tree');
        netPanel.classList.toggle('hidden', GraphState.viewMode !== 'network');
      }

      const gradeSelect = document.getElementById('graphFilterGrade');
      if (gradeSelect) gradeSelect.value = GraphState.gradeFilter;

      const semSelect = document.getElementById('graphFilterSemester');
      if (semSelect) semSelect.value = GraphState.semesterFilter;

      const domSelect = document.getElementById('graphFilterDomain');
      if (domSelect) domSelect.value = GraphState.domainFilter;

      const revCheck = document.getElementById('graphFilterReviewedOnly');
      if (revCheck) revCheck.checked = Boolean(GraphState.onlyReviewedQuestions);

      const searchInput = document.getElementById('graphSearchInput');
      if (searchInput && searchInput.value !== GraphState.searchQuery) {
        searchInput.value = GraphState.searchQuery;
      }
    },

    bindFilterEvents() {
      // View mode buttons
      document.getElementById('btnGraphViewTree')?.addEventListener('click', () => this.setViewMode('tree'));
      document.getElementById('btnGraphViewNetwork')?.addEventListener('click', () => this.setViewMode('network'));

      // Teacher / Student role buttons
      document.getElementById('btnGraphRoleTeacher')?.addEventListener('click', () => this.setUserRoleMode('teacher'));
      document.getElementById('btnGraphRoleStudent')?.addEventListener('click', () => this.setUserRoleMode('student'));

      // Filters
      document.getElementById('graphFilterGrade')?.addEventListener('change', (e) => {
        GraphState.gradeFilter = e.target.value;
        GraphState.savePersisted();
        this.ensureSelectedNodeVisible();
        this.refreshAllViews();
      });

      document.getElementById('graphFilterSemester')?.addEventListener('change', (e) => {
        GraphState.semesterFilter = e.target.value;
        GraphState.savePersisted();
        this.ensureSelectedNodeVisible();
        this.refreshAllViews();
      });

      document.getElementById('graphFilterDomain')?.addEventListener('change', (e) => {
        GraphState.domainFilter = e.target.value;
        GraphState.savePersisted();
        this.ensureSelectedNodeVisible();
        this.refreshAllViews();
      });

      document.getElementById('graphFilterReviewedOnly')?.addEventListener('change', (e) => {
        GraphState.onlyReviewedQuestions = e.target.checked;
        GraphState.savePersisted();
        this.refreshAllViews();
      });

      document.getElementById('btnGraphResetFilters')?.addEventListener('click', () => {
        GraphState.gradeFilter = 'all';
        GraphState.semesterFilter = 'all';
        GraphState.domainFilter = 'all';
        GraphState.searchQuery = '';
        GraphState.onlyReviewedQuestions = false;
        GraphState.savePersisted();
        this.syncToolbarUi();
        this.hideSearchDropdown();
        this.refreshAllViews();
      });

      // Search input & live dropdown
      const searchInput = document.getElementById('graphSearchInput');
      const dropdown = document.getElementById('graphSearchDropdown');
      if (searchInput) {
        let timer = null;
        searchInput.addEventListener('input', (e) => {
          clearTimeout(timer);
          const val = e.target.value.trim();
          timer = setTimeout(() => {
            GraphState.searchQuery = val;
            this.renderSearchDropdown(val);
            this.refreshAllViews({ keepNetworkTransform: true });
          }, 180);
        });
        searchInput.addEventListener('focus', (e) => {
          const val = e.target.value.trim();
          if (val) this.renderSearchDropdown(val);
        });
      }

      document.addEventListener('click', (e) => {
        if (!dropdown || dropdown.classList.contains('hidden')) return;
        if (!e.target.closest('#graphSearchBoxWrapper')) {
          this.hideSearchDropdown();
        }
      });
    },

    renderSearchDropdown(query) {
      const dropdown = document.getElementById('graphSearchDropdown');
      if (!dropdown) return;
      if (!query) {
        dropdown.classList.add('hidden');
        dropdown.innerHTML = '';
        return;
      }

      const matches = this.searchNodes(query);
      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div class="px-4 py-3 text-xs text-slate-400 text-center">未找到包含“${query.replace(/[<>&"']/g, '')}”的知识点</div>
        `;
        dropdown.classList.remove('hidden');
        return;
      }

      dropdown.innerHTML = matches.map(n => {
        const qCount = window.GraphData.getQuestionsForNode(n.id, true).length;
        const gradeStr = Array.isArray(n.grade) ? n.grade.join('/') : '';
        const levelLabel = n.level === 1 ? '知识领域' : n.level === 2 ? '章节板块' : '核心考点';
        return `
          <button type="button" class="graph-search-result-item w-full text-left px-3.5 py-2.5 hover:bg-[#F0FDFA] border-b border-slate-100 last:border-b-0 flex items-center justify-between gap-2 transition" data-node-id="${n.id}">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-bold text-slate-800 truncate">${n.name}</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">${levelLabel}</span>
              </div>
              <div class="text-[11px] text-slate-400 truncate mt-0.5">${n.domain} · ${gradeStr} · ${n.chapter || ''}</div>
            </div>
            <span class="text-xs font-semibold text-[#0F766E] bg-[#F0FDFA] border border-[#CCFBF1] px-2 py-0.5 rounded-full shrink-0">${qCount} 题</span>
          </button>
        `;
      }).join('');

      dropdown.classList.remove('hidden');

      dropdown.querySelectorAll('.graph-search-result-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const nid = btn.getAttribute('data-node-id');
          this.hideSearchDropdown();
          this.selectNode(nid);
        });
      });
    },

    hideSearchDropdown() {
      const dropdown = document.getElementById('graphSearchDropdown');
      if (dropdown) dropdown.classList.add('hidden');
    },

    ensureSelectedNodeVisible() {
      const curr = window.GraphData.getNode(GraphState.selectedNodeId);
      if (curr && this.nodeOrDescendantMatches(curr)) return;
      // Pick first matching level 3 node
      const firstMatch = (window.GraphData.allNodes || []).find(n => n.level === 3 && this.nodeMatchesLeafCriteria(n));
      if (firstMatch) {
        GraphState.selectedNodeId = firstMatch.id;
        const ancestors = window.GraphData.getAncestors(firstMatch.id);
        ancestors.forEach(a => GraphState.expandedIds.add(a.id));
      }
    },

    refreshAllViews(options = {}) {
      this.syncToolbarUi();
      if (window.GraphTree) window.GraphTree.render();
      if (window.GraphNetwork && GraphState.viewMode === 'network') {
        window.GraphNetwork.render(options);
      }
      if (window.GraphDetail) window.GraphDetail.render();
    }
  };

  window.GraphState = GraphState;
  window.GraphFilter = GraphFilter;
})();
