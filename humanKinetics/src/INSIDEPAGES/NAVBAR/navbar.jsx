import { Bell, Sun, Menu } from "lucide-react";

function Navbar({ toggleSidebar }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-20 bg-green-900 text-white shadow flex items-center justify-between h-16 px-4 md:px-6
                 md:left-64 left-0 w-full md:w-[calc(100%-16rem)] transition-all"
    >
      <div className="flex items-center space-x-3">
        {/* Mobile toggle button */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center bg-green-700 hover:bg-green-800 rounded-lg shadow-md transition-colors"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden">
          <img
            src="/plsplogo.png"
            alt="PLSP Logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="hidden sm:flex flex-col">
          <h1 className="text-lg font-semibold">
            Pamantasan ng Lungsod ng San Pablo
          </h1>
          <p className="text-sm text-gray-300">Insitute of Human Kinetics</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
