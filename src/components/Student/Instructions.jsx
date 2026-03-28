import React from 'react';

function Instructions() {
  return (
    <div className="space-y-4 sm:space-y-5 pb-8">
      {/* Page Header */}
      <div className="relative h-28 sm:h-32 card-3d-modern overflow-hidden border-0 shadow-[0_10px_30px_rgba(245,158,11,0.15)] bg-gradient-to-br from-amber-400 to-orange-500 flex flex-col justify-center p-5 sm:p-6 text-white group">
        <div className="absolute top-[-50%] right-[-10%] w-40 h-40 rounded-full bg-white/20 blur-2xl pointer-events-none transition-colors"></div>
        <div className="absolute bottom-[-10%] left-[-10%] text-7xl opacity-30 pointer-events-none -rotate-12">ℹ️</div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black mb-1 drop-shadow-md tracking-tight flex items-center gap-3">
            <span className="p-1.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-inner">📖</span>
            Guidelines
          </h1>
          <p className="text-sm font-bold text-amber-50 uppercase tracking-wide drop-shadow-sm ml-1">
            Rules for successful marking
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Guidelines List */}
        <div className="card-3d-modern p-5 sm:p-6 border-l-4 border-l-blue-500">
          <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-xl shadow-inner border border-blue-100">📸</span>
            Face Scanning
          </h3>
          <ul className="space-y-3 font-bold text-gray-600">
            <li className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <span className="text-blue-500 font-black text-lg mt-0.5">✓</span>
              <span>Ensure <strong className="text-gray-900">good lighting</strong> - avoid dark rooms or backlighting</span>
            </li>
            <li className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <span className="text-blue-500 font-black text-lg mt-0.5">✓</span>
              <span>Face the camera <strong className="text-gray-900">directly</strong> - look straight at the lens</span>
            </li>
            <li className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <span className="text-blue-500 font-black text-lg mt-0.5">✓</span>
              <span>Keep distance between <strong className="text-gray-900">1-2 feet</strong> from camera</span>
            </li>
            <li className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <span className="text-blue-500 font-black text-lg mt-0.5">✓</span>
              <span>Remove glasses, masks, or heavy face coverings if possible</span>
            </li>
          </ul>
        </div>

        <div className="card-3d-modern p-5 sm:p-6 border-l-4 border-l-emerald-500">
          <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl shadow-inner border border-emerald-100">📍</span>
            Location Rules
          </h3>
          <ul className="space-y-3 font-bold text-gray-600">
            <li className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <span className="text-emerald-500 font-black text-lg mt-0.5">✓</span>
              <span>Must be <strong className="text-gray-900">inside campus geofence</strong> to mark presence</span>
            </li>
            <li className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <span className="text-emerald-500 font-black text-lg mt-0.5">✓</span>
              <span>Enable <strong className="text-gray-900">location services</strong> on your smartphone</span>
            </li>
            <li className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
              <span className="text-emerald-500 font-black text-lg mt-0.5">✓</span>
              <span>Allow the Application to access your <strong className="text-gray-900">GPS location</strong></span>
            </li>
          </ul>
        </div>

        <div className="card-3d-modern p-5 sm:p-6 border-l-4 border-l-rose-500">
          <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-lg shadow-inner border border-rose-100">⚠️</span>
            Avoid Mistakes
          </h3>
          <ul className="space-y-3 font-bold text-gray-600">
            <li className="flex items-start gap-3 bg-rose-50/30 p-3 rounded-xl border border-rose-100/50">
              <span className="text-rose-500 font-black text-xl mt-0.5 leading-none">×</span>
              <span>Do not use <strong className="text-gray-900">photos or videos</strong> - the system runs liveliness checks</span>
            </li>
            <li className="flex items-start gap-3 bg-rose-50/30 p-3 rounded-xl border border-rose-100/50">
              <span className="text-rose-500 font-black text-xl mt-0.5 leading-none">×</span>
              <span>Do not attempt to mark attendance from <strong className="text-gray-900">outside boundaries</strong></span>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="card-3d-modern p-5 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-200 shadow-none">
          <h3 className="text-base font-black text-gray-900 mb-2 flex items-center gap-2">
            <span>❓</span> Need Technical Help?
          </h3>
          <p className="text-sm font-bold text-gray-600 mb-0">
            If you face camera/location issues, please check your device permissions or contact administration.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
