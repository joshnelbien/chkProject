import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Footer from "./Footer";
import AdminModal from "./modals/AdminModal";

function AdminAccounts() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/adminAccounts/admins`);
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

  // **Callback to refresh table and modal after verification**
  const handleUpdateAdmin = (updatedAdmin) => {
    // Update the admin in the state
    setAdmins((prev) =>
      prev.map((a) => (a.id === updatedAdmin.id ? updatedAdmin : a))
    );
    // Update modal data
    setSelectedAdmin(updatedAdmin);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={true} />
      <div className="flex-1 flex flex-col ml-15 md:ml-15 mt-16">
        <Navbar />
        <main className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Accounts</h1>
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
                    {admins.map((admin) => (
                      <tr key={admin.id}>
                        <td className="px-4 py-2 border">{admin.lastName} {admin.firstName}</td>
                        <td className="px-4 py-2 border">{admin.email}</td>
                        <td className="px-4 py-2 border">{admin.sports}</td>
                        <td className="px-4 py-2 border">{admin.isVerified ? "Yes" : "No"}</td>
                        <td className="px-4 py-2 border">{admin.isSuperAdminVerified ? "Yes" : "No"}</td>
                        <td className="px-4 py-2 border">
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700"
                            onClick={() => openModal(admin)}
                          >
                            View
                          </button>
                          <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
        <Footer />

        {isModalOpen && selectedAdmin && (
          <AdminModal
            admin={selectedAdmin}
            onClose={closeModal}
            onUpdate={handleUpdateAdmin} // Pass the callback
          />
        )}
      </div>
    </div>
  );
}

export default AdminAccounts;
