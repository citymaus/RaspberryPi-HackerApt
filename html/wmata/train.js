  /*
		Car:"6"
		Destination:"Ft.Tottn"
		DestinationCode:"E06"
		DestinationName:"Fort Totten"
		Group:"1"
		Line:"YL"
		LocationCode:"E04"
		LocationName:"Columbia Heights"
		Min:"BRD"
  */
class MetroStation {
  constructor(locationName, locationCode) {
    this.locationName = locationName;
    this.locationCode = locationCode;
	this.locationCodes = {};		
	this.trainGroup = {};		// Group:"1", class TrainGroup
	
	$.getScript('static_properties.js', function()
	{
		this.trainProps = new TrainProperties();
	});
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