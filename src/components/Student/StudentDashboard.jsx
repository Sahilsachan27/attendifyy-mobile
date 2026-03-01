import React, { useState } from 'react'
import StudentHome from './StudentHome'
import MarkAttendance from './MarkAttendance'
import MyAttendance from './MyAttendance'
import StudentProfile from './StudentProfile'

function StudentDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home')

  const tabs = {
    home: { icon: '🏠', label: 'Dashboard' },
    mark: { icon: '📸', label: 'Mark Attendance' },
    attendance: { icon: '📝', label: 'Records' },
    profile: { icon: '👤', label: 'Profile' },
  }

  const handleTabClick = (key) => {
    setActiveTab(key)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <StudentHome user={user} />
      case 'mark':
        return <MarkAttendance user={user} />
      case 'attendance':
        return <MyAttendance user={user} />
      case 'profile':
        return <StudentProfile user={user} />
      default:
        return <StudentHome user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-28 relative">
      {/* Global Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 rounded-full bg-gradient-1 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-72 h-72 rounded-full bg-gradient-2 opacity-10 blur-3xl"></div>
      </div>
      {/* ✅ FIXED: Header matching Landing Page style */}
      <header
        className="w-full bg-white shadow-sm fixed top-0 left-0 z-50"
        style={{ paddingTop: '32px' }}
      >
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left: 3D Logo + ATTENDIFY (same as landing page) */}
          <div className="flex items-center gap-2">
            {/* Attendify App Icon */}
            <span className="block w-8 h-8 flex-shrink-0">
              <img
                src="/attendifyy.png"
                alt="Attendify Logo"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(99,102,241,0.5))',
                }}
              />
            </span>
            <span
              style={{
                fontWeight: 900,
                fontSize: '22px',
                lineHeight: '1.2',
                letterSpacing: '-0.5px',
                fontFamily: 'Poppins, Inter, sans-serif',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background:
                  'linear-gradient(135deg, #f59e0b, #ef4444, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow:
                  '0 2px 4px rgba(0,0,0,0.15), 0 6px 18px rgba(99,102,241,0.25)',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
              }}
            >
              Student Dashboard
            </span>
          </div>

          {/* Right: Notification */}
          <button className="relative w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center active:scale-95 transition-transform">
            <span className="text-lg">🔔</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full text-white text-xs font-bold flex items-center justify-center border border-white">
              3
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 relative z-10" style={{ paddingTop: '60px' }}>
        {renderContent()}
      </main>

      {/* Floating Bottom Navigation - 4 buttons + Logout */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/40 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[2rem] pt-3 pb-6 px-2">
        <div className="flex justify-around items-center max-w-md mx-auto relative">
          {Object.entries(tabs).map(([key, { icon, label }]) => (
            <button
              key={key}
              onClick={() => handleTabClick(key)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeTab === key
                  ? 'bg-indigo-50 text-indigo-700 btn-3d'
                  : 'text-gray-500 active:scale-95'
              }`}
            >
              <span
                className={`text-2xl ${
                  activeTab === key ? 'filter drop-shadow-sm' : ''
                }`}
              >
                {icon}
              </span>
              <span className="text-[10px] font-bold tracking-wide">
                {label.split(' ')[0]}
              </span>
            </button>
          ))}
          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-rose-500 active:scale-95 transition-all"
          >
            <span className="text-2xl">🚪</span>
            <span className="text-[10px] font-bold tracking-wide">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default StudentDashboard
