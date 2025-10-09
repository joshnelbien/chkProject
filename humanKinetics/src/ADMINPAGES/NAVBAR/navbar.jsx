import { Bell, Sun } from "lucide-react"; // Import Bell and Sun icons

function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-green-900 text-white shadow flex items-center justify-between px-6 z-40 md:ml-64 transition-all duration-300">
      {/* Left Side - Logo and Title */}
      <div className="flex items-center space-x-3">
         {/* Placeholder Logo */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/plsplogo.png"
            alt="PLSP Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold">
            Pamantasan ng Lungsod ng San Pablo
          </h1>
          <p className="text-sm text-gray-300">College of Human Kinetics</p>
        </div>
      </div>

      {/* Right Side - Buttons */}
      <div className="flex items-center space-x-3">
        <button className="w-10 h-10 flex items-center justify-center bg-green-700 hover:bg-green-800 rounded-lg shadow-md transition-colors">
          <Bell size={24} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-green-700 hover:bg-green-800 rounded-lg shadow-md transition-colors">
          <Sun size={24} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
