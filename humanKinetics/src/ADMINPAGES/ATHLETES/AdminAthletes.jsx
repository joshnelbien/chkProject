import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

// Sport-specific metrics
const SPORT_TRAINING_FIELDS = {
  "basketball-men": [
    { key: "basketballSpeed", label: "Speed" },
    { key: "basketballVerticalJump", label: "Vertical Jump" },
    { key: "basketballAgility", label: "Agility" },
    { key: "basketballEndurance", label: "Endurance" },
    { key: "basketballShootingAccuracy", label: "Shooting Accuracy" },
  ],
  "basketball-women": [
    { key: "basketballSpeed", label: "Speed" },
    { key: "basketballVerticalJump", label: "Vertical Jump" },
    { key: "basketballAgility", label: "Agility" },
    { key: "basketballEndurance", label: "Endurance" },
    { key: "basketballShootingAccuracy", label: "Shooting Accuracy" },
  ],
  "volleyball-men": [
    { key: "volleyballVerticalJump", label: "Vertical Jump" },
    { key: "volleyballReactionTime", label: "Reaction Time" },
    { key: "volleyballUpperBodyPower", label: "Upper Body Power" },
    { key: "volleyballAgility", label: "Agility" },
    { key: "volleyballServeAccuracy", label: "Serve Accuracy" },
  ],
  "volleyball-women": [
    { key: "volleyballVerticalJump", label: "Vertical Jump" },
    { key: "volleyballReactionTime", label: "Reaction Time" },
    { key: "volleyballUpperBodyPower", label: "Upper Body Power" },
    { key: "volleyballAgility", label: "Agility" },
    { key: "volleyballServeAccuracy", label: "Serve Accuracy" },
  ],
  cheerdance: [
    { key: "cheerdanceFlexibility", label: "Flexibility" },
    { key: "cheerdanceBalance", label: "Balance" },
    { key: "cheerdanceMuscularEndurance", label: "Muscular Endurance" },
    { key: "cheerdanceCoordination", label: "Coordination" },
    { key: "cheerdanceExplosivePower", label: "Explosive Power" },
  ],
  futsal: [
    { key: "futsalSpeed", label: "Speed" },
    { key: "futsalAgility", label: "Agility" },
    { key: "futsalAerobicEndurance", label: "Aerobic Endurance" },
    { key: "futsalBallControl", label: "Ball Control" },
    { key: "futsalShootingAccuracy", label: "Shooting Accuracy" },
  ],
  "sepak-takraw": [
    { key: "takrawLegPower", label: "Leg Power" },
    { key: "takrawFlexibility", label: "Flexibility" },
    { key: "takrawBalance", label: "Balance" },
    { key: "takrawReactionTime", label: "Reaction Time" },
    { key: "takrawCoordination", label: "Coordination" },
  ],
  "table-tennis": [
    { key: "tableTennisReactionTime", label: "Reaction Time" },
    { key: "tableTennisHandEyeCoordination", label: "Hand–Eye Coordination" },
    { key: "tableTennisSpeed", label: "Speed" },
    { key: "tableTennisAccuracy", label: "Accuracy" },
    { key: "tableTennisEndurance", label: "Endurance" },
  ],
  badminton: [
    { key: "badmintonAgility", label: "Agility" },
    { key: "badmintonSpeed", label: "Speed" },
    { key: "badmintonEndurance", label: "Endurance" },
    { key: "badmintonSmashPower", label: "Smash Power" },
    { key: "badmintonAccuracy", label: "Accuracy" },
  ],
  taekwondo: [
    { key: "taekwondoKickingSpeed", label: "Kicking Speed" },
    { key: "taekwondoExplosivePower", label: "Explosive Power" },
    { key: "taekwondoFlexibility", label: "Flexibility" },
    { key: "taekwondoReactionTime", label: "Reaction Time" },
    { key: "taekwondoBalance", label: "Balance" },
  ],
  arnis: [
    { key: "arnisHandSpeed", label: "Hand Speed" },
    { key: "arnisReactionTime", label: "Reaction Time" },
    { key: "arnisCoordination", label: "Coordination" },
    { key: "arnisEndurance", label: "Endurance" },
    { key: "arnisAccuracy", label: "Accuracy" },
  ],
  "karate-do": [
    { key: "karateExplosivePower", label: "Explosive Power" },
    { key: "karateSpeed", label: "Speed" },
    { key: "karateBalance", label: "Balance" },
    { key: "karateReactionTime", label: "Reaction Time" },
    { key: "karateTechniquePrecision", label: "Technique Precision" },
  ],
};

function AdminAthletes() {
  const [players, setPlayers] = useState([]);
  const API = import.meta.env.VITE_BBACKEND_URL;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get(`${API}/userAccounts/players`);
        console.log("📌 Fetched Players (Frontend):", res.data);
        setPlayers(res.data);
      } catch (error) {
        console.error("❌ Error fetching players (Frontend):", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-grow">
        <Navbar />

        <main className="flex-grow overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full mt-16 md:mt-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Athletes
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Athlete Management
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative w-full md:flex-grow">
              <input
                type="text"
                placeholder="Search athletes..."
                className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            {players.length > 0 ? (
              players.map((player) => {
                // Get dynamic metrics based on sport
                const metrics =
                  SPORT_TRAINING_FIELDS[player.sport] || [
                    { key: "strength", label: "Strength" },
                    { key: "speed", label: "Speed" },
                    { key: "agility", label: "Agility" },
                    { key: "endurance", label: "Endurance" },
                  ];

                return (
                  <AthleteCard
                    key={player.id}
                    profileUrl={
                      player.id
                        ? `${API}/userAccounts/player-photo/${player.id}`
                        : "/lexi.jpg"
                    }
                    name={`${player.firstName} ${player.lastName}`}
                    number={player.studentNumber}
                    sport={player.sport}
                    role={player.course}
                    status={player.status}
                    attendance="--"
                    performance="--"
                    streak="--"
                    improvement="--"
                    metrics={metrics.reduce((acc, m) => {
                      acc[m.label] = player[m.key] || 0;
                      return acc;
                    }, {})}
                    activities={[]}
                  />
                );
              })
            ) : (
              <p className="text-gray-500 italic">No athletes found.</p>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function AthleteCard({
  profileUrl,
  name,
  number,
  sport,
  role,
  status,
  attendance,
  performance,
  streak,
  improvement,
  metrics,
  activities,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex items-center mb-4">
        <img
          src={profileUrl || "/lexi.jpg"}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
          onError={(e) => (e.currentTarget.src = "/lexi.jpg")}
        />
        <div className="ml-4 flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{name}</h3>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                status === "In Team"
                  ? "bg-green-200 text-green-700"
                  : "bg-yellow-200 text-yellow-700"
              }`}
            >
              {status}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-bold text-lg mr-1">{number}</span>
            {sport} • {role}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center border-b pb-4 mb-4">
        <Stat label="Attendance" value={attendance} />
        <Stat label="Performance" value={performance} />
        <Stat label="Streak" value={streak} />
        <Stat label="Improvement" value={improvement} isImprovement />
      </div>

      <div className="mb-4">
        <p className="font-semibold text-gray-800 mb-2">Performance Metrics</p>
        {Object.entries(metrics).map(([label, value]) => (
          <div key={label} className="mb-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{label}</span>
              <span className="font-bold">{value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-2">Recent Activities</p>
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((act, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-gray-800">{act.date}</p>
                  <p className="text-gray-500 text-xs">{act.desc}</p>
                </div>
                <span className="font-bold text-green-600">{act.score}%</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">No activity records yet.</p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, isImprovement = false }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      {isImprovement ? (
        <p className="font-bold text-lg text-green-600 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {value}
        </p>
      ) : (
        <p className="font-bold text-lg">{value}</p>
      )}
    </div>
  );
}

export default AdminAthletes;
