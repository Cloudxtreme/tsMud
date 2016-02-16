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
        this.playerMessage(this.loginMessage);
        this._socket.on('toServer', function (data) {
            self.dataReceived(data);
        });
        //this._socket.on('disconnect', function (data) {
            //self.onDisconnect(this);
        //});
    };

    get loginMessage(): string { 
        var msg = new message("Welcome to jsMud!")
            .addDoubleLineBreak().addText("Please enter your username: ").colorMessage("deepskyblue")
            .formatMessage("bold").toString();
        return msg.toString();
    }

    private _socket: SocketIO.Socket;
    get socket(): SocketIO.Socket { return this._socket; }

    private _socketid: String = "";
    get socketid(): String { return this._socketid; }

    private _loggedIn: boolean = false;
    private _usernameReceived: boolean = false;
    private _passwordReceived: boolean = false;
    
    public player: player;

    private _username: string;
    get username(): string {
        return this._username;
    }
    

    public dataReceived(data) {
        if (this._loggedIn) {
            this.player.parseInput(data);
        }
        else {
            if (!this._usernameReceived) {
                this._usernameReceived = true;
                this.playerMessage(new message("Please enter your password.").colorMessage("deepskyblue").toString());
                this._username = data.data;
                this.player.name = data.data;
            }
            else {
                this._loggedIn = true;
                this.broadcast(new message(this._username + ' connected').colorMessage("red").toString(),new message('You have logged in').colorMessage("red").toString());
            }
        }
    };

    public broadcast(text: string, playerMessage?: string) {
        this._socket.broadcast.emit('toPlayer', {data: text});
        if (playerMessage)
            this.playerMessage(playerMessage);
    };

    private roomMessage(text, room) {
        this._socket.to(room).emit('toPlayer', {data: text});
    };

    public channelMessage(text, channel) {
        this.roomMessage(text, channel);
    };

    public privateMessage(text, player) {
        this.roomMessage(text, player.socket.id);
    };

    public playerMessage(text: string) {
        this._socket.emit('toPlayer', {data: text});
    };
    

    
    //private getCommands(): Array<command> {
        //var commandList = new Array<command>();
        //commandList = commandList.concat(this.getPathCommands());
        //commandList = commandList.concat(this.getItemCommands());
        //commandList = commandList.concat(this.getRoomCommands());
    //}
}