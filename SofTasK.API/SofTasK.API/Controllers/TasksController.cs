using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SofTasK.API.Extensions;
using SofTasK.API.Interfaces;
using SofTasK.API.ModelDtos;
using SofTasK.API.Models;

namespace SofTasK.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITasksRepository _tasksRepository;

        private readonly UserManager<AppUser> _userManager;

        public TasksController(UserManager<AppUser> userManager, ITasksRepository tasksRepository)
        {
            _userManager = userManager;
            _tasksRepository = tasksRepository;
        }

        // GET: api/Tasks/1
            [HttpGet("{_projectId}")]
            public async Task<ActionResult<IEnumerable<TaskDto>>> GetTaskAsync(int _projectId)
            {
                IEnumerable<TaskModel> tasks = await _tasksRepository.GetTasksByProjectAsync(_projectId);
                if (!tasks.Any()) return new List<TaskDto>(); // 0

                return tasks.Select(x => x.AsDto()).ToList();
            }

            //// GET: api/Projects/5
            //[Authorize]
            //[HttpGet("{_id}")]
            //public async Task<ActionResult<TaskDto>> GetTaskAsync(int _id)
            //{
            //    Project? project = await _projectsRepository.GetSingleOrDefaultAsync(_id);

            //    if (project == null)
            //        return NotFound();

            //    return project.AsDto();
            //}

            //// PUT: api/Projects/5
            //[Authorize]
            //[HttpPut("{_id}")]
            //public async Task<IActionResult> PutProjectAsync(int _id, ProjectEditDto _changedProject)
            //{
            //    if (_id != _changedProject.Id)
            //    {
            //        return BadRequest(error: new { Message = "Updating Projet id do not match with existing project." });
            //    }

            //    var respond = await _projectsRepository.UpdateAsync(_id, new Project
            //    {
            //        Name = _changedProject.Name,
            //        Description = _changedProject.Description
            //    }
            //    );

            //    if (respond.ISuccessed)
            //        return NoContent();
            //    else
            //        return BadRequest(error: respond.Message);
            //}

            //// POST: api/Projects
            //[Authorize]
            //[HttpPost]
            //public async Task<ActionResult<ProjectDto>> PostProjectAsync(CreateProjectDto _newProject)
            //{
            //    if (_newProject == null)
            //    {
            //        return Problem("Entity set 'ApplicationDbContext.Projects'  is null.");
            //    }

            //    AppUser user = await _userManager.FindByNameAsync(_userManager.GetUserName(User));

            //    Project newProject = new Project() with
            //    {
            //        Description = _newProject.Description,
            //        Name = _newProject.Name,
            //        OwnerId = user.Id,
            //        Owner = user
            //    };


            //    var result = await _projectsRepository.AddAsync(newProject);

            //    if (result.IsSuccessed && result.project != null)
            //        return CreatedAtAction("GetProjects", new { id = result.project.Id }, result.project.AsDto());
            //    else
            //        return BadRequest(error: result.Message);

            //}

            //// DELETE: api/Projects/5
            //[Authorize]
            //[HttpDelete("{_id}")]
            //public async Task<IActionResult> DeleteProjectAsync(int _id)
            //{
            //    var project = await _projectsRepository.GetSingleOrDefaultAsync(_id);

            //    if (project == null) return NotFound();

            //    await _projectsRepository.RemoveAsync(project);

            //    return NoContent();
            //}
        }

    }
