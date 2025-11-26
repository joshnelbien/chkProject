import React, { useEffect, useState } from "react";
import axios from "axios";

function AddPlayerModal({ onClose, onSelectPlayer, teamId }) {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_BBACKEND_URL;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get(
          `${API}/userAccounts/players`
        );
        // ✅ Only show players with Pending status
        const pendingPlayers = res.data.filter(
          (player) => player.status === "Pending"
        );
        setPlayers(pendingPlayers);
      } catch (err) {
        console.error("❌ Error fetching players:", err);
      }
    };
    fetchPlayers();
  }, []);

  // ✅ Handle Add to Team
  const handleAddPlayer = async (player) => {
    try {
      setLoading(true);
      await axios.put(`${API}/teams/player-addTeam`, {
        playerId: player.id,
        teamId: teamId,
      });

      alert(
        `${player.firstName} ${player.lastName} has been added to the team!`
      );

      // ✅ Update UI or notify parent
      if (onSelectPlayer) onSelectPlayer(player);

      // ✅ Refresh players list (remove added player)
      setPlayers((prev) => prev.filter((p) => p.id !== player.id));
    } catch (error) {
      console.error("❌ Error adding player to team:", error);
      alert("Failed to add player. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search Filter
  const filteredPlayers = players.filter((p) =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-green-700">
            Select Player
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search pending players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-4 py-2 rounded-full focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Player List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {filteredPlayers.length === 0 ? (
            <p className="text-gray-500 italic">No pending players found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {player.firstName} {player.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {player.sport} • {player.course}
                    </p>
                    <p className="text-xs text-yellow-600 font-semibold">
                      Status: {player.status}
                    </p>
                  </div>
                  <button
                    disabled={loading}
                    onClick={() => handleAddPlayer(player)}
                    className="bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {loading ? "Adding..." : "Add to Team"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-full transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPlayerModal;
