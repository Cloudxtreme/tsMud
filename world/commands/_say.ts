'use strict';

import {command, ImudCommand} from '../command';
import {player} from "../player";
import {message} from "../../server/messageBuilder";

export class say extends command implements ImudCommand {
    constructor(public source: player, public args: string[]) {
        super(source, args);
        this.doCommand();
    }
    public static handle: string = "say";
    public static help: string = new message("Echo a command to everyone in the room you are in.").toString();
    public doCommand() {
        this.source.broadcast(new message(this.source.capName).addText(" says: ").addText(this.args.join(" ")).toString(), new message("You say: ").addText(this.args.join(" ")).toString());
    }
}