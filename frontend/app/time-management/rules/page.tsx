 "use client";

import { useAuth } from "@/app/(system)/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/ApiClient";

// ----------------------------------
// RULE SECTION CARD PROPS
// ----------------------------------
type RuleSectionProps = {
  title: string;
  type: "lateness" | "overtime" | "schedule" | "exception";
  data: any[];
};

// ----------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------
export default function RulesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div className="p-6 text-white">Loading...</div>;

   const allowed = ["hr admin", "system admin", "manager"];

const hasAccess = user?.roles?.some(r =>
  allowed.includes(r.toLowerCase())
);

if (!hasAccess) {
  router.replace("/unauthorized");
  return null;
}

 

  // ----------------------------------
  // STATES
  // ----------------------------------
  const [latenessRules, setLatenessRules] = useState<any[]>([]);
  const [overtimeRules, setOvertimeRules] = useState<any[]>([]);
  const [scheduleRules, setScheduleRules] = useState<any[]>([]);
  const [timeExceptions, setTimeExceptions] = useState<any[]>([]);

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);
  const [modalType, setModalType] = useState<string>("");

  // Form data
  const [form, setForm] = useState<any>({});

  // ----------------------------------
  // LOAD ALL RULES
  // ----------------------------------
  const fetchAll = async () => {
    try {
      const late = await  axiosInstance.get("/time-management/lateness-rule");
      const over = await  axiosInstance.get("/time-management/overtime-rule");
      const sched = await  axiosInstance.get("/time-management/schedule-rule");
      console.log("Schedule rules:", sched.data);

setScheduleRules(sched.data.data);

      const ex = await axiosInstance.get("/time-exception");

      setLatenessRules(late.data.data);
      setOvertimeRules(over.data.data);
      setScheduleRules(sched.data.data);
      setTimeExceptions(ex.data.data);
    } catch (err) {
      console.log("Error fetching rules:", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ----------------------------------
  // DELETE RULE
  // ----------------------------------
  const deleteRule = async (type: string, id: string) => {
    const endpoints: Record<string, string> = {
      lateness: `/time-management/lateness-rule/${id}`,
      overtime: `/time-management/overtime-rule/${id}`,
      schedule: `/time-management/schedule-rule/${id}`,
      exception: `/time-exception/${id}`,
    };

    try {
      await axiosInstance.delete(endpoints[type]);
      alert("Deleted successfully");
      fetchAll();
    } catch (err) {
      console.log("Delete error:", err);
      alert("Failed to delete rule");
    }
  };

  // ----------------------------------
  // OPEN CREATE / EDIT FORMS
  // ----------------------------------
  const openCreateForm = (type: string) => {
    setModalType(type);
    setEditingRule(null);
    setForm({});
    setOpenModal(true);
  };

  const openEditForm = (type: string, rule: any) => {
    setModalType(type);
    setEditingRule(rule);
    setForm(rule);
    setOpenModal(true);
  };

  // ----------------------------------
  // SUBMIT FORM (CREATE / UPDATE)
  // ----------------------------------
  const handleSubmit = async () => {
    const createEndpoints: Record<string, string> = {
      lateness: "/time-management/lateness-rule",
      overtime: "/time-management/overtime-rule",
      schedule: "/time-management/schedule-rule",
    };

    const updateEndpoints: Record<string, string> = {
      lateness: `/time-management/lateness-rule/${editingRule?._id}`,
      overtime: `/time-management/overtime-rule/${editingRule?._id}`,
      schedule: `/time-management/schedule-rule/${editingRule?._id}`,
    };

    try {
      if (editingRule) {
        await axiosInstance.patch(updateEndpoints[modalType], form);
      } else {
        await axiosInstance.post(createEndpoints[modalType], form);
      }

      setOpenModal(false);
      fetchAll();
   } catch (err: any) {
  console.log("SAVE ERROR FULL:", err.response?.data || err.message);
  alert(JSON.stringify(err.response?.data, null, 2));
}

  };

  // ----------------------------------
  // FORM UI (depends on rule type)
  // ----------------------------------
  const renderFormFields = () => {
    switch (modalType) {
      case "lateness":
        return (
          <>
            <label>Name</label>
            <input
              className="text-black p-2 rounded"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Description</label>
            <input
              className="text-black p-2 rounded"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <label>Grace Period (minutes)</label>
            <input
              className="text-black p-2 rounded"
              type="number"
              value={form.gracePeriodMinutes || ""}
              onChange={(e) =>
                setForm({ ...form, gracePeriodMinutes: +e.target.value })
              }
            />

            <label>Deduction per minute</label>
            <input
              className="text-black p-2 rounded"
              type="number"
              value={form.deductionForEachMinute || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  deductionForEachMinute: +e.target.value,
                })
              }
            />
          </>
        );

      case "overtime":
        return (
          <>
            <label>Name</label>
            <input
              className="text-black p-2 rounded"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Description</label>
            <input
              className="text-black p-2 rounded"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </>
        );

      case "schedule":
        return (
          <>
            <label>Name</label>
            <input
              className="text-black p-2 rounded"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Pattern</label>
            <input
              className="text-black p-2 rounded"
              value={form.pattern || ""}
              onChange={(e) => setForm({ ...form, pattern: e.target.value })}
            />
          </>
        );

      default:
        return <p>No fields for exception rules.</p>;
    }
  };

  // ----------------------------------
  // RULE SECTION CARD
  // ----------------------------------
  console.log("Schedule rules state:", scheduleRules, Array.isArray(scheduleRules));

 const RuleSection = ({ title, type, data = [] }: RuleSectionProps) => (

    <div className="border rounded-lg p-6 bg-gray-900 text-white shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {type !== "exception" && (
        <button
          className="mb-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          onClick={() => openCreateForm(type)}
        >
          + Create New Rule
        </button>
      )}

      {data.length === 0 ? (
        <p className="text-gray-400">No rules found.</p>
      ) : (
        <ul className="space-y-4">
        {Array.isArray(data) && data.map((rule: any) => (

            <li
              key={rule._id}
              className="flex justify-between items-center p-4 border rounded bg-gray-800"
            >
              <div>
                <p className="font-bold">{rule.name ?? "Rule"}</p>
                <p className="text-gray-400 text-sm">{rule.description ?? ""}</p>
              </div>

              <div className="flex gap-4">
                {type !== "exception" && (
                  <button
                    className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => openEditForm(type, rule)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                  onClick={() => deleteRule(type, rule._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // ----------------------------------
  // PAGE UI
  // ----------------------------------
  return (
    <div className="text-white p-8 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Time Management Rules</h1>

      <RuleSection title="Lateness Rules" type="lateness" data={latenessRules} />
      <RuleSection title="Overtime Rules" type="overtime" data={overtimeRules} />
      <RuleSection title="Schedule Rules" type="schedule" data={scheduleRules} />
      <RuleSection title="Time Exception Rules" type="exception" data={timeExceptions} />

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">
              {editingRule ? "Edit Rule" : "Create Rule"}
            </h2>

            <div className="space-y-3">{renderFormFields()}</div>

            <button
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded"
              onClick={handleSubmit}
            >
              Save
            </button>

            <button
              className="mt-2 w-full bg-gray-400 text-black py-2 rounded"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
}
