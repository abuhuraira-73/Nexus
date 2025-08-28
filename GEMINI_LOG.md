# Project: Nexus — “Collaboration, simplified.”

## Objective
To build a collaborative project management platform (MERN) from scratch in a single repository. The development will follow a frontend-first approach, starting with a minimal, working MVP and then progressively adding paid/advanced features and the backend.

---

## Tech Stack

### Frontend
*   **Framework:** React + TypeScript (.tsx)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/UI + DaisyUI
*   **Routing:** React Router v6
*   **Data Fetching:** @tanstack/react-query
*   **State Management:** Zustand
*   **HTTP Client:** Axios
*   **Drag & Drop:** @dnd-kit
*   **File Uploads:** react-dropzone
*   **Forms:** react-hook-form + zod
*   **Date Utility:** date-fns
*   **Dev Tools:** ESLint, Prettier, Husky + lint-staged, Vitest

### Backend (provisional)
*   **Runtime:** Node.js + Express
*   **Database:** MongoDB (Mongoose) / MongoDB Atlas (for production)
*   **Authentication:** JWT (or httpOnly cookies)
*   **File Storage:** Cloudinary or S3 (to be decided)
*   **Emailing:** Nodemailer (for password reset/invites, to be decided)

---

## Repository & Hosting

*   **Structure:** Single repository (monorepo style)
    ```
    /Nexus
      /client     # frontend (Vite + React + TypeScript)
      /server     # backend (Express + Node + Mongoose)
      /shared     # optional: shared types / utils
      README.md
    ```
*   **Hosting:**
    *   **Frontend:** Vercel
    *   **Backend:** Render
    *   **Database:** MongoDB Atlas

---

## Development Principles

*   **Iterative Development:** Work step-by-step: frontend MVP first, then backend integration, then paid/advanced features.
*   **Code Quality:** Enforce linting, formatting, pre-commit checks, and tests.
*   **State Management:** Use React Query for server state and optimistic updates; Zustand for small global UI/auth state.

---

## Feature Roadmap

### Immediate / MVP Features (Free/Basic Version)
*   **User Authentication:** Register, login, logout, password reset.
*   **User Profile:** Basic profile with name and avatar.
*   **Workspace:** Single workspace (v1) with the ability to invite team members via email.
*   **Projects:** Create, read, update, archive/delete projects.
*   **Tasks:** Full CRUD with fields: title, description, projectId, assignee, priority (Low/Med/High), status (Todo/Doing/Done), dueDate, labels, position.
*   **Kanban Board:** "Todo", "Doing", "Done" columns with drag & drop functionality.
*   **Task Details:** A modal or drawer to edit tasks, add comments, and manage attachments.
*   **Comments:** Add/delete comments on tasks.
*   **File Attachments:** Basic file uploads with preview and download.
*   **Search & Filter:** Basic search and filtering capabilities.
*   **Activity Feed:** A feed displaying the last 5 events per task.
*   **Notifications:** Basic in-app notifications.
*   **Responsive UI:** Ensuring the application is usable on both desktop and mobile.
*   **Protected Routes:** Client-side authentication guards.

*Note: Features can be added or removed as the project evolves.*

### Planned / Premium Features (Paid Version)
*   Multi-workspace support and advanced RBAC.
*   Unlimited team members and larger storage quotas.
*   Gantt chart, timeline, and calendar views.
*   Advanced filtering, search, and saved views.
*   Time tracking and billing.
*   Automation and workflow rules.
*   Integrations with third-party services like Slack, Google Drive, etc.
*   Advanced analytics and reporting.
*   Client portal for external access.
*   Custom branding and domain for workspaces.
*   Data export (PDF/CSV/Excel) and scheduled reports.
*   Priority support and SLAs.
*   Optional AI-powered features.

---

## Implementation Plan

### Frontend (Step-by-Step)
1.  Bootstrap the client with Vite + React + TypeScript. Install and configure Tailwind, DaisyUI, and Shadcn/UI.
2.  Create a basic folder structure (feature-based).
3.  Set up global providers (React Query, Router, Zustand).
4.  Implement an Axios instance with a base URL and error handling.
5.  Build authentication pages and flows.
6.  Construct the main layout (Navbar, Sidebar, Page container).
7.  Develop the dashboard for project listing and creation.
8.  Implement the project page with a Kanban board.
9.  Build the task modal for creation and updates.
10. Connect to backend APIs using React Query, implementing optimistic updates where possible.
11. Add search, filters, activity feed, and notifications.
12. Write tests and set up pre-commit hooks before deploying to Vercel.

### Backend (to follow frontend)
*   Develop an Express application with authentication routes.
*   Define models for all necessary entities (User, Workspace, Project, etc.).
*   Implement CRUD routes for projects, tasks, comments, and file uploads.
*   Create an invitation flow and workspace membership endpoints.
*   Implement middleware for authentication, input validation, error handling, and rate limiting.
*   Configure CORS and cookie settings.

---

## Deployment & Operations

*   **Local Development:** The client will run via `npm run dev` (Vite) and the server via nodemon/ts-node.
*   **Environment Variables:** `VITE_API_URL` (client), `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (server).
*   **CI/CD:** Implement continuous integration to run linting, tests, and builds on push. Use Husky and lint-staged for commit hygiene.
*   **Deployment:** The frontend will be deployed on Vercel, the backend on Render, and the database will be hosted on MongoDB Atlas.

---

## Progress Log

### August 28, 2025
*   Bootstrapped the frontend application with Vite, React, and TypeScript.
*   Installed and configured Tailwind CSS, DaisyUI, and Shadcn/UI.
*   Troubleshot and resolved various configuration issues.
*   Created the initial feature-based folder structure.
*   Installed core dependencies for routing (`react-router-dom`), state management (`zustand`), and data fetching (`@tanstack/react-query`).