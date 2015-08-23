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
        super(x, y);

        if (type) {
            this.cellType = type;
        }
    }
}

module.exports = Cell;
