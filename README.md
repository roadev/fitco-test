# Trello-like API

## Overview

This project is a **Task Manager API** built using **Node.js** with an **MVC architecture**. It provides authentication, task management, and team collaboration. The database is managed using **MySQL**, running inside a **Docker container** for easy setup.

## Features

- **User authentication** with JWT  
- **Task management** (CRUD, prioritization, assignments)  
- **Project organization** (tasks linked to projects)  
- **Team collaboration** with role-based permissions  
- **Secure password hashing** using bcrypt  
- **Rate limiting** to prevent brute-force attacks  
- **Environment configuration** with dotenv  
- **Docker Compose** setup for MySQL  

## Tech Stack

- **Node.js**
- **Express**
- **MySQL**
- **Sequelize**
- **Docker Compose**
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT authentication)
- **cors** (CORS policy handling)
- **helmet** (security headers)
- **dotenv** (environment variable management)
- **express-session** (session handling)
- **mysql2** (MySQL driver for Node.js)
- **axios** (HTTP requests in tests)
- **jest** (unit testing)

## API Endpoints

### Authentication

| Method | Endpoint           | Description       |
|--------|-------------------|-------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get JWT |

### Tasks

| Method | Endpoint           | Description                      |
|--------|-------------------|----------------------------------|
| POST   | `/api/tasks/`      | Create a new task               |
| GET    | `/api/tasks/`      | Get all tasks for the logged-in user |
| GET    | `/api/tasks/:id`   | Retrieve a specific task        |
| PUT    | `/api/tasks/:id`   | Update a task                   |
| DELETE | `/api/tasks/:id`   | Delete a task                   |

### Projects

| Method | Endpoint         | Description                                |
|--------|-----------------|--------------------------------------------|
| POST   | `/api/projects`  | Create a new project                      |
| GET    | `/api/projects`  | Retrieve all projects of the user         |
| GET    | `/api/projects/:id` | Fetch details of a specific project  |
| PUT    | `/api/projects/:id` | Update project details               |
| DELETE | `/api/projects/:id` | Remove a project                     |

### Team Collaboration

| Method | Endpoint                         | Description                                              |
|--------|----------------------------------|---------------------------------------------------------|
| POST   | `/api/teams`                     | Create a new team                                        |
| GET    | `/api/teams`                     | Retrieve all teams for the authenticated user           |
| GET    | `/api/teams/:id`                 | Get details of a specific team (including members)      |
| PUT    | `/api/teams/:id`                 | Update team details                                      |
| DELETE | `/api/teams/:id`                 | Delete a team                                            |
| POST   | `/api/teams/:id/members`         | Add a member to a team (or invite a new member)         |
| DELETE | `/api/teams/:id/members/:userId` | Remove a member from a team                              |

## Security Features

- **Input Validation**: Ensures valid user input during authentication and task creation.  
- **Rate Limiting**: Blocks an IP for **10 minutes after 5 failed login attempts**.  
- **Centralized Error Handling**: Logs errors without exposing sensitive information.  
- **Secure HTTP Headers**: Uses **helmet** to prevent security vulnerabilities.  
- **SQL Injection Prevention**: Uses **Sequelize parameterized queries** to avoid injection attacks.  

## Installation

### Prerequisites

- Docker & Docker Compose installed  
- Node.js installed (version 22.x or 23.x)

### Steps

This project uses the Node.js v22 runtime, LTS

`nvm use`

nvm is used to manage the node project's version

### Database setup

`docker compose up -d`

### Set ENV vars

`cp .env.example .env`

### ENV vars for dev/prod, modify

`.env`

#### testing env

`.env.test`

### API will be available at

`http://localhost:5000`

## Future work and current stack

This is a mono repo with a config and project structure I often use for full-stack projects in React / Node.
The idea is to use `lerna` to bootstrap all the repo packages, in this case only the `/api` package is included since I did not work on frontend due to time concerns.

LICENSE MIT

by Juan Roa.
