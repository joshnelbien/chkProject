import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TournamentModal({ isOpen, onClose, onSubmit }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    tournamentName: "",
    sport: "",
    location: "",
    startDate: "",
    endDate: "",
    teams: "",
    teamId: id,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Function to submit data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/tournament/tournaments",
        formData
      );
      console.log("✅ Tournament added:", response.data);

      if (onSubmit) onSubmit(formData); // optional callback
      onClose();
    } catch (error) {
      console.error("❌ Failed to submit tournament:", error);
      alert("Error adding tournament. Check the backend.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">🏀 Add Tournament</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tournament Name
            </label>
            <input
              type="text"
              name="tournamentName"
              value={formData.tournamentName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="e.g. Regional Basketball Championship"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Sport
            </label>
            <input
              type="text"
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="e.g. Basketball"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="e.g. Main Stadium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Number of Teams
            </label>
            <input
              type="number"
              name="teams"
              value={formData.teams}
              onChange={handleChange}
              required
              min="1"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="e.g. 12"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
          >
            Add Tournament
          </button>
        </form>
      </div>
    </div>
  );
}
