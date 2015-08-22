var PIXI = require('pixi.js');
var GameObject = require('./gameobject');

class Monster extends PIXI.Sprite {
	constructor() {
		// create a texture from an image path
		var texture = PIXI.Texture.fromImage("../resources/pacman.png");
		super(texture);

		this.init();
	}

	init() {
		this.width = 100;
		this.height = 100;

		// center the sprites anchor point
		this.anchor.x = 100;
		this.anchor.y = 100;
	 
		// move the sprite t the center of the screen
		this.position.x = this.x;
		this.position.y = this.y;


	}
}
	
module.exports = Monster;