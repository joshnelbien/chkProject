import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import TournamentModal from "./tournamentModal";
import React, { useState } from "react";

function AdminTournament() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar (fixed on the left) */}
      <Sidebar />

      {/* Right section: Navbar + Content + Footer */}
      <div className="flex flex-col flex-grow h-full">
        {/* Navbar (fixed at the top) */}
        <Navbar />

        {/* Main Content - scrollable only here */}
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

          {/* ✅ Render the modal here, not inside TournamentCard */}
          <TournamentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={(data) => {
              console.log("✅ Tournament Data Submitted:", data);
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

          {/* Tournament Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
            <TournamentCard
              title="Regional Basketball Championship"
              status="Upcoming"
              sport="Basketball"
              date="Feb 25–28, 2024"
              location="Main Stadium"
              teams="12 teams"
              schedule={[
                {
                  label: "Group Stage",
                  date: "Feb 25–28",
                  matches: "24 matches",
                },
                {
                  label: "Quarter Finals",
                  date: "Feb 27",
                  matches: "4 matches",
                },
                { label: "Semi Finals", date: "Feb 27", matches: "2 matches" },
                { label: "Finals", date: "Feb 28", matches: "1 match" },
              ]}
              matches={[
                {
                  teams: "PLSP Stallions vs Eagles",
                  group: "Group A",
                  date: "Feb 25, 2:00 PM · Main Court",
                },
                {
                  teams: "PLSP Stallions vs Hawks",
                  group: "Group A",
                  date: "Feb 26, 4:00 PM · Main Court",
                },
              ]}
            />

            <TournamentCard
              title="Inter-University Volleyball League"
              status="Upcoming"
              sport="Volleyball"
              date="Mar 10–15, 2024"
              location="Sports Complex"
              teams="8 teams"
              schedule={[
                {
                  label: "Preliminaries",
                  date: "Mar 10–12",
                  matches: "16 matches",
                },
                {
                  label: "Semi Finals",
                  date: "Mar 13–14",
                  matches: "4 matches",
                },
                { label: "Finals", date: "Mar 15", matches: "2 matches" },
              ]}
              matches={[
                {
                  teams: "PLSP Spikers vs Thunder",
                  group: "Preliminaries",
                  date: "Mar 10, 1:00 PM · Court 1",
                },
                {
                  teams: "PLSP Spikers vs Lightning",
                  group: "Preliminaries",
                  date: "Mar 11, 3:00 PM · Court 2",
                },
              ]}
            />
          </div>
        </main>

        {/* Footer (fixed at bottom) */}
        <Footer />
      </div>
    </div>
  );
}

/* ✅ Tournament Card Component - clean, no modal here */
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

      {/* Schedule */}
      <div className="mb-4">
        <p className="font-semibold text-gray-800 mb-2">Tournament Schedule</p>
        <ul className="space-y-2 text-sm">
          {schedule.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <p>
                {item.label} <span className="text-gray-400">{item.date}</span>
              </p>
              <span className="text-blue-600 font-medium">{item.matches}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Matches */}
      <div>
        <p className="font-semibold text-gray-800 mb-2">Upcoming Matches</p>
        <div className="space-y-3">
          {matches.map((match, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-gray-800">
                {match.teams}{" "}
                <span className="text-gray-500 text-xs">{match.group}</span>
              </p>
              <p className="text-gray-500 text-xs">{match.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminTournament;
