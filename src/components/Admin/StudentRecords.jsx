import React, { useState, useEffect } from 'react'
import { adminAPI } from '../../services/api'
import './AdminStyles.css'

function StudentRecords() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState('all')

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
      <div className="card-3d p-4 flex flex-col sm:flex-row gap-3">
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
        <div className="card-3d bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(59,130,246,0.2)] flex flex-col items-center justify-center text-center">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 text-blue-100">
            Total Students
          </span>
          <span className="text-2xl sm:text-3xl font-black drop-shadow-md">
            {students.length}
          </span>
        </div>
        <div className="card-3d bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(16,185,129,0.2)] flex flex-col items-center justify-center text-center">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 text-emerald-100">
            Face Registered
          </span>
          <span className="text-2xl sm:text-3xl font-black drop-shadow-md">
            {students.filter((s) => s.face_registered).length}
          </span>
        </div>
        <div className="card-3d bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl p-4 border-0 text-white shadow-[0_4px_15px_rgba(249,115,22,0.2)] flex flex-col items-center justify-center text-center">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 text-orange-100">
            Pending Setup
          </span>
          <span className="text-2xl sm:text-3xl font-black drop-shadow-md">
            {students.filter((s) => !s.face_registered).length}
          </span>
        </div>
      </div>

      {/* Students Table */}
      {loading ? (
        <div className="text-center py-10 font-bold text-gray-500 animate-pulse">
          Loading student records...
        </div>
      ) : (
        <div className="card-3d overflow-hidden border border-gray-100/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/70 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Face Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center p-8 text-gray-500 font-bold"
                    >
                      {searchTerm || filterDept !== 'all'
                        ? 'No students match your filters'
                        : 'No students registered yet'}
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="font-black text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg text-xs tracking-wide">
                          {student.student_id}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-800 font-black text-xs shadow-sm border border-indigo-200">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-gray-900">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 font-medium">
                        {student.email}
                      </td>
                      <td className="px-4 py-3 text-gray-700 font-bold">
                        {student.department}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        Year {student.year}
                      </td>
                      <td className="px-4 py-3">
                        {student.face_registered ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                            ✅ Registered
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-amber-100">
                            ⏳ Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors btn-3d"
                            title="View Details"
                          >
                            👁️
                          </button>
                          <button
                            className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100 transition-colors btn-3d"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors btn-3d"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentRecords
