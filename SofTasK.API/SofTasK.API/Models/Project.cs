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
        public string Name { get; set; }
        public string Description { get; set; } = string.Empty;
        public string OwnerId { get; init; }
        [ForeignKey("OwnerId")]
        public AppUser? Owner { get; init; }

        public List<TaskModel> AllTasks { get; set; } = new List<TaskModel>();

        public List<Collaboration> Collaborators { get; set; } = new List<Collaboration>();
        public List<JoinRequest> JoinRequests { get; set; } = new List<JoinRequest>();
    }
}
