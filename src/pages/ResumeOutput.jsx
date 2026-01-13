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
        <div className="min-h-[calc(100vh-80px)] bg-gray-50">
            <div className="container-custom py-8">
                {/* Success Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center"
                >
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                        <h3 className="font-semibold text-green-900">Resume Created Successfully!</h3>
                        <p className="text-sm text-green-700">Your professional resume is ready to download and share.</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Resume Preview */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 md:p-12">
                            {/* Header */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    {resumeData.name}
                                </h1>
                                <p className="text-xl text-primary-600 mb-4">{resumeData.title}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <span>{resumeData.contact.email}</span>
                                    <span>•</span>
                                    <span>{resumeData.contact.phone}</span>
                                    <span>•</span>
                                    <span>{resumeData.contact.location}</span>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Summary</h2>
                                <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                            </div>

                            {/* Experience */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
                                <div className="space-y-6">
                                    {resumeData.experience.map((job, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                                    <p className="text-gray-600">{job.company}</p>
                                                </div>
                                                <span className="text-sm text-gray-500">{job.period}</span>
                                            </div>
                                            <ul className="list-disc list-inside space-y-1 text-gray-700">
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
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
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
                            <h3 className="font-semibold text-lg mb-4">Actions</h3>
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
                            <h3 className="font-semibold text-lg mb-3">Tips</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
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
