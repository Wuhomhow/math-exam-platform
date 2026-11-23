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
│   │   ├── question-knowledge.js       # 题目-知识点关联
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
