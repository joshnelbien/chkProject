import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminOverView() {
  const [totalAthletes, setTotalAthletes] = useState(0);
  const [upcomingSessions, setUpcomingSessions] = useState(0);
  const [ongoingSessions, setOngoingSessions] = useState(0); // ✅ added
  const [endedSessions, setEndedSessions] = useState(0);     // ✅ added
  const [recentActivities, setRecentActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch total athletes
    axios.get("http://localhost:5000/userAccounts/player/count")
      .then((res) => setTotalAthletes(res.data.totalPlayers))
      .catch((err) => console.error(err));

    // Fetch tournament counts
    axios.get("http://localhost:5000/tournament/tournaments/counts")
      .then((res) => {
        setUpcomingSessions(res.data.upcoming);
        setOngoingSessions(res.data.ongoing);
        setEndedSessions(res.data.ended);
      })
      .catch((err) => console.error(err));

    // Fetch recent activities (latest 5 or so)
    axios.get("http://localhost:5000/attendance/attendance/recent")
      .then((res) => setRecentActivities(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Function to open modal and fetch all activities
  const handleViewAll = async () => {
    try {
      const res = await axios.get("http://localhost:5000/attendance/attendance/recent"); // fetch all records
      setAllActivities(res.data);
      setModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch all activities", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />

        <main className="flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full mt-16 md:mt-20">
          {/* Overview Cards */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center sm:text-left">
                <p className="text-gray-500 text-sm">Total Athletes</p>
                <p className="text-2xl font-bold">{totalAthletes}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center sm:text-left">
                <p className="text-gray-500 text-sm">Upcoming Tournament</p>
                <p className="text-2xl font-bold">{upcomingSessions}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center sm:text-left">
                <p className="text-gray-500 text-sm">On Going Tournament</p>
                <p className="text-2xl font-bold">{ongoingSessions}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center sm:text-left">
                <p className="text-gray-500 text-sm">Ended Tournament</p>
                <p className="text-2xl font-bold">{endedSessions}</p>
              </div>
            </div>
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Recent Activities</h3>
                <button
                  onClick={handleViewAll}
                  className="text-green-600 font-medium text-sm"
                >
                  View All
                </button>
              </div>
              <ul className="space-y-4 max-h-64 overflow-y-auto">
                {recentActivities.map((act, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {act.firstName} {act.lastName}
                        <span className="text-gray-600 font-normal ml-1">
                          Attended {act.type}
                        </span>
                      </p>
                      <p className="text-gray-400 text-sm">
                        {act.date} | {act.timeIn} - {act.timeOut}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            
          </div>
        </main>

        <Footer />
      </div>

      {/* Modal for All Activities */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-4xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">All Activities</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-red-500 font-bold text-lg"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-4">
              {allActivities.map((act, idx) => (
                <li key={idx} className="border-b pb-2">
                  <p className="font-semibold text-gray-800">
                    {act.firstName} {act.lastName}
                    <span className="text-gray-600 font-normal ml-1">
                      Attended {act.type}
                    </span>
                  </p>
                  <p className="text-gray-400 text-sm">
                    {act.date} | {act.timeIn} - {act.timeOut} | {act.sport}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOverView;
