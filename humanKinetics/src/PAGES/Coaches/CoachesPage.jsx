import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../Footer/Footer";
import NavigationBar from "../../NavigationBar/NavigationBar";

// Modal Component for Coach Profile
const CoachProfileModal = ({ coach, onClose }) => {
  if (!coach) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-xl w-full relative shadow-lg my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-3xl font-bold leading-none"
        >
          &times;
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={coach.profilePictureUrl}
            alt={coach.firstName}
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <span
            className={`text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block bg-green-600`}
          >
            {coach.sports}
          </span>
          <h2 className="text-3xl font-bold text-gray-800">
            {coach.firstName} {coach.lastName}
          </h2>
          <p className="text-gray-600 mb-4">{coach.experience}</p>
        </div>

        <div className="mt-4 text-left w-full space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Education & Certifications
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {(coach.education || "")
                .toString()
                .split(",")
                .map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Specialization
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {(coach.specialization || "")
                .toString()
                .split(",")
                .map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Key Achievements
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {(coach.achievements || "")
                .toString()
                .split(",")
                .map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function CoachesPage() {
  const API = import.meta.env.VITE_BBACKEND_URL;
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGroup, setFilterGroup] = useState("all");

  // TEAM SPORTS LIST
  const TEAM_SPORTS = [
    "basketball",
    "volleyball",
    "futsal",
    "sepak takraw",
    "table tennis",
    "badminton",
  ];

  // COMBAT SPORTS LIST
  const COMBAT_SPORTS = ["taekwondo", "arnis", "karate-do"];

  // Fetch backend coaches
  useEffect(() => {
    axios
      .get(`${API}/adminAccounts/coaches`)
      .then((res) => {
        const updated = res.data.map((coach) => ({
          ...coach,
          firstName: coach.name.split(" ")[0],
          lastName: coach.name.split(" ").slice(-1)[0],
          sports: coach.sport,
          profilePictureUrl: coach.image || "/defaultProfile.png",

          education: coach.education.join(","),
          specialization: coach.specialization.join(","),
          achievements: coach.achievements.join(","),
        }));
        setCoaches(updated);
        setFilteredCoaches(updated);
      })
      .catch((err) => console.error("Error fetching coaches:", err));
  }, []);

  // Filtering logic
  useEffect(() => {
    let list = [...coaches];

    if (filterGroup === "team") {
      list = list.filter((c) => TEAM_SPORTS.includes(c.sports?.toLowerCase()));
    } else if (filterGroup === "combat") {
      list = list.filter((c) =>
        COMBAT_SPORTS.includes(c.sports?.toLowerCase())
      );
    }

    list = list.filter(
      (coach) =>
        `${coach.firstName} ${coach.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        coach.sports?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCoaches(list);
  }, [searchQuery, filterGroup, coaches]);

  const handleViewProfile = (coach) => {
    setSelectedCoach(coach);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <main className="flex-grow pt-16">
        <section className="bg-gray-600 h-[30vh] flex flex-col items-center justify-center p-8 text-white text-center">
          <h1 className="text-5xl font-bold">Our Coaching Staff</h1>
        </section>

        <section className="bg-gray-100 p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Expert Coaches, Champion Results
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Our coaching staff brings experience and commitment to develop
            future champions.
          </p>
        </section>

        <section className="bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
              <div className="flex space-x-2 bg-white rounded-full p-1 border border-gray-300">
                <button
                  onClick={() => setFilterGroup("all")}
                  className={`py-2 px-6 rounded-full font-semibold ${
                    filterGroup === "all"
                      ? "bg-green-700 text-white"
                      : "text-gray-700"
                  }`}
                >
                  All Sports
                </button>

                <button
                  onClick={() => setFilterGroup("team")}
                  className={`py-2 px-6 rounded-full font-semibold ${
                    filterGroup === "team"
                      ? "bg-green-700 text-white"
                      : "text-gray-700"
                  }`}
                >
                  Team Sports
                </button>

                <button
                  onClick={() => setFilterGroup("combat")}
                  className={`py-2 px-6 rounded-full font-semibold ${
                    filterGroup === "combat"
                      ? "bg-green-700 text-white"
                      : "text-gray-700"
                  }`}
                >
                  Combat Sports
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search coaches..."
                  className="py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Coaches List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCoaches.map((coach) => (
                <div
                  key={coach.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <span className="text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block bg-green-600">
                    {coach.sports}
                  </span>

                  <div className="flex items-start space-x-6">
                    <div className="w-32 h-32 rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={coach.profilePictureUrl}
                        alt={coach.firstName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold">
                        {coach.firstName} {coach.lastName}
                      </h3>
                      <p className="text-gray-600 mb-2">{coach.experience}</p>

                      <div className="space-y-1">
                        {/* Education */}
                        <p className="text-sm font-semibold text-gray-700">
                          Education
                        </p>
                        <ul className="text-sm text-gray-500 list-disc list-inside">
                          {(coach.education || "")
                            .toString()
                            .split(",")
                            .map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                        </ul>

                        {/* Specialization */}
                        <p className="text-sm font-semibold text-gray-700 mt-2">
                          Specialization
                        </p>
                        <ul className="text-sm text-gray-500 list-disc list-inside">
                          {(coach.specialization || "")
                            .toString()
                            .split(",")
                            .map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                        </ul>

                        {/* Achievements */}
                        <p className="text-sm font-semibold text-gray-700 mt-2">
                          Achievements
                        </p>
                        <ul className="text-sm text-gray-500 list-disc list-inside">
                          {(coach.achievements || "")
                            .toString()
                            .split(",")
                            .map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewProfile(coach)}
                    className="mt-6 w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800"
                  >
                    View Full Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal */}
      {isModalOpen && (
        <CoachProfileModal
          coach={selectedCoach}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCoach(null); // <-- Important!
          }}
        />
      )}
    </div>
  );
}

export default CoachesPage;
