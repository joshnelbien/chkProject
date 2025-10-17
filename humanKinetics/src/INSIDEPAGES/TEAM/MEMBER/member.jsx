import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { Search, LayoutGrid, Menu } from "lucide-react";

function Member() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [teamId, setTeamId] = useState(null);

  // ✅ 1️⃣ Fetch the logged-in user's teamId
  useEffect(() => {
    const fetchTeamId = async () => {
      if (!id) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/userAccounts/players-profile/${id}`
        );
        const fetchedTeamId = res.data.teamId;
        setTeamId(fetchedTeamId);
      } catch (error) {
        console.error("Error fetching teamId:", error);
      }
    };
    fetchTeamId();
  }, [id]);

  // ✅ 2️⃣ Fetch all members of that team
  useEffect(() => {
    const fetchMembers = async () => {
      if (!teamId) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/teams/player/${teamId}`
        );
        const mappedMembers = res.data.map((m) => ({
          id: m.id,
          name: `${m.firstName} ${m.lastName}`,
          position: m.position || "Unknown",
          attendance: m.attendance || 0,
          performance: m.performance || 0,
          status: m.status || "Pending",
          profilePicture: m.profilePicture || null,
        }));
        setMembers(mappedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, [teamId]);

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Helper to get member profile image
  const getProfileImage = (member) => {
    if (member.profilePicture && member.id) {
      return `http://localhost:5000/userAccounts/player-photo/${member.id}`;
    } else {
      return "/lexi.jpg"; // default placeholder
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-grow p-6 mt-16">
          <h1 className="text-2xl font-bold text-green-700 mb-6">
            Team Members
          </h1>

          {/* Search & controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
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

          {/* Members grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center"
              >
                {/* ✅ Profile Picture */}
                <img
                  src={getProfileImage(member)}
                  alt={member.name}
                  onError={(e) => (e.target.src = "/lexi.jpg")}
                  className="w-24 h-24 rounded-full object-cover border-2 border-green-600 shadow-md mb-4"
                />

                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-500 mb-4">{member.position}</p>

                {/* Attendance */}
                <div className="w-full mb-3">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>Attendance</span>
                    <span>{member.attendance}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${member.attendance}%` }}
                    ></div>
                  </div>
                </div>

                {/* Performance */}
                <div className="w-full mb-4">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>Performance</span>
                    <span>{member.performance}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${member.performance}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex justify-between w-full text-sm font-semibold">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      member.status === "In Team"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {member.status}
                  </span>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-700 transition-colors"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Member;
