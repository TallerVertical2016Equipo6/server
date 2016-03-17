// This object contains the data from all sensors
var sockets = require("../sockets.js");

exports = module.exports = function(io){
	io.of('/client').on('connection', function(socket){
		// Set initial state
		io.to(socket.id).emit('connected', 'initial data');
        io.to(socket.id).emit('initialize client', sockets.getSocketList('sensor'));

        console.log('client connected')

        socket.on('custom_event', function(data){
        	console.log(data);
        });

        socket.on('disconnect', function(){
            console.log('client disconnected');
        });     
    });
}