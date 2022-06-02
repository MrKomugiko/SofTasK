using SofTasK.API.Enums;
using SofTasK.API.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SofTasK.API.ModelDtos
{
    public record TaskDto
    {
        public int Id { get; init; }
        [Required(ErrorMessage = "Title is required")]
        public int ProjectId { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public TaskStatuses Status { get; init; } = TaskStatuses.notSelected;
        public ProrityLevels Priority { get; init; } = ProrityLevels.notSelected;
        public DateTime Created { get; init; } = DateTime.UtcNow;
        public DateTime? Started { get; init; }
        public DateTime? Ended { get; init; }
        public UserDto? Createdby { get; init; }
        public UserDto? Assigned { get; init; }
    }
}
