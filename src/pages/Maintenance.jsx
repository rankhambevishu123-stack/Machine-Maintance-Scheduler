import { useState, useEffect } from "react";

export default function Maintenance() {
  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem("schedules");
    
    return saved ? JSON.parse(saved) : [];
  });

  const machines = JSON.parse(
    localStorage.getItem("machines") || "[]"
  );

  const technicians = JSON.parse(
    localStorage.getItem("technicians") || "[]"
  );

  const [machine, setMachine] = useState("");
  const [technician, setTechnician] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "schedules",
      JSON.stringify(schedules)
    );
  }, [schedules]);

  const addSchedule = () => {
    if (
      !machine ||
      !technician ||
      !date
    ) {
      alert("Please fill all fields");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      machine,
      technician,
      date,
      priority,
      status: "Pending",
    };

    setSchedules([
      ...schedules,
      newSchedule,
    ]);

    setMachine("");
    setTechnician("");
    setDate("");
    setPriority("Medium");
  };

  const deleteSchedule = (id) => {
    setSchedules(
      schedules.filter(
        (item) => item.id !== id
      )
    );
  };

  const toggleStatus = (id) => {
    setSchedules(
      schedules.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status ===
                "Pending"
                  ? "Completed"
                  : "Pending",
            }
          : item
      )
    );
  };

  const filteredSchedules =
    schedules.filter(
      (item) =>
        item.machine
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.technician
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const pendingCount =
    schedules.filter(
      (s) => s.status === "Pending"
    ).length;

  const completedCount =
    schedules.filter(
      (s) =>
        s.status === "Completed"
    ).length;

  const overdueCount =
    schedules.filter(
      (s) =>
        s.status === "Pending" &&
        new Date(s.date) <
          new Date()
    ).length;

  return (
    <div className="min-h-screen bg-[#081421] text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Maintenance Schedule
      </h1>

      {/* Cards */}

      <div className="grid grid-cols-4 gap-4 mb-8">

        <div className="bg-blue-600 p-5 rounded-xl">
          <p>Total Tasks</p>
          <h2 className="text-3xl font-bold">
            {schedules.length}
          </h2>
        </div>

        <div className="bg-yellow-600 p-5 rounded-xl">
          <p>Pending</p>
          <h2 className="text-3xl font-bold">
            {pendingCount}
          </h2>
        </div>

        <div className="bg-red-600 p-5 rounded-xl">
          <p>Overdue</p>
          <h2 className="text-3xl font-bold">
            {overdueCount}
          </h2>
        </div>

        <div className="bg-green-600 p-5 rounded-xl">
          <p>Completed</p>
          <h2 className="text-3xl font-bold">
            {completedCount}
          </h2>
        </div>

      </div>

      {/* Form */}

      <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700 mb-8">

        <h2 className="text-xl font-semibold mb-5">
          Schedule Maintenance
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <select
            value={machine}
            onChange={(e) =>
              setMachine(
                e.target.value
              )
            }
            className="bg-[#162538] p-3 rounded-lg"
          >
            <option value="">
              Select Machine
            </option>

            {machines.map((m) => (
              <option
                key={m.id}
                value={m.name}
              >
                {m.name}
              </option>
            ))}
          </select>

          <select
            value={technician}
            onChange={(e) =>
              setTechnician(
                e.target.value
              )
            }
            className="bg-[#162538] p-3 rounded-lg"
          >
            <option value="">
              Select Technician
            </option>

            {technicians.map(
              (tech) => (
                <option
                  key={tech.id}
                  value={tech.name}
                >
                  {tech.name}
                </option>
              )
            )}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="bg-[#162538] p-3 rounded-lg"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="bg-[#162538] p-3 rounded-lg"
          >
            <option>
              Low
            </option>
            <option>
              Medium
            </option>
            <option>
              High
            </option>
          </select>

        </div>

        <button
          onClick={addSchedule}
          className="mt-5 bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-lg"
        >
          Add Schedule
        </button>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Schedule..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="bg-[#162538] p-3 rounded-lg w-full mb-6"
      />

      {/* Table */}

      <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700">

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-3 text-left">
                Machine
              </th>

              <th className="p-3 text-left">
                Technician
              </th>

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Priority
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredSchedules.map(
              (item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-800"
                >
                  <td className="p-3">
                    {item.machine}
                  </td>

                  <td className="p-3">
                    {item.technician}
                  </td>

                  <td className="p-3">
                    {item.date}
                  </td>

                  <td className="p-3">
                    {item.priority}
                  </td>

                  <td className="p-3">
                    {item.status}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        toggleStatus(
                          item.id
                        )
                      }
                      className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
                    >
                      Done
                    </button>

                    <button
                      onClick={() =>
                        deleteSchedule(
                          item.id
                        )
                      }
                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}