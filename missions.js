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
	'smaller ships attract less attention, and\ncan dart out of trouble.'
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
	'next':[9],
	'asteroidPanic':false,
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
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':['click or touch to target. hold to move.\ntry destroying some asteroids and cargo containers.',
	'when you get the hang of it,\nfollow the GOLD <> indicator to the next station.'],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
'symmetry': 1,
			'respawn':true,
			'count':10, 
			'missionTarget':false
		},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':30, 
		'missionTarget':false
	},
	{
		'ships': containers,
'symmetry': 1,
		'respawn':true,
		'count':5, 
		'missionTarget':false
	}
	,
		{
			'ships': questionContainers,
'symmetry': 1,
			'respawn':false,
			'count':3, 
			'missionTarget':true
		}
	]




},
{	'id':1,
	'next':[5,6,7,8],
	'name':'random warzone',
	'complete':false,
	'hazeRed':0.7,
	'hazeWhite':1.5,
	'hazePurple':0.5,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':[''],
	'outro':['congrats'],
	'win':{
		'condition':'frob'
	},
	'enemies': [{
		'ships': ships,
'symmetry': 1,
		'parts': allLootableItems(),
		'sizeMin': 2,
		'sizeMax': 7,
		'respawn':true,
		'missionTarget':false,
		'count':9, 
		'deaths':['I SMELL DELICIOUS!']
	},
	{
		'ships': questionContainers,
'symmetry': 1,
		'respawn':false,
		'count':3, 
		'missionTarget':false
	},
	{
		'ships': asteroids,
'symmetry': 1,
		'respawn':true,
		'count':10, 
		'missionTarget':false
	},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':30, 
		'missionTarget':false
	}


	]



},
{	'id':2,
	'next':[5,6,7,8],
	'name':'obligatory kill quest',
	'complete':false,
	'hazeRed':0.7,
	'hazeWhite':1.2,
	'hazePurple':0.2,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':10000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':['!! BOSSFIGHT !!'],
	'outro':['BOOoooom!'],
	'win':{
		'condition':'kill',
		'killCount':1,
		'killType': banditBoss1
	},
	'enemies': [{
		'ships': bandits,
'symmetry': 1,
		'parts': banditGear2,
		'sizeMin': 2,
		'sizeMax': 5,
		'respawn':true,
		'missionTarget':false,
		'count':12, 
		'deaths':['I SMELL DELICIOUS!']
	},
	{
		'ships': questionContainers,
'symmetry': 1,
		'respawn':false,
		'count':3, 
		'missionTarget':false
	}
	,{
		'ships': banditBoss1,
'symmetry': 1,
		'parts': banditGear2,
		'sizeMin': 7,
		'sizeMax': 7,
		'respawn':false,
		'missionTarget':true,
		'count':1, 
		'deaths':[]
	},
		{
			'ships': asteroids,
'symmetry': 1,
			'respawn':true,
			'count':10, 
			'missionTarget':false
		},
		{
			'ships': asteroids,
'symmetry': 0,
			'parts': asteroidParts, 
			'sizeMin': 2,
			'sizeMax': 3,
			'respawn':true,
			'count':30, 
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
	'next':[666],
	'name':'tutorial 2',
	'complete':false,
	'asteroidPanic':false,
	'hazeRed':0.2,
	'hazeWhite':1.7,
	'hazePurple':0.5,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
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
		'count':10, 
		'missionTarget':false
	},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':30, 
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
			'missionTarget':true
		}
	]



},
{
	'id':4,
	'next':[11],
	'name':'smuggling',
	'complete':false,
	'hazeRed':0.6,
	'hazeWhite':1.4,
	'hazePurple':0.5,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':6000,
	'distanceMax':9000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':['!! DO NOT ENGAGE !!'],
	'outro':[''],
	'win':{
		'condition':'frob',
	},
	'enemies':[
	{
		'ships': asteroids,
'symmetry': 1,
		'respawn':true,
		'count':10, 
		'missionTarget':false
	},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':30, 
		'missionTarget':false
	}

	,
		{
			'ships': cops,
'symmetry': 1,
			'parts': allianceGear4,
			'sizeMin': 5,
			'sizeMax': 7,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		}]






},
{
	'id':5,
	'next':[6,7,8,10],
	'name':'5',
	'complete':false,
	'hazeRed':0.6,
	'hazeWhite':1.1,
	'hazePurple':0.3,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[	{
			'ships': asteroids,
'symmetry': 1,
			'respawn':true,
			'count':10, 
			'missionTarget':false
		},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':30, 
		'missionTarget':false
	}

	,
		{
			'ships': alliance,
'symmetry': 1,
			'parts': allianceGear4,
			'sizeMin': 2,
			'sizeMax': 6,
			'respawn':true,
			'count':14, 
			'missionTarget':false
		},{
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
{
	'id':6,
	'next':[5,7,8,10],
	'name':'bandits',
	'complete':false,
	'hazeRed':0.6,
	'hazeWhite':1.4,
	'hazePurple':0.6,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
'symmetry': 1,
			'respawn':true,
			'count':10, 
			'missionTarget':false
		},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':30, 
		'missionTarget':false
	}
	,
		{
			'ships': alliance,
'symmetry': 1,
			'parts': allianceGear4,
			'sizeMin': 2,
			'sizeMax': 5,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		},{
			'ships': banditsMedium,
'symmetry': 1,
			'parts': banditGear2,
			'sizeMin': 3,
			'sizeMax': 7,
			'respawn':true,
			'count':3, 
			'missionTarget':false
		},{
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
{
	'id':7,
	'next':[6,5,8,10],
	'name':'zombies',
	'complete':false,
	'hazeRed':0.6,
	'hazeWhite':1.4,
	'hazePurple':0.5,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':13000,
	'distanceMax':14000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
'symmetry': 1,
			'respawn':true,
			'count':10, 
			'missionTarget':false
		},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':30, 
		'missionTarget':false
	}
	,
		{
			'ships': zombies,
'symmetry': 1,
			'parts': zombieGear,
			'sizeMin': 3,
			'sizeMax': 6,
			'respawn':true,
			'count':15, 
			'missionTarget':false
		},{
			'ships': containers,
'symmetry': 1,
			'respawn':true,
			'missionTarget':false,
			'count':3, 
		}

	,
		{
			'ships': questionContainers,
'symmetry': 1,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}

	,{
		'ships': chainsaw,
'symmetry': 1,
		'respawn':true,
		'missionTarget':false,
		'count':1, 

	}]
},
{
	'id':8,
	'next':[5,6,7,10],
	'name':'dron2',
	'complete':false,
	'hazeRed':0.6,
	'hazeWhite':1.6,
	'hazePurple':0.5,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':12000,
	'distanceMax':13000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
'symmetry': 1,
			'respawn':true,
			'count':10, 
			'missionTarget':false
		},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':30, 
		'missionTarget':false
	}
	,
		{
			'ships': droneBoss1,
'symmetry': 1,
			'parts': droneGear,
			'sizeMin': 5,
			'sizeMax': 7,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		},
		{
			'ships': drones2,
'symmetry': 1,
			'parts': droneGear,
			'sizeMin': 2,
			'sizeMax': 4,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		},{
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
{	'id':9,
	'next':[3],
	'asteroidPanic':false,
	'name':'tutorial 1',
	'complete':false,
	'hazeRed':0.3,
	'hazeWhite':1.6,
	'hazePurple':0.4,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':6000,
	'distanceMax':9000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':['killing opponents yields components and xp.\ncomponents will upgrade your ship.\nxp will increase your ship\'s max size.'],
	'outro':['nice job. come on to the next station'],
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
			'count':10, 
			'missionTarget':false
		},
		{
			'ships': asteroids,
'symmetry': 0,
			'parts': asteroidParts, 
			'sizeMin': 2,
			'sizeMax': 3,
			'respawn':true,
			'count':30, 
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
				'missionTarget':true
			}

		]



},
{
	'id':10,
	'next':[5,6,7,8],
	'name':'mechanoids',
	'complete':false,
	'hazeRed':0.7,
	'hazeWhite':1.7,
	'hazePurple':0.4,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
'symmetry': 1,
			'respawn':true,
			'count':10, 
			'missionTarget':false
		},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':30, 
		'missionTarget':false
	}
	,
		{
			'ships': mechanoids,
'symmetry': 1,
			'parts': mechanoidGear,
			'sizeMin': 2,
			'sizeMax': 6,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		},
		{
			'ships': mechanoidMiniBoss1,
'symmetry': 1,
			'parts': mechanoidGear,
			'sizeMin': 7,
			'sizeMax': 7,
			'respawn':true,
			'count':1, 
			'missionTarget':false
		}]
}
,
{
	'id':11,
	'next':[5,6,7,8],
	'name':'weakalliance',
	'complete':false,
	'hazeRed':0.5,
	'hazeWhite':1.2,
	'hazePurple':0.4,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
'symmetry': 1,
			'respawn':true,
			'count':10, 
			'missionTarget':false
		},
	{
		'ships': asteroids,
'symmetry': 0,
		'parts': asteroidParts, 
		'sizeMin': 2,
		'sizeMax': 3,
		'respawn':true,
		'count':30, 
		'missionTarget':false
	}
	,
		{
			'ships': containers,
'symmetry': 1,
			'respawn':true,
			'count':6, 
			'missionTarget':false
		}

	,
		{
			'ships': questionContainers,
'symmetry': 1,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}


	,
		{
			'ships': allianceWeak,
'symmetry': 1,
			'parts': allianceGear4,
			'sizeMin': 2,
			'sizeMax': 5,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		}]
}
,
{
	'id':12,
	'next':[5,6,7,8],
	'name':'asteroids',
	'complete':false,
	'hazeRed':0.7,
	'hazeWhite':1.4,
	'hazePurple':0.4,
	'hazeRedSpeed':30,
	'hazeWhiteSpeed':10,
	'hazePurpleSpeed':85,
	'distanceMin':5000,
	'distanceMax':8000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':0,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
'symmetry': 0,
			'parts': asteroidParts, 
			'sizeMin': 2,
			'sizeMax': 5,
			'respawn':true,
			'count':70, 
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
   'hazePurpleBlendMode':2,
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
