var cmp = [
{
	'id':1,
	'name':'Rusted Wing',
	'bonus':function(target){
		target.turnRate+=0.9;
		target.actor.body.maxVelocity.x+=50;
		target.actor.body.maxVelocity.y+=50;
		target.acceleration+=0.6;
		target.energyRate+=100;
	}
},
{
	'id':2,
	'name':'Ancient Railgun',
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
	'bonus':function(target){
		target.energyMax+=10;
		target.energyAmount+=1;
	}
},
{
	'id':4,
	'name':'VariJet',
	'bonus':function(target){
		target.turnRate+=0.5;
		target.acceleration+=0.3;
	}
},
{
	'id':5,
	'name':'Overpowered Burst Laser',
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
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.actor.profile+=10;
	}
},
{
	'id':7,
	'name':'Alien Pustule',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.actor.profile+=10;
	}
},
{
	'id':8,
	'name':'Shield Generator',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':9,
	'name':'Point Defense Unit',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':10,
	'name':'Fusion Core',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyRate*=0.9;
		target.actor.body.maxVelocity.x+=20;
		target.actor.body.maxVelocity.y+=20;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':11,
	'name':'Fusion Core',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyRate*=0.9;
		target.actor.body.maxVelocity.x+=20;
		target.actor.body.maxVelocity.y+=20;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':12,
	'name':'Xenoform Reactor',
	'bonus':function(target){
		target.energyRate*=0.5;
		target.actor.profile+=100;
		target.fireDamage*=1.2;
	}
},
{
	'id':13,
	'name':'Fusion Bolt Cannon',
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
	'bonus':function(target){

	}
},
{
	'id':15,
	'name':'Component15',
	'bonus':function(target){

	}
},
{
	'id':16,
	'name':'Component16',
	'bonus':function(target){

	}
},
{
	'id':17,
	'name':'Component17',
	'bonus':function(target){

	}
},
{
	'id':18,
	'name':'Component18',
	'bonus':function(target){

	}
},
{
	'id':19,
	'name':'Component19',
	'bonus':function(target){

	}
},
{
	'id':20,
	'name':'Component20',
	'bonus':function(target){

	}
},
{
	'id':21,
	'name':'Component21',
	'bonus':function(target){

	}
},
{
	'id':22,
	'name':'Component22',
	'bonus':function(target){

	}
},
{
	'id':23,
	'name':'Component23',
	'bonus':function(target){

	}
},
{
	'id':24,
	'name':'Component24',
	'bonus':function(target){

	}
},
{
	'id':25,
	'name':'Component25',
	'bonus':function(target){

	}
},
{
	'id':26,
	'name':'Component26',
	'bonus':function(target){

	}
},
{
	'id':27,
	'name':'Component27',
	'bonus':function(target){

	}
},
{
	'id':28,
	'name':'Component28',
	'bonus':function(target){

	}
},
{
	'id':29,
	'name':'Component29',
	'bonus':function(target){

	}
},
{
	'id':30,
	'name':'Component30',
	'bonus':function(target){

	}
},
{
	'id':31,
	'name':'Component31',
	'bonus':function(target){

	}
},
{
	'id':32,
	'name':'Radioactive Thruster',
	'bonus':function(target){
		target.acceleration+=1;
		target.turnRate+=0.2;
		target.actor.body.maxVelocity.x+=30;
		target.actor.body.maxVelocity.y+=30;
		target.health-=1;
	}
},
{
	'id':33,
	'name':'Derelict Crewpod',
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
	'bonus':function(target){
		target.turnRate+=0.3;
		target.acceleration+=0.2;
		target.heatlth+=4;
	}
},
{
	'id':35,
	'name':'Fusion Thrust',
	'bonus':function(target){
		target.acceleration+=0.7;
		target.actor.body.maxVelocity.x+=20;
		target.actor.body.maxVelocity.y+=20;
		target.health+=1;
	}
},
{
	'id':36,
	'name':'Standard Quarters',
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
	'bonus':function(target){
		target.health+=6;
		target.turnRate+=0.2;
	}
},

{
	'id':38,
	'name':'Alien Pustule',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.actor.profile+=10;
	}
},
{
	'id':39,
	'name':'Alien Pustule',
	'bonus':function(target){
		target.fireDamage+=1;
		target.energyMax+=2;
		target.actor.profile+=10;
	}
},
{
	'id':40,
	'name':'Experimental Navigation System',
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
	'bonus':function(target){
		target.energyMax+=2;
		target.energyRate*=0.9;
		target.actor.body.maxVelocity.x+=20;
		target.actor.body.maxVelocity.y+=20;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':43,
	'name':'Fusion Core',
	'bonus':function(target){
		target.energyMax+=2;
		target.energyRate*=0.9;
		target.actor.body.maxVelocity.x+=20;
		target.actor.body.maxVelocity.y+=20;
		target.acceleration+=0.2;
		target.turnRate+=0.1;
	}
},
{
	'id':44,
	'name':'Thrust Package',
	'bonus':function(target){
		target.fireDamage+=1;
		target.acceleration+=0.6;
		target.actor.profile+=50;
	}
},
{
	'id':45,
	'name':'Secure Dormitory',
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
	'bonus':function(target){

	}
},
{
	'id':47,
	'name':'Component47',
	'bonus':function(target){

	}
},
{
	'id':48,
	'name':'Component48',
	'bonus':function(target){

	}
},
{
	'id':49,
	'name':'Component49',
	'bonus':function(target){

	}
},
{
	'id':50,
	'name':'Component50',
	'bonus':function(target){

	}
},
{
	'id':51,
	'name':'Component51',
	'bonus':function(target){

	}
},
{
	'id':52,
	'name':'Component52',
	'bonus':function(target){

	}
},
{
	'id':53,
	'name':'Component53',
	'bonus':function(target){

	}
},
{
	'id':54,
	'name':'Component54',
	'bonus':function(target){

	}
},
{
	'id':55,
	'name':'Component55',
	'bonus':function(target){

	}
},
{
	'id':56,
	'name':'Component56',
	'bonus':function(target){

	}
},
{
	'id':57,
	'name':'Component57',
	'bonus':function(target){

	}
},
{
	'id':58,
	'name':'Component58',
	'bonus':function(target){

	}
},
{
	'id':59,
	'name':'Component59',
	'bonus':function(target){

	}
},
{
	'id':60,
	'name':'Component60',
	'bonus':function(target){

	}
},
{
	'id':61,
	'name':'Component61',
	'bonus':function(target){

	}
},
{
	'id':62,
	'name':'Component62',
	'bonus':function(target){

	}
},
{
	'id':63,
	'name':'Component63',
	'bonus':function(target){

	}
},
{
	'id':64,
	'name':'Cloaking Device',
	'bonus':function(target){
		target.TODO=1;

	}
},
{
	'id':65,
	'name':'Worn Armor Plating',
	'bonus':function(target){
		target.health+=8;
		target.acceleration*=0.8;
		target.turnRate*=0.8;
		target.actor.profile+=10;
	}
},
{
	'id':66,
	'name':'Discount Attitude Jet',
	'bonus':function(target){
		target.turnRate+=0.7;
		target.acceleration+=0.3;
	}
},
{
	'id':67,
	'name':'Long Range Sensor',
	'bonus':function(target){
		target.TODO=1;

	}
},
{
	'id':68,
	'name':'Durasteel Plating',
	'bonus':function(target){
		target.health+=12;
		target.acceleration*=0.7;
		target.turnRate*=0.7;
		target.actor.profile+=10;	
	}
},
{
	'id':69,
	'name':'Angular Ion Thrust',
	'bonus':function(target){
		target.turnRate+=1
	}
},
{
	'id':70,
	'name':'Low-Profile Wing',
	'bonus':function(target){
		target.actor.profile-=25;//refund standard profile cost
		target.actor.profile*=0.9;
		target.actor.body.maxVelocity.x+=20;
		target.actor.body.maxVelocity.y+=20;
		target.acceleration+=0.3;
		target.turnRate+=0.2;

	}
},
{
	'id':71,
	'name':'Command Deck',
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
	'bonus':function(target){
		target.fireDamage+=2;
		target.fireRate+=100;
	
		target.actor.profile+=20;	
	}
},
{
	'id':74,
	'name':'Habitat',
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
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':77,
	'name':'Decorative Skull',
	'bonus':function(target){
		target.actor.profile+=50;
		target.fireDamage+=2;
		target.fireRate*=0.9;
	}
},
{
	'id':78,
	'name':'Component78',
	'bonus':function(target){

	}
},
{
	'id':79,
	'name':'Component79',
	'bonus':function(target){

	}
},
{
	'id':80,
	'name':'Component80',
	'bonus':function(target){

	}
},
{
	'id':81,
	'name':'Component81',
	'bonus':function(target){

	}
},
{
	'id':82,
	'name':'Component82',
	'bonus':function(target){

	}
},
{
	'id':83,
	'name':'Component83',
	'bonus':function(target){

	}
},
{
	'id':84,
	'name':'Component84',
	'bonus':function(target){

	}
},
{
	'id':85,
	'name':'Component85',
	'bonus':function(target){

	}
},
{
	'id':86,
	'name':'Component86',
	'bonus':function(target){

	}
},
{
	'id':87,
	'name':'Component87',
	'bonus':function(target){

	}
},
{
	'id':88,
	'name':'Component88',
	'bonus':function(target){

	}
},
{
	'id':89,
	'name':'Component89',
	'bonus':function(target){

	}
},
{
	'id':90,
	'name':'Component90',
	'bonus':function(target){

	}
},
{
	'id':91,
	'name':'Component91',
	'bonus':function(target){

	}
},
{
	'id':92,
	'name':'Component92',
	'bonus':function(target){

	}
},
{
	'id':93,
	'name':'Component93',
	'bonus':function(target){

	}
},
{
	'id':94,
	'name':'Component94',
	'bonus':function(target){

	}
},
{
	'id':95,
	'name':'Component95',
	'bonus':function(target){

	}
},
{
	'id':96,
	'name':'Pirate CPU',
	'bonus':function(target){
		target.fireRate*=0.8;
		target.energyRate*=0.7;
	
		target.actor.profile+=20;	
	}
},
{
	'id':97,
	'name':'Faulty Wiring',
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
	'bonus':function(target){
		target.health-=1;
		target.bulletDamage+=3;
	}
},
{
	'id':99,
	'name':'Advanced Processor',
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
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':101,
	'name':'Weapon Rotator',
	'bonus':function(target){
		target.fireRate*=0.7;
		target.fireDamage+=1;
		target.actor.profile+=30;
	}
},
{
	'id':102,
	'name':'Prototype Stabilizer',
	'bonus':function(target){
		target.turnRate+=0.6;
		target.acceleration+=0.2;
		target.actor.profile*=0.9;
	}
},
{
	'id':103,
	'name':'Tactical Control Module',
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
	'bonus':function(target){
		target.acceleration+=0.8;
		target.actor.body.maxVelocity.x+=20;
		target.actor.body.maxVelocity.y+=20;
		target.energyRate*=0.9;
	}
},
{
	'id':105,
	'name':'Observation Unit',
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
	'bonus':function(target){
		target.actor.profile+=25;
		target.cashFlow+=10;
		
	}
},
{
	'id':109,
	'name':'Vidscreen Ad <Cola>',
	'bonus':function(target){
		target.actor.profile+=25;
		target.cashFlow+=10; //TODO
	}
},
{
	'id':110,
	'name':'Component110',
	'bonus':function(target){

	}
},
{
	'id':111,
	'name':'Component111',
	'bonus':function(target){

	}
},
{
	'id':112,
	'name':'Component112',
	'bonus':function(target){

	}
},
{
	'id':113,
	'name':'Component113',
	'bonus':function(target){

	}
},
{
	'id':114,
	'name':'Component114',
	'bonus':function(target){

	}
},
{
	'id':115,
	'name':'Component115',
	'bonus':function(target){

	}
},
{
	'id':116,
	'name':'Component116',
	'bonus':function(target){

	}
},
{
	'id':117,
	'name':'Component117',
	'bonus':function(target){

	}
},
{
	'id':118,
	'name':'Component118',
	'bonus':function(target){

	}
},
{
	'id':119,
	'name':'Component119',
	'bonus':function(target){

	}
},
{
	'id':120,
	'name':'Component120',
	'bonus':function(target){

	}
},
{
	'id':121,
	'name':'Component121',
	'bonus':function(target){

	}
},
{
	'id':122,
	'name':'Component122',
	'bonus':function(target){

	}
},
{
	'id':123,
	'name':'Component123',
	'bonus':function(target){

	}
},
{
	'id':124,
	'name':'Component124',
	'bonus':function(target){

	}
},
{
	'id':125,
	'name':'Component125',
	'bonus':function(target){

	}
},
{
	'id':126,
	'name':'Component126',
	'bonus':function(target){

	}
},
{
	'id':127,
	'name':'Component127',
	'bonus':function(target){

	}
},
{
	'id':128,
	'name':'Contraband Missiles',
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
	'bonus':function(target){
		target.acceleration+=1;
		target.turnrate+=0.1;
		target.health+=1;
		target.actor.body.maxVelocity.x+=70;
		target.actor.body.maxVelocity.y+=70;
	}
},
{
	'id':130,
	'name':'Aftermarket Gatling',
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
	'bonus':function(target){
		target.health+=2;
		target.acceleration+=0.5;
		target.actor.body.maxVelocity.x+=50;
		target.actor.body.maxVelocity.y+=50;
	}
},
{
	'id':133,
	'name':'Gleaming Autocannon',
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
	'bonus':function(target){

	}
},
{
	'id':135,
	'name':'Component135',
	'bonus':function(target){

	}
},
{
	'id':136,
	'name':'Component136',
	'bonus':function(target){

	}
},
{
	'id':137,
	'name':'Component137',
	'bonus':function(target){

	}
},
{
	'id':138,
	'name':'Component138',
	'bonus':function(target){

	}
},
{
	'id':139,
	'name':'Component139',
	'bonus':function(target){

	}
},
{
	'id':140,
	'name':'Component140',
	'bonus':function(target){

	}
},
{
	'id':141,
	'name':'Component141',
	'bonus':function(target){

	}
},
{
	'id':142,
	'name':'Component142',
	'bonus':function(target){

	}
},
{
	'id':143,
	'name':'Component143',
	'bonus':function(target){

	}
},
{
	'id':144,
	'name':'Component144',
	'bonus':function(target){

	}
},
{
	'id':145,
	'name':'Component145',
	'bonus':function(target){

	}
},
{
	'id':146,
	'name':'Component146',
	'bonus':function(target){

	}
},
{
	'id':147,
	'name':'Component147',
	'bonus':function(target){

	}
},
{
	'id':148,
	'name':'Component148',
	'bonus':function(target){

	}
},
{
	'id':149,
	'name':'Component149',
	'bonus':function(target){

	}
},
{
	'id':150,
	'name':'Component150',
	'bonus':function(target){

	}
},
{
	'id':151,
	'name':'Component151',
	'bonus':function(target){

	}
},
{
	'id':152,
	'name':'Component152',
	'bonus':function(target){

	}
},
{
	'id':153,
	'name':'Component153',
	'bonus':function(target){

	}
},
{
	'id':154,
	'name':'Component154',
	'bonus':function(target){

	}
},
{
	'id':155,
	'name':'Component155',
	'bonus':function(target){

	}
},
{
	'id':156,
	'name':'Component156',
	'bonus':function(target){

	}
},
{
	'id':157,
	'name':'Component157',
	'bonus':function(target){

	}
},
{
	'id':158,
	'name':'Component158',
	'bonus':function(target){

	}
},
{
	'id':159,
	'name':'Component159',
	'bonus':function(target){

	}
},
{
	'id':160,
	'name':'Illegal Cargo',
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
	'bonus':function(target){

	}
},
{
	'id':162,
	'name':'Component162',
	'bonus':function(target){

	}
},
{
	'id':163,
	'name':'Component163',
	'bonus':function(target){

	}
},
{
	'id':164,
	'name':'Component164',
	'bonus':function(target){

	}
},
{
	'id':165,
	'name':'Component165',
	'bonus':function(target){

	}
},
{
	'id':166,
	'name':'Component166',
	'bonus':function(target){

	}
},
{
	'id':167,
	'name':'Component167',
	'bonus':function(target){

	}
},
{
	'id':168,
	'name':'Component168',
	'bonus':function(target){

	}
},
{
	'id':169,
	'name':'Component169',
	'bonus':function(target){

	}
},
{
	'id':170,
	'name':'Component170',
	'bonus':function(target){

	}
},
{
	'id':171,
	'name':'Component171',
	'bonus':function(target){

	}
},
{
	'id':172,
	'name':'Component172',
	'bonus':function(target){

	}
},
{
	'id':173,
	'name':'Component173',
	'bonus':function(target){

	}
},
{
	'id':174,
	'name':'Component174',
	'bonus':function(target){

	}
},
{
	'id':175,
	'name':'Component175',
	'bonus':function(target){

	}
},
{
	'id':176,
	'name':'Component176',
	'bonus':function(target){

	}
},
{
	'id':177,
	'name':'Component177',
	'bonus':function(target){

	}
},
{
	'id':178,
	'name':'Component178',
	'bonus':function(target){

	}
},
{
	'id':179,
	'name':'Component179',
	'bonus':function(target){

	}
},
{
	'id':180,
	'name':'Component180',
	'bonus':function(target){

	}
},
{
	'id':181,
	'name':'Component181',
	'bonus':function(target){

	}
},
{
	'id':182,
	'name':'Component182',
	'bonus':function(target){

	}
},
{
	'id':183,
	'name':'Component183',
	'bonus':function(target){

	}
},
{
	'id':184,
	'name':'Component184',
	'bonus':function(target){

	}
},
{
	'id':185,
	'name':'Component185',
	'bonus':function(target){

	}
},
{
	'id':186,
	'name':'Component186',
	'bonus':function(target){

	}
},
{
	'id':187,
	'name':'Component187',
	'bonus':function(target){

	}
},
{
	'id':188,
	'name':'Component188',
	'bonus':function(target){

	}
},
{
	'id':189,
	'name':'Component189',
	'bonus':function(target){

	}
},
{
	'id':190,
	'name':'Component190',
	'bonus':function(target){

	}
},
{
	'id':191,
	'name':'Component191',
	'bonus':function(target){

	}
},
{
	'id':192,
	'name':'Component192',
	'bonus':function(target){

	}
},
{
	'id':193,
	'name':'Component193',
	'bonus':function(target){

	}
},
{
	'id':194,
	'name':'Component194',
	'bonus':function(target){

	}
},
{
	'id':195,
	'name':'Component195',
	'bonus':function(target){

	}
},
{
	'id':196,
	'name':'Component196',
	'bonus':function(target){

	}
},
{
	'id':197,
	'name':'Component197',
	'bonus':function(target){

	}
},
{
	'id':198,
	'name':'Component198',
	'bonus':function(target){

	}
},
{
	'id':199,
	'name':'Component199',
	'bonus':function(target){

	}
},
{
	'id':200,
	'name':'Component200',
	'bonus':function(target){

	}
},
{
	'id':201,
	'name':'Component201',
	'bonus':function(target){

	}
},
{
	'id':202,
	'name':'Component202',
	'bonus':function(target){

	}
},
{
	'id':203,
	'name':'Component203',
	'bonus':function(target){

	}
},
{
	'id':204,
	'name':'Component204',
	'bonus':function(target){

	}
},
{
	'id':205,
	'name':'Component205',
	'bonus':function(target){

	}
},
{
	'id':206,
	'name':'Component206',
	'bonus':function(target){

	}
},
{
	'id':207,
	'name':'Component207',
	'bonus':function(target){

	}
},
{
	'id':208,
	'name':'Component208',
	'bonus':function(target){

	}
},
{
	'id':209,
	'name':'Component209',
	'bonus':function(target){

	}
},
{
	'id':210,
	'name':'Component210',
	'bonus':function(target){

	}
},
{
	'id':211,
	'name':'Component211',
	'bonus':function(target){

	}
},
{
	'id':212,
	'name':'Component212',
	'bonus':function(target){

	}
},
{
	'id':213,
	'name':'Component213',
	'bonus':function(target){

	}
},
{
	'id':214,
	'name':'Component214',
	'bonus':function(target){

	}
},
{
	'id':215,
	'name':'Component215',
	'bonus':function(target){

	}
},
{
	'id':216,
	'name':'Component216',
	'bonus':function(target){

	}
},
{
	'id':217,
	'name':'Component217',
	'bonus':function(target){

	}
},
{
	'id':218,
	'name':'Component218',
	'bonus':function(target){

	}
},
{
	'id':219,
	'name':'Component219',
	'bonus':function(target){

	}
},
{
	'id':220,
	'name':'Component220',
	'bonus':function(target){

	}
},
{
	'id':221,
	'name':'Component221',
	'bonus':function(target){

	}
},
{
	'id':222,
	'name':'Component222',
	'bonus':function(target){

	}
},
{
	'id':223,
	'name':'Component223',
	'bonus':function(target){

	}
},
{
	'id':224,
	'name':'Component224',
	'bonus':function(target){

	}
},
{
	'id':225,
	'name':'Component225',
	'bonus':function(target){

	}
},
{
	'id':226,
	'name':'Component226',
	'bonus':function(target){

	}
},
{
	'id':227,
	'name':'Component227',
	'bonus':function(target){

	}
},
{
	'id':228,
	'name':'Component228',
	'bonus':function(target){

	}
},
{
	'id':229,
	'name':'Component229',
	'bonus':function(target){

	}
},
{
	'id':230,
	'name':'Component230',
	'bonus':function(target){

	}
},
{
	'id':231,
	'name':'Component231',
	'bonus':function(target){

	}
},
{
	'id':232,
	'name':'Component232',
	'bonus':function(target){

	}
},
{
	'id':233,
	'name':'Component233',
	'bonus':function(target){

	}
},
{
	'id':234,
	'name':'Component234',
	'bonus':function(target){

	}
},
{
	'id':235,
	'name':'Component235',
	'bonus':function(target){

	}
},
{
	'id':236,
	'name':'Component236',
	'bonus':function(target){

	}
},
{
	'id':237,
	'name':'Component237',
	'bonus':function(target){

	}
},
{
	'id':238,
	'name':'Component238',
	'bonus':function(target){

	}
},
{
	'id':239,
	'name':'Component239',
	'bonus':function(target){

	}
},
{
	'id':240,
	'name':'Component240',
	'bonus':function(target){

	}
},
{
	'id':241,
	'name':'Component241',
	'bonus':function(target){

	}
},
{
	'id':242,
	'name':'Component242',
	'bonus':function(target){

	}
},
{
	'id':243,
	'name':'Component243',
	'bonus':function(target){

	}
},
{
	'id':244,
	'name':'Component244',
	'bonus':function(target){

	}
},
{
	'id':245,
	'name':'Component245',
	'bonus':function(target){

	}
},
{
	'id':246,
	'name':'Component246',
	'bonus':function(target){

	}
},
{
	'id':247,
	'name':'Component247',
	'bonus':function(target){

	}
},
{
	'id':248,
	'name':'Component248',
	'bonus':function(target){

	}
},
{
	'id':249,
	'name':'Component249',
	'bonus':function(target){

	}
},
{
	'id':250,
	'name':'Component250',
	'bonus':function(target){

	}
},
{
	'id':251,
	'name':'Component251',
	'bonus':function(target){

	}
},
{
	'id':252,
	'name':'Component252',
	'bonus':function(target){

	}
},
{
	'id':253,
	'name':'Component253',
	'bonus':function(target){

	}
},
{
	'id':254,
	'name':'Component254',
	'bonus':function(target){

	}
},
{
	'id':255,
	'name':'Component255',
	'bonus':function(target){

	}
},
{
	'id':256,
	'name':'Component256',
	'bonus':function(target){

	}
}];

var components=[];

for (var i=0;i<cmp.length;i++) {
	components[cmp[i].id]=cmp[i];

};

