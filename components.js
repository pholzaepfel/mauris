var cmp = [
{	
	'id':0, 
		'drops':false,
		'name':'Component0',
		'match':'4682',
		'flavor':'-',
		'bonus':function(target){}
},
{
	'id':1,
	'drops':true,
	'name':'Rusted Wing',
	'match':'62',
	'flavor':'improves maneuverability',
	'bonus':function(target){
		target.turnRate+=0.3;
		target.acceleration+=0.3;
		target.sprite.body.maxVelocity.x+=15;
		target.sprite.body.maxVelocity.y+=15;
	}
},
{
	'id':2,
	'drops':true,
	'name':'Ancient Railgun',
	'match':'46',
	'flavor':'fires long-ranged slugs, slow rate of fire',
	'bonus':function(target){
		target.bulletSprite=3;
		target.fireEnergy+=3;
		target.fireRange+=1000;
		target.fireDamage+=4;
		target.fireSound=ui.sound_bullet;
		target.bulletBehavior.push(function(bullet){
				bullet.scale.setTo(2,bullet.scale.y);
				});
		target.sprite.profile+=25;
	}
},
{
	'id':3,
	'drops':true,
	'name':'Capacitor Unit',
	'match':'4682',
	'flavor':'basic energy storage',
	'bonus':function(target){
		target.energyMax+=6;
	}
},
{
	'id':4,
	'drops':true,
	'name':'VariJet',
	'match':'862',
	'flavor':'press [Z] to rocket backwards',
	'bonus':function(target){
		target.turnRate+=0.3;
		target.acceleration+=0.2;
		target.altCheck=function(){
			var ret = false;
			this.energyReserve=0;
			var targetDistance = game.physics.arcade.distanceBetween(this.sprite, this.target);
			var targetAngle = game.physics.arcade.angleBetween(this.target, this.sprite);

			if(targetDistance < 800 && this.altCooldown < game.time.now + 5000){
				this.energyReserve=6;
			}
			if(targetDistance < 250 && targetDistance < this.fireRange / 2)
			{
				ret = true;
			}
			return ret;
		}

		target.alt=function(){
			if(this.altCooldown<game.time.now && this.takeEnergy(6)){
				ui.sound_plasma.play();
				this.altCooldown=game.time.now+1000;
				this.sprite.body.velocity.x=Math.cos(this.sprite.rotation+Math.PI)*this.sprite.body.maxVelocity.x;
				this.sprite.body.velocity.y=Math.sin(this.sprite.rotation+Math.PI)*this.sprite.body.maxVelocity.y;
				this.speed=0.01;
			}
		}
	}
},
{
	'id':5,
	'drops':true,
	'name':'Overpowered Burst Laser',
	'match':'4',
	'flavor':'flashy and attracts attention',
	'bonus':function(target){
		target.fireVelocity+=200;
		target.fireSound=ui.sound_pew1;
		target.bulletSprite=3;
		target.sprite.profile+=50;
		target.fireEnergy+=2;
		target.fireDamage+=3;
		target.fireRate=10;
		target.firingSolution=laserFiringSolution;
		target.bulletBehavior=[(function(bullet){
				
				laserBulletBehavior(bullet,parseInt(randomRange(4,7)),randomRange(0.3,1.8),0xCB40AB,0xFF60ED,0xFFFFFF,22,function(){});


		})];


	}
},
{
	'id':6,
	'drops':false,
	'name':'Alien Pustule',
	'match':'26',
	'flavor':'crippling but tough',
	'bonus':function(target){
		target.health+=4;
		target.turnRate-=0.1;
		target.sprite.body.maxVelocity.x-=10;
		target.sprite.body.maxVelocity.y-=10;
		target.sprite.profile+=10;
	}
},
{
	'id':7,
	'drops':false,
	'name':'Alien Pustule',
	'match':'42',
	'flavor':'crippling but tough',
	'bonus':function(target){
		target.health+=4;
		target.turnRate-=0.1;
		target.sprite.body.maxVelocity.x-=10;
		target.sprite.body.maxVelocity.y-=10;
		target.sprite.profile+=10;
	}
},
{
	'id':8,
	'drops':true,
	'name':'Shield Generator',
	'match':'2',
	'flavor':'press [Z] for invincibility',
	'bonus':function(target){
		target.altCheck=function(){
			var ret = false;
			this.energyReserve=0;
			var targetDistance = game.physics.arcade.distanceBetween(this.sprite, this.target);
			var targetAngle = game.physics.arcade.angleBetween(this.target, this.sprite);

			if(targetDistance < 1600 && this.altCooldown < game.time.now + 5000){
				this.energyReserve=this.energyMax*0.3;
			}
			if(targetDistance < (target.fireRange * 0.001 * target.fireVelocity) && Math.abs(compareAngles(this.target.rotation, targetAngle))<0.6)
			{
				ret = true;
			}
			return ret;
		}
		target.alt=function(){
			if(game.time.now > this.altCooldown && this.takeEnergy(0.8)){				
				ui.sound_boop.play();
				this.shieldCooldown=game.time.now+100;
				this.altCooldown=game.time.now+100;
				this.shield=true;
				shieldEffect(explosions, 4, this.sprite.x, this.sprite.y, this.sprite.body.velocity.x, this.sprite.body.velocity.y, this.ship.length);
			}
		}
	}
},
{
	'id':9,
	'drops':true,
	'name':'Mineral Scanner',
	'match':'2',
	'flavor':'track more enemies and find more loot',
	'bonus':function(target){
		target.radarTargets+=2;
		target.dropRate+=0.008;
	}
},
{
	'id':10,
	'drops':true,
	'name':'Fusion Core',
	'match':'26',
	'flavor':'improves recharge speed and maneuverability',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyAmount+=1;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':11,
	'drops':true,
	'name':'Fusion Core',
	'match':'42',
	'flavor':'improves recharge speed and maneuverability',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyAmount+=1;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':12,
	'drops':true,
	'name':'Xenoform Reactor',
	'match':'6',
	'flavor':'hums with power. very valuable',
	'bonus':function(target){
		target.energyAmount+=2;
		target.sprite.profile+=100;
	}
},
{
	'id':13,
	'drops':true,
	'name':'Fusion Bolt Cannon',
	'match':'4',
	'flavor':'covered in warnings in multiple languages',
	'bonus':function(target){
		target.bulletSprite=5; 
		target.fireDamage*=2;
		target.fireEnergy*=1.75;
		target.fireSound=ui.sound_boom2;
		target.fireRate*=1.5;
		target.sprite.profile+=200;
		target.bulletBehavior.push(function(bullet){
				bullet.scale.setTo(bullet.scale.x+.1,bullet.scale.y+.1);
				});
	}
},
{
	'id':14,
	'drops':false,
	'name':'Asteroid',
	'match':'26',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];
	}
},
{
	'id':15,
	'drops':false,
	'name':'Asteroid',
	'match':'42',
	'flavor':'-',
	'bonus':function(target){

		target.ai=aiModes['asteroidInit'];
	}
},
{
	'id':16,
	'drops':false,
	'name':'Asteroid',
	'match':'86',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];

	}
},
{
	'id':17,
	'drops':false,
	'name':'Asteroid',
	'match':'84',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];

	}
},
{
	'id':18,
	'drops':false,
	'name':'Asteroid',
	'match':'26',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];

	}
},
{
	'id':19,
	'drops':false,
	'name':'Asteroid',
	'match':'42',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];

	}
},
{
	'id':20,
	'drops':false,
	'name':'Asteroid',
	'match':'86',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];

	}
},
{
	'id':21,
	'drops':false,
	'name':'Asteroid',
	'match':'84',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];

	}
},
{
	'id':22,
	'drops':false,
	'name':'Asteroid',
	'match':'4682',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];

	}
},
{
	'id':23,
	'drops':false,
	'name':'Asteroid',
	'match':'4682',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];

	}
},
{
	'id':24,
	'drops':false,
	'name':'Asteroid',
	'match':'4682',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];

	}
},
{
	'id':25,
	'drops':false,
	'name':'Asteroid',
	'match':'4682',
	'flavor':'-',
	'bonus':function(target){
		target.ai=aiModes['asteroidInit'];
	}
},
{
	'id':26,
	'drops':false,
	'name':'Loot',
	'match':'4682',
	'flavor':'-',
	'bonus':function(target){

	}
},
{
	'id':27,
	'drops':false,
	'name':'Loot',
	'match':'4682',
	'flavor':'-',
	'bonus':function(target){

	}
},
{
	'id':28,
	'drops':false,
	'name':'Loot',
	'match':'4682',
	'flavor':'-',
	'bonus':function(target){

	}
},
{
	'id':29,
	'drops':false,
	'name':'Loot',
	'match':'4682',
	'flavor':'-',
	'bonus':function(target){

	}
},
{
	'id':30,
	'drops':true,
	'name':'Battle-worn Panel',
	'match':'4682',
	'flavor':'medium armor, bonus damage',
	'bonus':function(target){
		target.health+=6;
		target.fireDamage+=1;
		target.fireEnergy+=0.5;
		target.acceleration*=0.7;
	}
},
{
	'id':31,
	'drops':true,
	'name':'Reeunk Afterburner',
	'match':'6',
	'flavor':'hold [Z] to blaze forward and burn enemies in your wake',
	'bonus':function(target){
		target.acceleration+=0.2;
		target.sprite.body.maxVelocity.x+=10;
		target.sprite.body.maxVelocity.y+=10;
		target.altCheck=function(){
			var ret = false;
			this.energyReserve=0;
			var targetDistance = game.physics.arcade.distanceBetween(this.sprite, this.target);
			var targetAngle = game.physics.arcade.angleBetween(this.target, this.sprite);

			if(targetDistance < 750){
				this.energyReserve=2;
			}

			if(Math.abs(compareAngles(this.sprite.rotation, targetAngle))<0.5*Math.PI && targetDistance < 750)
			{
				ret = true;
			}
			return ret;
		}
		target.alt=function(){
			if(game.time.now>this.altCooldown && this.takeEnergy(1)){
				ui.sound_plasma.play();
				this.sprite.body.velocity.x+=Math.cos(this.sprite.rotation)*150;
				this.sprite.body.velocity.y+=Math.sin(this.sprite.rotation)*150;
				this.speed=this.acceleration;
				var bullet=this.spawnBullet(false);
				bullet.loadTexture('explosions',2);
				bullet.bulletSprite=2;
				bullet.reset(this.sprite.x - (Math.cos(this.sprite.rotation)*(this.sprite.body.width)), this.sprite.y - (Math.sin(this.sprite.rotation)*(this.sprite.body.width)));
				midBoom(explosions,2,bullet.x,bullet.y);
				bullet.rotation=Math.random()*Math.PI;
				bullet.blendMode=1;
				bullet.damage=10;
				bullet.body.velocity.x=0;
				bullet.body.velocity.y=0;
				bullet.scale.setTo(2,2);
				bullet.lifespan=1333;
				bullet.body.angularVelocity=999;
				bullet.tracking=-999; //doesn't play with angularvel
				this.altCooldown=game.time.now+100;
				game.add.tween(bullet.scale).to({x:0,y:0},bullet.lifespan, Phaser.Easing.Linear.None, true, 0, false);

				game.add.tween(bullet).to({alpha:0},bullet.lifespan, Phaser.Easing.Exponential.In, true, 0, false);

			}
		}

	}
},
{
	'id':32,
	'drops':true,
	'name':'Radioactive Thruster',
	'match':'6',
	'flavor':'mostly safe',
	'bonus':function(target){
		target.acceleration+=1;
		target.turnRate+=0.2;
		target.health-=1;
		target.sprite.body.maxVelocity.x+=15;
		target.sprite.body.maxVelocity.y+=15;
	}
},
{
	'id':33,
	'drops':true,
	'name':'Derelict Crewpod',
	'match':'4682',
	'flavor':'extra crewhands speed energy regeneration',
	'bonus':function(target){
		target.health+=2;
		target.energyRate+=1;
		target.acceleration+=0.1;
		target.sprite.profile+=10;
	}
},
{
	'id':34,
	'drops':true,
	'name':'Filthy Cockpit',
	'match':'4',
	'flavor':'still reliable and fast!',
	'bonus':function(target){
		target.turnRate+=0.2;
		target.health+=4;
	}
},
{
	'id':35,
	'drops':true,
	'name':'Fusion Thrust',
	'match':'6',
	'flavor':'clean energy thruster',
	'bonus':function(target){
		target.acceleration+=0.7;

		target.sprite.body.maxVelocity.x+=15;
		target.sprite.body.maxVelocity.y+=15;

		target.health+=1;
	}
},
{
	'id':36,
	'drops':true,
	'name':'Standard Quarters',
	'match':'4682',
	'flavor':'more energy and health',
	'bonus':function(target){
		target.health+=3;
		target.energyAmount*=1.2;
		target.energyMax+=3;
		target.sprite.profile+=20;
	}
},
{
	'id':37,
	'drops':true,
	'name':'Command Center',
	'match':'4',
	'flavor':'superior damage control',
	'bonus':function(target){
		target.health+=6;
		target.turnRate+=0.2;
	}
},

{
	'id':38,
	'drops':false,
	'name':'Alien Pustule',
	'match':'86',
	'flavor':'crippling but tough',
	'bonus':function(target){
		target.health+=4;
		target.turnRate-=0.1;
		target.sprite.body.maxVelocity.x-=10;
		target.sprite.body.maxVelocity.y-=10;
		target.sprite.profile+=10;
	}
},
{
	'id':39,
	'drops':false,
	'name':'Alien Pustule',
	'match':'84',
	'flavor':'crippling but tough',
	'bonus':function(target){
		target.health+=4;
		target.turnRate-=0.1;
		target.sprite.body.maxVelocity.x-=10;
		target.sprite.body.maxVelocity.y-=10;
		target.sprite.profile+=10;
	}
},
{
	'id':40,
	'drops':true,
	'name':'Tractor Beam Array',
	'match':'8',
	'flavor':'pull in loots from farther away',
	'bonus':function(target){
		target.lootRange+=300;
	}
},
{
	'id':41,
	'drops':true,
	'name':'Force Multiplier',
	'match':'4682',
	'flavor':'spray \'n pray',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet, playerFired){

				if(playerFired){
				var tgt = ownerFromName(bullet.owner.name);
				bullet.rotation+=Math.random()*0.4-0.2;
				game.physics.arcade.velocityFromRotation(bullet.rotation, getHypo(bullet.body.velocity.x,bullet.body.velocity.y), bullet.body.velocity);	
				var fireEnergyCost = typeof(tgt.fireEnergy4)=='undefined'?tgt.fireEnergy/3:tgt.fireEnergy;
				if(tgt.takeEnergy(fireEnergyCost)){
				var bullet2 = tgt.spawnBullet(false);

				if(typeof(bullet2)!='undefined'){
				bullet2.rotation+=Math.random()*0.8-0.4;
				game.physics.arcade.velocityFromRotation(bullet2.rotation, bullet2.fireVelocity, bullet2.body.velocity);
				}else{
				tgt.energy+=tgt.fireEnergy/3;
				}
				}
				}
				});
		target.sprite.profile+=40;
	}
},
{
	'id':42,
	'drops':true,
	'name':'Fusion Core',
	'match':'86',
	'flavor':'improves recharge speed and maneuverability',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyAmount+=1;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':43,
	'drops':true,
	'name':'Fusion Core',
	'match':'84',
	'flavor':'improves recharge speed and maneuverability',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyAmount+=1;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':44,
	'drops':true,
	'name':'Thrust Package',
	'match':'86',
	'flavor':'fast and flashy',
	'bonus':function(target){
		target.fireDamage+=1;
		target.acceleration+=0.6;
		target.sprite.body.maxVelocity.x+=15;
		target.sprite.body.maxVelocity.y+=15;
		target.sprite.profile+=50;
	}
},
{
	'id':45,
	'drops':true,
	'name':'Advanced Damage Control',
	'match':'84',
	'flavor':'improves health, but leeches energy',
	'bonus':function(target){
		target.health+=12;
		target.energyMax-=4;
		target.fireEnergy+=0.5;
		target.fireDamage+=1;
	}
},
{
	'id':46,
	'drops':true,
	'name':'Flexible Grid',
	'match':'46',
	'flavor':'improves maneuverability and interferes with sensors',
	'bonus':function(target){
		target.turnRate+=0.3;
		target.profileDecay+=20;
	}
},
{
	'id':47,
	'drops':true,
	'name':'Gargantuan Plasma Thrower',
	'match':'4',
	'flavor':'burn, baby',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet,playerFired){
				bullet.rotation+=randomRange(-.25,.25);
				bullet.loadTexture('explosions',2);
				bullet.body.angularVelocity=randomRange(600,900);
				bullet.tracking=-999;
				bullet.alpha=1.5;
				bullet.blendMode=1;
				game.physics.arcade.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);

				var tgt = ownerFromName(bullet.owner.name);
		bullet.body.velocity.x += 0.5 * tgt.sprite.body.velocity.x;
		bullet.body.velocity.y += 0.5 * tgt.sprite.body.velocity.y;
				bullet.scale.setTo(.25,.25);
				game.add.tween(bullet.scale).to({x:3,y:3},bullet.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);

				game.add.tween(bullet).to({alpha:0},bullet.lifespan, Phaser.Easing.Linear.Out, true, 0, false);
				});
		target.bulletSprite=5;
		target.attackAngleThreshold+=.25;
		target.fireSound=ui.sound_plasma;
		target.fireRate*=0.4;
		target.fireEnergy*=0.5;
		target.fireVelocity*=0.8;
		target.fireRange*=0.8;
		target.sprite.profile+=88;
	}
},
{
	'id':48,
	'drops':false,
	'name':'Container',
	'match':'4682',
	'flavor':'Containers show on radar, and also give buckets of ore.',
	'bonus':function(target){
		target.sprite.profile=500;
		target.ai=aiModes['asteroidInit'];
		target.health-=3;
		target.oreChance=1;
		target.effects=function(){

			if(Math.random() < 0.2 && onscreen(this.sprite.x,this.sprite.y)){
				lootSparkle(this.sprite);
			}
		};
	}
},
{
	'id':49,
	'drops':false,
	'name':'Component49',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':50,
	'drops':false,
	'name':'Component50',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':51,
	'drops':false,
	'name':'Component51',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':52,
	'drops':false,
	'name':'Component52',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':53,
	'drops':false,
	'name':'Component53',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':54,
	'drops':false,
	'name':'Component54',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':55,
	'drops':false,
	'name':'Component55',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':56,
	'drops':false,
	'name':'Component56',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':57,
	'drops':false,
	'name':'Component57',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':58,
	'drops':false,
	'name':'Component58',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':59,
	'drops':false,
	'name':'Component59',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':60,
	'drops':false,
	'name':'Component60',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':61,
	'drops':false,
	'name':'Component61',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':62,
	'drops':false,
	'name':'Component62',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':63,
	'drops':false,
	'name':'Component63',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':64,
	'drops':true,
	'name':'Thermal Monitoring System',
	'match':'84',
	'flavor':'warns when in enemy sensor range',
	'bonus':function(target){
		target.profileShow=true;
		target.radarTargets+=3;
	}
},
{
	'id':65,
	'drops':true,
	'name':'Worn Armor Plating',
	'match':'4682',
	'flavor':'heavy armor, increases mass',
	'bonus':function(target){
		target.health+=13;
		target.acceleration-=0.2;
		target.turnRate-=0.3;
		target.sprite.profile+=10;
	}
},
{
	'id':66,
	'drops':true,
	'name':'Discount Attitude Jet',
	'match':'862',
	'flavor':'improves turn rate, lowers maximum energy',
	'bonus':function(target){
		target.turnRate+=0.6;
		target.acceleration+=0.2;
		target.sprite.body.maxVelocity.x+=5;
		target.sprite.body.maxVelocity.y+=5;
		target.energyMax-=2;
	}
},
{
	'id':67,
	'drops':true,
	'name':'Long Range Sensor',
	'match':'4682',
	'flavor':'track many more targets',
	'bonus':function(target){
		target.radarTargets+=5;
	}
},
{
	'id':68,
	'drops':true,
	'name':'Durasteel Plating',
	'match':'4682',
	'flavor':'strong armor, inhibits aim',
	'bonus':function(target){
		target.health+=18;
		target.acceleration-=0.1;
		target.turnRate-=0.5;
		target.sprite.profile+=25;	
	}
},
{
	'id':69,
	'drops':true,
	'name':'Angular Ion Thrust',
	'match':'6',
	'flavor':'basic turning jet',
	'bonus':function(target){
		target.turnRate+=0.4;
	}
},
{
	'id':70,
	'drops':true,
	'name':'Stealth Wing',
	'match':'2',
	'flavor':'increases acceleration, makes you harder to detect',
	'bonus':function(target){
		target.acceleration+=0.6;
		target.sprite.body.maxVelocity.x+=10;
		target.sprite.body.maxVelocity.y+=10;
		target.profileDecay+=200;
	}
},
{
	'id':71,
	'drops':true,
	'name':'Command Deck',
	'match':'2',
	'flavor':'enhances many systems',
	'bonus':function(target){
		target.health+=5;
		target.turnSpeed+=0.1;
		target.acceleration+=0.1;
		target.energyMax+=4;
		target.sprite.profile+=20;	
	}
},
{
	'id':72,
	'drops':true,
	'name':'Crew Pod',
	'match':'462',
	'flavor':'improves health and energy recharge',
	'bonus':function(target){
		target.health+=6;
		target.energyRate*=0.95;
		target.sprite.profile+=10;	
	}
},
{
	'id':73,
	'drops':true,
	'name':'Mining Laser',
	'match':'4',
	'flavor':'extracts ore from asteroids',
	'bonus':function(target){
		target.fireSound=ui.sound_pew2;
		target.fireDamage+=1;
		target.fireEnergy+=2;
		target.fireRate=10;
		target.sprite.profile+=20;	
		target.bulletSprite=4;
		target.firingSolution=laserFiringSolution;
		target.bulletBehavior=[(function(bullet){
					
	laserBulletBehavior(bullet,parseInt(randomRange(4,7)),randomRange(0.3,1.8),0x20CF10,0xDDFF60,0xFFFFDD,13,
function(tgt){
				if(tgt.ai == aiModes['asteroid'] && tgt.oreChance < 1 && game.time.now>tgt.nextOre){
				spawnLoots(1,tgt.sprite.x,tgt.sprite.y)
				tgt.nextOre=game.time.now+500;
				}
		
});


		})];


	}
},
{
	'id':74,
	'drops':true,
	'name':'Habitat Module',
	'match':'26',
	'flavor':'light and tough',
	'bonus':function(target){
		target.health+=4;
		target.acceleration-=0.1;
		target.energyMax+=4;
	}
},
{
	'id':75,
	'name':'Habitat Module',
	'match':'42',
	'flavor':'light and tough',
	'drops':true,
	'bonus':function(target){

		target.health+=4;
		target.acceleration-=0.1;
		target.energyMax+=4;
	}
},
{
	'id':76,
	'drops':true,
	'name':'AWSM',
	'match':'62',
	'flavor':'press [Z] to self-destruct, destroying nearby ships',
	'bonus':function(target){

		target.altCheck=function(){
			var ret = false;
			var targetDistance = game.physics.arcade.distanceBetween(this.sprite, this.target);

			if(targetDistance < 250 && Math.random()<0.01+(0.04*((this.healthMax-this.health)/this.healthMax))){
				ret = true;
			}
			return ret;
		}

		target.alt=function(){
			ui.sound_boom1.play();
			ui.sound_boom2.play();
			hugeBoom(explosions,this.sprite.x,this.sprite.y);
			for(var i=0; i<enemies.length; i++){
				if(game.physics.arcade.distanceBetween(this.sprite, enemies[i].sprite)<500 && enemies[i].alive){
					enemies[i].damage(500);
				}
			}
			if(game.physics.arcade.distanceBetween(this.sprite,player.sprite)<500 && player.alive){
				player.damage(player.healthMax); //won't actually kill the player unless damagecoef = 1
			}
		}
	}
},
{
	'id':77,
	'drops':true,
	'name':'skul-gun',
	'match':'82',
	'flavor':'drains targets\' energy',
	'bonus':function(target){
		target.sprite.profile+=20;
		target.fireRate*=0.9;
		target.bulletHitBehavior.push(function(sprite,bullet){
				var tgt = ownerFromName(sprite.name);
				if(tgt.energy>0){				
				tgt.takeEnergy(Math.min(4,tgt.energy));
				};

				});
	}
},
{
	'id':78,
	'drops':true,
	'name':'Xenoid Navigation Unit',
	'match':'26',
	'flavor':'mysteriously causes drag',
	'bonus':function(target){
		target.turnRate+=0.5;
		target.acceleration+=0.5;
		target.energyMax+=4;
		if(target.ai!=aiModes['asteroidInit']){
			target.sprite.body.drag.x=target.sprite.body.maxVelocity.x/5;
			target.sprite.body.drag.y=target.sprite.body.maxVelocity.y/5;

		}
	}
},
{
	'id':79,
	'drops':true,
	'name':'Xenoid Pulse Laser',
	'match':'2',
	'flavor':'cheap, strong shots',
	'bonus':function(target){
		target.fireRate*=1.1;
		target.fireDamage+=1;
		target.fireSound=ui.sound_pew1;
		target.fireVelocity*=1.2;
		target.bulletSprite=4;
	}
},
{
	'id':80,
	'drops':true,
	'name':'Mechanoid Husk',
	'match':'26',
	'flavor':'armored yet maneuverable',
	'bonus':function(target){
		target.health+=4;
		target.acceleration+=0.4;
		target.sprite.body.maxVelocity.x+=10;
		target.sprite.body.maxVelocity.y+=10;
		target.turnRate+=0.2;
		target.profile+=30;
	}
},
{
	'id':81,
	'drops':true,
	'name':'Mechanoid Turret',
	'match':'24',
	'flavor':'strong tracking ability',
	'bonus':function(target){
		target.fireDamage+=1;
		target.fireRate-=100;
		target.fireEnergy+=1;
		target.fireTracking+=2;
	}
},
{
	'id':82,
	'drops':true,
	'name':'External Power Plant',
	'match':'6',
	'flavor':'ore pickups also give energy',
	'bonus':function(target){
		target.oreEnergy+=6;
	}
},
{
	'id':83,
	'drops':true,
	'name':'Force Cannon',
	'match':'4',
	'flavor':'adds knockback',
	'bonus':function(target){
		target.bulletSprite=3;

		target.bulletHitBehavior.push(function(sprite,bullet){

				addVelocity(bullet.rotation, 400, sprite.body.velocity);
				clampVelocity(sprite);
				});
	}
},
{
	'id':84,
	'drops':false,
	'name':'Crystalline Entity',
	'match':'26',
	'flavor':'increases the size of your shots',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
				bullet.scale.setTo(bullet.scale.x+0.7,bullet.scale.y+0.7);
				bullet.blendMode=1;
				});

	}
},
{
	'id':85,
	'drops':false,
	'name':'Crystalline Entity',
	'match':'42',
	'flavor':'increases the size of your shots',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
				bullet.scale.setTo(bullet.scale.x+0.7,bullet.scale.y+0.7);
				bullet.blendMode=1;
				});

	}
},
{
	'id':86,
	'drops':false,
	'name':'Collector Vine',
	'match':'26',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':87,
	'drops':false,
	'name':'Nutriment Tree',
	'match':'42',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':88,
	'drops':true,
	'name':'Petroleum Engine',
	'match':'6',
	'flavor':'shields you when you hit enemies',
	'bonus':function(target){

		target.acceleration-=0.7;
		target.fireRate*=0.7;
		target.bulletHitBehavior.push(
				function(sprite,bullet){
				var own = ownerFromName(bullet.owner.name)
				if(game.time.now>own.shieldCooldown){
				shieldEffect(explosions, 4, own.sprite.x, own.sprite.y, own.sprite.body.velocity.x, own.sprite.body.velocity.y, own.ship.length);
				}
				own.shieldCooldown=game.time.now+own.fireRate;
				own.shield=true;
				});
	}
},
{
	'id':89,
	'drops':true,
	'name':'Mars Logging Ripsaw',
	'match':'4',
	'flavor':'grapple with foes',
	'bonus':function(target){
		target.fireDamage+=2;
		target.fireEnergy+=1;
		target.fireRange*=0.6;
		target.fireVelocity*=1.4;
		target.bulletHitBehavior.push(
				function(sprite,bullet){
				bullet.owner.body.velocity.x=sprite.body.velocity.x
				bullet.owner.body.velocity.y=sprite.body.velocity.y
				}
				);		
	}
},
{
	'id':90,
	'drops':false,
	'name':'Green Reactor',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':91,
	'drops':false,
	'name':'Extended Life Support',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':92,
	'drops':true,
	'name':'Organic Armor',
	'match':'26',
	'flavor':'damage heals over time',
	'bonus':function(target){
		target.turnRate+=0.1;
		target.organicArmor+=4; 
		target.updateBehavior.push(
				function(targ){
				if(target.organicArmor>target.healthMax){
				target.healthMax=target.organicArmor;
				}	
				if(game.time.now>target.nextOrganicArmorPing && targ.health < targ.organicArmor){
				targ.health+=0.25;
				targ.nextOrganicArmorPing=game.time.now+250;
				}	
				}
				);
	}
},
{
	'id':93,
	'drops':true,
	'name':'Organic Armor',
	'match':'42',
	'flavor':'damage heals over time',
	'bonus':function(target){
		target.turnRate+=0.1;
		target.organicArmor+=4;
		target.updateBehavior.push(
				function(targ){
				if(target.organicArmor>target.healthMax){
				target.healthMax=target.organicArmor;
				}	
				if(game.time.now>target.nextOrganicArmorPing && targ.health < targ.organicArmor){
				targ.health+=0.25;
				targ.nextOrganicArmorPing=game.time.now+250;
				}	
				}
				);
	}

},
{
	'id':94,
	'drops':false,
	'name':'Component94',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':95,
	'drops':false,
	'name':'Component95',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':96,
	'drops':true,
	'name':'Pirate CPU',
	'match':'4682',
	'flavor':'track an extra target, improves firerate',
	'bonus':function(target){
		target.fireRate*=0.8;
		target.radarTargets+=1;
		target.sprite.profile+=20;	
	}
},
{
	'id':97,
	'drops':true,
	'name':'Thermal Resonator',
	'match':'4682',
	'flavor':'press [Z] to cause utter chaos',
	'bonus':function(target){
		target.altCheck=function(){
			var ret = false;
			this.energyReserve=0;
			var targetDistance = game.physics.arcade.distanceBetween(this.sprite, this.target);

			if(targetDistance < 1200 && game.time.now>this.altCooldown + 5000)
			{
				ret = true;
			}
			return ret;
		}
		target.alt=function(){
			if(game.time.now>this.altCooldown && this.takeEnergy(6)){
				ui.sound_blur.play();
				this.altCooldown=game.time.now+2000;
				bigBoom(explosions,this.sprite.x,this.sprite.y);
				if(this.ai==aiModes['player']){
					this.sprite.profile+=this.sprite.profileMax*3;
					confusionCooldown=game.time.now+8000;	
				}else{
					player.radarError=8;
				}
			}

		}
	}
},
{
	'id':98,
	'drops':true,
	'name':'Destroyed Airlock',
	'match':'2',
	'flavor':'press [Z] to unleash a damaging halo of contagion',
	'bonus':function(target){

		target.altCheck=function(){
			var ret = false;
			this.energyReserve=0;
			var targetDistance = game.physics.arcade.distanceBetween(this.sprite, this.target);

			if(targetDistance < 600 && this.altCooldown < game.time.now + 5000){
				this.energyReserve=this.fireEnergy*4;
			}
			if(targetDistance < 250)
			{
				ret = true;
			}
			return ret;
		}



		target.alt=function(){
			if(game.time.now>this.altCooldown && this.takeEnergy(this.fireEnergy*4,true)){
				this.profile+=200; //cheap!
				ui.sound_missile.play();
				for(var n=0; n<1;n+=0.075){
					var bullet=this.spawnBullet(false);
					bullet.loadTexture('explosions',7);
					bullet.reset(this.sprite.x, this.sprite.y);
					bullet.rotation=n*2*Math.PI;
					game.physics.arcade.velocityFromRotation(bullet.rotation, randomRange(25,90), bullet.body.velocity);
					bullet.alpha=0.4;
					bullet.damage=this.fireDamage*3;
					bullet.bulletSprite=4;
					bullet.scale.setTo(1,1);
					bullet.scaleValue=randomRange(4,18);
					bullet.lifespan=bullet.scaleValue*100;
					bullet.body.angularVelocity=randomRange(100,200)*randomSign();
					bullet.tracking=-999;
					bullet.blendMode=1;
					game.add.tween(bullet.scale).to({x:bullet.scale.x*bullet.scaleValue,y:bullet.scale.y*bullet.scaleValue},bullet.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);

					game.add.tween(bullet).to({alpha:0},bullet.lifespan, Phaser.Easing.Exponential.In, true, 0, false);
				}
				this.altCooldown=game.time.now+2000;

			}
		}
	}
},
{
	'id':99,
	'drops':true,
	'name':'Advanced Processor',
	'match':'4682',
	'flavor':'improves firing, maneuverability, and damage control',
	'bonus':function(target){
		target.fireRate*=0.8;
		target.turnRate+=0.3;
		target.health+=2;
		target.sprite.profile+=10;
	}
},
{
	'id':100,
	'drops':true,
	'name':'Cloaking Device',
	'match':'4682',
	'flavor':'hold [Z] to throw off attackers',
	'bonus':function(target){
		target.altCheck=function(){
			var ret = false;
			this.energyReserve=0;
			var targetDistance = game.physics.arcade.distanceBetween(this.sprite, this.target);
			var targetAngle = game.physics.arcade.angleBetween(this.target, this.sprite);

			if(targetDistance < 1500 && targetDistance > 400 && this.energy > this.energyMax * 0.5){
				ret = true;
			}
			return ret;
		}



		target.alt=function(){
			if(game.time.now>this.altCooldown && this.takeEnergy(2)){
				var targetAlpha = this.ai==aiModes['player'] ? 0.4 : 0;
				this.sprite.alpha=targetAlpha;
				if(typeof(this.cloakTween)!='undefined'){
					this.cloakTween.stop();
				}
				this.cloakTween = game.add.tween(this.sprite).to({alpha:targetAlpha},800, Phaser.Easing.Linear.None,true,0,false)
					.to({alpha:1},600, Phaser.Easing.Linear.None,true,0,false);
				if(typeof(this.parts[0])!='undefined'){
					if(this.parts[0].sprite.alpha>.5){
						midBoom(explosions,1,this.sprite.x,this.sprite.y);
						ui.sound_boop.play();
					}
					this.sprite.profile*=0.5;
					this.sprite.profile=Math.floor(this.sprite.profile);
				}

				for(var i=0;i<this.parts.length;i++){
					this.altCooldown=game.time.now+500;
					this.parts[i].sprite.alpha=0.35;
					if(this.ai!=aiModes['player']){
						this.parts[i].sprite.alpha=0;
					}
				}
			}

		}
	}
},
{
	'id':101,
	'drops':true,
	'name':'Weapon Rotator',
	'match':'4',
	'flavor':'greatly improves fire rate, but generates heat',
	'bonus':function(target){
		target.fireRate*=0.5;
		target.fireEnergy*=0.75;
		target.fireDamage+=1;
		target.bulletBehavior.push(function(bullet){bullet.owner.profile+=10});
	}
},
{
	'id':102,
	'drops':true,
	'name':'Stealth Wing',
	'match':'8',
	'flavor':'increases turn rate, makes you harder to detect',
	'bonus':function(target){
		target.turnRate+=0.5;
		target.profileDecay+=100;
	}
},
{
	'id':103,
	'drops':true,
	'name':'Command Deck',
	'match':'8',
	'flavor':'improves weapons and other critical systems',
	'bonus':function(target){
		target.fireDamage+=1;
		target.fireEnergy+=0.5;
		target.fireRate*=0.9;
		target.turnRate+=0.2;
		target.energyMax+=2;
		target.acceleration+=0.2;
	}
},
{
	'id':104,
	'drops':true,
	'name':'Inline Warp Thrust',
	'match':'46',
	'flavor':'high speed, decreases energy',
	'bonus':function(target){
		target.acceleration+=0.8;
		target.energyMax-=4;
		target.sprite.body.maxVelocity.x+=20;
		target.sprite.body.maxVelocity.y+=20;

	}
},
{
	'id':105,
	'drops':true,
	'name':'Observation Unit',
	'match':'48',
	'flavor':'extra range and track an additional target',
	'bonus':function(target){
		target.radarTargets+=1;
		target.fireRange+=500;
		target.fireVelocity+=100;
	}
},
{
	'id':106,
	'drops':true,
	'name':'Habitat Module',
	'match':'86',
	'flavor':'light and tough',
	'bonus':function(target){

		target.health+=4;
		target.acceleration-=0.1;
		target.energyMax+=4;
	}
},
{
	'id':107,
	'drops':true,
	'name':'Habitat Module',
	'match':'84',
	'flavor':'light and tough',
	'bonus':function(target){

		target.health+=4;
		target.acceleration-=0.1;
		target.energyMax+=4;
	}
},
{
	'id':108,
	'drops':true,
	'name':'Vidscreen Ad <BurgerJoint>',
	'match':'8',
	'flavor':'more drops, high profile',
	'bonus':function(target){
		target.sprite.profile+=60;
		target.dropRate+=0.016;

	}
},
{
	'id':109,
	'drops':true,
	'name':'Vidscreen Ad <Cola>',
	'match':'8',
	'flavor':'more drops, high profile',
	'bonus':function(target){
		target.sprite.profile+=60;
		target.dropRate+=0.016;
	}
},
{
	'id':110,
	'drops':true,
	'name':'Antimatter Furnace',
	'match':'862',
	'flavor':'faster energy return, very unsafe',
	'bonus':function(target){
		target.energyAmount+=4;
		target.bulletBehavior.push(function(bullet){
				var tgt = ownerFromName(bullet.owner.name);
				if(Math.random()<0.3 && tgt.health > 1){
				tgt.damage(1);
				midBoom(explosions,4,tgt.sprite.x,tgt.sprite.y);
				}
				});

	}
},
{
	'id':111,
	'drops':true,
	'name':'Transporter',
	'match':'4',
	'flavor':'press [Z] to steal a nearby enemy vessel',
	'bonus':function(target){
		if(target.ai==aiModes['player']){ //no baddie should EVER have this
			target.alt=function(){
				if(this.takeEnergy(6,true)){
					if(game.time.now>this.altCooldown){

						for(var i=0;i<ui.enemies.length;i++){		

							var targetDistance = game.physics.arcade.distanceBetween(this.sprite, ui.enemies[i].sprite);


							if(ui.enemies[i].ai!=aiModes['asteroid'] && targetDistance < 500){

								var idx = ui.enemies[i].sprite.name;
								ui.sound_boop.play();
								enemies[idx].health=0;
								bigBoom(explosions,player.x,player.y);
								player.initPlayerShip(enemies[idx].ship);
								player.sprite.reset(enemies[idx].sprite.x,enemies[idx].sprite.y);
								player.rotation = enemies[idx].rotation;
								enemies[idx].damage(9);
								break;
							}

						}
						this.altCooldown=game.time.now+2000;
					}

				}
			}
		}
	}
},
{
	'id':112,
	'drops':true,
	'name':'Mechanoid Husk',
	'match':'86',
	'flavor':'armored yet maneuverable',
	'bonus':function(target){
		target.health+=4;
		target.acceleration+=0.4;
		target.sprite.body.maxVelocity.x+=10;
		target.sprite.body.maxVelocity.y+=10;
		target.turnRate+=0.2;
		target.energyMax+=2;
		target.profile+=40;
	}
},
{
	'id':113,
	'drops':true,
	'name':'Mechanoid Jumpdrive',
	'match':'4',
	'flavor':'press [Z] to teleport',
	'bonus':function(target){

		target.altCheck=function(){
			var ret = false;
			this.energyReserve=0;
			var targetDistance = game.physics.arcade.distanceBetween(this.sprite, this.target);
			var targetAngle = game.physics.arcade.angleBetween(this.target, this.sprite);

			if(targetDistance < 1600 && this.altCooldown < game.time.now + 5000){
				this.energyReserve=0.5*this.energyMax;
			}
			if(Math.abs(compareAngles(this.target.rotation, targetAngle))<0.2)
			{
				ret = true;
			}
			return ret;
		}
		target.alt=function(){
			if(this.altCooldown<game.time.now && this.takeEnergy(0.5*this.energyMax)){
				ui.sound_boop.play();

				midBoom(explosions,1,this.sprite.x,this.sprite.y);
				midBoom(explosions,3,this.sprite.x,this.sprite.y);
				this.sprite.reset(this.sprite.x+randomRange(-2000,2000),this.sprite.y+randomRange(-2000,2000));
				midBoom(explosions,1,this.sprite.x,this.sprite.y);
				midBoom(explosions,3,this.sprite.x,this.sprite.y);
				this.altCooldown=game.time.now+2000;
				this.sprite.profile-=500;
			}
		}
		;
	}
},
{
	'id':114,
	'drops':true,
	'name':'Secured Container',
	'match':'4682',
	'flavor':'recharge energy by rapidly pressing [Z].',
	'bonus':function(target){
		if(target.ai==aiModes['player']){
			target.energyRate=60000; //slow enough
			target.alt=function(){
				//this guy has his own cooldown timer, so the user
				//has to repeatedly press [Z]; there should
				//be something in update() that resets this to 0
				//if mouse2 is up
				if(this.cooldown114<game.time.now){
					ui.sound_beep.play();
					if(this.energy+this.energyAmount>this.energyMax){
						this.energy=this.energyMax;	
					}else{
						this.energy+=this.energyAmount;
					}
					this.nextEnergy = game.time.now + this.energyRate;

					this.cooldown114=game.time.now+60000;
				}
			};
		}else{
			target.energyRate*=0.6; //baddies get all the love
		}
	}
},
{
	'id':115,
	'drops':true,
	'name':'Jagged Armor Plating',
	'match':'4',
	'flavor':'heavy armor, crash into debris to destroy it',
	'bonus':function(target){
		target.sawDamage+=12;
		target.health+=5;
		target.acceleration-=0.1;
		target.turnRate-=0.3;

	}
},
{
	'id':116,
	'drops':true,
	'name':'Crystalline Entity',
	'match':'86',
	'flavor':'increases the size of your shots',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
				bullet.scale.setTo(bullet.scale.x+0.7,bullet.scale.y+0.7);
				bullet.blendMode=1;
				});

	}
},

{
	'id':117,
	'drops':true,
	'name':'Crystalline Entity',
	'match':'84',
	'flavor':'increases the size of your shots',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
				bullet.scale.setTo(bullet.scale.x+0.7,bullet.scale.y+0.7);
				bullet.blendMode=1;
				});

	}
},
{
	'id':118,
	'drops':false,
	'name':'Propelling Fruit',
	'match':'86',
	'flavor':'increase max velocity, slow acceleration',
	'bonus':function(target){
		target.acceleration*=0.8;
		target.sprite.body.maxVelocity.x+=50;
		target.sprite.body.maxVelocity.y+=50;

	}
},
{
	'id':119,
	'drops':false,
	'name':'Roots',
	'match':'84',
	'flavor':'degrade opponent\'s acceleration',
	'bonus':function(target){
		target.bulletHitBehavior.push(function(sprite,bullet){
				var tgt = ownerFromName(sprite.name);
				if(typeof(tgt.nextRoots)=='undefined'){
				tgt.nextRoots=0;
				tgt.acceleration119=tgt.acceleration;
				};
				if(game.time.now>tgt.nextRoots){
				tgt.acceleration*0.4;
				game.add.tween(tgt).to({acceleration:tgt.acceleration119},400, Phaser.Easing.Linear.Out, true, 0, false);
				tgt.nextRoots=game.time.now+500;
				}

				tgt.sprite.body.velocity.x*=0.8;
				tgt.sprite.body.velocity.y*=0.8;
				});
	}

},
{
	'id':120,
	'drops':false,
	'name':'Annihilator Trebuchet',
	'match':'6',
	'flavor':'spiraling shots',
	'bonus':function(target){
		target.fireVelocity*=0.8;
		target.fireRange*=1.4;
		target.fireEnergy*=1.2;
		target.fireDamage+=2;
		target.bulletSprite=6;
		target.fireSound=ui.sound_bullet;
		if(target.ai==aiModes['player']){
			target.updateBehavior.push(function(targ){
					if(targ.fireTracking==0){
					bullets.forEachAlive(function(bullet){
						bullet.x+=Math.cos(bullet.rotation)*10;
						bullet.y+=Math.sin(bullet.rotation)*10;
						bullet.rotation+=game.time.physicsElapsed*20;
						});	
					}else{
					bullets.forEachAlive(function(bullet){
						var tempAngle = bullet.rotation + (Math.PI * 0.5);					
						bullet.x+=Math.cos(tempAngle)*Math.cos(bullet.lifespan/60)*500*game.time.physicsElapsed;
						bullet.y+=Math.sin(tempAngle)*Math.cos(bullet.lifespan/60)*500*game.time.physicsElapsed;
						});	
					}
					});
		}else{
			target.updateBehavior.push(function(targ){
					if(targ.fireTracking==0){
					targ.bullets.forEachAlive(function(bullet){
						if(bullet.owner==targ.sprite){
						bullet.x+=Math.cos(bullet.rotation)*10;
						bullet.y+=Math.sin(bullet.rotation)*10;
						bullet.rotation+=game.time.physicsElapsed*20;
						}
						});
					}else{	
					targ.bullets.forEachAlive(function(bullet){
						if(bullet.owner==targ.sprite){
						var tempAngle = bullet.rotation + (Math.PI * 0.5);					
						bullet.x+=Math.cos(tempAngle)*Math.cos(bullet.lifespan/60)*500*game.time.physicsElapsed;
						bullet.y+=Math.sin(tempAngle)*Math.cos(bullet.lifespan/60)*500*game.time.physicsElapsed;
						}
						});	
					}
					});

		}
	}
},
{
	'id':121,
	'drops':false,
	'name':'Spear of Destiny',
	'match':'4',
	'flavor':'shots pierce enemies',
	'bonus':function(target){
		target.bulletHitBehavior.push(function(sprite,bullet){

				var tgt = ownerFromName(sprite.name);

				var newBullet=tgt.spawnBullet(false);
				newBullet.loadTexture('bullet', bullet.bulletSprite);
				newBullet.bulletSprite=bullet.bulletSprite;
				newBullet.damage=bullet.damage;
				newBullet.body.velocity.x=bullet.body.velocity.x;
				newBullet.body.velocity.y=bullet.body.velocity.y;
				newBullet.rotation = bullet.rotation;
				newBullet.x=bullet.x;
				newBullet.y=bullet.y;
				if(Math.random()>0.5){
				newBullet.bulletHitBehavior = bullet.bulletHitBehavior;
				};
				});

	}
},
{
	'id':122,
	'drops':false,
	'name':'Orb of Damage',
	'match':'8',
	'flavor':'no aiming required',
	'bonus':function(target){
		target.bulletBehavior.push(
				function(bullet){
				bullet.body.velocity.x=0;
				bullet.body.velocity.y=0;
				bullet.alpha=0;
				game.add.tween(bullet.scale).to({x:bullet.lifespan/20,y:bullet.lifespan/20},bullet.lifespan, Phaser.Easing.Exponential.Out, true, 0, false);

				}
				);
	}	

},
{
	'id':123,
	'drops':false,
	'name':'Heisenberg Turbine',
	'match':'46',
	'flavor':'indeterminate position in combat',
	'bonus':function(target){
		target.acceleration+=0.3;
		target.sprite.body.maxVelocity.x+=10;
		target.sprite.body.maxVelocity.y+=10;
		target.bulletBehavior.push(function(bullet){
				var tgt = ownerFromName(bullet.owner.name);
				if(Math.random()<0.2*(tgt.fireRate/200)){
				midBoom(explosions,3,tgt.sprite.x,tgt.sprite.y);
				target.sprite.x+=randomRange(40,160)*randomSign();
				target.sprite.y+=randomRange(40,160)*randomSign();
				midBoom(explosions,3,tgt.sprite.x,tgt.sprite.y);
				}
				});



	}
},
{
	'id':124,
	'drops':true,
	'name':'Organic Armor',
	'match':'864',
	'flavor':'damage heals over time',
	'bonus':function(target){
		target.turnRate+=0.1;
		target.organicArmor+=4;
		target.updateBehavior.push(
				function(targ){
				if(target.organicArmor>target.healthMax){
				target.healthMax=target.organicArmor;
				}	
				if(game.time.now>target.nextOrganicArmorPing && targ.health < targ.organicArmor){
				targ.health+=0.25;
				targ.nextOrganicArmorPing=game.time.now+250;
				}	
				}
				);
	}

},
{
	'id':125,
	'drops':true,
	'name':'Organic Armor',
	'match':'84',
	'flavor':'damage heals over time',
	'bonus':function(target){
		target.turnRate+=0.1;
		target.organicArmor+=4;
		target.updateBehavior.push(
				function(targ){
				if(target.organicArmor>target.healthMax){
				target.healthMax=target.organicArmor;
				}	
				if(game.time.now>target.nextOrganicArmorPing && targ.health < targ.organicArmor){
				targ.health+=0.25;
				targ.nextOrganicArmorPing=game.time.now+250;
				}	
				}
				);
	}

},
{
	'id':126,
	'drops':false,
	'name':'Component126',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':127,
	'drops':false,
	'name':'Component127',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':128,
	'drops':true,
	'name':'Contraband Missiles',
	'match':'4682',
	'flavor':'high damage, unreliable speed',
	'bonus':function(target){
		target.bulletSprite=2;

		target.bulletBlendMode=0;
		target.fireEnergy+=2;
		target.fireDamage+=8;
		target.fireSound=ui.sound_missile;
		target.attackAngleThreshold+=0.15;
		target.bulletBehavior.push(function(bullet){bullet.body.velocity.x*=.75+Math.random()*.5;
				bullet.body.velocity.y*=.75+Math.random()*.5});

		target.fireVelocity+=100;
		target.fireEnergy+=1;
		target.sprite.profile+=25;
	}
},
{
	'id':129,
	'drops':true,
	'name':'Scavenged Exoskeleton',
	'match':'82',
	'flavor':'light frame fitted with thrusters',
	'bonus':function(target){
		target.acceleration+=0.7;
		target.turnRate+=0.1;
		target.health+=2;
		target.sprite.body.maxVelocity.x+=12;
		target.sprite.body.maxVelocity.y+=12;

	}
},
{
	'id':130,
	'drops':true,
	'name':'Aftermarket Gatling',
	'match':'8',
	'flavor':'erratic fire rate',
	'bonus':function(target){
		target.bulletSprite=1;
		target.bulletBlendMode=0;
		target.bulletBehavior.push(function(bullet){				
				var tgt = ownerFromName(bullet.owner.name);
				tgt.nextFire = game.time.now + (randomRange(0.7,1.2) * tgt.fireRate);
				});
		var fireRateDiff=200/target.fireRate;
		target.fireRate=200;
		target.fireSound=ui.sound_bullet;
		target.fireDamage*=fireRateDiff;
		target.fireEnergy*=fireRateDiff;
		target.sprite.profile+=20;
	}
},
{
	'id':131,
	'drops':true,
	'name':'Freedom Missiles',
	'match':'4682',
	'flavor':'guided, long-range',
	'bonus':function(target){
		target.bulletSprite=2;
		target.bulletBlendMode=0;
		target.fireSound=ui.sound_missile;
		target.fireTracking+=1.5;
		target.fireRange+=200;
		target.fireDamage+=2;
		target.fireEnergy+=2;
		target.sprite.profile+=15;
	}
},
{
	'id':132,
	'drops':true,
	'name':'Ultralight Wing',
	'match':'82',
	'flavor':'lightly armored, improves acceleration',
	'bonus':function(target){
		target.health+=2;
		target.acceleration+=0.5;
		target.sprite.body.maxVelocity.x+=20;
		target.sprite.body.maxVelocity.y+=20;

	}
},
{
	'id':133,
	'drops':true,
	'name':'Gleaming Autocannon',
	'match':'8',
	'flavor':'BRRRRRRAAAAAAPPPPPP',
	'bonus':function(target){
		target.bulletSprite=1;
		target.bulletBlendMode=0;
		target.fireRate*=0.7;
		target.fireSound=ui.sound_bullet;
		target.fireDamage+=1;
		target.sprite.profile+=150;
	}
},
{
	'id':134,
	'drops':true,
	'name':'Elite Wing',
	'match':'26',
	'flavor':'finest technology',
	'bonus':function(target){
		target.acceleration+=1;
		target.turnRate+=0.7;
		target.profile+=30;
		target.sprite.body.maxVelocity.x+=25;
		target.sprite.body.maxVelocity.y+=25;
	}
},
{
	'id':135,
	'drops':true,
	'name':'Elite Laser',
	'match':'42',
	'flavor':'superior accuracy',
	'bonus':function(target){
		target.fireVelocity+=800;
		target.fireSound=ui.sound_pew1;
		target.fireRate*=0.75;
		target.energyMax+=4;
		target.bulletSprite=4;
		target.sprite.profile+=50;
		target.bulletBehavior.push(function(bullet){
				bullet.scale.setTo(bullet.scale.x+2,bullet.scale.y);
				});
	}
},
{
	'id':136,
	'drops':true,
	'name':'Ancient Armor',
	'match':'26',
	'flavor':'brimming with random technology',
	'bonus':function(target){
		target.health+=8;
		target.turnRate-=0.2;
		target.acceleration-=0.3;
		target.energyAmount+=1;
	}
},
{
	'id':137,
	'drops':true,
	'name':'Ancient Armor',
	'match':'42',
	'flavor':'brimming with random technology',
	'bonus':function(target){
		target.fireDamage+=2;
		target.fireEnergy+=1;
		target.turnRate-=0.2;
		target.acceleration-=0.3;
		target.energyAmount+=1;

	}
},
{
	'id':138,
	'drops':true,
	'name':'Tank',
	'match':'26',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':139,
	'drops':true,
	'name':'Tank',
	'match':'42',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':140,
	'drops':true,
	'name':'Generic Armor',
	'match':'26',
	'flavor':'Lightweight and poor quality',
	'bonus':function(target){
		target.health+=4;
		target.acceleration+=0.05;
		target.turnRate+=0.05;
	}
},
{
	'id':141,
	'drops':true,
	'name':'Generic Armor',
	'match':'42',
	'flavor':'Lightweight and poor quality',
	'bonus':function(target){
		target.health+=4;
		target.acceleration+=0.05;
		target.turnRate+=0.05;
	
	}
},
{
	'id':142,
	'drops':true,
	'name':'Hauler Obsolete Thruster',
	'match':'426',
	'flavor':'slow, poor control',
	'bonus':function(target){
		target.acceleration+=0.3;
		target.turnRate-=0.1;
	}
},
{
	'id':143,
	'drops':true,
	'name':'Hauler Modified Cannon',
	'match':'4',
	'flavor':'still works?',
	'bonus':function(target){
		target.fireDamage+=1;
		target.fireEnergy+=1;
		target.bulletSprite=5;
		target.bulletBehavior.push(function(bullet){
				bullet.scale.setTo(2,bullet.scale.y*0.5);
		});
	}
},
{
	'id':144,
	'drops':true,
	'name':'Luxury Quarters',
	'match':'26',
	'flavor':'mostly useless in combat',
	'bonus':function(target){
		target.sprite.body.maxVelocity.x-=10;
		target.sprite.body.maxVelocity.y-=10;
		target.health+=2;
		target.acceleration-=0.1;
		target.energyMax+=2;
	}
},
{
	'id':145,
	'drops':true,
	'name':'Luxury Quarters',
	'match':'42',
	'flavor':'mostly useless in combat',
	'bonus':function(target){
		target.sprite.body.maxVelocity.x-=10;
		target.sprite.body.maxVelocity.y-=10;
		target.health+=2;
		target.acceleration-=0.1;
		target.energyMax+=2;
	
	}
},
{
	'id':146,
	'drops':false,
	'name':'Question Box',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){
		target.sprite.profile=500;
		target.ai=aiModes['asteroidInit'];
		target.health-=3;
		target.oreChance=0;
		target.nextSparkle=0;
		target.nextPulse=0;
		target.sprite.x+=randomRange(2000,8000)*randomSign();
		target.sprite.y+=randomRange(2000,8000)*randomSign();
target.sprite.alpha = 1;
		target.sprite.x+=randomRange(1000,4000)*randomSign();
target.sprite.alpha = 1;
target.questionBox = true;
target.effects=function(){

			if(this.nextSparkle < game.time.now && onscreen(this.sprite.x,this.sprite.y)){
				epicLootSparkle(this.sprite);
				this.nextSparkle = game.time.now + 100;
			}
			if (this.nextPulse < game.time.now && onscreen(this.sprite.x,this.sprite.y)){
				
		this.sprite.alpha=1;		
				game.add.tween(target.sprite).to({alpha:4},200, Phaser.Easing.Exponential.In, true, 0, false).to({alpha:1},200, Phaser.Easing.Exponential.Out, true, 0, false);
				
				this.nextPulse=game.time.now+1000;
}
		};

	}
},
{
	'id':147,
	'drops':false,
	'name':'Question Box',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':148,
	'drops':false,
	'name':'Component148',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':149,
	'drops':false,
	'name':'Component149',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':150,
	'drops':false,
	'name':'Component150',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':151,
	'drops':false,
	'name':'Component151',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':152,
	'drops':false,
	'name':'Component152',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':153,
	'drops':false,
	'name':'Component153',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':154,
	'drops':false,
	'name':'Component154',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':155,
	'drops':false,
	'name':'Component155',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':156,
	'drops':false,
	'name':'Component156',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':157,
	'drops':false,
	'name':'Component157',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':158,
	'drops':false,
	'name':'Component158',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':159,
	'drops':false,
	'name':'Component159',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':160,
	'drops':true,
	'name':'Illegal Cargo',
	'match':'4682',
	'flavor':'increases energy, attracts attention',
	'bonus':function(target){
		target.energyMax+=6;
		target.energyAmount*=1.2;
		target.sprite.profile+=100;
	}
},
{
	'id':161,
	'drops':true,
	'name':'Generic Armor',
	'match':'486',
	'flavor':'Lightweight and poor quality',
	'bonus':function(target){
		target.health+=4;
		target.acceleration+=0.05;
		target.turnRate+=0.05;
	
	}
},
{
	'id':162,
	'drops':true,
	'name':'Generic Armor',
	'match':'426',
	'flavor':'Lightweight and poor quality',
	'bonus':function(target){
		target.health+=4;
		target.acceleration+=0.05;
		target.turnRate+=0.05;
	
	}
},
{
	'id':163,
	'drops':false,
	'name':'Refuse Cannon',
	'match':'482',
	'flavor':'Spew scattering refuse at targets',
	'bonus':function(target){
		target.bulletSprite=8;
		target.bulletBlendMode=0;
		target.bulletSparkle=gasBoom;
				target.bulletBehavior.push(function(bullet){
				bullet.scale.setTo(bullet.scale.x+1.1,bullet.scale.y+0.7);
				bullet.body.angularVelocity=333;
				});

target.bulletHitBehavior.push(function(sprite,bullet){

				var tgt = ownerFromName(sprite.name);
				boom(explosions,9,bullet.x,bullet.y);
				for (var b=0;b<7;b++){

				var newBullet=tgt.spawnBullet(false);
				newBullet.loadTexture('bullet', bullet.bulletSprite);
				newBullet.bulletSprite=bullet.bulletSprite;
				newBullet.damage=bullet.damage;
				var vel = randomRange(0.9,1.4)*getHypo(bullet.body.velocity.x,bullet.body.velocity.y);
				newBullet.rotation = randomRange(0,2*Math.PI);
				game.physics.arcade.velocityFromRotation(newBullet.rotation, vel, newBullet.body.velocity);
				newBullet.lifespan=200;
				newBullet.body.angularVelocity=randomRange(200,500)*randomSign();
				newBullet.scale.setTo(randomRange(0.7,1.2),randomRange(0.7,0.12));
				newBullet.x=bullet.x;
				newBullet.y=bullet.y;
				}
				});

}
},
{
	'id':164,
	'drops':false,
	'name':'Component164',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':165,
	'drops':false,
	'name':'Component165',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':166,
	'drops':true,
	'name':'Elite Wing',
	'match':'86',
	'flavor':'finest technology',
	'bonus':function(target){
		target.acceleration+=1;
		target.turnRate+=0.7;
		target.profile+=30;
		target.sprite.body.maxVelocity.x+=25;
		target.sprite.body.maxVelocity.y+=25;

	}
},
{
	'id':167,
	'drops':true,
	'name':'Elite Command',
	'match':'84',
	'flavor':'energy, health, firerate',
	'bonus':function(target){
		target.health+=4;
		target.fireRate*=0.9;
		target.energyMax+=6;

	}
},
{
	'id':168,
	'drops':true,
	'name':'Ancient Armor',
	'match':'86',
	'flavor':'brimming with random technology',
	'bonus':function(target){
		target.health+=8;
		target.turnRate-=0.2;
		target.acceleration-=0.3;
		target.energyAmount+=1;

	}
},
{
	'id':169,
	'drops':true,
	'name':'Ancient Armor',
	'match':'84',
	'flavor':'brimming with random technology',
	'bonus':function(target){
		target.health+=16;
		target.turnRate-=0.2;
		target.acceleration-=0.4;

	}
},
{
	'id':170,
	'drops':true,
	'name':'Tank',
	'match':'86',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':171,
	'drops':true,
	'name':'Tank',
	'match':'84',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':172,
	'drops':true,
	'name':'Generic Armor',
	'match':'86',
	'flavor':'Lightweight and poor quality',
	'bonus':function(target){
		target.health+=4;
		target.acceleration+=0.05;
		target.turnRate+=0.05;
	
	}
},
{
	'id':173,
	'drops':true,
	'name':'Generic Armor',
	'match':'84',
	'flavor':'Lightweight and poor quality',
	'bonus':function(target){
		target.health+=4;
		target.acceleration+=0.05;
		target.turnRate+=0.05;
	
	}
},
{
	'id':174,
	'drops':true,
	'name':'Hauler Living Quarters',
	'match':'86',
	'flavor':'unsanitary',
	'bonus':function(target){
		target.energyAmount+=1;
		target.health-=2;		
	}
},
{
	'id':175,
	'drops':true,
	'name':'Hauler Scanner Unit',
	'match':'4',
	'flavor':'heavy, more targets and faster turns',
	'bonus':function(target){
		target.radarTargets+=3;
		target.turnRate+=0.3;	
		target.acceleration-=0.3;
	}
},
{
	'id':176,
	'drops':true,
	'name':'Luxury Quarters',
	'match':'86',
	'flavor':'mostly useless in combat',
	'bonus':function(target){
		target.sprite.body.maxVelocity.x-=10;
		target.sprite.body.maxVelocity.y-=10;
		target.health+=2;
		target.acceleration-=0.1;
		target.energyMax+=2;
	
	}
},
{
	'id':177,
	'drops':true,
	'name':'Luxury Quarters',
	'match':'84',
	'flavor':'mostly useless in combat',
	'bonus':function(target){
		target.sprite.body.maxVelocity.x-=10;
		target.sprite.body.maxVelocity.y-=10;
		target.health+=2;
		target.acceleration-=0.1;
		target.energyMax+=2;
	
	}
},
{
	'id':178,
	'drops':false,
	'name':'Question Box',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':179,
	'drops':false,
	'name':'Question Box',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':180,
	'drops':false,
	'name':'Component180',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':181,
	'drops':false,
	'name':'Component181',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':182,
	'drops':false,
	'name':'Component182',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':183,
	'drops':false,
	'name':'Component183',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':184,
	'drops':false,
	'name':'Component184',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':185,
	'drops':false,
	'name':'Component185',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':186,
	'drops':false,
	'name':'Component186',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':187,
	'drops':false,
	'name':'Component187',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':188,
	'drops':false,
	'name':'Component188',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':189,
	'drops':false,
	'name':'Component189',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':190,
	'drops':false,
	'name':'Component190',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':191,
	'drops':false,
	'name':'Component191',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':192,
	'drops':false,
	'name':'Component192',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':193,
	'drops':false,
	'name':'Component193',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':194,
	'drops':false,
	'name':'Component194',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':195,
	'drops':false,
	'name':'Component195',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':196,
	'drops':false,
	'name':'Component196',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':197,
	'drops':false,
	'name':'Component197',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':198,
	'drops':false,
	'name':'Component198',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':199,
	'drops':false,
	'name':'Component199',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':200,
	'drops':false,
	'name':'Component200',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':201,
	'drops':false,
	'name':'Component201',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':202,
	'drops':false,
	'name':'Component202',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':203,
	'drops':false,
	'name':'Component203',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':204,
	'drops':false,
	'name':'Component204',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':205,
	'drops':false,
	'name':'Component205',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':206,
	'drops':false,
	'name':'Component206',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':207,
	'drops':false,
	'name':'Component207',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':208,
	'drops':false,
	'name':'Component208',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':209,
	'drops':false,
	'name':'Component209',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':210,
	'drops':false,
	'name':'Component210',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':211,
	'drops':false,
	'name':'Component211',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':212,
	'drops':false,
	'name':'Component212',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':213,
	'drops':false,
	'name':'Component213',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':214,
	'drops':false,
	'name':'Component214',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':215,
	'drops':false,
	'name':'Component215',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':216,
	'drops':false,
	'name':'Component216',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':217,
	'drops':false,
	'name':'Component217',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':218,
	'drops':false,
	'name':'Component218',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':219,
	'drops':false,
	'name':'Component219',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':220,
	'drops':false,
	'name':'Component220',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':221,
	'drops':false,
	'name':'Component221',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':222,
	'drops':false,
	'name':'Component222',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':223,
	'drops':false,
	'name':'Component223',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':224,
	'drops':false,
	'name':'Component224',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':225,
	'drops':false,
	'name':'Component225',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':226,
	'drops':false,
	'name':'Component226',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':227,
	'drops':false,
	'name':'Component227',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':228,
	'drops':false,
	'name':'Component228',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':229,
	'drops':false,
	'name':'Component229',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':230,
	'drops':false,
	'name':'Component230',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':231,
	'drops':false,
	'name':'Component231',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':232,
	'drops':false,
	'name':'Component232',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':233,
	'drops':false,
	'name':'Component233',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':234,
	'drops':false,
	'name':'Component234',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':235,
	'drops':false,
	'name':'Component235',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':236,
	'drops':false,
	'name':'Component236',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':237,
	'drops':false,
	'name':'Component237',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':238,
	'drops':false,
	'name':'Component238',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':239,
	'drops':false,
	'name':'Component239',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':240,
	'drops':false,
	'name':'Component240',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':241,
	'drops':false,
	'name':'Component241',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':242,
	'drops':false,
	'name':'Component242',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':243,
	'drops':false,
	'name':'Component243',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':244,
	'drops':false,
	'name':'Component244',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':245,
	'drops':false,
	'name':'Component245',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':246,
	'drops':false,
	'name':'Component246',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':247,
	'drops':false,
	'name':'Component247',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':248,
	'drops':false,
	'name':'Component248',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':249,
	'drops':false,
	'name':'Component249',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':250,
	'drops':false,
	'name':'Component250',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':251,
	'drops':false,
	'name':'Component251',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':252,
	'drops':false,
	'name':'Component252',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':253,
	'drops':false,
	'name':'Component253',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':254,
	'drops':false,
	'name':'Component254',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':255,
	'drops':false,
	'name':'Component255',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':256,
	'drops':false,
	'name':'Component256',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':257,
	'drops':false,
	'name':'Component-257',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':258,
	'drops':false,
	'name':'Component-258',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':259,
	'drops':false,
	'name':'Component-259',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':260,
	'drops':false,
	'name':'Component-260',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':261,
	'drops':false,
	'name':'Component-261',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':262,
	'drops':false,
	'name':'Component-262',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':263,
	'drops':false,
	'name':'Component-263',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':264,
	'drops':false,
	'name':'Component-264',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':265,
	'drops':false,
	'name':'Component-265',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':266,
	'drops':false,
	'name':'Component-266',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':267,
	'drops':false,
	'name':'Component-267',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':268,
	'drops':false,
	'name':'Component-268',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':269,
	'drops':false,
	'name':'Component-269',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':270,
	'drops':false,
	'name':'Component-270',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':271,
	'drops':false,
	'name':'Component-271',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':272,
	'drops':false,
	'name':'Component-272',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':273,
	'drops':false,
	'name':'Component-273',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':274,
	'drops':false,
	'name':'Component-274',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':275,
	'drops':false,
	'name':'Component-275',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':276,
	'drops':false,
	'name':'Component-276',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':277,
	'drops':false,
	'name':'Component-277',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':278,
	'drops':false,
	'name':'Component-278',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':279,
	'drops':false,
	'name':'Component-279',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':280,
	'drops':false,
	'name':'Component-280',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':281,
	'drops':false,
	'name':'Component-281',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':282,
	'drops':false,
	'name':'Component-282',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':283,
	'drops':false,
	'name':'Component-283',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':284,
	'drops':false,
	'name':'Component-284',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':285,
	'drops':false,
	'name':'Component-285',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':286,
	'drops':false,
	'name':'Component-286',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':287,
	'drops':false,
	'name':'Component-287',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':288,
	'drops':false,
	'name':'Component-288',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':289,
	'drops':false,
	'name':'Component-289',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':290,
	'drops':false,
	'name':'Component-290',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':291,
	'drops':false,
	'name':'Component-291',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':292,
	'drops':false,
	'name':'Component-292',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':293,
	'drops':false,
	'name':'Component-293',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':294,
	'drops':false,
	'name':'Component-294',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':295,
	'drops':false,
	'name':'Component-295',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':296,
	'drops':false,
	'name':'Component-296',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':297,
	'drops':false,
	'name':'Component-297',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':298,
	'drops':false,
	'name':'Component-298',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':299,
	'drops':false,
	'name':'Component-299',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':300,
	'drops':false,
	'name':'Component-300',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':301,
	'drops':false,
	'name':'Component-301',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':302,
	'drops':false,
	'name':'Component-302',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':303,
	'drops':false,
	'name':'Component-303',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':304,
	'drops':false,
	'name':'Component-304',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':305,
	'drops':false,
	'name':'Component-305',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':306,
	'drops':false,
	'name':'Component-306',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':307,
	'drops':false,
	'name':'Component-307',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':308,
	'drops':false,
	'name':'Component-308',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':309,
	'drops':false,
	'name':'Component-309',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':310,
	'drops':false,
	'name':'Component-310',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':311,
	'drops':false,
	'name':'Component-311',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':312,
	'drops':false,
	'name':'Component-312',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':313,
	'drops':false,
	'name':'Component-313',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':314,
	'drops':false,
	'name':'Component-314',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':315,
	'drops':false,
	'name':'Component-315',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':316,
	'drops':false,
	'name':'Component-316',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':317,
	'drops':false,
	'name':'Component-317',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':318,
	'drops':false,
	'name':'Component-318',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':319,
	'drops':false,
	'name':'Component-319',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':320,
	'drops':false,
	'name':'Component-320',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':321,
	'drops':false,
	'name':'Component-321',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':322,
	'drops':false,
	'name':'Component-322',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':323,
	'drops':false,
	'name':'Component-323',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':324,
	'drops':false,
	'name':'Component-324',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':325,
	'drops':false,
	'name':'Component-325',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':326,
	'drops':false,
	'name':'Component-326',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':327,
	'drops':false,
	'name':'Component-327',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':328,
	'drops':false,
	'name':'Component-328',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':329,
	'drops':false,
	'name':'Component-329',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':330,
	'drops':false,
	'name':'Component-330',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':331,
	'drops':false,
	'name':'Component-331',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':332,
	'drops':false,
	'name':'Component-332',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':333,
	'drops':false,
	'name':'Component-333',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':334,
	'drops':false,
	'name':'Component-334',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':335,
	'drops':false,
	'name':'Component-335',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':336,
	'drops':false,
	'name':'Component-336',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':337,
	'drops':false,
	'name':'Component-337',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':338,
	'drops':false,
	'name':'Component-338',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':339,
	'drops':false,
	'name':'Component-339',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':340,
	'drops':false,
	'name':'Component-340',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':341,
	'drops':false,
	'name':'Component-341',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':342,
	'drops':false,
	'name':'Component-342',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':343,
	'drops':false,
	'name':'Component-343',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':344,
	'drops':false,
	'name':'Component-344',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':345,
	'drops':false,
	'name':'Component-345',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':346,
	'drops':false,
	'name':'Component-346',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':347,
	'drops':false,
	'name':'Component-347',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':348,
	'drops':false,
	'name':'Component-348',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':349,
	'drops':false,
	'name':'Component-349',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':350,
	'drops':false,
	'name':'Component-350',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':351,
	'drops':false,
	'name':'Component-351',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':352,
	'drops':false,
	'name':'Component-352',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':353,
	'drops':false,
	'name':'Component-353',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':354,
	'drops':false,
	'name':'Component-354',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':355,
	'drops':false,
	'name':'Component-355',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':356,
	'drops':false,
	'name':'Component-356',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':357,
	'drops':false,
	'name':'Component-357',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':358,
	'drops':false,
	'name':'Component-358',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':359,
	'drops':false,
	'name':'Component-359',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':360,
	'drops':false,
	'name':'Component-360',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':361,
	'drops':false,
	'name':'Component-361',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':362,
	'drops':false,
	'name':'Component-362',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':363,
	'drops':false,
	'name':'Component-363',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':364,
	'drops':false,
	'name':'Component-364',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':365,
	'drops':false,
	'name':'Component-365',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':366,
	'drops':false,
	'name':'Component-366',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':367,
	'drops':false,
	'name':'Component-367',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':368,
	'drops':false,
	'name':'Component-368',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':369,
	'drops':false,
	'name':'Component-369',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':370,
	'drops':false,
	'name':'Component-370',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':371,
	'drops':false,
	'name':'Component-371',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':372,
	'drops':false,
	'name':'Component-372',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':373,
	'drops':false,
	'name':'Component-373',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':374,
	'drops':false,
	'name':'Component-374',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':375,
	'drops':false,
	'name':'Component-375',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':376,
	'drops':false,
	'name':'Component-376',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':377,
	'drops':false,
	'name':'Component-377',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':378,
	'drops':false,
	'name':'Component-378',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':379,
	'drops':false,
	'name':'Component-379',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':380,
	'drops':false,
	'name':'Component-380',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':381,
	'drops':false,
	'name':'Component-381',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':382,
	'drops':false,
	'name':'Component-382',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':383,
	'drops':false,
	'name':'Component-383',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':384,
	'drops':false,
	'name':'Component-384',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':385,
	'drops':false,
	'name':'Component-385',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':386,
	'drops':false,
	'name':'Component-386',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':387,
	'drops':false,
	'name':'Component-387',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':388,
	'drops':false,
	'name':'Component-388',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':389,
	'drops':false,
	'name':'Component-389',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':390,
	'drops':false,
	'name':'Component-390',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':391,
	'drops':false,
	'name':'Component-391',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':392,
	'drops':false,
	'name':'Component-392',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':393,
	'drops':false,
	'name':'Component-393',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':394,
	'drops':false,
	'name':'Component-394',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':395,
	'drops':false,
	'name':'Component-395',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':396,
	'drops':false,
	'name':'Component-396',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':397,
	'drops':false,
	'name':'Component-397',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':398,
	'drops':false,
	'name':'Component-398',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':399,
	'drops':false,
	'name':'Component-399',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':400,
	'drops':false,
	'name':'Component-400',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':401,
	'drops':false,
	'name':'Component-401',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':402,
	'drops':false,
	'name':'Component-402',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':403,
	'drops':false,
	'name':'Component-403',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':404,
	'drops':false,
	'name':'Component-404',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':405,
	'drops':false,
	'name':'Component-405',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':406,
	'drops':false,
	'name':'Component-406',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':407,
	'drops':false,
	'name':'Component-407',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':408,
	'drops':false,
	'name':'Component-408',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':409,
	'drops':false,
	'name':'Component-409',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':410,
	'drops':false,
	'name':'Component-410',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':411,
	'drops':false,
	'name':'Component-411',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':412,
	'drops':false,
	'name':'Component-412',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':413,
	'drops':false,
	'name':'Component-413',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':414,
	'drops':false,
	'name':'Component-414',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':415,
	'drops':false,
	'name':'Component-415',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':416,
	'drops':false,
	'name':'Component-416',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':417,
	'drops':false,
	'name':'Component-417',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':418,
	'drops':false,
	'name':'Component-418',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':419,
	'drops':false,
	'name':'Component-419',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':420,
	'drops':false,
	'name':'Component-420',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':421,
	'drops':false,
	'name':'Component-421',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':422,
	'drops':false,
	'name':'Component-422',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':423,
	'drops':false,
	'name':'Component-423',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':424,
	'drops':false,
	'name':'Component-424',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':425,
	'drops':false,
	'name':'Component-425',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':426,
	'drops':false,
	'name':'Component-426',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':427,
	'drops':false,
	'name':'Component-427',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':428,
	'drops':false,
	'name':'Component-428',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':429,
	'drops':false,
	'name':'Component-429',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':430,
	'drops':false,
	'name':'Component-430',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':431,
	'drops':false,
	'name':'Component-431',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':432,
	'drops':false,
	'name':'Component-432',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':433,
	'drops':false,
	'name':'Component-433',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':434,
	'drops':false,
	'name':'Component-434',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':435,
	'drops':false,
	'name':'Component-435',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':436,
	'drops':false,
	'name':'Component-436',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':437,
	'drops':false,
	'name':'Component-437',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':438,
	'drops':false,
	'name':'Component-438',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':439,
	'drops':false,
	'name':'Component-439',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':440,
	'drops':false,
	'name':'Component-440',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':441,
	'drops':false,
	'name':'Component-441',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':442,
	'drops':false,
	'name':'Component-442',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':443,
	'drops':false,
	'name':'Component-443',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':444,
	'drops':false,
	'name':'Component-444',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':445,
	'drops':false,
	'name':'Component-445',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':446,
	'drops':false,
	'name':'Component-446',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':447,
	'drops':false,
	'name':'Component-447',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':448,
	'drops':false,
	'name':'Component-448',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':449,
	'drops':false,
	'name':'Component-449',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':450,
	'drops':false,
	'name':'Component-450',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':451,
	'drops':false,
	'name':'Component-451',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':452,
	'drops':false,
	'name':'Component-452',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':453,
	'drops':false,
	'name':'Component-453',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':454,
	'drops':false,
	'name':'Component-454',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':455,
	'drops':false,
	'name':'Component-455',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':456,
	'drops':false,
	'name':'Component-456',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':457,
	'drops':false,
	'name':'Component-457',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':458,
	'drops':false,
	'name':'Component-458',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':459,
	'drops':false,
	'name':'Component-459',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':460,
	'drops':false,
	'name':'Component-460',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':461,
	'drops':false,
	'name':'Component-461',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':462,
	'drops':false,
	'name':'Component-462',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':463,
	'drops':false,
	'name':'Component-463',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':464,
	'drops':false,
	'name':'Component-464',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':465,
	'drops':false,
	'name':'Component-465',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':466,
	'drops':false,
	'name':'Component-466',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':467,
	'drops':false,
	'name':'Component-467',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':468,
	'drops':false,
	'name':'Component-468',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':469,
	'drops':false,
	'name':'Component-469',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':470,
	'drops':false,
	'name':'Component-470',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':471,
	'drops':false,
	'name':'Component-471',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':472,
	'drops':false,
	'name':'Component-472',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':473,
	'drops':false,
	'name':'Component-473',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':474,
	'drops':false,
	'name':'Component-474',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':475,
	'drops':false,
	'name':'Component-475',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':476,
	'drops':false,
	'name':'Component-476',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':477,
	'drops':false,
	'name':'Component-477',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':478,
	'drops':false,
	'name':'Component-478',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':479,
	'drops':false,
	'name':'Component-479',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':480,
	'drops':false,
	'name':'Component-480',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':481,
	'drops':false,
	'name':'Component-481',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':482,
	'drops':false,
	'name':'Component-482',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':483,
	'drops':false,
	'name':'Component-483',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':484,
	'drops':false,
	'name':'Component-484',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':485,
	'drops':false,
	'name':'Component-485',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':486,
	'drops':false,
	'name':'Component-486',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':487,
	'drops':false,
	'name':'Component-487',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':488,
	'drops':false,
	'name':'Component-488',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':489,
	'drops':false,
	'name':'Component-489',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':490,
	'drops':false,
	'name':'Component-490',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':491,
	'drops':false,
	'name':'Component-491',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':492,
	'drops':false,
	'name':'Component-492',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':493,
	'drops':false,
	'name':'Component-493',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':494,
	'drops':false,
	'name':'Component-494',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':495,
	'drops':false,
	'name':'Component-495',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':496,
	'drops':false,
	'name':'Component-496',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':497,
	'drops':false,
	'name':'Component-497',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':498,
	'drops':false,
	'name':'Component-498',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':499,
	'drops':false,
	'name':'Component-499',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':500,
	'drops':false,
	'name':'Component-500',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':501,
	'drops':false,
	'name':'Component-501',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':502,
	'drops':false,
	'name':'Component-502',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':503,
	'drops':false,
	'name':'Component-503',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':504,
	'drops':false,
	'name':'Component-504',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':505,
	'drops':false,
	'name':'Component-505',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':506,
	'drops':false,
	'name':'Component-506',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':507,
	'drops':false,
	'name':'Component-507',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':508,
	'drops':false,
	'name':'Component-508',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':509,
	'drops':false,
	'name':'Component-509',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':510,
	'drops':false,
	'name':'Component-510',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':511,
	'drops':false,
	'name':'Component-511',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':512,
	'drops':false,
	'name':'Component-512',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':513,
	'drops':false,
	'name':'Component-513',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':514,
	'drops':false,
	'name':'Component-514',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':515,
	'drops':false,
	'name':'Component-515',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':516,
	'drops':false,
	'name':'Component-516',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':517,
	'drops':false,
	'name':'Component-517',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':518,
	'drops':false,
	'name':'Component-518',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':519,
	'drops':false,
	'name':'Component-519',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':520,
	'drops':false,
	'name':'Component-520',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':521,
	'drops':false,
	'name':'Component-521',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':522,
	'drops':false,
	'name':'Component-522',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':523,
	'drops':false,
	'name':'Component-523',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':524,
	'drops':false,
	'name':'Component-524',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':525,
	'drops':false,
	'name':'Component-525',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':526,
	'drops':false,
	'name':'Component-526',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':527,
	'drops':false,
	'name':'Component-527',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':528,
	'drops':false,
	'name':'Component-528',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':529,
	'drops':false,
	'name':'Component-529',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':530,
	'drops':false,
	'name':'Component-530',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':531,
	'drops':false,
	'name':'Component-531',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':532,
	'drops':false,
	'name':'Component-532',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':533,
	'drops':false,
	'name':'Component-533',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':534,
	'drops':false,
	'name':'Component-534',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':535,
	'drops':false,
	'name':'Component-535',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':536,
	'drops':false,
	'name':'Component-536',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':537,
	'drops':false,
	'name':'Component-537',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':538,
	'drops':false,
	'name':'Component-538',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':539,
	'drops':false,
	'name':'Component-539',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':540,
	'drops':false,
	'name':'Component-540',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':541,
	'drops':false,
	'name':'Component-541',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':542,
	'drops':false,
	'name':'Component-542',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':543,
	'drops':false,
	'name':'Component-543',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':544,
	'drops':false,
	'name':'Component-544',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':545,
	'drops':false,
	'name':'Component-545',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':546,
	'drops':false,
	'name':'Component-546',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':547,
	'drops':false,
	'name':'Component-547',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':548,
	'drops':false,
	'name':'Component-548',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':549,
	'drops':false,
	'name':'Component-549',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':550,
	'drops':false,
	'name':'Component-550',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':551,
	'drops':false,
	'name':'Component-551',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':552,
	'drops':false,
	'name':'Component-552',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':553,
	'drops':false,
	'name':'Component-553',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':554,
	'drops':false,
	'name':'Component-554',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':555,
	'drops':false,
	'name':'Component-555',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':556,
	'drops':false,
	'name':'Component-556',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':557,
	'drops':false,
	'name':'Component-557',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':558,
	'drops':false,
	'name':'Component-558',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':559,
	'drops':false,
	'name':'Component-559',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':560,
	'drops':false,
	'name':'Component-560',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':561,
	'drops':false,
	'name':'Component-561',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':562,
	'drops':false,
	'name':'Component-562',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':563,
	'drops':false,
	'name':'Component-563',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':564,
	'drops':false,
	'name':'Component-564',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':565,
	'drops':false,
	'name':'Component-565',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':566,
	'drops':false,
	'name':'Component-566',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':567,
	'drops':false,
	'name':'Component-567',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':568,
	'drops':false,
	'name':'Component-568',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':569,
	'drops':false,
	'name':'Component-569',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':570,
	'drops':false,
	'name':'Component-570',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':571,
	'drops':false,
	'name':'Component-571',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':572,
	'drops':false,
	'name':'Component-572',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':573,
	'drops':false,
	'name':'Component-573',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':574,
	'drops':false,
	'name':'Component-574',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':575,
	'drops':false,
	'name':'Component-575',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':576,
	'drops':false,
	'name':'Component-576',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':577,
	'drops':false,
	'name':'Component-577',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':578,
	'drops':false,
	'name':'Component-578',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':579,
	'drops':false,
	'name':'Component-579',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':580,
	'drops':false,
	'name':'Component-580',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':581,
	'drops':false,
	'name':'Component-581',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':582,
	'drops':false,
	'name':'Component-582',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':583,
	'drops':false,
	'name':'Component-583',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':584,
	'drops':false,
	'name':'Component-584',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':585,
	'drops':false,
	'name':'Component-585',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':586,
	'drops':false,
	'name':'Component-586',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':587,
	'drops':false,
	'name':'Component-587',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':588,
	'drops':false,
	'name':'Component-588',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':589,
	'drops':false,
	'name':'Component-589',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':590,
	'drops':false,
	'name':'Component-590',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':591,
	'drops':false,
	'name':'Component-591',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':592,
	'drops':false,
	'name':'Component-592',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':593,
	'drops':false,
	'name':'Component-593',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':594,
	'drops':false,
	'name':'Component-594',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':595,
	'drops':false,
	'name':'Component-595',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':596,
	'drops':false,
	'name':'Component-596',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':597,
	'drops':false,
	'name':'Component-597',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':598,
	'drops':false,
	'name':'Component-598',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':599,
	'drops':false,
	'name':'Component-599',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':600,
	'drops':false,
	'name':'Component-600',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':601,
	'drops':false,
	'name':'Component-601',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':602,
	'drops':false,
	'name':'Component-602',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':603,
	'drops':false,
	'name':'Component-603',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':604,
	'drops':false,
	'name':'Component-604',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':605,
	'drops':false,
	'name':'Component-605',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':606,
	'drops':false,
	'name':'Component-606',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':607,
	'drops':false,
	'name':'Component-607',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':608,
	'drops':false,
	'name':'Component-608',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':609,
	'drops':false,
	'name':'Component-609',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':610,
	'drops':false,
	'name':'Component-610',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':611,
	'drops':false,
	'name':'Component-611',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':612,
	'drops':false,
	'name':'Component-612',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':613,
	'drops':false,
	'name':'Component-613',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':614,
	'drops':false,
	'name':'Component-614',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':615,
	'drops':false,
	'name':'Component-615',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':616,
	'drops':false,
	'name':'Component-616',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':617,
	'drops':false,
	'name':'Component-617',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':618,
	'drops':false,
	'name':'Component-618',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':619,
	'drops':false,
	'name':'Component-619',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':620,
	'drops':false,
	'name':'Component-620',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':621,
	'drops':false,
	'name':'Component-621',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':622,
	'drops':false,
	'name':'Component-622',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':623,
	'drops':false,
	'name':'Component-623',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':624,
	'drops':false,
	'name':'Component-624',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':625,
	'drops':false,
	'name':'Component-625',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':626,
	'drops':false,
	'name':'Component-626',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':627,
	'drops':false,
	'name':'Component-627',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':628,
	'drops':false,
	'name':'Component-628',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':629,
	'drops':false,
	'name':'Component-629',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':630,
	'drops':false,
	'name':'Component-630',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':631,
	'drops':false,
	'name':'Component-631',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':632,
	'drops':false,
	'name':'Component-632',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':633,
	'drops':false,
	'name':'Component-633',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':634,
	'drops':false,
	'name':'Component-634',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':635,
	'drops':false,
	'name':'Component-635',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':636,
	'drops':false,
	'name':'Component-636',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':637,
	'drops':false,
	'name':'Component-637',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':638,
	'drops':false,
	'name':'Component-638',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':639,
	'drops':false,
	'name':'Component-639',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':640,
	'drops':false,
	'name':'Component-640',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':641,
	'drops':false,
	'name':'Component-641',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':642,
	'drops':false,
	'name':'Component-642',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':643,
	'drops':false,
	'name':'Component-643',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':644,
	'drops':false,
	'name':'Component-644',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':645,
	'drops':false,
	'name':'Component-645',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':646,
	'drops':false,
	'name':'Component-646',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':647,
	'drops':false,
	'name':'Component-647',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':648,
	'drops':false,
	'name':'Component-648',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':649,
	'drops':false,
	'name':'Component-649',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':650,
	'drops':false,
	'name':'Component-650',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':651,
	'drops':false,
	'name':'Component-651',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':652,
	'drops':false,
	'name':'Component-652',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':653,
	'drops':false,
	'name':'Component-653',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':654,
	'drops':false,
	'name':'Component-654',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':655,
	'drops':false,
	'name':'Component-655',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':656,
	'drops':false,
	'name':'Component-656',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':657,
	'drops':false,
	'name':'Component-657',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':658,
	'drops':false,
	'name':'Component-658',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':659,
	'drops':false,
	'name':'Component-659',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':660,
	'drops':false,
	'name':'Component-660',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':661,
	'drops':false,
	'name':'Component-661',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':662,
	'drops':false,
	'name':'Component-662',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':663,
	'drops':false,
	'name':'Component-663',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':664,
	'drops':false,
	'name':'Component-664',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':665,
	'drops':false,
	'name':'Component-665',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':666,
	'drops':false,
	'name':'Component-666',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':667,
	'drops':false,
	'name':'Component-667',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':668,
	'drops':false,
	'name':'Component-668',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':669,
	'drops':false,
	'name':'Component-669',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':670,
	'drops':false,
	'name':'Component-670',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':671,
	'drops':false,
	'name':'Component-671',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':672,
	'drops':false,
	'name':'Component-672',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':673,
	'drops':false,
	'name':'Component-673',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':674,
	'drops':false,
	'name':'Component-674',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':675,
	'drops':false,
	'name':'Component-675',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':676,
	'drops':false,
	'name':'Component-676',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':677,
	'drops':false,
	'name':'Component-677',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':678,
	'drops':false,
	'name':'Component-678',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':679,
	'drops':false,
	'name':'Component-679',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':680,
	'drops':false,
	'name':'Component-680',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':681,
	'drops':false,
	'name':'Component-681',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':682,
	'drops':false,
	'name':'Component-682',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':683,
	'drops':false,
	'name':'Component-683',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':684,
	'drops':false,
	'name':'Component-684',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':685,
	'drops':false,
	'name':'Component-685',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':686,
	'drops':false,
	'name':'Component-686',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':687,
	'drops':false,
	'name':'Component-687',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':688,
	'drops':false,
	'name':'Component-688',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':689,
	'drops':false,
	'name':'Component-689',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':690,
	'drops':false,
	'name':'Component-690',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':691,
	'drops':false,
	'name':'Component-691',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':692,
	'drops':false,
	'name':'Component-692',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':693,
	'drops':false,
	'name':'Component-693',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':694,
	'drops':false,
	'name':'Component-694',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':695,
	'drops':false,
	'name':'Component-695',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':696,
	'drops':false,
	'name':'Component-696',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':697,
	'drops':false,
	'name':'Component-697',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':698,
	'drops':false,
	'name':'Component-698',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':699,
	'drops':false,
	'name':'Component-699',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':700,
	'drops':false,
	'name':'Component-700',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':701,
	'drops':false,
	'name':'Component-701',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':702,
	'drops':false,
	'name':'Component-702',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':703,
	'drops':false,
	'name':'Component-703',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':704,
	'drops':false,
	'name':'Component-704',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':705,
	'drops':false,
	'name':'Component-705',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':706,
	'drops':false,
	'name':'Component-706',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':707,
	'drops':false,
	'name':'Component-707',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':708,
	'drops':false,
	'name':'Component-708',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':709,
	'drops':false,
	'name':'Component-709',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':710,
	'drops':false,
	'name':'Component-710',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':711,
	'drops':false,
	'name':'Component-711',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':712,
	'drops':false,
	'name':'Component-712',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':713,
	'drops':false,
	'name':'Component-713',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':714,
	'drops':false,
	'name':'Component-714',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':715,
	'drops':false,
	'name':'Component-715',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':716,
	'drops':false,
	'name':'Component-716',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':717,
	'drops':false,
	'name':'Component-717',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':718,
	'drops':false,
	'name':'Component-718',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':719,
	'drops':false,
	'name':'Component-719',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':720,
	'drops':false,
	'name':'Component-720',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':721,
	'drops':false,
	'name':'Component-721',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':722,
	'drops':false,
	'name':'Component-722',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':723,
	'drops':false,
	'name':'Component-723',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':724,
	'drops':false,
	'name':'Component-724',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':725,
	'drops':false,
	'name':'Component-725',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':726,
	'drops':false,
	'name':'Component-726',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':727,
	'drops':false,
	'name':'Component-727',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':728,
	'drops':false,
	'name':'Component-728',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':729,
	'drops':false,
	'name':'Component-729',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':730,
	'drops':false,
	'name':'Component-730',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':731,
	'drops':false,
	'name':'Component-731',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':732,
	'drops':false,
	'name':'Component-732',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':733,
	'drops':false,
	'name':'Component-733',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':734,
	'drops':false,
	'name':'Component-734',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':735,
	'drops':false,
	'name':'Component-735',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':736,
	'drops':false,
	'name':'Component-736',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':737,
	'drops':false,
	'name':'Component-737',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':738,
	'drops':false,
	'name':'Component-738',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':739,
	'drops':false,
	'name':'Component-739',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':740,
	'drops':false,
	'name':'Component-740',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':741,
	'drops':false,
	'name':'Component-741',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':742,
	'drops':false,
	'name':'Component-742',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':743,
	'drops':false,
	'name':'Component-743',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':744,
	'drops':false,
	'name':'Component-744',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':745,
	'drops':false,
	'name':'Component-745',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':746,
	'drops':false,
	'name':'Component-746',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':747,
	'drops':false,
	'name':'Component-747',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':748,
	'drops':false,
	'name':'Component-748',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':749,
	'drops':false,
	'name':'Component-749',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':750,
	'drops':false,
	'name':'Component-750',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':751,
	'drops':false,
	'name':'Component-751',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':752,
	'drops':false,
	'name':'Component-752',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':753,
	'drops':false,
	'name':'Component-753',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':754,
	'drops':false,
	'name':'Component-754',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':755,
	'drops':false,
	'name':'Component-755',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':756,
	'drops':false,
	'name':'Component-756',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':757,
	'drops':false,
	'name':'Component-757',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':758,
	'drops':false,
	'name':'Component-758',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':759,
	'drops':false,
	'name':'Component-759',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':760,
	'drops':false,
	'name':'Component-760',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':761,
	'drops':false,
	'name':'Component-761',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':762,
	'drops':false,
	'name':'Component-762',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':763,
	'drops':false,
	'name':'Component-763',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':764,
	'drops':false,
	'name':'Component-764',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':765,
	'drops':false,
	'name':'Component-765',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':766,
	'drops':false,
	'name':'Component-766',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':767,
	'drops':false,
	'name':'Component-767',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':768,
	'drops':false,
	'name':'Component-768',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':769,
	'drops':false,
	'name':'Component-769',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':770,
	'drops':false,
	'name':'Component-770',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':771,
	'drops':false,
	'name':'Component-771',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':772,
	'drops':false,
	'name':'Component-772',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':773,
	'drops':false,
	'name':'Component-773',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':774,
	'drops':false,
	'name':'Component-774',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':775,
	'drops':false,
	'name':'Component-775',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':776,
	'drops':false,
	'name':'Component-776',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':777,
	'drops':false,
	'name':'Component-777',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':778,
	'drops':false,
	'name':'Component-778',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':779,
	'drops':false,
	'name':'Component-779',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':780,
	'drops':false,
	'name':'Component-780',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':781,
	'drops':false,
	'name':'Component-781',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':782,
	'drops':false,
	'name':'Component-782',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':783,
	'drops':false,
	'name':'Component-783',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':784,
	'drops':false,
	'name':'Component-784',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':785,
	'drops':false,
	'name':'Component-785',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':786,
	'drops':false,
	'name':'Component-786',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':787,
	'drops':false,
	'name':'Component-787',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':788,
	'drops':false,
	'name':'Component-788',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':789,
	'drops':false,
	'name':'Component-789',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':790,
	'drops':false,
	'name':'Component-790',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':791,
	'drops':false,
	'name':'Component-791',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':792,
	'drops':false,
	'name':'Component-792',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':793,
	'drops':false,
	'name':'Component-793',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':794,
	'drops':false,
	'name':'Component-794',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':795,
	'drops':false,
	'name':'Component-795',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':796,
	'drops':false,
	'name':'Component-796',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':797,
	'drops':false,
	'name':'Component-797',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':798,
	'drops':false,
	'name':'Component-798',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':799,
	'drops':false,
	'name':'Component-799',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':800,
	'drops':false,
	'name':'Component-800',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':801,
	'drops':false,
	'name':'Component-801',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':802,
	'drops':false,
	'name':'Component-802',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':803,
	'drops':false,
	'name':'Component-803',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':804,
	'drops':false,
	'name':'Component-804',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':805,
	'drops':false,
	'name':'Component-805',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':806,
	'drops':false,
	'name':'Component-806',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':807,
	'drops':false,
	'name':'Component-807',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':808,
	'drops':false,
	'name':'Component-808',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':809,
	'drops':false,
	'name':'Component-809',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':810,
	'drops':false,
	'name':'Component-810',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':811,
	'drops':false,
	'name':'Component-811',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':812,
	'drops':false,
	'name':'Component-812',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':813,
	'drops':false,
	'name':'Component-813',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':814,
	'drops':false,
	'name':'Component-814',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':815,
	'drops':false,
	'name':'Component-815',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':816,
	'drops':false,
	'name':'Component-816',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':817,
	'drops':false,
	'name':'Component-817',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':818,
	'drops':false,
	'name':'Component-818',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':819,
	'drops':false,
	'name':'Component-819',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':820,
	'drops':false,
	'name':'Component-820',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':821,
	'drops':false,
	'name':'Component-821',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':822,
	'drops':false,
	'name':'Component-822',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':823,
	'drops':false,
	'name':'Component-823',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':824,
	'drops':false,
	'name':'Component-824',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':825,
	'drops':false,
	'name':'Component-825',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':826,
	'drops':false,
	'name':'Component-826',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':827,
	'drops':false,
	'name':'Component-827',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':828,
	'drops':false,
	'name':'Component-828',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':829,
	'drops':false,
	'name':'Component-829',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':830,
	'drops':false,
	'name':'Component-830',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':831,
	'drops':false,
	'name':'Component-831',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':832,
	'drops':false,
	'name':'Component-832',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':833,
	'drops':false,
	'name':'Component-833',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':834,
	'drops':false,
	'name':'Component-834',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':835,
	'drops':false,
	'name':'Component-835',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':836,
	'drops':false,
	'name':'Component-836',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':837,
	'drops':false,
	'name':'Component-837',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':838,
	'drops':false,
	'name':'Component-838',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':839,
	'drops':false,
	'name':'Component-839',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':840,
	'drops':false,
	'name':'Component-840',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':841,
	'drops':false,
	'name':'Component-841',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':842,
	'drops':false,
	'name':'Component-842',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':843,
	'drops':false,
	'name':'Component-843',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':844,
	'drops':false,
	'name':'Component-844',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':845,
	'drops':false,
	'name':'Component-845',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':846,
	'drops':false,
	'name':'Component-846',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':847,
	'drops':false,
	'name':'Component-847',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':848,
	'drops':false,
	'name':'Component-848',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':849,
	'drops':false,
	'name':'Component-849',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':850,
	'drops':false,
	'name':'Component-850',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':851,
	'drops':false,
	'name':'Component-851',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':852,
	'drops':false,
	'name':'Component-852',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':853,
	'drops':false,
	'name':'Component-853',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':854,
	'drops':false,
	'name':'Component-854',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':855,
	'drops':false,
	'name':'Component-855',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':856,
	'drops':false,
	'name':'Component-856',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':857,
	'drops':false,
	'name':'Component-857',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':858,
	'drops':false,
	'name':'Component-858',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':859,
	'drops':false,
	'name':'Component-859',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':860,
	'drops':false,
	'name':'Component-860',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':861,
	'drops':false,
	'name':'Component-861',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':862,
	'drops':false,
	'name':'Component-862',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':863,
	'drops':false,
	'name':'Component-863',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':864,
	'drops':false,
	'name':'Component-864',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':865,
	'drops':false,
	'name':'Component-865',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':866,
	'drops':false,
	'name':'Component-866',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':867,
	'drops':false,
	'name':'Component-867',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':868,
	'drops':false,
	'name':'Component-868',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':869,
	'drops':false,
	'name':'Component-869',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':870,
	'drops':false,
	'name':'Component-870',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':871,
	'drops':false,
	'name':'Component-871',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':872,
	'drops':false,
	'name':'Component-872',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':873,
	'drops':false,
	'name':'Component-873',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':874,
	'drops':false,
	'name':'Component-874',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':875,
	'drops':false,
	'name':'Component-875',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':876,
	'drops':false,
	'name':'Component-876',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':877,
	'drops':false,
	'name':'Component-877',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':878,
	'drops':false,
	'name':'Component-878',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':879,
	'drops':false,
	'name':'Component-879',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':880,
	'drops':false,
	'name':'Component-880',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':881,
	'drops':false,
	'name':'Component-881',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':882,
	'drops':false,
	'name':'Component-882',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':883,
	'drops':false,
	'name':'Component-883',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':884,
	'drops':false,
	'name':'Component-884',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':885,
	'drops':false,
	'name':'Component-885',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':886,
	'drops':false,
	'name':'Component-886',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':887,
	'drops':false,
	'name':'Component-887',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':888,
	'drops':false,
	'name':'Component-888',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':889,
	'drops':false,
	'name':'Component-889',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':890,
	'drops':false,
	'name':'Component-890',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':891,
	'drops':false,
	'name':'Component-891',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':892,
	'drops':false,
	'name':'Component-892',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':893,
	'drops':false,
	'name':'Component-893',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':894,
	'drops':false,
	'name':'Component-894',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':895,
	'drops':false,
	'name':'Component-895',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':896,
	'drops':false,
	'name':'Component-896',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':897,
	'drops':false,
	'name':'Component-897',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':898,
	'drops':false,
	'name':'Component-898',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':899,
	'drops':false,
	'name':'Component-899',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':900,
	'drops':false,
	'name':'Component-900',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':901,
	'drops':false,
	'name':'Component-901',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':902,
	'drops':false,
	'name':'Component-902',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':903,
	'drops':false,
	'name':'Component-903',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':904,
	'drops':false,
	'name':'Component-904',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':905,
	'drops':false,
	'name':'Component-905',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':906,
	'drops':false,
	'name':'Component-906',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':907,
	'drops':false,
	'name':'Component-907',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':908,
	'drops':false,
	'name':'Component-908',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':909,
	'drops':false,
	'name':'Component-909',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':910,
	'drops':false,
	'name':'Component-910',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':911,
	'drops':false,
	'name':'Component-911',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':912,
	'drops':false,
	'name':'Component-912',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':913,
	'drops':false,
	'name':'Component-913',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':914,
	'drops':false,
	'name':'Component-914',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':915,
	'drops':false,
	'name':'Component-915',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':916,
	'drops':false,
	'name':'Component-916',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':917,
	'drops':false,
	'name':'Component-917',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':918,
	'drops':false,
	'name':'Component-918',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':919,
	'drops':false,
	'name':'Component-919',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':920,
	'drops':false,
	'name':'Component-920',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':921,
	'drops':false,
	'name':'Component-921',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':922,
	'drops':false,
	'name':'Component-922',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':923,
	'drops':false,
	'name':'Component-923',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':924,
	'drops':false,
	'name':'Component-924',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':925,
	'drops':false,
	'name':'Component-925',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':926,
	'drops':false,
	'name':'Component-926',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':927,
	'drops':false,
	'name':'Component-927',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':928,
	'drops':false,
	'name':'Component-928',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':929,
	'drops':false,
	'name':'Component-929',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':930,
	'drops':false,
	'name':'Component-930',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':931,
	'drops':false,
	'name':'Component-931',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':932,
	'drops':false,
	'name':'Component-932',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':933,
	'drops':false,
	'name':'Component-933',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':934,
	'drops':false,
	'name':'Component-934',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':935,
	'drops':false,
	'name':'Component-935',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':936,
	'drops':false,
	'name':'Component-936',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':937,
	'drops':false,
	'name':'Component-937',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':938,
	'drops':false,
	'name':'Component-938',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':939,
	'drops':false,
	'name':'Component-939',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':940,
	'drops':false,
	'name':'Component-940',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':941,
	'drops':false,
	'name':'Component-941',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':942,
	'drops':false,
	'name':'Component-942',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':943,
	'drops':false,
	'name':'Component-943',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':944,
	'drops':false,
	'name':'Component-944',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':945,
	'drops':false,
	'name':'Component-945',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':946,
	'drops':false,
	'name':'Component-946',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':947,
	'drops':false,
	'name':'Component-947',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':948,
	'drops':false,
	'name':'Component-948',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':949,
	'drops':false,
	'name':'Component-949',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':950,
	'drops':false,
	'name':'Component-950',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':951,
	'drops':false,
	'name':'Component-951',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':952,
	'drops':false,
	'name':'Component-952',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':953,
	'drops':false,
	'name':'Component-953',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':954,
	'drops':false,
	'name':'Component-954',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':955,
	'drops':false,
	'name':'Component-955',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':956,
	'drops':false,
	'name':'Component-956',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':957,
	'drops':false,
	'name':'Component-957',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':958,
	'drops':false,
	'name':'Component-958',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':959,
	'drops':false,
	'name':'Component-959',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':960,
	'drops':false,
	'name':'Component-960',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':961,
	'drops':false,
	'name':'Component-961',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':962,
	'drops':false,
	'name':'Component-962',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':963,
	'drops':false,
	'name':'Component-963',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':964,
	'drops':false,
	'name':'Component-964',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':965,
	'drops':false,
	'name':'Component-965',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':966,
	'drops':false,
	'name':'Component-966',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':967,
	'drops':false,
	'name':'Component-967',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':968,
	'drops':false,
	'name':'Component-968',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':969,
	'drops':false,
	'name':'Component-969',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':970,
	'drops':false,
	'name':'Component-970',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':971,
	'drops':false,
	'name':'Component-971',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':972,
	'drops':false,
	'name':'Component-972',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':973,
	'drops':false,
	'name':'Component-973',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':974,
	'drops':false,
	'name':'Component-974',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':975,
	'drops':false,
	'name':'Component-975',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':976,
	'drops':false,
	'name':'Component-976',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':977,
	'drops':false,
	'name':'Component-977',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':978,
	'drops':false,
	'name':'Component-978',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':979,
	'drops':false,
	'name':'Component-979',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':980,
	'drops':false,
	'name':'Component-980',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':981,
	'drops':false,
	'name':'Component-981',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':982,
	'drops':false,
	'name':'Component-982',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':983,
	'drops':false,
	'name':'Component-983',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':984,
	'drops':false,
	'name':'Component-984',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':985,
	'drops':false,
	'name':'Component-985',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':986,
	'drops':false,
	'name':'Component-986',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':987,
	'drops':false,
	'name':'Component-987',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':988,
	'drops':false,
	'name':'Component-988',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':989,
	'drops':false,
	'name':'Component-989',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':990,
	'drops':false,
	'name':'Component-990',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':991,
	'drops':false,
	'name':'Component-991',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':992,
	'drops':false,
	'name':'Component-992',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':993,
	'drops':false,
	'name':'Component-993',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':994,
	'drops':false,
	'name':'Component-994',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':995,
	'drops':false,
	'name':'Component-995',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':996,
	'drops':false,
	'name':'Component-996',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':997,
	'drops':false,
	'name':'Component-997',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':998,
	'drops':false,
	'name':'Component-998',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':999,
	'drops':false,
	'name':'Component-999',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1000,
	'drops':false,
	'name':'Component-1000',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1001,
	'drops':false,
	'name':'Component-1001',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1002,
	'drops':false,
	'name':'Component-1002',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1003,
	'drops':false,
	'name':'Component-1003',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1004,
	'drops':false,
	'name':'Component-1004',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1005,
	'drops':false,
	'name':'Component-1005',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1006,
	'drops':false,
	'name':'Component-1006',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1007,
	'drops':false,
	'name':'Component-1007',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1008,
	'drops':false,
	'name':'Component-1008',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1009,
	'drops':false,
	'name':'Component-1009',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1010,
	'drops':false,
	'name':'Component-1010',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1011,
	'drops':false,
	'name':'Component-1011',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1012,
	'drops':false,
	'name':'Component-1012',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1013,
	'drops':false,
	'name':'Component-1013',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1014,
	'drops':false,
	'name':'Component-1014',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1015,
	'drops':false,
	'name':'Component-1015',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1016,
	'drops':false,
	'name':'Component-1016',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1017,
	'drops':false,
	'name':'Component-1017',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1018,
	'drops':false,
	'name':'Component-1018',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1019,
	'drops':false,
	'name':'Component-1019',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1020,
	'drops':false,
	'name':'Component-1020',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1021,
	'drops':false,
	'name':'Component-1021',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1022,
	'drops':false,
	'name':'Component-1022',
	'match':'4682',
	'flavor':'--',
	'bonus':function(target){

	}
},{
	'id':1023,
	'drops':false,
	'name':'Component1023',
	'match':'4682',
	'flavor':'void',
	'bonus':function(target){
	}
}	
];

var components=[];

for (var i=0;i<cmp.length;i++) {
	components[cmp[i].id]=cmp[i];

};

