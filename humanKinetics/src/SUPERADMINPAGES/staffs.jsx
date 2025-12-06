import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Footer from "./Footer";

import AddStaffModal from "./modals/AddStaffModal";
import ConfirmModal from "./modals/ConfirmModal";
import ViewStaffModal from "./modals/ViewStaffModal";

function Staffs() {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [viewStaff, setViewStaff] = useState(null);

    const API = import.meta.env.VITE_BBACKEND_URL;

    useEffect(() => {
        fetchStaffs();
    }, []);

    const fetchStaffs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/staffs/staff`);
            setStaffs(res.data);
        } catch (error) {
            console.error("Error fetching staffs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirmDelete) return;
        try {
            await axios.delete(`${API}/staffs/staff/${confirmDelete.id}`);
            setStaffs(prev => prev.filter(s => s.id !== confirmDelete.id));
            setConfirmDelete(null);
            alert("Staff removed successfully.");
        } catch (error) {
            alert("Failed to delete staff.");
        }
    };

    const filteredStaffs = staffs.filter(s =>
        `${s.firstName} ${s.lastName} ${s.position}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={true} />
            <div className="flex-1 flex flex-col ml-15 md:ml-15 mt-16">
                <Navbar />

                <main className="flex-1 p-4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-bold mb-6">STAFF LIST</h1>

                        {/* Search + Add */}
                        <div className="flex justify-between mb-8">
                            <input
                                type="text"
                                placeholder="Search staff..."
                                className="border border-gray-400 p-2 w-64 rounded-sm shadow-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button
                                onClick={() => setAddModalOpen(true)}
                                className="px-4 py-2 bg-green-700 text-white font-semibold rounded hover:bg-green-800"
                            >
                                + Add Staff
                            </button>
                        </div>

                        {loading ? (
                            <p>Loading staffs...</p>
                        ) : filteredStaffs.length === 0 ? (
                            <p>No staff found.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredStaffs.map(staff => (
                                    <div
                                        key={staff.id}
                                        className="bg-white rounded-lg p-4 shadow-md text-center flex flex-col items-center"
                                    >
                                        <div className="rounded-full w-32 h-32 overflow-hidden mb-4">
                                            <img
                                                src={staff.imageURL || "/placeholder.png"}
                                                alt={`${staff.firstName} ${staff.lastName}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-lg">
                                           Name: {staff.lastName} {staff.firstName}
                                        </h3>
                                        <p className="text-sm text-gray-500">Position: {staff.position}</p>
                                        <p className="text-sm text-gray-600 mt-2">Description: {staff.description}</p>

                                        <div className="flex gap-2 mt-4">
                                            <button
                                                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                                onClick={() => setViewStaff(staff)}
                                            >
                                                View
                                            </button>

                                            <button
                                                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                                onClick={() => setConfirmDelete(staff)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Modals */}
                        {addModalOpen && (
                            <AddStaffModal onClose={() => setAddModalOpen(false)} refresh={fetchStaffs} />
                        )}

                        {viewStaff && (
                            <ViewStaffModal staff={viewStaff} onClose={() => setViewStaff(null)} />
                        )}

                        {confirmDelete && (
                            <ConfirmModal
                                message={`Remove ${confirmDelete.firstName} ${confirmDelete.lastName}?`}
                                onConfirm={handleDelete}
                                onCancel={() => setConfirmDelete(null)}
                            />
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default Staffs;
