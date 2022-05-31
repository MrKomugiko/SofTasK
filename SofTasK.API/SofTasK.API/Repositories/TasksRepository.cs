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
    }
}
