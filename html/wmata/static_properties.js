
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