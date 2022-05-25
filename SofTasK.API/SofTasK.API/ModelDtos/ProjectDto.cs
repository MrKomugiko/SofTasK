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
        [ForeignKey("OwnerId")]
        public UserDto? Owner { get; init; }
        public List<UserDto> Collaborators { get; init; } = new List<UserDto>();
    }
}
