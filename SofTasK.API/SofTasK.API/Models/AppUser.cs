using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace SofTasK.API.Models
{
    public class AppUser : IdentityUser
    {
        public ICollection<Project?>? Projects { get; set; }

        [InverseProperty("Assigned")]
        public ICollection<TaskModel> AssignedToTasks { get; set; }

        [InverseProperty("Createdby")]
        public ICollection<TaskModel> CreatedTasks { get; set; }
        
        public ICollection<Collaboration> Collaborations { get; set; }
        
        public ICollection<JoinRequest> JoinRequests { get; set; }
    }
}
