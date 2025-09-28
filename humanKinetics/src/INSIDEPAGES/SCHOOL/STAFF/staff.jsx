import { useState } from "react";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function Staff() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Container */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content */}
        <main className="flex-grow p-6 mt-16">
          <h1 className="text-2xl font-bold text-green-700 mb-6">
            PLSP Leadership & Staff
          </h1>

          {/* School Founder Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              School Founder
            </h2>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div>
                <h3 className="text-xl font-bold">Dr. James Mitchell</h3>
                <p className="text-green-700 font-semibold">
                  School Founder & President
                </p>
                <p className="text-gray-600 italic">
                  Establishing excellence in sports education and athletic
                  development
                </p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700">
                    PhD Sports Science
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700">
                    MBA Sports Management
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sports Dean Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Sports Dean
            </h2>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div>
                <h3 className="text-xl font-bold">Dr. Sarah Anderson</h3>
                <p className="text-green-700 font-semibold">Dean of Sports</p>
                <p className="text-gray-600">20+ years in Sports Education</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Athletic Program Oversight</li>
                  <li>Sports Curriculum Development</li>
                  <li>Coach Management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Head Coaches Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Head Coaches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="text-lg font-bold">Robert Thompson</h3>
                  <p className="text-green-700 font-semibold">
                    Head Coach - Basketball
                  </p>
                  <p className="text-gray-600 text-sm">15 years Experience</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-700">
                      FIBA Level 3
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-700">
                      Advanced Training
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="text-lg font-bold">Maria Rodriguez</h3>
                  <p className="text-green-700 font-semibold">
                    Head Coach - Volleyball
                  </p>
                  <p className="text-gray-600 text-sm">12 years Experience</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-700">
                      FIVB Level 2
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-700">
                      Youth Development
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CHK Teachers Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              CHK Teachers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="text-lg font-bold">Prof. Michael Chen</h3>
                  <p className="text-green-700 font-semibold">
                    Sports Psychology
                  </p>
                  <p className="text-gray-600 text-sm">
                    Athletic Mental Training
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="text-lg font-bold">Dr. Emily White</h3>
                  <p className="text-green-700 font-semibold">Sports Science</p>
                  <p className="text-gray-600 text-sm">Performance Analysis</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Staff;
