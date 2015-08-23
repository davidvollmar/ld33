import io from 'socket.io-client';
import {EventEmitter} from 'events';

export const MessageType = {
	MOVE: 1
};

export class Network extends EventEmitter {
	socket = null;

	constructor (port = 5000) {
		super();
		this.port = port;
	}

	init () {
		if (this.socket) {
			return;
		}
		this.socket = io(`http://${location.hostname}:${this.port}`);
		this.socket.on('chat message', function (data) {
			this.emit('chat', data);
		});
		this.socket.on('message', function (data) {
			this.emit('message', data);
		});
		this.socket.on('disconnect', function () {
			this.emit('leave');
		});
	}

	sendMessage (data) {
		if(!this.socket){
			console.log('init first');
		}
		this.socket.send('message', data);
	}

	sendChat (message) {
		if (!this.socket) {
			console.log('init first');
		}
		this.socket.send('chat message', message);
	}
}

export class NetworkListener {
	constructor (network, world = null) {
		this.network = network;
		this.world = world;
	}

	listen () {
		this.network.on('chat', (message)=> {
			console.log(message);
		});
		this.network.on('message', (data)=> {
			if (!this.world) {
				return;
			}
			switch (data.type) {
				case MessageType.MOVE:
					console.log('todo');
					// update this.world
					break;
			}
		});
	}
}
