# Architecture Overview

This document outlines the high-level architecture of the Nexus application.

## Monorepo Structure
Nexus is structured as a monorepo, containing separate `client` (frontend) and `server` (backend) applications.

```
/Nexus
  /client     # Frontend (Vite + React + TypeScript)
  /server     # Backend (Express + Node + Mongoose)
  /shared     # Optional: shared types / utils
  README.md
```

## Frontend (Client)
- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, Shadcn/UI
- **State Management:** Zustand (for global UI/authentication state)
- **Routing:** React Router DOM
- **Canvas:** Konva.js (via react-konva) - *Planned*
- **Data Fetching:** @tanstack/react-query - *Planned*

## Backend (Server)
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Real-time Communication:** Socket.IO - *Planned*

## Data Flow (Authentication Example)
1.  **User Registration/Login:** Frontend sends credentials to `/api/auth/register` or `/api/auth/login`.
2.  **Backend Processing:** Express handles the request, Mongoose interacts with MongoDB, `bcryptjs` hashes passwords, `jsonwebtoken` generates JWTs.
3.  **Token Return:** Backend sends JWT to frontend.
4.  **Frontend State:** Zustand `authStore` saves the JWT and user data to `localStorage` and in-memory state.
5.  **Protected Routes:** `ProtectedRoute` component checks `isAuthenticated` status from `authStore` to grant/deny access.

## Future Considerations
- Microservices for specific functionalities.
- Dedicated API Gateway.
- Advanced caching strategies.
