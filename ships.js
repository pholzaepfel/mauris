//prefabricated ships and asteroids to populate the playfield
var asteroids=[
[6, -1, -1, -1, -1, 14, 19, 29, -1, -1, 16, 25, 7, -1, -1, -1, 20, 24, 86, -1, -1, -1, 39, 21, -1],
	[6, 7, -1, -1, 14, 15, -1, -1, 16, 25, 7, -1, -1, 20, 21, -1],
	[-1, 87, 86, -1, -1, 86, 16, 15, 87, -1, 19, 24, 23, 22, 119, 20, 17, -1, -1, -1, -1, -1, -1, -1, -1],
	[-1, -1, 86, -1, -1, -1, 87, 14, 25, 15, 87, 86, 20, 22, 24, 23, 25, 119, -1, 17, 118, 20, 22, 19, -1, -1, -1, 116, 20, 119, -1, -1, -1, -1, -1, -1],		
	[-1, 6, 78, 79, 39, 18, 25, 24, 22, 7, 38, 39, 20, 25, 21, -1, -1, -1, 38, 7, -1, -1, -1, -1, -1],
	[14, 7, -1, -1, 21, 20, 15, -1, -1, 14, 22, 119, -1, 118, 16, 15],
	[14, 7, -1, -1, 21, 20, 15, -1, -1, 14, 22, 119, -1, 118, 16, 15],
	[-1,18,72,73,-1,-1,20,23,19,-1,-1,-1,20,25,-1,-1,-1,14,24,-1,-1,-1,16,21,-1], 	
	[-1,14,15,-1,-1,-1,17,25,19,-1,-1,-1,20,22,-1,-1,-1,14,24,-1,-1,-1,16,21,-1], 	
	[-1,25,19,-1,-1,18,22,-1,-1,23,24,-1,-1,20,21,-1], 	
	[-1,-1,25,-1,-1,-1,-1,-1,14,-1,-1,-1,-1,-1,16,19,-1,-1,-1,-1,18,22,-1,-1,-1,-1,23,24,-1,-1,-1,-1,20,21,-1,-1], 	
	[14,-1,-1,16,19,-1,-1,20,-1], 	
	[-1, -1, -1, -1, -1, 18, 19, 18, 25, 15, 16, 22, 24, 14, 17, -1, 16, 23, 21, -1, -1, -1, -1, -1, -1],
[18, 19, 18, 21, 20, 22, 24, -1, -1, 20, 23, 21, -1, -1, -1, -1],
[-1,14,-1,-1,-1,16,15,-1,-1,14,64,-1,-1,16,17,-1], 
	[20,19,-1,-1,35,22,36,37,20,25,21,-1,-1,21,-1,-1], 
	[-1,18,19,-1,6,25,22,-1,14,20,38,39,15,-1,-1,-1], 
	[18, 104, 19, 20, 23, 21, -1, -1, -1],
	[14, 9, 16, 17],
	[14, 15, 16, 17],
	[-1, 14, 15, 18, 23, 17, 20, 17, -1],
	[18, 19, 20, 21],
	[18, 19, -1, 20, 25, 19, -1, 20, 21],
	[18, 19, -1, -1, 23, 25, 19, -1, 18, 23, 21, -1, 20, 21, -1, -1],
	[14, 19, -1, -1, 23, 25, 15, -1, 14, 23, 21, -1, 20, 21, -1, -1],
	[-1, 18, 19, -1, 18, 23, 25, 19, 106, 30, 30, 107, -1, 106, 107, -1]
	];
	var ships=[
	[1, 64, 2, 72, 46, 47, 40, -1, -1],
	[-1, -1, -1, -1, -1, -1, 65, 30, 128, -1, 66, 160, 104, 104, 34, -1, 66, 106, 107, -1, -1, -1, -1, -1, -1],
	[8, 36, 77, 35, 66, 34, -1, -1, -1],
	[78, 8, -1, 66, 34, 73, 40, 1, 81],
	[5, 104, 73, 35, 66, 34, -1, -1, -1],
	[-1, 9, -1, 31, 32, 47, -1, 40, -1],
	[-1, -1, -1, -1, 12, 71, 10, 83, 44, 103, 42, 13, -1, -1, -1, -1],
	[12, 104, 5, -1, 66, 99, 67, 34, -1, 106, 41, 73, -1, -1, -1, -1],
	[-1, 106, 3, 81, -1, 69, 66, 132, -1, -1, -1, 42, 64, 34, -1, -1, 104, 132, -1, -1, -1, 106, 3, 77, -1],
	[129,128,33,-1,66,130,-1,-1,-1], 
	[12,9,131,71,71,-1,35,1,41,104,105,73,-1,31,131,73,40,77,-1,109,103,1,47,73,-1,-1,-1,108,-1,-1,-1,-1,-1,-1,-1,-1],  
	[66, 34, -1, -1], //default player ship? 
	[70, 12, 12, 104, 2, 5, 102, 40, 40],
	[10, 33, 13, 101, 32, 65, 65, 75, 32, 72, 72, 107, 66, 40, 104, 105],
	[12, 41, 44, 130],
	[10, 11, -1, -1, -1, 74, 75, -1, -1, 42, 43, 12, -1, 13, 106, 107, -1, -1, -1, 1, 129, -1, 129, -1, -1, -1, -1, -1, -1, 74, 32, 75, -1, -1, -1, -1, 128, 32, 65, 109, 65, 73, -1, -1, -1, -1, -1, 106, 32, 107, -1, -1, -1, -1, -1, 1, 129, -1, 129, -1, -1, -1, -1, 74, 75, 44, -1, 45, 10, 11, -1, -1, 106, 107, -1, -1, -1, 42, 43, -1, -1],	
	[10, 35, 2, 76, 36, 37, 42, 35, 128],	
	[12, 8, 105, 44, 41, 101, 45, 104, 73],	
	[70, 71, 71, 72, 77, 13, 102, 103, 103],
	[74, 8, 9, 72, 104, 107, 130, 44, 13],
	[74, 75, 10, 35, 5, 101, 106, 107, 42],
	[10, 9, 42, 43],
	[70, 72, 73, 32, 65, 34, 102, 130, -1],
	[-1, 70, 72, 70, -1, 74, 107, 96, 106, 75, 68, 104, 104, 104, 128, 106, 75, 96, 74, 107, -1, 102, 72, 102, -1],
	[10, 75, -1, 106, 70, 71, -1, 40, 103],
	[-1, -1, -1, -1, -1, 74, 72, 41, 72, 11, 5, 73, 3, 73, 5, 106, 72, 41, 72, 43, -1, -1, -1, -1, -1],
	[70, 71, 73, -1, 104, 70, 71, 11, 104, 102, 103, 105, 102, 103, 73, -1],
	[69, 74, 73, 35, 36, 37, 69, 42, 73],
	[74, 5, 32, 105],
	[74, 75, -1, -1, 104, 104, 34, -1, 102, 102, 103, 73, 2, 2, 2, 130],
	[-1, 71, 70, 7, 10, 33, 128, 39, 106, 33, 128, 7, -1, 103, 102, 39],
	[70, 73, 5, 71, -1, 10, 72, 3, 70, 75, 35, 35, 35, 104, 37, 42, 72, 3, 102, 107, 102, 73, 5, 103, -1],
	[74, 75, 71, 9, -1, -1, 106, 107, 65, 65, 65, 8, -1, 129, 96, 99, 96, 73, -1, 74, 75, 72, 41, 40, -1, 106, 107, 104, 10, 11, 32, 104, 105, 103, 42, 43],
	[-1, 131, 71, 71, 35, 41, 104, 105, 40, 131, 103, 103, -1, 73, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1,-1, 70, 70, 70, 70, 70, -1, 32, 160, 64, 104, 41, 5, 37, -1, 102, 102, 102, 102, 102,   -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
	[74, 70, 11, 41, 160, 33, 106, 102, 43],
	[8, 9, 40, 41],
	[70, 71, 102, 103],
	[74, 6, 7, 106, 107, 39, 32, 73, -1],
	[10, 11, 9, 41, 42, 43, 104, 105, 8, 104, 74, 75, 73, 40, 106, 107],	
	[-1, 5, 5, 5, 101, 35, 3, 3, 4, 36, -1, 132, 35, 132, -1, 35, 3, 3, 4, 36, -1, 133, 133, 5, 101],	
	[98, 128, 2, 129, 65, 33, 32, 3, 64],	
	[65, 65, 98, -1, 96, 65, 160, 98, 160, 96, 160, 1, 32, 160, 33, 130],
	[4, 5, 5, 101, 35, 99, 3, 36, -1, -1, 133, -1, -1, -1, -1, -1],

	[4, 11, 41, 71, -1, 102, 80, 32, 64, 34, 106, 99, 132, 73, 101, 103, 42, 132, 66, 160, 106, 104, 41, 104, 75],
	[4, -1, -1, -1, 35, 5, 5, 37, 4, -1, -1, -1, -1, -1, -1, -1],
	[35, 36, 37, -1, 132, -1, 35, 36, 37],	
	[160, 160, 160, 128, 64, -1, 32, 34, -1],
	[98, -1, 64, 34],
	[66, 33, -1, 130],
	[-1, -1, -1, 33, 2, -1, -1, -1, -1, -1, 129, -1, -1, -1, 66, 160, 128, 129, -1, -1, -1, 32, 32, 32, 65, 34, -1, -1, 66, 160, 128, 129, -1, -1, -1, -1, -1, -1, 129, -1, -1, -1, -1, -1, -1, 33, 2, -1, -1],
	[69, 128, 65, 33, 69, 128, 65, 96, -1, 128, 65, 33, 32, 64, 32, 32],		
	[96, 3, 4, -1, 99, 67, -1, -1, 99, 100, -1, -1, 133, 5, 5, -1],
	[-1, -1, 98, -1, -1, 69, 35, 36, 68, 37, -1, 100, 67, -1, -1, -1, 132, 132, -1, -1, 32, 64, 68, 5, 5],
	[32, 65, 96, 98, 32, 65, 64, 128, -1, -1, 129, -1, -1, 66, 34, -1],
	[66, 1, 2, 32, 33, 34, -1, 130, -1],
	[-1, 3, 5, -1, -1, -1, 129, -1, -1, -1, 35, 68, 68, 36, 37, -1, 129, -1, -1, -1, -1, 3, 5, -1, -1],
	[35, 3, 131, 37],
	[-1, -1, -1, -1, 35, 3, 131, 37, -1, -1, -1, -1, -1, -1, -1, -1],
	//mechanoids
	[71, 78, 79, 66, 80, 113, -1, 112, 34],
	[80, 81, 112, 113],
	[82, 80, 81, -1, 114, 160, 113, 83, -1, 112, 100, 115, -1, -1, -1, -1],
	[113, 80, 81, -1, 116, 117, -1, -1, -1],
	[80, 32, 64, 34, 41, 132, 73, 103, 42, 132, 104, 66, -1, -1, -1, -1]	
	];

	var activeGear=[4,8,31,76,82,97,98,100,111,113,114]

	var banditGear=[1,2,3,13,30,31,32,33,34,40,41,46,47,64,65,66,76,77,96,97,98,115,128,129,130,160]
	var bandits = [
[1, 2, 66, 34],
[-1, 1, 2, 33, 97, 34, 32, 64, -1],
	[-1, 33, 46, 1, 31, 30, 160, 33, -1, 33, 46, 1, -1, -1, -1, -1],
	[-1, -1, -1, 129, 160, 33, -1, -1, -1],
	[-1, 66, 77, 129, 41, 47, -1, 66, 77],
	[-1, 98, -1, 1, 160, 115, 32, 40, -1],
	[-1, 98, -1, 1, 128, 115, 32, 40, -1],
	[1, 128, -1, 32, 64, 34, 129, 65, 130],
	[-1, -1, -1, -1, -1, 1, -1, -1, 32, 64, 128, 34, -1, -1, -1, -1],
	[31, 30, 41, 47, -1, -1, 129, -1, 66, 46, 128, 34, -1, -1, -1, -1]
	];
	var banditBoss1 = [
	[31,30,41,47,-1,-1,-1,-1,129,7,-1,-1,1,128,65,160,115,-1,66,128,65,33,115,-1,-1,-1,129,39,-1,-1,31,30,41,47,-1,-1]];

	var droneGear=[2,8,9,10,11,32,40,41,42,43,46,64,69,72,73,74,75,76,82,83,96,97,104,105,106,107,108,109,129]
	var drones=[
[9, 8, 73, 66, 32, 41, 106, 108, 107],
	[-1, 9, -1, 69, 41, 73, -1, -1, -1],
	[10, 96, 2, 129, -1, 109, 40, -1, -1],
	[10, 11, -1, 129, 46, -1, 42, 43, -1],
	[10, 9, 11, 129, 64, 73, 42, 96, 43],
	[11, -1, 74, 83, 129, 46, 64, -1, 43, -1, 106, 73, -1, -1, -1, -1],
	[32, 46, 41, 73, 129, -1, 40, -1, 129, -1, -1, -1, 32, 46, 41, 73],
	[-1, 129, -1, -1, 69, 41, 73, -1, 69, 41, 73, -1, -1, 129, -1, -1]
	];
