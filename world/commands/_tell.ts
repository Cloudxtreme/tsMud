'use strict';

import {command, ImudCommand} from '../command';
import {player} from "../player";
import {message} from "../../server/messageBuilder";

export class tell extends command implements ImudCommand {
    constructor(public source: player, public args: string[]) {
        super(source, args);
        this.doCommand();
    }
    private target: any;
    public handle: string = "tell";
    public help: string = new message("Tell a player a message, that only they can receive.").toString();
    public doCommand() {
        this.source.broadcast(new message(this.source.capName).addText(" says: ").addText(this.args.join(" ")).toString(), new message("You say: ").addText(this.args.join(" ")).toString());
    }
}