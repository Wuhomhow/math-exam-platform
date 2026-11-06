// 六年级上册 5.1《圆的认识与周长》新增题目（4.1.1 圆的认识课后作业·巩固）
// 由 index.html 在 questions.js 之后、state.js 之前加载。
const CIRCLE_RECOGNITION_QUESTIONS = [
  {
    "id": "g6_circle_411_01",
    "number": 1,
    "origNumber": 1,
    "sectionNumber": 1,
    "type": "choice",
    "typeName": "单选题",
    "difficulty": "适中",
    "knowledge": "圆的概念及特点",
    "chapter": "六年级上册 5.1 圆的认识与周长",
    "stem": "在古代，我国数学史上关于圆的研究记载着不同的说法，下面说法中，描述圆心到圆上的距离一样长的是（　　）。",
    "options": [
      "A．“没有规矩不成方圆”",
      "B．“径一而周三”",
      "C．“圆一中同长也”",
      "D．“圆出于方，方出于矩”"
    ],
    "answer": "C",
    "analysis": "题干中“圆心到圆上的距离一样长”指的是圆的半径长度都相等，逐项分析即可。",
    "detail": "A．“没有规矩不成方圆”是指画圆需要圆规，画方需要直尺，强调做事需要遵循规则，没有描述圆的半径特征，此选项错误。<br>B．“径一而周三”是指圆的周长大约是直径的倍，反映的是圆周率的早期认识，此选项错误。<br>C．“圆一中同长也”出自《墨经》，“一中”表示有一个中心（圆心），“同长”表示从中心到周边的距离相等（半径相等），符合题意，此选项正确。<br>D．“圆出于方，方出于矩”是指圆可以从正方形切割而来，正方形可以用矩尺画出来，描述的是图形的形成，此选项错误。"
  },
  {
    "id": "g6_circle_411_02",
    "number": 2,
    "origNumber": 2,
    "sectionNumber": 2,
    "type": "blank",
    "typeName": "填空题",
    "difficulty": "适中",
    "knowledge": "圆的概念及特点、对称轴的画法及数量、正方形的周长",
    "chapter": "六年级上册 5.1 圆的认识与周长",
    "stem": "如图，正方形的周长是36cm，则圆的半径是（　）cm，直径是（　）cm，这个图形有（　）条对称轴。<br><img src=\"assets/images/g6_circle_411_q2_stem.png\" alt=\"圆与正方形示意图\" style=\"width:100px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    "options": [],
    "answer": "9；18；1",
    "analysis": "用正方形的周长除以4，算出正方形的边长，也是圆的半径。用半径长度乘2算出圆的直径。经过圆心且经过正方形对角线的直线是这个图形的对称轴。",
    "detail": "36÷4＝9（cm）<br>9×2＝18（cm）<br><img src=\"assets/images/g6_circle_411_q2_detail.png\" alt=\"圆与正方形的对称轴示意图\" style=\"width:140px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\"><br>所以，圆的半径是9cm，直径是18cm，这个图形有1条对称轴。"
  },
  {
    "id": "g6_circle_411_03",
    "number": 3,
    "origNumber": 3,
    "sectionNumber": 3,
    "type": "judge",
    "typeName": "判断题",
    "difficulty": "适中",
    "knowledge": "圆的概念及特点、对称轴的画法及数量",
    "chapter": "六年级上册 5.1 圆的认识与周长",
    "stem": "圆的直径就是圆的对称轴，因为圆有无数条直径，所以圆有无数条对称轴。（　）",
    "options": [],
    "answer": "×",
    "analysis": "对称轴是一条直线，可以向两端无限延伸；而圆的直径是线段，有两个端点、长度有限；因此直径本身不是对称轴，而是直径所在的直线才是对称轴。",
    "detail": "对称轴是一条直线，圆的直径是连接圆上两点并且经过圆心的线段，所以圆的直径不是圆的对称轴，圆的直径所在的直线才是圆的对称轴。因为圆有无数条直径，所以圆有无数条对称轴。原题说法错误。<br>故答案为：×"
  },
  {
    "id": "g6_circle_411_04",
    "number": 4,
    "origNumber": 4,
    "sectionNumber": 4,
    "type": "calc",
    "typeName": "计算题",
    "difficulty": "适中",
    "knowledge": "圆的概念及特点",
    "chapter": "六年级上册 5.1 圆的认识与周长",
    "stem": "求半径。<br>d＝10厘米，r＝（　）　　d＝36米，r＝（　）<br>d＝6分米，r＝（　）　　d＝500厘米，r＝（　）<br>d＝0.8米，r＝（　）　　d＝7.4米，r＝（　）<br>d＝1.5米，r＝（　）　　d＝30分米，r＝（　）<br>d＝6.6分米，r＝（　）　　d＝14.4米，r＝（　）<br>d＝100分米，r＝（　）　　d＝7.78分米，r＝（　）<br>d＝5.7米，r＝（　）　　d＝3米，r＝（　）<br>d＝106分米，r＝（　）　　d＝1米，r＝（　）<br>d＝5.4米，r＝（　）　　d＝1.54分米，r＝（　）<br>d＝3.6米，r＝（　）　　d＝10米，r＝（　）<br>d＝0.4米，r＝（　）　　d＝50米，r＝（　）<br>d＝15.6分米，r＝（　）　　d＝360厘米，r＝（　）",
    "options": [],
    "answer": "5厘米；18米；3分米；250厘米；0.4米；3.7米；0.75米；15分米；3.3分米；7.2米；50分米；3.89分米；2.85米；1.5米；53分米；0.5米；2.7米；0.77分米；1.8米；5米；0.2米；25米；7.8分米；180厘米",
    "analysis": "直径d是通过圆心且两端都在圆上的线段，半径r是从圆心到圆上任意一点的线段。同一个圆里半径的长度是直径的一半，计算公式：。将数值代入公式计算即可。",
    "detail": "10÷2＝5（厘米）；36÷2＝18（米）<br>6÷2＝3（分米）；500÷2＝250（厘米）<br>0.8÷2＝0.4（米）；7.4÷2＝3.7（米）<br>1.5÷2＝0.75（米）；30÷2＝15（分米）<br>6.6÷2＝3.3（分米）；14.4÷2＝7.2（米）<br>100÷2＝50（分米）；7.78÷2＝3.89（分米）<br>5.7÷2＝2.85（米）；3÷2＝1.5（米）<br>106÷2＝53（分米）；1÷2＝0.5（米）<br>5.4÷2＝2.7（米）；1.54÷2＝0.77（分米）<br>3.6÷2＝1.8（米）；10÷2＝5（米）<br>0.4÷2＝0.2（米）；50÷2＝25（米）<br>15.6÷2＝7.8（分米）；360÷2＝180（厘米）"
  },
  {
    "id": "g6_circle_411_05",
    "number": 5,
    "origNumber": 5,
    "sectionNumber": 5,
    "type": "calc",
    "typeName": "解答题",
    "difficulty": "适中",
    "knowledge": "圆的概念及特点",
    "chapter": "六年级上册 5.1 圆的认识与周长",
    "stem": "滚铁环是一种在20世纪六七十年代盛行的游戏。玩家手捏顶端是“U”字形的铁棍或铁丝，推着一个圆形铁圈向前跑。这种游戏不仅自娱性强，还可以锻炼人的协调能力和平衡能力。请你说一说铁圈要做成圆形的原因。<br><img src=\"assets/images/g6_circle_411_q5_stem.png\" alt=\"滚铁环游戏示意图\" style=\"width:150px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    "options": [],
    "answer": "因为圆形铁圈上各点到圆心的距离相等，滚动起来更加稳定，易于控制和操作。",
    "analysis": "圆心到圆上各点的距离都是圆的半径，同一个圆中所有的半径都相等，所以铁圈上各点到圆心的距离相等，这样的铁圈滚动起来十分平稳。",
    "detail": "因为圆形铁圈上各点到圆心的距离相等，滚动起来更加稳定，易于控制和操作。"
  },
  {
    "id": "g6_circle_411_06",
    "number": 6,
    "origNumber": 6,
    "sectionNumber": 6,
    "type": "choice",
    "typeName": "单选题",
    "difficulty": "适中",
    "knowledge": "画圆、长方形的概念及特点、圆的概念及特点",
    "chapter": "六年级上册 5.1 圆的认识与周长",
    "stem": "在一张长10cm，宽9cm的长方形纸上画一个尽可能大的圆，圆规两脚间的距离应确定为（　　）cm。",
    "options": [
      "A．10",
      "B．9",
      "C．4.5"
    ],
    "answer": "C",
    "analysis": "根据题意，在一张长方形纸上画一个尽可能大的圆，那么这个圆的直径等于长方形的宽，用直径÷2求出圆的半径；根据用圆规画圆的方法可知，圆规两脚间的距离即这个圆的半径。",
    "detail": "圆的半径：<br>9÷2＝4.5（cm）<br>圆规两脚间的距离应确定为4.5cm。<br>故答案为：C<br>【点睛】明确长方形里最大的圆的直径等于长方形的宽，圆规两脚间的距离等于所画圆的半径。"
  },
  {
    "id": "g6_circle_411_07",
    "number": 7,
    "origNumber": 7,
    "sectionNumber": 7,
    "type": "blank",
    "typeName": "填空题",
    "difficulty": "适中",
    "knowledge": "圆的概念及特点",
    "chapter": "六年级上册 5.1 圆的认识与周长",
    "stem": "用圆规画一个直径是8cm的圆，圆规两脚间的距离是（　）cm，这个圆的位置由（　）决定。",
    "options": [],
    "answer": "4；圆心",
    "analysis": "根据圆的画法可知，圆规两脚之间张开的距离是圆的半径。根据“半径＝直径÷2”即可确定圆规两脚间的距离。圆心确定了，圆的中心位置就确定了。",
    "detail": "8÷2＝4（cm）<br>圆的位置由圆心决定。"
  },
  {
    "id": "g6_circle_411_08",
    "number": 8,
    "origNumber": 8,
    "sectionNumber": 8,
    "type": "judge",
    "typeName": "判断题",
    "difficulty": "适中",
    "knowledge": "画圆",
    "chapter": "六年级上册 5.1 圆的认识与周长",
    "stem": "“无规矩不成方圆”中的“规”是指圆规，用来画圆。（　）",
    "options": [],
    "answer": "√",
    "analysis": "在成语“无规矩不成方圆”中，“规”指圆规，用于画圆，“矩”指矩尺，用于画方。圆规是画圆的专用工具，因此该说法正确。",
    "detail": "故答案为：√"
  },
  {
    "id": "g6_circle_411_09",
    "number": 9,
    "origNumber": 9,
    "sectionNumber": 9,
    "type": "calc",
    "typeName": "作图题",
    "difficulty": "适中",
    "knowledge": "画圆",
    "chapter": "六年级上册 5.1 圆的认识与周长",
    "stem": "在下面的长方形中画一个最大的圆。<br><img src=\"assets/images/g6_circle_411_q9_stem.png\" alt=\"长方形作图题\" style=\"width:245px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    "options": [],
    "answer": "如图所示，圆的半径为2cm。",
    "analysis": "画圆的步骤：把圆规的两脚分开，定好两脚的距离，即半径；把有针尖的一只脚固定在一点上，即圆心；把装有铅笔尖的一只脚旋转一周，就画出一个圆。",
    "detail": "长方形中画一个最大的圆，圆的直径＝长方形的宽，对角线的交点处可以作为圆心位置。<br>4÷2＝2（cm）<br>画出的圆的半径是2cm，位置不唯一，作图略。<br><img src=\"assets/images/g6_circle_411_q9_detail.png\" alt=\"在长方形中画出的最大圆\" style=\"width:250px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">"
  },
  {
    "id": "g6_circle_411_10",
    "number": 10,
    "origNumber": 10,
    "sectionNumber": 10,
    "type": "calc",
    "typeName": "解答题",
    "difficulty": "适中",
    "knowledge": "画圆、圆的概念及特点",
    "chapter": "六年级上册 5.1 圆的认识与周长",
    "stem": "画圆的方法有很多种，除了用圆规画圆外，还可以用其他材料画圆，请你列举两种画圆的方法，并说明这两种画圆的方法和圆规画圆有什么共同的地方？",
    "options": [],
    "answer": "①用一根线和一支笔画圆；②用圆形物体（如瓶盖）描一圈画圆。共同点是都要固定圆心并保持半径不变。",
    "analysis": "根据圆的特征：圆心到圆上任意一点的距离相等；据此列举两种画圆方法：①用一根线和一支笔画圆；②用圆形物体画圆（答案不唯一）。根据两种圆的画法以及圆规画圆法，找出共同点。",
    "detail": "①用一根线和一支笔，把线的一端固定住，另一端系在笔上，然后拉直，用笔绕着固定的一端画一圈，就画成圆了。<br>②用圆形物体，如瓶盖，按住瓶盖在纸上描一圈，就画出圆了。<br>所有画圆的方法都围绕“固定圆心”和“半径不变”这两点展开，也就是圆的定义的体现。"
  }
];

for (const question of CIRCLE_RECOGNITION_QUESTIONS) {
  if (!QUESTION_BANK.some(existing => existing.id === question.id)) {
    QUESTION_BANK.push(question);
  }
}
