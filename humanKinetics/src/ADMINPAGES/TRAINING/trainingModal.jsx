/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TrainingModal({ isOpen, onClose, onSubmit }) {
  const { id } = useParams();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [coach, setCoach] = useState([]);
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
    teamId: id,
    id: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const res = await axios.get(`${API}/adminAccounts/coaches-profile/${id}`);
        setCoach(res.data);

        // Auto-fill the coach name and ensure teamId is set in formData
        setFormData(prev => ({
          ...prev,
          coach: `${res.data.firstName} ${res.data.lastName}`,
          teamId: id
        }));
      } catch (err) {
        console.error("Error fetching coach profile:", err);
      }
    };
    if (id) fetchCoach();
  }, [id, API]);

  useEffect(() => {
    if (coach && coach.sports && teams.length > 0) {
      // Find team where team.sport matches coach.sports (case-insensitive)
      const matchingTeam = teams.find(
        (t) => t.sport.toLowerCase() === coach.sports.toLowerCase()
      );

      if (matchingTeam) {
        setSelectedTeam(matchingTeam);

        // Update formData so the backend gets the correct IDs immediately
        setFormData((prev) => ({
          ...prev,
          id: matchingTeam.id,
          teamId: id, // from useParams
        }));
      }
    }
  }, [coach, teams, id]);



  // Handle all text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  // Show confirmation modal
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  // Confirm submission → POST to backend
  const confirmSubmit = async () => {
    try {
      // Ensure teamId is explicitly sent
      const payload = {
        ...formData,
        teamId: id 
      };

      const response = await axios.post(
        `${API}/trainingSchedule/training-schedule`,
        payload
      );
      
      setShowSuccess(true);
      setShowConfirmation(false);
      // Reset logic...
    } catch (error) {
      console.error("Failed to submit training:", error);
    }
  };

  const cancelSubmit = () => setShowConfirmation(false);


  // Inside your render or a helper function
  const getSportData = (rawSport) => {
    if (!rawSport) return null;

    const sport = rawSport.toLowerCase();

    // Define the mapping data
    const data = {
      basketball: {
        metrics: ["Speed & Acceleration", "Vertical Jump / Explosive Power", "Agility & Change of Direction", "Cardiovascular Endurance", "Shooting Accuracy"],
        programs: ["20m Sprint", "Vertical Jump", "Illinois Agility", "Yo-Yo Intermittent Recovery", "Spot Shooting & Free-Throw Drills"]
      },
      volleyball: {
        metrics: ["Vertical Jump Height", "Reaction Time", "Upper Body Power", "Agility", "Serve Accuracy"],
        programs: ["Spike Jump Test", "Reaction Ball Drill", "Medicine Ball Throw Test", "T-Test Agility Drill", "Target Serve Accuracy Test"]
      },
      cheerdance: {
        metrics: ["Flexibility", "Balance & Stability", "Muscular Endurance", "Coordination", "Explosive Power (Jumps)"],
        programs: ["Sit-and-Reach Test", "Stork Balance Test", "Core Endurance Hold Test", "Routine Synchronization Evaluation", "Standing Long Jump Test"]
      },
      futsal: {
        metrics: ["Speed", "Agility", "Aerobic Endurance", "Ball Control", "Shooting Accuracy"],
        programs: ["30m Sprint Test", "Zigzag Agility Test", "Cooper Test", "Dribbling Cone Test", "Goal Target Shooting Drill"]
      },
      "sepak-takraw": {
        metrics: ["Leg Explosive Power", "Flexibility", "Balance", "Reaction Time", "Coordination"],
        programs: ["Vertical Jump Test", "Hip & Hamstring Flexibility Test", "Single-Leg Balance Test", "Reaction Light Drill", "Ball Juggling Count Test"]
      },
      "table-tennis": {
        metrics: ["Reaction Time", "Hand-Eye Coordination", "Speed", "Accuracy", "Endurance"],
        programs: ["Reaction Timer Test", "Ball Tracking Drill", "Short Sprint Test", "Target Placement Drill", "Rally Endurance Test"]
      },
      badminton: {
        metrics: ["Agility", "Speed", "Endurance", "Smash Power", "Accuracy"],
        programs: ["Shuttle Run Test", "10–20m Sprint Test", "Multistage Fitness Test", "Smash Speed Test", "Target Shot Accuracy Drill"]
      },
      taekwondo: {
        metrics: ["Kicking Speed", "Explosive Power", "Flexibility", "Reaction Time", "Balance"],
        programs: ["Kick Speed Sensor Test", "Standing Long Jump", "Split Flexibility Test", "Reaction Pad Drill", "One-Leg Stability Test"]
      },
      arnis: {
        metrics: ["Hand Speed", "Reaction Time", "Coordination", "Endurance", "Accuracy"],
        programs: ["Stick Speed Drill", "Reaction Light Test", "Pattern Coordination Drill", "Continuous Striking Test", "Target Strike Accuracy Test"]
      },
      "karate-do": {
        metrics: ["Explosive Power", "Speed", "Balance", "Reaction Time", "Technique Precision"],
        programs: ["Vertical Jump Test", "Punch Speed Test", "Balance Stability Test", "Reaction Timing Drill", "Kata Performance Scoring"]
      }
    };

    // Logic to strip "-men" or "-women" to find the correct key
    let sportKey = sport;
    if (sport.startsWith("basketball")) sportKey = "basketball";
    if (sport.startsWith("volleyball")) sportKey = "volleyball";

    return data[sportKey] || null;
  };


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
              <label className="block text-sm font-medium text-gray-700">
                SPORTS
              </label>
              <input
                type="text"
                name="sportDisplay"
                value={coach.sports || ""}
                readOnly // Prevents users from changing the coach's assigned sport
                className="mt-1 block w-full rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-gray-500"
              />
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
                value={`${coach.firstName} ${coach.lastName}`}
                onChange={handleChange}
                placeholder="e.g., Coach Mike"
                required
                readOnly
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
                disabled={!coach.sports}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
              >
                <option value="">
                  -- {coach.sports ? `Select Drill for ${coach.sports.replace('-', ' ')}` : 'Loading...'} --
                </option>

                {(() => {
                  const selectedData = getSportData(coach.sports);

                  if (!selectedData) return null;

                  return (
                    <optgroup label="Training Programs">
                      {selectedData.programs.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </optgroup>
                  );
                })()}
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
