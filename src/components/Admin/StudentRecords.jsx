import React, { useState, useEffect } from 'react'
import { adminAPI } from '../../services/api'
import './AdminStyles.css'

function StudentRecords() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState('all')

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, student: null })
  const [deleting, setDeleting] = useState(false)
  const [deleteResult, setDeleteResult] = useState(null) // { type: 'success'|'error', message }

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await adminAPI.getStudents()
      setStudents(response.data.students)
    } catch (error) {
      console.error('Failed to fetch students:', error)
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModal = (student) => {
    setDeleteResult(null)
    setDeleteModal({ open: true, student })
  }

  const closeDeleteModal = () => {
    if (deleting) return // block close while in progress
    setDeleteModal({ open: false, student: null })
    setDeleteResult(null)
  }

  const handleDelete = async () => {
    if (!deleteModal.student) return
    setDeleting(true)
    setDeleteResult(null)
    try {
      const res = await adminAPI.deleteStudent(deleteModal.student.student_id)
      const data = res.data
      // Remove from local state immediately
      setStudents((prev) =>
        prev.filter((s) => s.student_id !== deleteModal.student.student_id),
      )
      setDeleteResult({
        type: 'success',
        message: `✅ ${data.message}\n☁️ ${data.cloudinary_photos_deleted} cloud photo(s) deleted\n📋 ${data.attendance_records_deleted} attendance record(s) removed`,
      })
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Deletion failed'
      setDeleteResult({ type: 'error', message: `❌ ${msg}` })
    } finally {
      setDeleting(false)
    }
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDept =
      filterDept === 'all' || student.department === filterDept

    return matchesSearch && matchesDept
  })

  const departments = [...new Set(students.map((s) => s.department))]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 drop-shadow-sm">
          👥 Student Records
        </h2>
        <button className="btn-3d px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
          ➕ Add New Student
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card-3d-modern p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 filter drop-shadow-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 pl-12 pr-4 font-bold text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 font-bold text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner cursor-pointer"
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
        >
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Student Statistics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-3d-modern bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(59,130,246,0.2)] flex flex-col items-center justify-center text-center">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 text-blue-100">
            Total Students
          </span>
          <span className="text-2xl sm:text-3xl font-black drop-shadow-md">
            {students.length}
          </span>
        </div>
        <div className="card-3d-modern bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(16,185,129,0.2)] flex flex-col items-center justify-center text-center">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 text-emerald-100">
            Face Registered
          </span>
          <span className="text-2xl sm:text-3xl font-black drop-shadow-md">
            {students.filter((s) => s.face_registered).length}
          </span>
        </div>
        <div className="card-3d-modern bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(249,115,22,0.2)] flex flex-col items-center justify-center text-center">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 text-orange-100">
            Pending Setup
          </span>
          <span className="text-2xl sm:text-3xl font-black drop-shadow-md">
            {students.filter((s) => !s.face_registered).length}
          </span>
        </div>
      </div>

      {/* Students List (Mobile Optimized Cards) */}
      {loading ? (
        <div className="text-center py-10 font-bold text-gray-500 flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
          Loading students...
        </div>
      ) : (
        <div className="space-y-3 pb-8">
          {filteredStudents.length === 0 ? (
            <div className="card-3d-modern p-8 text-center bg-white/50 border-dashed border-2 border-indigo-100">
              <span className="text-4xl filter grayscale opacity-50 mb-3 block">📭</span>
              <p className="text-gray-500 font-bold text-sm">
                {searchTerm || filterDept !== 'all'
                  ? 'No students match your filters'
                  : 'No students registered yet'}
              </p>
            </div>
          ) : (
            filteredStudents.map((student) => {
              const isRegistered = student.face_registered
              const statusBg = isRegistered ? 'from-emerald-50 to-teal-50 border-emerald-100/50' : 'from-amber-50 to-orange-50 border-amber-100/50'
              const badgeColors = isRegistered
                ? 'bg-emerald-100 text-emerald-700 shadow-[0_2px_8px_rgba(16,185,129,0.15)]'
                : 'bg-amber-100 text-amber-700 shadow-[0_2px_8px_rgba(245,158,11,0.15)]'

              return (
                <div
                  key={student._id}
                  className={`card-3d-modern p-4 bg-gradient-to-br ${statusBg} border relative overflow-hidden flex flex-col gap-3 group`}
                >
                  {/* Decorative background glow */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/40 blur-xl pointer-events-none"></div>
                  
                  {/* Top Row: User Info & Status */}
                  <div className="flex justify-between items-start z-10">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-700 font-black text-sm border-2 border-white shrink-0">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-gray-900 text-[15px] leading-tight flex items-center gap-1 truncate">
                          {student.name}
                        </h4>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50/50 px-1.5 rounded-md inline-block mt-0.5 truncate max-w-full">
                          ID: {student.student_id}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-white/50 shrink-0 ${badgeColors}`}>
                      <span className="scale-110">{isRegistered ? '✅' : '⏳'}</span>
                      <span className="hidden sm:inline">{isRegistered ? 'Registered' : 'Pending'}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>

                  {/* Middle Row: Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-2 z-10">
                    {/* Dept */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-[10px] border border-gray-100">
                        🏢
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider leading-none">Dept</span>
                        <span className="font-black text-gray-700 leading-none truncate block max-w-[80px] sm:max-w-[120px]">{student.department}</span>
                      </div>
                    </div>

                    {/* Year */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-[10px] border border-gray-100">
                        📅
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider leading-none">Year</span>
                        <span className="font-black text-indigo-700 leading-none">{student.year}</span>
                      </div>
                    </div>

                    {/* Email (Hidden on very small screens, truncate) */}
                    <div className="hidden sm:flex items-center gap-1.5 text-xs flex-1 justify-end min-w-0">
                      <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-[10px] border border-gray-100 shrink-0">
                        ✉️
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider leading-none">Email</span>
                        <span className="font-bold text-gray-500 leading-none truncate block">{student.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Actions */}
                  <div className="flex items-center justify-end gap-2 mt-1 z-10">
                    <button
                      className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center gap-1 btn-3d text-xs font-black shadow-sm"
                      title="View Details"
                    >
                      <span className="text-sm">👁️</span> View
                    </button>
                    <button
                      className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center gap-1 btn-3d text-xs font-black shadow-sm"
                      title="Edit"
                    >
                      <span className="text-sm">✏️</span> Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(student)}
                      className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center gap-1 btn-3d text-xs font-black shadow-sm border border-rose-100"
                      title="Delete"
                    >
                      <span className="text-sm">🗑️</span> Delete
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ─────────────────────────────── */}
      {deleteModal.open && deleteModal.student && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 min-h-screen pb-safe">
          <div
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 w-full max-w-sm text-center shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-white/20"
            style={{ animation: 'fadeScale 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Result state (after action) */}
            {deleteResult ? (
              <>
                <div className={`text-6xl mb-4 drop-shadow-sm`}>{deleteResult.type === 'success' ? '✅' : '❌'}</div>
                <h3 className={`text-xl font-black mb-3 ${deleteResult.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {deleteResult.type === 'success' ? 'Deleted Successfully' : 'Delete Failed'}
                </h3>
                <p className="text-sm text-gray-500 font-bold whitespace-pre-line leading-relaxed mb-6 px-2">
                  {deleteResult.message}
                </p>
                <button
                  onClick={closeDeleteModal}
                  className="btn-3d w-full py-3.5 bg-gray-100  text-gray-800 rounded-2xl font-black text-sm transition-all"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                {/* Warning icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 border border-rose-100 shadow-inner">
                  🗑️
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Delete Student?</h3>
                <p className="text-[13px] text-gray-500 font-bold mb-1">
                  You are about to permanently delete:
                </p>
                <div className="my-4 p-4 bg-gray-50/80 rounded-2xl border border-gray-100 shadow-inner text-left">
                  <p className="font-black text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center text-xs">
                      {deleteModal.student.name.charAt(0).toUpperCase()}
                    </span>
                    {deleteModal.student.name}
                  </p>
                  <p className="text-[11px] font-black tracking-wider text-rose-600 mt-2 bg-rose-50 px-2 py-1 rounded inline-block">{deleteModal.student.student_id}</p>
                </div>
                <div className="text-left bg-amber-50/80 border border-amber-100 rounded-2xl p-4 mb-6 text-[11px] text-amber-800 font-bold space-y-1.5 shadow-inner">
                  <p className="font-black text-amber-900 mb-2 flex items-center gap-1.5">
                    <span className="text-sm">⚠️</span> This will delete:
                  </p>
                  <p className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-amber-400"></span> Profile from database</p>
                  {deleteModal.student.face_registered && <p className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-amber-400"></span> Face photos from Cloudinary</p>}
                  <p className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-amber-400"></span> All attendance records</p>
                  <p className="text-rose-600 font-black mt-2 text-center bg-rose-50/50 py-1 rounded-md">Cannot be undone!</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={closeDeleteModal}
                    disabled={deleting}
                    className="flex-1 py-3.5 rounded-2xl font-black text-[13px] bg-gray-100  text-gray-700 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 py-3.5 rounded-2xl font-black text-[13px] bg-gradient-to-r from-rose-500 to-red-600   active:scale-95 text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(225,29,72,0.3)] btn-3d"
                  >
                    {deleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentRecords
