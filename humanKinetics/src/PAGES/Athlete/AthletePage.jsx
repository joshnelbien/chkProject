import { useState } from 'react';
import Footer from "../../Footer/Footer";
import NavigationBar from "../../NavigationBar/NavigationBar";

// Modal Component for Athlete Profile
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
          <p className="text-gray-600">{athlete.sport} • {athlete.year}</p>
          <div className="mt-4 text-left w-full">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Achievements</h3>
            <ul className="list-disc list-inside text-gray-600">
              {athlete.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 text-left w-full">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Contact</h3>
            <p className="text-gray-600">
              Email: {athlete.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function AthletePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const athletes = [
    {
      name: "Juan Santos",
      sport: "Basketball",
      year: "4th Year",
      achievements: ["LCUAA MVP 2023", "Team Captain"],
      email: "juan.santos@example.com",
      image: "/lexi.jpg",
    },
    {
      name: "Maria Osawa",
      sport: "Volleyball",
      year: "3rd Year",
      achievements: ["Best Setter • LCUAA 2023", "Most Valuable Player • City Games"],
      email: "maria.osawa@example.com",
      image: "/lexi.jpg",
    },
    {
      name: "Pedro Reyes",
      sport: "Basketball",
      year: "2nd Year",
      achievements: ["Mythical Five • LCUAA 2023"],
      email: "pedro.reyes@example.com",
      image: "/lexi.jpg",
    },
    {
      name: "Ana Cruz",
      sport: "Volleyball",
      year: "4th Year",
      achievements: ["MVP Spiker • LCUAA 2023"],
      email: "ana.cruz@example.com",
      image: "/lexi.jpg",
    },
    {
      name: "Miguel Lopez",
      sport: "Arnis",
      year: "3rd Year",
      achievements: ["Arnis Rookie • LCUAA 2023", "Bronze Medalist • Regional Arnis Tournament"],
      email: "miguel.lopez@example.com",
      image: "/lexi.jpg",
    },
    {
      name: "Sofia Torres",
      sport: "Taekwondo",
      year: "2nd Year",
      achievements: ["Gold Medalist • LCUAA 2023"],
      email: "sofia.torres@example.com",
      image: "/lexi.jpg",
    },
  ];

  const handleViewProfile = (athleteData) => {
    setSelectedAthlete(athleteData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAthlete(null);
  };
  
  // Filter athletes based on search query
  const filteredAthletes = athletes.filter(athlete =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    athlete.sport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <main className="flex-grow pt-16">
        <section className="bg-gray-600 h-[30vh] flex items-center justify-center text-white">
          <h1 className="text-5xl font-bold">Our Athletes</h1>
        </section>

        <section className="bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
              <div className="flex space-x-2 bg-white rounded-full p-1 border border-gray-300">
                <button className="bg-green-700 text-white py-2 px-6 rounded-full font-semibold">All</button>
                <button className="py-2 px-6 rounded-full text-gray-700 font-semibold">Team Sports</button>
                <button className="py-2 px-6 rounded-full text-gray-700 font-semibold">Individual Sports</button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Athletes..."
                  className="py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAthletes.map((athlete, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 flex items-center justify-center">
                    <img src={athlete.image} alt={athlete.name} className="w-full h-auto object-cover" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mt-2">{athlete.name}</h3>
                    <p className="text-gray-600">{athlete.sport} • {athlete.year}</p>
                    <p className="text-sm text-gray-500">{athlete.achievements[0]}</p>
                    <button
                      onClick={() => handleViewProfile(athlete)}
                      className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-12 px-8 text-center">
          <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-700">Join Our Athletic Program</h2>
            <p className="text-gray-600 mb-6">
              Are you passionate about sports and looking to excel both academically and athletically? Join our promising athletic program at the College of Human Kinetics.
            </p>
            <button className="bg-green-700 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-800">
              Inquire
            </button>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* The Modal */}
      <AthleteProfileModal athlete={selectedAthlete} onClose={closeModal} />
    </div>
  );
}

export default AthletePage;