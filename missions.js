var contextTutorialDeath = 'wake up, captain. we managed to recover you from the wreckage.\nif you had any ore collected, it\'s gone, but any parts\nyou collect will remain.';
var contextTutorialProfile = 'going in guns blazing and/or with a huge warship will attract attention.\nyou can use this to your advantage. provoke attacks!\nenemies will be caught in the crossfire and' +
'\nturn on each other.';
var contextTutorialBlink = 'as enemy vessels approach, your HUD will blink.\nyour thermal imaging array will track the largest, closest opponent.\nuse the HUD to compensate for poor visibility in the debris field.';

var missions = [

{	'id':0,
	'next':[3],
	'name':'tutorial',
	'complete':false,
	'componentsReward':banditGear,
	'creditsReward':10,
	'hazeRed':0,
	'hazeWhite':0.9,
	'hazePurple':0,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':70,
	'hazePurpleSpeed':160,
	'intro':['glad to have you aboard, captain. \ni\'ll be giving you the guided tour.',
	'let\'s get started. LEFT/RIGHT or A/D turn your ship.\ntry it now.',
	'click the LEFT MOUSE BUTTON to fire.\nyou\'ll notice the pink ENERGY BAR decrease as you shoot.\nenergy will recharge over time.',
	'i think you\'re ready.\npress UP/W to thrust... gently.\nyou probably aren\'t used to dealing with inertia.\nto slow down, TURN AROUND and THRUST.',
	'see if you can clear 10 of the rocks around the station.\nwe\'ve got a surprise for you when you get back.\nwe\'ll contact you when ready.'],
	'outro':['great job. now, you\'ll need to head back to the station.\nthe green HOME ICON always points home. when you get here...',
	'press DOWN/S to dock in the REPAIR BAY.'],
	'win':{
		'condition':'kill',
		'killCount':10,
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
	'hazePurple':0.1,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':70,
	'hazePurpleSpeed':160,
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
	'hazeWhite':0.8,
	'hazePurple':0.2,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':70,
	'hazePurpleSpeed':160,
	'intro':['uh, captain... there\'s a big nasty incoming.\nit looks like one of the bandit ships.\n','equip this THERMAL RESONATOR. circle your opponents,\nand try to get them to fight each other instead oyou.\n','IFF systems are worthless anymore, so the crazy bastards shoot at everything...'],
	'outro':['amazing! that\'s one less rat in the cellar.\ncome on back.'],
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
	'hazeWhite':1,
	'hazePurple':0.2,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':70,
	'hazePurpleSpeed':160,
	'intro':['we have COMPONENTS for you.\nCLICK the picture to add a part to your ship.\nthen, DRAG the component wherever you like on your ship.',
	'LEFT/RIGHT or A/D will cycle through your inventory.\ndifferent components will have different effects, some good, some bad.','... drifting into a sector with some mining drones. we can take the asteroids for\nourselves and scrap the drones for parts.','kill 12 drones and report back.\nwatch out for bandits, visibility is poor here.'],
	'outro':['nice job. come on back.\nwe found something you\'ll like.'],
	'win':{
		'condition':'kill',
		'killCount':12,
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
	'componentsReward':[97],
	'creditsReward':20,
	'hazeRed':0.2,
	'hazeWhite':0.1,
	'hazePurple':0.1,
	'hazeRedSpeed':160,
	'hazeWhiteSpeed':70,
	'hazePurpleSpeed':160,
	'intro':['we need to get supplies to our colony.\nfollow the GOLD DIAMOND indicator there.','the remnants of the alliance fleet are passing through!\nstrip down your ship and hold your fire at all costs. if they come after you, RUN!','we\'ve found a THERMAL MONITORING SYSTEM. it will warn you right\nwhen you enter enemy sensor range, and again when the enemy has locked on.\nuse it to avoid the alliance warships.'],
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
