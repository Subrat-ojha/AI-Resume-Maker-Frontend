import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './pages/Landing'
import PromptInput from './pages/PromptInput'
import Processing from './pages/Processing'
import ResumeOutput from './pages/ResumeOutput'
import Dashboard from './pages/Dashboard'
import Pricing from './pages/Pricing'
import Auth from './pages/Auth'

import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
                        <Navbar />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Landing />} />
                                <Route path="/create" element={<PromptInput />} />
                                <Route path="/processing" element={<Processing />} />
                                <Route path="/resume/:id" element={<ResumeOutput />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/pricing" element={<Pricing />} />
                                <Route path="/login" element={<Auth />} />
                                <Route path="/register" element={<Auth />} />
                                <Route path="/forgot-password" element={<Auth />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
