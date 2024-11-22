import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRouteForAuth component
const PrivateRouteForAuth = ({ element }) => {
  const isAuthenticated = localStorage.getItem('authToken'); 

  return isAuthenticated ? <Navigate to="/dashboard" /> : element;  
};

export default PrivateRouteForAuth;
