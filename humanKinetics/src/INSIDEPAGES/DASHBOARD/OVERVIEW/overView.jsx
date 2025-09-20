import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { CheckCircle, BarChart2, Calendar, Utensils, HeartPulse, Trophy } from "lucide-react";

function OverView() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          {/* Performance Overview Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Performance Overview</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
                  Weekly
                </button>
                <button className="px-4 py-2 rounded-lg text-gray-600 bg-white shadow">
                  Monthly
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Attendance Rate Card */}
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500 mb-2">Attendance Rate</p>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">92%</h3>
                <div className="flex items-center text-green-500 text-sm">
                  <span className="mr-1">+2.5%</span>
                  <BarChart2 size={16} />
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-4">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Training Progress Card */}
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500 mb-2">Training Progress</p>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">78%</h3>
                <div className="flex items-center text-green-500 text-sm">
                  <span className="mr-1">+5.2%</span>
                  <BarChart2 size={16} />
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-4">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Nutrition Compliance Card */}
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500 mb-2">Nutrition Compliance</p>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">85%</h3>
                <div className="flex items-center text-green-500 text-sm">
                  <span className="mr-1">+1.8%</span>
                  <BarChart2 size={16} />
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-4">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* Fitness Level Card */}
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500 mb-2">Fitness Level</p>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">88%</h3>
                <div className="flex items-center text-green-500 text-sm">
                  <span className="mr-1">+3.1%</span>
                  <BarChart2 size={16} />
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-4">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
                <a href="#" className="text-sm text-green-700 hover:underline">View All</a>
              </div>
              <ul className="space-y-4">
                {/* Activity Item 1 */}
                <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                      <BarChart2 size={16} />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Basketball Practice</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">completed</span>
                </li>
                {/* Activity Item 2 */}
                <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center">
                      <Utensils size={16} />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Meal Plan Updated</p>
                      <p className="text-sm text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">updated</span>
                </li>
                {/* Activity Item 3 */}
                <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                      <HeartPulse size={16} />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Physical Assessment</p>
                      <p className="text-sm text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">completed</span>
                </li>
              </ul>
            </div>

            {/* Upcoming Events Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
                <a href="#" className="text-sm text-green-700 hover:underline">View Calendar</a>
              </div>
              <ul className="space-y-4">
                {/* Event Item 1 */}
                <li className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex-shrink-0 bg-green-100 text-green-700 rounded-full flex items-center justify-center mr-3">
                    <Calendar size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">Team Training</p>
                    <p className="text-sm text-gray-500">09:00 AM • Today</p>
                  </div>
                  <a href="#" className="text-sm text-green-700 hover:underline">Details</a>
                </li>
                {/* Event Item 2 */}
                <li className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex-shrink-0 bg-green-100 text-green-700 rounded-full flex items-center justify-center mr-3">
                    <Utensils size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">Nutrition Consultation</p>
                    <p className="text-sm text-gray-500">02:30 PM • Tomorrow</p>
                  </div>
                  <a href="#" className="text-sm text-green-700 hover:underline">Details</a>
                </li>
                {/* Event Item 3 */}
                <li className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex-shrink-0 bg-green-100 text-green-700 rounded-full flex items-center justify-center mr-3">
                    <Trophy size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">League Match</p>
                    <p className="text-sm text-gray-500">10:00 AM • Sep 25</p>
                  </div>
                  <a href="#" className="text-sm text-green-700 hover:underline">Details</a>
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

export default OverView;