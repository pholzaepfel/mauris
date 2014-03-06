var missions = [

{'id':0,
	'name':'random warzone',
	'complete':false,
	'componentsReward':[1],
	'creditsReward':10,
	'intro':['welcome to mauris.',
	'DOWN/S: dock or undock at station',
	'exchange parts when docked; LEFT/RIGHT or A/D cycle inventory.',
	'UP/W: thrust. be aware of inertia.',
	'LEFT/RIGHT or A/D: turn.',
	'LEFT MOUSE BUTTON: fire.',
	'go blow things up. bring parts back. build new ship. repeat.'
		],
	'winCondition':'kill',
	'enemies': [{
		'ships': ships,
		'ai':1,
		'respawn':true,
		'count':9,
		'missionCount':-1,
		'taunts':['test message'],
		'deaths':['I SMELL DELICIOUS!']
	},
	{
		'ships': asteroids,
		'ai':2,
		'respawn':true,
		'count':20,
		'missionCount': 20,
		'taunts':[],
		'deaths':[]
	}



	]
}
];
