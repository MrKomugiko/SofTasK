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
        [Required(ErrorMessage = "Status is required")]
        public string Status { get; init; } = "New";
        public int Priority { get; init; }
        public DateTime Created { get; init; } = DateTime.UtcNow;
        public DateTime? Started { get; init; }
        public DateTime? Ended { get; init; }
        public UserDto? Createdby { get; init; }
        public UserDto? Assigned { get; init; }
    }
}
