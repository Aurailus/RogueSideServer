"use strict";
var logger = require('./logger');
var MapGenerator = require('./MapGenerator');

class GameInstance {
	constructor(io, startingClient, hashID) {
		this.hashID = hashID;
		this.io = io;
		this.clients = [];

		this.maps = new MapGenerator();
		console.log(this.maps);
		// console.log(this.maps.getWorld());

		this.addClient(startingClient);

		this.update();
	}

	update() {
		for (let client of this.clients) {
			client.update();
		}

		setTimeout(me => this.update.call(me), 16, this);
	}

	addClient(client) {
		logger.important("Client added to " + this.hashID + ".");
		this.clients.push(client);
		client.registerInstance(this);
	}

	removeClient(client) {
		logger.important("Removed client from " + this.hashID + ".");
		this.clients = this.clients.slice(this.clients.indexOf(client), 1);
	}
}

module.exports = GameInstance;
