using System;
using System.IO;

namespace StaticDataBuilder
{
    public class ApiKeyHelper
    {
        private string _keyFile;
        private const string _unsetKey = "{}";
        private string _keyName;
        private string _apiKey;

        public string ApiKey { get => (KeyIsSet()) ? _apiKey : ""; }

        public ApiKeyHelper(string apiKeyName)
        {
            _keyName = apiKeyName;
            _apiKey = _unsetKey;

            var settingsDirectory = Path.GetDirectoryName(Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent.Parent.FullName, @"html\settings\"));
            _keyFile = Path.Combine(settingsDirectory, "api_keys.txt");

            if (!File.Exists(_keyFile))
            {
                Console.WriteLine("API Setings file not found: \n\t{0}", _keyFile);
                Console.Write("Generate? (y/n): ");
                var response = Console.ReadLine().ToLower();
                if (response.Equals("y") || response.Equals("yes"))
                {
                    GenerateSettingsFile();
                }
                else
                {
                    Console.WriteLine("Hit ENTER to exit...");
                    Console.ReadLine();
                    Environment.Exit(-1);
                }
            }

            LoadApiKeyFromFile();
        }

        private void GenerateSettingsFile()
        {
            using (StreamWriter file = new StreamWriter(_keyFile, false))
            {
                file.WriteLine("WMATA KEY: <add key here>");
                file.WriteLine("DARKSKY KEY: <add key here>");
                file.WriteLine("USEPROXY: yes");
                file.WriteLine("MODE: release");
            }
            Console.WriteLine();
            Console.WriteLine("API key file created:");
            Console.WriteLine(_keyFile);
            Console.WriteLine();
            Console.WriteLine("Please edit and enter API keys where indicated.");
            Console.WriteLine();
            Console.WriteLine("Hit ENTER to exit...");
            Console.ReadLine();
            Environment.Exit(-1);
        }

        private void LoadApiKeyFromFile()
        {
            // Read from api_keys text file
            using (StreamReader file = new StreamReader(_keyFile, false))
            {
                string line;
                while ((line = file.ReadLine()) != null)
                {
                    if ((line[0].ToString() != "#") && (line != ""))
                    {
                        var currentKey = line.Trim();
                        if (currentKey.IndexOf(_keyName) > -1)
                        {
                            _apiKey = currentKey.Replace(_keyName, "").Replace(" KEY:", "").Replace(":", "").Trim();
                            if (_apiKey.Contains("<"))
                            {
                                _apiKey = _unsetKey;
                            }
                            else
                            {
                                return;
                            }
                        }
                    }
                }

                if (!KeyIsSet())
                {
                    Console.WriteLine("Error reading API key. Please validate keys in file:");
                    Console.WriteLine(_keyFile);
                    Console.WriteLine();
                    Console.WriteLine("Hit ENTER to exit...");
                    Console.ReadLine();
                    Environment.Exit(-1);
                }
            }
        }

        private bool KeyIsSet()
        {
            return _apiKey != _unsetKey;
        }
    }
}