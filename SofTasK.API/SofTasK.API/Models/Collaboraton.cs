using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SofTasK.API.Models
{
    public class Collaboration
    {
        [Key] public int Id { get; set; }

        [Required] public string UserId { get; set; }
        [ForeignKey("UserId")]
        public AppUser AppUser { get; set; }

        [Required] public int ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }

        //public DateTime RequestDate { get; set; } = DateTime.UtcNow;
        //public DateTime? RespondDate { get; set; } = null;
        //public bool? Confirmed { get; set; }
    }
}
