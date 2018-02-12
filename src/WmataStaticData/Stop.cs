using System.Collections.Generic;
using Newtonsoft.Json;

namespace WmataStaticData
{
    public class Stops
    {
        [JsonProperty("Stops")]
        public List<Stop> AllStops { get; set; }
    }

    public class Stop
    {
        [JsonProperty("StopID")]
        public string StopID { get; set; }
        [JsonProperty("Name")]
        public string Name { get; set; }
        [JsonProperty("Lat")]
        public double Lat { get; set; }
        [JsonProperty("Lon")]
        public double Long { get; set; }
        [JsonProperty("Routes")]
        public List<string> RouteList { get; set; }
    }

    public class Routes
    {
        [JsonProperty("Routes")]
        public List<Route> AllRoutes { get; set; }
    }
    public class Route
    {
        [JsonProperty("RouteID")]
        public string RouteID { get; set; }
        [JsonProperty("Name")]
        public string Name { get; set; }
        [JsonProperty("LineDescription")]
        public string LineDescription { get; set; }
    }
}