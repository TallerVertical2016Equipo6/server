// This object contains the data from all sensors
var sockets = require("../sockets.js");

exports = module.exports = function(io){
	io.of('/client').on('connection', function(socket){

        console.log('client connected');
        // Set initial state
	var sensors = sockets.getSocketList('sensor'); // Object {"socked_id": {Object}, {"socket_id": {Object}}}
        var sensors_array = [];
        sensors_array = Object.keys(sensors).map(function(key){return sensors[key]});
        
	io.of('/client').to(socket.id).emit('initialize', sensors_array); 

        socket.on('disconnect', function(){
            console.log('client disconnected');
        });    
    });
}
