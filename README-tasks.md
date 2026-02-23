# Project Tasklist: Health & Fitness App V1

## Project Setup & Organization
- [x] Initialize project with Expo (managed workflow)
- [/] Organize folder structure (`src/screens`, `src/components`, `src/context`, `src/storage`, `src/navigation`)
- [ ] Configure Git and define branching strategy (`main`, `develop`, `feature/*`)

## Data & State Management
- [x] Define Data Models (Workout: `id`, `type`, `duration`, `intensity`, `date`, `notes`)
- [ ] Set up state management via `Context API` (or `useState`/`useReducer`)
- [ ] Implement `AsyncStorage` for data persistence
- [ ] Handle initial loading state to restore data on app startup
- [ ] Implement error handling for storage operations

## Navigation (React Navigation Stack)
- [ ] Set up Stack Navigator
- [ ] Create `HomeScreen` (Workout List)
- [ ] Create `AddWorkoutScreen` (Add Form)
- [ ] Create `WorkoutDetailsScreen` (Workout Details)
- [ ] Implement parameter passing between screens
- [ ] Ensure correct back navigation handling

## Core Features (Screens & Components)
### HomeScreen
- [/] Create `WorkoutListItem` component
- [/] Implement `FlatList` to display recorded workouts
- [ ] Setup "Add" button to navigate to `AddWorkoutScreen`

### AddWorkoutScreen
- [ ] Create form for:
  - Type (course, musculation, vélo, natation, yoga, etc.)
  - Duration (minutes)
  - Intensity (faible, moyenne, élevée)
  - Date
  - Notes (optional)
- [ ] Validate form inputs
- [ ] Implement save logic (update state + save to AsyncStorage)

### WorkoutDetailsScreen
- [ ] Display full details of the selected workout
- [ ] Implement Delete functionality (update state + AsyncStorage)

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
