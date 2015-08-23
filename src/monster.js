var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Entity = require('./entity1');

class Monster extends Entity {
	constructor() {
		super("resources/images/inverted/ghosts_blue_down_1.png");
	}
}
	
module.exports = Monster;
