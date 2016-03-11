/// <reference path="../typings/main.d.ts" />

'use strict';

import {message} from "./messageBuilder";
import {player} from "../world/player";

export interface IsocketConnection {
    socket: SocketIO.Socket;
    
}

export class socketConnection {
    constructor(socket: SocketIO.Socket) {
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
    };
    
    private get connectionMessage(): string { 
        var msg = new message("Welcome to jsMud!")
            .addDoubleLineBreak().addText("Please enter your username: ").colorMessage("deepskyblue")
            .formatMessage("bold").toString();
        return msg.toString();
    }

    private _socket: SocketIO.Socket;
    get socket(): SocketIO.Socket { return this._socket; }

    private _loggedIn: boolean = false;
    private _usernameReceived: boolean = false;
    private _passwordReceived: boolean = false;
    
    public player: player;

    public dataReceived(data) {
        if (this._loggedIn) {
            this.player.parseInput(data);
        }
        else {
            if (!this._usernameReceived) {
                this._usernameReceived = true;
                this.playerMessage(new message("Please enter your password:").colorMessage("deepskyblue").toString(), true);
                this.player.name = data.data;
            }
            else {
                this._loggedIn = true;
                this.broadcast(new message(this.player.capName + ' connected').colorMessage("red").toString(),new message('You have logged in').colorMessage("red").toString());
                this.player.enterWorld();
            }
        }
    };

    public broadcast(text: string, playerMessage?: string) {
        this._socket.broadcast.emit('toPlayer', {data: text});
        if (playerMessage)
            this.playerMessage(playerMessage);
    };

    public playerMessage(text: string, gagPrompt?: boolean) {
        if (gagPrompt)
            this._socket.emit('toPlayer', {data: text});
        else
            this._socket.emit('toPlayer', {data: text+this.getPrompt()});
    };
    
    private getPrompt(): string {
        return new message("").addLineBreak().addText(">").toString()
    }
}