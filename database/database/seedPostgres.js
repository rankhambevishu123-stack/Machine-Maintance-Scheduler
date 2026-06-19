import { query, initDatabase } from "./postgres.js";

async function seed() {
  await initDatabase();

  const users = [
    { department: "Admin", password: "admin123" },
    { department: "Blast Furnace", password: "blast123" },
    { department: "SMS", password: "sms123" },
    { department: "Rolling Mill", password: "rolling123" },
    { department: "Power Plant", password: "power123" },
    { department: "Material Handling", password: "material123" },
  ];

  const machines = [
    { department: "Blast Furnace", name: "Blast Furnace 1", location: "Zone A", status: "Running" },
    { department: "Blast Furnace", name: "Blast Furnace 2", location: "Zone A", status: "Maintenance" },
    { department: "SMS", name: "BOF Converter 1", location: "Zone B", status: "Running" },
    { department: "Rolling Mill", name: "Roughing Mill", location: "Zone C", status: "Stopped" },
    { department: "Power Plant", name: "Boiler 1", location: "Zone D", status: "Running" },
    { department: "Material Handling", name: "Conveyor 1", location: "Zone E", status: "Running" },
  ];

  const technicians = [
    { name: "Amit Sharma", contact: "9876543210", skill: "Electrical", assignedMachines: "Blast Furnace 1, Boiler 1" },
    { name: "Neha Verma", contact: "9876501234", skill: "Mechanical", assignedMachines: "Roughing Mill" },
    { name: "Ravi Kumar", contact: "9988776655", skill: "Hydraulics", assignedMachines: "Conveyor 1" },
  ];

  const schedules = [
    { machine: "Blast Furnace 1", technician: "Amit Sharma", date: "2026-06-12", priority: "High", status: "Pending" },
    { machine: "Boiler 1", technician: "Ravi Kumar", date: "2026-06-08", priority: "Medium", status: "Completed" },
  ];

  const breakdowns = [
    { machine: "Roughing Mill", issue: "Motor vibration", priority: "High", date: "2026-06-09", status: "Open" },
  ];

  const history = [
    { machine: "Boiler 1", technician: "Ravi Kumar", date: "2026-06-08", status: "Completed", type: "Maintenance" },
  ];

  const tableChecks = [
    { table: "users", rows: users },
    { table: "machines", rows: machines },
    { table: "technicians", rows: technicians },
    { table: "schedules", rows: schedules },
    { table: "breakdowns", rows: breakdowns },
    { table: "history", rows: history },
  ];

  for (const { table, rows } of tableChecks) {
    const countRes = await query(`SELECT COUNT(*) FROM ${table}`);
    if (Number(countRes.rows[0].count) === 0) {
      for (const row of rows) {
        const columns = Object.keys(row);
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
        const values = columns.map((key) => row[key]);
        await query(
          `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`,
          values,
        );
      }
    }
  }

  console.log("PostgreSQL seed complete");
}

try {
  await seed();
} catch (error) {
  console.error("PostgreSQL seed failed:", error);
  process.exit(1);
}
