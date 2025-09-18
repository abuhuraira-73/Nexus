# Deployment Guide

This guide provides instructions for deploying the Nexus application to production environments.

## Prerequisites
- A GitHub repository for your Nexus project.
- Accounts with the chosen hosting providers (e.g., Vercel for frontend, Render for backend, MongoDB Atlas for database).

## 1. Database Setup (MongoDB Atlas)
1.  Ensure your MongoDB Atlas cluster is set up and accessible.
2.  Create a dedicated database user with strong credentials for your production environment.
3.  Configure Network Access to allow connections from your hosting provider's IP addresses (or `0.0.0.0/0` for simplicity, but less secure).
4.  Obtain your production `MONGO_URI` connection string.

## 2. Backend Deployment (e.g., Render)
1.  **Create a new Web Service on Render.**
2.  **Connect your GitHub repository.**
3.  **Build Command:** `npm install`
4.  **Start Command:** `node index.js`
5.  **Environment Variables:** Configure the following environment variables in Render:
    - `PORT`: (e.g., `10000` or any port Render assigns)
    - `MONGO_URI`: Your production MongoDB Atlas connection string.
    - `JWT_SECRET`: A strong, randomly generated secret key for JWTs.
    - `CLIENT_URL`: The URL of your deployed frontend (e.g., `https://your-nexus-frontend.vercel.app`).
6.  **Deploy.**

## 3. Frontend Deployment (e.g., Vercel)
1.  **Create a new Project on Vercel.**
2.  **Connect your GitHub repository.**
3.  **Framework Preset:** React
4.  **Build Command:** `npm run build`
5.  **Output Directory:** `dist`
6.  **Environment Variables:** Configure the following environment variables in Vercel:
    - `VITE_API_URL`: The URL of your deployed backend service (e.g., `https://your-nexus-backend.onrender.com`).
7.  **Deploy.**

## 4. Continuous Deployment (Optional)
- Configure webhooks in your hosting providers to automatically redeploy on new pushes to your main branch.

## 5. Monitoring & Logging (Planned)
- Integrate monitoring tools (e.g., Sentry, Datadog) for error tracking and performance.
- Set up centralized logging.
