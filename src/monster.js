var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Entity = require('./entity');
var Direction = require('./Direction');

class Monster extends Entity {

	constructor() {
		super("resources/images/inverted/ghosts_blue_down_1.png");

		this.ANIMATIONINTERVAL = 5;
		this.MAXANIMATIONSTATE = 1;
		this.VULNERABLEINTERVAL = 23;
		this.MINVULNERABLESTATE = 5;
		this.MAXVULNERABLESTATE = 6;
		this.animationFrameCounter = 0;
		this.animationState = 0;
		this.vulnerableFrameCounter = 0;
		this.vulnerableState = 5;

		this.animationFrames = [];

		this.animationFrames[Direction.LEFT] = ["resources/images/inverted/ghosts_blue_left_1.png","resources/images/inverted/ghosts_blue_left_2.png"];
		this.animationFrames[Direction.RIGHT] = ["resources/images/inverted/ghosts_blue_right_1.png","resources/images/inverted/ghosts_blue_right_2.png"];
		this.animationFrames[Direction.UP] = ["resources/images/inverted/ghosts_blue_up_1.png","resources/images/inverted/ghosts_blue_up_2.png"];
		this.animationFrames[Direction.DOWN] = ["resources/images/inverted/ghosts_blue_down_1.png","resources/images/inverted/ghosts_blue_down_2.png"];
		this.animationFrames[this.MINVULNERABLESTATE] = ["resources/images/inverted/ghosts_death_blue_1.png","resources/images/inverted/ghosts_death_blue_2.png"];
		this.animationFrames[this.MAXVULNERABLESTATE] = ["resources/images/inverted/ghosts_death_white_1.png","resources/images/inverted/ghosts_death_white_2.png"];

		this.vulnerable = true;
	}

	update(){
		this.animationFrameCounter ++;
		var tmpDirection = this.direction;
		if (this.animationFrameCounter == this.ANIMATIONINTERVAL) {
			this.animationFrameCounter = 0;
			if (this.animationState == this.MAXANIMATIONSTATE) {
				this.animationState = 0;
			} else {
				this.animationState++;
			}
		}
		if(this.vulnerable) {
			this.vulnerableFrameCounter ++;
			tmpDirection = this.vulnerableState;
			if (this.vulnerableFrameCounter == this.VULNERABLEINTERVAL) {
				this.vulnerableFrameCounter = 0;
				if (this.vulnerableState == this.MAXVULNERABLESTATE) {
					this.vulnerableState = this.MINVULNERABLESTATE;
				} else {
					this.vulnerableState ++;
				}
			}
		}
		super.update(this.animationFrames[tmpDirection][this.animationState]);
	}
}
	
module.exports = Monster;
