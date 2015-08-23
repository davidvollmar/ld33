import kd from 'keydrown';
import {LEFT, UP, RIGHT, DOWN} from './Direction';

export class Input {
	constructor (player) {
		this.player = player;
	}

	listen () {
		kd.A.down(() => {
			this.player.direction = LEFT;
		});

		kd.LEFT.down(() => {
			this.player.direction = LEFT;
		})

		kd.S.down(() => {
			this.player.direction = DOWN;
		});

		kd.DOWN.down(() => {
			this.player.direction = DOWN;
		});

		kd.D.down(() => {
			this.player.direction = RIGHT;
		});

		kd.RIGHT.down(() => {
			this.player.direction = RIGHT;
		});

		kd.W.down(() => {
			this.player.direction = UP;
		});

		kd.UP.down(() => {
			this.player.direction = UP;
		});

		kd.Q.up(() => {
			this.player.nextEntity();
		})
	}

	tick () {
		kd.tick();
	}
}
