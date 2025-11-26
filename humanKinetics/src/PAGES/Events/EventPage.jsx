import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../Footer/Footer";
import NavigationBar from "../../NavigationBar/NavigationBar";

// Helper function to get dynamic event status
const getStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) return "Pending";
  if (today > end) return "Completed";
  return "Ongoing";
};

// Modal Component for Event Details
const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  const status = getStatus(event.startDate, event.endDate);
  const statusColor =
    status === "Completed"
      ? "bg-green-500"
      : status === "Ongoing"
      ? "bg-blue-500"
      : "bg-orange-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full relative shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-3xl font-bold"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={event.image || "/lexi.jpg"}
              alt={event.tournamentName || event.title}
              className="w-full h-80 md:h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`text-white text-sm font-bold px-3 py-1 rounded-full ${statusColor} uppercase`}
                >
                  {status}
                </span>
                <span className="bg-gray-700 text-white text-sm font-bold px-3 py-1 rounded-full uppercase">
                  {event.sport}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2 uppercase">
                {event.tournamentName}
              </h2>

              {/* Date and Location */}
              <div className="text-gray-500 text-sm mb-4 flex flex-col gap-1 uppercase">
                <span>
                  📅 {event.startDate} - {event.endDate}
                </span>
                <span>📍 {event.location}</span>
              </div>

              <div className="text-gray-700">
                <h3 className="text-xl font-semibold mb-2 uppercase">
                  Details
                </h3>
                <p className="text-gray-600 mb-2 uppercase">
                  Teams: {event.teams || "-"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 uppercase"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function EventPage() {
  const API = import.meta.env.VITE_BBACKEND_URL;
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/tournament/tournaments`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("❌ Error fetching tournaments:", err));
  }, []);

  const handleViewDetails = (eventData) => {
    setSelectedEvent(eventData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const filteredEvents = events.filter(
    (event) =>
      (event.tournamentName || event.title)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (event.sport || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <main className="flex-grow pt-16">
        <section className="bg-gray-600 h-[30vh] flex items-center justify-center text-white">
          <h1 className="text-5xl font-bold uppercase">Sports Events</h1>
        </section>

        <section className="bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
              <input
                type="text"
                placeholder="Search events..."
                className="py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => {
                const status = getStatus(event.startDate, event.endDate);
                const statusColor =
                  status === "Completed"
                    ? "bg-green-500"
                    : status === "Ongoing"
                    ? "bg-blue-500"
                    : "bg-orange-500";

                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-64">
                      <img
                        src={event.image || "/lexi.jpg"}
                        alt={event.tournamentName || event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span
                          className={`text-white text-sm font-bold px-3 py-1 rounded-full ${statusColor} uppercase`}
                        >
                          {status}
                        </span>
                        <span className="bg-gray-700 text-white text-sm font-bold px-3 py-1 rounded-full uppercase">
                          {event.sport}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold uppercase">
                        {event.tournamentName || event.title}
                      </h3>
                      <div className="text-gray-500 text-sm mt-2 mb-4 flex flex-col gap-1 uppercase">
                        <span>
                          📅 {event.startDate || event.date} -{" "}
                          {event.endDate || event.date}
                        </span>
                        <span>📍 {event.location}</span>
                      </div>
                      <button
                        onClick={() => handleViewDetails(event)}
                        className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 uppercase"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      {isModalOpen && <EventModal event={selectedEvent} onClose={closeModal} />}
    </div>
  );
}

export default EventPage;
