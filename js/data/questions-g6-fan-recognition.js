// 六年级上册 5.1.2《扇形的认识》课后作业（巩固）
// 题目内容依据用户上传的 Word 文档整理；配图按原题结构重绘为 SVG。
const FAN_RECOGNITION_QUESTIONS = [
  {
    id:"g6_fan_412_01", number:1, origNumber:1, sectionNumber:1,
    type:"choice", typeName:"单选题", difficulty:"适中", knowledge:"弧、圆心角、扇形的认识；角的度量；角度的计算",
    chapter:"六年级上册 5.1.2 扇形的认识",
    stem:"若圆心角∠1＝65°，下面（　　）图表示圆心角为2∠1。 + "<br><img src=\"assets/images/g6_fan_412_q1-options.svg\" alt=\"四个选项的圆心角示意图\" style=\"width:440px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    options:["A．图A","B．图B","C．图C","D．图D"],
    answer:"D",
    analysis:"∠1＝65°，所以2∠1＝130°。圆心角的顶点在圆心上，两边是圆的半径；再结合角度判断选项。",
    detail:"2∠1＝2×65°＝130°。A．角顶点在圆周，不是圆心角；B．是圆心角，但角度约为45°，不符合要求；C．角顶点不在圆心，不符合圆心角定义；D．顶点在圆心，角度约为130°，符合要求。故选D。",
  },
  {
    id:"g6_fan_412_02", number:2, origNumber:2, sectionNumber:2,
    type:"choice", typeName:"单选题", difficulty:"适中", knowledge:"弧、圆心角、扇形的认识",
    chapter:"六年级上册 5.1.2 扇形的认识",
    stem:"下面图形中，图（　　）中的角是圆心角。 + "<br><img src=\"assets/images/g6_fan_412_q2-options.svg\" alt=\"判断圆心角的四个选项示意图\" style=\"width:440px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    options:["A．图A","B．图B","C．图C","D．图D"],
    answer:"B",
    analysis:"顶点在圆心的角叫圆心角。据此判断。",
    detail:"A．图中角的顶点不在圆心上，不是圆心角；B．图中角的顶点在圆心上，是圆心角；C、D图中角的顶点不在圆心上，不是圆心角。所以选B。"
  },
  {
    id:"g6_fan_412_03", number:3, origNumber:3, sectionNumber:3,
    type:"blank", typeName:"填空题", difficulty:"适中", knowledge:"弧、圆心角、扇形的认识；图形的折叠问题",
    chapter:"六年级上册 5.1.2 扇形的认识",
    stem:"把一张直径是4厘米的圆形纸片对折3次，会得到（　）个同样大小的扇形，扇形的半径是（　）厘米，圆心角是（　）°。 + "<br><img src=\"assets/images/g6_fan_412_q3-fold.svg\" alt=\"圆形纸片连续对折示意图\" style=\"width:440px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    options:[], answer:"8；2；45",
    analysis:"把圆形纸片对折3次，平分成8份，即8个小扇形；扇形半径等于圆的直径÷2，圆心角等于360°÷8。",
    detail:"2×2×2＝8（个）；4÷2＝2（cm）；360°÷8＝45°。"
  },
  {
    id:"g6_fan_412_04", number:4, origNumber:4, sectionNumber:4,
    type:"blank", typeName:"填空题", difficulty:"适中", knowledge:"弧、圆心角、扇形的认识",
    chapter:"六年级上册 5.1.2 扇形的认识",
    stem:"每个圆中涂色扇形的圆心角是多少度？（依次填写三个图形） + "<br><img src=\"assets/images/g6_fan_412_q4-sectors.svg\" alt=\"三个涂色扇形示意图\" style=\"width:440px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    options:[], answer:"270°；315°；210°",
    analysis:"周角是360°，分别用周角度数减去空白扇形的圆心角度数，得到涂色扇形的圆心角。",
    detail:"360°－90°＝270°；360°－45°＝315°；360°－150°＝210°。"
  },
  {
    id:"g6_fan_412_05", number:5, origNumber:5, sectionNumber:5,
    type:"judge", typeName:"判断题", difficulty:"适中", knowledge:"弧、圆心角、扇形的认识",
    chapter:"六年级上册 5.1.2 扇形的认识",
    stem:"用4个圆心角是90°的扇形，一定可以拼成一个圆。（　）",
    options:[], answer:"×",
    analysis:"扇形拼成圆需要同时满足圆心角总和为360°、所有扇形半径相等两个条件。题目仅说明圆心角为90°，未说明半径是否相等，因此不一定能拼成圆。",
    detail:"圆心角总和符合拼成圆的要求，但扇形的大小由半径和圆心角共同决定；若4个扇形的半径不相等，则无法拼成圆。故答案为：×。"
  },
  {
    id:"g6_fan_412_06", number:6, origNumber:6, sectionNumber:6,
    type:"judge", typeName:"判断题", difficulty:"适中", knowledge:"弧、圆心角、扇形的认识；对称轴的画法及数量",
    chapter:"六年级上册 5.1.2 扇形的认识",
    stem:"扇形是由两条半径和圆上一段曲线围成的图形，它有1条对称轴。（　） + "<br><img src=\"assets/images/g6_fan_412_q6-axis.svg\" alt=\"扇形对称轴示意图\" style=\"width:440px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    options:[], answer:"√",
    analysis:"一条弧和经过这条弧两端的两条半径所围成的图形叫做扇形。一个图形沿一条直线对折后，折痕两旁的部分能够完全重合，这条直线就是对称轴。",
    detail:"扇形是由两条半径和圆上一段曲线围成的图形，它有1条对称轴。原题说法正确。故答案为：√。"
  },
  {
    id:"g6_fan_412_07", number:7, origNumber:7, sectionNumber:7,
    type:"calc", typeName:"解答题", difficulty:"适中", knowledge:"弧、圆心角、扇形的认识；画扇形",
    chapter:"六年级上册 5.1.2 扇形的认识",
    stem:"如图，在圆内分别画出圆心角是30°、60°、90°和120°的扇形A、B、C、D。（1）比较扇形A、B、C、D的大小（用“＜”连接）；（2）在同圆或等圆中，扇形的大小与（　）有关。 + "<br><img src=\"assets/images/g6_fan_412_q7-four-fans.svg\" alt=\"圆内四个扇形示意图\" style=\"width:440px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    options:[], answer:"（1）扇形A＜扇形B＜扇形C＜扇形D；（2）圆心角",
    analysis:"在同圆中，圆心角的度数越大，扇形就越大。在同圆或等圆中，扇形的大小与圆心角的大小有关。",
    detail:"（1）30°＜60°＜90°＜120°，所以扇形A＜扇形B＜扇形C＜扇形D。（2）在同圆或等圆中，扇形的大小与圆心角的大小有关。"
  },
  {
    id:"g6_fan_412_08", number:8, origNumber:8, sectionNumber:8,
    type:"calc", typeName:"作图题", difficulty:"适中", knowledge:"画圆；画扇形",
    chapter:"六年级上册 5.1.2 扇形的认识",
    stem:"画一个直径3厘米的圆，分别用字母O、r标出圆心和半径，并在这个圆中画一个圆心角为120°的扇形。 + "<br><img src=\"assets/images/g6_fan_412_q8-120.svg\" alt=\"120度扇形参考图\" style=\"width:440px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    options:[], answer:"作图题，参考答案见详解。",
    analysis:"先算出圆的半径：3÷2＝1.5厘米。确定圆心，用圆规画圆并标出圆心O和半径r；以O点为顶点，用圆的任意一条半径为边，利用量角器画出120°的角。",
    detail:"3÷2＝1.5（厘米）。两条半径和120°圆心角所对的弧围成扇形，画图略。"
  },
  {
    id:"g6_fan_412_09", number:9, origNumber:9, sectionNumber:9,
    type:"calc", typeName:"作图题", difficulty:"适中", knowledge:"弧、圆心角、扇形的认识；画圆；画扇形；圆的概念及特点",
    chapter:"六年级上册 5.1.2 扇形的认识",
    stem:"请在空白处画一个半径是2厘米的圆，再在圆中画一个圆心角是90°的扇形，并用阴影部分表示。 + "<br><img src=\"assets/images/g6_fan_412_q9-90.svg\" alt=\"90度扇形参考图\" style=\"width:440px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    options:[], answer:"作图题，参考答案见详解。",
    analysis:"先用圆规画一个半径为2厘米的圆；再画出一条射线，用量角器以射线端点为顶点画出90°角，最后用阴影填充扇形区域。",
    detail:"按题意画出半径为2厘米的圆，在圆中画出90°圆心角，并将对应扇形区域涂上阴影。详解原文：略。"
  },
  {
    id:"g6_fan_412_10", number:10, origNumber:10, sectionNumber:10,
    type:"calc", typeName:"作图题", difficulty:"适中", knowledge:"画扇形；弧、圆心角、扇形的认识",
    chapter:"六年级上册 5.1.2 扇形的认识",
    stem:"下图中有一个扇形，请在此圆中画出与它相同的扇形，并涂上颜色。 + "<br><img src=\"assets/images/g6_fan_412_q10-fans.svg\" alt=\"扇形复制与涂色参考图\" style=\"width:440px;max-width:100%;height:auto\" class=\"inline-block align-middle my-1 rounded\">",
    options:[], answer:"见详解。",
    analysis:"可先用量角器量出扇形的圆心角度数，再以圆的任意一条半径为扇形的边，利用量角器画出圆心角度数相同的扇形即可。",
    detail:"先量出原扇形的圆心角，再以圆的任意一条半径为边，画出圆心角度数相同的扇形并涂色。"
  }
];
for (const question of FAN_RECOGNITION_QUESTIONS) {
  if (!QUESTION_BANK.some(existing => existing.id === question.id)) QUESTION_BANK.push(question);
}
