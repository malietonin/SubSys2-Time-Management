"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/app/(system)/context/authContext";

/* ===================== TYPES ===================== */

type AssignShiftPayload = {
  employeeId?: string;
  departmentId?: string;
  positionId?: string;
  shiftId: string;
  startDate: string;
  endDate?: string;
};

type CreateShiftPayload = {
  name: string;
  shiftType: string;
  startTime: string;
  endTime: string;
  active?: boolean;
};

type Employee = {
  _id: string;
  firstName: string;
  lastName: string;
  workEmail: string;
};

type Department = {
  _id: string;
  code: string;
  name: string;
};

type Position = {
  _id: string;
  code: string;
  title: string;
};

type ShiftType = {
  _id: string;
  name: string;
};

type Shift = {
  _id: string;
  name: string;
};

/* ===================== PAGE ===================== */

export default function Shift() {
  const { user } = useAuth();

  const isAdmin =
    user?.roles?.includes("System Admin") ||
    user?.roles?.includes("HR Admin");

  /* ---------- State ---------- */
  const [assignData, setAssignData] = useState<AssignShiftPayload>({
    shiftId: "",
    startDate: "",
  });

  const [shiftData, setShiftData] = useState<CreateShiftPayload>({
    name: "",
    shiftType: "",
    startTime: "",
    endTime: "",
    active: true,
  });

  const [assignScope, setAssignScope] = useState<"employee" | "position" | "department">("employee");

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);

  /* ---------- Fetch HR Data ---------- */
  useEffect(() => {
    if (!isAdmin) return;

    async function fetchData() {
      try {
        const [empRes, deptRes, posRes, shiftTypeRes, shiftsRes] =
          await Promise.all([
            axios.get("http://localhost:4000/employee-profile/", { withCredentials: true }),
            axios.get("http://localhost:4000/organization-structure/departments", { withCredentials: true }),
            axios.get("http://localhost:4000/organization-structure/positions", { withCredentials: true }),
            axios.get("http://localhost:4000/time-management/shift-type", { withCredentials: true }),
            axios.get("http://localhost:4000/time-management/shift", { withCredentials: true }),
          ]);

        setEmployees(empRes.data);
        setDepartments(deptRes.data);
        setPositions(posRes.data);
        setShiftTypes(shiftTypeRes.data.data);
        setShifts(shiftsRes.data.data);
      } catch (err) {
        console.error("Failed to load HR data", err);
      }
    }

    fetchData();
  }, [isAdmin]);

  /* ---------- Actions ---------- */
  async function assignShift(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/time-management/assign-shift",
        assignData,
        { withCredentials: true }
      );
      alert("Shift assigned successfully!");
      setAssignData({ shiftId: "", startDate: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to assign shift");
    }
  }

  async function createShift(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/time-management/shift",
        shiftData,
        { withCredentials: true }
      );
      alert("Shift created successfully!");
      setShiftData({
        name: "",
        shiftType: "",
        startTime: "",
        endTime: "",
        active: true,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create shift");
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">
          You do not have access to this page.
        </p>
      </div>
    );
  }

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Link
            href="/time-management"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            &larr; Back to Dashboard
          </Link>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white my-6">
            Shift Management ⏱️
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ================= Assign Shift ================= */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Assign Shift
              </h3>

              <form onSubmit={assignShift} className="space-y-4">
                {/* Scope Selector */}
                <select
                  className="w-full p-2  rounded dark:bg-gray-700 dark:text-white"
                  value={assignScope}
                  onChange={(e) => {
                    const scope = e.target.value as "employee" | "position" | "department";
                    setAssignScope(scope);
                    // Reset previous selection
                    setAssignData({
                      shiftId: "",
                      startDate: "",
                      employeeId: undefined,
                      departmentId: undefined,
                      positionId: undefined,
                    });
                  }}
                >
                  <option value="employee">Assign by Employee</option>
                  <option value="position">Assign by Position</option>
                  <option value="department">Assign by Department</option>
                </select>

                {/* Conditional Field */}
                {assignScope === "employee" && (
                  <select
                    className="w-full p-2  rounded dark:bg-gray-700 dark:text-white"
                    value={assignData.employeeId || ""}
                    onChange={(e) =>
                      setAssignData({ ...assignData, employeeId: e.target.value || undefined })
                    }
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.firstName} {emp.lastName} ({emp.workEmail})
                      </option>
                    ))}
                  </select>
                )}

                {assignScope === "position" && (
                  <select
                    className="w-full p-2  rounded dark:bg-gray-700 dark:text-white"
                    value={assignData.positionId || ""}
                    onChange={(e) =>
                      setAssignData({ ...assignData, positionId: e.target.value || undefined })
                    }
                  >
                    <option value="">Select Position</option>
                    {positions.map((pos) => (
                      <option key={pos._id} value={pos._id}>
                        {pos.code} - {pos.title}
                      </option>
                    ))}
                  </select>
                )}

                {assignScope === "department" && (
                  <select
                    className="w-full p-2  rounded dark:bg-gray-700 dark:text-white"
                    value={assignData.departmentId || ""}
                    onChange={(e) =>
                      setAssignData({ ...assignData, departmentId: e.target.value || undefined })
                    }
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.code} - {dept.name}
                      </option>
                    ))}
                  </select>
                )}

                {/* Shift Selector */}
                <select
                  required
                  className="w-full p-2  rounded dark:bg-gray-700 dark:text-white"
                  value={assignData.shiftId}
                  onChange={(e) => setAssignData({ ...assignData, shiftId: e.target.value })}
                >
                  <option value="">Select Shift</option>
                  {shifts.map((shift) => (
                    <option key={shift._id} value={shift._id}>
                      {shift.name}
                    </option>
                  ))}
                </select>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    required
                    className="p-2  rounded dark:bg-gray-700 dark:text-white"
                    value={assignData.startDate}
                    onChange={(e) =>
                      setAssignData({ ...assignData, startDate: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    className="p-2  rounded dark:bg-gray-700 dark:text-white"
                    value={assignData.endDate || ""}
                    onChange={(e) =>
                      setAssignData({ ...assignData, endDate: e.target.value })
                    }
                  />
                </div>

                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Assign Shift
                </button>
              </form>
            </div>

            {/* ================= Create Shift ================= */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Create Shift
              </h3>

              <form onSubmit={createShift} className="space-y-4">
                <input
                  placeholder="Shift Name"
                  required
                  className="w-full p-2  rounded dark:bg-gray-700 dark:text-white"
                  value={shiftData.name}
                  onChange={(e) =>
                    setShiftData({ ...shiftData, name: e.target.value })
                  }
                />

                {/* Shift Type */}
                <select
                  required
                  className="w-full p-2  rounded dark:bg-gray-700 dark:text-white"
                  value={shiftData.shiftType}
                  onChange={(e) =>
                    setShiftData({ ...shiftData, shiftType: e.target.value })
                  }
                >
                  <option value="">Select Shift Type</option>
                  {shiftTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>

                {/* Times */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="time"
                    required
                    className="p-2  rounded dark:bg-gray-700 dark:text-white"
                    value={shiftData.startTime}
                    onChange={(e) =>
                      setShiftData({ ...shiftData, startTime: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    required
                    className="p-2  rounded dark:bg-gray-700 dark:text-white"
                    value={shiftData.endTime}
                    onChange={(e) =>
                      setShiftData({ ...shiftData, endTime: e.target.value })
                    }
                  />
                </div>

                {/* Active */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={shiftData.active}
                    onChange={(e) =>
                      setShiftData({ ...shiftData, active: e.target.checked })
                    }
                  />
                  <span className="text-gray-700 dark:text-gray-300">Active</span>
                </div>

                <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Create Shift
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
