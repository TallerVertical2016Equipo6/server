var singleton = function singleton(){
	var sensor_sockets = {};
	var client_sockets = {};

	this.add = function(type, socketId, socket){
		if (type === 'sensor') {
			if(!sensor_sockets[socketId]){
				sensor_sockets[socketId] = socket;
			}
		} else if (type === 'client') {	
			if(!client_sockets[socketId]){
				client_sockets[socketId] = socket;
			}
		} else {
			console.warn("Invalid type: %s", type);
		}
	};

	this.delete = function(type, socketId){
		if (type === 'sensor') {
			if(sensor_sockets[socketId]){
				delete sensor_sockets[socketId];
			}
		} else if (type === 'sensor') {
			if(client_sockets[socketId]){
				delete client_sockets[socketId];
			}
		} else {
			console.warn("Invalid type: %s", type);
		}
	};

	this.getSocketList = function(type){
		if(type === 'sensor'){
			return sensor_sockets;
		} else if (type === 'client'){
			return client_sockets;
		} else {
			console.warn("Invalid type: %s", type);
			return null;
		}
	}

	if(singleton.caller != singleton.getInstance){
		throw new Error("This object cannot be instanciated");
	}
}

/*
Singleton class definition
*/
singleton.instance = null;

singleton.getInstance = function(){
	if(this.instance === null){
		this.instance = new singleton();
	}
	return this.instance
}

module.exports = singleton.getInstance()
