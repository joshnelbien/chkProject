import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logs from backend
  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/logs/logs");
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={true} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-15 md:ml-15 mt-16">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">LOGS</h1>
            <p className="text-gray-600 mb-6">
              Here you can view all admin activities and actions performed in the system.
            </p>

            {/* Logs Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <p>Loading logs...</p>
              ) : logs.length === 0 ? (
                <p>No logs found.</p>
              ) : (
                <table className="min-w-full table-auto border border-gray-200">
                  <thead className="bg-green-700 text-white">
                    <tr>
                     
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Description</th>
                      <th className="px-4 py-2 border">Time</th>
                      <th className="px-4 py-2 border">Date</th>
                      <th className="px-4 py-2 border">Role</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    {logs.map((log, index) => (
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

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Logs;
