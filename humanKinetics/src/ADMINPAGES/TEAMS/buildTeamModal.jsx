import { useState, useEffect } from "react"; // Added useEffect
import axios from "axios";
import { useParams } from "react-router-dom";

function BuildTeamModal({ open, onClose, onTeamCreated, data }) {
  const { id } = useParams();
  const API = import.meta.env.VITE_BBACKEND_URL;

  const [formData, setFormData] = useState({
    teamId: id,
    teamName: "",
    sport: "", // Start empty or with a fallback
    coach: "",
    description: "",
  });

  // Sync state when data prop changes or modal opens
  useEffect(() => {
    if (open && data?.sports) {
      setFormData((prev) => ({
        ...prev,
        sport: data.sports,
        teamId: id // Ensure id is also synced
      }));
    }
  }, [open, data, id]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdTeamData, setCreatedTeamData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setFormData({
      teamId: id,
      teamName: "",
      sport: data?.sports || "", // Reset back to default sport
      coach: "",
      description: "",
    });
    if (createdTeamData) {
      onTeamCreated(createdTeamData);
    }
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/teams/createTeams`, formData);
      setCreatedTeamData(res.data);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("❌ Error creating team:", err);
      alert("Failed to create team. Please try again.");
    }
  };

  const SuccessModal = () => {
    if (!showSuccessModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Team Created Successfully!</h3>
            <button
              onClick={handleCloseSuccessModal}
              className="text-gray-400 hover:text-gray-600 transition duration-150"
            >
              ✕
            </button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg 
                className="w-8 h-8 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">
              Your team "{formData.teamName}" has been created.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              You can now add athletes to this team.
            </p>

            <button
              onClick={handleCloseSuccessModal}
              className="w-full bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition duration-150 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-2xl font-semibold text-green-700">
            Create New Team
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Team Name
            </label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Sport
            </label>
            <input
              type="text"
              name="sport"
              readOnly
              value={formData.sport}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Coach Name
            </label>
            <input
              type="text"
              name="coach"
              value={formData.coach}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
            >
              Save Team
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <SuccessModal />
    </div>
  );
}

export default BuildTeamModal;
