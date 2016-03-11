'use strict';

/// <reference path="./worldobj.ts" />

import {player} from "./player";
import {area} from "./area";

export class world {
    constructor() {
    }
    public static areas: area[];
    public static players: player[];
    public static addPlayer(player) {
        if (!world.players)
            world.players = new Array<player>();
        world.players.push(player);
    }
    public static removePlayer(player) {
        if (!world.players)
            world.players = new Array<player>();
        if (world.players.length > 0)
            world.players = world.players.splice(world.players.indexOf(player),1);
    }
}

// export function world() {
//     get players(): player[] {
//         if (!this._players)
//             this._players = new Array<player>();
//         return this._players;
//     }
//     private _players: player[];
    
//     return this;
// }
