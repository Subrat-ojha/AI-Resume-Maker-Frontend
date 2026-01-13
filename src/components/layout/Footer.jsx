import { Link } from 'react-router-dom'
import { Twitter, Linkedin, Github } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        product: [
            { name: 'Features', href: '#features' },
            { name: 'Pricing', href: '#pricing' },
            { name: 'Templates', href: '/dashboard' },
        ],
        company: [
            { name: 'About', href: '#about' },
            { name: 'Blog', href: '#blog' },
            { name: 'Contact', href: '#contact' },
        ],
        legal: [
            { name: 'Privacy', href: '#privacy' },
            { name: 'Terms', href: '#terms' },
        ],
    }

    const socialLinks = [
        { name: 'Twitter', icon: Twitter, href: '#' },
        { name: 'LinkedIn', icon: Linkedin, href: '#' },
        { name: 'GitHub', icon: Github, href: '#' },
    ]

    return (
        <footer className="bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-500">
            <div className="container-custom py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[var(--foreground)] flex items-center justify-center transition-colors duration-500">
                                <span className="text-[var(--background)] font-mono font-bold text-lg">AR</span>
                            </div>
                            <span className="text-xl font-bold mono-uppercase text-sm text-[var(--foreground)]">AI Resume</span>
                        </Link>
                        <p className="text-[var(--foreground)]/70 mb-6 max-w-sm leading-relaxed">
                            Create professional resumes with AI-powered assistance in minutes.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="mono-uppercase text-xs font-semibold text-[var(--foreground)] mb-4">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="mono-uppercase text-xs font-semibold text-[var(--foreground)] mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="mono-uppercase text-xs font-semibold text-[var(--foreground)] mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[var(--border)]">
                    <p className="text-center text-[var(--foreground)]/60 text-sm">
                        © {currentYear} AI Resume. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
