var contextTutorialDeath = 'wake up, captain. we managed to recover you from the wreckage.\nif you had any ore collected, it\'s gone, but any parts\nyou collect will remain.';
var contextTutorialProfile = 'going in guns blazing and/or with a huge warship will attract attention.\nyou can use this to your advantage. provoke attacks!\nenemies will be caught in the crossfire and' +
'\nturn on each other.';
var contextTutorialBlink = 'your HUD tracks the biggest threats,\nand will blink furiously as enemies approach.\nmission targets will be marked GOLD.';

var missions = [

{	'id':0,
	'next':[3],
	'name':'tutorial',
	'complete':false,
	'componentsReward':banditGear,
	'creditsReward':10,
	'hazeRed':0.7,
	'hazeWhite':0.4,
	'hazePurple':0.8,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':80,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['glad to have you aboard, captain. \ni\'ll be giving you the guided tour.',
	'let\'s get started. [LEFT] and [RIGHT] turn your ship.\ntry it now.',
	'press [X] to fire.\nyou\'ll notice the pink ENERGY BAR decrease as you shoot.\nenergy will recharge over time.',
	'i think you\'re ready.\npress [UP] to thrust... gently.\nyou probably aren\'t used to dealing with inertia.\nto slow down, TURN AROUND and THRUST.',
	'see if you can clear 5 of the rocks around the station.\nwe\'ve got a surprise for you when you get back.\nwe\'ll contact you when ready.'],
	'outro':['great job. now, you\'ll need to head back to the station.\nthe green HOME ICON always points home. when you get here...',
	'press [DOWN] to dock in the REPAIR BAY.'],
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
			'missionTarget':false,
			'count':30, 
			'taunts':[],
			'deaths':[]
		}]




},
{	'id':1,
	'next':[1],
	'name':'random warzone',
	'complete':false,
	'componentsReward':banditGear,
	'creditsReward':10,
	'hazeRed':0.7,
	'hazeWhite':0.5,
	'hazePurple':1.0,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':17,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['er... go kill things'],
	'win':{
		'condition':'kill',
		'killCount':999,
		'killType': ships
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
	'next':[1],
	'name':'obligatory kill quest',
	'complete':false,
	'componentsReward':banditGear,
	'creditsReward':20,
	'hazeRed':0.7,
	'hazeWhite':0.2,
	'hazePurple':0.2,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':17,
	'hazePurpleBlendMode':1,
	'hazeRedBlendMode':1,
	'intro':['uh, captain... there\'s a big nasty incoming.\nlooks like a bandit warship.\nalright, we\'ve got an AWSM bomb here...','it will obliterate your ship,\nbut if you can get close enough, you can take the warship out with you.','pull in close and RIGHT CLICK with the AWSM equipped.'],
	'outro':['BOOoooom! that was amazing!\ncome on back.'],
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
	'creditsReward':20,
	'hazeRed':0.2,
	'hazeWhite':0.7,
	'hazePurple':1.0,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':40,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':1,
	'intro':['we have COMPONENTS for you.\nCLICK the picture to add a part to your ship.\nthen, DRAG the component wherever you like on your ship.',
	'LEFT/RIGHT or A/D will cycle through your inventory.\ndifferent components will have different effects, some good, some bad.','... drifting into a sector with some mining drones. we can take the asteroids for\nourselves and scrap the drones for parts.','kill 4 drones and report back.\nwatch out for bandits, visibility is poor here.'],
	'outro':['nice job. hurry back, there are alliance warships coming in!'],
	'win':{
		'condition':'kill',
		'killCount':4,
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
	'creditsReward':20,
	'hazeRed':1,
	'hazeWhite':2,
	'hazePurple':0.7,
	'hazeRedSpeed':40,
	'hazeWhiteSpeed':600,
	'hazePurpleSpeed':6,
	'hazePurpleBlendMode':2,
	'hazeRedBlendMode':2,
	'intro':['we need to get supplies to our colony NOW.\nthe GOLD DIAMOND indicator will lead you to the waypoint.\nnow about those warships...','don\'t try to engage them. we can\'t spare the ships for that.\nstrip down your ship to lower your profile and hold your fire at all costs.\nif they come after you, RUN!','this THERMAL MONITORING SYSTEM will warn you right\nwhen you enter enemy sensor range, and again when the enemy has locked on.\nuse it to avoid the warships if you can.'],
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






}
];
