/// <reference path="../typings/main.d.ts" />
'use strict';
var messageBuilder_1 = require("./messageBuilder");
class socketConnection {
    constructor(socket) {
        this._socketid = "";
        this._loggedIn = false;
        this._usernameReceived = false;
        this._passwordReceived = false;
        var self = this;
        this._socket = socket;
        this.playerMessage(this.loginMessage);
        this._socket.on('toServer', function (data) {
            self.dataReceived(data);
        });
        //this._socket.on('disconnect', function (data) {
        //self.onDisconnect(this);
        //});
    }
    ;
    get loginMessage() {
        var msg = new messageBuilder_1.message("Welcome to jsMud!")
            .addDoubleLineBreak().addText("Please enter your username: ").colorMessage("deepskyblue")
            .formatMessage("bold").toString();
        return msg.toString();
    }
    get socket() { return this._socket; }
    get socketid() { return this._socketid; }
    get username() {
        return this._username;
    }
    dataReceived(data) {
        if (this._loggedIn) {
            this.player.parseInput(data);
        }
        else {
            if (!this._usernameReceived) {
                this._usernameReceived = true;
                this.playerMessage(new messageBuilder_1.message("Please enter your password.").colorMessage("deepskyblue").toString());
                this._username = data.data;
                this.player.name = data.data;
            }
            else {
                this._loggedIn = true;
                this.broadcast(new messageBuilder_1.message(this._username + ' connected').colorMessage("red").toString(), new messageBuilder_1.message('You have logged in').colorMessage("red").toString());
            }
        }
    }
    ;
    broadcast(text, playerMessage) {
        this._socket.broadcast.emit('toPlayer', { data: text });
        if (playerMessage)
            this.playerMessage(playerMessage);
    }
    ;
    roomMessage(text, room) {
        this._socket.to(room).emit('toPlayer', { data: text });
    }
    ;
    channelMessage(text, channel) {
        this.roomMessage(text, channel);
    }
    ;
    privateMessage(text, player) {
        this.roomMessage(text, player.socket.id);
    }
    ;
    playerMessage(text) {
        this._socket.emit('toPlayer', { data: text });
    }
    ;
}
exports.socketConnection = socketConnection;
