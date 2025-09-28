import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for toggle icons

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

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
                to="/admin-overview"
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
                to="/admin-team"
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
                to="/admin-athletes"
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
                to="/admin-schedule"
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
                to="/admin-attendance"
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
                to="/admin-performance"
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
                to="/admin-tournament"
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
                to="/admin-training"
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
    </>
  );
}

export default Sidebar;
