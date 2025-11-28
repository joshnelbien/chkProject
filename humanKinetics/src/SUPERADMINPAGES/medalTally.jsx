import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";

function MedalTally() {
  const [medals, setMedals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [search, setSearch] = useState("");

  const API = import.meta.env.VITE_BBACKEND_URL;
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
      const res = await axios.get(`${API}/medalTally/medalTally`);
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
      const res = await axios.post(`${API}/medalTally/medalTally`, newMedal);
      setMedals([...medals, res.data]);
      setIsModalOpen(false);
      setNewMedal({ year: "", sports: "", gold: "", silver: "", bronze: "" });
    } catch (err) {
      console.error("❌ Error adding medal:", err);
    }
  };

  // SORTING FUNCTION
  const handleSort = (column) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";

    setSortColumn(column);
    setSortDirection(direction);

    const sorted = [...medals].sort((a, b) => {
      const valA = a[column] ?? "";
      const valB = b[column] ?? "";

      if (["gold", "silver", "bronze", "year"].includes(column)) {
        return direction === "asc" ? valA - valB : valB - valA;
      }

      return direction === "asc"
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });

    setMedals(sorted);
  };

  const sortIcon = (column) => {
    if (sortColumn !== column) return "⇅";
    return sortDirection === "asc" ? "▲" : "▼";
  };

  // FILTERED MEDALS BASED ON SEARCH
  const filteredMedals = medals.filter((medal) => {
    const term = search.toLowerCase();
    return (
      medal.year.toString().includes(term) ||
      medal.sports.toLowerCase().includes(term) ||
      medal.gold.toString().includes(term) ||
      medal.silver.toString().includes(term) ||
      medal.bronze.toString().includes(term)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={true} />
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

<div className="relative w-64 mb-4">
              <input
                type="text"
                placeholder="Search "
                className="border border-gray-400 p-2 pr-12 w-full rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-gray-300 px-2 py-1  rounded-sm shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z"
                  />
                </svg>
              </button>
            </div>

            {/* Medal Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <p>Loading medal tally...</p>
              ) : filteredMedals.length === 0 ? (
                <p>No medals found.</p>
              ) : (
                <table className="min-w-full table-auto border border-gray-200">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th
                        className="px-4 py-2 border cursor-pointer select-none"
                        onClick={() => handleSort("year")}
                      >
                        Year {sortIcon("year")}
                      </th>
                      <th
                        className="px-4 py-2 border cursor-pointer select-none"
                        onClick={() => handleSort("sports")}
                      >
                        Sport {sortIcon("sports")}
                      </th>
                      <th
                        className="px-4 py-2 border cursor-pointer select-none"
                        onClick={() => handleSort("gold")}
                      >
                        Gold {sortIcon("gold")}
                      </th>
                      <th
                        className="px-4 py-2 border cursor-pointer select-none"
                        onClick={() => handleSort("silver")}
                      >
                        Silver {sortIcon("silver")}
                      </th>
                      <th
                        className="px-4 py-2 border cursor-pointer select-none"
                        onClick={() => handleSort("bronze")}
                      >
                        Bronze {sortIcon("bronze")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    {filteredMedals.map((medal) => (
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
                  onChange={(e) =>
                    setNewMedal({ ...newMedal, year: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Sport"
                  value={newMedal.sports}
                  onChange={(e) =>
                    setNewMedal({ ...newMedal, sports: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Gold"
                  value={newMedal.gold}
                  onChange={(e) =>
                    setNewMedal({ ...newMedal, gold: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Silver"
                  value={newMedal.silver}
                  onChange={(e) =>
                    setNewMedal({ ...newMedal, silver: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Bronze"
                  value={newMedal.bronze}
                  onChange={(e) =>
                    setNewMedal({ ...newMedal, bronze: e.target.value })
                  }
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
