using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using IAuthorizationFilter = Microsoft.AspNetCore.Mvc.Filters.IAuthorizationFilter;
using SofTasK.API.Enums;
using static SofTasK.API.Controllers.AuthenticateController;
using System.Text.Json;

namespace SofTasK.API.Extensions
{
    public class AuthorizeByProjectRole : AuthorizeAttribute, IAuthorizationFilter
    {
        public string ProjectIdPropertyName = "_id";
        public ProjectRoles[] ProjectRole { get; set; } 
        public AuthorizeByProjectRole(params ProjectRoles[] projectRole)
        {
            ProjectRole = projectRole;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {

            if (! ProjectRole.Any())
            {
                // No roles specified in Attribute
                context.Result = new UnauthorizedResult();
                return;
            }

            var claim = context.HttpContext.User.Claims.SingleOrDefault(x => x.Type == "privileges");
            if (claim == null)
            {
                // user dont have any privlege claims = 'Anonymous' type user, (visitor only)
                context.Result = new UnauthorizedResult();
                return;
            }
            
            string privilegesJSON = claim.Value?? "";
            CustomRole[] allUserPrivleges = JsonSerializer.Deserialize<CustomRole[]>(privilegesJSON) ?? new CustomRole[0];

            if(context.RouteData.Values.ContainsKey(ProjectIdPropertyName) == false)
            {
                throw new Exception($"Project id property with name {ProjectIdPropertyName} not found in controler route argumants. Default value is '_id'.");
            }

            var projectId = context.RouteData.Values[ProjectIdPropertyName];
            int actionOnProjectID = projectId!= null?(int)projectId:-1;

            if(actionOnProjectID<0) throw new Exception($"Project id do not exist in route data");

            if (allUserPrivleges.Length==0)
            {
                // user dont have any privlege claims = 'Anonymous' type user, (visitor only)
                context.Result = new UnauthorizedResult();
                return;
            }

            CustomRole[] userRoleInProject = allUserPrivleges.Where(x => x.Id == actionOnProjectID).ToArray();
            
            if(userRoleInProject.Any() == false)
            {
                // user dont have any privleges in this project = unauthorized
                context.Result = new UnauthorizedResult();
                return;
            }

            // if there is multiple roles required check all of them one by one
            foreach(ProjectRoles requiredRole in ProjectRole) 
            {
                // check if user is assigned to role from user available roles
                if (userRoleInProject.Any(x=>x.Role.Contains(requiredRole)) == false) {

                    // User dont have required role to use this action
                    context.Result = new UnauthorizedResult();
                    return;
                }
            }
            
            // Authorized
            return;
            }
        }
    }
