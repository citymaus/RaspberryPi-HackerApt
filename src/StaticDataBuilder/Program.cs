#define STATICWMATA
#undef STATICDARKSKY
using System;

namespace StaticDataBuilder
{
    class Program
    {
        static void Main(string[] args)
        {
            var overwriteData = false;
            
            var wmataApiKey = new ApiKeyHelper("WMATA").ApiKey;
            var darkSkyApiKey = new ApiKeyHelper("DARKSKY").ApiKey;

            Console.WriteLine("Creating static files...");
            Console.WriteLine();

#if STATICWMATA
            var stationDataBuilder = new StationDataBuilder(wmataApiKey, overwriteData);
            var stopDataBuilder = new StopDataBuilder(wmataApiKey, overwriteData);
            stationDataBuilder.MakeStationRequest().Wait();
            stopDataBuilder.MakeStopRequest().Wait();
#endif

#if STATICDARKSKY
            var staticWeatherDataBuilder = new StaticWeatherDataBuilder(darkSkyApiKey, overwriteData);
            staticWeatherDataBuilder.MakeWeatherRequest().Wait();
#endif

            Console.WriteLine();
            Console.WriteLine("Hit ENTER to exit...");
            Console.ReadLine();
        }
    }
}
