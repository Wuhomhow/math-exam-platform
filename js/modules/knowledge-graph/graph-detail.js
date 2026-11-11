// 题典网「题目图谱」知识详情面板与关联题目渲染模块 (graph-detail.js)
(function () {
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  const ROLE_BADGE_MAP = {
    primary:       { label: '核心考点', cls: 'bg-[#0F766E] text-white' },
    secondary:     { label: '次要考点', cls: 'bg-teal-50 text-teal-800 border border-teal-200' },
    comprehensive: { label: '综合考查', cls: 'bg-amber-50 text-amber-800 border border-amber-200' }
  };

  const GraphDetail = {
    render() {
      const node = window.GraphData?.getNode(window.GraphState?.selectedNodeId);
      if (!node) return;
      this.renderNodeSummaryCard(node);
      this.renderQuestionListSection(node);
    },

    renderNodeSummaryCard(node) {
      const container = document.getElementById('graphNodeDetailPanel');
      if (!container) return;

      const parent = window.GraphData.getParent(node.id);
      const ancestors = window.GraphData.getAncestors(node.id);
      const children = window.GraphData.getChildren(node.id);
      const rels = window.GraphData.getRelationsForNode(node.id);
      const allQEntries = window.GraphData.getQuestionsForNode(node.id, true);

      const primaryCount = allQEntries.filter(e => e.role === 'primary').length;
      const secondaryCount = allQEntries.filter(e => e.role === 'secondary').length;
      const compCount = allQEntries.filter(e => e.role === 'comprehensive').length;

      // Difficulty distribution
      const diffStat = { '容易': 0, '较易': 0, '中等': 0, '较难': 0 };
      allQEntries.forEach(({ question }) => {
        const d = question.difficulty === '适中' ? '中等' : question.difficulty;
        if (diffStat[d] !== undefined) diffStat[d]++;
      });

      const levelBadge = node.level === 1 ? '一级知识领域' : node.level === 2 ? '二级教材章节/板块' : '三级核心知识点';
      const gradeStr = Array.isArray(node.grade) ? node.grade.join(' / ') : '';
      const isStudent = window.GraphState.userRoleMode === 'student';

      const breadcrumbHtml = [...ancestors, node].map((item, idx, arr) => {
        const isCurrent = idx === arr.length - 1;
        return isCurrent
          ? `<span class="font-bold text-[#0F766E]">${escapeHtml(item.name)}</span>`
          : `<button type="button" class="text-slate-500 hover:text-[#0F766E] hover:underline" data-detail-nav="${item.id}">${escapeHtml(item.name)}</button><span class="text-slate-300 mx-1">/</span>`;
      }).join('');

      const renderNodePills = (list, emptyText, colorCls) => {
        if (!list || list.length === 0) {
          return `<span class="text-xs text-slate-400">${emptyText}</span>`;
        }
        return list.map(entry => {
          const n = entry.node || entry;
          const cnt = window.GraphData.getQuestionsForNode(n.id, true).length;
          const tip = entry.description ? `title="${escapeHtml(entry.description)}"` : '';
          return `
            <button type="button" ${tip} class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition border ${colorCls}" data-detail-nav="${n.id}">
              <span>${escapeHtml(n.name)}</span>
              <span class="text-[10px] opacity-75">(${cnt})</span>
            </button>
          `;
        }).join('');
      };

      container.innerHTML = `
        <div class="space-y-4">
          <!-- Breadcrumb -->
          <div class="text-xs flex flex-wrap items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <span class="text-slate-400 mr-1.5">知识路径：</span>
            ${breadcrumbHtml}
          </div>

          <!-- Title & Meta -->
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]">${levelBadge}</span>
              <span class="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">${escapeHtml(gradeStr)}</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-slate-900 mt-1.5">${escapeHtml(node.name)}</h3>
            <p class="text-xs text-slate-600 leading-relaxed mt-1">${escapeHtml(node.description || '暂无详细说明')}</p>
          </div>

          <!-- Stats Bar (Teacher vs Student Mode Focus) -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-slate-700">${isStudent ? '🎯 学习与练习概览' : '📊 关联题目与考查角色分布'}</span>
              <a href="#graphRelatedQuestionsSection" class="text-[#0F766E] font-bold hover:underline">查看 ${allQEntries.length} 道题目 &darr;</a>
            </div>
            <div class="grid grid-cols-4 gap-1.5 text-center pt-1">
              <div class="p-1.5 rounded-lg bg-white border border-slate-200/70">
                <div class="text-[10px] text-slate-400">关联总题数</div>
                <div class="text-sm font-bold text-slate-800">${allQEntries.length}</div>
              </div>
              <div class="p-1.5 rounded-lg bg-white border border-slate-200/70">
                <div class="text-[10px] text-slate-400">核心考点</div>
                <div class="text-sm font-bold text-[#0F766E]">${primaryCount}</div>
              </div>
              <div class="p-1.5 rounded-lg bg-white border border-slate-200/70">
                <div class="text-[10px] text-slate-400">次要考点</div>
                <div class="text-sm font-bold text-teal-700">${secondaryCount}</div>
              </div>
              <div class="p-1.5 rounded-lg bg-white border border-slate-200/70">
                <div class="text-[10px] text-slate-400">综合考查</div>
                <div class="text-sm font-bold text-amber-700">${compCount}</div>
              </div>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
              <span>难度分布：</span>
              <span>容易 <b>${diffStat['容易']}</b> · 较易 <b>${diffStat['较易']}</b> · 中等 <b>${diffStat['中等']}</b> · 较难 <b>${diffStat['较难']}</b></span>
            </div>
          </div>

          <!-- Knowledge Relations Grid -->
          <div class="space-y-3 text-xs">
            <!-- Parent & Children -->
            <div>
              <div class="text-slate-500 font-semibold mb-1.5 flex items-center justify-between">
                <span>📂 上级知识</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${parent ? renderNodePills([parent], '', 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0F766E]') : '<span class="text-slate-400">当前为顶层知识领域</span>'}
              </div>
            </div>

            ${children.length > 0 ? `
              <div>
                <div class="text-slate-500 font-semibold mb-1.5">🌿 下级细分知识 (${children.length})</div>
                <div class="flex flex-wrap gap-1.5">
                  ${renderNodePills(children, '无下级节点', 'bg-[#F0FDFA] text-[#115E59] border-[#CCFBF1] hover:bg-[#CCFBF1]/50')}
                </div>
              </div>
            ` : ''}

            <!-- Prerequisites -->
            <div>
              <div class="text-slate-500 font-semibold mb-1.5 flex items-center gap-1">
                <span>⏪ 前置知识</span>
                <span class="text-[10px] text-slate-400 font-normal">(建议先掌握)</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${renderNodePills(rels.prerequisites, '无特定前置知识点（可直接学习）', 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100/70')}
              </div>
              ${isStudent && rels.prerequisites.length > 0 ? `
                <div class="mt-1.5 p-2 rounded-lg bg-amber-50/60 border border-amber-200/70 text-[11px] text-amber-900 leading-relaxed">
                  <b>学习建议：</b>${escapeHtml(rels.prerequisites[0].description)}
                </div>
              ` : ''}
            </div>

            <!-- Subsequent / Dependents -->
            <div>
              <div class="text-slate-500 font-semibold mb-1.5 flex items-center gap-1">
                <span>⏩ 后续进阶知识</span>
                <span class="text-[10px] text-slate-400 font-normal">(本知识点的延伸)</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${renderNodePills(rels.dependents, '当前已为该分支高阶应用节点', 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100/70')}
              </div>
            </div>

            <!-- Lateral Related -->
            <div>
              <div class="text-slate-500 font-semibold mb-1.5">🔗 横向关联知识</div>
              <div class="flex flex-wrap gap-1.5">
                ${renderNodePills(rels.related, '暂无直接横向关联节点', 'bg-pink-50 text-pink-900 border-pink-200 hover:bg-pink-100/70')}
              </div>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <button type="button" id="btnDetailSwitchView" class="btn-secondary flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition">
              ${window.GraphState.viewMode === 'tree' ? '🕸️ 在网络图中探索关系' : '🌲 在树状图中查看位置'}
            </button>
            <button type="button" id="btnDetailBatchAddPrimary" class="btn-primary flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition">
              ➕ 将核心题选入试题篮
            </button>
          </div>
        </div>
      `;

      // Attach listeners
      container.querySelectorAll('[data-detail-nav]').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-detail-nav');
          window.GraphFilter.selectNode(targetId);
        });
      });

      container.querySelector('#btnDetailSwitchView')?.addEventListener('click', () => {
        const nextMode = window.GraphState.viewMode === 'tree' ? 'network' : 'tree';
        window.GraphFilter.setViewMode(nextMode);
      });

      container.querySelector('#btnDetailBatchAddPrimary')?.addEventListener('click', () => {
        const primaryQs = allQEntries.filter(e => e.role === 'primary').map(e => e.question);
        const targetList = primaryQs.length > 0 ? primaryQs : allQEntries.map(e => e.question);
        if (targetList.length === 0) {
          if (typeof showToast === 'function') showToast('当前知识点暂无关联题目', 'warn');
          return;
        }
        targetList.slice(0, 15).forEach(q => state.selectedIds.add(q.id));
        if (typeof updateStats === 'function') updateStats();
        if (typeof renderBasketDrawer === 'function') renderBasketDrawer();
        if (typeof renderQuestionList === 'function') renderQuestionList();
        this.renderQuestionListSection(node);
        if (typeof showToast === 'function') {
          showToast(`已将「${node.name}」的 ${Math.min(15, targetList.length)} 道题目加入试题篮！`, 'success');
        }
      });
    },

    // Render associated questions list at bottom of graph view using existing question card design
    renderQuestionListSection(node) {
      const listEl = document.getElementById('graphQuestionListContainer');
      const titleEl = document.getElementById('graphQuestionSectionTitle');
      const pagEl = document.getElementById('graphQuestionPagination');
      const kpListEl = document.getElementById('graphQuestionKpFilterList');
      if (!listEl || !node) return;

      const activeProcId = window.GraphState.activeProcedureId || null;
      const activeProcCol = (activeProcId && window.ProceduralKnowledgeService)
        ? window.ProceduralKnowledgeService.getQuestionCollectionByProcedure(activeProcId)
        : null;
      const allEntries = activeProcCol
        ? activeProcCol.items.map(it => ({ question: it.question, role: it.role || 'primary' }))
        : window.GraphData.getQuestionsForNode(node.id, true);

      // Build knowledge point metadata & question-to-KPs lookup across allEntries
      const qKpMap = new Map(); // questionId -> [{ node, role }]
      const kpStatsMap = new Map(); // kpId -> { node, totalCount, primaryCount, soloCount, isCore }

      allEntries.forEach(entry => {
        const q = entry.question;
        const kps = window.GraphData.getKnowledgeForQuestion(q.id) || [];
        qKpMap.set(q.id, kps);

        kps.forEach(({ node: kpNode, role }) => {
          if (!kpNode) return;
          let st = kpStatsMap.get(kpNode.id);
          if (!st) {
            const isDirectOrDescendant = kpNode.id === node.id || kpNode.parentId === node.id ||
              (window.GraphData.getAncestors(kpNode.id) || []).some(a => a.id === node.id);
            st = {
              node: kpNode,
              totalCount: 0,
              primaryCount: 0,
              soloCount: 0,
              isCurrent: kpNode.id === node.id,
              isDescendant: isDirectOrDescendant,
              isCore: kpNode.id === node.id || (node.level < 3 && isDirectOrDescendant)
            };
            kpStatsMap.set(kpNode.id, st);
          }
          st.totalCount++;
          if (role === 'primary') {
            st.primaryCount++;
            st.isCore = true;
          }
          if (kps.length === 1 && kps[0].node.id === kpNode.id) {
            st.soloCount++;
          }
        });
      });

      // Ensure current leaf node is always present in kpStatsMap if allEntries > 0
      if (node.level === 3 && allEntries.length > 0 && !kpStatsMap.has(node.id)) {
        kpStatsMap.set(node.id, {
          node,
          totalCount: allEntries.length,
          primaryCount: allEntries.filter(e => e.role === 'primary').length,
          soloCount: allEntries.length,
          isCurrent: true,
          isDescendant: true,
          isCore: true
        });
      }

      // Sort knowledge points:
      // 1. Current selected node itself (if level 3) ALWAYS first
      // 2. Core knowledge points (role === 'primary' or direct child of current chapter/domain) next
      // 3. Secondary / comprehensive knowledge points after, sorted by count desc
      const sortedKpList = Array.from(kpStatsMap.values()).sort((a, b) => {
        if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;
        if (a.isCore !== b.isCore) return a.isCore ? -1 : 1;
        if (a.isDescendant !== b.isDescendant) return a.isDescendant ? -1 : 1;
        if (b.primaryCount !== a.primaryCount) return b.primaryCount - a.primaryCount;
        return b.totalCount - a.totalCount;
      });

      // Clean up any stale selected KP IDs that don't exist in current node's KP set
      if (!Array.isArray(window.GraphState.qSelectedKpIds)) {
        window.GraphState.qSelectedKpIds = [];
      }
      const validSelectedIds = window.GraphState.qSelectedKpIds.filter(id => kpStatsMap.has(id));
      window.GraphState.qSelectedKpIds = validSelectedIds;
      const selectedKpSet = new Set(validSelectedIds);

      // Render dynamic Knowledge Point multi-select filter bar
      if (kpListEl) {
        const isAllActive = selectedKpSet.size === 0;
        let pillsHtml = `
          <button type="button" class="graph-q-kp-all-btn filter-type-btn ${isAllActive ? 'is-active' : ''}" data-kp-all="true" title="显示当前节点下的全部关联题目">
            全部 (${allEntries.length})
          </button>
        `;

        pillsHtml += sortedKpList.map(item => {
          const isSelected = selectedKpSet.has(item.node.id);
          const coreBadge = item.isCore
            ? `<span class="px-1.5 py-0.2 rounded text-[10px] font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]'}">核心考点</span>`
            : '';
          return `
            <button type="button" class="graph-q-kp-btn filter-type-btn inline-flex items-center gap-1.5 ${isSelected ? 'is-active' : ''}" data-kp-id="${item.node.id}" title="点击单选或多选该知识点（单选时仅显示只含该考点的题目，支持多选组合）">
              ${coreBadge}
              <span>${escapeHtml(item.node.name)}</span>
            </button>
          `;
        }).join('');

        if (selectedKpSet.size > 0) {
          const modeHint = selectedKpSet.size === 1
            ? '单选模式：仅显示独立考查该知识点的题目（不含其他知识点）'
            : `多选模式：已组合选中 ${selectedKpSet.size} 个知识点`;
          pillsHtml += `
            <span class="text-[11px] text-[#0F766E] bg-[#F0FDFA] border border-[#CCFBF1] px-2 py-0.5 rounded-md font-medium ml-1">${modeHint}</span>
            <button type="button" id="btnGraphClearKpFilter" class="text-[11px] text-slate-500 hover:text-rose-600 underline px-1.5 py-0.5">重置知识点</button>
          `;
        }

        kpListEl.innerHTML = pillsHtml;

        kpListEl.querySelector('.graph-q-kp-all-btn')?.addEventListener('click', () => {
          window.GraphState.qSelectedKpIds = [];
          window.GraphState.qPage = 1;
          this.renderQuestionListSection(node);
        });

        kpListEl.querySelector('#btnGraphClearKpFilter')?.addEventListener('click', () => {
          window.GraphState.qSelectedKpIds = [];
          window.GraphState.qPage = 1;
          this.renderQuestionListSection(node);
        });

        kpListEl.querySelectorAll('.graph-q-kp-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const kpId = btn.getAttribute('data-kp-id');
            if (!kpId) return;
            const curr = new Set(window.GraphState.qSelectedKpIds || []);
            if (curr.has(kpId)) {
              curr.delete(kpId);
            } else {
              curr.add(kpId);
            }
            window.GraphState.qSelectedKpIds = Array.from(curr);
            window.GraphState.qPage = 1;
            this.renderQuestionListSection(node);
          });
        });
      }

      // Filter entries by selected knowledge points:
      // - When 0 selected ("全部"): show all questions in allEntries.
      // - When 1 selected (single-select K): ONLY show questions that correspond strictly to K
      //   without extra knowledge points (`qKpIds.length === 1 && qKpIds[0] === K`).
      //   (If on a level-3 leaf node and the user single-selected a co-occurring secondary KP K != node.id,
      //    match questions that only have K alongside current leaf node without any 3rd KP.)
      // - When >= 2 selected (multi-select): show questions whose knowledge points are within the selected set
      //   (all of the question's KPs are covered by the selected KPs, without unselected extra KPs).
      let kpFilteredEntries = allEntries;
      if (selectedKpSet.size === 1) {
        const onlyId = validSelectedIds[0];
        const strictSingle = allEntries.filter(entry => {
          const kps = qKpMap.get(entry.question.id) || [];
          return kps.length === 1 && kps[0].node.id === onlyId;
        });
        if (strictSingle.length > 0 || onlyId === node.id || node.level < 3) {
          kpFilteredEntries = strictSingle;
        } else {
          const pairOnly = allEntries.filter(entry => {
            const kps = qKpMap.get(entry.question.id) || [];
            const ids = kps.map(k => k.node.id);
            return ids.includes(onlyId) && ids.every(id => id === onlyId || id === node.id);
          });
          kpFilteredEntries = pairOnly.length > 0
            ? pairOnly
            : allEntries.filter(entry => (qKpMap.get(entry.question.id) || []).some(k => k.node.id === onlyId));
        }
      } else if (selectedKpSet.size > 1) {
        const strictSubset = allEntries.filter(entry => {
          const kps = qKpMap.get(entry.question.id) || [];
          const ids = kps.map(k => k.node.id);
          return ids.length > 0 && ids.every(id => selectedKpSet.has(id));
        });
        if (strictSubset.length > 0 || selectedKpSet.has(node.id) || node.level < 3) {
          kpFilteredEntries = strictSubset;
        } else {
          kpFilteredEntries = allEntries.filter(entry => {
            const kps = qKpMap.get(entry.question.id) || [];
            const ids = kps.map(k => k.node.id);
            return ids.some(id => selectedKpSet.has(id)) && ids.every(id => selectedKpSet.has(id) || id === node.id);
          });
        }
      }

      // Apply secondary filters (type, difficulty)
      const filteredEntries = kpFilteredEntries.filter(entry => {
        const q = entry.question;
        if (window.GraphState.qTypeFilter !== 'all' && q.type !== window.GraphState.qTypeFilter) return false;
        if (window.GraphState.qDiffFilter !== 'all') {
          const d = q.difficulty === '适中' ? '中等' : q.difficulty;
          if (d !== window.GraphState.qDiffFilter) return false;
        }
        return true;
      });

      if (titleEl) {
        const countText = selectedKpSet.size > 0 || window.GraphState.qTypeFilter !== 'all' || window.GraphState.qDiffFilter !== 'all'
          ? `${filteredEntries.length} / ${allEntries.length} 题`
          : `${allEntries.length} 题`;
        titleEl.innerHTML = `「${escapeHtml(node.name)}」关联题目列表 <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] ml-1">${countText}</span>`;
      }

      // Sync filter pill UI in question section
      document.querySelectorAll('.graph-q-type-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.getAttribute('data-q-type') === window.GraphState.qTypeFilter);
      });
      document.querySelectorAll('.graph-q-diff-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.getAttribute('data-q-diff') === window.GraphState.qDiffFilter);
      });

      if (filteredEntries.length === 0) {
        listEl.innerHTML = `
          <div class="py-12 text-center text-slate-400 text-xs ui-card">
            当前筛选条件下暂无符合要求的题目（单选知识点时仅显示不含其他知识点的独立考查题，您可点击多个知识点组合筛选或点击「全部」）。
          </div>
        `;
        if (pagEl) pagEl.classList.add('hidden');
        return;
      }

      const pageSize = window.GraphState.qPageSize || 8;
      const totalPages = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
      if (window.GraphState.qPage > totalPages) window.GraphState.qPage = totalPages;
      if (window.GraphState.qPage < 1) window.GraphState.qPage = 1;

      const startIdx = (window.GraphState.qPage - 1) * pageSize;
      const pageItems = filteredEntries.slice(startIdx, startIdx + pageSize);

      const procBannerHtml = (activeProcId && typeof window.renderProceduralCollectionBannerHtml === 'function')
        ? window.renderProceduralCollectionBannerHtml(activeProcId)
        : '';
      listEl.innerHTML = procBannerHtml + pageItems.map((entry, idx) => {
        const q = entry.question;
        const qNumber = startIdx + idx + 1;
        const isSelected = state.selectedIds.has(q.id);
        const diffColor = typeof getDifficultyBadgeClass === 'function' ? getDifficultyBadgeClass(q.difficulty) : 'q-meta-diff';
        const roleInfo = ROLE_BADGE_MAP[entry.role] || ROLE_BADGE_MAP.primary;

        let optionsHtml = '';
        if (q.options && q.options.length > 0) {
          optionsHtml = `
            <div class="q-options-grid grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2.5 text-sm text-slate-800">
              ${q.options.map(opt => `<div class="answer-option ${typeof getOptionLayoutClass === 'function' ? getOptionLayoutClass(opt) : ''}">${formatMathHtml(opt)}</div>`).join('')}
            </div>
          `;
        }

        const imgHtml = q.image ? `<div class="my-1.5"><img src="${q.image}" class="max-h-40 max-w-xs h-auto rounded object-contain"></div>` : '';
        const pTagsHtml = typeof window.renderQuestionProceduralTagsHtml === 'function'
          ? window.renderQuestionProceduralTagsHtml(q.id)
          : '';
        const kTagsHtml = (typeof window.renderQuestionKnowledgeTagsHtml === 'function'
          ? window.renderQuestionKnowledgeTagsHtml(q.id)
          : '') + pTagsHtml;

        return `
          <div class="question-card ${isSelected ? 'is-selected' : ''}" data-id="${q.id}">
            <!-- Header Row -->
            <div class="q-card-header flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="q-meta-num">第 ${qNumber} 题</span>
                <span class="px-2 py-0.5 rounded text-[11px] font-bold ${roleInfo.cls}">${roleInfo.label}</span>
                <span class="q-meta-chapter">${typeof getChapterDisplayLabel === 'function' ? getChapterDisplayLabel(q.chapter) : q.chapter}</span>
                <span class="q-meta-type">${q.typeName}</span>
                <span class="${diffColor}">${q.difficulty}</span>
              </div>
              <div class="q-meta-kp">
                <span>原标注考点：</span><span class="q-meta-kp-text">${escapeHtml(q.knowledge)}</span>
              </div>
            </div>

            <!-- Stem & Options -->
            <div class="q-card-body text-sm leading-relaxed text-slate-900">
              <div class="q-stem-content">${formatMathHtml(q.stem)}</div>
              ${imgHtml}
              ${optionsHtml}
              ${kTagsHtml}
            </div>

            <!-- Analysis Accordion Drawer -->
            <div id="graph_analysis_${q.id}" class="hidden q-analysis-panel text-xs space-y-1.5">
              ${typeof window.renderQuestionAnalysisBoxHtml === 'function' ? window.renderQuestionAnalysisBoxHtml(q) : `
              <div class="flex items-center space-x-2 font-bold text-slate-900">
                <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>
                <span>参考答案：</span>
                <span class="text-[#0F766E] font-semibold text-base tracking-wide">${formatMathHtml(q.answer)}</span>
              </div>
              <div class="text-slate-600"><b class="text-slate-800">【分析】</b>${formatMathHtml(q.analysis)}</div>
              ${q.detail && q.detail !== '略' ? `<div class="text-slate-700 pt-1.5 border-t border-slate-200/70 leading-relaxed"><b class="text-slate-800">【详解】</b>${formatMathHtml(q.detail)}</div>` : ''}
              `}
            </div>

            <!-- Bottom Actions -->
            <div data-html2canvas-ignore="true" class="q-card-footer flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-1 sm:gap-2 text-xs">
                <button class="btn-graph-toggle-analysis q-aux-btn" data-id="${q.id}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  <span class="analysis-btn-text">查看答案解析</span>
                </button>
                <button class="btn-graph-screenshot q-aux-btn" data-id="${q.id}" data-number="${qNumber}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
                  <span class="screenshot-btn-text">截图复制</span>
                </button>
                <button class="btn-graph-similar q-aux-btn" data-id="${q.id}" data-number="${qNumber}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  <span>举一反三</span>
                </button>
              </div>

              <button class="btn-graph-toggle-cart ${isSelected ? 'is-remove' : ''} px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5" data-id="${q.id}">
                ${isSelected ? `
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>已加入试题篮</span>
                ` : `
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  <span>加入试题篮</span>
                `}
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Bind question card events
      listEl.querySelectorAll('.btn-graph-toggle-analysis').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const panel = document.getElementById(`graph_analysis_${id}`);
          const textSpan = btn.querySelector('.analysis-btn-text');
          if (!panel) return;
          const isHidden = panel.classList.contains('hidden');
          panel.classList.toggle('hidden', !isHidden);
          if (textSpan) textSpan.textContent = isHidden ? '收起答案解析' : '查看答案解析';
        });
      });

      listEl.querySelectorAll('.btn-graph-screenshot').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.question-card');
          const qNum = btn.getAttribute('data-number') || '';
          if (card && typeof captureQuestionCard === 'function') captureQuestionCard(card, btn, qNum);
        });
      });

      listEl.querySelectorAll('.btn-graph-similar').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const qNum = btn.getAttribute('data-number') || '';
          if (typeof openSimilarQuestionsModal === 'function') openSimilarQuestionsModal(id, qNum);
        });
      });

      listEl.querySelectorAll('.btn-graph-toggle-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (typeof toggleCartItem === 'function') toggleCartItem(id);
          this.renderQuestionListSection(node);
        });
      });

      listEl.querySelectorAll('[data-jump-graph-node]').forEach(btn => {
        btn.addEventListener('click', () => {
          const nid = btn.getAttribute('data-jump-graph-node');
          window.GraphState.activeProcedureId = null;
          window.GraphFilter.selectNode(nid);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });

      listEl.querySelectorAll('[data-jump-proc], [data-proc-col]').forEach(btn => {
        btn.addEventListener('click', () => {
          const pid = btn.getAttribute('data-jump-proc') || btn.getAttribute('data-proc-col');
          if (pid) {
            window.GraphState.activeProcedureId = pid;
            window.GraphState.qPage = 1;
            window.GraphFilter.refreshAllViews({ keepNetworkTransform: true });
          }
        });
      });

      // Render pagination
      if (pagEl) {
        if (totalPages <= 1) {
          pagEl.classList.add('hidden');
        } else {
          pagEl.classList.remove('hidden');
          pagEl.innerHTML = `
            <div class="flex items-center gap-2">
              <button type="button" id="btnGraphQPrev" class="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-30" ${window.GraphState.qPage <= 1 ? 'disabled' : ''}>&larr; 上一页</button>
              <span class="text-xs font-medium text-slate-600">第 ${window.GraphState.qPage} / ${totalPages} 页（共 ${filteredEntries.length} 题）</span>
              <button type="button" id="btnGraphQNext" class="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-30" ${window.GraphState.qPage >= totalPages ? 'disabled' : ''}>下一页 &rarr;</button>
            </div>
          `;
          pagEl.querySelector('#btnGraphQPrev')?.addEventListener('click', () => {
            if (window.GraphState.qPage > 1) {
              window.GraphState.qPage--;
              this.renderQuestionListSection(node);
            }
          });
          pagEl.querySelector('#btnGraphQNext')?.addEventListener('click', () => {
            if (window.GraphState.qPage < totalPages) {
              window.GraphState.qPage++;
              this.renderQuestionListSection(node);
            }
          });
        }
      }

      if (typeof renderMath === 'function') renderMath();
    },

    bindQuestionFilterBar() {
      document.querySelectorAll('.graph-q-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          window.GraphState.qTypeFilter = btn.getAttribute('data-q-type');
          window.GraphState.qPage = 1;
          const node = window.GraphData.getNode(window.GraphState.selectedNodeId);
          if (node) this.renderQuestionListSection(node);
        });
      });

      document.querySelectorAll('.graph-q-diff-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          window.GraphState.qDiffFilter = btn.getAttribute('data-q-diff');
          window.GraphState.qPage = 1;
          const node = window.GraphData.getNode(window.GraphState.selectedNodeId);
          if (node) this.renderQuestionListSection(node);
        });
      });
    }
  };

  // Global helper to render clickable knowledge graph tags inside any question card (Bank view & Graph view)
  window.renderQuestionKnowledgeTagsHtml = function (questionId) {
    if (!window.GraphData) return '';
    const entries = window.GraphData.getKnowledgeForQuestion(questionId);
    if (!entries || entries.length === 0) return '';

    const pills = entries.map(({ node, role }) => {
      const rInfo = ROLE_BADGE_MAP[role] || ROLE_BADGE_MAP.primary;
      const roleDot = role === 'primary'
        ? '<span class="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>'
        : role === 'comprehensive'
        ? '<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>'
        : '<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>';
      return `
        <button type="button" class="btn-jump-to-graph-node inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 hover:bg-[#F0FDFA] text-slate-700 hover:text-[#0F766E] border border-slate-200 hover:border-[#CCFBF1] transition" data-jump-graph-node="${node.id}" title="点击跳转到知识图谱：${escapeHtml(node.name)} (${rInfo.label})">
          ${roleDot}
          <span>${escapeHtml(node.name)}</span>
          <span class="text-[10px] text-slate-400">[${rInfo.label}]</span>
        </button>
      `;
    }).join('');

    return `
      <div data-html2canvas-ignore="true" class="mt-3 pt-2 border-t border-dashed border-slate-200/80 flex flex-wrap items-center gap-1.5 text-xs">
        <span class="text-[11px] text-slate-400 font-medium flex items-center gap-1">
          <svg class="w-3.5 h-3.5 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
          <span>图谱知识点：</span>
        </span>
        ${pills}
      </div>
    `;
  };

  // Global helper to jump from any question card to the Knowledge Graph view & focus node
  window.jumpToKnowledgeGraphNode = function (nodeId) {
    if (!window.GraphFilter || !window.GraphData) return;
    const node = window.GraphData.getNode(nodeId);
    if (!node) return;
    if (typeof switchView === 'function') {
      switchView('graph');
    }
    window.GraphFilter.selectNode(nodeId);
    if (typeof showToast === 'function') {
      showToast(`已定位到知识图谱节点：${node.name}`, 'info');
    }
  };

  window.GraphDetail = GraphDetail;
})();
