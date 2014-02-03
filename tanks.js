eo3 = {};
eo3.addVelocity = function (a,b,c){return"undefined"==typeof b&&(b=60),

	c=c||new d.Point,c.setTo(c.x+Math.cos(a)*b,c.y+Math.sin(a)*b)};

eo3.addVelocityTest = function (a,b,c){return '' +  c.x + ' - ' + Math.cos((game.math.degToRad(a))*b) + ' : ' + c.y+' - '+(Math.sin(game.math.degToRad(a))*b)};
// ----8<----- my shity additions are above
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

	this.shadow = game.add.sprite(x, y, 'enemy', 'shadow');
	this.tank = game.add.sprite(x, y, 'enemy', 'tank1');
	this.turret = game.add.sprite(x, y, 'enemy', 'turret');

	this.shadow.anchor.setTo(0.5, 0.5);
	this.tank.anchor.setTo(0.5, 0.5);
	this.turret.anchor.setTo(0.3, 0.5);

	this.tank.name = index.toString();
	//	this.tank.body.immovable = true;
	this.tank.body.collideWorldBounds = true;
	this.tank.body.bounce.setTo(1, 1);
	this.tank.body.maxAngular = 500; //turn rate
	this.tank.body.angularDrag=200;
	this.tank.angle = game.rnd.angle();

	game.physics.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};

EnemyTank.prototype.damage = function(dmg) {

	this.health -= dmg;

	if (this.health <= 0)
	{
		this.alive = false;

		this.shadow.kill();
		this.tank.kill();
		this.turret.kill();

		return true;
	}

	return false;

}

EnemyTank.prototype.update = function() {

	this.shadow.x = this.tank.x;
	this.shadow.y = this.tank.y;
	this.shadow.rotation = this.tank.rotation;

	this.turret.x = this.tank.x;
	this.turret.y = this.tank.y;
	this.turret.rotation = this.game.physics.angleBetween(this.tank, this.player);

	if (this.game.physics.distanceBetween(this.tank, this.player) < 300)
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
//        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

	game.load.atlas('tank', 'assets/games/tanks/tanks.png', 'assets/games/tanks/tanks.json');
	game.load.atlas('enemy', 'assets/games/tanks/enemy-tanks.png', 'assets/games/tanks/tanks.json');
	game.load.image('logo', 'assets/games/tanks/logo.png');
	game.load.image('bullet', 'assets/games/tanks/bullet.png');
	game.load.image('starfield', 'starfield.png');
	game.load.spritesheet('kaboom', 'assets/games/tanks/explosion.png', 64, 64, 23);
	game.load.spritesheet('thrust', 'thrust.png',4,4,4);
}

var land;
var filter;
var shadow;
var tank;
var turret;
var numBaddies = 40;
var enemies;
var enemyBullets;
var explosions;

var logo;

var currentSpeed = 0;
var cursors;

var bullets;
var fireRate = 1000;
var nextFire = 0;

function create () {

	game.world.setBounds(-1000, -1000, 3000, 3000);

	//  Our tiled scrolling background
	land = game.add.tileSprite(0, 0, 1280, 720, 'starfield');

	land.fixedToCamera = true;

	//  The base of our tank
	tank = game.add.sprite(0, 0, 'tank', 'tank1');
	tank.anchor.setTo(0.5, 0.5);
	tank.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);

	//tank.play('move');
	//basic stats
	tank.turnrate=0.5;
	tank.acceleration=0.9;
	tank.body.maxVelocity.setTo(165, 165);



	tank.body.drag.setTo(0, 0);
	tank.body.bounce.setTo(0, 0);
	tank.body.collideWorldBounds = true; 

	//  Finally the turret that we place on-top of the tank body
	turret = game.add.sprite(0, 0, 'tank', 'turret');
	turret.anchor.setTo(0.3, 0.5);

	//  The enemies bullet group
	enemyBullets = game.add.group();
	enemyBullets.createMultiple(100, 'bullet');
	enemyBullets.setAll('anchor.x', 0.5);
	enemyBullets.setAll('anchor.y', 0.5);
	enemyBullets.setAll('mass', 0);
	enemyBullets.setAll('outOfBoundsKill', true);

	//  Create some baddies to waste :)
	enemies = [];

	for (var i = 0; i < numBaddies; i++)
	{
		enemies.push(new EnemyTank(i, game, tank, enemyBullets));
	}

	//  A shadow below our tank
	shadow = game.add.sprite(0, 0, 'tank', 'shadow');
	shadow.anchor.setTo(0.5, 0.5);

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
	bullets.setAll('damage',6);
	//  Explosion pool
	explosions = game.add.group();

	for (var i = 0; i < 10; i++)
	{
		var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
		explosionAnimation.anchor.setTo(0.5, 0.5);
		explosionAnimation.animations.add('kaboom');
	}

	tank.bringToTop();
	turret.bringToTop();

	logo = game.add.sprite(0, 200, 'logo');
	logo.fixedToCamera = true;

	game.input.onDown.add(removeLogo, this);

	game.camera.follow(tank);
	game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
	game.camera.focusOnXY(0, 0);

	cursors = game.input.keyboard.createCursorKeys();

}

function removeLogo () {

	game.input.onDown.remove(removeLogo, this);
	logo.kill();

}

function update () {


	game.physics.collide(enemyBullets, tank, bulletHitPlayer, null, this);

	tank.body.angularAcceleration = 0;

	for (var i = 0; i < enemies.length; i++)
	{
		if (enemies[i].alive)
		{
			enemies[i].update();
			game.physics.collide(tank, enemies[i].tank);
			game.physics.collide(bullets, enemies[i].tank, bulletHitEnemy, null, this);
		}
	}

	if (cursors.left.isDown)
	{
		tank.angle-=tank.turnrate;
		//    tank.body.angularAcceleration -= 3200;
	}
	else if (cursors.right.isDown)
	{
		tank.angle+=tank.turnrate;
		//    tank.body.angularAcceleration += 3200;
	}

	if (cursors.up.isDown)
	{
		//  The speed we'll travel at
		currentSpeed = tank.acceleration;
	}
	//
	if (currentSpeed > 0)
	{
		if(game.time.now>(tank.nextThrust||0))
		{
			thrust.x=tank.x-(Math.cos(tank.rotation)*(tank.width)*0.5);
			thrust.y=tank.y-(Math.sin(tank.rotation)*(tank.width)*0.5);
			thrust.minParticleSpeed.setTo(-1*Math.cos(tank.rotation)*tank.acceleration,-1*Math.sin(tank.rotation)*tank.acceleration);
			thrust.maxParticleSpeed.setTo(-1*Math.cos(tank.rotation)*tank.acceleration,-1*Math.sin(tank.rotation)*tank.acceleration);
			thrust.start(true, 2000, null, 1);
			tank.nextThrust = game.time.now + 200; 
		}
		eo3.addVelocity(tank.rotation, currentSpeed, tank.body.velocity);
		//game.physics.velocityFromRotation(tank.rotation, currentSpeed, tank.body.velocity);
		currentSpeed=0;
	}
	//
	land.tilePosition.x = -game.camera.x;
	land.tilePosition.y = -game.camera.y;

	//  Position all the parts and align rotations
	shadow.x = tank.x;
	shadow.y = tank.y;
	shadow.rotation = tank.rotation;

	turret.x = tank.x;
	turret.y = tank.y;

	turret.rotation = game.physics.angleToPointer(turret);

	if (game.input.activePointer.isDown)
	{
		//  Boom!
		fire();
	}

}

function bulletHitPlayer (tank, bullet) {

	bullet.kill();

}

function bulletHitEnemy (tank, bullet) {

	pew.x=bullet.x;
	pew.y=bullet.y;
	bullet.kill();
	pew.minParticleSpeed.setTo(-1500,-1500);
	pew.maxParticleSpeed.setTo(1500,1500);
	pew.particleDrag.setTo(-500,1000);
	pew.start(true,125,0, 50);
	var destroyed = enemies[tank.name].damage(bullet.damage);

	if (destroyed)
	{
		var explosionAnimation = explosions.getFirstDead();
		explosionAnimation.reset(tank.x, tank.y);
		explosionAnimation.play('kaboom', 30, false, true);
	}

}

function fire () {

	if (game.time.now > nextFire && bullets.countDead() > 0)
	{
		nextFire = game.time.now + fireRate;

		var bullet = bullets.getFirstDead();

		bullet.reset(turret.x, turret.y);

		bullet.rotation = game.physics.moveToPointer(bullet, 350);
	}

}

function render () {

	// game.debug.renderText('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);

}

