import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Technicians() {
  const [technicians, setTechnicians] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [skill, setSkill] = useState("");
  const [assignedMachines, setAssignedMachines] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    api.list("technicians").then(setTechnicians).catch(() => setTechnicians([]));
  }, []);

  const refreshTechnicians = async () => {
    setTechnicians(await api.list("technicians"));
  };

  const saveTechnician = async () => {
    if (!name || !contact || !skill) {
      alert("Fill all fields");
      return;
    }

    const payload = {
      name,
      contact,
      skill,
      assignedMachines,
    };

    try {
      if (editId) {
        await api.update("technicians", editId, payload);
        setEditId(null);
      } else {
        await api.create("technicians", payload);
      }

      await refreshTechnicians();
      setName("");
      setContact("");
      setSkill("");
      setAssignedMachines("");
    } catch (error) {
      alert(error.message || "Unable to save technician");
    }
  };

  const deleteTechnician = async (id) => {
    await api.remove("technicians", id);
    await refreshTechnicians();
  };

  const editTechnician = (technician) => {
    setName(technician.name);
    setContact(technician.contact);
    setSkill(technician.skill);
    setAssignedMachines(technician.assignedMachines);
    setEditId(technician.id);
  };

  const filtered = technicians.filter(
    (technician) =>
      technician.name.toLowerCase().includes(search.toLowerCase()) ||
      technician.skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#081421] text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Technician Management</h1>

      <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Update Technician" : "Add Technician"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Technician Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#162538] p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="bg-[#162538] p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="bg-[#162538] p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Assigned Machines"
            value={assignedMachines}
            onChange={(e) => setAssignedMachines(e.target.value)}
            className="bg-[#162538] p-3 rounded-lg"
          />
        </div>

        <button
          onClick={saveTechnician}
          className="mt-5 bg-cyan-600 px-6 py-3 rounded-lg"
        >
          {editId ? "Update Technician" : "Add Technician"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Technician..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#162538] p-3 rounded-lg w-full mb-6"
      />

      <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Contact</th>
              <th className="text-left p-3">Skill</th>
              <th className="text-left p-3">Assigned</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((technician) => (
              <tr key={technician.id} className="border-b border-slate-800">
                <td className="p-3">{technician.name}</td>
                <td className="p-3">{technician.contact}</td>
                <td className="p-3">{technician.skill}</td>
                <td className="p-3">{technician.assignedMachines}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => editTechnician(technician)}
                    className="bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTechnician(technician.id)}
                    className="bg-red-600 px-4 py-2 rounded-lg"
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