using SofTasK.API.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SofTasK.API.Models
{
    public record TaskModel
    {
        [Key] 
        public int Id { get; init; }

        public int ProjectId { get; init; }
        [ForeignKey("ProjectId")] 
        public Project? Project { get; init; }

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; init; }
        [Required(ErrorMessage = "Status is required")]

        [MaxLength(1500)]
        public string Description { get; init; }

        public TaskStatuses Status { get; init; } = TaskStatuses.notSelected;
        public ProrityLevels Priority { get; init; } = ProrityLevels.notSelected;
        public DateTime Created { get; init; } = DateTime.UtcNow;
        public DateTime? Started { get; init; }
        public DateTime? Ended { get; init; }

        public string OwnerId { get; init; }
        [ForeignKey("OwnerId")] 
        public AppUser? Createdby { get; init; }

        public string? AssignedId { get; init; }
        [ForeignKey("AssignedId")]
        public AppUser? Assigned { get; init; }
    }
}
