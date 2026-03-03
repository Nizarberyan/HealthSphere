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
- [x] Create `WorkoutListItem` component
- [x] Implement `FlatList` to display recorded workouts
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
- [x] Advanced form validation
- [x] Animation when adding a new workout
- [x] Filtering workouts by type

---

# Project Tasklist: HealthSphere V2

## 🎯 Learning Objectives
- [ ] Implement complete navigation (Stack + Tabs + Drawer)
- [ ] Consume an external REST API
- [ ] Structure an application with centralized global state
- [ ] Implement an offline-first approach
- [ ] Clearly separate business logic, API services, and the UI
- [ ] Organize a scalable mobile project

## 📘 Project Context
- [ ] Allow users to browse a catalog of exercises
- [ ] Allow users to save exercises as favorites
- [ ] Access a personalized dashboard
- [ ] Use the application even without an internet connection

_API Choice: Use a public API, develop a simple API (Express/Nest + MongoDB), or mock an API with JSON Server. Must justify technical choice._

## ✍ Functional Specifications – V2

### 1️⃣ Advanced Navigation
- [ ] **Main Stack**
- [ ] **Bottom Tabs (main level)**
  - [ ] Dashboard
  - [ ] Exercises
  - [ ] History
- [ ] **Global Drawer**
  - [ ] Profile
  - [ ] Settings
  - [ ] About
- [ ] Clean and structured navigation in `src/navigation/`
- [ ] Settings correctly passed between screens
- [ ] Consistent handling of backspace
- [ ] No unnecessary duplication of navigators

### 2️⃣ API Consumption – Exercise Catalog
- [ ] Retrieve a list of exercises from a REST API
- [ ] Display list (`FlatList` required)
- [ ] Display exercise details
- [ ] Allow users to add an exercise to favorites
- [ ] Implement data model (minimum: `id`, `name`, `category`, `difficulty`, `description`, `duration`)
- [ ] Separate API service in `src/services/api.js` (No business logic in UI components)
- [ ] Endpoints required: `GET /exercises`, `GET /exercises/:id`
- [ ] Required handling: loading state, error state, retry button, empty state

### 3️⃣ Global State
- [ ] Mandatory implementation via Context API
- [ ] Separate contexts: `ExercisesContext` and `UserContext` (or global `AppContext`)
- [ ] Global state must handle: exercise list, favorites, user settings, network status
- [ ] Centralized business logic (no unnecessary local state duplication)
- [ ] Reducer recommended

### 4️⃣ Offline Mode – Offline-First Approach
- [ ] Detect network outage
- [ ] Display cached data if available
- [ ] Display a clear message if network outage occurs
- [ ] Provide a "Synchronize" button
- [ ] **Startup Strategy:**
  - [ ] Load data from AsyncStorage
  - [ ] If connection available: fetch API, update global state, update cache
  - [ ] If no connection: use only cache
- [ ] Clean handling of async/await promises (no crashes if API is inaccessible)

## 🧩 Work Organization (Git)
- [ ] GitHub repository setup
- [ ] Use branching strategy (`main`, `develop`, `feature/*`, `fix/*`)
- [ ] Use Pull Requests and code reviews
- [ ] Use explicit commit messages (`feat:`, `fix:`, `refactor:`, `chore:`)

## 🏗 Recommended Architecture
- [ ] Organize `src/` into: `screens/`, `components/`, `navigation/`, `context/`, `services/`, `storage/`, `utils/`

## 🚨 Technical Constraints
- [ ] Expo (managed workflow)
- [ ] Full React Navigation
- [ ] Context API
- [ ] AsyncStorage
- [ ] Clear modular architecture
- [ ] Readable and maintainable code

## 💡 Bonus (Optional)
- [ ] Online/Offline Visual Indicator
- [ ] Animation when adding to favorites
- [ ] Pagination API
- [ ] Pull to refresh
- [ ] Dark theme
- [ ] Custom API endpoints (`POST /favorites`, `GET /favorites`, `DELETE /favorites/:id`)
