
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

    function decodeHtmlEntities(str) {
      if (!str) return '';
      return String(str)
        .replace(/&nbsp;/gi, ' ')
        .replace(/&emsp;/gi, '　')
        .replace(/&ensp;/gi, ' ')
        .replace(/&thinsp;/gi, ' ')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/&times;/gi, '×')
        .replace(/&divide;/gi, '÷')
        .replace(/&le;/gi, '≤')
        .replace(/&ge;/gi, '≥')
        .replace(/&ne;/gi, '≠')
        .replace(/&deg;/gi, '°')
        .replace(/&plusmn;/gi, '±')
        .replace(/&amp;/gi, '&');
    }

    function escXml(str) {
      return decodeHtmlEntities(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    }

    function ommlRun(text, isText = false) {
      if (!text) return '';
      const sty = isText ? '<m:rPr><m:sty m:val="p"/></m:rPr>' : '';
      return `<m:r>${sty}<w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:eastAsia="宋体" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr><m:t xml:space="preserve">${escXml(text)}</m:t></m:r>`;
    }

    function ommlSup(baseXml, supXml) {
      return `<m:sSup><m:sSupPr><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:sSupPr><m:e>${baseXml}</m:e><m:sup>${supXml}</m:sup></m:sSup>`;
    }

    function ommlSub(baseXml, subXml) {
      return `<m:sSub><m:sSubPr><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:sSubPr><m:e>${baseXml}</m:e><m:sub>${subXml}</m:sub></m:sSub>`;
    }

    function ommlSubSup(baseXml, subXml, supXml) {
      return `<m:sSubSup><m:sSubSupPr><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:sSubSupPr><m:e>${baseXml}</m:e><m:sub>${subXml}</m:sub><m:sup>${supXml}</m:sup></m:sSubSup>`;
    }

    function ommlRad(radicandXml, degXml = '') {
      if (degXml) {
        return `<m:rad><m:radPr><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:radPr><m:deg>${degXml}</m:deg><m:e>${radicandXml}</m:e></m:rad>`;
      }
      return `<m:rad><m:radPr><m:degHide m:val="1"/><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:radPr><m:deg/><m:e>${radicandXml}</m:e></m:rad>`;
    }

    function ommlFrac(numXml, denXml) {
      return `<m:f><m:fPr><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:fPr><m:num>${numXml}</m:num><m:den>${denXml}</m:den></m:f>`;
    }

    function ommlDelim(begChr, endChr, innerXml) {
      return `<m:d><m:dPr><m:begChr m:val="${escXml(begChr)}"/><m:endChr m:val="${escXml(endChr)}"/><m:grow m:val="1"/><m:shp m:val="match"/><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:dPr><m:e>${innerXml}</m:e></m:d>`;
    }

    function ommlBar(baseXml, pos = 'top') {
      return `<m:bar><m:barPr><m:pos m:val="${escXml(pos)}"/><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:barPr><m:e>${baseXml}</m:e></m:bar>`;
    }

    function ommlCases(rowsXml) {
      return `<m:d><m:dPr><m:begChr m:val="{"/><m:endChr m:val=""/><m:grow m:val="1"/><m:shp m:val="match"/><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:dPr><m:e><m:eqArr><m:eqArrPr/>${rowsXml}</m:eqArr></m:e></m:d>`;
    }

    function ommlMatrix(rowsCellsXml, colCount = 1, begChr = '', endChr = '') {
      const safeCols = Math.max(1, colCount);
      const mrXml = rowsCellsXml.map(cells => {
        const padded = cells.slice();
        while (padded.length < safeCols) padded.push('');
        return `<m:mr>${padded.map(c => `<m:e>${c}</m:e>`).join('')}</m:mr>`;
      }).join('');
      const mXml = `<m:m><m:mPr><m:mcs><m:mc><m:mcPr><m:count m:val="${safeCols}"/><m:mcJc m:val="center"/></m:mcPr></m:mc></m:mcs><m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math" w:cs="Cambria Math"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></m:ctrlPr></m:mPr>${mrXml}</m:m>`;
      if (begChr || endChr) {
        return ommlDelim(begChr, endChr, mXml);
      }
      return mXml;
    }

    // 独立封装的环境行拆分函数（供 cases 和各类 matrix 共用）：
    // - 严格追踪花括号深度与嵌套 \begin...\end 环境深度
    // - 仅识别真正的 LaTeX 行分隔符 \\（含可选间距如 \\[2pt]）或顶层换行符
    // - 绝不将 \frac、\text、\ne 等单反斜杠命令误判为换行符
    function splitLatexEnvRows(body) {
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
              // 跳过可选行距参数如 \\[4pt]
              let tempI = i;
              while (tempI < str.length && (str[tempI] === ' ' || str[tempI] === '\t')) tempI++;
              if (str[tempI] === '[') {
                const closeB = str.indexOf(']', tempI + 1);
                if (closeB !== -1) i = closeB + 1;
              }
              // 若紧接换行符则一并消费，避免产生空行
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
          if (str.startsWith('\\begin{', i)) {
            envDepth++;
          } else if (str.startsWith('\\end{', i)) {
            if (envDepth > 0) envDepth--;
          }
          // 保留单反斜杠及其后的命令名或字符
          cur += str[i];
          i++;
          while (i < str.length && /[A-Za-z]/.test(str[i])) {
            cur += str[i];
            i++;
          }
          continue;
        }
        if (str[i] === '{') {
          braceDepth++;
          cur += str[i];
          i++;
          continue;
        }
        if (str[i] === '}') {
          if (braceDepth > 0) braceDepth--;
          cur += str[i];
          i++;
          continue;
        }
        if ((str[i] === '\n' || str[i] === '\r') && braceDepth === 0 && envDepth === 0) {
          if (cur.trim()) {
            rows.push(cur.trim());
            cur = '';
          }
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

    // 独立封装的环境列拆分函数（按顶层未转义的 & 拆分单元格）
    function splitLatexEnvCols(row) {
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
          while (i < str.length && /[A-Za-z]/.test(str[i])) {
            cur += str[i];
            i++;
          }
          continue;
        }
        if (str[i] === '{') {
          braceDepth++;
          cur += str[i];
          i++;
          continue;
        }
        if (str[i] === '}') {
          if (braceDepth > 0) braceDepth--;
          cur += str[i];
          i++;
          continue;
        }
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

    function findMatchingEnvEnd(str, startAfterBegin, envName) {
      const beginTag = `\\begin{${envName}}`;
      const endTag = `\\end{${envName}}`;
      let depth = 1;
      let k = startAfterBegin;
      while (k < str.length) {
        if (str.startsWith(beginTag, k)) {
          depth++;
          k += beginTag.length;
        } else if (str.startsWith(endTag, k)) {
          depth--;
          if (depth === 0) return k;
          k += endTag.length;
        } else {
          k++;
        }
      }
      return -1;
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
            if (input[k] === '\\' && (input[k + 1] === '{' || input[k + 1] === '}')) {
              k++;
              continue;
            }
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
      // Use (?![a-zA-Z]) instead of \b so commands followed immediately by digits (e.g. \cdot3, \ne0, \ge3, \langle1) are accurately matched.
      let s = normalizeCompactFractions(String(tex)
        .replace(/\\(?:dfrac|tfrac)(?![a-zA-Z])/g, '\\frac'))
        .replace(/\\%/g, '%')
        .replace(/\\&/g, '&')
        .replace(/\\(?:Big|big|bigg|Bigg)[lrm]?\s*(\\[{}]|\\langle|\\rangle|[(\[\]|)])/g, '$1')
        .replace(/\\underset\{\\cdot\}\{([^{}]*)\}/g, '$1\u0323')
        .replace(/\\dot\{([^{}]*)\}/g, '$1\u0307')
        .replace(/\\dot\s+([0-9A-Za-z])/g, '$1\u0307')
        .replace(/\\,/g, ' ')
        .replace(/\\(?:qquad|quad|enspace)(?![a-zA-Z])/g, '  ')
        .replace(/\\[;:!]/g, ' ')
        .replace(/[\u00a0\u2002-\u200a\u202f\u205f\u3000]/g, ' ')
        .replace(/\\overset\{\\frown\}\{([^{}]*)\}/g, '$1⏜')
        .replace(/\\wideparen\{([^{}]*)\}/g, '$1⏜')
        .replace(/\\(?:implies|Rightarrow)(?![a-zA-Z])/g, '⇒')
        .replace(/\\(?:iff|Leftrightarrow)(?![a-zA-Z])/g, '⇔')
        .replace(/\\leftrightarrow(?![a-zA-Z])/g, '↔')
        .replace(/\\(?:rightarrow|to)(?![a-zA-Z])/g, '→')
        .replace(/\\leftarrow(?![a-zA-Z])/g, '←')
        .replace(/\\uparrow(?![a-zA-Z])/g, '↑')
        .replace(/\\downarrow(?![a-zA-Z])/g, '↓')
        .replace(/\\otimes(?![a-zA-Z])/g, '⊗')
        .replace(/\\oplus(?![a-zA-Z])/g, '⊕')
        .replace(/\\odot(?![a-zA-Z])/g, '⊙')
        .replace(/\\langle(?![a-zA-Z])/g, '⟨')
        .replace(/\\rangle(?![a-zA-Z])/g, '⟩')
        .replace(/\\Omega(?![a-zA-Z])/g, 'Ω')
        .replace(/\\Phi(?![a-zA-Z])/g, 'Φ')
        .replace(/\\checkmark(?![a-zA-Z])/g, '✓')
        .replace(/\\varnothing(?![a-zA-Z])/g, '∅')
        .replace(/\\blacksquare(?![a-zA-Z])/g, '■')
        .replace(/\\star(?![a-zA-Z])/g, '⋆')
        .replace(/\\ast(?![a-zA-Z])/g, '∗')
        .replace(/\\sum(?![a-zA-Z])/g, '∑')
        .replace(/\\backsim(?![a-zA-Z])/g, '∽')
        .replace(/\\sim(?![a-zA-Z])/g, '∽')
        .replace(/\\angle(?![a-zA-Z])/g, '∠')
        .replace(/\\circ(?![a-zA-Z])/g, '°')
        .replace(/\\parallel(?![a-zA-Z])/g, '∥')
        .replace(/\\perp(?![a-zA-Z])/g, '⊥')
        .replace(/\\cong(?![a-zA-Z])/g, '≅')
        .replace(/\\alpha(?![a-zA-Z])/g, 'α')
        .replace(/\\beta(?![a-zA-Z])/g, 'β')
        .replace(/\\gamma(?![a-zA-Z])/g, 'γ')
        .replace(/\\theta(?![a-zA-Z])/g, 'θ')
        .replace(/\\lambda(?![a-zA-Z])/g, 'λ')
        .replace(/\\mu(?![a-zA-Z])/g, 'μ')
        .replace(/\\sigma(?![a-zA-Z])/g, 'σ')
        .replace(/\\omega(?![a-zA-Z])/g, 'ω')
        .replace(/\\pi(?![a-zA-Z])/g, 'π')
        .replace(/\\pm(?![a-zA-Z])/g, '±')
        .replace(/\\mp(?![a-zA-Z])/g, '∓')
        .replace(/\\leq?(?![a-zA-Z])/g, '≤')
        .replace(/\\geq?(?![a-zA-Z])/g, '≥')
        .replace(/\\lt(?![a-zA-Z])/g, '<')
        .replace(/\\gt(?![a-zA-Z])/g, '>')
        .replace(/\\notin(?![a-zA-Z])/g, '∉')
        .replace(/\\in(?![a-zA-Z])/g, '∈')
        .replace(/\\infty(?![a-zA-Z])/g, '∞')
        .replace(/\\cdots(?![a-zA-Z])/g, '⋯')
        .replace(/\\dots(?![a-zA-Z])/g, '…')
        .replace(/\\cdot(?![a-zA-Z])/g, '·')
        .replace(/\\times(?![a-zA-Z])/g, '×')
        .replace(/\\div(?![a-zA-Z])/g, '÷')
        .replace(/\\neq?(?![a-zA-Z])/g, '≠')
        .replace(/\\approx(?![a-zA-Z])/g, '≈')
        .replace(/\\because(?![a-zA-Z])/g, '∵')
        .replace(/\\therefore(?![a-zA-Z])/g, '∴')
        .replace(/\\triangle(?![a-zA-Z])/g, '△')
        .replace(/\\Delta(?![a-zA-Z])/g, 'Δ')
        .replace(/\\square(?![a-zA-Z])/g, '□')
        .replace(/\\Box(?![a-zA-Z])/g, '□')
        .replace(/\\underbrace\{([^{}]*)\}_\{([^{}]*)\}/g, '$1（共 $2）')
        .replace(/\\underbrace\{([^{}]*)\}/g, '$1')
        .replace(/(?<!\\)\\[ \t]+/g, ' ')
        .trim();

      function readBraceGroup(str, i) {
        let depth = 0;
        let start = i + 1;
        for (let k = i; k < str.length; k++) {
          if (str[k] === '\\' && (str[k + 1] === '{' || str[k + 1] === '}')) {
            k++;
            continue;
          }
          if (str[k] === '{') depth++;
          else if (str[k] === '}') {
            depth--;
            if (depth === 0) return { content: str.slice(start, k), nextIdx: k + 1 };
          }
        }
        return { content: str.slice(start), nextIdx: str.length };
      }

      function readDelimiterToken(str, pos) {
        while (pos < str.length && str[pos] === ' ') pos++;
        if (pos >= str.length) return { chr: '', nextIdx: pos };
        if (str.startsWith('\\{', pos)) return { chr: '{', nextIdx: pos + 2 };
        if (str.startsWith('\\}', pos)) return { chr: '}', nextIdx: pos + 2 };
        if (str.startsWith('\\langle', pos)) return { chr: '⟨', nextIdx: pos + 7 };
        if (str.startsWith('\\rangle', pos)) return { chr: '⟩', nextIdx: pos + 7 };
        if (str.startsWith('\\vert', pos)) return { chr: '|', nextIdx: pos + 5 };
        if (str.startsWith('\\Vert', pos)) return { chr: '‖', nextIdx: pos + 5 };
        if (str[pos] === '.') return { chr: '', nextIdx: pos + 1 };
        return { chr: str[pos], nextIdx: pos + 1 };
      }

      const atoms = [];
      let i = 0;
      while (i < s.length) {
        if (s.startsWith('\\begin{cases}', i)) {
          const bodyStart = i + 13;
          const endIdx = findMatchingEnvEnd(s, bodyStart, 'cases');
          const body = endIdx !== -1 ? s.slice(bodyStart, endIdx) : s.slice(bodyStart);
          const rows = splitLatexEnvRows(body);
          const eqArrInner = rows.map(r => {
            const cols = splitLatexEnvCols(r);
            const rowXml = cols.map(c => parseLatexInner(c)).join(ommlRun('　', true));
            return `<m:e>${rowXml}</m:e>`;
          }).join('');
          atoms.push(ommlCases(eqArrInner));
          i = endIdx !== -1 ? endIdx + 11 : s.length;
        } else if (/^\\begin\{(p?matrix|bmatrix|Bmatrix|vmatrix|Vmatrix)\}/.test(s.slice(i))) {
          const envMatch = s.slice(i).match(/^\\begin\{(p?matrix|bmatrix|Bmatrix|vmatrix|Vmatrix)\}/);
          const envName = envMatch[1];
          const bodyStart = i + envMatch[0].length;
          const endIdx = findMatchingEnvEnd(s, bodyStart, envName);
          const body = endIdx !== -1 ? s.slice(bodyStart, endIdx) : s.slice(bodyStart);
          const rawRows = splitLatexEnvRows(body);
          let maxCols = 1;
          const parsedRows = rawRows.map(r => {
            const cols = splitLatexEnvCols(r);
            if (cols.length > maxCols) maxCols = cols.length;
            return cols.map(c => parseLatexInner(c));
          });
          const delimMap = {
            matrix: ['', ''],
            pmatrix: ['(', ')'],
            bmatrix: ['[', ']'],
            Bmatrix: ['{', '}'],
            vmatrix: ['|', '|'],
            Vmatrix: ['‖', '‖']
          };
          const [begChr, endChr] = delimMap[envName] || ['', ''];
          atoms.push(ommlMatrix(parsedRows, maxCols, begChr, endChr));
          i = endIdx !== -1 ? endIdx + envName.length + 6 : s.length;
        } else if (s.startsWith('\\\\', i)) {
          atoms.push(ommlRun(' '));
          i += 2;
        } else if (s.startsWith('\\{', i)) {
          atoms.push(ommlRun('{'));
          i += 2;
        } else if (s.startsWith('\\}', i)) {
          atoms.push(ommlRun('}'));
          i += 2;
        } else if (s.startsWith('\\overline', i) && !/[A-Za-z]/.test(s[i + 9] || '')) {
          let nextI = i + 9;
          while (nextI < s.length && s[nextI] === ' ') nextI++;
          if (s[nextI] === '{') {
            const g = readBraceGroup(s, nextI);
            atoms.push(ommlBar(parseLatexInner(g.content), 'top'));
            i = g.nextIdx;
          } else if (nextI < s.length) {
            atoms.push(ommlBar(ommlRun(s[nextI]), 'top'));
            i = nextI + 1;
          } else {
            i = nextI;
          }
        } else if (s.startsWith('\\text{', i) || s.startsWith('\\mathrm{', i) || s.startsWith('\\mathbf{', i)) {
          const cmdLen = s.startsWith('\\text{', i) ? 5 : 7;
          const g = readBraceGroup(s, i + cmdLen);
          atoms.push(ommlRun(g.content, true));
          i = g.nextIdx;
        } else if (/^\\(min|max|sin|cos|tan|log|ln)(?![a-zA-Z])/.test(s.slice(i))) {
          const fnMatch = s.slice(i).match(/^\\(min|max|sin|cos|tan|log|ln)(?![a-zA-Z])/);
          atoms.push(ommlRun(fnMatch[1], true));
          i += fnMatch[0].length;
        } else if (s.startsWith('\\sqrt', i) && !/[A-Za-z]/.test(s[i + 5] || '')) {
          let nextI = i + 5;
          while (nextI < s.length && s[nextI] === ' ') nextI++;
          let degXml = '';
          if (s[nextI] === '[') {
            const closeBracket = s.indexOf(']', nextI + 1);
            if (closeBracket !== -1) {
              degXml = parseLatexInner(s.slice(nextI + 1, closeBracket));
              nextI = closeBracket + 1;
              while (nextI < s.length && s[nextI] === ' ') nextI++;
            }
          }
          if (s[nextI] === '{') {
            const g = readBraceGroup(s, nextI);
            atoms.push(ommlRad(parseLatexInner(g.content), degXml));
            i = g.nextIdx;
          } else if (nextI < s.length) {
            atoms.push(ommlRad(ommlRun(s[nextI]), degXml));
            i = nextI + 1;
          } else {
            i = nextI;
          }
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
        } else if (s.startsWith('\\left', i) && !/[A-Za-z]/.test(s[i + 5] || '')) {
          const begTok = readDelimiterToken(s, i + 5);
          const begChr = begTok.chr;
          i = begTok.nextIdx;
          let depth = 1;
          let startInner = i;
          let endInner = s.length;
          let endChr = begChr === '(' ? ')' : (begChr === '[' ? ']' : (begChr === '{' ? '}' : begChr));
          let afterRight = s.length;
          while (i < s.length) {
            if (s.startsWith('\\left', i) && !/[A-Za-z]/.test(s[i + 5] || '')) {
              depth++;
              i += 5;
            } else if (s.startsWith('\\right', i) && !/[A-Za-z]/.test(s[i + 6] || '')) {
              depth--;
              if (depth === 0) {
                endInner = i;
                const endTok = readDelimiterToken(s, i + 6);
                endChr = endTok.chr;
                afterRight = endTok.nextIdx;
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
        } else if (s[i] === '\\' && /[A-Za-z]/.test(s[i + 1] || '')) {
          // 未被前置映射消耗的命令：保持完整命令标记，不拆碎为单字符，也不静默丢弃
          let endCmd = i + 1;
          while (endCmd < s.length && /[A-Za-z]/.test(s[endCmd])) endCmd++;
          atoms.push(ommlRun(s.slice(i, endCmd), true));
          i = endCmd;
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
            if (/\\(?:frac|dfrac|tfrac|sqrt|begin)(?![a-zA-Z])/.test(innerStr)) {
              atoms.push(ommlDelim(begChr, endChr, parseLatexInner(innerStr)));
            } else {
              atoms.push(ommlRun(begChr) + parseLatexInner(innerStr) + ommlRun(endChr));
            }
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
        } else if (s[i] === '_') {
          i++;
          let subXml = '';
          if (i < s.length && s[i] === '{') {
            const g = readBraceGroup(s, i);
            subXml = parseLatexInner(g.content);
            i = g.nextIdx;
          } else if (i < s.length) {
            subXml = ommlRun(s[i]);
            i++;
          }
          const prevAtom = atoms.length > 0 ? atoms.pop() : ommlRun('');
          if (i < s.length && s[i] === '^') {
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
            atoms.push(ommlSubSup(prevAtom, subXml, supXml));
          } else {
            atoms.push(ommlSub(prevAtom, subXml));
          }
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
          if (i < s.length && s[i] === '_') {
            i++;
            let subXml = '';
            if (i < s.length && s[i] === '{') {
              const g = readBraceGroup(s, i);
              subXml = parseLatexInner(g.content);
              i = g.nextIdx;
            } else if (i < s.length) {
              subXml = ommlRun(s[i]);
              i++;
            }
            atoms.push(ommlSubSup(prevAtom, subXml, supXml));
          } else {
            atoms.push(ommlSup(prevAtom, supXml));
          }
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

    if (typeof window !== 'undefined') {
      window.splitLatexEnvRows = splitLatexEnvRows;
      window.splitLatexEnvCols = splitLatexEnvCols;
      window.normalizeCompactFractions = normalizeCompactFractions;
      window.parseLatexInner = parseLatexInner;
      window.latexToOmml = latexToOmml;
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
      return `<w:r><w:drawing><wp:inline xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${docPrId}" name="Picture ${docPrId}"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${docPrId}" name="image${docPrId}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"/></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
    }

    function base64ToUint8Array(b64) {
      const binStr = atob(b64);
      const len = binStr.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binStr.charCodeAt(i);
      return bytes;
    }

    function getImageDimensionsFromBytes(bytes) {
      if (!bytes || bytes.length < 24) return null;
      // PNG: 89 50 4E 47 0D 0A 1A 0A, IHDR width/height at offset 16..23
      if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const width = view.getUint32(16, false);
        const height = view.getUint32(20, false);
        if (width > 0 && height > 0) return { width, height };
      }
      // GIF: GIF87a / GIF89a
      if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const width = view.getUint16(6, true);
        const height = view.getUint16(8, true);
        if (width > 0 && height > 0) return { width, height };
      }
      // JPEG: FF D8 ... SOF0/SOF1/SOF2/SOF3
      if (bytes[0] === 0xFF && bytes[1] === 0xD8) {
        let offset = 2;
        while (offset + 8 < bytes.length) {
          if (bytes[offset] !== 0xFF) break;
          const marker = bytes[offset + 1];
          if (marker === 0xD9 || marker === 0xDA) break;
          if (marker >= 0xC0 && marker <= 0xC3) {
            const height = (bytes[offset + 5] << 8) | bytes[offset + 6];
            const width = (bytes[offset + 7] << 8) | bytes[offset + 8];
            if (width > 0 && height > 0) return { width, height };
            break;
          }
          const segLen = (bytes[offset + 2] << 8) | bytes[offset + 3];
          if (segLen < 2) break;
          offset += 2 + segLen;
        }
      }
      return null;
    }

    const IMAGE_BASE64_PARTS = [
      'js/data/images-base64-part1.js',
      'js/data/images-base64-part2.js',
      'js/data/images-base64-part3.js',
      'js/data/images-base64-part4.js'
    ];

    async function ensureImageBase64Loaded() {
      window.IMAGE_BASE64_MAP = window.IMAGE_BASE64_MAP || {};
      window._imageBase64LoadedParts = window._imageBase64LoadedParts || new Set();
      window._imageBase64PendingLoads = window._imageBase64PendingLoads || new Map();

      if (window._imageBase64AllPartsLoaded && IMAGE_BASE64_PARTS.every(src => window._imageBase64LoadedParts.has(src))) {
        window._imageBase64LastResult = { ok: true, failedParts: [] };
        return window.IMAGE_BASE64_MAP;
      }

      function loadPart(src) {
        if (window._imageBase64LoadedParts.has(src)) {
          return Promise.resolve({ src, ok: true });
        }
        if (window._imageBase64PendingLoads.has(src)) {
          return window._imageBase64PendingLoads.get(src);
        }

        const promise = new Promise((resolve) => {
          let settled = false;
          const finish = (ok, scriptEl) => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            window._imageBase64PendingLoads.delete(src);
            if (ok) {
              if (scriptEl) scriptEl.dataset.loaded = 'true';
              window._imageBase64LoadedParts.add(src);
            } else {
              console.warn('Failed to load image map chunk:', src);
              if (scriptEl && scriptEl.parentNode) {
                scriptEl.parentNode.removeChild(scriptEl);
              }
            }
            resolve({ src, ok });
          };

          const existing = document.querySelector(`script[src="${src}"]`);
          if (existing && existing.dataset.loaded === 'true') {
            window._imageBase64LoadedParts.add(src);
            window._imageBase64PendingLoads.delete(src);
            resolve({ src, ok: true });
            return;
          }
          if (existing && existing.parentNode) {
            existing.parentNode.removeChild(existing);
          }

          const s = document.createElement('script');
          s.src = src;
          s.async = true;
          const timer = setTimeout(() => finish(false, s), 15000);
          s.onload = () => finish(true, s);
          s.onerror = () => finish(false, s);
          document.body.appendChild(s);
        });

        window._imageBase64PendingLoads.set(src, promise);
        return promise;
      }

      const results = await Promise.all(IMAGE_BASE64_PARTS.map(loadPart));
      const failedParts = results.filter(r => !r.ok).map(r => r.src);
      window._imageBase64AllPartsLoaded = failedParts.length === 0 && IMAGE_BASE64_PARTS.every(src => window._imageBase64LoadedParts.has(src));
      window._imageBase64LastResult = {
        ok: window._imageBase64AllPartsLoaded,
        failedParts
      };

      return window.IMAGE_BASE64_MAP;
    }
    window.ensureImageBase64Loaded = ensureImageBase64Loaded;

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

      // 1. Collect only images actually needed for the current paper
      window._wordImageBytesCache = window._wordImageBytesCache || new Map();
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
        if (isTeacher) {
          collectSrcs(q.answer);
          collectSrcs(q.analysis);
          collectSrcs(q.detail);
        }
      }

      function resolveImageBytesFromDataUriOrMap(src) {
        const cleanKey = src.replace(/^\.?\//, '');
        const mapped = window.IMAGE_BASE64_MAP && (window.IMAGE_BASE64_MAP[cleanKey] || window.IMAGE_BASE64_MAP[src]);
        const dataUri = mapped || (src.startsWith('data:image/') ? src : null);
        if (dataUri && dataUri.startsWith('data:image/')) {
          const m = dataUri.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
          if (m) return base64ToUint8Array(m[1]);
        }
        return null;
      }

      // 2. Skip all image loading if the paper has no images; otherwise fetch only needed images first
      if (imageSrcList.size > 0) {
        const isFileProtocol = typeof location !== 'undefined' && location.protocol === 'file:';
        const unresolvedSrcs = [];

        await Promise.all(Array.from(imageSrcList).map(async (src) => {
          if (window._wordImageBytesCache.has(src)) {
            imageBufferCache.set(src, window._wordImageBytesCache.get(src));
            return;
          }

          const fromMap = resolveImageBytesFromDataUriOrMap(src);
          if (fromMap) {
            window._wordImageBytesCache.set(src, fromMap);
            imageBufferCache.set(src, fromMap);
            return;
          }

          if (!isFileProtocol) {
            try {
              const res = await fetch(src);
              if (res.ok) {
                const buf = await res.arrayBuffer();
                const bytes = new Uint8Array(buf);
                window._wordImageBytesCache.set(src, bytes);
                imageBufferCache.set(src, bytes);
                return;
              }
            } catch (err) {
              console.warn('Word export: direct fetch failed, will try Base64 fallback:', src, err);
            }
          }

          unresolvedSrcs.push(src);
        }));

        // 3. Fallback to Base64 chunks only when some images could not be fetched directly (e.g. file:// mode)
        if (unresolvedSrcs.length > 0) {
          await ensureImageBase64Loaded();
          let stillMissing = 0;
          for (const src of unresolvedSrcs) {
            const fromMap = resolveImageBytesFromDataUriOrMap(src);
            if (fromMap) {
              window._wordImageBytesCache.set(src, fromMap);
              imageBufferCache.set(src, fromMap);
            } else {
              stillMissing++;
            }
          }
          if (stillMissing > 0 && window._imageBase64LastResult && !window._imageBase64LastResult.ok) {
            showToast(`部分图片资源包加载失败（缺失 ${stillMissing} 张图），可稍后重新导出以自动重试`, 'warn');
          }
        }
      }

      const defaultMaxCx = isDouble ? 1500000 : 1800000;
      const defaultMaxCy = isDouble ? 1250000 : 1450000;

      function registerImageTag(imgTag, maxCx = defaultMaxCx, maxCy = defaultMaxCy) {
        const srcM = imgTag.match(/src=["']([^"']+)["']/i);
        if (!srcM) return '';
        const src = srcM[1];
        let imgBytes = imageBufferCache.get(src);
        if (!imgBytes) {
          const cleanKey = src.replace(/^\.?\//, '');
          const mapped = window.IMAGE_BASE64_MAP && (window.IMAGE_BASE64_MAP[cleanKey] || window.IMAGE_BASE64_MAP[src]);
          const dataUri = mapped || (src.startsWith('data:image/') ? src : null);
          if (dataUri && dataUri.startsWith('data:image/')) {
            const m = dataUri.match(/base64,([A-Za-z0-9+/=]+)/);
            if (m) imgBytes = base64ToUint8Array(m[1]);
          }
        }
        if (!imgBytes) return '';

        const cxM = imgTag.match(/data-cx="(\d+)"/);
        const cyM = imgTag.match(/data-cy="(\d+)"/);
        let cx;
        let cy;
        if (cxM && cyM) {
          cx = parseInt(cxM[1], 10);
          cy = parseInt(cyM[1], 10);
        } else {
          const dims = getImageDimensionsFromBytes(imgBytes);
          const styleWidthM = imgTag.match(/(?:max-)?width\s*:\s*(\d+)px/i);
          if (styleWidthM) {
            cx = parseInt(styleWidthM[1], 10) * 5200;
          } else if (dims) {
            cx = dims.width * 5200;
          } else {
            cx = maxCx;
          }
          if (dims && dims.width > 0 && dims.height > 0) {
            cy = Math.round(cx * (dims.height / dims.width));
          } else {
            cy = Math.round(cx * 0.75);
          }
        }
        const scale = Math.min(1, maxCx / cx, maxCy / cy);
        if (scale < 1) {
          cx = Math.round(cx * scale);
          cy = Math.round(cy * scale);
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
        const maxCx = opts.maxCx || defaultMaxCx;
        const maxCy = opts.maxCy || defaultMaxCy;
        const rPr = `<w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="${font}" w:cs="Times New Roman"/>${bold}${color}<w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/></w:rPr>`;

        const imgSplit = String(text).split(/(<img[^>]+>)/g);
        let xml = '';
        for (const seg of imgSplit) {
          if (!seg) continue;
          if (seg.startsWith('<img')) {
            xml += registerImageTag(seg, maxCx, maxCy);
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
        s = decodeHtmlEntities(s);
        return s.split('\n').map(l => l.trim()).filter(Boolean);
      }

      function htmlTableToWordTbl(tableHtml) {
        const trMatches = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
        if (trMatches.length === 0) return '';
        let maxCols = 1;
        const parsedRows = trMatches.map(trM => {
          const tds = [...trM[1].matchAll(/<t([hd])([^>]*)>([\s\S]*?)<\/t\1>/gi)].map(tdM => {
            const isHeader = tdM[1].toLowerCase() === 'h';
            const attrs = tdM[2] || '';
            const csM = attrs.match(/colspan="(\d+)"/i);
            const span = csM ? parseInt(csM[1], 10) : 1;
            return { span, isHeader, content: tdM[3] };
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
              ? cellLines.map(cl => makeParagraph(textWithMathAndImgToRuns(cl, { sz: 19, bold: td.isHeader, maxCx: Math.max(800000, w * 550) }), { align: 'center', before: 20, after: 20, line: 260 })).join('')
              : makeParagraph('', { align: 'center', before: 20, after: 20, line: 260 });
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
                if (firstPrefixXml && lines[i].trim().startsWith('<img')) {
                  outXml += makeParagraph(firstPrefixXml + textWithMathAndImgToRuns(firstSuffixText, textOpts), pOpts);
                  outXml += makeParagraph(textWithMathAndImgToRuns(lines[i], textOpts), { ...pOpts, indent: 360, before: 20, after: 20 });
                } else {
                  const lineStr = lines[i] + (firstSuffixText ? ` ${firstSuffixText}` : '');
                  outXml += makeParagraph(firstPrefixXml + textWithMathAndImgToRuns(lineStr, textOpts), pOpts);
                }
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
        // 4 columns for short text options, 2 columns for medium options, 1 column for long options.
        const hasImg = options.some(option => /<img/i.test(option));
        const maxLen = Math.max(...options.map(option => option
          .replace(/<img[^>]*>/gi, ' image ')
          .replace(/<[^>]*>/g, '')
          .replace(/\$([^$]+)\$/g, (_, tex) => tex).length));
        const cols = (!hasImg && maxLen <= 14) ? 4 : (maxLen > 65 ? 1 : 2);
        const colWidth = Math.floor(9000 / cols);
        const maxImgCx = cols === 1 ? 1800000 : (cols === 4 ? 1100000 : 1450000);
        const maxImgCy = cols === 1 ? 1350000 : (cols === 4 ? 950000 : 1150000);

        let rowsXml = '';
        for (let r = 0; r < options.length; r += cols) {
          const slice = options.slice(r, r + cols);
          let cellsXml = '';
          for (let c = 0; c < cols; c++) {
            const optText = slice[c] || '';
            const optLines = splitHtmlLinesPreserveImg(optText);
            const cellContentXml = optLines.length > 0
              ? optLines.map(line => makeParagraph(textWithMathAndImgToRuns(line, { sz: 21, maxCx: maxImgCx, maxCy: maxImgCy }), { before: 20, after: 20, line: 280 })).join('')
              : makeParagraph('', { before: 20, after: 20, line: 280 });
            cellsXml += `<w:tc><w:tcPr><w:tcW w:w="${colWidth}" w:type="dxa"/></w:tcPr>${cellContentXml}</w:tc>`;
          }
          rowsXml += `<w:tr>${cellsXml}</w:tr>`;
        }

        return `<w:tbl><w:tblPr><w:tblW w:w="9000" w:type="dxa"/><w:tblInd w:w="360" w:type="dxa"/><w:tblBorders><w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/><w:insideH w:val="none"/><w:insideV w:val="none"/></w:tblBorders></w:tblPr>${rowsXml}</w:tbl>`;
      }

      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const year = now.getFullYear();
      const month = pad(now.getMonth() + 1);
      const date = pad(now.getDate());
      const hours = pad(now.getHours());
      const minutes = pad(now.getMinutes());
      const timeStr = `${year}年${month}月${date}日 ${hours}:${minutes}`;
      const paperTitle = `题典网_${timeStr}`;

      let bodyXml = makeParagraph(
        textWithMathAndImgToRuns(paperTitle, { sz: 32, bold: true, font: '黑体' }),
        { align: 'center', before: 180, after: 80 }
      );
      bodyXml += makeParagraph(
        textWithMathAndImgToRuns('学校:___________姓名：___________班级：___________考号：___________', { sz: 20 }),
        { align: 'center', before: 20, after: 100 }
      );
      if (isTeacher) {
        bodyXml += makeParagraph(
          textWithMathAndImgToRuns('（教师解析版）', { sz: 20, bold: true, color: '0F766E' }),
          { align: 'center', before: 0, after: 120 }
        );
      }

      const choices = selected.filter(q => q.type === 'choice');
      const blanks = selected.filter(q => q.type === 'blank');
      const judges = selected.filter(q => q.type === 'judge');
      const calcs = selected.filter(q => q.type === 'calc');

      function renderQuestionListXml(list, isChoice, isCalc, startAt = 1) {
        let out = '';
        let questionIndex = startAt;
        for (const q of list) {
          const num = questionIndex++;
          const qIsChoice = isChoice !== null ? isChoice : q.type === 'choice';
          const qIsCalc = isCalc !== null ? isCalc : q.type === 'calc';
          out += renderRichContentToWordXml(
            q.stem,
            textWithMathAndImgToRuns(`${num}．`, { sz: 21, bold: true }),
            '',
            { sz: 21 },
            { before: 120, after: 40 }
          );

          if (q.image) {
            out += makeParagraph(registerImageTag(`<img src="${q.image}" data-cx="2232000" data-cy="600923">`), { indent: 360, before: 60, after: 60 });
          }

          if (qIsChoice && q.options && q.options.length > 0) {
            out += makeOptionsTable(q.options);
          }

          if (qIsCalc && !isTeacher) {
            const answerSpaceTwips = Math.round((state.answerSpaceHeights[q.id] || 112) * 15);
            out += `<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="${answerSpaceTwips}" w:lineRule="exact"/></w:pPr><w:r><w:rPr><w:sz w:val="21"/></w:rPr><w:t xml:space="preserve"> </w:t></w:r></w:p>`;
          }

          if (isTeacher) {
            out += renderRichContentToWordXml(
              q.answer,
              textWithMathAndImgToRuns('【答案】', { sz: 19, bold: true, color: '0F766E' }),
              '',
              { sz: 19, color: '0F766E' },
              { indent: 360, before: 40, after: 20 }
            );
            if (q.difficulty) {
              out += makeParagraph(
                textWithMathAndImgToRuns('【难度】', { sz: 19, bold: true, color: '475569' }) + textWithMathAndImgToRuns(q.difficulty, { sz: 19, color: '475569' }),
                { indent: 360, before: 20, after: 20 }
              );
            }
            if (q.knowledge) {
              out += makeParagraph(
                textWithMathAndImgToRuns('【知识点】', { sz: 19, bold: true, color: '475569' }) + textWithMathAndImgToRuns(q.knowledge, { sz: 19, color: '475569' }),
                { indent: 360, before: 20, after: 20 }
              );
            }
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

      if (state.paperOrderMode === 'added') {
        bodyXml += renderQuestionListXml(selected, null, null, 1);
      } else {
        if (choices.length > 0) {
          bodyXml += makeParagraph(
            textWithMathAndImgToRuns('一、单选题', { sz: 22, bold: true, font: '黑体' }),
            { before: 180, after: 80 }
          );
          bodyXml += renderQuestionListXml(choices, true, false);
        }

        if (blanks.length > 0) {
          bodyXml += makeParagraph(
            textWithMathAndImgToRuns('二、填空题', { sz: 22, bold: true, font: '黑体' }),
            { before: 200, after: 80 }
          );
          bodyXml += renderQuestionListXml(blanks, false, false, choices.length + 1);
        }

        if (judges.length > 0) {
          bodyXml += makeParagraph(
            textWithMathAndImgToRuns('三、判断题', { sz: 22, bold: true, font: '黑体' }),
            { before: 200, after: 80 }
          );
          bodyXml += renderQuestionListXml(judges, false, false, choices.length + blanks.length + 1);
        }

        if (calcs.length > 0) {
          bodyXml += makeParagraph(
            textWithMathAndImgToRuns('四、解答题', { sz: 22, bold: true, font: '黑体' }),
            { before: 200, after: 80 }
          );
          bodyXml += renderQuestionListXml(calcs, false, true, choices.length + blanks.length + judges.length + 1);
        }
      }

      const colsXml = isDouble ? `<w:cols w:num="2" w:sep="1" w:space="425"/>` : '';
      const pageW = isDouble ? '16838' : '11906';
      const pageH = isDouble ? '11906' : '16838';
      const orient = isDouble ? ' w:orient="landscape"' : '';

      const headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:p>
    <w:pPr>
      <w:pStyle w:val="Header"/>
      <w:jc w:val="center"/>
      <w:pBdr>
        <w:bottom w:val="single" w:sz="6" w:space="1" w:color="CCCCCC"/>
      </w:pBdr>
    </w:pPr>
    <w:r>
      <w:rPr>
        <w:rFonts w:ascii="宋体" w:hAnsi="宋体" w:eastAsia="宋体"/>
        <w:sz w:val="18"/>
        <w:szCs w:val="18"/>
        <w:color w:val="666666"/>
      </w:rPr>
      <w:t xml:space="preserve">${escXml(paperTitle)}</w:t>
    </w:r>
  </w:p>
</w:hdr>`;

      const footerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:p>
    <w:pPr>
      <w:pStyle w:val="Footer"/>
      <w:jc w:val="center"/>
    </w:pPr>
    <w:r>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>
        <w:sz w:val="18"/>
        <w:szCs w:val="18"/>
        <w:color w:val="666666"/>
      </w:rPr>
      <w:t xml:space="preserve">第 </w:t>
    </w:r>
    <w:fldSimple w:instr="PAGE">
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>
          <w:sz w:val="18"/>
          <w:szCs w:val="18"/>
          <w:color w:val="666666"/>
        </w:rPr>
        <w:t>1</w:t>
      </w:r>
    </w:fldSimple>
    <w:r>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>
        <w:sz w:val="18"/>
        <w:szCs w:val="18"/>
        <w:color w:val="666666"/>
      </w:rPr>
      <w:t xml:space="preserve"> 页 共 </w:t>
    </w:r>
    <w:fldSimple w:instr="NUMPAGES">
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>
          <w:sz w:val="18"/>
          <w:szCs w:val="18"/>
          <w:color w:val="666666"/>
        </w:rPr>
        <w:t>1</w:t>
      </w:r>
    </w:fldSimple>
    <w:r>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>
        <w:sz w:val="18"/>
        <w:szCs w:val="18"/>
        <w:color w:val="666666"/>
      </w:rPr>
      <w:t xml:space="preserve"> 页</w:t>
    </w:r>
  </w:p>
</w:ftr>`;

      const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${bodyXml}<w:sectPr><w:headerReference w:type="default" r:id="rIdHeader1"/><w:footerReference w:type="default" r:id="rIdFooter1"/><w:pgSz w:w="${pageW}" w:h="${pageH}"${orient}/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="720" w:footer="720" w:gutter="0"/>${colsXml}</w:sectPr></w:body></w:document>`;

      const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="jpg" ContentType="image/jpeg"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/></Types>`;

      const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;

      const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdHeader1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/><Relationship Id="rIdFooter1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>${relsExtra.join('')}</Relationships>`;

      const enc = new TextEncoder();
      const zipEntries = [
        { name: '[Content_Types].xml', data: enc.encode(contentTypesXml) },
        { name: '_rels/.rels', data: enc.encode(rootRelsXml) },
        { name: 'word/document.xml', data: enc.encode(documentXml) },
        { name: 'word/_rels/document.xml.rels', data: enc.encode(docRelsXml) },
        { name: 'word/header1.xml', data: enc.encode(headerXml) },
        { name: 'word/footer1.xml', data: enc.encode(footerXml) },
        ...mediaFiles
      ];

      const zipBytes = await buildZipBlobBytes(zipEntries);
      const blob = new Blob([zipBytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const fileTimeStr = `${year}${month}${date}_${hours}${minutes}`;
      const suffix = isTeacher ? '_教师解析版' : '_学生用卷';
      a.download = `题典网_${fileTimeStr}${suffix}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('已导出标准 Word (.docx) 试卷（含原生公式与高清插图）！', 'success');
    }

