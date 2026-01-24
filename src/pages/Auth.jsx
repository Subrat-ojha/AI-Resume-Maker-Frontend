import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, ChevronDown, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Auth = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, register } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState(location.pathname === '/login' ? 'signin' : 'signup')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    })

    // Sync tab with URL
    useEffect(() => {
        setActiveTab(location.pathname === '/login' ? 'signin' : 'signup')
    }, [location.pathname])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (activeTab === 'signin') {
                await login(formData.email, formData.password)
                navigate('/dashboard')
            } else {
                await register(formData)
                setActiveTab('signin')
                alert('Account created successfully! Please sign in.')
            }
        } catch (error) {
            console.error('Auth error:', error)
            alert(error.response?.data?.message || 'Authentication failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const switchTab = (tab) => {
        setActiveTab(tab)
    }

    const inputStyles = "w-full px-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder-[rgba(255,255,255,0.3)] outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors"

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
            style={{ background: '#0a0a0a' }}
        >
            {/* Background Gradient Blurs */}
            <div
                className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255, 100, 50, 0.4) 0%, rgba(255, 0, 100, 0.3) 30%, rgba(100, 0, 200, 0.2) 60%, transparent 80%)',
                    filter: 'blur(80px)',
                    transform: 'translate(30%, 30%)'
                }}
            />
            <div
                className="absolute bottom-20 right-40 w-[300px] h-[300px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255, 200, 100, 0.5) 0%, transparent 70%)',
                    filter: 'blur(60px)'
                }}
            />

            {/* Modal Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[420px] rounded-3xl p-8"
                style={{
                    background: 'rgba(20, 20, 25, 0.85)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.2)] transition-colors"
                >
                    <X className="w-4 h-4 text-[rgba(255,255,255,0.6)]" />
                </button>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-[rgba(255,255,255,0.05)] rounded-full p-1">
                        <button
                            onClick={() => switchTab('signup')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'signup'
                                ? 'bg-[rgba(255,255,255,0.1)] text-white'
                                : 'text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.7)]'
                                }`}
                        >
                            Sign up
                        </button>
                        <button
                            onClick={() => switchTab('signin')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'signin'
                                ? 'bg-[rgba(255,255,255,0.1)] text-white'
                                : 'text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.7)]'
                                }`}
                        >
                            Sign in
                        </button>
                    </div>
                </div>

                {/* Animated Form Container */}
                <AnimatePresence mode="wait">
                    {activeTab === 'signup' ? (
                        <motion.div
                            key="signup"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            {/* Header */}
                            <h1 className="text-white text-2xl font-semibold mb-6 text-center">
                                Create an account
                            </h1>

                            {/* Sign Up Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Fields - Side by Side */}
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="John"
                                        className={inputStyles}
                                        style={{ background: 'rgba(255,255,255,0.05)' }}
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Last name"
                                        className={inputStyles}
                                        style={{ background: 'rgba(255,255,255,0.05)' }}
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(255,255,255,0.3)]" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className={`${inputStyles} pl-12`}
                                        style={{ background: 'rgba(255,255,255,0.05)' }}
                                    />
                                </div>

                                {/* Phone Field with Country Code */}
                                <div
                                    className="flex items-center rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] focus-within:border-[rgba(255,255,255,0.3)] transition-colors"
                                    style={{ background: 'rgba(255,255,255,0.05)' }}
                                >
                                    <button
                                        type="button"
                                        className="flex items-center gap-1 px-4 py-3.5 border-r border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-colors text-[rgba(255,255,255,0.7)] shrink-0"
                                    >
                                        <span>US</span>
                                        <ChevronDown className="w-4 h-4 text-[rgba(255,255,255,0.4)]" />
                                    </button>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="(775) 351-6501"
                                        className="flex-1 px-4 py-3.5 bg-transparent text-white placeholder-[rgba(255,255,255,0.3)] outline-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    disabled={isLoading}
                                    className="w-full py-4 rounded-xl font-semibold text-black bg-white hover:bg-[rgba(255,255,255,0.9)] transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Creating account...' : 'Create an account'}
                                </motion.button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="signin"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            {/* Header */}
                            <h1 className="text-white text-2xl font-semibold mb-6 text-center">
                                Welcome back
                            </h1>

                            {/* Sign In Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email Field */}
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(255,255,255,0.3)]" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className={`${inputStyles} pl-12`}
                                        style={{ background: 'rgba(255,255,255,0.05)' }}
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(255,255,255,0.3)]" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className={`${inputStyles} pl-12`}
                                        style={{ background: 'rgba(255,255,255,0.05)' }}
                                    />
                                </div>

                                {/* Forgot Password */}
                                <div className="text-right">
                                    <Link to="/forgot-password" className="text-[rgba(255,255,255,0.4)] text-sm hover:text-[rgba(255,255,255,0.6)] transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    disabled={isLoading}
                                    className="w-full py-4 rounded-xl font-semibold text-black bg-white hover:bg-[rgba(255,255,255,0.9)] transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Signing in...' : 'Sign in'}
                                </motion.button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]"></div>
                    <span className="text-[rgba(255,255,255,0.3)] text-xs uppercase tracking-wider">Or sign in with</span>
                    <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center py-3.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    </button>
                    <button className="flex items-center justify-center py-3.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                    </button>
                </div>

                {/* Terms */}
                <p className="text-center text-[rgba(255,255,255,0.3)] text-sm mt-6">
                    {activeTab === 'signup' ? (
                        <>
                            By creating an account, you agree to our{' '}
                            <Link to="/terms" className="text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.7)] transition-colors">
                                Terms & Service
                            </Link>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <button
                                onClick={() => switchTab('signup')}
                                className="text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.7)] transition-colors"
                            >
                                Create one
                            </button>
                        </>
                    )}
                </p>
            </motion.div>
        </div>
    )
}

export default Auth
