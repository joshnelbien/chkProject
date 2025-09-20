import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { Search, LayoutGrid, Menu } from "lucide-react";

function Member() {
  const members = [
    { name: "Sarah Johnson", position: "Forward", attendance: 95, performance: 88, status: "Active" },
    { name: "Michael Chen", position: "Midfielder", attendance: 92, performance: 85, status: "Active" },
    { name: "Emma Wilson", position: "Defender", attendance: 78, performance: 72, status: "Inactive" },
    { name: "James Brown", position: "Forward", attendance: 90, performance: 86, status: "Active" },
    { name: "Lisa Anderson", position: "Goalkeeper", attendance: 94, performance: 89, status: "Active" },
    { name: "David Miller", position: "Midfielder", attendance: 82, performance: 75, status: "Inactive" },
  ];

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          <h1 className="text-2xl font-bold text-green-700 mb-6">Team Members</h1>

          {/* Controls and Search */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search members..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex space-x-2 items-center">
              <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold shadow">
                All Members
              </button>
              <button className="p-2 rounded-lg bg-gray-200 text-gray-800 shadow">
                <LayoutGrid size={24} />
              </button>
              <button className="p-2 rounded-lg bg-gray-200 text-gray-800 shadow">
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-500 mb-4">{member.position}</p>
                
                {/* Attendance */}
                <div className="w-full mb-3">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>Attendance</span>
                    <span>{member.attendance}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${member.attendance}%` }}></div>
                  </div>
                </div>

                {/* Performance */}
                <div className="w-full mb-4">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>Performance</span>
                    <span>{member.performance}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${member.performance}%` }}></div>
                  </div>
                </div>

                {/* Status and Action */}
                <div className="flex justify-between w-full text-sm font-semibold">
                  <span className={`px-3 py-1 rounded-full ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {member.status}
                  </span>
                  <a href="#" className="text-gray-600 hover:text-green-700 transition-colors">
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
}

export default Member;