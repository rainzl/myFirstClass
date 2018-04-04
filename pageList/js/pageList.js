var PageList = (function(){
	function PageList(obj) {
		this.obj = obj;
		this.opts = {
			nowNum: 1,
			counts: 1,
			defaultSize: 7,
			changeNumFn: function(){}
		}
	}
	PageList.prototype = {
		constrctor: PageList,
		init: function(opts) {
			$.extend(true, this.opts, opts);
			var PageArr = this.printPage();
			this.rendHtml(PageArr);
			this.addEvents();
		},
		addEvents: function() {
			this.obj.on('click.prev', '.prev',$.proxy(this.prevPageClick,this));
			this.obj.on('click.next', '.next',$.proxy(this.nextPageClick,this));
			this.obj.on('click.nums', 'p',$.proxy(this.pageNumsClick,this));
			
		},
		pageNumsClick: function(ev) {
			var span = $(ev.target).closest('span[index]');
			if ( span[0] ) {
				this.opts.nowNum = Number(span.attr('index'));
				this.pageChange();
			}
		},
		nextPageClick: function() {
			if ( this.opts.nowNum < this.opts.counts ) {
				this.opts.nowNum ++;
				this.pageChange();
			}
		},
		prevPageClick: function () {
			if ( this.opts.nowNum > 1 ) {
				this.opts.nowNum --;
				this.pageChange();
			}
		},
		pageChange: function() {
			var PageArr = this.printPage();
			this.opts.changeNumFn(this.opts.nowNum);
			this.rendHtml(PageArr);
		},
		printPage: function() {
			var DefaultSize = this.opts.defaultSize;
			var MinShowSize = DefaultSize-2;
			
			var args = new Array(DefaultSize);
            
            if (this.opts.counts<=DefaultSize) {
                args = new Array(this.opts.counts);
                for (var i=1;i<=this.opts.counts; i++) {
                    args[i-1] = i;
                }
            } else if (this.opts.nowNum  <= 3) {
                args[DefaultSize-2] = "...";
                args[DefaultSize-1] =this.opts.counts;
                for (var i=0; i<DefaultSize; i++) {
                    if (typeof(args[i]) == 'undefined') {
                        args[i] = i+1;
                    }
                }
            } else if (this.opts.nowNum >= this.opts.counts-2) {
                args[0] = "1";
                args[1] = "...";
                args[DefaultSize-1]=this.opts.counts;
                for (var i=DefaultSize-1; i>0; i--) {
                    if (typeof(args[i]) == 'undefined') {
                        args[i]  = this.opts.counts-(DefaultSize-i)+1;
                    }
                }
            } else if (this.opts.counts == DefaultSize+1) {  //此种情况下，有一个省略号
            	if ( this.opts.nowNum<=this.opts.counts/2 ) {
            		//args[DefaultSize-1] = this.opts.counts;
            		args[0] = 1;
	                args[DefaultSize-2] = "...";
	                
	                args[DefaultSize-1] = this.opts.counts;
	                for (var i=0; i<DefaultSize; i++) {
	                    if (typeof(args[i]) == 'undefined') {
	                        args[i] = i+1;
	                    }
	                }
	                
            	} else {
            		args[0] = 1;
	                args[1] = "...";
	                args[DefaultSize-1] = this.opts.counts;
	                
	                for (var i=this.opts.counts-DefaultSize; i<this.opts.counts; i++) {
	                    if (typeof(args[i-this.opts.counts+DefaultSize]) == 'undefined') {
	                        args[i-this.opts.counts+DefaultSize] = i+1;
	                    }
	                }
            	}
            	
            } else {
                args[0] = 1;
                args[1] = "...";
                args[DefaultSize-2] = "...";
                args[DefaultSize-1] = this.opts.counts;
                var length = DefaultSize - 4;
                if (this.opts.nowNum-Math.floor(length/2) <= 1) {
                    for (var i=2; i<DefaultSize-2; i++) {
                        args[i] = i+1;
                    }
                } else if (this.opts.nowNum+Math.floor(length/2) >= this.opts.counts-2) {
                    for (var i=DefaultSize-3; i>=2; i--) {
                        args[i] = this.opts.counts - (DefaultSize-i)+1;
                    }
                } else {
                    for (var i=2; i<DefaultSize-2; i++) {
                        args[i] = this.opts.nowNum-Math.floor(length/2)+i-2;
                    }
                }
            }
            return args;
		},
		rendHtml: function(arr) {
			var str = '';
			
			if ( this.opts.nowNum !== 1 ) {
				str += '<span class="prev chengBtn">上一页</span>'
			} 
			str += '<p class="pageNums">'
			for (var i=0; i<arr.length; i++) {
                var _class = '';
                if ( arr[i]===this.opts.nowNum) {
                    _class += 'active';
                }
                if ( isNaN(arr[i]) ) {
                    str += '<span class="static">'+arr[i]+'</span>';
                } else {
                    str += '<span class="'+_class+'" index="'+arr[i]+'">'+arr[i]+'</span>';
                }
            }
            str += '</p>'
            if ( this.opts.counts !== this.opts.nowNum ) {
				str += '<span class="prev chengBtn">上一页</span>'
			} 
            this.obj.html(str);
		}
	}
	
	return PageList;
})()
