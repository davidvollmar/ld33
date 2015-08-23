var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Entity = require('./entity');
var Direction = require('./Direction');

class Pacman extends Entity {
	constructor () {
		super("resources/images/inverted/pacman_right_3.png");

		this.addAnimation(Direction.LEFT, ["resources/images/inverted/pacman_left_1.png", "resources/images/inverted/pacman_left_2.png", "resources/images/inverted/pacman_left_3.png", "resources/images/inverted/pacman_left_4.png", "resources/images/inverted/pacman_left_5.png"], true);
		this.addAnimation(Direction.RIGHT, ["resources/images/inverted/pacman_right_1.png", "resources/images/inverted/pacman_right_2.png", "resources/images/inverted/pacman_right_3.png", "resources/images/inverted/pacman_right_4.png", "resources/images/inverted/pacman_right_5.png"], true);
		this.addAnimation(Direction.UP, ["resources/images/inverted/pacman_up_1.png", "resources/images/inverted/pacman_up_2.png", "resources/images/inverted/pacman_up_3.png", "resources/images/inverted/pacman_up_4.png", "resources/images/inverted/pacman_up_5.png"], true);
		this.addAnimation(Direction.DOWN, ["resources/images/inverted/pacman_down_1.png", "resources/images/inverted/pacman_down_2.png", "resources/images/inverted/pacman_down_3.png", "resources/images/inverted/pacman_down_4.png", "resources/images/inverted/pacman_down_5.png"], true);
	}

	update (dt) {
		super.update(dt, this.direction);
	}
}

module.exports = Pacman;
