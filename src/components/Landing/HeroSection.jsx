import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white min-h-[60vh] flex items-center">
      <div className="max-w-md mx-auto text-center">
        {/* Badge */}
        <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-3 text-sm font-semibold">
          ✨ AI-Powered Attendance System
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          Smart Attendance with{' '}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Face Recognition
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg mb-8 opacity-90">
          Zero proxy attendance with AI face recognition and GPS verification. Mark attendance in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="w-full px-6 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-2xl active:scale-95 transition-transform"
            onClick={() => navigate('/register')}
          >
            🚀 Get Started Free
          </button>
          <button
            className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full font-semibold active:scale-95 transition-transform"
            onClick={() => navigate('/login')}
          >
            🔐 Login
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          { [
            { num: '99.9%', label: 'Accuracy' },
            { num: '<3s', label: 'Speed' },
            { num: '0', label: 'Proxy' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-black">{stat.num}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          )) }
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
