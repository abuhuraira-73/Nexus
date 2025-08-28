1# Project: Nexus — “Infinite Canvas, Simplified.”

## Objective
To build a highly flexible, collaborative digital whiteboard application similar to Milanote, but with enhanced features for visual organization, brainstorming, and real-time collaboration. The development will follow a frontend-first approach, starting with a minimal, working MVP and then progressively adding advanced features and the backend.

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
*   **Canvas Library:** [To be decided: e.g., Konva.js, React Flow, Fabric.js] - *New*
*   **Real-time Communication:** [To be decided: e.g., Socket.IO client] - *New*
*   **Dev Tools:** ESLint, Prettier, Husky + lint-staged, Vitest

### Backend (provisional)
*   **Runtime:** Node.js + Express
*   **Database:** MongoDB (Mongoose) / MongoDB Atlas (for production)
*   **Real-time Communication:** [To be decided: e.g., Socket.IO server] - *New*

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

*   **Iterative Development:** Work step-by-step: frontend MVP first, then backend integration, then advanced features.
*   **Code Quality:** Enforce linting, formatting, pre-commit checks, and tests.
*   **State Management:** Use React Query for server state and optimistic updates; Zustand for small global UI/canvas state.

---

## Feature Roadmap

### Immediate / MVP Features (Free/Basic Version)
*   **Infinite Canvas:** Pannable and zoomable canvas.
*   **Basic Element Creation:** Add text boxes, basic shapes (rectangles, circles).
*   **Element Manipulation:** Select, move, resize, delete elements.
*   **Local Board Persistence:** Save and load board state to/from local storage.
*   **Basic Drawing:** Freehand drawing tool.
*   **Responsive UI:** Ensure usability on desktop and mobile.

### Planned / Advanced Features (Paid/Premium Version)
*   **Rich Content Types:** Drag & drop images, embed links, upload files (PDFs, videos).
*   **Real-time Collaboration:** Multi-user editing with presence indicators.
*   **User Authentication & Authorization:** Secure user accounts and board sharing.
*   **Cloud Board Persistence:** Save and load boards to/from a database.
*   **Advanced Drawing Tools:** Smart shapes, connectors, lines, arrows.
*   **Version History & Undo/Redo:** Track changes and revert to previous states.
*   **Templating System:** Pre-defined board layouts.
*   **AI-Powered Features:** Idea generation, content summarization, image recognition.
*   **Integrations:** Connect with external services (e.g., cloud storage, communication apps).
*   **Export Options:** Export boards as images (PNG, JPG) or PDFs.

---

## Implementation Plan

### Frontend (Step-by-Step)
1.  Bootstrap the client with Vite + React + TypeScript. Install and configure Tailwind, DaisyUI, and Shadcn/UI.
2.  Create a basic folder structure (feature-based).
3.  Set up global providers (React Query, Router, Zustand).
4.  **Implement Core Canvas:** Choose and integrate a canvas library (e.g., Konva.js, React Flow) and set up basic panning and zooming.
5.  **Basic Element Interaction:** Enable adding, selecting, moving, resizing, and deleting text boxes and shapes on the canvas.
6.  **Local Storage Integration:** Implement saving and loading board state to/from local storage.
7.  **Rich Content Type Support:** Add functionality for images, links, and file uploads.
8.  **Real-time Communication Setup:** Integrate a real-time library (e.g., Socket.IO client) and set up basic connection.
9.  **Authentication & Routing:** Build user authentication pages and flows, and set up protected routes.
10. **Real-time Collaboration Implementation:** Develop real-time updates for element changes and user presence.
11. **Advanced Features:** Implement drawing tools, version history, and other advanced features as decided.
12. Write tests and set up pre-commit hooks before deploying to Vercel.

### Backend (to follow frontend)
*   Develop an Express application with WebSocket integration for real-time communication.
*   Define models for necessary entities (User, Board, Element, etc.).
*   Implement API endpoints for board creation, retrieval, and element persistence.
*   Implement authentication and authorization for board access.
*   Handle file storage for uploaded content.
*   Implement middleware for input validation, error handling, and rate limiting.
*   Configure CORS and cookie settings.

---

## Deployment & Operations

*   **Local Development:** The client will run via `npm run dev` (Vite) and the server via nodemon/ts-node.
*   **Environment Variables:** `VITE_API_URL` (client), `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (server) - *will be updated based on new backend needs*.
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
*   **Project pivot confirmed:** Shifted from a collaborative project management tool to an infinite canvas/digital whiteboard (Milanote-like) application.
*   **Core technologies finalized:** Decided on Konva.js for canvas rendering and Socket.IO for real-time communication.
*   **Frontend-first approach:** Agreed to focus on building the frontend MVP, deferring advanced features, backend implementation, and detailed authentication/authorization decisions for later.
*   **Started Login Page Frontend:** Began implementing the login page using Shadcn/UI components.
*   **Troubleshot Shadcn/UI Integration:** Resolved multiple issues including missing `utils.ts`, `class-variance-authority` dependency, and proper configuration of `tailwind.config.js` and `index.css` for Shadcn/UI styling.
*   **Confirmed Styling:** Verified that Shadcn/UI and Tailwind CSS styling is now correctly applied.
