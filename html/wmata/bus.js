class BusStop {
  constructor(stopID, name, lat, lon, routes) {
    this.StopID = stopID;
	this.StopName = name;
	this.Lat = lat;
	this.Lon = lon;
	this.Routes = [];
	for (var r = 0; r < routes.length; r++) {
		this.Routes.push(routes[r]);
	}
	this.BusGroups = {};	
	this.AllBuses = [];
	//this.Routes = {};		
	//this.busProps = new BusProperties();
  }
  //addBus(line, cars, min, destinationCode, destinationName) {
  addBus(vehicleID, tripID, routeID, minutes, directionNum, directionText) {
	 // this.addDestination(destinationCode, destinationName);
	  this.AllBuses.push(new MetroBus(vehicleID, tripID, routeID, minutes, directionNum, directionText));	  
  }
  getBuses() {
	  return this.AllBuses;
  }
  
  
}
/*
class BusGroup {
	constructor(direction, destinationCode, line, group) {
		this.line = line;
		this.group = group;
		
		this.direction = direction;
		this.allDestinations = {};
		this.allTrains = [];
	}  	
  
  addDestination(destinationCode, destinationName) {
	  if (!(destinationCode in this.allDestinations)) {
		  this.allDestinations[destinationCode] = destinationName;
	  }
  }
  
  addTrain(line, cars, min, destinationCode, destinationName) {
	  this.addDestination(destinationCode, destinationName);
	  this.allTrains.push(new MetroTrain(line, cars, min, destinationCode, destinationName));	  
  }
  
  getTrains() {
	  return this.allTrains;
  }
  
  getUniqueDestinations() {
	  var destinations = this.allDestinations;
	  if (Object.keys(destinations).length == 0) {
		  return "";
	  }
	  return Object.keys(destinations).map(function(x){return destinations[x];}).join(', ');
  }  
}
*/

class MetroBus {
	constructor(vehicleID, tripID, routeID, min, directionNum, directionText) {
		this.VehicleID = vehicleID;
		this.TripID = tripID;
		this.RouteID = routeID;
		this.Minutes = min;
		this.DirectionNum = directionNum;
		this.DirectionText = directionText;
	}
}


class BusProperties {
  constructor() {
  }
	getDirection(directionText) {
		if(directionText.toLowerCase().indexOf("north") > -1) {
			return "north";
		}
		if(directionText.toLowerCase().indexOf("south") > -1) {
			return "south";
		}
		if(directionText.toLowerCase().indexOf("east") > -1) {
			return "east";
		}
		if(directionText.toLowerCase().indexOf("west") > -1) {
			return "west";
		}
		return "?";
	}
	getDirectionIcon(direction) {
	  var iconClass = "fas fa-question-circle";	  
	  if (direction == "south") {
		iconClass = "fas fa-angle-double-down";
	  }
	  if (direction == "north") {
		iconClass = "fas fa-angle-double-up";
	  }
	  if (direction == "east") {
		iconClass = "fas fa-angle-double-right";		  
	  }
	  if (direction == "west") {
		iconClass = "fas fa-angle-double-left";		  
	  }
	  return iconClass;
	}
}