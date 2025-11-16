/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { Menu, X } from "lucide-react"; // for toggle icons
import { useEffect, useState } from "react";

import { NavLink, useNavigate, useParams } from "react-router-dom";



function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const [coach, setCoach] = useState();
  const [profileSrc, setProfileSrc] = useState("/lexi.jpg");

  const navigate = useNavigate();


  // ✅ Get the ID from the URL (e.g., /admin-overview/:id)
  const { id } = useParams();

  const fetchPlayer = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/adminAccount/coach-profile/${id}`
      );
      const data = res.data;
      setCoach(data);

      // ✅ If a profile picture exists, use backend image route
      if (data?.id && data?.profilePicture) {
        setProfileSrc(
          `http://localhost:5000/adminAccount/coach-photo/${data.id}`
        );
      } else {
        setProfileSrc("/lexi.jpg");
      }
    } catch (err) {
      console.error("Error fetching player:", err);
      setProfileSrc("/lexi.jpg");
    }
  };

  useEffect(() => {
    if (id) fetchPlayer();
  }, [id]);

  // ✅ Handle logout confirmation
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsOpen(false); // Close sidebar on mobile when logout is clicked
  };

  // ✅ Handle logout confirmation
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/");
  };

  // ✅ Handle cancel logout
  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // ✅ Logout Confirmation Modal
  const LogoutModal = () => {
    if (!showLogoutModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg 
                className="w-8 h-8 text-yellow-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-2">
              Are you sure you want to logout?
            </p>
            <p className="text-gray-500 text-sm mb-6">
              You will need to sign in again to access the admin dashboard.
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={handleCancelLogout}
                className="flex-1 bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-400 transition duration-150 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-red-700 transition duration-150 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center p-4 bg-green-800 text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <h1 className="ml-3 font-bold text-lg">PLSP MYNAS</h1>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 text-white flex flex-col p-4 z-50 transform bg-green-800 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block`}
        style={{ backgroundColor: "#006837" }}
      >
        {/* Logo / Title */}
        <div className="flex items-center mb-6 pl-4 pt-4">
          <div className="h-12 w-12 rounded-full mr-4 overflow-hidden">
            <img
              src="/lexi.jpg"
              alt="PLSP Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-white">PLSP MYNAS</h1>
            <p className="text-sm text-gray-300">Athletic Division</p>
          </div>
        </div>

        {/* Main Menu */}
        <div className="mb-4">
          <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">
            Main Menu
          </h2>
          <ul className="space-y-1">
            <li>
              <NavLink
                to={`/admin-overview/${id}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-700 font-semibold"
                      : "hover:bg-green-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/admin-team/${id}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-700 font-semibold"
                      : "hover:bg-green-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Teams
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/admin-athletes/${id}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-700 font-semibold"
                      : "hover:bg-green-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Athletes
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Managements */}
        <div className="mb-4">
          <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">
            Managements
          </h2>
          <ul className="space-y-1">
            <li>
              <NavLink
                to={`/admin-schedule/${id}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-700 font-semibold"
                      : "hover:bg-green-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/admin-attendance/${id}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-700 font-semibold"
                      : "hover:bg-green-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Attendance
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/admin-performance/${id}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-700 font-semibold"
                      : "hover:bg-green-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Performance
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Events */}
        <div className="mb-4">
          <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">Events</h2>
          <ul className="space-y-1">
            <li>
              <NavLink
                to={`/admin-tournament/${id}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-700 font-semibold"
                      : "hover:bg-green-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Tournaments
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/admin-training/${id}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-700 font-semibold"
                      : "hover:bg-green-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Training
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogoutClick}
                className="w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-red-700 hover:text-white text-gray-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* User Info */}
        <div className="p-4 mx-2 bg-green-700 rounded-lg flex items-center">
          <div className="h-10 w-10 bg-gray-200 rounded-full mr-4"></div>
          <div className="flex flex-col">
            <p className="font-semibold text-white">Airus Cosico</p>
            <p className="text-sm text-gray-300">Basketball Coach</p>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal />
    </>
  );
}

export default Sidebar;
