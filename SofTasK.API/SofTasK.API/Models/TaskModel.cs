using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SofTasK.API.Models
{
    public record TaskModel
    {
        [Key] 
        public int Id { get; init; }
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; init; }
        [Required(ErrorMessage = "Status is required")]

        public string Status { get; init; } = "New";
        public int Priority { get; init; }
        public DateTime Created { get; init; } = DateTime.UtcNow;

        public string OwnerId { get; init; }
        [ForeignKey("OwnerId")] 
        public AppUser? Createdby { get; init; }
    }
}
