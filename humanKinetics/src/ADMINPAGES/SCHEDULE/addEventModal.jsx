import { useState } from "react";
import axios from "axios";

export default function AddEventModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    teamName: "",
    matchDate: "",
    opponent: "",
    location: "",
    time: "",
    result: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/teamSchedule/addSchedule",
        formData
      );
      if (onSuccess) onSuccess();
      onClose();
      setFormData({
        teamName: "",
        matchDate: "",
        opponent: "",
        location: "",
        time: "",
        result: "",
      });
    } catch (error) {
      console.error("❌ Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Team Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Name */}
          <div>
            <label
              htmlFor="teamName"
              className="block text-sm font-medium text-gray-700"
            >
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Match Date */}
          <div>
            <label
              htmlFor="matchDate"
              className="block text-sm font-medium text-gray-700"
            >
              Match Date
            </label>
            <input
              type="date"
              id="matchDate"
              name="matchDate"
              value={formData.matchDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Opponent */}
          <div>
            <label
              htmlFor="opponent"
              className="block text-sm font-medium text-gray-700"
            >
              Opponent
            </label>
            <input
              type="text"
              id="opponent"
              name="opponent"
              value={formData.opponent}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Time */}
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Result (Dropdown for consistency) */}
          <div>
            <label
              htmlFor="result"
              className="block text-sm font-medium text-gray-700"
            >
              Result
            </label>
            <select
              id="result"
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select result</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="Draw">Draw</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
