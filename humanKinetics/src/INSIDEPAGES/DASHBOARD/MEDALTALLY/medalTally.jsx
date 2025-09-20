import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function MedalTally() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-green-900">PLSP MYNAS</h1>
              <h2 className="text-4xl font-bold text-gray-800">LCUAA Medal Tally</h2>
              <p className="text-gray-600">
                Local Colleges and Universities Athletic Association Championships
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
                LCUAA 2024
              </button>
              <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
                LCUAA 2023
              </button>
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
                LCUAA 2022
              </button>
            </div>
          </div>

          {/* Overall Medal Count Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-4">Overall Medal Count</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="text-4xl font-bold text-amber-500">14</h4>
                <p className="text-lg text-gray-600">Gold</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="text-4xl font-bold text-gray-400">9</h4>
                <p className="text-lg text-gray-600">Silver</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="text-4xl font-bold text-yellow-800">6</h4>
                <p className="text-lg text-gray-600">Bronze</p>
              </div>
            </div>
          </div>

          {/* Performance Trend Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-4">Performance Trend</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="text-xl font-bold text-gray-800">LCUAA 2022</h4>
                <p className="text-3xl font-bold text-green-700">23 medals</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="text-xl font-bold text-gray-800">LCUAA 2023</h4>
                <p className="text-3xl font-bold text-green-700">25 medals</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="text-xl font-bold text-gray-800">LCUAA 2024</h4>
                <p className="text-3xl font-bold text-green-700">29 medals</p>
              </div>
            </div>
          </div>

          {/* Medals by Sport Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Medals by Sport</h3>

            {/* Basketball Section */}
            <div className="border-b border-gray-200 py-4">
              <h4 className="text-lg font-bold mb-2">Basketball</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-medium">Men's Team</p>
                  <p className="text-sm text-gray-500">
                    <span className="text-amber-500 font-bold">1</span> Gold <span className="text-gray-400 font-bold">0</span> Silver <span className="text-yellow-800 font-bold">0</span> Bronze
                  </p>
                </div>
                <p className="text-sm text-gray-500">Champions</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-gray-700 font-medium">Women's Team</p>
                  <p className="text-sm text-gray-500">
                    <span className="text-amber-500 font-bold">1</span> Gold <span className="text-gray-400 font-bold">0</span> Silver <span className="text-yellow-800 font-bold">0</span> Bronze
                  </p>
                </div>
                <p className="text-sm text-gray-500">Champions</p>
              </div>
              <div className="flex justify-between items-center border-t border-green-700 mt-4 pt-4">
                <p className="text-green-700 font-bold">Total</p>
                <p className="text-sm text-gray-500">
                  <span className="text-amber-500 font-bold">2</span> Gold <span className="text-gray-400 font-bold">0</span> Silver <span className="text-yellow-800 font-bold">0</span> Bronze
                </p>
              </div>
            </div>

            {/* Volleyball Section */}
            <div className="py-4">
              <h4 className="text-lg font-bold mb-2">Volleyball</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-medium">Men's Team</p>
                  <p className="text-sm text-gray-500">
                    <span className="text-amber-500 font-bold">1</span> Gold <span className="text-gray-400 font-bold">0</span> Silver <span className="text-yellow-800 font-bold">0</span> Bronze
                  </p>
                </div>
                <p className="text-sm text-gray-500">Champions</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-gray-700 font-medium">Women's Team</p>
                  <p className="text-sm text-gray-500">
                    <span className="text-amber-500 font-bold">1</span> Gold <span className="text-gray-400 font-bold">0</span> Silver <span className="text-yellow-800 font-bold">0</span> Bronze
                  </p>
                </div>
                <p className="text-sm text-gray-500">Champions</p>
              </div>
              <div className="flex justify-between items-center border-t border-green-700 mt-4 pt-4">
                <p className="text-green-700 font-bold">Total</p>
                <p className="text-sm text-gray-500">
                  <span className="text-amber-500 font-bold">2</span> Gold <span className="text-gray-400 font-bold">0</span> Silver <span className="text-yellow-800 font-bold">0</span> Bronze
                </p>
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

export default MedalTally;