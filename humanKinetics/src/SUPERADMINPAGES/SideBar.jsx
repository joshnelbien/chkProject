import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/"); // redirect to login
  };
  const handleCancelLogout = () => setShowLogoutModal(false);

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-green-900 text-white flex flex-col p-4 z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:h-auto`}
      >
        {/* Super Admin Info */}
        <div className="p-4 mx-2 bg-green-700 rounded-2xl flex flex-col items-center text-center space-y-2 shadow-md">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-green-900 font-bold text-lg">
            SA
          </div>
          <p className="font-bold text-white uppercase text-sm">Super Admin</p>
        </div>

        <hr className="my-4 border-t border-gray-400/40 mx-2" />

        {/* Navigation */}
        <ul className="space-y-2">
          <SidebarLink to="/super-adminAccounts" label="Admin" />
          <SidebarLink to="/super-adminPlayer" label="Player" />
          <SidebarLink to="/super-adminLogs" label="Logs" />
          <LogoutButton onClick={handleLogoutClick} />
        </ul>

        <div className="flex-grow"></div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCancelLogout}
                className="bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="bg-red-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SidebarLink({ to, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block px-4 py-2 rounded-lg transition-colors ${
            isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
          }`
        }
      >
        {label}
      </NavLink>
    </li>
  );
}

function LogoutButton({ onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white text-gray-200 transition-colors"
      >
        Logout
      </button>
    </li>
  );
}

export default Sidebar;
