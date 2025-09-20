import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function MedicalRecord() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-green-700">Personal Medical Record</h1>
            <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
              Download Record
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player Info Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500">Age</h3>
                  <p className="font-semibold text-lg">21</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Height</h3>
                  <p className="font-semibold text-lg">5'9"</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Weight</h3>
                  <p className="font-semibold text-lg">175 lbs</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Blood Type</h3>
                  <p className="font-semibold text-lg">O+</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Allergies</h3>
                  <p className="font-semibold text-lg">None</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Emergency Contact</h3>
                  <p className="font-semibold text-lg">Jane Doe - 0912-345-6789</p>
                </div>
              </div>
            </div>

            {/* Medical Data Section */}
            <div className="space-y-6">
              {/* Current Condition Card */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Current Condition</span>
                  <span>Started: Sep 15, 2025</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-red-500">Knee Sprain</h3>
                  <span className="text-sm text-gray-500">Expected Recovery: Oct 1, 2025</span>
                </div>
                <p className="text-gray-600">Recovery Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-green-700 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>

              {/* Latest Vitals Card */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-4">Latest Vitals</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500">Last Checked</p>
                    <p className="font-bold">Sep 19, 2025</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500">Blood Pressure</p>
                    <p className="font-bold">120/80</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500">Heart Rate</p>
                    <p className="font-bold">75 bpm</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="font-bold">36.8°C</p>
                  </div>
                </div>
              </div>

              {/* Current Medications Card */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-4">Current Medications</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Ibuprofen 200mg (as needed)</li>
                  <li>Vitamin C supplement (daily)</li>
                </ul>
              </div>

              {/* Upcoming Appointments Card */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-4">Upcoming Appointments</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <span className="font-semibold">Oct 1, 2025:</span> Physical Therapy Session
                  </li>
                </ul>
              </div>

              {/* Recent Updates Card */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-4">Recent Updates</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <span className="font-semibold">Sep 19, 2025:</span> Vitals checked and recorded.
                  </li>
                  <li>
                    <span className="font-semibold">Sep 16, 2025:</span> Initial diagnosis of knee sprain.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
}

export default MedicalRecord;