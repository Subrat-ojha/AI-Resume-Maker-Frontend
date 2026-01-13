import { motion } from 'framer-motion'

const Card = ({
    children,
    className = '',
    bgColor = 'bg-white',
    hover = true,
    glass = false,
    ...props
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] // Custom quintic ease-out
            }}
            whileHover={hover ? {
                y: -8,
                transition: { duration: 0.3 }
            } : {}}
            className={`rounded-3xl p-8 md:p-10 transition-shadow duration-500 ${glass ? 'glassmorphism' : bgColor} ${hover ? 'hover:shadow-2xl hover:shadow-black/5' : ''} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export default Card
