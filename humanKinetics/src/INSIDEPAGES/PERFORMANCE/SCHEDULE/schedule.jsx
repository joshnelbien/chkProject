import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function Schedule() {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Example data for a single day's schedule, repeated for each day
  const dailySchedule = [
    { time: "07:00", title: "Morning Workout", duration: "", color: "bg-green-100", textColor: "text-green-700" },
    { time: "08:30", title: "Breakfast", duration: "30m", color: "bg-yellow-100", textColor: "text-yellow-700" },
    { time: "10:00", title: "Team Training", duration: "2h", color: "bg-blue-100", textColor: "text-blue-700" },
    { time: "13:00", title: "Lunch", duration: "1h", color: "bg-gray-200", textColor: "text-gray-700" },
    { time: "15:30", title: "Recovery Session", duration: "1h", color: "bg-orange-100", textColor: "text-orange-700" },
    { time: "18:00", title: "Evening Nutrition", duration: "1h", color: "bg-purple-100", textColor: "text-purple-700" },
  ];

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          <h1 className="text-2xl font-bold text-green-700 mb-6">Schedule Dashboard</h1>
          
          {/* Controls and Search */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
                Weekly View
              </button>
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 font-semibold shadow">
                Monthly View
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Search events..." 
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-4 py-2 rounded-lg bg-green-700 text-white font-semibold shadow">
                Add Event
              </button>
            </div>
          </div>

          {/* Weekly Calendar View */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="grid grid-cols-7 gap-px text-center bg-gray-200 rounded-lg overflow-hidden">
              {/* Day headers */}
              {daysOfWeek.map((day) => (
                <div key={day} className="py-2 bg-gray-50 text-gray-700 font-semibold text-sm">
                  {day}
                </div>
              ))}
              {/* Calendar cells with schedule items */}
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div key={dayIndex} className="bg-white p-2">
                  <div className="text-sm font-bold text-gray-800 mb-2">{dayIndex + 1}</div>
                  <div className="space-y-2">
                    {dailySchedule.map((item, itemIndex) => (
                      <div key={itemIndex} className={`p-1 text-xs rounded-md ${item.color} ${item.textColor}`}>
                        <p className="font-semibold">{item.time}</p>
                        <p>{item.title}</p>
                        {item.duration && <p className="text-[10px] opacity-80">{item.duration}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Summary Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Today's Schedule Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
              <ul className="space-y-4">
                {dailySchedule.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.time}</p>
                      <p className="text-sm text-gray-600">{item.title}</p>
                      {item.duration && <p className="text-xs text-gray-500">{item.duration}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Weekly Overview Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Weekly Overview</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-gray-700">
                  <p>Training Sessions</p>
                  <p className="font-semibold">12</p>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Nutrition Plans</p>
                  <p className="font-semibold">21</p>
                </li>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Recovery Sessions</p>
                  <p className="font-semibold">5</p>
                </li>
              </ul>
            </div>
            {/* Schedule Completion Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Schedule Completion</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center text-gray-700">
                  <p>This Week</p>
                  <p className="font-semibold">92%</p>
                </li>
                <div className="h-1 bg-gray-200 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <li className="flex justify-between items-center text-gray-700">
                  <p>Last Week</p>
                  <p className="font-semibold">88%</p>
                </li>
                <div className="h-1 bg-gray-200 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '88%' }}></div>
                </div>
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

export default Schedule;