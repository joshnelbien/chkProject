import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import TrainingModal from "./trainingModal";
import { useEffect, useState } from "react";
import axios from "axios";

// ✅ FullCalendar imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function AdminTraining() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [trainingSchedules, setTrainingSchedules] = useState([]);

  // 📝 Event details modal state
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ✅ Fetch training schedule from backend
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/trainingSchedule/training-schedule"
        );
        console.log("📌 Training Schedules (Frontend):", res.data.schedules);
        setTrainingSchedules(res.data.schedules);
      } catch (error) {
        console.error("❌ Error fetching training schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  // ✅ Convert training schedules into FullCalendar event format
  const calendarEvents = trainingSchedules.map((event) => ({
    id: event.id,
    title: event.title,
    start: `${event.date}T${event.startTime}`,
    end: `${event.date}T${event.endTime}`,
    extendedProps: {
      location: event.location,
      coach: event.coach,
      focusAreas: event.focusAreas,
    },
  }));

  // ✅ When user clicks on an event in calendar → Open details modal
  const handleEventClick = (info) => {
    const { title, extendedProps, start, end } = info.event;

    setSelectedEvent({
      title,
      date: new Date(start).toLocaleDateString(),
      startTime: new Date(start).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endTime: new Date(end).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: extendedProps.location,
      coach: extendedProps.coach,
      focusAreas: extendedProps.focusAreas.split(",").map((a) => a.trim()),
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - Fixed */}
      <div className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Navbar - Fixed */}
        <div className="fixed top-0 left-64 right-0 z-10">
          <Navbar />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 mt-16 md:mt-20 mb-16 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Training Program
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Official Training Calendar
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow hover:bg-green-700 transition"
            >
              Add Schedule
            </button>
          </div>

          {/* 📅 Full Calendar Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Training Calendar</h3>

            {trainingSchedules.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No training schedules available.
              </p>
            ) : (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                eventClick={handleEventClick}
                height="auto"
              />
            )}
          </div>
        </main>

        {/* ➕ Training Modal (Add Schedule) */}
        <TrainingModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={(data) => {
            console.log("Submitted Training Data:", data);
            setModalOpen(false);
          }}
        />

        {/* 📌 Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-green-700">
                  📝 {selectedEvent.title}
                </h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">📅 Date:</span>{" "}
                  {selectedEvent.date}
                </p>
                <p>
                  <span className="font-semibold">⏰ Time:</span>{" "}
                  {selectedEvent.startTime} - {selectedEvent.endTime}
                </p>
                <p>
                  <span className="font-semibold">📍 Location:</span>{" "}
                  {selectedEvent.location}
                </p>
                <p>
                  <span className="font-semibold">👨‍🏫 Coach:</span>{" "}
                  {selectedEvent.coach}
                </p>

                <div>
                  <span className="font-semibold">🎯 Focus Areas:</span>
                  <ul className="list-disc list-inside text-sm mt-1">
                    {selectedEvent.focusAreas.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer - Fixed */}
        <div className="fixed bottom-0 left-64 right-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AdminTraining;
