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
			target.mass+=10000;
			target.sprite.body.maxVelocity.x-=5;
			target.sprite.body.maxVelocity.y-=5;
			target.sprite.profile+=25;
			components[target.ship[i]].bonus(target);
		}
	}
	target.acceleration = (target.sprite.body.maxVelocity.x * target.acceleration)/ 250;
	target.healthMax = target.health;
	target.sprite.profileMax=target.sprite.profile; 
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
function asteroidSort(a, b) {
	if(!a.alive && !b.alive){
		return 0;
	}else if (!a.alive || b.sprite.profile){
		return 1;
	}else if (!b.alive || a.sprite.profile){
		return -1;
	}
	if(game.physics.distanceBetween(a.sprite,player.sprite)>
			game.physics.distanceBetween(b.sprite,player.sprite)){
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

	if(a.sprite.profile/game.physics.distanceBetween(a.sprite,player.sprite)>
			b.sprite.profile/game.physics.distanceBetween(b.sprite,player.sprite)){
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
	ui.shadowPlayer.sprite.reset(game.camera.x+0.5*resolutionX,game.camera.y+0.5*resolutionY);	
	ui.shadowPlayer.ship = ui.partsArray();
	applyBonuses(ui.shadowPlayer);
	ui.statsPing(ui.shadowPlayer);
}
dragPart = function(x,y,sheet,index){
	this.game = game;
	this.alive = true;
	this.sprite = game.add.sprite(x-x%16,y-y%16,sheet,index);
	this.index = index;
	this.sprite.inputEnabled=true;
	this.sprite.input.enableDrag(true,true);
	this.sprite.input.snapOnRelease=true;
	this.sprite.input.snapX=16;
	this.sprite.input.snapY=16;
	this.sprite.events.onDragStop.add(refreshStats);
};
dragPart.prototype.update = function(){
	if(!game.input.activePointer.isDown && this.sprite.alive){
		if(this.sprite.x >= ui.partsSelector.x &&
				this.sprite.x <= ui.partsSelector.x + ui.partsSelector.width &&	
				this.sprite.y >= ui.partsSelector.y &&
				this.sprite.y <= ui.partsSelector.y + ui.partsSelector.height){

					//prevent player from destroying the last part	
					for (var i=0;i<ui.parts.length;i++){
						if(ui.parts[i].sprite.alive && i != this.index){
							break;
						}
					}
					if (i == ui.parts.length){
						this.sprite.y += 300;
					}else{
						if (!cheatmode){
							playerStats.inventory.push(this.index);
						}
						this.sprite.kill();
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
	this.sprite = game.add.sprite(x,y,sheet,index);
	this.sprite.anchor.setTo(0.5,0.5);
	this.sprite.bringToTop();
	this.sprite.body.exchangeVelocity=false;
};
shipPart.prototype.update = function(){
	if (this.target.alive) {
		this.sprite.angle = this.target.angle;
		this.sprite.x = this.target.x + (this.offsetx * Math.cos(game.math.degToRad(this.target.angle)));
		this.sprite.y = this.target.y + (this.offsety * Math.cos(game.math.degToRad(this.target.angle)));
		this.sprite.x -= (this.offsety * Math.sin(game.math.degToRad(this.target.angle)));
		this.sprite.y += (this.offsetx * Math.sin(game.math.degToRad(this.target.angle)));
		this.sprite.body.velocity = this.target.body.velocity;
	}
};
lootItem = function(x,y,sheet,index){
	this.game = game;
	this.alive = true;
	this.sprite = game.add.sprite(x,y,sheet,index);
	this.sprite.anchor.setTo(0.5,0.5);
	this.sprite.bringToTop();
	this.sprite.body.exchangeVelocity=false;
	this.sprite.index=index;
};

enemyShip = function (index, game, targetSprite, bullets, shipList) {

	this.target = targetSprite;

	var x = this.target.x + (eo3.randomSign() * eo3.randomRange(750,2000));
	var y = this.target.y + (eo3.randomSign() * eo3.randomRange(750,2000));

	this.game = game;
	this.shipList = shipList;
	this.sprite = game.add.sprite(x, y, 'parts', 1023);
	this.bullets = bullets;
	this.sprite.name = index;
	this.thrust = game.add.emitter(0,0,20);
	this.thrust.makeParticles('sparks',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.thrust.gravity=0;
	this.initEnemyShip();


};

enemyShip.prototype.initEnemyShip = function(ship) {

	this.ship = this.shipList[Math.floor(eo3.randomRange(0,this.shipList.length))];
	this.sprite.profile = 250;
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
	this.sprite.visible = true;
	this.sprite.anchor.setTo(0.5, 0.5);
	this.bulletSprite = 0;
	this.parts = createShip(this.ship,this.sprite);

	this.sprite.body.setSize(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,0,0);

	this.sprite.body.mass = eo3.shipWithoutVoid(this.ship).length*10000


		this.sprite.body.collideWorldBounds = true;
	this.sprite.body.bounce.setTo(1, 1);
	this.sprite.angle = game.rnd.angle();

	this.sprite.body.maxVelocity.setTo(300,300);

	applyBonuses(this);

	this.sprite.body.velocity.x*=.3+Math.random()*0.7;
	this.sprite.body.velocity.y*=.3+Math.random()*0.7;
	game.physics.velocityFromRotation(this.sprite.rotation, 100, this.sprite.body.velocity);
	this.health*=enemyHealthCoef;
	this.healthMax*=enemyHealthCoef;
}

enemyShip.prototype.destroyParts = function() {
	if(typeof(this.parts)!='undefined'){
		for (var i = 0; i < this.parts.length; i++) {
			this.parts[i].sprite.destroy();
		}
	}
}

enemyShip.prototype.damage = function(dmg, aggro, bulletVelocity) {

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
				if(Math.random() < globalDropRate){
					spawnLoots(Math.floor(eo3.randomRange(0,4)), this.sprite.x, this.sprite.y);
					this.parts[j].sprite.destroy();
				}else{
					this.parts[j].sprite.lifespan = eo3.randomRange(1500,3000);
					this.parts[j].sprite.body.velocity = game.physics.velocityFromRotation(this.game.physics.angleBetween(this.sprite, this.parts[j].sprite), 200+eo3.randomRange(0,10*dmg));
					this.parts[j].sprite.body.angularVelocity=eo3.randomRange((dmg+2*14),(dmg+2)*62);					
					if(typeof(bulletVelocity)!='undefined'){
						this.parts[j].sprite.body.velocity.x = this.parts[j].sprite.body.velocity.x + (bulletVelocity.x*.01*dmg);
						this.parts[j].sprite.body.velocity.y = this.parts[j].sprite.body.velocity.y + (bulletVelocity.y*.01*dmg);
					}
				}
			}else{
				this.parts[j].sprite.destroy();
			}
		}	

		this.sprite.kill();
		playerStats.kills+=1;
		return true;
	}

	return false;

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
				this.nextFire = this.game.time.now + this.fireRate;
				this.energy-=this.fireEnergy;
				var bullet = this.bullets.getFirstDead();
				bullet.rotation=this.sprite.rotation;
				bullet.damage=this.fireDamage;
				bullet.reset(this.sprite.x + (Math.cos(this.sprite.rotation)*(this.sprite.body.width)), this.sprite.y + (Math.sin(this.sprite.rotation)*(this.sprite.body.width)));
				bullet.lifespan = this.fireRange; 
				bullet.loadTexture('bullet', this.bulletSprite);
				bullet.body.exchangeVelocity = false;
				bullet.fireVelocity=this.fireVelocity;
				bullet.owner=this.sprite;
				game.physics.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
				bullet.body.velocity.x += 0.5 * this.sprite.body.velocity.x;
				bullet.body.velocity.y += 0.5 * this.sprite.body.velocity.y;
				bullet.target=player;
				for (var i = 0; i < this.bulletBehavior.length; i++) {
					this.bulletBehavior[i](bullet);
				}
			}

}
enemyShip.prototype.update = function() {
	if (this.game.physics.distanceBetween(this.sprite, player.sprite) > 5000 && gamemode != '?attract' ||
			this.game.physics.distanceBetween(this.sprite, player.sprite) > 2000 && this.ai == 3){
				var x = this.target.x + (eo3.randomSign() * eo3.randomRange(750,2000));
				var y = this.target.y + (eo3.randomSign() * eo3.randomRange(750,2000));
				this.sprite.reset(x,y);
				if(this.ai==3){

								this.sprite.body.velocity = game.physics.velocityFromRotation(game.physics.angleBetween(this.sprite, player.sprite), eo3.randomRange(25,100));	
				this.sprite.body.angularVelocity=eo3.randomRange(25,100)*eo3.randomSign();
}
			}

			if(this.ai==2){
				//init asteroid stuff
				this.sprite.body.velocity = game.physics.velocityFromRotation(game.physics.angleBetween(this.sprite, player.sprite), eo3.randomRange(25,100));	
				this.sprite.body.angularVelocity=eo3.randomRange(25,100)*eo3.randomSign();
				this.sprite.profile=0;
				this.sprite.profileMax=0;
				this.ai=3;
			}
			if(this.ai!=3){
				if(!this.target.alive || (this.target == player.sprite && gamemode == '?attract') || 
					(game.physics.distanceBetween(this.sprite,this.target) > this.target.profile * 1.5 && this.behavior=='chasing' && gamemode != '?attract')){
						for(var i=0;i<this.aggroList.length;i++){
							if(this.aggroList[i].alive){		//this will cause the enemy to keep chasing the player if they were fired upon.
								this.target=this.aggroList[i]; // I believe this may cause a 'feature' where grudges are kept beyond the grave. 
								break;
							}
						}
						if(i>=this.aggroList.length){			
							this.target=player.sprite;
							if(gamemode!='?attract' && game.physics.distanceBetween(this.sprite, this.target) > this.target.profile) {
								this.behavior='neutral';
							}else if(gamemode=='?attract'){
								var minDistance=99999;
								var targetIndex;
								for(var i=0;i<enemies.length;i++){
									if(enemies[i].sprite.alive && game.physics.distanceBetween(this.sprite, enemies[i].sprite) < minDistance){
										minDistance = game.physics.distanceBetween(this.sprite, this.target);
										targetIndex = i;
									}
								}

								this.target=enemies[targetIndex].sprite;
							}
						}
					}

				if(this.alive && this.target.alive){

					if (this.speed > 0){
						if(game.time.now>(this.nextThrust||0)){
							this.thrust.x=this.sprite.x-(Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.5);
							this.thrust.y=this.sprite.y-(Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.5);
							this.thrust.minParticleSpeed.setTo(0,0);
							this.thrust.maxParticleSpeed.setTo(0,0);
							this.thrust.start(true, 1000, null, 1);
							this.nextThrust = game.time.now + 100; 
						}
						eo3.addVelocity(this.sprite.rotation, this.speed, this.sprite.body.velocity);
						this.speed=0;
					}

					if(this.ai==0){
						this.sprite.rotation = this.game.physics.angleBetween(this.sprite, this.target);

						if (this.game.physics.distanceBetween(this.sprite, this.target) < this.fireRange * 0.75 &&
								this.game.physics.distanceBetween(this.sprite, this.target) < this.behavior=='neutral'? this.target.profile : this.target.profile*2){
									this.fire(); 

								}
					} else if (this.ai == 1) {
						var targetLocation = {
							x:this.target.x,
							y:this.target.y
						};
						//TODO add some kind of fleeing behavior

						var targetDistance = this.game.physics.distanceBetween(this.sprite, this.target);
						var targetAngle = this.game.physics.angleBetween(this.sprite, this.target); 

						if(this.behavior=='strafing'){
							if(targetDistance > this.fireRange){
								this.behavior='chasing';
							}
						}
						if(this.behavior=='chasing'){
							if(targetDistance < 0.75 * this.fireRange){
								this.behavior='strafing';
							}
							targetLocation.x += this.target.body.velocity.x;//hardmode! * Math.abs(targetDistance/this.sprite.body.velocity.x);			
							targetLocation.y += this.target.body.velocity.y;//hardmode! * Math.abs(targetDistance/this.sprite.body.velocity.x);			
							var targetDistance = this.game.math.distance(this.sprite.x, this.sprite.y, targetLocation.x, targetLocation.y);
							var targetAngle = this.game.math.angleBetween(this.sprite.x, this.sprite.y, targetLocation.x, targetLocation.y);
						}


						if (game.math.radToDeg(Math.abs(this.sprite.rotation-targetAngle))>this.behavior=='neutral'?this.turnRate*30:this.turnRate){

							if(this.sprite.rotation-targetAngle>0){
								if(game.math.radToDeg(Math.abs(this.sprite.rotation-targetAngle))<180){	
									this.left();
								}else{
									this.right();
								}
							}else{
								if(game.math.radToDeg(Math.abs(this.sprite.rotation-targetAngle))<180){	
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
								if(this.game.physics.distanceBetween(this.sprite, enemies[i].sprite) < this.target.profile){
									if(enemies[i].behavior=='neutral'){
										enemies[i].behavior='chasing';
									}
								}
							}
						}

						if (this.target!= player.sprite || (targetDistance < this.target.profile*10 && this.behavior!='neutral')){
							if(Math.abs(targetAngle-this.sprite.rotation)<0.6 ||
									Math.abs(this.sprite.rotation-targetAngle)<0.6){
										this.up();
									}
						}
						if (targetDistance < this.fireRange * 0.75 &&
								targetDistance < this.target.profile){
									if(Math.abs(targetAngle-this.sprite.rotation)<0.2 ||
											Math.abs(targetAngle-this.sprite.rotation)>Math.PI-0.2){
												this.fire(); 
											}

								}

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
			}
}
;
var resolutionX=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var resolutionY=Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-66;
var game = new Phaser.Game(resolutionX, resolutionY, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

	game.load.spritesheet('parts', 'assets/parts.png', 16, 16);
	game.load.spritesheet('bullet', 'assets/bullets.png',16,16);
	game.load.image('starfield2', 'assets/starfield2.png');
	game.load.image('starfield3', 'assets/starfield3.png');
	game.load.image('starfield4', 'assets/starfield4.png');
	game.load.spritesheet('sparks', 'assets/sparks.png',8,8);
}

var playerShip = function(ship) {
	this.sprite = game.add.sprite(0, 0, 'parts', 1023);
	this.initPlayerShip(ship);
}
playerShip.prototype.destroyParts = function() {
	if(typeof(this.parts)!='undefined'){
		while(this.parts.length){
			this.parts[this.parts.length-1].sprite.destroy();
			this.parts.splice(this.parts.length-1,1);
		}
	}
}
playerShip.prototype.initPlayerShip = function (ship) {

	this.target={};
	this.ai=-1; //natural intelligence
	this.radarTargets=1;
	this.radarShowInRange=false;
	this.radarShowInEnemyRange=false;
	this.radarOreTargets=4;
	this.acceleration=1;
	this.sprite.reset(0,0);
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
	this.profileDecay = 300;
	this.energy=10;
	this.energyMax=10;
	this.energyRate=1000;
	this.energyAmount=2;
	this.ore=0;
	this.nextProfileDecay =0;
	this.nextEnergy = 0;
	this.nextFire = 0;

	this.sprite.visible=true;
	this.sprite.anchor.setTo(0.5, 0.5);
	this.sprite.body.maxVelocity.setTo(300,300);
	this.sprite.profile=250;	//max range at which opponents will attack. this will change dynamically
	this.thrust = game.add.emitter(0,0,200);
	this.thrust.makeParticles('sparks',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.thrust.gravity=0;

	this.sprite.body.drag.setTo(0, 0);
	this.sprite.body.bounce.setTo(0, 0);
	this.sprite.body.collideWorldBounds = true; 
	this.alt = function(){
		sparks(pew,this.sprite);
	}
	if(typeof(ship)=='undefined'){
		this.ship = ships[Math.floor(eo3.randomRange(0,ships.length))];
	}else{
		this.ship = ship;
	}
	this.parts = createShip(this.ship, this.sprite); //TODO not do this

	this.sprite.body.setSize(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,0,0);

	applyBonuses(this);

}
playerShip.prototype.damage = function(dmg, aggro) {

	this.health -= damageCoef * dmg;

	if (this.health <= 0){
		this.alive = false;
		for (var j = 0; j < this.parts.length; j++) {

			if (dmg != 31337){
				this.parts[j].sprite.lifespan = eo3.randomRange(1500,3000);
				this.parts[j].sprite.body.velocity = game.physics.velocityFromRotation(game.physics.angleBetween(this.sprite, this.parts[j].sprite), eo3.randomRange(200,400));
				this.parts[j].sprite.body.angularVelocity=eo3.randomRange((dmg+2*14),(dmg+2)*62);	
			}else{
				this.parts[j].sprite.kill();
			}
		}	

		this.sprite.kill();

		nextSpawn = game.time.now+5000;
		return true;
	}

	return false;

}

playerShip.prototype.left = function(){
	this.sprite.angle-=this.turnRate;
};
playerShip.prototype.right = function(){
	this.sprite.angle+=this.turnRate;
};
playerShip.prototype.up = function(){

	this.speed = this.acceleration;

};
playerShip.prototype.fire = function(){


	if (game.time.now > this.nextFire && bullets.countDead() > 0 && this.energy > this.fireEnergy && this.alive){
		this.sprite.profile+=Math.floor(this.fireDamage*40);
		this.nextFire = game.time.now + this.fireRate;
		this.energy -= this.fireEnergy;
		var bullet = bullets.getFirstDead();
		bullet.loadTexture('bullet', this.bulletSprite);
		bullet.damage = this.fireDamage * targetDamageCoef;
		bullet.lifespan = this.fireRange;
		bullet.body.mass = this.fireMass;
		bullet.reset(this.sprite.x + (Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.75), this.sprite.y + (Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.75));
		bullet.rotation = this.sprite.rotation;
		bullet.body.exchangeVelocity = false;
		bullet.owner=this.sprite;
		bullet.fireVelocity = this.fireVelocity; //mostly useless but want this to be accessible for bulletBehaviors
		game.physics.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
		bullet.body.velocity.x += 0.5 * this.sprite.body.velocity.x;
		bullet.body.velocity.y += 0.5 * this.sprite.body.velocity.y;

		for (var i = 0; i < this.bulletBehavior.length; i++) {
			this.bulletBehavior[i](bullet);
		}

	}


};
playerShip.prototype.alt = function(){};
playerShip.prototype.update = function(){
	if(this.alive){
		if(game.time.now>this.nextProfileDecay){
			if (Math.abs(this.sprite.profile-this.sprite.profileMax) < this.profileDecay)	{	
				this.sprite.profile=this.sprite.profileMax;
			}
			if (this.sprite.profile > this.sprite.profileMax){
				this.sprite.profile-=this.profileDecay;
			}else if (this.sprite.profile < this.sprite.profileMax){
				this.sprite.profile+=this.profileDecay;
			}

			this.nextProfileDecay=game.time.now+1000;
		}

		if (this.speed > 0){
			if(game.time.now>(this.nextThrust||0)){
				this.thrust.x=this.sprite.x-(Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.5);
				this.thrust.y=this.sprite.y-(Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.5);
				this.thrust.minParticleSpeed.setTo(0,0);
				this.thrust.maxParticleSpeed.setTo(0,0);
				this.thrust.start(true, 1000, null, 1);
				this.nextThrust = game.time.now + 100; 
			}
			eo3.addVelocity(this.sprite.rotation, this.speed, this.sprite.body.velocity);
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

var player;

var globalDropRate = 0.09;
var backdrop1, backdrop2,backdrop3;
var numBaddies = 9;
var numAsteroids = 19;
var enemies;
var loots;
var enemyBullets;
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

//prefabricated ships and asteroids to populate the playfield
var ships=[];
var asteroids=[];

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
			this.radar.push(game.add.text(200,100, '*',{ font:'12px monospace', fill: 'rgb(255,130,130)', align: 'center' }));
		}
	}
}
gameUI.prototype.initCombatUi = function() {

	destroyIfExists(this.healthLine);
	this.healthLine = game.add.text(200,100, '',{ font:'14px monospace', fill: 'rgb(96,96,240)', align: 'left' });
	this.healthLine.flash = 0;

	destroyIfExists(this.energyLine);
	this.energyLine = game.add.text(200,100, '',{ font:'14px monospace', fill: 'rgb(240,64,255)', align: 'left' });
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
	targetText.x = player.sprite.body.x+(player.sprite.body.width/2);
	targetText.y = player.sprite.body.y+player.sprite.body.height+30+offset;
s='◼◼◼◼◼◼◼';	
	var barSize=Math.floor(denominator/2);	
	var s='◿';
	var n=Math.floor((numerator/denominator)*barSize);
	if(n<0){n=0;}
	s+=repeat('◼',n);
	s+=repeat('◫',barSize-n); //white square
	s+='◸';
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
	s+='profile: ' + target.sprite.profile.toFixed(1) + '\n';
	s+='profileMax: ' + target.sprite.profileMax.toFixed(1) + '\n';
	s+='profileDecay: ' + target.profileDecay.toFixed(1) + '\n';

	this.statsLine.x = game.camera.x+20; 
	this.statsLine.y = game.camera.y+resolutionY*0.5;
	this.statsLine.setText(s);
}
gameUI.prototype.radarPing = function() {
	var s='';
	this.resetRadar();
	for(var i=0;i<this.radar.length;i++){
		var targetAngle=game.physics.angleBetween(player.sprite, this.enemies[i].sprite);
		var targetDistance=game.physics.distanceBetween(player.sprite, this.enemies[i].sprite);
		var s='●'; //I cannot believe this circle renders in my terminal
		var n=Math.floor(255-(targetDistance/2-900));
		if(n<0){n=0;}if(n>255){n=255};
		this.radar[i].style.fill="rgb("+n+",96,96)";
		if(this.enemies[i].sprite.profile>player.sprite.profileMax*2){
			this.radar[i].style.font='28px monospace';
		}else if(this.enemies[i].sprite.profile>player.sprite.profileMax){
			this.radar[i].style.font='22px monospace';
		}else if(this.enemies[i].sprite.profile>player.sprite.profileMax*0.5){
			this.radar[i].style.font='16px monospace';
		}else{
			this.radar[i].style.font='12px monospace';
		}
		if (targetDistance < 1000 && game.time.now % 1000 > 500)  {
			s='['+s+']';
			this.radar[i].style.fill="rgb(255,0,0)";
		} else if (targetDistance < 1000) {
			s=' '+s+' ';
		}

		this.radar[i].setText(s);
		this.radar[i].x = player.sprite.body.x + Math.cos(targetAngle) * 180 - 0.5 * this.radar[i].width;
		this.radar[i].y = player.sprite.body.y + Math.sin(targetAngle) * 180;	
	}
}
gameUI.prototype.wordsPing = function() {
	this.words.x = player.sprite.body.x;
	this.words.y = player.sprite.body.y + 200;
}
gameUI.prototype.update = function() {
	if (gamemode == 'war'){
		this.bar(this.healthLine, 0, player.health, player.healthMax);
		this.bar(this.energyLine, 10, player.energy, player.energyMax);
		this.enemies=enemies.slice(0);
		this.enemies.sort(threatSort);
		this.asteroids=enemies.slice(0);
		this.asteroids.sort(asteroidSort);
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
	this.partText.x = player.sprite.body.x - (0.5 * this.partText.width);
	this.partText.y = player.sprite.body.y + player.sprite.height * 12;

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
		player.sprite.body.velocity.x=0;
		player.sprite.body.velocity.y=0;
	}
	this.healthLine.setText('');
	this.energyLine.setText('');
	this.clearRadar();
	this.partsSelector = game.add.sprite(player.sprite.x-300,player.sprite.y-100,'parts',0);
	this.updatePart();
	this.partsSelector.scale.setTo(4,4);
	this.partsSelector.inputEnabled = true;
	this.partsSelector.events.onInputDown.add(selectPart);
	if(typeof(ship)!='undefined'){
		this.parts = createBuildParts(ship,player.sprite.x,player.sprite.y);
	}
}
gameUI.prototype.endPartsUI = function () {
	this.partsSelector.kill();
	var ship = this.partsArray();
	for(var i=0; i<this.parts.length;i++){
		this.parts[i].sprite.destroy();
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
			if(this.parts[i].sprite.alive){
				var n=0;
				n = (this.parts[i].sprite.x - minx)/16;
				n+= ((this.parts[i].sprite.y - miny)/16)*shipSize;
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
	if(!cheatmode){
		playerStats.inventory.splice(ui.currentPart,1);
		ui.previousPart();
	}
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
	if (gamemode == '?cheat'){
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
		
	asteroids.push([-1,18,72,73,-1,-1,20,23,19,-1,-1,-1,20,25,-1,-1,-1,14,24,-1,-1,-1,16,21,-1]); 	
	asteroids.push([-1,14,15,-1,-1,-1,17,25,19,-1,-1,-1,20,22,-1,-1,-1,14,24,-1,-1,-1,16,21,-1]); 	
	asteroids.push([-1,25,19,-1,-1,18,22,-1,-1,23,24,-1,-1,20,21,-1]); 	
	asteroids.push([-1,-1,25,-1,-1,-1,-1,-1,14,-1,-1,-1,-1,-1,16,19,-1,-1,-1,-1,18,22,-1,-1,-1,-1,23,24,-1,-1,-1,-1,20,21,-1,-1]); 	
	asteroids.push([14,-1,-1,16,19,-1,-1,20,-1]); 	
		asteroids.push([-1, -1, -1, -1, -1, 18, 19, 18, 25, 15, 16, 22, 24, 14, 17, -1, 16, 23, 21, -1, -1, -1, -1, -1, -1] );
		asteroids.push([18, 19, 18, 21, 20, 22, 24, -1, -1, 20, 23, 21, -1, -1, -1, -1] );
			asteroids.push([-1,14,-1,-1,-1,16,15,-1,-1,14,64,-1,-1,16,17,-1]); 
		asteroids.push([20,19,-1,-1,35,22,36,37,20,25,21,-1,-1,21,-1,-1]); 
		asteroids.push([-1,18,19,-1,6,25,22,-1,14,20,38,39,15,-1,-1,-1]); 
		asteroids.push([18, 104, 19, 20, 23, 21, -1, -1, -1]);
		asteroids.push([14, 9, 16, 17]);
		asteroids.push([14, 15, 16, 17]);
		asteroids.push([-1, 14, 15, 18, 23, 17, 20, 17, -1]);
		asteroids.push([18, 19, 20, 21]);
		asteroids.push([18, 19, -1, 20, 25, 19, -1, 20, 21]);
		asteroids.push([18, 19, -1, -1, 23, 25, 19, -1, 18, 23, 21, -1, 20, 21, -1, -1]);
		asteroids.push([14, 19, -1, -1, 23, 25, 15, -1, 14, 23, 21, -1, 20, 21, -1, -1]);
		asteroids.push([-1, 18, 19, -1, 18, 23, 25, 19, 106, 30, 30, 107, -1, 106, 107, -1]);
		asteroids.sort(lengthSort);

ships.push([129,128,33,-1,66,130,-1,-1,-1]); 
		ships.push([12,9,131,71,71,-1,35,1,41,104,105,73,-1,31,131,73,40,77,-1,109,103,1,47,73,-1,-1,-1,108,-1,-1,-1,-1,-1,-1,-1,-1]);  
		ships.push([66, 34, -1, -1]) //default player ship? 
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
				player.parts[i].sprite.visible=false;
			}
		}
		//  Create some baddies to waste :)
		enemies = [];

		for (var i = 0; i < numBaddies; i++){
			enemies.push(new enemyShip(i, game, player.sprite, enemyBullets, ships));
		}

		for (var i = numBaddies; i < numAsteroids + numBaddies; i++){	//fugliness to compensate for index fugliness
			enemies.push(new enemyShip(i, game, player.sprite, enemyBullets, asteroids));
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

		loots = game.add.group();
		loots.createMultiple(30, 'parts');
		loots.setAll('anchor.x',0.5);
		loots.setAll('anchor.y', 0.5);
		loots.setAll('outOfBoundsKill', true);
		loots.setAll('lifespan', 60000);
		game.camera.follow(player.sprite);
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
function pullLootToPlayer(s) {
	if (!player.alive){
		s.kill();
	}
	s.acceleration+=3;
	game.physics.accelerateToObject(s,player.sprite.body,s.acceleration);
	if(s.acceleration>500){
		var targetAngle = game.physics.angleBetween(s, player.sprite); 
		game.physics.velocityFromRotation(targetAngle, s.acceleration, s.body.velocity);
	}
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
					enemies[i] = new enemyShip(i, game, player.sprite, enemyBullets,enemies[i].shipList); //FIXME
				};
			}
			nextSpawn=game.time.now+eo3.randomRange(5000,10000);
		}	

		if(nextCamera<game.time.now&&gamemode=='?attract'){
			game.camera.follow(enemies[Math.floor(Math.random()*enemies.length)].sprite);
			nextCamera=game.time.now+eo3.randomRange(5000,15000);
		}

		if(loots.getFirstAlive() != null) {

			for (var i = 0; i < player.parts.length; i++) {
				game.physics.collide(loots, player.parts[i].sprite, playerGotLoot, null, this);
			}
			loots.forEachAlive(pullLootToPlayer, this);
		}
		if(enemyBullets.getFirstAlive() != null) {

			for (var i = 0; i < player.parts.length; i++) {
				game.physics.collide(enemyBullets, player.parts[i].sprite, bulletHitPlayer, null, this);
			}
			for (var i = 0; i < enemies.length; i++) {
				game.physics.collide(enemyBullets, enemies[i].sprite, bulletHitEnemy, null, this);
			}
		}

		for (var i = 0; i < enemies.length; i++){
			if (enemies[i].alive){
				enemies[i].update();
				for (var j = 0; j < player.parts.length; j++) {
					game.physics.collide(enemies[i].sprite, player.parts[j].sprite);
				}
				game.physics.collide(bullets, enemies[i].sprite, bulletHitEnemy, null, this);

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

function sparks(emitter, sprite){
	emitter.x=sprite.x+eo3.randomRange(-.7*sprite.body.width,sprite.body.width);
	emitter.y=sprite.y+eo3.randomRange(-.7*sprite.body.width,sprite.body.width);;
	emitter.minParticleSpeed.setTo(-200,-200);
	emitter.maxParticleSpeed.setTo(200,200);
	emitter.particleDrag.setTo(50,50);
	emitter.start(true,200,null, eo3.randomRange(1,14));
}
function sparkExplosion(emitter, sprite){
	emitter.x=sprite.x;
	emitter.y=sprite.y;
	emitter.minParticleSpeed.setTo(-300,-300);
	emitter.maxParticleSpeed.setTo(300,300);
	emitter.particleDrag.setTo(200,200);
	emitter.start(true,600,null, 200);
}
function spawnLoots(_count, x, y){
	var lootCount = _count;
	if(loots.countDead() < lootCount){
		lootCount = loots.countDead();
	}

	for(var i = 0; i < lootCount; i++)
	{
		var loot = loots.getFirstDead();
		loot.loadTexture('parts', Math.floor(eo3.randomRange(0,4))+26);
		loot.lifespan = 60000;
		loot.body.angularVelocity = eo3.randomRange(-300,300);
		loot.reset(x + eo3.randomRange(-16,16), y+eo3.randomRange(-16,16));
		loot.rotation = Math.random()*Math.PI;
		loot.body.exchangeVelocity = false;
		loot.acceleration=0;
		game.physics.velocityFromRotation(loot.rotation, eo3.randomRange(100,300), loot.body.velocity);
	}
}
function playerGotLoot (sprite, loot) {
	loot.kill();
	player.ore+=1;
}
function bulletHitPlayer (sprite, bullet) {
	bullet.kill();

	var destroyed = player.damage(bullet.damage, bullet.owner);
	if (destroyed){
		sparkExplosion(pew, sprite);	
	}
}

function bulletHitEnemy (sprite, bullet) {

	bullet.kill();

	var destroyed = enemies[sprite.name].damage(bullet.damage, bullet.owner, bullet.body.velocity);
	if (destroyed && enemies[sprite.name].ai!=3){
		sparkExplosion(pew, sprite);	
	}

}



function render () {

}

