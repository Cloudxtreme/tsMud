/// <reference path="../typings/main.d.ts" />
'use strict';
var messageBuilder_1 = require("./messageBuilder");
class socketConnection {
    constructor(socket) {
        this._loggedIn = false;
        this._usernameReceived = false;
        this._passwordReceived = false;
        var self = this;
        this._socket = socket;
        this._socket.on('toServer', function (data) {
            self.dataReceived(data);
        });
        this._socket.on('disconnect', function () {
            self.player.state = "linkdead";
            //TODO: force a quit command to remove, or remove on timeout. For now isntantly remove from world on DC
            self.player.leaveWorld();
        });
        this.playerMessage(this.connectionMessage, true);
    }
    ;
    get connectionMessage() {
        var msg = new messageBuilder_1.message("Welcome to jsMud!")
            .addDoubleLineBreak().addText("Please enter your username: ").colorMessage("deepskyblue")
            .formatMessage("bold").toString();
        return msg.toString();
    }
    get socket() { return this._socket; }
    dataReceived(data) {
        if (this._loggedIn) {
            this.player.parseInput(data);
        }
        else {
            if (!this._usernameReceived) {
                this._usernameReceived = true;
                this.playerMessage(new messageBuilder_1.message("Please enter your password:").colorMessage("deepskyblue").toString(), true);
                this.player.name = data.data;
            }
            else {
                this._loggedIn = true;
                this.broadcast(new messageBuilder_1.message(this.player.capName + ' connected').colorMessage("red").toString(), new messageBuilder_1.message('You have logged in').colorMessage("red").toString());
                this.player.enterWorld();
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
    playerMessage(text, gagPrompt) {
        if (gagPrompt)
            this._socket.emit('toPlayer', { data: text });
        else
            this._socket.emit('toPlayer', { data: text + this.getPrompt() });
    }
    ;
    getPrompt() {
        return new messageBuilder_1.message("").addLineBreak().addText(">").toString();
    }
}
exports.socketConnection = socketConnection;
