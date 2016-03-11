/// <reference path="../typings/main.d.ts" />
/// <reference path="dbAdaptor.d.ts" />
/// <reference path="mudObject.d.ts" />


'use strict';


var sqlite3 = require('sqlite3');
var fn = require('fn');

export class sqlite3Adaptor implements db.IdbAdaptor {
    constructor(private mudObj: mud.mudObject) {
        this.database = new sqlite3.Database('../db/'+this.mudObj.databaseName+'.sqlite');
    }
    private database: any;
    public getTableSchema() {

    }
    public selectOne(attName: string, attValue: string): mud.mudObject {
        var returnObj = Object.create(Object.getPrototypeOf(this.mudObj));
        this.database.get(this.generateSelectStatement(attName, attValue));
        return returnObj;
    }
    public selectAll(): mud.mudObject[] {
        return null;
    }
    public createTable() {
        
    };
    public checkTable() {
        var schema = this.mudObj.attSchema;
        this.database.each('pragma table_info("'+this.mudObj.tableName+'")', function(err, col) {
            var attmatch: boolean = false;
            for (var i in schema) {
                var s: mud.attSchema = schema[i];
                if (col.name.toLocaleLowerCase() === s.name.toLocaleLowerCase()) {
                    attmatch = true;
                    break;
                }
            }
            if (!attmatch)
                throw Error("Invalid schema");
        });
    }
    public openConnection() {
        
    };
    public closeConnection() {
        
    };
    public generateSelectStatement(attName: string, attValue: string): string {
        var sql = "";
        sql += "select * from ";
        sql += this.mudObj.tableName;
        sql += " where " + attName + " = '" + attValue + "'";
        return sql;
    };
    public generateInsertStatement(): string {
        return null;
    };
    public generateUpdateStatement(): string {
        return null;
    };
    public generateDeleteStatement(): string {
        return null;
    };
    public getCommandObject(commandString: string): any {
        
    }
    public executeCommand(cmdObject: any) {
        
    }
}