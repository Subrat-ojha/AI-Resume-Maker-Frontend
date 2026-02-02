import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/animated-button'
import ThemeToggle from '../ui/ThemeToggle'
import { useAuth } from '../../contexts/AuthContext'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const dropdownRef = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const isLandingPage = location.pathname === '/'

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProfileDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const navigation = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Pricing', href: '/pricing' }
    ]

    const handleLogout = () => {
        logout()
        setProfileDropdownOpen(false)
        navigate('/')
    }

    // Get user initials for avatar
    const getInitials = (name?: string) => {
        if (!name) return 'U'
        const parts = name.split(' ')
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        }
        return name.substring(0, 2).toUpperCase()
    }

    return (
        <nav className="glassmorphism border-b border-gray-200 sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 rounded-full bg-[var(--foreground)] flex items-center justify-center transition-colors duration-500">
                            <span className="text-[var(--background)] font-mono font-bold text-lg">RX</span>
                        </div>
                        <span className="text-xl font-bold mono text-sm text-[var(--foreground)]">ResumeXpert</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navigation.map((item) => (
                            item.href.startsWith('/') ? (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="mono-uppercase text-xs text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                isLandingPage ? (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="mono-uppercase text-xs text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={item.name}
                                        to={`/${item.href}`}
                                        className="mono-uppercase text-xs text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />

                        {user ? (
                            // Logged in state
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[var(--foreground)]/5 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">{getInitials(user.name)}</span>
                                    </div>
                                    <span className="text-sm font-medium text-[var(--foreground)]">{user.name}</span>
                                    <ChevronDown className={`w-4 h-4 text-[var(--foreground)]/60 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {profileDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-2 w-56 rounded-xl bg-[var(--background)] border border-[var(--border)] shadow-xl overflow-hidden"
                                        >
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-[var(--border)]">
                                                <p className="text-sm font-medium text-[var(--foreground)]">{user.name}</p>
                                                <p className="text-xs text-[var(--foreground)]/60 truncate">{user.email}</p>
                                                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-emerald-500/10 text-emerald-500 rounded-full">
                                                    {user.subscriptionPlan || 'Basic'}
                                                </span>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                <Link
                                                    to="/dashboard"
                                                    onClick={() => setProfileDropdownOpen(false)}
                                                    className="flex items-center space-x-3 px-4 py-2.5 text-sm text-[var(--foreground)]/80 hover:bg-[var(--foreground)]/5 transition-colors"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    <span>Dashboard</span>
                                                </Link>
                                                <Link
                                                    to="/create"
                                                    onClick={() => setProfileDropdownOpen(false)}
                                                    className="flex items-center space-x-3 px-4 py-2.5 text-sm text-[var(--foreground)]/80 hover:bg-[var(--foreground)]/5 transition-colors"
                                                >
                                                    <User className="w-4 h-4" />
                                                    <span>Create Resume</span>
                                                </Link>
                                            </div>

                                            {/* Logout */}
                                            <div className="border-t border-[var(--border)] py-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center space-x-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/5 w-full transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Sign out</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            // Logged out state
                            <>
                                <Link to="/login" className="text-sm font-medium text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors">
                                    Login
                                </Link>
                                <Link to="/create">
                                    <Button variant="primary" size="sm">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-[var(--foreground)]/5 transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-[var(--foreground)]" />
                            ) : (
                                <Menu className="w-6 h-6 text-[var(--foreground)]" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-[var(--border)] bg-[var(--background)]"
                    >
                        <div className="container-custom py-6 space-y-4">
                            {navigation.map((item) => (
                                item.href.startsWith('/') ? (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="block px-4 py-3 mono-uppercase text-xs text-[var(--foreground)] hover:bg-[var(--foreground)]/5 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    isLandingPage ? (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="block px-4 py-3 mono-uppercase text-xs text-[var(--foreground)] hover:bg-[var(--foreground)]/5 rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            to={`/${item.href}`}
                                            className="block px-4 py-3 mono-uppercase text-xs text-[var(--foreground)] hover:bg-[var(--foreground)]/5 rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                )
                            ))}

                            {user ? (
                                // Logged in mobile menu
                                <div className="pt-4 space-y-3 border-t border-[var(--border)]">
                                    <div className="flex items-center space-x-3 px-4 py-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">{getInitials(user.name)}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[var(--foreground)]">{user.name}</p>
                                            <p className="text-xs text-[var(--foreground)]/60">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link to="/dashboard" className="block" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="secondary" size="sm" className="w-full">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Link to="/create" className="block" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="primary" size="sm" className="w-full">
                                            Create Resume
                                        </Button>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout()
                                            setMobileMenuOpen(false)
                                        }}
                                        className="w-full px-4 py-3 text-sm text-red-500 hover:bg-red-500/5 rounded-lg transition-colors text-left"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                // Logged out mobile menu
                                <div className="pt-4 space-y-3">
                                    <Link to="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="secondary" size="sm" className="w-full">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/create" className="block" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="primary" size="sm" className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
