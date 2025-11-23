import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";

function MedalTally() {
  const [medals, setMedals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMedal, setNewMedal] = useState({
    year: "",
    sports: "",
    gold: "",
    silver: "",
    bronze: ""
  });

  // Fetch medal tally from backend
  const fetchMedals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/medalTally/medalTally");
      setMedals(res.data);
    } catch (err) {
      console.error("❌ Error fetching medals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedals();
  }, []);

  // Handle modal form submit
  const handleAddMedal = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/medalTally/medalTally", newMedal);
      setMedals([...medals, res.data]);
      setIsModalOpen(false);
      setNewMedal({ year: "", sports: "", gold: "", silver: "", bronze: "" });
    } catch (err) {
      console.error("❌ Error adding medal:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={true} />

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-15 md:ml-15 mt-16">
        <Navbar />

        <main className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Medal Tally</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Add Sports
              </button>
            </div>

            {/* Medal Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <p>Loading medal tally...</p>
              ) : medals.length === 0 ? (
                <p>No medals recorded yet.</p>
              ) : (
                <table className="min-w-full table-auto border border-gray-200">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="px-4 py-2 border">Year</th>
                      <th className="px-4 py-2 border">Sport</th>
                      <th className="px-4 py-2 border">Gold</th>
                      <th className="px-4 py-2 border">Silver</th>
                      <th className="px-4 py-2 border">Bronze</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    {medals.map((medal) => (
                      <tr key={medal.id}>
                        <td className="px-4 py-2 border">{medal.year}</td>
                        <td className="px-4 py-2 border">{medal.sports}</td>
                        <td className="px-4 py-2 border">{medal.gold}</td>
                        <td className="px-4 py-2 border">{medal.silver}</td>
                        <td className="px-4 py-2 border">{medal.bronze}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>

        <Footer />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h2 className="text-xl font-bold mb-4">Add Medal</h2>
              <form onSubmit={handleAddMedal} className="space-y-3">
                <input
                  type="text"
                  placeholder="Year"
                  value={newMedal.year}
                  onChange={(e) => setNewMedal({ ...newMedal, year: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Sport"
                  value={newMedal.sports}
                  onChange={(e) => setNewMedal({ ...newMedal, sports: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Gold"
                  value={newMedal.gold}
                  onChange={(e) => setNewMedal({ ...newMedal, gold: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Silver"
                  value={newMedal.silver}
                  onChange={(e) => setNewMedal({ ...newMedal, silver: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Bronze"
                  value={newMedal.bronze}
                  onChange={(e) => setNewMedal({ ...newMedal, bronze: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedalTally;
