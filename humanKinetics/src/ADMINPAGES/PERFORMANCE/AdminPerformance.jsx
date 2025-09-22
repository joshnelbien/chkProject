import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Sidebar from "../SIDEBAR/SideBar";

function AdminPerfomance() {
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
        { name: "Physical", rating: 90, target: 95, change: "+5%" },
        { name: "Technical", rating: 94, target: 95, change: "+6%" },
        { name: "Tactical", rating: 88, target: 90, change: "+3%" },
        { name: "Mental", rating: 95, target: 95, change: "+5%" },
      ],
      recentEvaluations: [
        { date: "Feb 15", event: "Game", comment: "Excellent shooting performance", rating: 94 },
        { date: "Feb 12", event: "Training", comment: "Strong defensive drills", rating: 92 },
        { date: "Feb 08", event: "Game", comment: "Good court awareness", rating: 90 },
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
        { name: "Physical", rating: 85, target: 90, change: "+3%" },
        { name: "Technical", rating: 90, target: 92, change: "+5%" },
        { name: "Tactical", rating: 89, target: 90, change: "+5%" },
        { name: "Mental", rating: 87, target: 90, change: "+5%" },
      ],
      recentEvaluations: [
        { date: "Feb 14", event: "Game", comment: "Excellent setting accuracy", rating: 89 },
        { date: "Feb 11", event: "Training", comment: "Good team coordination", rating: 88 },
        { date: "Feb 07", event: "Game", comment: "Consistent performance", rating: 87 },
      ],
    },
  ];

  const getRatingColor = (rating) => {
    if (rating >= 90) return "bg-green-600";
    if (rating >= 80) return "bg-yellow-600";
    return "bg-red-600";
  };
  const getRatingStatus = (rating) => {
    if (rating >= 90) return "Excellent";
    if (rating >= 80) return "Good";
    return "Needs Work";
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-64 mt-16 flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                Performance
              </h2>
              <p className="text-gray-500">Athlete Performance Analytics</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 text-gray-700">
                This Month
              </button>
              <button className="px-4 py-2 bg-white rounded-full border border-gray-300 text-gray-700">
                All Teams
              </button>
            </div>
          </div>

          {/* Performance Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Team Average Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Team Average</p>
              <p className="text-2xl font-bold">
                {performanceData.teamAverage}
                <span className="text-sm font-normal text-green-600 ml-1 flex items-center">
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
                  {performanceData.teamImprovement}
                </span>
              </p>
            </div>

            {/* Top Performer Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Top Performer</p>
              <p className="text-2xl font-bold">{performanceData.topPerformer}</p>
            </div>

            {/* Total Evaluations Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">Total Evaluations</p>
              <p className="text-2xl font-bold">{performanceData.totalEvaluations}</p>
            </div>

            {/* Performance Status Legend */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm mb-2">Performance Status</p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-700">Excellent</p>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-600 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-700">Good</p>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-700">Needs Work</p>
                </div>
              </div>
            </div>
          </div>

          {/* Athlete Performance Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {athleteData.map((athlete, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-800">
                        {athlete.name}
                        <span className="text-gray-500 text-xs ml-2">
                          {athlete.number}
                        </span>
                      </p>
                      <p className="text-gray-500 text-sm">
                        {athlete.sport} • {athlete.position}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600 flex items-center">
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
                    {athlete.improvement}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Overall Rating</p>
                    <p className="text-4xl font-bold">{athlete.overallRating}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Last Evaluation</p>
                    <p className="text-lg font-bold">{athlete.lastEvaluation}</p>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Metrics</p>
                  <div className="space-y-3">
                    {athlete.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex}>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-gray-600">{metric.name}</span>
                          <span className="font-bold">{metric.rating}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${getRatingColor(metric.rating)} h-2 rounded-full`}
                            style={{ width: `${metric.rating}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Evaluations */}
                <div>
                  <p className="font-semibold text-gray-800 mb-2">
                    Recent Evaluations
                  </p>
                  <div className="space-y-3">
                    {athlete.recentEvaluations.map((evaluation, evalIndex) => (
                      <div key={evalIndex} className="flex justify-between items-center text-sm">
                        <div>
                          <p className="font-medium text-gray-800">
                            {evaluation.date} - {evaluation.event}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {evaluation.comment}
                          </p>
                        </div>
                        <span className="font-bold text-lg">{evaluation.rating}%</span>
                      </div>
                    ))}
                  </div>
                </div>
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

export default AdminPerfomance;