// 题典网「题目图谱」核心数据索引与校验引擎 (graph-data.js)
(function () {
  const GraphData = {
    initialized: false,
    knowledgeById: new Map(),
    childrenByParentId: new Map(),
    questionsByKnowledge: new Map(), // knowledgeId -> Array<{ question, role, status }>
    directQuestionsByKnowledge: new Map(), // knowledgeId -> Array<{ question, role, status }>
    knowledgeByQuestion: new Map(),  // questionId -> Array<{ node, role, status }>
    relationsByKnowledge: new Map(), // knowledgeId -> { prerequisites: [], dependents: [], related: [] }
    questionById: new Map(),
    allNodes: [],
    allRelations: [],
    validationReport: null,

    init() {
      if (this.initialized) return this;
      this.knowledgeById.clear();
      this.childrenByParentId.clear();
      this.questionsByKnowledge.clear();
      this.directQuestionsByKnowledge.clear();
      this.knowledgeByQuestion.clear();
      this.relationsByKnowledge.clear();
      this.questionById.clear();

      const rawNodes = Array.isArray(window.KNOWLEDGE_NODES) ? window.KNOWLEDGE_NODES : [];
      const rawRelations = Array.isArray(window.KNOWLEDGE_RELATIONS) ? window.KNOWLEDGE_RELATIONS : [];
      const rawMappings = Array.isArray(window.QUESTION_KNOWLEDGE)
        ? window.QUESTION_KNOWLEDGE
        : (Array.isArray(window.QUESTION_KNOWLEDGE_MAP) ? window.QUESTION_KNOWLEDGE_MAP : []);
      const rawQuestions = Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK : [];

      rawQuestions.forEach(q => {
        if (q && q.id) this.questionById.set(q.id, q);
      });

      // 1. Index published/reviewed knowledge nodes
      this.allNodes = rawNodes.filter(n => n && n.id && (n.status === 'published' || n.status === 'reviewed'));
      this.allNodes.forEach(node => {
        this.knowledgeById.set(node.id, node);
        this.questionsByKnowledge.set(node.id, []);
        this.directQuestionsByKnowledge.set(node.id, []);
        this.relationsByKnowledge.set(node.id, {
          prerequisites: [], // source -> this (need to learn source first)
          dependents: [],    // this -> target (this is prerequisite for target)
          related: []        // undirected lateral connection
        });
      });

      // 2. Build parent -> children hierarchy
      this.allNodes.forEach(node => {
        const pid = node.parentId || null;
        if (!this.childrenByParentId.has(pid)) {
          this.childrenByParentId.set(pid, []);
        }
        this.childrenByParentId.get(pid).push(node);
      });

      // 3. Index reviewed relations (ignore draft/unreviewed or invalid node refs)
      this.allRelations = [];
      const seenRelKeys = new Set();
      rawRelations.forEach(rel => {
        if (!rel || (rel.status !== 'reviewed' && rel.status !== 'published')) return;
        const src = this.knowledgeById.get(rel.source);
        const tgt = this.knowledgeById.get(rel.target);
        if (!src || !tgt || rel.source === rel.target) return;

        const key = rel.relation === 'related'
          ? [rel.source, rel.target].sort().join('<->') + ':related'
          : `${rel.source}->${rel.target}:${rel.relation}`;
        if (seenRelKeys.has(key)) return;
        seenRelKeys.add(key);

        this.allRelations.push(rel);

        if (rel.relation === 'prerequisite') {
          this.relationsByKnowledge.get(rel.target).prerequisites.push({
            node: src,
            relation: 'prerequisite',
            description: rel.description || ''
          });
          this.relationsByKnowledge.get(rel.source).dependents.push({
            node: tgt,
            relation: 'prerequisite',
            description: rel.description || ''
          });
        } else if (rel.relation === 'related') {
          this.relationsByKnowledge.get(rel.source).related.push({
            node: tgt,
            relation: 'related',
            description: rel.description || ''
          });
          this.relationsByKnowledge.get(rel.target).related.push({
            node: src,
            relation: 'related',
            description: rel.description || ''
          });
        }
      });

      // 4. Index reviewed question-knowledge mappings
      const validRoles = new Set(['primary', 'secondary', 'comprehensive']);
      rawMappings.forEach(item => {
        if (!item || (item.status !== 'reviewed' && item.status !== 'published')) return;
        const q = this.questionById.get(item.questionId);
        if (!q || !Array.isArray(item.knowledgeIds)) return;

        const qEntries = [];
        item.knowledgeIds.forEach(kid => {
          const node = this.knowledgeById.get(kid);
          if (!node) return;
          const role = (item.roles && validRoles.has(item.roles[kid])) ? item.roles[kid] : 'primary';
          qEntries.push({ node, role, status: item.status });
          this.directQuestionsByKnowledge.get(kid).push({ question: q, role, status: item.status });
        });

        if (qEntries.length > 0) {
          this.knowledgeByQuestion.set(q.id, qEntries);
        }
      });

      // 5. Roll up question associations from child nodes to ancestor nodes
      const getDescendantIds = (nodeId, visited = new Set()) => {
        if (visited.has(nodeId)) return [];
        visited.add(nodeId);
        const children = this.childrenByParentId.get(nodeId) || [];
        let ids = [nodeId];
        children.forEach(ch => {
          ids = ids.concat(getDescendantIds(ch.id, visited));
        });
        return ids;
      };

      const rolePriority = { primary: 1, secondary: 2, comprehensive: 3 };
      this.allNodes.forEach(node => {
        const descIds = getDescendantIds(node.id);
        const mergedByQId = new Map();
        descIds.forEach(did => {
          const list = this.directQuestionsByKnowledge.get(did) || [];
          list.forEach(entry => {
            const qid = entry.question.id;
            const existing = mergedByQId.get(qid);
            if (!existing || rolePriority[entry.role] < rolePriority[existing.role]) {
              mergedByQId.set(qid, entry);
            }
          });
        });
        this.questionsByKnowledge.set(node.id, Array.from(mergedByQId.values()));
      });

      this.initialized = true;
      return this;
    },

    getNode(id) {
      if (!this.initialized) this.init();
      return this.knowledgeById.get(id) || null;
    },

    getChildren(parentId = null) {
      if (!this.initialized) this.init();
      return this.childrenByParentId.get(parentId) || [];
    },

    getParent(nodeId) {
      const node = this.getNode(nodeId);
      if (!node || !node.parentId) return null;
      return this.getNode(node.parentId);
    },

    getAncestors(nodeId) {
      const ancestors = [];
      let curr = this.getParent(nodeId);
      const guard = new Set();
      while (curr && !guard.has(curr.id)) {
        guard.add(curr.id);
        ancestors.unshift(curr);
        curr = this.getParent(curr.id);
      }
      return ancestors;
    },

    getQuestionsForNode(nodeId, includeDescendants = true) {
      if (!this.initialized) this.init();
      const map = includeDescendants ? this.questionsByKnowledge : this.directQuestionsByKnowledge;
      return map.get(nodeId) || [];
    },

    getKnowledgeForQuestion(questionId) {
      if (!this.initialized) this.init();
      return this.knowledgeByQuestion.get(questionId) || [];
    },

    getRelationsForNode(nodeId) {
      if (!this.initialized) this.init();
      return this.relationsByKnowledge.get(nodeId) || { prerequisites: [], dependents: [], related: [] };
    },

    // Normalize grade naming ("初一" <-> "七年级", etc.)
    normalizeGradeName(g) {
      const map = {
        '小学六年级': '六年级',
        '六年级': '六年级',
        '初一': '七年级',
        '七年级': '七年级',
        '初二': '八年级',
        '八年级': '八年级',
        '初三': '九年级',
        '九年级': '九年级'
      };
      return map[g] || g;
    },

    // Data validation utility per PRD Section 6 Step 6 & Section 11
    validateAll() {
      if (!this.initialized) this.init();
      const rawNodes = Array.isArray(window.KNOWLEDGE_NODES) ? window.KNOWLEDGE_NODES : [];
      const rawRelations = Array.isArray(window.KNOWLEDGE_RELATIONS) ? window.KNOWLEDGE_RELATIONS : [];
      const rawMappings = Array.isArray(window.QUESTION_KNOWLEDGE)
        ? window.QUESTION_KNOWLEDGE
        : (Array.isArray(window.QUESTION_KNOWLEDGE_MAP) ? window.QUESTION_KNOWLEDGE_MAP : []);

      const errors = [];
      const seenNodeIds = new Set();
      rawNodes.forEach(n => {
        if (!n || !n.id) {
          errors.push('存在缺少 ID 的知识节点');
        } else if (seenNodeIds.has(n.id)) {
          errors.push(`知识节点 ID 重复: ${n.id}`);
        } else {
          seenNodeIds.add(n.id);
        }
      });

      rawNodes.forEach(n => {
        if (n.parentId && !seenNodeIds.has(n.parentId)) {
          errors.push(`节点 ${n.id} 的 parentId 不存在: ${n.parentId}`);
        }
        // Check cycle
        const visited = new Set([n.id]);
        let currParent = n.parentId;
        while (currParent) {
          if (visited.has(currParent)) {
            errors.push(`节点 ${n.id} 存在循环层级引用`);
            break;
          }
          visited.add(currParent);
          const pObj = this.knowledgeById.get(currParent);
          currParent = pObj ? pObj.parentId : null;
        }
      });

      const seenRelPairs = new Set();
      rawRelations.forEach((r, idx) => {
        if (!seenNodeIds.has(r.source) || !seenNodeIds.has(r.target)) {
          errors.push(`关系 #${idx} 引用了无效的知识节点: ${r.source} -> ${r.target}`);
        }
        const key = r.relation === 'related'
          ? [r.source, r.target].sort().join('<->') + ':related'
          : `${r.source}->${r.target}:${r.relation}`;
        if (seenRelPairs.has(key)) {
          errors.push(`存在重复的知识关系: ${key}`);
        }
        seenRelPairs.add(key);
      });

      const validRoles = new Set(['primary', 'secondary', 'comprehensive']);
      rawMappings.forEach(m => {
        if (!this.questionById.has(m.questionId)) {
          errors.push(`题目关联指向不存在的 questionId: ${m.questionId}`);
        }
        if (!Array.isArray(m.knowledgeIds) || m.knowledgeIds.length === 0) {
          errors.push(`题目 ${m.questionId} 的 knowledgeIds 为空`);
        } else {
          m.knowledgeIds.forEach(kid => {
            if (!seenNodeIds.has(kid)) {
              errors.push(`题目 ${m.questionId} 引用了无效的 knowledgeId: ${kid}`);
            }
          });
          if (m.roles) {
            Object.entries(m.roles).forEach(([rk, rv]) => {
              if (!m.knowledgeIds.includes(rk)) {
                errors.push(`题目 ${m.questionId} 的 roles 键 ${rk} 不在 knowledgeIds 中`);
              }
              if (!validRoles.has(rv)) {
                errors.push(`题目 ${m.questionId} 的关联角色 ${rv} 不合法`);
              }
            });
          }
        }
      });

      this.validationReport = {
        valid: errors.length === 0,
        nodeCount: rawNodes.length,
        relationCount: rawRelations.length,
        mappedQuestionCount: rawMappings.length,
        errors
      };
      return this.validationReport;
    }
  };

  window.GraphData = GraphData;
})();
