var PIXI = require('pixi.js');
var kd = require('keydrown');
var World = require('./world');
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
	
	// updating the world.
	activeWorld.update();
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

