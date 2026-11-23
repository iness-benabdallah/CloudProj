const SYSTEM_API_URL =
    "https://campuseventcontainer.salmonplant-28e24109.swedencentral.azurecontainerapps.io/api/events";


let rolePopup = document.getElementById("role-popup");

if (rolePopup) {

    if (localStorage.getItem("role") === null) {
        rolePopup.style.display = "flex";
    } else {
        rolePopup.style.display = "none";
    }

    document.querySelectorAll(".popup-role").forEach(function(button) {

        button.addEventListener("click", function() {

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

    eventForm.addEventListener("submit", function(event) {

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

                success: function(updatedEvent) {

                    console.log(
                        "Event updated:",
                        updatedEvent
                    );

                    editingEventId = null;

                    eventForm.reset();

                    displayDashboardEvents();

                },

                error: function() {

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

                success: function(createdEvent) {

                    console.log(
                        "Event created:",
                        createdEvent
                    );

                    eventForm.reset();

                    displayDashboardEvents();

                },

                error: function() {

                    console.log(
                        "Could not create event."
                    );

                }

            });

        }

    });

}


function displayDashboardEvents() {

    let container =
        document.getElementById("dashboard-events");

    if (!container) {
        return;
    }

    $.getJSON(
        SYSTEM_API_URL,
        function(events) {

            let registrations =
                JSON.parse(
                    localStorage.getItem("registrations")
                );

            if (!registrations) {
                registrations = [];
            }

            container.innerHTML = "";

            events.forEach(function(event) {

                let card =
                    document.createElement("article");

                card.setAttribute(
                    "class",
                    "event-card"
                );

                card.innerHTML =
                    "<h3>" +
                    event.title +
                    "</h3>" +

                    "<p>Date: " +
                    event.date +
                    "</p>" +

                    "<p>Department: " +
                    event.department +
                    "</p>" +

                    "<p>Category: " +
                    event.category +
                    "</p>" +

                    "<p>Description: " +
                    event.description +
                    "</p>";


                let students =
                    registrations.filter(
                        function(registration) {

                            return (
                                registration.eventId
                                == event.id
                            );

                        }
                    );


                let studentList =
                    document.createElement("div");


                if (students.length === 0) {

                    studentList.innerHTML =
                        "<p>No students registered.</p>";

                } else {

                    studentList.innerHTML =
                        "<h4>Registered Students</h4>";

                    students.forEach(
                        function(student) {

                            studentList.innerHTML +=
                                "<p>Name: " +
                                student.name +
                                "<br>Email: " +
                                student.email +
                                "</p>";

                        }
                    );

                }


                let editButton =
                    document.createElement("button");

                editButton.textContent =
                    "Edit";


                editButton.addEventListener(
                    "click",
                    function() {

                        document.getElementById("title").value =
                            event.title;

                        document.getElementById("date").value =
                            event.date;

                        document.getElementById("department").value =
                            event.department;

                        document.getElementById("category").value =
                            event.category;

                        document.getElementById("description").value =
                            event.description;

                        editingEventId =
                            event.id;

                    }
                );


                let deleteButton =
                    document.createElement("button");

                deleteButton.textContent =
                    "Delete";


                deleteButton.addEventListener(
                    "click",
                    function() {

                        $.ajax({

                            url:
                                SYSTEM_API_URL + "/" + event.id,

                            type: "DELETE",

                            success: function() {

                                console.log(
                                    "Event deleted."
                                );

                                displayDashboardEvents();

                            },

                            error: function() {

                                console.log(
                                    "Could not delete event."
                                );

                            }

                        });

                    }
                );


                card.appendChild(studentList);

                card.appendChild(editButton);

                card.appendChild(deleteButton);

                container.appendChild(card);

            });

        }
    );

}


displayDashboardEvents();