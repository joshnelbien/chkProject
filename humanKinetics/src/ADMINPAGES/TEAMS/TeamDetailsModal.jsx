import React, { useState } from "react";
import AddPlayerModal from "./AddPlayerModal";

function TeamDetailsModal({ open, onClose, team, players, onAddPlayer }) {
  const [showAddModal, setShowAddModal] = useState(false);

  const calculateAge = (bDay) => {
    if (!bDay) return "—"; // fallback if no date

    const birthDate = new Date(bDay);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // If birthday hasn’t occurred yet this year, subtract 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  if (!open || !team) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
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
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full text-sm text-left border-collapse">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">Position</th>
                      <th className="py-2 px-3">Jersey</th>
                      <th className="py-2 px-3">Age</th>
                      <th className="py-2 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p, index) => (
                      <tr
                        key={p.id}
                        className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                      >
                        <td className="py-2 px-3">{index + 1}</td>
                        <td className="py-2 px-3">
                          {p.firstName} {p.lastName}
                        </td>
                        <td className="py-2 px-3">{p.position || "—"}</td>
                        <td className="py-2 px-3">
                          #{p.jerseyNumber || "N/A"}
                        </td>
                        <td className="py-2 px-3">{calculateAge(p.bDay)}</td>
                        <td className="py-2 px-3">
                          <button className="bg-green-700 hover:bg-green-600 text-white font-medium px-4 py-1 rounded-full transition">
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

      {/* ✅ Player Selection Modal */}
      {showAddModal && (
        <AddPlayerModal
          onClose={() => setShowAddModal(false)} // ✅ fixed name
          teamId={team.id}
          onSelectPlayer={(player) => {
            setShowAddModal(false);
            if (onAddPlayer) onAddPlayer(player); // ✅ trigger refresh
          }}
        />
      )}
    </div>
  );
}

export default TeamDetailsModal;
