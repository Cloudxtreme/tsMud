'use strict';

import {player} from "./player";
import {area} from "./area";

export class world {
    constructor() {
        world.areas = new Array<area>();
        world.players = new Array<player>();
    }
    public static areas: area[];
    public static players: player[]
}