const API_URL =
    "https://campuseventcontainer.salmonplant-28e24109.swedencentral.azurecontainerapps.io/api/events";

// LOAD EVENTS
$.getJSON(API_URL, function (data) {

    localStorage.setItem("events", JSON.stringify(data));

    displayEvents(data);
    updateInterface();

}).fail(function () {

    console.log("Could not load events from Azure.");

});


// ROLE SELECT
let roleSelect = document.getElementById("role-select");

if (roleSelect) {

    roleSelect.addEventListener("change", function () {

        localStorage.setItem("role", this.value);

        displayEvents(getEvents());

        updateInterface();

    });

}


// SEARCH
let searchInput =
    document.getElementById("search-input");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        filterEvents();

    });

}


// CATEGORY FILTER
let categoryFilter =
    document.getElementById("category-filter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        filterEvents();

    });

}


// DEPARTMENT FILTER
let departmentFilter =
    document.getElementById("department-filter");

if (departmentFilter) {

    departmentFilter.addEventListener("change", function () {

        filterEvents();

    });

}


// DATE FILTER
let dateFilter =
    document.getElementById("date-filter");

if (dateFilter) {

    dateFilter.addEventListener("change", function () {

        filterEvents();

    });

}


// FILTER EVENTS
function filterEvents() {

    let search =
        document
            .getElementById("search-input")
            .value
            .toLowerCase();

    let category =
        document.getElementById("category-filter").value;

    let department =
        document.getElementById("department-filter").value;

    let date =
        document.getElementById("date-filter").value;

    let events = getEvents();

    let filteredEvents = [];

    events.forEach(function (event) {

        if (
            event.title.toLowerCase().includes(search) &&
            (category === "" ||
                event.category === category) &&
            (department === "" ||
                event.department === department) &&
            (date === "" ||
                event.date === date)
        ) {

            filteredEvents.push(event);

        }

    });

    displayEvents(filteredEvents);

}