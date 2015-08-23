import {map} from './keymap';
import {LEFT, UP, RIGHT, DOWN} from './Direction';

function keyboard (keyCode) {
	var key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	//The `downHandler`
	key.downHandler = function (event) {
		if (event.keyCode === key.code) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	//The `upHandler`
	key.upHandler = function (event) {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};


	return key;
}

class Key {
	upListeners = [];
	downListeners = [];

	constructor (keyCode) {
		this.keyCode = keyCode;
	}

	set up (cb) {
		this.upListeners.push(cb);
	}

	set down (cb) {
		this.downListeners.push(cb);
	}

	handleUp () {
		this.upListeners.forEach(cb=>cb(this));
	}

	handleDown () {
		this.downListeners.forEach(cb=>cb(this));
	}
}

export class Input {
	keys = [];

	constructor (player) {
		this.player = player;
	}

	getPressed (event) {
		return this.keys.filter(key=> {
			return key.keyCode === event.keyCode;
		});
	}

	downHandler (event) {
		event.preventDefault();
		this.getPressed(event).forEach(key=> {
			key.handleDown();
		});
	}

	upHandler (event) {
		event.preventDefault();
		this.getPressed(event).forEach(key=> {
			key.handleUp();
		});
	}

	init () {
		//Attach event listeners
		window.addEventListener(
			"keydown", this.downHandler.bind(this), false
		);
		window.addEventListener(
			"keyup", this.upHandler.bind(this), false
		);
	}

	getKey (keyCode) {
		const key = new Key(keyCode);
		this.keys.push(key);
		return key;
	}

	listen () {
		this.init();
		this.getKey(map.A).up = () => {
			this.player.direction = LEFT;
		};

		this.getKey(map.LEFT).up = () => {
			this.player.direction = LEFT;
		};

		this.getKey(map.S).up = () => {
			this.player.direction = DOWN;
		};

		this.getKey(map.DOWN).up = () => {
			this.player.direction = DOWN;
		};

		this.getKey(map.D).up = () => {
			this.player.direction = RIGHT;
		};

		this.getKey(map.RIGHT).up = () => {
			this.player.direction = RIGHT;
		};

		this.getKey(map.W).up = () => {
			this.player.direction = UP;
		};

		this.getKey(map.UP).up = () => {
			this.player.direction = UP;
		};

		this.getKey(map.Q).up = () => {
			this.player.nextEntity();
		};

		for (let number = 1; number <= 9; number++) {
			let index = number - 1;
			this.getKey(map.ONE + index).up = () => {
				this.player.activeEntityId = index;
			};
		}
	}

	tick () {
	}
}
