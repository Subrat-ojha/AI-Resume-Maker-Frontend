import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Upload, FileText, X, MessageSquare, Info } from 'lucide-react'
import { resumeService } from '../utils/api'
import Button from '../components/ui/animated-button'
import Card from '../components/ui/animated-card'

const PromptInput = () => {
    const navigate = useNavigate()
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const fileInputRef = useRef(null)

    const examplePrompts = [
        {
            text: 'Software engineer with 5 years of experience in React and Node.js, seeking senior position.',
            tag: 'Technical'
        },
        {
            text: 'Recent marketing graduate with social media management and content creation experience.',
            tag: 'Graduate'
        },
        {
            text: 'Project manager transitioning to product management, expertise in Agile methodologies.',
            tag: 'Transition'
        },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!prompt.trim() && !selectedFile) return

        setIsLoading(true)
        try {
            const result = await resumeService.generate(prompt, selectedFile)
            navigate(`/resume/${result.id}`)
        } catch (error) {
            console.error('Failed to generate resume:', error)
            alert('Failed to generate resume. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleExampleClick = (example) => {
        setPrompt(example)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    const clearFile = () => {
        setSelectedFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="min-h-screen w-full bg-[var(--background)] transition-colors duration-500 overflow-x-hidden pt-12 pb-12">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN: Input Form */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4 tracking-tight">
                                Tell Us About <span className="text-[#00ff88]">Yourself</span>
                            </h1>
                            <p className="text-lg text-[var(--foreground)]/60 leading-relaxed font-medium">
                                Describe your experience and goals. We'll handle the rest.
                            </p>
                        </div>

                        {/* Main Input Card */}
                        <div className="bg-[#f3fbf8] dark:bg-white/5 rounded-3xl p-6 md:p-8 shadow-xl border border-[#00ff88]/10">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Textarea Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/50">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>Your Career Story</span>
                                        </div>
                                        <span className="text-xs font-mono text-[var(--foreground)]/30">{prompt.length} chars</span>
                                    </div>
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Example: I'm a software engineer with 5 years of experience..."
                                        className="w-full h-40 p-4 rounded-xl bg-white dark:bg-black/20 border border-[var(--border)] focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88] outline-none transition-all resize-none text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-base leading-relaxed"
                                        required={!selectedFile}
                                    />
                                </div>

                                {/* File Upload Section */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.txt"
                                    />
                                    {!selectedFile ? (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full py-8 border-2 border-dashed border-[var(--foreground)]/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[var(--foreground)]/5 hover:border-[#00ff88]/50 transition-all group"
                                        >
                                            <Upload className="w-5 h-5 text-[var(--foreground)]/40 group-hover:text-[#00ff88]" />
                                            <span className="text-sm font-bold text-[var(--foreground)]/60 group-hover:text-[var(--foreground)]">Upload existing resume</span>
                                            <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/30 font-bold">Optional • Up to 10MB</span>
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-between p-4 bg-[#00ff88]/10 rounded-xl border border-[#00ff88]/20">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-[#00ff88]/20 rounded-lg">
                                                    <FileText className="w-5 h-5 text-[#00ff88]" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[var(--foreground)] truncate max-w-[200px]">{selectedFile.name}</p>
                                                    <p className="text-[10px] text-[var(--foreground)]/50 font-bold uppercase tracking-wider">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={clearFile}
                                                className="p-2 hover:bg-red-500/10 text-[var(--foreground)]/40 hover:text-red-500 rounded-lg transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Generate Button */}
                                <button
                                    type="submit"
                                    disabled={(!prompt.trim() && !selectedFile) || isLoading}
                                    className="w-full py-5 rounded-xl bg-[#4a4a4a] dark:bg-[#333] hover:bg-black dark:hover:bg-white dark:hover:text-black text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {isLoading ? (
                                        'Processing...'
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 text-[#00ff88] group-hover:animate-pulse" />
                                            Generate Resume
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Quick Start Examples */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--foreground)]/40 flex items-center gap-2">
                                <Info className="w-3 h-3" />
                                Quick Start Examples
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {examplePrompts.map((example, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleExampleClick(example.text)}
                                        className="text-left p-4 rounded-xl bg-white dark:bg-white/5 border border-[var(--border)] hover:border-[#00ff88] hover:shadow-lg transition-all duration-300 group h-full flex flex-col justify-between"
                                    >
                                        <p className="text-xs text-[var(--foreground)]/60 group-hover:text-[var(--foreground)] line-clamp-3 leading-relaxed mb-3">
                                            "{example.text}"
                                        </p>
                                        <span className="text-[9px] font-black uppercase tracking-wider text-[#00ff88] opacity-0 group-hover:opacity-100 transition-opacity">
                                            Use this
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Resume Preview */}
                    <div className="hidden lg:block relative sticky top-1">
                        {/* Decorative background blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#00ff88]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

                        {/* Resume Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* "FREE" Badge */}
                            <motion.div
                                animate={{ rotate: [-15, -10, -15] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -left-6 top-20 z-20 bg-[#00ff88] text-black font-black text-sm px-3 py-1.5 shadow-lg transform -rotate-12"
                            >
                                FREE
                            </motion.div>

                            <div className="bg-white rounded-xl shadow-2xl overflow-hidden aspect-[1/1.4] w-full max-w-md mx-auto flex border border-black/5">
                                {/* Sidebar */}
                                <div className="w-1/3 bg-[#1a1a1a] p-6 text-white flex flex-col gap-8">
                                    <div className="w-20 h-20 rounded-full border-2 border-[#00ff88]/30 flex items-center justify-center bg-[#2a2a2a] mx-auto">
                                        <span className="text-2xl font-black text-[#00ff88] mb-1">RJ</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#00ff88]">Profile</div>
                                            <div className="h-1 w-full bg-white/10 rounded-full" />
                                            <div className="h-1 w-2/3 bg-white/10 rounded-full" />
                                            <div className="h-1 w-4/5 bg-white/10 rounded-full" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#00ff88] mt-4">Skills</div>
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="flex gap-2 items-center">
                                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${Math.random() * 40 + 40}%` }}
                                                            transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                                                            className="h-full bg-[#00ff88]"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="flex-1 p-8 bg-white">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 leading-none mb-1">Randall Jenkins</h2>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00ff88]">UX/UI Specialist</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">Experience</h3>
                                            {[1, 2].map(i => (
                                                <div key={i} className="space-y-1.5">
                                                    <div className="flex justify-between">
                                                        <div className="h-2 w-24 bg-gray-200 rounded" />
                                                        <div className="h-2 w-8 bg-gray-100 rounded" />
                                                    </div>
                                                    <div className="h-1.5 w-full bg-gray-100 rounded" />
                                                    <div className="h-1.5 w-3/4 bg-gray-100 rounded" />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">Education</h3>
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between">
                                                    <div className="h-2 w-32 bg-gray-200 rounded" />
                                                    <div className="h-2 w-8 bg-gray-100 rounded" />
                                                </div>
                                                <div className="h-1.5 w-2/3 bg-gray-100 rounded" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromptInput
