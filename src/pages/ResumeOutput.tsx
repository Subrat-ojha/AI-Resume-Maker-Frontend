import { motion } from 'framer-motion'
import { Download, Edit, Share2, Copy, CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const ResumeOutput = () => {
    // Mock resume data
    const resumeData = {
        name: 'John Doe',
        title: 'Senior Software Engineer',
        contact: {
            email: 'john.doe@email.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
        },
        summary: 'Experienced software engineer with 5+ years of expertise in full-stack development. Proven track record of building scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code, team collaboration, and delivering exceptional user experiences.',
        experience: [
            {
                title: 'Senior Software Engineer',
                company: 'Tech Corp',
                period: '2021 - Present',
                achievements: [
                    'Led development of microservices architecture serving 1M+ users',
                    'Reduced application load time by 40% through optimization',
                    'Mentored team of 5 junior developers',
                ],
            },
            {
                title: 'Software Engineer',
                company: 'StartupXYZ',
                period: '2019 - 2021',
                achievements: [
                    'Built responsive web applications using React and TypeScript',
                    'Implemented CI/CD pipeline reducing deployment time by 60%',
                    'Collaborated with design team to improve UX metrics by 35%',
                ],
            },
        ],
        skills: [
            'JavaScript/TypeScript',
            'React.js',
            'Node.js',
            'PostgreSQL',
            'AWS',
            'Docker',
            'Git',
            'Agile/Scrum',
        ],
    }

    const handleDownload = () => {
        alert('Download functionality would be implemented here')
    }

    const handleEdit = () => {
        alert('Edit functionality would be implemented here')
    }

    const handleShare = () => {
        alert('Share functionality would be implemented here')
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[var(--background)] transition-colors duration-500">
            <div className="container-custom py-8">
                {/* Success Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 flex items-center"
                >
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                        <h3 className="font-semibold text-green-500">Resume Created Successfully!</h3>
                        <p className="text-sm text-green-500/70">Your professional resume is ready to download and share.</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Resume Preview */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 md:p-12">
                            {/* Header */}
                            <div className="border-b border-[var(--border)] pb-6 mb-6">
                                <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
                                    {resumeData.name}
                                </h1>
                                <p className="text-xl text-[var(--foreground)]/80 mb-4">{resumeData.title}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-[var(--foreground)]/60">
                                    <span>{resumeData.contact.email}</span>
                                    <span>•</span>
                                    <span>{resumeData.contact.phone}</span>
                                    <span>•</span>
                                    <span>{resumeData.contact.location}</span>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-[var(--foreground)] mb-3">Professional Summary</h2>
                                <p className="text-[var(--foreground)]/80 leading-relaxed">{resumeData.summary}</p>
                            </div>

                            {/* Experience */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Work Experience</h2>
                                <div className="space-y-6">
                                    {resumeData.experience.map((job, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-[var(--foreground)]">{job.title}</h3>
                                                    <p className="text-[var(--foreground)]/60">{job.company}</p>
                                                </div>
                                                <span className="text-sm text-[var(--foreground)]/40">{job.period}</span>
                                            </div>
                                            <ul className="list-disc list-inside space-y-1 text-[var(--foreground)]/80">
                                                {job.achievements.map((achievement, i) => (
                                                    <li key={i}>{achievement}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h2 className="text-xl font-semibold text-[var(--foreground)] mb-3">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-[var(--foreground)]/5 text-[var(--foreground)]/80 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Actions Sidebar */}
                    <div className="space-y-4">
                        <Card>
                            <h3 className="font-semibold text-lg mb-4 text-[var(--foreground)]">Actions</h3>
                            <div className="space-y-3">
                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={handleDownload}
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Download PDF
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={handleEdit}
                                >
                                    <Edit className="w-5 h-5 mr-2" />
                                    Edit Resume
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full"
                                    onClick={handleShare}
                                >
                                    <Share2 className="w-5 h-5 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="font-semibold text-lg mb-3 text-[var(--foreground)]">Tips</h3>
                            <ul className="space-y-2 text-sm text-[var(--foreground)]/60">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Your resume is ATS-optimized</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Proofread before sending</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Customize for each job application</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeOutput
