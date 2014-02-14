var cmp = [
{
	'id':1,
	'name':'Rusted Wing',
	'bonus':function(target){
		target.turnRate+=0.9;target.acceleration+=0.6;target.energyRate+=100;
	}
},
{
	'id':2,
	'name':'Ancient Railgun',
	'bonus':function(target){
		target.bulletSprite=3;target.fireEnergy+=1;target.fireRange+=1000;target.fireDamage+=1;target.fireRate-=200;
	}
},
{
	'id':3,
	'name':'Capacitor Unit',
	'bonus':function(target){
		target.energyMax+=10;target.energyAmount+=1;
	}
},
{
	'id':4,
	'name':'VariJet',
	'bonus':function(target){
		target.turnRate+=0.5;target.acceleration+=0.3;
	}
},
{
	'id':5,
	'name':'Overpowered Burst Laser',
	'bonus':function(target){
		target.fireSpeed+=200;target.fireRate*=0.25;target.BulletSprite=3
	}
},
{
	'id':64,
	'name':'Radioactive Thruster',
	'bonus':function(target){
		target.acceleration+=1;target.turnRate+=0.2;target.health-=1;
	}
},
{
	'id':65,
	'name':'Derelict Crewpod',
	'bonus':function(target){
		target.health+=2;target.energyRate-=200;;target.acceleration+=0.1;
	}
},
{
	'id':66,
	'name':'Filthy Cockpit',
	'bonus':function(target){
		target.turnRate+=0.3;target.acceleration+=0.2;target.heatlth+=4;
	}
},
{
	'id':67,
	'name':'Fusion Thrust',
	'bonus':function(target){
		target.acceleration+=0.7;target.turnRate-=0.1;target.health+=1;
	}
},
{
	'id':68,
	'name':'Standard Quarters',
	'bonus':function(target){
		target.health+=3;target.energyAmount+1;target.energyMax+=4;
	}
},
{
	'id':69,
	'name':'Command Center',
	'bonus':function(target){
		target.health+=6;target.turnRate+=0.2;
	}
},
{
	'id':128,
	'name':'Cloaking Device',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':129,
	'name':'Worn Armor Plating',
	'bonus':function(target){
		target.health+=8;target.acceleration-=0.3;target.turnRate=-0.1;
	}
},
{
	'id':130,
	'name':'Discount Attitude Jet',
	'bonus':function(target){
		target.turnRate+=0.7;target.acceleration+=0.3
	}
},
{
	'id':131,
	'name':'Long Range Sensor',
	'bonus':function(target){
		target.TODO=1;
	}
},
{
	'id':132,
	'name':'Durasteel Plating',
	'bonus':function(target){
		target.health+=12;target.acceleration-=0.5;target.turnRate-=0.3;
	}
},
{
	'id':133,
	'name':'Angular Ion Thrust',
	'bonus':function(target){
		target.turnRate+=1
	}
},
{
	'id':192,
	'name':'Pirate CPU',
	'bonus':function(target){
		target.fireRate-=200;target.energyRate-=200;
	}
},
{
	'id':193,
	'name':'Faulty Wiring',
	'bonus':function(target){
		target.energyMax+=12;target.energyRate+=1000;target.energyAmount+=1;
	}
},
{
	'id':194,
	'name':'Destroyed Airlock',
	'bonus':function(target){
		target.health-=1;target.bulletDamage+=3;
	}
},
{
	'id':195,
	'name':'Advanced Processor',
	'bonus':function(target){
		target.fireRate-=100;target.turnRate+=0.3;target.health+=2;
	}
},
{
	'id':196,
	'name':'Weapon Rotator',
	'bonus':function(target){
		target.fireRate-=200;target.fireDamage+=1;
	}
},
{
	'id':256,
	'name':'Unreliable Missiles',
	'bonus':function(target){
		target.bulletSprite=2;target.fireSpeed-=200;target.fireRange+=500;target.fireDamage+=3;
	}
},
{
	'id':257,
	'name':'Scavenged Exoskeleton',
	'bonus':function(target){
		target.acceleration+=1;target.turnrate+=0.1;target.health+=1;
	}
},
{
	'id':258,
	'name':'Aftermarket Gatling',
	'bonus':function(target){
		target.bulletSprite=1;target.fireRate-=300;target.fireRange-=300;target.fireDamage-=1;target.fireEnergy-=1;
	}
},
{
	'id':259,
	'name':'Freedom Missiles',
	'bonus':function(target){
		target.bulletSprite=2;target.fireDamage+=2;target.fireEnergy+=2;
	}
},
{
	'id':260,
	'name':'Ultralight Wing',
	'bonus':function(target){
		target.health+=2;target.acceleration+=0.5;
	}
},
{
	'id':261,
	'name':'Gleaming Autocannon',
	'bonus':function(target){
		target.bulletSprite=1;target.fireRate-=200;target.fireRange-=200
	}
},
{
	'id':320,
	'name':'Illegal Cargo',
	'bonus':function(target){
		target.energyMax+=5;
	}
}];
var components=[];
for (var i=0; i<cmp.length; i++) {
	components[cmp[i].id]=cmp[i];
};
