var PIXI = require('pixi.js');
var Monster = require('./monster');
var Cell = require('./cell');
var CellType = require('./CellType');
var Wall = require('./wall');
var Pacman = require('./pacman.js');
import {toModelCoordinates, toCanvasCoordinates} from './CoordinatesMapper';
import {LEFT, RIGHT, UP, DOWN} from './Direction';

export default class World {
	constructor(json) {
		this.json = json;

		this.modelWidth = this.json.playingField.width;
		this.modelHeight = this.json.playingField.height;
		this.playingField = new Array(this.modelWidth);
		for(var i = 0; i<this.modelWidth; i++) {
			this.playingField[i] = new Array(this.modelHeight);
			for(var j = 0; j<this.modelHeight; j++) {
				this.playingField[i][j] = new Cell(CellType.PILL);
			}
		}

		this.monsters = this.json.monsters.map((def) => {
			var monster = new Monster();
			monster.modelx = def.x;
			monster.modely = def.y;
			return monster;
		});

		this.json.walls.map((def) => {
			if(this.playingField) {
				for(var i = def.x; i<def.x + def.width; i++) {
					for(var j = def.y; j<def.y + def.height; j++) {
						this.playingField[i][j] = new Wall(i, j);
					}
				}
			}
		});

		this.pacman = new Pacman();
		this.pacman.modelx = this.json.pacman.x;
		this.pacman.modely = this.json.pacman.y;
		var canvasCoordinates = toCanvasCoordinates(this.json.pacman.x, this.json.pacman.y);
    this.pacman.x = canvasCoordinates[0];
    this.pacman.y = canvasCoordinates[1];

    this.scene = new PIXI.DisplayObjectContainer();
		this.applyToScene(this.scene);
		
		// create entities for easy access
		this.entities = this.monsters.concat([this.pacman]);
	}
	
	applyToScene(stage) {
		this.playingField.forEach((row) => {
			row.forEach((cell) => {
				stage.addChild(cell);
			});
		});

		this.monsters.forEach((monster) => {
			stage.addChild(monster);
		});

		stage.addChild(this.pacman);
	}
	
	
	
	/**
	 * Updates the entities of the world to their new location.
	 * Also handles collision.
	 */
	update() {
		this.entities.forEach((entity) => {
			// moving the entities
			moveInDirection(entity, entity.direction, this);
			
			// TODO: handle collisions
		});
	}
	
	/**
	 * Determines whether an entity can move to the given coordinates
	 */
	canMove(modelx, modely) {
		modelx %= 26;
		modely %= 26;
		return this.playingField[modelx][modely].cellType !== CellType.WALL;
	}
	

}

/**
 * Moves the entity into the given direction.
 * When he collids with a wall, the entity will not move.
 */
function moveInDirection(entity, direction, world) {
	
	function canMoveModel(x, y) {
		let modelPos = toModelCoordinates(x, y);
		return world.canMove(modelPos[0], modelPos[1]);
	}
	
	// move our entity if possible
	var size = toCanvasCoordinates(1, 1);
	switch(entity.direction) {
		case LEFT:
			if (canMoveModel(entity.x - 1, entity.y)) {
				entity.x--;
			}
			break;
		case RIGHT:
			if (canMoveModel(entity.x + 1 + size[0], entity.y)) {
				entity.x++;
			}
			break;
		case UP:
			if (canMoveModel(entity.x, entity.y - 1)) {
				entity.y--;
			}
			break;
		case DOWN:
			if (canMoveModel(entity.x, entity.y + 1 + size[1])) {
				entity.y++;
			}
			break;
	}
};

