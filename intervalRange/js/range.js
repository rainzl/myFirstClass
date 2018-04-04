function range(json) {
	var settings = {
		objPar: json.objPar,
		obj: json.obj || null,
		showRange: json.showRange || {},
		numRange:json.numRange,
		mouseupFn: json.mouseup || function(){}
	}
	var _magnHint,_obj,_numHint,w,xAxisArr;
	if (settings.isMagnBig) {
		settings.numRange = json.numRangeMagn;
	}
	settings.obj[0].randerData = {
		showRangeMin: settings.showRange.min,
		showRangeMax: settings.showRange.max
	}
	settings.obj[0].xNums = {};
	xAxisArr = creatAxisArr({min:settings.numRange.min,max:settings.numRange.max});
	
	settings.obj.html(render());
	init();
	
	
	function init(){
		_obj = settings.obj.find('.intervalRange');
		w = _obj.find('.choseBarCont').innerWidth();
		
		
		//设置展示区间的最小值
		x=Math.ceil((settings.showRange.min-settings.numRange.min)*w/(xAxisArr.length));
		setBar(_obj.find('.leftGrayBar'),{x:x,showNum:settings.showRange.min,position:'showRangeMin'});
		
		//设置展示区间的最大值
		x=Math.floor((settings.numRange.max-settings.showRange.max)*w/(xAxisArr.length));
		setBar(_obj.find('.rightGrayBar'),{x:x,showNum:settings.showRange.max,position:'showRangeMax'},'width');
		
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
			var leftX,rightX;
			if ( dragSettings.attrs === 'left' ) {
				bStart = dragSettings.moveObj.position().left;
			} else {
				bStart = dragSettings.moveObj.innerWidth();
				console.log(bStart,dragSettings.moveObj.width())
			}
			$(document).on('mousemove',function(ev){
				if (!flag || !dragSettings.obj[0].flag) return;
				minNum = _obj.find('.leftBtn').offset().left-_obj.find('.choseBarCont').offset().left+6;	
				maxNum = _obj.find('.rightBtn').offset().left-_obj.find('.choseBarCont').offset().left;
				//拖动右边的最大值
				if ( dragSettings.isMaxPoint ) {
					x = bStart + (mStartX-ev.pageX);
					if ( x<0 ) {
						x = 0;
					} else if (x>=w) {
						x = w;
					}
					num = Math.floor(((w-x)/w)*xAxisArr.length)+dragSettings.min; 
					if ( x >= barW-minNum ) {
						pointL = w - x;
						setBar(_obj.find('.leftGrayBar'),{x:pointL,showNum:num,position:'showRangeMin'},'width');
					}
				} else {
					x = bStart + (ev.pageX - mStartX);
					if ( x<0 ) {
						x = 0;
					} else if (x>=w) {
						x = w;
					}
					num = Math.floor((x/w)*xAxisArr.length)+dragSettings.min;					
					//拖动左边的最小值
					if ( x >= maxNum+5 ) {
						pointR = w - x;
						setBar(_obj.find('.rightGrayBar'),{x:pointR,showNum:num,position:'showRangeMax'},'width');
					}
				}
				setBar(dragSettings.moveObj,{x:x,showNum:num,position:dragSettings.position},dragSettings.attrs);
			})
			$(document).on('mouseup',function(ev){
				if (!flag || !dragSettings.obj[0].flag) return;
				dragSettings.obj[0].flag = false;
				flag = false;
				settings.mouseupFn(settings.obj[0].randerData.showRangeMin,settings.obj[0].randerData.showRangeMax);
			})
			return false
		});
	}
	
	
	
	//设置推荐点的位置
	function setBar(obj,nums,attrs) {
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
		//renderShowData();
		settings.obj.find('.grayBar i').show();
	}
	
	function render() {
		var str = '<div class="intervalRange">'
				+'<div class="choseBarCont">'
					+'<div class="leftGrayBar grayBar"><span class="leftBtn choseBtn color4d9ce4"><em><i>0</i></em></span></div>'
					+'<div class="rightGrayBar grayBar"><span class="rightBtn choseBtn color4d9ce4"><em><i>0</i></em></span></div>'
				+'</div>'
			+'</div>'
		return str;
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