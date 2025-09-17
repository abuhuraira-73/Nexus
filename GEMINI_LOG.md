# Project: Nexus — “Infinite Canvas, Simplified.”

---
# Project: Nexus — “Infinite Canvas, Simplified.”

---
## Gemini Operating Instructions (Set by user on September 14, 2025)

1.  **Preserve Existing Functionality:** Utmost care must be taken to not disrupt or break any existing code or functionality.
2.  **Adhere to Explicit Requests:** Only implement changes that have been explicitly requested by the user. Do not perform any extra modifications or additions.
3.  **Await Explicit Command for Code Changes:** Do not write, create, or modify any files or code until explicitly instructed to do so.
4.  **Strict Adherence to Instructions:** All user instructions are to be followed precisely as stated.
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

### September 16, 2025
*   **Landing Page Enhancements:**
    *   Applied thicker bezels to gradient sections.
    *   Refined testimonial section: expanded content, added realistic names (including Indian names), and implemented infinite horizontal auto-scrolling with reduced fade effect.
    *   Updated feature cards: icons are now white by default, removed hover border, and maintained zoom effect.
*   **Footer Refactoring:**
    *   Created `PublicFooter` component based on `pricing.tsx`'s footer.
    *   Replaced footers in `landing.tsx`, `features.tsx`, and `pricing.tsx` with `PublicFooter`.
*   **Forgot Password Page Implementation:**
    *   Created `forgot-password-form.tsx` component.
    *   Created `forgot-password.tsx` page with `login-02` block layout, updated image, and adapted form fields for password reset.
    *   Linked "Forgot Password" from `login-form.tsx` and `register-form.tsx`.
*   **Contact Page Implementation:**
    *   Created `contact-form.tsx` component (removed inquiry type).
    *   Created `contact.tsx` page with black hero section.
    *   Implemented new main content layout: gradient background for form and contact info (two columns), with "How We Respond" text.
    *   Moved FAQ section below main content, spanning full width, and added detailed answers.
    *   Added "Contact" link to `PublicHeader`.
*   **Troubleshooting & Bug Fixes:**
    *   Resolved multiple import errors (`PublicFooter`, `PublicHeader`, `Accordion`, `Select`) by correcting import syntax and adding missing `shadcn/ui` components.
    *   Fixed Accordion animation: added missing keyframes, then switched to a more robust `max-height` based animation strategy in `accordion.tsx` and removed old keyframes from `index.css`.

### September 15, 2025
*   **Public Website Refinements:**
    *   **Landing Page:**
        *   Updated hero section text.
        *   Implemented smooth scrolling for anchor links.
        *   Redesigned footer and testimonials section (with avatars and star ratings).
        *   **Remaining Customization:** Hero section background and bezel effect to be done tomorrow.
    *   **Features Page:**
        *   Created dedicated page with detailed content and zig-zag layout.
        *   Refined hero sub-headline section with bezel effect and full-width text.
        *   Added separator lines between thematic feature sections.
    *   **Pricing Page:**
        *   Created dedicated page with comparison table and three tiers (Free, Premium, Enterprise).
        *   Implemented "bezel" layout (black background with inset, rounded gradient panel).
        *   Thickened side bezels.
        *   Removed top border from footer.
    *   **Navigation:**
        *   Updated all header links (`Home`, `Features`, `Pricing`, `Login`, `Sign Up`) across Landing, Features, and Pricing pages to point to correct routes.
        *   Refactored header into a reusable `PublicHeader` component and used it on Landing, Features, and Pricing pages.
*   **Core Application Flow Fixes (Authenticated):**
    *   Fixed routing issues in `app-sidebar.tsx` (correctly detecting canvas open, "New Canvas" button navigation, "Back to Home" button navigation).

### September 14, 2025
*   **SaaS Implementation Roadmap Finalized**: The following implementation order was decided upon for building out the SaaS platform.

    **Phase 1: Building the Public Website & User Flow**
    1.  **Create Landing Page:** Build the main marketing page for new visitors.
    2.  **Update App Routing:** Ensure non-logged-in users see public pages and logged-in users are directed to the application.
    3.  **Create Features Page:** A detailed page to showcase Nexus's capabilities.
    4.  **Create Pricing Page:** Build the page with the comparative table for the Free and Premium plans.
    5.  **Create Forgot Password Page:** Complete the essential user authentication flow.
    6.  **Create Legal Pages:** Add placeholder pages for Terms of Service and Privacy Policy.

    **Phase 2: Enhancing the Core Application (Free Tier)**
    7.  **Implement Connectors & Arrows:** Add the advanced drawing tools for diagramming, available for all users.

    **Phase 3: Developing the Premium Backend & Features**
    8.  **Initial Backend Setup:** Create the Node.js/Express server foundation.
    9.  **Cloud Persistence:** Implement saving and loading boards to a database, linked to user accounts.
    10. **Implement High-Quality Exports:** Add the premium feature for exporting boards without watermarks.
    11. **Implement Real-time Collaboration:** The flagship feature for multi-user interaction on the same board.
    12. **Future Premium Features:** Stubs for future AI-powered tools and priority support systems.

### September 13, 2025
*   **Sidebar Enhancements:**
    *   Fixed the "Image" button in the sidebar to correctly open the `ImageUploadModal`.
*   **Canvas Features Implemented:**
    *   **Image Card:** Implemented drag-and-drop functionality for images onto the canvas.
    *   **Text Card:** Implemented the ability to add and customize text boxes on the canvas.
    *   **Eraser Tool:** Implemented the eraser tool for removing drawing elements.

### September 3, 2025
*   **Core UX & Navigation:**
    *   Implemented the primary navigation flow, allowing users to move from the homepage to the infinite canvas.
    *   Fixed a layout bug where the canvas would overlap with the application header.
*   **Sidebar Refactoring & Feature Implementation:**
    *   **Dynamic Panels:** Implemented logic to dynamically show/hide sidebar panels based on context. The "Tools" panel now appears only when a canvas is open, and is replaced by a "Properties" panel when a shape is selected.
    *   **Draggable Tools:** Added a "Tools" section with a collapsible submenu for shapes. These shapes (Rectangle, Circle, Star, etc.) can be dragged from the sidebar and dropped onto the canvas to create new elements.
    *   **Context-Aware Properties Panel:** When a shape is selected on the canvas, the sidebar now displays its properties. Implemented controls for changing fill color (with a color picker), rotation, and position.
    *   **Homepage Navigation:** Refactored the main navigation sidebar to remove placeholder content. It now shows a focused list including "New Canvas", "Favorites", "All Canvases", "Trash", and "Settings".
    *   **Favorites System:** Implemented the ability to mark canvases as favorites, moving them between the "Favorites" and "All Canvases" sections.
    *   **Custom Menus:** The dropdown menus for canvas items are now context-aware, showing "Favorite/Unfavorite" options for regular items and "Restore/Delete Permanently" for items in the trash.
*   **Bug Fixes & DX Improvements:**
    *   Resolved multiple TypeScript and ESLint errors related to component props and unused imports.
    *   Fixed a bug where the "Star" shape would not render correctly.
    *   Fixed a critical UX bug where typing in an input field could accidentally delete a selected shape.

### September 2, 2025
*   **Frontend Features Implemented:**
    *   **Select & Transform:** Implemented selection of shapes, and enabled resizing and rotation using `react-konva`'s `Transformer`.
    *   **Move Individual Shapes:** Enabled dragging of individual shapes on the canvas.
    *   **Delete Shapes:** Implemented deletion of selected shapes using the `Delete` or `Backspace` key.
    *   **Undo/Redo:** Refactored state management to use a manual Undo/Redo system within a Zustand store, replacing the problematic `temporal` middleware.
*   **Troubleshooting & Resolutions:**
    *   Resolved persistent TypeScript/ESLint errors in `infinite-canvas.tsx` related to `ref` callback types and general syntax. This involved multiple iterations of code correction and guidance on refreshing the VS Code environment.
    *   Fixed build failure due to `TS1484` error in `sidebar.tsx` (`VariantProps` import).
    *   Addressed build/runtime errors related to `zustand/middleware/temporal` import. Initially attempted to use `zustand`'s `temporal` middleware, but due to persistent package resolution and type issues, a robust manual Undo/Redo implementation was adopted.
    *   Resolved build error (`TS6133`) in `canvasStore.ts` by removing an unused `get` parameter.
*   **Next Steps Discussed:**
    *   Defining and implementing "Card" components (e.g., text, image, link cards) for the canvas, inspired by Milanote's content types.
    *   Setting up the backend infrastructure for real-time collaboration, authentication, and cloud persistence.

### August 30, 2025
*   **Frontend Design Decisions:**
    *   **Sidebar Behavior:**
        *   **Dynamic Tool Section:** The "Tools Section" will only be visible when a canvas is open. The tools within this section (e.g., shapes, text boxes) will be draggable onto the canvas to create new elements.
        *   **Context-Aware Properties Panel:** When a user selects an element on the canvas (e.g., a shape), the sidebar will transform into a "Properties Panel," displaying editable properties for that item like color, border, and font size.
        *   **Favorites Section:** A dedicated "Favorites" section will be added to the navigation area, allowing users to "pin" or "star" their most important canvases for quick access.
        *   **Responsive & Collapsible:** The existing responsive behavior (for mobile) and collapsible sections are confirmed as implemented and meeting current requirements.
    *   **Core Canvas Features (Frontend Implementation Focus):**
        *   **Seamless Canvas Navigation:** Implement intuitive controls for zooming and panning across the infinite canvas.
        *   **Element Customization & Properties:** Develop functionality to modify properties of elements (e.g., text font/color, shape fill/border, image rotation/opacity) via a context-sensitive panel or pop-over.
        *   **Undo/Redo:** Implement a robust undo/redo stack for all canvas operations to ensure user confidence.
    *   **Dynamic Routing for Canvas Pages:** Implement dynamic routing using `react-router-dom` with route parameters (e.g., `/canvas/:id`) to allow unique URLs for each infinite canvas page without full page reloads.
    *   **Main Content Area Routing:** The `client/src/pages/index.tsx` component will serve as the main application layout. It will render the `AppSidebar` and dynamically render the main content area (either the "No Canvas Open" page or the "Infinite Canvas" page) based on the current route.
*   **Frontend Implementation & Troubleshooting:**
    *   **"No Canvas Open" Page (`home.tsx`):**
        *   Designed and implemented the `HeroSection` component (`client/src/pages/home.tsx`) to serve as the "No Canvas Open" page.
        *   Iterated on UI design to achieve a full-page, stylish layout with a prominent "Create New Canvas" button and a "Recent Canvases" section.
        *   Implemented a background with a subtle gradient and a noise texture overlay.
        *   Addressed responsiveness issues for the "Recent Canvases" section.
    *   **Routing Integration:**
        *   Modified `client/src/pages/index.tsx` to act as the `AppLayout` component, using `react-router-dom`'s `<Outlet />` for nested content rendering.
        *   Modified `client/src/App.tsx` to set up nested routing, making `HeroSection` the default content for the root path (`/`).
    *   **Troubleshooting:**
        *   Resolved `TS2307: Cannot find module` errors by clarifying that `particles`, `dot-pattern`, and `@tailark/hero-section-9` are not standard Shadcn/UI components and cannot be added via `shadcn add`.
        *   Provided guidance on installing `next-themes` and `badge` components.
        *   Addressed `EACCES: permission denied` error during global `pnpm` installation, advising `sudo` or `nvm`.
        *   Fixed multiple syntax errors in `home.tsx` related to mismatched braces and unclosed tags.

### August 29, 2025
*   **Frontend Development:**
    *   Successfully created the login and registration pages using Shadcn/UI components.
    *   Added a background image to the login page and resolved image loading issues.
    *   Fixed a persistent scrolling issue that was affecting all pages.
    *   Created the home page with a sidebar.
    * Project Reset:** The user has decided to restart the client-side development from scratch due to persistent issues with the initial setup. The AI was unable to provide a satisfactory solution, so the user will be following a YouTube tutorial to rebuild the project.

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

## 📂 Project Structure & Key Files (Frontend - `client/src`)

This section outlines the core structure and purpose of key files within the frontend application, focusing on their functionality and role in the Nexus project.

```
client/src/
├───App.tsx
├───main.tsx
├───components/
│   ├───app-sidebar.tsx
│   ├───login-form.tsx
│   ├───nav-main.tsx
│   ├───nav-projects.tsx
│   ├───nav-user.tsx
│   ├───register-form.tsx
│   ├───team-switcher.tsx
│   └───ui/
│       ├───sidebar.tsx
│       └───... (other Shadcn/UI components)
├───hooks/
│   └───use-mobile.ts
├───lib/
│   └───utils.ts
├───pages/
│   ├───home.tsx
│   ├───index.tsx
│   ├───infinite-canvas.tsx
│   ├───login.tsx
│   └───register.tsx
└───store/
    └───canvasStore.ts
```

### Key Files and Directories within `client/src/`

This section outlines the core structure and purpose of key files within the frontend application, focusing on their functionality and role in the Nexus project.

```
client/src/
├───App.tsx
├───main.tsx
├───components/
│   ├───app-sidebar.tsx
│   ├───login-form.tsx
│   ├───nav-main.tsx
│   ├───nav-projects.tsx
│   ├───nav-user.tsx
│   ├───register-form.tsx
│   ├───team-switcher.tsx
│   └───ui/
│       ├───sidebar.tsx
│       └───... (other Shadcn/UI components)
├───hooks/
│   └───use-mobile.ts
├───lib/
│   └───utils.ts
├───pages/
│   ├───home.tsx
│   ├───index.tsx
│   ├───infinite-canvas.tsx
│   ├───login.tsx
│   └───register.tsx
└───store/
    └───canvasStore.ts
```

### Key Files and Directories within `client/src/`

*   **`App.tsx`**:
    *   **Purpose:** The root React component. It sets up the main application layout and routing.
    *   **Functionality:** Serves as the primary entry point for the React component tree, orchestrating the overall application structure.
*   **`main.tsx`**:
    *   **Purpose:** The application's entry point. It renders the `App` component into the HTML document.
    *   **Functionality:** Initializes and mounts the React application, connecting it to the browser's DOM.
*   **`components/`**:
    *   **Purpose:** Houses reusable React components.
    *   **Functionality:** Promotes modularity and reusability of UI elements across the application.
    *   **`app-sidebar.tsx`**: Manages the main application sidebar's display and behavior.
    *   **`login-form.tsx` / `register-form.tsx`**: Components for user authentication forms.
    *   **`ui/`**: Contains UI components from Shadcn/UI, customized for the project.
        *   **`sidebar.tsx`**: The core Shadcn/UI sidebar component, handling its state and responsiveness.
*   **`hooks/`**:
    *   **Purpose:** Stores custom React hooks.
    *   **Functionality:** Encapsulates reusable, stateful logic for various parts of the application.
    *   **`use-mobile.ts`**: A custom hook to detect if the user is on a mobile device, used for responsive UI adjustments.
*   **`lib/`**:
    *   **Purpose:** Contains utility functions and helper modules.
    *   **Functionality:** Provides common, project-wide helper functions (e.g., `utils.ts` for class name concatenation).
*   **`pages/`**:
    *   **Purpose:** Top-level components representing distinct views or "pages" of the application.
    *   **Functionality:** Defines the main screens users navigate through.
    *   **`home.tsx`**: The landing page displayed when no canvas is open, featuring a "Hero Section."
    *   **`index.tsx`**: Acts as the main application layout component, wrapping other pages and managing the overall structure (e.g., sidebar and content area).
    *   **`infinite-canvas.tsx`**: The central canvas component. This is where users interact with shapes, supporting panning, zooming, selection, movement, resizing, rotation, and deletion. It integrates with `react-konva` for rendering.
    *   **`login.tsx` / `register.tsx`**: The full page components for user authentication.
*   **`store/`**:
    *   **Purpose:** Dedicated directory for Zustand stores.
    *   **Functionality:** Centralizes global application state management.
    *   **`canvasStore.ts`**: The core Zustand store for the canvas. It manages the state of all shapes, maintains a history for undo/redo functionality, and provides actions for manipulating shapes (add, update, delete, undo, redo).

    git add . && git commit -m "" && git push origin main
---
## SaaS Blueprint (Finalized September 14, 2025)

This section outlines the core product strategy and development roadmap for transforming Nexus into a freemium SaaS application.

### Part 1: The Freemium Model

A two-tier model is defined to offer significant value for free while creating a compelling reason for users to upgrade.

**The Free Plan: The Creative Sandbox**

This plan is designed for individual use and provides access to the full creative power of the canvas.

*   **Core Access:** Users get the complete infinite canvas experience.
*   **Included Features:**
    *   Full Content Creation: Add and manipulate Text Cards and Image Cards.
    *   Advanced Drawing Tools: Full access to tools like the Eraser, and future additions like Connectors and Arrows.
*   **Primary Limitation:**
    *   **Content-Based:** The free plan will be limited by the **number of items allowed per board** (e.g., a maximum of 100 items).

**The Premium Plan: The Collaboration & Pro Suite**

This plan unlocks the full collaborative and professional potential of Nexus, designed for power users and teams.

*   **Core Upgrade:** **Unlimited items** on all boards.
*   **Exclusive Premium Features:**
    *   **Real-time Collaboration:** The ability for multiple users to work on the same board simultaneously.
    *   **High-Quality Exports:** Export boards as high-resolution, watermark-free images (PNG/JPG).
    *   **Priority Support:** Users get direct access to email support for faster help.
    *   **Future AI Features:** All upcoming AI-powered tools for generation, summarization, etc., will be exclusive to the Premium plan.

### Part 2: Required Application & Website Pages

The following pages will be built to create a complete user journey, from initial visit to app usage.

1.  **Landing Page:** The primary marketing page for non-logged-in users to convert visitors into free users.
2.  **Pricing Page:** A comparative table layout to clearly communicate the differences between the Free and Premium plans.
3.  **Features Page:** A dedicated, in-depth showcase of Nexus's capabilities with descriptions and visuals.
4.  **Forgot Password Page:** A functional page for users to securely reset their password.
5.  **Legal Pages (Terms of Service & Privacy Policy):** To establish a legal framework and build user trust.


1.  **Preserve Existing Functionality:** Utmost care must be taken to not disrupt or break any existing code or functionality.
2.  **Adhere to Explicit Requests:** Only implement changes that have been explicitly requested by the user. Do not perform any extra modifications or additions.
3.  **Await Explicit Command for Code Changes:** Do not write, create, or modify any files or code until explicitly instructed to do so.
4.  **Strict Adherence to Instructions:** All user instructions are to be followed precisely as stated.
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

### September 17, 2025
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

### September 16, 2025
*   **Landing Page Enhancements:**
    *   Applied thicker bezels to gradient sections.
    *   Refined testimonial section: expanded content, added realistic names (including Indian names), and implemented infinite horizontal auto-scrolling with reduced fade effect.
    *   Updated feature cards: icons are now white by default, removed hover border, and maintained zoom effect.
*   **Footer Refactoring:**
    *   Created `PublicFooter` component based on `pricing.tsx`'s footer.
    *   Replaced footers in `landing.tsx`, `features.tsx`, and `pricing.tsx` with `PublicFooter`.
*   **Forgot Password Page Implementation:**
    *   Created `forgot-password-form.tsx` component.
    *   Created `forgot-password.tsx` page with `login-02` block layout, updated image, and adapted form fields for password reset.
    *   Linked "Forgot Password" from `login-form.tsx` and `register-form.tsx`.
*   **Contact Page Implementation:**
    *   Created `contact-form.tsx` component (removed inquiry type).
    *   Created `contact.tsx` page with black hero section.
    *   Implemented new main content layout: gradient background for form and contact info (two columns), with "How We Respond" text.
    *   Moved FAQ section below main content, spanning full width, and added detailed answers.
    *   Added "Contact" link to `PublicHeader`.
*   **Troubleshooting & Bug Fixes:**
    *   Resolved multiple import errors (`PublicFooter`, `PublicHeader`, `Accordion`, `Select`) by correcting import syntax and adding missing `shadcn/ui` components.
    *   Fixed Accordion animation: added missing keyframes, then switched to a more robust `max-height` based animation strategy in `accordion.tsx` and removed old keyframes from `index.css`.

### September 15, 2025
*   **Public Website Refinements:**
    *   **Landing Page:**
        *   Updated hero section text.
        *   Implemented smooth scrolling for anchor links.
        *   Redesigned footer and testimonials section (with avatars and star ratings).
        *   **Remaining Customization:** Hero section background and bezel effect to be done tomorrow.
    *   **Features Page:**
        *   Created dedicated page with detailed content and zig-zag layout.
        *   Refined hero sub-headline section with bezel effect and full-width text.
        *   Added separator lines between thematic feature sections.
    *   **Pricing Page:**
        *   Created dedicated page with comparison table and three tiers (Free, Premium, Enterprise).
        *   Implemented "bezel" layout (black background with inset, rounded gradient panel).
        *   Thickened side bezels.
        *   Removed top border from footer.
    *   **Navigation:**
        *   Updated all header links (`Home`, `Features`, `Pricing`, `Login`, `Sign Up`) across Landing, Features, and Pricing pages to point to correct routes.
        *   Refactored header into a reusable `PublicHeader` component and used it on Landing, Features, and Pricing pages.
*   **Core Application Flow Fixes (Authenticated):**
    *   Fixed routing issues in `app-sidebar.tsx` (correctly detecting canvas open, "New Canvas" button navigation, "Back to Home" button navigation).

### September 14, 2025
*   **SaaS Implementation Roadmap Finalized**: The following implementation order was decided upon for building out the SaaS platform.

    **Phase 1: Building the Public Website & User Flow**
    1.  **Create Landing Page:** Build the main marketing page for new visitors.
    2.  **Update App Routing:** Ensure non-logged-in users see public pages and logged-in users are directed to the application.
    3.  **Create Features Page:** A detailed page to showcase Nexus's capabilities.
    4.  **Create Pricing Page:** Build the page with the comparative table for the Free and Premium plans.
    5.  **Create Forgot Password Page:** Complete the essential user authentication flow.
    6.  **Create Legal Pages:** Add placeholder pages for Terms of Service and Privacy Policy.

    **Phase 2: Enhancing the Core Application (Free Tier)**
    7.  **Implement Connectors & Arrows:** Add the advanced drawing tools for diagramming, available for all users.

    **Phase 3: Developing the Premium Backend & Features**
    8.  **Initial Backend Setup:** Create the Node.js/Express server foundation.
    9.  **Cloud Persistence:** Implement saving and loading boards to a database, linked to user accounts.
    10. **Implement High-Quality Exports:** Add the premium feature for exporting boards without watermarks.
    11. **Implement Real-time Collaboration:** The flagship feature for multi-user interaction on the same board.
    12. **Future Premium Features:** Stubs for future AI-powered tools and priority support systems.

### September 13, 2025
*   **Sidebar Enhancements:**
    *   Fixed the "Image" button in the sidebar to correctly open the `ImageUploadModal`.
*   **Canvas Features Implemented:**
    *   **Image Card:** Implemented drag-and-drop functionality for images onto the canvas.
    *   **Text Card:** Implemented the ability to add and customize text boxes on the canvas.
    *   **Eraser Tool:** Implemented the eraser tool for removing drawing elements.

### September 3, 2025
*   **Core UX & Navigation:**
    *   Implemented the primary navigation flow, allowing users to move from the homepage to the infinite canvas.
    *   Fixed a layout bug where the canvas would overlap with the application header.
*   **Sidebar Refactoring & Feature Implementation:**
    *   **Dynamic Panels:** Implemented logic to dynamically show/hide sidebar panels based on context. The "Tools" panel now appears only when a canvas is open, and is replaced by a "Properties" panel when a shape is selected.
    *   **Draggable Tools:** Added a "Tools" section with a collapsible submenu for shapes. These shapes (Rectangle, Circle, Star, etc.) can be dragged from the sidebar and dropped onto the canvas to create new elements.
    *   **Context-Aware Properties Panel:** When a shape is selected on the canvas, the sidebar now displays its properties. Implemented controls for changing fill color (with a color picker), rotation, and position.
    *   **Homepage Navigation:** Refactored the main navigation sidebar to remove placeholder content. It now shows a focused list including "New Canvas", "Favorites", "All Canvases", "Trash", and "Settings".
    *   **Favorites System:** Implemented the ability to mark canvases as favorites, moving them between the "Favorites" and "All Canvases" sections.
    *   **Custom Menus:** The dropdown menus for canvas items are now context-aware, showing "Favorite/Unfavorite" options for regular items and "Restore/Delete Permanently" for items in the trash.
*   **Bug Fixes & DX Improvements:**
    *   Resolved multiple TypeScript and ESLint errors related to component props and unused imports.
    *   Fixed a bug where the "Star" shape would not render correctly.
    *   Fixed a critical UX bug where typing in an input field could accidentally delete a selected shape.

### September 2, 2025
*   **Frontend Features Implemented:**
    *   **Select & Transform:** Implemented selection of shapes, and enabled resizing and rotation using `react-konva`'s `Transformer`.
    *   **Move Individual Shapes:** Enabled dragging of individual shapes on the canvas.
    *   **Delete Shapes:** Implemented deletion of selected shapes using the `Delete` or `Backspace` key.
    *   **Undo/Redo:** Refactored state management to use a manual Undo/Redo system within a Zustand store, replacing the problematic `temporal` middleware.
*   **Troubleshooting & Resolutions:**
    *   Resolved persistent TypeScript/ESLint errors in `infinite-canvas.tsx` related to `ref` callback types and general syntax. This involved multiple iterations of code correction and guidance on refreshing the VS Code environment.
    *   Fixed build failure due to `TS1484` error in `sidebar.tsx` (`VariantProps` import).
    *   Addressed build/runtime errors related to `zustand/middleware/temporal` import. Initially attempted to use `zustand`'s `temporal` middleware, but due to persistent package resolution and type issues, a robust manual Undo/Redo implementation was adopted.
    *   Resolved build error (`TS6133`) in `canvasStore.ts` by removing an unused `get` parameter.
*   **Next Steps Discussed:**
    *   Defining and implementing "Card" components (e.g., text, image, link cards) for the canvas, inspired by Milanote's content types.
    *   Setting up the backend infrastructure for real-time collaboration, authentication, and cloud persistence.

### August 30, 2025
*   **Frontend Design Decisions:**
    *   **Sidebar Behavior:**
        *   **Dynamic Tool Section:** The "Tools Section" will only be visible when a canvas is open. The tools within this section (e.g., shapes, text boxes) will be draggable onto the canvas to create new elements.
        *   **Context-Aware Properties Panel:** When a user selects an element on the canvas (e.g., a shape), the sidebar will transform into a "Properties Panel," displaying editable properties for that item like color, border, and font size.
        *   **Favorites Section:** A dedicated "Favorites" section will be added to the navigation area, allowing users to "pin" or "star" their most important canvases for quick access.
        *   **Responsive & Collapsible:** The existing responsive behavior (for mobile) and collapsible sections are confirmed as implemented and meeting current requirements.
    *   **Core Canvas Features (Frontend Implementation Focus):**
        *   **Seamless Canvas Navigation:** Implement intuitive controls for zooming and panning across the infinite canvas.
        *   **Element Customization & Properties:** Develop functionality to modify properties of elements (e.g., text font/color, shape fill/border, image rotation/opacity) via a context-sensitive panel or pop-over.
        *   **Undo/Redo:** Implement a robust undo/redo stack for all canvas operations to ensure user confidence.
    *   **Dynamic Routing for Canvas Pages:** Implement dynamic routing using `react-router-dom` with route parameters (e.g., `/canvas/:id`) to allow unique URLs for each infinite canvas page without full page reloads.
    *   **Main Content Area Routing:** The `client/src/pages/index.tsx` component will serve as the main application layout. It will render the `AppSidebar` and dynamically render the main content area (either the "No Canvas Open" page or the "Infinite Canvas" page) based on the current route.
*   **Frontend Implementation & Troubleshooting:**
    *   **"No Canvas Open" Page (`home.tsx`):**
        *   Designed and implemented the `HeroSection` component (`client/src/pages/home.tsx`) to serve as the "No Canvas Open" page.
        *   Iterated on UI design to achieve a full-page, stylish layout with a prominent "Create New Canvas" button and a "Recent Canvases" section.
        *   Implemented a background with a subtle gradient and a noise texture overlay.
        *   Addressed responsiveness issues for the "Recent Canvases" section.
    *   **Routing Integration:**
        *   Modified `client/src/pages/index.tsx` to act as the `AppLayout` component, using `react-router-dom`'s `<Outlet />` for nested content rendering.
        *   Modified `client/src/App.tsx` to set up nested routing, making `HeroSection` the default content for the root path (`/`).
    *   **Troubleshooting:**
        *   Resolved `TS2307: Cannot find module` errors by clarifying that `particles`, `dot-pattern`, and `@tailark/hero-section-9` are not standard Shadcn/UI components and cannot be added via `shadcn add`.
        *   Provided guidance on installing `next-themes` and `badge` components.
        *   Addressed `EACCES: permission denied` error during global `pnpm` installation, advising `sudo` or `nvm`.
        *   Fixed multiple syntax errors in `home.tsx` related to mismatched braces and unclosed tags.

### August 29, 2025
*   **Frontend Development:**
    *   Successfully created the login and registration pages using Shadcn/UI components.
    *   Added a background image to the login page and resolved image loading issues.
    *   Fixed a persistent scrolling issue that was affecting all pages.
    *   Created the home page with a sidebar.
    * Project Reset:** The user has decided to restart the client-side development from scratch due to persistent issues with the initial setup. The AI was unable to provide a satisfactory solution, so the user will be following a YouTube tutorial to rebuild the project.

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

## 📂 Project Structure & Key Files (Frontend - `client/src`)

This section outlines the core structure and purpose of key files within the frontend application, focusing on their functionality and role in the Nexus project.

```
client/src/
├───App.tsx
├───main.tsx
├───components/
│   ├───app-sidebar.tsx
│   ├───login-form.tsx
│   ├───nav-main.tsx
│   ├───nav-projects.tsx
│   ├───nav-user.tsx
│   ├───register-form.tsx
│   ├───team-switcher.tsx
│   └───ui/
│       ├───sidebar.tsx
│       └───... (other Shadcn/UI components)
├───hooks/
│   └───use-mobile.ts
├───lib/
│   └───utils.ts
├───pages/
│   ├───home.tsx
│   ├───index.tsx
│   ├───infinite-canvas.tsx
│   ├───login.tsx
│   └───register.tsx
└───store/
    └───canvasStore.ts
```

### Key Files and Directories within `client/src/`

This section outlines the core structure and purpose of key files within the frontend application, focusing on their functionality and role in the Nexus project.

```
client/src/
├───App.tsx
├───main.tsx
├───components/
│   ├───app-sidebar.tsx
│   ├───login-form.tsx
│   ├───nav-main.tsx
│   ├───nav-projects.tsx
│   ├───nav-user.tsx
│   ├───register-form.tsx
│   ├───team-switcher.tsx
│   └───ui/
│       ├───sidebar.tsx
│       └───... (other Shadcn/UI components)
├───hooks/
│   └───use-mobile.ts
├───lib/
│   └───utils.ts
├───pages/
│   ├───home.tsx
│   ├───index.tsx
│   ├───infinite-canvas.tsx
│   ├───login.tsx
│   └───register.tsx
└───store/
    └───canvasStore.ts
```

### Key Files and Directories within `client/src/`

*   **`App.tsx`**:
    *   **Purpose:** The root React component. It sets up the main application layout and routing.
    *   **Functionality:** Serves as the primary entry point for the React component tree, orchestrating the overall application structure.
*   **`main.tsx`**:
    *   **Purpose:** The application's entry point. It renders the `App` component into the HTML document.
    *   **Functionality:** Initializes and mounts the React application, connecting it to the browser's DOM.
*   **`components/`**:
    *   **Purpose:** Houses reusable React components.
    *   **Functionality:** Promotes modularity and reusability of UI elements across the application.
    *   **`app-sidebar.tsx`**: Manages the main application sidebar's display and behavior.
    *   **`login-form.tsx` / `register-form.tsx`**: Components for user authentication forms.
    *   **`ui/`**: Contains UI components from Shadcn/UI, customized for the project.
        *   **`sidebar.tsx`**: The core Shadcn/UI sidebar component, handling its state and responsiveness.
*   **`hooks/`**:
    *   **Purpose:** Stores custom React hooks.
    *   **Functionality:** Encapsulates reusable, stateful logic for various parts of the application.
    *   **`use-mobile.ts`**: A custom hook to detect if the user is on a mobile device, used for responsive UI adjustments.
*   **`lib/`**:
    *   **Purpose:** Contains utility functions and helper modules.
    *   **Functionality:** Provides common, project-wide helper functions (e.g., `utils.ts` for class name concatenation).
*   **`pages/`**:
    *   **Purpose:** Top-level components representing distinct views or "pages" of the application.
    *   **Functionality:** Defines the main screens users navigate through.
    *   **`home.tsx`**: The landing page displayed when no canvas is open, featuring a "Hero Section."
    *   **`index.tsx`**: Acts as the main application layout component, wrapping other pages and managing the overall structure (e.g., sidebar and content area).
    *   **`infinite-canvas.tsx`**: The central canvas component. This is where users interact with shapes, supporting panning, zooming, selection, movement, resizing, rotation, and deletion. It integrates with `react-konva` for rendering.
    *   **`login.tsx` / `register.tsx`**: The full page components for user authentication.
*   **`store/`**:
    *   **Purpose:** Dedicated directory for Zustand stores.
    *   **Functionality:** Centralizes global application state management.
    *   **`canvasStore.ts`**: The core Zustand store for the canvas. It manages the state of all shapes, maintains a history for undo/redo functionality, and provides actions for manipulating shapes (add, update, delete, undo, redo).

    git add . && git commit -m "" && git push origin main
---
## SaaS Blueprint (Finalized September 14, 2025)

This section outlines the core product strategy and development roadmap for transforming Nexus into a freemium SaaS application.

### Part 1: The Freemium Model

A two-tier model is defined to offer significant value for free while creating a compelling reason for users to upgrade.

**The Free Plan: The Creative Sandbox**

This plan is designed for individual use and provides access to the full creative power of the canvas.

*   **Core Access:** Users get the complete infinite canvas experience.
*   **Included Features:**
    *   Full Content Creation: Add and manipulate Text Cards and Image Cards.
    *   Advanced Drawing Tools: Full access to tools like the Eraser, and future additions like Connectors and Arrows.
*   **Primary Limitation:**
    *   **Content-Based:** The free plan will be limited by the **number of items allowed per board** (e.g., a maximum of 100 items).

**The Premium Plan: The Collaboration & Pro Suite**

This plan unlocks the full collaborative and professional potential of Nexus, designed for power users and teams.

*   **Core Upgrade:** **Unlimited items** on all boards.
*   **Exclusive Premium Features:**
    *   **Real-time Collaboration:** The ability for multiple users to work on the same board simultaneously.
    *   **High-Quality Exports:** Export boards as high-resolution, watermark-free images (PNG/JPG).
    *   **Priority Support:** Users get direct access to email support for faster help.
    *   **Future AI Features:** All upcoming AI-powered tools for generation, summarization, etc., will be exclusive to the Premium plan.

### Part 2: Required Application & Website Pages

The following pages will be built to create a complete user journey, from initial visit to app usage.

1.  **Landing Page:** The primary marketing page for non-logged-in users to convert visitors into free users.
2.  **Pricing Page:** A comparative table layout to clearly communicate the differences between the Free and Premium plans.
3.  **Features Page:** A dedicated, in-depth showcase of Nexus's capabilities with descriptions and visuals.
4.  **Forgot Password Page:** A functional page for users to securely reset their password.
5.  **Legal Pages (Terms of Service & Privacy Policy):** To establish a legal framework and build user trust.