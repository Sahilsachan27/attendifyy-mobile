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
    <div className="space-y-5">
      <div className="card-3d p-6">
        <h2 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-3 drop-shadow-sm">
          📝 My Records
        </h2>
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-6">
          Complete history of your attendance
        </p>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="card-3d bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(16,185,129,0.2)]">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-green-50">
              Total Days Present
            </p>
            <p className="text-3xl font-black drop-shadow-md">
              {records.length}
            </p>
          </div>
          <div className="card-3d bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(59,130,246,0.2)]">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-blue-50">
              This Month
            </p>
            <p className="text-3xl font-black drop-shadow-md">
              {
                records.filter(
                  (r) => new Date(r.date).getMonth() === new Date().getMonth(),
                ).length
              }
            </p>
          </div>
          <div className="card-3d bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(168,85,247,0.2)] flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-purple-50">
              Last Updated
            </p>
            <p className="text-xl font-black drop-shadow-md leading-tight">
              {records.length > 0
                ? new Date(records[0].timestamp).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </div>

        {/* Attendance List */}
        {loading ? (
          <div className="text-center py-10 font-bold text-gray-500 animate-pulse">
            Loading records...
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-xl mb-2 filter drop-shadow-sm">📭</p>
            <p className="text-base font-bold text-gray-700 mb-1">
              No attendance records yet
            </p>
            <p className="text-sm text-gray-500">
              Start marking your attendance to see records here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((record, index) => (
              <div
                key={index}
                className="card-3d p-4 flex flex-row items-center justify-between gap-3 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-xl filter drop-shadow-sm border border-green-200/50">
                    ✅
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900 leading-none">
                      {record.date}
                    </p>
                    <p className="text-xs text-gray-500 font-bold mt-1.5 flex items-center gap-1">
                      <span className="text-indigo-400">🕒</span>
                      {record.time}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm border border-indigo-100/50">
                    📍 Campus
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
