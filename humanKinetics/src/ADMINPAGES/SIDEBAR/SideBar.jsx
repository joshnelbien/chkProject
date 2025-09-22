import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="h-screen w-64 text-white flex flex-col p-4 fixed left-0 top-0"
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

      {/* Main Menu Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">Main Menu</h2>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/admin-overview"
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
              to="/admin-team"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-athletes"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Athletes
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Managements Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">Managements</h2>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/admin-schedule"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Schedule
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-attendance"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Attendance
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-performance"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Performance
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Events Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">Events</h2>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/admin-tournament"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Tournaments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-training"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-700"
                }`
              }
            >
              Training
            </NavLink>
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
  );
}

export default Sidebar;
