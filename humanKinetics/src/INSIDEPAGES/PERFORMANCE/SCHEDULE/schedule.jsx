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
  const { id } = useParams(); // get from URL

  const handleTimeIn = async (scheduleId) => {
    console.log("Time In for schedule:", scheduleId);
    // await axios.post("http://localhost:5000/attendance/time-in", { userId: id, scheduleId });
  };

  const handleTimeOut = async (scheduleId) => {
    console.log("Time Out for schedule:", scheduleId);
    // await axios.post("http://localhost:5000/attendance/time-out", { userId: id, scheduleId });
  };

  const formatDate = (d) => {
    if (!d) return null;
    const date = new Date(d);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const [trainingRes, tournamentRes] = await Promise.all([
          axios.get("http://localhost:5000/trainingSchedule/training-schedule"),
          axios.get("http://localhost:5000/tournament/tournaments-activities"),
        ]);

        const trainingSchedules = trainingRes.data.schedules || [];
        const tournaments = Array.isArray(tournamentRes.data)
          ? tournamentRes.data
          : tournamentRes.data?.tournaments || [];

        const merged = {};

        // Merge training schedules
        trainingSchedules.forEach((t) => {
          const key = formatDate(t.date);
          if (!merged[key]) merged[key] = [];
          merged[key].push({
            time: `${t.startTime} - ${t.endTime}`,
            title: t.title,
            location: t.location,
            participants: `Coach: ${t.coach}`,
            type: "Training",
          });
        });

        // Merge tournament schedules
        tournaments.forEach((t) => {
          t.schedules?.forEach((s) => {
            const key = formatDate(s.date);
            if (!merged[key]) merged[key] = [];
            merged[key].push({
              time: `${s.startTime} - ${s.endTime}`,
              title: `${t.tournamentName} vs ${s.opponent}`,
              location: t.location,
              participants: `${t.teams} Teams`,
              type: "Tournament",
            });
          });
        });

        setScheduleData(merged);
      } catch (e) {
        console.error("Error loading schedules:", e);
      }
    };

    const fetchMyTeamSchedules = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/userAccounts/players-profile/${id}`
        );
        const teamId = res.data.teamId;

        // Training schedules
        const trainingRes = await axios.get(
          "http://localhost:5000/trainingSchedule/training-schedule"
        );
        const myTrainingSchedules = (trainingRes.data.schedules || []).filter(
          (sched) => sched.teamSchedule === teamId
        );

        // Tournament schedules
        const tournamentRes = await axios.get(
          "http://localhost:5000/tournament/tournaments-activities"
        );
        const tournaments = Array.isArray(tournamentRes.data)
          ? tournamentRes.data
          : tournamentRes.data?.tournaments || [];

        const myTournamentSchedules = [];
        tournaments.forEach((t) => {
          t.schedules?.forEach((s) => {
            if (String(s.teamSchedule) === String(teamId)) {
              myTournamentSchedules.push({
                ...s,
                title: `${t.tournamentName} vs ${s.opponent}`,
                location: t.location,
                type: "Tournament",
              });
            }
          });
        });

        setMyTeamSchedules([...myTrainingSchedules, ...myTournamentSchedules]);
      } catch (err) {
        console.error("Error fetching team schedule:", err);
      }
    };

    fetchSchedules();
    fetchMyTeamSchedules();
  }, [id]);

  // CALENDAR
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
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 mt-16">
          {/* Header */}
          <div className=" top-0 bg-gray-100 z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 p-2 border-b">
            <div>
              <h1 className="text-2xl font-bold text-green-700">Schedule</h1>
              <p className="text-gray-500">Training & Events Calendar</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4  top-16 bg-gray-100 z-10 p-2 border-b">
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

          {/* Calendar */}
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
              const filtered = events.filter((e) =>
                e.title.toLowerCase().includes(searchTerm.toLowerCase())
              );
              return (
                <div key={idx} className="bg-white min-h-[120px] p-2 border">
                  {date && (
                    <p className="text-gray-800 font-semibold text-sm">
                      {date.getDate()}
                    </p>
                  )}
                  <div className="mt-1 space-y-1">
                    {filtered.map((event, i) => (
                      <div
                        key={i}
                        className={`p-1 rounded text-xs font-medium ${
                          event.type === "Training"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <p>{event.title}</p>
                        <p className="text-[10px] opacity-70">{event.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* My Team Schedule */}
          <div className="p-5 bg-white shadow rounded-lg mb-20">
            <h2 className="text-xl font-bold text-green-700 mb-3">
              My Schedule
            </h2>

            {myTeamSchedules.length === 0 ? (
              <p className="text-gray-500">
                No schedule available for your team.
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
                        {sched.status}
                      </p>
                      <p className="font-semibold text-green-800">
                        {sched.title}
                      </p>
                      <p className="text-sm font-medium text-blue-700">
                        {sched.type}
                      </p>
                      <p className="text-gray-700">📅 {sched.date}</p>
                      <p className="text-gray-700">
                        🕒 {sched.startTime} - {sched.endTime}
                      </p>
                      <p className="text-gray-700">📍 {sched.location}</p>

                      {/* Time In / Time Out Buttons */}
                      <div className="mt-3 flex gap-3">
                        <button
                          onClick={() => handleTimeIn(sched.id)}
                          disabled={sched.status === "Pending"}
                          className={`px-4 py-2 rounded-lg text-white ${
                            sched.status === "Pending"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          Time In
                        </button>

                        <button
                          onClick={() => handleTimeOut(sched.id)}
                          disabled={sched.status === "Pending"}
                          className={`px-4 py-2 rounded-lg text-white ${
                            sched.status === "Pending"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          Time Out
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </main>

        {/* Fixed Footer */}
        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Schedule;
