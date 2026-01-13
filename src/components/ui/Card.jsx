import { motion } from 'framer-motion'

const Card = ({
    children,
    className = '',
    bgColor = 'bg-white',
    hover = true,
    ...props
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={hover ? { y: -4 } : {}}
            className={`rounded-3xl p-8 md:p-10 transition-all duration-300 ${bgColor} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export default Card
