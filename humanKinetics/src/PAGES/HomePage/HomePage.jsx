import { useState } from 'react';
import Footer from "../../Footer/Footer";
import NavigationBar from "../../NavigationBar/NavigationBar";

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

 
  const heroContent = [
    {
      title: "Excellence in Athletics",
      subtitle: "Empowering athletes through world-class training and education",
      image: "/t1.png",
    },
    {
      title: "TAGAAN FESTIVAL",
      subtitle: "This is the second slide for the hero section.",
      image: "/t2.png",
    },
    {
      title: "5v5 ICE TUBIG",
      subtitle: "The third slide showcases more information.",
      image: "/t3.png",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroContent.length) % heroContent.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    const swipeDistance = touchStart - touchEnd;

    if (swipeDistance > 50) {
      handleNext();
    } else if (swipeDistance < -50) {
      handlePrev();
    }
  };

  // Get the current content and image
  const currentSlide = heroContent[currentIndex];
  const currentImage = currentSlide.image;

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <main className="flex-grow pt-16">
        <section
          className="relative bg-gray-600 h-[60vh] flex items-center justify-center p-8 transition-opacity duration-500 ease-in-out"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            // Add the background image style here
            backgroundImage: `url(${currentImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // Optional: Add a subtle overlay to make text readable
            '::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
              zIndex: 1,
            },
          }}
        >
          {/* Text content with a higher z-index to be on top of the overlay */}
          <div className="text-white text-center relative z-10">
            <h1 className="text-6xl font-bold mb-4">{currentSlide.title}</h1>
            <p className="text-xl">{currentSlide.subtitle}</p>
          </div>
          
          {/* Navigation dots */}
          <div className="absolute bottom-4 flex space-x-2 z-10">
            {heroContent.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-white" : "bg-white opacity-50"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </section>

        <section className="bg-gray-100 p-8">
          <h2 className="text-4xl font-bold mb-8 text-[#1E4620]">E-Athleta Online Profiling System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-[#1A237E]">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-500 hover:underline text-lg">Student Portal</a></li>
                <li><a href="#" className="text-blue-500 hover:underline text-lg">Sports Programs</a></li>
                <li><a href="#" className="text-blue-500 hover:underline text-lg">Training Schedule</a></li>
                <li><a href="#" className="text-blue-500 hover:underline text-lg">Event Calendar</a></li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-[#1A237E]">Latest News</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">New Sports Complex</h4>
                  <p className="text-sm text-gray-500">March 20, 2024</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Athlete Recognition</h4>
                  <p className="text-sm text-gray-500">March 18, 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-[#1A237E]">Upcoming Events</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg text-[#1A237E]">LCUAA Championships</h4>
                  <p className="text-sm text-gray-500">April 5-10, 2024</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[#1A237E]">Sports Festival</h4>
                  <p className="text-sm text-gray-500">April 15-20, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="bg-[#1E4620] text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto text-4xl font-bold mb-2">
                14
              </div>
              <p className="text-lg font-medium text-gray-700">Sports Programs</p>
            </div>
            <div>
              <div className="bg-[#1A237E] text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto text-4xl font-bold mb-2">
                250+
              </div>
              <p className="text-lg font-medium text-gray-700">Student Athletes</p>
            </div>
            <div>
              <div className="bg-[#B71C1C] text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto text-4xl font-bold mb-2">
                30
              </div>
              <p className="text-lg font-medium text-gray-700">Expert Coaches</p>
            </div>
            <div>
              <div className="bg-[#F9A825] text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto text-4xl font-bold mb-2">
                50+
              </div>
              <p className="text-lg font-medium text-gray-700">Championships</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;