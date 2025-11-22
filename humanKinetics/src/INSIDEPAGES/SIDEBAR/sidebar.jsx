/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function Sidebar({ isOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [profileSrc, setProfileSrc] = useState("/lexi.jpg");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ✅ Fetch player profile
  const fetchPlayer = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/userAccounts/players-profile/${id}`
      );
      const data = res.data;
      setPlayer(data);

      // ✅ If a profile picture exists, use backend image route
      if (data?.id && data?.profilePicture) {
        setProfileSrc(
          `http://localhost:5000/userAccounts/player-photo/${data.id}`
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

  // ✅ Handle "Manage Account" navigation
  const handleManageAccount = () => {
    navigate(`/manageAccount/${id}`);
  };

  // ✅ Handle logout confirmation
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // ✅ Handle logout confirmation
  const handleConfirmLogout = async () => {
    // Log the logout activity
    try {
      await axios.post("http://localhost:5000/logs/logs", {
        email: player?.email || "", 
        description: "Logged Out", // ✅ Description
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        role: "athlete",
      });
      console.log("📝 Logout activity logged successfully");
    } catch (err) {
      console.error("❌ Failed to log logout activity:", err);
    }

    // Proceed to logout
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
              You will need to sign in again to access your account.
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
      <div
        className={`fixed top-0 left-0 h-screen w-64 text-white flex flex-col p-4 z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:h-auto`}
        style={{ backgroundColor: "#006837", overflowY: "auto" }}
      >
        {/* ✅ Player Info */}
        <div className="p-4 mx-2 bg-green-700 rounded-2xl flex flex-col items-center text-center space-y-2 shadow-md">
          <img
            src={profileSrc}
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm"
            onError={() => setProfileSrc("/lexi.jpg")} // fallback if image fails
          />

          <div className="w-full">
            <p
              className="font-bold text-white uppercase text-sm truncate"
              title={
                player ? `${player.firstName} ${player.lastName}` : "Loading..."
              }
            >
              {player ? `${player.firstName} ${player.lastName}` : "Loading..."}
            </p>
            <p className="text-xs text-gray-300 tracking-wide">
              {player
                ? player.sport
                  ? player.sport.toUpperCase()
                  : "NO SPORT ASSIGNED"
                : ""}
            </p>

            {/* ✅ Manage Account Button */}
            <button
              onClick={handleManageAccount}
              className="mt-2 text-xs font-semibold bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all duration-200"
            >
              Manage Account
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-t border-gray-400/40 mx-4" />

        {/* Navigation Sections */}
        <SidebarSection title="Dashboard">
          <SidebarLink to={`/overview/${id}`} label="Overview" />
          <SidebarLink to={`/medal-tally/${id}`} label="Medal Tally" />
          <SidebarLink
            to={`/training-program/${id}`}
            label="Training Program"
          />
        </SidebarSection>

        <SidebarSection title="Performance">
          <SidebarLink to={`/analytics/${id}`} label="Analytics" />

          <SidebarLink to={`/schedule/${id}`} label="Schedule" />
        </SidebarSection>

        <SidebarSection title="Team">
          <SidebarLink to={`/member/${id}`} label="Members" />
          <SidebarLink to={`/medicalRecord/${id}`} label="Medical Records" />
        </SidebarSection>

        <SidebarSection title="School">
          <SidebarLink to={`/sportEvent/${id}`} label="Sports Events" />
          <SidebarLink to={`/staffs/${id}`} label="Staffs" />
        </SidebarSection>

        <SidebarSection>
          <LogoutButton onClick={handleLogoutClick} />
        </SidebarSection>

        <div className="flex-grow"></div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal />
    </>
  );
}

/* Sidebar Section Component */
function SidebarSection({ title, children }) {
  return (
    <div className="mb-4">
      {title && (
        <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">{title}</h2>
      )}
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

/* Sidebar Link Component */
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

/* Logout Button Component */
function LogoutButton({ onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-red-700 hover:text-white text-gray-200"
      >
        Logout
      </button>
    </li>
  );
}

export default Sidebar;
