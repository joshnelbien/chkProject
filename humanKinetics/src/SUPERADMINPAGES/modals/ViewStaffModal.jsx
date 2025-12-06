import React, { useState } from "react";
import axios from "axios";

function ViewStaffModal({ staff, onClose, refresh }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: staff.firstName,
    lastName: staff.lastName,
    position: staff.position,
    description: staff.description,
    image: null,
  });

  const API = import.meta.env.VITE_BBACKEND_URL;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("position", formData.position);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      await axios.put(`${API}/staffs/staff/${staff.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Staff updated successfully");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update staff");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-[450px] p-6 rounded shadow-xl">
        <h2 className="text-xl font-bold mb-4">Staff Details</h2>

        <img
          src={staff.imageURL || "/placeholder.png"}
          alt="Staff"
          className="w-32 h-32 object-cover rounded mx-auto mb-4"
        />

        {editMode ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position"
              className="border p-2 rounded"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 rounded"
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="border p-1 rounded"
            />
          </div>
        ) : (
          <div className="text-center">
            <p><strong>Name:</strong> {staff.firstName} {staff.lastName}</p>
            <p><strong>Position:</strong> {staff.position}</p>
            <p className="mt-2"><strong>Description:</strong><br /> {staff.description}</p>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          {editMode ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleUpdate}
            >
              Save
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          )}

          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewStaffModal;
