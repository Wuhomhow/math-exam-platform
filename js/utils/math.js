    // Pure-JS fallback LaTeX-to-HTML renderer (used if KaTeX CDN is slow or blocked)
    function renderFallbackTex(tex) {
      if (/\\begin\{cases\}/.test(tex)) {
        return '<span class="math-fallback">' + String(tex).replace(/([\s\S]*?)\\begin\{cases\}([\s\S]*?)\\end\{cases\}([\s\S]*)/g, (_, pre, body, post) => {
          const preHtml = pre.trim() ? renderFallbackTex(pre) : '';
          const postHtml = post.trim() ? renderFallbackTex(post) : '';
          const rows = body.split(/\\\\/).map(r => r.trim()).filter(Boolean);
          const rowsHtml = rows.map(r => '<span style="display:block;line-height:1.35;text-align:left;">' + renderFallbackTex(r) + '</span>').join('');
          const braceSize = rows.length >= 3 ? '2.4em' : '1.8em';
          return preHtml + '<span style="display:inline-flex;align-items:center;vertical-align:middle;margin:2px 0;"><span style="font-size:' + braceSize + ';line-height:1;font-weight:300;margin-right:3px;font-family:serif;">{</span><span style="display:inline-block;">' + rowsHtml + '</span></span>' + postHtml;
        }) + '</span>';
      }
      let s = String(tex)
        .replace(/\\,/g, '&thinsp;')
        .replace(/\\angle\b/g, '&ang;')
        .replace(/\\circ\b/g, '&deg;')
        .replace(/\\perp\b/g, '&perp;')
        .replace(/\\parallel\b/g, '&par;')
        .replace(/\\cong\b/g, '&cong;')
        .replace(/\\le\b/g, '&le;')
        .replace(/\\ge\b/g, '&ge;')
        .replace(/\\times/g, ' &times; ')
        .replace(/\\div/g, ' &divide; ')
        .replace(/\\neq/g, ' &ne; ')
        .replace(/\\approx/g, ' &asymp; ')
        .replace(/\\because/g, '&#8757;')
        .replace(/\\therefore/g, '&#8756;')
        .replace(/\\triangle/g, '&Delta;')
        .replace(/\\dots/g, '&hellip;')
        .replace(/\\cdots/g, '&#8943;')
        .replace(/\\left\s*([(\[{|])/g, '$1')
        .replace(/\\right\s*([)\]}|])/g, '$1');

      s = s.replace(/\\text\{([^{}]*)\}/g, '<span style="font-style:normal">$1</span>');
      for (let pass = 0; pass < 3; pass++) {
        s = s.replace(/\\sqrt\[([^{}\]]*)\]\{([^{}]*)\}/g,
          '<span class="math-sqrt"><sup class="math-sqrt-root">$1</sup>&radic;<span class="math-sqrt-body">$2</span></span>');
        s = s.replace(/\\sqrt\{([^{}]*)\}/g,
          '<span class="math-sqrt">&radic;<span class="math-sqrt-body">$1</span></span>');
        s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g,
          '<span class="math-frac"><span class="math-frac-num">$1</span><span class="math-frac-den">$2</span></span>');
      }
      s = s.replace(/\^\{([^{}]*)\}/g, '<sup>$1</sup>');
      s = s.replace(/\^([0-9a-zA-Z+-])/g, '<sup>$1</sup>');
      s = s.replace(/_\{([^{}]*)\}/g, '<sub>$1</sub>');
      s = s.replace(/_([0-9a-zA-Z+-])/g, '<sub>$1</sub>');
      s = s.replace(/</g, (m, offset, full) => {
        // Keep our own generated HTML tags intact, escape standalone <
        const after = full.slice(offset);
        if (/^<\/?(span|sup|sub)\b/.test(after)) return '<';
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
          .replace(/\\\\(frac|dfrac|tfrac|sqrt|text|triangle|angle|circ|parallel|perp|cong|alpha|beta|gamma|theta|pi|pm|mp|le|ge|cdot|times|div|neq|approx|because|therefore|quad|qquad|dots|cdots|mathbf|mathrm|left|right|begin|end)\b/g, '\\$1')
          .replace(/\\(therefore|because|angle|triangle|parallel|perp|cong|pm|mp|times|div|cdot|cdots|approx|neq)(?=[a-zA-Z])/g, (m, cmd, offset, full) => {
            const after = full.slice(offset + m.length);
            if (cmd === 'triangle' && /^(left|right|down|eq)/.test(after)) return m;
            if (cmd === 'div' && /^ideontimes/.test(after)) return m;
            if (cmd === 'approx' && /^eq/.test(after)) return m;
            if (cmd === 'cdot' && /^[sp]/.test(after)) return m;
            return '\\' + cmd + ' ';
          })
          .replace(/\\therefore\b/g, '∴')
          .replace(/\\because\b/g, '∵')
          .replace(/\\\\(?=[a-zA-Z0-9+\-])/g, '\\\\ ')
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
          <span class="text-[#0F766E] font-semibold text-base tracking-wide">${formatMathHtml(q.answer)}</span>
        </div>
      `;

      if (parts.analysis) {
        html += `<div class="text-slate-600"><b class="text-slate-800">【分析】</b>${formatMathHtml(parts.analysis)}</div>`;
      }

      if (parts.detail && parts.detail !== '略') {
        html += `<div class="text-slate-700 pt-1.5 border-t border-slate-200/70 leading-relaxed"><b class="text-slate-800">【详解】</b>${formatMathHtml(parts.detail)}</div>`;
      }

      if (parts.point) {
        html += `<div class="text-slate-600 pt-1.5 border-t border-slate-200/60 text-xs leading-relaxed"><b class="text-slate-800">【点睛】</b>${formatMathHtml(parts.point)}</div>`;
      }

      return html;
    }
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

