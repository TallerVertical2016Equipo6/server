// This object contains the data from all sensors
var sockets = require("../sockets.js");

exports = module.exports = function(io){
    io.of('/sensor').on('connection', function(socket){
        console.log('Sensor connected');

        //sockets.add('sensor', socket.id, socket);

        socket.on('initialize', function(data){
            console.log('initialize data:');
            console.log(data['area']);

            io.of('/sensor').to(socket.id).emit('initialize', sockets.get('sensor', data['area']))

            //sockets.add('sensor', socket.id, data)
        });

        socket.on('signal', function(data){
            console.log('Signal:');
            console.log(data);
            
            // Update information on the sockets array
            sockets.updateSensorData(data['area'], data);

            // Send signal to all clients...
            io.of('/client').emit('signal', data);
        });

        socket.on('disconnect', function(){
            console.log('sensor disconnected');
            sockets.delete('sensor', socket.id)
        });
    });
}
