'use strict';

//require('typescript-require');
//var testf = require('./server/test');
//testf.testMod.testFuncA('asdfdsfs');
var mudserv = require('./server/mudserver');

var sqlite3 = require('sqlite3');

var fs = require('fs');

try {
    fs.statSync('./db/players.sqlite');
} 
catch(err) {
    fs.writeFileSync('./db/players.sqlite', '');
}

var worlddb = new sqlite3.Database('./db/world.sqlite');
var playerdb = new sqlite3.Database('./db/players.sqlite');

worlddb.serialize(function() {
    playerdb.serialize(function() {
        playerdb.run("create table if not exists player (name TEXT NOT NULL PRIMARY KEY UNIQUE, maxhp INTEGER NOT NULL, curhp INTEGER NOT NULL, maxsp INTEGER NOT NULL, cursp INTEGER NOT NULL, str INTEGER NOT NULL, con INTEGER NOT NULL, dex INTEGER NOT NULL, int INTEGER NOT NULL, wis INTEGER NOT NULL, luck INTEGER NOT NULL)");
        playerdb.run("insert into player values ('cde',100,100,100,100)", function(err, ob) {
            if (!err)
                debugger;
            var b  = playerdb.all("select * from player where name = 'bcd'");
            debugger;
            var x = this;
            
        }).all("select * from player where name = 'cde'", function(err, rows) {
            debugger;
        });
        // playerdb.each("pragma table_info('player')", function(err, row) {
        //     var x = row;
        // })
    })
    
    worlddb.run("create table if not exists area (name TEXT NOT NULL PRIMARY KEY UNIQUE, maxhp INTEGER NOT NULL, curhp INTEGER NOT NULL, maxsp INTEGER NOT NULL, cursp INTEGER NOT NULL)");
    worlddb.run("create table if not exists room (name TEXT NOT NULL PRIMARY KEY UNIQUE, maxhp INTEGER NOT NULL, curhp INTEGER NOT NULL, maxsp INTEGER NOT NULL, cursp INTEGER NOT NULL)");
})

worlddb.close();

var serv = new mudserv.mudServer();

serv.start();