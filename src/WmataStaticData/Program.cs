using System;

namespace WmataStaticData
{
    class Program
    {
        static void Main(string[] args)
        {
            var wmataApiKey = "{api_key}";

            var stationDataBuilder = new StationDataBuilder(wmataApiKey);
            var stopDataBuilder = new StopDataBuilder(wmataApiKey);
            //stationDataBuilder.MakeStationRequest();
            stopDataBuilder.MakeStopRequest();

            Console.WriteLine("Hit ENTER to exit...");
            Console.ReadLine();
        }
    }
}
