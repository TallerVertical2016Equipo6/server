var fs = require('fs');


var singleton = function singleton(){
	var sensor_sockets = {};
	var client_sockets = {};

	this.readFile = function(filename){
		var data = fs.readFileSync(filename, 'utf8');
		return data.split(/[\n\r]+/);
	};

	this.initializeFromFile = function(filename){

		var file = this.readFile(filename);
		var currentArea = '';
		var currentCapacity = 0;
		var currentAvailability = 0;
		var areaObject = {};
		var extraData = JSON.parse(fs.readFileSync('data/extra.json', 'utf8'));
		console.log(extraData);

		file.forEach(function(line){
			data = line.split(',');

			if(data[0] === currentArea){
				currentCapacity++;
				currentAvailability += (data[2] === '1') ? 1 : 0;
			} else { // New area
				if (currentArea !== '') {
					// Create area object
					areaObject['area'] = currentArea;
					areaObject['capacity'] = currentCapacity;
					areaObject['availability'] = currentAvailability;
					
					// Set values for lat, long, desc, etc...
					areaObject['description'] = extraData[currentArea]['description'];
					areaObject['coordinates'] = extraData[currentArea]['coordinates'];
					console.log(areaObject);

					this.add('sensor', currentArea, areaObject);
				}
				
				// Reset variables
				areaObject = {};
				currentArea = data[0];
				currentCapacity = 1;
				currentAvailability = (data[2] === '1') ? 1 : 0;
			}
		}.bind(this));
	};

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
		} else if (type === 'client') {
			if(client_sockets[socketId]){
				delete client_sockets[socketId];
			}
		} else {
			console.warn("Invalid type: %s", type);
		}
	};

	this.get = function(type, id){
		if (type === 'sensor') {
			return sensor_sockets[id];
		} else if (type === 'sensor') {
			return client_sockets[id];
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
	};

	this.updateSensorData = function(id, data){
		for (var d in data) {
			if (data.hasOwnProperty(d)) {
				sensor_sockets[id][d] = data[d]
			}
		}
	};

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
