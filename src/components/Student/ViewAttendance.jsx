import React, { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';
import './StudentStyles.css';

function ViewAttendance({ user }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    percentage: 0,
  });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await studentAPI.getAttendance(user.student_id || user.id);
      const attendanceRecords = response.data.records;
      setRecords(attendanceRecords);

      // Calculate stats
      const currentMonth = new Date().getMonth();
      const thisMonthRecords = attendanceRecords.filter(
        (record) => new Date(record.timestamp).getMonth() === currentMonth
      );

      setStats({
        total: attendanceRecords.length,
        thisMonth: thisMonthRecords.length,
        percentage:
          thisMonthRecords.length > 0
            ? ((thisMonthRecords.length / 30) * 100).toFixed(1)
            : 0,
      });
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-8">
      {/* Page Header */}
      <div className="relative h-28 sm:h-32 card-3d-modern overflow-hidden border-0 shadow-[0_10px_30px_rgba(59,130,246,0.15)] bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col justify-center p-5 sm:p-6 text-white group">
        <div className="absolute top-[-50%] right-[-10%] w-40 h-40 rounded-full bg-white/20 blur-2xl pointer-events-none transition-colors"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black mb-1 drop-shadow-md tracking-tight flex items-center gap-3">
            <span className="p-1.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-inner">📊</span>
            Detailed View
          </h1>
          <p className="text-sm font-bold text-blue-100 uppercase tracking-wide drop-shadow-sm ml-1">
            Analytics & Reports
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-3d-modern p-3 sm:p-4 border-t-4 border-emerald-400 bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">Total Days</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-900 leading-none drop-shadow-sm">{stats.total}</span>
        </div>
        
        <div className="card-3d-modern p-3 sm:p-4 border-t-4 border-blue-400 bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">This Month</span>
          <span className="text-2xl sm:text-3xl font-black text-blue-900 leading-none drop-shadow-sm">{stats.thisMonth}</span>
        </div>

        <div className="card-3d-modern p-3 sm:p-4 border-t-4 border-purple-400 bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-bold text-purple-600 uppercase tracking-widest mb-1">Attendance Rate</span>
          <span className="text-xl sm:text-2xl font-black text-purple-900 leading-none drop-shadow-sm mt-1">{stats.percentage}%</span>
        </div>
      </div>

      {/* List Container */}
      <div className="card-3d-modern p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 flex items-center gap-2 drop-shadow-sm">
          📋 Raw Data
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading records...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {records.length === 0 ? (
              <div className="text-center py-12 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                <span className="text-5xl filter grayscale opacity-50 mb-3 block">📭</span>
                <p className="text-base font-bold text-gray-700 mb-1">No attendance records found</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Start marking your attendance</p>
              </div>
            ) : (
              records.map((record, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5">
                  <div className="flex items-center gap-4 w-full sm:w-auto border-b sm:border-0 border-gray-100 pb-3 sm:pb-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center text-2xl shadow-sm border border-emerald-100 shrink-0">✅</div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-gray-900 leading-none">{record.date}</h3>
                      <p className="text-xs text-gray-500 font-bold mt-1 uppercase flex items-center gap-1.5 whitespace-nowrap">
                        <span className="text-blue-500">🕒</span> {record.time}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto px-2 sm:px-0">
                    <div className="flex flex-col sm:items-end">
                      <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Confidence</span>
                      <span className="text-sm font-black text-indigo-600 mt-1">{record.face_confidence?.toFixed(1) || '100.0'}%</span>
                    </div>
                    <span className="inline-flex px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-inner border border-emerald-100/50">
                      Present
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewAttendance;
