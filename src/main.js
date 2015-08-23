var PIXI = require('pixi.js');
var kd = require('keydrown');
var World = require('./world');

import * as CoordinatesMapper from './CoordinatesMapper';

import {GameLoop} from './gameloop';
import {Network, NetworkListener} from './network';

const loop = new GameLoop();
const network = new Network();
const networkListener = new NetworkListener(network);

var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

document.getElementById("canvas-container").appendChild(renderer.view);

var stage = new PIXI.Stage(0xFFFFFF);

var levels = {
	0: require('../levels/level.json')
};

var keypressed = false;

var activeWorld = null;
loadWorld();
var activeEntity = null;

function loadWorld () {
	// setting up the CoordinatesMapper
	var playField = levels[0].playingField;
	CoordinatesMapper.init(playField.width, playField.height, renderer);

	var world = new World(levels[0]);
	networkListener.world = world;
	activeWorld = world;
	stage.addChild(world.scene);
}

network.init();
networkListener.listen();

loop.register(update);
loop.register(()=> {
	renderer.render(stage);
});
loop.start();


function update (dt) {
	kd.tick();

	if (keypressed) {
		//TODO do things
	}

	// updating the world.
	activeWorld.update(dt);
}

kd.A.down(() => {
	if (activeEntity) {
		if (canMove(activeEntity.modelx, activeEntity.modely - 1)) {
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

