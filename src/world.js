var PIXI = require('pixi.js');
var Monster = require('./monster');
var Cell = require('./cell');
var CellType = require('./CellType');
var Wall = require('./wall');
var Pacman = require('./pacman.js');
var PillCell = require('./PillCell');
import {toModelCoordinates, toCanvasCoordinates} from './CoordinatesMapper';
import {LEFT, RIGHT, UP, DOWN} from './Direction';

export default class World {
	constructor (json) {
		this.json = json;
		this.modelWidth = this.json.playingField.width;
		this.modelHeight = this.json.playingField.height;

        this.nrCells = this.modelWidth * this.modelHeight;
        this.nrWalls = 0;

        this.playingField = new Array(this.modelWidth);
		for (var i = 0; i < this.modelWidth; i++) {
			this.playingField[i] = new Array(this.modelHeight);
			for (var j = 0; j < this.modelHeight; j++) {
				this.playingField[i][j] = new PillCell(i, j);
			}
		}

		this.monsters = this.json.monsters.map((def) => {
			var monster = new Monster();
			monster.modelx = def.x;
			monster.modely = def.y;
			return monster;
		});


		this.json.walls.map((def) => {
			if (this.playingField) {
				for (var i = def.x; i < def.x + def.width; i++) {
					for (var j = def.y; j < def.y + def.height; j++) {
                        this.nrWalls++;
						this.playingField[i][j] = new Wall(i, j);
					}
				}
			}
		});

        this.nrPills = this.nrCells - this.nrWalls - 1; //-1 for pacman

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

	applyToScene (stage) {
		var container = new PIXI.DisplayObjectContainer();
		this.playingField.forEach((row) => {
			row.forEach((cell) => {
				container.addChild(cell);
			});
		});

		container.cacheAsBitmap = true;
		stage.addChild(container);

		this.monsters.forEach((monster) => {
			stage.addChild(monster);
		});

		stage.addChild(this.pacman);
	}


	/**
	 * Updates the entities of the world to their new location.
	 * Also handles collision.
	 * @param dt time since last update
	 */
	update (dt) {
		// update the entities
		this.entities.forEach((entity) => {
			let cellSize = toCanvasCoordinates(1, 1);
			
			// move to the target positions
			let targetPos = toCanvasCoordinates(entity.modelx, entity.modely);
			// how much left to move
			let moveX = targetPos[0] - entity.x;
			let moveY = targetPos[1] - entity.y;
			
			// the distance we can move
			let distModel = dt / 1000;
			let distX = distModel * cellSize[0];
			let distY = distModel * cellSize[1];
			
			// and updating the entities
			entity.x += Math.sign(moveX) * Math.min(distX, Math.abs(moveX));
			entity.y += Math.sign(moveY) * Math.min(distY, Math.abs(moveY));
			
			// update the animations
			entity.update();
		});
	}
	
	/**
	 * Update functional that will be called on a fixed rate.
	 * To keep it consistent with update, this should be called each second on average.
	 */
	fixedUpdate() {
		this.entities.forEach((entity) => {
			// check if we can move into the desired location
			if (entity.newDirection) {
				let newDir = dirToCoord(entity.newDirection);
				if (this.canMove(entity.modelx + newDir[0], entity.modely + newDir[1])) {
					// we can move to here
					entity.modelx += newDir[0];
					entity.modely += newDir[1];
					entity.direction = entity.newDirection;
					entity.newDirection = null;
					return; // skip the rest
				}
			}
			
			// we did not went into new Direction
			// continue with old Direction
			let oldDir = dirToCoord(entity.direction);
			if (this.canMove(entity.modelx + oldDir[0], entity.modely + oldDir[1])) {
				// we can keep moving
				entity.modelx += oldDir[0];
				entity.modely += oldDir[1];
				return; // to keep the code kind of symmetric
			}

			if (this.nrPills == 0) {
				//TODO handle win
			}
		});
	}

	/**
	 * Determines whether an entity can move to the given coordinates
	 */
	canMove (modelx, modely) {
		modelx %= 26;
		modely %= 26;
		return this.playingField[modelx][modely].cellType !== CellType.WALL;
	}
}

/**
 * Calculates the coordinates that goes into that direction
 */
function dirToCoord(direction) {
	switch(direction) {
		case LEFT: return [-1, 0];
		case RIGHT: return [1, 0];
		case UP: return [0, -1];
		case DOWN: return [0, 1];
	}
}
