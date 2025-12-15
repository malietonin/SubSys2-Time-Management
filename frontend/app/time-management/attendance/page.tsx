"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/app/(system)/context/authContext";

export interface Punch {
  time: Date;
  type: "IN" | "OUT";
}

export interface AttendanceRecord {
  _id: string;
  employeeId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  punches: Punch[];
  totalWorkMinutes: number;
  hasMissedPunch: boolean;
  exceptionIds?: string[];
  finalisedForPayroll?: boolean;
}

export default function AttendanceRecordsPage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchEmployeeId, setSearchEmployeeId] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [expandedRecords, setExpandedRecords] = useState<Set<string>>(new Set());

  const { user } = useAuth();

  // Check user roles based on requirements
  const isEmployee = user?.roles?.some((role: string) =>
    ["HR Employee", "Department Employee"].includes(role)
  );

  const isLineManager = user?.roles?.some((role: string) =>
    ["Department Head"].includes(role)
  );

  const isHRManager = user?.roles?.some((role: string) =>
    ["HR Manager"].includes(role)
  );

  const isPayrollOfficer = user?.roles?.some((role: string) =>
    ["Payroll Manager", "Payroll Specialist"].includes(role)
  );

  const isSystemAdmin = user?.roles?.some((role: string) =>
    ["System Admin"].includes(role)
  );

  // Permissions based on requirements
  const canViewOwnRecords = isEmployee;
  const canViewAllRecords = isLineManager || isHRManager || isPayrollOfficer || isSystemAdmin;
  const canManualCorrection = isLineManager; // US 6
  const canCreateRecords = isLineManager; // US 6
  const canEditRecords = isLineManager || isSystemAdmin;
  const canDeleteRecords = isLineManager || isSystemAdmin;

  // Fetch attendance records
  const fetchAttendanceRecords = async () => {
    if (!user?.userid) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      let url = "";
      
      // Employee view - only their own records (US 5)
      if (canViewOwnRecords && !canViewAllRecords) {
        url = `http://localhost:4000/time-management/attendance-record/${user.userid}?${params.toString()}`;
      } 
      // Manager/Admin view - all records with optional filter (US 6, 19)
      else if (canViewAllRecords) {
        if (searchEmployeeId) {
          params.append("employeeId", searchEmployeeId);
        }
        url = `http://localhost:4000/time-management/attendance-record?${params.toString()}`;
      }

      const res = await axios.get(url, { withCredentials: true });
      let data = res.data.data || [];
      
      // For employee view, wrap punches in record format
      if (canViewOwnRecords && !canViewAllRecords && Array.isArray(data)) {
        const punchData = data.map((punch: any) => ({
          ...punch,
          time: new Date(punch.time),
        }));
        
        if (punchData.length > 0) {
          setRecords([{
            _id: "user-record",
            employeeId: {
              _id: user.userid || "",
              firstName: (user as any).firstName || "User",
              lastName: (user as any).lastName || "",
              email: user.email || "",
            },
            punches: punchData,
            totalWorkMinutes: 0,
            hasMissedPunch: false,
          }]);
        } else {
          setRecords([]);
        }
      } else {
        // Manager/Admin view - process full records
        const processedRecords = data.map((record: any) => ({
          ...record,
          punches: record.punches.map((punch: any) => ({
            ...punch,
            time: new Date(punch.time),
          })),
        }));
        setRecords(processedRecords);
      }
    } catch (err) {
      console.error("Error fetching records:", err);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userid) {
      fetchAttendanceRecords();
    }
  }, [user, startDate, endDate, searchEmployeeId]);

  const toggleExpand = (recordId: string) => {
    setExpandedRecords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recordId)) {
        newSet.delete(recordId);
      } else {
        newSet.add(recordId);
      }
      return newSet;
    });
  };

  const handleDelete = async (recordId: string) => {
    if (!confirm("Are you sure you want to delete this attendance record? This action will be audit-tracked.")) return;

    try {
      await axios.delete(
        `http://localhost:4000/time-management/attendance-record/record/${recordId}`,
        { withCredentials: true }
      );
      fetchAttendanceRecords();
    } catch (err) {
      console.error("Error deleting record:", err);
      alert("Failed to delete record");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const groupPunchesByDate = (punches: Punch[]) => {
    const grouped: { [key: string]: Punch[] } = {};

    punches.forEach((punch) => {
      const dateKey = new Date(punch.time).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(punch);
    });

    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    });

    return grouped;
  };

  const calculateDayTotal = (punches: Punch[]) => {
    let totalMinutes = 0;
    for (let i = 0; i < punches.length; i++) {
      if (punches[i].type === "IN") {
        const outPunch = punches.slice(i + 1).find((p) => p.type === "OUT");
        if (outPunch) {
          totalMinutes += Math.floor(
            (new Date(outPunch.time).getTime() - new Date(punches[i].time).getTime()) / 60000
          );
        }
      }
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes, totalMinutes };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading attendance records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/time-management"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block"
          >
            &larr; Back to Time Management
          </Link>
          <div className="flex justify-between items-center mt-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {canViewAllRecords ? "Attendance Records Management" : "My Attendance Records"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {canViewAllRecords 
                  ? "View and manage employee attendance records"
                  : "View your clock-in/out records"}
              </p>
            </div>

            <div className="flex space-x-2">
              {canViewOwnRecords && (
                <>
                  <Link href="/time-management/correction-request">
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition shadow-md">
                      📝 Correction Request
                    </button>
                  </Link>
                  <Link href="/time-management/time-exception">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-md">
                      ⏰ Time Exception
                    </button>
                  </Link>
                </>
              )}
              {canCreateRecords && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
                >
                  ➕ Manual Entry
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters - Enhanced for BR-TM-21 (Reports and Analytics) */}
        <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📊 Filter & Search Attendance Records
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
                📅 Start Date
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
                📅 End Date
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            {canViewAllRecords && (
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
                  👤 Employee ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Filter by specific employee"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchEmployeeId}
                  onChange={(e) => setSearchEmployeeId(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setSearchEmployeeId("");
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition shadow-md"
            >
              🔄 Clear Filters
            </button>
            <button
              onClick={fetchAttendanceRecords}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition shadow-md"
            >
              🔍 Apply Filters
            </button>
          </div>
        </div>

        {/* Info Cards - BR-TM-21 (Summaries) */}
        {canViewAllRecords && records.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Records</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{records.length}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Missed Punches</div>
              <div className="text-2xl font-bold text-yellow-600">
                {records.filter(r => r.hasMissedPunch).length}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Punches</div>
              <div className="text-2xl font-bold text-blue-600">
                {records.reduce((acc, r) => acc + r.punches.length, 0)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Finalized for Payroll</div>
              <div className="text-2xl font-bold text-green-600">
                {records.filter(r => r.finalisedForPayroll).length}
              </div>
            </div>
          </div>
        )}

        {/* Records List */}
        <div className="space-y-4">
          {records.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No attendance records found for the selected period.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Try adjusting your date filters or check back later.
              </p>
            </div>
          ) : (
            records.map((record) => {
              const groupedPunches = groupPunchesByDate(record.punches);
              const isExpanded = expandedRecords.has(record._id);

              return (
                <div
                  key={record._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                >
                  {/* Record Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {typeof record.employeeId === "object" && record.employeeId
                            ? `${record.employeeId.firstName || "Unknown"} ${record.employeeId.lastName || ""}`
                            : "Employee"}
                        </h3>
                        {record.hasMissedPunch && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs rounded-full font-semibold">
                            ⚠️ Missed Punch
                          </span>
                        )}
                        {record.finalisedForPayroll && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full font-semibold">
                            ✅ Finalized
                          </span>
                        )}
                      </div>
                      {typeof record.employeeId === "object" && record.employeeId && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          📧 {record.employeeId.email || "No email"} • 
                          🆔 {record.employeeId._id}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-3 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          📊 Total Punches: <strong>{record.punches.length}</strong>
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          ⏱️ Total Work: <strong>{Math.floor(record.totalWorkMinutes / 60)}h {record.totalWorkMinutes % 60}m</strong>
                        </span>
                        {record.exceptionIds && record.exceptionIds.length > 0 && (
                          <span className="text-gray-600 dark:text-gray-400">
                            ⚡ Exceptions: <strong>{record.exceptionIds.length}</strong>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleExpand(record._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md text-sm font-medium"
                      >
                        {isExpanded ? "▲ Collapse" : "▼ Expand"}
                      </button>
                      {canEditRecords && (
                        <button
                          onClick={() => setEditingRecord(record)}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition shadow-md text-sm font-medium"
                          title="Manual Correction"
                        >
                          ✏️ Edit
                        </button>
                      )}
                      {canDeleteRecords && (
                        <button
                          onClick={() => handleDelete(record._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md text-sm font-medium"
                          title="Delete Record"
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Punches - Collapsed View */}
                  {!isExpanded && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      📅 {Object.keys(groupedPunches).length} day(s) of attendance records. 
                      <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">Click expand to view detailed punch-in/out times.</span>
                    </div>
                  )}

                  {/* Punches - Expanded View */}
                  {isExpanded && (
                    <div className="space-y-4 mt-4">
                      {Object.entries(groupedPunches)
                        .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
                        .map(([date, dayPunches]) => {
                          const dayTotal = calculateDayTotal(dayPunches);
                          return (
                            <div
                              key={date}
                              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30"
                            >
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                  📅 {formatDate(new Date(date))}
                                </h4>
                                {dayTotal.totalMinutes > 0 && (
                                  <span className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
                                    ⏱️ Total: <strong>{dayTotal.hours}h {dayTotal.minutes}m</strong>
                                  </span>
                                )}
                              </div>

                              <div className="space-y-2">
                                {dayPunches.map((punch, index) => (
                                  <div
                                    key={index}
                                    className={`flex items-center justify-between p-3 rounded-lg ${
                                      punch.type === "IN"
                                        ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
                                        : "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500"
                                    }`}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <span
                                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                          punch.type === "IN"
                                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                                        }`}
                                      >
                                        {punch.type === "IN" ? "⬇️ Clock In" : "⬆️ Clock Out"}
                                      </span>
                                      <span className="font-semibold text-gray-900 dark:text-white text-lg">
                                        {formatTime(new Date(punch.time))}
                                      </span>
                                    </div>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                                      {new Date(punch.time).toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingRecord) && (
        <CreateEditModal
          record={editingRecord}
          onClose={() => {
            setShowCreateModal(false);
            setEditingRecord(null);
          }}
          onSuccess={() => {
            fetchAttendanceRecords();
            setShowCreateModal(false);
            setEditingRecord(null);
          }}
        />
      )}
    </div>
  );
}

// Create/Edit Modal Component
function CreateEditModal({
  record,
  onClose,
  onSuccess,
}: {
  record: AttendanceRecord | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [employeeId, setEmployeeId] = useState(record?.employeeId?._id || "");
  const [totalWorkMinutes, setTotalWorkMinutes] = useState(record?.totalWorkMinutes || 0);
  const [hasMissedPunch, setHasMissedPunch] = useState(record?.hasMissedPunch || false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (record) {
        // Update existing record
        await axios.patch(
          `http://localhost:4000/time-management/attendance-record/${record._id}`,
          { employeeId, totalWorkMinutes, hasMissedPunch },
          { withCredentials: true }
        );
      } else {
        // Create new record
        await axios.post(
          "http://localhost:4000/time-management/attendance-record",
          { employeeId, totalWorkMinutes, hasMissedPunch, punches: [] },
          { withCredentials: true }
        );
      }
      onSuccess();
    } catch (err) {
      console.error("Error saving record:", err);
      alert("Failed to save record. Please check employee ID and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {record ? "✏️ Edit Attendance Record" : "➕ Manual Attendance Entry"}
          </h2>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {record 
            ? "Manual correction for missing or incorrect punches"
            : "Create manual attendance record with audit trail"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              👤 Employee ID
            </label>
            <input
              type="text"
              required
              disabled={!!record}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter employee ID"
            />
            {record && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Employee ID cannot be changed when editing
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              ⏱️ Total Work Minutes
            </label>
            <input
              type="number"
              required
              min="0"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={totalWorkMinutes}
              onChange={(e) => setTotalWorkMinutes(Number(e.target.value))}
              placeholder="Enter total minutes worked"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {totalWorkMinutes > 0 
                ? `Equals ${Math.floor(totalWorkMinutes / 60)}h ${totalWorkMinutes % 60}m`
                : "Enter minutes worked"}
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <input
              type="checkbox"
              id="missedPunch"
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              checked={hasMissedPunch}
              onChange={(e) => setHasMissedPunch(e.target.checked)}
            />
            <label htmlFor="missedPunch" className="text-gray-700 dark:text-gray-300 font-medium">
              ⚠️ Has Missed Punch
            </label>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> All changes are audit-tracked with timestamp. 
              Manual corrections should include proper justification in your system logs.
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                `💾 ${record ? "Update Record" : "Create Record"}`
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition disabled:opacity-50 font-medium shadow-md"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}