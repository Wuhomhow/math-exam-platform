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

## 二、六类数据源全量扫描汇总

| 数据源 | 存储文件 | 公式总数 | 命令种类 | KaTeX 异常 | 备用渲染不足 | Word 转换异常 | 缺失定界符(明确) | 括号/环境错误 | HTML 混排异常 | 疑似未加 `$` (纯文本提示) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1. 数学题库主数据 | `js/data/questions.js` | 52112 | 69 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2. 程序性知识正文 | `js/data/procedural-knowledge.js & question-procedures.js` | 3226 | 40 | 0 | 0 | 0 | 0 | 0 | 0 | 18 |
| 3. 程序性知识动态演示数据 | `js/data/procedural-dynamic-demos.js` | 4461 | 33 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 4. 数学知识图谱数据 | `js/data/knowledge-nodes.js & knowledge-relations.js & question-knowledge.js` | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 |
| 5. 各类专项题库 | `js/data/questions-ch5-equation-lesson2.js` | 278 | 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 6. Word 组卷及导出内容 | `js/modules/docx-export.js (window.QUESTION_BANK 导出字段)` | 51572 | 69 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## 三、错误与疑似项明细定位

### 1. 数学题库主数据 (`js/data/questions.js`)
- **明确错误：0 项**；**疑似项：0 项**。

### 2. 程序性知识正文 (`js/data/procedural-knowledge.js & question-procedures.js`)
- **[疑似项（纯文本说明，用于区分非渲染区如 title 属性）]** 共 18 项：
  - `2. 程序性知识正文.questionProcedures[897].operationSummary`: `逐项核对同底数幂乘法（底数不变指数相加），选出结果为 2^(3a) 的算式。`
  - `2. 程序性知识正文.questionProcedures[899].operationSummary`: `由同底数幂乘法得 a^(3n+1)=a⁷，对比指数 3n+1=7 解得 n=2。`
  - `2. 程序性知识正文.questionProcedures[900].operationSummary`: `将 16 化为 2⁴，由 2ˣ·2ˣ·2⁴=2^(2x+4)=2¹² 列 2x+4=12 解得 x=4。`
  - `2. 程序性知识正文.questionProcedures[901].operationSummary`: `将 625 化为 5⁴，由 5^(3m+1)=5⁴ 解得 m=1，再算 (-1)²⁰²³=-1。`
  - `2. 程序性知识正文.questionProcedures[902].operationSummary`: `将 100 化为 10²，由 10^(a+2b)=10² 得 a+2b=2，整体代入得 a+2b+3=5。`
  - `2. 程序性知识正文.questionProcedures[904].operationSummary`: `由偶次幂 (-3)^(2n)=3^(2n)、奇次幂 (-3)^(2n+1)=-3^(2n+1) 统一底数，合并得 -3^(2n+1)+3^(2n+1)=0。`
  - `2. 程序性知识正文.questionProcedures[905].operationSummary`: `逆用同底数幂乘法 5^(m+n+3)=5ᵐ·5ⁿ·5³，代入 5ᵐ=x, 5ⁿ=y 得 125xy。`
  - `2. 程序性知识正文.questionProcedures[906].operationSummary`: `由 2ᵃ·2ᶜ=8×6=48=2×24=2¹·2ᵇ 得 2^(a+c)=2^(b+1)，推出 a+c=b+1。`
  - `2. 程序性知识正文.questionProcedures[910].operationSummary`: `第(4)问：定偶次幂 (-a)²=a²，分别按同底数幂乘法得 a^(m+3)+a^(m+3)=2a^(m+3)。`
  - `2. 程序性知识正文.questionProcedures[915].operationSummary`: `由 (a²)³=a⁶ 与 aᵐ·a=a^(m+1) 相等，列 m+1=6 解得 m=5。`

### 3. 程序性知识动态演示数据 (`js/data/procedural-dynamic-demos.js`)
- **明确错误：0 项**；**疑似项：0 项**。

### 4. 数学知识图谱数据 (`js/data/knowledge-nodes.js & knowledge-relations.js & question-knowledge.js`)
- **[疑似项（纯文本说明，用于区分非渲染区如 title 属性）]** 共 2 项：
  - `4. 数学知识图谱数据.nodes[46].description`: `会用科学记数法 a×10^n (1≤|a|<10) 表示大数并还原原数，理解近似数的精确度及根据四舍五入推断原数取值范围。`
  - `4. 数学知识图谱数据.nodes[66].description`: `掌握 a^m·a^n=a^(m+n)、(a^m)^n=a^(mn)、(ab)^n=a^n·b^n、a^m÷a^n=a^(m-n) 四大幂运算法则及其逆向巧算。`

### 5. 各类专项题库 (`js/data/questions-ch5-equation-lesson2.js`)
- **明确错误：0 项**；**疑似项：0 项**。

### 6. Word 组卷及导出内容 (`js/modules/docx-export.js (window.QUESTION_BANK 导出字段)`)
- **明确错误：0 项**；**疑似项：0 项**。
