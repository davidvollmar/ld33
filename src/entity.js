var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Direction = require('./Direction');
import { toModelCoordinates, toCanvasCoordinates } from './CoordinatesMapper';

class Entity extends GameObject {
    constructor(resource) {
        super();
        // create a texture from an image path
        var texture = PIXI.Texture.fromImage(resource);
        this.sprite = new PIXI.Sprite(texture);
        var spriteSize =  toCanvasCoordinates(1,1);
        this.sprite.width = spriteSize[0];
        this.sprite.height = spriteSize[0];
        this.addChild(this.sprite);

        this.direction = Direction.RIGHT;
    }

    update(resource) {
        this.removeChild(this.sprite);
        var texture = PIXI.Texture.fromImage(resource);
        this.sprite = new PIXI.Sprite(texture);
        var spriteSize =  toCanvasCoordinates(1,1);
        this.sprite.width = spriteSize[0];
        this.sprite.height = spriteSize[0];
        this.addChild(this.sprite);
    }
}

module.exports = Entity;
