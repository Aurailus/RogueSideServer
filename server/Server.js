"use strict";
var logger = require('./logger');
const Client = require('./Client');
const GameInstance = require('./GameInstance')

class Server {
	constructor(io) {
		this.io = io;
		this.instances = [];

		io.sockets.on("connection", socket => {
			let hashID = socket.handshake.query.id;

			for (let instance of this.instances) {
				if (instance.hashID == hashID) {
					instance.addClient(new Client(socket));
					return;
				}
			}
			
			this.instances.push(new GameInstance(io, new Client(socket), hashID));
		});

		process.on('SIGINT', function() {
			console.log('');
			logger.important("Shutting down due to crash or force stop.");
			process.exit();
		});
	}
}

module.exports = Server;
