'use strict';
class message {
    constructor(init) {
        this.textArr = [];
        this.textArr.push(init);
    }
    toString() {
        var returnstr = "<div>";
        for (var i = 0; i < this.textArr.length; i++) {
            returnstr += this.textArr[i];
        }
        return returnstr + "</div>";
    }
    addText(text) {
        if (!this.textArr)
            this.textArr = new Array();
        this.textArr.push(text);
        return this;
    }
    colorMessage(color) {
        var temp = this.textArr[this.textArr.length - 1];
        temp = "<span style='color:" + color + "'>" + temp + "</span>";
        this.textArr[this.textArr.length - 1] = temp;
        return this;
    }
    formatMessage(format) {
        var temp = this.textArr[this.textArr.length - 1];
        if (format === "bold") {
            temp = "<b>" + temp + "</b>";
        }
        else if (format === "italic") {
            temp = "<b>" + temp + "</b>";
        }
        else if (format === "bolditalic") {
            temp = "<b><i>" + temp + "</i></b>";
        }
        else if (format === "normal") {
            temp.replace("<b>", "").replace("</b>", "").replace("<i>", "").replace("</i>", "");
        }
        this.textArr[this.textArr.length - 1] = temp;
        return this;
    }
    addLineBreak() {
        var temp = this.textArr[this.textArr.length - 1];
        temp += "</br>";
        this.textArr[this.textArr.length - 1] = temp;
        return this;
    }
    addDoubleLineBreak() {
        var temp = this.textArr[this.textArr.length - 1];
        temp += "</br></br>";
        this.textArr[this.textArr.length - 1] = temp;
        return this;
    }
}
exports.message = message;
