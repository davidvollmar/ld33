var PIXI = require('pixi.js');
var kd = require('keydrown');
var World = require('./world');
var io = require('socket.io-client');
import * as CoordinatesMapper from './CoordinatesMapper';
import {LEFT, UP, RIGHT, DOWN} from './Direction';

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
        //socket.emit('chat message','key pressed');
    }
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

