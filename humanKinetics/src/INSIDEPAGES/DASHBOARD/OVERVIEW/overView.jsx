import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { BarChart2 } from "lucide-react";
import { useParams } from "react-router-dom";

function OverView() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
const [upcomingTournaments, setUpcomingTournaments] = useState([]);

useEffect(() => {
  if (!id) return;

  const fetchData = async () => {
    try {
      // User profile
      const userRes = await axios.get(`http://localhost:5000/userAccounts/players-profile/${id}`);
      setUserData(userRes.data);

      // Recent activities
      const attendanceRes = await axios.get("http://localhost:5000/attendance/all");
      const userAttendance = attendanceRes.data
        .filter(att => att.email === userRes.data.email)
        .map(att => ({
          ...att,
          title: `${att.type} Session`,
          status: att.status || "attended",
          statusColor: "green",
          icon: <BarChart2 size={16} />,
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecentActivities(userAttendance);

      // Fetch upcoming tournaments (details)
      const tourRes = await axios.get("http://localhost:5000/tournament/tournaments/upcoming");
      setUpcomingTournaments(tourRes.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
      setLoading(false);
    }
  };

  fetchData();
}, [id]);

  if (loading) return <p className="text-center mt-10">Loading data...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto mt-16 p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <section className="bg-white p-4 md:p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Recent Activities</h2>
              </div>
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {recentActivities.length === 0 ? (
                  <p className="text-gray-500">No recent training activities.</p>
                ) : (
                  recentActivities.map((activity, idx) => (
                    <li key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 flex-shrink-0 bg-${activity.statusColor}-100 text-${activity.statusColor}-700 rounded-full flex items-center justify-center`}>
                          {activity.icon}
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium text-sm md:text-base">{activity.title}</p>
                          <p className="text-xs md:text-sm text-gray-500">{activity.date} {activity.timeIn || ""}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-${activity.statusColor}-100 text-${activity.statusColor}-700`}>
                        {activity.status}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </section>

          <section className="bg-white p-4 md:p-6 rounded-lg shadow">
  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Upcoming Tournaments</h2>
  {upcomingTournaments.length === 0 ? (
    <p className="text-gray-500">No upcoming tournaments.</p>
  ) : (
    <ul className="space-y-3 max-h-64 overflow-y-auto">
      {upcomingTournaments.map((tourney, idx) => (
        <li key={idx} className="p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
          <p className="text-gray-800 font-medium">{tourney.name}</p>
          <p className="text-gray-500 text-sm">
            {tourney.startDate} - {tourney.endDate} | {tourney.location || "Location TBD"}
          </p>
        </li>
      ))}
    </ul>
  )}
</section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default OverView;
