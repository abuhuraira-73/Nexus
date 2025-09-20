# Changelog

All notable changes to the Nexus project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-09-20

### Added
- **Canvas Lifecycle API:**
    - `POST /api/canvases` to create new canvases.
    - `GET /api/canvases` to fetch all of a user's canvases.
    - `GET /api/canvases/:id` to fetch a single canvas by its ID.
    - `Canvas.js` model for MongoDB.
    - `authMiddleware.js` to protect canvas routes.
- **Frontend Canvas Integration:**
    - "Create Canvas" modal for naming new canvases.
    - Sidebar now dynamically lists canvases fetched from the backend.
    - Canvases can be opened from the sidebar, loading data from the backend.
- **Dynamic UI:**
    - Top navigation bar now shows the name of the currently open canvas.
    - "Nexus" breadcrumb links back to the application home page.
- **State Management:**
    - Added a new Zustand store (`appStore.ts`) for managing non-auth global UI state.

### Changed
- Removed `zustand/persist` middleware from `canvasStore.ts` in favor of loading from the database.
- Refactored `AppLayout` and `AppSidebar` to lift state for modals and project lists.

### Fixed
- Corrected React Router `Link` usage to prevent page reloads.
- Fixed dynamic route parameter for opening canvases (`/app/canvas/:id`).
- Resolved multiple JSX syntax errors and state management race conditions.

## [0.1.0] - 2025-09-18

### Added
- **Backend Authentication API:**
    - User registration and login endpoints.
    - MongoDB integration with Mongoose.
    - Password hashing (bcryptjs) and JWT generation (jsonwebtoken).
    - Environment variable management (dotenv).
- **Frontend Authentication Forms:**
    - User registration form (`register-form.tsx`).
    - User login form (`login-form.tsx`).
- **Global Authentication State:**
    - Zustand store (`authStore.ts`) for managing user session (token, user info, isAuthenticated).
    - Persistence of authentication state using localStorage.
- **Protected Routes:**
    - `ProtectedRoute` component to guard routes based on authentication status.
    - Integration into `App.tsx` to protect main application routes.
- **Logout Functionality:**
    - Implemented logout action in `authStore` and `nav-user.tsx`.
    - UI for logout button.
- **UI/Error Handling Improvements:**
    - Replaced native `alert()` with `sonner.toast()` notifications.
    - Improved TypeScript type safety for error handling.

### Fixed
- Initial setup and configuration errors in backend.
- Frontend form validation and submission logic.
- Sidebar display issues and related syntax errors in `nav-projects.tsx`.
- `LucideIcon` type import issue.
- `.env` file handling and Git ignore.

### Changed
- Redirect after logout changed from `/login` to `/`.
