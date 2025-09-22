import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminTraining() {
  const weeklySchedule = [
    {
      day: "Monday",
      events: [
        {
          title: "Physical Training",
          time: "8:00 AM - 10:00 AM",
          location: "Gym",
          coach: "Coach Mike",
          focus: ["Shooting mechanics", "Dribbling drills", "Pass combinations"],
          color: "bg-blue-100",
          textColor: "text-blue-800",
        },
        {
          title: "Skills Training",
          time: "2:00 PM - 4:00 PM",
          location: "Main Court",
          coach: "Coach Arius",
          focus: ["Shooting mechanics", "Dribbling drills", "Pass combinations"],
          color: "bg-blue-100",
          textColor: "text-blue-800",
        },
      ],
    },
    {
      day: "Tuesday",
      events: [
        {
          title: "Technical Training",
          time: "8:00 AM - 10:00 AM",
          location: "Court 2",
          coach: "Coach Sarah",
          focus: ["Offensive patterns", "Defense rotations", "Game situations"],
          color: "bg-blue-100",
          textColor: "text-blue-800",
        },
        {
          title: "Conditioning",
          time: "2:00 PM - 3:00 PM",
          location: "Track",
          coach: "Coach Mike",
          focus: ["Sprint intervals", "Agility ladders", "Plyometrics"],
          color: "bg-blue-100",
          textColor: "text-blue-800",
        },
      ],
    },
    {
      day: "Wednesday",
      events: [
        {
          title: "Team Practice",
          time: "8:00 AM - 10:00 AM",
          location: "Main Court",
          coach: "Coach Arius",
          focus: ["Focus Areas"],
          color: "bg-blue-100",
          textColor: "text-blue-800",
        },
        {
          title: "Recovery",
          time: "2:00 PM - 3:30 PM",
          location: "Gym",
          coach: "Coach Mike",
          focus: ["Focus Areas"],
          color: "bg-gray-100",
          textColor: "text-gray-800",
        },
      ],
    },
    {
      day: "Thursday",
      events: [
        {
          title: "Skills Training",
          time: "8:00 AM - 10:00 AM",
          location: "Court 2",
          coach: "Coach Arius",
          focus: ["Position-specific drills", "Skill combinations", "Performance metrics"],
          color: "bg-blue-100",
          textColor: "text-blue-800",
        },
        {
          title: "Team Training",
          time: "2:00 PM - 4:00 PM",
          location: "Court 2",
          coach: "Coach Sarah",
          focus: ["Focus Areas"],
          color: "bg-blue-100",
          textColor: "text-blue-800",
        },
      ],
    },
    {
      day: "Friday",
      events: [
        {
          title: "Technical Training",
          time: "8:00 AM - 10:00 AM",
          location: "Main Court",
          coach: "Coach Arius",
          focus: ["Focus Areas"],
          color: "bg-blue-100",
          textColor: "text-blue-800",
        },
        {
          title: "Performance",
          time: "2:00 PM - 4:00 PM",
          location: "Gym",
          coach: "All Coaches",
          focus: ["Focus Areas"],
          color: "bg-blue-100",
          textColor: "text-blue-800",
        },
      ],
    },
  ];

  const progressMetrics = [
    { name: "Physical Fitness", rating: 85, target: 90, improvement: 8 },
    { name: "Technical Skills", rating: 82, target: 88, improvement: 5 },
    { name: "Tactical Understanding", rating: 78, target: 85, improvement: 6 },
    { name: "Team Coordination", rating: 90, target: 85, improvement: 7 },
  ];

  const recentUpdates = [
    { date: "Feb 15", comment: "Improved team defensive coordination", rating: 85 },
    { date: "Feb 14", comment: "Enhanced shooting accuracy in practice", rating: 88 },
    { date: "Feb 13", comment: "Good progress in conditioning", rating: 82 },
  ];

  const getProgressColor = (rating, target) => {
    if (rating >= target) return "bg-green-600";
    if (rating >= target * 0.9) return "bg-yellow-600";
    return "bg-red-600";
  };
  const getUpdateColor = (rating) => {
    if (rating >= 85) return "bg-green-100 text-green-800";
    if (rating >= 80) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Training Program
              </h2>
              <p className="text-gray-500">Pre-Competition Phase (Feb 1 - Feb 28)</p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow">
              Edit Program
            </button>
          </div>

          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Phase Progress Card */}
            <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2 flex flex-col lg:flex-row">
              <div className="flex-1 border-b lg:border-r lg:border-b-0 pr-4 pb-4 lg:pb-0 mb-4 lg:mb-0">
                <p className="font-semibold mb-2">Phase Progress</p>
                <div className="flex space-x-2">
                  <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-medium">
                    Strength
                  </span>
                  <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-medium">
                    Speed
                  </span>
                  <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-medium">
                    Agility
                  </span>
                  <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-medium">
                    Game Tactics
                  </span>
                </div>
              </div>
              <div className="flex-1 pl-0 lg:pl-6 pt-4 lg:pt-0">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Improve team coordination and gameplay
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Enhance individual skills and techniques
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Build stamina and endurance
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Develop tactical awareness
                  </li>
                </ul>
              </div>
            </div>

            {/* Recent Updates Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
              <ul className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{update.date}</p>
                      <p className="text-gray-500 text-sm">{update.comment}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full font-medium text-xs ${getUpdateColor(update.rating)}`}
                    >
                      {update.rating}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weekly Schedule Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Weekly Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {weeklySchedule.map((dayData, dayIndex) => (
                <div key={dayIndex} className="flex flex-col">
                  <h4 className="font-semibold mb-2">{dayData.day}</h4>
                  {dayData.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`p-4 rounded-lg mb-4 ${event.color} ${event.textColor} shadow-sm`}
                    >
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-xs">{event.time}</p>
                      <ul className="text-xs mt-2 space-y-1">
                        <li>
                          <span className="font-semibold">Location:</span> {event.location}
                        </li>
                        <li>
                          <span className="font-semibold">Coach:</span> {event.coach}
                        </li>
                        <li className="mt-2">
                          <p className="font-semibold">Focus Areas</p>
                          <ul className="list-disc list-inside">
                            {event.focus.map((area, areaIndex) => (
                              <li key={areaIndex} className="text-xs">
                                {area}
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Metrics Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Progress Metrics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {progressMetrics.map((metric, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-gray-800 font-semibold">{metric.name}</span>
                    <span className="text-gray-500">
                      Target: <span className="font-bold">{metric.target}%</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`${getProgressColor(metric.rating, metric.target)} h-full rounded-full`}
                      style={{ width: `${metric.rating}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-1">
                    <span className="font-bold">{metric.rating}%</span>
                    <span className="text-green-600 font-bold flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {metric.improvement}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
}

export default AdminTraining;