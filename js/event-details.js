let id = window.location.search.split("=")[1];
let events = getEvents();
let event = events.find(function (event) {
      return event.id == id;
});

if (event) {

    let detail = `
     <article class="event-card">

            <h2>${event.title}</h2>

            <p>Date: ${event.date}</p>

            <p>Department: ${event.department}</p>

            <p>Category: ${event.category}</p>

            <p>${event.description}</p>

        </article>
    `;
    $("#event-details").html(detail);
}