import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Zap, Shield, Award } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Landing = () => {
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
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="section-padding bg-cream">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-5xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-8"
                        >
                            <span className="mono-uppercase text-xs px-4 py-2 bg-black text-white rounded-full">
                                AI-Powered Resume Builder
                            </span>
                        </motion.div>

                        <h1 className="mb-8 text-black">
                            Create Your Perfect Resume in Minutes
                        </h1>

                        <p className="text-xl md:text-2xl text-black/70 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Transform your career story into a compelling, ATS-optimized resume with AI. No design skills required.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/create">
                                <Button variant="primary" size="lg">
                                    Get Started Free
                                </Button>
                            </Link>
                            <Button variant="secondary" size="lg">
                                View Examples
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="mono-uppercase text-xs text-black/60 mb-4 block">Features</span>
                        <h2 className="mb-6 text-black">Why Choose AI Resume?</h2>
                        <p className="text-xl text-black/70">
                            Powerful features designed to help you stand out
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <Card key={index} bgColor={feature.bgColor} hover={false}>
                                    <div className="mb-6">
                                        <Icon className="w-8 h-8 text-black" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-black">{feature.title}</h3>
                                    <p className="text-black/70 leading-relaxed">{feature.description}</p>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="section-padding bg-pastel-peach">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="mono-uppercase text-xs text-black/60 mb-4 block">Process</span>
                        <h2 className="mb-6 text-black">How It Works</h2>
                        <p className="text-xl text-black/70">
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
            <section id="testimonials" className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="mono-uppercase text-xs text-black/60 mb-4 block">Testimonials</span>
                        <h2 className="mb-6 text-black">Loved by Job Seekers</h2>
                        <p className="text-xl text-black/70">
                            Join thousands who've landed their dream jobs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} bgColor="bg-pastel-sage" hover={false}>
                                <p className="text-lg text-black mb-6 leading-relaxed italic">
                                    "{testimonial.quote}"
                                </p>
                                <div>
                                    <div className="font-semibold text-black">{testimonial.author}</div>
                                    <div className="mono-uppercase text-xs text-black/60 mt-1">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="pricing" className="section-padding bg-pastel-purple">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-black mb-6">Ready to Build Your Resume?</h2>
                        <p className="text-xl text-black/70 mb-10 leading-relaxed">
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
