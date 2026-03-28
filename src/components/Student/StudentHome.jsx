import React, { useState, useEffect } from 'react'
import { studentAPI } from '../../services/api'

function StudentHome({ user }) {
  const [todayStatus, setTodayStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkTodayAttendance()
  }, [])

  const checkTodayAttendance = async () => {
    try {
      const response = await studentAPI.getAttendance(
        user.student_id || user.id,
      )
      const today = new Date().toISOString().split('T')[0]
      const todayRecord = response.data.records.find((r) => r.date === today)
      setTodayStatus(todayRecord || null)
    } catch (error) {
      console.error('Failed to fetch attendance:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-5 pb-8">
      {/* Welcome Header */}
      <div className="relative h-36 sm:h-44 card-3d-modern overflow-hidden border-0 shadow-[0_10px_30px_rgba(16,185,129,0.15)] bg-gradient-to-br from-emerald-400 to-teal-500 flex flex-col justify-end p-5 sm:p-6 text-white group">
        <div className="absolute top-[-50%] right-[-10%] w-48 h-48 rounded-full bg-white/20 blur-2xl pointer-events-none group-active:bg-white/30 transition-colors"></div>
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 border border-white/30 drop-shadow-sm">
            🎓 Student Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black leading-none drop-shadow-md tracking-tight">
            Hi, {user.name.split(' ')[0]}!
          </h1>
        </div>
        <div className="absolute -top-6 -right-6 text-8xl filter drop-shadow-lg opacity-40">👋</div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-3d-modern p-4 sm:p-5 flex flex-col items-center justify-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl filter drop-shadow-sm">🆔</div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">ID Number</p>
            <p className="text-sm font-black text-gray-900 leading-none">{user.student_id || user.id}</p>
          </div>
        </div>

        <div className="card-3d-modern p-4 sm:p-5 flex flex-col items-center justify-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-2xl filter drop-shadow-sm">📚</div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Course</p>
            <p className="text-sm font-black text-gray-900 leading-none">{user.department || 'Not Set'}</p>
          </div>
        </div>

        <div className="card-3d-modern p-4 sm:p-5 flex flex-col items-center justify-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-2xl filter drop-shadow-sm">🎓</div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Year</p>
            <p className="text-sm font-black text-gray-900 leading-none">Year {user.year || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Today's Attendance Status */}
      <div className="card-3d-modern p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 drop-shadow-sm">
          📅 Today's Log
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 gap-3">
            <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Checking records...</span>
          </div>
        ) : todayStatus ? (
          <div className="relative overflow-hidden group rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-[0_8px_20px_rgba(16,185,129,0.2)]">
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 rounded-full bg-white/20 blur-xl pointer-events-none"></div>
            
            <div className="flex items-start justify-between relative z-10 mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-emerald-100 rotate-3 transform">✅</div>
                <div>
                  <h3 className="text-2xl font-black drop-shadow-sm">Present</h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-wider mt-1 border border-white/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span> Marked
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest mb-1">Time Logged</p>
                <p className="text-lg font-black tracking-wide">{todayStatus.time}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest mb-1">Date</p>
                <p className="text-lg font-black tracking-wide">{todayStatus.date}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden group rounded-3xl bg-gradient-to-br from-rose-500 to-red-600 p-6 text-white shadow-[0_8px_20px_rgba(244,63,94,0.2)] flex items-center justify-between">
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 rounded-full bg-white/20 blur-xl pointer-events-none"></div>
            
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-md border-2 border-rose-100 -rotate-3 transform">⚠️</div>
              <div>
                <h3 className="text-2xl font-black drop-shadow-md leading-none mb-1.5">Absent</h3>
                <span className="inline-flex px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-black uppercase tracking-wide border border-white/30">
                  Not Marked Yet
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hardware Status */}
      <div className="card-3d-modern p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 drop-shadow-sm">
          🔧 Hardware Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-4 p-4 bg-gray-50/70 rounded-2xl border border-gray-100 shadow-inner">
            <div className="text-3xl filter drop-shadow-sm">📸</div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Camera Module
              </p>
              <p className="text-sm text-indigo-600 font-black leading-none">
                ✅ Ready for Auth
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50/70 rounded-2xl border border-gray-100 shadow-inner">
            <div className="text-3xl filter drop-shadow-sm">🌍</div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Location Services
              </p>
              <p className="text-sm text-emerald-600 font-black leading-none">
                ✅ Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentHome
