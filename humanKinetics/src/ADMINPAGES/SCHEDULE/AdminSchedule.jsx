import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import AddEventModal from "./addEventModal";

function AdminSchedule() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (d) =>
    d ? new Date(d).toISOString().split("T")[0] : "unknown";

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const [trainingRes, tournamentRes] = await Promise.all([
          axios.get("http://localhost:5000/trainingSchedule/training-schedule"),
          axios.get("http://localhost:5000/tournament/tournaments-activities"),
        ]);

        const trainingSchedules = trainingRes.data.schedules || [];
        const tournaments = Array.isArray(tournamentRes.data)
          ? tournamentRes.data
          : tournamentRes.data?.tournaments || [];

        const mergedSchedules = {};

        trainingSchedules.forEach((t) => {
          const dateKey = formatDate(t.date);
          if (!mergedSchedules[dateKey]) mergedSchedules[dateKey] = [];
          mergedSchedules[dateKey].push({
            time: `${t.startTime} - ${t.endTime}`,
            title: t.title,
            location: t.location,
            participants: `Coach: ${t.coach}`,
            type: "Training",
          });
        });

        tournaments.forEach((tournament) => {
          const schedules = tournament.schedules || [];
          schedules.forEach((ts) => {
            const dateKey = formatDate(ts.date);
            if (!mergedSchedules[dateKey]) mergedSchedules[dateKey] = [];
            mergedSchedules[dateKey].push({
              time: `${ts.startTime} - ${ts.endTime}`,
              title: `${tournament.tournamentName} vs ${ts.opponent}`,
              location: tournament.location,
              participants: `${tournament.teams} Teams`,
              type: "Tournament",
            });
          });
        });

        setScheduleData(mergedSchedules);
      } catch (error) {
        console.error("❌ Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  const scheduleKeys = Object.keys(scheduleData).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Flatten all events for search/filter
  const allEvents = scheduleKeys.flatMap((date) =>
    scheduleData[date].map((event) => ({
      date,
      ...event,
    }))
  );

  const filteredEvents = allEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.participants.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Overview counts
  const totalEvents = allEvents.length;
  const totalTrainings = allEvents.filter((e) => e.type === "Training").length;
  const totalTournaments = allEvents.filter(
    (e) => e.type === "Tournament"
  ).length;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-grow">
        <Navbar />

        <main className="flex-grow overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full mt-16 md:mt-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Schedule
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Training and Events Calendar
              </p>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <OverviewCard label="Total Events" value={totalEvents} />
            <OverviewCard
              label="Trainings"
              value={totalTrainings}
              color="green"
            />
            <OverviewCard
              label="Tournaments"
              value={totalTournaments}
              color="yellow"
            />
          </div>

          {/* Search & Table */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
              <h3 className="text-xl font-semibold">Event Records</h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {["Date", "Time", "Event", "Location", "Participants"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.map((event, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">{event.date}</td>
                      <td className="px-4 py-3">{event.time}</td>
                      <td className="px-4 py-3 font-semibold">{event.title}</td>
                      <td className="px-4 py-3">{event.location}</td>
                      <td className="px-4 py-3">{event.participants}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <AddEventModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
        <Footer />
      </div>
    </div>
  );
}

/* ✅ Reusable Overview Card */
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

export default AdminSchedule;
