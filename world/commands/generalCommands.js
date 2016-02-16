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
        var targetName = args[0];
        for (var player in world_1.world.players) {
            if (world_1.world.players[player].name.toLocaleLowerCase() === targetName.toLocaleLowerCase()) {
                this.target = world_1.world.players[player];
            }
        }
    }
    doCommand() {
        this.target.playerMessage(new messageBuilder_1.message(this.source.capName).addText(" tells you: ").addText(this.args.join(" ")).toString());
        this.source.playerMessage(new messageBuilder_1.message("You tell ").addText(this.target.capName).addText(": ").addText(this.args.join(" ")).toString());
    }
}
tell.handle = "tell";
tell.help = new messageBuilder_1.message("Tell a player a message, that only they can receive.").toString();
exports.tell = tell;
