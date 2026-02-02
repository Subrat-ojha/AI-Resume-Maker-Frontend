import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, RefreshCw, Share2, CheckCircle2, Loader2, FileWarning, ArrowLeft } from 'lucide-react'
import mammoth from 'mammoth'
import Button from '../components/ui/animated-button'
import Card from '../components/ui/animated-card'

const ResumeOutput = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [resumeHtml, setResumeHtml] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [downloadUrl, setDownloadUrl] = useState<string>('')

    useEffect(() => {
        if (id) {
            // Decode the URL from the route parameter
            const decodedUrl = decodeURIComponent(id)
            setDownloadUrl(decodedUrl)
            fetchAndConvertDocx(decodedUrl)
        }
    }, [id])

    const fetchAndConvertDocx = async (url: string) => {
        setIsLoading(true)
        setError(null)

        try {
            // Fetch the DOCX file
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Failed to fetch resume: ${response.statusText}`)
            }

            const arrayBuffer = await response.arrayBuffer()

            // Convert DOCX to HTML using mammoth
            const result = await mammoth.convertToHtml({ arrayBuffer })

            if (result.value) {
                setResumeHtml(result.value)
            } else {
                throw new Error('Failed to convert document')
            }

            // Log any warnings
            if (result.messages.length > 0) {
                console.warn('Mammoth warnings:', result.messages)
            }
        } catch (err: any) {
            console.error('Error loading resume:', err)
            setError(err.message || 'Failed to load resume preview')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDownload = () => {
        if (downloadUrl) {
            // Create a temporary link and trigger download
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = 'resume.docx'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const handleRefresh = () => {
        if (downloadUrl) {
            fetchAndConvertDocx(downloadUrl)
        }
    }

    const handleShare = async () => {
        if (navigator.share && downloadUrl) {
            try {
                await navigator.share({
                    title: 'My Optimized Resume',
                    text: 'Check out my AI-optimized resume!',
                    url: downloadUrl
                })
            } catch (err) {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(downloadUrl)
                alert('Download link copied to clipboard!')
            }
        } else if (downloadUrl) {
            await navigator.clipboard.writeText(downloadUrl)
            alert('Download link copied to clipboard!')
        }
    }

    const handleBack = () => {
        navigate('/create')
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[var(--background)] transition-colors duration-500">
            <div className="container-custom py-8">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Create Another</span>
                </button>

                {/* Success Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 flex items-center"
                >
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                        <h3 className="font-semibold text-green-500">Resume Optimized Successfully!</h3>
                        <p className="text-sm text-green-500/70">Your AI-tailored resume is ready to download.</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Resume Preview */}
                    <div className="lg:col-span-2">
                        <Card className="p-0 overflow-hidden">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Loader2 className="w-10 h-10 text-[#00ff88]" />
                                    </motion.div>
                                    <p className="mt-4 text-[var(--foreground)]/60">Loading resume preview...</p>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <FileWarning className="w-12 h-12 text-red-500 mb-4" />
                                    <p className="text-red-500 font-medium mb-2">Failed to load preview</p>
                                    <p className="text-sm text-[var(--foreground)]/60 mb-4">{error}</p>
                                    <Button variant="secondary" onClick={handleRefresh}>
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Try Again
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    className="resume-preview p-8 md:p-12 bg-white text-gray-900"
                                    dangerouslySetInnerHTML={{ __html: resumeHtml }}
                                />
                            )}
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
                                    disabled={!downloadUrl}
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Download DOCX
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={handleRefresh}
                                    disabled={isLoading}
                                >
                                    <RefreshCw className="w-5 h-5 mr-2" />
                                    Refresh Preview
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full"
                                    onClick={handleShare}
                                    disabled={!downloadUrl}
                                >
                                    <Share2 className="w-5 h-5 mr-2" />
                                    Share Link
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
                                    <span>Tailored to match the job description</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Proofread before sending</span>
                                </li>
                            </ul>
                        </Card>

                        {/* Download URL Info */}
                        {downloadUrl && (
                            <Card className="bg-[var(--foreground)]/5">
                                <p className="text-xs text-[var(--foreground)]/40 mb-1">File URL</p>
                                <p className="text-xs text-[var(--foreground)]/60 break-all font-mono">
                                    {downloadUrl}
                                </p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* Custom styles for resume preview */}
            <style>{`
                .resume-preview {
                    font-family: 'Georgia', 'Times New Roman', serif;
                    line-height: 1.6;
                }
                .resume-preview h1 {
                    font-size: 1.75rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: #1a1a1a;
                }
                .resume-preview h2 {
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: #1a1a1a;
                    border-bottom: 1px solid #e5e5e5;
                    padding-bottom: 0.25rem;
                }
                .resume-preview h3 {
                    font-size: 1rem;
                    font-weight: 600;
                    margin-top: 1rem;
                    margin-bottom: 0.5rem;
                    color: #333;
                }
                .resume-preview p {
                    margin-bottom: 0.75rem;
                    color: #444;
                }
                .resume-preview ul {
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                    list-style-type: disc;
                }
                .resume-preview li {
                    margin-bottom: 0.25rem;
                    color: #444;
                }
                .resume-preview strong, .resume-preview b {
                    font-weight: 600;
                    color: #1a1a1a;
                }
                .resume-preview a {
                    color: #0066cc;
                    text-decoration: underline;
                }
                .resume-preview table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 1rem;
                }
                .resume-preview td, .resume-preview th {
                    padding: 0.5rem;
                    border: 1px solid #e5e5e5;
                }
            `}</style>
        </div>
    )
}

export default ResumeOutput
