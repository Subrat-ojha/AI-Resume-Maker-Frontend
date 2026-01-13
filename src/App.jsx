import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './pages/Landing'
import PromptInput from './pages/PromptInput'
import Processing from './pages/Processing'
import ResumeOutput from './pages/ResumeOutput'
import Dashboard from './pages/Dashboard'

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/create" element={<PromptInput />} />
                        <Route path="/processing" element={<Processing />} />
                        <Route path="/resume/:id" element={<ResumeOutput />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
