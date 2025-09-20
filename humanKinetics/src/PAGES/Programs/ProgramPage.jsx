import { useState } from 'react';
import Footer from "../../Footer/Footer";
import NavigationBar from "../../NavigationBar/NavigationBar";

// Modal Component
const ProgramModal = ({ program, onClose }) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-3xl font-bold leading-none"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{program.name}</h2>
        <img src={program.image} alt={program.name} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="text-gray-600 mb-4">{program.description}</p>
        <div className="text-gray-500 text-sm space-y-2">
          <div className="flex items-center">
            <span className="mr-2">👤</span>
            <span>{program.coach}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">⏰</span>
            <span>{program.schedule}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <span>{program.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function ProgramPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = {
    basketball: {
      name: "Basketball",
      description: "Elite basketball program developing complete athletes through comprehensive training. Our program focuses on fundamental skills, strategic gameplay, and physical conditioning to prepare players for competitive leagues.",
      coach: "Coach Robert Santos",
      schedule: "Mon-Sat, 6:00 AM - 8:00 AM",
      location: "PLSP Pavilion",
      image: "/lexi.jpg"
    },
    volleyball: {
      name: "Volleyball",
      description: "Championship volleyball program with state-of-the-art training methods. We emphasize teamwork, advanced techniques, and mental toughness to achieve peak performance on the court.",
      coach: "Coach Maria Reyes",
      schedule: "Mon-Sat, 4:00 PM - 6:00 PM",
      location: "PLSP Pavilion",
      image: "/lexi.jpg"
    }
  };

  const handleViewDetails = (programKey) => {
    setSelectedProgram(programs[programKey]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gray-600 h-[40vh] flex flex-col items-center justify-center p-8 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Sports Programs</h1>
          <p className="text-lg">Developing champions through excellence in sports training and education</p>
        </section>

        {/* Programs Section */}
        <section className="bg-gray-100 p-8">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <button className="bg-gray-700 text-white py-2 px-6 rounded-l-full font-semibold">Team Sports</button>
            <button className="bg-white text-gray-700 py-2 px-6 rounded-r-full font-semibold border border-gray-300">Combat Sports</button>
          </div>

          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basketball Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 flex items-center justify-center">
                <img src={programs.basketball.image} alt="Basketball Program" className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-gray-700 text-white text-sm font-bold px-3 py-1 rounded-full">Team Sport</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{programs.basketball.name}</h3>
                <p className="text-gray-600 mb-4">
                  {programs.basketball.description.split('.')[0]}.
                </p>
                <div className="text-gray-500 text-sm space-y-2">
                  <div className="flex items-center">
                    <span className="mr-2">👤</span>
                    <span>{programs.basketball.coach}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">⏰</span>
                    <span>{programs.basketball.schedule}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span>{programs.basketball.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails('basketball')}
                  className="mt-6 w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Volleyball Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 flex items-center justify-center">
                <img src={programs.volleyball.image} alt="Volleyball Program" className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-gray-700 text-white text-sm font-bold px-3 py-1 rounded-full">Team Sport</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{programs.volleyball.name}</h3>
                <p className="text-gray-600 mb-4">
                  {programs.volleyball.description.split('.')[0]}.
                </p>
                <div className="text-gray-500 text-sm space-y-2">
                  <div className="flex items-center">
                    <span className="mr-2">👤</span>
                    <span>{programs.volleyball.coach}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">⏰</span>
                    <span>{programs.volleyball.schedule}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span>{programs.volleyball.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails('volleyball')}
                  className="mt-6 w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* The Modal */}
      <ProgramModal program={selectedProgram} onClose={closeModal} />
    </div>
  );
}

export default ProgramPage;