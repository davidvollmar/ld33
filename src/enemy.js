var PIXI = require('pixi.js');
var GameObject = require('./gameobject');

class Enemy extends GameObject {
	constructor(x, y) {
		super();
		this.x = x;
		this.y = y;
		this.init();
	}

	init() {
		//TODO draw
	}
	
module.exports = Enemy;