var PIXI = require('pixi.js');

class GameObject extends PIXI.Graphics {
    constructor(x, y) {
        super();
        this.modelx = x;
        this.modely = y;
    }

    toModelCoordinates(x, y) {
        //return [(x / document.body.clientHeight) * 26,
        //    (y / document.body.clientWidth) * 29];
        return [(x / 900) * 26,
            (y / 900) * 26];
    }

    toCanvasCoordinates(x, y) {
        //return [(x / 26) * document.body.clientHeight,
        //    (y / 29) * document.body.clientWidth];
        return [(x / 26) * 900,
            (y / 26) * 900];
    }

    getSpriteWidth() {
        //return document.body.clientWidth / 26;
        return 900 / 26;
    }

    getSpriteHeight() {
        //return document.body.clientHeight / 29;
        return 900 / 26;
    }
}

module.exports = GameObject;
