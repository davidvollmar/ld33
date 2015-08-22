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
	}
}

module.exports = World;
