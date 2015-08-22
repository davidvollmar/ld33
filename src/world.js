var PIXI = require('pixi.js');
var Monster = require('./monster');
var Wall = require('./wall');
class World {
	constructor(json) {
		this.json = json;

		this.monsters = this.json.monsters.map((def) => {
			var monster = new Monster();
			monster.x = def.x;
			monster.y = def.y;
			monster.width = 100;
			monster.height = 100;
			return monster;
		});

		this.walls = this.json.walls.map((def) => {
			console.log("def: " + def.x + " " + def.y + " " + def.width + " "+ def.height);
			var wall = new Wall(def.width, def.height);
			wall.x = def.x;
			wall.y = def.y;
			return wall;
		});


		this.scene = new PIXI.DisplayObjectContainer();
		this.applyToScene(this.scene);
	}
	
	applyToScene(stage) {
		this.monsters.forEach((monster) => {
			stage.addChild(monster);
		});

		this.walls.forEach((wall) => {
			stage.addChild(wall);
		})
	}
}

module.exports = World;
