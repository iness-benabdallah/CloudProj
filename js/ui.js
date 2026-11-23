


function displayEvents(events) {

    let eventList = document.getElementById("event-list");
    eventList.innerHTML = "";
    let role = localStorage.getItem("role");

    events.forEach(function (event) {

          let registerButton = "";

          if (role === "student") {

            registerButton = `
                <a class="register-button" href="event-form.html?id=${event.id}">
                    Register
                </a>
            `;
        }

        let shortDescription = event.description;
        if (event.description.length > 100) {

              shortDescription =
                event.description.substring(0, 100) + "...";
        }



        let card = `
            <article class="event-card">

                <h3>
                <a href="event-details.html?id=${event.id}">
                        ${event.title}
                </a>
                </h3>

                <p>
                    <strong>Date:</strong>
                    ${event.date}
                </p>

                <p>
                    <strong>Department:</strong>
                    ${event.department}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${event.category}
                </p>

                <p>
                    ${shortDescription}
                </p>

                ${registerButton}

            </article>
        `;
       $("#event-list").append(card);

    });

}


