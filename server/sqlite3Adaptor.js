/// <reference path="../typings/main.d.ts" />
/// <reference path="dbAdaptor.d.ts" />
/// <reference path="mudObject.d.ts" />
'use strict';
var sqlite3 = require('sqlite3');
var fn = require('fn');
class sqlite3Adaptor {
    constructor(mudObj) {
        this.database = new sqlite3.Database('../db/' + this.mudObj.databaseName + '.sqlite');
    }
    getTableSchema() {
    }
    selectOne(attName, attValue) {
        var returnObj = Object.create(Object.getPrototypeOf(this.mudObj));
        this.database.get(this.generateSelectStatement(attName, attValue));
        return returnObj;
    }
    selectAll() {
        return null;
    }
    createTable() {
    }
    ;
    checkTable() {
        var schema = this.mudObj.attSchema;
        this.database.each('pragma table_info("' + this.mudObj.tableName + '")', function (err, col) {
            var attmatch = false;
            for (var i in schema) {
                var s = schema[i];
                if (col.name.toLocaleLowerCase() === s.name.toLocaleLowerCase()) {
                    attmatch = true;
                    break;
                }
            }
            if (!attmatch)
                throw Error("Invalid schema");
        });
    }
    openConnection() {
    }
    ;
    closeConnection() {
    }
    ;
    generateSelectStatement(attName, attValue) {
        var sql = "";
        sql += "select * from ";
        sql += this.mudObj.tableName;
        sql += " where " + attName + " = '" + attValue + "'";
        return sql;
    }
    ;
    generateInsertStatement() {
        return null;
    }
    ;
    generateUpdateStatement() {
        return null;
    }
    ;
    generateDeleteStatement() {
        return null;
    }
    ;
    getCommandObject(commandString) {
    }
    executeCommand(cmdObject) {
    }
}
exports.sqlite3Adaptor = sqlite3Adaptor;
