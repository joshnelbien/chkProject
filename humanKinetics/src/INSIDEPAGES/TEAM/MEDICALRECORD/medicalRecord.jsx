import { useState } from "react";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function MedicalRecord() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // default closed

  const personalInfo = [
    { label: "Age", value: "21" },
    { label: "Height", value: "5'9\"" },
    { label: "Weight", value: "175 lbs" },
    { label: "Blood Type", value: "O+" },
    { label: "Allergies", value: "None" },
    { label: "Emergency Contact", value: "Jane Doe - 0912-345-6789" },
  ];

  const vitals = [
    { label: "Last Checked", value: "Sep 19, 2025" },
    { label: "Blood Pressure", value: "120/80" },
    { label: "Heart Rate", value: "75 bpm" },
    { label: "Temperature", value: "36.8°C" },
  ];

  const medications = [
    "Ibuprofen 200mg (as needed)",
    "Vitamin C supplement (daily)",
  ];

  const appointments = [
    { date: "Oct 1, 2025", event: "Physical Therapy Session" },
  ];

  const recentUpdates = [
    { date: "Sep 19, 2025", update: "Vitals checked and recorded." },
    { date: "Sep 16, 2025", update: "Initial diagnosis of knee sprain." },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main container */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main content */}
        <main className="flex-grow mt-16 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-green-700">
              Personal Medical Record
            </h1>
            <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
              Download Record
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              {personalInfo.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-sm text-gray-500">{item.label}</h3>
                  <p className="font-semibold text-lg">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Medical Data */}
            <div className="space-y-6">
              {/* Current Condition */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>Current Condition</span>
                  <span>Started: Sep 15, 2025</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-red-500">
                    Knee Sprain
                  </h3>
                  <span className="text-sm text-gray-500">
                    Expected Recovery: Oct 1, 2025
                  </span>
                </div>
                <p className="text-gray-600">Recovery Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-green-700 h-2.5 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>

              {/* Latest Vitals */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-4">Latest Vitals</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {vitals.map((item, idx) => (
                    <div key={idx} className="p-2 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Medications */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-4">
                  Current Medications
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {medications.map((med, idx) => (
                    <li key={idx}>{med}</li>
                  ))}
                </ul>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-4">
                  Upcoming Appointments
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {appointments.map((appt, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{appt.date}:</span>{" "}
                      {appt.event}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Updates */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-4">Recent Updates</h3>
                <ul className="space-y-2 text-gray-700">
                  {recentUpdates.map((update, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{update.date}:</span>{" "}
                      {update.update}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default MedicalRecord;
