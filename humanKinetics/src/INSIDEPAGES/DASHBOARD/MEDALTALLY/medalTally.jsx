import { useState } from "react";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function MedalTally() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main container */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto mt-16 p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-green-900">PLSP MYNAS</h1>
              <h2 className="text-4xl font-bold text-gray-800">
                LCUAA Medal Tally
              </h2>
              <p className="text-gray-600">
                Local Colleges and Universities Athletic Association
                Championships
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
                LCUAA 2024
              </button>
              <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
                LCUAA 2023
              </button>
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
                LCUAA 2022
              </button>
            </div>
          </div>

          {/* Overall Medal Count Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { color: "amber-500", count: 14, label: "Gold" },
              { color: "gray-400", count: 9, label: "Silver" },
              { color: "yellow-800", count: 6, label: "Bronze" },
            ].map((medal, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow text-center"
              >
                <h4 className={`text-4xl font-bold text-${medal.color}`}>
                  {medal.count}
                </h4>
                <p className="text-lg text-gray-600">{medal.label}</p>
              </div>
            ))}
          </div>

          {/* Performance Trend Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { year: "LCUAA 2022", medals: 23 },
              { year: "LCUAA 2023", medals: 25 },
              { year: "LCUAA 2024", medals: 29 },
            ].map((trend, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow text-center"
              >
                <h4 className="text-xl font-bold text-gray-800">
                  {trend.year}
                </h4>
                <p className="text-3xl font-bold text-green-700">
                  {trend.medals} medals
                </p>
              </div>
            ))}
          </div>

          {/* Medals by Sport Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Medals by Sport</h3>

            {[
              {
                sport: "Basketball",
                teams: [
                  {
                    name: "Men's Team",
                    gold: 1,
                    silver: 0,
                    bronze: 0,
                    result: "Champions",
                  },
                  {
                    name: "Women's Team",
                    gold: 1,
                    silver: 0,
                    bronze: 0,
                    result: "Champions",
                  },
                ],
              },
              {
                sport: "Volleyball",
                teams: [
                  {
                    name: "Men's Team",
                    gold: 1,
                    silver: 0,
                    bronze: 0,
                    result: "Champions",
                  },
                  {
                    name: "Women's Team",
                    gold: 1,
                    silver: 0,
                    bronze: 0,
                    result: "Champions",
                  },
                ],
              },
            ].map((sport, idx) => (
              <div
                key={idx}
                className={`py-4 ${
                  idx !== 0 ? "border-t border-gray-200" : ""
                }`}
              >
                <h4 className="text-lg font-bold mb-2">{sport.sport}</h4>
                {sport.teams.map((team, tIdx) => (
                  <div key={tIdx} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700 font-medium">{team.name}</p>
                      <p className="text-sm text-gray-500">
                        <span className="text-amber-500 font-bold">
                          {team.gold}
                        </span>{" "}
                        Gold{" "}
                        <span className="text-gray-400 font-bold">
                          {team.silver}
                        </span>{" "}
                        Silver{" "}
                        <span className="text-yellow-800 font-bold">
                          {team.bronze}
                        </span>{" "}
                        Bronze
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{team.result}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center border-t border-green-700 mt-4 pt-4">
                  <p className="text-green-700 font-bold">Total</p>
                  <p className="text-sm text-gray-500">
                    <span className="text-amber-500 font-bold">
                      {sport.teams.reduce((a, b) => a + b.gold, 0)}
                    </span>{" "}
                    Gold{" "}
                    <span className="text-gray-400 font-bold">
                      {sport.teams.reduce((a, b) => a + b.silver, 0)}
                    </span>{" "}
                    Silver{" "}
                    <span className="text-yellow-800 font-bold">
                      {sport.teams.reduce((a, b) => a + b.bronze, 0)}
                    </span>{" "}
                    Bronze
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default MedalTally;
