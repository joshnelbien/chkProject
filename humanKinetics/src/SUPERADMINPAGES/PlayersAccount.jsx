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
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState("");

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

            {/* SEARCH BAR */}
            <div className="relative w-64 mb-4">
              <input
                type="text"
                placeholder="Search player..."
                className="border border-gray-400 p-2 pr-12 w-full rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                onClick={() => console.log("Searching:", search)}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 px-2 py-1 border border-gray-400 rounded-sm shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z"
                  />
                </svg>
              </button>
            </div>

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
                    {players
                      .filter((p) =>
                        `${p.firstName} ${p.lastName} ${p.email} ${p.sport}`
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                      .map((player) => (
                        <tr key={player.id}>
                          <td className="px-4 py-2 border">
                            {player.lastName} {player.firstName}
                          </td>
                          <td className="px-4 py-2 border">{player.email}</td>
                          <td className="px-4 py-2 border">{player.sport}</td>
                          <td className="px-4 py-2 border">{player.jerseyNo}</td>
                          <td className="px-4 py-2 border">{player.position}</td>
                          <td className="px-4 py-2 border">
                            {player.isVerified ? "Yes" : "No"}
                          </td>
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
                              Archive
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
