var hostUrl = 'http://wangxiao.github.io/marketing-oscar-follow/';
var accountUrl = 'https://account.wandoujia.com/v4/api/profile';
var weiboSharePic = 'http://wangxiao.github.io/marketing-oscar-follow/weibo-share.png';

var timeout = 3000;
var hasAccount = false;
var isReady = false;

var timer = setTimeout(function() {
	window.location.href = 'https://account.wandoujia.com/v1/user/?do=login&callback=' + hostUrl ;
}, timeout);
$.ajax({
	type: 'GET',
	url: accountUrl,
	contentType: 'application/json',
	dataType: 'jsonp',
	timeout: timeout
}).done(function(data) {
	clearTimeout(timer);
	hasAccount = true;
	if( isReady && hasAccount ) {
		hideLoading();
	}
}).fail(function(e) {
	window.location.href = 'https://account.wandoujia.com/v1/user/?do=login&callback=' + hostUrl;
});

var videoList = [
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	},
	{
		id: '22222',
		name: 'Summer-Nude',
		imgUrl: 'images/video-photo/Summer-Nude.png'
	}
];

var IMAGE_LIST=[ 

	{
		id: 'boat',
		url: 'images/boat.png'
	},

	{
		id: 'desk1',
		url: 'images/desk/desk1.png'
	},
	{
		id: 'desk2',
		url: 'images/desk/desk2.png'
	},
	{
		id: 'desk3',
		url: 'images/desk/desk3.png'
	},
	{
		id: 'desk4',
		url: 'images/desk/desk4.png'
	},
	{
		id: 'desk5',
		url: 'images/desk/desk5.png'
	},

	{
		id: 'train',
		url: 'images/train.png'
	},
	{
		id: 'station',
		url: 'images/station.png'
	},
	{
		id: 'car-blue',
		url: 'images/car/blue.png'
	},
	{
		id: 'car-red',
		url: 'images/car/red.png'
	},
	{
		id: 'car-yellow',
		url: 'images/car/yellow.png'
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
		id: 'icon-3dots',
		url: 'images/icons/icon-3dots.png'
	},
	{
		id: 'icon-fire',
		url: 'images/icons/icon-fire.png'
	},
	{
		id: 'icon-heart',
		url: 'images/icons/icon-heart.png'
	},
	{
		id: 'icon-music',
		url: 'images/icons/icon-music.png'
	},
	{
		id: 'icon-plane',
		url: 'images/icons/icon-plane.png'
	},
	{
		id: 'icon-round',
		url: 'images/icons/icon-round.png'
	},
	{
		id: 'icon-star',
		url: 'images/icons/icon-star.png'
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
	},

	{
		id: 'mountain1',
		url: 'images/mountain/mou1.png'
	},
	{
		id: 'mountain2',
		url: 'images/mountain/mou2.png'
	},
	{
		id: 'mountain3',
		url: 'images/mountain/mou3.png'
	},
	{
		id: 'mountain4',
		url: 'images/mountain/mou4.png'
	},
	{
		id: 'mountain5',
		url: 'images/mountain/mou5.png'
	},
	{
		id: 'mountain6',
		url: 'images/mountain/mou6.png'
	},
	{
		id: 'mountain7',
		url: 'images/mountain/mou7.png'
	},

	{
		id:'tree1',
		url: 'images/tree/tree-1.png'
	},
	{
		id:'tree2',
		url: 'images/tree/tree-2.png'
	},
	{
		id:'tree3',
		url: 'images/tree/tree-3.png'
	},

	{
		id: 'ATM',
		url: 'images/ATM.png'
	},
	{
		id: 'house',
		url: 'images/house.png'
	},
	{
		id: 'water',
		url: 'images/water.png'
	}

];

//初始化
var sa = simpleAnimation({
	container:'film',
	mode: 'dom',
	imagesList: IMAGE_LIST,
	FPS: 60,
	onstart: function() {
		//console.log('loading');
	},
	onready: function() {
		//console.log('onready');
		isReady = true;
		if( isReady && hasAccount ) {
			hideLoading();
		}
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
	return setInterval(function(){
		num += 1;
		if( num > l ) {
			num = 1;
		}
		changeFace( container, imagesIdList[num -1]);
	}, interval);
}

function createCloud(x, y) {
	var idList = ['cloud-blue1', 'cloud-blue2'];
	return sa.Sprite(idList[ Math.floor( Math.random() * idList.length ) ])
			.position({x:x, y:y });
			// .doThis(function() {
			// 	var me = this;
			// 	var w = Math.floor(Math.random()*2+1);
			// 	if(w === 1) {
			// 		w = -1;
			// 	} else {
			// 		w = 1;
			// 	}
			// 	var p = me.position();
			// 	me.moveTo(p.x + 1000 * w, p.y+0, 1, function() {
			// 		me.moveTo(p.x+1500 * ( - w ), p.y+0, 1,function(){
			// 		});
			// 	});
			// });
}

function createMountain(x, y) {
	var idList = ['mountain1','mountain2','mountain3','mountain4','mountain5','mountain6','mountain7'];
	var id = idList[ Math.floor( Math.random() * idList.length ) ];
	var s = sa.Sprite( id );
	var top = {
		mountain1:381,
		mountain2:436,
		mountain3:400,
		mountain4:361,
		mountain5:269,
		mountain6:362,
		mountain7:238
	};
	s.position({x:x, y: top[id] });
	return s;
}

function createTree(x, y) {
	var idList = ['tree1', 'tree2', 'tree3'];
	var id = idList[ Math.floor( Math.random() * idList.length ) ];
	var s = sa.Sprite( id );
	var top = {
		tree1:443,
		tree2:352,
		tree3:416
	};
	s.position({x:x, y: top[id] });
	return s;
}

function main() {
	var winWidth = $(window).width();
	var bgSprite = sa.Sprite('background-sprite').width(17000).height(680);
	var stageX = 0;
	var stageWidth = 0;
	if(winWidth < 1400) {
		stageX = (winWidth - 1400)/2;
		stageWidth = winWidth + Math.abs(stageX);
	} else {
		stageWidth = winWidth;
	}
	var stage = sa.Stage({width: stageWidth,x:stageX}).height( bgSprite.height() ).width(17000);
	var bgLayer = sa.Layer().height( bgSprite.height() );
	bgLayer.width( stageWidth ).width(17000);
	stage.add( bgLayer );

	var cloudList = [];
	// 生成云彩
	for(var i = 2, l = 17; i < l ; i += 1) {
		var x = i * 650 + Math.floor( Math.random() * 400 );
		var y = 70 * Math.floor( Math.random() * 3 + 1 );
		var s = createCloud(x, y);
		bgSprite.add( s );
		cloudList.push( s );
	}

	var mountainList = [];
	// 生成山
	for(var i = 0, l = 18; i < l ; i += 1) {
		var x = i * 1050 + Math.floor( Math.random() * 5 ) * 200;
		var s = createMountain(x, 0);
		bgSprite.add( s );
		mountainList.push( s );
	}

	var treeList = [];
	// 生成树
	for(var i = 0, l = 18; i < l ; i += 1) {
		var x = i * 1050 + Math.floor( Math.random() * 5 ) * 200;
		var s = createTree(x, 0);
		bgSprite.add( s );
		treeList.push( s );
	}

	var train = sa.Sprite( 'train' ).position({x:1200,y:500});
	var station = sa.Sprite( 'station' ).position({x:1200,y:312});
	//地铁第二个场景元素
	var peopleOld = sa.Sprite('people-old').position({x:4100,y:320});
	var peopleWoman = sa.Sprite('people-woman1').position({x:4212,y:348});
	var peopleBoy1 = sa.Sprite('people-boy1').position({x:4400,y:336});
	var peopleBoy2 = sa.Sprite('people-boy2').position({x:4480,y:320});
	//地铁第三个场景元素
	var cat1 = sa.Sprite('cat1').position({x:7126,y:444});
	var peopleAnger = sa.Sprite('people-anger3').position({x:7180,y:321});
	var peopleBoy3 = sa.Sprite('people-boy3').position({x:7271,y:341});
	var peopleMan1 = sa.Sprite('people-man1').position({x:7350,y:335});
	var peopleGirl = sa.Sprite('people-girl').position({x:7435,y:364});
	var peopleMan3 = sa.Sprite('people-man3').position({x:7606,y:320});
	var atm = sa.Sprite('ATM').position({x:7683,y:269});
	var iconFire = sa.Sprite('icon-fire').position({x:-20,y:-20});
	var iconRound = sa.Sprite('icon-round').position({x:-25,y:-20});
	var icon3dots = sa.Sprite('icon-3dots').position({x:50,y:-20});
	var iconHeart = sa.Sprite('icon-heart').position({x:50,y:-30});

	var boat = sa.Sprite('boat').position({x:8442,y:408});
	var water = sa.Sprite('water').position({x:8442,y:522});
	//地铁第四个场景元素
	var peopleMan5 = sa.Sprite('people-man5').position({x:11446,y:313});
	var peopleMan4 = sa.Sprite('people-man4').position({x:11546,y:324});
	var peopleWoman2 = sa.Sprite('people-woman3').position({x:11787,y:377});
	var desk = sa.Sprite('desk1').position({x:11754, y:448});
	var cat2 = sa.Sprite('cat4').position({x:11948, y:238});
	var house = sa.Sprite('house').position({x:11675, y:289});
	var car1 = sa.Sprite('car-yellow')
				.position({x:7046,y:477});
	var car2 = sa.Sprite('car-red')
				.position({x:8840,y:470});
	var car3 = sa.Sprite('car-blue')
				.position({x:12911,y:580});

	bgSprite.add( peopleOld )
			.add( peopleWoman )
			.add( peopleBoy1 )
			.add( peopleBoy2 )
			.add( train )
			.add( station )
			.add( cat1 )
			.add( atm )
			.add( peopleAnger )
			.add( peopleBoy3 )
			.add( peopleMan1 )
			.add( peopleGirl)
			.add( peopleMan3 )
			.add( water )
			.add( boat )
			.add( house )
			.add( peopleMan5 )
			.add( peopleMan4 )
			.add( peopleWoman2 )
			.add( desk )
			.add( cat2 )
			.add( car1 )
			.add( car2 )
			.add( car3 );

	bgLayer.add( bgSprite );

	peopleAnger.doThis(function(){
			$(this.container).css('overflow','visible');
		});

	peopleBoy3.doThis(function(){
			$(this.container).css('overflow','visible');
		});

	peopleMan1.doThis(function(){
			$(this.container).css('overflow','visible');
		});

	peopleGirl.doThis(function(){
			$(this.container).css('overflow','visible');
		});

	//动画开始
	sa.speed(1)
		.timeline({
			100: function() {
				train.delay(500).moveTo(3940, 500, 18);
				bgSprite.moveTo(-3650, 0, 22, function(){
						//console.log(sa.time());
						sa.pause();
						$('#mask1').show().animate({opacity:1},500);
						$('#mask0').remove();
					});
			},
			//人们坐地铁
			4128 : function() {
				peopleOld.moveTo(4100, 430, 2, function(){
							bgSprite.remove(peopleOld);
							//console.log(sa.time());
						});
				peopleWoman.delay(1500)
						.moveTo(4212, 468, 4, function(){
							bgSprite.remove(peopleWoman);
							//console.log(sa.time());
						});
				peopleBoy1.delay(1000)
						.moveTo(4400, 456, 4, function(){
							bgSprite.remove(peopleBoy1);
							//console.log(sa.time());
						});
				peopleBoy2.delay(2200)
					.moveTo(4480, 440, 4, function(){
						bgSprite.remove(peopleBoy2);
						//console.log(sa.time());
					});
			},
			6388: function() {
				bgSprite.moveTo(-6700, 0, 20, function(){
					// console.log(sa.time());
					sa.pause();
					$('#mask-all').show();
					$('#mask2').show().animate({opacity:1},500);
					bgSprite.remove( train )
							.remove( cloudList[0] )
							.remove( cloudList[1] )
							.remove( cloudList[2] )
							.remove( cloudList[3] )
							.remove( mountainList[0] )
							.remove( mountainList[1] )
							.remove( mountainList[2] )
							.remove( mountainList[3] )
							.remove( treeList[0] )
							.remove( treeList[1] )
							.remove( treeList[2] )
							.remove( treeList[3] )
							.remove( station );
				});
				car1.moveTo(0, 477, 8 ,function(){
						bgSprite.remove(car1);
					});
			},
			//取款机
			8874: function() {

				cat1.delay(2000)
					.doThis(function(){
						changeFace(this.container,'cat2');
					})
					.delay(1000)
					.doThis(function(){
						changeFace(this.container,'cat3');
					})
					.moveTo(7106, 384, 8)
					.delay(300)
					.moveTo(7086, 445, 8, function(){
						//console.log(sa.time());
					});

				peopleAnger.delay(2000)
					.doThis(function(){
						changeFace(this.container,'people-anger1');
					})
					.add( iconFire )
					.delay(1000)
					.doThis(function(){
						changeFace(this.container,'people-anger2');
					});
				
				peopleBoy3.delay(2500)
					.add( iconRound );

				peopleMan1.delay(1500)
					.add( icon3dots )
					.doThis(function(){
						intervalChangeFace(this.container, ['people-man1', 'people-man2'], 500);
					});

				peopleGirl.delay(2800)
					.add( iconHeart );

				bgSprite.remove( peopleOld )
						.remove( peopleWoman )
						.remove( peopleBoy1 )
						.remove( peopleBoy2 )
						.remove( cloudList[4] )
						.remove( cloudList[5] )
						.remove( cloudList[6] )
						.remove( mountainList[4] )
						.remove( mountainList[5] )
						.remove( treeList[4] )
						.remove( treeList[5] )
						.remove( treeList[6] )
						.remove( car1 );
			},
			// 离开
			11112: function() {
				bgSprite.moveTo(-11153, 0, 20, function(){
					//console.log(sa.time());
					sa.pause();
					$('#mask-all').show();
					$('#mask3').show().animate({opacity:1},500);
				});
				boat.moveTo(8713, 408, 1);
			},
			11472: function() {
				car2.moveTo(30000, 470, 10, function(){
					bgSprite.remove(car2);
				});
			},
			//吃饭等人
			14688: function() {

				peopleWoman2.delay(1500)
					.doThis(function() {
						changeFace(this.container, 'people-woman2');
					});
				desk.delay(500)
					.doThis(function(){
						changeFace(this.container, 'desk2');
					}).delay(1000)
					.doThis(function(){
						changeFace(this.container, 'desk3');
					}).delay(1000)
					.doThis(function(){
						changeFace(this.container, 'desk4');
					}).delay(1000)
					.doThis(function(){
						changeFace(this.container, 'desk5');
						cat2.clearDelay()
							.delay(200)
							.moveTo(11668, 518, 6, function(){
								//console.log(sa.time());
							});
					});

				cat2.moveTo(11868, 428, 6)
					.delay(1000)
					.doThis(function() {
						changeFace(this.container, 'cat5');
					});

				bgSprite.remove( cat1 )
						.remove( boat )
						.remove( water )
						.remove( peopleAnger )
						.remove( peopleBoy3 )
						.remove( peopleMan1 )
						.remove( peopleGirl )
						.remove( cloudList[7] )
						.remove( cloudList[8] )
						.remove( cloudList[9] )
						.remove( mountainList[6] )
						.remove( mountainList[7] )
						.remove( mountainList[8] )
						.remove( treeList[7] )
						.remove( treeList[8] )
						.remove( treeList[9] )
						.remove( car2 );
			},
			//主人公离开场景
			17720: function() {
				subscibePage( 0 );
				bgSprite.moveTo(-13243, 0, 20, function(){
					//console.log(sa.time());
					bgSprite.remove( peopleWoman2 )
						.remove( cloudList[9] )
						.remove( cloudList[10] )
						.remove( cloudList[11] )
						.remove( mountainList[9] )
						.remove( mountainList[10] )
						.remove( mountainList[11] )
						.remove( treeList[9] )
						.remove( treeList[10] )
						.remove( treeList[11] )
						.remove( desk )
						.remove( cat2 )
						.remove( car3 );	
				});
				car3.moveTo(1000, 480, 6, function(){
					bgSprite.remove(car3);
				});
			}
		});
	
	// 用户能节省的时长
	var userTimeLength = 0;
 
	//dom操作部分
	var mask0 = $('#mask0');
	mask0.find('button').on('click', function(){
		sa.play();
		mask0.hide();
	});

	var mask1 = $('#mask1');
	mask1.find('button').on('click', function(){
		userTimeLength += Number($(this).attr('data-time'));
		mask1.hide();
		$('#mask-all').hide();
		sa.play();
	});

	var mask2 = $('#mask2');
	mask2.find('button').on('click', function(){
		userTimeLength += Number($(this).attr('data-time'));
		mask2.hide();
		$('#mask-all').hide();
		sa.play();
	});

	var mask3 = $('#mask3');
	mask3.find('button').on('click', function(){
		userTimeLength += Number($(this).attr('data-time'));
		$('.userTimeLength').text(userTimeLength);
		mask3.hide();
		$('#mask-all').hide();
		sa.play();
	});

	var subscibeEle = $('#subscibe');
	var videosList = [];
	subscibeEle.find('.videos button').on('click',function(){
		var id = $(this).attr('data-id');
		var value = 'video/http://oscar.wandoujia.com/api/v1/feeds/' + id;
		for( var i = 0 , l = videosList.length; i < l ; i += 1 ) {
			if( videosList[i] !== value ) {
				videosList.push( value );
			}
		}
	});

	//显示结束页
	function showEndPage() {
		$('#weibo').animate({opacity:0.5}, 300,function() {
			$('#weibo').hide();
			var container = $('#end');
			container.show().animate({opacity:1},300);
		});
	}

	// 提交预订阅
	function subscibe( list ) {
		for(var i = 0 , l = list.length ; i < l ; i ++ ) {
			list[i] = "video/http://oscar.wandoujia.com/api/v1/feeds/" + list;
		}
		
		var data = {
			data: JSON.stringify(list),
			type: 'test'
		};
		$.ajax({
			type: 'post',
			url: 'http://feed.wandoujia.com/api/v1/deposit/add',
			async: false,
			contentType: 'application/json',
			dataType: 'jsonp',
			data: data,
			timeout: 10000
		}).done(function( data ) {
			alert('订阅成功');
		}).fail(function( xhr ) {
			// xhr.status
			alert('订阅失败');
		});
	}

	//显示订阅分页
	var subscibePageNum = -1;
	function subscibePage( num ){
		var container = $('#subscibe');
		var page = container.find('.page')
							.hide()
							.css({opacity:0});
		var eles = page.find('.video-photo');
		for( var i = num * 6 , l = num * 6 + 6 ; i < l ; i ++ ) {
			eles.eq(i - num * 6)
				.find('img')
				.attr('src',videosList[i].imgUrl );
		}
		page.show().animate({opacity:1},300);
		if( subscibePageNum === -1 ) {
			container.appendTo(bgSprite.container);
			var left = container.find('.btn-left');
			var right = container.find('.btn-right');

			left.on('click', function() {
				if( subscibePageNum !== 0 ) {
					right.show();
					subscibePage(subscibePageNum -= 1);
				} else {
					left.hide();
				}
			});
			right.on('click', function() {
				if( subscibePageNum !== ( Math.floor( videosList.length/6 ) - 1) ) {
					left.show();
					subscibePage(subscibePageNum += 1);
				} else {
					right.hide();
				}
			});
			container.find('.video-photo').on('click',function() {
				var ele = $(this);
				var mask = ele.find('.mask-sel');
				if( ele.attr('data-selected') === 'false' ){
					mask.show();
					ele.attr('data-selected','true');
				} else {
					mask.hide();	
					ele.attr('data-selected','false');
				}
			});
			container.find('.ok').on('click', function() {
				//显示微博分享那个页面
				var weiboContainer = $('#weibo').appendTo( bgSprite.container );
				bgSprite.moveTo(-14673,0,12,function() {
					bgSprite.remove( container[0] );
					var word = '#我和我的小世界# 豌豆荚说，我每天无聊的时间一共有 '+ userTimeLength +' 分钟；@豌豆荚 还说，TA 能让我的无聊时间变成快乐的小世界。点击链接，开启你全新的小世界。'+ hostUrl;
					$('#weibo-share').attr('href','http://service.weibo.com/share/share.php?appkey=1483181040&relateUid=1727978503&title='+encodeURIComponent(word)+'&pic='+ weiboSharePic );
					weiboContainer.find('p').each(function(i , v){
						setTimeout(function(){
							$(v).show().animate({opacity:1}, 1000);
						},500*i);
					});
					setTimeout(function(){
						weiboContainer.find('.btns').show().animate({opacity:1}, 500);
					}, 2000);
				});
			});
			subscibePageNum = 0;
		}
}

// main 函数结束的最后一个括号
}

//隐藏loading
function hideLoading() {
	$('#loading').animate({opacity:0.5}, 1000, function(){
		$('#loading').hide();
		showMask0Word();
	});
}

function showMask0Word() {
	$('#mask0').find('p').each(function(i , v){
		setTimeout(function(){
			$(v).show().animate({opacity:1}, 1000);
		},1000*i);
	});
	var btn = $('#mask0').find('button');
	setTimeout(function(){
		btn.show().animate({opacity:1}, 500);
	}, 6000);
}
