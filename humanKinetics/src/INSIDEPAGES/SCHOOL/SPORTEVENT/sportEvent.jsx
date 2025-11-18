import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function SportEvent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/tournament/tournaments-schedules"
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch tournaments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="p-6">Loading events...</div>;

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

        <main className="flex-grow p-6 mt-16">
          <h1 className="text-2xl font-bold text-green-700 mb-6">
            Sports Events
          </h1>

          <div className="space-y-6">
            {events.map((event) => (
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
                      {event.teamName?.toUpperCase()} vs.{" "}
                      {event.opponent?.toUpperCase()}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {event.sport?.toUpperCase()}
                    </p>
                  </div>

                  {/* 🟡 🟢 🔴 STATUS BADGE */}
                  <div className="flex items-center space-x-2">
                    {event.status === "Start" && (
                      <>
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <span className="text-sm font-semibold text-red-500">
                          LIVE
                        </span>
                      </>
                    )}

                    {event.status === "Pending" && (
                      <span className="text-sm font-semibold text-yellow-500">
                        Pending
                      </span>
                    )}

                    {event.status === "Done" && (
                      <span className="text-sm font-semibold text-green-600">
                        Done
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div className="space-y-1">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {event.startTime} - {event.endTime}
                    </p>
                    <p>
                      <strong>Venue:</strong> {event.venue || "TBA"}
                    </p>
                  </div>
                  {event.isCompleted && (
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-gray-800">
                        {event.homeScore} - {event.opponentScore}
                      </h3>
                      <p className="text-sm text-gray-500">Final Score</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default SportEvent;
