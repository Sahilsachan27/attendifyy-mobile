import React, { useState, useEffect } from 'react'
import { adminAPI } from '../../services/api'
import './AdminStyles.css'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    todayAttendance: 0,
    presentCount: 0,
    absentCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: '🎓 Student Management',
      desc: 'Manage all student records efficiently',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      title: '👤 Face Recognition',
      desc: '99.9% accurate AI-powered authentication',
      gradient: 'from-rose-500 to-pink-600',
    },
    {
      title: '📍 Geo-fencing Active',
      desc: 'Zero proxy attendance guaranteed',
      gradient: 'from-cyan-500 to-blue-600',
    },
  ]

  useEffect(() => {
    fetchDashboardStats()
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const [studentsRes, attendanceRes] = await Promise.all([
        adminAPI.getStudents(),
        adminAPI.getDailyAttendance(today),
      ])

      setStats({
        totalStudents: studentsRes.data.count,
        todayAttendance: attendanceRes.data.count,
        presentCount: attendanceRes.data.count,
        absentCount: studentsRes.data.count - attendanceRes.data.count,
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ NEW: Quick action handlers
  const quickActions = [
    {
      icon: '➕',
      label: 'Register Student',
      gradient: 'from-blue-500 to-blue-600',
      onClick: () =>
        window.dispatchEvent(
          new CustomEvent('navigateToTab', { detail: 'register' }),
        ),
    },
    {
      icon: '📊',
      label: 'View Attendance',
      gradient: 'from-emerald-500 to-teal-600',
      onClick: () =>
        window.dispatchEvent(
          new CustomEvent('navigateToTab', { detail: 'attendance' }),
        ),
    },
    {
      icon: '🤖',
      label: 'Train Model',
      gradient: 'from-purple-500 to-indigo-600',
      onClick: () =>
        window.dispatchEvent(
          new CustomEvent('navigateToTab', { detail: 'train' }),
        ),
    },
    {
      icon: '🎭',
      label: 'Face Auth Status',
      gradient: 'from-amber-500 to-orange-600',
      onClick: () =>
        window.dispatchEvent(
          new CustomEvent('navigateToTab', { detail: 'faceauth' }),
        ),
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Stats Slider - Responsive height */}
      <div className="relative h-36 sm:h-44 card-3d overflow-hidden border-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex items-center justify-center 
                       transition-all duration-700 ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
          >
            {/* Decorative background blobs */}
            <div className="absolute top-[-50%] right-[-10%] w-40 h-40 rounded-full bg-white/20 blur-2xl pointer-events-none fade-in"></div>

            <div className="text-center text-white px-4 sm:px-6 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 drop-shadow-sm">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-base font-bold text-white/90 uppercase tracking-widest">
                {slide.desc}
              </p>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 drop-shadow-sm
                         ${index === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600 flex items-center justify-center gap-2">
          <div className="w-6 h-6 border-3 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      ) : (
        <>
          {/* Stats Cards - Fully responsive */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: '👥',
                label: 'Total Students',
                value: stats.totalStudents,
                sublabel: 'Registered',
                color: 'indigo',
              },
              {
                icon: '✅',
                label: 'Present Today',
                value: stats.presentCount,
                sublabel:
                  stats.totalStudents > 0
                    ? `${((stats.presentCount / stats.totalStudents) * 100).toFixed(1)}%`
                    : '0%',
                color: 'emerald',
              },
              {
                icon: '❌',
                label: 'Absent Today',
                value: stats.absentCount,
                sublabel:
                  stats.totalStudents > 0
                    ? `${((stats.absentCount / stats.totalStudents) * 100).toFixed(1)}%`
                    : '0%',
                color: 'rose',
              },
              {
                icon: '📅',
                label: 'Today',
                value: stats.todayAttendance,
                sublabel: new Date().toLocaleDateString(),
                color: 'purple',
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`card-3d p-4 sm:p-5 border-l-4 border-${stat.color}-500 hover:-translate-y-1 transition-transform cursor-pointer`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className={`text-3xl sm:text-4xl filter drop-shadow-sm`}>
                    {stat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5 truncate">
                      {stat.label}
                    </h3>
                    <p className="text-2xl sm:text-3xl font-black text-gray-900 leading-none mb-1">
                      {stat.value}
                    </p>
                    <span
                      className={`text-[10px] font-bold text-${stat.color}-500 truncate block uppercase tracking-wider`}
                    >
                      {stat.sublabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* System Status - Responsive grid */}
          <div className="card-3d p-5 sm:p-6 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 drop-shadow-sm">
              🔧 System Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                {
                  icon: '✅',
                  title: 'Face Recognition',
                  status: 'Active',
                  active: true,
                },
                {
                  icon: '✅',
                  title: 'Geofencing',
                  status: 'Active',
                  active: true,
                },
                {
                  icon: '☁️',
                  title: 'Database',
                  status: 'Connected',
                  active: true,
                },
                {
                  icon: '🤖',
                  title: 'AI Model',
                  status: 'Ready',
                  active: true,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50/70 rounded-2xl border border-gray-100 shadow-inner"
                >
                  <div className="text-2xl filter drop-shadow-sm">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] font-bold text-gray-600 uppercase tracking-wider truncate mb-1">
                      {item.title}
                    </h4>
                    <p
                      className={`text-sm font-black leading-tight ${item.active ? 'text-emerald-600' : 'text-rose-600'}`}
                    >
                      {item.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions - Now with click handlers */}
          <div className="card-3d p-5 sm:p-6 mb-4">
            <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 drop-shadow-sm">
              ⚡ Quick Actions
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${action.gradient} text-white btn-3d
                             flex flex-col items-center justify-center gap-3 cursor-pointer outline-none relative overflow-hidden`}
                >
                  <div className="absolute top-[-20%] left-[-10%] w-16 h-16 rounded-full bg-white/20 blur-xl pointer-events-none"></div>
                  <span className="text-3xl filter drop-shadow-sm leading-none">
                    {action.icon}
                  </span>
                  <span className="text-center font-black text-[11px] sm:text-sm tracking-wide uppercase">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
