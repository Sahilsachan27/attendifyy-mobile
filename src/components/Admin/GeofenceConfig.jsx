import React, { useState, useEffect } from 'react'
import './AdminStyles.css'

function GeofenceConfig() {
  const [config, setConfig] = useState({
    latitude: '28.6139',
    longitude: '77.2090',
    radius: '500',
    enabled: true,
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:5000'
        }/api/admin/geofence-config`,
      )
      if (response.ok) {
        const data = await response.json()
        setConfig(data)
      }
    } catch (err) {
      console.error('Failed to fetch config:', err)
      setError('Failed to load geofencing configuration.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setConfig({
      ...config,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:5000'
        }/api/admin/geofence-config`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(config),
        },
      )

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ Geofence configuration saved successfully!')
        setConfig(data.config)
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error(data.error || 'Failed to update configuration')
      }
    } catch (err) {
      setError(`❌ ${err.message}`)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 drop-shadow-sm">
          🌍 Geofence Config
        </h2>
        <div className="card-3d p-5 sm:p-6 text-center">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            ⏳ Loading configuration...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 drop-shadow-sm">
          🌍 Geofence Config
        </h2>
      </div>

      {/* Current Status */}
      <div className="card-3d p-5 sm:p-6 mb-4 relative overflow-hidden">
        {/* Background Blob */}
        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 rounded-full bg-gradient-1 opacity-10 blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100 relative z-10">
          <h3 className="text-lg font-black text-gray-900 drop-shadow-sm">
            Current Status
          </h3>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-inner border ${
              config.enabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            {config.enabled ? '✅ Active' : '❌ Inactive'}
          </span>
        </div>
        <div className="grid gap-3 relative z-10">
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <span>📍</span> Latitude
            </span>
            <span className="text-sm font-black text-gray-900 leading-none">
              {config.latitude}°
            </span>
          </div>
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <span>📍</span> Longitude
            </span>
            <span className="text-sm font-black text-gray-900 leading-none">
              {config.longitude}°
            </span>
          </div>
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <span>📏</span> Radius
            </span>
            <span className="text-sm font-black text-indigo-600 leading-none">
              {config.radius} meters
            </span>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <form onSubmit={handleSave} className="card-3d p-5 sm:p-6 space-y-5">
        <h3 className="text-lg font-black text-gray-900 mb-2 drop-shadow-sm flex items-center gap-2">
          ⚙️ Settings
        </h3>

        <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="enabled"
              checked={config.enabled}
              onChange={handleInputChange}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 transition-all"
            />
            <span className="text-sm font-bold text-gray-900 leading-tight">
              {config.enabled ? 'Geofencing Enabled' : 'Geofencing Disabled'}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              📍 Campus Latitude
            </label>
            <input
              type="number"
              name="latitude"
              value={config.latitude}
              onChange={handleInputChange}
              step="0.000001"
              required
              placeholder="28.6139"
              className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
            />
            <p className="text-[10px] font-bold text-gray-400 ml-1 mt-1 uppercase tracking-wide">
              Example: 28.6139 (New Delhi)
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              📍 Campus Longitude
            </label>
            <input
              type="number"
              name="longitude"
              value={config.longitude}
              onChange={handleInputChange}
              step="0.000001"
              required
              placeholder="77.2090"
              className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
            />
            <p className="text-[10px] font-bold text-gray-400 ml-1 mt-1 uppercase tracking-wide">
              Example: 77.2090 (New Delhi)
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-end mb-1">
            <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              📏 Allowed Radius
            </label>
            <span className="text-sm font-black text-indigo-600">
              {config.radius} m
            </span>
          </div>
          <input
            type="number"
            name="radius"
            value={config.radius}
            onChange={handleInputChange}
            min="50"
            max="5000"
            required
            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner mb-3"
          />
          <input
            type="range"
            name="radius"
            value={config.radius}
            onChange={handleInputChange}
            min="50"
            max="5000"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 outline-none hover:bg-gray-300 transition-colors"
          />
          <p className="text-[10px] font-bold text-gray-400 ml-1 mt-2 uppercase tracking-wide text-center">
            Students must be within {config.radius}m to mark attendance
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50/80 border border-blue-200 rounded-2xl p-5 relative shadow-inner">
          <p className="text-[11px] font-black text-blue-800 mb-3 flex items-center gap-2 uppercase tracking-wider">
            <span>ℹ️</span> Find Campus Coordinates
          </p>
          <ol className="text-[11px] font-bold text-blue-700/80 space-y-1.5 ml-1 list-decimal list-inside">
            <li>Open Google Maps on browser/app</li>
            <li>Long-press or right-click your campus</li>
            <li>Copy the coordinates shown</li>
            <li>Paste them in the fields above</li>
          </ol>
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
            className="btn-3d w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
          >
            💾 Save Configuration
          </button>
        </div>
      </form>
    </div>
  )
}

export default GeofenceConfig
