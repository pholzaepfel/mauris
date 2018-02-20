	var rm = {};
	rm.id = 666;
	rm.next = [666];
	rm.name = 'questname';
	rm.complete = false;
	rm.hazeRed = 0.6;
	rm.hazeWhite = 1.4;
	rm.hazePurple = 0.6;
		rm.hazeRedSpeed = 30;
	rm.hazeWhiteSpeed = 10;
	rm.hazePurpleSpeed = 85;
	rm.distanceMin = 12000;
	rm.distanceMax = 12000;
	rm.hazePurpleBlendMode = 2;
	rm.hazeRedBlendMode = 0;
	rm.intro = [];
	rm.outro = [];
	rm.win = {
		'condition':'frob'
	};
	rm.enemies = [];
	
	var asteroidDensity = parseInt(randomRange(10,50));
	
	if(asteroidDensity < 20){
	rm.intro.push('asteroid density: light');
	}else if(asteroidDensity < 35){
	rm.intro.push('asteroid density: moderate');
	}else {
	rm.intro.push('asteroid density: high');
	}
	rm.enemies.push(
{
	'ships':'asteroids',
	'respawn':true,
	'count':asteroidDensity,
	'missionTarget':false
}
	)
