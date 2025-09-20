import { useState } from 'react';
import Footer from "../../Footer/Footer";
import NavigationBar from "../../NavigationBar/NavigationBar";

// Modal Component for Event Details
const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative shadow-lg my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-3xl font-bold leading-none"
        >
          &times;
        </button>
        <div className="flex flex-col items-center text-center">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="flex justify-center flex-wrap gap-2 mb-4">
            <span className={`text-white text-sm font-bold px-3 py-1 rounded-full ${event.statusColor}`}>{event.status}</span>
            <span className="bg-gray-700 text-white text-sm font-bold px-3 py-1 rounded-full">{event.sport}</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h2>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <span className="mr-2">📅</span>
            <span>{event.date}</span>
            <span className="ml-4 mr-2">📍</span>
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-4 text-left w-full">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">About this Event</h3>
          <p className="text-gray-600 mb-4">{event.description}</p>
          {event.extraDetails && (
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Details:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {event.extraDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function EventPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const events = [
    {
      title: "LCUAA Basketball Championships 2024",
      date: "March 19-25, 2024",
      location: "PLSP Pavilion",
      description: "The premier collegiate basketball tournament featuring the university's tops. Both men's and women's divisions will compete for the championship title. Expect intense competition, thrilling plays, and a showcase of emerging basketball talent.",
      sport: "Basketball",
      status: "Upcoming",
      statusColor: "bg-orange-500",
      image: "/lexi.jpg",
      extraDetails: [
        "Team registration deadline: March 10, 2024",
        "Free admission for students with valid ID",
        "Concessions available on-site"
      ]
    },
    {
      title: "LCUAA Volleyball Tournament 2024",
      date: "March 22-26, 2024",
      location: "PLSP Pavilion",
      description: "Annual volleyball competition showcasing the best collegiate volleyball teams. The tournament will feature both indoor and beach volleyball events.",
      sport: "Volleyball",
      status: "Upcoming",
      statusColor: "bg-orange-500",
      image: "/lexi.jpg",
      extraDetails: [
        "Men's and Women's divisions",
        "Championship match on March 26 at 5:00 PM",
        "Awards ceremony to follow the final game"
      ]
    },
    {
      title: "LCUAA Arnis Championships",
      date: "April 3-5, 2024",
      location: "Ticzon Building",
      description: "A showcase of traditional Filipino martial arts. The championship will include individual and team competitions in various categories, including live stick sparring and forms (anyo).",
      sport: "Arnis",
      status: "Upcoming",
      statusColor: "bg-orange-500",
      image: "/lexi.jpg",
      extraDetails: [
        "Open to all registered Arnis athletes",
        "Judging criteria based on technique, power, and strategy",
        "Guest performance by a master Arnis practitioner"
      ]
    },
    {
      title: "LCUAA Taekwondo Tournament",
      date: "April 12-14, 2024",
      location: "Ticzon Building",
      description: "An exciting display of martial arts skill and discipline. Competitions will include both Kyorugi (sparring) and Poomsae (forms) across different weight divisions and belt levels.",
      sport: "Taekwondo",
      status: "Upcoming",
      statusColor: "bg-orange-500",
      image: "/lexi.jpg",
      extraDetails: [
        "Official WTF rules apply",
        "Judges are certified by the Philippine Taekwondo Association",
        "Medals and certificates for all winners"
      ]
    },
  ];

  const handleViewDetails = (eventData) => {
    setSelectedEvent(eventData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.sport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <main className="flex-grow pt-16">
        <section className="bg-gray-600 h-[30vh] flex items-center justify-center text-white">
          <h1 className="text-5xl font-bold">Sports Events</h1>
        </section>

        <section className="bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
              <div className="flex space-x-2 bg-white rounded-full p-1 border border-gray-300">
                <button className="bg-green-700 text-white py-2 px-6 rounded-full font-semibold">All Events</button>
                <button className="py-2 px-6 rounded-full text-gray-700 font-semibold">Basketball</button>
                <button className="py-2 px-6 rounded-full text-gray-700 font-semibold">Volleyball</button>
                <button className="py-2 px-6 rounded-full text-gray-700 font-semibold">Combat Sports</button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-64">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className={`text-white text-sm font-bold px-3 py-1 rounded-full mr-2 ${event.statusColor}`}>{event.status}</span>
                      <span className="bg-gray-700 text-white text-sm font-bold px-3 py-1 rounded-full">{event.sport}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-2 mb-2">
                      <span className="mr-2">📅</span>
                      <span>{event.date}</span>
                      <span className="ml-4 mr-2">📍</span>
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description.split('.')[0]}.</p>
                    <button
                      onClick={() => handleViewDetails(event)}
                      className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-12 px-8 text-center">
          <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-700">Want to organize an event?</h2>
            <p className="text-gray-600 mb-6">
              If you're interested in organizing a sports event or tournament at our facilities, we'd love to hear from you.
            </p>
            <button className="bg-green-700 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-800">
              Contact Us
            </button>
          </div>
        </section>
      </main>

      <Footer />
      
      <EventModal event={selectedEvent} onClose={closeModal} />
    </div>
  );
}

export default EventPage;