# Fire Safety Checklist Application

A full-stack web application for managing fire safety checklists for different buildings.

## Project Structure

- `frontend/` - Vue 3 application using Composition API
- `backend/` - NestJS application serving static JSON data

## Features

- View list of fire safety checklists
- Filter checklists by status (Pass/Fail)
- View detailed information for each checklist
- Add new checklists (frontend state only)
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend

- Vue 3 (Composition API)
- Vue Router
- Pinia (State Management)
- Tailwind CSS

### Backend

- NestJS
- Static JSON API

## Setup Instructions

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

## API Endpoints

- GET `/checklists` - Get all checklists
- GET `/checklists/:id` - Get specific checklist details
- POST `/checklists` - Add new checklist (frontend state only)
