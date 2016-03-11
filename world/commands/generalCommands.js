'use strict';
var command_1 = require('../command');
var world_1 = require("../world");
var messageBuilder_1 = require("../../server/messageBuilder");
class say extends command_1.command {
    constructor(source, args) {
        super(source, args);
        this.source = source;
        this.args = args;
    }
    doCommand() {
        this.source.broadcast(new messageBuilder_1.message(this.source.capName).addText(" says: ").addText(this.args.join(" ")).toString(), new messageBuilder_1.message("You say: ").addText(this.args.join(" ")).toString());
    }
}
say.handle = "say";
say.help = new messageBuilder_1.message("Echo a command to everyone in the room you are in.").toString();
exports.say = say;
class tell extends command_1.command {
    constructor(source, args) {
        super(source, args);
        this.source = source;
        this.args = args;
        this.processCommand = false;
        //Target's name will be the first arg
        var targetName = args[0];
        //Make sure we actually have text to send
        if (args.length < 2) {
            this.source.playerMessage(new messageBuilder_1.message("What do you wish to tell ").addText(this.target.capName + "?").toString());
        }
        else {
            this.processCommand = true;
            //Remove the target's name from the args
            this.args = args.slice(1);
            var players = world_1.world.players;
            for (var player in players) {
                var p = players[player];
                if (p.name && p.name.toLocaleLowerCase() === targetName.toLocaleLowerCase()) {
                    this.target = p;
                }
            }
            if (!this.target) {
                this.source.playerMessage(new messageBuilder_1.message(targetName).addText(" isn't around to send a tell to").toString());
                this.processCommand = false;
            }
        }
    }
    doCommand() {
        if (this.processCommand) {
            this.target.playerMessage(new messageBuilder_1.message(this.source.capName).addText(" tells you: ").addText(this.args.join(" ")).toString());
            this.source.playerMessage(new messageBuilder_1.message("You tell ").addText(this.target.capName).addText(": ").addText(this.args.join(" ")).toString());
        }
    }
}
tell.handle = "tell";
tell.help = new messageBuilder_1.message("Tell a player a message, that only they can receive.").toString();
exports.tell = tell;
class help extends command_1.command {
    constructor(source, args) {
        super(source, args);
        this.source = source;
        this.args = args;
        var cmd = this.source.getCommand(args[0], source, args);
        if (cmd) {
            this.helptext = new messageBuilder_1.message(cmd.help).toString();
        }
    }
    doCommand() {
        this.source.playerMessage(new messageBuilder_1.message(this.helptext).toString());
    }
}
help.handle = "help";
help.help = new messageBuilder_1.message("Help command").toString();
exports.help = help;
class who extends command_1.command {
    constructor(source, args) {
        super(source, args);
        this.source = source;
        this.args = args;
    }
    doCommand() {
        var msg = new messageBuilder_1.message("----------------Users(" + world_1.world.players.length + ")----------------").addLineBreak();
        for (var i in world_1.world.players) {
            msg.addText(world_1.world.players[i].name).addLineBreak();
        }
        msg.addText("----------------------------------------");
        this.source.playerMessage(msg.toString());
    }
}
who.handle = "who";
who.help = new messageBuilder_1.message("Help command").toString();
exports.who = who;
