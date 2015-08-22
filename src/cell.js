var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var CellType = require('./CellType.js');

/**
 * @abstract
 */
class Cell extends GameObject {

    /**
     * Creates a new cell.
     * @param type CellType the type of the Cell
     * @param x int the model coordinates
     * @param x int the model coordinates
     */
    constructor(type, x, y) {
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
