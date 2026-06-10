import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";export default function Reports() {
  const machines = JSON.parse(
    localStorage.getItem("machines") || "[]"
  );

  const schedules = JSON.parse(
    localStorage.getItem("schedules") || "[]"
  );
  const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Machine Maintenance Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Machine", "Technician", "Date", "Status"]],
    body: schedules.map((item) => [
      item.machine,
      item.technician,
      item.date,
      item.status,
    ]),
  });

  doc.save("maintenance-report.pdf");
};

  return (
    <div className="min-h-screen bg-[#081421] text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Reports
      </h1>
      <h1 className="text-4xl font-bold mb-4">
  Reports
</h1>

<button
  onClick={exportPDF}
  className="mb-6 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg"
>
  Export PDF
</button>

      <div className="grid grid-cols-3 gap-5">

        <div className="bg-[#0d1b2a] p-6 rounded-xl">
          <h2 className="text-gray-400">
            Total Machines
          </h2>

          <p className="text-4xl font-bold mt-3">
            {machines.length}
          </p>
        </div>

        <div className="bg-[#0d1b2a] p-6 rounded-xl">
          <h2 className="text-gray-400">
            Total Maintenance
          </h2>

          <p className="text-4xl font-bold mt-3">
            {schedules.length}
          </p>
        </div>

        <div className="bg-[#0d1b2a] p-6 rounded-xl">
          <h2 className="text-gray-400">
            Completed
          </h2>

          <p className="text-4xl font-bold mt-3 text-green-400">
            {
              schedules.filter(
                (s) => s.status === "Completed"
              ).length
            }
          </p>
        </div>

      </div>

      <div className="mt-8 bg-[#0d1b2a] p-6 rounded-xl">

        <h2 className="text-2xl font-semibold mb-4">
          Maintenance Report
        </h2>

        <table className="w-full">

          <thead>
            <tr>
              <th className="text-left p-3">
                Machine
              </th>

              <th className="text-left p-3">
                Technician
              </th>

              <th className="text-left p-3">
                Date
              </th>

              <th className="text-left p-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            {schedules.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-700"
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
                  {item.status}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}