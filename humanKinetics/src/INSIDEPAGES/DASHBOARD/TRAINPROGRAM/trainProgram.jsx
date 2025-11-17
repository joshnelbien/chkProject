import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { ChevronDown } from "lucide-react";
import { useParams } from "react-router-dom";

function TrainProgram() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [userTeamId, setUserTeamId] = useState(null);

  // Fetch schedule data
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/trainingSchedule/training-schedule"
        );
        setScheduleData(res.data.schedules);
        setLoading(false);
      } catch (err) {
        setError("Failed to load schedules");
        setLoading(false);
        console.error("Error fetching schedule:", err);
      }
    };

    fetchSchedule();
  }, []);

  // Fetch user data by ID
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/userAccounts/players-profile/${id}`
        );
        setUserData(res.data);
        setUserTeamId(res.data.teamId);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUser();
  }, [id]);

  // Filter schedule by user's teamId
  const filteredSchedule = scheduleData.filter(
    (session) => session.teamSchedule === userTeamId
  );

  // Organize filtered schedule by day
  const weeklyByDay = filteredSchedule.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  const workoutGroups = [
    "Conditioning",
    "Strength Training",
    "Skills Development",
  ];

  // Compute training summary counts
  const totalSessions = filteredSchedule.length;
  const statusCounts = filteredSchedule.reduce(
    (acc, session) => {
      const status = session.status?.toLowerCase() || "unknown";
      if (!acc[status]) acc[status] = 0;
      acc[status]++;
      return acc;
    },
    { pending: 0, done: 0, cancelled: 0 }
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading training program...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto mt-16 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-green-700">
              Training Program
            </h1>
          </div>

          {/* Summary Card */}
          <div className="bg-white p-6 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <p className="text-gray-500">Total Sessions</p>
              <p className="text-2xl font-bold">{totalSessions}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-yellow-500 font-semibold">Pending</p>
              <p className="text-xl font-bold">{statusCounts.pending}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-green-500 font-semibold">Done</p>
              <p className="text-xl font-bold">{statusCounts.done}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-red-500 font-semibold">Cancelled</p>
              <p className="text-xl font-bold">{statusCounts.cancelled}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Schedule */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Training Schedule</h2>
              {filteredSchedule.length === 0 ? (
                <p className="text-gray-500">No training sessions available.</p>
              ) : (
                <ul className="space-y-4">
                  {Object.keys(weeklyByDay).map((day, idx) => (
                    <li key={idx} className="border-b pb-4">
                      <p className="font-bold text-gray-800 capitalize">
                        {day}
                      </p>
                      {weeklyByDay[day].map((session, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex justify-between items-center mt-2"
                        >
                          <p className="text-gray-600">
                            {session.startTime} - {session.endTime}{" "}
                            <span className="font-semibold">
                              {session.workoutDetails}
                            </span>
                          </p>
                          <span className="flex items-center text-sm font-semibold text-gray-800">
                            {session.status}
                          </span>
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Workout Details */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Workout Details</h2>
              {filteredSchedule.length === 0 ? (
                <p className="text-gray-500">No workout details available.</p>
              ) : (
                <div className="space-y-4">
                  {workoutGroups.map((group, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{group}</h3>
                        <ChevronDown size={20} className="text-gray-500" />
                      </div>
                      <div className="mt-2 space-y-2">
                        {filteredSchedule
                          .filter((w) => w.workoutDetails === group)
                          .map((item, i) => (
                            <div key={i} className="text-gray-700 text-sm">
                              <p className="font-semibold">{item.title}</p>
                              <p>
                                {item.date} | {item.startTime} - {item.endTime}
                              </p>
                              <p>Coach: {item.coach}</p>
                              <p>Location: {item.location}</p>
                              <p>Focus: {item.focusAreas}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default TrainProgram;
