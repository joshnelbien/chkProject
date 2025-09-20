import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { BarChart2 } from "lucide-react";

function Analytics() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          <h1 className="text-2xl font-bold text-green-700 mb-6">Analytics Dashboard</h1>

          {/* Top Performance Metrics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Attendance Rate Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 mb-2">Attendance Rate</p>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">95%</h3>
              <div className="flex items-center text-green-500 text-sm">
                <span className="mr-1">+2.1%</span>
                <BarChart2 size={16} />
              </div>
              <div className="h-1 bg-gray-200 rounded-full mt-4">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>

            {/* Performance Score Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 mb-2">Performance Score</p>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">88%</h3>
              <div className="flex items-center text-green-500 text-sm">
                <span className="mr-1">+5.3%</span>
                <BarChart2 size={16} />
              </div>
              <div className="h-1 bg-gray-200 rounded-full mt-4">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            {/* Improvement Rate Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 mb-2">Improvement Rate</p>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">22%</h3>
              <div className="flex items-center text-green-500 text-sm">
                <span className="mr-1">+1.8%</span>
                <BarChart2 size={16} />
              </div>
              <div className="h-1 bg-gray-200 rounded-full mt-4">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>

            {/* Program Completion Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 mb-2">Program Completion</p>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">78%</h3>
              <div className="flex items-center text-green-500 text-sm">
                <span className="mr-1">+3.2%</span>
                <BarChart2 size={16} />
              </div>
              <div className="h-1 bg-gray-200 rounded-full mt-4">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="flex items-center space-x-2 mb-6">
            <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
              Overview
            </button>
            <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
              Performance
            </button>
            <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
              Attendance
            </button>
          </div>

          {/* Performance Trends Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Performance Trends</h2>
              <select className="px-3 py-1 text-sm rounded-lg bg-gray-100 border border-gray-300 text-gray-600">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="flex items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              Chart visualization would go here
            </div>
          </div>

          {/* Top Performing & Improvement Areas Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Performing Areas */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Top Performing Areas</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-gray-700">
                  <p>Shooting Accuracy</p>
                  <p className="font-semibold">92%</p>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Team Coordination</p>
                  <p className="font-semibold">88%</p>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Physical Fitness</p>
                  <p className="font-semibold">85%</p>
                </li>
              </ul>
            </div>
            {/* Areas for Improvement */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-gray-700">
                  <p>Defense Tactics</p>
                  <p className="font-semibold">72%</p>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Endurance</p>
                  <p className="font-semibold">68%</p>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Game Strategy</p>
                  <p className="font-semibold">65%</p>
                </li>
              </ul>
            </div>
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
}

export default Analytics;