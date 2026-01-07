import { useState } from "react";

function PlayersUpdate({ player, onClose, onUpdate }) {
  const API = import.meta.env.VITE_BBACKEND_URL;

  const TRAINING_PROGRAMS = {
    "basketball-men": [
      "20m sprint",
      "Vertical jump",
      "Illinois agility",
      "Yo-Yo intermittent recovery",
      "Spot shooting & free-throw drills",
    ],
    "basketball-women": [
      "20m sprint",
      "Vertical jump",
      "Illinois agility",
      "Yo-Yo intermittent recovery",
      "Spot shooting & free-throw drills",
    ],

    "volleyball-men": [
      "Spike jump test",
      "Reaction ball drill",
      "Medicine ball throw test",
      "T-test agility drill",
      "Target serve accuracy test",
    ],
    "volleyball-women": [
      "Spike jump test",
      "Reaction ball drill",
      "Medicine ball throw test",
      "T-test agility drill",
      "Target serve accuracy test",
    ],

    cheerdance: [
      "Sit-and-reach test",
      "Stork balance test",
      "Core endurance hold test",
      "Routine synchronization evaluation",
      "Standing long jump test",
    ],

    futsal: [
      "30m sprint test",
      "Zigzag agility test",
      "Cooper test",
      "Dribbling cone test",
      "Goal target shooting drill",
    ],

    "sepak-takraw": [
      "Vertical jump test",
      "Hip & hamstring flexibility test",
      "Single-leg balance test",
      "Reaction light drill",
      "Ball juggling count test",
    ],

    "table-tennis": [
      "Reaction timer test",
      "Ball tracking drill",
      "Short sprint test",
      "Target placement drill",
      "Rally endurance test",
    ],

    badminton: [
      "Shuttle run test",
      "10–20m sprint test",
      "Multistage fitness test",
      "Smash speed test",
      "Target shot accuracy drill",
    ],

    taekwondo: [
      "Kick speed sensor test",
      "Standing long jump",
      "Split flexibility test",
      "Reaction pad drill",
      "One-leg stability test",
    ],

    arnis: [
      "Stick speed drill",
      "Reaction light test",
      "Pattern coordination drill",
      "Continuous striking test",
      "Target strike accuracy test",
    ],

    "karate-do": [
      "Vertical jump test",
      "Punch speed test",
      "Balance stability test",
      "Reaction timing drill",
      "Kata performance scoring",
    ],
  };

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

  const [trainingPrograms, setTrainingPrograms] = useState(() => {
    const programs = TRAINING_PROGRAMS[player.sport] || [];
    return programs.map((p) => ({
      name: p,
      completed: false,
      notes: "",
    }));
  });

  const toggleTraining = (index) => {
    const updated = [...trainingPrograms];
    updated[index].completed = !updated[index].completed;
    setTrainingPrograms(updated);
  };

  const updateTrainingNotes = (index, value) => {
    const updated = [...trainingPrograms];
    updated[index].notes = value;
    setTrainingPrograms(updated);
  };

  const [form, setForm] = useState(() => {
    const baseForm = {
      /* ================= BASIC INFO ================= */
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

      achievements: Array.isArray(player.achievements)
        ? player.achievements
        : player.achievements
        ? player.achievements.split(",").map((a) => a.trim())
        : [],

      /* ================= EMERGENCY ================= */
      emergencyName: player.emergencyName || "",
      emergencyRelation: player.emergencyRelation || "",
      emergencyAddress: player.emergencyAddress || "",
      emergencyContact: player.emergencyContact || "",
      preferredHospital: player.preferredHospital || "",

      /* ================= GENERAL PERFORMANCE ================= */
      strength: Number(player.strength) || 70,
      speed: Number(player.speed) || 70,
      agility: Number(player.agility) || 70,
      endurance: Number(player.endurance) || 70,
      accuracy: Number(player.accuracy) || 70,
      tactics: Number(player.tactics) || 70,
      strategy: Number(player.strategy) || 70,
      physicalFitness: Number(player.physicalFitness) || 70,
      teamCoordination: Number(player.teamCoordination) || 70,
    };

    /* ================= SPORT-SPECIFIC PERFORMANCE ================= */
    const sportFields = SPORT_TRAINING_FIELDS[player.sport] || [];

    sportFields.forEach(({ key }) => {
      baseForm[key] = Number(player[key]) || 70;
    });

    return baseForm;
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");

  const addAchievement = () => {
    if (!newAchievement.trim()) return;

    setForm({
      ...form,
      achievements: [...form.achievements, newAchievement.trim()],
    });

    setNewAchievement("");
  };

  const removeAchievement = (index) => {
    setForm({
      ...form,
      achievements: form.achievements.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      setUpdating(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        // 🔥 achievements as comma-separated STRING
        if (key === "achievements") {
          formData.append("achievements", value.join(", "));
        } else {
          formData.append(key, value);
        }
      });

      if (form.profilePicture instanceof File) {
        formData.append("profilePicture", form.profilePicture);
      }

      if (form.medicalCertificate instanceof File) {
        formData.append("medicalCertificate", form.medicalCertificate);
      }

      const response = await fetch(
        `${API}/userAccounts/players-update/${player.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      setShowConfirmation(false);
      setShowSuccess(true);

      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
      setShowConfirmation(false);
    } finally {
      setUpdating(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose(); // Close the update modal
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto p-4">
        <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-green-700 mb-4">
            Update Player — {player.firstName} {player.lastName}
          </h2>

          <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
            {/* BASIC INFO */}
            <section>
              <h3 className="font-semibold text-gray-700 mb-2">
                👤 Basic Info
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "firstName",
                  "lastName",
                  "studentNumber",
                  "email",
                  "course",
                  "yearLevel",
                  "sport",
                  "bDay",
                ].map((field) => (
                  <input
                    key={field}
                    name={field}
                    value={form[field]}
                    disabled // 🔒 not editable
                    className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
                  />
                ))}

                {/* Editable Fields */}
                <input
                  name="jerseyNo"
                  value={form.jerseyNo}
                  onChange={handleChange}
                  placeholder="jerseyNo"
                  className="border p-2 rounded w-full"
                />

                <input
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  placeholder="position"
                  className="border p-2 rounded w-full"
                />

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    🏆 Achievements
                  </label>

                  <div className="flex gap-2 mb-2">
                    <input
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="Add achievement (e.g. MVP 2024)"
                      className="border p-2 rounded w-full"
                    />
                    <button
                      type="button"
                      onClick={addAchievement}
                      className="px-4 bg-green-700 text-white rounded hover:bg-green-800"
                    >
                      Add
                    </button>
                  </div>

                  {/* Achievement List */}
                  <ul className="space-y-2">
                    {form.achievements.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => removeAchievement(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* EMERGENCY */}
            <section>
              <h3 className="font-semibold text-gray-700 mb-2">
                🚨 Emergency Contact
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "emergencyName",
                  "emergencyRelation",
                  "emergencyAddress",
                  "emergencyContact",
                  "preferredHospital",
                ].map((field) => (
                  <input
                    key={field}
                    name={field}
                    value={form[field]}
                    disabled // ❗ cannot edit
                    className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
                  />
                ))}
              </div>
            </section>

            {/* STATS SLIDERS */}
            <section>
              <h3 className="font-semibold text-gray-700 mb-2">
                ⚽ Performance Attributes
              </h3>
              
              {(SPORT_TRAINING_FIELDS[player.sport] || []).map(
                ({ key, label }) => (
                  <div key={key} className="mb-2">
                    <div className="flex justify-between text-sm">
                      <label>{label}</label>
                      <span>{form[key]}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      name={key}
                      value={form[key]}
                      onChange={handleChange}
                      className="w-full accent-green-600"
                    />
                  </div>
                )
              )}

              {(SPORT_TRAINING_FIELDS[player.sport] || []).length === 0 && (
                <p className="text-sm text-gray-500">
                  No sport-specific training available.
                </p>
              )}
            </section>

            
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"
              onClick={onClose}
              disabled={updating}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors disabled:bg-green-400"
              onClick={handleUpdateClick}
              disabled={updating}
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Confirm Update
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to update {player.firstName}{" "}
              {player.lastName}'s information?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"
                onClick={handleCancelConfirmation}
                disabled={updating}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors disabled:bg-green-400"
                onClick={handleConfirmUpdate}
                disabled={updating}
              >
                {updating ? "Updating..." : "Confirm Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Alert Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-auto text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Success!</h3>
            <p className="text-gray-600 mb-4">
              Player information has been updated successfully!
            </p>
            <button
              className="px-5 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors"
              onClick={handleSuccessClose}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PlayersUpdate;
