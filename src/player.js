export class Player {
	entities = [];

	activeEntity = -1;

	set activeEntityId (id) {
		if (id < this.entities.length) {
			this.activeEntity = id;
		} else {
			throw 'Invalid entity id for player';
		}
	}

	addEntity (entity) {
		this.entities.push(entity);
	}

	set direction (direction) {
		this.entities[this.activeEntity].requestNewDirection(direction);
	}

	get direction () {
		return this.entities[this.activeEntity];
	}
}
