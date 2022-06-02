using System.Text.Json.Serialization;

namespace SofTasK.API.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProrityLevels
    {
      notSelected =  0,
      Low =  1,
      Standard =  2,
      Moderate = 3,
      Major = 4,
      Critical = 5
    }
}


