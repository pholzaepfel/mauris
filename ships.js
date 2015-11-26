//prefabricated ships and asteroids to populate the playfield
var questionContainers=[
[146, 147, 178, 179]
]
var trader=[
[-1, -1, -1, -1, -1, -1, 74, 75, 70, -1, 72, 104, 99, 41, 73, -1, 106, 107, 102, -1, -1, -1, -1, -1, -1]
];
var turtle=[
[140, 75, -1, 74, 141, 172, 30, 2, 30, 173, -1, -1, 129, 34, -1, 140, 30, 2, 30, 141, 172, 107, -1, 106, 173]
];
var cloaker=[
[-1, 36, 145, -1, 69, 3, 100, 101, -1, 35, 177, -1, -1, -1, -1, -1],
[131, 11, -1, -1, -1, 137, 36, 162, 145, -1, 69, 3, 100, 68, 101, 169, 35, 161, 177, -1, 131, 43, -1, -1, -1]
];
var weakAllianceBoss=[
[-1, 35, 141, 10, 11, -1, -1, 172, 137, 162, 68, 162, 141, -1, -1, 69, 35, 3, 67, 144, 101, -1, -1, -1, 131, 99, 131, 36, -1, 69, 35, 3, 67, 176, 101, 140, 169, 161, 68, 161, 173, -1, -1, 35, 173, 42, 43, -1, -1]
]
var xenoidMiniBoss=[
[-1, -1, -1, -1, -1, -1, -1, -1, 92, 80, 10, 11, 134, 93, 32, 142, 117, 103, 103, 116, 79, 32, 142, 85, 71, 71, 84, 79, -1, 124, 112, 106, 107, 166, 125, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
]

var megaHauler=[
[-1, 66, 30, 143, -1, -1, -1, -1, 129, -1, -1, -1, -1, 142, 174, 175, -1, -1, -1, 142, 174, 175, -1, -1, -1, -1, 129, -1, -1, -1, -1, 66, 30, 143, -1, -1],
[-1, -1, 98, 74, 75, 174, 160, 160, 174, 175, 66, 104, 104, 128, 33, 174, 160, 160, 174, 175, -1, -1, 116, 106, 107]
];
var avenger=[
[74, 75, -1, 66, 34, 73, 106, 166, -1]
];
var redStation=[
[-1, -1, 140, 141, -1, -1, -1, -1, 140, 65, 65, 141, -1, -1, 140, 65, 10, 11, 65, 141, -1, 44, 129, 72, 72, 129, 133, -1, 172, 65, 42, 43, 65, 173, -1, -1, 172, 65, 65, 173, -1, -1, -1, -1, 172, 173, -1, -1, -1]
]
var radAsteroids=[
[140, 141, 18, 19, -1, 172, 91, 84, 85, 19, -1, 133, 67, 85, 21, -1, 116, 84, 117, -1, -1, 16, 17, -1, -1]
]
var asteroids=[
[-1, -1, 18, 19, -1, -1, -1, 18, 24, 25, 19, -1, 18, 136, 137, 23, 21, -1, 23, 168, 169, 21, -1, -1, 20, 23, 22, 17, -1, -1, -1, 16, 21, -1, -1, -1],
[-1, -1, -1, 19, -1, -1, -1, 14, 24, 15, -1, 24, 22, 23, 21, 14, 23, 25, 21, -1, 20, 21, -1, -1, -1],
[14, 15, -1, 23, 24, 19, 16, 21, 20],
[6,-1,-1,-1,-1,14,19,29,-1,-1,16,25,7,-1,-1,-1,20,24,86,-1,-1,-1,39,21,-1],[6,7,-1,-1,14,15,-1,-1,16,25,7,-1,-1,20,21,-1],[-1,87,86,-1,-1,86,16,15,87,-1,19,24,23,22,119,20,17,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,86,-1,-1,-1,87,14,25,15,87,86,20,22,24,23,25,119,-1,17,118,20,22,19,-1,-1,-1,116,20,119,-1,-1,-1,-1,-1,-1],
    [-1,6,78,79,39,18,25,24,22,7,38,39,20,25,21,-1,-1,-1,38,7,-1,-1,-1,-1,-1],[14,7,-1,-1,21,20,15,-1,-1,14,22,119,-1,118,16,15],[14,7,-1,-1,21,20,15,-1,-1,14,22,119,-1,118,16,15],[-1,18,72,73,-1,-1,20,23,19,-1,-1,-1,20,25,-1,-1,-1,14,24,-1,-1,-1,16,21,-1],
    [-1,14,15,-1,-1,-1,17,25,19,-1,-1,-1,20,22,-1,-1,-1,14,24,-1,-1,-1,16,21,-1],
    [-1,25,19,-1,-1,18,22,-1,-1,23,24,-1,-1,20,21,-1],
    [-1,-1,25,-1,-1,-1,-1,-1,14,-1,-1,-1,-1,-1,16,19,-1,-1,-1,-1,18,22,-1,-1,-1,-1,23,24,-1,-1,-1,-1,20,21,-1,-1],
    [14,-1,-1,16,19,-1,-1,20,-1],
    [-1,-1,-1,-1,-1,18,19,18,25,15,16,22,24,14,17,-1,16,23,21,-1,-1,-1,-1,-1,-1],[18,19,18,21,20,22,24,-1,-1,20,23,21,-1,-1,-1,-1],[-1,14,-1,-1,-1,16,15,-1,-1,14,64,-1,-1,16,17,-1],
    [20,19,-1,-1,35,22,36,37,20,25,21,-1,-1,21,-1,-1],
    [-1,18,19,-1,6,25,22,-1,14,20,38,39,15,-1,-1,-1],
    [18,104,19,20,23,21,-1,-1,-1],[14,9,16,17],[14,15,16,17],[-1,14,15,18,23,17,20,17,-1],[18,19,20,21],[18,19,-1,20,25,19,-1,20,21],[18,19,-1,-1,23,25,19,-1,18,23,21,-1,20,21,-1,-1],[14,19,-1,-1,23,25,15,-1,14,23,21,-1,20,21,-1,-1],[-1,18,19,-1,18,23,25,19,106,30,30,107,-1,106,107,-1]
    ];
    var ships=[	[1,64,2,72,46,47,40,-1,-1],[-1,-1,-1,-1,-1,-1,65,30,128,-1,66,160,104,104,34,-1,66,106,107,-1,-1,-1,-1,-1,-1],[8,36,77,35,66,34,-1,-1,-1],[78,8,-1,66,34,73,40,1,81],[5,104,73,35,66,34,-1,-1,-1],[-1,9,-1,31,32,47,-1,40,-1],[-1,-1,-1,-1,12,71,10,83,44,103,42,13,-1,-1,-1,-1],[12,104,5,-1,66,99,67,34,-1,106,41,73,-1,-1,-1,-1],[-1,106,3,81,-1,69,66,132,-1,-1,-1,42,64,34,-1,-1,104,132,-1,-1,-1,106,3,77,-1],[129,128,33,-1,66,130,-1,-1,-1],
    [12,9,131,71,71,-1,35,1,41,104,105,73,-1,31,131,73,40,77,-1,109,103,1,47,73,-1,-1,-1,108,-1,-1,-1,-1,-1,-1,-1,-1],
    [66,34,-1,-1],//default player ship? 
    [70,12,12,104,2,5,102,40,40],[10,33,13,101,32,65,65,75,32,72,72,107,66,40,104,105],[12,41,44,130],[10,11,-1,-1,-1,74,75,-1,-1,42,43,12,-1,13,106,107,-1,-1,-1,1,129,-1,129,-1,-1,-1,-1,-1,-1,74,32,75,-1,-1,-1,-1,128,32,65,109,65,73,-1,-1,-1,-1,-1,106,32,107,-1,-1,-1,-1,-1,1,129,-1,129,-1,-1,-1,-1,74,75,44,-1,45,10,11,-1,-1,106,107,-1,-1,-1,42,43,-1,-1],
    [10,35,2,76,36,37,42,35,128],
    [12,8,105,44,41,101,45,104,73],
    [70,71,71,72,77,13,102,103,103],[74,8,9,72,104,107,130,44,13],[74,75,10,35,5,101,106,107,42],[10,9,42,43],[70,72,73,32,65,34,102,130,-1],[-1,70,72,70,-1,74,107,96,106,75,68,104,104,104,128,106,75,96,74,107,-1,102,72,102,-1],[10,75,-1,106,70,71,-1,40,103],[-1,-1,-1,-1,-1,74,72,41,72,11,5,73,3,73,5,106,72,41,72,43,-1,-1,-1,-1,-1],[70,71,73,-1,104,70,71,11,104,102,103,105,102,103,73,-1],[69,74,73,35,36,37,69,42,73],[74,5,32,105],[74,75,-1,-1,104,104,34,-1,102,102,103,73,2,2,2,130],[-1,71,70,7,10,33,128,39,106,33,128,7,-1,103,102,39],[70,73,5,71,-1,10,72,3,70,75,35,35,35,104,37,42,72,3,102,107,102,73,5,103,-1],[74,75,71,9,-1,-1,106,107,65,65,65,8,-1,129,96,99,96,73,-1,74,75,72,41,40,-1,106,107,104,10,11,32,104,105,103,42,43],[-1,131,71,71,35,41,104,105,40,131,103,103,-1,73,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,70,70,70,70,70,-1,32,160,64,104,41,5,37,-1,102,102,102,102,102,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[74,70,11,41,160,33,106,102,43],[8,9,40,41],[70,71,102,103],[74,6,7,106,107,39,32,73,-1],[10,11,9,41,42,43,104,105,8,104,74,75,73,40,106,107],
    [-1,5,5,5,101,35,3,3,4,36,-1,132,35,132,-1,35,3,3,4,36,-1,133,133,5,101],
    [98,128,2,129,65,33,32,3,64],
    [65,65,98,-1,96,65,160,98,160,96,160,1,32,160,33,130],[4,5,5,101,35,99,3,36,-1,-1,133,-1,-1,-1,-1,-1],[4,11,41,71,-1,102,80,32,64,34,106,99,132,73,101,103,42,132,66,160,106,104,41,104,75],[4,-1,-1,-1,35,5,5,37,4,-1,-1,-1,-1,-1,-1,-1],[35,36,37,-1,132,-1,35,36,37],
    [160,160,160,128,64,-1,32,34,-1],[98,-1,64,34],[66,33,-1,130],[-1,-1,-1,33,2,-1,-1,-1,-1,-1,129,-1,-1,-1,66,160,128,129,-1,-1,-1,32,32,32,65,34,-1,-1,66,160,128,129,-1,-1,-1,-1,-1,-1,129,-1,-1,-1,-1,-1,-1,33,2,-1,-1],[69,128,65,33,69,128,65,96,-1,128,65,33,32,64,32,32],
    [96,3,4,-1,99,67,-1,-1,99,100,-1,-1,133,5,5,-1],[-1,-1,98,-1,-1,69,35,36,68,37,-1,100,67,-1,-1,-1,132,132,-1,-1,32,64,68,5,5],[32,65,96,98,32,65,64,128,-1,-1,129,-1,-1,66,34,-1],[66,1,2,32,33,34,-1,130,-1],[-1,3,5,-1,-1,-1,129,-1,-1,-1,35,68,68,36,37,-1,129,-1,-1,-1,-1,3,5,-1,-1],[35,3,131,37],[-1,-1,-1,-1,35,3,131,37,-1,-1,-1,-1,-1,-1,-1,-1],//mechanoids
    [71,78,79,66,80,113,-1,112,34],[80,81,112,113],[82,80,81,-1,114,160,113,83,-1,112,100,115,-1,-1,-1,-1],[113,80,81,-1,116,117,-1,-1,-1],[80,32,64,34,41,132,73,103,42,132,104,66,-1,-1,-1,-1]	
    ];
    var sweet=[
    [
    -1,-1,74,71,-1,-1,-1,80,65,91,93,-1,32,123,90,97,66,34,-1,112,65,91,125,73,-1,-1,106,103,-1,-1,-1,-1,-1,-1,-1,-1
    ]
    ];
    var chainsawDrone=[
    [
    -1,-1,-1,-1,-1,-1,-1,8,9,-1,88,46,102,41,89,-1,-1,40,73,-1,-1,-1,-1,-1,-1
    ]
    ]
    var chainsaw=[
    [88,89,-1,-1]
    ]
    var mechanoids=[
    [
    80,81,-1,112,113,-1,-1,122,-1
    ],
    [71,78,79,66,80,113,-1,112,34],[80,81,112,113],[82,80,81,-1,114,160,113,83,-1,112,100,115,-1,-1,-1,-1],[113,80,81,-1,116,117,-1,-1,-1],[80,32,64,34,41,132,73,103,42,132,104,66,-1,-1,-1,-1]	
    ,
    
   [
  80,
  85,
  -1,
  123,
  2,
  -1,
  112,
  117,
  -1
]
,
[
  80,
  11,
  -1,
  32,
  160,
  121,
  112,
  43,
  -1
],
	[
  80,
  120,
  -1,
  41,
  46,
  41,
  112,
  115,
  -1
],
	[
  80,
  123,
  81,
  32,
  96,
  64,
  -1,
  -1,
  -1
]
    ]
    ;
var allianceGear4=[100, 132, 132, 132, 101, 131, 131, 133, 133, 140, 141, 161, 162, 172, 173, 3, 3, 3, 35, 35, 35, 36, 36, 37, 5, 67, 67, 68, 68, 68, 68, 68, 69, 69, 69, 69, 99, 99];
var mechanoidGear=[103, 11, 112, 113, 114, 115, 116, 117, 120, 121, 122, 123, 132, 160, 2, 32, 34, 41, 42, 43, 46, 64, 66, 71, 73, 78, 79, 80, 81, 82, 83, 85, 96];
    var mechanoidMiniBoss1=[

    [
      74,
        160,
	  123,
	    2,
	      46,
	        68,
		  132,
		    81,
		      46,
		        68,
			  132,
			    81,
			      106,
			        160,
				  123,
				    2
				    ]
    ]
    var droneBoss1=[
    [
    -1,-1,10,11,-1,-1,-1,-1,74,41,41,75,-1,-1,-1,106,70,-1,-1,-1,-1,-1,12,13,13,5,-1,-1,-1,74,70,-1,-1,-1,-1,-1,106,41,41,107,-1,-1,-1,-1,42,43,-1,-1,-1
    ]
    ]
    ;
    var containers=[
    [
    48,48,-1,-1
    ],[-1,-1,-1,48,48,48,-1,-1,-1],[48,48,48,48]
    ]
    ;
    var rebelFaction1 = [
	[32, 30, 75, -1, 46, 101, 32, 30, 107],
	[32, 30, 11, -1, 33, 2, 32, 30, 43],
	[30, 128, 33, 43],
	[1, -1, -1, 32, 41, -1, 1, -1, -1],
	[-1, -1, 71, -1, -1, 74, 30, 41, 30, 115, -1, -1, 129, -1, -1, 106, 30, 41, 30, 115, -1, -1, 103, -1, -1],
	[71, -1, 32, 115],
	[-1, 70, -1, 69, 66, 32, -1, -1, -1]
    ];
    var plants=[
    [
    -1,87,-1,118,120,119,-1,-1,-1
    ]
    ];
    var ancients=[
    [
    -1,-1,32,123,160,123,121,-1,-1,-1,-1,-1,-1,129,71,-1,-1,-1,-1,-1,92,68,129,68,93,-1,-1,-1,-1,68,67,90,67,68,-1,-1,-1,-1,32,90,91,90,5,-1,-1,-1,-1,68,67,90,67,68,-1,-1,-1,-1,124,68,129,68,125,-1,-1,-1,-1,-1,-1,129,103,-1,-1,-1,-1,-1,32,123,160,123,121,-1,-1
    ]
    ]
    ;
    var crystalsArmor=[
[-1, -1, 140, 141, -1, -1, -1, 140, 173, 172, 141, -1, 140, 173, 84, 85, 172, 141, 172, 141, 116, 117, 140, 173, -1, 172, 141, 140, 173, -1, -1, -1, 172, 173, -1, -1],
[169, 85, 116, 173],
[84, 85, 85, -1, 84, 99, 85, -1, 116, 9, 117, -1, 69, 35, 136, -1]
]
    var crystals=[
    [
    -1,-1,84,85,-1,-1,-1,92,117,-1,-1,92,125,117,-1,-1,116,93,85,-1,-1,-1,124,117,-1
    ],
    [84, 85, 137, 167],
    [
  84,
  85,
  137,
  117
],
	[
  84,
  85,
  -1,
  137,
  117,
  -1,
  169,
  136,
  2
],
	[
  169,
  135,
  116,
  117
],
	[
  134,
  85,
  166,
  117
],
	[
  134,
  85,
  137,
  5
],
	[
  84,
  168,
  83,
  -1,
  132,
  -1,
  116,
  136,
  -1
]
    ]
    var alliance2=[
[
  134,
  -1,
  -1,
  137,
  67,
  37,
  -1,
  133,
  -1
],
	[
  -1,
  9,
  35,
  136
],
	[
  -1,
  -1,
  -1,
  -1,
  -1,
  169,
  160,
  168,
  135,
  5,
  42,
  96,
  43,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
],
	[
  132,
  168,
  -1,
  3,
  131,
  -1,
  132,
  136,
  -1
],
	[
  -1,
  134,
  -1,
  67,
  131,
  37,
  -1,
  166,
  -1
],
	[
  134,
  135,
  166,
  4
]
    ];
    var smugglerBoss1=[
    [
    -1,160,160,160,160,-1,-1,-1,-1,129,-1,-1,-1,-1,-1,74,65,65,75,-1,-1,-1,65,128,128,65,-1,-1,-1,106,65,65,107,-1,-1,-1,-1,-1,129,-1,-1,-1,-1,160,160,160,160,-1,-1
    ]
    ]
    ;
    var smugglers=[
    [
    129,160,-1,-1,-1,33,128,34,129,160,-1,-1,-1,-1,-1,-1
    ]
    ]
    ;
    var activeGear=[4,8,31,76,82,97,98,100,111,113,114]

    var banditGear=[1,2,3,13,30,31,32,33,34,40,41,46,47,64,65,66,76,77,96,97,98,115,128,129,130,160]
    var bandits = [[1,2,66,34],[-1,1,2,33,97,34,32,64,-1],[-1,33,46,1,31,30,160,33,-1,33,46,1,-1,-1,-1,-1],[-1,-1,-1,129,160,33,-1,-1,-1],[-1,66,77,129,41,47,-1,66,77],[-1,98,-1,1,160,115,32,40,-1],[-1,98,-1,1,128,115,32,40,-1],[1,128,-1,32,64,34,129,65,130],[-1,-1,-1,-1,-1,1,-1,-1,32,64,128,34,-1,-1,-1,-1],[31,30,41,47,-1,-1,129,-1,66,46,128,34,-1,-1,-1,-1],[  -1,-1,-1,-1,66,65,33,34,-1,31,47,-1,-1,-1,-1,-1
    ]
    ];
    var banditGear2 =[129, 1, 97, 65, 65, 138, 139, 129, 1, 121, 31, 32, 32, 32, 88, 160, 142, 142, 140, 98, 141, 161, 162, 172, 173, 143, 175, 175, 115, 115, 89, 74, 160, 45, 130, 130, 130, 2, 2, 2, 34, 96, 96, 163, 163, 120, 71, 103, 128, 128, 33, 33, 33, 66, 66, 66, 34, 34, 47, 109, 174, 174, 174, 143, 129, 170, 171, 64, 108];
    var banditBoss1 = [	[31,30,41,47,-1,-1,-1,-1,129,7,-1,-1,1,128,65,160,115,-1,66,128,65,33,115,-1,-1,-1,129,39,-1,-1,31,30,41,47,-1,-1]];

    var droneGear=[2,8,9,10,11,32,40,41,42,43,46,64,69,72,73,74,75,76,82,83,96,97,104,105,106,107,108,109,129]
    var drones=[[9,8,73,66,32,41,106,108,107],[-1,9,-1,69,41,73,-1,-1,-1],[10,96,2,129,-1,109,40,-1,-1],[10,11,-1,129,46,-1,42,43,-1],[10,9,11,129,64,73,42,96,43],[11,-1,74,83,129,46,64,-1,43,-1,106,73,-1,-1,-1,-1],[32,46,41,73,129,-1,40,-1,129,-1,-1,-1,32,46,41,73],[-1,129,-1,-1,69,41,73,-1,69,41,73,-1,-1,129,-1,-1]	
    ];

    var zombies=[
    [
    -1,-1,-1,-1,-1,6,80,114,114,115,38,160,160,160,115,-1,38,133,101,39,-1,-1,-1,-1,-1
    ],[
    -1,78,79,66,96,115,31,32,111
    ],[
    6,81,-1,112,85,-1,38,117,-1
    ],[
    -1,10,1,98,-1,-1,6,118,128,65,119,-1,38,7,66,34,-1,-1,-1,39,128,65,-1,-1,-1,42,1,33,7,-1,-1,-1,-1,-1,39,-1
    ],[
    -1,6,7,6,41,37,38,39,-1
    ],[
    6,-1,7,98,38,32,129,72,-1,38,39,-1,-1,-1,-1,-1
    ],[
    -1,-1,-1,-1,-1,74,75,-1,10,11,6,78,46,33,39,38,79,-1,42,43,-1,-1,-1,-1,-1
    ],[
    -1,-1,-1,7,-1,6,4,3,37,-1,-1,38,7,39,-1,-1,35,36,7,-1,-1,-1,-1,39,-1
    ],[
    6,12,13,38,44,39,-1,-1,-1
    ],[
    -1,-1,10,11,-1,-1,-1,129,35,11,-1,-1,-1,4,65,75,47,-1,-1,4,106,107,73,-1,-1,129,72,75,-1,-1,-1,-1,106,115,-1,-1
    ]
    ]

    var drones2 = [
    [
    -1,70,-1,-1,131,-1,-1,70,-1
    ],[
    71,-1,-1,104,82,73,103,-1,-1
    ],[
    72,-1,133,-1
    ],[
    -1,9,-1,31,46,2,-1,-1,-1
    ],[
    -1,-1,-1,-1,-1,74,75,-1,10,11,70,102,46,70,102,106,107,-1,42,43,-1,-1,-1,-1,-1
    ],[
    102,10,46,47,31,104,103,73,102,-1,-1,-1,103,-1,-1,-1
    ],[
    74,75,70,73
    ],[
    8,-1,-1,-1,9,71,-1,-1,41,46,47,-1,40,103,-1,-1
    ]
    ]
    var banditsMedium = [	[-1,-1,-1,-1,-1,46,32,1,-1,-1,-1,-1,128,114,33,46,32,1,-1,-1,-1,-1,-1,-1,-1],[  -1,128,46,75,69,33,32,65,-1,128,46,107,-1,-1,-1,-1],[  32,160,75,-1,133,-1,-1,-1,-1
    ],[
    -1,71,-1,-1,66,65,47,34,-1,102,130,-1,-1,-1,-1,-1
    ],[
    -1,-1,-1,-1,31,66,34,75,32,41,105,107,-1,-1,-1,-1
    ],[
    46,46,41,-1,66,65,33,34,46,40,-1,-1,-1,-1,-1,-1
    ]
    ]
    var godawfulBoss=[
    [
    69,2,32,-1,-1,80,81,41,85,-1,110,66,160,65,-1,112,81,41,117,-1,69,2,32,-1,-1
    ]
    ]
    var cops=[	[-1,-1,133,3,68,5,-1,-1,69,132,68,43,-1,-1,69,35,3,36,46,46,67,-1,69,4,5,5,5,85,69,35,3,36,46,46,67,-1,69,132,68,11,-1,-1,-1,-1,133,3,68,5,-1]
    ];

    var allianceGear=[10,100,101,102,103,104,105,106,107,12,13,131,132,133,3,35,36,37,4,41,43,45,46,5,67,68,69,70,71,72,73,74,75,8,82,84,99];



    var alliance=[	[  35,131,-1,99,37,-1,35,131,-1],[  -1,4,5,69,68,37,-1,-1,-1],[  -1,74,75,-1,-1,-1,-1,132,132,101,-1,-1,-1,3,3,133,-1,-1,-1,36,99,133,-1,-1,-1,132,132,101,-1,-1,-1,106,107,-1,-1,-1],[  -1,71,-1,12,72,37,45,103,-1],[  -1,-1,8,-1,-1,10,104,5,35,72,46,43,-1,-1,-1,-1],[  -1,70,-1,-1,35,13,46,41,-1,102,-1,-1,-1,-1,-1,-1],[  -1,102,-1,73,100,37,-1,103,-1],[  84,75,36,37],[  -1,69,74,75,-1,-1,69,68,3,3,68,-1,74,36,99,132,36,75,106,36,99,132,36,107,69,68,3,3,68,-1,-1,69,106,107,-1,-1],[  35,36,37,69,67,101,-1,-1,-1],[  132,36,82,133],[  35,4,-1,-1,-1,132,3,37,35,4,-1,-1,-1,-1,-1,-1],[  -1,-1,-1,-1,-1,-1,74,67,75,-1,35,3,99,3,5,-1,106,105,107,-1,-1,-1,-1,-1,-1 ],[
    -1,74,75,-1,-1,-1,104,13,-1,-1,69,67,36,37,-1,-1,104,13,-1,-1,-1,106,107,-1,-1
    ],[
    10,104,101,69,100,37,106,104,131
    ],[
    -1,70,-1,-1,-1,66,128,104,11,-1,69,67,36,34,-1,31,72,68,107,-1,40,102,-1,-1,-1
    ]
];
		var allianceWeak=[
[140, 141, -1, 36, 73, -1, 172, 173, -1],
[-1, 9, -1, -1, -1, -1, 144, 145, -1, -1, -1, 35, 160, 96, -1, -1, 176, 177, -1, -1, -1, 73, -1, -1, -1],
[74, 141, 106, 173],
[67, 36, 133, -1],
[-1, 138, 139, -1, 69, 68, 68, 111, -1, 170, 171, -1, -1, -1, -1, -1],
[-1, -1, 138, 139, -1, -1, 140, 162, 162, -1, -1, 132, 99, 67, -1, -1, 172, 161, 161, -1, -1, -1, 170, 171, -1],
[144, 145, 170, 171],
[142,143,174,175]
];
