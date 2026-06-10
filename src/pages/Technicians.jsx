import { useState, useEffect } from "react";

export default function Technicians() {
const [technicians, setTechnicians] = useState(() => {
const saved = localStorage.getItem("technicians");
return saved ? JSON.parse(saved) : [];
});

const [name, setName] = useState("");
const [contact, setContact] = useState("");
const [skill, setSkill] = useState("");
const [assignedMachines, setAssignedMachines] = useState("");
const [search, setSearch] = useState("");
const [editId, setEditId] = useState(null);

useEffect(() => {
localStorage.setItem(
"technicians",
JSON.stringify(technicians)
);
}, [technicians]);

const saveTechnician = () => {
if (!name || !contact || !skill) {
alert("Fill all fields");
return;
}

```
if (editId) {
  setTechnicians(
    technicians.map((t) =>
      t.id === editId
        ? {
            ...t,
            name,
            contact,
            skill,
            assignedMachines,
          }
        : t
    )
  );
  setEditId(null);
} else {
  setTechnicians([
    ...technicians,
    {
      id: Date.now(),
      name,
      contact,
      skill,
      assignedMachines,
    },
  ]);
}

setName("");
setContact("");
setSkill("");
setAssignedMachines("");
```

};

const deleteTechnician = (id) => {
setTechnicians(
technicians.filter((t) => t.id !== id)
);
};

const editTechnician = (tech) => {
setName(tech.name);
setContact(tech.contact);
setSkill(tech.skill);
setAssignedMachines(
tech.assignedMachines
);
setEditId(tech.id);
};

const filtered = technicians.filter(
(t) =>
t.name
.toLowerCase()
.includes(search.toLowerCase()) ||
t.skill
.toLowerCase()
.includes(search.toLowerCase())
);

return ( <div className="min-h-screen bg-[#081421] text-white p-8">

```
  <h1 className="text-4xl font-bold mb-6">
    Technician Management
  </h1>

  <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700 mb-8">

    <h2 className="text-xl font-semibold mb-4">
      {editId
        ? "Update Technician"
        : "Add Technician"}
    </h2>

    <div className="grid grid-cols-2 gap-4">

      <input
        type="text"
        placeholder="Technician Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="bg-[#162538] p-3 rounded-lg"
      />

      <input
        type="text"
        placeholder="Contact Number"
        value={contact}
        onChange={(e) =>
          setContact(e.target.value)
        }
        className="bg-[#162538] p-3 rounded-lg"
      />

      <input
        type="text"
        placeholder="Skill"
        value={skill}
        onChange={(e) =>
          setSkill(e.target.value)
        }
        className="bg-[#162538] p-3 rounded-lg"
      />

      <input
        type="number"
        placeholder="Assigned Machines"
        value={assignedMachines}
        onChange={(e) =>
          setAssignedMachines(
            e.target.value
          )
        }
        className="bg-[#162538] p-3 rounded-lg"
      />

    </div>

    <button
      onClick={saveTechnician}
      className="mt-5 bg-cyan-600 px-6 py-3 rounded-lg"
    >
      {editId
        ? "Update Technician"
        : "Add Technician"}
    </button>

  </div>

  <input
    type="text"
    placeholder="Search Technician..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="bg-[#162538] p-3 rounded-lg w-full mb-6"
  />

  <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700">

    <table className="w-full">

      <thead>
        <tr className="border-b border-slate-700">
          <th className="text-left p-3">
            Name
          </th>
          <th className="text-left p-3">
            Contact
          </th>
          <th className="text-left p-3">
            Skill
          </th>
          <th className="text-left p-3">
            Assigned
          </th>
          <th className="text-left p-3">
            Action
          </th>
        </tr>
      </thead>

      <tbody>

        {filtered.map((tech) => (
          <tr
            key={tech.id}
            className="border-b border-slate-800"
          >
            <td className="p-3">
              {tech.name}
            </td>

            <td className="p-3">
              {tech.contact}
            </td>

            <td className="p-3">
              {tech.skill}
            </td>

            <td className="p-3">
              {tech.assignedMachines}
            </td>

            <td className="p-3 flex gap-2">

              <button
                onClick={() =>
                  editTechnician(tech)
                }
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteTechnician(
                    tech.id
                  )
                }
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
