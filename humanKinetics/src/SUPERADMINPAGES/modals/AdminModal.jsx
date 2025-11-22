import React, { useState } from "react";
import axios from "axios";

export default function AdminModal({ admin, onClose, onUpdate }) {
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    if (!admin.isVerified) return;
    setVerifying(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/adminAccounts/verify-superadmin/${admin.id}`
      );
      if (res.data.success) {
        alert("Admin successfully verified!");
        // Refresh table and modal
        if (onUpdate) onUpdate(res.data.admin);
      }
    } catch (error) {
      console.error("Error verifying admin:", error);
      alert(error.response?.data?.message || "Failed to verify admin.");
    } finally {
      setVerifying(false);
    }
  };

  if (!admin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-11/12 md:w-3/4 lg:w-2/3 p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">
            {admin.firstName} {admin.middleName ?? ""} {admin.lastName}
          </h2>
          <span className="text-green-600 font-semibold mt-1">{admin.sports?.toUpperCase()}</span>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <span className={`px-4 py-1 rounded-full font-medium text-white ${admin.isVerified ? 'bg-green-600' : 'bg-gray-400'}`}>
            {admin.isVerified ? "Verified" : "Not Verified"}
          </span>
          <span className={`px-4 py-1 rounded-full font-medium text-white ${admin.isSuperAdminVerified ? 'bg-green-600' : 'bg-gray-400'}`}>
            {admin.isSuperAdminVerified ? "Super Admin Verified" : "Pending"}
          </span>
        </div>

        {!admin.isSuperAdminVerified && (
          <div className="flex flex-col items-center mb-6">
            {!admin.isVerified && <p className="text-red-600 font-medium mb-2">Cannot verify as Super Admin until verified.</p>}
            <button
              onClick={handleVerify}
              disabled={verifying || !admin.isVerified}
              className={`text-white font-semibold px-6 py-2 rounded-md ${admin.isVerified ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
            >
              {verifying ? "Verifying..." : "Verify Super Admin"}
            </button>
          </div>
        )}

        {/* Details Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="p-4 border-l-4 border-green-600 shadow-sm rounded-md">
            <h3 className="text-lg font-bold mb-2 text-green-700">Basic Information</h3>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Experience:</strong> {admin.experience}</p>
          </div>

          <div className="p-4 border-l-4 border-green-600 shadow-sm rounded-md">
            <h3 className="text-lg font-bold mb-2 text-green-700">Education & Specialization</h3>
            <p><strong>Education:</strong> {admin.education}</p>
            <p><strong>Specialization:</strong> {admin.specialization}</p>
          </div>

          <div className="p-4 border-l-4 border-green-600 shadow-sm rounded-md md:col-span-2">
            <h3 className="text-lg font-bold mb-2 text-green-700">Achievements</h3>
            <p>{admin.achievements}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
