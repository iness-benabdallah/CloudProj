let params = new URLSearchParams(window.location.search);
let id = params.get("id");
let events = getEvents();
let event = events.find(function (event) {
    return String(event.id) === id;
});

if (event) {
    let card = $("<article class='event-card'></article>");

    card.append($("<h2></h2>").text(event.title));
    card.append($("<p></p>").text("Date: " + event.date));
    card.append($("<p></p>").text("Department: " + event.department));
    card.append($("<p></p>").text("Category: " + event.category));
    card.append($("<p></p>").text(event.description));

    $("#event-details").empty().append(card);
} else {
    $("#event-details").append($("<p></p>").text("Event not found."));
}
