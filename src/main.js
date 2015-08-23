var PIXI = require('pixi.js');
var kd = require('keydrown');
var World = require('./world');

import * as CoordinatesMapper from './CoordinatesMapper';
import {LEFT, UP, RIGHT, DOWN} from './Direction';

import {GameLoop} from './gameloop';
import {Network, NetworkListener} from './network';

const loop = new GameLoop();
const network = new Network();
const networkListener = new NetworkListener(network);

var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage(0xFFFFFF);

var levels = {
	0: require('../levels/level.json')
};

var keypressed = false;

var activeWorld = null;
loadWorld();
//TODO dynamic
var activeEntity = activeWorld.pacman;

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
<<<<<<< HEAD
	requestAnimationFrame(frame);
}
var socket = io('http://localhost:5000');
socket.on('connect', function(){});
socket.on('chat message', function(data){console.log(data);});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

function network(){
    if(keypressed){
        //socket.emit('chat message','key pressed');
    }
}
=======
});
loop.start();
>>>>>>> origin/master


function update (dt) {
	kd.tick();

	if (keypressed) {
		//TODO do things
	}

	// updating the world.
	activeWorld.update(dt);
}

kd.A.down(() => {
    activeEntity.requestNewDirection(LEFT);
	keypressed = true;
});

kd.S.down(() => {
    activeEntity.requestNewDirection(DOWN);
    keypressed = true;
});

kd.D.down(() => {
    activeEntity.requestNewDirection(RIGHT);
    keypressed = true;
});

kd.W.down(() => {
    activeEntity.requestNewDirection(UP);
    keypressed = true;
});

