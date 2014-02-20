var cmp = [
{	
	'id':0, 
	'name':'Component0',
	'flavor':'',
	'bonus':function(target){}
},
{
	'id':1,
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
	'name':'Ancient Railgun',
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=3;
		target.fireEnergy+=1;
		target.fireRange+=1000;
		target.fireDamage+=1;
		target.fireRate+=200;
		target.fireVelocity+=150;
		target.actor.profile+=25;
	}
},
{
	'id':3,
	'name':'Capacitor Unit',
	'flavor':'',
	'bonus':function(target){
		target.energyMax+=10;
		target.energyAmount+=1;
	}
},
{
	'id':4,
	'name':'VariJet',
	'flavor':'',
	'bonus':function(target){
		target.turnRate+=0.5;
		target.acceleration+=0.3;
	}
},
{
	'id':5,
	'name':'Overpowered Burst Laser',
	'flavor':'',
	'bonus':function(target){
		target.fireVelocity+=200;
		target.fireRate*=0.25;
		target.bulletSprite=3;
		target.actor.profile+=50;
	}
},
{
	'id':6,
	'name':'Alien Pustule',
	'flavor':'',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.actor.profile+=10;
	}
},
{
	'id':7,
	'name':'Alien Pustule',
	'flavor':'',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.actor.profile+=10;
	}
},
{
	'id':8,
	'name':'Shield Generator',
	'flavor':'',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':9,
	'name':'Mineral Scanner',
	'flavor':'',
	'bonus':function(target){
		target.radarTargets+=2;
		target.radarShowOre=true; //TODO
	}
},
{
	'id':10,
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
	'name':'Xenoform Reactor',
	'flavor':'',
	'bonus':function(target){
		target.energyRate*=0.5;
		target.actor.profile+=100;
		target.fireDamage*=1.2;
	}
},
{
	'id':13,
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
		target.actor.profile+=200;
	}
},
{
	'id':14,
	'name':'Component14',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':15,
	'name':'Component15',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':16,
	'name':'Component16',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':17,
	'name':'Component17',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':18,
	'name':'Component18',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':19,
	'name':'Component19',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':20,
	'name':'Component20',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':21,
	'name':'Component21',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':22,
	'name':'Component22',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':23,
	'name':'Component23',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':24,
	'name':'Component24',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':25,
	'name':'Component25',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':26,
	'name':'Component26',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':27,
	'name':'Component27',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':28,
	'name':'Component28',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':29,
	'name':'Component29',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':30,
	'name':'Component30',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':31,
	'name':'Component31',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':32,
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
	'name':'Derelict Crewpod',
	'flavor':'',
	'bonus':function(target){
		target.health+=2;
		target.energyRate*=0.8;
		target.acceleration+=0.1;
		target.actor.profile+=10;
	}
},
{
	'id':34,
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
	'name':'Fusion Thrust',
	'flavor':'',
	'bonus':function(target){
		target.acceleration+=0.7;
		target.health+=1;
	}
},
{
	'id':36,
	'name':'Standard Quarters',
	'flavor':'',
	'bonus':function(target){
		target.health+=3;
		target.energyAmount+1;
		target.energyMax+=4;
		target.actor.profile+=20;
	}
},
{
	'id':37,
	'name':'Command Center',
	'flavor':'',
	'bonus':function(target){
		target.health+=6;
		target.turnRate+=0.2;
	}
},

{
	'id':38,
	'name':'Alien Pustule',
	'flavor':'',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.actor.profile+=10;
	}
},
{
	'id':39,
	'name':'Alien Pustule',
	'flavor':'',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.actor.profile+=10;
	}
},
{
	'id':40,
	'name':'Experimental Navigation System',
	'flavor':'',
	'bonus':function(target){
		target.turnSpeed+=0.3;
		target.fireRate*=0.9;
		target.acceleration+=2;
		target.energyRate*=0.95;
	}
},
{
	'id':41,
	'name':'Force Multiplier',
	'flavor':'',
	'bonus':function(target){
		target.bulletBehavior.push(function(bullet){
			bullet.rotation+=Math.random()*0.4-0.2;
			game.physics.velocityFromRotation(bullet.rotation, bullet.fireVelocity, bullet.body.velocity);
		});
		target.fireRate*=0.7;
		target.fireEnergy*=0.8;
		target.actor.profile+=40;
	}
},
{
	'id':42,
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
	'name':'Thrust Package',
	'flavor':'',
	'bonus':function(target){
		target.fireDamage+=1;
		target.acceleration+=0.6;
		target.actor.profile+=50;
	}
},
{
	'id':45,
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
	'name':'Component46',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':47,
	'name':'Component47',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':48,
	'name':'Component48',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':49,
	'name':'Component49',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':50,
	'name':'Component50',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':51,
	'name':'Component51',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':52,
	'name':'Component52',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':53,
	'name':'Component53',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':54,
	'name':'Component54',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':55,
	'name':'Component55',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':56,
	'name':'Component56',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':57,
	'name':'Component57',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':58,
	'name':'Component58',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':59,
	'name':'Component59',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':60,
	'name':'Component60',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':61,
	'name':'Component61',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':62,
	'name':'Component62',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':63,
	'name':'Component63',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':64,
	'name':'Targeting System',
	'flavor':'',
	'bonus':function(target){
		target.radarTargets+=2;
		target.radarShowInEnemyRange=true;
	}
},
{
	'id':65,
	'name':'Worn Armor Plating',
	'flavor':'',
	'bonus':function(target){
		target.health+=13;
		target.acceleration*=0.8;
		target.turnRate*=0.6;
		target.actor.profile+=10;
	}
},
{
	'id':66,
	'name':'Discount Attitude Jet',
	'flavor':'',
	'bonus':function(target){
		target.turnRate+=0.7;
		target.acceleration+=0.3;
	}
},
{
	'id':67,
	'name':'Long Range Sensor',
	'flavor':'',
	'bonus':function(target){
		target.radarTargets+=2;
		target.radarShowInRange=true;
	}
},
{
	'id':68,
	'name':'Durasteel Plating',
	'flavor':'',
	'bonus':function(target){
		target.health+=18;
		target.acceleration*=0.7;
		target.turnRate*=0.5;
		target.actor.profile+=10;	
	}
},
{
	'id':69,
	'name':'Angular Ion Thrust',
	'flavor':'',
	'bonus':function(target){
		target.turnRate+=1
	}
},
{
	'id':70,
	'name':'Low-Profile Wing',
	'flavor':'',
	'bonus':function(target){
		target.actor.profile-=25;//refund standard profile cost
		target.actor.profile*=0.9;
		target.acceleration+=0.3;
		target.turnRate+=0.2;

	}
},
{
	'id':71,
	'name':'Command Deck',
	'flavor':'',
	'bonus':function(target){
		target.health+=5;
		target.turnSpeed+=0.1;
		target.acceleration+=0.1;
		target.energyRate*=0.9;
		target.energyMax+=4;
		target.actor.profile+=20;	
	}
},
{
	'id':72,
	'name':'Crew Pod',
	'flavor':'',
	'bonus':function(target){
		target.health+=6;
		target.energyMax-=2;
		target.energyRate*=0.95;
		target.actor.profile+=10;	
	}
},
{
	'id':73,
	'name':'Ion-Bolt Gun',
	'flavor':'',
	'bonus':function(target){
		target.fireDamage+=2;
		target.fireRate+=100;

		target.actor.profile+=20;	
	}
},
{
	'id':74,
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
	'name':'AWSM',
	'flavor':'',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':77,
	'name':'Decorative Skull',
	'flavor':'',
	'bonus':function(target){
		target.actor.profile+=50;
		target.fireDamage+=2;
		target.fireRate*=0.9;
	}
},
{
	'id':78,
	'name':'Component78',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':79,
	'name':'Component79',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':80,
	'name':'Component80',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':81,
	'name':'Component81',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':82,
	'name':'Component82',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':83,
	'name':'Component83',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':84,
	'name':'Component84',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':85,
	'name':'Component85',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':86,
	'name':'Component86',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':87,
	'name':'Component87',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':88,
	'name':'Component88',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':89,
	'name':'Component89',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':90,
	'name':'Component90',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':91,
	'name':'Component91',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':92,
	'name':'Component92',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':93,
	'name':'Component93',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':94,
	'name':'Component94',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':95,
	'name':'Component95',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':96,
	'name':'Pirate CPU',
	'flavor':'',
	'bonus':function(target){
		target.fireRate*=0.8;
		target.energyRate*=0.7;

		target.actor.profile+=20;	
	}
},
{
	'id':97,
	'name':'Faulty Wiring',
	'flavor':'',
	'bonus':function(target){
		target.energyMax+=12;
		target.energyRate+=1000;
		target.energyAmount+=1;

		target.actor.profile-=20;	
	}
},
{
	'id':98,
	'name':'Destroyed Airlock',
	'flavor':'',
	'bonus':function(target){
		target.health-=1;
		target.bulletDamage+=3;
	}
},
{
	'id':99,
	'name':'Advanced Processor',
	'flavor':'',
	'bonus':function(target){
		target.fireRate*=0.8;
		target.turnRate+=0.3;
		target.health+=2;
		target.actor.profile+=10;
	}
},
{
	'id':100,
	'name':'Special Device',
	'flavor':'',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':101,
	'name':'Weapon Rotator',
	'flavor':'',
	'bonus':function(target){
		target.fireRate*=0.7;
		target.fireDamage+=1;
		target.actor.profile+=30;
	}
},
{
	'id':102,
	'name':'Prototype Stabilizer',
	'flavor':'',
	'bonus':function(target){
		target.turnRate+=0.6;
		target.acceleration+=0.2;
		target.actor.profile*=0.9;
	}
},
{
	'id':103,
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
	'name':'Inline Warp Thrust',
	'flavor':'',
	'bonus':function(target){
		target.acceleration+=0.8;
		target.energyRate*=0.9;
	}
},
{
	'id':105,
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
	'name':'Vidscreen Ad <BurgerJoint>',
	'flavor':'',
	'bonus':function(target){
		target.actor.profile+=25;
		target.cashFlow+=10;

	}
},
{
	'id':109,
	'name':'Vidscreen Ad <Cola>',
	'flavor':'',
	'bonus':function(target){
		target.actor.profile+=25;
		target.cashFlow+=10; //TODO
	}
},
{
	'id':110,
	'name':'Component110',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':111,
	'name':'Component111',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':112,
	'name':'Component112',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':113,
	'name':'Component113',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':114,
	'name':'Component114',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':115,
	'name':'Component115',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':116,
	'name':'Component116',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':117,
	'name':'Component117',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':118,
	'name':'Component118',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':119,
	'name':'Component119',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':120,
	'name':'Component120',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':121,
	'name':'Component121',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':122,
	'name':'Component122',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':123,
	'name':'Component123',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':124,
	'name':'Component124',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':125,
	'name':'Component125',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':126,
	'name':'Component126',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':127,
	'name':'Component127',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':128,
	'name':'Contraband Missiles',
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=2;
		target.fireDamage+=4;
		target.bulletBehavior.push(function(bullet){bullet.body.velocity.x*=.75+Math.random()*.5;
			bullet.body.velocity.y*=.75+Math.random()*.5});
		target.fireVelocity+=100;
		target.fireEnergy+=1;
		target.actor.profile+=25;
	}
},
{
	'id':129,
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
	'name':'Aftermarket Gatling',
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=1;
		target.fireRate*=0.7;
		target.fireRange*=0.7;
		target.fireDamage*=0.7;
		target.fireEnergy*=0.7;
		target.actor.profile+=20;
	}
},
{
	'id':131,
	'name':'Freedom Missiles',
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=2;
		target.fireDamage+=2;
		target.fireEnergy+=2;
		target.actor.profile+=15;
	}
},
{
	'id':132,
	'name':'Ultralight Wing',
	'flavor':'',
	'bonus':function(target){
		target.health+=2;
		target.acceleration+=0.5;
	}
},
{
	'id':133,
	'name':'Gleaming Autocannon',
	'flavor':'',
	'bonus':function(target){
		target.bulletSprite=1;
		target.fireRate*=0.7;
		target.fireDamage+=1;
		target.actor.profile+=150;
	}
},
{
	'id':134,
	'name':'Component134',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':135,
	'name':'Component135',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':136,
	'name':'Component136',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':137,
	'name':'Component137',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':138,
	'name':'Component138',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':139,
	'name':'Component139',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':140,
	'name':'Component140',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':141,
	'name':'Component141',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':142,
	'name':'Component142',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':143,
	'name':'Component143',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':144,
	'name':'Component144',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':145,
	'name':'Component145',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':146,
	'name':'Component146',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':147,
	'name':'Component147',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':148,
	'name':'Component148',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':149,
	'name':'Component149',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':150,
	'name':'Component150',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':151,
	'name':'Component151',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':152,
	'name':'Component152',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':153,
	'name':'Component153',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':154,
	'name':'Component154',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':155,
	'name':'Component155',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':156,
	'name':'Component156',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':157,
	'name':'Component157',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':158,
	'name':'Component158',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':159,
	'name':'Component159',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':160,
	'name':'Illegal Cargo',
	'flavor':'',
	'bonus':function(target){
		target.energyMax+=6;
		target.energyRate*=.75;
		target.energyAmount+=1;
		target.actor.profile+=100;
	}
},
{
	'id':161,
	'name':'Component161',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':162,
	'name':'Component162',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':163,
	'name':'Component163',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':164,
	'name':'Component164',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':165,
	'name':'Component165',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':166,
	'name':'Component166',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':167,
	'name':'Component167',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':168,
	'name':'Component168',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':169,
	'name':'Component169',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':170,
	'name':'Component170',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':171,
	'name':'Component171',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':172,
	'name':'Component172',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':173,
	'name':'Component173',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':174,
	'name':'Component174',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':175,
	'name':'Component175',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':176,
	'name':'Component176',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':177,
	'name':'Component177',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':178,
	'name':'Component178',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':179,
	'name':'Component179',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':180,
	'name':'Component180',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':181,
	'name':'Component181',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':182,
	'name':'Component182',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':183,
	'name':'Component183',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':184,
	'name':'Component184',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':185,
	'name':'Component185',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':186,
	'name':'Component186',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':187,
	'name':'Component187',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':188,
	'name':'Component188',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':189,
	'name':'Component189',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':190,
	'name':'Component190',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':191,
	'name':'Component191',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':192,
	'name':'Component192',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':193,
	'name':'Component193',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':194,
	'name':'Component194',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':195,
	'name':'Component195',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':196,
	'name':'Component196',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':197,
	'name':'Component197',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':198,
	'name':'Component198',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':199,
	'name':'Component199',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':200,
	'name':'Component200',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':201,
	'name':'Component201',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':202,
	'name':'Component202',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':203,
	'name':'Component203',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':204,
	'name':'Component204',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':205,
	'name':'Component205',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':206,
	'name':'Component206',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':207,
	'name':'Component207',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':208,
	'name':'Component208',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':209,
	'name':'Component209',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':210,
	'name':'Component210',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':211,
	'name':'Component211',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':212,
	'name':'Component212',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':213,
	'name':'Component213',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':214,
	'name':'Component214',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':215,
	'name':'Component215',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':216,
	'name':'Component216',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':217,
	'name':'Component217',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':218,
	'name':'Component218',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':219,
	'name':'Component219',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':220,
	'name':'Component220',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':221,
	'name':'Component221',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':222,
	'name':'Component222',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':223,
	'name':'Component223',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':224,
	'name':'Component224',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':225,
	'name':'Component225',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':226,
	'name':'Component226',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':227,
	'name':'Component227',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':228,
	'name':'Component228',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':229,
	'name':'Component229',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':230,
	'name':'Component230',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':231,
	'name':'Component231',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':232,
	'name':'Component232',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':233,
	'name':'Component233',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':234,
	'name':'Component234',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':235,
	'name':'Component235',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':236,
	'name':'Component236',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':237,
	'name':'Component237',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':238,
	'name':'Component238',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':239,
	'name':'Component239',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':240,
	'name':'Component240',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':241,
	'name':'Component241',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':242,
	'name':'Component242',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':243,
	'name':'Component243',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':244,
	'name':'Component244',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':245,
	'name':'Component245',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':246,
	'name':'Component246',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':247,
	'name':'Component247',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':248,
	'name':'Component248',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':249,
	'name':'Component249',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':250,
	'name':'Component250',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':251,
	'name':'Component251',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':252,
	'name':'Component252',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':253,
	'name':'Component253',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':254,
	'name':'Component254',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':255,
	'name':'Component255',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':256,
	'name':'Component256',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':257,
	'name':'Component-257',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':258,
	'name':'Component-258',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':259,
	'name':'Component-259',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':260,
	'name':'Component-260',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':261,
	'name':'Component-261',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':262,
	'name':'Component-262',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':263,
	'name':'Component-263',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':264,
	'name':'Component-264',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':265,
	'name':'Component-265',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':266,
	'name':'Component-266',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':267,
	'name':'Component-267',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':268,
	'name':'Component-268',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':269,
	'name':'Component-269',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':270,
	'name':'Component-270',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':271,
	'name':'Component-271',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':272,
	'name':'Component-272',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':273,
	'name':'Component-273',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':274,
	'name':'Component-274',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':275,
	'name':'Component-275',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':276,
	'name':'Component-276',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':277,
	'name':'Component-277',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':278,
	'name':'Component-278',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':279,
	'name':'Component-279',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':280,
	'name':'Component-280',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':281,
	'name':'Component-281',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':282,
	'name':'Component-282',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':283,
	'name':'Component-283',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':284,
	'name':'Component-284',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':285,
	'name':'Component-285',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':286,
	'name':'Component-286',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':287,
	'name':'Component-287',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':288,
	'name':'Component-288',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':289,
	'name':'Component-289',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':290,
	'name':'Component-290',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':291,
	'name':'Component-291',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':292,
	'name':'Component-292',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':293,
	'name':'Component-293',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':294,
	'name':'Component-294',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':295,
	'name':'Component-295',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':296,
	'name':'Component-296',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':297,
	'name':'Component-297',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':298,
	'name':'Component-298',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':299,
	'name':'Component-299',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':300,
	'name':'Component-300',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':301,
	'name':'Component-301',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':302,
	'name':'Component-302',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':303,
	'name':'Component-303',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':304,
	'name':'Component-304',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':305,
	'name':'Component-305',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':306,
	'name':'Component-306',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':307,
	'name':'Component-307',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':308,
	'name':'Component-308',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':309,
	'name':'Component-309',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':310,
	'name':'Component-310',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':311,
	'name':'Component-311',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':312,
	'name':'Component-312',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':313,
	'name':'Component-313',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':314,
	'name':'Component-314',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':315,
	'name':'Component-315',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':316,
	'name':'Component-316',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':317,
	'name':'Component-317',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':318,
	'name':'Component-318',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':319,
	'name':'Component-319',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':320,
	'name':'Component-320',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':321,
	'name':'Component-321',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':322,
	'name':'Component-322',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':323,
	'name':'Component-323',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':324,
	'name':'Component-324',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':325,
	'name':'Component-325',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':326,
	'name':'Component-326',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':327,
	'name':'Component-327',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':328,
	'name':'Component-328',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':329,
	'name':'Component-329',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':330,
	'name':'Component-330',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':331,
	'name':'Component-331',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':332,
	'name':'Component-332',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':333,
	'name':'Component-333',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':334,
	'name':'Component-334',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':335,
	'name':'Component-335',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':336,
	'name':'Component-336',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':337,
	'name':'Component-337',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':338,
	'name':'Component-338',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':339,
	'name':'Component-339',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':340,
	'name':'Component-340',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':341,
	'name':'Component-341',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':342,
	'name':'Component-342',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':343,
	'name':'Component-343',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':344,
	'name':'Component-344',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':345,
	'name':'Component-345',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':346,
	'name':'Component-346',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':347,
	'name':'Component-347',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':348,
	'name':'Component-348',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':349,
	'name':'Component-349',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':350,
	'name':'Component-350',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':351,
	'name':'Component-351',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':352,
	'name':'Component-352',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':353,
	'name':'Component-353',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':354,
	'name':'Component-354',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':355,
	'name':'Component-355',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':356,
	'name':'Component-356',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':357,
	'name':'Component-357',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':358,
	'name':'Component-358',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':359,
	'name':'Component-359',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':360,
	'name':'Component-360',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':361,
	'name':'Component-361',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':362,
	'name':'Component-362',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':363,
	'name':'Component-363',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':364,
	'name':'Component-364',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':365,
	'name':'Component-365',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':366,
	'name':'Component-366',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':367,
	'name':'Component-367',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':368,
	'name':'Component-368',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':369,
	'name':'Component-369',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':370,
	'name':'Component-370',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':371,
	'name':'Component-371',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':372,
	'name':'Component-372',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':373,
	'name':'Component-373',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':374,
	'name':'Component-374',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':375,
	'name':'Component-375',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':376,
	'name':'Component-376',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':377,
	'name':'Component-377',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':378,
	'name':'Component-378',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':379,
	'name':'Component-379',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':380,
	'name':'Component-380',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':381,
	'name':'Component-381',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':382,
	'name':'Component-382',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':383,
	'name':'Component-383',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':384,
	'name':'Component-384',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':385,
	'name':'Component-385',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':386,
	'name':'Component-386',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':387,
	'name':'Component-387',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':388,
	'name':'Component-388',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':389,
	'name':'Component-389',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':390,
	'name':'Component-390',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':391,
	'name':'Component-391',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':392,
	'name':'Component-392',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':393,
	'name':'Component-393',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':394,
	'name':'Component-394',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':395,
	'name':'Component-395',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':396,
	'name':'Component-396',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':397,
	'name':'Component-397',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':398,
	'name':'Component-398',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':399,
	'name':'Component-399',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':400,
	'name':'Component-400',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':401,
	'name':'Component-401',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':402,
	'name':'Component-402',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':403,
	'name':'Component-403',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':404,
	'name':'Component-404',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':405,
	'name':'Component-405',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':406,
	'name':'Component-406',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':407,
	'name':'Component-407',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':408,
	'name':'Component-408',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':409,
	'name':'Component-409',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':410,
	'name':'Component-410',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':411,
	'name':'Component-411',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':412,
	'name':'Component-412',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':413,
	'name':'Component-413',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':414,
	'name':'Component-414',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':415,
	'name':'Component-415',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':416,
	'name':'Component-416',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':417,
	'name':'Component-417',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':418,
	'name':'Component-418',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':419,
	'name':'Component-419',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':420,
	'name':'Component-420',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':421,
	'name':'Component-421',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':422,
	'name':'Component-422',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':423,
	'name':'Component-423',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':424,
	'name':'Component-424',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':425,
	'name':'Component-425',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':426,
	'name':'Component-426',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':427,
	'name':'Component-427',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':428,
	'name':'Component-428',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':429,
	'name':'Component-429',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':430,
	'name':'Component-430',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':431,
	'name':'Component-431',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':432,
	'name':'Component-432',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':433,
	'name':'Component-433',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':434,
	'name':'Component-434',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':435,
	'name':'Component-435',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':436,
	'name':'Component-436',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':437,
	'name':'Component-437',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':438,
	'name':'Component-438',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':439,
	'name':'Component-439',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':440,
	'name':'Component-440',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':441,
	'name':'Component-441',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':442,
	'name':'Component-442',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':443,
	'name':'Component-443',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':444,
	'name':'Component-444',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':445,
	'name':'Component-445',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':446,
	'name':'Component-446',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':447,
	'name':'Component-447',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':448,
	'name':'Component-448',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':449,
	'name':'Component-449',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':450,
	'name':'Component-450',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':451,
	'name':'Component-451',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':452,
	'name':'Component-452',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':453,
	'name':'Component-453',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':454,
	'name':'Component-454',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':455,
	'name':'Component-455',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':456,
	'name':'Component-456',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':457,
	'name':'Component-457',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':458,
	'name':'Component-458',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':459,
	'name':'Component-459',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':460,
	'name':'Component-460',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':461,
	'name':'Component-461',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':462,
	'name':'Component-462',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':463,
	'name':'Component-463',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':464,
	'name':'Component-464',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':465,
	'name':'Component-465',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':466,
	'name':'Component-466',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':467,
	'name':'Component-467',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':468,
	'name':'Component-468',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':469,
	'name':'Component-469',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':470,
	'name':'Component-470',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':471,
	'name':'Component-471',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':472,
	'name':'Component-472',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':473,
	'name':'Component-473',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':474,
	'name':'Component-474',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':475,
	'name':'Component-475',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':476,
	'name':'Component-476',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':477,
	'name':'Component-477',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':478,
	'name':'Component-478',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':479,
	'name':'Component-479',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':480,
	'name':'Component-480',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':481,
	'name':'Component-481',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':482,
	'name':'Component-482',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':483,
	'name':'Component-483',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':484,
	'name':'Component-484',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':485,
	'name':'Component-485',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':486,
	'name':'Component-486',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':487,
	'name':'Component-487',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':488,
	'name':'Component-488',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':489,
	'name':'Component-489',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':490,
	'name':'Component-490',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':491,
	'name':'Component-491',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':492,
	'name':'Component-492',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':493,
	'name':'Component-493',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':494,
	'name':'Component-494',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':495,
	'name':'Component-495',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':496,
	'name':'Component-496',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':497,
	'name':'Component-497',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':498,
	'name':'Component-498',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':499,
	'name':'Component-499',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':500,
	'name':'Component-500',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':501,
	'name':'Component-501',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':502,
	'name':'Component-502',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':503,
	'name':'Component-503',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':504,
	'name':'Component-504',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':505,
	'name':'Component-505',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':506,
	'name':'Component-506',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':507,
	'name':'Component-507',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':508,
	'name':'Component-508',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':509,
	'name':'Component-509',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':510,
	'name':'Component-510',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':511,
	'name':'Component-511',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':512,
	'name':'Component-512',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':513,
	'name':'Component-513',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':514,
	'name':'Component-514',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':515,
	'name':'Component-515',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':516,
	'name':'Component-516',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':517,
	'name':'Component-517',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':518,
	'name':'Component-518',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':519,
	'name':'Component-519',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':520,
	'name':'Component-520',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':521,
	'name':'Component-521',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':522,
	'name':'Component-522',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':523,
	'name':'Component-523',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':524,
	'name':'Component-524',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':525,
	'name':'Component-525',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':526,
	'name':'Component-526',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':527,
	'name':'Component-527',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':528,
	'name':'Component-528',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':529,
	'name':'Component-529',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':530,
	'name':'Component-530',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':531,
	'name':'Component-531',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':532,
	'name':'Component-532',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':533,
	'name':'Component-533',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':534,
	'name':'Component-534',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':535,
	'name':'Component-535',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':536,
	'name':'Component-536',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':537,
	'name':'Component-537',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':538,
	'name':'Component-538',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':539,
	'name':'Component-539',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':540,
	'name':'Component-540',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':541,
	'name':'Component-541',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':542,
	'name':'Component-542',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':543,
	'name':'Component-543',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':544,
	'name':'Component-544',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':545,
	'name':'Component-545',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':546,
	'name':'Component-546',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':547,
	'name':'Component-547',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':548,
	'name':'Component-548',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':549,
	'name':'Component-549',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':550,
	'name':'Component-550',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':551,
	'name':'Component-551',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':552,
	'name':'Component-552',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':553,
	'name':'Component-553',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':554,
	'name':'Component-554',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':555,
	'name':'Component-555',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':556,
	'name':'Component-556',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':557,
	'name':'Component-557',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':558,
	'name':'Component-558',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':559,
	'name':'Component-559',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':560,
	'name':'Component-560',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':561,
	'name':'Component-561',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':562,
	'name':'Component-562',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':563,
	'name':'Component-563',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':564,
	'name':'Component-564',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':565,
	'name':'Component-565',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':566,
	'name':'Component-566',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':567,
	'name':'Component-567',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':568,
	'name':'Component-568',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':569,
	'name':'Component-569',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':570,
	'name':'Component-570',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':571,
	'name':'Component-571',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':572,
	'name':'Component-572',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':573,
	'name':'Component-573',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':574,
	'name':'Component-574',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':575,
	'name':'Component-575',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':576,
	'name':'Component-576',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':577,
	'name':'Component-577',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':578,
	'name':'Component-578',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':579,
	'name':'Component-579',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':580,
	'name':'Component-580',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':581,
	'name':'Component-581',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':582,
	'name':'Component-582',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':583,
	'name':'Component-583',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':584,
	'name':'Component-584',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':585,
	'name':'Component-585',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':586,
	'name':'Component-586',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':587,
	'name':'Component-587',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':588,
	'name':'Component-588',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':589,
	'name':'Component-589',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':590,
	'name':'Component-590',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':591,
	'name':'Component-591',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':592,
	'name':'Component-592',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':593,
	'name':'Component-593',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':594,
	'name':'Component-594',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':595,
	'name':'Component-595',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':596,
	'name':'Component-596',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':597,
	'name':'Component-597',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':598,
	'name':'Component-598',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':599,
	'name':'Component-599',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':600,
	'name':'Component-600',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':601,
	'name':'Component-601',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':602,
	'name':'Component-602',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':603,
	'name':'Component-603',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':604,
	'name':'Component-604',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':605,
	'name':'Component-605',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':606,
	'name':'Component-606',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':607,
	'name':'Component-607',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':608,
	'name':'Component-608',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':609,
	'name':'Component-609',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':610,
	'name':'Component-610',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':611,
	'name':'Component-611',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':612,
	'name':'Component-612',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':613,
	'name':'Component-613',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':614,
	'name':'Component-614',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':615,
	'name':'Component-615',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':616,
	'name':'Component-616',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':617,
	'name':'Component-617',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':618,
	'name':'Component-618',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':619,
	'name':'Component-619',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':620,
	'name':'Component-620',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':621,
	'name':'Component-621',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':622,
	'name':'Component-622',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':623,
	'name':'Component-623',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':624,
	'name':'Component-624',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':625,
	'name':'Component-625',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':626,
	'name':'Component-626',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':627,
	'name':'Component-627',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':628,
	'name':'Component-628',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':629,
	'name':'Component-629',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':630,
	'name':'Component-630',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':631,
	'name':'Component-631',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':632,
	'name':'Component-632',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':633,
	'name':'Component-633',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':634,
	'name':'Component-634',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':635,
	'name':'Component-635',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':636,
	'name':'Component-636',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':637,
	'name':'Component-637',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':638,
	'name':'Component-638',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':639,
	'name':'Component-639',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':640,
	'name':'Component-640',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':641,
	'name':'Component-641',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':642,
	'name':'Component-642',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':643,
	'name':'Component-643',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':644,
	'name':'Component-644',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':645,
	'name':'Component-645',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':646,
	'name':'Component-646',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':647,
	'name':'Component-647',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':648,
	'name':'Component-648',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':649,
	'name':'Component-649',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':650,
	'name':'Component-650',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':651,
	'name':'Component-651',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':652,
	'name':'Component-652',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':653,
	'name':'Component-653',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':654,
	'name':'Component-654',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':655,
	'name':'Component-655',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':656,
	'name':'Component-656',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':657,
	'name':'Component-657',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':658,
	'name':'Component-658',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':659,
	'name':'Component-659',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':660,
	'name':'Component-660',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':661,
	'name':'Component-661',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':662,
	'name':'Component-662',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':663,
	'name':'Component-663',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':664,
	'name':'Component-664',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':665,
	'name':'Component-665',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':666,
	'name':'Component-666',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':667,
	'name':'Component-667',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':668,
	'name':'Component-668',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':669,
	'name':'Component-669',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':670,
	'name':'Component-670',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':671,
	'name':'Component-671',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':672,
	'name':'Component-672',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':673,
	'name':'Component-673',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':674,
	'name':'Component-674',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':675,
	'name':'Component-675',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':676,
	'name':'Component-676',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':677,
	'name':'Component-677',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':678,
	'name':'Component-678',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':679,
	'name':'Component-679',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':680,
	'name':'Component-680',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':681,
	'name':'Component-681',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':682,
	'name':'Component-682',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':683,
	'name':'Component-683',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':684,
	'name':'Component-684',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':685,
	'name':'Component-685',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':686,
	'name':'Component-686',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':687,
	'name':'Component-687',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':688,
	'name':'Component-688',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':689,
	'name':'Component-689',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':690,
	'name':'Component-690',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':691,
	'name':'Component-691',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':692,
	'name':'Component-692',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':693,
	'name':'Component-693',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':694,
	'name':'Component-694',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':695,
	'name':'Component-695',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':696,
	'name':'Component-696',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':697,
	'name':'Component-697',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':698,
	'name':'Component-698',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':699,
	'name':'Component-699',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':700,
	'name':'Component-700',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':701,
	'name':'Component-701',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':702,
	'name':'Component-702',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':703,
	'name':'Component-703',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':704,
	'name':'Component-704',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':705,
	'name':'Component-705',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':706,
	'name':'Component-706',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':707,
	'name':'Component-707',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':708,
	'name':'Component-708',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':709,
	'name':'Component-709',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':710,
	'name':'Component-710',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':711,
	'name':'Component-711',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':712,
	'name':'Component-712',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':713,
	'name':'Component-713',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':714,
	'name':'Component-714',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':715,
	'name':'Component-715',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':716,
	'name':'Component-716',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':717,
	'name':'Component-717',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':718,
	'name':'Component-718',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':719,
	'name':'Component-719',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':720,
	'name':'Component-720',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':721,
	'name':'Component-721',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':722,
	'name':'Component-722',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':723,
	'name':'Component-723',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':724,
	'name':'Component-724',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':725,
	'name':'Component-725',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':726,
	'name':'Component-726',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':727,
	'name':'Component-727',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':728,
	'name':'Component-728',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':729,
	'name':'Component-729',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':730,
	'name':'Component-730',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':731,
	'name':'Component-731',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':732,
	'name':'Component-732',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':733,
	'name':'Component-733',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':734,
	'name':'Component-734',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':735,
	'name':'Component-735',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':736,
	'name':'Component-736',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':737,
	'name':'Component-737',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':738,
	'name':'Component-738',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':739,
	'name':'Component-739',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':740,
	'name':'Component-740',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':741,
	'name':'Component-741',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':742,
	'name':'Component-742',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':743,
	'name':'Component-743',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':744,
	'name':'Component-744',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':745,
	'name':'Component-745',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':746,
	'name':'Component-746',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':747,
	'name':'Component-747',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':748,
	'name':'Component-748',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':749,
	'name':'Component-749',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':750,
	'name':'Component-750',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':751,
	'name':'Component-751',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':752,
	'name':'Component-752',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':753,
	'name':'Component-753',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':754,
	'name':'Component-754',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':755,
	'name':'Component-755',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':756,
	'name':'Component-756',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':757,
	'name':'Component-757',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':758,
	'name':'Component-758',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':759,
	'name':'Component-759',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':760,
	'name':'Component-760',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':761,
	'name':'Component-761',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':762,
	'name':'Component-762',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':763,
	'name':'Component-763',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':764,
	'name':'Component-764',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':765,
	'name':'Component-765',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':766,
	'name':'Component-766',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':767,
	'name':'Component-767',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':768,
	'name':'Component-768',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':769,
	'name':'Component-769',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':770,
	'name':'Component-770',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':771,
	'name':'Component-771',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':772,
	'name':'Component-772',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':773,
	'name':'Component-773',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':774,
	'name':'Component-774',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':775,
	'name':'Component-775',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':776,
	'name':'Component-776',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':777,
	'name':'Component-777',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':778,
	'name':'Component-778',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':779,
	'name':'Component-779',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':780,
	'name':'Component-780',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':781,
	'name':'Component-781',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':782,
	'name':'Component-782',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':783,
	'name':'Component-783',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':784,
	'name':'Component-784',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':785,
	'name':'Component-785',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':786,
	'name':'Component-786',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':787,
	'name':'Component-787',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':788,
	'name':'Component-788',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':789,
	'name':'Component-789',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':790,
	'name':'Component-790',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':791,
	'name':'Component-791',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':792,
	'name':'Component-792',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':793,
	'name':'Component-793',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':794,
	'name':'Component-794',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':795,
	'name':'Component-795',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':796,
	'name':'Component-796',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':797,
	'name':'Component-797',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':798,
	'name':'Component-798',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':799,
	'name':'Component-799',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':800,
	'name':'Component-800',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':801,
	'name':'Component-801',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':802,
	'name':'Component-802',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':803,
	'name':'Component-803',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':804,
	'name':'Component-804',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':805,
	'name':'Component-805',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':806,
	'name':'Component-806',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':807,
	'name':'Component-807',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':808,
	'name':'Component-808',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':809,
	'name':'Component-809',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':810,
	'name':'Component-810',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':811,
	'name':'Component-811',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':812,
	'name':'Component-812',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':813,
	'name':'Component-813',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':814,
	'name':'Component-814',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':815,
	'name':'Component-815',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':816,
	'name':'Component-816',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':817,
	'name':'Component-817',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':818,
	'name':'Component-818',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':819,
	'name':'Component-819',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':820,
	'name':'Component-820',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':821,
	'name':'Component-821',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':822,
	'name':'Component-822',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':823,
	'name':'Component-823',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':824,
	'name':'Component-824',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':825,
	'name':'Component-825',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':826,
	'name':'Component-826',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':827,
	'name':'Component-827',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':828,
	'name':'Component-828',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':829,
	'name':'Component-829',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':830,
	'name':'Component-830',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':831,
	'name':'Component-831',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':832,
	'name':'Component-832',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':833,
	'name':'Component-833',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':834,
	'name':'Component-834',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':835,
	'name':'Component-835',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':836,
	'name':'Component-836',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':837,
	'name':'Component-837',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':838,
	'name':'Component-838',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':839,
	'name':'Component-839',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':840,
	'name':'Component-840',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':841,
	'name':'Component-841',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':842,
	'name':'Component-842',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':843,
	'name':'Component-843',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':844,
	'name':'Component-844',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':845,
	'name':'Component-845',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':846,
	'name':'Component-846',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':847,
	'name':'Component-847',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':848,
	'name':'Component-848',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':849,
	'name':'Component-849',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':850,
	'name':'Component-850',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':851,
	'name':'Component-851',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':852,
	'name':'Component-852',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':853,
	'name':'Component-853',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':854,
	'name':'Component-854',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':855,
	'name':'Component-855',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':856,
	'name':'Component-856',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':857,
	'name':'Component-857',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':858,
	'name':'Component-858',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':859,
	'name':'Component-859',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':860,
	'name':'Component-860',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':861,
	'name':'Component-861',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':862,
	'name':'Component-862',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':863,
	'name':'Component-863',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':864,
	'name':'Component-864',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':865,
	'name':'Component-865',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':866,
	'name':'Component-866',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':867,
	'name':'Component-867',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':868,
	'name':'Component-868',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':869,
	'name':'Component-869',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':870,
	'name':'Component-870',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':871,
	'name':'Component-871',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':872,
	'name':'Component-872',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':873,
	'name':'Component-873',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':874,
	'name':'Component-874',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':875,
	'name':'Component-875',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':876,
	'name':'Component-876',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':877,
	'name':'Component-877',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':878,
	'name':'Component-878',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':879,
	'name':'Component-879',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':880,
	'name':'Component-880',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':881,
	'name':'Component-881',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':882,
	'name':'Component-882',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':883,
	'name':'Component-883',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':884,
	'name':'Component-884',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':885,
	'name':'Component-885',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':886,
	'name':'Component-886',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':887,
	'name':'Component-887',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':888,
	'name':'Component-888',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':889,
	'name':'Component-889',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':890,
	'name':'Component-890',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':891,
	'name':'Component-891',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':892,
	'name':'Component-892',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':893,
	'name':'Component-893',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':894,
	'name':'Component-894',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':895,
	'name':'Component-895',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':896,
	'name':'Component-896',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':897,
	'name':'Component-897',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':898,
	'name':'Component-898',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':899,
	'name':'Component-899',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':900,
	'name':'Component-900',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':901,
	'name':'Component-901',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':902,
	'name':'Component-902',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':903,
	'name':'Component-903',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':904,
	'name':'Component-904',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':905,
	'name':'Component-905',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':906,
	'name':'Component-906',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':907,
	'name':'Component-907',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':908,
	'name':'Component-908',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':909,
	'name':'Component-909',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':910,
	'name':'Component-910',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':911,
	'name':'Component-911',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':912,
	'name':'Component-912',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':913,
	'name':'Component-913',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':914,
	'name':'Component-914',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':915,
	'name':'Component-915',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':916,
	'name':'Component-916',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':917,
	'name':'Component-917',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':918,
	'name':'Component-918',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':919,
	'name':'Component-919',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':920,
	'name':'Component-920',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':921,
	'name':'Component-921',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':922,
	'name':'Component-922',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':923,
	'name':'Component-923',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':924,
	'name':'Component-924',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':925,
	'name':'Component-925',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':926,
	'name':'Component-926',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':927,
	'name':'Component-927',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':928,
	'name':'Component-928',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':929,
	'name':'Component-929',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':930,
	'name':'Component-930',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':931,
	'name':'Component-931',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':932,
	'name':'Component-932',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':933,
	'name':'Component-933',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':934,
	'name':'Component-934',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':935,
	'name':'Component-935',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':936,
	'name':'Component-936',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':937,
	'name':'Component-937',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':938,
	'name':'Component-938',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':939,
	'name':'Component-939',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':940,
	'name':'Component-940',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':941,
	'name':'Component-941',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':942,
	'name':'Component-942',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':943,
	'name':'Component-943',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':944,
	'name':'Component-944',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':945,
	'name':'Component-945',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':946,
	'name':'Component-946',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':947,
	'name':'Component-947',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':948,
	'name':'Component-948',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':949,
	'name':'Component-949',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':950,
	'name':'Component-950',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':951,
	'name':'Component-951',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':952,
	'name':'Component-952',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':953,
	'name':'Component-953',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':954,
	'name':'Component-954',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':955,
	'name':'Component-955',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':956,
	'name':'Component-956',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':957,
	'name':'Component-957',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':958,
	'name':'Component-958',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':959,
	'name':'Component-959',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':960,
	'name':'Component-960',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':961,
	'name':'Component-961',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':962,
	'name':'Component-962',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':963,
	'name':'Component-963',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':964,
	'name':'Component-964',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':965,
	'name':'Component-965',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':966,
	'name':'Component-966',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':967,
	'name':'Component-967',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':968,
	'name':'Component-968',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':969,
	'name':'Component-969',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':970,
	'name':'Component-970',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':971,
	'name':'Component-971',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':972,
	'name':'Component-972',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':973,
	'name':'Component-973',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':974,
	'name':'Component-974',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':975,
	'name':'Component-975',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':976,
	'name':'Component-976',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':977,
	'name':'Component-977',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':978,
	'name':'Component-978',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':979,
	'name':'Component-979',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':980,
	'name':'Component-980',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':981,
	'name':'Component-981',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':982,
	'name':'Component-982',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':983,
	'name':'Component-983',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':984,
	'name':'Component-984',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':985,
	'name':'Component-985',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':986,
	'name':'Component-986',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':987,
	'name':'Component-987',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':988,
	'name':'Component-988',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':989,
	'name':'Component-989',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':990,
	'name':'Component-990',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':991,
	'name':'Component-991',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':992,
	'name':'Component-992',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':993,
	'name':'Component-993',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':994,
	'name':'Component-994',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':995,
	'name':'Component-995',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':996,
	'name':'Component-996',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':997,
	'name':'Component-997',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':998,
	'name':'Component-998',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':999,
	'name':'Component-999',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1000,
	'name':'Component-1000',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1001,
	'name':'Component-1001',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1002,
	'name':'Component-1002',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1003,
	'name':'Component-1003',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1004,
	'name':'Component-1004',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1005,
	'name':'Component-1005',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1006,
	'name':'Component-1006',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1007,
	'name':'Component-1007',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1008,
	'name':'Component-1008',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1009,
	'name':'Component-1009',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1010,
	'name':'Component-1010',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1011,
	'name':'Component-1011',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1012,
	'name':'Component-1012',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1013,
	'name':'Component-1013',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1014,
	'name':'Component-1014',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1015,
	'name':'Component-1015',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1016,
	'name':'Component-1016',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1017,
	'name':'Component-1017',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1018,
	'name':'Component-1018',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1019,
	'name':'Component-1019',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1020,
	'name':'Component-1020',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1021,
	'name':'Component-1021',
	'flavor':'',
	'bonus':function(target){

	}
},
{
	'id':1022,
	'name':'Component-1022',
	'flavor':'',
	'bonus':function(target){

	}
},{
	'id':1023,
	'name':'Component1023',
	'flavor':'Void. Fearful dark void.',
	'bonus':function(target){

	}
}	];

var components=[];

for (var i=0;i<cmp.length;i++) {
	components[cmp[i].id]=cmp[i];

};

