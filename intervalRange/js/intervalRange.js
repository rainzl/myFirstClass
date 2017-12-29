//区间组件
function intervalRange(json){
	var settings = {
		objPar: json.objPar,
		obj: json.obj || null,
		tjRange: json.tjRange || {},
		showPoint: json.showPoint || 0,
		unit: json.unit || '个月',
		lb: json.lb || '',
		showRange: json.showRange || json.tjRange || {},
		numRange:json.numRange || {min:0,max:6},
		isMagnBig: json.isMagnBig,
		disPx: json.disPx || 35,
		disNum: json.disNum || 36,
		addNum: json.addNum || 12,
		isClick: json.isClick /*是否是点击跳转的*/
	}
	var _magnHint,_obj,_numHint,w,xAxisArr;
	if (settings.isMagnBig) {
		settings.numRange = json.numRangeMagn;
	}
	settings.obj[0].randerData = {
		tjRangeMin: settings.tjRange.min,
		tjRangeMax: settings.tjRange.max,
		showRangeMin: settings.showRange.min,
		showRangeMax: settings.showRange.max,
		showPoint: settings.showPoint
	}
	settings.obj[0].xNums = {};
	xAxisArr = creatAxisArr({min:settings.numRange.min,max:settings.numRange.max});
	
	
	
	rander(); //渲染页面
	
	init(); //初始化页面状态
	
	
	
	function init() {
		var x;
		_obj = settings.obj.find('.intervalRange');
		w = _obj.find('.choseBarCont').innerWidth();
		_numHint = settings.obj.find('.numHint');
		
		
		//渲染数据
		renderShowData();
		
		//设置推荐范围的位置
		tjRangeInit(w,xAxisArr);
		
		//设置横轴三个坐标点
		setXaxis()
		
		//设置推荐点的位置
		x=Math.ceil((settings.showPoint-settings.numRange.min)*w/(xAxisArr.length));
		setBar(_obj.find('.pointBtn'),{x:x,showNum:settings.showPoint,position:'showPoint'},'left');
		
		//设置展示区间的最小值
		x=Math.ceil((settings.showRange.min-settings.numRange.min)*w/(xAxisArr.length));
		setBar(_obj.find('.leftGrayBar'),{x:x,showNum:settings.showRange.min,position:'showRangeMin'});
		
		//设置展示区间的最大值
		x=Math.floor((settings.numRange.max-settings.showRange.max)*w/(xAxisArr.length));
		setBar(_obj.find('.rightGrayBar'),{x:x,showNum:settings.showRange.max,position:'showRangeMax'},'width',{name: 'init'});
		
		//拖拽推荐点
		drag({
			obj: _obj.find('.pointBtn'),
			attrs: 'left',
			min: settings.numRange.min,
			position: 'showPoint',
			changeOther: true
		});
		
		//拖拽显示的最小值
		drag({
			obj: _obj.find('.leftBtn'),
			moveObj: _obj.find('.leftGrayBar'),
			min: settings.numRange.min,
			position: 'showRangeMin'
		});
		
		//拖拽显示的最大值
		drag({
			obj: _obj.find('.rightBtn'),
			moveObj: _obj.find('.rightGrayBar'),
			min: settings.numRange.min,
			isMaxPoint: true,
			position: 'showRangeMax'
		});
		settings.obj.find('.magn').off('click').on('click',intervalRangeMagn);
		if ( !settings.isMagnBig && _magnHint ) {
			_magnHint.find('.max').off('click').on('click',intervalRangeMax);
		}
	}
	function intervalRangeMagn(ev) {
		if ( $(this).find('.min').css('display') === 'none' ) {
			intervalRangeMax(ev);
		} else {
			intervalRangeMin(ev);
		}
	}
	function intervalRangeMin(ev) {
		var _json = {
				objPar: settings.objPar,
				obj: settings.obj,
				tjRange: settings.tjRange,
				showPoint: settings.obj[0].randerData.showPoint,
				unit: settings.unit,
				lb: settings.lb,
				showRange: {
					min: settings.obj[0].randerData.showRangeMin,
					max: settings.obj[0].randerData.showRangeMax
				},
				numRange:{
					min: json.numRange.min,
					max: json.numRange.max
				},
				disPx: settings.disPx,
				disNum: settings.disNum,
				addNum: settings.addNum,
				isClick: true			
			}
			intervalRange(_json)
	}
	function intervalRangeMax(ev) {
		var _min = settings.obj[0].randerData.showRangeMin-settings.addNum<settings.numRange.min?settings.numRange.min: settings.obj[0].randerData.showRangeMin-settings.addNum;
		var _max = settings.obj[0].randerData.showRangeMax+settings.addNum>settings.numRange.max?settings.numRange.max: settings.obj[0].randerData.showRangeMax+settings.addNum;
		
		
		var _json = {
			objPar: settings.objPar,
			obj: settings.obj,
			tjRange: settings.tjRange,
			showPoint: settings.obj[0].randerData.showPoint,
			unit: settings.unit,
			lb: settings.lb,
			showRange: {
				min: settings.obj[0].randerData.showRangeMin,
				max: settings.obj[0].randerData.showRangeMax
			},
			numRange:{
				min: json.numRange.min,
				max: json.numRange.max
			},
			numRangeMagn: {
				min: _min,
				max: _max
			},
			isMagnBig: true,
			disPx: settings.disPx,
			disNum: settings.disNum,
			addNum: settings.addNum,
			isClick: true
		}
		_magnHint && _magnHint.remove();
		intervalRange(_json)
	}
	
	//拖拽推荐点
	function drag(json){
		var dragSettings = {
			obj: json.obj,
			moveObj: json.moveObj || json.obj,
			attrs: json.attrs || 'width',
			isMaxPoint: json.isMaxPoint,
			min: json.min || 0,
			position: json.position,
			changeOther: json.changeOther
		}
		dragSettings.obj.off('mousedown').on('mousedown',function(ev){
			dragSettings.obj[0].flag = true;
			var mStartX = ev.pageX; // 鼠标的left值
			var flag = true;
			var x,num,bStart;
			var barW = _obj.find('.choseBarCont').width();
			var minNum = _obj.find('.leftBtn').offset().left-_obj.find('.choseBarCont').offset().left+5;
			var maxNum = _obj.find('.rightBtn').offset().left-_obj.find('.choseBarCont').offset().left;
			var pointNum = _obj.find('.pointBtn').offset().left-_obj.find('.choseBarCont').offset().left;
			var pointX,leftX,rightX;
			if ( dragSettings.attrs === 'left' ) {
				bStart = dragSettings.moveObj.position().left;
			} else {
				bStart = dragSettings.moveObj.innerWidth();
			}
			$(document).on('mousemove',function(ev){
				if (!flag || !dragSettings.obj[0].flag) return;
				pointNum = _obj.find('.pointBtn').offset().left-_obj.find('.choseBarCont').offset().left;
				minNum = _obj.find('.leftBtn').offset().left-_obj.find('.choseBarCont').offset().left+5;	
				maxNum = _obj.find('.rightBtn').offset().left-_obj.find('.choseBarCont').offset().left;
				
				
				//拖动右边的最大值
				if ( dragSettings.isMaxPoint ) {
					x = bStart + (mStartX-ev.pageX);
					if ( x<0 ) {
						x = 0;
					} else if (x>w) {
						x = w;
					}
					num = Math.floor(((w-x)/w)*xAxisArr.length)+dragSettings.min; 
					
					if ( x > barW-pointNum-10 ) {
						pointX = w - x;
						setBar(_obj.find('.pointBtn'),{x:pointX,showNum:num,position:'showPoint'},'left');
					}
					if ( x >= barW-minNum ) {
						pointX = w - x;
						setBar(_obj.find('.pointBtn'),{x:pointX,showNum:num,position:'showPoint'},'left');
						
						pointL = w - x;
						setBar(_obj.find('.leftGrayBar'),{x:pointL,showNum:num,position:'showRangeMin'},'width');
					}
				} else {
					x = bStart + (ev.pageX - mStartX);
					if ( x<0 ) {
						x = 0;
					} else if (x>w) {
						x = w;
					}
					num = Math.floor((x/w)*xAxisArr.length)+dragSettings.min;
					
					//拖动中间的点
					if ( dragSettings.position === 'showPoint' ) {
						if ( x<=minNum ) {
							pointL = x;
							setBar(_obj.find('.leftGrayBar'),{x:pointL,showNum:num,position:'showRangeMin'},'width');
						} 
						if (x>=maxNum+5) {
							pointR = w - x;
							setBar(_obj.find('.rightGrayBar'),{x:pointR,showNum:num,position:'showRangeMax'},'width');
						}
					} else {
						//拖动左边的最小值
						if ( x >= pointNum + 10) {
							pointX = x;
							setBar(_obj.find('.pointBtn'),{x:pointX,showNum:num,position:'showPoint'},'left');
						}
						if ( x >= maxNum+5 ) {
							pointX = x;
							setBar(_obj.find('.pointBtn'),{x:pointX,showNum:num,position:'showPoint'},'left');
							
							pointR = w - x;
							setBar(_obj.find('.rightGrayBar'),{x:pointR,showNum:num,position:'showRangeMax'},'width');
						}
					}
				}
				setBar(dragSettings.moveObj,{x:x,showNum:num,position:dragSettings.position},dragSettings.attrs,{name: 'move',moveEle: dragSettings.obj[0]});
			})
			$(document).on('mouseup',function(ev){
				dragSettings.obj[0].flag = false;
				flag = false;
			})
			return false
		});
	}
	
	
	//设置横轴三个坐标点
	function setXaxis(){
		_obj.find('.monthFirst').html(settings.numRange.min+settings.unit);
		if(settings.numRange.max - settings.numRange.min > 2) {
			_obj.find('.monthSecond').html(Math.floor((settings.numRange.min+settings.numRange.max)/2)+settings.unit);
		} else {
			_obj.find('.monthSecond').html("");
		}
		if ( settings.lb === '剥夺政治权利' ) {
			_obj.find('.monthThird').html('终身');
		} else {
			if(settings.numRange.max != settings.numRange.min) {
				_obj.find('.monthThird').html(settings.numRange.max+settings.unit);
			} else {
				_obj.find('.monthThird').html("");
			}
		}
	}
	
	//设置推荐点的位置
	/*rangeControl*/
	function setBar(obj,nums,attrs,cFrom) {
		var disX,hintL;
		attrs = attrs || 'width';
		
		if ( nums.showNum > settings.numRange.max ) {
			nums.showNum = settings.numRange.max;
		} else if ( nums.showNum < settings.numRange.min ) {
			nums.showNum = settings.numRange.min;
		}
		
		
		obj.css(attrs,nums.x);
		obj.find('i').html(nums.showNum);
		
		//渲染显示数据
		settings.obj[0].randerData[nums.position] = nums.showNum;
		settings.obj[0].xNums[nums.position] = nums.x;
		renderShowData();
		
		
		//月份差小于36个月
		if ( !settings.isMagnBig ) {
			settings.obj.removeClass('min showMagn');
			if (settings.obj[0].randerData.showRangeMax-settings.obj[0].randerData.showRangeMin<=settings.disNum) {
				settings.obj.addClass('showMagn max');
			} else {
				settings.obj.removeClass('showMagn max');
			}
		} else {
			settings.obj.removeClass('showMagn max').addClass('min showMagn');
			if ( cFrom && cFrom.name === 'move' && (nums.x===0 || nums.x===w) ) {
				intervalRangeMin();
				cFrom.moveEle.flag = false;
				return;
			}
		}
		//距离差小于35px
		disX = w-settings.obj[0].xNums.showRangeMax-settings.obj[0].xNums.showRangeMin;
		if ( disX<=settings.disPx ) {
			hintL = disX/2+settings.obj[0].xNums.showRangeMin-66+145+38;
			_numHint.css('left',hintL).show();
			_numHint.find('.leftNum').html(settings.obj[0].randerData.showRangeMin);
			_numHint.find('.rightNum').html(settings.obj[0].randerData.showRangeMax);
			if ( !settings.isClick && !settings.isMagnBig && cFrom && cFrom.name === 'init' ) {
				intervalRangeMax();
			} else {
				if (_magnHint) {
					_magnHint.css('left',hintL).show();
				}
				settings.obj.find('.grayBar i').hide();
			}
		} else {
			_numHint.hide();
			if (_magnHint) {
				_magnHint.hide();
			}
			settings.obj.find('.grayBar i').show();
		}
	}
	
	//设置推荐范围的位置
	function tjRangeInit(w,xAxisArr) {
		var _tjRangeMin = settings.tjRange.min,
			_tjRangeMax = settings.tjRange.max,
			firstW,secondW,thirdW;
		if ( _tjRangeMin<settings.numRange.min ) {
			_tjRangeMin = settings.numRange.min;
		} else if ( _tjRangeMin>settings.numRange.max ) {
			_tjRangeMin = settings.numRange.max;
		}
		if ( _tjRangeMax<settings.numRange.min ) {
			_tjRangeMax = settings.numRange.min;
		} else if ( _tjRangeMax>settings.numRange.max ) {
			_tjRangeMax = settings.numRange.max;
		}
		firstW = Math.floor((_tjRangeMin-settings.numRange.min)*w/xAxisArr.length);
		if ( _tjRangeMin === _tjRangeMax && _tjRangeMin === settings.numRange.min ) {
			secondW = 0;
		} else {
			secondW = Math.floor((_tjRangeMax-_tjRangeMin+1)*w/xAxisArr.length);
		}
		thirdW = w - firstW - secondW;
		
		_obj.find('.leftRange').css('width',firstW);
		_obj.find('.cintervalRange').css('width',secondW);
		_obj.find('.rightRange').css('width',thirdW);
	}
	
	
	//渲染页面
	function rander(parSct) {
		/*showMagn max min*/
		var str = '<div class="mainPunBar boderShadow intervalRange">'
			+'<div class="mainPunNum">'
				+'<div class="yearPar"><strong class="color4d9ce4 num">0</strong><span>年</span></div><div class="monthPar"><strong class="color4d9ce4 num">0</strong><span>个月</span></div>'
			+'</div>'
			+'<div class="intervalBar" id="intervalRange">'
				+'<div class="magn"><img class="max" src="img/admin/magnBig.png"/><img class="min" src="img/admin/magnSmall.png"/></div>'
				+'<div class="numHint"><i class="leftNum">1</i>个月~<i class="rightNum">2</i>个月</div>'
				+'<div class="choseBarCont">'
					+'<div class="choseColorBar">'
						+'<div class="dashedRange leftDashedRange"></div>'
						+'<div class="leftRange pinkBar"></div>'
						+'<div class="cintervalRange blueBar"></div>'
						+'<div class="rightRange pinkBar"></div>'
						+'<div class="dashedRange rightDashedRange"></div>'
					+'</div>'
					+'<div class="leftGrayBar grayBar"><span class="leftBtn choseBtn color4d9ce4"><em><i>0</i></em></span></div>'
					+'<div class="rightGrayBar grayBar"><span class="rightBtn choseBtn color4d9ce4"><em><i>0</i></em></span></div>'
					+'<span class="pointBtn choseBtn color4d9ce4"></span>'
					+'<div class="monthNums">'
						+'<span class="monthFirst color4d9ce4"></span> <span class="monthSecond color4d9ce4"></span> <span class="monthThird color4d9ce4"></span>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>';
		settings.obj.html(str);
		if ( settings.numRange.max>=180 && settings.numRange.min<=6 && !settings.isMagnBig ) {
			_magnHint = settings.objPar.find('.magnHint');
			if ( !_magnHint[0] ) {
				/*这个元素只有在6-180的时候才出来,放大后的组件不渲染*/
				_magnHint = $('<div class="magnHint"><div><span>当前可以</span><span class="max">放大</span><span>区间</span></div><mark></mark></div>');
				settings.objPar.append(_magnHint);
			}
		}
	}
	
	//渲染显示数据
	function renderShowData() {
		if (settings.obj[0].randerData.showPoint/12>=1){
			settings.obj.find('.yearPar').css('display','inline-block').find('strong').html(Math.floor(settings.obj[0].randerData.showPoint/12));
		} else {
			settings.obj.find('.yearPar').hide();
		}
		settings.obj.find('.monthPar').find('strong').html(settings.obj[0].randerData.showPoint%12);
		if ( settings.obj[0].randerData.tjRangeMin == 0 ) {
			$('.mainPunText').hide();
		} else {
			$('.mainPunText').show();
			$('.mainPunText').find('.tjRange').html(settings.obj[0].randerData.tjRangeMin+'-'+settings.obj[0].randerData.tjRangeMax+'个月');
		}
	}
	//创建组件的时间轴
	function creatAxisArr(settings,lb) {
		var _arr = [];
		var num = lb==='罚金'? 1000: 1
		for ( var i=settings.min; i<=settings.max; i+=num ) {
			if ( lb === '剥夺政治权利' ) {
				_arr.push(Math.round(i/12));
			} else {
				_arr.push(i);
			}
		}
		if ( lb === '剥夺政治权利' ) {
			_arr.push('终身');
		}
		return _arr;
	}
}