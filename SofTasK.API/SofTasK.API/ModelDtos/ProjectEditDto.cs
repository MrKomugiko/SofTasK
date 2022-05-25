using SofTasK.API.ModelDtos;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SofTasK.API.Models
{
    public record ProjectEditDto
    {
        [Required] public int Id { get; init; }
        [Required] public string Name { get; init; }
        public string Description { get; init; } = string.Empty;
    }
}
