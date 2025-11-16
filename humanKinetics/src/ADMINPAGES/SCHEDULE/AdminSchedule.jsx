import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminSchedule() {
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All"); // <-- New state for buttons
  const itemsPerPage = 20;

  const handleAction = (event) => {
    // Example: show alert or navigate to another page
    alert(`Performing action for: ${event.title}`);
    // You can replace this with edit, join, view details, etc.
  };

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
            teamId: t.teamId || null,
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
              teamId: tournament.teamId || null,
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

  const allEvents = scheduleKeys.flatMap((date) =>
    scheduleData[date].map((event) => ({ date, ...event }))
  );

  // Filter based on button selection
  const filteredEvents = allEvents
    .filter((event) =>
      filterStatus === "My Schedule"
        ? String(event.teamId) === String(id)
        : true
    )
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.participants.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

            {/* Buttons for My Schedule / All Schedule */}
            <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full w-fit mb-6">
              {["All", "My Schedule"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-full font-semibold shadow ${
                    filterStatus === status
                      ? "bg-white text-green-700"
                      : "text-gray-600"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <OverviewCard label="Total Events Scheduled" value={totalEvents} />
            <OverviewCard
              label="Trainings Scheduled"
              value={totalTrainings}
              color="green"
            />
            <OverviewCard
              label="Tournaments Matches"
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
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Date",
                      "Time",
                      "Event",
                      "Location",
                      "Participants",
                      "Type",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                    {filterStatus === "My Schedule" && (
                      <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedEvents.map((event, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">{event.date}</td>
                      <td className="px-4 py-3">{event.time}</td>
                      <td className="px-4 py-3 font-semibold">{event.title}</td>
                      <td className="px-4 py-3">{event.location}</td>
                      <td className="px-4 py-3">{event.participants}</td>
                      <td className="px-4 py-3">{event.type}</td>
                      {filterStatus === "My Schedule" && (
                        <td className="px-4 py-3 space-x-2">
                          {event.type === "Training" ? (
                            <>
                              <button
                                onClick={() => handleAction(event, "Start")}
                                className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                              >
                                Start
                              </button>
                              <button
                                onClick={() => handleAction(event, "Done")}
                                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                              >
                                Done
                              </button>
                              <button
                                onClick={() => handleAction(event, "Cancelled")}
                                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                              >
                                Cancelled
                              </button>
                            </>
                          ) : event.type === "Tournament" ? (
                            <>
                              <button
                                onClick={() => handleAction(event, "Result")}
                                className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                              >
                                Result
                              </button>
                              <button
                                onClick={() => handleAction(event, "Postponed")}
                                className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 transition"
                              >
                                Postponed
                              </button>
                              <button
                                onClick={() => handleAction(event, "Cancelled")}
                                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                              >
                                Cancelled
                              </button>
                            </>
                          ) : null}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Buttons */}
            {filteredEvents.length > itemsPerPage && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-full border ${
                        page === currentPage
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

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
