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
    private processCommand;
    private target;
    static handle: string;
    static help: string;
    doCommand(): void;
}
export declare class help extends command implements ImudCommand {
    source: player;
    args: string[];
    constructor(source: player, args: string[]);
    private helptext;
    private target;
    static handle: string;
    static help: string;
    doCommand(): void;
}
export declare class who extends command implements ImudCommand {
    source: player;
    args: string[];
    constructor(source: player, args: string[]);
    private helptext;
    private target;
    static handle: string;
    static help: string;
    doCommand(): void;
}
