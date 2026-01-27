import { ContainerScroll } from '../components/ui/container-scroll-animation'
import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Zap, Shield, Award, Play, TrendingUp, Users, Star, CheckCircle2, ArrowRight } from 'lucide-react'
import Button from '../components/ui/animated-button'
import Card from '../components/ui/animated-card'
import resumeImage from '../assets/resume-example.png'

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

                            {/* Statistics Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="flex flex-wrap gap-6 md:gap-12 justify-center items-center mb-8 text-[var(--foreground)]/70"
                            >
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-500" />
                                    <span className="font-semibold text-[var(--foreground)]">10,000+</span>
                                    <span className="text-sm">Resumes Created</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-[#00ff88]" />
                                    <span className="font-semibold text-[var(--foreground)]">95%</span>
                                    <span className="text-sm">Interview Rate</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="font-semibold text-[var(--foreground)]">4.9</span>
                                    <span className="text-sm">Rating</span>
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="flex flex-col items-center gap-4 mb-6"
                            >
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/create">
                                        <Button variant="primary" size="lg" className="shadow-2xl">
                                            Get Started Free
                                        </Button>
                                    </Link>
                                    <Button variant="secondary" size="lg" className="gap-2">
                                        <Play className="w-4 h-4" />
                                        View Examples
                                    </Button>
                                </div>
                                <p className="text-sm text-[var(--foreground)]/50 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    No credit card required • Free forever
                                </p>
                            </motion.div>
                        </>
                    }
                >
                    <div className="w-full h-full bg-[#1a1a1a] rounded-2xl flex items-center justify-center p-8 relative overflow-hidden group">
                        {/* Mock Resume UI inside the card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-[#00ff88]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <img
                            src={resumeImage}
                            alt="AI Generated Resume Example"
                            className="w-full h-full object-contain rounded-lg shadow-2xl"
                        />

                        {/* <div className="absolute bottom-10 flex gap-4">
                            <Link to="/create">
                                <Button variant="primary" size="lg" className="shadow-xl">
                                    Create Resume
                                </Button>
                            </Link>
                        </div> */}
                    </div>
                </ContainerScroll>
            </section>

            {/* Statistics Section */}
            <section className="section-padding bg-[var(--background)] border-y border-[var(--border)] transition-colors duration-500">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { number: '10,000+', label: 'Resumes Created', bgColor: 'bg-pastel-purple' },
                            { number: '95%', label: 'Interview Success', bgColor: 'bg-pastel-peach' },
                            { number: '4.9★', label: 'User Rating', bgColor: 'bg-pastel-sage' },
                            { number: '< 5min', label: 'Average Time', bgColor: 'bg-pastel-purple' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className={`inline-block px-6 py-3 rounded-2xl ${stat.bgColor} mb-4`}>
                                    <div className="text-4xl md:text-5xl font-black text-black">{stat.number}</div>
                                </div>
                                <div className="text-lg text-[var(--foreground)]/70 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
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
                                    <Card glass className="h-full flex flex-col">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${feature.bgColor} transition-transform duration-500 hover:rotate-12 relative group-hover:shadow-lg`}>
                                            <Icon className="w-6 h-6 text-black" strokeWidth={1.5} />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{feature.title}</h3>
                                        <p className="text-black/60 dark:text-white/70 leading-relaxed mb-6 flex-grow">{feature.description}</p>
                                        <a href="#" className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:gap-2 transition-all">
                                            Learn more <ArrowRight className="w-4 h-4" />
                                        </a>
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
                                    <div>
                                        <div className="flex gap-1 mb-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            ))}
                                        </div>
                                        <p className="text-lg text-black/80 dark:text-white/80 mb-8 leading-relaxed italic">
                                            "{testimonial.quote}"
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-[#00ff88] flex items-center justify-center font-bold text-white shadow-lg">
                                            {testimonial.author[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-black text-sm dark:text-white">{testimonial.author}</div>
                                            <div className="mono-uppercase text-[10px] text-black/40 dark:text-white/40 mt-0.5 tracking-wider">
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
            <section id="pricing" className="section-padding relative overflow-hidden bg-gradient-to-br from-purple-50 to-[#00ff88]/10 dark:from-purple-950/20 dark:to-[#00ff88]/5">
                <div className="absolute inset-0 bg-[var(--foreground)] opacity-5 dark:opacity-10" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="text-left">
                                <h2 className="text-[var(--foreground)] mb-6">Ready to Build Your Resume?</h2>
                                <p className="text-xl text-[var(--foreground)]/70 mb-8 leading-relaxed">
                                    Join thousands of successful job seekers. Start creating your professional resume today.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {[
                                        'AI-powered content generation',
                                        'ATS-optimized templates',
                                        'Instant download & editing',
                                        'Free forever, no credit card'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[var(--foreground)]/80">
                                            <CheckCircle2 className="w-5 h-5 text-[#00ff88] flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/create">
                                        <Button variant="primary" size="lg" className="shadow-2xl">
                                            Get Started Now
                                        </Button>
                                    </Link>
                                    <Link to="#features">
                                        <Button variant="secondary" size="lg">
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-[#00ff88]/20 blur-3xl" />
                                <Card glass className="relative">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-[var(--foreground)]">Free Plan</span>
                                            <span className="text-sm px-3 py-1 rounded-full bg-[#00ff88] text-black font-semibold">Popular</span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-black text-[var(--foreground)]">$0</span>
                                            <span className="text-[var(--foreground)]/60">/forever</span>
                                        </div>
                                        <div className="pt-6 space-y-3">
                                            {[
                                                'Unlimited resumes',
                                                'AI content generation',
                                                'All templates',
                                                'PDF & DOCX export',
                                                'ATS optimization'
                                            ].map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-black/70 dark:text-white/70">
                                                    <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                                                    <span className="text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Landing
