var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var CellType = require('./CellType.js');

class Cell extends GameObject {


    constructor(type) {
        super();

        if(type) {
            this.cellType = type;
        }

        this.init();
    }

    init() {
        switch(this.cellType) {
            case CellType.PILL:
                //TODO draw pill cell
                break;
            case CellType.BONUS:
                //TODO draw bonus cell
                break;
            case CellType.WALL:
                //TODO draw wall cell
                break;
        }
    }
}

module.exports = Cell;
