var PIXI = require('pixi.js');
var GameObject = require('./gameobject');

class Pacman extends GameObject {
    constructor() {
        super();

        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("resources/images/inverted/pacman_right_3.png");
        var sprite = new PIXI.Sprite(texture);
        sprite.width = 100;
        sprite.height = 100;
        this.addChild(sprite);

        this.init();
    }

    init() {

    }
}

module.exports = Pacman;
