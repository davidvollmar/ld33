var PIXI = require('pixi.js');
var World = require('./world');

import * as CoordinatesMapper from './CoordinatesMapper';

import {GameLoop} from './gameloop';
import {Network, NetworkListener} from './network';
import {Input} from './input';
import {Player} from './player';

const loop = new GameLoop();
const network = new Network();
const networkListener = new NetworkListener(network);
const player = new Player();
const input = new Input(player);

var renderer = new PIXI.autoDetectRecommendedRenderer(window.innerWidth, window.innerHeight);

document.getElementById("canvas-container").appendChild(renderer.view);

var stage = new PIXI.Stage(0xFFFFFF);

var levels = {
	0: require('../levels/level.json')
};

var activeWorld = null;
loadWorld();

player.addEntity(activeWorld.pacman);
player.activeEntityId = 0;

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

// counter for the fixed update
var fixedUpdateTimer = 0;

loop.register(update);
loop.register(input.tick);
loop.register(()=> {
	renderer.render(stage);
});
loop.registerFixed(()=>{
	activeWorld.fixedUpdate();
});

loop.start();
input.listen();


function update (dt) {
	// updating the world.
	activeWorld.update(dt);
}
