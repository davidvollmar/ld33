var PIXI = require('pixi.js');
var kd = require('keydrown');
var World = require('./world');
var io = require('socket.io-client');
import * as CoordinatesMapper from './CoordinatesMapper';

var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

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
	// setting up the CoordinatesMapper
	var playField = levels[0].playingField;
	CoordinatesMapper.init(playField.width, playField.height, renderer);
	
	var world = new World(levels[0]);
	activeWorld = world;
	stage.addChild(world.scene);
}

var t0 = Date.now();

function frame() {
    var now = Date.now();
    var dT = now - t0;
    t0 = now;
    //console.log(dT);

    network();
	// game loop
	update();
	renderer.render(stage);
	requestAnimationFrame(frame);
}
var socket = io('http://localhost:5000');
socket.on('connect', function(){});
socket.on('chat message', function(data){console.log(data);});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

function network(){
    if(keypressed){
        socket.emit('chat message','key pressed');
    }
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
					var newCoords = CoordinatesMapper.toCanvasCoordinates(monster.modelx - 1, monster.modely);
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
				monster.update(1);
			});
		}

		//TODO similarly, make movement depend on keys
		if(activeWorld.pacman) {
			activeWorld.pacman.x = activeWorld.pacman.x + 1;

            var modelCoordinates = CoordinatesMapper.toModelCoordinates(activeWorld.pacman.x, activeWorld.pacman.y);
            activeWorld.pacman.modelx = modelCoordinates[0];
            activeWorld.pacman.modely = modelCoordinates[1];

            if(activeWorld.pacman.x > 500) {
				activeWorld.pacman.x = 0;
			}
			if(activeWorld.pacman.y > 500) {
				activeWorld.pacman.y = 0;
			}
			activeWorld.pacman.update(3);
		}
	}
}

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

function canMove(newModelx, newModely) {
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
