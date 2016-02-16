'use strict';
var living_1 = require("./living");
var generalCommands = require("./commands/generalCommands");
class player extends living_1.living {
    constructor(socketConn) {
        super();
        this.socketConn = socketConn;
        this.socket = socketConn;
        this.socket.player = this;
    }
    get capName() {
        return this._name.slice(0, 1).toLocaleUpperCase() + this._name.slice(1);
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    parseInput(data) {
        var foundCommand = false;
        var input = data.data;
        var inputCmd = input.split(" ")[0];
        var args = input.split(" ").slice(1);
        var commandList = this.getGeneralCommands();
        for (var cmd in commandList) {
            if (commandList[cmd].handle.toLocaleLowerCase() === inputCmd.toLocaleLowerCase()) {
                var cmd = new commandList[cmd](this, args);
                cmd.doCommand();
                foundCommand = true;
                break;
            }
        }
        if (!foundCommand) {
            this.playerMessage(new message("Command: ").addText(cmd).addText(" does not exist, please try again."));
        }
    }
    getGeneralCommands() {
        return generalCommands;
    }
    broadcast(text, playerMessage) {
        this.socket.broadcast(text, playerMessage);
    }
    ;
    playerMessage(text) {
        this.socket.playerMessage(text);
    }
    ;
}
exports.player = player;
