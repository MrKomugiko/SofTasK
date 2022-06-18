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
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITasksRepository _tasksRepository;
        private readonly IProjectsRepository _projectsRepository;


        private readonly UserManager<AppUser> _userManager;

        public TasksController(UserManager<AppUser> userManager, ITasksRepository tasksRepository, IProjectsRepository projectsRepository)
        {
            _userManager = userManager;
            _tasksRepository = tasksRepository;
            _projectsRepository = projectsRepository;
        }

        // GET: api/Tasks/All/1
        [HttpGet("All/{_projectId}")]
        public async Task<ActionResult<IEnumerable<TaskDto>>?> GetTasksAsync(int _projectId)
        {
            // check if project exist
            bool projectExist = _projectsRepository.ProjectExists(_projectId);
            if (!projectExist) return BadRequest(error:$"Project {_projectId} do not exist");  
  
            IEnumerable<TaskModel> tasks = await _tasksRepository.GetTasksByProjectAsync(_projectId);
            if (!tasks.Any()) return new List<TaskDto>(); // 0

            return tasks.Select(x => x.AsDto()).ToList();
        }
        
        // GET: api/Task/1
        [HttpGet("{_taskId}")]
        public async Task<ActionResult<TaskDto?>> GetTaskAsync(int _taskId)
        {
            // check if project exist
            bool taskExists = _tasksRepository.TaskExists(_taskId);
            if (!taskExists) return BadRequest(error: $"Task with given ID: {_taskId} do not exist");

            TaskModel? task = await _tasksRepository.GetTaskByIdAsync(_taskId);
            if (task == null) return NotFound(); // 0

            return task.AsDto();
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<TaskDto>> PostTaskAsync(CreateTaskDto _newTask)
        {
            if (_newTask == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Projects'  is null.");
            }

            string userGUID = _userManager.FindByNameAsync(_userManager.GetUserName(User)).Result.Id;

            TaskModel newTask = new TaskModel() with
            {
                ProjectId = _newTask.ProjectId, 
                Title = _newTask.Title, 
                Description = _newTask.Description, 
                Status = _newTask.Status, 
                Priority = _newTask.Priority, 
                OwnerId = userGUID,
                Tags = String.Join(",", _newTask.Tags)
            };


            (bool IsSuccessed, string Message, TaskModel? taskModel) = await _tasksRepository.AddAsync(newTask);

            if (IsSuccessed && taskModel != null)
                return CreatedAtAction("GetTask", new { _taskId = taskModel.Id }, taskModel.AsDto());
            else
                return BadRequest(error: Message);

        }

        // DELETE: api/Tasks/5
        [HttpDelete("{_id}")]
        public async Task<IActionResult> DeleteTaskAsync(int _id)
        {
            bool taskExist = _tasksRepository.TaskExists(_id);

            if (! taskExist) 
                return NotFound(new { Message = "Error while deleting task, task do not exist" });

            await _tasksRepository.RemoveAsync(_id);

            return NoContent();
        }
    }

    }
