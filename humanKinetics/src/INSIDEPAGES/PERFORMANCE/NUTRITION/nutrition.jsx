import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { BarChart2 } from "lucide-react";

function Nutrition() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          <h1 className="text-2xl font-bold text-green-700 mb-6">Nutrition Dashboard</h1>

          {/* Top Performance Metrics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Calorie Target Achievement Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 mb-2">Calorie Target Achievement</p>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">92%</h3>
              <div className="flex items-center text-green-500 text-sm">
                <span className="mr-1">+3.2%</span>
                <BarChart2 size={16} />
              </div>
              <div className="h-1 bg-gray-200 rounded-full mt-4">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            {/* Protein Goals Met Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 mb-2">Protein Goals Met</p>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">88%</h3>
              <div className="flex items-center text-green-500 text-sm">
                <span className="mr-1">+4.5%</span>
                <BarChart2 size={16} />
              </div>
              <div className="h-1 bg-gray-200 rounded-full mt-4">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            {/* Meal Plan Adherence Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 mb-2">Meal Plan Adherence</p>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">85%</h3>
              <div className="flex items-center text-green-500 text-sm">
                <span className="mr-1">+2.8%</span>
                <BarChart2 size={16} />
              </div>
              <div className="h-1 bg-gray-200 rounded-full mt-4">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            {/* Hydration Goals Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 mb-2">Hydration Goals</p>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">78%</h3>
              <div className="flex items-center text-green-500 text-sm">
                <span className="mr-1">+1.5%</span>
                <BarChart2 size={16} />
              </div>
              <div className="h-1 bg-gray-200 rounded-full mt-4">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="flex items-center space-x-2 mb-6">
            <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
              Overview
            </button>
            <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
              Meal Analysis
            </button>
            <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
              Macro Tracking
            </button>
          </div>

          {/* Caloric Distribution Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Caloric Distribution</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 border border-gray-300 text-gray-600">
                  All Meals
                </button>
                <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 border border-gray-300 text-gray-600">
                  Last 30 days
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              Nutrition distribution chart would go here
            </div>
          </div>

          {/* Nutritional Strengths & Areas for Improvement Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nutritional Strengths */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Nutritional Strengths</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-gray-700">
                  <p>Protein Intake</p>
                  <p className="font-semibold">95%</p>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Meal Timing</p>
                  <p className="font-semibold">92%</p>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Vegetable Intake</p>
                  <p className="font-semibold">88%</p>
                </li>
              </ul>
            </div>
            {/* Areas for Improvement */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-gray-700">
                  <p>Omega-3 Intake</p>
                  <p className="font-semibold">65%</p>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Fiber Goals</p>
                  <p className="font-semibold">72%</p>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Hydration</p>
                  <p className="font-semibold">78%</p>
                </li>
              </ul>
            </div>
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
}

export default Nutrition;