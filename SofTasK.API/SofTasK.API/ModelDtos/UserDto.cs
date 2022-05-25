namespace SofTasK.API.ModelDtos
{
    public record UserDto
    {
        public string Id { get; init; }
        public string UserName { get; init; }
        public string Email { get; init; }
    }
}
