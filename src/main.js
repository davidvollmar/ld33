var PIXI = require('pixi.js');
var kd = require('keydrown');

var height = document.body.clientHeight;
var width = document.body.clientWidth;
var renderer = new PIXI.CanvasRenderer(width, height);

//var renderer = new PIXI.autoDetectRenderer(800, 600);
var scale = Math.min(width / 800, height / 600);
//scale = 1;

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage;
var wintext = new PIXI.Text("Hello World", {
					font: "100px Arial",
					fill: 'white',
				});	;
var keypressed = false;
requestAnimationFrame(animate);

function animate() {
	kd.tick();
	
	if(keypressed) {		
		stage.addChild(wintext);
	} else {
		stage.removeChild(wintext);		
	}
	
	renderer.render(stage);	
	
	requestAnimationFrame(animate);
}

kd.Q.down(() => {
	keypressed = true;	
});

kd.W.down(() => {
	keypressed = false;	
});