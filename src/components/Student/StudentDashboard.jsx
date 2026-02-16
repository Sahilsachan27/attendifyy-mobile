import React, { useState } from 'react';
import StudentHome from './StudentHome';
import MarkAttendance from './MarkAttendance';
import MyAttendance from './MyAttendance';
import StudentProfile from './StudentProfile';

function StudentDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = {
    home: { icon: '🏠', label: 'Dashboard' },
    mark: { icon: '📸', label: 'Mark Attendance' },
    attendance: { icon: '📝', label: 'Records' },
    profile: { icon: '👤', label: 'Profile' },
  };

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <StudentHome user={user} />;
      case 'mark': return <MarkAttendance user={user} />;
      case 'attendance': return <MyAttendance user={user} />;
      case 'profile': return <StudentProfile user={user} />;
      default: return <StudentHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ✅ FIXED: Header matching Landing Page style */}
      <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50" style={{ paddingTop: "32px" }}>
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left: 3D Logo + ATTENDIFY (same as landing page) */}
          <div className="flex items-center gap-2">
            <span className="block">
              <svg width="32" height="32" viewBox="0 0 38 38" fill="none" style={{ filter: 'drop-shadow(0 2px 8px #6366f1)' }}>
                <ellipse cx="19" cy="32" rx="14" ry="5" fill="#6366f1" opacity="0.15" />
                <path d="M19 5L35 13L19 21L3 13L19 5Z" fill="url(#grad1)" stroke="#6366f1" strokeWidth="2" />
                <path d="M19 21V32" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad1" x1="19" y1="5" x2="19" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span style={{
              fontWeight: 900,
              fontSize: "28px",
              letterSpacing: "-1px",
              fontFamily: "Poppins, Inter, sans-serif",
              cursor: "pointer",
              background: "linear-gradient(135deg, #f59e0b, #ef4444, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 6px 18px rgba(99,102,241,0.25)",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
            }}>
              Student Dashboard
            </span>
          </div>

          {/* Right: Notification */}
          <button className="relative w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center active:scale-95 transition-transform">
            <span className="text-lg">🔔</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full text-white text-xs font-bold flex items-center justify-center border border-white">3</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4" style={{ paddingTop: "60px" }}>
        {renderContent()}
      </main>

      {/* Floating Bottom Navigation - 4 buttons + Logout */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center px-2 py-3">
          {Object.entries(tabs).map(([key, { icon, label }]) => (
            <button
              key={key}
              onClick={() => handleTabClick(key)}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all ${
                activeTab === key
                  ? 'bg-green-100 text-green-600 scale-105'
                  : 'text-gray-600 active:scale-95'
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-semibold">{label.split(' ')[0]}</span>
            </button>
          ))}
          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-rose-600 active:scale-95 transition-all"
          >
            <span className="text-2xl">🚪</span>
            <span className="text-xs font-semibold">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default StudentDashboard;
