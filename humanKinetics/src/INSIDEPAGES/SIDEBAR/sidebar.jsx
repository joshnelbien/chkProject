import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4 fixed left-0 top-0">
      {/* Logo / Title */}
      <div className="mb-6">
        <h1 className="text-lg font-bold">LOGO PLSP MYNAS</h1>
        <p className="text-sm text-gray-400">ATHLETIC DIVISION</p>
        <hr className="my-4 border-gray-700" />
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
        />
      </div>

      {/* Dashboard Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/overview" className="block hover:bg-gray-800 px-2 py-1 rounded">
              Overview
            </Link>
          </li>
          <li>
            <Link to="/medal-tally" className="block hover:bg-gray-800 px-2 py-1 rounded">
              Medal Tally
            </Link>
          </li>
          <li>
            <Link to="/training-program" className="block hover:bg-gray-800 px-2 py-1 rounded">
              Training Program
            </Link>
          </li>
        </ul>
      </div>

      {/* Performance Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2">Performance</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/analytics" className="block hover:bg-gray-800 px-2 py-1 rounded">
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/nutrition" className="block hover:bg-gray-800 px-2 py-1 rounded">
              Nutrition
            </Link>
          </li>
          <li>
            <Link to="/schedule" className="block hover:bg-gray-800 px-2 py-1 rounded">
              Schedule
            </Link>
          </li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2">Team</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/member" className="block hover:bg-gray-800 px-2 py-1 rounded">
              Member
            </Link>
          </li>
          <li>
            <Link to="/medical-record" className="block hover:bg-gray-800 px-2 py-1 rounded">
              Medical Record
            </Link>
          </li>
        </ul>
      </div>

      {/* School Section */}
      <div className="mb-4">
        <h2 className="uppercase text-gray-400 text-sm mb-2">School</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/sports-event" className="block hover:bg-gray-800 px-2 py-1 rounded">
              Sports Event
            </Link>
          </li>
          <li>
            <Link to="/staffs" className="block hover:bg-gray-800 px-2 py-1 rounded">
              Staffs
            </Link>
          </li>
        </ul>
        <hr className="my-4 border-gray-700" />
      </div>

      {/* User Container */}
      <div className="mt-auto p-3 bg-gray-800 rounded-lg">
        <p className="font-semibold">User Name</p>
        <p className="text-sm text-gray-400">user@email.com</p>
      </div>
    </div>
  );
}

export default Sidebar;
