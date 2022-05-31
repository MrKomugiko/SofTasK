using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SofTasK.API.Data;
using SofTasK.API.Extensions;
using SofTasK.API.Interfaces;
using SofTasK.API.Models;

namespace SofTasK.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectsRepository _projectsRepository;

        private readonly UserManager<AppUser> _userManager;

        public ProjectsController(UserManager<AppUser> userManager, IProjectsRepository projectsRepository)
        {
            _userManager = userManager;
            _projectsRepository = projectsRepository;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsAsync()
        {
            IEnumerable<Project> projects = await _projectsRepository.GetListAsync();
            if (!projects.Any()) return new List<ProjectDto>();
                
            return projects.Select(x=>x.AsDto()).ToList();
        }

        // GET: api/Projects/5
        [Authorize]
        [HttpGet("{_id}")]
        public async Task<ActionResult<ProjectDto>> GetProjectAsync(int _id)
        {
            Project? project = await _projectsRepository.GetSingleOrDefaultAsync(_id);

            if (project == null)
                return NotFound();

            return project.AsDto();
        }

        // PUT: api/Projects/5
        [Authorize]
        [HttpPut("{_id}")]
        public async Task<IActionResult> PutProjectAsync(int _id, ProjectEditDto _changedProject)
        {
            if (_id != _changedProject.Id)
            {
                return BadRequest(error: new { Message = "Updating Projet id do not match with existing project." });
            }

            var respond = await _projectsRepository.UpdateAsync(_id, new Project { 
                Name=_changedProject.Name, 
                Description = _changedProject.Description }
            );

            if (respond.ISuccessed)
                return NoContent();
            else
                return BadRequest(error: respond.Message);
        }

        // POST: api/Projects
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ProjectDto>> PostProjectAsync(CreateProjectDto _newProject)
        {
            if (_newProject == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Projects'  is null.");
            }

            AppUser user = await _userManager.FindByNameAsync(_userManager.GetUserName(User));

            Project newProject = new Project() with
            {
                Description = _newProject.Description,
                Name = _newProject.Name,
                OwnerId = user.Id,
                Owner = user
            };


            var result = await _projectsRepository.AddAsync(newProject);

            if (result.IsSuccessed && result.project != null)
                return CreatedAtAction("GetProjects", new { id = result.project.Id }, result.project.AsDto());
            else
                return BadRequest(error:result.Message);

        }

        // DELETE: api/Projects/5
        [Authorize]
        [HttpDelete("{_id}")]
        public async Task<IActionResult> DeleteProjectAsync(int _id)
        {
            var project = await _projectsRepository.GetSingleOrDefaultAsync(_id);

            if (project == null) return NotFound();

            await _projectsRepository.RemoveAsync(project);

            return NoContent();
        }
    }

}
