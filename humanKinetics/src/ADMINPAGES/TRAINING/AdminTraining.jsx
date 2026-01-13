import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import TrainingModal from "./trainingModal";
import { useEffect, useState } from "react";
import axios from "axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function AdminTraining() {
  const API = import.meta.env.VITE_BBACKEND_URL;
  const [isModalOpen, setModalOpen] = useState(false);
  const [trainingSchedules, setTrainingSchedules] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(`${API}/trainingSchedule/training-schedule`);
        setTrainingSchedules(res.data.schedules);
      } catch (error) {
        console.error("❌ Error fetching training schedules:", error);
      }
    };
    fetchSchedules();
  }, [API]);

  const calendarEvents = trainingSchedules.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.date,
    // Setting color properties that FullCalendar uses
    backgroundColor: '#f0fdf4', // bg-green-50
    borderColor: '#16a34a',     // border-green-600
    textColor: '#166534',       // text-green-800
    extendedProps: {
      actualStartTime: event.startTime,
      actualEndTime: event.endTime,
      location: event.location,
      coach: event.coach,
      focusAreas: event.focusAreas,
    },
  }));

  const handleEventClick = (info) => {
    const { title, extendedProps, startStr } = info.event;
    setSelectedEvent({
      title,
      date: startStr,
      startTime: formatTime(extendedProps.actualStartTime),
      endTime: formatTime(extendedProps.actualEndTime),
      location: extendedProps.location,
      coach: extendedProps.coach,
      focusAreas: extendedProps.focusAreas ? extendedProps.focusAreas.split(",").map((a) => a.trim()) : [],
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "--:--";
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHours = h % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* CSS Overrides to match your custom design */}
      <style>{`
        .fc { background: white; border-radius: 8px; overflow: hidden; }
        .fc-theme-standard td, .fc-theme-standard th { border: 1px solid #e5e7eb !important; }
        .fc-col-header-cell { background: #f9fafb; padding: 12px 0 !important; }
        .fc-col-header-cell-cushion { color: #374151; font-weight: 600; }
        .fc-daygrid-day-number { 
          padding: 8px !important; 
          font-weight: bold; 
          color: #1f2937;
        }
        /* Highlight Today */
        .fc-day-today { background-color: #f0fdf4 !important; }
        .fc-day-today .fc-daygrid-day-number {
          background: #16a34a;
          color: white;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          margin: 4px;
        }
        /* Event Styling */
        .fc-daygrid-event {
          border-left: 4px solid #16a34a !important;
          border-radius: 4px !important;
          padding: 2px 4px !important;
          font-size: 0.75rem !important;
          margin-top: 2px !important;
        }
        .fc-header-toolbar {
          padding: 1rem;
          margin-bottom: 0 !important;
          border-bottom: 1px solid #e5e7eb;
        }
        .fc-toolbar-title { color: #15803d; font-size: 1.25rem !important; font-weight: bold; }
        .fc-button-primary {
          background-color: white !important;
          border: 1px solid #d1d5db !important;
          color: #374151 !important;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
          text-transform: capitalize !important;
        }
        .fc-button-primary:hover { background-color: #f9fafb !important; }
        .fc-button-active { background-color: #16a34a !important; color: white !important; border-color: #16a34a !important; }
      `}</style>

      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        <main className="flex-grow overflow-y-auto p-4 md:p-6 mt-16 max-w-7xl mx-auto w-full mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0 border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-green-700">Training Program</h2>
              <p className="text-gray-500 text-sm">Official Training Calendar</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-green-700 transition"
            >
              + Add Schedule
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {trainingSchedules.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No training schedules available.</p>
            ) : (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                eventClick={handleEventClick}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek'
                }}
                height="auto"
              />
            )}
          </div>
        </main>

        <TrainingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-xl font-bold text-green-700">📝 {selectedEvent.title}</h2>
                <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
              </div>

              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-bold w-24">📅 Date:</span>
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold w-24">⏰ Time:</span>
                  <span className="text-blue-600 font-medium">{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold w-24">📍 Location:</span>
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold w-24">👨‍🏫 Coach:</span>
                  <span>{selectedEvent.coach}</span>
                </div>
                <div className="mt-4">
                  <span className="font-bold block mb-1">🎯 Focus Areas:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.focusAreas.map((area, i) => (
                      <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded border border-green-200">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition"
              >
                Close Details
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default AdminTraining;