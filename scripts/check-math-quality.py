#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
题典网（math-exam-platform）统一数学公式质量检查工具
====================================================
覆盖范围（六类数据源）：
1. 数学题库主数据 (js/data/questions.js)
2. 程序性知识正文 (js/data/procedural-knowledge.js, js/data/question-procedures.js)
3. 程序性知识动态演示数据 (js/data/procedural-dynamic-demos.js)
4. 数学知识图谱数据 (js/data/knowledge-nodes.js, js/data/knowledge-relations.js, js/data/question-knowledge.js)
5. 专项题库 (js/data/questions-ch5-equation-lesson2.js)
6. Word 组卷及导出涉及的题目内容 (js/modules/docx-export.js 全题库导出转换链路)

检查项目（七项核心检测 + 回归测试）：
- 定界符检测：检查缺少或不匹配的 $ 定界符（区分明确错误与疑似项）
- 括号检测：检查公式内 {} 配对及公式外异常花括号
- 环境检测：检查 \\begin{...} 与 \\end{...} 配对及 cases/matrix 行列结构
- 命令检测：识别全站使用的 LaTeX 命令，检测异常或未支持命令
- 网页渲染检测：检查 formatMathHtml 与 KaTeX 语法兼容性（含命令、上下标、参数结构）
- 备用渲染检测：实测 CDN 不可用时 renderFallbackTex 的 HTML 输出（零残留反斜杠/花括号，区分 △ 与 Δ）
- Word 转换检测：实测 latexToOmml 的 OMML 输出（方程组行拆分、矩阵 <m:m> 行列、上划线 <m:bar>、命令覆盖）

运行方式：
  python3 scripts/check-math-quality.py
"""

import json
import os
import re
import shutil
import subprocess
import sys
from collections import Counter, defaultdict

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
REPORT_PATH = os.path.join(ROOT_DIR, 'scripts', 'math-quality-report.md')


def find_js_engine():
    jsc_path = '/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc'
    if os.path.exists(jsc_path):
        return ('jsc', jsc_path)
    node_path = shutil.which('node')
    if node_path:
        return ('node', node_path)
    for cand in ['/opt/homebrew/bin/node', '/usr/local/bin/node']:
        if os.path.exists(cand):
            return ('node', cand)
    raise RuntimeError('未找到 JavaScript 执行引擎（macOS jsc 或 node）')


def build_js_harness():
    with open(os.path.join(ROOT_DIR, 'js/modules/docx-export.js'), 'r', encoding='utf-8') as f:
        docx_code = f.read()
    start_idx = docx_code.index('function decodeHtmlEntities')
    end_idx = docx_code.index('function textWithMathToRuns')
    omml_funcs = docx_code[start_idx:end_idx]

    with open(os.path.join(ROOT_DIR, 'js/utils/math.js'), 'r', encoding='utf-8') as f:
        math_code = f.read()

    # Affected 12 questions (17 cases snippets) + ch28_2_3_a_q8 from audit report
    audit_12_qids = [
        'tri13_25', 'ch16_1_2_10', 'ch26_2_1_14', 'ch5_1_1_11',
        'ch26_2_3_15', 'ch26_3_1_13', 'ch26_3_2_15', 'ch26_test_q10',
        'ch27_2_2_ex_q14', 'ch27_test_q15', 'ch28_2_3_a_q5', 'ch28_2_3_a_q11',
        'ch28_2_3_a_q8'
    ]

    js_code = f"""
var window = this;
var document = {{ querySelectorAll: function() {{ return []; }} }};
{omml_funcs}
{math_code}

load("{ROOT_DIR}/js/data/questions.js");
var mainQuestions = window.QUESTION_BANK.slice();
load("{ROOT_DIR}/js/data/questions-ch5-equation-lesson2.js");
var specialQuestions = CH5_EQUATION_LESSON2_QUESTIONS.slice();
load("{ROOT_DIR}/js/data/procedural-knowledge.js");
load("{ROOT_DIR}/js/data/question-procedures.js");
load("{ROOT_DIR}/js/data/procedural-dynamic-demos.js");
load("{ROOT_DIR}/js/data/knowledge-nodes.js");
load("{ROOT_DIR}/js/data/knowledge-relations.js");
load("{ROOT_DIR}/js/data/question-knowledge.js");

function walkStrings(obj, path, cb) {{
  if (typeof obj === 'string') {{
    cb(path, obj);
  }} else if (Array.isArray(obj)) {{
    for (var i = 0; i < obj.length; i++) walkStrings(obj[i], path + '[' + i + ']', cb);
  }} else if (obj && typeof obj === 'object') {{
    var keys = Object.keys(obj);
    for (var k = 0; k < keys.length; k++) {{
      var key = keys[k];
      walkStrings(obj[key], path ? path + '.' + key : key, cb);
    }}
  }}
}}

function checkBracesBalanced(tex) {{
  var depth = 0;
  for (var i = 0; i < tex.length; i++) {{
    if (tex[i] === '\\\\' && (tex[i + 1] === '{{' || tex[i + 1] === '}}')) {{
      i++;
      continue;
    }}
    if (tex[i] === '{{') depth++;
    else if (tex[i] === '}}') {{
      depth--;
      if (depth < 0) return false;
    }}
  }}
  return depth === 0;
}}

var KNOWN_KATEX_COMMANDS = {{
  frac:1, dfrac:1, tfrac:1, sqrt:1, text:1, mathrm:1, mathbf:1, overline:1,
  underbrace:1, underset:1, overset:1, wideparen:1, frown:1, dot:1,
  begin:1, end:1, left:1, right:1, Big:1, big:1, bigg:1, Bigg:1,
  angle:1, triangle:1, circ:1, perp:1, parallel:1, cong:1, sim:1, backsim:1, odot:1,
  square:1, Box:1, blacksquare:1, star:1, ast:1, checkmark:1, varnothing:1,
  alpha:1, beta:1, gamma:1, theta:1, pi:1, Delta:1, Omega:1, Phi:1,
  lambda:1, mu:1, sigma:1, omega:1,
  times:1, div:1, cdot:1, pm:1, mp:1, oplus:1, otimes:1, sum:1, infty:1,
  le:1, leq:1, ge:1, geq:1, lt:1, gt:1, ne:1, neq:1, approx:1, notin:1, 'in':1,
  because:1, therefore:1, implies:1, Rightarrow:1, iff:1, Leftrightarrow:1,
  rightarrow:1, to:1, leftarrow:1, leftrightarrow:1, uparrow:1, downarrow:1,
  langle:1, rangle:1, dots:1, cdots:1, quad:1, qquad:1, enspace:1,
  min:1, max:1, sin:1, cos:1, tan:1, log:1, ln:1,
  '\\\\':1, '{{':1, '}}':1, '%':1, ',':1, ';':1, ':':1, '!':1, '&':1
}};

function checkKatexSyntax(tex) {{
  var issues = [];
  if (!checkBracesBalanced(tex)) issues.push('unbalanced_braces');
  var begins = [];
  var ends = [];
  var m;
  var reBegin = /\\\\begin\\{{([^}}]+)\\}}/g;
  while ((m = reBegin.exec(tex)) !== null) begins.push(m[1]);
  var reEnd = /\\\\end\\{{([^}}]+)\\}}/g;
  while ((m = reEnd.exec(tex)) !== null) ends.push(m[1]);
  if (begins.join(',') !== ends.join(',')) issues.push('mismatched_env:' + begins.join('/') + ' vs ' + ends.join('/'));

  var reCmd = /\\\\([a-zA-Z]+|[^a-zA-Z\\s0-9])/g;
  while ((m = reCmd.exec(tex)) !== null) {{
    var cmd = m[1];
    if (!KNOWN_KATEX_COMMANDS[cmd]) {{
      issues.push('unknown_cmd:\\\\' + cmd);
    }}
  }}
  if (/<[a-zA-Z\\/][^>]*>|\\\\lt\\s*br\\b|&lt;\\s*br\\b/.test(tex)) {{
    issues.push('html_inside_math');
  }}
  if (/\\/bin\\/sh|(?<![0-9])\\.[0-9]{{4,}}/.test(tex)) {{
    issues.push('corrupted_token');
  }}
  return issues;
}}

function scanDataset(sourceName, fileLabel, items, isQuestionArray) {{
  var stats = {{
    sourceName: sourceName,
    fileLabel: fileLabel,
    totalRecords: Array.isArray(items) ? items.length : Object.keys(items || {{}}).length,
    totalFormulas: 0,
    commandsMap: {{}},
    errors: {{
      unpairedDollar: [],
      missingDollarDefinite: [],
      braceErrors: [],
      envErrors: [],
      htmlMathMixErrors: [],
      katexErrors: [],
      fallbackErrors: [],
      wordOmmlErrors: []
    }},
    warnings: {{
      suspectedMissingDollar: []
    }}
  }};

  function inspectField(loc, text) {{
    if (!text || typeof text !== 'string') return;
    if (text.indexOf('<svg') !== -1) return;

    // 1. Check unpaired $
    var dollarCount = 0;
    for (var d = 0; d < text.length; d++) {{
      if (text[d] === '$' && (d === 0 || text[d - 1] !== '\\\\')) dollarCount++;
    }}
    if (dollarCount % 2 !== 0) {{
      stats.errors.unpairedDollar.push({{ loc: loc, sample: text.slice(0, 120) }});
    }}

    // Strip HTML tags for outside-$ inspection
    var textWithoutHtmlTags = text.replace(/<[^>]+>/g, ' ');
    var outsideInside = textWithoutHtmlTags.split(/\\$([^$]+)\\$/g);
    for (var p = 0; p < outsideInside.length; p += 2) {{
      var outside = outsideInside[p];
      if (!outside) continue;
      // Definite missing $: raw LaTeX command or ^{...} / _{...} or /bin/sh outside $
      if (/\\\\[a-zA-Z]{{2,}}|[a-zA-Z0-9]\\^\\{{[0-9a-zA-Z+-]+\\}}|_\\{{[0-9a-zA-Z+-]+\\}}|\\/bin\\/sh/.test(outside)) {{
        stats.errors.missingDollarDefinite.push({{ loc: loc, sample: outside.trim().slice(0, 100) }});
      }} else if (/([a-zA-Z0-9])\\^([0-9a-zA-Z(])/.test(outside)) {{
        stats.warnings.suspectedMissingDollar.push({{ loc: loc, sample: outside.trim().slice(0, 100) }});
      }}
    }}

    // 2. Inspect each $...$ formula
    var parts = text.split(/\\$([^$]+)\\$/g);
    for (var i = 1; i < parts.length; i += 2) {{
      var tex = parts[i];
      stats.totalFormulas++;

      // Count commands
      var cmdRe = /\\\\([a-zA-Z]+|[^a-zA-Z\\s0-9])/g;
      var cm;
      while ((cm = cmdRe.exec(tex)) !== null) {{
        var cName = '\\\\' + cm[1];
        stats.commandsMap[cName] = (stats.commandsMap[cName] || 0) + 1;
      }}

      // Brace check
      if (!checkBracesBalanced(tex)) {{
        stats.errors.braceErrors.push({{ loc: loc, tex: tex }});
      }}

      // Env check
      var begins = [];
      var ends = [];
      var bm;
      var rB = /\\\\begin\\{{([^}}]+)\\}}/g;
      while ((bm = rB.exec(tex)) !== null) begins.push(bm[1]);
      var rE = /\\\\end\\{{([^}}]+)\\}}/g;
      while ((bm = rE.exec(tex)) !== null) ends.push(bm[1]);
      if (begins.join(',') !== ends.join(',')) {{
        stats.errors.envErrors.push({{ loc: loc, tex: tex, begins: begins, ends: ends }});
      }}
      if (begins.indexOf('cases') !== -1 && tex.indexOf('\\\\\\\\') === -1 && tex.indexOf('\\n') === -1) {{
        stats.errors.envErrors.push({{ loc: loc, tex: tex, reason: 'cases_single_line_missing_row_break' }});
      }}

      // HTML / Math mix check
      if (/<[a-zA-Z\\/][^>]*>|\\\\lt\\s*br\\b|&lt;\\s*br\\b|&nbsp;/.test(tex)) {{
        stats.errors.htmlMathMixErrors.push({{ loc: loc, tex: tex }});
      }}

      // KaTeX syntax check
      var kIssues = checkKatexSyntax(tex);
      if (kIssues.length > 0) {{
        stats.errors.katexErrors.push({{ loc: loc, tex: tex, issues: kIssues }});
      }}

      // Fallback renderer check (simulate CDN unavailable: window.katex = undefined)
      var fbOut = formatMathHtml('$' + tex + '$');
      var fbPlain = fbOut.replace(/<[^>]+>/g, ' ');
      var fbNoEscBraces = tex.replace(/\\\\[{{}}]/g, '');
      var fbHasUnparsedCmd = /\\\\[a-zA-Z]+/.test(fbPlain);
      var fbHasLeftoverBraces = fbNoEscBraces.indexOf('{{') !== -1 && /[{{}}]/.test(fbPlain.replace(/[{{}}]/g, function(ch) {{
        return (tex.indexOf('\\\\' + ch) !== -1 || tex.indexOf('\\\\begin{{cases}}') !== -1 || tex.indexOf('\\\\begin{{Bmatrix}}') !== -1) ? '' : ch;
      }}));
      if (fbHasUnparsedCmd || fbHasLeftoverBraces) {{
        stats.errors.fallbackErrors.push({{ loc: loc, tex: tex, fbPlain: fbPlain.trim() }});
      }}

      // Word OMML check
      var ommlOut = latexToOmml(tex);
      var mtMatches = ommlOut.match(/<m:t[^>]*>([\\s\\S]*?)<\\/m:t>/g) || [];
      var mtPlain = mtMatches.map(function(x) {{ return x.replace(/<[^>]+>/g, ''); }}).join(' ');
      if (mtPlain.indexOf('\\\\') !== -1) {{
        stats.errors.wordOmmlErrors.push({{ loc: loc, tex: tex, mtPlain: mtPlain }});
      }}
    }}
  }}

  if (isQuestionArray) {{
    for (var qIdx = 0; qIdx < items.length; qIdx++) {{
      var q = items[qIdx];
      var qid = q.id || ('q_' + qIdx);
      var keys = Object.keys(q);
      for (var k = 0; k < keys.length; k++) {{
        var key = keys[k];
        if (key === 'id' || key === 'image' || key === 'type' || key === 'grade' || key === 'term') continue;
        walkStrings(q[key], qid + '.' + key, inspectField);
      }}
    }}
  }} else {{
    walkStrings(items, sourceName, inspectField);
  }}

  return stats;
}}

// Run regression tests for Stage 3, Stage 4, Stage 5
function runRegressionSuite() {{
  var tests = [];
  function assertTest(name, cond, detail) {{
    tests.push({{ name: name, passed: Boolean(cond), detail: detail || '' }});
  }}

  // 1. Regression Test 1: cases with \\frac
  var t1 = "\\\\begin{{cases}}\\nx=\\\\frac{{1}}{{2}} \\\\\\\\\\ny=-2\\n\\\\end{{cases}}";
  var rows1 = splitLatexEnvRows("x=\\\\frac{{1}}{{2}} \\\\\\\\ \\ny=-2");
  var omml1 = latexToOmml(t1);
  assertTest(
    "Regression 1: cases 含 \\\\frac 行拆分与分式结构",
    rows1.length === 2 && rows1[0] === "x=\\\\frac{{1}}{{2}}" && rows1[1] === "y=-2" && omml1.indexOf("<m:f>") !== -1 && (omml1.match(/<m:eqArr>[\\s\\S]*?<\\/m:eqArr>/)[0].match(/<m:e>/g) || []).length >= 2,
    "rows=" + JSON.stringify(rows1)
  );

  // 2. Regression Test 2: basic 2-row cases
  var t2 = "\\\\begin{{cases}}\\nx+y=5 \\\\\\\\\\nx-y=1\\n\\\\end{{cases}}";
  var omml2 = latexToOmml(t2);
  var rows2 = splitLatexEnvRows("x+y=5 \\\\\\\\ \\nx-y=1");
  assertTest(
    "Regression 2: 标准二元一次方程组行拆分",
    rows2.length === 2 && rows2[0] === "x+y=5" && rows2[1] === "x-y=1" && omml2.indexOf("<m:eqArr>") !== -1,
    "rows=" + JSON.stringify(rows2)
  );

  // 3. Regression Test 3: cases with \\ne and \\text{{①}}
  var t3 = "\\\\begin{{cases}}\\nx\\\\ne 0 \\\\\\\\\\ny=\\\\text{{①}}\\n\\\\end{{cases}}";
  var rows3 = splitLatexEnvRows("x\\\\ne 0 \\\\\\\\ \\ny=\\\\text{{①}}");
  var omml3 = latexToOmml(t3);
  assertTest(
    "Regression 3: cases 含 \\\\ne 与 \\\\text{{①}} 不破坏命令",
    rows3.length === 2 && omml3.indexOf("≠") !== -1 && omml3.indexOf("①") !== -1 && omml3.indexOf("\\\\") === -1,
    "rows=" + JSON.stringify(rows3)
  );

  // 4. Regression Test 4: matrix 2x2 row & column structure
  var t4 = "\\\\begin{{matrix}}\\n1 & 2 \\\\\\\\\\n3 & 4\\n\\\\end{{matrix}}";
  var omml4 = latexToOmml(t4);
  var mrCount = (omml4.match(/<m:mr>/g) || []).length;
  var meCount = (omml4.match(/<m:e>/g) || []).length;
  var fb4 = renderFallbackTex(t4);
  assertTest(
    "Regression 4: matrix 2x2 保留原生 <m:m>/<m:mr>/<m:e> 行列结构",
    omml4.indexOf("<m:m>") !== -1 && mrCount === 2 && meCount === 4 && fb4.indexOf("table-row") !== -1 && fb4.indexOf("table-cell") !== -1,
    "mr=" + mrCount + ", me=" + meCount
  );

  // 5. Regression Test 5: 12 audit questions (17 cases snippets + ch28_2_3_a_q8)
  var auditQids = {json.dumps(audit_12_qids)};
  var auditCasesCount = 0;
  var auditPassCount = 0;
  for (var qIdx = 0; qIdx < mainQuestions.length; qIdx++) {{
    var q = mainQuestions[qIdx];
    if (auditQids.indexOf(q.id) === -1) continue;
    ['stem', 'answer', 'analysis', 'detail'].forEach(function(fld) {{
      var val = q[fld] || '';
      var parts = String(val).split(/\\$([^$]+)\\$/g);
      for (var i = 1; i < parts.length; i += 2) {{
        if (parts[i].indexOf('\\\\begin{{cases}}') !== -1) {{
          auditCasesCount++;
          var omml = latexToOmml(parts[i]);
          if (omml.indexOf('\\\\') === -1 && omml.indexOf('<m:eqArr>') !== -1) {{
            auditPassCount++;
          }}
        }}
      }}
    }});
  }}
  assertTest(
    "Regression 5: 审计报告提及的方程组片段全部正常转换",
    auditCasesCount >= 19 && auditPassCount === auditCasesCount,
    "verified " + auditPassCount + "/" + auditCasesCount + " snippets across " + auditQids.length + " questions"
  );

  // 6. Regression Test 6: Word command conversions (\\overline, \\Delta vs \\triangle, etc.)
  var cmdOmml = latexToOmml("\\\\Rightarrow \\\\rightarrow \\\\overline{{ab}} \\\\otimes \\\\oplus \\\\ne \\\\neq \\\\langle x \\\\rangle \\\\Omega \\\\Phi \\\\checkmark \\\\Delta \\\\triangle");
  assertTest(
    "Regression 6: Word 重点命令转换及 \\\\overline <m:bar>、\\\\Delta/\\\\triangle 区分",
    cmdOmml.indexOf("<m:bar>") !== -1 &&
    cmdOmml.indexOf("⇒") !== -1 &&
    cmdOmml.indexOf("→") !== -1 &&
    cmdOmml.indexOf("⊗") !== -1 &&
    cmdOmml.indexOf("⊕") !== -1 &&
    cmdOmml.indexOf("≠") !== -1 &&
    cmdOmml.indexOf("⟨") !== -1 &&
    cmdOmml.indexOf("⟩") !== -1 &&
    cmdOmml.indexOf("Ω") !== -1 &&
    cmdOmml.indexOf("Φ") !== -1 &&
    cmdOmml.indexOf("✓") !== -1 &&
    cmdOmml.indexOf("Δ") !== -1 &&
    cmdOmml.indexOf("△") !== -1,
    "all symbols and <m:bar> verified"
  );

  // 7. Regression Test 7: Fallback renderer CDN failure takeover & \\triangle vs \\Delta
  var savedKatex = window.katex;
  window.katex = undefined;
  var fbSample = formatMathHtml("$\\\\triangle ABC \\\\sim \\\\triangle DEF, \\\\Delta = b^{{2}} - 4ac \\\\ge 0 \\\\implies x = \\\\frac{{-b \\\\pm \\\\sqrt{{\\\\Delta}}}}{{2a}}, \\\\pi \\\\cdot r^{{2}}, \\\\alpha + \\\\beta + \\\\gamma \\\\iff \\\\mp 1$");
  window.katex = savedKatex;
  assertTest(
    "Regression 7: KaTeX CDN 不可用时备用渲染器接管及 \\\\triangle(△) 与 \\\\Delta(Δ) 严格区分",
    fbSample.indexOf("katex-pending") !== -1 &&
    fbSample.indexOf("math-fallback") !== -1 &&
    fbSample.indexOf("&#9651;") !== -1 &&
    fbSample.indexOf("&Delta;") !== -1 &&
    fbSample.indexOf("&pi;") !== -1 &&
    fbSample.indexOf("&middot;") !== -1 &&
    fbSample.indexOf("&plusmn;") !== -1 &&
    fbSample.indexOf("&#8723;") !== -1 &&
    fbSample.indexOf("&alpha;") !== -1 &&
    fbSample.indexOf("&beta;") !== -1 &&
    fbSample.indexOf("&gamma;") !== -1 &&
    fbSample.indexOf("&rArr;") !== -1 &&
    fbSample.indexOf("&hArr;") !== -1 &&
    fbSample.replace(/<[^>]+>/g, "").indexOf("\\\\") === -1,
    "CDN fallback HTML verified"
  );

  return tests;
}}

// Word export scope: all questions in window.QUESTION_BANK (main + special merged)
var wordExportQuestions = window.QUESTION_BANK.map(function(q) {{
  return {{
    id: q.id,
    stem: q.stem,
    options: q.options,
    answer: q.answer,
    difficulty: q.difficulty,
    knowledge: q.knowledge,
    analysis: q.analysis,
    detail: q.detail
  }};
}});

var scanResults = [
  scanDataset("1. 数学题库主数据", "js/data/questions.js", mainQuestions, true),
  scanDataset("2. 程序性知识正文", "js/data/procedural-knowledge.js & question-procedures.js", {{
    proceduralKnowledge: window.PROCEDURAL_KNOWLEDGE,
    questionProcedures: window.QUESTION_PROCEDURES
  }}, false),
  scanDataset("3. 程序性知识动态演示数据", "js/data/procedural-dynamic-demos.js", window.PROCEDURAL_DYNAMIC_DEMOS, false),
  scanDataset("4. 数学知识图谱数据", "js/data/knowledge-nodes.js & knowledge-relations.js & question-knowledge.js", {{
    nodes: window.KNOWLEDGE_NODES,
    relations: window.KNOWLEDGE_RELATIONS,
    questionKnowledge: window.QUESTION_KNOWLEDGE
  }}, false),
  scanDataset("5. 各类专项题库", "js/data/questions-ch5-equation-lesson2.js", specialQuestions, true),
  scanDataset("6. Word 组卷及导出内容", "js/modules/docx-export.js (window.QUESTION_BANK 导出字段)", wordExportQuestions, true)
];

var regressionResults = runRegressionSuite();

print(JSON.stringify({{
  scanResults: scanResults,
  regressionResults: regressionResults
}}));
"""
    return js_code


def main():
    engine_type, engine_bin = find_js_engine()
    js_code = build_js_harness()
    tmp_js = '/tmp/math_quality_harness.js'
    with open(tmp_js, 'w', encoding='utf-8') as f:
        f.write(js_code)

    if engine_type == 'node':
        # Node compatibility wrapper for load() and print()
        node_prefix = """
const fs = require('fs');
const vm = require('vm');
global.window = global;
global.load = function(p) {
  const code = fs.readFileSync(p, 'utf8');
  vm.runInThisContext(code, { filename: p });
};
global.print = function(s) { process.stdout.write(String(s) + '\\n'); };
"""
        with open(tmp_js, 'w', encoding='utf-8') as f:
            f.write(node_prefix + js_code)

    res = subprocess.run([engine_bin, tmp_js], capture_output=True, text=True)
    if res.returncode != 0:
        print("JS Engine Error:", res.stderr, file=sys.stderr)
        sys.exit(1)

    payload = json.loads(res.stdout.strip().splitlines()[-1])
    scan_results = payload['scanResults']
    reg_results = payload['regressionResults']

    # Build Markdown report and console summary
    lines = []
    lines.append("# 题典网（math-exam-platform）全站数学公式质量检查报告\n")
    lines.append("## 一、回归测试结果\n")
    lines.append("| 测试项 | 状态 | 详情 |")
    lines.append("|---|---|---|")
    all_reg_passed = True
    for t in reg_results:
        status = "PASS" if t['passed'] else "FAIL"
        if not t['passed']:
            all_reg_passed = False
        lines.append(f"| {t['name']} | **{status}** | `{t['detail']}` |")

    lines.append("\n## 二、六类数据源全量扫描汇总\n")
    lines.append("| 数据源 | 存储文件 | 公式总数 | 命令种类 | KaTeX 异常 | 备用渲染不足 | Word 转换异常 | 缺失定界符(明确) | 括号/环境错误 | HTML 混排异常 | 疑似未加 `$` (纯文本提示) |")
    lines.append("|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|")

    total_errors = 0
    for sr in scan_results:
        err = sr['errors']
        warn = sr['warnings']
        cmd_count = len(sr['commandsMap'])
        katex_err = len(err['katexErrors'])
        fb_err = len(err['fallbackErrors'])
        omml_err = len(err['wordOmmlErrors'])
        miss_def = len(err['missingDollarDefinite']) + len(err['unpairedDollar'])
        brace_env = len(err['braceErrors']) + len(err['envErrors'])
        html_mix = len(err['htmlMathMixErrors'])
        susp = len(warn['suspectedMissingDollar'])
        row_errors = katex_err + fb_err + omml_err + miss_def + brace_env + html_mix
        if not sr['sourceName'].startswith('6.'):
            total_errors += row_errors
        lines.append(
            f"| {sr['sourceName']} | `{sr['fileLabel']}` | {sr['totalFormulas']} | {cmd_count} | "
            f"{katex_err} | {fb_err} | {omml_err} | {miss_def} | {brace_env} | {html_mix} | {susp} |"
        )

    lines.append("\n## 三、错误与疑似项明细定位\n")
    for sr in scan_results:
        lines.append(f"### {sr['sourceName']} (`{sr['fileLabel']}`)")
        err = sr['errors']
        warn = sr['warnings']
        any_err = any(len(v) > 0 for v in err.values())
        if not any_err and len(warn['suspectedMissingDollar']) == 0:
            lines.append("- **明确错误：0 项**；**疑似项：0 项**。\n")
        else:
            for k, items in err.items():
                if items:
                    lines.append(f"- **[明确错误 - {k}]** 共 {len(items)} 项：")
                    for it in items[:20]:
                        lines.append(f"  - `{it.get('loc')}`: `{it.get('tex') or it.get('sample')}`")
            if warn['suspectedMissingDollar']:
                lines.append(f"- **[疑似项（纯文本说明，用于区分非渲染区如 title 属性）]** 共 {len(warn['suspectedMissingDollar'])} 项：")
                for it in warn['suspectedMissingDollar'][:10]:
                    lines.append(f"  - `{it.get('loc')}`: `{it.get('sample')}`")
            lines.append("")

    report_md = "\n".join(lines)
    os.makedirs(os.path.dirname(REPORT_PATH), exist_ok=True)
    with open(REPORT_PATH, 'w', encoding='utf-8') as f:
        f.write(report_md)

    print(report_md)
    print(f"\n[完成] 检查报告已生成至: {REPORT_PATH}")
    if not all_reg_passed or total_errors > 0:
        sys.exit(1)


if __name__ == '__main__':
    main()
