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

enemyShip = function (index, game, player, bullets) {

	var x = eo3.randomRange(-1000,1000);
	var y =  eo3.randomRange(-11000,1000);

	this.game = game;
	this.health = 3;
	this.player = player;
	this.bullets = bullets;
	this.fireRate = 1000;
	this.nextFire = 0;
	this.alive = true;
	this.parts = [];
	this.actor = game.add.sprite(x, y, 'parts', 0);
	this.actor.visible = true;
	this.actor.anchor.setTo(0.5, 0.5);

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

};

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload () {

	game.load.atlas('tank', 'assets/tanks.png', 'assets/tanks.json');
	game.load.spritesheet('parts', 'assets/parts.png', 16, 16);
	game.load.atlas('enemy', 'assets/enemy-tanks.png', 'assets/tanks.json');
	game.load.image('bullet', 'assets/bullet.png');
	game.load.image('draconis', 'assets/draconis.png');
	game.load.image('starfield2', 'assets/starfield2.png');
	game.load.image('starfield3', 'assets/starfield3.png');
	game.load.image('starfield4', 'assets/starfield4.png');
	game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);
	game.load.spritesheet('sparks', 'assets/sparks.png',8,8);
}

var backdrop1, backdrop2,backdrop3;
var numBaddies = 50;
var enemies;
var enemyBullets;
var explosions;
var player = {};
var logo;

var currentSpeed = 0;
var cursors;

var bullets;
var fireRate = eo3.randomRange(200,1500);
var nextFire = 0;

var partShip;
var parts=[];

var ships=[];
ships.push([66, 1, 2, 32, 33, 34, -1, 130, -1]);
ships.push([-1, 3, 5, -1, -1, -1, 129, -1, -1, -1, 35, 68, 68, 36, 37, -1, 129, -1, -1, -1, -1, 3, 5, -1, -1]);
ships.push([35, 3, 131, 37]);
ships.push([-1, -1, -1, -1, 35, 3, 131, 37, -1, -1, -1, -1, -1, -1, -1, -1]);

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

	//createParts();	
	//  The base of our actor
	player.actor = game.add.sprite(0, 0, 'parts');
	player.actor.visible=true;
	player.actor.anchor.setTo(0.5, 0.5);
	//	actor.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);

	//actor.play('move');
	//basic stats
	player.actor.turnrate=eo3.randomRange(0.4,0.8);
	player.actor.acceleration=eo3.randomRange(0.9,2.3);
	var t = eo3.randomRange(130,290);
	player.actor.body.maxVelocity.setTo(t, t);



	player.actor.body.drag.setTo(0, 0);
	player.actor.body.bounce.setTo(0, 0);
	player.actor.body.collideWorldBounds = true; 

	var playerShip = ships[Math.floor(eo3.randomRange(0,ships.length))];

	parts = createShip(playerShip, player.actor);

	player.actor.body.setSize(Math.sqrt(playerShip.length)*16,Math.sqrt(playerShip.length)*16,0,0);

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
		enemies.push(new enemyShip(i, game, player.actor, enemyBullets));
		var newShip = ships[Math.floor(eo3.randomRange(0,ships.length))];

		enemies[i].actor.body.setSize(Math.sqrt(newShip.length)*16,Math.sqrt(newShip.length)*16,0,0);

		enemies[i].parts = createShip(newShip,enemies[i].actor);
	}

	thrust = game.add.emitter(0,0,200);
	thrust.makeParticles('sparks',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	thrust.gravity=0;

	pew = game.add.emitter(0,0,200);
	pew.makeParticles('sparks');
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

	game.debug.renderText(Math.sin(game.math.degToRad(player.actor.angle)) + ';' + Math.cos(game.math.degToRad(player.actor.angle)),100,100);
	if(enemyBullets.getFirstAlive() != null) {

		for (var i = 0; i < parts.length; i++) {
			game.physics.collide(enemyBullets, parts[i].actor, bulletHitPlayer, null, this);
		}
	}

	for (var i = 0; i < enemies.length; i++)
	{
		if (enemies[i].alive)
		{
			enemies[i].update();
			for (var j = 0; j < parts.length; j++) {
				game.physics.collide(enemies[i].actor, parts[j].actor);
			}
			game.physics.collide(bullets, enemies[i].actor, bulletHitEnemy, null, this);

			for (var j = 0; j < enemies[i].parts.length; j++) {

				enemies[i].parts[j].update();

			}	

		}
	}

	for (var i = 0; i < parts.length; i++)
	{
		parts[i].update();
	};


	if (cursors.left.isDown)
	{
		player.actor.angle-=player.actor.turnrate;
		//    actor.body.angularAcceleration -= 3200;
	}
	else if (cursors.right.isDown)
	{
		player.actor.angle+=player.actor.turnrate;
		//    actor.body.angularAcceleration += 3200;
	}

	if (cursors.up.isDown)
	{
		//  The speed we'll travel at
		currentSpeed = player.actor.acceleration;
	}
	//
	if (currentSpeed > 0)
	{
		if(game.time.now>(player.actor.nextThrust||0))
		{
			thrust.x=player.actor.x-(Math.cos(player.actor.rotation)*(player.actor.body.width)*0.5);
			thrust.y=player.actor.y-(Math.sin(player.actor.rotation)*(player.actor.body.width)*0.5);
			thrust.minParticleSpeed.setTo(0,0);
			thrust.maxParticleSpeed.setTo(0,0);
			thrust.start(true, 1000, null, 1);
			player.actor.nextThrust = game.time.now + 100; 
		}
		eo3.addVelocity(player.actor.rotation, currentSpeed, player.actor.body.velocity);
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

function fire () {

	if (game.time.now > nextFire && bullets.countDead() > 0)
	{
		nextFire = game.time.now + fireRate;

		var bullet = bullets.getFirstDead();

		bullet.reset(player.actor.x + (Math.cos(player.actor.rotation)*(player.actor.body.width)*0.75), player.actor.y + (Math.sin(player.actor.rotation)*(player.actor.body.width)*0.75));
		bullet.rotation = player.actor.rotation;
		game.physics.velocityFromRotation(player.actor.rotation, 350, bullet.body.velocity);

	}

}

function render () {

}

