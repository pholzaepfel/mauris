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

shipPart = function(x,y,sheet,index,player)
{
	this.offsetx = x;
	this.offsety = y;
	this.game = game;
	this.player = player;
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

EnemyTank = function (index, game, player, bullets) {

	var x = game.world.randomX;
	var y = game.world.randomY;

	this.game = game;
	this.health = 3;
	this.player = player;
	this.bullets = bullets;
	this.fireRate = 1000;
	this.nextFire = 0;
	this.alive = true;

	this.actor = game.add.sprite(x, y, 'enemy', 'tank1');
	this.turret = game.add.sprite(x, y, 'enemy', 'turret');

	this.actor.anchor.setTo(0.5, 0.5);
	this.turret.anchor.setTo(0.3, 0.5);

	this.actor.name = index.toString();
	//	this.actor.body.immovable = true;
	this.actor.body.collideWorldBounds = true;
	this.actor.body.bounce.setTo(1, 1);
	this.actor.body.maxAngular = 500; //turn rate
	this.actor.body.angularDrag=200;
	this.actor.angle = game.rnd.angle();

	game.physics.velocityFromRotation(this.actor.rotation, 100, this.actor.body.velocity);

};

EnemyTank.prototype.damage = function(dmg) {

	this.health -= dmg;

	if (this.health <= 0)
	{
		this.alive = false;

		this.actor.kill();
		this.turret.kill();

		return true;
	}

	return false;

}

EnemyTank.prototype.update = function() {


	this.turret.x = this.actor.x;
	this.turret.y = this.actor.y;
	this.turret.rotation = this.game.physics.angleBetween(this.actor, this.player);

	if (this.game.physics.distanceBetween(this.actor, this.player) < 300)
	{
		if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
		{
			this.nextFire = this.game.time.now + this.fireRate;

			var bullet = this.bullets.getFirstDead();

			bullet.reset(this.turret.x, this.turret.y);

			bullet.rotation = this.game.physics.moveToObject(bullet, this.player, 500);
		}
	}

};

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

	game.load.atlas('tank', 'assets/tanks.png', 'assets/tanks.json');
	game.load.spritesheet('parts', 'assets/parts.png', 16, 16);
	game.load.atlas('enemy', 'assets/enemy-tanks.png', 'assets/tanks.json');
	game.load.image('bullet', 'assets/bullet.png');
	game.load.image('draconis', 'assets/draconis.png');
	game.load.image('turret', 'assets/turret.png');
	game.load.image('starfield2', 'assets/starfield2.png');
	game.load.image('starfield3', 'assets/starfield3.png');
	game.load.image('starfield4', 'assets/starfield4.png');
	game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);
	game.load.spritesheet('thrust', 'assets/thrust.png',4,4,4);
}

var backdrop1, backdrop2;
var filter;
var actor;
var turret;
var numBaddies = 40;
var enemies;
var enemyBullets;
var explosions;

var logo;

var currentSpeed = 0;
var cursors;

var bullets;
var fireRate = eo3.randomRange(200,1500);
var nextFire = 0;

var partShip;
var parts=[];

//var defaultShipParts=[14,1,2,6,7,8,-1,26,-1];
var defaultShipParts=[-1,3,5,-1,-1,-1,25,-1,-1,-1,9,16,16,10,11,-1,25,-1,-1,-1,-1,3,5,-1,-1];

function createParts() {

	var n=0;
	for(var iy=0;iy<5;iy++){
		for(var ix=0;ix<6;ix++){
			parts.push(new dragPart(ix*32,iy*32,'parts',n));
			parts.push(new dragPart(16+(ix*32),16+(iy*32),'parts',n));
			parts.push(new dragPart((ix*32),16+(iy*32),'parts',n));
			parts.push(new dragPart(16+(ix*32),iy*32,'parts',n));
			n++;
		}
	}

}
// assumes that the incoming parts list is a square
// if not there will be anarchy
function createShip(shipParts, player){
	var myParts = [];

	var n=Math.sqrt(shipParts.length);

	if (n!=Math.floor(n)){
		return [];
	};
	for (var i=0; i<shipParts.length;i++){
		if(shipParts[i]>-1){
			myParts.push(new shipPart(((n-1)*-8)+((i%n)*16),((n-1)*-8)+(Math.floor(i/n)*16),'parts',shipParts[i],player));
		}
	}
	return myParts; 
}


function create () {

	game.world.setBounds(-1000, -1000, 3000, 3000);

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
	//createParts();	
	//  The base of our actor
	actor = game.add.sprite(0, 0, 'parts');
	actor.visible=false;
	actor.anchor.setTo(0.5, 0.5);
	//	actor.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);

	//actor.play('move');
	//basic stats
	actor.turnrate=eo3.randomRange(0.4,0.8);
	actor.acceleration=eo3.randomRange(0.9,2.3);
	var t = eo3.randomRange(130,290);
	actor.body.maxVelocity.setTo(t, t);



	actor.body.drag.setTo(0, 0);
	actor.body.bounce.setTo(0, 0);
	actor.body.collideWorldBounds = true; 

	//  Finally the turret that we place on-top of the actor body
	parts = createShip(defaultShipParts, actor);
	actor.height=Math.sqrt(defaultShipParts.length)*16; 
	actor.width=Math.sqrt(defaultShipParts.length)*16;
	//TODO some condition where the turret comes back?
	//turret = game.add.sprite(0, 0, 'turret');
	//turret.anchor.setTo(0.3, 0.5);

	//  The enemies bullet group
	enemyBullets = game.add.group();
	enemyBullets.createMultiple(100, 'bullet');
	enemyBullets.setAll('anchor.x', 0.5);
	enemyBullets.setAll('anchor.y', 0.5);
	enemyBullets.setAll('mass', 0); //TODO this doesn't work
	enemyBullets.setAll('outOfBoundsKill', true);

	//  Create some baddies to waste :)
	enemies = [];

	for (var i = 0; i < numBaddies; i++)
	{
		enemies.push(new EnemyTank(i, game, actor, enemyBullets));
	}

	thrust = game.add.emitter(0,0,200);
	thrust.makeParticles('thrust');
	thrust.gravity=0;

	pew = game.add.emitter(0,0,200);
	pew.makeParticles('thrust');
	pew.gravity=0;

	//  Our bullet group
	bullets = game.add.group();
	bullets.createMultiple(30, 'bullet');
	bullets.setAll('anchor.x', 0.5);
	bullets.setAll('anchor.y', 0.5);
	bullets.setAll('outOfBoundsKill', true);
	bullets.setAll('damage',Math.floor(eo3.randomRange(1,6)));
	//  Explosion pool
	explosions = game.add.group();

	for (var i = 0; i < 10; i++)
	{
		var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
		explosionAnimation.anchor.setTo(0.5, 0.5);
		explosionAnimation.animations.add('kaboom');
	}

	//actor.bringToTop();
	//TODO restore a turret one day - turret.bringToTop();

	/*logo = game.add.sprite(0, 200, 'logo');
	  logo.fixedToCamera = true;

	  game.input.onDown.add(removeLogo, this);
	  */

	game.camera.follow(actor);
	game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
	game.camera.focusOnXY(0, 0);

	cursors = game.input.keyboard.createCursorKeys();

}

function removeLogo () {

	game.input.onDown.remove(removeLogo, this);
	logo.kill();

}

function update () {

	game.debug.renderText(Math.sin(game.math.degToRad(actor.angle)) + ';' + Math.cos(game.math.degToRad(actor.angle)),100,100);
	if(enemyBullets.getFirstAlive() != null) {

		for (var i = 0; i < parts.length; i++) {
			game.physics.collide(enemyBullets, parts[i].actor, bulletHitPlayer, null, this);
		}
	}
	actor.body.angularAcceleration = 0;

	for (var i = 0; i < enemies.length; i++)
	{
		if (enemies[i].alive)
		{
			enemies[i].update();
			for (var j = 0; j < parts.length; j++) {
				game.physics.collide(enemies[i].actor, parts[j].actor);
			}
			game.physics.collide(bullets, enemies[i].actor, bulletHitEnemy, null, this);
		}
	}

	for (var i = 0; i < parts.length; i++)
	{
		parts[i].update();
	}

	if (cursors.left.isDown)
	{
		actor.angle-=actor.turnrate;
		//    actor.body.angularAcceleration -= 3200;
	}
	else if (cursors.right.isDown)
	{
		actor.angle+=actor.turnrate;
		//    actor.body.angularAcceleration += 3200;
	}

	if (cursors.up.isDown)
	{
		//  The speed we'll travel at
		currentSpeed = actor.acceleration;
	}
	//
	if (currentSpeed > 0)
	{
		if(game.time.now>(actor.nextThrust||0))
		{
			thrust.x=actor.x-(Math.cos(actor.rotation)*(actor.width)*0.5);
			thrust.y=actor.y-(Math.sin(actor.rotation)*(actor.width)*0.5);
			thrust.minParticleSpeed.setTo(-1*Math.cos(actor.rotation)*actor.acceleration,-1*Math.sin(actor.rotation)*actor.acceleration);
			thrust.maxParticleSpeed.setTo(-1*Math.cos(actor.rotation)*actor.acceleration*4,-1*Math.sin(actor.rotation)*actor.acceleration*4);
			thrust.start(true, 1000, null, 1);
			actor.nextThrust = game.time.now + 100; 
		}
		eo3.addVelocity(actor.rotation, currentSpeed, actor.body.velocity);
		currentSpeed=0;
	}
	// scrolling
	backdrop1.tilePosition.x = -0.25*game.camera.x;
	backdrop1.tilePosition.y = -0.25*game.camera.y;
	backdrop2.tilePosition.x = -0.40*game.camera.x;
	backdrop2.tilePosition.y = -0.40*game.camera.y;
	backdrop3.tilePosition.x = -0.6*game.camera.x;
	backdrop3.tilePosition.y = -0.6*game.camera.y;

	//  Position all the parts and align rotations

	//TODO restore the turret one day
	//turret.x = actor.x;
	//turret.y = actor.y;

	//turret.rotation = game.physics.angleToPointer(turret);

	if (game.input.activePointer.isDown)
	{
		//  Boom!
		fire();
	}

}

function bulletHitPlayer (actor, bullet) {

	bullet.kill();

}

function bulletHitEnemy (actor, bullet) {

	pew.x=bullet.x;
	pew.y=bullet.y;
	bullet.kill();
	pew.minParticleSpeed.setTo(-1500,-1500);
	pew.maxParticleSpeed.setTo(1500,1500);
	pew.particleDrag.setTo(-500,1000);
	pew.start(true,125,0, 50);
	var destroyed = enemies[actor.name].damage(bullet.damage);

	if (destroyed)
	{
		var explosionAnimation = explosions.getFirstDead();
		explosionAnimation.reset(actor.x, actor.y);
		explosionAnimation.play('kaboom', 30, false, true);
	}

}

//TODO: generalize this out
function turretFire () {

	if (game.time.now > nextFire && bullets.countDead() > 0)
	{
		nextFire = game.time.now + fireRate;

		var bullet = bullets.getFirstDead();

		bullet.reset(turret.x + (Math.cos(turret.rotation)*(actor.width)*0.5), turret.y + (Math.sin(turret.rotation)*(actor.width)*0.5));

		bullet.rotation = game.physics.moveToPointer(bullet, 350);
	}

}

function fire () {

	if (game.time.now > nextFire && bullets.countDead() > 0)
	{
		nextFire = game.time.now + fireRate;

		var bullet = bullets.getFirstDead();

		bullet.reset(actor.x + (Math.cos(actor.rotation)*(actor.width)*0.75), actor.y + (Math.sin(actor.rotation)*(actor.width)*0.75));
		bullet.rotation = actor.rotation;
		game.physics.velocityFromRotation(actor.rotation, 350, bullet.body.velocity);

	}

}

function render () {

	// game.debug.renderText('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);

}

