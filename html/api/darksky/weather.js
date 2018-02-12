class WeatherHourlies {
	constructor(hourlyData) {
		this.icon = hourlyData.icon;
		this.summary = hourlyData.summary;
		this.allHours = [];
		for (var h = 0; h < hourlyData.data.length; h++) {
			this.allHours.push(new WeatherHour(hourlyData.data[h]));
		}
	}
}
class WeatherHour {
	constructor(weather) {
		this.util = new WeatherUtils();
		
		this.summary = weather.summary;
		this.time = weather.time;
		this.icon = weather.icon;
		
		this.temperature = weather.temperature;
		this.apparentTemperature = weather.apparentTemperature;
		
		this.precipProbability = weather.precipProbability;
		this.precipIntensity = weather.precipIntensity;
		this.precipType = weather.precipType;
		
		this.cloudCover = weather.cloudCover;
		this.dewPoint = weather.dewPoint;
		this.humidity = weather.humidity;
		this.ozone = weather.ozone;
		this.pressure = weather.pressure;
		this.uvIndex = weather.uvIndex;
		this.visibility = weather.visibility;
		this.windBearing = weather.windBearing;
		this.windGust = weather.windGust;
		this.windSpeed = weather.windSpeed;
	}
	getDay() {
		return this.util.getDay(this.time);
	}
	getDate() {
		return this.util.getDate(this.time);
	}
	getTime() {
		return this.util.getTime(this.time);
	}
}

class WeatherDailies {	
	constructor(dailyData) {
		this.icon = dailyData.icon;
		this.summary = dailyData.summary;
		this.allDays = [];
		for (var h = 0; h < dailyData.data.length; h++) {
			this.allDays.push(new WeatherDaily(dailyData.data[h]));
		}
	}
}

class WeatherDaily {
	constructor(weather) {
		this.util = new WeatherUtils();
		
		this.summary = weather.summary;
		this.time = weather.time;
		this.icon = weather.icon;
		
		this.temperatureHigh = weather.temperatureHigh;
		this.temperatureLow = weather.temperatureLow;
		
		this.precipProbability = weather.precipProbability * 100;
		this.precipType = weather.precipType;
		this.precipAccumulation = weather.precipAccumulation;
		
		this.sunriseTime = weather.sunriseTime;
		this.sunsetTime = weather.sunsetTime;
		
		this.temperatureHighTime = weather.temperatureHighTime;
		this.temperatureLowTime = weather.temperatureLowTime;
		
		this.apparentTemperatureHigh = weather.apparentTemperatureHigh;
		this.apparentTemperatureHighTime = weather.apparentTemperatureHighTime;
		this.apparentTemperatureLow = weather.apparentTemperatureLow;
		this.apparentTemperatureLowTime = weather.apparentTemperatureLowTime;
		this.apparentTemperatureMax = weather.apparentTemperatureMax;
		this.apparentTemperatureMaxTime = weather.apparentTemperatureMaxTime;
		this.apparentTemperatureMin = weather.apparentTemperatureMin;
		this.apparentTemperatureMinTime = weather.apparentTemperatureMinTime;
		this.cloudCover = weather.cloudCover;
		this.dewPoint = weather.dewPoint;
		this.humidity = weather.humidity;
		this.moonPhase = weather.moonPhase;
		this.ozone = weather.ozone;
		this.precipIntensity = weather.precipIntensity;
		this.precipIntensityMax = weather.precipIntensityMax;
		this.precipIntensityMaxTime = weather.precipIntensityMaxTime;
		this.pressure = weather.pressure;
		this.temperatureMax = weather.temperatureMax;
		this.temperatureMaxTime = weather.temperatureMaxTime;
		this.temperatureMin = weather.temperatureMin;
		this.temperatureMinTime = weather.temperatureMinTime;
		this.uvIndex = weather.uvIndex;
		this.uvIndexTime = weather.uvIndexTime;
		this.visibility = weather.visibility;
		this.windBearing = weather.windBearing;
		this.windGust = weather.windGust;
		this.windGustTime = weather.windGustTime;
		this.windSpeed = weather.windSpeed;
	}
	getDay() {
		return this.util.getDay(this.time);
	}
	getDate() {
		return this.util.getDate(this.time);
	}
	getTime() {
		return this.util.getTime(this.time);
	}
}
class WeatherAlert {	
	constructor(alertData) {
		this.util = new WeatherUtils();
		this.title = alertData.title;
		this.time = alertData.time;
		this.expires = alertData.expires;
		this.severity = alertData.severity;
		this.description = alertData.description;
		this.moreInfoUri = alertData.uri;
		this.regions = [];
		for (var r = 0; r < alertData.regions.length; r++) {
			this.regions.push(alertData.regions[r]);
		}		
	}	
	getDay(time) {
		return this.util.getDay(time);
	}
	getDate(time) {
		return this.util.getDate(time);
	}
	getTime(time) {
		return this.util.getTime(time);
	}
	getRemainingTime() {
		return this.expires - this.time;
	}
}

class WeatherUtils {
  constructor() {
		this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
	getDay(timeInSecs) {
		var dateObj = new Date(timeInSecs * 1000);
		var dateNow = dateObj.toLocaleDateString();
		var timeNow = dateObj.toLocaleTimeString();
		var dayOfWeek = dateObj.getDay();
		var today = this.days[dayOfWeek];
		return today;
	}
	getDate(timeInSecs) {
		var dateObj = new Date(timeInSecs * 1000);
		var day = dateObj.getDate();
		if (parseInt(day) < 9) {
			day = "0" + day;
		}
		return this.months[dateObj.getMonth()] + " " + day;
	}
	getTime(timeInSecs) {	
		var dateObj = new Date(timeInSecs * 1000);
		return dateObj.toLocaleTimeString();
	}
	getWeatherIcon(iconName) {
		var iconClass = "";
		if (iconName == "clear-day") {
			iconClass = "sun";
		} 
		if (iconName == "clear-night") {
			iconClass = "moon-stars";
		} 
		if (iconName == "rain") {
			iconClass = "cloud-rain-2";
		}
		if (iconName == "snow") {
			iconClass = "snow";
		}
		if (iconName == "sleet") {
			iconClass = "hail";		
		}
		if (iconName == "wind") {
			iconClass = "wind";
		}
		if (iconName == "fog") {
			iconClass = "fog";
		}
		if (iconName == "cloudy") {
			iconClass = "clouds";
		}
		if (iconName == "partly-cloudy-day") {
			iconClass = "cloud-sun";
		}
		if (iconName == "partly-cloudy-night") {
			iconClass = "cloud-moon";			
		} 
		if (iconName == "hail") {
			iconClass = "hail";
		}
		if (iconName == "thunderstorm") {
			iconClass = "cloud-lightning";			
		} 
		if (iconName == "tornado") {
			iconClass = "tornado";
		}
		
		if (iconName == "degrees-fahrenheit") {
			iconClass = "degrees-fahrenheit";
		}
		
		// thermometer-100
		// umbrella
		// raindrop
		return iconClass;
	}
	getPrecipWeatherIcon(iconName, chance) {	
		var iconClass = "";
		if (iconName == "rain") {
			if (chance >= 50) {
				iconClass = "umbrella";
			} else {
				iconClass = "raindrop";
			}
		}
		if (iconName == "snow") {
			iconClass = "snow";
		}
		if (iconName == "sleet") {
			iconClass = "hail";
		}
		if (iconName == "hail") {
			iconClass = "hail";
		}
		return iconClass;
	}
	getDayBackgroundColor(iconName) {
		var cssClass = "weather-panel-back-sun";
		
		if (iconName.indexOf("cloudy") != -1) {
			cssClass = "weather-panel-back-cloudy";
		}
		if ((iconName.indexOf("snow") != -1) || (iconName.indexOf("rain") != -1)) {
			cssClass = "weather-panel-back-rain";
		}
		return cssClass;
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