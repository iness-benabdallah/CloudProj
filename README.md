# Campus Events Management System

A web-based application designed to simplify campus event management. Students can explore upcoming events and register for them, while organizers can create, update, and manage events and registrations.

<p align="center">
  <a href="https://campuseventfrontend-iness.azurewebsites.net/index.html">
    <strong>🌐 View the Deployed Application</strong>
  </a>
</p>

---

## ✨ Key Features

- **Role Selection:** Different interfaces for Guests, Students, and Organizers.
- **Event Browsing:** Explore available campus events.
- **Search & Filtering:** Find events by category, department, and date.
- **Student Registration:** Register for events and manage registrations.
- **Event Management:** Organizers can create, edit, and delete events.
- **Registration Overview:** View students registered for specific events.

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, jQuery |
| Backend | C#, ASP.NET Core Web API (.NET 9) |
| Cloud & Deployment | Microsoft Azure, Docker |

## 💻 My Contributions

- Independently developed the frontend structure using HTML and implemented the styling using CSS.
- Wrote JavaScript functionality and used jQuery for dynamic UI interactions.
- Implemented event browsing, searching, filtering, and registration functionality.
- Integrated frontend components with REST API endpoints.
- Worked with C# backend controllers and API operations.
- Gained practical experience with application deployment and configuration through Microsoft Azure.
## 📁 Project Structure

```text
campus-events/
│
├── README.md
├── .gitattributes
├── index.html
├── dashboard.html
├── event-details.html
├── event-form.html
│
├── css/
│   └── style.css
│
├── data/
│   └── events.json
│
├── js/
│   ├── app.js
│   ├── ui.js
│   ├── system.js
│   ├── storage.js
│   ├── registration.js
│   └── event-details.js
│
├── images/
│   └── community.jpg
│
├── backend/
│   └── EventService/
│       ├── Program.cs
│       ├── Controllers/
│       ├── Models/
│       ├── Properties/
│       ├── Dockerfile
│       ├── EventService.csproj
│       ├── EventService.http
│       ├── appsettings.json
│       └── appsettings.Development.json
│
└── serverless/
    ├── Properties/
    │   └── launchSettings.json
    ├── .gitignore
    ├── Program.cs
    ├── EventCreated.cs
    ├── serverless.csproj
    └── host.json

```

## ⚠️ Current Limitations

- User roles are currently managed on the client side.
- Authentication and server-side authorization are not implemented.
- Application data is stored in memory and is not persistent.
- API endpoints do not currently enforce user-specific access permissions.

## 🚀 Future Improvements

- Implement secure authentication and server-side authorization.
- Integrate a persistent database.
- Improve input validation and error handling.
- Strengthen API security and access control.

---

<p align="center">
  <i>Developed as a university project to gain practical experience in web development, API integration, and cloud deployment.</i>
</p>
