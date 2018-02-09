using System.Collections.Generic;
using Newtonsoft.Json;
/*
 *   
 *       "Stops": [
        {
            "Lat": 38.878356,
            "Lon": -76.990378,
            "Name": "K ST + POTOMAC AVE",
            "Routes": [
                "V7",
                "V7c",
                "V7cv1",
                "V7v1",
                "V7v2",
                "V8",
                "V9"
            ],
            "StopID": "1000533"
        },
    }
 * */

namespace WmataStaticData
{
    public class Stops
    {
        [JsonProperty("Stops")]
        public List<Stop> AllStops { get; set; }
        //[JsonProperty("StationTimes")]
        //public List<Station> AllStationTimes { set => AllStations = value; }


        public void SetStopProperties()
        {
            /*
            foreach (var station in AllStops)
            {
                #region Update all schedules
                foreach (var train in station.Monday.FirstTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }
                foreach (var train in station.Monday.LastTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }

                foreach (var train in station.Tuesday.FirstTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }
                foreach (var train in station.Tuesday.LastTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }

                foreach (var train in station.Wednesday.FirstTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }
                foreach (var train in station.Wednesday.LastTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }

                foreach (var train in station.Thursday.FirstTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }
                foreach (var train in station.Thursday.LastTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }

                foreach (var train in station.Friday.FirstTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }
                foreach (var train in station.Friday.LastTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }

                foreach (var train in station.Saturday.FirstTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }
                foreach (var train in station.Saturday.LastTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }

                foreach (var train in station.Sunday.FirstTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }
                foreach (var train in station.Sunday.LastTrains)
                {
                    var destStation = AllStations.Find(s => s.Code == train.DestinationStation);
                    train.DestinationStationName = destStation.StationName;
                    train.DestinationStationLines = destStation.AllLines();
                }
                #endregion
            }
            */
        }
    }

    public class Stop
    {
        [JsonProperty("StopID")]
        public string StopId { get; set; }
        [JsonProperty("Name")]
        public string Name { get; set; }
        [JsonProperty("Lat")]
        public double Lat { get; set; }
        [JsonProperty("Lon")]
        public double Long { get; set; }
        [JsonProperty("Routes")]
        public List<string> RouteList { get; set; }
        //public List<Route> Routes { get; set; }
        //public List<Route> Routes { get; set => new Route().RouteId = value; } // TODO
    }

    public class Routes
    {
        [JsonProperty("Routes")]
        public List<Route> AllRoutes { get; set; }
    }
    public class Route
    {
        [JsonProperty("RouteID")]
        public string RouteId { get; set; }
        [JsonProperty("Name")]
        public string Name { get; set; }
        [JsonProperty("LineDescription")]
        public string LineDescription { get; set; }
    }
}