import { ContainerScroll } from '../components/ui/container-scroll-animation'
import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Zap, Shield, Award } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Landing = () => {
    // ... existing constants ...

    // Title rotation logic
    const [titleNumber, setTitleNumber] = useState(0)
    const titles = useMemo(() => ["in Minutes", "Instantly", "Smartly", "Professionally"], [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0)
            } else {
                setTitleNumber(titleNumber + 1)
            }
        }, 2000)
        return () => clearTimeout(timeoutId)
    }, [titleNumber, titles])

    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered Generation',
            description: 'Transform your experience into professional resume content using advanced AI technology.',
            bgColor: 'bg-pastel-purple',
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Create polished resumes in minutes. Our AI handles formatting and optimization.',
            bgColor: 'bg-pastel-peach',
        },
        {
            icon: Shield,
            title: 'ATS-Optimized',
            description: 'Resumes designed to pass Applicant Tracking Systems and reach recruiters.',
            bgColor: 'bg-pastel-sage',
        },
        {
            icon: Award,
            title: 'Professional Quality',
            description: 'Expert-designed templates that make a lasting first impression.',
            bgColor: 'bg-pastel-purple',
        },
    ]

    const steps = [
        {
            number: '01',
            title: 'Share Your Story',
            description: 'Tell us about your experience, skills, and career goals.',
            bgColor: 'bg-pastel-peach',
        },
        {
            number: '02',
            title: 'AI Creates Content',
            description: 'Our AI generates professional, compelling resume content.',
            bgColor: 'bg-pastel-sage',
        },
        {
            number: '03',
            title: 'Download & Apply',
            description: 'Review, customize, and download your resume instantly.',
            bgColor: 'bg-pastel-purple',
        },
    ]

    const testimonials = [
        {
            quote: 'This tool helped me land my dream job. The AI content was perfect.',
            author: 'Sarah Johnson',
            role: 'Software Engineer',
        },
        {
            quote: 'From blank page to professional resume in 10 minutes. Incredible!',
            author: 'Michael Chen',
            role: 'Product Manager',
        },
        {
            quote: 'The ATS optimization made a huge difference in my job search.',
            author: 'Emily Rodriguez',
            role: 'Marketing Director',
        },
    ]

    return (
        <div className="overflow-hidden selection:bg-black selection:text-white">
            {/* Hero Section */}
            <section className="min-h-screen bg-[var(--background)] relative overflow-hidden flex flex-col items-center">
                <ContainerScroll
                    titleComponent={
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight">
                                    Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-[#00ff88]">AI Resume Building</span>
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="inline-block mb-4"
                            >
                                <motion.p
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-lg md:text-xl font-medium text-[var(--foreground)]/60 mb-6 tracking-wide"
                                >
                                    Unlock Your Full Career Potential
                                </motion.p>
                                <span className="mono-uppercase text-[10px] px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-full tracking-[0.2em] transition-colors duration-500">
                                    AI-Powered Resume Builder
                                </span>
                            </motion.div>
                            <div className="mb-6">
                                <h1 className="text-5xl md:text-8xl font-black text-[var(--foreground)] tracking-tighter flex flex-col items-center">
                                    <span>Build Your Resume</span>
                                    <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 min-h-[1.2em]">
                                        &nbsp;
                                        {["in Minutes", "Instantly", "Smartly", "Professionally"].map((title, index) => (
                                            <motion.span
                                                key={index}
                                                className="absolute font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-[#00ff88]"
                                                initial={{ opacity: 0, y: "100%" }}
                                                transition={{ type: "spring", stiffness: 50 }}
                                                animate={
                                                    titleNumber === index
                                                        ? {
                                                            y: 0,
                                                            opacity: 1,
                                                        }
                                                        : {
                                                            y: titleNumber > index ? "-150%" : "150%",
                                                            opacity: 0,
                                                        }
                                                }
                                            >
                                                {title}
                                            </motion.span>
                                        ))}
                                    </span>
                                </h1>
                            </div>
                        </>
                    }
                >
                    <div className="w-full h-full bg-[#1a1a1a] rounded-2xl flex items-center justify-center p-8 relative overflow-hidden group">
                        {/* Mock Resume UI inside the card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-[#00ff88]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex aspect-[1.4/1]">
                            {/* Simple Resume Visual */}
                            <div className="w-1/3 bg-gray-900 p-8 flex flex-col gap-6">
                                <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-[#00ff88] mx-auto" />
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-white/10 rounded" />
                                    <div className="h-2 w-2/3 bg-white/10 rounded" />
                                    <div className="h-2 w-3/4 bg-white/10 rounded" />
                                </div>
                            </div>
                            <div className="flex-1 p-8 space-y-6">
                                <div className="h-8 w-1/2 bg-gray-200 rounded" />
                                <div className="space-y-4">
                                    <div className="h-4 w-full bg-gray-100 rounded" />
                                    <div className="h-4 w-full bg-gray-100 rounded" />
                                    <div className="h-4 w-3/4 bg-gray-100 rounded" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-10 flex gap-4">
                            <Link to="/create">
                                <Button variant="primary" size="lg" className="shadow-xl">
                                    Get Started Free
                                </Button>
                            </Link>
                        </div>
                    </div>
                </ContainerScroll>
            </section>

            {/* Features Section */}
            <section id="features" className="section-padding bg-[var(--background)] transition-colors duration-500">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="mono-uppercase text-xs text-[var(--foreground)]/60 mb-4 block">Features</span>
                        <h2 className="mb-6 text-[var(--foreground)]">Why Choose AI Resume?</h2>
                        <p className="text-xl text-[var(--foreground)]/70">
                            Powerful features designed to help you stand out
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                                >
                                    <Card glass className="h-full">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${feature.bgColor} transition-transform duration-500 hover:rotate-12`}>
                                            <Icon className="w-6 h-6 text-black" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-black">{feature.title}</h3>
                                        <p className="text-black/60 leading-relaxed">{feature.description}</p>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="section-padding bg-[var(--background)] border-y border-[var(--border)] transition-colors duration-500">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="mono-uppercase text-xs text-[var(--foreground)]/60 mb-4 block">Process</span>
                        <h2 className="mb-6 text-[var(--foreground)]">How It Works</h2>
                        <p className="text-xl text-[var(--foreground)]/70">
                            Three simple steps to your perfect resume
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card bgColor={step.bgColor} hover={false}>
                                    <div className="mono-uppercase text-6xl font-bold text-black/20 mb-6">
                                        {step.number}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-black">{step.title}</h3>
                                    <p className="text-black/70 leading-relaxed">{step.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="section-padding bg-[var(--background)] transition-colors duration-500">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="mono-uppercase text-xs text-[var(--foreground)]/60 mb-4 block">Testimonials</span>
                        <h2 className="mb-6 text-[var(--foreground)]">Loved by Job Seekers</h2>
                        <p className="text-xl text-[var(--foreground)]/70">
                            Join thousands who've landed their dream jobs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                            >
                                <Card glass className="h-full flex flex-col justify-between">
                                    <p className="text-lg text-black/80 mb-8 leading-relaxed italic">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center font-bold text-black/40">
                                            {testimonial.author[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-black text-sm">{testimonial.author}</div>
                                            <div className="mono-uppercase text-[10px] text-black/40 mt-0.5 tracking-wider">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="pricing" className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 bg-[var(--foreground)] opacity-5 dark:opacity-10" />
                <div className="container-custom text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-[var(--foreground)] mb-6">Ready to Build Your Resume?</h2>
                        <p className="text-xl text-[var(--foreground)]/70 mb-10 leading-relaxed">
                            Join thousands of successful job seekers. Start creating your professional resume today.
                        </p>
                        <Link to="/create">
                            <Button variant="primary" size="lg">
                                Get Started Now
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Landing
