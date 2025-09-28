import { useState } from "react";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function Schedule() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dailySchedule = [
    {
      time: "07:00",
      title: "Morning Workout",
      duration: "",
      color: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      time: "08:30",
      title: "Breakfast",
      duration: "30m",
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
    {
      time: "10:00",
      title: "Team Training",
      duration: "2h",
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      time: "13:00",
      title: "Lunch",
      duration: "1h",
      color: "bg-gray-200",
      textColor: "text-gray-700",
    },
    {
      time: "15:30",
      title: "Recovery Session",
      duration: "1h",
      color: "bg-orange-100",
      textColor: "text-orange-700",
    },
    {
      time: "18:00",
      title: "Evening Nutrition",
      duration: "1h",
      color: "bg-purple-100",
      textColor: "text-purple-700",
    },
  ];

  const summaryCards = [
    {
      title: "Today's Schedule",
      content: dailySchedule.map((item, idx) => (
        <li key={idx} className="flex items-start">
          <div className="flex-1">
            <p className="font-semibold text-gray-800">{item.time}</p>
            <p className="text-sm text-gray-600">{item.title}</p>
            {item.duration && (
              <p className="text-xs text-gray-500">{item.duration}</p>
            )}
          </div>
        </li>
      )),
    },
    {
      title: "Weekly Overview",
      content: [
        { label: "Training Sessions", value: 12 },
        { label: "Nutrition Plans", value: 21 },
        { label: "Recovery Sessions", value: 5 },
      ].map((item, idx) => (
        <li
          key={idx}
          className="flex justify-between items-center text-gray-700"
        >
          <p>{item.label}</p>
          <p className="font-semibold">{item.value}</p>
        </li>
      )),
    },
    {
      title: "Schedule Completion",
      content: [
        { label: "This Week", value: 92 },
        { label: "Last Week", value: 88 },
      ].map((item, idx) => (
        <div key={idx}>
          <li className="flex justify-between items-center text-gray-700">
            <p>{item.label}</p>
            <p className="font-semibold">{item.value}%</p>
          </li>
          <div className="h-1 bg-gray-200 rounded-full mb-2">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      )),
    },
  ];

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

        {/* Main content */}
        <main className="flex-1 overflow-y-auto mt-16 p-4 md:p-6">
          <h1 className="text-2xl font-bold text-green-700 mb-6">
            Schedule Dashboard
          </h1>

          {/* Controls */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
            <div className="flex space-x-2">
              {["Weekly View", "Monthly View"].map((btn, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-lg font-semibold shadow ${
                    idx === 0
                      ? "bg-green-700 text-white"
                      : "bg-white border border-gray-300 text-gray-600"
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search events..."
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
                Add Event
              </button>
            </div>
          </div>

          {/* Weekly Calendar */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="grid grid-cols-7 gap-px text-center bg-gray-200 rounded-lg overflow-hidden">
              {/* Day headers */}
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="py-2 bg-gray-50 text-gray-700 font-semibold text-sm"
                >
                  {day}
                </div>
              ))}
              {/* Calendar cells */}
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div key={dayIndex} className="bg-white p-2">
                  <div className="text-sm font-bold text-gray-800 mb-2">
                    {dayIndex + 1}
                  </div>
                  <div className="space-y-2">
                    {dailySchedule.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-1 text-xs rounded-md ${item.color} ${item.textColor}`}
                      >
                        <p className="font-semibold">{item.time}</p>
                        <p>{item.title}</p>
                        {item.duration && (
                          <p className="text-[10px] opacity-80">
                            {item.duration}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryCards.map((card, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
                <ul className="space-y-4">{card.content}</ul>
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

export default Schedule;
