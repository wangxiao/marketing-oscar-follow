var IMAGE_LIST=[ 
	{
		id : 'background',
		url : 'images/background.png'
	},
	{
		id: 'boat',
		url: 'images/boat.png'
	},
	{
		id: 'desk',
		url: 'images/desk.png'
	},
	{
		id: 'train',
		url: 'images/train.png'
	}
];

//初始化
var sa = simpleAnimation({
	mode: 'dom',
	imagesList: IMAGE_LIST,
	onstart: function() {
		console.log('loading');
	},
	onready: function() {
		console.log('onready');
		main();
	}
});

function main() {
	var winWidth = $(document).width();
	var stage = sa.Stage({width: winWidth});
	var bgSprite = sa.Sprite( 'background' );
	stage.height( bgSprite.height() );
	var bgLayer = sa.Layer().height( bgSprite.height() );
	bgLayer.add( bgSprite );
	stage.add( bgLayer );
	bgSprite.delay( 2000 ).moveTo( -(bgSprite.width() - winWidth ), 0, 3);
	sa.play();
	window.bgSprite = bgSprite;
}
