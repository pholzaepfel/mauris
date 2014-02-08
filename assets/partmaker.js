var xbound = 96;
var ybound = 80;
var xsize = 16;
var ysize = 16;
var s = '';

for(var x=0;x<xbound/xsize;x++){
	for(var y=0;y<ybound/ysize;y++){
		s+='{"filename": "'+x+'-'+y+'","frame": {"x":'+(x*xsize)+',"y":'+(y*ysize)+',"w":'+xsize+',"h":'+ysize+'},"rotated": false,"trimmed": false,"spriteSourceSize": {"x":'+(x*xsize)+',"y":'+(y*ysize)+',"w":'+xsize+',"h":'+ysize+'},"sourceSize": {"w":'+xsize+',"h":'+ysize+'}},'
	}
}

document.write('{"frames": [' + s.substr(0,s.length-1) + ']}');
