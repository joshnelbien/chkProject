import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import TournamentModal from "./tournamentModal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AdminTournament() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const { adminId } = useParams();
  const [filterStatus, setFilterStatus] = useState("All");

  // 📝 For Set Schedule Modal
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    opponent: "",
    teamId: adminId,
  });

  // ✅ Fetch tournaments from backend (with schedules)
  const fetchTournaments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tournament/tournaments-activities"
      );
      console.log("📌 Tournaments from backend:", response.data);
      setTournaments(response.data); // ✅ use backend schedules directly
    } catch (error) {
      console.error("❌ Failed to fetch tournaments:", error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  // ✅ Handle Schedule Submit
  const handleScheduleSubmit = async (e) => {
    e.preventDefault();

    const { date, startTime, endTime, opponent } = scheduleForm;

    if (!date || !startTime || !endTime || !opponent) {
      alert("Please complete all fields");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/tournament/tournaments/${selectedTournament.id}/schedule`,
        {
          ...scheduleForm,
          teamId: adminId,
        }
      );

      alert("✅ Schedule saved successfully!");
      fetchTournaments();
      setIsScheduleModalOpen(false);
      setScheduleForm({
        date: "",
        startTime: "",
        endTime: "",
        opponent: "",
        teamId: adminId,
      });
      setSelectedTournament(null);
    } catch (error) {
      console.error("❌ Failed to save schedule:", error);
      alert("Failed to save schedule");
    }
  };
  const filteredTournaments = tournaments.filter((t) => {
    const today = new Date();
    const startDate = new Date(t.startDate);
    const endDate = new Date(t.endDate);

    if (filterStatus === "Upcoming") return today < startDate;
    if (filterStatus === "Ongoing")
      return today >= startDate && today <= endDate;
    if (filterStatus === "Completed") return today > endDate;
    return true; // "All"
  });

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow h-full">
        <Navbar />

        <main className="flex-grow overflow-y-auto p-6 mt-16 md:mt-20 max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Tournaments
              </h2>
              <p className="text-gray-500">Tournament Management</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow hover:bg-green-700 transition"
            >
              Add Tournament
            </button>
          </div>

          {/* Tournament Modal */}
          <TournamentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={(data) => {
              console.log("✅ Tournament Data Submitted:", data);
              fetchTournaments(); // Refresh list after adding
              setIsModalOpen(false);
            }}
          />

          {/* Tournament Status Filter */}
          <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full w-fit mb-6">
            {["All", "Upcoming", "Ongoing", "Completed"].map((status) => (
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

          {/* Tournament Cards (Dynamic) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  onSetSchedule={() => {
                    setSelectedTournament(tournament);
                    setIsScheduleModalOpen(true);
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-2 text-center">
                No tournaments found.
              </p>
            )}
          </div>
        </main>

        <Footer />
      </div>

      {/* 📝 Schedule Modal */}
      {isScheduleModalOpen && selectedTournament && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-700">
                Set Schedule for {selectedTournament.tournamentName}
              </h2>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, date: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={scheduleForm.startTime}
                    onChange={(e) =>
                      setScheduleForm({
                        ...scheduleForm,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={scheduleForm.endTime}
                    onChange={(e) =>
                      setScheduleForm({
                        ...scheduleForm,
                        endTime: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Opponent
                </label>
                <input
                  type="text"
                  value={scheduleForm.opponent}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      opponent: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter opponent name"
                  required
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 🎯 Tournament Card Component
function TournamentCard({ tournament, onSetSchedule }) {
  // Convert dates to Date objects for comparison
  const today = new Date();
  const startDate = new Date(tournament.startDate);
  const endDate = new Date(tournament.endDate);

  let status = "";
  let statusClasses = "";

  if (today < startDate) {
    status = "Upcoming";
    statusClasses = "bg-blue-200 text-blue-700";
  } else if (today >= startDate && today <= endDate) {
    status = "Ongoing";
    statusClasses = "bg-yellow-200 text-yellow-700";
  } else {
    status = "Completed";
    statusClasses = "bg-gray-200 text-gray-600";
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {tournament.tournamentName}
        </h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${statusClasses}`}
        >
          {status}
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-4">{tournament.sport}</p>
      <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4">
        <div>
          📅 {tournament.startDate} to {tournament.endDate}
        </div>
        <div>📍 {tournament.location}</div>
        <div>🧑‍🤝‍🧑 {tournament.teams || 0} teams</div>
      </div>

      {/* 📌 Schedule Section */}
      {tournament.schedules && tournament.schedules.length > 0 ? (
        <div className="bg-gray-50 p-3 rounded-lg mb-3">
          <h4 className="font-semibold text-sm mb-2">Scheduled Matches:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {tournament.schedules.map((s, i) => (
              <li key={i}>
                📅 {s.date} — ⏰ {s.startTime} - {s.endTime} — 🆚 {s.opponent}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic mb-2">
          No schedule added yet
        </p>
      )}

      <button
        onClick={onSetSchedule}
        className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        ➕ Set Schedule
      </button>
    </div>
  );
}

export default AdminTournament;
