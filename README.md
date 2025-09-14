<p align="center">
<pre>

 /$   /$ /$$$$ /$   /$ /$   /$  /$$$ 
| $$ | $| $_____/| $  / $| $  | $ /$__  $
| $$| $| $      |  $/ $/| $  | $| $  \__/
| $ $ $| $$$    \  $$/ | $  | $|  $$$ 
| $  $$| $__/     >$  $ | $  | $ \____  $
| $\  $$| $       /$/\  $| $  | $ /$  \ $
| $ \  $| $$$$| $  \ $|  $$$/|  $$$/
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

## ✨ Freemium Model

Nexus will operate on a freemium model, designed to provide powerful core tools for free, with advanced features available for premium users.

*   **✅ Free Plan:** Perfect for individual use. Includes the full infinite canvas, all drawing and content tools (text cards, image cards, connectors, etc.), and is limited by the number of items per board.
*   **🚀 Premium Plan:** Unlocks the full collaborative and professional potential. Includes unlimited items per board, real-time collaboration, high-resolution exports, priority support, and all future AI-powered features.

## 🗺️ Roadmap

### ✅ Core Features (Implemented)

*   **🔐 User Authentication:** Secure login and registration pages.
*   **無限 Infinite Canvas:** A pannable, zoomable, and interactive canvas.
*   **🎨 Element Manipulation & Customization:** Full control over elements like shapes, text, and images.
*   **✏️ Rich Content & Drawing Tools:** Includes Text Cards, Image Cards, freehand drawing, and an eraser.
*   **💾 Local Persistence:** Work is saved automatically to local storage.
*   **↩️ Undo/Redo:** Robust history management.
*   **⭐ Favorites System:** Pin your most important canvases for quick access.

### 🚀 Upcoming Features & Pages

The next phase of development focuses on building out the public-facing SaaS website and adding premium features.

*   **🌐 Public Website:**
    *   **Landing Page:** A beautiful marketing page to attract new users.
    *   **Pricing Page:** A clear breakdown of the Free vs. Premium plans.
    *   **Features Page:** A detailed showcase of all Nexus capabilities.
*   **⚙️ App Functionality:**
    *   **Forgot Password Flow:** Enabling users to reset their passwords.
    *   **Connectors & Arrows:** Adding advanced drawing tools for diagramming.
*   **☁️ Premium Backend Features:**
    *   **Cloud Persistence:** Saving boards to a central database.
    *   **Real-time Collaboration:** Multi-user editing, cursors, and presence.
    *   **High-Quality Exports:** Exporting boards to PNG/JPG without watermarks.

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

