import React, { useState } from "react";
import axios from "axios";
import SuccessModal from "./successModal";

function AddStaffModal({ onClose, refresh }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    position: "",
    description: "",

  });

  const addStaffClose = () => {
    onclose();
  }

  const [image, setImage] = useState(null);
  const API = import.meta.env.VITE_BBACKEND_URL;

  const submitStaff = async () => {
    const data = new FormData();
    data.append("firstName", form.firstName);
    data.append("lastName", form.lastName);
    data.append("position", form.position);
    data.append("description", form.description);
    if (image) data.append("image", image);

    try {
      await axios.post(`${API}/staffs/staff`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowSuccess(true); // ✅ show modal
      refresh();            // optional
    } catch (error) {
      alert("Failed to add staff.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-[450px] p-6 rounded shadow-xl">

        <h2 className="text-xl font-bold mb-4">Add Staff</h2>

        <input
          className="w-full border p-2 mb-2"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-2"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <select
          className="w-full border p-2 mb-2"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        >
          <option value="">Select Position</option>
          <option value="CITY MAYOR/CHAIR, PLSP BOARD OF REGENTS">CITY MAYOR/CHAIR, PLSP BOARD OF REGENTS</option>
          <option value="EXECUTIVE ASSISTANT FOR PLSP">EXECUTIVE ASSISTANT FOR PLSP</option>
          <option value="UNIVERSITY PRESIDENT">UNIVERSITY PRESIDENT</option>
          <option value="COLLEGE ADMINISTRATOR">COLLEGE ADMINISTRATOR</option>
          <option value="DIRECTOR, INSTITUTE OF HUMAN KINETICS">DIRECTOR, INSTITUTE OF HUMAN KINETICS</option>
          <option value="SECRETARY IHK">SECRETARY IHK</option>
          <option value="DEAN COLLEGE OF TEACHER EDUCATION">DEAN COLLEGE OF TEACHER EDUCATION</option>
          <option value="PE LECTURERS AND SPORTS COACHES">PE LECTURERS AND SPORTS COACHES</option>
        </select>

        <textarea
          className="w-full border p-2 mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />


        {/* IMAGE UPLOAD + PREVIEW */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3"
        />
        {image && (
          <img src={URL.createObjectURL(image)} className="w-28 h-28 object-cover rounded mb-3" />
        )}

        <div className="flex justify-end gap-2 mt-3">
          <button className="px-4 py-2 bg-gray-300" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-green-600 text-white" onClick={submitStaff}>
            Save
          </button>
        </div>

        {showSuccess && (
          <SuccessModal
            message="Staff added successfully!"
            onClose={() => {
              setShowSuccess(false); // close success modal
              onClose();             // close AddStaffModal
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AddStaffModal;
