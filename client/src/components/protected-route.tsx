import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  // If the auth store is still loading (e.g., checking localStorage),
  // you might want to render a loading spinner or null
  if (isLoading) {
    return <div>Loading authentication...</div>; // Or a proper spinner component
  }

  if (!isAuthenticated) {
    // User is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the children (the protected component)
  return <>{children}</>;
};

export default ProtectedRoute;
