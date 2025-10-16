import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function EditAccountModal({ open, onClose, player, onSave }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    course: "",
    yearLevel: "",
    sport: "",
  });
  const [profilePreview, setProfilePreview] = useState("/lexi.jpg");
  const [profileFile, setProfileFile] = useState(null);
  const fileInputRef = useRef(null);

  // Load player data into form when modal opens
  useEffect(() => {
    if (player) {
      setFormData({
        firstName: player.firstName || "",
        lastName: player.lastName || "",
        email: player.email || "",
        course: player.course || "",
        yearLevel: player.yearLevel || "",
        sport: player.sport || "",
      });

      if (player && player.id) {
        setProfilePreview(
          `http://localhost:5000/userAccounts/player-photo/${player.id}`
        );
      } else {
        setProfilePreview("/lexi.jpg");
      }
    }
  }, [player]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (profileFile) data.append("profilePicture", profileFile);

      await axios.put(
        `http://localhost:5000/userAccounts/players-update/${player.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onSave(formData);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error updating player:", error);
      alert("Failed to update player info.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl transform transition-all animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-green-800">
            Edit Account Information
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mt-6 mb-4">
          <img
            src={profilePreview}
            alt="Profile Preview"
            className="w-28 h-28 rounded-full object-cover border-4 border-green-600 shadow-md"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="mt-3 px-4 py-1.5 text-sm bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
          >
            Change Photo
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
            <InputField
              label="Year Level"
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Sport"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end items-center gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg shadow-sm transition font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Input Component */
function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
      />
    </div>
  );
}

export default EditAccountModal;
