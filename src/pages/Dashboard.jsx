import {
  LayoutDashboard,
  Wrench,
  Calendar,
  FileText,
  Bell,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import { UserCog } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";


export default function Dashboard() {
  const navigate = useNavigate();

const machines = JSON.parse(
  localStorage.getItem("machines") || "[]"
);

const schedules = JSON.parse(
  localStorage.getItem("schedules") || "[]"
);

const runningMachines = machines.filter(
  (m) => m.status === "Running"
).length;

const completedCount = schedules.filter(
  (s) => s.status === "Completed"
).length;

const pendingCount =
  schedules.length - completedCount;

const pieData = [
  {
    name: "Completed",
    value: completedCount,
  },
  {
    name: "Pending",
    value: pendingCount,
  },
];

const overdueCount = schedules.filter(
  (item) => {
    if (item.status === "Completed") {
      return false;
    }
    const upcomingCount = schedules.filter(
  (item) =>
    item.status === "Pending" &&
    new Date(item.date) >= new Date()
).length;

    return (
      new Date(item.date) < new Date()
    );
  }
).length;
const statusData = [
  {
    name: "Running",
    value: machines.filter(
      (m) => m.status === "Running"
    ).length,
  },
  {
    name: "Maintenance",
    value: machines.filter(
      (m) => m.status === "Maintenance"
    ).length,
  },
  {
    name: "Stopped",
    value: machines.filter(
      (m) => m.status === "Stopped"
    ).length,
  },
];
const breakdowns = JSON.parse(
  localStorage.getItem("breakdowns") || "[]"
);

const activeBreakdowns = breakdowns.filter(
  (b) => b.status === "Open"
).length;
const [showNotifications, setShowNotifications] =
  useState(false);
const historyCount = schedules.length;
const completedMaintenance = schedules.filter(
  (s) => s.status === "Completed"
).length;
<div className="bg-[#0d1b2a] p-5 rounded-xl border border-slate-700">
  <p className="text-gray-400">
    History Records
  </p>

  <h2 className="text-3xl font-bold mt-2 text-purple-400">
    {historyCount}
  </h2>
</div>
  return (
    <div className="flex min-h-screen bg-[#081421] text-white">

      {/* Sidebar */}
      <div className="w-64 bg-[#06111f] border-r border-slate-800 p-5">

        <h1 className="text-2xl font-bold text-cyan-400 mb-10">
          JSW Scheduler
        </h1>

        <ul className="space-y-3">

          <li className="bg-cyan-600 p-3 rounded-lg flex gap-3 cursor-pointer">
            <LayoutDashboard size={18} />
            Dashboard
          </li>

          <li
            onClick={() => navigate("/machines")}
            className="p-3 rounded-lg hover:bg-slate-800 flex gap-3 cursor-pointer"
          >
            <Wrench size={18} />
            Machines
          </li>

          <li
            onClick={() => navigate("/maintenance")}
            className="p-3 rounded-lg hover:bg-slate-800 flex gap-3 cursor-pointer"
          >
            <Calendar size={18} />
            Maintenance
          </li>

          <li
  onClick={() => navigate("/reports")}
  className="p-3 rounded-lg hover:bg-slate-800 flex gap-3 cursor-pointer"
>
  <FileText size={18} />
  Reports
</li>
<li
  onClick={() => navigate("/technicians")}
  className="p-3 rounded-lg hover:bg-slate-800 flex gap-3 cursor-pointer"
>
  <UserCog size={18} />
  Technicians
</li>
<li
  onClick={() => navigate("/breakdowns")}
  className="p-3 rounded-lg hover:bg-slate-800 flex gap-3 cursor-pointer"
>
  <AlertTriangle size={18} />
  Breakdowns
</li>
<li
  onClick={() => navigate("/history")}
  className="p-3 rounded-lg hover:bg-slate-800 flex gap-3 cursor-pointer"
>
  <FileText size={18} />
  History
</li>

 

<div className="bg-[#0d1b2a] p-5 rounded-xl border border-slate-700">
  <p className="text-gray-400">
    Active Breakdowns
  </p>
  
  <h2 className="text-3xl font-bold mt-2 text-red-400">
    {activeBreakdowns}
  </h2>
  <div className="bg-[#0d1b2a] p-5 rounded-xl border border-slate-700">
  <p className="text-gray-400">
    Completed Maintenance
  </p>
   <h2 className="text-3xl font-bold mt-2 text-green-400">
    {completedMaintenance}
  </h2>

</div>
</div>

        </ul>

      </div>

      {/* Main */}
      <div className="flex-1 p-8">

        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-[#0d1b2a] border border-slate-700 rounded-xl pl-10 p-3 w-80"
            />

          </div>

          <div className="relative">

  <Bell
    className="cursor-pointer"
    onClick={() =>
      setShowNotifications(
        !showNotifications
      )
    }
  />

  {showNotifications && (
    <div className="absolute right-0 mt-3 w-72 bg-[#0d1b2a] border border-slate-700 rounded-xl p-4 z-50">

      <p className="mb-2 text-red-400">
        🔴 Overdue Tasks :
        {overdueCount}
      </p>

      <p className="mb-2 text-yellow-400">
        🟡 Upcoming Maintenance :
        {upcomingCount}
      </p>

      <p className="text-green-400">
        🟢 Running Machines :
        {runningMachines}
      </p>

    </div>
  )}

</div>

        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold mb-8">
          Machine Maintenance Dashboard
        </h1>

        {/* KPI Cards */}

        <div className="grid grid-cols-4 gap-5">

          <div className="bg-[#0d1b2a] p-5 rounded-xl border border-slate-700">
            <p className="text-gray-400">
              Total Machines
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {machines.length}
            </h2>
          </div>

          <div className="bg-[#0d1b2a] p-5 rounded-xl border border-slate-700">
            <p className="text-gray-400">
              Running Machines
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              {runningMachines}
            </h2>
          </div>

          <div className="bg-[#0d1b2a] p-5 rounded-xl border border-slate-700">
            <p className="text-gray-400">
              Total Maintenance
            </p>

            <h2 className="text-3xl font-bold mt-2 text-yellow-400">
              {schedules.length}
            </h2>
          </div>

          <div className="bg-[#0d1b2a] p-5 rounded-xl border border-slate-700">
            <p className="text-gray-400">
              Critical Alerts
            </p>

            <h2 className="text-3xl font-bold mt-2 text-red-400">
              {overdueCount}
            </h2>
          </div>

        </div>

        {/* Analytics */}

        <div className="mt-8 grid grid-cols-3 gap-5">

          <div className="col-span-2 bg-[#0d1b2a] p-6 rounded-xl border border-slate-700">

            <h2 className="text-xl font-semibold mb-4">
              Maintenance Analytics
            </h2>

            <div className="h-64">

  <ResponsiveContainer
    width="100%"
    height="100%"
  >
    <PieChart>

      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        outerRadius={90}
        label
      >
        
        <Cell fill="#22c55e" />
        <Cell fill="#eab308" />
      </Pie>
      

      <Tooltip />

    </PieChart>
    
  </ResponsiveContainer>

</div>
<div className="mt-8 h-64">

  <h3 className="mb-3 font-semibold">
    Machine Status
  </h3>

  <ResponsiveContainer
    width="100%"
    height="100%"
  >
    <BarChart data={statusData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  </ResponsiveContainer>

</div>


          </div>

          {/* Alerts */}

          <div className="bg-[#0d1b2a] p-6 rounded-xl border border-slate-700">

            <h2 className="text-xl font-semibold mb-4">
              Recent Alerts
            </h2>
            <div className="bg-red-500/20 p-3 rounded-lg">
  Active Breakdowns : {activeBreakdowns}
</div>

            <div className="space-y-3">

              {overdueCount > 0 ? (
                <div className="bg-red-500/20 p-3 rounded-lg">
                  {overdueCount} Overdue Maintenance Tasks
                </div>
              ) : (
                <div className="bg-green-500/20 p-3 rounded-lg">
                  No Critical Alerts
                </div>
              )}

              <div className="bg-blue-500/20 p-3 rounded-lg">
                Total Machines : {machines.length}
              </div>

              <div className="bg-yellow-500/20 p-3 rounded-lg">
                Scheduled Maintenance : {schedules.length}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );}
