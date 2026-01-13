import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import AddPlayerModal from "./AddPlayerModal";
import PlayersUpdate from "./update";

// Configuration for sport-specific progress bars
const SPORT_TRAINING_FIELDS = {
  "basketball-men": [
    { key: "basketballSpeed", label: "Speed" },
    { key: "basketballVerticalJump", label: "Vertical Jump" },
    { key: "basketballAgility", label: "Agility" },
    { key: "basketballEndurance", label: "Endurance" },
    { key: "basketballShootingAccuracy", label: "Shooting Accuracy" },
  ],
  "basketball-women": [
    { key: "basketballSpeed", label: "Speed" },
    { key: "basketballVerticalJump", label: "Vertical Jump" },
    { key: "basketballAgility", label: "Agility" },
    { key: "basketballEndurance", label: "Endurance" },
    { key: "basketballShootingAccuracy", label: "Shooting Accuracy" },
  ],
  "volleyball-men": [
    { key: "volleyballVerticalJump", label: "Vertical Jump" },
    { key: "volleyballReactionTime", label: "Reaction Time" },
    { key: "volleyballUpperBodyPower", label: "Upper Body Power" },
    { key: "volleyballAgility", label: "Agility" },
    { key: "volleyballServeAccuracy", label: "Serve Accuracy" },
  ],
  "volleyball-women": [
    { key: "volleyballVerticalJump", label: "Vertical Jump" },
    { key: "volleyballReactionTime", label: "Reaction Time" },
    { key: "volleyballUpperBodyPower", label: "Upper Body Power" },
    { key: "volleyballAgility", label: "Agility" },
    { key: "volleyballServeAccuracy", label: "Serve Accuracy" },
  ],
  cheerdance: [
    { key: "cheerdanceFlexibility", label: "Flexibility" },
    { key: "cheerdanceBalance", label: "Balance" },
    { key: "cheerdanceMuscularEndurance", label: "Muscular Endurance" },
    { key: "cheerdanceCoordination", label: "Coordination" },
    { key: "cheerdanceExplosivePower", label: "Explosive Power" },
  ],
  futsal: [
    { key: "futsalSpeed", label: "Speed" },
    { key: "futsalAgility", label: "Agility" },
    { key: "futsalAerobicEndurance", label: "Aerobic Endurance" },
    { key: "futsalBallControl", label: "Ball Control" },
    { key: "futsalShootingAccuracy", label: "Shooting Accuracy" },
  ],
  "sepak-takraw": [
    { key: "takrawLegPower", label: "Leg Power" },
    { key: "takrawFlexibility", label: "Flexibility" },
    { key: "takrawBalance", label: "Balance" },
    { key: "takrawReactionTime", label: "Reaction Time" },
    { key: "takrawCoordination", label: "Coordination" },
  ],
  badminton: [
    { key: "badmintonAgility", label: "Agility" },
    { key: "badmintonSpeed", label: "Speed" },
    { key: "badmintonEndurance", label: "Endurance" },
    { key: "badmintonSmashPower", label: "Smash Power" },
    { key: "badmintonAccuracy", label: "Accuracy" },
  ],
};

function AdminTeam() {
  const { id } = useParams(); 
  const API = import.meta.env.VITE_BBACKEND_URL;

  const [players, setPlayers] = useState([]);
  const [coachSport, setCoachSport] = useState(""); // Track coach's sport for sorting
  const [addPlayerOpen, setAddPlayerOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // 1. Fetch Coach Profile to get their designated sport
  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const res = await axios.get(`${API}/adminAccounts/coaches-profile/${id}`);
        // Assuming the field is 'sports' based on your previous TournamentModal code
        setCoachSport(res.data.sports || ""); 
      } catch (err) {
        console.error("Error fetching coach profile:", err);
      }
    };
    if (id) fetchCoachData();
  }, [id, API]);

  // 2. Fetch and Sort Players
  const fetchPlayers = async () => {
    try {
      const res = await axios.get(`${API}/teams/player/${id}`);
      let rawPlayers = res.data;

      // Sorting Logic: 
      // If player's sport matches coach's sport, they move to the top.
      // Secondary sort by First Name.
      const sorted = rawPlayers.sort((a, b) => {
        const aMatches = a.sport === coachSport;
        const bMatches = b.sport === coachSport;

        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        
        // If both match or both don't match, sort alphabetically
        return a.firstName.localeCompare(b.firstName);
      });

      setPlayers([...sorted]);
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  };

  // Re-run fetch when coachSport is identified to ensure correct sorting
  useEffect(() => {
    if (id) fetchPlayers();
  }, [id, coachSport]);

  const handleKick = async (player) => {
    const confirmKick = confirm(`Remove ${player.firstName} ${player.lastName} from the team?`);
    if (!confirmKick) return;
    try {
      const res = await axios.put(`${API}/userAccounts/player-kick/${player.id}`);
      if (res.status === 200) {
        alert("Player removed.");
        fetchPlayers();
      }
    } catch (err) {
      alert("Kick failed.");
    }
  };

  const calculateAge = (bDay) => {
    if (!bDay) return "—";
    const birthDate = new Date(bDay);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow p-6 max-w-7xl mx-auto w-full mt-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-3xl font-bold text-green-700 tracking-tight">Team Management</h2>
              <p className="text-gray-500 italic">
                Displaying roster for <span className="text-green-600 font-bold uppercase">{coachSport || "All Sports"}</span>
              </p>
            </div>

            <button
              onClick={() => setAddPlayerOpen(true)}
              className="px-6 py-2.5 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition-all font-bold flex items-center gap-2"
            >
              <span className="text-xl">+</span> Add Player
            </button>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.length > 0 ? (
              players.map((p) => {
                const isPrimarySport = p.sport === coachSport;
                const stats = SPORT_TRAINING_FIELDS[p.sport] || [];
                
                return (
                  <div 
                    key={p.id} 
                    className={`bg-white border rounded-3xl shadow-sm hover:shadow-xl transition-all p-6 flex flex-col items-center relative overflow-hidden ${
                      isPrimarySport ? 'border-green-400 ring-2 ring-green-100' : 'border-gray-200'
                    }`}
                  >
                    

                    {/* Player Image */}
                    <div className="relative mb-4">
                      <img
                        src={`${API}/userAccounts/player-photo/${p.id}`}
                        alt={p.firstName}
                        className={`w-24 h-24 rounded-full object-cover border-4 shadow-md ${
                            isPrimarySport ? 'border-green-500' : 'border-gray-300'
                        }`}
                        onError={(e) => (e.currentTarget.src = "/lexi.jpg")}
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
                        #{p.jerseyNo || "00"}
                      </div>
                    </div>

                    <h4 className="text-xl font-black text-gray-800 uppercase tracking-tight">
                      {p.firstName} {p.lastName}
                    </h4>
                    <div className="flex flex-col items-center mb-4">
                        <p className="text-sm font-bold text-green-600">{p.position || "Player"}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">{p.sport}</p>
                    </div>

                    {/* Performance Attributes */}
                    <div className="w-full space-y-3 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      {stats.length > 0 ? (
                        stats.map((stat) => (
                          <div key={stat.key}>
                            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-1">
                              <span>{stat.label}</span>
                              <span className="text-green-700">{p[stat.key] || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="h-1.5 rounded-full bg-green-600 transition-all duration-700"
                                style={{ width: `${p[stat.key] || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-[10px] text-gray-400 italic text-center py-2">No specific attributes set</p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 w-full mt-auto">
                      <button
                        onClick={() => { setSelectedPlayer(p); setShowUpdateModal(true); }}
                        className="flex-1 py-2 bg-green-100 text-green-700 rounded-xl font-bold text-sm hover:bg-green-700 hover:text-white transition-colors border border-green-200"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleKick(p)}
                        className="flex-1 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-colors border border-red-100"
                      >
                        Kick
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium italic text-lg">No players registered to this team yet.</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>

      {/* Modals */}
      {addPlayerOpen && (
        <AddPlayerModal
          onClose={() => setAddPlayerOpen(false)}
          onUpdatePlayer={fetchPlayers}
          teamId={id}
        />
      )}

      {showUpdateModal && selectedPlayer && (
        <PlayersUpdate
          player={selectedPlayer}
          onClose={() => { setShowUpdateModal(false); setSelectedPlayer(null); }}
          onUpdate={fetchPlayers}
        />
      )}
    </div>
  );
}

export default AdminTeam;