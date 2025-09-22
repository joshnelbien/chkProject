import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminTeam() {
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
                Basketball Team
              </h2>
              <p className="text-gray-500">Team Management</p>
            </div>
            <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full">
              <button className="px-4 py-2 bg-white text-green-700 font-semibold rounded-full shadow">
                Basketball Team
              </button>
              <button className="px-4 py-2 text-gray-600 font-medium rounded-full">
                Volleyball Team
              </button>
            </div>
          </div>

          {/* Performance Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Players Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Total Players</p>
              <p className="text-2xl font-bold">
                12
                <span className="text-sm font-normal text-gray-500 ml-1">
                  11 active
                </span>
              </p>
            </div>

            {/* Avg Attendance Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Avg Attendance</p>
              <p className="text-2xl font-bold">92%</p>
            </div>

            {/* Avg Performance Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Avg Performance</p>
              <p className="text-2xl font-bold">88%</p>
            </div>

            {/* Next Match Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Next Match</p>
              <p className="text-xl font-bold text-gray-800">Team Eagles</p>
              <p className="text-gray-400 text-sm">Feb 20, 2024 • 2:00 PM</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Team Roster Section */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Team Roster</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow">
                  Add Player
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Player Card - John Smith */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800">John Smith</p>
                    <span className="bg-green-200 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-lg">23</span> Forward
                  </p>
                  <div className="flex justify-between my-2 text-sm">
                    <div>
                      <p className="text-gray-500">Attendance</p>
                      <p className="font-bold">95%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Performance</p>
                      <p className="font-bold">88%</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    Recent Performance
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                  </div>
                </div>

                {/* Player Card - Mike Johnson */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800">Mike Johnson</p>
                    <span className="bg-green-200 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-lg">11</span> Guard
                  </p>
                  <div className="flex justify-between my-2 text-sm">
                    <div>
                      <p className="text-gray-500">Attendance</p>
                      <p className="font-bold">92%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Performance</p>
                      <p className="font-bold">85%</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    Recent Performance
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                  </div>
                </div>

                {/* Player Card - Chris Davis (Injured) */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800">Chris Davis</p>
                    <span className="bg-red-200 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                      Injured
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-lg">15</span> Center
                  </p>
                  <div className="flex justify-between my-2 text-sm">
                    <div>
                      <p className="text-gray-500">Attendance</p>
                      <p className="font-bold">88%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Performance</p>
                      <p className="font-bold">82%</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    Recent Performance
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-red-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-red-400 rounded-sm"></div>
                  </div>
                </div>

                {/* Player Card - James Wilson */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800">James Wilson</p>
                    <span className="bg-green-200 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-lg">07</span> Guard
                  </p>
                  <div className="flex justify-between my-2 text-sm">
                    <div>
                      <p className="text-gray-500">Attendance</p>
                      <p className="font-bold">94%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Performance</p>
                      <p className="font-bold">87%</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    Recent Performance
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                  </div>
                </div>

                {/* Player Card - Robert Lee */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800">Robert Lee</p>
                    <span className="bg-green-200 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-lg">32</span> Forward
                  </p>
                  <div className="flex justify-between my-2 text-sm">
                    <div>
                      <p className="text-gray-500">Attendance</p>
                      <p className="font-bold">91%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Performance</p>
                      <p className="font-bold">86%</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    Recent Performance
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                  </div>
                </div>

                {/* Player Card - David Brown */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800">David Brown</p>
                    <span className="bg-green-200 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-lg">21</span> Center
                  </p>
                  <div className="flex justify-between my-2 text-sm">
                    <div>
                      <p className="text-gray-500">Attendance</p>
                      <p className="font-bold">93%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Performance</p>
                      <p className="font-bold">89%</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    Recent Performance
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-yellow-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-1/5 h-2 bg-green-400 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Results Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Results</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ul className="space-y-4">
                  {/* Result 1 */}
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        vs Team Hawks
                      </p>
                      <p className="text-gray-400 text-sm">Feb 15</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-gray-800">91-85</p>
                      <span className="bg-green-200 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        W
                      </span>
                    </div>
                  </li>
                  {/* Result 2 */}
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        vs Team Lions
                      </p>
                      <p className="text-gray-400 text-sm">Feb 12</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-gray-800">88-82</p>
                      <span className="bg-green-200 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        W
                      </span>
                    </div>
                  </li>
                  {/* Result 3 */}
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        vs Team Tigers
                      </p>
                      <p className="text-gray-400 text-sm">Feb 8</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-gray-800">78-80</p>
                      <span className="bg-red-200 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                        L
                      </span>
                    </div>
                  </li>
                </ul>
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

export default AdminTeam;