# Realtime Chat System

A scalable real-time collaborative workspace platform built with GraphQL, Socket.IO, Redis Pub/Sub, PostgreSQL, Prisma, Docker, and JWT authentication.

The project allows users to create and manage workspaces, assign roles, communicate in real time, and scale horizontally across multiple API instances while maintaining synchronized state through Redis Pub/Sub.

---

## Features

### Authentication

* JWT-based authentication
* Protected GraphQL operations
* Protected Socket.IO connections
* User registration and login

### Workspace Management

* Create workspaces
* Delete workspaces
* Add members to workspaces
* Remove members from workspaces
* Update member roles
* Role-based access control

### Real-Time Messaging

* Send messages
* Update messages
* Delete messages
* Real-time event broadcasting
* Workspace-based chat rooms

### Horizontal Scaling

* Redis Pub/Sub integration
* Multiple API instances can run simultaneously
* Message synchronization between servers
* Real-time events distributed across all connected nodes

### Database

* PostgreSQL
* Prisma ORM
* Relational data modeling
* Transactions for critical operations

### Testing

* Unit Tests
* Integration Tests
* Jest
* Supertest

### DevOps

* Dockerized infrastructure
* PostgreSQL container
* Redis container
* GitHub Actions CI pipeline
* Automated test execution on push

---

# Architecture

```text
Client
   |
   v
GraphQL API
   |
   +----------------+
   |                |
   v                v
Socket.IO        PostgreSQL
   |
   v
Redis Pub/Sub
   |
   v
Other API Instances
```

The system supports horizontal scaling by using Redis Pub/Sub.

When a message is created on one API instance:

1. The message is stored in PostgreSQL.
2. The API publishes an event to Redis.
3. All API instances receive the event.
4. Connected clients receive the update in real time.

---

# Technologies

## Backend

* Node.js
* Express
* GraphQL
* Apollo Server

## Real-Time Communication

* Socket.IO
* Redis Pub/Sub

## Database

* PostgreSQL
* Prisma ORM

## Authentication

* JWT

## Testing

* Jest
* Supertest

## Infrastructure

* Docker
* Docker Compose
* GitHub Actions

---

# Database Design

Main entities:

```text
User
Workspace
WorkspaceMember
Message
```

Relationships:

```text
User
 └── WorkspaceMember

Workspace
 └── WorkspaceMember

Workspace
 └── Message

User
 └── Message
```

---

# Real-Time Event Flow

## Send Message

```text
Client
   |
   v
Socket.IO Event
   |
   v
Message Service
   |
   v
PostgreSQL
   |
   v
Redis Publish
   |
   v
Redis Subscribers
   |
   v
Socket.IO Broadcast
   |
   v
Connected Clients
```

---

# Role-Based Permissions

Supported roles:

```text
OWNER
ADMIN
MEMBER
GUEST
```

Permissions are validated in the service layer before any operation is executed.

Examples:

* Only authorized users can manage workspace members.
* Only workspace members can send messages.
* Only authorized users can update roles.
* Only authorized users can remove members.

---

# Project Structure

```text
src
├── config
├── middleware
├── handlers
├── services
├── resolvers
├── schemas
├── helpers
├── tests
└── prisma
```

### Config

Database, Redis, and application configuration.

### Middleware

Authentication and request context.

### Handlers

Socket.IO event handlers.

### Services

Business logic and permission validation.

### Resolvers

GraphQL query and mutation implementations.

### Schemas

GraphQL type definitions.

### Prisma

Database schema and migrations.

---

# Running Locally

## Clone Repository

```bash
git clone <repository-url>
cd Realtime-Chat-system
```

## Install Dependencies

```bash
npm install
```

## Configure Environment

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/chatdb
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
```

## Start Services

```bash
docker compose up -d
```

## Run Migrations

```bash
npx prisma migrate deploy
```

## Start Application

```bash
npm run dev
```

---

# Testing

Run all tests:

```bash
npm test
```

Run a single test file:

```bash
npm test workspace.test.js
```

---

# CI/CD

GitHub Actions automatically:

1. Creates a test environment
2. Starts PostgreSQL
3. Runs Prisma migrations
4. Executes all tests
5. Reports failures before deployment

---

# Future Improvements

* Direct messages
* Message reactions
* File uploads
* Read receipts
* Notifications
* Search functionality
* Kubernetes deployment
* Monitoring and logging

---

# Learning Goals

This project was built to practice:

* GraphQL API development
* Real-time communication with Socket.IO
* Redis Pub/Sub
* Database design
* Prisma ORM
* Authentication and authorization
* Docker
* Automated testing
* CI/CD pipelines
* Scalable backend architecture

---

Built as a backend-focused project emphasizing scalability, real-time communication, and production-oriented architecture.
