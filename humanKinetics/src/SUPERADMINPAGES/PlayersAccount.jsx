import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Footer from "./Footer";
import PlayerModal from "./modals/PlayerModal";
import ConfirmModal from "./modals/ConfirmModal";

function PlayerAccounts() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null); // Player to delete
  const API = import.meta.env.VITE_BBACKEND_URL;

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/userAccounts/player`);
      setPlayers(res.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    setIsModalOpen(false);
  };

  const openConfirmDelete = (player) => {
    setConfirmDelete(player);
  };

  const closeConfirmDelete = () => {
    setConfirmDelete(null);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API}/userAccounts/player/${confirmDelete.id}`);
      // Remove player from the state
      setPlayers((prev) => prev.filter((p) => p.id !== confirmDelete.id));
      closeConfirmDelete();
      alert("Player deleted successfully!");
    } catch (error) {
      console.error("Error deleting player:", error);
      alert("Failed to delete player.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={true} />
      <div className="flex-1 flex flex-col ml-15 md:ml-15 mt-16">
        <Navbar />

        <main className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">Player Accounts</h1>
            <p className="text-gray-600 mb-6">
              Manage all player accounts, view details, and perform actions like edit or delete.
            </p>

            {loading ? (
              <p>Loading players...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Sport</th>
                      <th className="px-4 py-2 border">Jersey No</th>
                      <th className="px-4 py-2 border">Position</th>
                      <th className="px-4 py-2 border">Verified</th>
                      <th className="px-4 py-2 border">Status</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    {players.map((player) => (
                      <tr key={player.id}>
                        <td className="px-4 py-2 border">{player.lastName} {player.firstName}</td>
                        <td className="px-4 py-2 border">{player.email}</td>
                        <td className="px-4 py-2 border">{player.sport}</td>
                        <td className="px-4 py-2 border">{player.jerseyNo}</td>
                        <td className="px-4 py-2 border">{player.position}</td>
                        <td className="px-4 py-2 border">{player.isVerified ? "Yes" : "No"}</td>
                        <td className="px-4 py-2 border">{player.status}</td>
                        <td className="px-4 py-2 border">
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700"
                            onClick={() => openModal(player)}
                          >
                            View
                          </button>
                          <button
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                            onClick={() => openConfirmDelete(player)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {isModalOpen && selectedPlayer && (
              <PlayerModal player={selectedPlayer} onClose={closeModal} />
            )}

            {confirmDelete && (
              <ConfirmModal
                message={`Are you sure you want to delete ${confirmDelete.firstName} ${confirmDelete.lastName}?`}
                onConfirm={handleDelete}
                onCancel={closeConfirmDelete}
              />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default PlayerAccounts;
