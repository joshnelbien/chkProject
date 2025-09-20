import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { ChevronDown } from "lucide-react";

function TrainProgram() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-green-700">Training Program</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
                Current Program
              </button>
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
                Training History
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Program Progress Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Program Progress</p>
              <div className="flex items-center justify-between mt-2 mb-1">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-700 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="ml-3 text-sm font-semibold">65%</span>
              </div>
            </div>

            {/* Next Session Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Next Session</p>
              <h3 className="text-lg font-bold mt-2">Today at 3:00 PM</h3>
              <p className="text-gray-600">Team Practice</p>
            </div>

            {/* Program Details Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Program Details</p>
              <div className="mt-2">
                <p className="text-sm">
                  <span className="font-semibold">Coach:</span> Coach Michael Jordan
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Duration:</span> Sep 1, 2024 - Oct 15, 2024
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Schedule Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
              <ul className="space-y-4">
                {/* Monday */}
                <li className="border-b border-gray-200 pb-4">
                  <p className="font-bold text-gray-800">Monday</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">6:00 AM - 7:30 AM <span className="font-semibold">Conditioning</span></p>
                    <span className="flex items-center text-sm font-semibold text-gray-800">
                      High
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full ml-2"></span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">3:00 PM - 5:00 PM <span className="font-semibold">Team Practice</span></p>
                    <span className="flex items-center text-sm font-semibold text-gray-800">
                      Medium
                      <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full ml-2"></span>
                    </span>
                  </div>
                </li>
                {/* Tuesday */}
                <li className="border-b border-gray-200 pb-4">
                  <p className="font-bold text-gray-800">Tuesday</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">6:00 AM - 7:30 AM <span className="font-semibold">Strength Training</span></p>
                    <span className="flex items-center text-sm font-semibold text-gray-800">
                      High
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full ml-2"></span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">3:00 PM - 5:00 PM <span className="font-semibold">Skills Development</span></p>
                    <span className="flex items-center text-sm font-semibold text-gray-800">
                      Medium
                      <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full ml-2"></span>
                    </span>
                  </div>
                </li>
                {/* Wednesday */}
                <li className="border-b border-gray-200 pb-4">
                  <p className="font-bold text-gray-800">Wednesday</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">6:00 AM - 7:30 AM <span className="font-semibold">Recovery</span></p>
                    <span className="flex items-center text-sm font-semibold text-gray-800">
                      Low
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full ml-2"></span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">3:00 PM - 5:00 PM <span className="font-semibold">Team Practice</span></p>
                    <span className="flex items-center text-sm font-semibold text-gray-800">
                      High
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full ml-2"></span>
                    </span>
                  </div>
                </li>
                {/* Thursday */}
                <li className="border-b border-gray-200 pb-4">
                  <p className="font-bold text-gray-800">Thursday</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">6:00 AM - 7:30 AM <span className="font-semibold">Agility Training</span></p>
                    <span className="flex items-center text-sm font-semibold text-gray-800">
                      Medium
                      <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full ml-2"></span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">3:00 PM - 5:00 PM <span className="font-semibold">Scrimmage</span></p>
                    <span className="flex items-center text-sm font-semibold text-gray-800">
                      High
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full ml-2"></span>
                    </span>
                  </div>
                </li>
                {/* Friday */}
                <li className="border-b border-gray-200 pb-4">
                  <p className="font-bold text-gray-800">Friday</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">6:00 AM - 7:30 AM <span className="font-semibold">Strength Training</span></p>
                    <span className="flex items-center text-sm font-semibold text-gray-800">
                      High
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full ml-2"></span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">3:00 PM - 5:00 PM <span className="font-semibold">Team Practice</span></p>
                    <span className="flex items-center text-sm font-semibold text-gray-800">
                      Medium
                      <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full ml-2"></span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Workout Details Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Workout Details</h2>
              <div className="space-y-4">
                {/* Conditioning */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Conditioning</h3>
                    <ChevronDown size={20} className="text-gray-500" />
                  </div>
                </div>
                {/* Strength Training */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Strength Training</h3>
                    <ChevronDown size={20} className="text-gray-500" />
                  </div>
                </div>
                {/* Skills Development */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Skills Development</h3>
                    <ChevronDown size={20} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
}

export default TrainProgram;