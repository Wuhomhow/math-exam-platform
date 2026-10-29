
    async function deflateRawBytes(uint8) {
      if (typeof CompressionStream !== 'undefined') {
        try {
          const cs = new CompressionStream('deflate');
          const writer = cs.writable.getWriter();
          writer.write(uint8);
          writer.close();
          const chunks = [];
          const reader = cs.readable.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
          }
          let total = 0;
          for (const c of chunks) total += c.length;
          const out = new Uint8Array(total);
          let pos = 0;
          for (const c of chunks) { out.set(c, pos); pos += c.length; }
          return { method: 8, data: out.subarray(2, out.length - 4) };
        } catch (e) {
          return { method: 0, data: uint8 };
        }
      }
      return { method: 0, data: uint8 };
    }

    async function buildZipBlobBytes(files) {
      const crcTable = new Uint32Array(256);
      for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
          c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
        }
        crcTable[n] = c >>> 0;
      }
      function crc32(buf) {
        let c = 0xffffffff;
        for (let i = 0; i < buf.length; i++) {
          c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
        }
        return (c ^ 0xffffffff) >>> 0;
      }

      const encoder = new TextEncoder();
      const localParts = [];
      const centralParts = [];
      let offset = 0;

      for (const file of files) {
        const nameBytes = encoder.encode(file.name);
        const rawBytes = file.data;
        const crc = crc32(rawBytes);
        const uncompressedSize = rawBytes.length;
        const { method, data: compBytes } = await deflateRawBytes(rawBytes);
        const compressedSize = compBytes.length;

        const localHeader = new Uint8Array(30 + nameBytes.length);
        const lv = new DataView(localHeader.buffer);
        lv.setUint32(0, 0x04034b50, true);
        lv.setUint16(4, 20, true);
        lv.setUint16(6, 0, true);
        lv.setUint16(8, method, true);
        lv.setUint16(10, 0, true);
        lv.setUint16(12, 0x5421, true);
        lv.setUint32(14, crc, true);
        lv.setUint32(18, compressedSize, true);
        lv.setUint32(22, uncompressedSize, true);
        lv.setUint16(26, nameBytes.length, true);
        lv.setUint16(28, 0, true);
        localHeader.set(nameBytes, 30);

        localParts.push(localHeader, compBytes);

        const centralHeader = new Uint8Array(46 + nameBytes.length);
        const cv = new DataView(centralHeader.buffer);
        cv.setUint32(0, 0x02014b50, true);
        cv.setUint16(4, 20, true);
        cv.setUint16(6, 20, true);
        cv.setUint16(8, 0, true);
        cv.setUint16(10, method, true);
        cv.setUint16(12, 0, true);
        cv.setUint16(14, 0x5421, true);
        cv.setUint32(16, crc, true);
        cv.setUint32(20, compressedSize, true);
        cv.setUint32(24, uncompressedSize, true);
        cv.setUint16(28, nameBytes.length, true);
        cv.setUint16(30, 0, true);
        cv.setUint16(32, 0, true);
        cv.setUint16(34, 0, true);
        cv.setUint16(36, 0, true);
        cv.setUint32(38, 0, true);
        cv.setUint32(42, offset, true);
        centralHeader.set(nameBytes, 46);

        centralParts.push(centralHeader);
        offset += localHeader.length + compressedSize;
      }

      let centralSize = 0;
      for (const cp of centralParts) centralSize += cp.length;

      const eocd = new Uint8Array(22);
      const ev = new DataView(eocd.buffer);
      ev.setUint32(0, 0x06054b50, true);
      ev.setUint16(4, 0, true);
      ev.setUint16(6, 0, true);
      ev.setUint16(8, files.length, true);
      ev.setUint16(10, files.length, true);
      ev.setUint32(12, centralSize, true);
      ev.setUint32(16, offset, true);
      ev.setUint16(20, 0, true);

      const totalLen = offset + centralSize + 22;
      const out = new Uint8Array(totalLen);
      let pos = 0;
      for (const p of localParts) { out.set(p, pos); pos += p.length; }
      for (const p of centralParts) { out.set(p, pos); pos += p.length; }
      out.set(eocd, pos);
      return out;
    }

    function escXml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    }

    function ommlRun(text) {
      if (!text) return '';
      return `<m:r><m:rPr><m:sty m:val="p"/></m:rPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:eastAsia="宋体" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr><m:t xml:space="preserve">${escXml(text)}</m:t></m:r>`;
    }

    function ommlSup(baseXml, supXml) {
      return `<m:sSup><m:sSupPr><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:sSupPr><m:e>${baseXml}</m:e><m:sup>${supXml}</m:sup></m:sSup>`;
    }

    function ommlFrac(numXml, denXml) {
      return `<m:f><m:fPr><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:fPr><m:num>${numXml}</m:num><m:den>${denXml}</m:den></m:f>`;
    }

    function ommlDelim(begChr, endChr, innerXml) {
      return `<m:d><m:dPr><m:begChr m:val="${escXml(begChr)}"/><m:endChr m:val="${escXml(endChr)}"/><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:dPr><m:e>${innerXml}</m:e></m:d>`;
    }

    // 将题库中常见的紧凑分数写法（如 \frac12、\frac18、\frac32）
    // 规范化为 \frac{1}{2}，供 Word 原生公式解析器使用。
    function normalizeCompactFractions(tex) {
      const input = String(tex);
      let out = '';
      let i = 0;

      function skipSpaces(pos) {
        while (pos < input.length && /\s/.test(input[pos])) pos++;
        return pos;
      }

      function readArgument(pos) {
        pos = skipSpaces(pos);
        if (pos >= input.length) return null;
        if (input[pos] === '{') {
          let depth = 0;
          for (let k = pos; k < input.length; k++) {
            if (input[k] === '{') depth++;
            else if (input[k] === '}') {
              depth--;
              if (depth === 0) {
                return { value: input.slice(pos + 1, k), end: k + 1 };
              }
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
          const num = readArgument(i + 5);
          const den = num ? readArgument(num.end) : null;
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

    function parseLatexInner(tex) {
      // Convert common LaTeX commands to actual math glyphs before building OMML.
      // Word's native math format does not understand raw TeX command names such as \angle or \circ.
      let s = normalizeCompactFractions(String(tex)
        .replace(/\\(?:dfrac|tfrac)\b/g, '\\frac'))
        .replace(/\\,/g, ' ')
        .replace(/\\(?:qquad|quad|enspace)\b/g, '  ')
        .replace(/\\[;:!]/g, ' ')
        .replace(/\\angle\b/g, '∠')
        .replace(/\\circ\b/g, '°')
        .replace(/\\parallel\b/g, '∥')
        .replace(/\\perp\b/g, '⊥')
        .replace(/\\cong\b/g, '≅')
        .replace(/\\alpha\b/g, 'α')
        .replace(/\\beta\b/g, 'β')
        .replace(/\\gamma\b/g, 'γ')
        .replace(/\\theta\b/g, 'θ')
        .replace(/\\pi\b/g, 'π')
        .replace(/\\pm\b/g, '±')
        .replace(/\\mp\b/g, '∓')
        .replace(/\\leq?\b/g, '≤')
        .replace(/\\geq?\b/g, '≥')
        .replace(/\\notin\b/g, '∉')
        .replace(/\\infty\b/g, '∞')
        .replace(/\\cdot\b/g, '·')
        .replace(/\\times/g, '×')
        .replace(/\\div/g, '÷')
        .replace(/\\neq/g, '≠')
        .replace(/\\approx/g, '≈')
        .replace(/\\because/g, '∵')
        .replace(/\\therefore/g, '∴')
        .replace(/\\triangle/g, '△')
        .replace(/\\dots/g, '…')
        .replace(/\\cdots/g, '⋯')
        .trim();

      function readBraceGroup(str, i) {
        let depth = 0;
        let start = i + 1;
        for (let k = i; k < str.length; k++) {
          if (str[k] === '{') depth++;
          else if (str[k] === '}') {
            depth--;
            if (depth === 0) return { content: str.slice(start, k), nextIdx: k + 1 };
          }
        }
        return { content: str.slice(start), nextIdx: str.length };
      }

      const atoms = [];
      let i = 0;
      while (i < s.length) {
        if (s.startsWith('\\begin{cases}', i)) {
          const endIdx = s.indexOf('\\end{cases}', i + 13);
          const body = endIdx !== -1 ? s.slice(i + 13, endIdx) : s.slice(i + 13);
          const rows = body.split(/\\\\/).map(r => r.trim()).filter(Boolean);
          const eqArrInner = rows.map(r => `<m:e>${parseLatexInner(r)}</m:e>`).join('');
          atoms.push(`<m:d><m:dPr><m:begChr m:val="{"/><m:endChr m:val=""/></m:dPr><m:e><m:eqArr>${eqArrInner}</m:eqArr></m:e></m:d>`);
          i = endIdx !== -1 ? endIdx + 11 : s.length;
        } else if (s.startsWith('\\text{', i)) {
          const g = readBraceGroup(s, i + 5);
          atoms.push(ommlRun(g.content));
          i = g.nextIdx;
        } else if (s.startsWith('\\frac{', i)) {
          const g1 = readBraceGroup(s, i + 5);
          let nextI = g1.nextIdx;
          while (nextI < s.length && s[nextI] === ' ') nextI++;
          if (s[nextI] === '{') {
            const g2 = readBraceGroup(s, nextI);
            atoms.push(ommlFrac(parseLatexInner(g1.content), parseLatexInner(g2.content)));
            i = g2.nextIdx;
          } else {
            atoms.push(ommlRun(g1.content));
            i = nextI;
          }
        } else if (s.startsWith('\\left', i)) {
          i += 5;
          while (i < s.length && s[i] === ' ') i++;
          const begChr = s[i] || '(';
          i++;
          let depth = 1;
          let startInner = i;
          let endInner = s.length;
          let endChr = ')';
          let afterRight = s.length;
          while (i < s.length) {
            if (s.startsWith('\\left', i)) {
              depth++;
              i += 5;
            } else if (s.startsWith('\\right', i)) {
              depth--;
              if (depth === 0) {
                endInner = i;
                i += 6;
                while (i < s.length && s[i] === ' ') i++;
                endChr = s[i] || ')';
                afterRight = i + 1;
                break;
              }
              i += 6;
            } else {
              i++;
            }
          }
          const innerStr = s.slice(startInner, endInner);
          atoms.push(ommlDelim(begChr, endChr, parseLatexInner(innerStr)));
          i = afterRight;
        } else if (s[i] === '(' || s[i] === '[') {
          const begChr = s[i];
          const endChr = begChr === '(' ? ')' : ']';
          let depth = 1;
          let k = i + 1;
          while (k < s.length && depth > 0) {
            if (s[k] === begChr) depth++;
            else if (s[k] === endChr) depth--;
            k++;
          }
          if (depth === 0) {
            const innerStr = s.slice(i + 1, k - 1);
            atoms.push(ommlRun(begChr) + parseLatexInner(innerStr) + ommlRun(endChr));
            i = k;
          } else {
            atoms.push(ommlRun(begChr));
            i++;
          }
        } else if (s[i] === '|') {
          let k = s.indexOf('|', i + 1);
          if (k !== -1) {
            const innerStr = s.slice(i + 1, k);
            atoms.push(ommlDelim('|', '|', parseLatexInner(innerStr)));
            i = k + 1;
          } else {
            atoms.push(ommlRun('|'));
            i++;
          }
        } else if (s[i] === '{') {
          const g = readBraceGroup(s, i);
          atoms.push(parseLatexInner(g.content));
          i = g.nextIdx;
        } else if (s[i] === '^') {
          i++;
          let supXml = '';
          if (i < s.length && s[i] === '{') {
            const g = readBraceGroup(s, i);
            supXml = parseLatexInner(g.content);
            i = g.nextIdx;
          } else if (i < s.length) {
            supXml = ommlRun(s[i]);
            i++;
          }
          const prevAtom = atoms.length > 0 ? atoms.pop() : ommlRun('');
          atoms.push(ommlSup(prevAtom, supXml));
        } else if (/[0-9a-zA-Z.]/.test(s[i])) {
          let start = i;
          if (/[0-9.]/.test(s[i])) {
            while (i < s.length && /[0-9.]/.test(s[i])) i++;
          } else {
            i++;
          }
          atoms.push(ommlRun(s.slice(start, i)));
        } else {
          atoms.push(ommlRun(s[i]));
          i++;
        }
      }
      return atoms.join('');
    }

    function latexToOmml(tex) {
      return `<m:oMath>${parseLatexInner(tex)}</m:oMath>`;
    }

    function textWithMathToRuns(text, opts = {}) {
      const sz = opts.sz || 21;
      const bold = opts.bold ? '<w:b/><w:bCs/>' : '';
      const color = opts.color ? `<w:color w:val="${opts.color}"/>` : '';
      const font = opts.font || '宋体';
      const rPr = `<w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="${font}" w:cs="Times New Roman"/>${bold}${color}<w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/></w:rPr>`;

      const parts = String(text).split(/\$([^$]+)\$/g);
      let xml = '';
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          const t = parts[i];
          if (t) {
            xml += `<w:r>${rPr}<w:t xml:space="preserve">${escXml(t)}</w:t></w:r>`;
          }
        } else {
          let expr = parts[i].trim();
          let prefixText = '';
          let suffixText = '';
          if (expr.startsWith('=')) {
            prefixText = ' = ';
            expr = expr.slice(1).trim();
          }
          if (expr.endsWith('=')) {
            suffixText = ' = ';
            expr = expr.slice(0, -1).trim();
          }
          if (prefixText) xml += `<w:r>${rPr}<w:t xml:space="preserve">${escXml(prefixText)}</w:t></w:r>`;
          if (expr) xml += latexToOmml(expr);
          if (suffixText) xml += `<w:r>${rPr}<w:t xml:space="preserve">${escXml(suffixText)}</w:t></w:r>`;
        }
      }
      return xml;
    }

    function splitHtmlBlocks(htmlStr) {
      let s = String(htmlStr)
        .replace(/<div\s+class=['"][^'"]*grid[^'"]*['"][^>]*>([\s\S]*?)<\/div>\s*<\/div>/g, (match) => {
          const items = [];
          const re = /<div>([\s\S]*?)<\/div>/g;
          let m;
          while ((m = re.exec(match)) !== null) {
            items.push(m[1].trim());
          }
          if (items.length > 0) {
            const rows = [];
            for (let i = 0; i < items.length; i += 3) {
              rows.push('　　' + items.slice(i, i + 3).join('　　　　'));
            }
            return '\n' + rows.join('\n');
          }
          return match;
        })
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/div>\s*<div[^>]*>/gi, '\n')
        .replace(/<div[^>]*>/gi, '\n')
        .replace(/<\/div>/gi, '')
        .replace(/<\/?[a-zA-Z][^>]*>/g, '');
      return s.split('\n').map(l => l.trim()).filter(Boolean);
    }

    function makeParagraph(runsXml, pOpts = {}) {
      const align = pOpts.align ? `<w:jc w:val="${pOpts.align}"/>` : '';
      const before = pOpts.before !== undefined ? ` w:before="${pOpts.before}"` : ' w:before="60"';
      const after = pOpts.after !== undefined ? ` w:after="${pOpts.after}"` : ' w:after="60"';
      const line = pOpts.line || 320;
      const indent = pOpts.indent ? `<w:ind w:left="${pOpts.indent}"/>` : '';
      const borderBottom = pOpts.borderBottom ? `<w:pBdr><w:bottom w:val="${pOpts.borderBottom}" w:sz="6" w:space="4" w:color="333333"/></w:pBdr>` : '';
      return `<w:p><w:pPr>${borderBottom}<w:spacing${before}${after} w:line="${line}" w:lineRule="auto"/>${indent}${align}</w:pPr>${runsXml}</w:p>`;
    }

    function makeDrawingXml(rId, cx = '2232000', cy = '600923', docPrId = 1) {
      return `<w:r><w:drawing><wp:inline xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="1" name="Picture 1"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="0" name="image1.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"/></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
    }

    function base64ToUint8Array(b64) {
      const binStr = atob(b64);
      const len = binStr.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binStr.charCodeAt(i);
      return bytes;
    }

    async function exportWordDoc() {
      const selected = getSelectedQuestions();
      if (selected.length === 0) {
        showToast('试题篮为空，请先选择题目后再导出！', 'warn');
        return;
      }

      const isTeacher = state.paperViewMode === 'teacher';
      const isDouble = state.isDoubleColumn;

      const mediaFiles = [];
      const relsExtra = [];
      let imgCounter = 1;

      // Pre-fetch all images used in selected questions
      const imageBufferCache = new Map();
      const imageSrcList = new Set();

      function collectSrcs(text) {
        if (!text) return;
        const re = /<img[^>]+src=["']([^"']+)["']/gi;
        let m;
        while ((m = re.exec(text)) !== null) {
          imageSrcList.add(m[1]);
        }
      }

      for (const q of selected) {
        collectSrcs(q.stem);
        if (q.image) imageSrcList.add(q.image);
        if (q.options) q.options.forEach(collectSrcs);
        collectSrcs(q.answer);
        collectSrcs(q.analysis);
        collectSrcs(q.detail);
      }

      await Promise.all(Array.from(imageSrcList).map(async (src) => {
        try {
          if (src.startsWith('data:image/')) {
            const m = src.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
            if (m) {
              imageBufferCache.set(src, base64ToUint8Array(m[1]));
            }
          } else {
            const res = await fetch(src);
            if (res.ok) {
              const buf = await res.arrayBuffer();
              imageBufferCache.set(src, new Uint8Array(buf));
            }
          }
        } catch (err) {
          console.warn('Word export: unable to load image:', src, err);
        }
      }));

      function registerImageTag(imgTag, maxCx = 3200000) {
        const srcM = imgTag.match(/src=["']([^"']+)["']/i);
        if (!srcM) return '';
        const src = srcM[1];
        let imgBytes = imageBufferCache.get(src);
        if (!imgBytes && src.startsWith('data:image/')) {
          const m = src.match(/base64,([A-Za-z0-9+/=]+)/);
          if (m) imgBytes = base64ToUint8Array(m[1]);
        }
        if (!imgBytes) return '';

        const cxM = imgTag.match(/data-cx="(\d+)"/);
        const cyM = imgTag.match(/data-cy="(\d+)"/);
        let cx = cxM ? parseInt(cxM[1], 10) : 2200000;
        let cy = cyM ? parseInt(cyM[1], 10) : 600000;
        if (cx > maxCx) {
          const ratio = maxCx / cx;
          cx = Math.round(cx * ratio);
          cy = Math.round(cy * ratio);
        }
        const idNum = imgCounter++;
        const rId = `rIdImg${idNum}`;
        const isJpg = src.toLowerCase().endsWith('.jpg') || src.toLowerCase().endsWith('.jpeg');
        const fileName = `image${idNum}.${isJpg ? 'jpeg' : 'png'}`;
        mediaFiles.push({ name: `word/media/${fileName}`, data: imgBytes });
        relsExtra.push(`<Relationship Id="${rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${fileName}"/>`);
        return makeDrawingXml(rId, String(cx), String(cy), idNum);
      }

      function textWithMathAndImgToRuns(text, opts = {}) {
        const sz = opts.sz || 21;
        const bold = opts.bold ? '<w:b/><w:bCs/>' : '';
        const color = opts.color ? `<w:color w:val="${opts.color}"/>` : '';
        const font = opts.font || '宋体';
        const maxCx = opts.maxCx || 3200000;
        const rPr = `<w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="${font}" w:cs="Times New Roman"/>${bold}${color}<w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/></w:rPr>`;

        const imgSplit = String(text).split(/(<img[^>]+>)/g);
        let xml = '';
        for (const seg of imgSplit) {
          if (!seg) continue;
          if (seg.startsWith('<img')) {
            xml += registerImageTag(seg, maxCx);
          } else {
            const parts = seg.split(/\$([^$]+)\$/g);
            for (let i = 0; i < parts.length; i++) {
              if (i % 2 === 0) {
                const t = parts[i];
                if (t) {
                  xml += `<w:r>${rPr}<w:t xml:space="preserve">${escXml(t)}</w:t></w:r>`;
                }
              } else {
                let expr = parts[i].trim();
                if (/^[+\-=±]+$/.test(expr)) {
                  xml += `<w:r>${rPr}<w:t xml:space="preserve">${escXml(expr)}</w:t></w:r>`;
                  continue;
                }
                let prefixText = '';
                let suffixText = '';
                if (expr.startsWith('=')) {
                  prefixText = ' = ';
                  expr = expr.slice(1).trim();
                }
                if (expr.endsWith('=')) {
                  suffixText = ' = ';
                  expr = expr.slice(0, -1).trim();
                }
                if (prefixText) xml += `<w:r>${rPr}<w:t xml:space="preserve">${escXml(prefixText)}</w:t></w:r>`;
                if (expr) xml += latexToOmml(expr);
                if (suffixText) xml += `<w:r>${rPr}<w:t xml:space="preserve">${escXml(suffixText)}</w:t></w:r>`;
              }
            }
          }
        }
        return xml;
      }

      function splitHtmlLinesPreserveImg(htmlStr) {
        let s = String(htmlStr)
          .replace(/<div\s+class=['"][^'"]*grid[^'"]*['"][^>]*>([\s\S]*?)<\/div>\s*<\/div>/g, (match) => {
            const items = [];
            const re = /<div>([\s\S]*?)<\/div>/g;
            let m;
            while ((m = re.exec(match)) !== null) {
              items.push(m[1].trim());
            }
            if (items.length > 0) {
              const rows = [];
              for (let i = 0; i < items.length; i += 3) {
                rows.push('　　' + items.slice(i, i + 3).join('　　　　'));
              }
              return '\n' + rows.join('\n');
            }
            return match;
          })
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<\/div>\s*<div[^>]*>/gi, '\n')
          .replace(/<div[^>]*>/gi, '\n')
          .replace(/<\/div>/gi, '')
          .replace(/<\/?(?!img\b)[a-zA-Z][^>]*>/g, '');
        return s.split('\n').map(l => l.trim()).filter(Boolean);
      }

      function htmlTableToWordTbl(tableHtml) {
        const trMatches = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
        if (trMatches.length === 0) return '';
        let maxCols = 1;
        const parsedRows = trMatches.map(trM => {
          const tds = [...trM[1].matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/gi)].map(tdM => {
            const attrs = tdM[1] || '';
            const csM = attrs.match(/colspan="(\d+)"/i);
            const span = csM ? parseInt(csM[1], 10) : 1;
            return { span, content: tdM[2] };
          });
          const rowCols = tds.reduce((s, c) => s + c.span, 0);
          if (rowCols > maxCols) maxCols = rowCols;
          return tds;
        });

        const baseColW = Math.floor(8400 / maxCols);
        let rowsXml = '';
        for (const tds of parsedRows) {
          let cellsXml = '';
          for (const td of tds) {
            const w = baseColW * td.span;
            const gridSpanXml = td.span > 1 ? `<w:gridSpan w:val="${td.span}"/>` : '';
            const cellLines = splitHtmlLinesPreserveImg(td.content);
            const pXml = cellLines.length > 0
              ? cellLines.map(cl => makeParagraph(textWithMathAndImgToRuns(cl, { sz: 19, maxCx: Math.max(800000, w * 550) }), { align: 'center', before: 20, after: 20, line: 260 })).join('')
              : makeParagraph('', { before: 20, after: 20 });
            cellsXml += `<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/>${gridSpanXml}</w:tcPr>${pXml}</w:tc>`;
          }
          rowsXml += `<w:tr>${cellsXml}</w:tr>`;
        }

        return `<w:tbl><w:tblPr><w:tblW w:w="8400" w:type="dxa"/><w:tblInd w:w="360" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="64748B"/><w:left w:val="single" w:sz="4" w:space="0" w:color="64748B"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="64748B"/><w:right w:val="single" w:sz="4" w:space="0" w:color="64748B"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="64748B"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="64748B"/></w:tblBorders></w:tblPr>${rowsXml}</w:tbl>`;
      }

      function renderRichContentToWordXml(htmlStr, firstPrefixXml = '', firstSuffixText = '', textOpts = { sz: 21 }, pOpts = {}) {
        const blocks = String(htmlStr).split(/(<table[\s\S]*?<\/table>)/gi);
        let outXml = '';
        let usedFirst = false;

        for (const blk of blocks) {
          if (!blk || !blk.trim()) continue;
          if (blk.trim().toLowerCase().startsWith('<table')) {
            if (!usedFirst && (firstPrefixXml || firstSuffixText)) {
              outXml += makeParagraph(firstPrefixXml + textWithMathAndImgToRuns(firstSuffixText, textOpts), pOpts);
              usedFirst = true;
            }
            outXml += htmlTableToWordTbl(blk);
          } else {
            const lines = splitHtmlLinesPreserveImg(blk);
            for (let i = 0; i < lines.length; i++) {
              if (!usedFirst) {
                const lineStr = lines[i] + (firstSuffixText ? ` ${firstSuffixText}` : '');
                outXml += makeParagraph(firstPrefixXml + textWithMathAndImgToRuns(lineStr, textOpts), pOpts);
                usedFirst = true;
              } else {
                outXml += makeParagraph(textWithMathAndImgToRuns(lines[i], textOpts), { ...pOpts, indent: 360, before: 20, after: 20 });
              }
            }
          }
        }
        return outXml;
      }

      function makeOptionsTable(options) {
        // Use full-width rows for unusually long options, and two columns for ordinary choices.
        const maxLen = Math.max(...options.map(option => option
          .replace(/<img[^>]*>/gi, ' image ')
          .replace(/<[^>]*>/g, '')
          .replace(/\$([^$]+)\$/g, (_, tex) => tex).length));
        const cols = maxLen > 65 ? 1 : 2;
        const colWidth = Math.floor(9000 / cols);
        const maxImgCx = cols === 1 ? 4200000 : 2300000;

        let rowsXml = '';
        for (let r = 0; r < options.length; r += cols) {
          const slice = options.slice(r, r + cols);
          let cellsXml = '';
          for (let c = 0; c < cols; c++) {
            const optText = slice[c] || '';
            cellsXml += `<w:tc><w:tcPr><w:tcW w:w="${colWidth}" w:type="dxa"/></w:tcPr>${makeParagraph(textWithMathAndImgToRuns(optText, { sz: 21, maxCx: maxImgCx }), { before: 20, after: 20, line: 280 })}</w:tc>`;
          }
          rowsXml += `<w:tr>${cellsXml}</w:tr>`;
        }

        return `<w:tbl><w:tblPr><w:tblW w:w="9000" w:type="dxa"/><w:tblInd w:w="360" w:type="dxa"/><w:tblBorders><w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/><w:insideH w:val="none"/><w:insideV w:val="none"/></w:tblBorders></w:tblPr>${rowsXml}</w:tbl>`;
      }

      let bodyXml = '';

      const choices = selected.filter(q => q.type === 'choice');
      const blanks = selected.filter(q => q.type === 'blank');
      const calcs = selected.filter(q => q.type === 'calc');

      function renderQuestionListXml(list, isChoice, isCalc, startAt = 1) {
        let out = '';
        let questionIndex = startAt;
        for (const q of list) {
          const num = questionIndex++;
          out += renderRichContentToWordXml(
            q.stem,
            textWithMathAndImgToRuns(`${num}. `, { sz: 21, bold: true }),
            '',
            { sz: 21 },
            { before: 120, after: 40 }
          );

          if (q.image) {
            out += makeParagraph(registerImageTag(`<img src="${q.image}" data-cx="2232000" data-cy="600923">`), { indent: 360, before: 60, after: 60 });
          }

          if (isChoice && q.options && q.options.length > 0) {
            out += makeOptionsTable(q.options);
          }

          if (isCalc && !isTeacher) {
            const answerSpaceTwips = Math.round((state.answerSpaceHeights[q.id] || 112) * 15);
            out += `<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="${answerSpaceTwips}" w:lineRule="exact"/></w:pPr><w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t xml:space="preserve"> </w:t></w:r></w:p>`;
          }

          if (isTeacher) {
            out += renderRichContentToWordXml(
              q.answer,
              textWithMathAndImgToRuns('【答案】', { sz: 19, bold: true, color: '1D4ED8' }),
              '',
              { sz: 19, color: '1D4ED8' },
              { indent: 360, before: 40, after: 20 }
            );
            if (q.analysis) {
              out += renderRichContentToWordXml(
                q.analysis,
                textWithMathAndImgToRuns('【分析】', { sz: 19, bold: true, color: '475569' }),
                '',
                { sz: 19, color: '475569' },
                { indent: 360, before: 20, after: 20 }
              );
            }
            if (q.detail) {
              out += renderRichContentToWordXml(
                q.detail,
                textWithMathAndImgToRuns('【详解】', { sz: 19, bold: true, color: '334155' }),
                '',
                { sz: 19, color: '334155' },
                { indent: 360, before: 20, after: 20 }
              );
            }
          }
        }
        return out;
      }

      if (choices.length > 0) {
        bodyXml += makeParagraph(
          textWithMathAndImgToRuns(`一、选择题（本大题共 ${choices.length} 小题，在每小题列出的选项中，选出符合题目的一项）`, { sz: 22, bold: true, font: '黑体' }),
          { before: 180, after: 80 }
        );
        bodyXml += renderQuestionListXml(choices, true, false);
      }

      if (blanks.length > 0) {
        bodyXml += makeParagraph(
          textWithMathAndImgToRuns(`二、填空题（本大题共 ${blanks.length} 小题）`, { sz: 22, bold: true, font: '黑体' }),
          { before: 200, after: 80 }
        );
        bodyXml += renderQuestionListXml(blanks, false, false, choices.length + 1);
      }

      if (calcs.length > 0) {
        bodyXml += makeParagraph(
          textWithMathAndImgToRuns(`三、解答题（本大题共 ${calcs.length} 小题。解答应写出文字说明、演算步骤或推证过程）`, { sz: 22, bold: true, font: '黑体' }),
          { before: 200, after: 80 }
        );
bodyXml += renderQuestionListXml(calcs, false, true, choices.length + blanks.length + 1);
      }

      const colsXml = isDouble ? `<w:cols w:num="2" w:sep="1" w:space="425"/>` : '';
      const pageW = isDouble ? '16838' : '11906';
      const pageH = isDouble ? '11906' : '16838';
      const orient = isDouble ? ' w:orient="landscape"' : '';

      const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${bodyXml}<w:sectPr><w:pgSz w:w="${pageW}" w:h="${pageH}"${orient}/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="720" w:footer="720" w:gutter="0"/>${colsXml}</w:sectPr></w:body></w:document>`;

      const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="png" ContentType="image/png"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`;

      const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;

      const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${relsExtra.join('')}</Relationships>`;

      const enc = new TextEncoder();
      const zipEntries = [
        { name: '[Content_Types].xml', data: enc.encode(contentTypesXml) },
        { name: '_rels/.rels', data: enc.encode(rootRelsXml) },
        { name: 'word/document.xml', data: enc.encode(documentXml) },
        { name: 'word/_rels/document.xml.rels', data: enc.encode(docRelsXml) },
        ...mediaFiles
      ];

      const zipBytes = await buildZipBlobBytes(zipEntries);
      const blob = new Blob([zipBytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const suffix = isTeacher ? '_教师解析版' : '_学生用卷';
      a.download = `初中数学试卷${suffix}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('已导出标准 Word (.docx) 试卷（含原生公式与高清插图）！', 'success');
    }

