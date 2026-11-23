using EventService.Models;
using Microsoft.AspNetCore.Mvc;

namespace EventService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegistrationsController : ControllerBase
{
    private static List<Registration> registrations =
        new List<Registration>();


    [HttpGet]
    public IActionResult GetRegistrations()
    {
        return Ok(registrations);
    }


    [HttpPost]
    public IActionResult CreateRegistration(
        Registration registration)
    {
        registration.Id = registrations.Count == 0
            ? 1
            : registrations.Max(r => r.Id) + 1;

        registrations.Add(registration);

        return Ok(registration);
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteRegistration(int id)
    {
        var registration =
            registrations.FirstOrDefault(
                r => r.Id == id
            );

        if (registration == null)
        {
            return NotFound();
        }

        registrations.Remove(registration);

        return Ok();
    }
}
