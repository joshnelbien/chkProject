import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Footer from "../../Footer/Footer"
import NavigationBar from "../../NavigationBar/NavigationBar"

// Fix for default marker icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function MapComponent() {
  const position = [14.0734, 121.3262]; // Coordinates for the specified location

  return (
    <div className="w-full h-full">
      <MapContainer 
        center={position} 
        zoom={18} 
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            College of Human Kinetics<br />
            Pamantasan ng Lungsod ng San Pablo
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <NavigationBar />

      {/* Page content (fills available space) */}
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gray-600 h-[30vh] flex items-center justify-center text-white">
          <h1 className="text-5xl font-bold">Contact Us</h1>
        </section>

        {/* Contact Info and Form Section */}
        <section className="bg-white p-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Get in Touch */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-700">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Have questions about our sports programs or facilities? We're here to help. Fill out the form and we'll get back to you as soon as possible.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="text-3xl text-green-700 mr-4">📍</span>
                  <div>
                    <h4 className="font-bold text-lg">Visit Us</h4>
                    <p className="text-gray-600">
                      College of Human Kinetics<br />
                      Pamantasan ng Lungsod ng San Pablo<br />
                      Brgy. San Jose, San Pablo City<br />
                      Laguna, Philippines
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-3xl text-green-700 mr-4">✉️</span>
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <p className="text-gray-600">
                      info@plsp.edu.ph<br />
                      sports@plsp.edu.ph
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-3xl text-green-700 mr-4">📞</span>
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <p className="text-gray-600">
                      (049) 123-4567<br />
                      0912-345-6789
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Send Us a Message Form */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-700">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Enter message subject"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-800"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-gray-100 py-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-700">Find Us Here</h2>
          <div className="h-96 w-full max-w-6xl mx-auto">
            <MapComponent />
          </div>
        </section>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  )
}

export default ContactPage