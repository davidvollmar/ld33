var PIXI = require('pixi.js');
var Monster = require('./monster');
var Cell = require('./cell');
var CellType = require('./CellType.js');

class World {
	constructor(json) {
		this.json = json;

		this.playingField = new Array(this.json.playingField.width);
		for(var i = 0; i<this.json.playingField.width; i++) {
			this.playingField[i] = new Array(this.json.playingField.height);
		}
		var test = this.playingField;

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
						this.playingField[i][j] = new Cell(CellType.WALL);
					}
				}
			}
		});


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

		/*this.walls.forEach((wall) => {
			stage.addChild(wall);
		})*/
	}
}

module.exports = World;
