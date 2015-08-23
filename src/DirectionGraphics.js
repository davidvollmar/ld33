import {Graphics, Point} from 'pixi.js';
import {toCanvasCoordinates} from './CoordinatesMapper';
import {LEFT, RIGHT, UP, DOWN} from './Direction';


/**
 * Draws the direction an Entity wants to go.
 */
export class DirectionGraphics extends Graphics {
	constructor(rotation, x, y) {
		super();
		
		this.rotation = rotation;
		const [cellWidth, cellHeight] = toCanvasCoordinates(1, 1);
		this.scale = new Point(cellWidth, cellHeight);
		this.alpha = .5;
		this.x = (x + .5) * cellWidth;
		this.y = (y + .5) * cellHeight
		
		// drawing the graphics
		this.beginFill(0x6BF76B);
		this.drawPolygon([0, -1/2, 1/6, 1/2, -1/6, 1/2]);
		this.endFill();
		
		this.width = cellWidth;
		this.height = cellHeight;
	}
}

/**
 * Returns the DirectionGraphics belonging to the given Direction
 */
export function directionGraphics(direction) {
	switch(direction) {
		case UP: return new DirectionGraphics(0, 0, -1);
		case RIGHT: return new DirectionGraphics(.5 * Math.PI, 1, 0);
		case DOWN: return new DirectionGraphics(Math.PI, 0, 1);
		case LEFT: return new DirectionGraphics(1.5 * Math.PI, -1, 0);
	}
}
