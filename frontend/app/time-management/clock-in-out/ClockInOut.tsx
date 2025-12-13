 "use client";

import { useAuth } from "@/app/(system)/context/authContext";
import axiosInstance from "@/app/utils/ApiClient";
import { useState } from "react";

type ButtonState = "IDLE" | "IN" | "OUT";

export default function ClockInOut() {
  const { user } = useAuth();

  const [state, setState] = useState<ButtonState>("IDLE");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ ADDED: store clock-in time
  const [clockInTime, setClockInTime] = useState<number | null>(null);

  if (!user) return null;

  const employeeId = user.userid;

  const handleClick = async () => {
    setLoading(true);
    setMessage("");

    try {
      // 🔘 FIRST CLICK → CLOCK IN
      if (state === "IDLE") {
        await axiosInstance.post(
          "/time-management/attendance-record/clock-in",
          { employeeId, punchType: "IN" }
        );

        // ✅ SAVE CLOCK-IN TIME
        setClockInTime(Date.now());

        setState("IN");
        setMessage("✅ Clocked in successfully");
      }

      // 🔴 SECOND CLICK → CLOCK OUT
      else if (state === "IN") {
        await axiosInstance.post(
          "/time-management/attendance-record/clock-out",
          { employeeId, punchType: "OUT" }
        );

        if (!clockInTime) {
          setMessage("❌ Clock-in time not found");
          return;
        }

        const clockOutTime = Date.now();
        const diffMs = clockOutTime - clockInTime;

        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(
          (diffMs % (1000 * 60 * 60)) / (1000 * 60)
        );

        setState("OUT");
        setMessage(
          `✅ Clocked out successfully. Total working time: ${diffHours}h ${diffMinutes}m`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Button UI based on state
  const buttonConfig = {
    IDLE: {
      label: "Clock In / Out",
      className: "bg-gray-500 hover:bg-gray-600",
    },
    IN: {
      label: "Clock In",
      className: "bg-green-600 hover:bg-green-700",
    },
    OUT: {
      label: "Clock Out",
      className: "bg-red-600 hover:bg-red-700",
    },
  };

  const { label, className } = buttonConfig[state];

  return (
    <div className="mt-6">
      <button
        onClick={handleClick}
        disabled={loading || state === "OUT"}
        className={`px-8 py-3 rounded-lg font-semibold text-white transition
          ${className}
          ${loading ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {label}
      </button>

      {message && (
        <p className="mt-3 text-sm text-gray-200">{message}</p>
      )}
    </div>
  );
}
