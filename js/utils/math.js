    // 将紧凑分数写法（如 \frac12、\frac19）规范化为标准 \frac{1}{2}
    function normalizeFallbackCompactFractions(tex) {
      const input = String(tex || '').replace(/\\(?:dfrac|tfrac)(?![a-zA-Z])/g, '\\frac');
      let out = '';
      let i = 0;

      function skipSpaces(pos) {
        while (pos < input.length && /\s/.test(input[pos])) pos++;
        return pos;
      }

      function readArg(pos) {
        pos = skipSpaces(pos);
        if (pos >= input.length) return null;
        if (input[pos] === '{') {
          let depth = 0;
          for (let k = pos; k < input.length; k++) {
            if (input[k] === '\\' && (input[k + 1] === '{' || input[k + 1] === '}')) {
              k++;
              continue;
            }
            if (input[k] === '{') depth++;
            else if (input[k] === '}') {
              depth--;
              if (depth === 0) return { value: input.slice(pos + 1, k), end: k + 1 };
            }
          }
          return { value: input.slice(pos + 1), end: input.length };
        }
        if (input[pos] === '\\') {
          let end = pos + 1;
          while (end < input.length && /[A-Za-z]/.test(input[end])) end++;
          if (end === pos + 1 && end < input.length) end++;
          return { value: input.slice(pos, end), end };
        }
        return { value: input[pos], end: pos + 1 };
      }

      while (i < input.length) {
        if (input.startsWith('\\frac', i) && !/[A-Za-z]/.test(input[i + 5] || '')) {
          const num = readArg(i + 5);
          const den = num ? readArg(num.end) : null;
          if (num && den) {
            out += '\\frac{' + num.value + '}{' + den.value + '}';
            i = den.end;
            continue;
          }
        }
        out += input[i];
        i++;
      }
      return out;
    }

    // 供备用渲染器使用的环境行/列拆分函数（与 Word 导出保持一致，保护单反斜杠命令与花括号结构）
    function splitFallbackEnvRows(body) {
      if (typeof window !== 'undefined' && typeof window.splitLatexEnvRows === 'function') {
        return window.splitLatexEnvRows(body);
      }
      const str = String(body || '');
      const rows = [];
      let cur = '';
      let braceDepth = 0;
      let envDepth = 0;
      let i = 0;

      while (i < str.length) {
        if (str[i] === '\\') {
          if (str[i + 1] === '\\') {
            if (braceDepth === 0 && envDepth === 0) {
              rows.push(cur.trim());
              cur = '';
              i += 2;
              while (i < str.length && str[i] === '\\') i++;
              let tempI = i;
              while (tempI < str.length && (str[tempI] === ' ' || str[tempI] === '\t')) tempI++;
              if (str[tempI] === '[') {
                const closeB = str.indexOf(']', tempI + 1);
                if (closeB !== -1) i = closeB + 1;
              }
              while (i < str.length && (str[i] === ' ' || str[i] === '\t')) i++;
              if (str[i] === '\r') i++;
              if (str[i] === '\n') i++;
              continue;
            }
            cur += '\\\\';
            i += 2;
            continue;
          }
          if (str[i + 1] === '{' || str[i + 1] === '}' || str[i + 1] === '&') {
            cur += str.slice(i, i + 2);
            i += 2;
            continue;
          }
          if (str.startsWith('\\begin{', i)) envDepth++;
          else if (str.startsWith('\\end{', i) && envDepth > 0) envDepth--;
          cur += str[i];
          i++;
          while (i < str.length && /[A-Za-z]/.test(str[i])) {
            cur += str[i];
            i++;
          }
          continue;
        }
        if (str[i] === '{') { braceDepth++; cur += str[i]; i++; continue; }
        if (str[i] === '}') { if (braceDepth > 0) braceDepth--; cur += str[i]; i++; continue; }
        if ((str[i] === '\n' || str[i] === '\r') && braceDepth === 0 && envDepth === 0) {
          if (cur.trim()) { rows.push(cur.trim()); cur = ''; }
          if (str[i] === '\r' && str[i + 1] === '\n') i += 2;
          else i++;
          continue;
        }
        cur += str[i];
        i++;
      }
      if (cur.trim()) rows.push(cur.trim());
      return rows.filter(Boolean);
    }

    function splitFallbackEnvCols(row) {
      if (typeof window !== 'undefined' && typeof window.splitLatexEnvCols === 'function') {
        return window.splitLatexEnvCols(row);
      }
      const str = String(row || '');
      const cols = [];
      let cur = '';
      let braceDepth = 0;
      let envDepth = 0;
      let i = 0;
      while (i < str.length) {
        if (str[i] === '\\') {
          if (str[i + 1] === '&' || str[i + 1] === '{' || str[i + 1] === '}' || str[i + 1] === '\\') {
            cur += str.slice(i, i + 2);
            i += 2;
            continue;
          }
          if (str.startsWith('\\begin{', i)) envDepth++;
          else if (str.startsWith('\\end{', i) && envDepth > 0) envDepth--;
          cur += str[i];
          i++;
          while (i < str.length && /[A-Za-z]/.test(str[i])) { cur += str[i]; i++; }
          continue;
        }
        if (str[i] === '{') { braceDepth++; cur += str[i]; i++; continue; }
        if (str[i] === '}') { if (braceDepth > 0) braceDepth--; cur += str[i]; i++; continue; }
        if (str[i] === '&' && braceDepth === 0 && envDepth === 0) {
          cols.push(cur.trim());
          cur = '';
          i++;
          continue;
        }
        cur += str[i];
        i++;
      }
      cols.push(cur.trim());
      return cols;
    }

    // Pure-JS fallback LaTeX-to-HTML renderer (used if KaTeX CDN is slow or blocked)
    function renderFallbackTex(tex) {
      if (tex === null || tex === undefined) return '';
      let raw = String(tex);

      // 1. Handle \begin{cases}...\end{cases}
      if (/\\begin\{cases\}/.test(raw)) {
        return '<span class="math-fallback">' + raw.replace(/([\s\S]*?)\\begin\{cases\}([\s\S]*?)\\end\{cases\}([\s\S]*)/g, (_, pre, body, post) => {
          const preHtml = pre.trim() ? renderFallbackTex(pre) : '';
          const postHtml = post.trim() ? renderFallbackTex(post) : '';
          const rows = splitFallbackEnvRows(body);
          const rowsHtml = rows.map(r => {
            const cols = splitFallbackEnvCols(r);
            const rowInner = cols.map(c => renderFallbackTex(c)).join('&emsp;');
            return '<span style="display:block;line-height:1.35;text-align:left;">' + rowInner + '</span>';
          }).join('');
          const braceSize = rows.length >= 3 ? '2.4em' : '1.8em';
          return preHtml + '<span style="display:inline-flex;align-items:center;vertical-align:middle;margin:2px 0;"><span style="font-size:' + braceSize + ';line-height:1;font-weight:300;margin-right:3px;font-family:serif;">{</span><span style="display:inline-block;">' + rowsHtml + '</span></span>' + postHtml;
        }) + '</span>';
      }

      // 2. Handle matrix environments (\begin{matrix}, pmatrix, bmatrix, Bmatrix, vmatrix, Vmatrix)
      if (/\\begin\{(?:p?matrix|bmatrix|Bmatrix|vmatrix|Vmatrix)\}/.test(raw)) {
        return '<span class="math-fallback">' + raw.replace(/([\s\S]*?)\\begin\{(p?matrix|bmatrix|Bmatrix|vmatrix|Vmatrix)\}([\s\S]*?)\\end\{\2\}([\s\S]*)/g, (_, pre, envName, body, post) => {
          const preHtml = pre.trim() ? renderFallbackTex(pre) : '';
          const postHtml = post.trim() ? renderFallbackTex(post) : '';
          const rows = splitFallbackEnvRows(body);
          const rowsHtml = rows.map(r => {
            const cols = splitFallbackEnvCols(r);
            const cellsHtml = cols.map(c => '<span style="display:table-cell;padding:1px 5px;text-align:center;">' + renderFallbackTex(c) + '</span>').join('');
            return '<span style="display:table-row;">' + cellsHtml + '</span>';
          }).join('');
          const delimMap = {
            matrix: ['', ''],
            pmatrix: ['(', ')'],
            bmatrix: ['[', ']'],
            Bmatrix: ['{', '}'],
            vmatrix: ['|', '|'],
            Vmatrix: ['&#8214;', '&#8214;']
          };
          const [begChr, endChr] = delimMap[envName] || ['', ''];
          const leftHtml = begChr ? '<span style="font-size:1.5em;line-height:1;margin-right:2px;font-family:serif;">' + begChr + '</span>' : '';
          const rightHtml = endChr ? '<span style="font-size:1.5em;line-height:1;margin-left:2px;font-family:serif;">' + endChr + '</span>' : '';
          return preHtml + '<span style="display:inline-flex;align-items:center;vertical-align:middle;margin:2px 0;">' + leftHtml + '<span style="display:inline-table;vertical-align:middle;border-collapse:collapse;">' + rowsHtml + '</span>' + rightHtml + '</span>' + postHtml;
        }) + '</span>';
      }

      // 3. Delimiter sizing commands (\left, \right, \Big, \big, \bigg, \Bigg) and escaped braces \{ \}
      let s = normalizeFallbackCompactFractions(raw)
        .replace(/\\(?:left|right)\s*\./g, '')
        .replace(/\\(?:left|right|Big|big|bigg|Bigg)[lrm]?\s*(\\[{}]|\\langle|\\rangle|[(\[{|)\]}])/g, '$1')
        .replace(/\\(?:Big|big|bigg|Bigg)[lrm]?(?![a-zA-Z])/g, '')
        .replace(/\\\{/g, '\u0001LBRACE\u0001')
        .replace(/\\\}/g, '\u0001RBRACE\u0001')
        .replace(/\\%/g, '%')
        .replace(/\\&/g, '&amp;');

      // 4. Accents, underbrace, and special composite constructs
      s = s
        .replace(/\\underset\{\\cdot\}\{([^{}]*)\}/g, '$1&#803;')
        .replace(/\\dot\{([^{}]*)\}/g, '$1&#775;')
        .replace(/\\dot\s+([0-9A-Za-z])/g, '$1&#775;')
        .replace(/\\overset\{\\frown\}\{([^{}]*)\}/g, '<span style="border-top:1px solid currentColor;border-radius:50% 50% 0 0;padding-top:1px;">$1</span>')
        .replace(/\\wideparen\{([^{}]*)\}/g, '<span style="border-top:1px solid currentColor;border-radius:50% 50% 0 0;padding-top:1px;">$1</span>')
        .replace(/\\underbrace\{([^{}]*)\}_\{([^{}]*)\}/g, '$1<sub>($2)</sub>')
        .replace(/\\underbrace\{([^{}]*)\}/g, '$1');

      // 5. Convert LaTeX symbol & Greek & operator commands using (?![a-zA-Z]) boundary
      //    Note: \triangle -> △ (&#9651;), \Delta -> Δ (&Delta;) strictly distinguished!
      s = s
        .replace(/\\,/g, '&thinsp;')
        .replace(/\\(?:qquad)(?![a-zA-Z])/g, '&emsp;&emsp;')
        .replace(/\\(?:quad|enspace)(?![a-zA-Z])/g, '&emsp;')
        .replace(/\\[;:]/g, '&thinsp;')
        .replace(/\\!/g, '')
        .replace(/\\\\/g, '<br>')
        .replace(/(?<!\\)\\[ \t]+/g, '&nbsp;')
        .replace(/\\(?:implies|Rightarrow)(?![a-zA-Z])/g, ' &rArr; ')
        .replace(/\\(?:iff|Leftrightarrow)(?![a-zA-Z])/g, ' &hArr; ')
        .replace(/\\leftrightarrow(?![a-zA-Z])/g, ' &harr; ')
        .replace(/\\(?:rightarrow|to)(?![a-zA-Z])/g, ' &rarr; ')
        .replace(/\\leftarrow(?![a-zA-Z])/g, ' &larr; ')
        .replace(/\\uparrow(?![a-zA-Z])/g, '&uarr;')
        .replace(/\\downarrow(?![a-zA-Z])/g, '&darr;')
        .replace(/\\angle(?![a-zA-Z])/g, '&ang;')
        .replace(/\\circ(?![a-zA-Z])/g, '&deg;')
        .replace(/\\perp(?![a-zA-Z])/g, '&perp;')
        .replace(/\\parallel(?![a-zA-Z])/g, '&#8741;')
        .replace(/\\cong(?![a-zA-Z])/g, '&cong;')
        .replace(/\\(?:backsim|sim)(?![a-zA-Z])/g, '&#8765;')
        .replace(/\\leq?(?![a-zA-Z])/g, '&le;')
        .replace(/\\geq?(?![a-zA-Z])/g, '&ge;')
        .replace(/\\lt(?![a-zA-Z])/g, '&lt;')
        .replace(/\\gt(?![a-zA-Z])/g, '&gt;')
        .replace(/\\neq?(?![a-zA-Z])/g, ' &ne; ')
        .replace(/\\approx(?![a-zA-Z])/g, ' &asymp; ')
        .replace(/\\pm(?![a-zA-Z])/g, '&plusmn;')
        .replace(/\\mp(?![a-zA-Z])/g, '&#8723;')
        .replace(/\\cdot(?![a-zA-Z])/g, '&middot;')
        .replace(/\\times(?![a-zA-Z])/g, ' &times; ')
        .replace(/\\div(?![a-zA-Z])/g, ' &divide; ')
        .replace(/\\oplus(?![a-zA-Z])/g, '&oplus;')
        .replace(/\\otimes(?![a-zA-Z])/g, '&otimes;')
        .replace(/\\odot(?![a-zA-Z])/g, '&#8857;')
        .replace(/\\star(?![a-zA-Z])/g, '&#8902;')
        .replace(/\\ast(?![a-zA-Z])/g, '&lowast;')
        .replace(/\\sum(?![a-zA-Z])/g, '&sum;')
        .replace(/\\infty(?![a-zA-Z])/g, '&infin;')
        .replace(/\\notin(?![a-zA-Z])/g, '&notin;')
        .replace(/\\in(?![a-zA-Z])/g, '&isin;')
        .replace(/\\varnothing(?![a-zA-Z])/g, '&empty;')
        .replace(/\\because(?![a-zA-Z])/g, '&#8757;')
        .replace(/\\therefore(?![a-zA-Z])/g, '&#8756;')
        .replace(/\\triangle(?![a-zA-Z])/g, '&#9651;')
        .replace(/\\Delta(?![a-zA-Z])/g, '&Delta;')
        .replace(/\\(?:square|Box)(?![a-zA-Z])/g, '&#9633;')
        .replace(/\\blacksquare(?![a-zA-Z])/g, '&#9632;')
        .replace(/\\checkmark(?![a-zA-Z])/g, '&#10003;')
        .replace(/\\langle(?![a-zA-Z])/g, '&lang;')
        .replace(/\\rangle(?![a-zA-Z])/g, '&rang;')
        .replace(/\\alpha(?![a-zA-Z])/g, '&alpha;')
        .replace(/\\beta(?![a-zA-Z])/g, '&beta;')
        .replace(/\\gamma(?![a-zA-Z])/g, '&gamma;')
        .replace(/\\theta(?![a-zA-Z])/g, '&theta;')
        .replace(/\\lambda(?![a-zA-Z])/g, '&lambda;')
        .replace(/\\mu(?![a-zA-Z])/g, '&mu;')
        .replace(/\\sigma(?![a-zA-Z])/g, '&sigma;')
        .replace(/\\omega(?![a-zA-Z])/g, '&omega;')
        .replace(/\\pi(?![a-zA-Z])/g, '&pi;')
        .replace(/\\Omega(?![a-zA-Z])/g, '&Omega;')
        .replace(/\\Phi(?![a-zA-Z])/g, '&Phi;')
        .replace(/\\cdots(?![a-zA-Z])/g, '&#8943;')
        .replace(/\\dots(?![a-zA-Z])/g, '&hellip;')
        .replace(/\\(min|max|sin|cos|tan|log|ln)(?![a-zA-Z])/g, '<span style="font-style:normal">$1</span>');

      // 6. Iteratively resolve innermost brace structures (\text, \overline, ^{...}, _{...}, \sqrt, \frac)
      //    so nested expressions like \frac{x^{2}+1}{2} or \frac{-\frac{1}{3}}{0.2} are resolved from inside out.
      for (let pass = 0; pass < 8; pass++) {
        const prev = s;
        s = s
          .replace(/\\(?:text|mathrm|mathbf)\{([^{}]*)\}/g, '<span style="font-style:normal">$1</span>')
          .replace(/\\overline\{([^{}]*)\}/g, '<span style="text-decoration:overline;">$1</span>')
          .replace(/\^\{([^{}]*)\}/g, '<sup>$1</sup>')
          .replace(/\^([0-9a-zA-Z+-])/g, '<sup>$1</sup>')
          .replace(/_\{([^{}]*)\}/g, '<sub>$1</sub>')
          .replace(/_([0-9a-zA-Z+-])/g, '<sub>$1</sub>')
          .replace(/\\sqrt\[([^{}\]]*)\]\{([^{}]*)\}/g,
            '<span class="math-sqrt"><sup class="math-sqrt-root">$1</sup>&radic;<span class="math-sqrt-body">$2</span></span>')
          .replace(/\\sqrt\{([^{}]*)\}/g,
            '<span class="math-sqrt">&radic;<span class="math-sqrt-body">$1</span></span>')
          .replace(/\\sqrt\s*([0-9a-zA-Z])/g,
            '<span class="math-sqrt">&radic;<span class="math-sqrt-body">$1</span></span>')
          .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g,
            '<span class="math-frac"><span class="math-frac-num">$1</span><span class="math-frac-den">$2</span></span>');
        // Inside loop, only unwrap grouping braces that serve as base of ^ or _ (e.g. {(-3)}^{2}, {100}^{3})
        s = s.replace(/\{([^{}]*)\}(?=\s*(?:\^|_|<(?:sup|sub)>))/g, '$1');
        if (s === prev) break;
      }
      for (let pass = 0; pass < 3; pass++) {
        const prev = s;
        s = s.replace(/\{([^{}]*)\}/g, '$1');
        if (s === prev) break;
      }

      // 7. Restore escaped literal braces \{ and \}
      s = s
        .replace(/\u0001LBRACE\u0001/g, '{')
        .replace(/\u0001RBRACE\u0001/g, '}');

      // 8. Keep generated HTML tags intact while escaping any standalone <
      s = s.replace(/</g, (m, offset, full) => {
        const after = full.slice(offset);
        if (/^<\/?(span|sup|sub|br)\b/.test(after)) return '<';
        return '&lt;';
      });
      return '<span class="math-fallback">' + s + '</span>';
    }

    // Safely format inline $...$ math using KaTeX or pure-HTML fallback
    function formatMathHtml(str) {
      if (str === null || str === undefined) return '';

      // 1. Normalize small and fullwidth minus/plus signs (U+FE63, U+FE62, U+FF0D, U+FF0B)
      let s = String(str)
        .replace(/\ufe63/g, '−')
        .replace(/\ufe62/g, '+')
        .replace(/\uff0d/g, '−')
        .replace(/\uff0b/g, '+');

      // 2. Extract $...$ blocks into placeholders BEFORE styling plain-text negative signs,
      //    so regexes never corrupt KaTeX SVG path attributes (e.g. `l0 -0` inside \sqrt SVG).
      const mathPlaceholders = [];
      s = s.replace(/\$([^$]+)\$/g, (_, tex) => {
        const cleanTex = tex
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/(?<!\\)%/g, '\\%')
          .replace(/[\ufe63\u2212\uff0d]/g, '-')
          .replace(/[\ufe62\uff0b]/g, '+')
          .replace(/\\\\\\(frac|dfrac|tfrac|sqrt|text|triangle|angle|circ|parallel|perp|cong|alpha|beta|gamma|theta|pi|pm|mp|le|ge|cdot|times|div|neq|approx|because|therefore|quad|qquad|dots|cdots|mathbf|mathrm|left|right|begin|end)\b/g, '\\\\ \\$1')
          .replace(/(?<!\\)\\\\(frac|dfrac|tfrac|sqrt|text|triangle|angle|circ|parallel|perp|cong|alpha|beta|gamma|theta|pi|pm|mp|le|ge|cdot|times|div|neq|approx|because|therefore|quad|qquad|dots|cdots|mathbf|mathrm|left|right|begin|end)\b/g, '\\$1')
          .replace(/^\{\s*(\\begin\{cases\}[\s\S]*\\end\{cases\})\s*$/g, '$1')
          .replace(/(\\therefore|\\because)\s*\{\s*(\\begin\{cases\}[\s\S]*\\end\{cases\})/g, '$1 $2')
          .replace(/\\(therefore|because|angle|triangle|parallel|perp|cong|pm|mp|times|div|cdot|cdots|approx|neq|pi)(?=[a-zA-Z])/g, (m, cmd, offset, full) => {
            const after = full.slice(offset + m.length);
            if (cmd === 'triangle' && /^(left|right|down|eq)/.test(after)) return m;
            if (cmd === 'div' && /^ideontimes/.test(after)) return m;
            if (cmd === 'approx' && /^eq/.test(after)) return m;
            if (cmd === 'cdot' && /^[sp]/.test(after)) return m;
            return '\\' + cmd + ' ';
          })
          .replace(/\\therefore(?![a-zA-Z])/g, '∴')
          .replace(/\\because(?![a-zA-Z])/g, '∵')
          .replace(/\\\\(?=[a-zA-Z0-9+\-\\])/g, '\\\\ ')
          .trim();
        if (!cleanTex) return '';
        let rendered = '';
        if (window.katex) {
          try {
            rendered = window.katex.renderToString(cleanTex, { throwOnError: false, displayMode: false });
          } catch (e) {}
        }
        if (!rendered) {
          const attrTex = cleanTex.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          rendered = '<span class="katex-pending" data-tex="' + attrTex + '">' + renderFallbackTex(cleanTex) + '</span>';
        }
        const token = `\u0000MATH_${mathPlaceholders.length}_\u0000`;
        mathPlaceholders.push(rendered);
        return token;
      });

      // 3. Protect existing HTML tags (e.g. <img ...>) before styling plain-text minus signs
      const tagPlaceholders = [];
      s = s.replace(/<[^>]+>/g, (tag) => {
        const token = `\u0000TAG_${tagPlaceholders.length}_\u0000`;
        tagPlaceholders.push(tag);
        return token;
      });

      // 4. For any negative numbers in plain text outside $...$ (e.g. −2, -2, −0.5, −5℃), style the minus sign prominently
      s = s.replace(/(^|[\s，、；：（(>\u0000])([−\-])(?=\d)/g, '$1<span class="math-neg-sign">−</span>');

      // 5. Restore HTML tags and rendered KaTeX math blocks
      s = s.replace(/\u0000TAG_(\d+)_\u0000/g, (_, idx) => tagPlaceholders[Number(idx)] || '');
      s = s.replace(/\u0000MATH_(\d+)_\u0000/g, (_, idx) => mathPlaceholders[Number(idx)] || '');

      return s;
    }

    function getOptionLayoutClass(option) {
      const text = String(option || '')
        .replace(/<img[^>]*>/gi, ' image ')
        .replace(/<[^>]*>/g, '')
        .replace(/\$([^$]+)\$/g, (_, tex) => tex);
      return text.length > 65 ? 'answer-option-wide' : '';
    }

    function stripHtmlPreserveMath(str) {
      if (!str) return '';
      const withoutTables = String(str)
        .replace(/<table[\s\S]*?<\/table>/gi, ' [表格] ')
        .replace(/<img[^>]*>/gi, ' [图示] ')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<\/?[a-zA-Z][^>]*>/g, ' ');
      return formatMathHtml(withoutTables);
    }

    // Extract and cleanly format analysis, detail, and point parts without duplicate tags
    function parseQuestionAnalysisDetail(q) {
      if (!q) return { analysis: '', detail: '', point: '' };
      const aRaw = String(q.analysis || '').trim();
      const dRaw = String(q.detail || '').trim();

      let analysisPart = '';
      let detailPart = '';
      let pointPart = '';

      if (aRaw.includes('【详解】')) {
        const idx = aRaw.indexOf('【详解】');
        analysisPart = aRaw.slice(0, idx).trim();
        const rest = aRaw.slice(idx + 4).trim();
        if (rest.includes('【点睛】')) {
          const pIdx = rest.indexOf('【点睛】');
          detailPart = rest.slice(0, pIdx).trim();
          pointPart = rest.slice(pIdx + 4).trim();
        } else {
          detailPart = rest;
        }
      } else {
        analysisPart = aRaw;
        if (dRaw.includes('【点睛】')) {
          const pIdx = dRaw.indexOf('【点睛】');
          detailPart = dRaw.slice(0, pIdx).trim();
          pointPart = dRaw.slice(pIdx + 4).trim();
        } else {
          detailPart = dRaw;
        }
      }

      const trailingSectionRe = /(?:<br\s*\/?>|\s)*[一二三四五六七八九十]+、\s*(?:考点[一二三四五六七八九十0-9]*|题型[一二三四五六七八九十0-9]*|选择题|填空题|解答题)[^<]*$/;
      analysisPart = analysisPart.replace(/^(?:<br\s*\/?>|\s)*【(?:分析|解析)】\s*/, '').replace(trailingSectionRe, '').replace(/(?:<br\s*\/?>|\s)+$/, '');
      detailPart = detailPart.replace(/^(?:<br\s*\/?>|\s)*【(?:详解|解答)】\s*/, '').replace(trailingSectionRe, '').replace(/(?:<br\s*\/?>|\s)+$/, '');
      pointPart = pointPart.replace(/^(?:<br\s*\/?>|\s)*【(?:点睛|总结|说明)】\s*/, '').replace(trailingSectionRe, '').replace(/(?:<br\s*\/?>|\s)+$/, '');

      return { analysis: analysisPart, detail: detailPart, point: pointPart };
    }

    // Render unified analysis drawer HTML with clean badges and zero duplicate tags/empty containers
    function renderQuestionAnalysisBoxHtml(q) {
      if (!q) return '';
      const parts = parseQuestionAnalysisDetail(q);

      let html = `
        <div class="flex items-center space-x-2 font-bold text-slate-900">
          <span class="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>
          <span>参考答案：</span>
          <span class="text-[#0F766E] font-semibold text-sm tracking-wide">${formatMathHtml(q.answer)}</span>
        </div>
      `;

      if (parts.analysis) {
        html += `<div class="text-slate-600"><b class="text-slate-800">【分析】</b>${formatMathHtml(parts.analysis)}</div>`;
      }

      if (parts.detail && parts.detail !== '略') {
        html += `<div class="text-slate-700 pt-1.5 border-t border-slate-200/70 leading-relaxed"><b class="text-slate-800">【详解】</b>${formatMathHtml(parts.detail)}</div>`;
      }

      if (parts.point) {
        html += `<div class="text-slate-600 pt-1.5 border-t border-slate-200/60 text-sm leading-relaxed"><b class="text-slate-800">【点睛】</b>${formatMathHtml(parts.point)}</div>`;
      }

      return html;
    }
    window.renderFallbackTex = renderFallbackTex;
    window.formatMathHtml = formatMathHtml;
    window.parseQuestionAnalysisDetail = parseQuestionAnalysisDetail;
    window.renderQuestionAnalysisBoxHtml = renderQuestionAnalysisBoxHtml;

    // Upgrade any pending fallback math spans if KaTeX finishes loading later
    function renderMath() {
      if (window.katex) {
        document.querySelectorAll('.katex-pending[data-tex]').forEach(el => {
          const tex = el.getAttribute('data-tex');
          if (tex) {
            try {
              el.outerHTML = window.katex.renderToString(tex, { throwOnError: false, displayMode: false });
            } catch (e) {}
          }
        });
      }
      if (window.renderMathInElement) {
        try {
          window.renderMathInElement(document.body, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        } catch (e) {}
      }
    }
    window.renderMath = renderMath;
