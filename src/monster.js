var PIXI = require('pixi.js');
var GameObject = require('./gameobject');

class Monster extends GameObject {
	constructor() {
		super();

		// create a texture from an image path
		var texture = PIXI.Texture.fromImage("resources/images/inverted/ghosts_blue_down_1.png");
		var sprite = new PIXI.Sprite(texture);
		sprite.width = this.getSpriteWidth();
		sprite.height = this.getSpriteHeight();
		this.addChild(sprite);
	}
}
	
module.exports = Monster;