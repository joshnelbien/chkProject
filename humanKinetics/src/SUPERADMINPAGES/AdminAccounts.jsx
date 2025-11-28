import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Footer from "./Footer";
import AdminModal from "./modals/AdminModal";
import ConfirmModal from "./modals/ConfirmModal";

function AdminAccounts() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteAdmin, setConfirmDeleteAdmin] = useState(null);
  const [search, setSearch] = useState("");

  const API = import.meta.env.VITE_BBACKEND_URL;

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/adminAccounts/admins/archieved`);
      setAdmins(res.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAdmin(null);
    setIsModalOpen(false);
  };

  const handleUpdateAdmin = (updatedAdmin) => {
    setAdmins((prev) =>
      prev.map((a) => (a.id === updatedAdmin.id ? updatedAdmin : a))
    );
    setSelectedAdmin(updatedAdmin);
  };

  const handleDeleteClick = (admin) => {
    setConfirmDeleteAdmin(admin);
  };

  const handleSearch = () => {
    console.log("Searching for:", search);
  };
  const handleCancelDelete = () => {
    setConfirmDeleteAdmin(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.patch(`${API}/adminAccounts/${confirmDeleteAdmin.id}/archive`);
      alert("Admin Archived successfully");

      setAdmins((prev) =>
        prev.filter((a) => a.id !== confirmDeleteAdmin.id)
      );
    } catch (error) {
      console.error("Error archiving admin:", error);
      alert(error.response?.data?.message || "Failed to archive admin.");
    } finally {
      setConfirmDeleteAdmin(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={true} />
      <div className="flex-1 flex flex-col ml-15 md:ml-15 mt-16">
        <Navbar />
        <main className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Accounts</h1>

            <div className="relative w-64 mb-4">
              <input
                type="text"
                placeholder="Search admin..."
                className="border border-gray-400 p-2 pr-12 w-full rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                onClick={handleSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-gray-300 px-2 py-1  rounded-sm shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z"
                  />
                </svg>
              </button>
            </div>

            {loading ? (
              <p>Loading admins...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Sports</th>
                      <th className="px-4 py-2 border">Verified</th>
                      <th className="px-4 py-2 border">Super Admin Verified</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    {admins
                      .filter((admin) => {
                        const term = search.toLowerCase();
                        return (
                          admin.firstName.toLowerCase().includes(term) ||
                          admin.lastName.toLowerCase().includes(term) ||
                          admin.email.toLowerCase().includes(term) ||
                          admin.sports.toLowerCase().includes(term)
                        );
                      })
                      .map((admin) => (
                        <tr key={admin.id}>
                          <td className="px-4 py-2 border">
                            {admin.lastName} {admin.firstName}
                          </td>
                          <td className="px-4 py-2 border">{admin.email}</td>
                          <td className="px-4 py-2 border">{admin.sports}</td>
                          <td className="px-4 py-2 border">
                            {admin.isVerified ? "Yes" : "No"}
                          </td>
                          <td className="px-4 py-2 border">
                            {admin.isSuperAdminVerified ? "Yes" : "No"}
                          </td>
                          <td className="px-4 py-2 border">
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700"
                              onClick={() => openModal(admin)}
                            >
                              View
                            </button>
                            <button
                              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                              onClick={() => handleDeleteClick(admin)}
                            >
                              Archive
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {confirmDeleteAdmin && (
              <ConfirmModal
                message={`Are you sure you want to Archive ${confirmDeleteAdmin.firstName} ${confirmDeleteAdmin.lastName}?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
          </div>
        </main>

        <Footer />

        {isModalOpen && selectedAdmin && (
          <AdminModal
            admin={selectedAdmin}
            onClose={closeModal}
            onUpdate={handleUpdateAdmin}
          />
        )}
      </div>
    </div>
  );
}

export default AdminAccounts;
