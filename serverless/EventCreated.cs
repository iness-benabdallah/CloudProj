using Microsoft.Azure.Functions.Worker;

namespace Company.Function;

public class EventCreated
{
    [Function("EventCreated")]
    public string Run()
    {
        return "New campus event created!";
    }
}