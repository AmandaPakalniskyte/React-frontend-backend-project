import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ children: Page }) => {
  const { loggedIn } = useAuth();
  const { pathname } = useLocation();

  if (!loggedIn) {
    return <Navigate to={`/auth/login?redirect=${pathname}`} />;
  }

  return Page;
};

export default RequireAuth;
