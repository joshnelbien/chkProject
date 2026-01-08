import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";

function Schedule() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({});
  const [myTeamSchedules, setMyTeamSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams(); // user ID from URL
  const API = import.meta.env.VITE_BBACKEND_URL;

  const formatDate = (d) => {
    if (!d) return null;
    const date = new Date(d);
    // Using UTC prevents the "one day off" bug
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle Time In
  const handleTimeIn = async (sched) => {
    try {
      const resUser = await axios.get(
        `${API}/userAccounts/players-profile/${id}`
      );
      const user = resUser.data;

      const res = await axios.post(`${API}/attendance/time-in`, {
        userId: id,
        scheduleId: sched.id,
        type: sched.type,
        sport: user.sport,
        description: sched.description,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });

      setMyTeamSchedules((prev) =>
        prev.map((s) =>
          s.id === sched.id
            ? { ...s, status: "In Progress", timeIn: res.data.timeIn }
            : s
        )
      );

      alert("Timed In");
    } catch (err) {
      if (err.response?.status === 400) {
        setMyTeamSchedules((prev) =>
          prev.map((s) =>
            s.id === sched.id
              ? {
                ...s,
                status: "In Progress",
                timeIn: err.response.data.attendance?.timeIn,
              }
              : s
          )
        );
        alert("Already Timed In");
      } else {
        console.error("Time In error:", err);
      }
    }
  };

  const handleTimeOut = async (sched) => {
    try {
      const res = await axios.post(`${API}/attendance/time-out`, {
        userId: id,
        scheduleId: sched.id,
      });

      setMyTeamSchedules((prev) =>
        prev.map((s) =>
          s.id === sched.id
            ? { ...s, status: "Done", timeOut: res.data.timeOut }
            : s
        )
      );

      alert("Timed Out");
    } catch (err) {
      if (err.response?.status === 400) {
        alert(err.response.data.message);
      } else {
        console.error("Time Out error:", err);
      }
    }
  };

  // Fetch only Training schedules
  useEffect(() => {
    const loadAllData = async () => {
      try {
        console.log("--- START LOADING DATA ---");

        // 1. Get User Profile
        const userRes = await axios.get(`${API}/userAccounts/players-profile/${id}`);
        const teamId = userRes.data.teamId;
        console.log("Logged in User Team ID:", teamId);

        // 2. Fetch all Training Schedules
        const trainingRes = await axios.get(`${API}/trainingSchedule/training-schedule`);

        // LOG: Raw API Response
        console.log("Raw API Response:", trainingRes.data);

        const allSchedules = trainingRes.data.schedules || [];
        console.log("Total Schedules Found:", allSchedules.length);

        // 3. Prepare data for the Calendar
        const merged = {};
        allSchedules.forEach((t) => {
          const key = formatDate(t.date);

          if (!merged[key]) merged[key] = [];
          merged[key].push({
            id: t.id,
            time: `${t.startTime} - ${t.endTime}`,
            // CHANGE THIS LINE: Use t.title because t.teamName is missing in your object
            title: t.title || "Training",
            location: t.location,
            type: t.type || "Training",
            isMyTeam: t.teamSchedule === teamId
          });
        });

        // LOG: Final state of the Calendar Data object
        console.log("Final scheduleData Object (Keys should match YYYY-MM-DD):", merged);
        setScheduleData(merged);

        // 4. Prepare data for the "My Training Schedule" List
        const myTeamFiltered = allSchedules.filter(sched => sched.teamSchedule === teamId);
        console.log("Schedules matching User Team:", myTeamFiltered);

        const updatedMySchedules = await Promise.all(
          myTeamFiltered.map(async (sched) => {
            try {
              const att = await axios.get(`${API}/attendance/user/${id}/schedule/${sched.id}`);
              return {
                ...sched,
                timeIn: att.data?.timeIn,
                timeOut: att.data?.timeOut,
                status: att.data?.status || sched.status || "Pending",
                title: sched.teamName,
                type: "Training",
              };
            } catch (err) {
              return { ...sched, status: sched.status || "Pending", title: sched.teamName, type: "Training" };
            }
          })
        );
        setMyTeamSchedules(updatedMySchedules);

      } catch (e) {
        console.error("Error loading schedules:", e);
      }
    };

    loadAllData();
  }, [id, API]);

  // Calendar logic
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();
  const firstDayIndex = currentMonth.getDay();
  const lastDate = new Date(year, currentMonth.getMonth() + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) daysArray.push(null);
  for (let i = 1; i <= lastDate; i++)
    daysArray.push(new Date(year, currentMonth.getMonth(), i));

  const handlePrev = () =>
    setCurrentMonth(new Date(year, currentMonth.getMonth() - 1, 1));
  const handleNext = () =>
    setCurrentMonth(new Date(year, currentMonth.getMonth() + 1, 1));

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"
          }`}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto p-4 md:p-6 mt-16">
          <div className="top-0 bg-gray-100 z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 p-2 border-b">
            <div>
              <h1 className="text-2xl font-bold text-green-700">Schedule</h1>
              <p className="text-gray-500">Training Calendar</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search training..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 top-16 bg-gray-100 z-10 p-2 border-b">
            <button
              onClick={handlePrev}
              className="px-3 py-1 bg-white shadow rounded-lg"
            >
              ← Prev
            </button>
            <h2 className="text-xl font-semibold text-green-700">
              {monthName} {year}
            </h2>
            <button
              onClick={handleNext}
              className="px-3 py-1 bg-white shadow rounded-lg"
            >
              Next →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-300 rounded-lg overflow-hidden mb-10">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="bg-gray-50 p-2 text-center font-semibold text-gray-700"
              >
                {d}
              </div>
            ))}
            {daysArray.map((date, idx) => {
              const dateKey = date ? formatDate(date) : null;
              const events = dateKey ? scheduleData[dateKey] || [] : [];

              // Filter based on search bar
              const filtered = events.filter((e) =>
                e.title?.toLowerCase().includes(searchTerm.toLowerCase())
              );

              return (
                <div key={idx} className="bg-white min-h-[120px] p-1 border hover:bg-gray-50 transition-colors">
                  {date && (
                    <p className={`text-sm font-bold p-1 ${formatDate(today) === dateKey ? "bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center" : "text-gray-800"
                      }`}>
                      {date.getDate()}
                    </p>
                  )}
                  <div className="mt-1 space-y-1">
                    {filtered.map((event, i) => (
                      <div
                        key={i}
                        className={`p-1 rounded text-[10px] leading-tight border-l-4 ${event.isMyTeam
                          ? "bg-green-100 border-green-600 text-green-800 font-bold"
                          : "bg-blue-50 border-blue-400 text-blue-700"
                          }`}
                        title={`${event.title} at ${event.location}`} // Tooltip on hover
                      >
                        <div className="truncate">{event.title}</div>
                        <div className="opacity-80">{event.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-5 bg-white shadow rounded-lg mb-20">
            <h2 className="text-xl font-bold text-green-700 mb-3">
              My Training Schedule
            </h2>

            {myTeamSchedules.filter((sched) => sched.status !== "Done")
              .length === 0 ? (
              <p className="text-gray-500">
                No active training schedules available for your team.
              </p>
            ) : (
              <div className="space-y-4">
                {myTeamSchedules
                  .filter((sched) => sched.status !== "Done")
                  .map((sched) => (
                    <div
                      key={sched.id}
                      className="p-3 border rounded-lg bg-green-50"
                    >
                      <p className="font-semibold text-green-800">
                        Status: {sched.status}
                      </p>
                      <p className="font-semibold text-green-800">
                        {sched.title}
                      </p>
                      <p className="text-sm font-medium text-blue-700">
                        {sched.type}
                      </p>
                      <p className="text-gray-700">
                        📅 {formatDate(sched.date)}
                      </p>
                      <p className="text-gray-700">
                        🕒 {sched.startTime} - {sched.endTime}
                      </p>
                      <p className="text-gray-700">📍 {sched.location}</p>

                      <div className="mt-3 flex gap-3">
                        <button
                          onClick={() => handleTimeIn(sched)}
                          disabled={sched.status !== "Start"}
                          className={`px-4 py-2 rounded-lg text-white ${sched.status !== "Start"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                            }`}
                        >
                          Time In {sched.timeIn ? `(${sched.timeIn})` : ""}
                        </button>

                        <button
                          onClick={() => handleTimeOut(sched)}
                          disabled={sched.status !== "In Progress"}
                          className={`px-4 py-2 rounded-lg text-white ${sched.status !== "In Progress"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                            }`}
                        >
                          Time Out {sched.timeOut ? `(${sched.timeOut})` : ""}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </main>

        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Schedule;
