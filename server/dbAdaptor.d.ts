/// <reference path="mudObject.d.ts" />
declare module db {
    interface IdbAdaptor {
        selectOne(attName: string, attValue: string): mud.mudObject;
        selectAll(): mud.mudObject[];
        createTable(): any;
        getTableSchema(): any;
        checkTable(): any;
        openConnection(): any;
        closeConnection(): any;
        generateSelectStatement(attName: string, attValue: string): string;
        generateInsertStatement(): string;
        generateUpdateStatement(): string;
        generateDeleteStatement(): string;
    }
}
