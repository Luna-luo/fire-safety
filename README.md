# Fire Safety Checklist System

A full-stack web application for managing fire safety inspections and checklists. This system helps building managers and safety inspectors track and manage fire safety compliance across multiple buildings.

## Production Demo URL
https://fire-safety.mytool.life

## Project Overview

This project consists of two main components:

- **Backend**: A NestJS application providing RESTful APIs for checklist management
- **Frontend**: A Vue.js application offering an intuitive interface for users

## Features

### Core Features

- Create and manage fire safety checklists
- Track inspection status (Pass/Fail)
- Detailed inspection notes and documentation
- Building-specific safety records

### Frontend Features

- Modern, responsive user interface
- Filter checklists by status (Pass/Fail)
- Real-time form validation
- Add new checklist (frontend state only as required)

### Backend Features

- RESTful API endpoints
- Input validation
- Comprehensive error handling
- Structured logging
- Unit and e2e testing
- Docker support
- Read from mock data

## Tech Stack

### Frontend

- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [Vue Router](https://router.vuejs.org/) - Official router for Vue.js
- [Pinia](https://pinia.vuejs.org/) - State management
- [Axios](https://axios-http.com/) - HTTP client
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

### Backend

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - TypeScript support
- [Winston](https://github.com/winstonjs/winston) - Logging
- [Jest](https://jestjs.io/) - Testing framework
- [Class Validator](https://github.com/typestack/class-validator) - Input validation

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Docker (optional, for containerized deployment)

## Quick Start

### Clone the Repository

```bash
git clone https://github.com/your-username/fire-safety.git
cd fire-safety
```

### Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
fire-safety/
├── backend/              # NestJS backend application
│   ├── src/             # Source code
│   ├── test/            # Test files
│   └── package.json     # Backend dependencies
├── frontend/            # Vue.js frontend application
│   ├── src/             # Source code
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
└── README.md            # Project documentation
```

## API Documentation

### Checklists Endpoints

- `GET /checklists` - Get all checklists
- `GET /checklists/:id` - Get a specific checklist
- `POST /checklists` - Create a new checklist (does not persist as required)

### Example API Responses

#### Get All Checklists (format as required)
```json
[
  {
    "id": 1,
    "building": "Main Building",
    "date": "2024-03-20",
    "status": "Pass"
  }
]
```

#### Get Single Checklist

```json
{
  "id": 1,
  "building": "Main Building",
  "inspector": "John Doe",
  "date": "2024-03-20",
  "status": "Pass",
  "notes": "All safety measures in place"
}
```

## Docker Deployment

### Backend

```bash
cd backend
docker build -t fire-safety-backend .
docker run -d -p 3000:3000 --name backend fire-safety-backend
```

### Frontend

```bash
cd frontend
docker build -t fire-safety-frontend .
docker run -d -p 80:80 --name frontend fire-safety-frontend
```

## Development Guidelines

### Code Style

- Follow Vue.js style guide for frontend
- Follow NestJS best practices for backend
- Use TypeScript for type safety
- Write unit tests for services
- Document complex logic

## Testing

### Backend Tests

```bash
cd backend
npm run test        # Unit tests
npm run test:e2e    # E2E tests
```