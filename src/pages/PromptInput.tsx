import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Upload, FileText, X, Briefcase, Info, Loader2, CheckCircle, Zap, AlertCircle, ArrowRight } from 'lucide-react'
import { resumeService } from '../utils/api'
import { getUsage } from '../api/resume'
import Button from '../components/ui/animated-button'

const PromptInput = () => {
    const navigate = useNavigate()
    const [jobDescription, setJobDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [processingStep, setProcessingStep] = useState(0)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const processingSteps = [
        { text: 'Analyzing your resume...', icon: FileText },
        { text: 'Understanding job requirements...', icon: Briefcase },
        { text: 'Optimizing content with AI...', icon: Zap },
        { text: 'Generating tailored resume...', icon: Sparkles },
    ]

    const exampleJobs = [
        {
            text: 'Senior React Developer with 5+ years experience, strong TypeScript skills, AWS knowledge preferred.',
            tag: 'Tech'
        },
        {
            text: 'Marketing Manager to lead digital campaigns, SEO/SEM expertise, team leadership experience required.',
            tag: 'Marketing'
        },
        {
            text: 'Product Manager for SaaS platform, Agile methodology, data-driven decision making.',
            tag: 'Product'
        },
    ]

    // ... existing imports ...

    const [usage, setUsage] = useState<{ remaining: number; isGuest: boolean } | null>(null)
    const [showLimitModal, setShowLimitModal] = useState(false)
    const [lastErrorMessage, setLastErrorMessage] = useState('')

    // New state for How It Works section
    const [activeHowStep, setActiveHowStep] = useState(0)

    const howItWorksSteps = [
        {
            title: "Upload Resume",
            desc: "Start with your existing resume to keep your history.",
            icon: Upload,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Paste Job",
            desc: "Add the job description you're applying for.",
            icon: Briefcase,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "AI Optimizes",
            desc: "Our AI tailors your resume for the specific role.",
            icon: Zap,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
        {
            title: "Download",
            desc: "Get your ATS-friendly resume instantly.",
            icon: Sparkles,
            color: "text-[#00ff88]",
            bg: "bg-[#00ff88]/10"
        }
    ]

    useEffect(() => {
        // Fetch usage limits on mount
        const fetchUsage = async () => {
            try {
                const response = await getUsage()
                setUsage({
                    remaining: response.data.remainingOptimizations,
                    isGuest: response.data.isGuest
                })
            } catch (error) {
                console.error('Failed to fetch usage:', error)
            }
        }
        fetchUsage()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!jobDescription.trim() && !selectedFile) return

        if (usage && usage.remaining <= 0) {
            setLastErrorMessage(usage.isGuest
                ? 'You have used all free guest optimizations.'
                : 'You have reached your optimization limit.')
            setShowLimitModal(true)
            return
        }

        setIsLoading(true)
        setProcessingStep(0)

        // Simulate processing steps
        const stepInterval = setInterval(() => {
            setProcessingStep(prev => {
                if (prev < processingSteps.length - 1) return prev + 1
                return prev
            })
        }, 1500)

        try {
            const result = await resumeService.generate(jobDescription, selectedFile)
            clearInterval(stepInterval)
            navigate(`/resume/${encodeURIComponent(result.id)}`)
        } catch (error: any) {
            clearInterval(stepInterval)
            console.error('Failed to generate resume:', error)

            // Handle Usage Limit Error specifically
            if (error.response?.status === 403) {
                const msg = error.response?.data?.message || 'Usage limit exceeded.'
                setLastErrorMessage(msg)
                setShowLimitModal(true)
            } else {
                const errorMsg = error.response?.data?.errors || error.response?.data?.message || 'Failed to optimize resume. Please try again.'
                alert(errorMsg)
            }
        } finally {
            setIsLoading(false)
            setProcessingStep(0)
        }
    }

    const handleExampleClick = (example: string) => {
        setJobDescription(example)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
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
        <div className="min-h-screen w-full bg-[var(--background)] transition-colors duration-500 overflow-x-hidden pt-12 pb-12 relative">

            {/* Processing Overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[var(--background)] rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl border border-[var(--border)]"
                        >
                            {/* Animated Logo */}
                            <div className="flex justify-center mb-8">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00ff88] to-emerald-500 flex items-center justify-center"
                                >
                                    <Loader2 className="w-8 h-8 text-white" />
                                </motion.div>
                            </div>

                            {/* Processing Steps */}
                            <div className="space-y-4">
                                {processingSteps.map((step, index) => {
                                    const Icon = step.icon
                                    const isActive = index === processingStep
                                    const isCompleted = index < processingStep

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${isActive
                                                ? 'bg-[#00ff88]/10 border border-[#00ff88]/30'
                                                : isCompleted
                                                    ? 'opacity-60'
                                                    : 'opacity-30'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive
                                                ? 'bg-[#00ff88] text-black'
                                                : isCompleted
                                                    ? 'bg-[#00ff88]/30 text-[#00ff88]'
                                                    : 'bg-[var(--foreground)]/10 text-[var(--foreground)]/30'
                                                }`}>
                                                {isCompleted ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : isActive ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Loader2 className="w-5 h-5" />
                                                    </motion.div>
                                                ) : (
                                                    <Icon className="w-5 h-5" />
                                                )}
                                            </div>
                                            <span className={`text-sm font-medium ${isActive
                                                ? 'text-[var(--foreground)]'
                                                : 'text-[var(--foreground)]/60'
                                                }`}>
                                                {step.text}
                                            </span>
                                        </motion.div>
                                    )
                                })}
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-8">
                                <div className="h-2 bg-[var(--foreground)]/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#00ff88] to-emerald-400"
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <p className="text-center text-xs text-[var(--foreground)]/40 mt-3">
                                    This may take up to 30 seconds...
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Usage Limit Modal */}
            <AnimatePresence>
                {showLimitModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setShowLimitModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[var(--background)] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-red-500/20 relative"
                        >
                            <button
                                onClick={() => setShowLimitModal(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-[var(--foreground)]/5 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-[var(--foreground)]/40 hover:text-[var(--foreground)]" />
                            </button>

                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                                    <AlertCircle className="w-10 h-10 text-red-500" />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-[var(--foreground)]">Limit Reached</h3>
                                    <p className="text-[var(--foreground)]/60 font-medium">
                                        {lastErrorMessage}
                                    </p>
                                </div>

                                <div className="w-full space-y-3 pt-2">
                                    {usage?.isGuest ? (
                                        <>
                                            <Button
                                                variant="primary"
                                                className="w-full justify-center py-4"
                                                onClick={() => navigate('/register')}
                                            >
                                                Create Free Account
                                            </Button>
                                            <p className="text-xs text-[var(--foreground)]/40 font-medium">
                                                Sign up to get 10 more free optimizations!
                                            </p>
                                        </>
                                    ) : (
                                        <Button
                                            variant="secondary"
                                            className="w-full justify-center py-4"
                                            onClick={() => setShowLimitModal(false)} // Placeholder for upgrade
                                        >
                                            Upgrade Plan (Coming Soon)
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN: Input Form */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4 tracking-tight">
                                Optimize Your <span className="text-[#00ff88]">Resume</span>
                            </h1>
                            <p className="text-lg text-[var(--foreground)]/60 leading-relaxed font-medium">
                                Upload your resume and paste the job description. Our AI will tailor it perfectly.
                            </p>
                        </div>

                        {/* Main Input Card */}
                        <div className="bg-[#f3fbf8] dark:bg-white/5 rounded-3xl p-6 md:p-8 shadow-xl border border-[#00ff88]/10">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* File Upload Section - First */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/50">
                                        <FileText className="w-4 h-4" />
                                        <span>Step 1: Upload Your Resume</span>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                        />
                                        {!selectedFile ? (
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-full py-8 border-2 border-dashed border-[var(--foreground)]/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[var(--foreground)]/5 hover:border-[#00ff88]/50 transition-all group"
                                            >
                                                <Upload className="w-6 h-6 text-[var(--foreground)]/40 group-hover:text-[#00ff88]" />
                                                <span className="text-sm font-bold text-[var(--foreground)]/60 group-hover:text-[var(--foreground)]">
                                                    Click to upload your resume
                                                </span>
                                                <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/30 font-bold">
                                                    PDF, DOC, DOCX • Up to 10MB
                                                </span>
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
                                </div>

                                {/* Job Description Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/50">
                                            <Briefcase className="w-4 h-4" />
                                            <span>Step 2: Paste Job Description</span>
                                        </div>
                                        <span className="text-xs font-mono text-[var(--foreground)]/30">{jobDescription.length} chars</span>
                                    </div>
                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        placeholder="Paste the job description here. Include responsibilities, requirements, and any specific skills mentioned..."
                                        className="w-full h-40 p-4 rounded-xl bg-white dark:bg-black/20 border border-[var(--border)] focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88] outline-none transition-all resize-none text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-base leading-relaxed"
                                        required={!selectedFile}
                                    />
                                </div>

                                {/* Generate Button with Usage Indicator */}
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        disabled={(!jobDescription.trim() && !selectedFile) || isLoading || (usage?.remaining === 0)}
                                        className="w-full py-5 rounded-xl bg-[#4a4a4a] dark:bg-[#333] hover:bg-black dark:hover:bg-white dark:hover:text-black text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <Sparkles className="w-4 h-4 text-[#00ff88] group-hover:animate-pulse" />
                                        {usage?.remaining === 0 ? 'Limit Exceeded' : 'Optimize My Resume'}
                                    </button>

                                    {usage !== null && (
                                        <div className={`flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider ${usage.remaining === 0 ? 'text-red-500' : 'text-[var(--foreground)]/40'
                                            }`}>
                                            {usage.remaining === 0 ? (
                                                <>
                                                    <AlertCircle className="w-3 h-3" />
                                                    <span>No free uses remaining</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Zap className="w-3 h-3 text-[#00ff88]" />
                                                    <span>{usage.remaining} free optimizations {usage.isGuest ? '(Guest)' : 'remaining'}</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Example Job Descriptions */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--foreground)]/40 flex items-center gap-2">
                                <Info className="w-3 h-3" />
                                Example Job Descriptions
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {exampleJobs.map((example, index) => (
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
                            {/* Badge */}
                            <motion.div
                                animate={{ rotate: [-15, -10, -15] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -left-6 top-20 z-20 bg-[#00ff88] text-black font-black text-sm px-3 py-1.5 shadow-lg transform -rotate-12"
                            >
                                AI-POWERED
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
                                        <h2 className="text-2xl font-bold text-gray-900 leading-none mb-1">Your Name</h2>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00ff88]">Optimized for Your Target Role</p>
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


            {/* How It Works Section */}
            <section id="how-it-works" className="mt-20 pt-16 border-t border-[var(--border)] relative bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="mono-uppercase text-xs text-[var(--foreground)]/60 mb-4 block tracking-widest">Process</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-6">How It Works</h2>
                        <p className="text-lg text-[var(--foreground)]/60">
                            Create your professional resume in four simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[var(--foreground)]/10 -translate-y-1/2 z-0" />

                        {howItWorksSteps.map((step, index) => {
                            const Icon = step.icon
                            const isActive = activeHowStep === index

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative z-10 group"
                                    onMouseEnter={() => setActiveHowStep(index)}
                                >
                                    <div className={`
                                        h-full p-6 rounded-2xl border transition-all duration-300
                                        ${isActive
                                            ? 'bg-[var(--background)] border-[#00ff88]/30 shadow-xl scale-105'
                                            : 'bg-[var(--background)]/50 border-transparent hover:border-[var(--foreground)]/10 hover:bg-[var(--background)]'
                                        }
                                    `}>
                                        <div className={`
                                            w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-xl transition-all duration-300
                                            ${isActive ? `${step.bg} ${step.color} scale-110 rotate-3` : 'bg-[var(--foreground)]/5 text-[var(--foreground)]/40'}
                                        `}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <h3 className={`text-xl font-bold mb-3 transition-colors ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/70'}`}>
                                            {step.title}
                                        </h3>

                                        <p className="text-sm text-[var(--foreground)]/60 leading-relaxed">
                                            {step.desc}
                                        </p>

                                        {/* Step Indicator */}
                                        <div className={`
                                            absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors
                                            ${isActive ? 'bg-[#00ff88] text-black' : 'bg-[var(--foreground)]/10 text-[var(--foreground)]/40'}
                                        `}>
                                            Step 0{index + 1}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className="mt-16 text-center">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--foreground)]/60 hover:text-[#00ff88] transition-colors group"
                        >
                            <span>Start Building Now</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PromptInput
