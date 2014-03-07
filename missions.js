var missions = [

{	'id':0,
	'next':[1],
	'name':'tutorial',
	'complete':false,
	'componentsReward':[1],
	'creditsReward':10,
	'intro':['welcome to mauris, captain.',
	'press LEFT and RIGHT or A nd D to turn. try it now.',
	'now, press UP or W to thrust... gently. you\'ll see why.',
        'to slow down or stop, TURN in the opposite direction and THRUST.',
	'CLICK THE LEFT MOUSE BUTTON to fire.',
	'for now, destroy 10 of those damned rocks out there'],
	'outro':['great job. now, you\'ll need to head back to the station.',
		'the green HOME ICON always points home. when you get here...',
		'press DOWN or S to dock in the REPAIR BAY.'],
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
	'intro':['we have a free COMPONENT for you. CLICK the picture to add it to your ship.',
	'then, DRAG the component wherever you like on your ship.',
	'LEFT/RIGHT or A/D will cycle through your inventory.',
	'different components will have different effects, some good, some bad.',
	'captain, we have company. gear up and go wreak hell. press DOWN to leave the bay.'],
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
