function labelledParagraph(label, value) {
    return $("<p></p>")
        .append($("<strong></strong>").text(label + " "))
        .append(document.createTextNode(value));
}


function displayEvents(events) {

    let eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    let role = localStorage.getItem("role");

    events.forEach(function (event) {

        let description = String(event.description || "");

        if (description.length > 100) {
            description = description.substring(0, 100) + "...";
        }

        let card = $("<article class='event-card'></article>");

        let heading = $("<h3></h3>").append(
            $("<a></a>")
                .attr("href", "event-details.html?id=" + encodeURIComponent(event.id))
                .text(event.title)
        );

        card.append(heading);
        card.append(labelledParagraph("Date:", event.date));
        card.append(labelledParagraph("Department:", event.department));
        card.append(labelledParagraph("Category:", event.category));
        card.append($("<p></p>").text(description));

        if (role === "student") {
            card.append(
                $("<a class='register-button'></a>")
                    .attr("href", "event-form.html?id=" + encodeURIComponent(event.id))
                    .text("Register")
            );
        }

        $(eventList).append(card);

    });

}
