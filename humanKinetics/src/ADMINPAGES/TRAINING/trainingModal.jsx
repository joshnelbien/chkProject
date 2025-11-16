import { useState } from "react";
import { useParams } from "react-router-dom";

export default function TrainingModal({ isOpen, onClose, onSubmit }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    coach: "",
    focusAreas: "",
    teamId: id,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Show confirmation modal instead of submitting directly
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/trainingSchedule/training-schedule",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Show success modal instead of alert
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
        });
      } else {
        alert(`❌ Failed: ${data.message}`);
        setShowConfirmation(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("❌ Network error. Please try again.");
      setShowConfirmation(false);
    }
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

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
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Training Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Training Schedule</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 📅 Date Picker */}
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                placeholder="Separate by commas, e.g., Shooting, Dribbling, Passing"
                required
                rows="3"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium"
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
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">✓</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Confirm Training Schedule
              </h3>
              
              <p className="text-gray-600 mb-2">
                Are you sure you want to add this training schedule?
              </p>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm">
                <p><strong>Title:</strong> {formData.title}</p>
                <p><strong>Date:</strong> {formData.date}</p>
                <p><strong>Time:</strong> {formData.startTime} - {formData.endTime}</p>
                <p><strong>Coach:</strong> {formData.coach}</p>
                <p><strong>Location:</strong> {formData.location}</p>
              </div>

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

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[70]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Success!
              </h3>
              
              <p className="text-gray-600 mb-2">
                Training schedule has been successfully added.
              </p>

              <div className="mt-6">
                <button
                  onClick={closeSuccessModal}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}