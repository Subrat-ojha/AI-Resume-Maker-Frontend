import { motion } from 'framer-motion'
import { FileText, Plus, Clock, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/animated-button'
import Card from '../components/ui/animated-card'

const Dashboard = () => {
    // Mock data for saved resumes
    const savedResumes = [
        {
            id: 1,
            title: 'Software Engineer Resume',
            lastModified: '2 hours ago',
            status: 'completed',
        },
        {
            id: 2,
            title: 'Product Manager Resume',
            lastModified: '1 day ago',
            status: 'completed',
        },
        {
            id: 3,
            title: 'Marketing Specialist Resume',
            lastModified: '3 days ago',
            status: 'draft',
        },
    ]

    const templates = [
        { id: 1, name: 'Professional', color: 'from-blue-500 to-blue-600' },
        { id: 2, name: 'Modern', color: 'from-purple-500 to-purple-600' },
        { id: 3, name: 'Creative', color: 'from-pink-500 to-pink-600' },
        { id: 4, name: 'Minimal', color: 'from-gray-500 to-gray-600' },
    ]

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[var(--background)] transition-colors duration-500">
            <div className="container-custom section-padding">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="mb-2 text-[var(--foreground)]">My Resumes</h1>
                        <p className="text-[var(--foreground)]/60">Manage and create your professional resumes</p>
                    </div>
                    <Link to="/create" className="mt-4 md:mt-0">
                        <Button variant="primary">
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Resume
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--foreground)]/60 text-sm mb-1">Total Resumes</p>
                                <p className="text-3xl font-bold text-[var(--foreground)]">{savedResumes.length}</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                                <FileText className="w-6 h-6 text-primary-600" />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--foreground)]/60 text-sm mb-1">Completed</p>
                                <p className="text-3xl font-bold text-[var(--foreground)]">
                                    {savedResumes.filter((r) => r.status === 'completed').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                <Download className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--foreground)]/60 text-sm mb-1">Drafts</p>
                                <p className="text-3xl font-bold text-[var(--foreground)]">
                                    {savedResumes.filter((r) => r.status === 'draft').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Saved Resumes */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold mb-4">Your Resumes</h2>
                        <div className="space-y-4">
                            {savedResumes.map((resume) => (
                                <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-[var(--foreground)]">{resume.title}</h3>
                                                <div className="flex items-center space-x-3 text-sm text-[var(--foreground)]/40">
                                                    <span className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {resume.lastModified}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${resume.status === 'completed'
                                                            ? 'bg-green-500/10 text-green-500'
                                                            : 'bg-yellow-500/10 text-yellow-500'
                                                            }`}
                                                    >
                                                        {resume.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link to={`/resume/${resume.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                            <Button variant="secondary" size="sm">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Templates */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Templates</h2>
                        <div className="space-y-3">
                            {templates.map((template) => (
                                <motion.div
                                    key={template.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="cursor-pointer"
                                >
                                    <Card className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${template.color}`} />
                                            <span className="font-medium text-[var(--foreground)]">{template.name}</span>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        <Card className="mt-6 bg-[var(--foreground)] text-[var(--background)] border-0">
                            <h3 className="font-semibold mb-2">Need Help?</h3>
                            <p className="text-sm opacity-90 mb-4">
                                Check out our guide on creating the perfect resume
                            </p>
                            <Button variant="secondary" size="sm" className="bg-[var(--background)] text-[var(--foreground)] hover:opacity-90 border-0">
                                View Guide
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
