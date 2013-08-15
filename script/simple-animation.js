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

	//将会暴露出去的对象，上面绑定方法。
	var SA = {};

	//全部图层，按照 zIndex 索引
	var layerList = {};

	//存储全局计时器
	var timer;

	//加载的图片资源对象
	var loadImagesList = {};

	/*******************************************
	*    基本方法
	********************************************/
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
			height: options.height || 0,
			container: opts.container || null 
		};
		var element = document.createElement('div');
		element.style.width = opts.width + 'px';
		element.style.height = opts.height + 'px';
		if( opts.container ) {
			opts.container = getElement( opts.container );
			opts.container.appendChild(element);
		}
		return element;
	}

	SA.Timer = {
		start: function () {
			timer = setInterval( function() {
				// drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
				// TODO: 绘制一切
				
			}, 1000/options.FPS ); 
		},
		pause: function () {
			clearInterval(timer);
		}
	};

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
				if ( !layerList[ 'zIndex' + layer.zIndex ] ) {
					layerList[ 'zIndex' + layer.zIndex ] = [];
				}
				if ( options.mode === 'dom' ) {
					layer.container.style.position = 'relative';
					layer.container.style.top = layer.y;
					layer.container.style.left = layer.x;
					layer.container.style.overflow = 'hidden';
					me.container.appendChild( layer.container );
				}
				layerList[ 'zIndex' + layer.zIndex ].push( layer );
			}, me.delayTime);
			return this;
		},
		remove: function ( layer ) {
			setTimeout(function() {
				layerList[ 'zIndex' + layer.zIndex ].forEach(function ( value , index ) {
					if ( value.id === layer.id ) {
						layerList[ 'zIndex' + layer.zIndex ].splice( index, 1 );
					}
				});
				if( options.mode === 'dom' ) {
					this.container.removeChild( layer.container );
				}
			}, me.delayTime);
			return this;
		},
		delay: function ( delayTime ) {
			this.delayTime += delayTime;
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
	function Layer( opts ) {
		this.id = 'wangxiao' + new Date().getTime();
		opts = opts || {};
		this.width = opts.width || options.width;
		this.height = opts.height || options.height;
		this.x = opts.x || 0;
		this.y = opts.y || 0;
		this.zIndex = opts.zIndex || 0;
		this.spriteList = {};
		this.delayTime = 0;
		switch( options.mode ) {
			case 'canvas':
				this.container = null;
			break;
			case 'dom':
				this.container = createDom({
					width: this.width,
					height: this.height
				});
			break;
		}
	}

	Layer.prototype = {
		zIndex: function( zIndex ) {
			var me = this;
			if ( typeof zIndex === 'undefined' ) {
				return me.zIndex;
			} else {
				setTimeout(function() {
					me.zIndex = zIndex;
				}, me.delayTime);
				return me;
			}
		},
		// 按照 zIndex 索引
		add: function ( sprite ) {
			var me = this;
			setTimeout(function() {
				if ( !me.spriteList[ 'zIndex' + sprite.zIndex ] ) {
					me.spriteList[ 'zIndex' + sprite.zIndex ] = [];
				}
				if ( options.mode === 'dom' ) {
					sprite.container.style.background = 'url(' + sprite.img.src + ') no-repeat 0px 0px';
					sprite.container.style.position = 'absolute';
					sprite.container.style.overflow = 'hidden';
					me.container.appendChild( sprite.container );
				}
				me.spriteList[ 'zIndex' + sprite.zIndex ].push( sprite );
			}, me.delayTime);
			return this;
		},
		remove: function ( sprite ) {
			var me = this;
			setTimeout(function() {
				me.spriteList[ 'zIndex' + sprite.zIndex ].forEach(function ( value , index ) {
					if ( value.id === sprite.id ) {
						me.spriteList[ 'zIndex' + sprite.zIndex ].splice( index, 1 );
					}
				});
				if( options.mode === 'dom' ) {
					me.container.removeChild( sprite.container );
				}
			}, me.delayTime);
			return this;
		},
		delay: function ( delayTime ) {
			this.delayTime += delayTime;
			return this;
		},
		clearDelay: function() {
			this.delayTime = 0;
			return this;
		},
		loop: function ( fun, FPS ) {
			var me = this;
			setInterval(fun.apply(me), 1000/FPS );
			return this;
		},
		move: function( x, y, delayTime ) {

			return this;
		},
		width: function ( width ) {
			var me = this;
			if( typeof width === 'undefined' ) {
				return me.width;
			}else{
				setTimeout(function() {
					me.width = width;
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
				return me.height;
			}else{
				setTimeout(function() {
					me.height = height;
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
		}
	};

	SA.Layer = function( opts ) {
		return new Layer( opts );
	};

	/*******************************************
	*    元素管理
	********************************************/
	SA.Sprite = function ( opts ) {

		function Sprite( imgId, opts ) {
			this.id = imgId;
			this.img = loadImagesList[ imgId ];
			opts = opts || {};
			this.x = opts.x || 0;
			this.y = opts.y || 0;
			this.width = opts.width || this.img.width;
			this.height = opts.height || this.img.height;
			this.zIndex = opts.zIndex || 0;
			this.delayTime = 0;
			switch( options.mode ) {
				case 'canvas':
					this.container = null;
				break;
				case 'dom':
					this.container = createDom({
						width: this.width,
						height: this.height
					});
				break;
			}
		}

		Sprite.prototype = {
			zIndex: function( zIndex ) {
				var me = this;
				if ( typeof zIndex === 'undefined' ) {
					return me.zIndex;
				} else {
					setTimeout(function() {
						me.zIndex = zIndex;
					}, me.delayTime);
					return this;
				}
			},
			//spead 定义为每次刷新的步长
			move: function( x, y, speed ) {
				var me = this;
				setTimeout(function() {
					switch( options.mode ) {
						case 'canvas':
						break;
						case 'dom':
							if( x > me.x ) {
								me.x += speed;
							} else if( x < me.x ) {
								me.x -= speed;
							}
						break;
					}
				}, me.delayTime);	
			},
			delay: function( delayTime ) {
				this.delayTime += delayTime;
			},
			loop: function( fun, FPS ) {
				var me = this;
				setInterval(fun.apply(me), 1000/FPS );
			},
			destory: function(){
				
			}
		};

		//目标位置
		var destinationX;
		var destinationY;
		
		return new Sprite( opts );
	};


	/*******************************************
	*    框架自身逻辑
	********************************************/
	options.onstart();
	SA.Stage.create( options.mode );
	loadImagesList = SA.loadImage( options.imagesList, options.onready );

	return SA;
}

