import { player } from "./player";
import { area } from "./area";
export declare class world {
    constructor();
    static areas: area[];
    static players: player[];
    static addPlayer(player: any): void;
    static removePlayer(player: any): void;
}
