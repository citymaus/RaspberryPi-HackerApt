using System.IO;

namespace WmataStaticData
{
    public class ApiKeyHelper
    {
        private const string _keyFile = @"..\..\..\..\html\settings\api_keys.txt";
        private const string _unsetKey = "{}";
        private string _keyName;
        private string _apiKey;

        public string ApiKey { get => (KeyIsSet()) ? _apiKey : ""; }

        public ApiKeyHelper(string apiKeyName)
        {
            _keyName = apiKeyName;
            _apiKey = _unsetKey;

            LoadApiKeyFromFile();
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
                            return;
                        }
                    }
                }
            }
        }

        private bool KeyIsSet()
        {
            return _apiKey != _unsetKey;
        }
    }
}