var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Direction = require('./Direction');

class Entity extends GameObject {
    constructor(resource) {
        super();
        // create a texture from an image path
        var texture = PIXI.Texture.fromImage(resource);
        var sprite = new PIXI.Sprite(texture);
        sprite.width = this.getSpriteWidth();
        sprite.height = this.getSpriteHeight();
        this.addChild(sprite);

        this.currentDirection = Direction.RIGHT;
    }
}

module.exports = Entity;
