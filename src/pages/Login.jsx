import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = [
      {
        department: "Admin",
        password: "admin123",
      },
      {
        department: "Blast Furnace",
        password: "blast123",
      },
      {
        department: "SMS",
        password: "sms123",
      },
      {
        department: "Rolling Mill",
        password: "rolling123",
      },
      {
        department: "Power Plant",
        password: "power123",
      },
      {
        department: "Material Handling",
        password: "material123",
      },
    ];

    const user = users.find(
      (u) =>
        u.department === department &&
        u.password === password
    );

    if (user) {
      localStorage.setItem(
        "department",
        user.department
      );

      navigate("/dashboard");
    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div className="min-h-screen bg-[#081421] flex items-center justify-center">

      <div className="w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

        <div className="flex justify-center mb-4">
          <ShieldCheck
            size={60}
            className="text-cyan-400"
          />
        </div>

        <h1 className="text-4xl font-bold text-center text-cyan-400">
          Machine Maintenance
        </h1>

        <p className="text-gray-400 text-center mt-2 mb-8">
          Scheduler System
        </p>

        <select
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-[#162538] text-white border border-slate-600"
        >
          <option value="">
            Select Department
          </option>

          <option value="Admin">
            Admin
          </option>

          <option value="Blast Furnace">
            Blast Furnace
          </option>

          <option value="SMS">
            SMS
          </option>

          <option value="Rolling Mill">
            Rolling Mill
          </option>

          <option value="Power Plant">
            Power Plant
          </option>

          <option value="Material Handling">
            Material Handling
          </option>
        </select>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 mb-6 rounded-xl bg-[#162538] text-white border border-slate-600"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-600 hover:bg-cyan-500 p-4 rounded-xl font-semibold"
        >
          Login
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          JSW Machine Maintenance Management System
        </p>

      </div>
    </div>
  );
}