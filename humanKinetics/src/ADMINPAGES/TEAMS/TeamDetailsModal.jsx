import { useState } from "react";
import AddPlayerModal from "./AddPlayerModal";
import PlayersUpdate from "./update";

function TeamDetailsModal({ open, onClose, team, players, onAddPlayer, onUpdatePlayer }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const API = import.meta.env.VITE_BBACKEND_URL;

  const calculateAge = (bDay) => {
    if (!bDay) return "—"; // fallback if no date

    const birthDate = new Date(bDay);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // If birthday hasn't occurred yet this year, subtract 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  // Handle player update completion
  const handlePlayerUpdate = () => {
    // Call the parent component's refresh function
    if (onUpdatePlayer) {
      onUpdatePlayer();
    }
  };

  // Handle opening update modal
  const handleOpenUpdate = (player) => {
    setSelectedPlayer(player);
    setShowUpdateModal(true);
  };

  // Handle closing update modal
  const handleCloseUpdate = () => {
    setShowUpdateModal(false);
    setSelectedPlayer(null);
  };

  if (!open || !team) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto p-4"
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-lg" 
      >
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
          {/* Team Info */}
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-800">Sport:</span>{" "}
              {team.sport}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Coach:</span>{" "}
              {team.coach}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Description:</span>{" "}
              {team.description || "No description provided."}
            </p>
          </div>

          {/* Players Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Players ({players?.length || 0})
            </h3>

            {!players || players.length === 0 ? (
              <p className="text-gray-500 italic">No players yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                {players.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border rounded-xl shadow-md p-4 flex flex-col items-center"
                  >
                    {/* Player Image */}
                    <img
                      src={
                        p.id
                          ? `${API}/userAccounts/player-photo/${p.id}`
                          : "/lexi.jpg"
                      }
                      alt={`${p.firstName} ${p.lastName}`}
                      className="w-20 h-20 rounded-full object-cover border-2 border-green-600 mb-3"
                      onError={(e) => (e.currentTarget.src = "/lexi.jpg")}
                    />

                    {/* Name */}
                    <h4 className="text-lg font-bold text-gray-800">
                      {p.firstName.toUpperCase()} {p.lastName.toUpperCase()}
                    </h4>

                    {/* Details */}
                    <p className="text-sm text-gray-500">
                      Position: {p.position || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Jersey: #{p.jerseyNo || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Age: {calculateAge(p.bDay) || "—"}
                    </p>
                    <div className="w-full mt-3 space-y-2">
                      {/* Strength */}
                      <div>
                        <div className="flex justify-between text-xs font-medium text-gray-600">
                          <span>Strength</span>
                          <span>{p.strength || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-green-600"
                            style={{ width: `${p.strength || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Speed */}
                      <div>
                        <div className="flex justify-between text-xs font-medium text-gray-600">
                          <span>Speed</span>
                          <span>{p.speed || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-green-600"
                            style={{ width: `${p.speed || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Agility */}
                      <div>
                        <div className="flex justify-between text-xs font-medium text-gray-600">
                          <span>Agility</span>
                          <span>{p.agility || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-green-600"
                            style={{ width: `${p.agility || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Endurance */}
                      <div>
                        <div className="flex justify-between text-xs font-medium text-gray-600">
                          <span>Endurance</span>
                          <span>{p.endurance || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-green-600"
                            style={{ width: `${p.endurance || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleOpenUpdate(p)}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded-full hover:bg-green-700"
                      >
                        Update
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
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

      {/* Update Player Modal */}
      {showUpdateModal && selectedPlayer && (
        <PlayersUpdate
          player={selectedPlayer}
          onClose={handleCloseUpdate}
          onUpdate={handlePlayerUpdate}
        />
      )}

      {/* Add Player Modal */}
      {showAddModal && (
        <AddPlayerModal
          onClose={() => setShowAddModal(false)}
          teamId={team.id}
          onSelectPlayer={(player) => {
            setShowAddModal(false);
            if (onAddPlayer) onAddPlayer(player); // trigger refresh
          }}
        />
      )}
    </div>
  );
}

export default TeamDetailsModal;