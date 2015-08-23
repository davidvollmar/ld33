var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Entity = require('./entity');
var Direction = require('./Direction');

class Pacman extends Entity {
    constructor() {
        super("resources/images/inverted/pacman_right_3.png");

        this.ANIMATIONINTERVAL = 5;
        this.MAXANIMATIONSTATE = 4;
        this.animationFrameCounter = 0;
        this.animationState = 1;
        this.animationFrames = [];
        this.animationDirection = 1;

        this.animationFrames[Direction.LEFT] = ["resources/images/inverted/pacman_left_1.png","resources/images/inverted/pacman_left_2.png","resources/images/inverted/pacman_left_3.png","resources/images/inverted/pacman_left_4.png","resources/images/inverted/pacman_left_5.png"];
        this.animationFrames[Direction.RIGHT] = ["resources/images/inverted/pacman_right_1.png","resources/images/inverted/pacman_right_2.png","resources/images/inverted/pacman_right_3.png","resources/images/inverted/pacman_right_4.png","resources/images/inverted/pacman_right_5.png"];
        this.animationFrames[Direction.UP] = ["resources/images/inverted/pacman_up_1.png","resources/images/inverted/pacman_up_2.png","resources/images/inverted/pacman_up_3.png","resources/images/inverted/pacman_up_4.png","resources/images/inverted/pacman_up_5.png"];
        this.animationFrames[Direction.DOWN] = ["resources/images/inverted/pacman_down_1.png","resources/images/inverted/pacman_down_2.png","resources/images/inverted/pacman_down_3.png","resources/images/inverted/pacman_down_4.png","resources/images/inverted/pacman_down_5.png"];
    }

    update(){
        this.animationFrameCounter ++;
        if(this.animationFrameCounter == this.ANIMATIONINTERVAL){
            this.animationFrameCounter = 0;
            if(this.animationState == this.MAXANIMATIONSTATE || this.animationState == 0){
                this.animationDirection -= this.animationDirection*2;
            }
            this.animationState += this.animationDirection;
        }
        super.update(this.animationFrames[this.direction][this.animationState]);
    }
}

module.exports = Pacman;
