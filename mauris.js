var gamemode;
var defaultBehavior='neutral';
var cheatmode = 1;
// container for stuff that might persist between games
var playerMeta = function () {
	this.credits=0;
	this.inventory=[];
	if(cheatmode){
		for(var i=0; i<components.length; i++){
			if(!components[i].name.match(/Component/)){
				this.inventory.push(i);
			}
		}
	}
	this.kills=0;
	this.deaths=0;
};


window.oncontextmenu = function (){
	return false;     // cancel default menu
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

	for(var i=0;i<target.ship.length;i++){
		if (target.ship[i]!=-1){
			components[target.ship[i]].bonus(target);
			target.mass+=10000;
			target.actor.body.maxVelocity.x-=5;
			target.actor.body.maxVelocity.y-=5;
			target.actor.profile+=25;
		}
	}
}

eo3 = {};
eo3.addVelocity = function (a,b,c){return"undefined"==typeof b&&(b=60),	c=c||new d.Point,c.setTo(c.x+Math.cos(a)*b,c.y+Math.sin(a)*b)};
eo3.randomRange = function(a,b){var c,d; if(a>b){c=a;d=b;}else{d=a;c=b};return (Math.random()*(c-d))+d};
eo3.randomSign = function(){return Math.random()>.5?1:-1};
eo3.addVelocityTest = function (a,b,c){return '' +  c.x + ' - ' + Math.cos((game.math.degToRad(a))*b) + ' : ' + c.y+' - '+(Math.sin(game.math.degToRad(a))*b)};
eo3.shipWithoutVoid = function (ship) {
	var shipOut=[];
	for (var i=0;i<ship.length;i++){
		if (ship[i]!=-1){
			shipOut.push(ship[i]);
		}
	}
	return shipOut;
};
function lengthSort(a, b) {
	if(a.length>b.length){
		return 1;
	}else if(a.length<b.length){
		return -1;
	} else{
		return 0;
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

	if(a.actor.profile/game.physics.distanceBetween(a.actor,player.actor)>
			b.actor.profile/game.physics.distanceBetween(b.actor,player.actor)){
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

function refreshStats() {

	ui.shadowPlayer = new playerShip([1023]);
	ui.shadowPlayer.actor.reset(game.camera.x+0.5*resolutionX,game.camera.y+0.5*resolutionY);	
	ui.shadowPlayer.ship = ui.partsArray();
	applyBonuses(ui.shadowPlayer);
	ui.statsPing(ui.shadowPlayer);
}
dragPart = function(x,y,sheet,index){
	this.game = game;
	this.alive = true;
	this.actor = game.add.sprite(x-x%16,y-y%16,sheet,index);
	this.index = index;
	this.actor.inputEnabled=true;
	this.actor.input.enableDrag(true,true);
	this.actor.input.snapOnRelease=true;
	this.actor.input.snapX=16;
	this.actor.input.snapY=16;
	this.actor.events.onDragStop.add(refreshStats);
};
dragPart.prototype.update = function(){
	if(!game.input.activePointer.isDown && this.actor.alive){
		if(this.actor.x >= ui.partsSelector.x &&
				this.actor.x <= ui.partsSelector.x + ui.partsSelector.width &&	
				this.actor.y >= ui.partsSelector.y &&
				this.actor.y <= ui.partsSelector.y + ui.partsSelector.height){

					//prevent player from destroying the last part	
					for (var i=0;i<ui.parts.length;i++){
						if(ui.parts[i].actor.alive && i != this.index){
							break;
						}
					}
					if (i == ui.parts.length){
						this.actor.y += 300;
					}else{
						if (!cheatmode){
							playerStats.inventory.push(this.index);
						}
						this.actor.kill();
						ui.updatePart();
						ui.partsArray(); //recalc rectangle
					}
				}
	}

}
shipPart = function(x,y,sheet,index,targetSprite){
	this.offsetx = x;
	this.offsety = y;
	this.game = game;
	this.target = targetSprite;
	this.alive = true;
	this.actor = game.add.sprite(x,y,sheet,index);
	this.actor.anchor.setTo(0.5,0.5);
	this.actor.bringToTop();
	this.actor.body.exchangeVelocity=false;
};
shipPart.prototype.update = function(){
	if (this.target.alive) {
		this.actor.angle = this.target.angle;
		this.actor.x = this.target.x + (this.offsetx * Math.cos(game.math.degToRad(this.target.angle)));
		this.actor.y = this.target.y + (this.offsety * Math.cos(game.math.degToRad(this.target.angle)));
		this.actor.x -= (this.offsety * Math.sin(game.math.degToRad(this.target.angle)));
		this.actor.y += (this.offsetx * Math.sin(game.math.degToRad(this.target.angle)));
		this.actor.body.velocity = this.target.body.velocity;
	}
};

enemyShip = function (index, game, targetSprite, bullets) {

	var x = targetSprite.x + (eo3.randomSign() * eo3.randomRange(750,2000));
	var y = targetSprite.y + (eo3.randomSign() * eo3.randomRange(750,2000));

	this.game = game;
	this.actor = game.add.sprite(x, y, 'parts', 1023);
	this.target = targetSprite;
	this.bullets = bullets;
	this.actor.name = index;
	this.thrust = game.add.emitter(0,0,20);
	this.thrust.makeParticles('sparks',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.thrust.gravity=0;
	this.initEnemyShip();


};

enemyShip.prototype.initEnemyShip = function(ship) {

	this.ship = ships[Math.floor(eo3.randomRange(0,ships.length))];
	this.actor.profile = 100;
	this.aggroList = [];
	this.holdThrust=0;
	this.acceleration=1;
	this.health = 3;
	this.bulletBehavior=[];
	this.ai = 1;
	this.behavior=defaultBehavior;
	if(Math.random()<0.2){
		this.behavior='chasing';
	}
	this.turnRate=0.5;
	this.fireRate = 300;
	this.fireVelocity = 400;
	this.fireDamage = 2;
	this.fireRange = 1000;
	this.fireMass = 0.1;
	this.fireEnergy = 2;
	this.speed = 0;
	this.energy=10;
	this.energyMax=10;
	this.energyRate=1000;
	this.energyAmount=2;


	this.nextEnergy = 0;
	this.nextFire = game.time.now+eo3.randomRange(1000,8000);
	this.alive = true;
	this.parts = [];
	this.actor.visible = true;
	this.actor.anchor.setTo(0.5, 0.5);
	this.bulletSprite = 0;
	this.parts = createShip(this.ship,this.actor);

	this.actor.body.setSize(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,0,0);

	this.actor.body.mass = eo3.shipWithoutVoid(this.ship).length*10000


		this.actor.body.collideWorldBounds = true;
	this.actor.body.bounce.setTo(1, 1);
	this.actor.angle = game.rnd.angle();

	this.actor.body.maxVelocity.setTo(300,300);

	applyBonuses(this);

	this.actor.body.velocity.x*=.3+Math.random()*0.7;
	this.actor.body.velocity.y*=.3+Math.random()*0.7;
	game.physics.velocityFromRotation(this.actor.rotation, 100, this.actor.body.velocity);
	this.health*=enemyHealthCoef;
	this.healthMax = this.health; //FIXME
	this.actor.profileMax=this.actor.profile; //FIXME2
}

enemyShip.prototype.destroyParts = function() {
	if(typeof(this.parts)!='undefined'){
		for (var i = 0; i < this.parts.length; i++) {
			this.parts[i].actor.destroy();
		}
	}
}

enemyShip.prototype.damage = function(dmg, aggro) {

	this.health -= damageCoef * dmg;

	if(typeof(aggro)!='undefined'){
		if((aggro.profile*2)/((this.target.profile)+(aggro.profile*2))>Math.random()){					
			this.aggroList.push(aggro);
			this.target = aggro;
		}
		if(gamemode=='?attract'){
			this.aggroList.push(aggro);
			this.target = aggro;		
		}
	}
	if (this.health <= 0){
		this.alive = false;
		for (var j = 0; j < this.parts.length; j++) {

			if (dmg != 31337){
				this.parts[j].actor.lifespan = eo3.randomRange(1500,3000);
				this.parts[j].actor.body.velocity = game.physics.velocityFromRotation(this.game.physics.angleBetween(this.actor, this.parts[j].actor), 200+eo3.randomRange(0,10*dmg));
				this.parts[j].actor.body.angularVelocity=eo3.randomRange((dmg+2*14),(dmg+2)*62);	
			}else{
				this.parts[j].actor.kill();
			}
		}	

		this.actor.kill();

		return true;
	}

	return false;

}

enemyShip.prototype.left = function(){
	this.actor.angle-=this.turnRate;
};
enemyShip.prototype.right = function(){
	this.actor.angle+=this.turnRate;
};
enemyShip.prototype.up = function(){

	this.speed = this.acceleration;

};
enemyShip.prototype.fire = function () {
	if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0 &&
			this.energy>=this.fireEnergy){
				this.nextFire = this.game.time.now + this.fireRate;
				this.energy-=this.fireEnergy;
				var bullet = this.bullets.getFirstDead();
				bullet.rotation=this.actor.rotation;
				bullet.damage=this.fireDamage;
				bullet.reset(this.actor.x + (Math.cos(this.actor.rotation)*(this.actor.body.width)), this.actor.y + (Math.sin(this.actor.rotation)*(this.actor.body.width)));
				bullet.lifespan = this.fireRange; 
				bullet.loadTexture('bullet', this.bulletSprite);
				bullet.body.exchangeVelocity = false;
				bullet.fireVelocity=this.fireVelocity;
				bullet.owner=this.actor;
				game.physics.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
				bullet.body.velocity.x += 0.5 * this.actor.body.velocity.x;
				bullet.body.velocity.y += 0.5 * this.actor.body.velocity.y;
				bullet.target=player;
				for (var i = 0; i < this.bulletBehavior.length; i++) {
					this.bulletBehavior[i](bullet);
				}
			}

}
enemyShip.prototype.update = function() {

	if(!this.target.alive || (this.target == player.actor && gamemode == '?attract') || 
			(game.physics.distanceBetween(this.actor,this.target) > this.target.profile * 2 && this.behavior=='chasing' && gamemode != '?attract')){
				for(var i=0;i<this.aggroList.length;i++){
					if(this.aggroList[i].alive){		//this will cause the enemy to keep chasing the player if they were fired upon.
						this.target=this.aggroList[i]; // I believe this may cause a 'feature' where grudges are kept beyond the grave. 
						break;
					}
				}
				if(i>=this.aggroList.length){			
					this.target=player.actor;
					if(gamemode!='?attract' && game.physics.distanceBetween(this.actor, this.target) > this.target.profile) {
						this.behavior='neutral';
					}else if(gamemode=='?attract'){
						var minDistance=99999;
						var targetIndex;
						for(var i=0;i<enemies.length;i++){
							if(enemies[i].actor.alive && game.physics.distanceBetween(this.actor, enemies[i].actor) < minDistance){
								minDistance = game.physics.distanceBetween(this.actor, this.target);
								targetIndex = i;
							}
						}

						this.target=enemies[targetIndex].actor;
					}
				}
			}

	if(this.alive && this.target.alive){

		if (this.speed > 0){
			if(game.time.now>(this.nextThrust||0)){
				this.thrust.x=this.actor.x-(Math.cos(this.actor.rotation)*(this.actor.body.width)*0.5);
				this.thrust.y=this.actor.y-(Math.sin(this.actor.rotation)*(this.actor.body.width)*0.5);
				this.thrust.minParticleSpeed.setTo(0,0);
				this.thrust.maxParticleSpeed.setTo(0,0);
				this.thrust.start(true, 1000, null, 1);
				this.nextThrust = game.time.now + 100; 
			}
			eo3.addVelocity(this.actor.rotation, this.speed, this.actor.body.velocity);
			this.speed=0;
		}

		if(this.ai==0){
			this.actor.rotation = this.game.physics.angleBetween(this.actor, this.target);

			if (this.game.physics.distanceBetween(this.actor, this.target) < this.fireRange * 0.75 &&
					this.game.physics.distanceBetween(this.actor, this.target) < this.target.profile){
						this.fire(); 

					}
		} else if (this.ai == 1) {
			var targetLocation = {
				x:this.target.x,
				y:this.target.y
			};
			//TODO add some kind of fleeing behavior

			var targetDistance = this.game.physics.distanceBetween(this.actor, this.target);
			var targetAngle = this.game.physics.angleBetween(this.actor, this.target); 

			if(this.behavior=='strafing'){
				if(targetDistance > this.fireRange){
					this.behavior='chasing';
				}
			}
			if(this.behavior=='chasing'){
				if(targetDistance < 0.75 * this.fireRange){
					this.behavior='strafing';
				}
				targetLocation.x += this.target.body.velocity.x;//hardmode! * Math.abs(targetDistance/this.actor.body.velocity.x);			
				targetLocation.y += this.target.body.velocity.y;//hardmode! * Math.abs(targetDistance/this.actor.body.velocity.x);			
				var targetDistance = this.game.math.distance(this.actor.x, this.actor.y, targetLocation.x, targetLocation.y);
				var targetAngle = this.game.math.angleBetween(this.actor.x, this.actor.y, targetLocation.x, targetLocation.y);
			}


			if (game.math.radToDeg(Math.abs(this.actor.rotation-targetAngle))>this.behavior=='neutral'?this.turnRate*30:this.turnRate){

				if(this.actor.rotation-targetAngle>0){
					if(game.math.radToDeg(Math.abs(this.actor.rotation-targetAngle))<180){	
						this.left();
					}else{
						this.right();
					}
				}else{
					if(game.math.radToDeg(Math.abs(this.actor.rotation-targetAngle))<180){	
						this.right();
					}else{
						this.left();
					}
				}





			}

			if (targetDistance < this.target.profile) {
				if(this.behavior=='neutral'){
					this.behavior='chasing';
				}
				for(var i=0;i<enemies.length;i++){
					if(this.game.physics.distanceBetween(this.actor, enemies[i].actor) < this.target.profile){
						if(enemies[i].behavior=='neutral'){
							enemies[i].behavior='chasing';
						}
					}
				}
			}

			if (this.target!= player.actor || (targetDistance < this.target.profile*10 && this.behavior!='neutral')){
				if(Math.abs(targetAngle-this.actor.rotation)<0.6 ||
						Math.abs(this.actor.rotation-targetAngle)<0.6){
							this.up();
						}
			}
			if (targetDistance < this.fireRange * 0.75 &&
					targetDistance < this.target.profile){
						if(Math.abs(targetAngle-this.actor.rotation)<0.2 ||
								Math.abs(targetAngle-this.actor.rotation)>Math.PI-0.2){
									this.fire(); 
								}

					}

		}


		if (this.game.physics.distanceBetween(this.actor, player.actor) > 5000 && gamemode != '?attract'){
			this.damage(31337); //magic damage value that kills without parts 
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
				sparks(pew,this.actor);
			}
		}
	}
}
;
var resolutionX=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var resolutionY=Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-66;
var game = new Phaser.Game(resolutionX, resolutionY, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

	game.load.image('allparts', 'assets/parts.png');
	game.load.spritesheet('parts', 'assets/parts.png', 16, 16);
	game.load.spritesheet('bullet', 'assets/bullets.png',16,16);
	game.load.image('starfield2', 'assets/starfield2.png');
	game.load.image('starfield3', 'assets/starfield3.png');
	game.load.image('starfield4', 'assets/starfield4.png');
	game.load.spritesheet('sparks', 'assets/sparks.png',8,8);
}

var playerShip = function(ship) {
	this.actor = game.add.sprite(0, 0, 'parts', 1023);
	this.initPlayerShip(ship);
}
playerShip.prototype.destroyParts = function() {
	if(typeof(this.parts)!='undefined'){
		for (var i = 0; i < this.parts.length; i++) {
			this.parts[i].actor.kill();
		}
	}
}
playerShip.prototype.initPlayerShip = function (ship) {

	this.target={};
	this.ai=-1; //natural intelligence
	this.radarTargets=1;
	this.radarShowInRange=false;
	this.radarShowInEnemyRange=false;
	this.radarShowOre=false;
	this.acceleration=1;
	this.actor.reset(0,0);
	this.turnRate=0.5;
	this.health=8;
	this.alive=true;
	this.bulletSprite=0;
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
	this.profileDecay = 100;
	this.energy=10;
	this.energyMax=10;
	this.energyRate=1000;
	this.energyAmount=2;

	this.nextProfileDecay =0;
	this.nextEnergy = 0;
	this.nextFire = 0;

	this.actor.visible=true;
	this.actor.anchor.setTo(0.5, 0.5);
	this.actor.body.maxVelocity.setTo(300,300);
	this.actor.profile=100;	//max range at which opponents will attack. this will change dynamically
	this.thrust = game.add.emitter(0,0,200);
	this.thrust.makeParticles('sparks',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.thrust.gravity=0;

	this.actor.body.drag.setTo(0, 0);
	this.actor.body.bounce.setTo(0, 0);
	this.actor.body.collideWorldBounds = true; 
	this.alt = function(){
		sparks(pew,this.actor);
	}
	if(typeof(ship)=='undefined'){
		this.ship = ships[Math.floor(eo3.randomRange(0,ships.length))];
	}else{
		this.ship = ship;
	}
	this.parts = createShip(this.ship, this.actor); //TODO not do this

	this.actor.body.setSize(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,0,0);

	applyBonuses(this);

	this.healthMax = this.health;
	this.actor.profileMax=this.actor.profile; //FIXME2
}
playerShip.prototype.damage = function(dmg, aggro) {

	this.health -= damageCoef * dmg;

	if (this.health <= 0){
		this.alive = false;
		for (var j = 0; j < this.parts.length; j++) {

			if (dmg != 31337){
				this.parts[j].actor.lifespan = eo3.randomRange(1500,3000);
				this.parts[j].actor.body.velocity = game.physics.velocityFromRotation(game.physics.angleBetween(this.actor, this.parts[j].actor), eo3.randomRange(200,400));
				this.parts[j].actor.body.angularVelocity=(this.parts[j].offsetx+this.parts[j].offsety+1)*eo3.randomRange(3,7);	
			}else{
				this.parts[j].actor.kill();
			}
		}	

		this.actor.kill();

		nextSpawn = game.time.now+5000;
		return true;
	}

	return false;

}

playerShip.prototype.left = function(){
	this.actor.angle-=this.turnRate;
};
playerShip.prototype.right = function(){
	this.actor.angle+=this.turnRate;
};
playerShip.prototype.up = function(){

	this.speed = this.acceleration;

};
playerShip.prototype.fire = function(){


	if (game.time.now > this.nextFire && bullets.countDead() > 0 && this.energy > this.fireEnergy && this.alive){
		this.actor.profile+=Math.floor(this.fireDamage*40);
		this.nextFire = game.time.now + this.fireRate;
		this.energy -= this.fireEnergy;
		var bullet = bullets.getFirstDead();
		bullet.loadTexture('bullet', this.bulletSprite);
		bullet.damage = this.fireDamage * targetDamageCoef;
		bullet.lifespan = this.fireRange;
		bullet.body.mass = this.fireMass;
		bullet.reset(this.actor.x + (Math.cos(this.actor.rotation)*(this.actor.body.width)*0.75), this.actor.y + (Math.sin(this.actor.rotation)*(this.actor.body.width)*0.75));
		bullet.rotation = this.actor.rotation;
		bullet.body.exchangeVelocity = false;
		bullet.owner=this.actor;
		bullet.fireVelocity = this.fireVelocity; //mostly useless but want this to be accessible for bulletBehaviors
		game.physics.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
		bullet.body.velocity.x += 0.5 * this.actor.body.velocity.x;
		bullet.body.velocity.y += 0.5 * this.actor.body.velocity.y;

		for (var i = 0; i < this.bulletBehavior.length; i++) {
			this.bulletBehavior[i](bullet);
		}

	}


};
playerShip.prototype.alt = function(){};
playerShip.prototype.update = function(){
	if(this.alive){
		if(game.time.now>this.nextProfileDecay){
			if (Math.abs(this.actor.profile-this.actor.profileMax) < this.profileDecay)	{	
				this.actor.profile=this.actor.profileMax;
			}
			if (this.actor.profile > this.actor.profileMax){
				this.actor.profile-=this.profileDecay;
			}else if (this.actor.profile < this.actor.profileMax){
				this.actor.profile+=this.profileDecay;
			}

			this.nextProfileDecay=game.time.now+1000;
		}

		if (this.speed > 0){
			if(game.time.now>(this.nextThrust||0)){
				this.thrust.x=this.actor.x-(Math.cos(this.actor.rotation)*(this.actor.body.width)*0.5);
				this.thrust.y=this.actor.y-(Math.sin(this.actor.rotation)*(this.actor.body.width)*0.5);
				this.thrust.minParticleSpeed.setTo(0,0);
				this.thrust.maxParticleSpeed.setTo(0,0);
				this.thrust.start(true, 1000, null, 1);
				this.nextThrust = game.time.now + 100; 
			}
			eo3.addVelocity(this.actor.rotation, this.speed, this.actor.body.velocity);
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
				sparks(pew,this.actor);
			}
		}
	}
};

var player;

// global
var backdrop1, backdrop2,backdrop3;
var numBaddies = 14;
var enemies;
var enemyBullets;
var logo;
var nextUIDelay=0;
var nextSpawn=0;
var nextCamera=0; //attract
var damageCoef=0.3; //global damage tuner
var targetDamageCoef=5; //not so global damage tuner
var enemyHealthCoef=0.7; 
var cursors;
var pew;
var bullets;
var nextFire = 0;

var partShip;

var ships=[];
var ui;
var gameUI = function () {
	this.parts = [];
	this.currentPart = 0;
}
gameUI.prototype.calculatePartPosition = function() {

	var minx = 999999999;
	var miny = 999999999;
	var maxx = -999999999;
	var maxy = -999999999;
	var shipSize = 0;
	for(var i=0;i<this.parts.length;i++){
		if(this.parts[i].actor.alive){
			if(this.parts[i].actor.x < minx){
				minx = this.parts[i].actor.x;
			}
			if(this.parts[i].actor.y < miny){
				miny = this.parts[i].actor.y;
			}
			if(this.parts[i].actor.x > maxx){
				maxx = this.parts[i].actor.x;
			}
			if(this.parts[i].actor.y > maxy){
				maxy = this.parts[i].actor.y;
			}
		}
	}
	var outx = 0;
	var outy = 0;
	var choice = Math.floor(eo3.randomRange(0,4));
	if(choice==0){
		outx = minx-16;
		outy = Math.floor(eo3.randomRange(miny, maxy+16));
	}else if(choice==1){
		outy = miny-16;
		outx = Math.floor(eo3.randomRange(minx, maxx+16));
	}else if(choice==2){
		outx = maxx+16;
		outy = Math.floor(eo3.randomRange(miny, maxy+16));
	}else if(choice==3){
		outy = maxy+16;
		outx = Math.floor(eo3.randomRange(minx, maxx+16));
	}
	return {'x':outx,'y':outy};
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
			this.radar.push(game.add.text(200,100, '*',{ font:'8px monospace', fill: 'rgb(255,160,160)', align: 'center' }));
		}
	}
}
gameUI.prototype.initCombatUi = function() {

	destroyIfExists(this.healthLine);
	this.healthLine = game.add.text(200,100, '',{ font:'8px monospace', fill: 'rgb(200,240,240)', align: 'left' });
	this.healthLine.flash = 0;

	destroyIfExists(this.energyLine);
	this.energyLine = game.add.text(200,100, '',{ font:'8px monospace', fill: 'rgb(200,240,240)', align: 'left' });
	this.energyLine.flash = 0;

	destroyIfExists(this.statsLine);
	this.statsLine = game.add.text(200,100, '',{ font:'1em monospace', fill: 'rgb(240,240,240)', align: 'left' });

	destroyIfExists(this.graphics);
	this.graphics = game.add.graphics(0,0);

	destroyIfExists(this.words);
	this.words = game.add.text(0,0,'',{font:'1.5em monospace', fill: 'rgb(255,255,255)', align: 'left'});

	destroyIfExists(this.partText);
	this.partText = game.add.text(0,0,'',{font:'1.5em monospace', fill: 'rgb(255,255,255)', align: 'left'});

	this.radar = [];
	this.resetRadar();
}

gameUI.prototype.bar = function (targetText, offset, numerator, denominator) {
	targetText.x = player.actor.body.x+(player.actor.body.width/2);
	targetText.y = player.actor.body.y+player.actor.body.height+30+offset;
	var s='[';
	var n=Math.floor((numerator/denominator)*8);
	if(n<0){n=0;}
	s+=repeat('*',n);
	s+=repeat(' ',8-n);
	s+=']';
	targetText.setText(s);
}

gameUI.prototype.statsPing = function(target) {
	var s='';
	s+='health: ' + Math.floor(target.health).toFixed(1) + '\n';
	s+='healthMax: ' + target.healthMax.toFixed(1) + '\n'
		s+='\n';
	s+='energy: ' + target.energy.toFixed(1) + '\n';
	s+='energyMax: ' + target.energyMax.toFixed(1) + '\n';

	s+='\n';
	s+='energyRate: ' + target.energyRate.toFixed(1) + '\n';
	s+='energyAmount: ' + target.energyAmount.toFixed(1) + '\n';

	s+='\n';
	s+='radarTargets: ' + target.radarTargets.toFixed(1) + '\n';
	s+='\n';
	s+='acceleration: ' + target.acceleration.toFixed(1) + '\n';
	s+='turnRate: ' + target.turnRate.toFixed(1) + '\n';

	s+='\n';
	s+='fireRate: ' + target.fireRate.toFixed(1) + '\n';
	s+='fireDamage: ' + target.fireDamage.toFixed(1) + '\n';
	s+='fireVelocity: ' + target.fireVelocity.toFixed(1) + '\n';
	s+='fireRange: ' + target.fireRange.toFixed(1) + '\n';
	s+='fireMass: ' + target.fireMass.toFixed(1) + '\n';
	s+='fireEnergy: ' + target.fireEnergy.toFixed(1) + '\n';

	s+='\n';
	s+='profile: ' + target.actor.profile.toFixed(1) + '\n';
	s+='profileMax: ' + target.actor.profileMax.toFixed(1) + '\n';
	s+='profileDecay: ' + target.profileDecay.toFixed(1) + '\n';

	this.statsLine.x = game.camera.x+20; 
	this.statsLine.y = game.camera.y+resolutionY*0.5;
	this.statsLine.setText(s);
}
gameUI.prototype.radarPing = function() {
	this.resetRadar();
	for(var i=0;i<this.radar.length;i++){
		var targetAngle=game.physics.angleBetween(player.actor, this.enemies[i].actor);
		var targetDistance=game.physics.distanceBetween(player.actor, this.enemies[i].actor);
		if(this.enemies[i].actor.profile>player.actor.profileMax*2){
			s='!!!@!!!';
		}else if(this.enemies[i].actor.profile>player.actor.profileMax){
			s='!!@!!';
		}else if(this.enemies[i].actor.profile>player.actor.profileMax*0.5){
			s='!@!';
		}else{
			s='@';
		}
		if (targetDistance < 1000 && game.time.now % 1000 > 500)  {
			s='['+s+']';
		} else if (targetDistance < 1000) {
			s=' '+s+' ';
		}

		this.radar[i].setText(s);
		this.radar[i].x = player.actor.body.x + Math.cos(targetAngle) * 180 - 0.5 * this.radar[i].width;
		this.radar[i].y = player.actor.body.y + Math.sin(targetAngle) * 180;	
	}
}
gameUI.prototype.partTextPing = function() {
}
gameUI.prototype.wordsPing = function() {
	this.words.x = player.actor.body.x;
	this.words.y = player.actor.body.y + 200;
}
gameUI.prototype.update = function() {
	if (gamemode == 'war'){
		this.bar(this.healthLine, 0, player.health, player.healthMax);
		this.bar(this.energyLine, 10, player.energy, player.energyMax);
		this.enemies=enemies.slice(0);
		this.enemies.sort(threatSort);
		this.radarPing();
		this.statsPing(player);
		this.wordsPing();
	}
}

gameUI.prototype.updatePart = function () {
	if(playerStats.inventory.length){
		this.partsSelector.loadTexture('parts',playerStats.inventory[this.currentPart]);
		this.partText.setText(components[playerStats.inventory[this.currentPart]].name);
	}else{
		this.partsSelector.loadTexture('parts',0)
			this.partText.setText('Drag a component to the X to store it in your inventory.')
	}
	this.partText.x = player.actor.body.x - (0.5 * this.partText.width);
	this.partText.y = player.actor.body.y + player.actor.height;

}

gameUI.prototype.previousPart = function () {
	if(playerStats.inventory.length){
		this.currentPart = (playerStats.inventory.length + this.currentPart - 1) % playerStats.inventory.length;	
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

gameUI.prototype.partsUI = function (ship) {
	game.camera.follow=null;
	if(gamemode != '?build'){
		gamemode = '?build';
	}
	if(typeof(player)!='undefined'){
		player.destroyParts();
		player.actor.body.velocity.x=0;
		player.actor.body.velocity.y=0;
	}
	this.healthLine.setText('');
	this.energyLine.setText('');
	this.clearRadar();
	this.partsSelector = game.add.sprite(player.actor.x,player.actor.y-300,'parts',0);
	this.updatePart();
	this.partsSelector.scale.setTo(4,4);
	this.partsSelector.inputEnabled = true;
	this.partsSelector.events.onInputDown.add(selectPart);
	if(typeof(ship)!='undefined'){
		this.parts = createBuildParts(ship,player.actor.x,player.actor.y);
	}
}
gameUI.prototype.endPartsUI = function () {
	this.partsSelector.kill();
	var ship = this.partsArray();
	for(var i=0; i<this.parts.length;i++){
		this.parts[i].actor.kill();
	}
	this.parts=[];
	this.graphics.clear();
	this.partText.setText('');
	player.initPlayerShip(ship);
	gamemode = 'war';
}
gameUI.prototype.partsArray = function () {
	this.graphics.clear();
	var outArray = [];
	if(typeof(this.parts[0])!='undefined'){
		var minx = 999999999;
		var miny = 999999999;
		var maxx = -999999999;
		var maxy = -999999999;
		var shipSize = 0;
		for(var i=0;i<this.parts.length;i++){
			if(this.parts[i].actor.alive){
				if(this.parts[i].actor.x < minx){
					minx = this.parts[i].actor.x;
				}
				if(this.parts[i].actor.y < miny){
					miny = this.parts[i].actor.y;
				}
				if(this.parts[i].actor.x > maxx){
					maxx = this.parts[i].actor.x;
				}
				if(this.parts[i].actor.y > maxy){
					maxy = this.parts[i].actor.y;
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

		for (var i=0;i<shipSize*shipSize;i++){
			outArray.push(-1);
		}
		for (var i=0;i<this.parts.length;i++){
			if(this.parts[i].actor.alive){
				var n=0;
				n = (this.parts[i].actor.x - minx)/16;
				n+= ((this.parts[i].actor.y - miny)/16)*shipSize;
				n+=offset;
				outArray[n] = this.parts[i].index;
			}
		}

		this.graphics.lineStyle(1, 0x6666FF,1);
		this.graphics.drawRect(minx,miny,16+maxx-minx,16+maxy-miny);
	}
	return outArray;
}
function selectPart() {
	createPart(playerStats.inventory[ui.currentPart]);	
	playerStats.inventory.splice(ui.currentPart,1);
	ui.previousPart();
}



function createPart(n){

	var partPosition = ui.calculatePartPosition(); 
	ui.parts.push(new dragPart(partPosition.x,partPosition.y,'parts',n));
			refreshStats();

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
			myParts.push(new shipPart(((n-1)*-8)+((i%n)*16),((n-1)*-8)+(Math.floor(i/n)*16),'parts',shipParts[i],targetActor));
		}
	}
	return myParts; 
}
function createBuildParts(ship,x,y){
	var myParts = [];
	x-=x%32;
	y-=y%32;
	var n=Math.sqrt(ship.length);

	if (n!=Math.floor(n)){
		return [];
	};
	for (var i=0; i<ship.length;i++){
		if(ship[i]>-1){
			//that godawful barf there is a terse calculation for the coordinates of the part
			//assuming an array of 'parts' (sprite ids) - array should have a length
			//with an int square root
			myParts.push(new dragPart(x+(16*(i%n)),y+(16*Math.floor(i/n)),'parts',ship[i]));
		}
	}
	return myParts; 
}


function create () {

	ui = new gameUI();
	gamemode = location.search||'war';
	if (gamemode = '?cheat'){
		gamemode = 'war';
		cheatmode = 1;
	}
	if (gamemode == 'war' | gamemode == '?attract'){
		if(gamemode=='?attract'){
			numBaddies=30;
			defaultBehavior='chasing';
		}
		game.world.setBounds(-100000, -100000, 200000, 200000);
		backdrop1 = game.add.tileSprite(0, 0, resolutionX, resolutionY, 'starfield2');

		backdrop1.fixedToCamera = true;
		backdrop1.scale.x=2;
		backdrop1.scale.y=2;	


		backdrop2 = game.add.tileSprite(0, 0, resolutionX, resolutionY, 'starfield3');
		backdrop2.fixedToCamera = true;
		backdrop2.scale.x=2;
		backdrop2.scale.y=2;	

		backdrop3 = game.add.tileSprite(0, 0, resolutionX, resolutionY, 'starfield4');
		backdrop3.fixedToCamera = true;
		backdrop3.scale.x=2;
		backdrop3.scale.y=2;

		ships.push([70, 12, 12, 104, 2, 5, 102, 40, 40]);
		ships.push([10, 33, 13, 101, 32, 65, 65, 75, 32, 72, 72, 107, 66, 40, 104, 105]);
		ships.push([12, 41, 44, 130]);
		ships.push([10, 11, -1, -1, -1, 74, 75, -1, -1, 42, 43, 12, -1, 13, 106, 107, -1, -1, -1, 1, 129, -1, 129, -1, -1, -1, -1, -1, -1, 74, 32, 75, -1, -1, -1, -1, 128, 32, 65, 109, 65, 73, -1, -1, -1, -1, -1, 106, 32, 107, -1, -1, -1, -1, -1, 1, 129, -1, 129, -1, -1, -1, -1, 74, 75, 44, -1, 45, 10, 11, -1, -1, 106, 107, -1, -1, -1, 42, 43, -1, -1]);	
		ships.push([10, 35, 2, 76, 36, 37, 42, 35, 128]);	
		ships.push([12, 8, 105, 44, 41, 101, 45, 104, 73]);	
		ships.push([70, 71, 71, 72, 77, 13, 102, 103, 103]);
		ships.push([74, 8, 9, 72, 104, 107, 130, 44, 13]);
		ships.push([74, 75, 10, 35, 5, 101, 106, 107, 42]);
		ships.push([10, 9, 42, 43]);
		ships.push([70, 72, 73, 32, 65, 34, 102, 130, -1]);
		ships.push([-1, 70, 72, 70, -1, 74, 107, 96, 106, 75, 68, 104, 104, 104, 128, 106, 75, 96, 74, 107, -1, 102, 72, 102, -1]);
		ships.push([10, 75, -1, 106, 70, 71, -1, 40, 103]);
		ships.push([-1, -1, -1, -1, -1, 74, 72, 41, 72, 11, 5, 73, 3, 73, 5, 106, 72, 41, 72, 43, -1, -1, -1, -1, -1])
			ships.push([70, 71, 73, -1, 104, 70, 71, 11, 104, 102, 103, 105, 102, 103, 73, -1]);
		ships.push([69, 74, 73, 35, 36, 37, 69, 42, 73]);
		ships.push([74, 5, 32, 105]);
		ships.push([74, 75, -1, -1, 104, 104, 34, -1, 102, 102, 103, 73, 2, 2, 2, 130]);
		ships.push([-1, 71, 70, 7, 10, 33, 128, 39, 106, 33, 128, 7, -1, 103, 102, 39]);
		ships.push([70, 73, 5, 71, -1, 10, 72, 3, 70, 75, 35, 35, 35, 104, 37, 42, 72, 3, 102, 107, 102, 73, 5, 103, -1]);
		ships.push([74, 75, 71, 9, -1, -1, 106, 107, 65, 65, 65, 8, -1, 129, 96, 99, 96, 73, -1, 74, 75, 72, 41, 40, -1, 106, 107, 104, 10, 11, 32, 104, 105, 103, 42, 43]);
		ships.push([-1, 131, 71, 71, 35, 41, 104, 105, 40, 131, 103, 103, -1, 73, -1, -1]);
		ships.push([-1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1,-1, 70, 70, 70, 70, 70, -1, 32, 160, 64, 104, 41, 5, 37, -1, 102, 102, 102, 102, 102,   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
		ships.push([74, 70, 11, 41, 160, 33, 106, 102, 43]);
		ships.push([8, 9, 40, 41]);
		ships.push([70, 71, 102, 103]);
		ships.push([74, 6, 7, 106, 107, 39, 32, 73, -1]);
		ships.push([10, 11, 9, 41, 42, 43, 104, 105, 8, 104, 74, 75, 73, 40, 106, 107]);	
		ships.push([-1, 5, 5, 5, 101, 35, 3, 3, 4, 36, -1, 132, 35, 132, -1, 35, 3, 3, 4, 36, -1, 133, 133, 133, 101]);	
		ships.push([98, 128, 2, 129, 65, 33, 32, 3, 64]);	
		ships.push([65, 65, 98, -1, 96, 65, 160, 98, 160, 96, 160, 1, 32, 160, 33, 130]);
		ships.push([4, 5, 5, 101, 35, 99, 3, 36, -1, -1, 133, -1, -1, -1, -1, -1]);

		ships.push([4, -1, -1, -1, 35, 5, 5, 37, 4, -1, -1, -1, -1, -1, -1, -1]);
		ships.push([35, 36, 37, -1, 132, -1, 35, 36, 37]);	
		ships.push([160, 160, 160, 128, 64, -1, 32, 34, -1]);
		ships.push([98, -1, 64, 34]);
		ships.push([66, 33, -1, 130]);
		ships.push([-1, -1, -1, 33, 2, -1, -1, -1, -1, -1, 129, -1, -1, -1, 66, 160, 128, 129, -1, -1, -1, 32, 32, 32, 65, 34, -1, -1, 66, 160, 128, 129, -1, -1, -1, -1, -1, -1, 129, -1, -1, -1, -1, -1, -1, 33, 2, -1, -1]);
		ships.push([69, 128, 65, 33, 69, 128, 65, 96, -1, 128, 65, 33, 32, 64, 32, 32]);		
		ships.push([96, 3, 4, -1, 99, 67, -1, -1, 99, 100, -1, -1, 133, 5, 5, -1]);
		ships.push([-1, -1, 98, -1, -1, 69, 35, 36, 68, 37, -1, 100, 67, -1, -1, -1, 132, 132, -1, -1, 32, 64, 68, 5, 5]);
		ships.push([32, 65, 96, 98, 32, 65, 64, 128, -1, -1, 129, -1, -1, 66, 34, -1]);
		ships.push([66, 1, 2, 32, 33, 34, -1, 130, -1]);
		ships.push([-1, 3, 5, -1, -1, -1, 129, -1, -1, -1, 35, 68, 68, 36, 37, -1, 129, -1, -1, -1, -1, 3, 5, -1, -1]);
		ships.push([35, 3, 131, 37]);
		ships.push([-1, -1, -1, -1, 35, 3, 131, 37, -1, -1, -1, -1, -1, -1, -1, -1]);
		ships.sort(lengthSort);

		var temp = game.add.sprite(0,0,'parts');
		temp.visible = false;


		playerStats = new playerMeta ();
		player = new playerShip();
		//  The enemies bullet group
		enemyBullets = game.add.group();
		enemyBullets.createMultiple(200, 'bullet');
		enemyBullets.setAll('anchor.x', 0.5);
		enemyBullets.setAll('anchor.y', 0.5);
		enemyBullets.setAll('lifespan',5000)
			enemyBullets.setAll('body.immovable', 1);
		enemyBullets.setAll('outOfBoundsKill', true);

		//override the player obj in demo mode
		if(gamemode == '?attract'){
			for(var i=0;i<player.parts.length;i++){
				player.parts[i].actor.visible=false;
			}
		}
		//  Create some baddies to waste :)
		enemies = [];

		for (var i = 0; i < numBaddies; i++){
			enemies.push(new enemyShip(i, game, player.actor, enemyBullets,pew));
		}

		pew = game.add.emitter(0,0,200);
		pew.makeParticles('sparks');
		pew.gravity=0;

		//  Our bullet group
		bullets = game.add.group();
		bullets.createMultiple(30, 'bullet');
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 0.5);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('lifespan', 1000);

		game.camera.follow(player.actor);
		game.camera.focusOnXY(0, 0);



	}

	cursors =	{
		up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
		down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
		left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
		right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
		up2: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down2: game.input.keyboard.addKey(Phaser.Keyboard.S),
		left2: game.input.keyboard.addKey(Phaser.Keyboard.A),
		right2: game.input.keyboard.addKey(Phaser.Keyboard.D)
	}


	if (gamemode == '?build'){
		ui.partsUI();
		player = new playerShip([1023]);
	}
	ui.initCombatUi();
}

function update () {
	if(gamemode=='?build'){

		for (var i = 0; i < ui.parts.length; i++){
			ui.parts[i].update();
		}
	}
	if(gamemode=='war' || gamemode=='?attract'){


		if(nextSpawn<game.time.now||nextSpawn==0||gamemode=='?attract'){
			if(!player.alive){
				player.initPlayerShip();
			}
			for(var i = 0; i < enemies.length ; i++) {
				if (enemies[i].alive==false){
					enemies[i] = new enemyShip(i, game, player.actor, enemyBullets,pew);
				};
			}
			nextSpawn=game.time.now+eo3.randomRange(5000,10000);
		}	

		if(nextCamera<game.time.now&&gamemode=='?attract'){
			game.camera.follow(enemies[Math.floor(Math.random()*enemies.length)].actor);
			nextCamera=game.time.now+eo3.randomRange(5000,15000);
		}

		if(enemyBullets.getFirstAlive() != null) {

			for (var i = 0; i < player.parts.length; i++) {
				game.physics.collide(enemyBullets, player.parts[i].actor, bulletHitPlayer, null, this);
			}
			for (var i = 0; i < enemies.length; i++) {
				game.physics.collide(enemyBullets, enemies[i].actor, bulletHitEnemy, null, this);
			}
		}

		for (var i = 0; i < enemies.length; i++){
			if (enemies[i].alive){
				enemies[i].update();
				for (var j = 0; j < player.parts.length; j++) {
					game.physics.collide(enemies[i].actor, player.parts[j].actor);
				}
				game.physics.collide(bullets, enemies[i].actor, bulletHitEnemy, null, this);

				for (var j = 0; j < enemies[i].parts.length; j++) {

					enemies[i].parts[j].update();

				}	

			}
		}

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
		if (game.time.now > nextUIDelay + 2000 && (cursors.down.isDown || cursors.down2.isDown)){
			ui.partsUI(player.ship);
			nextUIDelay=game.time.now+1000;
		}
		player.update();
		// scrolling
		backdrop1.tilePosition.x = -0.25*game.camera.x;
		backdrop1.tilePosition.y = -0.25*game.camera.y;
		backdrop2.tilePosition.x = -0.40*game.camera.x;
		backdrop2.tilePosition.y = -0.40*game.camera.y;
		backdrop3.tilePosition.x = -0.6*game.camera.x;
		backdrop3.tilePosition.y = -0.6*game.camera.y;



		if (game.input.activePointer.isDown){
			//  Boom!
			player.fire();
		}

	}	
	ui.update();
	if (gamemode == '?build' && !game.input.activePointer.isDown) {
		if (game.time.now > nextUIDelay && (cursors.left.isDown || cursors.left2.isDown)){
			ui.previousPart();
			nextUIDelay = game.time.now+1000;
		}
		if (game.time.now > nextUIDelay && (cursors.right.isDown || cursors.right2.isDown)){
			ui.nextPart();	
			nextUIDelay = game.time.now+1000;
		}
		if (game.time.now > nextUIDelay && (cursors.up.isDown || cursors.up2.isDown)){
			//somethin' clever!
		}
		if (game.time.now > nextUIDelay + 2000 && (cursors.down.isDown || cursors.down2.isDown)){
			ui.endPartsUI();
			nextUIDelay=game.time.now+1000;
		}
		if(!cursors.left.isDown && !cursors.left2.isDown &&
				!cursors.right.isDown && !cursors.right2.isDown &&
				!cursors.up.isDown && !cursors.up2.isDown &&
				!cursors.down.isDown && !cursors.down2.isDown 
		  ){
			  nextUIDelay = 0;
		  }
	}
}

function sparks(emitter, actor){
	emitter.x=actor.x+eo3.randomRange(-.7*actor.body.width,actor.body.width);
	emitter.y=actor.y+eo3.randomRange(-.7*actor.body.width,actor.body.width);;
	emitter.minParticleSpeed.setTo(-200,-200);
	emitter.maxParticleSpeed.setTo(200,200);
	emitter.particleDrag.setTo(50,50);
	emitter.start(true,200,null, eo3.randomRange(1,14));
}
function sparkExplosion(emitter, actor){
	emitter.x=actor.x;
	emitter.y=actor.y;
	emitter.minParticleSpeed.setTo(-300,-300);
	emitter.maxParticleSpeed.setTo(300,300);
	emitter.particleDrag.setTo(200,200);
	emitter.start(true,600,null, 200);
}

function bulletHitPlayer (actor, bullet) {
	bullet.kill();

	var destroyed = player.damage(bullet.damage, bullet.owner);
	if (destroyed){
		sparkExplosion(pew, actor);	
	}
}

function bulletHitEnemy (actor, bullet) {

	bullet.kill();

	var destroyed = enemies[actor.name].damage(bullet.damage, bullet.owner);
	if (destroyed){
		sparkExplosion(pew, actor);	
	}

}



function render () {

}

