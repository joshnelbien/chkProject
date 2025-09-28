import { useState } from "react";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { ChevronDown } from "lucide-react";

function TrainProgram() {
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
            <h1 className="text-2xl font-bold text-green-700">
              Training Program
            </h1>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
                Current Program
              </button>
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
                Training History
              </button>
            </div>
          </div>

          {/* Program Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Program Progress */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Program Progress</p>
              <div className="flex items-center justify-between mt-2 mb-1">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-700 h-2.5 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-semibold">65%</span>
              </div>
            </div>

            {/* Next Session */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Next Session</p>
              <h3 className="text-lg font-bold mt-2">Today at 3:00 PM</h3>
              <p className="text-gray-600">Team Practice</p>
            </div>

            {/* Program Details */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Program Details</p>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  <span className="font-semibold">Coach:</span> Coach Michael
                  Jordan
                </p>
                <p>
                  <span className="font-semibold">Duration:</span> Sep 1, 2024 -
                  Oct 15, 2024
                </p>
              </div>
            </div>
          </div>

          {/* Weekly Schedule & Workout Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Schedule */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
              <ul className="space-y-4">
                {[
                  {
                    day: "Monday",
                    sessions: [
                      {
                        time: "6:00 AM - 7:30 AM",
                        activity: "Conditioning",
                        intensity: "High",
                        color: "red-500",
                      },
                      {
                        time: "3:00 PM - 5:00 PM",
                        activity: "Team Practice",
                        intensity: "Medium",
                        color: "yellow-500",
                      },
                    ],
                  },
                  {
                    day: "Tuesday",
                    sessions: [
                      {
                        time: "6:00 AM - 7:30 AM",
                        activity: "Strength Training",
                        intensity: "High",
                        color: "red-500",
                      },
                      {
                        time: "3:00 PM - 5:00 PM",
                        activity: "Skills Development",
                        intensity: "Medium",
                        color: "yellow-500",
                      },
                    ],
                  },
                  {
                    day: "Wednesday",
                    sessions: [
                      {
                        time: "6:00 AM - 7:30 AM",
                        activity: "Recovery",
                        intensity: "Low",
                        color: "green-500",
                      },
                      {
                        time: "3:00 PM - 5:00 PM",
                        activity: "Team Practice",
                        intensity: "High",
                        color: "red-500",
                      },
                    ],
                  },
                  {
                    day: "Thursday",
                    sessions: [
                      {
                        time: "6:00 AM - 7:30 AM",
                        activity: "Agility Training",
                        intensity: "Medium",
                        color: "yellow-500",
                      },
                      {
                        time: "3:00 PM - 5:00 PM",
                        activity: "Scrimmage",
                        intensity: "High",
                        color: "red-500",
                      },
                    ],
                  },
                  {
                    day: "Friday",
                    sessions: [
                      {
                        time: "6:00 AM - 7:30 AM",
                        activity: "Strength Training",
                        intensity: "High",
                        color: "red-500",
                      },
                      {
                        time: "3:00 PM - 5:00 PM",
                        activity: "Team Practice",
                        intensity: "Medium",
                        color: "yellow-500",
                      },
                    ],
                  },
                ].map((day, idx) => (
                  <li key={idx} className="border-b border-gray-200 pb-4">
                    <p className="font-bold text-gray-800">{day.day}</p>
                    {day.sessions.map((s, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex justify-between items-center mt-2"
                      >
                        <p className="text-gray-600">
                          {s.time}{" "}
                          <span className="font-semibold">{s.activity}</span>
                        </p>
                        <span className="flex items-center text-sm font-semibold text-gray-800">
                          {s.intensity}
                          <span
                            className={`w-2.5 h-2.5 rounded-full ml-2 bg-${s.color}`}
                          ></span>
                        </span>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>

            {/* Workout Details */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Workout Details</h2>
              <div className="space-y-4">
                {[
                  "Conditioning",
                  "Strength Training",
                  "Skills Development",
                ].map((workout, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{workout}</h3>
                      <ChevronDown size={20} className="text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default TrainProgram;
