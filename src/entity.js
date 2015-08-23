var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Direction = require('./Direction');
import { toModelCoordinates, toCanvasCoordinates } from './CoordinatesMapper';

class Entity extends GameObject {
	active = false;

	animationFrames = [];

	activeFrameIndex = 0;
	animationTime = 1000; //full animation in ms
	animationTimer = 0;

	inverted = true;

	addAnimation (state, frames, revert) {
		const makeSpire = (inverted, frame) => {
			const type = inverted ? 'inverted' : 'normal';
			const texture = PIXI.Texture.fromImage(`resources/images/${type}/${frame}`);
			const [spriteSize] = toCanvasCoordinates(1, 1);
			const sprite = new PIXI.Sprite(texture);
			sprite.width = spriteSize;
			sprite.height = spriteSize;
			return sprite;
		};
		this.animationFrames[true][state] = frames.map(makeSpire.bind(null, true));
		this.animationFrames[false][state] = frames.map(makeSpire.bind(null, false));
		if (revert) {
			const backFrames = frames.slice(1, frames.length - 2).reverse();
			this.animationFrames[true][state] = this.animationFrames[true][state].concat(
				backFrames.map(makeSpire.bind(null, true))
			);
			this.animationFrames[false][state] = this.animationFrames[false][state].concat(
				backFrames.map(makeSpire.bind(null, false))
			);
		}
	}

	constructor (resource) {
		super();
		// create a texture from an image path
		var texture = PIXI.Texture.fromImage(resource);
		this.sprite = new PIXI.Sprite(texture);
		var spriteSize = toCanvasCoordinates(1, 1);
		this.sprite.width = spriteSize[0];
		this.sprite.height = spriteSize[0];
		this.addChild(this.sprite);

		this.direction = Direction.RIGHT;

		// how many ticks it takes to walk one cell
		this.walkDuration = 4;
		this.ticksLeft = 0;
		this.animationFrames[false] = [];
		this.animationFrames[true] = [];
	}

	update (dt, activeAnimation) {
		this.removeChild(this.sprite);
		const frames = this.animationFrames[!this.active][activeAnimation];
		this.animationTimer += dt;
		if (this.animationTimer > (this.animationTime / frames.length)) {
			this.activeFrameIndex = (this.activeFrameIndex + 1) % frames.length;
			this.animationTimer = 0;
		}
		this.sprite = frames[this.activeFrameIndex];

		this.addChild(this.sprite);
	}

	requestNewDirection (dir) {
		this.newDirection = dir;
	}
}

module.exports = Entity;
