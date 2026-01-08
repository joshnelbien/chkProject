import { useState } from "react";
import AddPlayerModal from "./AddPlayerModal";
import PlayersUpdate from "./update";

// 1. Move or Import the configuration so both components see the same labels
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
  "table-tennis": [
    { key: "tableTennisReactionTime", label: "Reaction Time" },
    { key: "tableTennisHandEyeCoordination", label: "Hand–Eye Coordination" },
    { key: "tableTennisSpeed", label: "Speed" },
    { key: "tableTennisAccuracy", label: "Accuracy" },
    { key: "tableTennisEndurance", label: "Endurance" },
  ],
  badminton: [
    { key: "badmintonAgility", label: "Agility" },
    { key: "badmintonSpeed", label: "Speed" },
    { key: "badmintonEndurance", label: "Endurance" },
    { key: "badmintonSmashPower", label: "Smash Power" },
    { key: "badmintonAccuracy", label: "Accuracy" },
  ],
  taekwondo: [
    { key: "taekwondoKickingSpeed", label: "Kicking Speed" },
    { key: "taekwondoExplosivePower", label: "Explosive Power" },
    { key: "taekwondoFlexibility", label: "Flexibility" },
    { key: "taekwondoReactionTime", label: "Reaction Time" },
    { key: "taekwondoBalance", label: "Balance" },
  ],
  arnis: [
    { key: "arnisHandSpeed", label: "Hand Speed" },
    { key: "arnisReactionTime", label: "Reaction Time" },
    { key: "arnisCoordination", label: "Coordination" },
    { key: "arnisEndurance", label: "Endurance" },
    { key: "arnisAccuracy", label: "Accuracy" },
  ],
  "karate-do": [
    { key: "karateExplosivePower", label: "Explosive Power" },
    { key: "karateSpeed", label: "Speed" },
    { key: "karateBalance", label: "Balance" },
    { key: "karateReactionTime", label: "Reaction Time" },
    { key: "karateTechniquePrecision", label: "Technique Precision" },
  ],
};

function TeamDetailsModal({
  open,
  onClose,
  team,
  players,
  onAddPlayer,
  onUpdatePlayer,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const API = import.meta.env.VITE_BBACKEND_URL;

  const handleKick = async (player) => {
    const confirmKick = confirm(
      `Remove ${player.firstName} ${player.lastName} from the team?`
    );
    if (!confirmKick) return;

    try {
      const response = await fetch(
        `${API}/userAccounts/player-kick/${player.id}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        alert("Player kicked — status set to Pending.");
        if (onUpdatePlayer) onUpdatePlayer();
      } else {
        alert("Kick failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  const calculateAge = (bDay) => {
    if (!bDay) return "—";
    const birthDate = new Date(bDay);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handlePlayerUpdate = () => {
    if (onUpdatePlayer) onUpdatePlayer();
  };

  const handleOpenUpdate = (player) => {
    setSelectedPlayer(player);
    setShowUpdateModal(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdateModal(false);
    setSelectedPlayer(null);
  };

  if (!open || !team) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-green-700">
            {team.teamName} — Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Team Info Section omitted for brevity but keep yours... */}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Players ({players?.length || 0})
            </h3>

            {!players || players.length === 0 ? (
              <p className="text-gray-500 italic">No players yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {players.map((p) => {
                  // Get specific fields for THIS player's sport
                  const stats = SPORT_TRAINING_FIELDS[p.sport] || [];

                  return (
                    <div
                      key={p.id}
                      className="bg-white border rounded-xl shadow-md p-4 flex flex-col items-center"
                    >
                      <img
                        src={
                          p.id
                            ? `${API}/userAccounts/player-photo/${p.id}`
                            : "/lexi.jpg"
                        }
                        alt={`${p.firstName}`}
                        className="w-20 h-20 rounded-full object-cover border-2 border-green-600 mb-3"
                        onError={(e) => (e.currentTarget.src = "/lexi.jpg")}
                      />

                      <h4 className="text-lg font-bold text-gray-800">
                        {p.firstName.toUpperCase()} {p.lastName.toUpperCase()}
                      </h4>

                      <p className="text-sm text-gray-500">
                        Position: {p.position || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Jersey: #{p.jerseyNo || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Age: {calculateAge(p.bDay)}
                      </p>

                      {/* DYNAMIC PERFORMANCE ATTRIBUTES */}
                      <div className="w-full mt-3 space-y-2">
                        {stats.length > 0 ? (
                          stats.map((stat) => (
                            <div key={stat.key}>
                              <div className="flex justify-between text-xs font-medium text-gray-600">
                                <span>{stat.label}</span>
                                <span>{p[stat.key] || 0}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full bg-green-600 transition-all duration-500"
                                  style={{ width: `${p[stat.key] || 0}%` }}
                                ></div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-400 italic text-center">
                            No sport-specific stats
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleOpenUpdate(p)}
                          className="px-3 py-1 text-md bg-green-600 text-white rounded-full hover:bg-green-700"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleKick(p)}
                          className="px-3 py-1 text-md bg-red-600 text-white rounded-full hover:bg-red-700"
                        >
                          Kick
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer buttons same as before */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-700 hover:bg-green-800 text-white font-medium px-5 py-2 rounded-full transition"
          >
            + Add Player
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-full transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Modals remain the same */}
      {showUpdateModal && selectedPlayer && (
        <PlayersUpdate
          player={selectedPlayer}
          onClose={handleCloseUpdate}
          onUpdate={handlePlayerUpdate}
        />
      )}
      {showAddModal && (
        <AddPlayerModal
          onClose={() => setShowAddModal(false)}
          onUpdatePlayer={onUpdatePlayer}
          teamId={team.id}
          onSelectPlayer={(player) => {
            setShowAddModal(false);
            if (onAddPlayer) onAddPlayer(player);
          }}
        />
      )}
    </div>
  );
}

export default TeamDetailsModal;
