# Fire Safety Checklist Frontend

A Vue3-based frontend application for the Fire Safety Checklist System, providing a user-friendly interface for managing fire safety inspections.

## Features

- Modern, responsive user interface
- Filter checklists by status (Pass/Fail)
- Real-time form validation
- Add new checklist (frontend state only as required)
- Responsive design with Tailwind CSS

## Tech Stack

- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [Vue Router](https://router.vuejs.org/) - Official router for Vue.js
- [Pinia](https://pinia.vuejs.org/) - State management
- [Axios](https://axios-http.com/) - HTTP client
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

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
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
|—— api/              # handling of API success and failure responses
├── assets/            # Static assets
├── components/        # Reusable components
├── router/           # Vue Router configuration
├── stores/           # Pinia stores
└── views/            # Page components
    ├── ChecklistDetail.vue
    ├── NewChecklist.vue
    └── ChecklistList.vue
```

## Key Components

### ChecklistForm

A reusable form component for creating checklists with:

- Real-time validation
- Error handling
- Success/error notifications
- Responsive layout

### ChecklistList

A data table component displaying checklists with:

- Status filtering
- Responsive design

## State Management

Using Pinia for state management:

```typescript
// Example store
export const useChecklistStore = defineStore('checklist', () => {
  const checklists = ref<Checklist[]>([])

  function setChecklists(newChecklists: Checklist[]) {
    checklists.value = newChecklists
  }

  return { checklists, setChecklists }
})

```

## Docker Deployment

### Build Image

```bash
docker build -t fire-safety-frontend .
```

### Run Container

```bash
docker run -d -p 80:80 --name frontend fire-safety-frontend
```

### Environment Variables

```env
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=Fire Safety Checklist
```

## Development Guidelines

1. Follow Vue.js style guide
2. Use TypeScript for type safety
3. Write unit tests for components
4. Use composition API
5. Follow component naming conventions
6. Document complex logic
