using EventService.Models;
using Microsoft.AspNetCore.Mvc;
namespace EventService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private static List<Event> events = new List<Event>
    {
        new Event
        {
            Id = 1,
            Title = "Cybersecurity Workshop",
            Date = "2026-09-15",
            Department = "Computer Science",
            Category = "Workshop",
            Description = "Introduction to cybersecurity."
        },

        new Event
        {
            Id = 2,
            Title = "Business Networking Event",
            Date = "2026-10-05",
            Department = "Business",
            Category = "Event",
            Description = "Meet students and professionals."
        },


        new Event
        {
            Id = 3,
            Title = "AI and Machine Learning Workshop",
            Date = "2026-10-12",
            Department = "Computer Science",
            Category = "Workshop",
            Description = "Learn the basics of artificial intelligence and machine learning."
        },

        new Event
        {
            Id = 4,
            Title = "Career Networking Day",
            Date = "2026-10-20",
            Department = "Business",
            Category = "Event",
            Description = "Meet companies and professionals and explore future career opportunities."
        },

        new Event
        {
            Id = 5,
            Title = "Web Development Workshop",
            Date = "2026-11-03",
            Department = "Computer Science",
            Category = "Workshop",
            Description = "Learn the fundamentals of modern web development and REST APIs."
        },

        new Event
        {
            Id = 6,
            Title = "Entrepreneurship Meetup",
            Date = "2026-11-10",
            Department = "Business",
            Category = "Event",
            Description = "Students can share business ideas and learn about starting a company."
        },

        new Event
        {
            Id = 7,
            Title = "Cybersecurity Awareness Day",
            Date = "2026-11-18",
            Department = "Computer Science",
            Category = "Event",
            Description = "Discover common cybersecurity threats and learn how to stay safe online."
        },

        new Event
        {
            Id = 8,
            Title = "Digital Business Workshop",
            Date = "2026-12-02",
            Department = "Business",
            Category = "Workshop",
            Description = "Explore how digital technologies are changing modern businesses."
        }











    };

    [HttpGet]
    public IActionResult GetEvents()
    {
        return Ok(events);
    }

    [HttpPost]
    public IActionResult CreateEvent(Event newEvent)
    {
        newEvent.Id = events.Count + 1;

        events.Add(newEvent);

        return Ok(newEvent);
    }
    
    
    [HttpPut("{id}")]
    public IActionResult UpdateEvent(int id, Event updatedEvent)
    {
    var existingEvent = events.FirstOrDefault(e => e.Id == id);

    if (existingEvent == null)
    {
        return NotFound();
    }

    existingEvent.Title = updatedEvent.Title;
    existingEvent.Date = updatedEvent.Date;
    existingEvent.Department = updatedEvent.Department;
    existingEvent.Category = updatedEvent.Category;
    existingEvent.Description = updatedEvent.Description;

    return Ok(existingEvent);
    }



    [HttpDelete("{id}")]
    public IActionResult DeleteEvent(int id)
    {
    var existingEvent = events.FirstOrDefault(e => e.Id == id);

    if (existingEvent == null)
    {
        return NotFound();
    }

    events.Remove(existingEvent);

    return Ok();
    }

                    



}