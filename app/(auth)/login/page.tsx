'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    FiMail,
    FiLock,
    FiEye,
    FiEyeOff,
    FiArrowRight
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc"; // for Chrome/Google icon
import Input from '@/components/auth/Input';
import Button from '@/components/auth/Button';
import AuthCard from '@/components/auth/AuthCard';
import SocialButton from '@/components/auth/SocialButton';
import AuthDivider from '@/components/auth/AuthDivider';
import Checkbox from '@/components/auth/Checkbox';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        // e.preventDefault();

        // if (!validateForm()) return;

        // setIsLoading(true);

        // // Simulate API call
        // setTimeout(() => {
        //     console.log('Login attempt:', formData);
        //     setIsLoading(false);
        //     // Redirect logic would go here
        // }, 1500);
        router.push('/overview');
    };

    const handleGoogleLogin = () => {
        console.log('Google login initiated');
        // Implement Google OAuth logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <AuthCard
                title="Login"
                subtitle={
                    <>
                        Hi, Welcome back <span className="text-xl">👋</span>
                    </>
                }
            >
                {/* Google Login Button */}
                <SocialButton
                    icon={<FcGoogle className="w-5 h-5" />}
                    onClick={handleGoogleLogin}
                    className="mb-6"
                >
                    Login with Google
                </SocialButton>

                <AuthDivider text="or" />

                {/* Email Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Input
                        type="email"
                        placeholder="E.g. johndoe@email.com"
                        icon={<FiMail className="w-5 h-5" />}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                    />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mt-5">
                        Password
                    </label>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        icon={<FiLock className="w-5 h-5" />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="focus:outline-none"
                            >
                                {showPassword ? (
                                    <FiEyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <FiEye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        }
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        error={errors.password}
                    />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mt-4 mb-6">
                    <Checkbox
                        label="Remember Me"
                        checked={formData.rememberMe}
                        onChange={(checked) => setFormData({ ...formData, rememberMe: checked })}
                    />
                    <Link
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                        Forgot Password ?
                    </Link>
                </div>

                {/* Login Button */}
                <Button
                    type="submit"
                    isLoading={isLoading}
                    onClick={handleSubmit}
                    icon={<FiArrowRight className="w-5 h-5" />}
                    fullWidth
                >
                    Login
                </Button>

                {/* Sign Up Link */}
                <div className="text-center text-sm text-gray-600 mt-4">
                    Not registered yet?{' '}
                    <Link
                        href="/register"
                        className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                    >
                        Create an account
                    </Link>
                </div>
            </AuthCard>
        </div>
    );
}