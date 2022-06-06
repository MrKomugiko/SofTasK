using SofTasK.API.Enums;
using SofTasK.API.ModelDtos;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SofTasK.API.Models
{
    public record CreateTaskDto
    {
        public int ProjectId { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public TaskStatuses Status { get; init; }
        public ProrityLevels Priority { get; init; }
        public string[] Tags { get; init; }
    }
}

