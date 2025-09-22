import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminSchedule() {
  const scheduleData = {
    "February 19-23, 2024": [
      {
        day: "Monday",
        date: "19",
        events: [
          {
            time: "8:00 AM - 10:00 AM",
            title: "Basketball Training",
            location: "Main Court",
            participants: "12 athletes",
            color: "bg-green-100",
            textColor: "text-green-800",
          },
          {
            time: "10:30 AM - 12:30 PM",
            title: "Volleyball Practice",
            location: "Court 2",
            participants: "14 athletes",
            color: "bg-gray-100",
            textColor: "text-gray-800",
          },
          {
            time: "2:00 PM - 3:00 PM",
            title: "Team Meeting",
            location: "Meeting Room 1",
            participants: "15 athletes",
            color: "bg-purple-100",
            textColor: "text-purple-800",
          },
          {
            time: "3:30 PM - 5:00 PM",
            title: "Skills Training",
            location: "Court 2",
            participants: "14 athletes",
            color: "bg-cyan-100",
            textColor: "text-cyan-800",
          },
        ],
      },
      {
        day: "Tuesday",
        date: "20",
        events: [
          {
            time: "8:00 AM - 10:00 AM",
            title: "Volleyball Training",
            location: "Court 2",
            participants: "14 athletes",
            color: "bg-gray-100",
            textColor: "text-gray-800",
          },
          {
            time: "2:00 PM - 4:00 PM",
            title: "Basketball Game vs Eagles",
            location: "Main Court",
            participants: "12 athletes",
            color: "bg-yellow-100",
            textColor: "text-yellow-800",
          },
          {
            time: "4:00 PM - 5:00 PM",
            title: "Recovery Session",
            location: "Gym",
            participants: "14 athletes",
            color: "bg-lime-100",
            textColor: "text-lime-800",
          },
        ],
      },
      {
        day: "Wednesday",
        date: "21",
        events: [
          {
            time: "9:00 AM - 11:00 AM",
            title: "Basketball Training",
            location: "Main Court",
            participants: "12 athletes",
            color: "bg-green-100",
            textColor: "text-green-800",
          },
          {
            time: "2:00 PM - 4:00 PM",
            title: "Volleyball Game vs Aces",
            location: "Court 2",
            participants: "14 athletes",
            color: "bg-yellow-100",
            textColor: "text-yellow-800",
          },
          {
            time: "4:00 PM - 5:00 PM",
            title: "Team Analysis",
            location: "Meeting Room 1",
            participants: "12 athletes",
            color: "bg-purple-100",
            textColor: "text-purple-800",
          },
        ],
      },
      {
        day: "Thursday",
        date: "22",
        events: [
          {
            time: "8:00 AM - 10:00 AM",
            title: "Volleyball Training",
            location: "Court 2",
            participants: "14 athletes",
            color: "bg-gray-100",
            textColor: "text-gray-800",
          },
          {
            time: "2:00 PM - 4:00 PM",
            title: "Basketball Practice",
            location: "Main Court",
            participants: "12 athletes",
            color: "bg-green-100",
            textColor: "text-green-800",
          },
          {
            time: "4:00 PM - 5:00 PM",
            title: "Team Strategy",
            location: "Meeting Room 2",
            participants: "12 athletes",
            color: "bg-purple-100",
            textColor: "text-purple-800",
          },
        ],
      },
      {
        day: "Friday",
        date: "23",
        events: [
          {
            time: "9:00 AM - 11:00 AM",
            title: "Basketball Training",
            location: "Main Court",
            participants: "12 athletes",
            color: "bg-green-100",
            textColor: "text-green-800",
          },
          {
            time: "11:30 AM - 1:30 PM",
            title: "Volleyball Practice",
            location: "Court 2",
            participants: "14 athletes",
            color: "bg-gray-100",
            textColor: "text-gray-800",
          },
          {
            time: "2:30 PM - 4:00 PM",
            title: "Team Building",
            location: "Meeting Hall",
            participants: "40 athletes",
            color: "bg-purple-100",
            textColor: "text-purple-800",
          },
        ],
      },
    ],
  };

  const currentWeek = scheduleData["February 19-23, 2024"];

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
              <h2 className="text-2xl font-semibold text-green-700">Schedule</h2>
              <p className="text-gray-500">Training and Events Calendar</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 text-gray-700">
                All Teams
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow">
                Add Event
              </button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h3 className="text-xl font-semibold text-gray-800">
                February 19-23, 2024
              </h3>
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full">
              <button className="px-4 py-2 bg-white text-gray-700 font-semibold rounded-full shadow">
                Week
              </button>
              <button className="px-4 py-2 text-gray-600 font-medium rounded-full">
                Month
              </button>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-5 gap-4">
            {currentWeek.map((dayData) => (
              <div key={dayData.day} className="flex flex-col">
                <div className="text-center pb-2">
                  <p className="text-sm font-semibold">{dayData.day}</p>
                  <p className="text-gray-400 text-xs">{dayData.date}</p>
                </div>
                {dayData.events.map((event, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg mb-2 ${event.color} ${event.textColor} shadow-sm`}
                  >
                    <p className="text-xs font-semibold">{event.time}</p>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h-5m2-2m-2 2v2m-7.232-9.232A24.965 24.965 0 017 10.5a24.965 24.965 0 01-2.768-4.768M10 11a7 7 0 100-14 7 7 0 000 14z"
                        />
                      </svg>
                      {event.participants}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
}

export default AdminSchedule;