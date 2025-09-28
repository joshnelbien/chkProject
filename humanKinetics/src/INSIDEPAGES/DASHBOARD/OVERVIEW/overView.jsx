import { useState } from "react";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import {
  BarChart2,
  Calendar,
  Utensils,
  HeartPulse,
  Trophy,
} from "lucide-react";

function OverView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
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
          {/* Performance Overview Section */}
          <section className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                Performance Overview
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-2 md:px-4 md:py-2 rounded-lg bg-green-700 text-white font-semibold shadow text-sm md:text-base">
                  Weekly
                </button>
                <button className="px-3 py-2 md:px-4 md:py-2 rounded-lg text-gray-600 bg-white shadow text-sm md:text-base">
                  Monthly
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  title: "Attendance Rate",
                  value: "92%",
                  growth: "+2.5%",
                  width: "92%",
                },
                {
                  title: "Training Progress",
                  value: "78%",
                  growth: "+5.2%",
                  width: "78%",
                },
                {
                  title: "Nutrition Compliance",
                  value: "85%",
                  growth: "+1.8%",
                  width: "85%",
                },
                {
                  title: "Fitness Level",
                  value: "88%",
                  growth: "+3.1%",
                  width: "88%",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 md:p-6 rounded-lg shadow"
                >
                  <p className="text-gray-500 mb-1 md:mb-2 text-sm">
                    {card.title}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                    {card.value}
                  </h3>
                  <div className="flex items-center text-green-500 text-xs md:text-sm">
                    <span className="mr-1">{card.growth}</span>
                    <BarChart2 size={16} />
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full mt-3">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: card.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Activities & Events Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Recent Activities */}
            <section className="bg-white p-4 md:p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  Recent Activities
                </h2>
                <a href="#" className="text-sm text-green-700 hover:underline">
                  View All
                </a>
              </div>
              <ul className="space-y-3">
                {[
                  {
                    icon: <BarChart2 size={16} />,
                    title: "Basketball Practice",
                    time: "2 hours ago",
                    status: "completed",
                    statusColor: "green",
                  },
                  {
                    icon: <Utensils size={16} />,
                    title: "Meal Plan Updated",
                    time: "5 hours ago",
                    status: "updated",
                    statusColor: "yellow",
                  },
                  {
                    icon: <HeartPulse size={16} />,
                    title: "Physical Assessment",
                    time: "1 day ago",
                    status: "completed",
                    statusColor: "green",
                  },
                ].map((activity, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 flex-shrink-0 bg-${activity.statusColor}-100 text-${activity.statusColor}-700 rounded-full flex items-center justify-center`}
                      >
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium text-sm md:text-base">
                          {activity.title}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full bg-${activity.statusColor}-100 text-${activity.statusColor}-700`}
                    >
                      {activity.status}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Upcoming Events */}
            <section className="bg-white p-4 md:p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  Upcoming Events
                </h2>
                <a href="#" className="text-sm text-green-700 hover:underline">
                  View Calendar
                </a>
              </div>
              <ul className="space-y-3">
                {[
                  {
                    icon: <Calendar size={16} />,
                    title: "Team Training",
                    time: "09:00 AM • Today",
                  },
                  {
                    icon: <Utensils size={16} />,
                    title: "Nutrition Consultation",
                    time: "02:30 PM • Tomorrow",
                  },
                  {
                    icon: <Trophy size={16} />,
                    title: "League Match",
                    time: "10:00 AM • Sep 25",
                  },
                ].map((event, idx) => (
                  <li
                    key={idx}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 flex-shrink-0 bg-green-100 text-green-700 rounded-full flex items-center justify-center mr-3">
                      {event.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium text-sm md:text-base">
                        {event.title}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        {event.time}
                      </p>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-green-700 hover:underline"
                    >
                      Details
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default OverView;
