 "use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/(system)/context/authContext";
import axiosInstance from "@/app/utils/ApiClient";
import Link from "next/link";

/* ================= TYPES ================= */

type TimeException = {
  _id: string;
  date: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

/* ================= PAGE ================= */

export default function TimeExceptionsPage() {
  const { user, loading } = useAuth();

  // SAME AS NOTIFICATIONS
  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <EmployeeTimeExceptions user={user} />;
}

/* ================= EMPLOYEE VIEW ================= */

function EmployeeTimeExceptions({ user }: { user: any }) {
  const [view, setView] = useState<"list" | "new">("list");
  const [requests, setRequests] = useState<TimeException[]>([]);
  function addRequest(request: TimeException) {
  setRequests((prev) => [request, ...prev]);
  setView("list"); // go back to My Requests
}
 

  

 

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link
        href="/time-management"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold mb-6">
        time Exceptions page
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 border rounded"
          onClick={() => setView("list")}
        >
          My Requests
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setView("new")}
        >
          New Request
        </button>
      </div>

      {view === "list" && <EmployeeTable data={requests} />}
   {view === "new" && (
  <NewRequestForm user={user} addRequest={addRequest} />
)}

    </div>
  );
}

/* ================= TABLE ================= */

function EmployeeTable({ data }: { data: TimeException[] }) {
  if (!data.length) return <p>No requests yet.</p>;

  return (
    <table className="w-full border">
      <thead>
          <tr className="border-b border-gray-600">

          <th className="p-2 border">Date</th>
          <th className="p-2 border">Reason</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r._id}>
            <td className="p-2 border">{r.date}</td>
            <td className="p-2 border">{r.reason}</td>
            <td className="p-2 border">{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ================= NEW REQUEST ================= */

 function NewRequestForm({
  user,
  addRequest,
}: {
  user: any;
  addRequest: (r: TimeException) => void;
}) {

  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

   async function submit() {
  if (!reason.trim()) {
    alert("Reason is required");
    return;
  }

  try {
    setSubmitting(true);

    await axiosInstance.post(
      "/time-management/attendance-correction-request",
      {
        employeeId: user.userid,
        attendanceDate: new Date().toISOString().split("T")[0],
        reason,
      }
    );

    // 🔥 ADD TO UI IMMEDIATELY
    addRequest({
      _id: Math.random().toString(),
      date: new Date().toISOString().split("T")[0],
      reason,
      status: "PENDING",
    });

    setReason("");
    alert("Request submitted successfully");
  } catch (err: any) {
    console.error("SUBMIT ERROR 👉", err.response?.data || err.message);
    alert("Backend rejected the request");
  } finally {
    setSubmitting(false);
  }
}


  return (
    <div className="max-w-md">
      <textarea
        className="w-full border p-2 mb-4"
        placeholder="Explain why you need correction..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <button
        disabled={submitting}
        onClick={submit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}