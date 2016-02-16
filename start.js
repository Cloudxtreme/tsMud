'use strict';

//require('typescript-require');
//var testf = require('./server/test');
//testf.testMod.testFuncA('asdfdsfs');
var mudserv = require('./server/mudserver');

var serv = new mudserv.mudServer();



serv.start();