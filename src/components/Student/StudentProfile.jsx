import React from 'react'

function StudentProfile({ user }) {
  return (
    <div className="space-y-5">
      <div className="card-3d p-6 relative overflow-hidden">
        {/* Background Blob */}
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 rounded-full bg-gradient-1 opacity-10 blur-2xl pointer-events-none"></div>

        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3 drop-shadow-sm relative z-10">
          👤 My Profile
        </h2>

        {/* Profile Header */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-100 relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-1 flex items-center justify-center text-white text-3xl font-black shadow-[0_8px_20px_rgba(99,102,241,0.3)] border-4 border-white">
            {user.name ? user.name.charAt(0) : '?'}
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 drop-shadow-sm leading-tight">
              {user.name}
            </h3>
            <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mt-1">
              {user.department || 'Student'}
            </p>
            <p className="text-[10px] text-gray-400 font-bold mt-1.5 flex items-center gap-1">
              <span>🗓️</span> {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Profile Details (Read-Only) */}
        <div className="space-y-4 relative z-10">
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner flex items-center gap-4">
            <div className="text-3xl filter drop-shadow-sm">🆔</div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                Student ID
              </p>
              <p className="text-base font-black text-gray-900 leading-none">
                {user.student_id || user.id}
              </p>
            </div>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner flex items-center gap-4">
            <div className="text-3xl filter drop-shadow-sm">📧</div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                Email Address
              </p>
              <p className="text-base font-black text-gray-900 leading-none">
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Department
              </p>
              <p className="text-sm font-black text-gray-900 leading-tight">
                {user.department || 'Not Set'}
              </p>
            </div>

            <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Year / Class
              </p>
              <p className="text-sm font-black text-gray-900 leading-tight">
                Year {user.year || 'N/A'}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-100 shadow-inner flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">
                Face Registration
              </p>
              <p className="text-sm font-black text-emerald-800 leading-tight">
                {user.face_registered ? 'Registered' : 'Not Registered'}
              </p>
            </div>
            <div className="text-4xl filter drop-shadow-sm">✅</div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-amber-50/80 border border-amber-200 rounded-2xl p-5 relative z-10 shadow-inner">
          <p className="text-[11px] font-black text-amber-800 mb-3 flex items-center gap-2 uppercase tracking-wider">
            <span>🔒</span> Security Notice
          </p>
          <ul className="text-[11px] font-bold text-amber-700/80 space-y-1.5 ml-1">
            <li className="flex gap-2">
              <span>•</span> Profile details are read-only to prevent misuse
            </li>
            <li className="flex gap-2">
              <span>•</span> Contact admin for any profile updates
            </li>
            <li className="flex gap-2">
              <span>•</span> Face data cannot be edited by students
            </li>
            <li className="flex gap-2">
              <span>•</span> Roll number changes require admin approval
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
