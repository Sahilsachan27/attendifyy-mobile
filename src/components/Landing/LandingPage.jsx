import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthModal from '../Auth/AuthModal'
import './LandingPage.css'
import HeroSection from './HeroSection'

function LandingPage() {
  const navigate = useNavigate()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#features' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    navigate(userData.role === 'admin' ? '/admin' : '/student')
  }

  return (
    <div className="landing-page" style={{ paddingTop: "0px", paddingBottom: "100px" }}>
      {/* Top Navbar - enhanced */}
      <header
        className="landing-navbar w-full bg-white shadow-sm fixed top-0 left-0 z-50"
        style={{ paddingTop: "32px" }}
      >
        <div className="navbar-inner flex items-center justify-between px-4 py-2 md:px-8">
          {/* App Name & 3D Icon (always visible, left side) */}
          <div className="flex items-center gap-2 min-w-[180px]">
            {/* 3D Graduation Cap SVG */}
            <span className="block">
              <svg
                width="32"
                height="32"
                viewBox="0 0 38 38"
                fill="none"
                style={{ filter: 'drop-shadow(0 2px 8px #6366f1)' }}
              >
                <ellipse
                  cx="19"
                  cy="32"
                  rx="14"
                  ry="5"
                  fill="#6366f1"
                  opacity="0.15"
                />
                <path
                  d="M19 5L35 13L19 21L3 13L19 5Z"
                  fill="url(#grad1)"
                  stroke="#6366f1"
                  strokeWidth="2"
                />
                <path
                  d="M19 21V32"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="grad1"
                    x1="19"
                    y1="5"
                    x2="19"
                    y2="21"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            
            <span
              onClick={() => navigate('/')}
              style={{
                fontWeight: 900,
                fontSize: "28px",
                letterSpacing: "-1px",
                fontFamily: "Poppins, Inter, sans-serif",
                cursor: "pointer",
                background: "linear-gradient(135deg, #f59e0b, #ef4444, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `
                  0 2px 4px rgba(0,0,0,0.15),
                  0 6px 18px rgba(99,102,241,0.25)
                `,
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
              }}
            >
              ATTENDIFY
            </span>
          </div>
        </div>
      </header>

      {/* Add padding to prevent content from hiding under fixed header */}
      <div style={{ paddingTop: "60px" }}>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section id="features" className="px-4 py-12 bg-gray-50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">✨ Powerful Features</h2>
            <p className="text-gray-600">Everything you need for smart attendance</p>
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {([
              { icon: '👤', title: 'Face Authentication', desc: 'AI-powered face recognition with 99.9% accuracy' },
              { icon: '📍', title: 'Geofencing', desc: 'Location-based verification prevents proxy attendance' },
              { icon: '🔒', title: 'Zero Proxy', desc: 'Dual verification ensures authentic attendance' },
              { icon: '⚡', title: 'Instant Processing', desc: 'Mark attendance in under 3 seconds' },
              { icon: '📊', title: 'Admin Dashboard', desc: 'Comprehensive attendance analytics' },
              { icon: '☁️', title: 'Cloud Storage', desc: 'Secure MongoDB Atlas with auto backups' },
            ]).map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 active:scale-95 transition-transform">
                <div className="text-5xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 py-12 bg-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">🔄 How It Works</h2>
            <p className="text-gray-600">Simple 4-step process</p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            {([
              { num: '1', icon: '📝', title: 'Register', desc: 'Create account & capture face images' },
              { num: '2', icon: '🤖', title: 'AI Training', desc: 'System trains with your face data' },
              { num: '3', icon: '📸', title: 'Scan Face', desc: 'Mark attendance with live face scan' },
              { num: '4', icon: '✅', title: 'Verified!', desc: 'Attendance marked successfully' },
            ]).map((step, idx) => (
              <div key={idx} className="relative bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {step.num}
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{step.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security Section */}
        <section className="px-4 py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2">🛡️ Security Measures</h2>
            <p className="text-gray-300">Multi-layered protection</p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {([
              { icon: '🎭', label: 'Face Auth' },
              { icon: '🌍', label: 'GPS Check' },
              { icon: '⏱️', label: 'Time Lock' },
              { icon: '🔐', label: 'Encrypted' },
              { icon: '📱', label: 'Device Track' },
              { icon: '🚨', label: 'Alerts' },
            ]).map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">Join hundreds using smart face recognition</p>
          <button
            className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-2xl active:scale-95 transition-transform"
            onClick={() => navigate('/register')}
          >
            🚀 Start Free Trial
          </button>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 bg-gray-900 text-white text-center" style={{ paddingBottom: "40px" }}>
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">🎓 Attendify</h3>
            <p className="text-gray-400 text-sm">AI Smart Attendance System</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://github.com/sahilsachan27" target="_blank" rel="noopener noreferrer" className="text-3xl hover:scale-110 transition-transform">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.34 6.84 9.7.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.13-4.56-5 0-1.1.38-2 .99-2.7-.1-.25-.43-1.28.09-2.67 0 0 .82-.27 2.7 1.03a9.18 9.18 0 0 1 2.46-.34c.84 0 1.69.11 2.46.34 1.88-1.3 2.7-1.03 2.7-1.03.52 1.39.19 2.42.09 2.67.62.7.99 1.6.99 2.7 0 3.88-2.34 4.74-4.57 5 .36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
              </svg>
            </a>
            <a href="https://instagram.com/sahil_sachan_27" target="_blank" rel="noopener noreferrer" className="text-3xl hover:scale-110 transition-transform">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="6" stroke="#e1306c" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="12" r="5" stroke="#e1306c" strokeWidth="2" fill="none"/>
                <circle cx="17" cy="7" r="1.2" fill="#e1306c"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/sahil-sachan-2727" target="_blank" rel="noopener noreferrer" className="text-3xl hover:scale-110 transition-transform">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="#0A66C2" strokeWidth="2" fill="none"/>
                <path d="M8 10v6M8 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 2v4m0-4a2 2 0 0 1 4 0v4" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
          </div>

          <div className="text-sm text-gray-400">
            <p>&copy; 2026 Attendify. All rights reserved.</p>
            <p className="mt-2">
              Developed by{' '}
              <a href="https://sahilsachan.me" target="_blank" rel="noopener noreferrer" className="text-yellow-400 font-bold hover:text-yellow-300">
                Sahil Sachan
              </a>
            </p>
          </div>
        </footer>
      </div>

      {/* ✅ Floating Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center px-2 py-3 max-w-md mx-auto">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-gray-600 active:scale-95 transition-all"
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-semibold">Home</span>
          </button>

          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-gray-600 active:scale-95 transition-all"
          >
            <span className="text-2xl">✨</span>
            <span className="text-xs font-semibold">Features</span>
          </button>

          <button
            onClick={() => navigate('/login')}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-blue-100 text-blue-600 scale-105 active:scale-100 transition-all"
          >
            <span className="text-2xl">🔐</span>
            <span className="text-xs font-semibold">Login</span>
          </button>

          <button
            onClick={() => navigate('/register')}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-green-100 text-green-600 scale-105 active:scale-100 transition-all"
          >
            <span className="text-2xl">📝</span>
            <span className="text-xs font-semibold">Register</span>
          </button>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}

export default LandingPage
