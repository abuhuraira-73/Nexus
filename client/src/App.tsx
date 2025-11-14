import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react'; // Import Suspense and React
import './App.css';
import { Toaster } from 'sonner';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import AppLayout from './pages';
import HeroSection from './pages/home';
import InfiniteCanvasPage from './pages/infinite-canvas';
// import LandingPage from './pages/landing'; // Removed direct import
// import FeaturesPage from './pages/features'; // Removed direct import
// import PricingPage from './pages/pricing'; // Removed direct import
import ForgotPasswordPage from './pages/forgot-password';
// import ContactPage from './pages/contact'; // Removed direct import
import TermsOfServicePage from './pages/terms-of-service';
import PrivacyPolicyPage from './pages/privacy-policy';
// import ComingSoonPage from './pages/coming-soon'; // Removed direct import
import LoginSuccess from './pages/LoginSuccess'; // New import
import Loader from './components/ui/loader';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/page-transition';

import { BackToTopButton } from './components/back-to-top-button';
import ProtectedRoute from './components/protected-route'; // New import
import { useAuthStore } from './store/authStore'; // New import

// Lazily load public-facing pages
const LandingPage = React.lazy(() => import('./pages/landing'));
const FeaturesPage = React.lazy(() => import('./pages/features'));
const PricingPage = React.lazy(() => import('./pages/pricing'));
const ContactPage = React.lazy(() => import('./pages/contact'));
const ComingSoonPage = React.lazy(() => import('./pages/coming-soon'));

function App() {
  const { isAuthenticated, isLoading } = useAuthStore(); // Get real auth state
  const [showLoader, setShowLoader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const location = useLocation();

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
        <Toaster position="top-center" theme="dark" />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Facing Routes */}
            {/* If authenticated, redirect away from login/register/landing */}
            <Route path="/" element={<Suspense fallback={null}>{isAuthenticated ? <Navigate to="/app" /> : <PageTransition><LandingPage /></PageTransition>}</Suspense>} />
            <Route path="/features" element={<Suspense fallback={null}><PageTransition><FeaturesPage /></PageTransition></Suspense>} />
            <Route path="/pricing" element={<Suspense fallback={null}><PageTransition><PricingPage /></PageTransition></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={null}><PageTransition><ContactPage /></PageTransition></Suspense>} />
            <Route path="/coming-soon" element={<Suspense fallback={null}><PageTransition><ComingSoonPage /></PageTransition></Suspense>} />
            <Route path="/terms" element={<PageTransition><TermsOfServicePage /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/app" /> : <PageTransition><LoginPage /></PageTransition>} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/app" /> : <PageTransition><RegisterPage /></PageTransition>} />
            <Route path="/forgot-password" element={<PageTransition><ForgotPasswordPage /></PageTransition>} />
            <Route path="/login/success/:userId" element={<PageTransition><LoginSuccess /></PageTransition>} />

            {/* Protected Application Routes */}
            {/* All routes here are wrapped by ProtectedRoute */}
            <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} >
              <Route index element={<HeroSection />} />
              <Route path="canvas/:id" element={<InfiniteCanvasPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
        <BackToTopButton />
    </div>
  );
}

// We need to wrap App in BrowserRouter
const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
