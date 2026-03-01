import React, { useState, useRef } from 'react'
import Webcam from 'react-webcam'
import { adminAPI } from '../../services/api'
import './AdminStyles.css'

function RegisterStudent() {
  const webcamRef = useRef(null)
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    email: '',
    password: '',
    department: '',
    year: '',
  })
  const [capturedImages, setCapturedImages] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const [registeredStudentId, setRegisteredStudentId] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)

    try {
      const response = await adminAPI.registerStudent(formData)
      setMessage('✅ Student registered successfully! Now capture face images.')
      setRegisteredStudentId(formData.student_id)
      setShowCamera(true)
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Registration failed'
      setError(errorMsg)

      // If duplicate error, don't show camera
      if (errorMsg.includes('already')) {
        setShowCamera(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    if (imageSrc) {
      setCapturedImages([...capturedImages, imageSrc])
      setMessage(
        `📸 Captured ${capturedImages.length + 1} image(s) - Need at least 5`,
      )
      setError('')
    }
  }

  const uploadImages = async () => {
    if (capturedImages.length < 5) {
      setError('❌ Please capture at least 5 images')
      return
    }

    setLoading(true)
    setMessage('⏳ Step 1/2: Uploading face images...')

    try {
      // Step 1: Upload face images
      await adminAPI.uploadFace(registeredStudentId, capturedImages)

      setMessage('⏳ Step 2/2: Training AI model automatically...')

      // Step 2: Automatically train the model (NEW!)
      try {
        const trainResponse = await adminAPI.trainModel()
        console.log('✅ Model trained:', trainResponse.data)

        setMessage(
          `✅ Student Registration Complete!\n\n` +
            `📸 ${capturedImages.length} face images uploaded\n` +
            `🤖 AI Model trained successfully\n` +
            `🎯 Trained ${trainResponse.data.students_trained} students\n` +
            `📊 Total images: ${trainResponse.data.total_images}\n\n` +
            `✨ Student can now mark attendance immediately!`,
        )
      } catch (trainError) {
        console.error('❌ Training failed:', trainError)
        setMessage(
          `✅ Face images uploaded successfully!\n\n` +
            `⚠️ Automatic training failed\n` +
            `Please go to "Train Model" tab to train manually.`,
        )
      }

      // Reset form after successful upload
      setTimeout(() => {
        setFormData({
          student_id: '',
          name: '',
          email: '',
          password: '',
          department: '',
          year: '',
        })
        setCapturedImages([])
        setShowCamera(false)
        setRegisteredStudentId(null)
        setMessage('')
        setError('')
      }, 5000)
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Upload failed'
      setError(`❌ ${errorMsg}`)
    } finally {
      setLoading(false)
    }
  }

  const cancelRegistration = () => {
    setFormData({
      student_id: '',
      name: '',
      email: '',
      password: '',
      department: '',
      year: '',
    })
    setCapturedImages([])
    setShowCamera(false)
    setRegisteredStudentId(null)
    setMessage('')
    setError('')
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 drop-shadow-sm">
          ➕ Register New Student
        </h2>
      </div>

      {!showCamera ? (
        <form
          onSubmit={handleRegister}
          className="card-3d p-5 sm:p-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                📝 Student ID
              </label>
              <input
                type="text"
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
                placeholder="STU0001"
                required
                disabled={loading}
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                👤 Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                disabled={loading}
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                📧 Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="student@example.com"
                required
                disabled={loading}
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                🔒 Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Min. 6 characters"
                minLength="6"
                required
                disabled={loading}
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                🏢 Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Computer Science"
                required
                disabled={loading}
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                📚 Year
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner cursor-pointer"
              >
                <option value="">Select Year</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-100">
              ⚠️ {error}
            </div>
          )}
          {message && !showCamera && (
            <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-xl text-sm font-bold flex items-center gap-2 border border-green-100">
              ✨ {message}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="btn-3d w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(99,102,241,0.3)] transition-all"
              disabled={loading}
            >
              {loading ? '⏳ Registering...' : '✅ Register Student'}
            </button>
          </div>
        </form>
      ) : (
        <div className="card-3d p-5 sm:p-6 space-y-5">
          <div className="text-center">
            <h3 className="text-xl font-black text-gray-900 mb-1 drop-shadow-sm">
              📸 Capture Face Images for
            </h3>
            <h3 className="text-2xl font-black text-indigo-600 drop-shadow-sm">
              {formData.name}
            </h3>
            <p className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-wide">
              Capture at least 5 images from different angles
            </p>
          </div>

          <div className="relative w-full aspect-square max-w-sm mx-auto rounded-[2rem] overflow-hidden bg-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.2)] border-4 border-white">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              mirrored={true}
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: 'user',
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Camera Overlay Guide */}
            <div className="absolute inset-0 border-[6px] border-indigo-500/30 rounded-[2rem] pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-4 flex justify-center">
              <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                Face Registration Mode
              </span>
            </div>
          </div>

          <div className="grid gap-3 pt-2">
            <button
              onClick={captureImage}
              className="btn-3d w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2"
              disabled={loading || capturedImages.length >= 10}
            >
              <span className="text-xl">📷</span> Capture Image (
              {capturedImages.length}/10)
            </button>
            <div className="grid grid-cols-2 gap-3">
              {capturedImages.length >= 5 ? (
                <button
                  onClick={uploadImages}
                  className="btn-3d w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(16,185,129,0.3)] flex items-center justify-center col-span-2"
                  disabled={loading}
                >
                  {loading ? '⏳ Uploading...' : '✅ Upload Images'}
                </button>
              ) : null}
              <button
                onClick={cancelRegistration}
                className={`btn-3d w-full py-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl font-bold text-sm ${
                  capturedImages.length >= 5 ? 'col-span-2' : 'col-span-2'
                }`}
                disabled={loading}
              >
                ❌ Cancel Registration
              </button>
            </div>
          </div>

          {capturedImages.length > 0 && (
            <div className="mt-4">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Captured Frames
              </h4>
              <div className="flex gap-2 overflow-x-auto pb-2 px-1 snap-x">
                {capturedImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex-none w-16 h-16 rounded-xl overflow-hidden border-2 border-indigo-200 shadow-sm snap-start relative"
                  >
                    <img
                      src={img}
                      alt={`Capture ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0.5 right-0.5 bg-black/50 text-white text-[8px] font-bold px-1 rounded-sm">
                      {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {message && showCamera && (
        <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-xl text-sm font-bold flex items-center gap-2 border border-green-100 whitespace-pre-wrap">
          ✨ {message}
        </div>
      )}
      {error && showCamera && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-100">
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}

export default RegisterStudent
