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

	/*******************************************
	*    基本方法
	********************************************/
	
	(function createCanvas( container , options ) {
		if( typeof container === 'string' ) {
			container = document.getElementById( container );
		} else if( typeof container === 'object' ) {

			//判断是否是 jquery 对象
			if( container[0] ) {
				container = container[0];
			}
		}
		var canvas = document.createElement('canvas');
		canvas.setAttribute('width', options.width );
		canvas.setAttribute('height', options.height );
		container.appendChild(canvas);
	})( options.container, options );

	SA.timer = function() {
		setInterval( function() {
			// drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
			
		}, 1000/options.setInterval ); 

		return {
			start: function () {

			},
			pause: function () {
				
			}
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
		this.id = options.id || ( 'wangxiao' + new Date().getTime() ),
		this.x = options.x || 0,
		this.y = options.y || 0,
		this.width = options.width ,
		this.height = options.height ,
		this.zIndex = options.zIndex || 0
	}

	Layer.prototype = {
		zIndex: function( zIndex ) {
			if ( typeof zIndex === 'undefined' ) {
				return this.zIndex;
			} else {
				this.zIndex = zIndex;
			}
		},
		add: function( sprite ) {

		},
		remove: function( sprite ) {

		},
		move: function( x, y, delayTime ) {

		},
		delay: function ( delayTime ) {

		}
	};

	SA.Layer = function( options ) {
		return new Layer( options );
	};

	/*******************************************
	*    元素管理
	********************************************/
	function Sprite( img, options ) {
		this.id = options.id || img.id || ( 'wangxiao' + new Date().getTime() ),
		this.x = options.x || 0,
		this.y = options.y || 0,
		this.width = options.width || img.width,
		this.height = options.height || img.height,
		this.zIndex = options.zIndex || 0
	}

	Sprite.prototype = {
		zIndex: function( zIndex ) {
			if ( typeof zIndex === 'undefined' ) {
				return this.zIndex;
			} else {
				this.zIndex = zIndex;
			}
		},
		move: function( x, y, delayTime ) {
			
		},
		delay: function( delayTime ) {

		},

		loop: function( fun, loop ) {
			
		}
	};

	SA.Sprite = function ( options ) {
		return new Sprite( options );
	};

	/*******************************************
	*    舞台方法
	********************************************/
	SA.Stage = {

		// 按照 zIndex 索引
		add: function ( layer ) {
			if ( !layerList[ 'zIndex' + layer.zIndex ] ) {
				layerList[ 'zIndex' + layer.zIndex ] = [];
			}
			layerList[ 'zIndex' + layer.zIndex ].push( layer );
		},
		remove: function ( layer ) {
			layerList[ 'zIndex' + layer.zIndex ].forEach(function ( value , index ) {
				if ( value.id === layer.id ) {
					layerList[ 'zIndex' + layer.zIndex ].splice( index, 1 );
				}
			});
		},
		delay: function ( delayTime ) {

		}
	}

	/*******************************************
	*    框架自身逻辑
	********************************************/

	options.onstart();
	SA.loadImage( options.imagesList, options.onready );

	return SA;
}

