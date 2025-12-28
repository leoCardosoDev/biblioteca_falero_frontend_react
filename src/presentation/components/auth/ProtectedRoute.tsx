import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const sessionStr = localStorage.getItem('auth_session');
  let isAuthenticated = false;

  if (sessionStr) {
    try {
      const session = JSON.parse(sessionStr);
      // Basic check: has token and it's not obviously expired (optional: deeper JWT check)
      if (session.token && session.token.accessToken) {
        isAuthenticated = true;
      }
    } catch (e) {
      console.error('Invalid session format', e);
    }
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
