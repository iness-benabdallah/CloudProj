function getEvents() {

    let events = localStorage.getItem("events");

    if (events) {
          return JSON.parse(events);
    }
    return [];
}

