class WeatherHourlies {
	constructor(hourlyData) {
		this.icon = hourlyData.icon;
		this.summary = hourlyData.summary;
		this.allHours = [];
		for (var h = 0; h < hourlyData.data.length; h++) {
			this.allHours.push(new WeatherHour(hourlyData.data[h]));
		}
	}
					/*
				time:1518375600
				
				
				apparentTemperature:62.32
				cloudCover:0.5
				dewPoint:60.69
				humidity:0.96
				icon:"rain"
				ozone:294.76
				precipIntensity:0.0283
				precipProbability:0.31
				precipType:"rain"
				pressure:1010.9
				summary:"Light Rain"
				temperature:61.93
				uvIndex:2
				visibility:6.58
				windBearing:189
				windGust:9.27
				windSpeed:6.45
				*/
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
		
		this.precipProbability = weather.precipProbability;
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
	/*
				time:1518325200
				
					apparentTemperatureHigh:67.52
				apparentTemperatureHighTime:1518386400
				apparentTemperatureLow:28.11
				apparentTemperatureLowTime:1518440400
				apparentTemperatureMax:67.52
				apparentTemperatureMaxTime:1518386400
				apparentTemperatureMin:48.01
				apparentTemperatureMinTime:1518332400
				cloudCover:0.82
				dewPoint:54.49
				humidity:0.92
				icon:"rain"
				moonPhase:0.87
				ozone:298.93
				precipIntensity:0.0319
				precipIntensityMax:0.1092
				precipIntensityMaxTime:1518350400
				precipProbability:1
				precipType:"rain"
				pressure:1014.02
				summary:"Rain in the morning and afternoon."
				sunriseTime:1518350716
				sunsetTime:1518388931
				temperatureHigh:67.17
				temperatureHighTime:1518386400
				temperatureLow:36.52
				temperatureLowTime:1518440400
				temperatureMax:67.17
				temperatureMaxTime:1518386400
				temperatureMin:48.01
				temperatureMinTime:1518332400
				uvIndex:3
				uvIndexTime:1518368400
				visibility:4.63
				windBearing:209
				windGust:27.82
				windGustTime:1518390000
				windSpeed:4.06
				*/
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
		return dateObj.toLocaleDateString();
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