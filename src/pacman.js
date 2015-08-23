var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Entity = require('./entity');
var Direction = require('./Direction');

class Pacman extends Entity {
	constructor () {
		super("resources/images/inverted/pacman_right_3.png");

		this.addAnimation(Direction.LEFT, ["pacman_left_1.png", "pacman_left_2.png", "pacman_left_3.png", "pacman_left_4.png", "pacman_left_5.png"], true);
		this.addAnimation(Direction.RIGHT, ["pacman_right_1.png", "pacman_right_2.png", "pacman_right_3.png", "pacman_right_4.png", "pacman_right_5.png"], true);
		this.addAnimation(Direction.UP, ["pacman_up_1.png", "pacman_up_2.png", "pacman_up_3.png", "pacman_up_4.png", "pacman_up_5.png"], true);
		this.addAnimation(Direction.DOWN, ["pacman_down_1.png", "pacman_down_2.png", "pacman_down_3.png", "pacman_down_4.png", "pacman_down_5.png"], true);
	}

	update (dt) {
		super.update(dt, this.direction);
	}
}

module.exports = Pacman;
