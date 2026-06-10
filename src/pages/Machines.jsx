import { useState, useEffect } from "react";
import { machinesData } from "./Data/machinesData";

export default function Machines() {
  const [search, setSearch] = useState("");
  const [selectedMachine, setSelectedMachine] =
    useState(null);

  const [department, setDepartment] =
    useState("");

  const [machineName, setMachineName] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [status, setStatus] =
    useState("Running");

  const [editId, setEditId] =
    useState(null);

  const [machines, setMachines] =
    useState(() => {
      const saved =
        localStorage.getItem("machines");

      return saved
        ? JSON.parse(saved)
        : [];
    });

  const schedules = JSON.parse(
    localStorage.getItem("schedules") ||
      "[]"
  );

  useEffect(() => {
    localStorage.setItem(
      "machines",
      JSON.stringify(machines)
    );
  }, [machines]);

  const addMachine = () => {
    if (
      !department ||
      !machineName ||
      !location
    ) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      setMachines(
        machines.map((m) =>
          m.id === editId
            ? {
                ...m,
                department,
                name: machineName,
                location,
                status,
              }
            : m
        )
      );

      setEditId(null);
    } else {
      const newMachine = {
        id: Date.now(),
        department,
        name: machineName,
        location,
        status,
      };

      setMachines([
        ...machines,
        newMachine,
      ]);
    }

    setDepartment("");
    setMachineName("");
    setLocation("");
    setStatus("Running");
  };

  const deleteMachine = (id) => {
    setMachines(
      machines.filter(
        (m) => m.id !== id
      )
    );
  };

  const editMachine = (machine) => {
    setDepartment(
      machine.department
    );

    setMachineName(
      machine.name
    );

    setLocation(
      machine.location
    );

    setStatus(
      machine.status
    );

    setEditId(machine.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredMachines =
    machines.filter(
      (machine) =>
        machine.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        machine.department
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="min-h-screen bg-[#081421] text-white p-8">

      <h1 className="text-4xl font-bold mb-6">
        Machine Management
      </h1>

      <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700 mb-6">

        <h2 className="text-2xl font-bold mb-5">
          {editId
            ? "Edit Machine"
            : "Add Machine"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <select
            value={department}
            onChange={(e) => {
              setDepartment(
                e.target.value
              );

              setMachineName("");
            }}
            className="bg-[#162538] p-3 rounded-lg"
          >
            <option value="">
              Select Department
            </option>

            {Object.keys(
              machinesData
            ).map((dept) => (
              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            ))}
          </select>

          <select
            value={machineName}
            onChange={(e) =>
              setMachineName(
                e.target.value
              )
            }
            className="bg-[#162538] p-3 rounded-lg"
          >
            <option value="">
              Select Machine
            </option>

            {department &&
              machinesData[
                department
              ]?.map(
                (machine) => (
                  <option
                    key={machine}
                    value={machine}
                  >
                    {machine}
                  </option>
                )
              )}
          </select>

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
            className="bg-[#162538] p-3 rounded-lg"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="bg-[#162538] p-3 rounded-lg"
          >
            <option>
              Running
            </option>

            <option>
              Maintenance
            </option>

            <option>
              Stopped
            </option>
          </select>

        </div>

        <button
          onClick={addMachine}
          className="mt-5 bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-lg"
        >
          {editId
            ? "Update Machine"
            : "Add Machine"}
        </button>

      </div>

      <div className="bg-cyan-600 w-60 p-5 rounded-xl shadow-lg mb-6">

        <p>Total Machines</p>

        <h2 className="text-3xl font-bold">
          {machines.length}
        </h2>

      </div>

      <input
        type="text"
        placeholder="Search Machine..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="bg-[#162538] p-3 rounded-lg w-full mb-6 outline-none"
      />

      <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700">

        <h2 className="text-xl font-semibold mb-4">
          Machine List
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="p-3 text-left">
                Machine
              </th>

              <th className="p-3 text-left">
                Department
              </th>

              <th className="p-3 text-left">
                Location
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

            {filteredMachines.map(
              (machine) => (
                <tr
                  key={machine.id}
                  className="border-b border-slate-800"
                >

                  <td className="p-3">
                    {machine.name}
                  </td>

                  <td className="p-3">
                    {
                      machine.department
                    }
                  </td>

                  <td className="p-3">
                    {
                      machine.location
                    }
                  </td>

                  <td className="p-3">
                    {machine.status}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        setSelectedMachine(
                          machine
                        )
                      }
                      className="bg-cyan-600 px-4 py-2 rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        editMachine(
                          machine
                        )
                      }
                      className="bg-blue-600 px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteMachine(
                          machine.id
                        )
                      }
                      className="bg-red-600 px-4 py-2 rounded"
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

      {selectedMachine && (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

          <div className="bg-[#0d1b2a] p-8 rounded-xl w-[500px]">

            <h2 className="text-2xl font-bold mb-5">
              Machine Details
            </h2>

            <p>
              Name :
              {" "}
              {
                selectedMachine.name
              }
            </p>

            <p>
              Department :
              {" "}
              {
                selectedMachine.department
              }
            </p>

            <p>
              Location :
              {" "}
              {
                selectedMachine.location
              }
            </p>

            <p>
              Status :
              {" "}
              {
                selectedMachine.status
              }
            </p>

            <div className="mt-5">

              <h3 className="font-bold mb-3">
                Maintenance History
              </h3>

              {schedules.filter(
                (s) =>
                  s.machine ===
                  selectedMachine.name
              ).length > 0 ? (

                schedules
                  .filter(
                    (s) =>
                      s.machine ===
                      selectedMachine.name
                  )
                  .map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={index}
                        className="bg-[#162538] p-3 rounded mb-2"
                      >
                        <p>
                          Date :
                          {" "}
                          {
                            item.date
                          }
                        </p>

                        <p>
                          Technician :
                          {" "}
                          {
                            item.technician
                          }
                        </p>

                        <p>
                          Status :
                          {" "}
                          {
                            item.status
                          }
                        </p>

                      </div>
                    )
                  )

              ) : (
                <p>
                  No History Found
                </p>
              )}

            </div>

            <button
              onClick={() =>
                setSelectedMachine(
                  null
                )
              }
              className="mt-5 bg-red-600 px-5 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
