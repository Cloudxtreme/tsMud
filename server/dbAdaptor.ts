/// <reference path="mudObject.d.ts" />
'use strict';

module db {
    export interface IdbAdaptor {
        selectOne(attName: string, attValue: string): mud.mudObject;
        selectAll(): mud.mudObject[];
        createTable();
        getTableSchema();
        checkTable();
        openConnection();
        closeConnection();
        generateSelectStatement(attName: string, attValue: string): string;
        generateInsertStatement(): string;
        generateUpdateStatement(): string;
        generateDeleteStatement(): string;
    }
}