var PIXI = require('pixi.js');
var kd = require('keydrown');
var World = require('./world');

//var canvasHeight = document.body.clientHeight; //this does not work in chrome apparently
var canvasHeight = 900;
//var canvasWidth = document.body.clientWidth;*/
var canvasWidth = 900;
var renderer = new PIXI.CanvasRenderer(canvasWidth, canvasHeight);

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage(0xFFFFFF);

var levels = {
	0: require('../levels/level.json')
};

var keypressed = false;

var activeWorld = null;
loadWorld();
var activeEntity = null;

requestAnimationFrame(frame);

function loadWorld() {
	var world = new World(levels[0]);
	activeWorld = world;
	stage.addChild(world.scene);
}

function frame() {
	// game loop
	update();
	renderer.render(stage);
	requestAnimationFrame(frame);
}

function update() {
	kd.tick();

	if(keypressed) {
		//TODO do things
	}
	
	if (activeWorld) {	
		if(activeWorld.monsters) {
			activeWorld.monsters.forEach((monster) => {
				//TODO alter model coordinate depending on direction
				if(false) {//TODO if keypress or monster moved to another cell, update model
					var newCoords = toCanvasCoordinates(monster.modelx - 1, monster.modely);
					monster.x = newCoords[0];
					monster.y = newCoords[1];
				} else {
					//TODO make depend on what key is pressed etc.
					monster.x = monster.x - 1;
					monster.y = monster.y - 1;
					if(monster.x < 0) {
						monster.x = 500;
					}
					if(monster.y < 0) {
						monster.y = 500;
					}
				}
			});
		}

		//TODO similarly, make movement depend on keys
		if(activeWorld.pacman) {
			activeWorld.pacman.x = activeWorld.pacman.x + 1;
			activeWorld.pacman.y = activeWorld.pacman.y + 1;
			if(activeWorld.pacman.x > 500) {
				activeWorld.pacman.x = 0;
			}
			if(activeWorld.pacman.y > 500) {
				activeWorld.pacman.y = 0;
			}
		}
	}
}

var toModelCoordinates = function toModelCoordinates(x, y) {
	return [x / canvasWidth * activeWorld.modelWidth,
			y / canvasHeight * activeWorld.modelHeight];
};

var toCanvasCoordinates = function toCanvasCoordinates(x, y) {
	return [x / activeWorld.modelWidth * canvasWidth,
			y / activeWorld.modelHeight * canvasHeight];
};

kd.A.down(() => {
	if(activeEntity) {
		if(canMove(activeEntity.modelx, activeEntity.modely-1)) {
			activeEntity.modely--;
		}//0,0 is topleft
	}
	keypressed = true;
});

kd.S.down(() => {
	keypressed = true;
});

kd.D.down(() => {
	keypressed = true;
});

kd.W.down(() => {
	keypressed = false;
});

function tryToMove(newModelx, newModely) {
	var canMove = true;

	if(activeWorld.playingField) {
		if(activeWorld[newModelx][newModely].cellType == CellType.WALL) {
			canMove = false;
		}
	}

	if(activeWorld.monsters) {
		activeWorld.monsters.forEach((monster) => {

			if(monster != activeEntity) {
				if(monster.modelx == newModelx && monster.modely == newModely) {
					canMove = false;
					if(activeEntity instanceof Pacman) {
						//TODO pacman dies
					}
				}
			}
		});
	}


	return canMove;
}
