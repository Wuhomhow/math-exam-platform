#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
只读盘点脚本：math-exam-platform 共享小节级目录试点（阶段一）
盘点范围：
  1. 七年级 第四章 整式的加减（state.js 中为「第四章 整式的加减法」）
  2. 八年级 第十五章 轴对称（state.js 中为「第15章 等腰三角形」）

只读分析，不修改任何现有数据文件或前端代码。
运行方式：
  python3 scripts/audit-pilot-catalog.py
"""

import json
import os
import re
import shutil
import subprocess
import sys
from collections import Counter, defaultdict

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
REPORT_PATH = os.path.join(ROOT_DIR, 'scripts', 'pilot-catalog-audit-report.md')


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


def load_data_via_js():
    engine_type, engine_bin = find_js_engine()
    js_code = f"""
var window = this;
load("{ROOT_DIR}/js/data/questions.js");
load("{ROOT_DIR}/js/data/procedural-knowledge.js");
load("{ROOT_DIR}/js/data/question-procedures.js");

var slimQuestions = (window.QUESTION_BANK || []).map(function(q) {{
  return {{
    id: q.id,
    chapter: q.chapter || '',
    grade: q.grade || '',
    term: q.term || '',
    type: q.type || '',
    typeName: q.typeName || '',
    difficulty: q.difficulty || '',
    knowledge: q.knowledge || '',
    stem: String(q.stem || '').replace(/<[^>]+>/g, ' ').replace(/\\s+/g, ' ').trim().slice(0, 120)
  }};
}});

var slimProcs = (window.PROCEDURAL_KNOWLEDGE || []).map(function(p) {{
  return {{
    id: p.id,
    name: p.name,
    grade: p.grade,
    chapterGroup: p.chapterGroup,
    chapter: p.chapter,
    status: p.status,
    exampleQuestionId: p.exampleQuestionId || ''
  }};
}});

var slimRels = (window.QUESTION_PROCEDURES || []).filter(Boolean).map(function(r) {{
  return {{
    questionId: r.questionId,
    procedureId: r.procedureId,
    sortOrder: r.sortOrder || r.order || 0,
    role: r.role || '',
    subType: r.subType || '',
    operationSummary: r.operationSummary || '',
    status: r.status || ''
  }};
}});

print(JSON.stringify({{
  questions: slimQuestions,
  procedures: slimProcs,
  relations: slimRels
}}));
"""
    tmp_js = '/tmp/audit_pilot_catalog.js'
    if engine_type == 'node':
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
        js_code = node_prefix + js_code

    with open(tmp_js, 'w', encoding='utf-8') as f:
        f.write(js_code)

    res = subprocess.run([engine_bin, tmp_js], capture_output=True, text=True)
    if res.returncode != 0:
        print('JS Engine Error:', res.stderr, file=sys.stderr)
        sys.exit(1)

    return json.loads(res.stdout.strip().splitlines()[-1])


FINISHED_PAPER_CHAPTERS = {
    '六年级上册 第一章 确定位置单元测试（A卷）',
    '六年级上册 第一章 确定位置单元测试（B卷）',
    '2.3.1 有理数的加法',
    '2.3.2 有理数的减法',
    '2.3.2 科学记数法',
    '第二章单元测试',
    '初一上册 广东珠海市文园中学2026-2027学年七年级上学期11月期中数学试题',
    '13.1三角形单元测试卷',
    '14.2全等三角形性质',
    '14.3三角形全等的判定（SAS）',
    '14.4三角形全等的判定（ASA）',
    '14.5三角形全等的判定（AAS）',
    '14.6三角形全等的判定（SSS）',
    '14.7 角平分线',
    '15.8等边对等角',
    '15.9三线合一',
    '初二上册 广东珠海市文园中学2026-2027学年上学期 八年级数学期中试卷',
    '初二上册 成品卷：将军饮马',
    '初三上册 广东珠海市文园中学2026-2027学年九年级上学期数学期中试卷',
}


def infer_academic_location(chapter):
    value = str(chapter or '').strip()
    m = re.match(r'^(六年级|小学六年级|初一|初二|初三|高一|高二|高三|七年级|八年级|九年级)\s*(上册|下册)?\s*(.*)$', value)
    if m:
        grade_map = {'小学六年级': '六年级', '七年级': '初一', '八年级': '初二', '九年级': '初三'}
        return {
            'grade': grade_map.get(m.group(1), m.group(1)),
            'semester': m.group(2) or '上册',
            'label': (m.group(3) or value).strip()
        }
    if re.match(r'^(13|14|15|16|17|18)\.', value) or re.match(r'^第十[三四五六七八]章', value):
        return {'grade': '初二', 'semester': '上册', 'label': value}
    if re.match(r'^(25|26|27|28|29)\.', value) or re.match(r'^第二十[五六七八九]章', value):
        return {'grade': '初三', 'semester': '上册', 'label': value}
    if re.match(r'^[123456]\.', value) or re.match(r'^第[一二三四五六]章', value):
        return {'grade': '初一', 'semester': '上册', 'label': value}
    return {'grade': '其他年级', 'semester': '未分类', 'label': value or '未命名专题'}


def get_chapter_group(grade, chapter):
    ch = str(chapter or '').strip()
    if grade == '初一':
        if ch.startswith('4.') or '第四章' in ch:
            return '第四章 整式的加减法'
    elif grade == '初二':
        if ch.startswith('15.') or '第十五' in ch:
            return '第15章 等腰三角形'
    return None


def suggest_section_and_tag(pilot_key, q):
    ch = q['chapter']
    stem = q['stem']
    kn = q['knowledge']
    diff = q['difficulty']

    if pilot_key == 'ch4':
        # 4.1.1 单项式 / 4.1.2 多项式 / 4.2.1 合并同类项 / 4.2.2 去括号 / 4.2.3 整式加减的应用 / 兜底
        if '4.1.1' in ch or ('单项式' in ch and '多项式' not in ch):
            sec = '4.1.1 单项式'
        elif '4.1.2' in ch or '多项式' in ch:
            sec = '4.1.2 多项式'
        elif '4.2.1' in ch or '合并同类项' in ch:
            sec = '4.2.1 合并同类项'
        elif '4.2.2' in ch or '去括号' in ch:
            sec = '4.2.2 去括号'
        elif '4.2.3' in ch or '应用' in ch:
            sec = '4.2.3 整式加减的应用'
        else:
            # 单元测试等综合卷，尝试按关键词细分或归兜底
            if any(k in stem + kn for k in ['规律', '第n', '第 n', '探究', '新定义', '数位', '方案', '错看', '抄错', '无关', '不含']):
                sec = '4.2.3 整式加减的应用 / 本章综合'
            elif any(k in stem + kn for k in ['单项式', '系数', '次数']) and '多项式' not in stem:
                sec = '4.1.1 单项式'
            elif '多项式' in stem + kn:
                sec = '4.1.2 多项式'
            elif '同类项' in stem + kn and '括号' not in stem:
                sec = '4.2.1 合并同类项'
            elif '去括号' in stem + kn or '化简' in stem + kn:
                sec = '4.2.2 去括号'
            else:
                sec = '第四章 综合与待细化（兜底）'

        # 判标签
        comp_signals = ['规律', '第n', '第 n', '第202', '探究', '新定义', '绝对值', '数轴', '方案', '分段', '错看', '抄错', '整体', '动点', '拼图', '整除', '阴影']
        if diff == '较难' or any(sig in stem + kn for sig in comp_signals) or '测试' in ch:
            tag = 'comprehensive'
        else:
            tag = 'procedural_bank'
        return sec, tag

    else:  # ch15
        if '15.1.1' in ch or '轴对称图形' in ch:
            sec = '15.1.1 轴对称及其性质'
        elif '15.1.2' in ch or '垂直平分线' in ch:
            sec = '15.1.2 线段的垂直平分线'
        elif '15.2' in ch or '画轴对称' in ch or '坐标' in ch:
            sec = '15.2 画轴对称的图形'
        elif '15.8' in ch or '15.3.1' in ch or '15.3.2' in ch or '等边对等角' in ch or ('等腰' in ch and '三线合一' not in ch):
            sec = '15.3.1–15.3.2 等腰三角形的性质与判定'
        elif '15.9' in ch or '三线合一' in ch:
            sec = '15.3.1–15.3.2 等腰三角形（三线合一）'
        elif '15.3.3' in ch or '15.3.4' in ch or '15.3.5' in ch or '等边' in ch or '30' in ch:
            sec = '15.3.3–15.3.5 等边三角形与 30° 直角三角形'
        elif '将军饮马' in ch or '最短路径' in ch:
            sec = '15.4 课题学习 最短路径问题（将军饮马）'
        else:
            sec = '第十五章 综合与待细化（兜底）'

        comp_signals = ['动点', '最值', '最短', '将军饮马', '存在性', '分类讨论', '探究', '折叠', '旋转', '手拉手', '辅助线', '全等', '勾股', '坐标']
        if diff == '较难' or any(sig in stem + kn + ch for sig in comp_signals):
            tag = 'comprehensive'
        else:
            tag = 'procedural_bank'
        return sec, tag


def recommend_pruning(proc, rels, q_by_id, target_keep=10):
    """
    给单条 Pxx 提供初步精简建议（按去重后的 questionId 统计）：
    - exampleQuestionId 必留
    - 每个 subType 至少保留 1-2 道（覆盖不同难度）
    - 总留存目标约 10 道，其余同类重复题标为 bank_only 候选
    """
    # 按 questionId 去重，保留首次出现（最小 sortOrder）的记录
    unique_rels = []
    seen_qids = set()
    for r in sorted(rels, key=lambda x: x['sortOrder']):
        qid = r['questionId']
        if qid not in seen_qids:
            seen_qids.add(qid)
            unique_rels.append(r)

    if len(unique_rels) <= target_keep:
        return [r['questionId'] for r in unique_rels], []

    by_sub = defaultdict(list)
    for r in unique_rels:
        by_sub[r['subType'] or 'default'].append(r)

    keep = []
    keep_set = set()

    ex_id = proc.get('exampleQuestionId')
    if ex_id and ex_id in seen_qids:
        keep.append(ex_id)
        keep_set.add(ex_id)

    sub_keys = list(by_sub.keys())
    per_sub_quota = max(1, (target_keep - len(keep)) // max(1, len(sub_keys)))
    for sk in sub_keys:
        seen_diff = set()
        picked = 0
        for r in by_sub[sk]:
            qid = r['questionId']
            if qid in keep_set:
                picked += 1
                seen_diff.add(q_by_id.get(qid, {}).get('difficulty', ''))
                continue
            d = q_by_id.get(qid, {}).get('difficulty', '')
            if d not in seen_diff and picked < per_sub_quota:
                keep.append(qid)
                keep_set.add(qid)
                seen_diff.add(d)
                picked += 1
        for r in by_sub[sk]:
            if picked >= per_sub_quota:
                break
            qid = r['questionId']
            if qid not in keep_set:
                keep.append(qid)
                keep_set.add(qid)
                picked += 1

    for r in unique_rels:
        if len(keep) >= target_keep:
            break
        if r['questionId'] not in keep_set:
            keep.append(r['questionId'])
            keep_set.add(r['questionId'])

    bank_only = [r['questionId'] for r in unique_rels if r['questionId'] not in keep_set]
    return keep, bank_only


def main():
    data = load_data_via_js()
    questions = data['questions']
    procedures = data['procedures']
    relations = data['relations']

    q_by_id = {q['id']: q for q in questions}
    rels_by_proc = defaultdict(list)
    for r in relations:
        if r['status'] in ('published', 'reviewed', ''):
            rels_by_proc[r['procedureId']].append(r)

    pilots = [
        {
            'key': 'ch4',
            'title': '七年级 第四章 整式的加减',
            'state_grade': '初一',
            'state_group': '第四章 整式的加减法',
            'proc_group': '第四章 整式的加减',
            'extra_finished_keywords': ['第四章', '4.1', '4.2']
        },
        {
            'key': 'ch15',
            'title': '八年级 第十五章 轴对称',
            'state_grade': '初二',
            'state_group': '第15章 等腰三角形',
            'proc_group': '第十五章 轴对称',
            'extra_finished_keywords': ['15.', '第十五', '将军饮马']
        }
    ]

    lines = []
    lines.append('# 共享小节级目录试点——阶段一只读盘点报告\n')
    lines.append(f'- 全库总题数：`{len(questions)}` 题；已发布/审校程序性知识：`{len(procedures)}` 条；总关联记录：`{len(relations)}` 条。\n')

    summary_rows = []

    for pilot in pilots:
        pkey = pilot['key']
        lines.append(f'## {pilot["title"]}\n')

        # 1. 收集题库中属于该章的普通章节题 & 成品卷题
        regular_by_ch = defaultdict(list)
        finished_by_ch = defaultdict(list)
        regular_ids = set()
        finished_ids = set()

        for q in questions:
            ch = q['chapter']
            loc = infer_academic_location(ch)
            if loc['grade'] != pilot['state_grade']:
                continue
            is_fin = ch.strip() in FINISHED_PAPER_CHAPTERS
            grp = get_chapter_group(loc['grade'], ch)
            if not is_fin and grp == pilot['state_group']:
                regular_by_ch[ch].append(q)
                regular_ids.add(q['id'])
            elif is_fin and any(kw in ch for kw in pilot['extra_finished_keywords']):
                finished_by_ch[ch].append(q)
                finished_ids.add(q['id'])

        all_ch_ids = regular_ids | finished_ids

        lines.append('### 1. 原始题库 `q.chapter` 分布\n')
        lines.append('| 归类 | 原始 `q.chapter` | 题数 |')
        lines.append('|---|---|---:|')
        for ch in sorted(regular_by_ch.keys()):
            lines.append(f'| 常规章节组 | `{ch}` | {len(regular_by_ch[ch])} |')
        for ch in sorted(finished_by_ch.keys()):
            lines.append(f'| 成品试卷区 | `{ch}` | {len(finished_by_ch[ch])} |')
        lines.append(f'| **合计（去重）** | 常规 `{len(regular_ids)}` 题 + 成品卷 `{len(finished_ids)}` 题 | **{len(all_ch_ids)}** |\n')

        # 2. 程序性知识条目与精简候选
        ch_procs = [p for p in procedures if p['chapterGroup'] == pilot['proc_group'] and p['status'] in ('published', 'reviewed')]
        ch_procs.sort(key=lambda p: (p['chapter'], int(p['id'][1:])))

        proc_qids_all = set()
        lines.append('### 2. 程序性知识现有小节、题量与精简建议（目标每条精选约 10 题）\n')
        lines.append('| ID | 现有 `chapter`（小节） | 名称 | 现有关联题数 | `subType` 数量 | 建议精选数 | 建议退为 `bank_only` 数 | 来源分布（本章常规 / 本章成品卷 / 其他卷） |')
        lines.append('|---|---|---|---:|---:|---:|---:|---|')

        pruning_details = []
        for p in ch_procs:
            prels = rels_by_proc.get(p['id'], [])
            unique_pqids = list(dict.fromkeys(r['questionId'] for r in prels))
            proc_qids_all.update(unique_pqids)
            sub_cnt = Counter(r['subType'] or 'default' for r in prels)
            keep, bank_only = recommend_pruning(p, prels, q_by_id, target_keep=10)

            in_reg = sum(1 for qid in unique_pqids if qid in regular_ids)
            in_fin = sum(1 for qid in unique_pqids if qid in finished_ids)
            in_other = len(unique_pqids) - in_reg - in_fin

            lines.append(
                f'| `{p["id"]}` | `{p["chapter"]}` | {p["name"]} | {len(unique_pqids)} | {len(sub_cnt)} | {len(keep)} | {len(bank_only)} | 常规 {in_reg} / 成品 {in_fin} / 其他 {in_other} |'
            )
            pruning_details.append((p, sub_cnt, keep, bank_only))

        lines.append('')
        lines.append('#### 各 `Pxx` 的 `subType` 分布与精简候选明细\n')
        for p, sub_cnt, keep, bank_only in pruning_details:
            sub_str = '；'.join(f'`{k}`({v})' for k, v in sub_cnt.items())
            lines.append(f'- **`{p["id"]}`（{p["chapter"]}）**：例题 `{p["exampleQuestionId"]}`；子类型：{sub_str}')
            if bank_only:
                lines.append(f'  - 建议保留精选（{len(keep)}）：`{", ".join(keep)}`')
                lines.append(f'  - 建议退为 `bank_only`（{len(bank_only)}）：`{", ".join(bank_only)}`')
            else:
                lines.append(f'  - 题量已适中（{len(keep)} 题），建议全部保留为 `featured`。')
        lines.append('')

        # 3. 未关联 Pxx 的题目清单与预打标
        unlinked_regular = [q_by_id[qid] for qid in sorted(regular_ids - proc_qids_all)]
        unlinked_finished = [q_by_id[qid] for qid in sorted(finished_ids - proc_qids_all)]
        unlinked_all = unlinked_regular + unlinked_finished
        external_proc_ids = proc_qids_all - all_ch_ids

        lines.append(f'### 3. 本章未关联 `Pxx` 的题目清单与预打标（共 {len(unlinked_all)} 题：常规 {len(unlinked_regular)} 题，成品卷 {len(unlinked_finished)} 题）\n')

        by_ch_unlinked = defaultdict(list)
        tag_counter = Counter()
        sec_counter = Counter()
        for q in unlinked_all:
            sec, tag = suggest_section_and_tag(pkey, q)
            by_ch_unlinked[q['chapter']].append((q, sec, tag))
            tag_counter[tag] += 1
            sec_counter[sec] += 1

        lines.append(f'- 预打标统计：`procedural_bank`（程序性扩充）**{tag_counter["procedural_bank"]}** 题，`comprehensive`（综合拓展）**{tag_counter["comprehensive"]}** 题。')
        lines.append('- 建议归属小节分布：' + '；'.join(f'{k}({v})' for k, v in sec_counter.most_common()) + '\n')

        for ch in sorted(by_ch_unlinked.keys()):
            items = by_ch_unlinked[ch]
            lines.append(f'#### `{ch}`（未关联 {len(items)} 题）\n')
            lines.append('| 题目 ID | 题型 | 难度 | 建议标准小节 | 建议标签 | 题干前 40 字 |')
            lines.append('|---|---|---|---|---|---|')
            for q, sec, tag in items:
                snippet = q['stem'][:40].replace('|', '\\|')
                lines.append(f'| `{q["id"]}` | {q["typeName"]} | {q["difficulty"]} | {sec} | `{tag}` | {snippet} |')
            lines.append('')

        if external_proc_ids:
            ext_by_ch = Counter(q_by_id[qid]['chapter'] for qid in external_proc_ids if qid in q_by_id)
            lines.append(f'#### 补充：本章 `Pxx` 额外引用自其他章节/期中卷的题目（共 {len(external_proc_ids)} 题）\n')
            for ech, cnt in ext_by_ch.most_common():
                lines.append(f'- `{ech}`：{cnt} 题')
            lines.append('')

        summary_rows.append({
            'title': pilot['title'],
            'reg_total': len(regular_ids),
            'fin_total': len(finished_ids),
            'ch_total': len(all_ch_ids),
            'proc_in_ch': len(proc_qids_all & all_ch_ids),
            'proc_ext': len(external_proc_ids),
            'proc_total': len(proc_qids_all),
            'unlinked': len(unlinked_all),
            'pre_bank': tag_counter['procedural_bank'],
            'pre_comp': tag_counter['comprehensive'],
        })

    # 4. 数量核对汇总表
    lines.append('## 四、数量核对汇总表（零遗漏核验）\n')
    lines.append('| 试点章节 | 常规章节去重题数 | 同章成品卷题数 | 本章原库去重总题数 | 已关联 `Pxx`（本章内） | 本章未关联题数 | 核验（已关联+未关联=原库总题数） | `Pxx` 跨卷引用题数 | 预打标（扩充/综合） |')
    lines.append('|---|---:|---:|---:|---:|---:|---|---:|---|')
    for r in summary_rows:
        ok = 'PASS' if (r['proc_in_ch'] + r['unlinked'] == r['ch_total']) else 'MISMATCH'
        lines.append(
            f'| {r["title"]} | {r["reg_total"]} | {r["fin_total"]} | **{r["ch_total"]}** | {r["proc_in_ch"]} | {r["unlinked"]} | **{ok}** ({r["proc_in_ch"]}+{r["unlinked"]}={r["ch_total"]}) | {r["proc_ext"]} | {r["pre_bank"]} / {r["pre_comp"]} |'
        )

    report = '\n'.join(lines) + '\n'
    with open(REPORT_PATH, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f'[OK] 盘点报告已写入: {REPORT_PATH}')
    print('\n'.join(lines[:40]))
    print('\n--- SUMMARY ---\n')
    for line in lines[-12:]:
        print(line)


if __name__ == '__main__':
    main()
