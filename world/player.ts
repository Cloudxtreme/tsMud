'use strict';

import {living} from "./living";
import {command} from "./command";
import {socketConnection} from "../server/socketConnection";
import generalCommands = require("./commands/generalCommands");

export class player extends living {
    constructor(public socketConn: socketConnection) {
        super();
        this.socket = socketConn;
        this.socket.player = this;
    }
    
    private _name: string;
    get capName(): string {
        return this._name.slice(0,1).toLocaleUpperCase() + this._name.slice(1);
    }
    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }
    
    private socket: socketConnection;
    
    public parseInput(data): void {
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
            this.playerMessage(new message("Command: ").addText(cmd).addText(" does not exist, please try again."))
        }
    }
    
    private getGeneralCommands(): any {
        return generalCommands;
    }
    
    public broadcast(text: string, playerMessage?: string) {
        this.socket.broadcast(text, playerMessage);
    };

       public playerMessage(text: string) {
        this.socket.playerMessage(text);
    };
    
}