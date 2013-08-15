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
	},
	width: 1500,
	height: 800
});

function main() {
	var stage = sa.Stage;
	var bgLayer = sa.Layer();
	window.bgSprite = sa.Sprite('background');
	stage.add( bgLayer );
	bgLayer.add( bgSprite ).remove(bgSprite);
}



