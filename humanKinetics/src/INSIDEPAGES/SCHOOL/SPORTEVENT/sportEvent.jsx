import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function SportEvent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playerSport, setPlayerSport] = useState(""); 
  const { id } = useParams(); 
  const API = import.meta.env.VITE_BBACKEND_URL;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Player Profile
        const playerRes = await axios.get(`${API}/userAccounts/players-profile/${id}`);
        const sport = playerRes.data.sport || "";
        setPlayerSport(sport);

        // 2. Fetch All Tournament Events
        const eventsRes = await axios.get(`${API}/tournament/tournaments-schedules`);
        const allEvents = eventsRes.data;

        // 3. FILTER Events: Only show events that match the player's sport
        // We split by "-" to handle "basketball-men" vs just "basketball"
        const cleanPlayerSport = sport.split("-")[0].toLowerCase();

        const filteredEvents = allEvents.filter((event) => {
          const eventSportName = event.sport?.toLowerCase() || "";
          return eventSportName.includes(cleanPlayerSport);
        });

        setEvents(filteredEvents);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, API]);

  if (loading) return <div className="p-6 flex justify-center items-center h-screen text-green-700 font-bold">Loading your schedule...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-grow p-6 mt-16">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-green-700">My Sport Schedule</h1>
            <p className="text-gray-500">
              Exclusive events for: <span className="font-semibold text-green-600 uppercase">{playerSport}</span>
            </p>
          </div>

          <div className="space-y-6">
            {events.length === 0 ? (
              <div className="bg-white p-10 rounded-lg shadow text-center">
                <p className="text-gray-500 italic">No scheduled events found for {playerSport}.</p>
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className={`bg-white p-6 rounded-lg shadow border-l-4 ${
                    event.status === "Start"
                      ? "border-red-500"
                      : event.status === "Done"
                      ? "border-green-500"
                      : "border-yellow-500"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {event.sport?.toUpperCase()} vs. {event.opponent?.toUpperCase()}
                      </h2>
                      <p className="text-sm text-gray-600">📍 {event.location || "Venue TBA"}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {event.status === "Start" ? (
                        <div className="flex items-center bg-red-50 px-3 py-1 rounded-full">
                          <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          <span className="text-xs font-bold text-red-600">LIVE</span>
                        </div>
                      ) : (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          event.status === "Done" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {event.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                    <div className="space-y-1 text-sm">
                      <p><strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                      <p><strong>🕒 Time:</strong> {event.startTime} - {event.endTime}</p>
                    </div>
                    
                    {event.status === "Done" && (
                      <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg py-2">
                        <h3 className="text-2xl font-black text-gray-800 tracking-widest">
                          {event.homeScore} : {event.opponentScore}
                        </h3>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Final Result</p>
                      </div>
                    )}
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

export default SportEvent;