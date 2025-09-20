import Footer from "../../Footer/Footer"
import NavigationBar from "../../NavigationBar/NavigationBar"

function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <NavigationBar />

      {/* Page content (fills available space) */}
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gray-600 h-[30vh] flex flex-col justify-center p-8 text-white">
          <h1 className="text-5xl font-bold mb-2">About our website</h1>
          <p className="text-lg">Learn more about us.</p>
        </section>

        {/* Content Section */}
        <section className="bg-gray-100 p-8">
          {/* Our History */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-700">Our History</h2>
              <p className="text-gray-600 mb-4">
                The College of Human Kinetics at Pamantasan ng Lungsod ng San Pablo has been a cornerstone of athletic excellence and physical education since its establishment. Our journey began with a vision to develop skilled and knowledgeable sports professionals who would contribute to the advancement of Philippine sports.
              </p>
              <p className="text-gray-600">
                Driven by a commitment to academic rigor and athletic prowess, the college has grown into a leading institution, fostering the next generation of athletes, coaches, and sports administrators.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/lexi.jpg" alt="Our History" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-700">Our Mission</h2>
            <p className="text-gray-600">
              To provide quality education and training in sports science, physical education, and athletics, fostering the development of competent and ethical sports professionals who will contribute to the advancement of Philippine sports.
            </p>
          </div>

          {/* Tabbed Section (simplified) */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
            <div className="flex space-x-4 border-b-2 border-gray-200 mb-4">
              <button className="py-2 px-4 border-b-4 border-blue-500 text-blue-500 font-semibold">Mission</button>
              <button className="py-2 px-4 text-gray-500">Vision</button>
              <button className="py-2 px-4 text-gray-500">Values</button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-red-500 text-5xl font-bold">30+</h3>
              <p className="text-gray-700 font-semibold">Faculty</p>
              <p className="text-gray-500 text-sm">Expert professors and coaches</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-blue-500 text-5xl font-bold">14</h3>
              <p className="text-gray-700 font-semibold">Sports Programs</p>
              <p className="text-gray-500 text-sm">Recognized Sports Programs</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-green-500 text-5xl font-bold">95%</h3>
              <p className="text-gray-700 font-semibold">Success Rate</p>
              <p className="text-gray-500 text-sm">Graduate Employment Rate</p>
            </div>
          </div>

          {/* Our Leadership */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-3xl font-bold mb-8 text-gray-700">Our Leadership</h2>
            <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <div className="rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden">
                  <img src="/lexi.jpg" alt="Dr. Juan Dela Cruz" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-semibold text-lg">Dr. Juan Dela Cruz</h4>
                <p className="text-sm text-gray-500">College Dean</p>
              </div>
              <div className="text-center">
                <div className="rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden">
                  <img src="/lexi.jpg" alt="Prof. Maria Santos" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-semibold text-lg">Prof. Maria Santos</h4>
                <p className="text-sm text-gray-500">Associate Dean</p>
              </div>
              <div className="text-center">
                <div className="rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden">
                  <img src="/lexi.jpg" alt="Prof. Pedro Reyes" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-semibold text-lg">Prof. Pedro Reyes</h4>
                <p className="text-sm text-gray-500">Department Head</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  )
}

export default AboutPage