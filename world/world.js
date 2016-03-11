'use strict';
class world {
    constructor() {
    }
    static addPlayer(player) {
        if (!world.players)
            world.players = new Array();
        world.players.push(player);
    }
    static removePlayer(player) {
        if (!world.players)
            world.players = new Array();
        if (world.players.length > 0)
            world.players = world.players.splice(world.players.indexOf(player), 1);
    }
}
exports.world = world;
// export function world() {
//     get players(): player[] {
//         if (!this._players)
//             this._players = new Array<player>();
//         return this._players;
//     }
//     private _players: player[];
//     return this;
// }
