// 题典网「题目图谱」知识关系数据 (V1.0 - 已审核前置与横向关联关系)
window.KNOWLEDGE_RELATIONS = [
  {
    "source": "kp_g6_frac_mult_op",
    "target": "kp_g6_frac_mult_app",
    "relation": "prerequisite",
    "description": "熟练掌握分数乘法的意义与计算法则是解决“求一个数的几分之几”实际应用题的基础。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_frac_mult_op",
    "target": "kp_g6_reciprocal",
    "relation": "prerequisite",
    "description": "理解分数乘法算理后，才能理解“乘积为 1 的两个数互为倒数”的定义。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_reciprocal",
    "target": "kp_g6_frac_div_op",
    "relation": "prerequisite",
    "description": "分数除法的核心法则是“除以一个不为 0 的数等于乘这个数的倒数”，必须先掌握倒数的求法。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_frac_div_op",
    "target": "kp_g6_frac_div_app",
    "relation": "prerequisite",
    "description": "掌握分数除法与四则混合运算是列方程或用算术法解决“已知一个数的几分之几求原数”及工程问题的前提。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_frac_div_op",
    "target": "kp_g6_ratio",
    "relation": "prerequisite",
    "description": "比的前项除以后项所得的商叫做比值，分数除法与约分是化简比和按比分配的运算基础。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_frac_mult_app",
    "target": "kp_g6_percent_app",
    "relation": "prerequisite",
    "description": "百分数应用题与分数乘法应用题共享相同的“单位 1”数量关系结构。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_percent_conv",
    "target": "kp_g6_percent_app",
    "relation": "prerequisite",
    "description": "理解百分数的意义并掌握百分数与分数、小数的互化是解决百分率与增减幅度应用题的前提。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_percent_app",
    "target": "kp_g6_sector_chart",
    "relation": "prerequisite",
    "description": "扇形统计图利用百分比表示各部分占总量的比例，读取和计算扇形统计图需要运用百分数乘除法。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_sector",
    "target": "kp_g6_sector_chart",
    "relation": "related",
    "description": "扇形统计图中各部分扇形的圆心角度数由百分比乘 360° 决定，与扇形的圆心角知识紧密相连。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_circle_rec",
    "target": "kp_g6_circle_circum",
    "relation": "prerequisite",
    "description": "理解圆的半径、直径及其二倍关系（d=2r）是推导和运用圆周长公式的前提。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_circle_circum",
    "target": "kp_g6_circle_area",
    "relation": "prerequisite",
    "description": "圆面积公式推导将圆切拼为近似长方形，长方形的长即为圆周长的一半（πr），需以圆的周长为基础。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_circle_area",
    "target": "kp_g6_circle_combo",
    "relation": "prerequisite",
    "description": "计算“外方内圆”、“外圆内方”等含圆组合图形的面积，需要先掌握圆的面积与正方形、三角形面积公式。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_circle_area",
    "target": "kp_g6_sector",
    "relation": "prerequisite",
    "description": "扇形面积是所在圆面积的一部分（按圆心角占 360° 的比例计算），需以圆的面积和周长为基础。",
    "status": "reviewed"
  },
  {
    "source": "kp_g6_neg_basic",
    "target": "kp_g7_num_line_abs",
    "relation": "prerequisite",
    "description": "六年级对正负数与相反意义的量的初步认识，是初一深入学习有理数、数轴、相反数与绝对值的起点。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_num_line_abs",
    "target": "kp_g7_rat_add_sub",
    "relation": "prerequisite",
    "description": "有理数加减法法则需要先判断两个数的符号并比较绝对值大小，绝对值与相反数是加减运算的基石。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_rat_add_sub",
    "target": "kp_g7_rat_mul_div",
    "relation": "prerequisite",
    "description": "有理数加减运算与符号规则为进一步学习有理数乘除法及乘法分配律奠定基础。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_rat_mul_div",
    "target": "kp_g7_rat_pow_mix",
    "relation": "prerequisite",
    "description": "乘方是求 n 个相同因数的积的运算，有理数的乘除与加减法共同构成含乘方混合运算的基础。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_rat_pow_mix",
    "target": "kp_g7_sci_approx",
    "relation": "prerequisite",
    "description": "科学记数法利用 10 的正整数次幂表示大数，需要先理解有理数的乘方。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_rat_pow_mix",
    "target": "kp_g7_alg_eval",
    "relation": "prerequisite",
    "description": "将具体数值代入代数式求值时，需要运用有理数的加、减、乘、除和乘方混合运算。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_alg_expr",
    "target": "kp_g7_alg_eval",
    "relation": "prerequisite",
    "description": "理解代数式的概念与数量关系表示后，才能通过代入字母的值计算代数式的值。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_alg_expr",
    "target": "kp_g7_mono_poly",
    "relation": "prerequisite",
    "description": "单项式与多项式是代数式中最核心的整式类型，由代数式概念进一步分类细化而来。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_mono_poly",
    "target": "kp_g7_like_terms",
    "relation": "prerequisite",
    "description": "理解单项式的系数与字母指数，才能准确识别同类项并进行合并同类项。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_like_terms",
    "target": "kp_g7_poly_add_app",
    "relation": "prerequisite",
    "description": "整式的加减本质上就是先去括号、再合并同类项。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_rat_pow_mix",
    "target": "kp_g8_power_op",
    "relation": "prerequisite",
    "description": "有理数乘方的意义（底数与指数）是推导同底数幂乘除、幂的乘方和积的乘方法则的直接依据。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_power_op",
    "target": "kp_g8_poly_mul_div",
    "relation": "prerequisite",
    "description": "单项式与多项式的乘除运算直接依赖同底数幂的乘除法与积的乘方运算法则。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_like_terms",
    "target": "kp_g8_poly_mul_div",
    "relation": "prerequisite",
    "description": "多项式乘以多项式展开后，必须通过合并同类项化为最简多项式。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_poly_mul_div",
    "target": "kp_g8_mult_formula",
    "relation": "prerequisite",
    "description": "平方差公式和完全平方公式是由多项式乘以多项式推导出的特殊结构速算公式。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_poly_mul_div",
    "target": "kp_g8_fac_common",
    "relation": "prerequisite",
    "description": "提公因式法分解因式与单项式乘以多项式互为逆变形。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_mult_formula",
    "target": "kp_g8_fac_formula",
    "relation": "prerequisite",
    "description": "逆用平方差公式和完全平方公式即可得到公式法因式分解。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_fac_common",
    "target": "kp_g8_fac_formula",
    "relation": "related",
    "description": "综合因式分解中常需先提公因式、再套用公式法（一提二套三彻底）。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_fac_formula",
    "target": "kp_g8_frac_def_prop",
    "relation": "prerequisite",
    "description": "对分子、分母为多项式的分式进行约分和通分时，必须先将多项式分解因式。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_frac_def_prop",
    "target": "kp_g8_frac_mul_div",
    "relation": "prerequisite",
    "description": "分式的基本性质与约分是进行分式乘除化简的核心步骤。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_frac_def_prop",
    "target": "kp_g8_frac_add_mix",
    "relation": "prerequisite",
    "description": "异分母分式加减法必须先利用分式的基本性质通分化为同分母分式。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_frac_mul_div",
    "target": "kp_g8_frac_add_mix",
    "relation": "prerequisite",
    "description": "分式混合化简求值需要综合运用分式的乘除、乘方与加减运算法则。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_like_terms",
    "target": "kp_g7_eq_solve",
    "relation": "prerequisite",
    "description": "解一元一次方程中的“去括号”和“合并同类项”步骤直接运用了整式加减的法则。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_eq_concept_prop",
    "target": "kp_g7_eq_solve",
    "relation": "prerequisite",
    "description": "等式的性质 1 和性质 2 是解一元一次方程中“移项”和“去分母、系数化为 1”的理论依据。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_eq_solve",
    "target": "kp_g7_eq_param_app",
    "relation": "prerequisite",
    "description": "熟练掌握一元一次方程的解法是解决含参同解方程和列方程解实际应用题的前提。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_eq_concept_prop",
    "target": "kp_g9_qe_def_root",
    "relation": "prerequisite",
    "description": "从一元一次方程的概念与方程的解，自然拓展到含有一个未知数且未知数最高次数为 2 的一元二次方程。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_mult_formula",
    "target": "kp_g9_qe_solve",
    "relation": "prerequisite",
    "description": "用配方法解一元二次方程需要熟练运用完全平方公式配方。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_fac_formula",
    "target": "kp_g9_qe_solve",
    "relation": "prerequisite",
    "description": "因式分解法解一元二次方程依赖提公因式法与公式法将二次三项式分解为两个一次因式的乘积。",
    "status": "reviewed"
  },
  {
    "source": "kp_g9_qe_def_root",
    "target": "kp_g9_qe_solve",
    "relation": "prerequisite",
    "description": "理解一元二次方程的一般式 ax²+bx+c=0 及各项系数，才能套用配方法与求根公式。",
    "status": "reviewed"
  },
  {
    "source": "kp_g9_qe_solve",
    "target": "kp_g9_qf_graph_prop",
    "relation": "prerequisite",
    "description": "将二次函数一般式 y=ax²+bx+c 化为顶点式 y=a(x-h)²+k 需要运用配方法。",
    "status": "reviewed"
  },
  {
    "source": "kp_g9_qf_def",
    "target": "kp_g9_qf_graph_prop",
    "relation": "prerequisite",
    "description": "理解二次函数的定义与表达式结构是研究抛物线图象与性质的基础。",
    "status": "reviewed"
  },
  {
    "source": "kp_g9_qe_solve",
    "target": "kp_g9_qf_eq_ineq",
    "relation": "related",
    "description": "二次函数 y=ax²+bx+c 与 x 轴的交点横坐标即为一元二次方程 ax²+bx+c=0 的实数根，二者可通过判别式 Δ 互相转化。",
    "status": "reviewed"
  },
  {
    "source": "kp_g9_qf_graph_prop",
    "target": "kp_g9_qf_eq_ineq",
    "relation": "prerequisite",
    "description": "掌握抛物线的开口方向、对称轴和图象位置，才能利用函数图象求解一元二次方程近似根与不等式解集。",
    "status": "reviewed"
  },
  {
    "source": "kp_g9_qf_graph_prop",
    "target": "kp_g9_qf_app",
    "relation": "prerequisite",
    "description": "实际问题中的最大利润、最大面积和投球最大高度本质上都是求二次函数在自变量取值范围内的顶点最值。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_alg_expr",
    "target": "kp_g9_if_def_graph",
    "relation": "prerequisite",
    "description": "初一学习的正（反）比例数量关系为初三建立反比例函数 y=k/x 的数学模型打下基础。",
    "status": "reviewed"
  },
  {
    "source": "kp_g9_if_def_graph",
    "target": "kp_g9_if_linear_app",
    "relation": "prerequisite",
    "description": "掌握反比例函数的解析式求法、象限分布与增减性，是解决反比例函数与一次函数交点综合及实际问题的关键。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_tri_side_line",
    "target": "kp_g8_cong_sas",
    "relation": "prerequisite",
    "description": "三角形的边角元素及中线、高线、角平分线概念是构造和证明全等三角形的几何基础。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_tri_angle",
    "target": "kp_g8_cong_asa_aas",
    "relation": "prerequisite",
    "description": "利用三角形内角和定理与外角性质推导等角关系，是运用 ASA 和 AAS 判定三角形全等的核心步骤。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_cong_prop",
    "target": "kp_g8_cong_sas",
    "relation": "related",
    "description": "几何证明中常先通过 SAS 判定三角形全等，再由全等三角形的性质得出对应边相等或对应角相等。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_cong_sas",
    "target": "kp_g8_cong_asa_aas",
    "relation": "related",
    "description": "SAS、ASA、AAS 共同构成一般三角形边角全等判定的核心方法体系。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_cong_asa_aas",
    "target": "kp_g8_cong_sss_hl",
    "relation": "related",
    "description": "结合 SAS、ASA、AAS、SSS 与直角三角形特有的 HL 定理，形成完备的全等三角形判定方法库。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_cong_sss_hl",
    "target": "kp_g8_angle_bisector",
    "relation": "prerequisite",
    "description": "角平分线的性质定理与判定定理均通过构造直角三角形并利用 AAS 或 HL 全等进行证明。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_cong_sas",
    "target": "kp_g8_perp_bisector",
    "relation": "prerequisite",
    "description": "线段垂直平分线的性质定理通过 SAS 证明两个直角三角形全等得出。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_cong_sas",
    "target": "kp_g8_iso_tri",
    "relation": "prerequisite",
    "description": "等腰三角形“等边对等角”和“三线合一”性质通过作顶角平分线或底边中线构造全等三角形证明。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_iso_tri",
    "target": "kp_g8_equi_tri_30",
    "relation": "prerequisite",
    "description": "等边三角形是特殊的等腰三角形，继承并强化了等腰三角形全部边角性质与“三线合一”特征。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_perp_bisector",
    "target": "kp_g8_shortest_path",
    "relation": "prerequisite",
    "description": "“将军饮马”最短路径模型的核心是利用轴对称与线段垂直平分线的性质将折线等长转化为同侧或异侧共线线段。",
    "status": "reviewed"
  },
  {
    "source": "kp_g8_iso_tri",
    "target": "kp_g8_shortest_path",
    "relation": "related",
    "description": "将军饮马问题常以等腰三角形（利用三线合一构造对称轴）或等边三角形为背景考查周长最小值。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_alg_expr",
    "target": "kp_syn_num_shape",
    "relation": "related",
    "description": "数与形规律探索题通常需要将观察到的图形或数值递推规律用含 n 的代数式表达出来。",
    "status": "reviewed"
  },
  {
    "source": "kp_g7_eq_solve",
    "target": "kp_syn_new_def",
    "relation": "related",
    "description": "新定义运算与“和谐方程”、“立信方程”问题常需要转化为一元一次方程求解参数。",
    "status": "reviewed"
  }
];
