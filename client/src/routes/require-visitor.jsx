import React from 'react';
import { Navigate } from 'react-router-dom';
import { authClearRedirect } from '../store/auth/auth-actions';
import useAuth from '../hooks/useAuth';

const RequireVisitor = ({ children: Page }) => {
  const { loggedIn, redirect, dispatch } = useAuth();

  if (loggedIn) {
    if (redirect) {
      dispatch(authClearRedirect);

      return <Navigate to={redirect} />;
    }

    return <Navigate to="/gallery" />;
  }

  return Page;
};

export default RequireVisitor;
