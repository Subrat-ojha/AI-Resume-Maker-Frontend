import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const PromptInput = () => {
    const navigate = useNavigate()
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const examplePrompts = [
        'Software engineer with 5 years of experience in React and Node.js, seeking senior position.',
        'Recent marketing graduate with social media management and content creation experience.',
        'Project manager transitioning to product management, expertise in Agile methodologies.',
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!prompt.trim()) return

        setIsLoading(true)
        setTimeout(() => {
            navigate('/processing')
        }, 500)
    }

    const handleExampleClick = (example) => {
        setPrompt(example)
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[var(--background)] transition-colors duration-500">
            <div className="container-custom section-padding">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="mono-uppercase text-xs text-[var(--foreground)]/60 mb-4 block">Step 1</span>
                        <h1 className="mb-6 text-[var(--foreground)]">Tell Us About Yourself</h1>
                        <p className="text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto leading-relaxed">
                            Describe your experience, skills, and career goals. Our AI will transform your story into a professional resume.
                        </p>
                    </div>

                    {/* Main Form */}
                    <Card bgColor="bg-white" className="mb-10">
                        <form onSubmit={handleSubmit}>
                            <label className="mono-uppercase text-xs text-[var(--foreground)]/60 mb-4 block">
                                Your Career Story
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Example: I'm a software engineer with 5 years of experience in full-stack development. I've worked on projects using React, Node.js, and PostgreSQL..."
                                className="w-full h-64 px-6 py-4 rounded-2xl border border-[var(--border)] bg-transparent focus:ring-2 focus:ring-[var(--foreground)] focus:border-transparent resize-none transition-all text-[var(--foreground)] placeholder:text-[var(--foreground)]/40"
                                required
                            />
                            <div className="flex items-center justify-between mt-6">
                                <p className="mono-uppercase text-xs text-[var(--foreground)]/40">
                                    {prompt.length} characters
                                </p>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={!prompt.trim() || isLoading}
                                >
                                    {isLoading ? 'Processing...' : 'Generate Resume'}
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Example Prompts */}
                    <div>
                        <h3 className="mono-uppercase text-xs text-[var(--foreground)]/60 mb-6">Example Prompts</h3>
                        <div className="grid gap-4">
                            {examplePrompts.map((example, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => handleExampleClick(example)}
                                    className="text-left p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--foreground)] transition-all"
                                >
                                    <p className="text-[var(--foreground)]/70">{example}</p>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default PromptInput
