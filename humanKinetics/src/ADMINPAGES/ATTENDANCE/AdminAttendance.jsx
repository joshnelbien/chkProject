import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("all"); // all / today / week / month

  const calculateDuration = (timeIn, timeOut) => {
    if (!timeIn || !timeOut) return "-";

    // Convert time strings to Date objects (using today's date)
    const [inHours, inMinutesPart] = timeIn.split(":");
    const inMinutes = parseInt(inMinutesPart, 10);
    const inIsPM = timeIn.toLowerCase().includes("pm");
    let inHour24 = parseInt(inHours, 10);
    if (inIsPM && inHour24 !== 12) inHour24 += 12;
    if (!inIsPM && inHour24 === 12) inHour24 = 0;

    const [outHours, outMinutesPart] = timeOut.split(":");
    const outMinutes = parseInt(outMinutesPart, 10);
    const outIsPM = timeOut.toLowerCase().includes("pm");
    let outHour24 = parseInt(outHours, 10);
    if (outIsPM && outHour24 !== 12) outHour24 += 12;
    if (!outIsPM && outHour24 === 12) outHour24 = 0;

    const now = new Date();
    const inDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      inHour24,
      inMinutes
    );
    const outDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      outHour24,
      outMinutes
    );

    const diffMs = outDate - inDate;
    if (diffMs < 0) return "-"; // handle invalid cases

    const hours = Math.floor(diffMs / 1000 / 60 / 60);
    const minutes = Math.floor((diffMs / 1000 / 60) % 60);

    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:5000/attendance/all");
        setAttendanceData(res.data);
        setFilteredData(res.data); // default: all
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, []);

  // Filter data based on selected period
  const applyFilter = (type) => {
    setFilter(type);
    const now = new Date();

    let filtered = attendanceData;

    if (type === "today") {
      filtered = attendanceData.filter((a) => {
        const aDate = new Date(a.date);
        return (
          aDate.getFullYear() === now.getFullYear() &&
          aDate.getMonth() === now.getMonth() &&
          aDate.getDate() === now.getDate()
        );
      });
    } else if (type === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      filtered = attendanceData.filter((a) => {
        const aDate = new Date(a.date);
        return aDate >= weekAgo && aDate <= now;
      });
    } else if (type === "month") {
      filtered = attendanceData.filter((a) => {
        const aDate = new Date(a.date);
        return (
          aDate.getMonth() === now.getMonth() &&
          aDate.getFullYear() === now.getFullYear()
        );
      });
    }

    setFilteredData(filtered);
  };

  // Calculate overview stats
  const total = filteredData.length;
  const absent = filteredData.filter((a) => !a.timeIn).length;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />

        <main className="flex-grow overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full mt-16 md:mt-20">
          {/* Header + Filter Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Attendance
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Daily Attendance Tracking
              </p>
            </div>
            <div className="flex space-x-2">
              {["today", "week", "month"].map((type) => (
                <button
                  key={type}
                  onClick={() => applyFilter(type)}
                  className={`px-4 py-2 rounded-full border ${
                    filter === type
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
              <button
                onClick={() => applyFilter("all")}
                className={`px-4 py-2 rounded-full border ${
                  filter === "all"
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                All
              </button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <OverviewCard label="Total Athletes Attended" value={total} />
          </div>

          {/* Attendance Table */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Athlete",
                    "Team",
                    "Type",
                    "Date",
                    "Time In",
                    "Time Out",
                    "Duration",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((athlete) => (
                  <tr key={athlete.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {`${athlete.firstName || ""} ${
                        athlete.middleName || ""
                      } ${athlete.lastName || ""}`}
                    </td>
                    <td className="px-4 py-3">
                      {athlete.sport?.toUpperCase() || "-"}
                    </td>
                    <td className="px-4 py-3">
                      {athlete.type?.toUpperCase() || "-"}
                    </td>
                    <td className="px-4 py-3">{athlete.date || "-"}</td>
                    <td className="px-4 py-3">{athlete.timeIn || "-"}</td>
                    <td className="px-4 py-3">{athlete.timeOut || "-"}</td>
                    <td className="px-4 py-3">
                      {calculateDuration(athlete.timeIn, athlete.timeOut)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

/* Overview Card Component */
function OverviewCard({ label, value, color }) {
  const colorClass =
    color === "green"
      ? "text-green-600"
      : color === "yellow"
      ? "text-yellow-600"
      : color === "red"
      ? "text-red-600"
      : "text-gray-900";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center sm:text-left">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
    </div>
  );
}

export default AdminAttendance;
