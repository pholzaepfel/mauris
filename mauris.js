var gamemode;
var defaultBehavior='neutral';
var cheatmode = 0;
// container for stuff that might persist between games
var playerMeta = function () {
	this.credits=0;
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


window.oncontextmenu = function (){
	return false;     // cancel default menu
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

	for(var i=0;i<target.ship.length;i++){
		if (target.ship[i]!=-1){
			target.sprite.body.maxVelocity.x-=5;
			target.sprite.body.maxVelocity.y-=5;
			target.sprite.profile+=25;
			if(i>9){
				target.turnRate-=0.02; //gimp larger ships a bit
			}
			components[target.ship[i]].bonus(target);
		}
	}
	target.acceleration = (target.sprite.body.maxVelocity.x * target.acceleration)/ 250;

	//apply some minimums
	if(this.health < 6){this.health=6;}
	if(this.acceleration < 0.5){this.acceleration=0.5}
	if(this.turnRate < 0.5){this.turnRate=0.5}
	if(this.fireRate < 100){this.fireDamage+=(100-this.fireRate)/25;this.fireRate=100}
	if(this.energyRate < 400){this.energyAmount+=(400-this.energyRate)/100}		
	if(this.fireEnergy < 1){this.fireEnergy=1}	

	target.healthMax = target.health;
	target.sprite.profileMax=target.sprite.profile; 
}

function addVelocity (a,b,c){return"undefined"==typeof b&&(b=60),	c=c||new d.Point,c.setTo(c.x+Math.cos(a)*b,c.y+Math.sin(a)*b)};
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
	}else{
		this.parts[i].initDragPart(x,y,'parts',index);
	}
	return this.parts[i];
}
partsPool = function(){
	this.parts=[];
	for(var i=0;i<500;i++){
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
	this.sprite.alpha=1;
	this.sprite.visible = true;
	this.sprite.reset(this.offsetx,this.offsety);
	this.sprite.anchor.setTo(0.5,0.5);
	this.sprite.bringToTop();
}
shipPart.prototype.update = function(){
	if (this.target.alive && this.alive) {
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
	this.sprite.index=index;
};

enemyShip = function (index, game, targetSprite, bullets, shipList) {

	this.target = targetSprite;

	var x = this.target.x + (randomSign() * randomRange(750,2000));
	var y = this.target.y + (randomSign() * randomRange(750,2000));

	this.game = game;
	this.shipList = shipList;
	this.sprite = game.add.sprite(x, y, 'parts', 1023);
	this.bullets = bullets;
	this.sprite.name = index;
	this.thrust = game.add.emitter(0,0,20);
	this.thrust.makeParticles('thrust',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.thrust.setAll('alpha','0.8');
	this.thrust.gravity=0;
	this.initEnemyShip();


};

enemyShip.prototype.initEnemyShip = function(ship) {

	var x = this.target.body.x + (randomSign() * randomRange(750,2000)) + player.sprite.body.velocity.x*3;
	var y = this.target.body.y + (randomSign() * randomRange(750,2000)) + player.sprite.body.velocity.y*3;

	this.sprite.reset(x,y);
	boom(explosions,4,x,y);
	this.ship = this.shipList[Math.floor(randomRange(0,this.shipList.length))];
	this.destroyParts()
		this.sprite.profile = 250;
	this.sprite.profileDecay = 166;
	this.nextProfileDecay = 0;
	this.aggroList = [];
	this.holdThrust=0;
	this.acceleration=1;
	this.health = 3;
	this.bulletHitBehavior=[];
	this.bulletBehavior=[];
	this.ai = 1;
	this.alive=true;
	this.behavior=defaultBehavior;
	this.altCooldown=0;
	if(Math.random()<0.2){
		this.behavior='chasing';
	}
	this.died=0;
	this.turnRate=0.5;
	this.fireRate = 300;
	this.fireVelocity = 400;
	this.fireDamage = 2;
	this.fireRange = 1000;
	this.fireMass = 0.1;
	this.fireEnergy = 2;
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
	this.parts = createShip(this.ship,this.sprite);

	this.sprite.body.setRectangle(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*-8,Math.sqrt(this.ship.length)*-8);

	this.sprite.body.mass = shipWithoutVoid(this.ship).length*10000


		this.sprite.body.collideWorldBounds = true;
	this.sprite.angle = game.rnd.angle();

	this.sprite.body.maxVelocity.setTo(300,300);

	applyBonuses(this);

	this.sprite.body.velocity.x*=.3+Math.random()*0.7;
	this.sprite.body.velocity.y*=.3+Math.random()*0.7;

	this.lastVelocityX = this.sprite.body.velocity.x;
	this.lastVelocityY = this.sprite.body.velocity.y;


	game.physics.velocityFromRotation(this.sprite.rotation, 100, this.sprite.body.velocity);
	this.health*=enemyHealthCoef;
	this.healthMax*=enemyHealthCoef;
}
enemyShip.prototype.destroyParts = function() {
	if(typeof(this.parts)!='undefined'){
		for(var i=0; i<this.parts.length;i++)
		{
			boom(explosions,1,this.parts[i].sprite.x,this.parts[i].sprite.y);
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
	}

	if(this.shield){
		boom(explosions,4,this.sprite.x,this.sprite.y);
	}else{
		this.health -= damageCoef * dmg;
	}

	if(typeof(aggro)!='undefined'){
		this.aggroList.push(aggro);
		this.target = aggro;
	}
	if (this.health <= 0){
		this.alive = false;
		this.died=game.time.now+10000;



		bigBoom(explosions,this.sprite.x,this.sprite.y);
		for (var j = 0; j < this.parts.length; j++) {
			if(Math.random() < lootDropRate + player.dropRate){
				spawnLoots(Math.floor(randomRange(0,4)), this.sprite.x, this.sprite.y);
				this.parts[j].sprite.kill();
			}else if(Math.random() < (componentDropRate + player.dropRate) && components[this.parts[j].component].drops){ //TODO probably make stuff drop less, but we're just testing
				spawnComponent(this.parts[j].component, this.sprite.x, this.sprite.y);
				this.parts[j].sprite.kill();	
			}else{
				this.parts[j].sprite.body.velocity = game.physics.velocityFromRotation(this.game.physics.angleBetween(this.sprite, this.parts[j].sprite), 200+randomRange(0,10*dmg));
				this.parts[j].sprite.body.angularVelocity=randomRange((dmg+2*14),(dmg+2)*62);					
				if(typeof(bulletVelocity)!='undefined'){
					this.parts[j].sprite.body.velocity.x = this.parts[j].sprite.body.velocity.x + (bulletVelocity.x*.01*dmg);
					this.parts[j].sprite.body.velocity.y = this.parts[j].sprite.body.velocity.y + (bulletVelocity.y*.01*dmg);
				}
			}
		}	
		this.cullParts();
		this.sprite.kill();
		if(this.ai!=3){playerStats.kills+=1;}
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
				this.nextFire = this.game.time.now + this.fireRate;
				this.energy-=this.fireEnergy;
				this.spawnBullet();
			}

}
enemyShip.prototype.spawnBullet = function () {
	var bullet = this.bullets.getFirstDead();
	bullet.rotation=this.sprite.rotation;
	bullet.damage=this.fireDamage;
	bullet.reset(this.sprite.x + (Math.cos(this.sprite.rotation)*(this.sprite.body.width)), this.sprite.y + (Math.sin(this.sprite.rotation)*(this.sprite.body.width)));
	bullet.lifespan = this.fireRange; 
	bullet.alpha=1;
	bullet.scale.setTo(1,1);
	bullet.bulletHitBehavior=this.bulletHitBehavior;
	bullet.angularVelocity=0;
	bullet.loadTexture('bullet', this.bulletSprite);
	bullet.bulletSprite=this.bulletSprite;
	bullet.fireVelocity=this.fireVelocity;
	bullet.owner=this.sprite;
	game.physics.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
	bullet.body.velocity.x += 0.5 * this.sprite.body.velocity.x;
	bullet.body.velocity.y += 0.5 * this.sprite.body.velocity.y;
	bullet.target=player;
	for (var i = 0; i < this.bulletBehavior.length; i++) {
		this.bulletBehavior[i](bullet);
	}

	return bullet;

}
enemyShip.prototype.update = function() {
	//fugly hack to get around mysterious loss of velocity
	if(this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0){
		this.lastVelocityX = this.sprite.body.velocity.x;
		this.lastVelocityY = this.sprite.body.velocity.y;
	}else{
		this.sprite.body.velocity.x = this.lastVelocityX;
		this.sprite.body.velocity.y = this.lastVelocityY;
	}
	if (this.game.physics.distanceBetween(this.sprite, player.sprite) > 5000 ||
			this.game.physics.distanceBetween(this.sprite, player.sprite) > 2500 && this.ai == 3){

				var x = this.target.x + (randomSign() * randomRange(750,2000)) + player.sprite.body.velocity.x*3;
				var y = this.target.y + (randomSign() * randomRange(750,2000)) + player.sprite.body.velocity.y*3;
				this.sprite.reset(x,y);
				boom(explosions,4,x,y);
				if(this.ai==3){

					this.sprite.body.velocity = game.physics.velocityFromRotation(game.physics.angleBetween(this.sprite, player.sprite), randomRange(25,100));	
					this.sprite.body.angularVelocity=randomRange(25,100)*randomSign();
				}
			}
	this.sprite.profile = this.sprite.profileMax; //tracking this in detail is hard and unnecessary

	if(game.time.now>this.altCooldown){
		this.shield=false;
	}

	if(this.ai==2){
		//init asteroid stuff
		this.sprite.body.velocity = game.physics.velocityFromRotation(game.physics.angleBetween(this.sprite, player.sprite), randomRange(25,100));	
		this.sprite.body.angularVelocity=randomRange(25,100)*randomSign();
		this.sprite.profile=0;
		this.sprite.profileMax=0;
		this.ai=3;
	}
	if(this.ai!=3){
		if(!this.target.alive || 
				(game.physics.distanceBetween(this.sprite,this.target) > this.target.profile * 1.5 && this.behavior=='chasing')){
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

		if(this.alive && this.target.alive){

			if (this.speed > 0){
				if(game.time.now>(this.nextThrust||0)){
					this.thrust.x=this.sprite.x-(Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.5);
					this.thrust.y=this.sprite.y-(Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.5);
					this.thrust.minParticleSpeed.setTo(0,0);
					this.thrust.maxParticleSpeed.setTo(0,0);
					this.thrust.emitParticle();
					partsToTop(this);	
					this.nextThrust = game.time.now + 15; 
				}
				addVelocity(this.sprite.rotation, this.speed, this.sprite.body.velocity);
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
					targetLocation.x += this.target.body.velocity.x * Math.abs(targetDistance/this.sprite.body.velocity.x);			
					targetLocation.y += this.target.body.velocity.y * Math.abs(targetDistance/this.sprite.body.velocity.y);			
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
var resolutionY=Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-20;
var game = new Phaser.Game(resolutionX, resolutionY, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

	game.load.spritesheet('parts', 'assets/parts.png', 16, 16);
	game.load.image('station', 'assets/station.png');
	game.load.image('partswindow', 'assets/partswindow.png');
	game.load.spritesheet('bullet', 'assets/bullets.png',16,16);
	game.load.image('starfield2', 'assets/starfield2.png');
	game.load.image('starfield3', 'assets/starfield3.png');
	game.load.image('starfield4', 'assets/starfield4.png');
	game.load.spritesheet('sparkles', 'assets/sparkles.png',4,4);
	game.load.spritesheet('thrust', 'assets/thrust.png',8,8);
	game.load.spritesheet('sparks', 'assets/sparks.png',8,8);
	game.load.spritesheet('explosions', 'assets/explosions.png',16,16);
}



var playerShip = function(ship) {
	this.sprite = game.add.sprite(0, 0, 'parts', 1023);
	this.initPlayerShip(ship);
	this.thrust = game.add.emitter(0,0,200);
	this.thrust.makeParticles('thrust',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.thrust.setAll('alpha',0.7);
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
			boom(explosions,1,this.parts[i].sprite.x,this.parts[i].sprite.y);
			this.parts[i].sprite.kill();
		}
		this.parts=[];
	}
}
playerShip.prototype.initPlayerShip = function (ship) {

	this.target={};
	this.ai=-1; //natural intelligence
	this.radarTargets=1;
	this.dropRate=0;
	this.radarShowInRange=false;
	this.radarShowInEnemyRange=false;
	this.radarOreTargets=4;
	this.acceleration=1;
	this.lootRange=250;
	this.sprite.reset(0,0);
	this.sprite.name = 'player';
	this.sprite.rotation=0;
	this.sprite.body.angularVelocity=0;
	this.lastVelocityX = this.sprite.body.velocity.x;
	this.lastVelocityY = this.sprite.body.velocity.y;
	this.turnRate=0.5;
	this.health=8;
	this.alive=true;
	this.bulletSprite=0;
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
	this.profileDecay = 166;
	this.profileShow = false;
	this.energy=0;
	this.energyMax=12;
	this.energyRate=1000;
	this.energyAmount=2;
	this.ore=0;
	this.nextProfileDecay =0;
	this.nextEnergy = 0;
	this.nextFire = 0;
	this.altCooldown=0;
	this.sprite.visible=true;
	this.sprite.anchor.setTo(0.5, 0.5);
	this.sprite.body.maxVelocity.setTo(300,300);
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
	this.sprite.body.setRectangle(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,0,0);
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
		boom(explosions,4,this.sprite.x,this.sprite.y);
	}else{
		this.health -= damageCoef * dmg;
	}

	if (this.health <= 0){
		bigBoom(explosions,this.sprite.x,this.sprite.y);
		this.died=game.time.now+10000;
		this.alive = false;
		for (var j = 0; j < this.parts.length; j++) {

			this.parts[j].sprite.body.velocity = game.physics.velocityFromRotation(game.physics.angleBetween(this.sprite, this.parts[j].sprite), randomRange(200,400));
			this.parts[j].sprite.body.angularVelocity=randomRange((dmg+2*14),(dmg+2)*62);	
		}	

		this.sprite.kill();
		this.cullParts();	//defensive programming, in case I ever decide to do something that will kill a player sprite early :P
		nextSpawn = game.time.now+5000;
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
		this.sprite.profile+=Math.floor(this.fireDamage*80);
		if(this.sprite.profile>this.sprite.profileMax*5){
			this.sprite.profile=this.sprite.profileMax*5;
		}
		this.nextFire = game.time.now + this.fireRate;
		this.energy -= this.fireEnergy;
		this.spawnBullet();
	}


};
playerShip.prototype.spawnBullet = function(){

	var bullet = bullets.getFirstDead();
	bullet.loadTexture('bullet', this.bulletSprite);
	bullet.bulletSprite = this.bulletSprite;
	bullet.damage = this.fireDamage * targetDamageCoef;
	bullet.lifespan = this.fireRange;
	bullet.body.mass = this.fireMass;
	bullet.angularVelocity=0;
	bullet.bulletHitBehavior=this.bulletHitBehavior;
	bullet.alpha=1;
	bullet.scale.setTo(1,1);
	bullet.reset(this.sprite.x + (Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.75), this.sprite.y + (Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.75));
	bullet.rotation = this.sprite.rotation;
	bullet.owner=this.sprite;
	bullet.fireVelocity = this.fireVelocity; //mostly useless but want this to be accessible for bulletBehaviors
	game.physics.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
	bullet.body.velocity.x += 0.5 * this.sprite.body.velocity.x;
	bullet.body.velocity.y += 0.5 * this.sprite.body.velocity.y;

	for (var i = 0; i < this.bulletBehavior.length; i++) {
		this.bulletBehavior[i](bullet);
	}
	return bullet;
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

			this.nextProfileDecay=game.time.now+1000;
		}

		if (this.speed > 0){
			if(game.time.now>(this.nextThrust||0)){
				this.thrust.x=this.sprite.x-(Math.cos(this.sprite.rotation)*(this.sprite.body.width)*0.5);
				this.thrust.y=this.sprite.y-(Math.sin(this.sprite.rotation)*(this.sprite.body.width)*0.5);
				this.thrust.minParticleSpeed.setTo(0,0);
				this.thrust.maxParticleSpeed.setTo(0,0);
				this.thrust.emitParticle();
				partsToTop(this);	
				this.nextThrust = game.time.now + 15; 
			}
			addVelocity(this.sprite.rotation, this.speed, this.sprite.body.velocity);
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
var startParts = 1; //extra parts given to player at beginning!
var mouseState=[false,false,false];
var pool;
var dragPool;
var dummy;
var defaultPlayerShip = [66, 34, -1, -1];
var station; //we're going to keep this pretty much as a non-interactive sprite for now... it doesn't actually need to do anything

var lootDropRate = 0.09;
var componentDropRate = 0.09;
var backdrop1, backdrop2,backdrop3,backdrop4;
var numBaddies = 9;
var numAsteroids = 19;
var enemies;
var loots;
var sparkles;
var enemyBullets;
var explosions;
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
	this.partCost=20;
	this.currentPart = 0;
	this.texts = ['welcome to mauris.',
		'DOWN/S: dock or undock at station',
		'exchange parts when docked; LEFT/RIGHT or A/D cycle inventory.',
		'UP/W: thrust. be aware of inertia.',
		'LEFT/RIGHT or A/D: turn.',
		'LEFT MOUSE BUTTON: fire.',
		'go blow things up. bring parts back. build new ship. repeat.'
			];
	this.nextWords=0;
	this.textLine = '';
	this.textIndex = 0;
	this.textLineIndex = 0;
	this.nextError=0;

}
gameUI.prototype.startMission = function(missionId){
	this.mission = missions[missionId];
	initMission(this.mission);
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
	var choice = Math.floor(randomRange(0,4));
	if(choice==0){
		outx = minx-16;
		outy = Math.floor(randomRange(miny, maxy+16));
	}else if(choice==1){
		outy = miny-16;
		outx = Math.floor(randomRange(minx, maxx+16));
	}else if(choice==2){
		outx = maxx+16;
		outy = Math.floor(randomRange(miny, maxy+16));
	}else if(choice==3){
		outy = maxy+16;
		outx = Math.floor(randomRange(minx, maxx+16));
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

	this.partsSelector = game.add.sprite(-300,-100,'parts',0);
	this.partsSelector.visible = false;

	this.tempStation = game.add.sprite(0,0,'station');
	this.tempStation.anchor.setTo(0.5,0.5);
	this.tempStation.visible = false;
	this.partswindow = game.add.sprite(-364,-132,'partswindow');
	this.partswindow.anchor.setTo(0,0);
	this.partswindow.visible = false;
	destroyIfExists(this.creditLine);
	this.creditLine = game.add.text(200,100, '',{ font:'14px monospace', fill: 'rgb(64,255,16)', align: 'right' });
	this.creditLine.alpha = 0.75;
	destroyIfExists(this.profileLine);
	this.profileLine = game.add.text(200,100, '',{ font:'14px monospace', fill: 'rgb(255,64,16)', align: 'right' });
	this.profileLine.alpha = 0.75;
	destroyIfExists(this.healthLine);
	this.healthLine = game.add.text(200,100, '',{ font:'14px monospace', fill: 'rgb(96,96,240)', align: 'left' });
	this.healthLine.alpha = 0.75;

	destroyIfExists(this.energyLine);
	this.energyLine = game.add.text(200,100, '',{ font:'14px monospace', fill: 'rgb(240,64,255)', align: 'left' });
	this.energyLine.alpha = 0.75;
	destroyIfExists(this.statsLine);
	this.statsLine = game.add.text(200,100, '',{ font:'1em monospace', fill: 'rgb(240,240,240)', align: 'left' });
	this.statsLine.alpha=0.75;
	destroyIfExists(this.graphics);
	this.graphics = game.add.graphics(0,0);

	destroyIfExists(this.words);
	this.words = game.add.text(0,0,'',{font:'1.5em monospace', fill: 'rgb(255,255,255)', align: 'left'});

	destroyIfExists(this.partText);
	this.partText = game.add.text(-200,150,'',{font:'1.5em monospace', fill: 'rgb(255,255,255)', align: 'left'});
	destroyIfExists(this.partFlavorText);
	this.partFlavorText = game.add.text(-180,180,'',{font:'1.1em monospace', fill: 'rgb(255,255,255)', align: 'left'});

	this.radar = [];
	this.resetRadar();

	this.stationRadar = game.add.text(200,100,'*',{font:'30px monospace', fill: 'rgb(130,255,130)', align: 'center'});
}
gameUI.prototype.bar = function (targetText, offset, numerator, denominator) {
	targetText.x = player.sprite.body.x+(player.sprite.body.width/2);
	targetText.y = player.sprite.body.y+player.sprite.body.height+30+offset;
	var barSize=Math.floor(denominator/2);	
	var s = '';
	var n=Math.floor(numerator/2);
	if(n<0){n=0;}
	s+=repeat('\u25cf',n);
	s+=repeat('\u25cb',barSize-n);
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
gameUI.prototype.stationRadarPing = function() {
	var s='';
	var targetAngle=game.physics.angleBetween(player.sprite, station);
	var targetDistance=game.physics.distanceBetween(player.sprite, station);
	var s='\u2302'; //I cannot believe this circle renders in my terminal
	var n=Math.floor(255-(targetDistance/2-900));
	if(n<0){n=0;}if(n>255){n=255};
	this.stationRadar.style.fill="rgb(192,"+n+",192)";
	if (targetDistance < 2000 && game.time.now % 250 < 50)  {
		this.stationRadar.style.fill="rgb(0,255,0)";

	}

	if (targetDistance < 300){
		s='';
	}
	this.stationRadar.setText(s);
	this.stationRadar.x = player.sprite.body.x + Math.cos(targetAngle) * 240 - 0.5 * this.stationRadar.width;
	this.stationRadar.y = player.sprite.body.y + Math.sin(targetAngle) * 240;	
}
gameUI.prototype.radarPing = function() {
	var s='';
	this.resetRadar();
	for(var i=0;i<this.radar.length;i++){
		var targetAngle=game.physics.angleBetween(player.sprite, this.enemies[i].sprite);
		var targetDistance=game.physics.distanceBetween(player.sprite, this.enemies[i].sprite);
		var s='●'; //I cannot believe this circle renders in my terminal
		var n=Math.floor(255-(targetDistance/2-900));
		var blinkDistance = 1000;

		if(player.profileShow){
			this.blinkDistance=player.sprite.profile*2.1;
		}

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

		if (targetDistance < 0.5 * blinkDistance && game.time.now % 250 > 125){
			s='['+s+']';
			this.radar[i].style.fill="rgb(255,0,0)";
		}
		else if (targetDistance < blinkDistance && targetDistance >= 0.5 * blinkDistance && game.time.now % 1000 > 500)  {
			s='['+s+']';
			this.radar[i].style.fill="rgb(255,0,0)";
		} else {
			s=' '+s+' ';
		}

		var range = targetDistance;
		if(range>180){range=180};	
		this.radar[i].setText(s);
		this.radar[i].alpha=range/280;
		this.radar[i].x = player.sprite.body.x + Math.cos(targetAngle) * range - 0.5 * this.radar[i].width;
		this.radar[i].y = player.sprite.body.y + Math.sin(targetAngle) * range;	
	}
}
gameUI.prototype.wordsPing = function() {
	this.words.x = player.sprite.body.x - 200;
	this.words.y = player.sprite.body.y + 200;
	if(gamemode=='?build'){
		this.words.y+=50;
	}
	if (game.time.now > this.nextWords && this.textIndex < this.texts.length){
		this.words.alpha=1;
		this.textLine = this.texts[this.textIndex].substr(0, this.textLineIndex++);
		this.words.setText(this.textLine);
		if(this.textLineIndex>this.texts[this.textIndex].length){
			this.nextWords=game.time.now+5000;
			this.textIndex+=1;
			this.textLineIndex=0;
		}else{
			this.nextWords=game.time.now+20;
		}
	} else if (game.time.now > this.nextWords) {
		this.words.alpha-=0.02;
	}
	if(this.textLine.length>0 && game.time.now % 200 > 100){
		this.words.setText(this.textLine + '_');
	}else{
		this.words.setText(this.textLine);
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
gameUI.prototype.creditLinePing = function() {

	var targetDistance=game.physics.distanceBetween(player.sprite, station);
	if(targetDistance>1000){
		this.creditLine.setText('O' + player.ore);
	}else{
		this.creditLine.setText('$' + playerStats.credits + '  O' + player.ore);
	}
	this.creditLine.x = player.sprite.body.x-this.creditLine.width;
	this.creditLine.y = player.sprite.body.height+player.sprite.body.y+35;
	if(gamemode=='?build'){
		this.creditLine.y+=200;
	}
}
gameUI.prototype.update = function() {
	this.creditLinePing();
	this.wordsPing();
	if (gamemode == 'war'){
		this.profileLinePing();
		this.bar(this.healthLine, 0, player.health, player.healthMax);
		this.bar(this.energyLine, 10, player.energy, player.energyMax);
		this.enemies=enemies.slice(0);
		this.enemies.sort(threatSort);
		this.asteroids=enemies.slice(0);
		this.asteroids.sort(asteroidSort);
		this.radarPing();
		this.stationRadarPing();
		//this.statsPing(player);
	}
}

gameUI.prototype.updatePart = function () {
	this.partsSelector.visible=true;
	this.partsSelector.bringToTop();
	if(playerStats.inventory.length){
		this.partsSelector.loadTexture('parts',playerStats.inventory[this.currentPart]);
		this.partText.setText(components[playerStats.inventory[this.currentPart]].name);
		this.partFlavorText.setText(components[playerStats.inventory[this.currentPart]].flavor);
	}else{
		this.partsSelector.loadTexture('parts',0)
			this.partText.setText('Drag a component to the X to store it in your inventory.')
			this.partFlavorText.setText('Press UP to buy a component for $' + ui.partCost);
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
	if(playerStats.credits >= ui.partCost) {
		playerStats.credits-=ui.partCost;
		var n=0;
		while(n==0){
			var q;
			q = Math.floor(Math.random()*components.length);
			if(components[q].drops){
				n=q;
				playerStats.inventory.push(q);
				this.currentPart=playerStats.inventory.length-1;
			}
		}
	}
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
	playerStats.credits+=player.ore; //ore is reset with the new ship 
	player.ore=0;
	player.sprite.reset(0,0);
	player.sprite.rotation=0;
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
	this.stationRadar.visible=false;
	this.clearRadar();
	this.updatePart();
	this.tempStation.visible=true;
	this.tempStation.bringToTop();
	this.partswindow.visible=true;
	this.partswindow.bringToTop();
	this.partsSelector.bringToTop();
	this.partsSelector.scale.setTo(4,4);
	this.partsSelector.inputEnabled = true;
	this.partsSelector.events.onInputDown.add(selectPart);
	if(typeof(ship)!='undefined'){
		this.parts = createBuildParts(ship,player.sprite.x,player.sprite.y);
	}
	ui.partsArray();
}
gameUI.prototype.destroyParts = function() {
	if(typeof(this.parts)!='undefined'){
		for(var i=0; i<this.parts.length;i++)
		{
			this.parts[i].dispose();
		}
		this.parts=[];
	}
}
gameUI.prototype.endPartsUI = function () {
	this.partswindow.visible = false;
	this.tempStation.visible = false;
	this.partsSelector.visible=false;
	var ship = this.partsArray();
	this.destroyParts();
	this.parts=[];
	this.graphics.clear();
	this.stationRadar.visible=true;
	this.partText.setText('');
	this.partFlavorText.setText('');
	player.initPlayerShip(ship);
	gamemode = 'war';
}
gameUI.prototype.partsArray = function () {
	this.graphics.clear();
	this.graphics.destroy();
	this.graphics = game.add.graphics(0,0);
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
		//this.graphics.drawRect(minx,miny,16+maxx-minx,16+maxy-miny);
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


function initMission (mission) {

}

function create () {

	game.stage.scale.setMaximum();
	game.stage.scaleMode=2;
	ui = new gameUI();
	gamemode = location.search||'war';
	if (gamemode == '?cheat'){
		gamemode = 'war';
		cheatmode = 1;
	}
	if (gamemode == 'war'){
		game.world.setBounds(-100000, -100000, 200000, 200000);
		backdrop1 = game.add.tileSprite(0, 0, resolutionX, resolutionY, 'starfield2');

		backdrop1.fixedToCamera = true;
		backdrop1.scale.x=2;
		backdrop1.scale.y=2;	


		backdrop2 = game.add.tileSprite(0, 0, resolutionX, resolutionY, 'starfield3');
		backdrop2.fixedToCamera = true;
		backdrop2.alpha=0.5;
		backdrop2.scale.x=4;
		backdrop2.scale.y=4;	

		backdrop3 = game.add.tileSprite(0, 0, resolutionX, resolutionY, 'starfield4');
		backdrop3.fixedToCamera = true;

		backdrop4 = game.add.tileSprite(0, 0, resolutionX*1.5, resolutionY*1.5, 'starfield4');
		backdrop4.fixedToCamera = true;
		backdrop4.scale.x=0.75;
		backdrop4.scale.y=0.75;

		station = game.add.sprite(0,0,'station');
		station.anchor.setTo(0.5,0.5)
			asteroids.sort(lengthSort);

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
		enemyBullets.setAll('anchor.x', 0.5);
		enemyBullets.setAll('anchor.y', 0.5);
		enemyBullets.setAll('lifespan',5000)
			enemyBullets.setAll('body.immovable', 1);
		enemyBullets.setAll('outOfBoundsKill', true);


		explosions = game.add.group();
		explosions.createMultiple(100, 'explosions');
		explosions.setAll('anchor.x', 0.5);
		explosions.setAll('anchor.y', 0.5);
		explosions.setAll('lifespan',5000);


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

		sparkles = game.add.emitter(0,0,100);
		sparkles.makeParticles('sparkles',[0,1,2,3,4,5,6,7]);
		sparkles.setAll('alpha',0.8);
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
		right2: game.input.keyboard.addKey(Phaser.Keyboard.D)
	}

	game.input.mouse.mouseUpCallback=mouseUpHandle;

	game.input.mouse.mouseDownCallback=mouseDownHandle;


	ui.initCombatUi();

	for(var i=0;i<startParts;i++)
	{
		playerStats.credits+=ui.partCost;
		ui.buyPart();
	}
}
function explosionAnimate(s) {
	s.alpha*=0.85;
	s.scale.setTo(s.scale.x+.2,s.scale.y+.2);
}


function fadeSpark(s) {
	s.alpha-=0.03;
	s.scale.setTo(s.scale.x*1.03,s.scale.y*1.03);
	if(s.lifespan>175 && s.lifespan < 201){
		s.scale.setTo(1,1);
		s.alpha=0.8;
	}
}
function fade(s) {
	s.alpha-=0.03;
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
		if(Math.random() > 0.1){
			var halfWidth = s.width * 0.5;
			sparkles.x=s.x+randomRange(-1 * halfWidth,halfWidth);
			sparkles.y=s.y+randomRange(-1 * halfWidth,halfWidth);
			sparkles.minParticleSpeed.setTo(0,0);
			sparkles.maxParticleSpeed.setTo(0,0);
			sparkles.emitParticle();
		}
		if(game.physics.distanceBetween(s, player.sprite) < player.lootRange){
			var targetAngle = game.physics.angleBetween(s, player.sprite); 
			var tempx, tempy;
			tempx = s.body.velocity.x;
			tempy = s.body.velocity.y;
			game.physics.velocityFromRotation(targetAngle, 500, s.body.velocity);
			s.body.velocity.x+=tempx*s.averageCounter;
			s.body.velocity.x/=s.averageCounter+1;
			s.body.velocity.y+=tempy*s.averageCounter;
			s.body.velocity.y/=s.averageCounter+1;
			if(s.averageCounter){s.averageCounter--};
		}
	}
}
function update () {
	if(gamemode=='?build'){

		for (var i = 0; i < ui.parts.length; i++){
			ui.parts[i].update();
		}
	}
	if(gamemode=='war' ){


		if(nextSpawn<game.time.now||nextSpawn==0){
			if(!player.alive){
				player.initPlayerShip(defaultPlayerShip);
			}
			for(var c = 0; c < enemies.length ; c++) {
				if (enemies[c].alive==false && game.time.now > enemies[c].died){
					enemies[c].initEnemyShip();
					break;
				};
			}
			nextSpawn=game.time.now+randomRange(100,200);
		}	


		if(loots.getFirstAlive() != null) {

			for (var i = 0; i < player.parts.length; i++) {
				game.physics.overlap(loots, player.parts[i].sprite, playerGotLoot, null, this);
			}
			loots.forEachAlive(pullLootToPlayer, this);
		}
		if(explosions.getFirstAlive() != null) {

			explosions.forEachAlive(explosionAnimate, this);
		};
		if(enemyBullets.getFirstAlive() != null) {

			for (var i = 0; i < player.parts.length; i++) {
				game.physics.overlap(enemyBullets, player.parts[i].sprite, bulletHitPlayer, null, this);
			}
			for (var i = 0; i < enemies.length; i++) {
				game.physics.overlap(enemyBullets, enemies[i].sprite, bulletHitEnemy, null, this);
			}
		}

		for (var i = 0; i < enemies.length; i++){
			if (enemies[i].alive){
				enemies[i].update();
				for (var j = 0; j < player.parts.length; j++) {
					game.physics.overlap(enemies[i].sprite, player.parts[j].sprite);
				}
				game.physics.overlap(bullets, enemies[i].sprite, bulletHitEnemy, null, this);
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
		if (cursors.down.isDown || cursors.down2.isDown){
			//player at station
			if(game.time.now > nextUIDelay + 2000 && Math.abs(player.sprite.x)<100 &&
					Math.abs(player.sprite.y)<100){
						ui.partsUI(player.ship);
						nextUIDelay=game.time.now+1000;
					}
		}
		if(player.alive && mouseState[2]){
			player.alt();
		}
		player.update();
		// scrolling
		backdrop1.tilePosition.x = -0.03*game.camera.x;
		backdrop1.tilePosition.y = -0.03*game.camera.y;
		backdrop2.tilePosition.x = -0.08*game.camera.x;
		backdrop2.tilePosition.y = -0.08*game.camera.y;
		backdrop3.tilePosition.x = -0.15*game.camera.x;
		backdrop3.tilePosition.y = -0.15*game.camera.y;
		backdrop4.tilePosition.x = -0.40*game.camera.x;
		backdrop4.tilePosition.y = -0.40*game.camera.y;



		if (mouseState[0]){
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
			ui.buyPart();
			ui.updatePart();
			nextUIDelay = game.time.now+1000;
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

function hugeBoom(explosionsGroup, x, y){

	if(onscreen(x,y)){
		var r = Math.random();

		for(var i=0; i < 10 + (r * 9) ; i ++) { 
			if(explosions.countDead()){
				var explosion = explosionsGroup.getFirstDead();
				explosion.loadTexture('explosions', Math.random()>0.7 ? 1 : 2);
				explosion.reset(x+randomRange(-80,80),y+randomRange(-80,80));
				explosion.rotation = Math.random()*Math.PI*2;
				explosion.angularVelocity=randomRange(-200,200);
				explosion.fireVelocity=randomRange(600,890);
				explosion.lifespan=1200;
				explosion.linearDamping=-1;
				r=randomRange(4,11);
				explosion.scale.setTo(r,r);
				explosion.alpha=1;
				game.physics.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
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
				explosion.loadTexture('explosions', Math.random()>0.7 ? 1 : 2);
				explosion.reset(x+randomRange(-20,20),y+randomRange(-20,20));
				explosion.rotation = Math.random()*Math.PI;
				explosion.angularVelocity=randomRange(-150,150);
				explosion.fireVelocity=randomRange(30,80);
				explosion.lifespan=700;
				explosion.linearDamping=-1;
				r=randomRange(0.4,1.9);
				explosion.scale.setTo(r,r);
				explosion.alpha=1;
				game.physics.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
			}
		}
	}
}
function shieldEffect(explosionsGroup, bulletSprite, x, y, velx, vely){

	var r = Math.random();

	if(explosions.countDead()){
		var explosion = explosionsGroup.getFirstDead();
		explosion.loadTexture('explosions', bulletSprite || 0);
		explosion.reset(x,y);
		explosion.rotation=Math.random()*Math.PI;
		explosion.angularVelocity=200;
		explosion.fireVelocity=randomRange(-10,10);
		explosion.lifespan=700;
		r=randomRange(2,4);
		explosion.scale.setTo(r,r);
		explosion.alpha=1;
		explosion.body.velocity.x=velx;
		explosion.body.velocity.y=vely;
	}
}
function boom(explosionsGroup, bulletSprite, x, y){

	if(onscreen(x,y)){

		var r = Math.random();

		for(var i=0; i < 3 + (r * 6) ; i ++) { 
			if(explosions.countDead()){
				var explosion = explosionsGroup.getFirstDead();
				explosion.loadTexture('explosions', bulletSprite || 0);
				explosion.reset(x+randomRange(-8,8),y+randomRange(-8,8));
				explosion.rotation = Math.random()*Math.PI;
				explosion.angularVelocity=randomRange(-150,150);
				explosion.linearDamping=-1;
				explosion.fireVelocity=randomRange(-10,10);
				explosion.lifespan=700;
				r=randomRange(0.1,0.5);
				explosion.scale.setTo(r,r);
				explosion.alpha=1;
				game.physics.velocityFromRotation(explosion.rotation, explosion.fireVelocity, explosion.body.velocity);
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
		loot.rotation = Math.random()*Math.PI;
		var scale = randomRange(0.5,1.1);
		loot.scale.setTo(scale,scale);
		loot.averageCounter=50;
		loot.acceleration=200;
		loot.lootType='ore';
		loot.acceleration=0;
		game.physics.velocityFromRotation(loot.rotation, randomRange(100,300), loot.body.velocity);
	}
}
function spawnComponent(component,x,y){
	if(loots.countDead()){
		var loot = loots.getFirstDead();
		loot.loadTexture('parts', component);
		loot.lifespan = 120000;
		loot.scale.setTo(2,2);
		loot.reset(x + randomRange(-16,16), y+randomRange(-16,16));
		loot.rotation = 0; 
		loot.averageCounter=50;
		loot.acceleration=200;
		loot.lootType='component';
		loot.component = component;
		loot.acceleration=0;
		game.physics.velocityFromRotation(loot.rotation, randomRange(100,300), loot.body.velocity);

	}
}
function playerGotLoot (sprite, loot) {
	if(loot.lootType=='ore'){
		player.ore+=1;
	}else if(loot.lootType=='component'){
		playerStats.inventory.push(loot.component);
		ui.texts.push('got ' + components[loot.component].name);
	}
	loot.kill();
}
function bulletHitPlayer (sprite, bullet) {

	boom(explosions, bullet.bulletSprite, bullet.x, bullet.y);

	for (var i = 0; i < bullet.bulletHitBehavior.length; i++) {
		bullet.bulletHitBehavior[i](sprite, bullet);
	}

	var destroyed = player.damage(bullet.damage, bullet.owner);
	if (destroyed){
		sparkExplosion(pew, sprite);	
	}
	bullet.kill();
}

function bulletHitEnemy (sprite, bullet) {

	if(bullet.owner!=sprite){
		boom(explosions, bullet.bulletSprite, bullet.x, bullet.y);

		for (var i = 0; i < bullet.bulletHitBehavior.length; i++) {
			bullet.bulletHitBehavior[i](sprite, bullet);
		}
		var destroyed = enemies[sprite.name].damage(bullet.damage, bullet.owner, bullet.body.velocity);
		if (destroyed && enemies[sprite.name].ai!=3){
			sparkExplosion(pew, sprite);	
		}

		bullet.kill();
	}
}



function render () {

}

