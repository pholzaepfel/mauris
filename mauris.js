eo3 = {};
eo3.addVelocity = function (a,b,c){return"undefined"==typeof b&&(b=60),	c=c||new d.Point,c.setTo(c.x+Math.cos(a)*b,c.y+Math.sin(a)*b)};
eo3.randomRange = function(a,b){var c,d; if(a>b){c=a;d=b;}else{d=a;c=b};return (Math.random()*(c-d))+d};
eo3.addVelocityTest = function (a,b,c){return '' +  c.x + ' - ' + Math.cos((game.math.degToRad(a))*b) + ' : ' + c.y+' - '+(Math.sin(game.math.degToRad(a))*b)};

// ----8<----- my shitty additions are above

dragPart = function(x,y,sheet,index)
{
	this.game = game;
	this.alive = true;
	this.actor = game.add.sprite(x,y,sheet,index);
	this.actor.inputEnabled=true;
	this.actor.input.enableDrag(false,true);
};
dragPart.prototype.update = function(){
	this.actor.x -= this.actor.x % 16;
	this.actor.y -= this.actor.y % 16;
};

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
};
shipPart.prototype.update = function(){
	this.actor.angle = this.player.angle;
	this.actor.x = this.player.x + (this.offsetx * Math.cos(game.math.degToRad(this.player.angle)));
	this.actor.y = this.player.y + (this.offsety * Math.cos(game.math.degToRad(this.player.angle)));
	this.actor.x -= (this.offsety * Math.sin(game.math.degToRad(this.player.angle)));
	this.actor.y += (this.offsetx * Math.sin(game.math.degToRad(this.player.angle)));
	this.actor.body.velocity = this.player.body.velocity;
};

enemyShip = function (index, game, targetSprite, bullets) {

	var x = targetSprite.x + eo3.randomRange(-500,500);
	var y = targetSprite.y + eo3.randomRange(-500,500);

	this.game = game;
	this.health = 3;
	this.player = targetSprite;
	this.bullets = bullets;
	this.fireRate = 1000;
	this.nextFire = 0;
	this.alive = true;
	this.parts = [];
	this.actor = game.add.sprite(x, y, 'parts', 0);
	this.actor.visible = true;
	this.actor.anchor.setTo(0.5, 0.5);

	var newShip = ships[Math.floor(eo3.randomRange(0,ships.length))];

	this.actor.body.setSize(Math.sqrt(newShip.length)*16,Math.sqrt(newShip.length)*16,0,0);

	this.parts = createShip(newShip,this.actor);

	this.actor.name = index.toString(); 
	//	this.actor.body.immovable = true;
	this.actor.body.collideWorldBounds = true;
	this.actor.body.bounce.setTo(1, 1);
	this.actor.angle = game.rnd.angle();

	game.physics.velocityFromRotation(this.actor.rotation, 100, this.actor.body.velocity);

};

enemyShip.prototype.damage = function(dmg) {

	this.health -= dmg;

	if (this.health <= 0)
	{
		this.alive = false;
		for (var j = 0; j < this.parts.length; j++) {

			this.parts[j].actor.kill();

		}	


		this.actor.kill();

		return true;
	}

	return false;

}

enemyShip.prototype.update = function() {


	this.actor.rotation = this.game.physics.angleBetween(this.actor, this.player);

	if (this.game.physics.distanceBetween(this.actor, this.player) < 300)
	{
		if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
		{
			this.nextFire = this.game.time.now + this.fireRate;

			var bullet = this.bullets.getFirstDead();

			bullet.reset(this.actor.x, this.actor.y);
			bullet.rotation = this.game.physics.moveToObject(bullet, this.player, 500);
		}
	}

	if (this.game.physics.distanceBetween(this.actor, this.player) > 2000)
	{
		this.damage(9999); //out of sight, out of mind
	}
};

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

	game.load.atlas('tank', 'assets/tanks.png', 'assets/tanks.json');
	game.load.spritesheet('parts', 'assets/parts.png', 16, 16);
	game.load.atlas('enemy', 'assets/enemy-tanks.png', 'assets/tanks.json');
	game.load.spritesheet('bullet', 'assets/bullets.png',16,16);
	game.load.image('draconis', 'assets/draconis.png');
	game.load.image('starfield2', 'assets/starfield2.png');
	game.load.image('starfield3', 'assets/starfield3.png');
	game.load.image('starfield4', 'assets/starfield4.png');
	game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);
	game.load.spritesheet('sparks', 'assets/sparks.png',8,8);
}

var luser = function() {
	this.acceleration=2;
	this.turnRate=0.6;
	this.health=10;
	this.alive=true;
	this.bulletSprite=''; //todo
	this.bulletBehavior={};
	this.parts=[];
	this.speed = 0; //current
	this.fireRate = 250;
	this.damage = 9;
	this.range = 2000;
	this.energy=10;
	this.energyMax=10;
	this.energyRate=1000;
	this.energyAmount=2;
	
	this.fireEnergy = 1;

	this.nextEnergy = 0;
	this.nextFire = 0;
	
	this.actor = game.add.sprite(0, 0, 'parts');
	this.actor.visible=true;
	this.actor.anchor.setTo(0.5, 0.5);
	this.actor.body.maxVelocity.setTo(300,300);
	this.thrust = game.add.emitter(0,0,200);
	this.thrust.makeParticles('sparks',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.thrust.gravity=0;


	this.actor.body.drag.setTo(0, 0);
	this.actor.body.bounce.setTo(0, 0);
	this.actor.body.collideWorldBounds = true; 

	this.ship = ships[Math.floor(eo3.randomRange(0,ships.length))];

	this.parts = createShip(this.ship, this.actor);

	this.actor.body.setSize(Math.sqrt(this.ship.length)*16,Math.sqrt(this.ship.length)*16,0,0);
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

	if (!bullets.countDead())
	{
		// clean up bullets FIXME
		var bc = bullets.countLiving();

		for(var i=0; i<bc; i++){
			if(bullets.getAt(i).lifespan < 0){
				bullets.getAt(i).kill();
			}
		}
	}	
	if (game.time.now > this.nextFire && bullets.countDead() > 0 && this.energy > this.fireEnergy)
	{
		this.nextFire = game.time.now + this.fireRate;
		this.energy -= this.fireEnergy;
		var bullet = bullets.getFirstDead();
		bullet.damage = this.damage;
		bullet.lifetime = this.range;
		console.log(bullet.lifetime);
		bullet.reset(this.actor.x + (Math.cos(this.actor.rotation)*(this.actor.body.width)*0.75), this.actor.y + (Math.sin(this.actor.rotation)*(this.actor.body.width)*0.75));
		bullet.rotation = this.actor.rotation;
		game.physics.velocityFromRotation(this.actor.rotation, 350, bullet.body.velocity);
	}


};
luser.prototype.alt = function(){};
luser.prototype.update = function(){
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
};

var player;

// global
var backdrop1, backdrop2,backdrop3;
var numBaddies = 10;
var enemies;
var enemyBullets;
var explosions;
var logo;
var nextSpawn=0;

var cursors;

var bullets;
var nextFire = 0;

var partShip;

var ships=[];

function createParts() {

	var n=0;
	for(var iy=0;iy<32;iy++){
		for(var ix=0;ix<32;ix++){
			player.parts.push(new dragPart(ix*16,iy*16,'parts',n));
			n++;
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
			myParts.push(new shipPart(((n-1)*-8)+((i%n)*16),((n-1)*-8)+(Math.floor(i/n)*16),'parts',shipParts[i],targetActor));
		}
	i}
	return myParts; 
}


function create () {

	game.world.setBounds(-100000, -100000, 200000, 200000);
	backdrop1 = game.add.tileSprite(0, 0, 1280, 720, 'starfield2');

	backdrop1.fixedToCamera = true;
	backdrop1.scale.x=2;
	backdrop1.scale.y=2;	


	backdrop2 = game.add.tileSprite(0, 0, 1280, 720, 'starfield3');
	backdrop2.fixedToCamera = true;
	backdrop2.scale.x=2;
	backdrop2.scale.y=2;	

	backdrop3 = game.add.tileSprite(0, 0, 1280, 720, 'starfield4');
	backdrop3.fixedToCamera = true;
	backdrop3.scale.x=2;
	backdrop3.scale.y=2;	

	
	ships.push([66, 1, 2, 32, 33, 34, -1, 130, -1]);
	ships.push([-1, 3, 5, -1, -1, -1, 129, -1, -1, -1, 35, 68, 68, 36, 37, -1, 129, -1, -1, -1, -1, 3, 5, -1, -1]);
	ships.push([35, 3, 131, 37]);
	ships.push([-1, -1, -1, -1, 35, 3, 131, 37, -1, -1, -1, -1, -1, -1, -1, -1]);

	player = new luser();

	//  The enemies bullet group
	enemyBullets = game.add.group();
	enemyBullets.createMultiple(100, 'bullet');
	enemyBullets.setAll('anchor.x', 0.5);
	enemyBullets.setAll('anchor.y', 0.5);
	enemyBullets.setAll('mass', 0); //TODO this doesn't work
	enemyBullets.setAll('lifespan',5000);
	enemyBullets.setAll('outOfBoundsKill', true);

	//  Create some baddies to waste :)
	enemies = [];

	for (var i = 0; i < numBaddies; i++)
	{
		enemies.push(new enemyShip(i, game, player.actor, enemyBullets));
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
	//  Explosion pool
	explosions = game.add.group();

	for (var i = 0; i < 10; i++)
	{
		var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
		explosionAnimation.anchor.setTo(0.5, 0.5);
		explosionAnimation.animations.add('kaboom');
	}

	//actor.bringToTop();

	/*logo = game.add.sprite(0, 200, 'logo');
	  logo.fixedToCamera = true;

	  game.input.onDown.add(removeLogo, this);
	  */

	game.camera.follow(player.actor);
	game.camera.focusOnXY(0, 0);

	cursors = game.input.keyboard.createCursorKeys();
}

function removeLogo () {

	game.input.onDown.remove(removeLogo, this);
	logo.kill();

}

function update () {

	if(nextSpawn<game.time.now||nextSpawn==0)
	{
		for(var i = 0; i < enemies.length ; i++) {
			if (enemies[i].alive==false){
				enemies[i]=new enemyShip(i, game, player.actor, enemyBullets); //FIXME recycle correctly
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
		//    actor.body.angularAcceleration -= 3200;
	}
	else if (cursors.right.isDown)
	{
		player.right()
		//    actor.body.angularAcceleration += 3200;
	}

	if (cursors.up.isDown)
	{
		player.up();
		//  The speed we'll travel at
	}
	player.update();
	// scrolling
	backdrop1.tilePosition.x = -0.25*game.camera.x;
	backdrop1.tilePosition.y = -0.25*game.camera.y;
	backdrop2.tilePosition.x = -0.40*game.camera.x;
	backdrop2.tilePosition.y = -0.40*game.camera.y;
	backdrop3.tilePosition.x = -0.6*game.camera.x;
	backdrop3.tilePosition.y = -0.6*game.camera.y;

	//  Position all the parts and align rotations



	if (game.input.activePointer.isDown)
	{
		//  Boom!
		player.fire();
	}

}

function bulletHitPlayer (actor, bullet) {

	bullet.kill();

}

function bulletHitEnemy (actor, bullet) {

	pew.x=bullet.x;
	pew.y=bullet.y;
	pew.rotation=bullet.rotation;
	bullet.kill();

	pew.minParticleSpeed.setTo(150,150);
	pew.maxParticleSpeed.setTo(450,450);
	pew.particleDrag.setTo(0,0);
	pew.start(true,200,null, 50);
	var destroyed = enemies[actor.name].damage(bullet.damage);

	if (destroyed)
	{
		var explosionAnimation = explosions.getFirstDead();
		explosionAnimation.reset(actor.x, actor.y);
		explosionAnimation.play('kaboom', 30, false, true);
	}

}


function render () {

}

