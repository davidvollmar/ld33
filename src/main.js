var PIXI = require('pixi.js');
var kd = require('keydrown');
var World = require('./world');

var height = document.body.clientHeight;
var width = document.body.clientWidth;
var renderer = new PIXI.CanvasRenderer(width, height);

//var renderer = new PIXI.autoDetectRenderer(800, 600);
var scale = Math.min(width / 800, height / 600);
//scale = 1;

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage();

var levels = {
	0: require('../levels/level.json')
};

var wintext = new PIXI.Text("Hello World", {
					font: "100px Arial",
					fill: 'white'
				});
var keypressed = false;

var activeWorld = null;
loadWorld();

requestAnimationFrame(animate);

function loadWorld() {
	var world = new World(levels[0]);
	activeWorld = world;
	stage.addChild(world.scene);
}

function animate() {
	kd.tick();
	
	if(keypressed) {		
		stage.addChild(wintext);
	} else {
		stage.removeChild(wintext);		
	}
	
	if (activeWorld) {	
		if(activeWorld.monsters) {
			activeWorld.monsters.forEach((monster) => {
				monster.rotation += 0.1;
				monster.init();
			});
		}

		if(activeWorld.walls) {
			activeWorld.walls.forEach((wall) => {
				wall.rotation += 0.1;
				wall.init();
			});
		}
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
