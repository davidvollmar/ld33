var PIXI = require('pixi.js');
var Enemy = require('./Enemy');

class World {
	constructor(json) {
		this.json = json;
		this.enemies = this.json.enemies.map((def) => {
			var enemy = new Enemy();
			enemy.x = def.x;
			enemy.y = def.y;
			return enemy;
		});
		this.scene = new PIXI.DisplayObjectContainer();
		this.applyToScene(this.scene);
	}
	
	applyToScene(stage) {
		this.enemies.forEach((enemy) => {
			stage.addChild(enemy);
		});
	}
}

module.exports = World;
