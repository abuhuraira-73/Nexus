# Nexus: Infinite Canvas, Simplified. ✨

## Project Overview
Nexus is a highly flexible, collaborative digital whiteboard application designed for visual organization, brainstorming, and real-time collaboration. Inspired by tools like Milanote, Nexus aims to provide an intuitive and powerful platform for unleashing creativity. This project follows a frontend-first iterative development approach, focusing on a robust MVP before scaling.

## Features

### Implemented Features ✅
*   **User Authentication:** Secure login and registration pages with modern UI (Shadcn/UI).
*   **Responsive Layout:** Core application layout (sidebar, main content) designed for various screen sizes.
*   **Main Application Layout:** Implemented a dynamic layout where the sidebar is always present, and the main content area changes based on the route.
*   **"No Canvas Open" Page:** A welcoming and stylish landing page (`HeroSection`) displayed when no specific canvas is active, featuring:
    *   Prominent "Create New Canvas" call to action.
    *   Section for "Recent Canvases" (with placeholder data).
    *   Visually appealing full-page design with gradient and noise background.
*   **Frontend Routing:** Configured `react-router-dom` for seamless navigation between authentication pages and the main application layout, including nested routes and dynamic routing for future canvas pages (`/canvas/:id`).

### Planned Features 🚀
*   **Infinite Canvas:** Pannable and zoomable canvas.
*   **Basic Element Creation:** Add text boxes, basic shapes (rectangles, circles).
*   **Element Manipulation:** Select, move, resize, delete elements.
*   **Element Customization:** Modify properties (font, color, size, rotation) of elements.
*   **Undo/Redo:** Robust version history and undo/redo functionality.
*   **Dynamic Sidebar Behavior:** Conditional display of "Tools Section" only when a canvas is open.
*   **Local Board Persistence:** Save and load board state to/from local storage.
*   **Rich Content Types:** Drag & drop images, embed links, upload files (PDFs, videos).
*   **Real-time Collaboration:** Multi-user editing with presence indicators.
*   **User Authentication & Authorization:** Secure user accounts and board sharing.
*   **Cloud Board Persistence:** Save and load boards to/from a database.
*   **Advanced Drawing Tools:** Smart shapes, connectors, lines, arrows.
*   **Templating System:** Pre-defined board layouts.
*   **AI-Powered Features:** Idea generation, content summarization, image recognition.
*   **Integrations:** Connect with external services (e.g., cloud storage, communication apps).
*   **Export Options:** Export boards as images (PNG, JPG) or PDFs.

## Technology Stack 🛠️
Nexus leverages a powerful and modern technology stack:

### Frontend
*   **React** (with TypeScript) - ![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg){:height="20px"}
*   **Vite** - ![Vite Logo](https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg){:height="20px"}
*   **TypeScript** - ![TypeScript Logo](https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg){:height="20px"}
*   **Tailwind CSS** - ![Tailwind CSS Logo](https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg){:height="20px"}
*   **Shadcn/UI** - ![Shadcn/UI Logo](https://avatars.githubusercontent.com/u/124591059?s=200&v=4){:height="20px"}
*   **React Router DOM** - ![React Router Logo](https://reactrouter.com/favicon.png){:height="20px"}
*   **Zustand** - ![Zustand Logo](https://github.com/pmndrs/zustand/raw/main/bear.png){:height="20px"}
*   **@tanstack/react-query** - ![React Query Logo](https://raw.githubusercontent.com/TanStack/query/main/media/repo-icon.svg){:height="20px"}
*   **Lucide React** (for icons) - ![Lucide React Logo](https://lucide.dev/logo.svg){:height="20px"}
*   **next-themes** (for theme management) - ![Next.js Logo](https://assets.vercel.com/image/upload/v1670824459/nextjs/Icon_light_background.png){:height="20px"} *(Note: Icon represents Next.js, often used with next-themes)*

### Backend (Planned)
*   **Node.js** (with Express.js) - ![Node.js Logo](https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg){:height="20px"}
*   **MongoDB** (Mongoose) - ![MongoDB Logo](https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg){:height="20px"}
*   **Socket.IO** (for real-time communication) - ![Socket.IO Logo](https://socket.io/images/logo.svg){:height="20px"}

## Installation & Setup 🚀
To get Nexus up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Nexus.git
    cd Nexus
    ```
2.  **Navigate to the client directory:**
    ```bash
    cd client
    ```
3.  **Install dependencies:**
    *   Using npm:
        ```bash
        npm install
        ```
    *   Using pnpm (if installed globally):
        ```bash
        pnpm install
        ```
4.  **Add Shadcn/UI components:**
    *   Ensure you have `npx shadcn-ui@latest` installed globally.
    *   Add necessary components (e.g., `badge`, `button`, `card`, `separator`):
        ```bash
        npx shadcn-ui add button card separator badge # Add other components as needed
        ```
        *(Note: `particles` and `dot-pattern` are not standard Shadcn/UI components and need to be sourced/implemented separately if desired.)*
5.  **Run the development server:**
    ```bash
    npm run dev # or pnpm dev
    ```
    The client application should now be running, typically on `http://localhost:5173`.

## Daily Development Log 🗓️
This section provides a summary of daily progress and key decisions. For a more detailed log, refer to `GEMINI_LOG.md`.

### August 30, 2025
*   **Frontend Design Decisions:**
    *   **Sidebar Behavior:** Defined conditional visibility for the "Tools Section" based on canvas state.
    *   **Core Canvas Features:** Confirmed focus on seamless navigation (zoom/pan), element customization, and undo/redo.
    *   **Dynamic Routing:** Implemented `react-router-dom` with dynamic parameters (`/canvas/:id`) for canvas pages.
    *   **Main Content Area Routing:** Established `client/src/pages/index.tsx` as the `AppLayout` and `client/src/pages/home.tsx` (`HeroSection`) as the default content for the root path.
*   **Frontend Implementation & Troubleshooting:**
    *   Designed and implemented the `HeroSection` component (`client/src/pages/home.tsx`) to serve as the "No Canvas Open" page.
    *   Iterated on UI design to achieve a full-page, stylish layout with a prominent "Create New Canvas" button and a "Recent Canvases" section.
    *   Implemented a background with a subtle gradient and a noise texture overlay.
    *   Addressed responsiveness issues for the "Recent Canvases" section.
    *   **Routing Integration:** Modified `client/src/pages/index.tsx` to act as the `AppLayout` component, using `react-router-dom`'s `<Outlet />` for nested content rendering. Modified `client/src/App.tsx` to set up nested routing, making `HeroSection` the default content for the root path (`/`).
    *   **Troubleshooting:** Resolved `TS2307` errors, `shadcn add` issues for non-standard components, `pnpm` installation `EACCES` errors, and various JSX syntax errors.

### August 29, 2025
*   **Frontend Development:** Created login, registration, and home pages (with sidebar) using Shadcn/UI. Addressed background image and scrolling issues.
*   **Project Reset:** Client-side development restarted due to initial setup issues.

### August 28, 2025
*   **Project Setup:** Bootstrapped frontend with Vite, React, TypeScript, Tailwind CSS, DaisyUI, Shadcn/UI. Configured core dependencies.
*   **Project Pivot:** Shifted focus to infinite canvas/digital whiteboard. Finalized Konva.js and Socket.IO.
*   **Login Page Start:** Began implementing login page and troubleshooting Shadcn/UI integration.

## Contributing 🤝
We welcome contributions to Nexus! If you're interested in helping out, please follow these steps:

1.  **Fork the repository.**
2.  **Clone your forked repository:** `git clone https://github.com/your-username/Nexus.git`
3.  **Create a new branch:** `git checkout -b feature/your-feature-name` or `bugfix/your-bug-fix`
4.  **Make your changes.**
5.  **Commit your changes:** Write clear, concise commit messages.
6.  **Push your branch:** `git push origin feature/your-feature-name`
7.  **Open a Pull Request:** Describe your changes thoroughly.

Please ensure your code adheres to the project's coding standards (linting, formatting) and includes relevant tests.

## License 📄
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. (Assuming MIT, please confirm or change)

## Contact 📧
For questions, feedback, or collaboration inquiries, please reach out to:
*   [Your Name/Email/GitHub Profile Link]