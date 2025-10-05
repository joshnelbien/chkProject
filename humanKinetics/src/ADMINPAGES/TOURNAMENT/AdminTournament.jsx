import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import TournamentModal from "./tournamentModal";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminTournament() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournaments, setTournaments] = useState([]);

  // ✅ Fetch tournaments from backend
  const fetchTournaments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tournament/tournaments-activities"
      );
      setTournaments(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch tournaments:", error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

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
            <button className="px-4 py-2 bg-white text-green-700 font-semibold rounded-full shadow">
              Upcoming
            </button>
            <button className="px-4 py-2 text-gray-600 font-medium rounded-full">
              Completed
            </button>
            <button className="px-4 py-2 text-gray-600 font-medium rounded-full">
              All
            </button>
          </div>

          {/* Tournament Cards (Dynamic) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
            {tournaments.length > 0 ? (
              tournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  title={tournament.tournamentName}
                  status="Upcoming"
                  sport={tournament.sport}
                  date={`${tournament.startDate} - ${tournament.endDate}`}
                  location={tournament.location}
                  teams={`${tournament.teams} teams`}
                  schedule={[]} // You can extend this later
                  matches={[]} // You can extend this later
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
    </div>
  );
}

function TournamentCard({
  title,
  status,
  sport,
  date,
  location,
  teams,
  schedule,
  matches,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className="bg-blue-200 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
          {status}
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-4">{sport}</p>
      <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4">
        <div>📅 {date}</div>
        <div>📍 {location}</div>
        <div>🧑‍🤝‍🧑 {teams}</div>
      </div>

      {/* Placeholder if no schedule */}
      {schedule.length === 0 && (
        <p className="text-sm text-gray-400 italic mb-2">
          No schedule added yet
        </p>
      )}
    </div>
  );
}

export default AdminTournament;
