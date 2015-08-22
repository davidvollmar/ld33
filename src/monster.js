var PIXI = require('pixi.js');
var GameObject = require('./gameobject');

class Monster extends GameObject {
	constructor() {
		super();

		// create a texture from an image path
		var texture = PIXI.Texture.fromImage("../resources/pacman.png");
		var sprite = new PIXI.Sprite(texture);
		sprite.width = 100;
		sprite.height = 100;
		this.addChild(sprite);

		this.init();
	}

	init() {

	}
}
	
module.exports = Monster;