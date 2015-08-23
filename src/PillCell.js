var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Cell = require('./cell');
var CellType = require('./CellType');
import { toModelCoordinates, toCanvasCoordinates } from './CoordinatesMapper';

/**
 * A cell that can't be walked through.
 */
class PillCell extends Cell {

    /**
     * Creates a new Wall Cell.
     * This Cell has CellType Wall.
     */
    constructor (x, y) {
        super(CellType.PILL, x, y);

        var graphics = new PIXI.Graphics();

        const [spriteSize] = toCanvasCoordinates(1, 1);
        graphics.beginFill(0x0000FF);
        //graphics.lineStyle(5, 0xFF0000);
        graphics.drawCircle(spriteSize/2, spriteSize/2, spriteSize/6);
        graphics.endFill();

        // TODO: setting sprite x and y
        var canvasCoords = toCanvasCoordinates(x, y);
        this.x = canvasCoords[0];
        this.y = canvasCoords[1];
        this.addChild(graphics);

        if(x%2 == 0) {
            this.eat();
        }
    }

    eat() {
        this.removeChild(this.graphics);
        //no need to draw an empty cell
    }



}

module.exports = PillCell;
