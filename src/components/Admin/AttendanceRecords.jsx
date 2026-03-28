import React, { useState, useEffect } from 'react'
import { adminAPI } from '../../services/api'
import './AdminStyles.css'

function AttendanceRecords() {
  const [records, setRecords] = useState([])
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAttendance()
  }, [selectedDate])

  const fetchAttendance = async () => {
    setLoading(true)
    try {
      const response = await adminAPI.getDailyAttendance(selectedDate)
      setRecords(response.data.records)
    } catch (error) {
      console.error('Failed to fetch attendance:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 drop-shadow-sm">
          📋 Attendance Records
        </h2>
      </div>

      {/* Date Filter */}
      <div className="card-3d-modern p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex flex-col justify-center">
          <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">
            📅 Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
          />
        </div>
        <div className="flex items-end">
          <button
            className="btn-3d w-full sm:w-auto px-6 py-3 h-[46px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center"
            onClick={fetchAttendance}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        <div className="card-3d-modern bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(16,185,129,0.2)] flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider mb-1 text-emerald-100 flex items-center gap-1">
            <span>✅</span> Present
          </span>
          <span className="text-3xl font-black drop-shadow-md">
            {records.length}
          </span>
        </div>
        <div className="card-3d-modern bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(168,85,247,0.2)] flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider mb-1 text-purple-100 flex items-center gap-1">
            <span>📅</span> Date
          </span>
          <span className="text-[11px] sm:text-sm font-black drop-shadow-md leading-tight">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Attendance Table */}
      {/* Attendance List (Mobile Optimized Cards) */}
      {loading ? (
        <div className="text-center py-10 font-bold text-gray-500 flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
          Loading records...
        </div>
      ) : (
        <div className="space-y-3 pb-8">
          {records.length === 0 ? (
            <div className="card-3d-modern p-8 text-center bg-white/50 border-dashed border-2 border-indigo-100">
              <span className="text-4xl filter grayscale opacity-50 mb-3 block">📭</span>
              <p className="text-gray-500 font-bold text-sm">No attendance records for {selectedDate}</p>
            </div>
          ) : (
            records.map((record, index) => {
              // Soft gradient based on status (assuming 'Present' means they're in the list, but let's be safe)
              const isPresent = true // All records returned by getDailyAttendance are presents in this app's logic, but we'll style it to be safe.
              const statusColors = isPresent 
                ? 'from-emerald-50 to-teal-50 border-emerald-100/50' 
                : 'from-rose-50 to-pink-50 border-rose-100/50'
              
              const badgeColors = isPresent
                ? 'bg-emerald-100 text-emerald-700 shadow-[0_2px_8px_rgba(16,185,129,0.15)]'
                : 'bg-rose-100 text-rose-700 shadow-[0_2px_8px_rgba(244,63,94,0.15)]'

              return (
                <div
                  key={index}
                  className={`card-3d-modern p-4 bg-gradient-to-br ${statusColors} border relative overflow-hidden flex flex-col gap-3 group`}
                >
                  {/* Decorative background glow */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/40 blur-xl"></div>
                  
                  {/* Top Row: User Info & Status */}
                  <div className="flex justify-between items-start z-10">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-700 font-black text-sm border-2 border-white">
                        {record.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-[15px] leading-tight flex items-center gap-1">
                          {record.name}
                        </h4>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50/50 px-1.5 rounded-md inline-block mt-0.5">
                          ID: {record.student_id}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-white/50 ${badgeColors}`}>
                      <span className="scale-110">{isPresent ? '✅' : '❌'}</span>
                      {isPresent ? 'Present' : 'Absent'}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>

                  {/* Bottom Row: Metadata (Time, Location, Face) */}
                  <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-1 z-10">
                    
                    {/* Time */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-[10px] border border-gray-100">
                        🕐
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider leading-none">Time</span>
                        <span className="font-black text-gray-700 leading-none">{record.time}</span>
                      </div>
                    </div>

                    {/* Geofence */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-[10px] border border-gray-100">
                        📍
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider leading-none">Distance</span>
                        <span className="font-black text-indigo-700 leading-none">{record.distance_from_campus?.toFixed(0)}m</span>
                      </div>
                    </div>

                    {/* Face Match */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-[10px] border border-gray-100">
                        🎭
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider leading-none">Match</span>
                        <span className="font-black text-purple-700 leading-none">{record.face_confidence?.toFixed(1)}%</span>
                      </div>
                    </div>
                    
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default AttendanceRecords
