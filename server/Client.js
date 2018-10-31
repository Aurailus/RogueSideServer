"use strict";
var logger = require('./logger');

class Client {
	constructor(socket) {
		this.socket = socket;
		this.gameInstance = null;

		this.connect();
		let me = this;
		socket.on('disconnect', () => this.disconnect.call(me));
	}

	update() {
	}

	connect() {
	}

	disconnect() {
		this.gameInstance.removeClient(this);
	}

	registerInstance(instance) {
		this.gameInstance = instance;
	}
}

module.exports = Client;
