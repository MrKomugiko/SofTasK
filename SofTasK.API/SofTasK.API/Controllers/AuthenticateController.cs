using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SofTasK.API.Data;
using SofTasK.API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SofTasK.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> userManager;
        private readonly IConfiguration _configuration;

        public AuthenticateController(UserManager<AppUser> userManager, IConfiguration configuration, ApplicationDbContext context)
        {
            this.userManager = userManager;
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
                List<CustomRole> ownedprojects = GetRoles(_context,user);
                authClaims.Add(new Claim("privileges", JsonConvert.SerializeObject(ownedprojects)));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(new
                {
                    user = user.UserName,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    privileges = ownedprojects
                });
            }
            return Unauthorized();

            static List<CustomRole> GetRoles(ApplicationDbContext _context, AppUser _user)
            {
                var roles = new List<CustomRole>();

                roles = _context.Projects.Where(x=>x.OwnerId == _user.Id)
                    .Select(x=> new CustomRole {
                        Id = x.Id,
                        ProjectName = x.Name,
                        Role = new List<string>()
                        {
                            "Owner"
                        }
                    }).ToList();

                return roles;
                //return new List<object>(){
                //    new {
                //        Id = 1,
                //        ProjectName = "project1",
                //        Role = new List<string>()
                //        {
                //            "Owner",
                //        }
                //    },

                //    new {
                //        Id = 2,
                //        ProjectName = "project2",
                //        Role = new List<string>()
                //        {
                //            "Admin",
                //            "Moderator",
                //            "Member"
                //        }}
                //    };
            }
        }
        public class CustomRole
        {
            public int Id { get; set; }
            public string ProjectName { get; set; }
            public List<string> Role { get; set; }
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            AppUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response
                    {
                        Status = "Error",
                        Message = "User creation failed! Please check user details and try again."
                    });

            return Ok(new Response
            {
                Status = "Success",
                Message = "User created successfully!"
            });
        }

    }
}