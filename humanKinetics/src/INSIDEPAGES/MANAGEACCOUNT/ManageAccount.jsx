import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/sidebar";
import EditAccountModal from "./EditAccountModal";

function ManageAccount() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const fetchPlayer = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/userAccounts/players-profile/${id}`
      );
      setPlayer(res.data);
    } catch (error) {
      console.error("Error fetching player:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPlayer();
  }, [id]);

  const handleSave = async () => {
    await fetchPlayer(); // refresh the updated info
    setEditOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Container */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto mt-16 p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-green-900">PLSP MYNAS</h1>
              <h2 className="text-4xl font-bold text-gray-800">
                Manage My Account
              </h2>
              <p className="text-gray-600">
                You can view or edit your account information here.
              </p>
            </div>
          </div>

          {/* Main Content */}
          {loading ? (
            <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
              Loading player information...
            </div>
          ) : player ? (
            <div className="bg-white p-8 rounded-2xl shadow-md">
              {/* Profile Section */}
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-8">
                <div className="flex justify-center md:justify-start mb-4 md:mb-0">
                  <img
                    src={`http://localhost:5000/userAccounts/player-photo/${player.id}`}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-green-600 shadow-md"
                    onError={(e) => (e.target.src = "/lexi.jpg")}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-800">
                    {player.firstName} {player.lastName}
                  </h2>
                  <p className="text-gray-600">
                    {player.course} • Year {player.yearLevel}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {player.sport ? player.sport.toUpperCase() : "NO SPORT"}
                  </p>
                  <span
                    className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      player.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {player.isVerified ? "Verified" : "Pending Verification"}
                  </span>
                </div>
              </div>

              <hr className="border-gray-300 my-6" />

              {/* Account Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Detail label="Student Number" value={player.studentNumber} />
                <Detail label="Email" value={player.email} />
                <Detail label="Course" value={player.course} />
                <Detail label="Year Level" value={player.yearLevel} />
                <Detail label="Sport" value={player.sport || "None"} />
                <Detail label="Status" value={player.status} />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setEditOpen(true)}
                  className="bg-green-700 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg transition"
                >
                  Edit Account
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center text-red-500">
              Player not found.
            </div>
          )}
        </main>

        {/* ✅ Edit Modal */}
        <EditAccountModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          player={player}
          onSave={handleSave}
        />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

/* 🔹 Reusable Detail Field Component */
function Detail({ label, value, isMonospace = false }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p
        className={`text-gray-800 font-semibold ${
          isMonospace ? "font-mono text-xs break-all" : ""
        }`}
      >
        {value || "N/A"}
      </p>
    </div>
  );
}

export default ManageAccount;
