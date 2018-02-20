var gamemode;
var pauseMessage='';
var defaultBehavior='neutral';
var asteroidPanicChance=0.02;
var cheatmode = 0;
var noblood = 0;
var touchPressed = 0;
var initialXp = 200; //xp required for first level
var bulletTypes = [ 
{'name':'pulse', 'id':0},
{'name':'bullets', 'id':1},
{'name':'missile', 'id':2},
{'name':'rail', 'id':3},
{'name':'twinlaser', 'id':4},
{'name':'fireblast', 'id':5},
{'name':'tribullet', 'id':6},
{'name':'gas', 'id':7},
{'name':'waste', 'id':8},
{'name':'chem', 'id':9},
{'name':'smoke', 'id':10},
{'name':'corpse', 'id':13},
{'name':'gascloud', 'id':14},
{'name':'fire', 'id':15}

];

var randomName = function(){
				var adjectives = ['Dusty','Barren','Lonely','Wasted','Cold','Bleak','Dangerous',
						'Solemn','Treacherous','Screaming','Yawning'];
				var nouns = ['Void','Collapse','Spiral','Gap','Graveyard','Scrapyard','Expanse',
						'Warzone','Trade Zone','Column','Abyss'];
				return randomFromArray(adjectives) + ' ' + randomFromArray(nouns);
}
var randomMission = function(){
				var allfactions=[
								['alliance military',allianceGear4],
								['mechanoid',mechanoidGear],
												['smuggler',banditGear],
																['infected',zombieGear],
																				['damaged mining drone',failDroneGear],
																								['mining drone',droneGear],
																												['trashhauler',dirtyParts],
																																['mercenary',blackParts],
																																				['pirate',banditGear2]
				];
																																				var myfactions=[];
																																				myfactions.push(randomFromArray(allfactions));
																																				myfactions.push(randomFromArray(allfactions));
																																				if(randomRange(0,1)>0.5){
																																								myfactions.push(randomFromArray(allfactions));

																																				}

																																				var rm = {};
																																				rm.id = 666;
																																				rm.next = [666];
																																				rm.name = randomName();
																																				rm.complete = false;
																																				rm.hazeRed = randomRange(0.2,1.2);
																																				rm.hazeWhite = randomRange(1.0,1.8);
																																				rm.hazePurple = randomRange(0.2,1.2);
																																				rm.hazeRedSpeed = randomRange(20,40);
																																				rm.hazeWhiteSpeed = 10;
																																				rm.hazePurpleSpeed = randomRange(60,100);
																																				rm.distanceMin = randomRange(9000,12000);
																																				rm.distanceMax = randomRange(9000,14000);
																																				rm.hazePurpleBlendMode = 2;
																																				rm.hazeRedBlendMode = 0;
																																				rm.intro = [rm.name];
																																				rm.outro = [];
																																				rm.win = {
																																								'condition':'frob'
																																				};
																																				rm.enemies = [];
																																				rm.asteroidPanic=false;

																																				var asteroidDensity = parseInt(randomRange(10,50));
																																				if(randomRange(0,1)<asteroidPanicChance){
																																								rm.asteroidPanic=true;
																																								rm.hazeRedSpeed*=2;
																																								asteroidDensity=parseInt(randomRange(70,120));
																																				}
																																				if(asteroidDensity < 20){
																																								rm.intro.push('asteroid density: light');
																																				}else if(asteroidDensity < 35){
																																								rm.intro.push('asteroid density: moderate');
																																				}else if(asteroidDensity < 65){
																																								rm.intro.push('asteroid density: high');
																																				}else{
																																								rm.intro.push('asteroid density: extreme');
																																				}
																																				var enemyDensity=parseInt(randomRange(50,60+(9*playerStats.level)));
																																				if(asteroidDensity>50){enemyDensity=0};
																																				if(enemyDensity>0){
																																								var s=  myfactions[0][0] + ' in area: ';
																																				if(enemyDensity>140){
																																								s+='extreme threat.';
																																				}else if(enemyDensity>60){
																																								s+='high threat.';
																																				}else if(enemyDensity>40){
																																								s+='moderate threat.';
																																				}else if(enemyDensity>20){
																																								s+='low threat.';
																																				}else if(enemyDensity>0){
																																								s+='minimal threat.';
																																				}
																																				rm.intro.push(s);
																																				}
																																				while(enemyDensity > 0){
																																								var faction = randomFromArray(myfactions);
																																								var minSize = parseInt(randomRange(2,8));
																																								var maxSize = parseInt(randomRange(0,1));
																																								var count = parseInt(randomRange(0,20/minSize));
																																								var maxCount = Math.pow((minSize+maxSize)/2,2);
																																								maxCount = parseInt(enemyDensity/maxCount);
																																								var strength = 0;
																																								if(maxCount < 1){ 
																																												count = 0;
																																												enemyDensity = 0;
																																								}else if(maxCount < count){
																																												count=maxCount;
																																								}
																																								if(count > 0){
																																												strength=Math.pow(((minSize+maxSize)/2),2)*count;	
																																												enemyDensity-=strength;
																																												rm.enemies.push(
																																																				{
																																																				'ships': drones,
																																																				'parts': faction[1], 
																																																				'sizeMin': minSize,
																																																				'sizeMax': maxSize+minSize,
																																																				'respawn':true,
																																																				'count':count,
																																																				'missionTarget':false

																																																				}
																																																			 )
																																								}

																																				}
																																				rm.enemies.push(
																																												{
																																												'ships': asteroids,
																																												'parts': asteroidParts, 
																																												'sizeMin': 2,
																																												'sizeMax': 4,
																																												'respawn':true,
																																												'count':asteroidDensity,
																																												'missionTarget':false
																																												}
																																											 );
																																				rm.enemies.push(
																																												{
																																												'ships': containers,
																																												'respawn':true,
																																												'count':parseInt(randomRange(3,8)), 
																																												'missionTarget':false
																																												}
																																											 );
																																				rm.enemies.push(
																																												{
																																												'ships': questionContainers,
																																												'respawn':false,
																																												'count':parseInt(randomRange(1,5)), 
																																												'missionTarget':true
																																												}

																																											 );
																																				return rm;
}
function randomFromArray(arr){
				var idx = parseInt(randomRange(0, arr.length));
				return arr[idx];
}
function signedSqrt(x){
				if(x==0){return 0;}
				var sign = x / Math.abs(x);
				return sign * Math.sqrt(Math.abs(x));

}
function pausedRevertSprites(){
				frob1.x-=frob1.body.velocity.x*game.time.physicsElapsed;
				frob1.y-=frob1.body.velocity.y*game.time.physicsElapsed;
				frob1.angle-=frob1.body.angularVelocity*game.time.physicsElapsed;
				for(var i=0;i<player.parts.length;i++){
								player.parts[i].update();
				}  
				for(var i=0;i<enemies.length;i++){
								enemies[i].sprite.body.x-=enemies[i].sprite.body.velocity.x*game.time.physicsElapsed;  
								enemies[i].sprite.body.y-=enemies[i].sprite.body.velocity.y*game.time.physicsElapsed;  
								enemies[i].sprite.angle-=enemies[i].sprite.body.angularVelocity*game.time.physicsElapsed;
								if(enemies[i].alive && enemies[i].parts.length){
												for(var j=0;j<enemies[i].parts.length;j++){
																enemies[i].parts[j].update();
												}
								}
				}
				revertGroup(loots);
				revertGroup(debris);
				revertGroup(enemyBullets);
				revertGroup(bullets);
				revertGroup(explosions);


}
function pause(resumeDelay,x,y) {
				if(game.time.now<nextUIDelay){
								return;
				}
				if(typeof(x)!='undefined'&&typeof(y)!='undefined'){
								if(!onscreenStrict(x,y)){
												return;
								}}
				gamemode='paused';
				pauseMessage=randomFromArray(messages);
				nextUIDelay=game.time.now+2000;
				pausedLastPlayerVelX=player.sprite.body.velocity.x;
				pausedLastPlayerVelY=player.sprite.body.velocity.y;
				player.lastVelocityX=0;
				player.lastVelocityY=0;
				player.sprite.body.velocity.x =0;
				player.sprite.body.velocity.y =0;
				var tweens = game.tweens.getAll()  
								for(var i=0;i<tweens.length;i++){
												tweens[i].pause();
								}
				blurX.blur=0;
				blurY.blur=0;
				var blurAmount = isAndroid ? 30 : 30;

				if(typeof(resumeDelay)!='undefined'){
								nextUIDelay=game.time.now+5000;
								if(resumeDelay<1000){resumeDelay=1000};
								pauseResumeTime = game.time.now + resumeDelay;
								if(isAndroid){
												game.add.tween(blurX).to({blur:blurAmount},900,Phaser.Easing.Exponential.Out,true,0,false);
												game.add.tween(blurY).to({blur:blurAmount},900,Phaser.Easing.Exponential.Out,true,0,false);
								}else{
												game.add.tween(blurX).to({blur:blurAmount},resumeDelay,Phaser.Easing.Exponential.Out,true,0,false).to({blur:0},200,Phaser.Easing.Sinusoidal.Out,true,0,false);
												game.add.tween(blurY).to({blur:blurAmount},resumeDelay,Phaser.Easing.Exponential.Out,true,0,false).to({blur:0},200,Phaser.Easing.Sinusoidal.Out,true,0,false);
								}
				}else{
								game.add.tween(blurX).to({blur:blurAmount},1000,Phaser.Easing.Exponential.Out,true,0,false);
								game.add.tween(blurY).to({blur:blurAmount},1000,Phaser.Easing.Exponential.Out,true,0,false);



				}
				if(typeof(x)!='undefined'&&typeof(y)!='undefined'){
								if(onscreenStrict(x,y)){
												game.add.tween(cameraTarget).to({x:x,y:y},resumeDelay * 0.65, Phaser.Easing.Sinusoidal.In, true, 0, false);
								}

				}
}
function unpause () {
				gamemode='war';
				nextUIDelay=game.time.now+2000;
				pauseResumeTime = 0;
				var tweens = game.tweens.getAll()  
								for(var i=0;i<tweens.length;i++){
												tweens[i].resume();
								}
				blurX.blur=0;

				blurY.blur=0;
				player.lastVelocityX=pausedLastPlayerVelX;
				player.lastVelocityY=pausedLastPlayerVelY;
				player.sprite.body.velocity.x =      pausedLastPlayerVelX;
				player.sprite.body.velocity.y =      pausedLastPlayerVelY;
				//        hazeRed.filters=undefined;
				//        hazeWhite.filters=[];
				//        hazePurple.filters=[];
				//      planet.filters=undefined;
				//        planetlod.filters=[];
				//        planetfall.filters=[];
				//        planetdirt.filters=[];

				//        nebula.filters=[];
				//        nebula2.filters=[];


}
var growShipSE = function(ship){
				var size = Math.sqrt(ship.length);
				var outShip = [];
				var j=0;
				for(var i=0;i<ship.length;i++){
								outShip[j++]=ship[i];
								if(i % size == size-1){
												outShip[j++]=-1;
								}
				}
				for(var i=(size+1)*(size);i<Math.pow(size+1,2);i++){
								outShip[i]=-1;
				}
				return outShip;
}
var growShipNW = function(ship){
				var size = Math.sqrt(ship.length);
				var outShip = [];
				var j=0;
				for(var i=0;i<size+1;i++){
								outShip[i]=-1;
								j++;
				}
				for(var i=0;i<ship.length;i++){
								if(i % size == 0){
												outShip[j++]=-1;
								}
								outShip[j++]=ship[i];
				}
				return outShip;
}
var growShipNE = function(ship){
				var size = Math.sqrt(ship.length);
				var outShip = [];
				var j=0;
				for(var i=0;i<size+1;i++){
								outShip[i]=-1;
								j++;
				}
				for(var i=0;i<ship.length;i++){
								outShip[j++]=ship[i];
								if(i % size == size-1){
												outShip[j++]=-1;
								}
				}
				return outShip;
}
var growShipSW = function(ship){
				var size = Math.sqrt(ship.length);
				var outShip = [];
				var j=0;
				for(var i=0;i<ship.length;i++){
								if(i % size == 0){
												outShip[j++]=-1;
								}
								outShip[j++]=ship[i];
				}
				for(var i=(size+1)*(size);i<Math.pow(size+1,2);i++){
								outShip[i]=-1;
				}
				return outShip;
}
var bulletTypeName = function(id){
				for (var i=0;i<bulletTypes.length;i++){
								if(bulletTypes[i].id==id){
												return bulletTypes[i].name;
								}
				}
				return '';

}
var bulletType = function(name){
				for (var i=0;i<bulletTypes.length;i++){
								if(bulletTypes[i].name==name){
												return bulletTypes[i].id;
								}
				}
				return -1;
}
var aiModes = {
				'player':-1,
				'simple':0,
				'enemy':1,
				'asteroidInit':2,
				'asteroid':3,
				'accurateEnemy':4
};
var lastFDtick = 0;
var FDcount = 0;
var forceDead = function(collection){
				if(lastFDtick < game.time.now){
								FDcount=0;
								lastFDtick=game.time.now;
				}  
				if(!collection.countDead()){
								if(FDcount < 100){ // stop big events from slowing things down
												collection.sort('lifespan',Phaser.Group.SORT_ASCENDING);
												collection.getFirstAlive().kill();
												killTweensFromExplosion(collection);
												FDcount++;
								}
				}
				return collection.countDead();
}
var legacyButtons = [
{'name':'left',
				'downCallback':function(){buttonLeft=1;},
				'upCallback':function(){buttonLeft=0;},
				'x':0,
				'y':7,
				'rotation':0,
				'label':'<'},
{'name':'right',
				'downCallback':function(){buttonRight=1;},
				'upCallback':function(){buttonRight=0;},
				'x':2,
				'y':7,
				'rotation':0,
				'label':'>'},
{'name':'up',
				'downCallback':function(){buttonUp=1;},
				'upCallback':function(){buttonUp=0;},
				'x':1,
				'y':6,
				'rotation':Math.PI,
				'label':'V'},
{'name':'down',
				'downCallback':function(){buttonDown=1;},
				'upCallback':function(){buttonDown=0;},
				'x':1,
				'y':7,
				'rotation':0,
				'label':'V'},
{'name':'fire',
				'downCallback':function(){buttonFire=1;},
				'upCallback':function(){buttonFire=0;},
				'x':7,
				'y':7,
				'rotation':0,
				'label':'X'},
{'name':'alt',
				'downCallback':function(){buttonAlt=1;},
				'upCallback':function(){buttonAlt=0;},
				'x':7,
				'y':6,
				'rotation':0,
				'label':'Z'},
{'name':'enter2',
				'downCallback':function(){buttonEnter=1;},
				'upCallback':function(){buttonEnter=0;},
				'x':6,
				'y':7,
				'rotation':0,
				'label':''},
{'name':'enter',
				'downCallback':function(){buttonEnter=1;},
				'upCallback':function(){buttonEnter=0;},
				'x':5,
				'y':7,
				'rotation':0,
				'label':'ENTER'}
				];
				var selectButtons = [
{'name':'left',
				'downCallback':function(){buttonLeft=1;},
				'upCallback':function(){buttonLeft=0;},
				'x':0,
				'y':6,
				'rotation':0,
				'label':'<'},
{'name':'right',
				'downCallback':function(){buttonRight=1;},
				'upCallback':function(){buttonRight=0;},
				'x':2,
				'y':6,
				'rotation':0,
				'label':'>'},
{'name':'up',
				'downCallback':function(){buttonUp=1;},
				'upCallback':function(){buttonUp=0;},
				'x':1,
				'y':5,
				'rotation':Math.PI,
				'label':'V'},
{'name':'down',
				'downCallback':function(){buttonDown=1;},
				'upCallback':function(){buttonDown=0;},
				'x':1,
				'y':7,
				'rotation':0,
				'label':'V'},
{'name':'fire',
				'downCallback':function(){buttonFire=1;},
				'upCallback':function(){buttonFire=0;},
				'x':5,
				'y':6,
				'rotation':0,
				'label':'connect'},
{'name':'alt',
				'downCallback':function(){buttonAlt=1;},
				'upCallback':function(){buttonAlt=0;},
				'x':5,
				'y':7,
				'rotation':0,
				'label':'remove?'},
{'name':'enter',
				'downCallback':function(){buttonEnter=1;},
				'upCallback':function(){buttonEnter=0;},
				'x':3.5,
				'y':1,
				'rotation':0,
				'label':'launch'}
				];
				var deleteButtons = [
{'name':'left',
				'downCallback':function(){buttonLeft=1;},
				'upCallback':function(){buttonLeft=0;},
				'x':0,
				'y':6,
				'rotation':0,
				'label':'<'},
{'name':'right',
				'downCallback':function(){buttonRight=1;},
				'upCallback':function(){buttonRight=0;},
				'x':2,
				'y':6,
				'rotation':0,
				'label':'>'},
{'name':'up',
				'downCallback':function(){buttonUp=1;},
				'upCallback':function(){buttonUp=0;},
				'x':1,
				'y':5,
				'rotation':Math.PI,
				'label':'V'},
{'name':'down',
				'downCallback':function(){buttonDown=1;},
				'upCallback':function(){buttonDown=0;},
				'x':1,
				'y':7,
				'rotation':0,
				'label':'V'},
{'name':'fire',
				'downCallback':function(){buttonFire=1;},
				'upCallback':function(){buttonFire=0;},
				'x':6,
				'y':7,
				'rotation':0,
				'label':'remove'},
{'name':'alt',
				'downCallback':function(){buttonAlt=1;},
				'upCallback':function(){buttonAlt=0;},
				'x':6,
				'y':5,
				'rotation':0,
				'label':'done'}
				];
				var moveButtons = [
{'name':'left',
				'downCallback':function(){buttonLeft=1;},
				'upCallback':function(){buttonLeft=0;},
				'x':0,
				'y':6,
				'rotation':0,
				'label':'<'},
{'name':'right',
				'downCallback':function(){buttonRight=1;},
				'upCallback':function(){buttonRight=0;},
				'x':2,
				'y':6,
				'rotation':0,
				'label':'>'},
{'name':'up',
				'downCallback':function(){buttonUp=1;},
				'upCallback':function(){buttonUp=0;},
				'x':1,
				'y':5,
				'rotation':Math.PI,
				'label':'V'},
{'name':'down',
				'downCallback':function(){buttonDown=1;},
				'upCallback':function(){buttonDown=0;},
				'x':1,
				'y':7,
				'rotation':0,
				'label':'V'},
{'name':'fire',
				'downCallback':function(){buttonFire=1;},
				'upCallback':function(){buttonFire=0;},
				'x':6,
				'y':7,
				'rotation':0,
				'label':'add'},
{'name':'alt',
				'downCallback':function(){buttonAlt=1;},
				'upCallback':function(){buttonAlt=0;},
				'x':6,
				'y':5,
				'rotation':0,
				'label':'cancel'},
				];
var hiddenButtons = [

{'name':'hideButtons',
				'downCallback':function(){buttonOther=1;
								if(game.time.now > nextUIDelay){
												nextUIDelay = game.time.now + 300;
												ui.initButtons(warButtons);
								}
				},
				'upCallback':function(){buttonOther=0;},
				'x':0,
				'y':7,
				'rotation':0,
				'label':'+'}
]

var warButtons = [
				/*{'name':'lofi',
					'downCallback':function(){
					hazeWhite.blendMode = 1;

					hazeRed.visible=false;
					hazePurple.visible=false;
					},
					'upCallback':function(){},
					'x':0,
					'y':0,
					'rotation':0,
					'label':':p'},*/
				// ui.initButtons(warButtons);

{'name':'hideButtons',
				'downCallback':function(){buttonOther=1;
								if(game.time.now > nextUIDelay){
												nextUIDelay = game.time.now + 300;
												ui.initButtons(hiddenButtons);
								}
				},
				'upCallback':function(){buttonOther=0;},
				'x':0,
				'y':7,
				'rotation':0,
				'label':'-'},

{'name':'lights',
				'downCallback':function(){buttonLight=1;},
				'upCallback':function(){buttonLight=0;},
				'x':7,
				'y':5,
				'rotation':0,
				'label':'?'},
{'name':'fire',
				'downCallback':function(){buttonFire=1;},
				'upCallback':function(){buttonFire=0;},
				'x':7,
				'y':7,
				'rotation':0,
				'label':'Ÿ'},
{'name':'alt',
				'downCallback':function(){buttonAlt=1;},
				'upCallback':function(){buttonAlt=0;},
				'x':7,
				'y':6,
				'rotation':0.5*Math.PI,
				'label':'*'},
{'name':'enter',
				'downCallback':function(){buttonEnter=1;},
				'upCallback':function(){buttonEnter=0;},
				'x':7,
				'y':0,
				'rotation':0,
				'label':'"'}
				];
				// container for stuff that might persist between games
				// TODO: persist stuff between games
				var playerMeta = function () {
								this.inventory=[];
								this.health=-1;
								this.healthMax=-1;
								this.crew=2;
								if(cheatmode){
												for(var i=0; i<components.length; i++){
																if(typeof(components[i].name)=='undefined'){
																}else{
																				if(!components[i].name.match(/Component/)){
																								this.inventory.push(i);
																				}
																}
												}
								}
								this.kills=0;
								this.level=1;
								this.xp=0;
								this.nextXp=initialXp;
								this.deaths=0;
				};
function spacesAtStartOfRow(ship,rowNum){
				var size = Math.sqrt(ship.length);
				var spaces = 0;
				for(var i = size*rowNum ;i<(rowNum*size)+size;i++){
								if(ship[i]==-1){spaces++}
								else{return spaces;}
				}

				return spaces;
}
function spacesAtEndOfRow(ship,rowNum){
				var size = Math.sqrt(ship.length);
				var spaces = 0;
				for(var i = size + (rowNum*size) - 1;i>=(rowNum*size);i--){
								if(ship[i]==-1){spaces++}
								else{return spaces;}
				}

				return spaces;
}
function thrustPosition(ship){
				var size = Math.sqrt(ship.length);
				if(size<=2){
								return 0;
				}
				if (size % 2 == 0){
								return -1* Math.max(spacesAtStartOfRow(ship,size/2),spacesAtStartOfRow(ship,(size/2)-1))*16;
				}else{
								return -1*spacesAtStartOfRow(ship,(size-1)/2)*16;
				}
}
function lightPosition(ship){
				var size = Math.sqrt(ship.length);
				if(size<=2){
								return 0;
				}
				if (size % 2 == 0){
								return Math.max(spacesAtEndOfRow(ship,size/2),spacesAtEndOfRow(ship,(size/2)-1))*16;
				}else{
								return spacesAtEndOfRow(ship,(size-1)/2)*16;
				}
}
function headlightFlicker(){
				headlightIntensity=1;
				if(Math.random()>player.health/player.healthMax){
								headlightIntensity=Math.sin(game.time.now/333);
				}
}
function headlight(){
				var lightSpot=undefined;
				lightSpot={x:player.sprite.body.x+(player.sprite.body.width*0.5)+(Math.cos(player.sprite.rotation)*((player.sprite.body.width*0.5)-lightPosition(player.ship))),y:player.sprite.body.y+(player.sprite.body.width*0.5)+(Math.sin(player.sprite.rotation)*((player.sprite.body.width*0.5)-lightPosition(player.ship)))};
				headlightGlow(explosions,lightSpot.x,lightSpot.y);
				otherGraphics.blendMode=1;
				otherGraphics.lineStyle(3, 0xFFFFFF, 0);
				if(gamemode=='paused'){
								lightSpot.x-=player.sprite.body.velocity.x * game.time.physicsElapsed;
								lightSpot.y-=player.sprite.body.velocity.y * game.time.physicsElapsed;
				}
				for(var i=0.90;i>0.50;i-=0.01){
								otherGraphics.beginFill(0xFFFFFF,0.00625*headlightIntensity);
								otherGraphics.moveTo(lightSpot.x,lightSpot.y);
								otherGraphics.lineTo(lightSpot.x+Math.cos(player.sprite.rotation - i)*2*Math.max(resolutionY,resolutionX),lightSpot.y+Math.sin(player.sprite.rotation - i)*2*Math.max(resolutionY,resolutionX));
								otherGraphics.lineTo(lightSpot.x+Math.cos(player.sprite.rotation + i)*2*Math.max(resolutionY,resolutionX),lightSpot.y+Math.sin(player.sprite.rotation + i)*2*Math.max(resolutionY,resolutionX));
								otherGraphics.lineTo(lightSpot.x,lightSpot.y);
								otherGraphics.endFill();
				}
				otherGraphics.blendMode=0;
}

function queryComponent(id){
				return components[id].bonus.toString().replace(/target\./g,'').replace(/function.*{/,'').replace(/}/g,'').replace(/bulletBehavior.*/,'CHANGE BULLET BEHAVIOR').replace(/alt=.*/,'ALTERNATE FIRE').replace(/this.*body\./g,'').replace(/this.*sprite\./g,'').replace(/this\./g,'').replace(/[();\[\]{}]/g,'').replace(/\t\t\t.*\n/g,'').replace(/[\t ]*/g,'').replace(/^\n/g,'');
}
var scroll = function(target,modifier ){
				if(gamemode!='paused'){  
								target.tilePosition.x += ( modifier*game.time.physicsElapsed*player.sprite.body.velocity.x / target.scale.x) + (game.time.physicsElapsed * (target.speed));
								var ymodifier = target.scale.y / target.scale.x;
								target.tilePosition.y += ( ymodifier * modifier*game.time.physicsElapsed*player.sprite.body.velocity.y / target.scale.y) ;
				}
}
var blackOut = function(){

				ui.tempStation.visible=false;
				station.visible=false;
				hazeRed.visible=false;
				hazeWhite.visible=false;
				hazePurple.visible=false;

}
window.oncontextmenu = function (){
				return false;     // cancel default menu
}
function compareAngles(x,y){

				return Math.atan2(Math.sin(x-y),Math.cos(x-y));
}
function onscreenStrict(x,y) {
				return  (player.sprite.x - (0.5*resolutionX) < x && x < player.sprite.x + (0.5*resolutionX) &&
												player.sprite.y - (0.5*resolutionY) < y && y < player.sprite.y + (0.5*resolutionY))
}

function onscreen(x,y) {
				return  (player.sprite.x - resolutionX < x && x < player.sprite.x + resolutionX &&
												player.sprite.y - resolutionY < y && y < player.sprite.y + resolutionY)
}

function partsToTop(tgt){

				for (var i =0; i < tgt.parts.length; i++){
								tgt.parts[i].sprite.bringToTop();
				}
}
function ownerFromName(name){

				if(name == 'player'){
								return player;
				}else{
								return enemies[name];
				}
}
function repeat(pattern, count) { //http://stackoverflow.com/questions/202605/repeat-string-javascript - elegant!
				if (count < 1) return '';
				var result = '';
				while (count > 0) {
								if (count & 1) result += pattern;
								count >>= 1, pattern += pattern;
				}
				return result;
}


function destroyIfExists(sprite){
				if (typeof(sprite)!='undefined'){
								if (typeof(sprite.destroy)!='undefined'){
												sprite.destroy();
								}
				}
}

function applyBonuses(target){

				var n=0;
				for(var i=0;i<target.ship.length;i++){
								if (target.ship[i]!=-1){
												target.sprite.body.maxVelocity.x-=8;
												target.sprite.body.maxVelocity.y-=8;
												target.sprite.profile+=25;
												target.turnRate-=0.1;
												target.health+=2;
												components[target.ship[i]].bonus(target);
												n++;
								}
				}
				//apply some generic bonuses for NYI items
				if(target.TODO){
								target.acceleration+=target.TODO*0.2;
								target.turnRate+=target.TODO*0.1;
								target.health+=target.TODO;
								target.fireEnergy+=target.TODO*0.2;
								target.fireDamage+=target.TODO*0.25;
								target.energyMax+=target.TODO;
								target.energyAmount+=target.TODO*0.2;
				}
				target.acceleration =target.acceleration*48/(n+3);
				target.turnRate*=2.5;


				//apply some minimums
				if(target.health < 6){target.health=6;}
				if(target.acceleration < 0.5){target.acceleration=0.5}
				if(target.turnRate < 1){target.turnRate=1}
				if(target.energyRate < 400){target.energyAmount+=(400-target.energyRate)/100}    
				if(target.fireEnergy < 1){target.fireEnergy=1}  
				if(target.fireTracking > 5){target.fireTracking=5;}
				if(target.fireEnergy > target.energyMax){target.fireDamage*=target.energyMax/target.fireEnergy;target.fireEnergy=target.energyMax;}
				target.healthMax = target.health;
				target.sprite.profileMax=target.sprite.profile; 
}

function addVelocity (a,b,c){return"undefined"==typeof b&&(b=60),  c=c||new d.Point,c.setTo(c.x+Math.cos(a)*b,c.y+Math.sin(a)*b)};
function getHypo(a,b){return Math.sqrt(a*a+b*b)};
function clampVelocity (sprite){

				var hypo = getHypo(sprite.body.velocity.x,sprite.body.velocity.y);

				if(hypo > sprite.body.maxVelocity.x){
								var foo = hypo / sprite.body.maxVelocity.x;
								sprite.body.velocity.setTo(
																sprite.body.velocity.x/foo,
																sprite.body.velocity.y/foo
																);
				}

}
function randomScaleRange (a,b){var c,d; if(a>b){c=a;d=b;}else{d=a;c=b};
				var e = randomRange(a,b);
				e = Math.pow(e,e/(c*0.5));
				e = Math.min(Math.max(e,d),c);
				return e;
};
function randomRange (a,b){var c,d; if(a>b){c=a;d=b;}else{d=a;c=b};return (Math.random()*(c-d))+d};
function randomSign (){return Math.random()>.5?1:-1};
function joinRegions(regions, a, b) {
				if (a==b) { return regions; }

				for(var i=0;i<regions.length;i++){
								if(regions[i] == a){
												regions[i]=b;
								}
				}
				return regions;
}
function getCullable (regionsRaw) {
				var regionCount = [];
				var regions=stripUndefined(regionsRaw);
				var largestRegion = -1;
				var largestRegionCount = 0;
				for (var i=0;i<regions.length;i++){
								if(typeof(regionCount[regions[i]])=='undefined'){
												regionCount[regions[i]]=1;
								}else{
												regionCount[regions[i]]++;
								}
								if(regionCount[regions[i]] > largestRegionCount){
												largestRegion = regions[i];
												largestRegionCount = regionCount[regions[i]];
								}
				}
				var result = [];
				var j=0;
				for (var i=0;i<regions.length;i++) {
								if(largestRegion && regions[i] != largestRegion){
												result.push(j);
								}
								j++;
				}
				return result;
}
// return an array of contiguous ship regions
function contiguous (ship) {
				var regions = [];
				var connectingRegions = [];
				var size = Math.sqrt(ship.length);
				var currentRegion = 0;
				for (var i=0;i<ship.length;i++){
								connectingRegions = [];
								if(ship[i] != -1){
												if(i % size > 0 && ship[i-1] != -1){
																connectingRegions.push(regions[i-1]);
												}
												if(i >= size && ship[i-size] != -1){
																connectingRegions.push(regions[i-size]);
												}  
												regions[i] = currentRegion++;
												for(var j=0;j < connectingRegions.length; j++){
																regions = joinRegions(regions, connectingRegions[j], regions[i]);
												}
								}
				}
				return regions;
}
function stripUndefined (arr) {
				var arrOut=[];
				for (var i=0;i<arr.length;i++){
								if (typeof(arr[i])!='undefined'){
												arrOut.push(arr[i]);
								}
				}
				return arrOut;
};
function shipWithoutVoid (ship) {
				var shipOut=[];
				for (var i=0;i<ship.length;i++){
								if (ship[i]!=-1){
												shipOut.push(ship[i]);
								}
				}
				return shipOut;
};
function diedSort(a, b) {
				if(a.died>b.died){
								return 1;
				} else{
								return -1;
				}
}
function randomSort(a, b) {
				if(Math.random()>0.5){
								return 1;
				} else{
								return -1;
				}
}
// pull parts with more match points first
function matchabilityComponentSort(a, b) {
				if(components[a].match.length<components[b].match.length){
								return 1;
				}else if(components[a].match.length>components[b].match.length){
								return -1;
				}else if(a>b){
								return 1;
				}else if(a<b){
								return -1;
				} 
				return 0;
}
function reverseMatchabilityComponentSort(a, b) {
				if(components[a].match.length<components[b].match.length){
								return -1;
				}else if(components[a].match.length>components[b].match.length){
								return 1;
				}else if(b<a){
								return -1;
				}else if(b>a){
								return 1;
				} 
				return 0;
}
function alphaComponentSort(a, b) {
				if(components[a].name>components[b].name){
								return 1;
				}else if(components[a].name<components[b].name){
								return -1;
				}else if(a>b){
								return 1;
				}else if(a<b){
								return -1;
				} 
				return 0;
}
function lengthSort(a, b) {
				if(a.length>b.length){
								return 1;
				}else if(a.length<b.length){
								return -1;
				} else{
								return 0;
				}
}
function asteroidSort(a, b) {
				if(!a.alive && !b.alive){
								return 0;
				}else if (!a.alive || b.sprite.profile){
								return 1;
				}else if (!b.alive || a.sprite.profile){
								return -1;
				}
				if(game.physics.arcade.distanceBetween(a.sprite,player.sprite)>
												game.physics.arcade.distanceBetween(b.sprite,player.sprite)){
								return -1;
				}else{
								return 1;
				}
}
function threatSort(a, b) {
				if(!a.alive && !b.alive){
								return 0;
				}else if (!a.alive){
								return 1;
				}else if (!b.alive){
								return -1;
				}
				if (player.target==a.sprite) { //ensure player target is always #0
								return -1;
				}else if (player.target==b.sprite) {
								return 1;
				}

				if(a.sprite.profile/game.physics.arcade.distanceBetween(a.sprite,player.sprite)>
												b.sprite.profile/game.physics.arcade.distanceBetween(b.sprite,player.sprite)){
								return -1;
				}else{
								return 1;
				}
}
//////
//
//  There is so much wrong in this.
//    But it's such a pleasure
//      just to hack this out
//  and not worry about it.
//
//////

dragPart = function(x,y,sheet,index){
				this.sprite = game.add.sprite(x,y,sheet,index);
				this.sprite.visible = false;
				this.sprite.alive = false;
};
dragPart.prototype.initDragPart=function(x,y,sheet,index){
				this.sprite.loadTexture(sheet,index);
				this.sprite.reset(x-x%16,y-y%16);
				this.sprite.bringToTop();
				this.sprite.alive = true;
				this.sprite.visible = true;
				this.index = index;
				this.sprite.inputEnabled=true;
				this.sprite.input.enableDrag(false,true);
				this.sprite.input.snapOnRelease=true;
				this.sprite.input.snapX=16;
				this.sprite.input.snapY=16;
};
dragPart.prototype.dispose=function(x,y,sheet,index){
				this.sprite.inputEnabled=false;
				this.sprite.input.destroy();
				this.sprite.kill();
}
dragPart.prototype.update = function(){
				if(this.sprite.alive){
								if(!game.input.activePointer.isDown){
												if(this.sprite.x >= ui.partswindow.x &&
																				this.sprite.x <= ui.partswindow.x + ui.partswindow.width &&  
																				this.sprite.y >= ui.partswindow.y &&
																				this.sprite.y <= ui.partswindow.y + ui.partswindow.height){
																var n=0;
																//prevent player from destroying the last part  
																for (var i=0;i<ui.parts.length;i++){
																				if(ui.parts[i].sprite.alive){
																								n+=1;
																				}
																}
																if (n == 1){
																				this.sprite.reset(0,0);
																				ui.partsArray();
																}else{
																				if (!cheatmode){
																								playerStats.inventory.push(this.index);
																				}
																				this.sprite.kill();        
																				ui.cullParts();
																				ui.updatePart();
																				ui.partsArray(); //recalc rectangle
																}
												}
								}
				}
}
dragPartsPool = function(){
				this.parts=[];
				for(var i=0;i<50;i++){
								this.parts.push(new dragPart(0,0,'parts',0));
				}
};
dragPartsPool.prototype.get = function (x,y,sheet, index){

				for (var i=0;i<this.parts.length;i++){
								if(!this.parts[i].sprite.alive){
												break;
								}
				}
				if(i==this.parts.length){
								this.parts.push(new dragPart(x,y,'parts',index));
				}
				this.parts[i].initDragPart(x,y,'parts',index);
				return this.parts[i];
}
partsPool = function(){
				this.parts=[];
				for(var i=0;i<150;i++){
								this.parts.push(new shipPart(0,0,'parts',0,dummy));
								this.parts[i].sprite.kill();

				}
};
partsPool.prototype.get = function (x,y,index,targetSprite){
				this.parts.sort(randomSort);

				for (var i=0;i<this.parts.length;i++){
								if(!this.parts[i].sprite.alive){
												break;
								}
				}
				if(i==this.parts.length){
								this.parts.push(new shipPart(x,y,'parts',index,targetSprite));
				}else{
								this.parts[i].initShipPart(x,y,index,targetSprite);
				}
				return this.parts[i];
}
shipPart = function(x,y,sheet,index,targetSprite){
				this.game = game;
				this.sprite = game.add.sprite(x,y,'parts',index);
				game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
				this.initShipPart(x,y,index,targetSprite);
};
shipPart.prototype.initShipPart = function (x,y,index,targetSprite){

				if(typeof(x)!='undefined'){
								this.offsetx = x;
				}
				if(typeof(y)!='undefined'){
								this.offsety = y;
				}
				if(typeof(index)!='undefined'){
								this.component = index;
				}
				if(typeof(targetSprite)!='undefined'){
								this.target = targetSprite;
				}
				this.sprite.animations.add('a',[this.component]);
				this.sprite.animations.play('a');
				this.alive = true;
				killTweensFromSprite(this.sprite);
				this.sprite.alive=true;
				this.sprite.exists=true;
				this.sprite.alpha=1;
				this.sprite.visible = true;
				this.sprite.scale.setTo(targetSprite.scale.x, targetSprite.scale.y);
				this.sprite.reset(this.offsetx,this.offsety);
				this.sprite.anchor.setTo(0.5,0.5);
				this.sprite.bringToTop();
}
shipPart.prototype.update = function(){

				this.sprite.exists=true;
				var ons = onscreen(this.target.x,this.target.y);
				if(ons){
								var lightSpot=undefined;
								lightSpot={x:player.sprite.body.x+(player.sprite.body.width*0.5)+(Math.cos(player.sprite.rotation)*player.sprite.body.width*0.6),y:player.sprite.body.y+(player.sprite.body.width*0.5)+(Math.sin(player.sprite.rotation)*player.sprite.body.width*0.6)};
								//avoid div by 0
								var targetOffset={x:this.target.body.x+(this.target.body.width*0.5)+(Math.cos(this.target.rotation)*this.target.body.width*-0.05),y:this.target.body.y+(this.target.body.width*0.5)+(Math.sin(this.target.rotation)*this.target.body.width*-0.05)};
								var spriteOffset={x:this.sprite.body.x+(this.sprite.body.width*0.5),y:this.sprite.body.y+(this.sprite.body.width*0.5)};  
								var lightness = game.physics.arcade.distanceBetween(spriteOffset, lightSpot)/Math.sqrt(Math.pow(Math.min(resolutionX,resolutionY),2));
								lightness = lightness == 0 ? 0 : Math.cos((Math.PI*0.5)+(lightness*Math.PI*0.5));
								var lightness2 = 0.5;
								var partDist = game.physics.arcade.distanceBetween(spriteOffset,targetOffset);
								if(partDist>0){
												lightness2 = game.physics.arcade.distanceBetween(targetOffset,lightSpot) - game.physics.arcade.distanceBetween(spriteOffset,lightSpot);
												lightness2/=partDist;
								}
								var lightnessAngle = game.physics.arcade.angleBetween(lightSpot,spriteOffset);
								if(this.target.name=='player'){
												lightnessAngle=1;
								}else{
												lightnessAngle=Math.abs(compareAngles(lightnessAngle,player.sprite.rotation));
												lightnessAngle=Math.max(0,1.5-lightnessAngle);
								}

								lightness = lightness+1;
								lightness2 = lightness2+1; //(lightness + lightness2)/-2;
								lightness2 /= 2;
								lightness=lightness+(lightness2*lightnessAngle*headlightIntensity*1.5)+0.3;
								lightness/=2;
								lightness=Math.max(lightness,0.3);
								this.sprite.alpha=this.target.alpha;
								if(this.sprite.alpha==1 && lightness > 1){
												this.sprite.alpha=lightness;
								}
								lightness=Math.min(lightness,1);
								this.sprite.tint = (parseInt(this.target.r * lightness) << 16) + (parseInt(this.target.g*lightness) << 8) + parseInt(this.target.b * lightness);
				}
				if(this.target.alive){
								this.sprite.scale.setTo(this.target.scale.x);
				}else{
								this.sprite.tween=game.add.tween(this.sprite.scale).to({x:0,y:0},randomRange(1500,15000), Phaser.Easing.Linear.Out, true, 0, false);
								this.sprite.alpha=1;
				}
				this.sprite.visible=ons;
				var scale = this.sprite.scale.x;
				if (this.target.alive && this.alive) {
								this.sprite.angle = this.target.angle;
								this.sprite.x = this.target.x + (this.offsetx * scale * Math.cos(game.math.degToRad(this.target.angle)));
								this.sprite.y = this.target.y + (this.offsety * scale * Math.cos(game.math.degToRad(this.target.angle)));
								this.sprite.x -= (this.offsety * scale * Math.sin(game.math.degToRad(this.target.angle)));
								this.sprite.y += (this.offsetx * scale * Math.sin(game.math.degToRad(this.target.angle)));
								this.sprite.body.velocity = this.target.body.velocity;
				}else if(!ons){
								this.sprite.exists=false;
				}

};
lootItem = function(x,y,sheet,index){
				this.game = game;
				this.alive = true;
				this.sprite = game.add.sprite(x,y,sheet,index);
				game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
				this.sprite.anchor.setTo(0.5,0.5);
				this.sprite.bringToTop();
				this.sprite.index=index;
};

enemyShip = function (index, game, targetSprite, bullets, shipList, thrust) {

				this.target = targetSprite;

				var x = this.target.x + (randomSign() * randomRange(750,2000));
				var y = this.target.y + (randomSign() * randomRange(750,2000));

				this.game = game;
				this.shipList = shipList;
				this.sprite = game.add.sprite(x, y, 'parts', 1023);
				game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
				this.bullets = bullets;
				this.sprite.name = index;
				this.thrust=thrust;
				this.initEnemyShip();


};

enemyShip.prototype.takeEnergy = function (amt, forgive){

				var ret;
				ret=false;

				if(typeof(forgive)=='undefined'){
								forgive=false;
				}
				if(this.energy >= amt){
								this.energy-=amt;
								ret=true;
								this.nextEnergy = game.time.now + this.energyRate;
				}
				if(forgive && this.energy == this.energyMax){
								this.energy-=amt;
								ret=true;
								this.nextEnergy = game.time.now + this.energyRate;
				}
				return ret;
}

enemyShip.prototype.initEnemyShip = function(ship) {

				this.sprite.rotation=Math.random()*2*Math.PI;

				this.thrustBehavior=tinySmoke;

				this.crew=1;
				this.crewMax=2;

				this.profileOnFire=false;
				var x = this.target.x + (Math.cos(-1 * this.sprite.rotation) * (randomRange(960,1500) + player.sprite.body.velocity.x));
				var y = this.target.y + (Math.sin(-1 * this.sprite.rotation) * (randomRange(540,1500) + player.sprite.body.velocity.y));

				if(player.target==this.sprite){
								player.target=player.sprite;
				}
				this.sprite.r=255;
				this.sprite.g=255;
				this.sprite.b=255;
				this.TODO=0;
				this.organicArmor=0;
				this.questionBox=0;
				this.nextOre=0;
				this.nextOrganicArmorPing=0;
				this.nextThrust=0;
				this.radarError=0;
				this.fireSound=ui.sound_pew3;
				this.built=false;
				this.sprite.reset(x,y);
				midBoom(explosions,4,x,y);
				this.ship = this.shipList[Math.floor(randomRange(0,this.shipList.length))];
				this.destroyParts()
								this.effects=function(){};
				this.sprite.profile = 250;
				this.sawDamage=9999;
				this.sprite.profileDecay = 166;
				this.nextProfileDecay = 0;
				this.aggroList = [];
				this.holdThrust=0;
				this.oreEnergy=0;
				this.oreChance=0.09;
				this.acceleration=1;
				this.health = 3;
				this.bulletHitBehavior=[];
				this.updateBehavior=[];
				this.bulletBehavior=[];
				this.bulletSparkle=glow;
				this.ai = aiModes['enemy'];
				this.alive=true;
				this.behavior=defaultBehavior;
				this.sprite.body.drag.x=0;
				this.sprite.body.drag.y=0;
				this.altCooldown=0;
				this.shieldCooldown=0;
				this.cooldown114=0;
				this.died=0;
				this.turnRate=0.5;
				this.fireCounter = 0;
				this.fireCounterReset = 0;
				this.fireRate = 300;
				this.fireVelocity = 400;
				this.fireDamage = 2;
				this.fireRange = 1000;
				this.fireMass = 0.1;
				this.fireEnergy = 2;
				this.fireTracking = 0;
				this.speed = 0;
				this.energy=0;
				this.energyMax=10;
				this.energyRate=1000;
				this.energyAmount=2;


				this.nextEnergy = 0;
				this.nextEnergy4 = 0;
				this.nextFire = game.time.now+randomRange(1000,8000);
				this.alive = true;
				this.parts = [];
				this.sprite.visible = true;
				this.sprite.anchor.setTo(0.5, 0.5);
				this.bulletSprite = 0;
				this.bulletBlendMode = 1;
				this.parts = [];

				this.sprite.body.setSize(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,0,0);

				this.sprite.body.mass = shipWithoutVoid(this.ship).length*10000

								this.altCheck = function(){return false;};
				this.energyReserve = 0;
				this.alt = function(){
								if(game.time.now>this.altCooldown){
												sparks(pew,this.sprite);
												this.altCooldown=game.time.now+1000;
								}
				}


				this.sprite.angle = game.rnd.angle();

				this.sprite.body.maxVelocity.setTo(420,420);

				applyBonuses(this);

				this.sprite.body.velocity.x=randomRange(0.3,1)*Math.cos(this.sprite.rotation)*this.sprite.body.maxVelocity.x;  
				this.sprite.body.velocity.y=randomRange(0.3,1)*Math.sin(this.sprite.rotation)*this.sprite.body.maxVelocity.y;  

				this.lastVelocityX = this.sprite.body.velocity.x;
				this.lastVelocityY = this.sprite.body.velocity.y;


				game.physics.arcade.velocityFromRotation(this.sprite.rotation, 100, this.sprite.body.velocity);
				this.health*=enemyHealthCoef;
				this.healthMax*=enemyHealthCoef;
}
enemyShip.prototype.destroyParts = function() {
				if(typeof(this.parts)!='undefined'){
								for(var i=0; i<this.parts.length;i++)
								{
												this.parts[i].sprite.kill();
								}
				}
				this.parts=[];
}
enemyShip.prototype.spawnCorpses = function(numCorpses) {
				var bullet;
				for (var i = 0; i < numCorpses; i++){
								bullet = this.spawnBullet(false);
								if(bullet){
												bullet.blendMode=0;
												bullet.scale.setTo(randomSign()*randomRange(0.9,1.1),randomSign()*randomRange(0.9,1.1));
												bullet.tracking = 0;
												bullet.bulletSprite=13;
												bullet.lifespan=60000;
												bullet.animations.play(bulletTypeName(bullet.bulletSprite));
												bullet.sparkle=airPuffs;
												bullet.nextSparkle=game.time.now;
												bullet.damage=0;
												bullet.tint=randomVividColor(64,255,64,255,64,255);
												bullet.reset(this.sprite.body.x+randomRange(0,this.sprite.body.width),this.sprite.body.y+randomRange(0,this.sprite.body.width));
												bullet.body.velocity.setTo(randomRange(-100,100)+player.sprite.body.velocity.x,randomRange(-100,100)+player.sprite.body.velocity.y);
												bullet.body.angularVelocity=randomRange(75,130)*randomSign();
												bullet.bulletHitBehavior=[function(sprite,bullet){
																if(sprite.name=='player'&&playerStats.crew<player.crewMax){
																				playerStats.crew+=1;
																				addXp(1000);
																				ui.addDamageNumber(player.sprite.body.x,player.sprite.body.y,1,'+1000 xp',true);


																				shieldEffect(explosions, 4, player.sprite.x, player.sprite.y, player.sprite.body.velocity.x, player.sprite.body.velocity.y, player.ship.length);
																				ui.sound_beep.play();
																				player.sprite.alpha=6;
																				pause(500,sprite.x,sprite.y);
																				game.add.tween(player.sprite).to({alpha:1},700, Phaser.Easing.Circular.Out, true, 0, false);
																				sparkleBoom(sparkleExplosions,0,8,bullet.x,bullet.y);  
																}
																else
																{
																				pause(2000,sprite.x,sprite.y);
																				goreBoom(explosions,sprite.x,sprite.y);
																}
												}];
								}
				}
}
enemyShip.prototype.damage = function(dmg, aggro, bulletVelocity) {

				if(this.health==0){
								dmg=0;
								for(var i=0;i<this.parts.length;i++){
												this.parts[i].sprite.kill();
												this.cullParts();
								}  
								this.alive = false;
								this.died=game.time.now+10000;
				}

				if(typeof(aggro)!='undefined'){
								var aggroShip = ownerFromName(aggro.name);
								var retarget = false;

								if(confusionCooldown > game.time.now && Math.random() > 0.4){
												retarget=true;
								}

								if(aggroShip.ship == this.ship){
												if(Math.random()<0.01){
																retarget=true;
												}
								}else if(aggroShip.shiplist == this.shiplist){
												if(Math.random()<dmg/this.health){
																retarget=true;
												}
								}else{
												retarget=true;  
								}
								if(retarget){
												this.aggroList.push(aggro);
												this.target = aggro;
								}
				}

				if(this.shield){
								midBoom(explosions,4,this.sprite.x,this.sprite.y);
				}else if(dmg > 0){
								if(this.ai!=aiModes['asteroid']){
												var dn = parseInt(this.health)-parseInt(this.health-damageCoef*dmg);
												ui.addDamageNumber(this.sprite.x,this.sprite.y,dn);
								}
								this.health -= damageCoef * dmg;
								if(this.health>0){
												this.sprite.r=255 * (1 - (this.health/this.healthMax));
												this.sprite.g=255 * (this.health/this.healthMax);
												this.sprite.b=0;
												this.sprite.alpha=6;
												game.add.tween(this.sprite).to({r:255,g:255,b:255,alpha:1},400, Phaser.Easing.Exponential.Out, true, 0, false);

								}else{
												this.sprite.r=255;
												this.sprite.g=255;
												this.sprite.b=255;
								}
				}

				if(this.behavior=='neutral'){
								this.behavior='chasing';
				}

				if (this.health <= 0 && this.health + (damageCoef*dmg) >= 0){
								this.alive = false;
								var pan = false;
								this.died=game.time.now+10000;
								if (this.ai==aiModes['asteroid'] && onscreen(this.sprite.x,this.sprite.y)){
												asteroidBoom(explosions,this.sprite.x,this.sprite.y);
								}else{
												sparkExplosion(pew, this.sprite);  
												bigBoom(explosions,this.sprite.x,this.sprite.y);
												if(Math.random()<baseCorpseRate+(0.02*Math.sqrt(this.ship.length))){
																this.spawnCorpses(randomInt(1,Math.pow(this.ship.length,1/2.5)));
																pan=true;
												}
								}
								for (var j = 0; j < this.parts.length; j++) {
												if(Math.random() < this.oreChance){
																spawnLoots(Math.floor(randomRange(0,4)), this.sprite.x, this.sprite.y);
																this.parts[j].sprite.kill();
												}else if(Math.random() < (componentDropRate + player.dropRate) && components[this.parts[j].component].drops){ 
																spawnComponent(this.parts[j].component, this.sprite.x, this.sprite.y);
																pan=true;
																this.parts[j].sprite.kill();    
												}else if(this.questionBox){
																foo=components[0];  
																while (!foo.drops){
																				var cmp = parseInt(randomRange(0,components.length));
																				foo=components[cmp];
																}
																var drop = spawnComponent(cmp, this.sprite.x,this.sprite.y);
																if(drop && typeof(this.sprite)!='undefined'){
																				drop.body.velocity.x=this.sprite.body.velocity.x;
																				drop.body.velocity.y=this.sprite.body.velocity.y;
																}
																this.questionBox=false;
												}else if(this.health == 0 && dmg == 0){
																this.parts[j].sprite.kill();
												}else{
																var tempX = this.parts[j].sprite.body.velocity.x;
																var tempY = this.parts[j].sprite.body.velocity.y;

																this.parts[j].sprite.body.velocity = game.physics.arcade.velocityFromRotation(this.game.physics.arcade.angleBetween(this.sprite, this.parts[j].sprite), 
																								randomRange(50,200)*(Math.random()<0.2?randomRange(2,5):1));

																if(typeof(bulletVelocity)!='undefined'){
																				this.parts[j].sprite.body.velocity.x = this.parts[j].sprite.body.velocity.x + (bulletVelocity.x*.05);
																				this.parts[j].sprite.body.velocity.y = this.parts[j].sprite.body.velocity.y + (bulletVelocity.y*.05);
																}
																this.parts[j].sprite.body.velocity.x += tempX;
																this.parts[j].sprite.body.velocity.y += tempY;
																game.add.tween(this.parts[j].sprite.body).to({angularVelocity:randomRange(75,400)},700,Phaser.Easing.Exponential.Out, true, 0, false);
												}
								}  
								if(this.ai!=aiModes['asteroid']){
												addXp(this.parts.length*10);
								}
								this.cullParts();
								this.sprite.kill();
								if(typeof(playerStats.mission.win.killType)!='undefined'){
												if(playerStats.mission.win.killType==this.shipList){
																playerStats.kills+=1;
												}
								}
								if(pan){  
												pause(2000, this.sprite.x, this.sprite.y);
								}
								return true;
				}

				return false;

}
function addXp(xp) {
				playerStats.xp+=xp;
				var addedLevel=false;
				//if subtracting xp on death, recalculate the player level
				if(xp<0){
								playerStats.nextXp=100;
								playerStats.level=1;
				}
				while(playerStats.xp >= playerStats.nextXp){
								playerStats.nextXp *= 2;
								playerStats.level += 1;
								addedLevel=true;
				}
				if(xp<0){
								addedLevel=false;
				}
				if(addedLevel){
								ui.sound_ominous.play();
								ui.texts.push('You are now level ' + playerStats.level);
				}


}
//parts, when killed, are 'available' to be used in newly init'd ships
//this prevents destroyParts() from attempting to cull parts that have
//already been destroyed.
//if there is anything else that can happen between the ship's death
//and the destroyParts call, it wll need to be cleaned up in this
//fashion as well 
enemyShip.prototype.cullParts = function() {
				for(var j = 0; j < this.parts.length; j++) {
								if(!this.parts[j].sprite.alive){
												this.parts.splice(j,1);
												j-=1;
								}
				}  

}
enemyShip.prototype.left = function(a){
				this.sprite.angle-=this.turnRate*Math.abs(a)*game.time.physicsElapsed*shipSpeed;
};
enemyShip.prototype.right = function(a){
				this.sprite.angle+=this.turnRate*Math.abs(a)*game.time.physicsElapsed*shipSpeed;
};
enemyShip.prototype.up = function(a){

				this.speed = this.acceleration * Math.abs(a)*game.time.physicsElapsed*shipSpeed;

};
enemyShip.prototype.fire = function () {
				if (this.game.time.now > this.nextFire && forceDead(this.bullets) > 0 &&
												this.takeEnergy(this.fireEnergy)){
								this.fireSound.play();
								this.nextFire = this.game.time.now + this.fireRate;
								this.spawnBullet(true);
				}

}
enemyShip.prototype.spawnBullet = function (playerFired) {
				if(forceDead(this.bullets)){
								var bullet = this.bullets.getFirstDead();
								bullet.rotation=this.sprite.rotation;
								bullet.damage=this.fireDamage;
								bullet.reset(this.sprite.x + (Math.cos(this.sprite.rotation)*(this.sprite.body.width)), this.sprite.y + (Math.sin(this.sprite.rotation)*(this.sprite.body.width)));
								bullet.lifespan = this.fireRange; 
								bullet.alpha=1;
								bullet.tint=16777215;
								bullet.blendMode=this.bulletBlendMode;
								bullet.scale.setTo(1,1);
								bullet.tracking = this.fireTracking;
								bullet.body.width=16;
								bullet.body.height=16;
								bullet.nextTrack = 0;
								bullet.bulletHitBehavior=this.bulletHitBehavior;
								bullet.angularVelocity=0;
								bullet.animations.play(bulletTypeName(this.bulletSprite));
								bullet.bulletSprite=this.bulletSprite;    
								bullet.fireVelocity=this.fireVelocity;
								bullet.owner=this.sprite;
								game.physics.arcade.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
								bullet.body.velocity.x += 0.5 * this.sprite.body.velocity.x;
								bullet.body.velocity.y += 0.5 * this.sprite.body.velocity.y;
								bullet.target=this.target;
								bullet.sparkle=this.bulletSparkle;
								bullet.nextSparkle=game.time.now;
								for (var i = 0; i < this.bulletBehavior.length; i++) {
												this.bulletBehavior[i](bullet, playerFired);
								}

								if(playerFired){
												fireBoom(explosions,bullet.bulletSprite,bullet.x,bullet.y,bullet.rotation);
								}  
								return bullet;
				}
}


enemyShip.prototype.emitThrust = function() {

				if(typeof(this.parts[0])!='undefined' && this.parts[0].sprite.alpha>0.5){

								var x=this.sprite.x-(Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.5);
								var y=this.sprite.y-(Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.5);
								//this.thrust.emitParticle();
								this.thrustBehavior(explosions,x,y);
				}
}

enemyShip.prototype.update = function() {
				for (var i = 0; i < this.updateBehavior.length; i++) {
								this.updateBehavior[i](this);
				}
				if(!this.built && onscreen(this.sprite.x,this.sprite.y))
				{
								this.parts=createShip(this.ship,this.sprite);
								this.built=true;
				}
				//fugly hack to get around mysterious loss of velocity
				if(this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0){
								this.lastVelocityX = this.sprite.body.velocity.x;
								this.lastVelocityY = this.sprite.body.velocity.y;
				}else{
								this.sprite.body.velocity.x = this.lastVelocityX;
								this.sprite.body.velocity.y = this.lastVelocityY;
				}

				//rubberbanding
				if (this.game.physics.arcade.distanceBetween(this.sprite, player.sprite) > 4000 ||
												this.game.physics.arcade.distanceBetween(this.sprite, player.sprite) > 2500 && this.ai == aiModes['asteroid'] && !this.questionBox){

								if(Math.random()>0.5){
												this.target=player.sprite;
								}
								var x = this.target.x + (randomSign() * randomRange(960,1500) + player.sprite.body.velocity.x);
								var y = this.target.y + (randomSign() * randomRange(540,1500) + player.sprite.body.velocity.y);
								if(this.questionBox){
												x+=randomRange(2000,4000)*randomSign();
												y+=randomRange(2000,4000)*randomSign();
								}
								this.sprite.reset(x,y);  
								if(player.target==this.sprite){
												player.target=player.sprite;
								}
								midBoom(explosions,4,x,y);
								if(this.ai==aiModes['asteroid']){

												this.sprite.body.velocity = game.physics.arcade.velocityFromRotation(game.physics.arcade.angleBetween(this.sprite, player.sprite), randomRange(25,100));  
												this.sprite.body.angularVelocity=randomRange(25,100)*randomSign();
								if(playerStats.mission.asteroidPanic){
								this.sprite.body.velocity.x*=randomRange(0.6,4.4);
								this.sprite.body.velocity.y*=randomRange(0.6,4.4);
								this.sprite.body.angularVelocity*=randomRange(1,3);
	
								}}
				}
				this.sprite.profile = this.sprite.profileMax; //tracking this in detail is hard and unnecessary

				if(game.time.now>this.shieldCooldown){
								this.shield=false;
				}

				if(this.ai==aiModes['asteroidInit']){
								//init asteroid stuff
								this.sprite.body.velocity = game.physics.arcade.velocityFromRotation(game.physics.arcade.angleBetween(this.sprite, player.sprite), randomRange(30,130));  
								if(playerStats.mission.asteroidPanic){
								this.sprite.body.velocity.x*=randomRange(0.6,4.4);
								this.sprite.body.velocity.y*=randomRange(0.6,4.4);
								this.sprite.body.angularVelocity*=randomRange(1,3);
	
								}else{
								this.sprite.body.velocity.x*=Math.random();
								this.sprite.body.velocity.y*=Math.random();
								}
								this.sprite.body.angularVelocity=randomRange(25,100)*randomSign();
								if(playerStats.mission.asteroidPanic){
								this.sprite.body.angularVelocity*=randomRange(1,3);
								}
								if(this.oreChance<1){
												this.sprite.profile=0;
												this.sprite.profileMax=0;
								}
								this.ai=aiModes['asteroid'];
				}
				if(this.ai!=aiModes['asteroid']){
								var adjustedProfile = 200 + Math.pow(this.target.profile,profileExponent);

								if(this.target.alpha<0.5){
												adjustedProfile-=200;
								};


								if(!this.target.alive || 
																(game.physics.arcade.distanceBetween(this.sprite,this.target) > adjustedProfile * 1.5 && this.behavior=='chasing')){
												for(var i=0;i<this.aggroList.length;i++){
																if(this.aggroList[i].alive){    //this will cause the enemy to keep chasing the player if they were fired upon.
																				this.target=this.aggroList[i]; // I believe this may cause a 'feature' where grudges are kept beyond the grave. 
																				break;
																}
												}
												if(i>=this.aggroList.length){      
																this.target=player.sprite;
																this.behavior='neutral';
												}
								}
				}

				this.effects();

				if(this.ai!=aiModes['asteroid'] && this.alive && this.target.alive){


								if(this.ai==aiModes['simple']){
												this.sprite.rotation = this.game.physics.arcade.angleBetween(this.sprite, this.target);

												if (this.game.physics.arcade.distanceBetween(this.sprite, this.target) < this.fireRange * 0.75 &&
																				this.game.physics.arcade.distanceBetween(this.sprite, this.target) < adjustedProfile * (this.behavior=='neutral'? 1 : 2)){
																this.fire(); 

												}
								} else {
												//TODO add some kind of fleeing behavior

												var targetDistance = this.game.physics.arcade.distanceBetween(this.sprite, this.target);
												var targetAngle = this.game.physics.arcade.angleBetween(this.sprite, this.target); 


												if(this.behavior=='chasing'){
												}

												var diffAngle = compareAngles(this.sprite.rotation,targetAngle);
												for(var i=0; i< enemies.length;i++){

																var enDistance = this.game.physics.arcade.distanceBetween(this.sprite, enemies[i].sprite);
																if(enDistance < Math.abs(this.sprite.body.velocity.x) + Math.abs(this.sprite.body.velocity.y)){
																				var enAngle = this.game.physics.arcade.angleBetween(this.sprite, {x:enemies[i].sprite.x + enemies[i].sprite.body.velocity.x, y:enemies[i].sprite.y + enemies[i].sprite.body.velocity.y}); 
																				if(enDistance > 0 && enDistance < 0.2 * getHypo(this.sprite.body.velocity.x,this.sprite.body.velocity.y)){
																								diffAngle = compareAngles(this.sprite.rotation,enAngle)*-5;
																				}
																}
												}
												if(this.energy<this.energyReserve){
																diffAngle = compareAngles(this.sprite.rotation+Math.PI,targetAngle);
												}
												if(diffAngle*60>this.turnRate)
												{
																this.left(1);
												}else if(diffAngle*60<-this.turnRate){
																this.right(1);
												}






												if (targetDistance < adjustedProfile) {
																if(this.behavior=='neutral'){
																				this.behavior='chasing';
																}
												}

												if ((targetDistance < adjustedProfile * 2 && this.behavior!='neutral')){
																if(Math.abs(diffAngle)<0.25*Math.PI){
																				this.up(1);
																}
												}
												if (this.energy < this.energyReserve){
																this.up(1);
												}
												if (this.altCheck()){
																this.alt();
												}
												if (this.energy - this.fireEnergy > this.energyReserve && targetDistance < this.fireRange * (this.fireVelocity/1000) && 
																				targetDistance < adjustedProfile * 1.5){
																if(Math.abs(diffAngle) < 0.5){
																				this.fire(); 
																}

												}

								}


								if (this.speed > 0){
												if(game.time.now>(this.nextThrust||0)){

																this.emitThrust();

																partsToTop(this);  
																this.nextThrust = game.time.now + (250/this.acceleration); 
																addVelocity(this.sprite.rotation, this.sprite.body.maxVelocity.x/12, this.sprite.body.velocity);
																clampVelocity(this.sprite);
												}
												this.speed=0;
								}

								if (game.time.now > this.nextEnergy){
												if(this.energy+this.energyAmount>this.energyMax){
																this.energy=this.energyMax;  
												}else{
																this.energy+=this.energyAmount;
												}
												this.nextEnergy = game.time.now + this.energyRate;
								}
								if(this.ai != aiModes['asteroid'] && Math.random()>Math.cos((this.health-this.healthMax)/this.healthMax)){
												if(Math.random()>(this.health/this.healthMax)){
																if(Math.random()>(this.health/this.healthMax)+0.7){
																				var tmpX=this.sprite.x+randomRange(-.7*this.sprite.body.width,this.sprite.body.width);
																				var tmpY=this.sprite.y+randomRange(-.7*this.sprite.body.width,this.sprite.body.width);
																				unstableSmoke(explosions, tmpX,tmpY);
																}else{
																				sparks(pew,this.sprite);
																}
												}
								}
				}

}
;
var resolutionX=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var resolutionY=Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-20;
var game = new Phaser.Game(resolutionX, resolutionY, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {
				hello =  game.add.text(resolutionX*0.5,resolutionY*0.4, 'LOADING',{ font:'12px acknowledge', fill: 'rgb(196,150,255)', align: 'center' })
								game.load.spritesheet('parts', 'assets/parts.png', 16, 16);

				game.load.script('blurX', 'BlurX.js');
				game.load.script('blurY', 'BlurY.js');
				game.load.image('station', 'assets/station.png');
				game.load.image('frob1', 'assets/frob1.png');
				game.load.image('partswindow', 'assets/partswindow.png');
				game.load.spritesheet('bullet', 'assets/bullets.png',16,16);
				game.load.image('planets', 'assets/planets.png');
				game.load.image('nebula', 'assets/nebula.png');
				game.load.image('planetslod', 'assets/planetslod.png');
				game.load.image('planetfall', 'assets/planetfall.png');
				game.load.image('planetdirt', 'assets/planetdirt.png');
				game.load.image('starfield2', 'assets/starfield2.png');
				game.load.image('starfield6', 'assets/starfield6.png');
				game.load.image('starfield4', 'assets/starfield4.png');
				game.load.image('haze', 'assets/haze.png');
				game.load.image('haze2', 'assets/haze2.png');
				game.load.spritesheet('sparkles', 'assets/sparklescyan.png',8,8);
				game.load.spritesheet('sparklescyan', 'assets/sparklescyan.png',8,8);
				game.load.spritesheet('thrust', 'assets/thrust.png',8,8);
				game.load.spritesheet('sparks', 'assets/sparks.png',8,8);
				game.load.spritesheet('explosions', 'assets/explosions.png',16,16);
				game.load.audio('pew1','assets/pew1.wav');
				game.load.audio('redalert','assets/redalert.wav');
				game.load.audio('beep','assets/beep.wav');
				game.load.audio('hit1','assets/hit1.wav');
				game.load.audio('boom1','assets/boom1.wav');
				game.load.audio('boom2','assets/boom2.wav');
				game.load.audio('plasma','assets/plasma.wav');
				game.load.audio('boop','assets/boop.wav');
				game.load.audio('complete','assets/complete.wav');
				game.load.audio('comms','assets/comms.wav');
				game.load.audio('pew2','assets/pew2.wav');
				game.load.audio('pew3','assets/pew3.wav');
				game.load.audio('blur','assets/blur.wav');
				game.load.audio('dock','assets/dock.wav');
				game.load.audio('ominous','assets/ominous.wav');
				game.load.audio('powerup','assets/powerup.wav');
				game.load.audio('missile','assets/missile.wav');
				game.load.audio('bullet','assets/bullet.wav');
}


var blurbStats = function(target){
				var burstDps = target.fireDamage*(1000/target.fireRate);
				var sustainedDps = target.fireDamage * (1000/((target.fireEnergy*target.energyRate)/target.energyAmount));
				var maxBurst = target.fireDamage*(target.energyMax/target.fireEnergy);
				var fireDamage = target.fireDamage;
				var shotsPerSecond = 1000/target.fireRate;
				var fireEnergy = target.fireEnergy;
				var acceleration = target.acceleration;
				var maxVelocity = target.sprite.body.maxVelocity.x;
				var chargeTime = target.energyMax/(target.energyAmount*(1000/target.energyRate));
				var turnRate = target.turnRate;
				var health = target.health;
				var radarTargets = target.radarTargets;

				var ret = '';
				ret += ' burstDps: ' + parseFloat(burstDps).toFixed(2);
				ret += ' sustainedDps: ' + parseFloat(sustainedDps).toFixed(2);
				ret += ' maxBurst: ' + parseFloat(maxBurst).toFixed(2);
				ret += ' chargeTime: ' + parseFloat(chargeTime).toFixed(2) +'s';
				//ret += ' fireDamage: ' + parseFloat(fireDamage).toFixed(2);
				//ret += ' shotsPerSecond: ' + parseFloat(shotsPerSecond).toFixed(2);
				//ret += ' fireEnergy: ' + parseFloat(fireEnergy).toFixed(2);
				ret += '\n';
				ret += ' acceleration: ' + parseFloat(acceleration).toFixed(2);
				ret += ' maxVelocity: ' + parseFloat(maxVelocity).toFixed(2);
				ret += ' turnRate: ' + parseFloat(turnRate).toFixed(2);
				ret += ' health: ' + parseFloat(health).toFixed(2);
				//ret += ' radarTargets: ' + parseFloat(radarTargets).toFixed(2);

				return ret;    
}


var mockPlayerShip = function(ship) {
				this.sprite = game.add.sprite(0, 0, 'parts', 1023);
				game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
				this.game = game;
				this.initPlayerShip(ship);
				this.thrust = game.add.emitter(0,0,0);
}
var playerShip = function(ship) {
				this.sprite = game.add.sprite(0, 0, 'parts', 1023);
				game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
				this.game = game;
				this.initPlayerShip(ship);
				this.thrust = game.add.emitter(0,0,0); //this is the right number for continuous thrust
}
//parts, when killed, are 'available' to be used in newly init'd ships
//this prevents destroyParts() from attempting to cull parts that have
//already been destroyed.
//if there is anything else that can happen between the ship's death
//and the destroyParts call, it wll need to be cleaned up in this
//fashion as well 
playerShip.prototype.cullParts = function() {
				for(var j = 0; j < this.parts.length; j++) {
								if(!this.parts[j].sprite.alive){
												this.parts.splice(j,1);
												j-=1;
								}
				}  
}
playerShip.prototype.destroyParts = function() {
				if(typeof(this.parts)!='undefined'){
								for(var i=0; i<this.parts.length;i++)
								{
												this.parts[i].sprite.kill();
								}
								this.parts=[];
				}
}
playerShip.prototype.takeEnergy = function (amt, forgive){

				var ret;
				ret=false;

				if(typeof(forgive)=='undefined'){
								forgive=false;
				}
				if(this.energy >= amt){
								this.energy-=amt;
								ret=true;
								this.nextEnergy = game.time.now + this.energyRate;
				}
				if(forgive && this.energy == this.energyMax){
								this.energy-=amt;
								ret=true;
								this.nextEnergy = game.time.now + this.energyRate;
				}

				if(!ret){
								ui.energyLine.shudder=5;
				}

				return ret;
}
mockPlayerShip.prototype.initPlayerShip = function (ship, x, y) {
				if(typeof(x)=='undefined'){x=0};
				if(typeof(y)=='undefined'){y=0};
				this.thrustBehavior=tinySmoke;
				this.profileOnFire=false;
				this.sprite.r=255;
				this.sprite.g=255;
				this.sprite.b=255;
				this.organicArmor=0;
				this.TODO=0;
				this.nextOre=0;
				this.nextOrganicArmorPing=0;
				this.target=this.sprite;
				this.fireSound=ui.sound_pew3;
				this.firingSolution=standardFiringSolution;
				this.ai=aiModes['player']; //natural intelligence
				this.radarTargets=1;
				this.dropRate=0;
				this.effects=function(){};
				this.radarError=0;
				this.sawDamage=9999;
				this.radarShowInRange=false;
				this.radarShowInEnemyRange=false;
				this.radarOreTargets=4;
				this.oreEnergy=0;
				this.oreChance=0.09;
				this.acceleration=1;
				this.lootRange=250;
				this.sprite.reset(x,y);
				this.sprite.name = 'player';
				this.sprite.rotation=0;
				this.lastVelocityX = this.sprite.body.velocity.x;
				this.lastVelocityY = this.sprite.body.velocity.y;
				this.turnRate=0.5;
				this.health=8;
				this.alive=true;
				this.sprite.alive=true;
				this.bulletSprite=0;
				this.attackAngleThreshold = 0.03;
				this.bulletBlendMode=1;
				this.bulletHitBehavior=[];
				this.bulletBehavior=[];
				this.bulletSparkle=glow;
				this.updateBehavior=[];
				this.parts=[];
				this.speed = 0; //current
				this.fireCounter = 0;
				this.fireCounterReset = 0;
				this.fireRate = 300;
				this.fireVelocity = 400;
				this.fireDamage = 2;
				this.fireRange = 1000;
				this.fireMass = 0.1;
				this.fireEnergy = 2;
				this.fireTracking = 0;
				this.profileDecay = 166;
				this.profileShow = false;
				this.energy=0;
				this.energyMax=12;
				this.energyRate=1000;
				this.energyAmount=2;
				this.nextProfileDecay =0;
				this.nextEnergy4 = 0;
				this.nextEnergy = 0;
				this.nextFire = 0;
				this.altCooldown=0;
				this.shieldCooldown=0;
				this.cooldown114=0;
				this.sprite.visible=true;
				this.sprite.anchor.setTo(0.5, 0.5);
				this.sprite.body.maxVelocity.setTo(420,420);
				this.sprite.profile=250;  //max range at which opponents will attack. this will change dynamically
				this.sprite.body.drag.x=0;
				this.sprite.body.drag.y=0;
				this.sprite.body.collideWorldBounds = true; 
				this.altCheck = function(){return false;};
				this.energyReserve = 0;
				this.targetAngle=-666;
				this.behavior="manual";
				this.alt = function(){
								if(game.time.now>this.altCooldown){
												sparks(pew,this.sprite);
												this.altCooldown=game.time.now+1000;
								}
				}
				if(typeof(ship)=='undefined'){
								this.ship = ships[Math.floor(randomRange(0,ships.length))];
				}else{
								this.ship = ship;
				}
				applyBonuses(this);
}
playerShip.prototype.initPlayerShip = function (ship,x,y) {
				if(typeof(x)=='undefined'){x=0};
				if(typeof(y)=='undefined'){y=0};
				this.profileOnFire=true;
				this.crew=1;
				this.crewMax=2;
				this.thrustBehavior=tinySmoke;
				this.sprite.r=255;
				this.sprite.g=255;
				this.sprite.b=255;
				this.organicArmor=0;
				this.TODO=0;
				this.nextOre=0;
				this.nextOrganicArmorPing=0;
				this.target=this.sprite;
				this.fireSound=ui.sound_pew3;
				this.firingSolution=standardFiringSolution;
				this.ai=aiModes['player']; //natural intelligence
				this.radarTargets=1;
				this.dropRate=0;
				this.effects=function(){};
				this.radarError=0;
				this.sawDamage=9999;
				this.radarShowInRange=false;
				this.radarShowInEnemyRange=false;
				this.radarOreTargets=4;
				this.oreEnergy=0;
				this.oreChance=0.09;
				this.acceleration=1;
				this.lootRange=250;
				this.sprite.reset(x,y);
				this.sprite.name = 'player';
				this.sprite.rotation=0;
				this.lastVelocityX = this.sprite.body.velocity.x;
				this.lastVelocityY = this.sprite.body.velocity.y;
				this.turnRate=0.5;
				this.health=8;
				this.alive=true;
				this.sprite.alive=true;
				this.bulletSprite=0;
				this.attackAngleThreshold = 0.03;
				this.bulletBlendMode=1;
				this.bulletHitBehavior=[];
				this.bulletBehavior=[];
				this.bulletSparkle=glow;
				this.updateBehavior=[];
				this.destroyParts();
				this.parts=[];
				this.speed = 0; //current
				this.fireCounter = 0;
				this.fireCounterReset = 0;
				this.fireRate = 300;
				this.fireVelocity = 400;
				this.fireDamage = 2;
				this.fireRange = 1000;
				this.fireMass = 0.1;
				this.fireEnergy = 2;
				this.fireTracking = 0;
				this.profileDecay = 166;
				this.profileShow = false;
				this.energy=0;
				this.energyMax=12;
				this.energyRate=1000;
				this.energyAmount=2;
				this.nextProfileDecay =0;
				this.nextEnergy4 = 0;
				this.nextEnergy = 0;
				this.nextFire = 0;
				this.altCooldown=0;
				this.shieldCooldown=0;
				this.cooldown114=0;
				this.sprite.visible=true;
				this.sprite.anchor.setTo(0.5, 0.5);
				this.sprite.body.maxVelocity.setTo(420,420);
				this.sprite.profile=250;  //max range at which opponents will attack. this will change dynamically
				this.sprite.body.drag.x=0;
				this.sprite.body.drag.y=0;
				this.sprite.body.collideWorldBounds = true; 
				this.altCheck = function(){return false;};
				this.energyReserve = 0;
				this.targetAngle=-666;
				this.behavior="manual";
				this.alt = function(){
								if(game.time.now>this.altCooldown){
												sparks(pew,this.sprite);
												this.altCooldown=game.time.now+1000;
								}
				}
				if(typeof(ship)=='undefined'){
								this.ship = ships[Math.floor(randomRange(0,ships.length))];
				}else{
								this.ship = ship;
				}
				this.parts = createShip(this.ship, this.sprite);
				for(var i = 0; i<this.parts.length; i++){
								this.parts[i].sprite.name="player";  //this lets bullet hit behaviors detect the player correctly
				}  
				this.sprite.body.setSize(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,0,0);
				this.left = function(a){
								this.sprite.angle-=this.turnRate*Math.abs(a)*game.time.physicsElapsed*shipSpeed;
				};
				this.right = function(a){
								this.sprite.angle+=this.turnRate*Math.abs(a)*game.time.physicsElapsed*shipSpeed;
				};

				applyBonuses(this);

				playerStats.health = this.healthMax;
				playerStats.healthMax = this.healthMax;
}
playerShip.prototype.damage = function(dmg, aggro, bulletX, bulletY) {

				if(typeof(bulletX)=='undefined'){
								bulletX = 0;
				}
				if(typeof(bulletY)=='undefined'){
								bulletY = 0;
				}
				var bullet = {x:bulletX, y:bulletY};

				var closestPartOrdinal = -1;
				var closestPartDistance = 99999;

				if(this.shield){
								midBoom(explosions,4,this.sprite.x,this.sprite.y);
				}else if(dmg>0){
								var dn = parseInt(this.health)-parseInt(this.health-damageCoef*dmg);
								ui.addDamageNumber(this.sprite.x,this.sprite.y,dn);
								this.health -= damageCoef * dmg;
								this.radarError=Math.max(this.radarError,this.radarTargets+0.5)
												ui.healthLine.shudder = 5;
								if(this.health > 0){
												this.sprite.r=255 * (1 - (this.health/this.healthMax));
												this.sprite.g=255 * (this.health/this.healthMax);
												this.sprite.b=0;
												this.sprite.alpha=6;

												game.add.tween(this.sprite).to({r:255,g:255,b:255,alpha:1},400, Phaser.Easing.Exponential.Out, true, 0, false);
												//handle part loss
												if(this.ship.length > 1 && Math.random() > Math.sqrt((((player.health * 1.33) / player.healthMax )- (Math.pow(dmg,0.33)/16)))){
																for(var i=0;i<this.parts.length;i++){
																				var dist = game.physics.arcade.distanceBetween(this.parts[i].sprite,bullet);
																				if(dist < closestPartDistance){
																								closestPartDistance=dist;
																								closestPartOrdinal=i;
																				}      
																}
																if(typeof(this.parts[closestPartOrdinal]) != 'undefined'){

																				var part = this.parts[closestPartOrdinal];
																				//var msg = ui.texts.push('>lost ' + components[loot.component].name + '\n' + components[loot.component].flavor);
																				var msg = '>lost ' + components[part.component].name;
																				spawnDebris(part.component, part.sprite.x, part.sprite.y); 
																				bigBoom(explosions,part.sprite.x,part.sprite.y);
																				ui.sound_boom2.play();
																				removePlayerPartInFlight(closestPartOrdinal, dmg);    
																				var cullList = getCullable(contiguous(this.ship));
																				if(cullList.length){
																								msg='>MAJOR DAMAGE\n';
																								msg+=parseInt((100*(cullList.length+1))/(this.parts.length+1));
																								msg+='% systems disabled';
																				}
																				for(var f=cullList.length-1; f>=0; --f){
																								part = this.parts[cullList[f]];
																								spawnDebris(part.component, part.sprite.x, part.sprite.y); 
																								removePlayerPartInFlight(cullList[f], dmg);    
																				}
																				ui.skipText();
																				ui.texts.push(msg);
																				pause(500);
																}
												}
								}

				}

				if (this.health <= 0 && this.health + (damageCoef * dmg) >= 0){
								sparkExplosion(pew, this.sprite);  
								bigBoom(explosions,this.sprite.x,this.sprite.y);
								this.r=255;this.g=255;this.b=255;
								this.sprite.alpha=1;
								this.died=game.time.now+10000;
								this.alive = false;
								for (var j = 0; j < this.parts.length; j++) {

												this.parts[j].sprite.body.velocity = game.physics.arcade.velocityFromRotation(game.physics.arcade.angleBetween(this.sprite, this.parts[j].sprite), randomRange(200,400));
												this.parts[j].sprite.body.angularVelocity=randomRange((dmg+2*14),(dmg+2)*62);  
								}  

								this.sprite.kill();
								this.cullParts();  //defensive programming, in case I ever decide to do something that will kill a player sprite early :P
								nextSpawn = game.time.now+5000;
								playerStats.deaths+=1; //hahahahahhahahahahahahahhahahahahahaha
								addXp(parseInt(playerStats.xp/-2));
								playerStats.health=99999; //reset health for next ship
								fadeOut();
								return true;
				}

				return false;

}

playerShip.prototype.up = function(a){

				this.speed = this.acceleration * Math.abs(a) * game.time.physicsElapsed * shipSpeed;

};
playerShip.prototype.fire = function(){

				if (this.fireEnergy>this.energyMax){
								ui.error('FATAL: insufficient capacity to fire. reconfigure vessel immediately!');
				}


				if (game.time.now > this.nextFire && forceDead(bullets) > 0 && this.alive && this.takeEnergy(this.fireEnergy)){

								this.fireSound.play();
								currentBrightness=1; //may be used for a flash again one day
								if(this.profileOnFire){
												this.sprite.profile+=Math.floor(this.fireDamage*60);
								}
								if(this.sprite.profile>this.sprite.profileMax*10){
												this.sprite.profile=this.sprite.profileMax*10;
								}
								this.nextFire = game.time.now + this.fireRate;
								this.spawnBullet(true);
				}

};
playerShip.prototype.spawnBullet = function(playerFired){
				if(forceDead(bullets)){

								var bullet = bullets.getFirstDead();
								bullet.animations.play(bulletTypeName(this.bulletSprite));
								bullet.bulletSprite = this.bulletSprite;
								bullet.damage = this.fireDamage * targetDamageCoef;
								bullet.lifespan = this.fireRange;
								bullet.body.mass = this.fireMass;
								bullet.angularVelocity=0;
								bullet.tracking = this.fireTracking;
								bullet.tint=16777215;
								bullet.nextTrack = 0;
								bullet.bulletHitBehavior=[];
								bullet.bulletHitBehavior=this.bulletHitBehavior;
								bullet.alpha=1;
								bullet.blendMode=this.bulletBlendMode;
								bullet.scale.setTo(1,1);
								bullet.body.width=16;
								bullet.body.height=16;
								bullet.reset(this.sprite.x + (Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.75), this.sprite.y + (Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.75));
								bullet.rotation = this.sprite.rotation;
								bullet.owner=this.sprite;
								bullet.fireVelocity = this.fireVelocity; //mostly useless but want this to be accessible for bulletBehaviors
								game.physics.arcade.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
								bullet.body.velocity.x += 0.5 * this.sprite.body.velocity.x;
								bullet.body.velocity.y += 0.5 * this.sprite.body.velocity.y;
								bullet.sparkle=this.bulletSparkle;
								bullet.nextSparkle=game.time.now;

								for (var i = 0; i < this.bulletBehavior.length; i++) {
												this.bulletBehavior[i](bullet, playerFired);
								}

								if (playerFired){
												fireBoom(explosions,bullet.bulletSprite,bullet.x,bullet.y,bullet.rotation);
								}

								return bullet;
				}
}

playerShip.prototype.emitThrust = function() {
				var x=this.sprite.x-(Math.cos(this.sprite.rotation)*(thrustPosition(this.ship)+((this.sprite.body.width)*0.5)));
				var y=this.sprite.y-(Math.sin(this.sprite.rotation)*(thrustPosition(this.ship)+((this.sprite.body.width)*0.5)));
				//this.thrust.emitParticle();
				this.thrustBehavior(explosions,x,y);
}
var drawLine = function(graphics, line) {
				graphics.moveTo(line.start.x,line.start.y);
				graphics.lineTo(line.end.x,line.end.y);
}
var laserIntersection = function(laser,edges) {
				var bestDistance = game.physics.arcade.distanceBetween(laser.start,laser.end);
				var ret = false;
				for (var i = 0; i < edges.length; i++)
				{
								var intersect = laser.intersects(edges[i]);
								var distance = intersect ? game.physics.arcade.distanceBetween(laser.start,intersect) : Infinity;
								if(distance < bestDistance){
												ret = intersect;
								}

				}
				return ret;
}
//return which of point1 or point2 is closest to reference
var closest = function(reference,point1,point2){
				if(typeof(point1)=='undefined' && typeof(point2) == 'undefined'){
								return null;
				}else if(typeof(point1)=='undefined'){
								return point2;
				}else if(typeof(point2) == 'undefined'){
								return point1;
				}
				var dist1 = game.physics.arcade.distanceBetween(reference,point1);
				var dist2 = game.physics.arcade.distanceBetween(reference,point2);
				if(dist1>dist2){return point2;}
				else{return point1;}
}
var laserBulletBehavior = function(bullet,thickness,alpha,color1,color2,color3,damageModifier,laserHitBehavior){
				var tgt = ownerFromName(bullet.owner.name);
				var adjFireRange=Math.max(tgt.fireRange*laserRangeModifier,laserRangeMinimum);
				var modifier=Math.max(tgt.fireRate/1000,game.time.physicsElapsed);
				var color1X;
				var color1Y;
				var color1Point;
				var color2X;
				var color2Y;
				var color2Point;
				var color3X;
				var color3Y;
				var color3Point;
				var tempLength;  
				var closestIntersection;
				var closestIntersectionDistance = Infinity;
				var visualX;
				var visualY;  
				if(typeof(tgt.fireEnergy4)=='undefined'){
								tgt.fireEnergy4=tgt.fireEnergy*2.5;
				}
				tgt.fireEnergy=1;

				tgt.energy+=tgt.fireEnergy;
				tgt.sprite.profile+=Math.floor(tgt.fireDamage*60*modifier);
				tgt.takeEnergy(tgt.fireEnergy4*modifier, false);

				for (var i = 0; i < enemies.length; i++){
								if (enemies[i].alive && bullet.owner.name!=enemies[i].name){
												var laser = new Phaser.Line(bullet.x,bullet.y, bullet.x + Math.cos(tgt.sprite.rotation)*adjFireRange,bullet.y + Math.sin(tgt.sprite.rotation)*adjFireRange);
												var body = enemies[i].sprite.body;
												var topEdge = new Phaser.Line(body.x,body.y,body.x+body.width,body.y);
												var bottomEdge = new Phaser.Line(body.x,body.y+body.height,body.x+body.width,body.y+body.height);
												var leftEdge = new Phaser.Line(body.x,body.y,body.x,body.y+body.height);
												var rightEdge = new Phaser.Line(body.x+body.height,body.y,body.x+body.height,body.y+body.height);
												intersection = laserIntersection(laser,[topEdge,bottomEdge,leftEdge,rightEdge]); 
												if(intersection){
																if(game.physics.arcade.distanceBetween(laser.start,intersection) < closestIntersectionDistance){
																				closestIntersectionDistance=game.physics.arcade.distanceBetween(laser.start,intersection);
																				closestIntersection=intersection;
																}
																enemies[i].damage(tgt.fireDamage*damageModifier*modifier) ? ui.sound_randomBoom():0;
																laserHitBehavior(enemies[i]);
																if(typeof(enemies[i].nextLaserBoom)=='undefined'){
																				enemies[i].nextLaserBoom=0;
																}
																if(game.time.now > enemies[i].nextLaserBoom){
																				boom(explosions,tgt.bulletSprite,intersection.x,intersection.y);
																				enemies[i].nextLaserBoom=game.time.now+50;
																}
												}  

								}
				}

				color1X=bullet.x + Math.cos(tgt.sprite.rotation)*adjFireRange;
				color1Y=bullet.y + Math.sin(tgt.sprite.rotation)*adjFireRange;
				color1Point = new Phaser.Point(color1X,color1Y);
				color1Point = closest(bullet, color1Point, closestIntersection);
				tempLength=randomRange(0.7,0.9);
				color2X=bullet.x + Math.cos(tgt.sprite.rotation)*adjFireRange*tempLength;
				color2Y=bullet.y + Math.sin(tgt.sprite.rotation)*adjFireRange*tempLength;
				color2Point = new Phaser.Point(color2X,color2Y);
				color2Point = closest(bullet, color2Point, closestIntersection);
				tempLength*=randomRange(0.5,0.99);
				color3X=bullet.x + Math.cos(tgt.sprite.rotation)*adjFireRange*tempLength;
				color3Y=bullet.y + Math.sin(tgt.sprite.rotation)*adjFireRange*tempLength;
				color3X-=Math.cos(tgt.sprite.rotation)*tempLength;
				color3Y-=Math.sin(tgt.sprite.rotation)*tempLength;
				color3Point = new Phaser.Point(color3X,color3Y);
				color3Point = closest(bullet, color3Point, closestIntersection);

				otherGraphics.lineStyle(1, color1, alpha);
				otherGraphics.moveTo(bullet.x,bullet.y);
				otherGraphics.lineTo(color1Point.x,color1Point.y);

				for(var i=2;i<=thickness-2;i++){
								var segmentLength = 1-(((1-tempLength)/(thickness-4))*(i-1));
								color1X=bullet.x + Math.cos(tgt.sprite.rotation)*adjFireRange*segmentLength;
								color1Y=bullet.y + Math.sin(tgt.sprite.rotation)*adjFireRange*segmentLength;
								color1Point = new Phaser.Point(color1X,color1Y);
								color1Point = closest(bullet, color1Point, closestIntersection);
								otherGraphics.lineStyle(i, color1, alpha);
								otherGraphics.moveTo(bullet.x,bullet.y);
								otherGraphics.lineTo(color1Point.x,color1Point.y);
				}
				otherGraphics.lineStyle(thickness-1, color1, alpha);
				otherGraphics.moveTo(bullet.x,bullet.y);
				otherGraphics.lineTo(color2Point.x,color2Point.y);

				otherGraphics.lineStyle(thickness-3, color2, alpha);
				otherGraphics.moveTo(bullet.x,bullet.y);
				otherGraphics.lineTo(color2Point.x,color2Point.y);


				otherGraphics.lineStyle(thickness, color1, alpha);
				otherGraphics.moveTo(bullet.x,bullet.y);
				otherGraphics.lineTo(color3Point.x,color3Point.y);

				otherGraphics.lineStyle(thickness-2, color2, alpha);
				otherGraphics.moveTo(bullet.x,bullet.y);
				otherGraphics.lineTo(color3Point.x,color3Point.y);
				otherGraphics.lineStyle(thickness-3, color3, alpha);
				otherGraphics.moveTo(bullet.x,bullet.y);
				otherGraphics.lineTo(color3Point.x,color3Point.y);




				if(player.alive && bullet.owner.name!='player'){
								var laser = new Phaser.Line(bullet.x,bullet.y, bullet.x + Math.cos(tgt.sprite.rotation)*adjFireRange,bullet.y + Math.sin(tgt.sprite.rotation)*adjFireRange);
								var body = player.sprite.body;
								var topEdge = new Phaser.Line(body.x,body.y,body.x+body.width,body.y);
								var bottomEdge = new Phaser.Line(body.x,body.y+body.height,body.x+body.width,body.y+body.height);
								var leftEdge = new Phaser.Line(body.x,body.y,body.x,body.y+body.height);
								var rightEdge = new Phaser.Line(body.x+body.height,body.y,body.x+body.height,body.y+body.height);
								intersection = laserIntersection(laser,[topEdge,bottomEdge,leftEdge,rightEdge]); 
								if(intersection){
												if(game.physics.arcade.distanceBetween(laser.start,intersection) < closestIntersectionDistance){
																closestIntersectionDistance=game.physics.arcade.distanceBetween(laser.start,intersection);
																closestIntersection=intersection;
												}
												player.damage(tgt.fireDamage*damageModifier*0.5*game.time.physicsElapsed, intersection.x, intersection.y) ? ui.sound_randomBoom():0;
												laserHitBehavior(player);
												boom(explosions,tgt.bulletSprite,intersection.x,intersection.y);
												if(typeof(player.nextLaserBoom)=='undefined'){
																player.nextLaserBoom=0;
												}
												if(game.time.now > player.nextLaserBoom){
																boom(explosions,tgt.bulletSprite,intersection.x,intersection.y);
																player.nextLaserBoom=game.time.now+50;
												}
								}

				}
				bullet.kill();


}

var laserFiringSolution = function(attacker, target, fireRange, fireVelocity, angleModifier, turnRate) {
				var adjFireRange = Math.max(fireRange*laserRangeModifier, laserRangeMinimum);
				var bulletX = attacker.x + (Math.cos(attacker.rotation)*(attacker.body.width)*0.75);
				var bulletY = attacker.y + (Math.sin(attacker.rotation)*(attacker.body.width)*0.75);
				var laser = new Phaser.Line(bulletX,bulletY, bulletX + Math.cos(attacker.rotation)*adjFireRange,bulletY + Math.sin(attacker.rotation)*adjFireRange);
				var body = target.body;
				var topEdge = new Phaser.Line(body.x,body.y,body.x+body.width,body.y);
				var bottomEdge = new Phaser.Line(body.x,body.y+body.height,body.x+body.width,body.y+body.height);
				var leftEdge = new Phaser.Line(body.x,body.y,body.x,body.y+body.height);
				var rightEdge = new Phaser.Line(body.x+body.height,body.y,body.x+body.height,body.y+body.height);

				if(laser.intersects(topEdge) || laser.intersects(bottomEdge) || laser.intersects(leftEdge)   || laser.intersects(rightEdge)){
								return 1;
				}
				return null;

}
function optimizeComponentsOptimistic(ship){
				var outship = ship.slice(0);
				for(var i=0;i<outship.length;i++){
								if(outship[i]!=-1){
												var vc = variantComponents(ship[i]);
												vc.push(ship[i]);
												if(vc.length){
																var matchString = getOptimisticMatch(outship,i);
																var bestMatch = matchComponentToString(vc[vc.length-1],matchString) + 2;
																var bestMatchIndex = vc.length-1;
																for (var j=0;j<vc.length;j++){
																				var matches = matchComponentToString(vc[j],matchString);
																				if(matches>=bestMatch){
																								bestMatch = matches;
																								bestMatchIndex = j;  
																				}
																}    
																outship[i]=vc[bestMatchIndex];
												}
								}
				}
				return outship;
}
function addComponent(component,ship){

}
function optimizeComponents(ship){
				var outship = ship.slice(0);
				outship = optimizeComponentsOptimistic(outship);
				for(var i=0;i<outship.length;i++){
								if(outship[i]!=-1){
												var vc = variantComponents(ship[i]);
												vc.push(ship[i]);
												if(vc.length){
																var bestMatch = 0;
																var bestMatchIndex = 0;
																var matchString = getBestMatch(outship,i);
																for (var j=0;j<vc.length;j++){
																				var matches = matchComponentToString(vc[j],matchString);
																				if(matches>=bestMatch){
																								bestMatch = matches;
																								bestMatchIndex = j;  
																				}
																}    
																outship[i]=vc[bestMatchIndex];
												}
								}
				}
				return outship;
}
var variantComponents = function(partId){
				if(partId==-1 || typeof(components[partId])=="undefined"){
								return -1;
				}
				var myName = components[partId].name;
				var result = [];
				for (var i = 0; i < components.length;i++){
								if(components[i].name == components[partId].name && i != partId){
												result.push(i);
								}
				}
				return result;
}
var randomVariantComponent = function(partId){
				if (partId == -1){
								return -1;
				}
				var partsList = variantComponents(partId).push(partId);

				if(!partsList.length){
								return partId;
				}
				return partsList[parseInt(randomRange(0,partsList.length))];
}
var centralVariantComponent = function(partId){
				if (partId == -1){
								return -1;
				}
				if(components[partId].match.length >= 4){
								return partId;
				}
				var partsList = variantComponents(partId);

				for(var i=0;i<partsList.length;i++){
								if(components[partsList[i]].match.length >= 4){
												return partsList[i];
								}
				}
				return partId;
}
var oppositeVariantComponent = function(partId){
				if (partId == -1){
								return -1;
				}
				var partsList = variantComponents(partId);

				for(var i=0;i<partsList.length;i++){
								if(matchOppositeComponents(partId,partsList[i])){
												return partsList[i];
								}
				}
				return partId;
}
var randomPartsList = function(partsList,size){
				var result = [];
				for (var i = 0; i < size; i++){
								var partId = (parseInt(randomRange(0,partsList.length)));
								if(result.indexOf(partId) > -1){
												partId = (parseInt(randomRange(0,partsList.length)));
								}
								result.push(partsList[partId]);
								if(variantComponents(partId).length && Math.random()<0.5){
												partId = randomVariantComponent(parseInt(randomRange(0,partsList.length)));
												result.push(partsList[partId]);
								}
				}
				return result;
}
// use a "central" variant that matches on all sides for the center
var centralPartsOnArrayRow = function(array, row){
				var arraySlice=Math.sqrt(array.length);
				var ret = array.slice(0);
				for(var i=0;i<arraySlice;i++){
								ret[i+row*arraySlice]=centralVariantComponent(ret[i+row*arraySlice]);
				}
				return ret;
}

var invertPartsOnArrayRow = function(array, row){
				var arraySlice=Math.sqrt(array.length);
				var ret = array.slice(0);
				for(var i=0;i<arraySlice;i++){
								ret[i+row*arraySlice]=oppositeVariantComponent(ret[i+row*arraySlice]);
				}
				return ret;
}

var setSquareArrayRow = function(array, row, patch){
				var arraySlice=Math.sqrt(array.length);
				var ret = array.slice(0);
				for(var i=0;i<arraySlice;i++){
								ret[i+row*arraySlice]=patch[i];
				}
				return ret;
}
var getSquareArrayCol = function(array, col){
				var arraySlice=Math.sqrt(array.length);
				var ret = [];
				for(var  i=0;i<arraySlice;i++){
								ret.push(array[i*arraySlice+col]);
				}
				return ret;
} 
var getSquareArrayRow = function(array, row){
				var arraySlice=Math.sqrt(array.length);
				var ret = [];
				for(var  i=0;i<arraySlice;i++){
								ret.push(array[i+row*arraySlice]);
				}
				return ret;
}
var symmetrizeShip = function(ship){
				var arraySlice=Math.sqrt(ship.length);
				var half = ship.length/2;
				var halfSlice = arraySlice/2;
				var ret = ship.slice(0);
				for(var i = arraySlice; i>halfSlice; i--){
								var firstRow=getSquareArrayRow(ret,arraySlice-i);
								var secondRow=getSquareArrayRow(ret,i-1);
								var use=false;
								if(shipWithoutVoid(firstRow).length == 0){
												use=2;
								}
								if(shipWithoutVoid(secondRow).length == 0){
												use=1;
								}
								if (!use) {use = Math.random()>0.5 ? 1 : 2}
								if(use == 1){
												ret = setSquareArrayRow(ret,i-1,firstRow);
												ret = invertPartsOnArrayRow(ret,i-1);}else{
																ret = setSquareArrayRow(ret,arraySlice-i,secondRow);

																ret = invertPartsOnArrayRow(ret,arraySlice-i);}
				}
				if(arraySlice % 2 == 1){
								ret = centralPartsOnArrayRow(ret,parseInt(halfSlice));   
				}
				return optimizeComponents(ret);
}
var randomShip = function(partsList,size,extraParts,forceExact){
				if(typeof(extraParts)=='undefined'){
								extraParts=0;
				}
				if(typeof(forceExact)=='undefined'){
								forceExact=false;
				}
				var squareSize = size * size;
				var numParts=Math.max(parseInt(randomRange(squareSize/4,squareSize)),4);
				numParts+=extraParts;
				var myParts=randomPartsList(partsList,numParts);
				var center=parseInt(squareSize/2);
				var ship = [];
				var success = true;
				for (var i=0;i<squareSize;i++){
								ship[i]=-1;
				}
				var attempts = 0;
				var connected = 0;
				ship[center] = myParts[0];
				myParts.splice(0,1);
				while(myParts.length && attempts < 10 && connected < squareSize - 1){
								for (var i=0;i<myParts.length;i++) {
												myParts[i]=randomVariantComponent(myParts[i]);
												var newShip = ship.slice(0);
												//pick part
												newShip = calculatePartPosition3(0,0,myParts[i],ship,40-(attempts*4),false);
												if(newShip.join() != ship.join()){
																myParts.splice(i,1);
																i--;
																connected++;
												}
												ship=newShip;
								}
								attempts+=1;
				}
				//should not be happening
				for (var i=0;i<ship.length;i++){
								if(typeof(ship[i])=='undefined'){
												ship[i]=-1;
								}
				}
				if(shipWithoutVoid(ship).length < size) {
								success = false;
				}
				//box ships are ugly
				if(shipWithoutVoid(ship).length == ship.length && Math.random() > 0.1){
								success=false;
				}
				//so are ships of only one part  
				if(ship.filter(function(v,i) { return components[i].name==components[ship.lastIndexOf(v)].name; }).length<size){
								success=false;
				}

				var lastRowWasEmpty=true;
				var failNextChange=false;

				for(var i=0;i<size;i++){
								if(shipWithoutVoid(getSquareArrayRow(ship,i)).length==0){
												if(!lastRowWasEmpty){
																lastRowWasEmpty=true;
																failNextChange=true;
												}
								}else if (!lastRowWasEmpty && !failNextChange){
												lastRowWasEmpty=false;
								}else if (lastRowWasEmpty && failNextChange){
												success=false;
								}
				}

				if(success){
								return optimizeComponents(ship);
				}else{
								return randomShip(partsList,size,extraParts+size);
				}
}
var standardFiringSolution = function(attacker, target, fireRange, fireVelocity, angleModifier, turnRate) {

				var bulletStartX = attacker.x + (Math.cos(attacker.rotation)*(attacker.body.width));
				var bulletStartY = attacker.y + (Math.sin(attacker.rotation)*(attacker.body.height));
				// TODO make this work one day. Adjust firing location
				// for drift incurred while turning
				//      bulletStartX += attacker.body.velocity.x * Math.abs((angleModifier / turnRate));
				//          bulletStartY += attacker.body.velocity.y * Math.abs((angleModifier / turnRate));
				var bulletVelX = Math.cos(attacker.rotation + angleModifier) * fireVelocity ;
				var bulletVelY = Math.sin(attacker.rotation + angleModifier) * fireVelocity ;
				bulletVelX += attacker.body.velocity.x * 0.5 ;
				bulletVelY += attacker.body.velocity.y * 0.5 ;
				bulletVelX-=target.body.velocity.x;
				bulletVelY-=target.body.velocity.y;
				var bulletStart = new Phaser.Point(bulletStartX,bulletStartY);
				var targetDistance = game.physics.arcade.distanceBetween(target, bulletStart);
				var adjVelocity=getHypo(bulletVelX,bulletVelY);
				if(targetDistance > adjVelocity * (fireRange / 1000)){
								return null;
				}
				var interceptTime = targetDistance/adjVelocity;
				var targetRectangle = new Phaser.Rectangle(target.x, target.y, target.width, target.height);  
				var bulletWidth = 16;
				var bulletHeight = 16;

				for(var j=interceptTime*0.7;j<interceptTime*1.3;j+=0.01){

								var bulletEndX = bulletStartX + (bulletVelX * j);
								var bulletEndY = bulletStartY + (bulletVelY * j);
								var bulletProjection = new Phaser.Rectangle(bulletEndX,bulletEndY,bulletWidth,bulletHeight);
								if(targetRectangle.intersects(bulletProjection) ){
												return 1/targetDistance;
								}
				}

}
playerShip.prototype.update = function(){
				if(this.alive){

								for (var i = 0; i < this.updateBehavior.length; i++) {
												this.updateBehavior[i](this);
								}

								//fugly hack to get around mysterious loss of velocity
								if(this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0){
												this.lastVelocityX = this.sprite.body.velocity.x;
												this.lastVelocityY = this.sprite.body.velocity.y;
								}else{
												this.sprite.body.velocity.x = this.lastVelocityX;
												this.sprite.body.velocity.y = this.lastVelocityY;
								}

								if(Math.abs(this.sprite.body.angularVelocity) > this.turnRate * 100){
												this.sprite.body.angularVelocity = (this.sprite.body.angularVelocity>0?1:-1)*this.turnRate*100;
								}

								if(game.time.now>this.shieldCooldown){
												this.shield=false;
								}
								if(game.time.now>this.nextProfileDecay){
												if (Math.abs(this.sprite.profile-this.sprite.profileMax) < this.profileDecay)  {  
																this.sprite.profile=this.sprite.profileMax;
												}
												if (this.sprite.profile > this.sprite.profileMax){
																this.sprite.profile-=this.profileDecay;
												}else if (this.sprite.profile < this.sprite.profileMax){
																this.sprite.profile+=this.profileDecay;
												}
												this.sprite.profileMax+=10;
												this.nextProfileDecay=game.time.now+1000;
								}

								if (this.speed > 0){
												if(game.time.now>(this.nextThrust||0)){
																this.emitThrust();
																partsToTop(this);  
																this.nextThrust = game.time.now + (250/this.acceleration); 
																addVelocity(this.sprite.rotation, this.sprite.body.maxVelocity.x/12, this.sprite.body.velocity);
																//addVelocity(this.sprite.rotation, this.sprite.body.maxVelocity.x*(Math.sqrt(this.acceleration)/45), this.sprite.body.velocity);

																clampVelocity(this.sprite);


												}
												this.speed=0;
								}

								if (game.time.now > this.nextEnergy){
												if(this.energy+this.energyAmount>this.energyMax){
																this.energy=this.energyMax;  
												}else{
																this.energy+=this.energyAmount;
												}
												this.nextEnergy = game.time.now + this.energyRate;
								}
								if(Math.random()>Math.cos((this.health-this.healthMax)/this.healthMax)){
												if(Math.random()>(this.health/this.healthMax)){
																if(Math.random()>(this.health/this.healthMax)+0.7){
																				var tmpX=this.sprite.x+randomRange(-.7*this.sprite.body.width,this.sprite.body.width);
																				var tmpY=this.sprite.y+randomRange(-.7*this.sprite.body.width,this.sprite.body.width);
																				unstableSmoke(explosions, tmpX,tmpY);
																}else{
																				sparks(pew,this.sprite);
																}
												}
								}
								if(this.behavior=='move'){
												if(!this.target.alive){
																this.target = this.sprite;
												}
												if(this.target != this.sprite){
																var targetDistance = this.game.physics.arcade.distanceBetween(this.sprite, this.target);
																var targetAngle = this.game.physics.arcade.angleBetween(this.sprite, this.target); 


																var diffAngle = compareAngles(this.sprite.rotation,targetAngle);

																if ((this.energy - this.fireEnergy > this.energyReserve || this.energy == this.energyMax) && this.firingSolution(this.sprite, this.target, this.fireRange, this.fireVelocity,i, this.turnRate)){
																				if(Math.abs(diffAngle) < 0.5){
																								this.fire(); 
																				}

																}
												}

												var diffAngle = compareAngles(this.sprite.rotation,this.targetAngle);
												if(diffAngle*60>this.turnRate && !touchPressed)
												{
																this.left(1);
												}else if(diffAngle*60<-this.turnRate && !touchPressed){
																this.right(1);
												}
												if(game.input.activePointer.isDown && !touchPressed && Math.abs(diffAngle) < 0.2){
																this.up(1);
												}

								}
								if(this.behavior=='target'){

												if(!this.target.alive){
																this.target = this.sprite;
												}

												var fs = false;

												//handle corpse/collectible targeting
												if(typeof(this.target.owner)!='undefined'){


																if(!this.target.alive){
																				this.target = this.sprite;
																}
																if(this.target != this.sprite){
																				var targetDistance = this.game.physics.arcade.distanceBetween(this.sprite, this.target);
																				var timeToImpact = targetDistance/getHypo(this.sprite.body.velocity.x-this.target.body.velocity.x,this.sprite.body.velocity.y-this.target.body.velocity.y);
																				timeToImpact*=0.33;
																				var adjSprite = {
x: this.sprite.x + this.sprite.body.velocity.x * timeToImpact ,
	 y: this.sprite.y + this.sprite.body.velocity.y * timeToImpact 


																				};
																				var adjTarget = {
x: this.target.x + this.target.body.velocity.x * timeToImpact ,
	 y: this.target.y + this.target.body.velocity.y * timeToImpact 


																				};
																				var targetAngle = this.game.physics.arcade.angleBetween(adjSprite, adjTarget); 


																				var diffAngle = compareAngles(this.sprite.rotation,targetAngle);

																}

																var diffAngle = compareAngles(this.sprite.rotation,targetAngle);
																if(diffAngle*60>this.turnRate)
																{
																				this.left(1);
																}else if(diffAngle*60<-this.turnRate){
																				this.right(1);
																}
																if(Math.abs(diffAngle) < 0.05){
																				this.up(1);
																}



												}else if(this.target != this.sprite){
																var targetDistance = this.game.physics.arcade.distanceBetween(this.sprite, this.target);
																var adjTarget = new Phaser.Point(this.target.x+this.target.body.velocity.x*(targetDistance/this.fireVelocity),this.target.y+this.target.body.velocity.y*(targetDistance/this.fireVelocity));
																var targetAngle = this.game.physics.arcade.angleBetween(this.sprite, this.target); 
																var adjTargetAngle = this.game.physics.arcade.angleBetween(this.sprite, this.target); 


																var closestFSMatch = false; 
																for(var i = -1 * Math.PI; i < Math.PI; i+=0.03){
																				fs = this.firingSolution(this.sprite, this.target, this.fireRange, this.fireVelocity,i, this.turnRate);
																				if(fs && (!closestFSMatch || Math.abs(i) < closestFSMatch)){
																								closestFSMatch=Math.abs(i);

																								adjTargetAngle=(this.sprite.rotation + i);
																				}
																				if(fs && Math.abs(i)<this.attackAngleThreshold){
																								if (this.energy - this.fireEnergy > this.energyReserve || this.energy >= this.energyMax){    
																												this.fire(); 
																								}


																				}
																}

																var diffAngle = compareAngles(this.sprite.rotation,adjTargetAngle);

																if(diffAngle>game.math.degToRad(this.turnRate)*shipSpeed*game.time.physicsElapsed)
																{
																				this.left(1);
																}else if(diffAngle<game.math.degToRad(this.turnRate)*shipSpeed*game.time.physicsElapsed * -1){
																				this.right(1);
																}else if(diffAngle>0)
																{
																				this.left(diffAngle/(game.math.degToRad(this.turnRate)*shipSpeed*game.time.physicsElapsed      ));  
																}else if(diffAngle<0
																				){
																				this.right(diffAngle/(game.math.degToRad(this.turnRate)*shipSpeed*game.time.physicsElapsed * -1));
																}




																if(!closestFSMatch && Math.abs(diffAngle)<0.5){
																				this.up(1-Math.abs(diffAngle));
																}
																else if(this.nextFire < game.time.now - 3000 && targetDistance < this.fireRange * (this.fireVelocity/1500) || Math.abs(diffAngle)<1.0 && Math.abs(diffAngle)>0.3){

																				//                                        this.up(1);


																}

												}
								}
								if(this.behavior != 'manual'){
												if(this.target == this.sprite && this.behavior =='target'){
																this.targetAngle=this.sprite.rotation;    
																this.behavior='move';
												}
								}
				}
};
var touchPressed = 0;
var noMusic = /(android)/i.test(navigator.userAgent);
if (!window.location.href.match('voxxse')){
				noMusic = true;
}
noMusic = false;
var headlightIntensity=1;
var headlightGlowSprite;
var pauseResumeTime = 0;
var cameraTarget;
var isAndroid = navigator.userAgent.match(/android/i) ? true : false;
var player;
var pausedLastPlayerVelX;
var pausedLastPlayerVelY;
var pausedLastPlayerBodyX;
var pausedLastPlayerBodyY;
var pausedLastPlayerX;
var pausedLastPlayerY;
var blurX;
var blurY;

var nextLight = 0; 
var currentBrightness=1.0;
var mysteriousConstant=0.22;
var detailLod = 240;
var mockPlayer;
var nextMusic = 0;
var attackerTargetSizeThreshold = 0.5;
var laserRangeModifier=0.2;
var laserRangeMinimum=150;
var buttonLeft=0;
var buttonRight=0;
var buttonUp=0;
var buttonDown=0;
var buttonFire=0;
var buttonOther=0;
var buttonLight=0;
var buttonAlt=0;
var buttonEnter=0;
var shipSpeed = 1/0.015;
var otherGraphics;
var attackThreshold = 0.1;
var attemptTarget;
var confusionCooldown = 0;
var joystickUsed = false;
var pad1;
var hello;
var startParts = 1; //extra parts given to player at beginning!
var pool;
var dragPool;
var dummy;
var defaultPlayerShip = [66, 34, -1, -1];
var spawnShips=[
				[35,36,-1,-1],
				[71,-1,102,-1],
				[100,101,-1,-1],
				[80,85,-1,-1],
				[74,160,-1,-1],
				[131,37,-1,-1],
				[69,111,-1,-1],
				[128,-1,129,-1],
				[66,34,-1,-1]
];
var station; //we're going to keep this pretty much as a non-interactive sprite for now... it doesn't actually need to do anything
var frob1;

var profileExponent=0.9;
var componentDropRate = 0.12;
var hazeWhite,hazeRed,hazePurple;
var nebula2;
var nebula;
var planets = [];
var planet;
var planetlod;
var planetdirt;
var numBaddies = 9;
var numAsteroids = 19;
var enemies;
var loots;
var debris;
var sparkles;
var enemyBullets;
var enemyThrust;
var explosions;
var sparkleExplosions;
var logo;
var nextUIDelay=0;
var nextSpawn=0;
var nextCamera=0; //attract
var damageCoef=0.3; //global damage tuner
var baseCorpseRate = 0.08; 
var targetDamageCoef=5; //not so global damage tuner
var enemyHealthCoef=1; 
var cursors;
var pew;
var bullets;
var nextFire = 0;

var partShip;


var ui;
var gameUI = function () {
				this.parts = [];
				this.inventory = [];
				this.partsIndex = [];  //maps ship-array positions to dragPart objects
				this.partCost=20;
				this.currentPart = 0;
				this.currentPlayerPart = 0;
				this.texts = [];
				this.graphics = game.add.graphics(0,0);
				this.nextComms=0;
				this.nextCommsPing=false;
				this.nextRadarSound=0; 
				this.textLine = '';
				this.textIndex = 0;
				this.textLineIndex = 0;
				this.nextError=0;
				this.buildMode = 'select';
				this.nextFrobRadarPulse=0;
				this.buttons = [];
}
gameUI.prototype.toTop = function(c){  
				var p = c.parent;
				p.remove(c);
				p.add(c);
}
gameUI.prototype.initInventory = function () {

				for(var i=0;i<16;i++){
								this.inventory.push(game.add.sprite(-300+((i%4)*16),-100+(Math.floor(i/4)*16),'parts',0));
				}

}
gameUI.prototype.initButtons = function(selectedButtons) {

				this.clearButtons();

				this.buttons=selectedButtons.slice(0);

				var chunkX = resolutionX / 8;
				var chunkY = resolutionY / 8;
				this.chunkX = chunkX;
				this.chunkY = chunkY;
				var offsetX = chunkX / 8;
				var offsetY = chunkY / 8;
				for(var i=0;i<this.buttons.length;i++){
								this.buttons[i].adjX = offsetX + (chunkX * this.buttons[i].x);
								this.buttons[i].adjY = offsetY + (chunkY * this.buttons[i].y);
								this.buttons[i].button=(game.add.text(0,0,this.buttons[i].label,{ font: parseInt(chunkY) + 'px acknowledge', fill: 'rgb(220,240,240)', alpha: '0.6'}));
								this.buttons[i].flash=false;
								this.buttons[i].button.anchor.setTo(0.5,0.5);
								this.buttons[i].button.rotation=this.buttons[i].rotation;
								this.buttons[i].button.adjX=(chunkX*.375);
								this.buttons[i].button.adjY=(chunkY*.375);
				}
}

gameUI.prototype.buttonsPing = function(){

				var upperLeftCornerX = cameraTarget.x - (resolutionX / 2);
				var upperLeftCornerY = cameraTarget.y - (resolutionY / 2);
				for(var i=0;i<this.buttons.length;i++){

								//place button rectangle for hit indicators
								var padX =upperLeftCornerX + (this.buttons[i].x * this.chunkX) + (this.chunkX/8);
								var padY =upperLeftCornerY + (this.buttons[i].y * this.chunkY) + (this.chunkY/8);
								var fill = this.buttons[i].flash ? '0x326464' : '0x1278AC';
								var textColor = this.buttons[i].flash ? 'rgb(240,255,255)' : 'rgb(220,240,240)';
								this.buttons[i].button.fill = textColor;
								this.buttons[i].flash=false;
								this.graphics.beginFill(fill, 0.6);
								this.graphics.drawRect(padX, padY, this.chunkX * 0.75, this.chunkY * 0.75);
								this.buttons[i].button.x=upperLeftCornerX + this.buttons[i].adjX;
								this.buttons[i].button.y=upperLeftCornerY + this.buttons[i].adjY;
								this.buttons[i].button.x+= this.buttons[i].button.adjX;
								this.buttons[i].button.y+= this.buttons[i].button.adjY;
								this.toTop(this.buttons[i].button);
				}
}

gameUI.prototype.initSound = function(){
				this.sound_pew1 = game.add.audio('pew1');
				this.sound_pew2 = game.add.audio('pew2');
				this.sound_dock = game.add.audio('dock');
				this.sound_powerup = game.add.audio('powerup');
				this.sound_ominous = game.add.audio('ominous');
				this.sound_pew3 = game.add.audio('pew3');
				this.sound_blur = game.add.audio('blur');
				this.sound_missile = game.add.audio('missile');

				this.sound_hit1 = game.add.audio('hit1');
				this.sound_redalert = game.add.audio('redalert');
				this.sound_beep = game.add.audio('beep');
				this.sound_boom1 = game.add.audio('boom1');
				this.sound_boom2 = game.add.audio('boom2');
				this.sound_plasma = game.add.audio('plasma');
				this.sound_boop = game.add.audio('boop');
				this.sound_complete = game.add.audio('complete');
				this.sound_comms = game.add.audio('comms');
				this.sound_bullet = game.add.audio('bullet');
				this.currentMusic=undefined;
				this.music=[];
}
function checkForNewMusic(){
				if(!noMusic){
								if(typeof(ui.currentMusic)=='undefined'){
												ui.music_random()
								}else if(ui.currentMusic.ended){
												ui.music_random();
								}
				}
}
gameUI.prototype.music_random = function(){
				var rnd = randomInt(1,5);
				if(typeof(this.music[rnd])=='undefined'){
								this.music[rnd]=new Audio('assets/' + rnd + '.ogg');
				}
				this.currentMusic=this.music[rnd];
				this.currentMusic.play();
}
gameUI.prototype.sound_randomBoom = function(){
				if(Math.random()>0.5){
								this.sound_boom1.play();
				}else{
								this.sound_boom2.play();
				}

}
gameUI.prototype.error = function(msg) {
				if(game.time.now>this.nextError){    
								this.texts.push(msg);
								this.nextError=game.time.now+6000;
				}

}
gameUI.prototype.calculatePartPosition = function(x, y) {

				var outx = x | 0;
				var outy = y | 0;

				while(ui.partAt(outx,outy)){
								if(!ui.partAt(outx-16,outy)){
												outx-=16;
								}else if(!ui.partAt(outx+16,outy)){  
												outx+=16;
								}else if(!ui.partAt(outx,outy-16)){  
												outy-=16;
								}else if(!ui.partAt(outx,outy+16)){  
												outy+=16;
								}else if(Math.random()>0.5){
												outx+=randomSign()*16;
								}else{
												outy+=randomSign()*16;
								}
				}
				return {'x':outx,'y':outy};
}
var partAtArray = function (arr,idx){
				if(typeof(arr[idx])=='undefined'){
								return false;
				}
				if(arr[idx]==-1){
								return false;
				}
				return true;
}
var matchLocationArray = function(arrayIndex,partId,partsArray){
				var matches = 0;

				if(partsArray[arrayIndex]!=-1){
								return 0;
				}
				var noNeighbor = true;
				var partsArraySliceLength=Math.sqrt(partsArray.length);
				var left=arrayIndex-1;
				var right=arrayIndex+1;
				var up=arrayIndex-partsArraySliceLength;
				var down=arrayIndex+partsArraySliceLength;
				if(arrayIndex % partsArraySliceLength > 0){
								matches += matchArrayComponents(partId,partsArray[left],'W');
								if( partAtArray(partsArray,left)){
												noNeighbor=false;
								}
				}
				if(arrayIndex % partsArraySliceLength < partsArraySliceLength - 1){
								matches += matchArrayComponents(partId,partsArray[right],'E');
								if( partAtArray(partsArray,right)){
												noNeighbor=false;
								}
				}
				if(arrayIndex>=partsArraySliceLength){
								matches += matchArrayComponents(partId,partsArray[up],'N');
								if( partAtArray(partsArray,up)){
												noNeighbor=false;
								}
				}
				if(arrayIndex<partsArray.length-partsArraySliceLength){
								matches += matchArrayComponents(partId,partsArray[down],'S');
								if( partAtArray(partsArray,down)){
												noNeighbor=false;
								}
				}

				if (noNeighbor)  { 
								return 0;
				}
				return matches;
}
var randomAvailableEW = function(partId){
				var east = components[partId].match.match('4');
				var west = components[partId].match.match('6');

				if (!east && west) {
								return 'w';  
				}
				if (east && !west) {
								return 'e';
				}

				if(Math.random<0.5){
								return 'e';
				}else{
								return 'w';
				}

}
var randomAvailableNS = function(partId){
				var north = components[partId].match.match('2');
				var south = components[partId].match.match('8');

				if (!north && south) {
								return 's';  
				}
				if (north && !south) {
								return 'n';
				}

				if(Math.random<0.5){
								return 's';
				}else{
								return 'n';
				}

}
var calculatePartPosition3 = function (x,y,partId,partsArray,matchThreshold,forceGrowArray) {
				var locations=[];
				var returnArray = partsArray.slice(0);
				var partsArraySliceLength=Math.sqrt(partsArray.length);
				var returnArraySliceLength=partsArraySliceLength;
				var growArray = true;
				for(var i=0;growArray && i<partsArray.length;i++){
								if(partsArray[i]==-1){
												growArray=false;
								}
				}
				if(forceGrowArray){
								growArray=true;
				}
				if(growArray && false){
								var modifier = 0;

								if (randomAvailableEW(partId)=='e'){
												modifier+=1;
								}
								if (randomAvailableNS(partId)=='s'){
												modifier+=partsArraySliceLength;
								}


								for (var i=0;i<Math.pow(partsArraySliceLength+1,2);i++){
												returnArray[i]=-1;
								}
								for (var i=0;i<partsArray.length;i++){
												returnArray[i+parseInt(i/partsArraySliceLength)+modifier]=partsArray[i];
								}
								returnArraySliceLength+=1;
				}
				for(var i=0;i<returnArray.length;i++){
								locations[matchLocationArray(i,partId,returnArray)]=i;
				}
				for(var i=locations.length;i>matchThreshold;i--){
								if(typeof(locations[i])!='undefined'){
												returnArray[locations[i]]=partId;
												return returnArray;
								}
				}
				return partsArray;
}
gameUI.prototype.calculatePartPosition2 = function (x,y,index) {
				var locations=[];
				var outx = x;
				var outy = y;
				var matchBonus = 0;

				for(var i=0;i<this.parts.length;i++){
								if(this.parts[i].sprite.alive){
												outx = this.parts[i].sprite.x;
												outy = this.parts[i].sprite.y;
												if(!ui.partAt(outx-16,outy)){
																locations[this.matchLocation(outx-16,outy,index)]={x:outx-16,y:outy};
												}
												if(!ui.partAt(outx+16,outy)){  
																locations[this.matchLocation(outx+16,outy,index)]={x:outx+16,y:outy};
																outx+=16;
												}
												if(!ui.partAt(outx,outy-16)){  
																locations[this.matchLocation(outx,outy-16,index)]={x:outx,y:outy-16};
																outy-=16;
												}
												if(!ui.partAt(outx,outy+16)){  
																locations[this.matchLocation(outx,outy+16,index)]={x:outx,y:outy+16};
																outy+=16;
												}
								}
				}
				for(var i=locations.length;i>0;i--){
								if(locations[i]){
												return locations[i];
								}
				}
				return this.calculatePartPosition(x,y,index);
}
gameUI.prototype.partCountAt = function(x,y){
				var count=0;
				for(var i=0;i<this.parts.length;i++){
								if(this.parts[i].sprite.alive &&
																this.parts[i].sprite.x==x &&
																this.parts[i].sprite.y==y){
												count++;
								}
				}
				return count;
}
gameUI.prototype.partAt = function(x,y){
				for(var i=0;i<this.parts.length;i++){
								if(this.parts[i].sprite.alive &&
																this.parts[i].sprite.x==x &&
																this.parts[i].sprite.y==y){
												return this.parts[i].index;
								}
				}
				return 0;
}
function getOptimisticMatch(ship,position){
				return '2468';
}
function getBestMatch(ship,position){
				var size=Math.sqrt(ship.length);
				var res='';
				if(position<ship.length-size){
								if(ship[position+size] != -1){
												if(components[ship[position+size]].match.match('8')){
																res+='2';
												}
								}
				}
				if(position % size < size - 1){
								if(ship[position+1] != -1){
												if(components[ship[position+1]].match.match('4')){
																res+='6';
												}
								}
				}
				if(position % size > 0){
								if(ship[position-1] != -1){
												if(components[ship[position-1]].match.match('6')){
																res+='4';
												}
								}
				}
				if(position>=size){
								if(ship[position-size] != -1){
												if(components[ship[position-size]].match.match('2')){
																res+='8';
												}
								}
				}
				return res;
}
//direction
//relative from a
//    b
//    2
//    N
//    8
//b6W4a6E4b
//    2
//    S
//    8      
//    b
var matchOppositeComponents = function(a,b,direction){
				var matchA = '';
				if (a>0) {matchA = components[a].match;}
				var matchB = '';
				if (b>0) {matchB = components[b].match;}
				var result = 0;
				matchA = matchA.replace('8','N').replace('2','S').replace('4','E').replace('6','W');
				matchB = matchB.replace('2','N').replace('8','S').replace('4','E').replace('6','W');

				if (!matchA || !matchB) {
								return false;
				}
				if((matchA.match('N') && matchB.match('N')) ||
												(matchA.match('S') && matchB.match('S'))){
								matchB=matchB.replace('N','').replace('S','').replace('WE','EW');
								matchA=matchA.replace('N','').replace('S','').replace('WE','EW');
								return matchA==matchB;
				}

				return false;
};
var matchArrayComponents = function(a,b,direction){
				var matchA = '';
				if (a>0) {matchA = components[a].match;}
				var matchB = '';
				if (b>0) {matchB = components[b].match;}
				var result = 0;
				matchA = matchA.replace('8','N').replace('2','S').replace('6','E').replace('4','W');
				matchB = matchB.replace('2','N').replace('8','S').replace('4','E').replace('6','W');

				//  if (a>0 && b<0 && matchA.match(direction)) { result +=4;}
				if (matchA.match(direction) && b > 0 && !matchB.match(direction)){
								result-=10;
				}
				if (matchA.match(direction) && matchB.match(direction)) { 
								result += 20;
								if (components[a].name==components[b].name) {
												result += 20;
								}
				}

				return result;
};
function matchComponentToString (a,b){
				var matchA = '';
				if (a<=0) {return 0;}
				matchA = components[a].match;
				var matchB = b;
				var result = 0;
				var directions = [2,4,6,8];
				for (var i=0;i<directions.length;i++){
								var direction=directions[i];
								if(!matchA.match(direction) && !matchB.match(direction)){
												result+=1;
								}
								if(matchA.match(direction) && matchB.match(direction)){
												result+=1;
								}
				}

				return result;
}
gameUI.prototype.matchComponents = function(a,b,direction){
				var matchA = '';
				if (a>0) {matchA = components[a].match;}
				var matchB = '';
				if (b>0) {matchB = components[b].match;}
				var result = 0;
				matchA = matchA.replace('8','N').replace('2','S').replace('6','E').replace('4','W');
				matchB = matchB.replace('2','N').replace('8','S').replace('4','E').replace('6','W');

				if (a>0 && b>0 && matchA.match(direction)) { result =1;}
				if (!matchA.match(direction) && !matchB.match(direction)) { result = 4;}
				if (matchA.match(direction) && matchB.match(direction)) { 
								result = 10;
								if (components[a].name==components[b].name) {
												result = 13;
								}
				}

				return result;
};
gameUI.prototype.matchLocation = function(x,y,index){
				var matches = 0;

				matches += this.matchComponents(index,this.partAt(x-16,y),'W');
				matches += this.matchComponents(index,this.partAt(x+16,y),'E');
				matches += this.matchComponents(index,this.partAt(x,y-16),'N');
				matches += this.matchComponents(index,this.partAt(x,y+16),'S');

				return matches;
}
gameUI.prototype.matchShip = function(part,index,ship){
				var matches = 0;

				if(index>0){  
								matches += this.matchComponents(part,ship[index-1],'W');
				}
				if(index<ship.length-1){
								matches += this.matchComponents(part,ship[index+1],'E');
				}
				if(index>=Math.sqrt(ship.length)){
								matches += this.matchComponents(part,ship[index-Math.sqrt(ship.length)],'N');
				}
				if(index<ship.length-Math.sqrt(ship.length)){
								matches += this.matchComponents(part,ship[index+Math.sqrt(ship.length)],'S');
				}
				return matches;
}
gameUI.prototype.clearButtons = function() {
				for (var i = 0; i < this.buttons.length; i++){
								this.buttons[i].button.destroy();  
				}
				if(this.buttons.length){
								this.buttons=[];
				}
}

gameUI.prototype.clearRadar = function() {
				for (var i = 0; i < this.radar.length; i++){
								this.radar[i].destroy();  
				}
				if(this.radar.length){
								this.radar=[];
				}
}  
gameUI.prototype.resetRadar = function() {
				if(this.radar.length!=player.radarTargets){
								this.clearRadar();
								for (var i = 0; i < player.radarTargets; i++){
												if(typeof(enemies[i])!='undefined'){
																this.radar.push(game.add.text(200,100, '*',{ font:'12px acknowledge', fill: 'rgb(255,130,130)', align: 'center' }));
																this.radar[i].anchor.setTo(0.5,0.5);
																this.radar[i].alpha=0.85;
																this.radar[i].blendMode=1
												};
								}
				}
}
gameUI.prototype.initCombatUi = function() {

				this.partsSelector = game.add.sprite(-384,158,'parts',0);
				this.partsSelector.visible = false;

				this.tempStation = game.add.sprite(0,0,'station');
				this.tempStation.anchor.setTo(0.5,0.5);
				this.tempStation.visible = false;
				this.partswindow = game.add.sprite(-364,-132,'partswindow');
				this.partswindow.anchor.setTo(0,0);
				this.partswindow.visible = false;
				destroyIfExists(this.missionLine);
				this.missionLine = game.add.text(200,100, '',{ font:'24px acknowledge', fill: 'rgb(255,192,64)', align: 'right' });
				this.missionLine.alpha = 0.69;
				destroyIfExists(this.profileLine);
				this.profileLine = game.add.text(200,100, '',{ font:'24px acknowledge', fill: 'rgb(255,64,16)', align: 'right' });
				this.profileLine.alpha = 0.75;
				destroyIfExists(this.crewLine);
				this.crewLine = game.add.text(200,100, '',{ font:'18px acknowledge', fill: 'rgb(192,192,192)', align: 'left' });
				this.crewLine.alpha = 0.9;
				this.crewLine.blendMode = 1;
				this.crewLine.anchor.setTo(0.5,0.5);

				destroyIfExists(this.healthLine);
				this.healthLine = game.add.text(200,100, '',{ font:'18px acknowledge', fill: 'rgb(96,96,240)', align: 'left' });
				this.healthLine.alpha = 0.9;
				this.healthLine.blendMode = 1;
				this.healthLine.anchor.setTo(0.5,0.5);

				destroyIfExists(this.energyLine);
				this.energyLine = game.add.text(200,100, '',{ font:'18px acknowledge', fill: 'rgb(240,64,255)', align: 'left' });
				this.energyLine.alpha = 0.9;
				this.energyLine.anchor.setTo(0.5,0.5);

				this.energyLine.blendMode = 1;
				destroyIfExists(this.comms);
				this.comms = game.add.text(0,0,'',{font:'32px mozart', fill: 'rgb(40,190,240)', align: 'left'});

				this.comms.anchor.setTo(0.5,0.5);

				destroyIfExists(this.playerStatusText);
				this.playerStatusText = game.add.text(-300,-200,'',{font:'32px acknowledge', fill: 'rgb(96, 96, 240)', align: 'left' });
				this.playerStatusText.anchor.setTo(0.0,0.0);

				destroyIfExists(this.partText);
				this.partText = game.add.text(-300,150,'',{font:'42px mozart', fill: 'rgb(255,255,255)', align: 'left'});
				destroyIfExists(this.statsText);
				this.statsText = game.add.text(0,-200,'',{font:'28px mozart', fill: 'rgb(255,255,255)', align: 'left'});
				this.statsText.anchor.setTo(0.5,0.5);
				destroyIfExists(this.partFlavorText);
				this.partFlavorText = game.add.text(-280,180,'',{font:'28px mozart', fill: 'rgb(255,255,255)', align: 'left'});
				destroyIfExists(this.explainerText);
				this.explainerText = game.add.text(-300,210,'',{font:'24px mozart', fill: 'rgb(255,255,220)', align: 'left'});

				this.radar = [];
				this.resetRadar();

				this.damageNumbers = [];

				this.frobRadar = game.add.text(200,100,'*',{font:'28px acknowledge', fill: 'rgb(255,255,130)', align: 'center'});
				this.frobRadar.anchor.setTo(0.5,0.5);
				this.frobRadar.blendMode=1;
				this.frobRadar.alpha=0.92;
}
gameUI.prototype.cleanupDamageNumbers = function(){
				for(var i=0;i<this.damageNumbers.length;i++){
								if(game.time.now>this.damageNumbers[i].dieTime){
												this.damageNumbers[i].visible=false;
								}else{
												this.toTop(this.damageNumbers[i]);
												if(gamemode != 'paused'){
																this.damageNumbers[i].x+=player.sprite.body.velocity.x*game.time.physicsElapsed;
																this.damageNumbers[i].y+=player.sprite.body.velocity.y*game.time.physicsElapsed;
												}
												this.damageNumbers[i].y-=120*game.time.physicsElapsed;
								}
				} 
}
//force a 
gameUI.prototype.addDamageNumber = function(x,y,dmg,dmgDisplay,dmgGood){
				if(!dmg){return;}
				if(typeof(dmgDisplay)=='undefined'){
								dmgDisplay = parseInt(Math.ceil(dmg)*-1);
								dmgGood = (dmgDisplay > 0);
				}
				var dn;
				for(var i=0;i<this.damageNumbers.length;i++){
								if(this.damageNumbers[i].visible==false){
												dn=this.damageNumbers[i];
								}
				}
				if(typeof(dn)=='undefined'){
								this.damageNumbers.push(game.add.text(0,0,'',{ font: '24px acknowledge', fill: 'rgb(240,0,0)', alpha: '2'}));
								dn=this.damageNumbers[this.damageNumbers.length-1];
				}
				dn.x=x;
				dn.y=y;
				dn.visible=2;
				dn.setText(dmgDisplay);
				if(dmgGood){
								dn.fill='rgb(30,240,30)';
				}else{
								dn.fill='rgb(240,30,30)';
				}
				dn.alpha=2;
				dn.dieTime=game.time.now+1000;
				game.add.tween(dn).to({alpha: 0},1000, Phaser.Easing.Sinusoidal.Out, true, 0, false);
}
gameUI.prototype.bar = function (targetText, offset, numerator, denominator) {
				if(typeof(targetText.lastValue)=='undefined'){
								targetText.lastValue=numerator;
				}
				targetText.x = player.sprite.body.x+(player.sprite.body.width/2);
				targetText.y = player.sprite.body.y+(player.sprite.body.height/2);//+30+offset;
				targetText.x -= Math.cos(player.sprite.rotation)*(player.sprite.body.width+offset);
				targetText.y -= Math.sin(player.sprite.rotation)*(player.sprite.body.width+offset);
				targetText.rotation = player.sprite.rotation + 0.5 * Math.PI;
				targetText.tint=16777215;
				if(targetText.shudder){
								targetText.x+=((targetText.shudder)*Math.random())*randomSign();
								targetText.y+=((targetText.shudder)*Math.random())*randomSign();
								targetText.shudder-=game.time.physicsElapsed*15;
								if(targetText.shudder<0){
												targetText.shudder = 0;
								}
								targetText.tint*=Math.random();
				}  
				this.toTop(targetText);
				var barFactor = parseInt(denominator/10)+1;
				var barSize=Math.floor(denominator/barFactor);  
				var s = '';
				if (barFactor > 1){
								s+=barFactor;
				}
				var n=Math.floor(numerator/barFactor);
				if(n<0){n=0;}
				s+=repeat('\u2026',n);
				s+=repeat('\u201A',barSize-n);
				targetText.setText(s);
				if(numerator>targetText.lastValue){
								targetText.alpha=2;
								game.add.tween(targetText).to({alpha: 0.9},500, Phaser.Easing.Exponential.Out, true, 0, false);
				}else if(numerator<targetText.lastValue){
								targetText.alpha=0.6;    
								game.add.tween(targetText).to({alpha: 0.9},500, Phaser.Easing.Exponential.Out, true, 0, false);  
				}
				targetText.lastValue=numerator;
}

gameUI.prototype.frobRadarPing = function() {
				if(false && (playerStats.mission.win.condition!='frob' || playerStats.mission.complete)){
								this.frobRadar.setText('');
								this.toTop(this.frobRadar);
				}else{
								var s='';
								var targetAngle=game.physics.arcade.angleBetween(player.sprite, frob1);
								var targetDistance=game.physics.arcade.distanceBetween(player.sprite, frob1);
								s='<>'; 
								var n=Math.floor(255-(targetDistance/8-225));
								if(n<64){n=64;}if(n>255){n=255};
								this.frobRadar.style.fill="rgb("+(Math.floor(n))+","+n+","+(Math.floor(n/2))+")";
								if(playerStats.mission.complete) {
												if (game.time.now > this.nextFrobRadarPulse)  {
																this.frobRadar.style.fill="rgb("+(n+72)+","+(n+72)+","+(n)+")";
																ui.frobRadar.scale.setTo(3,3);
																game.add.tween(ui.frobRadar.scale).to({x:1,y:1},500, Phaser.Easing.Quadratic.InOut, true, 0, true, true);
																this.nextFrobRadarPulse=game.time.now+1000;
												}
								}else{
												ui.frobRadar.scale.setTo(1,1);
												if (game.time.now % 1000 < 50)  {
																this.frobRadar.style.fill="rgb("+(n+64)+","+(n+64)+","+(n+32)+")";

												}

								}

								if (targetDistance < 300){
												s='';
								}
								if(targetDistance>180){targetDistance=180+Math.pow(targetDistance-180,0.6)};
								if(targetDistance>0.5*Math.min(resolutionX,resolutionY)-50){targetDistance=0.5*Math.min(resolutionX,resolutionY)-50};  
								this.frobRadar.setText(s);
								this.frobRadar.x = player.sprite.body.x + Math.cos(targetAngle) * targetDistance - 0.5 * this.frobRadar.width;
								this.frobRadar.y = player.sprite.body.y + Math.sin(targetAngle) * targetDistance;  
				}
}
gameUI.prototype.radarPing = function() {
				var s='';
				this.resetRadar();
				if(player.radarError > 0){
								player.radarError-=game.time.physicsElapsed*2;
				}
				if(player.radarError < 0){
								player.radarError=0;
				}
				for(var i=0;i<this.radar.length;i++){
								var targetAngle=game.physics.arcade.angleBetween(player.sprite, this.enemies[i].sprite);
								this.radar[i].alpha=0.85
												if(player.radarError>player.radarTargets){
																this.radar[i].alpha*=Math.random()-((player.radarError-player.radarTargets)/20);
																targetAngle+=Math.random()*((player.radarError-player.radarTargets)/2)*randomSign();
												}

								var targetDistance=game.physics.arcade.distanceBetween(player.sprite, this.enemies[i].sprite);
								var s='\u2026';
								var n=Math.floor(255-(targetDistance/2-900));
								var blinkDistance = 1000;
								var bracketLeft = '[';
								var bracketRight = ']';

								var missionTarget = this.enemies[i].ai == aiModes['asteroid'] ? 128 : 0;

								if(player.profileShow && !missionTarget){
												var adjustedProfile = 200 + Math.pow(player.sprite.profile,profileExponent);
												this.blinkDistance=adjustedProfile*2.1;
												if(targetDistance<0.5*blinkDistance){
																bracketLeft='>';
																s='!';
																bracketRight='<';
												}else{
																bracketLeft='(';
																bracketRight=')';
												}
								}

								if(n<0){n=0;}if(n>255){n=255};
								this.radar[i].style.fill="rgb("+n+","+(96+missionTarget)+",96)";
								if(this.enemies[i].sprite.profile>player.sprite.profileMax*2){
												this.radar[i].style.font='36px acknowledge';
								}else if(this.enemies[i].sprite.profile>player.sprite.profileMax){
												this.radar[i].style.font='30px acknowledge';
								}else if(this.enemies[i].sprite.profile>player.sprite.profileMax*0.5){
												this.radar[i].style.font='24px acknowledge';
								}else{
												this.radar[i].style.font='18px acknowledge';
								}

								if(game.time.now>this.nextRadarSound && targetDistance < 0.75 * blinkDistance && this.enemies[i].sprite.profile > 200){
												this.nextRadarSound=game.time.now+3333;
								}
								if (!missionTarget && targetDistance < 0.5 * blinkDistance && game.time.now % 250 > 125){
												s='['+s+']';
												this.radar[i].style.fill="rgb(255," + missionTarget + ",0)";
								}
								else if (!missionTarget && targetDistance < blinkDistance && targetDistance >= 0.5 * blinkDistance && game.time.now % 1000 > 500)  {
												s='['+s+']';
												this.radar[i].style.fill="rgb(255," + missionTarget + ",0)";
								} else {
												s=' '+s+' ';
								}

								if(i==0 && player.fireTracking > 0 && targetDistance < (player.fireRange * player.fireVelocity) / 1000){
												s+='\nLOCKED';
								}

								var range = targetDistance;

								if(this.enemies[i].sprite==player.target){
												this.radar[i].style.font='64px mozart';
												this.radar[i].style.fill="rgb(255,96,32)";
												if(player.behavior!='target'){
																this.radar[i].style.fill="rgb(192,212,32)";
												}
												if(Math.random()<0.955 ){
																s='[  ';
												}else{
																s=String.fromCharCode(Math.floor(Math.random()*255))+'  ';
												}
												if(Math.random()<0.955 ){
																s+=']';
												}else{
																s+=String.fromCharCode(Math.floor(Math.random()*255));
												}
								} else {
												if(range>180){range=180+Math.pow(targetDistance-180,0.6)};  
												if(range>0.5*Math.min(resolutionX,resolutionY)-50){range=0.5*Math.min(resolutionX,resolutionY)-50};  
								}
								this.radar[i].setText(s);
								this.radar[i].x = player.sprite.body.x + (0.5 * player.sprite.body.width) + Math.cos(targetAngle) * range;
								this.radar[i].y = player.sprite.body.y + (0.5 * player.sprite.body.width) + Math.sin(targetAngle) * range;  
								this.toTop(this.radar[i]);
				}
}
//follow this with a push!
gameUI.prototype.skipText = function() {
				this.textIndex=this.texts.length;
				this.textLineIndex=0;
}
var playerSizeMax = function(){
				return (playerStats.level) + 5;
}
gameUI.prototype.playerStatusTextPing = function() {

				var statusText = '';
				statusText +='LEV ' + playerStats.level + '\n';
				statusText += 'XP ' + playerStats.xp + '/' + playerStats.nextXp + '\n'
								statusText += 'HP ' + parseInt(player.health) + '/' + parseInt(player.healthMax) + '\n'
								statusText += 'SI ' + shipWithoutVoid(player.ship).length + '/' + playerSizeMax() + '\n';
				if(gamemode == 'paused' && pauseResumeTime == 0){
								statusText += '\ncomponents:\n';
								for(i=0;i<player.ship.length;i++){
												if(player.ship[i] != -1){
																var count=0;
																for(j=0;j<player.ship.length;j++){
																				if(player.ship[j] != -1){
																								if(components[player.ship[j]].name==components[player.ship[i]].name && j < i){
																												j=player.ship.length;
																								}else if(components[player.ship[j]].name==components[player.ship[i]].name){
																												count+=1;
																								}
																				}
																}
																if(count > 0){
																				statusText += components[player.ship[i]].name;
																				if(count > 1){
																								statusText += ' x ' + count;
																				}
																				statusText += '\n'; 
																}
												}
								}
				statusText+='\n' + pauseMessage + '\n';
				}
				this.playerStatusText.setText(statusText);


				var upperLeftCornerX = cameraTarget.x - (resolutionX / 2);
				var upperLeftCornerY = cameraTarget.y - (resolutionY / 2);

				this.playerStatusText.x = upperLeftCornerX + 30;
				this.playerStatusText.y = upperLeftCornerY + 50;
				this.toTop(this.playerStatusText);

}
gameUI.prototype.commsPing = function() {


				this.comms.x = player.sprite.x;
				this.comms.y = player.sprite.y - 200;
				if (game.time.now > this.nextComms && this.textIndex < this.texts.length){
								if(this.textLineIndex==0||this.nextCommsPing){
												ui.sound_comms.play();
												this.nextCommsPing=false;
								}
								this.comms.alpha=1;
								this.textLine = this.texts[this.textIndex];

								if(!this.textLineIndex){
												this.textLineIndex=this.textLine.length+1;
								}
								this.comms.setText(this.textLine);
								if(this.textLineIndex>this.texts[this.textIndex].length){
												this.nextComms=game.time.now+2000+this.textLineIndex*50;
												this.textIndex+=1;
												this.textLineIndex=0;
								}else{
												this.nextComms=game.time.now+0.1;
								}
								if(this.textLine.substr(-1)=='\n'){
												this.nextComms+=10;
								}
				}else if (game.time.now > this.nextComms) {
								this.comms.alpha-=randomRange(0,0.05);
				}  
				if(this.textLine.length>0 && game.time.now % 200 > 100){
								this.comms.setText(this.textLine + '_ ');
				}else{
								this.comms.setText(this.textLine + '  ');
				}
				this.graphics.beginFill(0x000000, ui.comms.alpha/3);
				this.graphics.drawRect(this.comms.x - 15 - (0.5 * this.comms.width), this.comms.y - 6 - (0.5 * this.comms.height), this.comms.width + 30, this.comms.height + 12);

				//color coding!
				if(this.comms.text.match(/^got/)){
								this.comms.fill="rgb(255,240,32)"
				}else if (this.comms.text.match(/^\$/)){
								this.comms.fill="rgb(200,255,230)"
				}else if (this.comms.text.match(/^>/)){
								this.comms.fill="rgb(255,96,64)"  
				}else{
								this.comms.fill='rgb(40,190,240)';
				}  
				this.toTop(this.comms);
}
gameUI.prototype.missionLinePing = function() {

				if(playerStats.mission.win.condition=='kill' && playerStats.mission.win.killCount > playerStats.kills){
								this.missionLine.setText(playerStats.kills + '/' + playerStats.mission.win.killCount);
								this.missionLine.x = player.sprite.body.x+(player.sprite.body.width/2);
								this.missionLine.y = player.sprite.body.height+player.sprite.body.y+55;
								this.toTop(this.missionLine);
				} else {
								this.missionLine.setText('');
				}
}
gameUI.prototype.profileLinePing = function() {

				if(player.profileShow){
								this.profileLine.style.fill="rgb(192,"+Math.floor((player.sprite.profile/5/player.sprite.profileMax)*255)+",16)";
								this.profileLine.setText(player.sprite.profile);
								this.profileLine.x = player.sprite.body.x-this.profileLine.width;
								this.profileLine.y = player.sprite.body.height+player.sprite.body.y+55;
								this.toTop(this.profileLine);
				}else{
								this.profileLine.setText('');
				}
}
gameUI.prototype.partPing = function () {
				this.graphics.beginFill(0x000000, 0.5);
				this.graphics.drawRect(-400,142, 800, 96);
				this.toTop(this.partText);
				this.toTop(this.partFlavorText);
				this.toTop(this.statsText);
				if(this.comms.alpha>0){
								this.statsText.visible=false;
				}else{
								this.statsText.visible=true;
				}
				this.toTop(this.explainerText);
				this.partsSelector.bringToTop();

}
gameUI.prototype.update = function() {
				this.graphics.clear();
				this.toTop(this.graphics);
				this.commsPing();
				this.playerStatusTextPing();
				this.toTop(otherGraphics);
				if (gamemode == '?build'){
								this.partPing();
				}
				if (gamemode == 'war'){
								this.missionLinePing();
								this.profileLinePing();
								this.bar(this.healthLine, 0, player.health, player.healthMax);
								this.bar(this.crewLine, 20, playerStats.crew, player.crewMax);
								this.bar(this.energyLine, 10, player.energy, player.energyMax);
								this.enemies=enemies.slice(0);
								this.enemies.sort(threatSort);
								this.asteroids=enemies.slice(0);
								this.asteroids.sort(asteroidSort);
								this.radarPing();
								this.frobRadarPing();
				}
				if (gamemode == 'paused'){
								this.missionLinePing();
								this.profileLinePing();
								this.bar(this.healthLine, 0, player.health, player.healthMax);
								this.bar(this.crewLine, 20, playerStats.crew, player.crewMax);
								this.bar(this.energyLine, 10, player.energy, player.energyMax);
								this.enemies=enemies.slice(0);
								this.enemies.sort(threatSort);
								this.asteroids=enemies.slice(0);
								this.asteroids.sort(asteroidSort);
								this.radarPing();
								this.frobRadarPing();
								this.playerStatusTextPing();

				}
				this.buttonsPing();
				this.cleanupDamageNumbers();
}
gameUI.prototype.updatePart = function () {
				this.partsSelector.visible=true;
				mockPlayer.initPlayerShip(this.partsArray());
				this.statsText.setText(blurbStats(mockPlayer));
				if(ui.buildMode == 'select'){
								if(playerStats.inventory.length){
												this.partsSelector.loadTexture('parts',playerStats.inventory[this.currentPart]);
												this.partText.setText(components[playerStats.inventory[this.currentPart]].name);
												this.partFlavorText.setText(components[playerStats.inventory[this.currentPart]].flavor);
								}else{
												this.partsSelector.loadTexture('parts',0)
																this.partText.setText('Your inventory is empty.')
																this.partFlavorText.setText('');
								}
				}else{
								//workaround
								if(typeof(this.currentPlayerPart) == 'undefined' || this.currentPlayerPart > this.parts.length){
												console.log(this.currentPlayerPart);
												this.currentPlayerPart = 0;
								}
								this.partsSelector.loadTexture('parts',this.parts[this.currentPlayerPart].index);
								this.partText.setText(components[this.parts[this.currentPlayerPart].index].name);
								this.partFlavorText.setText(components[this.parts[this.currentPlayerPart].index].flavor);

				}

				for(var i=0;i<this.parts.length;i++)
				{
								if((this.buildMode=='move' || this.buildMode=='delete') && i== ui.currentPlayerPart)
								{
												ui.parts[i].sprite.alpha=2;
												ui.parts[i].sprite.blendMode=1;

								}
								else
								{
												ui.parts[i].sprite.alpha=1;
												ui.parts[i].sprite.blendMode=0;

								}  
				}

				var j=ui.currentPart-(ui.currentPart%16);
				for(var i=0;i<this.inventory.length;i++){
								if(i+j<playerStats.inventory.length){
												this.inventory[i].loadTexture('parts',playerStats.inventory[i+j]);
												this.inventory[i].visible=true;
												this.inventory[i].bringToTop();
								}else{
												this.inventory[i].visible=false;
								}
								if(i==ui.currentPart%16 && ui.buildMode == 'select')
								{
												this.inventory[i].blendMode=1;
												this.inventory[i].alpha=3;
								}
								else{

												this.inventory[i].blendMode=0;
												this.inventory[i].alpha=1;
								}
				}

}

gameUI.prototype.previousPart = function () {
				if(playerStats.inventory.length){
								this.currentPart = (playerStats.inventory.length + this.currentPart - 1) % playerStats.inventory.length;  
				}else{
								this.currentPart = 0;
				}
				this.updatePart();
}

gameUI.prototype.buyPart = function () {
				var n=0;
				while(n==0){
								var q;
								q = Math.floor(Math.random()*components.length);
								if(components[q].drops){
												n=q;
												playerStats.inventory.push(q);
								}
				}
}
gameUI.prototype.findDeletePartIndex = function () {
				for (var i=0;i<this.partsIndex.length;i++){
								if(this.partsIndex[i]==this.currentPlayerPart){
												return i;
								}
				}

}
gameUI.prototype.rowUpDeletePart = function () {

				this.parts[this.currentPlayerPart].sprite.alpha=1;
				this.parts[this.currentPlayerPart].sprite.blendMode=0;

				var p = this.findDeletePartIndex();

				p-=Math.sqrt(this.partsIndex.length)-1;
				while(this.partsIndex[(--p + this.partsIndex.length) % this.partsIndex.length] == -1){}

				this.currentPlayerPart=this.partsIndex[p % this.partsIndex.length];
				this.updatePart();

				this.parts[this.currentPlayerPart].sprite.alpha=2;
				this.parts[this.currentPlayerPart].sprite.blendMode=1;
}
gameUI.prototype.rowDownDeletePart = function () {

				this.parts[this.currentPlayerPart].sprite.alpha=1;
				this.parts[this.currentPlayerPart].sprite.blendMode=0;

				var p = this.findDeletePartIndex();

				p+=Math.sqrt(this.partsIndex.length)-1;
				while(this.partsIndex[(++p + this.partsIndex.length) % this.partsIndex.length] == -1){}

				this.currentPlayerPart=this.partsIndex[p % this.partsIndex.length];
				this.updatePart();

				this.parts[this.currentPlayerPart].sprite.alpha=2;
				this.parts[this.currentPlayerPart].sprite.blendMode=1;
}
gameUI.prototype.nextDeletePart = function () {

				this.parts[this.currentPlayerPart].sprite.alpha=1;
				this.parts[this.currentPlayerPart].sprite.blendMode=0;

				var p = this.findDeletePartIndex();
				while(this.partsIndex[(++p + this.partsIndex.length) % this.partsIndex.length] == -1){}

				this.currentPlayerPart=this.partsIndex[p % this.partsIndex.length];
				this.updatePart();

				this.parts[this.currentPlayerPart].sprite.alpha=2;
				this.parts[this.currentPlayerPart].sprite.blendMode=1;
}
gameUI.prototype.previousDeletePart = function () {
				this.parts[this.currentPlayerPart].sprite.alpha=1;
				this.parts[this.currentPlayerPart].sprite.blendMode=0;

				var p = this.findDeletePartIndex();
				while(this.partsIndex[(--p + this.partsIndex.length) % this.partsIndex.length] == -1){}

				this.currentPlayerPart=this.partsIndex[(p + this.partsIndex.length)% this.partsIndex.length];
				this.updatePart();
				this.parts[this.currentPlayerPart].sprite.alpha=2;
				this.parts[this.currentPlayerPart].sprite.blendMode=1;
}


gameUI.prototype.rowUpPart = function (c) {
				if(typeof(c)=='undefined'){c=4};
				if(playerStats.inventory.length){
								var n = this.currentPart;
								if (n==0){n=1}
								if (n>c){n=c}
								this.currentPart = (this.currentPart - n + playerStats.inventory.length) % playerStats.inventory.length;  
				}else{
								this.currentPart = 0;
				}
				this.updatePart();
}
gameUI.prototype.rowDownPart = function (c) {
				if(typeof(c)=='undefined'){c=4};
				if(playerStats.inventory.length){
								var n = playerStats.inventory.length - this.currentPart;
								if (n==0){n=1}
								if (n>c){n=c}
								this.currentPart = (this.currentPart + n ) % playerStats.inventory.length;  
				}else{
								this.currentPart = 0;
				}
				this.updatePart();
}
gameUI.prototype.nextPart = function () {
				if(playerStats.inventory.length){
								this.currentPart = (this.currentPart  + 1 ) % playerStats.inventory.length;  
				}else{
								this.currentPart = 0;
				}
				this.updatePart();
}
gameUI.prototype.firstPart = function() {
				this.currentPart=0;
				this.updatePart();
}
gameUI.prototype.newestPart = function() {
				this.currentPart=playerStats.inventory.length>0?playerStats.inventory.length-1:0;
				this.updatePart();
}
gameUI.prototype.partsUI = function (ship) {
				this.sound_dock.play();
				this.initInventory();
				playerStats.inventory.sort(alphaComponentSort);
				player.sprite.reset(0,0);
				player.sprite.rotation=0;
				playerStats.health = player.healthMax;
				playerStats.healthMax = player.healthMax;
				this.firstPart();
				game.camera.follow=null;
				if(gamemode != '?build'){
								gamemode = '?build';
				}
				if(typeof(player)!='undefined'){
								player.destroyParts();
								player.sprite.body.velocity.x=0;
								player.lastVelocityX=0;
								player.sprite.body.velocity.y=0;
								player.lastVelocityY=0;
				}
				this.healthLine.setText('');
				this.crewLine.setText('');
				this.energyLine.setText('');
				this.missionLine.setText('');
				this.profileLine.setText('');
				this.clearRadar();
				this.tempStation.visible=true;
				this.tempStation.bringToTop();
				this.partswindow.visible=true;
				this.partswindow.bringToTop();
				this.partsSelector.bringToTop();
				this.partsSelector.scale.setTo(4,4);
				if(typeof(ship)!='undefined'){
								this.parts = createBuildParts(ship,player.sprite.x,player.sprite.y);
				}
				this.partsArray();
				this.setMode('select');
				this.updatePart();
}
gameUI.prototype.setMode = function(mode){
				this.buildMode = mode;
				if(joystickUsed)
				{
								if(mode=='select'){
												this.explainerText.setText('[SELECT] X: select part   B: unequip parts   START: launch');
								}else if(mode=='move'){
												this.explainerText.setText('[CONFIG] X: place part    B: cancel         D-PAD: move part');

								}else if(mode=='delete'){
												this.explainerText.setText('[REMOVE] X: unequip part   B: done');

								}

				}else{
								if(mode=='select'){
												this.explainerText.setText('[SELECT] X: select part   Z: unequip parts   ENTER: launch');
								}else if(mode=='move'){
												this.explainerText.setText('[CONFIG] X: place part    Z: cancel         ARROWS: move part');

								}else if(mode=='delete'){
												this.explainerText.setText('[REMOVE] X: unequip part   Z: done');
								}
				}
				if(mode=='select'){
								this.initButtons(selectButtons);
				}else if(mode=='move'){
								this.initButtons(moveButtons);
				}
				else if (mode=='delete'){
								this.initButtons(deleteButtons);
				}
}
gameUI.prototype.cullInventory = function() {
}
gameUI.prototype.destroyInventory = function() {
				if(typeof(this.inventory)!='undefined'){
								for(var i=0; i<this.inventory.length;i++)
								{
												this.inventory[i].visible=false;
								}
								this.inventory=[];
				}
}
gameUI.prototype.cullParts = function() {
				for(var j = 0; j < this.parts.length; j++) {
								if(!this.parts[j].sprite.alive){
												if(this.currentPlayerPart>=j){
																this.currentPlayerPart-=1;
												}
												this.parts.splice(j,1);
												j-=1;

								}
				}  
}
gameUI.prototype.destroyParts = function() {
				if(typeof(this.parts)!='undefined'){
								for(var i=0; i<this.parts.length;i++)
								{
												this.parts[i].sprite.blendMode=0;
												this.parts[i].sprite.alpha=1;
												this.parts[i].sprite.kill();
								}
								this.parts=[];
				}
}
gameUI.prototype.endPartsUI = function () {
				this.partswindow.visible = false;
				this.tempStation.visible = false;
				this.partsSelector.visible=false;
				this.destroyInventory();
				var ship = this.partsArray();
				this.destroyParts();
				this.partText.setText('');
				this.statsText.setText('');
				this.partFlavorText.setText('');
				this.explainerText.setText('');
				player.initPlayerShip(ship);
				this.initButtons(warButtons);
				gamemode = 'war';
}

gameUI.prototype.partsArray = function () {
				var outArray = [];



				if(this.parts.length && typeof(this.parts[0])!='undefined'){
								var minx = 999999999;
								var miny = 999999999;
								var maxx = -999999999;
								var maxy = -999999999;
								var shipSize = 0;
								for(var i=0;i<this.parts.length;i++){
												if(this.parts[i].sprite.alive){

																//prevent overlapping parts  
																if(ui.partCountAt(this.parts[i].sprite.x,this.parts[i].sprite.y)>1){
																				var newPosition = this.calculatePartPosition(this.parts[i].sprite.x,this.parts[i].sprite.y,this.parts[i].index);
																				this.parts[i].sprite.reset(newPosition.x,newPosition.y);
																}         

																if(this.parts[i].sprite.x < minx){
																				minx = this.parts[i].sprite.x;
																}
																if(this.parts[i].sprite.y < miny){
																				miny = this.parts[i].sprite.y;
																}
																if(this.parts[i].sprite.x > maxx){
																				maxx = this.parts[i].sprite.x;
																}
																if(this.parts[i].sprite.y > maxy){
																				maxy = this.parts[i].sprite.y;
																}
												}
								}

								var shipWidth =(16+maxx-minx)/16; 
								var shipHeight =(16+maxy-miny)/16; 

								shipSize = shipHeight > shipWidth ? shipHeight : shipWidth;
								var offset = 0;
								if(shipWidth - shipHeight > 1){
												offset = Math.floor((shipWidth-shipHeight)/2)*shipWidth;
								}
								if(shipHeight - shipWidth > 1){
												offset = Math.floor((shipHeight-shipWidth)/2);
								}

								this.partsIndex = [];
								for (var i=0;i<shipSize*shipSize;i++){
												outArray.push(-1);
												this.partsIndex.push(-1);
								}

								for (var i=0;i<this.parts.length;i++){
												if(this.parts[i].sprite.alive){
																var n=0;
																n = (this.parts[i].sprite.x - minx)/16;
																n+= ((this.parts[i].sprite.y - miny)/16)*shipSize;
																n+=offset;
																outArray[n] = this.parts[i].index;
																this.partsIndex[n] = i;
												}
								}
				}
				return outArray;
}
function selectPart() {
				if(playerStats.inventory.length){
								createPart(playerStats.inventory[ui.currentPart]);  
								if(!cheatmode){
												playerStats.inventory.splice(ui.currentPart,1);
												ui.previousPart();
								}
				}
}
// n = position in array
function removePlayerPartInFlight(n, dmg) {
				var oldX = player.sprite.x;
				var oldY = player.sprite.y;
				var oldRotation = player.sprite.rotation;
				var oldVelocityX = player.sprite.body.velocity.x;
				var oldVelocityY = player.sprite.body.velocity.y;
				var oldBehavior = player.behavior;
				var oldTarget = player.target;
				var oldTargetAngle = player.targetAngle;
				var oldProfile = player.sprite.profile;
				var oldEnergy = player.energy;
				var oldHealth = player.health;
				var oldHealthMax = player.healthMax;
				var nAdj = 0;
				for (var i=0;i<n+nAdj+1;i++){
								if(player.ship[i]==-1){
												nAdj++;
								}
				}
				player.ship[n + nAdj]=-1;
				ui.parts = createBuildParts(player.ship,0,0);
				player.initPlayerShip(optimizeComponents(ui.partsArray()),oldX,oldY);
				ui.destroyInventory();
				ui.destroyParts();
				player.sprite.body.velocity.x=oldVelocityX;  
				player.sprite.body.velocity.y=oldVelocityY;  
				player.sprite.rotation=oldRotation;
				player.behavior = oldBehavior;
				player.sprite.profile=oldProfile;
				player.target = oldTarget;
				player.targetAngle = oldTargetAngle;
				player.health = oldHealth;
				player.energy = oldEnergy;
				if(player.healthMax - oldHealthMax > 0){
								player.health += player.healthMax - oldHealthMax;
				}
}

function addPlayerPartInFlight(componentId) {
				var oldX = player.sprite.x;
				var oldY = player.sprite.y;
				var oldRotation = player.sprite.rotation;
				var oldVelocityX = player.sprite.body.velocity.x;
				var oldVelocityY = player.sprite.body.velocity.y;
				var oldBehavior = player.behavior;
				var oldTarget = player.target;
				var oldTargetAngle = player.targetAngle;
				var oldEnergy = player.energy;
				var oldHealth = player.health;
				var oldHealthMax = player.healthMax;
				var oldProfile = player.sprite.profile;
				ui.parts = createBuildParts(player.ship,0,0);
				createPart(componentId);
				player.initPlayerShip(optimizeComponents(ui.partsArray()),oldX,oldY);
				ui.destroyInventory();
				ui.destroyParts();
				player.sprite.body.velocity.x=oldVelocityX;  
				player.sprite.body.velocity.y=oldVelocityY;  
				player.sprite.rotation=oldRotation;
				player.behavior = oldBehavior;
				player.target = oldTarget;
				player.energy = oldEnergy;
				player.health = oldHealth;
				player.targetAngle=  oldTargetAngle;
				player.sprite.profile=oldProfile;
				player.health += player.healthMax - oldHealthMax;
}

function createPart(n){

				var partPosition = ui.calculatePartPosition2(0, 0, n); 
				ui.parts.push(dragPool.get(partPosition.x,partPosition.y,'parts',n));  

}
// assumes that the incoming parts list is a square
// if not there will be anarchy
function createShip(shipParts, targetActor){
				var myParts = [];

				var n=Math.sqrt(shipParts.length);

				if (n!=Math.floor(n)){
								return [];
				};
				for (var i=0; i<shipParts.length;i++){
								if(shipParts[i]>-1){
												//that godawful barf there is a terse calculation for the coordinates of the part
												//assuming an array of 'parts' (sprite ids) - array should have a length
												//with an int square root
												myParts.push(pool.get(((n-1)*-(8))+((i%n)*(16)),((n-1)*-(8))+(Math.floor(i/n)*(16)),shipParts[i],targetActor));
								}
				}
				return myParts; 
}
function createBuildParts(ship,x,y){
				var myParts = [];
				var n=Math.sqrt(ship.length);
				y-=n*8;
				x-=n*8;
				y-=y%16;
				x-=x%16;
				if (n!=Math.floor(n)){
								return [];
				};
				for (var i=0; i<ship.length;i++){
								if(ship[i]>-1){
												//that godawful barf there is a terse calculation for the coordinates of the part
												//assuming an array of 'parts' (sprite ids) - array should have a length
												//with an int square root
												myParts.push(dragPool.get(x+(16*(i%n)),y+(16*Math.floor(i/n)),'parts',ship[i]));
								}
				}
				return myParts; 
}


function initMission (missionId) {
				if(missionId==666){
								playerStats.mission = randomMission();
				}else{
								playerStats.mission = missions[missionId];
				}
				planet.scaleMission=randomRange(50,60);
				ui.skipText();
				for(var i=0;i<playerStats.mission.intro.length;i++){
								ui.texts.push(playerStats.mission.intro[i]);
				}
				var index = 0;
				for(var n=0;n<playerStats.mission.enemies.length;n++){  
								for (var i = 0; i < playerStats.mission.enemies[n].count; i++){

												var myShip = playerStats.mission.enemies[n].ships.slice(0);
												if(typeof(playerStats.mission.enemies[n].parts)!='undefined'){
																var mySize = parseInt(randomRange(playerStats.mission.enemies[n].sizeMin, playerStats.mission.enemies[n].sizeMax + 1));
																myShip = randomShip(playerStats.mission.enemies[n].parts, mySize);
																if(Math.random() > (1 / (Math.sqrt(myShip.length)-1))){
																				myShip = symmetrizeShip(myShip);
																}
																myShip=[myShip];
												}
												if(index<enemies.length){
																//enemies[index].shipList=playerStats.mission.enemies[n].ships;
																enemies[index].shipList=myShip;
																enemies[index].initEnemyShip();
																enemies[index].target=player.sprite;
												}else{
																enemies.push(new enemyShip(index, game, player.sprite, enemyBullets, myShip, enemyThrust));
												}
												enemies[index].respawn=playerStats.mission.enemies[n].respawn;
												enemies[index].missionTarget=playerStats.mission.enemies[n].missionTarget;
												enemies[index].taunts=playerStats.mission.enemies[n].taunts;
												enemies[index].deaths=playerStats.mission.enemies[n].deaths;
												index++;
								}
				}
				while(index<enemies.length){  //cleanup if we haven't use the entired pool
								enemies[index].respawn=false;
								enemies[index].health=0;
								enemies[index].damage(9999);
								index++;
				}
				if(true || playerStats.mission.win.condition=='frob'){
								frob1.visible=true;
								frob1.reset(randomSign()*randomRange(playerStats.mission.distanceMin,playerStats.mission.distanceMax),randomSign()*randomRange(playerStats.mission.distanceMin,playerStats.mission.distanceMax));
								frob1.body.velocity.x=randomRange(-20,20);
								frob1.body.velocity.y=randomRange(-20,20);
				}

				fadeIn();
}

function fadeOut () {
				station.alpha=1;
				ui.tempStation.alpha=1;
				game.add.tween(station).to({alpha:1},5000, Phaser.Easing.Exponential.Out, true, 0, false);
				game.add.tween(ui.tempStation).to({alpha:1},5000, Phaser.Easing.Exponential.Out, true, 0, false);


				hazeRed.alpha=playerStats.mission.hazeRed;
				hazeWhite.alpha=playerStats.mission.hazeWhite;
				hazePurple.alpha=playerStats.mission.hazePurple;
				game.add.tween(hazeRed).to({alpha:0},5000, Phaser.Easing.Linear.Out, true, 0, false);
				game.add.tween(hazeWhite).to({alpha:0},5000, Phaser.Easing.Exponential.Out, true, 0, false);
				game.add.tween(hazePurple).to({alpha:0},5000, Phaser.Easing.Exponential.Out, true, 0, false);

				hazeRed.tint=randomMutedColor(40,200,40,200,40,200);
				hazeWhite.tint=randomMutedColor(140,255,140,255,140,255);
				hazePurple.tint=randomMutedColor(140,255,140,255,140,255);

				hazeRed.speed=playerStats.mission.hazeRedSpeed;
				hazeWhite.speed=playerStats.mission.hazeWhiteSpeed;
				hazePurple.speed=playerStats.mission.hazePurpleSpeed;
				hazeRed.blendMode=playerStats.mission.hazeRedBlendMode;
				hazePurple.blendMode=playerStats.mission.hazePurpleBlendMode;

}

function randomVividColor(minr,maxr,ming,maxg,minb,maxb) {
				if(typeof(minr)=='undefined'){minr=0};
				if(typeof(ming)=='undefined'){ming=0};
				if(typeof(minb)=='undefined'){minb=0};
				if(typeof(maxr)=='undefined'){maxr=255};
				if(typeof(maxg)=='undefined'){maxg=255};
				if(typeof(maxb)=='undefined'){maxb=255};
				var re=parseInt(randomScaleRange(minr,maxr));
				var gr=parseInt(randomScaleRange(ming,maxg));
				var br=parseInt(randomScaleRange(minb,maxb));
				return (re<<16) + (gr<<8) + (br);
}
function randomMutedColor(minr,maxr,ming,maxg,minb,maxb) {
				if(typeof(minr)=='undefined'){minr=0};
				if(typeof(ming)=='undefined'){ming=0};
				if(typeof(minb)=='undefined'){minb=0};
				if(typeof(maxr)=='undefined'){maxr=255};
				if(typeof(maxg)=='undefined'){maxg=255};
				if(typeof(maxb)=='undefined'){maxb=255};
				var re=parseInt(randomRange(minr,maxr));
				var gr=parseInt(randomRange(ming,maxg));
				var br=parseInt(randomRange(minb,maxb));
				re = (re+re+gr+br)/4;

				gr = (gr+re+gr+br)/4;
				br = (br+re+gr+br)/4;
				return (parseInt(re<<16) + parseInt(gr<<8) + parseInt(br));
}
function randomColor(minr,maxr,ming,maxg,minb,maxb) {
				if(typeof(minr)=='undefined'){minr=0};
				if(typeof(ming)=='undefined'){ming=0};
				if(typeof(minb)=='undefined'){minb=0};
				if(typeof(maxr)=='undefined'){maxr=255};
				if(typeof(maxg)=='undefined'){maxg=255};
				if(typeof(maxb)=='undefined'){maxb=255};
				var re=parseInt(randomRange(minr,maxr));
				var gr=parseInt(randomRange(ming,maxg));
				var br=parseInt(randomRange(minb,maxb));
				return (re<<16) + (gr<<8) + (br);
}
function randomInt (a,b){
				return parseInt(randomRange(a,b+1));
}
function fadeIn () {
				station.alpha=0;
				ui.tempStation.alpha=0;
				game.add.tween(station).to({alpha:1},100, Phaser.Easing.Linear.None, true, 0, false);
				game.add.tween(ui.tempStation).to({alpha:1},100, Phaser.Easing.Linear.None, true, 0, false);
				var r = randomRange(3,4);
				nebula.scale.setTo(r,r);
				r = randomRange(3,6);
				nebula2.scale.setTo(r,r);
				nebula.rotation=randomRange(-0.55,0.55);
				nebula2.rotation=randomRange(-0.55,0.55)+Math.PI;
				if(resolutionY>resolutionX){nebula2.rotation+=randomSign()*Math.PI/2};
				if(resolutionY>resolutionX){nebula.rotation+=randomSign()*Math.PI/2};
				nebula.tint=randomMutedColor(128,255,128,255,128,255);
				nebula2.tint=randomMutedColor(128,255,128,255,128,255);
				planet.baseX=randomRange(300,400)*randomSign();
				planet.baseY=randomRange(300,400)*randomSign();
				planet.rotation=randomRange(0,2*Math.PI);
				planet.baseScale=randomRange(2.5,2.5);
				planet.anchor.setTo(0.5,0.5);
				planet.scale.x=planet.baseScale;
				planet.scale.y=planet.baseScale;
				planet.tint=randomMutedColor(120,255,120,255,120,255);
				planetlod.baseX=planet.baseX;
				planetlod.baseY=planet.baseY;
				planet.x = planet.baseX;
				planet.y = planet.baseY;
				planetlod.rotation=randomRange(0,2*Math.PI);
				planetlod.baseScale=planet.baseScale;
				planetlod.anchor.setTo(0.5,0.5);
				planetlod.scale.x=planetlod.baseScale;
				planetlod.scale.y=planetlod.baseScale;
				planetlod.tint=randomMutedColor(120,255,120,255,120,255);
				planetdirt.tint=(randomRange(40,255) << 16) + (randomRange(40,255) << 8) + randomRange(40,255);
				planetfall.tint=planetlod.tint;//(randomRange(40,255) << 16) + (randomRange(40,255) << 8) + randomRange(40,255);
				hazeRed.alpha=0;
				hazeWhite.alpha=0;
				hazePurple.alpha=0;
				game.add.tween(hazeRed).to({alpha:playerStats.mission.hazeRed},100, Phaser.Easing.Linear.None, true, 0, false);
				game.add.tween(hazeWhite).to({alpha:playerStats.mission.hazeWhite},100, Phaser.Easing.Linear.None, true, 0, false);
				game.add.tween(hazePurple).to({alpha:playerStats.mission.hazePurple},100, Phaser.Easing.Linear.None, true, 0, false);

				hazeRed.tint=randomMutedColor(40,200,40,200,40,200);
				hazeWhite.tint=randomMutedColor(140,255,140,255,140,255);
				hazePurple.tint=randomMutedColor(140,255,140,255,140,255);

				hazeRed.speed=playerStats.mission.hazeRedSpeed;
				hazeWhite.speed=playerStats.mission.hazeWhiteSpeed;
				hazePurple.speed=playerStats.mission.hazePurpleSpeed;
				hazeRed.blendMode=playerStats.mission.hazeRedBlendMode;
				hazePurple.blendMode=playerStats.mission.hazePurpleBlendMode;

}
function newStartShip(){
				a=randomPartsList(basicGear,6);
				a.sort(matchabilityComponentSort);
				player.initPlayerShip(a[0]);
				for(i=1;i<6;i++){
								addPlayerPartInFlight(a[i]);
				}
}
function create () {


				ui = new gameUI();
				ui.initSound();
				ui.initButtons(warButtons);
				gamemode = location.search||'init';
				if (gamemode == '?cheat'){
								gamemode = 'init';
								cheatmode = 1;
				}
				if (gamemode == '?noblood'){
								noblood=1;
				}
				if (gamemode == 'init'){
								game.world.setBounds(-300000, -300000, 600000, 600000);


								hazeWhite = game.add.tileSprite(0, 0, resolutionX, resolutionY, 'starfield6');
								hazeWhite.fixedToCamera = true;
								hazeWhite.scale.x=1;
								hazeWhite.scale.y=1;
								hazeWhite.alpha=0.6; //random()
								hazeWhite.blendMode=0;
								hazeWhite.tilePosition.x = Math.random()*resolutionX;
								hazeWhite.tilePosition.y = Math.random()*resolutionY;
								hazeWhite.speed = 600;
								nebula2 = game.add.sprite(512,512, 'nebula');
								nebula = game.add.sprite(512,512, 'nebula');
								nebula.anchor.setTo(0.5,0.5);
								nebula2.anchor.setTo(0.5,0.5);
								var r = randomRange(3,4);
								nebula.scale.setTo(r,r);
								r = randomRange(3,6);
								nebula2.scale.setTo(r,r);
								nebula.rotation=randomRange(-0.55,0.55);
								nebula2.rotation=randomRange(-0.55,0.55)+Math.PI;
								if(resolutionY>resolutionX){nebula2.rotation+=randomSign()*Math.PI/2};
								if(resolutionY>resolutionX){nebula.rotation+=randomSign()*Math.PI/2};
								nebula.tint=randomMutedColor(128,255,128,255,128,255);
								nebula2.tint=randomMutedColor(128,255,128,255,128,255);



								blurX = game.add.filter('BlurX');
								blurY = game.add.filter('BlurY');
								planet = game.add.sprite(resolutionX/0.8, resolutionY/0.8, 'planetslod');
								planet.baseX=randomRange(-300,400) * randomSign();
								planet.baseY=randomRange(-300,400) * randomSign();
								planetlod = game.add.sprite(resolutionX/0.8, resolutionY/0.8, 'planetslod');
								planetfall = game.add.tileSprite(0, 0, resolutionX/1.5, resolutionY/1.5, 'planetfall');
								planetdirt = game.add.tileSprite(0, 0, resolutionX/2, resolutionY/2, 'planetdirt');
								planetlod.baseX=planet.baseX;
								planetlod.baseY=planet.baseY;
								planetdirt.fixedToCamera=true; 
								planetdirt.scale.setTo(1.5,1.5);
								planetdirt.tilePosition.x=0;
								planetdirt.tilePosition.y=0;
								planetfall.fixedToCamera=true; 
								planetfall.scale.setTo(2,2);
								planetfall.tilePosition.x=0;
								planetfall.tilePosition.y=0;
								planetdirt.speed=0;
								planetfall.speed=0;
								hazeRed = game.add.tileSprite(resolutionX/2, resolutionY/2, resolutionX/3, resolutionY/3, 'haze');
								hazeRed.anchor.setTo(0.5,0.5);
								hazeRed.tilePosition.x = Math.random()*resolutionX;
								hazeRed.tilePosition.y = Math.random()*resolutionY;
								hazeRed.fixedToCamera = true;
								hazeRed.baseScale=1;
								hazeRed.scale.x=hazeRed.baseScale;
								hazeRed.scale.y=hazeRed.baseScale;
								hazeRed.alpha=1; //randomRange(0,0.8)-0.2;
								hazeRed.blendMode=1;
								hazeRed.speed = 160;
								hazePurple = game.add.tileSprite(resolutionX/2, resolutionY/2, resolutionX/2, resolutionY/2, 'haze');
								hazePurple.anchor.setTo(0.5,0.5);
								hazePurple.tilePosition.x = Math.random()*resolutionX;
								hazePurple.tilePosition.y = Math.random()*resolutionY;
								hazePurple.fixedToCamera = true;
								hazePurple.baseScale=1.2;
								hazePurple.scale.x=2;
								hazePurple.scale.y=2;
								hazePurple.alpha=1.0; //randomRange(0,0.6)-0.2;
								hazePurple.blendMode=2;
								hazePurple.speed=17;
								station = game.add.sprite(0,0,'station');
								station.anchor.setTo(0.5,0.5)
												asteroids.sort(lengthSort);
								frob1 = game.add.sprite(-200,-200,'station');
								game.physics.enable(frob1, Phaser.Physics.ARCADE);
								frob1.anchor.setTo(0.5,0.5);
								frob1.visible=false;
								ships.sort(lengthSort);

								var temp = game.add.sprite(0,0,'parts');
								temp.visible = false;


								playerStats = new playerMeta ();

								dummy=game.add.sprite(0,0,'parts',0);
								dummy.kill();

								pool = new partsPool();
								dragPool = new dragPartsPool();
								// end of an era
								var startShip = randomShip(basicGear,5,0,true);
								if(cheatmode){startShip = randomShip(allLootableItems(),parseInt(randomRange(3,8)))}
								cameraTarget = game.add.sprite(0,0);
								cameraTarget.visible=false;
								player = new playerShip(startShip);
								newStartShip();
								player.health = player.healthMax;
								mockPlayer = new mockPlayerShip(player.ship);

								//  The enemies bullet group
								enemyBullets = game.add.group();
								enemyBullets.createMultiple(200, 'bullet');
								game.physics.enable(enemyBullets, Phaser.Physics.ARCADE);
								enemyBullets.setAll('body.immovable', true);
								enemyBullets.setAll('anchor.x', 0.5);
								enemyBullets.setAll('anchor.y', 0.5);
								enemyBullets.setAll('lifespan',5000)
												enemyBullets.setAll('outOfBoundsKill', true);
								for (var i=0;i<enemyBullets.length;i++){
												var bullet = enemyBullets.getAt(i);
												for (var j=0;j<bulletTypes.length;j++){              
																var bulletType = bulletTypes[j];
																bullet.animations.add(bulletType.name, [bulletType.id]);
												}
								}

								enemyThrust = game.add.emitter(0,0,0);

								explosions = game.add.group();
								explosions.createMultiple(350, 'explosions');
								game.physics.enable(explosions, Phaser.Physics.ARCADE);
								explosions.setAll('anchor.x', 0.5);
								explosions.setAll('anchor.y', 0.5);
								explosions.setAll('lifespan',5000);
								explosions.setAll('blendMode',1);
								for (var i=0;i<explosions.length;i++){
												var explosion = explosions.getAt(i);
												for (var j=0;j<bulletTypes.length;j++){              
																var bulletType = bulletTypes[j];
																explosion.animations.add(bulletType.name, [bulletType.id]);
												}
								}

								sparkleExplosions = game.add.group();
								sparkleExplosions.createMultiple(50, 'sparkles');
								game.physics.enable(sparkleExplosions, Phaser.Physics.ARCADE);
								sparkleExplosions.setAll('anchor.x', 0.5);
								sparkleExplosions.setAll('anchor.y', 0.5);
								sparkleExplosions.setAll('lifespan',5000);
								sparkleExplosions.setAll('blendMode',1);

								enemies = [];

								pew = game.add.emitter(0,0,200);
								pew.makeParticles('sparks');
								pew.blendMode=1;
								pew.setAlpha(2,0,900,Phaser.Easing.Sinusoidal.Out);
								pew.gravity=0;

								bullets = game.add.group();
								bullets.createMultiple(30, 'bullet');
								game.physics.enable(bullets, Phaser.Physics.ARCADE);
								bullets.setAll('anchor.x', 0.5);
								bullets.setAll('anchor.y', 0.5);
								bullets.setAll('outOfBoundsKill', true);
								bullets.setAll('lifespan', 1000);
								//define bullet sprites
								for (var i=0;i<bullets.length;i++){
												var bullet = bullets.getAt(i);
												for (var j=0;j<bulletTypes.length;j++){              
																var bulletType = bulletTypes[j];
																bullet.animations.add(bulletType.name, [bulletType.id]);
												}
								}
								debris = game.add.group();
								debris.createMultiple(30, 'parts');
								game.physics.enable(debris, Phaser.Physics.ARCADE);
								debris.setAll('anchor.x',0.5);
								debris.setAll('anchor.y', 0.5);
								debris.setAll('outOfBoundsKill', true);
								debris.setAll('lifespan', 60000);

								loots = game.add.group();
								loots.createMultiple(30, 'parts');
								game.physics.enable(loots, Phaser.Physics.ARCADE);
								loots.setAll('anchor.x',0.5);
								loots.setAll('anchor.y', 0.5);
								loots.setAll('outOfBoundsKill', true);
								loots.setAll('lifespan', 60000);
								game.camera.follow(cameraTarget);
								game.camera.focusOnXY(0, 0);

								sparkles = game.add.emitter(0,0,100);
								sparkles.makeParticles('sparkles',[0,1,2,3,4,5,6,7]);
								sparkles.setAlpha(1,0,2000);
								sparkles.blendMode = 1;
								sparkles.lifespan=200;
								otherGraphics = game.add.graphics(0,0);

								sparklesCyan = game.add.emitter(0,0,100);
								sparklesCyan.makeParticles('sparklescyan',[0,1,2,3,4,5,6,7]);
								sparklesCyan.setAlpha(1,0,2000);
								sparklesCyan.blendMode = 1;
								sparklesCyan.lifespan=400;
				}

				pad1 = game.input.gamepad.pad1;  
				game.input.gamepad.start();
				game.input.gamepad.setDeadZones(0.25);
				cursors =  {
up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
		down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
		left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
		right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
		up2: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down2: game.input.keyboard.addKey(Phaser.Keyboard.S),
		left2: game.input.keyboard.addKey(Phaser.Keyboard.A),
		right2: game.input.keyboard.addKey(Phaser.Keyboard.D),
		fire: game.input.keyboard.addKey(Phaser.Keyboard.X),
		alt: game.input.keyboard.addKey(Phaser.Keyboard.Z),
		pgup: game.input.keyboard.addKey(Phaser.Keyboard.PAGE_UP),
		pgdn: game.input.keyboard.addKey(Phaser.Keyboard.PAGE_DOWN),
		enter: game.input.keyboard.addKey(Phaser.Keyboard.ENTER),
		lights: game.input.keyboard.addKey(Phaser.Keyboard.F),
				}



				ui.initCombatUi();
				if(cheatmode){
								initMission(1);
				}else{
								initMission(0);
				}
				for(var i=0;i<startParts;i++)
				{
								ui.buyPart();
				}

				hello.visible=false;
				gamemode='war';

				filterIfVisible(hazeRed);
				filterIfVisible(hazeWhite);
				filterIfVisible(hazePurple);
				filterIfVisible(planet);
				filterIfVisible(planetlod);
				filterIfVisible(planetfall);
				filterIfVisible(planetdirt);
				filterIfVisible(nebula);
				filterIfVisible(nebula2);
				blurX.blur=0;
				blurY.blur=0;

}
function filterIfVisible(s, override){
				if(typeof(override)=='undefined'){
								override=false;
				}
				if(!isAndroid || override){
								if(!(s.visible && s.alpha > 0.3) && typeof(s.filters)!='undefined'){
												s.filters=undefined;
								}
								if(s.visible && s.alpha > 0.3 && typeof(s.filters)=='undefined'){
												s.filters=[blurX,blurY];
								}
				}
}
function fadeSpark(s) {
				s.alpha-=0.01*game.time.physicsElapsed;
				s.scale.setTo(s.scale.x*1.03,s.scale.y*1.03);
				if(s.lifespan>175 && s.lifespan < 201){
								s.scale.setTo(1,1);
								s.alpha=0.8;
				}
}
function fade(s) {
				s.alpha-=0.01*game.time.physicsElapsed;
				s.scale.setTo(s.scale.x*1.03,s.scale.y*1.03);
				if(s.lifespan>750){
								s.scale.setTo(1,1);
								s.alpha=0.8;
				}
}

function lootSparkle(s){

				var halfWidth = s.width * 0.5;
				sparkles.x=s.x+randomRange(-1 * halfWidth,halfWidth);
				sparkles.y=s.y+randomRange(-1 * halfWidth,halfWidth);
				var tempC;
				tempC = (Math.sin(randomRange(0,-0.5*Math.PI)));
				tempC*=0.5;
				sparkles.minParticleSpeed.setTo(tempC*s.body.velocity.x,tempC*s.body.velocity.y);
				sparkles.maxParticleSpeed.setTo(tempC*s.body.velocity.x,tempC*s.body.velocity.y);
				sparkles.lifespan=(Math.sin(randomRange(0,0.5*Math.PI)))*500;
				sparkles.emitParticle();

}

function epicLootSparkle(s){

				var halfWidth = s.width * 0.5;
				sparklesCyan.x=s.x+randomRange(-1 * halfWidth,halfWidth);
				sparklesCyan.y=s.y+randomRange(-1 * halfWidth,halfWidth);
				var tempC;
				tempC = (Math.sin(randomRange(0,-0.5*Math.PI)));
				tempC*=0.5;
				sparklesCyan.minParticleSpeed.setTo(tempC*s.body.velocity.x,tempC*s.body.velocity.y);
				sparklesCyan.maxParticleSpeed.setTo(tempC*s.body.velocity.x,tempC*s.body.velocity.y);
				sparklesCyan.lifespan=(Math.sin(randomRange(0,0.5*Math.PI)))*500;
				sparklesCyan.emitParticle();

}
function sparkleBullets(s) {
				if(game.time.now>s.nextSparkle){
								s.sparkle(explosions,s.x,s.y,s);
								s.nextSparkle=game.time.now+150;
				}
}
function targetLoot (s){
				if(Math.abs(game.input.activePointer.worldX - s.x) < 80 &&
												Math.abs(game.input.activePointer.worldY - s.y) < 80) {
								player.behavior='target';
								player.target=s;
				}
}
function targetBulletIfCorpse (s){
				if(s.bulletSprite == 13 &&Math.abs(game.input.activePointer.worldX - s.x) < 80 &&
												Math.abs(game.input.activePointer.worldY - s.y) < 80) {
								player.behavior='target';
								player.target=s;
				}
}
function pullLootToPlayer(s) {
				if (!player.alive){
								s.kill();
				}
				if(s.alive){
								targetLoot(s);
								if(Math.random() < 0.3 && onscreen(s.x,s.y)){
												lootSparkle(s);
								}
								var targetDistance = game.physics.arcade.distanceBetween(s, player.sprite.body); 

								if(targetDistance < player.lootRange){
												var targetVelocity = (player.lootRange*2)-targetDistance;// * (Math.floor(5000,game.time.now-s.pullTime)/5000);
												var targetAngle = game.physics.arcade.angleBetween(s, player.sprite); 
												game.physics.arcade.velocityFromRotation(targetAngle, targetVelocity, s.body.velocity);
												s.body.velocity.x+=player.sprite.body.velocity.x;
												s.body.velocity.y+=player.sprite.body.velocity.y;
												otherGraphics.lineStyle(parseInt(randomRange(1,3)), 0x00CcFF, randomRange(0.3,0.8));
												otherGraphics.moveTo(s.x, s.y);
												otherGraphics.lineTo(player.sprite.x,player.sprite.y);

								}
				}
}
function handleMission() {

				if(playerStats.mission.win.condition=='kill'){
								if(playerStats.mission.win.killCount<=playerStats.kills){
												playerStats.mission.complete=true;
								}
				}
				if(playerStats.crew > 1){
								playerStats.mission.complete=true;
				}

				if((playerStats.mission.complete || playerStats.mission.win.condition=='frob') &&
												game.physics.arcade.overlap(player.sprite,frob1))
				{
								playerStats.mission.complete=true; //just for frob-only missions
								winMission(); 
								ui.partsUI(player.ship);
								//temporarily disable
								ui.endPartsUI();
								nextUIDelay=game.time.now+1000;
				}
				/*        if(playerStats.mission.complete && playerStats.mission.outro.length){
									ui.sound_complete.play();
									ui.skipText();
									for(var i=0;i<playerStats.mission.outro.length;i++){
									ui.texts.push(playerStats.mission.outro[i]);
									}

									playerStats.mission.outro=[];
									}
				 */

}

function winMission(){

				if(playerStats.mission.complete){
								var s = 'completed ' + playerStats.mission.name + '. ';
								ui.skipText();
								ui.texts.push(s);
								var n = Math.floor(randomRange(0,playerStats.mission.next.length));
								var nextMission = playerStats.mission.next[n];
								initMission(nextMission);

								if(playerStats.crew>0){
												playerStats.crew-=1;
								}

								playerStats.mission.complete=true; //maybe one day we'll implement missions again
								playerStats.kills=0;
				}
}

function enemyBulletTracking(bullet){
				if(bullet.tracking > 0 && game.time.now > bullet.nextTrack){
								var angle = compareAngles(bullet.rotation, game.physics.arcade.angleBetween(bullet, ownerFromName(bullet.owner.name).target));
								if(Math.abs(angle)>bullet.tracking * 0.04){
												bullet.rotation -= angle * bullet.tracking * 0.02 / Math.abs(angle);
								}
								game.physics.arcade.velocityFromRotation(bullet.rotation, getHypo(bullet.body.velocity.x,bullet.body.velocity.y), bullet.body.velocity);

								bullet.nextTrack = game.time.now+20;
				}
}
function playerBulletTracking(bullet){
				if(bullet.tracking > 0 && game.time.now > bullet.nextTrack){
								var angle = compareAngles(bullet.rotation, game.physics.arcade.angleBetween(bullet, ui.enemies[0].sprite));
								if(Math.abs(angle)>bullet.tracking * 0.04){
												bullet.rotation -= angle * bullet.tracking * 0.02 / Math.abs(angle);
								}
								game.physics.arcade.velocityFromRotation(bullet.rotation, getHypo(bullet.body.velocity.x,bullet.body.velocity.y), bullet.body.velocity);

								bullet.nextTrack = game.time.now+20;
				}
}

function revertGroup(group){

				for(var i=0;i<group.length;i++){
								var sprite=group.getAt(i);
								sprite.x-=sprite.body.velocity.x*game.time.physicsElapsed;
								sprite.y-=sprite.body.velocity.y*game.time.physicsElapsed;
								sprite.lifespan+=game.time.physicsElapsed*1000;  
								sprite.angle-=sprite.body.angularVelocity*game.time.physicsElapsed;


				}
}

function update () {
				decayCurrentBrightness();
				if(gamemode!='paused'){
								cameraTarget.reset(player.sprite.body.x+(0.5*player.sprite.body.width),player.sprite.body.y+(0.5*player.sprite.body.width));
				}
				//suppress odd large explosions bug
				/*explosions.forEach(function(e){
					if(!e.alive || !e.visible || !onscreen(e.x,e.y)){
					killTweensFromExplosion(e);
					e.scale.setTo(1,1);
					}
					},this);*/
				if(gamemode!='init'){
								//
								// get controls before any updates
								//

								otherGraphics.clear();
								headlight();

								var left = 0;
								var right = 0;
								var up = 0;
								var down = 0;
								var fire = 0;
								var light = 0;
								var alt = 0;
								var enter = 0;

								//
								if(pad1.buttonValue(Phaser.Gamepad.XBOX360_DPAD_UP)){
												joystickUsed=true;
												up=1;
								}
								if(pad1.buttonValue(Phaser.Gamepad.XBOX360_DPAD_DOWN)){
												joystickUsed=true;
												down=1;
								}
								if(pad1.buttonValue(Phaser.Gamepad.XBOX360_DPAD_LEFT)){
												joystickUsed=true;
												left=1;
								}
								if(pad1.buttonValue(Phaser.Gamepad.XBOX360_DPAD_RIGHT)){
												joystickUsed=true;
												right=1;
								}
								if(pad1.buttonValue(Phaser.Gamepad.XBOX360_LEFT_TRIGGER)){
												joystickUsed=true;
												alt=1;
								}
								if (pad1.axis(2) > 0.3) //left trigger
								{
												joystickUsed=true;
												alt = 1;
								}
								if (pad1.axis(6) < -0.3) //dpad x
								{
												joystickUsed=true;
												left = 1;
								}
								if (pad1.axis(6) > 0.3)
								{
												joystickUsed=true;
												right = 1;
								}
								if (pad1.axis(7) < -0.3) //dpad y
								{
												joystickUsed=true;
												up = 1;
								}
								if (pad1.axis(7) > 0.3)
								{
												joystickUsed=true;
												down = 1;
								}
								if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.3)
								{
												joystickUsed=true;
												left = pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
								}
								if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.3)
								{
												joystickUsed=true;
												right = pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
								}
								if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.3)
								{
												joystickUsed=true;
												up = pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
								}
								if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.3)
								{
												joystickUsed=true;
												down = pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
								}
								if (pad1.buttonValue(Phaser.Gamepad.XBOX360_X))
								{
												joystickUsed=true;
												fire = 1;
								}
								if (pad1.buttonValue(Phaser.Gamepad.XBOX360_A))
								{
												joystickUsed=true;
												up = 1;
								}

								if (pad1.buttonValue(Phaser.Gamepad.XBOX360_B))
								{
												joystickUsed=true;
												alt = 1;
								}
								if (pad1.buttonValue(7) || pad1.buttonValue(Phaser.Gamepad.XBOX360_START)) //start
								{
												joystickUsed=true;
												enter = 1;
								}  
								if (cursors.left.isDown || cursors.left2.isDown){
												left = 1;
								}
								if (cursors.right.isDown || cursors.right2.isDown){
												right = 1;
								}
								if (cursors.up.isDown || cursors.up2.isDown){
												up = 1;
								}
								if (cursors.down.isDown || cursors.down2.isDown){
												down = 1;
								}
								if (cursors.fire.isDown){
												fire = 1;
								}
								if (cursors.lights.isDown){
												light = 1;
								}
								if (cursors.alt.isDown){
												alt = 1;
								}
								if (cursors.enter.isDown){
												enter = 1;
								}
								if (left || right || up || down || fire || alt || enter) {
												player.behavior='manual';
								}
								if (game.input.mouse.button == Phaser.Mouse.RIGHT_BUTTON){
												alt = 1; //don't force player back to manual mode
								}
								if (!game.input.activePointer.isDown|| game.input.mouse.button == Phaser.Mouse.RIGHT_BUTTON) {
												attemptTarget=true;
								}
								if (game.input.activePointer.isDown && game.input.mouse.button != Phaser.Mouse.RIGHT_BUTTON) {

												//handleButtons
												for(var i=0;i<ui.buttons.length;i++){
																var btn = ui.buttons[i].button;
																var ptr = game.input.activePointer;
																if(ptr.worldX > btn.x - (0.5 * ui.chunkX) && ptr.worldX < btn.x + ui.chunkX - (0.5 * ui.chunkX) &&
																								ptr.worldY > btn.y - (0.5 * ui.chunkY) && ptr.worldY < btn.y + ui.chunkY - (0.5 * ui.chunkY)){
																				ui.buttons[i].downCallback();
																				ui.buttons[i].flash=true;


																}
												}
												if (buttonLeft) {left=1};
												if (buttonRight) {right=1};
												if (buttonUp) {up=1};
												if (buttonDown) {down=1};
												if (buttonFire) {fire=1};
												if (buttonAlt) {alt=1};
												if (buttonEnter) {enter=1};
												if (buttonLight) {light=1};
												var manualPressed = buttonLeft || buttonRight || buttonUp || buttonDown;
												if (manualPressed) {
																player.behavior='manual';
												}
												touchPressed = buttonLeft || buttonRight || buttonUp || buttonDown || buttonFire || buttonAlt || buttonEnter || buttonOther ||buttonLight;
												buttonLeft =0; buttonRight =0; buttonUp =0; buttonDown =0; buttonFire =0; buttonAlt =0; buttonEnter =0; buttonLight=0; buttonOther = 0;
												if(!touchPressed){
																player.targetAngle=game.physics.arcade.angleToPointer(player.sprite);
												}
												if(attemptTarget && !touchPressed && gamemode=='war'){
																player.behavior='move';
																for (var i = 0; i < enemies.length; i++){
																				if (enemies[i].alive){
																								if(Math.abs(game.input.activePointer.worldX - enemies[i].sprite.x) < 80 &&
																																Math.abs(game.input.activePointer.worldY - enemies[i].sprite.y) < 80) {
																												ui.sound_redalert.play()
																																player.behavior='target';
																												player.target=enemies[i].sprite;
																												ui.radar[0].scale.setTo(3,3);
																												game.add.tween(ui.radar[0].scale).to({x:1,y:1},250, Phaser.Easing.Quadratic.Out, true, 0, false);
																								}
																				}

																}  
																enemyBullets.forEachAlive(targetBulletIfCorpse,this);
																attemptTarget=false;
												}
								}else{
												touchPressed=0;
								}
								////
								if(gamemode=='?build'){

												for (var i = 0; i < ui.parts.length; i++){
																ui.parts[i].update();
												}

												player.sprite.body.velocity.x=0;
												player.lastVelocityX=0;
												player.sprite.body.velocity.y=0;
												player.lastVelocityY=0;

												if(game.time.now > nextUIDelay){ 

																if(ui.buildMode=='select')
																{
																				if (left){
																								ui.previousPart();
																								nextUIDelay = game.time.now+1000;
																				}
																				if (right){
																								ui.nextPart();  
																								nextUIDelay = game.time.now+1000;
																				}
																				if ((cursors.pgdn.isDown)){
																								ui.rowDownPart(16);  
																								nextUIDelay = game.time.now+1000;
																				}
																				if ((cursors.pgup.isDown)){
																								ui.rowUpPart(16);  
																								nextUIDelay = game.time.now+1000;
																				}
																				if (down){
																								ui.rowDownPart();  
																								nextUIDelay = game.time.now+1000;
																				}
																				if (up){
																								ui.rowUpPart();  
																								nextUIDelay = game.time.now+1000;
																				}

																				if(fire && playerStats.inventory.length){
																								selectPart();
																								nextUIDelay = game.time.now+2000;
																								ui.currentPlayerPart = ui.parts.length-1;
																								ui.setMode('move');
																								ui.updatePart();
																				}
																				if(alt && ui.parts.length > 2){
																								ui.currentPlayerPart = 0;
																								ui.nextDeletePart();
																								nextUIDelay = game.time.now+2000;
																								ui.setMode('delete');
																								ui.updatePart();
																				}
																				if (enter && game.time.now > nextUIDelay + 2000){
																								ui.endPartsUI();
																								nextUIDelay=game.time.now+1000;
																				}
																}else if(ui.buildMode=='move'){

																				if (left){
																								ui.parts[ui.currentPlayerPart].sprite.reset(ui.parts[ui.currentPlayerPart].sprite.x-16,ui.parts[ui.currentPlayerPart].sprite.y)  
																												nextUIDelay = game.time.now+500;
																				}
																				if (right){
																								ui.parts[ui.currentPlayerPart].sprite.reset(ui.parts[ui.currentPlayerPart].sprite.x+16,ui.parts[ui.currentPlayerPart].sprite.y)  
																												nextUIDelay = game.time.now+500;
																				}
																				if (up){
																								ui.parts[ui.currentPlayerPart].sprite.reset(ui.parts[ui.currentPlayerPart].sprite.x,ui.parts[ui.currentPlayerPart].sprite.y-16)  
																												nextUIDelay = game.time.now+500;
																				}
																				if(fire){
																								ui.setMode('select');
																								ui.parts[ui.currentPlayerPart].sprite.alpha=1;
																								ui.parts[ui.currentPlayerPart].sprite.blendMode=0;
																								nextUIDelay = game.time.now+2000;
																								ui.updatePart();
																								ui.partsArray();
																				}
																				if(alt && ui.currentPlayerPart > 0){
																								ui.setMode('select');
																								nextUIDelay = game.time.now+2000;
																								playerStats.inventory.push(ui.parts[ui.currentPlayerPart].index);
																								ui.parts[ui.currentPlayerPart].sprite.kill();        
																								ui.cullParts();
																								ui.currentPlayerPart = ui.parts.length-1;

																								ui.updatePart();
																								ui.partsArray(); //recalc rectangle
																				}
																				if (down){
																								ui.parts[ui.currentPlayerPart].sprite.reset(ui.parts[ui.currentPlayerPart].sprite.x,ui.parts[ui.currentPlayerPart].sprite.y+16)  
																												nextUIDelay=game.time.now+500;
																				}

																}else if(ui.buildMode=='delete'){

																				if (left){

																								ui.previousDeletePart();  
																								nextUIDelay = game.time.now+500;

																				}
																				if (right){
																								ui.nextDeletePart();  
																								nextUIDelay = game.time.now+500;
																				}
																				if (up){
																								ui.rowUpDeletePart();  
																								nextUIDelay = game.time.now+500;
																				}
																				if (down){
																								ui.rowDownDeletePart();  
																								nextUIDelay=game.time.now+500;
																				}
																				if(alt){
																								ui.setMode('select');
																								ui.parts[ui.currentPlayerPart].sprite.alpha=1;
																								ui.parts[ui.currentPlayerPart].sprite.blendMode=0;
																								nextUIDelay = game.time.now+2000;
																								ui.updatePart();
																								ui.endPartsUI();
																								ui.partsArray();
																				}
																				if(fire){
																								nextUIDelay = game.time.now+2000;
																								var t = ui.currentPlayerPart;
																								ui.previousDeletePart();
																								playerStats.inventory.push(ui.parts[t].index);
																								ui.parts[t].sprite.kill();        
																								ui.cullParts();
																								ui.updatePart();
																								ui.partsArray(); //recalc rectangle
																								if(ui.parts.length==2){
																												ui.setMode('select');
																												ui.parts[ui.currentPlayerPart].sprite.alpha=1;
																												ui.parts[ui.currentPlayerPart].sprite.blendMode=0;
																												nextUIDelay = game.time.now+2000;
																												ui.updatePart();
																												ui.partsArray();
																								}

																				}

																}
												}
												if(left==0 && right==0 && up == 0 && down ==0 &&
																				fire == 0 && alt == 0 &&
																				!cursors.pgup.isDown && !cursors.pgdn.isDown && enter == 0
													){
																nextUIDelay = 0;
												}
								}
								if(gamemode=='paused'){
												//anything that relates to player locn goes here


												if((enter && game.time.now >= nextUIDelay) ||
																				(pauseResumeTime > 0 && game.time.now > pauseResumeTime)){

																unpause();
												}else{
																pausedRevertSprites();

																if(pauseResumeTime ==0){
																				ui.comms.fill="rgb(21," + Math.floor((1+Math.sin(game.time.now/1000))*100) + ",142)";

																				ui.comms.setText('paused');
																				ui.comms.alpha=1;
																				ui.graphics.beginFill(0x000000, ui.comms.alpha/3);
																				ui.graphics.drawRect(ui.comms.x - 15, ui.comms.y - 6, ui.comms.width + 30, ui.comms.height + 12);
																}
																if(left==0 && right==0 && up == 0 && down ==0 &&
																								fire == 0 && alt == 0 &&
																								!cursors.pgup.isDown && !cursors.pgdn.isDown && enter == 0
																	){
																				nextUIDelay = 0;
																}
												}
								}

								if(gamemode=='war' ){

												handleMission();

												checkForNewMusic();

												if(nextSpawn<game.time.now||nextSpawn==0){
																if(!player.alive){
																				player.initPlayerShip(randomShip(basicGear,3));
																				if(cheatmode){player.initPlayerShip(randomShip(allLootableItems(),parseInt(randomRange(3,8))))}
																				if(contextTutorialDeath){
																								ui.skipText();
																								ui.texts.push(contextTutorialDeath);
																								contextTutorialDeath='';
																				}
																				winMission(); 
																				fadeIn();
																				ui.partsUI(player.ship);
																				//temporarily disable
																				ui.endPartsUI();
																				nextUIDelay=game.time.now+1000;
																}
																for(var c = 0; c < enemies.length ; c++) {
																				if (enemies[c].alive==false && enemies[c].respawn && game.time.now > enemies[c].died){
																								enemies[c].initEnemyShip();
																								break;
																				};
																}
																nextSpawn=game.time.now+randomRange(100,200);
												}  


												if(loots.getFirstAlive() != null) {

																for (var i = 0; i < player.parts.length; i++) {
																				game.physics.arcade.overlap(loots, player.parts[i].sprite, playerGotLoot, null, this);
																}
																loots.forEachAlive(pullLootToPlayer, this);
												}

												if(enemyBullets.getFirstAlive() != null) {

																for (var i = 0; i < player.parts.length; i++) {
																				game.physics.arcade.overlap(enemyBullets, player.parts[i].sprite, bulletHitPlayer, null, this);
																}
																enemyBullets.forEachAlive(sparkleBullets,this);
												}
												bullets.forEachAlive(sparkleBullets,this);

												for (var i = 0; i < enemies.length; i++){
																if (enemies[i].alive){
																				enemies[i].update();
																				if(enemyBullets.getFirstAlive() != null) {

																								game.physics.arcade.overlap(enemyBullets, enemies[i].sprite, bulletHitEnemy, null, this);
																				}
																				for (var j = 0; j < player.parts.length; j++) {
																								game.physics.arcade.overlap(enemies[i].sprite, player.parts[j].sprite, enemyTouchPlayer, null, this);
																				}
																				for (var j = i; j < enemies.length; j++) {
																								game.physics.arcade.overlap(enemies[i].sprite, enemies[j].sprite, enemyTouchEnemy, null, this);
																				}  
																				game.physics.arcade.overlap(bullets, enemies[i].sprite, bulletHitEnemy, null, this);
																				for (var j = 0; j < enemies[i].parts.length; j++) {

																								enemies[i].parts[j].update();

																				}  

																}
												}

												bullets.forEachAlive(playerBulletTracking);
												enemyBullets.forEachAlive(enemyBulletTracking);

												if(player.alive){
																for (var i = 0; i < player.parts.length; i++){
																				player.parts[i].update();
																};
												}
												if(enter && game.time.now >= nextUIDelay && player.alive){
																pause();
												}


												if (left){
																player.left(left);
												}
												if (right){
																player.right(right)
												}
												if (up){
																player.up(up);
												}
												if(player.alive && alt){
																player.alt();
												}
												player.update();
												if(alt==0){ player.cooldown114=0; } 
												if (fire){
																player.fire();
												}
												if (light) {
																if(game.time.now>nextLight){
																				headlightIntensity = 1 - headlightIntensity;
																				nextLight=game.time.now+300;
																}
												}
								}
								nebula2.reset(cameraTarget.x*0.9980,cameraTarget.y*0.9980);
								nebula.reset(cameraTarget.x*0.9985,cameraTarget.y*0.9985);
								// scrolling
								scroll(hazeWhite,-0.0015);


								planet.scaleModifier=(player.sprite.x/planet.baseX)+(player.sprite.y/planet.baseY)+planet.scaleMission;
								planet.scaleModifier/=100;
								planet.scaleModifier+=0.6;
								planet.scaleModifier=Math.pow(planet.scaleModifier,2);
								planet.scaleModifier=Math.min(planet.scaleModifier,2.5);
								planet.scaleModifier=Math.max(planet.scaleModifier,0.4);
								if(planet.scaleModifier<1){planet.scaleModifier=Math.pow(planet.scaleModifier,planet.scaleModifier)};
								planet.scale.setTo(planet.baseScale*planet.scaleModifier);
								planet.speedModifier=.995-(Math.sqrt(Math.pow(10,planet.scaleModifier)*0.00006));

								planet.reset(cameraTarget.x * planet.speedModifier + planet.baseX, cameraTarget.y * planet.speedModifier+planet.baseY);

								planetdirt.blendMode=1;
								planetdirt.scale.setTo(planet.scale.x/4,planet.scale.y/4);
								planetdirt.x=cameraTarget.x-resolutionX/2;
								planetdirt.y=cameraTarget.y-resolutionY/2;
								planetdirt.width=resolutionX/planetdirt.scale.x;
								planetdirt.height=resolutionY/planetdirt.scale.y;
								planetdirt.tilePosition.x=(planet.x-planetdirt.x)/planetdirt.scale.x;
								planetdirt.tilePosition.y=(planet.y-planetdirt.y)/planetdirt.scale.y;



								planetfall.blendMode=0;
								planetfall.scale.setTo(planet.scale.x/4,planet.scale.y/4);
								planetfall.x=cameraTarget.x-resolutionX/2;
								planetfall.y=cameraTarget.y-resolutionY/2;
								planetfall.width=resolutionX/planetfall.scale.x;
								planetfall.height=resolutionY/planetfall.scale.y;
								planetfall.tilePosition.x=(planet.x-planetfall.x)/planetfall.scale.x;
								planetfall.tilePosition.y=(planet.y-planetfall.y)/planetfall.scale.y;
								planetlod.scale.setTo(-1*planet.scale.x,planet.scale.y);
								planetlod.reset(planet.x,planet.y);
								planetdirt.alpha=Math.min(0.77,2.5*(planet.scale.x-3.15));
								planetdirt.alpha=Math.max(0,planetdirt.alpha);
								planetfall.alpha=Math.min(0.5,0.75*(planet.scale.x-3.15));
								planetfall.alpha=Math.max(0,planetfall.alpha);
								planetlod.blendMode=0;
								planet.alpha=1;
								planetlod.alpha=0.5;//Math.min(1,planet.scaleModifier+0.2);

								planetlod.visible=false;
								if(planetlod.alpha>0){
												planetlod.visible=true;
								}
								planetfall.visible=false;
								if(planetfall.alpha>0){
												planetfall.visible=true;
								}

								planetdirt.visible=false;
								nebula.visible=true;
								nebula2.visible=true;
								if(planetdirt.alpha>0){
												planetdirt.visible=true;
												nebula.visible=false
																nebula2.visible=false
								}

								if(blurX.blur>0 && isAndroid){
												planetlod.alpha=Math.max(0,1-(blurX.blur/30));
												planetdirt.alpha-=Math.min(planetdirt.alpha,1-(blurX.blur/50));
												hazePurple.alpha-=Math.min(hazeRed.alpha,1-(blurX.blur/50));
												hazeRed.alpha-=Math.min(hazeRed.alpha,1-(blurX.blur/50));
												nebula.alpha=Math.min(nebula.alpha,1-(blurX.blur/50));
												nebula2.alpha=Math.min(nebula2.alpha,1-(blurX.blur/50));
								}else{
												nebula.alpha=1;
												nebula2.alpha=1;

								}

								planet.visible=true;
								if(planet.alpha<=0){
												planet.visible=false;
								}

								planetfall.visible=false;
								if(planetfall.alpha>0){
												planetfall.visible=true;
								}
								scroll(hazeRed,-0.66);
								scroll(hazePurple,-0.466);
								hazeRed.rotation=0.2*Math.cos(game.time.now/7750);
								hazePurple.rotation=0.2*Math.sin(game.time.now/5240);
								//hazePurple.bringToTop();
								planet.hazeModifier=0;
								planet.hazeModifier=Math.max(0,(2*planet.scaleModifier)-4);
								planet.hazeModifier=Math.min(planet.hazeModifier,0.4);
								hazeRed.scale.setTo(2.5+(Math.cos(game.time.now/11000)+hazeRed.baseScale),(0.8*hazeRed.baseScale+1.5+Math.cos(game.time.now/9000)));
								hazeRed.width=1.5*resolutionX/hazeRed.scale.x;
								hazeRed.height=1.5*resolutionY/hazeRed.scale.y;
								hazePurple.scale.setTo(1+Math.sin(game.time.now/10000)+hazePurple.baseScale+planet.hazeModifier,0.7575*(hazePurple.baseScale+Math.cos(game.time.now/8000)+1+(0.4*planet.hazeModifier)));
								hazePurple.width=1.5*resolutionX/hazePurple.scale.x;
								hazePurple.height=1.5*resolutionY/hazePurple.scale.y;
								hazeRed.speed=playerStats.mission.hazeRedSpeed+playerStats.mission.hazeRedSpeed*planet.hazeModifier*2;
								hazeRed.alpha=playerStats.mission.hazeRed-(0.1*planetdirt.alpha);
								hazeWhite.alpha=playerStats.mission.hazeWhite*(1-planet.hazeModifier);
								hazePurple.alpha=playerStats.mission.hazePurple-(0.1*planetdirt.alpha);
								hazePurple.speed=playerStats.mission.hazePurple+playerStats.mission.hazePurple*planet.hazeModifier*2;
								hazeWhite.visible=false;
								if(hazeWhite.alpha>0 && planetdirt.alpha < 0.1){
												hazeWhite.visible=true;
								}
								hazePurple.visible=false;
								if(hazePurple.alpha>0){
												hazePurple.visible=true;
								}
								hazeRed.visible=false;
								if(hazeRed.alpha>0){
												hazeRed.visible=true;
								}



								ui.update();


								explosions.parent.bringToTop(explosions);

								for(var i=0;i<explosions.length;i++){
												if(typeof(explosions[i])!='undefined'){
																if(typeof(explosions[i].scale)!='undefined'){
																}
												}
								}
				}
				filterIfVisible(hazeRed);
				filterIfVisible(hazeWhite,true);
				filterIfVisible(hazePurple);
				filterIfVisible(planet,true);
				filterIfVisible(planetlod);
				filterIfVisible(planetfall,true);
				filterIfVisible(planetdirt);
				filterIfVisible(nebula);
				filterIfVisible(nebula2);
}
function decayCurrentBrightness(){
				if(currentBrightness>1){
								currentBrightness/=1.2;
				}
				if(currentBrightness<1){
								currentBrightness=1;
				}
}
function warmBoom(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();
								for(var i=0; i < 15; i++){
												smoke(explosionsGroup,x + randomRange(-40,40),y+randomRange(-40,40));
								}
								for(var i=0; i < 10 + (r * 9) ; i ++) { 
												if(forceDead(explosions)){
																var explosion = explosionsGroup.getFirstDead();
																explosion.animations.play(bulletTypeName(Math.random()>0.7 ? 1 : 2));
																explosion.reset(x+randomRange(-80,80),y+randomRange(-80,80));
																explosion.rotation = Math.random()*Math.PI*2;
																explosion.body.angularVelocity=randomRange(400,600)*randomSign();
																explosion.fireVelocity=randomRange(10,390);
																explosion.lifespan=randomRange(1000,5000);
																r=randomRange(1,2);
																explosion.scale.setTo(r,r);
																explosion.alpha=0.9;
																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
																explosion.blendMode=1;
																boomTween(explosion);
												}
								}
				}
}

function hugeBoom(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 10 + (r * 9) ; i ++) { 
												if(forceDead(explosions)){
																var explosion = explosionsGroup.getFirstDead();

																killTweensFromExplosion(explosion);;
																explosion.animations.play(bulletTypeName(Math.random()>0.7 ? 1 : 2));
																explosion.reset(x+randomRange(-80,80),y+randomRange(-80,80));
																explosion.rotation = Math.random()*Math.PI*2;
																explosion.angularVelocity=randomRange(-3,3);
																explosion.fireVelocity=randomRange(600,890);
																explosion.lifespan=2000;
																r=randomRange(4,8);
																explosion.scale.setTo(r,r);
																explosion.alpha=1;
																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
																explosion.blendMode=1;
																boomTween(explosion);
												}
								}
				}
}
function unstableWarpSmoke(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();
								var rCoef = 1;
								if(Math.random()<0.1){rCoef*=randomRange(0.1,5)};
								for(var i=0; i < 1 + (r * 4) ; i ++) { 
												if(forceDead(explosions)){
																var bs = Math.random()>0.5 ? 2 : 10;
																var explosion = explosionsGroup.getFirstDead();

																killTweensFromExplosion(explosion);;
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80);
																explosion.lifespan=randomRange(70,110);
																r=randomRange(0.2,0.24);
																r*=rCoef;
																if(bs==10){explosion.lifespan*=1.2;r*=1.5}
																explosion.body.angularVelocity=randomRange(-50,50);
																explosion.scale.setTo(r,r);
																explosion.alpha=randomRange(0.9,1.7);
																if (bs ==10){
																				explosion.blendMode=Math.random()>0.5?0:2;
																}else{
																				explosion.alpha*=randomRange(2,3);
																				explosion.blendMode=1;
																}
																var q = randomRange(1,3);
																explosion.lifespan*=3*q;
																explosion.fireVelocity/=q;
																explosion.alpha/=q;
																explosion.body.angularVelocity=randomRange(40,80)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																var scaleMod = (bs == 10 ? 7.4 : 6);
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*scaleMod,y:explosion.scale.y*scaleMod},explosion.lifespan, Phaser.Easing.Sinusoidal.Out, true, 0, false);
																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Sinusoidal.Out, true, 0, false);
																explosion.reset(x,y);
																explosion.animations.play(bulletTypeName(bs));

																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function unstableSmoke(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();
								var rCoef = 1;
								if(Math.random()<0.1){rCoef*=randomRange(0.1,5)};
								for(var i=0; i < 1 + (r * 4) ; i ++) { 
												if(forceDead(explosions)){
																var bs = Math.random()>0.5 ? 2 : 10;
																var explosion = explosionsGroup.getFirstDead();

																killTweensFromExplosion(explosion);;
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80);
																explosion.lifespan=randomRange(70,110);
																r=randomRange(0.2,0.24);
																r*=rCoef;
																if(bs==10){explosion.lifespan*=1.2;r*=1.5}
																explosion.body.angularVelocity=randomRange(-50,50);
																explosion.scale.setTo(r,r);
																explosion.alpha=randomRange(0.9,1.7);
																if (bs ==10){
																				explosion.blendMode=Math.random()>0.5?0:2;
																}else{
																				explosion.alpha*=randomRange(2,3);
																				explosion.blendMode=1;
																}
																var q = randomRange(1,3);
																explosion.lifespan*=3*q;
																explosion.fireVelocity/=q;
																explosion.alpha/=q;
																explosion.body.angularVelocity=randomRange(40,80)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																var scaleMod = (bs == 10 ? 7.4 : 6);
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*scaleMod,y:explosion.scale.y*scaleMod},explosion.lifespan, Phaser.Easing.Sinusoidal.Out, true, 0, false);
																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Sinusoidal.Out, true, 0, false);
																explosion.reset(x,y);
																explosion.animations.play(bulletTypeName(bs));

																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function twistSmoke(explosionsGroup, x, y){


				var leftx=x+Math.cos(game.time.now/100)*16;
				var lefty = y +Math.sin(game.time.now/100)*16;
				var rightx = x +Math.cos((game.time.now/100)+Math.PI)*16;
				var righty = y+Math.sin((game.time.now/100)+Math.PI)*16;
				tinySmoke(explosionsGroup, leftx, lefty);
				tinySmoke(explosionsGroup, rightx, righty);
}
function tinyPuff(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 1 + (r * 2) ; i ++) { 
												if(forceDead(explosions)){
																var bs = 10;
																var explosion = explosionsGroup.getFirstDead();

																killTweensFromExplosion(explosion);;
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80);
																explosion.lifespan=randomRange(70,110);
																r=randomRange(0.2,0.28);
																if(bs==10){explosion.lifespan*=1.8;r*=1.5}
																explosion.body.angularVelocity=randomRange(-50,50);
																explosion.scale.setTo(r,r);
																explosion.alpha=randomRange(0.9,1.7);
																if (bs ==10){
																				explosion.blendMode=Math.random()>0.5?0:2;
																}else{
																				explosion.alpha*=randomRange(2,3);
																				explosion.blendMode=1;
																}
																var q = randomRange(1,3);
																explosion.lifespan*=3*q;
																explosion.fireVelocity/=q;
																explosion.alpha/=q;
																explosion.body.angularVelocity=randomRange(40,80)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																var scaleMod = (bs == 10 ? 7.4 : 6);
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*scaleMod,y:explosion.scale.y*scaleMod},explosion.lifespan, Phaser.Easing.Sinusoidal.Out, true, 0, false);
																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Sinusoidal.Out, true, 0, false);
																explosion.reset(x,y);
																explosion.animations.play(bulletTypeName(bs));

																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function tinySmoke(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 1 + (r * 4) ; i ++) { 
												if(forceDead(explosions)){
																var bs = Math.random()>0.5 ? 2 : 10;
																var explosion = explosionsGroup.getFirstDead();

																killTweensFromExplosion(explosion);;
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80);
																explosion.lifespan=randomRange(70,110);
																r=randomRange(0.2,0.24);
																if(bs==10){explosion.lifespan*=1.2;r*=1.5}
																explosion.body.angularVelocity=randomRange(-50,50);
																explosion.scale.setTo(r,r);
																explosion.alpha=randomRange(0.9,1.7);
																if (bs ==10){
																				explosion.blendMode=Math.random()>0.5?0:2;
																}else{
																				explosion.alpha*=randomRange(2,3);
																				explosion.blendMode=1;
																}
																var q = randomRange(1,3);
																explosion.lifespan*=3*q;
																explosion.fireVelocity/=q;
																explosion.alpha/=q;
																explosion.body.angularVelocity=randomRange(40,80)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																var scaleMod = (bs == 10 ? 7.4 : 6);
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*scaleMod,y:explosion.scale.y*scaleMod},explosion.lifespan, Phaser.Easing.Sinusoidal.Out, true, 0, false);
																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Sinusoidal.Out, true, 0, false);
																explosion.reset(x,y);
																explosion.animations.play(bulletTypeName(bs));

																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function greenThrustSmoke(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 1 + (r * 4) ; i ++) { 
												if(forceDead(explosions)){
																var bs = Math.random()>0.5 ? 9 : 10;
																var explosion = explosionsGroup.getFirstDead();

																killTweensFromExplosion(explosion);
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80);
																explosion.lifespan=randomRange(200,250);
																r=randomRange(0.2,0.24);
																if(bs==10){explosion.lifespan*=1.2;r*=1.2}
																explosion.body.angularVelocity=0;
																explosion.scale.setTo(r,r);
																explosion.alpha=randomRange(0.5,0.7);
																explosion.alpha*=2;
																if (bs ==10){
																				explosion.blendMode=Math.random()>0.5?0:2;
																}else{
																				explosion.alpha*=randomRange(3.5,4.5);
																				explosion.blendMode=1;
																}
																var q = randomRange(1,3);
																explosion.lifespan*=q;
																explosion.fireVelocity/=q;
																explosion.alpha/=q;
																explosion.body.angularVelocity=randomRange(40,80)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																var scaleMod = (bs == 10 ? 7.4 : 6);
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*scaleMod,y:explosion.scale.y*scaleMod},explosion.lifespan*1.6, Phaser.Easing.Quadratic.Out, true, 0, false);
																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan*2, Phaser.Easing.Exponential.Out, true, 0, false);
																explosion.reset(x,y);
																explosion.animations.play(bulletTypeName(bs));

																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function foulThrust(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 1 + (r * 4) ; i ++) { 
												if(forceDead(explosions)){
																var bs = Math.random()>0.5 ? 7 : 9;
																var explosion = explosionsGroup.getFirstDead();

																killTweensFromExplosion(explosion);
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80);
																explosion.lifespan=randomRange(200,250);
																r=randomRange(0.2,0.24);
																if(bs==bs){explosion.lifespan*=1.2;r*=1.2}
																explosion.body.angularVelocity=0;
																explosion.scale.setTo(r,r);
																explosion.alpha=randomRange(0.5,0.7);
																explosion.alpha*=4;
																explosion.blendMode=Math.random()>0.5?0:1;
																var q = randomRange(1,3);
																explosion.lifespan*=q;
																explosion.fireVelocity/=q;
																explosion.alpha/=q;
																explosion.body.angularVelocity=randomRange(40,80)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																var scaleMod = (bs == 10 ? 7.4 : 6);
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*scaleMod,y:explosion.scale.y*scaleMod},explosion.lifespan*1.6, Phaser.Easing.Quadratic.Out, true, 0, false);
																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan*2, Phaser.Easing.Exponential.Out, true, 0, false);
																explosion.reset(x,y);
																explosion.animations.play(bulletTypeName(bs));

																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function cleanSmoke(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 1 + (r * 4) ; i ++) { 
												if(forceDead(explosions)){
																var bs = Math.random()>0.5 ? 0 : 10;
																var explosion = explosionsGroup.getFirstDead();

																killTweensFromExplosion(explosion);
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80);
																explosion.lifespan=randomRange(200,250);
																r=randomRange(0.2,0.24);
																if(bs==10){explosion.lifespan*=1.2;r*=1.2}
																explosion.body.angularVelocity=0;
																explosion.scale.setTo(r,r);
																explosion.alpha=randomRange(0.5,0.7);
																explosion.alpha*=2;
																if (bs ==10){
																				explosion.blendMode=Math.random()>0.5?0:2;
																}else{
																				explosion.alpha*=randomRange(3.5,4.5);
																				explosion.blendMode=1;
																}
																var q = randomRange(1,3);
																explosion.lifespan*=q;
																explosion.fireVelocity/=q;
																explosion.alpha/=q;
																explosion.body.angularVelocity=randomRange(40,80)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																var scaleMod = (bs == 10 ? 7.4 : 6);
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*scaleMod,y:explosion.scale.y*scaleMod},explosion.lifespan*1.6, Phaser.Easing.Quadratic.Out, true, 0, false);
																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan*2, Phaser.Easing.Exponential.Out, true, 0, false);
																explosion.reset(x,y);
																explosion.animations.play(bulletTypeName(bs));

																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function smoke(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 1 + (r * 4) ; i ++) { 
												if(forceDead(explosions)){
																var explosion = explosionsGroup.getFirstDead();

																killTweensFromExplosion(explosion);;
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80);
																explosion.lifespan=randomRange(150,300);
																r=randomRange(0.5,1.0);
																explosion.body.angularVelocity=0;
																explosion.scale.setTo(r,r);
																explosion.blendMode=Math.random()>0.5?0:2;
																explosion.alpha=randomRange(0.3,0.5);
																explosion.alpha*=3;
																var q = randomRange(1,4);
																explosion.lifespan*=q;
																explosion.fireVelocity/=q;
																explosion.alpha/=q;
																explosion.body.angularVelocity=randomRange(40,80)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*14,y:explosion.scale.y*14},explosion.lifespan*1.6, Phaser.Easing.Quadratic.Out, true, 0, false);
																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan*2, Phaser.Easing.Exponential.Out, true, 0, false);
																explosion.reset(x+randomRange(-20,20),y+randomRange(-20,20));
																explosion.animations.play(bulletTypeName(10));

																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function killTweensFromSprite(sprite){
				if(typeof(sprite.tween)!='undefined'){
								game.tweens.remove(sprite.tween);
								sprite.tween=undefined;
				}
}function killTweensFromExplosion(explosion){
				if(typeof(explosion.scale)!='undefined'){
								if(typeof(explosion.scale.tween)!='undefined'){
												game.tweens.remove(explosion.scale.tween);
												explosion.scale.tween=undefined;
								}
				}
				if(typeof(explosion.tween)!='undefined'){
								game.tweens.remove(explosion.tween);
								explosion.tween=undefined;
				}
}
function goreBoom(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 5 + (r * 3) ; i ++) { 
												if(forceDead(explosions)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																var rand2 = noblood ? 10 : 13;
																explosion.animations.play(bulletTypeName(rand2));
																explosion.reset(x+randomRange(-20,20),y+randomRange(-20,20));
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80);
																explosion.lifespan=randomRange(250,500);
																r=randomRange(0.3,1.2);
																explosion.body.angularVelocity=0;
																explosion.scale.setTo(r,r);
																explosion.blendMode=1;
																explosion.blendMode=0;
																explosion.alpha=randomRange(0.3,0.4);
																if(Math.random()>0.5){ 
																				var q = randomRange(1,8);
																				explosion.lifespan*=Math.sqrt(rand2)*q/2;
																				explosion.fireVelocity/=q;
																				explosion.body.angularVelocity=randomRange(40,80)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																				explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*14,y:explosion.scale.y*14},explosion.lifespan*1, Phaser.Easing.Sinusoidal.Out, true, 0, false);
																				explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan*2, Phaser.Easing.Exponential.Out, true, 0, false);

																}else{
																				explosion.scale.setTo(explosion.scale.x*2,explosion.scale.y*2);
																				explosion.body.angularVelocity=randomRange(30,60)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																				explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*7,y:explosion.scale.y*7},explosion.lifespan, Phaser.Easing.Quadratic.Out, true, 0, false);
																				explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan*2, Phaser.Easing.Exponential.Out, true, 0, false);
																}


																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function asteroidBoom(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 5 + (r * 6) ; i ++) { 
												if(forceDead(explosions)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																var rand2 = Math.random()>0.5 ? 1 : 10;
																explosion.animations.play(bulletTypeName(rand2));
																explosion.reset(x+randomRange(-20,20),y+randomRange(-20,20));
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80);
																explosion.lifespan=randomRange(250,500);
																r=randomRange(0.5,1.7);
																explosion.body.angularVelocity=0;
																explosion.scale.setTo(r,r);
																explosion.blendMode=0;
																explosion.blendMode=0;
																explosion.alpha=randomRange(0.1,0.3);
																if(rand2==10){ explosion.alpha*=2;
																				var q = randomRange(1,8);
																				explosion.lifespan*=Math.sqrt(rand2)*q/2;
																				explosion.fireVelocity/=q;
																				explosion.alpha/=q;
																				explosion.body.angularVelocity=randomRange(100,160)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																				explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*14,y:explosion.scale.y*14},explosion.lifespan*1, Phaser.Easing.Linear.Out, true, 0, false);
																				explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan*2, Phaser.Easing.Exponential.Out, true, 0, false);

																}else{
																				explosion.scale.setTo(explosion.scale.x*2,explosion.scale.y*2);
																				explosion.body.angularVelocity=randomRange(30,60)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																				explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*7,y:explosion.scale.y*7},explosion.lifespan, Phaser.Easing.Quadratic.Out, true, 0, false);
																				explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan*2, Phaser.Easing.Exponential.Out, true, 0, false);
																}


																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function bigBoom(explosionsGroup, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 5 + (r * 6) ; i ++) { 
												if(forceDead(explosions)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																var rand2 = Math.random()>0.7 ? 1 : 2;
																explosion.animations.play(bulletTypeName(rand2));
																explosion.rotation = Math.random()*Math.PI;
																explosion.fireVelocity=randomRange(30,80) * (2-rand2);
																explosion.lifespan=700 * (6 - 2*rand2);
																r=randomRange(0.5,1.7);
																explosion.body.angularVelocity=0;
																explosion.scale.setTo(r,r);
																explosion.alpha=1.3;

																explosion.blendMode=1;
																if(rand2==1){
																				explosion.blendMode=0;
																				explosion.alpha=0.1;
																				explosion.scale.setTo(explosion.scale.x*2,explosion.scale.y*2);
																};
																if(rand2==2){

																				explosion.body.angularVelocity=randomRange(100,150)*randomSign()*Math.sin(randomRange(0,0.5*Math.PI));
																}
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*12,y:explosion.scale.y*12},explosion.lifespan*0.3, Phaser.Easing.Quadratic.Out, true, 0, false);
																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);

																explosion.reset(x+randomRange(-20,20),y+randomRange(-20,20));

																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}
function shieldEffect(explosionsGroup, bulletSprite, x, y, velx, vely,scale)
{
				scale=Math.sqrt(scale)*0.5;
				var r = Math.random();

				if(forceDead(explosionsGroup)){
								var explosion = explosionsGroup.getFirstDead();
								killTweensFromExplosion(explosion);
								explosion.animations.play(bulletTypeName(0));
								explosion.reset(x,y);
								explosion.rotation=Math.random()*Math.PI;
								explosion.angularVelocity=200;
								explosion.fireVelocity=randomRange(-10,10);
								explosion.lifespan=300;
								explosion.scale.setTo(scale,scale);
								explosion.alpha=0.8;
								explosion.body.velocity.x=velx;
								explosion.body.velocity.y=vely;
								explosion.blendMode=1;
								explosion.tween=game.add.tween(explosion).to({rotation:explosion.rotation+0.2},explosion.lifespan, Phaser.Easing.Linear.None, true, 0, false);
								explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*8,y:explosion.scale.y*8},explosion.lifespan-100, Phaser.Easing.Exponential.Out, true, 0, false);
								explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Linear.InOut, true, 0, false);
				}
				if(forceDead(explosionsGroup)){
								var explosion = explosionsGroup.getFirstDead();
								killTweensFromExplosion(explosion);
								explosion.animations.play(bulletTypeName(bulletSprite || 0));
								explosion.reset(x,y);
								explosion.rotation=Math.random()*Math.PI;
								explosion.angularVelocity=200;
								explosion.fireVelocity=randomRange(-10,10);
								explosion.lifespan=900;
								r=randomRange(0.5*scale,scale);
								explosion.scale.setTo(r,r);
								explosion.alpha=1.7;
								explosion.body.velocity.x=velx;
								explosion.body.velocity.y=vely;
								explosion.blendMode=1;
								explosion.tween=game.add.tween(explosion).to({rotation:explosion.rotation+0.2},explosion.lifespan, Phaser.Easing.Linear.None, true, 0, false);
								boomTween(explosion);
				}
}
function sparkleBoom(explosionsGroup, minSprite, maxSprite, x, y){

				if(onscreen(x,y)){
								var r = Math.random();

								for(var i=0; i < 8 + (r * 6) ; i ++) { 
												if(forceDead(explosionsGroup)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																explosion.loadTexture('sparkles', Math.floor(randomRange(minSprite,maxSprite)));
																explosion.reset(x+randomRange(-8,8),y+randomRange(-8,8));
																explosion.rotation = Math.random()*Math.PI;
																explosion.angularVelocity=randomRange(500,1000);
																explosion.fireVelocity=randomRange(-20,20);
																explosion.lifespan=700;
																r=randomRange(1.2,1.6);
																explosion.scale.setTo(r,r);
																explosion.alpha=1.5;
																explosion.blendMode=1;
																boomTween(explosion);
																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
												}
								}
				}
}


function boomTween(sprite){
				sprite.scale.tween=game.add.tween(sprite.scale).to({x:sprite.scale.x*8,y:sprite.scale.y*8},sprite.lifespan-100, Phaser.Easing.Exponential.Out, true, 0, false);
				sprite.tween=game.add.tween(sprite).to({alpha:0},sprite.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);
}
function midBoom(explosionsGroup, bulletSprite, x, y){

				if(onscreen(x,y)){

								var r = Math.random();

								for(var i=0; i < 3 + (r * 6) ; i ++) { 
												if(forceDead(explosionsGroup)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																explosion.animations.play(bulletTypeName( bulletSprite || 0));
																explosion.reset(x+randomRange(-8,8),y+randomRange(-8,8));
																explosion.rotation = Math.random()*Math.PI;
																explosion.angularVelocity=randomRange(-5,5);
																explosion.fireVelocity=randomRange(-10,10);
																explosion.lifespan=800;
																r=randomRange(1.2,1.7);
																explosion.scale.setTo(r,r);
																explosion.alpha=.7;
																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
																explosion.blendMode=1;
																boomTween(explosion);
												}
								}
				}
}
function fireBoom(explosionsGroup, bulletSprite, x, y, rot){

				if(onscreen(x,y)){

								var r = Math.random();

								for(var i=0; i < 3 + (r * 2) ; i ++) { 
												if(forceDead(explosionsGroup)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																explosion.scale.setTo(1.2,1.2);
																explosion.animations.play(bulletTypeName( bulletSprite || 0));
																explosion.reset(x,y);
																explosion.rotation = rot + randomSign() * randomRange(0.3,1);
																explosion.angularVelocity=randomRange(-5,5);
																explosion.fireVelocity=randomRange(350,600);
																explosion.lifespan=randomRange(350,600);
																explosion.alpha=2;
																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
																explosion.blendMode=1;
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:0.01,y:0.01},explosion.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);

																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Quadratic.Out, true, 0, false);    }
								}

								for(var i=0; i < 3; i ++) { 
												if(forceDead(explosionsGroup)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																explosion.animations.play(bulletTypeName( bulletSprite || 0));
																explosion.reset(x,y);
																explosion.rotation = rot ;
																explosion.angularVelocity=randomRange(-5,5);
																explosion.fireVelocity=randomRange(200,230);
																explosion.lifespan=randomRange(500,800);
																explosion.scale.setTo(1,1);
																explosion.alpha=1.5;
																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
																explosion.blendMode=1;
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:1,y:1},explosion.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);

																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);    }
								}
				}
}
function headlightGlow(explosionsGroup, x, y){

				if(onscreen(x,y)){

								var r = Math.random();
								if(typeof(headlightGlowSprite)=='undefined'){
												if(forceDead(explosionsGroup)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																explosion.animations.play(bulletTypeName(0));
																explosion.reset(x,y);
																explosion.rotation = randomRange(-0.5,0.5);//bullet.rotation+Math.PI;
																if(Math.random()>0.5){explosion.rotation+=Math.PI};
																explosion.lifespan=-1;
																headlightGlowSprite=explosion;
												}
								}

								headlightGlowSprite.animations.play(bulletTypeName(0));
								headlightGlowSprite.reset(x,y);
								headlightGlowSprite.lifespan=-1;
								headlightGlowSprite.body.velocity.x=player.sprite.body.velocity.x;
								headlightGlowSprite.body.velocity.y=player.sprite.body.velocity.y;
								headlightGlowSprite.rotation=game.time.now/5000;
								headlightGlowSprite.scale.setTo(headlightIntensity,headlightIntensity);
								headlightGlowSprite.alpha=headlightIntensity*0.8;
								headlightGlowSprite.blendMode=1;
				}
}
function simpleGlow(explosionsGroup, x, y, bullet){

				if(onscreen(x,y)){

								var r = Math.random();

								if(forceDead(explosionsGroup)){
												var explosion = explosionsGroup.getFirstDead();
												killTweensFromExplosion(explosion);
												explosion.animations.play(bulletTypeName( bullet.bulletSprite));
												var bulletOffsetX = bullet.width * 0.50 * Math.cos(bullet.rotation);
												var bulletOffsetY = bullet.width * 0.50 * Math.sin(bullet.rotation);
												explosion.reset(x + bulletOffsetX,y + bulletOffsetY);
												explosion.rotation = bullet.rotation + randomRange(-0.5,0.5);//bullet.rotation+Math.PI;
												if(Math.random()>0.5){explosion.rotation+=Math.PI};
												explosion.lifespan=Math.min(150,bullet.lifespan);
												r=randomRange(0.5,0.8);
												explosion.body.velocity.x=bullet.body.velocity.x;
												explosion.body.velocity.y=bullet.body.velocity.y;
												explosion.scale.setTo(r*r*5.0*bullet.scale.y,r*r*5.0*bullet.scale.y);
												explosion.alpha=bullet.alpha*0.7;
												explosion.blendMode=1;
												explosion.body.angularVelocity=randomRange(450,200)*randomSign()/r;
								}

				}
}
function airPuffs(explosionsGroup, x, y, bullet){
				if(onscreen(x,y) && Math.random()<0.4){

								var r = Math.random();

								if(forceDead(explosionsGroup)){
												var explosion = explosionsGroup.getFirstDead();
												killTweensFromExplosion(explosion);
												explosion.animations.play(bulletTypeName(10));
												var bulletOffsetX = bullet.width * 0.50 * Math.cos(bullet.rotation);
												var bulletOffsetY = bullet.width * 0.50 * Math.sin(bullet.rotation);
												explosion.reset(x + bulletOffsetX,y + bulletOffsetY);
												explosion.rotation = bullet.rotation + randomRange(-0.5,0.5);//bullet.rotation+Math.PI;
												if(Math.random()>0.5){explosion.rotation+=Math.PI};
												explosion.lifespan=1000;
												r=randomRange(2.4,4.8);
												explosion.body.velocity.x=bullet.body.velocity.x;
												explosion.body.velocity.y=bullet.body.velocity.y;
												explosion.scale.setTo(r,r);
												explosion.alpha=randomRange(0.1,0.3);
												explosion.blendMode=0;
												explosion.body.angularVelocity=randomRange(39,50)*randomSign()/r;
												explosion.scale.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Sinusoidal.Out, true, 0, false);
												explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*randomRange(1.5,2),y:explosion.scale.y*randomRange(1.5,2)},explosion.lifespan, Phaser.Easing.Sinusoidal.Out, true, 0, false);
								}

				}


}
function glow(explosionsGroup, x, y, bullet){

				if(onscreen(x,y)){

								var r = Math.random();

								if(forceDead(explosionsGroup)){
												var explosion = explosionsGroup.getFirstDead();
												killTweensFromExplosion(explosion);
												explosion.animations.play(bulletTypeName( bullet.bulletSprite));
												r = randomRange(-0.2,0.2);
												var bulletOffsetX = bullet.body.velocity.x * game.time.physicsElapsed;
												bulletOffsetX -= bullet.width * 0.40 * Math.cos(bullet.rotation + r);
												var bulletOffsetY = bullet.body.velocity.y * game.time.physicsElapsed; 
												bulletOffsetY -= bullet.width * 0.40 * Math.sin(bullet.rotation + r);
												explosion.reset(x + bulletOffsetX,y + bulletOffsetY);
												explosion.rotation = bullet.rotation + randomRange(-0.5,0.5);//bullet.rotation+Math.PI;
												if(Math.random()>0.5){explosion.rotation+=Math.PI};
												explosion.lifespan=Math.min(150,bullet.lifespan);
												r=randomRange(0.5,0.8);
												explosion.body.velocity.x=bullet.body.velocity.x;
												explosion.body.velocity.y=bullet.body.velocity.y;
												explosion.scale.setTo(r+r*1.4*bullet.scale.y,r*r*1.2*bullet.scale.y);
												explosion.alpha=bullet.alpha;
												explosion.blendMode=bullet.blendMode;
												explosion.body.angularVelocity=randomRange(50,200)*randomSign()/r;

												if(forceDead(explosionsGroup)){
																explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																explosion.animations.play(bulletTypeName( bullet.bulletSprite));
																bulletOffsetX += bullet.width * 0.50 * Math.cos(bullet.rotation);
																bulletOffsetY += bullet.width * 0.50 * Math.sin(bullet.rotation);
																explosion.reset(x + bulletOffsetX,y + bulletOffsetY);
																explosion.rotation = bullet.rotation + randomRange(-0.5,0.5);//bullet.rotation+Math.PI;
																if(Math.random()>0.5){explosion.rotation+=Math.PI};
																explosion.lifespan=Math.min(150,bullet.lifespan);
																r=randomRange(0.5,0.8);
																explosion.body.velocity.x=bullet.body.velocity.x;
																explosion.body.velocity.y=bullet.body.velocity.y;
																explosion.scale.setTo(r*r*5.0*bullet.scale.y,r*r*5.0*bullet.scale.y);
																explosion.alpha=bullet.alpha*0.7;
																explosion.blendMode=1;
																explosion.body.angularVelocity=randomRange(50,200)*randomSign()/r;
												}

								}
				}
}
function rocketTrail(explosionsGroup, x, y, bullet){

				if(onscreen(x,y)){

								tinySmoke(explosionsGroup,x,y);
								var vel = randomRange(25,125)/1000;
								tinySmoke(explosionsGroup,x-(bullet.body.velocity.x*vel),y-(bullet.body.velocity.y*vel));
								var r = Math.random();

								if(forceDead(explosionsGroup)){
												var explosion = explosionsGroup.getFirstDead();
												killTweensFromExplosion(explosion);
												explosion.animations.play(bulletTypeName(bullet.bulletSprite));
												var adjRotation = bullet.rotation + randomRange(-0.2,0.2);
												var bulletOffsetX = bullet.width * 0.4 * Math.cos(adjRotation);
												var bulletOffsetY = bullet.width * 0.4 * Math.sin(adjRotation);
												explosion.reset(x - bulletOffsetX,y - bulletOffsetY);
												explosion.rotation = Math.random()*Math.PI;
												explosion.body.velocity.x=bullet.body.velocity.x*0.95;
												explosion.body.velocity.y=bullet.body.velocity.y*0.95;
												explosion.lifespan=Math.min(250,bullet.lifespan);
												var r = randomRange(0.5,1.7);
												r*=(bullet.scale.x+bullet.scale.y)/2;
												explosion.scale.setTo(r,r);
												explosion.alpha=randomRange(0.7,0.9);
												explosion.body.angularVelocity=randomRange(800,1200)*randomSign();
												explosion.blendMode=1;
												for(var i=0;i<4;i++){
																if(forceDead(explosionsGroup)){
																				explosion = explosionsGroup.getFirstDead();
																				killTweensFromExplosion(explosion);
																				explosion.animations.play(bulletTypeName( bullet.bulletSprite));
																				bulletOffsetX = bullet.width * (0.30 + i) * Math.cos(bullet.rotation);
																				bulletOffsetY = bullet.width * (0.30 + i) * Math.sin(bullet.rotation);
																				explosion.reset(x-bulletOffsetX,y-bulletOffsetY);
																				explosion.rotation = bullet.rotation + randomRange(-0.5,0.5);//bullet.rotation+Math.PI;
																				if(Math.random()>0.5){explosion.rotation+=Math.PI};
																				explosion.lifespan=Math.min(150,bullet.lifespan);
																				r=randomRange(0.6,0.8);
																				explosion.body.velocity.x=bullet.body.velocity.x*Math.pow(randomRange(0.9,1.1),i);
																				explosion.body.velocity.y=bullet.body.velocity.y*Math.pow(randomRange(0.9,1.1),i);
																				explosion.scale.setTo(r*0.5*(4.0-i)*bullet.scale.y,0.5*r*r*(4.0-i)*bullet.scale.y);
																				explosion.alpha=bullet.alpha*Math.pow(0.9,i);
																				explosion.blendMode=1;
																				explosion.body.angularVelocity=randomRange(50,200)*randomSign()/r;
																}
												}
								}
				}
}

function trail(explosionsGroup, x, y, bullet){

				if(onscreen(x,y)){
								var r = Math.random();

								if(forceDead(explosionsGroup)){
												var explosion = explosionsGroup.getFirstDead();
												killTweensFromExplosion(explosion);
												explosion.animations.play(bulletTypeName(bullet.bulletSprite));
												var adjRotation = bullet.rotation + randomRange(-0.2,0.2);
												var bulletOffsetX = bullet.width * 0.4 * Math.cos(adjRotation);
												var bulletOffsetY = bullet.width * 0.4 * Math.sin(adjRotation);
												explosion.reset(x - bulletOffsetX,y - bulletOffsetY);
												explosion.rotation = Math.random()*Math.PI;
												explosion.body.velocity.x=bullet.body.velocity.x*Math.random();
												explosion.body.velocity.y=bullet.body.velocity.y*Math.random();
												explosion.lifespan=Math.min(250,bullet.lifespan);
												var r = randomRange(0.5,0.7);
												r*=(bullet.scale.x+bullet.scale.y)/2;
												explosion.scale.setTo(r,r);
												explosion.alpha=randomRange(0.7,0.9);
												explosion.body.angularVelocity=randomRange(800,1200)*randomSign();
												explosion.blendMode=1;
												if(forceDead(explosionsGroup)){
																explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																explosion.animations.play(bulletTypeName( bullet.bulletSprite));
																bulletOffsetX += bullet.width * 0.50 * Math.cos(bullet.rotation);
																bulletOffsetY += bullet.width * 0.50 * Math.sin(bullet.rotation);
																explosion.reset(x + bulletOffsetX,y + bulletOffsetY);
																explosion.rotation = bullet.rotation + randomRange(-0.5,0.5);//bullet.rotation+Math.PI;
																if(Math.random()>0.5){explosion.rotation+=Math.PI};
																explosion.lifespan=Math.min(150,bullet.lifespan);
																r=randomRange(0.5,0.8);
																explosion.body.velocity.x=bullet.body.velocity.x;
																explosion.body.velocity.y=bullet.body.velocity.y;
																explosion.scale.setTo(r*r*5.0*bullet.scale.y,r*r*5.0*bullet.scale.y);
																explosion.alpha=bullet.alpha*0.7;
																explosion.blendMode=1;
																explosion.body.angularVelocity=randomRange(50,200)*randomSign()/r;
												}
								}
				}
}

function gasBoom(explosionsGroup, x, y, bullet){

				if(onscreen(x,y)){

								var r = Math.random();

								for(var i=0; i < 4; i ++) { 
												if(forceDead(explosionsGroup)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																explosion.animations.play( Math.random(bulletTypeName()>0.5?7:9));
																explosion.reset(x+randomRange(-8,8),y+randomRange(-8,8));
																explosion.rotation = Math.random()*Math.PI*2;
																explosion.fireVelocity=randomRange(-10,10);
																explosion.lifespan=600;
																r=randomRange(0.4,0.8);
																explosion.scale.setTo(r,r);
																explosion.alpha=1;
																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
																explosion.blendMode=0;
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:explosion.scale.x*4,y:explosion.scale.y*4},explosion.lifespan-300, Phaser.Easing.Linear.Out, true, 0, false);
																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);
																explosion.body.angularVelocity=randomRange(200,500)*randomSign();
												}
								}
				}
}

function boom(explosionsGroup, bulletSprite, x, y, damage){

				if(typeof(damage)=='undefined'){
								damage = 1;
				}
				var damageScale = Math.sqrt(damage/2);
				if(onscreen(x,y)){

								var r = Math.random();
								for(var i=0; i < 3 + (r * 2) ; i ++) { 
												if(forceDead(explosionsGroup)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																explosion.animations.play(bulletTypeName( bulletSprite || 0));
																explosion.reset(x,y);
																explosion.rotation = randomSign() * randomRange(0,Math.PI);
																explosion.angularVelocity=randomRange(-5,5);
																explosion.fireVelocity=randomRange(350,600);
																explosion.lifespan=randomRange(350,600);
																explosion.scale.setTo(damageScale*1.2,damageScale*1.2);
																explosion.alpha=2;
																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
																explosion.blendMode=1;
																if(bulletSprite==10){
																				explosion.blendMode = Math.random() > 0.7 ? 0 : 2;
																				explosion.alpha=0.2 + explosion.blendMode * 0.5;
																}
																explosion.scale.tween=game.add.tween(explosion.scale).to({x:0.1,y:0.1},explosion.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);

																explosion.tween=game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Quadratic.Out, true, 0, false);    }
								}


								for(var i=0; i < 3; i ++) { 
												if(forceDead(explosionsGroup)){
																var explosion = explosionsGroup.getFirstDead();
																killTweensFromExplosion(explosion);
																explosion.animations.play(bulletTypeName( bulletSprite || 0));
																explosion.reset(x+randomRange(-8,8),y+randomRange(-8,8));
																explosion.rotation = Math.random()*Math.PI;
																explosion.angularVelocity=randomRange(-5,5);
																explosion.fireVelocity=randomRange(-10,10);
																explosion.lifespan=600;
																r=randomRange(0.6,1);
																r*=damageScale;
																explosion.lifespan+=200*damageScale;
																explosion.scale.setTo(r,r);
																explosion.alpha=1;
																game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
																explosion.blendMode=1;
																boomTween(explosion);
												}
								}
				}
}

function sparks(emitter, sprite){
				if(onscreen(sprite.x,sprite.y)){
								emitter.x=sprite.x+randomRange(-.7*sprite.body.width,sprite.body.width);
								emitter.y=sprite.y+randomRange(-.7*sprite.body.width,sprite.body.width);;
								emitter.minParticleSpeed.setTo(-200,-200);
								emitter.maxParticleSpeed.setTo(200,200);
								emitter.particleFriction = -500;
								emitter.start(true,200,null, randomRange(1,14));
								smoke(explosions, sprite.x, sprite.y);
				}
}
function sparkExplosion(emitter, sprite){
				if(onscreen(sprite.x,sprite.y)){
								emitter.x=sprite.x;
								emitter.y=sprite.y;
								emitter.minParticleSpeed.setTo(-500,-500);
								emitter.maxParticleSpeed.setTo(500,500);
								emitter.particleFriction = -2000;
								emitter.start(true,300,null, 50);
				}
}
function spawnLoots(_count, x, y){
				var lootCount = _count;

				for(var i = 0; i < lootCount; i++)
				{
								if(forceDead(loots)){
												var loot = loots.getFirstDead();
												if(typeof(loot.pulseTween)!='undefined'){
																loot.pulseTween.stop();
												}
												loot.loadTexture('parts', Math.floor(randomRange(0,4))+378); // magic number part id
												loot.lifespan = 60000;
												loot.reset(x + randomRange(-16,16), y+randomRange(-16,16));
												loot.rotation = Math.random()*2*Math.PI;
												game.add.tween(loot).to({rotation:Math.PI*30},loot.lifespan,Phaser.Easing.Exponential.Out, true, 0, false);
												var scale = randomRange(0.8,1.1);
												loot.scale.setTo(scale,scale);
												loot.pullTime=0;
												loot.alpha=2.5;

												loot.pulseTween = game.add.tween(loot).to({alpha:1},randomRange(200,400),Phaser.Easing.Exponential.Out,true,0,Number.MAX_VALUE,true);
												loot.acceleration=200;
												loot.blendMode=0;
												loot.lootType='ore';
												loot.acceleration=0;
												loot.owner='player';
												game.physics.arcade.velocityFromRotation(loot.rotation, randomRange(100,300), loot.body.velocity);
												return loot;
								}
				}
}
//like spawnComponent but it's not loot. this is if we need to throw a part without killing the ship
function spawnDebris(component,x,y){ 
				if(forceDead(debris)){
								var part = debris.getFirstDead();
								part.loadTexture('parts', component);
								part.lifespan = 120000;
								part.scale.setTo(1,1);
								part.reset(x, y);
								part.rotation=0;
								part.body.angularVelocity=200;
								game.add.tween(component).to({rotation:Math.PI*30},part.lifespan,Phaser.Easing.Exponential.Out, true, 0, false);
								part.acceleration=200;
								part.blendMode=0;
								part.alpha=1;
								part.component = component;
								part.acceleration=0;
								game.physics.arcade.velocityFromRotation(Math.random()*2*Math.PI, randomRange(50,player.sprite.body.maxVelocity.x*0.75), part.body.velocity);
								return debris;
				}
}
function spawnComponent(component,x,y){
				if(forceDead(loots)){
								var loot = loots.getFirstDead();
								if(typeof(loot.pulseTween)!='undefined'){
												loot.pulseTween.stop();
								}
								loot.loadTexture('parts', component);
								loot.lifespan = 120000;
								loot.scale.setTo(2,2);
								loot.reset(x + randomRange(-16,16), y+randomRange(-16,16));
								loot.rotation=0;
								game.add.tween(loot).to({rotation:Math.PI*10},loot.lifespan,Phaser.Easing.Exponential.Out, true, 0, false);
								loot.acceleration=200;
								loot.blendMode=0;
								loot.pullTime=0;
								loot.alpha=2.5;
								loot.pulseTween = game.add.tween(loot).to({alpha:1},250,Phaser.Easing.Circular.InOut,true,0,Number.MAX_VALUE,true);
								loot.lootType='component';
								loot.owner='player';
								loot.component = component;
								loot.acceleration=0;
								game.physics.arcade.velocityFromRotation(Math.random()*2*Math.PI, randomRange(50,player.sprite.body.maxVelocity.x*0.75), loot.body.velocity);
								return loot;
				}
}
function playerGotLoot (sprite, loot) {
				if(loot.lootType=='ore'){
								if(player.health>player.healthMax){
												player.health=player.healthMax;
								}
								ui.addDamageNumber(sprite.x,sprite.y,-1);
								player.health+=1;
								player.energy+=player.oreEnergy;
				}else if(loot.lootType=='component'){
								//playerStats.inventory.push(loot.component);
								shieldEffect(explosions, 4, sprite.x, sprite.y, sprite.body.velocity.x, sprite.body.velocity.y, player.ship.length);
								if(shipWithoutVoid(player.ship).length < playerSizeMax()){
												addPlayerPartInFlight(loot.component);
												addXp(30);
												ui.skipText();
												ui.texts.push('got ' + components[loot.component].name + '\n' + components[loot.component].flavor);
												pause(500);
								}else{
												var bonusXp = 50 * playerStats.level;
												addXp(bonusXp);
												ui.texts.push('maxed size for level.');
												ui.addDamageNumber(player.sprite.body.x,player.sprite.body.y,1,'+' + bonusXp + ' xp',true);
								}
				}
				ui.sound_beep.play();
				player.sprite.alpha=6;

				game.add.tween(player.sprite).to({alpha:1},700, Phaser.Easing.Circular.Out, true, 0, false);
				sparkleBoom(sparkleExplosions,0,8,loot.x,loot.y);  
				loot.kill();
}
function bulletHitPlayer (sprite, bullet) {

				boom(explosions, bullet.bulletSprite, bullet.x, bullet.y, bullet.damage / damageCoef);
				ui.sound_hit1.play();
				for (var i = 0; i < bullet.bulletHitBehavior.length; i++) {
								bullet.bulletHitBehavior[i](sprite, bullet);
				}

				var destroyed = player.damage(bullet.damage, bullet.owner, bullet.x, bullet.y);

				if(destroyed){
								ui.sound_randomBoom();
				}
				bullet.kill();
}
function enemyTouchEnemy (a, b) {
				if(!onscreen(a.x,a.y)&&!onscreen(b.x,b.y)){
								return;
				}
				var aAi = enemies[a.name].ai;
				var bAi = enemies[b.name].ai;
				if(aAi == bAi) {return;}
				if(aAi == aiModes['asteroidInit'] || bAi == aiModes['asteroidInit']){
								return;
				}
				var enemySprite1;
				var enemySprite2;
				if(aAi == aiModes['asteroid']){
								enemySprite1 = a;
								enemySprite2 = b;
				}else if(bAi == aiModes['asteroid']){
								enemySprite1 = b;
								enemySprite2 = a;
				}else{return;}
				if(enemies[enemySprite1.name].ai==aiModes['asteroid'])
				{

								ui.sound_hit1.play();
								var destroyed = enemies[enemySprite1.name].damage(9999);
								if(destroyed){
												ui.sound_hit1.play();
												//ui.sound_randomBoom();
								}
								var angle=game.physics.arcade.angleBetween(enemySprite2,enemySprite1);
								enemySprite1.body.velocity.x+=Math.cos(angle)*200;
								enemySprite1.body.velocity.y+=Math.sin(angle)*200;
								var e2 = enemies[enemySprite2.name];
								addVelocity(game.physics.arcade.angleBetween(enemySprite1,enemySprite2),getHypo(enemySprite2.body.velocity.x,enemySprite2.body.velocity.y)*0.5*(Math.sqrt(enemies[enemySprite1.name].ship.length)/Math.sqrt(e2.ship.length)), enemySprite2.body.velocity);
								clampVelocity(enemySprite2);
								e2.damage(8*Math.sqrt(enemies[enemySprite1.name].ship.length),
																enemySprite1,
																150  
												 ) ? ui.sound_randomBoom():0;
				}  
}

function enemyTouchPlayer (enemySprite, playerSprite) {
				if(player.sawDamage && enemies[enemySprite.name].ai==aiModes['asteroid'])
				{

								ui.sound_hit1.play();
								var destroyed = enemies[enemySprite.name].damage(player.sawDamage);
								if(destroyed){
												ui.sound_hit1.play();
												//ui.sound_randomBoom();
								}
								var angle=game.physics.arcade.angleBetween(playerSprite,enemySprite);
								enemySprite.body.velocity.x+=Math.cos(angle)*200;
								enemySprite.body.velocity.y+=Math.sin(angle)*200;
								addVelocity(game.physics.arcade.angleBetween(enemySprite,playerSprite),getHypo(playerSprite.body.velocity.x,playerSprite.body.velocity.y)*0.5*(Math.sqrt(enemies[enemySprite.name].ship.length)/Math.sqrt(player.ship.length)), playerSprite.body.velocity);
								clampVelocity(playerSprite);
								player.damage(2*Math.sqrt(enemies[enemySprite.name].ship.length),
																enemySprite,
																enemySprite.x, enemySprite.y
														 ) ? ui.sound_randomBoom():0;
				}  
}

function bulletHitEnemy (sprite, bullet) {

				if(bullet.owner!=sprite){
								ui.sound_hit1.play();
								boom(explosions, bullet.bulletSprite, bullet.x, bullet.y, bullet.damage / targetDamageCoef);

								for (var i = 0; i < bullet.bulletHitBehavior.length; i++) {
												bullet.bulletHitBehavior[i](sprite, bullet);
								}
								var destroyed = enemies[sprite.name].damage(bullet.damage, bullet.owner, bullet.body.velocity);
								if(destroyed){
												if(Math.random()>0.5){
																ui.sound_boom1.play();
												}else{
																ui.sound_boom2.play();
												}
								}
								bullet.kill();
				}

}

function render () {

}

