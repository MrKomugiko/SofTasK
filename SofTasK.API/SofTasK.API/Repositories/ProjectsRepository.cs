using Microsoft.EntityFrameworkCore;
using SofTasK.API.Data;
using SofTasK.API.Interfaces;
using SofTasK.API.Models;

namespace SofTasK.API.Repositories
{
    public class ProjectsRepository : IProjectsRepository
    {
        private readonly ApplicationDbContext _context;
        public ProjectsRepository(ApplicationDbContext context)
        {
            _context = context;
        }
       
        public async Task<IEnumerable<Project>> GetListAsync()
        {
            if (_context.Projects == null)
            {
                return new List<Project>();
            }

            return await _context.Projects
                .Include(x => x.Owner)
                .ToListAsync();
        }

        public async Task<Project?> GetSingleOrDefaultAsync(int _id)
        {
            if (_context.Projects == null)
            {
                return null;
            }
            Project? project = await _context.Projects
                .Include(x => x.Owner)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == _id);

            if (project == null)
            {
                return null;
            }

            return project;
        }

        public async Task<(bool ISuccessed, string Message)> UpdateAsync(int _id, Project _updatedProject)
        {
            Project? orginalProject = await GetSingleOrDefaultAsync(_id);

            if (orginalProject == null) return (false, "Project do not exist.");

            orginalProject.Name = _updatedProject.Name;
            orginalProject.Description = _updatedProject.Description;

            _context.Update(orginalProject);

            try
            {
                await _context.SaveChangesAsync();
                return (true, "Success, project updated");
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ProjectExists(_updatedProject.Id))
                {
                    return (false,"Project do not exist.");
                }
                else
                {
                    return (false, $"ERROR: {ex.Message}");
                    //throw;
                }
            }
        }

        public async Task<(bool IsSuccessed, string Message, Project? project)> AddAsync(Project _newProject)
        {
            if (_newProject == null) return ( false, "Project cannot be empty." , null );

            if(_context.Projects.Any(x=>x.Name == _newProject.Name))
            {
                return (false, "Project Name already in use.", null);
            }

            _context.Projects.Add(_newProject);

            if(await _context.SaveChangesAsync()>0)
            {
                return ( true," Succesfully added new project.", _newProject );
            }

            return ( false, "Creating project failed.", null );
        }
       
        public async Task<bool> RemoveAsync(Project _project)
        {
            _context.Projects.Remove(_project);

            if( await _context.SaveChangesAsync() > 0 )
            {
                return true;
            }
            return false;
        }

        private bool ProjectExists(int _id)
        {
            return (_context.Projects?.Any(x => x.Id == _id))
                .GetValueOrDefault();
        }
    }
}
