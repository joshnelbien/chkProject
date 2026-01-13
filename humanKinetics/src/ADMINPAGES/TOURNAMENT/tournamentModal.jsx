import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TournamentModal({ isOpen, onClose, onSubmit }) {
  const { id } = useParams();
  const API = import.meta.env.VITE_BBACKEND_URL;

  const [coach, setCoach] = useState(null);
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [formData, setFormData] = useState({
    tournamentName: "",
    sport: "",
    location: "",
    startDate: "",
    endDate: "",
    teams: "", 
    coachName: "",
    teamId: id,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coachRes = await axios.get(`${API}/adminAccounts/coaches-profile/${id}`);
        const coachData = coachRes.data;
        setCoach(coachData);

        setFormData((prev) => ({
          ...prev,
          sport: coachData.sports || "",
          coachName: `${coachData.firstName} ${coachData.lastName}`,
          teamId: id,
        }));

        const playerRes = await axios.get(`${API}/teams/player/${id}`);
        const sortedPlayers = playerRes.data.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setPlayers(sortedPlayers);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    if (id && isOpen) fetchData();
  }, [id, API, isOpen]);

  // Filter players based on search term
  const filteredPlayers = players.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlayerCheck = (playerId) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId) ? prev.filter((pid) => pid !== playerId) : [...prev, playerId]
    );
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedPlayers(players.map((p) => p.id));
    } else {
      setSelectedPlayers([]);
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlayers.length === 0) return alert("Please select at least one player.");
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    try {
      const selectedPlayerNames = selectedPlayers
        .map((playerId) => {
          const p = players.find((player) => player.id === playerId);
          return p ? `${p.firstName} ${p.lastName}` : null;
        })
        .filter(Boolean);

      const submissionData = {
        ...formData,
        players: selectedPlayerNames.map(name => `"${name}"`).join(","),
        playerCount: selectedPlayers.length
      };

      await axios.post(`${API}/tournament/tournaments`, submissionData);
      if (onSubmit) onSubmit(submissionData);
      handleClose();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const handleClose = () => {
    setFormData({ tournamentName: "", sport: coach?.sports || "", location: "", startDate: "", endDate: "", teams: "", coachName: coach ? `${coach.firstName} ${coach.lastName}` : "", teamId: id });
    setSelectedPlayers([]);
    setSearchTerm("");
    setSelectAll(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[95vh] overflow-y-auto border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">🏆 TOURNAMENT SETUP</h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-red-500 transition-colors text-3xl font-light">×</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Read-Only Info Section */}
            <div className="bg-blue-50 p-3 rounded-lg grid grid-cols-2 gap-4 border border-blue-100">
              <div>
                <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-widest">Head Coach</label>
                <p className="text-sm font-semibold text-blue-900">{formData.coachName || "---"}</p>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-widest">Sport Category</label>
                <p className="text-sm font-semibold text-blue-900 uppercase">{formData.sport || "---"}</p>
              </div>
            </div>

            {/* Player Selection Section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Team Roster Selection</label>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Search player name..." 
                  className="flex-1 text-sm border rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="border rounded-xl overflow-hidden bg-gray-50 shadow-inner">
                <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="w-4 h-4 rounded text-blue-600" />
                    <span className="text-xs font-bold text-gray-600 uppercase">Select All</span>
                  </label>
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                    {selectedPlayers.length} / {players.length}
                  </span>
                </div>
                
                <div className="max-h-44 overflow-y-auto p-2 space-y-1">
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                      <label key={player.id} className="flex items-center gap-3 p-2 hover:bg-white hover:shadow-sm rounded-lg cursor-pointer transition-all border border-transparent hover:border-gray-200">
                        <input
                          type="checkbox"
                          checked={selectedPlayers.includes(player.id)}
                          onChange={() => handlePlayerCheck(player.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">{player.firstName} {player.lastName}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-center text-xs text-gray-400 py-6 italic">No players found matching "{searchTerm}"</p>
                  )}
                </div>
              </div>
            </div>

            {/* Input Fields with Explicit Labels */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Tournament Name</label>
                <input
                  type="text"
                  name="tournamentName"
                  placeholder="e.g. Regional Sports Meet 2026"
                  value={formData.tournamentName}
                  onChange={handleChange}
                  required
                  className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Venue / Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. City Sports Complex"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full border-2 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full border-2 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">No. of Participant Teams</label>
                <input
                  type="number"
                  name="teams"
                  placeholder="Total teams in tournament"
                  value={formData.teams}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-xl py-4 font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
            >
              🚀 Finalize & Register
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Overlay */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-blue-900/80 flex items-center justify-center z-[100] p-4 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📝</div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Review Entry</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Registering <strong>{formData.tournamentName}</strong> with <strong>{selectedPlayers.length}</strong> players. Information will be shared with officials.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirmation(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-bold text-gray-700 transition-all">Back</button>
              <button onClick={confirmSubmit} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all">Yes, Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}