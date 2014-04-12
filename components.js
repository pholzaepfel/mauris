var cmp = [
{	
	'id':0, 
	'drops':false,
	'name':'Component0',
	'flavor':'-',
	'bonus':function(target){}
},
{
	'id':1,
	'drops':true,
	'name':'Rusted Wing',
	'flavor':'improves maneuverability, inhibits energy return',
	'bonus':function(target){
		target.turnRate+=0.9;
		target.acceleration+=0.6;
		target.energyRate+=100;
	}
},
{
	'id':2,
	'drops':true,
	'name':'Ancient Railgun',
	'flavor':'fires long-ranged slugs, slow rate of fire',
	'bonus':function(target){
		target.bulletSprite=3;
		target.fireEnergy+=1;
		target.fireRange+=1000;
		target.fireDamage+=1;
		target.fireSound=ui.sound_bullet;
		target.fireRate+=200;
		target.fireVelocity+=150;
		target.sprite.profile+=25;
	}
},
{
	'id':3,
	'drops':true,
	'name':'Capacitor Unit',
	'flavor':'basic energy storage',
	'bonus':function(target){
		target.energyMax+=6;
		target.energyRate*=0.9;
	}
},
{
	'id':4,
	'drops':true,
	'name':'VariJet',
	'flavor':'press RIGHT MOUSE to rocket backwards',
	'bonus':function(target){
		target.ai=4; //accurate
		target.turnRate+=0.4;
		target.acceleration+=0.2;
		target.alt=function(){
			if(this.energy>=6 &&
				this.altCooldown<game.time.now){
				ui.sound_plasma.play();
				this.altCooldown=game.time.now+1000;
				this.energy-=6;
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
	'flavor':'flashy and attracts attention',
	'bonus':function(target){
		target.fireVelocity+=200;
		target.fireRate*=0.25;
		target.bulletSprite=3;
		target.sprite.profile+=50;
	}
},
{
	'id':6,
	'drops':false,
	'name':'Alien Pustule',
	'flavor':'-',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.sprite.profile+=10;
	}
},
{
	'id':7,
	'drops':false,
	'name':'Alien Pustule',
	'flavor':'-',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.sprite.profile+=10;
	}
},
{
	'id':8,
	'drops':true,
	'name':'Shield Generator',
	'flavor':'press RIGHT MOUSE for invincibility',
	'bonus':function(target){
		target.alt=function(){
			if(this.energy>=0.1){				
				this.energy-=0.1;
				if(game.time.now > this.altCooldown){
					ui.sound_boop.play();
					this.altCooldown=game.time.now+100;
					this.shield=true;
					shieldEffect(explosions, 4, this.sprite.x, this.sprite.y, this.sprite.body.velocity.x, this.sprite.body.velocity.y);
				}
			}
		}
	}
},
{
	'id':9,
	'drops':true,
	'name':'Mineral Scanner',
	'flavor':'track more enemies and find more loot',
	'bonus':function(target){
		target.radarTargets+=1;
		target.dropRate+=0.008;
	}
},
{
	'id':10,
	'drops':true,
	'name':'Fusion Core',
	'flavor':'improves recharge speed and maneuverability',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyRate*=0.9;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':11,
	'drops':true,
	'name':'Fusion Core',
	'flavor':'improves recharge speed and maneuverability',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyRate*=0.9;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':12,
	'drops':true,
	'name':'Xenoform Reactor',
	'flavor':'hums with power. very valuable',
	'bonus':function(target){
		target.energyRate*=0.7;
		target.sprite.profile+=100;
	}
},
{
	'id':13,
	'drops':true,
	'name':'Fusion Bolt Cannon',
	'flavor':'covered in warnings in multiple languages',
	'bonus':function(target){
		target.bulletSprite=5; 
		target.fireEnergy*=2;
		target.fireDamage*=2;

		target.fireSound=ui.sound_boom2;
		target.fireRate*=1.5;
		target.fireVelocity*=2;
		target.sprite.profile+=200;
	}
},
{
	'id':14,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;
	}
},
{
	'id':15,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){

		target.ai=2;
		target.health+=0.25;
	}
},
{
	'id':16,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;

	}
},
{
	'id':17,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;

	}
},
{
	'id':18,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;

	}
},
{
	'id':19,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;

	}
},
{
	'id':20,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;

	}
},
{
	'id':21,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;

	}
},
{
	'id':22,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;

	}
},
{
	'id':23,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;

	}
},
{
	'id':24,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;

	}
},
{
	'id':25,
	'drops':false,
	'name':'Asteroid',
	'flavor':'-',
	'bonus':function(target){
		target.ai=2;
		target.health+=0.25;

	}
},
{
	'id':26,
	'drops':false,
	'name':'Loot',
	'flavor':'-',
	'bonus':function(target){

	}
},
{
	'id':27,
	'drops':false,
	'name':'Loot',
	'flavor':'-',
	'bonus':function(target){

	}
},
{
	'id':28,
	'drops':false,
	'name':'Loot',
	'flavor':'-',
	'bonus':function(target){

	}
},
{
	'id':29,
	'drops':false,
	'name':'Loot',
	'flavor':'-',
	'bonus':function(target){

	}
},
{
	'id':30,
	'drops':true,
	'name':'Battle-worn Panel',
	'flavor':'medium armor, bonus damage',
	'bonus':function(target){
		target.health+=6;
		target.fireDamage+=1;
		target.acceleration*=0.7;
	}
},
{
	'id':31,
	'drops':true,
	'name':'Reeunk Afterburner',
	'flavor':'hold RIGHT MOUSE to blaze forward and burn enemies in your wake',
	'bonus':function(target){
		target.acceleration+=0.2;
		target.alt=function(){
			if(this.energy>=1){
				if(game.time.now>this.altCooldown){
					ui.sound_plasma.play();
					this.energy-=1;
					this.sprite.body.velocity.x+=Math.cos(this.sprite.rotation)*50;
					this.sprite.body.velocity.y+=Math.sin(this.sprite.rotation)*50;
					this.speed=this.acceleration;
					var bullet=this.spawnBullet();
					bullet.loadTexture('explosions',2);
					bullet.bulletSprite=2;
					bullet.reset(this.sprite.x - (Math.cos(this.sprite.rotation)*(this.sprite.body.width)), this.sprite.y - (Math.sin(this.sprite.rotation)*(this.sprite.body.width)));
					boom(explosions,2,bullet.x,bullet.y);
					bullet.rotation=Math.random()*Math.PI;
					bullet.alpha=0.4;
					bullet.damage=6;
					bullet.body.velocity.x=0;
					bullet.body.velocity.y=0;
					bullet.scale.setTo(2,2);
					bullet.lifespan=1666;
					bullet.body.angularVelocity=666;
					this.altCooldown=game.time.now+100;
				}

			}
		}

	}
},
{
	'id':32,
	'drops':true,
	'name':'Radioactive Thruster',
	'flavor':'mostly safe',
	'bonus':function(target){
		target.acceleration+=1;
		target.turnRate+=0.2;
		target.health-=1;
	}
},
{
	'id':33,
	'drops':true,
	'name':'Derelict Crewpod',
	'flavor':'extra crewhands speed energy regeneration',
	'bonus':function(target){
		target.health+=2;
		target.energyRate*=0.8;
		target.acceleration+=0.1;
		target.sprite.profile+=10;
	}
},
{
	'id':34,
	'drops':true,
	'name':'Filthy Cockpit',
	'flavor':'still reliable and fast!',
	'bonus':function(target){
		target.turnRate+=0.3;
		target.acceleration+=0.2;
		target.health+=4;
	}
},
{
	'id':35,
	'drops':true,
	'name':'Fusion Thrust',
	'flavor':'clean energy thruster',
	'bonus':function(target){
		target.acceleration+=0.7;
		target.health+=1;
	}
},
{
	'id':36,
	'drops':true,
	'name':'Standard Quarters',
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
	'flavor':'-',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.sprite.profile+=10;
	}
},
{
	'id':39,
	'drops':false,
	'name':'Alien Pustule',
	'flavor':'-',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.sprite.profile+=10;
	}
},
{
	'id':40,
	'drops':true,
	'name':'Tractor Beam Array',
	'flavor':'pull in loots from farther away',
	'bonus':function(target){
		target.lootRange+=300;
		target.fireRate*=0.9;
		target.energyRate*=0.95;
	}
},
{
	'id':41,
	'drops':true,
	'name':'Force Multiplier',
	'flavor':'spray \'n pray',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
			bullet.rotation+=Math.random()*0.4-0.2;
			game.physics.arcade.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
		});
		target.fireRate*=0.7;
		target.fireEnergy*=0.8;
		target.sprite.profile+=40;
	}
},
{
	'id':42,
	'drops':true,
	'name':'Fusion Core',
	'flavor':'improves recharge speed and maneuverability',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyRate*=0.9;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':43,
	'drops':true,
	'name':'Fusion Core',
	'flavor':'improves recharge speed and maneuverability',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyRate*=0.9;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':44,
	'drops':true,
	'name':'Thrust Package',
	'flavor':'fast and flashy',
	'bonus':function(target){
		target.fireDamage+=1;
		target.acceleration+=0.6;
		target.sprite.profile+=50;
	}
},
{
	'id':45,
	'drops':true,
	'name':'Secure Dormitory',
	'flavor':'heavily armored, but leeches energy',
	'bonus':function(target){
		target.health+=10;
		target.energyRate*=1.2;
		target.fireDamage+=1;
		target.acceleration-=0.2;
	}
},
{
	'id':46,
	'drops':true,
	'name':'Flexible Grid',
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
	'flavor':'burn, baby',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
			bullet.rotation+=Math.random()*0.5-0.25;
			bullet.loadTexture('explosions',2);
			bullet.body.angularVelocity=randomRange(600,900);
			bullet.alpha=randomRange(0.5,0.7);
			game.physics.arcade.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
		});
		target.bulletSprite=5;
		target.fireDamage+=2;
		target.fireSound=ui.sound_plasma;
		target.fireRate*=0.4;
		target.fireEnergy*=0.6;
		target.fireRange*=0.6;
		target.sprite.profile+=88;
	}
},
{
	'id':48,
	'drops':false,
	'name':'Component48',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':49,
	'drops':false,
	'name':'Component49',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':50,
	'drops':false,
	'name':'Component50',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':51,
	'drops':false,
	'name':'Component51',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':52,
	'drops':false,
	'name':'Component52',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':53,
	'drops':false,
	'name':'Component53',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':54,
	'drops':false,
	'name':'Component54',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':55,
	'drops':false,
	'name':'Component55',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':56,
	'drops':false,
	'name':'Component56',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':57,
	'drops':false,
	'name':'Component57',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':58,
	'drops':false,
	'name':'Component58',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':59,
	'drops':false,
	'name':'Component59',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':60,
	'drops':false,
	'name':'Component60',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':61,
	'drops':false,
	'name':'Component61',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':62,
	'drops':false,
	'name':'Component62',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':63,
	'drops':false,
	'name':'Component63',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':64,
	'drops':true,
	'name':'Thermal Monitoring System',
	'flavor':'warns when in enemy sensor range',
	'bonus':function(target){
		target.profileShow=true;
		target.radarTargets+=1;
	}
},
{
	'id':65,
	'drops':true,
	'name':'Worn Armor Plating',
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
	'flavor':'improves turn rate, lowers maximum energy',
	'bonus':function(target){
		target.turnRate+=0.7;
		target.acceleration+=0.3;
		target.energyMax-=2;
	}
},
{
	'id':67,
	'drops':true,
	'name':'Long Range Sensor',
	'flavor':'track 2 more targets',
	'bonus':function(target){
		target.radarTargets+=2;
	}
},
{
	'id':68,
	'drops':true,
	'name':'Durasteel Plating',
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
	'flavor':'basic turning jet',
	'bonus':function(target){
		target.turnRate+=0.4;
	}
},
{
	'id':70,
	'drops':true,
	'name':'Flimsy Wing',
	'flavor':'increases turn rate, but turns will require correction on smaller ships',
	'bonus':function(target){
		target.turnRate+=0.6;
		target.acceleration+=0.2;
		if(target.ai==-1)
		{
			target.left=function(){
				this.sprite.angle-=this.turnRate;
				var av = 50-(this.ship.length);
				if(av<0){av=0};
				this.sprite.body.angularVelocity=this.turnRate*-av;
			}
			target.right=function(){
				this.sprite.angle+=this.turnRate;
				var av = 50-(this.ship.length);
				if(av<0){av=0};
				this.sprite.body.angularVelocity=this.turnRate*av;
			}

		}
	}
},
{
	'id':71,
	'drops':true,
	'name':'Command Deck',
	'flavor':'enhances many systems',
	'bonus':function(target){
		target.health+=5;
		target.turnSpeed+=0.1;
		target.acceleration+=0.1;
		target.energyRate*=0.9;
		target.energyMax+=4;
		target.sprite.profile+=20;	
	}
},
{
	'id':72,
	'drops':true,
	'name':'Crew Pod',
	'flavor':'improves health and energy recharge',
	'bonus':function(target){
		target.health+=6;
		target.energyMax-=2;
		target.energyRate*=0.95;
		target.sprite.profile+=10;	
	}
},
{
	'id':73,
	'drops':true,
	'name':'Mining Laser',
	'flavor':'increases chance to get loots',
	'bonus':function(target){
		target.fireDamage+=2;
		target.fireSound=ui.sound_pew2;
		target.fireRate+=100;
		target.sprite.profile+=20;	
		target.dropRate+=0.008;
		target.bulletSprite=4;
	}
},
{
	'id':74,
	'drops':true,
	'name':'Habitat Module',
	'flavor':'light and tough, with a bonus capacitor',
	'bonus':function(target){
		target.health+=4;
		target.acceleration-=0.1;
		target.energyRate*=1.05;
		target.energyMax+=3;
	}
},
{
	'id':75,
	'name':'Habitat Module',
	'flavor':'light and tough, with a bonus capacitor',
	'drops':true,
	'bonus':function(target){

		target.health+=4;
		target.acceleration-=0.1;
		target.energyRate*=1.05;
		target.energyMax+=3;
	}
},
{
	'id':76,
	'drops':true,
	'name':'AWSM',
	'flavor':'press RIGHT MOUSE to self-destruct, destroying nearby ships',
	'bonus':function(target){
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
				player.damage(500);
			}
		}
	}
},
{
	'id':77,
	'drops':true,
	'name':'skul-gun',
	'flavor':'drains targets\' energy',
	'bonus':function(target){
		target.sprite.profile+=20;
		target.fireRate*=0.9;
		target.bulletHitBehavior.push(function(sprite,bullet){
			var tgt = ownerFromName(sprite.name);
			tgt.energy-=4;

		});
	}
},
{
	'id':78,
	'drops':true,
	'name':'Xenoid Navigation Unit',
	'flavor':'mysteriously causes drag',
	'bonus':function(target){
		target.turnRate+=0.5;
		target.acceleration+=0.5;
		target.energyMax+=4;
		if(target.ai!=2){
			target.sprite.body.linearDamping=0.8;
		}
	}
},
{
	'id':79,
	'drops':true,
	'name':'Xenoid Pulse Laser',
	'flavor':'very cheap shots',
	'bonus':function(target){
		target.fireRate*=1.1;
		target.fireDamage+=1;
		target.fireSound=ui.sound_pew1;
		target.fireEnergy*=0.5;
		target.fireVelocity*=1.3;
		target.bulletSprite=4;
	}
},
{
	'id':80,
	'drops':true,
	'name':'Mechanoid Husk',
	'flavor':'armored yet maneuverable',
	'bonus':function(target){
		target.health+=4;
		target.acceleration+=0.4;
		target.turnRate+=0.2;
		target.profile+=30;
	}
},
{
	'id':81,
	'drops':true,
	'name':'Mechanoid Turret',
	'flavor':'target with mouse!',
	'bonus':function(target){
		if(target.ai==-1){
			target.bulletBehavior.push(function(bullet){
				bullet.reset(bullet.owner.x,bullet.owner.y);
				bullet.rotation=game.physics.arcade.angleToPointer(bullet);
				game.physics.arcade.velocityFromRotation(bullet.rotation,bullet.fireVelocity,bullet.body.velocity);
			});
		}else{
			target.fireDamage+=2;
			target.fireRate-=100;
		};
	}
},
{
	'id':82,
	'drops':true,
	'name':'External Power Plant',
	'flavor':'press RIGHT MOUSE to convert ore into energy',
	'bonus':function(target){
		target.alt=function(){
			if(game.time.now > target.altCooldown){	
				ui.sound_boop.play();
				var amt = Math.floor(target.energyMax - target.energy);
				boom(explosions,0,this.sprite.x,this.sprite.y);
				if(target.ore < amt){
					amt = target.ore;
				}
				target.ore-=amt;
				target.energy+=amt;	
				target.altCooldown = game.time.now + 2000;
			}
		}
	}
},
{
	'id':83,
	'drops':true,
	'name':'Force Cannon',
	'flavor':'high damage with knockback',
	'bonus':function(target){
		target.bulletSprite=3;
		target.bulletDamage+=2;
		target.fireEnergy+=2;
		target.bulletBehavior.push(function(bullet){
			addVelocity(bullet.rotation+Math.PI,100, bullet.owner.body.velocity);
		});

			target.bulletHitBehavior.push(function(sprite,bullet){
			
				addVelocity(bullet.rotation, 100, sprite.body.velocity);
		});
}
},
{
	'id':84,
	'drops':false,
	'name':'Crystalline Entity',
	'flavor':'increases the size of your shots',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
			bullet.scale.setTo(bullet.scale.x+1,bullet.scale.y+1);
			bullet.body.angularVelocity+=800;
			bullet.alpha=0.5;
		});

	}
},
{
	'id':85,
	'drops':false,
	'name':'Crystalline Entity',
	'flavor':'increases the size of your shots',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
			bullet.scale.setTo(bullet.scale.x+1,bullet.scale.y+1);
			bullet.body.angularVelocity+=800;
			bullet.alpha=0.5;
		});

	}
},
{
	'id':86,
	'drops':false,
	'name':'Collector Vine',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':87,
	'drops':false,
	'name':'Nutriment Tree',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':88,
	'drops':false,
	'name':'Component88',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':89,
	'drops':false,
	'name':'Component89',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':90,
	'drops':false,
	'name':'Component90',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':91,
	'drops':false,
	'name':'Component91',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':92,
	'drops':false,
	'name':'Component92',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':93,
	'drops':false,
	'name':'Component93',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':94,
	'drops':false,
	'name':'Component94',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':95,
	'drops':false,
	'name':'Component95',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':96,
	'drops':true,
	'name':'Pirate CPU',
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
	'flavor':'press RIGHT MOUSE to alert nearby enemies!',
	'bonus':function(target){
		target.alt=function(){
			if(this.energy>=6 && game.time.now>this.altCooldown){
				ui.sound_plasma.play();
				this.energy-=6;
				this.altCooldown=game.time.now+2000;
				bigBoom(explosions,this.sprite.x,this.sprite.y);
				this.sprite.profile=this.sprite.profileMax*5;
			}

		}
	}
},
{
	'id':98,
	'drops':true,
	'name':'Destroyed Airlock',
	'flavor':'press RIGHT MOUSE to unleash a damaging halo of contagion',
	'bonus':function(target){
		target.alt=function(){
			if(game.time.now>this.altCooldown && (this.energy>=6 || this.energy == this.energyMax)){
				this.energy-=6;	//if player has < 0 energy, it's effectively an extra recharge delay
				ui.sound_missile.play();
				for(var n=0; n<1;n+=0.075){
					var bullet=this.spawnBullet();
					bullet.loadTexture('explosions',4);
					bullet.reset(this.sprite.x, this.sprite.y);
					bullet.rotation=n*2*Math.PI;
					game.physics.arcade.velocityFromRotation(bullet.rotation, 600, bullet.body.velocity);
					bullet.alpha=0.3;
					bullet.damage=12;
					bullet.bulletSprite=4;
					bullet.scale.setTo(2,2);
					bullet.lifespan=400;
					bullet.body.angularVelocity=999;
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
	'flavor':'hold RIGHT MOUSE to throw off attackers',
	'bonus':function(target){
		target.alt=function(){
			if(this.energy>=0.4){
				this.energy-=0.4;
				if(game.time.now>this.altCooldown){
					boom(explosions,1,this.sprite.x,this.sprite.y);
					ui.sound_boop.play();
				}
				if(this.sprite.profile>100){
					this.sprite.profile-=100;
				}else{
					this.sprite.profile=0;
				}
				for(var i=0;i<this.parts.length;i++){
					this.altCooldown=game.time.now+250;
					this.parts[i].sprite.alpha=0.35;
				}
			}

		}
	}
},
{
	'id':101,
	'drops':true,
	'name':'Weapon Rotator',
	'flavor':'greatly improves fire rate, but generates heat',
	'bonus':function(target){
		target.fireRate*=0.7;
		target.fireEnergy*=0.9;
		target.fireDamage+=1;
		target.bulletBehavior.push(function(bullet){bullet.owner.profile+=10});
	}
},
{
	'id':102,
	'drops':true,
	'name':'Flimsy Wing',
	'flavor':'increases turn rate, but turns will require correction',
	'bonus':function(target){
		target.turnRate+=0.3;
		target.acceleration+=0.5;
		if(target.ai==-1)
		{
			target.left=function(){
				this.sprite.angle-=this.turnRate;
				var av = 50-(this.ship.length);
				if(av<0){av=0};
				this.sprite.body.angularVelocity=this.turnRate*-av;
			}
			target.right=function(){
				this.sprite.angle+=this.turnRate;
				var av = 50-(this.ship.length);
				if(av<0){av=0};
				this.sprite.body.angularVelocity=this.turnRate*av;
			}

		}
	}
},
{
	'id':103,
	'drops':true,
	'name':'Tactical Control Module',
	'flavor':'improves weapons and other critical systems',
	'bonus':function(target){
		target.fireDamage+=1;
		target.fireRate*=0.9;
		target.turnRate+=0.2;
		target.energyRate*=0.9;
		target.acceleration+=0.2;
	}
},
{
	'id':104,
	'drops':true,
	'name':'Inline Warp Thrust',
	'flavor':'high speed, low profile',
	'bonus':function(target){
		target.acceleration+=0.8;
		target.energyRate*=1.1;
		target.profile-=20;
	}
},
{
	'id':105,
	'drops':true,
	'name':'Observation Unit',
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
	'flavor':'light and tough, with a bonus capacitor',
	'bonus':function(target){

		target.health+=4;
		target.acceleration-=0.1;
		target.energyRate*=1.05;
		target.energyMax+=3;
	}
},
{
	'id':107,
	'drops':true,
	'name':'Habitat Module',
	'flavor':'light and tough, with a bonus capacitor',
	'bonus':function(target){

		target.health+=4;
		target.acceleration-=0.1;
		target.energyRate*=1.05;
		target.energyMax+=3;
	}
},
{
	'id':108,
	'drops':true,
	'name':'Vidscreen Ad <BurgerJoint>',
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
	'flavor':'faster energy return, but occasionally damages you when firing',
	'bonus':function(target){
		target.energyAmount+=2;
		target.bulletBehavior.push(function(bullet){
			var tgt = ownerFromName(bullet.owner.name);
			if(Math.random()<0.1 && tgt.health > 1){
				tgt.damage(1);
				boom(explosions,4,tgt.sprite.x,tgt.sprite.y);
			}
		});

	}
},
{
	'id':111,
	'drops':true,
	'name':'Transporter',
	'flavor':'press RIGHT MOUSE to board an enemy vessel. this will destroy your ship if successful',
	'bonus':function(target){
		if(target.ai==-1){ //no baddie should EVER have this - too frustrating
			target.altTexts=['the captain\'s screams are silenced by the void',
				'the control room is littered with pictures of a life long forgotten',
					'why the hell is everything pink?'];
			target.alt=function(){
				if(this.energy>=6 || this.energy == this.energyMax){
					this.energy-=6;	//if player has < 0 energy, it's effectively an extra recharge delay
					if(game.time.now>this.altCooldown){
						var bullet=this.spawnBullet();
						bullet.bulletHitBehavior.push(function(sprite,bullet){
							if(sprite.name!='player'){
								if(enemies[sprite.name].ai!=3){
									ui.sound_boop.play();
									enemies[sprite.name].health=0;
									player.initPlayerShip(enemies[sprite.name].ship);
									bigBoom(explosions,player.x,player.y);
									player.sprite.reset(enemies[sprite.name].sprite.x,enemies[sprite.name].sprite.y);
									player.rotation = enemies[sprite.name].rotation;
									ui.texts.push(player.altTexts[Math.floor(randomRange(0,player.altTexts.length))]);
								}

							}
						});
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
	'flavor':'armored yet maneuverable',
	'bonus':function(target){
		target.health+=4;
		target.acceleration+=0.4;
		target.turnRate+=0.2;
		target.energyMax+=2;
		target.profile+=40;
	}
},
{
	'id':113,
	'drops':true,
	'name':'Mechanoid Jumpdrive',
	'flavor':'press RIGHT MOUSE to teleport',
	'bonus':function(target){

		target.alt=function(){
			if((this.energy>=12 || this.energy==this.energyMax)&&this.altCooldown<game.time.now){
				this.energy-=12;
				ui.sound_boop.play();

				boom(explosions,1,this.sprite.x,this.sprite.y);
				boom(explosions,3,this.sprite.x,this.sprite.y);
				this.sprite.reset(this.sprite.x+randomRange(-2000,2000),this.sprite.y+randomRange(-2000,2000));
				boom(explosions,1,this.sprite.x,this.sprite.y);
				boom(explosions,3,this.sprite.x,this.sprite.y);
				this.altCooldown=game.time.now+2000;

			}
		}
		;
	}
},
{
	'id':114,
	'drops':true,
	'name':'Secured Container',
	'flavor':'recharge energy by rapidly pressing RIGHT MOUSE. inhibits normal recharge',
	'bonus':function(target){
		if(target.ai==-1){
		target.energyRate=60000; //slow enough
		target.alt=function(){
			//this guy has his own cooldown timer, so the user
			//has to repeatedly press RIGHT MOUSE; there should
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
	'flavor':'increases the size of your shots',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
			bullet.scale.setTo(bullet.scale.x+1,bullet.scale.y+1);
			bullet.body.angularVelocity+=800;
			bullet.alpha=0.5;
		});

	}
},

{
	'id':117,
	'drops':true,
	'name':'Crystalline Entity',
	'flavor':'increases the size of your shots',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
			bullet.scale.setTo(bullet.scale.x+1,bullet.scale.y+1);
			bullet.body.angularVelocity+=800;
			bullet.alpha=0.5;
		});

	}
},
{
	'id':118,
	'drops':false,
	'name':'Propelling Fruit',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':119,
	'drops':false,
	'name':'Roots',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':120,
	'drops':false,
	'name':'Component120',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':121,
	'drops':false,
	'name':'Component121',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':122,
	'drops':false,
	'name':'Component122',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':123,
	'drops':false,
	'name':'Component123',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':124,
	'drops':false,
	'name':'Component124',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':125,
	'drops':false,
	'name':'Component125',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':126,
	'drops':false,
	'name':'Component126',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':127,
	'drops':false,
	'name':'Component127',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':128,
	'drops':true,
	'name':'Contraband Missiles',
	'flavor':'high damage, unreliable speed',
	'bonus':function(target){
		target.bulletSprite=2;
		target.fireDamage+=4;
		target.fireSound=ui.sound_missile;
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
	'flavor':'light frame fitted with thrusters',
	'bonus':function(target){
		target.acceleration+=1;
		target.turnrate+=0.1;
		target.health+=1;
	}
},
{
	'id':130,
	'drops':true,
	'name':'Aftermarket Gatling',
	'flavor':'erratic fire rate',
	'bonus':function(target){
		target.bulletSprite=1;
		target.bulletBehavior.push(function(bullet){				
			var tgt = ownerFromName(bullet.owner.name);
			tgt.nextFire = game.time.now + (randomRange(0.25,1.5) * tgt.fireRate);
		});
		target.fireRange*=0.7;
		target.fireSound=ui.sound_bullet;
		target.fireDamage*=0.9;
		target.fireEnergy*=0.7;
		target.sprite.profile+=20;
	}
},
{
	'id':131,
	'drops':true,
	'name':'Freedom Missiles',
	'flavor':'liberate your opponents. higher damage and energy cost.',
	'bonus':function(target){
		target.bulletSprite=2;
		target.fireSound=ui.sound_missile;
		target.fireDamage+=2;
		target.fireEnergy+=2;
		target.sprite.profile+=15;
	}
},
{
	'id':132,
	'drops':true,
	'name':'Ultralight Wing',
	'flavor':'lightly armored, improves acceleration',
	'bonus':function(target){
		target.health+=2;
		target.acceleration+=0.5;
	}
},
{
	'id':133,
	'drops':true,
	'name':'Gleaming Autocannon',
	'flavor':'BRRRRRRAAAAAAPPPPPP',
	'bonus':function(target){
		target.bulletSprite=1;
		target.fireRate*=0.7;
		target.fireSound=ui.sound_bullet;
		target.fireDamage+=1;
		target.sprite.profile+=150;
	}
},
{
	'id':134,
	'drops':false,
	'name':'Component134',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':135,
	'drops':false,
	'name':'Component135',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':136,
	'drops':false,
	'name':'Component136',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':137,
	'drops':false,
	'name':'Component137',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':138,
	'drops':false,
	'name':'Component138',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':139,
	'drops':false,
	'name':'Component139',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':140,
	'drops':false,
	'name':'Component140',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':141,
	'drops':false,
	'name':'Component141',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':142,
	'drops':false,
	'name':'Component142',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':143,
	'drops':false,
	'name':'Component143',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':144,
	'drops':false,
	'name':'Component144',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':145,
	'drops':false,
	'name':'Component145',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':146,
	'drops':false,
	'name':'Component146',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':147,
	'drops':false,
	'name':'Component147',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':148,
	'drops':false,
	'name':'Component148',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':149,
	'drops':false,
	'name':'Component149',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':150,
	'drops':false,
	'name':'Component150',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':151,
	'drops':false,
	'name':'Component151',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':152,
	'drops':false,
	'name':'Component152',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':153,
	'drops':false,
	'name':'Component153',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':154,
	'drops':false,
	'name':'Component154',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':155,
	'drops':false,
	'name':'Component155',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':156,
	'drops':false,
	'name':'Component156',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':157,
	'drops':false,
	'name':'Component157',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':158,
	'drops':false,
	'name':'Component158',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':159,
	'drops':false,
	'name':'Component159',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':160,
	'drops':true,
	'name':'Illegal Cargo',
	'flavor':'increases energy, attracts attention',
	'bonus':function(target){
		target.energyMax+=6;
		target.energyAmount*=1.2;
		target.sprite.profile+=100;
	}
},
{
	'id':161,
	'drops':false,
	'name':'Component161',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':162,
	'drops':false,
	'name':'Component162',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':163,
	'drops':false,
	'name':'Component163',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':164,
	'drops':false,
	'name':'Component164',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':165,
	'drops':false,
	'name':'Component165',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':166,
	'drops':false,
	'name':'Component166',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':167,
	'drops':false,
	'name':'Component167',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':168,
	'drops':false,
	'name':'Component168',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':169,
	'drops':false,
	'name':'Component169',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':170,
	'drops':false,
	'name':'Component170',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':171,
	'drops':false,
	'name':'Component171',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':172,
	'drops':false,
	'name':'Component172',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':173,
	'drops':false,
	'name':'Component173',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':174,
	'drops':false,
	'name':'Component174',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':175,
	'drops':false,
	'name':'Component175',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':176,
	'drops':false,
	'name':'Component176',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':177,
	'drops':false,
	'name':'Component177',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':178,
	'drops':false,
	'name':'Component178',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':179,
	'drops':false,
	'name':'Component179',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':180,
	'drops':false,
	'name':'Component180',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':181,
	'drops':false,
	'name':'Component181',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':182,
	'drops':false,
	'name':'Component182',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':183,
	'drops':false,
	'name':'Component183',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':184,
	'drops':false,
	'name':'Component184',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':185,
	'drops':false,
	'name':'Component185',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':186,
	'drops':false,
	'name':'Component186',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':187,
	'drops':false,
	'name':'Component187',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':188,
	'drops':false,
	'name':'Component188',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':189,
	'drops':false,
	'name':'Component189',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':190,
	'drops':false,
	'name':'Component190',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':191,
	'drops':false,
	'name':'Component191',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':192,
	'drops':false,
	'name':'Component192',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':193,
	'drops':false,
	'name':'Component193',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':194,
	'drops':false,
	'name':'Component194',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':195,
	'drops':false,
	'name':'Component195',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':196,
	'drops':false,
	'name':'Component196',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':197,
	'drops':false,
	'name':'Component197',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':198,
	'drops':false,
	'name':'Component198',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':199,
	'drops':false,
	'name':'Component199',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':200,
	'drops':false,
	'name':'Component200',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':201,
	'drops':false,
	'name':'Component201',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':202,
	'drops':false,
	'name':'Component202',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':203,
	'drops':false,
	'name':'Component203',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':204,
	'drops':false,
	'name':'Component204',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':205,
	'drops':false,
	'name':'Component205',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':206,
	'drops':false,
	'name':'Component206',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':207,
	'drops':false,
	'name':'Component207',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':208,
	'drops':false,
	'name':'Component208',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':209,
	'drops':false,
	'name':'Component209',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':210,
	'drops':false,
	'name':'Component210',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':211,
	'drops':false,
	'name':'Component211',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':212,
	'drops':false,
	'name':'Component212',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':213,
	'drops':false,
	'name':'Component213',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':214,
	'drops':false,
	'name':'Component214',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':215,
	'drops':false,
	'name':'Component215',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':216,
	'drops':false,
	'name':'Component216',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':217,
	'drops':false,
	'name':'Component217',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':218,
	'drops':false,
	'name':'Component218',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':219,
	'drops':false,
	'name':'Component219',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':220,
	'drops':false,
	'name':'Component220',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':221,
	'drops':false,
	'name':'Component221',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':222,
	'drops':false,
	'name':'Component222',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':223,
	'drops':false,
	'name':'Component223',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':224,
	'drops':false,
	'name':'Component224',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':225,
	'drops':false,
	'name':'Component225',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':226,
	'drops':false,
	'name':'Component226',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':227,
	'drops':false,
	'name':'Component227',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':228,
	'drops':false,
	'name':'Component228',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':229,
	'drops':false,
	'name':'Component229',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':230,
	'drops':false,
	'name':'Component230',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':231,
	'drops':false,
	'name':'Component231',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':232,
	'drops':false,
	'name':'Component232',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':233,
	'drops':false,
	'name':'Component233',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':234,
	'drops':false,
	'name':'Component234',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':235,
	'drops':false,
	'name':'Component235',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':236,
	'drops':false,
	'name':'Component236',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':237,
	'drops':false,
	'name':'Component237',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':238,
	'drops':false,
	'name':'Component238',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':239,
	'drops':false,
	'name':'Component239',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':240,
	'drops':false,
	'name':'Component240',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':241,
	'drops':false,
	'name':'Component241',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':242,
	'drops':false,
	'name':'Component242',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':243,
	'drops':false,
	'name':'Component243',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':244,
	'drops':false,
	'name':'Component244',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':245,
	'drops':false,
	'name':'Component245',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':246,
	'drops':false,
	'name':'Component246',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':247,
	'drops':false,
	'name':'Component247',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':248,
	'drops':false,
	'name':'Component248',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':249,
	'drops':false,
	'name':'Component249',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':250,
	'drops':false,
	'name':'Component250',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':251,
	'drops':false,
	'name':'Component251',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':252,
	'drops':false,
	'name':'Component252',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':253,
	'drops':false,
	'name':'Component253',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':254,
	'drops':false,
	'name':'Component254',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':255,
	'drops':false,
	'name':'Component255',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':256,
	'drops':false,
	'name':'Component256',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':257,
	'drops':false,
	'name':'Component-257',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':258,
	'drops':false,
	'name':'Component-258',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':259,
	'drops':false,
	'name':'Component-259',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':260,
	'drops':false,
	'name':'Component-260',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':261,
	'drops':false,
	'name':'Component-261',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':262,
	'drops':false,
	'name':'Component-262',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':263,
	'drops':false,
	'name':'Component-263',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':264,
	'drops':false,
	'name':'Component-264',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':265,
	'drops':false,
	'name':'Component-265',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':266,
	'drops':false,
	'name':'Component-266',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':267,
	'drops':false,
	'name':'Component-267',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':268,
	'drops':false,
	'name':'Component-268',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':269,
	'drops':false,
	'name':'Component-269',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':270,
	'drops':false,
	'name':'Component-270',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':271,
	'drops':false,
	'name':'Component-271',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':272,
	'drops':false,
	'name':'Component-272',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':273,
	'drops':false,
	'name':'Component-273',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':274,
	'drops':false,
	'name':'Component-274',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':275,
	'drops':false,
	'name':'Component-275',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':276,
	'drops':false,
	'name':'Component-276',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':277,
	'drops':false,
	'name':'Component-277',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':278,
	'drops':false,
	'name':'Component-278',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':279,
	'drops':false,
	'name':'Component-279',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':280,
	'drops':false,
	'name':'Component-280',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':281,
	'drops':false,
	'name':'Component-281',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':282,
	'drops':false,
	'name':'Component-282',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':283,
	'drops':false,
	'name':'Component-283',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':284,
	'drops':false,
	'name':'Component-284',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':285,
	'drops':false,
	'name':'Component-285',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':286,
	'drops':false,
	'name':'Component-286',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':287,
	'drops':false,
	'name':'Component-287',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':288,
	'drops':false,
	'name':'Component-288',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':289,
	'drops':false,
	'name':'Component-289',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':290,
	'drops':false,
	'name':'Component-290',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':291,
	'drops':false,
	'name':'Component-291',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':292,
	'drops':false,
	'name':'Component-292',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':293,
	'drops':false,
	'name':'Component-293',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':294,
	'drops':false,
	'name':'Component-294',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':295,
	'drops':false,
	'name':'Component-295',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':296,
	'drops':false,
	'name':'Component-296',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':297,
	'drops':false,
	'name':'Component-297',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':298,
	'drops':false,
	'name':'Component-298',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':299,
	'drops':false,
	'name':'Component-299',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':300,
	'drops':false,
	'name':'Component-300',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':301,
	'drops':false,
	'name':'Component-301',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':302,
	'drops':false,
	'name':'Component-302',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':303,
	'drops':false,
	'name':'Component-303',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':304,
	'drops':false,
	'name':'Component-304',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':305,
	'drops':false,
	'name':'Component-305',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':306,
	'drops':false,
	'name':'Component-306',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':307,
	'drops':false,
	'name':'Component-307',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':308,
	'drops':false,
	'name':'Component-308',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':309,
	'drops':false,
	'name':'Component-309',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':310,
	'drops':false,
	'name':'Component-310',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':311,
	'drops':false,
	'name':'Component-311',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':312,
	'drops':false,
	'name':'Component-312',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':313,
	'drops':false,
	'name':'Component-313',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':314,
	'drops':false,
	'name':'Component-314',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':315,
	'drops':false,
	'name':'Component-315',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':316,
	'drops':false,
	'name':'Component-316',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':317,
	'drops':false,
	'name':'Component-317',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':318,
	'drops':false,
	'name':'Component-318',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':319,
	'drops':false,
	'name':'Component-319',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':320,
	'drops':false,
	'name':'Component-320',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':321,
	'drops':false,
	'name':'Component-321',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':322,
	'drops':false,
	'name':'Component-322',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':323,
	'drops':false,
	'name':'Component-323',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':324,
	'drops':false,
	'name':'Component-324',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':325,
	'drops':false,
	'name':'Component-325',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':326,
	'drops':false,
	'name':'Component-326',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':327,
	'drops':false,
	'name':'Component-327',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':328,
	'drops':false,
	'name':'Component-328',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':329,
	'drops':false,
	'name':'Component-329',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':330,
	'drops':false,
	'name':'Component-330',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':331,
	'drops':false,
	'name':'Component-331',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':332,
	'drops':false,
	'name':'Component-332',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':333,
	'drops':false,
	'name':'Component-333',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':334,
	'drops':false,
	'name':'Component-334',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':335,
	'drops':false,
	'name':'Component-335',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':336,
	'drops':false,
	'name':'Component-336',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':337,
	'drops':false,
	'name':'Component-337',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':338,
	'drops':false,
	'name':'Component-338',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':339,
	'drops':false,
	'name':'Component-339',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':340,
	'drops':false,
	'name':'Component-340',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':341,
	'drops':false,
	'name':'Component-341',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':342,
	'drops':false,
	'name':'Component-342',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':343,
	'drops':false,
	'name':'Component-343',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':344,
	'drops':false,
	'name':'Component-344',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':345,
	'drops':false,
	'name':'Component-345',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':346,
	'drops':false,
	'name':'Component-346',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':347,
	'drops':false,
	'name':'Component-347',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':348,
	'drops':false,
	'name':'Component-348',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':349,
	'drops':false,
	'name':'Component-349',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':350,
	'drops':false,
	'name':'Component-350',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':351,
	'drops':false,
	'name':'Component-351',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':352,
	'drops':false,
	'name':'Component-352',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':353,
	'drops':false,
	'name':'Component-353',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':354,
	'drops':false,
	'name':'Component-354',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':355,
	'drops':false,
	'name':'Component-355',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':356,
	'drops':false,
	'name':'Component-356',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':357,
	'drops':false,
	'name':'Component-357',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':358,
	'drops':false,
	'name':'Component-358',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':359,
	'drops':false,
	'name':'Component-359',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':360,
	'drops':false,
	'name':'Component-360',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':361,
	'drops':false,
	'name':'Component-361',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':362,
	'drops':false,
	'name':'Component-362',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':363,
	'drops':false,
	'name':'Component-363',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':364,
	'drops':false,
	'name':'Component-364',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':365,
	'drops':false,
	'name':'Component-365',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':366,
	'drops':false,
	'name':'Component-366',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':367,
	'drops':false,
	'name':'Component-367',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':368,
	'drops':false,
	'name':'Component-368',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':369,
	'drops':false,
	'name':'Component-369',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':370,
	'drops':false,
	'name':'Component-370',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':371,
	'drops':false,
	'name':'Component-371',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':372,
	'drops':false,
	'name':'Component-372',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':373,
	'drops':false,
	'name':'Component-373',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':374,
	'drops':false,
	'name':'Component-374',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':375,
	'drops':false,
	'name':'Component-375',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':376,
	'drops':false,
	'name':'Component-376',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':377,
	'drops':false,
	'name':'Component-377',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':378,
	'drops':false,
	'name':'Component-378',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':379,
	'drops':false,
	'name':'Component-379',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':380,
	'drops':false,
	'name':'Component-380',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':381,
	'drops':false,
	'name':'Component-381',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':382,
	'drops':false,
	'name':'Component-382',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':383,
	'drops':false,
	'name':'Component-383',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':384,
	'drops':false,
	'name':'Component-384',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':385,
	'drops':false,
	'name':'Component-385',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':386,
	'drops':false,
	'name':'Component-386',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':387,
	'drops':false,
	'name':'Component-387',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':388,
	'drops':false,
	'name':'Component-388',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':389,
	'drops':false,
	'name':'Component-389',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':390,
	'drops':false,
	'name':'Component-390',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':391,
	'drops':false,
	'name':'Component-391',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':392,
	'drops':false,
	'name':'Component-392',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':393,
	'drops':false,
	'name':'Component-393',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':394,
	'drops':false,
	'name':'Component-394',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':395,
	'drops':false,
	'name':'Component-395',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':396,
	'drops':false,
	'name':'Component-396',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':397,
	'drops':false,
	'name':'Component-397',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':398,
	'drops':false,
	'name':'Component-398',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':399,
	'drops':false,
	'name':'Component-399',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':400,
	'drops':false,
	'name':'Component-400',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':401,
	'drops':false,
	'name':'Component-401',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':402,
	'drops':false,
	'name':'Component-402',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':403,
	'drops':false,
	'name':'Component-403',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':404,
	'drops':false,
	'name':'Component-404',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':405,
	'drops':false,
	'name':'Component-405',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':406,
	'drops':false,
	'name':'Component-406',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':407,
	'drops':false,
	'name':'Component-407',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':408,
	'drops':false,
	'name':'Component-408',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':409,
	'drops':false,
	'name':'Component-409',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':410,
	'drops':false,
	'name':'Component-410',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':411,
	'drops':false,
	'name':'Component-411',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':412,
	'drops':false,
	'name':'Component-412',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':413,
	'drops':false,
	'name':'Component-413',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':414,
	'drops':false,
	'name':'Component-414',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':415,
	'drops':false,
	'name':'Component-415',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':416,
	'drops':false,
	'name':'Component-416',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':417,
	'drops':false,
	'name':'Component-417',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':418,
	'drops':false,
	'name':'Component-418',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':419,
	'drops':false,
	'name':'Component-419',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':420,
	'drops':false,
	'name':'Component-420',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':421,
	'drops':false,
	'name':'Component-421',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':422,
	'drops':false,
	'name':'Component-422',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':423,
	'drops':false,
	'name':'Component-423',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':424,
	'drops':false,
	'name':'Component-424',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':425,
	'drops':false,
	'name':'Component-425',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':426,
	'drops':false,
	'name':'Component-426',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':427,
	'drops':false,
	'name':'Component-427',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':428,
	'drops':false,
	'name':'Component-428',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':429,
	'drops':false,
	'name':'Component-429',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':430,
	'drops':false,
	'name':'Component-430',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':431,
	'drops':false,
	'name':'Component-431',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':432,
	'drops':false,
	'name':'Component-432',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':433,
	'drops':false,
	'name':'Component-433',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':434,
	'drops':false,
	'name':'Component-434',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':435,
	'drops':false,
	'name':'Component-435',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':436,
	'drops':false,
	'name':'Component-436',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':437,
	'drops':false,
	'name':'Component-437',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':438,
	'drops':false,
	'name':'Component-438',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':439,
	'drops':false,
	'name':'Component-439',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':440,
	'drops':false,
	'name':'Component-440',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':441,
	'drops':false,
	'name':'Component-441',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':442,
	'drops':false,
	'name':'Component-442',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':443,
	'drops':false,
	'name':'Component-443',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':444,
	'drops':false,
	'name':'Component-444',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':445,
	'drops':false,
	'name':'Component-445',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':446,
	'drops':false,
	'name':'Component-446',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':447,
	'drops':false,
	'name':'Component-447',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':448,
	'drops':false,
	'name':'Component-448',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':449,
	'drops':false,
	'name':'Component-449',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':450,
	'drops':false,
	'name':'Component-450',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':451,
	'drops':false,
	'name':'Component-451',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':452,
	'drops':false,
	'name':'Component-452',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':453,
	'drops':false,
	'name':'Component-453',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':454,
	'drops':false,
	'name':'Component-454',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':455,
	'drops':false,
	'name':'Component-455',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':456,
	'drops':false,
	'name':'Component-456',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':457,
	'drops':false,
	'name':'Component-457',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':458,
	'drops':false,
	'name':'Component-458',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':459,
	'drops':false,
	'name':'Component-459',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':460,
	'drops':false,
	'name':'Component-460',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':461,
	'drops':false,
	'name':'Component-461',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':462,
	'drops':false,
	'name':'Component-462',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':463,
	'drops':false,
	'name':'Component-463',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':464,
	'drops':false,
	'name':'Component-464',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':465,
	'drops':false,
	'name':'Component-465',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':466,
	'drops':false,
	'name':'Component-466',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':467,
	'drops':false,
	'name':'Component-467',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':468,
	'drops':false,
	'name':'Component-468',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':469,
	'drops':false,
	'name':'Component-469',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':470,
	'drops':false,
	'name':'Component-470',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':471,
	'drops':false,
	'name':'Component-471',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':472,
	'drops':false,
	'name':'Component-472',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':473,
	'drops':false,
	'name':'Component-473',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':474,
	'drops':false,
	'name':'Component-474',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':475,
	'drops':false,
	'name':'Component-475',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':476,
	'drops':false,
	'name':'Component-476',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':477,
	'drops':false,
	'name':'Component-477',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':478,
	'drops':false,
	'name':'Component-478',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':479,
	'drops':false,
	'name':'Component-479',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':480,
	'drops':false,
	'name':'Component-480',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':481,
	'drops':false,
	'name':'Component-481',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':482,
	'drops':false,
	'name':'Component-482',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':483,
	'drops':false,
	'name':'Component-483',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':484,
	'drops':false,
	'name':'Component-484',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':485,
	'drops':false,
	'name':'Component-485',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':486,
	'drops':false,
	'name':'Component-486',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':487,
	'drops':false,
	'name':'Component-487',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':488,
	'drops':false,
	'name':'Component-488',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':489,
	'drops':false,
	'name':'Component-489',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':490,
	'drops':false,
	'name':'Component-490',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':491,
	'drops':false,
	'name':'Component-491',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':492,
	'drops':false,
	'name':'Component-492',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':493,
	'drops':false,
	'name':'Component-493',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':494,
	'drops':false,
	'name':'Component-494',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':495,
	'drops':false,
	'name':'Component-495',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':496,
	'drops':false,
	'name':'Component-496',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':497,
	'drops':false,
	'name':'Component-497',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':498,
	'drops':false,
	'name':'Component-498',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':499,
	'drops':false,
	'name':'Component-499',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':500,
	'drops':false,
	'name':'Component-500',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':501,
	'drops':false,
	'name':'Component-501',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':502,
	'drops':false,
	'name':'Component-502',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':503,
	'drops':false,
	'name':'Component-503',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':504,
	'drops':false,
	'name':'Component-504',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':505,
	'drops':false,
	'name':'Component-505',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':506,
	'drops':false,
	'name':'Component-506',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':507,
	'drops':false,
	'name':'Component-507',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':508,
	'drops':false,
	'name':'Component-508',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':509,
	'drops':false,
	'name':'Component-509',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':510,
	'drops':false,
	'name':'Component-510',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':511,
	'drops':false,
	'name':'Component-511',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':512,
	'drops':false,
	'name':'Component-512',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':513,
	'drops':false,
	'name':'Component-513',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':514,
	'drops':false,
	'name':'Component-514',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':515,
	'drops':false,
	'name':'Component-515',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':516,
	'drops':false,
	'name':'Component-516',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':517,
	'drops':false,
	'name':'Component-517',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':518,
	'drops':false,
	'name':'Component-518',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':519,
	'drops':false,
	'name':'Component-519',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':520,
	'drops':false,
	'name':'Component-520',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':521,
	'drops':false,
	'name':'Component-521',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':522,
	'drops':false,
	'name':'Component-522',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':523,
	'drops':false,
	'name':'Component-523',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':524,
	'drops':false,
	'name':'Component-524',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':525,
	'drops':false,
	'name':'Component-525',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':526,
	'drops':false,
	'name':'Component-526',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':527,
	'drops':false,
	'name':'Component-527',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':528,
	'drops':false,
	'name':'Component-528',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':529,
	'drops':false,
	'name':'Component-529',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':530,
	'drops':false,
	'name':'Component-530',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':531,
	'drops':false,
	'name':'Component-531',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':532,
	'drops':false,
	'name':'Component-532',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':533,
	'drops':false,
	'name':'Component-533',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':534,
	'drops':false,
	'name':'Component-534',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':535,
	'drops':false,
	'name':'Component-535',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':536,
	'drops':false,
	'name':'Component-536',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':537,
	'drops':false,
	'name':'Component-537',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':538,
	'drops':false,
	'name':'Component-538',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':539,
	'drops':false,
	'name':'Component-539',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':540,
	'drops':false,
	'name':'Component-540',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':541,
	'drops':false,
	'name':'Component-541',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':542,
	'drops':false,
	'name':'Component-542',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':543,
	'drops':false,
	'name':'Component-543',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':544,
	'drops':false,
	'name':'Component-544',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':545,
	'drops':false,
	'name':'Component-545',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':546,
	'drops':false,
	'name':'Component-546',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':547,
	'drops':false,
	'name':'Component-547',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':548,
	'drops':false,
	'name':'Component-548',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':549,
	'drops':false,
	'name':'Component-549',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':550,
	'drops':false,
	'name':'Component-550',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':551,
	'drops':false,
	'name':'Component-551',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':552,
	'drops':false,
	'name':'Component-552',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':553,
	'drops':false,
	'name':'Component-553',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':554,
	'drops':false,
	'name':'Component-554',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':555,
	'drops':false,
	'name':'Component-555',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':556,
	'drops':false,
	'name':'Component-556',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':557,
	'drops':false,
	'name':'Component-557',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':558,
	'drops':false,
	'name':'Component-558',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':559,
	'drops':false,
	'name':'Component-559',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':560,
	'drops':false,
	'name':'Component-560',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':561,
	'drops':false,
	'name':'Component-561',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':562,
	'drops':false,
	'name':'Component-562',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':563,
	'drops':false,
	'name':'Component-563',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':564,
	'drops':false,
	'name':'Component-564',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':565,
	'drops':false,
	'name':'Component-565',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':566,
	'drops':false,
	'name':'Component-566',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':567,
	'drops':false,
	'name':'Component-567',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':568,
	'drops':false,
	'name':'Component-568',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':569,
	'drops':false,
	'name':'Component-569',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':570,
	'drops':false,
	'name':'Component-570',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':571,
	'drops':false,
	'name':'Component-571',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':572,
	'drops':false,
	'name':'Component-572',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':573,
	'drops':false,
	'name':'Component-573',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':574,
	'drops':false,
	'name':'Component-574',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':575,
	'drops':false,
	'name':'Component-575',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':576,
	'drops':false,
	'name':'Component-576',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':577,
	'drops':false,
	'name':'Component-577',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':578,
	'drops':false,
	'name':'Component-578',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':579,
	'drops':false,
	'name':'Component-579',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':580,
	'drops':false,
	'name':'Component-580',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':581,
	'drops':false,
	'name':'Component-581',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':582,
	'drops':false,
	'name':'Component-582',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':583,
	'drops':false,
	'name':'Component-583',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':584,
	'drops':false,
	'name':'Component-584',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':585,
	'drops':false,
	'name':'Component-585',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':586,
	'drops':false,
	'name':'Component-586',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':587,
	'drops':false,
	'name':'Component-587',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':588,
	'drops':false,
	'name':'Component-588',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':589,
	'drops':false,
	'name':'Component-589',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':590,
	'drops':false,
	'name':'Component-590',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':591,
	'drops':false,
	'name':'Component-591',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':592,
	'drops':false,
	'name':'Component-592',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':593,
	'drops':false,
	'name':'Component-593',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':594,
	'drops':false,
	'name':'Component-594',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':595,
	'drops':false,
	'name':'Component-595',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':596,
	'drops':false,
	'name':'Component-596',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':597,
	'drops':false,
	'name':'Component-597',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':598,
	'drops':false,
	'name':'Component-598',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':599,
	'drops':false,
	'name':'Component-599',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':600,
	'drops':false,
	'name':'Component-600',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':601,
	'drops':false,
	'name':'Component-601',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':602,
	'drops':false,
	'name':'Component-602',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':603,
	'drops':false,
	'name':'Component-603',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':604,
	'drops':false,
	'name':'Component-604',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':605,
	'drops':false,
	'name':'Component-605',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':606,
	'drops':false,
	'name':'Component-606',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':607,
	'drops':false,
	'name':'Component-607',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':608,
	'drops':false,
	'name':'Component-608',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':609,
	'drops':false,
	'name':'Component-609',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':610,
	'drops':false,
	'name':'Component-610',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':611,
	'drops':false,
	'name':'Component-611',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':612,
	'drops':false,
	'name':'Component-612',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':613,
	'drops':false,
	'name':'Component-613',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':614,
	'drops':false,
	'name':'Component-614',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':615,
	'drops':false,
	'name':'Component-615',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':616,
	'drops':false,
	'name':'Component-616',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':617,
	'drops':false,
	'name':'Component-617',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':618,
	'drops':false,
	'name':'Component-618',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':619,
	'drops':false,
	'name':'Component-619',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':620,
	'drops':false,
	'name':'Component-620',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':621,
	'drops':false,
	'name':'Component-621',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':622,
	'drops':false,
	'name':'Component-622',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':623,
	'drops':false,
	'name':'Component-623',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':624,
	'drops':false,
	'name':'Component-624',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':625,
	'drops':false,
	'name':'Component-625',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':626,
	'drops':false,
	'name':'Component-626',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':627,
	'drops':false,
	'name':'Component-627',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':628,
	'drops':false,
	'name':'Component-628',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':629,
	'drops':false,
	'name':'Component-629',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':630,
	'drops':false,
	'name':'Component-630',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':631,
	'drops':false,
	'name':'Component-631',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':632,
	'drops':false,
	'name':'Component-632',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':633,
	'drops':false,
	'name':'Component-633',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':634,
	'drops':false,
	'name':'Component-634',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':635,
	'drops':false,
	'name':'Component-635',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':636,
	'drops':false,
	'name':'Component-636',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':637,
	'drops':false,
	'name':'Component-637',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':638,
	'drops':false,
	'name':'Component-638',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':639,
	'drops':false,
	'name':'Component-639',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':640,
	'drops':false,
	'name':'Component-640',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':641,
	'drops':false,
	'name':'Component-641',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':642,
	'drops':false,
	'name':'Component-642',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':643,
	'drops':false,
	'name':'Component-643',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':644,
	'drops':false,
	'name':'Component-644',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':645,
	'drops':false,
	'name':'Component-645',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':646,
	'drops':false,
	'name':'Component-646',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':647,
	'drops':false,
	'name':'Component-647',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':648,
	'drops':false,
	'name':'Component-648',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':649,
	'drops':false,
	'name':'Component-649',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':650,
	'drops':false,
	'name':'Component-650',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':651,
	'drops':false,
	'name':'Component-651',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':652,
	'drops':false,
	'name':'Component-652',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':653,
	'drops':false,
	'name':'Component-653',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':654,
	'drops':false,
	'name':'Component-654',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':655,
	'drops':false,
	'name':'Component-655',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':656,
	'drops':false,
	'name':'Component-656',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':657,
	'drops':false,
	'name':'Component-657',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':658,
	'drops':false,
	'name':'Component-658',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':659,
	'drops':false,
	'name':'Component-659',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':660,
	'drops':false,
	'name':'Component-660',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':661,
	'drops':false,
	'name':'Component-661',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':662,
	'drops':false,
	'name':'Component-662',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':663,
	'drops':false,
	'name':'Component-663',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':664,
	'drops':false,
	'name':'Component-664',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':665,
	'drops':false,
	'name':'Component-665',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':666,
	'drops':false,
	'name':'Component-666',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':667,
	'drops':false,
	'name':'Component-667',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':668,
	'drops':false,
	'name':'Component-668',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':669,
	'drops':false,
	'name':'Component-669',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':670,
	'drops':false,
	'name':'Component-670',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':671,
	'drops':false,
	'name':'Component-671',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':672,
	'drops':false,
	'name':'Component-672',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':673,
	'drops':false,
	'name':'Component-673',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':674,
	'drops':false,
	'name':'Component-674',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':675,
	'drops':false,
	'name':'Component-675',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':676,
	'drops':false,
	'name':'Component-676',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':677,
	'drops':false,
	'name':'Component-677',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':678,
	'drops':false,
	'name':'Component-678',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':679,
	'drops':false,
	'name':'Component-679',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':680,
	'drops':false,
	'name':'Component-680',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':681,
	'drops':false,
	'name':'Component-681',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':682,
	'drops':false,
	'name':'Component-682',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':683,
	'drops':false,
	'name':'Component-683',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':684,
	'drops':false,
	'name':'Component-684',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':685,
	'drops':false,
	'name':'Component-685',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':686,
	'drops':false,
	'name':'Component-686',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':687,
	'drops':false,
	'name':'Component-687',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':688,
	'drops':false,
	'name':'Component-688',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':689,
	'drops':false,
	'name':'Component-689',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':690,
	'drops':false,
	'name':'Component-690',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':691,
	'drops':false,
	'name':'Component-691',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':692,
	'drops':false,
	'name':'Component-692',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':693,
	'drops':false,
	'name':'Component-693',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':694,
	'drops':false,
	'name':'Component-694',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':695,
	'drops':false,
	'name':'Component-695',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':696,
	'drops':false,
	'name':'Component-696',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':697,
	'drops':false,
	'name':'Component-697',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':698,
	'drops':false,
	'name':'Component-698',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':699,
	'drops':false,
	'name':'Component-699',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':700,
	'drops':false,
	'name':'Component-700',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':701,
	'drops':false,
	'name':'Component-701',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':702,
	'drops':false,
	'name':'Component-702',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':703,
	'drops':false,
	'name':'Component-703',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':704,
	'drops':false,
	'name':'Component-704',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':705,
	'drops':false,
	'name':'Component-705',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':706,
	'drops':false,
	'name':'Component-706',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':707,
	'drops':false,
	'name':'Component-707',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':708,
	'drops':false,
	'name':'Component-708',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':709,
	'drops':false,
	'name':'Component-709',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':710,
	'drops':false,
	'name':'Component-710',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':711,
	'drops':false,
	'name':'Component-711',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':712,
	'drops':false,
	'name':'Component-712',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':713,
	'drops':false,
	'name':'Component-713',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':714,
	'drops':false,
	'name':'Component-714',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':715,
	'drops':false,
	'name':'Component-715',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':716,
	'drops':false,
	'name':'Component-716',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':717,
	'drops':false,
	'name':'Component-717',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':718,
	'drops':false,
	'name':'Component-718',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':719,
	'drops':false,
	'name':'Component-719',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':720,
	'drops':false,
	'name':'Component-720',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':721,
	'drops':false,
	'name':'Component-721',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':722,
	'drops':false,
	'name':'Component-722',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':723,
	'drops':false,
	'name':'Component-723',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':724,
	'drops':false,
	'name':'Component-724',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':725,
	'drops':false,
	'name':'Component-725',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':726,
	'drops':false,
	'name':'Component-726',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':727,
	'drops':false,
	'name':'Component-727',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':728,
	'drops':false,
	'name':'Component-728',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':729,
	'drops':false,
	'name':'Component-729',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':730,
	'drops':false,
	'name':'Component-730',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':731,
	'drops':false,
	'name':'Component-731',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':732,
	'drops':false,
	'name':'Component-732',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':733,
	'drops':false,
	'name':'Component-733',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':734,
	'drops':false,
	'name':'Component-734',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':735,
	'drops':false,
	'name':'Component-735',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':736,
	'drops':false,
	'name':'Component-736',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':737,
	'drops':false,
	'name':'Component-737',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':738,
	'drops':false,
	'name':'Component-738',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':739,
	'drops':false,
	'name':'Component-739',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':740,
	'drops':false,
	'name':'Component-740',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':741,
	'drops':false,
	'name':'Component-741',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':742,
	'drops':false,
	'name':'Component-742',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':743,
	'drops':false,
	'name':'Component-743',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':744,
	'drops':false,
	'name':'Component-744',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':745,
	'drops':false,
	'name':'Component-745',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':746,
	'drops':false,
	'name':'Component-746',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':747,
	'drops':false,
	'name':'Component-747',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':748,
	'drops':false,
	'name':'Component-748',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':749,
	'drops':false,
	'name':'Component-749',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':750,
	'drops':false,
	'name':'Component-750',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':751,
	'drops':false,
	'name':'Component-751',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':752,
	'drops':false,
	'name':'Component-752',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':753,
	'drops':false,
	'name':'Component-753',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':754,
	'drops':false,
	'name':'Component-754',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':755,
	'drops':false,
	'name':'Component-755',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':756,
	'drops':false,
	'name':'Component-756',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':757,
	'drops':false,
	'name':'Component-757',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':758,
	'drops':false,
	'name':'Component-758',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':759,
	'drops':false,
	'name':'Component-759',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':760,
	'drops':false,
	'name':'Component-760',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':761,
	'drops':false,
	'name':'Component-761',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':762,
	'drops':false,
	'name':'Component-762',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':763,
	'drops':false,
	'name':'Component-763',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':764,
	'drops':false,
	'name':'Component-764',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':765,
	'drops':false,
	'name':'Component-765',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':766,
	'drops':false,
	'name':'Component-766',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':767,
	'drops':false,
	'name':'Component-767',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':768,
	'drops':false,
	'name':'Component-768',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':769,
	'drops':false,
	'name':'Component-769',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':770,
	'drops':false,
	'name':'Component-770',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':771,
	'drops':false,
	'name':'Component-771',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':772,
	'drops':false,
	'name':'Component-772',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':773,
	'drops':false,
	'name':'Component-773',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':774,
	'drops':false,
	'name':'Component-774',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':775,
	'drops':false,
	'name':'Component-775',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':776,
	'drops':false,
	'name':'Component-776',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':777,
	'drops':false,
	'name':'Component-777',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':778,
	'drops':false,
	'name':'Component-778',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':779,
	'drops':false,
	'name':'Component-779',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':780,
	'drops':false,
	'name':'Component-780',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':781,
	'drops':false,
	'name':'Component-781',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':782,
	'drops':false,
	'name':'Component-782',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':783,
	'drops':false,
	'name':'Component-783',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':784,
	'drops':false,
	'name':'Component-784',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':785,
	'drops':false,
	'name':'Component-785',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':786,
	'drops':false,
	'name':'Component-786',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':787,
	'drops':false,
	'name':'Component-787',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':788,
	'drops':false,
	'name':'Component-788',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':789,
	'drops':false,
	'name':'Component-789',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':790,
	'drops':false,
	'name':'Component-790',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':791,
	'drops':false,
	'name':'Component-791',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':792,
	'drops':false,
	'name':'Component-792',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':793,
	'drops':false,
	'name':'Component-793',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':794,
	'drops':false,
	'name':'Component-794',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':795,
	'drops':false,
	'name':'Component-795',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':796,
	'drops':false,
	'name':'Component-796',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':797,
	'drops':false,
	'name':'Component-797',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':798,
	'drops':false,
	'name':'Component-798',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':799,
	'drops':false,
	'name':'Component-799',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':800,
	'drops':false,
	'name':'Component-800',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':801,
	'drops':false,
	'name':'Component-801',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':802,
	'drops':false,
	'name':'Component-802',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':803,
	'drops':false,
	'name':'Component-803',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':804,
	'drops':false,
	'name':'Component-804',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':805,
	'drops':false,
	'name':'Component-805',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':806,
	'drops':false,
	'name':'Component-806',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':807,
	'drops':false,
	'name':'Component-807',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':808,
	'drops':false,
	'name':'Component-808',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':809,
	'drops':false,
	'name':'Component-809',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':810,
	'drops':false,
	'name':'Component-810',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':811,
	'drops':false,
	'name':'Component-811',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':812,
	'drops':false,
	'name':'Component-812',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':813,
	'drops':false,
	'name':'Component-813',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':814,
	'drops':false,
	'name':'Component-814',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':815,
	'drops':false,
	'name':'Component-815',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':816,
	'drops':false,
	'name':'Component-816',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':817,
	'drops':false,
	'name':'Component-817',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':818,
	'drops':false,
	'name':'Component-818',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':819,
	'drops':false,
	'name':'Component-819',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':820,
	'drops':false,
	'name':'Component-820',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':821,
	'drops':false,
	'name':'Component-821',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':822,
	'drops':false,
	'name':'Component-822',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':823,
	'drops':false,
	'name':'Component-823',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':824,
	'drops':false,
	'name':'Component-824',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':825,
	'drops':false,
	'name':'Component-825',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':826,
	'drops':false,
	'name':'Component-826',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':827,
	'drops':false,
	'name':'Component-827',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':828,
	'drops':false,
	'name':'Component-828',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':829,
	'drops':false,
	'name':'Component-829',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':830,
	'drops':false,
	'name':'Component-830',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':831,
	'drops':false,
	'name':'Component-831',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':832,
	'drops':false,
	'name':'Component-832',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':833,
	'drops':false,
	'name':'Component-833',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':834,
	'drops':false,
	'name':'Component-834',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':835,
	'drops':false,
	'name':'Component-835',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':836,
	'drops':false,
	'name':'Component-836',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':837,
	'drops':false,
	'name':'Component-837',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':838,
	'drops':false,
	'name':'Component-838',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':839,
	'drops':false,
	'name':'Component-839',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':840,
	'drops':false,
	'name':'Component-840',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':841,
	'drops':false,
	'name':'Component-841',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':842,
	'drops':false,
	'name':'Component-842',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':843,
	'drops':false,
	'name':'Component-843',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':844,
	'drops':false,
	'name':'Component-844',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':845,
	'drops':false,
	'name':'Component-845',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':846,
	'drops':false,
	'name':'Component-846',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':847,
	'drops':false,
	'name':'Component-847',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':848,
	'drops':false,
	'name':'Component-848',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':849,
	'drops':false,
	'name':'Component-849',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':850,
	'drops':false,
	'name':'Component-850',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':851,
	'drops':false,
	'name':'Component-851',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':852,
	'drops':false,
	'name':'Component-852',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':853,
	'drops':false,
	'name':'Component-853',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':854,
	'drops':false,
	'name':'Component-854',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':855,
	'drops':false,
	'name':'Component-855',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':856,
	'drops':false,
	'name':'Component-856',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':857,
	'drops':false,
	'name':'Component-857',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':858,
	'drops':false,
	'name':'Component-858',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':859,
	'drops':false,
	'name':'Component-859',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':860,
	'drops':false,
	'name':'Component-860',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':861,
	'drops':false,
	'name':'Component-861',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':862,
	'drops':false,
	'name':'Component-862',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':863,
	'drops':false,
	'name':'Component-863',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':864,
	'drops':false,
	'name':'Component-864',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':865,
	'drops':false,
	'name':'Component-865',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':866,
	'drops':false,
	'name':'Component-866',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':867,
	'drops':false,
	'name':'Component-867',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':868,
	'drops':false,
	'name':'Component-868',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':869,
	'drops':false,
	'name':'Component-869',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':870,
	'drops':false,
	'name':'Component-870',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':871,
	'drops':false,
	'name':'Component-871',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':872,
	'drops':false,
	'name':'Component-872',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':873,
	'drops':false,
	'name':'Component-873',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':874,
	'drops':false,
	'name':'Component-874',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':875,
	'drops':false,
	'name':'Component-875',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':876,
	'drops':false,
	'name':'Component-876',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':877,
	'drops':false,
	'name':'Component-877',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':878,
	'drops':false,
	'name':'Component-878',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':879,
	'drops':false,
	'name':'Component-879',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':880,
	'drops':false,
	'name':'Component-880',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':881,
	'drops':false,
	'name':'Component-881',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':882,
	'drops':false,
	'name':'Component-882',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':883,
	'drops':false,
	'name':'Component-883',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':884,
	'drops':false,
	'name':'Component-884',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':885,
	'drops':false,
	'name':'Component-885',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':886,
	'drops':false,
	'name':'Component-886',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':887,
	'drops':false,
	'name':'Component-887',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':888,
	'drops':false,
	'name':'Component-888',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':889,
	'drops':false,
	'name':'Component-889',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':890,
	'drops':false,
	'name':'Component-890',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':891,
	'drops':false,
	'name':'Component-891',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':892,
	'drops':false,
	'name':'Component-892',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':893,
	'drops':false,
	'name':'Component-893',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':894,
	'drops':false,
	'name':'Component-894',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':895,
	'drops':false,
	'name':'Component-895',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':896,
	'drops':false,
	'name':'Component-896',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':897,
	'drops':false,
	'name':'Component-897',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':898,
	'drops':false,
	'name':'Component-898',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':899,
	'drops':false,
	'name':'Component-899',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':900,
	'drops':false,
	'name':'Component-900',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':901,
	'drops':false,
	'name':'Component-901',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':902,
	'drops':false,
	'name':'Component-902',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':903,
	'drops':false,
	'name':'Component-903',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':904,
	'drops':false,
	'name':'Component-904',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':905,
	'drops':false,
	'name':'Component-905',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':906,
	'drops':false,
	'name':'Component-906',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':907,
	'drops':false,
	'name':'Component-907',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':908,
	'drops':false,
	'name':'Component-908',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':909,
	'drops':false,
	'name':'Component-909',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':910,
	'drops':false,
	'name':'Component-910',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':911,
	'drops':false,
	'name':'Component-911',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':912,
	'drops':false,
	'name':'Component-912',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':913,
	'drops':false,
	'name':'Component-913',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':914,
	'drops':false,
	'name':'Component-914',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':915,
	'drops':false,
	'name':'Component-915',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':916,
	'drops':false,
	'name':'Component-916',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':917,
	'drops':false,
	'name':'Component-917',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':918,
	'drops':false,
	'name':'Component-918',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':919,
	'drops':false,
	'name':'Component-919',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':920,
	'drops':false,
	'name':'Component-920',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':921,
	'drops':false,
	'name':'Component-921',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':922,
	'drops':false,
	'name':'Component-922',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':923,
	'drops':false,
	'name':'Component-923',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':924,
	'drops':false,
	'name':'Component-924',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':925,
	'drops':false,
	'name':'Component-925',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':926,
	'drops':false,
	'name':'Component-926',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':927,
	'drops':false,
	'name':'Component-927',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':928,
	'drops':false,
	'name':'Component-928',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':929,
	'drops':false,
	'name':'Component-929',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':930,
	'drops':false,
	'name':'Component-930',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':931,
	'drops':false,
	'name':'Component-931',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':932,
	'drops':false,
	'name':'Component-932',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':933,
	'drops':false,
	'name':'Component-933',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':934,
	'drops':false,
	'name':'Component-934',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':935,
	'drops':false,
	'name':'Component-935',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':936,
	'drops':false,
	'name':'Component-936',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':937,
	'drops':false,
	'name':'Component-937',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':938,
	'drops':false,
	'name':'Component-938',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':939,
	'drops':false,
	'name':'Component-939',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':940,
	'drops':false,
	'name':'Component-940',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':941,
	'drops':false,
	'name':'Component-941',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':942,
	'drops':false,
	'name':'Component-942',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':943,
	'drops':false,
	'name':'Component-943',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':944,
	'drops':false,
	'name':'Component-944',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':945,
	'drops':false,
	'name':'Component-945',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':946,
	'drops':false,
	'name':'Component-946',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':947,
	'drops':false,
	'name':'Component-947',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':948,
	'drops':false,
	'name':'Component-948',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':949,
	'drops':false,
	'name':'Component-949',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':950,
	'drops':false,
	'name':'Component-950',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':951,
	'drops':false,
	'name':'Component-951',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':952,
	'drops':false,
	'name':'Component-952',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':953,
	'drops':false,
	'name':'Component-953',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':954,
	'drops':false,
	'name':'Component-954',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':955,
	'drops':false,
	'name':'Component-955',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':956,
	'drops':false,
	'name':'Component-956',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':957,
	'drops':false,
	'name':'Component-957',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':958,
	'drops':false,
	'name':'Component-958',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':959,
	'drops':false,
	'name':'Component-959',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':960,
	'drops':false,
	'name':'Component-960',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':961,
	'drops':false,
	'name':'Component-961',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':962,
	'drops':false,
	'name':'Component-962',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':963,
	'drops':false,
	'name':'Component-963',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':964,
	'drops':false,
	'name':'Component-964',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':965,
	'drops':false,
	'name':'Component-965',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':966,
	'drops':false,
	'name':'Component-966',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':967,
	'drops':false,
	'name':'Component-967',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':968,
	'drops':false,
	'name':'Component-968',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':969,
	'drops':false,
	'name':'Component-969',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':970,
	'drops':false,
	'name':'Component-970',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':971,
	'drops':false,
	'name':'Component-971',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':972,
	'drops':false,
	'name':'Component-972',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':973,
	'drops':false,
	'name':'Component-973',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':974,
	'drops':false,
	'name':'Component-974',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':975,
	'drops':false,
	'name':'Component-975',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':976,
	'drops':false,
	'name':'Component-976',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':977,
	'drops':false,
	'name':'Component-977',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':978,
	'drops':false,
	'name':'Component-978',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':979,
	'drops':false,
	'name':'Component-979',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':980,
	'drops':false,
	'name':'Component-980',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':981,
	'drops':false,
	'name':'Component-981',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':982,
	'drops':false,
	'name':'Component-982',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':983,
	'drops':false,
	'name':'Component-983',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':984,
	'drops':false,
	'name':'Component-984',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':985,
	'drops':false,
	'name':'Component-985',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':986,
	'drops':false,
	'name':'Component-986',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':987,
	'drops':false,
	'name':'Component-987',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':988,
	'drops':false,
	'name':'Component-988',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':989,
	'drops':false,
	'name':'Component-989',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':990,
	'drops':false,
	'name':'Component-990',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':991,
	'drops':false,
	'name':'Component-991',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':992,
	'drops':false,
	'name':'Component-992',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':993,
	'drops':false,
	'name':'Component-993',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':994,
	'drops':false,
	'name':'Component-994',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':995,
	'drops':false,
	'name':'Component-995',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':996,
	'drops':false,
	'name':'Component-996',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':997,
	'drops':false,
	'name':'Component-997',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':998,
	'drops':false,
	'name':'Component-998',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':999,
	'drops':false,
	'name':'Component-999',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1000,
	'drops':false,
	'name':'Component-1000',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1001,
	'drops':false,
	'name':'Component-1001',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1002,
	'drops':false,
	'name':'Component-1002',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1003,
	'drops':false,
	'name':'Component-1003',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1004,
	'drops':false,
	'name':'Component-1004',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1005,
	'drops':false,
	'name':'Component-1005',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1006,
	'drops':false,
	'name':'Component-1006',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1007,
	'drops':false,
	'name':'Component-1007',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1008,
	'drops':false,
	'name':'Component-1008',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1009,
	'drops':false,
	'name':'Component-1009',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1010,
	'drops':false,
	'name':'Component-1010',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1011,
	'drops':false,
	'name':'Component-1011',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1012,
	'drops':false,
	'name':'Component-1012',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1013,
	'drops':false,
	'name':'Component-1013',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1014,
	'drops':false,
	'name':'Component-1014',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1015,
	'drops':false,
	'name':'Component-1015',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1016,
	'drops':false,
	'name':'Component-1016',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1017,
	'drops':false,
	'name':'Component-1017',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1018,
	'drops':false,
	'name':'Component-1018',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1019,
	'drops':false,
	'name':'Component-1019',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1020,
	'drops':false,
	'name':'Component-1020',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1021,
	'drops':false,
	'name':'Component-1021',
	'flavor':'--',
	'bonus':function(target){

	}
},
{
	'id':1022,
	'drops':false,
	'name':'Component-1022',
	'flavor':'--',
	'bonus':function(target){

	}
},{
	'id':1023,
	'drops':false,
	'name':'Component1023',
	'flavor':'Void. Fearful dark void.',
	'bonus':function(target){

	}
}	
];

var components=[];

for (var i=0;i<cmp.length;i++) {
	components[cmp[i].id]=cmp[i];

};

