import kd from 'keydrown';
import {LEFT, UP, RIGHT, DOWN} from './Direction';

export class Input {
	constructor (player) {
		this.player = player;
	}

	listen () {
		kd.A.press(() => {
			this.player.direction = LEFT;
		});

		kd.LEFT.press(() => {
		    this.player.direction = LEFT;
		})

		kd.S.press(() => {
			this.player.direction = DOWN;
		});

		kd.DOWN.press(() => {
		    this.player.direction = DOWN;
		});

		kd.D.press(() => {
			this.player.direction = RIGHT;
		});

		kd.RIGHT.press(() => {
		    this.player.direction = RIGHT;
		});

		kd.W.press(() => {
			this.player.direction = UP;
		});
		
		kd.UP.press(() => {
			this.player.direction = UP;
		});

		kd.Q.press(() => {
			this.player.nextEntity();
		})
	}

	tick () {
		kd.tick();
	}
}
