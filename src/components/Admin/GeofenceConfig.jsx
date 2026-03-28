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
          import.meta.env.VITE_REACT_APP_API_URL ||
          'https://api.attendifyy.in/api'
        }/admin/geofence-config`,
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
          import.meta.env.VITE_REACT_APP_API_URL ||
          'https://api.attendifyy.in/api'
        }/admin/geofence-config`,
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
      <div className="space-y-4 max-w-2xl mx-auto flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin shadow-lg" />
        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2 animate-pulse">
          Loading Geofence Config...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto pb-8">
      {/* Header Area */}
      <div className="flex flex-col gap-2 mb-2">
        <h2 className="text-3xl font-black text-gray-900 drop-shadow-sm leading-tight flex items-center gap-3">
          <span className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
            🌍
          </span>
          Geofencing
        </h2>
        <p className="text-gray-500 font-bold text-sm tracking-wide">
          Restrict attendance to physical campus boundaries
        </p>
      </div>

      {/* Hero Status Card */}
      <div className={`card-3d-modern p-6 relative overflow-hidden transition-all duration-500 ${
        config.enabled ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_10px_30px_rgba(16,185,129,0.2)]' : 'bg-gradient-to-br from-rose-500 to-red-600 shadow-[0_10px_30px_rgba(244,63,94,0.2)]'
      }`}>
        <div className="absolute top-[-50%] right-[-20%] w-60 h-60 rounded-full bg-white/20 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex items-center justify-between text-white mb-6">
          <h3 className="text-lg font-black tracking-wide drop-shadow-md">
            System Status
          </h3>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 shadow-inner">
            <div className={`w-2.5 h-2.5 rounded-full ${config.enabled ? 'bg-emerald-300 animate-pulse' : 'bg-rose-300'}`}></div>
            <span className="text-xs font-black uppercase tracking-widest text-white drop-shadow-sm">
              {config.enabled ? 'Active' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 text-center flex flex-col items-center justify-center">
            <span className="text-2xl mb-1 filter drop-shadow-md">📍</span>
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-0.5">Latitude</span>
            <span className="text-sm font-black text-white">{config.latitude}°</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 text-center flex flex-col items-center justify-center">
            <span className="text-2xl mb-1 filter drop-shadow-md">📍</span>
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-0.5">Longitude</span>
            <span className="text-sm font-black text-white">{config.longitude}°</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 text-center flex flex-col items-center justify-center">
            <span className="text-2xl mb-1 filter drop-shadow-md">📏</span>
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-0.5">Radius</span>
            <span className="text-sm font-black text-white">{config.radius}m</span>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <form onSubmit={handleSave} className="card-3d-modern p-6 space-y-6 bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        
        {/* Master Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner cursor-pointer" onClick={() => setConfig({...config, enabled: !config.enabled})}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm ${config.enabled ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>
              {config.enabled ? '🛡️' : '⚠️'}
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-900 leading-none mb-1">Enforce Geofencing</h4>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Require location match</p>
            </div>
          </div>
          <div className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out shadow-inner border border-gray-200 ${config.enabled ? 'bg-emerald-500 border-emerald-600' : 'bg-gray-300'}`}>
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${config.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>

        {/* Coordinates Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-gray-900 flex items-center gap-2 drop-shadow-sm uppercase tracking-widest">
            <span className="text-indigo-500">🎯</span> Target Coordinates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group">
              <label className="text-[10px] sm:text-xs font-bold text-indigo-500 uppercase tracking-widest ml-1 block mb-1.5 transition-colors">
                Latitude
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 font-black">X</div>
                <input
                  type="number"
                  name="latitude"
                  value={config.latitude}
                  onChange={handleInputChange}
                  step="0.000001"
                  required
                  placeholder="28.613900"
                  className="input-3d pl-8 bg-gray-50/50 group-hover:bg-white focus:bg-white transition-colors border-gray-200"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-[10px] sm:text-xs font-bold text-indigo-500 uppercase tracking-widest ml-1 block mb-1.5 transition-colors">
                Longitude
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 font-black">Y</div>
                <input
                  type="number"
                  name="longitude"
                  value={config.longitude}
                  onChange={handleInputChange}
                  step="0.000001"
                  required
                  placeholder="77.209000"
                  className="input-3d pl-8 bg-gray-50/50 group-hover:bg-white focus:bg-white transition-colors border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Radius Slider Section */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-2 drop-shadow-sm uppercase tracking-widest">
              <span className="text-indigo-500">⭕</span> Perimeter Radius
            </h3>
            <div className="bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100 shadow-sm">
              <span className="text-sm font-black text-indigo-700">{config.radius}</span>
              <span className="text-[10px] font-bold text-indigo-500 ml-1 uppercase">meters</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-inner">
            <input
              type="range"
              name="radius"
              value={config.radius}
              onChange={handleInputChange}
              min="50"
              max="5000"
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600 outline-none transition-colors border border-gray-300 shadow-inner"
            />
            <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest px-1">
              <span>50m (Strict)</span>
              <span>5000m (City-wide)</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-black flex items-center justify-center gap-2 border border-emerald-200 shadow-sm animate-fade-in">
            <span>✨</span> {message}
          </div>
        )}
        {error && (
          <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl text-sm font-black flex items-center justify-center gap-2 border border-rose-200 shadow-sm animate-fade-in">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full relative overflow-hidden group bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-lg p-4 rounded-2xl shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_10px_25px_rgba(99,102,241,0.4)] transition-all duration-300 active:scale-95 active:shadow-inner flex items-center justify-center gap-3"
          >
            <div className="absolute top-[-50%] left-[-10%] w-20 h-20 rounded-full bg-white/20 blur-xl pointer-events-none group-active:bg-transparent transition-colors"></div>
            <span className="text-xl filter drop-shadow-sm">💾</span>
            <span className="tracking-wide drop-shadow-sm">Save Configuration</span>
          </button>
        </div>
      </form>

      {/* Helper Box */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
        <h4 className="text-[11px] font-black text-blue-800 mb-3 flex items-center gap-2 uppercase tracking-wider">
          <span className="bg-blue-200/50 p-1.5 rounded-lg">💡</span> How to configure
        </h4>
        <ol className="text-[11px] font-bold text-blue-700/80 space-y-2 ml-1 list-decimal list-inside">
          <li className="pl-1">Open <span className="font-black text-blue-900">Google Maps</span> on your device</li>
          <li className="pl-1">Long-press your campus center point</li>
          <li className="pl-1">Copy the <span className="font-black text-blue-900">X, Y coordinates</span></li>
          <li className="pl-1">Paste into the Target Coordinates above</li>
        </ol>
      </div>
    </div>
  )
}

export default GeofenceConfig
