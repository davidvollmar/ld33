var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Cell = require('./cell');
var CellType = require('./CellType');
import { toModelCoordinates, toCanvasCoordinates } from './CoordinatesMapper';

/**
 * A cell that can be walked through by monsters but not by pacman.
 */
class SemiCell extends Cell {

	constructor (x, y) {
		super(CellType.SEMI, x, y);
		var canvasCoords = toCanvasCoordinates(x, y);
		this.x = canvasCoords[0];
		this.y = canvasCoords[1];
	}
}

module.exports = SemiCell;
