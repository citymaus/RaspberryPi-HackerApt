using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;

namespace WmataStaticData
{
    public class StationDataBuilder
    {
        private static string _apiKey;
        private const string _filename = "static_stationinfo";
        private static bool _overwriteData;

        public StationDataBuilder(string apiKey, bool overwriteData = true)
        {
            _apiKey = apiKey;
            _overwriteData = overwriteData;
        }

        public async Task MakeStationRequest()
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("api_key", _apiKey);

            // Request parameters
            queryString["LineCode"] = "{string}";
            queryString["StationCode"] = "{string}";
            var stationApiUrl = "https://api.wmata.com/Rail.svc/json/jStations"; // + "?" + queryString;
            var stationTimesApiUrl = "https://api.wmata.com/Rail.svc/json/jStationTimes";

            var timeResponse = await client.GetAsync(stationTimesApiUrl);
            var response = await client.GetAsync(stationApiUrl);
            if (response.IsSuccessStatusCode && timeResponse.IsSuccessStatusCode)
            {
                string stationResponse;
                string stationTimeResponse;
                using (Stream responseStream = await response.Content.ReadAsStreamAsync())
                {
                    stationResponse = new StreamReader(responseStream).ReadToEnd();
                }
                using (Stream responseStream = await timeResponse.Content.ReadAsStreamAsync())
                {
                    stationTimeResponse = new StreamReader(responseStream).ReadToEnd();
                }
                CollectStationData(stationResponse, stationTimeResponse);
            }
            else
            {
                Console.WriteLine("Bad HTTP response.");
                Console.WriteLine("jStations:" + response.StatusCode);
                Console.WriteLine("jStationTimes:" + timeResponse.StatusCode);
            }
        }

        static void CollectStationData(string stationResponse, string stationTimesResponse)
        {
            var stationJSON = JsonConvert.DeserializeObject<Stations>(stationResponse);
            var stationTimesJSON = JsonConvert.DeserializeObject<Stations>(stationTimesResponse);

            // Save daily schedules to main Stations object
            foreach (var stationTime in stationTimesJSON.AllStations)
            {
                var station = stationJSON.AllStations.Find(s => s.Code == stationTime.Code);
                station.Monday = stationTime.Monday;
                station.Tuesday = stationTime.Tuesday;
                station.Wednesday = stationTime.Wednesday;
                station.Thursday = stationTime.Thursday;
                station.Friday = stationTime.Friday;
                station.Saturday = stationTime.Saturday;
                station.Sunday = stationTime.Sunday;
            }
            // Map station codes to station names and lines
            stationJSON.SetTrainProperties();

            WriteStationDataToFiles(stationJSON);
        }

        static void WriteStationDataToFiles(Stations stationJSON)
        {
            var allStations = stationJSON.AllStations;

            var now = DateTime.Now.ToString("yyyy-MM-dd (HH:mm:ss)");
            var markdownOutput = "<b># CURRENT AS OF " + now + "</b><br/>";
            markdownOutput += "<table border=1 cellpadding=5 cellspacing=0>";
            markdownOutput += "<thead><tr><th>Index</th><th>Name</th><th>Lines</th><th>Code</th>"
                + "<th>Shares Station</th><th>Monday Opening</th><th>Monday First Trains</th><th>Monday Last Trains</th></tr></thead><tbody>";
            for (var stationIndex = 0; stationIndex < allStations.Count; stationIndex++)
            {
                var station = allStations[stationIndex];
                var code = station.Code;
                var name = station.StationName;
                var lines = station.LineCode1;
                var sharedStation = "";
                if (station.LineCode2 != null)
                    lines += " " + station.LineCode2;
                if (station.LineCode3 != null)
                    lines += " " + station.LineCode3;
                if (station.LineCode4 != null)
                    lines += " " + station.LineCode4;
                if (station.StationTogether1 != null)
                    sharedStation = station.StationTogether1;
                if (station.StationTogether2 != null)
                    sharedStation += " " + station.StationTogether2;
                markdownOutput += "<tr><td>" + (stationIndex + 1)
                                  + "</td><td>" + name
                                  + "</td><td>" + lines
                                  + "</td><td>" + code
                                  + "</td><td>" + sharedStation
                                  + "</td><td>" + station.Monday.OpeningTime
                                  + "</td><td>" + station.Monday.FirstTrainsString()
                                  + "</td><td>" + station.Monday.LastTrainsString()
                                  + "</td></tr>\n";
            }
            markdownOutput += "</tbody></table>";

            markdownOutput += "<br>Gallery Pl: " + stationJSON.FindAllStationCodesByName("Gallery");
            markdownOutput += "<br>L'Enfant: " + stationJSON.FindAllStationCodesByName("L'Enfant");
            markdownOutput += "<br>Fort Totten: " + stationJSON.FindAllStationCodesByName("Fort");
            markdownOutput += "<br>Metro Center: " + stationJSON.FindAllStationCodesByName("Metro Center");

            var directory = Path.GetDirectoryName(Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent.Parent.FullName, @"html\api\wmata\"));
            var path = Path.Combine(directory, _filename);

            if (!_overwriteData)
            {
                var fileVersion = 1;
                while (File.Exists(path + ".json"))
                {
                    var updatedFile = _filename + "-" + fileVersion;
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
                file.Write(JsonConvert.SerializeObject(stationJSON));
            }

            Console.WriteLine("Files created:");
            Console.WriteLine(path + ".md");
            Console.WriteLine(path + ".html");
            Console.WriteLine(path + ".json");
        }
    }
}