using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace StaticDataBuilder
{
    public class StaticWeatherDataBuilder
    {
        private static string _apiKey;
        private const string _filename = "static_dcexample";
        private const string _coordinates = "38.9281,-77.0342";
        private const string _darkSkyUrl_forecast = "https://api.darksky.net/forecast/";
        private static bool _overwriteData;

        public StaticWeatherDataBuilder(string apiKey, bool overwriteData = true)
        {
            _apiKey = apiKey;
            _overwriteData = overwriteData;
        }

        public async Task MakeWeatherRequest()
        {
            var client = new HttpClient();

            // Request headers
            client.DefaultRequestHeaders.Add("api_key", _apiKey);

            var apiLink = _darkSkyUrl_forecast + _apiKey + "/" + _coordinates + "?" + "exclude:minutely";

            var forcastResponse = await client.GetAsync(apiLink);
            if (forcastResponse.IsSuccessStatusCode && forcastResponse.IsSuccessStatusCode)
            {
                string forecastStream;
                using (Stream responseStream = await forcastResponse.Content.ReadAsStreamAsync())
                {
                    forecastStream = new StreamReader(responseStream).ReadToEnd();
                }
                WriteWeatherDataToFile(forecastStream);
            }
            else
            {
                Console.WriteLine("Bad HTTP response.");
                Console.WriteLine("forcast:" + forcastResponse.StatusCode);
            }
        }

        static void WriteWeatherDataToFile(string forecast)
        {
            var season = "fall";
            var now = DateTime.Now;
            float seasonVal = (float)now.Month + now.Day / 100;   // <month>.<day(2 digit)>
            if (seasonVal < 3.20 || seasonVal >= 12.21)
            {
                season = "winter";
            }
            if (seasonVal < 6.21)
            {
                season = "spring";
            }
            if (seasonVal < 9.23)
            {
                season = "summer";
            }

            var directory = Path.GetDirectoryName(Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent.Parent.FullName, @"html\api\darksky\"));
            var fileWithExtension = _filename + "_" + season + ".json";
            var fileVersion = 1;
            var path = Path.Combine(directory, fileWithExtension);

            if (!_overwriteData)
            {
                while (File.Exists(path))
                {
                    var fileRoot = Path.GetFileNameWithoutExtension(fileWithExtension);
                    var updatedFile = fileRoot + "-" + fileVersion + ".json";
                    path = Path.Combine(directory, updatedFile);
                    fileVersion++;
                }
            }

            // Create JSON
            using (StreamWriter file = new StreamWriter(path, false))
            {
                file.Write(forecast);
            }
            Console.WriteLine("Static data written to:");
            Console.WriteLine(path);
        }
    }
}
