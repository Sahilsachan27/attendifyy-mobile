import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Dashboard from './Dashboard';
import StudentRecords from './StudentRecords';
import RegisterStudent from './RegisterStudent';
import AttendanceRecords from './AttendanceRecords';
import FaceAuthStatus from './FaceAuthStatus';
import GeofenceConfig from './GeofenceConfig';
import TrainModel from './TrainModel';
import AdminProfile from './AdminProfile';
import './ProSidebarStyles.css';

function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const tabs = {
    dashboard: { icon: '📊', label: 'Dashboard' },
    students: { icon: '👥', label: 'Student Records' },
    register: { icon: '➕', label: 'Register Student' },
    attendance: { icon: '📋', label: 'Attendance Records' },
    faceauth: { icon: '🎭', label: 'Face Auth Status' },
    geofence: { icon: '🌍', label: 'Geofence Config' },
    train: { icon: '🤖', label: 'Train Model' },
    profile: { icon: '👤', label: 'Profile' },
  };

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  // ✅ NEW: Listen for navigation events from Dashboard quick actions
  useEffect(() => {
    const handleNavigate = (event) => {
      const tabKey = event.detail;
      if (tabs[tabKey]) {
        setActiveTab(tabKey);
      }
    };

    window.addEventListener('navigateToTab', handleNavigate);
    return () => window.removeEventListener('navigateToTab', handleNavigate);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'students': return <StudentRecords />;
      case 'register': return <RegisterStudent />;
      case 'attendance': return <AttendanceRecords />;
      case 'faceauth': return <FaceAuthStatus />;
      case 'geofence': return <GeofenceConfig />;
      case 'train': return <TrainModel />;
      case 'profile': return <AdminProfile user={user} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative" style={{ paddingBottom: "70px" }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          collapsed={collapsed}
          backgroundColor="rgb(15, 23, 42)"
          width="260px"
          collapsedWidth="70px"
          className="h-screen shadow-2xl"
          style={{
            border: 'none',
            background: 'linear-gradient(180deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%)',
          }}
        >
          {/* Sidebar Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            {!collapsed && (
              <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ✨ Admin Portal
              </h2>
            )}
            {/* Sidebar controls: arrow when open, admin icon when collapsed */}
            <div>
              {!collapsed ? (
                <button
                  onClick={() => setCollapsed(true)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white text-sm hidden lg:flex"
                  aria-label="Collapse sidebar"
                  title="Collapse"
                >
                  ←
                </button>
              ) : (
                // Admin icon with configurable size and position
                <div className="flex w-full justify-center items-center">
                  <button
                    onClick={() => setCollapsed(false)}
                    className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-sm hidden lg:flex"
                    aria-label="Open sidebar"
                    title="Open sidebar"
                    style={{
                      width: '44px',      // Change size here (e.g. '44px')
                      height: '44px',     // Change size here
                      fontSize: '2rem',   // Change icon size here
                      transform: 'translate(0px, 0px)' // Change position (x, y)
                    }}
                  >
                    🛡️
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Top Gradient Bar */}
          <div className="h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Menu Items */}
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: active ? 'transparent' : 'transparent',
                color: 'white',
                padding: '10px 16px',
                margin: '4px 12px',
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
                icon={<span className="text-lg">{icon}</span>}
                active={activeTab === key}
                onClick={() => handleTabClick(key)}
                style={
                  activeTab === key
                    ? {
                        background: 'linear-gradient(90deg, rgb(99, 102, 241), rgb(139, 92, 246))',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                        transform: 'translateX(4px)',
                      }
                    : {}
                }
              >
                {label}
              </MenuItem>
            ))}
          </Menu>

          {/* Logout Button */}
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
        {/* Top Navigation Bar */}
        <header className="h-14 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          {/* ✅ ENHANCED: Better styled header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
              <span className="text-xl">🛡️</span>
              <span className="text-white font-bold text-sm sm:text-base">Admin Dashboard</span>
            </div>
            <span className="text-gray-300 hidden sm:inline">›</span>
            <span className="text-gray-700 font-medium text-sm hidden sm:inline">{tabs[activeTab].label}</span>
          </div>

          {/* ✅ KEPT: Notification bell */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative w-9 h-9 rounded-lg bg-gray-100 border border-gray-300 
                               hover:bg-white hover:border-indigo-500 transition-all flex items-center justify-center">
              <span className="text-lg">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-600 
                               rounded-full text-white text-xs font-bold flex items-center justify-center 
                               border border-white">3</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">{renderContent()}</main>
      </div>

      {/* ✅ Floating Bottom Navigation (Mobile Only) */}
      <nav className="floating-bottom-nav md:hidden lg:hidden">
        <button onClick={() => handleTabClick('dashboard')}>
          📊
          <span>Home</span>
        </button>

        <button onClick={() => handleTabClick('students')}>
          👥
          <span>Students</span>
        </button>

        <button onClick={() => handleTabClick('profile')}>
          📋
          <span>profile</span>
        </button>

        <button onClick={() => handleTabClick('geofence')}>
          🤖
          <span>geofence</span>
        </button>

        <button onClick={onLogout}>
          🚪
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default AdminDashboard;
