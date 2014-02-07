var xbound = 16;
var ybound = 24;
var s = '';

for(var x=0;x<xbound/8;x++){
	for(var y=0;y<ybound/8;y++){
		s+='{"filename": "'+x+'-'+y+'","frame": {"x":'+(x*8)+',"y":'+(y*8)+',"w":8,"h":8},"rotated": false,"trimmed": false,"spriteSourceSize": {"x":'+(x*8)+',"y":'+(y*8)+',"w":8,"h":8},"sourceSize": {"w":8,"h":8}},'
	}
}

document.write('{"frames": [' + s.substr(0,s.length-1) + ']}');
