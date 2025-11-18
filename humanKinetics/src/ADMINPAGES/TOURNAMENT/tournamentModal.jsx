import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TournamentModal({ isOpen, onClose, onSubmit }) {
  const { id } = useParams(); // Admin/User ID
  const [teams, setTeams] = useState([]);
  const [playersByTeam, setPlayersByTeam] = useState({});
  const [formData, setFormData] = useState({
    tournamentName: "",
    sport: "",
    location: "",
    startDate: "",
    endDate: "",
    teams: "",
    teamName: "",
    id: "", // selected team
    teamId: id,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch all teams for this admin/user
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/teams/getTeams/${id}`
        );
        setTeams(res.data);

        // Fetch players for each team
        res.data.forEach((team) => fetchPlayersForTeam(team.id));
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };
    fetchTeams();
  }, [id]);

  // Fetch players for a team
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle team selection
  const handleTeamSelect = (e) => {
    const selectedTeam = teams.find((t) => t.id === e.target.value);
    setFormData({
      ...formData,
      id: e.target.value,
      sport: selectedTeam?.sport || "",
      teamName: selectedTeam?.teamName || "",
    });
  };

  // Show confirmation modal on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  // Confirm submission and send POST request
  const confirmSubmit = async () => {
    try {
      console.log("Submitting tournament:", formData);
      const response = await axios.post(
        "http://localhost:5000/tournament/tournaments",
        formData
      );
      console.log("✅ Tournament added:", response.data);

      if (onSubmit) onSubmit(formData); // optional callback
      setShowConfirmation(false);
      handleClose();
    } catch (error) {
      console.error("❌ Failed to submit tournament:", error);
      alert("Error adding tournament. Check the backend.");
      setShowConfirmation(false);
    }
  };

  const cancelSubmit = () => setShowConfirmation(false);

  const handleClose = () => {
    setFormData({
      tournamentName: "",
      sport: "",
      location: "",
      startDate: "",
      endDate: "",
      teams: "",
      id: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🏀 Add Tournament</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Team Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Select Team
              </label>
              <select
                name="id"
                value={formData.id}
                onChange={handleTeamSelect}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
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

            {/* Tournament Fields */}
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
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-400 transition font-medium"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition font-medium"
              >
                Add Tournament
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">✓</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Confirm Tournament Creation
              </h3>

              <p className="text-gray-600 mb-6">
                Are you sure you want to create the tournament "
                <strong>{formData.tournamentName}</strong>" for team "
                <strong>
                  {teams.find((t) => t.id === formData.id)?.teamName}
                </strong>
                "?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={cancelSubmit}
                  className="flex-1 bg-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-400 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition font-medium"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
