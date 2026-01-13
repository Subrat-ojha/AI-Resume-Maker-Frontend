import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Processing = () => {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    setTimeout(() => {
                        navigate('/resume/1')
                    }, 500)
                    return 100
                }
                return prev + 2
            })
        }, 100)

        return () => clearInterval(progressInterval)
    }, [navigate])

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[var(--background)] flex items-center justify-center transition-colors duration-500">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    {/* Animated Icon */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-20 h-20 mx-auto mb-12 rounded-full bg-[var(--foreground)] flex items-center justify-center transition-colors duration-500"
                    >
                        <span className="text-[var(--background)] font-mono font-bold text-2xl">AI</span>
                    </motion.div>

                    {/* Title */}
                    <h2 className="mb-6 text-[var(--foreground)]">Creating Your Resume</h2>
                    <p className="text-xl text-[var(--foreground)]/70 mb-16 leading-relaxed">
                        Our AI is crafting your professional resume. This will only take a moment...
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="w-full h-2 bg-[var(--foreground)]/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-[var(--foreground)]"
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <p className="mono-uppercase text-xs text-[var(--foreground)]/40 mt-3">{progress}% complete</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Processing
