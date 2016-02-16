'use strict';

import {player} from './player';

export interface ImudCommand {
    handle: string;
    help: string;
    doCommand(): void;
}

export class command implements ImudCommand {
    constructor(public source: player, public args: string[]) {
        
    }
    public handle: string;
    public help: string;
    public doCommand() {};

}
