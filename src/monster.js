var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Entity = require('./entity');
var Direction = require('./Direction');

class Monster extends Entity {

	constructor() {
		super("resources/images/inverted/ghosts_blue_down_1.png");

		this.ANIMATIONINTERVAL = 5;
		this.MAXANIMATIONSTATE = 1;
		this.animationFrameCounter = 0;
		this.animationState = 0;
		this.animationFrames = [];

		this.animationFrames[Direction.LEFT] = ["resources/images/inverted/ghosts_blue_left_1.png","resources/images/inverted/ghosts_blue_left_2.png"];
		this.animationFrames[Direction.RIGHT] = ["resources/images/inverted/ghosts_blue_right_1.png","resources/images/inverted/ghosts_blue_right_2.png"];
		this.animationFrames[Direction.UP] = ["resources/images/inverted/ghosts_blue_up_1.png","resources/images/inverted/ghosts_blue_up_2.png"];
		this.animationFrames[Direction.DOWN] = ["resources/images/inverted/ghosts_blue_down_1.png","resources/images/inverted/ghosts_blue_down_2.png"];
	}

	update(){
		this.animationFrameCounter ++;
		if(this.animationFrameCounter == this.ANIMATIONINTERVAL){
			this.animationFrameCounter = 0;
			if(this.animationState == this.MAXANIMATIONSTATE){
				this.animationState = 0;
			}else{
				this.animationState ++;
			}
		}
		super.update(this.animationFrames[this.direction][this.animationState]);
	}
}
	
module.exports = Monster;
