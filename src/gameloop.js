export class GameLoop {
	running = false;
	oldTime = 0;
	fixedInterval = 1000 / 12;

	callbacks = [];
	fixedCallbacks = [];

	constructor () {
		this.frame = this.loop.bind(this);
		this.fixedUpdateTimer = this.fixedInterval;
	}

	register (cb) {
		this.callbacks.push(cb);
	}

	registerFixed (cb) {
		this.fixedCallbacks.push(cb);
	}

	loop () {
		const now = Date.now();
		const dt = now - this.oldTime;
		this.oldTime = now;

		for (let callback of this.callbacks) {
			callback(dt);
		}

		// handling the fixed update
		if (this.fixedUpdateTimer <= 0) {
			// call fixedUpdate and reset timer
			for (let callback of this.fixedCallbacks) {
				callback(this.fixedUpdateTimer + this.fixedInterval);
			}
			this.fixedUpdateTimer = this.fixedInterval;
		}
		this.fixedUpdateTimer -= dt;

		if (this.running) {
			requestAnimationFrame(this.frame);
		}
	}

	start () {
		this.running = true;
		requestAnimationFrame(this.frame);
	}
}
