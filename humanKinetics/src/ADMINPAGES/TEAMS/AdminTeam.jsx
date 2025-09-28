import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminTeam() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Right section: Navbar + Content */}
      <div className="flex flex-col flex-grow">
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full mt-16 md:mt-20">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Basketball Team
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Team Management
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full self-start sm:self-auto">
              <button className="px-3 sm:px-4 py-1 sm:py-2 bg-white text-green-700 font-semibold rounded-full shadow text-sm sm:text-base">
                Basketball Team
              </button>
              <button className="px-3 sm:px-4 py-1 sm:py-2 text-gray-600 font-medium rounded-full text-sm sm:text-base">
                Volleyball Team
              </button>
            </div>
          </div>

          {/* Performance Overview Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center sm:text-left">
              <p className="text-gray-500 text-sm">Total Players</p>
              <p className="text-2xl font-bold">
                12
                <span className="text-sm font-normal text-gray-500 ml-1">
                  11 active
                </span>
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center sm:text-left">
              <p className="text-gray-500 text-sm">Avg Attendance</p>
              <p className="text-2xl font-bold">92%</p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center sm:text-left">
              <p className="text-gray-500 text-sm">Avg Performance</p>
              <p className="text-2xl font-bold">88%</p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center sm:text-left">
              <p className="text-gray-500 text-sm">Next Match</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800">
                Team Eagles
              </p>
              <p className="text-gray-400 text-sm">Feb 20, 2024 • 2:00 PM</p>
            </div>
          </div>

          {/* Team Roster + Recent Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Team Roster Section */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                <h3 className="text-lg sm:text-xl font-semibold">
                  Team Roster
                </h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow text-sm sm:text-base">
                  Add Player
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[
                  {
                    name: "John Smith",
                    status: "Active",
                    num: "23",
                    role: "Forward",
                    att: "95%",
                    perf: "88%",
                  },
                  {
                    name: "Mike Johnson",
                    status: "Active",
                    num: "11",
                    role: "Guard",
                    att: "92%",
                    perf: "85%",
                  },
                  {
                    name: "Chris Davis",
                    status: "Injured",
                    num: "15",
                    role: "Center",
                    att: "88%",
                    perf: "82%",
                    injured: true,
                  },
                  {
                    name: "James Wilson",
                    status: "Active",
                    num: "07",
                    role: "Guard",
                    att: "94%",
                    perf: "87%",
                  },
                  {
                    name: "Robert Lee",
                    status: "Active",
                    num: "32",
                    role: "Forward",
                    att: "91%",
                    perf: "86%",
                  },
                  {
                    name: "David Brown",
                    status: "Active",
                    num: "21",
                    role: "Center",
                    att: "93%",
                    perf: "89%",
                  },
                ].map((player, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-gray-800">
                        {player.name}
                      </p>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          player.injured
                            ? "bg-red-200 text-red-700"
                            : "bg-green-200 text-green-700"
                        }`}
                      >
                        {player.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      <span className="font-bold text-lg">{player.num}</span>{" "}
                      {player.role}
                    </p>
                    <div className="flex justify-between my-2 text-sm">
                      <div>
                        <p className="text-gray-500">Attendance</p>
                        <p className="font-bold">{player.att}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Performance</p>
                        <p className="font-bold">{player.perf}</p>
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
                ))}
              </div>
            </div>

            {/* Recent Results Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Recent Results
              </h3>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <ul className="space-y-4">
                  {[
                    {
                      team: "Team Hawks",
                      date: "Feb 15",
                      score: "91-85",
                      win: true,
                    },
                    {
                      team: "Team Lions",
                      date: "Feb 12",
                      score: "88-82",
                      win: true,
                    },
                    {
                      team: "Team Tigers",
                      date: "Feb 8",
                      score: "78-80",
                      win: false,
                    },
                  ].map((res, i) => (
                    <li key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">
                          vs {res.team}
                        </p>
                        <p className="text-gray-400 text-sm">{res.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="font-bold text-gray-800">{res.score}</p>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            res.win
                              ? "bg-green-200 text-green-700"
                              : "bg-red-200 text-red-700"
                          }`}
                        >
                          {res.win ? "W" : "L"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
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

export default AdminTeam;
