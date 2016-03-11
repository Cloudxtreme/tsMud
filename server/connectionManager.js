/// <reference path="../typings/main.d.ts" />
'use strict';
var socketConnection_1 = require("./socketConnection");
var player_1 = require("../world/player");
class connectionManager {
    constructor(serv) {
        var self = this;
        this._sockServer = serv;
        this._sockServer.on('connection', function (socket) {
            var sc = new socketConnection_1.socketConnection(socket);
            var p = new player_1.player(sc);
            //self.onConnection(socketConnection);
        });
    }
    ;
}
exports.connectionManager = connectionManager;
