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
        s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g,
          '<span class="math-frac"><span class="math-frac-num">$1</span><span class="math-frac-den">$2</span></span>');
      }
      s = s.replace(/\^\{([^{}]*)\}/g, '<sup>$1</sup>');
      s = s.replace(/\^([0-9a-zA-Z+-])/g, '<sup>$1</sup>');
      s = s.replace(/</g, (m, offset, full) => {
        // Keep our own generated HTML tags intact, escape standalone <
        const after = full.slice(offset);
        if (/^<\/?(span|sup)\b/.test(after)) return '<';
        return '&lt;';
      });
      return '<span class="math-fallback">' + s + '</span>';
    }

    // Safely format inline $...$ math using KaTeX or pure-HTML fallback
    function formatMathHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str).replace(/\$([^$]+)\$/g, (_, tex) => {
        const cleanTex = tex.replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
        if (!cleanTex) return '';
        if (window.katex) {
          try {
            return window.katex.renderToString(cleanTex, { throwOnError: false, displayMode: false });
          } catch (e) {}
        }
        const attrTex = cleanTex.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return '<span class="katex-pending" data-tex="' + attrTex + '">' + renderFallbackTex(cleanTex) + '</span>';
      });
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

