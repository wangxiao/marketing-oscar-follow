function simpleAnimation( options ) {

	/*******************************************
	*    全部参数
	*******************************************/
	options = {

		//容器，可以是id，element 或者 jquery选择的元素，但是只会取出第一个
		container: options.container || document.body,

		//canvas默认宽、高
		width: options.width || 300,
		height: options.height || 150,

		//模式选择 dom 或者 canvas
		mode: options.mode || 'canvas',

		//加载图片的资源，每个值中有 id 和 图片的 url ， 如： 
		// var IMAGE_LIST=[{
		//     id : "map",
		//     url : "images/baidu.gif"
		// }];
		imagesList: options.imagesList || [],

		//资源加载之前要做
		onstart: options.onstart,

		//资源加载完成
		onready: options.onready,

		//动画帧频，默认每秒60帧
		FPS: options.FPS || 60
	};

	/*******************************************
	*    全部变量
	********************************************/

	//对象
	//将会暴露出去的对象，上面绑定方法。
	var SA = {};

	//全部图层，按照 zIndex 索引
	var layerList = {};

	//加载的图片资源对象
	var loadImagesList = {};

	//数组
	//存储全局计时器
	var timer = [];

	//全局动画队列
	var animationList = [];

	/*******************************************
	*    基本方法
	********************************************/
	function createId() {
		return 'wangxiao' + new Date().getTime();
	}

	function getElement( container ) {
		if( typeof container === 'string' ) {
			container = document.getElementById( container );
		} else if( typeof container === 'object' ) {
			//判断是否是 jquery 对象
			if( container[0] ) {
				container = container[0];
			}
		}
		return container;
	}

	function createCanvas( opts ) {
		opts = opts || {};
		opts = {
			width: opts.width || 0,
			height: options.height || 0,
			container: opts.container || null 
		};
		var canvas = document.createElement('canvas');
		canvas.setAttribute('width', opts.width );
		canvas.setAttribute('height', opts.height );
		if( opts.container ) {
			opts.container = getElement( opts.container );
			opts.container.appendChild(canvas);
		}
		return canvas;
	}
	
	function createDom( opts ) {
		opts = opts || {};
		opts = {
			width: opts.width || 0,
			height: opts.height || 0,
			x: opts.x || 0,
			y: opts.y || 0,
			container: opts.container || null 
		};
		var element = document.createElement('div');
		element.style.width = opts.width + 'px';
		element.style.height = opts.height + 'px';
		element.style.top = opts.y + 'px';
		element.style.left = opts.x + 'px';

		if( opts.container ) {
			opts.container = getElement( opts.container );
			opts.container.appendChild(element);
		}
		return element;
	}

	function delFromListById( id, list ) {
		for( var i = 0 , l = list.length ; i < l ; i += 1 ) {
			if( list[i][id] === id ) {
				list.splice( i, 1 );
			}
		}
		return list;
	}

	//图片加载函数,  callback为当所有图片加载完毕后的回调函数。
	SA.loadImage = function( imagesList, callback ) {
		var images = {};
		var num = imagesList.length;
		var i = 0;
		setImage();
		function setImage(){
			if( i < num ){
				var img = imagesList[i];
				images[ img.id ] = new Image();		
				images[ img.id ].src = img.url;
				images[ img.id ].onload = function( event ){
					i += 1;
					setImage();
				};
			} else {
				if ( typeof callback === 'function' ) {
					callback.apply( this, arguments );
				}
			}
		}
		return images;
	};

	/*******************************************
	*    全局计时器
	********************************************/
	SA.Timer = {
		play: function () {
			var t = setInterval( function() {
				// drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
				// TODO: 绘制一切
				for( var i in animationList ) {
					animationList[i].element[ animationList[i].fun ]();
				}
			}, 1000/options.FPS );
		},
		pause: function () {
			// clearInterval(timer);
		},
		loop: function( fun, FPS ) {
			var t = setInterval( fun, 1000/FPS );
			return t;
		}
	};

	SA.play = SA.Timer.play;
	SA.pause = SA.Timer.pause;

	/*******************************************
	*    舞台方法
	********************************************/
	SA.Stage = {
		container: getElement( options.container ),
		delayTime: 0,
		layerList: layerList,
		create: function( mode ) {
			var me = this;
			setTimeout(function() {
				switch ( mode) {
					case 'canvas':
						createCanvas( options );
					break;
					case 'dom':
						me.container = createDom( options );
						me.container.style.position = 'relative';
						me.container.style.overflow = 'hidden';
					break;
				}
			}, me.delayTime);
			return this;
		},
		width: function ( width ) {
			var me = this;
			if( typeof width === 'undefined' ) {
				return options.width;
			}else{
				setTimeout(function() {
					options.width = width;
					switch( options.mode ) {
						case 'canvas':
						break;
						case 'dom':
							me.container.style.width = width + 'px';
						break;
					}
				}, me.delayTime );
				return this;
			}
		},
		height: function ( height ) {
			var me = this;
			if( typeof height === 'undefined' ) {
				return options.height;
			}else{
				setTimeout(function() {
					options.height = height;
					switch( options.mode ) {
						case 'canvas':
						break;
						case 'dom':
							me.container.style.height = height + 'px';
						break;
					}
				}, me.delayTime );
				return this;
			}		
		},

		// 按照 zIndex 索引
		add: function ( layer ) {
			var me = this;
			setTimeout(function() {
				if ( !layerList[ 'zIndex' + layer.zIndex() ] ) {
					layerList[ 'zIndex' + layer.zIndex() ] = [];
				}
				if ( options.mode === 'dom' ) {
					layer.container.style.position = 'relative';
					layer.container.style.top = layer.position().x;
					layer.container.style.left = layer.position().y;
					layer.container.style.overflow = 'hidden';
					me.container.appendChild( layer.container );
				}
				layerList[ 'zIndex' + layer.zIndex() ].push( layer );
			}, me.delayTime);
			return this;
		},
		remove: function ( layer ) {
			setTimeout(function() {
				delFromListById( layer.id, layerList[ 'zIndex' + layer.zIndex() ] );
				if( options.mode === 'dom' ) {
					this.container.removeChild( layer.container );
				}
			}, me.delayTime);
			return this;
		},
		delay: function ( delayTime ) {
			setTimeout(function(){
				this.delayTime += delayTime;
			}, this.delayTime);
			return this;
		},
		clearDelay: function() {
			this.delayTime = 0;
			return this;
		}
	};
	/*******************************************
	*    图层管理
	********************************************/
	SA.Layer = function( opts ) {
		var thisWidth;
		var thisHeight;
		var thisX;
		var thisY;
		var thisZIndex;
		var allDelayTime;

		function Layer( opts ) {
			this.id = createId();
			opts = opts || {};
			thisWidth = opts.width || options.width;
			thisHeight = opts.height || options.height;
			thisX = opts.x || 0;
			thisY = opts.y || 0;
			thisZIndex = opts.zIndex || 0;
			this.spriteList = {};
			allDelayTime = 0;
			switch( options.mode ) {
				case 'canvas':
					this.container = null;
				break;
				case 'dom':
					this.container = createDom({
						width: thisWidth,
						height: thisHeight,
						x: thisX,
						y: thisY
					});
				break;
			}
		}

		Layer.prototype = {
			zIndex: function( zIndex ) {
				var me = this;
				if ( arguments.length === 0 ) {
					return thisZIndex;
				} else {
					setTimeout(function() {
						thisZIndex = zIndex;
					}, allDelayTime );
					return me;
				}
			},
			// 按照 zIndex 索引
			add: function ( sprite ) {
				var me = this;
				setTimeout(function() {
					if ( !me.spriteList[ 'zIndex' + sprite.zIndex() ] ) {
						me.spriteList[ 'zIndex' + sprite.zIndex() ] = [];
					}
					if ( options.mode === 'dom' ) {
						sprite.container.style.background = 'url(' + loadImagesList[ sprite.id ].src + ') no-repeat 0px 0px';
						sprite.container.style.position = 'absolute';
						sprite.container.style.overflow = 'hidden';
						me.container.appendChild( sprite.container );
					}
					me.spriteList[ 'zIndex' + sprite.zIndex() ].push( sprite );
				}, allDelayTime );
				return this;
			},
			remove: function ( sprite ) {
				var me = this;
				setTimeout(function() {
					delFromListById( sprite.id, me.spriteList[ 'zIndex' + sprite.zIndex() ] );
					if( options.mode === 'dom' ) {
						me.container.removeChild( sprite.container );
					}
				}, allDelayTime );
				return this;
			},
			delay: function ( delayTime ) {
				setTimeout(function() {
					allDelayTime += delayTime;
				}, allDelayTime );
				return this;
			},
			clearDelay: function() {
				allDelayTime = 0;
				return this;
			},
			loop: function ( fun, FPS ) {
				var me = this;
				var t;
				setTimeout(function(){
					t = setInterval(fun.apply(me), 1000/FPS );
				}, allDelayTime );
				return t;
			},
			move: function( x, y, delayTime ) {

				return this;
			},
			//传入 action ，想停止的动作
			pause: function( action ) {
				if( action ){

				} else {

				}
			},
			play: function( action ) {

			},
			width: function ( width ) {
				var me = this;
				if( typeof width === 'undefined' ) {
					return thisWidth;
				}else{
					setTimeout(function() {
						thisWidth = width;
						switch( options.mode ) {
							case 'canvas':
							break;
							case 'dom':
								me.container.style.width = width + 'px';
							break;
						}
					}, allDelayTime );
					return this;
				}
			},
			height: function ( height ) {
				var me = this;
				if( typeof height === 'undefined' ) {
					return thisHeight;
				}else{
					setTimeout(function() {
						thisHeight = height;
						switch( options.mode ) {
							case 'canvas':
							break;
							case 'dom':
								me.container.style.height = height + 'px';
							break;
						}
					}, allDelayTime );
					return this;
				}		
			},
			position: function( opts ) {
				if( opts ) {
					var me = this;
					setTimeout(function(){
						thisX = opts.x || thisX;
						thisY = opts.y || thisY;
						if( options.mode === 'dom' ) {
							me.container.style.top = thisY;
							me.container.style.left = thisX;
							//TODO: 提出所有 css 方法，方便以后替换。
						}
					}, allDelayTime );
					return this;
				} else {
					return { x: thisX, y: thisY };
				}
			},
			destory: function() {

			}
		};

		return new Layer( opts );
	};

	/*******************************************
	*    元素管理
	********************************************/
	SA.Sprite = function ( imgId, opts ) {
		
		//目标位置
		var destinationX;
		var destinationY;
		var moveSpeedX;
		var moveSpeedY;
		var thisWidth;
		var thisHeight;
		var thisX;
		var thisY;
		var thisZIndex;
		var allDelayTime;

		function Sprite( imgId, opts ) {
			this.id = imgId;
			opts = opts || {};
			thisX = opts.x || 0;
			thisY = opts.y || 0;
			thisWidth = opts.width || loadImagesList[imgId].width;
			thisHeight = opts.height || loadImagesList[imgId].height;
			thisZIndex = opts.zIndex || 0;
			allDelayTime = 0;
			switch( options.mode ) {
				case 'canvas':
					this.container = null;
				break;
				case 'dom':
					this.container = createDom({
						width: thisWidth,
						height: thisHeight,
						x: thisX,
						y: thisY
					});
				break;
			}
		}

		Sprite.prototype = {
			zIndex: function( zIndex ) {
				var me = this;
				if ( arguments.length === 0 ) {
					return thisZIndex;
				} else {
					setTimeout(function() {
						thisZIndex = zIndex;
					}, allDelayTime );
					return this;
				}
			},
			width: function ( width ) {
				var me = this;
				if( typeof width === 'undefined' ) {
					return thisWidth;
				}else{
					setTimeout(function() {
						thisWidth = width;
						switch( options.mode ) {
							case 'canvas':
							break;
							case 'dom':
								me.container.style.width = width + 'px';
							break;
						}
					}, allDelayTime );
					return this;
				}
			},
			height: function ( height ) {
				var me = this;
				if( typeof height === 'undefined' ) {
					return thisHeight;
				}else{
					setTimeout(function() {
						thisHeight = height;
						switch( options.mode ) {
							case 'canvas':
							break;
							case 'dom':
								me.container.style.height = height + 'px';
							break;
						}
					}, allDelayTime );
					return this;
				}		
			},
			
			//speed 定义为每次刷新的步长
			move: function( x, y, speedX, speedY ) {
				var me = this;
				
				//此时内部调用
				if( arguments.length === 0 ) {
					//修正x
					if( Math.abs( destinationX - thisX ) < moveSpeedX ){
						thisX = destinationX;
					} else if( thisX < destinationX ) {
						thisX += moveSpeedX;
					} else if( thisX > destinationX ) {
						thisX -= moveSpeedX;
					}

					//修正y
					if( Math.abs( destinationY - thisY ) < moveSpeedY ){
						thisY = destinationY;
					} else if( thisY < destinationY ) {
						thisY += moveSpeedY;
					} else if( thisY > destinationY ) {
						thisY -= moveSpeedY;
					}
					if( options.mode === 'dom' ){
						me.container.style.left = thisX + 'px';
						me.container.style.top = thisY + 'px';
					}

				} else {

					//外部调用
					setTimeout(function() {
						if( !speedY ) {
							speedY = speedX;
						}
						switch( options.mode ) {
							case 'canvas':
							break;
							case 'dom':
								destinationX = x;
								destinationY = y;
								moveSpeedX = Math.abs( speedX );
								moveSpeedY = Math.abs( speedY );
							break;
						}
						animationList.push({
							id: createId(),
							element: me,
							fun: 'move'
						});

					}, allDelayTime );
				}

				return this;
			},
			//传入 action ，想停止的动作
			pause: function( action ) {
				if( action ){

				} else {

				}
			},
			position: function() {

			},
			play: function( action ) {

			},
			delay: function( delayTime ) {
				setTimeout(function(){
					this.delayTime += delayTime;
				}, allDelayTime );
				return this;
			},
			loop: function ( fun, FPS ) {
				var me = this;
				var t = setInterval(fun.apply(me), 1000/FPS );
				return t;
			},
			destory: function(){
				for( var i in this ) {
					this[ i ] = null;
				}
				this.destory = true;
				return this;
			}
		};

		return new Sprite( imgId, opts );
	};
	/*******************************************
	*    框架析构
	********************************************/
	SA.destory = function() {

	};

	/*******************************************
	*    框架自身逻辑
	********************************************/
	options.onstart();
	SA.Stage.create( options.mode );
	loadImagesList = SA.loadImage( options.imagesList, options.onready );

	return SA;
}

