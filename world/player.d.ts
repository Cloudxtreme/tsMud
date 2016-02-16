import { living } from "./living";
import { socketConnection } from "../server/socketConnection";
export declare class player extends living {
    socketConn: socketConnection;
    constructor(socketConn: socketConnection);
    private _name;
    capName: string;
    name: string;
    private socket;
    parseInput(data: any): void;
    private getGeneralCommands();
    broadcast(text: string, playerMessage?: string): void;
    playerMessage(text: string): void;
}
