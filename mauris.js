eo3 = {};
eo3.addVelocity = function (a,b,c){return"undefined"==typeof b&&(b=60),

	c=c||new d.Point,c.setTo(c.x+Math.cos(a)*b,c.y+Math.sin(a)*b)};
eo3.randomRange = function(a,b){var c,d; if(a>b){c=a;d=b;}else{d=a;c=b};return (Math.random()*(c-d))+d};
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
	this.actor = game.add.sprite(x, y, 'enemy', 'tank1');
	this.turret = game.add.sprite(x, y, 'enemy', 'turret');

	this.shadow.anchor.setTo(0.5, 0.5);
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

		this.shadow.kill();
		this.actor.kill();
		this.turret.kill();

		return true;
	}

	return false;

}

EnemyTank.prototype.update = function() {

	this.shadow.x = this.actor.x;
	this.shadow.y = this.actor.y;
	this.shadow.rotation = this.actor.rotation;

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
//        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

	game.load.atlas('tank', 'assets/games/tanks/tanks.png', 'assets/games/tanks/tanks.json');
	game.load.atlas('enemy', 'assets/games/tanks/enemy-tanks.png', 'assets/games/tanks/tanks.json');
	game.load.image('logo', 'assets/games/tanks/logo.png');
	game.load.image('bullet', 'assets/games/tanks/bullet.png');
	game.load.image('draconis', 'assets/draconis.png');
	game.load.image('turret', 'assets/turret.png');
	game.load.image('starfield', 'starfield.png');
	game.load.spritesheet('kaboom', 'assets/games/tanks/explosion.png', 64, 64, 23);
	game.load.spritesheet('thrust', 'thrust.png',4,4,4);
}

var land;
var filter;
var shadow;
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

function create () {

	game.world.setBounds(-1000, -1000, 3000, 3000);

	land = game.add.tileSprite(0, 0, 1280, 720, 'starfield');

	land.fixedToCamera = true;

	//  The base of our actor
	actor = game.add.sprite(0, 0, 'draconis');
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

	//  A shadow below our actor
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
	bullets.setAll('damage',Math.floor(eo3.randomRange(1,6)));
	//  Explosion pool
	explosions = game.add.group();

	for (var i = 0; i < 10; i++)
	{
		var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
		explosionAnimation.anchor.setTo(0.5, 0.5);
		explosionAnimation.animations.add('kaboom');
	}

	actor.bringToTop();
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


	game.physics.collide(enemyBullets, actor, bulletHitPlayer, null, this);

	actor.body.angularAcceleration = 0;

	for (var i = 0; i < enemies.length; i++)
	{
		if (enemies[i].alive)
		{
			enemies[i].update();
			game.physics.collide(actor, enemies[i].actor);
			game.physics.collide(bullets, enemies[i].actor, bulletHitEnemy, null, this);
		}
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
	land.tilePosition.x = -game.camera.x;
	land.tilePosition.y = -game.camera.y;

	//  Position all the parts and align rotations
	shadow.x = actor.x;
	shadow.y = actor.y;
	shadow.rotation = actor.rotation;

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

		bullet.reset(actor.x + (Math.cos(actor.rotation)*(actor.width)*0.5), actor.y + (Math.sin(actor.rotation)*(actor.width)*0.5));
		bullet.rotation = actor.rotation;
		game.physics.velocityFromRotation(actor.rotation, 350, bullet.body.velocity);

	}

}

function render () {

	// game.debug.renderText('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);

}

