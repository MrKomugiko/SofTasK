using SofTasK.API.ModelDtos;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SofTasK.API.Models
{
    public record ProjectDto
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public string Description { get; init; } = string.Empty;
        [Required]
        public string OwnerId { get; init; }
        public UserDto? Owner { get; init; }
        public List<UserDto>? Collaborators { get; init; }
        public List<TaskDto>? AllTasks { get; init; } 
    }
}
