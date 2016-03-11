/// <reference path="../typings/main.d.ts" />
import { player } from "../world/player";
export interface IsocketConnection {
    socket: SocketIO.Socket;
}
export declare class socketConnection {
    constructor(socket: SocketIO.Socket);
    private connectionMessage;
    private _socket;
    socket: SocketIO.Socket;
    private _loggedIn;
    private _usernameReceived;
    private _passwordReceived;
    player: player;
    dataReceived(data: any): void;
    broadcast(text: string, playerMessage?: string): void;
    playerMessage(text: string, gagPrompt?: boolean): void;
    private getPrompt();
}
