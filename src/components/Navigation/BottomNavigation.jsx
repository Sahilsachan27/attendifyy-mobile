
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

const BottomNavigation = ({ userType = 'student' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [ripple, setRipple] = useState({ show: false, x: 0, y: 0, index: -1 });

  // Navigation items based on user type
  const studentNavItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/student/dashboard',
      icon: (active) => (
        <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.5"}>
          <path d="M3 9.5L12 3l9 6.5v10a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5V14h-4v5.5A1.5 1.5 0 018.5 21h-4A1.5 1.5 0 013 19.5v-10z"/>
        </svg>
      ),
    },
    {
      id: 'attendance',
      label: 'Attendance',
      path: '/student/mark-attendance',
      icon: (active) => (
        <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.5"}>
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
          <rect x="9" y="3" width="6" height="4" rx="1"/>
          <path d="M9 14l2 2 4-4"/>
        </svg>
      ),
    },
    {
      id: 'history',
      label: 'History',
      path: '/student/attendance-history',
      icon: (active) => (
        <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.5"}>
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 7v5l3 3"/>
        </svg>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/student/profile',
      icon: (active) => (
        <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.5"}>
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
        </svg>
      ),
    },
  ];

  const adminNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: (active) => (
        <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.5"}>
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      ),
    },
    {
      id: 'students',
      label: 'Students',
      path: '/admin/students',
      icon: (active) => (
        <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.5"}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
    },
    {
      id: 'records',
      label: 'Records',
      path: '/admin/attendance-records',
      icon: (active) => (
        <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.5"}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/admin/settings',
      icon: (active) => (
        <svg className="nav-icon" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.5"}>
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      ),
    },
  ];

  const navItems = userType === 'admin' ? adminNavItems : studentNavItems;

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => location.pathname.includes(item.path));
    if (currentIndex !== -1) {
      setActiveTab(currentIndex);
    }
  }, [location.pathname, navItems]);

  const handleNavClick = (index, path, event) => {
    // Create ripple effect
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setRipple({ show: true, x, y, index });
    setTimeout(() => setRipple({ show: false, x: 0, y: 0, index: -1 }), 500);

    setActiveTab(index);
    navigate(path);
  };

  return (
    <nav className="bottom-navigation">
      <div className="nav-container">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === index ? 'active' : ''}`}
            onClick={(e) => handleNavClick(index, item.path, e)}
            aria-label={item.label}
          >
            {/* Active Indicator */}
            <div className={`active-indicator ${activeTab === index ? 'show' : ''}`} />
            
            {/* Ripple Effect */}
            {ripple.show && ripple.index === index && (
              <span
                className="ripple"
                style={{ left: ripple.x, top: ripple.y }}
              />
            )}
            
            {/* Icon Container */}
            <div className="icon-container">
              {item.icon(activeTab === index)}
            </div>
            
            {/* Label */}
            <span className={`nav-label ${activeTab === index ? 'active' : ''}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
      
      {/* Safe area spacer for notched phones */}
      <div className="safe-area-spacer" />
    </nav>
  );
};

export default BottomNavigation;