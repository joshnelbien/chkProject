import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";
import TrainingModal from "./trainingModal";
import { useState } from "react";

function AdminTraining() {
  const [isModalOpen, setModalOpen] = useState(false);
  const weeklySchedule = [
    {
      day: "Monday",
      events: [
        {
          title: "Physical Training",
          time: "8:00 AM - 10:00 AM",
          location: "Gym",
          coach: "Coach Mike",
          focus: [
            "Shooting mechanics",
            "Dribbling drills",
            "Pass combinations",
          ],
          color: "bg-blue-100",
          textColor: "text-blue-800",
        },
        {
          title: "Skills Training",
          time: "2:00 PM - 4:00 PM",
          location: "Main Court",
          coach: "Coach Arius",
          focus: [
            "Shooting mechanics",
            "Dribbling drills",
            "Pass combinations",
          ],
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
  ];

  const progressMetrics = [
    { name: "Physical Fitness", rating: 85, target: 90, improvement: 8 },
    { name: "Technical Skills", rating: 82, target: 88, improvement: 5 },
    { name: "Tactical Understanding", rating: 78, target: 85, improvement: 6 },
    { name: "Team Coordination", rating: 90, target: 85, improvement: 7 },
  ];

  const recentUpdates = [
    {
      date: "Feb 15",
      comment: "Improved team defensive coordination",
      rating: 85,
    },
    {
      date: "Feb 14",
      comment: "Enhanced shooting accuracy in practice",
      rating: 88,
    },
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
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - Fixed */}
      <div className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Navbar - Fixed */}
        <div className="fixed top-0 left-64 right-0 z-10">
          <Navbar />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 mt-16 md:mt-20 mb-16 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Training Program
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Pre-Competition Phase (Feb 1 - Feb 28)
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow hover:bg-green-700 transition"
            >
              Edit Program
            </button>
          </div>

          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Phase Progress */}
            <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
              <p className="font-semibold mb-2">Phase Progress</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Strength", "Speed", "Agility", "Game Tactics"].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-medium text-sm"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                {[
                  "Improve team coordination and gameplay",
                  "Enhance individual skills and techniques",
                  "Build stamina and endurance",
                  "Develop tactical awareness",
                ].map((goal, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Updates */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
              <ul className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {update.date}
                      </p>
                      <p className="text-gray-500 text-sm">{update.comment}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full font-medium text-xs ${getUpdateColor(
                        update.rating
                      )}`}
                    >
                      {update.rating}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Weekly Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                          <span className="font-semibold">Location:</span>{" "}
                          {event.location}
                        </li>
                        <li>
                          <span className="font-semibold">Coach:</span>{" "}
                          {event.coach}
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

          {/* Progress Metrics */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Progress Metrics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {progressMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-semibold text-gray-800">
                      {metric.name}
                    </span>
                    <span className="text-gray-500">
                      Target:{" "}
                      <span className="font-bold">{metric.target}%</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`${getProgressColor(
                        metric.rating,
                        metric.target
                      )} h-full rounded-full`}
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
        {/* Training Modal */}
        <TrainingModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={(data) => {
            console.log("Submitted Training Data:", data);
            setModalOpen(false);
          }}
        />

        {/* Footer - Fixed */}
        <div className="fixed bottom-0 left-64 right-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AdminTraining;
