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
    constructor(x, y) {
        super(CellType.WALL, x, y);
        
        // create a texture from an image path
    		var texture = PIXI.Texture.fromImage("resources/images/inverted/wall.png");
    		var sprite = new PIXI.Sprite(texture);
            var spriteSize =  toCanvasCoordinates(1,1);
    		sprite.width = spriteSize[0];
    		sprite.height = spriteSize[0];
        // TODO: setting sprite x and y
        	var canvasCoords = toCanvasCoordinates(x,y);
			this.x = canvasCoords[0];
			this.y = canvasCoords[1];
    		this.addChild(sprite);
    }


}

module.exports = Wall;
