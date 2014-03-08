var contextTutorialDeath = 'wake up, captain. we managed to recover you from the wreckage.\nif you had any ore collected, it\'s gone, but any parts\nyou collect will remain.';
var contextTutorialProfile = 'going in guns blazing and/or with a huge warship will attract attention.\nyou can use this to your advantage. provoke attacks!\nenemies will be caught in the crossfire and' +
'\nturn on each other.';
var contextTutorialBlink = 'as enemy vessels approach, your HUD will blink.\nyour thermal imaging array will track the largest, closest opponent.\nuse the HUD to compensate for poor visibility in the debris field.';

var missions = [

{	'id':0,
	'next':[1],
	'name':'tutorial',
	'complete':false,
	'componentsReward':[1],
	'creditsReward':10,
	'hazeRed':0,
	'hazeWhite':0.9,
	'hazePurple':0,
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
		'taunts':[],
		'deaths':[]
	}]



	
},
{	'id':1,
	'next':[1],
	'name':'random warzone',
	'complete':false,
	'componentsReward':[1],
	'creditsReward':10,
	'hazeRed':0.7,
	'hazeWhite':0.5,
	'hazePurple':0.1,
'intro':['we have a free COMPONENT for you.\nCLICK the picture to add it to your ship.\n then, DRAG the component wherever you like on your ship.',
	'LEFT/RIGHT or A/D will cycle through your inventory.\ndifferent components will have different effects, some good, some bad.',
	'captain, we have company. gear up and go wreak hell.\npress DOWN to leave the bay.'],
	'win':{
		'condition':'kill',
		'killCount':999,
		'killType': ships
	},
	'enemies': [{
		'ships': ships,
		'respawn':true,
		'count':12, 
		'taunts':['test message'],
		'deaths':['I SMELL DELICIOUS!']
	},
	{
		'ships': asteroids,
		'respawn':true,
		'count':20, 
		'taunts':[],
		'deaths':[]
	}
	]


	
}

];
