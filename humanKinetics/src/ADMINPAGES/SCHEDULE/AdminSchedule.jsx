import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import ResultModal from "./ResultModal";

function AdminSchedule() {
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const itemsPerPage = 20;

  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const submitResult = async (homeScore, opponentScore) => {
    try {
      const payload = {
        status: "Done",
        isCompleted: true,
        homeScore,
        opponentScore,
      };

      const res = await axios.put(
        `http://localhost:5000/tournament/tournaments/${selectedEvent.id}`,
        payload
      );

      if (res.status === 200) {
        // Update frontend instantly
        setScheduleData((prev) => {
          const updated = { ...prev };
          Object.keys(updated).forEach((date) => {
            updated[date] = updated[date].map((e) =>
              e.id === selectedEvent.id
                ? {
                    ...e,
                    status: "Done",
                    homeScore,
                    opponentScore,
                  }
                : e
            );
          });
          return updated;
        });
        alert("Result submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting result:", error);
      alert("Failed to submit result.");
    }

    setShowResultModal(false);
  };

  const handleAction = async (event, action) => {
    try {
      const payload = {
        id: event.id, // use the schedule's UUID primary key
        status: action,
      };

      const res = await axios.put(
        "http://localhost:5000/trainingSchedule/training-updates",
        payload
      );

      if (res.status === 200) {
        // Update local state
        setScheduleData((prev) => {
          const newData = { ...prev };
          Object.keys(newData).forEach((date) => {
            newData[date] = newData[date].map((e) =>
              e.id === event.id ? { ...e, status: action } : e
            );
          });
          return newData;
        });

        alert(`✅ Status updated to "${action}" for ${event.title}`);
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toISOString().split("T")[0] : "unknown";

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const [trainingRes, tournamentRes, tournamentSchedules] =
          await Promise.all([
            axios.get(
              "http://localhost:5000/trainingSchedule/training-schedule"
            ),
            axios.get(
              "http://localhost:5000/tournament/tournaments-activities"
            ),
          ]);

        const trainingSchedules = trainingRes.data.schedules || [];
        const tournaments = Array.isArray(tournamentRes.data)
          ? tournamentRes.data
          : tournamentRes.data?.tournaments || [];

        const mergedSchedules = {};

        // Add training schedules
        // Add training schedules
        trainingSchedules.forEach((t) => {
          const dateKey = formatDate(t.date);
          if (!mergedSchedules[dateKey]) mergedSchedules[dateKey] = [];
          mergedSchedules[dateKey].push({
            id: t.id,
            start: t.start, // <--- add this
            end: t.end, // <--- add this
            duration: t.duration, // optional calculation
            time: `${t.startTime} - ${t.endTime}`,
            title: t.title,
            location: t.location,
            participants: `Coach: ${t.coach}`,
            type: "Training",
            teamId: t.teamId || null,
            status: t.status || "Pending",
            homeScore: t.homeScore || null,
            opponentScore: t.opponentScore || null,
          });
        });

        // Add tournament schedules
        tournaments.forEach((tournament) => {
          const schedules = tournament.schedules || [];
          schedules.forEach((ts) => {
            const dateKey = formatDate(ts.date);
            if (!mergedSchedules[dateKey]) mergedSchedules[dateKey] = [];
            mergedSchedules[dateKey].push({
              id: ts.id || tournament.id,
              time: `${ts.startTime} - ${ts.endTime}`,
              title: `${tournament.tournamentName} vs ${ts.opponent}`,
              location: tournament.location,
              participants: `${tournament.teams} Teams`,
              type: "Tournament",
              teamId: tournament.teamId || null,
              status: ts.status || "Pending",
              homeScore: ts.homeScore ?? null, // <-- FIXED
              opponentScore: ts.opponentScore ?? null, // <-- FIXED
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
  const filteredEvents = allEvents
    .filter((event) => {
      if (filterStatus === "Done") return event.status === "Done"; // only done
      if (filterStatus === "My Schedule")
        return String(event.teamId) === String(id) && event.status !== "Done"; // my schedule, hide done
      return event.status !== "Done"; // default "All", hide done
    })
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Schedule
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Training and Events Calendar
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full w-fit mb-6">
              {["All", "My Schedule", "Done"].map((status) => (
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
                      "Status",
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
                    {filterStatus === "Done" && (
                      <>
                        <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                          Result
                        </th>
                      </>
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
                      <td className="px-4 py-3 font-semibold">
                        {event.status}
                      </td>

                      {event.type === "Tournament" &&
                        event.status === "Done" && (
                          <>
                            <td className="px-4 py-3 font-semibold">
                              <p>Home: {event.homeScore}</p>
                              <p>Opponent: {event.opponentScore}</p>

                              <p className="mt-1">
                                Result:{" "}
                                <span
                                  className={
                                    Number(event.homeScore) >
                                    Number(event.opponentScore)
                                      ? "text-green-600 font-bold"
                                      : Number(event.homeScore) <
                                        Number(event.opponentScore)
                                      ? "text-red-600 font-bold"
                                      : "text-gray-600 font-bold"
                                  }
                                >
                                  {Number(event.homeScore) >
                                  Number(event.opponentScore)
                                    ? "WIN"
                                    : Number(event.homeScore) <
                                      Number(event.opponentScore)
                                    ? "LOSE"
                                    : "DRAW"}
                                </span>
                              </p>
                            </td>
                          </>
                        )}

                      {event.type === "Training" && event.status === "Done" && (
                        <>
                          <td className="px-4 py-3 font-semibold">
                            <p>
                              <strong>Start:</strong> {event.start}
                            </p>
                            <p>
                              <strong>End:</strong> {event.end}
                            </p>
                            <p>
                              <strong>Duration:</strong> {event.duration}
                            </p>
                          </td>
                        </>
                      )}

                      {filterStatus === "My Schedule" && (
                        <td className="px-0.5 py-3">
                          {event.status === "Done" ? (
                            // ✅ Show Start, End, Duration for DONE events
                            <div className="flex flex-col space-y-1 text-sm">
                              <span>
                                <strong>Start:</strong> {event.start}
                              </span>
                              <span>
                                <strong>End:</strong> {event.end}
                              </span>
                              <span>
                                <strong>Duration:</strong> {event.duration}
                              </span>
                            </div>
                          ) : event.type === "Training" ? (
                            <>
                              <button
                                onClick={() => handleAction(event, "Start")}
                                disabled={event.status === "Start"}
                                className={`px-3 py-1 rounded-lg transition ${
                                  event.status === "Start"
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                              >
                                Start
                              </button>
                              <button
                                onClick={() => handleAction(event, "End")}
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
                                onClick={() => {
                                  console.log("Selected Event:", event); // <-- LOG HERE
                                  setSelectedEvent(event);
                                  setShowResultModal(true);
                                }}
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

            {/* Pagination */}
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

        <ResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          event={selectedEvent}
          onSubmit={submitResult}
        />
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
