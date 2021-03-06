var tutorials =
[
'killing opponents yields components and xp.\ncomponents will upgrade your ship.\nxp will increase your ship\'s max size.',
	'your ship will lose systems in heavy combat.\nyou will be forced to improvise to survive.','more tips on the pause screen [ENTER]',

]
;
var messages =
['as you level, your ship can grow much larger.',
	'different parts have wildly different effects.',
	'yellow items usually increase damage.',
	'pink items usually improve energy recharge.',
	'blue items usually increase hp.',
	'firing weapons increases your heat signature\nand will make other vessels aggressive',
	'between repairs, your heat signature will slowly increase\nthis will attract enemy vessels from farther away',
	'green items usually improve maneuverability.',
	'laser weapons have a short reach but can hit multiple\nfoes. enemy lasers are more likely to cause\ncomponent removal.',
	'some parts give a special ability, accessed by\npressing Z or clicking/touching the special attack icon.',
	'bugs are likely and common',
	'aggressive behaviors are more likely to alert foes.\nif you\'re trying to make an escape, fire sparingly.',
	'running is a viable solution.',
	'smaller ships attract less attention, and\ncan dart out of trouble.',
	'enemy crew may escape from destroyed ships.\ncapture them for bonus xp... if you can',
	'components give xp instead of attaching\nto your ship at max size.'
];

var allLootableItems = function () {
	var ret=[];
	for(var i=0; i<components.length; i++){
		if(typeof(components[i].name)=='undefined'){
		}else{
			if(components[i].drops){
				ret.push(i);
			}
		}
	}
	return ret;	
}
var contextTutorialDeath = 'lose your ship, lose xp.';

var missions = [

{	'id':0,
	'next':[666],
	'asteroidPanic':false,
	'distantPlanet':true,
	'name':'tutorial 0',
	'complete':false,
	'hazeRed':0.6,
	'hazeWhite':1.5,
	'hazePurple':0.7,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':2000,
	'distanceMax':3000,
	'hazePurpleBlendMode':1,
	'hazeRedBlendMode':0,
	'intro':['click or touch to target. hold to move.\ntry destroying some asteroids and cargo containers.',
	'when you get the hang of it,\nfollow the GOLD <> indicator to the next portal.'],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
'symmetry': 1,
			'respawn':3,
			'count':3, 
			'missionTarget':false
		},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 4,
		'respawn':7,
		'count':7, 
		'missionTarget':false
	},
	{
		'ships': containers,
'symmetry': 1,
		'respawn':5,
		'count':5, 
		'missionTarget':false
	}
	,
		{
			'ships': questionContainers,
'symmetry': 1,
			'respawn':0,
			'count':3, 
			'missionTarget':true
		}
	]




},
{	'id':1,
	'next':[1],
	'name':'random warzone',
	'complete':false,
	'hazeRed':0.7,
	'hazeWhite':1.5,
	'hazePurple':0.8,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':1,
	'hazeRedBlendMode':0,
	'intro':[''],
	'outro':['congrats'],
	'win':{
		'condition':'frob'
	},
	'enemies': [
	{
		'ships': asteroids,
'symmetry': 1,
		'respawn':true,
		'count':3, 
		'missionTarget':false
	},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':11, 
		'missionTarget':false
	}


	]



},
{	'id':2,
	'next':[666],
	'name':'tutorial 2',
	'complete':false,
	'distantPlanet':true,
	'asteroidPanic':false,
	'hazeRed':0.2,
	'hazeWhite':1.7,
	'hazePurple':0.7,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':1,
	'hazeRedBlendMode':0,
	'intro':['your ship will lose systems in heavy combat.\nyou will be forced to improvise to survive.','more tips on the pause screen [ENTER]'],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies': [{
		'ships': bandits,
'symmetry': 1,
		'parts': banditGear2,
		'sizeMin': 2,
		'sizeMax': 5,
		'respawn':true,
		'missionTarget':false,
		'count': 6, 
		'deaths':['I SMELL DELICIOUS!']
	},
	{
		'ships': drones,
'symmetry': 1,
		'parts':droneGear,
		'sizeMin': 2,
		'sizeMax': 5,
		'respawn':true,
		'missionTarget':false,
		'count':8, 
		'deaths':[]
	},
	{
		'ships': asteroids,
'symmetry': 1,
		'respawn':true,
		'count':3, 
		'missionTarget':false
	},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 4,
		'respawn':true,
		'count':11, 
		'missionTarget':false
	}


	,{
		'ships': containers,
'symmetry': 1,
		'respawn':true,
		'missionTarget':false,
		'count':4, 
		'deaths':[]
	}	
	,
		{
			'ships': questionContainers,
'symmetry': 1,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}
	]



},
{	'id':3,
	'next':[2],
	'distantPlanet':true,
	'asteroidPanic':false,
	'name':'tutorial 1',
	'complete':false,
	'hazeRed':0.3,
	'hazeWhite':1.6,
	'hazePurple':0.6,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':6000,
	'distanceMax':9000,
	'hazePurpleBlendMode':1,
	'hazeRedBlendMode':0,
	'intro':['killing opponents yields components and xp.\ncomponents will upgrade your ship.\nxp will increase your ship\'s max size.'],
	'outro':['nice job. come on to the next portal'],
	'win':{
		'condition':'frob'
	},
	'enemies': [
	{
		'ships': drones,
'symmetry': 1,
		'parts': blackParts,
		'sizeMin': 2,
		'sizeMax': 5,
		'respawn':true,
		'missionTarget':false,
		'count':1, 
		'deaths':[]
	},{
		'ships': drones,
'symmetry': 1,
		'parts': failDroneGear,
		'sizeMin': 2,
		'sizeMax': 4,
		'respawn':true,
		'missionTarget':false,
		'count':8, 
		'deaths':[]
	},
		{
			'ships': asteroids,
'symmetry': 1,
			'respawn':true,
			'count':3, 
			'missionTarget':false
		},
		{
			'ships': asteroids,
'symmetry': 0,
			'parts': asteroidParts, 
			'sizeMin': 2,
			'sizeMax': 4,
			'respawn':true,
			'count':11, 
			'missionTarget':false
		}
		,
			{
				'ships': containers,
'symmetry': 1,
				'respawn':true,
				'missionTarget':false,
				'count':3, 
				'deaths':[]
			}
		,
			{
				'ships': questionContainers,
'symmetry': 1,
				'respawn':false,
				'count':3, 
				'missionTarget':false
			}

		]



}


];



/*
 * mission template
 */
/*
   {
   'id':TODO,
   'next':[TODO],
   'name':'TODO',
   'complete':false,
   'hazeRed':0.7,
   'hazeWhite':1.4,
   'hazePurple':0.8,
   'hazeRedSpeed':30,
   'hazeWhiteSpeed':10,
   'hazePurpleSpeed':85,
   'distanceMin':12000,
   'distanceMax':12000,
   'hazePurpleBlendMode':1,
   'hazeRedBlendMode':0,
   'intro':[''],
   'outro':[''],
   'win':{
   'condition':'kill', //could be 'frob'
   'killCount':5,
   'killType': asteroids
   },
   'enemies':
   [{
   'ships': asteroids,
'symmetry': 1,
   'respawn':true,
   'count':17, 
   'missionTarget':false
   },
   {
   'ships': TODO,
'symmetry': 1,
   'parts': allLootableItems(),
   'sizeMin': 2,
   'sizeMax': 9,
   'respawn':true,
   'count':13, 
   'missionTarget':false
   }]
   }
 */
