/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function Sidebar({ isOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [profileSrc, setProfileSrc] = useState("/lexi.jpg");

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
          <SidebarLink to={`/nutrition/${id}`} label="Nutrition" />
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
          <SidebarLink to="/" label="Logout" />
        </SidebarSection>

        <div className="flex-grow"></div>
      </div>
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

export default Sidebar;
