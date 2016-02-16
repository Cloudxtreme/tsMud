/// <reference path="../typings/main.d.ts" />
'use strict';
var socketConnection_1 = require("./socketConnection");
var player_1 = require("../world/player");
var world_1 = require("../world/world");
class connectionManager {
    constructor(serv) {
        var self = this;
        this._sockServer = serv;
        this._sockServer.on('connection', function (socket) {
            var sc = new socketConnection_1.socketConnection(socket);
            var p = new player_1.player(sc);
            if (!world_1.world.players)
                world_1.world.players = new Array();
            world_1.world.players.push(p);
            //self.onConnection(socketConnection);
        });
    }
    ;
}
exports.connectionManager = connectionManager;
