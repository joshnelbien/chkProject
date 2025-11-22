import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import Footer from "./Footer";

function PlayerAccounts() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/userAccounts/player`); // Adjust your route
        setPlayers(res.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={true} />

      <div className="flex-1 flex flex-col ml-15 md:ml-15 mt-16">
        <Navbar />

        <main className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">Player Accounts</h1>
            <p className="text-gray-600 mb-6">
              Manage all player accounts, view details, and perform actions like edit or delete.
            </p>

            {loading ? (
              <p>Loading players...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200">
                  <thead className="bg-green-700 text-white">
                    <tr>
              
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                   
                      <th className="px-4 py-2 border">Sport</th>
                      <th className="px-4 py-2 border">Jersey No</th>
                      <th className="px-4 py-2 border">Position</th>
                      <th className="px-4 py-2 border">Verified</th>
                      <th className="px-4 py-2 border">Status</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    {players.map((player) => (
                      <tr key={player.id}>
                   
                        <td className="px-4 py-2 border">{player.lastName} {player.firstName}</td>
                        <td className="px-4 py-2 border">{player.email}</td>
                
                        <td className="px-4 py-2 border">{player.sport}</td>
                        <td className="px-4 py-2 border">{player.jerseyNo}</td>
                        <td className="px-4 py-2 border">{player.position}</td>
                        <td className="px-4 py-2 border">{player.isVerified ? "Yes" : "No"}</td>
                        <td className="px-4 py-2 border">{player.status}</td>
                        <td className="px-4 py-2 border">
                          <button className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700">
                            Edit
                          </button>
                          <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default PlayerAccounts;
