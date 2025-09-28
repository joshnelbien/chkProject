import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminPerformance() {
  const performanceData = {
    teamAverage: "88%",
    teamImprovement: "12%",
    topPerformer: "John Smith",
    totalEvaluations: 156,
  };

  const athleteData = [
    {
      name: "John Smith",
      number: "23",
      sport: "Basketball",
      position: "Forward",
      improvement: "15%",
      overallRating: 92,
      lastEvaluation: "Feb 15, 2024",
      metrics: [
        { name: "Physical", rating: 90 },
        { name: "Technical", rating: 94 },
        { name: "Tactical", rating: 88 },
        { name: "Mental", rating: 95 },
      ],
      recentEvaluations: [
        {
          date: "Feb 15",
          event: "Game",
          comment: "Excellent shooting performance",
          rating: 94,
        },
        {
          date: "Feb 12",
          event: "Training",
          comment: "Strong defensive drills",
          rating: 92,
        },
        {
          date: "Feb 08",
          event: "Game",
          comment: "Good court awareness",
          rating: 90,
        },
      ],
    },
    {
      name: "Sarah Johnson",
      number: "07",
      sport: "Volleyball",
      position: "Setter",
      improvement: "8%",
      overallRating: 88,
      lastEvaluation: "Feb 14, 2024",
      metrics: [
        { name: "Physical", rating: 85 },
        { name: "Technical", rating: 90 },
        { name: "Tactical", rating: 89 },
        { name: "Mental", rating: 87 },
      ],
      recentEvaluations: [
        {
          date: "Feb 14",
          event: "Game",
          comment: "Excellent setting accuracy",
          rating: 89,
        },
        {
          date: "Feb 11",
          event: "Training",
          comment: "Good team coordination",
          rating: 88,
        },
        {
          date: "Feb 07",
          event: "Game",
          comment: "Consistent performance",
          rating: 87,
        },
      ],
    },
  ];

  const getRatingColor = (rating) => {
    if (rating >= 90) return "bg-green-600";
    if (rating >= 80) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar (fixed on the left) */}
      <Sidebar />

      {/* Right Section: Navbar (fixed) + Scrollable Content */}
      <div className="flex flex-col flex-grow">
        <Navbar />

        {/* Scrollable Main Content */}
        <main className="flex-grow overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full mt-16 md:mt-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Performance
              </h2>
              <p className="text-gray-500">Athlete Performance Analytics</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100">
                This Month
              </button>
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100">
                All Teams
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card
              title="Team Average"
              value={performanceData.teamAverage}
              sub={`+${performanceData.teamImprovement}`}
            />
            <Card title="Top Performer" value={performanceData.topPerformer} />
            <Card
              title="Total Evaluations"
              value={performanceData.totalEvaluations}
            />
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm mb-2">Performance Status</p>
              <div className="space-y-2">
                {[
                  { color: "bg-green-600", label: "Excellent" },
                  { color: "bg-yellow-600", label: "Good" },
                  { color: "bg-red-600", label: "Needs Work" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center text-sm">
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${s.color}`}
                    ></span>
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Athlete Performance Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
            {athleteData.map((athlete, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {athlete.name}{" "}
                      <span className="text-gray-500 text-xs ml-2">
                        #{athlete.number}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      {athlete.sport} • {athlete.position}
                    </p>
                  </div>
                  <span className="text-green-600 font-bold">
                    {athlete.improvement}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Overall Rating</p>
                    <p className="text-4xl font-bold">
                      {athlete.overallRating}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Last Evaluation</p>
                    <p className="text-lg font-bold">
                      {athlete.lastEvaluation}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Metrics</p>
                  <div className="space-y-3">
                    {athlete.metrics.map((metric, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm">
                          <span>{metric.name}</span>
                          <span className="font-bold">{metric.rating}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full">
                          <div
                            className={`${getRatingColor(
                              metric.rating
                            )} h-2 rounded-full`}
                            style={{ width: `${metric.rating}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">
                    Recent Evaluations
                  </p>
                  <div className="space-y-2">
                    {athlete.recentEvaluations.map((evaluation, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">
                            {evaluation.date} - {evaluation.event}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {evaluation.comment}
                          </p>
                        </div>
                        <span className="font-bold">{evaluation.rating}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function Card({ title, value, sub }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">
        {value}{" "}
        {sub && <span className="text-green-600 text-sm ml-1">{sub}</span>}
      </p>
    </div>
  );
}

export default AdminPerformance;
