# Task Manager API

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

### Tasks

| Method | Endpoint        | Description                      |
|--------|----------------|----------------------------------|
| POST   | `/api/tasks/`   | Create a new task               |
| GET    | `/api/tasks/`   | Get all tasks for the logged-in user |

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