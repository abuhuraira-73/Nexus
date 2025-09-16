import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AppLayout from './pages'; // This is the main app layout with sidebar etc.
import HeroSection from './pages/home'; // This is the logged-in homepage
import InfiniteCanvasPage from './pages/infinite-canvas';
import LandingPage from './pages/landing'; // This is the public landing page
import FeaturesPage from './pages/features';
import PricingPage from './pages/pricing'; // Import the new pricing page
import ForgotPasswordPage from './pages/forgot-password';

// Mock authentication state
const isAuthenticated = false; // Set to `true` to simulate a logged-in user

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Facing Routes */}
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/app" />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/app" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/app" />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Application Routes */}
        {/* All routes here are wrapped by AppLayout */}
        <Route path="/app" element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />} >
          <Route index element={<HeroSection />} />
          <Route path="canvas" element={<InfiniteCanvasPage />} />
        </Route>

        {/* Catch-all route to redirect */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/app" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;