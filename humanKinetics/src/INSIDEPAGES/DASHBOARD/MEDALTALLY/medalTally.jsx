import { useState, useEffect, useCallback } from "react";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

function MedalTally() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [medalData, setMedalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSport, setUserSport] = useState("");
  const { id } = useParams();

  const API = import.meta.env.VITE_BBACKEND_URL;

  const fetchMedalTally = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/medalTally/medalTally`);
      setMedalData(res.data);
    } catch (err) {
      console.error("❌ Error fetching medal tally:", err);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    fetchMedalTally();
  }, [fetchMedalTally]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) return;
      try {
        const userRes = await axios.get(
          `${API}/userAccounts/players-profile/${id}`
        );
        setUserSport(userRes.data.sport || "");
      } catch (err) {
        console.error("❌ Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, [id, API]);

  // 1. Filter data based on userSport (if any)
  const filteredMedalData = userSport
    ? medalData.filter(
        (m) => m.sports && m.sports.toLowerCase() === userSport.toLowerCase()
      )
    : medalData;

  // 2. Group by Sport first, then flatten the years
  const groupedBySport = filteredMedalData.reduce((acc, curr) => {
    let sportEntry = acc.find((s) => s.sportName === curr.sports);

    if (!sportEntry) {
      sportEntry = { 
        sportName: curr.sports, 
        records: [],
        totalGold: 0,
        totalSilver: 0,
        totalBronze: 0
      };
      acc.push(sportEntry);
    }

    const gold = Number(curr.gold) || 0;
    const silver = Number(curr.silver) || 0;
    const bronze = Number(curr.bronze) || 0;

    sportEntry.records.push({
      year: curr.year,
      teamName: curr.teamName || "Team",
      gold,
      silver,
      bronze,
      result: curr.result || "",
    });

    // Update global totals for this sport
    sportEntry.totalGold += gold;
    sportEntry.totalSilver += silver;
    sportEntry.totalBronze += bronze;

    return acc;
  }, []);

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
          <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
            <header className="mb-6 border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Sport Medal Records
              </h3>
              <p className="text-gray-500 italic">
                {userSport ? `Showing history for ${userSport}` : "Showing all sports history"}
              </p>
            </header>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
              </div>
            ) : groupedBySport.length === 0 ? (
              <p className="text-center py-10 text-gray-500">No records found.</p>
            ) : (
              groupedBySport.map((sportGroup, sIdx) => (
                <div key={sIdx} className="mb-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  {/* Sport Header & Global Total */}
                  <div className="bg-green-800 p-4 text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold uppercase tracking-wide">
                      {sportGroup.sportName}
                    </h2>
                    <div className="text-right">
                      <p className="text-[10px] uppercase opacity-80">All-Time Medals</p>
                      <p className="font-mono font-bold">
                        G: {sportGroup.totalGold} | S: {sportGroup.totalSilver} | B: {sportGroup.totalBronze}
                      </p>
                    </div>
                  </div>

                  {/* List of Medals across all years */}
                  <div className="p-4 space-y-4">
                    {sportGroup.records
                      .sort((a, b) => b.year - a.year) // Sort by year descending
                      .map((record, rIdx) => (
                        <div key={rIdx} className="bg-white p-4 rounded shadow-sm border-l-4 border-amber-500">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <span className="inline-block bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded mb-1">
                                LCUAA {record.year}
                              </span>
                              <h4 className="text-lg font-semibold text-gray-800">{record.teamName}</h4>
                              <p className="text-sm text-gray-500">{record.result}</p>
                            </div>

                            <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
                              <div className="text-center">
                                <p className="text-amber-500 font-bold">{record.gold}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Gold</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-400 font-bold">{record.silver}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Silver</p>
                              </div>
                              <div className="text-center">
                                <p className="text-yellow-800 font-bold">{record.bronze}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Bronze</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default MedalTally;