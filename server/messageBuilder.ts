'use strict';
export class message {
    constructor(init: string) {
        this.textArr = [];
        this.textArr.push(init);
    }
    public toString(): string {
        var returnstr = "<p>";
        for (var i = 0;i < this.textArr.length;i++) {
            returnstr += this.textArr[i];
        }
        return returnstr + "</p>";
    }
    private textArr: Array<string>;
    public addText(text: string): message {
        if (!this.textArr)
            this.textArr = new Array<string>();
        this.textArr.push(text);
        return this;
    }
    public colorMessage(color: string): message {
        var temp = this.textArr[this.textArr.length-1];
        temp = "<span style='color:"+color+"'>"+temp+"</span>";
        this.textArr[this.textArr.length-1] = temp;
        return this;
    }
    public formatMessage(format: string): message {
        var temp = this.textArr[this.textArr.length-1];
        if (format === "bold") {
            temp = "<b>"+temp+"</b>";
        }
        else if (format === "italic") {
            temp = "<b>"+temp+"</b>";
        }
        else if (format === "bolditalic") {
            temp = "<b><i>"+temp+"</i></b>";
        }
        else if (format === "normal") {
            temp.replace("<b>","").replace("</b>", "").replace("<i>","").replace("</i>", "")
        }
        this.textArr[this.textArr.length-1] = temp;
        return this;
    }
    public addLineBreak(): message {
        var temp = this.textArr[this.textArr.length-1];
        temp += "</br>";
        this.textArr[this.textArr.length-1] = temp;
        return this;
    }
    public addDoubleLineBreak(): message {
        var temp = this.textArr[this.textArr.length-1];
        temp += "</br></br>";
        this.textArr[this.textArr.length-1] = temp;
        return this;
    }
}