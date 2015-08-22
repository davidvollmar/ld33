var PIXI = require('pixi.js');
var Monster = require('./monster');
var Cell = require('./cell');
var CellType = require('./CellType');
var Wall = require('./wall');
var Pacman = require('./pacman.js');

class World {
	constructor(json) {
		this.json = json;

		this.modelWidth = this.json.playingField.width;
		this.modelHeight = this.json.playingField.height;
		this.playingField = new Array(this.modelWidth);
		for(var i = 0; i<this.modelWidth; i++) {
			this.playingField[i] = new Array(this.modelHeight);
		}

		this.monsters = this.json.monsters.map((def) => {
			var monster = new Monster();
			monster.x = def.x;
			monster.y = def.y;
			return monster;
		});

		/*this.walls = this.json.walls.map((def) => {
			console.log("def: " + def.x + " " + def.y + " " + def.width + " "+ def.height);
			var wall = new Wall(def.width, def.height);
			wall.x = def.x;
			wall.y = def.y;
			return wall;
		});*/
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
		this.pacman.x = this.json.pacman.x;
		this.pacman.y = this.json.pacman.y;


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

}

module.exports = World;
