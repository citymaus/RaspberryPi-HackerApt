class ApiKeyHelper {
	constructor(apiKeyName) {
		this.keyName = apiKeyName;
		this.apiKey = "{set keys in /html/api/api_keys.txt}";
		this.error = "";
		
		this.loadAPIKey(this.setAPIKey, this);
	}

	loadAPIKey(callback, ptr) {
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		// Synchronous ajax call (false)
		xobj.open('GET', 'api/api_keys.txt', false);
		xobj.onreadystatechange = function () {
			  if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText, ptr);
			  } else {
				  this.error = "Error loading keys in " + xobj.responseUrl;
			  }
		};
		xobj.send(null);  			
	}
	setAPIKey(data, ptr) {
		var lines = data.split('\n');
		for (var line = 0; line < lines.length; line++) {
			if (!(lines[line].charAt(0) == "#") && (lines[line] !== "")) {
				var currentKey = lines[line].trim();
				if (currentKey.indexOf(ptr.keyName) > -1) {
					ptr.apiKey = currentKey.replace(ptr.keyName, "").replace(" KEY:", "").replace(":", "").trim();
					return;
				}			
			}
		}
	}
	apiKeyLastUpdated(apiLink, apiLinkText, dateNow, timeNow, extraPadding = 0, colspan = 1) {
		var lastHTML = "";
		lastHTML += "<tr><td class='lastUpdated' style='padding-right:" + extraPadding + "px;' colspan='" + colspan + "'>"
					+ "<div>"
					+ "<span class='api-link'>[ <a href='" + apiLink + "'>" + apiLinkText + "</a> ]</span>"
					+ "<span style='font-size: 10px;'>" + dateNow + "</span>" 
					+ "</div>"
					+ " &nbsp;" + timeNow;
		lastHTML += "</td></tr>";
		return lastHTML;
	}
}