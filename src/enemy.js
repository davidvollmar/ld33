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
		this.clear();
		
		 // create a texture from an image path
		var texture = PIXI.Texture.fromImage("../resources/pacman.png");
		// create a new Sprite using the texture
		var pacman = new PIXI.Sprite(texture);
	 
		// center the sprites anchor point
		pacman.anchor.x = 0.5;
		pacman.anchor.y = 0.5;
	 
		// move the sprite t the center of the screen
		pacman.position.x = this.x;
		pacman.position.y = this.y;
	}
}
	
module.exports = Enemy;