function Navbar() {
  return (
    <div className="ml-64 h-16 bg-white shadow flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-10">
      {/* Left Side - Logo and Title */}
      <div className="flex items-center space-x-3">
        {/* Placeholder Logo */}
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h1 className="text-lg font-semibold">
            Pamantasan ng Lungsod ng San Pablo
          </h1>
          <p className="text-sm text-gray-500">College of Human Kinetics</p>
        </div>
      </div>

      {/* Right Side - Buttons */}
      <div className="flex items-center space-x-3">
        <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow">
          🔔
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow">
          ⚙️
        </button>
      </div>
    </div>
  );
}

export default Navbar;
