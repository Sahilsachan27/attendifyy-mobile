import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import LandingPage from './components/Landing/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import StudentDashboard from './components/Student/StudentDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Configure StatusBar for native platforms
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: false }); // ✅ Prevents overlap
      StatusBar.setBackgroundColor({ color: '#6366f1' }); // Match your theme
      StatusBar.setStyle({ style: Style.Light }); // White icons for dark background
    }
  }, []);

  // decode JWT payload safely
  const decodeToken = (token) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      return payload;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token) {
      // no token -> ensure cleared
      localStorage.removeItem('user');
      setUser(null);
      return;
    }

    const payload = decodeToken(token);
    if (!payload || (payload.exp && Date.now() / 1000 > payload.exp)) {
      // token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      return;
    }

    // token valid: prefer stored user object, fallback to token payload (if it contains user fields)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // some backends include user info in token (sub/name/email). use safe fallback.
      const derivedUser = {
        name: payload.name || payload.sub || '',
        role: payload.role || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'student',
        student_id: payload.student_id || payload.sub || undefined,
      };
      setUser(derivedUser);
    }

    // schedule automatic logout when token expires
    if (payload.exp) {
      const ttl = payload.exp * 1000 - Date.now();
      if (ttl > 0) {
        const t = setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/';
        }, ttl);
        return () => clearTimeout(t);
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    // clear auth and redirect to landing page
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    // ensure app shows landing page (works from any route)
    window.location.href = '/';
  };

  return (
    <HashRouter>
      <div className="App">
        <Routes>

  {/* Open Student Dashboard directly */}
  <Route
    path="/"
    element={
      <StudentDashboard
        user={{ name: "Test Student", role: "student", student_id: "STU001" }}
        onLogout={() => {}}
      />
    }
  />

  {/* Admin Dashboard (optional route) */}
  <Route
    path="/admin"
    element={
      <AdminDashboard
        user={{ name: "Admin User", role: "admin" }}
        onLogout={() => {}}
      />
    }
  />

</Routes>

      </div>
    </HashRouter>
  );
}

export default App;
