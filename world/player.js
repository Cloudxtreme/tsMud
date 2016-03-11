'use strict';
var world_1 = require("./world");
var messageBuilder_1 = require("../server/messageBuilder");
var mudObject_1 = require("../server/mudObject");
var generalCommands = require("./commands/generalCommands");
class player extends mudObject_1.mudObject {
    constructor(socketConn) {
        this.socketConn = socketConn;
        //super();
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
    absMethod2() {
    }
    parseInput(data) {
        var foundCommand = false;
        var input = data.data;
        var inputCmd = input.split(" ")[0];
        var args = input.split(" ").slice(1);
        var cmd = this.getCommand(inputCmd, this, args);
        if (cmd) {
            cmd.doCommand();
        }
        else {
            this.playerMessage(new messageBuilder_1.message("Command '").addText(inputCmd).addText("' does not exist, please try again.").toString());
        }
    }
    get connectionMessage() {
        var msg = new messageBuilder_1.message("Welcome, ").addText(this.capName).colorMessage("yellow").toString();
        return msg.toString();
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
    getCommand(handle, player, args) {
        var commandList = this.getGeneralCommands();
        for (var cmd in commandList) {
            if (commandList[cmd].handle.toLocaleLowerCase() === handle.toLocaleLowerCase()) {
                return new commandList[cmd](player, args);
            }
        }
        return;
    }
    enterWorld() {
        world_1.world.addPlayer(this);
        this.state = "active";
    }
    leaveWorld() {
        world_1.world.removePlayer(this);
    }
}
exports.player = player;
