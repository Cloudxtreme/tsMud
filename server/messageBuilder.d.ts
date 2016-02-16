export declare class message {
    constructor(init: string);
    toString(): string;
    private textArr;
    addText(text: string): message;
    colorMessage(color: string): message;
    formatMessage(format: string): message;
    addLineBreak(): message;
    addDoubleLineBreak(): message;
}
