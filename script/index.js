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
	},

	{
		id: 'player1',
		url: 'images/player/player1.png'
	},
	{
		id: 'player2',
		url: 'images/player/player2.png'
	},
	{
		id: 'player3',
		url: 'images/player/player3.png'
	},

	{
		id: 'brother-happy1',
		url: 'images/brother/brother-happy1.png'
	},
	{
		id: 'brother-happy2',
		url: 'images/brother/brother-happy2.png'
	},
	{
		id: 'brother-happy3',
		url: 'images/brother/brother-happy3.png'
	},
	{
		id: 'brother-kiss1',
		url: 'images/brother/brother-kiss1.png'
	},
	{
		id: 'brother-kiss2',
		url: 'images/brother/brother-kiss2.png'
	},

	{
		id: 'car-blue',
		url: 'images/car/car-blue.png'
	},
	{
		id: 'car-red',
		url: 'images/car/car-red.png'
	},
	{
		id: 'car-yellow',
		url: 'images/car/car-yellow.png'
	},

	{
		id: 'cat1',
		url: 'images/cat/cat1.png'
	},
	{
		id: 'cat2',
		url: 'images/cat/cat2.png'
	},
	{
		id: 'cat3',
		url: 'images/cat/cat3.png'
	},
	{
		id: 'cat4',
		url: 'images/cat/cat4.png'
	},
	{
		id: 'cat5',
		url: 'images/cat/cat5.png'
	},

	{
		id: 'cloud-blue1',
		url: 'images/cloud/cloud-blue1.png'
	},
	{
		id: 'cloud-blue2',
		url: 'images/cloud/cloud-blue2.png'
	},
	{
		id: 'cloud-white1',
		url: 'images/cloud/cloud-white1.png'
	},
	{
		id: 'cloud-white2',
		url: 'images/cloud/cloud-white2.png'
	},
	{
		id: 'cloud-white2',
		url: 'images/cloud/cloud-white2.png'
	},

	{
		id: 'icon-3dots',
		url: 'images/icon/icon-3dots.png'
	},
	{
		id: 'icon-fire',
		url: 'images/icon/icon-fire.png'
	},
	{
		id: 'icon-heart',
		url: 'images/icon/icon-heart.png'
	},
	{
		id: 'icon-music',
		url: 'images/icon/icon-music.png'
	},
	{
		id: 'icon-plane',
		url: 'images/icon/icon-plane.png'
	},
	{
		id: 'icon-round',
		url: 'images/icon/icon-round.png'
	},
	{
		id: 'icon-star',
		url: 'images/icon/icon-star.png'
	},

	{
		id: 'mouse1',
		url: 'images/mouse/mouse1.png'
	},
	{
		id: 'mouse2',
		url: 'images/mouse/mouse2.png'
	},

	{
		id: 'people-anger1',
		url: 'images/people/people-anger1.png'
	},
	{
		id: 'people-anger2',
		url: 'images/people/people-anger2.png'
	},
	{
		id: 'people-anger3',
		url: 'images/people/people-anger3.png'
	},

	{
		id: 'people-boy1',
		url: 'images/people/people-boy1.png'
	},
	{
		id: 'people-boy2',
		url: 'images/people/people-boy2.png'
	},
	{
		id: 'people-boy3',
		url: 'images/people/people-boy3.png'
	},
	{
		id: 'people-man1',
		url: 'images/people/people-man1.png'
	},
	{
		id: 'people-man2',
		url: 'images/people/people-man2.png'
	},	
	{
		id: 'people-man3',
		url: 'images/people/people-man3.png'
	},	
	{
		id: 'people-man4',
		url: 'images/people/people-man4.png'
	},	
	{
		id: 'people-man5',
		url: 'images/people/people-man5.png'
	},	
	{
		id: 'people-old',
		url: 'images/people/people-old.png'
	},

	{
		id: 'people-woman1',
		url: 'images/people/people-woman1.png'
	},
	{
		id: 'people-woman2',
		url: 'images/people/people-woman2.png'
	},
	{
		id: 'people-woman3',
		url: 'images/people/people-woman3.png'
	},
	{
		id: 'people-girl',
		url: 'images/people/people-girl.png'
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

function getImageUrlById( id ) {
	for( var i = 0, l = IMAGE_LIST.length; i < l; i += 1 ) {
		if( IMAGE_LIST[i].id === id ) {
			return IMAGE_LIST[i].url;
		}
	}
}

function changeFace( container, id ) {
	var url = getImageUrlById(id);
	$( container).css('background-image','url("'+ url +'")');
}

function intervalChangeFace( container, imagesIdList, interval) {
	var l = imagesIdList.length;
	var num = 0;
	setInterval(function(){
		num += 1;
		if( num > l ) {
			num = 1;
		}
		changeFace( container, imagesIdList[num -1]);
	}, interval);
}

function main() {
	var winWidth = $(document).width();

	var bgSprite = sa.Sprite( 'background' );
	var stage = sa.Stage({width: winWidth}).height( bgSprite.height() );

	var bgLayer = sa.Layer().height( bgSprite.height() );
	stage.add( bgLayer );

	var player = sa.Sprite( 'player2' ,{  x:650, y:410 } )
				.do(function(){
					intervalChangeFace( this.container, ['player1','player2','player3'], 100);
				});

	var train = sa.Sprite( 'train' ).position({x:1350,y:523});
	//地铁第二个场景元素
	var peopleOld = sa.Sprite('people-old').position({x:3700,y:320});
	var peopleWoman = sa.Sprite('people-woman1').position({x:3812,y:348});
	var peopleBoy1 = sa.Sprite('people-boy1').position({x:4000,y:336});
	var peopleBoy2 = sa.Sprite('people-boy2').position({x:4080,y:320});
	//地铁第三个场景元素
	var cat1 = sa.Sprite('cat1').position({x:6726,y:444});
	var peopleAnger = sa.Sprite('people-anger3').position({x:6780,y:321});
	var peopleBoy3 = sa.Sprite('people-boy3').position({x:6871,y:341});
	var peopleMan1 = sa.Sprite('people-man1').position({x:6950,y:335});
	var peopleGirl = sa.Sprite('people-girl').position({x:7035,y:364});
	var peopleMan3 = sa.Sprite('people-man3').position({x:7206,y:320});

	var iconFire = sa.Sprite('icon-fire').position({x:-20,y:-20});
	var iconRound = sa.Sprite('icon-round').position({x:-25,y:-20});
	var icon3dots = sa.Sprite('icon-3dots').position({x:50,y:-20});
	var iconHeart = sa.Sprite('icon-heart').position({x:50,y:-30});
	//地铁第四个场景元素
	var peopleMan5 = sa.Sprite('people-man5').position({x:11070,y:313});

	var boat = sa.Sprite('boat').position({x:8066,y:408});

	bgSprite.add( peopleOld )
			.add( peopleWoman )
			.add( peopleBoy1 )
			.add( peopleBoy2 )
			.add( cat1 )
			.add( peopleAnger )
			.add( peopleBoy3 )
			.add( peopleMan1 )
			.add( peopleGirl)
			.add( peopleMan3 )
			.add( peopleMan5 )
			.add( boat );

	bgLayer.add( bgSprite )
			.add( player )
			.add( train );

	peopleAnger.do(function(){
			$(this.container).css('overflow','visible');
		});

	peopleBoy3.do(function(){
			$(this.container).css('overflow','visible');
		});

	peopleMan1.do(function(){
			$(this.container).css('overflow','visible');
		});

	peopleGirl.add( iconHeart )
		.do(function(){
			$(this.container).css('overflow','visible');
		});

	//动画开始
	sa.speed(1)
		.timeline({
			//豆子横着走
			2000: function() {
				bgSprite.moveTo(-480, 0, 6, function(){
						console.log(sa.time());
					});
				train.moveTo(873, 523, 6);
			},			
			//豆子向下走
			3400: function() {
				player.moveTo(650, 530, 6, function(){
						console.log(sa.time());
					});
			},
			//豆子走向火车
			3950: function() {
				bgSprite.moveTo(-1068, 0, 6, function(){
						console.log(sa.time());
					});
				train.moveTo(285, 523, 6);
			},
			5840: function() {
				bgSprite.moveTo(-3250, 0, 18, function(){
						console.log(sa.time());
					});
			},
			//第二个地铁站场景
			8960: function() {
				player.moveTo(650, 450, 2);
				peopleOld.moveTo(3700, 450, 2, function(){
							bgSprite.remove(peopleOld);
							console.log(sa.time());
						});
				peopleWoman.delay(2000)
						.moveTo(3812, 488, 4, function(){
							bgSprite.remove(peopleWoman);
							console.log(sa.time());
						});
				peopleBoy1.delay(1000)
						.moveTo(4000, 476, 4, function(){
							bgSprite.remove(peopleBoy1);
							console.log(sa.time());
						});
				peopleBoy2.delay(2500)
					.moveTo(4080, 460, 4, function(){
						bgSprite.remove(peopleBoy2);
						console.log(sa.time());
					});
			},
			12352: function() {
				bgSprite.moveTo(-6300, 0, 9, function(){
					console.log(sa.time());
				});
				train.moveTo(-1000, 523, 9, function(){
					bgLayer.remove(train);
				});
				player.moveTo(650, 543, 1);
			},
			//第三个地铁场景
			17792: function() {
				cat1.delay(2000)
					.do(function(){
						changeFace(this.container,'cat2');
					})
					.delay(1000)
					.do(function(){
						changeFace(this.container,'cat3');
						console.log(sa.time());
					});

				peopleAnger.delay(2000)
					.do(function(){
						changeFace(this.container,'people-anger1');
					})
					.add( iconFire )
					.delay(1000)
					.do(function(){
						changeFace(this.container,'people-anger2');
					});
				
				peopleBoy3.delay(2000)
					.add( iconRound );

				peopleMan1.delay(1500)
					.add( icon3dots )
					.do(function(){
						intervalChangeFace(this.container, ['people-man1', 'people-man2'], 500);
					});

				peopleGirl.delay(2500)
					.add( iconHeart );
			},
			21136: function() {
				bgSprite.moveTo(-7333, 0, 9, function(){
					console.log(sa.time());
				});
				boat.moveTo(8336, 408, 1);
			},
			22992: function() {
				player.moveTo(650, 643, 5, function(){
					console.log(sa.time());
				});
				bgSprite.moveTo(-7593, 0, 9, function(){
					console.log(sa.time());
				});
			},
			23488: function() {
				player.moveTo(650, 543, 5, function(){
					console.log(sa.time());
				});
				bgSprite.moveTo(-7813, 0, 9, function(){
					console.log(sa.time());
				});
			}
			// 21136: function() {
			// 	bgSprite.moveTo(-10743, 0, 9);
			// }
		})
		.play();
}