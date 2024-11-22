import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component that protects the dashboard route
const PrivateRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem('authToken'); // Check if the user is authenticated

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;