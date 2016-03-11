'use strict';

/// <reference path="living.d.ts" />

//import {living} from "./living";
import {command} from "./command";
import {world} from "./world";
import {socketConnection} from "../server/socketConnection";
import {message} from "../server/messageBuilder";
import {mudObject} from "../server/mudObject";
import generalCommands = require("./commands/generalCommands");

export interface iPlayer {
    
}

export class player extends mudObject {
    constructor(public socketConn: socketConnection) {
        //super();
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
    
    public state: string;
    
    public absMethod2() {
        
    }
    
    private socket: socketConnection;
    
    public parseInput(data): void {
        var foundCommand = false;
        var input = data.data;
        var inputCmd = input.split(" ")[0];
        var args = input.split(" ").slice(1);
        var cmd: any = this.getCommand(inputCmd, this, args);
        if (cmd) {
            cmd.doCommand();
        } else {
            this.playerMessage(new message("Command '").addText(inputCmd).addText("' does not exist, please try again.").toString())
        }
    }
    
    get connectionMessage(): string { 
        var msg = new message("Welcome, ").addText(this.capName).colorMessage("yellow").toString();
        return msg.toString();
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
    
    public getCommand(handle: string, player, args): command {
        var commandList = this.getGeneralCommands();
        for (var cmd in commandList) {
            if (commandList[cmd].handle.toLocaleLowerCase() === handle.toLocaleLowerCase()) {
                return new commandList[cmd](player, args);
            }
        }
        return;
    }
    
    public enterWorld() {
        world.addPlayer(this);
        this.state = "active";
    }
    
    public leaveWorld() {
        world.removePlayer(this);
    }
}