<p align="center">
<pre>
           _____                    _____                                            _____                    _____          
         /\    \                  /\    \                 ______                   /\    \                  /\    \         
        /::\____\                /::\    \               |::|   |                 /::\____\                /::\    \        
       /::::|   |               /::::\    \              |::|   |                /:::/    /               /::::\    \       
      /:::::|   |              /::::::\    \             |::|   |               /:::/    /               /::::::\    \      
     /::::::|   |             /:::/\:::\    \            |::|   |              /:::/    /               /:::/\:::\    \     
    /:::/|::|   |            /:::/__\:::\    \           |::|   |             /:::/    /               /:::/__\:::\    \    
   /:::/ |::|   |           /::::\   \:::\    \          |::|   |            /:::/    /                \:::\   \:::\    \   
  /:::/  |::|   | _____    /::::::\   \:::\    \         |::|   |           /:::/    /      _____    ___\:::\   \:::\    \  
 /:::/   |::|   |/\    \  /:::/\:::\   \:::\    \  ______|::|___|___ ____  /:::/____/      /\    \  /\   \:::\   \:::\    \ 
/:: /    |::|   /::\____\/:::/__\:::\   \:::\____\|:::::::::::::::::|    ||:::|    /      /::\____\/::\   \:::\   \:::\____\
\::/    /|::|  /:::/    /\:::\   \:::\   \::/    /|:::::::::::::::::|____||:::|____\     /:::/    /\:::\   \:::\   \::/    /
 \/____/ |::| /:::/    /  \:::\   \:::\   \/____/  ~~~~~~|::|~~~|~~~       \:::\    \   /:::/    /  \:::\   \:::\   \/____/ 
         |::|/:::/    /    \:::\   \:::\    \            |::|   |           \:::\    \ /:::/    /    \:::\   \:::\    \     
         |::::::/    /      \:::\   \:::\____\           |::|   |            \:::\    /:::/    /      \:::\   \:::\____\    
         |:::::/    /        \:::\   \::/    /           |::|   |             \:::\__/:::/    /        \:::\  /:::/    /    
         |::::/    /          \:::\   \/____/            |::|   |              \::::::::/    /          \:::\/:::/    /     
         /:::/    /            \:::\    \                |::|   |               \::::::/    /            \::::::/    /      
        /:::/    /              \:::\____\               |::|   |                \::::/    /              \::::/    /       
        \::/    /                \::/    /               |::|___|                 \::/____/                \::/    /        
         \/____/                  \/____/                 ~~                       ~~                       \/____/         
                                                                                                                            
</pre>
</p>
</p> 

<p align="center">
  <a href="https://github.com/your-username/Nexus/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  </a>
  <a href="https://github.com/your-username/Nexus/issues">
    <img src="https://img.shields.io/github/issues-pr/your-username/Nexus" alt="Pull Requests">
  </a>
  <a href="GEMINI_LOG.md">
    <img src="https://img.shields.io/badge/Gemini-Log-blueviolet" alt="Gemini Log">
  </a>
  <!-- Add more badges here, e.g., build status, code coverage -->
</p>

## 🚀 Project Overview

Nexus is a highly flexible, collaborative digital whiteboard application designed for visual organization, brainstorming, and real-time collaboration. **Built from the ground up by a solo founder, this project showcases an original vision and dedicated effort.** Inspired by tools like Milanote, Nexus aims to provide an intuitive and powerful platform for unleashing creativity. This project follows a frontend-first iterative development approach, focusing on a robust MVP before scaling.

<!-- Add a compelling screenshot or GIF here -->
<!-- ![Nexus Demo](link-to-your-demo-gif.gif) -->

## ✨ Freemium Model

Nexus will operate on a freemium model, designed to provide powerful core tools for free, with advanced features available for premium users.

*   **✅ Free Plan:** Perfect for individual use. Includes the full infinite canvas, all drawing and content tools (text cards, image cards, connectors, etc.), and is limited by the number of items per board.
*   **🚀 Premium Plan:** Unlocks the full collaborative and professional potential. Includes unlimited items per board, real-time collaboration, high-resolution exports, priority support, and all future AI-powered features.

## 🗺️ Roadmap

### ✅ Core Features (Implemented)

*   **👤 User Profile Management:** A comprehensive account management modal where users can:
    *   Update their name.
    *   Upload, change, or remove their profile picture.
    *   Set personal preferences like default canvas color and pattern.
*   **✏️ In-Place Editing & Advanced Tools:**
    *   **Direct Text Editing:** Double-click Text Cards, Comments, and other text objects to edit them directly on the canvas.
    *   **Enhanced Connectors:** Connectors can now link *any* two items on the canvas. They are now also **bendable**—a central handle appears on selection, allowing you to create smooth curves. The selection is made easy with a wider, invisible hit area.
    *   **Expanded Arrow Library:** A new sidebar category for arrows, including left, right, up, down, and bent L-shaped arrows.
*   **📥 Export Canvas:** Export your canvas creations to high-quality PNG, JPG, or PDF formats directly from the header menu.
*   **💾 Canvas Content Persistence:** The contents of each canvas (shapes, text, images, etc.) are now saved to the database with a debounced auto-save feature for a seamless user experience.
*   **🗑️ Trash & Restore:** Canvases can be moved to a trash can instead of being deleted immediately. From the trash, they can either be restored or permanently deleted.
*   **✨ Safe Deletion:** Replaced risky keyboard-based deletion with a clear and explicit "Delete" button in the properties panel for any selected item.
*   **✨ Save Status Indicator:** The UI now provides real-time feedback in the header, showing when a canvas is being saved and confirming when all changes are saved.
*   **☁️ Cloud Canvas Lifecycle:** Full end-to-end feature for creating canvases, which are saved to the database. Canvases are now fetched and listed in the sidebar, and can be opened to view their content.
*   **🔐 User Authentication:** Secure login and registration with email/password and Google. **Verified in Production.**
*   **👤 User Information Display:** The logged-in user's name and email are now displayed in the user navigation menu.
*   **📞 Authenticated API Calls:** Implemented a reusable utility for making authenticated API calls from the frontend.
*   **🔒 Protected Routes:** Restrict access to authenticated users for specific application sections.
*   **🚪 Logout Functionality:** Clear user sessions and redirect to public pages.
*   **🔔 Enhanced Notifications:** Replaced native alerts with consistent, styled toast notifications.
*   **✨ UI/Codebase Refinements:** Various bug fixes, linting corrections, type safety improvements, and connector tool deactivation after use.
*   **無限 Infinite Canvas:** A pannable, zoomable, and interactive canvas.
*   **🎨 Element Manipulation & Customization:** Full control over elements like shapes, text, and images.
*   **💾 Local Persistence:** Work is saved automatically to local storage.
*   **↩️ Undo/Redo:** Robust history management.
*   **🌐 Public Website Pages:**
    *   **Dedicated Landing Page:** A modern, content-rich marketing page.
    *   **Dedicated Features Page:** Detailed showcase of Nexus capabilities.
    *   **Dedicated Pricing Page:** Comprehensive comparison of Free, Premium, and Enterprise plans.
    *   **Legal Pages:** Terms of Service & Privacy Policy pages.
*   **🔄 Reusable Public Header:** Centralized navigation component for public pages.

### 🚧 Currently Working On & Next Steps

This section outlines the immediate development focus and the major features planned for the subsequent release.

#### Immediate Priority: Full Responsiveness Overhaul

Now that the core features are stable and deployed, the top priority is to ensure Nexus provides a seamless and professional experience on all devices. This involves a comprehensive overhaul of the application's design to be fully responsive.

*   **Goal:** Adapt all pages, components, and the main canvas interface for a mobile-first experience without sacrificing desktop usability.
*   **Key Areas:**
    *   Reflowing the main application layout (sidebar, header).
    *   Ensuring all modals and forms are usable on small screens.
    *   Adapting the canvas interaction model for touch devices.

#### Next Up: Real-Time Collaboration & Sharing

This is the next major feature update, which will transform Nexus into a truly collaborative platform, built on a secure foundation of ownership and permissions.

*   **Feature Blueprint (The "What")**
    1.  **Ownership & Permissions:** Canvases will now have a single `Owner` and can be shared with `Collaborators`. This involves database model changes, API security updates, and a new UI for sharing. The sidebar will be reorganized into **"My Canvases"** and **"Shared With Me"** sections.
    2.  **Core Real-Time Editing:** The foundational engine for synchronizing all canvas element changes (create, update, delete) between active users in real-time.
    3.  **Presence Indicators:** A new UI component to display the avatars of all users currently active on a canvas.
    4.  **Live Cursors:** A new UI feature to render the cursors and names of other users on the canvas as they move their mice in real-time.

*   **Implementation Sequence (The "How")**
    1.  **Backend - Ownership Foundation:** Update the `Canvas` model, secure API endpoints, and update the canvas fetch logic.
    2.  **Frontend - Sidebar & Sharing UI:** Implement the new sidebar design and the "Share" button/modal UI.
    3.  **Backend - Sharing Logic:** Create the API endpoint for inviting collaborators.
    4.  **Backend - Core Real-Time Engine:** Install and configure `socket.io` to manage rooms and broadcast updates.
    5.  **Frontend - Core Real-Time Engine:** Connect the canvas to the socket, manage state, and emit/listen for changes.
    6.  **Full Stack - Presence Indicators:** Implement the backend tracking and frontend UI for displaying active user avatars.
    7.  **Full Stack - Live Cursors:** Implement the backend broadcasting and frontend rendering of real-time cursor positions.

### 🚀 Upcoming Features & Pages

*   **Proper Image & File Uploads (for Canvas):** The current image implementation for the canvas is a frontend placeholder. The full feature requires:
    *   **Backend:** Building an API endpoint to handle file uploads, process them with middleware like `multer`, and save them to a persistent storage solution (cloud or local).
    *   **Frontend:** Connecting the `ImageUploadModal` to the new endpoint to upload files and use the returned URL.

*   **Complete Deletion Lifecycle:**
    *   Implement the final **permanent deletion** of canvases from the trash, including the backend API and the UI trigger.

*   **⭐ Favorites System (Backend):** The UI for favoriting canvases is in place, but the backend functionality to save this state needs to be implemented to make it persistent.

## 🛠️ Technology Stack

Nexus leverages a powerful and modern technology stack:

### Frontend

*   **React** (with TypeScript) - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="20" height="20"/>
*   **Vite** - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" width="20" height="20"/>
*   **TypeScript** - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="20" height="20"/>
*   **Tailwind CSS** - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" width="20" height="20"/>
*   **Shadcn/UI** - <img src="https://avatars.githubusercontent.com/u/124591059?s=200&v=4" alt="Shadcn/UI" width="20" height="20"/>
*   **React Router DOM** - <img src="https://reactrouter.com/favicon.png" alt="React Router" width="20" height="20"/>
*   **Zustand** (with manual Undo/Redo implementation) - <img src="https://github.com/pmndrs/zustand/raw/main/bear.png" alt="Zustand" width="20" height="20"/>
*   **Konva.js** (via React Konva) - <img src="https://konvajs.org/assets/konva-logo.png" alt="Konva.js" width="20" height="20"/>
*   **@tanstack/react-query** - <img src="https://raw.githubusercontent.com/TanStack/query/main/media/repo-icon.svg" alt="React Query" width="20" height="20"/>
*   **Lucide React** - <img src="https://lucide.dev/logo.svg" alt="Lucide React" width="20" height="20"/>
*   **sonner** - <img src="https://sonner.emilkowalski.studio/logo.svg" alt="sonner" width="20" height="20"/>
*   **next-themes** - <img src="https://assets.vercel.com/image/upload/v1670824459/nextjs/Icon_light_background.png" alt="Next.js" width="20" height="20"/>

### Backend

*   **Node.js** (with Express.js) - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="20" height="20"/>
*   **MongoDB** (Mongoose) - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="20" height="20"/>
*   **bcryptjs**
*   **jsonwebtoken**
*   **passport**
*   **passport-google-oauth20**
*   **dotenv**
*   **cors**
*   **Socket.IO** - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="Socket.IO" width="20" height="20"/>

## 📚 Documentation

Explore the detailed documentation for Nexus:

*   [Architecture Overview](docs/architecture.md): Understand the high-level structure and data flow.
*   [API Documentation](docs/api.md): Reference for all backend API endpoints.
*   [User Guide](docs/user-guide.md): Learn how to use Nexus features.
*   [Deployment Guide](docs/deployment.md): Instructions for deploying Nexus to production.

## 🚀 Installation & Setup

To get Nexus up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Nexus.git
    cd Nexus
    ```
2.  **Install dependencies:**
    ```bash
    cd client && npm install
    cd ../server && npm install
    ```
3.  **Configure Environment Variables:**
    *   Create a `.env` file in the `client/` directory:
        ```
        VITE_API_URL=http://localhost:5000
        ```
    *   Create a `.env` file in the `server/` directory (replace with your actual MongoDB credentials and a strong secret):
        ```
        PORT=5000
        MONGO_URI="mongodb+srv://your_new_username:your_new_password@nexus.cigvjke.mongodb.net/?retryWrites=true&w=majority&appName=Nexus"
        JWT_SECRET=your_super_secret_key
        ```
4.  **Run the application:**
    *   Start the backend server:
        ```bash
        cd server
        npm start # or node index.js
        ```
    *   Start the frontend development server:
        ```bash
        cd client
        npm run dev
        ```

## 🌐 Deployment

*   **Frontend:** Hosted on **Vercel**.
*   **Backend:** Hosted on **Render**.
*   **Database:** Hosted on **MongoDB Atlas**.

**Vercel Monorepo Configuration Note:** For Single-Page Application (SPA) routing and OAuth callbacks to function correctly, Vercel's **Root Directory** setting must point to the `client` folder. Crucially, the `vercel.json` file containing the rewrite rules must be located **inside the `client` directory**, not at the project root.

```json
// client/vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🤝 Contributing

**Note from the Founder:** While Nexus is currently a solo endeavor, I warmly welcome and appreciate contributions from the community. Your help can make a significant impact!

Please read our guidelines:

*   [Contributing Guidelines](CONTRIBUTING.md)
*   [Code of Conduct](CODE_OF_CONDUCT.md)

## 📜 Changelog

Stay up-to-date with the latest changes and releases:

*   [View Changelog](CHANGELOG.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📧 Contact

For questions, feedback, or collaboration inquiries, please reach out to the solo founder, Abuhuraira Jamal:

*   **LinkedIn:** [https://www.linkedin.com/in/abuhurairajamal/](https://www.linkedin.com/in/abuhurairajamal/)
*   **For Issues/Support:** abuhuraira1514@gmail.com hehe
