import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminAttendance() {
  const attendanceData = [
    {
      number: "23",
      name: "John Smith",
      team: "Basketball",
      position: "Forward",
      status: "Present",
      time: "8:55 AM",
      rate: 95,
      streak: "12 days",
    },
    {
      number: "07",
      name: "Sarah Johnson",
      team: "Volleyball",
      position: "Setter",
      status: "Late",
      time: "9:15 AM",
      rate: 92,
      streak: "8 days",
    },
    {
      number: "11",
      name: "Mike Williams",
      team: "Basketball",
      position: "Guard",
      status: "Present",
      time: "8:45 AM",
      rate: 94,
      streak: "15 days",
    },
    {
      number: "04",
      name: "Emma Brown",
      team: "Volleyball",
      position: "Outside Hitter",
      status: "Absent",
      time: "-",
      rate: 90,
      streak: "0 days",
    },
  ];

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
              <h2 className="text-2xl font-semibold text-green-700">Attendance</h2>
              <p className="text-gray-500">Daily Attendance Tracking</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 text-gray-700">
                Today
              </button>
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 text-gray-700">
                All Teams
              </button>
            </div>
          </div>

          {/* Attendance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Athletes Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Total Athletes</p>
              <p className="text-2xl font-bold">24</p>
            </div>

            {/* Present Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Present</p>
              <p className="text-2xl font-bold text-green-600">
                85%{" "}
                <span className="text-sm font-normal text-gray-500">20 athletes</span>
              </p>
            </div>

            {/* Late Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Late</p>
              <p className="text-2xl font-bold text-yellow-600">
                5%{" "}
                <span className="text-sm font-normal text-gray-500">1 athletes</span>
              </p>
            </div>

            {/* Absent Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Absent</p>
              <p className="text-2xl font-bold text-red-600">
                10%{" "}
                <span className="text-sm font-normal text-gray-500">2 athletes</span>
              </p>
            </div>
          </div>

          {/* Attendance Records Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Attendance Records</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search athletes..."
                  className="px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
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
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Athlete
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Streak
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceData.map((athlete, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <p className="text-xs font-bold mr-2 text-gray-500">{athlete.number}</p>
                          <p className="text-sm font-semibold text-gray-900">{athlete.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {athlete.team}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {athlete.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            athlete.status === "Present"
                              ? "bg-green-100 text-green-800"
                              : athlete.status === "Late"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {athlete.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {athlete.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${athlete.rate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold">{athlete.rate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        <div className="flex items-center">
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
                          {athlete.streak}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
}

export default AdminAttendance;