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
//////
//
//	There is so much wrong in this.
//		But it's such a pleasure
//			just to hack this out
//				and not worry about it.
//
//////
dragPart = function(x,y,sheet,index)
{
	this.game = game;
	this.alive = true;
	this.actor = game.add.sprite(x-x%16,y-y%16,sheet,index);
	this.index = index;
	this.actor.inputEnabled=true;
	this.actor.input.enableDrag(true,true);
	this.actor.input.snapOnRelease=true;
	this.actor.input.snapX=16;
	this.actor.input.snapY=16;
};
dragPart.prototype.update = function(){
	if(this.actor.x > 900) {
		this.actor.kill()
	}	
}
shipPart = function(x,y,sheet,index,targetSprite)
{
	this.offsetx = x;
	this.offsety = y;
	this.game = game;
	this.player = targetSprite;
	this.alive = true;
	this.actor = game.add.sprite(x,y,sheet,index);
	this.actor.anchor.setTo(0.5,0.5);
	this.actor.bringToTop();
	this.actor.body.exchangeVelocity=false;
};
shipPart.prototype.update = function(){
	if (this.player.alive) {
		this.actor.angle = this.player.angle;
		this.actor.x = this.player.x + (this.offsetx * Math.cos(game.math.degToRad(this.player.angle)));
		this.actor.y = this.player.y + (this.offsety * Math.cos(game.math.degToRad(this.player.angle)));
		this.actor.x -= (this.offsety * Math.sin(game.math.degToRad(this.player.angle)));
		this.actor.y += (this.offsetx * Math.sin(game.math.degToRad(this.player.angle)));
		this.actor.body.velocity = this.player.body.velocity;
	}
};

enemyShip = function (index, game, targetSprite, bullets) {

	var x = targetSprite.x + (eo3.randomSign() * eo3.randomRange(400,1000));
	var y = targetSprite.y + (eo3.randomSign() * eo3.randomRange(400,1000));

	this.game = game;
	this.actor = game.add.sprite(x, y, 'parts', 0);
	this.player = targetSprite;
	this.bullets = bullets;
	this.actor.name = index;
	this.thrust = game.add.emitter(0,0,20);
	this.thrust.makeParticles('sparks',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.thrust.gravity=0;
	this.initEnemyShip();


};

enemyShip.prototype.initEnemyShip = function() {

	this.ship = ships[Math.floor(eo3.randomRange(0,ships.length)*Math.random())];
	this.actor.profile = 1000;
	this.health = 3;
	this.bulletBehavior=[];
	this.ai = 0;
	this.fireRate = 300;
	this.fireVelocity = 400;
	this.fireDamage = 2;
	this.fireRange = 1000;
	this.fireMass = 0.1;
	this.fireEnergy = 2;

	this.energy=10;
	this.energyMax=10;
	this.energyRate=1000;
	this.energyAmount=2;


	this.nextEnergy = 0;
	this.nextFire = 0;
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
	//apply bonuses!
	for(var i=0;i<this.ship.length;i++)
	{
		if (this.ship[i]!=-1){
			try{
			components[this.ship[i]].bonus(this);
			}
			catch(e){
				console.log(e.message); //FIXME remove one day
			}
			this.mass+=10000;
			this.actor.body.maxVelocity.x-=10;
			this.actor.body.maxVelocity.y-=10;
		}
	}
	this.actor.body.velocity.x*=.3+Math.random()*0.7;
	this.actor.body.velocity.y*=.3+Math.random()*0.7;
	game.physics.velocityFromRotation(this.actor.rotation, 100, this.actor.body.velocity);
	this.fireDamage *= damageCoef;
	this.health*=enemyHealthCoef;
	this.healthMax = this.health; //FIXME
}

enemyShip.prototype.damage = function(dmg) {

	this.health -= dmg;

	if (this.health <= 0)
	{
		this.alive = false;
		for (var j = 0; j < this.parts.length; j++) {

			if (dmg != 31337){
				this.parts[j].actor.lifespan = eo3.randomRange(500,2500);
				this.parts[j].actor.body.velocity = game.physics.velocityFromRotation(this.game.physics.angleBetween(this.actor, this.parts[j].actor), eo3.randomRange(200,400));
				this.parts[j].actor.body.angularVelocity=eo3.randomRange(dmg*16,dmg*64);	
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
enemyShip.prototype.update = function() {


	if(this.alive && this.player.alive){

		if(this.ai==0){
		this.actor.rotation = this.game.physics.angleBetween(this.actor, this.player);

		if (this.game.physics.distanceBetween(this.actor, this.player) < this.fireRange * 0.75 &&
				this.game.physics.distanceBetween(this.actor, this.player) < this.player.profile)
		{
			if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0 &&
					this.energy>=this.fireEnergy)
			{
				this.nextFire = this.game.time.now + this.fireRate;
				this.energy-=this.fireEnergy;
				var bullet = this.bullets.getFirstDead();
				bullet.damage=this.fireDamage;
				bullet.reset(this.actor.x, this.actor.y);
				bullet.rotation = this.game.physics.moveToObject(bullet, this.player, 500);
				bullet.lifespan = this.fireRange; 
				bullet.loadTexture('bullet', this.bulletSprite);
				bullet.body.exchangeVelocity = false;
				bullet.fireVelocity=this.fireVelocity;
				for (var i = 0; i < this.bulletBehavior.length; i++) {
				this.bulletBehavior[i](bullet);
				}
			}
		}
		} else if (this.ai == 1) {

		}


		if (this.speed > 0)
		{
			if(game.time.now>(this.nextThrust||0))
			{
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
		if (this.game.physics.distanceBetween(this.actor, this.player) > 2000)
		{
			this.damage(31337); //magic damage value that kills without parts 
		}
		if (game.time.now > this.nextEnergy)
		{
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
var resolutionX=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var resolutionY=Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-66;
var game = new Phaser.Game(resolutionX, resolutionY, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

	game.load.image('allparts', 'assets/parts.png');
	game.load.spritesheet('parts', 'assets/parts.png', 16, 16);
	game.load.spritesheet('bullet', 'assets/bullets.png',16,16);
	game.load.image('starfield2', 'assets/starfield2.png');
	game.load.image('starfield3', 'assets/starfield3.png');
	game.load.image('starfield4', 'assets/starfield4.png');
	game.load.spritesheet('sparks', 'assets/sparks.png',8,8);
}

var luser = function() {
	this.actor = game.add.sprite(0, 0, 'parts');
	this.initLuser();
}
luser.prototype.initLuser = function () {

	this.acceleration=1;
	this.actor.reset(0,0);
	this.turnRate=0.5;
	this.health=8;
	this.alive=true;
	this.bulletSprite=0;
	this.bulletBehavior=[];
	this.parts=[];
	this.speed = 0; //current
	this.fireRate = 300;
	this.fireVelocity = 400;
	this.fireDamage = 2;
	this.fireRange = 1000;
	this.fireMass = 0.1;
	this.fireEnergy = 2;
	this.energy=10;
	this.energyMax=10;
	this.energyRate=1000;
	this.energyAmount=2;


	this.nextEnergy = 0;
	this.nextFire = 0;

	this.actor.visible=true;
	this.actor.anchor.setTo(0.5, 0.5);
	this.actor.body.maxVelocity.setTo(300,300);
	this.actor.profile=1300;	//max range at which opponents will attack
	this.thrust = game.add.emitter(0,0,200);
	this.thrust.makeParticles('sparks',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.thrust.gravity=0;


	this.actor.body.drag.setTo(0, 0);
	this.actor.body.bounce.setTo(0, 0);
	this.actor.body.collideWorldBounds = true; 

	this.ship = ships[Math.floor(eo3.randomRange(0,ships.length))];

	this.parts = createShip(this.ship, this.actor); //TODO not do this

	this.actor.body.setSize(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,0,0);

	//apply bonuses!
	for(var i=0;i<this.ship.length;i++)
	{
		if (this.ship[i]!=-1){
			components[this.ship[i]].bonus(this);
			this.mass+=10000;
			this.actor.body.maxVelocity.x-=10;
			this.actor.body.maxVelocity.y-=10;
		}
	}	

	this.fireDamage *= damageCoef;
	this.healthMax = this.health;
}
luser.prototype.damage = function(dmg) {

	this.health -= dmg;

	if (this.health <= 0)
	{
		this.alive = false;
		for (var j = 0; j < this.parts.length; j++) {

			if (dmg != 31337){
				this.parts[j].actor.lifespan = eo3.randomRange(500,2500);
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

luser.prototype.left = function(){
	this.actor.angle-=this.turnRate;
};
luser.prototype.right = function(){
	this.actor.angle+=this.turnRate;
};
luser.prototype.up = function(){

	this.speed = this.acceleration;

};
luser.prototype.fire = function(){


	if (game.time.now > this.nextFire && bullets.countDead() > 0 && this.energy > this.fireEnergy && this.alive)
	{
		this.nextFire = game.time.now + this.fireRate;
		this.energy -= this.fireEnergy;
		var bullet = bullets.getFirstDead();
		bullet.loadTexture('bullet', this.bulletSprite);
		bullet.damage = this.fireDamage;
		bullet.lifespan = this.fireRange;
		bullet.body.mass = this.fireMass;
		bullet.reset(this.actor.x + (Math.cos(this.actor.rotation)*(this.actor.body.width)*0.75), this.actor.y + (Math.sin(this.actor.rotation)*(this.actor.body.width)*0.75));
		bullet.rotation = this.actor.rotation;
		bullet.body.exchangeVelocity = false;
		bullet.fireVelocity = this.fireVelocity; //mostly useless but want this to be accessible for bulletBehaviors
		game.physics.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
						
		for (var i = 0; i < this.bulletBehavior.length; i++) {
				this.bulletBehavior[i](bullet);
				}

	}


};
luser.prototype.alt = function(){};
luser.prototype.update = function(){
	if(this.alive){
		if (this.speed > 0)
		{
			if(game.time.now>(this.nextThrust||0))
			{
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

		if (game.time.now > this.nextEnergy)
		{
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
var numBaddies = 10;
var enemies;
var enemyBullets;
var logo;
var nextSpawn=0;
var damageCoef=0.3; //global damage tuner
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

}
gameUI.prototype.partsUI = function () {
	this.partsSelector = game.add.sprite('0','0','allparts');
	this.partsSelector.inputEnabled = true;
	this.partsSelector.pixelPerfect=true; //prevent grabbing empty squares
	this.partsSelector.events.onInputDown.add(createPart);
}
gameUI.prototype.partsArray = function () {
	if(typeof(this.parts[0])!='undefined'){
	var minx = this.parts[0].actor.x;
	var miny = this.parts[0].actor.y;
	var maxx = this.parts[0].actor.x;
	var maxy = this.parts[0].actor.y;
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

	if (16+maxx-minx > 16+maxy-miny) {
		shipSize = (16+maxx-minx)/16;
	} else {
		shipSize = (16+maxy-miny)/16;
	}
	var outArray = [];
	for (var i=0;i<shipSize*shipSize;i++){
		outArray.push(-1);
	}
	for (var i=0;i<this.parts.length;i++){
		if(this.parts[i].actor.alive){
			var n=0;
			n = (this.parts[i].actor.x - minx)/16;
			n+= ((this.parts[i].actor.y - miny)/16)*shipSize;
			outArray[n] = this.parts[i].index;
		}
	}
	return outArray;
	}
}
function createPart() {
	if(ui.partsSelector.input.pointerOver())
	{
		var n =0;
		n=Math.floor(ui.partsSelector.input.pointerX()/16);
		n+=32*Math.floor(ui.partsSelector.input.pointerY()/16);
		console.log(n);
		if(typeof(components[n])!='undefined'){
		ui.parts.push(new dragPart(eo3.randomRange(400,600),eo3.randomRange(400,600),'parts',n));
		}
	}
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
		i}
	return myParts; 
}


function create () {

	ui = new gameUI();
	gamemode = location.search||'war';

	if (gamemode == '?build')
	{
		ui.partsUI();
	}
	if (gamemode == 'war')
	{

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
		player = new luser();

		//  The enemies bullet group
		enemyBullets = game.add.group();
		enemyBullets.createMultiple(200, 'bullet');
		enemyBullets.setAll('anchor.x', 0.5);
		enemyBullets.setAll('anchor.y', 0.5);
		enemyBullets.setAll('lifespan',5000)
			enemyBullets.setAll('body.immovable', 1);
		enemyBullets.setAll('outOfBoundsKill', true);

		//  Create some baddies to waste :)
		enemies = [];

		for (var i = 0; i < numBaddies; i++)
		{
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

	cursors = game.input.keyboard.createCursorKeys();
}

function update () {
	if(gamemode=='?build')
	{
		if (cursors.left.isDown)
		{
			console.log(ui.partsArray());
		}


		for (var i = 0; i < ui.parts.length; i++)
		{
			ui.parts[i].update();
		}
	}
	if(gamemode=='war'){


		if(nextSpawn<game.time.now||nextSpawn==0)
		{
			if(!player.alive){
				player.initLuser();
			}
			for(var i = 0; i < enemies.length ; i++) {
				if (enemies[i].alive==false){
					enemies[i] = new enemyShip(i, game, player.actor, enemyBullets,pew);
				};
			}
			nextSpawn=game.time.now+eo3.randomRange(5000,10000);
		}	

		game.debug.renderText(Math.sin(game.math.degToRad(player.actor.angle)) + ';' + Math.cos(game.math.degToRad(player.actor.angle)),100,100);
		if(enemyBullets.getFirstAlive() != null) {

			for (var i = 0; i < player.parts.length; i++) {
				game.physics.collide(enemyBullets, player.parts[i].actor, bulletHitPlayer, null, this);
			}
		}

		for (var i = 0; i < enemies.length; i++)
		{
			if (enemies[i].alive)
			{
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

		for (var i = 0; i < player.parts.length; i++)
		{
			player.parts[i].update();
		};


		if (cursors.left.isDown)
		{
			player.left();
		}
		else if (cursors.right.isDown)
		{
			player.right()
		}



		if (cursors.up.isDown)
		{
			player.up();
		}
		player.update();
		// scrolling
		backdrop1.tilePosition.x = -0.25*game.camera.x;
		backdrop1.tilePosition.y = -0.25*game.camera.y;
		backdrop2.tilePosition.x = -0.40*game.camera.x;
		backdrop2.tilePosition.y = -0.40*game.camera.y;
		backdrop3.tilePosition.x = -0.6*game.camera.x;
		backdrop3.tilePosition.y = -0.6*game.camera.y;




		if (game.input.activePointer.isDown)
		{
			//  Boom!
			player.fire();
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

	var destroyed = player.damage(bullet.damage);
	if (destroyed)
	{
		sparkExplosion(pew, actor);	
	}
}

function bulletHitEnemy (actor, bullet) {

	bullet.kill();

	var destroyed = enemies[actor.name].damage(bullet.damage);
	if (destroyed)
	{
		sparkExplosion(pew, actor);	
	}

}



function render () {

}

