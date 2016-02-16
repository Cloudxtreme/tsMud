'use strict';
var http = require('http');
var socketIO = require('socket.io');
var fs = require('fs');
var connectionManager = require('./connectionManager');
class mudServer {
    handler(req, res) {
        fs.readFile(__dirname + '/index.html', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
    }
    start() {
        var serv = http.createServer(this.handler);
        serv.listen(process.env.PORT, process.env.IP);
        var socketServer = socketIO(serv);
        new connectionManager.connectionManager(socketServer);
    }
}
exports.mudServer = mudServer;
