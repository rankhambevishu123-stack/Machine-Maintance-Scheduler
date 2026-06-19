import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function DatabaseViewer() {
  const [tables, setTables] = useState([]);
  const [data, setData] = useState({});
  const [connectionInfo, setConnectionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [statusResult, inspectResult] = await Promise.all([
          api.dbStatus(),
          api.inspectDb(),
        ]);

        setConnectionInfo(statusResult);
        setTables(inspectResult.tables || []);
        setData(inspectResult.data || {});
        if (inspectResult.tables?.length) {
          setSelectedTable(inspectResult.tables[0]);
        }
      } catch (err) {
        setError(err.message || "Failed to load database data");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const rows = selectedTable ? data[selectedTable] || [] : [];
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Database Viewer</h1>
        <p className="text-slate-400 mb-6">View PostgreSQL tables directly from the browser.</p>

        {connectionInfo && (
          <div className="mb-6 rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm">
            <p><span className="text-slate-400">Server name:</span> {connectionInfo.serverName || "localhost"}</p>
            <p><span className="text-slate-400">Port:</span> {connectionInfo.port || "5432"}</p>
            <p><span className="text-slate-400">Database:</span> {connectionInfo.databaseName || connectionInfo.database || "maintenance_scheduler"}</p>
            <p><span className="text-slate-400">User:</span> {connectionInfo.user || "postgres"}</p>
          </div>
        )}

        {loading && <p>Loading database tables...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <>
            <div className="flex gap-2 flex-wrap mb-4">
              {tables.map((table) => (
                <button
                  key={table}
                  onClick={() => setSelectedTable(table)}
                  className={`px-3 py-2 rounded ${selectedTable === table ? "bg-cyan-600" : "bg-slate-800"}`}
                >
                  {table}
                </button>
              ))}
            </div>

            {selectedTable && (
              <div className="overflow-auto rounded-lg border border-slate-800">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-900">
                    <tr>
                      {columns.map((column) => (
                        <th key={column} className="px-3 py-2 text-left whitespace-nowrap">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index} className="border-t border-slate-800">
                        {columns.map((column) => (
                          <td key={column} className="px-3 py-2 whitespace-nowrap">
                            {String(row[column] ?? "")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
