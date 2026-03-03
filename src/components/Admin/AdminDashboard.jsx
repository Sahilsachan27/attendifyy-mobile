import React, { useState, useEffect } from 'react'
import Dashboard from './Dashboard'
import StudentRecords from './StudentRecords'
import RegisterStudent from './RegisterStudent'
import AttendanceRecords from './AttendanceRecords'
import FaceAuthStatus from './FaceAuthStatus'
import GeofenceConfig from './GeofenceConfig'
import TrainModel from './TrainModel'
import AdminProfile from './AdminProfile'

function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = {
    dashboard: { icon: '📊', label: 'Dashboard' },
    students: { icon: '👥', label: 'Students' },
    geofence: { icon: '🌍', label: 'Geofencing' },
    attendance: { icon: '📋', label: 'Attendance' },
    faceauth: { icon: '🎭', label: 'Face Auth' },
    register: { icon: '➕', label: 'Register' },
    train: { icon: '🤖', label: 'Train AI' },
    profile: { icon: '👤', label: 'Profile' },
  }

  const handleTabClick = (key) => {
    setActiveTab(key)
  }

  // ✅ KEEP: Listen for navigation events from Dashboard quick actions
  useEffect(() => {
    const handleNavigate = (event) => {
      const tabKey = event.detail
      if (tabs[tabKey]) {
        setActiveTab(tabKey)
      }
    }

    window.addEventListener('navigateToTab', handleNavigate)
    return () => window.removeEventListener('navigateToTab', handleNavigate)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'students':
        return <StudentRecords />
      case 'register':
        return <RegisterStudent />
      case 'attendance':
        return <AttendanceRecords />
      case 'faceauth':
        return <FaceAuthStatus />
      case 'geofence':
        return <GeofenceConfig />
      case 'train':
        return <TrainModel />
      case 'profile':
        return <AdminProfile user={user} />
      default:
        return <Dashboard />
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
              Admin Dashboard
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

      {/* Floating Bottom Navigation - First 4 tabs + Logout */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/40 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[2rem] pt-3 pb-6 px-1">
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto relative">
          {/* Show first 4 main tabs */}
          {Object.entries(tabs)
            .slice(0, 4)
            .map(([key, { icon, label }]) => (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={`flex flex-col items-center gap-1 px-1 py-2 rounded-xl transition-all ${
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
                <span className="text-[10px] font-bold truncate w-full text-center tracking-wide">
                  {label}
                </span>
              </button>
            ))}

          {/* ✅ LOGOUT BUTTON RESTORED */}
          <button
            onClick={onLogout}
            className="flex flex-col items-center gap-1 px-1 py-2 rounded-xl text-rose-500 active:scale-95 transition-all"
          >
            <span className="text-2xl">🚪</span>
            <span className="text-[10px] font-bold truncate w-full text-center tracking-wide">
              Logout
            </span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default AdminDashboard
