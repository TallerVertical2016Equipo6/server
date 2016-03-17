// This object contains the data from all sensors
var sockets = require("../sockets.js");

exports = module.exports = function(io){
	io.of('/client').on('connection', function(socket){

        console.log('client connected');
        // Set initial state
        io.of('/client').to(socket.id).emit('initialize', sockets.getSocketList('sensor')); 

        socket.on('disconnect', function(){
            console.log('client disconnected');
        });    
    });
}