/// <reference path="../typings/main.d.ts" />
'use strict';

import {socketConnection} from "./socketConnection";
import {player} from "../world/player";
import {world} from "../world/world";

export class connectionManager {
    constructor(serv: SocketIO.Server) {
        var self = this;
        this._sockServer = serv;
        this._sockServer.on('connection', function (socket) {
            var sc = new socketConnection(socket);
            var p = new player(sc);
            //self.onConnection(socketConnection);
        });
    };
    private _sockServer: SocketIO.Server;
}