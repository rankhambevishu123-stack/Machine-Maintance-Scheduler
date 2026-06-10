import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function History() {
  const [schedules, setSchedules] = useState([]);
  const [breakdownHistory, setBreakdownHistory] = useState([]);

  useEffect(() => {
    Promise.all([api.list("schedules"), api.list("history")])
      .then(([scheduleItems, historyItems]) => {
        setSchedules(scheduleItems);
        setBreakdownHistory(historyItems);
      })
      .catch(() => {
        setSchedules([]);
        setBreakdownHistory([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#081421] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Maintenance History</h1>

      <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700">
        {schedules.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-3">Machine</th>
                <th className="text-left p-3">Technician</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {schedules
                .slice()
                .reverse()
                .map((item) => (
                  <tr key={item.id} className="border-b border-slate-800">
                    <td className="p-3">{item.machine}</td>
                    <td className="p-3">{item.technician}</td>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          item.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No Maintenance History Found</p>
        )}
      </div>

      <div className="mt-8 bg-[#0d1b2a] p-6 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-4">Breakdown History</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-3 text-left">Machine</th>
              <th className="p-3 text-left">Issue</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {breakdownHistory.map((item) => (
              <tr key={item.id} className="border-b border-slate-800">
                <td className="p-3">{item.machine}</td>
                <td className="p-3">{item.issue}</td>
                <td className="p-3">{item.priority}</td>
                <td className="p-3">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}