 "use client";

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/app/(system)/context/authContext";

export interface ScheduleRule {
  _id?: string;
  name: string;
  description?: string;
  workingDaysPerWeek: number;
  workingHoursPerDay: number;
  startTime: string;
  endTime: string;
  breakDuration: number;
  active?: boolean;
}

export interface OvertimeRule {
  _id?: string;
  name: string;
  description?: string;
  type: "DAILY" | "WEEKLY" | "MONTHLY";
  threshold: number;
  rate: number;
  active?: boolean;
}

export interface LatenessRule {
  _id?: string;
  name: string;
  description?: string;
  graceTime: number;
  penaltyType: "DEDUCTION" | "WARNING" | "BOTH";
  penaltyAmount?: number;
  active?: boolean;
}

type RuleType = "schedule" | "overtime" | "lateness";

export default function Rules() {
  const [scheduleRules, setScheduleRules] = useState<ScheduleRule[]>([]);
  const [overtimeRules, setOvertimeRules] = useState<OvertimeRule[]>([]);
  const [latenessRules, setLatenessRules] = useState<LatenessRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<RuleType>("schedule");
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);

  const [newScheduleRule, setNewScheduleRule] = useState<ScheduleRule>({
    name: "",
    description: "",
    workingDaysPerWeek: 5,
    workingHoursPerDay: 8,
    startTime: "09:00",
    endTime: "17:00",
    breakDuration: 60,
    active: true,
  });

  const [newOvertimeRule, setNewOvertimeRule] = useState<OvertimeRule>({
    name: "",
    description: "",
    type: "DAILY",
    threshold: 8,
    rate: 1.5,
    active: true,
  });

  const [newLatenessRule, setNewLatenessRule] = useState<LatenessRule>({
    name: "",
    description: "",
    graceTime: 15,
    penaltyType: "WARNING",
    penaltyAmount: 0,
    active: true,
  });

  const { user } = useAuth();

  // Fetch all rules
  const fetchScheduleRules = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/time-management/schedule-rule",
        { withCredentials: true }
      );
      setScheduleRules(res.data.data || []);
    } catch (err) {
      console.log("Error fetching schedule rules:", err);
    }
  };

  const fetchOvertimeRules = async () => {
    try {
      // Note: No GET endpoint in controller, so we'll skip this for now
      setOvertimeRules([]);
    } catch (err) {
      console.log("Error fetching overtime rules:", err);
    }
  };

  const fetchLatenessRules = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/time-management/lateness-rule",
        { withCredentials: true }
      );
      setLatenessRules(res.data || []);
    } catch (err) {
      console.log("Error fetching lateness rules:", err);
    }
  };

  const fetchAllRules = async () => {
    setLoading(true);
    await Promise.all([
      fetchScheduleRules(),
      fetchOvertimeRules(),
      fetchLatenessRules(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllRules();
  }, []);

  // Authorization checks
  const canCreateScheduleRule = user?.roles?.some((role: string) =>
    ["HR Admin"].includes(role)
  );

  const canEditScheduleRule = user?.roles?.some((role: string) =>
    ["HR Manager"].includes(role)
  );

  const canManageOvertimeRules = user?.roles?.some((role: string) =>
    ["HR Manager"].includes(role)
  );

  const canManageLatenessRules = user?.roles?.some((role: string) =>
    ["HR Manager"].includes(role)
  );

  // Submit handlers
  const submitScheduleRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRule) {
        await axios.patch(
          `http://localhost:4000/time-management/schedule-rule/${editingRule._id}`,
          newScheduleRule,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:4000/time-management/schedule-rule",
          newScheduleRule,
          { withCredentials: true }
        );
      }
      fetchScheduleRules();
      resetForm();
    } catch (err) {
      console.error("Error saving schedule rule:", err);
    }
  };

  const submitOvertimeRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRule) {
        await axios.patch(
          `http://localhost:4000/time-management/overtime-rule/${editingRule._id}`,
          newOvertimeRule,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:4000/time-management/overtime-rule",
          newOvertimeRule,
          { withCredentials: true }
        );
      }
      fetchOvertimeRules();
      resetForm();
    } catch (err) {
      console.error("Error saving overtime rule:", err);
    }
  };

  const submitLatenessRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRule) {
        await axios.patch(
          `http://localhost:4000/time-management/lateness-rule/${editingRule._id}`,
          newLatenessRule,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:4000/time-management/lateness-rule",
          newLatenessRule,
          { withCredentials: true }
        );
      }
      fetchLatenessRules();
      resetForm();
    } catch (err) {
      console.error("Error saving lateness rule:", err);
    }
  };

  // Delete handlers
  const deleteScheduleRule = async (id: string) => {
    if (confirm("Are you sure you want to delete this schedule rule?")) {
      try {
        await axios.delete(
          `http://localhost:4000/time-management/schedule-rule/${id}`,
          { withCredentials: true }
        );
        fetchScheduleRules();
      } catch (err) {
        console.error("Error deleting schedule rule:", err);
      }
    }
  };

  const deleteOvertimeRule = async (id: string) => {
    if (confirm("Are you sure you want to delete this overtime rule?")) {
      try {
        await axios.delete(
          `http://localhost:4000/time-management/overtime-rule/${id}`,
          { withCredentials: true }
        );
        fetchOvertimeRules();
      } catch (err) {
        console.error("Error deleting overtime rule:", err);
      }
    }
  };

  const deleteLatenessRule = async (id: string) => {
    if (confirm("Are you sure you want to delete this lateness rule?")) {
      try {
        await axios.delete(
          `http://localhost:4000/time-management/lateness-rule/${id}`,
          { withCredentials: true }
        );
        fetchLatenessRules();
      } catch (err) {
        console.error("Error deleting lateness rule:", err);
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingRule(null);
    setNewScheduleRule({
      name: "",
      description: "",
      workingDaysPerWeek: 5,
      workingHoursPerDay: 8,
      startTime: "09:00",
      endTime: "17:00",
      breakDuration: 60,
      active: true,
    });
    setNewOvertimeRule({
      name: "",
      description: "",
      type: "DAILY",
      threshold: 8,
      rate: 1.5,
      active: true,
    });
    setNewLatenessRule({
      name: "",
      description: "",
      graceTime: 15,
      penaltyType: "WARNING",
      penaltyAmount: 0,
      active: true,
    });
  };

  const editRule = (rule: any, type: RuleType) => {
    setEditingRule(rule);
    setActiveTab(type);
    if (type === "schedule") setNewScheduleRule(rule);
    if (type === "overtime") setNewOvertimeRule(rule);
    if (type === "lateness") setNewLatenessRule(rule);
    setShowForm(true);
  };

  const canAddRule = () => {
    if (activeTab === "schedule") return canCreateScheduleRule;
    if (activeTab === "overtime") return canManageOvertimeRules;
    if (activeTab === "lateness") return canManageLatenessRules;
    return false;
  };

  const canEditRule = () => {
    if (activeTab === "schedule") return canEditScheduleRule;
    if (activeTab === "overtime") return canManageOvertimeRules;
    if (activeTab === "lateness") return canManageLatenessRules;
    return false;
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Loading rules...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      {/* Back button & Add Rule */}
      <div className="mb-4 w-full max-w-6xl flex justify-between items-center">
        <Link
          href="/time-management/timesheet"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          &larr; Back to Dashboard
        </Link>

        {canAddRule() && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {showForm ? "Cancel" : `Add ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Rule`}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 w-full max-w-6xl">
        <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
          {["schedule", "overtime", "lateness"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as RuleType);
                setShowForm(false);
                setEditingRule(null);
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
                activeTab === tab
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Rules
            </button>
          ))}
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-6 w-full max-w-6xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {editingRule ? "Edit" : "Add"} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Rule
          </h3>

          {activeTab === "schedule" && (
            <form onSubmit={submitScheduleRule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Rule Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newScheduleRule.name}
                    onChange={(e) =>
                      setNewScheduleRule({ ...newScheduleRule, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newScheduleRule.description}
                    onChange={(e) =>
                      setNewScheduleRule({ ...newScheduleRule, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Working Days/Week
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="7"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newScheduleRule.workingDaysPerWeek}
                    onChange={(e) =>
                      setNewScheduleRule({ ...newScheduleRule, workingDaysPerWeek: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Working Hours/Day
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newScheduleRule.workingHoursPerDay}
                    onChange={(e) =>
                      setNewScheduleRule({ ...newScheduleRule, workingHoursPerDay: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newScheduleRule.startTime}
                    onChange={(e) =>
                      setNewScheduleRule({ ...newScheduleRule, startTime: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newScheduleRule.endTime}
                    onChange={(e) =>
                      setNewScheduleRule({ ...newScheduleRule, endTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Break Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newScheduleRule.breakDuration}
                    onChange={(e) =>
                      setNewScheduleRule({ ...newScheduleRule, breakDuration: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    checked={newScheduleRule.active}
                    onChange={(e) =>
                      setNewScheduleRule({ ...newScheduleRule, active: e.target.checked })
                    }
                  />
                  <span className="text-gray-700 dark:text-gray-300">Active</span>
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {editingRule ? "Update" : "Save"} Schedule Rule
              </button>
            </form>
          )}

          {activeTab === "overtime" && (
            <form onSubmit={submitOvertimeRule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Rule Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newOvertimeRule.name}
                    onChange={(e) =>
                      setNewOvertimeRule({ ...newOvertimeRule, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newOvertimeRule.description}
                    onChange={(e) =>
                      setNewOvertimeRule({ ...newOvertimeRule, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newOvertimeRule.type}
                    onChange={(e) =>
                      setNewOvertimeRule({
                        ...newOvertimeRule,
                        type: e.target.value as OvertimeRule["type"],
                      })
                    }
                    required
                  >
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Threshold (hours)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newOvertimeRule.threshold}
                    onChange={(e) =>
                      setNewOvertimeRule({ ...newOvertimeRule, threshold: parseFloat(e.target.value) })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Rate Multiplier
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newOvertimeRule.rate}
                    onChange={(e) =>
                      setNewOvertimeRule({ ...newOvertimeRule, rate: parseFloat(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newOvertimeRule.active}
                  onChange={(e) =>
                    setNewOvertimeRule({ ...newOvertimeRule, active: e.target.checked })
                  }
                />
                <span className="text-gray-700 dark:text-gray-300">Active</span>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {editingRule ? "Update" : "Save"} Overtime Rule
              </button>
            </form>
          )}

          {activeTab === "lateness" && (
            <form onSubmit={submitLatenessRule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Rule Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newLatenessRule.name}
                    onChange={(e) =>
                      setNewLatenessRule({ ...newLatenessRule, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newLatenessRule.description}
                    onChange={(e) =>
                      setNewLatenessRule({ ...newLatenessRule, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Grace Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newLatenessRule.graceTime}
                    onChange={(e) =>
                      setNewLatenessRule({ ...newLatenessRule, graceTime: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Penalty Type
                  </label>
                  <select
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newLatenessRule.penaltyType}
                    onChange={(e) =>
                      setNewLatenessRule({
                        ...newLatenessRule,
                        penaltyType: e.target.value as LatenessRule["penaltyType"],
                      })
                    }
                    required
                  >
                    <option value="WARNING">Warning</option>
                    <option value="DEDUCTION">Deduction</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Penalty Amount
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    value={newLatenessRule.penaltyAmount}
                    onChange={(e) =>
                      setNewLatenessRule({ ...newLatenessRule, penaltyAmount: parseFloat(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newLatenessRule.active}
                  onChange={(e) =>
                    setNewLatenessRule({ ...newLatenessRule, active: e.target.checked })
                  }
                />
                <span className="text-gray-700 dark:text-gray-300">Active</span>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {editingRule ? "Update" : "Save"} Lateness Rule
              </button>
            </form>
          )}
        </div>
      )}

      {/* Rules List */}
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Rules
        </h2>

        {activeTab === "schedule" && (
          <div className="space-y-4">
            {scheduleRules.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                No schedule rules found.
              </p>
            ) : (
              scheduleRules.map((rule) => (
                <div
                  key={rule._id}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {rule.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {rule.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{rule.workingDaysPerWeek} days/week</span>
                        <span>{rule.workingHoursPerDay} hours/day</span>
                        <span>{rule.startTime} - {rule.endTime}</span>
                        <span>{rule.breakDuration} min break</span>
                        <span className={`px-2 py-1 rounded ${rule.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rule.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    {canEditRule() && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editRule(rule, "schedule")}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteScheduleRule(rule._id!)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "overtime" && (
          <div className="space-y-4">
            {overtimeRules.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                No overtime rules found.
              </p>
            ) : (
              overtimeRules.map((rule) => (
                <div
                  key={rule._id}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {rule.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {rule.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{rule.type}</span>
                        <span>Threshold: {rule.threshold} hours</span>
                        <span>Rate: {rule.rate}x</span>
                        <span className={`px-2 py-1 rounded ${rule.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rule.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    {canEditRule() && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editRule(rule, "overtime")}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteOvertimeRule(rule._id!)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "lateness" && (
          <div className="space-y-4">
            {latenessRules.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                No lateness rules found.
              </p>
            ) : (
              latenessRules.map((rule) => (
                <div
                  key={rule._id}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {rule.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {rule.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Grace: {rule.graceTime} minutes</span>
                        <span>Penalty: {rule.penaltyType}</span>
                        {rule.penaltyAmount && <span>Amount: ${rule.penaltyAmount}</span>}
                        <span className={`px-2 py-1 rounded ${rule.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rule.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    {canEditRule() && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editRule(rule, "lateness")}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteLatenessRule(rule._id!)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
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




