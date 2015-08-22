var PIXI = require('pixi.js');

class GameObject extends PIXI.Graphics {
	getPosition() {
		return [x,y];
	}
}

module.exports = GameObject;
