import React from 'react'

function StudentProfile({ user }) {
  return (
    <div className="space-y-4 sm:space-y-5 pb-8">
      {/* Profile Header Card */}
      <div className="relative card-3d-modern overflow-hidden border-0 shadow-[0_15px_40px_rgba(99,102,241,0.15)] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 sm:p-8 pt-10 text-center">
        {/* Decorative Backgrounds */}
        <div className="absolute top-[-30%] right-[-10%] w-60 h-60 rounded-full bg-white/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Glowing Avatar */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-xl shadow-indigo-900/30 flex items-center justify-center text-indigo-600 text-5xl font-black mb-4 border-4 border-white transform transition-transform active:scale-95">
            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black leading-tight drop-shadow-md tracking-tight">
            {user.name}
          </h2>
          <span className="inline-flex px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mt-2 border border-white/40 shadow-inner">
            {user.department || 'Student'}
          </span>
        </div>
      </div>

      {/* Primary Details Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="card-3d-modern p-4 sm:p-5 flex flex-col items-center justify-center text-center">
          <span className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl mb-2 drop-shadow-sm border border-indigo-100">🆔</span>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Student ID</p>
          <p className="text-sm font-black text-gray-900 leading-none">{user.student_id || user.id}</p>
        </div>
        
        <div className="card-3d-modern p-4 sm:p-5 flex flex-col items-center justify-center text-center">
          <span className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center text-xl mb-2 drop-shadow-sm border border-pink-100">📚</span>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Year/Class</p>
          <p className="text-sm font-black text-gray-900 leading-none">Year {user.year || 'N/A'}</p>
        </div>
      </div>

      {/* Contact & Status Details */}
      <div className="card-3d-modern p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-black text-gray-900 flex items-center gap-2 drop-shadow-sm uppercase tracking-widest mb-2 border-b border-gray-100 pb-3">
          <span className="text-indigo-500">📎</span> Account Info
        </h3>
        
        <div className="flex items-center gap-4 bg-gray-50/70 p-4 rounded-2xl border border-gray-100 shadow-inner">
          <div className="text-2xl filter drop-shadow-sm shrink-0">📧</div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Contact Email</p>
            <p className="text-sm sm:text-base font-black text-gray-900 leading-none truncate">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-100 shadow-[0_2px_10px_rgba(16,185,129,0.05)]">
          <div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Face Profile Status</p>
            <p className="text-sm sm:text-base font-black text-emerald-800 leading-none">
              {user.face_registered ? 'Biometrics Registered' : 'Not Registered'}
            </p>
          </div>
          <div className="text-3xl filter drop-shadow-md shrink-0">
            {user.face_registered ? '✅' : '⚠️'}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200/60 shadow-inner relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 blur-sm pointer-events-none">🔒</div>
        <p className="text-xs font-black text-amber-900 mb-3 flex items-center gap-2 uppercase tracking-wide drop-shadow-sm">
          <span className="p-1 px-1.5 bg-amber-200/50 rounded-lg">🔒</span> Security Lock
        </p>
        <ul className="text-[10px] sm:text-[11px] font-bold text-amber-800/80 space-y-2 ml-1">
          <li className="flex gap-2.5 items-start">
            <span className="text-amber-500 mt-0.5">•</span> 
            Profile details are read-only to prevent unauthorized alterations.
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="text-amber-500 mt-0.5">•</span> 
            Biometric face data cannot be updated directly by students.
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="text-amber-500 mt-0.5">•</span> 
            Contact administration to request corrections to Roll numbers or IDs.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default StudentProfile
