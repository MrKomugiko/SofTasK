using Microsoft.EntityFrameworkCore;
using SofTasK.API.Data;
using SofTasK.API.Interfaces;
using SofTasK.API.Models;

namespace SofTasK.API.Repositories
{
    public class TasksRepository : ITasksRepository
    {
        private readonly ApplicationDbContext _context;
        public TasksRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskModel>> GetTasksByProjectAsync(int projectId)
        {
            return await _context.Tasks
                .Where(x => x.ProjectId == projectId)
                .Include(x=>x.Assigned)
                .Include(x => x.Createdby)
                .AsNoTracking().ToListAsync();
        }

        public async Task<TaskModel?> GetSingleOrDefaultAsync(int _id)
        {
            if (_context.Projects == null)
            {
                return null;
            }
            TaskModel? task = await _context.Tasks
                .Include(x => x.Assigned)
                .Include(x => x.Createdby)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == _id);

            return task;
        }


        public async Task<bool> RemoveAsync(int _id)
        {
            var task = await _context.Tasks.FindAsync(_id);
            if (task == null) return false;

            _context.Tasks.Remove(task);

            if (await _context.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> TaskExists(int _id)
        {
            return (_context.Tasks?.Any(x => x.Id == _id))
                .GetValueOrDefault();
        }
    }
}
