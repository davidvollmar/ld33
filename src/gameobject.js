var PIXI = require('pixi.js');

class GameObject extends PIXI.Graphics {
    constructor(x, y) {
        super();
        this.modelx = x;
        this.modely = y;
    }
}

module.exports = GameObject;
