import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const API = import.meta.env.VITE_BBACKEND_URL;
  const [search, setSearch] = useState("");

  // Fetch logs from backend
  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${API}/logs/logs`);
      setLogs(res.data);
    } catch (err) {
      console.error("❌ Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // SORTING HANDLER
  const handleSort = (column) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";

    setSortColumn(column);
    setSortDirection(direction);

    const sorted = [...logs].sort((a, b) => {
      const valA = a[column] ?? "";
      const valB = b[column] ?? "";

      if (typeof valA === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return direction === "asc" ? valA - valB : valB - valA;
    });

    setLogs(sorted);
  };

  const sortIcon = (column) => {
    if (sortColumn !== column) return "⇅";
    return sortDirection === "asc" ? "▲" : "▼";
  };

  // FILTER
  const filteredLogs = logs.filter((log) =>
    Object.values(log).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={true} />

      <div className="flex-1 flex flex-col ml-15 md:ml-15 mt-16">
        <Navbar />

        <main className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">LOGS</h1>
            <p className="text-gray-600 mb-6">
              Here you can view all admin activities and system actions.
            </p>

            {/* SEARCH BAR */}
            <div className="mb-4 flex justify-end">
              <input
                type="text"
                placeholder="Search logs..."
                className="border p-2 rounded w-60"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Logs Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <p>Loading logs...</p>
              ) : filteredLogs.length === 0 ? (
                <p>No logs found.</p>
              ) : (
                <table className="min-w-full table-auto border border-gray-200">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th
                        onClick={() => handleSort("email")}
                        className="px-4 py-2 border cursor-pointer select-none"
                      >
                        Email {sortIcon("email")}
                      </th>

                      <th
                        onClick={() => handleSort("description")}
                        className="px-4 py-2 border cursor-pointer select-none"
                      >
                        Description {sortIcon("description")}
                      </th>

                      <th
                        onClick={() => handleSort("time")}
                        className="px-4 py-2 border cursor-pointer select-none"
                      >
                        Time {sortIcon("time")}
                      </th>

                      <th
                        onClick={() => handleSort("date")}
                        className="px-4 py-2 border cursor-pointer select-none"
                      >
                        Date {sortIcon("date")}
                      </th>

                      <th
                        onClick={() => handleSort("role")}
                        className="px-4 py-2 border cursor-pointer select-none"
                      >
                        Role {sortIcon("role")}
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white text-gray-700">
                    {filteredLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-4 py-2 border">{log.email}</td>
                        <td className="px-4 py-2 border">{log.description}</td>
                        <td className="px-4 py-2 border">{log.time}</td>
                        <td className="px-4 py-2 border">{log.date}</td>
                        <td className="px-4 py-2 border">{log.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Logs;
