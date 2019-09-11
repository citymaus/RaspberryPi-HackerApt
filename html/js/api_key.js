class ApiKeyHelper {
	constructor(apiKeyName) {
		this.keyName = apiKeyName;
		this.apiKey = "{set keys in /html/settings/api_keys.txt}";
		// To allow CORS on stubborn Raspbian Chromium, use proxy to make API calls
        this.useProxy = false;
        this.production = true;
        // Testing with Localhost:
        this.testingProxyUrl = "https://cors-anywhere.herokuapp.com/";
        // Production on RaspberryPi:
		this.productionProxyUrl = "http://localhost:8080/";
		this.apiUrl = "";
		this.error = "";
		
		this.loadAPIKey(this.setAPIKey, this);
	}

	loadAPIKey(callback, ptr) {
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		// Synchronous ajax call (false)
		xobj.open('GET', 'settings/api_keys.txt', false);
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
				} else {			
					if (currentKey.indexOf("USEPROXY") > -1) {
						var proxy = currentKey.replace("USEPROXY", "").replace(":", "").trim().toLowerCase();	
						if (proxy.includes("yes") || proxy.includes("true")) {
							ptr.useProxy = true;	
						}					
                    }
                    if (currentKey.indexOf("MODE") > -1) {
                        var proxy = currentKey.replace("MODE", "").replace(":", "").trim().toLowerCase();
                        if (proxy.includes("debug")) {
                            ptr.production = false;
                        }
                    }
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
	getAPIUrl(apiUrl) {
        var ajaxUrl = apiUrl;
        var proxyUrl = this.production ? this.productionProxyUrl : this.testingProxyUrl;

		if ((typeof this.useProxy === 'boolean' && this.useProxy === true)) {
			ajaxUrl = proxyUrl + apiUrl;
		}
		return ajaxUrl;
	}
}