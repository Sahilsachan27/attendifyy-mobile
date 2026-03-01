import React, { useState } from 'react'
import './AdminStyles.css'

function AdminProfile({ user }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('❌ New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError('❌ Password must be at least 6 characters')
      return
    }

    try {
      // Here you would call your API to change password
      setMessage('✅ Password changed successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setError('❌ Failed to change password')
    }
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 drop-shadow-sm">
          👤 Admin Profile
        </h2>
      </div>

      {/* Profile Info Card */}
      <div className="card-3d p-6 relative overflow-hidden mb-4">
        {/* Background Blob */}
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 rounded-full bg-gradient-1 opacity-10 blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-5 relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-1 flex items-center justify-center text-white text-3xl font-black shadow-[0_8px_20px_rgba(99,102,241,0.3)] border-4 border-white flex-shrink-0">
            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-xl font-black text-gray-900 drop-shadow-sm leading-tight truncate">
              {user.name}
            </h3>
            <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mt-1 flex items-center gap-1.5 truncate">
              <span>🔐</span> System Administrator
            </p>
            <p className="text-[10px] text-gray-400 font-bold mt-1.5 flex items-center gap-1 truncate">
              <span>📧</span> {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="card-3d p-5 sm:p-6 mb-4">
        <h3 className="text-lg font-black text-gray-900 mb-4 drop-shadow-sm flex items-center gap-2">
          📋 Account Details
        </h3>
        <div className="grid gap-3 relative z-10">
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Name
            </span>
            <span className="text-sm font-black text-gray-900">
              {user.name}
            </span>
          </div>
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Email
            </span>
            <span className="text-sm font-black text-gray-900 break-all">
              {user.email}
            </span>
          </div>
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Role
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-indigo-100 shadow-sm">
              Administrator
            </span>
          </div>
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Status
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-100 shadow-sm">
              ✅ Active
            </span>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="card-3d p-5 sm:p-6 mb-4">
        <h3 className="text-lg font-black text-gray-900 mb-4 drop-shadow-sm flex items-center gap-2">
          🔒 Change Password
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              required
              minLength="6"
              className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              required
              minLength="6"
              className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
            />
            <p className="text-[10px] font-bold text-gray-400 ml-1 mt-1 uppercase tracking-wide">
              Minimum 6 characters
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              required
              minLength="6"
              className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {message && (
            <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-xl text-sm font-bold flex items-center gap-2 border border-green-100 whitespace-pre-wrap">
              ✨ {message}
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-100">
              ⚠️ {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="btn-3d w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-2 hover:bg-gray-800"
            >
              🔄 Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Security Tips */}
      <div className="mt-6 bg-amber-50/80 border border-amber-200 rounded-2xl p-5 relative shadow-inner">
        <p className="text-[11px] font-black text-amber-800 mb-3 flex items-center gap-2 uppercase tracking-wider">
          <span>🛡️</span> Security Tips
        </p>
        <ul className="text-[11px] font-bold text-amber-700/80 space-y-1.5 ml-1 list-none">
          <li className="flex gap-2">
            <span>•</span> Use a strong password with letters, numbers, and
            symbols
          </li>
          <li className="flex gap-2">
            <span>•</span> Don't share your admin credentials with anyone
          </li>
          <li className="flex gap-2">
            <span>•</span> Change your password regularly (every 3 months)
          </li>
          <li className="flex gap-2">
            <span>•</span> Enable two-factor authentication if available
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminProfile
