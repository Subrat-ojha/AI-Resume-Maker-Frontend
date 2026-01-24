import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/animated-button'
import ThemeToggle from '../ui/ThemeToggle'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navigation = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Pricing', href: '#pricing' }
    ]

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
                            <a
                                key={item.name}
                                href={item.href}
                                className="mono-uppercase text-xs text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        <Link to="/login" className="text-sm font-medium text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors">
                            Login
                        </Link>
                        <Link to="/create">
                            <Button variant="primary" size="sm">
                                Get Started
                            </Button>
                        </Link>
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
                        className="md:hidden border-t border-gray-200 bg-white"
                    >
                        <div className="container-custom py-6 space-y-4">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-4 py-3 mono-uppercase text-xs text-black hover:bg-gray-50 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="pt-4">
                                <Link to="/create" className="block" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="primary" size="sm" className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
