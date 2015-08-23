var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Entity = require('./entity1');

class Pacman extends Entity {
    constructor() {
        super("resources/images/inverted/pacman_right_3.png");
    }
}

module.exports = Pacman;
