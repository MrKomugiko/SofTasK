using SofTasK.API.ModelDtos;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SofTasK.API.Models
{
    public record Project
    {
        [Key] 
        public int Id { get; init; }
        [Required(ErrorMessage = "Name is required.")] 
        public string Name { get; init; }
        public string Description { get; init; } = string.Empty;
        public string OwnerId { get; init; }
        [ForeignKey("OwnerId")]
        public AppUser? Owner { get; init; }
        public List<Collaboration?>? Collaborators { get; set; }
    }

}
