import { useState } from 'react';
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
            src={coach.image}
            alt={coach.name}
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <span className={`text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block ${coach.sportColor}`}>{coach.sport}</span>
          <h2 className="text-3xl font-bold text-gray-800">{coach.name}</h2>
          <p className="text-gray-600 mb-4">{coach.experience}</p>
        </div>
        <div className="mt-4 text-left w-full space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Education & Certifications</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {coach.education.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Specialization</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {coach.specialization.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Key Achievements</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {coach.achievements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function CoachesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const coaches = [
    {
      name: "Coach Roberto Santos",
      sport: "Basketball",
      sportColor: "bg-yellow-500",
      experience: "15 years Experience",
      image: "/lexi.jpg",
      education: [
        "Master in Sports Science, BPEd Physical Education",
        "FIBA Level 3 Coach",
        "Sports Psychology Certification"
      ],
      specialization: ["Offensive Plays & Player Development"],
      achievements: [
        "LCUAA Champion Coach 2023",
        "Best Coach of the Year Award",
        "Regional Coach Excellence Award"
      ]
    },
    {
      name: "Coach Maria Reyes",
      sport: "Volleyball",
      sportColor: "bg-blue-500",
      experience: "12 years Experience",
      image: "/lexi.jpg",
      education: [
        "BS Physical Education, Sports Management",
        "PSVA Certified Coach",
        "FIVB Level 2 Coach"
      ],
      specialization: ["Defensive Strategies & Team Building"],
      achievements: [
        "Best Coach - LCUAA 2023",
        "LCUAA Champion Coach Award",
        "Regional Champions Coach 2022"
      ]
    },
    {
      name: "Coach Michael Dela Cruz",
      sport: "Arnis",
      sportColor: "bg-red-500",
      experience: "20 years Experience",
      image: "/lexi.jpg",
      education: [
        "BA in Sport Management, Traditional Martial Arts Master",
        "Master's Level Arnis Coach",
        "Advanced Weaponry Training Specialist"
      ],
      specialization: ["Combat Techniques & Form"],
      achievements: [
        "National Arnis Coach of the Year 2023",
        "LCUAA Arnis Champions 2023",
        "Traditional Martial Arts Hall of Fame"
      ]
    },
    {
      name: "Coach Sarah Park",
      sport: "Taekwondo",
      sportColor: "bg-purple-500",
      experience: "18 years Experience",
      image: "/lexi.jpg",
      education: [
        "BA in Sport Science, Advanced Master Arts Studies",
        "National TKD Poomsae Master",
        "International TKD Certificate"
      ],
      specialization: ["Poomsae & Sparring Techniques"],
      achievements: [
        "LCUAA Outstanding Coach 2023",
        "Best Poomsae Coach of the Year Award",
        "Asian Games Coach Representative"
      ]
    }
  ];

  const handleViewProfile = (coachData) => {
    setSelectedCoach(coachData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoach(null);
  };

  // Filter coaches based on the search query
  const filteredCoaches = coaches.filter(coach =>
    coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.sport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <main className="flex-grow pt-16">
        <section className="bg-gray-600 h-[30vh] flex flex-col items-center justify-center p-8 text-white text-center">
          <h1 className="text-5xl font-bold">Our Coaching Staff</h1>
        </section>

        <section className="bg-gray-100 p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Expert Coaches, Champion Results</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Our dedicated coaching staff brings years of experience and expertise to develop the next generation of athletes. Each coach is committed to excellence in both sports and character development.
          </p>
        </section>

        <section className="bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
              <div className="flex space-x-2 bg-white rounded-full p-1 border border-gray-300">
                <button className="bg-green-700 text-white py-2 px-6 rounded-full font-semibold">All Sports</button>
                <button className="py-2 px-6 rounded-full text-gray-700 font-semibold">Basketball</button>
                <button className="py-2 px-6 rounded-full text-gray-700 font-semibold">Volleyball</button>
                <button className="py-2 px-6 rounded-full text-gray-700 font-semibold">Combat Sports</button>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCoaches.map((coach, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <span className={`text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block ${coach.sportColor}`}>{coach.sport}</span>
                  <div className="flex items-start space-x-6">
                    <div className="w-32 h-32 rounded-lg flex-shrink-0 overflow-hidden">
                      <img src={coach.image} alt={coach.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{coach.name}</h3>
                      <p className="text-gray-600 mb-2">{coach.experience}</p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-700">Education & Certifications</p>
                        <ul className="text-sm text-gray-500 list-disc list-inside">
                          {coach.education.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <p className="text-sm font-semibold text-gray-700 mt-2">Specialization</p>
                        <ul className="text-sm text-gray-500 list-disc list-inside">
                          {coach.specialization.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <p className="text-sm font-semibold text-gray-700 mt-2">Key Achievements</p>
                        <ul className="text-sm text-gray-500 list-disc list-inside">
                          {coach.achievements.map((item, i) => <li key={i}>{item}</li>)}
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
      
      {/* The Modal */}
      <CoachProfileModal coach={selectedCoach} onClose={closeModal} />
    </div>
  );
}

export default CoachesPage;