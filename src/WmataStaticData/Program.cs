using System;

namespace WmataStaticData
{
    class Program
    {
        static void Main(string[] args)
        {
            var apiKeyHelper = new ApiKeyHelper("WMATA");
            var wmataApiKey = apiKeyHelper.ApiKey;

            var stationDataBuilder = new StationDataBuilder(wmataApiKey);
            var stopDataBuilder = new StopDataBuilder(wmataApiKey);
            stationDataBuilder.MakeStationRequest();
            stopDataBuilder.MakeStopRequest();

            Console.WriteLine("Hit ENTER to exit...");
            Console.ReadLine();
        }
    }
}
