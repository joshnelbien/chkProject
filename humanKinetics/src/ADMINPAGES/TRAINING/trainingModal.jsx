/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TrainingModal({ isOpen, onClose, onSubmit }) {
  const { id } = useParams(); // Admin/User ID

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [playersByTeam, setPlayersByTeam] = useState({});
  const API = import.meta.env.VITE_BBACKEND_URL;

  const [formData, setFormData] = useState({
    title: "",
    workoutDetails: "",
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
          `${API}/teams/getTeams/${id}`
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
        `${API}/teams/player/${teamId}`
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
        `${API}/trainingSchedule/training-schedule`,
        formData
      );
      console.log("Training added:", response.data);

      setShowSuccess(true);
      setShowConfirmation(false);

      // Reset form
      setFormData({
        title: "",
        date: "",
        workoutDetails: "",
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
      workoutDetails: "",
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Workout Details / Training Program
              </label>

              <select
                name="workoutDetails"
                value={formData.workoutDetails}
                onChange={handleChange}
                required
                disabled={!selectedTeam} // Disable if no team is selected yet
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
              >
                <option value="">-- {selectedTeam ? `Select ${selectedTeam.sport} Drill` : 'Select a team first'} --</option>

                {/* BASKETBALL */}
                {selectedTeam?.sport.toLowerCase() === "basketball" && (
                  <>
                    <optgroup label="Performance Metrics">
                      <option value="Speed & Acceleration">Speed & Acceleration</option>
                      <option value="Vertical Jump / Explosive Power">Vertical Jump / Explosive Power</option>
                      <option value="Agility & Change of Direction">Agility & Change of Direction</option>
                      <option value="Cardiovascular Endurance">Cardiovascular Endurance</option>
                      <option value="Shooting Accuracy">Shooting Accuracy</option>
                    </optgroup>
                    <optgroup label="Training Programs">
                      <option value="20m Sprint">20m Sprint</option>
                      <option value="Vertical Jump">Vertical Jump</option>
                      <option value="Illinois Agility">Illinois Agility</option>
                      <option value="Yo-Yo Intermittent Recovery">Yo-Yo Intermittent Recovery</option>
                      <option value="Spot Shooting & Free-Throw Drills">Spot Shooting & Free-Throw Drills</option>
                    </optgroup>
                  </>
                )}

                {/* VOLLEYBALL */}
                {selectedTeam?.sport.toLowerCase() === "volleyball" && (
                  <>
                    <optgroup label="Performance Metrics">
                      <option value="Vertical Jump Height">Vertical Jump Height</option>
                      <option value="Reaction Time">Reaction Time</option>
                      <option value="Upper Body Power">Upper Body Power</option>
                      <option value="Agility">Agility</option>
                      <option value="Serve Accuracy">Serve Accuracy</option>
                    </optgroup>
                    <optgroup label="Training Programs">
                      <option value="Spike Jump Test">Spike Jump Test</option>
                      <option value="Reaction Ball Drill">Reaction Ball Drill</option>
                      <option value="Medicine Ball Throw Test">Medicine Ball Throw Test</option>
                      <option value="T-Test Agility Drill">T-Test Agility Drill</option>
                      <option value="Target Serve Accuracy Test">Target Serve Accuracy Test</option>
                    </optgroup>
                  </>
                )}

                {/* CHEERDANCE */}
                {selectedTeam?.sport.toLowerCase() === "cheerdance" && (
                  <>
                    <optgroup label="Performance Metrics">
                      <option value="Flexibility">Flexibility</option>
                      <option value="Balance & Stability">Balance & Stability</option>
                      <option value="Muscular Endurance">Muscular Endurance</option>
                      <option value="Coordination">Coordination</option>
                      <option value="Explosive Power (Jumps)">Explosive Power (Jumps)</option>
                    </optgroup>
                    <optgroup label="Training Programs">
                      <option value="Sit-and-Reach Test">Sit-and-Reach Test</option>
                      <option value="Stork Balance Test">Stork Balance Test</option>
                      <option value="Core Endurance Hold Test">Core Endurance Hold Test</option>
                      <option value="Routine Synchronization Evaluation">Routine Synchronization Evaluation</option>
                      <option value="Standing Long Jump Test">Standing Long Jump Test</option>
                    </optgroup>
                  </>
                )}

                {/* FUTSAL */}
                {selectedTeam?.sport.toLowerCase() === "futsal" && (
                  <>
                    <optgroup label="Performance Metrics">
                      <option value="Speed">Speed</option>
                      <option value="Agility">Agility</option>
                      <option value="Aerobic Endurance">Aerobic Endurance</option>
                      <option value="Ball Control">Ball Control</option>
                      <option value="Shooting Accuracy">Shooting Accuracy</option>
                    </optgroup>
                    <optgroup label="Training Programs">
                      <option value="30m Sprint Test">30m Sprint Test</option>
                      <option value="Zigzag Agility Test">Zigzag Agility Test</option>
                      <option value="Cooper Test">Cooper Test</option>
                      <option value="Dribbling Cone Test">Dribbling Cone Test</option>
                      <option value="Goal Target Shooting Drill">Goal Target Shooting Drill</option>
                    </optgroup>
                  </>
                )}

                {/* SEPAK TAKRAW */}
                {selectedTeam?.sport.toLowerCase() === "sepak takraw" && (
                  <>
                    <optgroup label="Performance Metrics">
                      <option value="Leg Explosive Power">Leg Explosive Power</option>
                      <option value="Flexibility">Flexibility</option>
                      <option value="Balance">Balance</option>
                      <option value="Reaction Time">Reaction Time</option>
                      <option value="Coordination">Coordination</option>
                    </optgroup>
                    <optgroup label="Training Programs">
                      <option value="Vertical Jump Test">Vertical Jump Test</option>
                      <option value="Hip & Hamstring Flexibility Test">Hip & Hamstring Flexibility Test</option>
                      <option value="Single-Leg Balance Test">Single-Leg Balance Test</option>
                      <option value="Reaction Light Drill">Reaction Light Drill</option>
                      <option value="Ball Juggling Count Test">Ball Juggling Count Test</option>
                    </optgroup>
                  </>
                )}

                {/* TABLE TENNIS */}
                {selectedTeam?.sport.toLowerCase() === "table tennis" && (
                  <>
                    <optgroup label="Performance Metrics">
                      <option value="Reaction Time">Reaction Time</option>
                      <option value="Hand-Eye Coordination">Hand-Eye Coordination</option>
                      <option value="Speed">Speed</option>
                      <option value="Accuracy">Accuracy</option>
                      <option value="Endurance">Endurance</option>
                    </optgroup>
                    <optgroup label="Training Programs">
                      <option value="Reaction Timer Test">Reaction Timer Test</option>
                      <option value="Ball Tracking Drill">Ball Tracking Drill</option>
                      <option value="Short Sprint Test">Short Sprint Test</option>
                      <option value="Target Placement Drill">Target Placement Drill</option>
                      <option value="Rally Endurance Test">Rally Endurance Test</option>
                    </optgroup>
                  </>
                )}

                {/* BADMINTON */}
                {selectedTeam?.sport.toLowerCase() === "badminton" && (
                  <>
                    <optgroup label="Performance Metrics">
                      <option value="Agility">Agility</option>
                      <option value="Speed">Speed</option>
                      <option value="Endurance">Endurance</option>
                      <option value="Smash Power">Smash Power</option>
                      <option value="Accuracy">Accuracy</option>
                    </optgroup>
                    <optgroup label="Training Programs">
                      <option value="Shuttle Run Test">Shuttle Run Test</option>
                      <option value="10–20m Sprint Test">10–20m Sprint Test</option>
                      <option value="Multistage Fitness Test">Multistage Fitness Test</option>
                      <option value="Smash Speed Test">Smash Speed Test</option>
                      <option value="Target Shot Accuracy Drill">Target Shot Accuracy Drill</option>
                    </optgroup>
                  </>
                )}

                {/* TAEKWONDO */}
                {selectedTeam?.sport.toLowerCase() === "taekwondo" && (
                  <>
                    <optgroup label="Performance Metrics">
                      <option value="Kicking Speed">Kicking Speed</option>
                      <option value="Explosive Power">Explosive Power</option>
                      <option value="Flexibility">Flexibility</option>
                      <option value="Reaction Time">Reaction Time</option>
                      <option value="Balance">Balance</option>
                    </optgroup>
                    <optgroup label="Training Programs">
                      <option value="Kick Speed Sensor Test">Kick Speed Sensor Test</option>
                      <option value="Standing Long Jump">Standing Long Jump</option>
                      <option value="Split Flexibility Test">Split Flexibility Test</option>
                      <option value="Reaction Pad Drill">Reaction Pad Drill</option>
                      <option value="One-Leg Stability Test">One-Leg Stability Test</option>
                    </optgroup>
                  </>
                )}

                {/* ARNIS */}
                {selectedTeam?.sport.toLowerCase() === "arnis" && (
                  <>
                    <optgroup label="Performance Metrics">
                      <option value="Hand Speed">Hand Speed</option>
                      <option value="Reaction Time">Reaction Time</option>
                      <option value="Coordination">Coordination</option>
                      <option value="Endurance">Endurance</option>
                      <option value="Accuracy">Accuracy</option>
                    </optgroup>
                    <optgroup label="Training Programs">
                      <option value="Stick Speed Drill">Stick Speed Drill</option>
                      <option value="Reaction Light Test">Reaction Light Test</option>
                      <option value="Pattern Coordination Drill">Pattern Coordination Drill</option>
                      <option value="Continuous Striking Test">Continuous Striking Test</option>
                      <option value="Target Strike Accuracy Test">Target Strike Accuracy Test</option>
                    </optgroup>
                  </>
                )}

                {/* KARATE-DO */}
                {selectedTeam?.sport.toLowerCase() === "karate-do" && (
                  <>
                    <optgroup label="Performance Metrics">
                      <option value="Explosive Power">Explosive Power</option>
                      <option value="Speed">Speed</option>
                      <option value="Balance">Balance</option>
                      <option value="Reaction Time">Reaction Time</option>
                      <option value="Technique Precision">Technique Precision</option>
                    </optgroup>
                    <optgroup label="Training Programs">
                      <option value="Vertical Jump Test">Vertical Jump Test</option>
                      <option value="Punch Speed Test">Punch Speed Test</option>
                      <option value="Balance Stability Test">Balance Stability Test</option>
                      <option value="Reaction Timing Drill">Reaction Timing Drill</option>
                      <option value="Kata Performance Scoring">Kata Performance Scoring</option>
                    </optgroup>
                  </>
                )}
              </select>
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
