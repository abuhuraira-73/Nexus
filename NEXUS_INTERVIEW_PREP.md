# 🧪 Nexus: Interview Preparation Guide

---

## 🔧 Tech Stack & Architecture

- **Frontend:** React (v19), Vite (v7), Tailwind CSS (v4), Framer Motion, Zustand (State Management), React-Konva/Konva (Infinite Canvas), Radix UI (Headless components).
- **Backend:** Node.js, Express.js (v5.1.0), RESTful API, MVC-like structure.
- **Database:** MongoDB with Mongoose (v8) ODM.
- **Security:** JWT (JSON Web Tokens) for stateless authentication, `bcryptjs` for password hashing, Passport.js (Google OAuth 2.0).
- **Media:** Multer for local image storage and file handling (`/server/public/uploads`).
- **Architecture:** **MERN Stack with Separation of Concerns (SoC)**. Decoupled frontend and backend. Backend follows a clean Controller-Route-Model pattern.

### 💡 Deeper Explanation
In **Nexus**, the architecture is a **High-Performance MERN Stack** optimized for complex graphical data manipulation and low-latency state synchronization.

- **Frontend (Reactive State & Canvas):** We leverage **React 19** and **Vite 7** for a modern, high-speed development environment. Global state is managed using **Zustand** (`authStore`, `canvasStore`), which provides a lightweight and performant alternative to Redux. This is critical for the **Infinite Canvas**, where we use **React-Konva** to interface with the HTML5 Canvas API. By storing the canvas state (shapes, connectors, and metadata) in a centralized Zustand store, we achieve high-frequency updates and smooth interactions without the overhead of deep component prop-drilling.
- **Backend (API Design):** The **Express 5.1** backend is designed as a stateless REST API. It implements a multi-layered authentication strategy: **Passport.js** for Google OAuth 2.0 and a custom **JWT middleware** for standard login. The API is structured to handle high-frequency `PUT` requests for canvas auto-saving, utilizing a debounce strategy on the frontend to minimize server load.
- **Database (Data Modeling):** We use **MongoDB** with **Mongoose 8**. The `Canvas` schema is a highlight of the data design; instead of complex relational tables, we store the entire canvas graph in a flexible `data` object field. This "Denormalization" strategy ensures that a single `GET` request retrieves the complete workspace state, drastically reducing latency compared to traditional SQL joins.
- **Security & Media:** Security is enforced via **JWT** validation on all private routes. File uploads (like user profile pictures) are handled by **Multer**, storing files locally in the server's public directory and serving them via Express static middleware, ensuring a streamlined media pipeline.

---

## 💡 Project Overview

- **What problem does it solve?** Nexus eliminates the friction of traditional brainstorming by providing a "limitless" digital whiteboard. It solves the problem of spatial constraints in physical environments and the "static" nature of traditional documentation tools, allowing ideas to grow organically in a non-linear workspace.
- **Who is it for?**
    - **Product Teams:** For sprint planning, user story mapping, and architecture diagramming.
    - **Designers & Creatives:** For mood boarding, brainstorming, and visual organization.
    - **Remote Organizations:** To bridge the collaboration gap with a shared, real-time visual environment.
- **Key Features:**
    - **High-Performance Infinite Canvas:** Pan, zoom, and create on a boundary-less stage powered by React-Konva.
    - **UX Precision Tools:** Integrated **Grid Snapping (20px)** logic and a **ResizeObserver** implementation to ensure the canvas stage remains responsive and pixels stay aligned across all viewport sizes.
    - **Complex Data Objects:** Support for specialized cards including Checklists, Tables, and Sticky Notes with individual state management.
    - **Intelligent Connectors:** Dynamic lines that anchor to shapes, enabling the creation of complex flowcharts and mind maps.
    - **Workspace Lifecycle Management:** Robust dashboard for organizing, trashing, archiving, and favoriting canvases.

### 💡 Deeper Explanation
The "Core Problem" Nexus solves is **The Cognitive Load of Visual Organization**. 

In Nexus, we implemented a **Content-First Canvas**. Using the HTML5 Canvas API via `react-konva`, we ensure that the UI remains responsive even when thousands of items are rendered. A key technical differentiator is our **Layered Rendering Strategy** in `InfiniteCanvas.tsx`. By filtering and rendering `connector` types before other shapes, we ensure a perfect visual hierarchy where connection lines always anchor *behind* cards. Furthermore, our **Responsive Stage Engine** uses a `ResizeObserver` to dynamically update dimensions without a full component re-mount, maintaining the state of the infinite pan/zoom during window resizing—a detail often missed in basic implementations.


---

## ⚙️ How It Works (Technical Flow)

- **User Flow End-to-End:** 
    1. **Authentication:** User enters credentials (`POST /api/auth/login`) or uses Google OAuth. The server validates and returns a signed JWT.
    2. **Onboarding:** The React frontend stores the JWT and user profile in **Zustand (`authStore`)** and `localStorage` for session persistence.
    3. **Dashboard:** The user is redirected to `/app`, where `AppLayout.tsx` fetches their active canvases via `GET /api/canvases`.
    4. **Canvas Initialization:** Creating a canvas (`POST /api/canvases`) creates a new document in MongoDB with default preferences (color, pattern).
    5. **The Canvas Experience:** Navigating to `/app/canvas/:id` loads the workspace. As the user draws or adds cards, the **`canvasStore`** is updated in real-time.
    6. **State Persistence:** A debounced `useEffect` in `InfiniteCanvas.tsx` monitors the `shapes` array and calls `updateCanvas` (`PUT /api/canvases/:id`) to sync the state with MongoDB.
- **Frontend-Backend Communication:** Nexus uses a custom **`api` wrapper** built on the Fetch API. It automatically intercepts requests to inject the `Authorization: Bearer <token>` header and globally handles `401 Unauthorized` responses by clearing the Zustand store and redirecting to login.
- **Database Schema:** 
    - **User:** Stores profile info, hashed passwords, and workspace preferences.
    - **Canvas:** Linked to `User` via an `ObjectId`. Contains a flexible `data` object field for storing the nested `shapes` array, allowing for evolving content types without schema migrations.
- **Authentication & Authorization:** 
    - **Encryption:** Passwords are hashed using **bcryptjs** via a Mongoose `pre-save` hook.
    - **JWT Strategy:** Stateless tokens are used for all private routes.
    - **Middleware:** A custom `authMiddleware.js` intercepts incoming requests, decodes the JWT, and attaches the user payload to the `req` object for downstream controllers.

### 💡 Deeper Explanation
The technical "heart" of Nexus is the **Zustand-to-Canvas Synchronization Engine**. 

Unlike standard CRUD apps, a whiteboard requires high-frequency state updates. We solved the "State-Sync vs. Performance" trade-off by decoupling the **Interaction State** from the **Persistence State**. 
- **Interaction:** Every mouse move or drag event updates the **Zustand `canvasStore`** locally. Because Zustand uses a pub/sub model with fine-grained subscriptions, React-Konva re-renders only the affected nodes, maintaining 60fps even with complex boards.
- **Persistence:** We don't save on every move. Instead, we use a **Debounced Snapshotting** pattern. In `InfiniteCanvas.tsx`, we observe the `shapes` array. When changes stop for 1500ms, the system takes a JSON snapshot of the entire canvas and sends it as a single `PUT` request. This "eventual consistency" model ensures the database is always up-to-date without overwhelming the network or the MongoDB instance with thousands of micro-updates. Furthermore, our `authStore` implements a **Rehydration Logic**; on page refresh, it checks `localStorage` for a valid token, allowing for a seamless "Stay Logged In" experience.

---

## 🧠 Challenges & Solutions

- **Hardest Part to Build: Dynamic Shape Connectors**
    - **Challenge:** Implementing lines that "anchor" to moving shapes and maintain visual integrity during drag events. Traditional static lines would require manual updates, creating a poor user experience for flowcharts.
    - **Solution:** Created a dedicated `Connector.tsx` component that performs a reactive lookup in the Zustand store for its `fromShapeId` and `toShapeId`. By calculating the center-points of the parent shapes in every render cycle, the connector "sticks" to the objects dynamically. I also implemented an invisible "hit area" line (wider stroke but transparent) to make selecting the thin connector lines intuitive on the canvas.
- **Tricky Bug & Resolution: Redundant History in Undo/Redo**
    - **Challenge:** During rapid movements or multiple state updates, the `undo` stack was being flooded with duplicate states, forcing users to click "Undo" multiple times to see any visible change.
    - **Solution:** Implemented a **"Deep Equality Guard"** in the `pushToHistory` action within `canvasStore.ts`. Before pushing a new state to the stack, the system performs a `JSON.stringify` comparison between the current shapes/background and the last entry in the history. If the states are identical, the push is aborted, ensuring a clean and responsive undo/redo experience.
- **Performance Optimization: Precision Text Editing on the Stage**
    - **Challenge:** Konva doesn't natively support HTML text input. Placing a standard `<textarea>` over the canvas required it to perfectly match the position, rotation, and font size of the Konva `Text` node, regardless of the stage's current zoom (`stageScale`) or pan (`stageX`, `stageY`).
    - **Solution:** Developed a coordinate transformation logic in the `TextEditor` component. It uses `node.getAbsolutePosition()` to find the canvas coordinates and then maps them to the DOM space using the stage container's offsets. I applied the `stageScale` multiplier to the font size and padding dynamically, ensuring the editor feels like an integrated part of the canvas rather than an overlay.

### 💡 Deeper Explanation
A significant technical hurdle was the **Coordinate Mapping for Mobile/Pinch-to-Zoom**. 

On mobile devices, users expect standard pinch-to-zoom gestures. In `InfiniteCanvas.tsx`, we had to manually implement this by tracking multiple touch points. The challenge was that zooming shouldn't just scale the stage; it should scale **towards the center of the pinch**. 

We solved this by calculating the `lastDist` between two fingers and the `newCenter` of the pinch. By calculating the "pointer-to-canvas" ratio (`(newCenter.x - stage.x()) / oldScale`), we could adjust the `stageX` and `stageY` during the scale update. This ensures the canvas zooms exactly where the user is looking, providing a "native-app" feel within a web browser. This logic is decoupled from the `canvasStore`, keeping the store focused on data while the component handles high-frequency input events.

---

## 🔐 Security

- **Authentication Handling:**
    - **Password Hashing:** Implemented **bcryptjs** with a salt factor of 10. We use a Mongoose `pre-save` hook to ensure that any change to the password field (registration or update) is automatically hashed before database entry.
    - **Stateless Session Management:** Utilized **JWT (JSON Web Tokens)** to handle authentication without server-side sessions. Tokens are signed on the server and verified by a custom `authMiddleware.js`, which extracts the User ID and attaches it to the `req.user` object for all downstream controller logic.
- **Input Validation & Sanitization:**
    - **Mongoose Schemas:** Leveraged strict schema definitions to enforce data types (e.g., regex validation for emails).
    - **Server-Side Checks:** Controllers like `suggestionController.js` and `authController.js` perform manual validation of required fields before processing database transactions.
- **Protected Routes & Role-Based Access (RBAC):**
    - **Frontend Guarding:** Created a `ProtectedRoute.tsx` component that wraps the `/app` layout. It uses **Zustand (`authStore`)** to check authentication status and performs a "Redirect-to-Login" if the token is missing or expired.
    - **OAuth Account Linking:** In `passport.js`, we implemented a robust **Identity Merging Strategy**. If a user tries to log in with Google using an email already registered via a standard login, the system automatically links the Google ID to the existing account rather than creating a duplicate. This ensures a "Single Source of Truth" for user data and prevents "Split-Identity" bugs which are common in many SaaS applications.

### 💡 Deeper Explanation
For security, we focused on **Defense in Depth**. In `authMiddleware.js`, we don't just check if a token exists; we strictly enforce the **Bearer Token** format and use `jwt.verify` against a `JWT_SECRET` stored in an environment variable. 

If verification fails, we return a 401 Unauthorized immediately, preventing the request from ever reaching the controller. On the frontend, our custom `api.ts` utility acts as a **Global Interceptor**. If any request returns a 401, the utility automatically calls `logout()` in the Zustand store, which clears `localStorage` and triggers a re-render of the `ProtectedRoute`. This ensures that an expired session doesn't leave the user in a "broken" UI state.

---

## 📦 APIs & Integrations

- **Third-Party APIs:**
    - **Google OAuth 2.0:** Integrated via **Passport.js**. We configured a `GoogleStrategy` to handle the OAuth handshake, profile retrieval, and callback redirection, allowing users to sign up/in with a single click.
    - **Multer:** Integrated for local media management, specifically handling `multipart/form-data` for user profile picture uploads.
- **Internal API Endpoints:**
    - **Canvas CRUD:** A full RESTful suite for managing infinite canvases (`GET`, `POST`, `PUT`, `PATCH`).
    - **Mock Subscription Gateway:** Developed a `subscriptionController.js` that simulates a premium upgrade flow (`POST /api/subscription/upgrade`). This allowed us to build and test the frontend's "Premium" UI logic without an active Stripe/Razorpay account.
    - **Suggestion Engine:** A dedicated `suggestionController.js` that collects and stores user feedback in a separate MongoDB collection, demonstrating a clean separation of concerns between core app features and metadata collection.

### 💡 Deeper Explanation
The most sophisticated internal integration is the **Google OAuth Callback Flow**. In `passport.js`, we handle the "Primary Email" validation during the callback. 

Because some Google accounts may not have a primary email or have unique privacy settings, we check `profile.emails[0].value` and return a clear error if the email is missing. Once validated, we check for an existing `googleId` OR a matching `email`. If an email match is found but the `googleId` is missing, we **upgrade the user document** by adding the `googleId`. This "Dual-Login" support is a critical UX feature that prevents users from being locked out of their data if they forget which login method they used previously.

---

## 🗄️ Database Design

- **Collections/Schemas & Relationships:**
    - **User:** The central document for identity management, storing profile data, hashed credentials, and workspace preferences (`defaultCanvasColor`, `defaultPattern`).
    - **Canvas:** Linked to `User` via an `ObjectId` (one-to-many). This is the most complex document, featuring a flexible `data` field that stores the entire nested tree of shapes, text cards, and connectors.
    - **Contact:** A dedicated collection for storing public inquiries, ensuring user support data is decoupled from core app data.
    - **Suggestion:** Stores structured user feedback (rating and comments), providing a stream of data for future product improvements.
- **Why MongoDB (NoSQL) vs SQL?**
    - **Schema Flexibility:** Visual workspaces are inherently dynamic. Each shape on a Nexus canvas might have different properties (e.g., a circle has a `radius`, while a table has `tableData`). MongoDB allows us to store these varying attributes in a single document without the performance penalty of a thousand NULL columns or complex EAV patterns in SQL.
    - **Atomic Workspaces:** By storing the entire canvas state as a nested object, we ensure that a single `GET` operation retrieves the complete environment. This "Denormalization" strategy is significantly faster than performing JOINs across 4 or 5 different tables every time a user pans the canvas.

### 💡 Deeper Explanation
We chose a **Hybrid Data Model** to balance performance and scalability. 

For high-level entities like `User` and `Canvas` metadata (name, status, creation date), we use **Referencing**. This allows for efficient querying of a user's dashboard (listing many canvases) without loading the massive data objects inside them. 

However, for the **Canvas Content**, we use **Embedding**. Each `Canvas` document "owns" its content. This is a classic NoSQL pattern for "Write-Heavy" and "Single-Document-Read" scenarios. Since a user only ever interacts with one canvas at a time, we prioritize the speed of loading that specific document over the theoretical benefits of normalized data. This design also simplifies our "Auto-Save" logic; the frontend simply sends a JSON snapshot of the local `canvasStore`, and the backend updates the `data` field in one atomic operation, minimizing race conditions and ensuring data consistency.

---

## 🚀 Deployment

- **Hosting Platforms:** 
    - **Frontend:** **Vercel** for hosting the React/Vite application, providing global CDN delivery and automatic SSL.
    - **Backend:** **Render (Web Service)** for the Express.js server, offering seamless integration with Node.js and automatic scaling.
    - **Database:** **MongoDB Atlas** for a fully managed, high-availability cloud database cluster.
- **Environment Variable Management:** 
    - Securely managed via platform-specific secret managers (Vercel/Render). Key variables include `MONGO_URI`, `JWT_SECRET`, and the **`VITE_API_URL`** which tells the frontend where the decoupled backend lives.
- **CI/CD Pipeline:** 
    - Integrated with **GitHub** for a fully automated pipeline. Every push to the `main` branch triggers a build on Vercel (frontend) and a deployment on Render (backend), ensuring zero-downtime updates.

### 💡 Deeper Explanation
Our deployment strategy emphasizes **Decoupled Security and CORS Integrity**. 

Because the frontend (Vercel) and backend (Render) live on different domains, we implemented a strict **CORS Whitelisting** strategy in `server/index.js`. Instead of using a wildcard (`*`), we use `process.env.CLIENT_URL`. This environment variable is set on the Render dashboard to match the production Vercel URL. This ensures that only our official frontend can successfully make API calls to our backend, mitigating Cross-Origin attacks. 

Furthermore, we use **Environment Syncing** for the Google OAuth flow. The `GOOGLE_CALLBACK_URL` is dynamically constructed or stored in the environment to point back to the Render service, which then redirects the user to the `LoginSuccess.tsx` page on the Vercel frontend. This "Ping-Pong" across different hosting providers is handled via secure redirects, ensuring that sensitive data (like the JWT) is only transmitted over HTTPS and never leaked in server logs.

---

## 📈 What You'd Improve

- **Future Feature Roadmap:**
    - **Real-time Collaboration:** Implementing **Socket.IO** to enable multi-user editing, live cursors, and presence indicators, transforming Nexus into a truly synchronous workspace.
    - **Production Payment Gateway:** Replacing the mock subscription logic with a robust **Stripe** or **Razorpay** integration for actual monetization.
    - **Templates Gallery:** Developing a library of pre-configured canvas layouts (Kanban, Mind Map, User Journey) to accelerate the onboarding process.
- **Technical Debt & Refactoring:**
    - **Automated Testing Suite:** Introducing **Vitest** for the frontend and **Supertest/Jest** for the backend to ensure zero regressions during feature expansion.
    - **Backend TypeScript Migration:** Currently, the backend is in Node/JavaScript. Migrating it to **TypeScript** would enable shared types between the frontend and backend, drastically reducing "contract break" bugs.
- **Scalability Considerations:**
    - **Redis Caching:** Implementing a Redis layer to cache frequently accessed canvas metadata, reducing the load on MongoDB Atlas during peak usage.

### 💡 Deeper Explanation
If I had more time, the absolute priority would be **Architecting for Operational Consistency**. 

Currently, Nexus uses a "Snapshot" model for saving. In a multi-user environment, this would lead to "Last-Write-Wins" conflicts where one user's changes overwrite another's. To solve this, I would implement **Operational Transformation (OT)** or **CRDTs (Conflict-free Replicated Data Types)**. By sending small "delta" updates via WebSockets instead of full JSON snapshots, we could ensure that two users editing different cards on the same canvas never clash. This transition from a "Document-Based" save model to an "Event-Stream" model is the most significant technical evolution required to move Nexus from a personal productivity tool to an enterprise-grade collaboration platform.

---

## 🏁 End-to-End System Walkthrough (Startup to Canvas)

### 1. System Initialization (Startup)
- **Environment Validation:** On boot (`npm run dev`), the backend (`server/index.js`) validates critical environment variables like `MONGO_URI` and `JWT_SECRET`. If missing, the process exits with a fatal error to prevent insecure states.
- **Service Boot:** The Express server initializes on port 5000, establishing a persistent connection to MongoDB Atlas via Mongoose. Simultaneously, the Vite dev server boots the React frontend, which is configured to proxy API requests or point to the backend URL via `VITE_API_URL`.

### 2. The Authentication Lifecycle (Login Logic)
- **The Request:** A user submits the login form (`LoginPage.tsx`). A `POST` request is sent to `/api/auth/login`.
- **The Verification:** The `authController.js` fetches the user document (including the hidden `password` field). It uses `bcrypt.compare` to verify the plain-text input against the stored hash.
- **The Token:** Upon success, a JWT is signed with the User ID and sent to the frontend.
- **Persistence:** The React app's **Zustand `authStore`** receives the token and user profile, storing them in `localStorage` to survive page refreshes.

### 3. The User Journey (Engagement & Persistence)
- **The Dashboard:** The user lands on `/app`. The `AppLayout` component triggers a `GET /api/canvases` call. The custom `api` utility automatically attaches the `Authorization: Bearer <token>` header.
- **Canvas Interaction:** Opening a canvas loads the `InfiniteCanvas.tsx`. As the user adds shapes or edits text, the **`canvasStore`** updates.
- **Debounced Save:** A `useEffect` observes the `shapes` array. To prevent network flooding, it waits for a 1500ms pause in activity before calling `updateCanvas`. The backend performs an atomic `$set` operation on the `data` field in MongoDB.

### 4. The Backend Engine (Middleware & Controllers)
- **The Gatekeeper:** Every "Private" request passes through `authMiddleware.js`. It decodes the JWT; if valid, it attaches the `user.id` to the `req` object and calls `next()`.
- **Logic Isolation:** Controllers (like `canvasController.js`) handle the "Business Logic"—checking for ownership, validating input types, and catching database errors (like `ObjectId` casting errors) to send structured JSON responses instead of server crashes.

### 5. Workspace Management (Business/User Operations)
- **Lifecycle Actions:** Users can "Trash" a canvas (`PATCH /api/canvases/:id/status`). This doesn't delete the document but updates a `status` enum, allowing for a "Recycle Bin" feature.
- **Preferences:** When a new canvas is created, the backend fetches the user's `preferences` (from the `User` model) to set the default background color and pattern, ensuring a personalized experience.

### 6. Session Termination (Logout)
- **The Cleanup:** Clicking "Logout" triggers the `logout()` action in Zustand.
- **Stateless Effect:** The frontend clears `localStorage` and resets the `authStore`. Since the backend is stateless, no server-side "session" needs to be destroyed. The `ProtectedRoute` component immediately detects the `isAuthenticated: false` state and redirects the user back to the landing page.
