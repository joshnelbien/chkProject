import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminAthletes() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Athletes
              </h2>
              <p className="text-gray-500">Athlete Management</p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow">
              Add Athlete
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative w-full md:w-auto md:flex-grow">
              <input
                type="text"
                placeholder="Search athletes..."
                className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 text-gray-700">
                All Sports
              </button>
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 text-gray-700">
                All Status
              </button>
            </div>
          </div>

          {/* Athlete Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Athlete Card - John Smith */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">John Smith</h3>
                    <span className="bg-green-200 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-lg mr-1">23</span>
                    Basketball • Forward
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center border-b pb-4 mb-4">
                <div>
                  <p className="text-gray-500 text-sm">Attendance</p>
                  <p className="font-bold text-lg">95%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Performance</p>
                  <p className="font-bold text-lg">88%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Streak</p>
                  <p className="font-bold text-lg">15d</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Improvement</p>
                  <p className="font-bold text-lg text-green-600 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    +12%
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">
                  Performance Metrics
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Strength</span>
                    <span className="font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Speed</span>
                    <span className="font-bold">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Agility</span>
                    <span className="font-bold">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Endurance</span>
                    <span className="font-bold">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div>
                <p className="font-semibold text-gray-800 mb-2">
                  Recent Activities
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium text-gray-800">Feb 15 - Training</p>
                      <p className="text-gray-500 text-xs">
                        Excellent shooting practice
                      </p>
                    </div>
                    <span className="font-bold text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium text-gray-800">Feb 14 - Game</p>
                      <p className="text-gray-500 text-xs">
                        vs Team Eagles - 18 points
                      </p>
                    </div>
                    <span className="font-bold text-yellow-600">88%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium text-gray-800">Feb 12 - Training</p>
                      <p className="text-gray-500 text-xs">Defensive drills</p>
                    </div>
                    <span className="font-bold text-green-600">90%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Athlete Card - Sarah Johnson */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                    <span className="bg-green-200 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-lg mr-1">07</span>
                    Volleyball • Setter
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center border-b pb-4 mb-4">
                <div>
                  <p className="text-gray-500 text-sm">Attendance</p>
                  <p className="font-bold text-lg">92%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Performance</p>
                  <p className="font-bold text-lg">90%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Streak</p>
                  <p className="font-bold text-lg">12d</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Improvement</p>
                  <p className="font-bold text-lg text-green-600 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    +8%
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">
                  Performance Metrics
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Strength</span>
                    <span className="font-bold">82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Speed</span>
                    <span className="font-bold">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Agility</span>
                    <span className="font-bold">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Endurance</span>
                    <span className="font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div>
                <p className="font-semibold text-gray-800 mb-2">
                  Recent Activities
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium text-gray-800">Feb 15 - Training</p>
                      <p className="text-gray-500 text-xs">
                        Setting accuracy improved
                      </p>
                    </div>
                    <span className="font-bold text-green-600">90%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium text-gray-800">Feb 14 - Game</p>
                      <p className="text-gray-500 text-xs">
                        vs Team Spike - 28 assists
                      </p>
                    </div>
                    <span className="font-bold text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium text-gray-800">Feb 12 - Training</p>
                      <p className="text-gray-500 text-xs">Team coordination</p>
                    </div>
                    <span className="font-bold text-yellow-600">89%</span>
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

export default AdminAthletes;