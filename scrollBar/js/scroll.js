function Scroll(obj) {
	//被滚动的元素:原生
	this.obj = obj;
	this.scrollBar = null;
	this.wheelObj = window;
	this.opts = {
		gdtEle: '.jsGdt',
		wheelEle: '.jsWheel',
		maxH: 100,
		step: 10,
		zeroFlag: false,
		direction: 'top'
	};
}
Scroll.prototype = {
	constructor: Scroll,
	init: function(json) {
		json ? this.extend(this.opts, json) : '';
		this.scrollBar = $(this.obj).find(this.opts.gdtEle).find('span')[0];
		this.wheelObj = $(this.obj).find(this.opts.wheelEle)[0];
		if ( json.zeroFlag ) {
			this.setObjPst(0);
		}
		this.rendStruct();
		this.scrollMouse();
		this.moveBar();
	},
	rendStruct: function() {
		if($(this.wheelObj).height() > this.opts.maxH) {
			var scal = this.opts.maxH/this.wheelObj.scrollHeight;
			$(this.obj).addClass('ScrollPar');
			$(this.scrollBar).css('height',scal*this.opts.maxH);
		} else {
			$(this.obj).removeClass('ScrollPar');
		}
	},
	scrollMouse: function() {
		var _this = this;
		this.wheel(function(upDown) {
			if($(_this.scrollBar).parent().css('display') === 'none') {
				return
			}
			var bar = $(_this.scrollBar).position()[_this.opts.direction];
			
			var scrollBarDis,scrollContDis;
			if (_this.opts.direction === 'top') {
				scrollBarDis = $(_this.scrollBar).parent().height() - $(_this.scrollBar).height();
				scrollContDis = _this.wheelObj.scrollHeight - $(_this.obj).height();
			} else {
				scrollBarDis = $(_this.scrollBar).parent().width() - $(_this.scrollBar).width();
				scrollContDis = _this.wheelObj.scrollWidth - $(_this.obj).width();
			}
			var addBar = _this.opts.step*scrollBarDis/scrollContDis;
			addBar = Math.ceil(addBar);
			bar = upDown ? bar + addBar : bar - addBar;
			_this.setObjPst(bar);
		})
	},
	moveBar: function() {
		var _this = this;
		var dis, now, barY;
		this.drag({
			ele: this.scrollBar,
			fnDown: function(json) {
				if(_this.opts.direction === 'top') {
					now = json.y;
				} else {
					now = json.x;
				}
				barY = $(_this.scrollBar).position()[_this.opts.direction];
			},
			fnMove: function(json) {
				if(_this.opts.direction === 'top') {
					dis = json.y - now;
				} else {
					dis = json.x - now;
				}
				_this.setObjPst(dis + barY);
			}
		})
	},
	setObjPst: function(num) {
		var scrollBarDis, scrollContDis;
		if(this.opts.direction === 'top') {
			
			scrollBarDis = $(this.scrollBar).parent().height() - $(this.scrollBar).height();
			scrollContDis = this.wheelObj.scrollHeight - $(this.obj).height();
			if(num >= $(this.scrollBar).parent().height() - $(this.scrollBar).height()) {
				num = $(this.scrollBar).parent().height() - $(this.scrollBar).height();
			} else if(num < 0) {
				num = 0;
			}
		} else {
			scrollBarDis = $(this.scrollBar).parent().width() - $(this.scrollBar).width();
			scrollContDis = this.wheelObj.scrollWidth - $(this.obj).width();
			if(num >= $(this.scrollBar).parent().width() - $(this.scrollBar).width()) {
				num = $(this.scrollBar).parent().width() - $(this.scrollBar).width();
			} else if(num < 0) {
				num = 0;
			}
		}
		
		var scal = num / scrollBarDis;
		$(this.scrollBar).css(this.opts.direction, num)
		$(this.wheelObj).css(this.opts.direction, -scal * scrollContDis)
	},
	drag: function(json) {
		var opts = {
			ele: json.ele,
			fnDown: json.fnDown,
			fnMove: json.fnMove
		}
		addEvent(opts.ele, 'mousedown', fnDown);
		
		//opts.ele.addEventListener('mousedown', fnDown);
		var flag = false;
		function fnDown(ev) {
			ev = ev || event;
			flag = true;
			opts.fnDown({
				x: ev.clientX,
				y: ev.clientY
			});
			/*addEvent('mousemove',function(){
				fnMove.call(this);
			});*/
			
			
			addEvent(opts.ele, 'click', fnClick);
			function fnClick(ev) {
				if (ev.stopPropagation) {
		            ev.stopPropagation();
		        } else {//IE
		            event.cancelBubble = true;//IE
		        }
			}
			
			
			
			addEvent(document, 'mousemove', fnMove);
			//document.addEventListener('mousemove', fnMove);
			function fnMove(ev) {
				ev = ev || event;
				if(!flag) return
				opts.fnMove({
					x: ev.clientX,
					y: ev.clientY
				});
			}
			addEvent(document, 'mouseup', fnUp);
			function fnUp(){
				flag = false;
			}
			
			ev.preventDefault();
			
		}
	},
	wheel: function(callBack) {
		this.obj.fnWheel = function (ev) {
			var ev = ev || event;
			var upDown;
			if(ev.detail) {
				/*ev.detail: 火狐版*/
				upDown = ev.detail > 0 ? true : false;
			} else {
				/*ev.wheelDelta: 谷歌版*/
				upDown = ev.wheelDelta < 0 ? true : false;
			}
			/*upDown是真就是下滚，否则就是上滚*/
			callBack(upDown);
			
			if (ev.preventDefault) {
				ev.preventDefault();
			} else {
				ev.returnValue=false;
			}
			ev.stopPropagation();
		}
		addEvent(this.obj, 'mousewheel', this.obj.fnWheel);
		addEvent(this.obj, 'DOMMouseScroll', this.obj.fnWheel);
		
	},
	extend: function(obj1, obj2, onOff) {
		if(arguments.length === 1 && window.toString.call(arguments[0]) === '[object Object]') {
			this.extend(this.__proto__, arguments[0]);
		} else {
			obj1 = obj1 || {};
			for(var attr in obj2) {
				if(obj2.hasOwnProperty(attr)) {
					if(typeof obj2[attr] === 'object' && onOff) { //真: 深度克隆
						obj1[attr] = Array.isArray(obj2[attr]) ? [] : {};
						extend(obj1[attr], obj2[attr], onOff);
					} else {
						obj1[attr] = obj2[attr];
					}
				}
			}
			return obj1;
		}
	}
}
function addEvent(ele, eType, handle) {
    if(ele.addEventListener){           //如果支持addEventListener
        ele.addEventListener(eType, handle);
    }else if(ele.attachEvent){          //如果支持attachEvent
        ele.attachEvent("on"+eType, function(ev){
        	handle.call(ele,ev);
        });
    }else{                                  //否则使用兼容的onclick绑定
        ele["on"+eType] = handle;
    }
}