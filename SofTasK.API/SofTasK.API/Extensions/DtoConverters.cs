using SofTasK.API.ModelDtos;
using SofTasK.API.Models;

namespace SofTasK.API.Extensions
{
    public static class DtoConverters
    {
        public static ProjectDto AsDto(this Project project) => 
            new ProjectDto() with
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                OwnerId = project.OwnerId,
                Owner = project.Owner.AsDto(),
                Collaborators = project.Collaborators==null?new List<UserDto>():project.Collaborators.Select(x=>x.AppUser.AsDto()).ToList()
            };

        public static UserDto AsDto(this AppUser appUser) =>
            new UserDto() with
            {
                Id = appUser.Id,
                UserName = appUser.UserName,
                Email = appUser.Email
            };
    }
}

