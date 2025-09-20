import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";

function Sidebar() {
  return (
    <div className="h-screen w-64 text-white flex flex-col p-4 fixed left-0 top-0" style={{ backgroundColor: '#006837' }}>
      {/* Logo / Title */}
      <div className="flex items-center mb-6 pl-4 pt-4">
        {/* Placeholder for the logo circle */}
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
      
      {/* Search Bar */}
      <div className="relative mb-6 mx-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-green-700 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={20} />
      </div>

      {/* Dashboard Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">Dashboard</h2>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/medal-tally"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Medal Tally
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/training-program"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Training Program
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Performance Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">Performance</h2>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/nutrition"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Nutrition
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Schedule
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">Team</h2>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/member"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Members
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/medicalRecord"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Medical Records
            </NavLink>
          </li>
        </ul>
      </div>
      
      {/* School Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">School</h2>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/sportEvent"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Sports Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staffs"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Staffs
            </NavLink>
          </li>
        </ul>
      </div>
      
      {/* Spacer to push user info to the bottom */}
      <div className="flex-grow"></div>

      {/* User Container */}
      <div className="p-4 mx-2 bg-green-700 rounded-lg flex items-center">
        {/* Placeholder for the user's picture */}
        <div className="h-10 w-10 bg-gray-200 rounded-full mr-4"></div>
        <div className="flex flex-col">
          <p className="font-semibold text-white">Airus Cosico</p>
          <p className="text-sm text-gray-300">Basketball Team</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;