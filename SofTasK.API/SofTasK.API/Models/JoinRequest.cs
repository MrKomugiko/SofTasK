using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SofTasK.API.Models
{
    public class JoinRequest
    {
        [Key] public int Id { get; set; }
        public string Message { get; set; } = "";

        [Required] public string UserId { get; set; }
        [ForeignKey("UserId")] public virtual AppUser User { get; set; }
        [Required] public int ProjectId { get; set; }
        [ForeignKey("ProjectId")] public virtual Project Project { get; set; }

        public bool Confirmed { get; set; } = false;
        public DateTime CreatedDate { get; set; } = DateTime.Now.ToUniversalTime();
        public DateTime? ClosedDate { get; set; }
    }
}
