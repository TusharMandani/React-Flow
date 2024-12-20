import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/AuthService'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear the error for the field being updated
        setErrors({ ...errors, [name]: '' });
    };

    const validateField = (name, value) => {
        let error = '';
        if (name === 'email') {
            if (!value) {
                error = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error = 'Invalid email format.';
            }
        } else if (name === 'password') {
            if (!value) {
                error = 'Password is required.';
            } else if (value.length < 6) {
                error = 'Password must be at least 6 characters.';
            }
        }
        return error;
    };


    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
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
                toast.success(data.message)
                const token = data.token;
                localStorage.setItem('authToken', token);
                // Redirect to login after a delay
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);

            } catch (error) {
                toast.error("Login failed")
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
                            onBlur={handleBlur}
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
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 mt-2 text-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>
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
                        Don’t have an account yet?{' '}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Trouble logging in?{' '}
                        <Link
                            to="/forgotPassword"
                            className="text-blue-500 hover:underline"
                        >
                            Forgot password
                        </Link>
                    </p>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
}
