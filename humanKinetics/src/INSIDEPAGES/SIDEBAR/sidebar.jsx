import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 text-white flex flex-col p-4 z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:h-auto`}
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

        {/* Search Bar */}
        <div className="relative mb-6 mx-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-green-700 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            size={20}
          />
        </div>

        {/* Navigation Sections */}
        <SidebarSection title="Dashboard">
          <SidebarLink to="/overview" label="Overview" />
          <SidebarLink to="/medal-tally" label="Medal Tally" />
          <SidebarLink to="/training-program" label="Training Program" />
        </SidebarSection>

        <SidebarSection title="Performance">
          <SidebarLink to="/analytics" label="Analytics" />
          <SidebarLink to="/nutrition" label="Nutrition" />
          <SidebarLink to="/schedule" label="Schedule" />
        </SidebarSection>

        <SidebarSection title="Team">
          <SidebarLink to="/member" label="Members" />
          <SidebarLink to="/medicalRecord" label="Medical Records" />
        </SidebarSection>

        <SidebarSection title="School">
          <SidebarLink to="/sportEvent" label="Sports Events" />
          <SidebarLink to="/staffs" label="Staffs" />
        </SidebarSection>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* User Container */}
        <div className="p-4 mx-2 bg-green-700 rounded-lg flex items-center">
          <div className="h-10 w-10 bg-gray-200 rounded-full mr-4"></div>
          <div className="flex flex-col">
            <p className="font-semibold text-white">Airus Cosico</p>
            <p className="text-sm text-gray-300">Basketball Team</p>
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

/* Sidebar Section Component */
function SidebarSection({ title, children }) {
  return (
    <div className="mb-4">
      <h2 className="uppercase text-gray-400 text-sm mb-2 pl-2">{title}</h2>
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
