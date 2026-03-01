import React, { useState, useEffect } from 'react'
import { adminAPI } from '../../services/api'
import './AdminStyles.css'

function FaceAuthStatus() {
  const [authLogs, setAuthLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAuthLogs()
  }, [])

  const fetchAuthLogs = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const response = await adminAPI.getDailyAttendance(today)

      // Format data for face auth display
      const logs = response.data.records.map((record) => ({
        ...record,
        matchResult: 'Success',
        matchConfidence: record.face_confidence || 0,
      }))

      setAuthLogs(logs)
    } catch (error) {
      console.error('Failed to fetch auth logs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 drop-shadow-sm">
          🎭 Face Auth Status
        </h2>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
        <div className="card-3d bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(16,185,129,0.2)] flex items-center justify-between sm:flex-col sm:justify-center text-center">
          <div className="text-left sm:text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider mb-1 text-emerald-100 flex items-center gap-1">
              <span>✅</span> Successful Matches
            </span>
            <span className="text-2xl sm:text-3xl font-black drop-shadow-md">
              {authLogs.length}
            </span>
          </div>
          <div className="text-4xl opacity-50 sm:hidden">✅</div>
        </div>
        <div className="card-3d bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(244,63,94,0.2)] flex items-center justify-between sm:flex-col sm:justify-center text-center">
          <div className="text-left sm:text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider mb-1 text-rose-100 flex items-center gap-1">
              <span>❌</span> Failed Attempts
            </span>
            <span className="text-2xl sm:text-3xl font-black drop-shadow-md">
              0
            </span>
          </div>
          <div className="text-4xl opacity-50 sm:hidden">❌</div>
        </div>
        <div className="card-3d bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(59,130,246,0.2)] flex items-center justify-between sm:flex-col sm:justify-center text-center">
          <div className="text-left sm:text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider mb-1 text-blue-100 flex items-center gap-1">
              <span>📊</span> Avg. Confidence
            </span>
            <span className="text-2xl sm:text-3xl font-black drop-shadow-md">
              {authLogs.length > 0
                ? (
                    authLogs.reduce(
                      (sum, log) => sum + log.matchConfidence,
                      0,
                    ) / authLogs.length
                  ).toFixed(1)
                : 0}
              %
            </span>
          </div>
          <div className="text-4xl opacity-50 sm:hidden">📊</div>
        </div>
      </div>

      {/* Auth Logs Table */}
      {loading ? (
        <div className="text-center py-10 font-bold text-gray-500 animate-pulse">
          Loading authentication logs...
        </div>
      ) : (
        <div className="card-3d overflow-hidden border border-gray-100/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/70 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Match Result</th>
                  <th className="px-4 py-3 min-w-[150px]">Confidence Score</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {authLogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-8 text-gray-500 font-bold"
                    >
                      No authentication logs for today
                    </td>
                  </tr>
                ) : (
                  authLogs.map((log, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-800 font-black text-xs shadow-sm border border-indigo-200">
                            {log.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-gray-900">
                            {log.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-black text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg text-xs tracking-wide shadow-sm">
                          {log.student_id}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                          ✅ {log.matchResult}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner flex border border-gray-200/50">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${log.matchConfidence}%`,
                                backgroundColor:
                                  log.matchConfidence > 80
                                    ? '#10b981'
                                    : log.matchConfidence > 60
                                      ? '#f59e0b'
                                      : '#ef4444',
                              }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-black text-gray-700 w-10 text-right">
                            {log.matchConfidence.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-[10px] font-black tracking-wide flex items-center gap-1 shadow-inner border border-gray-200/50 w-fit">
                          <span>🕐</span> {log.time}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm border border-green-100/50">
                          ✅ Verified
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

export default FaceAuthStatus
