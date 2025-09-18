# Changelog

All notable changes to the Nexus project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial setup for user profile management.
- Placeholder for authenticated API calls.
- Basic structure for cloud canvas persistence.
- Initial setup for real-time collaboration (Socket.IO).

### Changed
- Updated README and GEMINI_LOG with latest features and roadmap.

### Fixed
- Resolved various frontend errors (unused imports, type safety, JSX syntax).

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
