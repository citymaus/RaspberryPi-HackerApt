class WmataStatus {
  constructor(title, url, description, pubDate) {
	this.title = title;
	this.url = url;
	this.description = description;
	this.pubDate = pubDate;
		
	var dateObj = new Date(this.pubDate);	
	this.localDate = dateObj;
	this.datePub = dateObj.toLocaleDateString();
	this.timePub = dateObj.toLocaleTimeString();
  }
}

var wmataStatusData = [];	
function loadWmataStatusFeed(displayObj, apiKeyHelper) {
	
	var feed = "https://feeds.feedburner.com/WMATA_API_Updates?format=xml";	
	var apiUrl = apiKeyHelper.getAPIUrl(feed);
	
	// To allow CORS, use proxy here
	//var proxy = "https://cors-anywhere.herokuapp.com/";
	$.ajax({
		url: apiUrl, 
		accepts:{
			xml:"application/rss+xml"
		},				
		async: false,
		dataType:"xml",
	})			
	.done(function(data) {
		addStatusData(data);
	})
	.fail(function(xhr, status, error) {
		var err = eval("(" + xhr.responseText + ")");
		displayObj.innerHTML += "<br>Error: " + err.message;
	});	
}
function addStatusData(data) {					
	$(data).find("item").each(function () {
		// Credit: http://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript
		var el = $(this);
		wmataStatusData.push(new WmataStatus(
			el.find("title").text(),
			el.find("link").text(),
			el.find("description").text(),
			el.find("pubDate").text()
		));
	});
}		
function displayBusStatusFeed(numDaysToRetrieve) {
	var today = new Date();
	var oneDay = 24*60*60*1000;
	var currentUpdates = [];
	var tableData = "";
	currentUpdates = $.grep(wmataStatusData, function(obj){
		var timeBetween = today.getTime() - obj.localDate.getTime();
		var daysBetween = Math.round(timeBetween / oneDay);
		return daysBetween < numDaysToRetrieve;
		});
	if (currentUpdates !== undefined && currentUpdates.length > 0) {
		tableData += "<table border=1 cellpadding=5 cellspacing=0>";
		for (var s = 0; s < currentUpdates.length; s++) {
			var currentStatus = currentUpdates[s];
			tableData += "<tr><td>";
			tableData += currentStatus.datePub + " " + currentStatus.timePub + " <b>" + currentStatus.title + "</b><br>";
			tableData += currentStatus.description;
			tableData += "</td></tr>";
		}
		tableData += "</table>";
	}
	return tableData;
}