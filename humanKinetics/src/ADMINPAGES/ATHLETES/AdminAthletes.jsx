import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

// Use the same configuration for the progress bars
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

function AdminAthletes() {
  const { id } = useParams(); // Coach ID
  const [players, setPlayers] = useState([]);
  const [coachSport, setCoachSport] = useState("");
  const API = import.meta.env.VITE_BBACKEND_URL;

  // 1. Fetch Coach to get their sport
  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const res = await axios.get(`${API}/adminAccounts/coaches-profile/${id}`);
        setCoachSport(res.data.sports);
      } catch (err) {
        console.error("Error fetching coach:", err);
      }
    };
    if (id) fetchCoach();
  }, [id, API]);

  // 2. Fetch All Players
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get(`${API}/userAccounts/players`);
        setPlayers(res.data);
      } catch (error) {
        console.error("❌ Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, [API]);

  // 3. Filter only players that match the coach's sport
  const filteredPlayers = players.filter(p => p.sport === coachSport);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow overflow-y-auto p-6 max-w-7xl mx-auto w-full mt-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green-700 tracking-tight">Athletes</h2>
            <p className="text-gray-500 italic">Showing athletes for <span className="font-bold text-green-600 uppercase">{coachSport}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <AthleteCard key={player.id} player={player} API={API} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed">
                <p className="text-gray-400 font-medium italic">No athletes found for this sport.</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function AthleteCard({ player, API }) {
  // Get the specific labels and keys for the player's sport
  const statsConfig = SPORT_TRAINING_FIELDS[player.sport] || [];

  // Logic for status badge colors
  const statusStyles = player.status === "In Team"
    ? "bg-green-100 text-green-700 border-green-200"
    : "bg-yellow-100 text-yellow-700 border-yellow-200";

  return (
    /* Added 'relative' here to allow absolute positioning of the badge */
    <div className="relative bg-white p-6 rounded-3xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">

      {/* --- Status Badge in Top Right --- */}
      <div className={`absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${statusStyles}`}>
        {player.status || "Unknown"}
      </div>

      <div className="flex items-center mb-6">
        <img
          src={`${API}/userAccounts/player-photo/${player.id}`}
          alt={player.firstName}
          className="w-20 h-20 rounded-full object-cover border-4 border-green-500 shadow-sm"
          onError={(e) => (e.currentTarget.src = "/lexi.jpg")}
        />
        <div className="ml-5">
          <h3 className="text-xl font-black text-gray-800 uppercase leading-none">
            {player.firstName} {player.lastName}
          </h3>
          <p className="text-green-600 font-bold text-sm mt-1">{player.course || "N/A"}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              #{player.studentNumber}
            </span>
            <span className="text-gray-400 text-[10px] font-bold uppercase">{player.sport}</span>
          </div>
        </div>
      </div>

      {/* Performance Metrics Section */}
      <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Performance Attributes</p>

        {statsConfig.length > 0 ? (
          statsConfig.map((stat) => (
            <div key={stat.key}>
              <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-1">
                <span>{stat.label}</span>
                <span className="text-green-700">{player[stat.key] || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-green-600 transition-all duration-700"
                  style={{ width: `${player[stat.key] || 0}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[10px] text-gray-400 italic">No metrics defined for this sport.</p>
        )}
      </div>
    </div>
  );
}

export default AdminAthletes;