var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Direction = require('./Direction');
import { toModelCoordinates, toCanvasCoordinates } from './CoordinatesMapper';

class Entity extends GameObject {
    constructor(resource) {
        super();
        // create a texture from an image path
        var texture = PIXI.Texture.fromImage(resource);
        var sprite = new PIXI.Sprite(texture);
        var spriteSize =  toCanvasCoordinates(1,1);
        sprite.width = spriteSize[0];
        sprite.height = spriteSize[0];
        this.addChild(sprite);

        this.currentDirection = Direction.RIGHT;
    }
}

module.exports = Entity;
