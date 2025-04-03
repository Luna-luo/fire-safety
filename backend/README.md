# Fire Safety Checklist Backend

A NestJS-based backend service for the Fire Safety Checklist System, providing RESTful APIs for managing fire safety inspections.

## Production Demo URL
https://fire-safety.mytool.life

## Features

- RESTful API endpoints for checklist management
- Input validation using class-validator
- Comprehensive error handling
- Structured logging with Winston
- Unit and e2e testing
- Docker support
- Mock data integration

## Tech Stack

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - TypeScript support
- [Winston](https://github.com/winstonjs/winston) - Logging
- [Jest](https://jestjs.io/) - Testing framework
- [Class Validator](https://github.com/typestack/class-validator) - Input validation
- [Docker](https://www.docker.com/) - Containerization

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Docker (optional, for containerized deployment)

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run start:dev

# Production mode
npm run start:prod
```

## Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e
```

## API Endpoints

### Checklists

- `GET /checklists` - Get all checklists
- `GET /checklists/:id` - Get a specific checklist
- `POST /checklists` - Create a new checklist (does not persist as required)

### Request/Response Examples

#### Create Checklist

```json
POST /checklists
{
  "building": "Main Building",
  "inspector": "John Doe",
  "date": "2024-03-20",
  "status": "Pass",
  "notes": "All safety measures in place"
}
```

#### Get Checklist

```json
GET /checklists/1
{
  "id": 1,
  "building": "Main Building",
  "inspector": "John Doe",
  "date": "2024-03-20",
  "status": "Pass",
  "notes": "All safety measures in place"
}
```

## Project Structure

```
src/
├── checklists/           # Checklist module
│   ├── dto/             # Data Transfer Objects
│   ├── interfaces/      # TypeScript interfaces
│   ├── checklists.controller.ts
│   ├── checklists.service.ts
│   └── checklists.module.ts
├── common/              # Shared module
│   ├── exceptions/      # Custom exceptions
│   ├── filters/         # Exception filters
│   ├── interceptors/    # Request/Response interceptors
│   └── services/        # Shared services
├── app.module.ts        # Root module
└── main.ts             # Application entry point
```

## Logging

The application uses Winston for structured logging. Logs are stored in the `logs` directory with the following levels:

- error
- warn
- info
- debug

## Error Handling

The application uses custom exception filters to handle errors consistently:

- `BusinessExceptionFilter` - Handles business logic errors
- `AllExceptionsFilter` - Handles all other exceptions

## Docker Deployment

### Build Image

```bash
docker build -t fire-safety-backend .
```

### Run Container

```bash
docker run -d -p 3000:3000 --name backend fire-safety-backend
```

### Environment Variables

```env
PORT=3000
NODE_ENV=development
```

## Development Guidelines

1. Follow NestJS best practices
2. Use TypeScript for type safety
3. Write unit tests for services
4. Document complex logic
5. Use proper error handling
6. Follow RESTful API design principles
