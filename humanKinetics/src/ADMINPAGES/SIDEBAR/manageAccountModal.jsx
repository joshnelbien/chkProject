/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function ManageAccountModal({ open, onClose, id }) {
  const [loading, setLoading] = useState(false);
  const [coach, setCoach] = useState(null);
  const [saving, setSaving] = useState(false);

  const API = import.meta.env.VITE_BBACKEND_URL;
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    sports: "",
    experience: "",
    education: "",
    specialization: "",
    achievements: "",
    email: "",
    password: "",
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  // =================== FETCH COACH DATA ===================
  const fetchCoach = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API}/adminAccounts/coaches-profile/${id}`
      );

      setCoach(res.data);
      setFormData(res.data);

      if (res.data.profilePicture) {
        setProfilePreview(
          `${API}/adminAccounts/coach-photo/${id}`
        );
      }
    } catch (err) {
      console.error("Error loading coach:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && id) fetchCoach();
  }, [open, id]);

  // =================== HANDLE INPUT ===================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =================== HANDLE PHOTO ===================
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  // =================== SAVE CHANGES ===================
  const saveChanges = async () => {
    setSaving(true);

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      if (profileFile) {
        form.append("profilePicture", profileFile);
      }

      await axios.put(
        `${API}/adminAccounts/coaches-update/${id}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Profile updated successfully!");
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile.");
    }

    setSaving(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* MODAL CARD */}
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-[fadeIn_.25s_ease] relative">

        {/* ---------------- HEADER ---------------- */}
        <div className="bg-gradient-to-r from-green-700 to-green-900 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Manage Account</h1>
            <p className="text-sm text-white/80">
              Update coach/admin profile information
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl"
          >
            ✖
          </button>
        </div>

        {/* ---------------- CONTENT ---------------- */}
        <div className="p-8">
          {loading ? (
            <div className="w-full text-center py-16">
              <div className="loader mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
          ) : (
            <>
              {/* PROFILE SECTION */}
              <div className="flex flex-col items-center gap-6 mb-10">
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={profilePreview || "/default-profile.png"}
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
                    alt="Profile"
                  />

                  <label className="absolute bottom-0 right-0 bg-green-700 p-2 rounded-full cursor-pointer hover:bg-green-800">
                    <Pencil className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      onChange={handlePhoto}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* INFO */}
                <div className="text-center">
                  <p className="text-xl font-semibold">
                    {coach?.firstName} {coach?.lastName}
                  </p>

                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {coach?.sports || "No Sport Assigned"}
                  </p>

                  <div
                    className={`mt-2 inline-block px-4 py-1 rounded-full text-xs font-semibold border 
                    ${coach?.isVerified
                      ? "border-green-600 text-green-700 bg-green-50"
                      : "border-red-600 text-red-700 bg-red-50"
                    }`}
                  >
                    {coach?.isVerified ? "Email Verified" : "Email Not Verified"}
                  </div>
                </div>
              </div>

              {/* ---------------- FORM FIELDS ---------------- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Small inputs */}
                {[
                  ["lastName", "Last Name"],
                  ["firstName", "First Name"],
                  ["middleName", "Middle Name"],
                  ["sports", "Sports"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="text-sm font-semibold text-gray-700">
                      {label}
                    </label>
                    <input
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-green-600 outline-none"
                    />
                  </div>
                ))}

                {/* Textareas */}
                {[
                  ["experience", "Experience"],
                  ["education", "Education"],
                  ["specialization", "Specialization"],
                  ["achievements", "Achievements"],
                ].map(([name, label]) => (
                  <div key={name} className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">{label}</label>
                    <textarea
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mt-1 h-24 focus:ring-2 focus:ring-green-600 outline-none"
                    />
                  </div>
                ))}

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <input
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>
              </div>

              {/* ---------------- FOOTER BUTTONS ---------------- */}
              <div className="flex justify-center gap-3 mt-10">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={saveChanges}
                  disabled={saving}
                  className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:bg-green-400"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
