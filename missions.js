var contextTutorialDeath = 'wake up, captain. we managed to recover you from the wreckage.\nyour ship is a lost cause, but we can recover parts you were carrying.';

var missions = [

{	'id':0,
	'next':[9],
	'name':'tutorial',
	'complete':false,
	'componentsReward':banditGear,
	'componentsCount':1,
	'hazeRed':0.7,
	'hazeWhite':0.4,
	'hazePurple':0.8,
	'hazeRedTint':255<<8+64,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':80,
	'distanceMin':2000,
	'distanceMax':3000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['click to target. hold to move. try destroying some asteroids and cargo containers.',
	'when you get the hang of it,\nfollow the GOLD <> indicator to the next station.'],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':25, 
			'missionTarget':false
		},
		{
			'ships': containers,
			'respawn':true,
			'count':5, 
			'missionTarget':false
		}
		,
		{
			'ships': questionContainers,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}
]




},
{	'id':1,
	'next':[5,6,7,8],
	'name':'random warzone',
	'complete':false,
	'componentsReward':banditGear,
	'componentsCount':2,
	'hazeRed':0.7,
	'hazeWhite':0.5,
	'hazePurple':1.0,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':17,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':[''],
	'outro':['congrats'],
	'win':{
		'condition':'frob'
	},
	'enemies': [{
		'ships': ships,
		'respawn':true,
		'missionTarget':false,
		'count':9, 
		'deaths':['I SMELL DELICIOUS!']
	},
		{
			'ships': questionContainers,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		},
{
		'ships': asteroids,
		'respawn':true,
		'missionTarget':false,
		'count':20, 
		'deaths':[]
	}
	]



},
{	'id':2,
	'next':[5,6,7,8],
	'name':'obligatory kill quest',
	'complete':false,
	'componentsReward':banditGear,
	'componentsCount':4,
	'hazeRed':0.7,
	'hazeWhite':0.2,
	'hazePurple':0.2,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':17,
	'distanceMin':10000,
	'distanceMax':12000,
	'hazePurpleBlendMode':1,
	'hazeRedBlendMode':1,
	'intro':['!! BOSSFIGHT !!'],
	'outro':['BOOoooom!'],
	'win':{
		'condition':'kill',
		'killCount':1,
		'killType': banditBoss1
	},
	'enemies': [{
		'ships': bandits,
		'respawn':true,
		'missionTarget':false,
		'count':12, 
		'deaths':['I SMELL DELICIOUS!']
	},
		{
			'ships': questionContainers,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}
,{
		'ships': banditBoss1,
		'respawn':false,
		'missionTarget':true,
		'count':1, 
		'deaths':[]
	},
	{
		'ships': asteroids,
		'respawn':true,
		'missionTarget':false,
		'count':15, 
		'deaths':[]
	},{
		'ships': containers,
		'respawn':true,
		'missionTarget':false,
		'count':4, 
		'deaths':[]
	}	
			,
		{
			'ships': questionContainers,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}
]



},
{	'id':3,
	'next':[4],
	'name':'shots in the dark',
	'complete':false,
	'componentsReward':[64],
	'componentsCount':2,
	'hazeRed':0.2,
	'hazeWhite':0.7,
	'hazePurple':1.0,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':40,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['good job. keep making things explode.'],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies': [{
		'ships': bandits,
		'respawn':true,
		'missionTarget':false,
		'count': 6, 
		'deaths':['I SMELL DELICIOUS!']
	},
	{
		'ships': drones,
		'respawn':true,
		'missionTarget':false,
		'count':8, 
		'deaths':[]
	},
	{
		'ships': asteroids,
		'respawn':true,
		'missionTarget':false,
		'count':15, 
		'deaths':[]
	},{
		'ships': containers,
		'respawn':true,
		'missionTarget':false,
		'count':4, 
		'deaths':[]
	}	
			,
		{
			'ships': questionContainers,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}
]



},
{
	'id':4,
	'next':[11],
	'name':'smuggling',
	'complete':false,
	'componentsReward':[76],
	'componentsCount':1,
	'hazeRed':1,
	'hazeWhite':2,
	'hazePurple':0.7,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':40,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':6,
	'distanceMin':6000,
	'distanceMax':9000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':2,
	'intro':['!! DO NOT ENGAGE !!'],
	'outro':[''],
	'win':{
		'condition':'frob',
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':17, 
			'missionTarget':false
		},
	{
			'ships': cops,
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
	'componentsReward':allianceGear,
	'componentsCount':2,
	'hazeRed':1,
	'hazeWhite':0.1,
	'hazePurple':0.3,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':4,
	'hazeWhiteSpeed':4,
	'hazePurpleSpeed':2,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':17, 
			'missionTarget':false
		},
	{
			'ships': alliance,
			'respawn':true,
			'count':14, 
			'missionTarget':false
		},{
		'ships': containers,
		'respawn':true,
		'missionTarget':false,
		'count':4, 
		'deaths':[]
		}
			,
		{
			'ships': questionContainers,
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
	'componentsReward':allianceGear,
	'componentsCount':1,
	'hazeRed':1,
	'hazeWhite':0.4,
	'hazePurple':0.9,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':80,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':17, 
			'missionTarget':false
		},
	{
			'ships': alliance,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		},{
			'ships': banditsMedium,
			'respawn':true,
			'count':3, 
			'missionTarget':false
		},{
		'ships': containers,
		'respawn':true,
		'missionTarget':false,
		'count':4, 
		'deaths':[]
		}
			,
		{
			'ships': questionContainers,
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
	'componentsReward':droneGear,
	'componentsCount':2,
	'hazeRed':0.8,
	'hazeWhite':0.4,
	'hazePurple':0.7,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':(32<<16)+(192<<8)+32,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':160,
	'distanceMin':13000,
	'distanceMax':14000,
	'hazePurpleBlendMode':1,
	'hazeRedBlendMode':0,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		},
	{
			'ships': zombies,
			'respawn':true,
			'count':15, 
			'missionTarget':false
		},{
		'ships': containers,
		'respawn':true,
		'missionTarget':false,
		'count':3, 
	}

		,
		{
			'ships': questionContainers,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}

,{
		'ships': chainsaw,
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
	'componentsReward':droneGear,
	'componentsCount':4,
	'hazeRed':0.8,
	'hazeWhite':1.5,
	'hazePurple':1.0,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':10,
	'distanceMin':12000,
	'distanceMax':13000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':2,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':17, 
			'missionTarget':false
		},
	{
			'ships': droneBoss1,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		},
	{
			'ships': drones2,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		},{
		'ships': containers,
		'respawn':true,
		'missionTarget':false,
		'count':4, 
		'deaths':[]
		}
		,
		{
			'ships': questionContainers,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}

	]
},
{	'id':9,
	'next':[3],
	'name':'more tutorial',
	'complete':false,
	'componentsReward':banditGear,
	'componentsCount':2,
	'hazeRed':0.3,
	'hazeWhite':0.6,
	'hazePurple':1.0,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':30,
	'distanceMin':6000,
	'distanceMax':9000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['take these components and add them to your ship.\ncomponents will upgrade your ship.'],
	'outro':['nice job. come on to the next station'],
	'win':{
		'condition':'frob'
	},
	'enemies': [
	{
		'ships': drones,
		'respawn':true,
		'missionTarget':false,
		'count':7, 
		'deaths':[]
	},
	{
		'ships': asteroids,
		'respawn':true,
		'missionTarget':false,
		'count':18, 
		'deaths':[]
	},
	{
		'ships': containers,
		'respawn':true,
		'missionTarget':false,
		'count':3, 
		'deaths':[]
	}
		,
		{
			'ships': questionContainers,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}

	]



},
{
	'id':10,
	'next':[5,6,7,8],
	'name':'mechanoids',
	'complete':false,
	'componentsReward':mechanoidGear,
	'componentsCount':2,
	'hazeRed':0.7,
	'hazeWhite':0.7,
	'hazePurple':0.8,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':80,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':2,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':17, 
			'missionTarget':false
		},
	{
			'ships': mechanoids,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		},
	{
			'ships': mechanoidMiniBoss1,
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
	'componentsReward':banditGear,
	'componentsCount':2,
	'hazeRed':1.2,
	'hazeWhite':1.1,
	'hazePurple':0.4,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':320,
	'hazeWhiteSpeed':1200,
	'hazePurpleSpeed':160,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':2,
	'intro':[''],
	'outro':[''],
	'win':{
		'condition':'frob'
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':17, 
			'missionTarget':false
		},
{
			'ships': containers,
			'respawn':true,
			'count':6, 
			'missionTarget':false
		}

		,
		{
			'ships': questionContainers,
			'respawn':false,
			'count':3, 
			'missionTarget':false
		}


,
	{
			'ships': allianceWeak,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		}]
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
	'componentsReward':TODO,
	'componentsCount':1,
	'hazeRed':0.7,
	'hazeWhite':0.4,
	'hazePurple':0.8,
	'hazeRedTint':16777215,
	'hazeWhiteTint':16777215,
	'hazePurpleTint':16777215,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':80,
	'distanceMin':12000,
	'distanceMax':12000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
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
			'respawn':true,
			'count':17, 
			'missionTarget':false
		},
	{
			'ships': TODO,
			'respawn':true,
			'count':13, 
			'missionTarget':false
		}]
}
*/
