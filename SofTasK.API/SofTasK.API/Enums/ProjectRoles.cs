using System.Text.Json.Serialization;

namespace SofTasK.API.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProjectRoles
    {
       Anonymous = 0,
       Member = 1,
       Owner = 2
    }
}
