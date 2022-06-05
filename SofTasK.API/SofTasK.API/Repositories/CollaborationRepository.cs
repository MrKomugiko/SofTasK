using SofTasK.API.Data;

namespace SofTasK.API.Repositories
{
    public class CollaborationRepository
    {
        private readonly ApplicationDbContext _context;
        public CollaborationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

       
    }
}
