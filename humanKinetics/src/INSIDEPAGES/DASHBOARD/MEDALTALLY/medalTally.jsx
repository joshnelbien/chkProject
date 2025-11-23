import { useState, useEffect } from "react";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import axios from "axios";

function MedalTally() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [medalData, setMedalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(""); // currently selected year
  const [years, setYears] = useState([]); // list of available years

  // Fetch medal tally from backend
  const fetchMedalTally = async () => {
    try {
      const res = await axios.get("http://localhost:5000/medalTally/medalTally");
      setMedalData(res.data);

      // Extract unique years from data
      const uniqueYears = [...new Set(res.data.map((m) => m.year))].sort();
      setYears(uniqueYears);

      // Default select the latest year
      if (uniqueYears.length > 0) setSelectedYear(uniqueYears[uniqueYears.length - 1]);
    } catch (err) {
      console.error("❌ Error fetching medal tally:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedalTally();
  }, []);

  // Filter medals by selected year
  const filteredMedalData = medalData.filter((m) => m.year === selectedYear);

  // Group medals by sport
  const medalsBySport = filteredMedalData.reduce((acc, curr) => {
    const sportEntry = acc.find((s) => s.sport === curr.sports);
    if (sportEntry) {
      sportEntry.teams.push({
        name: curr.teamName || "Team",
        gold: Number(curr.gold),
        silver: Number(curr.silver),
        bronze: Number(curr.bronze),
        result: curr.result || "",
      });
    } else {
      acc.push({
        sport: curr.sports,
        teams: [
          {
            name: curr.teamName || "Team",
            gold: Number(curr.gold),
            silver: Number(curr.silver),
            bronze: Number(curr.bronze),
            result: curr.result || "",
          },
        ],
      });
    }
    return acc;
  }, []);

  // Calculate overall medal count
  const overallMedals = filteredMedalData.reduce(
    (acc, curr) => {
      acc.gold += Number(curr.gold);
      acc.silver += Number(curr.silver);
      acc.bronze += Number(curr.bronze);
      return acc;
    },
    { gold: 0, silver: 0, bronze: 0 }
  );

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

            {/* Year Selection */}
            <div className="flex flex-wrap gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg font-semibold shadow ${
                    selectedYear === year
                      ? "bg-green-700 text-white"
                      : "bg-white border border-gray-300 text-gray-600"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Overall Medal Count Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h4 className="text-4xl font-bold text-amber-500">
                {loading ? "..." : overallMedals.gold}
              </h4>
              <p className="text-lg text-gray-600">Gold</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h4 className="text-4xl font-bold text-gray-400">
                {loading ? "..." : overallMedals.silver}
              </h4>
              <p className="text-lg text-gray-600">Silver</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h4 className="text-4xl font-bold text-yellow-800">
                {loading ? "..." : overallMedals.bronze}
              </h4>
              <p className="text-lg text-gray-600">Bronze</p>
            </div>
          </div>

          {/* Medals by Sport Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Medals by Sport</h3>
            {loading ? (
              <p>Loading medal tally...</p>
            ) : medalsBySport.length === 0 ? (
              <p>No medal data found.</p>
            ) : (
              medalsBySport.map((sport, idx) => (
                <div
                  key={idx}
                  className={`py-4 ${idx !== 0 ? "border-t border-gray-200" : ""}`}
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
              ))
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default MedalTally;
