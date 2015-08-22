var PIXI = require('pixi.js');
var kd = require('keydrown');
var World = require('./world');

var canvasHeight = document.body.clientHeight;
var canvasWidth = document.body.clientWidth;
var renderer = new PIXI.CanvasRenderer(canvasWidth, canvasHeight);

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage();

var levels = {
	0: require('../levels/level.json')
};

var wintext = new PIXI.Text("Test change", {
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
				//TODO alter model coordinate depending on direction
				var newCoords = toCanvasCoordinates(monster.modelx, monster.modely);
				monster.x = newCoords[0];
				monster.y = newCoords[1];
				monster.init();
			});
		}

		if(activeWorld.walls) {
			activeWorld.walls.forEach((wall) => {
				var newCoords = toCanvasCoordinates(wall.modelx, wall.modely);
				wall.x = newCoords[0];
				wall.y = newCoords[1];
				wall.init();
			});
		}
	}

	renderer.render(stage);	
	
	requestAnimationFrame(animate);
}

function toModelCoordinates(x, y) {
	return [x / canvasWidth * activeWorld.modelWidth,
			y / canvasHeight * activeWorld.modelHeight];
}

function toCanvasCoordinates(x, y) {
	return [x / activeWorld.modelWidth * canvasWidth,
			y / activeWorld.modelHeight * canvasHeight];
}

kd.Q.down(() => {
	keypressed = true;
});

kd.W.down(() => {
	keypressed = false;
});
