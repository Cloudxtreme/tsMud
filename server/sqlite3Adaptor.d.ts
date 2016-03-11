/// <reference path="../typings/main.d.ts" />
/// <reference path="dbAdaptor.d.ts" />
/// <reference path="mudObject.d.ts" />
export declare class sqlite3Adaptor implements db.IdbAdaptor {
    constructor(mudObj: mud.mudObject);
    private database;
    getTableSchema(): void;
    selectOne(attName: string, attValue: string): mud.mudObject;
    selectAll(): mud.mudObject[];
    createTable(): void;
    checkTable(): void;
    openConnection(): void;
    closeConnection(): void;
    generateSelectStatement(attName: string, attValue: string): string;
    generateInsertStatement(): string;
    generateUpdateStatement(): string;
    generateDeleteStatement(): string;
    getCommandObject(commandString: string): any;
    executeCommand(cmdObject: any): void;
}
