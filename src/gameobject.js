var PIXI = require('pixi.js');

class GameObject extends PIXI.Graphics {

	static textureMap = {};

	loadTexture (file) {
		if (!GameObject.textureMap[file]) {
			GameObject.textureMap[file] = PIXI.Texture.fromImage(file);
		}
		return GameObject.textureMap[file];
	}

	constructor (x, y) {
		super();
		this.modelx = x;
		this.modely = y;
	}

	getSpriteWidth () {
		//return document.body.clientWidth / 26;
		return 900 / 26;
	}

	getSpriteHeight () {
		//return document.body.clientHeight / 29;
		return 900 / 26;
	}

}

module.exports = GameObject;
