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
      <div className="card-3d p-4 flex flex-col sm:flex-row gap-3">
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
        <div className="card-3d bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(16,185,129,0.2)] flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider mb-1 text-emerald-100 flex items-center gap-1">
            <span>✅</span> Present
          </span>
          <span className="text-3xl font-black drop-shadow-md">
            {records.length}
          </span>
        </div>
        <div className="card-3d bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(168,85,247,0.2)] flex flex-col items-center justify-center text-center">
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
      {loading ? (
        <div className="text-center py-10 font-bold text-gray-500 animate-pulse">
          Loading attendance records...
        </div>
      ) : (
        <div className="card-3d overflow-hidden border border-gray-100/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/70 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Location Status</th>
                  <th className="px-4 py-3 text-center">Face Confidence</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {records.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-8 text-gray-500 font-bold"
                    >
                      No attendance records for {selectedDate}
                    </td>
                  </tr>
                ) : (
                  records.map((record, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="font-black text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg text-xs tracking-wide shadow-sm">
                          {record.student_id}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-800 font-black text-xs shadow-sm border border-indigo-200">
                            {record.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-gray-900">
                            {record.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex">
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-[10px] font-black tracking-wide flex items-center gap-1 shadow-inner border border-gray-200/50">
                            <span>🕐</span> {record.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                          📍 Inside Geofence (
                          {record.distance_from_campus?.toFixed(0)}m)
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center font-black text-purple-700 bg-purple-50 px-2 py-1 rounded-lg text-xs tracking-wide shadow-sm border border-purple-100">
                          {record.face_confidence?.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm border border-green-100/50">
                          ✅ Present
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttendanceRecords
