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
7. **`js/data/question-procedures.js`**（按需）：仅当题目严格满足「零额外未建模知识、解题步骤数不超过该 `Pxx` 核心步骤数」的纯程序性训练标准时，才追加关联条目。

### 4. 全量质检与收尾
* 运行 `python3 scripts/check-math-quality.py`，核对 `questions.js` 与 Word 导出链路达到 **0 明确错误、0 疑似项**；
* 校验 `questions.js` ID 唯一性、`question-knowledge.js` 覆盖率 100%，以及新增配图均已注册至 Base64 分片；
* 确认无误后按需清理根目录原始 `.docx` 文件并提交推送。
