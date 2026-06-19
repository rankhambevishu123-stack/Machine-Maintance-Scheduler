import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
import Maintenance from "./pages/Maintenance";
import Reports from "./pages/Reports";
import Technicians from "./pages/Technicians";
import Breakdowns from "./pages/Breakdowns";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/machines" element={<Machines />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/technicians" element={<Technicians />} />
      <Route path="/breakdowns" element={<Breakdowns />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;