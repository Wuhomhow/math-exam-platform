# 题典网（math-exam-platform）全站数学公式质量检查报告

## 一、回归测试结果

| 测试项 | 状态 | 详情 |
|---|---|---|
| Regression 1: cases 含 \frac 行拆分与分式结构 | **PASS** | `rows=["x=\\frac{1}{2}","y=-2"]` |
| Regression 2: 标准二元一次方程组行拆分 | **PASS** | `rows=["x+y=5","x-y=1"]` |
| Regression 3: cases 含 \ne 与 \text{①} 不破坏命令 | **PASS** | `rows=["x\\ne 0","y=\\text{①}"]` |
| Regression 4: matrix 2x2 保留原生 <m:m>/<m:mr>/<m:e> 行列结构 | **PASS** | `mr=2, me=4` |
| Regression 5: 审计报告提及的方程组片段全部正常转换 | **PASS** | `verified 33/33 snippets across 13 questions` |
| Regression 6: Word 重点命令转换及 \overline <m:bar>、\Delta/\triangle 区分 | **PASS** | `all symbols and <m:bar> verified` |
| Regression 7: KaTeX CDN 不可用时备用渲染器接管及 \triangle(△) 与 \Delta(Δ) 严格区分 | **PASS** | `CDN fallback HTML verified` |

## 二、五类数据源全量扫描汇总

| 数据源 | 存储文件 | 公式总数 | 命令种类 | KaTeX 异常 | 备用渲染不足 | Word 转换异常 | 缺失定界符(明确) | 括号/环境错误 | HTML 混排异常 | 字段规范异常 | 疑似未加 `$` (纯文本提示) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1. 数学题库主数据 | `js/data/questions.js` | 92496 | 72 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2. 程序性知识正文 | `js/data/procedural-knowledge.js & question-procedures.js` | 7017 | 53 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 3. 程序性知识动态演示数据 | `js/data/procedural-dynamic-demos.js` | 9192 | 53 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 4. 数学知识图谱数据 | `js/data/knowledge-nodes.js & knowledge-relations.js & question-knowledge.js` | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 5. Word 组卷及导出内容 | `js/modules/docx-export.js (window.QUESTION_BANK 导出字段)` | 91678 | 72 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## 三、错误与疑似项明细定位

### 1. 数学题库主数据 (`js/data/questions.js`)
- **明确错误：0 项**；**疑似项：0 项**。

### 2. 程序性知识正文 (`js/data/procedural-knowledge.js & question-procedures.js`)
- **明确错误：0 项**；**疑似项：0 项**。

### 3. 程序性知识动态演示数据 (`js/data/procedural-dynamic-demos.js`)
- **明确错误：0 项**；**疑似项：0 项**。

### 4. 数学知识图谱数据 (`js/data/knowledge-nodes.js & knowledge-relations.js & question-knowledge.js`)
- **明确错误：0 项**；**疑似项：0 项**。

### 5. Word 组卷及导出内容 (`js/modules/docx-export.js (window.QUESTION_BANK 导出字段)`)
- **明确错误：0 项**；**疑似项：0 项**。
