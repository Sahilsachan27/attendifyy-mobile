import React, { useState, useEffect } from 'react'
import { studentAPI } from '../../services/api'

function MyAttendance({ user }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAttendance()
  }, [])

  const fetchAttendance = async () => {
    try {
      const response = await studentAPI.getAttendance(
        user.student_id || user.id,
      )
      setRecords(response.data.records)
    } catch (error) {
      console.error('Failed to fetch attendance:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-5 pb-8">
      {/* Page Header */}
      <div className="relative h-28 sm:h-32 card-3d-modern overflow-hidden border-0 shadow-[0_10px_30px_rgba(99,102,241,0.15)] bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col justify-center p-5 sm:p-6 text-white group">
        <div className="absolute top-[-50%] right-[-10%] w-40 h-40 rounded-full bg-white/20 blur-2xl pointer-events-none transition-colors"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black mb-1 drop-shadow-md tracking-tight flex items-center gap-3">
            <span className="p-1.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-inner">📝</span>
            My Records
          </h1>
          <p className="text-sm font-bold text-indigo-100 uppercase tracking-wide drop-shadow-sm ml-1">
            Complete attendance history
          </p>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-3d-modern p-3 sm:p-4 border-t-4 border-emerald-400 bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">Present</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-900 leading-none drop-shadow-sm">{records.length}</span>
        </div>
        
        <div className="card-3d-modern p-3 sm:p-4 border-t-4 border-blue-400 bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">This Month</span>
          <span className="text-2xl sm:text-3xl font-black text-blue-900 leading-none drop-shadow-sm">
            {records.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length}
          </span>
        </div>

        <div className="card-3d-modern p-3 sm:p-4 border-t-4 border-purple-400 bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-bold text-purple-600 uppercase tracking-widest mb-1">Last Update</span>
          <span className="text-sm sm:text-base font-black text-purple-900 leading-none drop-shadow-sm mt-1">
            {records.length > 0 ? new Date(records[0].timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'N/A'}
          </span>
        </div>
      </div>

      {/* Attendance List */}
      <div className="card-3d-modern p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 flex items-center gap-2 drop-shadow-sm">
          📋 Timeline
        </h2>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading records...</span>
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-12 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
            <span className="text-5xl filter grayscale opacity-50 mb-3 block">📭</span>
            <p className="text-base font-bold text-gray-700 mb-1">
              No attendance records yet
            </p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              Start marking your attendance
            </p>
          </div>
        ) : (
          <div className="space-y-3 relative">
            {/* Timeline Line */}
            <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gray-100 hidden sm:block"></div>
            
            {records.map((record, index) => (
              <div
                key={index}
                className="relative flex items-center gap-4 p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5"
              >
                {/* Status Dot/Icon */}
                <div className="relative z-10 w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center text-2xl shadow-sm border border-emerald-100">
                  ✅
                </div>
                
                {/* Data */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-gray-900 leading-none tracking-wide">
                      {new Date(record.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold mt-1 tracking-wider uppercase flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center text-[8px]">🕒</span>
                      {record.time}
                    </p>
                  </div>
                  
                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50/80 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-inner border border-indigo-100/50 w-fit shrink-0">
                    <span>📍</span> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAttendance
