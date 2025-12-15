"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/app/(system)/context/authContext";

export interface CorrectionRequest {
  _id: string;
  employeeId: string | {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  attendanceRecord: string;
  reason: string;
  status: "SUBMITTED" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "ESCALATED";
  createdAt: Date;
  updatedAt: Date;
}

export default function AttendanceCorrectionRequestPage() {
  const [requests, setRequests] = useState<CorrectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CorrectionRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const { user } = useAuth();

  // Check user roles - be more flexible with role matching
  const isEmployee = user?.roles?.some((role: string) => {
    const normalizedRole = role.toLowerCase().trim();
    return normalizedRole.includes('employee') || normalizedRole === 'hr employee' || normalizedRole === 'department employee';
  });

  const canApproveReject = user?.roles?.some((role: string) => {
    const normalizedRole = role.toLowerCase().trim();
    return normalizedRole.includes('department head') || 
           normalizedRole.includes('hr admin') || 
           normalizedRole.includes('system admin');
  });

  const canViewAll = canApproveReject;

  // Fetch correction requests
  const fetchRequests = async () => {
    if (!user?.userid) return;
    
    setLoading(true);
    try {
      // Employees see only their requests
      const url = `http://localhost:4000/time-management/attendance-correction-request/employee/${user.userid}`;

      const res = await axios.get(url, { withCredentials: true });
      
      // Handle both response formats
      let data = res.data.data || res.data || [];
      
      // If data is wrapped in success/message/data format
      if (!Array.isArray(data) && data.data) {
        data = data.data;
      }
      
      const processedRequests = Array.isArray(data) ? data.map((req: any) => ({
        ...req,
        createdAt: new Date(req.createdAt),
        updatedAt: new Date(req.updatedAt),
      })) : [];

      setRequests(processedRequests);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  const handleApprove = async (requestId: string) => {
    if (!confirm("Are you sure you want to approve this correction request?")) return;

    try {
      await axios.patch(
        `http://localhost:4000/time-management/attendance-correction-request/${requestId}/approve`,
        {},
        { withCredentials: true }
      );
      fetchRequests();
    } catch (err) {
      console.error("Error approving request:", err);
      alert("Failed to approve request");
    }
  };

  const handleReject = async (requestId: string) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (!reason) return;

    try {
      await axios.patch(
        `http://localhost:4000/time-management/attendance-correction-request/${requestId}/reject`,
        { reason },
        { withCredentials: true }
      );
      fetchRequests();
    } catch (err) {
      console.error("Error rejecting request:", err);
      alert("Failed to reject request");
    }
  };

  const handleEscalate = async () => {
    if (!confirm("This will escalate all pending requests older than 48 hours. Continue?")) return;

    try {
      await axios.post(
        `http://localhost:4000/time-management/attendance-correction-request/auto-escalate`,
        {},
        { withCredentials: true }
      );
      alert("Pending requests escalated successfully!");
      fetchRequests();
    } catch (err) {
      console.error("Error escalating requests:", err);
      alert("Failed to escalate requests");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "IN_REVIEW":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "APPROVED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "ESCALATED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return "📤";
      case "IN_REVIEW":
        return "🔍";
      case "APPROVED":
        return "✅";
      case "REJECTED":
        return "❌";
      case "ESCALATED":
        return "⚠️";
      default:
        return "📋";
    }
  };

  const filteredRequests = requests.filter(req => 
    filterStatus === "ALL" || req.status === filterStatus
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading correction requests...</p>
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
            href="/time-management/attendance"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block"
          >
            &larr; Back to Attendance Records
          </Link>
          <div className="flex justify-between items-center mt-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Attendance Correction Requests
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {canViewAll 
                  ? "Review and manage attendance correction requests"
                  : "Submit and track your attendance correction requests"}
              </p>
            </div>

            <div className="flex space-x-2">
              {isEmployee && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  ➕ Submit Request
                </button>
              )}
              
              {canApproveReject && (
                <button
                  onClick={handleEscalate}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-md"
                >
                  ⚠️ Auto-Escalate
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Filter by Status:
            </label>
            <select
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="ESCALATED">Escalated</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{requests.length}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">Submitted</div>
            <div className="text-2xl font-bold text-blue-600">
              {requests.filter(r => r.status === "SUBMITTED").length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">In Review</div>
            <div className="text-2xl font-bold text-yellow-600">
              {requests.filter(r => r.status === "IN_REVIEW").length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">Approved</div>
            <div className="text-2xl font-bold text-green-600">
              {requests.filter(r => r.status === "APPROVED").length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">Rejected</div>
            <div className="text-2xl font-bold text-red-600">
              {requests.filter(r => r.status === "REJECTED").length}
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No correction requests found.
              </p>
              {isEmployee && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Submit Your First Request
                </button>
              )}
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Request #{request._id.slice(-8)}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)} {request.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    {typeof request.employeeId === "object" && request.employeeId && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        👤 {request.employeeId.firstName} {request.employeeId.lastName} ({request.employeeId.email})
                      </p>
                    )}

                    <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg mb-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Reason:</strong> {request.reason}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    
              
                    


                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    {/* Managers can approve/reject SUBMITTED, IN_REVIEW, or ESCALATED requests */}
                    {canApproveReject && (
                      request.status === "SUBMITTED" || 
                      request.status === "IN_REVIEW" || 
                      request.status === "ESCALATED"
                    ) && (
                      <>
                        <button
                          onClick={() => handleApprove(request._id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md text-sm font-medium"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md text-sm font-medium"
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}
                    
                    {/* Employees can edit SUBMITTED, IN_REVIEW, or ESCALATED requests */}
                    {isEmployee && (
                      request.status === "SUBMITTED" || 
                      request.status === "IN_REVIEW" || 
                      request.status === "ESCALATED"
                    ) && (
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition shadow-md text-sm font-medium"
                      >
                        ✏️ Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || selectedRequest) && (
        <CorrectionRequestModal
          request={selectedRequest}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedRequest(null);
          }}
          onSuccess={() => {
            fetchRequests();
            setShowCreateModal(false);
            setSelectedRequest(null);
          }}
          userId={user?.userid || ""}
        />
      )}
    </div>
  );
}

// Create/Edit Modal Component
function CorrectionRequestModal({
  request,
  onClose,
  onSuccess,
  userId,
}: {
  request: CorrectionRequest | null;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}) {
  const [attendanceRecordId, setAttendanceRecordId] = useState(request?.attendanceRecord || "");
  const [reason, setReason] = useState(request?.reason || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (request) {
        // Update existing request (only reason can be updated)
        await axios.patch(
          `http://localhost:4000/time-management/attendance-correction-request/${request._id}`,
          { reason },
          { withCredentials: true }
        );
      } else {
        // Create new request
        await axios.post(
          "http://localhost:4000/time-management/attendance-correction-request",
          {
            employeeId: userId,
            attendanceRecordId,
            reason,
          },
          { withCredentials: true }
        );
      }
      onSuccess();
    } catch (err: any) {
      console.error("Error saving request:", err);
      const errorMsg = err.response?.data?.message || "Failed to save request. Please try again.";
      alert(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {request ? "✏️ Edit Correction Request" : "➕ Submit Correction Request"}
          </h2>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {request 
            ? "Update the reason for your correction request"
            : "Submit a request to correct your attendance record"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!request && (
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                📋 Attendance Record ID
              </label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={attendanceRecordId}
                onChange={(e) => setAttendanceRecordId(e.target.value)}
                placeholder="Enter attendance record ID"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Find this in your attendance records page
              </p>
            </div>
          )}

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              📝 Reason for Correction
            </label>
            <textarea
              required
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why this attendance record needs correction..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Be specific about what needs to be corrected and why
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> Your request will be reviewed by your line manager or HR admin. 
              Requests older than 48 hours may be auto-escalated.
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
                  Submitting...
                </span>
              ) : (
                `📤 ${request ? "Update Request" : "Submit Request"}`
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