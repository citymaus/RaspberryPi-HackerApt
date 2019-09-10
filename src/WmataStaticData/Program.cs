#undef STATICWMATA
#define STATICDARKSKY
using System;

namespace WmataStaticData
{
    class Program
    {
        static void Main(string[] args)
        {
            var wmataApiKey = new ApiKeyHelper("WMATA").ApiKey;
            var darkSkyApiKey = new ApiKeyHelper("DARKSKY").ApiKey;

#if STATICWMATA
            var stationDataBuilder = new StationDataBuilder(wmataApiKey);
            var stopDataBuilder = new StopDataBuilder(wmataApiKey);
            stationDataBuilder.MakeStationRequest();
            stopDataBuilder.MakeStopRequest();
#endif
#if STATICDARKSKY
            var staticWeatherDataBuilder = new StaticWeatherDataBuilder(darkSkyApiKey);
            staticWeatherDataBuilder.MakeWeatherRequest();
#endif
            Console.WriteLine("Hit ENTER to exit...");
            Console.ReadLine();
        }
    }
}
