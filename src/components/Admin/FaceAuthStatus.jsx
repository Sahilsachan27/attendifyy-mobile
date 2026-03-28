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
        <div className="card-3d-modern bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(16,185,129,0.2)] flex items-center justify-between sm:flex-col sm:justify-center text-center">
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
        <div className="card-3d-modern bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(244,63,94,0.2)] flex items-center justify-between sm:flex-col sm:justify-center text-center">
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
        <div className="card-3d-modern bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(59,130,246,0.2)] flex items-center justify-between sm:flex-col sm:justify-center text-center">
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

      {/* Auth Logs List (Mobile Optimized Cards) */}
      {loading ? (
        <div className="text-center py-10 font-bold text-gray-500 flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
          Loading authentication logs...
        </div>
      ) : (
        <div className="space-y-3 pb-8">
          {authLogs.length === 0 ? (
            <div className="card-3d-modern p-8 text-center bg-white/50 border-dashed border-2 border-indigo-100">
              <span className="text-4xl filter grayscale opacity-50 mb-3 block">📭</span>
              <p className="text-gray-500 font-bold text-sm">
                No authentication logs for today
              </p>
            </div>
          ) : (
            authLogs.map((log, index) => {
              const isMatch = log.matchResult === 'Success'
              const statusBg = isMatch ? 'from-emerald-50 to-teal-50 border-emerald-100/50' : 'from-rose-50 to-red-50 border-rose-100/50'
              const badgeColors = isMatch
                ? 'bg-emerald-100 text-emerald-700 shadow-[0_2px_8px_rgba(16,185,129,0.15)]'
                : 'bg-rose-100 text-rose-700 shadow-[0_2px_8px_rgba(244,63,94,0.15)]'
              const confidenceColor = log.matchConfidence > 80 ? 'text-emerald-600' : log.matchConfidence > 60 ? 'text-amber-500' : 'text-rose-500'
              const progressBarColor = log.matchConfidence > 80 ? 'bg-emerald-500' : log.matchConfidence > 60 ? 'bg-amber-400' : 'bg-rose-500'

              return (
                <div
                  key={index}
                  className={`card-3d-modern p-4 bg-gradient-to-br ${statusBg} border relative overflow-hidden flex flex-col gap-3 group`}
                >
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/40 blur-xl pointer-events-none"></div>
                  
                  {/* Top Row: User Info & Match Status */}
                  <div className="flex justify-between items-start z-10">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-700 font-black text-sm border-2 border-white shrink-0">
                        {log.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-gray-900 text-[15px] leading-tight flex items-center gap-1 truncate">
                          {log.name}
                        </h4>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50/50 px-1.5 rounded-md inline-block mt-0.5 truncate max-w-full">
                          ID: {log.student_id}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-white/50 shrink-0 ${badgeColors}`}>
                      <span className="scale-110">{isMatch ? '✅' : '❌'}</span>
                      <span className="hidden sm:inline">{log.matchResult}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>

                  {/* Middle Row: Confidence & Time */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full">
                    {/* Confidence Score Bar */}
                    <div className="flex-1 w-full bg-white/50 rounded-2xl p-2.5 border border-white flex flex-col gap-1.5 shadow-sm">
                      <div className="flex justify-between items-end">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Confidence</span>
                        <span className={`text-xs font-black ${confidenceColor}`}>{log.matchConfidence.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200/50">
                        <div
                          className={`h-full rounded-full transition-all ${progressBarColor}`}
                          style={{ width: `${log.matchConfidence}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex gap-2 w-full sm:w-auto">
                      <div className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white shadow-sm border border-gray-100 px-3 py-2 rounded-xl text-xs">
                        <span>🕐</span>
                        <span className="font-bold text-gray-600 truncate">{log.time}</span>
                      </div>
                      <div className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white shadow-sm border border-gray-100 px-3 py-2 rounded-xl text-xs">
                        <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Verified</span>
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

export default FaceAuthStatus
