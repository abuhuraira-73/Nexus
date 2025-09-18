# Project: Nexus — “Infinite Canvas, Simplified.”

---
# Project: Nexus — “Infinite Canvas, Simplified.”

---
## Gemini Operating Instructions (Set by user on September 14, 2025)

1.  **Preserve Existing Functionality:** Utmost care must be taken to not disrupt or break any existing code or functionality.
2.  **Adhere to Explicit Requests:** Only implement changes that have been explicitly requested by the user. Do not perform any extra modifications or additions.
3.  **Await Explicit Command for Code Changes:** Do not write, create, or modify any files or code until explicitly instructed to do so.
4.  **Strict Adherence to Instructions:** All user instructions are to be followed precisely as stated.
5.  **Backend & Database Implementation:** For all backend and database tasks, the user will perform most of the implementation. The AI will primarily provide guidance, explanations, and instructions, and will only execute code changes or file modifications when explicitly commanded to do so by the user.
---

## Objective
To build a highly flexible, collaborative digital whiteboard application similar to Milanote, but with enhanced features for visual organization, brainstorming, and real-time collaboration. The development will follow a frontend-first approach, starting with a minimal, working MVP and then progressively adding advanced features and the backend.

---

## Tech Stack

### Frontend (Iterative Approach)

#### Initial Setup
*   **Framework:** React + TypeScript (.tsx)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/UI

#### To be added as needed:
*   **Routing:** React Router v6
*   **Data Fetching:** @tanstack/react-query
*   **State Management:** Zustand
*   **Canvas Library:** Konva.js (via react-konva)
*   **Real-time Communication:** [To be decided: e.g., Socket.IO client]
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
*   **Element Manipulation:** Select, move, resize, delete elements. (Implemented)
*   **Local Board Persistence:** Save and load board state to/from local storage. (Implemented)
*   **Basic Drawing:** Freehand drawing tool. (Implemented)
*   **Responsive UI:** Ensure usability on desktop and mobile.

### Planned / Advanced Features (Paid/Premium Version)
*   **Rich Content Types:** Drag & drop images, embed links, upload files (PDFs, videos).
*   **Real-time Collaboration:** Multi-user editing with presence indicators.
*   **User Authentication & Authorization:** Secure user accounts and board sharing.
*   **Cloud Board Persistence:** Save and load boards to/from a database.
*   **Advanced Drawing Tools:** Smart shapes, connectors, lines, and arrows.
*   **Version History & Undo/Redo:** Track changes and revert to previous states. (Implemented - Manual Zustand)
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
4.  **Implement Main Application Layout and Routing:** Set up `client/src/pages/index.tsx` as the `AppLayout` component, handling the main application structure (sidebar, header) and utilizing `react-router-dom`'s `<Outlet />` for nested content rendering. Configure `client/src/App.tsx` for nested routing, including dynamic routes for canvas pages (e.g., `/canvas/:id`).
5.  **Develop "No Canvas Open" Page:** Create the `HeroSection` component (`client/src/pages/home.tsx`) to serve as the default content for the root path (`/`) when no specific canvas is open. Design its UI to be welcoming and provide clear calls to action.
6.  **Implement Core Canvas:** Integrated Konva.js (via react-konva) and set up basic panning and zooming. Enabled adding, selecting, moving, resizing, and deleting text boxes and shapes on the canvas. Implemented element customization (e.g., text font/color, shape fill/border) and robust undo/redo functionality (manual Zustand implementation).
7.  **Implement Dynamic Sidebar Behavior:** Develop the logic for the `AppSidebar` to conditionally display a "Tools Section" on canvas pages. The tools in this section (e.g., shapes, text boxes) should be draggable onto the canvas to create new elements.
8.  **Local Storage Integration:** Implement saving and loading board state to/from local storage.
9.  **Rich Content Type Support:** Add functionality for images, links, and file uploads.
10. **Real-time Communication Setup:** Integrate a real-time library (e.g., Socket.IO client) and set up basic connection.
11. **Authentication & Routing:** Build user authentication pages and flows, and set up protected routes.
12. **Real-time Collaboration Implementation:** Develop real-time updates for element changes and user presence.
13. **Advanced Features:** Implement drawing tools, version history, and other advanced features as decided.
14. Write tests and set up pre-commit hooks before deploying to Vercel.

### Backend (Current Focus)
1.  **User Authentication:** Implement API endpoints for user registration and login.
2.  **Initial Setup:** Develop an Express application foundation.
3.  **Database Models:** Define models for `User`, `Board`, `Element`, etc.
4.  **Cloud Persistence:** Implement API endpoints for board creation, retrieval, and element persistence.
5.  **Real-time Communication:** Add WebSocket integration for real-time collaboration.
6.  **File Storage:** Handle storage for user-uploaded content.

---

## Deployment & Operations

*   **Local Development:** The client will run via `npm run dev` (Vite) and the server via nodemon/ts-node.
*   **Environment Variables:** `VITE_API_URL` (client), `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (server) - *will be updated based on new backend needs*.
*   **CI/CD:** Implement continuous integration to run linting, tests, and builds on push. Use Husky and lint-staged for commit hygiene.
*   **Deployment:** The frontend will be deployed on Vercel, the backend on Render, and the database will be hosted on MongoDB Atlas.

---

## Progress Log

### September 17, 2025
*   **Notification System:** Installed, configured, and integrated the `sonner` library to provide toast notifications. Styled the notifications with a dark theme for consistency with the UI.
*   **Legal Pages:** Created and integrated the `TermsOfServicePage` and `PrivacyPolicyPage` components into the application routing.
*   **Documentation:** Updated `README.md` and `GEMINI_LOG.md` to reflect the latest implemented features.
*   **Roadmap Pivot:** Based on user feedback, the development plan has been updated. The next priority is to begin backend development, focusing on user authentication (registration and login).
*   **Back to Top Button:** Added a "Back to Top" button for improved navigation on long pages.
*   **Proposal Tab Logo:** Added a logo to the proposal tab.
*   **Logo and Header Updates:**
    *   Updated favicon in `index.html` to `Nexus-Logo.png`.
    *   Replaced `Zap` icon with `Nexus-Logo.png` in `public-header.tsx`.
    *   Applied `drop-shadow` to the logo in `public-header.tsx` with various color and intensity adjustments.
    *   Increased logo size and adjusted shadow in `public-header.tsx`.
*   **Font Implementation (Landing Page):**
    *   Implemented `JUST Sans Outline ExBold` for headings and `Metropolis Thin` for body text.
    *   Resolved font loading issues by correcting file paths and using robust CSS rules (`!important`).
    *   Adjusted font sizes of main section headings (`h2`) to `text-7xl` for visual consistency.
    *   Changed Feature Card Titles and "Get Started" sub-headings to `Metropolis Bold`.
    *   Changed Pricing Card Titles ("Free", "Premium") to `Metropolis Bold`.
    *   *(User-made change: Metropolis Thin was changed to Metropolis Light by the user.)*

### September 18, 2025
*   **Backend Authentication API - Complete:** Successfully built and tested the entire backend for user registration and login.
    *   **Database Setup:** Created and configured a new MongoDB Atlas cluster.
    *   **Server Foundation:** Established the initial Express server and connected to the database.
    *   **Project Structure:** Created `controllers`, `models`, `routes`, `middleware` directories.
    *   **User Model:** Defined the `User` schema with a pre-save hook for password hashing.
    *   **Authentication Controller & Routes:** Implemented logic and routes for `registerUser` and `loginUser`.
    *   **Integration & Debugging:** Debugged environment variables and code to create a fully functional API, verified with `curl`.
*   **Frontend Registration Form - Complete:**
    *   **State Management:** Added `useState` to the `register-form.tsx` component to manage inputs, errors, and loading states.
    *   **API Integration:** Implemented a `handleSubmit` function to send user data to the backend `/api/auth/register` endpoint using `fetch`.
    *   **UI Feedback:** The form now provides feedback for loading states, password mismatches, and errors returned from the backend.
    *   **Environment Variables:** Created a `.env` file in the `client` directory for the `VITE_API_URL`.
    *   **Testing:** Successfully tested the end-to-end flow by creating a user from the browser UI.
*   **Frontend Login Form - Complete:**
    *   **State Management:** Added `useState` to the `login-form.tsx` component to manage inputs, errors, and loading states.
    *   **API Integration:** Implemented a `handleSubmit` function to send user credentials to the backend `/api/auth/login` endpoint using `fetch`.
    *   **UI Feedback:** The form now provides feedback for loading states and errors returned from the backend.
    *   **Testing:** Successfully tested the end-to-end flow by logging in a user from the browser UI.
*   **Zustand Auth Store - Complete:**
    *   **Store Creation:** Created `client/src/store/authStore.ts` to manage global authentication state.
    *   **State & Actions:** Defined `token`, `user`, `isAuthenticated` state, and `login`, `logout` actions.
    *   **Persistence:** Implemented `localStorage` integration to persist user sessions across browser refreshes.
    *   **Form Integration:** Integrated the `useAuthStore` into both `RegisterForm` and `LoginForm` to update global state and redirect users upon successful authentication.
*   **Protected Routes - Complete:**
    *   **Component Creation:** Created `client/src/components/protected-route.tsx` to guard routes.
    *   **Integration:** Integrated `ProtectedRoute` into `client/src/App.tsx` to protect application routes, redirecting unauthenticated users to the login page.
*   **Logout Functionality - Complete:**
    *   **Implementation:** Added `handleLogout` function to `client/src/components/nav-user.tsx` to clear authentication state and redirect to the landing page (`/`).
    *   **UI:** Styled the logout button red.
    *   **Testing:** Verified successful logout and redirection.
*   **UI/Error Handling Improvements - Complete:**
    *   **Sonner Notifications:** Replaced all native `alert()` calls with `sonner.toast()` for consistent and styled notifications across `login-form.tsx`, `register-form.tsx`, and `nav-projects.tsx`.
    *   **TypeScript Type Safety:** Fixed `any` to `unknown` and added type guards for error handling in forms.
    *   **Linting/Syntax Fixes:** Resolved various ESLint and TypeScript errors, including unused imports and JSX syntax issues in `landing.tsx` and `nav-projects.tsx`.
*   **Logo Updates:**
    *   Replaced icon with Nexus logo (no shadow) on the Register page.
    *   Replaced icon with Nexus logo (with shadow) on the Forgot Password page.

### Next Steps (as of end of day, September 18)
1.  **Display User Information:** Show the logged-in user's name/email in the UI (e.g., in the `NavUser` component).
2.  **Authenticated API Calls:** Implement a pattern for making API calls that require authentication (e.g., fetching user-specific data, creating a new canvas).
3.  **User Profile Management:** Allow users to view/edit their profile information.
4.  **Canvas Persistence (Cloud):** Implement saving and loading board state to/from the database for authenticated users.
5.  **Real-time Collaboration:** Begin setting up Socket.IO for multi-user editing.