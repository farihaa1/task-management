# Task Management Application

## Overview
This Task Management Application allows users to efficiently manage their tasks using a drag-and-drop interface. Users can add, edit, delete, and reorder tasks, which are categorized into three sections: **To-Do, In Progress, and Done**. The app ensures real-time updates and data persistence through MongoDB, providing a seamless user experience.

## Live Demo
🔗 [Live Application](https://task-management-2222.netlify.app/)

## Features
### 1. Authentication
- Only authenticated users can access the app.
- Firebase Authentication (Google sign-in).
- User details (User ID, email, display name) are stored in the database upon first login.

### 2. Task Management
- Users can add, edit, delete, and reorder tasks.
- Tasks are categorized into:
  - **To-Do**
  - **In Progress**
  - **Done**
- Drag-and-drop functionality for moving tasks between categories and reordering within a category.
- Changes are instantly saved in the database.
- Task properties:
  - **Title** (required, max 50 characters)
  - **Description** (optional, max 200 characters)
  - **Timestamp** (auto-generated on creation)
  - **Category** (To-Do, In Progress, Done)

### 3. Database & Real-time Updates
- **MongoDB** (via Express.js server) for task storage.
- Ensures real-time updates:
  - **Optimistic UI Updates** to enhance responsiveness.
  - **Polling** as a fallback method.
- Deleted tasks are permanently removed from the database.

### 4. Frontend
- Built with **Vite.js + React**.
- Uses a drag-and-drop library (**DnD Kit**).

### 5. Responsive Design
- Fully responsive for both desktop and mobile.
- Mobile-friendly drag-and-drop experience.

### 6. Backend
- **Express.js API** for handling CRUD operations.
- **MongoDB** for storing tasks.
- API Endpoints:
  - `POST /tasks` – Add a new task.
  - `GET /tasks` – Retrieve all tasks for the logged-in user.
  - `PUT /tasks/:id` – Update task details.
  - `DELETE /tasks/:id` – Delete a task.

### 7. Bonus Features (Optional but Recommended)
- **Dark Mode Toggle**.
- **Task Due Dates** with color indicators for overdue tasks.
- **Activity Log** to track task movements and updates.

## Dev Dependencies
 "@dnd-kit/core": "^6.3.1",
 "@dnd-kit/sortable": "^10.0.0",
 "@dnd-kit/utilities": "^3.2.2",
 "@tailwindcss/vite": "^4.0.7",
 "axios": "^1.7.9",
 "firebase": "^11.3.1",
 "localforage": "^1.10.0",
 "match-sorter": "^8.0.0",
 "react": "^19.0.0",
 "react-dom": "^19.0.0",
 "react-icons": "^5.5.0",
 "react-model": "^4.3.1",
 "react-router-dom": "^7.2.0",
 "sort-by": "^1.2.0",
 "sweetalert2": "^11.17.2",
 tailwindcss": "^4.0.7"

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/farihaa1/task-management
cd task-management-app
