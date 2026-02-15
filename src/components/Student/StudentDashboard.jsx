import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import StudentHome from './StudentHome';
import MarkAttendance from './MarkAttendance';
import MyAttendance from './MyAttendance';
import StudentProfile from './StudentProfile';
import Instructions from './Instructions';
import '../Admin/ProSidebarStyles.css';

function StudentDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [collapsed, setCollapsed] = useState(false);

  const tabs = {
    home: { icon: '🏠', label: 'Dashboard' },
    mark: { icon: '📸', label: 'Mark Attendance' },
    attendance: { icon: '📝', label: 'My Attendance' },
    profile: { icon: '👤', label: 'My Profile' },
    instructions: { icon: 'ℹ️', label: 'Instructions' },
  };

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <StudentHome user={user} />;
      case 'mark':
        return <MarkAttendance user={user} />;
      case 'attendance':
        return <MyAttendance user={user} />;
      case 'profile':
        return <StudentProfile user={user} />;
      case 'instructions':
        return <Instructions />;
      default:
        return <StudentHome user={user} />;
    }
  };

  // Student icon positioning config (edit these values to control placement)
  const iconConfig = {
    align: 'center',    // 'left' | 'center' | 'right'
    size: 38,           // px (auto scales on retina)
    offsetX: 4,         // px (positive = move right, negative = move left)
    offsetY: 0          // px (positive = move down, negative = move up)
  };

  const alignClass =
    iconConfig.align === 'center'
      ? 'justify-center'
      : iconConfig.align === 'right'
      ? 'justify-end'
      : 'justify-start';

  // Calculate sidebar width based on collapsed state
  const sidebarWidth = collapsed ? 70 : 260;

  return (
    <div className="flex min-h-screen bg-gray-50 relative" style={{ paddingBottom: "70px" }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          collapsed={collapsed}
          width="260px"
          collapsedWidth="70px"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 999,
            border: "none",
            background:
              "linear-gradient(180deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%)",
          }}
        >
          <div className="px-3 py-3 border-b border-white/10 flex items-center justify-between">
            {collapsed ? (
              <div className={`flex items-center ${alignClass} w-full`}>
                <button
                  type="button"
                  onClick={() => setCollapsed(false)}
                  className="rounded-full bg-gradient-to-br from-green-500 to-emerald-600 
                             flex items-center justify-center text-white text-lg shadow-sm
                             hover:scale-105 transition-transform"
                  style={{
                    width: `${iconConfig.size}px`,
                    height: `${iconConfig.size}px`,
                    transform: `translate(${iconConfig.offsetX}px, ${iconConfig.offsetY}px)`
                  }}
                  title="Open sidebar"
                  aria-label="Open sidebar"
                >
                  👨‍🎓
                </button>
              </div>
            ) : (
              <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                🎓 Attendify Student
              </h2>
            )}

            {/* controls: keep arrow only when expanded */}
            <div className="flex items-center gap-2">
              {!collapsed && (
                <button
                  onClick={() => setCollapsed(true)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white text-xs hidden lg:flex"
                  aria-label="Collapse sidebar"
                  title="Collapse"
                >
                  ←
                </button>
              )}
            </div>
          </div>

          <div className="h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500" />

          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: 'transparent',
                color: 'white',
                padding: '10px 12px',
                margin: '4px 10px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateX(4px)',
                },
              }),
            }}
          >
            {Object.entries(tabs).map(([key, { icon, label }]) => (
              <MenuItem
                key={key}
                icon={<span className="text-base sm:text-lg">{icon}</span>}
                active={activeTab === key}
                onClick={() => handleTabClick(key)}
                style={
                  activeTab === key
                    ? {
                        background:
                          'linear-gradient(90deg, rgb(16, 185, 129), rgb(5, 150, 105))',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        transform: 'translateX(4px)',
                      }
                    : {}
                }
              >
                <span className="text-sm sm:text-base">{label}</span>
              </MenuItem>
            ))}
          </Menu>

          <div className="absolute bottom-4 left-0 right-0 px-3">
            <button
              onClick={onLogout}
              className="w-full px-3 py-2.5 text-sm rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 font-semibold 
                         shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30 hover:-translate-y-0.5 
                         transition-all duration-200 flex items-center justify-center gap-2 text-white"
            >
              <span>🚪</span>
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <div className="min-h-screen bg-gray-50">
          {/* ✅ ENHANCED: Better header with personalized dashboard title */}
          <header className="h-14 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
            {/* Left side: Personalized Dashboard Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                <span className="text-2xl">👨‍🎓</span>
                <span className="text-white font-bold text-base sm:text-lg">
                  {user.name.split(' ')[0]}'s Dashboard
                </span>
              </div>
              <span className="text-gray-300 hidden sm:inline">›</span>
              <span className="text-gray-700 font-medium text-sm hidden sm:inline">
                {tabs[activeTab].label}
              </span>
            </div>

            {/* Right side: Notification bell only */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="relative w-9 h-9 rounded-lg bg-gray-100 border border-gray-300 
                                 hover:bg-white hover:border-green-500 transition-all flex items-center justify-center">
                <span className="text-lg">🔔</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-600 
                                 rounded-full text-white text-xs font-bold flex items-center justify-center 
                                 border border-white">3</span>
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* ✅ Floating Bottom Navigation (Mobile Only) */}
      <nav className="floating-bottom-nav md:hidden lg:hidden">
        <button onClick={() => handleTabClick('home')}>
          🏠
          <span>Home</span>
        </button>

        <button onClick={() => handleTabClick('mark')}>
          📸
          <span>Mark</span>
        </button>

        <button onClick={() => handleTabClick('attendance')}>
          📝
          <span>Records</span>
        </button>

        <button onClick={() => handleTabClick('profile')}>
          👤
          <span>Profile</span>
        </button>

        <button onClick={onLogout}>
          🚪
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default StudentDashboard;
