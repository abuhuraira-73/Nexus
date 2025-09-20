import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Toaster } from 'sonner';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AppLayout from './pages';
import HeroSection from './pages/home';
import InfiniteCanvasPage from './pages/infinite-canvas';
import LandingPage from './pages/landing';
import FeaturesPage from './pages/features';
import PricingPage from './pages/pricing';
import ForgotPasswordPage from './pages/forgot-password';
import ContactPage from './pages/contact';
import TermsOfServicePage from './pages/terms-of-service';
import PrivacyPolicyPage from './pages/privacy-policy';
import Loader from './components/ui/loader';

import { BackToTopButton } from './components/back-to-top-button';
import ProtectedRoute from './components/protected-route'; // New import
import { useAuthStore } from './store/authStore'; // New import
import { useEffect, useState } from 'react';

function App() {
  const { isAuthenticated, isLoading } = useAuthStore(); // Get real auth state
  const [showLoader, setShowLoader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 700); // Start fading after 1 second

    const removeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 800); // Remove after fade animation (1s + 0.5s)

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Show a loading indicator while the auth state is being initialized
  if (isLoading) {
    return <Loader isFadingOut={false} />;
  }

  if (showLoader) {
    return <Loader isFadingOut={isFadingOut} />;
  }

  return (
    <div className="fade-in">
      <BrowserRouter>
        <Toaster position="top-center" theme="dark" />
        <Routes>
          {/* Public Facing Routes */}
          {/* If authenticated, redirect away from login/register/landing */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/app" /> : <LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/app" /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/app" /> : <RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Application Routes */}
          {/* All routes here are wrapped by ProtectedRoute */}
          <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} >
            <Route index element={<HeroSection />} />
            <Route path="canvas/:id" element={<InfiniteCanvasPage />} />
          </Route>

          {/* Catch-all route to redirect */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/app" : "/"} replace />} />
        </Routes>
        <BackToTopButton />
      </BrowserRouter>
    </div>
  );
}

export default App;
