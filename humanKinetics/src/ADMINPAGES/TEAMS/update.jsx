import { useState } from "react";

function PlayersUpdate({ player, onClose }) {
  const [form, setForm] = useState({
    // Basic Info
    firstName: player.firstName || "",
    lastName: player.lastName || "",
    studentNumber: player.studentNumber || "",
    email: player.email || "",
    course: player.course || "",
    yearLevel: player.yearLevel || "",
    sport: player.sport || "",
    bDay: player.bDay || "",
    jerseyNo: player.jerseyNo || "",
    position: player.position || "",

    // Health Basic Info
    height: player.height || "",
    weight: player.weight || "",
    bmi: player.bmi || "",
    bloodType: player.bloodType || "",
    restingHeartRate: player.restingHeartRate || "",
    bloodPressure: player.bloodPressure || "",
    allergies: player.allergies || "",

    // Medical History
    chronicIllness: player.chronicIllness || "",
    hospitalization: player.hospitalization || "",
    surgery: player.surgery || "",
    familyHistory: player.familyHistory || "",
    vaccineRecord: player.vaccineRecord || "",

    // Current Health
    medications: player.medications || "",
    injuries: player.injuries || "",
    illnesses: player.illnesses || "",
    sleepHours: player.sleepHours || "",
    dietPlan: player.dietPlan || "",
    fitnessLevel: player.fitnessLevel || "",
    lastCheckup: player.lastCheckup || "",
    clearedForActivity: player.clearedForActivity || "",
    doctorInfo: player.doctorInfo || "",

    // Sports Injury / Therapy
    sportsInjuries: player.sportsInjuries || "",
    therapyRecords: player.therapyRecords || "",

    // Emergency Contact
    emergencyName: player.emergencyName || "",
    emergencyRelation: player.emergencyRelation || "",
    emergencyAddress: player.emergencyAddress || "",
    emergencyContact: player.emergencyContact || "",
    preferredHospital: player.preferredHospital || "",

    // Stats
    strength: player.strength || 70,
    speed: player.speed || 70,
    agility: player.agility || 70,
    endurance: player.endurance || 70,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/userAccounts/update-performance/${player.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("✅ Player updated successfully");
    } catch (err) {
      alert("❌ Update failed");
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-lg">

        <h2 className="text-xl font-bold text-green-700 mb-4">
          Update Player — {player.firstName} {player.lastName}
        </h2>

        <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">

          {/* BASIC INFO */}
          <section>
            <h3 className="font-semibold text-gray-700 mb-2">👤 Basic Info</h3>
            <div className="grid grid-cols-2 gap-3">
              {["firstName","lastName","studentNumber","email","course","yearLevel","sport","bDay","jerseyNo","position"]
              .map((field) => (
                <input 
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field}
                  className="border p-2 rounded w-full"
                />
              ))}
            </div>
          </section>

          

          {/* EMERGENCY */}
          <section>
            <h3 className="font-semibold text-gray-700 mb-2 " >🚨 Emergency Contact</h3>
            <div className="grid grid-cols-2 gap-3">
            {["emergencyName","emergencyRelation","emergencyAddress","emergencyContact","preferredHospital"]
            .map((field) => (
              <input
                key={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={field}
                className="border p-2 rounded w-full "
              />
            ))}
            </div>
          </section>

          {/* STATS SLIDERS */}
          <section>
            <h3 className="font-semibold text-gray-700 mb-2">⚽ Performance Attributes</h3>
            {["strength","speed","agility","endurance"].map((stat) => (
              <div key={stat}>
                <div className="flex justify-between text-sm">
                  <label className="capitalize">{stat}</label>
                  <span>{form[stat]}%</span>
                </div>
                <input 
                  type="range"
                  min="0" max="100"
                  name={stat}
                  value={form[stat]}
                  onChange={handleChange}
                  className="w-full accent-green-600"
                />
              </div>
            ))}
          </section>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded-full" onClick={onClose}>
            Cancel
          </button>
          <button className="px-5 py-2 bg-green-700 text-white rounded-full" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

export default PlayersUpdate;
