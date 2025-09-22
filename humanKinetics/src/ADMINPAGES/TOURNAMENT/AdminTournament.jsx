import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminTournament() {
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
                Tournaments
              </h2>
              <p className="text-gray-500">Tournament Management</p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow">
              Add Tournament
            </button>
          </div>

          {/* Tournament Status Filter */}
          <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full w-fit mb-6">
            <button className="px-4 py-2 bg-white text-green-700 font-semibold rounded-full shadow">
              Upcoming
            </button>
            <button className="px-4 py-2 text-gray-600 font-medium rounded-full">
              Completed
            </button>
            <button className="px-4 py-2 text-gray-600 font-medium rounded-full">
              All
            </button>
          </div>

          {/* Tournament Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regional Basketball Championship Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Regional Basketball Championship
                </h3>
                <span className="bg-blue-200 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                  Upcoming
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4">Basketball</p>
              <div className="flex items-center space-x-6 text-gray-500 text-sm mb-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h8m-8 4h8m-9-6h8"
                    />
                  </svg>
                  Feb 25-28, 2024
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Main Stadium
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h-5m2-2m-2 2v2m-7.232-9.232A24.965 24.965 0 017 10.5a24.965 24.965 0 01-2.768-4.768M10 11a7 7 0 100-14 7 7 0 000 14z"
                    />
                  </svg>
                  12 teams
                </div>
              </div>

              {/* Tournament Schedule */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">
                  Tournament Schedule
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <p>
                      Group Stage <span className="text-gray-400">Feb 25-28</span>
                    </p>
                    <span className="text-blue-600 font-medium">24 matches</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>
                      Quarter Finals <span className="text-gray-400">Feb 27</span>
                    </p>
                    <span className="text-blue-600 font-medium">4 matches</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>
                      Semi Finals <span className="text-gray-400">Feb 27</span>
                    </p>
                    <span className="text-blue-600 font-medium">2 matches</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>
                      Finals <span className="text-gray-400">Feb 28</span>
                    </p>
                    <span className="text-blue-600 font-medium">1 matches</span>
                  </li>
                </ul>
              </div>

              {/* Upcoming Matches */}
              <div>
                <p className="font-semibold text-gray-800 mb-2">Upcoming Matches</p>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">
                      PLSP Stallions vs Eagles{" "}
                      <span className="text-gray-500 text-xs font-normal">
                        Group A
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs">Feb 25, 2:00 PM · Main Court</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">
                      PLSP Stallions vs Hawks{" "}
                      <span className="text-gray-500 text-xs font-normal">
                        Group A
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs">Feb 26, 4:00 PM · Main Court</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">
                      PLSP Stallions vs Lions{" "}
                      <span className="text-gray-500 text-xs font-normal">
                        Quarter Finals
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs">Feb 27, 10:00 AM · Main Court</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inter-University Volleyball League Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Inter-University Volleyball League
                </h3>
                <span className="bg-blue-200 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                  Upcoming
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4">Volleyball</p>
              <div className="flex items-center space-x-6 text-gray-500 text-sm mb-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h8m-8 4h8m-9-6h8"
                    />
                  </svg>
                  Mar 10-15, 2024
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Sports Complex
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h-5m2-2m-2 2v2m-7.232-9.232A24.965 24.965 0 017 10.5a24.965 24.965 0 01-2.768-4.768M10 11a7 7 0 100-14 7 7 0 000 14z"
                    />
                  </svg>
                  8 teams
                </div>
              </div>

              {/* Tournament Schedule */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">
                  Tournament Schedule
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <p>
                      Preliminaries <span className="text-gray-400">Mar 10-12</span>
                    </p>
                    <span className="text-blue-600 font-medium">16 matches</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>
                      Semi Finals <span className="text-gray-400">Mar 13-14</span>
                    </p>
                    <span className="text-blue-600 font-medium">4 matches</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>
                      Finals <span className="text-gray-400">Mar 15</span>
                    </p>
                    <span className="text-blue-600 font-medium">2 matches</span>
                  </li>
                </ul>
              </div>

              {/* Upcoming Matches */}
              <div>
                <p className="font-semibold text-gray-800 mb-2">Upcoming Matches</p>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">
                      PLSP Spikers vs Thunder{" "}
                      <span className="text-gray-500 text-xs font-normal">
                        Preliminaries
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs">Mar 10, 1:00 PM · Court 1</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">
                      PLSP Spikers vs Lightning{" "}
                      <span className="text-gray-500 text-xs font-normal">
                        Preliminaries
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs">Mar 11, 3:00 PM · Court 2</p>
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

export default AdminTournament;