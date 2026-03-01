import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HeroSection.css'

function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="px-4 py-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white min-h-[65vh] flex flex-col justify-center rounded-b-[2.5rem] shadow-[0_20px_40px_rgba(99,102,241,0.3)] relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-pink-400/20 blur-2xl"></div>

      <div className="max-w-md mx-auto text-center relative z-10 w-full mt-4">
        {/* Badge */}
        <div className="inline-block px-5 py-2 rounded-full glass border border-white/40 text-white shadow-lg mb-6 text-sm font-bold tracking-wide">
          ✨ AI-Powered System
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight tracking-tight drop-shadow-md">
          Smart Attendance with <br />
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent filter drop-shadow-sm">
            Face Recognition
          </span>
        </h1>

        {/* Description */}
        <p className="text-base font-medium mb-8 text-white/90 px-2 drop-shadow-sm">
          Zero proxy attendance with AI face recognition and GPS verification.
          Mark attendance in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 w-full px-2">
          <button
            className="w-full px-6 py-4 btn-3d bg-white text-indigo-700 rounded-2xl font-black text-lg shadow-[0_8px_30px_rgba(255,255,255,0.3)]"
            onClick={() => navigate('/register')}
          >
            🚀 Get Started Free
          </button>
          <button
            className="w-full px-6 py-4 btn-3d glass border border-white/30 text-white rounded-2xl font-bold"
            onClick={() => navigate('/login')}
          >
            🔐 Login to Account
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-10 px-2">
          {[
            { num: '99.9%', label: 'Accuracy' },
            { num: '<3s', label: 'Speed' },
            { num: '0', label: 'Proxy' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass p-3 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:scale-105"
            >
              <div className="text-xl font-black text-white drop-shadow-md">
                {stat.num}
              </div>
              <div className="text-xs font-bold text-white/80 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
