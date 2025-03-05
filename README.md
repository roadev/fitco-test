# Trello-like API

## Overview

This project is a **Task Manager API** built using **Node.js** with an **MVC architecture**. It provides authentication, task management, and real-time updates using WebSockets. The database is managed using **MySQL** and runs inside a **Docker container** for easy setup.

## Features

- User authentication with JWT
- Task management (CRUD)
- Secure password hashing using bcrypt
- Real-time task updates via WebSockets
- Environment configuration with dotenv
- Docker Compose setup for MySQL server
- Unit tests using Jest

## Tech Stack

- **Node.js**
- **Express**
- **MySQL**
- **Docker Compose**
- **Socket.io**
- **bcrypt**
- **jsonwebtoken**
- **cors**
- **helmet**: Enhances API security

## API Endpoints

### Authentication

| Method | Endpoint           | Description       |
|--------|-------------------|-------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get JWT |

### Tasks (needs update docs)

| Method | Endpoint        | Description                      |
|--------|----------------|----------------------------------|
| POST   | `/api/tasks/`   | Create a new task               |
| GET    | `/api/tasks/`   | Get all tasks for the logged-in user |


## Projects Feature Overview

## **Purpose**
The **Projects** feature allows users to organize their tasks under structured projects. This enhances productivity by grouping related tasks and providing a clear overview of different work areas.

## **Key Features**
- **Project Creation**: Users can create projects with a name and an optional description.
- **Task Association**: Tasks can be linked to specific projects for better organization.
- **User Ownership**: Each project is tied to a user, ensuring data privacy.
- **Project Management**:
  - Retrieve all projects belonging to a user.
  - Fetch details of a specific project.
  - Update project details.
  - Delete projects (tasks remain but lose project association).

## **Expected Benefits**
- **Improved Organization**: Users can categorize tasks based on different projects.
- **Better Task Management**: Easier tracking of progress within each project.
- **Scalability**: Enables future features like team collaboration, reporting, and deadlines.

## **Endpoints Summary**
| Method | Endpoint         | Description                               
|--------|-----------------|-------------------------------------------
| POST   | `/api/projects`  | Create a new project                     
| GET    | `/api/projects`  | Retrieve all projects of the user       
| GET    | `/api/projects/:id` | Fetch details of a specific project 
| PUT    | `/api/projects/:id` | Update project details              
| DELETE | `/api/projects/:id` | Remove a project                 

## **Next Steps**
- Implement a **dashboard view** to provide users with an overview of their projects and tasks.
- Introduce **team collaboration features**, allowing multiple users to work on shared projects.
- Enhance **task prioritization and deadline tracking** within projects.

## Team Collaboration Feature Overview

## Purpose
The Team Collaboration feature enables multiple users to work together on shared projects and tasks. It provides a way to organize users into teams, assign roles, and manage shared workspaces.

## Key Models

### Team
- **id**: Primary key.
- **name**: Required; the name of the team.
- **description**: Optional; details about the team.
- **ownerId**: References the user who created the team.

### TeamMember
- **id**: Primary key.
- **role**: Enum; one of "admin", "member", or "viewer".
- **userId**: References the user.
- **teamId**: References the team.

## Associations
- A **Team** belongs to one **User** (owner).
- A **Team** has many **TeamMembers**.
- A **User** can belong to many **Teams** through **TeamMembers**.

## Proposed Endpoints

| Method | Endpoint                         | Description                                             
|--------|----------------------------------|---------------------------------------------------------
| POST   | `/api/teams`                     | Create a new team                                       
| GET    | `/api/teams`                     | Retrieve all teams for the authenticated user           
| GET    | `/api/teams/:id`                 | Get details of a specific team (including members)      
| PUT    | `/api/teams/:id`                 | Update team details                                     
| DELETE | `/api/teams/:id`                 | Delete a team                                           
| POST   | `/api/teams/:id/members`         | Add a member to a team (or invite a new member)         
| DELETE | `/api/teams/:id/members/:userId` | Remove a member from a team                             

## Future Enhancements
- Implement role-based permissions to control what actions each team member can perform.
- Extend team functionality to include shared projects and tasks.
- Add activity logs to track changes and collaborations within teams.


## Security Features

### Input Validation
- Ensures **name, email, and password** meet security requirements during registration.
- Prevents **malformed login requests** with strict email and password validation.

### Rate Limiting (Manual Implementation)
- Blocks an IP **for 10 minutes** after **5 failed login attempts** within **15 minutes**.
- Prevents **brute force attacks** without relying on external libraries.
- Resets failed attempts **after a successful login**.

### Centralized Error Handling
- Captures and logs errors without exposing sensitive information.
- Ensures **consistent API responses** for failures.
- 
### Secure HTTP Headers
- Implements **helmet** to prevent **clickjacking, XSS, and data leaks**.
- Hides **server information** to reduce attack surface.

### Session Security
- Enforces **httpOnly** cookies to prevent **JavaScript-based attacks**.
- Uses **secure cookies in production**.

### SQL Injection Prevention
- Uses **Sequelize parameterized queries** to eliminate injection risks.

## Installation

### Prerequisites

- Docker & Docker Compose installed
- Node.js installed (version 22.x or 23.x)

### Steps

This project uses the Node.js v22 runtime, LTS

`nvm use`

nvm is used to manage the node project's version