import { player } from './player';
export interface ImudCommand {
    handle: string;
    help: string;
    doCommand(): void;
}
export declare class command implements ImudCommand {
    source: player;
    args: string[];
    constructor(source: player, args: string[]);
    handle: string;
    help: string;
    doCommand(): void;
}
