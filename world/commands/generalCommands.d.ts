import { command, ImudCommand } from '../command';
import { player } from "../player";
export declare class say extends command implements ImudCommand {
    source: player;
    args: string[];
    constructor(source: player, args: string[]);
    static handle: string;
    static help: string;
    doCommand(): void;
}
export declare class tell extends command implements ImudCommand {
    source: player;
    args: string[];
    constructor(source: player, args: string[]);
    private target;
    static handle: string;
    static help: string;
    doCommand(): void;
}
