import { command } from "./command";
import { socketConnection } from "../server/socketConnection";
import { mudObject } from "../server/mudObject";
export interface iPlayer {
}
export declare class player extends mudObject {
    socketConn: socketConnection;
    constructor(socketConn: socketConnection);
    private _name;
    capName: string;
    name: string;
    state: string;
    absMethod2(): void;
    private socket;
    parseInput(data: any): void;
    connectionMessage: string;
    private getGeneralCommands();
    broadcast(text: string, playerMessage?: string): void;
    playerMessage(text: string): void;
    getCommand(handle: string, player: any, args: any): command;
    enterWorld(): void;
    leaveWorld(): void;
}
