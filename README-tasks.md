# Project Tasklist: Health & Fitness App V1

## Project Setup & Organization
- [x] Initialize project with Expo (managed workflow)
- [/] Organize folder structure (`src/screens`, `src/components`, `src/context`, `src/storage`, `src/navigation`)
- [ ] Configure Git and define branching strategy (`main`, `develop`, `feature/*`)

## Data & State Management
- [x] Define Data Models (Workout: `id`, `type`, `duration`, `intensity`, `date`, `notes`)
- [x] Set up state management via `Context API` (or `useState`/`useReducer`)
- [x] Implement Drizzle ORM (replacing AsyncStorage) for data persistence
- [x] Handle initial loading state to restore data on app startup
- [x] Implement error handling for storage operations

## Navigation (React Navigation Stack)
- [x] Set up Stack Navigator (using Expo Router)
- [x] Create `HomeScreen` (Workout List)
- [x] Create `AddWorkoutScreen` (Add Form)
- [x] Create `WorkoutDetailsScreen` (Workout Details)
- [x] Implement parameter passing between screens
- [x] Ensure correct back navigation handling

## Core Features (Screens & Components)
### HomeScreen
- [/] Create `WorkoutListItem` component
- [/] Implement `FlatList` to display recorded workouts
- [x] Setup "Add" button to navigate to `AddWorkoutScreen`

### AddWorkoutScreen
- [x] Create form for:
  - Type (course, musculation, vélo, natation, yoga, etc.)
  - Duration (minutes)
  - Intensity (faible, moyenne, élevée)
  - Date
  - Notes (optional)
- [x] Validate form inputs
- [x] Implement save logic (update state + save to Drizzle ORM)

### WorkoutDetailsScreen
- [x] Display full details of the selected workout
- [x] Implement Delete functionality (update state + Drizzle ORM)

## UI & Styling
- [/] Use standard React Native components
- [/] Style components using `StyleSheet`
- [/] Ensure a clean, mobile-first interface
- [/] Maintain clear separation between components and screens

## Bonus Goals (Optional)
- [x] Dark Mode support
- [ ] Advanced form validation
- [ ] Animation when adding a new workout
- [ ] Filtering workouts by type
