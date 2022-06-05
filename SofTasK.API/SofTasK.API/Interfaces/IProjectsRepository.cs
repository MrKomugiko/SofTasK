using SofTasK.API.Models;

namespace SofTasK.API.Interfaces
{
    public interface IProjectsRepository
    {

        /// <summary>
        /// 
        /// </summary>
        /// <returns>List of Projects with included Owners data or empty list</returns>
        Task<IEnumerable<Project>> GetListAsync();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_id"> Existing project Id.</param>
        /// <returns>Project by ID, or null if not exist.</returns>
        Task<Project?> GetSingleOrDefaultAsync(int _id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_updatedProject">Existing project with changed data.</param>
        /// <returns>True if updating successed or false when failed or throw error.</returns>
        Task<(bool ISuccessed, string Message)> UpdateAsync(int _id, Project _updatedProject);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_newProject">New project object ready to push into server, with added owner</param>
        /// <returns>boolean state if adding Succesed and Project object if added</returns>
        Task<(bool IsSuccessed, string Message, Project? project)> AddAsync(Project _newProject);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_project">Existing project from db.</param>
        /// <returns>boolean state if removing succesed</returns>
        Task<bool> RemoveAsync(Project _project);
        bool ProjectExists(int _id);
    }
}