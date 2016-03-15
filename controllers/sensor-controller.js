var sockets = require("../sockets.js");

exports = module.exports = function(io){
    io.of('/sensor').on('connection', function(socket){
        console.log('Sensor connected');

        sockets.add('sensor', socket.id, socket)

        socket.on('signal', function(data){
            console.log(data);
            // Send signal to all clients...
            io.of('/client').emit('signal', data);
        });

        socket.on('disconnect', function(){
            console.log('sensor disconnected');
            sockets.delete('sensor', socket.id)
        });
    });
}