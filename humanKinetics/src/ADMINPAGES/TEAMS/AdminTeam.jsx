import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import BuildTeamModal from "./buildTeamModal";
import TeamDetailsModal from "./TeamDetailsModal";

function AdminTeam() {
  const { id } = useParams(); // ✅ Admin/User ID from route
  const [teams, setTeams] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [playersByTeam, setPlayersByTeam] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const API = import.meta.env.VITE_BBACKEND_URL;

  const handleViewDetails = (team) => {
    console.log("🟢 Selected Team ID:", team.id);
    setSelectedTeam(team);
    setDetailsOpen(true);
  };

  // ✅ Handle closing
  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedTeam(null);
  };

  // ✅ When “Add Player” clicked

  // ✅ Fetch all teams for this admin/user
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(
          `${API}/teams/getTeams/${id}`
        );
        console.log(" Teams fetched:", res.data);

        const resAdmin = await axios.get(
          `${API}/adminAccounts/coaches-profile/${id}`
        );
        console.log(" Teams fetched:", resAdmin.data);

        setAdmin(resAdmin.data);
        setTeams(res.data);

        // After teams are fetched, fetch players for each team
        res.data.forEach((team) => fetchPlayersForTeam(team.id));
      } catch (err) {
        console.error(" Error fetching teams:", err);
      }
    };
    fetchTeams();
  }, [id]);

  // ✅ Fetch players for a specific team
  const fetchPlayersForTeam = async (teamId) => {
    try {
      const res = await axios.get(
        `${API}/teams/player/${teamId}`
      );
      console.log(` Players for team ${teamId}:`, res.data);

      setPlayersByTeam((prev) => ({
        ...prev,
        [teamId]: res.data,
      }));
    } catch (err) {
      console.error(` Error fetching players for team ${teamId}:`, err);
    }
  };

  // ✅ When new team is created, update state
  const handleTeamCreated = (newTeam) => {
    console.log(" New Team Created:", newTeam);
    setTeams((prev) => [...prev, newTeam]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow p-6 max-w-7xl mx-auto w-full mt-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Team Management
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Manage your teams and players
              </p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="px-4 py-2 bg-green-700 text-white rounded-full shadow-md hover:bg-green-800 transition font-medium"
            >
              + Build New Team
            </button>
          </div>

          {/* Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
            <OverviewCard label="Total Teams" value={teams.length} />
            <OverviewCard
              label="Total Players"
              value={Object.values(playersByTeam).flat().length}
            />

    
          </div>

          {/* Teams Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                My Teams
              </h3>
            </div>

            {teams.length === 0 ? (
              <p className="text-gray-500 italic">
                No teams have been created yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => {
                  const players = playersByTeam[team.id] || [];
                  return (
                    <div
                      key={team.id}
                      className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
                    >
                      <h4 className="text-lg font-bold text-green-700 mb-2">
                        {team.teamName.toUpperCase()}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-semibold">Sport:</span>{" "}
                        {team.sport.toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-semibold">Coach:</span>{" "}
                        {team.coach.toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        {team.description.toUpperCase() || "No description provided."}
                      </p>

                      {/* ✅ Player List */}
                      <div className="border-t pt-3 mt-3">
                        <p className="font-semibold text-gray-700 mb-2">
                          Players ({players.length})
                        </p>
                        {players.length === 0 ? (
                          <p className="text-gray-400 text-sm italic">
                            No players assigned.
                          </p>
                        ) : (
                          <ul className="space-y-1 text-sm">
                            {players.map((p) => (
                              <li
                                key={p.id}
                                className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                              >
                                <span className="font-medium text-gray-800">
                                  {p.firstName} {p.lastName}
                                </span>
                                <span className="text-xs text-green-700 font-semibold">
                                  #{p.jerseyNo || "N/A"}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <button
                        onClick={() => handleViewDetails(team)} // ✅ open modal
                        className="w-full py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        View Team Details
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <TeamDetailsModal
            open={detailsOpen}
            onClose={handleCloseDetails}
            team={selectedTeam}
            players={selectedTeam ? playersByTeam[selectedTeam.id] || [] : []}
          />
        </main>

        <Footer />
      </div>

      {/* Build Team Modal */}
      <BuildTeamModal
        open={openModal}
        data={admin}
        onClose={() => setOpenModal(false)}
        onTeamCreated={handleTeamCreated}
      />
    </div>
  );
}

/* ✅ Reusable Card for Overview Stats */
function OverviewCard({ label, value }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md text-center">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-bold text-green-700">{value}</p>
    </div>
  );
}

export default AdminTeam;
