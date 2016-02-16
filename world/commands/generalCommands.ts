'use strict';

import {command, ImudCommand} from '../command';
import {player} from "../player";
import {world} from "../world";
import {message} from "../../server/messageBuilder";

export class say extends command implements ImudCommand {
    constructor(public source: player, public args: string[]) {
        super(source, args);
    }
    public static handle: string = "say";
    public static help: string = new message("Echo a command to everyone in the room you are in.").toString();
    public doCommand() {
        this.source.broadcast(new message(this.source.capName).addText(" says: ").addText(this.args.join(" ")).toString(), new message("You say: ").addText(this.args.join(" ")).toString());
    }
}

export class tell extends command implements ImudCommand {
    constructor(public source: player, public args: string[]) {
        super(source, args);
        var targetName = args[0];
        for (var player in world.players) {
            if (world.players[player].name.toLocaleLowerCase() === targetName.toLocaleLowerCase()) {
                this.target = world.players[player];
            }
        }
    }
    private target: player;
    public static handle: string = "tell";
    public static help: string = new message("Tell a player a message, that only they can receive.").toString();
    public doCommand() {
        this.target.playerMessage(new message(this.source.capName).addText(" tells you: ").addText(this.args.join(" ")).toString());
        this.source.playerMessage(new message("You tell ").addText(this.target.capName).addText(": ").addText(this.args.join(" ")).toString());
    }
}