/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ManageAccountModal from "./manageAccountModal";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [coach, setCoach] = useState(null);
  const [profileSrc, setProfileSrc] = useState("/lexi.jpg");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [manageAccountOpen, setManageAccountOpen] = useState(false);
  const API = import.meta.env.VITE_BBACKEND_URL;

  const navigate = useNavigate();
  const { id } = useParams();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // ==========================
  // FETCH COACH PROFILE
  // ==========================
  const fetchCoach = async () => {
    try {
      const res = await axios.get(
        `${API}/adminAccounts/coaches-profile/${id}`
      );
      const data = res.data;
      setCoach(data);

      if (data?.id && data?.profilePicture) {
        setProfileSrc(`${API}/adminAccounts/coach-photo/${data.id}`);
      } else {
        setProfileSrc("/lexi.jpg");
      }
    } catch (err) {
      console.error("Error fetching coach:", err);
      setProfileSrc("/lexi.jpg");
    }
  };

  useEffect(() => {
    if (id) fetchCoach();
  }, [id]);

  // ==========================
  // LOGOUT HANDLING
  // ==========================
  const handleLogoutClick = () => setShowLogoutModal(true);

 const handleConfirmLogout = async () => {
  // Log the logout activity
  try {
    await axios.post(`${API}/logs/logs`, {
      firstName: coach?.firstName || "Admin",
      lastName: coach?.lastName || "",
      email: coach?.email || "", 
      sport: "N/A",
      description: "Logged Out", // ✅ Description
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      role: "admin",
    });
    console.log("📝 Logout activity logged successfully");
  } catch (err) {
    console.error("❌ Failed to log logout activity:", err);
  }

  // Proceed to logout
  setShowLogoutModal(false);
  navigate("/");
};
  const handleCancelLogout = () => setShowLogoutModal(false);

  // ==========================
  // LOGOUT MODAL
  // ==========================
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-1">Are you sure you want to logout?</p>
            <p className="text-gray-500 text-sm mb-6">
              You will need to sign in again to access the admin dashboard.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={handleCancelLogout}
                className="flex-1 bg-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================
  // RENDER
  // ==========================
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center p-4 bg-green-800 text-white fixed top-0 left-0 w-full z-50">
        <button onClick={toggleSidebar}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <h1 className="ml-3 font-bold">PLSP MYNAS</h1>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 text-white flex flex-col p-4 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
        style={{ backgroundColor: "#006837" }}
      >
        {/* COACH PROFILE CARD */}
        <div className="p-4 mx-2 bg-green-700 rounded-2xl flex flex-col items-center text-center space-y-2 shadow-md">
          <img
            src={profileSrc}
            alt="Coach"
            className="h-16 w-16 rounded-full object-cover border-2 border-white"
            onError={() => setProfileSrc("/lexi.jpg")}
          />

          <p className="font-bold text-white uppercase text-sm">
            {coach ? `${coach.firstName} ${coach.lastName}` : "Loading..."}
          </p>

          <p className="text-xs text-gray-300">
            {coach?.sports ? coach.sports.toUpperCase() : "COACH"}
          </p>

          <div
            className={`mt-2 w-fit px-4 py-1 rounded-full text-xs font-semibold border 
            ${coach?.isVerified ? "border-green-600 text-green-700 bg-green-50" : "border-red-600 text-red-700 bg-red-50"}`}
          >
            {coach?.isVerified ? "Email Verified" : "Email Not Verified"}
          </div>

          {/* Manage Account */}
          <button
            onClick={() => setManageAccountOpen(true)}
            className="mt-3 bg-white text-green-800 font-semibold text-xs px-4 py-1.5 rounded-lg shadow hover:bg-gray-200 transition"
          >
            Manage Account
          </button>
        </div>

        <hr className="my-4 border-gray-400/40 mx-3" />

        {/* MENU SECTIONS */}
        <SidebarSection title="Dashboard">
          <SidebarLink to={`/admin-overview/${id}`} label="Overview" />
          <SidebarLink to={`/admin-team/${id}`} label="Teams" />
          <SidebarLink to={`/admin-athletes/${id}`} label="Athletes" />
        </SidebarSection>

        <SidebarSection title="Managements">
          <SidebarLink to={`/admin-schedule/${id}`} label="Schedule" />
          <SidebarLink to={`/admin-attendance/${id}`} label="Attendance" />
        </SidebarSection>

        <SidebarSection title="Events">
          <SidebarLink to={`/admin-tournament/${id}`} label="Tournaments" />
          <SidebarLink to={`/admin-training/${id}`} label="Training" />
        </SidebarSection>

        <SidebarSection>
          <LogoutButton onClick={handleLogoutClick} />
        </SidebarSection>
      </div>

      <LogoutModal />

      <ManageAccountModal
        open={manageAccountOpen}
        onClose={() => setManageAccountOpen(false)}
        id={id}
      />
    </>
  );
}

/* === REUSABLE COMPONENTS === */
function SidebarSection({ title, children }) {
  return (
    <div className="mb-4">
      {title && <h2 className="uppercase text-gray-300 text-sm mb-2 pl-2">{title}</h2>}
      <ul className="space-y-1">{children}</ul>
    </div>
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
        className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white"
      >
        Logout
      </button>
    </li>
  );
}

export default AdminSidebar;
