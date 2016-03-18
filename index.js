var http = require('http').Server();
var io = require('socket.io')(http);

var sockets = require("./sockets.js");
sockets.initializeFromFile('data/OcupacionEstacionamientoIndividual.csv');

var clientController = require('./controllers/client-controller')(io);
var sensorController = require('./controllers/sensor-controller')(io);

// Middleware goes here...

http.listen(8000, function(){
    console.log('listening on *:8000');
});