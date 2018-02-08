using System.Collections.Generic;
using Newtonsoft.Json;

namespace WmataStaticData
{
    public class Stations
    {
        [JsonProperty("Stations")]
        public List<Station> AllStations { get; set; }
        [JsonProperty("StationTimes")]
        public List<Station> AllStationTimes { set => AllStations = value; }

        public string FindAllStationCodesByName(string stationName, bool asJSON = false)
        {
            string stationCodes = "";
            List<string> stationCodeList = new List<string>();
            string fullStationName = stationName;
            foreach (var station in AllStations)
            {
                if (station.StationName.Contains(stationName))
                {
                    fullStationName = station.StationName;
                    stationCodeList.Add(station.Code);
                }
            }
            if (asJSON)
            {
                foreach (var code in stationCodeList)
                {
                    stationCodes += "\"" + code + "\": \"" + fullStationName + "\", ";
                }
            }
            else
            {
                stationCodes = string.Join(",", stationCodeList);
            }
            return stationCodes;
        }

        public void SetTrainProperties()
        {
            foreach (var station in AllStations)
            {
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
            }
        }

        /*
        public string FindStation(string train, bool includeColor = true)
        {
            string output = train;
            string pattern = @"\[(?<StationCode>[A-Z][0-9]+)\]";
            var replacePattern = "${StationCode}: ${tag}";
            Regex regex = new Regex(pattern);
            MatchCollection matches = Regex.Matches(train, pattern);
            foreach (Match match in matches)
            {
                var stationCode = match.Groups[1].Value;
                var station = AllStations.Find(s => s.Code == stationCode);
                var stationExpanded = stationCode + "-" + station.StationName 
                    + (includeColor ? "(" + station.AllLines() + ")" : "");
                output = regex.Replace(output, stationExpanded, 1);
            }
            return output;
        }
        */
    }

    public class StationTimesJSON
    {
        [JsonProperty("StationTimes")]
        public List<Station> StationInfos { get; set; }
    }

    public class Station
    {
        [JsonProperty("Code")]
        public string Code { get; set; }
        [JsonProperty("StationName")]
        public string StationName { get; set; }
        [JsonProperty("Name")]
        public string Name { set => StationName = value; }
        [JsonProperty("Lat")]
        public double Lat { get; set; }
        [JsonProperty("Lon")]
        public double Lon { get; set; }
        [JsonProperty("LineCode1")]
        public string LineCode1 { get; set; }
        [JsonProperty("LineCode2")]
        public string LineCode2 { get; set; }
        [JsonProperty("LineCode3")]
        public string LineCode3 { get; set; }
        [JsonProperty("LineCode4")]
        public string LineCode4 { get; set; }
        [JsonProperty("StationTogether1")]
        public string StationTogether1 { get; set; }
        [JsonProperty("StationTogether2")]
        public string StationTogether2 { get; set; }
        [JsonProperty("Address")]
        public Address Address { get; set; }

        [JsonProperty("Monday")]
        public Schedule Monday { get; set; }
        [JsonProperty("Tuesday")]
        public Schedule Tuesday { get; set; }
        [JsonProperty("Wednesday")]
        public Schedule Wednesday { get; set; }
        [JsonProperty("Thursday")]
        public Schedule Thursday { get; set; }
        [JsonProperty("Friday")]
        public Schedule Friday { get; set; }
        [JsonProperty("Saturday")]
        public Schedule Saturday { get; set; }
        [JsonProperty("Sunday")]
        public Schedule Sunday { get; set; }

        public string AllLines()
        {
            string lines = LineCode1;
            if (LineCode2 != null)
                lines += " " + LineCode2;
            if (LineCode3 != null)
                lines += " " + LineCode3;
            if (LineCode4 != null)
                lines += " " + LineCode4;
            return lines;
        }
    }

    public class Address
    {
        [JsonProperty("City")]
        public string City { get; set; }
        [JsonProperty("State")]
        public string State { get; set; }
        [JsonProperty("Street")]
        public string Street { get; set; }
        [JsonProperty("Zip")]
        public string Zip { get; set; }
    }

    public class Schedule
    {
        [JsonProperty("OpeningTime")]
        public string OpeningTime { get; set; }
        [JsonProperty("FirstTrains")]
        public List<Train> FirstTrains { get; set; }
        [JsonProperty("LastTrains")]
        public List<Train> LastTrains { get; set; }

        public string FirstTrainsString()
        {
            string times = "";
            foreach (var train in FirstTrains)
            {
                times += train + "<br>";
            }
            return times.TrimEnd("<br>".ToCharArray());
        }
        public string LastTrainsString()
        {
            string times = "";
            foreach (var train in LastTrains)
            {
                times += train + "<br>";
            }
            return times.TrimEnd("<br>".ToCharArray());
        }
    }

    public class Train
    {
        [JsonProperty("Time")]
        public string Time { get; set; }
        [JsonProperty("DestinationStation")]
        public string DestinationStation { get; set; }

        public string DestinationStationName { get; set; }
        public string DestinationStationLines { get; set; }

        public override string ToString()
        {
            return "Time: " + Time + " > " + DestinationStation + "-" 
                + DestinationStationName + "(" + DestinationStationLines + ")";
        }
    }
}