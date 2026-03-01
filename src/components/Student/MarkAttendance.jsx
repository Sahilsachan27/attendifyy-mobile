import React, { useState, useRef, useEffect } from 'react'
import Webcam from 'react-webcam'
import { studentAPI } from '../../services/api'
import './StudentStyles.css'

function MarkAttendance({ user }) {
  const webcamRef = useRef(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [capturing, setCapturing] = useState(false)
  const [location, setLocation] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [supportsCamera, setSupportsCamera] = useState(true)
  const [fileImage, setFileImage] = useState(null) // mobile captured image
  const [showFileInput, setShowFileInput] = useState(false) // NEW

  useEffect(() => {
    // Auto-get location on component mount
    getLocation()

    // Detect camera support
    setSupportsCamera(
      !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    )

    // Cleanup: Turn off camera when component unmounts
    return () => {
      setCameraActive(false)
    }
  }, [])

  const getLocation = () => {
    setMessage('📍 Getting your location...')
    setError('')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setMessage('✅ Location acquired! Ready to mark attendance.')
          setStep(2)
          setError('')
        },
        (err) => {
          setError(
            '❌ Location access denied. Please enable location services.',
          )
          setMessage('')
          setStep(1)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    } else {
      setError('❌ Geolocation is not supported by your browser.')
      setStep(1)
    }
  }

  const toggleCamera = () => {
    setCameraActive(!cameraActive)
    if (!cameraActive) {
      setMessage('📸 Camera activated! Position your face clearly.')
    } else {
      setMessage('📷 Camera deactivated.')
    }
  }

  // Handle file input (mobile photo)
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setFileImage(reader.result) // data URL
      setMessage('📸 Photo selected. Ready to mark attendance.')
      setError('')
      setStep(2)
    }
    reader.onerror = () => setError('Failed to read selected file')
    reader.readAsDataURL(file)
  }

  const markAttendance = async (imageOverride) => {
    if (!location) {
      setError('❌ Please allow location access first')
      return
    }

    // If called with override (file input), use that, else use webcam screenshot
    const imageSrc =
      imageOverride ||
      (webcamRef.current ? webcamRef.current.getScreenshot() : null) ||
      fileImage
    if (!imageSrc) {
      setError('❌ No image available. Activate camera or select a photo.')
      return
    }

    if (!cameraActive && !imageSrc) {
      setError('❌ Please activate the camera first or select a photo')
      return
    }

    setLoading(true)
    setStep(3)
    setMessage('📸 Capturing your face...')
    setError('')

    try {
      // Use imageSrc for upload
      console.log('📤 Sending attendance request:', {
        student_id: user.student_id || user.id,
        latitude: location.latitude,
        longitude: location.longitude,
        imageSize: imageSrc.length,
      })

      const studentId = user.student_id || user.id
      const response = await studentAPI.markAttendance({
        student_id: studentId,
        image: imageSrc,
        latitude: location.latitude,
        longitude: location.longitude,
      })

      // Success! Auto-close camera after marking attendance
      setTimeout(() => {
        setCameraActive(false)
        setMessage('✅ Attendance marked successfully! Camera closed.')
      }, 2000)
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to mark attendance'
      console.error('❌ Attendance error:', errorMsg)

      // Provide helpful error messages
      if (errorMsg.includes('outside campus')) {
        setError(
          `❌ ${errorMsg}\n📍 Please make sure you are inside campus boundaries.`,
        )
      } else if (
        errorMsg.includes('Face not matched') ||
        errorMsg.includes('No face detected')
      ) {
        setError(
          `❌ ${errorMsg}\n💡 Tips:\n- Ensure good lighting\n- Face camera directly\n- Remove glasses/mask if possible\n- Stay 1-2 feet from camera`,
        )
      } else if (errorMsg.includes('already marked')) {
        setError(`⚠️ ${errorMsg}`)
      } else if (errorMsg.includes('not registered')) {
        setError(
          `❌ ${errorMsg}\n📝 Please contact admin to register your face.`,
        )
      } else {
        setError(`❌ ${errorMsg}`)
      }

      setMessage('')
      setStep(2)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="card-3d p-6 w-full mx-auto max-w-lg mb-6">
        <h2 className="text-2xl font-black text-gray-900 mb-2 flex items-center gap-3 drop-shadow-sm">
          📸 Mark Attendance
        </h2>
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-6">
          {cameraActive
            ? 'Camera is active. Position your face clearly and click "Mark Attendance"'
            : 'Click "Activate Camera" to start, then mark your attendance'}
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div
            className={`flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-xl border ${
              step >= 1
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-gray-50 text-gray-400 border-gray-100'
            }`}
          >
            <span className="text-lg filter drop-shadow-sm">
              {step >= 1 ? '✅' : '1️⃣'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider">
              Location
            </span>
          </div>
          <div
            className={`h-0.5 w-4 sm:w-8 ${
              step >= 2 ? 'bg-green-400' : 'bg-gray-200'
            }`}
          ></div>
          <div
            className={`flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-xl border ${
              step >= 2
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-gray-50 text-gray-400 border-gray-100'
            }`}
          >
            <span className="text-lg filter drop-shadow-sm">
              {step >= 2 ? '✅' : '2️⃣'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider">
              Face Scan
            </span>
          </div>
          <div
            className={`h-0.5 w-4 sm:w-8 ${
              step >= 3 ? 'bg-blue-400' : 'bg-gray-200'
            }`}
          ></div>
          <div
            className={`flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-xl border ${
              step >= 3
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-gray-50 text-gray-400 border-gray-100'
            }`}
          >
            <span className="text-lg filter drop-shadow-sm">
              {step >= 3 ? '⏳' : '3️⃣'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider">
              Verify
            </span>
          </div>
        </div>

        {/* Camera Toggle Button */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Show fallback button only if camera not supported */}
          {!supportsCamera && (
            <button
              onClick={() => setShowFileInput(true)}
              className="btn-3d px-6 py-4 bg-gray-50 text-gray-700 rounded-2xl font-black border-2 border-gray-200 mb-2 w-full sm:w-auto text-sm"
            >
              📱 Use Phone Photo
            </button>
          )}
          <button
            onClick={toggleCamera}
            disabled={loading}
            className="btn-3d px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-black shadow-[0_8px_20px_rgba(99,102,241,0.4)] transition-all disabled:opacity-50 disabled:shadow-none w-full sm:w-auto text-sm"
          >
            {cameraActive ? (
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl filter drop-shadow-sm">📷</span>
                <span>Close Camera</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl filter drop-shadow-sm">📸</span>
                <span>Activate Camera</span>
              </span>
            )}
          </button>
          {cameraActive && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-red-500 rounded-lg mt-2 sm:mt-0">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-red-700">
                Camera Active
              </span>
            </div>
          )}
        </div>

        {/* File input fallback for mobile users (only show if requested or no camera support) */}
        {(showFileInput || !supportsCamera) && (
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="block w-full mb-4"
            style={{ maxWidth: 300 }}
          />
        )}

        {/* Webcam Feed or File Preview */}
        <div
          className="relative rounded-xl overflow-hidden shadow-lg mb-4 flex items-center justify-center mx-auto"
          style={{
            width: '100%',
            maxWidth: 400,
            aspectRatio: '1 / 1',
            height: 'auto',
          }}
        >
          {cameraActive ? (
            <div className="w-full h-full flex items-center justify-center">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                mirrored={true}
                videoConstraints={{
                  width: 400,
                  height: 400,
                  facingMode: 'user',
                }}
                className="w-full h-full object-cover"
                screenshotQuality={1}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  aspectRatio: '1 / 1',
                }}
              />
              {/* Face Guide Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-green-400 rounded-full opacity-30"></div>
              </div>
              {/* Live Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-bold">LIVE</span>
              </div>
            </div>
          ) : fileImage ? (
            <img
              src={fileImage}
              alt="Selected"
              className="w-full h-full object-cover rounded-xl"
              style={{ aspectRatio: '1 / 1', maxWidth: 400 }}
            />
          ) : (
            <div className="text-center text-white px-6 w-full">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-bold mb-2">Camera Inactive</h3>
              <p className="text-gray-400">
                Click "Activate Camera" or use the phone camera input
              </p>
            </div>
          )}
        </div>

        {/* Attendance Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <span>👤</span> Student
            </p>
            <p className="text-sm font-black text-gray-900 drop-shadow-sm">
              {user.name}
            </p>
            <p className="text-[11px] text-gray-500 font-semibold">
              {user.student_id || user.id}
            </p>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <span>📍</span> Location
            </p>
            <p
              className={`text-sm font-black drop-shadow-sm ${
                location ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {location ? '✅ Acquired' : '⏳ Pending'}
            </p>
            {location && (
              <p className="text-[11px] text-gray-500 font-semibold">
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
            )}
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 shadow-inner">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <span>📅</span> Date & Time
            </p>
            <p className="text-sm font-black text-gray-900 drop-shadow-sm">
              {new Date().toLocaleDateString()}
            </p>
            <p className="text-[11px] text-gray-500 font-semibold">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {!location ? (
            <button
              onClick={getLocation}
              className="btn-3d flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-black text-[15px] shadow-[0_8px_20px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:shadow-none transition-all"
              disabled={loading}
            >
              📍 Get My Location
            </button>
          ) : (
            <>
              {/* Call markAttendance with fileImage if present (mobile) */}
              <button
                onClick={() => markAttendance(fileImage)}
                disabled={loading || !location || (!cameraActive && !fileImage)}
                className="btn-3d flex-[2] px-6 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl font-black text-[15px] shadow-[0_8px_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:shadow-none transition-all outline-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  '✅ Mark Attendance Now'
                )}
              </button>

              <button
                onClick={getLocation}
                disabled={loading}
                className="btn-3d flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black text-sm border-2 border-gray-200 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:shadow-none"
              >
                🔄 Refresh
              </button>
            </>
          )}
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-4 mb-5 shadow-sm">
            <pre className="text-sm text-emerald-800 font-bold whitespace-pre-wrap font-sans">
              {message}
            </pre>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border-l-4 border-rose-500 rounded-r-xl p-4 mb-5 shadow-sm">
            <pre className="text-sm text-rose-800 font-bold whitespace-pre-wrap font-sans">
              {error}
            </pre>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
            💡 Quick Tips for Successful Attendance with Attendify
          </h3>
          <ul className="space-y-1 text-xs text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>Activate Camera First:</strong> Click the "Activate
                Camera" button before marking attendance
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>Good Lighting:</strong> Ensure your face is well-lit
                (avoid backlighting)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>Face Camera:</strong> Look directly at the camera, not
                sideways
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>Distance:</strong> Stay 1-2 feet away from the camera
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>Remove Obstacles:</strong> Take off glasses, masks, or
                caps if possible
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>Close Camera:</strong> Click "Close Camera" when done to
                save resources
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MarkAttendance
