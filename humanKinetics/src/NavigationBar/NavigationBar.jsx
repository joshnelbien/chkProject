import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);

  // Define a custom theme color for Tailwind using a style object
  const navBgColor = '#1E4620';
  const highlightColor = '#20E81C';

  const routes = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/program", name: "Programs" },
    { path: "/athletes", name: "Athletes" },
    { path: "/coaches", name: "Coaches" },
    { path: "/event", name: "Events" },
    { path: "/contact", name: "Contact" },
    { path: "/login", name: "Login" }
  ];

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLinkClick = (path) => {
    // This is for demonstration purposes. In a real app with react-router-dom,
    // the Link component would handle the navigation and the highlight would be
    // automatically updated by the useEffect hook below.
    setActivePath(path);
  };

  useEffect(() => {
    // This effect ensures the active path is updated when the URL changes.
    // In a production app, this would be crucial for the highlight to work.
    const handlePopState = () => {
      setActivePath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-300
      ${isDarkMode ? 'dark' : ''}`}
      style={{ backgroundColor: navBgColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Text */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            <img 
              src="/plsplogo.png" 
              alt="PLSP Logo" 
              className="h-12 w-12 rounded-full border-2 border-white" 
            />
            <div className="flex flex-col text-white">
              <h1 className="text-lg md:text-xl font-semibold">Pamantasan ng Lungsod ng San Pablo</h1>
              <h2 className="text-sm md:text-base text-gray-300">College of Human Kinetics</h2>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {routes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                onClick={() => handleLinkClick(route.path)}
                className={`transition-colors duration-300 font-medium rounded-lg px-3 py-2
                  ${activePath === route.path
                    ? `text-[${highlightColor}]`
                    : 'text-white hover:text-gray-300'
                  }`}
              >
                {route.name}
              </a>
            ))}
            <button
              onClick={handleDarkModeToggle}
              className="p-2 rounded-full text-white hover:text-gray-300 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
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
            <button
              onClick={handleDarkModeToggle}
              className="ml-2 p-2 rounded-full text-white hover:text-gray-300 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          className={`md:hidden shadow-lg transition-colors duration-300
          ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
        >
          <div className="space-y-2 px-4 py-3">
            {routes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                onClick={() => {
                  setIsOpen(false);
                  handleLinkClick(route.path);
                }}
                className={`block font-medium rounded-lg px-3 py-2
                  ${activePath === route.path
                    ? `text-[${highlightColor}]`
                    : 'text-gray-700 hover:text-gray-900'
                  }
                  ${isDarkMode ? 'dark:text-gray-200 dark:hover:text-white' : ''}
                `}
              >
                {route.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavigationBar;
