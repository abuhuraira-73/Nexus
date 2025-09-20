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

import { BackToTopButton } from './components/back-to-top-button';
import ProtectedRoute from './components/protected-route'; // New import
import { useAuthStore } from './store/authStore'; // New import

function App() {
  const { isAuthenticated, isLoading } = useAuthStore(); // Get real auth state

  // Show a loading indicator while the auth state is being initialized
  if (isLoading) {
    return <div>Loading application...</div>; // Or a proper loading spinner
  }

  return (
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
  );
}

export default App;
