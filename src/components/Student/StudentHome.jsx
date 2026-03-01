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
    <div className="space-y-5">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-emerald-100 to-teal-50 card-3d border border-emerald-200 p-6 text-gray-900 shadow-[0_10px_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-40 h-40 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-black mb-1 text-emerald-950 drop-shadow-sm">
            👋 Welcome, {user.name}!
          </h1>
          <p className="text-sm text-emerald-800 font-bold uppercase tracking-wide">
            Student Dashboard • Smart Attendance
          </p>
        </div>
      </div>

      {/* Student Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-3d p-4 border-l-4 border-indigo-500 flex items-center gap-4">
          <div className="text-3xl filter drop-shadow-sm">🎓</div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Student ID
            </p>
            <p className="text-lg font-black text-gray-900 leading-none mt-1">
              {user.student_id || user.id}
            </p>
          </div>
        </div>

        <div className="card-3d p-4 border-l-4 border-purple-500 flex items-center gap-4">
          <div className="text-3xl filter drop-shadow-sm">🏢</div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Department
            </p>
            <p className="text-lg font-black text-gray-900 leading-none mt-1">
              {user.department || 'Not Set'}
            </p>
          </div>
        </div>

        <div className="card-3d p-4 border-l-4 border-pink-500 flex items-center gap-4">
          <div className="text-3xl filter drop-shadow-sm">📚</div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Year / Class
            </p>
            <p className="text-lg font-black text-gray-900 leading-none mt-1">
              Year {user.year || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Today's Attendance Status */}
      <div className="card-3d p-6">
        <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
          📅 Today's Attendance
        </h2>

        {loading ? (
          <div className="text-center py-8 text-gray-500 font-semibold animate-pulse">
            Loading status...
          </div>
        ) : todayStatus ? (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 shadow-inner">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl filter drop-shadow-sm">✅</div>
              <div>
                <h3 className="text-xl font-black text-green-700">Present</h3>
                <p className="text-xs font-bold text-green-600 uppercase tracking-wide">
                  Attendance Marked
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white rounded-xl p-3 shadow-sm border border-green-100 flex flex-col justify-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                  Time
                </p>
                <p className="text-base font-black text-gray-800 leading-none">
                  {todayStatus.time}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-green-100 flex flex-col justify-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                  Date
                </p>
                <p className="text-base font-black text-gray-800 leading-none">
                  {todayStatus.date}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-2xl p-5 shadow-inner">
            <div className="flex items-center gap-4">
              <div className="text-4xl filter drop-shadow-sm">❌</div>
              <div>
                <h3 className="text-xl font-black text-red-700">Not Marked</h3>
                <p className="text-xs font-bold text-red-600 uppercase tracking-wide">
                  Please mark attendance
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="card-3d p-6">
        <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
          🔧 System Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <div className="text-3xl filter drop-shadow-sm">👤</div>
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Face Scan
              </p>
              <p className="text-sm text-indigo-700 font-black">
                ✅ Active & Ready
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <div className="text-3xl filter drop-shadow-sm">📍</div>
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Location Check
              </p>
              <p className="text-sm text-indigo-700 font-black">
                ✅ Monitoring
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentHome
