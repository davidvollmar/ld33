export class GameLoop {
	running = false;
	oldTime = 0;
	fixedInterval = 1000;

	callbacks = [];
	fixedCallbacks = [];

	/**
	 * Creates a new GameLoop to register the update methods to.
	 * @param fixedTicksPerSeconds number of times per second that fixed updates will be called.
	 */
	constructor (fixedTicksPerSeconds) {
		this.frame = this.loop.bind(this);
		this.fixedUpdateTimer = this.fixedInterval;
		this.fixedTicksPerSeconds = fixedTicksPerSeconds;
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
			callback(dt, this.fixedTicksPerSeconds);
		}

		// handling the fixed update
		if (this.fixedUpdateTimer <= 0) {
			// call fixedUpdate and reset timer
			for (let callback of this.fixedCallbacks) {
				callback(this.fixedUpdateTimer + this.fixedInterval, this.fixedTicksPerSeconds);
			}
			this.fixedUpdateTimer = this.fixedInterval / this.fixedTicksPerSeconds;
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
