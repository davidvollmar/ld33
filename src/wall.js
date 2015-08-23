var PIXI = require('pixi.js');
var GameObject = require('./gameobject');
var Cell = require('./cell');
var CellType = require('./CellType');
import { toModelCoordinates, toCanvasCoordinates } from './CoordinatesMapper';

/**
 * A cell that can't be walked through.
 */
class Wall extends Cell {

	/**
	 * Creates a new Wall Cell.
	 * This Cell has CellType Wall.
	 */
	constructor (x, y) {
		super(CellType.WALL, x, y);

		var graphics = new PIXI.Graphics();

		const [spriteSize] = toCanvasCoordinates(1, 1);
		graphics.beginFill(0xFFFF00);
		//graphics.lineStyle(5, 0xFF0000);
		graphics.drawRect(0, 0, spriteSize, spriteSize);
		graphics.endFill();

		// TODO: setting sprite x and y
		var canvasCoords = toCanvasCoordinates(x, y);
		this.x = canvasCoords[0];
		this.y = canvasCoords[1];
		this.addChild(graphics);
	}


}

module.exports = Wall;
