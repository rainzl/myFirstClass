## intervalRange 

功能介绍： 
	两个值的区间组件.
	红色区域为推荐的区域,
	单点不超出区间的范围.
	拖动范围小于等36个月的时候出放大按钮.
	距离小于35px的时候出提示.
	放大的规则: 前后月份各加12
	
参数
	objPar: 组件与上下元素同级的父节点,
	obj: 放拖动条的节点,
	tjRange: 推荐的最大值max和最小值min,
	showPoint: 点的位置,
	unit: '单位',
	lb: 主刑类别,
	showRange: 实际显示的最大值和最小值（包括操作后）,
	numRange: 坐标轴的最大值和最小值,
	isMagnBig: 是否为放大后的图,
	disPx: 距离的最小差值,
	disNum: 月份的最小差值,
	addNum: 放大后前后各加的月数,
	isClick: 是否是点击跳转的

主要方法介绍： 

	renderShowData： 轴线前的数据
	tjRangeInit： 设置推荐范围的位置
	setXaxis： 设置横轴三个坐标点
	setBar： 设置点的位置和对应点的数值
	drag： 拖拽点的事件
	


