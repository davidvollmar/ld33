var PIXI = require('pixi.js');

class GameObject extends PIXI.Graphics {
    constructor(x, y) {
        super();
        this.modelx = x;
        this.modely = y;
    }

    toModelCoordinates(x, y) {
        return [x / 900 * 26,
            y / 600 * 29];
    }

    toCanvasCoordinates(x, y) {
        return [x / 26 * 900,
            y / 29 * 600];
    }
}

module.exports = GameObject;
