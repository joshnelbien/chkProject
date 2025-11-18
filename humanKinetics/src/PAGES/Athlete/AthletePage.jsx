import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../Footer/Footer";
import NavigationBar from "../../NavigationBar/NavigationBar";

// Modal Component
const AthleteProfileModal = ({ athlete, onClose }) => {
  if (!athlete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-3xl font-bold leading-none"
        >
          &times;
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={athlete.image}
            alt={athlete.name}
            className="w-32 h-32 object-cover rounded-full mb-4"
          />

          <h2 className="text-3xl font-bold text-gray-800">{athlete.name}</h2>
          <p className="text-gray-600">
            {athlete.sport} • {athlete.year}
          </p>

          <div className="mt-4 text-left w-full">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Achievements
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              {athlete.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-left w-full">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Contact
            </h3>
            <p className="text-gray-600">Email: {athlete.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function AthletePage() {
  const [athletes, setAthletes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // "all" | "team" | "combat"

  const TEAM_SPORTS = [
    "basketball",
    "volleyball",
    "futsal",
    "sepak takraw",
    "table tennis",
    "badminton",
  ];

  const COMBAT_SPORTS = ["taekwondo", "arnis", "karate-do"];

  // Fetch players from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/userAccounts/players")
      .then((res) => {
        const mapped = res.data.map((p) => ({
          name: `${p.firstName} ${p.lastName}`,
          sport: p.sport.toLowerCase(),
          year: p.yearLevel,
          achievements: p.achievements
            ? p.achievements.split(",")
            : ["No achievements listed"],
          email: p.email,
          image: p.profilePicture
            ? `data:image/jpeg;base64,${p.profilePicture}` // <- fixed here
            : "/lexi.jpg",
        }));

        setAthletes(mapped);
      })
      .catch((err) => console.error("Error fetching players:", err));
  }, []);

  const handleViewProfile = (athlete) => {
    setSelectedAthlete(athlete);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAthlete(null);
    setIsModalOpen(false);
  };

  // Filter athletes by search + sport type
  const filteredAthletes = athletes.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.sport.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === "team") {
      return matchesSearch && TEAM_SPORTS.includes(a.sport);
    }
    if (filterType === "combat") {
      return matchesSearch && COMBAT_SPORTS.includes(a.sport);
    }
    return matchesSearch; // all
  });

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <main className="flex-grow pt-16">
        {/* HEADER */}
        <section className="bg-gray-600 h-[30vh] flex items-center justify-center text-white">
          <h1 className="text-5xl font-bold">Our Athletes</h1>
        </section>

        {/* BODY */}
        <section className="bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
              <div className="flex space-x-2 bg-white rounded-full p-1 border border-gray-300">
                <button
                  onClick={() => setFilterType("all")}
                  className={`py-2 px-6 rounded-full font-semibold ${
                    filterType === "all"
                      ? "bg-green-700 text-white"
                      : "text-gray-700"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType("team")}
                  className={`py-2 px-6 rounded-full font-semibold ${
                    filterType === "team"
                      ? "bg-green-700 text-white"
                      : "text-gray-700"
                  }`}
                >
                  Team Sports
                </button>
                <button
                  onClick={() => setFilterType("combat")}
                  className={`py-2 px-6 rounded-full font-semibold ${
                    filterType === "combat"
                      ? "bg-green-700 text-white"
                      : "text-gray-700"
                  }`}
                >
                  Individual Sports
                </button>
              </div>

              <input
                type="text"
                placeholder="Search Athletes..."
                className="py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* ATHLETE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAthletes.map((athlete, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 flex items-center justify-center">
                    <img
                      src={athlete.image}
                      alt={athlete.name}
                      className="w-40 h-40 max-w-full max-h-50 object-cover rounded-full my-4"
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-xl font-bold mt-2">{athlete.name}</h3>
                    <p className="text-gray-600">
                      {athlete.sport} • {athlete.year}
                    </p>
                    <p className="text-sm text-gray-500">
                      {athlete.achievements[0]}
                    </p>

                    <button
                      onClick={() => handleViewProfile(athlete)}
                      className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal — only opens when needed */}
      {isModalOpen && (
        <AthleteProfileModal athlete={selectedAthlete} onClose={closeModal} />
      )}
    </div>
  );
}

export default AthletePage;
