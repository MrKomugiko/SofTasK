using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SofTasK.API.Data;
using SofTasK.API.Extensions;
using SofTasK.API.Models;

namespace SofTasK.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;

        public ProjectsController(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Projects
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsAsync()
        {
          if (_context.Projects == null)
          {
              return NotFound();
          }
            return await _context.Projects
                .Include(x=>x.Owner)
                .Select(x=>x.AsDto())
                .ToListAsync();
        }

        // GET: api/Projects/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProjectAsync(int id)
        {
          if (_context.Projects == null)
          {
              return NotFound();
          }
            var project = await _context.Projects.Include(x=>x.Owner).SingleOrDefaultAsync( x=> x.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            return project.AsDto();
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectAsync(int id, ProjectDto project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ProjectDto>> PostProjectAsync(CreateProjectDto newProject)
        {
            if (_context.Projects == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Projects'  is null.");
            }
     
            AppUser user = await _userManager.FindByNameAsync(_userManager.GetUserName(User));

            Project project = new Project {
                Description = newProject.Description,
                Name = newProject.Name,
                OwnerId = user.Id,
                Owner = user
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project.AsDto());
        }

        // DELETE: api/Projects/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectAsync(int id)
        {
            if (_context.Projects == null)
            {
                return NotFound();
            }
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return (_context.Projects?.Any(e => e.Id == id))
                .GetValueOrDefault();
        }
    }
}
