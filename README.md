# 题典网（math-exam-platform）

> 好题成典，组卷有方 —— 面向六至九年级数学教学的纯前端题库检索、知识图谱、程序性知识动态演示与 Word 组卷导出平台。

## 核心功能

* **题库选题与检索**：按年级/册次/章节目录、题型（单选/填空/判断/解答）、四档难度（`容易`、`较易`、`中等`、`较难`）及关键词快速筛题，支持分页、本页全选入篮、相似题「举一反三」和单题高清截图复制。
* **数学知识图谱**：覆盖六至九年级知识节点与先修关系，支持树状视图与 SVG 网络视图双向联动。
* **程序性知识工作台**：按教材章节组织程序性知识卡片，内置 60fps 动态黑板分步演示与关联题目抽屉。
* **试卷排版与 Word 导出**：支持学生卷 / 教师解析卷、单栏 / 双栏、按加入顺序 / 按题型分组切换；支持浏览器直接打印/存 PDF，以及导出含原生 Word OMML 公式与插图的 `.docx` 文件。

## 目录结构

```text
math-exam-platform/
├── index.html                          # 单页应用入口
├── css/
│   └── style.css                       # 样式表
├── assets/
│   └── images/                         # 题目配图原图资源
├── js/
│   ├── main.js                         # 事件绑定、引导与主启动流程
│   ├── data/                           # 题库、知识图谱、程序性知识与离线 Base64 分片数据
│   │   ├── questions.js                # 主题库数据（QUESTION_BANK）
│   │   ├── knowledge-nodes.js          # 知识图谱节点
│   │   ├── knowledge-relations.js      # 知识图谱先修/关联关系
│   │   ├── question-knowledge.js       # 题目-知识点关联（需与 questions.js 100% 同步）
│   │   ├── curriculum-catalog.js       # 共享小节级标准目录配置
│   │   ├── question-catalog-map.js     # 题目-标准小节映射表
│   │   ├── procedural-knowledge.js     # 程序性知识正文
│   │   ├── question-procedures.js      # 题目-程序性知识关联
│   │   ├── procedural-dynamic-demos.js # 动态黑板演示数据（按需加载）
│   │   └── images-base64-part1~4.js    # 离线 file:// 环境图片兜底分片（按需加载）
│   ├── modules/
│   │   ├── state.js                    # 状态管理与本地存储
│   │   ├── render.js                   # 视图切换、题库渲染、截图与模块按需加载器
│   │   ├── docx-export.js              # 原生 OMML 公式与 .docx 导出引擎（按需加载）
│   │   ├── knowledge-graph/            # 知识图谱索引与视图模块
│   │   └── procedural/                 # 程序性知识视图模块（按需加载）
│   └── utils/                          # 数学公式渲染、相似题与提示工具
├── scripts/
│   └── check-math-quality.py           # 全站公式语法、OMML 转换与字段规范质检脚本
└── .github/workflows/
    └── math-quality.yml                # GitHub Actions 自动质检工作流
```

## 本地预览与部署

* **推荐本地预览（HTTP 模式，Word 导出与题卡截图将按需直拉原图，无需下载 Base64 分片）**：
  ```bash
  python3 -m http.server 8000
  ```
  然后在浏览器打开 `http://localhost:8000`。
* **离线打开**：也可直接双击 `index.html` 在浏览器中打开（导出带图 Word 或带图截图时会自动回退加载 Base64 分片）。
* **线上部署**：纯静态站点，直接推送至 GitHub `main` 分支并通过 GitHub Pages 发布即可。

## 数据维护与质量检查

每次新增题目、程序性知识或修改公式转换逻辑后，在项目根目录运行：

```bash
python3 scripts/check-math-quality.py
```

脚本会自动执行：
1. 7 项公式与 OMML 回归测试（含 `cases`、`matrix`、`\overline`、`\triangle`/`\Delta` 区分与 CDN 离线回退）。
2. 全站五类数据源的 `$...$` 定界符、花括号、环境配对、KaTeX 语法、备用渲染器与 Word OMML 转换扫描。
3. 题库字段规范校验：`knowledge` 非空、`difficulty` 严格属于 `容易 / 较易 / 中等 / 较难`、`chapter` 首尾无多余空格。

推送至 `main` 分支或创建 PR 时，GitHub Actions 会自动执行同一套质检脚本。

## 新题录入与多表同步流程（SOP）

从本地 Word（`.docx`）课后作业或试卷批量录题时，按以下 4 步闭环执行，可避免公式渲染异常或前端各视图题量不一致：

### 1. Word XML 解析与格式规范
* **OMML 公式转换**：完整解析 `w:p`、`m:oMath`、`w:vertAlign`（上下标）及 `w:tbl`，所有数学表达式统一用 `$...$` 包裹 LaTeX：
  * 方程组（`m:d` + `m:eqArr`/`m:m` 或裸露 `{... \\ ...`）统一转为 `\begin{cases}...\end{cases}`；
  * 弧符号（`m:groupChr`/`m:acc`/`m:limUpp` 含 `⏜`/`⌢`/`⌒`）统一转为 `\overset{\frown}{...}`，上划线转为 `\overline{...}`；
  * 避免在 `\overset{\frown}{...}` 内嵌套 `^{'}` 上标（应直接写 `BD'`），避免使用备用渲染器与 Word OMML 不支持的命令（如 `\underline`、`\mapsto`）；公式内的 `α`/`β` 转为 `\alpha`/`\beta`，命令后紧跟字母或数字时补空格（如 `\pi R^{2}`、`\because AB`）。
* **表格与选项处理**：若 `w:tbl` 单元格以 `A./B./C./D.` 开头则解析为单选题 `options` 数组；数据表则转为简洁的 HTML `<table>` 嵌入题干或解析。支持组卷网同行选项（如 `A．...B．...`）切分。
* **难度统一**：所有题目 `difficulty` 统一映射为 `容易`、`较易`、`中等`、`较难` 四档（文档中的 `适中` 映射为 `中等`；小数难度按 `≥0.90` 容易、`0.75–0.89` 较易、`0.55–0.74` 中等、`<0.55` 较难映射）。
* **试卷拆散规则**：期中/综合测试卷按每道题的【考点】拆散归入对应知识点章节，不放入成品卷分组。

### 2. 联合查重与冗余配图清理
* 去除题干中的 HTML 标签、试卷出处前缀（如 `（25-26九年级上·...）`）及标点空格后，采用「题干 + 选项」联合指纹与现有 `questions.js` 及本批次内部双重查重，剔除完全重复题目。
* 同步删除重复题对应的冗余图片，避免 `assets/images/` 中残留无引用图片。

### 3. 多表全同步清单（核心防漏点）
仅写入 `questions.js` 会导致知识图谱、考点侧边栏或标准小节目录的题量对不上。每次录题必须同步更新以下文件：
1. **`js/data/questions.js`**：追加去重后的新题，按各 `chapter` 顺延编号 `number` 与 `sectionNumber`，确保全库 `id` 唯一。
2. **`assets/images/` 与 `js/data/images-base64-part2.js`**：保存新提取配图并注册对应 Base64 条目，保障离线 `file://` 预览与 Word 导出。
3. **`js/data/question-knowledge.js`**：对照 `knowledge-nodes.js` 为每道新题补充 `knowledgeIds` 与 `roles`（`primary` / `secondary`），保持 **100% 全库覆盖**（考点侧边栏题量直接来源于此）。
4. **`js/data/curriculum-catalog.js` 与 `js/data/question-catalog-map.js`**：确认目标章与小节已在 `curriculum-catalog.js` 中定义，并将新题 ID 映射至对应 `sectionId` 与 `pedagogyTag`。
5. **`js/modules/state.js`**（仅新增全新章号时需要）：补充年级识别正则与侧边栏章节分组（如新增第 29、30 章）。
6. **`index.html`**：同步更新 `#allQuestionCount` 显示的总题数。
7. **`js/data/question-procedures.js`**（按需）：新增或关联程序性知识题目时，必须严格遵循下方《程序性知识添加与存量质检规范（SOP）》，满足纯程序性判定与极相似题 3 道上限后方可入主集合。

### 4. 全量质检与收尾
* 运行 `python3 scripts/check-math-quality.py`，核对 `questions.js` 与 Word 导出链路达到 **0 明确错误、0 疑似项**；
* 校验 `questions.js` ID 唯一性、`question-knowledge.js` 覆盖率 100%，以及新增配图均已注册至 Base64 分片；
* 确认无误后按需清理根目录原始 `.docx` 文件并提交推送。

## 程序性知识添加与存量质检规范（SOP）

后续所有新增程序性知识模块（`SCREENING` 筛选入库）与存量集合审计（`AUDIT` 剔除综合题与超限相似题），均须统一执行以下规范，确保程序性训练与普通章节题库边界清晰。

### 1. 红线规则与项目落库映射
1. **唯一依据**：所有操作级解题拆解必须 100% 源自 `js/data/questions.js` 中的**标准答案**，严禁外部搜索或自行脑补替代解法。
2. **原始数据只读**：严禁修改 `js/data/questions.js` 中的原始题干、选项、标准答案或原始题目结构。
3. **禁止物理复制**：程序性题目集合仅通过 `js/data/question-procedures.js` 中的引用 ID（`questionId` + `partId`）动态映射生成，严禁在集合中重复拷贝原题正文。
4. **共享目录架构**：严格沿用 `js/data/curriculum-catalog.js` 既有小节目录，不得自造平行目录。

| 规范字段 / 标签 | 本项目落库位置与字段映射 | 说明 |
| :--- | :--- | :--- |
| `sectionId` / `collectionName` | `js/data/procedural-knowledge.js`（`chapter`、`name`） | 沿用共享小节目录；统一以当前阶段**最新引入的核心知识**命名 |
| `dependencies` | `js/data/procedural-knowledge.js`（`prerequisites`、`prerequisiteProcedureIds`） | 解题中用到的旧知识不参与命名，仅记录为前置依赖 |
| `纯程序性`（`proceduralSet`） | `js/data/question-procedures.js`（默认展示条目） | 写入 `questionId`、`procedureId`、`partId`（单问 `null`，多问如 `'(1)'`）、连续递增的 `sortOrder`/`order`、`subType`（对应 `similarityGroup`）、`operationSummary` |
| `程序性扩充`（`divertedItems`） | `js/data/question-procedures.js`（`visibility: 'bank_only'`） | 属于纯程序性训练，但因极相似题已满 3 道或属同类变式巩固，不入主集合，供题库补充调用 |
| `综合拓展`（`divertedItems`） | 不写入程序性主集合 | 含额外建模、跨知识点综合或非纯步骤训练，剔除出主集合，归入综合训练体系 |

### 2. 筛选、分流与输出前强制自检
对每道题（或多小问题目的每个独立小问）依次执行以下 5 项判定：
1. **粒度拆解**：多小问题必须拆解至最小考查单元，通过 `partId` 精确关联，避免整题粗粒度引入无关考点。
2. **命名与依赖归属**：以当前学习阶段最新引入的核心知识命名；前置旧知识仅写入 `dependencies` / `prerequisites`。
3. **纯度与相关性判定**：须同时满足**纯程序性**（聚焦单一程序性技能、步骤紧凑明确且解题步骤不超出该 `Pxx` 定义的核心操作步骤）、**零额外建模**（不含额外数学建模、复杂情境转化或跨章节综合应用）、**演练强关联**（可直接映射到 `procedural-dynamic-demos.js` 动态教学演练的分步操作）。
4. **极相似题限流（上限 3 道）**：同一程序性知识点下，题型结构、运算路径与考查方式高度相似的题目（同一 `similarityGroup` / `subType`），主集合**最多保留 3 道**（优先保留步骤最标准、覆盖常见易错点或数值最简洁的 3 道），其余分流至 `程序性扩充`。
5. **全量标签分流（不丢弃任何题目）**：每道题（或每个 `partId`）必须且只能标注 `纯程序性`、`程序性扩充`、`综合拓展` 三者之一，并记录具体分流/剔除原因。

**落库前强制自检（5 项须全部 `PASS`）**：
* **`[依据核查]`**：解题拆解是否 100% 源自原标准答案，且未改动原始数据？
* **`[纯度核查]`**：主集合中是否已彻底剔除含建模或综合性质的题目？
* **`[去重核查]`**：单个知识点下极相似题是否严格不超过 3 道？
* **`[关联核查]`**：多小问题是否已精确绑定 `partId`？集合是否仅存引用且 `order`/`sortOrder` 显式连续？
* **`[分流核查]`**：所有未入选主集合的题目是否均已标注 `程序性扩充` 或 `综合拓展`？

### 3. 自动化筛选与质检标准 Prompt 模板

批量新增或审计存量集合时，按单个小节分批喂入下方标准 Prompt，校验输出自检报告全部 `PASS` 后再落库。

| 占位符 | 填入内容 | 典型场景 |
| :--- | :--- | :--- |
| `{{MODE}}` | `SCREENING` 或 `AUDIT` | 新章节建集选 `SCREENING`；清理存量综合题选 `AUDIT` |
| `{{SECTION_INFO}}` | 章节与小节名、本节新知识点 | 确保集合命名不跑偏，前置知识准确落入 `dependencies` |
| `{{QUESTIONS_DATA}}` | 题目 JSON 片段（含标准答案） | 建议按单个小节分批喂入，避免单次上下文过长导致相似题漏判 |

<details>
<summary>展开查看完整 Prompt 正文（点击右上角可直接复制）</summary>

````markdown
### Role
你是一名严格的中学数学题库**程序性知识筛选与质检专家**。你的任务是根据给定题库数据，完成题目操作级拆解、纯程序性筛选、标签分流与集合构建，或对现有集合进行合规性审计。

### Input Data
*   **运行模式**：`{{MODE}}`（可选值：`SCREENING` 筛选入库 / `AUDIT` 存量质检）
*   **所属小节目录**：`{{SECTION_INFO}}`（复用题库原有小节目录与当前阶段新引入知识点）
*   **待处理题目数据**：`{{QUESTIONS_DATA}}`（含题目 ID、题干、小问结构、标准答案；质检模式下含现有集合配置）

### Hard Constraints（红线规则，违反即判定失败）
1.  **唯一依据**：所有操作级解题拆解必须严格以输入数据中的**标准答案**为唯一依据，严禁外部搜索或自行脑补替代解法。
2.  **原始数据只读**：严禁修改原始题干、选项、标准答案或原始题目结构。
3.  **禁止物理复制**：集合仅通过引用 ID（及 `partId`）动态映射生成，严禁在集合中重复拷贝原题正文。
4.  **共享目录架构**：严格沿用输入的题库小节目录，不得自造平行目录。

### Screening & Tagging Rules（筛选与分流标准）
对每一道题（或多小问题目的每一个独立小问）依次执行以下判定：

#### 1. 粒度拆解
*   若题目包含多个小问，必须拆解至最小考查单元，通过 `partId` 精确关联，避免整题粗粒度引入无关考点。

#### 2. 命名与依赖归属
*   **集合命名**：统一以当前学习阶段**最新引入的核心知识**命名。
*   **前置依赖**：解题中用到的旧知识不参与命名，仅记录于 `dependencies` 字段。

#### 3. 纯度与相关性判定
同时满足以下条件方可进入候选池：
*   **纯程序性**：聚焦单一程序性技能执行，步骤紧凑、路径明确。
*   **零额外建模**：不包含额外数学建模、复杂情境转化或跨章节综合应用。
*   **演练强关联**：可直接映射到动态教学演练的分步操作中。

#### 4. 极相似题限流（上限 3 道）
*   同一程序性知识点下，题型结构、运算路径与考查方式高度相似的题目，主集合**最多保留 3 道**。
*   超出 3 道时，优先保留步骤最标准、覆盖常见易错点或数值最简洁的 3 道；其余归入扩充标签。

#### 5. 全量标签分流（不丢弃任何题目）
每道题（或每个 `partId`）必须且只能分配以下一个功能定位标签：
*   `纯程序性`：通过纯度判定、演练强关联且未超 3 道上限 → **入选主集合**，分配从 1 开始连续递增的显式排序号 `order`。
*   `程序性扩充`：属于纯程序性训练，但因极相似题已满 3 道或属于同类变式巩固 → **不入主集合**，供题库补充练习调用。
*   `综合拓展`：含额外建模、跨知识点综合或非纯步骤训练 → **剔除出主集合**，归入综合训练体系。

### Quality Audit Checklist（输出前强制自检）
生成结果前逐项核验，并在报告中标记 `PASS` / `FAIL`：
1.  **[依据核查]** 解题拆解是否 100% 源自原标准答案，且未改动原始数据？
2.  **[纯度核查]** 主集合中是否已彻底剔除含建模或综合性质的题目？
3.  **[去重核查]** 单个知识点下极相似题是否严格不超过 3 道？
4.  **[关联核查]** 多小问题是否已精确绑定 `partId`？集合是否仅存引用且 `order` 显式连续？
5.  **[分流核查]** 所有未入选主集合的题目是否均已标注 `程序性扩充` 或 `综合拓展`？

### Output Format
请严格输出以下两部分内容：

#### Part 1: 结构化映射数据（JSON）
```json
{
  "sectionId": "复用原题库小节 ID",
  "collectionName": "当前阶段最新引入的知识点名称",
  "dependencies": ["前置知识1", "前置知识2"],
  "proceduralSet": [
    {
      "order": 1,
      "questionId": "原题ID",
      "partId": "小问ID（单问填 null）",
      "tag": "纯程序性",
      "similarityGroup": "相似题型分组标识",
      "stepDecomposition": ["依据标准答案拆解的步骤1", "步骤2"]
    }
  ],
  "divertedItems": [
    {
      "questionId": "原题ID",
      "partId": "小问ID（单问填 null）",
      "tag": "程序性扩充 | 综合拓展",
      "reason": "具体分流或剔除原因（如：极相似题超3道上限 / 含额外建模应用）"
    }
  ]
}
```

#### Part 2: 质检摘要报告（Markdown）
*   **处理统计**：总题/小问数、入选主集合数、程序性扩充数、综合拓展剔除数。
*   **自检结果**：逐项列出 5 项自检的 `PASS` / `FAIL` 状态；若为 `AUDIT` 模式，需明确列出本次从旧集合中**剔除的违规题清单**及原因。
````

</details>

### 4. 落库与验收闭环
1. 在 `js/data/procedural-knowledge.js` 中新增或更新对应 `Pxx` 卡片（含 `steps`、`procedure`、`prerequisites`、`prerequisiteProcedureIds`、`pitfalls`、`exampleQuestionId`、`exampleStepMapping`、`graphNodeId`）。
2. 按质检通过后的 JSON 将映射写入 `js/data/question-procedures.js`（主集合正常展示，`程序性扩充` 标记 `visibility: 'bank_only'`，`综合拓展` 不入主集合）。
3. 如需配套动态黑板演示，在 `js/data/procedural-dynamic-demos.js` 中补充对应 `Pxx` 分步演示。
4. 运行 `python3 scripts/check-math-quality.py` 确认零报错后提交推送。
