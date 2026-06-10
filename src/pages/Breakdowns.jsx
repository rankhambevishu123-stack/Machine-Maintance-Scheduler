import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Breakdowns() {
  const [breakdowns, setBreakdowns] = useState([]);
  const [machine, setMachine] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    api.list("breakdowns").then(setBreakdowns).catch(() => setBreakdowns([]));
  }, []);

  const refreshBreakdowns = async () => {
    setBreakdowns(await api.list("breakdowns"));
  };

  const addBreakdown = async () => {
    if (!machine || !issue) {
      alert("Fill all fields");
      return;
    }

    await api.create("breakdowns", {
      machine,
      issue,
      priority,
      date: new Date().toISOString().split("T")[0],
      status: "Open",
    });

    await refreshBreakdowns();
    setMachine("");
    setIssue("");
    setPriority("Medium");
  };

  const closeBreakdown = async (id) => {
    const selected = breakdowns.find((item) => item.id === id);
    if (!selected) return;

    await api.update("breakdowns", id, { ...selected, status: "Closed" });
    await api.create("history", {
      machine: selected.machine,
      issue: selected.issue,
      priority: selected.priority,
      date: new Date().toISOString().split("T")[0],
      status: "Resolved",
      type: "Breakdown",
    });

    await refreshBreakdowns();
  };

  const deleteBreakdown = async (id) => {
    await api.remove("breakdowns", id);
    await refreshBreakdowns();
  };

  return (
    <div className="min-h-screen bg-[#081421] text-white p-8">

      <h1 className="text-4xl font-bold mb-6">
        Breakdown Management
      </h1>

      <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Report Breakdown
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Machine Name"
            value={machine}
            onChange={(e) =>
              setMachine(e.target.value)
            }
            className="bg-[#162538] p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Issue"
            value={issue}
            onChange={(e) =>
              setIssue(e.target.value)
            }
            className="bg-[#162538] p-3 rounded-lg"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="bg-[#162538] p-3 rounded-lg"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </div>

        <button
          onClick={addBreakdown}
          className="mt-5 bg-red-600 px-6 py-3 rounded-lg"
        >
          Add Breakdown
        </button>

      </div>

      <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700">

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-3 text-left">Machine</th>
              <th className="p-3 text-left">Issue</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {breakdowns.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-800"
              >
                <td className="p-3">
                  {item.machine}
                </td>

                <td className="p-3">
                  {item.issue}
                </td>

                <td className="p-3">
                  {item.priority}
                </td>

                <td className="p-3">
                  {item.date}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      item.status === "Closed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">

                  {item.status === "Open" && (
                    <button
                      onClick={() =>
                        closeBreakdown(item.id)
                      }
                      className="bg-green-600 px-3 py-2 rounded-lg"
                    >
                      Close
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteBreakdown(item.id)
                    }
                    className="bg-red-600 px-3 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}