var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Entity = require('./entity');
var Direction = require('./Direction');

class Monster extends Entity {

	constructor () {
		super("resources/images/inverted/ghosts_blue_down_1.png");
		this.animationTime = 300;

		this.MINVULNERABLESTATE = 5;
		this.MAXVULNERABLESTATE = 6;
		this.addAnimation(Direction.LEFT, ["resources/images/inverted/ghosts_blue_left_1.png", "resources/images/inverted/ghosts_blue_left_2.png"]);
		this.addAnimation(Direction.RIGHT, ["resources/images/inverted/ghosts_blue_right_1.png", "resources/images/inverted/ghosts_blue_right_2.png"]);
		this.addAnimation(Direction.UP, ["resources/images/inverted/ghosts_blue_up_1.png", "resources/images/inverted/ghosts_blue_up_2.png"]);
		this.addAnimation(Direction.DOWN, ["resources/images/inverted/ghosts_blue_down_1.png", "resources/images/inverted/ghosts_blue_down_2.png"]);
		this.addAnimation(this.MINVULNERABLESTATE, ["resources/images/inverted/ghosts_death_blue_1.png", "resources/images/inverted/ghosts_death_blue_2.png"]);
		this.addAnimation(this.MAXVULNERABLESTATE, ["resources/images/inverted/ghosts_death_white_1.png", "resources/images/inverted/ghosts_death_white_2.png"]);

		this.vulnerable = true;
	}

	getActiveAnimation () {
		if (this.vulnerable) {
			return this.MINVULNERABLESTATE;
		} else {
			return this.direction;
		}
	}

	update (dt) {
		super.update(dt, this.getActiveAnimation());
	}
}

module.exports = Monster;
