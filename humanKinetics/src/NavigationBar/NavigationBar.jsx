import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/program", name: "Programs" },
    { path: "/athletes", name: "Athletes" },
    { path: "/coaches", name: "Coaches" },
    { path: "/event", name: "Events" },
    { path: "/contact", name: "Contact" },
    
    
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
            plsp
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {route.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="space-y-2 px-4 py-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavigationBar;
