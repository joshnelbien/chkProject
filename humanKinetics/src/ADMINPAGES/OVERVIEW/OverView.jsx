import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminOverView() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          {/* Performance Overview Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Athletes Card */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-500 text-sm">Total Athletes</p>
                <p className="text-2xl font-bold">24</p>
              </div>

              {/* Avg Attendance Card */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-500 text-sm">Avg Attendance</p>
                <p className="text-2xl font-bold">90%</p>
              </div>

              {/* Avg Performance Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-500">
                <p className="text-gray-500 text-sm">Avg Performance</p>
                <p className="text-2xl font-bold">88%</p>
              </div>

              {/* Upcoming Sessions Card */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-500 text-sm">Upcoming Sessions</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Recent Activities</h3>
                <a href="#" className="text-green-600 font-medium text-sm">
                  View All
                </a>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      John Smith
                      <span className="text-gray-600 font-normal ml-1">
                        attended Basketball practice
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm">2 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Maria Garcia
                      <span className="text-gray-600 font-normal ml-1">
                        achieved new personal best
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm">4 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Team Meeting
                      <span className="text-gray-600 font-normal ml-1">
                        scheduled for tomorrow
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm">5 hours ago</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Team Performance Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Team Performance</h3>
              <div className="flex justify-center items-center h-48 text-gray-400 text-center border border-dashed rounded-md">
                Performance Chart Here
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

export default AdminOverView;