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
                Collaborators = project.Collaborators==null?new List<UserDto>():project.Collaborators.Select(x=>x.AppUser.AsDto()).ToList(),
                AllTasks = project.AllTasks==null?new List<TaskDto>():project.AllTasks.Select(x=>x.AsDto()).ToList()
            };

        public static UserDto AsDto(this AppUser appUser) =>
            new UserDto() with
            {
                Id = appUser.Id,
                UserName = appUser.UserName,
                Email = appUser.Email
            };

        public static TaskDto AsDto(this TaskModel taskModel)
        {
            TaskDto x = new TaskDto() with
            {
                Id =taskModel.Id,
                Title = taskModel.Title,
                Priority = taskModel.Priority,
                Status = taskModel.Status,
                
                Created = taskModel.Created,    
                Started = taskModel.Started,
                Ended = taskModel.Ended,
                
                ProjectId = taskModel.ProjectId,

                Createdby = taskModel.Createdby.AsDto(),
                Assigned = taskModel.Assigned.AsDto()
            };

            return x;
        }
    }
}

