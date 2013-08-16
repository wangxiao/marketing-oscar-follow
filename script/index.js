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
var winWidth = $(document).width();
var sa = simpleAnimation({
	mode: 'dom',
	imagesList: IMAGE_LIST,
	onstart: function() {
		console.log('loading');
	},
	onready: function() {
		console.log('onready');
		main();
	},
	width: winWidth
});

function main() {
	var stage = sa.Stage;
	var bgSprite = sa.Sprite( 'background' );
	stage.height( bgSprite.height() );
	var bgLayer = sa.Layer().height( bgSprite.height() );
	bgLayer.add( bgSprite );
	stage.add( bgLayer );
	bgSprite.delay( 2000 ).moveTo( -(bgSprite.width() - winWidth ), 0, 3);
	sa.play();
	window.bgSprite = bgSprite;
}
