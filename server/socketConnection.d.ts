/// <reference path="../typings/main.d.ts" />
import { player } from "../world/player";
export interface IsocketConnection {
    socket: SocketIO.Socket;
}
export declare class socketConnection {
    constructor(socket: SocketIO.Socket);
    loginMessage: string;
    private _socket;
    socket: SocketIO.Socket;
    private _socketid;
    socketid: String;
    private _loggedIn;
    private _usernameReceived;
    private _passwordReceived;
    player: player;
    private _username;
    username: string;
    dataReceived(data: any): void;
    broadcast(text: string, playerMessage?: string): void;
    private roomMessage(text, room);
    channelMessage(text: any, channel: any): void;
    privateMessage(text: any, player: any): void;
    playerMessage(text: string): void;
}
