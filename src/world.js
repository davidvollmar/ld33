var PIXI = require('pixi.js');
var Monster = require('./monster');
var Cell = require('./cell');
var CellType = require('./CellType');
var Wall = require('./wall');
var Pacman = require('./pacman.js');
import { toModelCoordinates, toCanvasCoordinates } from './CoordinatesMapper';

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
	 * Determines whether an entity can move to the given coordinates
	 */
	canMove(modelx, modely) {
		return activeWorld[modelx][modely].cellType !== CellType.WALL;
	}

}
