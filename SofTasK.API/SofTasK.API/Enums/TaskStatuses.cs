using System.Text.Json.Serialization;

namespace SofTasK.API.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TaskStatuses
    {
       notSelected = 0,
       New = 1,
       WaitingForAssigment = 2,
       InProgress = 3,
       Revieving = 4,
       Done = 5,
       Delayed = 6,
       Abaddoned = 7
    }
}
