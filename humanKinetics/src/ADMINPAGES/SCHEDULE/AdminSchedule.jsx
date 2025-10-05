import { useState } from "react";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import AddEventModal from "./addEventModal";

function AdminSchedule() {
  const [isModalOpen, setModalOpen] = useState(false);

  const scheduleData = {
    "February 19-23, 2024": [
      {
        day: "Monday",
        date: "19",
        events: [
          {
            time: "8:00 AM - 10:00 AM",
            title: "Basketball Training",
            location: "Main Court",
            participants: "12 athletes",
            color: "bg-green-100",
            textColor: "text-green-800",
          },
          {
            time: "10:30 AM - 12:30 PM",
            title: "Volleyball Practice",
            location: "Court 2",
            participants: "14 athletes",
            color: "bg-gray-100",
            textColor: "text-gray-800",
          },
        ],
      },
      {
        day: "Tuesday",
        date: "20",
        events: [
          {
            time: "8:00 AM - 10:00 AM",
            title: "Volleyball Training",
            location: "Court 2",
            participants: "14 athletes",
            color: "bg-gray-100",
            textColor: "text-gray-800",
          },
          {
            time: "2:00 PM - 4:00 PM",
            title: "Basketball Game vs Eagles",
            location: "Main Court",
            participants: "12 athletes",
            color: "bg-yellow-100",
            textColor: "text-yellow-800",
          },
        ],
      },
    ],
  };

  const currentWeek = scheduleData["February 19-23, 2024"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        <Navbar />

        <main className="flex-grow p-4 sm:p-6 mt-16 md:mt-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Schedule
              </h2>
              <p className="text-gray-500">Training and Events Calendar</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 text-gray-700">
                All Teams
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow hover:bg-green-700 transition"
              >
                Add Event
              </button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex items-center space-x-2">
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h3 className="text-xl font-semibold text-gray-800">
                February 19-23, 2024
              </h3>
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full">
              <button className="px-4 py-2 bg-white text-gray-700 font-semibold rounded-full shadow">
                Week
              </button>
              <button className="px-4 py-2 text-gray-600 font-medium rounded-full">
                Month
              </button>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentWeek.map((dayData) => (
              <div key={dayData.day} className="flex flex-col">
                <div className="text-center pb-2">
                  <p className="text-sm font-semibold">{dayData.day}</p>
                  <p className="text-gray-400 text-xs">{dayData.date}</p>
                </div>
                {dayData.events.map((event, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg mb-2 ${event.color} ${event.textColor} shadow-sm`}
                  >
                    <p className="text-xs font-semibold">{event.time}</p>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      📍 {event.location}
                    </p>
                    <p className="text-xs text-gray-500">
                      👥 {event.participants}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </main>

        {/* ✅ Modal */}
        <AddEventModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />

        <Footer />
      </div>
    </div>
  );
}

export default AdminSchedule;
