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
        //Target's name will be the first arg
        var targetName = args[0];
        
        //Make sure we actually have text to send
        if (args.length < 2) {
            this.source.playerMessage(new message("What do you wish to tell ").addText(this.target.capName + "?").toString());
        }
        else {
            this.processCommand = true;
            //Remove the target's name from the args
            this.args = args.slice(1);
            var players = world.players;
            for (var player in players) {
                var p = players[player];
                if (p.name && p.name.toLocaleLowerCase() === targetName.toLocaleLowerCase()) {
                    this.target = p;
                }
            }
            if (!this.target) {
                this.source.playerMessage(new message(targetName).addText(" isn't around to send a tell to").toString());
                this.processCommand = false;
            }
        }
    }
    private processCommand: boolean = false;
    private target: player;
    public static handle: string = "tell";
    public static help: string = new message("Tell a player a message, that only they can receive.").toString();
    public doCommand() {
        if (this.processCommand) {
            this.target.playerMessage(new message(this.source.capName).addText(" tells you: ").addText(this.args.join(" ")).toString());
            this.source.playerMessage(new message("You tell ").addText(this.target.capName).addText(": ").addText(this.args.join(" ")).toString());
        }
    }
}

export class help extends command implements ImudCommand {
    constructor(public source: player, public args: string[]) {
        super(source, args);
        var cmd = this.source.getCommand(args[0], source, args);
        if (cmd) {
            this.helptext = new message(cmd.help).toString();
        }
    }
    private helptext: string;
    private target: player;
    public static handle: string = "help";
    public static help: string = new message("Help command").toString();
    public doCommand() {
        this.source.playerMessage(new message(this.helptext).toString());
    }
}

export class who extends command implements ImudCommand {
    constructor(public source: player, public args: string[]) {
        super(source, args);
    }
    private helptext: string;
    private target: player;
    public static handle: string = "who";
    public static help: string = new message("Help command").toString();
    public doCommand() {
        var msg = new message("----------------Users("+world.players.length+")----------------").addLineBreak();
        for (var i in world.players) {
            msg.addText(world.players[i].name).addLineBreak();
        }
        msg.addText("----------------------------------------");
        this.source.playerMessage(msg.toString());
    }
}
