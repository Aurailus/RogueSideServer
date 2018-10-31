"use strict";
var logger = require('./logger');

let ROOM_X_BOUNDS = 10;
let ROOM_Y_BOUNDS = 6;
let ROOMS_SPREAD  = 3;

let roomConstructor = {
	roomX: 0,
	roomY: 0,
	
	start: 0,
	end: 0,

	ladderUp: false,
	ladderDown: false,
	hasDoorLeft: false,
}

class MapGenerator {
	getRoom(x, y) {
		let room = JSON.parse(JSON.stringify(roomConstructor));
		room.roomX = x;
		room.roomY = y;
		return room;
	}

	addRoom(room) {
		this.rooms[room.roomY][room.roomX] = room;
	}

	constructor() {
		this.rooms = [];
		for (let i = 0; i < ROOM_Y_BOUNDS; i++) {
			this.rooms[i] = [];
			for (let j = 0; j < ROOM_X_BOUNDS; j++) {
				this.rooms[i][j] = null;
			}
		}

		let startX = Math.round(Math.random() * ROOM_X_BOUNDS);
		let startRoom = this.getRoom(startX, 0);
		startRoom.start = true;
		this.addRoom(startRoom);

		let endY = ROOM_Y_BOUNDS / 2 + Math.round(Math.random() * (ROOM_Y_BOUNDS / 2 - 2));

		let xLeft = startX;
		let xRight = startX;

		for (let i = 1; i < endY; i++) {
			let coords = this.generateRow(xLeft, xRight, i);
			xLeft = coords[0];
			xRight = coords[1];
		}

		let endX = xLeft + Math.round(Math.random() * (xRight - xLeft));
		let endRoom = this.getRoom(endX, endY);
		endRoom.end = true;
		endRoom.ladderUp = true;
		this.rooms[endY - 1][endX].ladderDown = true;
		this.addRoom(endRoom);
	}

	generateRow(startX, endX, yLevel) {
		let originX = startX + Math.round(Math.random() * (endX - startX));
		let left = Math.max(originX - Math.round(Math.random()*ROOMS_SPREAD), 0);
		let right = Math.min(originX + Math.round(Math.random()*ROOMS_SPREAD), ROOM_X_BOUNDS - 1);

		for (var i = left; i <= right; i++) {
			let room = this.getRoom(i, yLevel);
			if (i != left) {
				room.hasDoorLeft = true;
			}
			if (i == originX) {
				room.ladderUp = true;
				this.rooms[yLevel - 1][i].ladderDown = true;
			}
			this.addRoom(room);
		}

		return [left, right];
	}

	getWorld() {
		return this.rooms;
	}
}

module.exports = MapGenerator;
