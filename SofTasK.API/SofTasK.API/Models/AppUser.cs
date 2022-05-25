using Microsoft.AspNetCore.Identity;

namespace SofTasK.API.Models
{
    public class AppUser : IdentityUser
    {
        public ICollection<Project?>? Projects { get; set; }
        public ICollection<TaskModel?>? Tasks { get; set; }
    }
}
