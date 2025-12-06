import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../Footer/Footer";
import NavigationBar from "../../NavigationBar/NavigationBar";
import ViewStaffModal from "./ViewStaffModal"; // Make sure this path is correct

function AboutPage() {
  const [activeTab, setActiveTab] = useState("Mission");
  const [staffs, setStaffs] = useState([]);
  const [viewStaff, setViewStaff] = useState(null); // State for modal
  const API = import.meta.env.VITE_BBACKEND_URL;

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const res = await axios.get(`${API}/staffs/staff`);
      setStaffs(res.data);
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
  };

  const tabContent = {
    Mission: (
      <p className="text-gray-700 leading-relaxed">
        The College of Human Kinetics is assigned to provide holistic development
        of the learners through its basic services and specialized courses in
        physical education, sports science, dance, recreation, and wellness.
        It aims to produce 21st-century future educators and globally
        competitive graduates while also offering fitness programs to its
        associates.
      </p>
    ),
    Vision: (
      <p className="text-gray-700 leading-relaxed">
        The College of Human Kinetics aims to be the leading institution in its
        service area for physical education, sports science, and wellness.
        Human Kinetics promotes an interdisciplinary understanding of health and
        human movement, drawing from both social and natural sciences to advance
        knowledge that supports healthy individuals and communities.
      </p>
    ),
    Philosophy: (
      <p className="text-gray-700 leading-relaxed">
        The College of Human Kinetics develops academic and professional
        competence to enable individuals to earn a living, render service to
        society, and achieve full development of cultural, emotional,
        intellectual, physical, and social capabilities. The school offers
        programs and activities that form a holistically-developed person through
        physical and health education.
      </p>
    ),
    Objectives: (
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>
          Observe and explore the physical, biological, and social environment
          to effect necessary changes that promote a healthful and habitable
          community.
        </li>
        <li>
          Demonstrate enthusiasm and intellectual capacity for further studies in
          Human Kinetics, Health Education, and related disciplines.
        </li>
        <li>
          Produce graduates who can organize and administer sports programs,
          whether intramurals or extramurals.
        </li>
      </ul>
    ),
    Values: (
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Cooperation</li>
        <li>Humility</li>
        <li>Knowledge</li>
      </ul>
    ),
  };

  const tabs = ["Mission", "Vision", "Philosophy", "Objectives", "Values"];

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gray-600 h-[30vh] flex flex-col justify-center p-8 text-white">
          <h1 className="text-5xl font-bold mb-2">About Our Website</h1>
          <p className="text-lg">Learn more about us.</p>
        </section>

        {/* History Section */}
        <section className="bg-gray-100 p-8">
          <div className="bg-white rounded-lg p-6 mb-8 shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-700">
                Our History
              </h2>
              <p className="text-gray-600 mb-4">
                The College of Human Kinetics at Pamantasan ng Lungsod ng San
                Pablo has long been a center for athletic excellence and
                physical education. Founded with the goal of developing
                knowledgeable sports professionals, the college has grown into a
                leading institution for training athletes, coaches, and sports
                administrators.
              </p>
              <p className="text-gray-600">
                With strong commitment to academic rigor and athletic
                development, the college continues to shape the future of sports
                and wellness education.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src="/lib.jpg"
                alt="Our History"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Tab System */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
            <div className="flex space-x-6 border-b border-gray-300 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 font-semibold whitespace-nowrap ${activeTab === tab
                      ? "border-b-4 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-blue-500"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-gray-700 text-lg">{tabContent[activeTab]}</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <h3 className="text-red-500 text-5xl font-bold">30+</h3>
              <p className="text-gray-700 font-semibold">Faculty</p>
              <p className="text-gray-500 text-sm">
                Expert professors and coaches
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <h3 className="text-blue-500 text-5xl font-bold">14</h3>
              <p className="text-gray-700 font-semibold">Sports Programs</p>
              <p className="text-gray-500 text-sm">
                Recognized sports programs
              </p>
            </div>
          </div>

          {/* Leadership Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-3xl font-bold mb-8 text-gray-700">
              Our Leadership
            </h2>
            <div className="flex flex-col md:flex-row flex-wrap justify-start items-center gap-8">
              {staffs.length > 0 ? (
                staffs.map((staff) => (
                  <div
                    key={staff.id}
                    className="text-center w-60 md:w-64 lg:w-72 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
                  >
                    <div className="rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden border-2 border-gray-300">
                      <img
                        src={staff.imageURL || "/placeholder.png"}
                        alt={staff.firstName + " " + staff.lastName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-lg">
                      {staff.firstName} {staff.lastName}
                    </h4>
                    <p className="text-sm text-gray-500">{staff.position}</p>

                    {/* View Button */}
                    <button
                      onClick={() => setViewStaff(staff)}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      View
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No leadership data available.</p>
              )}
            </div>
          </div>

          {/* Staff Modal */}
          {viewStaff && (
            <ViewStaffModal
              staff={viewStaff}
              onClose={() => setViewStaff(null)}
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
