// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

using SofTasK.API.Enums;

namespace SofTasK.API.Controllers
{
    public partial class AuthenticateController
    {
        public class CustomRole
        {
            public int Id { get; set; }
            public string ProjectName { get; set; }
            public List<ProjectRoles> Role { get; set; }
        }

    }
}