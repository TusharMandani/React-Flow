// src/services/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Login failed');
        } else {
            throw new Error('An error occurred. Please try again later.');
        }
    }
};
