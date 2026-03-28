import React, { useState } from 'react'
import { adminAPI } from '../../services/api'
import './AdminStyles.css'

function TrainModel() {
  const [training, setTraining] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleTrain = async () => {
    setMessage('')
    setError('')
    setTraining(true)

    try {
      await adminAPI.trainModel()
      setMessage('Face recognition model trained successfully!')
    } catch (err) {
      setError(err.response?.data?.error || 'Training failed')
    } finally {
      setTraining(false)
    }
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 drop-shadow-sm">
          🤖 Train AI Model
        </h2>
      </div>

      <div className="card-3d-modern p-5 sm:p-6 space-y-6">
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-5 relative shadow-inner">
          <h3 className="text-[11px] font-black text-blue-800 mb-3 flex items-center gap-2 uppercase tracking-wider">
            <span>ℹ️</span> Training Instructions
          </h3>
          <ul className="text-[11px] font-bold text-blue-700/80 space-y-2 ml-1">
            <li className="flex gap-2">
              <span>•</span> Ensure all students have face images uploaded
            </li>
            <li className="flex gap-2">
              <span>•</span> Training may take a few minutes depending on the
              number of students
            </li>
            <li className="flex gap-2">
              <span>•</span> Train the model after adding new students
            </li>
            <li className="flex gap-2">
              <span>•</span> The model will be saved automatically after
              training
            </li>
          </ul>
        </div>

        <div className="pt-2">
          <button
            onClick={handleTrain}
            disabled={training}
            className="btn-3d-primary w-full disabled:opacity-50"
          >
            {training ? '⏳ Training Model...' : '🤖 Start Training Model'}
          </button>
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
      </div>
    </div>
  )
}

export default TrainModel
