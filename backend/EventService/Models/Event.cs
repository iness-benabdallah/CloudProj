namespace EventService.Models;

public class Event
{
    public int Id { get; set; }

    public string Title { get; set; } = "";

    public string Date { get; set; } = "";

    public string Department { get; set; } = "";

    public string Category { get; set; } = "";

    public string Description { get; set; } = "";
}