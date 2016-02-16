'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var command_1 = require('../command');
var messageBuilder_1 = require("../../server/messageBuilder");
var tell = (function (_super) {
    __extends(tell, _super);
    function tell(source, args) {
        _super.call(this, source, args);
        this.source = source;
        this.args = args;
        this.handle = "tell";
        this.help = new messageBuilder_1.message("Tell a player a message, that only they can receive.").toString();
        this.doCommand();
    }
    tell.prototype.doCommand = function () {
        this.source.broadcast(new messageBuilder_1.message(this.source.capName).addText(" says: ").addText(this.args.join(" ")).toString(), new messageBuilder_1.message("You say: ").addText(this.args.join(" ")).toString());
    };
    return tell;
})(command_1.command);
exports.tell = tell;
