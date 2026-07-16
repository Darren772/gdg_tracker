# GDG Event & Budget Tracker

A full-stack web app for managing GDG events and tracking expenses against each event's budget.

Built as a personal learning project to get hands-on with **Angular**, **Spring Boot**, and layered (MVVM-style) architecture.

---

## What I built / learned

This started as a task to learn Angular + Spring Boot APIs and MVVM architecture from scratch. Over the course of building it I went from "no idea what these are" to a working, database-backed full-stack app. Along the way I learned:

- How a REST API works, and how a frontend and backend talk over HTTP (JSON)
- Building a Spring Boot backend with a clean **Controller → Service → Repository** layering
- Persisting data with a real database (H2 + JPA), including a **one-to-many relationship** between tables
- Building an Angular frontend with standalone components, signals, and services
- Wiring the two halves together (and debugging real issues like CORS and Angular's zoneless change detection)

---

## Features

- **Manage events** — create, view, and delete GDG events, each with a budget
- **Track expenses** — add and delete expenses that belong to a specific event
- **Budget overview** — click an event to see its expenses, total spent, and remaining budget
- **Persistent storage** — all data is saved in a database, so it survives restarts

---

## Tech stack

**Backend**
- Java 21
- Spring Boot 4.1 (Spring Web, Spring Data JPA)
- H2 database (file-based)
- Maven

**Frontend**
- Angular 21 (standalone components, signals)
- TypeScript
- HttpClient for API calls

---

## Architecture

The project follows a layered structure that mirrors the MVVM idea — separating data, logic, and presentation.

**Backend (Spring Boot)**
- **Model / Entity** (`Event`, `Expense`) — the data shape, mapped to database tables
- **Repository** — database access (via Spring Data JPA)
- **Service** — business logic
- **Controller** — REST endpoints

**Frontend (Angular)**
- **Model** — TypeScript interfaces describing the data
- **Service** — talks to the backend API
- **Component (ViewModel)** — holds state and logic
- **Template (View)** — what the user sees

The two `Event` and `Expense` tables are linked with a `@ManyToOne` relationship — each expense belongs to one event.

---

## API endpoints

| Method | Endpoint | Description |
|--------|----------------------|--------------------------------|
| GET    | `/events`            | Get all events                 |
| POST   | `/events`            | Create an event                |
| DELETE | `/events/{id}`       | Delete an event                |
| GET    | `/expenses`          | Get all expenses               |
| POST   | `/expenses?eventId=` | Create an expense for an event |
| DELETE | `/expenses/{id}`     | Delete an expense              |

---

## How to run

You'll need **Java 21+** and **Node.js** installed.

### 1. Backend (runs on port 8080)

```bash
cd tracker
./mvnw spring-boot:run
```

On Windows:

```powershell
cd tracker
.\mvnw.cmd spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 2. Frontend (runs on port 4200)

```bash
cd frontend
npm install
ng serve
```

Then open `http://localhost:4200` in your browser.

> Note: run both the backend and frontend at the same time (in separate terminals) — the frontend calls the backend API.

---

## Project structure

```
gdg_tracker/
├── tracker/              # Spring Boot backend
│   └── src/main/java/com/gdg/tracker/
│       ├── Event.java              # Event entity
│       ├── Expense.java            # Expense entity (linked to Event)
│       ├── EventController.java    # Event REST endpoints
│       ├── ExpenseController.java  # Expense REST endpoints
│       ├── EventService.java       # Event logic
│       ├── ExpenseService.java     # Expense logic
│       ├── EventRepository.java    # Event DB access
│       └── ExpenseRepository.java  # Expense DB access
│
└── frontend/            # Angular frontend
    └── src/app/
        ├── app.ts              # Main component (logic + state)
        ├── app.html            # Template (UI)
        ├── event.ts            # Event model
        ├── expense.ts          # Expense model
        ├── event.service.ts    # Event API calls
        └── expense.service.ts  # Expense API calls
```

---

## Possible improvements

Things I'd add with more time:

- Editing events and expenses (currently create + delete only)
- Categories for expenses
- User authentication
- A nicer, styled UI
