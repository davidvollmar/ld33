export class Player {
	entities = [];

	activeEntity = -1;

	set activeEntityId (id) {
		if (id < this.entities.length) {
			if (this.entities[this.activeEntity]) {
				this.entities[this.activeEntity].active = false;
			}
			this.activeEntity = id;
			this.entities[this.activeEntity].active = true;
		} else {
			throw 'Invalid entity id for player';
		}
	}

	get activeEntityId () {
		return this.activeEntity;
	}

	nextEntity () {
		console.log('next');
		this.activeEntityId = (this.activeEntityId + 1) % this.entities.length;
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
