import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);

  // Use Tailwind-compatible custom colors by using classes or inline styles properly
  const navBgColor = "#1E4620";
  const highlightBgColor = "#467346";

  const routes = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },

    { path: "/athletes", name: "Athletes" },
    { path: "/coaches", name: "Coaches" },
    { path: "/event", name: "Events" },
    { path: "/contact", name: "Contact" },
    { path: "/login", name: "Login" },
  ];

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const handleLinkClick = (path) => {
    setActivePath(path);
  };

  useEffect(() => {
    const handlePopState = () => {
      setActivePath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-300`}
      style={{ backgroundColor: navBgColor }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Text */}
          <div className="flex-shrink-0 flex items-center pl-2 md:pl-4">
            <img
              src="/plsplogo.png"
              alt="PLSP Logo"
              className="h-12 w-12 rounded-full border-2 border-white"
            />
            <div className="flex flex-col text-white ml-3">
              <h1 className="text-[10px] md:text-xl font-semibold leading-tight">
                Pamantasan ng Lungsod ng San Pablo
              </h1>
              <h2 className="text-[8px] md:text-base text-gray-300">
                 Institute of Human Kinetics.
              </h2>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {routes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                onClick={() => handleLinkClick(route.path)}
                className={`transition-colors duration-300 font-medium rounded-lg px-3 py-2 ${
                  activePath === route.path
                    ? "text-white"
                    : "text-white hover:text-gray-300"
                }`}
                style={
                  activePath === route.path
                    ? { backgroundColor: highlightBgColor }
                    : {}
                }
              >
                {route.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-gray-300 focus:outline-none rounded-full"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full transform transition-transform duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-5 opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
        }}
      >
        <div className="space-y-1 px-4 py-3">
          {routes.map((route) => (
            <a
              key={route.path}
              href={route.path}
              onClick={() => {
                setIsOpen(false);
                handleLinkClick(route.path);
              }}
              className={`block font-medium rounded-lg px-3 py-2 ${
                activePath === route.path
                  ? "text-white"
                  : isDarkMode
                  ? "text-gray-200"
                  : "text-gray-800"
              }`}
              style={
                activePath === route.path
                  ? { backgroundColor: highlightBgColor }
                  : {}
              }
            >
              {route.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
