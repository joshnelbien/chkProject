import { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Footer from "../../Footer/Footer";
import NavigationBar from "../../NavigationBar/NavigationBar";

// Fix Marker Icon Issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Map Component
function MapComponent() {
  const position = [14.0734, 121.3262];

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
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            College of Human Kinetics <br />
            Pamantasan ng Lungsod ng San Pablo
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

function ContactPage() {
  const API = import.meta.env.VITE_BBACKEND_URL;
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });

  // 🔥 Loading state
  const [loading, setLoading] = useState(false);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ⏳ Start loading

    try {
      const res = await axios.post(`${API}/contact`, formData);

      if (res.data.success) {
        alert("Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: ""
        });
      }
    } catch (error) {
      alert("Failed to send message.");
    } finally {
      setLoading(false); // ⏹️ Stop loading
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavigationBar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gray-600 h-[30vh] flex items-center justify-center text-white">
          <h1 className="text-5xl font-bold">Contact Us</h1>
        </section>

        {/* Contact Section */}
        <section className="bg-white p-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-700">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Have questions about our sports programs or facilities? We're here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="text-3xl text-green-700 mr-4">📍</span>
                  <div>
                    <h4 className="font-bold text-lg">Visit Us</h4>
                    <p className="text-gray-600">
                      College of Human Kinetics <br />
                      Pamantasan ng Lungsod ng San Pablo <br />
                      Brgy. San Jose, San Pablo City <br />
                      Laguna, Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-3xl text-green-700 mr-4">✉️</span>
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <p className="text-gray-600">
                      info@plsp.edu.ph <br />
                      sports@plsp.edu.ph
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-3xl text-green-700 mr-4">📞</span>
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <p className="text-gray-600">
                      (049) 123-4567 <br />
                      0912-345-6789
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-700">Send us a Message</h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold text-white 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"}`}
                >
                  {loading ? "Sending..." : "Send Message"}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ContactPage;
