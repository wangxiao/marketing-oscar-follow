var IMAGE_LIST=[ 
	{
		id : "map",
		url : "images/baidu.gif"
	},
	{
		id:"bg",
		url:"images/bg.gif"
	}
];

function simpleAnimation( options ) {

	options = {

		//加载图片的资源，每个值中有 id 和 图片的 url ， 如： 
		// var IMAGE_LIST=[{
		//     id : "map",
		//     url : "images/baidu.gif"
		// }];
		imagesList: options.imagesList || [],

		//资源加载之前要做
		onloading: options.onstart,

		//资源加载完成
		onready: options.onready
	};

	//将会暴露出去的对象，上面绑定方法。
	var SA = {};

	/*******************************************
	*    基本方法
	********************************************/
	
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

	options.onstart();
	SA.loadImage( options.imagesList, options.onready );
	return SA;
}

