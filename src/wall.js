var PIXI = require('pixi.js');
var GameObject = require('./gameobject');

var width;
var height;

class Wall extends GameObject {
    constructor(width, height) {
        super();
        this.wallWidth = width;
        this.wallHeight = height;

        this.init();
    }

    init() {
        this.clear();
        this.lineStyle(2, 0xFFFFFF, 1);
        this.beginFill(0xFFFFFF);
        this.drawRect(this.x, this.y, this.wallWidth, this.wallHeight);
        this.endFill();
    }
}

module.exports = Wall;
