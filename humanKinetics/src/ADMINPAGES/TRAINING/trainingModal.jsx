/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TrainingModal({ isOpen, onClose, onSubmit }) {
  const { id } = useParams(); // Admin/User ID
  console.log("Fetched id:", id);

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [playersByTeam, setPlayersByTeam] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    coach: "",
    focusAreas: "",
    teamId: id, // Fetched params ID goes here
    id: "", // Selected team ID goes here
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch teams for this user/admin
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/teams/getTeams/${id}`
        );
        setTeams(res.data);

        // Fetch players per team
        res.data.forEach((team) => fetchPlayersForTeam(team.id));
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    fetchTeams();
  }, [id]);

  // Fetch players for a specific team
  const fetchPlayersForTeam = async (teamId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/teams/player/${teamId}`
      );
      setPlayersByTeam((prev) => ({ ...prev, [teamId]: res.data }));
    } catch (err) {
      console.error(`Error fetching players for team ${teamId}:`, err);
    }
  };

  // Handle all text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle team selection
  const handleTeamSelect = (e) => {
    const selected = teams.find((t) => t.id.toString() === e.target.value);
    setSelectedTeam(selected);

    console.log("Selected team:", selected?.id);

    setFormData({
      ...formData,
      id: selected?.id, // Selected team → "id"
      teamId: id, // useParams ID → "teamId"
    });
  };

  // Show confirmation modal
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  // Confirm submission → POST to backend
  const confirmSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/trainingSchedule/training-schedule",
        formData
      );
      console.log("Training added:", response.data);

      setShowSuccess(true);
      setShowConfirmation(false);

      // Reset form
      setFormData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        coach: "",
        focusAreas: "",
        teamId: id,
        id: "",
      });

      if (onSubmit) onSubmit(formData);
    } catch (error) {
      console.error("Failed to submit training:", error);
      alert("❌ Error adding training schedule.");
      setShowConfirmation(false);
    }
  };

  const cancelSubmit = () => setShowConfirmation(false);

  const closeSuccessModal = () => {
    setShowSuccess(false);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      coach: "",
      focusAreas: "",
      teamId: id,
      id: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Training Schedule</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Team Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Team
              </label>

              <select
                value={selectedTeam?.id || ""}
                onChange={handleTeamSelect}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">-- Select a team --</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.teamName.toUpperCase()} ({team.sport.toUpperCase()}) -{" "}
                    {playersByTeam[team.id]?.length || 0} players
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Training Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Physical Training"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Gym / Main Court"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Coach */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Coach
              </label>
              <input
                type="text"
                name="coach"
                value={formData.coach}
                onChange={handleChange}
                placeholder="e.g., Coach Mike"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Focus Areas */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Focus Areas
              </label>
              <textarea
                name="focusAreas"
                value={formData.focusAreas}
                onChange={handleChange}
                placeholder="e.g., Shooting, Dribbling"
                required
                rows="3"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 text-white"
              >
                Save Schedule
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Training Schedule
              </h3>

              <div className="mt-3 bg-gray-100 p-3 rounded text-sm">
                <p>
                  <strong>Team:</strong> {selectedTeam?.teamName}
                </p>
                <p>
                  <strong>Title:</strong> {formData.title}
                </p>
                <p>
                  <strong>Date:</strong> {formData.date}
                </p>
                <p>
                  <strong>Time:</strong> {formData.startTime} -{" "}
                  {formData.endTime}
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={cancelSubmit}
                  className="flex-1 bg-gray-300 rounded py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  className="flex-1 bg-blue-600 text-white rounded py-2"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[70]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-bold text-green-600">Success!</h3>
            <p className="text-gray-600 mt-2">
              Training schedule has been added.
            </p>

            <button
              onClick={closeSuccessModal}
              className="mt-5 bg-blue-600 text-white px-6 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
