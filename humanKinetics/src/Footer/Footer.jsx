import { MapPin } from "lucide-react";

function Footer() {
  const navBgColor = '#1E4620';

  return (
    <footer className="w-full text-white py-12" style={{ backgroundColor: navBgColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 border-b border-gray-600 pb-10 mb-6">
          {/* Section 1: Logo, Text, and Social Media */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/plsplogo.png" 
                alt="PLSP Logo" 
                className="h-10 w-10 rounded-full border-2 border-white"
              />
              <div className="flex flex-col">
                <h3 className="text-base font-semibold">PLSP</h3>
                <h4 className="text-sm text-gray-300">College of Human Kinetics</h4>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Developing future champions and leaders in sports through excellence in education and athletic training.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.016 3.655 9.183 8.423 9.873V15.2h-2.1V12h2.1V9.45c0-2.072 1.26-3.21 3.102-3.21.884 0 1.642.064 1.865.093v2.162l-1.282.001c-1.028 0-1.228.487-1.228 1.258V12h2.51l-.407 3.2h-2.103v6.673A9.877 9.877 0 0 0 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"/><circle cx="16.5" cy="7.5" r="1.5"/></svg>
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="about" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="coaches" className="text-gray-300 hover:text-white transition-colors duration-300">Coaching Staff</a></li>
              <li><a href="athletes" className="text-gray-300 hover:text-white transition-colors duration-300">Athletes</a></li>
              <li><a href="event" className="text-gray-300 hover:text-white transition-colors duration-300">Events</a></li>
              <li><a href="contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Section 3: Training Venues */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Training Venues</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <MapPin size={20} className="text-gray-300 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white">PLSP Pavilion</h4>
                  <p className="text-gray-300">
                    Team Sports Training Facility<br/>Brgy. San Jose, San Pablo City
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin size={20} className="text-gray-300 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white">Ticzon Building</h4>
                  <p className="text-gray-300">
                    Combat Sports Training Center<br/>Brgy. San Jose, San Pablo City
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2024 Institute of Human Kinetics. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
