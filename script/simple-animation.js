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
	SA.layerList = {};

	//存储计时器
	var timer;

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

	function createCanvas( container , options ) {
		var canvas = document.createElement('canvas');
		canvas.setAttribute('width', options.width );
		canvas.setAttribute('height', options.height );
		container = getElement( container );
		container.appendChild(canvas);
		return canvas;
	}
	
	function createDom( container , options ) {
		var element = document.createElement('div');
		element.style.width = options.width + 'px';
		element.style.height = options.height + 'px';
		container = getElement( container );
		container.appendChild(element);
		return element;
	}

	SA.Timer = {
		start: function () {
			timer = setInterval( function() {
				// drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
				// TODO: 绘制一切
				
			}, 1000/options.setInterval ); 
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
				if ( typeof callback === "function" ) {
					callback.apply( this, arguments );
				}
			}
		}
		return images;
	};

	/*******************************************
	*    图层管理
	********************************************/
	function Layer( options ) {
		this.container = null;
		this.id = options.id || ( 'wangxiao' + new Date().getTime() );
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.width = options.width;
		this.height = options.height;
		this.zIndex = options.zIndex || 0;
		this.spriteList = {};
		this.delayTime = 0;
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
				if ( !spriteList[ 'zIndex' + sprite.zIndex ] ) {
					spriteList[ 'zIndex' + sprite.zIndex ] = [];
				}
				spriteList[ 'zIndex' + sprite.zIndex ].push( sprite );
			}, me.delayTime);
			return this;
		},
		remove: function ( sprite ) {
			var me = this;
			setTimeout(function() {
				spriteList[ 'zIndex' + sprite.zIndex ].forEach(function ( value , index ) {
					if ( value.id === sprite.id ) {
						spriteList[ 'zIndex' + sprite.zIndex ].splice( index, 1 );
					}
				});
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
	};

	SA.Layer = function( options ) {
		return new Layer( options );
	};

	/*******************************************
	*    元素管理
	********************************************/
	function Sprite( img, options ) {
		this.container = null;
		this.id = options.id || img.id || ( 'wangxiao' + new Date().getTime() );
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.width = options.width || img.width;
		this.height = options.height || img.height;
		this.zIndex = options.zIndex || 0;
		this.delayTime = 0;
	}

	Sprite.prototype = {
		zIndex: function( zIndex ) {
			var me = this;
			setTimeout(function() {
				if ( typeof zIndex === 'undefined' ) {
					return me.zIndex;
				} else {
					me.zIndex = zIndex;
				}
			}, me.delayTime);
		},
		move: function( x, y, delayTime ) {
			var me = this;
			setTimeout(function() {

			}, me.delayTime);		
		},
		delay: function( delayTime ) {
			this.delayTime += delayTime;
		},
		loop: function( fun, FPS ) {
			var me = this;
			setInterval(fun.apply(me), 1000/FPS );
		}
	};

	SA.Sprite = function ( options ) {
		return new Sprite( options );
	};

	/*******************************************
	*    舞台方法
	********************************************/
	var Stage = {
		container: getElement( options.container ),
		delayTime: 0,
		create: function( mode ) {
			switch ( mode) {
				case 'canvas':
					createCanvas( options.container, options );
				break;
				case 'dom':
					createDom( options.container, options );
				break;
			}
		},
		// 按照 zIndex 索引
		add: function ( layer ) {
			if ( !layerList[ 'zIndex' + layer.zIndex ] ) {
				layerList[ 'zIndex' + layer.zIndex ] = [];
			}
			if ( options.mode === 'dom' ) {
				layer.container = createDom( this.container, {
					width: layer.width,
					height: layer.height
				});
			}
			layerList[ 'zIndex' + layer.zIndex ].push( layer );
		},
		remove: function ( layer ) {
			layerList[ 'zIndex' + layer.zIndex ].forEach(function ( value , index ) {
				if ( value.id === layer.id ) {
					layerList[ 'zIndex' + layer.zIndex ].splice( index, 1 );
				}
			});
			if( options.mode === 'dom' ) {
				this.container.removeChild( layer.container );
			}
		},
		delay: function ( delayTime ) {
			this.delayTime += delayTime;
		},
		clearDelay: function() {
			this.delayTime = 0;
		}
	};

	SA.Stage = {
		create: function( mode ) {
			setTimeout(Stage.create.call( Stage, mode ), Stage.delayTime );
		},
		add: function( layer ) {
			setTimeout(Stage.add.call( Stage, layer ), Stage.delayTime );
		},
		remove: function( layer ) {
			setTimeout(Stage.remove.call( Stage, layer ), Stage.delayTime );
		},
		delay: function( delayTime ) {
			Stage.delay( delayTime );
		},
		clearDelay: function() {
			Stage.clearDelay();
		}
	};
	/*******************************************
	*    框架自身逻辑
	********************************************/

	options.onstart();
	SA.Stage.create( options.mode );
	SA.loadImage( options.imagesList, options.onready );

	return SA;
}

