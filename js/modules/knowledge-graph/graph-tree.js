// 题典网「题目图谱」树状视图与左侧导航目录模块 (graph-tree.js)
(function () {
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  const GraphTree = {
    render() {
      this.renderSidebarDirectory();
      if (window.GraphState?.viewMode === 'tree') {
        this.renderMainTreeCanvas();
      }
    },

    // Render left compact knowledge directory
    renderSidebarDirectory() {
      const container = document.getElementById('graphSidebarTree');
      if (!container || !window.GraphData) return;

      const domains = window.GraphData.getChildren(null).filter(d => window.GraphFilter.nodeOrDescendantMatches(d));
      const totalMatchedLeaves = (window.GraphData.allNodes || []).filter(n => n.level === 3 && window.GraphFilter.nodeMatchesLeafCriteria(n)).length;

      const countBadge = document.getElementById('graphSidebarNodeCount');
      if (countBadge) countBadge.textContent = `${totalMatchedLeaves} 个考点`;

      if (domains.length === 0) {
        container.innerHTML = `
          <div class="py-8 text-center text-xs text-slate-400">
            当前筛选条件下暂无匹配的知识点
          </div>
        `;
        return;
      }

      container.innerHTML = domains.map(dom => {
        const isDomOpen = window.GraphState.expandedIds.has(dom.id);
        const domSelected = window.GraphState.selectedNodeId === dom.id;
        const domQCount = window.GraphData.getQuestionsForNode(dom.id, true).length;
        const modules = window.GraphData.getChildren(dom.id).filter(m => window.GraphFilter.nodeOrDescendantMatches(m));

        return `
          <div class="border border-slate-200 rounded-xl overflow-hidden bg-white mb-2.5">
            <div class="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100 cursor-pointer select-none ${domSelected ? 'ring-1 ring-[#0F766E] bg-[#F0FDFA]' : ''}" data-toggle-domain="${dom.id}">
              <div class="flex items-center gap-1.5 min-w-0 flex-1">
                <svg class="w-3.5 h-3.5 text-[#0F766E] transition-transform duration-200 ${isDomOpen ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                <span class="text-xs font-bold text-slate-800 truncate" data-select-node="${dom.id}">${escapeHtml(dom.name)}</span>
              </div>
              <span class="text-[11px] font-semibold text-slate-500">${domQCount} 题</span>
            </div>
            <div class="${isDomOpen ? 'block' : 'hidden'} p-2 space-y-1.5">
              ${modules.map(mod => {
                const isModOpen = window.GraphState.expandedIds.has(mod.id) || mod.id === window.GraphState.selectedNodeId || window.GraphData.getChildren(mod.id).some(k => k.id === window.GraphState.selectedNodeId);
                const modSelected = window.GraphState.selectedNodeId === mod.id;
                const modQCount = window.GraphData.getQuestionsForNode(mod.id, true).length;
                const gradeBadge = Array.isArray(mod.grade) ? mod.grade[0] : '';
                const kps = window.GraphData.getChildren(mod.id).filter(k => window.GraphFilter.nodeMatchesLeafCriteria(k));

                return `
                  <div class="rounded-lg border border-slate-100 bg-slate-50/60 overflow-hidden">
                    <div class="flex items-center justify-between px-2.5 py-1.5 cursor-pointer hover:bg-slate-100/80 transition ${modSelected ? 'bg-[#F0FDFA] text-[#0F766E] font-bold' : 'text-slate-700 font-semibold'}" data-select-and-toggle="${mod.id}">
                      <div class="flex items-center gap-1.5 min-w-0 flex-1">
                        <span class="text-[10px] px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-500 shrink-0">${escapeHtml(gradeBadge)}</span>
                        <span class="text-xs truncate">${escapeHtml(mod.name)}</span>
                      </div>
                      <span class="text-[11px] text-slate-400 ml-1 shrink-0">${modQCount}</span>
                    </div>
                    <div class="${isModOpen ? 'block' : 'hidden'} px-2 pb-1.5 pt-1 space-y-1 bg-white border-t border-slate-100">
                      ${kps.map(kp => {
                        const isAct = window.GraphState.selectedNodeId === kp.id;
                        const qCnt = window.GraphData.getQuestionsForNode(kp.id, true).length;
                        return `
                          <button type="button" class="w-full text-left px-2.5 py-1.5 rounded-md text-xs flex items-center justify-between gap-2 transition ${isAct ? 'bg-[#0F766E] text-white font-semibold shadow-sm' : 'text-slate-600 hover:bg-[#F0FDFA] hover:text-[#0F766E]'}" data-select-node="${kp.id}">
                            <span class="truncate">${escapeHtml(kp.name)}</span>
                            <span class="text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${isAct ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}">${qCnt}</span>
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');

      // Attach listeners
      container.querySelectorAll('[data-toggle-domain]').forEach(el => {
        el.addEventListener('click', (e) => {
          const domId = el.getAttribute('data-toggle-domain');
          if (e.target.hasAttribute('data-select-node')) {
            window.GraphFilter.selectNode(domId);
            return;
          }
          if (window.GraphState.expandedIds.has(domId)) {
            window.GraphState.expandedIds.delete(domId);
          } else {
            window.GraphState.expandedIds.add(domId);
          }
          window.GraphState.savePersisted();
          this.renderSidebarDirectory();
        });
      });

      container.querySelectorAll('[data-select-and-toggle]').forEach(el => {
        el.addEventListener('click', () => {
          const modId = el.getAttribute('data-select-and-toggle');
          if (window.GraphState.expandedIds.has(modId)) {
            window.GraphState.expandedIds.delete(modId);
          } else {
            window.GraphState.expandedIds.add(modId);
          }
          window.GraphFilter.selectNode(modId);
        });
      });

      container.querySelectorAll('button[data-select-node]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const nid = btn.getAttribute('data-select-node');
          window.GraphFilter.selectNode(nid);
        });
      });
    },

    // Render center structured tree canvas (when viewMode === 'tree')
    renderMainTreeCanvas() {
      const container = document.getElementById('graphTreeCanvasBody');
      if (!container || !window.GraphData) return;

      const domains = window.GraphData.getChildren(null).filter(d => window.GraphFilter.nodeOrDescendantMatches(d));
      const isStudentMode = window.GraphState.userRoleMode === 'student';

      if (domains.length === 0) {
        container.innerHTML = `
          <div class="py-16 text-center text-slate-400">
            <p class="text-sm">未找到符合当前筛选条件的知识树节点，请调整筛选条件。</p>
          </div>
        `;
        return;
      }

      container.innerHTML = domains.map(dom => {
        const isDomOpen = window.GraphState.expandedIds.has(dom.id);
        const domSelected = window.GraphState.selectedNodeId === dom.id;
        const domQCount = window.GraphData.getQuestionsForNode(dom.id, true).length;
        const modules = window.GraphData.getChildren(dom.id).filter(m => window.GraphFilter.nodeOrDescendantMatches(m));

        return `
          <div class="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
            <!-- Level 1: Domain Header -->
            <div class="px-4 py-3 bg-gradient-to-r from-[#F0FDFA] to-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2.5">
                <button type="button" class="w-6 h-6 rounded-md bg-white border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center hover:bg-[#CCFBF1]/40 transition" data-tree-toggle="${dom.id}" title="展开/收起领域">
                  <svg class="w-3.5 h-3.5 transition-transform duration-200 ${isDomOpen ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
                <div>
                  <div class="flex items-center gap-2">
                    <button type="button" class="text-sm sm:text-base font-bold ${domSelected ? 'text-[#0F766E] underline' : 'text-slate-900'} hover:text-[#0F766E] text-left" data-tree-select="${dom.id}">
                      ${escapeHtml(dom.name)}
                    </button>
                    <span class="text-[11px] px-2 py-0.5 rounded-full bg-[#CCFBF1] text-[#115E59] font-semibold">一级知识领域</span>
                  </div>
                  <p class="text-xs text-slate-500 mt-0.5">${escapeHtml(dom.description)}</p>
                </div>
              </div>
              <div class="flex items-center gap-2 text-xs">
                <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">${modules.length} 个章节板块</span>
                <span class="px-2.5 py-1 rounded-lg bg-[#0F766E] text-white font-semibold">${domQCount} 道关联题</span>
              </div>
            </div>

            <!-- Level 2: Modules -->
            <div class="${isDomOpen ? 'block' : 'hidden'} p-4 space-y-3 bg-slate-50/40">
              ${modules.map(mod => {
                const modQCount = window.GraphData.getQuestionsForNode(mod.id, true).length;
                const modSelected = window.GraphState.selectedNodeId === mod.id;
                const kps = window.GraphData.getChildren(mod.id).filter(k => window.GraphFilter.nodeMatchesLeafCriteria(k));
                const isModOpen = window.GraphState.expandedIds.has(mod.id) || modSelected || kps.some(k => k.id === window.GraphState.selectedNodeId) || Boolean(window.GraphState.searchQuery);
                const gradeStr = Array.isArray(mod.grade) ? mod.grade.join('·') : '';

                return `
                  <div class="border ${modSelected ? 'border-[#0F766E] ring-1 ring-[#0F766E]' : 'border-slate-200'} rounded-xl bg-white overflow-hidden">
                    <div class="px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 bg-slate-50/70 border-b border-slate-100">
                      <div class="flex items-center gap-2 min-w-0">
                        <button type="button" class="w-5 h-5 rounded border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:border-[#0F766E] hover:text-[#0F766E]" data-tree-toggle="${mod.id}">
                          <svg class="w-3 h-3 transition-transform duration-200 ${isModOpen ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 shrink-0">${escapeHtml(gradeStr)}</span>
                        <button type="button" class="text-xs sm:text-sm font-bold text-slate-800 hover:text-[#0F766E] truncate text-left" data-tree-select="${mod.id}">
                          ${escapeHtml(mod.name)}
                        </button>
                      </div>
                      <div class="flex items-center gap-2 text-xs">
                        <span class="text-slate-400">${kps.length} 个核心知识点</span>
                        <span class="px-2 py-0.5 rounded-full bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] font-semibold">${modQCount} 题</span>
                      </div>
                    </div>

                    <!-- Level 3: Specific Knowledge Points Grid -->
                    <div class="${isModOpen ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-2 gap-2.5 p-3">
                      ${kps.map(kp => {
                        const isAct = window.GraphState.selectedNodeId === kp.id;
                        const qList = window.GraphData.getQuestionsForNode(kp.id, true);
                        const primaryCnt = qList.filter(item => item.role === 'primary').length;
                        const rels = window.GraphData.getRelationsForNode(kp.id);
                        const prereqCnt = rels.prerequisites.length;
                        const nextCnt = rels.dependents.length;

                        return `
                          <div class="group rounded-xl border p-3 transition cursor-pointer flex flex-col justify-between ${isAct ? 'border-[#0F766E] bg-[#F0FDFA] shadow-sm ring-1 ring-[#0F766E]' : 'border-slate-200 bg-white hover:border-[#0F766E]/60 hover:bg-slate-50/60'}" data-tree-select="${kp.id}">
                            <div>
                              <div class="flex items-start justify-between gap-2">
                                <span class="text-xs sm:text-sm font-bold ${isAct ? 'text-[#0F766E]' : 'text-slate-800 group-hover:text-[#0F766E]'}">${escapeHtml(kp.name)}</span>
                                <span class="px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${isAct ? 'bg-[#0F766E] text-white' : 'bg-slate-100 text-slate-700'}">${qList.length} 题</span>
                              </div>
                              <p class="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">${escapeHtml(kp.description)}</p>
                            </div>
                            <div class="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
                              ${isStudentMode ? `
                                <div class="flex items-center gap-2 text-slate-500">
                                  <span class="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">前置 ${prereqCnt}</span>
                                  <span class="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">后续 ${nextCnt}</span>
                                </div>
                              ` : `
                                <div class="flex items-center gap-2 text-slate-500">
                                  <span>核心考查 <b class="text-[#0F766E]">${primaryCnt}</b> 题</span>
                                  <span>·</span>
                                  <span>综合/次要 <b>${qList.length - primaryCnt}</b> 题</span>
                                </div>
                              `}
                              <button type="button" class="text-[#0F766E] font-semibold hover:underline" data-switch-net="${kp.id}">关系网 &rarr;</button>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');

      // Attach listeners
      container.querySelectorAll('[data-tree-toggle]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-tree-toggle');
          if (window.GraphState.expandedIds.has(id)) {
            window.GraphState.expandedIds.delete(id);
          } else {
            window.GraphState.expandedIds.add(id);
          }
          window.GraphState.savePersisted();
          this.render();
        });
      });

      container.querySelectorAll('[data-tree-select]').forEach(el => {
        el.addEventListener('click', (e) => {
          if (e.target.closest('[data-switch-net]') || e.target.closest('[data-tree-toggle]')) return;
          const id = el.getAttribute('data-tree-select');
          window.GraphFilter.selectNode(id);
        });
      });

      container.querySelectorAll('[data-switch-net]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-switch-net');
          window.GraphState.selectedNodeId = id;
          window.GraphFilter.setViewMode('network');
        });
      });

      // Expand All / Collapse All buttons
      const btnExpandAll = document.getElementById('btnGraphExpandAll');
      const btnCollapseAll = document.getElementById('btnGraphCollapseAll');
      if (btnExpandAll && !btnExpandAll.dataset.bound) {
        btnExpandAll.dataset.bound = '1';
        btnExpandAll.addEventListener('click', () => {
          (window.GraphData.allNodes || []).forEach(n => {
            if (n.level < 3) window.GraphState.expandedIds.add(n.id);
          });
          window.GraphState.savePersisted();
          this.render();
        });
      }
      if (btnCollapseAll && !btnCollapseAll.dataset.bound) {
        btnCollapseAll.dataset.bound = '1';
        btnCollapseAll.addEventListener('click', () => {
          window.GraphState.expandedIds.clear();
          // Keep top domains open so tree isn't completely shut
          window.GraphData.getChildren(null).forEach(d => window.GraphState.expandedIds.add(d.id));
          window.GraphState.savePersisted();
          this.render();
        });
      }
    }
  };

  window.GraphTree = GraphTree;
})();
