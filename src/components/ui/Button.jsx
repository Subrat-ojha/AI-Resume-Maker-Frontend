import { motion } from 'framer-motion'

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-mono uppercase tracking-wider rounded-full transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shine-effect'

    const variants = {
        primary: 'text-[var(--primary-foreground)] bg-[var(--primary)] hover:opacity-90 focus:ring-gray-500 shadow-lg hover:shadow-[var(--foreground)]/10',
        secondary: 'text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] focus:ring-[var(--foreground)]',
        ghost: 'text-[var(--foreground)] hover:bg-[var(--foreground)]/5 focus:ring-gray-500',
    }

    const sizes = {
        sm: 'px-6 py-2.5 text-xs',
        md: 'px-8 py-4 text-sm',
        lg: 'px-10 py-5 text-sm',
    }

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05, y: -2 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export default Button
