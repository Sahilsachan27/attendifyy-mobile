import React, { useState } from 'react'
import { authAPI } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '', // Student ID / Admin ID / Email
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.login(credentials)
      const { token, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      onLogin(user)
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background relative overflow-hidden px-4 py-8">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 rounded-full bg-gradient-1 opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 rounded-full bg-gradient-2 opacity-20 blur-3xl pointer-events-none"></div>

      <div className="card-3d w-full max-w-[400px] p-8 relative z-10 mx-auto bg-white/80 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight drop-shadow-sm mb-2">
            🎓 Attendify
          </h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
            AI-Powered System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>📧 Student ID / Email</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter Student ID (e.g., stu001) or Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>🔒 Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm font-semibold shadow-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-3d w-full py-4 mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-black text-lg shadow-[0_8px_20px_rgba(99,102,241,0.4)]"
            disabled={loading}
          >
            {loading ? '⏳ Logging in...' : '🚀 Login to Account'}
          </button>
        </form>

        {/* Actions: Login or Register */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 font-medium text-sm mb-4">
            New to Attendify?
          </p>
          <button
            className="btn-3d w-full py-4 bg-indigo-50 text-indigo-700 rounded-2xl font-bold border border-indigo-100/50"
            type="button"
            onClick={() => navigate('/register')}
          >
            ✍️ Create Student Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
