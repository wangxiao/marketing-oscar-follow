function simpleAnimation( options ) {

	/*******************************************
	*    全部参数
	*******************************************/
	options = {

		//容器，可以是id，element 或者 jquery选择的元素，但是只会取出第一个
		container: options.container || document.body,

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

	//全局唯一的舞台，只能被生成一次
	var Stage;

	//全部图层，按照 zIndex 索引
	var layerList = {};

	//加载的图片资源对象
	var loadImagesList = {};

	//数组
	//存储全局计时器
	var timer;
	//所有计时器的队列
	var timerList = [];

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

	function changeStyle( element, name, value ) {
		element.style[ name ] = value;
	}

	function createCanvas( opts ) {
		opts = opts || {};
		opts = {
			width: opts.width || 0,
			height: opts.height || 0,
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
		opts = {
			width: opts.width || 0,
			height: opts.height || 0,
			x: opts.x || 0,
			y: opts.y || 0,
			container: opts.container || null 
		};
		var element = document.createElement('div');
		changeStyle( element, 'width', opts.width + 'px' );
		changeStyle( element, 'height', opts.height + 'px' );
		changeStyle( element, 'top', opts.y + 'px' );
		changeStyle( element, 'left', opts.x + 'px' );

		if( opts.container ) {
			opts.container = getElement( opts.container );
			opts.container.appendChild(element);
		}
		return element;
	}

	function delFromListById( id, list ) {
		for( var i = 0 , l = list.length ; i < l ; i += 1 ) {
			if( list[i].id === id ) {
				list.splice( i, 1 );
			}
		}
		return list;
	}

	function pauseAnimationById( id, list ) {
		for( var i = 0 , l = list.length ; i < l ; i += 1 ) {
			if( list[i].id === id ) {
				list[i].isPause = true;
			}
		}
		return list;
	}

	function playAnimationById( id, list ) {
		for( var i = 0 , l = list.length ; i < l ; i += 1 ) {
			if( list[i].id === id ) {
				list[i].isPause = false;
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
			timer = setInterval( function() {
				// TODO: 绘制一切
				// drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
				animationList.forEach(function( value, index ){
					if( !value.isPause ) {
						value.element[ value.fun ]();
					}
				});

			}, 1000/options.FPS );
		},
		pause: function () {
			clearInterval(timer);
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
	SA.Stage = function( opts ) {
		
		//舞台只能被生成一次
		if ( Stage ) {
			return Stage;
		}

		var allDelayTime = 0;
		opts = {

			//canvas默认宽、高
			width: opts.width || 300,
			height: opts.height || 150,
			x: opts.x || 0,
			y: opts.y || 0,
			container: getElement( options.container )
		};

		Stage = {
			id: 'wangxiao',
			container: opts.container,
			width: function ( width ) {
				var me = this;
				if( typeof width === 'undefined' ) {
					return opts.width;
				}else{
					setTimeout(function() {
						opts.width = width;
						switch( options.mode ) {
							case 'canvas':
							break;
							case 'dom':
								changeStyle( me.container, 'width', width + 'px');
							break;
						}
					}, allDelayTime );
					return this;
				}
			},
			height: function ( height ) {
				var me = this;
				if( typeof height === 'undefined' ) {
					return opts.height;
				}else{
					setTimeout(function() {
						opts.height = height;
						switch( options.mode ) {
							case 'canvas':
							break;
							case 'dom':
								changeStyle( me.container, 'height', height + 'px' );
							break;
						}
					}, allDelayTime );
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
						changeStyle( layer.container, 'position', 'relative' );
						changeStyle( layer.container, 'left', layer.position().x + 'px' );
						changeStyle( layer.container, 'top', layer.position().y + 'px' );
						changeStyle( layer.container, 'overflow', 'hidden' );
						me.container.appendChild( layer.container );
					}
					layerList[ 'zIndex' + layer.zIndex() ].push( layer );
				}, allDelayTime );
				return this;
			},
			remove: function ( layer ) {
				setTimeout(function() {
					delFromListById( layer.id, layerList[ 'zIndex' + layer.zIndex() ] );
					if( options.mode === 'dom' ) {
						this.container.removeChild( layer.container );
					}
				}, allDelayTime );
				return this;
			},
			delay: function ( delayTime ) {
				allDelayTime += delayTime;
				return this;
			},
			clearDelay: function() {
				allDelayTime = 0;
				return this;
			}
		};

		var createStage = function( mode ) {
			switch ( mode) {
				case 'canvas':
					createCanvas( opts );
				break;
				case 'dom':
					Stage.container = createDom( opts );
					changeStyle( Stage.container, 'position', 'relative');
					changeStyle( Stage.container, 'overflow', 'hidden');
				break;
			}
		};

		createStage( options.mode );
		Stage.play = SA.Timer.play;
		Stage.pause = SA.Timer.pause;
		return Stage;
	};
	/*******************************************
	*    图层管理
	********************************************/
	SA.Layer = function( opts ) {
		//目标位置
		var destinationX;
		var destinationY;
		//移动速度
		var moveSpeedX;
		var moveSpeedY;
		//当前的宽和高
		var thisWidth;
		var thisHeight;
		//当前的位置
		var thisX;
		var thisY;
		//当前的 z-index
		var thisZIndex;
		//当前的延时动画时间
		var allDelayTime;
		//该sprite本身的动画队列
		var spriteAnimationList;
		//添加在该 sprite 上面的 sprite 队列
		var spriteList;

		function Layer( opts ) {
			this.id = createId();
			opts = opts || {};
			thisWidth = opts.width || Stage.width() ;
			thisHeight = opts.height || Stage.height();
			thisX = opts.x || 0;
			thisY = opts.y || 0;
			thisZIndex = opts.zIndex || 0;
			spriteList = {};
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
			// 按照 zIndex 索引
			add: function ( sprite ) {
				var me = this;
				setTimeout(function() {
					if ( !spriteList[ 'zIndex' + sprite.zIndex() ] ) {
						spriteList[ 'zIndex' + sprite.zIndex() ] = [];
					}
					if ( options.mode === 'dom' ) {
						changeStyle( sprite.container, 'background', 'url(' + loadImagesList[ sprite.id ].src + ') no-repeat 0px 0px' );
						changeStyle( sprite.container, 'position', 'absolute' );
						changeStyle( sprite.container, 'overflow', 'hidden' );
						me.container.appendChild( sprite.container );
					}
					spriteList[ 'zIndex' + sprite.zIndex() ].push( sprite );
				}, allDelayTime );
				return this;
			},
			remove: function ( sprite ) {
				var me = this;
				setTimeout(function() {
					delFromListById( sprite.id, spriteList[ 'zIndex' + sprite.zIndex() ] );
					if( options.mode === 'dom' ) {
						me.container.removeChild( sprite.container );
					}
				}, allDelayTime );
				return this;
			},
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
								changeStyle( me.container, 'width', width + 'px' );
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
								changeStyle( me.container, 'height', height + 'px' );
							break;
						}
					}, allDelayTime );
					return this;
				}		
			},
			position: function( opts ) {
				if( arguments.length === 0 ) {
					return { x: thisX, y: thisY };
				} else {
					var me = this;
					setTimeout(function(){
						thisX = opts.x || thisX;
						thisY = opts.y || thisY;
						if( options.mode === 'dom' ) {
							changeStyle( me.container, 'top', thisY + 'px' );
							changeStyle( me.container, 'left', thisX + 'px' );
						}
					}, allDelayTime );
					return this;
				}
			},
			move: function( xLength, yLength, speedX, speedY ) {
				var me = this;
				setTimeout(function() {
					me.moveTo( thisX + xLength, thisY + yLength, speedX, speedY );
				}, allDelayTime );
				return this;
			},
			//speed 定义为每次刷新的步长
			moveTo: function( x, y, speedX, speedY ) {
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
						changeStyle( me.container, 'left', thisX + 'px');
						changeStyle( me.container, 'top', thisY + 'px');
					}

					//move动作结束
					if( (thisX === destinationX) && (thisY === destinationY) ) {
						
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
						var animationObject = {
							id: createId(),
							element: me,
							//标示动作
							fun: 'moveTo',
							//标示动画状态
							isPause: false
						};

						//存储当前动画信息到全局
						animationList.push( animationObject );

						//类中的动画信息记录
						// spriteAnimationList.push( animationObject );

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
			play: function( action ) {

			},
			delay: function( delayTime ) {
				allDelayTime += delayTime;
				return this;
			},
			clearDelay: function() {
				allDelayTime = 0;
				return this;
			},
			interval: function ( fun, FPS ) {
				var me = this;
				var t = setInterval(fun.apply(me), 1000/FPS );
				return t;
			},
			timeout: function ( fun, delayTime ) {

			},
			destory: function(){
				for( var i in this ) {
					this[ i ] = null;
				}
				this.destory = true;
				return this;
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
		//移动速度
		var moveSpeedX;
		var moveSpeedY;
		//当前的宽和高
		var thisWidth;
		var thisHeight;
		//当前的位置
		var thisX;
		var thisY;
		//当前的 z-index
		var thisZIndex;
		//当前的延时动画时间
		var allDelayTime;
		//该sprite本身的动画队列，根据动画名称做索引
		var animationIdList;
		//添加在该 sprite 上面的 sprite 队列
		var spriteList;

		function Sprite( imgId, opts ) {
			this.id = imgId;
			opts = opts || {};
			thisX = opts.x || 0;
			thisY = opts.y || 0;
			thisWidth = opts.width || loadImagesList[imgId].width;
			thisHeight = opts.height || loadImagesList[imgId].height;
			thisZIndex = opts.zIndex || 0;
			allDelayTime = 0;
			spriteList = {};
			animationIdList = {};
			spriteAnimationList = [];
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
			// 按照 zIndex 索引
			add: function ( sprite ) {
				var me = this;
				setTimeout(function() {
					if ( !spriteList[ 'zIndex' + sprite.zIndex() ] ) {
						spriteList[ 'zIndex' + sprite.zIndex() ] = [];
					}
					if ( options.mode === 'dom' ) {
						changeStyle( sprite.container, 'background', 'url(' + loadImagesList[ sprite.id ].src + ') no-repeat 0px 0px' );
						changeStyle( sprite.container, 'position', 'absolute' );
						changeStyle( sprite.container, 'overflow', 'hidden' );
						me.container.appendChild( sprite.container );
					}
					spriteList[ 'zIndex' + sprite.zIndex() ].push( sprite );
				}, allDelayTime );
				return this;
			},
			remove: function ( sprite ) {
				var me = this;
				setTimeout(function() {
					delFromListById( sprite.id, spriteList[ 'zIndex' + sprite.zIndex() ] );
					if( options.mode === 'dom' ) {
						me.container.removeChild( sprite.container );
					}
				}, allDelayTime );
				return this;
			},
			zIndex: function( zIndex ) {
				var me = this;
				if ( arguments.length === 0 ) {
					return thisZIndex;
				} else {
					setTimeout(function() {
						thisZIndex = zIndex;
						if( options.mode === 'dom' ) {
							me.container.style['z-index'] = zIndex;
						}
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
								changeStyle( me.container, 'width', width + 'px' );
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
								changeStyle( me.container, 'height', height + 'px' );
							break;
						}
					}, allDelayTime );
					return this;
				}		
			},
			position: function( opts ) {
				if( arguments.length === 0 ) {
					return { x: thisX, y: thisY };
				} else {
					var me = this;
					setTimeout(function(){
						thisX = opts.x || thisX;
						thisY = opts.y || thisY;
						if( options.mode === 'dom' ) {
							changeStyle( me.container, 'top', thisY + 'px' );
							changeStyle( me.container, 'left', thisX + 'px');
						}
					}, allDelayTime );
					return this;
				}
			},
			move: function( xLength, yLength, speedX, speedY, fun ) {
				var me = this;
				setTimeout(function() {
					me.moveTo( thisX + xLength, thisY + yLength, speedX, speedY );
				}, allDelayTime );
				return this;
			},
			//speed 定义为每次刷新的步长
			moveTo: function( x, y, speedX, speedY, fun ) {
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
						changeStyle( me.container, 'left', thisX + 'px');
						changeStyle( me.container, 'top', thisY + 'px');
					}
					//move动作结束
					if( (thisX === destinationX) && (thisY === destinationY) ) {
						if(animationIdList.moveTo.callback) {
							animationIdList.moveTo.callback();
						}
						delFromListById( animationIdList.moveTo.id, animationList );
						animationIdList.moveTo = null;
					}

				} else {

					if(arguments.length === 3) {
						speedY = speedX;
					}
					if(arguments.length === 4) {
						if( typeof speedY !== 'number' ) {
							fun = speedY;
						}
					}
					//外部调用
					setTimeout(function() {
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
						var animationObject = {
							id: createId(),
							element: me,
							//标示动作
							fun: 'moveTo',
							//标示动画状态
							isPause: false
						};
						//存储当前动画信息到全局
						animationList.push( animationObject );
						//类中的动画信息记录
						animationIdList.moveTo = {
							id: animationObject.id,
							callback: fun
						};
					}, allDelayTime );
				}

				return this;
			},

			//传入 action ，想停止的动作
			pause: function( action ) {
				if( action ){
					if( action === 'move' ){
						action = 'moveTo';
					}
					if(animationIdList[action]) {
						var id = animationIdList[action].id;
						pauseAnimationById( id, animationList );
					}
				} else {
					for( var i in animationIdList ) {
						pauseAnimationById( animationIdList[i].id, animationList );
					}
				}
				return this;
			},
			play: function( action ) {
				if( action ){
					if( action === 'move' ){
						action = 'moveTo';
					}
					if(animationIdList[action]) {
						var id = animationIdList[action].id;
						playAnimationById( id, animationList );
					}
				} else {
					for( var i in animationIdList ) {
						playAnimationById( animationIdList[i].id, animationList );
					}
				}
				return this;
			},
			delay: function( delayTime ) {
				allDelayTime += delayTime;
				return this;
			},
			clearDelay: function() {
				allDelayTime = 0;
				return this;
			},
			do: function ( fun ) {
				if( fun ) {
					var me = this;
					setTimeout(function(){
						fun.apply(me);	
					}, allDelayTime );
				}
				return this;
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
		//TODO:调用所有的 destory

	};

	/*******************************************
	*    框架自身逻辑
	********************************************/
	options.onstart();
	loadImagesList = SA.loadImage( options.imagesList, options.onready );

	return SA;
}

