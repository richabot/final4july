import React from 'react';
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Auth;