"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/(system)/context/authContext";
import Link from "next/link";

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
    workEmail: string;
  };
  punches: Punch[];
  totalWorkMinutes: number;
  hasMissedPunch: boolean;
  exceptionIds?: string[];
  finalisedForPayroll?: boolean;
}

export default function AttendancePage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRecords, setExpandedRecords] = useState<Set<string>>(new Set());
  const [searchEmployeeId, setSearchEmployeeId] = useState("");

  const isAdmin =
    user?.roles?.some((role: string) =>
      ["department head", "hr manager", "system admin"].includes(role.toLowerCase())
    ) || false;

  const toggleExpand = (recordId: string) => {
    setExpandedRecords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(recordId)) newSet.delete(recordId);
      else newSet.add(recordId);
      return newSet;
    });
  };

  const fetchRecords = async () => {
    if (!user?.userid) return;
    setLoading(true);

    try {
      let url = "";
      if (isAdmin) {
        // Admin: can view all or filter by employeeId
        const params = searchEmployeeId ? `?employeeId=${encodeURIComponent(searchEmployeeId)}` : "";
        url = `http://localhost:4000/time-management/attendance-record${params}`;
      } else {
        // Employee: only own record
        url = `http://localhost:4000/time-management/attendance-record/${user.userid}`;
      }

      const res = await axios.get(url, { withCredentials: true });

      // Normalize data to an array and ensure punch times are Date objects
      let data: AttendanceRecord[] = [];
      if (Array.isArray(res.data.data)) data = res.data.data;
      else if (res.data.data) data = [res.data.data];

      data = data.map((rec: any) => ({
        ...rec,
        punches: (rec.punches || [])
          .map((p: any) => ({ ...p, time: new Date(p.time) }))
          .sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime()),
      }));

      setRecords(data);
    } catch (err) {
      console.error("Error fetching attendance records:", err);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading attendance records...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link href="/time-management" className="text-blue-600 hover:underline dark:text-blue-400">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-5">
          {isAdmin ? "All Attendance Records" : "My Attendance Record"}
        </h1>

        {isAdmin && (
          <div className="mb-4 flex space-x-2">
            <input
              type="text"
              placeholder="Filter by Employee ID"
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchEmployeeId}
              onChange={(e) => setSearchEmployeeId(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={fetchRecords}
            >
              Search
            </button>
          </div>
        )}

        {records.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No attendance records found.
            </p>
          </div>
        )}

        {records.map((record) => {
          const isExpanded = expandedRecords.has(record._id);
          return (
            <div
              key={record._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {record.employeeId.firstName} {record.employeeId.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    📧 {record.employeeId?.workEmail} • 🆔 {record.employeeId?._id}
                  </p>
                </div>
                <button
                  onClick={() => toggleExpand(record._id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  {isExpanded ? "▲ Collapse" : "▼ Expand"}
                </button>
              </div>

              <div className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                ⏱️ Total Work: {Math.floor(record.totalWorkMinutes / 60)}h {record.totalWorkMinutes % 60}m •
                ⚠️ Missed Punches: {record.hasMissedPunch ? "Yes" : "No"} •
                ✅ Finalized: {record.finalisedForPayroll ? "Yes" : "No"}
              </div>

              {isExpanded && (
                <div className="space-y-2">
                  {record.punches.map((p, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        p.type === "IN"
                          ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
                          : "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            p.type === "IN"
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                          }`}
                        >
                          {p.type === "IN" ? "⬇️ Clock In" : "⬆️ Clock Out"}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white text-lg">
                          {formatTime(p.time)}
                        </span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {formatDate(p.time)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
