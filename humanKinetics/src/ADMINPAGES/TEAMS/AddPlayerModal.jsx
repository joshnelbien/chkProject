import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerProfileModal from "./PlayerProfileModal"; // ⬅ import the new modal
import { useParams } from "react-router-dom";

function AddPlayerModal({ onClose, onSelectPlayer, teamId }) {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // ⬅ For viewing profile
  const { id } = useParams();
  const API = import.meta.env.VITE_BBACKEND_URL;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get(`${API}/userAccounts/players`);
        const resAdmin = await axios.get(`${API}/adminAccounts/coaches-profile/${id}`);
        console.log("Admin Data:", resAdmin.data.sports); // 🔍 Debug admin data
        const pendingPlayers = res.data.filter(
          (player) => player.status === "Pending" && player.sport.toLowerCase() === resAdmin.data.sports.toLowerCase()
        );
        setPlayers(pendingPlayers);
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };
    fetchPlayers();
  }, []);

  const handleRejectPlayer = async (player) => {
    try {
      setLoading(true);

      await axios.put(`${API}/userAccounts/reject/${player.id}`, {
        playerId: player.id,
        status: "Rejected",
      });

      alert(`${player.firstName} ${player.lastName} has been rejected.`);
      setPlayers((prev) => prev.filter((p) => p.id !== player.id));
    } catch (err) {
      alert("Failed to reject player.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      if (onSelectPlayer) onSelectPlayer(player);
      setPlayers((prev) => prev.filter((p) => p.id !== player.id));
    } catch {
      alert("Failed to add player.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPlayers = players.filter((p) =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-green-700">
            Select Player
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search players..."
            className="border w-full px-4 py-2 rounded-full"
          />
        </div>

        {/* List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="border p-4 flex justify-between rounded-lg"
            >
              <div>
                <p className="font-semibold">
                  {player.firstName} {player.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {player.sport} • {player.course}
                </p>
              </div>

              <div className="flex gap-2">
                {/* 🔹 View Profile Button */}
                <button
                  onClick={() => setSelectedPlayer(player)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                >
                  View Profile
                </button>

                <button
                  disabled={loading}
                  onClick={() => handleAddPlayer(player)}
                  className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full"
                >
                  {loading ? "Adding..." : "Add"}
                </button>

                <button
                  disabled={loading}
                  onClick={() => handleRejectPlayer(player)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full"
          >
            Close
          </button>
        </div>
      </div>

      {/* 🔥 Render Profile Modal */}
      {selectedPlayer && (
        <PlayerProfileModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}

export default AddPlayerModal;
