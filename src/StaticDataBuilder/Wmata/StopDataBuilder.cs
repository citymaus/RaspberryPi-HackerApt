using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;

namespace StaticDataBuilder
{
    public class StopDataBuilder
    {
        private static string _apiKey;
        private const string _stopFilename = "static_busstopinfo";
        private const string _routeFilename = "static_busrouteinfo";
        private static bool _overwriteData;

        public StopDataBuilder(string apiKey, bool overwriteData = true)
        {
            _apiKey = apiKey;
            _overwriteData = overwriteData;
        }

        public async Task MakeStopRequest()
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("api_key", _apiKey);

            // Request parameters
            var stopApiUrl = "https://api.wmata.com/Bus.svc/json/jStops";
            var routeApiUrl = "https://api.wmata.com/Bus.svc/json/jRoutes";

            var stopResponse = await client.GetAsync(stopApiUrl);
            var routeResponse = await client.GetAsync(routeApiUrl);
            if (stopResponse.IsSuccessStatusCode && routeResponse.IsSuccessStatusCode)
            {
                string stopResponseStr;
                string routeResponseStr;
                using (Stream responseStream = await stopResponse.Content.ReadAsStreamAsync())
                {
                    stopResponseStr = new StreamReader(responseStream).ReadToEnd();
                }
                using (Stream responseStream = await routeResponse.Content.ReadAsStreamAsync())
                {
                    routeResponseStr = new StreamReader(responseStream).ReadToEnd();
                }
                CollectStopData(stopResponseStr, routeResponseStr);
            }
            else
            {
                Console.WriteLine("Bad HTTP response.");
                Console.WriteLine("jStops:" + stopResponse.StatusCode);
                Console.WriteLine("jRoutes:" + routeResponse.StatusCode);
            }
        }

        static void CollectStopData(string stopResponse, string routeResponse)
        {
            var stopJSON = JsonConvert.DeserializeObject<Stops>(stopResponse);
            var routeJSON = JsonConvert.DeserializeObject<Routes>(routeResponse);

            WriteStopDataToFiles(stopJSON);
            WriteRouteDataToFiles(routeJSON);
        }

        static void WriteStopDataToFiles(Stops stopsJSON)
        {
            var allStops = stopsJSON.AllStops;

            var now = DateTime.Now.ToString("yyyy-MM-dd (HH:mm:ss)");
            var markdownOutput = "<b># CURRENT AS OF " + now + "</b><br/>";
            markdownOutput += "<table border=1 cellpadding=5 cellspacing=0>";
            markdownOutput += "<thead><tr><th>Index</th><th>Name</th><th>StopID</th>"
                + "<th>Routes</th></tr></thead><tbody>";

            for (var stopIndex = 0; stopIndex < allStops.Count; stopIndex++)
            {
                var stop = allStops[stopIndex];
                var stopID = stop.StopID;
                var name = stop.Name;
                var routes = stop.RouteList;
                markdownOutput += "<tr><td>" + (stopIndex + 1)
                                  + "</td><td>" + name
                                  + "</td><td>" + stopID
                                  + "</td><td>" + string.Join("<br>", routes)
                                  + "</td></tr>\n";
            }
            markdownOutput += "</tbody></table>";

            var directory = Path.GetDirectoryName(Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent.Parent.FullName, @"html\api\wmata\"));
            var path = Path.Combine(directory, _stopFilename);

            if (!_overwriteData)
            {
                var fileVersion = 1;
                while (File.Exists(path + ".json"))
                {
                    var updatedFile = _stopFilename + "-" + fileVersion;
                    path = Path.Combine(directory, updatedFile);
                    fileVersion++;
                }
            }

            // Create markdown file
            using (StreamWriter file = new StreamWriter(path + ".md", false))
            {
                file.Write(markdownOutput);
            }
            // Create HTML file
            using (StreamWriter file = new StreamWriter(path + ".html", false))
            {
                file.Write(markdownOutput);
            }
            // Create JSON
            using (StreamWriter file = new StreamWriter(path + ".json", false))
            {
                file.Write(JsonConvert.SerializeObject(stopsJSON));
            }
        }
        static void WriteRouteDataToFiles(Routes routesJSON)
        {
            var allRoutes = routesJSON.AllRoutes;

            var now = DateTime.Now.ToString("yyyy-MM-dd (HH:mm:ss)");
            var markdownOutput = "<b># CURRENT AS OF " + now + "</b><br/>";
            markdownOutput += "<table border=1 cellpadding=5 cellspacing=0>";
            markdownOutput += "<thead><tr><th>Index</th><th>Name</th><th>RouteID</th>"
                + "<th>LineDescription</th></tr></thead><tbody>";

            for (var routeIndex = 0; routeIndex < allRoutes.Count; routeIndex++)
            {
                var route = allRoutes[routeIndex];
                var routeID = route.RouteID;
                var name = route.Name;
                var description = route.LineDescription;
                markdownOutput += "<tr><td>" + (routeIndex + 1)
                                  + "</td><td>" + name
                                  + "</td><td>" + routeID
                                  + "</td><td>" + description
                                  + "</td></tr>\n";
            }
            markdownOutput += "</tbody></table>";

            var directory = Path.GetDirectoryName(Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent.Parent.FullName, @"html\api\wmata\"));
            var path = Path.Combine(directory, _routeFilename);

            if (!_overwriteData)
            {
                var fileVersion = 1;
                while (File.Exists(path + ".json"))
                {
                    var updatedFile = _routeFilename + "-" + fileVersion;
                    path = Path.Combine(directory, updatedFile);
                    fileVersion++;
                }
            }

            // Create markdown file
            using (StreamWriter file = new StreamWriter(path + ".md", false))
            {
                file.Write(markdownOutput);
            }
            // Create HTML file
            using (StreamWriter file = new StreamWriter(path + ".html", false))
            {
                file.Write(markdownOutput);
            }
            // Create JSON
            using (StreamWriter file = new StreamWriter(path + ".json", false))
            {
                file.Write(JsonConvert.SerializeObject(routesJSON));
            }

            Console.WriteLine();
            Console.WriteLine("Files created:");
            Console.WriteLine(path + ".md");
            Console.WriteLine(path + ".html");
            Console.WriteLine(path + ".json");
        }
    }
}