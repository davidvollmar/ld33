var PIXI = require('pixi.js');
var GameObject = require('./gameobject');

class Monster extends GameObject {
	constructor() {
		super();

		// create a texture from an image path
		var sprite = PIXI.Sprite.fromImage("../resources/pacman.png");
		this.width = 100;
		this.height = 100;
		this.addChild(sprite);

		this.init();
	}

	init() {

	}
}
	
module.exports = Monster;