const SYSTEM_API_URL =
    "https://campuseventcontainer.salmonplant-28e24109.swedencentral.azurecontainerapps.io/api/events";


let rolePopup = document.getElementById("role-popup");

if (rolePopup) {

    if (localStorage.getItem("role") === null) {
        rolePopup.style.display = "flex";
    } else {
        rolePopup.style.display = "none";
    }

    document.querySelectorAll(".popup-role").forEach(function (button) {

        button.addEventListener("click", function () {

            let selectedRole = button.value;

            localStorage.setItem("role", selectedRole);

            let roleSelect = document.getElementById("role-select");

            if (roleSelect) {
                roleSelect.value = selectedRole;
            }

            rolePopup.style.display = "none";

            updateInterface();

        });

    });

}


function checkStudentAccess() {

    let role = localStorage.getItem("role");

    if (role !== "student") {
        window.location.href = "index.html";
    }
}


function updateInterface() {

    let role = localStorage.getItem("role");

    let dashboardLink =
        document.getElementById("dashboard-link");

    let registrations =
        document.getElementById("my-registrations");

    if (dashboardLink) {

        if (role === "organizer") {
            dashboardLink.style.display = "inline";
        } else {
            dashboardLink.style.display = "none";
        }

    }

    if (registrations) {

        if (role === "student") {
            registrations.style.display = "block";
        } else {
            registrations.style.display = "none";
        }

    }
}


let editingEventId = null;

let eventForm =
    document.getElementById("event-form");


if (eventForm) {

    eventForm.addEventListener("submit", function (event) {

        event.preventDefault();


        let title =
            document.getElementById("title").value.trim();

        let date =
            document.getElementById("date").value;

        let department =
            document.getElementById("department").value;

        let category =
            document.getElementById("category").value;

        let description =
            document.getElementById("description").value.trim();


        document.getElementById("title-error").textContent = "";

        document.getElementById("date-error").textContent = "";

        document.getElementById("description-error").textContent = "";


        if (title === "") {

            document.getElementById("title-error").textContent =
                "Please enter an event title.";

        }

        if (date === "") {

            document.getElementById("date-error").textContent =
                "Please select a date.";

        }

        if (description === "") {

            document.getElementById("description-error").textContent =
                "Please enter a description.";

        }


        if (
            title === "" ||
            date === "" ||
            description === ""
        ) {

            return;

        }


        let newEvent = {

            title: title,

            date: date,

            department: department,

            category: category,

            description: description

        };


        /*
         * EDIT EVENT
         */

        if (editingEventId) {

            $.ajax({

                url:
                    SYSTEM_API_URL + "/" + editingEventId,

                type: "PUT",

                contentType: "application/json",

                data:
                    JSON.stringify(newEvent),

                success: function (updatedEvent) {

                    console.log(
                        "Event updated:",
                        updatedEvent
                    );

                    editingEventId = null;

                    eventForm.reset();

                    displayDashboardEvents();

                },

                error: function () {

                    console.log(
                        "Could not update event."
                    );

                }

            });


        }

        /*
         * CREATE EVENT
         */

        else {

            $.ajax({

                url:
                    SYSTEM_API_URL,

                type: "POST",

                contentType: "application/json",

                data:
                    JSON.stringify(newEvent),

                success: function (createdEvent) {

                    console.log(
                        "Event created:",
                        createdEvent
                    );

                    eventForm.reset();

                    displayDashboardEvents();

                },

                error: function () {

                    console.log(
                        "Could not create event."
                    );

                }

            });

        }

    });

}


function displayDashboardEvents() {

    let container = document.getElementById("dashboard-events");

    if (!container) {
        return;
    }

    $.getJSON(SYSTEM_API_URL, function (events) {

        let registrations =
            JSON.parse(localStorage.getItem("registrations")) || [];

        $(container).empty();

        events.forEach(function (event) {

            let card = $("<article class='event-card'></article>");

            card.append($("<h3></h3>").text(event.title));
            card.append($("<p></p>").text("Date: " + event.date));
            card.append($("<p></p>").text("Department: " + event.department));
            card.append($("<p></p>").text("Category: " + event.category));
            card.append($("<p></p>").text("Description: " + event.description));

            let students = registrations.filter(function (registration) {
                return registration.eventId == event.id;
            });

            let studentList = $("<div></div>");

            if (students.length === 0) {
                studentList.append($("<p></p>").text("No students registered."));
            } else {
                studentList.append($("<h4></h4>").text("Registered Students"));

                students.forEach(function (student) {
                    studentList.append(
                        $("<p></p>").text("Name: " + student.name + " | Email: " + student.email)
                    );
                });
            }

            let editButton = $("<button></button>")
                .text("Edit")
                .on("click", function () {
                    $("#title").val(event.title);
                    $("#date").val(event.date);
                    $("#department").val(event.department);
                    $("#category").val(event.category);
                    $("#description").val(event.description);
                    editingEventId = event.id;
                });

            let deleteButton = $("<button></button>")
                .text("Delete")
                .on("click", function () {
                    $.ajax({
                        url: SYSTEM_API_URL + "/" + event.id,
                        type: "DELETE",
                        success: function () {
                            console.log("Event deleted.");
                            displayDashboardEvents();
                        },
                        error: function () {
                            console.log("Could not delete event.");
                        }
                    });
                });

            card.append(studentList, editButton, deleteButton);
            $(container).append(card);

        });

    });

}


displayDashboardEvents();
