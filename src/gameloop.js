export class GameLoop {
	running = false;
	oldTime = 0;

	callbacks = [];

	register (cb) {
		this.callbacks.push(cb);
		this.frame = this.loop.bind(this);
	}

	loop () {
		const now = Date.now();
		const dT = now - this.oldTime;
		this.oldTime = now;

		for(let callback of this.callbacks){
			callback(dT);
		}

		if (this.running) {
			requestAnimationFrame(this.frame);
		}
	}

	start () {
		this.running = true;
		requestAnimationFrame(this.frame);
	}
}
