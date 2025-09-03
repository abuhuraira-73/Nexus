<p align="center">
<pre>

 /$$   /$$ /$$$$$$$$ /$$   /$$ /$$   /$$  /$$$$$$ 
| $$$ | $$| $$_____/| $$  / $$| $$  | $$ /$$__  $$
| $$$$| $$| $$      |  $$/ $$/| $$  | $$| $$  \__/
| $$ $$ $$| $$$$$    \  $$$$/ | $$  | $$|  $$$$$$ 
| $$  $$$$| $$__/     >$$  $$ | $$  | $$ \____  $$
| $$\  $$$| $$       /$$/\  $$| $$  | $$ /$$  \ $$
| $$ \  $$| $$$$$$$$| $$  \ $$|  $$$$$$/|  $$$$$$/
|__/  \__/|________/|__/  |__/ \______/  \______/ 

</pre>
</p>

<p align="center">
  <a href="https://github.com/your-username/Nexus/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  </a>
  <a href="https://github.com/your-username/Nexus/issues">
    <img src="https://img.shields.io/github/issues-pr/your-username/Nexus" alt="Pull Requests">
  </a>
</p>

## 🚀 Project Overview

Nexus is a highly flexible, collaborative digital whiteboard application designed for visual organization, brainstorming, and real-time collaboration. Inspired by tools like Milanote, Nexus aims to provide an intuitive and powerful platform for unleashing creativity. This project follows a frontend-first iterative development approach, focusing on a robust MVP before scaling.

## ✨ Features

### ✅ Implemented

*   **🔐 User Authentication:** Secure login and registration pages with a modern UI.
*   **📱 Responsive Layout:** Core application layout designed for various screen sizes.
*   **🎨 Main Application Layout:** Dynamic layout with a persistent sidebar and a content area that adapts to the current route.
*   **✨ Dynamic Sidebar:** Sidebar intelligently shows/hides panels like "Tools" and "Properties" based on the user's context.
*   **🖼️ "No Canvas Open" Page:** A stylish and welcoming landing page when no canvas is active.
*   **🗺️ Frontend Routing:** Seamless navigation between pages using `react-router-dom`.
*   **⭐ Favorites System:** Pin your most important canvases for quick access.
*   **無限 Infinite Canvas:** A pannable and zoomable canvas for unrestricted creativity.
*   **✏️ Draggable Tools:** Drag shapes from the sidebar to create them on the canvas.
*   **🔧 Element Manipulation:** Easily select, move, resize, and delete elements.
*   **🎨 Element Customization:** Modify properties like fill color, rotation, and position via a context-aware properties panel.
*   **↩️ Undo/Redo:** Robust version history and undo/redo functionality (manual Zustand implementation).

### 🚀 Planned

*   **💾 Local Board Persistence:** Save and load your work to/from local storage.
*   **☁️ Cloud Board Persistence:** Save and load boards to/from a database for access anywhere.
*   **🤝 Real-time Collaboration:** Work with others in real-time with presence indicators.
*   **✍️ Advanced Drawing Tools:** Smart shapes, connectors, lines, and arrows.
*   **📋 Templating System:** Pre-defined board layouts to get you started quickly.
*   **🤖 AI-Powered Features:** Idea generation, content summarization, and more.
*   **📤 Export Options:** Export your boards as images (PNG, JPG) or PDFs.

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
*   **next-themes** - <img src="https://assets.vercel.com/image/upload/v1670824459/nextjs/Icon_light_background.png" alt="Next.js" width="20" height="20"/>

### Backend (Planned)

*   **Node.js** (with Express.js) - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="20" height="20"/>
*   **MongoDB** (Mongoose) - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="20" height="20"/>
*   **Socket.IO** - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="Socket.IO" width="20" height="20"/>

## 🚀 Installation & Setup

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
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🤝 Contributing

We welcome contributions to Nexus! If you're interested in helping out, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch:** `git checkout -b feature/your-feature-name`
3.  **Make your changes.**
4.  **Commit your changes:** `git commit -m "Add some feature"`
5.  **Push your branch:** `git push origin feature/your-feature-name`
6.  **Open a Pull Request.**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📧 Contact

For questions, feedback, or collaboration inquiries, please reach out in Linkedin.

