import { useState } from "react";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { BarChart2 } from "lucide-react";

function Nutrition() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const metrics = [
    {
      title: "Calorie Target Achievement",
      value: "92%",
      delta: "+3.2%",
      width: "92%",
    },
    { title: "Protein Goals Met", value: "88%", delta: "+4.5%", width: "88%" },
    {
      title: "Meal Plan Adherence",
      value: "85%",
      delta: "+2.8%",
      width: "85%",
    },
    { title: "Hydration Goals", value: "78%", delta: "+1.5%", width: "78%" },
  ];

  const strengths = [
    { name: "Protein Intake", value: "95%" },
    { name: "Meal Timing", value: "92%" },
    { name: "Vegetable Intake", value: "88%" },
  ];

  const improvements = [
    { name: "Omega-3 Intake", value: "65%" },
    { name: "Fiber Goals", value: "72%" },
    { name: "Hydration", value: "78%" },
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
        <main className="flex-1 overflow-y-auto mt-16 p-4 md:p-6">
          <h1 className="text-2xl font-bold text-green-700 mb-6">
            Nutrition Dashboard
          </h1>

          {/* Top Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {metrics.map((metric, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500 mb-2">{metric.title}</p>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  {metric.value}
                </h3>
                <div className="flex items-center text-green-500 text-sm">
                  <span className="mr-1">{metric.delta}</span>
                  <BarChart2 size={16} />
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-4">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: metric.width }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters Section */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {["Overview", "Meal Analysis", "Macro Tracking"].map(
              (filter, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-lg font-semibold shadow ${
                    idx === 0
                      ? "bg-green-700 text-white"
                      : "bg-white border border-gray-300 text-gray-600"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>

          {/* Caloric Distribution */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Caloric Distribution
              </h2>
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

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nutritional Strengths */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Nutritional Strengths
              </h2>
              <ul className="space-y-3">
                {strengths.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center text-gray-700"
                  >
                    <p>{item.name}</p>
                    <p className="font-semibold">{item.value}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Areas for Improvement
              </h2>
              <ul className="space-y-3">
                {improvements.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center text-gray-700"
                  >
                    <p>{item.name}</p>
                    <p className="font-semibold">{item.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Nutrition;
