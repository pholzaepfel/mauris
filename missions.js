var contextTutorialDeath = 'wake up, captain. we managed to recover you from the wreckage.\nyour ship is a lost cause, but we can recover parts you were carrying.';

var missions = [

{	'id':0,
	'next':[3],
	'name':'tutorial',
	'complete':false,
	'componentsReward':banditGear,
	'componentsCount':1,
	'hazeRed':0.7,
	'hazeWhite':0.4,
	'hazePurple':0.8,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':80,
	'distanceMin':2000,
	'distanceMax':3000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['[INCOMING COMMUNICATION]',
	'[LEFT] and [RIGHT] turn your ship.',
	'press [X] to fire.\nfiring takes energy which will recharge over time.',
	'press [UP] to thrust. \nto slow down, TURN AROUND and THRUST.',
	'see if you can clear some of the asteroids around the station.'],
	'outro':['did you see the GREEN ore? pick it up to repair your ship.','great job. now, follow the GOLD DIAMOND to the next station.\nyou\'ll get new orders there.'],
	'win':{
		'condition':'kill',
		'killCount':5,
		'killType': asteroids
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':30, 
			'missionTarget':true,
			'count':30, 
			'taunts':[],
			'deaths':[]
		}]




},
{	'id':1,
	'next':[1,5,6,7,8],
	'name':'random warzone',
	'complete':false,
	'componentsReward':banditGear,
	'componentsCount':2,
	'hazeRed':0.7,
	'hazeWhite':0.5,
	'hazePurple':1.0,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':17,
	'distanceMin':8000,
	'distanceMax':10000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['er... go kill things'],
	'outro':['congrats'],
	'win':{
		'condition':'frob'
	},
	'enemies': [{
		'ships': ships,
		'respawn':true,
		'missionTarget':false,
		'count':9, 
		'taunts':['test message'],
		'deaths':['I SMELL DELICIOUS!']
	},
	{
		'ships': asteroids,
		'respawn':true,
		'missionTarget':false,
		'count':20, 
		'taunts':[],
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
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':17,
	'distanceMin':6000,
	'distanceMax':9000,
	'hazePurpleBlendMode':1,
	'hazeRedBlendMode':1,
	'intro':['uh, captain... there\'s a big nasty incoming.\nlooks like a bandit warship.\nalright, we\'ve got an AWSM bomb here...','it will obliterate your ship,\nbut if you can get close enough, you can take the warship out with you.','pull in close and press [Z] with the AWSM equipped.'],
	'outro':['BOOoooom! that was amazing!\nhead to the next waystation.'],
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
		'taunts':['test message'],
		'deaths':['I SMELL DELICIOUS!']
	},
	{
		'ships': banditBoss1,
		'respawn':false,
		'missionTarget':true,
		'count':1, 
		'taunts':[],
		'deaths':[]
	},
	{
		'ships': asteroids,
		'respawn':true,
		'missionTarget':false,
		'count':15, 
		'taunts':[],
		'deaths':[]
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
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':40,
	'distanceMin':8000,
	'distanceMax':10000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['take these components and add them to your ship.\ncomponents will improve your ship, but will weigh it down.','this sector has some mining drones. destroy them for parts\nand proceed to the next waypoint.'],
	'outro':['nice job. hurry, there are alliance warships coming in!'],
	'win':{
		'condition':'kill',
		'killCount':10,
		'killType': drones 
	},
	'enemies': [{
		'ships': bandits,
		'respawn':true,
		'missionTarget':false,
		'count': 6, 
		'taunts':['test message'],
		'deaths':['I SMELL DELICIOUS!']
	},
	{
		'ships': drones,
		'respawn':true,
		'missionTarget':true,
		'count':8, 
		'taunts':[],
		'deaths':[]
	},
	{
		'ships': asteroids,
		'respawn':true,
		'missionTarget':false,
		'count':15, 
		'taunts':[],
		'deaths':[]
	}
	]



},
{
	'id':4,
	'next':[2],
	'name':'smuggling',
	'complete':false,
	'componentsReward':[76],
	'componentsCount':1,
	'hazeRed':1,
	'hazeWhite':2,
	'hazePurple':0.7,
	'hazeRedSpeed':40,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':6,
	'distanceMin':5000,
	'distanceMax':7000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':2,
	'intro':['DO NOT engage the alliance warships here!\nstrip down your ship to lower your profile and hold your fire at all costs.\nthis THERMAL MONITORING SYSTEM will warn you when they\'re in range.'],
	'outro':['appreciate it, captain. try to make it back in one piece.'],
	'win':{
		'condition':'frob',
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':17, 
			'missionTarget':false,
			'taunts':[],
			'deaths':[]
		},
	{
			'ships': cops,
			'respawn':true,
			'count':13, 
			'missionTarget':false,
			'taunts':[],
			'deaths':[]
		}]






},
{
	'id':5,
	'next':[5,6,7,8],
	'name':'5',
	'complete':false,
	'componentsReward':allianceGear,
	'componentsCount':2,
	'hazeRed':1,
	'hazeWhite':0.1,
	'hazePurple':0.3,
	'hazeRedSpeed':4,
	'hazeWhiteSpeed':4,
	'hazePurpleSpeed':2,
	'distanceMin':9000,
	'distanceMax':10000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['init new quest. kill yellow things.\ngo to waypoint. reconfigure. repeat'],
	'outro':['captain. try to make it back in one piece.'],
	'win':{
		'condition':'kill', //could be 'frob'
		'killCount':10,
		'killType': alliance
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':17, 
			'missionTarget':false,
			'taunts':[],
			'deaths':[]
		},
	{
			'ships': alliance,
			'respawn':true,
			'count':14, 
			'missionTarget':true,
			'taunts':[],
			'deaths':[]
		}]
},
{
	'id':6,
	'next':[5,7,6,8],
	'name':'bandits',
	'complete':false,
	'componentsReward':allianceGear,
	'componentsCount':1,
	'hazeRed':1,
	'hazeWhite':0.4,
	'hazePurple':0.9,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':80,
	'distanceMin':3000,
	'distanceMax':5000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['init new quest. kill yellow things.\ngo to waypoint. reconfigure. repeat'],
	'outro':['captain. try to make it back in one piece.'],
	'win':{
		'condition':'kill', //could be 'frob'
		'killCount':5,
		'killType': banditsMedium
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':17, 
			'missionTarget':false,
			'taunts':[],
			'deaths':[]
		},
	{
			'ships': alliance,
			'respawn':true,
			'count':13, 
			'missionTarget':false,
			'taunts':[],
			'deaths':[]
		},{
			'ships': banditsMedium,
			'respawn':true,
			'count':3, 
			'missionTarget':true,
			'taunts':[],
			'deaths':[]
		}]
},
{
	'id':7,
	'next':[6,5,7,8],
	'name':'zombies',
	'complete':false,
	'componentsReward':droneGear,
	'componentsCount':2,
	'hazeRed':0.8,
	'hazeWhite':0.1,
	'hazePurple':0.7,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':160,
	'distanceMin':3000,
	'distanceMax':4000,
	'hazePurpleBlendMode':1,
	'hazeRedBlendMode':0,
	'intro':['init new quest. kill yellow things.\ngo to waypoint. reconfigure. repeat'],
	'outro':['captain. try to make it back in one piece.'],
	'win':{
		'condition':'kill', //could be 'frob'
		'killCount':10,
		'killType': zombies
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':13, 
			'missionTarget':false,
			'taunts':[],
			'deaths':[]
		},
	{
			'ships': zombies,
			'respawn':true,
			'count':15, 
			'missionTarget':true,
			'taunts':[],
			'deaths':[]
		}]
},
	{
	'id':8,
	'next':[5,6,7,8],
	'name':'dron2',
	'complete':false,
	'componentsReward':droneGear,
	'componentsCount':4,
	'hazeRed':0.8,
	'hazeWhite':1.5,
	'hazePurple':1.0,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':10,
	'distanceMin':2000,
	'distanceMax':3000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':2,
	'intro':['init new quest. kill yellow things.\ngo to waypoint. reconfigure. repeat'],
	'outro':['captain. try to make it back in one piece.'],
	'win':{
		'condition':'kill', //could be 'frob'
		'killCount':3,
		'killType': droneBoss1
	},
	'enemies':
		[{
			'ships': asteroids,
			'respawn':true,
			'count':17, 
			'missionTarget':false,
			'taunts':[],
			'deaths':[]
		},
	{
			'ships': droneBoss1,
			'respawn':false,
			'count':3, 
			'missionTarget':true,
			'taunts':[],
			'deaths':[]
		},
	{
			'ships': drones2,
			'respawn':true,
			'count':13, 
			'missionTarget':false,
			'taunts':[],
			'deaths':[]
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
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':80,
	'distanceMin':2000,
	'distanceMax':3000,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['init new quest. kill yellow things.\ngo to waypoint. reconfigure. repeat'],
	'outro':['captain. try to make it back in one piece.'],
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
			'missionTarget':false,
			'taunts':[],
			'deaths':[]
		},
	{
			'ships': TODO,
			'respawn':true,
			'count':13, 
			'missionTarget':false,
			'taunts':[],
			'deaths':[]
		}]
}
*/
