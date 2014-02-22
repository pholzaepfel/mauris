var cmp = [
{	
	'id':0, 
	'drops':true,
	'name':'Component0',
	'flavor':'',
	'bonus':function(target){}
},
{
	'id':1,
	'drops':true,
	'name':'Rusted Wing',
	'flavor':'',
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
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=3;
		target.fireEnergy+=1;
		target.fireRange+=1000;
		target.fireDamage+=1;
		target.fireRate+=200;
		target.fireVelocity+=150;
		target.sprite.profile+=25;
	}
},
{
	'id':3,
	'drops':true,
	'name':'Capacitor Unit',
	'flavor':'',
	'bonus':function(target){
		target.energyMax+=10;
		target.energyAmount+=1;
	}
},
{
	'id':4,
	'drops':true,
	'name':'VariJet',
	'flavor':'',
	'bonus':function(target){
		target.turnRate+=0.5;
		target.acceleration+=0.3;
	}
},
{
	'id':5,
	'drops':true,
	'name':'Overpowered Burst Laser',
	'flavor':'',
	'bonus':function(target){
		target.fireVelocity+=200;
		target.fireRate*=0.25;
		target.bulletSprite=3;
		target.sprite.profile+=50;
	}
},
{
	'id':6,
	'drops':true,
	'name':'Alien Pustule',
	'flavor':'',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.sprite.profile+=10;
	}
},
{
	'id':7,
	'drops':true,
	'name':'Alien Pustule',
	'flavor':'',
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
	'flavor':'',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':9,
	'drops':true,
	'name':'Mineral Scanner',
	'flavor':'',
	'bonus':function(target){
		target.radarTargets+=1;
		target.radarOreTargets+=2; //TODO
	}
},
{
	'id':10,
	'drops':true,
	'name':'Fusion Core',
	'flavor':'',
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
	'flavor':'',
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
	'name':'Xenoform Resprite',
	'flavor':'',
	'bonus':function(target){
		target.energyRate*=0.5;
		target.sprite.profile+=100;
		target.fireDamage*=1.2;
	}
},
{
	'id':13,
	'drops':true,
	'name':'Fusion Bolt Cannon',
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=0; //TODO
		target.fireEnergy*=2;
		if(target.energyMax<target.fireEnergy){
			target.energyMax=target.fireEnergy;
		}
		target.fireDamage*=2;
		target.fireRate*=1.5;
		target.fireVelocity*=2;
		target.sprite.profile+=200;
	}
},
{
	'id':14,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;
	}
},
{
	'id':15,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){

		target.ai=2;
	}
},
{
	'id':16,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;

	}
},
{
	'id':17,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;

	}
},
{
	'id':18,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;

	}
},
{
	'id':19,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;

	}
},
{
	'id':20,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;

	}
},
{
	'id':21,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;

	}
},
{
	'id':22,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;

	}
},
{
	'id':23,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;

	}
},
{
	'id':24,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;

	}
},
{
	'id':25,
	'drops':false,
	'name':'Asteroid',
	'flavor':'',
	'bonus':function(target){
		target.ai=2;

	}
},
{
	'id':26,
	'drops':true,
	'name':'Loot',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':27,
	'drops':true,
	'name':'Loot',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':28,
	'drops':true,
	'name':'Loot',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':29,
	'drops':true,
	'name':'Loot',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':30,
	'drops':true,
	'name':'Battle-worn Panel',
	'flavor':'',
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
	'flavor':'',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':32,
	'drops':true,
	'name':'Radioactive Thruster',
	'flavor':'',
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
	'flavor':'',
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
	'flavor':'',
	'bonus':function(target){
		target.turnRate+=0.3;
		target.acceleration+=0.2;
		target.heatlth+=4;
	}
},
{
	'id':35,
	'drops':true,
	'name':'Fusion Thrust',
	'flavor':'',
	'bonus':function(target){
		target.acceleration+=0.7;
		target.health+=1;
	}
},
{
	'id':36,
	'drops':true,
	'name':'Standard Quarters',
	'flavor':'',
	'bonus':function(target){
		target.health+=3;
		target.energyAmount+1;
		target.energyMax+=4;
		target.sprite.profile+=20;
	}
},
{
	'id':37,
	'drops':true,
	'name':'Command Center',
	'flavor':'',
	'bonus':function(target){
		target.health+=6;
		target.turnRate+=0.2;
	}
},

{
	'id':38,
	'drops':true,
	'name':'Alien Pustule',
	'flavor':'',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.sprite.profile+=10;
	}
},
{
	'id':39,
	'drops':true,
	'name':'Alien Pustule',
	'flavor':'',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.sprite.profile+=10;
	}
},
{
	'id':40,
	'drops':true,
	'name':'Experimental Navigation System',
	'flavor':'',
	'bonus':function(target){
		target.turnSpeed+=0.6;
		target.fireRate*=0.9;
		target.acceleration+=0.4;
		target.energyRate*=0.95;
	}
},
{
	'id':41,
	'drops':true,
	'name':'Force Multiplier',
	'flavor':'',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
			bullet.rotation+=Math.random()*0.4-0.2;
			game.physics.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
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
	'flavor':'',
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
	'flavor':'',
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
	'flavor':'',
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
	'flavor':'',
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
	'flavor':'',
	'bonus':function(target){
		target.turnRate+=0.3;
		target.profileDecay+=20;
	}
},
{
	'id':47,
	'drops':true,
	'name':'Gargantuan Plasma Thrower',
	'flavor':'',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
			bullet.rotation+=Math.random()*0.5-0.25;
			game.physics.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
		});
		target.fireRate*=0.5;
		target.fireEnergy*=0.6;
		target.fireRange*=0.6;
		target.sprite.profile+=88;
	}
},
{
	'id':48,
	'drops':true,
	'name':'Component48',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':49,
	'drops':true,
	'name':'Component49',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':50,
	'drops':true,
	'name':'Component50',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':51,
	'drops':true,
	'name':'Component51',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':52,
	'drops':true,
	'name':'Component52',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':53,
	'drops':true,
	'name':'Component53',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':54,
	'drops':true,
	'name':'Component54',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':55,
	'drops':true,
	'name':'Component55',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':56,
	'drops':true,
	'name':'Component56',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':57,
	'drops':true,
	'name':'Component57',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':58,
	'drops':true,
	'name':'Component58',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':59,
	'drops':true,
	'name':'Component59',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':60,
	'drops':true,
	'name':'Component60',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':61,
	'drops':true,
	'name':'Component61',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':62,
	'drops':true,
	'name':'Component62',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':63,
	'drops':true,
	'name':'Component63',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':64,
	'drops':true,
	'name':'Targeting System',
	'flavor':'',
	'bonus':function(target){
		target.radarTargets+=2;
		target.radarShowInEnemyRange=true;
	}
},
{
	'id':65,
	'drops':true,
	'name':'Worn Armor Plating',
	'flavor':'',
	'bonus':function(target){
		target.health+=13;
		target.acceleration*=0.8;
		target.turnRate*=0.6;
		target.sprite.profile+=10;
	}
},
{
	'id':66,
	'drops':true,
	'name':'Discount Attitude Jet',
	'flavor':'',
	'bonus':function(target){
		target.turnRate+=0.7;
		target.acceleration+=0.3;
	}
},
{
	'id':67,
	'drops':true,
	'name':'Long Range Sensor',
	'flavor':'',
	'bonus':function(target){
		target.radarTargets+=2;
		target.radarShowInRange=true;
	}
},
{
	'id':68,
	'drops':true,
	'name':'Durasteel Plating',
	'flavor':'',
	'bonus':function(target){
		target.health+=18;
		target.acceleration*=0.7;
		target.turnRate*=0.5;
		target.sprite.profile+=10;	
	}
},
{
	'id':69,
	'drops':true,
	'name':'Angular Ion Thrust',
	'flavor':'',
	'bonus':function(target){
		target.turnRate+=1
	}
},
{
	'id':70,
	'drops':true,
	'name':'Low-Profile Wing',
	'flavor':'',
	'bonus':function(target){
		target.sprite.profile-=25;//refund standard profile cost
		target.sprite.profile*=0.9;
		target.acceleration+=0.3;
		target.turnRate+=0.2;

	}
},
{
	'id':71,
	'drops':true,
	'name':'Command Deck',
	'flavor':'',
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
	'flavor':'',
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
	'name':'Ion-Bolt Gun',
	'flavor':'',
	'bonus':function(target){
		target.fireDamage+=2;
		target.fireRate+=100;

		target.sprite.profile+=20;	
	}
},
{
	'id':74,
	'drops':true,
	'name':'Habitat',
	'flavor':'',
	'bonus':function(target){
		target.health+=7;
		target.acceleration-=0.1;
		target.energyRate*=1.05;
		target.energyMax+=3;
	}
},
{
	'id':75,
	'drops':true,
	'name':'Habitat',
	'flavor':'',
	'bonus':function(target){

		target.health+=7;
		target.acceleration-=0.1;
		target.energyRate*=1.05;
		target.energyMax+=3;
	}
},
{
	'id':76,
	'drops':true,
	'name':'AWSM',
	'flavor':'',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':77,
	'drops':true,
	'name':'Decorative Skull',
	'flavor':'',
	'bonus':function(target){
		target.sprite.profile+=50;
		target.fireDamage+=2;
		target.fireRate*=0.9;
	}
},
{
	'id':78,
	'drops':true,
	'name':'Component78',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':79,
	'drops':true,
	'name':'Component79',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':80,
	'drops':true,
	'name':'Component80',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':81,
	'drops':true,
	'name':'Component81',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':82,
	'drops':true,
	'name':'Component82',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':83,
	'drops':true,
	'name':'Component83',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':84,
	'drops':true,
	'name':'Component84',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':85,
	'drops':true,
	'name':'Component85',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':86,
	'drops':true,
	'name':'Component86',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':87,
	'drops':true,
	'name':'Component87',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':88,
	'drops':true,
	'name':'Component88',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':89,
	'drops':true,
	'name':'Component89',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':90,
	'drops':true,
	'name':'Component90',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':91,
	'drops':true,
	'name':'Component91',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':92,
	'drops':true,
	'name':'Component92',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':93,
	'drops':true,
	'name':'Component93',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':94,
	'drops':true,
	'name':'Component94',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':95,
	'drops':true,
	'name':'Component95',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':96,
	'drops':true,
	'name':'Pirate CPU',
	'flavor':'',
	'bonus':function(target){
		target.fireRate*=0.8;
		target.energyRate*=0.7;

		target.sprite.profile+=20;	
	}
},
{
	'id':97,
	'drops':true,
	'name':'Faulty Wiring',
	'flavor':'',
	'bonus':function(target){
		target.energyMax+=12;
		target.energyRate+=1000;
		target.energyAmount+=1;

		target.sprite.profile-=20;	
	}
},
{
	'id':98,
	'drops':true,
	'name':'Destroyed Airlock',
	'flavor':'',
	'bonus':function(target){
		target.health-=1;
		target.bulletDamage+=3;
	}
},
{
	'id':99,
	'drops':true,
	'name':'Advanced Processor',
	'flavor':'',
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
	'name':'Special Device',
	'flavor':'',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':101,
	'drops':true,
	'name':'Weapon Rotator',
	'flavor':'',
	'bonus':function(target){
		target.fireRate*=0.7;
		target.fireDamage+=1;
		target.sprite.profile+=30;
	}
},
{
	'id':102,
	'drops':true,
	'name':'Prototype Stabilizer',
	'flavor':'',
	'bonus':function(target){
		target.turnRate+=0.6;
		target.acceleration+=0.2;
		target.sprite.profile*=0.9;
	}
},
{
	'id':103,
	'drops':true,
	'name':'Tactical Control Module',
	'flavor':'',
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
	'flavor':'',
	'bonus':function(target){
		target.acceleration+=0.8;
		target.energyRate*=0.9;
	}
},
{
	'id':105,
	'drops':true,
	'name':'Observation Unit',
	'flavor':'',
	'bonus':function(target){
		target.health+=3;
		target.fireRange+=500;
		target.fireVelocity+=100;
		target.TODO=1;
	}
},
{
	'id':106,
	'drops':true,
	'name':'Habitat',
	'flavor':'',
	'bonus':function(target){

		target.health+=7;
		target.acceleration-=0.1;
		target.energyRate*=1.05;
		target.energyMax+=3;
	}
},
{
	'id':107,
	'drops':true,
	'name':'Habitat',
	'flavor':'',
	'bonus':function(target){

		target.health+=7;
		target.acceleration-=0.1;
		target.energyRate*=1.05;
		target.energyMax+=3;
	}
},
{
	'id':108,
	'drops':true,
	'name':'Vidscreen Ad <BurgerJoint>',
	'flavor':'',
	'bonus':function(target){
		target.sprite.profile+=25;
		target.cashFlow+=10;

	}
},
{
	'id':109,
	'drops':true,
	'name':'Vidscreen Ad <Cola>',
	'flavor':'',
	'bonus':function(target){
		target.sprite.profile+=25;
		target.cashFlow+=10; //TODO
	}
},
{
	'id':110,
	'drops':true,
	'name':'Component110',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':111,
	'drops':true,
	'name':'Component111',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':112,
	'drops':true,
	'name':'Component112',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':113,
	'drops':true,
	'name':'Component113',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':114,
	'drops':true,
	'name':'Component114',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':115,
	'drops':true,
	'name':'Component115',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':116,
	'drops':true,
	'name':'Component116',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':117,
	'drops':true,
	'name':'Component117',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':118,
	'drops':true,
	'name':'Component118',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':119,
	'drops':true,
	'name':'Component119',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':120,
	'drops':true,
	'name':'Component120',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':121,
	'drops':true,
	'name':'Component121',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':122,
	'drops':true,
	'name':'Component122',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':123,
	'drops':true,
	'name':'Component123',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':124,
	'drops':true,
	'name':'Component124',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':125,
	'drops':true,
	'name':'Component125',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':126,
	'drops':true,
	'name':'Component126',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':127,
	'drops':true,
	'name':'Component127',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':128,
	'drops':true,
	'name':'Contraband Missiles',
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=2;
		target.fireDamage+=4;
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
	'flavor':'',
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
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=1;
		target.fireRate*=0.7;
		target.fireRange*=0.7;
		target.fireDamage*=0.7;
		target.fireEnergy*=0.7;
		target.sprite.profile+=20;
	}
},
{
	'id':131,
	'drops':true,
	'name':'Freedom Missiles',
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=2;
		target.fireDamage+=2;
		target.fireEnergy+=2;
		target.sprite.profile+=15;
	}
},
{
	'id':132,
	'drops':true,
	'name':'Ultralight Wing',
	'flavor':'',
	'bonus':function(target){
		target.health+=2;
		target.acceleration+=0.5;
	}
},
{
	'id':133,
	'drops':true,
	'name':'Gleaming Autocannon',
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=1;
		target.fireRate*=0.7;
		target.fireDamage+=1;
		target.sprite.profile+=150;
	}
},
{
	'id':134,
	'drops':true,
	'name':'Component134',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':135,
	'drops':true,
	'name':'Component135',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':136,
	'drops':true,
	'name':'Component136',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':137,
	'drops':true,
	'name':'Component137',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':138,
	'drops':true,
	'name':'Component138',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':139,
	'drops':true,
	'name':'Component139',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':140,
	'drops':true,
	'name':'Component140',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':141,
	'drops':true,
	'name':'Component141',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':142,
	'drops':true,
	'name':'Component142',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':143,
	'drops':true,
	'name':'Component143',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':144,
	'drops':true,
	'name':'Component144',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':145,
	'drops':true,
	'name':'Component145',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':146,
	'drops':true,
	'name':'Component146',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':147,
	'drops':true,
	'name':'Component147',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':148,
	'drops':true,
	'name':'Component148',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':149,
	'drops':true,
	'name':'Component149',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':150,
	'drops':true,
	'name':'Component150',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':151,
	'drops':true,
	'name':'Component151',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':152,
	'drops':true,
	'name':'Component152',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':153,
	'drops':true,
	'name':'Component153',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':154,
	'drops':true,
	'name':'Component154',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':155,
	'drops':true,
	'name':'Component155',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':156,
	'drops':true,
	'name':'Component156',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':157,
	'drops':true,
	'name':'Component157',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':158,
	'drops':true,
	'name':'Component158',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':159,
	'drops':true,
	'name':'Component159',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':160,
	'drops':true,
	'name':'Illegal Cargo',
	'flavor':'',
	'bonus':function(target){
		target.energyMax+=6;
		target.energyRate*=.75;
		target.energyAmount+=1;
		target.sprite.profile+=100;
	}
},
{
	'id':161,
	'drops':true,
	'name':'Component161',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':162,
	'drops':true,
	'name':'Component162',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':163,
	'drops':true,
	'name':'Component163',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':164,
	'drops':true,
	'name':'Component164',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':165,
	'drops':true,
	'name':'Component165',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':166,
	'drops':true,
	'name':'Component166',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':167,
	'drops':true,
	'name':'Component167',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':168,
	'drops':true,
	'name':'Component168',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':169,
	'drops':true,
	'name':'Component169',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':170,
	'drops':true,
	'name':'Component170',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':171,
	'drops':true,
	'name':'Component171',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':172,
	'drops':true,
	'name':'Component172',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':173,
	'drops':true,
	'name':'Component173',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':174,
	'drops':true,
	'name':'Component174',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':175,
	'drops':true,
	'name':'Component175',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':176,
	'drops':true,
	'name':'Component176',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':177,
	'drops':true,
	'name':'Component177',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':178,
	'drops':true,
	'name':'Component178',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':179,
	'drops':true,
	'name':'Component179',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':180,
	'drops':true,
	'name':'Component180',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':181,
	'drops':true,
	'name':'Component181',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':182,
	'drops':true,
	'name':'Component182',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':183,
	'drops':true,
	'name':'Component183',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':184,
	'drops':true,
	'name':'Component184',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':185,
	'drops':true,
	'name':'Component185',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':186,
	'drops':true,
	'name':'Component186',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':187,
	'drops':true,
	'name':'Component187',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':188,
	'drops':true,
	'name':'Component188',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':189,
	'drops':true,
	'name':'Component189',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':190,
	'drops':true,
	'name':'Component190',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':191,
	'drops':true,
	'name':'Component191',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':192,
	'drops':true,
	'name':'Component192',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':193,
	'drops':true,
	'name':'Component193',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':194,
	'drops':true,
	'name':'Component194',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':195,
	'drops':true,
	'name':'Component195',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':196,
	'drops':true,
	'name':'Component196',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':197,
	'drops':true,
	'name':'Component197',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':198,
	'drops':true,
	'name':'Component198',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':199,
	'drops':true,
	'name':'Component199',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':200,
	'drops':true,
	'name':'Component200',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':201,
	'drops':true,
	'name':'Component201',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':202,
	'drops':true,
	'name':'Component202',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':203,
	'drops':true,
	'name':'Component203',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':204,
	'drops':true,
	'name':'Component204',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':205,
	'drops':true,
	'name':'Component205',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':206,
	'drops':true,
	'name':'Component206',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':207,
	'drops':true,
	'name':'Component207',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':208,
	'drops':true,
	'name':'Component208',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':209,
	'drops':true,
	'name':'Component209',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':210,
	'drops':true,
	'name':'Component210',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':211,
	'drops':true,
	'name':'Component211',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':212,
	'drops':true,
	'name':'Component212',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':213,
	'drops':true,
	'name':'Component213',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':214,
	'drops':true,
	'name':'Component214',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':215,
	'drops':true,
	'name':'Component215',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':216,
	'drops':true,
	'name':'Component216',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':217,
	'drops':true,
	'name':'Component217',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':218,
	'drops':true,
	'name':'Component218',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':219,
	'drops':true,
	'name':'Component219',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':220,
	'drops':true,
	'name':'Component220',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':221,
	'drops':true,
	'name':'Component221',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':222,
	'drops':true,
	'name':'Component222',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':223,
	'drops':true,
	'name':'Component223',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':224,
	'drops':true,
	'name':'Component224',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':225,
	'drops':true,
	'name':'Component225',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':226,
	'drops':true,
	'name':'Component226',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':227,
	'drops':true,
	'name':'Component227',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':228,
	'drops':true,
	'name':'Component228',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':229,
	'drops':true,
	'name':'Component229',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':230,
	'drops':true,
	'name':'Component230',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':231,
	'drops':true,
	'name':'Component231',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':232,
	'drops':true,
	'name':'Component232',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':233,
	'drops':true,
	'name':'Component233',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':234,
	'drops':true,
	'name':'Component234',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':235,
	'drops':true,
	'name':'Component235',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':236,
	'drops':true,
	'name':'Component236',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':237,
	'drops':true,
	'name':'Component237',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':238,
	'drops':true,
	'name':'Component238',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':239,
	'drops':true,
	'name':'Component239',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':240,
	'drops':true,
	'name':'Component240',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':241,
	'drops':true,
	'name':'Component241',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':242,
	'drops':true,
	'name':'Component242',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':243,
	'drops':true,
	'name':'Component243',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':244,
	'drops':true,
	'name':'Component244',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':245,
	'drops':true,
	'name':'Component245',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':246,
	'drops':true,
	'name':'Component246',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':247,
	'drops':true,
	'name':'Component247',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':248,
	'drops':true,
	'name':'Component248',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':249,
	'drops':true,
	'name':'Component249',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':250,
	'drops':true,
	'name':'Component250',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':251,
	'drops':true,
	'name':'Component251',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':252,
	'drops':true,
	'name':'Component252',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':253,
	'drops':true,
	'name':'Component253',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':254,
	'drops':true,
	'name':'Component254',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':255,
	'drops':true,
	'name':'Component255',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':256,
	'drops':true,
	'name':'Component256',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':257,
	'drops':true,
	'name':'Component-257',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':258,
	'drops':true,
	'name':'Component-258',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':259,
	'drops':true,
	'name':'Component-259',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':260,
	'drops':true,
	'name':'Component-260',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':261,
	'drops':true,
	'name':'Component-261',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':262,
	'drops':true,
	'name':'Component-262',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':263,
	'drops':true,
	'name':'Component-263',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':264,
	'drops':true,
	'name':'Component-264',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':265,
	'drops':true,
	'name':'Component-265',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':266,
	'drops':true,
	'name':'Component-266',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':267,
	'drops':true,
	'name':'Component-267',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':268,
	'drops':true,
	'name':'Component-268',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':269,
	'drops':true,
	'name':'Component-269',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':270,
	'drops':true,
	'name':'Component-270',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':271,
	'drops':true,
	'name':'Component-271',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':272,
	'drops':true,
	'name':'Component-272',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':273,
	'drops':true,
	'name':'Component-273',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':274,
	'drops':true,
	'name':'Component-274',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':275,
	'drops':true,
	'name':'Component-275',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':276,
	'drops':true,
	'name':'Component-276',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':277,
	'drops':true,
	'name':'Component-277',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':278,
	'drops':true,
	'name':'Component-278',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':279,
	'drops':true,
	'name':'Component-279',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':280,
	'drops':true,
	'name':'Component-280',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':281,
	'drops':true,
	'name':'Component-281',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':282,
	'drops':true,
	'name':'Component-282',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':283,
	'drops':true,
	'name':'Component-283',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':284,
	'drops':true,
	'name':'Component-284',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':285,
	'drops':true,
	'name':'Component-285',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':286,
	'drops':true,
	'name':'Component-286',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':287,
	'drops':true,
	'name':'Component-287',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':288,
	'drops':true,
	'name':'Component-288',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':289,
	'drops':true,
	'name':'Component-289',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':290,
	'drops':true,
	'name':'Component-290',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':291,
	'drops':true,
	'name':'Component-291',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':292,
	'drops':true,
	'name':'Component-292',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':293,
	'drops':true,
	'name':'Component-293',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':294,
	'drops':true,
	'name':'Component-294',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':295,
	'drops':true,
	'name':'Component-295',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':296,
	'drops':true,
	'name':'Component-296',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':297,
	'drops':true,
	'name':'Component-297',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':298,
	'drops':true,
	'name':'Component-298',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':299,
	'drops':true,
	'name':'Component-299',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':300,
	'drops':true,
	'name':'Component-300',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':301,
	'drops':true,
	'name':'Component-301',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':302,
	'drops':true,
	'name':'Component-302',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':303,
	'drops':true,
	'name':'Component-303',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':304,
	'drops':true,
	'name':'Component-304',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':305,
	'drops':true,
	'name':'Component-305',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':306,
	'drops':true,
	'name':'Component-306',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':307,
	'drops':true,
	'name':'Component-307',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':308,
	'drops':true,
	'name':'Component-308',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':309,
	'drops':true,
	'name':'Component-309',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':310,
	'drops':true,
	'name':'Component-310',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':311,
	'drops':true,
	'name':'Component-311',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':312,
	'drops':true,
	'name':'Component-312',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':313,
	'drops':true,
	'name':'Component-313',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':314,
	'drops':true,
	'name':'Component-314',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':315,
	'drops':true,
	'name':'Component-315',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':316,
	'drops':true,
	'name':'Component-316',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':317,
	'drops':true,
	'name':'Component-317',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':318,
	'drops':true,
	'name':'Component-318',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':319,
	'drops':true,
	'name':'Component-319',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':320,
	'drops':true,
	'name':'Component-320',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':321,
	'drops':true,
	'name':'Component-321',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':322,
	'drops':true,
	'name':'Component-322',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':323,
	'drops':true,
	'name':'Component-323',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':324,
	'drops':true,
	'name':'Component-324',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':325,
	'drops':true,
	'name':'Component-325',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':326,
	'drops':true,
	'name':'Component-326',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':327,
	'drops':true,
	'name':'Component-327',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':328,
	'drops':true,
	'name':'Component-328',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':329,
	'drops':true,
	'name':'Component-329',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':330,
	'drops':true,
	'name':'Component-330',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':331,
	'drops':true,
	'name':'Component-331',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':332,
	'drops':true,
	'name':'Component-332',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':333,
	'drops':true,
	'name':'Component-333',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':334,
	'drops':true,
	'name':'Component-334',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':335,
	'drops':true,
	'name':'Component-335',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':336,
	'drops':true,
	'name':'Component-336',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':337,
	'drops':true,
	'name':'Component-337',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':338,
	'drops':true,
	'name':'Component-338',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':339,
	'drops':true,
	'name':'Component-339',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':340,
	'drops':true,
	'name':'Component-340',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':341,
	'drops':true,
	'name':'Component-341',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':342,
	'drops':true,
	'name':'Component-342',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':343,
	'drops':true,
	'name':'Component-343',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':344,
	'drops':true,
	'name':'Component-344',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':345,
	'drops':true,
	'name':'Component-345',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':346,
	'drops':true,
	'name':'Component-346',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':347,
	'drops':true,
	'name':'Component-347',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':348,
	'drops':true,
	'name':'Component-348',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':349,
	'drops':true,
	'name':'Component-349',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':350,
	'drops':true,
	'name':'Component-350',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':351,
	'drops':true,
	'name':'Component-351',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':352,
	'drops':true,
	'name':'Component-352',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':353,
	'drops':true,
	'name':'Component-353',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':354,
	'drops':true,
	'name':'Component-354',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':355,
	'drops':true,
	'name':'Component-355',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':356,
	'drops':true,
	'name':'Component-356',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':357,
	'drops':true,
	'name':'Component-357',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':358,
	'drops':true,
	'name':'Component-358',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':359,
	'drops':true,
	'name':'Component-359',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':360,
	'drops':true,
	'name':'Component-360',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':361,
	'drops':true,
	'name':'Component-361',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':362,
	'drops':true,
	'name':'Component-362',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':363,
	'drops':true,
	'name':'Component-363',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':364,
	'drops':true,
	'name':'Component-364',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':365,
	'drops':true,
	'name':'Component-365',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':366,
	'drops':true,
	'name':'Component-366',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':367,
	'drops':true,
	'name':'Component-367',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':368,
	'drops':true,
	'name':'Component-368',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':369,
	'drops':true,
	'name':'Component-369',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':370,
	'drops':true,
	'name':'Component-370',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':371,
	'drops':true,
	'name':'Component-371',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':372,
	'drops':true,
	'name':'Component-372',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':373,
	'drops':true,
	'name':'Component-373',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':374,
	'drops':true,
	'name':'Component-374',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':375,
	'drops':true,
	'name':'Component-375',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':376,
	'drops':true,
	'name':'Component-376',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':377,
	'drops':true,
	'name':'Component-377',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':378,
	'drops':true,
	'name':'Component-378',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':379,
	'drops':true,
	'name':'Component-379',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':380,
	'drops':true,
	'name':'Component-380',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':381,
	'drops':true,
	'name':'Component-381',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':382,
	'drops':true,
	'name':'Component-382',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':383,
	'drops':true,
	'name':'Component-383',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':384,
	'drops':true,
	'name':'Component-384',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':385,
	'drops':true,
	'name':'Component-385',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':386,
	'drops':true,
	'name':'Component-386',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':387,
	'drops':true,
	'name':'Component-387',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':388,
	'drops':true,
	'name':'Component-388',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':389,
	'drops':true,
	'name':'Component-389',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':390,
	'drops':true,
	'name':'Component-390',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':391,
	'drops':true,
	'name':'Component-391',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':392,
	'drops':true,
	'name':'Component-392',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':393,
	'drops':true,
	'name':'Component-393',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':394,
	'drops':true,
	'name':'Component-394',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':395,
	'drops':true,
	'name':'Component-395',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':396,
	'drops':true,
	'name':'Component-396',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':397,
	'drops':true,
	'name':'Component-397',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':398,
	'drops':true,
	'name':'Component-398',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':399,
	'drops':true,
	'name':'Component-399',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':400,
	'drops':true,
	'name':'Component-400',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':401,
	'drops':true,
	'name':'Component-401',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':402,
	'drops':true,
	'name':'Component-402',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':403,
	'drops':true,
	'name':'Component-403',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':404,
	'drops':true,
	'name':'Component-404',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':405,
	'drops':true,
	'name':'Component-405',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':406,
	'drops':true,
	'name':'Component-406',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':407,
	'drops':true,
	'name':'Component-407',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':408,
	'drops':true,
	'name':'Component-408',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':409,
	'drops':true,
	'name':'Component-409',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':410,
	'drops':true,
	'name':'Component-410',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':411,
	'drops':true,
	'name':'Component-411',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':412,
	'drops':true,
	'name':'Component-412',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':413,
	'drops':true,
	'name':'Component-413',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':414,
	'drops':true,
	'name':'Component-414',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':415,
	'drops':true,
	'name':'Component-415',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':416,
	'drops':true,
	'name':'Component-416',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':417,
	'drops':true,
	'name':'Component-417',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':418,
	'drops':true,
	'name':'Component-418',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':419,
	'drops':true,
	'name':'Component-419',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':420,
	'drops':true,
	'name':'Component-420',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':421,
	'drops':true,
	'name':'Component-421',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':422,
	'drops':true,
	'name':'Component-422',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':423,
	'drops':true,
	'name':'Component-423',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':424,
	'drops':true,
	'name':'Component-424',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':425,
	'drops':true,
	'name':'Component-425',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':426,
	'drops':true,
	'name':'Component-426',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':427,
	'drops':true,
	'name':'Component-427',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':428,
	'drops':true,
	'name':'Component-428',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':429,
	'drops':true,
	'name':'Component-429',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':430,
	'drops':true,
	'name':'Component-430',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':431,
	'drops':true,
	'name':'Component-431',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':432,
	'drops':true,
	'name':'Component-432',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':433,
	'drops':true,
	'name':'Component-433',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':434,
	'drops':true,
	'name':'Component-434',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':435,
	'drops':true,
	'name':'Component-435',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':436,
	'drops':true,
	'name':'Component-436',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':437,
	'drops':true,
	'name':'Component-437',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':438,
	'drops':true,
	'name':'Component-438',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':439,
	'drops':true,
	'name':'Component-439',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':440,
	'drops':true,
	'name':'Component-440',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':441,
	'drops':true,
	'name':'Component-441',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':442,
	'drops':true,
	'name':'Component-442',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':443,
	'drops':true,
	'name':'Component-443',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':444,
	'drops':true,
	'name':'Component-444',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':445,
	'drops':true,
	'name':'Component-445',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':446,
	'drops':true,
	'name':'Component-446',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':447,
	'drops':true,
	'name':'Component-447',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':448,
	'drops':true,
	'name':'Component-448',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':449,
	'drops':true,
	'name':'Component-449',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':450,
	'drops':true,
	'name':'Component-450',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':451,
	'drops':true,
	'name':'Component-451',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':452,
	'drops':true,
	'name':'Component-452',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':453,
	'drops':true,
	'name':'Component-453',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':454,
	'drops':true,
	'name':'Component-454',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':455,
	'drops':true,
	'name':'Component-455',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':456,
	'drops':true,
	'name':'Component-456',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':457,
	'drops':true,
	'name':'Component-457',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':458,
	'drops':true,
	'name':'Component-458',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':459,
	'drops':true,
	'name':'Component-459',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':460,
	'drops':true,
	'name':'Component-460',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':461,
	'drops':true,
	'name':'Component-461',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':462,
	'drops':true,
	'name':'Component-462',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':463,
	'drops':true,
	'name':'Component-463',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':464,
	'drops':true,
	'name':'Component-464',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':465,
	'drops':true,
	'name':'Component-465',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':466,
	'drops':true,
	'name':'Component-466',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':467,
	'drops':true,
	'name':'Component-467',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':468,
	'drops':true,
	'name':'Component-468',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':469,
	'drops':true,
	'name':'Component-469',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':470,
	'drops':true,
	'name':'Component-470',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':471,
	'drops':true,
	'name':'Component-471',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':472,
	'drops':true,
	'name':'Component-472',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':473,
	'drops':true,
	'name':'Component-473',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':474,
	'drops':true,
	'name':'Component-474',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':475,
	'drops':true,
	'name':'Component-475',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':476,
	'drops':true,
	'name':'Component-476',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':477,
	'drops':true,
	'name':'Component-477',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':478,
	'drops':true,
	'name':'Component-478',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':479,
	'drops':true,
	'name':'Component-479',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':480,
	'drops':true,
	'name':'Component-480',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':481,
	'drops':true,
	'name':'Component-481',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':482,
	'drops':true,
	'name':'Component-482',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':483,
	'drops':true,
	'name':'Component-483',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':484,
	'drops':true,
	'name':'Component-484',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':485,
	'drops':true,
	'name':'Component-485',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':486,
	'drops':true,
	'name':'Component-486',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':487,
	'drops':true,
	'name':'Component-487',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':488,
	'drops':true,
	'name':'Component-488',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':489,
	'drops':true,
	'name':'Component-489',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':490,
	'drops':true,
	'name':'Component-490',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':491,
	'drops':true,
	'name':'Component-491',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':492,
	'drops':true,
	'name':'Component-492',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':493,
	'drops':true,
	'name':'Component-493',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':494,
	'drops':true,
	'name':'Component-494',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':495,
	'drops':true,
	'name':'Component-495',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':496,
	'drops':true,
	'name':'Component-496',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':497,
	'drops':true,
	'name':'Component-497',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':498,
	'drops':true,
	'name':'Component-498',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':499,
	'drops':true,
	'name':'Component-499',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':500,
	'drops':true,
	'name':'Component-500',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':501,
	'drops':true,
	'name':'Component-501',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':502,
	'drops':true,
	'name':'Component-502',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':503,
	'drops':true,
	'name':'Component-503',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':504,
	'drops':true,
	'name':'Component-504',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':505,
	'drops':true,
	'name':'Component-505',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':506,
	'drops':true,
	'name':'Component-506',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':507,
	'drops':true,
	'name':'Component-507',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':508,
	'drops':true,
	'name':'Component-508',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':509,
	'drops':true,
	'name':'Component-509',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':510,
	'drops':true,
	'name':'Component-510',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':511,
	'drops':true,
	'name':'Component-511',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':512,
	'drops':true,
	'name':'Component-512',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':513,
	'drops':true,
	'name':'Component-513',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':514,
	'drops':true,
	'name':'Component-514',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':515,
	'drops':true,
	'name':'Component-515',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':516,
	'drops':true,
	'name':'Component-516',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':517,
	'drops':true,
	'name':'Component-517',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':518,
	'drops':true,
	'name':'Component-518',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':519,
	'drops':true,
	'name':'Component-519',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':520,
	'drops':true,
	'name':'Component-520',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':521,
	'drops':true,
	'name':'Component-521',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':522,
	'drops':true,
	'name':'Component-522',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':523,
	'drops':true,
	'name':'Component-523',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':524,
	'drops':true,
	'name':'Component-524',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':525,
	'drops':true,
	'name':'Component-525',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':526,
	'drops':true,
	'name':'Component-526',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':527,
	'drops':true,
	'name':'Component-527',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':528,
	'drops':true,
	'name':'Component-528',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':529,
	'drops':true,
	'name':'Component-529',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':530,
	'drops':true,
	'name':'Component-530',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':531,
	'drops':true,
	'name':'Component-531',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':532,
	'drops':true,
	'name':'Component-532',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':533,
	'drops':true,
	'name':'Component-533',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':534,
	'drops':true,
	'name':'Component-534',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':535,
	'drops':true,
	'name':'Component-535',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':536,
	'drops':true,
	'name':'Component-536',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':537,
	'drops':true,
	'name':'Component-537',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':538,
	'drops':true,
	'name':'Component-538',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':539,
	'drops':true,
	'name':'Component-539',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':540,
	'drops':true,
	'name':'Component-540',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':541,
	'drops':true,
	'name':'Component-541',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':542,
	'drops':true,
	'name':'Component-542',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':543,
	'drops':true,
	'name':'Component-543',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':544,
	'drops':true,
	'name':'Component-544',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':545,
	'drops':true,
	'name':'Component-545',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':546,
	'drops':true,
	'name':'Component-546',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':547,
	'drops':true,
	'name':'Component-547',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':548,
	'drops':true,
	'name':'Component-548',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':549,
	'drops':true,
	'name':'Component-549',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':550,
	'drops':true,
	'name':'Component-550',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':551,
	'drops':true,
	'name':'Component-551',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':552,
	'drops':true,
	'name':'Component-552',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':553,
	'drops':true,
	'name':'Component-553',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':554,
	'drops':true,
	'name':'Component-554',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':555,
	'drops':true,
	'name':'Component-555',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':556,
	'drops':true,
	'name':'Component-556',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':557,
	'drops':true,
	'name':'Component-557',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':558,
	'drops':true,
	'name':'Component-558',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':559,
	'drops':true,
	'name':'Component-559',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':560,
	'drops':true,
	'name':'Component-560',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':561,
	'drops':true,
	'name':'Component-561',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':562,
	'drops':true,
	'name':'Component-562',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':563,
	'drops':true,
	'name':'Component-563',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':564,
	'drops':true,
	'name':'Component-564',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':565,
	'drops':true,
	'name':'Component-565',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':566,
	'drops':true,
	'name':'Component-566',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':567,
	'drops':true,
	'name':'Component-567',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':568,
	'drops':true,
	'name':'Component-568',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':569,
	'drops':true,
	'name':'Component-569',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':570,
	'drops':true,
	'name':'Component-570',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':571,
	'drops':true,
	'name':'Component-571',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':572,
	'drops':true,
	'name':'Component-572',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':573,
	'drops':true,
	'name':'Component-573',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':574,
	'drops':true,
	'name':'Component-574',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':575,
	'drops':true,
	'name':'Component-575',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':576,
	'drops':true,
	'name':'Component-576',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':577,
	'drops':true,
	'name':'Component-577',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':578,
	'drops':true,
	'name':'Component-578',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':579,
	'drops':true,
	'name':'Component-579',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':580,
	'drops':true,
	'name':'Component-580',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':581,
	'drops':true,
	'name':'Component-581',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':582,
	'drops':true,
	'name':'Component-582',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':583,
	'drops':true,
	'name':'Component-583',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':584,
	'drops':true,
	'name':'Component-584',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':585,
	'drops':true,
	'name':'Component-585',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':586,
	'drops':true,
	'name':'Component-586',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':587,
	'drops':true,
	'name':'Component-587',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':588,
	'drops':true,
	'name':'Component-588',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':589,
	'drops':true,
	'name':'Component-589',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':590,
	'drops':true,
	'name':'Component-590',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':591,
	'drops':true,
	'name':'Component-591',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':592,
	'drops':true,
	'name':'Component-592',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':593,
	'drops':true,
	'name':'Component-593',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':594,
	'drops':true,
	'name':'Component-594',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':595,
	'drops':true,
	'name':'Component-595',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':596,
	'drops':true,
	'name':'Component-596',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':597,
	'drops':true,
	'name':'Component-597',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':598,
	'drops':true,
	'name':'Component-598',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':599,
	'drops':true,
	'name':'Component-599',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':600,
	'drops':true,
	'name':'Component-600',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':601,
	'drops':true,
	'name':'Component-601',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':602,
	'drops':true,
	'name':'Component-602',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':603,
	'drops':true,
	'name':'Component-603',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':604,
	'drops':true,
	'name':'Component-604',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':605,
	'drops':true,
	'name':'Component-605',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':606,
	'drops':true,
	'name':'Component-606',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':607,
	'drops':true,
	'name':'Component-607',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':608,
	'drops':true,
	'name':'Component-608',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':609,
	'drops':true,
	'name':'Component-609',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':610,
	'drops':true,
	'name':'Component-610',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':611,
	'drops':true,
	'name':'Component-611',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':612,
	'drops':true,
	'name':'Component-612',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':613,
	'drops':true,
	'name':'Component-613',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':614,
	'drops':true,
	'name':'Component-614',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':615,
	'drops':true,
	'name':'Component-615',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':616,
	'drops':true,
	'name':'Component-616',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':617,
	'drops':true,
	'name':'Component-617',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':618,
	'drops':true,
	'name':'Component-618',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':619,
	'drops':true,
	'name':'Component-619',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':620,
	'drops':true,
	'name':'Component-620',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':621,
	'drops':true,
	'name':'Component-621',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':622,
	'drops':true,
	'name':'Component-622',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':623,
	'drops':true,
	'name':'Component-623',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':624,
	'drops':true,
	'name':'Component-624',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':625,
	'drops':true,
	'name':'Component-625',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':626,
	'drops':true,
	'name':'Component-626',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':627,
	'drops':true,
	'name':'Component-627',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':628,
	'drops':true,
	'name':'Component-628',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':629,
	'drops':true,
	'name':'Component-629',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':630,
	'drops':true,
	'name':'Component-630',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':631,
	'drops':true,
	'name':'Component-631',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':632,
	'drops':true,
	'name':'Component-632',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':633,
	'drops':true,
	'name':'Component-633',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':634,
	'drops':true,
	'name':'Component-634',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':635,
	'drops':true,
	'name':'Component-635',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':636,
	'drops':true,
	'name':'Component-636',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':637,
	'drops':true,
	'name':'Component-637',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':638,
	'drops':true,
	'name':'Component-638',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':639,
	'drops':true,
	'name':'Component-639',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':640,
	'drops':true,
	'name':'Component-640',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':641,
	'drops':true,
	'name':'Component-641',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':642,
	'drops':true,
	'name':'Component-642',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':643,
	'drops':true,
	'name':'Component-643',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':644,
	'drops':true,
	'name':'Component-644',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':645,
	'drops':true,
	'name':'Component-645',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':646,
	'drops':true,
	'name':'Component-646',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':647,
	'drops':true,
	'name':'Component-647',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':648,
	'drops':true,
	'name':'Component-648',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':649,
	'drops':true,
	'name':'Component-649',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':650,
	'drops':true,
	'name':'Component-650',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':651,
	'drops':true,
	'name':'Component-651',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':652,
	'drops':true,
	'name':'Component-652',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':653,
	'drops':true,
	'name':'Component-653',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':654,
	'drops':true,
	'name':'Component-654',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':655,
	'drops':true,
	'name':'Component-655',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':656,
	'drops':true,
	'name':'Component-656',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':657,
	'drops':true,
	'name':'Component-657',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':658,
	'drops':true,
	'name':'Component-658',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':659,
	'drops':true,
	'name':'Component-659',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':660,
	'drops':true,
	'name':'Component-660',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':661,
	'drops':true,
	'name':'Component-661',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':662,
	'drops':true,
	'name':'Component-662',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':663,
	'drops':true,
	'name':'Component-663',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':664,
	'drops':true,
	'name':'Component-664',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':665,
	'drops':true,
	'name':'Component-665',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':666,
	'drops':true,
	'name':'Component-666',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':667,
	'drops':true,
	'name':'Component-667',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':668,
	'drops':true,
	'name':'Component-668',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':669,
	'drops':true,
	'name':'Component-669',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':670,
	'drops':true,
	'name':'Component-670',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':671,
	'drops':true,
	'name':'Component-671',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':672,
	'drops':true,
	'name':'Component-672',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':673,
	'drops':true,
	'name':'Component-673',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':674,
	'drops':true,
	'name':'Component-674',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':675,
	'drops':true,
	'name':'Component-675',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':676,
	'drops':true,
	'name':'Component-676',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':677,
	'drops':true,
	'name':'Component-677',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':678,
	'drops':true,
	'name':'Component-678',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':679,
	'drops':true,
	'name':'Component-679',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':680,
	'drops':true,
	'name':'Component-680',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':681,
	'drops':true,
	'name':'Component-681',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':682,
	'drops':true,
	'name':'Component-682',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':683,
	'drops':true,
	'name':'Component-683',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':684,
	'drops':true,
	'name':'Component-684',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':685,
	'drops':true,
	'name':'Component-685',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':686,
	'drops':true,
	'name':'Component-686',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':687,
	'drops':true,
	'name':'Component-687',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':688,
	'drops':true,
	'name':'Component-688',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':689,
	'drops':true,
	'name':'Component-689',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':690,
	'drops':true,
	'name':'Component-690',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':691,
	'drops':true,
	'name':'Component-691',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':692,
	'drops':true,
	'name':'Component-692',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':693,
	'drops':true,
	'name':'Component-693',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':694,
	'drops':true,
	'name':'Component-694',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':695,
	'drops':true,
	'name':'Component-695',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':696,
	'drops':true,
	'name':'Component-696',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':697,
	'drops':true,
	'name':'Component-697',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':698,
	'drops':true,
	'name':'Component-698',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':699,
	'drops':true,
	'name':'Component-699',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':700,
	'drops':true,
	'name':'Component-700',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':701,
	'drops':true,
	'name':'Component-701',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':702,
	'drops':true,
	'name':'Component-702',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':703,
	'drops':true,
	'name':'Component-703',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':704,
	'drops':true,
	'name':'Component-704',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':705,
	'drops':true,
	'name':'Component-705',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':706,
	'drops':true,
	'name':'Component-706',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':707,
	'drops':true,
	'name':'Component-707',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':708,
	'drops':true,
	'name':'Component-708',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':709,
	'drops':true,
	'name':'Component-709',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':710,
	'drops':true,
	'name':'Component-710',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':711,
	'drops':true,
	'name':'Component-711',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':712,
	'drops':true,
	'name':'Component-712',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':713,
	'drops':true,
	'name':'Component-713',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':714,
	'drops':true,
	'name':'Component-714',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':715,
	'drops':true,
	'name':'Component-715',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':716,
	'drops':true,
	'name':'Component-716',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':717,
	'drops':true,
	'name':'Component-717',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':718,
	'drops':true,
	'name':'Component-718',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':719,
	'drops':true,
	'name':'Component-719',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':720,
	'drops':true,
	'name':'Component-720',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':721,
	'drops':true,
	'name':'Component-721',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':722,
	'drops':true,
	'name':'Component-722',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':723,
	'drops':true,
	'name':'Component-723',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':724,
	'drops':true,
	'name':'Component-724',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':725,
	'drops':true,
	'name':'Component-725',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':726,
	'drops':true,
	'name':'Component-726',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':727,
	'drops':true,
	'name':'Component-727',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':728,
	'drops':true,
	'name':'Component-728',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':729,
	'drops':true,
	'name':'Component-729',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':730,
	'drops':true,
	'name':'Component-730',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':731,
	'drops':true,
	'name':'Component-731',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':732,
	'drops':true,
	'name':'Component-732',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':733,
	'drops':true,
	'name':'Component-733',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':734,
	'drops':true,
	'name':'Component-734',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':735,
	'drops':true,
	'name':'Component-735',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':736,
	'drops':true,
	'name':'Component-736',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':737,
	'drops':true,
	'name':'Component-737',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':738,
	'drops':true,
	'name':'Component-738',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':739,
	'drops':true,
	'name':'Component-739',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':740,
	'drops':true,
	'name':'Component-740',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':741,
	'drops':true,
	'name':'Component-741',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':742,
	'drops':true,
	'name':'Component-742',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':743,
	'drops':true,
	'name':'Component-743',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':744,
	'drops':true,
	'name':'Component-744',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':745,
	'drops':true,
	'name':'Component-745',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':746,
	'drops':true,
	'name':'Component-746',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':747,
	'drops':true,
	'name':'Component-747',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':748,
	'drops':true,
	'name':'Component-748',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':749,
	'drops':true,
	'name':'Component-749',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':750,
	'drops':true,
	'name':'Component-750',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':751,
	'drops':true,
	'name':'Component-751',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':752,
	'drops':true,
	'name':'Component-752',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':753,
	'drops':true,
	'name':'Component-753',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':754,
	'drops':true,
	'name':'Component-754',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':755,
	'drops':true,
	'name':'Component-755',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':756,
	'drops':true,
	'name':'Component-756',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':757,
	'drops':true,
	'name':'Component-757',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':758,
	'drops':true,
	'name':'Component-758',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':759,
	'drops':true,
	'name':'Component-759',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':760,
	'drops':true,
	'name':'Component-760',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':761,
	'drops':true,
	'name':'Component-761',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':762,
	'drops':true,
	'name':'Component-762',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':763,
	'drops':true,
	'name':'Component-763',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':764,
	'drops':true,
	'name':'Component-764',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':765,
	'drops':true,
	'name':'Component-765',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':766,
	'drops':true,
	'name':'Component-766',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':767,
	'drops':true,
	'name':'Component-767',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':768,
	'drops':true,
	'name':'Component-768',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':769,
	'drops':true,
	'name':'Component-769',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':770,
	'drops':true,
	'name':'Component-770',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':771,
	'drops':true,
	'name':'Component-771',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':772,
	'drops':true,
	'name':'Component-772',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':773,
	'drops':true,
	'name':'Component-773',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':774,
	'drops':true,
	'name':'Component-774',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':775,
	'drops':true,
	'name':'Component-775',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':776,
	'drops':true,
	'name':'Component-776',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':777,
	'drops':true,
	'name':'Component-777',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':778,
	'drops':true,
	'name':'Component-778',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':779,
	'drops':true,
	'name':'Component-779',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':780,
	'drops':true,
	'name':'Component-780',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':781,
	'drops':true,
	'name':'Component-781',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':782,
	'drops':true,
	'name':'Component-782',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':783,
	'drops':true,
	'name':'Component-783',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':784,
	'drops':true,
	'name':'Component-784',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':785,
	'drops':true,
	'name':'Component-785',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':786,
	'drops':true,
	'name':'Component-786',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':787,
	'drops':true,
	'name':'Component-787',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':788,
	'drops':true,
	'name':'Component-788',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':789,
	'drops':true,
	'name':'Component-789',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':790,
	'drops':true,
	'name':'Component-790',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':791,
	'drops':true,
	'name':'Component-791',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':792,
	'drops':true,
	'name':'Component-792',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':793,
	'drops':true,
	'name':'Component-793',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':794,
	'drops':true,
	'name':'Component-794',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':795,
	'drops':true,
	'name':'Component-795',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':796,
	'drops':true,
	'name':'Component-796',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':797,
	'drops':true,
	'name':'Component-797',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':798,
	'drops':true,
	'name':'Component-798',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':799,
	'drops':true,
	'name':'Component-799',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':800,
	'drops':true,
	'name':'Component-800',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':801,
	'drops':true,
	'name':'Component-801',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':802,
	'drops':true,
	'name':'Component-802',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':803,
	'drops':true,
	'name':'Component-803',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':804,
	'drops':true,
	'name':'Component-804',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':805,
	'drops':true,
	'name':'Component-805',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':806,
	'drops':true,
	'name':'Component-806',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':807,
	'drops':true,
	'name':'Component-807',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':808,
	'drops':true,
	'name':'Component-808',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':809,
	'drops':true,
	'name':'Component-809',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':810,
	'drops':true,
	'name':'Component-810',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':811,
	'drops':true,
	'name':'Component-811',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':812,
	'drops':true,
	'name':'Component-812',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':813,
	'drops':true,
	'name':'Component-813',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':814,
	'drops':true,
	'name':'Component-814',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':815,
	'drops':true,
	'name':'Component-815',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':816,
	'drops':true,
	'name':'Component-816',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':817,
	'drops':true,
	'name':'Component-817',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':818,
	'drops':true,
	'name':'Component-818',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':819,
	'drops':true,
	'name':'Component-819',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':820,
	'drops':true,
	'name':'Component-820',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':821,
	'drops':true,
	'name':'Component-821',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':822,
	'drops':true,
	'name':'Component-822',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':823,
	'drops':true,
	'name':'Component-823',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':824,
	'drops':true,
	'name':'Component-824',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':825,
	'drops':true,
	'name':'Component-825',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':826,
	'drops':true,
	'name':'Component-826',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':827,
	'drops':true,
	'name':'Component-827',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':828,
	'drops':true,
	'name':'Component-828',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':829,
	'drops':true,
	'name':'Component-829',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':830,
	'drops':true,
	'name':'Component-830',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':831,
	'drops':true,
	'name':'Component-831',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':832,
	'drops':true,
	'name':'Component-832',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':833,
	'drops':true,
	'name':'Component-833',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':834,
	'drops':true,
	'name':'Component-834',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':835,
	'drops':true,
	'name':'Component-835',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':836,
	'drops':true,
	'name':'Component-836',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':837,
	'drops':true,
	'name':'Component-837',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':838,
	'drops':true,
	'name':'Component-838',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':839,
	'drops':true,
	'name':'Component-839',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':840,
	'drops':true,
	'name':'Component-840',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':841,
	'drops':true,
	'name':'Component-841',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':842,
	'drops':true,
	'name':'Component-842',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':843,
	'drops':true,
	'name':'Component-843',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':844,
	'drops':true,
	'name':'Component-844',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':845,
	'drops':true,
	'name':'Component-845',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':846,
	'drops':true,
	'name':'Component-846',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':847,
	'drops':true,
	'name':'Component-847',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':848,
	'drops':true,
	'name':'Component-848',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':849,
	'drops':true,
	'name':'Component-849',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':850,
	'drops':true,
	'name':'Component-850',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':851,
	'drops':true,
	'name':'Component-851',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':852,
	'drops':true,
	'name':'Component-852',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':853,
	'drops':true,
	'name':'Component-853',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':854,
	'drops':true,
	'name':'Component-854',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':855,
	'drops':true,
	'name':'Component-855',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':856,
	'drops':true,
	'name':'Component-856',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':857,
	'drops':true,
	'name':'Component-857',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':858,
	'drops':true,
	'name':'Component-858',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':859,
	'drops':true,
	'name':'Component-859',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':860,
	'drops':true,
	'name':'Component-860',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':861,
	'drops':true,
	'name':'Component-861',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':862,
	'drops':true,
	'name':'Component-862',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':863,
	'drops':true,
	'name':'Component-863',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':864,
	'drops':true,
	'name':'Component-864',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':865,
	'drops':true,
	'name':'Component-865',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':866,
	'drops':true,
	'name':'Component-866',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':867,
	'drops':true,
	'name':'Component-867',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':868,
	'drops':true,
	'name':'Component-868',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':869,
	'drops':true,
	'name':'Component-869',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':870,
	'drops':true,
	'name':'Component-870',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':871,
	'drops':true,
	'name':'Component-871',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':872,
	'drops':true,
	'name':'Component-872',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':873,
	'drops':true,
	'name':'Component-873',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':874,
	'drops':true,
	'name':'Component-874',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':875,
	'drops':true,
	'name':'Component-875',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':876,
	'drops':true,
	'name':'Component-876',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':877,
	'drops':true,
	'name':'Component-877',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':878,
	'drops':true,
	'name':'Component-878',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':879,
	'drops':true,
	'name':'Component-879',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':880,
	'drops':true,
	'name':'Component-880',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':881,
	'drops':true,
	'name':'Component-881',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':882,
	'drops':true,
	'name':'Component-882',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':883,
	'drops':true,
	'name':'Component-883',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':884,
	'drops':true,
	'name':'Component-884',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':885,
	'drops':true,
	'name':'Component-885',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':886,
	'drops':true,
	'name':'Component-886',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':887,
	'drops':true,
	'name':'Component-887',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':888,
	'drops':true,
	'name':'Component-888',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':889,
	'drops':true,
	'name':'Component-889',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':890,
	'drops':true,
	'name':'Component-890',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':891,
	'drops':true,
	'name':'Component-891',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':892,
	'drops':true,
	'name':'Component-892',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':893,
	'drops':true,
	'name':'Component-893',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':894,
	'drops':true,
	'name':'Component-894',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':895,
	'drops':true,
	'name':'Component-895',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':896,
	'drops':true,
	'name':'Component-896',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':897,
	'drops':true,
	'name':'Component-897',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':898,
	'drops':true,
	'name':'Component-898',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':899,
	'drops':true,
	'name':'Component-899',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':900,
	'drops':true,
	'name':'Component-900',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':901,
	'drops':true,
	'name':'Component-901',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':902,
	'drops':true,
	'name':'Component-902',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':903,
	'drops':true,
	'name':'Component-903',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':904,
	'drops':true,
	'name':'Component-904',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':905,
	'drops':true,
	'name':'Component-905',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':906,
	'drops':true,
	'name':'Component-906',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':907,
	'drops':true,
	'name':'Component-907',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':908,
	'drops':true,
	'name':'Component-908',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':909,
	'drops':true,
	'name':'Component-909',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':910,
	'drops':true,
	'name':'Component-910',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':911,
	'drops':true,
	'name':'Component-911',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':912,
	'drops':true,
	'name':'Component-912',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':913,
	'drops':true,
	'name':'Component-913',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':914,
	'drops':true,
	'name':'Component-914',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':915,
	'drops':true,
	'name':'Component-915',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':916,
	'drops':true,
	'name':'Component-916',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':917,
	'drops':true,
	'name':'Component-917',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':918,
	'drops':true,
	'name':'Component-918',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':919,
	'drops':true,
	'name':'Component-919',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':920,
	'drops':true,
	'name':'Component-920',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':921,
	'drops':true,
	'name':'Component-921',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':922,
	'drops':true,
	'name':'Component-922',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':923,
	'drops':true,
	'name':'Component-923',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':924,
	'drops':true,
	'name':'Component-924',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':925,
	'drops':true,
	'name':'Component-925',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':926,
	'drops':true,
	'name':'Component-926',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':927,
	'drops':true,
	'name':'Component-927',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':928,
	'drops':true,
	'name':'Component-928',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':929,
	'drops':true,
	'name':'Component-929',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':930,
	'drops':true,
	'name':'Component-930',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':931,
	'drops':true,
	'name':'Component-931',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':932,
	'drops':true,
	'name':'Component-932',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':933,
	'drops':true,
	'name':'Component-933',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':934,
	'drops':true,
	'name':'Component-934',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':935,
	'drops':true,
	'name':'Component-935',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':936,
	'drops':true,
	'name':'Component-936',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':937,
	'drops':true,
	'name':'Component-937',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':938,
	'drops':true,
	'name':'Component-938',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':939,
	'drops':true,
	'name':'Component-939',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':940,
	'drops':true,
	'name':'Component-940',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':941,
	'drops':true,
	'name':'Component-941',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':942,
	'drops':true,
	'name':'Component-942',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':943,
	'drops':true,
	'name':'Component-943',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':944,
	'drops':true,
	'name':'Component-944',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':945,
	'drops':true,
	'name':'Component-945',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':946,
	'drops':true,
	'name':'Component-946',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':947,
	'drops':true,
	'name':'Component-947',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':948,
	'drops':true,
	'name':'Component-948',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':949,
	'drops':true,
	'name':'Component-949',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':950,
	'drops':true,
	'name':'Component-950',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':951,
	'drops':true,
	'name':'Component-951',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':952,
	'drops':true,
	'name':'Component-952',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':953,
	'drops':true,
	'name':'Component-953',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':954,
	'drops':true,
	'name':'Component-954',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':955,
	'drops':true,
	'name':'Component-955',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':956,
	'drops':true,
	'name':'Component-956',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':957,
	'drops':true,
	'name':'Component-957',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':958,
	'drops':true,
	'name':'Component-958',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':959,
	'drops':true,
	'name':'Component-959',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':960,
	'drops':true,
	'name':'Component-960',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':961,
	'drops':true,
	'name':'Component-961',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':962,
	'drops':true,
	'name':'Component-962',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':963,
	'drops':true,
	'name':'Component-963',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':964,
	'drops':true,
	'name':'Component-964',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':965,
	'drops':true,
	'name':'Component-965',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':966,
	'drops':true,
	'name':'Component-966',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':967,
	'drops':true,
	'name':'Component-967',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':968,
	'drops':true,
	'name':'Component-968',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':969,
	'drops':true,
	'name':'Component-969',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':970,
	'drops':true,
	'name':'Component-970',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':971,
	'drops':true,
	'name':'Component-971',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':972,
	'drops':true,
	'name':'Component-972',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':973,
	'drops':true,
	'name':'Component-973',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':974,
	'drops':true,
	'name':'Component-974',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':975,
	'drops':true,
	'name':'Component-975',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':976,
	'drops':true,
	'name':'Component-976',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':977,
	'drops':true,
	'name':'Component-977',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':978,
	'drops':true,
	'name':'Component-978',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':979,
	'drops':true,
	'name':'Component-979',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':980,
	'drops':true,
	'name':'Component-980',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':981,
	'drops':true,
	'name':'Component-981',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':982,
	'drops':true,
	'name':'Component-982',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':983,
	'drops':true,
	'name':'Component-983',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':984,
	'drops':true,
	'name':'Component-984',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':985,
	'drops':true,
	'name':'Component-985',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':986,
	'drops':true,
	'name':'Component-986',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':987,
	'drops':true,
	'name':'Component-987',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':988,
	'drops':true,
	'name':'Component-988',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':989,
	'drops':true,
	'name':'Component-989',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':990,
	'drops':true,
	'name':'Component-990',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':991,
	'drops':true,
	'name':'Component-991',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':992,
	'drops':true,
	'name':'Component-992',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':993,
	'drops':true,
	'name':'Component-993',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':994,
	'drops':true,
	'name':'Component-994',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':995,
	'drops':true,
	'name':'Component-995',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':996,
	'drops':true,
	'name':'Component-996',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':997,
	'drops':true,
	'name':'Component-997',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':998,
	'drops':true,
	'name':'Component-998',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':999,
	'drops':true,
	'name':'Component-999',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1000,
	'drops':true,
	'name':'Component-1000',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1001,
	'drops':true,
	'name':'Component-1001',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1002,
	'drops':true,
	'name':'Component-1002',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1003,
	'drops':true,
	'name':'Component-1003',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1004,
	'drops':true,
	'name':'Component-1004',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1005,
	'drops':true,
	'name':'Component-1005',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1006,
	'drops':true,
	'name':'Component-1006',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1007,
	'drops':true,
	'name':'Component-1007',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1008,
	'drops':true,
	'name':'Component-1008',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1009,
	'drops':true,
	'name':'Component-1009',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1010,
	'drops':true,
	'name':'Component-1010',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1011,
	'drops':true,
	'name':'Component-1011',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1012,
	'drops':true,
	'name':'Component-1012',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1013,
	'drops':true,
	'name':'Component-1013',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1014,
	'drops':true,
	'name':'Component-1014',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1015,
	'drops':true,
	'name':'Component-1015',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1016,
	'drops':true,
	'name':'Component-1016',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1017,
	'drops':true,
	'name':'Component-1017',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1018,
	'drops':true,
	'name':'Component-1018',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1019,
	'drops':true,
	'name':'Component-1019',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1020,
	'drops':true,
	'name':'Component-1020',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1021,
	'drops':true,
	'name':'Component-1021',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1022,
	'drops':true,
	'name':'Component-1022',
	'flavor':'',
	'bonus':function(target){

	}
},{
	'id':1023,
	'drops':true,
	'name':'Component1023',
	'flavor':'Void. Fearful dark void.',
	'bonus':function(target){

	}
}	];

var components=[];

for (var i=0;i<cmp.length;i++) {
	components[cmp[i].id]=cmp[i];

};

