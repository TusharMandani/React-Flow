import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/AuthService'

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [serverError, setServerError] = useState(''); // For server-side errors
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear the error for the field being updated
        setErrors({ ...errors, [name]: '' });
        setServerError(''); // Clear server error
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        let tempErrors = { email: '', password: '' };

        // Email validation
        if (!formData.email) {
            tempErrors.email = 'Email is required.';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Invalid email format.';
            valid = false;
        }

        // Password validation
        if (!formData.password) {
            tempErrors.password = 'Password is required.';
            valid = false;
        } else if (formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters.';
            valid = false;
        }

        setErrors(tempErrors);

        if (valid) {
            try {
                // Call the login service
                const data = await login(formData.email, formData.password);
                console.log('Login Successful:', data);

                // Redirect to the dashboard on success
                navigate('/dashboard');
            } catch (error) {
                // Set server-side error
                setServerError(error.message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <form className="mt-6" onSubmit={handleSubmit} noValidate>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 mt-2 text-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 mt-2 text-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    {/* Server Error */}
                    {serverError && (
                        <p className="mt-2 text-sm text-red-500 text-center">{serverError}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
