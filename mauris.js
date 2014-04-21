var gamemode;
var defaultBehavior='neutral';
var cheatmode = 0;
// container for stuff that might persist between games
var playerMeta = function () {
	this.inventory=[];
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
	this.deaths=0;
};
function queryComponent(id){
return components[id].bonus.toString().replace(/target\./g,'').replace(/function.*{/,'').replace(/}/g,'').replace(/bulletBehavior.*/,'CHANGE BULLET BEHAVIOR').replace(/alt=.*/,'ALTERNATE FIRE').replace(/this.*body\./g,'').replace(/this.*sprite\./g,'').replace(/this\./g,'').replace(/[();\[\]{}]/g,'').replace(/\t\t\t.*\n/g,'').replace(/[\t ]*/g,'').replace(/^\n/g,'');
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
function onscreen(x,y) {
	return	(player.sprite.x - resolutionX < x && x < player.sprite.x + resolutionX &&
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
			target.sprite.body.maxVelocity.x-=10;
			target.sprite.body.maxVelocity.y-=10;
			target.sprite.profile+=25;
			target.turnRate-=0.1;
			components[target.ship[i]].bonus(target);
			n++;
		}
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
	target.healthMax = target.health;
	target.sprite.profileMax=target.sprite.profile; 
}

function addVelocity (a,b,c){return"undefined"==typeof b&&(b=60),	c=c||new d.Point,c.setTo(c.x+Math.cos(a)*b,c.y+Math.sin(a)*b)};
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
function randomRange (a,b){var c,d; if(a>b){c=a;d=b;}else{d=a;c=b};return (Math.random()*(c-d))+d};
function randomSign (){return Math.random()>.5?1:-1};
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

	if(a.sprite.profile/game.physics.arcade.distanceBetween(a.sprite,player.sprite)>
			b.sprite.profile/game.physics.arcade.distanceBetween(b.sprite,player.sprite)){
				return -1;
			}else{
				return 1;
			}
}
//////
//
//	There is so much wrong in this.
//		But it's such a pleasure
//			just to hack this out
//				and not worry about it.
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
	this.sprite = game.add.sprite(x,y,sheet,index);
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
	this.sprite.loadTexture('parts', this.component);
	this.alive = true;
	this.sprite.alive=true;
	this.sprite.exists=true;
	this.sprite.alpha=1;
	this.sprite.visible = true;
	this.sprite.reset(this.offsetx,this.offsety);
	this.sprite.anchor.setTo(0.5,0.5);
	this.sprite.bringToTop();
}
shipPart.prototype.update = function(){

	this.sprite.exists=true;
	var ons = onscreen(this.target.x,this.target.y);
	this.sprite.visible=this.sprite.alive && ons;
	if (this.target.alive && this.alive && ons) {
		this.sprite.angle = this.target.angle;
		this.sprite.x = this.target.x + (this.offsetx * Math.cos(game.math.degToRad(this.target.angle)));
		this.sprite.y = this.target.y + (this.offsety * Math.cos(game.math.degToRad(this.target.angle)));
		this.sprite.x -= (this.offsety * Math.sin(game.math.degToRad(this.target.angle)));
		this.sprite.y += (this.offsetx * Math.sin(game.math.degToRad(this.target.angle)));
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

enemyShip.prototype.initEnemyShip = function(ship) {

	this.sprite.rotation=Math.random()*2*Math.PI;
	
	var x = this.target.x + (Math.cos(-1 * this.sprite.rotation) * (randomRange(960,1500) + player.sprite.body.velocity.x));
	var y = this.target.y + (Math.sin(-1 * this.sprite.rotation) * (randomRange(540,1500) + player.sprite.body.velocity.y));
	
	this.nextThrust=0;
	this.fireSound=ui.sound_pew3;
	this.built=false;
	this.sprite.reset(x,y);
	midBoom(explosions,4,x,y);
	this.ship = this.shipList[Math.floor(randomRange(0,this.shipList.length))];
	this.destroyParts()
		this.sprite.profile = 250;
	this.sawDamage=0;
	this.sprite.profileDecay = 166;
	this.nextProfileDecay = 0;
	this.aggroList = [];
	this.holdThrust=0;
	this.oreEnergy=0;
	this.acceleration=1;
	this.health = 3;
	this.bulletHitBehavior=[];
	this.bulletBehavior=[];
	this.ai = 1;
	this.alive=true;
	this.behavior=defaultBehavior;
	this.altCooldown=0;
	this.cooldown114=0;
	this.died=0;
	this.turnRate=0.5;
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


		this.sprite.body.collideWorldBounds = true;
	this.sprite.angle = game.rnd.angle();

	this.sprite.body.maxVelocity.setTo(500,500);

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

	if(this.shield){
		midBoom(explosions,4,this.sprite.x,this.sprite.y);
	}else{
		this.health -= damageCoef * dmg;
	}

	if(this.behavior=='neutral'){
		this.behavior='chasing';
	}

	if(typeof(aggro)!='undefined'){
		this.aggroList.push(aggro);
		this.target = aggro;
	}
	if (this.health <= 0 && this.health + dmg >= 0){
		this.alive = false;
		this.died=game.time.now+10000;

		if (this.ai!=3){
			sparkExplosion(pew, this.sprite);	
		}


		bigBoom(explosions,this.sprite.x,this.sprite.y);
		for (var j = 0; j < this.parts.length; j++) {
			if(Math.random() < lootDropRate + player.dropRate){
				spawnLoots(Math.floor(randomRange(0,4)), this.sprite.x, this.sprite.y);
				this.parts[j].sprite.kill();
			}else if(Math.random() < (componentDropRate) && components[this.parts[j].component].drops){ 
				spawnComponent(this.parts[j].component, this.sprite.x, this.sprite.y);
				this.parts[j].sprite.kill();					
			}else if(this.health == 0 && dmg == 0){
				this.parts[j].sprite.kill();
			}else{
				this.parts[j].sprite.body.velocity = game.physics.arcade.velocityFromRotation(this.game.physics.arcade.angleBetween(this.sprite, this.parts[j].sprite), 200+randomRange(0,10*dmg));
				this.parts[j].sprite.body.angularVelocity=randomRange((dmg+2*14),(dmg+2)*62);					
				if(typeof(bulletVelocity)!='undefined'){
					this.parts[j].sprite.body.velocity.x = this.parts[j].sprite.body.velocity.x + (bulletVelocity.x*.01*dmg);
					this.parts[j].sprite.body.velocity.y = this.parts[j].sprite.body.velocity.y + (bulletVelocity.y*.01*dmg);
				}
			}
		}	
		this.cullParts();
		this.sprite.kill();
		if(typeof(playerStats.mission.win.killType)!='undefined'){
			if(playerStats.mission.win.killType==this.shipList){
				playerStats.kills+=1;
			}
		}
		return true;
	}

	return false;

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
enemyShip.prototype.left = function(){
	this.sprite.angle-=this.turnRate;
};
enemyShip.prototype.right = function(){
	this.sprite.angle+=this.turnRate;
};
enemyShip.prototype.up = function(){

	this.speed = this.acceleration;

};
enemyShip.prototype.fire = function () {
	if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0 &&
			this.energy>=this.fireEnergy){
				this.fireSound.play();
				this.nextFire = this.game.time.now + this.fireRate;
				this.energy-=this.fireEnergy;
				this.spawnBullet(true);
			}

}
enemyShip.prototype.spawnBullet = function (showFlash) {
	if(this.bullets.countDead()){
		var bullet = this.bullets.getFirstDead();
		bullet.rotation=this.sprite.rotation;
		bullet.damage=this.fireDamage;
		bullet.reset(this.sprite.x + (Math.cos(this.sprite.rotation)*(this.sprite.body.width)), this.sprite.y + (Math.sin(this.sprite.rotation)*(this.sprite.body.width)));
		bullet.lifespan = this.fireRange; 
		bullet.alpha=1;
		bullet.blendMode=this.bulletBlendMode;
		bullet.scale.setTo(1,1);
		bullet.tracking = this.fireTracking;
		bullet.nextTrack = 0;
		bullet.bulletHitBehavior=this.bulletHitBehavior;
		bullet.angularVelocity=0;
		bullet.loadTexture('bullet', this.bulletSprite);
		bullet.bulletSprite=this.bulletSprite;		
		bullet.fireVelocity=this.fireVelocity;
		bullet.owner=this.sprite;
		game.physics.arcade.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
		bullet.body.velocity.x += 0.5 * this.sprite.body.velocity.x;
		bullet.body.velocity.y += 0.5 * this.sprite.body.velocity.y;
		bullet.target=player;
		for (var i = 0; i < this.bulletBehavior.length; i++) {
			this.bulletBehavior[i](bullet);
		}
		
		if(showFlash){
		fireBoom(explosions,bullet.bulletSprite,bullet.x,bullet.y,bullet.rotation);
		}	
		return bullet;
	}
}


enemyShip.prototype.emitThrust = function() {
	this.thrust.x=this.sprite.x-(Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.5);
	this.thrust.y=this.sprite.y-(Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.5);
	this.thrust.minParticleSpeed.setTo(0,0);
	this.thrust.maxParticleSpeed.setTo(0,0);
	this.thrust.lifespan=(1-Math.cos(randomRange(0,0.5*Math.PI)))*500;
	this.thrust.lifespan+=200;
	var tempX = randomRange(-18,18);
	var tempY = randomRange(-18,18);
	this.thrust.minParticleSpeed.setTo(tempX,tempY);
	this.thrust.maxParticleSpeed.setTo(tempX,tempY);
	this.thrust.emitParticle();

}

enemyShip.prototype.update = function() {
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
	if (this.game.physics.arcade.distanceBetween(this.sprite, player.sprite) > 5000 ||
			this.game.physics.arcade.distanceBetween(this.sprite, player.sprite) > 2500 && this.ai == 3){

				if(Math.random()>0.5){
				this.target=player.sprite;
				}
				var x = this.target.x + (randomSign() * randomRange(960,1500) + player.sprite.body.velocity.x);
				var y = this.target.y + (randomSign() * randomRange(540,1500) + player.sprite.body.velocity.y);
				this.sprite.reset(x,y);				
				midBoom(explosions,4,x,y);
				if(this.ai==3){

					this.sprite.body.velocity = game.physics.arcade.velocityFromRotation(game.physics.arcade.angleBetween(this.sprite, player.sprite), randomRange(25,100));	
					this.sprite.body.angularVelocity=randomRange(25,100)*randomSign();
				}
			}
	this.sprite.profile = this.sprite.profileMax; //tracking this in detail is hard and unnecessary

	if(game.time.now>this.altCooldown){
		this.shield=false;
	}

	if(this.ai==2){
		//init asteroid stuff
		this.sprite.body.velocity = game.physics.arcade.velocityFromRotation(game.physics.arcade.angleBetween(this.sprite, player.sprite), randomRange(30,130));	
		this.sprite.body.velocity.x*=Math.random();
		this.sprite.body.velocity.y*=Math.random();
		this.sprite.body.angularVelocity=randomRange(25,100)*randomSign();
		this.sprite.profile=0;
		this.sprite.profileMax=0;
		this.ai=3;
	}
	if(this.ai!=3){
		var adjustedProfile = 200 + Math.pow(this.target.profile,profileExponent);
		if(!this.target.alive || 
				(game.physics.arcade.distanceBetween(this.sprite,this.target) > adjustedProfile * 1.5 && this.behavior=='chasing')){
					for(var i=0;i<this.aggroList.length;i++){
						if(this.aggroList[i].alive){		//this will cause the enemy to keep chasing the player if they were fired upon.
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

	if(this.ai!=3 && this.alive && this.target.alive){


		if(this.ai==0){
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
			if(diffAngle*60>this.turnRate)
			{
				this.left();
			}else if(diffAngle*60<-this.turnRate){
				this.right();
			}






			if (targetDistance < adjustedProfile) {
				if(this.behavior=='neutral'){
					this.behavior='chasing';
				}
			}

			if (this.target!= player.sprite || (targetDistance < adjustedProfile * 2 && this.behavior!='neutral')){
				if(Math.abs(diffAngle)<0.25*Math.PI){
					this.up();
				}
			}
			if (targetDistance < this.fireRange * (this.fireVelocity/1000) && 
					targetDistance < adjustedProfile * 1.5){
						if(Math.abs(diffAngle) < 0.5){
							this.fire(); 
						}

					}

		}

		if (this.speed > 0){
			if(game.time.now>(this.nextThrust||0)){

				for(var i=0;i<5;i++){
					this.emitThrust();
				}

				partsToTop(this);	
				this.nextThrust = game.time.now + (500/this.acceleration); 
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
		if(this.ai != 3 && Math.random()>Math.cos((this.health-this.healthMax)/this.healthMax)){
			if(Math.random()>(this.health/this.healthMax)){
				sparks(pew,this.sprite);
			}
		}
	}

}
;
var resolutionX=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var resolutionY=Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-20;
var game = new Phaser.Game(resolutionX, resolutionY, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {
	hello =	game.add.text(resolutionX*0.5,resolutionY*0.4, 'LOADING',{ font:'12px monospace', fill: 'rgb(196,150,255)', align: 'center' })
		game.load.spritesheet('parts', 'assets/parts.png', 16, 16);
	game.load.image('station', 'assets/station.png');
	game.load.image('frob1', 'assets/frob1.png');
	game.load.image('partswindow', 'assets/partswindow.png');
	game.load.spritesheet('bullet', 'assets/bullets.png',16,16);
	game.load.image('starfield2', 'assets/starfield2.png');
	game.load.image('starfield6', 'assets/starfield6.png');
	game.load.image('starfield4', 'assets/starfield4.png');
	game.load.image('haze', 'assets/haze.png');
	game.load.image('haze2', 'assets/haze2.png');
	game.load.spritesheet('sparkles', 'assets/sparkles.png',8,8);
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
	game.load.audio('dock','assets/dock.wav');
	game.load.audio('ominous','assets/ominous.wav');
	game.load.audio('powerup','assets/powerup.wav');
	game.load.audio('missile','assets/missile.wav');
	game.load.audio('bullet','assets/bullet.wav');
}



var playerShip = function(ship) {
	this.sprite = game.add.sprite(0, 0, 'parts', 1023);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.initPlayerShip(ship);
	this.thrust = game.add.emitter(0,0,50); //this is the right number for continuous thrust
	this.thrust.makeParticles('thrust',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.thrust.setAlpha(1.5,0,1500,Phaser.Easing.Sinusoidal.Out);
	this.thrust.blendMode = 1;
	this.thrust.gravity=0;
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
playerShip.prototype.initPlayerShip = function (ship) {

	this.target={};
	this.fireSound=ui.sound_pew3;
	this.ai=-1; //natural intelligence
	this.radarTargets=1;
	this.dropRate=0;
	this.sawDamage=0;
	this.radarShowInRange=false;
	this.radarShowInEnemyRange=false;
	this.radarOreTargets=4;
	this.oreEnergy=0;
	this.acceleration=1;
	this.lootRange=250;
	this.sprite.reset(0,0);
	this.sprite.name = 'player';
	this.sprite.rotation=0;
	this.lastVelocityX = this.sprite.body.velocity.x;
	this.lastVelocityY = this.sprite.body.velocity.y;
	this.turnRate=0.5;
	this.health=8;
	this.alive=true;
	this.sprite.alive=true;
	this.bulletSprite=0;
	this.bulletBlendMode=1;
	this.bulletHitBehavior=[];
	this.bulletBehavior=[];
	this.destroyParts();
	this.parts=[];
	this.speed = 0; //current
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
	this.nextEnergy = 0;
	this.nextFire = 0;
	this.altCooldown=0;
	this.cooldown114=0;
	this.sprite.visible=true;
	this.sprite.anchor.setTo(0.5, 0.5);
	this.sprite.body.maxVelocity.setTo(500,500);
	this.sprite.profile=250;	//max range at which opponents will attack. this will change dynamically
	this.sprite.body.linearDamping=0;
	this.sprite.body.collideWorldBounds = true; 
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
		this.parts[i].sprite.name="player";	//this lets bullet hit behaviors detect the player correctly
	}	
	this.sprite.body.setSize(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,0,0);
	this.left = function(){
		this.sprite.angle-=this.turnRate;
	};
	this.right = function(){
		this.sprite.angle+=this.turnRate;
	};

	applyBonuses(this);

}
playerShip.prototype.damage = function(dmg, aggro) {

	if(this.shield){
		midBoom(explosions,4,this.sprite.x,this.sprite.y);
	}else{
		this.health -= damageCoef * dmg;
	}

	if (this.health <= 0 && this.health + dmg >= 0){
		sparkExplosion(pew, this.sprite);	
		bigBoom(explosions,this.sprite.x,this.sprite.y);
		this.died=game.time.now+10000;
		this.alive = false;
		for (var j = 0; j < this.parts.length; j++) {

			this.parts[j].sprite.body.velocity = game.physics.arcade.velocityFromRotation(game.physics.arcade.angleBetween(this.sprite, this.parts[j].sprite), randomRange(200,400));
			this.parts[j].sprite.body.angularVelocity=randomRange((dmg+2*14),(dmg+2)*62);	
		}	

		this.sprite.kill();
		this.cullParts();	//defensive programming, in case I ever decide to do something that will kill a player sprite early :P
		nextSpawn = game.time.now+5000;
		playerStats.deaths+=1; //hahahahahhahahahahahahahhahahahahahaha
		fadeOut();
		return true;
	}

	return false;

}

playerShip.prototype.up = function(){

	this.speed = this.acceleration;

};
playerShip.prototype.fire = function(){

	if (this.fireEnergy>this.energyMax){
		ui.error('FATAL: insufficient capacity to fire. reconfigure vessel immediately!');
	}


	if (game.time.now > this.nextFire && bullets.countDead() > 0 && this.energy >= this.fireEnergy && this.alive){

		this.fireSound.play();

		this.sprite.profile+=Math.floor(this.fireDamage*80);

		if(this.sprite.profile>this.sprite.profileMax*10){
			this.sprite.profile=this.sprite.profileMax*10;
		}
		this.nextFire = game.time.now + this.fireRate;
		this.energy -= this.fireEnergy;
		this.spawnBullet(true);
	}

	if(contextTutorialProfile && this.sprite.profile > 1200){
		ui.texts.push(contextTutorialProfile);
		contextTutorialProfile='';
	}
};
playerShip.prototype.spawnBullet = function(showFlash){
	if(bullets.countDead()){

		var bullet = bullets.getFirstDead();
		bullet.loadTexture('bullet', this.bulletSprite);
		bullet.bulletSprite = this.bulletSprite;
		bullet.damage = this.fireDamage * targetDamageCoef;
		bullet.lifespan = this.fireRange;
		bullet.body.mass = this.fireMass;
		bullet.angularVelocity=0;
		bullet.tracking = this.fireTracking;
		bullet.nextTrack = 0;
		bullet.bulletHitBehavior=[];
		bullet.bulletHitBehavior=this.bulletHitBehavior;
		bullet.alpha=1;
		bullet.blendMode=this.bulletBlendMode;
		bullet.scale.setTo(1,1);
		bullet.reset(this.sprite.x + (Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.75), this.sprite.y + (Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.75));
		bullet.rotation = this.sprite.rotation;
		bullet.owner=this.sprite;
		bullet.fireVelocity = this.fireVelocity; //mostly useless but want this to be accessible for bulletBehaviors
		game.physics.arcade.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
		bullet.body.velocity.x += 0.5 * this.sprite.body.velocity.x;
		bullet.body.velocity.y += 0.5 * this.sprite.body.velocity.y;

		for (var i = 0; i < this.bulletBehavior.length; i++) {
			this.bulletBehavior[i](bullet);
		}

		if (showFlash){
			fireBoom(explosions,bullet.bulletSprite,bullet.x,bullet.y,bullet.rotation);
		}

		return bullet;
	}
}

playerShip.prototype.emitThrust = function() {
	this.thrust.x=this.sprite.x-(Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.5);
	this.thrust.y=this.sprite.y-(Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.5);
	this.thrust.minParticleSpeed.setTo(0,0);
	this.thrust.maxParticleSpeed.setTo(0,0);
	this.thrust.lifespan=(1-Math.cos(randomRange(0,0.5*Math.PI)))*500;
	this.thrust.lifespan+=200;
	var tempX = randomRange(-18,18);
	var tempY = randomRange(-18,18);
	this.thrust.minParticleSpeed.setTo(tempX,tempY);
	this.thrust.maxParticleSpeed.setTo(tempX,tempY);
	this.thrust.emitParticle();

}


playerShip.prototype.update = function(){
	if(this.alive){

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

		if(game.time.now>this.altCooldown){
			this.shield=false;
			if(this.parts.length){
				if(this.parts[0].sprite.alpha<1 && this.sprite.profile > 0.5 * this.sprite.profileMax){
					for(var i=0;i<this.parts.length;i++){
						this.parts[i].sprite.alpha+=0.02;
					}

				}
			}
		}
		if(game.time.now>this.nextProfileDecay){
			if (Math.abs(this.sprite.profile-this.sprite.profileMax) < this.profileDecay)	{	
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
				for(var i=0;i<5;i++){
					this.emitThrust();
				}
				partsToTop(this);	
				this.nextThrust = game.time.now + (500/this.acceleration); 
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
		if(Math.random()>Math.cos((this.health-this.healthMax)/this.healthMax)){
			if(Math.random()>(this.health/this.healthMax)){
				sparks(pew,this.sprite);
			}
		}
	}
};
function mouseUpHandle(event){
	mouseState[event.button]=false;
}
function mouseDownHandle(event){
	mouseState[event.button]=true;
}
var player;
var hello;
var startParts = 1; //extra parts given to player at beginning!
var mouseState=[false,false,false];
var pool;
var dragPool;
var dummy;
var defaultPlayerShip = [66, 34, -1, -1];
var station; //we're going to keep this pretty much as a non-interactive sprite for now... it doesn't actually need to do anything
var frob1;

var profileExponent=0.9;
var lootDropRate = 0.09;
var componentDropRate = 0.06;
var hazeWhite,hazeRed,hazePurple;
var foredrop;
var numBaddies = 9;
var numAsteroids = 19;
var enemies;
var loots;
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
var targetDamageCoef=5; //not so global damage tuner
var enemyHealthCoef=1; 
var cursors;
var pew;
var bullets;
var loots;
var nextFire = 0;

var partShip;


var ui;
var gameUI = function () {
	this.parts = [];
	this.inventory = [];
	this.partsIndex = [];	//maps ship-array positions to dragPart objects
	this.partCost=20;
	this.currentPart = 0;
	this.currentPlayerPart = 0;
	this.texts = [];
	this.nextComms=0;
	this.nextCommsPing=false;
	this.nextRadarSound=0; 
	this.textLine = '';
	this.textIndex = 0;
	this.textLineIndex = 0;
	this.nextError=0;
	this.buildMode = 'select';
				this.nextFrobRadarPulse=0;

}
gameUI.prototype.initInventory = function () {

	for(var i=0;i<16;i++){
		this.inventory.push(game.add.sprite(-300+((i%4)*16),-100+(Math.floor(i/4)*16),'parts',0));
	}

}
gameUI.prototype.initSound = function(){
	this.sound_pew1 = game.add.audio('pew1');
	this.sound_pew2 = game.add.audio('pew2');
	this.sound_dock = game.add.audio('dock');
	this.sound_powerup = game.add.audio('powerup');
	this.sound_ominous = game.add.audio('ominous');
	this.sound_pew3 = game.add.audio('pew3');
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
gameUI.prototype.calculatePartPosition = function() {

	var minx = 999999999;
	var miny = 999999999;
	var maxx = -999999999;
	var maxy = -999999999;
	var shipSize = 0;
	for(var i=0;i<this.parts.length;i++){
		if(this.parts[i].sprite.alive){
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
	var outx = 0;
	var outy = 0;

	while(ui.partAt(outx,outy)){
		if(Math.random()>0.5){
			outx+=randomSign()*16;
		}else{
			outy+=randomSign()*16;
		}
	}
	return {'x':outx,'y':outy};
}
gameUI.prototype.partAt = function(x,y){
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
			this.radar.push(game.add.text(200,100, '*',{ font:'12px monospace', fill: 'rgb(255,130,130)', align: 'center' }));
			this.radar[i].anchor.setTo(0.5,0.5);
			this.radar[i].blendMode=1
		}
	}
}
gameUI.prototype.initCombatUi = function() {

	this.partsSelector = game.add.sprite(-292,150,'parts',0);
	this.partsSelector.visible = false;

	this.tempStation = game.add.sprite(0,0,'station');
	this.tempStation.anchor.setTo(0.5,0.5);
	this.tempStation.visible = false;
	this.partswindow = game.add.sprite(-364,-132,'partswindow');
	this.partswindow.anchor.setTo(0,0);
	this.partswindow.visible = false;
	destroyIfExists(this.profileLine);
	this.profileLine = game.add.text(200,100, '',{ font:'14px monospace', fill: 'rgb(255,64,16)', align: 'right' });
	this.profileLine.alpha = 0.75;
	destroyIfExists(this.healthLine);
	this.healthLine = game.add.text(200,100, '',{ font:'14px monospace', fill: 'rgb(96,96,240)', align: 'left' });
	this.healthLine.alpha = 1;
	this.healthLine.blendMode = 1;

	destroyIfExists(this.energyLine);
	this.energyLine = game.add.text(200,100, '',{ font:'14px monospace', fill: 'rgb(240,64,255)', align: 'left' });
	this.energyLine.alpha = 1;

	this.energyLine.blendMode = 1;
	destroyIfExists(this.comms);
	this.comms = game.add.text(0,0,'',{font:'1.5em monospace', fill: 'rgb(240,255,183)', align: 'left'});

	destroyIfExists(this.partText);
	this.partText = game.add.text(-200,150,'',{font:'1.5em monospace', fill: 'rgb(255,255,255)', align: 'left'});
	destroyIfExists(this.partFlavorText);
	this.partFlavorText = game.add.text(-180,180,'',{font:'1.1em monospace', fill: 'rgb(255,255,255)', align: 'left'});
	destroyIfExists(this.explainerText);
	this.explainerText = game.add.text(-200,210,'',{font:'1.2em monospace', fill: 'rgb(255,255,220)', align: 'left'});

	this.radar = [];
	this.resetRadar();

	this.frobRadar = game.add.text(200,100,'*',{font:'28px monospace', fill: 'rgb(255,255,130)', align: 'center'});
	this.frobRadar.anchor.setTo(0.5,0.5);
}
gameUI.prototype.bar = function (targetText, offset, numerator, denominator) {
	if(typeof(targetText.lastValue)=='undefined'){
		targetText.lastValue=numerator;
	}
	targetText.x = player.sprite.body.x+(player.sprite.body.width/2);
	targetText.y = player.sprite.body.y+player.sprite.body.height+30+offset;
	var barSize=Math.floor(denominator/2);	
	var s = '';
	var n=Math.floor(numerator/2);
	if(n<0){n=0;}
	s+=repeat('\u25cf',n);
	s+=repeat('\u25cb',barSize-n);
	targetText.setText(s);
	if(numerator>targetText.lastValue){
		targetText.alpha=2;
		game.add.tween(targetText).to({alpha: 1},500, Phaser.Easing.Exponential.Out, true, 0, false);
	}else if(numerator<targetText.lastValue){
		targetText.alpha=0.2;		
		game.add.tween(targetText).to({alpha: 1},500, Phaser.Easing.Exponential.Out, true, 0, false);
	}
	targetText.lastValue=numerator;
}

gameUI.prototype.frobRadarPing = function() {
	if(false && (playerStats.mission.win.condition!='frob' || playerStats.mission.complete)){
		this.frobRadar.setText('');
	}else{
		var s='';
		var targetAngle=game.physics.arcade.angleBetween(player.sprite, frob1);
		var targetDistance=game.physics.arcade.distanceBetween(player.sprite, frob1);
		var s='\u25C6'; 
		var n=Math.floor(255-(targetDistance/8-225));
		if(n<64){n=64;}if(n>255){n=255};
		this.frobRadar.style.fill="rgb("+(Math.floor(n))+","+n+","+(Math.floor(n/2))+")";
		if(playerStats.mission.complete || playerStats.mission.win.condition=='frob') {
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
		this.frobRadar.setText(s);
		this.frobRadar.x = player.sprite.body.x + Math.cos(targetAngle) * 240 - 0.5 * this.frobRadar.width;
		this.frobRadar.y = player.sprite.body.y + Math.sin(targetAngle) * 240;	
	}
}
gameUI.prototype.radarPing = function() {
	var s='';
	this.resetRadar();
	for(var i=0;i<this.radar.length;i++){
		var targetAngle=game.physics.arcade.angleBetween(player.sprite, this.enemies[i].sprite);
		var targetDistance=game.physics.arcade.distanceBetween(player.sprite, this.enemies[i].sprite);
		var s='●'; //I cannot believe this circle renders in my terminal
		var n=Math.floor(255-(targetDistance/2-900));
		var blinkDistance = 1000;
		var bracketLeft = '[';
		var bracketRight = ']';

		var missionTarget = !playerStats.mission.complete && this.enemies[i].missionTarget ? 128 : 0;

		if(player.profileShow){
			var adjustedProfile = 200 + Math.pow(player.sprite.profile,profileExponent);
			this.blinkDistance=adjustedProfile*2.1;
			if(targetDistance<0.5*blinkDistance){
				bracketLeft='>';
				s='\u203c';
				bracketRight='<';
			}else{
				bracketLeft='(';
				bracketRight=')';
			}
		}

		if(n<0){n=0;}if(n>255){n=255};
		this.radar[i].style.fill="rgb("+n+","+(96+missionTarget)+",96)";
		if(this.enemies[i].sprite.profile>player.sprite.profileMax*2){
			this.radar[i].style.font='28px monospace';
		}else if(this.enemies[i].sprite.profile>player.sprite.profileMax){
			this.radar[i].style.font='22px monospace';
		}else if(this.enemies[i].sprite.profile>player.sprite.profileMax*0.5){
			this.radar[i].style.font='16px monospace';
		}else{
			this.radar[i].style.font='12px monospace';
		}


		if(contextTutorialBlink && targetDistance < 0.5 * blinkDistance && this.enemies[i].sprite.profile > 200){
			ui.texts.push(contextTutorialBlink);
			contextTutorialBlink='';
		}
		if(game.time.now>this.nextRadarSound && targetDistance < 0.75 * blinkDistance && this.enemies[i].sprite.profile > 200){
			this.nextRadarSound=game.time.now+3333;
			this.sound_redalert.play()
		}
		if (targetDistance < 0.5 * blinkDistance && game.time.now % 250 > 125){
			s='['+s+']';
			this.radar[i].style.fill="rgb(255," + missionTarget + ",0)";
		}
		else if (targetDistance < blinkDistance && targetDistance >= 0.5 * blinkDistance && game.time.now % 1000 > 500)  {
			s='['+s+']';
			this.radar[i].style.fill="rgb(255," + missionTarget + ",0)";
		} else {
			s=' '+s+' ';
		}

		var range = targetDistance;
		if(range>180){range=180};	
		this.radar[i].setText(s);
		this.radar[i].x = player.sprite.body.x + (0.5 * player.sprite.body.width) + Math.cos(targetAngle) * range;
		this.radar[i].y = player.sprite.body.y + (0.5 * player.sprite.body.width) + Math.sin(targetAngle) * range;	
	}
}
//follow this with a push!
gameUI.prototype.skipText = function() {
	this.textIndex=this.texts.length;
	this.textLineIndex=0;
}
gameUI.prototype.commsPing = function() {
	this.comms.x = player.sprite.body.x - 200;
	this.comms.y = player.sprite.body.y + 200;
	if(gamemode=='?build'){
		this.comms.y+=50;
	}

	if (game.time.now > this.nextComms && this.textIndex < this.texts.length){
		if(this.textLineIndex==0||this.nextCommsPing){
			ui.sound_comms.play();
			this.nextCommsPing=false;
		}
		this.comms.alpha=1;
		this.textLine = this.texts[this.textIndex].substr(0, this.textLineIndex++);
		var s ='';
		if(!this.textLine.substr(-1)=='\n'){
			for(var i=0;i<this.textLine.length;i++){
				if(this.textLineIndex > this.texts[this.textIndex].length || this.textLine[i]=='\n' || Math.random()<0.99 ){
					s+=this.textLine[i];
				}else{
					s+=String.fromCharCode(Math.floor(Math.random()*255));
				}
			}
		}
		this.textLine=s;
		this.comms.setText(this.textLine);
		if(this.textLineIndex>this.texts[this.textIndex].length){
			this.nextComms=game.time.now+1000+this.textLineIndex*50;
			this.textIndex+=1;
			this.textLineIndex=0;
		}else{
			this.nextComms=game.time.now+10;
		}
		if(this.textLine.substr(-1)=='\n'){
			this.nextComms+=10;
		}
	}else if (game.time.now > this.nextComms) {
		this.comms.alpha-=randomRange(0,0.05);
	}  
	if(this.textLine.length>0 && game.time.now % 200 > 100){
		this.comms.setText(this.textLine + '_');
	}else{
		this.comms.setText(this.textLine);
	}
}
gameUI.prototype.profileLinePing = function() {

	if(player.profileShow){
		this.profileLine.style.fill="rgb(192,"+Math.floor((player.sprite.profile/5/player.sprite.profileMax)*255)+",16)";
		this.profileLine.setText(player.sprite.profile);
		this.profileLine.x = player.sprite.body.x-this.profileLine.width;
		this.profileLine.y = player.sprite.body.height+player.sprite.body.y+55;
	}else{
		this.profileLine.setText('');
	}
}
gameUI.prototype.update = function() {
	this.commsPing();
	if (gamemode == 'war'){
		this.profileLinePing();
		this.bar(this.healthLine, 0, player.health, player.healthMax);
		this.bar(this.energyLine, 10, player.energy, player.energyMax);
		this.enemies=enemies.slice(0);
		this.enemies.sort(threatSort);
		this.asteroids=enemies.slice(0);
		this.asteroids.sort(asteroidSort);
		this.radarPing();
		this.frobRadarPing();
	}
}

gameUI.prototype.updatePart = function () {
	this.partsSelector.visible=true;
	this.partsSelector.bringToTop();
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
	player.sprite.reset(0,0);
	player.sprite.rotation=0;
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
	this.energyLine.setText('');
	this.profileLine.setText('');
	this.clearRadar();
	this.tempStation.visible=true;
	this.tempStation.bringToTop();
	this.partswindow.visible=true;
	this.partswindow.bringToTop();
	this.partsSelector.bringToTop();
	this.partsSelector.scale.setTo(3,3);
	this.partsSelector.inputEnabled = true;
	this.partsSelector.events.onInputDown.add(selectPart);
	if(typeof(ship)!='undefined'){
		this.parts = createBuildParts(ship,player.sprite.x,player.sprite.y);
	}
	this.partsArray();
	this.setMode('select');
	this.updatePart();
}
gameUI.prototype.setMode = function(mode){
	this.buildMode = mode;
	if(mode=='select'){
		this.explainerText.setText('[SELECT] X: select part   Z: remove parts   ENTER: launch');
	}else if(mode=='move'){
		this.explainerText.setText('[CONFIG] X: place part    Z: cancel         ARROWS: move part');

	}else if(mode=='delete'){
		this.explainerText.setText('[REMOVE] X: remove part   Z: done removing  Removed parts are returned to inventory.');

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
	this.partFlavorText.setText('');
	this.explainerText.setText('');
	player.initPlayerShip(ship);
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
				if(ui.partAt(this.parts[i].sprite.x,this.parts[i].sprite.y)>1){
					var newPosition = this.calculatePartPosition();
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



function createPart(n){

	var partPosition = ui.calculatePartPosition(); 
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
			myParts.push(pool.get(((n-1)*-8)+((i%n)*16),((n-1)*-8)+(Math.floor(i/n)*16),shipParts[i],targetActor));
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
	playerStats.mission = missions[missionId];
	ui.skipText();
	for(var i=0;i<playerStats.mission.intro.length;i++){
		ui.texts.push(playerStats.mission.intro[i]);
	}
	var index = 0;
	for(var n=0;n<playerStats.mission.enemies.length;n++){	
		for (var i = 0; i < playerStats.mission.enemies[n].count; i++){
			if(index<enemies.length){
				enemies[index].shipList=playerStats.mission.enemies[n].ships;
				enemies[index].initEnemyShip();
				enemies[index].target=player.sprite;
			}else{
				enemies.push(new enemyShip(index, game, player.sprite, enemyBullets, playerStats.mission.enemies[n].ships, enemyThrust));
			}
			enemies[index].respawn=playerStats.mission.enemies[n].respawn;
			enemies[index].missionTarget=playerStats.mission.enemies[n].missionTarget;
			enemies[index].taunts=playerStats.mission.enemies[n].taunts;
			enemies[index].deaths=playerStats.mission.enemies[n].deaths;
			index++;
		}
	}
	while(index<enemies.length){	//cleanup if we haven't use the entired pool
		enemies[index].respawn=false;
		enemies[index].health=0;
		enemies[index].damage(9);
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

	hazeRed.speed=playerStats.mission.hazeRedSpeed;
	hazeWhite.speed=playerStats.mission.hazeWhiteSpeed;
	hazePurple.speed=playerStats.mission.hazePurpleSpeed;
	hazeRed.blendMode=playerStats.mission.hazeRedBlendMode;
	hazePurple.blendMode=playerStats.mission.hazePurpleBlendMode;

}
function fadeIn () {
	station.alpha=0;
	ui.tempStation.alpha=0;
	game.add.tween(station).to({alpha:1},1000, Phaser.Easing.Linear.None, true, 0, false);
	game.add.tween(ui.tempStation).to({alpha:1},1000, Phaser.Easing.Linear.None, true, 0, false);


	hazeRed.alpha=0;
	hazeWhite.alpha=0;
	hazePurple.alpha=0;
	game.add.tween(hazeRed).to({alpha:playerStats.mission.hazeRed},1000, Phaser.Easing.Linear.None, true, 0, false);
	game.add.tween(hazeWhite).to({alpha:playerStats.mission.hazeWhite},5000, Phaser.Easing.Linear.None, true, 0, false);
	game.add.tween(hazePurple).to({alpha:playerStats.mission.hazePurple},1000, Phaser.Easing.Linear.None, true, 0, false);

	hazeRed.speed=playerStats.mission.hazeRedSpeed;
	hazeWhite.speed=playerStats.mission.hazeWhiteSpeed;
	hazePurple.speed=playerStats.mission.hazePurpleSpeed;
	hazeRed.blendMode=playerStats.mission.hazeRedBlendMode;
	hazePurple.blendMode=playerStats.mission.hazePurpleBlendMode;

}

function create () {


	ui = new gameUI();
	ui.initSound();
	gamemode = location.search||'init';
	if (gamemode == '?cheat'){
		gamemode = 'init';
		cheatmode = 1;
	}
	if (gamemode == 'init'){
		game.world.setBounds(-100000, -100000, 200000, 200000);


		hazeWhite = game.add.tileSprite(0, 0, resolutionX/2, resolutionY/2, 'starfield6');
		hazeWhite.fixedToCamera = true;
		hazeWhite.scale.x=2;
		hazeWhite.scale.y=2;
		hazeWhite.alpha=0.6; //random()
		hazeWhite.blendMode=0;
		hazeWhite.offsetx = Math.random()*resolutionX;
		hazeWhite.offsety = Math.random()*resolutionY;
		hazeWhite.speed = 600;
		hazeRed = game.add.tileSprite(0, 0, resolutionX/3, resolutionY/3, 'haze');
		hazeRed.offsetx = Math.random()*resolutionX;
		hazeRed.offsety = Math.random()*resolutionY;
		hazeRed.fixedToCamera = true;
		hazeRed.scale.x=3;
		hazeRed.scale.y=3;
		hazeRed.alpha=1; //randomRange(0,0.8)-0.2;
		hazeRed.blendMode=1;
		hazeRed.speed = 160;
		hazePurple = game.add.tileSprite(0, 0, resolutionX/3, resolutionY/3, 'haze2');
		hazePurple.offsetx = Math.random()*resolutionX;
		hazePurple.offsety = Math.random()*resolutionY;
		hazePurple.fixedToCamera = true;
		hazePurple.scale.x=3;
		hazePurple.scale.y=3;
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
		player = new playerShip(defaultPlayerShip);

		//  The enemies bullet group
		enemyBullets = game.add.group();
		enemyBullets.createMultiple(200, 'bullet');
		game.physics.enable(enemyBullets, Phaser.Physics.ARCADE);
		enemyBullets.setAll('body.immovable', true);
		enemyBullets.setAll('anchor.x', 0.5);
		enemyBullets.setAll('anchor.y', 0.5);
		enemyBullets.setAll('lifespan',5000)
			enemyBullets.setAll('outOfBoundsKill', true);

		enemyThrust = game.add.emitter(0,0,100);
		enemyThrust.makeParticles('thrust',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
		enemyThrust.setAlpha(1.5,0,1500,Phaser.Easing.Sinusoidal.Out);
		enemyThrust.blendMode = 1;
		enemyThrust.gravity=0;

		explosions = game.add.group();
		explosions.createMultiple(100, 'explosions');
		game.physics.enable(explosions, Phaser.Physics.ARCADE);
		explosions.setAll('anchor.x', 0.5);
		explosions.setAll('anchor.y', 0.5);
		explosions.setAll('lifespan',5000);
		explosions.setAll('blendMode',1);

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

		loots = game.add.group();
		loots.createMultiple(30, 'parts');
		game.physics.enable(loots, Phaser.Physics.ARCADE);
		loots.setAll('anchor.x',0.5);
		loots.setAll('anchor.y', 0.5);
		loots.setAll('outOfBoundsKill', true);
		loots.setAll('lifespan', 60000);
		game.camera.follow(player.sprite);
		game.camera.focusOnXY(0, 0);

		sparkles = game.add.emitter(0,0,100);
		sparkles.makeParticles('sparkles',[0,1,2,3,4,5,6,7]);
		sparkles.setAlpha(1,0,2000);
		sparkles.blendMode = 1;
		sparkles.lifespan=200;

	}

	cursors =	{
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
		enter: game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
	}

	game.input.mouse.mouseUpCallback=mouseUpHandle;

	game.input.mouse.mouseDownCallback=mouseDownHandle;


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

}
function explosionAnimate(s) {
	if(s.alive){
		s.angularVelocity-=game.time.physicsElapsed*s.angularVelocity * 1.5;
		//	s.alpha+=s.alpha;
		s.alpha-=game.time.physicsElapsed*(Math.min(Math.pow(s.alpha,1.7),1.5))*15;
		//	s.alpha=Math.cos((s.alpha-game.time.physicsElapsed)*0.5*Math.PI);

		s.rotation += (s.angularVelocity * game.time.physicsElapsed);
		s.scale.setTo(s.scale.x+((game.time.physicsElapsed*16)),s.scale.y+((game.time.physicsElapsed*16)));
		s.scale.setTo(s.scale.x*(1+(game.time.physicsElapsed*2)),s.scale.y*(1+(game.time.physicsElapsed*2)));
		if(s.alpha<=0.05){s.kill()};
	};
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

function pullLootToPlayer(s) {
	if (!player.alive){
		s.kill();
	}
	if(s.alive){
		if(Math.random() > 0.1 && onscreen(s.x,s.y)){
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
		if(game.physics.arcade.distanceBetween(s, player.sprite) < player.lootRange){
			var targetAngle = game.physics.arcade.angleBetween(s, player.sprite); 
			var tempx, tempy;
			tempx = s.body.velocity.x;
			tempy = s.body.velocity.y;
			game.physics.arcade.velocityFromRotation(targetAngle, 500, s.body.velocity);
			s.body.velocity.x+=tempx*s.averageCounter;
			s.body.velocity.x/=s.averageCounter+1;
			s.body.velocity.y+=tempy*s.averageCounter;
			s.body.velocity.y/=s.averageCounter+1;
			if(s.averageCounter){s.averageCounter--};
		}
	}
}
function handleMission() {

	if(playerStats.mission.win.condition=='kill'){
		if(playerStats.mission.win.killCount<=playerStats.kills){
			playerStats.mission.complete=true;
		}
	}

	if((playerStats.mission.complete || playerStats.mission.win.condition=='frob') &&
			game.physics.arcade.overlap(player.sprite,frob1))
	{
		playerStats.mission.complete=true; //just for frob-only missions
		winMission(); 
		ui.partsUI(player.ship);
		nextUIDelay=game.time.now+1000;
	}
	if(playerStats.mission.complete && playerStats.mission.outro.length){
		ui.sound_complete.play();
		ui.skipText();
		for(var i=0;i<playerStats.mission.outro.length;i++){
			ui.texts.push(playerStats.mission.outro[i]);
		}

		playerStats.mission.outro=[];
	}

}

function winMission(){

	if(playerStats.mission.complete){
		ui.sound_ominous.play();
		var s = 'completed ' + playerStats.mission.name + '. ';
		if(playerStats.mission.componentsReward.length){
			for(var i =0;i<playerStats.mission.componentsCount;i++)
			{
			playerStats.inventory.push(playerStats.mission.componentsReward[Math.floor(randomRange(0,playerStats.mission.componentsReward.length))]);
			if(i%2==1){
				s+='\n';
			}
			}
		}
		ui.skipText();
		ui.texts.push(s);
		var n = Math.floor(randomRange(0,playerStats.mission.next.length));
		initMission(playerStats.mission.next[n]);
		playerStats.mission.complete=false;
		playerStats.kills=0;
	}
}

function enemyBulletTracking(bullet){
	if(bullet.tracking && game.time.now > bullet.nextTrack){
		var angle = compareAngles(bullet.rotation, game.physics.arcade.angleBetween(bullet, ownerFromName(bullet.owner.name).target));
		if(Math.abs(angle)>bullet.tracking * 0.04){
		bullet.rotation -= angle * bullet.tracking * 0.02 / Math.abs(angle);
		}
		game.physics.arcade.velocityFromRotation(bullet.rotation, getHypo(bullet.body.velocity.x,bullet.body.velocity.y), bullet.body.velocity);
		
		bullet.nextTrack = game.time.now+20;
	}
}
function playerBulletTracking(bullet){
	if(bullet.tracking && game.time.now > bullet.nextTrack){
		var angle = compareAngles(bullet.rotation, game.physics.arcade.angleBetween(bullet, ui.enemies[0].sprite));
		if(Math.abs(angle)>bullet.tracking * 0.04){
		bullet.rotation -= angle * bullet.tracking * 0.02 / Math.abs(angle);
		}
		game.physics.arcade.velocityFromRotation(bullet.rotation, getHypo(bullet.body.velocity.x,bullet.body.velocity.y), bullet.body.velocity);
		
		bullet.nextTrack = game.time.now+20;
	}
}
function update () {
	if(gamemode!='init'){
		if(gamemode=='?build'){

			for (var i = 0; i < ui.parts.length; i++){
				ui.parts[i].update();
			}
	
			player.sprite.body.velocity.x=0;
			player.lastVelocityX=0;
			player.sprite.body.velocity.y=0;
			player.lastVelocityY=0;

		}
		if(gamemode=='war' ){

			handleMission();

			if(nextSpawn<game.time.now||nextSpawn==0){
				if(!player.alive){
					player.initPlayerShip(defaultPlayerShip);
					if(contextTutorialDeath){
						ui.texts.push(contextTutorialDeath);
						contextTutorialDeath='';
					}
					winMission(); 
					fadeIn();
					ui.partsUI(player.ship);
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
			}

			for (var i = 0; i < enemies.length; i++){
				if (enemies[i].alive){
					enemies[i].update();
					if(enemyBullets.getFirstAlive() != null) {

						game.physics.arcade.overlap(enemyBullets, enemies[i].sprite, bulletHitEnemy, null, this);
					}
					for (var j = 0; j < player.parts.length; j++) {
						game.physics.arcade.overlap(enemies[i].sprite, player.parts[j].sprite, enemyTouchPlayer, null, this);
					}
					game.physics.arcade.overlap(bullets, enemies[i].sprite, bulletHitEnemy, null, this);
					for (var j = 0; j < enemies[i].parts.length; j++) {

						enemies[i].parts[j].update();

					}	

				}
			}

			bullets.forEachAlive(playerBulletTracking);
			enemyBullets.forEachAlive(enemyBulletTracking);

			for (var i = 0; i < player.parts.length; i++){
				player.parts[i].update();
			};

			if (cursors.left.isDown || cursors.left2.isDown){
				player.left();
			}
			if (cursors.right.isDown || cursors.right2.isDown){
				player.right()
			}
			if (cursors.up.isDown || cursors.up2.isDown){
				player.up();
			}
			if(player.alive && (mouseState[2] || cursors.alt.isDown)){
				player.alt();
			}
			player.update();

			if(!mouseState[2] && !cursors.alt.isDown){
				player.cooldown114=0;
			}


			if (mouseState[0] || cursors.fire.isDown){
				player.fire();
			}

		}	
		// scrolling
		hazeWhite.tilePosition.x = hazeWhite.offsetx + ( -0.05*game.camera.x / hazeWhite.scale.x) + (game.time.now / (hazeWhite.speed));
		hazeWhite.tilePosition.y = hazeWhite.offsety + ( -0.05*game.camera.y / hazeWhite.scale.y);
		hazeRed.tilePosition.x = hazeRed.offsetx + ( -0.26*game.camera.x / hazeRed.scale.x) + (game.time.now / (hazeRed.speed));
		hazeRed.tilePosition.y = hazeRed.offsety + ( -0.26*game.camera.y / hazeRed.scale.y);
		hazePurple.tilePosition.x = hazePurple.offsetx + ( -.9*game.camera.x / hazePurple.scale.x) + (game.time.now / (hazePurple.speed));
		hazePurple.tilePosition.y = hazePurple.offsety + ( -.9*game.camera.y / hazePurple.scale.y);
		//hazePurple.bringToTop();	

		ui.update();
		if (gamemode == '?build' && !game.input.activePointer.isDown) {
			if(game.time.now > nextUIDelay){ 

				if(ui.buildMode=='select')
				{
					if ((cursors.left.isDown || cursors.left2.isDown)){
						ui.previousPart();
						nextUIDelay = game.time.now+1000;
					}
					if ((cursors.right.isDown || cursors.right2.isDown)){
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
					if ((cursors.down.isDown || cursors.down2.isDown)){
						ui.rowDownPart();	
						nextUIDelay = game.time.now+1000;
					}
					if ((cursors.up.isDown || cursors.up2.isDown)){
						ui.rowUpPart();	
						nextUIDelay = game.time.now+1000;
					}
					if(cursors.fire.isDown && playerStats.inventory.length){
						selectPart();
						nextUIDelay = game.time.now+2000;
						ui.currentPlayerPart = ui.parts.length-1;
						ui.setMode('move');
						ui.updatePart();
					}
					if(cursors.alt.isDown && ui.parts.length > 1){
						ui.currentPlayerPart = 0;
						ui.nextDeletePart();
						nextUIDelay = game.time.now+2000;
						ui.setMode('delete');
						ui.updatePart();
					}
					if (game.time.now > nextUIDelay + 2000 && (cursors.enter.isDown)){
						ui.endPartsUI();
						nextUIDelay=game.time.now+1000;
					}
				}else if(ui.buildMode=='move'){

					if ((cursors.left.isDown || cursors.left2.isDown)){
						ui.parts[ui.currentPlayerPart].sprite.reset(ui.parts[ui.currentPlayerPart].sprite.x-16,ui.parts[ui.currentPlayerPart].sprite.y)	
							nextUIDelay = game.time.now+500;
					}
					if ((cursors.right.isDown || cursors.right2.isDown)){
						ui.parts[ui.currentPlayerPart].sprite.reset(ui.parts[ui.currentPlayerPart].sprite.x+16,ui.parts[ui.currentPlayerPart].sprite.y)	
							nextUIDelay = game.time.now+500;
					}
					if ((cursors.up.isDown || cursors.up2.isDown)){
						ui.parts[ui.currentPlayerPart].sprite.reset(ui.parts[ui.currentPlayerPart].sprite.x,ui.parts[ui.currentPlayerPart].sprite.y-16)	
							nextUIDelay = game.time.now+500;
					}
					if(cursors.fire.isDown){
						ui.setMode('select');
						ui.parts[ui.currentPlayerPart].sprite.alpha=1;
						ui.parts[ui.currentPlayerPart].sprite.blendMode=0;
						nextUIDelay = game.time.now+2000;
						ui.updatePart();
						ui.partsArray();
					}
					if(cursors.alt.isDown && ui.currentPlayerPart > 0){
						ui.setMode('select');
						nextUIDelay = game.time.now+2000;
						playerStats.inventory.push(ui.parts[ui.currentPlayerPart].index);
						ui.parts[ui.currentPlayerPart].sprite.kill();							
						ui.cullParts();
						ui.currentPlayerPart = ui.parts.length-1;

						ui.updatePart();
						ui.partsArray(); //recalc rectangle
					}
					if (cursors.down.isDown || cursors.down2.isDown){
						ui.parts[ui.currentPlayerPart].sprite.reset(ui.parts[ui.currentPlayerPart].sprite.x,ui.parts[ui.currentPlayerPart].sprite.y+16)	
							nextUIDelay=game.time.now+500;
					}

				}else if(ui.buildMode=='delete'){

					if ((cursors.left.isDown || cursors.left2.isDown)){

						ui.previousDeletePart();	
						nextUIDelay = game.time.now+500;
						
					}
					if ((cursors.right.isDown || cursors.right2.isDown)){
						ui.nextDeletePart();	
							nextUIDelay = game.time.now+500;
					}
					if ((cursors.up.isDown || cursors.up2.isDown)){
						ui.rowUpDeletePart();	
							nextUIDelay = game.time.now+500;
					}
					if (cursors.down.isDown || cursors.down2.isDown){
						ui.rowDownDeletePart();	
							nextUIDelay=game.time.now+500;
					}
					if(cursors.alt.isDown){
						ui.setMode('select');
						ui.parts[ui.currentPlayerPart].sprite.alpha=1;
						ui.parts[ui.currentPlayerPart].sprite.blendMode=0;
						nextUIDelay = game.time.now+2000;
						ui.updatePart();
						ui.partsArray();
					}
					if(cursors.fire.isDown){
						nextUIDelay = game.time.now+2000;
						var t = ui.currentPlayerPart;
						ui.previousDeletePart();
						playerStats.inventory.push(ui.parts[t].index);
						ui.parts[t].sprite.kill();							
						ui.cullParts();
						ui.updatePart();
						ui.partsArray(); //recalc rectangle
						if(ui.parts.length==1){
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
			if(!cursors.left.isDown && !cursors.left2.isDown &&
					!cursors.right.isDown && !cursors.right2.isDown &&
					!cursors.up.isDown && !cursors.up2.isDown &&
					!cursors.down.isDown && !cursors.down2.isDown &&
					!cursors.fire.isDown && !cursors.alt.isDown &&
					!cursors.pgup.isDown && !cursors.pgdn.isDown
			  ){
				  nextUIDelay = 0;
			  }
		}

	}
}

function hugeBoom(explosionsGroup, x, y){

	if(onscreen(x,y)){
		var r = Math.random();

		for(var i=0; i < 10 + (r * 9) ; i ++) { 
			if(explosions.countDead()){
				var explosion = explosionsGroup.getFirstDead();
				explosion.loadTexture('explosions', Math.random()>0.7 ? 1 : 2);
				explosion.reset(x+randomRange(-80,80),y+randomRange(-80,80));
				explosion.rotation = Math.random()*Math.PI*2;
				explosion.angularVelocity=randomRange(-3,3);
				explosion.fireVelocity=randomRange(600,890);
				explosion.lifespan=2000;
				explosion.linearDamping=-1;
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
function bigBoom(explosionsGroup, x, y){

	if(onscreen(x,y)){
		var r = Math.random();

		for(var i=0; i < 5 + (r * 6) ; i ++) { 
			if(explosions.countDead()){
				var explosion = explosionsGroup.getFirstDead();
				var rand2 = Math.random()>0.7 ? 1 : 2;
				explosion.loadTexture('explosions', rand2);
				explosion.reset(x+randomRange(-20,20),y+randomRange(-20,20));
				explosion.rotation = Math.random()*Math.PI;
				explosion.fireVelocity=randomRange(30,80) * (2-rand2);
				explosion.lifespan=700 * (6 - 2*rand2);
				explosion.linearDamping=-1;
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
				game.add.tween(explosion.scale).to({x:explosion.scale.x*12,y:explosion.scale.y*12},explosion.lifespan*0.3, Phaser.Easing.Quadratic.Out, true, 0, false);
				game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);


				game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
			}
		}
	}
}
function shieldEffect(explosionsGroup, bulletSprite, x, y, velx, vely){

	var r = Math.random();

	if(explosionsGroup.countDead()){
		var explosion = explosionsGroup.getFirstDead();
		explosion.loadTexture('explosions', bulletSprite || 0);
		explosion.reset(x,y);
		explosion.rotation=Math.random()*Math.PI;
		explosion.angularVelocity=200;
		explosion.fireVelocity=randomRange(-10,10);
		explosion.lifespan=700;
		r=randomRange(1,1.5);
		explosion.scale.setTo(r,r);
		explosion.alpha=3;
		explosion.body.velocity.x=velx;
		explosion.body.velocity.y=vely;
		explosion.blendMode=1;
		boomTween(explosion);
	}
}
function sparkleBoom(explosionsGroup, minSprite, maxSprite, x, y){


	var r = Math.random();

	for(var i=0; i < 8 + (r * 6) ; i ++) { 
		if(explosionsGroup.countDead()){
			var explosion = explosionsGroup.getFirstDead();
			explosion.loadTexture('sparkles', Math.floor(randomRange(minSprite,maxSprite)));
			explosion.reset(x+randomRange(-8,8),y+randomRange(-8,8));
			explosion.rotation = Math.random()*Math.PI;
			explosion.angularVelocity=randomRange(500,1000);
			explosion.linearDamping=-10;
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


function boomTween(sprite){
	game.add.tween(sprite.scale).to({x:sprite.scale.x*8,y:sprite.scale.y*8},sprite.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);
	game.add.tween(sprite).to({alpha:0},sprite.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);
}
function midBoom(explosionsGroup, bulletSprite, x, y){

	if(onscreen(x,y)){

		var r = Math.random();

		for(var i=0; i < 3 + (r * 6) ; i ++) { 
			if(explosionsGroup.countDead()){
				var explosion = explosionsGroup.getFirstDead();
				explosion.loadTexture('explosions', bulletSprite || 0);
				explosion.reset(x+randomRange(-8,8),y+randomRange(-8,8));
				explosion.rotation = Math.random()*Math.PI;
				explosion.angularVelocity=randomRange(-5,5);
				explosion.linearDamping=-4;
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
			if(explosionsGroup.countDead()){
				var explosion = explosionsGroup.getFirstDead();
				explosion.loadTexture('explosions', bulletSprite || 0);
				explosion.reset(x,y);
				explosion.rotation = rot + randomSign() * randomRange(0.3,1);
				explosion.angularVelocity=randomRange(-5,5);
				explosion.linearDamping=-4;
				explosion.fireVelocity=randomRange(350,600);
				explosion.lifespan=randomRange(350,600);
				explosion.scale.setTo(1.2,1.2);
				explosion.alpha=2;
				game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
				explosion.blendMode=1;
				game.add.tween(explosion.scale).to({x:0.01,y:0.01},explosion.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);

				game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Quadratic.Out, true, 0, false);		}
		}

		for(var i=0; i < 3; i ++) { 
			if(explosionsGroup.countDead()){
				var explosion = explosionsGroup.getFirstDead();
				explosion.loadTexture('explosions', bulletSprite || 0);
				explosion.reset(x,y);
				explosion.rotation = rot ;
				explosion.angularVelocity=randomRange(-5,5);
				explosion.linearDamping=-4;
				explosion.fireVelocity=randomRange(200,230);
				explosion.lifespan=randomRange(500,800);
				explosion.scale.setTo(1,1);
				explosion.alpha=1.5;
				game.physics.arcade.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
				explosion.blendMode=1;
				game.add.tween(explosion.scale).to({x:1,y:1},explosion.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);

				game.add.tween(explosion).to({alpha:0},explosion.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);		}
		}
	}
}
function boom(explosionsGroup, bulletSprite, x, y){

	if(onscreen(x,y)){

		var r = Math.random();

		for(var i=0; i < 3 + (r * 6) ; i ++) { 
			if(explosionsGroup.countDead()){
				var explosion = explosionsGroup.getFirstDead();
				explosion.loadTexture('explosions', bulletSprite || 0);
				explosion.reset(x+randomRange(-8,8),y+randomRange(-8,8));
				explosion.rotation = Math.random()*Math.PI;
				explosion.angularVelocity=randomRange(-5,5);
				explosion.linearDamping=-4;
				explosion.fireVelocity=randomRange(-10,10);
				explosion.lifespan=1000;
				r=randomRange(0.5,0.7);
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
	if(loots.countDead() < lootCount){
		lootCount = loots.countDead();
	}

	for(var i = 0; i < lootCount; i++)
	{
		var loot = loots.getFirstDead();
		loot.loadTexture('parts', Math.floor(randomRange(0,4))+26);
		loot.lifespan = 60000;
		loot.body.angularVelocity = randomRange(-300,300);
		loot.reset(x + randomRange(-16,16), y+randomRange(-16,16));
		loot.rotation = Math.random()*2*Math.PI;
		var scale = randomRange(0.8,1.1);
		loot.scale.setTo(scale,scale);
		loot.averageCounter=50;
		loot.acceleration=200;
		loot.blendMode=0;
		loot.lootType='ore';
		loot.acceleration=0;
		game.physics.arcade.velocityFromRotation(loot.rotation, randomRange(100,300), loot.body.velocity);
	}
}
function spawnComponent(component,x,y){
	if(loots.countDead()){
		var loot = loots.getFirstDead();
		loot.loadTexture('parts', component);
		loot.lifespan = 120000;
		loot.scale.setTo(2,2);
		loot.reset(x + randomRange(-16,16), y+randomRange(-16,16));
		loot.averageCounter=50;
		loot.rotation=0;
		loot.acceleration=200;
		loot.blendMode=1;
		loot.lootType='component';
		loot.component = component;
		loot.acceleration=0;
		game.physics.arcade.velocityFromRotation(Math.random()*2*Math.PI, randomRange(50,player.sprite.body.maxVelocity.x*0.75), loot.body.velocity);

	}
}
function playerGotLoot (sprite, loot) {
	if(loot.lootType=='ore'){
		if(player.health>player.healthMax){
			player.health=player.healthMax;
		}
		player.health+=1;
		player.energy+=player.oreEnergy;
		ui.sound_beep.play();
	}else if(loot.lootType=='component'){
		playerStats.inventory.push(loot.component);
		ui.texts.push('got ' + components[loot.component].name);
	}
	sparkleBoom(sparkleExplosions,0,8,loot.x,loot.y);	
	loot.kill();
}
function bulletHitPlayer (sprite, bullet) {

	boom(explosions, bullet.bulletSprite, bullet.x, bullet.y);
	ui.sound_hit1.play();
	for (var i = 0; i < bullet.bulletHitBehavior.length; i++) {
		bullet.bulletHitBehavior[i](sprite, bullet);
	}

	var destroyed = player.damage(bullet.damage, bullet.owner);

	if(destroyed){
		ui.sound_randomBoom();
	}
	bullet.kill();
}
function enemyTouchPlayer (enemySprite, playerSprite) {
	if(player.sawDamage && enemies[enemySprite.name].ai==3)
	{

		ui.sound_hit1.play();
		var destroyed = enemies[enemySprite.name].damage(player.sawDamage);
		if(destroyed){
			ui.sound_randomBoom();
		}
		var angle=game.physics.arcade.angleBetween(playerSprite,enemySprite);
		enemySprite.body.velocity.x+=Math.cos(angle)*200;
		enemySprite.body.velocity.y+=Math.sin(angle)*200;
	}	
}

function bulletHitEnemy (sprite, bullet) {

	if(bullet.owner!=sprite){
		ui.sound_hit1.play();
		boom(explosions, bullet.bulletSprite, bullet.x, bullet.y);

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

