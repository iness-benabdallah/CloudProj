document.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "unregister-btn"
            )
        ) {

            let registrationId =
                event.target.getAttribute(
                    "data-registration-id"
                );


            $.ajax({

                url:
                    "https://campuseventcontainer.salmonplant-28e24109.swedencentral.azurecontainerapps.io/api/registrations/"
                    + registrationId,

                type: "DELETE",

                success: function() {

                    console.log(
                        "Registration deleted."
                    );

                    displayRegistrations();

                },

                error: function() {

                    console.log(
                        "Could not delete registration."
                    );

                }

            });

        }

    }
);





document.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "edit-registration-btn"
            )
        ) {

            let eventId =
                event.target.value;

            let registrations =
                JSON.parse(
                    localStorage.getItem(
                        "registrations"
                    )
                );

            if (registrations) {

                console.log(
                    "Edit registration:",
                    eventId
                );

            }

        }

    }
);





if (
    document.getElementById(
        "registration-form"
    )
) {

    checkStudentAccess();

    document.getElementById(
        "registration-form"
    ).addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let name =
                document.getElementById(
                    "name"
                ).value.trim();


            let email =
                document.getElementById(
                    "email"
                ).value.trim();


            document.getElementById(
                "name-error"
            ).textContent = "";


            document.getElementById(
                "email-error"
            ).textContent = "";


            if (name === "") {

                document.getElementById(
                    "name-error"
                ).textContent =
                    "Please enter your name.";

                return;

            }


            if (email === "") {

                document.getElementById(
                    "email-error"
                ).textContent =
                    "Please enter your email.";

                return;

            }


            let eventId =
                new URLSearchParams(
                    window.location.search
                ).get("id");


            let registration = {

                eventId:
                    parseInt(eventId),

                name:
                    name,

                email:
                    email

            };


            $.ajax({

                url:
                    "https://campuseventcontainer.salmonplant-28e24109.swedencentral.azurecontainerapps.io/api/registrations",

                type: "POST",

                contentType:
                    "application/json",

                data:
                    JSON.stringify(
                        registration
                    ),

                success:
                    function(
                        createdRegistration
                    ) {

                        console.log(
                            "Registration created:",
                            createdRegistration
                        );


                        localStorage.setItem(
                            "currentStudentEmail",
                            email
                        );


                        window.location.href =
                            "index.html";

                    },

                error:
                    function() {

                        console.log(
                            "Could not create registration."
                        );

                    }

            });

        }
    );

}





function displayRegistrations() {

    let list =
        document.getElementById(
            "registration-list"
        );


    if (!list) {

        return;

    }


    let currentEmail =
        localStorage.getItem(
            "currentStudentEmail"
        );


    list.innerHTML = "";


    $.getJSON(

        "https://campuseventcontainer.salmonplant-28e24109.swedencentral.azurecontainerapps.io/api/registrations",

        function(registrations) {

            $.getJSON(

                "https://campuseventcontainer.salmonplant-28e24109.swedencentral.azurecontainerapps.io/api/events",

                function(events) {

                    registrations.forEach(
                        function(registration) {

                            if (
                                registration.email
                                ==
                                currentEmail
                            ) {

                                events.forEach(
                                    function(event) {

                                        if (
                                            event.id
                                            ==
                                            registration.eventId
                                        ) {

                                            let card = `

                                                <article class="event-card">

                                                    <h3>
                                                        ${event.title}
                                                    </h3>

                                                    <p>
                                                        Date:
                                                        ${event.date}
                                                    </p>

                                                    <p>
                                                        Department:
                                                        ${event.department}
                                                    </p>

                                                    <p>
                                                        Category:
                                                        ${event.category}
                                                    </p>

                                                    <p>
                                                        Name:
                                                        ${registration.name}
                                                    </p>

                                                    <p>
                                                        Email:
                                                        ${registration.email}
                                                    </p>

                                                    <button
                                                        class="edit-registration-btn"
                                                        value="${event.id}">
                                                        Edit
                                                    </button>

                                                    <button
                                                        class="unregister-btn"
                                                        data-registration-id="${registration.id}">
                                                        Unregister
                                                    </button>

                                                </article>

                                            `;


                                            list.innerHTML +=
                                                card;

                                        }

                                    }
                                );

                            }

                        }
                    );

                }

            );

        }

    );

}





displayRegistrations();