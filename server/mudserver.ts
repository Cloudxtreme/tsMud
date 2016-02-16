'use strict';

var	http = require('http');
var socketIO	= require('socket.io');
var fs = require('fs');
var connectionManager = require('./connectionManager');

export class mudServer {
  private handler (req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
  
      res.writeHead(200);
      res.end(data);
    });
  }
    
  public start() {
    var serv = http.createServer(this.handler);  

    serv.listen(process.env.PORT,  process.env.IP);
    
    var socketServer = socketIO(serv);

    new connectionManager.connectionManager(socketServer);

  }
}