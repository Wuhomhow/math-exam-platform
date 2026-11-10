// 题典网「题目图谱」原生 SVG 网络关系图引擎 (graph-network.js)
(function () {
  function escapeSvg(str) {
    return String(str || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  const GraphNetwork = {
    transform: { x: 0, y: 0, scale: 1 },
    nodePositions: new Map(), // nodeId -> { x, y, role, node }
    edges: [],                // Array<{ id, source, target, relation, description }>
    isDraggingCanvas: false,
    dragStart: { x: 0, y: 0 },
    draggingNodeId: null,
    dragNodeOffset: { x: 0, y: 0 },
    hasMovedDuringDrag: false,
    boundEvents: false,

    render(options = {}) {
      const svg = document.getElementById('graphNetworkSvg');
      if (!svg || !window.GraphData) return;

      if (!this.boundEvents) {
        this.bindSvgInteractions(svg);
        this.boundEvents = true;
      }

      const centerId = window.GraphState.selectedNodeId;
      const centerNode = window.GraphData.getNode(centerId);
      if (!centerNode) return;

      if (!options.keepNetworkTransform) {
        this.transform = { x: 0, y: 0, scale: 1 };
        this.buildLocalSubgraphLayout(centerNode);
      } else if (!this.nodePositions.has(centerId)) {
        this.buildLocalSubgraphLayout(centerNode);
      }

      this.drawSvg(svg, centerNode);
      this.renderRelationBanner();
    },

    // Build local subgraph around centerNode (1-hop or 2-hop)
    buildLocalSubgraphLayout(centerNode) {
      this.nodePositions.clear();
      this.edges = [];

      const W = 860;
      const H = 520;
      const cx = W / 2;
      const cy = H / 2;

      const addedNodes = new Map();
      const addNode = (node, x, y, role) => {
        if (!node || addedNodes.has(node.id)) return;
        addedNodes.set(node.id, { node, x, y, role });
      };

      const seenEdgeKeys = new Set();
      const addEdge = (srcId, tgtId, relation, description) => {
        if (!srcId || !tgtId || srcId === tgtId) return;
        const key = relation === 'related'
          ? [srcId, tgtId].sort().join('<->') + ':related'
          : `${srcId}->${tgtId}:${relation}`;
        if (seenEdgeKeys.has(key)) return;
        seenEdgeKeys.add(key);
        this.edges.push({
          id: key,
          source: srcId,
          target: tgtId,
          relation,
          description: description || ''
        });
      };

      // 1. Place Center Node
      addNode(centerNode, cx, cy, 'center');

      // 2. Hierarchy Parent (Top) & Children (Bottom)
      const parent = window.GraphData.getParent(centerNode.id);
      if (parent) {
        addNode(parent, cx, 78, 'parent');
        addEdge(parent.id, centerNode.id, 'hierarchy', `「${parent.name}」包含下级知识「${centerNode.name}」`);
      }

      const children = window.GraphData.getChildren(centerNode.id)
        .filter(ch => window.GraphFilter.nodeOrDescendantMatches(ch));
      if (children.length > 0) {
        const maxShow = Math.min(children.length, 6);
        const slice = children.slice(0, maxShow);
        const spanX = Math.min(680, Math.max(220, (slice.length - 1) * 145));
        const startX = cx - spanX / 2;
        slice.forEach((ch, idx) => {
          const x = slice.length === 1 ? cx : startX + (idx * spanX) / (slice.length - 1);
          const y = 430 + (idx % 2 === 1 && slice.length > 3 ? 22 : 0);
          addNode(ch, x, y, 'child');
          addEdge(centerNode.id, ch.id, 'hierarchy', `「${centerNode.name}」包含下级考点「${ch.name}」`);
        });
      }

      // 3. Direct Prerequisite (Left), Dependent (Right), Related (Upper/Lower Diagonal)
      const rels = window.GraphData.getRelationsForNode(centerNode.id);

      // Prerequisites (Left Column)
      const prereqs = rels.prerequisites || [];
      prereqs.forEach((item, idx) => {
        const count = prereqs.length;
        const spanY = Math.min(260, Math.max(0, (count - 1) * 88));
        const startY = cy - spanY / 2;
        const y = count === 1 ? cy : startY + (idx * spanY) / (count - 1);
        const x = 155 - (idx % 2) * 18;
        addNode(item.node, x, y, 'prerequisite');
        addEdge(item.node.id, centerNode.id, 'prerequisite', item.description);
      });

      // Dependents (Right Column)
      const deps = rels.dependents || [];
      deps.forEach((item, idx) => {
        const count = deps.length;
        const spanY = Math.min(260, Math.max(0, (count - 1) * 88));
        const startY = cy - spanY / 2;
        const y = count === 1 ? cy : startY + (idx * spanY) / (count - 1);
        const x = W - 155 + (idx % 2) * 18;
        addNode(item.node, x, y, 'dependent');
        addEdge(centerNode.id, item.node.id, 'prerequisite', item.description);
      });

      // Related (Diagonals)
      const relatedList = rels.related || [];
      relatedList.forEach((item, idx) => {
        const angle = (idx % 2 === 0 ? -1 : 1) * (Math.PI / 3.2) + (idx >= 2 ? 0.35 : 0);
        const rx = cx + Math.cos(angle) * 205 * (idx % 2 === 0 ? -1 : 1);
        const ry = cy + (idx % 2 === 0 ? -135 : 135);
        addNode(item.node, rx, ry, 'related');
        addEdge(centerNode.id, item.node.id, 'related', item.description);
      });

      // 4. If 2-hop depth is enabled, add 2nd-hop prerequisite/dependent neighbors
      if (window.GraphState.networkHopDepth === 2) {
        prereqs.forEach((pItem) => {
          const subRels = window.GraphData.getRelationsForNode(pItem.node.id);
          (subRels.prerequisites || []).slice(0, 2).forEach((sub, sIdx) => {
            const pos = addedNodes.get(pItem.node.id);
            const x = Math.max(76, (pos ? pos.x : 150) - 110);
            const y = Math.min(H - 55, Math.max(55, (pos ? pos.y : cy) + (sIdx === 0 ? -62 : 62)));
            addNode(sub.node, x, y, 'hop2');
            addEdge(sub.node.id, pItem.node.id, 'prerequisite', sub.description);
          });
        });

        deps.forEach((dItem) => {
          const subRels = window.GraphData.getRelationsForNode(dItem.node.id);
          (subRels.dependents || []).slice(0, 2).forEach((sub, sIdx) => {
            const pos = addedNodes.get(dItem.node.id);
            const x = Math.min(W - 76, (pos ? pos.x : W - 150) + 110);
            const y = Math.min(H - 55, Math.max(55, (pos ? pos.y : cy) + (sIdx === 0 ? -62 : 62)));
            addNode(sub.node, x, y, 'hop2');
            addEdge(dItem.node.id, sub.node.id, 'prerequisite', sub.description);
          });
        });
      }

      // 5. If centerNode has no children (Level 3 leaf node) and has siblings under the same chapter module,
      // place up to 3 sibling nodes in the bottom row so the lower half of the network canvas is balanced and informative
      if (children.length === 0 && parent) {
        const siblings = window.GraphData.getChildren(parent.id)
          .filter(s => s.id !== centerNode.id && !addedNodes.has(s.id))
          .slice(0, 3);
        if (siblings.length > 0) {
          const spanX = Math.min(540, Math.max(200, (siblings.length - 1) * 185));
          const startX = cx - spanX / 2;
          siblings.forEach((sib, idx) => {
            const x = siblings.length === 1 ? cx : startX + (idx * spanX) / (siblings.length - 1);
            const y = 425;
            addNode(sib, x, y, 'sibling');
            addEdge(parent.id, sib.id, 'hierarchy', `同章关联考点：「${parent.name}」包含「${sib.name}」`);
          });
        }
      }

      // Filter edges so both endpoints exist in addedNodes
      this.edges = this.edges.filter(e => addedNodes.has(e.source) && addedNodes.has(e.target));
      this.nodePositions = addedNodes;
    },

    drawSvg(svg, centerNode) {
      const { x, y, scale } = this.transform;

      // Role visual styles
      const roleColors = {
        center:       { fill: '#0F766E', stroke: '#115E59', text: '#FFFFFF', badge: '当前选中' },
        parent:       { fill: '#F8FAFC', stroke: '#64748B', text: '#1E293B', badge: '上级章节' },
        child:        { fill: '#F0FDFA', stroke: '#0D9488', text: '#115E59', badge: '下级考点' },
        sibling:      { fill: '#F0FDFA', stroke: '#5EEAD4', text: '#115E59', badge: '同章考点' },
        prerequisite: { fill: '#FFFBEB', stroke: '#D97706', text: '#92400E', badge: '前置知识' },
        dependent:    { fill: '#EEF2FF', stroke: '#4F46E5', text: '#3730A3', badge: '后续进阶' },
        related:      { fill: '#FDF2F8', stroke: '#DB2777', text: '#9D174D', badge: '横向关联' },
        hop2:         { fill: '#F8FAFC', stroke: '#CBD5E1', text: '#64748B', badge: '扩展节点' }
      };

      const edgesHtml = this.edges.map((edge, idx) => {
        const sPos = this.nodePositions.get(edge.source);
        const tPos = this.nodePositions.get(edge.target);
        if (!sPos || !tPos) return '';

        const isSelectedEdge = window.GraphState.activeRelationEdge && window.GraphState.activeRelationEdge.id === edge.id;
        let strokeColor = '#94A3B8';
        let dash = '';
        let markerEnd = 'url(#arrowHierarchy)';
        let labelText = '包含';

        if (edge.relation === 'prerequisite') {
          strokeColor = isSelectedEdge ? '#B45309' : '#D97706';
          markerEnd = 'url(#arrowPrereq)';
          labelText = '前置';
        } else if (edge.relation === 'related') {
          strokeColor = isSelectedEdge ? '#BE185D' : '#DB2777';
          dash = '6,4';
          markerEnd = '';
          labelText = '关联';
        } else {
          strokeColor = isSelectedEdge ? '#0F766E' : '#94A3B8';
          dash = '3,3';
          labelText = '包含';
        }

        // Shorten line slightly so arrowhead sits cleanly outside target node box
        const dx = tPos.x - sPos.x;
        const dy = tPos.y - sPos.y;
        const dist = Math.hypot(dx, dy) || 1;
        const padStart = 36;
        const padEnd = edge.relation === 'related' ? 36 : 44;
        const x1 = dist > padStart + padEnd ? sPos.x + (dx / dist) * padStart : sPos.x;
        const y1 = dist > padStart + padEnd ? sPos.y + (dy / dist) * padStart : sPos.y;
        const x2 = dist > padStart + padEnd ? tPos.x - (dx / dist) * padEnd : tPos.x;
        const y2 = dist > padStart + padEnd ? tPos.y - (dy / dist) * padEnd : tPos.y;

        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        return `
          <g class="graph-svg-edge cursor-pointer" data-edge-index="${idx}">
            <!-- Invisible wider hit line for easy clicking -->
            <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="transparent" stroke-width="14" />
            <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                  stroke="${strokeColor}"
                  stroke-width="${isSelectedEdge ? '3' : '2'}"
                  ${dash ? `stroke-dasharray="${dash}"` : ''}
                  ${markerEnd ? `marker-end="${markerEnd}"` : ''} />
            <rect x="${mx - 18}" y="${my - 9}" width="36" height="18" rx="9"
                  fill="${isSelectedEdge ? strokeColor : '#FFFFFF'}"
                  stroke="${strokeColor}" stroke-width="1" />
            <text x="${mx}" y="${my + 3.5}" text-anchor="middle" font-size="10" font-weight="600"
                  fill="${isSelectedEdge ? '#FFFFFF' : strokeColor}">${labelText}</text>
          </g>
        `;
      }).join('');

      const nodesHtml = Array.from(this.nodePositions.values()).map(item => {
        const { node, x: nx, y: ny, role } = item;
        const st = roleColors[role] || roleColors.hop2;
        const qCount = window.GraphData.getQuestionsForNode(node.id, true).length;
        const isCenter = role === 'center';
        const isWeak = role === 'hop2' || role === 'sibling';

        // Truncate display name nicely
        const displayName = node.name.length > 12 ? node.name.slice(0, 11) + '…' : node.name;
        const boxW = isCenter ? 156 : 138;
        const boxH = isCenter ? 60 : 52;
        const halfW = boxW / 2;
        const halfH = boxH / 2;

        return `
          <g class="graph-svg-node cursor-grab" data-node-id="${node.id}" transform="translate(${nx}, ${ny})" opacity="${isWeak ? '0.88' : '1'}">
            <rect x="${-halfW}" y="${-halfH + 2}" width="${boxW}" height="${boxH}" rx="12"
                  fill="#0F172A" fill-opacity="0.06" />
            <rect x="${-halfW}" y="${-halfH}" width="${boxW}" height="${boxH}" rx="12"
                  fill="${st.fill}" stroke="${st.stroke}" stroke-width="${isCenter ? '2.5' : '1.8'}" />
            <!-- Role & question count top mini bar -->
            <text x="${-halfW + 10}" y="${-halfH + 16}" font-size="9.5" font-weight="700"
                  fill="${isCenter ? '#CCFBF1' : st.stroke}">${escapeSvg(st.badge)}</text>
            <text x="${halfW - 10}" y="${-halfH + 16}" text-anchor="end" font-size="9.5" font-weight="700"
                  fill="${isCenter ? '#FFFFFF' : '#64748B'}">${qCount}题</text>
            <!-- Main Node Title -->
            <text x="0" y="${halfH - 13}" text-anchor="middle" font-size="${isCenter ? '12.5' : '11.5'}" font-weight="700"
                  fill="${st.text}">${escapeSvg(displayName)}</text>
          </g>
        `;
      }).join('');

      svg.innerHTML = `
        <defs>
          <marker id="arrowPrereq" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#D97706" />
          </marker>
          <marker id="arrowHierarchy" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#94A3B8" />
          </marker>
        </defs>
        <g id="graphSvgViewport" transform="translate(${x}, ${y}) scale(${scale})">
          ${edgesHtml}
          ${nodesHtml}
        </g>
      `;

      // Update depth toggle button text
      const hopBtn = document.getElementById('btnGraphToggleHop');
      if (hopBtn) {
        hopBtn.textContent = window.GraphState.networkHopDepth === 2 ? '收起至直接关系 (1跳)' : '扩展二度关系 (2跳)';
        hopBtn.classList.toggle('bg-[#F0FDFA]', window.GraphState.networkHopDepth === 2);
        hopBtn.classList.toggle('text-[#0F766E]', window.GraphState.networkHopDepth === 2);
      }
    },

    renderRelationBanner() {
      const banner = document.getElementById('graphNetworkEdgeInfo');
      if (!banner) return;
      const edge = window.GraphState.activeRelationEdge;
      if (!edge) {
        banner.innerHTML = `
          <span class="text-slate-400">💡 提示：点击节点可切换中心知识点；拖动节点可调整位置；点击连线标签可查看具体教学关系依据。</span>
        `;
        return;
      }

      const srcNode = window.GraphData.getNode(edge.source);
      const tgtNode = window.GraphData.getNode(edge.target);
      const typeLabel = edge.relation === 'prerequisite'
        ? '<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">前置关系</span>'
        : edge.relation === 'related'
        ? '<span class="px-2 py-0.5 rounded bg-pink-100 text-pink-800 font-bold">横向关联</span>'
        : '<span class="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">上下级包含</span>';

      banner.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 w-full">
          <div class="flex flex-wrap items-center gap-2 text-xs">
            ${typeLabel}
            <span class="font-bold text-slate-800">${escapeSvg(srcNode?.name || edge.source)}</span>
            <span class="text-slate-400">${edge.relation === 'related' ? '↔' : '→'}</span>
            <span class="font-bold text-[#0F766E]">${escapeSvg(tgtNode?.name || edge.target)}</span>
            <span class="text-slate-300">|</span>
            <span class="text-slate-600">${escapeSvg(edge.description || '存在知识关联')}</span>
          </div>
          <button type="button" id="btnCloseEdgeInfo" class="text-slate-400 hover:text-slate-600 text-xs">✕</button>
        </div>
      `;

      banner.querySelector('#btnCloseEdgeInfo')?.addEventListener('click', () => {
        window.GraphState.activeRelationEdge = null;
        this.render({ keepNetworkTransform: true });
      });
    },

    bindSvgInteractions(svg) {
      const getSvgCoords = (clientX, clientY) => {
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const ctm = svg.getScreenCTM();
        if (!ctm) return { x: clientX, y: clientY };
        return pt.matrixTransform(ctm.inverse());
      };

      svg.addEventListener('pointerdown', (e) => {
        const nodeEl = e.target.closest('.graph-svg-node');
        const edgeEl = e.target.closest('.graph-svg-edge');

        if (edgeEl) {
          const idx = Number(edgeEl.getAttribute('data-edge-index'));
          if (this.edges[idx]) {
            window.GraphState.activeRelationEdge = this.edges[idx];
            this.render({ keepNetworkTransform: true });
          }
          return;
        }

        const svgPt = getSvgCoords(e.clientX, e.clientY);

        if (nodeEl) {
          const nid = nodeEl.getAttribute('data-node-id');
          const pos = this.nodePositions.get(nid);
          if (pos) {
            this.draggingNodeId = nid;
            this.hasMovedDuringDrag = false;
            const worldX = (svgPt.x - this.transform.x) / this.transform.scale;
            const worldY = (svgPt.y - this.transform.y) / this.transform.scale;
            this.dragNodeOffset = { x: worldX - pos.x, y: worldY - pos.y };
            svg.setPointerCapture(e.pointerId);
          }
          return;
        }

        // Otherwise canvas pan
        this.isDraggingCanvas = true;
        this.hasMovedDuringDrag = false;
        this.dragStart = { x: svgPt.x - this.transform.x, y: svgPt.y - this.transform.y };
        svg.setPointerCapture(e.pointerId);
      });

      svg.addEventListener('pointermove', (e) => {
        if (!this.draggingNodeId && !this.isDraggingCanvas) return;
        const svgPt = getSvgCoords(e.clientX, e.clientY);

        if (this.draggingNodeId) {
          const pos = this.nodePositions.get(this.draggingNodeId);
          if (pos) {
            const worldX = (svgPt.x - this.transform.x) / this.transform.scale;
            const worldY = (svgPt.y - this.transform.y) / this.transform.scale;
            const nx = worldX - this.dragNodeOffset.x;
            const ny = worldY - this.dragNodeOffset.y;
            if (Math.hypot(nx - pos.x, ny - pos.y) > 3) {
              this.hasMovedDuringDrag = true;
            }
            pos.x = nx;
            pos.y = ny;
            this.drawSvg(svg, window.GraphData.getNode(window.GraphState.selectedNodeId));
          }
          return;
        }

        if (this.isDraggingCanvas) {
          const nx = svgPt.x - this.dragStart.x;
          const ny = svgPt.y - this.dragStart.y;
          if (Math.hypot(nx - this.transform.x, ny - this.transform.y) > 3) {
            this.hasMovedDuringDrag = true;
          }
          this.transform.x = nx;
          this.transform.y = ny;
          const vp = svg.querySelector('#graphSvgViewport');
          if (vp) {
            vp.setAttribute('transform', `translate(${this.transform.x}, ${this.transform.y}) scale(${this.transform.scale})`);
          }
        }
      });

      const endPointer = (e) => {
        if (this.draggingNodeId) {
          const clickedId = this.draggingNodeId;
          const moved = this.hasMovedDuringDrag;
          this.draggingNodeId = null;
          if (!moved && clickedId !== window.GraphState.selectedNodeId) {
            window.GraphFilter.selectNode(clickedId);
          }
        }
        this.isDraggingCanvas = false;
      };

      svg.addEventListener('pointerup', endPointer);
      svg.addEventListener('pointercancel', endPointer);

      // Wheel zoom
      svg.addEventListener('wheel', (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        const newScale = Math.min(2.2, Math.max(0.55, this.transform.scale * factor));
        this.transform.scale = newScale;
        const vp = svg.querySelector('#graphSvgViewport');
        if (vp) {
          vp.setAttribute('transform', `translate(${this.transform.x}, ${this.transform.y}) scale(${this.transform.scale})`);
        }
      }, { passive: false });

      // Toolbar controls
      document.getElementById('btnGraphZoomIn')?.addEventListener('click', () => {
        this.transform.scale = Math.min(2.2, this.transform.scale * 1.15);
        this.render({ keepNetworkTransform: true });
      });

      document.getElementById('btnGraphZoomOut')?.addEventListener('click', () => {
        this.transform.scale = Math.max(0.55, this.transform.scale * 0.85);
        this.render({ keepNetworkTransform: true });
      });

      document.getElementById('btnGraphResetLayout')?.addEventListener('click', () => {
        window.GraphState.activeRelationEdge = null;
        this.render({ keepNetworkTransform: false });
      });

      document.getElementById('btnGraphToggleHop')?.addEventListener('click', () => {
        window.GraphState.networkHopDepth = window.GraphState.networkHopDepth === 2 ? 1 : 2;
        this.render({ keepNetworkTransform: false });
      });
    }
  };

  window.GraphNetwork = GraphNetwork;
})();
