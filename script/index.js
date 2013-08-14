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

simpleAnimation({
	mode: 'dom',
	imagesList: IMAGE_LIST,
	onstart: function() {
		console.log('starting');
	},
	onready: function() {
		console.log('ready');
	}
});