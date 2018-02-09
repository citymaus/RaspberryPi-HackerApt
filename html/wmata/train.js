class MetroStation {
  constructor(locationName) {
    this.locationName = locationName;
	this.locationCodes = {};		
	this.trainGroup = {};		// Group:"1", class TrainGroup
	this.openingTime = "";
	this.firstTrains = {};
	this.lastTrains = {};
	this.trainProps = new TrainProperties();
  }
  
  addLocationCode(locationCode) {
	  if (!(locationCode in this.locationCodes)) {	
		this.locationCodes[locationCode] = this.locationName;
	  }	  
  }  
  addTrain(line, cars, min, destinationCode, destinationName, group) {
	 var direction = this.trainProps.getLineDirection(destinationCode);
	 if (this.trainGroup.length == 0 || !(direction in this.trainGroup)) {
		  this.trainGroup[direction] = new TrainGroup(direction, destinationCode, line, group);
	  }
	  var trainTrack = this.trainGroup[direction];	  
	  trainTrack.addTrain(line, cars, min, destinationCode, destinationName);
  }
  addEndTrain(type, time, destinationCode, destinationName, destinationLines) {
	  var train = new EndMetroTrain(type, time, destinationCode, destinationName, destinationLines);
	  if (type == "First") {
		  this.firstTrains[train.Direction] = train;
	  } else {
		  this.lastTrains[train.Direction] = train;
	  }
  }
  getTrains(direction) {
	  var trains = [];
	  for (var group in this.trainGroup) {
		if (this.trainGroup[group].direction == direction) {
			trains = this.trainGroup[group].getTrains();
		}
	  }
	  return trains;
  }
  getLocationCodes() {
	  var locationCodes = this.locationCodes;
	  if (Object.keys(locationCodes).length == 0) {
		  return "";
	  }
	  return Object.keys(locationCodes).map(function(x){return x;}).join(', ');
  }
  getDestinations(direction) {
	  for (var group in this.trainGroup) {
		if (this.trainGroup[group].direction == direction) {
			return this.trainGroup[group].getUniqueDestinations();
		}
	  }
	  return "";
  }
}

class TrainGroup {
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

class MetroTrain {
	constructor(line, cars, min, destinationCode, destinationName) {
		this.Line = line;
		this.Cars = cars;
		this.Min = min;
		this.DestinationCode = destinationCode;
		this.DestinationName = destinationName;
	}
}

class EndMetroTrain {
	constructor(type, time, destinationCode, destinationName, destinationLines) {
		this.Type = type;
		this.Time = time;
		this.DestinationCode = destinationCode;
		this.DestinationName = destinationName;
		this.DestinationLines = destinationLines;
		this.trainProps = new TrainProperties();
		this.Direction = this.trainProps.getLineDirection(destinationCode);
	}	
}

/* -------------------------------------------------------------------- 
* STATIC METRO VALUES 
* ---------------------------------------------------------------------
*/

class TrainProperties {
  constructor() {
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
	
	getLineDirection(destinationCode) {	 
		var direction = "";
		var northDestinations = {
			"E06": "Fort Totten",
			"E10": "Greenbelt"
		};
		var southDestinations = {
			"F11": "Branch Ave",
			"C15": "Huntington"
		};
		var eastDestinations = {
			"B11": "Glenmont",
			"B08": "Silver Spring",
			"D13": "New Carrollton",
			"G05": "Largo Town Center"
		};
		var westDestinations = {
			"A15": "Shady Grove",
			"A11": "Grosvenor-Strathmore",
			"N06": "Wiehle-Reston East",
			"K08": "Vienna",
			"J03": "Franconia-Springfield"
		};

		if (destinationCode in northDestinations) {
			direction = "north"; 
		}
		if (destinationCode in southDestinations) {
			direction = "south"; 
		}
		if (destinationCode in eastDestinations) {
			direction = "east"; 
		}
		if (destinationCode in westDestinations) {
			direction = "west"; 
		}
		return direction;
	}
}