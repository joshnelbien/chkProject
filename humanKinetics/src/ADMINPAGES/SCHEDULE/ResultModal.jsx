import { useState } from "react";

export default function ResultModal({ isOpen, onClose, event, onSubmit }) {
  const [homeScore, setHomeScore] = useState("");
  const [opponentScore, setOpponentScore] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Submit Match Result</h2>

        <p className="text-sm text-gray-600 mb-4">{event?.title}</p>

        <input
          type="number"
          placeholder="Home Score"
          value={homeScore}
          onChange={(e) => setHomeScore(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <input
          type="number"
          placeholder="Opponent Score"
          value={opponentScore}
          onChange={(e) => setOpponentScore(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(homeScore, opponentScore)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
