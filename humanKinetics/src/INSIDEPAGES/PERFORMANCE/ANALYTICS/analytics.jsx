import { useState, useEffect } from "react";
import Footer from "../../FOOTER/footer";
import Navbar from "../../NAVBAR/navbar";
import Sidebar from "../../SIDEBAR/sidebar";
import { BarChart2 } from "lucide-react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useParams } from "react-router-dom";

function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();

  const [analytics, setAnalytics] = useState({
    attendanceRate: 0,
    performanceScore: 0,
    improvementRate: 0,
    programCompletion: 0,
    topPerforming: [],
    areasToImprove: [],
  });

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  // 🔹 Fetch backend data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/performance/analytics/${id}`);
        setAnalytics(res.data);

        const historyRes = await axios.get(`http://localhost:5000/performance/${id}`);
        setHistory(historyRes.data);
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  // 🔹 Compute performance score from history
  const computePerformanceScore = (entry) => {
    const stats = [
      "strength",
      "speed",
      "agility",
      "endurance",
      "accuracy",
      "tactics",
      "strategy",
      "physicalFitness",
      "teamCoordination",
    ];
    const sum = stats.reduce((acc, stat) => acc + Number(entry[stat] || 0), 0);
    return Math.round((sum / (stats.length * 100)) * 100); // % score
  };

  // 🔹 Compute delta between last two entries
  const getDelta = (computeFn) => {
    if (history.length < 2) return "0%";
    const last = computeFn(history[history.length - 1]);
    const prev = computeFn(history[history.length - 2]);
    const change = last - prev;
    return (change > 0 ? "+" : "") + change.toFixed(1) + "%";
  };

  // 🔹 Chart data
  const chartData = history.map((entry) => ({
    date: new Date(entry.createdAt).toLocaleDateString(),
    strength: Number(entry.strength),
    speed: Number(entry.speed),
    agility: Number(entry.agility),
    endurance: Number(entry.endurance),
    accuracy: Number(entry.accuracy),
    tactics: Number(entry.tactics),
    strategy: Number(entry.strategy),
    physicalFitness: Number(entry.physicalFitness),
    teamCoordination: Number(entry.teamCoordination),
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading Analytics...
      </div>
    );
  }

  // 🔹 Metrics to display
  const metrics = [
    {
      title: "Performance Score",
      value: `${computePerformanceScore(history[history.length - 1] || {})}%`,
      delta: getDelta(computePerformanceScore),
      width: `${computePerformanceScore(history[history.length - 1] || {})}%`,
    },
    {
      title: "Improvement Rate",
      value: `${analytics.improvementRate}%`,
      delta: getDelta((entry) => Number(entry.improvementRate || 0)),
      width: `${analytics.improvementRate}%`,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto mt-16 p-4 md:p-6">
          <h1 className="text-2xl font-bold text-green-700 mb-6">
            Analytics Dashboard
          </h1>

          {/* Metrics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {metrics.map((metric, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500 mb-2">{metric.title}</p>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">{metric.value}</h3>
                <div className="flex items-center text-green-500 text-sm">
                  <span className="mr-1">{metric.delta}</span>
                  <BarChart2 size={16} />
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-4">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: metric.width }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {["Overview"].map((filter, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-lg font-semibold shadow ${idx === 0 ? "bg-green-700 text-white" : "bg-white border border-gray-300 text-gray-600"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Performance Trends Chart */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Performance Trends</h2>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="strength" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="speed" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="agility" stroke="#f97316" strokeWidth={2} />
                  <Line type="monotone" dataKey="endurance" stroke="#a855f7" strokeWidth={2} />
                  <Line type="monotone" dataKey="accuracy" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="tactics" stroke="#facc15" strokeWidth={2} />
                  <Line type="monotone" dataKey="strategy" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="physicalFitness" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="teamCoordination" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top + Improve Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Top Performing Areas</h2>
              <ul className="space-y-3">
                {analytics.topPerforming.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center text-gray-700">
                    <p>{item.area}</p>
                    <p className="font-semibold">{item.value}%</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
              <ul className="space-y-3">
                {analytics.areasToImprove.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center text-gray-700">
                    <p>{item.area}</p>
                    <p className="font-semibold">{item.value}%</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Analytics;
