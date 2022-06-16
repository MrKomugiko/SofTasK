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
                .Select(x=> new TaskModel
                {
                    Id = x.Id,
                    Description = x.Description,
                    ProjectId = x.ProjectId,
                    OwnerId = x.OwnerId,
                    AssignedId = x.AssignedId,
                    Assigned = new AppUser {
                        Id = x.Assigned.Id,
                        UserName = x.Assigned.UserName,
                        Email = x.Assigned.Email
                    },
                    Createdby =  new AppUser {
                        Id = x.Createdby.Id,
                        UserName = x.Createdby.UserName,
                        Email = x.Createdby.Email
                    },
                    Created = x.Created,
                    Started = x.Started,
                    Ended = x.Ended,
                    Status = x.Status,
                    Priority = x.Priority,
                    Tags = x.Tags,
                    Title = x.Title
                })
                .AsNoTracking().ToListAsync();
        }

        public async Task<TaskModel?> GetSingleOrDefaultAsync(int _id)
        {
            if (_context.Projects == null)
            {
                return null;
            }

            // with select only necessary columns
            TaskModel? task  = await _context.Tasks
            .Select(x => new TaskModel
            {
                Id = x.Id,
                Description = x.Description,
                ProjectId = x.ProjectId,
                OwnerId = x.OwnerId,
                AssignedId = x.AssignedId,
                Assigned = new AppUser
                {
                    Id = x.Assigned.Id,
                    UserName = x.Assigned.UserName,
                    Email = x.Assigned.Email
                },
                Createdby = new AppUser
                {
                    Id = x.Createdby.Id,
                    UserName = x.Createdby.UserName,
                    Email = x.Createdby.Email
                },  
                Created = x.Created,
                Started = x.Started,
                Ended = x.Ended,
                Status = x.Status,
                Priority = x.Priority,
                Tags = x.Tags,
                Title = x.Title
            })
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == _id);


            //// with includes while user table
            //TaskModel? task = await _context.Tasks
            //    .Include(x => x.Assigned)
            //    .Include(x => x.Createdby)
            //    .AsNoTracking()
            //    .SingleOrDefaultAsync(x => x.Id == _id);

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

        public bool TaskExists(int _id)
        {
            return (_context.Tasks?.Any(x => x.Id == _id))
                .GetValueOrDefault();
        }

        public async Task<(bool IsSuccessed, string Message, TaskModel? taskModel)> AddAsync(TaskModel _newTask)
        {
            if (_newTask == null) return (false, "Task cannot be empty.", null);

            if (_context.Projects.Any(x => x.Name == _newTask.Title))
            {
                return (false, "Task Title is already in use.", null);
            }

            _context.Tasks.Add(_newTask);

            if (await _context.SaveChangesAsync() > 0)
            {
                return (true, " Succesfully added new task.", _newTask);
            }

            return (false, "Creating task failed.", null);
        }

        public async Task<TaskModel?> GetTaskByIdAsync(int _id)
        {
            return await _context.Tasks
                .Include(x => x.Createdby)
                .Include(x => x.Assigned)
                .SingleAsync(x=>x.Id ==_id);
        }
    }
}
